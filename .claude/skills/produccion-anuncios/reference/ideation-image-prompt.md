# Ideación — 30 imágenes estáticas (matriz Felipe)

Esta referencia explica cómo Claude (la skill) **escribe los 30 conceptos** de la matriz creativa de Felipe en el archivo `conceptos-30.md`. Es el ÚNICO paso de variación creativa: aquí se inventa la escena de cada celda. El resto (alpha-prompt, logo, product-DNA, sufijo de composición) lo inyecta `kie_build_layered_prompt` de forma idéntica en las 30 — eso es lo que garantiza la consistencia de marca.

> ⚠️ NO incluyas el alpha-prompt en el concepto de cada celda. Se antepone automáticamente en el render. Tú solo escribes la **Capa 3** (la escena + el texto-en-imagen).

---

## La matriz: 3 deseos × 2 perfiles × 5 niveles = 30

Sale de `diversificacion-hooks.html` (Felipe `diversificacion-creativa`). Cada celda = 1 imagen, con su hook ya escrito por Felipe. Estructura confirmada:

- **3 Deseos de Reiss** (ej. Estatus social, Ahorro, Idealismo) — definen el MUNDO VISUAL.
- **2 Perfiles** (ej. A — El Conocedor / B — El Profesional Joven) — definen QUIÉN aparece (tipo demográfico).
- **5 Niveles de consciencia** (Inconsciente, Problema, Solución, Producto, Decisión) — definen la VISIBILIDAD del producto y el TONO.

Cada bloque de deseo = 10 celdas (2 perfiles × 5 niveles).

---

## La fórmula de 4 capas (celda → escena)

Cada concepto se construye con 4 capas:

**Capa 1 — Mundo Visual del Deseo:** entorno, iluminación y props que hacen que la imagen SE SIENTA como ese deseo. (Sale de `marca-cliente.json` + tu lectura de la marca. Ej. Idealismo de un calzado → taller artesanal, luz natural lateral, manos trabajando el cuero.)

**Capa 2 — Sujeto del Perfil:** la persona que aparece coincide con el tipo demográfico del perfil (edad, contexto). Ver **regla de casting variado** abajo.

**Capa 3 — Lente de Consciencia** (controla visibilidad del producto Y la intensidad emocional):

| Nivel | Producto visible | Tono |
|---|---|---|
| **Inconsciente** | NO visible — solo emoción/problema/contexto de vida | pattern-interrupt (ángulo inesperado que frena el scroll) |
| **Problema** | ausente o apenas visible — escena de dolor/frustración | provocativo (amplifica el dolor) |
| **Solución** | apareciendo/descubriéndose por primera vez — momento de transición | seductor (el "ajá", alivio) |
| **Producto** | en uso activo — escena del beneficio sucediendo | específico (prueba concreta, detalles, números) |
| **Decisión** | producto + evidencia (resultados, prueba social, garantía) | urgente (prueba social, garantía) |

**Capa 4 — Composición:** ángulo de cámara y estructura visual (de la paleta de 14 abajo).

---

## Visibilidad del producto por nivel (regla dura)

- **Inconsciente, Problema (niveles 1–2):** `Has Product: no`. SIN línea `**Reference:**`. NO menciones fotos de producto.
- **Solución, Producto, Decisión (niveles 3–5):** `Has Product: sí`. Línea `**Reference:**` OBLIGATORIA apuntando a las fotos reales. El producto se reproduce fiel desde las fotos.

---

## Regla de casting variado (CRÍTICA)

El "perfil" es un **tipo demográfico, no una cara fija**. Para que las 30 imágenes no muestren a la misma persona:

- Cada celda que muestre a una persona describe a un **individuo DISTINTO** dentro de la banda del perfil (ej. Perfil A 35–50 → "un hombre de unos 40 con barba recortada" en una celda, "un ejecutivo canoso de unos 50" en otra).
- **Nunca repitas la misma descripción demográfica** dentro de un mismo bloque de deseo.
- **Aplica INCLUSO dentro del mismo perfil a través de los 5 niveles** (Inconsciente→Problema→Solución→Producto→Decisión). Un perfil **NO es un personaje recurrente** que atraviesa el funnel — NO armes "la misma persona en sus 5 etapas" buscando continuidad narrativa. Cada celda = persona nueva. Ese error (funnel = un solo personaje) hace que el validador marque casting repetido y toque reescribir celdas.
- Las refs de producto/logo **nunca fijan una cara** (el selector de fotos excluye archivos `character/model/lifestyle`). La cara la inventa el modelo desde tu descripción textual.
- Muchas celdas no muestran persona (niveles 1–2 a veces, héroes de producto en 3–5) — ahí no hay problema de casting.

