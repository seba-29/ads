# Output Schemas — qué escribe el skill y en qué formato

El skill `/produccion-anuncios` produce 4 archivos de texto sintetizados por LLM + 3 archivos descargados via scripts. Esta es la spec de cada uno.

## Estructura final por estudiante

```
<student_folder>/   (= <WORK_DIR>/<slug>)
├── brand/
│   ├── alpha-prompt.txt                # 5 capas, EN, 1800-2500 chars (se pasa COMPLETO)
│   ├── product-dna.txt                 # ~120 palabras, EN
│   ├── voice-dna.txt                   # voice constraints, EN
│   └── logo.png                        # descargado por extract-logo.js
├── input/
│   └── product-photos/
│       ├── product-01.jpg, product-02.jpg…  # nombres NEUTROS de extract-product-images.js
│       ├── ref-manifest.json                # acta del Paso 9: qué es cada foto (verificado con visión)
│       └── <nombre-real>.jpg                # renombradas por contenido tras el gate de visión (Paso 9) — nunca dejar product-NN
├── product-description.md              # 1-2 párrafos ES (referencia humana)
├── marca-cliente.json                  # output completo de Felipe escanear-marca
└── diversificacion-hooks.html          # output completo de Felipe diversificacion-creativa
```

---

## 1. `brand/alpha-prompt.txt` — el corazón

**Idioma:** Inglés. **Longitud:** **1800-2500 caracteres.** **Formato:** Prosa estructurada en 5 capas.

> Este número era el que más divergía entre documentos (decía 1500-1800 acá y 1800-3500 en `alpha-prompt-framework.md` y en el SKILL.md). Es 1800-2500, y sale de la aritmética del tope real: 5.000 de GPT Image 2 menos product-dna, Concept (EN) y scaffolding. Ver Ley 20.

### Estructura obligatoria (5 capas, ver `alpha-prompt-framework.md` para detalle)

```
[LAYER 1 — Photography style + lighting + lens]
[descripción tipo "Premium handcrafted leather footwear photography in
editorial menswear style (Kinfolk/Cereal Magazine aesthetic). Soft diffused
natural window light at 3200K-4500K warm color temperature, directional from
45 degrees left, creating gentle dimensional shadows on leather surfaces.
Shallow depth of field (f/2.0-f/4.0) with 50-85mm focal length."]

COLOR PALETTE (exact values):
- [Color name] [#HEX] — [role: e.g. primary CTA, background, accent]
- [Color name] [#HEX] — [role]
- [Color name] [#HEX] — [role]
- [optional 4th]

TYPOGRAPHY: [Heading font] for headlines — [adjectives]. [Body font] for body.
[Color contrast rules]. [Treatment: understated / bold / etc].

PRODUCT STYLING: [What MUST be shown in product — material, finish, distinguishing
detail. Reference what's visible in the product photos.]

SURFACES & BACKGROUNDS: [List of acceptable surfaces — e.g. "warm oak wood,
cream linen, Italian marble"]. [Frame composition rules — e.g. "Generous
negative space. Product occupies 40%+ of frame when visible."]

PERSONALITY: [1 line capturing brand essence — e.g. "Approachable luxury — refined
but not pretentious, artisanal but not rustic, detailed but not clinical."]

CTA STYLE: [Button color hex] [shape: rectangular/rounded] with [corner radius],
[text color] [text case]. Brand mark: clean "[BRAND NAME]" wordmark in [color].

NEVER: [5-8 explicit exclusions, period-separated. e.g. "Harsh flash. Cold blue
tones. Bright saturated neon colors. Cluttered compositions. Overly posed stiff
models. Fast-fashion aesthetic. Cheap synthetic backgrounds. Discount-first
messaging."]
```

### Reglas críticas

- **Los 3 pilares deben estar presentes** (Estructura + Referencia + Visión). Self-check antes de escribir.
- **Hex codes específicos**, no nombres genéricos. Sacar de `marca-cliente.json.identidad_visual`.
- **Al menos 1 referencia de estilo nombrada** (Kinfolk / Vogue / Helmut Newton / Kodak Portra / etc).
- **NEVER section obligatoria** — 5-8 exclusiones. Derivarlas de:
  - Lo opuesto del tono de marca (si es elegante → NEVER cheap/cluttered)
  - `marca-cliente.json.tono_y_voz` ejes inversos
  - Defaults globales: harsh flash, AI typography artifacts, melted text, doubled labels
- **Character count 1800-2500** (se pasa completo, sin compactar; tope real del prompt 5.000 con GPT Image 2, 3.500 con Nano Banana). Verificar ANTES de escribir las 30 celdas: si el alpha se pasa, `build-jobs.py` lo compacta y pierde ROLE/VISION/LIGHT/CAMERA/MATERIALS.

---

## 2. `brand/product-dna.txt` — visual + táctil

**Idioma:** Inglés. **Longitud:** 100-150 palabras (~120 ideal). **Formato:** Prosa descriptiva.

### Estructura

