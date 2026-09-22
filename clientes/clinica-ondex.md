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

- 🔴 **Leer el `ctwaClid` y el `sourceId` del primer mensaje de la
  conversación.** Es el pendiente más grande de la cuenta: **8 de los 59
  agendamientos de septiembre** vienen de anuncios de WhatsApp y el panel no
  los muestra. El dato está completo en GoHighLevel —id del anuncio incluido—
  y solo hay que leerlo del mensaje, no del contacto.
- 🟢 **Que la landing conserve los UTM entre sus dos pantallas.** Es el arreglo
  de mayor retorno de la cuenta y no cuesta un peso de medios: **34 de sus 109
  contactos pierden el id del conjunto**, y esos 34 agendaron 6 veces (17,6%).
  Hoy el mejor canal del cliente se muestra a la mitad.
- 🔴 **Rotar el PIT manual.** El panel de Ondex depende de él y se pegó en un
  chat de IA. Uno nuevo con los mismos permisos, a la ficha del admin, y
  revocar el viejo.
- ⚠️ **Revisar `Landing | publico Tbrein | Las Condes - Copia` antes de
  apagarlo.** Se iba a apagar por no tener agendamientos; su anuncio
  `Testimonio volver a correr` trajo **uno por WhatsApp** que nadie contaba.
  Con $43.574 y 1 agendamiento sigue siendo caro, pero ya no es un cero. El
  conjunto ORIGINAL sí está en cero real —$81.640, 3 contactos— y ya está
  pausado.
- **Cambiar el evento de optimización de `CompleteRegistration` a `Lead`** en
  los conjuntos de landing. Se viene arrastrando desde el 11-sep: la página no
  dispara ese evento, así que Meta entrega a ciegas. Resetea el aprendizaje
  2-3 días, por eso conviene hacerlo con el mes recién empezado.
- **Renovar creativos** con testimonios de pacientes reales, cubriendo
  distintas condiciones. Es la palanca más grande y se le pidió al cliente.
- **Etiquetar en origen las conversaciones entrantes de WhatsApp.** 12 de los
  59 agendamientos de septiembre llegan con el contacto completamente en
  blanco. No es un arreglo de atribución —no hay nada que atribuir— es darle
  al CRM una forma de registrar de dónde viene quien escribe sin haber hecho
  clic.
- **Preguntar qué es `agenda.softwaremedilink.com`.** Es el único dominio que
  manda `Purchase` a este píxel. Si es la agenda propia de la clínica, ahí hay
  un evento de fondo de embudo que hoy no usa nadie.

## El CRM decide, no el CPL — cierre del 22-sep-2026

### Lo que compró la cuenta (Meta, septiembre)

| Campaña | Estado | Gasto | Volumen que cuenta Meta |
|---|---|---:|---:|
| `Clientes potenciales \| Formulario \| ABO` | activa | $550.393 | 725 leads de formulario |
| `Clientes potenciales \| Landing \| ABO` | activa | $474.713 | 163 leads de píxel |
| `Leads / WhatsApp / Creatiklab` | conjuntos pausados | $379.378 | 1.108 conversaciones |
| `Clientes potenciales / Whatsapp / Las Condes` | pausada | $122.122 | 44 conversaciones |
| **Total** | | **$1.526.606** | |

### Los 59 agendamientos del CRM, por origen

Contados **por contacto**, con los tres embudos encadenados y de forma
acumulada. Los 19 que no cuelgan de ninguna campaña se releyeron uno por uno
y los 12 sin huella se abrieron a mano en GoHighLevel.

