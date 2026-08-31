---
name: reportes-y-optimizacion
description: Ciclo recurrente de medición, reporte y optimización de una CARTERA de cuentas publicitarias (Meta Ads y Google Ads). Úsala siempre que el usuario quiera revisar cómo van las campañas, sacar métricas, armar el reporte semanal o mensual de un cliente o de todos, decidir qué optimizar esta semana, saber a qué cuenta hay que meterle mano primero, evaluar si ya se puede escalar o lanzar campañas nuevas, o dejar registro de lo que se cambió. Se activa con - "cómo van las campañas", "sacar métricas", "hacer el reporte", "reporte semanal/mensual", "reporte para el cliente", "revisar la cuenta", "qué optimizamos", "qué sigue", "ya llevamos X semanas corriendo", "análisis de resultados", "cómo va el mes", "rendimiento de la cartera", "revisemos todos los clientes", "está funcionando o no", "vale la pena seguir invirtiendo", "cuánto llevamos gastado", "bitácora", "qué cambiamos la semana pasada". Cubre la cadencia (qué se mira a diario vs. cada 5-7 días vs. cada mes), el triage de qué cuenta se toca primero, la extracción de datos del conector de Meta y de Google Ads, el umbral de muestra mínima para que un número signifique algo, el veredicto contra el CPA objetivo, el reporte que ve el cliente (distinto del interno) y la bitácora. Complementa a `meta-ads`: aquella aporta el criterio de diagnóstico de UNA campaña, esta aporta el ciclo sobre TODAS. Úsala aunque el usuario no diga la palabra "reporte".
---

# Reportes y optimización — el ciclo de la cartera

`meta-ads` responde *"¿qué le pasa a esta campaña?"*. Este skill responde
*"¿qué hago el lunes con nueve cuentas?"*.

Son problemas distintos. El primero es de diagnóstico y ya está resuelto en
`meta-ads/reference/06-optimizacion.md`. El segundo es de **asignación de atención**:
tienes tiempo finito, la mayoría de las cuentas no necesita que las toques, y tocarlas
igual cuesta dinero. Este documento es el sistema para decidir dónde mirar.

---

## Ley 0 heredada, y por qué aquí pesa más

De `meta-ads`: **revisa a diario, optimiza cada 5-7 días.**

En una cartera esa ley se rompe por una vía distinta a la de una cuenta sola. Con un
cliente, el riesgo es la impaciencia. Con nueve, el riesgo es **la culpa**: sientes que
si abriste la cuenta y no cambiaste nada, no trabajaste. Y entonces mueves un
presupuesto "para que se note".

No tocar una cuenta que está dentro de objetivo **es** el trabajo. Es la decisión de no
reiniciar un aprendizaje que ya se pagó. Escríbelo en la bitácora como una decisión
—"revisado, dentro de rango, no se interviene"— y deja de sentirlo como pereza.

---

## Las tres reglas que hacen honesto un reporte

Casi todos los reportes de agencia mienten sin querer, y siempre por una de estas tres.
Antes de escribir un número en ningún lado, verifica las tres.

### 1. Un número sin objetivo no es un resultado, es trivia

"Costo por lead: $3.400" no dice nada. Solo significa algo contra el **CPA objetivo**,
que sale del ticket promedio y el margen del cliente (`meta-ads/05-presupuesto.md`).

Si la ficha del cliente **no tiene ticket ni margen**, no inventes el objetivo y no lo
sustituyas por un benchmark de mercado disfrazado de meta. Lo correcto es marcar la
lectura como **provisional** y decir explícitamente qué falta. Un reporte que dice
"vamos bien" sin saber cuánto vale un cliente para el negocio es una opinión con
formato de informe.

### 2. Un número sin muestra suficiente es ruido con decimales

El costo por resultado de una ventana con 4 conversiones puede variar 50% por azar. Si
lo comparas con el de la semana pasada y "subió 30%", no descubriste nada: leíste la
varianza.

