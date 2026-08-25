# Mapeo del webhook → campos de GHL

> Subcuenta **Clínica Ondex** · `CHtgjFPx4hWkSAtKewIo`
> Campos creados el 25-ago-2026. **Ya están los 15** — no hay que crear nada más.

---

## Datos confirmados

| | |
|---|---|
| **WhatsApp de la clínica** | `+56952296611` |
| **Píxel de Meta** | ✅ `1354537603365442` *(dataset «Clínica Ondex»)* |
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

## ✅ Píxel: resuelto — se usa «Clínica Ondex» `1354537603365442`

Había tres conjuntos de datos en la cuenta y el candidato inicial era el equivocado.
Comparados lado a lado:

| | **Clínica Ondex** ✅ | Landing ❌ |
|---|---|---|
| ID | `1354537603365442` | `736328569555463` |
| Sitios web | **solo `clinicaondex.cl`** | `clinicaondex.cl` **y 2 más** |
| Página de Facebook | `124293844098117` | — |
| Instagram | `17841473227720180` | — |
| PageView | **4.100** | 370 |
| Otros eventos | `Ver contenido` (10) | `Comprar`, `Iniciar pago`, `Completar registro` |
| Integración | Navegador — una sola fuente | Múltiple |

**«Landing» es un píxel genérico compartido entre proyectos.** Tres dominios disparando
adentro y eventos de tienda que una clínica de kinesiología no genera. Si se usaba ese,
cualquier público de retargeting habría mezclado visitantes de los otros dos dominios —
pagando impresiones a gente que nunca vio Ondex.

«Clínica Ondex» tiene la página y el Instagram de la clínica colgando, un solo dominio
y el historial real. Es el correcto y es el que quedó compilado en las dos landings.

### Lo que esto habilita desde el día uno

El conjunto ya lleva **4.100 PageView acumulados** del sitio actual, con tráfico
constante de ~100/día. Eso significa que **ya hay un público de retargeting formado**
antes de encender el primer anuncio — no hay que esperar a juntarlo.

### Lo que queda por revisar en Meta

| Tarea | Por qué |
|---|---|
| **Verificar el dominio `clinicaondex.cl`** en Configuración del negocio → Seguridad de marca → Dominios | Cubre también los subdominios `metodo.` y `kinesiologia.`. Sin esto, la medición web en iOS queda coja. |
| **Ordenar la priorización de eventos** (Medición de eventos agregados) | El orden importa: `Purchase` → `Schedule` → `Lead` → `Lead_Parcial` → `ViewContent` → `PageView`. |
| Revisar las **6 acciones recomendadas** del conjunto | Meta marca «gasto publicitario afectado por una baja calidad de datos». Conviene mirarlas antes de invertir. |
| Confirmar qué integración manda hoy la **API de Conversiones** | El conjunto dice tenerla conectada, pero nuestro flujo desde GHL todavía no existe. Hay que saber qué la está usando. |

---

## ✅ Probado contra el GHL real — 25-ago-2026

Tres rondas de prueba disparando el webhook de verdad, con el workflow publicado.

| Verificación | Resultado |
|---|---|
| Un solo contacto (parcial + completo, mismo teléfono) | ✅ |
| Una sola oportunidad | ✅ |
| Permitir reingreso | ✅ el segundo envío entra |
| `Tipo de lead` sobrescrito a `lead_completo` | ✅ |
| `Zona del dolor` y `Tiempo con el dolor` | ✅ solo los escribe el envío completo |
| Etiqueta de landing sin caracteres invisibles | ✅ `landing-kinesiologia` |
| `lead-parcial` eliminada al llegar el completo | ✅ |
| Atribución de Meta (`fbclid`, `fbp`, `fbc`) | ✅ |
| UTMs (los cinco) | ✅ |

### Dos pendientes, ninguno bloquea el lanzamiento

**1. `Origen landing` guarda el identificador, no el nombre.** Queda `kinesiologia`
en vez de `Kinesiología`. En el nodo «Crear contacto» hay que apuntar ese campo a
**`origen_landing_nombre`** en lugar de `origen_landing`. La clave nueva sólo aparece
en el selector después de volver al disparador → **Buscar nuevas solicitudes** → elegir
la más reciente → guardar. Es cosmético: la etiqueta y el filtrado ya funcionan.

**2. `gclid` no se está guardando.** Llegó `TEST_GCLID_777` en el envío y el campo
quedó vacío. Revisar si está mapeado en el nodo; si lo está y aun así no escribe,
el campo estándar de GHL puede no ser escribible desde un workflow y hay que crear
uno personalizado (`gclid_landing`).

Sin `gclid` **no se puede atribuir un paciente al clic de Google Ads**. No urge porque
Google todavía no corre, pero hay que resolverlo antes de encender esa parte. La
atribución de Meta sí está completa.

### Sobre el identificador de la landing

La landing manda **dos formas del mismo dato**, a propósito:

| Clave | Vale | Para qué |
|---|---|---|
| `origen_landing` | `metodo-ondex` · `kinesiologia` | Arma la etiqueta. Sin tildes ni espacios para que nunca se rompa. |
| `origen_landing_nombre` | `Método Ondex` · `Kinesiología` | Lo que lee la clínica en la ficha. |

Un espacio no separable (`\xa0`) en una etiqueta la vuelve imposible de escribir a mano
— pasó en la primera prueba y por eso el identificador va sin espacios.
