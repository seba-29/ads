#!/usr/bin/env bash
# Kie API Helpers — single source of truth for all Kie REST interactions.
# Source from any bash script: `source "$(dirname "$0")/kie-api-helpers.sh"`
# Requires: bash, curl, jq. (jq is available in git-bash on Windows.)

set -u

# --- Configuration ----------------------------------------------------------

# Prefer an already-exported KIE_API_KEY (e.g. Claude Cowork environment variable).
# Otherwise auto-load a .env: search UPWARD from CWD (like git looks for .git) —
# covers running from inside the brand's subfolder (ver SKILL.md Paso 12) while
# .env lives in the parent WORK_DIR, not the brand folder itself. Sin esto, correr
# `run-all-ads.sh` desde la carpeta de la marca no encontraba la key (caso real,
# forzaba un `source ../.env` manual). Fallback final: la carpeta del propio bundle.
if [ -z "${KIE_API_KEY:-}" ]; then
  _kie_env_path=""
  _kie_dir="$PWD"
  while [ -n "$_kie_dir" ]; do
    if [ -f "$_kie_dir/.env" ]; then _kie_env_path="$_kie_dir/.env"; break; fi
    [ "$_kie_dir" = "/" ] && break
    _kie_dir="$(dirname "$_kie_dir")"
  done
  for env_path in \
    "$_kie_env_path" \
    "$(dirname "${BASH_SOURCE[0]}")/.env" \
    "$(dirname "${BASH_SOURCE[0]}")/../.env"
  do
    if [ -n "$env_path" ] && [ -f "$env_path" ]; then
      # shellcheck disable=SC1090
      set -a; source "$env_path"; set +a
      break
    fi
  done
  unset _kie_env_path _kie_dir
fi

# NOTE: do NOT hard-fail here. Building prompts (kie_build_layered_prompt) is pure text and
# must work without a key. The render functions below (kie_upload/kie_submit/kie_poll/
# kie_test_auth) call _kie_require_key at call-time, so a missing key fails loudly only when
# you actually try to hit the API.
: "${KIE_API_KEY:=}"   # define it so `set -u` doesn't crash callers
_kie_require_key() {
  if [ -z "${KIE_API_KEY:-}" ]; then
    echo "ERROR: KIE_API_KEY not set. Set it as an environment variable (Cowork) or in a .env (KIE_API_KEY=sk-...)." >&2
    return 1
  fi
}

KIE_BASE="https://api.kie.ai/api/v1"
KIE_UPLOAD_BASE="https://kieai.redpandaai.co/api"

# --- Core functions ---------------------------------------------------------

# Upload a local file. Returns public URL (3-day TTL).
# Usage: url=$(kie_upload /path/to/image.png)
kie_upload() {
  _kie_require_key || return 1
  local file="$1"
  local upload_path="${2:-student-ads}"   # required by Kie API even though docs say optional
  [ -f "$file" ] || { echo "ERROR kie_upload: file not found: $file" >&2; return 1; }
  local response
  response=$(curl -sS -X POST "$KIE_UPLOAD_BASE/file-stream-upload" \
    -H "Authorization: Bearer $KIE_API_KEY" \
    -F "file=@$file" \
    -F "uploadPath=$upload_path")
  local url
  url=$(echo "$response" | jq -r '.data.downloadUrl // .data.fileUrl // empty')
  if [ -z "$url" ]; then
    echo "ERROR kie_upload: response had no URL: $response" >&2
    return 1
  fi
  echo "$url"
}

# Submit a job with a pre-built JSON body. Returns taskId.
# Usage: task_id=$(kie_submit "$body_json")
kie_submit() {
  _kie_require_key || return 1
  local body="$1"
  local response
  response=$(curl -sS -X POST "$KIE_BASE/jobs/createTask" \
    -H "Authorization: Bearer $KIE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")
  local task_id
  task_id=$(echo "$response" | jq -r '.data.taskId // empty')
  if [ -z "$task_id" ]; then
    echo "ERROR kie_submit: no taskId in response: $response" >&2
    return 1
  fi
  echo "$task_id"
}

