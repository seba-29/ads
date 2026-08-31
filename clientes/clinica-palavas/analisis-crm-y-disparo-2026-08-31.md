# PALAVAS — Lectura directa del CRM: el disparo masivo y una alerta sobre el panel

> **31 de agosto de 2026.** Primera lectura contra GoHighLevel directamente, con PIT de la
> subcuenta, en vez de contra pantallazos del panel.
>
> Subcuenta `CLINICA PALAVAS` · `QTkbQECvnZAu530F7gk8` · embudo único `Oportunidades Palavas`
> (`dt8blUbk9wqypQApggCh`) · **3.819 oportunidades** bajadas completas (39 páginas, 3.819
> únicas, coincide con el `total` que declara la API).
>
> **⛔ Conclusión operativa: el reporte al cliente NO puede salir como está.**

---

## 1. La pregunta que bloqueaba el reporte, respondida

**¿El disparo masivo contamina los números de los anuncios? → NO. Cero solapamiento.**

De las 980 oportunidades con fuente `Disparo-depilacion-laser`, **ninguna** trae atribución de
Meta (`utmCampaignId`). Y a la inversa: de las 206 con atribución de Meta, ninguna tiene esa
fuente. Son dos poblaciones disjuntas.

Esto coincide con lo que dice el código del panel (`lib/funnel.ts:80` agrupa por
`attribution.campaignId`; `lib/ghl.ts:22` lo saca del primer touch con `utmCampaignId`): una
oportunidad sin ese campo no entra a ninguna fila de anuncio.

**El costo por venta de los anuncios no está inflado por el disparo.** Ese riesgo queda cerrado.

---

## 1b. CORRECCIÓN — el disparo se mide por ETIQUETA, no solo por fuente

**Seba objetó que veía contactos del disparo en «link de pago enviado». Tenía razón, y la
objeción destapó un error de medición mío.**

Contar el disparo solo por `source = "Disparo-depilacion-laser"` (980) deja fuera contactos
que sí venían del disparo pero cuya oportunidad tiene otra fuente. Contando por **fuente O
etiqueta** (`wsp-masivo`, `masivo-2`) son **985**, y el resultado cambia:

| | Solo por fuente | Por fuente o etiqueta |
|---|---|---|
| Personas | 980 | **985** |
| Etapa positiva | 9 (0,9%) | **12 (1,2%)** |
| Link de pago enviado | 4 | **4** |
| **Pagos** | **0** | **2** |

**«Cero ventas» era falso.** Los 2 pagos son contactos con etiqueta `wsp-masivo` cuya
oportunidad de pago tiene fuente `COMPRA WEB` — ver §2b, que es el mecanismo de fondo.

La conclusión de fondo aguanta (1,2% contra 14,2%, con 985 casos), pero **la comparación de
ventas 2 vs 1 no significa nada** con números tan chicos y no se debe usar.

**Regla que sale de esto:** la fuente de una oportunidad describe *cómo entró esa oportunidad*,
no *de dónde viene la persona*. Para poblaciones (campañas, disparos, listas) hay que contar
por etiqueta del contacto, que sobrevive a la creación de oportunidades nuevas.

---

## 2. El disparo masivo no funcionó

| | Anuncios de Meta | Disparo masivo WhatsApp |
|---|---|---|
| Período de creación | 25–31 ago | 17–26 ago |
| Personas | 204 | **980** |
| Avanzaron a etapa positiva | 29 (**14,2%**) | 9 (**0,9%**) |
| Pagos | 1 | **0** |
| Siguen en «Lead Nuevo» | 55% | **949 = 96,8%** |

**949 de 980 nunca salieron de «Lead Nuevo».** No es que se caigan al momento de comprar: es
que casi ninguno contesta. El disparo mueve gente **15 veces peor** que los anuncios, y no
produjo una sola venta.

Envíos por día: 96 (17-ago) · 98 (18) · 98 (19) · 196 (21) · **492 (26-ago)**.
Etiqueta dominante: `aniversario` (492).