---

## Paleta de Composición (14) + reglas de diversidad

Ampliada 2026-07-16 con 2 formatos respaldados por datos reales de spend (Motion Creative Benchmarks 2026, 578K+ anuncios) — solo formatos con traducción limpia a UNA imagen estática y sin riesgo de integridad de marca. Ver `CHANGELOG-v2.md` para qué se excluyó del reporte y por qué (formatos de video, mockups de posts/mensajes fabricados, endosos de celebridad).

| # | Composición | Descripción | Mejor para |
|---|---|---|---|
| 1 | Overhead flat lay | Producto + objetos de contexto vistos desde arriba | Producto, Decisión |
| 2 | Eye-level lifestyle | Persona interactuando con el producto en contexto real | Problema, Solución |
| 3 | Close-up detail | Macro del producto en uso, DOF corto | Solución, Producto |
| 4 | Environmental wide | Espacio/habitación con producto integrado, sujeto pequeño | Inconsciente, Problema |
| 5 | Hand-held POV | Primera persona (manos), feel de selfie/UGC | Problema, Solución |
| 6 | Split contrast | Dos mitades antes/después (vía luz, NO líneas). **También cubre el contraste genérico "método viejo (tedioso/manual) vs método nuevo (fácil, con el producto)"** — sin nombrar ni insinuar un competidor específico, mismo principio de contraste visual. | Solución, Producto |
| 7 | Typography-forward | Imagen mínima, dato/stat/número domina. **Incluye el framing de OFERTA/PRECIO** (precio, descuento, "antes/ahora") como contenido válido, no solo estadísticas — es la composición #1 por volumen y desempeño en el benchmark ("Offer-First Banner"). | Problema, Solución, Producto, Decisión |
| 8 | Dramatic product hero | Fondo oscuro, spotlight al producto, alto contraste | Producto, Decisión |
| 9 | Documentary/candid | Escena natural, capturada al vuelo, no posada | Inconsciente, Problema |
| 10 | Proof/evidence | Testimonio, review o garantía enmarcada | Producto, Decisión |
| 11 | **Texture macro** | **Extreme close-up de la TEXTURA/material del producto que llena el frame** — grano del cuero, desmorone del queso, brillo del chocolate, tejido de la tela, fibra. Belleza pura de la superficie, sin escena. Hace tangible la calidad. | Solución, Producto |
| 12 | **UGC / phone-selfie** | **Una persona real con el celular tomándose una foto/selfie o filmándose mientras USA/PRUEBA el producto o servicio** — estética auténtica de cámara de teléfono, handheld, entorno real, "shot on iPhone", ligeramente imperfecto, NO editorial. (Apparel: selfie de espejo. Comida: filmándose al probar/cocinar. Servicio/fintech: clip rápido en el escritorio.) | Solución, Producto, Decisión |
| 13 | **Unboxing** | **Manos abriendo el empaque/caja, producto revelándose a mitad de gesto** — el momento de apertura, distinto de Hand-held POV (que es USO, no apertura). Formato con el hit rate más alto del benchmark. | Solución, Producto |
| 14 | **Feature callout** | **Producto con UNA sola anotación de texto señalando un detalle/beneficio puntual** (ej. una línea fina que apunta a una costura + texto corto, o un ícono+número "1 de 3"). El producto sigue siendo protagonista — la anotación es un complemento, no domina como en Typography-forward. | Solución, Producto |

**Reglas de diversidad (las valida el script):**
- En las 30, usar **el mayor número de las 14 composiciones** (idealmente todas, mínimo 8 distintas).
- Ninguna composición **más de 5 veces**.
- Cada deseo (10 imágenes) usa **al menos 6 composiciones distintas**.
- **Incluí al menos 2 Texture macro y al menos 2 UGC en las 30** — son lo que más ensancha la diversidad (lección de los runs de junio).
- La composición debe SERVIR a la combinación deseo + nivel (no arbitraria). Texture macro, UGC y Unboxing quedan mejor en niveles 3–5 (con producto).

## Diversidad de ESCENARIO (no solo de composición) — CRÍTICO