# Poll a task until success/fail/timeout. Returns first result URL on success.
# Usage: url=$(kie_poll "$task_id" [interval_s] [max_min])
kie_poll() {
  _kie_require_key || return 1
  local task_id="$1"
  local interval="${2:-3}"
  local max_minutes="${3:-15}"
  local elapsed=0
  local max_seconds=$((max_minutes * 60))
  while [ "$elapsed" -lt "$max_seconds" ]; do
    local response
    response=$(curl -sS -X GET "$KIE_BASE/jobs/recordInfo?taskId=$task_id" \
      -H "Authorization: Bearer $KIE_API_KEY")
    local state
    state=$(echo "$response" | jq -r '.data.state // empty')
    case "$state" in
      success)
        local result_url credits
        result_url=$(echo "$response" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
        credits=$(echo "$response" | jq -r '.data.creditsConsumed // 0')
        echo "[kie_poll] task $task_id success — credits:$credits" >&2
        echo "$result_url"
        return 0 ;;
      fail)
        local fail_msg
        fail_msg=$(echo "$response" | jq -r '.data.failMsg // "unknown"')
        echo "ERROR kie_poll: task $task_id failed: $fail_msg" >&2
        return 1 ;;
      waiting|queuing|generating|"")
        echo "[kie_poll] $task_id state=$state elapsed=${elapsed}s" >&2
        sleep "$interval"
        elapsed=$((elapsed + interval))
        # Gradual backoff
        if [ "$elapsed" -gt 30 ] && [ "$interval" -lt 10 ]; then
          interval=$((interval + 2))
        fi ;;
      *)
        echo "ERROR kie_poll: unknown state '$state': $response" >&2
        return 1 ;;
    esac
  done
  echo "ERROR kie_poll: timeout after $max_minutes minutes" >&2
  return 1
}

# Submit + poll convenience. Returns result URL.
kie_run() {
  local body="$1"
  local task_id
  task_id=$(kie_submit "$body") || return 1
  echo "[kie_run] submitted task $task_id" >&2
  kie_poll "$task_id"
}

# Download a result URL to local file.
kie_download() {
  local url="$1" out="$2"
  curl -sS "$url" -o "$out" || { echo "ERROR kie_download: $url" >&2; return 1; }
  echo "[kie_download] saved $out" >&2
}

# --- Body builders per model ------------------------------------------------

# Nano Banana Pro (image). Best for: multi-ref consistency, fotorrealismo.
# Usage: body=$(kie_body_nano_banana "prompt" "9:16" "2K" url1 [url2 ... up to 8])
kie_body_nano_banana() {
  local prompt="$1" aspect="${2:-9:16}" resolution="${3:-2K}"
  shift 3
  local urls_json="[]"
  if [ "$#" -gt 0 ]; then
    urls_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  fi
  jq -n \
    --arg prompt "$prompt" \
    --arg aspect "$aspect" \
    --arg resolution "$resolution" \
    --argjson urls "$urls_json" \
    '{
      model: "nano-banana-pro",
      input: {
        prompt: $prompt,
        image_input: $urls,
        aspect_ratio: $aspect,
        resolution: $resolution,
        output_format: "png"
      }
    }'
}

# GPT Image 2 text-to-image. Best for: text integrated in image, ad layouts.
# Usage: body=$(kie_body_gpt_image_t2i "prompt" "9:16" "2K")
kie_body_gpt_image_t2i() {
  local prompt="$1" aspect="${2:-9:16}" resolution="${3:-2K}"
  jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" --arg resolution "$resolution" \
    '{
      model: "gpt-image-2-text-to-image",
      input: { prompt: $prompt, aspect_ratio: $aspect, resolution: $resolution }
    }'
}

# GPT Image 2 image-to-image. Best for: editing/restyling existing image with text.
# Usage: body=$(kie_body_gpt_image_i2i "prompt" "9:16" "2K" url1 [url2 ... up to 16])
kie_body_gpt_image_i2i() {
  local prompt="$1" aspect="${2:-9:16}" resolution="${3:-2K}"
  shift 3
  local urls_json
  urls_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" --arg resolution "$resolution" --argjson urls "$urls_json" \
    '{
      model: "gpt-image-2-image-to-image",
      input: { prompt: $prompt, input_urls: $urls, aspect_ratio: $aspect, resolution: $resolution }
    }'
}

# Seedance 2.0 — USE THIS FOR MULTI-SHOT VIDEO (per Santiago's rule).
# Embed timestamps in prompt text. duration is INTEGER 4-15.
# Usage: body=$(kie_body_seedance "prompt" "9:16" 5 "720p" "$first_frame_url" ref1 ref2 ...)
kie_body_seedance() {
  local prompt="$1" aspect="${2:-9:16}" duration="${3:-5}" resolution="${4:-720p}"
  local first_frame="${5:-}"
  shift 5
  local refs_json="[]"
  if [ "$#" -gt 0 ]; then
    refs_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  fi
  local input_json
  input_json=$(jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" \
    --argjson duration "$duration" --arg resolution "$resolution" \
    --argjson refs "$refs_json" \
    '{
      prompt: $prompt, aspect_ratio: $aspect, duration: $duration,
      resolution: $resolution, reference_image_urls: $refs,
      generate_audio: false, nsfw_checker: false
    }')
  if [ -n "$first_frame" ]; then
    input_json=$(echo "$input_json" | jq --arg ff "$first_frame" '. + {first_frame_url: $ff}')
  fi
  jq -n --argjson input "$input_json" '{ model: "bytedance/seedance-2", input: $input }'
}

