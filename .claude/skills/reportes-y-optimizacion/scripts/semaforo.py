#!/usr/bin/env python3
"""
Semaforo de cartera — triage de multiples cuentas publicitarias en una ventana.

Convierte una lista de clientes con sus numeros crudos en la tabla de triage:
en que cajon cae cada uno, cuanto dinero esta en riesgo, y a quien se toca primero.

Lo que aporta sobre hacerlo a mano:

  1. Aplica la BANDA DE RUIDO (1/raiz(n)). Se niega a declarar rojo una desviacion
     que cabe dentro del azar. Es el error mas caro del oficio: reaccionar a la
     varianza reinicia aprendizajes que ya se pagaron.
  2. Aplica el orden de preguntas de reference/03-veredicto.md, sin saltarse
     bloqueos ni muestra insuficiente.
  3. Ordena los rojos por DINERO EN RIESGO, no por quien reclama mas fuerte.

Uso:
    python3 semaforo.py cartera.json
    python3 semaforo.py --ejemplo > cartera.json     # plantilla de entrada
    python3 semaforo.py cartera.json --markdown       # tabla lista para el reporte

Sin dependencias externas. Solo Python 3.
"""

import argparse
import json
import math
import sys

# --- Umbrales de la metodologia. No inventar valores nuevos aqui. -------------
MUESTRA_MINIMA = 15          # resultados necesarios para leer costo por resultado
DIAS_MINIMOS_SIN_EDICION = 7  # antes de esto se mide el reinicio, no el cambio
DIAS_MINIMOS_CORRIENDO = 7
DESVIACION_ROJA = 0.30       # 30% sobre objetivo
FRECUENCIA_AMARILLA = 3.0
FRECUENCIA_ROJA = 5.0
DIAS_SIN_RESULTADOS_ROJO = 3  # gasto sin ningun resultado = falla, no lentitud

ORDEN_CAJONES = ["ROJO", "AMARILLO", "PROVISIONAL", "VERDE", "SIN_LECTURA", "BLOQUEADA"]

ETIQUETAS = {
    "ROJO": "🔴 Intervenir",
    "AMARILLO": "🟡 Vigilar",
    "VERDE": "🟢 No tocar",
    "PROVISIONAL": "📋 Provisional",
    "SIN_LECTURA": "⚪ Sin lectura",
    "BLOQUEADA": "⛔ Bloqueada",
}


def banda_de_ruido(n):
    """Error relativo aproximado de un conteo: 1/raiz(n)."""
    return 1.0 / math.sqrt(n) if n > 0 else float("inf")


def moneda(valor, simbolo="$"):
    if valor is None:
        return "—"
    return f"{simbolo}{valor:,.0f}".replace(",", ".")