El alpha-prompt idéntico ya garantiza que las 30 "se sientan de la misma marca". El riesgo opuesto es que **las celdas con producto se sientan TODAS iguales** (mismo producto sobre superficie de estudio con la misma luz) aunque cambie el texto. Para evitarlo, varía el ESCENARIO real, no solo la etiqueta de composición:

- **NO pongas todas las celdas con producto en "producto solo sobre superficie de estudio con luz lateral".** Eso es lo que produce la sensación de sameness.
- Reparte las celdas con producto (niveles 3–5, ~15 celdas) entre estos modos de escena:
  1. **Standalone estudio** — producto hero sobre fondo de marca (úsalo para ~1/3, no más).
  2. **PUESTO/usado en contexto** — el producto en el pie de una persona en un lugar real (calle, oficina, bar, interior). **Al menos 1/3 de las celdas con producto deben mostrarlo usado/en contexto**, no standalone.
  3. **Macro extremo** — textura/detalle/branding repujado, muy cerca.
  4. **Flat-lay con props** — producto + objetos de contexto desde arriba.
  5. **Entorno vivido** — producto integrado en una escena con vida (no estudio limpio).
- **Rota fondos y luz dentro del rango de la marca** — no repitas el mismo fondo+iluminación en celdas consecutivas. Si el alpha permite "concreto / adoquín / gradiente navy / interior de cuero / calle urbana", úsalos todos.
- **Rota distancia y ángulo de cámara** — macro vs medio vs wide vs cenital vs eye-level-en-el-pie.
- Regla mental: si dos celdas con producto se pudieran intercambiar cambiando solo el texto, una de las dos está mal — dales escenarios distintos.

---

## Cobertura de silueta — qué composiciones exigen una VISTA COMPLETA del producto (CRÍTICO)

Distinto de la fidelidad de completitud de abajo. Ahí el riesgo es describir una **pieza** que la foto citada no muestra; acá es mostrar el producto **como objeto entero** cuando no existe ninguna foto de su **forma**. Si de un producto solo tenés un macro o un recorte, el modelo **le inventa la silueta** — y eso no lo atrapa ningún check de vocabulario, porque lo que falta no está en ninguna foto con la que contrastar.

Caso real (Juliana Sanchez): la única foto de una chaqueta era un macro del panel de la espalda. Cinco celdas la mostraban como objeto (flat lay, unboxing, manos alisándola) y GPT Image 2 renderizó **un buzo de cuello ribeteado tejido** donde va una sobrecamisa militar con botones a presión y cuatro bolsillos. Se pagaron las cinco.

**Antes de asignar composiciones, leé `_coverage` en el `ref-manifest.json`** (Paso 9). Por cada producto te dice si tiene `vista_completa` o si es `null`.

| Si el producto tiene `vista_completa` | Si es `null` (solo recortes) |
|---|---|
| Cualquier composición | **SOLO** composiciones de recorte |

Composiciones que muestran el objeto entero, **prohibidas** para un producto sin vista completa — `validate-payload.py` las **FALLA** (10 de las 14): Overhead flat lay · Eye-level lifestyle · Environmental wide · Hand-held POV · Dramatic product hero · Documentary/candid · Proof/evidence · UGC / phone-selfie · Unboxing · Feature callout.

Composiciones de recorte, **permitidas** siempre — la silueta nunca entra en cuadro (4 de las 14): Close-up detail · Split contrast · Typography-forward · Texture macro.

**La clasificación vive en `scripts/compositions.py`** (declaración única, junto con los alias de grafía) — no en esta tabla ni en el validador. Y `composition` ahora tiene que resolver a una de las **14 etiquetas canónicas**: si escribís una composición inventada o mal escrita, `validate-payload.py` **FALLA**. Antes pasaba, y con ella se apagaba en silencio este gate para esa celda.

Si necesitás una composición de objeto entero y no hay vista completa: scrapeá una (probá `/products.json` en Shopify, ver Paso 7) y anotala en el acta. Si no existe en ningún lado, cambiá la composición. **Nunca describas de memoria la forma de una prenda que no viste.**

## Fidelidad de completitud — texto vs foto citada (CRÍTICO)

Distinto del punto anterior (que varía escenario/luz/ángulo): esta regla es sobre **qué PIEZAS del producto describís en el texto**, y solo aplica cuando el producto tiene más de un "estado" físico (no todas las marcas lo tienen — la mayoría muestra siempre lo mismo, en ese caso esta sección no aplica).

