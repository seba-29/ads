#!/usr/bin/env python3
"""
build-jobs.py — Matriz Felipe (3 deseos × 2 perfiles × 5 niveles = 30 imágenes estáticas)

Lee la matriz creativa ya autorizada por el LLM (matrix-data.json, generada por
parse-concepts.js a partir de conceptos-30.md) y construye jobs.json: un job i2i por
celda, con su prompt de 5 capas y sus referencias.

CONSISTENCIA: el prompt de cada job se arma con `kie_build_layered_prompt` (Bash) —
NO se re-implementan las 5 capas en Python. Esa función Bash es el único motor de
consistencia (alpha-prompt + logo + product-dna + sufijo de composición).

Uso:
    cd pipeline-v1/
    python static-ads/build-jobs.py students/2026-W21-beckett-simonon

Escribe (en la carpeta del estudiante):
    jobs.json        — 30 jobs {name, type:i2i, refs:[rutas], prompt, ...metadata}
    photo-refs.json  — rutas absolutas de todas las refs únicas (para el render)
"""

import json, os, sys, subprocess, re

# Antes de cualquier import local: sin esto, importar alpha_sections deja un
# scripts/__pycache__/ dentro de la carpeta de la skill en CADA corrida — basura que
# después viaja en el paquete que se regala.
sys.dont_write_bytecode = True
import alpha_sections   # declaración única de las secciones obligatorias del alpha (v6.3)

# ── Resolución de rutas ──────────────────────────────────────────────────────

if len(sys.argv) < 2:
    print("Usage: python static-ads/build-jobs.py <student_folder>")
    print("Example: python static-ads/build-jobs.py students/2026-W21-beckett-simonon")
    sys.exit(1)

# Portable: STUDENT_DIR is taken as given (absolute, or relative to CWD); the helper
# lib lives in the bundle at ../lib/ relative to this script — no pipeline tree assumed.
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
STUDENT_DIR  = os.path.abspath(sys.argv[1])
HELPERS      = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "lib", "kie-api-helpers.sh"))
# ── Tope de prompt, por modelo ───────────────────────────────────────────────
# Declarado en scripts/model-limits.json (única fuente, la lee también run-all-ads.sh).
# CONSECUENCIA DE DISEÑO, no solo un número: con 5.000 el Alpha ya NO puede rondar los
# 4.000 chars. Respetá los tamaños de la doc (alpha 1.800-2.500, product-dna 100-150
# palabras, Concept (EN) ~650). Si salta el aviso de compactado, acortá el ALPHA — no subas
# el tope: compactar descarta ROLE/VISION/LIGHT/CAMERA/MATERIALS. Ver Ley 20.
_argv = sys.argv[1:]
TARGET_MODEL = _argv[_argv.index("--model") + 1] if "--model" in _argv[:-1] else alpha_sections.DEFAULT_MODEL
if TARGET_MODEL not in alpha_sections.MODEL_CHAR_LIMITS:
    print(f"ERROR: --model '{TARGET_MODEL}' desconocido. Usá: {' | '.join(alpha_sections.MODEL_CHAR_LIMITS)}")
    sys.exit(1)
CHAR_LIMIT    = alpha_sections.MODEL_CHAR_LIMITS[TARGET_MODEL]
ALPHA_RESERVE = 2500   # holgura reservada para product-dna + concepto + scaffolding
print(f"  Modelo destino: {TARGET_MODEL} → tope de prompt {CHAR_LIMIT} chars")

if not os.path.isdir(STUDENT_DIR):
    print(f"ERROR: Student folder not found: {STUDENT_DIR}")
    sys.exit(1)
if not os.path.exists(HELPERS):
    print(f"ERROR: kie-api-helpers.sh not found at {HELPERS}")
    sys.exit(1)

print(f"Building jobs for: {STUDENT_DIR}")

# ── Cargar la matriz (single source of truth) ────────────────────────────────

matrix_path = os.path.join(STUDENT_DIR, "matrix-data.json")
if not os.path.exists(matrix_path):
    print(f"ERROR: matrix-data.json not found at {matrix_path}")
    print("       Run parse-concepts.js on conceptos-30.md first.")
    sys.exit(1)

matrix = json.load(open(matrix_path, encoding="utf-8"))
cells = matrix.get("cells", [])
if len(cells) != 30:
    print(f"WARNING: expected 30 cells, found {len(cells)} (continuing — validator will flag).")

# ── Rutas de archivos de marca ───────────────────────────────────────────────

ALPHA_FILE   = os.path.join(STUDENT_DIR, "brand", "alpha-prompt.txt")
PRODUCT_DNA  = os.path.join(STUDENT_DIR, "brand", "product-dna.txt")

