#!/usr/bin/env python3
"""
validate-payload.py — Compuerta de integridad ANTES de gastar en la API.

Verifica que los 30 jobs estén bien cableados (prompt + refs) antes de renderizar.
NO inspecciona imágenes (eso lo hace el humano). Emite fallos LEGIBLES para que
el LLM corrija conceptos-30.md y vuelva a validar (loop de auto-reparación, máx ~3 pasadas).

Uso:
    python static-ads/validate-payload.py students/2026-W21-beckett-simonon

Salida: reporte por celda + resumen. Exit 0 = todo OK (listo para render); Exit 1 = hay FAIL.
"""

import json, os, sys, re, unicodedata
from collections import Counter

# Antes de cualquier import local: sin esto, importar alpha_sections deja un
# scripts/__pycache__/ dentro de la carpeta de la skill en CADA corrida — basura que
# después viaja en el paquete que se regala. El arranque es 0,12s; el cache no hace falta.
sys.dont_write_bytecode = True
import alpha_sections   # declaración única de las secciones obligatorias del alpha (v6.3)
import compositions    # declaración única de la paleta de 14 composiciones (v7)

if len(sys.argv) < 2:
    print("Usage: python static-ads/validate-payload.py <student_folder>")
    sys.exit(2)

# Portable: STUDENT_DIR is taken as given (absolute, or relative to CWD).
STUDENT_DIR  = os.path.abspath(sys.argv[1])

# Apertura de una cláusula de texto-en-imagen dentro de un Concept (EN). Una sola
# definición: la usan el check de la Ley 17 (cláusula duplicada) y el aviso de
# headline↔imagen, que necesitan coincidir en qué cuenta como "la cláusula TEXT".
TEXT_CLAUSE_RX = re.compile(r'(?<![A-Za-z])TEXT\b[^\n:(]{0,40}[:(]')

def load(name):
    p = os.path.join(STUDENT_DIR, name)
    if not os.path.exists(p):
        print(f"ERROR: missing {name} at {p}")
        sys.exit(2)
    return json.load(open(p, encoding="utf-8"))

jobs = load("jobs.json")

# El tope de chars NO se escribe a mano acá: viaja en jobs.json, que `build-jobs.py` estampa
# con el modelo destino. Antes había una copia local con 8000 que divergió del valor con el
# que se construía el payload. Si jobs.json es viejo y no lo trae, se cae al default del
# módulo compartido — nunca a un valor más permisivo. Ver Ley 20.
_j0 = jobs[0] if isinstance(jobs, list) and jobs else {}
TARGET_MODEL = _j0.get("targetModel") or alpha_sections.DEFAULT_MODEL
_lim = _j0.get("charLimit")
CHAR_LIMIT = _lim if isinstance(_lim, int) and _lim > 0 else alpha_sections.char_limit_for(TARGET_MODEL)

# Raw authored cells (matrix-data.json) — needed to validate secondary product paths
# (build-jobs silently drops non-existent secondary refs; we must catch those here).
raw_cells = {}
_mpath = os.path.join(STUDENT_DIR, "matrix-data.json")
if os.path.exists(_mpath):
    try:
        for c in json.load(open(_mpath, encoding="utf-8")).get("cells", []):
            raw_cells[c.get("num")] = c
    except Exception:
        pass

VALID_ZONES = {"head", "torso", "legs", "hands", "hand", "neck", "feet", "waist", "shoulder"}

# ── Verificación de refs (candado de 3 vueltas) — cubre solo product_refs ─────
# El scraper entrega nombres NEUTROS (product-01…). El Paso 9 (visión) debe (a)
# renombrarlas por su contenido y (b) escribir un ref-manifest.json = "acta" de qué
# es cada foto. La compuerta NO ve píxeles, pero SÍ puede exigir que ese paso ocurrió
# y cruzar la intención de la celda contra la descripción verificada de la foto.
NEUTRAL_REF   = re.compile(r'(^|[\\/])product-\d+\.\w+$', re.I)   # nombre sin clasificar
CLOSEUP_WORDS = ("close", "macro", "closeup", "textura", "texture", "detalle", "detail",
                 "tela", "fabric", "tejido", "fibra", "grano", "weave", "primer plano")
_manifest_cache = {}
def load_manifest(ref_rel):
    """Carga ref-manifest.json de la carpeta donde vive la foto (cacheado)."""
    d = os.path.dirname(os.path.join(STUDENT_DIR, ref_rel))
    if d not in _manifest_cache:
        mp = os.path.join(d, "ref-manifest.json")
        try:
            _manifest_cache[d] = json.load(open(mp, encoding="utf-8")) if os.path.exists(mp) else None
        except Exception:
            _manifest_cache[d] = None
    return _manifest_cache[d]

def manifest_desc(man, base):
    """Descripción de `base` en el manifest, o '' si falta/no es texto (evita crash por JSON malformado)."""
    v = (man or {}).get(base)
    return v if isinstance(v, str) else ""

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s or '') if unicodedata.category(c) != 'Mn').lower().strip()