- **Leé `ref-manifest.json` de las fotos citadas en `Reference:` ANTES de escribir el `Concept (EN)`.** El acta del Paso 9 dice qué muestra REALMENTE cada foto (verificado con visión). El `Concept (EN)` solo puede describir componentes/piezas que esa descripción confirme visibles en la foto citada.
- **El manifest NO reemplaza mirar la foto.** Es un índice ("qué foto existe, qué muestra a grandes rasgos"), no un sustituto de verla en el momento de escribir un detalle puntual. **Antes de fijar en el `Concept (EN)` cualquier ESTADO específico de un objeto** (abierto/cerrado, color, orientación, cantidad, texto visible sobre el objeto), `Read` la foto real citada en esa celda y describí solo lo que efectivamente ves ahí — nunca un estado plausible que "recordás" del manifest o que asumís porque "hay una foto de esta pieza en algún estado". Caso real: un manifest decía correctamente "case de carga **abierto**" y el `Concept (EN)` de varias celdas igual describió el case **cerrado** — un estado que no existe en NINGUNA foto real de la marca. El texto correcto estaba ahí; nadie lo confrontó contra la foto (ni contra el propio texto) al momento de escribir el detalle.
- **Si el manifest tiene ≥2 fotos del mismo producto con contenido distinto** (unidad individual vs kit/set/bundle completo, case abierto vs cerrado, uno vs par, con vs sin accesorio — lo que sea que ESE manifest describa; nunca una lista fija de categorías, cada marca es distinta), tratalas como **estados separados** y repartí las celdas del producto entre esos estados a propósito. Ej.: si hay 10 celdas con `Reference` a este producto y el manifest muestra 2 estados (individual / kit), no describas el kit completo en 6 de esas 10 citando solo la foto individual — usá la foto del kit (o combinala) en las celdas donde el texto lo pida, y limitá el texto a "solo la unidad" en las celdas que citan la foto individual.
- **Test rápido:** si borrás la foto de `Reference` y el `Concept (EN)` sigue leyéndose igual de bien sin ella (porque no depende de lo que esa foto específica muestra), probablemente estás describiendo algo que la foto no tiene. La foto manda, el texto se ajusta a ella — no al revés. Y si un detalle de estado no lo viste con tus propios ojos hace un momento en la foto real, no lo escribas.
- Este chequeo lo hacés vos (redactor de la celda) al escribirla — mirando la foto, no solo el manifest —, Y el orquestador lo repite en el pase de MERGE del Paso 11 (cross-check final antes de validar, también volviendo a mirar la foto para celdas con detalles de estado). `validate-payload.py` también lo intenta detectar (WARN, heurística) — no depende de una lista de partes por categoría, compara el vocabulario de la foto citada contra las OTRAS fotos del mismo producto en su propio manifest; esta heurística de texto NO puede detectar un estado inventado que el manifest describe bien pero el redactor ignoró — esa defensa es 100% visual/humana (LLM), igual que el gate del Paso 9.

---

## Táctica de Hook (8) — el ángulo retórico del headline/hook

Eje de diversidad **separado de la Composición** y al mismo nivel de importancia. La Composición decide qué se VE; la Táctica de Hook decide con qué ÁNGULO se REDACTA el `Headline`/`Hook` visible de esa celda. Respaldado por el mismo benchmark (hooks/headlines de anuncios "winner").

**Regla de contenido (no negociable):** la táctica nunca inventa un dato. El hook sigue siendo el real de Felipe MCP (deseo de Reiss), localizado al dialecto de `AD_COUNTRY` como ya se hace — la táctica solo cambia el ÁNGULO de entrega. "Autoridad" y "Anclaje de precio" en particular **solo usan cifras REALES de la marca** (mismo principio que la Ley 11 aplica a proof/reviews) — si no hay una cifra real disponible para esa celda, usá otra táctica.

