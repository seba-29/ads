# Armar la automatización en GoHighLevel — paso a paso

> Subcuenta **Clínica Ondex** · `CHtgjFPx4hWkSAtKewIo`
> Los 15 campos personalizados ya están creados. Esto es lo único que falta.

---

## El orden importa

No se pueden mapear campos que GHL todavía no ha visto. Por eso:

```
crear el workflow  →  copiar la URL  →  yo mando la prueba  →  recién ahí mapear
```

Si intentas mapear antes de que llegue un envío real, el selector de campos va a
estar vacío.

---

## Paso 1 — Crear el workflow

1. Menú lateral → **Automatización** → **Workflows**
2. **+ Crear workflow** → **Empezar desde cero**
3. Nombre: **`Landing — Nuevo Lead`**

## Paso 2 — El disparador

1. **Agregar nuevo disparador**
2. Buscar y elegir **Inbound Webhook**
3. GHL muestra una **URL**. Cópiala.
4. Si aparece un botón tipo **«Fetch Sample Request»** o **«Escuchar»**, apriétalo:
   deja el disparador esperando el envío de prueba.
5. **Pásame la URL.** Le mando el JSON real de la landing y GHL aprende el esquema.

## Paso 3 — ⚠️ La configuración que todos olvidan

Antes de seguir, arriba a la derecha → **Configuración** del workflow:

**Activar «Permitir reingreso» (Allow Re-Entry).**

Sin esto, la automatización procesa a cada persona **una sola vez**. Como el mismo
contacto entra dos veces — primero `lead_parcial` y después `lead_completo` — el
segundo envío se descarta en silencio y **la zona del dolor y el tiempo nunca se
guardan**. El formulario funcionaría, GHL recibiría, y los datos igual se perderían.

Es el error más caro de este armado y no da ninguna señal cuando pasa.

## Paso 4 — Crear o actualizar el contacto

Agregar acción → **Crear/Actualizar contacto**.

Cada valor se toma del envío con el selector de variables
(`{{inboundWebhookRequest.<campo>}}`):

| Llega como | Guardar en |
|---|---|
| `first_name` | **Nombre** *(estándar)* |
| `phone` | **Teléfono** *(estándar)* |
| `gclid` | **gclid** *(estándar)* |
| `zona_dolor` | Zona del dolor |
| `tiempo_dolor` | Tiempo con el dolor |
| `origen_landing` | Origen landing |
| `evento` | Tipo de lead |
| `event_id` | Event ID Meta |
| `fbclid` | fbclid |
| `fbp` | fbp |
| `fbc` | fbc |
| `utm_source` | UTM source |
| `utm_medium` | UTM medium |
| `utm_campaign` | UTM campaign |
| `utm_content` | UTM content |
| `utm_term` | UTM term |
| `landing_url` | URL de la landing |
| `referrer` | Referrer |

El contacto se identifica **por teléfono**. La landing lo manda siempre en formato
`+56912345678`, así que el parcial y el completo caen sobre el mismo contacto.

## Paso 5 — Etiquetar por landing

Agregar acción → **Agregar etiqueta**, dentro de una condición según `origen_landing`:

| Si `Origen landing` es | Etiqueta |
|---|---|
| `metodo` | `landing-metodo` |
| `kinesiologia` | `landing-kinesiologia` |

## Paso 6 — Evitar que Heat abra dos conversaciones

Agregar **Si/Entonces** → condición: **el contacto tiene la etiqueta `heat-contactado`**

- **Sí** → **Terminar.** Ya está conversando; lo único que pasó fue que se
  completaron sus datos, y eso ya ocurrió en el paso 4.
- **No** → agregar etiqueta `heat-contactado` → **continuar al paso 7**

Sin esto, quien completa los dos pasos del formulario recibe **dos saludos de Heat**
con segundos de diferencia.

## Paso 7 — Enganchar a Heat

En la rama «No», iniciar la conversación de WhatsApp con el agente.

**Heat tiene que leer los campos personalizados en el momento de responder, no solo
al abrir la conversación.** Si alguien entró como `lead_parcial`, Heat empieza sin
saber dónde le duele; cuando llegue el `lead_completo` esos campos se llenan y Heat
tiene que poder usarlos en el mensaje siguiente.

| Entró como | Qué sabe Heat | Cómo abre |
|---|---|---|
| `lead_parcial` | Nombre y teléfono | Saluda y **pregunta** dónde le duele y hace cuánto |
| `lead_completo` | Todo | Saluda **nombrando** la zona y el tiempo, y ofrece la evaluación |

## Paso 8 — Publicar

Arriba a la derecha, pasar de **Borrador** a **Publicado**. Un workflow en borrador
recibe el webhook y no ejecuta nada.

---

## Prueba final

Cuando esté publicado, mándame la URL de nuevo y disparo un `lead_parcial` seguido
de un `lead_completo` con el mismo teléfono. Lo que tiene que pasar:

- [ ] Se crea **un solo** contacto, no dos
- [ ] Después del segundo envío el contacto tiene **Zona del dolor** y **Tiempo con el dolor** llenos
- [ ] **Tipo de lead** quedó en `lead_completo`
- [ ] Tiene la etiqueta de su landing
- [ ] Tiene `heat-contactado` **una sola vez**
- [ ] Heat abrió **una** conversación

Si Zona del dolor queda vacío → falta el **reingreso** del paso 3.
Si hay dos contactos → el teléfono no está llegando igual en los dos envíos.
Si Heat saludó dos veces → falta la condición del paso 6.
