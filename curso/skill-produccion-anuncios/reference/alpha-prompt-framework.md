# Alpha Prompt Framework — Operational Reference

Destilado del PDF `DEEPLOOK RESEARCH AGENT/reference-docs/Alpha Prompt_ Framework ESPAÑOL.pdf` (37 páginas) para uso como contexto LLM en el skill `/produccion-anuncios`.

Fuente: Felipe Vergara / DEEPLOOK Research Agent.
Versión destilada: 2026-05-20.

---

## 1. Conceptos fundamentales

### Dos niveles de prompt — NO confundir

| Nivel | Qué es | Cuándo se crea | Reusable |
|---|---|---|---|
| **Alpha Prompt** | Sistema de producción reutilizable. El ADN visual de la marca en prosa estructurada. 5-6 capas. | Una vez por marca | Sí — base para infinitos master prompts |
| **Master Prompt** | El prompt final que se manda a la API de imagen. Combina alpha + hook + producto + layout específico. | Cada ad | No — uno por ad |

**Pirámide:** 1 Alpha Prompt → N Master Prompts → ∞ Imágenes

### Los 3 Pilares (toda imagen profesional con IA descansa en estos tres)

**PILAR 1 — ESTRUCTURA (la fundación técnica)**
- Cámara y lente: distancia focal (24mm vs 200mm), apertura (f/1.4 vs f/11), ángulo, velocidad obturador
- Iluminación: tipo + dirección (Rembrandt 45°, lateral 90°, retroiluminada), calidad (dura/blanda/difusa), temperatura color (3200K cálido vs 5600K frío), contraste
- Composición: regla de tercios, espacio negativo, planos profundidad, líneas principales, encuadre
- Materiales y texturas: mate/brillante/rugosa, propiedades tejidos, marcadores autenticidad (pátina, desgaste)
- Artefactos técnicos: grano película, distorsión lente, viñeteado, bokeh

**PILAR 2 — REFERENCIA (el ancla de estilo)**
- Movimientos artísticos: Bauhaus, Brutalismo, Art Déco, Minimalismo escandinavo, Wabi-Sabi
- Artistas/fotógrafos: Helmut Newton, Annie Leibovitz, Gregory Crewdson, Roger Deakins, Peter Lindbergh
- Películas y ciencia color: Kodak Portra 400 (cálido/apagado), Fuji Velvia 50 (saturado), Tri-X 3200 (B&N alto contraste), Cinestill 800T (tungsteno + neón)
- Publicaciones/marcas: Kinfolk, Vogue Italia, campañas Apple, películas A24
- Eras culturales: grano años 70, deportiva analógica 90s, Nueva Ola Francesa, estética japonesa

**PILAR 3 — VISIÓN (la intención emocional)**
- Tono emocional: melancólico, triunfante, íntimo, alienante, nostálgico, eufórico, tenso
- Contexto narrativo: viaje/llegada, antes/después, anticipación, ritual, transformación
- Relación con el espectador: voyeurista, íntimo, admiración heroica, proximidad incómoda
- Atmósfera: opresiva, etérea, claustrofóbica, expansiva
- Resonancia cultural: nostalgia americana, minimalismo japonés, sofisticación europea, coraje urbano

**REGLA:** Los 3 pilares DEBEN estar en cada Alpha Prompt y en cada Master Prompt. Si falta uno, la imagen sale plana.

---

## 2. Lista de verificación de 5 puntos (pre-prompt)

Antes de escribir cualquier prompt, responder estos 5 puntos en razonamiento interno:

1. **¿Cuál es el sentimiento principal?** — emoción primaria (alegría/tensión/asombro/aislamiento), nivel de energía (tranquilo/dinámico/explosivo), respuesta deseada del espectador
2. **¿Cuál es el marco o configuración?** — tamaño de toma (primer plano/medio/amplio/establecimiento), composición (centrada/tercios/espacio negativo dominante), aspect ratio (9:16 / 16:9 / 1:1)
3. **¿Cuál es la fuente de luz dominante?** — dirección (frontal/lateral 45°/lateral 90°/posterior/superior/inferior), calidad (dura/difusa/mixta), temperatura color (3200K cálido / 5600K neutro / 7000K+ frío)
4. **¿Cuál es el movimiento?** — sujeto (estático/caminar/correr/gestos), cámara (locked/pan/tilt/dolly/handheld/orbit), percepción del tiempo (real / cámara lenta 2-4x / time-lapse / momento congelado)
5. **¿Para qué sirve la salida?** — plataforma (TikTok/Reels/Shorts/LinkedIn/web hero), contexto (feed/story/anuncio/portafolio), duración (gancho 3s / story 7s / narrativa 15s / completa 30s)

---

## 3. Arquitectura de 6 componentes (estructura universal del Alpha Prompt)

Cada Alpha Prompt contiene estos 6 componentes en ESTE orden exacto. La estructura es universal — solo cambia el contenido.

### 1. DEFINICIÓN DEL ROL
**Fórmula:**
```
Actuar como un Director de [CATEGORÍA DE ESTILO] de clase mundial
especializado en la creación de imágenes de [DESCRIPTORES DE CALIDAD VISUAL]
con [ELEMENTOS ATMOSFÉRICOS CLAVE] y [CARACTERÍSTICAS DE FIRMA],
que incluyan [TIPO DE TEMA / REQUISITOS DE CONSISTENCIA].
```
Esto establece autoridad creativa. No le pedís a la IA que "intente" — la dirigís como un profesional dirige a un equipo.

### 2. CONTEXTO
**Fórmula:**
```
Ayudas a los usuarios a crear [TIPO DE CONTENIDO] potente y dinámico en
varias [CATEGORÍAS DE CONFIGURACIÓN]. Las imágenes incluyen
[REQUISITOS DE CONSISTENCIA DEL TEMA] en [DESCRIPCIONES DEL ENTORNO]
con puntos estratégicos, [ELEMENTOS DE ESTILO], entornos auténticos
y [CONDICIONES ATMOSFÉRICAS].
```
Le da a la IA la visión amplia: qué tipo de trabajo, qué estándares, uso previsto.

### 3. INSTRUCCIONES
Proceso paso a paso de interacción + requisitos técnicos:
1. Analizar la descripción del escenario del usuario
2. Determinar el contexto ambiental apropiado
3. Generar indicaciones maestras técnicamente precisas
4. [INTERNO] Activar protocolo de conteo de caracteres
5. [INTERNO] Verificar conteo dentro del límite
6. Garantizar resonancia emocional manteniendo coherencia
7. Presentar mensaje final con recuento de caracteres

### 4. RESTRICCIONES (límites absolutos y NO negociables)
- Debe incorporar [REQUISITO TÉCNICO PRINCIPAL]
- Debe utilizar [ELEMENTO VISUAL CLAVE]
- Debe incluir [REQUISITOS DE ESTILO / CONTEXTUAL]
- Debe transmitir [CUALIDADES EMOCIONALES / DE MARCA]
- Debe mantener [REQUISITOS DE CONSISTENCIA] en todas las imágenes
- **LÍMITES DE CARACTERES (verificado empíricamente 2026-07-14):**
  - Indicación de IMAGEN: tope real **5.000** caracteres con GPT Image 2 y **3.500** con Nano Banana. Es el prompt COMPLETO (alpha + product-dna + concepto + scaffolding), no solo el alpha. No hay margen de sobra — ver Ley 20.
  - Indicación de VIDEO Kling single-shot: máximo **2500** caracteres (no 1000 -- ese límite era de un modelo Seedance antiguo, Kling 3.0 acepta hasta 2500)
  - Alpha Prompt base ideal **1800-2500** chars (se pasa COMPLETO, sin compactar). El tope real del modelo es 5.000 con GPT Image 2 y 3.500 con Nano Banana (Ley 20), y el alpha comparte ese presupuesto con product-dna, el Concept (EN) y el scaffolding. Pasarse de 2500 dispara el compactado de emergencia, que **descarta ROLE, VISION, LIGHT, CAMERA y MATERIALS** y deja solo PALETTE/TYPOGRAPHY/CTA/NEVER: el motor de consistencia se apaga sin que nada falle en rojo.

