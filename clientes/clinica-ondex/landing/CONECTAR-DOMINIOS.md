# Conectar los dominios — todo listo

> Escrito el 27-ago-2026. **Reverificado en vivo el 31-ago** — la tabla de abajo es el
> estado medido ese día, no el plan.

## Estado del DNS al 31-ago (medido)

| Nombre | Apunta a | Estado |
|---|---|---|
| `clinicaondex.cl` | `207.210.102.221` | ⛔ **sigue en WordPress** (responde LiteSpeed + `wp-json`) |
| `www.clinicaondex.cl` | CNAME → `clinicaondex.cl` | ⛔ sigue el apex |
| `metodoondex.clinicaondex.cl` | `ondex-metodo.netlify.app` | ✅ 200, con certificado |
| `kinesiologia.clinicaondex.cl` | `ondex-kinesiologia.netlify.app` | ✅ 200, con certificado |
| `recupera-el-control.clinicaondex.cl` | `recupera-el-control-ondex.netlify.app` | ✅ 200, con certificado |

### Correcciones de este documento
- El subdominio quedó como **`recupera-el-control`**, no `recupera` como decía el plan.
- Los proyectos de Netlify de las dos landings de anuncios se llaman `ondex-metodo` y
  `ondex-kinesiologia`.

### ✅ Los MX ya están desacoplados del apex — la mina está desactivada
El 31-ago se verificó: `MX 0 mail.clinicaondex.cl.` y `mail.clinicaondex.cl` tiene su
**propio registro A** a `207.210.102.221`. Antes el MX apuntaba al dominio mismo y
resolvía **a través del A del apex** — cambiar ese A habría cortado todo el correo
entrante sin tocar un solo registro MX.

**Ahora el apex se puede cambiar sin riesgo para el correo.** Era el bloqueo real.

---

## ~~Paso 1 — el subdominio de Recupera~~ ✅ HECHO

`recupera-el-control.clinicaondex.cl` responde **200 con certificado válido** y sirve la
página correcta. Verificado el 31-ago. Nada pendiente acá.

---

## Paso 2 — El dominio raíz · **ES LO ÚNICO QUE FALTA**

El Home nuevo está compilado, parcheado y publicado en `home-ondex.netlify.app`
(responde 200). **Nadie lo ve todavía**, porque el apex sigue sirviendo el WordPress.

### 🚨 Antes de tocar nada

Los MX ya están a salvo (ver arriba). Igual: **sólo se cambia el registro A del apex y
el de `www`.** Los MX, DKIM y las verificaciones se dejan intactos.

Antes de empezar, **saca una captura de la zona DNS completa.** Si algo sale mal, esa
foto es la forma de volver atrás.

### ⚠️ El SPF hay que ajustarlo en el mismo momento

El SPF actual, medido el 31-ago:

```
v=spf1 +a +mx +ip4:207.210.102.221 include:relay.mailchannels.net ~all
```

Ese **`+a` autoriza a enviar correo a la IP del registro A del dominio**. Cuando el apex
apunte a Netlify, `+a` va a estar autorizando a **Netlify** a mandar correo como
`@clinicaondex.cl` — algo que no sirve para nada y que amplía la superficie de suplantación.

**El correo real no se rompe al quitarlo:** ya está autorizado dos veces por `+ip4:207.210.102.221`
y por `+mx` (que ahora resuelve a `mail.clinicaondex.cl`, la misma IP). El SPF queda así:

```
v=spf1 +mx +ip4:207.210.102.221 include:relay.mailchannels.net ~all
```

Cámbialo **en la misma ventana** que el registro A, no antes ni mucho después.

### El apex necesita registro A, no CNAME

Los subdominios se apuntan con CNAME. **El dominio raíz no puede ser CNAME** —
el estándar no lo permite conviviendo con los MX y el SOA. Netlify entrega una
**IP para un registro A** cuando agregas un dominio apex. **Usa la que te muestre
el panel**, no una que hayas visto en otro lado: puede cambiar.