# Kling 3.0 single-shot — USE THIS FOR SINGLE-SHOT VIDEO (per Santiago's rule).
# duration is STRING "3"-"15". mode is "std" | "pro" | "4K".
# Usage: body=$(kie_body_kling_single "prompt" "9:16" "5" "pro" "$first_frame_url")
# DEPRECATED 2026-05-25 in favor of kie_body_kling_multi_ref. Kept for backward compat.
kie_body_kling_single() {
  local prompt="$1" aspect="${2:-9:16}" duration="${3:-5}" mode="${4:-pro}"
  local first_frame="${5:-}"
  local input_json
  input_json=$(jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" \
    --arg duration "$duration" --arg mode "$mode" \
    '{
      prompt: $prompt, sound: false, duration: $duration,
      aspect_ratio: $aspect, mode: $mode, multi_shots: false
    }')
  if [ -n "$first_frame" ]; then
    input_json=$(echo "$input_json" | jq --arg ff "$first_frame" '. + {image_urls: [$ff]}')
  fi
  jq -n --argjson input "$input_json" '{ model: "kling-3.0/video", input: $input }'
}

# Kling 3.0 multi-ref — LAW 13 enforcement (Kie API translation of GenHQ multi-ref principle).
# Pass first_frame + character_ref + product_ref (+ optional more) as image_urls array.
# Identity refs anchor the model throughout the clip — without them, drift after 2-3s.
# Max 8 refs total per call (Kling/Kie limit).
# Usage: body=$(kie_body_kling_multi_ref "prompt" "9:16" "15" "pro" "$first_frame" "$char_ref" "$product_ref" [more refs...])
# Required: prompt, aspect, duration, mode, first_frame (positional). Additional refs variadic.
kie_body_kling_multi_ref() {
  local prompt="$1" aspect="${2:-9:16}" duration="${3:-5}" mode="${4:-pro}"
  shift 4
  if [ "$#" -lt 1 ]; then
    echo "ERROR kie_body_kling_multi_ref: need at least 1 ref URL (first_frame)" >&2
    return 1
  fi
  if [ "$#" -gt 8 ]; then
    echo "WARN kie_body_kling_multi_ref: $# refs exceeds 8-ref ceiling, may fail" >&2
  fi
  local refs_json
  refs_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  jq -n \
    --arg prompt "$prompt" --arg aspect "$aspect" \
    --arg duration "$duration" --arg mode "$mode" \
    --argjson refs "$refs_json" \
    '{
      model: "kling-3.0/video",
      input: {
        prompt: $prompt,
        sound: false,
        duration: $duration,
        aspect_ratio: $aspect,
        mode: $mode,
        multi_shots: false,
        image_urls: $refs
      }
    }'
}

# Kling 3.0 multi-shot — native multi_shots mode with multi_prompt array.
# Per shot prompt limit: 500 chars. Use for true multi-shot sequences.
# Usage: body=$(kie_body_kling_multi "9:16" "9" "std" true \
#          "Shot 1 prompt text..." \
#          "Shot 2 prompt text..." \
#          "Shot 3 prompt text...")
# Args: aspect, duration_str, mode (std/pro/4K), sound_bool, shot1, shot2, ...
kie_body_kling_multi() {
  local aspect="${1:-9:16}" duration="${2:-9}" mode="${3:-std}" sound_bool="${4:-false}"
  shift 4
  if [ "$#" -lt 2 ]; then
    echo "ERROR kie_body_kling_multi: need at least 2 shot prompts" >&2; return 1
  fi
  # Validate each shot is under 500 chars
  for shot in "$@"; do
    if [ "${#shot}" -gt 500 ]; then
      echo "WARN kie_body_kling_multi: shot prompt is ${#shot} chars (>500 limit)" >&2
    fi
  done
  local shots_json
  shots_json=$(printf '%s\n' "$@" | jq -R . | jq -s .)
  local sound_val
  if [ "$sound_bool" = "true" ]; then sound_val=true; else sound_val=false; fi
  jq -n \
    --arg aspect "$aspect" --arg duration "$duration" --arg mode "$mode" \
    --argjson sound "$sound_val" --argjson shots "$shots_json" \
    '{
      model: "kling-3.0/video",
      input: {
        sound: $sound,
        duration: $duration,
        aspect_ratio: $aspect,
        mode: $mode,
        multi_shots: true,
        multi_prompt: $shots
      }
    }'
}

