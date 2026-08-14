# Few-Shot Examples — Alpha Prompts reales de DEEPLOOK

Tres alpha-prompts production-validated. Úsalos como **anclas in-context** cuando sintetices un alpha-prompt nuevo. Observá cómo varía la estructura según la categoría de la marca pero los 5 elementos (photography style + colors + typography + product styling + personality + NEVER) siempre están presentes.

---

## Ejemplo 1 — Beckett Simonon (calzado premium, e-commerce DTC)

**Marca:** zapatos de cuero hechos a mano, made-to-order, $239-$269.
**Estética:** editorial menswear, Kinfolk magazine, restrained luxury.
**Output (production-validated, usado en dry-run-beckett-kie):**

```
Premium handcrafted leather footwear photography in editorial menswear style (Kinfolk/Cereal Magazine aesthetic). Soft diffused natural window light at 3200K-4500K warm color temperature, directional from 45 degrees left, creating gentle dimensional shadows on leather surfaces. Shallow depth of field (f/2.0-f/4.0) with 50-85mm focal length.

COLOR PALETTE (exact values):
- Dark Green #2C3B33 — primary: CTAs, buttons, headline text on light backgrounds
- Off-white #F5F2ED — backgrounds, clean space, editorial breathing room
- Warm cognac/bordeaux — the leather itself (product color, not brand UI)
- Rich earth tones with warm undertones throughout

TYPOGRAPHY: Elegant serif "Alverata" for headlines — refined, classic, not trendy. Clean sans "Underground" for body. White text on dark, dark green text on light. Always understated.

PRODUCT STYLING: Must show authentic full-grain leather texture with visible grain, precise Blake stitching detail, and natural patina development. Cedar shoe trees with gold knobs visible when appropriate. Products always shown in pairs. Gold hardware details (tassels, buckles) catch light naturally.

SURFACES & BACKGROUNDS: Warm oak wood, cream linen, Italian marble, aged concrete, dark stone. Never busy patterns or synthetic materials. Generous negative space for editorial sophistication. Product occupies 40%+ of frame when visible.

PERSONALITY: Approachable luxury — refined but not pretentious, artisanal but not rustic, detailed but not clinical. The quiet confidence of a man who doesn't need logos to prove his taste.

CTA STYLE: Dark green (#2C3B33) rectangular button with slight rounded corners (6px), white all-caps text. Brand mark: clean "BECKETT SIMONON" wordmark in dark green or white.

NEVER: Harsh flash. Cold blue tones. Bright saturated neon colors. Cluttered compositions. Overly posed stiff models. Fast-fashion aesthetic. Cheap synthetic backgrounds. Discount-first messaging.
```

**Anotación del estilo:**
- Lenguaje técnico fotográfico explícito (Kinfolk/Cereal Magazine, 3200K-4500K, f/2.0-f/4.0, 50-85mm).
- Color palette con hex + función específica de cada color.
- Product styling **incluye lo que no es obvio mirando una foto** (Blake stitching, cedar shoe trees).
- NEVER tiene 8 exclusiones, muchas anti-genéricas (harsh flash, cold blue, discount-first).
- Char count: ~1600.

---

## Ejemplo 2 — Etérea (postres saludables, e-commerce niche)

**Marca:** postres cósmicos, saludables y divertidos. Tortugana, Brownie de Cacao, AlFITjores.
**Estética:** vibrante, cósmica, "Willy Wonka meets NASA meets clean eating".
**Output (production-validated):**

```
Vibrant cosmic food photography. Clean product shots on solid color backgrounds. Bright, saturated, playful — never clinical or sterile. Products float or sit centered like precious space artifacts.

COLOR PALETTE (exact values):
- Navy #002C77 — primary: text, headers, packaging text
- Yellow #FFDE64 — secondary: hero backgrounds, energy
- Mint #A1E7D7 — accent: buttons, badges, freshness
- Purple #9C5FB5 — tertiary: KETO line, bundles
- Beige #ECDEBB — background: default page warmth

PRODUCT-SPECIFIC PACKAGING COLORS:
- Tortugana = Pink #F67599 bag. Use pink as background when featuring Tortugana.
- Brownie de Cacao = Orange #DD4814 bag. Use orange as background when featuring Brownie.
- AlFITjores = no distinct packaging color. Use navy or beige backgrounds.

TYPOGRAPHY: Bold uppercase display headers (Climate Crisis feel — chunky, fun, cosmic). Clean sans-serif body (Space Grotesk). Playful and premium simultaneously.

PRODUCT STYLING:
- Tortugana: round chocolate disc, show cross-section with walnut/caramel interior, shiny shell
- AlFITjores: stacked sandwich cookies, golden layers with chocolate filling
- Brownie de Cacao: square top-down, chocolate drizzle pattern, dense fudgy texture

LIGHTING: Bright, even, studio-quality. Warm undertones. No harsh shadows. Textures must be visible — chocolate sheen, walnut crunch, cookie crumble.

PERSONALITY: Fun, cosmic, premium-but-accessible. "Willy Wonka meets NASA meets clean eating." Products look irresistible AND healthy.

NEVER: Dark/moody photography. Clinical white backgrounds. Literal space/galaxy on every image (reserve for Alien Box). Cluttered compositions. Desaturated tones.
```

