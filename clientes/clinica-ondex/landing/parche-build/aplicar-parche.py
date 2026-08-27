#!/usr/bin/env python3
"""
Vuelve a aplicar los arreglos de Ondex sobre una carpeta dist/ recién compilada.

Para qué existe
---------------
El código fuente de las landings «Home» y «Recupera el control» sale sin píxel,
sin envío al CRM, con URLs de localhost en el nav y con el favicon de plantilla.
Mientras eso no se corrija en el fuente, cada compilación nueva vuelve a salir
rota — y rota en silencio: la página carga perfecta y los leads desaparecen.

Este script corrige la carpeta compilada. Es idempotente: correrlo dos veces
sobre la misma carpeta no hace daño.

Uso
---
    python3 aplicar-parche.py <carpeta-dist> <home|recupera>

Solo estas dos. Método y Kinesiología ya salen correctas desde su código
fuente (llevan el píxel y el envío al CRM dentro del proyecto), así que
aplicarles esto duplicaría el píxel.

Ejemplo
-------
    npm run build
    python3 aplicar-parche.py dist home
    # y subir dist/ a Netlify
"""

import json
import pathlib
import re
import shutil
import sys

AQUI = pathlib.Path(__file__).resolve().parent

WEBHOOK = ("https://services.leadconnectorhq.com/hooks/CHtgjFPx4hWkSAtKewIo"
           "/webhook-trigger/818f97bf-925a-4fc7-b21d-c110a878ddd6")
PIXEL = "1354537603365442"
WHATSAPP = "56952296611"

URLS = {
    "metodo":       "https://metodoondex.clinicaondex.cl/",
    "kinesiologia": "https://kinesiologia.clinicaondex.cl/",
    "recupera":     "https://recupera.clinicaondex.cl/",
    "home":         "https://clinicaondex.cl/",
}

SITIOS = {
    "home": {
        "title": "Clínica Ondex | Kinesiología y ondas de choque en Santiago",
        "desc": "Más de 30 años tratando el dolor en Santiago y +10.000 pacientes. "
                "Elige tu tratamiento y agenda tu evaluación.",
        "origen": "home", "nombre": "Home", "og": "/ondas-1.jpg",
        "redirects": "_redirects-home",
    },
    "recupera": {
        "title": "Recupera el control | Clínica Ondex",
        "desc": "El dolor que no se va no se soluciona solo. Agenda tu evaluación "
                "en Clínica Ondex, Santiago.",
        "origen": "recupera-el-control", "nombre": "Recupera el control",
        "og": "/foto-evaluacion.jpg", "redirects": None,
    },
}

FAVICONS = ["favicon.ico", "favicon-512.png", "favicon-32x32.png",
            "favicon-16x16.png", "apple-touch-icon.png"]

MARCA = "<!-- parche-ondex -->"   # evita aplicar dos veces


def pixel_snippet() -> str:
    return f"""    {MARCA}
    <script>
      !function(f,b,e,v,n,t,s){{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)}};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '{PIXEL}');
      fbq('track', 'PageView');
    </script>
"""


def puente(origen: str, nombre: str) -> str:
    plantilla = (AQUI / "puente-formulario.html").read_text(encoding="utf-8")
    return (plantilla.replace("__WEBHOOK__", WEBHOOK)
                     .replace("__ORIGEN__", origen)
                     .replace("__ORIGEN_NOMBRE__", nombre))


