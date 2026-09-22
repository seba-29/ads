> **Copia de respaldo.** El destino natural de este documento es
> `heat-ads/docs/reporteria-cliente-blueprint.md`. El commit existe alla, pero el
> push a HEAT-IA/heat-ads devuelve 403: Claude no tiene acceso a esa organizacion
> en GitHub. Se deja aca para no perderlo. Cuando se restablezca el acceso,
> mover y borrar esta copia.

<!-- Generado por un workflow de 25 agentes: mapeo del codigo real de heat-ads y
del skill reportes-y-optimizacion, 5 conceptos independientes, panel de jueces
(cliente final / operador de agencia), sintesis y tres criticas adversariales
(cliente, operacion, ingenieria). Ranking de conceptos: La Edicion 6.5 ·
La Banda 6.5 · El Recibo 6.0 · El Veredicto 6.0 · La Pagina 6.0.
Es una PROPUESTA, no una decision tomada. Ver seccion 11. -->

# BLUEPRINT — **La Edición**
### Sistema de reportería para clientes de HEAT IA LATAM · v2

---

## 1. LA TESIS

Cada mes cerrado produce **un documento numerado, congelado y con URL propia** — "Edición N°4 · agosto 2026 · Clínica Palavas" — que llega por correo y WhatsApp, se abre sin clave en el teléfono y no vuelve a consultar a Meta ni a GHL nunca más. Entre ediciones, cada lunes sale **el Pulso**: dos líneas por WhatsApp con lo único que se mueve en siete días y sí se puede afirmar. El documento numerado es mensual porque el juicio es mensual; el lunes no hay juicio, hay estado de avance.

Adentro de la Edición hay dos zonas rotuladas con autoría explícita: **"Lo que hicimos nosotros"** (Meta: pauta al aire, resultados, costo por resultado) y **"Lo que pasó después en tu negocio"** (CRM: cuántos agendaron, asistieron, pagaron) — porque el corte correcto no es *borrar* lo que la agencia no controla, es *firmar cada tramo con el nombre de quien lo hizo*.

Lo que lo separa de heat-ads: heat-ads es una aplicación con 11 pantallas que entrega 12 calugas y le pide al cliente que saque la conclusión. La Edición es un documento de un scroll que:

- **titula con la cifra que decide, no con la más favorable** — cuando existe el cruce con el CRM, el titular es el costo por venta y el total pagado (pauta + honorarios), no el costo por lead;
- **dictamina desde la Edición N°1**, porque la meta la propone HEAT según rubro y el cliente la corrige, en vez de pedirle un dato para poder opinar;
- **se niega a declarar cambios que caben dentro del ruido estadístico**, y solo puede decir "mejoró" o "empeoró" contra una referencia declarada;
- **cierra la contabilidad del mes anterior**: cada edición recuenta la cohorte de hace un mes ya madura, así el número verdadero de ventas existe en algún documento;
- y **no afirma nada que no pueda sostener**: sin bitácora escrita no dice "no tocamos la cuenta", sin conteo verificable de CRM no dibuja el embudo, y sin estado fresco de la cuenta no acusa a nadie de tener un saldo pendiente.

---

## 2. QUÉ VE EL CLIENTE

### 2.0 · Las dos piezas

| | **El Pulso** | **La Edición** |
|---|---|---|
| Cadencia | Lunes, todas las semanas | Mensual, publicada el día 4 (ver §4.1) |
| Formato | 2-3 líneas de texto por WhatsApp/correo | Documento congelado en `/e/<token>` + PDF |
| Numerado | No | Sí, correlativo por tipo |
| Lleva veredicto | No | Sí |
| Firma humana | No | Sí, 3 campos (con publicación garantizada, §8) |
| Se publica solo | Sí, salvo bloqueo (§2.2) | Sí, día 4, con o sin prosa |
| Contenido | Acumulado del mes contra lo acordado + peticiones pendientes | Todo lo de §2.1 a §2.12 |

Texto del Pulso, entero:

```
Clínica Palavas · lunes 15 de septiembre
Vamos en $612.000 de los $1.600.000 de pauta del mes y 340 personas
interesadas, a $1.800 cada una. Cerramos el 30 y te llega la Edición N°5.
Seguimos esperando los 3 videos nuevos (los pedimos el 2/9).
```

No lleva flecha, no lleva porcentaje, no lleva gráfico y no se numera. Es un parte de avance, no un documento; si un lunes no hay nada que decir, dice el acumulado y nada más.

**Edición semanal:** existe, pero **no por defecto**. Se habilita cliente por cliente en /admin y solo se ofrece a los tenants que superaron `MUESTRA_MINIMA` en cada una de las últimas 4 semanas. Lleva su propio correlativo ("Semana N°13", nunca mezclado con "Mes N°4") y su propia tira de archivo. Un cliente que no cruza la muestra en una semana recibe Pulso, no Edición: numerar ocho documentos que dicen "es prácticamente lo mismo" enseña a no abrirlos.

### 2.0.b · Antes de abrir: la tarjeta de WhatsApp

La página lleva `og:image` generada al congelar, con la frase de portada y las tres cifras dibujadas. Para buena parte de los destinatarios **esa tarjeta ES el reporte** — la leen sin abrir. Si la tarjeta dice "ads.heat.cl" y nada más, el documento no se abre. El asunto del correo es el titular completo, nunca "Cliente: resultados de agosto".

### 2.1 · Cabecera (3 líneas, no un header de app)

```
HEAT · Clínica Palavas
Edición N°4 · agosto de 2026
Cifras de anuncios al 3 de septiembre. Las ventas se recuentan en la
Edición de septiembre.
```

La tercera línea es la promesa del producto y **dice la verdad completa**: la parte de Meta no se mueve porque se congela después del reproceso (§4.1); la parte del CRM sí sigue madurando y por eso se recuenta una vez, en la edición siguiente. Prometer "no cambian" sobre todo el documento era una promesa que el propio sistema desmiente.

### 2.2 · Estado (condicional, arriba de todo, reemplaza los números)

Aparece **solo** cuando hay algo que impide leer, y en ese caso el bloque de cifras **no se dibuja** — un `$0` grande parece un mal resultado, no un bloqueo.

| Variante | Fuente | Qué pasa |
|---|---|---|
| Bloqueo administrativo (saldo, cuenta inhabilitada) | `meta_account_status`, `meta_account_balance`, **con `meta_estado_at` < 24 h** | **No se publica edición.** Se abre un aviso interno en la mesa de despacho: "Playmaker lleva 3 semanas sin salir al aire; nadie ha escrito". Un bloqueo es trabajo de teléfono, no de documento. |
| Estado no confirmable (`meta_estado_at` > 24 h o ausente) | — | Nunca se afirma la causa. La edición queda en borrador con "no pudimos confirmar el estado de la cuenta". |
| Sin material | bitácora, marca manual en /admin | Se publica sin cifras de eficiencia: "Las campañas están detenidas esperando material nuevo. Lo pedimos el 12 de agosto." + entra a *Qué necesitamos de ti* |
| Sin muestra | `n < 15` | "Entraron 7 personas este mes. Con menos de 15 no se puede leer si el costo subió o bajó — la diferencia sería azar." |
| Primera edición | `cubreDesde()` | "Es tu primer mes con nosotros. La comparación empieza en la Edición N°2." |

La regla que atraviesa la tabla: **la automatización no publica acusaciones**. Publica resultados, o publica que no pudo, o no publica y le avisa a una persona.

### 2.3 · La frase

Tipografía 24-28 px. Lo único que muchos van a leer completo. Se arma con `buildHighlight()` (lib/insight.ts) más las cláusulas de cierre de abajo.

**Cuando existe el cruce con el CRM** (que es el caso al que apunta el producto):

> **"En agosto pusimos $1.652.512 de pauta y entraron 940 personas interesadas. De las que ya llevan un mes de maduración, 24 se convirtieron en clientes: $71.354 por cliente, sumando pauta y honorarios."**
>
> *En gris, debajo:* Cada persona interesada costó $1.758 de pauta.

**Cuando no existe** (sin CRM conectado, o con el bloque suspendido por §10):

> **"En agosto pusimos $1.652.512 de tu presupuesto de anuncios y entraron 940 personas interesadas entre el 1 y el 31 de agosto. Cada una costó $1.758 de pauta, o $2.410 sumando nuestros honorarios."**

Reglas de redacción cableadas, no confiadas al criterio:

| Regla | Motivo |
|---|---|
| **Nunca "invertiste"**: se dice *"pusimos tu presupuesto de anuncios"* | El cliente paga honorarios además de la pauta. Si el tenant tiene `fee_mensual`, el costo total aparece en la misma frase, no en gris al pie. Decirlo primero es más barato que ser descubierto con calculadora. |
| **El costo por lead nunca titula si hay costo por venta** | Si el costo por lead es la métrica equivocada para ordenar la tabla (§2.11), es la métrica equivocada para titular el documento. |
| **Nunca un porcentaje sin sus dos números** | "de $5.100 a $4.200", jamás "-18%". |
| **Prohibido el "pero"** | Si el veredicto del mes es peor, la generación rechaza cualquier segunda cifra que se mueva en dirección favorable. "Subió el costo por lead, pero mejoró el CTR" está bloqueado en código. |
| **Cobertura declarada cuando la familia no es el 100% del gasto** | Ver §2.4.b. |

### 2.4 · Los tres números

Tres cifras grandes en fila. **Sin grilla de calugas.** Ninguna lleva intervalo de confianza en pantalla.

| | Cifra | Debajo, en chico |
|---|---|---|
| 1 | **$1.652.512** — Presupuesto de anuncios *(+ "$2.264.512 con honorarios" si hay `fee_mensual`)* | "La edición pasada fueron $1.598.000." |
| 2 | **940** — Personas interesadas *(unidad del cliente vía `labelResultado()`)* | "La edición pasada fueron 872." |
| 3 | **$1.758** — Costo por persona interesada | La línea de referencia (ver 2.4.c) |

La unidad **nunca es "leads" cableado**: sale de `resultados.ts`, que resuelve el resultado según el objetivo de cada campaña. Palavas ve "personas interesadas", Dra. Vanessa ve "conversaciones", Be Fashion ve "compras". Esto exige que `results` y `result_type` existan **por campaña y por día** en la historia propia, que hoy no existen: es la Fase 1 del plan (§8).

#### 2.4.b · Cuentas con más de un objetivo

`sumNodes` (lib/funnel.ts) marca el total como `mixed` y pone `resultados = 0` cuando conviven dos familias, y `buildHighlight` deja el costo en `null`. Es correcto y no se toca: dividir todo el gasto por una sola familia infla el costo con plata que perseguía otra cosa. La Edición lo resuelve así:

1. `tenants.resultado_principal` declara **una familia** (lead / conversación / compra / visita al perfil / clic).
2. El numerador es **el gasto de las campañas de esa familia**, no el gasto total: `gastoDeFamilia(filas, familia) / resultadosDeFamilia(filas, familia)`. Con la historia por campaña esto es una suma en Postgres.
3. Si la familia no cubre el 100% del gasto, la frase lo declara: *"De tus $1.652.512, $1.040.000 fueron a captar personas interesadas; el resto fue a campañas de mensajería, que se cuentan aparte."*
4. Si dos familias superan cada una el 25% del gasto, la edición muestra **dos bloques de tres números**, uno por familia, cada uno con su unidad. Un solo número no es una promesa que esta cartera pueda cumplir en todas las cuentas.

#### 2.4.c · La referencia, en cascada — es lo que decide si el reporte sirve

| Si existe | Se muestra |
|---|---|
| `ticket_promedio` cargado → CPA objetivo calculado | 🟢/🟡/🔴 "Tu meta es $3.500 por persona interesada. Este mes pagaste $1.758." |
| Sin ticket, con **meta propuesta por HEAT** según rubro (`meta_rubro`, valor por defecto que HEAT define una vez por vertical) | 🟢/🟡/🔴 "Para clínicas estéticas trabajamos con una meta de $3.500 por persona interesada. Este mes pagaste $1.758. Si tu ticket es distinto al que estimamos, corrígelo acá →" |
| Ni ticket ni rubro clasificado | 📋 "Todavía no podemos decirte si $1.758 es bueno o malo." → engancha con §2.9 |

La fila del medio es nueva y es la que permite que **la Edición N°1 dictamine**. La agencia propone la meta y el cliente la corrige; pedirle el dato para poder opinar se lee como no tener opinión. El campo de corrección es uno solo y está a un toque.

### 2.5 · La comparación, escrita como frase

Nunca una flecha con un porcentaje solo. Cuatro salidas posibles:

- **Cambio declarable:** "Bajó de $2.100 a $1.758 por persona interesada."
- **Dentro del ruido:** "Es prácticamente lo mismo que la edición pasada: la diferencia cabe dentro de lo que varía normalmente un mes con este volumen." → sin flecha, sin color, sin porcentaje.
- **No comparable por unidad:** "Antes contábamos conversaciones de WhatsApp y ahora contamos personas que dejan sus datos en un formulario. No son lo mismo y compararlos no significaría nada."
- **No verificable:** "Este mes cambiamos la estructura de campañas, así que la comparación con el mes anterior no mide lo mismo." — o, cuando no hay bitácora, se muestra el número **sin veredicto** (§4.3, compuerta 3 fail-closed).

Tres estados distinguidos por **forma además de color** (flecha llena / signo igual / línea hueca), reusando la técnica de `CaminoRoadmap.tsx` — para daltónicos y para el PDF impreso en blanco y negro.

### 2.6 · El gráfico

Un solo gráfico, dos series dibujadas como un solo objeto:

- **Barras = resultados por semana del mes reportado** (4 o 5 barras), que es lo que responde "¿cómo se movió dentro del mes?" y cumple la comparación semana a semana que pide el encargo sin mandar ocho documentos.
- **Detrás, en gris, los 6 meses anteriores** como barras más angostas, para la lectura de largo plazo.

Alto = bueno (resultados), nunca costo, para que la lectura intuitiva no se contradiga. Debajo de cada barra, en gris chico, el costo por resultado de ese tramo. **Sin doble eje, sin línea superpuesta, sin desglose por día.**

Si entre dos tramos cambió la familia de resultado, la serie se **corta con una marca visible**: "acá cambiamos el tipo de campaña; los costos de antes y después miden cosas distintas".

Datos desde `daily_snapshots_campana` vía `readSerieCampana()`. Cero llamadas a Meta.

### 2.7 · Qué hicimos, y qué pasó con eso

Lista generada desde `bitacora_cambios`, filtrada por `visible_cliente`, con **el efecto medido al lado** cuando la ventana lo permite:

```
12 ago · Subimos el presupuesto de Cosmetología, era la campaña más eficiente.
         → En las 3 semanas siguientes trajo 148 personas más, a $1.402.
19 ago · Apagamos dos videos que ya no traían respuesta.
         → Muestra chica para medirlo por separado.
28 ago · Sumamos tres creativos con la oferta de aniversario.
         → Se lee en la Edición de septiembre.
```

El efecto sale de comparar la campaña afectada antes/después dentro de la historia por campaña, con la misma banda de ruido de §4.2: si no pasa el umbral, dice "muestra chica para medirlo por separado". Nunca se inventa una mejora.

La sección cierra con **dos líneas de qué viene, con fecha**, escritas por el operador:

```
Qué sigue: 8/9 lanzamos la campaña de Depilación Láser para primavera.
           15/9 apagamos Adv+ si sigue sobre $2.500 por persona.
```

**Cuando no hay filas en la ventana, la sección NO afirma nada.** Dice, literal: *"No hay cambios registrados en este período."* La frase doctrinal —"no tocamos la cuenta a propósito porque moverla habría reiniciado el aprendizaje que ya pagaste"— sale **solo** si existe una fila explícita marcada `sin_cambios` que una persona creó. La ausencia de registro es ausencia de registro, no una decisión firmada por la agencia.

**Costo de escritura ≈ cero, o la sección no se llena:** el candidato lo propone el sistema comparando el árbol de Meta de hoy contra el de ayer (presupuestos, estados de conjunto y anuncio ya viven en `meta_tree_cache`); el operador confirma, edita o descarta desde un campo único en `/admin/[id]`, que ya se abre en el triage. Redactar desde cero, con 9 a 20 clientes, no ocurre — está medido: de 5 fichas en `/ads`, dos tienen filas y ninguna tiene registro de optimización semanal.

### 2.8 · Lo que pasó después en tu negocio

Bajo un rótulo tipográficamente distinto, con una línea de encabezado explícita:

> *Hasta aquí lo que hicimos nosotros. De aquí en adelante, lo que pasó en tu equipo con esas personas.*

**Dos cohortes, dos fechas, y ninguna se presenta como definitiva sin serlo:**

```
Los de agosto (medidos al 3 de septiembre — 3 días de maduración, es el piso)
  312 entraron a tu CRM  →  84 agendaron  →  51 asistieron  →  16 pagaron

Los de julio, recontados hoy (34 días de maduración — este es el número final)
  287 entraron  →  96 agendaron  →  71 asistieron  →  24 pagaron
  Cuando publicamos la Edición de julio íbamos en 11 pagados.
```

