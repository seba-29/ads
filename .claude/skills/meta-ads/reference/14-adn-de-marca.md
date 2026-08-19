# 14 — ADN de marca → hooks → públicos

El puente entre "conozco al cliente" y "tengo la campaña montada". Es el
conocimiento extraído de las tres skills de producción de Felipe Vergara
(`escanear-marca`, `diversificacion-creativa`, `produccion-anuncios`), que viven
instaladas en `.claude/skills/`.

**Por qué está acá y no solo en esas carpetas:** aquellas skills *ejecutan* un pipeline
(escanear web → generar hooks → renderizar 30 imágenes). Este documento guarda el
**criterio**, para poder aplicarlo a mano, sin web, sin Kie y sin correr nada.

---

## 1. La cadena completa

```
ADN de marca ──► 3 deseos + 2 perfiles ──► 30 hooks ──► público + exclusión ──► anuncio
   (§2)              (§4)                    (§5)          (10 §6)
```

Cada eslabón alimenta al siguiente. Saltarse el primero es la razón por la que la
mayoría de las matrices creativas salen genéricas: sin ADN, los 30 hooks son 30 formas
de decir lo mismo.

| Etapa | Skill que la ejecuta | Dónde vive el criterio |
|---|---|---|
| ADN de marca | `escanear-marca` | §2-3 de este doc |
| 30 hooks | `diversificacion-creativa` | §4-5 de este doc |
| Público y exclusión por nivel | — | `10-publicos-y-exclusiones.md` §6 |
| Presupuesto y arquitectura | — | `05-presupuesto.md`, `10` §4 |
| 30 imágenes | `produccion-anuncios` | esa skill (requiere Kie.ai con saldo) |

---

## 2. El ADN de marca — `marca-cliente.json`

El esquema canónico. Sirve como **brief de cliente estandarizado**: se llena una vez y
lo reusan todas las etapas siguientes sin volver a preguntar.

```json
{
  "schema_version": "1.0",
  "url": "...",
  "nombre_marca": "...",
  "modo_escaneo": "completo | reducido_sin_navegador",

  "identidad_visual": {
    "color_primario": "#hex",
    "color_secundario": ["#hex", "#hex"],
    "fondo": "#hex",
    "texto": "#hex",
    "tipografia_heading": "...",
    "tipografia_body": "...",
    "estilo_imagery": "fotografía profesional | ilustración | flat | mixto"
  },

  "tono_y_voz": {
    "formal_casual": 1-10,
    "racional_emocional": 1-10,
    "serio_ludico": 1-10,
    "sutil_directo": 1-10,
    "tradicional_innovador": 1-10,
    "experto_accesible": 1-10,
    "descriptores": ["adjetivo", "adjetivo", "adjetivo"]
  },

  "avatar": {
    "deseos_reiss": [
      {"deseo": "...", "evidencia": "por qué"},
      {"deseo": "...", "evidencia": "por qué"},
      {"deseo": "...", "evidencia": "por qué"}
    ],
    "rango_edad": "25-45",
    "profesion": "...",
    "pain_point": "problema principal",
    "aspiracion": "transformación principal"
  },

  "nivel_consciencia": {
    "dominante": "Inconsciente | Problema | Solución | Producto | Decisión",
    "secundario": "...",
    "evidencia": "cita del copy"
  },

  "tipo_oferta": "info | servicio | producto físico | e-commerce | alto ticket | SaaS",
  "propuesta_valor": "la promesa en 1 frase",
  "garantia": "descripción | null",
  "producto_principal": "...",
  "precio": "rango visible | null",

  "redes_sociales": {
    "instagram": "url | null", "ig_status": "ok | login_wall | not_found", "ig_bio": "...",
    "tiktok": "url | null", "tiktok_status": "ok | captcha | not_found", "tiktok_bio": "..."
  }
}
```

> **Regla dura:** usa `null` cuando un dato no se pudo obtener con confianza.
> **Nunca inventes valores.** Un ADN con datos fabricados contamina las 4 etapas del
> ciclo y nadie se entera hasta que la campaña no vende.