# La clasificación objeto-entero/recorte vive en `compositions.py` (declaración única de la
# paleta de 14), no en una lista de substrings acá. La versión vieja se apagaba en silencio
# para `Hand-held POV`, `Documentary/candid` y cualquier grafía con guion. Ver Ley 19.


def check_silhouette_coverage(num, comp_label, cited_by_manifest):
    """Vuelta 5 (Ley 19): una composición de OBJETO ENTERO no puede citar un producto cuya
    `vista_completa` sea null — no existe ninguna foto de su forma, así que el modelo la
    inventaría. Distinto de la Vuelta 4: ahí falta una PIEZA nombrada en otra foto; acá
    falta la SILUETA, que no está en ninguna, así que no hay con qué contrastar.
    Solo se llama para celdas de objeto entero; las de recorte no pueden mostrar silueta.
    """
    for d, bases in cited_by_manifest.items():
        cov = (_manifest_cache.get(d) or {}).get("_coverage")
        if not isinstance(cov, dict):
            warn(num, f"celda '{comp_label}' muestra la prenda entera, pero el ref-manifest.json de {os.path.basename(d)} no declara `_coverage` — agregá por producto su `vista_completa` (archivo con la prenda completa) o `null` si no existe (Paso 9, Ley 19)")
            continue
        for prod, info in cov.items():
            if not isinstance(info, dict) or info.get("vista_completa"):
                continue   # hay vista completa: la silueta es conocida
            fotos = {os.path.basename(f) for f in (info.get("fotos") or []) if isinstance(f, str)}
            if fotos & bases:
                fail(num, f"celda '{comp_label}' muestra '{prod}' como prenda entera, pero su `vista_completa` es null en ref-manifest.json — no existe ninguna foto de su silueta, así que el modelo la inventaría. Usá una composición de recorte ({' / '.join(compositions.CROP_LABELS)}), o scrapeá una vista completa y anotala en el acta (Ley 19)")

# Niveles canónicos (orden = columnas de la matriz). Mantener en sync con
# AWARENESS en generate-matrix.js (labels con acento para el Excel).
LEVELS = ["inconsciente", "problema", "solucion", "producto", "decision"]
NO_PRODUCT_LEVELS = set(LEVELS[:2])
PRODUCT_LEVELS    = set(LEVELS[2:])

# Service / infoproduct / SaaS brands have NO physical product photo — the gating
# "niveles 3-5 requieren producto" only applies to physical-product brands.
NON_PHYSICAL = {"servicio", "service", "info", "infoproducto", "saas", "alto ticket", "alto-ticket"}
tipo_oferta = ""
_mc = os.path.join(STUDENT_DIR, "marca-cliente.json")
if os.path.exists(_mc):
    try:
        tipo_oferta = strip_accents(json.load(open(_mc, encoding="utf-8")).get("tipo_oferta", ""))
    except Exception:
        pass
IS_PHYSICAL = tipo_oferta not in NON_PHYSICAL

failures = []  # machine-readable: (ad_num, reason)
warnings = []

def fail(num, reason): failures.append((num, reason))
def warn(num, reason): warnings.append((num, reason))

def is_logo_ref(r): return os.path.basename(r).lower().startswith("logo")

def check_md_stub(path, min_len, required_sections):
    """Artefacto .md autorado por LLM (ej. alpha-research.md): None si no existe;
    si no, lista de secciones requeridas ausentes (vacía = ok; heurística de
    stub reusable para futuros artefactos .md con secciones obligatorias)."""
    if not os.path.exists(path):
        return None
    try:
        text = strip_accents(open(path, encoding="utf-8").read())
    except Exception:
        text = ""
    missing = [s for s in required_sections if s not in text]
    if len(text) < min_len and not missing:
        missing = ["contenido, muy corto"]
    return missing

# ── Gate: brand/alpha-research.md (Paso 10a) ──────────────────────────────────
# Sin este archivo, el Paso 10b (autoría del alpha) puede caer en la paleta cruda
# de detected-colors.json (solo CSS del sitio, ej. fondo cream) en vez de la
# estética real de packaging/IG investigada por el subagente del Paso 10a.
# Hasta ahora esto solo se pedía por instrucción manual en el SKILL.md — sin red
# de código. Detectado en vivo: una corrida de Etérea sin este archivo perdió la
# paleta cósmica saturada (navy/rosa/mint) y usó el fondo crema del sitio.
_ar_path = os.path.join(STUDENT_DIR, "brand", "alpha-research.md")
_ar_missing = check_md_stub(_ar_path, 300, ["role base", "restricciones", "referencia", "vocabulario", "firma t"])
if _ar_missing is None:
    fail("ALL", "falta brand/alpha-research.md — el Paso 10a (investigación de Alpha Library) no corrió o no se guardó. Sin esto, el Paso 10b puede caer en la paleta cruda del sitio web (ej. fondo cream) en vez de la estética real del packaging.")
