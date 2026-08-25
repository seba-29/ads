# Deploy — Clínica Ondex

> Publicado el 25-ago-2026 en el equipo **HEAT IA** de Netlify (`heatlatam`, plan Pro).

## Los dos sitios

| Landing | Proyecto Netlify | URL temporal | Site ID |
|---|---|---|---|
| **Método Ondex** | `ondex-metodo` | https://ondex-metodo.netlify.app | `bd5adeeb-705c-4ea3-808a-f3eb643899b9` |
| **Kinesiología** | `ondex-kinesiologia` | https://ondex-kinesiologia.netlify.app | `553d6ba4-39c8-4579-8088-aeb0bac21ec9` |

Paneles: [ondex-metodo](https://app.netlify.com/projects/ondex-metodo) ·
[ondex-kinesiologia](https://app.netlify.com/projects/ondex-kinesiologia)

## Verificado en producción

| | Método | Kinesiología |
|---|---|---|
| HTTP sobre HTTPS | ✅ 200 | ✅ 200 |
| `<title>` | Método Ondex \| Ondas de choque en Santiago | Kinesiología en Santiago \| Clínica Ondex |
| `lang` | `es-CL` | `es-CL` |
| Píxel de Meta | ✅ `1354537603365442` | ✅ `1354537603365442` |
| Webhook de GHL en el bundle | ✅ | ✅ |
| WhatsApp `+56952296611` | ✅ | ✅ |
| Videos servidos | ✅ `testimonio-1.mp4` 200, `video/mp4`, 5,3 MB | — |

## Cómo se desplegó

Sitios **precompilados**: el `dist/` se sube tal cual y Netlify no corre build.
Cada carpeta lleva un `netlify.toml` con `publish = "."` y `command = ""`.

Para volver a desplegar tras un cambio: recompilar con `npm run build` y subir el
`dist/` de nuevo al proyecto correspondiente.

> **Pendiente de mejora:** conectar los proyectos a un repositorio Git. Hoy cada
> cambio requiere subir la carpeta a mano, y la URL del webhook queda quemada en
> el bundle en vez de vivir como variable de entorno en el panel de Netlify.

## Lo que falta: los subdominios

| Landing | Subdominio destino |
|---|---|
| Método | `metodo.clinicaondex.cl` |
| Kinesiología | `kinesiologia.clinicaondex.cl` |

**1.** En cada proyecto de Netlify: **Domain management → Add a domain** → escribir
el subdominio. Netlify devuelve el destino al que apuntar.

**2.** En cPanel: **Dominios → Editor de zonas** → `clinicaondex.cl` → **Agregar registro**

| Campo | Método | Kinesiología |
|---|---|---|
| Tipo | `CNAME` | `CNAME` |
| Nombre | `metodo` | `kinesiologia` |
| TTL | `14400` | `14400` |
| Destino | `ondex-metodo.netlify.app` | `ondex-kinesiologia.netlify.app` |

En **Nombre** va sólo `metodo`, sin el dominio — cPanel lo completa solo.

### ⚠️ La trampa

**No usar la sección «Subdominios» de cPanel.** Eso hace que el hosting sirva el
subdominio y crea un registro **A** que pelea con el CNAME. Sólo se toca el Editor
de zonas. Si al guardar hay conflicto, es un registro A de un intento previo:
borrarlo. Un A y un CNAME con el mismo nombre no pueden coexistir.

### Certificado

Netlify lo emite solo cuando detecta el DNS apuntando bien. Tarda de minutos a horas.
**No encender anuncios antes de ver el candado:** sin HTTPS el navegador advierte y
el píxel de Meta no mide bien.

---

## Actualización — 25-ago-2026, dominios propios y arreglos del nav

Dominios ya activos con certificado:

- **https://metodoondex.clinicaondex.cl**
- **https://kinesiologia.clinicaondex.cl**

### 🚨 Había URLs de `localhost` publicadas en producción

Las dos landings tenían, con un `// TODO` al lado:

```ts
{ label: "Kinesiología",   href: "http://localhost:5180" }   // en Método
{ label: "Ondas de choque", href: "http://localhost:5173" }   // en Kinesiología
<a href="http://localhost:5190">                              // el logo, en las dos
```

Cualquiera que tocara esas pestañas recibía un error de conexión. Corregido:

| Landing | Pestaña | Ahora apunta a |
|---|---|---|
| Método | Ondas de choque | `#metodo` *(su propia sección)* |
| Método | Kinesiología | `https://kinesiologia.clinicaondex.cl/` |
| Kinesiología | Ondas de choque | `https://metodoondex.clinicaondex.cl/` |
| Kinesiología | Kinesiología | `#kinesiologia` *(su propia sección)* |

### El logo ya no se lleva la visita fuera

Apuntaba a `localhost:5190`, una landing «home» que no existe. Ahora sube al
inicio de la misma página (`#hero`).

**Es una decisión, no un parche.** En una landing de tráfico pagado el logo no
debe linkear al sitio corporativo: se paga por esa visita y el logo la manda
fuera de la página donde puede convertir. Si algún día se quiere que lleve a
`clinicaondex.cl`, es cambiar un `href`.

### Los cruces arrastran la atribución

`Nav.tsx` tiene un helper `conAtribucion()` que le pega a los links hermanos los
parámetros de la URL actual:

```
https://kinesiologia.clinicaondex.cl/?fbclid=ABC123&utm_source=facebook&utm_campaign=metodo-frio
```

Sin esto, alguien que llega por un anuncio a Método, cruza a Kinesiología y
convierte ahí **queda sin atribución**: ni Meta ni Google saben de qué anuncio
vino. Sin parámetros en la URL, el link queda limpio.

### Favicon

El que traía el proyecto era un rayo morado (`#863bff`) de la plantilla, sin
relación con Ondex. Reemplazado por el isotipo real —la «o» del logotipo—
en blanco sobre el azul de marca `#1d48f8`, reconstruido desde
`public/logos/ondex-logo.png`.

Se generaron `favicon.ico` (multi-tamaño), 512, 180 (apple-touch), 32 y 16,
más `<meta name="theme-color" content="#1d48f8">`. El `favicon.svg` viejo se
eliminó y hoy devuelve 404 en producción.

### Verificado en vivo

| | metodoondex | kinesiologia |
|---|---|---|
| HTTP + certificado | ✅ 200, SSL válido | ✅ 200, SSL válido |
| Cruce del nav | ✅ apunta a kinesiologia | ✅ apunta a metodoondex |
| `localhost` en el bundle | ✅ ninguno | ✅ ninguno |
| Favicons sirviendo | ✅ `.ico` y `.png` 200 | ✅ `.ico` y `.png` 200 |
| `favicon.svg` viejo | ✅ 404 | ✅ 404 |