**Relación con las 7 Maletas** (`02-investigacion.md`): las maletas son el
*cuestionario* que le haces al cliente; este JSON es el *formato de salida*. El
`pain_point` es la maleta 2, la `aspiracion` sale de la 3, la `garantia` es la 7. Si ya
llenaste las maletas, este archivo se completa casi solo.

---

## 3. Los dos campos que más se subestiman

### `nivel_consciencia.dominante` — a qué nivel le habla la marca HOY

Se lee del copy actual del sitio, no de lo que el cliente dice que hace:

| Nivel | Cómo suena en la web |
|---|---|
| **Inconsciente** | "no sabía que existía esto" |
| **Problema** | "tienes este problema, lo conoces" |
| **Solución** | "estás buscando solución, mira estas opciones" |
| **Producto** | "este producto es mejor que los otros" |
| **Decisión** | "compra ya, oferta, urgencia" |

Devuelve **dominante + secundario + una línea de evidencia** (una cita real del copy).

**Por qué importa tanto:** casi todas las webs hablan en nivel *Producto* o *Decisión*,
porque están escritas para quien ya llegó. Pero el **60% del presupuesto va a
Presentación**, que necesita niveles *Inconsciente/Problema/Solución*. Ese desfase es
el diagnóstico más común en una cuenta nueva: **la marca no tiene material para hablarle
a gente fría.** Detectarlo en el día 1 te ahorra un mes.

### `tipo_oferta` — condiciona la arquitectura entera

| Tipo | Implicación operativa |
|---|---|
| `info` (curso, mentoría) | Ciclo largo, mucho contenido de Presentación |
| `servicio` (agencia, profesional) | Objetivo Clientes Potenciales o Mensajes; el cierre es humano |
| `producto físico` | Ventas; catálogo si hay variedad |
| `e-commerce` | Ventas + Ventas del Catálogo en Conversión |
| `alto ticket` (>US$1.000) | CPA alto → mínimo por conjunto alto → casi siempre arquitectura consolidada |
| `SaaS / app` | Prueba gratis como oferta; ciclo de activación |

Cruza esto con `(CPA × 50) ÷ 7` de `05-presupuesto.md`: un alto ticket con CPA de $75
necesita ~$536/día **por conjunto** para salir de aprendizaje. Eso decide solo si vas
separado o consolidado.

---

## 4. Los 16 Deseos de Reiss (con la regla de evidencia)

| | | | |
|---|---|---|---|
| 1. Aceptación | 5. Honor | 9. Actividad física | 13. Contacto social |
| 2. Curiosidad | 6. Idealismo | 10. Poder | 14. Estatus social |
| 3. Alimentación | 7. Independencia | 11. Romance | 15. Tranquilidad |
| 4. Familia | 8. Orden | 12. Ahorro | 16. Competencia |

Se eligen **3**, y cada uno lleva su **evidencia** — algo real de la marca, del sitio o
de las reseñas que explique por qué ese deseo aplica.

> **Evidencia ≠ descripción.** "22-35 años, le interesa el margen" es una descripción.
> "El sitio tiene una sección propia de *Acceso a mayorista*" es evidencia. Si no hay
> señal real, deja `null` antes que inventarla.

### Los 2 perfiles

Dos segmentos con **motivaciones o situaciones distintas**, aunque compren lo mismo.
El ejemplo canónico: *"el que busca rapidez"* vs. *"el que busca prestigio"*.

Salen del avatar: `pain_point`, `aspiracion`, `profesion`, `rango_edad`.

---

## 5. Construir cada hook

**3 deseos × 2 perfiles × 5 niveles = 30 hooks.** La estructura de cada uno:

```
[Verbo de acción fuerte] + [Sujeto específico] + [Contexto concreto] + [Resultado o contraste]
```

### Las 5 reglas

**1 · Empieza con verbo o pregunta directa** — nunca con "yo" ni con el nombre de la marca.
- ❌ "Nuestra crema hidrata tu piel"
- ✅ "Para de gastar en cremas que no funcionan — esto es lo que realmente hidrata"