elif _ar_missing:
    fail("ALL", f"brand/alpha-research.md parece un stub (falta: {_ar_missing}) — no cumple los 5 elementos pedidos en el Paso 10a")

# ── Ley 16: brand/alpha-prompt.txt necesita dirección de MAQUETACIÓN, no solo de foto ──
# El alpha es la Capa 1 y es idéntico en las 30 celdas: es el único lugar que le
# recuerda al modelo, en TODA celda, que esto es un anuncio con titular y CTA.
# Si solo trae dirección fotográfica (ROLE/PALETTE/LIGHT/CAMERA...), el texto del
# anuncio queda mencionado una sola vez, al final de cada Concept (EN), y el modelo
# lo descarta — primero en las composiciones sin espacio negativo (texture macro,
# close-up), que es justo donde menos se lo busca.
# Caso real (Juliana Sanchez, 2026-07-30): alpha sin TYPOGRAPHY ni CTA STYLE → AD-04
# (texture macro) salió sin titular y sin CTA. Las corridas de Etérea y Bogo, con
# ambas secciones, renderizaron su texto sin problema teniendo la cláusula TEXT
# igual de al final del concepto (posición 0.61-0.85).
# Qué secciones son obligatorias y con qué grafías se aceptan se declara en UN solo lugar:
# scripts/alpha_sections.py. build-jobs.py importa la misma lista para compactar el alpha, así
# que la compuerta y lo que realmente se envía no pueden volver a divergir (v6.3).
_ap_path = os.path.join(STUDENT_DIR, "brand", "alpha-prompt.txt")
if not os.path.exists(_ap_path):
    # Mismo criterio que el gate de alpha-research.md: un artefacto de marca
    # obligatorio que no está es FAIL, no un check que se saltea en silencio.
    fail("ALL", "falta brand/alpha-prompt.txt — es la Capa 1 (el motor de consistencia de las 30 celdas). Generalo en el Paso 10b antes de renderizar.")
    _ap_text = ""
else:
    try:
        _ap_text = open(_ap_path, encoding="utf-8").read()
    except Exception:
        _ap_text = ""
if _ap_text:
    for _sec in alpha_sections.missing(_ap_text):
        _label = alpha_sections.canonical_label(_sec)
        fail("ALL", f"brand/alpha-prompt.txt no tiene sección {_label} — {_sec['hint']} Agregala en el Paso 10b. (Ley 16: la Capa 1 va idéntica en las 30 celdas; lo que le falte ahí le falta a las 30.)")

# ── Ley 18: compuerta de color — un hex descartado no puede entrar al alpha ────
# extract-brand-identity.js solo puede leer colores DECLARADOS (variables CSS, JSON del
# tema). No sabe si el color se VE. Por eso baja imágenes de la marca a
# brand/color-evidence/ y deja cada color con visualCheck PENDING, para que el Paso 6 las
# mire y ponga VISIBLE / NOT_VISIBLE.
# Caso real (Juliana, 2026-07-30): el sitio declaraba magenta #fb5184 y coral #e0002a con
# confianza HIGH, y al abrir el logo y las fotos de producto NINGUNO de los dos aparecía —
# los dos estaban en la lista NEVER del alpha de esa marca.
# El FAIL es sobre un hecho objetivo y verificable por código: un hex marcado NOT_VISIBLE
# que aparece en el alpha. El PENDING es solo WARN: exigirlo como FAIL se satisface
# escribiendo "VISIBLE" sin abrir nada, y le quemaría una de las 3 pasadas de
# auto-reparación a un alumno no técnico por algo que puede ser inofensivo.
_dc_path = os.path.join(STUDENT_DIR, "brand", "detected-colors.json")
if _ap_text and os.path.exists(_dc_path):
    try:
        _dc = json.load(open(_dc_path, encoding="utf-8"))
    except Exception:
        _dc = None
    if isinstance(_dc, dict):
        _ap_hexes = {h.lower() for h in re.findall(r'#[0-9a-fA-F]{6}', _ap_text)}
        _pending = 0
        for _c in _dc.get("colors") or []:
            _hex = (_c.get("hex") or "").lower()
            _vc = (_c.get("visualCheck") or "").upper()
            if _vc == "PENDING":
                _pending += 1
            if _vc == "NOT_VISIBLE" and _hex in _ap_hexes:
                fail("ALL", f"el alpha-prompt usa {_hex}, que la compuerta de color marcó NOT_VISIBLE (no aparece en ninguna imagen de la marca). Sacalo del alpha y usá un hex VISIBLE de brand/detected-colors.json. Ver Ley 18.")
        if _pending:
            warn("ALL", f"{_pending} color(es) de brand/detected-colors.json siguen en visualCheck PENDING — nadie miró brand/color-evidence/. Los hex del alpha pueden estar declarados en el CSS y no existir en la marca (Ley 18).")