if not os.path.exists(ALPHA_FILE):
    print(f"ERROR: brand/alpha-prompt.txt not found — it is the consistency engine. Aborting.")
    sys.exit(1)

# ── Fuente del alpha + product-dna (COMPLETOS, con fallback de seguridad) ─────
# Con el tope correcto (gpt-image-2 = 5.000) el Alpha en el tamaño que la doc del skill
# siempre pidió (1.800-2.500) + product-dna (100-150 palabras) + Concept (EN) (~650) +
# scaffolding entran SIN comprimir → máxima fidelidad de marca. Comprimir por gusto no
# mejora la calidad, solo pierde detalle. compact_alpha() queda como RED DE SEGURIDAD:
# se activa solo si el Alpha crudo se pasa del presupuesto. NO re-implementa las 5 capas
# (eso sigue en Bash). Si salta el aviso de compactado, el arreglo correcto es ACORTAR EL
# ALPHA a su rango documentado, no subir el tope. Ver Ley 20.

def _section(raw, keyword, limit):
    m = re.search(rf'{keyword}[:\s]*(.+?)(?:\n\n|\n[A-Z][A-Z &/-]+:|\Z)', raw, re.IGNORECASE | re.DOTALL)
    return m.group(1).strip()[:limit] if m else ""

def compact_alpha(raw):
    """Esencia del alpha: línea de fotografía + TODAS las secciones obligatorias. ~800 chars.

    Fallback de seguridad para cuando el alpha crudo no entra en el presupuesto de chars.

    Recorre `alpha_sections.REQUIRED_SECTIONS` en vez de una lista escrita a mano: si esa
    lista y la de la compuerta divergen, validate-payload.py da verde mientras el prompt que
    se envía perdió una sección, y las 30 imágenes salen mal por USD 1,50. Pasó dos veces el
    2026-07-30 (se caían CTA STYLE y la paleta). Ver el encabezado de alpha_sections.py.
    """
    parts = [raw.split('\n')[0].strip()[:240]]
    for sec in alpha_sections.REQUIRED_SECTIONS:
        # Se prueban las grafías en el orden declarado (de más específica a menos), igual
        # que hace la compuerta: así "PALETTE —" y "COLOR PALETTE:" valen lo mismo.
        body = ""
        for name in sec["names"]:
            body = _section(raw, name, sec["compact_limit"])
            if body:
                break
        if body:
            parts.append(f"{alpha_sections.canonical_label(sec)}: {body}")
    return " | ".join(parts)

def write_tmp(name, content):
    p = os.path.join(STUDENT_DIR, "brand", name)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    return p

_alpha_raw = open(ALPHA_FILE, encoding="utf-8").read()
_ALPHA_BUDGET = CHAR_LIMIT - ALPHA_RESERVE
if len(_alpha_raw) > _ALPHA_BUDGET:
    print(f"  NOTE: alpha crudo {len(_alpha_raw)} chars > presupuesto {_ALPHA_BUDGET} — usando versión compactada (fallback de seguridad).")
    ALPHA_FILE = write_tmp(".alpha-compact.txt", compact_alpha(_alpha_raw))
    if os.path.exists(PRODUCT_DNA):
        PRODUCT_DNA = write_tmp(".product-dna-compact.txt", open(PRODUCT_DNA, encoding="utf-8").read().strip()[:380])
else:
    print(f"  Alpha completo (sin comprimir): {len(_alpha_raw)} chars.")

# Logo (png > webp > jpg)
_brand_dir = os.path.join(STUDENT_DIR, "brand")
LOGO_PATH = next(
    (os.path.join(_brand_dir, f) for f in ["logo.png", "logo.webp", "logo.jpg", "logo.jpeg"]
     if os.path.exists(os.path.join(_brand_dir, f))),
    None
)
def rel(p):
    """Relative path to STUDENT_DIR with forward slashes (portable for bash/curl + Python)."""
    return os.path.relpath(p, STUDENT_DIR).replace(os.sep, "/")

LOGO_REL = rel(LOGO_PATH) if LOGO_PATH else None
if not LOGO_PATH:
    print("WARNING: no logo found in brand/ — logo layer will be skipped on all cells.")

# ── Detección de fotos de producto (fallback si una celda no trae Reference) ──

_photo_candidates = [
    os.path.join(STUDENT_DIR, "input", "product-photos"),
    os.path.join(STUDENT_DIR, "anchors"),
    os.path.join(STUDENT_DIR, "refs"),
]
photos_dir = next((d for d in _photo_candidates if os.path.isdir(d) and
    any(f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) for f in os.listdir(d))), None)

