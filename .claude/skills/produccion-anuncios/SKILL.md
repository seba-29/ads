---
name: produccion-anuncios
description: Use when Santiago (or a Felipe student) needs a full 30-image static ad matrix for a brand. Takes a brand URL, runs strategic research via the escanear-marca + diversificacion-creativa skills (local skills, or Felipe MCP tools if connected) to get brand DNA + 30 hooks (3 deseos × 2 perfiles × 5 niveles), detects the real brand palette from the URL, synthesizes a 5-layer DEEPLOOK Alpha Prompt, authors 30 scene concepts, validates payload integrity, renders 30 on-brand static images with GPT Image 2 (Kie), and builds an Excel matrix. Trigger phrases - "produccion anuncios", "anuncio estudiante", "matriz de anuncios", "30 imagenes", "/produccion-anuncios", or when Santiago shares a student/brand URL and asks for the ad matrix. NO video (that is a separate future skill).
user_invocable: true
argument: Optional brand URL. If absent, the skill asks for it interactively.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch, AskUserQuestion, Task, mcp__felipe-mcp__list_skills, mcp__felipe-mcp__run_playbook, mcp__playwright__browser_navigate, mcp__playwright__browser_wait_for, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_close
---

# `/produccion-anuncios` — Matriz de 30 anuncios estáticos (Felipe)

Skill que produce **30 imágenes estáticas de anuncio** para una marca, organizadas por la matriz creativa de Felipe (**3 deseos × 2 perfiles × 5 niveles de consciencia = 30**), más un Excel que las embebe. Sirve para los estudiantes del curso de Felipe Vergara y para cualquier marca DEEPLOOK.

Combina:
- **`escanear-marca` + `diversificacion-creativa`** → research estratégico (brand DNA + los 30 hooks). Disponibles como **skills locales** (paquete público) o como **tools del MCP de Felipe** — cualquiera de las dos sirve.
- **Detección de identidad** (`extract-brand-identity.js`) → paleta real + fuentes desde la URL (mejor que el hex único de Felipe).
- **DEEPLOOK Alpha Prompt (5 capas)** → motor de consistencia, inyectado idéntico en las 30 vía `kie_build_layered_prompt`.
- **GPT Image 2 (Kie)** → render de las 30 imágenes (i2i, 9:16, 2K, ~USD 0.05 c/u). Default; alternativas manuales **Nano Banana Pro / Nano Banana 2** vía `--model` cuando GPT está caído o rechaza una celda (ver Paso 13).

> **Sin video.** Este skill es solo imágenes estáticas. El video es un skill futuro aparte.

---

## ⚠️ REQUISITOS DEL ESTUDIANTE (leer y confirmar ANTES de arrancar)

Para usar este skill el estudiante necesita **4 cosas**:
1. **App de Claude** (Cowork / Claude Code) con **el motor de research disponible**, en cualquiera de sus **dos formas válidas** (con una alcanza):
   - **(a) Skills locales** — las carpetas `escanear-marca/` y `diversificacion-creativa/` instaladas junto a esta, en `~/.claude/skills/`. Es la forma del **paquete público**: no requiere token ni MCP, ya vienen incluidas.
   - **(b) MCP de Felipe** — Claude conectado al MCP con su token (`fv_...`), que expone las mismas capacidades como tools.
2. **Herramientas locales del render:** Node.js + Python + jq + bash disponibles en el entorno donde corre (los scripts de generación corren local). Si falta alguna, `validate-setup.js` la marca.
3. **Cuenta de Kie.ai CON SALDO + su propia `KIE_API_KEY`** ← el más olvidado, y sin él NO se pueden generar las imágenes.
4. **3–6 fotos del producto** (para marcas sin web) / la URL de la marca.

> **EL RENDER NO ES GRATIS NI "SERVER-SIDE".** Las 30 imágenes se generan con GPT Image 2 **corriendo LOCALMENTE en la máquina del estudiante** (`run-all-ads.sh` → `curl` a `api.kie.ai` con SU `KIE_API_KEY`) y consumen **los créditos de Kie del propio estudiante** (~USD 1.50 ≈ 300 créditos por corrida de 30). El motor de research (skills locales o `run_playbook` del MCP) **solo produce TEXTO** (brand DNA + hooks); **NO renderiza imágenes.**
>
> **REGLA PARA EL ASISTENTE (no la rompas):** si el estudiante pregunta "¿necesito una API de Kie?", la respuesta es **SÍ** — cuenta de Kie.ai con saldo + `KIE_API_KEY`. **NUNCA** afirmes que el render es gratis, que ocurre en el servidor de Felipe, o que "con instalar las skills alcanza". Es FALSO y deja al estudiante sin poder generar. ⚠️ Trampa conocida: si inspeccionás el plugin recién instalado y "no ves ninguna referencia a Kie", es porque los scripts de render (`run-all-ads.sh`, `kie-api-helpers.sh`) **se descargan en el PRIMER uso** vía el bootstrap del tar.gz — el requisito de Kie **sigue siendo real**; no concluyas "no se necesita Kie".

Si falta el `KIE_API_KEY` (no hay instalador que la configure): el estudiante lo provee de una de dos formas — (a) variable de entorno `KIE_API_KEY` en su entorno de Claude/Cowork, o (b) un archivo `.env` con `KIE_API_KEY=...` en su carpeta de trabajo (`<WORK_DIR>`). **El formato de la key varía** (algunas cuentas de Kie.ai emiten `sk-...`, otras un hex sin prefijo, ej. `a0a766d8...`) — **NO rechaces ni vuelvas a preguntar una key solo porque no tiene el prefijo `sk-`**; la única validación real es `kie_test_auth` (helper de `kie-api-helpers.sh`), no el formato visual. El `validate-setup.js` del Pre-flight la busca en el env y en `.env` hacia arriba, y **falla si no está** — no se puede renderizar sin ella. Si no la tiene, la skill debe **pedírsela y guiarlo a crear el `.env`**, NUNCA saltar el paso ni decir que no hace falta.

---

## Portabilidad — cómo se ubican los archivos (LEER PRIMERO)

Este skill es **autocontenido y portable**. Corre igual en **Claude Cowork** (app de escritorio), Claude Code o la terminal. Dos rutas que vas a resolver UNA vez al arrancar:

- **`<SKILL_DIR>`** = la carpeta donde vive ESTE skill (la que contiene este `SKILL.md`, más `scripts/` y `lib/`). Todos los scripts se llaman como `<SKILL_DIR>/scripts/...` y el helper como `<SKILL_DIR>/lib/kie-api-helpers.sh`. (En Cowork/Claude Code te dan la ruta de instalación del skill — usá esa.)
- **`<WORK_DIR>`** = la carpeta de trabajo que el estudiante compartió (en Cowork, la que eligió con "Work in a folder"; en terminal, el `pwd`). Ahí se crea la salida.
- **`student_folder = <WORK_DIR>/<slug>`** — subcarpeta de la marca (output). Reemplaza el viejo `STUDENT ADS/pipeline-v1/students/...`.

**Nunca** uses rutas absolutas tipo `~/.claude/...` ni `STUDENT ADS/...`. Siempre `<SKILL_DIR>` y `<WORK_DIR>`.

`KIE_API_KEY`: se toma de la **variable de entorno** (Cowork la inyecta) o de un `.env` en `<WORK_DIR>`.

Output final: `<student_folder>/static-ads/ad-01..30.png` + `<student_folder>/matriz-creativa.xlsx`.

---

## Tono del chat (REGLA)
- Responde a Santiago/al estudiante en **español**.
- Archivos de marca (`alpha-prompt.txt`, `product-dna.txt`, `voice-dna.txt`) en **inglés** (regla DEEPLOOK — los modelos rinden mejor).
- **El texto-en-imagen del ad va en el IDIOMA DEL MERCADO DE LA MARCA** (`AD_LANG`, confirmado en Paso 6b) — NO hardcoded español. Beckett Simonon (USA) → inglés. Marca LATAM → español. El idioma depende del mercado de la marca, no de dónde está el estudiante.
- Respuestas cortas en chat — el análisis profundo vive en los archivos.

---

## Paso 0 — Setup guiado (SOLO la primera vez; NO hay instalador)

La skill corre en **Claude Code** (todo en la máquina del estudiante, **sin sandbox**) y llega por una de dos vías: **el paquete público** (3 carpetas copiadas a `~/.claude/skills/`) o **el MCP privado de Felipe**. NO hay instalador que descargar: **vos, el asistente, guiás e instalás lo que falte, acá en el chat.** Hacelo ANTES del Paso 1. La mayoría de estudiantes NO es técnica — explicá simple y hacé el trabajo pesado vos.

1. **Resolver rutas:** fijá `<SKILL_DIR>` (carpeta de este skill; contiene `SKILL.md`, `scripts/`, `lib/`) y `<WORK_DIR>` (carpeta de trabajo / `pwd`).

2. **Correr el doctor:** `node "<SKILL_DIR>/scripts/validate-setup.js"`. Detecta el SO y lista qué falta, con **el comando exacto de instalación por SO** para cada faltante. (Puppeteer ausente = solo warning.)

3. **Instalar lo que falte (con permiso, un ítem a la vez).** En Claude Code podés **correr vos** los comandos (`winget`/`brew`/`apt`) — pedí confirmación; si el estudiante prefiere, pasale el comando para pegar. Explicá cada cosa en 1 línea:
   - **bash** — en **Windows VIENE CON Git**: `winget install -e --id Git.Git` (luego usar "Git Bash"). Mac/Linux ya lo traen.
   - **Python** — `winget install -e --id Python.Python.3.12` · `brew install python` · `sudo apt install -y python3`.
   - **jq** — `winget install -e --id jqlang.jq` · `brew install jq` · `sudo apt install -y jq`.
   - **Node ≥18** — `winget install -e --id OpenJS.NodeJS.LTS` · `brew install node` · `sudo apt install -y nodejs npm`.
   - **Deps del skill** — `cd "<SKILL_DIR>/scripts" && npm install` (sharp + exceljs).
   - **Windows / PATH:** si tras instalar un comando "no se encuentra", pedile al estudiante que **cierre y reabra Claude Code** y volvé a correr el doctor.