# ── Ley 13: coherencia texto↔referencia (anti-invención de piezas) ────────────
# El vocabulario "sospechoso" NO es una lista de partes de producto por categoría
# (eso rompería brand-agnostic) — se DERIVA del propio ref-manifest.json de cada
# marca: qué palabras describen OTRAS fotos del mismo producto pero no la foto
# citada en esta celda. Para un kit de micrófono da {kit, completo}; para una
# marca de anillos daría {banda, giratoria}; el código no sabe de categorías.
_GENERIC_STOPWORDS = {
    "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "al", "en", "con",
    "por", "para", "sin", "sobre", "desde", "hasta", "que", "como", "muy", "mas", "pero",
    "porque", "the", "a", "an", "of", "in", "on", "with", "for", "and", "or", "to", "is",
    "are", "was", "were", "this", "that", "these", "those", "its", "foto", "fotos", "photo",
    "photos", "imagen", "image", "producto", "product", "marca", "brand", "real", "sitio",
    "website", "verificado", "verificada", "verified", "vista", "view", "frontal", "front",
    "visible", "visibles", "correcto", "correcta", "oficial", "mismo", "misma",
}
# Gramática genérica de multiplicidad/completitud (no partes de producto) — señal barata
# adicional, sumada al diff de arriba, no sustituta.
_MULTIPLICITY_RE = re.compile(
    r'\b(kit|bundle|set|pack|dual|pair|both|ambos|ambas|par|completo|completa|completos|'
    r'completas|juego|conjunto)\b')
_WORD_RE = re.compile(r'[a-z]{4,}')

def tokenize(text):
    return set(w for w in _WORD_RE.findall(strip_accents(text)) if w not in _GENERIC_STOPWORDS)

def manifest_diff_tokens(man, cited_bases):
    """Tokens presentes en OTRAS entradas del manifest pero ausentes en las citadas."""
    if not man:
        return set()
    cited_tokens, other_tokens = set(), set()
    for base, desc in man.items():
        if base.startswith("_") or not isinstance(desc, str):
            continue
        toks = tokenize(desc)
        if base in cited_bases:
            cited_tokens |= toks
        else:
            other_tokens |= toks
    return other_tokens - cited_tokens