**Anotación del estilo:**
- Sección dedicada a **per-SKU packaging colors** porque la marca tiene productos hero distintos (no es 1 producto único).
- Product styling con bullets por SKU — distinto del Beckett que era 1 estilo global.
- Referencias culturales explícitas ("Willy Wonka meets NASA").
- NEVER incluye una excepción específica ("space/galaxy reserve for Alien Box") — granularidad que evita over-application.
- Char count: ~1400.

---

## Ejemplo 3 — Juliana Postres (marca personal LATAM, comida + lifestyle)

**Marca:** chef latina mid-30s, postres caseros elevados, educación.
**Estética:** kitchen lifestyle cálida, aspirational-domestic, golden hour.
**Output (production-validated):**

```
Warm Latin American kitchen and lifestyle photography with aspirational-domestic aesthetic. Soft natural window light at 3500K-5000K warm color temperature, directional from right side, creating gentle shadows that feel like golden hour or bright morning. Shallow depth of field (f/2.0-f/4.0) on subjects, 50-85mm focal length. Color palette: coral pink (#EF5E80), deep forest green (#2E443D), clean white (#FFFFFF), warm cream tones for backgrounds. Must show warmth and approachability -- kitchens feel lived-in but elevated, desserts look irresistible with visible textures (ganache gloss, buttercream swirls, fruit glistening). Surfaces: white marble counters, light wood cutting boards, linen napkins, ceramic plates. Generous negative space for text placement. Personal brand: Latina woman mid-30s, warm smile, confident posture, professional but approachable -- she is a teacher and mentor, not a distant celebrity. Typography: bold rounded sans-serif headlines (Montserrat Bold style), clean body text (Lato Regular). CTA: coral pink (#EF5E80) rounded button, white uppercase text. Brand wordmark small and subtle. Never: cold/blue lighting, clinical studio feel, overly styled food magazine shots, messy kitchens, cheap ingredient shots, dark moody photography, harsh flash, neon colors, corporate office settings.
```

**Anotación del estilo:**
- Formato **prosa continua** (no sections) — funciona igual de bien que el sectioned. Menos de 1500 chars.
- Incluye descripción de **la persona del brand** ("Latina woman mid-30s, warm smile, confident posture, professional but approachable -- teacher and mentor, not a distant celebrity"). Crítico para marcas personales.
- NEVER tiene 9 items y termina con "corporate office settings" — específico al pain de NO querer parecer agencia.
- Char count: ~1300.

---

## Patrones observables — qué replicar al sintetizar

1. **Photography vocabulary técnica:** focal length range, aperture range, color temperature en Kelvin, ángulo de luz. Los 3 ejemplos lo tienen.

2. **Hex codes con función:** nunca "verde claro". Siempre "#2E443D — deep forest green — primary CTA / brand mark".

3. **Style references nombradas:** Kinfolk (Beckett), Climate Crisis font (Etérea), "Willy Wonka meets NASA" (Etérea). Al menos 1 referencia cultural reconocible.

4. **Product styling es lo que NO se ve en una foto:** Blake stitching (Beckett), chocolate drizzle pattern (Etérea), ganache gloss (Juliana). El LLM tiene que mirar las fotos de producto Y extraer esos detalles técnicos.

5. **Personality como frase capturable:** "quiet confidence of a man who doesn't need logos" / "Willy Wonka meets NASA" / "teacher and mentor, not a distant celebrity". 1 línea que sintetiza el alma.

6. **NEVER tiene 5-9 items y combina:**
   - Anti-estética genérica (harsh flash, cold blue, neon, melted text)
   - Anti-categoría específica (discount-first, food-magazine-shots, clinical-studio)
   - A veces excepciones explícitas ("reserve for Alien Box")

7. **Char count en rango 1300-1800.** Nunca menos de 800 (incompleto), nunca más de 1900 (no deja headroom).

8. **Inglés siempre.** Aunque la marca sea LATAM y opere en español (Etérea, Juliana son colombianas/latinas), el alpha-prompt es 100% inglés porque los modelos de imagen rinden mejor.

---

## Patrón especial — marca con persona (personal brand)

Si el negocio tiene un fundador/face de marca (Juliana Postres), añadir un parágrafo dedicado:

```
Personal brand: [demografía] [profesión/rol], [postura corporal y gesto],
[descripción del aura — "teacher and mentor, not distant celebrity"], [outfit
style guidelines if relevant].
```

Esto es crítico para consistencia de imagen cuando la persona aparece en los ads.

---

## Cuándo desviarse del template