4. **Clave de Kie — el estudiante la PEGA en el chat.** El render corre local con SU clave y gasta SU saldo (~USD 1.50/30). Si el doctor marca `KIE_API_KEY` ausente:
   - Pedile: *"Pegá acá tu API key de Kie.ai. Necesitás una cuenta de Kie.ai **con saldo**."* (NO le digas que "empieza con `sk-...`" — el formato varía por cuenta, algunas son un hex sin prefijo. Si lo que pega no tiene pinta de key, confirmá con `kie_test_auth`, no por el formato.)
   - Guardala vos en `<WORK_DIR>/.env` como la línea `KIE_API_KEY=<lo que pegó, tal cual>` (creá el archivo si no existe). **No la repitas en el chat ni la loguees.** Si `<WORK_DIR>` es repo git, agregá `.env` al `.gitignore`.
   - (Ver REQUISITOS arriba: **NUNCA** digas que el render es gratis/server-side.)

5. **Repetí el doctor hasta "✓ Entorno listo".** Recién ahí seguí al Paso 1.

6. **Motor de research disponible** — chequealo en este orden, y con la PRIMERA que responda seguís, sin pedir nada más:
   - **(a) Skills locales (forma del paquete público, la default):** ¿existen `escanear-marca` y `diversificacion-creativa` como skills invocables (`/escanear-marca`, `/diversificacion-creativa`)? Si sí → **usá esa forma** en los Pasos 3 y 4. **NO pidas el MCP ni token de Felipe**, no hacen falta.
   - **(b) MCP de Felipe:** ¿están las tools `mcp__felipe-mcp__run_playbook` + `list_skills`? Si sí → usá la Forma TOOL.
   - **Si NINGUNA está:** no abortes de una. Decile al estudiante que le falta el motor de research y ofrecé las dos salidas: **(1)** instalar las 2 skills del paquete (copiar las carpetas `escanear-marca/` y `diversificacion-creativa/` a `~/.claude/skills/` y reiniciar Claude Code) — es la más simple; o **(2)** conectar el MCP de Felipe con su token (`fv_...`) si es alumno del curso. Recién si no puede ninguna de las dos, parás: sin research no hay matriz.

---

## Paso 1 — Inputs
- **¿Tiene web?** Define el modo (ver abajo):
  - **CON web** → MODO WEB (default): seguí Pasos 3-8 tal cual (escanear-marca + scrapes).
  - **SIN web** (estudiante WhatsApp/IG — el caso común de los estudiantes de Felipe) → **MODO INTAKE**: ver recuadro abajo.
- **Brand URL** (modo web): de `$ARGUMENTS` o preguntar.
- Una `AskUserQuestion` con: **nombre/slug** del estudiante, **país**, **CTA destination** (WhatsApp por defecto para estudiantes).
- Calcular `student_folder = <WORK_DIR>/<slug>`.

> ### MODO INTAKE (estudiante SIN web — leer `reference/intake-template.md`)
> El estudiante no tiene sitio que scrapear; llegó vía el formulario del sorteo (texto) + mandó 3-6 fotos. Cambios al flujo:
> - **Paso 3 (escanear-marca): SE OMITE.** En su lugar, armá `marca-cliente.json` desde el intake siguiendo `reference/intake-template.md` (mapear campos + inferir deseos Reiss/avatar; CTA = su WhatsApp).
> - **Paso 4 (diversificacion-creativa): CORRE IGUAL** — lee el `marca-cliente.json` que armaste (no necesita web). 30 hooks normales.
> - **Paso 6 (detección de color): SE OMITE el `--url`.** La paleta sale de SUS fotos por visión (Paso 9), no de CSS. Escribís la paleta observada directo en el alpha-prompt (Paso 10b).
> - **Paso 7 (scrape producto): SE OMITE.** Las fotos las puso el ganador en `<student_folder>/input/product-photos/`.
> - **Paso 8 (logo): foto de perfil de IG** si la mandó; si no, wordmark-only.
> - **Pasos 9-15: IDÉNTICOS** (gate de visión, autorizar 30 celdas, validar, render, Excel).

## Paso 2 — Estructura del folder
```bash
mkdir -p "<student_folder>/brand" "<student_folder>/input/product-photos" "<student_folder>/static-ads"
```

## Paso 2.5 — Contexto de marca: construir 1 vez, REUSAR después (cache)

El **contexto de marca** es la parte cara y estable: se construye UNA sola vez y se **reutiliza** en todas las corridas siguientes (no re-escanear, no re-sintetizar). Consiste en:
- `marca-cliente.json` (ADN + `avatar` con **3 deseos Reiss + 2 perfiles** + `tipo_oferta` + `AD_LANG`/`AD_COUNTRY`)
- `brand/alpha-research.md` (paquete condensado de la Alpha Library, Paso 10a) · `brand/alpha-prompt.txt` · `brand/product-dna.txt` · `brand/detected-colors.json`
- `brand/logo.png` (ya pasado por el gate de visión, Paso 8-9) · `input/product-photos/`

**Chequeo (hacelo acá):** ¿ya existen y están completos esos archivos en `<student_folder>`?
- **SÍ → REUSAR:** saltá los **Pasos 3, 6, 6b, 7, 8, 9, 10a y 10b** (escaneo/color/idioma/producto/logo/verificación-de-refs/investigación-de-biblioteca/síntesis del alpha). Andá directo al **Paso 4** (generar hooks frescos — reusa los deseos/perfiles ya cacheados en `marca-cliente.json`) → **Paso 11** (autoría de conceptos, en paralelo) → 12-15. Confirmá en 1 línea: *"Reuso el contexto de marca guardado de [marca]. ¿Genero una tanda nueva de conceptos, o querés re-escanear la marca?"*
- **NO → CONSTRUIR:** corré los Pasos 3-10b normalmente; sus salidas **quedan guardadas** como el contexto reusable.
- **Re-escanear (forzar refresco):** si la marca cambió (nuevo logo/paleta/producto/precio), reconstruí el contexto (Pasos 3-10b) aunque exista.

> 💡 La investigación (escaneo/hooks) **NO gasta créditos de Kie** — esos se van SOLO en los 30 renders. El cache ahorra **tiempo + llamadas al MCP** y, sobre todo, evita **re-renderizar lo que ya generaste**. Regla de v2: el contexto de marca se construye una vez; cada corrida solo regenera **hooks + conceptos + render**.

## Paso 3 — `escanear-marca`
Invocá la capacidad **escanear-marca** en la forma que tu entorno exponga (usá la primera disponible):
- **Forma SKILL (default del paquete público):** invocá la skill `escanear-marca` (`/escanear-marca`) directamente.
- **Forma TOOL (MCP de Felipe):** `mcp__felipe-mcp__run_playbook` con `skillId: escanear-marca`.

`goal`: el `marca-cliente.json` completo (identidad_visual con hex, tono_y_voz, avatar con 3 deseos Reiss + 2 perfiles, nivel_consciencia, propuesta_valor, producto_principal, precio, redes). Dejar `marca-cliente.json` en `<student_folder>/`.

> **Nota de compatibilidad:** si la capacidad llega por el MCP y el playbook nombra herramientas como `mcp__plugin_felipe-vergara-plugin_playwright__*`, mapealas a `mcp__playwright__*`. La skill local del paquete público ya viene con los nombres genéricos — no hay nada que mapear.

> **SIN NAVEGADOR (si Playwright / Chrome MCP no conecta):** no hay nada que hacer acá — `escanear-marca` degrada sola (su **PASO 0** es la única fuente de verdad de esas reglas; no las repitas ni las reinterpretes). Lo tuyo, como orquestador, es solo esto:
> 1. Leé `modo_escaneo` en `marca-cliente.json`. Si es `reducido_sin_navegador`, su `identidad_visual` trae el `metodo` con que se obtuvieron los colores (`css_verificado_con_imagenes`, `css_declarado_sin_verificar`, o `null` si el extractor falló). En cualquier caso tu **Paso 6** corre igual y manda: es el que decide la paleta de los anuncios, y trae su propia compuerta de color. Ojo con la Ley 7 — el CSS del sitio NO es la estética del anuncio; el Paso 10a existe justo para corregir eso.
> 2. Anotá el modo reducido en el HANDOFF, y avisale al usuario que con Playwright instalado el escaneo sale más fiel (colores renderizados + bios de IG/TikTok).
> 3. **Cache (ver Paso 2.5):** un contexto de marca construido en modo reducido **NO cuenta como completo**. Aunque los archivos existan, ofrecé re-escanear si `modo_escaneo` es `reducido_*` — si no, la primera corrida sin Playwright queda cacheada para siempre.

## Paso 4 — `diversificacion-creativa`
Invocá la capacidad **diversificacion-creativa** en la forma que tu entorno exponga (usá la primera disponible):
- **Forma SKILL (default del paquete público):** invocá la skill `diversificacion-creativa` (`/diversificacion-creativa`) directamente.
- **Forma TOOL (MCP de Felipe):** `mcp__felipe-mcp__run_playbook` con `skillId: diversificacion-creativa`.

Genera los 30 hooks (3 deseos × 2 perfiles × 5 niveles). Guardá la salida en `<student_folder>/diversificacion-hooks.html` (o `.md` si la skill devuelve markdown — lo importante es conservar los 30 hooks con sus deseos/perfiles/niveles para el Paso 5).

> **Fallback (último recurso, solo si NINGUNA de las dos formas está disponible — ni skill local ni MCP):** generar los 30 hooks directamente desde `marca-cliente.json`. AVISAR explícitamente que se usó el fallback (no es la matriz real de Felipe). No es lo ideal — preferí siempre la forma tool o skill.

## Paso 5 — Parsear los 30 hooks (TODOS — no se selecciona)
Leer el HTML. Extraer la tabla: 3 deseos, 2 perfiles (con su descripción demográfica/edad), y por cada combinación los 5 niveles con su hook + ángulo. **Se usan los 30** (esto reemplaza la vieja lógica de elegir 1-2 hooks). Anotar los nombres exactos de los 3 deseos y los 2 perfiles (con sus bandas de edad) — se necesitan para autorizar las celdas.

**Escribir también la `evidencia` de cada perfil** (mismo criterio que ya se usa para `avatar.deseos_reiss[].evidencia`: una cita o hecho real de la marca/sitio que explique por qué ese perfil existe — no una descripción demográfica genérica). Ejemplo real: para un perfil "Revendedor/mayorista" la evidencia es que el sitio tiene una sección propia "Acceso a mayorista", NO "22-35 años, le interesa el margen" (eso es descripción, no evidencia). Guardar en `marca-cliente.json` como:
```json
"avatar": { "perfiles": [ { "label": "A — ...", "edad": "18-24", "evidencia": "..." }, { "label": "B — ...", "edad": "22-35", "evidencia": "..." } ] }
```
Si el sitio no da una señal real distinta para cada perfil (pasa en marcas muy simples con 1 sola audiencia obvia), dejar `evidencia` en `null` antes que inventarla — la Ley 11 aplica también a esto: prueba fabricada de por qué existe un perfil es tan grave como una cifra de seguidores inventada.