photos = []
if photos_dir:
    _exclude = ('logo', 'character', 'variant', 'master', 'lifestyle', 'model')
    photos = sorted([
        f for f in os.listdir(photos_dir)
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
        and not any(ex in f.lower() for ex in _exclude)
    ])

def _default_product_refs():
    """Up to 2 best product photos (front/lateral + a distinct second), relative to STUDENT_DIR."""
    if not photos_dir or not photos:
        return []
    primary = next((p for p in photos if any(k in p.lower() for k in ['front', 'lateral', 'shot', 'hero'])), photos[0])
    second  = next((p for p in photos if p != primary and any(k in p.lower() for k in ['close', 'detail', 'macro', 'back', 'side'])),
                   next((p for p in photos if p != primary), None))
    chosen = [primary] + ([second] if second else [])
    return [rel(os.path.join(photos_dir, p)) for p in chosen]

DEFAULT_PRODUCT_REFS = _default_product_refs()
print(f"  Default product refs: {DEFAULT_PRODUCT_REFS or '(none)'}")
print(f"  Logo: {LOGO_REL or '(none)'}")

# ── Construir el prompt de 5 capas vía kie_build_layered_prompt (Bash) ────────

def build_layered_prompt(ad_concept, has_product):
    """Shell out to the Bash consistency engine. ad_concept passed via env (safe with quotes/newlines)."""
    flags = [f'--alpha-prompt-file "{ALPHA_FILE}"', '--ad-concept "$AD_CONCEPT"', '--mode image']
    if LOGO_PATH:
        flags.append('--has-logo')
    if has_product:
        flags.append('--has-product-images')
        if os.path.exists(PRODUCT_DNA):
            flags.append(f'--product-dna-file "{PRODUCT_DNA}"')
    cmd = f'source "{HELPERS}"; kie_build_layered_prompt ' + ' '.join(flags)
    env = {**os.environ, "AD_CONCEPT": ad_concept}
    res = subprocess.run(["bash", "-c", cmd], env=env, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"  WARNING: kie_build_layered_prompt failed: {res.stderr.strip()[:200]}")
        return ad_concept  # fall back to raw concept (validator will catch missing layers)
    return res.stdout.strip()

# ── Resolver refs por celda ───────────────────────────────────────────────────

def _valid_secondary(cell):
    """Secondary products that exist on disk (max 2). Multi-product brands only."""
    out = []
    for s in (cell.get("secondary") or []):
        p = (s or {}).get("path")
        if p and os.path.exists(os.path.join(STUDENT_DIR, p)):
            out.append({"path": p, "zone": (s.get("zone") or "the body").strip()})
    return out[:2]

def resolve_refs(cell, sec):
    """Ordered relative ref paths: hero product(s) first, secondary next, logo last. Cap 3 products + logo."""
    refs = []
    if cell.get("has_product"):
        ref_list = cell.get("reference") or []
        valid = [r for r in ref_list if os.path.exists(os.path.join(STUDENT_DIR, r))]
        # Si el autor SÍ puso una Reference pero ninguna ruta existe, es un typo/producto
        # movido — NO seguir en silencio con el default genérico (rendería el producto
        # equivocado sin que nadie se entere). Avisar fuerte y dejar que se corrija.
        if ref_list and not valid:
            print(f"  [WARN] cell {cell.get('num')}: Reference '{'; '.join(ref_list)}' no existe en disco — "
                  f"usando foto por defecto en su lugar. Revisá la ruta en conceptos-30.md.")
        hero = valid if valid else DEFAULT_PRODUCT_REFS
        # With secondary products, hero uses ONLY its primary photo so total refs stay <=4.
        refs.extend(hero[:1] if sec else hero[:2])
        refs.extend(s["path"] for s in sec)
    if LOGO_REL:
        refs.append(LOGO_REL)
    return refs

def build_reference_map(sec):
    """Deterministic REFERENCE MAP that matches input_urls order. Empty unless secondary present."""
    if not sec:
        return ""
    lines = ["R1=hero."]
    for i, s in enumerate(sec, start=2):
        lines.append(f"R{i}=real product on {s['zone']}.")
    return (" REF MAP (reproduce each EXACTLY; do NOT merge prints/colors/logos; hero print ONLY on hero; each on a DIFFERENT zone): "
            + " ".join(lines)
            + " Last=logo (graphic only, not on a garment).")

# ── Construir los jobs ────────────────────────────────────────────────────────

