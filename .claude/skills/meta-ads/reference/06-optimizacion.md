# 06 — Optimización: las 3 Q's

> **La impaciencia es el enemigo #1 al hacer anuncios.**
>
> **Revisa** tus campañas a diario para asegurarte de que están andando sin problemas,
> pero **optimízalas cada 5-7 días.**

Analizar campañas puede ser intimidante. El método elimina la intimidación reduciendo
todo a tres preguntas en orden. **Nunca saltes de la 1 a la 3.**

---

## Antes de las 3 Q's: solo 3 métricas importan

Si el objetivo es **vender**, solo tres métricas deciden algo:

1. **Importe gastado**
2. **Resultados** (compras / leads / conversaciones)
3. **Costo por resultado** ← el que manda

Para tiendas online se agregan dos: **valor de conversión de compras** y **ROAS**.
Todo lo demás es secundario: sirve para *diagnosticar*, nunca para *decidir*.

### ⚠️ CPC y CPM son engañosas — con datos que lo prueban

Es el error de lectura más común, y hay evidencia dura en contra:

| Anuncio | CPC | Costo por compra |
|---|---|---|
| A | **US$2,34** (el más alto) | **US$21,70** (el más bajo) |
| B | **US$0,79** (el más bajo) | **US$32,00** (el más alto, y peor ROAS) |

El estudio *"3 Facebook Metrics That Matter"*, basado en **más de US$100 millones**
invertidos, demostró que prácticamente **no existe relación entre el CPC y el ROAS**, y
que el CPM tampoco se relaciona con ventas ni con retorno. Lo mismo se verificó en
campañas de Mensajes (dos anuncios con costo por resultado casi idéntico pese a que uno
tenía CPC 3× más alto) y de Clientes Potenciales.

> **No es la cantidad de tráfico, es la calidad.** Un CPC alto puede significar que
> estás comprando la atención de gente que sí compra.

**Cómo se concilia con el árbol de diagnóstico de más abajo:** CPM y CPC son entradas
de diagnóstico, **nunca veredictos**. Si el costo por resultado está bien, un CPM alto
no es un problema. Solo se miran cuando el costo por resultado ya está mal.

---

## Las 5 métricas personalizadas

Se crean en **Administrador de anuncios → Columnas → Personalizar columna → Crear
métrica personalizada**. Son las que convierten la Q2 en algo medible de verdad.

| # | Métrica | Fórmula | Formato |
|---|---|---|---|
| 1 | **Tasa de conversión** | *Ventas web:* Compras ÷ Visitas a la página de destino<br>*Leads:* Clientes potenciales ÷ Clics únicos en el enlace<br>*Mensajes:* Conversaciones iniciadas ÷ Clics únicos en el enlace | Porcentaje |
| 2 | **Ticket promedio** | Valor de conversión de compras ÷ Compras | **Divisa** |
| 3 | **Calidad de clics** | Visitas a la página de destino ÷ Clics en el enlace | Porcentaje |
| 4 | **Captura del video** | Reproducciones de video de 3 seg ÷ Impresiones | Porcentaje |
| 5 | **Retención del video** | ThruPlays ÷ Impresiones | Porcentaje |

*ThruPlay = 15 segundos de video (o el video completo si dura menos de 15 seg).*

### Umbrales y qué hacer con cada una

| Métrica | Umbral | Si está baja |
|---|---|---|
| **Captura del video** | **>25-30%** es bueno | **Cambia solo el principio**, no todo el video. Nada de introducciones lentas: al punto desde el primer segundo. |
| **Retención del video** | **≥5%** es positivo | Mejorar guion y edición. Siempre es menor que la captura. |
| **Calidad de clics** | — | Optimiza la **velocidad del sitio**: reduce el peso de las imágenes, quita plugins innecesarios. |
| **Tasa de conversión (leads)** | — | Revisa las **preguntas del formulario**: pides demasiado, o no se entiende por qué llenarlo. |

> "Captura del video" es la métrica que mide **si el gancho funciona**, y es la que
> conecta directamente con los hooks de `04-creativos.md`.

---

## Las 3 Q's

### 1. ¿Qué pasó? → Métricas principales
Los números del resultado. Te dicen **si** hay un problema, no cuál.

### 2. ¿Por qué pasó? → Métricas secundarias
Los números del proceso. Te dicen **dónde** está roto.

### 3. ¿Qué haremos al respecto? → Optimizaciones
La acción concreta, derivada del punto 2.

---

## Aplicación a campañas de Interacción / Mensajes

Es el caso más común en LATAM (WhatsApp, DM). Ejecutable:
`scripts/diagnostico.py --tipo mensajes`.

### Q1 · ¿Qué pasó? (métricas principales)

1. **Importe gastado**
2. **Conversaciones**
3. **Costo por conversación**

> Estas tres solas no dicen qué hacer. Si el costo por conversación está alto, todavía
> no sabes si el problema es el gancho, el arte, el público o el destino.

### Q2 · ¿Por qué pasó? (métricas secundarias)