# MiniMax Hailuo 02 standard image-to-video. Max 10s, 768P at 10s / 1080P at 6s.
# Aspect ratio inherited from input image. Prompt max 1500 chars.
# Usage: body=$(kie_body_hailuo "<prompt>" "<first_frame_url>" [duration_str] [resolution] [end_frame_url])
# duration: "6" or "10". resolution: "512P" | "768P" | "1080P" (1080P only with duration=6).
kie_body_hailuo() {
  local prompt="$1" image_url="$2"
  local duration="${3:-10}" resolution="${4:-768P}"
  local end_url="${5:-}"
  local input_json
  input_json=$(jq -n \
    --arg prompt "$prompt" --arg img "$image_url" \
    --arg dur "$duration" --arg res "$resolution" \
    '{
      prompt: $prompt,
      image_url: $img,
      duration: $dur,
      resolution: $res,
      prompt_optimizer: false,
      nsfw_checker: false
    }')
  if [ -n "$end_url" ]; then
    input_json=$(echo "$input_json" | jq --arg ef "$end_url" '. + {end_image_url: $ef}')
  fi
  jq -n --argjson input "$input_json" '{ model: "hailuo/02-image-to-video-standard", input: $input }'
}

# --- Layered prompt builder (DEEPLOOK 5-layer pattern) ----------------------