| Origen | Agendamientos | |
|---|---:|---|
| Campaña de Meta (`attributions[]`) | 28 | el panel los muestra |
| Landing con UTM | 7 | el panel los muestra |
| **Click-to-WhatsApp, sin leer** | **8** | **la atribución está y nadie la lee** |
| Landing que perdió los UTM | 6 | son de Meta |
| **Subtotal: trabajo de Meta** | **49** | **el panel muestra 35** |
| Orgánico | 2 | |
| Pacientes con cita previa | 3 | confirmaban hora, no son leads |
| Contactos creados antes de septiembre | 5 | agendaron este mes, entraron antes |
| **Total** | **59** | |

**49 de los 59 agendamientos los trajo la publicidad, y el panel muestra 35.**
No porque el CRM no tenga el dato: lo tiene completo y en el lugar equivocado.

### ⚠️ Dónde guarda GoHighLevel la atribución de click-to-WhatsApp

**No está en `attributionSource` del contacto. Está en el PRIMER MENSAJE de la
conversación**, y trae más de lo que hace falta:

| Campo | Qué es |
|---|---|
| `ctwaClid` | el click id de Meta — solo lo pone un anuncio |
| `sourceId` | **el id del ANUNCIO**, que resuelve conjunto y campaña |
| `sourceType: "ad"` | confirma que fue un clic pagado |
| `sourceApp` | `facebook` o `instagram` |
| `body`, `title`, `mediaUrl` | el copy y el creativo exactos |

Los 8 agendamientos recuperados, resueltos contra Meta:

| Anuncio | Conjunto | Campaña | Agend. |
|---|---|---|---:|
| Ad #2, Ad #3, Ad #1 | `Adventage +` | Creatiklab | 4 |
| Ad #1 | `Hot Traffic` | Creatiklab | 2 |
| `Testimonio espolón / fascitis` | `Ondas de Choque \| Stgo / Las Condes` | Formulario | 1 |
| `Testimonio volver a correr` | `Landing \| Tbrein \| Las Condes - Copia` | Landing | 1 |

**Creatiklab se lleva 6 de los 8.** Se le atribuían 4 agendamientos por
$379.378 —**$94.842** cada uno— y con estos son **al menos 10: $37.938**. Sus
dos conjuntos se pausaron el 21-sep con el número inflado. A $37.938 sigue
siendo peor que el formulario ($24.583), así que la decisión no se da vuelta
sola; pero se tomó con un número 2,5 veces peor que el real.

### La landing es el mejor canal y es el que peor se mide

| Conjunto | Contactos | Agendados | Tasa |
|---|---:|---:|---:|
| `Kinesiologia \| Santiago` | 17 | 4 | **23,5%** |
| **sin `utm_term`** | **34** | **6** | **17,6%** |
| `Ondas de Choque \| Santiago` | 51 | 3 | 5,9% |
| `Landing \| Tbrein \| Las Condes - Copia` | 4 | 0 | 0% |
| `Landing \| Tbrein \| Las Condes` | 3 | 0 | 0% |
| **Landing completa** | **109** | **13** | **11,9%** |

Contra todo el resto de la cuenta: **1.180 contactos, 28 agendamientos, 2,4%.**

La landing convierte **5 veces mejor**, y un tercio de sus contactos pierde el
id del conjunto entre la primera y la segunda pantalla del formulario.
Arreglarlo no trae un lead más: deja de esconder el mejor canal del cliente.

### El anuncio que sostiene la cuenta

De los agendamientos del formulario, **13 vienen de un solo anuncio**:
`Testimonio espolón / fascitis`, a **$17.516** por agendamiento — la mitad del
promedio de la cuenta. Los otros cuatro anuncios de ese mismo conjunto traen
**1 entre todos**.

Mover presupuesto entre campañas rinde menos que renovar creativos con ese
formato: paciente real contando un dolor concreto.

Y en el formulario, `Ondas de Choque` está a **$548** por lead contra **$1.239**
de Kinesiología, con el mismo presupuesto diario en los dos.

### Una hipótesis que se dio por descartada sin haberla medido

