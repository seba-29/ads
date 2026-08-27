# Conectar los dominios — todo listo

> 27-ago-2026. Las cuatro páginas están publicadas y verificadas.
> Falta solo el DNS. Este documento tiene los valores reales medidos hoy.

## Estado del DNS ahora mismo

| Nombre | Apunta a | Qué es |
|---|---|---|
| `clinicaondex.cl` | `207.210.102.221` | el hosting, WordPress |
| `www.clinicaondex.cl` | `207.210.102.221` | el hosting, responde 301 |
| `metodoondex.clinicaondex.cl` | Netlify ✅ | listo |
| `kinesiologia.clinicaondex.cl` | Netlify ✅ | listo |
| `recupera.clinicaondex.cl` | *no existe* | **falta crear** |

---

## Paso 1 — `recupera.clinicaondex.cl` (lo fácil, hazlo primero)

**En Netlify**, proyecto `recupera-el-control-ondex` → **Domain management** →
**Add a domain** → `recupera.clinicaondex.cl`

**En cPanel** → **Dominios → Editor de zonas** → `clinicaondex.cl` →
**Agregar registro**:

| Campo | Valor |
|---|---|
| Tipo | `CNAME` |
| Nombre | `recupera` |
| TTL | `14400` |
| Destino | `recupera-el-control-ondex.netlify.app` |

En **Nombre** va sólo `recupera`, sin el dominio: cPanel lo completa.

---

## Paso 2 — El dominio raíz (el delicado)

### 🚨 Antes de tocar nada: los MX

Si el correo `@clinicaondex.cl` corre por este dominio, los registros **MX** lo
sostienen. **Sólo se cambia el registro A del apex y el de `www`.** Los MX, TXT
(SPF, DKIM, verificaciones) y cualquier otro registro se dejan exactamente como
están.

Antes de empezar, **saca una captura de la zona DNS completa.** Si algo sale mal,
esa foto es la forma de volver atrás.

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

- [ ] Los tres subdominios y el apex cargan por **https** con candado
- [ ] `clinicaondex.cl/thank-you/` redirige al inicio
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