### Las dos advertencias, ahora con números

1. **Los 1.000 envíos de esta semana.** El disparo anterior fue de 980 y rindió 0,9% y cero
   ventas. Repetirlo sobre el mismo segmento es repetir un experimento que ya dio resultado
   negativo, con muestra grande y sin ambigüedad estadística.
2. **Riesgo de la línea.** 980 plantillas a una lista sin opt-in reciente, con 96,8% sin
   responder, es exactamente el perfil que degrada la calificación de calidad del número. Es
   la misma línea por la que entra toda la atención de la clínica.

---

## 2b. EL MECANISMO: al cobrar, el CRM abre una ficha nueva y pierde el origen

**21 de los 26 pagos tienen fuente `COMPRA WEB`.** No son el lead original que avanzó de etapa:
son **oportunidades nuevas** creadas por el checkout, sin las atribuciones del contacto original.

Esto explica varias cosas a la vez:
- Por qué **ningún pago tiene atribución de Meta**: la oportunidad de pago nace sin ella.
- Por qué el disparo «no tenía ventas» contándolo por fuente: sus 2 pagos son `COMPRA WEB`.
- Por qué las **etiquetas** sí sobreviven: viven en el contacto, no en la oportunidad.

**Consecuencia para el negocio:** el CRM de Palavas **no puede** hoy atribuir una venta a su
origen. No es un bug del panel ni nuestro — es cómo está armado el flujo de cobro. Se arregla
enlazando el cobro al contacto.

### La prueba que descarta el duplicado de contactos

Antes de culpar al panel había que descartar que los pagos fueran las MISMAS personas bajo un
contacto duplicado. Se cruzaron los **26 pagos** contra los **206 leads de Meta** por
**teléfono (8 últimos dígitos), correo y nombre normalizado**:

**Coincide 1.** Y es el pago de Chillán que ya estaba contado. Los otros 25 son gente que nunca
pasó por un anuncio. Ninguno de los 26 quedó sin datos para cruzar.

También se descartó el contacto con varias oportunidades: de 3.819 opps hay 3.757 contactos
únicos y solo 61 con más de una; **0** pagos tienen un contacto con otra oportunidad atribuida
a Meta.

---

## 3. ⛔ El panel y el CRM no coinciden — y la diferencia invierte el reporte

Cruce de la ventana 25–31 ago, mismas oportunidades, misma regla de atribución que usa el panel:

| | Panel (`ads.heat.cl`) | GoHighLevel (directo) |
|---|---|---|
| Leads | 235 *(de Meta)* | 204 oportunidades |
| **Pago realizado** | **16** | **1** |
| Agendado | 17 | 1 |
| Link de pago enviado | 1 | **1 ✅** |
| Calificado | 48 | 26 |

Y por conjunto, **el orden se da vuelta**:

| Conjunto | Panel: pagos | GHL: avanzaron | GHL: pagos |
|---|---|---|---|
| Estética Santiago Oriente | 11 | 7 de 74 (9,5%) | **0** |
| Depilación Láser Chillán | 4 | 20 de 61 (**32,8%**) | **1** |
| Depilación Láser Santiago | 1 | 2 de 69 (2,9%) | 0 |

El reporte dice «cosmetología es el mejor negocio de la cuenta». **Según el CRM, el mejor es
Chillán** — el que el reporte manda a recortar.

### Contexto que hace la diferencia difícil de explicar como error de lectura

- En **todo el embudo, desde el 22 de mayo, existen 26 pagos**. El panel atribuye 16 a una
  semana de una campaña.
- De esos 26 pagos: **21 tienen fuente `COMPRA WEB`**, 4 `Web`, 1 vacía. **Ninguno `Facebook`.**
- **0 de los 26** tiene atribución de Meta, ni en la oportunidad ni en el contacto. Sus objetos
  de atribución vienen vacíos, mientras que las 206 oportunidades de Meta traen atribución
  completa (`utmCampaignId`, `utmAdId`, `utmContent`, `adSource`).