La regla operativa, y de dónde sale: el error relativo de un conteo escala como
**1/√n**. Con 15 resultados el ruido ronda ±26%; con 50, ±14%. Por eso:

| Qué quieres leer | Muestra mínima en la ventana | Por qué |
|---|---|---|
| **Costo por resultado** | **≥ 15 resultados** (sólido desde 25-30) | Debajo de 15 el ruido se come cualquier diferencia menor a 30% |
| **CTR, retención de video** | **≥ 1.000 impresiones** por anuncio | |
| **Apagar un anuncio por rendimiento** | **≥ 500 impresiones** | Con menos no tuvo oportunidad, no fracasó |
| **Frecuencia** | sin mínimo | Es acumulativa, se lee siempre |

`scripts/semaforo.py` calcula la banda de ruido y **se niega a dar veredicto dentro de
ella**. Úsalo en vez de comparar a ojo.

### 3. Si la atribución está rota, los números del panel no son los del negocio

Antes de interpretar nada, revisa cómo llega el dato:

- **WhatsApp / CTWA** → ¿hay `ctwa_clid` + API de Conversiones? Sin eso Meta optimiza
  hacia quien escribe, no hacia quien compra (`meta-ads/13-whatsapp-latam.md` §11).
- **Landing propia** → ¿el píxel dispara y se deduplica con CAPI por `eventID`?
  ¿Llegan `fbclid`/`_fbc`? ¿Se guarda el `gclid` para Google?
- **Formulario nativo de Meta** → el lead es real, pero el panel **no sabe** cuántos
  cerraron. La tasa lead → venta la tiene el cliente, no la plataforma.

Cuando la atribución está rota, eso **es el titular del reporte**, no una nota al pie.
Reportar un CPA calculado sobre datos que no se pueden conciliar es el error más caro
de todos, porque encima se usa para tomar decisiones de presupuesto.

---

## El ciclo, de arriba hacia abajo

| Cadencia | Qué se hace | Cuánto toma | Detalle |
|---|---|---|---|
| **Diario** | Chequeo de signos vitales. ¿Gasta? ¿Está aprobado? ¿La cuenta está al día? **No se optimiza.** | 10 min toda la cartera | `01-cadencia-y-triage.md` §1 |
| **Cada 5-7 días** | Triage + diagnóstico de las que califican + un cambio por conjunto | 1-2 h | `01` §2, `03`, `04` |
| **Mensual** | Reporte al cliente + decisión de escalar o no | 1 h por cliente | `05-reporte-al-cliente.md` |
| **Al cerrar cada cambio** | Bitácora en la ficha del cliente | 2 min | §Bitácora, abajo |

### Los 6 pasos de la ventana de optimización

1. **Estado y bloqueos** — ¿la cuenta está activa y al día? Una cuenta impaga o sin
   material no tiene un problema de optimización; tiene un problema de gestión. Sale
   del reporte de rendimiento y entra al de bloqueos. No pierdas la ventana ahí.
2. **Extraer** — datos crudos, campos exactos y ventanas comparables:
   `02-extraccion-de-datos.md`.
3. **Triage** — repartir la cartera en cajones y decidir a quién le tocas:
   `01-cadencia-y-triage.md` §2.
4. **Veredicto** — contra el objetivo, con la banda de ruido: `03-veredicto.md` +
   `scripts/semaforo.py`.
5. **Diagnosticar y actuar** — solo sobre las que califican. El árbol de las 3 Q's vive
   en `meta-ads/06-optimizacion.md`; ejecútalo con
   `meta-ads/scripts/diagnostico.py`. Qué acción corresponde a cada hallazgo:
   `04-catalogo-de-acciones.md`.
6. **Registrar** — bitácora. Sin esto la próxima ventana arranca de cero.

Para Google Ads, los pasos son los mismos y cambian las métricas y las trampas:
`06-google-ads.md`.

---

## Antes de la primera vuelta: el paso 0

La primera vez que se corre este ciclo sobre una cartera, casi siempre falta la mitad
de las fichas. Es normal y no bloquea la extracción — bloquea el **veredicto**.