Decisiones que sostienen ese bloque:

| Decisión | Motivo |
|---|---|
| Los tramos son **entraron → agendaron → asistieron → pagaron** | Son exactamente los buckets que `bucketForStage` produce (lead/agendado/asistio/vendido). "Contactadas" no existe en el código y no se inventa una etapa que nadie mide. |
| El primer tramo es el **conteo del CRM**, no el número de Meta | 940 (Meta) y 312 (GHL) son poblaciones distintas. Presentarlas como el mismo número en un documento congelado es la pérdida de autoridad que §3 usa para amputar `metaAgendado`. La diferencia se explica en una línea al pie. |
| Cada edición **recuenta la cohorte del mes anterior** | Resuelve el subdeclarado permanente: el número verdadero de ventas de julio existe, con fecha, en la Edición de agosto. No es una "edición correctiva", es una sección fija. |
| El bloque **no se dibuja** si `oppsTotales === 0` con embudo conectado, o si `getOpportunities` devolvió `truncado`, o si `resolveConn` no obtuvo token | `getOpportunities` devuelve `{opps: [], source: "live"}` sin error cuando el OAuth de GHL está caído. Congelar `312 → 0 → 0 → 0` es acusar al cliente de no trabajar por una falla nuestra. Cero se escribe solo cuando se pudo contar. `oppsTotales` y `truncado` viajan a la fila congelada. |
| El embudo se calcula con **`pipelineStages` del tenant, siempre** | `lib/stages.ts` tiene cableados los IDs de HEAT LATAM como respaldo; un tenant sin ellos queda clasificado con el mapa de otro cliente. |

Sin nombres, sin teléfonos, sin correos, sin drill-down, sin `costoAgendaCal`, sin columnas configurables de etapa. Pie de una línea: *"Contamos solo a las personas que llegaron por estos anuncios."*

**Por qué entra, contra la letra del encargo:** la restricción de Seba es no *firmar resultados ajenos*. Un conteo rotulado como "lo que pasó en tu equipo" no firma nada — mide **nuestra entrega contra su respuesta**. El caso Palavas lo demuestra: Las Condes tenía el mejor costo por lead de la cuenta y el peor costo por venta, 18× peor que Cosmetología. Un reporte que titula con costo por lead y borra el tramo siguiente simplifica hacia la mentira. Lo que sí se saca son las métricas **híbridas** que atribuyen la culpa al lado equivocado (§3).

### 2.9 · Qué necesitamos de ti

Máximo dos peticiones, **generadas por reglas** a partir de los huecos de la ficha, cada una con fecha y consecuencia:

- Sin `ticket_promedio` → *"Estimamos que un cliente nuevo te vale $180.000. Con tu número real la meta se ajusta y el veredicto es tuyo, no nuestro."* + **un solo campo y un botón**, o responder por WhatsApp. **No se pide margen** — el cliente lo declaró invasivo y HEAT lo estima internamente.
- Sin material nuevo hace >21 días → *"Necesitamos 3 videos nuevos antes del 12/09. Con los actuales el público ya los vio demasiadas veces y el costo va a seguir subiendo."*

### 2.10 · La nota de HEAT

Tres campos cortos escritos por el operador, con nombre y foto:

- **Qué encontramos** (máx. 400 car.) — pre-rellenado con la salida de `detectAlerts()` ya filtrada por banda, para que se **edite** y no se escriba en blanco. Aquí va —y solo aquí— la lectura que ningún número puede dar: *"el problema no está en la publicidad, está en lo que pasa después: 80 personas de Las Condes y solo 6 llegaron a agendar."*
- **Qué sigue** (2-3 acciones con fecha; nunca "seguiremos optimizando") — se dibuja al pie de §2.7.
- La cláusula de cuello de botella viaja dentro de la frase de portada.

### 2.11 · Reparto por servicio o zona, y tres anuncios

**Reparto.** De 3 a 6 filas planas, con **alias públicos** que HEAT escribe una vez en /admin (`tenants.alias_publico jsonb`): "Depilación · Las Condes", nunca `PALAVAS | LC | Depilación | Adv+`. Lo sin alias cae en "Otros". Campañas apagadas filtradas con `estaCorriendo()`.

| Columna | Presente | Nota |
|---|---|---|
| Qué es | siempre | alias público |
| Pauta | siempre | |
| Personas interesadas | siempre | unidad del tenant |
| Costo por interesada | si `n ≥ 15` | bajo el umbral: se muestra el conteo y "muestra chica todavía" |
| Personas que pagaron | solo con CRM | **rotulado con su edad**: "medido a 3 días" |
| Costo por venta | solo con CRM | idem |

**El orden de la tabla del mes reportado es por costo por resultado**, no por costo por venta: con cohortes de 1 a 30 días de maduración, ordenar por costo por venta ordena por antigüedad —el segmento lanzado el día 3 le gana siempre al lanzado el día 25— y reintroduce por el mecanismo de congelado justo el error que este producto existe para corregir.

**El ranking por costo por venta existe, y va sobre la cohorte madura:** un segundo bloque, "Qué pasó con los del mes pasado", ordena los mismos segmentos por costo por venta usando la cohorte de hace un mes, medida hoy, con más de 30 días de maduración. Ese es el bloque que le habría dicho al dueño de Palavas que **no** pusiera más plata en Las Condes, y lo dice sobre datos que ya significan algo.

**Tres anuncios.** Miniatura + una línea: *"Este trajo 84 de tus 940 personas interesadas, a $1.402 cada una."* Es lo único que el cliente reconoce como suyo y lo único que le deja una tarea que él sí puede hacer (mandar a grabar tres parecidos). Se descartan los que no llegan a 500 impresiones ("con menos no tuvo oportunidad, no fracasó") y se dice cuántos corrieron en total, para que no parezca vitrina.

**Las miniaturas no se sirven ni desde el CDN de Meta ni desde una URL firmada.** Las URLs de Meta caducan; `createSignedDownloadUrl` de `lib/ad-media-storage.ts` vence en 7200 s y dejaría el documento congelado con cuadros rotos a las dos horas. Se copian al congelar a un bucket privado nuevo (`edicion-media`, ruta con UUID) mediante copiado servidor→servidor —código nuevo: el módulo actual solo sabe recibir subidas del navegador— y se sirven por `/api/e/[token]/img/[id]`, que resuelve el token, firma la URL en el servidor y hace stream. En el PDF se incrustan en el momento del render y quedan dentro del archivo.

### 2.12 · El archivo y el pie

Tira horizontal con las últimas 8 ediciones **del mismo tipo**: rango, resultado, costo por resultado, cada una enlazada a su URL congelada. Si el tenant tiene edición semanal habilitada, son **dos tiras separadas** — una mensual y una semanal —, porque "N°13 (semana, $413k)" al lado de "N°4 (mes, $1,7M)" produce exactamente la lectura errónea que todo el §4 existe para evitar.

Pie: **"Descargar esta edición en PDF"** · **"¿Dudas con esta edición? Escríbenos"** (WhatsApp directo al operador) · **"Agendar reunión"** · y una línea: *"Cubre tus anuncios de Facebook e Instagram."* — nunca la palabra "Meta" sola.

---

## 3. LA LÍNEA DE CORTE

**La regla:** el cliente ve lo que la agencia produce, y ve el conteo de lo que su propio equipo hizo con eso — **siempre rotulado con su autor y con su fecha de medición**. No ve ninguna métrica cuyo movimiento apunte al culpable equivocado, ninguna estimación, ningún dato personal, y nada sobre lo que no pueda decidir.

### Entra

| Métrica | Fuente | Por qué |
|---|---|---|
| Pauta (`spend`), separada del honorario | Meta + `tenants.fee_mensual` | Es su plata y es la escala de todo. El cliente hace la suma solo; hacerla nosotros es más barato. |
| Resultado principal de la familia declarada | `daily_snapshots_campana` (`results`, `result_type`) | Un número en la unidad del negocio, con cobertura declarada si no es todo el gasto. |
| Costo por resultado de esa familia | derivado | La única cifra de eficiencia 100% de la agencia: puja, público, creativo, presupuesto. |
| Barras semanales del mes + 6 meses de fondo | historia por campaña | Responde "¿esto va mejorando?" y "¿cómo se movió dentro del mes?". |
| Reparto por servicio/zona | árbol Meta + CRM | Lo único que **gana** al pasar del reporte interno al del cliente. |
| 3 anuncios con miniatura | `creatives.ts` + Storage propio | El cliente reconoce su video; "vid1 v2" no le dice nada. |
| Embudo de 4 conteos, dos cohortes | GHL, congelado + recontado | Entrega vs. respuesta, con su edad al lado. |
| Costo por venta | Meta ÷ CRM | Es el veredicto real. Titula el mensual cuando existe. Se ordena por él solo con cohorte madura. |
| Seguidores netos de Instagram | cron nocturno propio | Solo si HEAT hace el contenido. Una línea de texto, **nunca una caluga**. |