JOBS = []
for cell in sorted(cells, key=lambda c: c.get("num", 0)):
    num = cell.get("num", 0)
    name = f"ad-{num:02d}"
    has_product = bool(cell.get("has_product"))
    concept = (cell.get("concept_en") or "").strip()
    if not concept:
        print(f"  WARNING: cell {num} has empty concept_en — skipping prompt build.")
    sec = _valid_secondary(cell)            # compute once; used for refs + reference map
    concept += build_reference_map(sec)     # appends only when secondary products present
    prompt = build_layered_prompt(concept, has_product)
    JOBS.append({
        "name": name,
        "type": "i2i",
        "refs": resolve_refs(cell, sec),
        "prompt": prompt,
        # Largo del concepto (con su REFERENCE MAP ya sumado). Sirve para calcular el
        # overhead constante y, con él, el presupuesto real por celda — el número que
        # antes solo se descubría a fuerza de reintentos.
        "conceptChars": len(concept),
        # El tope viaja DENTRO del job para que el validador no tenga su propia copia (Ley 20).
        "targetModel": TARGET_MODEL,
        "charLimit": CHAR_LIMIT,
        # ── metadata for the validator + Excel (not sent to the API) ──
        "num": num,
        "desire": cell.get("desire", ""),
        "profile": cell.get("profile", ""),
        "awareness": cell.get("awareness", ""),
        "composition": cell.get("composition", ""),
        "hook_tactic": cell.get("hook_tactic", ""),
        "has_product": has_product,
        "headline": cell.get("headline", ""),
        "hook": cell.get("hook", ""),
        "cta": cell.get("cta", ""),
    })

# ── Escribir jobs.json + photo-refs.json ──────────────────────────────────────

os.makedirs(os.path.join(STUDENT_DIR, "static-ads"), exist_ok=True)

jobs_path = os.path.join(STUDENT_DIR, "jobs.json")
with open(jobs_path, "w", encoding="utf-8") as f:
    json.dump(JOBS, f, ensure_ascii=False, indent=2)

# Unique ref paths across all jobs → absolute paths for the uploader
unique_refs = []
seen = set()
for j in JOBS:
    for r in j["refs"]:
        if r not in seen:
            seen.add(r)
            unique_refs.append(r)

photo_refs = {r: os.path.join(STUDENT_DIR, r).replace(os.sep, "/") for r in unique_refs}
refs_path = os.path.join(STUDENT_DIR, "photo-refs.json")
with open(refs_path, "w", encoding="utf-8") as f:
    json.dump(photo_refs, f, ensure_ascii=False, indent=2)

# ── Reporte ───────────────────────────────────────────────────────────────────

print(f"\nWritten {len(JOBS)} jobs to {jobs_path}")
print(f"Unique refs to upload: {len(unique_refs)}")

print(f"\nChar counts:")
over = 0
for j in JOBS:
    chars = len(j["prompt"])
    status = "OK" if chars <= CHAR_LIMIT else "OVER"
    if chars > CHAR_LIMIT:
        over += 1
    prod = "P" if j["has_product"] else "-"
    print(f"  [{status:4}] {j['name']:7} {chars:5} chars  [{prod}] {j['awareness']:12} {j['composition']}")

# ── Presupuesto por celda (lo que hay que saber ANTES de escribir las 30) ─────
# El overhead (alpha + product-dna + scaffolding + REFERENCE MAP) es constante en las
# celdas del mismo tipo. Imprimirlo convierte "acorta el Concept (EN)" en un número
# concreto. Sin esto, el presupuesto real solo se descubre a fuerza de reintentos.
def _budget_line(label, jobs):
    if not jobs:
        return
    # El overhead varía un poco entre celdas (cantidad de refs en el REFERENCE MAP);
    # se reporta el PEOR caso, que es el que tiene que entrar.
    overhead = max(len(j["prompt"]) - j.get("conceptChars", 0) for j in jobs)
    print(f"  {label:22} overhead {overhead:5} chars  →  presupuesto Concept (EN): {max(CHAR_LIMIT - overhead, 0):4} chars")

print(f"\nPresupuesto por celda (tope {CHAR_LIMIT} de {TARGET_MODEL}, alpha de {len(_alpha_raw)} chars):")
_budget_line("celdas SIN producto", [j for j in JOBS if not j["has_product"]])
_budget_line("celdas CON producto", [j for j in JOBS if j["has_product"]])
print("  ↑ Si te pasás: acortá primero el ALPHA si está fuera de 1800-2500 (una edición arregla las 30),")
print("    y solo después los Concept (EN) celda por celda.")

if over == 0:
    print(f"\nAll {len(JOBS)} prompts within {CHAR_LIMIT} chars.")
    print(f"Next: python static-ads/validate-payload.py {sys.argv[1]}")
else:
    print(f"\n{over} prompt(s) over {CHAR_LIMIT} chars — trim the concept_en in conceptos-30.md.")