# ── Per-cell checks ───────────────────────────────────────────────────────────
for j in jobs:
    num = j.get("num", "?")
    prompt = j.get("prompt", "") or ""
    refs = j.get("refs", []) or []
    has_product = bool(j.get("has_product"))

    # `composition` es texto libre en conceptos-30.md y nadie lo validaba: una composición
    # inventada o mal escrita pasaba, y con ella se apagaba en silencio el gate de silueta
    # (Ley 19) para esa celda. Ahora tiene que resolver a una de las 14 canónicas.
    if not compositions.resolve(j.get("composition", "")):
        fail(num, f"composición '{j.get('composition')}' no es ninguna de las 14 de la paleta — usá una etiqueta canónica: {compositions.labels_hint()}")
    awareness = strip_accents(j.get("awareness", ""))
    p_low = prompt.lower()

    # 1. Prompt non-empty + within limit
    if not prompt.strip():
        fail(num, "prompt vacío")
    elif len(prompt) > CHAR_LIMIT:
        fail(num, f"prompt {len(prompt)} chars > {CHAR_LIMIT} (acorta el Concept (EN))")

    # 2. Awareness gating
    product_refs = [r for r in refs if not is_logo_ref(r)]
    if awareness in NO_PRODUCT_LEVELS:
        if has_product:
            fail(num, f"nivel '{j.get('awareness')}' no debe tener producto (Has Product: no)")
        if product_refs:
            fail(num, f"nivel '{j.get('awareness')}' no debe traer fotos de producto (quita Reference)")
    elif awareness in PRODUCT_LEVELS and not IS_PHYSICAL:
        # Marca de servicio/info/SaaS: sin producto físico — imagery brand/lifestyle, sin gate de producto.
        if product_refs:
            warn(num, "marca de servicio con foto de producto adjunta — confirmá que sea un asset real (no inventar)")
    elif awareness in PRODUCT_LEVELS:
        if not has_product:
            fail(num, f"nivel '{j.get('awareness')}' requiere producto (Has Product: sí)")
        if not product_refs:
            fail(num, f"nivel '{j.get('awareness')}' requiere ≥1 foto de producto en Reference")
        else:
            comp = strip_accents(j.get("composition", ""))
            is_closeup_cell = any(k in comp for k in CLOSEUP_WORDS)
            closeup_ok = False
            cited_by_manifest = {}  # {dirname: {basenames}} — reusado por la Vuelta 4 (Ley 13)
            for r in product_refs:
                base = os.path.basename(r)
                rp = os.path.join(STUDENT_DIR, r)
                if not os.path.exists(rp):
                    fail(num, f"foto de producto no existe en disco: {r}")
                    continue
                cited_by_manifest.setdefault(os.path.dirname(rp), set()).add(base)
                # Vuelta 1: nombre neutro sin clasificar → el Paso 9 se saltó
                if NEUTRAL_REF.search(r.replace('\\', '/')):
                    fail(num, f"ref sin clasificar '{base}' — renómbrala por su contenido en el Paso 9 (nunca dejes product-NN)")
                    continue
                # Vuelta 2: debe estar en el acta (ref-manifest.json)
                man = load_manifest(r)
                if man is None:
                    fail(num, f"falta ref-manifest.json donde vive '{base}' — escribe el acta de qué es cada foto (Paso 9)")
                elif base not in man:
                    fail(num, f"'{base}' no está en ref-manifest.json — se usó una foto sin verificar (Paso 9)")
                elif any(w in strip_accents(manifest_desc(man, base)) for w in CLOSEUP_WORDS):
                    closeup_ok = True
            # Vuelta 3 (anti-mentira): celda de close-up/macro debe usar una foto que el acta describa como tal
            if is_closeup_cell and product_refs and not closeup_ok:
                warn(num, f"celda '{j.get('composition')}' (close-up/macro) usa una foto que el acta NO describe como close-up/textura — ¿le pasas un frente a una celda de detalle?")

            # Vuelta 4 (Ley 13): coherencia texto↔referencia — ¿el Concept (EN) describe algo
            # que solo aparece en OTRA foto del mismo producto según ref-manifest.json?
            # Reusa `cited_by_manifest` (ya resuelto arriba) — sin volver a tocar el filesystem.
            concept_raw = (raw_cells.get(num) or {}).get("concept_en", "") or ""
            concept_tokens = tokenize(concept_raw)
            for d, bases in cited_by_manifest.items():
                diff = manifest_diff_tokens(_manifest_cache.get(d), bases)
                hit = concept_tokens & diff
                if hit:
                    warn(num, f"Concept (EN) menciona {sorted(hit)} — esa(s) palabra(s) describe(n) OTRA foto del mismo producto en ref-manifest.json, no la citada en Reference ({sorted(bases)}) — ¿estás describiendo una pieza que esta foto no muestra? (Ley 13)")
            multiplicity_hit = set(_MULTIPLICITY_RE.findall(strip_accents(concept_raw)))
            if multiplicity_hit:
                cited_desc = " ".join(
                    manifest_desc(_manifest_cache.get(d), b)
                    for d, bases in cited_by_manifest.items() for b in bases
                )
                if not _MULTIPLICITY_RE.search(strip_accents(cited_desc)):
                    warn(num, f"Concept (EN) usa lenguaje de completitud/multiplicidad {sorted(multiplicity_hit)} pero ninguna foto citada en Reference lo confirma en ref-manifest.json — revisá si la Reference debería ser otra foto (Ley 13)")

            # Vuelta 5 (Ley 19): cobertura de silueta. El invariante se evalúa UNA vez acá,
            # y las celdas de recorte se saltean el chequeo entero.
            if compositions.is_whole_view(j.get("composition", "")):
                check_silhouette_coverage(num, j.get("composition", ""), cited_by_manifest)

            if "primary source of truth" not in p_low and "product reference" not in p_low:
                fail(num, "falta la instrucción 'PRODUCT REFERENCE / PRIMARY source of truth' (¿se construyó con kie_build_layered_prompt --has-product-images?)")
    else:
        warn(num, f"nivel desconocido '{j.get('awareness')}' (esperado Inconsciente/Problema/Solución/Producto/Decisión)")

    # 3. Logo wiring
    logo_refs = [r for r in refs if is_logo_ref(r)]
    if logo_refs:
        for r in logo_refs:
            if not os.path.exists(os.path.join(STUDENT_DIR, r)):
                fail(num, f"logo no existe en disco: {r}")
        if "logo" not in p_low and "wordmark" not in p_low:
            fail(num, "logo adjuntado pero el prompt no menciona logo/wordmark (¿--has-logo?)")
    else:
        warn(num, "sin logo adjuntado (se generará sin wordmark de referencia)")

    # 4. Positional ref order (only if prompt numbers refs explicitly)
    ref_nums = [int(m) for m in re.findall(r'\bref(?:erence)?\s*(\d)\b', p_low)]
    if ref_nums and max(ref_nums) > len(refs):
        fail(num, f"el prompt menciona 'ref {max(ref_nums)}' pero solo hay {len(refs)} refs adjuntas")

    # 6. Text coverage (per-cell signal; aggregate check below).
    # OJO: NO buscar 'text'/'headline'/etc. en `p_low` (el prompt completo de 5 capas) —
    # el boilerplate de texto-en-imagen ("TEXT on image...") aparece en TODAS las celdas,
    # así que ese regex siempre matcheaba y el gate de cobertura nunca podía fallar.
    # Mirar directo los campos autorizados es lo único que refleja intención real de texto.
    j["_has_text"] = bool((j.get("headline") or j.get("hook") or j.get("cta") or "").strip())

    # 6a. Cláusula TEXT duplicada (FAIL) — falla de API, no falla estética.
    # Un Concept (EN) con DOS cláusulas TEXT hace que la API devuelva
    # "Internal Error, Please try again later" en vez de una imagen. El síntoma
    # parece una caída de Kie y se pierden tiradas diagnosticando el modelo.
    # Detectado en vivo (Juliana, 2026-07-30): 5 envíos fallados seguidos; una celda
    # intacta renderizó bien en el medio, y al deduplicar volvió a funcionar.
    _concept_txt = (raw_cells.get(num) or {}).get("concept_en", "") or ""
    # Solo aperturas de cláusula ("TEXT:", "TEXT (Spanish):", "TEXT on image:",
    # "TEXT block, cream, lower left:"), no cualquier aparición de la palabra — una
    # mención legítima como "no other TEXT in frame" no debe quemar una pasada de
    # auto-reparación. El margen de 40 chars está medido sobre las 30 celdas reales de
    # Juliana: con 24 se perdía AD-10 ("TEXT block, cream, lower left" son 25); con 40
    # las 30 detectan su cláusula. 60 no aporta nada y se abre a prosa.
    _text_clauses = len(re.findall(TEXT_CLAUSE_RX, _concept_txt))
    if _text_clauses > 1:
        fail(num, f"el Concept (EN) tiene {_text_clauses} cláusulas 'TEXT' — dejá UNA sola. Duplicarla no da una imagen fea: la API responde 'Internal Error, Please try again later' y parece (sin serlo) una caída de Kie.")

    # 6a-bis. El Headline declarado no aparece en la cláusula TEXT (WARN).
    # `_has_text` (arriba) solo mira que el campo no esté vacío — nunca que el titular
    # llegue a la imagen. Sin este aviso, el Excel puede decir una cosa y la imagen
    # mostrar otra, y nadie se entera hasta abrir las 30 a mano.
    # Medido en la corrida de Juliana (2026-07-30): 5/30 celdas. Dos eran divergencias
    # reales (AD-29 Excel "COSIDAS UNA POR UNA" vs imagen "TWILL OLIVA..."; AD-18 cambiaba
    # la afirmación), y dos eran recortes editoriales legítimos: el campo acorta a propósito
    # la frase larga que va en la imagen.
    # Por eso es WARN y no FAIL: casi la mitad de los aciertos son correctos, y un FAIL le
    # quemaría a un alumno no técnico una de sus 3 pasadas de auto-reparación por nada.
    _headline = (j.get("headline") or "").strip()
    if _headline and _concept_txt:
        _m = TEXT_CLAUSE_RX.search(_concept_txt)
        if not _m:
            warn(num, f"tiene Headline ('{_headline}') pero el Concept (EN) no abre ninguna cláusula TEXT — revisá que el titular vaya a llegar a la imagen.")
        else:
            _clause = _concept_txt[_m.start():]
            # Frases que el concepto pide dibujar: entre comillas rectas o angulares.
            _quoted = [a or b for a, b in re.findall(r'"([^"]{3,90})"|«([^»]{3,90})»', _clause)]
            def _flat(s):
                return re.sub(r'[^a-z0-9]', '', strip_accents(s).lower())
            _hf = _flat(_headline)
            if _hf and not any(_hf in _flat(q) or _flat(q) in _hf for q in _quoted):
                _muestra = " · ".join(f'"{q}"' for q in _quoted[:3]) or "(ninguna frase entrecomillada)"
                warn(num, f"el Headline del Excel ('{_headline}') no coincide con el texto que la cláusula TEXT manda dibujar: {_muestra}. Si el recorte es a propósito está bien; si no, la fila del Excel no va a describir su imagen.")

    # 6b. Voseo rioplatense (WARN) — los hooks de Felipe a veces vienen en voseo (AR/UY).
    # Si la marca NO es de Argentina/Uruguay, hay que localizar (Colombia no usa voseo).
    visible_text = " ".join([j.get("headline", ""), j.get("hook", ""), j.get("cta", "")]).lower()
    # Solo formas ACENTUADAS = voseo inequívoco (evita falsos positivos con tuteo:
    # "aprovecha"/"compra"/"mira" son correctas; "aprovechá"/"comprá"/"mirá" son voseo).
    voseo = re.findall(
        r'\b(pedís|recibís|sumá|empezá|comprá|comprás|apoyá|tenés|querés|llevás|mirá|probá|sabés|podés|hacés|vení|salí|elegí|conocé|aprovechá|escribí|enterás|fijás)\b',
        visible_text)
    if voseo:
        warn(num, f"posible voseo rioplatense {sorted(set(voseo))} — si la marca NO es AR/UY, localiza (Colombia usa tú/usted, no 'vos')")

    # 6c. Integridad de marca (WARN): frases que invitan a inventar producto branded no referenciado.
    invent = re.findall(r'full\s+\S+\s+look|\ball in (?!plain|unbranded|neutral|solid|generic|black|white|dark|the same)\S+|everyone (?:in|wearing)', p_low)
    if invent:
        warn(num, f"posible invención de producto de marca ({invent}) — solo el producto referenciado lleva branding; ropa secundaria debe ser lisa/sin marca")

    # 6d. Secondary products (multi-product brands) — raw authored list from matrix-data
    raw_sec = (raw_cells.get(num) or {}).get("secondary") or []
    if raw_sec:
        if awareness not in PRODUCT_LEVELS or not has_product:
            fail(num, "Secondary solo en celdas con producto (niveles Solución/Producto/Decisión)")
        if len(raw_sec) > 2:
            fail(num, f"{len(raw_sec)} productos secundarios > máx 2 (hero + 2 secundarios = 3 productos máximo)")
        zones = [strip_accents((s.get('zone') or '')) for s in raw_sec]
        if len(set(z for z in zones if z)) != len([z for z in zones if z]):
            fail(num, f"zonas de secundarios repetidas {zones} — cada producto en una zona distinta del cuerpo")
        for s in raw_sec:
            p = (s or {}).get("path")
            if not p or not os.path.exists(os.path.join(STUDENT_DIR, p)):
                fail(num, f"producto secundario no existe en disco: {p} — solo productos REALES referenciados (anti-publicidad falsa)")
            elif NEUTRAL_REF.search(p.replace('\\', '/')):
                fail(num, f"secundario sin clasificar '{os.path.basename(p)}' — renómbralo por su contenido en el Paso 9")
            z = strip_accents((s.get('zone') or ''))
            if z and z not in VALID_ZONES:
                warn(num, f"zona de secundario '{s.get('zone')}' no estándar (usa head/torso/legs/hands/neck/feet)")

