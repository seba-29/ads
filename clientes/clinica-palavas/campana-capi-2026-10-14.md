# CLÍNICA PALAVAS — ¿campaña de conversiones con CAPI?

> Medido el 14-oct-2026 contra la API de Meta. Cuenta `65286325`.
> Ventana: 18-sep → 14-oct (27 días) y los últimos 7 días.

## Qué eventos entran de verdad

Dos datasets. **Solo uno vive:**
- `558938424257916` «Default Pixel» — dispara web y servidor, al día de hoy.
- `804611474916242` «Pixel Meta» — **nunca disparó** (creado en abr-2024). Si alguien
  lo configuró esperando datos, está vacío.

| Evento | 27 días | Últimos 7 días |
|---|---:|---:|
| PageView | 28.751 | 6.683 |
| ViewContent | 9.713 | 2.507 |
| ViewCategory | 9.590 | 2.059 |
| **Lead** | **1.121** | **293** |
| AddToCart | 979 | 260 |
| InitiateCheckout | 440 | 150 |
| **Purchase** | **291** | **134** |
| Click to Chat by HoliThemes | 219 | 61 |
| Schedule | 69 | 7 |
| **Calificado** | **55** | **55** |

Por **servidor (CAPI)** llegan: `Lead`, `Calificado`, `Schedule`, `InitiateCheckout`
y `Purchase`. El resto es del píxel del sitio.

**`Calificado` nació esta semana**: los 55 del mes son los 55 de los últimos 7 días.

## El bloqueo: `Calificado` todavía no se puede elegir

`ads_get_customconversions` sobre la cuenta devuelve **cero conversiones
personalizadas**. `Calificado` no es un evento estándar de Meta, así que **no
aparece en el selector de evento de conversión hasta que exista como conversión
personalizada**. Montar la campaña antes de eso es imposible, no difícil.

## Y la cuenta no alcanza para optimizar por él

De los últimos 7 días: **55 calificados sobre 293 leads = 18,8%**.

| | |
|---|---|
| CPL real de la cuenta | $1.116 *(campaña de régimen, 11-sep)* a $1.758 *(ago)* |
| ⇒ costo por **Calificado** | **$5.900 – $9.350** |
| Mínimo diario por conjunto `(CPA × 50) ÷ 7` | **$42.000 – $66.800/día** |
| Techo real del cliente | $250.000/semana = **$35.700/día** |

**No da.** Un conjunto optimizado a `Calificado` nace en aprendizaje limitado y se
come el techo entero sin salir de ahí. La respuesta a «¿en qué etapa hacemos la
campaña de API?» es: **todavía no en Conversión.**

## Lo que sí se hace ahora

1. **Crear la conversión personalizada `Calificado`** igual — no para optimizar,
   para **medir**. Con eso cada conjunto muestra cuántos de sus leads el CRM
   calificó, y recién ahí se sabe qué conjunto trae gente buena y no solo gente.
2. **Seguir optimizando por `Lead`** (293/semana, de sobra para los 50).
3. Revisar en 3-4 semanas: si `Calificado` sube a ~150/semana, o si sube el techo,
   la campaña de conversiones pasa a ser viable.

## Dos cosas que hay que preguntar antes de tocar nada

**🔴 Hay cargas por lotes en el servidor.** El 13-oct entre las 09:00 y las 11:00
entraron **59 `Purchase`** (10 + 32 + 17) y el 12-oct a las 11:00 entraron **28
`Lead`** de una. Eso no es tráfico, es una carga. Optimizar sobre una señal que
llega en tandas desordena la entrega: Meta la necesita cerca del tiempo real.
Hay que confirmar si es un backfill de una sola vez o si va a seguir pasando.

**🟡 Hay 291 `Purchase` en 27 días que la ficha no registra.** Descontando la tanda
del 13-oct quedan ~75/semana orgánicos — por encima del umbral de 50. Si esas
compras son reales y tienen valor, esta cuenta puede optimizar por **Purchase con
ROAS**, que es mejor que cualquier evento de lead. **Antes de montar nada: preguntar
al cliente qué son.** La ficha no menciona venta por web, así que o es una línea de
negocio que nadie nos contó, o el evento está mal puesto.
