#!/usr/bin/env python3
"""
Diagnostico de campanas de Meta Ads — las 3 Q's.

Recibe las metricas reales y devuelve, de forma determinista, cual es la PRIMERA
metrica que falla en el recorrido del usuario y que accion tomar.

El orden importa: se lee de arriba hacia abajo (CPM -> retencion 3s -> tiempo
promedio -> CTR -> tasa de conversion -> frecuencia) y se ataca la primera que
falla. Arreglar lo de abajo sin arreglar lo de arriba no sirve.

Ejemplos:
  python3 diagnostico.py --dias-desde-edicion 7 --retencion3s 18 --ctr 1.4 \
      --frecuencia 2.1 --tiempo-video 4 --tasa-conversion 55 --cpm 8

  python3 diagnostico.py --dias-desde-edicion 2 --ctr 1.1

Solo se evaluan las metricas que pases. Sin dependencias externas.
"""

import argparse
import sys

# Umbrales de la metodologia. NO inventar valores nuevos aqui.
UMBRALES = {
    "retencion3s": (20.0, "%", "menor",
                    "Reproducciones de video de 3 seg",
                    "MEJORAR GANCHOS — el hook no detiene el scroll. Primeros 5 "
                    "segundos, estilo UGC, lenguaje natural."),
    "tiempo_video": (5.0, "s", "menor",
                     "Tiempo promedio de reproduccion",
                     "MEJORAR GUIONES Y EDICION — arrancan pero no se quedan. "
                     "Cortes mas rapidos, promesa mas clara, menos relleno."),
    "ctr": (2.0, "%", "menor",
            "CTR unico (enlace)",
            "MEJORAR ANUNCIOS — el anuncio no genera ganas de dar el paso. "
            "Nuevos angulos y tipos de arte, no solo otro color."),
    "tasa_conversion": (50.0, "%", "menor",
                        "Tasa de conversion a Mensajes",
                        "SER MAS ESPECIFICO EN 'chatear con la empresa' — la promesa "
                        "del destino no coincide con lo que promete el anuncio."),
    "frecuencia": (3.0, "", "mayor",
                   "Frecuencia (ultimos 7 dias)",
                   "AGREGAR NUEVOS ANUNCIOS — fatiga de anuncios. El publico ya vio "
                   "todo. No bajes el presupuesto: renueva creativos."),
}

# Rangos "zona gris" declarados por la metodologia (umbral bajo - umbral alto).
RANGOS = {
    "retencion3s": (20.0, 25.0),
    "tiempo_video": (5.0, 7.0),
    "tasa_conversion": (50.0, 60.0),
    "frecuencia": (3.0, 5.0),
}

# Orden del recorrido del usuario. CPM va aparte (es contexto, no un paso).
ORDEN = ["retencion3s", "tiempo_video", "ctr", "tasa_conversion", "frecuencia"]


def evaluar(clave, valor):
    """Devuelve 'FALLA', 'GRIS' u 'OK'."""
    umbral, _, direccion, _, _ = UMBRALES[clave]
    lo, hi = RANGOS.get(clave, (umbral, umbral))
    if direccion == "menor":
        if valor < lo:
            return "FALLA"
        if valor < hi:
            return "GRIS"
        return "OK"
    else:  # mayor
        if valor > hi:
            return "FALLA"
        if valor > lo:
            return "GRIS"
        return "OK"