- **Categorías muy técnicas (SaaS, fintech):** la "photography" capa puede convertirse en "interface visualization" capa. Mantener los 6 elementos, cambiar vocabulario.
- **Productos sin foto fija (servicios):** product styling se convierte en "delivery moment styling" — qué transmite el momento del servicio.
- **Múltiples SKUs hero:** seguir el patrón Etérea — sección "PRODUCT-SPECIFIC ..." con bullets por SKU.

El framework es universal, el contenido se adapta.

---

## Video Master Prompt — receta locked

El video story SIEMPRE va con workflow **2-step** (lección Etérea v6 + Club de Repostería 2026-05-20):

**Step 1 — Generar first_frame** con GPT Image 2 i2i (ad-style still del producto real, sin typography). Ver SKILL.md Paso 13.5.

**Step 2 — Kling 3.0 single-shot 9s std CON first_frame**. Timestamps embebidos con HARD CUT TO syntax para forzar 3 shots distintos. Ver SKILL.md Paso 13.6-13.7.

**Anti-patterns (rechazados por Santiago):**
- `"A single boot rests on a minimal plinth. Slow dolly-in."` → sale como foto con dolly, sin sujeto/acción/historia.
- Text-to-video sin first_frame → Kling inventa el producto, CRÍTICO PELIGROSO.
- foto raw del catálogo como first_frame → "street garbage", la foto studio no anima cinematográfico.

**Pattern correcto — Beckett Bolton Chelsea "Made when ordered" (versión narrativa, ejemplo histórico antes del 2-step; ver Etérea v6 para versión 2-step actual):**

```
BRAND DIRECTION: Premium handcrafted leather footwear, Kinfolk and Cereal
Magazine editorial restraint. Soft diffused warm window light 3800-4500K from
45 left. Shallow depth f/2.8-f/4.0 at 50-85mm. Kodak Portra 400 warm muted
color, slight film grain. Warm cream #F5F0EB negative space, polished black
calfskin hero, cognac accents, dark forest green #2C3B33 hint.

PRODUCT: Bolton Chelsea Boot in hand-polished black full-grain calfskin, soft
sheen NOT patent NOT mirror. Goodyear-welted with visible welt stitching.
Matte black elastic Chelsea gusset. Fabric pull tab. Warm tan lining at boot
opening. Stacked 25mm leather heel. Sleek almond toe. Same boot identity
across all shots.

SCENE: Cinematic editorial 9-second sequence inside a quiet artisan leather
workshop. The story of one pair, made the moment it is ordered. NEVER show
the artisan's face, only hands working and the boot itself.

00:00 to 00:03 Tight macro from above on an aged warm oak workbench. A
craftsman's calloused hands position a curved leather knife on a flat panel
of premium black full-grain calfskin and draw one clean precise cut along a
chalk template line. Visible leather grain texture, faint dust particles
drifting in the warm window light. Camera locked.

00:03 to 00:06 Tight macro low angle on the upper of a partially assembled
Chelsea boot held in a wooden lasting jack. Same artisan's hands pull a waxed
brown thread through a curved needle and stitch the Goodyear welt along the
sole. Slow controlled hand stitches, visible thread tension, brass thimble
glinting. Camera locked.

00:06 to 00:09 Slow controlled dolly in toward a single finished Bolton
Chelsea Boot standing upright on a minimal cream sculptural plinth against a
warm cream seamless background. Camera ends in close on the welt stitching
and the soft sheen of the polished black leather.

LIGHT: Soft diffused warm window light from 45 degrees left at 3800K,
slightly warmer 4000K by the third shot.

STYLE: Kodak Portra 400 warm muted tones, subtle fine film grain, editorial
Kinfolk and Cereal Magazine restraint. Quiet confidence.

SOUND: Faint workshop ambient. Slow leather sole on workbench, gentle thread
pulling, soft footstep at the reveal. No voiceover. No music.

NEVER: Harsh flash. Cold blue 6000K tones. Saturated neon. Faces visible.
Hype aesthetic. Doubled product. Competing brand logos.
```

**Total:** ~2367 chars (cap 2500). Output: 720x1280 (9:16), 9s, 126 créditos = $0.63.

**Estructura obligatoria (7 bloques):**
1. BRAND DIRECTION (de `alpha-prompt.txt`, compresar)
2. PRODUCT (de `product-dna.txt`, compresar — material, finish, distinguishing features)
3. SCENE (1-2 líneas que arman la historia narrativa derivada del hook)
4. Timestamps 00:00 to 00:03 / 00:03 to 00:06 / 00:06 to 00:09 (cada uno: sujeto + acción + camera + environment)
5. LIGHT (consistencia temperatura color a lo largo)
6. STYLE (color science + film grain + reference)
7. SOUND (off, "No music." cierre)
8. NEVER (5-7 exclusiones)

**Mapeo hook → narrativa:**
- Idealismo / made-to-order → manos artesano (cutting → stitching → reveal)
- Patina / durability → mismo zapato a través del tiempo (años, ciudades)
- Estatus / aspiracional → caminata profesional (cobblestone → welt close-up)
- Ahorro / value → split-screen retail boutique caro vs workshop directo (más conceptual)