def main() -> int:
    if len(sys.argv) != 3 or sys.argv[2] not in SITIOS:
        print(__doc__)
        print("sitios válidos:", ", ".join(SITIOS))
        return 1

    dist = pathlib.Path(sys.argv[1])
    clave = sys.argv[2]
    conf = SITIOS[clave]

    if not (dist / "index.html").exists():
        print(f"✗ no encuentro {dist}/index.html — ¿es la carpeta compilada?")
        return 1

    html = (dist / "index.html").read_text(encoding="utf-8")

    # Quita cualquier parche anterior antes de volver a ponerlo. No se confía en
    # la marca: las primeras versiones se aplicaron a mano y no la llevan. Se
    # buscan los <script> que contengan el pixel o el webhook, vengan de donde
    # vengan, para que correr esto dos veces no duplique nada.
    def sin_scripts_del_parche(texto: str) -> str:
        def fuera(m):
            cuerpo = m.group(0)
            return "" if ("fbq(" in cuerpo or WEBHOOK in cuerpo) else cuerpo
        return re.sub(r"<script\b[^>]*>.*?</script>", fuera, texto, flags=re.S)

    antes_scripts = len(re.findall(r"fbq\('init'", html))
    html = sin_scripts_del_parche(html)
    html = html.replace(MARCA, "")
    if antes_scripts:
        print(f"· habia {antes_scripts} parche(s) previo(s); se reemplazan")

    # ---- 1. reemplazar los localhost del bundle ----
    total = 0
    for js in dist.glob("assets/*.js"):
        s = js.read_text(encoding="utf-8")
        antes = len(re.findall(r"http://localhost:\d+", s))
        # 5173 = Método · 5180 = Kinesiología · 5190 = el "home" que no existía
        for puerto, destino in ((5173, URLS["metodo"]),
                                (5180, URLS["kinesiologia"]),
                                (5190, URLS["home"])):
            viejo = f"http://localhost:{puerto}"
            for comilla in ("`", '"', "'"):
                s = s.replace(f"{comilla}{viejo}{comilla}",
                              f"{comilla}{destino}{comilla}")
        js.write_text(s, encoding="utf-8")
        total += antes - len(re.findall(r"http://localhost:\d+", s))
    print(f"✓ bundle: {total} URL(s) de localhost reemplazadas")

    # ---- 2. favicons ----
    for f in FAVICONS:
        shutil.copy(AQUI / "favicon" / f, dist / f)
    (dist / "favicon.svg").unlink(missing_ok=True)
    print("✓ favicons de Ondex instalados, favicon.svg de plantilla eliminado")

    # ---- 3. cabecera ----
    html = re.sub(r'<html lang="[^"]*"', '<html lang="es-CL"', html)
    html = re.sub(r"<title>.*?</title>", f'<title>{conf["title"]}</title>',
                  html, flags=re.S)
    html = re.sub(r'\s*<link rel="icon"[^>]*>', "", html)
    html = re.sub(r'\s*<meta name="(description|theme-color)"[^>]*>', "", html)
    html = re.sub(r'\s*<meta property="og:[^"]*"[^>]*>', "", html)

    cabeza = f"""    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#1d48f8" />
    <meta name="description" content="{conf["desc"]}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="{conf["title"]}" />
    <meta property="og:description" content="{conf["desc"]}" />
    <meta property="og:image" content="{conf["og"]}" />
    <meta property="og:locale" content="es_CL" />
"""
    html = html.replace("</head>",
                        cabeza + pixel_snippet()
                        + puente(conf["origen"], conf["nombre"]) + "  </head>")
    (dist / "index.html").write_text(html, encoding="utf-8")
    print(f'✓ index.html: lang, title, favicons, Open Graph, píxel y puente')

    # ---- 4. cabeceras de caché ----
    (dist / "_headers").write_text(
        "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n"
        "/*.mp4\n  Cache-Control: public, max-age=2592000\n"
        "/*.jpg\n  Cache-Control: public, max-age=2592000\n"
        "/*.png\n  Cache-Control: public, max-age=2592000\n"
        "/index.html\n  Cache-Control: public, max-age=0, must-revalidate\n")

    # ---- 5. redirecciones, sólo el Home ----
    if conf["redirects"]:
        shutil.copy(AQUI / conf["redirects"], dist / "_redirects")
        print("✓ _redirects de la migración del WordPress")

    # ---- 6. netlify.toml ----
    (dist / "netlify.toml").write_text(
        "# Sitio ya compilado: se publica esta carpeta tal cual.\n"
        '[build]\n  publish = "."\n  command = ""\n')

    # ---- verificación ----
    print("\n--- verificación ---")
    html = (dist / "index.html").read_text(encoding="utf-8")
    restantes = sum(len(re.findall(r"http://localhost:\d+", p.read_text(encoding="utf-8")))
                    for p in dist.glob("assets/*.js"))
    checks = [
        ("píxel presente", f"fbq('init', '{PIXEL}')" in html),
        ("puente presente", WEBHOOK in html),
        ("lang es-CL", 'lang="es-CL"' in html),
        ("sin localhost", restantes == 0),
        ("favicon.svg eliminado", not (dist / "favicon.svg").exists()),
    ]
    for etiqueta, ok in checks:
        print(f"  {'✓' if ok else '✗'} {etiqueta}")
    return 0 if all(ok for _, ok in checks) else 1


if __name__ == "__main__":
    sys.exit(main())
