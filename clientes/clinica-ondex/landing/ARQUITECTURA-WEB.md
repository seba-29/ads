# Arquitectura web de Clínica Ondex

> Decidido el 25-ago-2026. Cuatro páginas, cuatro proyectos de Netlify en el
> equipo **HEAT IA** (`heatlatam`).

## Por qué cuatro proyectos y no uno

Un proyecto de Netlify sirve **un solo sitio**. Puede tener varios dominios, pero
todos muestran el mismo contenido. Como cada página va a tener su propio
subdominio, tienen que ser proyectos separados.

La alternativa era un dominio con rutas (`clinicaondex.cl/metodo`). Se descartó:
son cuatro proyectos de Vite distintos —fusionarlos obliga a configurar `base` en
cada uno y recombinar los builds— y dos ya estaban en producción con DNS y
certificado funcionando.

**No hay costo de atribución en separarlos:** los subdominios de `clinicaondex.cl`
comparten las cookies del píxel, porque Meta las escribe en el dominio raíz, y una
sola verificación de dominio en Business Manager cubre a los cuatro.

## El mapa

| Página | Proyecto Netlify | Dominio final | Estado |
|---|---|---|---|
| **Home** *(reemplaza el WordPress)* | `home-ondex` | `clinicaondex.cl` | ⚠️ por arreglar |
| **Método Ondex** | `ondex-metodo` | `metodoondex.clinicaondex.cl` | ✅ listo |
| **Kinesiología** | `ondex-kinesiologia` | `kinesiologia.clinicaondex.cl` | ✅ listo |
| **Recupera el control** *(retargeting)* | `recupera-el-control-ondex` | `recupera.clinicaondex.cl` | ⚠️ por arreglar |

## ⚠️ Estado de las dos nuevas — 25-ago-2026

Salieron a producción con los mismos defectos que tenían las dos primeras:

| | home-ondex | recupera-el-control |
|---|---|---|
| `<title>` | `ondex-landing` *(plantilla de Vite)* | `Clínica Ondex` *(genérico)* |
| `lang` | `en` en un sitio en español | `es` |
| Píxel de Meta | ❌ ninguno | ❌ ninguno |
| Webhook de GHL | ❌ ninguno | ❌ ninguno |
| `localhost` publicado | `:5173` `:5180` | `:5173` `:5180` `:5190` |
| Favicon | el rayo morado de plantilla | el rayo morado de plantilla |

**«Recupera el control» es la más grave.** Es la landing de retargeting del board
de Matías —la segunda visita de quien rebotó— y lleva formulario. Sin píxel no se
puede armar el público ni medir; sin webhook, **el formulario pierde el 100% de
los leads.** Iba a recibir tráfico pagado en ese estado.

---

# Reemplazar el WordPress: cuatro cosas que no se pueden improvisar

## 1. 🚨 No tocar los registros MX

Si el correo de la clínica (`@clinicaondex.cl`) corre por ese dominio, los
registros **MX** son los que lo sostienen. Al apuntar el dominio raíz a Netlify,
**se cambia únicamente el registro A del root** — los MX se dejan intactos.

Borrar la zona DNS y rehacerla, o dejar que un asistente «limpie» los registros
viejos, **deja a la clínica sin correo.** Es el error más caro de esta migración
y el más fácil de cometer.

## 2. El dominio raíz necesita registro A, no CNAME

Los subdominios se apuntan con **CNAME**. El dominio raíz (apex) **no puede ser
CNAME** en la mayoría de los DNS, incluido cPanel — el estándar no lo permite
junto con los MX y el SOA.

Netlify entrega una **IP para un registro A** cuando agregas un dominio apex.
Hay que usar esa, no el `.netlify.app`.

## 3. Redirecciones 301 o se pierde el posicionamiento

El WordPress lleva años indexado. El dominio se hereda; **las URLs no.** Si tiene
páginas como `/servicios`, `/contacto`, `/nosotros` o entradas de blog, y el Home
nuevo es una sola página, **todas esas URLs pasan a devolver 404** y Google va
soltando el posicionamiento.

Antes de apagar el WordPress:

1. Sacar la lista de URLs indexadas (Search Console → Páginas, o `site:clinicaondex.cl`)
2. Decidir a dónde va cada una: al Home, a Método, a Kinesiología
3. Escribirlas en un archivo `_redirects` en la raíz del proyecto del Home:

```
/servicios              /                        301
/contacto               /                        301
/ondas-de-choque        https://metodoondex.clinicaondex.cl/   301
/kinesiologia           https://kinesiologia.clinicaondex.cl/  301
/*                      /                        301
```

La última línea es la red de seguridad: cualquier URL vieja que se haya olvidado
cae en el Home en vez de en un 404.

## 4. El píxel tiene que estar desde el primer minuto

El conjunto «Clínica Ondex» (`1354537603365442`) lleva **4.100 PageView
acumulados del WordPress**, con unas 100 visitas diarias. Ese es el público de
retargeting que ya existe.

Si el Home nuevo sale sin el píxel, ese flujo **se corta el día del cambio** y el
público deja de crecer. Los datos ya recogidos no se pierden, pero se deja de
alimentar el pool justo cuando se va a empezar a invertir.

---

## La raíz del problema: la configuración está duplicada cuatro veces

Dos de cuatro sitios salieron mal porque no hay una sola fuente de verdad. Estos
valores tienen que ser **idénticos en los cuatro** y verificarse antes de cada
publicación:

| | Valor |
|---|---|
| Píxel de Meta | `1354537603365442` |
| Webhook de GHL | el Inbound Webhook de `Nuevo Lead - Form Landing` |
| WhatsApp | `+56952296611` |
| Favicon | el isotipo de Ondex, blanco sobre `#1d48f8` |
| `lang` | `es-CL` |

### Verificación antes de publicar

- [ ] `<title>` propio de la página, no `ondex-landing`
- [ ] `lang="es-CL"`
- [ ] Píxel presente y disparando `PageView`
- [ ] Favicon de Ondex, sin `favicon.svg`
- [ ] **Cero `localhost` en el bundle**
- [ ] Links del nav apuntando a los dominios reales
- [ ] Si tiene formulario: webhook configurado y probado de punta a punta
- [ ] Certificado activo antes de mandarle tráfico pagado
