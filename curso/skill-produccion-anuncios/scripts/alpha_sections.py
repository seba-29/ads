#!/usr/bin/env python3
"""
alpha_sections.py — declaración ÚNICA de las secciones obligatorias del Alpha Prompt.

POR QUÉ EXISTE
--------------
El alpha-prompt (`brand/alpha-prompt.txt`) es la Capa 1: va idéntica en las 30 celdas.
Dos scripts distintos dependen de sus secciones y, hasta v6.2, cada uno tenía su propia
lista escrita a mano:

  · validate-payload.py  — la compuerta: FALLA si al alpha le falta una sección obligatoria.
  · build-jobs.py        — compact_alpha(): cuando el alpha no entra en el presupuesto de
                           chars, conserva SOLO las secciones que conoce y tira el resto.

Cuando las dos listas divergen, la compuerta da verde mientras el prompt que se envía perdió
una sección — y las 30 imágenes salen mal por USD 1,50. Pasó dos veces el 2026-07-30:
`CTA STYLE` se caía al compactar (anuncios sin llamado a la acción), y la paleta entera se
caía si la sección se llamaba `PALETTE` en vez de `COLOR PALETTE` (30 celdas fuera de marca).

Desde v6.3 las dos importan ESTA lista. Agregar o renombrar una sección obligatoria se hace
acá y en un solo lugar.

QUÉ SECCIONES SON OBLIGATORIAS Y POR QUÉ
----------------------------------------
Las cuatro están declaradas como obligatorias en la documentación del propio skill
(`reference/output-schemas.md` y `reference/alpha-prompt-framework.md`), no son un criterio
inventado acá:

  COLOR PALETTE  output-schemas.md: bloque "COLOR PALETTE (exact values)".
                 Sin ella el alpha no fija los hex de marca y las 30 salen fuera de marca
                 (la falla de la Ley 14).
  TYPOGRAPHY     output-schemas.md. Es lo único que le recuerda al modelo, en TODA celda, que
                 esto es un anuncio con titular. Sin ella los anuncios salen MUDOS — primero
                 en las composiciones sin espacio negativo (texture macro, close-up). Ley 16.
  CTA STYLE      output-schemas.md. Sin ella el modelo improvisa u omite el CTA celda por celda.
  NEVER          output-schemas.md: "NEVER section obligatoria — 5-8 exclusiones".
                 alpha-prompt-framework.md: "Capa NEVER es obligatoria [...] Es el control de
                 calidad." Es lo que mantiene fuera de la escena las marcas de terceros, el
                 look plástico y los colores prohibidos.

NOTA SOBRE `lib/kie-api-helpers.sh`
-----------------------------------
Ese archivo tiene su propio regex awk con nombres de sección parecidos (`CTA|TYPOGRAPHY|
WORDMARK|BRAND MARK|TEXT ON`). NO se unificó acá a propósito: ese bloque corre únicamente en
`--mode video`, y este paquete fija `--mode image` en duro (build-jobs.py) y se entrega sin
video. Es código inalcanzable en el paquete público; tocarlo sería riesgo sin beneficio.
Si algún día se reactiva el modo video, ese es el momento de hacerlo leer esta lista.
"""

import json
import os
import re

# ── Topes por modelo — se LEEN de `model-limits.json` ────────────────────────
# El dato no vive en código: `run-all-ads.sh` es Bash puro y también lo necesita, y una
# copia a mano en cada lenguaje es exactamente el bug de la Ley 20 (tres constantes que
# divergieron, con los valores invertidos en el script de Bash). Como JSON lo leen los dos:
# Python con `json.load`, Bash con `jq`. Un solo lugar para editarlo.
#
# Un tope demasiado alto es PEOR que no tener tope: la compuerta da verde a prompts que el
# modelo no puede procesar, y el fallo aparece recién al enviar, disfrazado de
# `Internal Error` — el mismo síntoma que la cláusula TEXT duplicada (Ley 17) y que la
# moderación (Ley 15). Tres causas, un solo mensaje.
_LIMITS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model-limits.json")
with open(_LIMITS_PATH, encoding="utf-8") as _f:
    _LIMITS = json.load(_f)

MODEL_CHAR_LIMITS = {m: v["chars"] for m, v in _LIMITS["models"].items()}
MODEL_MAX_REFS    = {m: v["max_refs"] for m, v in _LIMITS["models"].items()}
DEFAULT_MODEL     = _LIMITS["default_model"]

def char_limit_for(model):
    """Tope de chars del modelo. Desconocido → el del default (nunca un valor permisivo)."""
    return MODEL_CHAR_LIMITS.get(model or DEFAULT_MODEL, MODEL_CHAR_LIMITS[DEFAULT_MODEL])

# `names` va del MÁS específico al menos específico: tanto la detección como la extracción
# prueban en ese orden, así "NEVER USE" gana sobre "NEVER" y el cuerpo extraído no se queda
# con un "USE:" pegado adelante.
# `label` es aparte a propósito: es cómo se NOMBRA la sección en los mensajes de error y al
# reescribir el alpha compactado. Debe coincidir con cómo la llama la documentación del skill
# (`reference/output-schemas.md`), no con la grafía más larga que se acepte al leer.
REQUIRED_SECTIONS = [
    {
        "key": "palette",
        "label": "COLOR PALETTE",
        "names": ["COLOR PALETTE", "PALETTE"],
        "compact_limit": 200,
        "hint": ("los hex exactos de la marca (primario, secundarios, fondo, texto). "
                 "Sin esto las 30 salen fuera de marca."),
    },
    {
        "key": "typography",
        "label": "TYPOGRAPHY",
        "names": ["TYPOGRAPHY"],
        "compact_limit": 110,
        "hint": ("cuerpo/peso/color del titular, dónde se ubica, y la ortografía del AD_LANG "
                 "(en español: acentos y AMBOS signos invertidos ¿ ¡)."),
    },
    {
        "key": "cta",
        "label": "CTA STYLE",
        "names": ["CTA STYLE", "CTA"],
        "compact_limit": 110,
        "hint": "forma, color y ubicación del CTA.",
    },
    {
        "key": "never",
        "label": "NEVER",
        "names": ["NEVER USE", "NEVER"],
        "compact_limit": 170,
        "hint": ("5-8 exclusiones explícitas (colores prohibidos, marcas de terceros, look "
                 "plástico, texto inventado). Es el control de calidad del alpha."),
    },
]


def matched_name(alpha_text, section):
    """Devuelve la grafía con la que la sección aparece en el alpha, o None si no está.

    Ancla al inicio de línea: un 'CTA' suelto en medio de una frase no cuenta como sección.
    Acepta tanto 'TYPOGRAPHY:' como 'TYPOGRAPHY — ...' (las dos formas se usan en la práctica).
    """
    for name in section["names"]:
        if re.search(r'(?im)^[ \t]*%s\b' % re.escape(name), alpha_text or ""):
            return name
    return None


def missing(alpha_text):
    """Lista de secciones obligatorias ausentes, en el orden declarado."""
    return [s for s in REQUIRED_SECTIONS if matched_name(alpha_text, s) is None]


def canonical_label(section):
    """Cómo se NOMBRA la sección (mensajes de error, alpha compactado)."""
    return section["label"]
