# CAPI · Asistencia Legal Deudores — diagnóstico del 8-sep-2026

> Investigación previa a tocar nada. Todo lo de abajo está verificado contra el
> Graph API de Meta o contra el código de `heat-ads`. Lo que es hipótesis va
> marcado como hipótesis.

## Resumen en una línea

**El CAPI ya está enviando.** Lead, Schedule y Purchase entran al dataset todos
los días, último evento hoy a las 07:36. El trabajo no es configurar: es
resolver una sospecha de doble emisor y subir la calidad de coincidencia.

---

## 1. Lo que hay hoy

### El dataset
| | |
|---|---|
| **Dataset activo** | `1102441958775610` — "Asistencia Legal Deudores" |
| **Business** | `929736642112662` |
| **Creado** | 28-jul-2026 |
| **Último evento de servidor** | **8-sep-2026 07:36** |
| **Canal** | `crm` (y espejo en `web`) |
| **Dataset viejo** | `929349679209666` — "API Asistencia Legal Deudores Ema", último evento **abr-2025**. Muerto, ignorar |

⚠️ Los conjuntos de anuncios activos tienen `promoted_object.pixel_id = null`.
El dataset no está enganchado a la optimización de las campañas: recibe
eventos pero **ninguna campaña optimiza hacia ellos**. Es medición, todavía no
es optimización.

### Volumen — 1 al 7 de septiembre (7 días completos)
| Evento | Total | Por día |
|---|---:|---:|
| Lead | ~456 | ~65 |
| Schedule | ~133 | ~19 |
| Purchase | ~29 | **~4** |

### Calidad de coincidencia (EMQ, escala 0-10)
| Evento | EMQ | email | phone | external_id | fn | ln | country |
|---|---:|---:|---:|---:|---:|---:|---:|
| Lead | **5,2** | 94,8% | 94,8% | — | 100% | 39,7% | 100% |
| Schedule | **6,4** | 91,4% | 97,1% | 100% | 100% | 60% | — |
| Purchase | **6,4** | 87,5% | 100% | 100% | 100% | 62,5% | — |

Meta considera ≥6 aceptable y ≥8 bueno. Estamos en el piso.

---

## 2. El hallazgo que hay que resolver ANTES de tocar nada

### Hipótesis: hay dos emisores mandando al mismo dataset

Tres señales independientes apuntan a lo mismo:

1. **El motor de HEAT no manda nombre ni país.** En
   `app/api/cron/crm/route.ts` el evento se arma solo con:
   ```ts
   contact: { email, phone, externalId: opp?.contactId }
   ```
   No hay `firstName`, `lastName` ni `country`. Pero el dataset reporta
   **fn 100%, ln 39-62%, country 100%**. Esos datos los está poniendo alguien
   más.

2. **Lead llega con cadencia distinta.** `Lead` figura como
   `upload_frequency: hourly`; `Schedule` y `Purchase` como `real_time`. El
   cron de HEAT corre cada 15 minutos y produciría la misma cadencia para los
   tres. Una cadencia distinta = probablemente otro proceso.

3. **`Lead` no trae `external_id`** y los otros dos sí. El motor de HEAT manda
   `externalId` siempre, en todos los eventos.

**El candidato más probable:** la integración nativa de GoHighLevel con Meta
Conversions, configurada en la sub-cuenta antes de que existiera el motor de
HEAT.

### Por qué importa, y mucho

Meta deduplica por `event_id` + `event_name`. El motor de HEAT usa
`event_id = ${oppId}_${stageId}`. Cualquier otro emisor usa su propio esquema.
**Dos emisores con ids distintos = la misma conversión contada dos veces.**

Si esto se confirma, Meta lleva semanas creyendo que la cuenta genera el doble
de conversiones de las que genera. Eso no es un detalle de reportería: el
algoritmo optimiza hacia un número inflado.

### Cómo verificarlo (10 minutos, en Events Manager)
1. Events Manager → dataset `1102441958775610` → **Orígenes de datos**. Contar
   cuántas integraciones de servidor figuran.
2. En **Descripción general del evento** → `Lead` → ver si Meta reporta
   eventos duplicados o "sin deduplicar".
3. En la sub-cuenta de GHL de Asistencia Legal: Configuración →
   Integraciones → ver si hay una conexión de Facebook Conversions activa.

**Hasta no resolver esto, no se agrega ningún emisor nuevo ni se cambia el
motor.** Sumar precisión encima de un doble conteo es empeorarlo.

---

## 3. La mejora más grande disponible: `lead_id`

Asistencia Legal es un cliente **100% de formulario instantáneo de Meta**. No
tiene web, no tiene píxel de navegador. Para ese caso Meta ofrece el match
determinista por `lead_id` — el identificador del lead del formulario. No es
probabilístico como el hash de email o teléfono: es exacto, y ata la conversión
al anuncio específico que la produjo.

**Ninguno de los eventos actuales lo lleva.** No aparece en las claves de match
del dataset.

**La buena noticia:** `lib/capi.ts` ya lo soporta.
```ts
// línea 87
leadId?: string | null;
// línea 134
if (c.leadId) userData.lead_id = c.leadId;
```
Está construido y nunca se usa. El motor no lo pasa porque
`getOpportunities()` en `lib/ghl.ts` no lo devuelve: `OppRecord` trae
`id, name, contactId, email, phone, company, createdAt, stageId, status,
monetaryValue` y la atribución (`utmAdId`, `utmCampaignId`, `mediumId`), pero
no el `lead_id` de Meta.

