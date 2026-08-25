# Landings de Ondex — conexión a GHL y salida a producción

> Revisión del código entregado el 25-ago-2026 + la integración ya escrita y probada.
> Stack: Vite 8 + React 19 + TypeScript + Tailwind 4 + framer-motion.
> Las dos compilan limpio (`npm run build`, ~1,5s, ~127 kB gzip de JS).

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
y sus datos se perdían.** Con tráfico pagado encima, plata quemada sin dejar rastro.

Verificado con `grep` sobre `src/` y `index.html` de ambos proyectos: cero coincidencias
de `fetch(`, `wa.me`, `webhook`, `fbq`, `gtag` o `dataLayer`.

### Otras dos del mismo lote

- **El botón "Hablar por WhatsApp" no hacía nada.** `type="button"`, sin `onClick` y
  sin `href`. Ya estaba anotado en `PENDIENTES.md` (punto 4: falta el número).
- **No había píxel ni analítica de ningún tipo.** `index.html` estaba en el estado por
  defecto de Vite: `lang="en"` en un sitio en español, `<title>ondex-landing</title>`,
  sin meta description ni Open Graph.

---

## La decisión: formulario propio conectado a GHL, no un embed de GHL

Cuatro razones, la primera decisiva:

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
iframe no hereda los tokens de marca: se ve pegado con scotch. Y los iframes de GHL son
conocidos por pelear con la altura y el scroll en mobile.

### 3. La velocidad
Un iframe es un segundo documento que cargar. En una landing de tráfico pagado, en
mobile y con red chilena, eso se paga en conversión.

### 4. El traspaso a WhatsApp
La estrategia depende de que al enviar, la persona caiga en WhatsApp con Heat esperando.
Con formulario propio controlas el `wa.me` con mensaje prellenado. Desde dentro de un
iframe de GHL estás peleando contra el iframe.

**Lo único que el formulario de GHL regala es la plomería al CRM.** Son ~30 líneas de
código. No vale las cuatro cosas de arriba.

---

## El formulario quedó en dos pasos

El board de Matías asume captura parcial (*"completa Paso 1, no termina"*), pero el
formulario real era de un solo paso: si la persona no enviaba, no quedaba nada.

Ahora:

| | Campos | Qué pasa |
|---|---|---|
| **Paso 1** | nombre + WhatsApp | Al presionar **Continuar** avanza al tiro y manda la captura parcial a GHL en segundo plano (`evento: lead_parcial`). Dispara `Lead_Parcial` en el píxel. |
| **Paso 2** | dolor + tiempo | Al enviar manda el lead completo (`evento: lead_completo`) y dispara `Lead` en el píxel. |

**Los dos POST crean/actualizan el mismo contacto** — GHL hace upsert por teléfono.

Lo que esto rescata: **quien abandona el paso 2 ya quedó en el CRM.** Nombre y WhatsApp
es todo lo que Heat necesita para empezar a conversar; el resto lo pregunta en el chat.
Ese volumen antes se perdía entero.

El envío parcial va en segundo plano a propósito: nadie tiene que esperar una llamada de
red para pasar de pantalla.

---

## Lo que quedó implementado

### `src/lib/leads.ts` *(nuevo, en ambos proyectos)*

| Función | Qué hace |
|---|---|
| `enviarLead(datos, tipo)` | POST JSON al Inbound Webhook de GHL, timeout de 10s, errores tipados |
| `dispararPixel(tipo, eventId)` | `Lead` o `Lead_Parcial` con el `eventID` que deduplica contra CAPI |
| `urlWhatsApp()` | Link `wa.me` con mensaje prellenado; `undefined` si no hay número |
| `normalizarTelefono()` | Deja todo en E.164 chileno: `+569XXXXXXXX` |

**Lo que viaja a GHL en cada lead:**

```
evento, first_name, phone, zona_dolor, tiempo_dolor, origen_landing, event_id,
utm_source, utm_medium, utm_campaign, utm_content, utm_term,
gclid, fbclid, fbp, fbc, landing_url, referrer
```