### Sale

| Qué | Por qué |
|---|---|
| `costoAgendaCal` | Gasto de Meta ÷ citas del CRM: **empeora cuando el cliente no contesta el teléfono, no cuando el anuncio falla**. Se amputa en el borde de entrada (`soloAgencia(node)`), no en la vista: si el campo nunca entra al objeto, no puede volver por la puerta de atrás en la versión 3. |
| `metaAgendado` / `metaSchedule` | Estimaciones del píxel. Un documento congelado que el cliente contrasta con su agenda y encuentra distinto pierde autoridad sobre todo lo demás. |
| `ventasCrm` / `totalWon` | **Todas** las ventas del período, con o sin anuncio. Poner ese número es firmar el trabajo del equipo comercial. El embudo de §2.8 solo cuenta lo atribuido. |
| `crm_stage_columns` / `_cost_` / `_rate_` | Configuración de embudo del cliente, no resultado. |
| `Person[]`, `ClientJourney`, drill-down a GHL | Nombres, correos, teléfonos de los clientes de nuestro cliente, en una URL sin login. **La edición no contiene un solo dato personal** — eso acota el radio de daño de un enlace filtrado por construcción. |
| CTR, CPM, CPC, frecuencia, clics, impresiones, alcance | La única excepción documentada —la frecuencia cuando termina en una petición— entra como **prosa** en "Qué encontramos", nunca como cifra. Impresiones sobreviven en un solo caso: cuando no hubo ningún resultado, como evidencia de que la plata se movió. |
| `firstReplies`, `deepConversations` | Parten el resultado en tres y ninguno queda grande. Sirven a un trafficker. |
| Desglose por día | Un cliente que ve caerse la línea el sábado escribe preguntando por el sábado. Sobrevive agregado por semana en el gráfico. |
| Nivel conjunto y anuncio del árbol | El cliente ve el anuncio por su miniatura o no ve nada. `FunnelTable.tsx` (735 líneas) no existe en este producto. |
| Editor del cliente (`MetricPicker`, `StagePicker`, `SettingsPanel`) | Dijo que no quiere gestionar nada. HEAT decide desde /admin. |
| Atribución, Eventos, Audiencias, Ads Manager | Plomería de agencia. Se quedan en /admin. |
| Rango libre de fechas | Solo mes cerrado (o semana cerrada donde esté habilitado). Un cliente que elige el rango puede fabricar el que lo tranquiliza o el que lo asusta. |

---

## 4. LA COMPARACIÓN

Todo el aparato existe para una cosa: **que el reporte no le enseñe al cliente a reaccionar al azar**, porque cada reacción se convierte en un cambio pedido que reinicia un aprendizaje de 48-72 h que él mismo pagó.

### 4.1 La ventana y el momento del congelado

Archivo nuevo `lib/periodo.ts` (~80 líneas, puro, con tests). Ids estables `2026-08` / `2026-W35`, resueltos a `{ desde, hasta, etiqueta, cerrado }` **en `tenant.timezone`**, no en el huso del servidor. **No se toca `lib/report-window.ts`** — lo consumen las 11 pantallas y está probado; de él se importa solo `pctDelta`.

**El período cierra el día 31; la edición se congela el día 4 y se publica el día 4.** El motivo es de código: el cron de la foto diaria **reescribe los últimos 7 días cada noche** a propósito (`lib/historia-meta.ts` pide `last_7d` y hace upsert; el docstring de `app/api/cron/snapshot/route.ts` lo dice: *"Meta ajusta las cifras de días recientes: el upsert las corrige solas"*). Congelar el día 1 captura números que el propio sistema sigue corrigiendo hasta el día 7, y entonces el panel —que sigue vivo— y la edición dicen cifras distintas del mismo gasto, con el agravante de que la edición está congelada en una URL reenviable.

- El día 4 ya pasó el reproceso por todos los días de la ventana salvo los últimos 3-4; el residuo que queda es marginal y no mueve el veredicto.
- La fila guarda `datos_al` = fecha real del último reproceso que tocó la ventana, y **esa** es la fecha que sale en la cabecera, no la de publicación.
- La semana, donde esté habilitada, se congela el jueves por el mismo motivo.

`daily_snapshots` llega hasta ayer y `historiaAlcanza()` devuelve `false` para cualquier ventana que incluya hoy: un período cerrado cae entero dentro de la cobertura y se lee de Postgres con cero llamadas a Meta. Y `last_7d` es una ventana móvil que termina en `now`: dos aperturas del mismo documento en días distintos compararían períodos distintos, que es exactamente lo que un documento no puede hacer. La ventana resuelta se **guarda junto a la edición** y nunca se recalcula al leerla.

### 4.2 La matemática — `lib/banda.ts` (nuevo, ~120 líneas, puro, con tests)

Puerto a TypeScript de `semaforo.py`, más la extensión que hoy no existe en ninguna parte:

```
banda(n)              = 1 / √n
bandaDelta(n1, n2)    = √(1/n1 + 1/n2)      ← la que se usa para comparar
```

`1/√n` de un solo período subestima la banda de una **comparación** en cerca de un 40%, y el producto cantaría "cambió" en períodos que no cambiaron — justo en la función que existe para no hacer eso.

Constantes portadas con su nombre y su motivo: `MUESTRA_MINIMA=15`, `IMPRESIONES_MINIMAS_ANUNCIO=500`, `DESVIACION_ROJA=0.30`, `EVENTOS_SALIDA_APRENDIZAJE=50`, `DIAS_MINIMOS_SIN_EDICION=7`.

Ejemplo: 20 resultados este mes contra 22 el pasado → banda del delta ±31%; una variación del 30% **no es declarable**. Con 940 mensuales la banda cae a ±4,6% y la comparación sí habla.

### 4.3 Las cuatro compuertas

Ningún porcentaje se escribe sin pasar las cuatro. Cada una que falla tiene su propio texto en castellano llano.

| # | Compuerta | Función | Falla → |
|---|---|---|---|
| 1 | **Cobertura** | `cubreDesde` / `comparableConMesAnterior` (lib/cobertura.ts) | "Es tu primera edición completa." Existe por el "↑1383%" documentado en `tests/comparacion-mes.test.ts:20`. |
| 2 | **Misma familia de resultado** | `result_type` guardado por campaña y por edición | "Cambió lo que estamos contando: antes conversaciones, ahora personas que dejan sus datos." Es el error de lectura más caro de la cartera: Palavas, $839 por conversación vs. $1.758 por lead. **Requiere la Fase 1**: sin `result_type` en la historia, la familia se adivinaría con la cascada de `notify.ts` (compras > conversaciones > leads > clics) y una sola compra atribuida por el píxel daría vuelta la unidad del documento. |
| 3 | **Sin edición estructural en medio** | `bitacora_cambios` dentro de la ventana, **fail-closed** | Con fila: "Cambiamos la campaña el 12 de agosto: estos dos meses no miden lo mismo." **Sin ninguna fila: no se declara "no hubo edición" — se declara *no verificable* y la comparación se muestra sin veredicto.** `null` es "no lo sabemos", nunca "es cero" (aprendizaje 2026-08-20). |
| 4 | **Banda de ruido** | `bandaDelta(n1,n2)` | Se muestra el número, se **suprime el veredicto**: sin flecha, sin color, sin porcentaje. Evidencia propia: el día 31 de Palavas dio +26% de CPL con banda ±27%. Ruido puro presentado como deterioro. |

### 4.4 Lo que NO se hace

**El intervalo no se muestra en pantalla.** "El costo real está entre $1.644 y $1.872" desmiente el número de portada que el cliente acaba de leer y suena a que no sabemos. La banda es un **gate**, no un adorno. El intervalo vive en un `<details>` colapsado al pie ("¿de dónde sale este número?") y en la mesa de despacho.

**No se compara contra "tu normal" de 8 períodos.** Es estadísticamente más potente y cambia la promesa comercial a "te avisamos cuando algo se sale de tu normal", que suena a menos y mueve la vara entre una edición y la siguiente. La línea base se dibuja como **franja sombreada en el gráfico**: se lee, no se cita.

