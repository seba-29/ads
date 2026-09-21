# CLÍNICA ONDEX

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

> ⚠️ El nombre de la cuenta trae un espacio inicial (` Clínica Ondex`).

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `1034674525430396` |
| **Business Manager** | Ondex Ads |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE |
| **Rubro** | Kinesiología y ondas de choque · Santiago |
| **Web / IG** | clinicaondex.cl · [@clinicaondex](https://www.instagram.com/clinicaondex) |
| **Subcuenta GHL** | `CHtgjFPx4hWkSAtKewIo` |
| **WhatsApp** | `+56952296611` |
| **Líneas de servicio** | Kinesiología · Método Ondex (ondas de choque) |

## Los números (obligatorios — sin esto no hay recomendación de presupuesto)
| | |
|---|---|
| **Ticket promedio** | |
| **Margen** | |
| **% dispuesto a invertir por cliente nuevo** | |
| **Meta de ventas mensual** | |
| **Inversión actual/mes** | Septiembre 1–20: **$1.473.139** |
| **TECHO ACORDADO** | **$2.000.000/mes** *(confirmado por Seba el 21-sep-2026)* |
| **Cierre de septiembre** | **$1.983.139** proyectado, tras pausar Creatiklab el 21-sep (~$51.000/día × 10 días) |
| **CPA objetivo** *(calculado)* | |
| **ROAS objetivo** *(calculado)* | |
| **NÚMERO MÁGICO** *(ROAS mínimo o CPA/CPL máximo)* | |

## Conversión y medición
| | |
|---|---|
| **Destino** | ✅ **Landing propia con form de 2 pasos** → GHL → WhatsApp (Heat) |
| **Landings en producción** | [metodoondex.clinicaondex.cl](https://metodoondex.clinicaondex.cl) · [kinesiologia.clinicaondex.cl](https://kinesiologia.clinicaondex.cl) |
| **Objetivo de campaña** | Clientes potenciales |
| **Píxel** | ⚠️ `736328569555463` (dataset «Landing») — **ver advertencia abajo** |
| **API de Conversiones** | Conectada en ese dataset por *otra* integración; falta la de GHL |
| **`ctwa_clid`** *(solo si es WhatsApp)* | ✅ / ❌ |
| **% de cierre lead → venta** | *(si no se sabe, 5% como estándar)* |
| **Quién responde y en cuánto** | |

## Las 7 Maletas
1. **Público** —
2. **Problema principal** —
3. **Solución** —
4. **Diferencial menos mencionado en el mercado** —
5. **Testimonios disponibles** —
6. **Objeción #1** —
7. **Garantía** —

## ADN
| | |
|---|---|
| **Nivel de consciencia dominante del copy** | |
| **¿Tiene material para hablarle a gente fría?** | |
| **Tipo de oferta** | **servicio** |
| **3 deseos de Reiss** *(con evidencia)* | |
| **2 perfiles de comprador** | |

## Estado actual de la cuenta
- **Qué corre hoy (21-sep-2026):** dos campañas nuestras desde el 4-sep — `Clientes potenciales | Formulario | ABO` y `Clientes potenciales | Landing | ABO` — a ~$51.000 diarios. Creatiklab (heredada) quedó pausada el 21-sep.
- **✅ Corregido — sí hay material de video.** La landing de Método trae **11 testimonios reales de pacientes en 9:16**, ya montados. La nota anterior decía que no había contenido utilizable; era incorrecta. Kinesiología sigue sin video propio (usa reseñas de Google).
- **⚠️ Píxel compartido.** El dataset `736328569555463` («Landing») tiene **3 dominios** disparando y recibe eventos de tienda (`Comprar`, `Iniciar pago`). Existe además un dataset **«Clínica Ondex»** `1354537603365442`. Hay que decidir cuál se usa y dejarlo limpio antes de armar públicos — si no, el retargeting mezcla visitantes de otros proyectos. Calidad de coincidencias hoy: **6,1/10**.
- **✅ Infraestructura terminada (25-ago).** Las dos landings publicadas con dominio y certificado, el formulario entregando contactos y oportunidades en GHL, y el píxel disparando `PageView`, `Lead_Parcial` y `Lead`. Probado en producción por el cliente con datos reales.
- **Pendiente antes de encender:** ticket promedio y margen por línea (bloquean el CPA objetivo), presupuesto mensual y reparto Meta/Google, y capacidad de agenda semanal.
- **⚠️ Bloquea Google, no Meta:** el `gclid` no se está guardando en GHL. Sin él no se puede atribuir un paciente al clic de Google Ads. Meta sí quedó completo (`fbclid`, `fbp`, `fbc`).

## ⚠️ `UNSETTLED` no es «los anuncios están detenidos»

Al 21-sep-2026 la cuenta `1034674525430396` figuró como **`UNSETTLED`** y dejó
de ser consultable por el conector (`is_queryable: false`). El 17-sep estaba
`ACTIVE`, y coincide con el reclamo de Matías por los cobros de Meta (16-sep).

**Corrección del 21-sep:** la primera lectura de esta ficha decía que los
anuncios estaban detenidos. **Era falso.** El desglose por día mostró entrega
normal del 14 al 20 de septiembre —entre ~$48.000 y ~$84.000 diarios— y recién
el 21-sep aparece en $0. La cuenta quedó marcada por deuda, no apagada. Seba
avisó al cliente ese mismo día y por la tarde confirmó que **ya está corriendo
de nuevo**.

> **Regla:** el estado administrativo de la cuenta (`UNSETTLED`, `is_queryable`)
> es un aviso de cobranza, no una medición de entrega. Antes de dar una cuenta
> por caída hay que mirar el gasto por día. Si hay gasto, entregó.

## Lo que sigue pendiente de ejecutar

- 🔴 **Rotar el PIT manual.** El panel de Ondex depende de él y se pegó en un
  chat de IA. Uno nuevo con los mismos permisos, a la ficha del admin, y
  revocar el viejo.
- 🔴 **Apagar `Landing | publico Tbrein | Las Condes - Copia`.** Sigue ACTIVO a
  $5.000 diarios. Entre los dos conjuntos Tbrein llevan **$120.092 con 11
  clientes potenciales y cero agendamientos**. El original ya está pausado.
- **Cambiar el evento de optimización de `CompleteRegistration` a `Lead`** en
  los conjuntos de landing. Se viene arrastrando desde el 11-sep: la página no
  dispara ese evento, así que Meta entrega a ciegas. Resetea el aprendizaje
  2-3 días, por eso conviene hacerlo con el mes recién empezado.
- **Guardar `fbclid` y `Referrer` en la landing** cuando no vengan UTM. Hoy 28
  leads llegan sin origen y 6 de ellos agendaron.
- **Capturar el `ctwa_clid`** de los anuncios click-to-WhatsApp. Sin eso la
  campaña de WhatsApp seguirá mostrando $122.122 con las columnas del CRM en
  cero.
- **Renovar creativos** con testimonios de pacientes reales, cubriendo
  distintas condiciones. Es la palanca más grande y se le pidió al cliente.
- **Preguntar qué es `agenda.softwaremedilink.com`.** Es el único dominio que
  manda `Purchase` a este píxel. Si es la agenda propia de la clínica, ahí hay
  un evento de fondo de embudo que hoy no usa nadie.

## El CRM decide, no el CPL — cierre del 21-sep-2026

Lo que muestra el panel una vez arreglada la lectura, contando **por contacto**
y con los tres embudos encadenados:

| Canal | Clientes potenciales | Agendados | Gasto | $/agendamiento |
|---|---:|---:|---:|---:|
| **Formulario nativo** | 676 | **21** | $516.043 | **$24.583** |
| **Landing propia** | 154 | **7** | $455.607 | $65.207 |
| **Creatiklab** *(pausada el 21-sep)* | — | **4** | $379.367 | $94.842 |
| **Whatsapp Las Condes** | — | 0 | $122.122 | — |

**El formulario agenda 2,6× más barato.** Ese margen aguanta la decisión de
moverle peso en octubre.

**Pero la landing nunca corrió en condiciones justas**: sus conjuntos optimizan
por `CompleteRegistration`, un evento que la página no dispara. Antes de
juzgarla hay que arreglar eso y darle dos semanas.

### El anuncio que sostiene la cuenta

De los 21 agendamientos del formulario, **13 vienen de un solo anuncio**:
`Testimonio espolón / fascitis`, a **$17.516** por agendamiento — la mitad del
promedio de la cuenta. Los otros cuatro anuncios de ese mismo conjunto traen
**1 entre todos**.

Mover presupuesto entre campañas rinde menos que renovar creativos con ese
formato: paciente real contando un dolor concreto.

### Lo que no se puede atribuir

De los 32 agendamientos que el panel cuelga de una campaña, faltan los que
entran sin rastro:

- **28 leads de landing llegaron sin UTM** y 6 de ellos agendaron. No se les
  puede asignar conjunto. Arreglo: guardar `fbclid` y `Referrer` cuando no
  vengan parámetros.
- **La campaña `Whatsapp / Las Condes` gastó $122.122** y no aparece ni una vez
  en el CRM. Meta cuenta 44 conversaciones iniciadas. Es medición, no
  rendimiento: los leads de WhatsApp entran sin `ctwa_clid`.

### ⚠️ Tres trampas de medición que costaron un día entero

**La unidad es el CONTACTO, no la oportunidad.** Cada paciente genera una
oportunidad por embudo: contando oportunidades, un mismo agendamiento vale
hasta tres.

**Un 200 sin datos es peor que un 429.** Leer los contactos de a uno en
paralelo hace que GHL devuelva el contacto *sin sus campos*, con HTTP 200. Con
ese dato roto se reportó que la landing perdía 115 leads. No perdía ninguno:
la automatización corrió 215 veces para 102 contactos — 2,11 por lead, que es
lo que produce un formulario de dos pasos.

**Dos cosas que se llaman igual no se cuentan igual.** Meta cuenta el lead de
formulario y el del sitio con nombres distintos. El panel tomaba siempre el
primero de una lista fija, y la campaña de landing tenía un **1 suelto** ahí:
mostraba *«1 cliente potencial a $455.607»* cuando su costo real era **$1.656**.
Lo encontró Seba mirando el Ads Manager, no el panel.

## La conexión con GoHighLevel — cómo quedó

**Ondex lee su CRM con un PIT manual**, no con el OAuth de la agencia.

El 21-sep se reconectó la agencia para ganar el permiso de campos
personalizados y en esa reconexión se perdió `oauth.write`, que es el que
permite generar el token de cada sub-cuenta. La cartera entera quedó sin CRM
hasta corregirlo. Ondex se desatascó pegando un PIT manual en su ficha del
admin, que es el respaldo que el panel usa cuando la agencia no puede mintear.

> **La lista de scopes es el contrato completo, no un mínimo.** Lo que no está
> ahí se pierde en la próxima reconexión, aunque la app lo tenga publicado.

- 🔴 **Pendiente: rotar ese PIT.** Se pegó en un chat de IA. Crear uno nuevo con
  los mismos permisos, ponerlo en la ficha y revocar el viejo.
- Para diagnosticar la conexión de cualquier cliente:
  `GET /api/admin/diagnostico-landing?location=<locationId>` (solo admin).

## Documentos
| Archivo | Qué tiene |
|---|---|
| `clinica-ondex/revision-estructura-matias.md` | Revisión del board de Figma de la contraparte |
| `clinica-ondex/estructura-corregida-etapa1.md` | La estructura reescrita, con la escalera de eventos y presupuestos |
| `clinica-ondex/landing/GUIA.md` | La integración de las landings con GHL, y el deploy |
| `clinica-ondex/landing/MAPEO-GHL.md` | Mapeo webhook → campos, y las advertencias del píxel |

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 25-ago-2026 | Formulario de las dos landings conectado a GHL, en 2 pasos con captura parcial | El formulario no enviaba los datos a ninguna parte: `handleSubmit` solo pintaba «¡Listo!» y borraba lo escrito | Leads que llegan al CRM: de 0 a todos | Probado en navegador; falta configurar y publicar |
| 25-ago-2026 | Creados 15 campos personalizados en GHL | Sin ellos GHL recibe el lead y bota los datos | Completitud de la ficha del contacto | ✅ Los 15 verificados |
| 25-ago-2026 | Workflow «Nuevo Lead - Form Landing» armado y publicado | Convertir el envío del formulario en contacto + oportunidad | Leads que llegan al CRM | ✅ Probado en producción por el cliente |
| 25-ago-2026 | Landings publicadas en Netlify con dominio propio | Estaban solo como código local | — | ✅ Las dos con certificado |
| 25-ago-2026 | Corregidas URLs de `localhost` en el nav de producción | Las pestañas de cruce entre landings daban error de conexión | Navegación entre las dos líneas | ✅ Cruzan y arrastran la atribución |
| 11-sep | Primera semana con campañas nuestras (creadas 4-sep) | — | Línea base | ✅ **$352.417 invertidos.** Formulario: $196.188 → 275 leads a $713. Landing: $156.229 → 2 registros |
| 11-sep | ⚠️ Se detecta que la landing optimiza hacia un evento que no envía | $118.598 en 7 días sin señal | Conversiones reales | ⛔ **Los conjuntos persiguen `CompleteRegistration`; la landing dispara `Lead`.** Los 8 `CompleteRegistration` de la semana vienen con `Purchase` e `InitiateCheckout` — son de la tienda que comparte el píxel |
| 11-sep | Se escribe su ficha de gestión en heat-ads | No tenía: el reporte salía sin método ni plan | — | ✅ Sin unidad de resultado fijada, para que las dos campañas salgan en bandas separadas y no se esconda el gasto de la landing |
| 21-sep | La cuenta figura `UNSETTLED` y deja de ser consultable | Impaga. El 17-sep estaba `ACTIVE`. Coincide con el reclamo de Matías por los cobros (16-sep) | Entrega diaria | ✅ **Nunca dejó de entregar**: $48k–$84k por día del 14 al 20-sep, solo el 21 en $0. Seba avisó al cliente y esa tarde volvió a correr |
| 21-sep | Cruce de las oportunidades de septiembre contra el gasto por origen | El CPL no alcanza para decidir: un lead barato que muere en «conversación» vale menos que uno caro que agenda | Tasa de agendamiento por origen | ⚠️ **Los primeros números de este cruce estaban mal** (Landing 16,9% · Formulario 3,7%): se midió con una lectura de GHL que devolvía contactos sin sus campos. Los buenos están en la sección «El CRM decide» |
| 21-sep | **Pausados los dos conjuntos de Creatiklab** | 3,5× más caros por agendamiento que los nuestros, con 277 oportunidades para mostrarlo | Gasto diario y cierre de mes | ✅ De ~$59.000 a ~$51.000 diarios. Septiembre cierra en **$1.983.139**, bajo el techo de $2.000.000 |
| 21-sep | Arreglado el panel: la landing salía en **0 agendados** | No era rendimiento. `Clientes potenciales \| Landing \| ABO` aparecía cero veces en `attributions[]` porque la landing entra por nuestro webhook, que escribe campos del CONTACTO | Agendados visibles de la landing | ✅ `lib/ghl-landing.ts` en heat-ads (commit `eb5cbce`). **Falta verificarlo en el panel en vivo** |
| 21-sep | El panel pasa a leer los **tres embudos** como un recorrido único | Con un embudo solo, la cuenta se quedaba ciega justo donde empieza lo que al cliente le importa: quién asistió, quién contrató, quién llegó al alta | Etapas visibles del CRM | ✅ Captación → Agendamiento → Tratamiento, con orden global. Un no-show cuenta como agendado; un «no interesado» cuenta como que solo entró |
| 21-sep | ⚠️ **Se detecta que el panel contaba los leads de la familia equivocada** | Lo encontró Seba mirando el Ads Manager, no el panel | Clientes potenciales por conjunto | ⛔ La landing mostraba **1 cliente potencial a $455.607** cuando su CPL real era **$1.656**. Meta cuenta el lead de formulario y el del sitio con nombres distintos y se tomaba siempre el primero de una lista fija |
| 21-sep | Se reconecta la agencia GHL para ganar el permiso de campos personalizados | El rescate de la landing no podía traducir los campos del contacto | Atribución de la landing | ⛔ **En la reconexión se perdió `oauth.write`** y la cartera entera quedó sin CRM. Ondex se desatascó con un PIT manual; el resto necesita reconectar con la lista de scopes corregida |
| 21-sep | Ondex queda leyendo su CRM con **PIT manual** | La agencia no podía generar el token de la sub-cuenta | Embudo visible en el panel | ✅ Landing muestra sus 7 agendados. 🔴 **Ese PIT hay que rotarlo** |
| 21-sep | Se actualiza la ficha de gestión del reporte del cliente | Era del 11-sep: decía que Creatiklab seguía al aire y llamaba «esta semana» a tres semanas de datos | Lo que el cliente lee en `/reporte` | ✅ Y se le agrega **etapa clave**, así que el reporte ahora muestra cuántos pacientes llegaron a agendar, no solo cuántos leads entraron |
| 21-sep | El reporte deja de medir la landing por un evento que la página no dispara | `CompleteRegistration` devolvía 1 con 101 clientes potenciales reales detrás | Unidad del reporte | ✅ Cuando llegan más clientes potenciales que registros, la unidad honesta es el cliente potencial. Acotado a eventos de registro: compras y conversaciones no se tocan |