**`fbp`, `fbc` y `fbclid` no son relleno.** Son los identificadores que Meta necesita
para reconocer que ese lead vino de ese anuncio. Sin ellos, los eventos `Schedule` y
`Purchase` que GHL mande después por CAPI **no se pueden atribuir a ninguna campaña**
y Meta nunca aprende qué anuncio trae pacientes.

Detalle fino cubierto: la cookie `_fbc` la escribe el píxel, pero puede no existir en el
primer pageview. Si en la URL viene `fbclid` y la cookie no está, `leads.ts` la arma con
el formato de Meta (`fb.1.<timestamp>.<fbclid>`).

**`Lead_Parcial` va como evento personalizado a propósito.** Sirve para armar públicos de
retargeting y para reportería, pero **nunca se optimiza contra él**: si la campaña
optimizara hacia el paso 1, Meta buscaría gente que llena medio formulario y se va.

### `Formulario.tsx` *(modificado en ambos)*
- Wizard de 2 pasos con barra de progreso y botón **Volver**
- Envío real con estado `enviando`, botón bloqueado y spinner
- Mensaje de error visible si GHL no responde, que empuja a WhatsApp como salida
- **Trampa anti-spam** (campo `empresa` fuera de pantalla y fuera del tab)
- Botón **"Hablar ahora por WhatsApp"** en la pantalla de éxito
- El botón "Hablar por WhatsApp" de abajo ahora **sí es un link**

### `index.html` *(modificado en ambos)*
- Píxel de Meta con guard: si `VITE_META_PIXEL_ID` va vacío, no carga nada
- `lang="es-CL"`, title real, meta description, Open Graph y Twitter card

---

## Probado de punta a punta

Con Chromium y Playwright, interceptando el webhook y stubeando `fbq`, entrando con
`?fbclid=...&utm_source=facebook&utm_medium=paid&utm_campaign=...`:

| Caso | Resultado |
|---|---|
| Recorrido completo de los 2 pasos | 2 POST: `lead_parcial` y `lead_completo` |
| Teléfono `9 8765 4321` | Normalizado a `+56987654321` |
| `fbclid` sin cookie `_fbc` todavía | `fbc` construido: `fb.1.<ts>.PRUEBA_FBCLID_123` |
| UTMs de la URL | Los cinco capturados y enviados |
| Eventos del píxel | `Lead_Parcial` y `Lead`, cada uno con su `eventID` |
| **Volver al paso 1 y avanzar de nuevo** | **No reenvía la parcial** (2 POST, no 3) |
| **Abandonar en el paso 2** | **El lead ya quedó en GHL** como `lead_parcial` |
| **GHL devuelve 500** | Error visible, **no** marca éxito falso, **no** borra lo escrito |
| **Bot llena la trampa** | **0 POST a GHL**, y el bot ve "éxito" |

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
   | `evento` | Campo personalizado — distingue `lead_parcial` de `lead_completo` |
   | `event_id` | Campo personalizado — **necesario para deduplicar el evento de CAPI** |
   | `fbp`, `fbc`, `fbclid`, `gclid`, `utm_*` | Campos personalizados |

5. Agregar tag según `origen_landing` (`landing-kinesiologia` / `landing-metodo`).
6. **Bifurcar por `evento`:**
   - `lead_parcial` → Heat abre conversación al tiro. Tag `lead-parcial`.
   - `lead_completo` → Heat abre conversación con el contexto del dolor. Quitar
     `lead-parcial` si estaba.
7. Enganchar el workflow de Heat para que conteste al instante.

### Sobre la seguridad del webhook
La URL queda **visible en el bundle** que llega al navegador — verificado en el build.
Es aceptable: un Inbound Webhook sólo permite **crear** contactos, nunca leer datos.
No es una credencial que dé acceso a la cuenta.

**Lo que NUNCA puede ir en una variable `VITE_`** es una API key privada de GHL: todo lo
que empieza con `VITE_` termina en el JavaScript público.

El riesgo real es spam. Cubierto en tres capas: la trampa del formulario (probada, 0 POST),
filtro del lado de GHL (descartar si falta `phone`, por ejemplo), y si algún día molesta
de verdad, un proxy que esconda la URL. Para una clínica, con lo que hay basta.

