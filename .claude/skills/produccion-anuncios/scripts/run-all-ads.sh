#!/usr/bin/env bash
# Static-ads runner — matriz Felipe (30 imágenes estáticas)
# Sube cada ref única UNA vez (fresca, sin URLs cacheadas en jobs.json → evita expiry de 3 días),
# luego arma las refs por celda en el orden de sus refs y renderiza (default GPT Image 2 i2i;
# --model nano-banana-pro|nano-banana-2 como alternativa manual, ver flags abajo).
#
# Uso: desde la carpeta de la marca (CWD):  bash <ruta-al-bundle>/scripts/run-all-ads.sh [--model <slug>]
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # bundle/scripts/
LIB_DIR="$(cd "$SCRIPT_DIR/../lib" && pwd)"                   # bundle/lib/
STUDENT="$(pwd)"                                              # carpeta de la marca (CWD)

source "$LIB_DIR/kie-api-helpers.sh"

# Nano Banana 2 (model slug "nano-banana-2", verificado en docs.kie.ai/market/google/nanobanana2,
# 2026-07-21). Mismo shape que kie_body_nano_banana (Pro) — solo cambia el nombre del modelo.
# Definida ACÁ y no en kie-api-helpers.sh — regla del skill: no modificar ese archivo (Out of scope).
kie_body_nano_banana_2() {
  local prompt="$1" aspect="${2:-9:16}" resolution="${3:-2K}"
  shift 3
  local urls_json="[]"
  if [ "$#" -gt 0 ]; then
    urls_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  fi
  jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" --arg resolution "$resolution" \
    --argjson urls "$urls_json" \
    '{
      model: "nano-banana-2",
      input: { prompt: $prompt, image_input: $urls, aspect_ratio: $aspect, resolution: $resolution, output_format: "png" }
    }'
}

OUT="$STUDENT/static-ads"
mkdir -p "$OUT"

JOBS="$STUDENT/jobs.json"
REFS_JSON="$STUDENT/photo-refs.json"
for f in "$JOBS" "$REFS_JSON"; do
  [ -f "$f" ] || { echo "ERROR: $(basename "$f") no encontrado. Corre build-jobs.py primero." >&2; exit 1; }
done

# ── Flags ─────────────────────────────────────────────────────────────────────
#   --only ad-05,ad-12,...   renderizar SOLO esos ad-NN (lista separada por comas)
#   --force                  re-renderizar aunque el PNG ya exista y pase QC
#   --model <slug>           gpt-image-2 (default) | nano-banana-pro | nano-banana-2
#                            elección MANUAL — usar cuando GPT Image 2 está caído,
#                            rechaza una celda por moderación, o querés comparar fidelidad.
#   MIN_BYTES=<n> (env)      umbral de tamaño para PNG válido (default 60000)
#   --delay <segundos>       pausa entre cada envío (kie_submit), default 0 (sin cambio).
#                            Probar si sospechás rate-limiting/"Internal Error" masivo
#                            en corridas grandes (envíos espalda con espalda sin pausa).
ONLY=""; FORCE=0; MODEL="gpt-image-2"; DELAY=0
while [ "$#" -gt 0 ]; do
  case "$1" in
    --only)  ONLY=",$(echo "${2:-}" | tr -d '[:space:]'),"; shift 2 ;;
    --force) FORCE=1; shift ;;
    --model) MODEL="${2:-}"; shift 2 ;;
    --delay) DELAY="${2:-0}"; shift 2 ;;
    *) echo "WARN: flag desconocida '$1' (ignorada)" >&2; shift ;;
  esac