| Táctica | Cuándo usarla | Nivel sugerido | Ejemplos de plantilla |
|---|---|---|---|
| Curiosidad / intriga | Pattern-interrupt, no revela todo | Inconsciente | "Lo que nadie te dice sobre [categoría]" · "¿Por qué [dato inesperado]?" |
| Anclaje de precio | Ancla un número REAL (precio, ahorro, comparación) | Producto, Decisión | "Menos de $X al día" · "$X menos que hacerlo del modo tradicional" |
| Urgencia / FOMO | Tiempo limitado, disponibilidad real | Decisión | "Quedan pocas unidades" · "Solo esta semana" |
| Autoridad / prueba social | Dato agregado REAL de la marca, nunca inventado | Producto, Decisión | "+10.000 [clientes/usuarios] ya lo probaron" · "4.8★ en Google · 200+ reseñas" |
| Reclamo directo (bold claim) | Afirmación fuerte y concreta, verificable | Solución, Producto | "El [producto] más [atributo] que vas a probar" |
| Novedad / anuncio | "Por primera vez", lanzamiento | Solución | "Por primera vez en [país/mercado]" · "Recién llegado" |
| Dirección directa (2da persona) | Le habla directo al lector | Problema, Solución | "Esto es para ti si [situación]" · "Tú también puedes [beneficio]" |
| Razones / listicle | Enumera motivos concretos — **combina bien con la composición #14 Feature callout** | Solución, Producto | "3 razones para cambiar hoy" · "2 cosas que hace distinto" |

**Reglas de diversidad (WARN, no bloquea el render — es una dimensión nueva, se ajusta con la práctica):**
- Usá **al menos 5 de las 8 tácticas** entre las 30 celdas.
- **No repitas la misma táctica en las 5 celdas de un mismo deseo** (Inconsciente→Decisión) — igual que con el casting, cada nivel del funnel merece un ángulo distinto.
- Ninguna táctica **más de 12 veces** en las 30.

**Campo en el formato de celda:** agregá la línea `**Hook Tactic:**` con el nombre de la táctica elegida (ver formato canónico abajo).

---

## Texto en imagen — MENOS ES MÁS

- **Entrega la idea completa** — no cortes a media frase.
- **UNA idea clara por imagen** — no hook + subtexto + CTA + precio apilados.
- Texto **directo sobre la imagen** (blanco limpio o color de marca), sin cajas de vidrio esmerilado ni barras de gradiente.
- Wordmark de marca **pequeño y discreto** (abajo centrado o esquina).
- **NUNCA quemes el párrafo completo de Meta** en la imagen.
- **Idioma del texto-en-imagen = `AD_LANG`** (idioma del MERCADO de la marca, confirmado en Paso 6b — NO siempre español). Marca US (Beckett) → inglés; marca LATAM → español. La escena se describe en inglés para el modelo, pero headline/CTA dentro del bloque de texto van en `AD_LANG`. Si los hooks de Felipe vienen en español y `AD_LANG`=inglés, traducirlos conservando el ángulo.
- **LOCALIZAR al dialecto del PAÍS de la marca (`AD_COUNTRY`).** El idioma no basta — hay que usar el registro del país. ⚠️ **Los hooks de Felipe MCP suelen venir en VOSEO rioplatense** ("pedís", "recibís", "sumá", "empezá", "comprás", "apoyá", "tenés", "querés", "llevás", "mirá"). Eso es **Argentina/Uruguay**. Para **Colombia, México, Perú, Chile, España, etc. → NUNCA voseo**: convertir a tú o usted ("pedís"→"pide", "recibís"→"recibes", "sumá"→"suma", "empezá"→"empieza", "comprá"→"compra", "apoyá"→"apoya"). Colombia tiende a "tú"/"usted" neutro. Solo dejar voseo si `AD_COUNTRY` es Argentina o Uruguay. Localizar TODO el texto-en-imagen al re-escribir los hooks, no copiarlos literal.
- **OBLIGATORIO: cobertura de texto 90%.** Al menos 28 de 30 llevan algo de texto (hook, dato, pregunta, stat). Máximo 1–2 pueden ser imagen pura.

---

## Formato de salida — `conceptos-30.md` (canónico, NO cambiar las etiquetas)

Escribe exactamente 30 celdas con este formato. `build-jobs.py` y `parse-concepts.js` parsean estas etiquetas en negrita — si cambias los nombres, el parseo falla.

