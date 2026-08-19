# Custom Style Workflow — Construcción de Alpha Prompt desde cero

Se consulta vía `INDEX.md` cuando la marca del estudiante NO encaja limpiamente en ninguna fila de `sectors.md` (caso frecuente: la mayoría de marcas de Felipe son negocios chicos únicos, no "moda" o "automotriz" genéricos). Este archivo reemplaza a `sectors.md` para esa síntesis — no lo complementa.

---

## Cuándo usar este flujo

Usar `custom-style-workflow.md` en vez de `sectors.md` cuando la marca vive en el hueco entre categorías — no es claramente lujo, ni clínica, ni editorial, ni ninguna plantilla pre-armada. Señal típica: al intentar ubicarla en un sector, el LLM tiene que forzar el encaje o mezclar dos sectores contradictorios (ej. "clínico" + "cálido de consumo"). Si eso pasa, construir el Alpha Prompt a medida con los 5 pasos de abajo.

---

## Paso 1 — Análisis del brief

Extraer del intake/scan de la marca (scan de marca-cliente.json, sitio web, brief del estudiante):

1. **Referencias visuales que le gustan** — cuentas de Instagram, fotógrafos, marcas competidoras que admira, moodboards que mandó.
2. **Competidores directos** — cómo lucen visualmente hoy (para NO parecerse a ellos, o para superarlos).
3. **Qué NO quiere explícitamente** — esto es oro: si el estudiante dice "no quiero que se vea como X", eso define media Capa NEVER del Alpha Prompt.
4. **Cliente objetivo** — quién compra, rango de edad, qué valora (calidad, precio, estatus, salud, etc.).
5. **Nivel de precio / posicionamiento** — económico, medio, premium, lujo. Esto determina la calidad de materiales/luz/composición que el Alpha debe prometer.

Traducir cada requisito de marca a keywords visuales concretas (mapeo palabra-de-negocio → elemento-visual). Ejemplo del mapeo:
- "precisión clínica" → texturas detalladas, representación precisa, iluminación profesional
- "estética accesible" → subtonos cálidos, elementos humanos, momentos auténticos
- "innovación" → técnicas contemporáneas, materiales sofisticados, herramientas de vanguardia

No avanzar al Paso 2 sin al menos 3-4 keywords visuales concretas por cada requisito de marca.

---

## Paso 2 — Identificar tensiones de estilo

La marca que no encaja en un sector casi siempre vive en una tensión entre dos polos aparentemente contradictorios. Ahí está la oportunidad de un estilo verdaderamente propio — no es un problema a evitar, es lo que hay que resolver explícitamente.

Tensiones típicas a buscar:
- Profesional vs. accesible/cálido
- Lujo vs. asequible
- Preciso/técnico vs. humano/auténtico
- Minimalista vs. expresivo
- Serio/creíble vs. divertido/cercano

**Cómo resolver una tensión (no promediarla, integrarla):** no busques el punto medio genérico ("medio profesional, medio cálido") — define CÓMO conviven ambos polos en la misma imagen. Ejemplo: "iluminación clínica CON calidez" no es "iluminación tibia" — es luz técnica y precisa (calidad/dirección/temperatura de color exactas) que además incluye un elemento cálido deliberado (temperatura de color un poco más cálida de lo clínico-estándar, o un elemento humano en cuadro). La resolución debe ser específica y ejecutable, no un adjetivo doble.

Escribir 2-4 tensiones clave antes de tocar el Alpha Prompt. Si no hay tensión identificable, probablemente la marca SÍ encaja en un sector de `sectors.md` — reconsiderar si este flujo es necesario.

---

## Paso 3 — Construir el Alpha Prompt custom

Mapear las tensiones resueltas del Paso 2 dentro de la arquitectura de 6 componentes de `alpha-prompt-framework.md` (Role / Context / Instructions / Restrictions / Examples / Output Format):

1. **Role** — no reciclar una categoría existente ("fotografía médica", "fotografía de producto"). Nombrar una categoría nueva que exprese la resolución de la tensión: "Director de Fotografía Clínica-Dental" en vez de "fotógrafo médico" o "fotógrafo de producto".
2. **Context** — describir el tipo de contenido y escenarios integrando ambos polos de la tensión en la misma frase (ej. "entornos clínicos y de estilo de vida", "iluminación clínica que crea una estética nítida y profesional" + "transmite autenticidad y confianza").
3. **Instructions** — proceso paso a paso estándar (ver `alpha-prompt-framework.md` sección 3.3).
4. **Restrictions** — cada tensión del Paso 2 se convierte en una restricción explícita ("Debe incorporar [polo técnico]" + "Debe transmitir [polo humano]"). Incluir siempre la Capa NEVER (5-8 exclusiones) — es el control de calidad y suele nacer directo del "qué NO quiere" del Paso 1.
5. **Examples** — mínimo 3-5 escenarios (ver Paso 4).
6. **Output Format** — estándar del framework (indicación maestra + conteo de caracteres).

