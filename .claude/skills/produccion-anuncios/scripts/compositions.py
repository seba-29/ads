#!/usr/bin/env python3
"""
compositions.py — declaración ÚNICA de la paleta de 14 composiciones.

POR QUÉ EXISTE
--------------
Mismo motivo que `alpha_sections.py`. La clasificación "objeto entero vs recorte" que usa
el gate de cobertura de silueta (Ley 19) estaba escrita como una lista literal de substrings
dentro de `validate-payload.py`, y `composition` nunca se validaba contra un vocabulario
cerrado: `parse-concepts.js` lo saca del markdown con un regex y lo pasa tal cual. Un gate
por substring sobre texto libre es probabilístico, y ya tenía tres agujeros verificados:

  · `Hand-held POV` no matcheaba ninguna palabra de la lista — y "manos alisando la prenda"
    es literalmente una de las composiciones del incidente que motivó el gate.
  · `Documentary/candid` tampoco matcheaba.
  · `Overhead flat-lay` (con guion) se salteaba el gate, y esa grafía la usa la propia
    referencia del skill.

Un gate que se apaga en silencio para una composición es peor que no tenerlo: da verde y
nadie se entera. Con esta declaración, un rename rompe la RESOLUCIÓN y falla fuerte.

QUÉ ES `whole_view`
-------------------
True  = la composición muestra el producto COMO OBJETO ENTERO, con su silueta en cuadro
        (puesto, tendido, sostenido, saliendo de una caja, con spotlight).
False = la composición es un RECORTE por definición: la silueta nunca entra en cuadro, así
        que un producto del que solo hay un macro sigue siendo seguro.

La lista canónica y las descripciones viven en `reference/ideation-image-prompt.md`
(Paleta de Composición). Acá va solo lo que el código necesita decidir.
"""

import unicodedata

COMPOSITIONS = [
    {"id": 1,  "label": "Overhead flat lay",     "whole_view": True,  "aliases": ["flat lay", "flat-lay", "flatlay", "cenital"]},
    {"id": 2,  "label": "Eye-level lifestyle",   "whole_view": True,  "aliases": ["lifestyle", "eye level lifestyle", "eye-level"]},
    {"id": 3,  "label": "Close-up detail",       "whole_view": False, "aliases": ["close-up detail", "close up detail", "closeup detail", "detalle"]},
    {"id": 4,  "label": "Environmental wide",    "whole_view": True,  "aliases": ["environmental", "wide ambiental", "plano ambiental"]},
    {"id": 5,  "label": "Hand-held POV",         "whole_view": True,  "aliases": ["hand-held pov", "hand held pov", "handheld pov", "pov", "primera persona"]},
    {"id": 6,  "label": "Split contrast",        "whole_view": False, "aliases": ["split contrast", "contraste dividido", "antes/despues", "antes despues"]},
    {"id": 7,  "label": "Typography-forward",    "whole_view": False, "aliases": ["typography-forward", "typography forward", "tipografia"]},
    {"id": 8,  "label": "Dramatic product hero", "whole_view": True,  "aliases": ["product hero", "dramatic hero", "hero de producto", "hero"]},
    {"id": 9,  "label": "Documentary/candid",    "whole_view": True,  "aliases": ["documentary", "candid", "documental", "espontaneo"]},
    {"id": 10, "label": "Proof/evidence",        "whole_view": True,  "aliases": ["proof", "evidence", "prueba", "testimonio", "garantia"]},
    {"id": 11, "label": "Texture macro",         "whole_view": False, "aliases": ["texture macro", "macro de textura", "macro"]},
    {"id": 12, "label": "UGC / phone-selfie",    "whole_view": True,  "aliases": ["ugc", "phone-selfie", "phone selfie", "selfie"]},
    {"id": 13, "label": "Unboxing",              "whole_view": True,  "aliases": ["unboxing", "apertura"]},
    {"id": 14, "label": "Feature callout",       "whole_view": True,  "aliases": ["feature callout", "callout", "anotacion"]},
]

TOTAL = len(COMPOSITIONS)
WHOLE_VIEW_LABELS = [c["label"] for c in COMPOSITIONS if c["whole_view"]]
CROP_LABELS       = [c["label"] for c in COMPOSITIONS if not c["whole_view"]]


def _norm(s):
    """Minúsculas, sin acentos, y separadores unificados a espacio.

    Unificar `-`, `_` y `/` a espacio es lo que hace que `Overhead flat-lay`,
    `Overhead flat lay` y `overhead_flat_lay` resuelvan a la misma composición — el agujero
    que tenía el matching viejo, que solo normalizaba acentos.
    """
    s = ''.join(c for c in unicodedata.normalize('NFD', s or '') if unicodedata.category(c) != 'Mn')
    s = s.lower()
    for ch in '-_/':
        s = s.replace(ch, ' ')
    return ' '.join(s.split())


# Alias más específico primero: así "close-up detail" gana sobre "detalle" y
# "hand-held pov" gana sobre "pov" cuando el texto contiene los dos.
_INDEX = []
for _c in COMPOSITIONS:
    for _a in [_c["label"]] + _c["aliases"]:
        _INDEX.append((_norm(_a), _c))
_INDEX.sort(key=lambda p: len(p[0]), reverse=True)


def resolve(comp_text):
    """Devuelve la composición canónica que nombra `comp_text`, o None si no resuelve."""
    n = _norm(comp_text)
    if not n:
        return None
    for alias, comp in _INDEX:
        if alias in n:
            return comp
    return None


def is_whole_view(comp_text):
    """True si la composición muestra el producto entero. None → False (no adivina)."""
    c = resolve(comp_text)
    return bool(c and c["whole_view"])


def labels_hint():
    """Las 14 etiquetas canónicas, para los mensajes de error del validador."""
    return " · ".join(c["label"] for c in COMPOSITIONS)