def evaluar(c):
    """Devuelve el diagnostico de un cliente. Sigue el orden de 03-veredicto.md."""
    r = {
        "cliente": c.get("cliente", "?"),
        "gasto": c.get("gasto"),
        "resultados": c.get("resultados"),
        "cpa_objetivo": c.get("cpa_objetivo"),
        "costo_por_resultado": None,
        "ruido": None,
        "desviacion": None,
        "dinero_en_riesgo": 0.0,
        "cajon": None,
        "motivo": "",
        "accion": "",
        "avisos": [],
    }

    # --- 1. Puede gastar? -----------------------------------------------------
    if c.get("estado", "activa").lower() in ("bloqueada", "bloqueado", "impaga", "pausada"):
        r["cajon"] = "BLOQUEADA"
        r["motivo"] = c.get("bloqueo", "sin detalle")
        r["accion"] = "No es problema de campanas. Va a la lista de bloqueos."
        return r

    gasto = c.get("gasto") or 0.0
    n = c.get("resultados")
    dias_edicion = c.get("dias_desde_edicion")
    dias_corriendo = c.get("dias_corriendo")
    ventana = c.get("ventana_dias", 7) or 7
    gasto_diario = c.get("gasto_diario") or (gasto / ventana if ventana else 0.0)

    # --- 2. Falla dura: gasta y no produce NADA -------------------------------
    if n == 0 and gasto > 0 and (dias_corriendo or 0) >= DIAS_SIN_RESULTADOS_ROJO:
        r["cajon"] = "ROJO"
        r["motivo"] = f"{moneda(gasto)} gastados y cero resultados en {dias_corriendo} dias"
        r["accion"] = ("Falla tecnica, no rendimiento. Revisar destino, formulario, "
                       "pixel y aprobacion del anuncio. Es la excepcion a la Ley 0.")
        r["dinero_en_riesgo"] = gasto_diario
        return r

    # --- 3. Hay muestra suficiente? -------------------------------------------
    faltas = []
    if n is None:
        faltas.append("no se informaron resultados")
    elif n < MUESTRA_MINIMA:
        faltas.append(f"{n} resultados (se necesitan {MUESTRA_MINIMA})")
    if dias_edicion is not None and dias_edicion < DIAS_MINIMOS_SIN_EDICION:
        faltas.append(f"editada hace {dias_edicion} dias (aprendizaje reiniciado)")
    if dias_corriendo is not None and dias_corriendo < DIAS_MINIMOS_CORRIENDO:
        faltas.append(f"lleva {dias_corriendo} dias corriendo")

    if faltas:
        r["cajon"] = "SIN_LECTURA"
        r["motivo"] = "; ".join(faltas)
        r["accion"] = "Esperar. Forzar un veredicto aqui destruye campanas sanas."
        if n:
            r["costo_por_resultado"] = gasto / n
            r["ruido"] = banda_de_ruido(n)
        return r

    # --- 4. Atribucion confiable? ---------------------------------------------
    if c.get("atribucion_ok", True) is False:
        r["avisos"].append("ATRIBUCION ROTA — el CPA de abajo no es el del negocio. "
                           "Es el titular del reporte, no una nota al pie.")

    cpr = gasto / n
    ruido = banda_de_ruido(n)
    r["costo_por_resultado"] = cpr
    r["ruido"] = ruido
    frecuencia = c.get("frecuencia")

    # --- 5. Existe objetivo? --------------------------------------------------
    objetivo = c.get("cpa_objetivo")
    if not objetivo:
        r["cajon"] = "PROVISIONAL"
        r["motivo"] = f"costo por resultado {moneda(cpr)} (+/-{ruido*100:.0f}%), sin CPA objetivo"
        r["accion"] = ("Falta ticket promedio y margen en la ficha. Se describe lo que "
                       "paso; NO se dictamina si esta bien. Pedirlo en el reporte.")
        if frecuencia and frecuencia > FRECUENCIA_ROJA:
            r["avisos"].append(f"frecuencia {frecuencia} — publico quemado igual")
        return r

    # --- 6. Veredicto contra el objetivo --------------------------------------
    desviacion = cpr / objetivo - 1.0
    r["desviacion"] = desviacion
    fuera_de_ruido = abs(desviacion) > ruido
    # Solo hay dinero en riesgo si el exceso es REAL, no si cabe dentro del azar.
    # Cobrarle "riesgo" a una cuenta cuya desviacion esta dentro de la banda es
    # justamente el error que este script existe para evitar.
    if desviacion > 0 and fuera_de_ruido:
        r["dinero_en_riesgo"] = gasto_diario * desviacion

    if frecuencia is not None and frecuencia > FRECUENCIA_ROJA:
        r["cajon"] = "ROJO"
        r["motivo"] = f"frecuencia {frecuencia} en 7 dias — publico quemado"
        r["accion"] = ("Agregar anuncios nuevos y ampliar publico. NO bajar el "
                       "presupuesto: no arregla la fatiga.")
    elif desviacion > DESVIACION_ROJA and fuera_de_ruido:
        r["cajon"] = "ROJO"
        r["motivo"] = (f"{moneda(cpr)} vs objetivo {moneda(objetivo)} "
                       f"({desviacion*100:+.0f}%, banda +/-{ruido*100:.0f}%)")
        r["accion"] = ("Correr el arbol de las 3 Q's (meta-ads/scripts/diagnostico.py) "
                       "y atacar la PRIMERA metrica que falla de arriba hacia abajo.")
    elif frecuencia is not None and frecuencia > FRECUENCIA_AMARILLA:
        r["cajon"] = "AMARILLO"
        r["motivo"] = f"resultado en objetivo, pero frecuencia {frecuencia}"
        r["accion"] = ("Preparar el reemplazo AHORA: pedir creativos, escribir angulos. "
                       "No tocar la campana todavia.")
    elif desviacion > 0 and fuera_de_ruido:
        r["cajon"] = "AMARILLO"
        r["motivo"] = (f"{moneda(cpr)} vs objetivo {moneda(objetivo)} "
                       f"({desviacion*100:+.0f}%, fuera de la banda +/-{ruido*100:.0f}%)")
        r["accion"] = "Deterioro real pero aun bajo 30%. Vigilar la proxima ventana."
    else:
        r["cajon"] = "VERDE"
        dentro = "dentro de la banda de ruido" if desviacion > 0 else "bajo objetivo"
        r["motivo"] = (f"{moneda(cpr)} vs objetivo {moneda(objetivo)} "
                       f"({desviacion*100:+.0f}%, {dentro})")
        r["accion"] = ("No intervenir. Registrar 'revisado, sin intervencion'. "
                       "3 ventanas seguidas asi = candidata a escalar.")
    return r