```
### AD 07 — Ahorro / A — Conocedor / Solución
- **Deseo:** Ahorro
- **Perfil:** A — El Conocedor de Calidad
- **Nivel:** Solución
- **Enfoque:** GANANCIA
- **Composición:** Close-up detail
- **Hook Tactic:** Anclaje de precio
- **Has Product:** sí
- **Producto:** dean-oxford
- **Hook:** "Cuero full-grain hecho a mano. Sin el markup del retail."
- **Headline:** CUERO REAL, PRECIO HONESTO
- **CTA:** VER DEAN OXFORD
- **Concept (EN):** Macro close-up of cognac full-grain calf leather showing natural grain and a single row of precise stitching along the sole edge, warm directional light from 45° left, shallow depth of field, on a warm oak surface softly blurred. The product is the hero — discovered for the first time. TEXT on image (Spanish, less-is-more): small serif headline in dark green "CUERO REAL, PRECIO HONESTO" lower third; small CTA "VER DEAN OXFORD"; subtle "BECKETT SIMONON" wordmark bottom center.
- **Reference:** input/product-photos/dean-oxford-macro.jpg, input/product-photos/dean-oxford-frente.jpg
```

**Reglas del formato:**
- `### AD NN — ...` con NN de 01 a 30, en orden. El número es la clave (las etiquetas de título son referencia humana).
- `Hook Tactic:` = una de las 8 de la tabla arriba. Rotar, no repetir dentro de un mismo deseo.
- `Has Product:` = `sí`/`no`. Si `no` → omite la línea `Reference:`.
- `Producto:` = subcarpeta/slug del producto (o vacío si no aplica).
- `Concept (EN):` = la escena completa EN INGLÉS + el bloque de TEXTO en español. Esto es lo único que se pasa a `kie_build_layered_prompt --ad-concept`. **Máx ~650 caracteres.** No es disciplina estética: es aritmética. El tope real del modelo es **5.000 chars con GPT Image 2** y **3.500 con Nano Banana** (ver Ley 20 — la doc vieja decía 8.000 y "API real = 20.000", y estaba mal). El alpha-prompt + product-dna se pasan COMPLETOS, así que el presupuesto por celda es lo que sobra:

  ```
  tope del modelo  −  (alpha + product-dna + scaffolding + REFERENCE MAP)  =  presupuesto del Concept (EN)
  ```

  Ese overhead es **constante** en las 30 celdas. `build-jobs.py` lo imprime al arrancar, con el presupuesto por celda ya calculado — **leelo antes de escribir las 30, no después**. Medición real (Juliana Sanchez, alpha de 2.487 chars): overhead 4.331 → **669 chars por celda**. Con un alpha más corto sobra más. Si build-jobs reporta `OVER`, tenés dos palancas y el orden importa: **primero revisá que el alpha esté en su rango** (si se pasó, acortalo — es una sola edición que arregla las 30), y solo después recortá conceptos celda por celda.
- `Reference:` = máx 2 fotos de producto (rutas relativas a la carpeta del estudiante). El logo se añade aparte automáticamente.

---

## Integridad de marca — NO inventar producto (CRÍTICO)

El modelo de imagen tiende a "rellenar el look" inventando ropa de marca (gorras, tenis, bandanas, camisetas con el logo de la marca) que **NO existe en el catálogo**. Mostrar ropa branded inventada = violación de marca.

- **Solo el producto REFERENCIADO** (la prenda con foto en `Reference`) puede llevar el logo/wordmark/print/diseño de la marca.
- **Toda otra prenda o accesorio del modelo** (gorra, pantalón, camiseta interior, tenis, bandana, bolso) debe describirse explícitamente como **LISA, de color sólido, genérica, SIN MARCA** — sin logos, sin el wordmark de la marca, sin prints inventados.
- **PROHIBIDO** escribir en el `Concept (EN)`: "full [brand] look", "all in [brand]", "[brand] cap/tee/sneakers/bandana", o tags de marca en piezas no referenciadas.
- **Grupos:** solo el modelo central lleva el producto referenciado; los demás visten ropa neutra sin marca.
- En flat-lays: solo el producto referenciado + props NO-textiles genéricos (sin accesorios branded inventados).
- El wordmark de la marca SÍ puede aparecer como elemento gráfico del ad (esquina/CTA) — eso es el logo del anuncio, no un producto.
- Frase útil en el `Concept (EN)`: "all other clothing is plain, solid-color, unbranded — no [brand] logos/prints on anything except the referenced product."
- **Fintech / servicios (NÚMEROS):** NUNCA dejar que una pantalla/teléfono/dashboard muestre cifras de cuenta inventadas (equity, balance, P&L, % de retorno, montos de payout). Es un resultado falso = publicidad engañosa. En celdas con pantalla, escribir en el `Concept (EN)`: "screen shows a candle chart with NO readable numbers — no equity, balance or P&L". Solo se permiten **stats agregados REALES** de la marca como texto del ad ($150M+ pagados, 4.8 Trustpilot, 90/10…). Sin testimonios/quotes inventados con nombres falsos.
- **PROHIBIDO nombrar/mostrar marcas REALES de terceros como prop incidental** (caso real: una factura simulada terminó mostrando "Adobe Audition", "iZotope RX 11", "Avid Pro Tools" — software real de terceros, sin que nadie lo pidiera). Distinto del negocio ficticio de fondo (ej. una clínica inventada en un letrero, que es solo ambientación de bajo riesgo): acá el modelo nombra una marca REAL que existe, lo cual puede leerse como afiliación/endoso falso. En cualquier prop con texto (facturas, recibos, pantallas, cajas, etiquetas, listas de software/herramientas) escribí el contenido GENÉRICO en el `Concept (EN)` — ej. "a generic invoice line item reading 'Editing software — monthly'" en vez de dejar que el modelo elija un nombre de producto real. Si el `Concept (EN)` no especifica el texto exacto de un prop, el modelo puede rellenarlo con una marca real — no dejar ese hueco abierto.