## Paso 6 — Detectar identidad visual (paleta + fuentes)
```bash
node "<SKILL_DIR>/scripts/extract-brand-identity.js" \
  --url "<brand_url>" \
  --out-dir "<student_folder>/brand" \
  --product-dir "<student_folder>/input/product-photos"
```
Escribe `brand/detected-colors.json` (hasta 8 hex rankeados con confianza + fuentes, **+ `adLanguageGuess`**). Esta paleta alimenta el alpha-prompt (Paso 10b) — es más precisa que el hex único de Felipe. Si Puppeteer no está, usa solo CSS/HTML (suficiente para Shopify/la mayoría).

> **COMPUERTA DE COLOR — esos hex están DECLARADOS, no vistos.** El script baja imágenes de la marca a `brand/color-evidence/` y deja cada color con `visualCheck: "PENDING"`. **Abrilas con `Read`, y por cada hex poné `VISIBLE` o `NOT_VISIBLE` según lo que realmente ves** — un color de la paleta por defecto de un tema sale con `HIGH` igual que el real. Caso real: un sitio declaraba magenta `#fb5184` y coral `#e0002a` con `HIGH`, y al mirar logo y fotos ninguno existía; los dos estaban en el `NEVER` de esa marca.
>
> **Reescribí `detected-colors.json` con el veredicto** y poné `brandImages.colorsVerified: true`. No es opcional: los Pasos 10b y 11 le pasan **este archivo tal como está en disco** al alpha y a los 6 subagentes, que nunca vieron tu descarte. Y `validate-payload.py` **falla la corrida** si un hex `NOT_VISIBLE` termina en `brand/alpha-prompt.txt`.
>
> Si `brandImages.count` es `0`, todos quedan `UNVERIFIED`: seguí, pero tratá la paleta como no confirmada y apoyate más en el Paso 10a. Esto NO reemplaza al 10a (que define la estética real mirando packaging e IG) — lo alimenta con hex que al menos existen. Ver Ley 7.
>
> ⛔ `brand/color-evidence/` es **evidencia de color**: NUNCA se cita como `Reference` de una celda ni cuenta como foto de producto verificada del Paso 9.

**Escribir de vuelta en `marca-cliente.json.identidad_visual` SOLO los hex `VISIBLE`** (`color_primario`, `fondo`, `tipografia_heading`, etc.) — no dejarlos en `null` si hay datos reales, pero tampoco meter ahí un color que la compuerta descartó. Es el archivo canónico que otras skills de Felipe (7-maletas, niveles-de-consciencia) leen después: un hex sin verificar que entre acá queda blanqueado como dato de marca para siempre.

## Paso 6b — Confirmar el idioma del ad (`AD_LANG`)
Leer `brand/detected-colors.json.adLanguageGuess` (lo detecta del `<html lang>` + TLD + moneda). Preguntar con `AskUserQuestion` para confirmar:
- Pregunta: "¿En qué idioma van los textos DENTRO del anuncio? (depende del MERCADO de la marca, no del estudiante)". Header "Idioma del ad".
- Opciones: el guess primero (ej. "Inglés (detecté marca US)" si guess=English), la otra opción, + Other.
- Guardar la respuesta como `AD_LANG` (English / Spanish / etc.). Se usa en el Paso 11. **Ojo:** un `.com` puede ser LATAM y un sitio en inglés puede vender a LATAM — por eso se confirma, no se asume.
- **Confirmar también `AD_COUNTRY` EXPLÍCITAMENTE** (no solo inferirlo del TLD `.com.au`/etc.) — preguntá el país del mercado objetivo. El idioma NO basta: el texto se localiza al dialecto del país (ver Paso 11). Colombia ≠ Argentina aunque ambos sean "Spanish". Aun en inglés confirmá el país (US/UK/AU) por si hay matices de mercado.

## Paso 7 — Scrape fotos de producto
```bash
node "<SKILL_DIR>/scripts/extract-product-images.js" \
  --url "<product_url>" --out-dir "<student_folder>/input/product-photos" --limit 3
```
Verificar `success: true`, `count >= 2`. Si falla, reintentar con la home; si sigue, pedir fotos manuales.

> **✅ SI LA TIENDA ES SHOPIFY, el script usa `/products.json` y este paso se vuelve confiable.** Lo detecta solo. Cuando lo hace:
> - Escribe **`input/product-photos/_catalog.json`** con los **250 productos** de la tienda: título, handle, precio e imágenes **agrupadas por producto**. Es tu herramienta de descubrimiento: te deja elegir productos REALES por nombre y precio en vez de adivinar del HTML.
> - Si le pasaste una **URL de producto** (`/products/<handle>`), baja **solo las imágenes de ESE producto**, en el **orden de la tienda** — así `product-01` es la imagen principal, que casi siempre es la vista completa de la prenda. Sin mezcla de productos y sin ranking por peso. Verificado: en `julianasanchez.co` devuelve la vista completa de frente como `product-01`, que es exactamente lo que faltaba cuando ocurrió la Ley 19.
> - Si le pasaste la **home o una colección**, te avisa y te manda a abrir `_catalog.json` para elegir los productos y volver a correrlo **una vez por producto**, cada uno a su subcarpeta (`input/product-photos/<slug>/`).
>
> **Con Shopify, el flujo correcto es: correr una vez contra la home para obtener `_catalog.json` → elegir los productos hero → correr una vez por cada URL de producto.** Sale gratis (no toca la API de imágenes) y elimina de raíz el problema de la Ley 19.
>
> **⚠️ SI NO ES SHOPIFY, cae al scrape de HTML, y ahí el pool puede traer varios productos y el ranking es por tamaño de archivo.** Dos cosas que hay que saber antes de confiar en las 3 fotos que quedaron:
> 1. **El orden lo decide el peso del archivo, no la utilidad.** Un macro de tela con textura comprime mal → pesa más → gana. Los planos completos de la prenda pierden el ranking sistemáticamente.
> 2. **La defensa anti-cross-sell puede estar muerta.** El script solo puede separar productos si el *slug* del producto aparece en el nombre del archivo de imagen. Muchas tiendas Shopify sirven archivos tipo `DSC9089.jpg` o `Marca_5879.jpg`, **sin slug** — ahí la defensa no filtra nada y apuntar a una página de producto devuelve el MISMO pool mezclado que apuntar a la home (verificado en Juliana Sanchez: dos variantes distintas devolvieron 7 archivos byte por byte idénticos).
>
> Por eso corré con `--limit 3` pero **abrí siempre `input/product-photos/_candidates/`**: las imágenes que sobran ya NO se borran, quedan ahí para que el Paso 9 las mire. Leé el `coverageWarning` del JSON de salida. Si el pool abarca varios productos, **agrupá las fotos en subcarpetas por producto** (`input/product-photos/<slug>/`) — el Paso 9 y `output-schemas.md` ya asumen esa estructura.
>
> **Lo que hay que garantizar por producto: al menos UNA vista completa** (la prenda entera, puesta o tendida) antes de que alguna celda la muestre como objeto. Un producto que quedó representado solo por un recorte **no puede aparecer entero en ninguna celda** — el modelo le inventaría la silueta. Ver Ley 19.

**Multi-producto (solo marcas de ropa con catálogo amplio):** si `marca-cliente.json.producto_principal` lista VARIOS productos (no uno solo), scrapeá además 2-4 productos reales hero-elegibles a `input/product-photos/sec-<slug>.jpg` (gorra, pantalón, bolso, tee — distintos tipos para distintas zonas del cuerpo). Estos habilitan el campo `Secondary:` en el Paso 11. **Si la marca tiene un solo producto → NO scrapear secundarios** (hero solo).

## Paso 8 — Scrape logo (candidatos rankeados + gate de visión)
```bash
node "<SKILL_DIR>/scripts/extract-logo.js" \
  --url "<brand_url>" --out-file "<student_folder>/brand/logo.png"
```
`extract-logo.js` (v2) casta una red AMPLIA (lee `data-src`/`srcset` de lazy-load, decodifica SVG inline `data:`, mira todas las `<img>` + header + og:image), **puntúa "logo-likeness"** (penaliza banderas de país/idioma, favicons, íconos de pago) y guarda los candidatos rankeados en `brand/logo-candidates/cand-NN.png` + su mejor apuesta en `brand/logo.png`.

> **⚠️ GATE DE VISIÓN OBLIGATORIO (el script NO ve píxeles).** El nombre y el score NO bastan — una bandera de país puede colarse (caso real CIE: `extract-logo` viejo bajó `german.png` con `"success":true`). **Mirá `brand/logo-candidates/` con `Read`** y elegí con tus ojos cuál `cand-NN.png` es el logo REAL de la marca:
> - Si el `cand-01` (mejor apuesta, ya copiado a `logo.png`) es el correcto → listo.
> - Si el correcto es otro candidato → copialo sobre `brand/logo.png`.
> - Si NINGUNO es el logo real → borrá `brand/logo.png` (mejor SIN logo que un logo falso en las 30). Para servicio sin logo válido: no hay ancla i2i → considerar t2i o pedir el logo manual.
>
> Un logo equivocado se reproduce idéntico en las 30 imágenes — este gate es lo que evita el desastre.

## Paso 9 — Verificación multimodal de refs (GATE OBLIGATORIO — anti-ref-equivocada)
El scraper entrega las fotos con nombres **NEUTROS** (`product-01.jpg`, `product-02.jpg`…) a propósito: el tamaño del archivo NO dice qué muestra la foto (un frente, un dorso, un detalle de textura…). Eso solo se sabe **mirándola**. Y a veces el scraper trae la imagen **equivocada** (ej. la página de "Alien Box" devolvió un brownie; un "logo" que era la bandera de un país). Una ref equivocada hace que el modelo INVENTE en el render = violación de marca. Por eso, **antes de usar cualquier foto como Reference —incluido el LOGO—, verificá con visión qué es y dejá constancia escrita.**

Loop de verificación por cada foto (producto y logo). Ninguna foto depende de otra — **mandá varias llamadas a `Read` en el mismo mensaje** (igual que el Paso 11 con los subagentes) en vez de una por una:
1. Leé la foto con `Read`. ¿Qué ES realmente? Anotá material, colores reales, detalles (alimenta alpha + product-dna).
2. ¿Coincide con el producto que esa celda va a anunciar (por slug/URL/nombre)?
   - **SÍ** → **renombrala por lo que ES** (`anillo-frente.jpg`, `hoodie-espalda.jpg`, `tela-macro.jpg`…). **NUNCA la dejes como `product-NN`** (el validador lo rechaza).
   - **NO** (otro producto, cross-sell, gráfico, ambiguo) → NO la uses. En orden: (a) re-scrapear esa URL con `--limit` mayor y elegir la que coincide; (b) scrapear la URL de producto correcta; (c) si no hay foto correcta, **NO featurees ese producto** — usá un hero YA verificado o dejá la celda sin ese producto.