# Build a layered prompt following DEEPLOOK Research Agent's pattern.
# Replicates the brand-consistency engine from gemini-image-gen.js buildPrompt().
#
# Layer 1: BRAND PHOTOGRAPHY DIRECTION (prepended to EVERY image, from alpha-prompt.txt)
# Layer 2: BRAND LOGO REFERENCE (instruction; logo image must be in image_urls separately)
# Layer 3: AD CONCEPT (the hook + scene for THIS image)
# Layer 4: PRODUCT REFERENCE (images-are-primary instruction + product-dna.txt as supplement)
# Layer 5: COMPOSITION SUFFIX (no panels/borders/frames, full-bleed 9:16)
#
# Usage:
#   PROMPT=$(kie_build_layered_prompt \
#     --alpha-prompt-file "path/to/alpha-prompt.txt" \
#     --ad-concept "Documentary candid photograph inside workshop... TEXT: '...'" \
#     --product-dna-file "path/to/product-dna.txt" \
#     --has-logo \
#     --has-product-images \
#     --negative "no harsh flash, no cold tones")
#
# Flags:
#   --alpha-prompt-file <path>   Path to brand alpha prompt (Layer 1). Required.
#   --ad-concept <text>          The hook + scene description (Layer 3). Required.
#   --product-dna-file <path>    Path to product DNA text (Layer 4 supplement). Optional.
#   --has-logo                   Inject Layer 2 logo instruction (you pass logo URL in image_urls).
#   --has-product-images         Inject Layer 4 "images are primary" instruction.
#   --negative <text>            Optional negative prompt.
#   --no-composition-suffix      Skip Layer 5 (rare; defaults to including it).
kie_build_layered_prompt() {
  local alpha_file="" ad_concept="" product_dna_file=""
  local has_logo=0 has_product=0 add_composition=1
  local mode="image"   # "image" (full alpha-prompt) or "video" (strips UI/text/CTA sections)
  local negative=""

  while [ "$#" -gt 0 ]; do
    case "$1" in
      --alpha-prompt-file)      alpha_file="$2"; shift 2 ;;
      --ad-concept)             ad_concept="$2"; shift 2 ;;
      --product-dna-file)       product_dna_file="$2"; shift 2 ;;
      --has-logo)               has_logo=1; shift ;;
      --has-product-images)     has_product=1; shift ;;
      --negative)               negative="$2"; shift 2 ;;
      --no-composition-suffix)  add_composition=0; shift ;;
      --mode)                   mode="$2"; shift 2 ;;
      *) echo "ERROR kie_build_layered_prompt: unknown flag $1" >&2; return 1 ;;
    esac
  done

  [ -z "$ad_concept" ] && { echo "ERROR: --ad-concept required" >&2; return 1; }
  case "$mode" in image|video) ;; *) echo "ERROR: --mode must be image or video" >&2; return 1 ;; esac

  local prompt=""

  # Layer 1: BRAND PHOTOGRAPHY DIRECTION
  # IMAGE mode: full alpha-prompt (includes CTA/typography/wordmark rules — needed for ad layout)
  # VIDEO mode: strip UI/CTA/typography/text sections (video is realistic, no UI elements)
  if [ -n "$alpha_file" ] && [ -f "$alpha_file" ]; then
    local alpha
    alpha=$(cat "$alpha_file" | tr -d '\r')
    if [ "$mode" = "video" ]; then
      # Strip lines/sections related to UI: CTA STYLE, TYPOGRAPHY, wordmark, text rules.
      # Match either single-line "KEY: value" or multi-line sections starting with all-caps headers.
      # Patterns deleted: lines starting (case-insensitive) with CTA, TYPOGRAPHY, WORDMARK, BRAND MARK, TEXT ON
      alpha=$(echo "$alpha" | awk '
        BEGIN { skip = 0 }
        # Detect section starts that should be skipped
        /^[[:space:]]*(CTA|TYPOGRAPHY|WORDMARK|BRAND MARK|TEXT ON|TEXT-ON)([[:space:]:]|$)/ { skip = 1; next }
        # Headers like "NEVER:" or "PERSONALITY:" reset skip
        /^[[:space:]]*[A-Z][A-Z &/-]+:[[:space:]]*$/ { skip = 0 }
        /^[[:space:]]*[A-Z][A-Z &/-]+:/ { skip = 0 }
        # Print line if not in skip mode
        skip == 0 { print }
      ' | sed '/^[[:space:]]*$/N;/\n[[:space:]]*$/D')  # collapse double blank lines
      prompt+="BRAND CINEMATIC DIRECTION (video, no UI elements): ${alpha}

"
    else
      prompt+="BRAND PHOTOGRAPHY DIRECTION: ${alpha}

"
    fi
  fi

  # Layer 2: BRAND LOGO REFERENCE
  if [ "$has_logo" -eq 1 ]; then
    prompt+="BRAND LOGO REFERENCE: One of the attached images is the brand's exact logo -- reproduce it faithfully for any brand mark or wordmark that appears in the ad.

"
  fi

  # Layer 3: AD CONCEPT
  if [ -n "$alpha_file" ] || [ "$has_logo" -eq 1 ]; then
    prompt+="AD CONCEPT: "
  fi
  prompt+="${ad_concept}"

  # Layer 4: PRODUCT REFERENCE
  local dna=""
  if [ -n "$product_dna_file" ] && [ -f "$product_dna_file" ]; then
    dna=$(cat "$product_dna_file" | tr -d '\r')
  fi
  if [ "$has_product" -eq 1 ] && [ -n "$dna" ]; then
    prompt+="

PRODUCT REFERENCE (IMAGES ARE PRIMARY): The attached product photos are your PRIMARY source of truth for product appearance. Reproduce these exact products -- shapes, colors, textures, packaging, labels, and finishes as shown in the photos. The text description below is supplementary context only. If the photos and text conflict, follow the photos.
${dna}"
  elif [ "$has_product" -eq 1 ]; then
    prompt+="

PRODUCT REFERENCE (IMAGES ARE PRIMARY): The attached product photos are your PRIMARY source of truth. Reproduce these exact products -- shapes, colors, textures, packaging, labels, and finishes as shown in the photos. Do not alter the product design."
  elif [ -n "$dna" ]; then
    prompt+="

PRODUCT IN SCENE: ${dna}. Do not alter the product design."
  fi

  # Negative prompt
  if [ -n "$negative" ]; then
    prompt+="

Avoid: ${negative}"
  fi

  # Layer 5: COMPOSITION SUFFIX (mode-aware)
  if [ "$add_composition" -eq 1 ]; then
    if [ "$mode" = "video" ]; then
      # Video: no text/UI/CTA elements. Pure cinematic.
      if ! echo "$prompt" | grep -qi "realistic cinematic video"; then
        prompt+=". Realistic cinematic video. No text overlay, no UI elements, no CTA buttons, no wordmark rendered, no logos in frame, no on-screen graphics, no design elements. Vertical 9:16 portrait orientation."
      fi
    else
      # Image: ad layout, allow text/UI
      if ! echo "$prompt" | grep -qi "no panels\|no borders"; then
        prompt+=". One continuous photograph extending to all edges. No panels, borders, frames, boxes, or split layouts. Vertical 9:16 portrait orientation."
      fi
    fi
  fi

  printf '%s' "$prompt"
}

# --- Audio: ElevenLabs TTS --------------------------------------------------