### Orden para minimizar la caída

1. **En Netlify**, proyecto `home-ondex` → **Domain management** →
   **Add a domain** → `clinicaondex.cl`
   Netlify va a pedir verificar la propiedad y te va a dar la **IP del registro A**.
2. **Agrega también `www.clinicaondex.cl`** en el mismo proyecto. Netlify lo
   redirige solo al dominio principal.
3. **En cPanel**, en el Editor de zonas:
   - Cambia el registro **A** de `clinicaondex.cl`: de `207.210.102.221` a la IP de Netlify
   - Cambia `www`: de A a `207.210.102.221` → **CNAME** a `home-ondex.netlify.app`
   - **No toques nada más**
4. Espera la propagación (minutos a horas) y que Netlify emita el certificado.
5. Recién cuando el candado esté verde, apaga el WordPress.

**El WordPress deja de verse en el momento en que cambies el registro A.** No hay
solapamiento: es un cambio, no una transición. Hazlo en horario de baja actividad.

---

## Las redirecciones ya están puestas

El WordPress tenía **exactamente dos páginas indexadas** — `/` y `/thank-you/`
(verificado en su `page-sitemap1.xml`). El Home ya lleva su `_redirects`, probado
en producción:

| URL vieja | Resultado |
|---|---|
| `/thank-you/` | 301 → `/` ✅ |
| `/wp-content/*` | 301 → `/` ✅ |
| `/wp-includes/*`, `/wp-admin/*`, `/feed` | 301 → `/` ✅ |
| `/favicon.ico`, `/hero-home.mp4`, `/assets/*` | 200, no se redirigen ✅ |

**No hay comodín `/* → / 301` a propósito**, por dos razones. Netlify lo descarta
—`/*` también matchea `/`, y con destino `/` lo lee como bucle; lo probé en
producción y la regla no se aplica—. Y aunque funcionara, Google desaconseja
mandar todos los 404 al inicio: lo trata como *soft 404* y no traspasa autoridad.
Para una URL que nunca existió, un 404 honesto es lo correcto.

Si más adelante aparece alguna URL vieja con tráfico real, se agrega a mano en
`parche-build/_redirects-home`.

---

## Después de conectar

- [x] Los tres subdominios cargan por **https** con candado *(verificado 31-ago)*
- [ ] El **apex** carga por https con candado
- [ ] `clinicaondex.cl/thank-you/` redirige al inicio
- [ ] **`+a` quitado del SPF**
- [ ] **El correo `@clinicaondex.cl` sigue funcionando** — manda uno de prueba
- [ ] Verificar el dominio en Meta → Configuración del negocio → Seguridad de
      marca → Dominios. Cubre los tres subdominios de una vez.
- [ ] Search Console: agregar la propiedad y subir el sitemap nuevo si lo hay

---

## Y el tema del código fuente, resuelto

Las landings **Home** y **Recupera el control** salen de su proyecto sin píxel,
sin envío al CRM, con `localhost` en el nav y el favicon de plantilla. Se
arreglaron sobre lo compilado.

Para que eso no se pierda, en `parche-build/` quedó **`aplicar-parche.py`**: un
script que vuelve a aplicar todos los arreglos sobre cualquier compilación nueva.

```bash
npm run build
python3 aplicar-parche.py dist home        # o: recupera
# y subir dist/ a Netlify
```

Es **idempotente**: correrlo tres veces seguidas deja exactamente un píxel y un
puente, verificado. Detecta y reemplaza parches anteriores aunque los haya puesto
otra persona.

**Sigue siendo un parche.** Lo correcto es llevar esto al código fuente — el
material está en `kinesiologia/` y `metodo-ondex/`, que es la versión bien hecha.
Mientras tanto, el script evita que una recompilación tumbe la medición y los
leads en silencio.
