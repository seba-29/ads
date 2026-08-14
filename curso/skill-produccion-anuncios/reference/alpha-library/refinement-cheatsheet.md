# Refinement Cheatsheet — Fixes Quirúrgicos para Paso 14

Consultar SOLO durante **Paso 14 (QC visual)** cuando una imagen específica del lote de 30 queda marcada con un problema y hay que decidir cómo corregirla. No se carga por defecto en cada corrida — se llega acá vía `INDEX.md`.

Fuente: `MASTER PROMPT GENERATION.md` (Strategic Image Refinement) + `PROFFESIONAL PROMPT ENGINEERING.md` (Bulletproof Commands) + `STYLE CATEGORY AND APPLICATION.md` (Common AI Challenges, fixes genéricos).

---

## 1. Decisión: iterar vs. pivotar

No todas las imágenes marcadas valen la pena de iterar. Antes de tocar el prompt, clasificar el defecto:

| Señal | Iterar (ajuste de keywords) | Pivotar (cambiar concepto/approach) |
|---|---|---|
| Concepto base | Funciona, falta ajuste técnico | La IA malinterpreta la idea repetidamente |
| Calidad actual | Estilo/mood ~70%+ correcto | Resultado completamente fuera de marca/estilo |
| Camino de arreglo | Podés nombrar exactamente qué keyword lo arregla | No hay keyword clara — probaste 2-3 rondas sin mejora |
| Historial de intentos | 1ª o 2ª ronda | 5+ iteraciones sin progreso, o cada cambio arregla algo y rompe otra cosa |
| Artefactos | Localizados (una mano, un texto) | Sistemáticos — el modelo no puede resolverlos con keywords |

**Regla rápida:** si podés señalar la palabra exacta que falta, iterá. Si ya intentaste eso y sigue mal, subí un escalón (ver sección 2). Si estás en el escalón 4, dejá de pelear con el prompt y simplificá el concepto.

---

## 2. La escalera de refinamiento

Probar el escalón 1 SIEMPRE antes de saltar a soluciones drásticas. No reescribir el master prompt completo por un problema puntual.

| # | Nivel | Cuándo usar | Acción |
|---|---|---|---|
| 1 | **Inyección de keywords** | Primera respuesta a cualquier defecto | Agregar términos técnicos específicos (ver Recetario, sección 3) al concepto/master prompt existente |
| 2 | **Integración de referencia** | Las keywords no alcanzan | Usar imagen de referencia para transferir un elemento puntual (iluminación, composición, color) — ver plantilla abajo |
| 3 | **Reestructuración** | El enfoque técnico necesita cambio de fondo | Reordenar jerarquía del prompt, ajustar specs de cámara/luz, modificar dirección de estilo |
| 4 | **Pivote** | Nada de lo anterior funcionó | Simplificar el concepto a su elemento visual más fuerte, cambiar ángulo/lente/luz, o cambiar de escena por completo |

**Plantilla de integración de referencia (nivel 2):**
> "Usando el [elemento: iluminación / composición / paleta] de la referencia, generá [sujeto/escena del ad], reemplazando el sujeto de la referencia pero manteniendo [aspecto específico a replicar]."

**Regla de reescritura:** ver `alpha-prompt-framework.md` sección 7 Paso 3 — aplica igual acá al reinyectar cualquier fix.

---

## 3. Recetario por defecto específico

Cada fila: qué se ve mal → keyword/frase exacta a AGREGAR al concepto o master prompt (no reemplaza el prompt entero, se inyecta).