3. **Escribí el acta `ref-manifest.json`** en CADA carpeta donde vivan fotos verificadas (`input/product-photos/<grupo>/` y `brand/` para el logo). Es un diccionario `{ "archivo": "qué es, verificado con visión" }`:
   ```json
   {
     "anillo-frente.jpg": "Anillo antiestrés en plata, banda giratoria grabada, vista frontal. Verificado.",
     "tela-macro.jpg": "Close-up de la textura del grabado del anillo. Verificado.",
     "logo.png": "Wordmark 'Jumak' negro sobre transparente. Verificado contra el sitio."
   }
   ```
   Marca de **SERVICIO** (sin fotos de producto): dejá una nota con clave que empiece por `_`, ej. `{ "_no_product_photos": "Marca de servicio B2B, sin producto físico; ancla = logo + lifestyle." }`.

4. **Declarar la COBERTURA por producto en el mismo acta (clave `_coverage`) — GATE DE CÓDIGO.** El acta dice qué muestra cada foto, pero eso no alcanza: hay que decir explícitamente si de cada producto existe una **vista completa** (la prenda entera, puesta o tendida, con su silueta visible). Si no existe, ninguna celda puede mostrar ese producto como objeto entero.
   ```json
   {
     "_coverage": {
       "sobrecamisa-oliva": {
         "vista_completa": null,
         "fotos": ["prenda-oliva-print-bordado-macro.jpg"],
         "nota": "SOLO existe un macro del panel frontal. No hay ninguna foto de la silueta: no se sabe si es camisa, chaqueta o buzo. Solo composiciones de recorte."
       },
       "top-malla-carbon": {
         "vista_completa": "top-malla-carbon-lookbook-cuerpo-completo.jpg",
         "fotos": ["top-malla-carbon-lookbook-cuerpo-completo.jpg", "top-malla-carbon-closeup-estudio.jpg"]
       }
     },
     "prenda-oliva-print-bordado-macro.jpg": "…descripción verificada…"
   }
   ```
   `validate-payload.py` **FALLA (exit 1)** si una celda con composición de objeto entero cita un producto cuya `vista_completa` es `null`, y **avisa (WARN)** si el acta no declara `_coverage`. La clasificación vive en **`scripts/compositions.py`** (declaración única de las 14, con sus alias de grafía), no escrita a mano en el validador:
> - **Objeto entero (10):** Overhead flat lay · Eye-level lifestyle · Environmental wide · Hand-held POV · Dramatic product hero · Documentary/candid · Proof/evidence · UGC / phone-selfie · Unboxing · Feature callout
> - **Recorte, exentas (4):** Close-up detail · Split contrast · Typography-forward · Texture macro — ahí la silueta nunca entra en cuadro.
>
> Además `composition` ahora tiene que **resolver a una de las 14**: una composición inventada o mal escrita **FALLA**. Antes pasaba, y apagaba este gate en silencio para esa celda.

   **Redacción CONTRASTIVA cuando hay ≥2 fotos del mismo producto en estados distintos** (individual vs kit/set, abierto vs cerrado, uno vs par, con vs sin accesorio — lo que sea que observes, sin nombrar categorías fijas): no describas cada foto de forma aislada, decí explícitamente qué le falta respecto a la(s) otra(s). Ej. en vez de solo `"Micrófono individual sostenido con la mano. Verificado."`, escribí `"Micrófono individual sostenido con la mano — NO incluye el case ni el segundo transmisor que sí aparecen en mic-kit-completo-ugc.png. Verificado."`. Esto le da al Paso 11 y al validador la señal que necesitan para no describir en una celda piezas que su foto citada no muestra (ver Ley 13).

> **Por qué es obligatorio (conecta con el validador):** `validate-payload.py` NO ve píxeles, pero SÍ exige el acta. Si una celda referencia una foto que sigue como `product-NN` o que **no está en el `ref-manifest.json`**, la compuerta **FALLA antes de gastar Kie**. El acta es tu constancia de que miraste cada foto. Además, una celda close-up/macro debe apuntar a una foto que el acta describa como close-up/textura (si no, WARN).

**Regla:** una celda con producto solo puede referenciar una foto **VERIFICADA** (renombrada + anotada en el acta). Si dudás, hero-solo > producto inventado. Esta verificación es trabajo del LLM — es la única defensa contra refs mal etiquetadas.

## Paso 10a — Investigar la Alpha Library (MANDATORIO, subagente)
**No lo hagas vos mismo inline.** El orquestador no lee la Alpha Library directamente — la delega a **exactamente 1 subagente** (herramienta Task/Agent, mismo mecanismo que el Paso 11), así el contexto principal no carga la biblioteca completa mientras sigue trackeando el resto de la corrida. **No es salteable**: el Paso 10b no puede arrancar sin `brand/alpha-research.md` escrito.

El subagente arranca de cero (no ve esta conversación) — pasale rutas reales, no un resumen tuyo. Prompt del subagente (reemplazá `<SKILL_DIR>`/`<student_folder>` por las rutas resueltas reales, igual que en cualquier invocación de script de este skill):
> "Estás investigando referencias visuales para el Alpha Prompt de una marca. Leé `<student_folder>/marca-cliente.json` (`tipo_oferta`, `producto_principal`, avatar), `<student_folder>/brand/detected-colors.json`, y los `ref-manifest.json` escritos en el Paso 9 (`<student_folder>/input/product-photos/.../ref-manifest.json` y `<student_folder>/brand/ref-manifest.json` para el logo — qué ES cada foto verificada) para entender la categoría/product DNA/estética real de la marca (packaging/IG, NO el sitio — un fondo cream de sitio no define la estética del ad si el packaging es vibrante). Con eso, leé `<SKILL_DIR>/reference/alpha-library/INDEX.md` y seguí al pie su algoritmo de lookup ahí descrito. Devolveme un paquete condensado (NO copies archivos completos): Role base, Restricciones clave, Referencias nombradas, vocabulario técnico aplicable, y una Firma Técnica sugerida (luz + lente/cámara + representación de materiales, 3 líneas)."

Escribí el resultado del subagente en **`<student_folder>/brand/alpha-research.md`** (nuevo artefacto — queda cacheado igual que el resto del contexto de marca, ver Paso 2.5). Antes de seguir al Paso 10b, confirmá vos mismo que el archivo existe y no es un stub trivial (tiene los 5 elementos pedidos). **Desde 2026-07-27 esto además tiene gate de código:** `scripts/validate-payload.py` falla (exit 1) si `brand/alpha-research.md` no existe o le falta alguno de los 5 elementos — mismo mecanismo que el candado de `ref-manifest.json` del Paso 9. Se agregó tras detectar en vivo que su ausencia hace que el Paso 10b caiga en la paleta cruda del sitio web (ver Ley 14 más abajo).

## Paso 10b — Sintetizar el Alpha Prompt (orquestador, inline)
Leer como contexto: `brand/alpha-research.md` (el paquete condensado del Paso 10a — NO releas la Alpha Library completa acá, para eso ya delegaste), `reference/alpha-prompt-framework.md`, `reference/few-shot-examples.md`, `reference/output-schemas.md`, `<student_folder>/marca-cliente.json`, **`<student_folder>/brand/detected-colors.json`** (usar ESTA paleta para los hex), y las fotos.

Escribir (en inglés):
- `brand/alpha-prompt.txt` — 5 capas, ~1800-3500 chars (se pasa COMPLETO, sin compactar), paleta de `detected-colors.json`, sección NEVER (5-8 exclusiones), ≥1 referencia nombrada (de `alpha-research.md`). (Verificación auto: 3 pilares, NEVER, hex específicos, inglés. Max 2 reintentos.)
  > **OBLIGATORIO — el alpha lleva dirección de MAQUETACIÓN, no solo de fotografía.** Además de ROLE/PALETTE/LIGHT/CAMERA, tiene que traer **`TYPOGRAPHY:`** y **`CTA STYLE:`** como secciones propias, con el encabezado al inicio de línea (así las reconoce `kie-api-helpers.sh` para quitarlas en modo video). El alpha es la Capa 1 y es idéntico en las 30 celdas: es el ÚNICO lugar que le recuerda al modelo, en TODA celda, que esto es un anuncio con titular y CTA. Si solo describís la foto, el texto del anuncio queda mencionado una sola vez al final de cada `Concept (EN)` y el modelo lo descarta — primero en las composiciones sin espacio negativo (texture macro, close-up). **`TYPOGRAPHY` además fija la ortografía del `AD_LANG`**: para español, acentos y **ambos signos invertidos (`¿` `¡`) explícitos**. `validate-payload.py` falla (exit 1) si falta cualquiera de las dos (ver Ley 16).
- `brand/product-dna.txt` — 100-150 palabras, vocabulario técnico de las fotos.
- `brand/voice-dna.txt` — VOICE (3 adj) + NEVER USE + ALWAYS USE + ejemplos.
- `product-description.md` — 1-2 párrafos en español (referencia humana).

> **Web bg ≠ Ad aesthetic:** el fondo del website (cream/pastel) es para browsing, no para el ad. Si el packaging/IG es vibrante (hot pink, neón), el alpha-prompt del ad debe ser igual de vibrante. Mirá el packaging y la IG, no la homepage.

## Paso 11 — Autorizar las 30 celdas (`conceptos-30.md`) — el corazón creativo
Leer `reference/ideation-image-prompt.md` y seguirlo al pie. Escribir `<student_folder>/conceptos-30.md` con **exactamente 30 celdas** en el formato canónico de esa referencia.