**La tabla de reparto no se compara contra el período anterior.** No existe `prev` por campaña y casi ninguna campaña de esta cartera pasa el umbral de muestra en un mes. Cada fila se compara contra el **promedio de la cuenta en el mismo período** (`comparePerformance`, margen 15%), filtrado por muestra.

---

## 5. EL PDF

**Se renderiza desde el mismo JSON congelado que pintó la pantalla, nunca desde `assembleDashboard`.** No comparten ensamblador: comparten la fila exacta. Es imposible que digan cifras distintas.

**Archivo nuevo `lib/edicion-pdf.tsx` (~200 líneas). `lib/report-pdf.tsx` no se toca** y queda como el reporte técnico interno de la agencia. Razón de escribir uno nuevo en vez de parametrizar: la tabla **es** ese archivo — `CRM_HEAD = ["Agendados","Asistidos","Vendidos"]` está cableado, `tableMetricKeys` devuelve hasta 12 columnas y el `Document` se pasa a apaisado con más de 9. Parametrizarlo cuesta más que reescribirlo y arriesga la herramienta con la que la agencia trabaja hoy.

**Se copia tal cual:** la paleta `C` en hex (react-pdf no entiende variables CSS ni `oklch`), el `StyleSheet` completo, `Kpi`, `cap()`, y el pie con `render={({pageNumber, totalPages})}`. Formatos desde `lib/format.ts` con el resguardo de moneda inválida que evita la pantalla en blanco.

| | Pantalla | PDF |
|---|---|---|
| Orientación | scroll vertical | **A4 vertical, siempre** — se elimina el salto automático a apaisado. Si no cabe en vertical, sobra. El PDF es el test de minimalismo del producto entero. |
| Extensión | 1 scroll | 2 páginas (mensual) · 1 página (semanal) |
| Gráfico | SVG interactivo | **Svg/Rect/Polyline de @react-pdf 4.5.1** alimentados por `pointsFor`/`polyline`/`areaPath` de `lib/chart.ts`. ~20 líneas, cero dependencias nuevas. Hoy el PDF no tiene ningún gráfico. |
| Miniaturas | proxy `/api/e/[token]/img/[id]` | `<Image>` incrustada en el archivo al generar, con try/catch por imagen |
| Archivo | — | `reporte-clinica-palavas-agosto-2026.pdf` — el período en el nombre |

**Endpoint:** `app/api/e/[token]/pdf/route.ts`, copiado de `app/api/reporte/pdf/route.ts` con tres cambios: sale `getOperativeTenantOrNull()` y entra `tenantDeEdicion(token)`; se declara `export const maxDuration = 60` (el actual **no lo declara**, y la omisión es una bomba heredada); y el `Cache-Control` pasa a `private, max-age=31536000, immutable` — legítimo porque el archivo se genera una vez, se guarda en bucket privado con las imágenes ya incrustadas y no depende de ninguna URL firmada que venza.

**Por correo va el enlace, no el adjunto.** `sendEmail()` (lib/mailer.ts) no soporta `attachments`, el enlace es lo que el encargo pide como reporte interactivo, y un adjunto no se puede medir. El botón del PDF vive al pie: quien quiere el PDF es quien lo va a reenviar, y ya leyó el documento.

---

## 6. EL ACCESO

**URL corta, pública, permanente: `/e/<token>`.** Se pega en WhatsApp sin cortarse.

**Sin login, y la evidencia manda sobre la elegancia:** el aprendizaje del 2026-08-20 está medido — de 3 clientes con cuenta creada, 1 había iniciado sesión alguna vez y uno llevaba un mes sin entrar. Un reporte detrás de una contraseña es un reporte que no se lee. Y esquiva la limitación de `tenant_users` (PK = `user_id`): un contacto con dos negocios no puede ver los dos paneles, y con enlaces no importa.

**Token con el patrón de invitaciones, NO el de encuestas.** `nuevoToken()` (32 bytes base64url) y en la base **solo la huella SHA-256** (`huellaToken()`), ambas ya escritas en `lib/invitaciones-token.ts`. Los tokens de `client_encuestas` se guardan en texto plano y ahí lo peor que se filtra es una nota del 0 al 10; aquí se filtra la inversión y el reparto por servicio de doce negocios. Con `service_role` no hay RLS que salve: **el token es toda la frontera de aislamiento**.

**Un token por edición**, no por cliente: un enlace reenviado expone un mes, no la historia de la cuenta. Sin vencimiento (el cliente reabre la edición de hace tres meses y tiene que funcionar), revocable fila por fila desde /admin con `revocado_at`, más "revocar todos los enlaces de este cliente".

**Regla dura de código:** el token se resuelve en **una sola función**, `tenantDeEdicion(token)`, y toda lectura parte del `tenant_id` que ella devuelve. Como la edición **es** esa fila, una consulta que olvidara filtrar no tiene por dónde filtrarse a otro cliente. Es mitigación estructural, no promesa de disciplina.

**Habilitarlo:** dos strings en el array `PUBLIC` de `middleware.ts` — `"/e"` y `"/api/e"`. Test obligatorio de que el check `path === p || path.startsWith(p + "/")` no abra `/eventos`. Respuesta con `X-Robots-Tag: noindex`.

**Entrega:** el cron que ya existe. `app/api/cron/weekly/route.ts` corre los lunes, ya trae el interruptor de agencia (`decideEnvio` sobre `ajustes_heat`), las preferencias `notify_weekly`/`notify_emails` por tenant, destinatarios con respaldo a `owner_email` y bitácora en `cron_runs`. **Se reescribe su cuerpo**, no se duplica: los lunes manda el Pulso; el día 4 manda la Edición con el titular como asunto y el botón "Ver la Edición N°4". No hay dos correos con doctrinas opuestas.

**Se mide el efecto, no el intento.** La edición guarda `visto_at` y `aperturas`. En /admin se lee "abierta el martes" o "nunca la abrió" — nunca "enviada". Un cliente con cuatro ediciones y cero aperturas es una señal de churn semanas antes de la conversación de renovación. Matiz honesto: como el diseño acepta que muchos leen la tarjeta de WhatsApp sin abrir, "cero aperturas" se interpreta junto con la respuesta del cliente, no solo.

---

## 7. ARQUITECTURA

### 7.1 Se crea

```
lib/periodo.ts                     mes/semana calendario cerrado en tenant.timezone
lib/banda.ts                       banda(n), bandaDelta(n1,n2), hayCambio, constantes
lib/historia-campana.ts            escribir/leer daily_snapshots_campana
lib/familia-gasto.ts               gastoDeFamilia / resultadosDeFamilia / cobertura
lib/edicion.ts                     congelarEdicion(tenant, periodoId) — EL ensamblador
lib/edicion-cohorte.ts             conteo del CRM por cohorte + recuento del mes anterior
lib/edicion-narrativa.ts           guion determinista + reglas de redacción cableadas
lib/edicion-token.ts               tenantDeEdicion(token), nuevaEdicion()
lib/edicion-pdf.tsx                el documento
lib/edicion-media.ts               copiado servidor→servidor de miniaturas a Storage
lib/bitacora.ts                    registrar/leer cambios, candidatos automáticos, gate 3
lib/pulso.ts                       las 2-3 líneas del lunes
lib/soloAgencia.ts                 amputación del bloque híbrido en el borde de entrada

app/e/[token]/page.tsx             la página (server component, fuera de app/(panel)/)
app/api/e/[token]/pdf/route.ts
app/api/e/[token]/img/[id]/route.ts   proxy de miniaturas (firma en el servidor)
app/api/e/[token]/og/route.tsx     la tarjeta de WhatsApp
app/api/cron/edicion/route.ts      encola (sin tenant) / congela UNO (?tenant=)
app/api/cron/pulso/route.ts
app/api/admin/edicion/route.ts

components/edicion/Frase.tsx  TresNumeros.tsx  BarrasPeriodo.tsx
components/edicion/QueHicimos.tsx  Embudo.tsx  RepartoServicio.tsx  TresAnuncios.tsx
components/edicion/Archivo.tsx  EstadoSinLectura.tsx
components/admin/MesaDespacho.tsx  BitacoraForm.tsx
app/admin/ediciones/page.tsx

supabase/ediciones.sql             el DDL nuevo
supabase/daily_snapshots.sql       el DDL RECONSTRUIDO de la tabla existente
tests/periodo.test.ts  banda.test.ts  edicion.test.ts  familia-gasto.test.ts
tests/middleware-public.test.ts
```

