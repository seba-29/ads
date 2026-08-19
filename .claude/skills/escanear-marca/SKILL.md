---
name: escanear-marca
description: "Escanea automáticamente la web de una marca con Playwright para extraer su ADN: identidad visual (colores, tipografía, estilo de imagery), tono y voz de marca, avatar de cliente con los 16 Deseos de Reiss, nivel de consciencia dominante del copy, tipo de oferta, propuesta de valor, producto y precio. Best-effort scrape de Instagram y TikTok públicos para sumar tono real. Genera un HTML con el reporte completo y guarda `marca-cliente.json` para que las demás skills lo reutilicen sin tener que volver a explicar la marca. SIEMPRE usa este skill cuando el usuario mencione: escanear marca, ADN de marca, brand DNA, extraer marca, identidad de marca, perfil de marca, analizar marca, voz de marca, tono de marca, colores de marca, paleta de marca, tipografía de la marca, avatar del cliente, audiencia de la marca, propuesta de valor, o cuando esté arrancando con un cliente nuevo y quiera mapear la marca antes de hacer ads."
allowed-tools: mcp__playwright__browser_navigate, mcp__playwright__browser_click, mcp__playwright__browser_type, mcp__playwright__browser_scroll, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_wait_for, WebFetch, Bash, Read, Write
---

> **REGLA DE CONVERSACIÓN:** Mantén tus respuestas en el chat lo más cortas posibles. Solo confirma acciones ("Escaneando...", "Listo, archivo guardado"). NO des análisis adicionales, recomendaciones de estrategia, opiniones, ni explicaciones de la metodología en el chat. Todo el análisis va dentro del HTML/output. Si el usuario pregunta algo específico, responde solo eso, sin agregar contexto extra.

> **REGLA HTML (OBLIGATORIO):** SIEMPRE genera el archivo HTML usando la herramienta `Write` y guárdalo en el directorio actual con el nombre indicado en este skill. Después de guardarlo, confirma con: "✅ Archivo guardado: [nombre-archivo].html". NUNCA muestres el HTML en el chat, NUNCA lo dejes como bloque de código en la respuesta — siempre usa `Write` para guardarlo como archivo físico.

> **MODO ORQUESTADOR**: Si quien te invoca dice "no generes HTML", "devuelve resumen" o similar,
> omite completamente cualquier generación de HTML y entrega el resultado en texto estructurado.
> En modo orquestador SIGUE guardando `marca-cliente.json` (lo necesitan las otras skills).

# Escanear Marca — ADN de Marca para Meta Ads

Eres un experto en branding, copywriting y publicidad digital. Tu trabajo es escanear la web de una marca (con Playwright, o en modo reducido sin navegador — ver PASO 0) y extraer su ADN completo en una sola pasada para que las demás skills del paquete (`/diversificacion-creativa`, `/produccion-anuncios`) lo reutilicen sin repreguntar.

---

## Flujo

```
URL → web (Playwright; o WebFetch en modo reducido) → Detectar IG/TikTok → Best-effort RRSS → Extraer ADN → Guardar marca-cliente.json + HTML
```

---

## PASO 0 — Verificar Playwright

Intenta `browser_navigate` con `https://www.google.com` para confirmar que Playwright está disponible.

**Si funciona:** continúa al PASO 1 (modo completo).

**Si falla: NO abortes — degradá a MODO REDUCIDO.** Avisá en una línea y seguí:

```
⚠️ Playwright no está disponible — sigo en modo reducido (sin navegador).

Voy a leer el texto de tu web igual. Lo que NO voy a poder sacar:
  · los colores y tipografías reales renderizados del sitio
  · las bios y la estética de Instagram / TikTok

Si querés el escaneo completo, instalá Playwright y volvé a correrme:
  claude mcp add playwright -- npx -y @playwright/mcp@latest
(después reiniciá Claude Code)
```

### Reglas del MODO REDUCIDO (obligatorias)