### Autoría EN PARALELO (4-6 subagentes) — NO lo hagas con un solo pase
Un solo agente escribiendo las 30 celdas pierde calidad hacia el final (se vuelve repetitivo/genérico). Repartilo:
1. **Dividí las 30 en bloques** — recomendado **6 bloques por deseo × perfil** (5 celdas = un funnel Inconsciente→Decisión cada uno), o 4-5 bloques si preferís. Lanzá los subagentes **en paralelo** (herramienta Task/Agent, todos en un mismo mensaje).
2. **A cada subagente pasale el contexto compartido idéntico** (para que las 30 salgan coherentes): `brand/alpha-prompt.txt`, `brand/detected-colors.json`, `marca-cliente.json` (deseos/perfiles/`tipo_oferta`/`AD_LANG`/`AD_COUNTRY`), `reference/ideation-image-prompt.md`, **los `ref-manifest.json` de `input/product-photos/.../` y de `brand/`** (las actas del Paso 9 — qué muestra REALMENTE cada foto verificada, necesario para no describir en el `Concept (EN)` piezas que la foto citada no tiene, ver Ley 13), **+ SUS celdas asignadas** (deseo × perfil × nivel). **El manifest te dice QUÉ foto existe y a grandes rasgos qué muestra — NO sustituye mirarla.** Antes de fijar en el `Concept (EN)` cualquier detalle visual específico de un objeto (abierto/cerrado, color, orientación, cantidad, texto visible en el objeto), el subagente tiene que `Read` la foto real citada en esa celda y describir solo lo que efectivamente ve — nunca un estado plausible que no confirmó con los ojos (ver Ley 13, caso del case "cerrado" que no existe en ninguna foto real). Que devuelva SOLO esas celdas en el formato canónico. **Todas las "Reglas compartidas" de abajo van en el prompt de cada subagente.**
3. **Pase de MERGE + consistencia global (lo hacés VOS, no los subagentes):** juntá los bloques en `conceptos-30.md` y verificá **a través de las 30** (los subagentes no ven los bloques de los demás): numeración 1-30 + matriz completa (cada deseo×perfil×nivel exactamente una vez); **casting variado entre bloques** (ningún individuo/descripción repetida); **≥8 composiciones distintas + ≥2 macro + ≥2 UGC**; sin colisiones de escenario. **Coherencia texto↔foto (ver Ley 13):** por cada celda con `Reference:` que describa un estado/detalle específico de un objeto, releé el `ref-manifest.json` Y volvé a mirar la foto real con `Read` (no te alcanza con el texto del manifest — mismo gate de visión que el Paso 9) para confirmar que el `Concept (EN)` no afirme nada que esa foto no muestre; si el manifest describe 2+ fotos del mismo producto con contenido distinto, cruzalas. Corregí a mano lo que choque antes del Paso 12.

**Reglas compartidas (van en CADA subagente + las valida el script después):**
- 1 celda por combinación deseo × perfil × nivel. Hook tomado de `diversificacion-hooks.html` (NUNCA inventado).
- **Todo el texto-en-imagen (headline, CTA, hook visible) va en `AD_LANG`** (Paso 6b), NO siempre español. Si la marca es US, el ad va en inglés; el bloque de texto dentro de `Concept (EN)` debe escribirse en `AD_LANG`. Si los hooks de Felipe vienen en español y `AD_LANG`=inglés, traducirlos al inglés conservando el ángulo.
- **LOCALIZAR al dialecto de `AD_COUNTRY`** (ver reference). Los hooks de Felipe suelen venir en **voseo rioplatense** ("pedís", "sumá", "empezá") — si `AD_COUNTRY` NO es Argentina/Uruguay (ej. Colombia), convertirlos a tú/usted ("pide", "suma", "empieza"). El validador marca voseo como WARN.
- **Diversidad de ESCENARIO en celdas con producto** (ver reference). No todas las celdas con producto pueden ser "producto solo en estudio" — ≥1/3 deben mostrar el producto USADO/en contexto, rotando fondos, luz y ángulo. Es lo que evita que los ads con producto se sientan iguales.
- **Fidelidad de completitud del producto (ver reference, ver Ley 13):** el `Concept (EN)` de una celda con producto SOLO puede describir lo que el `ref-manifest.json` confirma visible en la(s) foto(s) citada(s) en `Reference:` de esa misma celda. Si el manifest revela que existen ≥2 estados de completitud distintos del mismo producto (individual vs kit/set/bundle, abierto vs cerrado, uno vs par — lo que sea que el manifest de ESTA marca describa, nunca una categoría fija), repartí las celdas a propósito entre esos estados en vez de mandar siempre la versión más completa. Nunca describas una pieza/componente que la foto citada no muestra. **El texto del manifest no reemplaza mirar:** antes de escribir un detalle de ESTADO puntual (abierto/cerrado, color, orientación, cantidad), `Read` la foto real citada esa vez — no alcanza con recordar que "hay una foto de esta pieza en algún estado".
- **Paleta de 14 composiciones** (ver reference) — usá el mayor número posible (mín 8 distintas), e **incluí al menos 2 Texture macro** (extreme close-up de la textura del producto: grano, desmorone, brillo, tejido) **y al menos 2 UGC/phone-selfie** (una persona real con el celular probando el producto/servicio, estética auténtica de teléfono). El validador lo recuerda con WARN.
- **Hook Tactic (8, ver reference "Táctica de Hook")** — eje separado de la composición: define el ÁNGULO RETÓRICO con el que se redacta el `Headline`/`Hook` de cada celda (curiosidad, anclaje de precio, urgencia, autoridad...), sin inventar ningún dato — sigue siendo el hook real de Felipe MCP, solo cambia el ángulo. Usá ≥5 de las 8, sin repetir dentro de un mismo deseo. Campo nuevo `**Hook Tactic:**` en cada celda. El validador lo recuerda con WARN.
- **Multi-producto (solo marcas de ropa multi-producto):** en ALGUNAS celdas con producto, agregá el campo `Secondary:` con hasta 2 productos secundarios REALES (los `sec-*.jpg` scrapeados en Paso 7), cada uno en una zona distinta (head/torso/legs/hands/neck/feet). Formato: `ruta @ zona; ruta2 @ zona2`. **GATING: si la marca tiene UN SOLO producto → NUNCA uses `Secondary` (hero solo).** Solo productos reales referenciados; nunca el print del hero sobre el secundario (ver reference "Multi-producto" + "Integridad de marca").
- **Visibilidad por nivel:** Inconsciente/Problema → `Has Product: no`, sin `Reference`. Solución/Producto/Decisión → `Has Product: sí` + `Reference:` a fotos reales de `input/product-photos/`.
  - **EXCEPCIÓN — marca de servicio/info/SaaS/alto-ticket** (agencia B2B, consultoría, curso, software…): pon `tipo_oferta` ∈ {`servicio`,`service`,`info`,`infoproducto`,`saas`,`alto ticket`} en `marca-cliente.json`. Entonces NO hay producto físico que fotografiar → **`Has Product: no` en las 30**, sin `Reference`; el ancla visual es el LOGO + imagery de marca/lifestyle/pantallas (números REALES o "sin números legibles", nunca inventar cifras). `validate-payload.py` detecta `tipo_oferta` y EXIME a estas marcas del gate "niveles 3-5 requieren producto". Sin esto, forzarías `Reference` a fotos que no existen y quemarías la compuerta en falso.
- **Casting variado:** perfil = tipo demográfico, no cara fija. Cada celda con persona describe un individuo DISTINTO en la banda del perfil; nunca repetir la misma descripción dentro de un deseo **ni reutilizar un mismo "personaje" a través de los 5 niveles del funnel — cada celda es una persona NUEVA, no hay continuidad narrativa Inconsciente→Decisión** (ver reference).
- **Composición:** asignar de la paleta de 14; usar el mayor número, ninguna >5, ≥6 distintas por deseo.
- **Hook Tactic:** asignar de las 8 (ver reference); ≥5 distintas en las 30, sin repetir dentro de un mismo deseo.
- **Texto-en-imagen en `AD_LANG`**, MENOS ES MÁS, ≥28/30 con texto.
- `Concept (EN)` = escena en inglés + bloque de texto en `AD_LANG`, ≤~1500 chars. NO incluir el alpha-prompt (se antepone solo).

## Paso 12 — Parsear → construir jobs → VALIDAR (compuerta + auto-reparación)
```bash
# 12.1 conceptos-30.md → matrix-data.json (single source of truth)
node "<SKILL_DIR>/scripts/parse-concepts.js" "<student_folder>"

# 12.2 matrix-data.json → jobs.json (+ photo-refs.json), prompts de 5 capas vía kie_build_layered_prompt
python "<SKILL_DIR>/scripts/build-jobs.py" "<student_folder>"

# 12.3 Compuerta de integridad — SIN gasto en API
python "<SKILL_DIR>/scripts/validate-payload.py" "<student_folder>"
```
> Nota portable: `build-jobs.py` y `validate-payload.py` ahora reciben el **`student_folder` directo** (ruta absoluta o relativa al CWD), no `students/<slug>`.

**Loop de auto-reparación (máx 3 pasadas):** si `validate-payload.py` sale con FAIL, leer los `[FAIL] AD NN: razón`, **corregir esas celdas en `conceptos-30.md`**, re-correr 12.1 → 12.2 → 12.3. Repetir hasta exit 0 o 3 intentos. Si tras 3 intentos sigue fallando, mostrar los fallos y preguntar. **No renderizar hasta que la compuerta pase.**

> ⚠️ **Al editar una celda puntual con `Edit`, el `old_string` SIEMPRE debe incluir el encabezado `### AD NN` de esa celda** (no solo la frase a cambiar) — celdas distintas comparten wording similar (misma composición, misma táctica de hook, texto parecido) y un ancla no específica puede matchear y modificar la celda EQUIVOCADA en silencio (caso real: corregir AD 09 terminó editando AD 08, que ya había renderizado bien). Después de cada `Edit` sobre `conceptos-30.md`, **re-leé el archivo antes de re-correr 12.1** para confirmar que cambió lo que querías y nada más.

## Paso 13 — Render de las 30 imágenes (Kie, paso pagado)
Confirmar el costo — con GPT Image 2 (default) es ~USD 1.50 (30 × USD 0.05, confirmado). Si vas a usar Nano Banana Pro/2, **confirmá el precio vigente en tu dashboard de Kie.ai antes de correr** (no está publicado de forma estable en docs, no asumas el mismo USD 0.05). Verificar balance:
```bash
source "<SKILL_DIR>/lib/kie-api-helpers.sh" && kie_test_auth
curl -sS "https://api.kie.ai/api/v1/chat/credit" -H "Authorization: Bearer $KIE_API_KEY"   # ≥350 cr
```
Luego renderizar (sube refs frescas, envía las 30, descarga) — **desde la carpeta de la marca**:
```bash
cd "<student_folder>"
bash "<SKILL_DIR>/scripts/run-all-ads.sh"
```

