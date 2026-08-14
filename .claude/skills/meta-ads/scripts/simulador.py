#!/usr/bin/env python3
"""
Simulador de campanas de Meta Ads.

Responde "con este presupuesto y estas metricas, que resultados salen?" ANTES de
gastar. Tambien sirve para diagnosticar: reemplaza los valores por defecto con tus
metricas reales y compara.

Modelos disponibles:
  conversaciones   Mensajes / WhatsApp / DM
  compras          Compras en sitio web (incluye ROAS)
  leads-meta       Clientes Potenciales con formulario nativo de Meta
  leads-web        Clientes Potenciales en el sitio web
  alcance          Alcance / Thruplays

Ejemplos:
  python3 simulador.py conversaciones --gasto 1000
  python3 simulador.py compras --gasto 1000 --cpm 12 --ticket 80
  python3 simulador.py leads-meta --gasto 500 --ctr 3 --tasa 12
  python3 simulador.py --listar

Sin dependencias externas. Solo Python 3.
"""

import argparse
import sys


def money(x):
    return f"${x:,.2f}"


def num(x):
    return f"{x:,.1f}"


# --------------------------------------------------------------------------
# Modelos
# --------------------------------------------------------------------------

def m_conversaciones(a):
    impresiones = (a.gasto / a.cpm) * 1000
    alcance = impresiones / a.frecuencia
    clics = impresiones * (a.ctr / 100)
    conversaciones = clics * (a.tasa / 100)
    costo = a.gasto / conversaciones if conversaciones > 0 else 0
    return [
        ("Impresiones", num(impresiones)),
        ("Alcance", num(alcance)),
        ("Clics unicos en el enlace", num(clics)),
        ("Conversaciones", num(conversaciones)),
        ("Costo por Conversacion", money(costo)),
    ]


def m_compras(a):
    impresiones = (a.gasto / a.cpm) * 1000
    alcance = impresiones / a.frecuencia
    clics_sal = impresiones * (a.clics_salientes / 100)
    visitas = clics_sal * (a.visitas / 100)
    compras = visitas * (a.tasa / 100)
    costo = a.gasto / compras if compras > 0 else 0
    valor = a.ticket * compras
    roas = valor / a.gasto if a.gasto > 0 else 0
    return [
        ("Impresiones", num(impresiones)),
        ("Alcance", num(alcance)),
        ("Clics salientes", num(clics_sal)),
        ("Visitas a la pagina de destino", num(visitas)),
        ("Compras", num(compras)),
        ("Costo por Compra", money(costo)),
        ("Valor de compras", money(valor)),
        ("ROAS", f"{roas:,.2f}"),
    ]


def m_leads_meta(a):
    impresiones = (a.gasto / a.cpm) * 1000
    alcance = impresiones / a.frecuencia
    clics = impresiones * (a.ctr / 100)
    leads = clics * (a.tasa / 100)
    costo = a.gasto / leads if leads > 0 else 0
    return [
        ("Impresiones", num(impresiones)),
        ("Alcance", num(alcance)),
        ("Clics unicos en el enlace", num(clics)),
        ("Clientes Potenciales", num(leads)),
        ("Costo por Cliente Potencial", money(costo)),
    ]


def m_leads_web(a):
    impresiones = (a.gasto / a.cpm) * 1000
    alcance = impresiones / a.frecuencia
    clics_sal = impresiones * (a.clics_salientes / 100)
    visitas = clics_sal * (a.visitas / 100)
    # Por defecto los leads se calculan sobre las VISITAS a la landing (consistente
    # con el modelo de compras). La hoja original del curso los calcula sobre los
    # clics salientes; --legacy reproduce ese comportamiento.
    base = clics_sal if a.legacy else visitas
    leads = base * (a.tasa / 100)
    costo = a.gasto / leads if leads > 0 else 0
    filas = [
        ("Impresiones", num(impresiones)),
        ("Alcance", num(alcance)),
        ("Clics salientes", num(clics_sal)),
        ("Visitas a la pagina de destino", num(visitas)),
        ("Clientes Potenciales", num(leads)),
        ("Costo por Cliente Potencial", money(costo)),
    ]
    if a.legacy:
        filas.append(("(base de calculo)", "clics salientes — modo legacy"))
    return filas


def m_alcance(a):
    alcance = (a.gasto / a.cpm_alcance) * 1000
    impresiones = alcance * a.frecuencia
    thruplays = a.gasto / a.costo_thruplay if a.costo_thruplay > 0 else 0
    return [
        ("Alcance", num(alcance)),
        ("Impresiones", num(impresiones)),
        ("Thruplays", num(thruplays)),
    ]


