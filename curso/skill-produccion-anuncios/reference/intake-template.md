# Intake template — Modo sin web (estudiantes WhatsApp/IG)

Cuando el estudiante **NO tiene página web**, no se corre `escanear-marca` (no hay sitio que scrapear). En su lugar, sus respuestas del formulario del sorteo + sus fotos arman el `marca-cliente.json` directamente. Este archivo define cómo.

## Inputs que llegan del formulario (texto) + del ganador (fotos)
- `nombre_marca` — del form
- `instagram` — del form (@usuario; opcional)
- `whatsapp` — del form (= el CTA de los anuncios)
- `pais` — del form (→ AD_LANG + dialecto)
- `producto_principal` — del form ("¿Qué vendes?")
- `precio` — del form ("¿Cuánto cuesta?")
- `avatar` (quién compra) — del form ("¿Quién te compra?")
- `descriptores` de tono — del form ("Tu marca en 3 palabras")
- `diferenciadores` — del form ("¿Qué te hace diferente?")
- **3-6 fotos de producto** — las manda el ganador → `input/product-photos/`

## Cómo construir `marca-cliente.json` desde el intake (LLM)
Llená el schema estándar (mismo que `escanear-marca`) así:
- `nombre_marca`, `producto_principal`, `precio`, `redes_sociales.instagram` → directo del form.
- `tono_y_voz.descriptores` → las 3 palabras del form; los 6 ejes → estimá del tono + producto.
- `avatar.deseos_reiss` (3) → **inferir** del producto + "quién te compra" + diferenciadores (los 16 deseos de Reiss; elegí los 3 que la marca activa, con evidencia citando el intake).
- `avatar.rango_edad / profesion / pain_point / aspiracion` → del campo "quién te compra" + producto.
- `nivel_consciencia.dominante` → estimá (default "Producto" para e-commerce/venta directa; "Solución" si es categoría nueva).
- `tipo_oferta` → "producto físico" / "e-commerce" / "servicio" / "info" según lo que venda (ojo: define el gate del validador para servicios).
- `propuesta_valor` → 1 frase del producto + diferenciadores.
- `garantia` → si el intake la menciona; si no, `null`.
- `identidad_visual`:
  - **Paleta + estilo de imagery → de SUS FOTOS, no de CSS.** Mirá las fotos del estudiante (`Read`) y deducí la paleta real (hex aproximados) + el vibe. NO corras `extract-brand-identity.js` con `--url` (no hay web). El alpha-prompt (Paso 10b) usa esos colores observados.
  - `tipografia_*` → si no se sabe, usá una sans/serif neutra coherente con el vibe (o lo que se vea en sus fotos/IG).
- **NO inventes datos** que el estudiante no dio. Si falta algo crítico (ej. precio), preguntáselo al ganador junto con las fotos.

## CTA
El CTA de TODOS los anuncios = su **WhatsApp** (botón "Escríbenos por WhatsApp" / "Pídelo por WhatsApp"). No hay web a la cual mandar.

## Fotos (gate de visión — Paso 9, igual de obligatorio)
Las fotos del estudiante son amateur y variadas → **verificá con visión cada una** antes de usarla como `Reference` (¿es el producto correcto?, ¿se ve usable?). El i2i re-compone el producto en escena de marca, así que un fondo feo sirve; pero descartá fotos borrosas/ambiguas. Si una foto no sirve, no la uses (mejor menos celdas con producto que producto malo). *(La skill futura "iPhone → foto de estudio" limpiará estas fotos antes de este paso.)*

## Qué SÍ corre igual
- **`diversificacion-creativa` (Felipe MCP) corre normal** — lee el `marca-cliente.json` que armaste del intake (no necesita web). Devuelve los 30 hooks.
- Todo lo de abajo (conceptos-30 → parse → build → validate → render → Excel) es idéntico.
