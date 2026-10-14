# DRA. VANESSA SILVA — presupuesto, split de promociones y CAPI

> Medido el 14-oct-2026 contra la API de Meta. Cuenta `1321852590109746`.
> Ventana: últimos 14 días (30-sep → 13-oct).

## 1. La foto, antes de opinar

| Conjunto | Gasto 14d | Resultado | Costo | Destino |
|---|---:|---:|---:|---|
| **Meta form \| Santiago \| Promociones** | $117.077 | 249 leads | **$470** | formulario |
| Mujeres 22-55 \| Zona centro CL | $31.649 | 40 leads | **$791** | formulario |
| PROMOCIONES - Mujeres \| Zona centro | $28.552 | 96 conversaciones | **$297** | WhatsApp |
| Mujeres \| Zona centro CL (1-3-5) | $27.993 | 79 conversaciones | **$354** | WhatsApp |
| | **$205.271** | | | ≈ **$14.660/día** |

A ese ritmo el mes cierra en **~$440.000**, contra un techo de **$500.000**.

---

## 2. «Tirar todo a formulario» — los números no respaldan la premisa

**El formulario ya se lleva el 72% del presupuesto** ($148.726 de $205.271). No está
subfinanciado: es lo que más plata tiene.

Y es **más caro por unidad**, no más barato:

- formulario: **$470 y $791** por lead
- WhatsApp: **$297 y $354** por conversación

> ⚠️ Son unidades distintas y no se comparan de frente — eso ya está anotado en la
> ficha. Pero la premisa «el formulario trae clientes más calificados» **no está
> medida en esta cuenta**, y la ficha dice por qué: el agendamiento vive fuera del
> CRM, así que nadie sabe cuál de los dos canales termina en pabellón.
>
> Y si hubiera que apostar sin datos, la apuesta va al revés: en WhatsApp la persona
> **escribe**; en el formulario toca dos botones con sus datos ya rellenos.

**Cómo zanjarlo en 7 días, sin apostar el presupuesto:** los dos canales dejan rastro
en GHL con etiquetas distintas (`fb-ad-lead` para el formulario,
`fb-ad-lead-whatsapp` para los de WhatsApp). Contar, por etiqueta, cuántos llegan a
`quiere-agendar`. Eso se mide hoy con lo que ya existe y responde la pregunta de
verdad. **Después se mueve el presupuesto.**

**Lo que sí está mal del formulario, y es otra cosa:** el conjunto
`Mujeres 22-55 | Zona centro CL` va a **20 leads por semana** — por debajo de los 50
que Meta necesita para salir de aprendizaje — y a **$791**, 68% más caro que el
conjunto bueno. Si se quiere empujar formulario, el movimiento correcto es
**concentrar ahí la plata que ya existe**, no abrir otro frente.

---

## 3. El split por promoción: el instinto es correcto, el lugar no

### En la campaña de FORMULARIO los dos anuncios entregan

| Anuncio | Gasto | Leads | Costo |
|---|---:|---:|---:|
| Vaser 360 - $3.200.000 | $70.758 | 106 | **$668** |
| Lipoescultura | $46.319 | **143** | **$324** |

El que se lleva el **60% del gasto es el caro**: Vaser cuesta el doble por lead y
trae menos. Acá **no hace falta separar**: los dos reciben plata. Lo que sobra es
gasto en el peor.

### En la campaña de WHATSAPP, Lipovaser directamente no entrega

| Anuncio | Gasto | Resultados | Impresiones |
|---|---:|---:|---:|
| PROMOCION LIPOESCULTURA | $28.528 | 96 conversaciones · $297 | 10.727 |
| **PROMOCION LIPOVASER** | **$24** | **0** | **4** |

**Cuatro impresiones en 14 días.** Eso no es «rinde poco»: es que Meta le dio cero.
Dentro de un mismo conjunto, el algoritmo concentra todo en el anuncio que le
resulta más barato, y acá lo hizo bien — Lipoescultura trae conversaciones a $297.

**Para eso sí sirve tu idea:** un conjunto por promoción con presupuesto propio es la
**única** forma de forzar entrega a Lipovaser. No es optimización, es una decisión de
negocio: si la clínica necesita vender la promo premium, hay que pagarle su espacio.

### Pero antes de gastar: Vaser YA tiene volumen

**106 leads en 14 días por el formulario, a $668.** Antes de abrir un conjunto nuevo
a ~$2.150/día, la pregunta para la clienta es: **¿106 leads de Vaser cada dos semanas
le alcanzan?** Si la respuesta es sí, el split no hace falta y ese dinero rinde más
en otro lado.

### Lo que cuesta separar

Cada conjunto nuevo reinicia el aprendizaje y necesita `(CPA × 50) ÷ 7`:

| | Mínimo diario |
|---|---:|
| Conjunto de WhatsApp a ~$300/conversación | **$2.150/día** |
| Conjunto de formulario a ~$470/lead | **$3.360/día** |

Hoy se gastan ~$14.660/día. Sumar un conjunto de WhatsApp deja el mes en **~$504.000**
y **pasa el techo de $500.000**.

> 🔴 **Los puntos 2 y 3 compiten por la misma plata.** No entran los dos: o se
> concentra en formulario, o se le abre conjunto propio a Lipovaser. Es una decisión
> de la clienta, no de la cuenta — y el techo mensual, además, **sigue sin estar
> confirmado por escrito** desde la reunión del 3-sep.

---

## 4. CAPI: la señal que llega es mucho menor que la operación

Dos datasets:
- `1354274276678685` «Pixel Dra. Vanessa» — vivo.
- `1113602088016076` «Dra.vanessacsf» (creado 15-sep) — **nunca disparó**. Vacío.

Del dataset vivo, últimos 7 días:

| | |
|---|---|
| Eventos | **solo `Lead`** — ni `Schedule`, ni `Contact` |
| Volumen | **38 por semana** |
| Origen | **100% servidor** (CAPI). Cero del píxel |

**Y ahí está el problema.** Las campañas de esta cuenta producen por semana ~145
leads de formulario y ~88 conversaciones de WhatsApp: del orden de **230 contactos**.
El CAPI refleja **38**. No es que falte volumen de pauta — **falta que el CRM mande el
evento**, o se está mandando solo para una parte del recorrido.

**Antes de montar una campaña de conversiones hay que entender ese hueco**, porque
optimizar sobre una señal que ve el 16% de lo que pasa es peor que no optimizar: Meta
aprende de una muestra sesgada y no hay forma de notarlo desde el panel.

Además, 38/semana está **por debajo de los 50** del umbral. Igual que en Palavas y
Casa Zen: **todavía no.**

### El orden correcto para esta cuenta
1. Averiguar por qué el CRM manda 38 de ~230.
2. Que mande también el momento que importa (`quiere-agendar` / `cita-agendada`) —
   que es, además, el dato que zanja la discusión del punto 2.
3. Cuando ese evento pase de 50/semana estables, recién ahí campaña de conversiones.
