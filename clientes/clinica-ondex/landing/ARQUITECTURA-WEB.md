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

---

# Medición de Google — recuperada del WordPress · 27-ago-2026

El WordPress cargaba una pila de Google que las landings nuevas no tenían. Se
habría caído entera el día del cambio de dominio, justo antes de encender Google Ads.

| Carga | Dispara |
|---|---|
| `gtm.js?id=GTM-W5R3ZKZR` | **`AW-17126523264`** (Google Ads) + **`G-FZXBQDXQ5F`** (GA4) |
| `gtag/js?id=GT-5TW99JXL` | **`G-GBKVQZR4X4`** — una *segunda* propiedad GA4 |

Verificado leyendo el contenido público de los dos contenedores.

**Se replicaron los dos, tal cual, en las cuatro landings.** En una migración no
se rediseña la medición: se conserva y se limpia después, con datos a la vista.

### Dos cosas que salieron de revisar esto

**El contenedor de GTM no trae etiquetas de conversión con etiqueta**
(`AW-.../label`), sólo la de configuración de Google Ads. Por eso ponerlo en las
cuatro páginas es seguro: no dispara conversiones falsas. Se verificó antes de
instalarlo, precisamente para descartar el doble conteo.

**Hay dos propiedades de GA4 midiendo en paralelo** — `G-FZXBQDXQ5F` vía GTM y
`G-GBKVQZR4X4` vía el Google tag. Probablemente alguien configuró GA4 dos veces.
No hace daño, pero conviene decidir cuál es la buena y apagar la otra **después**
de que el dominio esté migrado y estable.

### Estado de las cuatro

| Sitio | HTTP | GTM | gtag | Píxel Meta |
|---|---|---|---|---|
| `metodoondex.clinicaondex.cl` | 200 | ✅ | ✅ | ✅ |
| `kinesiologia.clinicaondex.cl` | 200 | ✅ | ✅ | ✅ |
| `recupera-el-control.clinicaondex.cl` | 200 | ✅ | ✅ | ✅ |
| `home-ondex.netlify.app` *(falta el dominio)* | 200 | ✅ | ✅ | ✅ |

En Método y Kinesiología quedó **en el código fuente**. En Home y Recupera, en el
parche — `aplicar-parche.py` ya lo repone junto con el resto.

---

# Salidas alternativas eliminadas de las dos landings de anuncios · 27-ago-2026

Método y Kinesiología son **landings de caída de anuncios**: su única conversión
es el formulario. Se quitaron los dos botones que competían con él debajo del form:

- **«Hablar por WhatsApp»** *(antes de convertir)*
- **«Ver en Instagram»**

## Por qué, más allá del foco

El botón de WhatsApp no sólo distraía: **convertía tráfico pagado en un lead sin
atribución.** Quien lo tocaba llegaba a WhatsApp sin `fbclid`, sin `fbc` y sin
UTMs. Heat lo atendía igual, pero **Meta nunca sabía de qué anuncio vino** — y sin
esa señal la campaña no puede optimizar hacia lo que funciona.

El formulario, en cambio, manda los 18 campos con toda la atribución.

El de Instagram era fuga pura: sacaba de la página a alguien por quien se pagó.

## Lo que SÍ se conservó

**«Hablar ahora por WhatsApp» en la pantalla de éxito.** Ese aparece *después* de
convertir, cuando el lead ya está en el CRM con su atribución completa, y sirve
para acelerar el traspaso a Heat. No compite con nada.

En Testimonials queda la frase «+70.000 personas siguen su recuperación en
Instagram @clinicaondex» — es texto de prueba social, no un enlace. Se deja.

## Verificado en vivo

| | Instagram | WhatsApp antes | WhatsApp en el éxito |
|---|---|---|---|
| `metodoondex.clinicaondex.cl` | 0 ✅ | 0 ✅ | 1 ✅ |
| `kinesiologia.clinicaondex.cl` | 0 ✅ | 0 ✅ | 1 ✅ |

**Home y Recupera conservan sus botones.** El Home es un router, no una landing de
caída — ahí una salida a WhatsApp es legítima.