MODELOS = {
    "conversaciones": (m_conversaciones, "Mensajes / WhatsApp / DM"),
    "compras": (m_compras, "Compras en sitio web (con ROAS)"),
    "leads-meta": (m_leads_meta, "Clientes Potenciales — formulario nativo de Meta"),
    "leads-web": (m_leads_web, "Clientes Potenciales en el sitio web"),
    "alcance": (m_alcance, "Alcance / Thruplays"),
}

# Valores de referencia del simulador del curso, por modelo.
DEFAULTS = {
    "conversaciones": dict(gasto=1000, cpm=3.0, ctr=3.0, tasa=20.0, frecuencia=2.0),
    "compras": dict(gasto=1000, cpm=10.0, clics_salientes=2.0, visitas=70.0,
                    tasa=4.0, frecuencia=2.0, ticket=100.0),
    "leads-meta": dict(gasto=1000, cpm=7.0, ctr=2.5, tasa=10.0, frecuencia=2.0),
    "leads-web": dict(gasto=1000, cpm=10.0, clics_salientes=1.5, visitas=80.0,
                      tasa=20.0, frecuencia=1.5),
    "alcance": dict(gasto=300, cpm_alcance=0.7, costo_thruplay=0.01, frecuencia=1.2),
}

ENTRADAS = {
    "gasto": "Importe gastado ($)",
    "cpm": "CPM ($)",
    "ctr": "CTR unico en el enlace (%)",
    "tasa": "Tasa de conversion (%)",
    "frecuencia": "Frecuencia",
    "clics_salientes": "Porcentaje de clics salientes (%)",
    "visitas": "Porcentaje de visitas (%)",
    "ticket": "Valor de compra promedio ($)",
    "cpm_alcance": "Costo por mil personas alcanzadas ($)",
    "costo_thruplay": "Costo por Thruplay ($)",
}


def listar():
    print("\nModelos disponibles:\n")
    for k, (_, desc) in MODELOS.items():
        print(f"  {k:<16} {desc}")
        d = DEFAULTS[k]
        campos = ", ".join(f"{c}={v}" for c, v in d.items())
        print(f"  {'':<16} defaults: {campos}\n")


def main():
    if "--listar" in sys.argv:
        listar()
        return

    p = argparse.ArgumentParser(
        description="Simulador de campanas de Meta Ads.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("modelo", choices=list(MODELOS.keys()),
                   help="Modelo a simular.")
    p.add_argument("--gasto", type=float, help="Importe gastado ($).")
    p.add_argument("--cpm", type=float, help="CPM ($).")
    p.add_argument("--ctr", type=float, help="CTR unico en el enlace (%%).")
    p.add_argument("--tasa", type=float, help="Tasa de conversion (%%).")
    p.add_argument("--frecuencia", type=float, help="Frecuencia.")
    p.add_argument("--clics-salientes", dest="clics_salientes", type=float,
                   help="Porcentaje de clics salientes (%%).")
    p.add_argument("--visitas", type=float,
                   help="Porcentaje de visitas que cargan la landing (%%).")
    p.add_argument("--ticket", type=float, help="Valor de compra promedio ($).")
    p.add_argument("--cpm-alcance", dest="cpm_alcance", type=float,
                   help="Costo por mil personas alcanzadas ($).")
    p.add_argument("--costo-thruplay", dest="costo_thruplay", type=float,
                   help="Costo por Thruplay ($).")
    p.add_argument("--legacy", "--legacy-leads-web", dest="legacy",
                   action="store_true",
                   help="leads-web: calcula leads sobre clics salientes (hoja original).")
    p.add_argument("--listar", action="store_true",
                   help="Lista los modelos y sus valores por defecto.")
    a = p.parse_args()

    # Rellenar con defaults del modelo lo que no se paso por CLI.
    for campo, valor in DEFAULTS[a.modelo].items():
        if getattr(a, campo, None) is None:
            setattr(a, campo, valor)

    for campo in ("cpm", "cpm_alcance", "costo_thruplay", "frecuencia"):
        v = getattr(a, campo, None)
        if v is not None and v <= 0:
            print(f"Error: {campo} debe ser mayor que 0.", file=sys.stderr)
            sys.exit(1)

    fn, desc = MODELOS[a.modelo]

    print()
    print("=" * 60)
    print(f"  SIMULADOR — {a.modelo.upper()}  ·  {desc}")
    print("=" * 60)

    print("\nENTRADAS")
    for campo in DEFAULTS[a.modelo]:
        etiqueta = ENTRADAS.get(campo, campo)
        print(f"  {etiqueta:<38} {getattr(a, campo)}")

    print("\nRESULTADOS")
    for etiqueta, valor in fn(a):
        print(f"  {etiqueta:<38} {valor}")

    print("\n  Compara el costo por resultado contra tu objetivo (presupuesto.py).")
    print("  Si no llega, el problema es la oferta o el ticket, no los anuncios.\n")


if __name__ == "__main__":
    main()
