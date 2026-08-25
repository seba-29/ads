# Landings de Ondex — conexión a GHL y salida a producción

> Revisión del código entregado el 25-ago-2026 + la integración ya escrita.
> Stack: Vite 8 + React 19 + TypeScript + Tailwind 4 + framer-motion.
> Las dos compilan limpio (`npm run build`, ~1,2s, 126 kB gzip de JS).

---

## 🚨 Lo primero: el formulario tiraba los leads a la basura

En las dos landings, `handleSubmit` era esto:

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);   // pinta el "¡Listo!"
  setForm(emptyForm);   // borra lo que la persona escribió
};
```

**No hay `fetch`, no hay backend, no hay webhook.** El dato nunca salía del navegador.

Y acto seguido la pantalla de éxito dice:

> *"Un agente de Ondex se va a contactar contigo dentro de los próximos 5 minutos
> por WhatsApp"*

Si esto se publicaba así, **cada persona que llenaba el formulario recibía esa promesa
y sus datos se perdían.** Con tráfico pagado encima, es plata quemada sin dejar rastro.

Verificado con `grep` sobre `src/` y `index.html` de ambos proyectos: cero coincidencias
de `fetch(`, `wa.me`, `webhook`, `fbq`, `gtag` o `dataLayer`.

### Otras dos que venían del mismo lado

- **El botón "Hablar por WhatsApp" no hacía nada.** `type="button"`, sin `onClick` y
  sin `href`. Ya estaba anotado en `PENDIENTES.md` (punto 4: falta el número).
- **No había píxel ni analítica de ningún tipo.** `index.html` estaba en el estado por
  defecto de Vite: `lang="en"` en un sitio en español, `<title>ondex-landing</title>`,
  sin meta description ni Open Graph.

---

## La decisión: formulario propio conectado a GHL, no un embed de GHL

Es la pregunta que había sobre la mesa. La respuesta es **quedarse con el formulario
que ya está y conectarlo por detrás.** Cuatro razones, la primera decisiva:

### 1. El píxel — esta es la que manda

Un formulario embebido de GHL vive en un **iframe de otro dominio**. Cuando la persona
envía, el evento ocurre dentro de ese iframe y **la página madre no se entera**: no
puedes disparar `fbq('track', 'Lead')` en el momento del envío.

Peor: sin control del envío no puedes generar el `eventID` que **deduplica** el evento
del navegador contra el que la API de Conversiones manda después desde el CRM. Sin esa
pareja, Meta cuenta el mismo lead dos veces o no lo cuenta, y todo el plan de medición
(`Lead` → `Schedule` → `Purchase`) se cae.

### 2. El diseño
El formulario vive dentro de una tarjeta de dos columnas con foto a la izquierda. Un
iframe no hereda los tokens de marca: se va a ver pegado con scotch. Y los iframes de
GHL son conocidos por pelear con la altura y el scroll en mobile.

### 3. La velocidad
Un iframe es un segundo documento que cargar. En una landing de tráfico pagado, en
mobile y con red chilena, eso se paga en conversión.

### 4. El traspaso a WhatsApp
La estrategia depende de que al enviar, la persona caiga en WhatsApp con Heat esperando.
Con formulario propio controlas el `wa.me` con mensaje prellenado. Desde dentro de un
iframe de GHL estás peleando contra el comportamiento del iframe.

**Lo único que el formulario de GHL regala es la plomería al CRM.** Son ~30 líneas de
código. No vale las cuatro cosas de arriba.

---

## Lo que quedó implementado

### `src/lib/leads.ts` *(nuevo, en ambos proyectos)*

| Función | Qué hace |
|---|---|
| `enviarLead()` | POST JSON al Inbound Webhook de GHL, con timeout de 10s y errores tipados |
| `dispararLeadPixel()` | `fbq('track','Lead')` con el `eventID` que deduplica contra CAPI |
| `urlWhatsApp()` | Link `wa.me` con mensaje prellenado; `undefined` si no hay número |
| `normalizarTelefono()` | Deja todo en E.164 chileno: `+569XXXXXXXX` |

**Lo que viaja a GHL en cada lead:**

```
first_name, phone, zona_dolor, tiempo_dolor, origen_landing, event_id,
utm_source, utm_medium, utm_campaign, utm_content, utm_term,
gclid, fbclid, fbp, fbc, landing_url, referrer
```

**`fbp`, `fbc` y `fbclid` no son relleno.** Son los identificadores que Meta necesita
para reconocer que ese lead vino de ese anuncio. Sin ellos, los eventos `Schedule` y
`Purchase` que GHL mande después por CAPI **no se pueden atribuir a ninguna campaña**
y Meta nunca aprende qué anuncio trae pacientes.

Detalle fino que quedó cubierto: la cookie `_fbc` la escribe el píxel, pero puede no
existir todavía en el primer pageview. Si en la URL viene `fbclid` y la cookie no está,
`leads.ts` la arma a mano con el formato de Meta (`fb.1.<timestamp>.<fbclid>`).

### `Formulario.tsx` *(modificado en ambos)*
- Envío real con estado `enviando` y botón bloqueado + spinner mientras va
- Mensaje de error visible si GHL no responde, que empuja a WhatsApp como salida
- **Trampa anti-spam** (campo `empresa` fuera de pantalla y fuera del tab): si viene
  llena, se finge éxito y no se envía nada
- Botón **"Hablar ahora por WhatsApp"** en la pantalla de éxito — el traspaso instantáneo a Heat
- El botón "Hablar por WhatsApp" de abajo ahora **sí es un link**

### `index.html` *(modificado en ambos)*
- Píxel de Meta, con guard: si `VITE_META_PIXEL_ID` va vacío, no carga nada
- `lang="es-CL"`, title real, meta description, Open Graph y Twitter card

---

## Configurar GHL

1. **Automatización → Workflows → Create Workflow**
2. Trigger: **Inbound Webhook**. GHL entrega una URL — esa va en `VITE_GHL_WEBHOOK_URL`.
3. Enviar un lead de prueba desde la landing para que GHL **aprenda el esquema** del JSON.
4. Acción **Create/Update Contact**, mapeando:

   | Campo del JSON | Destino en GHL |
   |---|---|
   | `first_name` | Nombre |
   | `phone` | Teléfono |
   | `zona_dolor` | Campo personalizado |
   | `tiempo_dolor` | Campo personalizado |
   | `origen_landing` | Campo personalizado *(o un tag)* |
   | `event_id` | Campo personalizado — **necesario para deduplicar el evento de CAPI** |
   | `fbp`, `fbc`, `fbclid`, `gclid`, `utm_*` | Campos personalizados |

5. Agregar tag según `origen_landing` (`landing-kinesiologia` / `landing-metodo`).
6. Enganchar el workflow de Heat para que conteste al instante.

### Sobre la seguridad del webhook
La URL queda **visible en el bundle** que llega al navegador — lo verifiqué en el build.
Esto es aceptable: un Inbound Webhook sólo permite **crear** contactos, nunca leer datos.
No es una credencial que dé acceso a la cuenta.

**Lo que NUNCA puede ir en una variable `VITE_`** es una API key privada de GHL: todo lo
que empieza con `VITE_` termina en el JavaScript público.

El riesgo real es spam. Cubierto en tres capas: la trampa del formulario, filtro del lado
de GHL (descartar si falta `zona_dolor`, por ejemplo), y si algún día molesta de verdad,
un proxy serverless que esconda la URL. Para una clínica, con lo que hay basta.

---

## Salir a producción en el subdominio

Las dos son SPA de una sola página, **sin router**. No hacen falta reglas de rewrite.
`npm run build` deja todo en `dist/`, con las rutas colgando de la raíz — por eso
funcionan en un subdominio sin tocar `base` en `vite.config.ts`.

Subdominios sugeridos:

| Landing | Subdominio |
|---|---|
| Método | `metodo.clinicaondex.cl` |
| Kinesiología | `kinesiologia.clinicaondex.cl` |

### Si el hosting es cPanel / hosting compartido
1. `npm run build` en local
2. Crear el subdominio en cPanel, apuntando a su propia carpeta
3. Subir **el contenido de `dist/`** (no la carpeta `dist` en sí) a esa carpeta
4. Activar SSL con Let's Encrypt (AutoSSL)
5. Cada cambio = build local + resubir

### Si el hosting es Netlify / Vercel / Cloudflare Pages
1. Subir cada proyecto a su repositorio
2. Conectar el repo. Build command `npm run build`, publish directory `dist`
3. Cargar las variables `VITE_*` en el panel del proveedor
4. Agregar el dominio personalizado, SSL automático

Esta segunda opción es bastante mejor: cada push despliega solo, hay rollback, y abre
la puerta a mover el webhook a una función serverless.

### Peso de los assets
`metodo-ondex/public` pesa **31 MB**, de los cuales **24 MB son los 11 testimonios**.
No es un problema de carga inicial: el carrusel usa `preload="metadata"`, así que sólo
pide las cabeceras. Pero conviene:
- Agregarle `poster` a los `<video>` para que se vea el primer cuadro al instante
- Si el hosting es compartido y lento, mover los videos a un CDN

---

## Corrección a la ficha: Ondex SÍ tiene material de video

`clinica-ondex.md` dice *"no tienen contenido suficiente utilizable para anuncios en
video"*. **Ya no es así.** En `metodo-ondex/public/testimonios/` hay **11 testimonios
reales de pacientes en formato vertical 9:16**, ya montados en la landing.

Eso es exactamente el creativo más valioso que existe para esta cuenta, en el formato
que Meta quiere, y estaba dado por perdido. Cambia el diagnóstico del cuello de botella
creativo que levanté al revisar el board de Matías.

Kinesiología sigue sin video propio — usa un marquee de reseñas de Google.

---

## Discrepancia con el board de Matías

El board describe **"Landing Kinesiología 1 — form en 2 pasos"** y toda la Fase 3 se
apoya en distinguir *"completa Paso 1, no termina"* de *"no completa ni el Paso 1"*.

**El formulario real es de un solo paso con 4 campos** (nombre, WhatsApp, dolor, tiempo).
No hay paso 1 ni paso 2, y por lo tanto **la captura parcial no existe**: si la persona
no envía, no queda nada.

Hay que decidir cuál de los dos manda:

- **Dejarlo en un paso** — menos fricción, y 4 campos ya es corto. Entonces hay que
  corregir el board: la rama "completa Paso 1 y no termina" desaparece.
- **Partirlo en dos** — paso 1 nombre + WhatsApp (se dispara `Lead_Parcial` al pasar de
  paso), paso 2 dolor + tiempo. Recupera a quien abandona, y es lo que el board asume.

**Mi recomendación: partirlo en dos.** Nombre y WhatsApp es todo lo que Heat necesita
para empezar a conversar; el resto lo pregunta en el chat. Quien abandone después del
paso 1 igual entra al CRM y Heat lo toma. Es volumen que hoy se pierde entero.

---

## Lo que sigue bloqueado

| Pendiente | Quién |
|---|---|
| **Número de WhatsApp de la clínica** | Cliente — sin esto los botones quedan ocultos |
| **URL del Inbound Webhook** | Se genera al crear el workflow en GHL |
| **ID del píxel de Meta** | Business Manager |
| **Qué hosting es** | Define los pasos de deploy |
| Campos personalizados en GHL | Crearlos antes del primer lead de prueba |
| Decidir 1 paso vs 2 pasos | Define si se toca el board o el formulario |
| Imagen Open Graph 1200×630 | Hoy apunta a `/foto-evaluacion.jpg`, que no tiene esa proporción |

Los tres primeros son de configuración: en cuanto lleguen, van al `.env` y esto queda
funcionando de punta a punta.