1. **Tasa de conversión a Mensajes**
2. **CTR único (enlace)**
3. **Porcentaje de reproducciones de video de 3 segundos**
4. **Tiempo promedio de reproducción de video**
5. **Frecuencia**
6. **CPM**

### Q3 · ¿Qué haremos al respecto? (optimizaciones)

| # | Métrica secundaria | Umbral | Acción |
|---|---|---|---|
| 1 | Tasa de conversión a Mensajes | **< 50-60%** | Ser más específico en **"chatear con la empresa"** (el texto y la promesa del destino) |
| 2 | CTR único (enlace) | **< 2%** | **Mejorar anuncios** |
| 3 | % de reproducciones de video de 3 seg | **< 20-25%** | **Mejorar ganchos** |
| 4 | Tiempo promedio de reproducción de video | **< 5-7 segundos** | **Mejorar guiones y edición** |
| 5 | Frecuencia (últimos 7 días) | **> 3-5** | **Agregar nuevos anuncios** |
| 6 | CPM | alto | **Usar públicos más grandes y mejorar anuncios** |

---

## Cómo leer el árbol de diagnóstico

Las 6 métricas están ordenadas como el recorrido real del usuario. Lee de arriba hacia
abajo y **detente en la primera que falle** — arreglar lo de más abajo sin arreglar lo
de arriba no sirve.

```
CPM alto ─────────────► público muy chico o anuncio de baja calidad
   │
   ▼
Retención 3s baja ────► el HOOK no detiene el scroll
   │
   ▼
Tiempo prom. bajo ────► el GUION y la EDICIÓN no sostienen
   │
   ▼
CTR único bajo ───────► el ANUNCIO no genera ganas de dar el paso
   │
   ▼
Tasa a mensajes baja ► la PROMESA del destino no coincide con el anuncio
   │
   ▼
Frecuencia alta ──────► el público YA VIO todo: fatiga, hay que renovar
```

**Frecuencia es la métrica de vencimiento.** Sube siempre con el tiempo. Cuando cruza
3-5 en los últimos 7 días, el creativo ya no es el problema: el problema es que ya no
queda gente nueva viéndolo. La solución es **agregar anuncios nuevos**, no bajar el
presupuesto.

**CPM es la métrica de contexto.** Un CPM alto puede ser: público demasiado estrecho,
mucha competencia en esa fecha (ver `08-calendario-mkt.md`), o un anuncio con mala
señal de calidad. Se ataca por dos vías a la vez: **públicos más grandes** y **mejores
anuncios**. Pero recuerda la advertencia de arriba: **el CPM no decide nada por sí
solo.**

### Frecuencia — los números finos

| Referencia | Valor |
|---|---|
| **Óptima** | **1,5 – 3,0** impactos por persona a la semana |
| **Límite operativo** | mantener **< 5** en los últimos 7 días |
| **Qué pasa al superar 5** | el CPA sube desproporcionadamente y el **CTR cae ~40%** |

Caso real de público quemado: frecuencia **11,13** en 7 días → el ROAS histórico de 4,5
cayó a 2,26 en 30 días y a 1,97 en la última semana.

> **No confíes ciegamente en la alerta de la plataforma.** Hay casos documentados donde
> Meta muestra aviso de saturación con la frecuencia real entre **1,68 y 2,36**.
> Verifica el número antes de tocar nada.

**Las 4 acciones contra la fatiga**, en orden:
1. **Agregar contenido nuevo** — textos, imágenes y videos (escalar horizontalmente).
2. **Ampliar el público** — la fatiga golpea primero a los públicos chicos, o sea al
   remarketing. Si sigues a visitantes web de 7 días, extiende a 30.
3. **Redistribuir el presupuesto** — bajar el de las campañas con públicos chicos y
   moverlo a las de públicos grandes.
4. **Probar otro objetivo de campaña** — si usas Ventas, prueba Ventas del Catálogo; si
   recolectas contactos, combina con Clientes Potenciales; si no tienes sitio web,
   Mensajes o WhatsApp.

### ⚠️ Nunca pauses un anuncio por su gasto bajo

Meta reparte el presupuesto de forma deliberadamente desigual y a veces le da **más
dinero al anuncio de peor ROAS** porque es el más escalable. Evalúa el conjunto
**globalmente**. Concentrar el presupuesto en el anuncio de mejor ROAS puntual hace
**caer** el ROAS general (de 4,2 a 3 o 2,5 en el caso documentado). Es el **efecto
desglose** — ver `12-andromeda-y-diversidad-creativa.md` §3.

---

## Adaptación a otros objetivos

El método es el mismo; cambia la métrica principal y la última secundaria.

| Objetivo | Q1 — Métricas principales | Q2 — Última métrica del proceso |
|---|---|---|
| **Mensajes / Interacción** | Gasto · Conversaciones · Costo por conversación | Tasa de conversión a mensajes |
| **Compras (sitio web)** | Gasto · Compras · Costo por compra · ROAS | % de visitas a la LP → % de compras |
| **Clientes Potenciales (Meta)** | Gasto · Clientes potenciales · Costo por lead | Tasa de conversión del formulario |
| **Clientes Potenciales (web)** | Gasto · Clientes potenciales · Costo por lead | % de visitas → tasa de conversión de la LP |
| **Alcance / Video** | Gasto · Alcance · Costo por mil · Thruplays | Frecuencia · Costo por Thruplay |