done
# Topes por modelo: se LEEN de scripts/model-limits.json, la misma fuente que usa
# alpha_sections.py. Antes estaban escritos a mano acá — y estaban INVERTIDOS (8000 para
# gpt-image-2, 5000 para nano-banana). Ese es el bug de la Ley 20: copias divergentes
# mantenidas por comentario. `// empty` también valida el --model desconocido de una,
# así que el `case` con la lista de modelos ya no hace falta.
LIMITS_JSON="$SCRIPT_DIR/model-limits.json"
MODEL_MAX_CHARS=$(jq -r --arg m "$MODEL" '.models[$m].chars    // empty' "$LIMITS_JSON")
MODEL_MAX_REFS=$( jq -r --arg m "$MODEL" '.models[$m].max_refs // empty' "$LIMITS_JSON")
if [ -z "$MODEL_MAX_CHARS" ] || [ -z "$MODEL_MAX_REFS" ]; then
  echo "ERROR: --model '$MODEL' desconocido. Modelos válidos: $(jq -r '.models | keys | join(" | ")' "$LIMITS_JSON")" >&2
  exit 1
fi
MIN_BYTES=${MIN_BYTES:-60000}

# ── QC de resultado: ¿este PNG parece un render real? ─────────────────────────
# Atrapa fallas silenciosas de la API (PNG negro, vacío o truncado). Chequea
# tamaño y, si hay ffmpeg, la luminancia media (YAVG<20 = negro/casi-negro; el negro "video" en rango limitado es 16).
png_ok() {
  local f="$1" sz yavg
  [ -f "$f" ] || return 1
  sz=$(wc -c < "$f" 2>/dev/null || echo 0)
  [ "$sz" -ge "$MIN_BYTES" ] || return 1
  if command -v ffmpeg >/dev/null 2>&1; then
    yavg=$(ffmpeg -v error -i "$f" -vf "signalstats,metadata=print:file=-" -frames:v 1 -f null - 2>/dev/null \
           | grep -o 'YAVG=[0-9.]*' | head -1 | cut -d= -f2)
    [ -n "$yavg" ] && awk "BEGIN{exit !($yavg < 20)}" && return 1
  fi
  return 0
}

# ── Seleccionar jobs a correr (respeta --only + salta PNGs ya válidos) ─────────
TOTAL=$(jq 'length' "$JOBS")
RUN_IDX=(); SKIP_VALID=0
for i in $(seq 0 $((TOTAL - 1))); do
  NAME=$(jq -r ".[$i].name" "$JOBS")
  if [ -n "$ONLY" ]; then case "$ONLY" in *",$NAME,"*) : ;; *) continue ;; esac; fi
  if [ "$FORCE" -ne 1 ] && png_ok "$OUT/${NAME}.png"; then SKIP_VALID=$((SKIP_VALID+1)); continue; fi
  RUN_IDX+=("$i")
done

echo "=== Plan: ${#RUN_IDX[@]} a renderizar · ${SKIP_VALID} ya válidas (saltadas) · ${TOTAL} total ==="
if [ "${#RUN_IDX[@]}" -eq 0 ]; then
  echo "Nada que renderizar (todo válido o filtrado por --only). Usá --force para re-generar."
  exit 0
fi

# ── Subir SOLO las refs de los jobs a correr (una vez c/u) ────────────────────
echo "=== Subiendo refs únicas ==="
declare -A URL_CACHE
UPLOAD_FAIL=0
while IFS= read -r ref; do
  ref="${ref%$'\r'}"
  [ -n "$ref" ] || continue
  ABS=$(jq -r --arg k "$ref" '.[$k] // empty' "$REFS_JSON")
  if [ -z "$ABS" ] || [ ! -f "$ABS" ]; then
    echo "  ✗ ref sin archivo: $ref ($ABS)"
    UPLOAD_FAIL=1
    continue
  fi
  URL=$(kie_upload "$ABS")
  if echo "$URL" | grep -q "^https://"; then
    URL_CACHE["$ref"]="$URL"
    echo "  ✓ $ref"
  else
    echo "  ✗ upload falló: $ref → $URL"
    UPLOAD_FAIL=1
  fi