**Elegir modelo (`--model`, MANUAL — no hay fallback automático):**
```bash
bash "<SKILL_DIR>/scripts/run-all-ads.sh" --model nano-banana-pro   # o nano-banana-2
```
Default `gpt-image-2`. **Antes de culpar al modelo por varios `Internal Error` seguidos, re-corré `validate-payload.py`** — una cláusula `TEXT` duplicada en el concepto da exactamente ese error y parece una caída (ver Ley 17). Cambiá a `nano-banana-pro`/`nano-banana-2` cuando: GPT Image 2 está caído (la API no responde o falla el submit en varias celdas seguidas), rechaza una celda por moderación de contenido, o querés comparar fidelidad de una celda con producto (Nano Banana Pro tiende a ser más fiel a la foto de referencia que GPT Image 2 — útil si una celda sale con baja fidelidad, no solo como parche de disponibilidad). **Para celdas de composición "Texture macro"/food close-up extremo, considerá Nano Banana Pro proactivamente** (no solo como parche reactivo) — en el A/B completo de Etérea (ver Ley 15) fue notablemente más confiable que GPT Image 2 para ese tipo específico de contenido. Combina con `--only` para reintentar solo las celdas fallidas con otro modelo, sin re-gastar en las que ya salieron bien. **Topes de prompt reales: GPT Image 2 = 5.000 chars, Nano Banana Pro/2 = 3.500** (ver Ley 20 — la doc vieja decía 8.000/20.000 y estaba mal). `run-all-ads.sh` lo chequea antes de enviar y salta la celda con mensaje claro si se pasa. Si vas a renderizar con Nano Banana, **construí el payload para ese modelo**: `python "<SKILL_DIR>/scripts/build-jobs.py" "<student_folder>" --model nano-banana-pro`, así la compuerta valida contra 3.500 y no contra 5.000. Qué modelo renderizó cada imagen queda registrado en `static-ads/render-meta.json`. **`kie-api-helpers.sh` sigue sin tocarse** (ver "Out of scope") — el body de Nano Banana 2 vive definido localmente en `run-all-ads.sh`.
Resultado: `static-ads/ad-01.png .. ad-30.png`.

## Paso 14 — Excel + verificación
```bash
node "<SKILL_DIR>/scripts/generate-matrix.js" "<student_folder>"
```
**QC OBLIGATORIO — mirar LAS 30 con visión, no una muestra.** `run-all-ads.sh` ya corrió `png_ok` (tamaño+luminancia) que atrapa PNGs negros/vacíos/truncados, pero eso NO ve lo semántico. Leé con `Read` **las 30 imágenes** (no 6, no "algunas" — el spot-check del 20% es exactamente cómo se colaron fallas en runs reales) y confirmá, celda por celda:
- [ ] **Logo** legible y NO distorsionado (los modelos de imagen rompen wordmarks chicos seguido)
- [ ] **Texto** legible, sin glifos rotos/duplicados (ojo con apóstrofes/comillas: `'` `"` — ej. `"'TRUST THE PROCESS' ISN'T A REPORT"`). **Buscá `¿` donde no escribiste una pregunta:** un punto medio `·` en un titular en español sale convertido en `¿` (Ley 21)
- [ ] **Props con texto o empaque:** ¿alguna caja, bolsa, sobre o etiqueta salió con el wordmark impreso sin que exista una foto real de ese empaque? Pedir "sin logo" no basta (Ley 21, corolario)
- [ ] **Pantallas** (laptop/teléfono/dashboard) SIN números inventados (equity/P&L/%/precios) — confirmalo CON LOS OJOS, no asumas que salió bien porque lo pediste en el prompt
- [ ] **Sin carteles/nombres/logos de negocios de terceros fabricados** que parezcan reales (ver Ley 11)
- [ ] **Proof/reseñas = dato REAL textual** (ver Ley 11), no praise genérico inventado ni tarjetas de estrellas fabricadas
- [ ] On-brand (paleta/tipografía), niveles 1-2 sin producto / 3-5 con producto fiel, casting variado, texto en `AD_LANG`

Cualquier ad que falle por un defecto técnico puntual (look plástico, iluminación plana, artefactos de IA, logo distorsionado...) → antes de re-renderizar a ciegas, consultar `reference/alpha-library/refinement-cheatsheet.md` para el fix de keyword exacto a inyectar en ESE concepto. Luego re-render individual: `bash "<SKILL_DIR>/scripts/run-all-ads.sh" --only ad-NN --force` (el `--force` es obligatorio: el PNG defectuoso pasa `png_ok` — tamaño/luminancia están bien, el defecto es semántico — así que sin `--force` el script lo saltea creyendo que ya es válido). **NUNCA reportar "las 30 están bien" habiendo mirado menos de 30** — si una salió negra (pasa), asumí que puede haber más. Además: 30 PNGs presentes + `matriz-creativa.xlsx` con las 30 embebidas en la grilla 3×2×5.

**Registrar cada defecto corregido en `qc-findings.json`** (en la raíz de `<student_folder>`, crear si no existe — es la fuente de datos de la clase, `generate-class-deck.js` la lee para la slide "Lo que la IA hizo mal"). Antes de re-renderizar, `run-all-ads.sh --force` ya guarda el PNG defectuoso en `static-ads/_qc-before/ad-NN.png` automáticamente. Después de confirmar que el re-render corrigió el defecto, hacer `append` a un array plano:
```json
[
  { "ad": "ad-09", "defect_type": "prueba_social_fabricada", "note": "cifra de seguidores inventada, no verificada contra el sitio real", "before_img": "static-ads/_qc-before/ad-09.png", "fix_note": "se quitó la cifra del Concept (EN) y se re-renderizó" }
]
```
Si `_qc-before/ad-NN.png` no existe (por ejemplo, el defecto se corrigió antes de que existiera este mecanismo), dejar `"before_img": null` — nunca inventar o regenerar la imagen "antes" solo para completar el campo.

## Paso 15 — Summary
```
✅ Matriz de 30 anuncios para [brand_name]
Folder: <student_folder>/
  ├ static-ads/ad-01..30.png   ← 30 imágenes (3 deseos × 2 perfiles × 5 niveles)
  ├ matriz-creativa.xlsx        ← grilla con las 30 + hoja Conceptos
  └ conceptos-30.md             ← las celdas autorizadas (editable)
Costo Kie: ~$X.XX
Próximo (TUYO): editar/pulir en CapCut/Photoshop lo que quieras, elegir las que corras en Meta.
```

---

## Edge cases
- **marca-cliente.json incompleto:** color ausente → la detección de color (Paso 6) lo cubre; deseos vacíos → re-correr escanear-marca; nivel ausente → default "Producto".
- **<2 fotos producto:** reintentar URL alterna; si no, pedir fotos del IG manualmente. Las celdas niveles 1-2 funcionan sin producto igual.
- **Logo no extraíble:** opcional; si la marca es wordmark-only, el alpha-prompt lo trata como texto.
- **validate-payload nunca pasa en 3 intentos:** mostrar los FAIL; suele ser composición poco diversa o casting repetido — fácil de corregir a mano en `conceptos-30.md`.
- **Puppeteer ausente:** no es bloqueante; `extract-brand-identity.js` degrada a CSS/HTML.
- **No hay motor de research (ej. entorno nuevo):** antes de abortar, probá la otra forma (skills locales `/escanear-marca` + `/diversificacion-creativa`, o MCP de Felipe — ver Paso 0 ítem 6). Si el estudiante no puede habilitar ninguna, ahí sí parás y avisás: sin research no hay matriz.

## Leyes del skill (lecciones aprendidas — locked 2026-06-22)

Reglas duras ganadas construyendo y corriendo este skill (Beckett US + Ventuno CO). Respetalas SIEMPRE:

1. **Idioma del ad = idioma del MERCADO de la marca, NO del estudiante.** Detectar (`adLanguageGuess`) + confirmar (`AD_LANG`, Paso 6b). Beckett US → inglés; Ventuno CO → español.
2. **Localizar al DIALECTO del país (`AD_COUNTRY`).** Los hooks de Felipe vienen en **voseo rioplatense** ("pedís/sumá/apoyá/sabés") → para Colombia/MX/etc convertir a tú/usted ("pide/suma/apoya/sabes"). Solo dejar voseo si el país es AR/UY. El validador marca voseo (WARN).
3. **El motor de consistencia es el alpha-prompt auto-antepuesto** (idéntico en las 30, vía `kie_build_layered_prompt`). El LLM SOLO escribe la escena por celda (`Concept (EN)`). NUNCA re-implementar las 5 capas ni meter el alpha en el concepto.
4. **Diversidad de ESCENARIO en celdas con producto (anti-sameness).** ≥1/3 deben mostrar el producto PUESTO/en contexto (calle, oficina, interior), rotando fondos+luz+ángulo. Test: si dos celdas con producto se pueden intercambiar cambiando solo el texto, una está mal. (Validado: v2 Ventuno >> v1.)
5. **Visibilidad por nivel:** Inconsciente/Problema → sin producto, sin `Reference`. Solución/Producto/Decisión → con producto + `Reference` a fotos reales.
6. **Casting variado:** "perfil" = tipo demográfico, no cara fija. Cada celda con persona = individuo distinto; sin descripción repetida dentro de un deseo.
7. **Web bg ≠ ad aesthetic.** La paleta del ad sale del packaging/IG, no de la homepage del sitio.
8. **Compuerta antes de gastar.** `validate-payload.py` debe salir 0 (loop de auto-reparación de texto, máx 3 pasadas). El render cuesta (~USD 1.50/30) → confirmar costo + balance. Sin auto-reparación visual: el humano revisa las imágenes.
9. **Hooks = fuente de Felipe, nunca inventar** — pero SÍ localizarlos/traducirlos al `AD_LANG`/`AD_COUNTRY`.
10. **Sin video** (skill futuro aparte). build-jobs alimenta alpha+product-dna COMPLETOS dentro del tope REAL del modelo (**gpt-image-2 = 5.000 chars; Nano Banana = 3.500**, ver Ley 20); solo compacta como fallback si el alpha crudo se pasa del presupuesto.
12. **Multi-producto = solo productos REALES referenciados, cap 3, gateado (CRÍTICO).** Para marcas multi-producto de ropa se pueden mostrar hasta **3 productos por shot (hero + 2 secundarios) + logo = 4 refs**, TODOS foto-referenciados de la web (campo `Secondary:` con `ruta @ zona`). Cada producto en una **zona distinta** del cuerpo; nunca 2 del mismo tipo; el print/logo del hero NUNCA sobre el secundario. **Si la marca tiene un solo producto → hero solo, NUNCA secundarios.** El validador FALLA si un `Secondary` apunta a una foto inexistente (anti-publicidad falsa) o excede el cap. Probado: ref-test TRUE. limpio hasta 4 refs con separación por zona.
11. **NUNCA inventar producto de marca (integridad de marca — CRÍTICO).** Solo las prendas/productos REFERENCIADOS (con foto real en `Reference`) pueden llevar el logo/wordmark/print/diseño de la marca. **Toda otra prenda o accesorio visible** (gorra, pantalón, camiseta interior, tenis, bandana, bolso, props) debe ser **LISA, de color sólido, genérica y SIN MARCA** — sin el wordmark de la marca, sin logos, sin prints inventados, sin tags de la marca. Prohibido pedir "full [marca] look" o "todos en [marca]" con piezas no referenciadas. En grupos: solo el modelo central lleva el producto referenciado; los demás van con ropa neutra sin marca. (El wordmark de la marca SÍ puede ir como elemento gráfico del ad —esquina/CTA—, eso es el logo del anuncio, no un producto inventado.) Mostrar ropa branded que no existe = violación de marca. Validado: TRUE. v1 inventó gorra/bandana/tenis "TRUE." → corregido con esta ley.
   **GENERALIZACIÓN (anti-publicidad falsa, aplica a TODA categoría):** NUNCA renderizar nada que implique un CLAIM o RESULTADO que no es real: (a) productos branded inventados (ropa), (b) **en fintech/servicios: NÚMEROS DE CUENTA inventados en pantallas — equity, balance, P&L, % de retorno, montos de payout específicos** (un "USD 152,250 equity" inventado en un teléfono = resultado falso), (c) testimonios/quotes inventados con nombres falsos. Permitido solo: assets REALES referenciados + **stats agregados REALES publicados por la marca** (USD 150M+ pagados, 4.8 Trustpilot, 90/10, etc.). En pantallas de trading: mostrar gráficos de velas **SIN números legibles** (sin eje de precio, sin equity, sin P&L), o solo UI genérica, o solo los stats reales como gráfico del ad. Validado: Lucid v1 fabricó equity/P&L en pantallas de teléfono → corregido. En el `Concept (EN)` de celdas con pantalla, escribir explícitamente "screen shows a candle chart with NO readable numbers — no equity, balance or P&L".
   **(d) CARTELES/MARCAS DE TERCEROS FABRICADOS:** NUNCA inventar un nombre/logo/cartel de negocio de terceros que parezca real (ej. inventar "Movement Physiotherapy" en la pared de una escena como si fuera una clínica real). El contexto de escena va **genérico y sin marca**, o se consulta con el humano. Es la misma zona gris anti-engaño que esta ley existe para frenar.
   **(e) PROOF/RESEÑAS = DATO REAL TEXTUAL, no suavizado:** si la marca tiene un dato real (ej. **"5.0 en Google · 9 reseñas"**), usarlo TEXTUAL. NUNCA reemplazarlo por praise genérico inventado ("Trusted by Melbourne businesses") ni fabricar tarjetas de reseña con estrellas + frases inventadas (formato de reseña auténtica = engañoso). Muestra chica (<~15-20 reseñas) → **consultar al humano** antes de destacarla como claim dominante; suavizar un hecho real hacia algo menos verificable es una violación sutil de esta ley.
   **(f) MARCAS REALES DE TERCEROS EN PROPS = PROHIBIDO (distinto de (d), más grave):** (d) es sobre negocios FICTICIOS inventados; esto es sobre marcas que SÍ existen. Caso real: una factura simulada terminó mostrando "Adobe Audition", "iZotope RX 11", "Avid Pro Tools" — software real de terceros que nadie pidió, en cualquier prop con texto (facturas, recibos, pantallas, cajas, listas de herramientas) sin que el `Concept (EN)` especifique el texto exacto. Mostrar una marca real ajena implica afiliación/endoso falso. Regla: si un prop necesita texto, escribilo explícito y genérico en el `Concept (EN)` (ej. "invoice line reads 'Editing software — monthly'") — nunca dejar ese hueco para que el modelo lo rellene con lo primero real que se le ocurra.
   **VERIFICAR REFS SCRAPEADAS (gate, Paso 9):** el scraper puede traer la foto EQUIVOCADA (ej. la página "Alien Box" de Etérea devolvió un brownie). Una ref equivocada → el modelo inventa = violación de marca. Antes de usar cualquier foto, verificá con visión (`Read`) que es el producto correcto; si no, re-scrapear/elegir otra/no featurear. El validador no ve imágenes → es trabajo del LLM. Hero-solo > producto inventado.

13. **Coherencia texto↔foto + diversidad de completitud (anti-invención de piezas/estados) — CRÍTICO.** El `Concept (EN)` de una celda solo puede describir piezas/componentes/estados que la foto citada en `Reference:` muestre — nunca piezas que solo aparecen en OTRA foto del mismo producto, y nunca un ESTADO específico (abierto/cerrado, color, orientación, cantidad) que no viste con tus propios ojos en esa foto exacta. **El texto de `ref-manifest.json` es un índice de qué foto existe y qué muestra a grandes rasgos — NO sustituye volver a mirar la foto real (`Read`) en el momento de fijar un detalle puntual.** Si el manifest revela ≥2 estados de completitud del producto (individual vs kit/set, abierto vs cerrado, etc. — lo que sea que ESA marca tenga, nunca una lista fija de categorías), repartí las celdas a propósito entre esos estados. **Caso real 1 (Bogo, micrófono K50, 2026-07):** el Paso 9 clasificó bien las fotos (`ref-manifest.json` distinguía "kit completo" de "micrófono individual sostenido con la mano"), pero esa clasificación nunca llegaba al Paso 11 — 6 de 13 celdas del producto describieron el kit completo (case abierto, dos transmisores) citando en `Reference:` solo la foto del micrófono individual. GPT Image 2 inventó el kit completo porque el texto lo pedía y la foto no lo contradecía a ojos del LLM redactor (AD-30 renderizado y pagado con el error). Corregido pasando el manifest a los subagentes del Paso 11 (punto 2) + cross-check en el pase de MERGE (punto 3) + WARN determinístico en `validate-payload.py` basado en el diff de vocabulario del propio manifest de la marca (no en una lista de partes por categoría — mantiene el chequeo brand-agnostic). **Caso real 2 (mismo Bogo, mismo día):** aun después de ese fix, varias celdas describieron el case del K50 **cerrado** — pero en TODO el sitio de la marca no existe ninguna foto del case cerrado; la única foto que lo muestra (`mic-kit-completo-ugc.png`) lo tiene **abierto**, y el propio `ref-manifest.json` lo decía correctamente ("case de carga abierto"). El texto del manifest era correcto y estaba disponible — el redactor simplemente nunca confrontó su detalle inventado contra la foto real ni contra ese texto en el momento de escribir. Corregido exigiendo verificación visual directa (`Read` de la foto real, no solo su descripción) en el momento exacto de fijar cualquier detalle de estado — mismo mecanismo de gate de visión que ya usa el Paso 9, extendido al momento de redactar.

14. **`brand/alpha-research.md` (Paso 10a) es obligatorio y ahora tiene gate de código — CRÍTICO.** Sin ese archivo, el Paso 10b puede caer en la paleta cruda de `detected-colors.json` (que solo ve CSS del sitio) en vez de la estética real de packaging/IG — reproduciendo exactamente lo que la Ley 7 prohíbe ("web bg ≠ ad aesthetic"). **Caso real (Etérea, 2026-07-27):** una corrida en vivo vía MCP en otro computador salió sin `alpha-research.md`; el alpha resultante usó "Cream Sand #ECDEBB" (el fondo crema del sitio) como color primario y una dirección "warm pastel/Kinfolk-editorial", perdiendo por completo la paleta cósmica saturada (navy/rosa/mint) fiel al packaging que sí tenía una corrida anterior de la misma marca. Corregido con un check "ALL" en `scripts/validate-payload.py` que falla si `brand/alpha-research.md` no existe o le falta alguno de los 5 elementos pedidos en el Paso 10a (Role base / Restricciones / Referencias / vocabulario / Firma Técnica) — mismo mecanismo que el candado de `ref-manifest.json` de la Ley 13.

15. **GPT Image 2 vs Nano Banana Pro no son "el mismo modelo con distinto nombre" — moderación de terceros distinta, diagnosticado (Etérea A/B, 2026-07-27).** GPT Image 2 es un proxy a la API de imágenes de OpenAI (moderación en 2 etapas: prompt + imagen de salida). Nano Banana Pro es un proxy a Google Gemini/Imagen (pipeline de seguridad distinto, empíricamente más permisivo con fotorrealismo de texturas/comida). En un A/B completo con las mismas 30 celdas, Nano Banana Pro llegó a 30/30 con pocos reintentos; GPT Image 2 necesitó 7+ rondas y aun así 2-3 celdas fallaron SIEMPRE — incluso aisladas una por una con pausas de 30-60s entre envíos (descarta timing/burst como causa única para esas). **No es un bug de la skill ni se arregla con código** — no hay parámetro de moderación expuesto para GPT Image 2 vía Kie (a diferencia de Seedance/Hailuo, que sí tienen `nsfw_checker`). Mitigación: para celdas de composición "Texture macro"/food close-up extremo, preferir Nano Banana Pro proactivamente (ver Paso 13). Detalle completo en memoria (`tool_kie_ai.md`, tabla de gotchas) — no repetido acá.

16. **Un alpha-prompt sin `TYPOGRAPHY`/`CTA STYLE` produce anuncios MUDOS — gate de código (Juliana Sanchez, 2026-07-30).** El alpha es la Capa 1, idéntica en las 30 celdas; el texto del anuncio se menciona una sola vez más, al final del `Concept (EN)` de cada celda. Si la Capa 1 solo trae dirección fotográfica (ROLE/VISION/PALETTE/LIGHT/CAMERA/MATERIALS), esa única mención no alcanza y el modelo descarta el titular. **Caso real:** el alpha de Juliana salió sin `TYPOGRAPHY` ni `CTA STYLE` — AD-04 (texture macro) renderizó la prenda perfecta y **sin titular ni CTA**, y AD-01 perdió la `¿` de apertura. **Contraprueba que fija la causa:** Etérea y Bogo tenían la cláusula `TEXT` igual de al final (posición 0.61-0.85 del concepto) y las mismas 18 celdas con producto, pero **sí** tenían ambas secciones, y renderizaron titulares enormes sin problema. O sea: la variable no es dónde está el TEXT en el concepto, es si la Capa 1 respalda que esto es un anuncio. **El síntoma aparece primero en las composiciones sin espacio negativo** (texture macro, close-up), que es justo donde uno menos lo busca — en un plano abierto con pared vacía el modelo lo pone igual. Corregido con un check "ALL" en `validate-payload.py` que falla si al alpha le falta cualquiera de las dos secciones. **Corolario:** si el alpha prohíbe dibujar el wordmark ("se compone después") mientras la Capa 2 adjunta el logo y las celdas lo piden, hay contradicción entre capas — resolvela a favor de reproducir la referencia adjunta.