def imprimir(resultados, markdown=False):
    orden = {k: i for i, k in enumerate(ORDEN_CAJONES)}
    resultados.sort(key=lambda r: (orden[r["cajon"]], -r["dinero_en_riesgo"]))

    filas = []
    for r in resultados:
        filas.append([
            r["cliente"],
            ETIQUETAS[r["cajon"]],
            moneda(r["gasto"]),
            str(r["resultados"]) if r["resultados"] is not None else "—",
            moneda(r["costo_por_resultado"]),
            moneda(r["cpa_objetivo"]),
            f"{r['desviacion']*100:+.0f}%" if r["desviacion"] is not None else "—",
            f"±{r['ruido']*100:.0f}%" if r["ruido"] else "—",
            moneda(r["dinero_en_riesgo"]) if r["dinero_en_riesgo"] else "—",
        ])

    cab = ["Cliente", "Cajon", "Gasto", "Result.", "Costo/res.",
           "Objetivo", "Desv.", "Ruido", "$/dia en riesgo"]

    if markdown:
        print("| " + " | ".join(cab) + " |")
        print("|" + "|".join(["---"] * len(cab)) + "|")
        for f in filas:
            print("| " + " | ".join(f) + " |")
    else:
        anchos = [max(len(cab[i]), max((len(f[i]) for f in filas), default=0))
                  for i in range(len(cab))]
        linea = "  ".join(c.ljust(anchos[i]) for i, c in enumerate(cab))
        print(linea)
        print("-" * len(linea))
        for f in filas:
            print("  ".join(v.ljust(anchos[i]) for i, v in enumerate(f)))

    print()
    for cajon in ORDEN_CAJONES:
        grupo = [r for r in resultados if r["cajon"] == cajon]
        if not grupo:
            continue
        print(f"\n{ETIQUETAS[cajon]}")
        for r in grupo:
            print(f"  · {r['cliente']}: {r['motivo']}")
            print(f"    → {r['accion']}")
            for a in r["avisos"]:
                print(f"    ⚠️  {a}")

    rojos = [r for r in resultados if r["cajon"] == "ROJO"]
    if len(rojos) > 1:
        print("\nOrden de atencion (por dinero en riesgo, no por quien reclama):")
        for i, r in enumerate(rojos, 1):
            if r["dinero_en_riesgo"]:
                detalle = f"{moneda(r['dinero_en_riesgo'])}/dia por encima del objetivo"
            else:
                # Rojo por fatiga o falla tecnica: el costo aun no se disparo,
                # pero se va a disparar. Urgente igual, sin cifra que mostrar.
                detalle = "sin sobrecosto aun, pero se deteriora"
            print(f"  {i}. {r['cliente']} — {detalle}")


EJEMPLO = [
    {"cliente": "EJEMPLO verde", "gasto": 210000, "resultados": 62,
     "cpa_objetivo": 3500, "dias_desde_edicion": 12, "dias_corriendo": 40,
     "frecuencia": 1.9},
    {"cliente": "EJEMPLO sin objetivo", "gasto": 180000, "resultados": 34,
     "cpa_objetivo": None, "dias_desde_edicion": 9, "dias_corriendo": 25,
     "frecuencia": 2.4},
    {"cliente": "EJEMPLO ruido", "gasto": 96000, "resultados": 16,
     "cpa_objetivo": 5000, "dias_desde_edicion": 10, "dias_corriendo": 30,
     "frecuencia": 2.1},
    {"cliente": "EJEMPLO fatiga", "gasto": 300000, "resultados": 40,
     "cpa_objetivo": 7000, "dias_desde_edicion": 14, "dias_corriendo": 60,
     "frecuencia": 5.8},
    {"cliente": "EJEMPLO rojo real", "gasto": 420000, "resultados": 48,
     "cpa_objetivo": 5000, "dias_desde_edicion": 11, "dias_corriendo": 45,
     "frecuencia": 2.6},
    {"cliente": "EJEMPLO atribucion rota", "gasto": 150000, "resultados": 55,
     "cpa_objetivo": 2500, "dias_desde_edicion": 9, "dias_corriendo": 30,
     "frecuencia": 2.0, "atribucion_ok": False},
    {"cliente": "EJEMPLO sin muestra", "gasto": 40000, "resultados": 6,
     "cpa_objetivo": 5000, "dias_desde_edicion": 8, "dias_corriendo": 9},
    {"cliente": "EJEMPLO bloqueada", "estado": "bloqueada",
     "bloqueo": "saldo impago"},
]


def main():
    p = argparse.ArgumentParser(description="Semaforo de triage de cartera.")
    p.add_argument("archivo", nargs="?", help="JSON con la lista de clientes")
    p.add_argument("--markdown", action="store_true", help="tabla en markdown")
    p.add_argument("--ejemplo", action="store_true", help="imprime un JSON de ejemplo")
    a = p.parse_args()

    if a.ejemplo:
        print(json.dumps(EJEMPLO, indent=2, ensure_ascii=False))
        return 0
    if not a.archivo:
        p.print_help()
        return 1

    with open(a.archivo, encoding="utf-8") as f:
        datos = json.load(f)
    if isinstance(datos, dict):
        datos = datos.get("clientes", [])

    imprimir([evaluar(c) for c in datos], markdown=a.markdown)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        # Salida truncada por un pipe (head, less). No es un error del script.
        sys.exit(0)