### Lo que se descartó (para que no se repita el trabajo)

| Hipótesis | Resultado |
|---|---|
| Subcuenta equivocada | ❌ `/locations/QTkb…` responde `CLINICA PALAVAS` |
| Un segundo embudo | ❌ la API devuelve **1** pipeline; 3.820 opps en la subcuenta vs 3.819 en el embudo |
| Datos de muestra (demo) | ❌ `lib/ghl.ts:172-177` prohíbe el demo en modo tenant |
| Atribución a nivel de contacto | ❌ `getCampaignByContact` existe pero **nadie la llama** (código muerto) |
| Confusión won/lost | ❌ las 3.819 oportunidades están en `status: "open"` |
| Reordenamiento masivo de etapas hoy | ❌ 53 cambios el 31-ago, sin movimiento en bloque |
| Citas de calendario | ❌ los 7 calendarios son personales, sin agenda de reservas |

**No se identificó el mecanismo que produce 16/17/48 en el panel**, y tras §2b la lista de
explicaciones benignas quedó vacía: no es atribución perdida, no es contacto duplicado, no es
oportunidad múltiple.

### Cómo zanjarlo en 10 segundos (no se puede desde acá)

El pie de la tabla del panel dice: *«Haz clic en los números de tu CRM para ver quiénes son»*.
**Hacer clic en el 16.**
- Si salen 16 nombres que en GHL están en «Pago Realizado» → el error es de esta lectura.
- Si salen nombres de otras etapas, o que no existen → el error es del panel.

Predicción falsable de esta lectura: el único pago atribuible a la campaña es un lead de
**«Depilacion Laser Chillan vid1 v1» del 27-ago**. Cualquier otro nombre bajo cosmetología
contradice este análisis. Que la columna «link de pago
enviado» dé **1 en ambos** sugiere que el panel lee la misma fuente y que la diferencia está en
cómo cuenta, no en qué lee. Esto se cierra corriendo el panel contra esta subcuenta con logs,
no desde acá.

---

## 4. Dos bugs reales encontrados en `heat-ads` (independientes de lo anterior)

1. **`lib/stages.ts` · `bucketForStageName`** — clasifica por nombre con
   `/asisti|atendid|realizad|propuesta/`. La etapa de Palavas se llama **«Pago Realizado»** →
   matchea `realizad` → cae en bucket **`asistio`**, no `vendido`. Y ninguna etapa de Palavas
   matchea `/ganad|won/`, así que **para este cliente ninguna etapa mapea nunca a «vendido»**.
2. **`isWonOpp` (`lib/funnel.ts:33`)** exige `status === "won"`. Las 3.819 oportunidades de
   Palavas están en `"open"` — la clínica no usa won/lost. Entonces `vendidos`, `revenue` y
   `totalWon` son **0 estructural** para este cliente, y el fallback por bucket tampoco salva
   porque el bucket es `asistio` (bug 1).

---

## 5. Qué hacer, en orden

1. **Congelar el reporte al cliente.** Afirma 16 ventas y $25.847 por venta; el CRM dice 1.
2. **Frenar los 1.000 envíos** hasta discutir el 0,9%.
3. **Resolver la discrepancia del panel** corriéndolo contra esta subcuenta. Es lo que decide
   si el reporte se corrige o se reescribe entero.
4. **Preguntar a la clínica dónde registran las ventas de los leads de anuncios.** Si cobran
   fuera de GHL, el CRM nunca lo va a ver y el cruce necesita otra fuente.
5. Arreglar los dos bugs de §4.

---

## Reproducibilidad

Bajada y análisis: `scripts/` de esta carpeta no aplica — se hizo con llamadas directas a
`services.leadconnectorhq.com/opportunities/search` paginando por `startAfter`/`startAfterId`
(el `page` tope a 5.000, ver `lib/ghl.ts:81`). El PIT se usó solo como variable de sesión y
**no está en el repo**; hay que pedirlo de nuevo y rotarlo.
