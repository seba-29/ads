# Alpha Library — Índice / Router

Esta carpeta es una biblioteca de referencia AMPLIADA para sintetizar Alpha Prompts (Paso 10a, subagente delegado) y para corregir renders puntuales (Paso 14). **No es de lectura obligatoria completa.** Leé este índice primero, decidí cuáles 1-3 archivos son relevantes para ESTA marca/situación, y leé solo esos. El archivo base del skill sigue siendo `reference/alpha-prompt-framework.md` (3 Pilares, arquitectura de 6 componentes, límites de caracteres) — esta carpeta lo complementa, no lo reemplaza.

**Quién ejecuta este lookup (v3):** un subagente delegado, no el orquestador — ver `SKILL.md` Paso 10a para el mecanismo completo (no se repite acá). El Paso 14 (QC) sí lo consulta directo el orquestador.

---

## Qué hay en cada archivo

| Archivo | Contenido | Cuándo leerlo |
|---|---|---|
| **`sectors.md`** | Tabla expandida de sectores/industrias (16 filas: deportes de aventura, editorial de moda, producto lujo/tech/sostenible, surreal/conceptual, clínico/dental, arquitectura, etc.) con role base + restricciones + referencias nombradas por sector | Paso 10a (subagente), SIEMPRE como primer intento: la marca del estudiante, ¿encaja en alguna fila? |
| **`custom-style-workflow.md`** | Metodología de 5 pasos para construir un Alpha Prompt desde cero (brief → tensiones de estilo → construcción → prueba → documentación) | Paso 10a (subagente), SOLO si ninguna fila de `sectors.md` encaja limpiamente (caso frecuente con marcas chicas únicas) |
| **`glossary.md`** | Vocabulario técnico nombrado, 5 secciones: **§1** iluminación (Rembrandt, butterfly, split...) · **§2** composición (regla de tercios, líneas guía...) · **§3** materiales/texturas · **§4** cámara/lente · **§5** color/temperatura | Paso 10a (subagente), para reemplazar lenguaje vago por términos precisos — ir directo a la sección numerada que aplica, no todo el archivo |
| **`named-references.md`** | Fotógrafos/cineastas/artistas, movimientos culturales, stocks de película/cámaras, publicaciones — anclas de estilo citables. Complementa (no repite) el Pilar 2 de `alpha-prompt-framework.md` | Paso 10a (subagente), cuando el Alpha necesita una referencia nombrada y las ya listadas en el framework base no encajan |
| **`refinement-cheatsheet.md`** | Decisión iterar-vs-pivotar, escalera de refinamiento, recetario de keywords por defecto específico (look plástico, iluminación plana, artefactos de IA, logo distorsionado...) | Paso 14 (QC), cuando una imagen puntual del lote de 30 necesita un fix dirigido |
| **`_source-archive/`** | Copias verbatim de las **6** fuentes originales de investigación de Santiago. (`VIDEO PRODUCTION.md` existía en la versión interna pero **NO viaja en este paquete**: video está fuera de alcance de este skill.) | Solo si necesitás el detalle original completo de algo que los archivos de arriba condensaron; no es parte del flujo normal |

---

## Cómo hacer el lookup (Paso 10a — subagente de investigación delegado)

1. Mirá `marca-cliente.json.tipo_oferta` + `producto_principal` + la estética real (fotos/IG/packaging, no el sitio — ver regla "Web bg ≠ Ad aesthetic" del SKILL.md).
2. Buscá esa categoría en `sectors.md`. Si hay match claro (aunque sea parcial, ej. "vende ropa deportiva" → Deportes de aventura o Atlética) → leé ESA fila, y si señala un `glossary.md`/`named-references.md` puntual (ej. vocabulario de surf), leé también esa sección específica.
3. Si NO hay match — la marca vive en el hueco entre categorías, o mezclarías dos filas contradictorias — usá `custom-style-workflow.md` en su lugar (reemplaza a `sectors.md` para esa síntesis, no lo complementa).
4. Independiente del camino 2 o 3: si el Alpha resultante suena genérico ("iluminación profesional", "colores agradables"), volvé a `glossary.md` y `named-references.md` para reemplazar esas frases por términos nombrados y precisos — la sección numerada correcta, no el archivo completo (ver tabla arriba).

## Cómo hacer el lookup (Paso 14 — QC de las 30 imágenes)

Si una imagen específica falla el QC por una razón técnica identificable (no por integridad de marca — esas van por las Leyes del skill, no por acá): abrí `refinement-cheatsheet.md`, buscá el defecto en el recetario, aplicá el fix al concepto de ESE ad, y re-renderizá solo ese ad (`--only ad-NN`). No es de lectura preventiva — solo se abre cuando ya hay un defecto puntual que corregir.

---

## Regla de mantenimiento (centralizada — cubre los 5 archivos de contenido)

- **Este archivo (`INDEX.md`) es el ÚNICO dueño del algoritmo de lookup** (secciones "Cómo hacer el lookup" arriba). `alpha-prompt-framework.md` §10 y `SKILL.md` Paso 10a/14 solo apuntan acá — si el algoritmo cambia (ej. nueva condición de fallback), editalo SOLO acá.
- Si se agrega contenido nuevo a la carpeta, agregar también su fila en la tabla de arriba (archivo + contenido + cuándo leerlo) — un archivo sin entrada acá no es descubrible por el flujo del skill.
- Cada archivo de contenido tiene su propia nota de mantenimiento al pie (formato/columnas específicas de ese archivo) — esta regla es la capa de arriba, no las reemplaza.
- Un archivo nunca debe apuntar a una sección de otro archivo que no existe — si agregás un pointer cruzado (ej. "ver `glossary.md` sección X"), verificá que esa sección exista antes de guardar.
- `sectors.md` y `custom-style-workflow.md` comparten el mismo mecanismo de consistencia (Firma Técnica = Pilar 1 explícito) — si se ajusta ese patrón, actualizar ambos archivos, no solo uno.
