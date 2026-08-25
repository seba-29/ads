# Mapeo del webhook → campos de GHL

> Subcuenta **Clínica Ondex** · `CHtgjFPx4hWkSAtKewIo`
> Campos creados el 25-ago-2026. **Ya están los 15** — no hay que crear nada más.

---

## Datos confirmados

| | |
|---|---|
| **WhatsApp de la clínica** | `+56952296611` |
| **Píxel de Meta** | `736328569555463` *(dataset «Landing»)* |
| **Subcuenta GHL** | `CHtgjFPx4hWkSAtKewIo` |
| **Enlace del Inbound Webhook** | *pendiente — sale al crear el workflow* |

---

## La acción «Crear o actualizar contacto»

Emparejar así. La columna izquierda es lo que llega en el JSON; la derecha, el campo de GHL.

| Llega como | Guardar en | Tipo |
|---|---|---|
| `first_name` | **Nombre** | estándar |
| `phone` | **Teléfono** | estándar |
| `gclid` | **gclid** | estándar *(GHL ya lo trae)* |
| `zona_dolor` | Zona del dolor | `contact.zona_del_dolor` |
| `tiempo_dolor` | Tiempo con el dolor | `contact.tiempo_con_el_dolor` |
| `origen_landing` | Origen landing | `contact.origen_landing` |
| `evento` | Tipo de lead | `contact.tipo_de_lead` |
| `event_id` | Event ID Meta | `contact.event_id_meta` |
| `fbclid` | fbclid | `contact.fbclid` |
| `fbp` | fbp | `contact.fbp` |
| `fbc` | fbc | `contact.fbc` |
| `utm_source` | UTM source | `contact.utm_source` |
| `utm_medium` | UTM medium | `contact.utm_medium` |
| `utm_campaign` | UTM campaign | `contact.utm_campaign` |
| `utm_content` | UTM content | `contact.utm_content` |
| `utm_term` | UTM term | `contact.utm_term` |
| `landing_url` | URL de la landing | `contact.url_de_la_landing` |
| `referrer` | Referrer | `contact.referrer` |

> `gclid` no se pudo crear como campo personalizado porque **GHL ya lo tiene como campo
> estándar**. Mejor así: se mapea directo al nativo.

Los 9 campos que ya existían (`sesiones_realizadas`, `track_postventa`, `sede_paciente`,
etc.) quedaron intactos. Son de seguimiento clínico post-venta y no se tocan acá.

---

## La bifurcación del workflow

Después de crear el contacto, ramificar según **Tipo de lead**:

| Si `Tipo de lead` es | Significa | Qué hace Heat |
|---|---|---|
| `lead_parcial` | Dejó nombre y WhatsApp, abandonó el paso 2 | Abre conversación al tiro. No tiene el contexto del dolor: **se lo pregunta en el chat.** Tag `lead-parcial`. |
| `lead_completo` | Llenó todo | Abre conversación **ya sabiendo dónde le duele y hace cuánto**. Quitar el tag `lead-parcial` si lo tenía. |

**Un mismo contacto puede llegar dos veces.** Si alguien completa los dos pasos, entran
`lead_parcial` y luego `lead_completo` con el mismo teléfono. GHL actualiza el mismo
contacto, así que hay que evitar que Heat abra dos conversaciones: condicionar el envío
del primer mensaje a que el contacto no tenga ya el tag `heat-contactado`.

Tag por landing, según `Origen landing`: `landing-metodo` / `landing-kinesiologia`.

---

## Ejemplo de lo que llega

Este es el JSON exacto que manda la landing. Sirve para que GHL aprenda el esquema.

```json
{
  "evento": "lead_completo",
  "first_name": "Camila Rojas",
  "phone": "+56987654321",
  "zona_dolor": "talón derecho",
  "tiempo_dolor": "8 meses",
  "origen_landing": "metodo",
  "event_id": "a8920245-3f43-4115-8b4f-5ad34c927697",
  "utm_source": "facebook",
  "utm_medium": "paid",
  "utm_campaign": "metodo-frio",
  "utm_content": "testimonio-fascitis",
  "utm_term": "",
  "gclid": "",
  "fbclid": "PRUEBA_FBCLID_123",
  "fbp": "fb.1.1787683605309.1234567890",
  "fbc": "fb.1.1787683605309.PRUEBA_FBCLID_123",
  "landing_url": "https://metodo.clinicaondex.cl/?fbclid=PRUEBA_FBCLID_123",
  "referrer": "https://l.facebook.com/"
}
```

En la captura parcial llegan los mismos campos, con `evento: "lead_parcial"` y sin
`zona_dolor` ni `tiempo_dolor`.

**Cuando tengas el enlace del webhook, pásamelo y le mando esta prueba desde acá** para
que GHL aprenda el esquema sin que tengas que usar herramientas raras.

---

## ⚠️ Dos cosas del píxel que hay que resolver antes de encender

### 1. Hay dos píxeles de Ondex y estamos por usar el que no lleva su nombre

En el Administrador de Eventos aparecen tres conjuntos de datos:

| Nombre | ID |
|---|---|
| VAMBE | `1481473176277907` |
| **Clínica Ondex** | `1354537603365442` |
| **Landing** | `736328569555463` ← el que me pasaste |

Si las campañas se crean apuntando a **Clínica Ondex** pero la landing dispara hacia
**Landing**, los eventos quedan en un conjunto y la optimización mira el otro.
**Hay que confirmar cuál tiene asociada la cuenta publicitaria** antes de encender.

### 2. El píxel «Landing» ya lo usa otra cosa

Lo que muestra la captura:

- **Sitios web: `clinicaondex.cl` y 2 más** — hay tres dominios disparando al mismo conjunto
- Eventos recibidos: `PageView` 370 · `Ver contenido` 29 · **`Comprar` 2** ·
  **`Iniciar pago` 2** · **`Completar registro` 2**
- La **API de Conversiones ya está conectada** en este conjunto

`Comprar` e `Iniciar pago` son eventos de tienda. Una clínica de kinesiología que no
tiene nada corriendo no debería estar generándolos. Todo indica que **«Landing» es un
píxel genérico compartido entre varios proyectos.**

El problema no es que ensucie un reporte: es que **los públicos se mezclan.** Un
retargeting armado sobre «visitantes del sitio» de este conjunto va a incluir gente de
los otros dos dominios, y les vas a pagar impresiones a personas que nunca vieron Ondex.

**Recomendación:** un conjunto de datos propio y exclusivo para las dos landings de
Ondex, sin nadie más disparando adentro. Si «Clínica Ondex» está limpio, ese.

### 3. Calidad de coincidencias en 6,1/10

Es mediocre, con «Actualización recomendada» en `PageView`. Nuestra implementación
sube esto: manda `fbc`, `fbp` y `fbclid` en cada lead. Cuando además se conecte la API
de Conversiones desde GHL con teléfono y correo hasheados, debería subir bastante más.