### 7.2 Se modifica

| Archivo | Cambio |
|---|---|
| `middleware.ts` | +2 strings en `PUBLIC` + test |
| `lib/notify.ts` | `detectAlerts` recibe `n` y aplica `bandaDelta` antes de declarar variación, y no dispara si cambió la familia. **Fase 0.** Hoy dispara con umbral fijo de 0,25 sin ninguna guardia de muestra, y `/api/cron/weekly` manda ese correo cada lunes: el sistema le escribe a los clientes "el costo subió 26%" cuando es azar. |
| `lib/meta.ts` | `getDailySeriesConCuentas` pasa a `level=campaign`, `time_increment=1`, con `results` en `fields`; `DailyPoint` gana `campaignId`, `objective`, `results`, `resultType`. La agregación por tenant se conserva para quien la use hoy. |
| `lib/historia-meta.ts` | `guardarHistoria` escribe además `daily_snapshots_campana`; `+profile_visits` |
| `lib/meta-cache.ts` | `readSerieCampana()` junto a `readSeries` (que no se toca) |
| `app/api/cron/snapshot/route.ts` | precalienta también `cacheKey("custom", cuentas, {since, until})` del mes cerrado la noche del día 3; **rota el orden de los tenants por noche** (hoy recorre `listTenants()` en orden estable con presupuesto de 120 s y `break`: siempre calienta a los mismos primeros) |
| `app/api/cron/weekly/route.ts` | cuerpo nuevo (Pulso / aviso de Edición); `getDailySeries('last_14d')` en vivo → lectura de historia |
| `lib/report-data.ts` | exportar `arbolMeta` con `ttl` opcional; **eliminar `pipelines.find(...) ?? pipelines[0]` (líneas 114-119) y usar `elegirEmbudo` de lib/embudo.ts**; resolver multi-cuenta en vez de `accounts[0]` |
| `lib/tenants.ts` | +`ticket_promedio`, `fee_mensual`, `alias_publico jsonb`, `resultado_principal`, `meta_rubro`, `cadencia` |
| `app/admin/[id]/page.tsx` | monta `MesaDespacho` y `BitacoraForm` |
| `supabase/schema.sql` | referencia a los DDL nuevos |

### 7.3 Se reutiliza tal cual — no se toca ni una línea

`lib/ghl.ts` · `lib/funnel.ts` (`buildDashboard`, `sumNodes`, `costPer`, `estaCorriendo`) · `lib/cobertura.ts` · `lib/report-window.ts` (solo `pctDelta`) · `lib/dashboard-metrics.ts` (los textos `help` de las 25 métricas son el vocabulario del reporte, palabra por palabra) · `lib/insight.ts` · `lib/chart.ts` · `lib/format.ts` · `lib/resultados.ts` · `lib/stages.ts` · `lib/invitaciones-token.ts` · `lib/cron.ts` + `lib/cron-log.ts` · `lib/ajustes.ts` + `lib/avisos-clientes.ts` · `lib/mailer.ts` · `lib/roles.ts` · `lib/report-pdf.tsx` · **las 11 pantallas de `app/(panel)/`**.

El panel actual no se apaga ni se toca. Sigue existiendo para HEAT y para el cliente que quiera entrar. Lo que cambia es que ya no es el camino por el que un cliente se entera de cómo le fue.

### 7.4 Tablas de Supabase

**`daily_snapshots_campana`** *(nueva — es el corazón del cambio)*
```
tenant_id · date · campaign_id · campaign_name · objective
result_type · results · spend · impressions · clicks · currency
primary key (tenant_id, date, campaign_id)
```
Sin ella no existen `results` ni `result_type` en la historia: `daily_snapshots` guarda `spend, impressions, clicks, leads, conversations, meta_purchases` y nada más, y la serie diaria de `lib/meta.ts` pide `fields: "spend,impressions,clicks,actions"`. Con eso, la unidad del negocio solo se puede adivinar con la cascada de `notify.ts`, la compuerta 2 dispara sola, y un tenant de tráfico (resultado = `link_click`) ni siquiera se puede servir, porque `clicks` incluye reacciones y expandir la foto. `daily_snapshots` se conserva intacta: la leen `readSeries`, `admin-home` y `estado-datos`.

**`ediciones`**
```
id · tenant_id · tipo (mensual|semanal) · numero (correlativo POR TIPO por tenant)
periodo_id (2026-08) · periodo_desde · periodo_hasta · timezone
datos_al (fecha real del último reproceso que tocó la ventana)
token_hash · revocado_at
datos jsonb        cifras congeladas, serie, embudo (con oppsTotales y truncado),
                   reparto, deltas y bandas ya calculados, cohorte anterior recontada
narrativa jsonb    frase, qué hicimos, qué encontramos, qué sigue, peticiones
estado (pendiente|borrador|publicada|corregida) · corrige_a (id) · motivo_no_publicada
publicada_at · visto_at · aperturas · pdf_path · og_path
unique (tenant_id, periodo_id, tipo)
```

**`bitacora_cambios`**
```
id · tenant_id · fecha · que · motivo · visible_cliente (bool)
sin_cambios (bool) · estructural (bool) · campana_id (nullable) · autor · origen (manual|sugerido)
```
`estructural` alimenta la compuerta 3; `sin_cambios` es la única fila que autoriza la frase doctrinal de §2.7.

**DDL escrito en el repo, sin excepción — incluido el reconstruido.** `supabase/schema.sql` (93 líneas) declara 4 de las 23 tablas que el código consulta: el DDL de `daily_snapshots`, `invitaciones`, `meta_tree_cache` y `cron_runs` **se perdió** por crearse a mano en el SQL Editor. Modificar a ciegas la tabla sobre la que se apoya el producto entero es media jornada de arqueología: se reconstruye y se versiona en la Fase 1, antes de tocarla. Y se aplica el aprendizaje del 2026-08-19 completo, tabla por tabla:

```sql
grant select, insert, update, delete on public.ediciones to service_role;
grant usage, select on sequence public.ediciones_id_seq to service_role;
revoke all on public.ediciones from anon, authenticated;
```

El `revoke` no es decorativo: por los privilegios por defecto del esquema la tabla nace con `TRUNCATE` para `anon`/`authenticated`, y **`TRUNCATE` ignora RLS**.

### 7.5 El cron: fan-out, no bucle

Un solo request serial para toda la cartera no termina, y el modo de falla es silencioso: la mensual necesita el árbol de Meta (`getMetaAccounts` completo: campañas + conjuntos + anuncios con expansión de creativo, con la escalera de reintentos de `fetchAds`) más GHL (`getPipelines` + `getOpportunities` paginado + `getAppointments` por calendario), y `maxDuration = 300` no alcanza para 12 tenants. **Un timeout no lanza excepción que un `try/catch` pueda ver: mata la función entera**, así que el aislamiento por `try/catch` que existe hoy no protege de esto.

```
pg_cron (día 4, 06:00)  →  /api/cron/edicion            inserta una fila 'pendiente' por tenant elegible
pg_cron (cada 2 min)    →  /api/cron/edicion?tenant=X   congela UNO, con reintento y estado por fila
```

- `ok = ediciones_publicadas === tenants_elegibles`, y `cron_runs` lista **por nombre** los que faltaron. Cerrar con `ok: true` porque hubo filas es el mismo error que en el snapshot obligó a poner `ok = filas > 0`; aquí un 12 de 20 tiene que saltar.
- El precalentado del árbol del mes cerrado se escribe con `cacheKey("custom", cuentas, {since, until})` la noche del día 3 — **no es la clave que el nocturno escribe hoy** (`cacheKey("maximum", ...)`, sin `timeRange`), y sin ese cambio la mensual va a Meta en vivo, tenant por tenant.
- `VERSION_ARBOL` se sube a mano y apaga el caché: la mesa de despacho muestra "el reparto no se pudo calcular" **antes** de publicar, y la edición sale sin ese bloque en vez de con un bloque vacío.
- Gate con `cronAutorizado()` (CRON_SECRET, tiempo constante, fail-closed) y `abrirCorrida`/`cerrarCorrida`.
- Registrado en **pg_cron desde Supabase, NO en `vercel.json`**: tenerlo en los dos lados hizo correr todo dos veces cada madrugada, y `vercel.json` se valida contra un esquema estricto que rompe el deploy sin logs.

---

## 8. PLAN DE IMPLEMENTACIÓN

**Estimación honesta: 24 a 27 días-persona, 8 a 9 semanas de calendario.** No cabe en 4-5: la doble corrida son cuatro semanas de calendario que corren *después* de construir, y el cambio de granularidad de la historia es una fase entera, no una columna.