def main():
    p = argparse.ArgumentParser(
        description="Diagnostico de campanas de Meta Ads (las 3 Q's).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--dias-desde-edicion", dest="dias", type=float, default=None,
                   help="Dias desde la ultima edicion de la campana. Si es < 5, la "
                        "recomendacion es ESPERAR.")
    p.add_argument("--cpm", type=float, default=None, help="CPM ($).")
    p.add_argument("--cpm-referencia", dest="cpm_ref", type=float, default=None,
                   help="CPM historico de la cuenta para comparar.")
    p.add_argument("--retencion3s", type=float, default=None,
                   help="%% de reproducciones de video de 3 segundos.")
    p.add_argument("--tiempo-video", dest="tiempo_video", type=float, default=None,
                   help="Tiempo promedio de reproduccion de video (segundos).")
    p.add_argument("--ctr", type=float, default=None,
                   help="CTR unico en el enlace (%%).")
    p.add_argument("--tasa-conversion", dest="tasa_conversion", type=float,
                   default=None,
                   help="Tasa de conversion a mensajes / del formulario (%%).")
    p.add_argument("--frecuencia", type=float, default=None,
                   help="Frecuencia de los ultimos 7 dias.")
    p.add_argument("--costo-resultado", dest="costo", type=float, default=None,
                   help="Costo por resultado actual.")
    p.add_argument("--costo-objetivo", dest="objetivo", type=float, default=None,
                   help="Costo por resultado objetivo (de presupuesto.py).")
    a = p.parse_args()

    print()
    print("=" * 68)
    print("  DIAGNOSTICO DE CAMPANA — LAS 3 Q's")
    print("=" * 68)

    # --- Ley 0: la impaciencia -------------------------------------------
    if a.dias is not None:
        print(f"\nDias desde la ultima edicion: {a.dias:g}")
        if a.dias < 5:
            print("\n  >>> NO OPTIMICES TODAVIA. <<<")
            print("  Revisa a diario, pero optimiza cada 5-7 dias. Tocar una campana")
            print("  en fase de aprendizaje la reinicia y quema presupuesto.")
            print("  La impaciencia es el enemigo #1 al hacer anuncios.\n")
            sys.exit(0)

    # --- Q1 ---------------------------------------------------------------
    print("\nQ1 — QUE PASO")
    if a.costo is not None:
        linea = f"  Costo por resultado: {a.costo:,.2f}"
        if a.objetivo is not None:
            delta = (a.costo / a.objetivo - 1) * 100
            estado = "POR ENCIMA" if a.costo > a.objetivo else "dentro"
            linea += f"   ·   objetivo: {a.objetivo:,.2f}   ({estado}, {delta:+.0f}%)"
        print(linea)
    else:
        print("  (sin datos de costo por resultado)")

    # --- Q2 ---------------------------------------------------------------
    print("\nQ2 — POR QUE PASO   (orden del recorrido del usuario)")

    valores = {
        "retencion3s": a.retencion3s,
        "tiempo_video": a.tiempo_video,
        "ctr": a.ctr,
        "tasa_conversion": a.tasa_conversion,
        "frecuencia": a.frecuencia,
    }

    fallas, grises, medidas = [], [], 0

    # CPM primero: es contexto, no un eslabon del recorrido.
    if a.cpm is not None:
        nota = ""
        if a.cpm_ref:
            delta = (a.cpm / a.cpm_ref - 1) * 100
            nota = f"  (vs. referencia {a.cpm_ref:g}: {delta:+.0f}%)"
            if delta > 25:
                fallas.append(("cpm", a.cpm,
                               "USAR PUBLICOS MAS GRANDES Y MEJORAR ANUNCIOS — CPM "
                               "elevado: publico muy estrecho, fecha de alta demanda, "
                               "o senal de calidad baja."))
        print(f"  {'CPM':<44} {a.cpm:g}{nota}")
        medidas += 1

    for clave in ORDEN:
        v = valores[clave]
        if v is None:
            continue
        medidas += 1
        umbral, unidad, direccion, etiqueta, accion = UMBRALES[clave]
        lo, hi = RANGOS.get(clave, (umbral, umbral))
        signo = "<" if direccion == "menor" else ">"
        ref = f"{signo} {lo:g}-{hi:g}{unidad}" if lo != hi else f"{signo} {lo:g}{unidad}"
        estado = evaluar(clave, v)
        marca = {"FALLA": "[FALLA] ", "GRIS": "[LIMITE]", "OK": "[ok]    "}[estado]
        valor_txt = f"{v:g}{unidad}"
        print(f"  {marca} {etiqueta:<34}{valor_txt:>8}   umbral: {ref}")
        if estado == "FALLA":
            fallas.append((clave, v, accion))
        elif estado == "GRIS":
            grises.append((clave, v, accion))

    if medidas == 0:
        print("\n  No pasaste ninguna metrica. Necesito al menos las de Q2:")
        print("  --retencion3s  --tiempo-video  --ctr  --tasa-conversion")
        print("  --frecuencia  --cpm\n")
        sys.exit(1)

    # --- Q3 ---------------------------------------------------------------
    print("\nQ3 — QUE HAREMOS AL RESPECTO")
    if fallas:
        clave, valor, accion = fallas[0]
        print(f"\n  PRIMERA METRICA QUE FALLA: {clave}  ({valor:g})")
        print(f"  ACCION: {accion}")
        if len(fallas) > 1:
            otras = ", ".join(k for k, _, _ in fallas[1:])
            print(f"\n  Tambien fallan: {otras}")
            print("  Arreglalas DESPUES. Un cambio a la vez por conjunto, si no")
            print("  no vas a saber cual funciono.")
    elif grises:
        clave, valor, accion = grises[0]
        print(f"\n  Nada falla, pero {clave} esta en el limite ({valor:g}).")
        print(f"  Vigila y prepara: {accion}")
    else:
        print("\n  Todas las metricas de Q2 estan sanas.")
        if a.costo is not None and a.objetivo is not None and a.costo > a.objetivo:
            print("\n  >>> Q2 sana + Q1 mal = EL PROBLEMA NO ESTA EN META ADS. <<<")
            print("  Revisa el cierre comercial, el precio, la oferta o el checkout.")
            print("  Aplica las 3 formas de mejorar la oferta: Gratis / Garantia /")
            print("  Pago facil.")
        else:
            print("  Si el costo por resultado esta bajo el objetivo, toca ESCALAR:")
            print("  +35% de presupuesto cada 3-7 dias, vigilando el Numero Magico.")

    print("\n  Proxima revision: en 5-7 dias.\n")


if __name__ == "__main__":
    main()