### 5. EJEMPLOS
Mínimo 3-5 escenarios completos en acción. Cada ejemplo incluye su conteo final.

### 6. FORMATO DE SALIDA
Estructura cómo se entregan los resultados al usuario:
```
Indicación maestra:
[Su mensaje detallado aquí]

Número de caracteres: X/5000 imagen con gpt-image-2 (X/3500 con nano-banana)
```

---

## 4. Límites de caracteres — ABSOLUTOS

| Tipo | Máximo | Notas |
|---|---|---|
| Imagen | **5.000 caracteres** con gpt-image-2 · **3.500** con nano-banana | Alpha (1800-2500) + product-dna + concepto (~650) + scaffolding. Entra, pero sin holgura: respetá los rangos |
| Video Kling single-shot | **2500 caracteres** incluyendo espacios | Para 3 shots con HARD CUT TO syntax |

**Qué cuenta como 1 carácter:**
- Cualquier letra a-z, A-Z (incluido acentos: á, é, í, ó, ú, ñ)
- Cualquier dígito 0-9
- **Espacios entre palabras** ← crítico, no olvidar
- Puntuación (., ! ? ; : ' " -)
- Símbolos especiales (@ # $ % & *)
- Paréntesis y corchetes ( ) [ ] { }

**Errores comunes de conteo a evitar:**
1. Conteo incorrecto de espacios (`palabra1 palabra2` = 11, no 10)
2. Olvidar primer o último carácter
3. Omitir puntuación (`¡Hola, mundo!` = 13, no 11)
4. Errores matemáticos al sumar segmentos
5. No volver a contar después de ediciones

---

## 5. Estrategias de compresión

Cuando el prompt excede los límites, comprimir SIN perder los 3 pilares:

### Para imágenes (si el prompt se pasa del tope del modelo):
1. **Reemplazar frases con términos precisos**
   - "Iluminación de 45 grados que crea un triángulo" → "Triángulo de iluminación Rembrandt"
2. **Estilos de referencia por nombre**
   - "Temperatura color cálida con tonos dorados" → "Calidez de Kodak Portra 400"
3. **Combinar términos técnicos**
   - "Luz desde atrás que crea separación de bordes" → "Separación de luz retroiluminada"
4. **Eliminar redundancia** — quitar descriptores repetidos
5. **Consolidar detalles relacionados** — fusionar especificaciones técnicas similares

### Para video (>1000) — ULTRA-AGRESIVO:
1. **Especificaciones de cámara ultracomprimidas**
   - "Objetivo 85mm f/1.8 con poca profundidad de campo" → "85mm f/1.8 poca profundidad"
2. **Iluminación de una sola palabra**
   - "Luz cálida hora dorada desde atrás" → "luz dorada"
3. **Comprimir el movimiento**
   - "Cámara de mano con vibración natural" → "handheld natural"
4. **Eliminar lo no esencial** — cortar todas las palabras de relleno
5. **Priorizar jerarquía:** Tema → Acción → Iluminación → Cámara → Movimiento (cortar en orden inverso si es necesario)

---

## 6. Fórmula de entrada mínima viable (Master Prompt input)

Cuando el Alpha Prompt ya existe y se va a generar un master prompt para un ad específico:

```
Sujeto + Acción/Estado central + Contexto clave + Emoción deseada
= Indicación maestra detallada
```

Ejemplo input mínimo:
> "Una astronauta flota en gravedad cero dentro del módulo de la Estación Espacial, maravillada y aislada."

El sistema Alpha Prompt expande este input mínimo a un master prompt completo con todas las especificaciones técnicas.

### Desglose de componentes del input

- **Asunto (Qué):** "mujer astronauta" / "motocicleta clásica" / "café artesanal"
- **Acción/Estado (Qué hace):** "flotando en gravedad cero" / "estacionada en hora dorada" / "vertido a la luz de la mañana"
- **Contexto clave (Dónde/Cuándo):** "módulo ISS con Tierra visible" / "nubes de tormenta en horizonte" / "encimera rústica madera"
- **Emoción (Sentimiento):** "maravilla y aislamiento" / "libertad nostálgica" / "intimidad cálida"

---

## 7. Tubería de Alpha-Master (workflow profesional)

```
Indicación Alfa → Indicación Maestra → Imagen/Video Final
```

**Paso 1: Crear Alpha Prompt (base de estilo)** — una vez por marca/proyecto
1. Describí estilo visual en detalle
2. Adaptá usando plantilla Alpha (6 componentes)
3. Probá e iterá (2-3 generaciones hasta que coincida con visión)

**Paso 2: Usar fórmula entrada mínima viable** — por ad
- Alpha Prompt provee estilo
- Input usuario provee detalles específicos del ad

**Paso 3: Refinar Master Prompts**
- Regla crítica: SIEMPRE decir "reescribe el mensaje completo para incluir [tus cambios]"
- NUNCA decir simplemente "ajusta esta imagen" — pierde la estructura del master

**Paso 4: Extraer estilos de prompts existentes** — si ya tenés masters sólidos
- Identificá elementos técnicos consistentes
- Capturá referencias recurrentes y anclas de estilo
- Capturá patrones de intención emocional
- Asegurate que los patrones extraídos quepan en límites de caracteres

**Paso 5: Estructura piramidal**
- 1 Alpha → Múltiples Masters → Imágenes infinitas

---

## 8. Ejemplo real — Alpha Prompt de Beckett Simonon

Para entender qué forma toma un Alpha Prompt funcional, ver el archivo:
`DEEPLOOK RESEARCH AGENT/output/beckett-simonon/brand/alpha-prompt.txt`

**Estructura de las 5 capas observadas (versión condensada del framework):**

1. **Capa 1 — Photography style + lighting + lens**
   - Ejemplo: "Premium handcrafted leather footwear photography in editorial menswear style (Kinfolk/Cereal Magazine aesthetic). Soft diffused natural window light at 3200K-4500K warm color temperature, directional from 45 degrees left..."

2. **Capa 2 — Color palette (con hex codes específicos)**
   - Ejemplo: "Dark Green #2C3B33 — primary: CTAs, buttons, headline text on light backgrounds; Off-white #F5F2ED — backgrounds; Warm cognac/bordeaux — the leather itself; Rich earth tones with warm undertones throughout"

3. **Capa 3 — Typography**
   - Ejemplo: "Elegant serif 'Alverata' for headlines — refined, classic, not trendy. Clean sans 'Underground' for body. White text on dark, dark green text on light. Always understated."

4. **Capa 4 — Product styling (qué tiene que mostrar el producto)**
   - Ejemplo: "Must show authentic full-grain leather texture with visible grain, precise Blake stitching detail, and natural patina development. Cedar shoe trees with gold knobs visible when appropriate. Products always shown in pairs."

5. **Capa 5 — Surfaces & backgrounds + Personality + CTA + NEVER**
   - Surfaces: "Warm oak wood, cream linen, Italian marble, aged concrete, dark stone. Never busy patterns or synthetic materials."
   - Personality: "Approachable luxury — refined but not pretentious, artisanal but not rustic, detailed but not clinical."
   - CTA style: "Dark green #2C3B33 rectangular button with slight rounded corners (6px), white all-caps text."
   - NEVER: "Harsh flash. Cold blue tones. Bright saturated neon colors. Cluttered compositions. Overly posed stiff models. Fast-fashion aesthetic. Cheap synthetic backgrounds. Discount-first messaging."

**Total Beckett alpha-prompt.txt:** ~1600 caracteres — se pasa COMPLETO (sin compactar), y a ese tamaño deja espacio cómodo para el concepto + product-dna + layout dentro del tope de 5.000.

---

## 9. Reglas críticas para el skill `/produccion-anuncios`

### Al sintetizar un Alpha Prompt nuevo (LLM call):

1. **Los 3 pilares no son opcionales** — toda síntesis debe cubrir Estructura + Referencia + Visión. Si el LLM solo describe colores, está mal.

2. **Capa NEVER es obligatoria** — siempre incluir 5-8 exclusiones explícitas. Es el control de calidad.

3. **Hex codes específicos**, no nombres genéricos (`#2C3B33`, no "verde oscuro").

4. **Referencias de estilo nombradas** — Kinfolk / Vogue / Helmut Newton / Kodak Portra. Si la marca es contemporánea pero el LLM solo dice "editorial", está incompleto.

5. **Alpha Prompt 1800-2500 caracteres** — se pasa completo. Con product-dna (100-150 palabras) + Concept (EN) (~650) + scaffolding, el total entra en el tope real de 5.000 de GPT Image 2. Si `build-jobs.py` avisa que compactó, **el arreglo es acortar el alpha**, no subir el tope: una sola edición arregla las 30 celdas.

6. **No contradecir las "never rules"** del card-config.json si existe — el alpha-prompt no puede promover lo que la marca prohíbe.

7. **Lenguaje del Alpha Prompt: INGLÉS** — aunque el resto del workflow estudiante sea español, los modelos de imagen funcionan mejor con prompts en inglés (regla DEEPLOOK confirmada).

8. **Iteración esperada: 2-3 rondas** — el primer Alpha generado nunca es el final. Diseñar el skill con loop de refinamiento.

9. **Consultar `reference/alpha-library/` antes de sintetizar — vía el subagente delegado del Paso 10a de `SKILL.md`, no inline.** No free-handear vocabulario/referencias/plantilla de sector — para el mecanismo completo, ver `SKILL.md` Paso 10a (no se repite acá).

### Al componer un Master Prompt (per ad):

1. Heredar TODAS las capas del Alpha Prompt (no resumirlas).
2. Agregar: layout específico del ad + hook copy + producto específico + CTA.
3. Verificar conteo total ≤ 5000 imagen con gpt-image-2 (≤ 3500 con nano-banana). `build-jobs.py` lo imprime por celda.
4. Si excede: aplicar estrategias de compresión (sección 5) priorizando preservar los 3 pilares.

---

## 10. Plantillas intersectoriales (cross-sector adaptations)

**Tabla completa movida a `reference/alpha-library/sectors.md`** (16 sectores, con columna adicional de referencias nombradas) — consultar ahí, no acá. Las 6 filas originales de este framework siguen presentes ahí, enriquecidas.

**Algoritmo de lookup (cuándo usar `sectors.md` vs. el resto de la carpeta):** ver `alpha-library/INDEX.md` — esa es la única fuente del algoritmo, no se repite acá.

---

## 11. Lista de verificación final (antes de entregar)

- [ ] ¿El Alpha Prompt cubre los 3 pilares (Estructura / Referencia / Visión)?
- [ ] ¿Está estructurado en los 6 componentes (Role / Context / Instructions / Restrictions / Examples / Output Format)? Para Alpha simplificado tipo Beckett, ¿están las 5 capas observables?
- [ ] ¿El prompt completo entra en 5.000 caracteres (gpt-image-2) o 3.500 (nano-banana)?
- [ ] ¿Incluye sección "NEVER" con 5-8 exclusiones explícitas?
- [ ] ¿Usa hex codes específicos para colores (no nombres genéricos)?
- [ ] ¿Cita al menos 1 referencia de estilo nombrada (Kinfolk / Kodak Portra / artista específico)?
- [ ] ¿Está en inglés (regla DEEPLOOK)?
- [ ] ¿Las "never rules" del Alpha no contradicen las del card-config.json (si existe)?
- [ ] ¿Tiene headroom (~500-700 chars libres) para que el master prompt agregue hook + producto + layout?

---

**Fin del destilado operacional.**

Para casos edge o referencia completa: consultar PDF original en `DEEPLOOK RESEARCH AGENT/reference-docs/Alpha Prompt_ Framework ESPAÑOL.pdf`.