| Fase | Contenido | Días | Depende de |
|---|---|---|---|
| **0** | `bandaDelta` + guardia de familia dentro de `detectAlerts`. **Valor inmediato sin producto nuevo, sin tabla, sin token.** Corta desde el primer lunes las llamadas de pánico que hoy fabrica el propio sistema. | 0,5 | — |
| **1** | **Historia por campaña**: DDL reconstruido de `daily_snapshots` + `daily_snapshots_campana` · `serieDiaria` a `level=campaign` con `results` · `guardarHistoria` escribe las dos tablas · **re-backfill de 3 meses (`MESES_COMPLETOS`) × 9 tenants**, con presupuesto de tiempo propio y corrida por tenant · `+profile_visits` | 4 | 0 |
| **2** | `periodo.ts` + `banda.ts` + `familia-gasto.ts` con tests · tablas `ediciones` y `bitacora_cambios` con grants/revokes · columnas nuevas en `tenants` · fix de `elegirEmbudo` y de `accounts[0]` | 3 | 1 |
| **3** | `lib/edicion.ts` — el ensamblador. Lee la historia por campaña (cero llamadas a Meta), una pasada de `arbolMeta` desde el caché precalentado, `soloAgencia()` en el borde, congela el embudo del CRM **pasando siempre `pipelineStages`** y llevando `oppsTotales`/`truncado`, aplica las cuatro compuertas, calcula bandas, resuelve multi-cuenta (sumar si comparten moneda, sección por cuenta si no), escribe la fila. | 3,5 | 2 |
| **4** | `app/e/[token]/page.tsx` + los 9 componentes + los estados sin lectura + token + middleware + `og:image` + proxy de miniaturas. Es el grueso y es trabajo de diseño, no de datos. | 4 | 3 |
| **5** | `edicion-pdf.tsx` + endpoint + gráfico en Svg + copiado de miniaturas a Storage + PDF guardado | 2,5 | 4 |
| **6** | Cron fan-out (`pg_cron` + cola) + precalentado de la clave `custom` + Pulso semanal + correo con titular como asunto + `visto_at`/`aperturas` + mesa de despacho (previsualizar, escribir los 3 campos, publicar, revocar, ver quién abrió, avisos internos de bloqueo) | 3 | 4 |
| **7** | Cohortes del CRM: conteo congelado + recuento del mes anterior + bloque "qué pasó con los del mes pasado" ordenado por costo por venta | 2 | 3, 6 |
| **8** | Reparto por servicio con alias públicos (+ aviso "hay 3 conjuntos sin nombre público, $380.000 caerían en Otros") · 3 anuncios · edición semanal opt-in | 2,5 | 7 |
| **9** | **Doble corrida: 4 semanas de calendario** en paralelo al reporte manual sobre Palavas (volumen), Ondex o Espacio Fusión (sin gasto) y una cuenta con dos objetivos. Los estados vacíos se arreglan aquí. Pasada de redacción con Seba. | 3 | 8 |

**En paralelo, y es el cuello de botella real:** las 9 conversaciones de ticket promedio. Es trabajo de teléfono, no de código. Con la meta propuesta por rubro (§2.4.c) el producto ya dictamina sin ellas, pero el ticket real convierte una estimación de HEAT en un acuerdo del cliente. Empieza en la Fase 0.

**Regla de publicación:**

| | Pulso (semanal) | Edición (mensual) |
|---|---|---|
| Se publica | Lunes, sola | Día 4, en **borrador** |
| Firma humana | No | 3 campos, 72 h de plazo |
| Si nadie firma | — | **Se publica igual** el día 7 con el borrador de `detectAlerts`, rotulado como automático |
| Si hay bloqueo administrativo confirmado | No se manda; aviso interno | No se publica; aviso interno |
| Si el estado no se pudo confirmar | Se manda sin mencionarlo | Queda en borrador con motivo |

La prosa es lo que **mejora** el documento, nunca lo que lo bloquea. Un bloqueo administrativo sí lo bloquea, porque ahí no hay nada que entregar y sí hay una llamada que hacer.

**Corrección de erratas:** mientras `visto_at` sea `null` —nadie la abrió— la edición se **reemplaza** sin costo. Una vez abierta, se publica una **corrección** que dice qué corrige y por qué, y la vieja queda con un aviso arriba enlazando a ella. Es más caro e incómodo que arreglar un número en una pantalla, y es a propósito. El recuento de ventas **no** usa este mecanismo: es una sección fija de la edición siguiente.

---

## 9. LO QUE NO HACEMOS

| Decisión | Razón |
|---|---|
| **No se apaga ni se toca el panel actual** | Es la herramienta con la que la agencia trabaja. Todo es aditivo; el riesgo de romperla queda en cero. |
| **No hay Edición semanal por defecto** | Con 4 de 9 cuentas sin gastar, la mayoría de los lunes el documento diría "es prácticamente lo mismo" o "muestra insuficiente". Ocho documentos numerados que no concluyen enseñan a no abrir el noveno. El lunes se manda el Pulso, que sí tiene algo que decir. |
| **No se parametriza `lib/report-pdf.tsx`** | La tabla **es** ese archivo. Reusarlo hace entrar por la puerta de atrás justo las columnas que el encargo manda sacar. |
| **No se toca `lib/report-window.ts` ni `readSeries`** | Los consumen 11 pantallas probadas. `periodo.ts` y `readSerieCampana` son código nuevo con regresión imposible. |
| **No se ordena por costo por venta la tabla del mes reportado** | Con cohortes de 1 a 30 días, ese orden ordena por antigüedad. El ranking por costo por venta existe, pero sobre la cohorte madura del mes anterior. |
| **No hay comparación por campaña contra el período anterior** | `prev` por campaña no existe y casi ninguna campaña de esta cartera pasa el umbral de muestra. Construirlo es pagar días para producir ruido. |
| **No hay ranking completo de creativos con 11 columnas** | `CreativeRanking.tsx` se queda en el panel de la agencia. Al cliente van 3 anuncios con miniatura. |
| **No hay formulario dentro del documento salvo el de ticket** | Una página pública que empieza a guardar cosas deja de ser un documento. La excepción es el campo de ticket, porque es lo que convierte la meta estimada en meta acordada. |
| **No hay desglose por día ni en el gráfico** | Un cliente que ve caerse la línea el sábado escribe preguntando por el sábado. La agregación mínima es la semana. |
| **Google Ads no entra en la v1, pero entra en la v1.1** | `lib/google-ads-datos.ts` vive en un modelo paralelo (`CampanaGoogle`/`TotalesGoogle`) que jamás entra a `DashboardData`. Como el documento es congelado y cada bloque trae su propia fuente y su fecha de corte, un bloque Google de 4 cifras cuesta ~1,5 días y no exige unificar nada. Los 2 clientes que pautan en los dos canales reciben un documento que subdeclara nuestro trabajo: eso es un autogol, no una deuda técnica. Mientras tanto se declara en el pie sin rodeos. |
| **No hay rango libre de fechas ni "Máximo"** | Solo mes cerrado (o semana cerrada donde esté habilitada). |
| **No se pide el margen del cliente** | Lo declaró invasivo y tiene razón. HEAT lo estima a partir del ticket y el rubro. |
| **No se muestra el intervalo de confianza en pantalla** | La banda es un gate. El intervalo vive colapsado, para quien quiera verificar. |
| **No se automatiza la conclusión de criterio** | El árbol de diagnóstico ubica el problema, no reemplaza el juicio. El reporte de Palavas lo demuestra: el video no retenía y el árbol dictaba "mejorar el guion", pero el CTR era 3,40% y esa era la palanca equivocada. "Qué encontramos" y "Qué sigue" se **pre-rellenan y se editan**, nunca se publican como veredicto automático sin decir que lo son. |

---

## 10. RIESGOS

### Vivos y mitigados