done < <(for i in "${RUN_IDX[@]}"; do jq -r ".[$i].refs[]?" "$JOBS"; done | sort -u)

if [ "$UPLOAD_FAIL" -eq 1 ]; then
  echo "✗ Falló la subida de una o más refs — abortando antes de gastar créditos." >&2
  exit 1
fi

# ── URLs (una por línea, en orden) para una celda — leíble directo con readarray ──
build_input_urls() {  # $1 = job index
  local idx="$1" ref
  while IFS= read -r ref; do
    ref="${ref%$'\r'}"
    [ -n "${URL_CACHE[$ref]:-}" ] && echo "${URL_CACHE[$ref]}"
  done < <(jq -r ".[$idx].refs[]?" "$JOBS")
}

# ── Enviar los jobs seleccionados ──────────────────────────────────────────────
echo ""
echo "=== Enviando ${#RUN_IDX[@]} jobs ($MODEL, 9:16, 2K) ==="

FAILED=()
TASK_IDS=(); TASK_NAMES=()
OK_NAMES=()
# Un solo jq para los 30 largos, en vez de uno por celda. Los índices coinciden con
# RUN_IDX porque guarda las posiciones originales del array de jobs.
readarray -t PROMPT_LENS < <(jq -r '.[].prompt | length' "$JOBS")
for i in "${RUN_IDX[@]}"; do
  NAME=$(jq -r ".[$i].name" "$JOBS")
  PROMPT=$(jq -r ".[$i].prompt" "$JOBS")
  readarray -t URL_ARR < <(build_input_urls "$i")
  REF_COUNT=${#URL_ARR[@]}

  if [ "$REF_COUNT" -lt 1 ]; then
    echo "  ✗ [$NAME] sin refs — saltando"; FAILED+=("$NAME"); continue
  fi
  if [ "$REF_COUNT" -gt "$MODEL_MAX_REFS" ]; then
    echo "  ✗ [$NAME] $REF_COUNT refs > máximo de $MODEL para $MODEL ($MODEL_MAX_REFS) — saltando"; FAILED+=("$NAME"); continue
  fi
  # Largo en CARACTERES, no en bytes. `${#PROMPT}` cuenta bytes salvo locale UTF-8, y en Git
  # Bash sobre Windows no se puede dar por hecho: un prompt con tildes y ñ se contaba inflado
  # y este guard rechazaba celdas que build-jobs.py (que cuenta code points) había aprobado.
  # Dos guards midiendo en unidades distintas = uno de los dos miente. `jq length` devuelve
  # code points, igual que Python. Los largos se calculan UNA vez antes del loop (ver arriba).
  PROMPT_LEN=${PROMPT_LENS[$i]}
  if [ "$PROMPT_LEN" -gt "$MODEL_MAX_CHARS" ]; then
    echo "  ✗ [$NAME] prompt $PROMPT_LEN chars > máximo $MODEL_MAX_CHARS de $MODEL — acorta el Concept (EN)"; FAILED+=("$NAME"); continue
  fi

  case "$MODEL" in
    gpt-image-2)      BODY=$(kie_body_gpt_image_i2i "$PROMPT" "9:16" "2K" "${URL_ARR[@]}") ;;
    nano-banana-pro)  BODY=$(kie_body_nano_banana    "$PROMPT" "9:16" "2K" "${URL_ARR[@]}") ;;
    nano-banana-2)    BODY=$(kie_body_nano_banana_2  "$PROMPT" "9:16" "2K" "${URL_ARR[@]}") ;;
  esac

  TID=$(kie_submit "$BODY")
  if [ -z "$TID" ]; then echo "  ✗ [$NAME] submit falló"; FAILED+=("$NAME"); continue; fi
  echo "  [$NAME] $TID (${REF_COUNT} refs)"
  TASK_IDS+=("$TID"); TASK_NAMES+=("$NAME")
  [ "$DELAY" -gt 0 ] && sleep "$DELAY"
done

