#!/usr/bin/env python3
"""
Cambia un precio dentro de un build ya compilado de las landings de Ondex.

Para que existe: el precio vive en el codigo fuente, y lo correcto es cambiarlo
alli y recompilar. Este script es el plan B para cuando solo se tiene el `dist`
compilado y hay que corregir un precio en produccion ya mismo.

OJO: es un parche sobre el build. La proxima vez que se compile desde el codigo
fuente, el precio vuelve al valor viejo. Si usas esto, anota que el cambio esta
pendiente en el codigo fuente.

El minificador convierte 250000 en 25e4, asi que se buscan las dos formas.

Uso:
    python3 cambiar-precio.py <carpeta_dist> 250000 220000
    python3 cambiar-precio.py dist 250000 220000 --simular   # sin escribir
"""
import argparse
import pathlib
import re
import sys


def formas(n: int):
    """Todas las maneras en que un minificador puede escribir el mismo numero.

    250000 se puede haber compilado como 250000, 25000e1, 2500e2, 250e3 o 25e4.
    Se devuelven de la mas larga a la mas corta para buscar primero la mas
    especifica y no dejar restos a medias.
    """
    out = {str(n)}
    s = str(n)
    ceros = len(s) - len(s.rstrip("0"))
    for k in range(1, ceros + 1):
        out.add(f"{s[:-k]}e{k}")
    return sorted(out, key=len, reverse=True)


def forma_corta(n: int) -> str:
    """La forma mas compacta, que es la que habria elegido el minificador."""
    return min(formas(n), key=len)


def main():
    p = argparse.ArgumentParser(description="Cambia un precio en un build compilado.")
    p.add_argument("dist", help="carpeta del build (ej: dist)")
    p.add_argument("viejo", type=int, help="precio actual, ej 250000")
    p.add_argument("nuevo", type=int, help="precio nuevo, ej 220000")
    p.add_argument("--simular", action="store_true", help="muestra sin escribir")
    a = p.parse_args()

    raiz = pathlib.Path(a.dist)
    if not raiz.is_dir():
        sys.exit(f"No existe la carpeta {raiz}")

    viejas, nueva_base = formas(a.viejo), str(a.nuevo)
    total = 0

    for f in list(raiz.rglob("*.js")) + list(raiz.rglob("*.html")):
        texto = f.read_text(encoding="utf-8", errors="ignore")
        original, cambios = texto, 0
        for v in viejas:
            # \b evita convertir 1250000 en 1220000: solo el numero completo.
            patron = r"(?<![\w.])" + re.escape(v) + r"(?![\w.])"
            # Si el viejo venia en notacion exponencial, el nuevo tambien:
            # asi el archivo no cambia de largo mas de lo necesario.
            reemplazo = forma_corta(a.nuevo) if "e" in v else nueva_base
            texto, n = re.subn(patron, reemplazo, texto)
            cambios += n
        if cambios:
            total += cambios
            print(f"  {f.relative_to(raiz)}: {cambios} reemplazo(s)")
            if not a.simular:
                f.write_text(texto, encoding="utf-8")

    if total == 0:
        print(f"No se encontro {a.viejo} (probe: {', '.join(viejas)}).")
        print("Revisa que sea la carpeta correcta y que el precio no se arme por partes.")
        return 1

    print(f"\n{total} reemplazo(s){' (SIMULACION, no se escribio nada)' if a.simular else ''}.")
    if not a.simular:
        print("Recuerda: esto es un parche sobre el build. Cambialo tambien en el")
        print("codigo fuente o la proxima compilacion lo revierte.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