# ElevenLabs multilingual v2 text-to-speech.
# Usage: body=$(kie_body_elevenlabs_tts "<text>" [voice] [stability] [similarity] [style] [speed] [lang])
# Defaults: voice=Aria, stability=0.5, similarity=0.75, style=0, speed=1, lang=es
# Notable warm Spanish-capable voices: Aria, Sarah, Charlotte, Jessica, Lily, Laura.
kie_body_elevenlabs_tts() {
  local text="$1" voice="${2:-Aria}"
  local stability="${3:-0.5}" similarity="${4:-0.75}" style="${5:-0}" speed="${6:-1}" lang="${7:-es}"
  jq -n \
    --arg text "$text" --arg voice "$voice" --arg lang "$lang" \
    --argjson stab "$stability" --argjson sim "$similarity" --argjson styl "$style" --argjson spd "$speed" \
    '{
      model: "elevenlabs/text-to-speech-multilingual-v2",
      input: {
        text: $text,
        voice: $voice,
        stability: $stab,
        similarity_boost: $sim,
        style: $styl,
        speed: $spd,
        language_code: $lang,
        timestamps: true
      }
    }'
}

# ElevenLabs V3 (Alpha) text-to-dialogue. Most expressive ElevenLabs model.
# Supports audio tags inline: [whispers] [excited] [warm] [softly] [sighs] [laughs] [sarcastic]
# Even English-trained voices sound much more human in Spanish vs multilingual-v2.
# Usage: body=$(kie_body_elevenlabs_v3 "<text>" [voice] [stability] [language_code])
# stability ENUM strict: 0 | 0.5 | 1.0 (default 0.5).
kie_body_elevenlabs_v3() {
  local text="$1" voice="${2:-Jessica}"
  local stability="${3:-0.5}" lang="${4:-es}"
  jq -n \
    --arg text "$text" --arg voice "$voice" --arg lang "$lang" \
    --argjson stab "$stability" \
    '{
      model: "elevenlabs/text-to-dialogue-v3",
      input: {
        dialogue: [ { text: $text, voice: $voice } ],
        stability: $stab,
        language_code: $lang
      }
    }'
}

# --- ElevenLabs DIRECT API (bypass Kie) -------------------------------------
# Use this for Mexican-trained voices and other voice IDs not exposed by Kie.
# Requires ELEVENLABS_API_KEY in .env (Creator tier $22/mo or higher).
ELEVENLABS_BASE="https://api.elevenlabs.io/v1"

# ElevenLabs direct text-to-speech. Downloads mp3 directly.
# Usage: elevenlabs_tts_direct <out.mp3> <voice_id> <text> [model_id] [stability] [similarity] [style] [speed] [lang]
# Defaults: model=eleven_multilingual_v2 stability=0.40 similarity=0.85 style=0.25 speed=1.0 lang=es
# Returns 0 on success (HTTP 200 + file >10KB), 1 on failure.
elevenlabs_tts_direct() {
  local out="$1" voice_id="$2" text="$3"
  local model="${4:-eleven_multilingual_v2}"
  local stability="${5:-0.40}" similarity="${6:-0.85}" style="${7:-0.25}" speed="${8:-1.0}"
  local lang="${9:-es}"

  if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
    echo "ERROR: ELEVENLABS_API_KEY not set in .env" >&2
    return 1
  fi

  local body
  body=$(jq -n \
    --arg text "$text" --arg model "$model" --arg lang "$lang" \
    --argjson stab "$stability" --argjson sim "$similarity" --argjson styl "$style" --argjson spd "$speed" \
    '{
      text: $text,
      model_id: $model,
      language_code: $lang,
      voice_settings: {
        stability: $stab,
        similarity_boost: $sim,
        style: $styl,
        use_speaker_boost: true,
        speed: $spd
      }
    }')

  local http_code
  # Use --data-binary @- via stdin to preserve UTF-8 multibyte chars
  # (curl -d "$var" mangles UTF-8 in git-bash, returns invalid_unicode 400).
  http_code=$(printf '%s' "$body" | curl -sS -w "%{http_code}" -o "$out" \
    -X POST "${ELEVENLABS_BASE}/text-to-speech/${voice_id}" \
    -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "Accept: audio/mpeg" \
    --data-binary @-)

  if [ "$http_code" != "200" ]; then
    echo "ERROR: ElevenLabs HTTP $http_code" >&2
    echo "Response body:" >&2
    cat "$out" >&2
    echo >&2
    rm -f "$out"
    return 1
  fi

  local size
  size=$(stat -c%s "$out" 2>/dev/null || stat -f%z "$out" 2>/dev/null || echo 0)
  if [ "$size" -lt 10000 ]; then
    echo "ERROR: Output file too small ($size bytes), likely an error response" >&2
    return 1
  fi

  echo "OK $out ($size bytes)"
  return 0
}