## Prendas transparentes o de capa (malla, tul, encaje, gasa, crop, lencería) — REGLA DE MODERACIÓN

Se perdieron envíos pagados aprendiendo esto. Si el producto es una prenda que **se ve a través** o que se lleva **en capas**, la moderación de la API puede rechazar la celda entera — y el mensaje que devuelve es `Internal Error, Please try again later`, indistinguible de una caída del modelo (Ley 17) o de un prompt fuera de tope (Ley 20). Tres causas, un solo síntoma.

**La fórmula que SÍ funciona.** En toda celda donde la prenda se vea **puesta en un cuerpo**, escribí literal:

```
worn over a plain [color] opaque inner top
```

Y en esas celdas **no escribas nunca** estas palabras, **ni siquiera dentro de una negación o de una instrucción de seguridad**: `sheer`, `semi-sheer`, `see-through`, `translucent`, `transparent`, `nipple`, `areola`. Escribir "not see-through" o "no visible nipples" **dispara el filtro igual** — el filtro lee las palabras, no la lógica. Además se contradicen con la capa interior opaca que acabás de pedir.

- Si la celda es un **macro de la TELA sola, sin cuerpo**, podés decir `fine-line mesh fabric` / `open-weave fabric` sin problema. El riesgo aparece cuando hay cuerpo.
- La regla de la capa opaca conviene ponerla **también en el `NEVER` del alpha-prompt** (Capa 1), no solo en cada celda. Caso real: estaba en las 30 celdas pero una la ignoró y renderizó tirantes de brasier visibles; al moverla al alpha, las 9 celdas de esa prenda salieron correctas.
- Cuidado con el resto de la escena: `bedroom` + prenda de malla + `leather` en la misma celda subió el rechazo de forma marcada. Una celda que falló 5 veces seguidas en un dormitorio pasó al primer intento en un corredor con la misma prenda.

## Props con texto, empaque o branding — la negación NO alcanza

Pedirle al modelo que **NO** ponga el logo en un prop **no funciona** con objetos que asocia fuerte a branding: cajas, bolsas, sobres, etiquetas, tazas, bolsas de envío. Caso real: una celda decía literal *"a plain unbranded kraft mailer, no text or logo on it"* y renderizó el sobre con el wordmark de la marca impreso — packaging que no existe en ninguna foto real (violación de la Ley 11).

- **Lo robusto es que el prop no exista en la escena.** Si el empaque de la marca no está fotografiado, no lo pongas.
- Si el prop es necesario y lleva texto, **escribí el texto exacto y genérico** en el `Concept (EN)` (ej. `a small plain card printed only with the words "TALLA M", nothing else`). Eso sí funciona: la celda que lo hizo así salió correcta.

## Texto del anuncio — nunca uses punto medio `·` en un titular en español

El modelo lo convierte en `¿`. Caso real: `CAMBIOS GRATIS · ENVÍOS DESDE $250.000` salió como `CAMBIOS GRATIS ¿ ENVÍOS...`, y `EMPIEZA POR UNA · CAMBIOS GRATIS` como `EMPIEZA POR UNA ¿CAMBIOS GRATIS`. Pasó en las **dos** celdas que lo tenían y en ninguna otra: el alpha ordena escribir ambos signos invertidos del español y el modelo sobreaplica la regla a cualquier glifo suelto de puntuación. Usá **coma, guion o una conjunción**. Ver Ley 21.