# ── Aggregate checks ──────────────────────────────────────────────────────────

# 7. Exactly 30 cells
if len(jobs) != 30:
    fail("ALL", f"se esperaban 30 celdas, hay {len(jobs)} (revisa encabezados '### AD NN' en conceptos-30.md)")

# 7b. Matriz completa: cada combo deseo × perfil × nivel exactamente UNA vez.
# Sin esto, dos celdas duplicadas + un combo faltante pasan la compuerta, se
# renderizan las 30 ($) y el Excel queda con un hueco silencioso.
# Valida sobre matrix-data.json (source of truth, ya cargado en raw_cells);
# jobs.json es derivado y solo sirve de fallback.
_combo_src = list(raw_cells.values()) if raw_cells else jobs
combo_ads = {}
for c in _combo_src:
    combo = (strip_accents(c.get("desire", "")), strip_accents(c.get("profile", "")), strip_accents(c.get("awareness", "")))
    if not all(combo):
        fail(c.get("num", "?"), "campo Deseo/Perfil/Nivel vacío — completa la celda en conceptos-30.md")
        continue
    combo_ads.setdefault(combo, []).append(c.get("num"))

for combo, nums in combo_ads.items():
    if len(nums) > 1:
        fail("ALL", f"combo duplicado deseo='{combo[0]}' perfil='{combo[1]}' nivel='{combo[2]}' en ADs {nums} — cada combo va UNA vez")