17. **Cláusula `TEXT` duplicada en un `Concept (EN)` = `Internal Error` de la API, no una imagen fea (Juliana, 2026-07-30).** Si el mismo concepto trae dos directivas `TEXT`, Kie devuelve `Internal Error, Please try again later` y **parece una caída del modelo**. Se perdieron 5 envíos diagnosticando gpt-image-2 antes de aislarlo: una celda intacta renderizó bien en el medio (descarta caída), y al deduplicar volvió a andar. **Antes de sospechar del modelo o cambiar a `--model nano-banana-pro` por varios `Internal Error` seguidos, corré `validate-payload.py`** — hay un check que atrapa esto (los fallos no consumen créditos, pero sí tiempo).

18. **Un color del CSS puede no existir en la marca — compuerta de color con gate de código (Juliana, 2026-07-30).** `extract-brand-identity.js` solo puede leer colores **DECLARADOS** (variables CSS, JSON del tema de Shopify, estilos computados). Ninguna de sus fuentes sabe si el color se **VE**: un hex que quedó en la paleta por defecto de un tema sale con confianza `HIGH` igual que el color real. **Caso real:** el sitio de Juliana declaraba magenta `#fb5184` y coral `#e0002a` con `HIGH`, y al abrir el logo y las fotos de producto **ninguno de los dos aparecía en ningún lado** — los dos estaban en la lista `NEVER` de su propio alpha. Playwright tampoco lo resolvía: `getComputedStyle` filtra el declarado-pero-no-aplicado, pero no ve nada dentro de las imágenes ni distingue un borde de UI del color del producto. Por eso el script baja imágenes que la propia web expone a `brand/color-evidence/` y deja cada color en `visualCheck: "PENDING"`: el Paso 6 las **mira** y marca `VISIBLE` / `NOT_VISIBLE`. **El veredicto hay que GUARDARLO en `detected-colors.json`** — los Pasos 10b y 11 le pasan ese archivo tal como está en disco al alpha y a los 6 subagentes, que nunca vieron el descarte. `validate-payload.py` **falla (exit 1)** si un hex `NOT_VISIBLE` aparece en `brand/alpha-prompt.txt`, y **avisa (WARN)** si quedaron colores en `PENDING`. El FAIL es sobre un hecho objetivo; el PENDING es WARN a propósito, porque exigirlo se satisface escribiendo "VISIBLE" sin abrir nada.

19. **Un producto sin vista completa NO puede mostrarse entero — cobertura de silueta, gate de código (Juliana Sanchez, 2026-07-30).** El acta del Paso 9 respondía "¿qué muestra cada foto?" pero nunca "¿de cada producto existe una foto de su forma completa?". **Caso real:** `--limit 3` dejó 3 fotos de un pool de 7 que abarcaba **4 productos distintos**, y la sobrecamisa oliva quedó representada **solo por un macro del panel frontal**. Nueve celdas la citaron; en las 5 que la mostraban como objeto (flat lay, unboxing, manos alisándola, panel abierto) GPT Image 2 **le inventó la silueta** — renderizó un buzo con cuello ribeteado tejido, cuando la prenda real es una chaqueta. Se pagaron las 5. **Por qué ningún candado lo atrapó:** la Ley 13 compara el `Concept (EN)` contra piezas nombradas en OTRAS fotos del manifest; acá lo que faltaba no estaba en ninguna foto, así que no había con qué contrastar. Es un agujero de cobertura, no de coherencia.
    **Tres causas encadenadas, las tres en el código:** (a) `extract-product-images.js` rankea por **peso de archivo**, y un macro de textura pesa más que un plano completo, así que los detalles le ganan a las vistas completas; (b) su única defensa anti-cross-sell busca el slug del producto **dentro del nombre del archivo**, y en tiendas cuyo CDN sirve `DSC9089.jpg` esa defensa no filtra nada — probado: dos páginas de variante distintas devolvieron 7 archivos byte por byte idénticos; (c) el script **borraba** todo lo que pasaba de `--limit`, destruyendo la única evidencia de que el pool mezclaba productos. Corregido en tres niveles: **(1) en el origen** — si la tienda es Shopify, `extract-product-images.js` usa `/products/<handle>.json`, que devuelve las imágenes de ESE producto en el orden de la tienda (la 1ª es la principal, casi siempre la vista completa); y si le pasás una home/colección **se niega a bajar imágenes**, escribe `_catalog.json` y sale con código 2 pidiendo que corras una vez por producto — antes avisaba y scrapeaba el pool mezclado igual. **(2) evidencia** — los extras van a `_candidates/` en vez de borrarse. **(3) compuerta** — el acta declara `_coverage` con `vista_completa` por producto y `validate-payload.py` FALLA si una composición de objeto entero cita un producto con `vista_completa: null`.
    **Corrección del propio gate (misma fecha, encontrada en el `/simplify`):** la primera versión clasificaba por substrings escritos a mano y **se apagaba en silencio en tres casos** — `Hand-held POV` (que es *literalmente* una de las composiciones del incidente: "manos alisándola"), `Documentary/candid`, y cualquier grafía con guion como `Overhead flat-lay`. Un gate que no matchea no falla: da verde. Ahora la clasificación vive en `scripts/compositions.py` (las 14 con sus alias) y **una `composition` que no resuelva a ninguna de las 14 FALLA**, porque `composition` era texto libre que nadie validaba.
    **Corolario de método:** cuando un gate de visión pregunta "¿qué es esto?", preguntá también "**¿qué NO tengo?**". La ausencia no se ve mirando lo que hay.

20. **El tope de prompt es 5.000 (GPT Image 2) y 3.500 (Nano Banana) — la doc decía 8.000/20.000 y estaba mal (Juliana Sanchez, 2026-07-30).** El número vivía escrito a mano en **tres** lugares con **tres** valores, y `run-all-ads.sh` los tenía **invertidos** (8.000 para gpt-image-2, 5.000 para nano-banana). El comentario de `build-jobs.py` afirmaba "el límite real de GPT Image 2 (Kie) es 20.000 chars (verificado empíricamente)" — falso. **Un tope inflado es peor que no tener tope:** la compuerta da verde a prompts que el modelo no puede procesar, y el fallo aparece recién al enviar, disfrazado de `Internal Error` (que es el mismo mensaje de la Ley 17 y de la moderación de la Ley 15 — tres causas distintas, un solo síntoma). En esta corrida los 18 prompts con producto salieron entre 7.000 y 8.100 chars contra un techo de 5.000, y la primera pasada falló 18 de 30. **No está probado que el largo sea LA causa** — varias celdas de más de 7.000 sí renderizaron —, pero el payload estaba fuera de especificación y esa es una variable que no debería haber estado en juego.
    Corregido: los topes viven en **`scripts/model-limits.json`** — dato como dato, leído por Python (`alpha_sections.py`) y por Bash (`run-all-ads.sh`, con `jq`). Ningún lenguaje tiene su copia. `build-jobs.py` acepta `--model` y estampa `targetModel`/`charLimit` en cada job; `validate-payload.py` **lee el tope de `jobs.json`** (si falta, cae al default, nunca a uno más permisivo); y en `run-all-ads.sh` el `// empty` de `jq` valida de paso el `--model` desconocido, así que desapareció también la lista de modelos escrita a mano. Antes ese archivo tenía **tres** copias: los chars, los refs máximos y la whitelist de modelos.
    **Consecuencia de diseño, no solo un número:** con 5.000 el alpha ya no puede rondar los 4.000 chars. Los rangos que la doc del skill siempre pidió — alpha **1.800-3.500** (`alpha-prompt-framework.md`), **1.500-1.800** (`output-schemas.md`), product-dna **100-150 palabras**, `Concept (EN)` **~700 chars** — no eran sugerencias de estilo: son lo que hace que el payload entre. En esta corrida el alpha llegó a 4.869 y el product-dna a 330 palabras, y hubo que recortarlos dos veces. Si salta el aviso de compactado, **acortá el alpha**, no subas el tope.

21. **Nunca uses punto medio `·` en un titular en español — el modelo lo convierte en `¿` (Juliana Sanchez, 2026-07-30).** Dos titulares distintos lo sufrieron en la misma corrida: `CAMBIOS GRATIS · ENVÍOS DESDE $250.000` salió como `CAMBIOS GRATIS ¿ ENVÍOS DESDE...` y `EMPIEZA POR UNA · CAMBIOS GRATIS` como `EMPIEZA POR UNA ¿CAMBIOS GRATIS`. **Causa probable:** el alpha ordena escribir **ambos** signos invertidos del español (`¿` `¡`), y el modelo sobreaplica la regla a cualquier glifo suelto de puntuación. No es azar: pasó en las dos celdas que lo tenían, y en ninguna otra. Usá coma, guion o una conjunción. Añadilo al checklist de QC del Paso 14: **buscá `¿` en lugares donde no pusiste una pregunta.**
    **Corolario aparte, misma corrida:** pedirle al modelo que **NO** ponga el logo en un prop no funciona. `ad-30` llevaba en su `Concept (EN)` la instrucción literal "a plain unbranded kraft mailer, no text or logo on it" y renderizó el sobre con **"JULIANA SANCHEZ" impreso** — packaging de marca que no existe en ninguna foto de la marca (violación de la Ley 11). Con un prop que el modelo asocia fuertemente a branding (cajas, bolsas, etiquetas, sobres), la negación es débil: **lo robusto es que el prop no exista en la escena.**

## Performance Notes
- **Quality over speed.** La compuerta `validate-payload.py` existe para no quemar créditos en payloads mal cableados — respetá el loop de auto-reparación.
- **El alpha-prompt es el motor de consistencia.** Las 30 se ven de la misma marca porque la capa 1 se inyecta idéntica. La variación vive solo en `Concept (EN)`.
- **No inventes hooks.** Vienen de la matriz de Felipe.
- **Mirá de verdad las fotos** en el Paso 9 — el product-dna depende de detalles que solo se ven.

## Out of scope (NO hacer)
- **NO video** (skill futuro aparte).
- NO polish en CapCut/Photoshop — Santiago/el estudiante lo hace.
- NO grabar Loom.
- NO modificar `kie-api-helpers.sh`.
- NO subir nada a Skool.
