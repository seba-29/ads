# 06 — Optimización: las 3 Q's

> **La impaciencia es el enemigo #1 al hacer anuncios.**
>
> **Revisa** tus campañas a diario para asegurarte de que están andando sin problemas,
> pero **optimízalas cada 5-7 días.**

Analizar campañas puede ser intimidante. El método elimina la intimidación reduciendo
todo a tres preguntas en orden. **Nunca saltes de la 1 a la 3.**

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
anuncios**.

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