_desires_seen  = sorted({c[0] for c in combo_ads})
_profiles_seen = sorted({c[1] for c in combo_ads})
dims_ok = len(_desires_seen) == 3 and len(_profiles_seen) == 2
if len(_desires_seen) != 3:
    fail("ALL", f"se esperaban 3 deseos distintos, hay {len(_desires_seen)}: {_desires_seen}")
if len(_profiles_seen) != 2:
    fail("ALL", f"se esperaban 2 perfiles distintos, hay {len(_profiles_seen)}: {_profiles_seen}")
if dims_ok:
    missing = [f"{d} × {p} × {lv}" for d in _desires_seen for p in _profiles_seen for lv in LEVELS
               if (d, p, lv) not in combo_ads]
    if missing:
        fail("ALL", f"combos faltantes en la matriz 3×2×5: {missing}")

# 6. 90% text coverage (≥28/30)
text_ads = sum(1 for j in jobs if j.get("_has_text"))
if text_ads < 28:
    fail("ALL", f"cobertura de texto {text_ads}/30 (<28). Agrega headline/texto-en-imagen a más celdas.")

# 5. Composition diversity
comps = [j.get("composition", "").strip() for j in jobs if j.get("composition", "").strip()]
hist = Counter(strip_accents(c) for c in comps)
distinct = len(hist)
if distinct < 8:
    fail("ALL", f"diversidad de composición: solo {distinct} distintas (mínimo 8 de las 14). Histograma: {dict(Counter(comps))}")
over = {c: n for c, n in Counter(comps).items() if n > 5}
if over:
    fail("ALL", f"composiciones usadas >5 veces: {over} (máximo 5 cada una)")
# Texture macro + UGC ensanchan la diversidad — recomendá ≥2 de cada (WARN)
n_macro = sum(1 for c in comps if "texture macro" in strip_accents(c))
n_ugc = sum(1 for c in comps if "ugc" in strip_accents(c))
if n_macro < 2:
    warn("ALL", f"solo {n_macro} Texture macro (recomendado ≥2 — close-ups de textura del producto ensanchan la diversidad)")
if n_ugc < 2:
    warn("ALL", f"solo {n_ugc} UGC/phone-selfie (recomendado ≥2 — alguien probando el producto con el celular)")