### De dónde sacarlo — dos caminos, hay que verificar cuál sirve
| Camino | Cómo | Riesgo |
|---|---|---|
| **A. Desde GHL** | Ver si el contacto guarda el lead id de Meta en algún campo (custom field o en `attributions`). Requiere abrir un contacto real que haya entrado por formulario | Puede simplemente no estar |
| **B. Desde Meta** | `GET /{ad_id}/leads` devuelve `id` (= lead_id) + `field_data` con email y teléfono. Se cruza con el contacto de GHL por email/teléfono y se guarda la equivalencia | Más trabajo, pero no depende de que GHL lo exponga |

El camino A se descarta o confirma en 10 minutos abriendo un contacto.

---

## 4. Mejora barata y sin riesgo: los campos que ya soporta el motor

`buildLeadEvent` acepta `firstName`, `lastName`, `country`, `city`, `state`,
`zip`, `dob`. El cron no manda ninguno. Agregar nombre, apellido y país sube el
EMQ sin ninguna decisión de diseño de por medio.

**Ojo:** si se confirma el doble emisor, esto es lo que ya está aportando el
otro proceso. Primero se resuelve el emisor duplicado, después se enriquece.

---

## 5. Lo que esto le contesta al negocio

En la ficha quedó abierta la pregunta más importante de la cuenta: **de los dos
precios de lead que conviven ($1.022 y $6.326), ¿cuál cierra mejor?**

Los eventos `Purchase` que ya están llegando son la respuesta, si el pipeline
los está generando de verdad. **~4 Purchase por día ≈ 120 al mes.** Con
$4.000.000 mensuales de inversión, eso da **≈ $33.000 por venta**.

⚠️ **Ese número es una estimación cruda y hay que validarla con Emma:**
- Un evento `Purchase` significa "una oportunidad llegó a la etapa mapeada como
  venta ganada". Falta confirmar cuál es esa etapa en su embudo y si la mueven
  con disciplina.
- No sé si `monetaryValue` está poblado en GHL. Si lo está, tenemos ingreso
  real por lead, no solo conteo.

Si se confirma, esto reemplaza al ticket promedio que llevamos días pidiendo:
en vez de esperar un dato, lo medimos.

---

## 6. Plan propuesto, en orden

| # | Paso | Quién | Bloquea a |
|---|---|---|---|
| 1 | Verificar si hay dos emisores (§2) | Seba, en Events Manager + GHL | todo lo demás |
| 2 | Si hay dos: apagar el que no controlamos | Seba | 3, 4 |
| 3 | Confirmar la etapa "venta ganada" del embudo y si `monetaryValue` se llena | Seba con Emma | el veredicto de negocio |
| 4 | Ver si GHL expone el lead id de Meta (§3, camino A) | Seba, abriendo un contacto | 5 |
| 5 | Implementar `lead_id` + fn/ln/country en el motor | Claude, en `heat-ads` | — |
| 6 | Enganchar el dataset a la optimización de campañas | después de que 1-5 estén sanos | — |

**El paso 6 va al final a propósito.** Poner las campañas a optimizar hacia un
dataset que puede estar contando doble sería el peor momento posible para
hacerlo.

---

## 7. Lo que NO pude verificar desde acá

- **El estado en la base de datos de heat-ads.** El proyecto Supabase de
  `heat-ads` no está en esta conexión MCP, así que no pude leer `tenants`,
  `attribution_rules` ni `capi_events_log`. No sé qué reglas etapa → evento
  tiene cargadas Asistencia Legal ni cuántos envíos le fallan.
- **La sub-cuenta de GHL de Asistencia Legal.** No tengo su token.
- Ambas cosas se resuelven abriendo el panel de admin de heat-ads en
  `/admin/<id>`, que ya muestra el semáforo de CAPI (`lib/capi-salud.ts`), las
  reglas (`components/admin/ReglasCapi.tsx`) y el log de eventos
  (`components/EventsLog.tsx`).

---

## 8. Crédito donde corresponde

El motor que Piero construyó es sólido y resuelve problemas que la mayoría de
las agencias no se plantea. Vale documentar lo que ya está resuelto, para no
reinventarlo:

- **No depende de workflows dentro del GHL del cliente.** El panel detecta los
  cambios de etapa por su cuenta (`lib/crm-motor.ts`). Antes dependía de un
  workflow armado a mano por cliente y el resultado medido fue: ni un solo
  cliente había enviado un evento nunca.
- **Primera pasada sin enviar.** La primera vez que mira a un cliente solo
  anota dónde está cada oportunidad. Enviar ahí mandaría cientos de
  conversiones históricas fechadas hoy y le arruinaría el aprendizaje a Meta.
- **Freno de mano por volumen** (`volumenSospechoso`). Nació de un incidente
  real: la paginación de PostgREST cortaba en 1.000 filas y el motor intentó
  mandar 401 conversiones falsas de Clínica Palavas.
- **Lo que Meta rechaza no se marca como enviado**, así se reintenta; y a las
  24 horas se da por perdido para que la cola avance. También de un incidente
  real: 512 conversiones rechazadas que se habían dado por enviadas.
- **Las reglas se proponen desde los nombres reales de las etapas**, y lo que
  no se reconoce no se propone. Adivinar manda un `Purchase` falso.
- **Un evento, una etapa.** Dos etapas que suenan al mismo hito duplicaban la
  conversión.