## Multi-producto — mostrar productos secundarios REALES (solo marcas multi-producto de ropa)

Para marcas grandes con catálogo de ropa, una celda puede mostrar el hero + **hasta 2 productos secundarios REALES** (foto-referenciados de la web), no inventados. Probado: GPT Image 2 i2i mantiene fidelidad con **hero + 2 secundarios + logo (4 refs)** usando separación por zona + etiquetado (build-jobs arma el REFERENCE MAP automático).

**Campo opcional en la celda (solo niveles 3–5 con producto):**
```
- **Secondary:** input/product-photos/sec-cap.jpg @ head; input/product-photos/sec-pants.jpg @ legs
```
- Formato: `ruta @ zona`, separados por `;`. **Máx 2.** Zonas: head/torso/legs/hands/neck/feet — **cada producto en una zona distinta**, nunca 2 del mismo tipo.
- Las rutas deben ser **fotos reales** scrapeadas (`sec-<slug>.jpg` en `input/product-photos/`). Si no existe el archivo → el validador FALLA (anti-publicidad falsa). NUNCA inventar.
- El hero sigue siendo ref 1 (exacto); build-jobs ordena `[hero, sec1, sec2, logo]` y agrega el candado "no mezclar prints/colores entre productos". El print del hero NUNCA va sobre el secundario.

**GATING (CRÍTICO):**
- **Solo marcas multi-producto de ropa.** Si la marca tiene **un solo hero product** → **NUNCA** usar `Secondary` (hero solo, como hasta ahora).
- Usar `Secondary` en **solo algunas** celdas con producto (variedad), no en las 18.
- Con `Secondary`, mantené el `Concept (EN)` **más corto (~500 chars)**: el REFERENCE MAP crece con cada ref y se come el presupuesto de la celda. Con 4 refs el overhead sube bastante — mirá el número que imprime `build-jobs.py`.

## Antes de terminar — checklist de autoría
1. ¿Las 30 celdas presentes y numeradas 01–30?
2. ¿Al menos 8 de las 14 composiciones usadas, ninguna > 5, ≥6 por deseo?
3. ¿≥28 celdas con texto-en-imagen?
4. ¿Niveles 1–2 sin `Reference`; niveles 3–5 con `Reference` válido?
4b. ¿Cada `Concept (EN)` describe SOLO piezas que la foto citada en `Reference` muestra según `ref-manifest.json`? Si el producto tiene ≥2 estados de completitud (individual/kit, abierto/cerrado...), ¿están repartidos a propósito entre las celdas, no todos hacia el estado más completo?
5. ¿Casting variado — sin descripción demográfica repetida dentro de un deseo?
6. ¿Todo el texto-en-imagen en `AD_LANG` (idioma del mercado de la marca); hooks tomados de `diversificacion-hooks.html` (no inventados)?
7. ¿Ninguna celda inventa producto de marca? Solo el referenciado lleva branding; toda otra prenda es lisa/sin marca (NO "full [brand] look").
8. ¿Al menos 5 de las 8 Táctica de Hook usadas, sin repetir dentro de un mismo deseo?
9. ¿Cada celda con composición de **objeto entero** cita un producto con `vista_completa` en `_coverage`? (cobertura de silueta — FAIL del validador)
10. ¿Cada `Concept (EN)` entra en el presupuesto que imprimió `build-jobs.py`? (~650 chars con un alpha en rango)
11. Si el producto es de **malla / tul / encaje / capa**: ¿todas las celdas con cuerpo dicen `worn over a plain [color] opaque inner top`, y **ninguna** usa `sheer`/`translucent`/`transparent`/`see-through`/`nipple`/`areola`?
12. ¿Ningún titular lleva punto medio `·`? (sale renderizado como `¿`)
13. ¿Ningún prop de empaque o etiqueta depende de un "sin logo" para no salir branded? (si no está fotografiado, que no exista)

El validador (`validate-payload.py`) revisa 2–5 y 9 automáticamente (FAIL), 8 y 10 como WARN/FAIL de presupuesto, y reporta fallos legibles para corregir antes de gastar en la API. Los puntos 11–13 son de criterio: **el script no puede verlos**, y los tres costaron dinero en corridas reales.