**2 · Sé específico.** Mientras más concreto, más impacto.
- ❌ "Mejora tu vida"
- ✅ "Pierde 5 kilos en 8 semanas sin dejar de comer lo que te gusta"

**3 · Framing de GANANCIA en niveles calientes** (Solución, Producto, Decisión) — describe
lo que logra, no lo que evita.
- ✅ "Despierta con energía todos los días" (no: "deja de sentirte cansado")

**4 · Framing de DOLOR en niveles fríos** (Inconsciente, Problema) — activa la tensión
antes de ofrecer la salida.
- ✅ "¿Por qué sigues [situación frustrante] si existe [alternativa]?"

**5 · Incluye el ángulo** — el lente emocional bajo el que se lee: urgencia, prueba
social, curiosidad, identidad, comparación, miedo a perderse algo.

### Cada celda de la matriz lleva dos cosas

1. El **hook entre comillas** — la frase exacta que va en el anuncio
2. El **ángulo** en una línea aparte — por qué funciona en ese nivel

Sin la segunda, la matriz es una lista de frases y no un sistema: el ángulo es lo que
te deja auditar si de verdad estás diversificando o repitiendo.

---

## 6. Del hook al conjunto de anuncios

Los 30 hooks no se reparten al azar: cada columna de la matriz **ya tiene asignada** su
etapa, su público y su exclusión.

| Columna | Hooks | Etapa | Exclusión (el control duro) |
|---|---|---|---|
| Inconsciente + Problema | 12 | Presentación | Interacción + intención + compradores |
| Solución | 6 | Presentación → Evaluación | Intención + compradores |
| Producto | 6 | Evaluación → Conversión | Compradores |
| Decisión | 6 | Ascensión | Compradores recientes (30d) |

La tabla completa con público, objetivo y tipo de arte por nivel está en
**`10-publicos-y-exclusiones.md` §6**. Y recuerda la Ley 1 (`09-plataforma-2026.md`):
la columna *Público* es una sugerencia; la columna *Exclusión* es lo que Meta obedece.

---

## 7. La compuerta de color (disciplina transferible)

Un detalle operativo de `escanear-marca` que vale como principio general:

> Los colores extraídos del CSS están **declarados, no vistos**. La paleta por defecto
> de un tema de Shopify sale con la misma confianza que el color real de la marca.
> **Hay que mirar las imágenes antes de creerle al CSS.**

Caso documentado: un sitio declaraba magenta `#fb5184` y coral `#e0002a` con confianza
alta; al abrir el logo y las fotos, ninguno de los dos existía en la marca.

**El principio general:** *dato declarado ≠ dato verificado.* Aplica igual al ADN
completo — el cliente dice que su público es "mujeres de 30 a 50", las reseñas dicen
otra cosa. Gana lo que puedas verificar.

---

## 8. Cómo se encadenan las skills

```
/escanear-marca <url>
   └─► marca-cliente.json            (ADN, con los 3 deseos ya elegidos)

/diversificacion-creativa
   └─► lee marca-cliente.json
   └─► 30 hooks (NO vuelve a elegir los deseos: usa los del JSON)

/produccion-anuncios <url>
   └─► llama a las dos anteriores
   └─► 30 imágenes 9:16 + matriz-creativa.xlsx
```

**Requisito que no se puede saltar:** `produccion-anuncios` renderiza con GPT Image 2 a
través de Kie.ai, **local y con saldo propio** (~US$1,50 por corrida de 30). Sin
`KIE_API_KEY` no genera imágenes. El resto de la cadena (ADN + hooks) **no cuesta nada**
y se puede correr siempre.

**Dónde entra este skill:** `meta-ads` decide *qué* producir — etapa del ciclo, nivel de
consciencia, tipo de arte, presupuesto, públicos y exclusiones. Las tres de Felipe
producen *la pieza*. No se pisan.

> **Modo sin herramientas:** todo §2 a §6 se puede hacer a mano, en conversación, sin
> web ni navegador. Basta con las respuestas del cliente a las 7 Maletas. Las skills
> automatizan el trabajo, no lo reemplazan.