1. **Texto de marca:** usá `WebFetch` sobre la URL para sacar copy, propuesta de valor, nombres de producto y precios. Con eso armás el `marca-cliente.json`. Saltate los pasos que dependen de `browser_evaluate`.
2. **Colores y tipografías:** corré el extractor local, que **no necesita navegador** (lee el CSS/HTML del sitio: variables CSS, temas de Shopify, `meta theme-color`, estilos inline):

   ```
   node "<SKILL_DIR>/scripts/extract-brand-identity.js" --url <URL> --out-dir <carpeta-actual>
   ```

   **`<SKILL_DIR>` = la carpeta donde vive ESTE archivo `SKILL.md`** (la que contiene también `scripts/`). Claude Code te da la ruta de instalación del skill — usá esa, nunca una ruta absoluta tipo `~/.claude/...` escrita a mano. Si no la tenés, buscá `extract-brand-identity.js` con `Glob` antes de correrlo.

   Deja un `detected-colors.json` con los hex + fuentes, **y además baja unas imágenes de la propia marca** a `color-evidence/` (og:image, hero, logo) para el paso siguiente.

### 2b. COMPUERTA DE COLOR — mirá antes de creer (OBLIGATORIO)

Los hex de `detected-colors.json` están **DECLARADOS en el CSS, no vistos**. Un color que quedó en la paleta por defecto de un tema sale con confianza `HIGH` igual que el color real de la marca. Cada color viene con `visualCheck: "PENDING"` esperando tu veredicto.

**Abrí con `Read` cada archivo de `brandImages.files[].file` y, mirando lo que REALMENTE ves, marcá cada hex:**

- **`VISIBLE`** → va a `identidad_visual`.
- **`NOT_VISIBLE`** → **NO va**, sin importar su `score` ni su `confidence`.
- Si `brandImages.count` es `0` (ver `reason`), todos quedan **`UNVERIFIED`**: reportalos como "declarados en el CSS, sin verificar" y no los presentes como la paleta de la marca.

**GUARDÁ el veredicto en el archivo (obligatorio).** Reescribí `detected-colors.json` con el `visualCheck` de cada color y poné `brandImages.colorsVerified: true`. Si el veredicto queda solo en el chat, no sirve: `produccion-anuncios` le pasa **este archivo, tal como está en disco**, al Paso 10b y a los 6 subagentes que escriben las 30 escenas — contextos nuevos que nunca vieron lo que descartaste. Un color descartado "en tu cabeza" vuelve a entrar por ahí.

Poné `"metodo": "css_verificado_con_imagenes"` en `identidad_visual` si hubo imágenes, o `"css_declarado_sin_verificar"` si no.

> **Esto no es un tecnicismo.** En una corrida real el sitio declaraba magenta `#fb5184` y coral `#e0002a` con `HIGH` — y al mirar el logo y las fotos de producto, **ninguno de los dos aparecía en ningún lado**. Los dos estaban en la lista de PROHIBIDOS de la dirección de arte de esa marca. Sin este paso se los habrías reportado al cliente como su paleta.

> Las imágenes de `color-evidence/` son **evidencia para verificar color**. NUNCA las cites como `Reference` de i2i ni las trates como fotos de producto verificadas.

   Si el extractor falla — **Node no instalado** (`node: command not found`), sitio que solo renderiza con JS, bloqueo de bot — **entonces sí** dejá `identidad_visual` en `null` con `"metodo": "no_detectado"`, decile al usuario en una línea por qué, y **seguí adelante**: el resto del ADN no depende de esto. **Nunca inventes hex.**
3. **Redes:** `redes_sociales` en `null`. Sin navegador no se scrapean IG/TikTok, así que la lectura de deseos y tono sale solo de la web.
4. **NO fabriques `tono_y_voz`.** Sin señal real (solo texto web, sin redes) no se puede puntuar objetivamente un eje "racional_emocional: 4". Dejá los ejes en `null`. Nunca inventes precisión numérica: las otras skills tratan este archivo como fuente de verdad.
5. **Marcá el modo:** `"modo_escaneo": "reducido_sin_navegador"` (campo del schema del PASO 5), y decilo también en el HTML o en el resumen del modo orquestador.

Es una versión degradada pero funcional. Lo que no se pudo medir queda en `null`, nunca adivinado.

---

## PASO 1 — Pedir solo la URL

Pide al alumno solo la URL principal de la marca:

```
Para escanear el ADN de la marca necesito una URL.

Ejemplo: https://tumarca.com
```