# ≥6 distintas por bloque de deseo
by_desire = {}
for j in jobs:
    by_desire.setdefault(strip_accents(j.get("desire", "")), []).append(strip_accents(j.get("composition", "")))
for d, cs in by_desire.items():
    if len(set(cs)) < 6:
        warn("ALL", f"deseo '{d}': solo {len(set(cs))} composiciones distintas (recomendado ≥6)")

# 5b. Hook Tactic diversity (WARN) — eje separado de composición, ver reference "Táctica de Hook".
# Campo opcional (retrocompatible): conceptos-30.md viejos sin `Hook Tactic` no generan ruido.
tactics = [strip_accents(j.get("hook_tactic", "")) for j in jobs if j.get("hook_tactic", "").strip()]
if tactics:
    n_tactics = len(set(tactics))
    if n_tactics < 5:
        warn("ALL", f"solo {n_tactics} Hook Tactic distintas (recomendado ≥5 de las 8 — ver reference 'Táctica de Hook')")
    over_tactic = {t: n for t, n in Counter(tactics).items() if n > 12}
    if over_tactic:
        warn("ALL", f"Hook Tactic repetida >12 veces: {over_tactic} (rota el ángulo retórico)")
    # Se agrupa por deseo + PERFIL (el funnel de 5: Inconsciente→Decisión), no por deseo
    # a secas. Un deseo tiene 10 celdas (2 perfiles × 5 niveles) y solo existen 8 tácticas,
    # así que agrupando por deseo el WARN era matemáticamente imposible de satisfacer —
    # saltaba siempre, en toda marca. La regla del reference dice "las 5 celdas de un mismo
    # deseo (Inconsciente→Decisión)", que es el funnel. Corregido en la corrida de
    # Juliana Sanchez (2026-07-30).
    by_funnel_tactic = {}
    for j in jobs:
        t = strip_accents(j.get("hook_tactic", ""))
        if t:
            key = (strip_accents(j.get("desire", "")), strip_accents(j.get("profile", "")))
            by_funnel_tactic.setdefault(key, []).append(t)
    for (d, p), ts in by_funnel_tactic.items():
        dupes = sorted({t for t, n in Counter(ts).items() if n > 1})
        if dupes:
            warn("ALL", f"deseo '{d}' / perfil '{p}': Hook Tactic repetida dentro del mismo funnel: {dupes} (cada nivel debería tener un ángulo distinto)")

# 8. Casting variety (heuristic, WARN): duplicate demographic phrasing within a desire block
# Se escanea el `concept_en` de la celda, NO `j["prompt"]`: el prompt ensamblado lleva
# antepuesto el alpha-prompt, que por diseño es IDÉNTICO en las 30. Si ese alpha menciona
# una persona (ej. "the model is a narrator, not a mannequin", "a woman who already likes
# herself"), la frase aparece en las 30 y el chequeo emitía ~40 warnings falsos que tapaban
# las colisiones de casting reales. Detectado en la corrida de Juliana Sanchez (2026-07-30).
demo_re = re.compile(r'\b(?:a|an|una?|el|la)\s+([a-z\s]{0,12}?(?:man|woman|person|hombre|mujer|persona)[a-z\s]{0,18})', re.IGNORECASE)
demo_by_desire = {}
for j in jobs:
    d = strip_accents(j.get("desire", ""))
    cell_text = (raw_cells.get(j.get("num")) or {}).get("concept_en", "") or ""
    phrases = [strip_accents(m) for m in demo_re.findall(cell_text)]
    for ph in phrases:
        demo_by_desire.setdefault(d, []).append((j.get("num"), ph))
for d, items in demo_by_desire.items():
    seen = {}
    for num, ph in items:
        if ph in seen and seen[ph] != num:
            warn(num, f"casting repetido en deseo '{d}': '{ph}' ya usado en AD {seen[ph]} (varía la persona)")
        seen.setdefault(ph, num)

# ── Report ────────────────────────────────────────────────────────────────────
print(f"\n  Validate Payload — {os.path.basename(STUDENT_DIR)}")
print(f"  {'─'*60}")
print(f"  Jobs: {len(jobs)} | con texto: {text_ads}/30 | composiciones distintas: {distinct}")

if warnings:
    print(f"\n  WARNINGS ({len(warnings)}):")
    for num, r in warnings:
        print(f"    [WARN] AD {num}: {r}")

if failures:
    print(f"\n  FAILURES ({len(failures)}) — corrige en conceptos-30.md, re-genera y re-valida:")
    for num, r in failures:
        print(f"    [FAIL] AD {num}: {r}")
    print(f"\n  ✗ NO renderizar todavía. {len(failures)} fallo(s).")
    sys.exit(1)

print(f"\n  ✓ Payload íntegro. Listo para render (sin gasto previo a esta compuerta).")
print(f"    Next: bash static-ads/run-all-ads.sh  (desde la carpeta del estudiante)")
sys.exit(0)