El 22-sep se declaró muerta la hipótesis de que los agendamientos sin atribuir
eran click-to-WhatsApp: releídos los 19 por el detalle del contacto, **ninguno
traía `ctwaClid`**. La conclusión era falsa y el dato era correcto — el
`ctwaClid` **no vive en el contacto, vive en el mensaje**. Se buscó en el lugar
equivocado y se reportó como medición.

Lo destrabó Seba pidiendo los ids para abrirlos a mano: 8 de los 12 traían el
anuncio completo a la vista.

> **Regla.** «Lo busqué y no está» solo vale si se sabe dónde debería estar.
> Cuando una fuente puede guardar el mismo dato en dos objetos distintos
> —contacto y conversación— mirar uno y concluir por los dos es adivinar con
> cara de medición.

### ⚠️ Cuatro trampas de medición que costaron dos días

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

**El listado de contactos de GHL NO trae `attributionSource`.** Solo trae
`customFields`. Leído así, todo contacto sin campos de landing cae en «sin
huella» — 558 personas que no dicen de dónde vinieron, dicen que no se las
miró. El detalle `/contacts/{id}` sí lo trae, pero hay que pedirlo de a uno con
pausa. Por eso el diagnóstico declara `confiable` (el desglose completo) y
`veredictoConfiable` (los agendamientos) **por separado**: son dos
afirmaciones distintas y mezclarlas deja al lector sin saber cuál creer.

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
| 22-sep | Se mide de dónde vienen los agendamientos que el panel no atribuye | El cliente contó ~55 agendamientos contra 35 del panel, y «el resto es orgánico» era una suposición | Explicar la diferencia con números | ✅ **59 agendamientos reales, 35 rastreables — el panel calza exacto.** `GET /api/admin/origen-leads?location=<id>` clasifica por las huellas del contacto y relee por el detalle los que no cuelgan de ninguna campaña |
| 22-sep | ⛔ Descartada la hipótesis de WhatsApp | Se venía trabajando con que los sin atribuir eran click-to-WhatsApp con el `ctwa_clid` perdido | Agendamientos recuperables | ⛔ **Ninguno de los 19 trae `ctwaClid`, `adId` ni `fbclid`.** Los 12 sin huella tienen además `source` vacío: inatribuibles por medición, no por falta de mirar |
| 22-sep | Medida la landing por conjunto, del lado del CRM | Meta mostraba `lead: 0` en el conjunto Tbrein, y un cero de Meta no es un hecho del mundo | Leads reales por conjunto | ✅ **La landing convierte al 11,9% contra 2,4% del resto.** Y 34 de sus 109 contactos pierden el `utm_term`: esos agendaron 6 veces. Tbrein sí fue rendimiento: 3 contactos por $81.640 |
| 22-sep | ⚠️ Se corrige un error de proceso propio | Se le dijo a Seba «mergeado y desplegado» habiendo verificado que main tenía un merge nuevo, no que tuviera **el commit**. El endpoint corrió dos veces con el build viejo | — | ✅ Regla: antes de mandar a correr algo, verificar el commit específico en main, no el último merge |
| 22-sep | ⛔ **Se corrige la conclusión sobre WhatsApp: era la hipótesis buena** | Se había declarado descartada porque el `ctwaClid` no aparecía en `attributionSource` del contacto. Vive en el PRIMER MENSAJE de la conversación, junto con el id del anuncio | Agendamientos atribuibles | ✅ **8 de los 12 sin huella vienen de anuncios.** Los 59 quedan en **49 de Meta contra 35 que muestra el panel**. Lo destrabó Seba abriendo los contactos a mano |
| 22-sep | Se recalcula Creatiklab con los agendamientos recuperados | Se pausaron sus dos conjuntos el 21-sep por $94.842 por agendamiento | Costo por agendamiento real | ⚠️ **Son al menos 10 agendamientos: $37.938.** Sigue siendo peor que el formulario ($24.583), pero la decisión se tomó con un número 2,5× peor que el real |