Primer párrafo: **qué es** + **material principal** + **color exacto** + **silueta**.

Segundo párrafo: **detalles distinguibles que la IA tiene que reproducir** (puntadas, cuero specs, herrajes, herrería, textura, pátina, etc).

### Ejemplo (Beckett Dean Oxford)

```
The Dean Oxford from Beckett Simonon is a classic five-eyelet Oxford dress
shoe handcrafted from full-grain calfskin leather in a rich bordeaux/oxblood
tone with subtle hand-burnishing on the toe cap. Silhouette is sleek and
slightly tapered, with a leather sole and Blake-stitch construction visible
along the welt edge.

Distinguishing details: visible grain texture across the vamp (NOT smooth
corrected leather), tonal waxed cotton laces, a low-profile leather welt
with neat hand stitching, brass-tone interior eyelets that read warm against
the leather, and a slight natural patina along the flex points indicating
authentic full-grain aging. Heel is a modest 25mm leather stack. Interior
shows tan calfskin lining stitched cleanly.
```

### Reglas

- **Materiales por nombre técnico:** "full-grain calfskin" no "leather".
- **Color con detalle:** "bordeaux/oxblood with hand-burnishing" no "dark red".
- **Stitching / construction techniques visible:** Blake stitch, Goodyear welt, slip-stitched, etc.
- **Hardware específico:** brass / silver-tone / blackened, eyelets / buckles / zippers.
- Si el producto NO es físico (servicio, software): adaptar el formato — describir interface, UI elements clave, brand mark application, contexto de uso.

---

## 3. `brand/voice-dna.txt` — restricciones de copy

**Idioma:** Inglés. **Longitud:** 50-100 palabras. **Formato:** Lista de restricciones + adjetivos guía.

### Estructura

```
VOICE: [3 adjetivos del marca-cliente.json.tono_y_voz.descriptores]

NEVER USE:
- [tipo de copy que la marca evita — derivado de tono]
- [palabras o frases concretas]
- [tipos de promesa o claims]

ALWAYS USE:
- [tipo de copy que la marca prefiere]
- [estructura de frase típica]
- [vocabulario aprobado]

Examples of in-voice phrases (from website):
- "[cita textual de la web]"
- "[otra cita]"
```

### Ejemplo (Beckett)

```
VOICE: artisanal, honest, timeless

NEVER USE:
- Discount-first messaging ("50% off!", "limited time", "act now")
- Hype language ("game-changer", "revolutionary", "amazing")
- Comparative slamming of competitors by name
- Fast-fashion vocabulary ("trendy", "season's must-have")

ALWAYS USE:
- Material + craftsmanship vocabulary (full-grain, hand-burnished, Blake stitch)
- Quiet confidence — facts, not adjectives ("Made to order. 1-year warranty.")
- Direct value framing ("$239 for the same craft that costs $700 in retail")
- Restraint — let the product speak

Examples of in-voice phrases (from website):
- "Classic footwear, crafted the right way."
- "Made-to-order model that delivers lasting quality without traditional retail markups."
```

### Reglas

- Derivar NEVER USE de los ejes opuestos del tono. Si la marca es **racional (4/10)** → NEVER emotional hype.
- ALWAYS USE debe ser específico al vocabulario detectado en la web — no genéricos.
- Si Felipe MCP detectó IG bio, incluir 1 ejemplo de IG bio si fue capturado.

---

## 4. `product-description.md` — referencia humana en español

**Idioma:** Español. **Longitud:** 1-2 párrafos (~150 palabras max). **Formato:** Markdown.

### Propósito

Que Santiago (y el estudiante) tengan un resumen del producto en su idioma, sin tener que leer el alpha-prompt.txt en inglés. NO se usa para generar imágenes — es para referencia interna.

### Estructura

```markdown
# Producto: [Nombre del producto]

[1-2 párrafos en español describiendo: qué es, para quién, materiales,
diferenciador, precio si está visible]

## Características clave
- [bullet 1]
- [bullet 2]
- [bullet 3]
- [bullet 4]
```

### Reglas

- Español neutro / latinoamericano.
- Tono informativo, NO de venta.
- Si hay precio visible en `marca-cliente.json.precio`, incluirlo.

---

## 5. `marca-cliente.json` y `diversificacion-hooks.html` — outputs raw de Felipe MCP

**Acción del skill:** copiarlos tal cual al folder del estudiante. No transformarlos.

Razón: si en una iteración futura necesitamos volver a parsear o re-derivar algo, tenemos los originales sin pérdida.

---

## 6. `qc-findings.json` — defectos reales corregidos en el Paso 14

**Cuándo se escribe:** solo si el QC (Paso 14) encuentra y corrige al menos un defecto real. Si las 30 pasan limpias, el archivo simplemente no existe (no se crea vacío). **Acción del skill:** `append` a un array plano en la raíz de `<student_folder>` — no hay script dedicado que lo escriba (es juicio del LLM, como `marca-cliente.json`), así que el formato de campos de abajo es la única fuente de verdad.