# ── Poll + descargar + QC post-render ──────────────────────────────────────────
echo ""
echo "=== Polling ${#TASK_IDS[@]} tasks ==="
for i in "${!TASK_IDS[@]}"; do
  TID="${TASK_IDS[$i]}"; NAME="${TASK_NAMES[$i]}"
  N=$((i+1)); T=${#TASK_IDS[@]}
  echo "  [$N/$T] $NAME polling..."
  URL=$(kie_poll "$TID" 5 15)
  if [ -z "$URL" ]; then
    echo "  ✗ $NAME — poll falló o timeout"; FAILED+=("$NAME"); continue
  fi
  # Preservar el "antes" de un re-render de corrección (--force sobre un PNG ya válido)
  # para que el Paso 14 (QC) pueda documentar el defecto real en qc-findings.json.
  # Solo la primera vez: si ya hay un "antes" guardado, no se pisa con el siguiente fix.
  # Chequeos baratos primero (evita el decode de ffmpeg de png_ok cuando ya no hace falta):
  # todo PNG en $OUT ya pasó png_ok al descargarse (línea de abajo lo borra si no pasa),
  # así que acá alcanza con confirmar que el archivo existe y no quedó truncado.
  if [ "$FORCE" -eq 1 ] && [ ! -f "$OUT/_qc-before/${NAME}.png" ] \
     && [ -f "$OUT/${NAME}.png" ] && [ "$(wc -c < "$OUT/${NAME}.png")" -ge "$MIN_BYTES" ]; then
    mkdir -p "$OUT/_qc-before"
    cp "$OUT/${NAME}.png" "$OUT/_qc-before/${NAME}.png"
  fi
  curl -sL "$URL" -o "$OUT/${NAME}.png"
  if png_ok "$OUT/${NAME}.png"; then
    echo "  ✓ ${NAME}.png ($(wc -c < "$OUT/${NAME}.png") bytes)"
    OK_NAMES+=("$NAME")
  else
    echo "  ✗ ${NAME}.png FALLÓ QC (negro/vacío/truncado) — borrado para reintento"
    rm -f "$OUT/${NAME}.png"; FAILED+=("$NAME")
  fi
done

# ── Registrar qué modelo renderizó cada imagen OK (una sola escritura) ───────
META="$OUT/render-meta.json"
if [ "${#OK_NAMES[@]}" -gt 0 ]; then
  [ -f "$META" ] || echo '{}' > "$META"
  printf '%s\n' "${OK_NAMES[@]}" | jq -R . | jq -s --arg v "$MODEL" \
    'reduce .[] as $n ({}; . + {($n): $v})' > "$META.new"
  jq -s '.[0] + .[1]' "$META" "$META.new" > "$META.tmp" && mv "$META.tmp" "$META"
  rm -f "$META.new"
fi

# ── Reporte ────────────────────────────────────────────────────────────────────
echo ""
echo "=== Completo ==="
OK_RUN=$(( ${#RUN_IDX[@]} - ${#FAILED[@]} ))
echo "$OK_RUN / ${#RUN_IDX[@]} de esta corrida OK  ·  $(ls "$OUT/"*.png 2>/dev/null | wc -l)/$TOTAL PNGs en la carpeta"
if [ "${#FAILED[@]}" -gt 0 ]; then
  ONLY_LIST=$(IFS=,; echo "${FAILED[*]}")
  echo "⚠️  ${#FAILED[@]} fallaron/pendientes: $ONLY_LIST"
  echo "    Reintentá SOLO esas (sin re-gastar en las buenas):"
  echo "    bash \"$SCRIPT_DIR/run-all-ads.sh\" --only $ONLY_LIST"
  echo "    Si sospechás que $MODEL está caído o rechazando por moderación, probá otro modelo:"
  echo "    bash \"$SCRIPT_DIR/run-all-ads.sh\" --only $ONLY_LIST --model nano-banana-pro"
fi