Haz esto una sola vez por cliente y queda para siempre:

1. **Los tres números.** Ticket promedio, margen, meta de ventas mensual. De ahí sale
   el CPA objetivo con `meta-ads/scripts/presupuesto.py`. Sin ellos todo veredicto
   queda marcado como provisional.
2. **La tasa de cierre lead → venta.** La tiene el cliente. Si no la mide, el estándar
   del método es 5%, declarado como supuesto.
3. **El estado real de la medición.** Píxel, CAPI, `ctwa_clid`, `gclid`.
4. **Fecha de arranque de cada campaña y última edición.** Sin esto no sabes si "tres
   semanas de datos" son tres semanas de señal o un aprendizaje de tres días.

Pedirlos es parte del reporte, no un trámite previo. La sección *"Qué necesitamos de
ti"* de `05-reporte-al-cliente.md` existe exactamente para eso.

---

## Cuándo se puede lanzar campañas nuevas o escalar

El usuario suele pedir "los siguientes pasos para crear más campañas" en la misma frase
en que pide el reporte. Son cosas distintas y el orden importa: **escalar amplifica lo
que hay**. Si lo que hay está en amarillo, escalarlo multiplica el problema.

La puerta se abre solo con las tres condiciones juntas:

1. La cuenta está en **verde** contra su objetivo (no contra su propio histórico).
2. Hay **muestra suficiente** — la regla de las ≥15 conversiones, no 3 leads con suerte.
3. Hay **material creativo nuevo** para sostenerlo. Escalar sin creativos frescos solo
   adelanta la fatiga.

Cumplidas las tres, el cómo está en `meta-ads/07-escalamiento.md` (§4 tiene el
checklist previo). Si falla alguna, la respuesta al cliente no es "no", es **"todavía
no, y esto es lo que falta"** — con la condición nombrada.

---

## Bitácora: por qué es la mitad del valor del skill

Cada ficha en `clientes/` tiene una tabla de bitácora. Llénala en la misma sesión en
que haces el cambio, no después.

| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 2026-08-31 | Subí presupuesto del conjunto Frío de $8k a $12k/día | CPL bajo objetivo 3 ventanas seguidas y frecuencia 1,8 | CPL se mantiene ≤ $3.000 con más volumen | *(en 7 días)* |

Dos razones por las que esto no es burocracia:

- **La columna "Resultado" es la única forma de aprender.** Sin ella repites el mismo
  cambio en la misma cuenta cada dos meses sin saber que ya no funcionó.
- **"Días desde la última edición" sale de acá**, y es el dato que decide si esta
  ventana se puede optimizar o hay que esperar. La plataforma no te lo muestra fiable.

Al abrir cualquier cuenta, **lee su bitácora antes que sus métricas.** Un CPA que subió
30% significa una cosa si nadie tocó nada, y la contraria si el martes le cambiaste el
público.

---

## Archivos de este skill

| Archivo | Cuándo leerlo |
|---|---|
| `reference/01-cadencia-y-triage.md` | Cada ventana. Los cajones y a quién se toca |
| `reference/02-extraccion-de-datos.md` | Al bajar datos. Campos exactos y ventanas |
| `reference/03-veredicto.md` | Al convertir números en juicio |
| `reference/04-catalogo-de-acciones.md` | Al decidir qué cambiar, y qué NO tocar |
| `reference/05-reporte-al-cliente.md` | Al escribirle al cliente. Tono y estructura |
| `reference/06-google-ads.md` | Si la cuenta es de Google |
| `scripts/semaforo.py` | Siempre que compares costo por resultado |
| `plantillas/` | Reporte interno y reporte al cliente, listos para llenar |

**No dupliques `meta-ads`.** El diagnóstico de una campaña, los umbrales de las 3 Q's,
el cálculo de presupuesto y el escalamiento viven allá. Este skill decide *cuándo* y
*sobre quién* se aplican, y qué se le cuenta al cliente después.
