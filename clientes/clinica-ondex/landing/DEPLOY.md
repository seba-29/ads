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
