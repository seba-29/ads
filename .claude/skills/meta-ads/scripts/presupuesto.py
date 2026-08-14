#!/usr/bin/env python3
"""
Calculadora de presupuesto para anuncios en Facebook e Instagram.

De la meta de ventas a: inversion necesaria, CPA objetivo, ROAS objetivo y el
reparto 60/20/10/10 del Ciclo de Ventas.

Modo VENTAS (venta directa, ej. e-commerce):
    python3 presupuesto.py --meta 20000 --ticket 50 --margen 16

Modo LEADS (mensajes / clientes potenciales, con paso intermedio de conversacion):
    python3 presupuesto.py --meta 400000 --ticket 10000 --margen 0.75 --conv-leads 9

Sin dependencias externas. Solo Python 3.
"""

import argparse
import sys

ETAPAS = [
    ("Presentacion", 0.60),
    ("Evaluacion", 0.20),
    ("Conversion", 0.10),
    ("Ascension", 0.10),
]


def money(x):
    return f"${x:,.2f}"


def calcular(meta, ticket, margen_pct, conv_leads_pct=None):
    """margen_pct y conv_leads_pct llegan como porcentaje (16 = 16%)."""
    if ticket <= 0:
        raise ValueError("El ticket promedio debe ser mayor que 0.")
    if not 0 < margen_pct <= 100:
        raise ValueError("El % a invertir debe estar entre 0 y 100.")

    margen = margen_pct / 100.0
    ventas_necesarias = meta / ticket
    cpa_objetivo = ticket * margen
    inversion = meta * margen
    roas_objetivo = meta / inversion  # equivale a 1 / margen

    res = {
        "meta": meta,
        "ticket": ticket,
        "margen_pct": margen_pct,
        "ventas_necesarias": ventas_necesarias,
        "cpa_objetivo": cpa_objetivo,
        "inversion": inversion,
        "roas_objetivo": roas_objetivo,
        "cpl_objetivo": None,
        "conv_leads_pct": conv_leads_pct,
    }

    if conv_leads_pct is not None:
        if not 0 < conv_leads_pct <= 100:
            raise ValueError("El % de conversion de leads debe estar entre 0 y 100.")
        res["cpl_objetivo"] = cpa_objetivo * (conv_leads_pct / 100.0)
        res["leads_necesarios"] = ventas_necesarias / (conv_leads_pct / 100.0)

    return res


def imprimir(r):
    modo = "LEADS / MENSAJES" if r["cpl_objetivo"] is not None else "VENTA DIRECTA"
    print()
    print("=" * 66)
    print(f"  CALCULADORA DE PRESUPUESTO  ·  modo {modo}")
    print("=" * 66)

    print("\nPASO 1 — Cuanto quieres vender")
    print(f"  Meta de ventas .................... {money(r['meta'])}")
    print(f"  Ticket promedio .................. {money(r['ticket'])}")
    print(f"  Numero de ventas necesarias ...... {r['ventas_necesarias']:,.1f}")

    print("\nPASO 2 — Cuanto estas dispuesto a invertir por cliente")
    print(f"  % a invertir por nuevo cliente ... {r['margen_pct']:.2f}%")
    print(f"  Costo por Compra Objetivo (CPA) .. {money(r['cpa_objetivo'])}")

    if r["cpl_objetivo"] is not None:
        print(f"  % de conversion de leads a venta . {r['conv_leads_pct']:.2f}%")
        print(f"  Leads necesarios ................. {r['leads_necesarios']:,.1f}")
        print(f"  Costo por Lead / Conversacion .... {money(r['cpl_objetivo'])}  <-- tu metrica diaria")

    print(f"  Inversion Necesaria .............. {money(r['inversion'])}")
    print(f"  ROAS Objetivo .................... {r['roas_objetivo']:,.2f}")

    print("\nREPARTO EN EL CICLO DE VENTAS")
    print(f"  {'Etapa':<16}{'%':>6}{'Mensual':>16}{'Diario (/30)':>16}")
    print("  " + "-" * 52)
    for nombre, pct in ETAPAS:
        mensual = r["inversion"] * pct
        print(f"  {nombre:<16}{pct*100:>5.0f}%{money(mensual):>16}{money(mensual/30):>16}")

    print("\nRECORDATORIO")
    print("  El % a invertir NO es todo tu margen de utilidad: es el % que estas")
    print("  dispuesto a invertir para adquirir un cliente nuevo. Margen 35% y")
    print("  quieres ganar minimo 15% -> el % a invertir es 20%.")

    if r["inversion"] / 30 < 5:
        print("\n  [AVISO] El presupuesto diario total es muy bajo. Con cifras asi,")
        print("          consolida etapas (Presentacion + un solo retargeting) en vez")
        print("          de repartir en cuatro campanas que no salen de aprendizaje.")
    print()


def main():
    p = argparse.ArgumentParser(
        description="Calculadora de presupuesto para Meta Ads (Ciclo de Ventas).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--meta", type=float, required=True,
                   help="Meta de ventas del periodo (mensual).")
    p.add_argument("--ticket", type=float, required=True,
                   help="Ticket promedio.")
    p.add_argument("--margen", type=float, required=True,
                   help="%% que estas dispuesto a invertir para adquirir un cliente (ej. 16).")
    p.add_argument("--conv-leads", type=float, default=None,
                   help="%% de conversion de leads/mensajes a venta. Si no tienes el dato, usa 5. "
                        "Activa el modo LEADS.")
    a = p.parse_args()

    try:
        imprimir(calcular(a.meta, a.ticket, a.margen, a.conv_leads))
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