# List ElevenLabs voices (filterable by jq downstream).
# Usage: elevenlabs_list_voices  →  JSON of all voices in current account library
elevenlabs_list_voices() {
  if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
    echo "ERROR: ELEVENLABS_API_KEY not set in .env" >&2
    return 1
  fi
  curl -sS -H "xi-api-key: ${ELEVENLABS_API_KEY}" "${ELEVENLABS_BASE}/voices"
}

# --- Audio: Suno music (uses custom /generate endpoint, not /jobs/createTask) -

# Suno music generation. Different endpoint from standard Kie tasks.
# Usage: task_id=$(kie_suno_submit "<style/genre prompt>" [model] [instrumental_bool] [title] [negative_tags])
# Defaults: model=V4_5PLUS, instrumental=true, title="UGC BG", negative_tags="vocals, lyrics, edm, jingle"
kie_suno_submit() {
  local style_prompt="$1"
  local model="${2:-V4_5PLUS}"
  local instrumental="${3:-true}"
  local title="${4:-UGC BG}"
  local negative="${5:-vocals, lyrics, voice, singing, edm, dubstep, jingle, corporate stock music, aggressive drums}"
  # Custom mode: allows style + title + negative_tags
  local body
  body=$(jq -n \
    --arg prompt "$style_prompt" --arg model "$model" --arg title "$title" --arg neg "$negative" \
    --argjson instr "$instrumental" \
    '{
      prompt: $prompt,
      style: $prompt,
      title: $title,
      customMode: true,
      instrumental: $instr,
      model: $model,
      negativeTags: $neg,
      callBackUrl: "https://webhook.site/00000000-0000-0000-0000-000000000000"
    }')
  local response
  response=$(curl -sS -X POST "$KIE_BASE/generate" \
    -H "Authorization: Bearer $KIE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")
  local task_id
  task_id=$(echo "$response" | jq -r '.data.taskId // empty')
  if [ -z "$task_id" ]; then
    echo "ERROR kie_suno_submit: no taskId: $response" >&2
    return 1
  fi
  echo "$task_id"
}

# Poll Suno task. Returns first audio_url on completion.
# Usage: url=$(kie_suno_poll "$task_id" [interval] [max_min])
kie_suno_poll() {
  local task_id="$1"
  local interval="${2:-5}"
  local max_minutes="${3:-10}"
  local elapsed=0
  local max_seconds=$((max_minutes * 60))
  while [ "$elapsed" -lt "$max_seconds" ]; do
    local response
    response=$(curl -sS -X GET "$KIE_BASE/generate/record-info?taskId=$task_id" \
      -H "Authorization: Bearer $KIE_API_KEY")
    local status
    status=$(echo "$response" | jq -r '.data.status // .data.state // empty')
    case "$status" in
      SUCCESS|success|complete)
        local audio_url
        audio_url=$(echo "$response" | jq -r '.data.response.sunoData[0].audioUrl // .data.audioUrl // .data.audio_url // empty')
        if [ -z "$audio_url" ]; then
          echo "ERROR kie_suno_poll: success but no audio URL: $response" >&2
          return 1
        fi
        echo "[kie_suno_poll] $task_id done" >&2
        echo "$audio_url"
        return 0 ;;
      FAILED|failed|fail|error|ERROR|SENSITIVE_WORD_ERROR|GENERATE_AUDIO_FAILED|CREATE_TASK_FAILED|CALLBACK_EXCEPTION)
        local err_msg
        err_msg=$(echo "$response" | jq -r '.data.errorMessage // .msg // "unknown"')
        echo "ERROR kie_suno_poll: task $task_id failed ($status): $err_msg" >&2
        return 1 ;;
      *)
        echo "[kie_suno_poll] $task_id status=$status elapsed=${elapsed}s" >&2
        sleep "$interval"
        elapsed=$((elapsed + interval)) ;;
    esac
  done
  echo "ERROR kie_suno_poll: timeout" >&2
  return 1
}

# Suno convenience: submit + poll + download.
# Usage: kie_suno_run "<style prompt>" <output.mp3> [model] [instrumental_bool]
kie_suno_run() {
  local style="$1" out="$2"
  local model="${3:-V4_5PLUS}" instr="${4:-true}"
  local task_id
  task_id=$(kie_suno_submit "$style" "$model" "$instr") || return 1
  echo "[kie_suno_run] submitted $task_id" >&2
  local url
  url=$(kie_suno_poll "$task_id") || return 1
  kie_download "$url" "$out"
}