**Consumido por:** `generate-class-deck.js` (slide "Lo que la IA hizo mal") — un campo con nombre distinto o `ad` en formato incorrecto se descarta en silencio (con un `console.warn`) en vez de romper el deck.

### Schema (por entrada)

```json
{
  "ad": "ad-09",
  "defect_type": "prueba_social_fabricada",
  "note": "Descripción corta en español de qué estaba mal, verificable con los ojos.",
  "before_img": "static-ads/_qc-before/ad-09.png",
  "fix_note": "Qué se cambió para corregirlo (1 frase)."
}
```

### Reglas
- `ad` debe ser exactamente `ad-NN` (2 dígitos) — coincide con el nombre real del archivo en `static-ads/`.
- `defect_type` en snake_case corto (ej. `prueba_social_fabricada`, `texto_filtrado_del_modelo`, `logo_tercero_fondo`, `glifo_roto`) — no hace falta una lista cerrada, pero mantené el estilo snake_case para que se vea consistente en la slide.
- `before_img`: la ruta que `run-all-ads.sh --force` ya guardó automáticamente en `static-ads/_qc-before/ad-NN.png` (ver Paso 14). Si ese archivo no existe (el defecto se corrigió antes de este mecanismo, o antes de renderizar `--force`), usar `null` — nunca inventar o regenerar la imagen "antes" solo para completar el campo.
- `fix_note` es opcional pero recomendado — sin él la slide igual muestra el defecto, solo sin la línea de "cómo se arregló".

---

## 7. `input/product-photos/ref-manifest.json` — el acta del Paso 9

**Cuándo se escribe:** en el Paso 9, después de mirar cada foto con visión. Una por carpeta donde vivan fotos verificadas, más una en `brand/` para el logo. **`validate-payload.py` FALLA sin ella.**

Dos partes: la clave especial **`_coverage`** (por producto) y una entrada por archivo (qué muestra esa foto).

```json
{
  "_coverage": {
    "<slug-del-producto>": {
      "producto_real": "Nombre y precio reales si se pudieron verificar (ej. en _catalog.json)",
      "vista_completa": "archivo-con-la-prenda-entera.jpg",
      "fotos": ["archivo-1.jpg", "archivo-2.jpg"],
      "nota": "Cualquier trampa: qué lado lleva el print, si un detalle solo existe en una foto…"
    },
    "<otro-producto>": {
      "vista_completa": null,
      "fotos": ["solo-un-macro.jpg"],
      "nota": "SOLO existe un recorte. No se conoce la silueta → solo composiciones de recorte."
    }
  },
  "archivo-1.jpg": "Descripción verificada con visión: qué ES, material, colores, y qué NO muestra."
}
```

### Reglas de `_coverage`

- **`vista_completa`** = el archivo que muestra el producto **entero** (puesto o tendido, con su silueta visible). Si no existe ninguno, va **`null`** — nunca pongas ahí un macro para "completar el campo".
- **`fotos`** = todos los archivos de ESE producto. Es lo que le dice al validador qué celda toca qué producto.
- Con `vista_completa: null`, `validate-payload.py` **FALLA** cualquier celda de composición de objeto entero que cite ese producto (flat lay, unboxing, hero, lifestyle, UGC, feature callout, proof, environmental). Ver Ley 19.
- Si el acta **no** declara `_coverage`, el validador **avisa** (WARN) en las celdas de objeto entero. No es FAIL para no romper corridas viejas, pero en una corrida nueva es un error.
- Una clave por producto. **Dos colorways del mismo modelo son productos distintos** si sus fotos no son intercambiables (caso real: un top en Negro y en Vinotinto tratados como uno solo).

### Reglas de las entradas por archivo

- La descripción dice **qué es y qué NO muestra**. Redacción **contrastiva** cuando hay ≥2 fotos del mismo producto: "*a diferencia de X.jpg, esta no tiene el jean claro ni la ventana*". Eso es lo que evita que una celda describa piezas que su foto no tiene (Ley 13).
- Las claves que empiezan con `_` son notas, no archivos (ej. `_no_product_photos` para marcas de servicio).
- Nunca dejes un archivo como `product-NN`: el validador lo rechaza.

---

## Self-check final (antes de autorizar las 30 celdas)

El skill debe correr esta verificación antes de seguir al Paso 11:

- [ ] `brand/alpha-prompt.txt` existe + **1800-2500 caracteres** (se pasa completo; tope real 5.000 gpt-image-2 / 3.500 nano-banana) + tiene las 4 secciones obligatorias (`COLOR PALETTE`, `TYPOGRAPHY`, `CTA STYLE`, `NEVER`)
- [ ] `brand/product-dna.txt` existe + 80-180 palabras
- [ ] `brand/voice-dna.txt` existe
- [ ] `brand/logo.png` existe (o warn si fallback manual fue necesario)
- [ ] `input/product-photos/` tiene ≥2 archivos
- [ ] `product-description.md` existe + en español
- [ ] `marca-cliente.json` copiado
- [ ] `diversificacion-hooks.html` copiado