**Firma Técnica (Technical Signature Definition):** no es un componente nuevo — es Pilar 1 (Estructura) hecho explícito y obligatorio como ancla de consistencia (útil siempre, no solo en este flujo custom: `sectors.md` también la pide al personalizar una fila). Definir un dispositivo visual recurrente y distintivo, único de esta marca, en 3 sub-líneas concretas:
- **Filosofía de iluminación** — tipo de luz + cómo resuelve la tensión (ej. luz de anillo o difusa que da dimensión sin sombras duras, manteniendo temperatura de color consistente).
- **Enfoque de cámara** — lente + apertura + distancia específicos (ej. macro f/8-f/16 para foco completo en toda la estructura).
- **Representación de materiales** — qué textura/imperfección/autenticidad debe verse siempre (ej. patrones de desgaste reales, variaciones naturales, evidencia genuina de uso).

Esta Firma Técnica es lo que se repite en TODO master prompt derivado de este Alpha — es el ancla de consistencia entre imágenes.

---

## Paso 4 — Probar y refinar

Generar 2-3 master prompts de prueba que cubran escenarios distintos de uso de la marca (ej. producto solo, producto en uso profesional, producto en contexto de consumidor) — no repetir el mismo tipo de toma.

Para cada prueba, evaluar contra criterios explícitos derivados de las tensiones del Paso 2 (ejemplo real: "¿tiene precisión clínica con materiales accesibles?", "¿la textura se ve auténtica y premium a la vez?", "¿la iluminación realza en vez de esterilizar?", "¿la integración de marca se siente natural y sofisticada?").

Si una prueba falla un criterio, es un defecto puntual (iluminación muy fría, composición muy rígida, etc.) — para CÓMO corregir defectos específicos sin reconstruir el Alpha entero, consultar `refinement-cheatsheet.md`. No duplicar esa lógica acá.

Regla operativa: el primer Alpha Prompt generado nunca es el final — diseñar el ciclo con 2-3 rondas de refinamiento esperadas antes de fijar la versión final que va a `alpha-prompt.txt`.

---

## Paso 5 — Documentar el estilo

El resultado final de este flujo no es solo el Alpha Prompt en sí — es un mini style-guide que se traduce directamente en los archivos reales del skill (`alpha-prompt.txt`, `product-dna.txt`, `voice-dna.txt`). Documentar:

- **Core Style DNA** — Firma Técnica (del Paso 3) + ADN Visual (materiales/imperfecciones/nivel de presentación) + Tono Emocional (cómo se resuelve la tensión en una frase).
- **Key Differentiators** — 3-4 bullets de qué hace este estilo reconocible frente a competidores (esto alimenta la Capa NEVER y el Pilar Referencia).
- **Application Guidelines** — en qué tipos de pieza aplica cada variante (producto solo / uso / educativo / lifestyle) — mapea a los distintos escenarios que luego arman los 30 conceptos de la matriz.

Este documento (aunque sea informal, 10-15 líneas) es lo que evita que el segundo estudiante que use este estilo tenga que re-derivar todo el razonamiento del Paso 1-4 — queda capturado en los archivos de marca.

---

## Ejemplo ilustrativo condensado — Ohneis Dental

**Brief:** marca premium de equipos e higiene dental. Necesita verse creíble para profesionales Y accesible para consumidores — la fotografía dental genérica siempre cae en "clínica y fría" o "casual y poco creíble".

**Tensiones identificadas:**
- Precisión clínica vs. accesibilidad de consumidor
- Credibilidad profesional vs. calidez cercana
- Precisión técnica vs. autenticidad humana
- Limpieza estéril vs. estética invitante

**Resolución:** no promediar — mantener ambos polos simultáneos y explícitos.

**Fragmento de Alpha Prompt resultante:**

> **Role:** "Act as a world-class Clinical Dental Photography Director specialized in creating high-resolution, realistic imagery with meticulous attention to detail and authentic representation of dental health."
>
> **Restrictions (clave):** "Must incorporate clinical lighting techniques. Must include authentic dental elements. No artificially perfect shots — must capture realistic details including minor imperfections. Must include subtle warmth in lighting and composition that makes clinical precision feel approachable rather than intimidating, while maintaining professional credibility." *(esta última línea se agregó en la ronda de refinamiento del Paso 4, tras detectar que las primeras pruebas salían demasiado clínicas/frías.)*
>
> **Firma Técnica:** iluminación de anillo o difusa (dimensión sin sombras duras) + macro f/8-f/16 (foco total en la estructura) + textura hiperrealista con desgaste e imperfecciones naturales visibles.

**Resultado:** un estilo que ni sus competidores clínicos ni los de producto genérico pueden replicar fácil, porque nace de la tensión específica de Ohneis, no de una plantilla de sector.