# --- ffmpeg mux: concat video clips + layer VO + ducked music + loudnorm -----

# Production-grade muxer for the student-ad pipeline.
# - Concats N video clips (no audio retained from clips — Kling generated silent)
# - Adds continuous VO track
# - Adds music track, sidechain-ducked by VO presence
# - Normalizes loudness to -14 LUFS (Meta-ready)
# - Outputs H.264 + AAC mp4, faststart for web delivery
#
# Usage: ffmpeg_mux <output.mp4> <vo.mp3> <music.mp3> <clip1.mp4> [clip2.mp4] [...]
# Set FFMPEG_MUX_DUCK_DB to control ducking depth (default -12).
# Set FFMPEG_MUX_LUFS to override target loudness (default -14).
ffmpeg_mux() {
  local out="$1"; shift
  local vo="$1"; shift
  local music="$1"; shift
  if [ "$#" -lt 1 ]; then
    echo "ERROR ffmpeg_mux: need at least 1 video clip" >&2; return 1
  fi
  [ -f "$vo" ] || { echo "ERROR ffmpeg_mux: VO file not found: $vo" >&2; return 1; }
  [ -f "$music" ] || { echo "ERROR ffmpeg_mux: music file not found: $music" >&2; return 1; }
  for clip in "$@"; do
    [ -f "$clip" ] || { echo "ERROR ffmpeg_mux: clip not found: $clip" >&2; return 1; }
  done

  local lufs="${FFMPEG_MUX_LUFS:--14}"

  # Build -i args for clips
  local input_args=()
  local concat_inputs=""
  local n="$#"
  local i=0
  for clip in "$@"; do
    input_args+=( -i "$clip" )
    concat_inputs+="[${i}:v]"
    i=$((i+1))
  done
  # VO and music inputs come after clips
  local vo_idx="$n"
  local mus_idx=$((n+1))
  input_args+=( -i "$vo" -i "$music" )

  # Filter graph
  # Video: concat clips (hard cuts, no transitions)
  # Audio: vo at full level, music ducked under vo, mixed, loudnorm
  local filter="${concat_inputs}concat=n=${n}:v=1:a=0[vraw];"
  filter+="[vraw]format=yuv420p[v];"
  filter+="[${vo_idx}:a]aformat=channel_layouts=stereo:sample_rates=48000,apad=whole_dur=999,asetpts=PTS-STARTPTS,asplit=2[voa1][voa2];"
  filter+="[${mus_idx}:a]aformat=channel_layouts=stereo:sample_rates=48000,asetpts=PTS-STARTPTS,volume=0.6[musa];"
  filter+="[musa][voa1]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[mducked];"
  filter+="[mducked][voa2]amix=inputs=2:duration=first:dropout_transition=0[amix];"
  filter+="[amix]loudnorm=I=${lufs}:TP=-1.5:LRA=11[aout]"

  ffmpeg -y -hide_banner -loglevel warning \
    "${input_args[@]}" \
    -filter_complex "$filter" \
    -map "[v]" -map "[aout]" \
    -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 \
    -movflags +faststart \
    -shortest \
    "$out"

  if [ -f "$out" ]; then
    echo "[ffmpeg_mux] OK: $out" >&2
    return 0
  else
    echo "ERROR ffmpeg_mux: output not created" >&2
    return 1
  fi
}

# --- Sanity check -----------------------------------------------------------

# Quick connectivity test. Returns 0 if API key works (no credits spent).
# Hits the polling endpoint with a fake task_id — expects 200 with empty data.
kie_test_auth() {
  _kie_require_key || return 1
  local response
  response=$(curl -sS -X GET "$KIE_BASE/jobs/recordInfo?taskId=test_connectivity_check" \
    -H "Authorization: Bearer $KIE_API_KEY")
  local code
  code=$(echo "$response" | jq -r '.code // empty')
  # 200 = OK, 404 = taskId not found (but auth worked), 422 = validation error (but auth worked)
  # 401 = unauthorized, 403 = forbidden — those are real auth failures
  case "$code" in
    200|404|422)
      echo "[kie_test_auth] OK — API key valid (probe response code: $code)" >&2
      return 0 ;;
    401|403)
      echo "[kie_test_auth] FAIL — auth rejected (code: $code): $response" >&2
      return 1 ;;
    *)
      echo "[kie_test_auth] UNCERTAIN — code $code, response: $response" >&2
      return 1 ;;
  esac
}
