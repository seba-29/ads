# Parche sobre el build — Home y Recupera el control

> Aplicado el 27-ago-2026 · **Estas dos páginas se arreglaron sobre lo publicado,
> no sobre el código fuente.**

## Por qué así

No tenía el código fuente de estos dos proyectos, y las páginas ya estaban en
producción con el formulario perdiendo el 100% de los leads. En vez de esperar,
se bajaron los sitios desplegados, se parchearon y se volvieron a subir.

## ⚠️ Esto se pierde en la próxima compilación

El código fuente de estos dos proyectos **sigue teniendo los errores**:
sin píxel, sin envío al CRM, con `localhost` en el nav y el favicon de plantilla.

**Si alguien vuelve a compilar y desplegar desde el fuente, todo esto desaparece
y las páginas vuelven a perder leads en silencio.** Hay que incorporar los
arreglos al fuente — el material está en `../kinesiologia/` y `../metodo-ondex/`,
que son la versión hecha como corresponde.

## Qué se cambió

| | Home | Recupera el control |
|---|---|---|
| `<title>` | `Clínica Ondex \| Kinesiología y ondas de choque en Santiago` | `Recupera el control \| Clínica Ondex` |
| `lang` | `en` → `es-CL` | `es` → `es-CL` |
| Píxel `1354537603365442` | agregado | agregado |
| Envío del formulario a GHL | agregado *(puente)* | agregado *(puente)* |
| Botón «Hablar por WhatsApp» | enlazado *(puente)* | enlazado *(puente)* |
| `localhost` en el bundle | 4 → 0 | 3 → 0 |
| Favicon | isotipo de Ondex | isotipo de Ondex |
| Open Graph, theme-color | agregados | agregados |

### El puente del formulario

`puente-formulario.html` es el script inyectado en el `<head>`. Escucha el envío
del formulario **en fase de captura** —antes que React—, arma el mismo JSON que
manda `leads.ts` y lo postea al Inbound Webhook. React se sigue encargando de
pintar la pantalla de «¡Listo!», así que la experiencia no cambia.

Los `localhost` del bundle se reemplazaron con sustitución de texto sobre el
JavaScript minificado. Funciona porque son literales entre backticks y JavaScript
no depende de posiciones de bytes.

### Diferencia con Método y Kinesiología

Estos dos formularios son **de un solo paso**: piden nombre, WhatsApp, dolor y
tiempo de una vez. Por eso siempre mandan `evento: "lead_completo"` y **no hay
captura parcial** — quien abandone no queda registrado. Método y Kinesiología sí
la tienen. Se resuelve cuando se pasen los arreglos al código fuente.

### `origen_landing` de cada una

| Página | `origen_landing` | `origen_landing_nombre` | Etiqueta en GHL |
|---|---|---|---|
| Home | `home` | `Home` | `landing-home` |
| Recupera el control | `recupera-el-control` | `Recupera el control` | `landing-recupera-el-control` |

Sirve para separar en el CRM los leads de retargeting de los de tráfico frío.

## Verificado en vivo

| | Home | Recupera |
|---|---|---|
| HTTP | ✅ 200 | ✅ 200 |
| Píxel inicializando | ✅ | ✅ |
| Puente presente | ✅ | ✅ |
| `localhost` restantes | ✅ 0 | ✅ 0 |
| Nav a los dominios reales | ✅ | ✅ |
| Favicon nuevo / svg viejo | ✅ 200 / 404 | ✅ 200 / 404 |

Probado antes de publicar, en navegador: el formulario postea a GHL con el JSON
completo (teléfono normalizado a E.164, `fbc` construido desde `fbclid`, UTMs),
dispara `Lead` con su `eventID`, React sigue mostrando el éxito y el botón de
WhatsApp abre `wa.me/56952296611`.