| Defecto | Agregar (copy-paste) |
|---|---|
| **Look plástico / artificial** (piel demasiado lisa, superficies sin imperfección) | `"natural surface imperfections", "micro-scratches and wear patterns", "authentic material aging", "subtle asymmetry for realism", "film grain texture (35mm Kodak Portra 400 style)", "photorealistic skin texture with visible pores"` |
| **Iluminación plana / aburrida** | `"dramatic chiaroscuro with deep shadows", "strong rim lighting separation", "volumetric lighting with god rays", "specular highlights on reflective surfaces", "light falloff creating depth"` |
| — Muy oscura | `"increased fill light ratio", "ambient lighting boost", "reflector fill from camera left"` |
| — Muy quemada/clara | `"reduced key light intensity", "deeper shadows for contrast", "gradual light falloff"` |
| — Dirección incorrecta | `"reposition key light to 45° camera right"`, `"backlight for rim effect"`, `"side light for texture"` |
| **Composición débil** (sujeto centrado sin fuerza, sin jerarquía visual) | `"rule of thirds placement", "strong leading lines", "dynamic diagonal composition", "negative space emphasis", "foreground elements for depth"` |
| — Sujeto se pierde en el fondo | `"shallow depth of field isolation", "rim lighting subject separation", "contrasting background tone", "bokeh background blur"` |
| **Artefactos de IA — manos/dedos malformados** | `"anatomically correct hands with five fingers", "hands naturally positioned", "hands holding [objeto específico]", "avoid intertwined fingers"` |
| **Artefactos de IA — texto roto / logo/wordmark deformado** (problema conocido del skill, ver `Paso 14` en `SKILL.md`) | Texto genérico de escena: `"clean surfaces without text", "remove all typography", "blank signage", "text-free environment"` + negative prompt `"--no text, words, letters, typography, logos, watermarks, signatures"`. **Wordmark de marca específicamente:** la corrección de keywords rara vez alcanza — la IA no "sabe deletrear" un logo real. Ir directo a nivel 2 (integración de referencia con el asset de marca real) o, si el skill lo soporta, dejar el wordmark fuera de la escena generada y componerlo en post |
| **Colores desaturados / apagados sin querer** | `"increased color saturation matching brand palette [#HEX]"`, `"prevent oversaturation"` (si se pasó al otro lado), `"accurate color reproduction maintaining brand color specifications"`, `"lighting balanced to reveal true product colors without color shifts"` |
| **Producto no fiel a la referencia** (forma, color, proporciones distintas al producto real) | Nivel 2 obligatorio — inyectar imagen de referencia real del producto + `"maintain exact product proportions and color from reference"`, `"natural product placement with appropriate shadow integration"`. Las keywords solas no alcanzan cuando el problema es fidelidad de producto — este es un caso donde saltar directo a integración de referencia es más eficiente que iterar en nivel 1 |

**Comandos de refuerzo generales (bulletproof commands, usar cuando el defecto no encaja en ninguna fila de arriba):**
- Foco/nitidez: `"tack-sharp focus"`, `"selective focus on [elemento]"`, `"no motion blur"`
- Consistencia de serie: `"match lighting from previous"`, `"consistent color palette throughout"`
- Guardas de distorsión: `"no lens distortion"`, `"preserve geometric accuracy"`, `"avoid facial distortions"`

**Desafíos sector-específicos** (deportes de acción, moda, arquitectura, conceptual) — ver `sectors.md` para el detalle; acá solo aplican los fixes cross-sector de arriba.

---

## 4. Conexión con el mecanismo de retry del skill

El skill ya soporta re-render selectivo — no hay que regenerar el lote completo de 30 por un fix puntual:

```bash
cd "<student_folder>" && bash "<SKILL_DIR>/scripts/run-all-ads.sh" --only ad-NN
```

Esto re-renderiza solo el/los ad(s) indicados (lista separada por comas: `--only ad-05,ad-12`), respetando los PNGs ya válidos del resto. El camino eficiente en Paso 14 es: identificar el defecto → aplicar el fix de este recetario al concepto/master prompt de ESE ad → correr `--only ad-NN` → volver a mirar. Nunca un re-render ciego de todo el lote por un problema localizado.

---

**Nota de mantenimiento:** ver la nota centralizada en `INDEX.md`. Específico de este archivo: cada defecto nuevo va como una fila más en la sección 3 (defecto → keyword exacta a agregar); desafíos sector-específicos van en `sectors.md`, no acá.