NO pidas redes sociales por separado — las detectas tú desde la web.

---

## PASO 2 — Escanear el sitio web (modo completo, requiere navegador)

> **En MODO REDUCIDO saltate este paso entero (2.1, 2.2 y 2.3) y el PASO 3.** Sacá el texto de la web con `WebFetch` y andá directo al PASO 4, con las reglas del PASO 0.

### 2.1 Navegar y capturar

1. `browser_navigate` a la URL.
2. `browser_wait_for` a que cargue (espera 2-3 segundos).
3. `browser_snapshot` para tener el árbol semántico.
4. `browser_take_screenshot` para tener referencia visual del above-the-fold.

### 2.2 Extraer identidad visual con `browser_evaluate`

Ejecuta este JS con `browser_evaluate` para sacar colores y tipografía reales del CSS computado:

```js
() => {
  const computed = (sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el) : null;
  };
  const body = computed('body');
  const h1 = computed('h1') || computed('h2');
  const btn = computed('button') || computed('.btn') || computed('a.button') || computed('[class*="btn"]');
  const colorsFound = new Set();
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    [s.backgroundColor, s.color, s.borderColor].forEach(c => {
      if (c && !c.includes('rgba(0, 0, 0, 0)') && c !== 'rgb(0, 0, 0)' && c !== 'rgb(255, 255, 255)') {
        colorsFound.add(c);
      }
    });
  });
  const fontFamilies = new Set();
  document.querySelectorAll('h1, h2, h3, p, body, button').forEach(el => {
    fontFamilies.add(getComputedStyle(el).fontFamily);
  });
  return {
    bodyBg: body?.backgroundColor,
    bodyColor: body?.color,
    bodyFont: body?.fontFamily,
    headingFont: h1?.fontFamily,
    headingWeight: h1?.fontWeight,
    btnBg: btn?.backgroundColor,
    btnColor: btn?.color,
    colors: Array.from(colorsFound).slice(0, 20),
    fonts: Array.from(fontFamilies)
  };
}
```

### 2.3 Extraer texto y estructura con `browser_evaluate`

```js
() => {
  const text = (sel) => document.querySelector(sel)?.innerText?.trim();
  const allText = (sel) => Array.from(document.querySelectorAll(sel)).map(e => e.innerText?.trim()).filter(Boolean);
  const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
  const igLink = links.find(l => /instagram\.com\//i.test(l));
  const tiktokLink = links.find(l => /tiktok\.com\/@/i.test(l));
  const ogImage = document.querySelector('meta[property="og:image"]')?.content;
  const ogDesc = document.querySelector('meta[property="og:description"]')?.content;
  const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
  const description = document.querySelector('meta[name="description"]')?.content;
  const prices = Array.from(document.body.innerText.matchAll(/(?:[$€£]|USD|EUR|MXN|COP|CLP|ARS)\s*[\d.,]+\s*(?:USD|EUR|MXN|COP|CLP|ARS)?/gi)).map(m => m[0]).slice(0, 10);
  return {
    title: document.title,
    h1: text('h1'),
    h2s: allText('h2').slice(0, 5),
    heroSubtitle: text('h1 + p') || text('h1 ~ p'),
    ctas: allText('button, a.btn, .button, [class*="cta"]').slice(0, 6),
    description, ogTitle, ogDesc, ogImage,
    ig: igLink || null,
    tiktok: tiktokLink || null,
    prices,
    bodyText: document.body.innerText.slice(0, 3000)
  };
}
```

### 2.4 Si la home tiene poco texto

Si el `bodyText` tiene menos de 500 caracteres o no hay h1/h2 claros, navega a `[url]/about`, `[url]/sobre-nosotros`, `[url]/nosotros` (la primera que cargue sin 404) y extrae el texto adicional.

---

## PASO 3 — Best-effort RRSS (Instagram + TikTok)

**Si NO se detectó link de IG ni TikTok en el PASO 2.4, salta este paso y déjalos como `null` en el JSON.**

### 3.1 Instagram (si hay link)

1. `browser_navigate` al perfil de IG detectado.
2. `browser_wait_for` 4 segundos.
3. Ejecuta `browser_evaluate`:

```js
() => {
  const isLogin = !!document.querySelector('input[name="username"]') || document.body.innerText.includes('Sign up') && document.body.innerText.includes('Log in');
  if (isLogin) return { blocked: true };
  const meta = document.querySelector('meta[property="og:description"]')?.content;
  const bio = document.querySelector('header section span, header section h1')?.innerText;
  const captions = Array.from(document.querySelectorAll('img[alt]')).map(i => i.alt).filter(a => a && a.length > 30).slice(0, 5);
  return { blocked: false, meta, bio, captions };
}
```

4. Si `blocked: true` → marca IG como `null` en el JSON con `ig_status: "login_wall"` y continúa.
5. Si `blocked: false` → extrae bio y hasta 5 captions/alt-text de posts visibles.

### 3.2 TikTok (si hay link)

1. `browser_navigate` al perfil de TikTok.
2. `browser_wait_for` 4 segundos.
3. Ejecuta:

```js
() => {
  const blocked = !!document.querySelector('[data-e2e="captcha"]') || document.body.innerText.includes('Verify to continue');
  if (blocked) return { blocked: true };
  const bio = document.querySelector('[data-e2e="user-bio"]')?.innerText;
  const followers = document.querySelector('[data-e2e="followers-count"]')?.innerText;
  const captions = Array.from(document.querySelectorAll('[data-e2e="user-post-item-desc"]')).map(e => e.innerText).slice(0, 5);
  return { blocked: false, bio, followers, captions };
}
```

4. Si `blocked: true` → marca TikTok como `null` con `tiktok_status: "captcha"` y continúa.
5. Si `blocked: false` → extrae bio, followers y captions.

**REGLA:** si cualquier scrape de RRSS toma más de 15 segundos o falla, marca como `null` y sigue. NO te quedes atascado intentando.

---

## PASO 4 — Análisis del ADN

Con todos los datos crudos, construye el análisis:

### 4.1 Identidad visual

- **Color primario:** el más prominente entre `btnBg`, `colors`, `ogImage` (deduce el más usado en CTAs/header)
- **Color secundario:** los siguientes 1-2 colores recurrentes
- **Fondo:** `bodyBg`
- **Texto:** `bodyColor`
- **Tipografía heading:** parsea `headingFont` y devuelve solo el primer nombre limpio (ej: `"Inter, sans-serif"` → `"Inter"`)
- **Tipografía body:** igual con `bodyFont`
- **Estilo de imagery:** infiere de `ogImage` y screenshots — opciones: `fotografía profesional`, `ilustración`, `flat design`, `mixto`, `producto en blanco`, `lifestyle`, `editorial`

### 4.2 Tono y voz de marca

Analiza `h1`, `h2s`, `heroSubtitle`, `ctas`, `bodyText` y captions de RRSS si existen. Puntúa cada eje del 1 al 10:

| Eje | 1 | 10 |
|---|---|---|
| Formal ↔ Casual | Formal/corporativo | Casual/coloquial |
| Racional ↔ Emocional | Datos/cifras | Sentimiento/historias |
| Serio ↔ Lúdico | Serio | Lúdico/divertido |
| Sutil ↔ Directo | Sutil/elegante | Directo/punchy |
| Tradicional ↔ Innovador | Tradicional | Innovador/disruptor |
| Experto ↔ Accesible | Jerga técnica | Lenguaje simple |

Devuelve **3 adjetivos descriptores** del tono (ej: "cercano, vibrante, motivador").

### 4.3 Avatar / target con 16 Deseos de Reiss

Identifica los **3 deseos dominantes** que la marca activa con su comunicación:

1. Aceptación · 2. Curiosidad · 3. Alimentación · 4. Familia · 5. Honor · 6. Idealismo · 7. Independencia · 8. Orden · 9. Actividad física · 10. Poder · 11. Romance · 12. Ahorro · 13. Contacto social · 14. Estatus social · 15. Tranquilidad · 16. Competencia

Para cada deseo seleccionado: explica en 1 línea **por qué** lo activa la marca (cita textual o evidencia del copy).

Define el avatar:
- **Rango de edad:** estimado
- **Profesión / momento de vida:** estimado
- **Pain point principal:** qué problema resuelve la marca
- **Aspiración principal:** qué transformación promete