| Riesgo | Mitigación |
|---|---|
| Meta reescribe los últimos 7 días cada noche → un congelado del día 1 se contradice con el panel el día 5 | Congelar el día 4, guardar `datos_al` y ponerlo en la cabecera. La promesa de la cabecera cubre solo lo que efectivamente no se mueve. |
| **`results`/`result_type` no existen en la historia** → la unidad del negocio se adivinaría con la cascada de `notify.ts` y se daría vuelta sola con una sola compra del píxel | Fase 1 completa: historia por campaña + re-backfill. Sin ella el gráfico y la compuerta 2 no se construyen (ver §11, pregunta 1). |
| Cuentas con dos objetivos: `sumNodes` devuelve `mixed` y `resultados = 0` | Familia declarada + gasto de esa familia + cobertura declarada en la frase; dos bloques si dos familias pasan el 25% del gasto. |
| El CRM madura después de publicar → el documento subdeclara las ventas para siempre | Dos cohortes con su edad + recuento formal del mes anterior en cada edición. |
| Cohortes inmaduras ordenando la tabla por costo por venta | El orden del mes reportado es por costo por resultado; el ranking por costo por venta usa la cohorte de +30 días. |
| **La bitácora no existe hoy y su tasa de llenado real es baja** (2 de 5 fichas con filas, ninguna con registro semanal) | Candidatos automáticos desde el diff del árbol de Meta (el operador confirma, no redacta) · el texto de respaldo **no afirma** · la compuerta 3 es fail-closed. |
| `getOpportunities` devuelve `[]` sin error con el OAuth caído → embudo de ceros que acusa al cliente | `oppsTotales` y `truncado` viajan a la fila; con 0 y embudo conectado, o con truncado, el bloque no se dibuja y dice por qué. |
| `meta_account_status` puede tener días (se escribe dentro de un `Promise.all` con `catch {}` vacío) | Con `meta_estado_at` > 24 h nunca se afirma la causa. El caso Playmaker —impago del 20-ago ya resuelto el 31— es exactamente esto. |
| El cron serial no termina con 12-20 tenants; un timeout no lo ve ningún `catch` | Fan-out: una invocación por tenant, cola en `ediciones`, `ok = publicadas === elegibles` y lista de faltantes por nombre. |
| Fallo de caché garantizado en la mensual (`maximum` vs `custom`) | Precalentado de la clave correcta la noche del día 3, con orden rotado. |
| `VERSION_ARBOL` sube a mano y apaga el reparto en silencio | La mesa de despacho lo muestra antes de publicar; la edición sale sin ese bloque. |
| Miniaturas: CDN de Meta caduca y las URLs firmadas de `ad-media-storage` viven 7200 s | Copia servidor→servidor a bucket propio + proxy que firma en cada request + imágenes incrustadas en el PDF. |
| `readSeries` se traga cualquier error y devuelve `null`; el DDL de `daily_snapshots` no está en el repo | El congelado distingue "no hay datos" de "no pudimos leerlos" y **se niega a publicar** en el segundo caso. El DDL se reconstruye y se versiona antes de tocar la tabla. |
| Tres husos horarios conviven | `periodo.ts` resuelve todo en `tenant.timezone` y la ventana se **guarda** junto a la edición. |
| PostgREST corta en 1.000 filas | Ya mordió dos veces (1.632 oportunidades de Palavas reapareciendo como leads nuevos). Toda lectura nueva que pueda pasar las mil filas se pagina o no se hace. |
| Sin RLS efectiva (`service_role`), el token es toda la frontera | Resolución en una sola función; la edición **es** la fila. El documento no contiene un solo dato personal: el radio de daño de un enlace filtrado es un mes de gasto publicitario del propio cliente. |
| `alias_publico` se degrada (campañas nuevas caen en "Otros") | Aviso en la mesa de despacho con el monto que caería. |
| El correo semanal actual y la Edición mandarían doctrinas opuestas | El cron weekly no se duplica: se reescribe. |

### Sin solución, y hay que decirlo

**1. La atribución del CRM puede estar contaminada, y ningún código de reportería lo arregla.** Se hicieron disparos masivos por WhatsApp API al mismo segmento de depilación Las Condes del que el reporte dice "80 interesados, 1 venta", con 1.000 envíos más programados. Queda abierto si el panel atribuye las etapas solo a contactos cuyo origen es ese anuncio o a cualquiera que coincida. Si contactos del disparo entraron al mismo pipeline, el embudo de §2.8 está inflado. Es investigación sobre `lib/funnel.ts` y GHL, no una decisión de diseño. Ver §11, pregunta 2.

**2. Falta confirmar si las etapas del pipeline son "actual" o "alcanzada".** `bucketForStage` clasifica por la etapa actual y `buildDashboard` suma hacia atrás (agendado incluye asistió y vendido). Verificar contra GHL antes de dibujar el primer embudo: cambia el total que ve el cliente.

**3. Sin ticket real, el veredicto es contra una meta que puso HEAT.** El producto dictamina desde la N°1, pero está dictaminando contra su propia estimación. Es un límite de información; lo cierran nueve llamadas telefónicas, no más diseño.

**4. La parte más valiosa sigue dependiendo de que alguien la escriba.** El valor del reporte de Palavas no estuvo en las tablas: estuvo en tres frases de criterio, y una fue "el problema no es la publicidad, es lo que pasa después". El 80% del documento se genera solo; ese 20% no. La mitigación no es automatizar el párrafo —eso produce criterio falso con tono de certeza— sino que el documento se publique igual sin él, rotulado, y sea peor.

---

## 11. DECISIONES ABIERTAS

Cinco preguntas que solo Seba puede responder. Cada una cambia el diseño según la respuesta.

**1. ¿Pagamos la Fase 1 (historia por campaña + re-backfill: 4 días, más llamadas a Meta cada noche), o recortamos el alcance de la v1?**

| Opción | Qué se obtiene | Qué se pierde |
|---|---|---|
| **A. Pagarla** *(supuesto del plan)* | Unidad del negocio real, gráfico de 8 tramos, compuerta 2 funcionando, costo por familia | 4 días y una foto nocturna más cara |
| B. v1 sin historia por campaña | 4 días menos, entrega antes | Sin gráfico, sin comparación de costo, la unidad solo se puede leer en el bloque mensual del árbol; la portada tendría que decir "gasto y volumen" sin costo por resultado |
| C. Backfill de 1 mes en vez de 3 | ~1,5 días menos | La primera edición no tiene con qué comparar y sale marcada como "primera edición completa" |

**2. ¿Publicamos el bloque de CRM (§2.8) antes de resolver la contaminación por los disparos masivos de WhatsApp?**

| Opción | Consecuencia |
|---|---|
| A. No publicarlo hasta poder excluir por origen | La v1 no titula con costo por venta y el cliente vuelve a preguntar por teléfono cuántos pacientes llegaron |
| B. Publicarlo rotulado: "cuenta a todas las personas que entraron al CRM en este período por cualquier vía" | Sale completo, pero el embudo puede estar inflado y el cliente lo va a notar antes que nosotros |
| C. Publicarlo solo para los clientes sin campañas de mensajería masiva | Producto desparejo entre clientes, y hay que decidir quién es cuál a mano |

**3. ¿La meta por rubro que propone HEAT (§2.4.c) se publica sin confirmación del cliente?** Es lo que permite dictaminar desde la Edición N°1, y es también un compromiso escrito y congelado.

- A. Sí, con el texto "así trabajamos en tu rubro; corrígela si tu ticket es distinto".
- B. Sí, pero solo en verde/rojo cualitativo, sin publicar la cifra de la meta.
- C. No: sin ticket confirmado la edición describe y no dictamina (vuelve al 📋 provisional de la v1 anterior).

**4. ¿Los honorarios (`fee_mensual`) entran en la frase de portada?**

- A. Sí, siempre: "cada persona interesada te costó $2.410 con nuestros honorarios". Es la resta que el cliente hace igual, y hacerla nosotros compra credibilidad.
- B. Solo en la línea gris secundaria, no en el titular.
- C. No aparece: el documento habla de pauta y el honorario se conversa aparte.

Afecta también al costo por venta del titular mensual, que hoy está definido como pauta + honorarios.

**5. ¿El enlace queda público sin ninguna barrera, sabiendo que la edición mensual lleva el reparto de gasto por servicio y por sucursal?**

| Opción | Costo |
|---|---|
| **A. Público, como está diseñado** | Un reenvío en un grupo de WhatsApp le muestra a la competencia cuánto pone el cliente en cada servicio |
| B. Código de 4 dígitos solo para el bloque de reparto (el resto abierto) | Una fricción chica en el bloque que más se reenvía; hay que decidir cómo se lo mandamos |
| C. Reparto por servicio solo en el PDF, no en la página pública | La página pierde el bloque que más le sirve al dueño |

---

*Nota de alcance: el encargo pedía reportes "semanales o mensuales" comparables semana a semana. Este blueprint entrega la comparación semana a semana dentro de la Edición mensual (gráfico de §2.6) y el Pulso semanal como parte de avance, en vez de un documento numerado cada lunes. Si la promesa comercial que Seba ya hizo a algún cliente es "reporte semanal", la Edición semanal opt-in de §2.0 cubre ese caso sin cambiar el resto del diseño.*