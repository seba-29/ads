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
- **Cambiar el evento de optimización de `CompleteRegistration` a `Lead`** en los conjuntos de landing. En 8 días el dataset recibió **4 `CompleteRegistration` contra 973 `Lead`**, y los 4 vienen de `agenda.softwaremedilink.com`, no de las landings. Pedirle a Meta un evento que el sitio no dispara es lo que sostiene el CPM alto.
- **Preguntar qué es `agenda.softwaremedilink.com`.** Es el único dominio que manda `Purchase` a este píxel. Si es la agenda propia de la clínica, ahí hay un evento de fondo de embudo que hoy no usa nadie.
- **Verificar el panel en vivo** — abrir el reporte de Ondex y confirmar que la campaña de landing ya muestra sus 12 agendados. Hasta verlo, el arreglo está escrito pero no comprobado.
- **Arreglo de ORIGEN en GHL** — que el workflow `Nuevo Lead - Form Landing` escriba `attributions[]` al crear la oportunidad, y no solo los campos del contacto. ⚠️ Al mapear: el id del CONJUNTO viaja en `utm_term`, no en `utm_medium` (ahí va el literal `"paid"`). El parche de lectura no reemplaza esto, lo tapa.
- **Definir `etapaClave` de Ondex** en `lib/reporte-gestion.ts` — hoy no tiene ninguna, así que el reporte no puede contar «cuántos llegaron a agendar». Casa Zen usa `"reserva confirmada"`, Playmaker `"cotizacion enviada"`. Falta acordar con Matías cuál es la etapa que importa acá.

## El CRM decide, no el CPL — cruce del 21-sep-2026

Cruce completo de los **1.819 contactos** y las **1.736 oportunidades** de GHL
contra el gasto por conjunto. Detalle en
`clinica-ondex/trazabilidad-conjuntos-sep2026.md`.

| Canal | Leads | Agendados | Tasa | Gasto | $/agendamiento |
|---|---:|---:|---:|---:|---:|
| **Landing propia** | 102 | **13** | **12,7%** | $455.607 | $35.047 |
| **Formulario nativo** | 663 | **21** | 3,2% | $516.043 | **$24.573** |
| **Creatiklab** *(pausada)* | 461 | **4** | 0,9% | $379.367 | $94.842 |

**El conjunto que más agenda: `Ondas de Choque | Santiago` de FORMULARIO** — 14
agendamientos a **$18.443**, el más barato y el de más volumen de la cuenta.

**Lo que sí concluye:** Creatiklab era 3,9× más cara por agendamiento. Pausada.
Y los dos conjuntos de Tbrein llevan **$119.777 con 6 leads y cero
agendamientos** — son lo próximo a apagar.

**Lo que NO concluye:** entre landing y formulario, $35.047 contra $24.573 sobre
13 y 21 casos no alcanza para declarar ganador. Se dejan las dos y se mide de
nuevo en octubre.

### ⚠️ Dos trampas de medición que costaron dos correcciones

**La unidad es el CONTACTO, no la oportunidad.** Cada paciente genera una
oportunidad por embudo, así que contando oportunidades el mismo agendamiento se
cuenta hasta tres veces. La primera versión de este cruce decía 12 agendamientos
de landing; los reales son 13, pero sobre un total muy distinto.

**Y se parte del listado de contactos, no de las oportunidades.** Partir de las
oportunidades deja afuera a quien todavía no entró al embudo.

### ✅ La landing NO pierde leads

Se reportó que de 152 leads que Meta contaba solo llegaban 37 al CRM. **Era un
error de medición.** Leer los contactos con `GET /contacts/{id}` en paralelo
hace que GHL **devuelva HTTP 200 con el contacto sin sus campos** — no 429,
recorta. Releídos de a uno y con pausa, volvieron completos.

Reconciliado con las **215 corridas** de la automatización `Nuevo Lead - Form
Landing`: 215 ÷ 102 contactos = **2,11 corridas por lead**, que es exactamente
lo que produce un formulario de dos pasos (captura parcial + envío completo
sobre el mismo contacto). Confirmado por los campos: 98 `lead_completo` y 4
`lead_parcial`.

Lo que sí queda: **Meta cuenta 152 y los reales son 102.** La diferencia es del
lado de Meta —ventanas de atribución y posible falta de deduplicación píxel/CAPI—
así que el costo por lead real de la landing es **$4.467**, no los ~$3.000 que
muestra el panel de Meta.

### Los 28 leads de landing sin UTM

28 contactos traen `Origen landing` pero no `UTM campaign`: llegaron sin
parámetros de campaña. **6 de ellos agendaron (21,4%, la mejor tasa de la
tabla)** y no se les puede asignar conjunto. Arreglo: guardar `fbclid` y
`Referrer` en la landing cuando no vengan UTM.

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
| 21-sep | Cruce de las 1.200 oportunidades de septiembre contra el gasto por origen | El CPL no alcanza para decidir: un lead barato que muere en «conversación» vale menos que uno caro que agenda | Tasa de agendamiento por origen | ✅ Landing 16,9% · Formulario 3,7% · Creatiklab 1,4%. Costo por agendamiento: $37.967 · $27.160 · $94.842 |
| 21-sep | **Pausados los dos conjuntos de Creatiklab** | 3,5× más caros por agendamiento que los nuestros, con 277 oportunidades para mostrarlo | Gasto diario y cierre de mes | ✅ De ~$59.000 a ~$51.000 diarios. Septiembre cierra en **$1.983.139**, bajo el techo de $2.000.000 |
| 21-sep | Arreglado el panel: la landing salía en **0 agendados** | No era rendimiento. `Clientes potenciales \| Landing \| ABO` aparecía cero veces en `attributions[]` porque la landing entra por nuestro webhook, que escribe campos del CONTACTO | Agendados visibles de la landing | ✅ `lib/ghl-landing.ts` en heat-ads (commit `eb5cbce`). **Falta verificarlo en el panel en vivo** |