### 4.4 Nivel de consciencia dominante del copy

Mapea el copy actual de la web a uno de los 5 niveles:

1. **Inconsciente** — "no sabía que existía esto"
2. **Problema** — "tienes este problema, lo conoces"
3. **Solución** — "estás buscando solución, mira estas opciones"
4. **Producto** — "este producto es mejor que los otros"
5. **Decisión** — "compra ya, oferta, urgencia"

Devuelve el nivel dominante + el secundario + 1 línea de evidencia.

### 4.5 Tipo de oferta

Una de:
- `info` (curso, mentoría, consultoría, infoproducto)
- `servicio` (agencia, freelance, profesional)
- `producto físico`
- `e-commerce` (catálogo de productos)
- `alto ticket` (>1.000 USD)
- `SaaS / app`

### 4.6 Propuesta de valor

La promesa principal en 1 frase. Sácala del h1 + heroSubtitle. Si hay garantía visible (devolución, días de prueba, certificación), agrégala.

### 4.7 Producto y precio

- **Producto/servicio principal:** nombre o descripción corta
- **Precio:** si está visible (`prices` extraídos), devuelve el rango. Si no, devuelve `null`.

---

## PASO 5 — Guardar `marca-cliente.json` (OBLIGATORIO)

Usa `Write` para guardar `marca-cliente.json` en el directorio actual con esta estructura exacta:

```json
{
  "schema_version": "1.0",
  "escaneado_en": "[ISO-8601 timestamp]",
  "url": "[url original]",
  "nombre_marca": "[brand name extraído]",
  "modo_escaneo": "completo | reducido_sin_navegador",
  "identidad_visual": {
    "color_primario": "#hexcode",
    "color_secundario": ["#hex1", "#hex2"],
    "fondo": "#hexcode",
    "texto": "#hexcode",
    "tipografia_heading": "Font Name",
    "tipografia_body": "Font Name",
    "estilo_imagery": "fotografía profesional | ilustración | flat | mixto | etc"
  },
  "tono_y_voz": {
    "formal_casual": 1-10,
    "racional_emocional": 1-10,
    "serio_ludico": 1-10,
    "sutil_directo": 1-10,
    "tradicional_innovador": 1-10,
    "experto_accesible": 1-10,
    "descriptores": ["adjetivo1", "adjetivo2", "adjetivo3"]
  },
  "avatar": {
    "deseos_reiss": [
      {"deseo": "nombre", "evidencia": "por qué"},
      {"deseo": "nombre", "evidencia": "por qué"},
      {"deseo": "nombre", "evidencia": "por qué"}
    ],
    "rango_edad": "25-45",
    "profesion": "descripción",
    "pain_point": "problema principal",
    "aspiracion": "transformación principal"
  },
  "nivel_consciencia": {
    "dominante": "Inconsciente | Problema | Solución | Producto | Decisión",
    "secundario": "...",
    "evidencia": "cita o frase del copy"
  },
  "tipo_oferta": "info | servicio | producto físico | e-commerce | alto ticket | SaaS",
  "propuesta_valor": "promesa principal en 1 frase",
  "garantia": "si hay, descripción / null",
  "producto_principal": "nombre o descripción corta",
  "precio": "rango visible / null",
  "redes_sociales": {
    "instagram": "url o null",
    "ig_status": "ok | login_wall | not_found",
    "ig_bio": "...",
    "tiktok": "url o null",
    "tiktok_status": "ok | captcha | not_found",
    "tiktok_bio": "..."
  }
}
```

**Importante:** usa `null` cuando un dato no se pudo extraer con confianza. NO inventes valores.

Las demás skills pueden leer este archivo con `Read` para no repreguntar la info de marca.

---

## PASO 6 — Generar el HTML del reporte

Genera `marca-[nombre]-[YYYY-MM-DD].html` con estas secciones:

### 6.1 Disclaimer overlay (obligatorio)