---

## Salir a producción — cPanel

Las dos son SPA de una sola página, **sin router**. No hacen falta reglas de rewrite ni
tocar `base` en `vite.config.ts`: `npm run build` deja las rutas colgando de la raíz y en
un subdominio la raíz es la carpeta del subdominio.

Subdominios sugeridos:

| Landing | Subdominio | Carpeta en el hosting |
|---|---|---|
| Método | `metodo.clinicaondex.cl` | `/home/USUARIO/metodo` |
| Kinesiología | `kinesiologia.clinicaondex.cl` | `/home/USUARIO/kinesiologia` |

### Paso a paso

**1. Crear los subdominios**
cPanel → **Dominios** (o *Subdominios*) → Crear. Poner el subdominio y **cambiar el
Document Root** a una carpeta propia — cPanel propone `public_html/metodo` por defecto y
sirve, pero fuera de `public_html` es más limpio.

**2. Build en local**
```bash
cd metodo-ondex
cp .env.example .env      # rellenar los 4 valores
npm install
npm run build             # deja todo en dist/
```

**3. Subir**
Comprimir **el contenido de `dist/`** (no la carpeta `dist` en sí) en un `.zip`, subirlo
con el **Administrador de archivos** de cPanel a la carpeta del subdominio y extraer ahí.
Por FTP también sirve, pero con ~31 MB de video en Método el zip es mucho más rápido.

**4. SSL**
cPanel → **SSL/TLS Status** → seleccionar el subdominio → **Run AutoSSL**. Suele tardar
unos minutos. Sin HTTPS el píxel no funciona bien y `crypto.randomUUID()` no existe
(hay fallback, pero igual: el sitio tiene que ir por HTTPS).

**5. Forzar HTTPS**
Crear un `.htaccess` en la carpeta del subdominio:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Caché larga para los assets con hash en el nombre
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
</IfModule>

# Comprimir texto
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
```

**6. Cada cambio** = build local + volver a subir. En cPanel no hay deploy automático.

### Peso de los assets
`metodo-ondex/public` pesa **31 MB**, de los cuales **24 MB son los 11 testimonios**.
No es un problema de carga inicial: el carrusel usa `preload="metadata"`, así que sólo
pide las cabeceras. Pero en hosting compartido conviene:
- Agregarle `poster` a los `<video>` para que se vea el primer cuadro al instante
- Si el servidor va lento con los `.mp4`, mover los videos a un CDN

---

## Corrección a la ficha: Ondex SÍ tiene material de video

`clinica-ondex.md` dice *"no tienen contenido suficiente utilizable para anuncios en
video"*. **Ya no es así.** En `metodo-ondex/public/testimonios/` hay **11 testimonios
reales de pacientes en formato vertical 9:16**, ya montados en la landing.

Es exactamente el creativo más valioso que existe para esta cuenta, en el formato que
Meta quiere, y estaba dado por perdido. Cambia el diagnóstico del cuello de botella
creativo que levanté al revisar el board de Matías.

Kinesiología sigue sin video propio — usa un marquee de reseñas de Google.

---

## Lo que sigue bloqueado

| Pendiente | Quién |
|---|---|
| **Número de WhatsApp de la clínica** | Cliente — sin esto los botones quedan ocultos |
| **URL del Inbound Webhook** | Se genera al crear el workflow en GHL |
| **ID del píxel de Meta** | Business Manager |
| Campos personalizados en GHL | Crearlos antes del primer lead de prueba |
| Imagen Open Graph 1200×630 | Hoy apunta a `/foto-evaluacion.jpg`, que no tiene esa proporción |

Los tres primeros son de configuración: en cuanto lleguen, van al `.env` y esto queda
funcionando de punta a punta.

**Y hay que actualizar el board de Matías:** ahora el formulario sí es de 2 pasos, así
que la Fase 3 y la Fase 5 quedan consistentes — pero conviene marcar que la rama
"completa Paso 1, no termina" **ya está implementada** y llega al CRM como
`lead_parcial`.