Las métricas 2-5 de Q2 (retención 3s, tiempo promedio, CTR, frecuencia, CPM) **aplican
igual en todos los casos**. Solo cambia el último eslabón.

---

## Benchmarks de contexto (2026)

Los umbrales del curso son **tus cortes de decisión** y no cambian. Estos números son
otra cosa: sirven para saber si tu cuenta está en el rango del mercado o si tienes un
problema estructural. **No los uses como objetivo** — tu objetivo sale de
`05-presupuesto.md`, de tu ticket y tu margen.

### Medianas generales

| Métrica | 2025 | 2026 | Variación |
|---|---|---|---|
| CPM | $11,82 | **$14,19** | +20% |
| CPC | $0,70 | **$0,78** | +11% |
| CPA | $27,66 | **$38,19** | +38% |
| CTR (mediana) | — | **~2,2%** | — |

> **La lectura importante:** el costo de la publicidad en Meta subió fuerte. Una cuenta
> que "empeoró" respecto al año pasado puede estar simplemente al día con el mercado.
> Compara siempre contra tu CPA objetivo, no contra tu histórico.

### Por etapa del ciclo

| | Presentación (frío) | Evaluación (tibio) | Conversión (caliente) | Ascensión |
|---|---|---|---|---|
| **CPM** | $10-15 | $6-12 | ~$8,4 | — |
| **CTR** | 0,9-1,5% | 1,5-3,0% | 2,0-4,0% | 2,0-5,0% |
| **Tasa de conversión** | 0,4-1,5% | 2-7% | 5-12% | 10-20% |
| **ROAS** | 1-3× | 3-6× | 4-10× | 5-10×+ |
| **Frecuencia** | — | máx. 3-4/sem | 3-4/sem (5-7 alta intención) | — |

Esto explica por qué el curso pone el umbral de CTR en 2%: es el corte razonable en
frío. **En retargeting, un CTR de 2% es mediocre, no bueno** — ahí deberías estar sobre
3%. Ajusta el umbral según la etapa que estés mirando.

### Dos advertencias sobre estos números

1. **Los benchmarks públicos varían muchísimo entre fuentes** (hay reportes de CPC
   medio de $0,78 y de $1,72 el mismo año, según metodología y mix de industrias).
   Úsalos como orden de magnitud, nunca como veredicto.
2. **El ROAS del retargeting está inflado.** El impacto incremental real se estima en
   solo el **20-40%** de lo que muestra el panel: buena parte de esa gente iba a
   comprar igual. Es la razón numérica por la que el 60% del presupuesto se queda en
   Presentación.

---

## Reglas de optimización

1. **Cada 5-7 días.** Si la última edición fue hace 2 días, la respuesta correcta es
   "espera", no una optimización.
2. **Un cambio a la vez por conjunto.** Si cambias público y creativo el mismo día, no
   vas a saber cuál funcionó.
3. **Apaga por evidencia, no por impaciencia.** Un anuncio necesita suficientes
   impresiones antes de juzgarlo. Con 200 impresiones no hay conclusión.
4. **Si Q2 está sana y Q1 está mal, el problema está fuera de Meta.** Buen CTR, buena
   retención, buena tasa a mensajes, y aun así no hay ventas → el problema es el
   cierre, el precio, la oferta o el checkout. Ver `04-creativos.md` §4.
5. **Documenta cada optimización.** Fecha, qué se cambió, por qué, y qué métrica se
   esperaba mover. Sin bitácora, cada semana se empieza de cero.
6. **No busques el hack.** El trafficker principiante cree que la clave está en el
   último truco. La clave está en repetir este ciclo de diagnóstico con disciplina.

---

## Plantilla de reporte de optimización

```
FECHA: ____  ·  CAMPAÑA: ____  ·  ETAPA DEL CICLO: ____
DÍAS DESDE LA ÚLTIMA EDICIÓN: ____   (si < 5, NO optimizar)

Q1 — ¿QUÉ PASÓ?
  Gasto: ____   Resultados: ____   Costo por resultado: ____
  vs. objetivo (de 05-presupuesto): ____

Q2 — ¿POR QUÉ PASÓ?
  Retención 3s: ____ %      (umbral 20-25%)
  Tiempo prom. video: ____s (umbral 5-7s)
  CTR único enlace: ____ %  (umbral 2%)
  Tasa a mensajes: ____ %   (umbral 50-60%)
  Frecuencia 7d: ____       (umbral 3-5)
  CPM: ____

Q3 — ¿QUÉ HAREMOS?
  Primera métrica que falla (de arriba abajo): ____
  Acción: ____
  Métrica que esperamos mover: ____
  Revisión: en 5-7 días (____)
```