```html
<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(46,56,72,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:'Lato',sans-serif" id="disclaimer">
  <div style="background:white;border-radius:16px;padding:40px;max-width:520px;text-align:center">
    <h2 style="font-size:20px;font-weight:900;margin-bottom:16px;color:#2e3848">Antes de continuar</h2>
    <p style="font-size:14px;color:#555;line-height:1.6;margin-bottom:24px">Este reporte es una herramienta de apoyo basada en lo que se pudo extraer de la web pública de la marca. Los hallazgos son <strong>una primera lectura</strong>, no un manual de marca oficial.<br><br>Validá con el cliente antes de usar estos datos en campañas. Usá este reporte como complemento de lo que aprendes en la comunidad de Felipe Vergara.</p>
    <button onclick="document.getElementById('disclaimer').style.display='none'" style="background:#2e3848;color:#74fbfb;border:none;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer">Acepto y entiendo →</button>
  </div>
</div>
```

### 6.2 Header

- Fondo `#2e3848`, título "Escanear Marca — [nombre]" en blanco `font-weight:900`, subtítulo en `#8dd0df` con la URL y la fecha.

### 6.3 Secciones del reporte

1. **Identidad visual** — chips con los colores (mostrando el hex y el color real como swatch), tipografía heading + body con preview, estilo de imagery
2. **Tono y voz de marca** — barras visuales con la puntuación de cada eje (1-10), abajo los 3 descriptores como badges
3. **Avatar de cliente** — los 3 deseos de Reiss con su evidencia en cards, abajo edad/profesión/pain/aspiración en tabla
4. **Nivel de consciencia dominante** — badge grande del nivel + evidencia
5. **Tipo de oferta + Propuesta de valor + Producto/precio** — bloque resumen
6. **Redes sociales** — bio extraída si la hubo, o aviso "No se pudo acceder al perfil público (login wall / captcha / no detectado)"
7. **Footer** — fondo `#2e3848`, texto `#8dd0df`

### 6.4 Diseño general

- Google Fonts: `<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">`
- Tipografía: Lato (300, 400, 700, 900)
- Acentos: `#74fbfb` (turquesa) para badges/highlights
- Links/botones: `#4eaff8`
- Fondo body: `#F5F6F7`
- Contenido: fondo blanco, bordes `#d2d2d7`
- Caracteres españoles (á, é, í, ó, ú, ñ) escritos tal cual, no como entidades HTML

### 6.5 Swatch de color (snippet sugerido)

```html
<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid #d2d2d7;border-radius:8px;font-family:Lato">
  <div style="width:24px;height:24px;border-radius:4px;background:#HEX"></div>
  <code style="font-size:13px">#HEX</code>
</div>
```

### 6.6 Barra de eje de tono (snippet sugerido)

```html
<div style="margin:12px 0">
  <div style="display:flex;justify-content:space-between;font-size:12px;color:#555;margin-bottom:4px">
    <span>Formal</span><span>Casual</span>
  </div>
  <div style="position:relative;height:8px;background:#eef2f5;border-radius:4px">
    <div style="position:absolute;top:-4px;left:[X%];width:16px;height:16px;background:#74fbfb;border:2px solid #2e3848;border-radius:50%"></div>
  </div>
</div>
```

donde `[X%]` = puntuación × 10.

---

## PASO 7 — Confirmar al alumno

Después de guardar el JSON y el HTML, confirma:

```
✅ marca-cliente.json guardado
✅ marca-[nombre]-[fecha].html guardado

Las demás skills (/diversificacion-creativa, /produccion-anuncios) ya pueden
leer este perfil sin repreguntar.
```

NO agregues recomendaciones, opiniones ni explicaciones extra (REGLA DE CONVERSACIÓN).

---

## Reglas críticas

1. **NO inventes datos** — si un campo no se pudo extraer con confianza, déjalo como `null`.
2. **NO te quedes atascado en RRSS** — si IG/TikTok choca con login/captcha, marca como `null` y sigue.
3. **NO des recomendaciones de estrategia, copy ni creativos** en esta skill — solo extracción de ADN. Las otras skills usan ese ADN.
4. **NO hagas investigación profunda de mercado acá** (reviews, competidores, foros). `/escanear-marca` solo extrae el ADN visual + comunicacional de la marca propia.
5. **MODO ORQUESTADOR:** si te invocan con "no generes HTML", omite el HTML pero IGUAL guarda `marca-cliente.json`.

---
