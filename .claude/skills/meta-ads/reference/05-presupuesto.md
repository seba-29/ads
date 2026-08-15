# 05 — Presupuesto, CPA objetivo y ROAS

Antes de decidir creativos o públicos: **¿los números dan?** Si el CPA objetivo que
sale de esta cuenta es imposible para el mercado, el problema no son los anuncios —
es la oferta, el ticket o el margen.

Herramienta ejecutable: `scripts/presupuesto.py`.

---

## 1. Calculadora de presupuesto — negocio de venta directa

### Paso 1 — ¿Cuánto quieres vender?

```
Número de ventas necesarias = Meta de ventas ÷ Ticket promedio
```

### Paso 2 — ¿Cuánto estás dispuesto a invertir por cliente?

```
Costo por Compra Objetivo (CPA) = Ticket promedio × % de margen a invertir
Inversión Necesaria             = Meta de ventas × % de margen a invertir
ROAS Objetivo                   = Meta de ventas ÷ Inversión Necesaria  ( = 1 ÷ % )
```

### 🚨 Aclaración crítica sobre el "% de margen"

> El % de margen **no tiene que ser todo tu margen de utilidad**, sino el % que estás
> dispuesto a invertir para adquirir un nuevo cliente.
>
> Ejemplo: si tu margen es del **35%** pero quieres ganar mínimo el **15%** de
> utilidad, el % que estás dispuesto a invertir es el **20%**.

Este es el error más común al calcular presupuesto: la gente usa el margen completo,
descubre que "el ROAS da", y termina vendiendo sin ganar nada.

### Ejemplo trabajado

| Dato | Valor |
|---|---|
| Meta de ventas | $20.000 |
| Ticket promedio | $50 |
| **Ventas necesarias** | **400** |
| % dispuesto a invertir | 16% |
| **CPA objetivo** | **$8** |
| **Inversión necesaria** | **$3.200** |
| **ROAS objetivo** | **6,25** |

Ese ROAS de 6,25 es el número contra el cual se juzga toda la cuenta. No contra el
ROAS "de la industria".

---

## 2. Calculadora para Interacción / Clientes Potenciales / Mensajes

Cuando la conversión no ocurre en el sitio sino en una conversación (WhatsApp, DM,
formulario), hay un paso intermedio: el lead.

```
Ventas necesarias        = Meta de ventas ÷ Ticket promedio
CPA objetivo             = Ticket promedio × % a invertir
Costo por Lead objetivo  = CPA objetivo × % de conversión de leads a venta
Inversión necesaria      = Meta de ventas × % a invertir
ROAS objetivo            = Meta de ventas ÷ Inversión necesaria
```

> **% de conversión de clientes potenciales o mensajes:** si no tienes este dato,
> usa **5% como estándar** y ajústalo después con datos reales.

### Ejemplo trabajado

| Dato | Valor |
|---|---|
| Meta de ventas | $400.000 |
| Ticket promedio | $10.000 |
| **Ventas necesarias** | **40** |
| % a invertir | 0,75% |
| **CPA objetivo** | **$75** |
| % de conversión de leads | 9% |
| **Costo por lead objetivo** | **$6,75** |
| **Inversión necesaria** | **$3.000** |
| **ROAS objetivo** | **133,3** |

**Por qué importa el costo por lead objetivo:** es la métrica que realmente miras a
diario en el Administrador de Anuncios. El CPA de venta lo sabes días después; el
costo por conversación lo sabes hoy.

**Ojo con la tasa de cierre:** si el equipo comercial cierra 9% en vez del 5%
asumido, tu costo por lead permitido casi se duplica. Mejorar el cierre suele ser más
barato que mejorar el CPM.

---

## 3. Repartir el presupuesto en el ciclo

Una vez que sabes la **Inversión Necesaria** mensual, se reparte:

| Etapa | % | Sobre $3.200/mes |
|---|---|---|
| Presentación | 60% | $1.920 |
| Evaluación | 20% | $640 |
| Conversión | 10% | $320 |
| Ascensión | 10% | $320 |

Para presupuesto diario: dividir entre 30 (o entre los días de calendario activos).

**Excepción de arranque:** cuenta nueva sin públicos de retargeting → 100% en
Presentación durante 2-3 semanas, y se abre el resto a medida que los públicos se
llenan. El 60/20/10/10 es el estado de régimen.

### El piso de la fase de aprendizaje — el cálculo que decide tu arquitectura

Un conjunto de anuncios necesita **~50 eventos de optimización en 7 días** para salir
de la fase de aprendizaje. De ahí:

```
Presupuesto diario mínimo por conjunto = (CPA objetivo × 50) ÷ 7
```

> **Ojo con qué CPA usar.** Es el costo del **evento que Meta optimiza**, no el de la
> venta. En una campaña de mensajes, Meta optimiza *conversaciones*: usa el costo por
> conversación objetivo, no el CPA de venta. Confundirlos infla el mínimo por 10×.

Ese número, comparado con tu inversión diaria, decide todo:

| Conjuntos que sostienes | Arquitectura |
|---|---|
| **4 o más** | **Separada** — las 4 etapas del ciclo, cascada completa de exclusiones |
| **2-3** | **Mixta** — Prospección + un solo Retargeting (fusiona Evaluación y Conversión) |
| **0-1** | **Consolidada** — una campaña, un conjunto, los 5 niveles como anuncios |

`scripts/presupuesto.py` lo calcula y te dice cuál te toca.

El resultado suele sorprender: con el ejemplo de arriba ($3.200/mes, CPA $8), **solo
alcanza para un conjunto**. Para correr las 4 etapas separadas harían falta ~$6.900/mes.
Esto no invalida el ciclo de ventas: cambia *dónde* se ejecuta. Ver
`10-publicos-y-exclusiones.md` §4 y §5.

**Consolidar no es rendirse.** Cuatro conjuntos en aprendizaje limitado rinden peor que
uno bien alimentado. La disciplina del ciclo se mantiene en los creativos.

### 🔧 Matiz importante: "aprendizaje limitado" NO es sinónimo de fracaso

Este cálculo es una **guía de diseño**, no una compuerta. La creencia de que hay que
salir de la fase de aprendizaje sí o sí es falsa: **la fase de aprendizaje es opcional
para generar resultados.** Lo que cambia al salir es la **consistencia**, no
necesariamente la rentabilidad.

Casos documentados en aprendizaje limitado:
- Tres conjuntos a **$15-20/día** con **ROAS promedio 5,86** ($1.528 → $8.958).
- Conversaciones a **$0,39** en un conjunto que salió de aprendizaje con solo 51
  conversaciones y $29 de inversión total.
- Leads a **$0,34** y registros a **$0,04**.

Compáralo con la misma cuenta a escala: $2.153/día, +500 conversiones por conjunto,
ROAS 4,54 — **menor ROAS que el conjunto chico, pero mucho más consistente**. Eso es
exactamente lo que compra salir del aprendizaje: previsibilidad, no rentabilidad.

**Cuándo NO preocuparse por el aprendizaje limitado:**
- La campaña genera resultados rentables.
- El presupuesto simplemente no da para 50 conversiones semanales.
- La cuenta es nueva.
- Acabas de hacer un cambio necesario.

**Cuándo SÍ merece atención:**
- Rendimiento inconsistente sin razón clara.
- El presupuesto **ya debería** permitir 50 resultados semanales y sigue en
  aprendizaje → revisa si estás haciendo cambios demasiado frecuentes (Ley 0).
- Quieres escalar agresivamente y la inconsistencia te impide prever.

> **Cómo usar el cálculo entonces:** para **decidir cuántos conjuntos abrir**, no para
> decidir si vale la pena anunciar. Con $300/mes se puede vender muy bien — en un solo
> conjunto.

### El otro mínimo: presupuesto por conjunto en CBO

Cuando el presupuesto está a nivel campaña (CBO / "Presupuesto de la Campaña
Advantage"), la referencia práctica es distinta:

```
Presupuesto diario por conjunto ≥ 3 a 5 × CPA objetivo
```

En la práctica: **$20-50 USD diarios por conjunto**. Por debajo de eso el sistema no
tiene margen para probar y conviene **empezar en ABO** (presupuesto por conjunto).

**No existe un mínimo universal de Meta.** El mínimo técnico es $1/día. Pero
*"$5/día sin criterio rinde menos que $50/día con fórmula"*. El umbral práctico de
"poco presupuesto" está en **menos de US$1.000 al mes**.

---

## 4. Simulador de campañas

Sirve para responder *"con este presupuesto y estas métricas, ¿cuántas ventas salen?"*
**antes** de gastar. Ejecutable en `scripts/simulador.py`.

### Modelo: Conversaciones (Mensajes / WhatsApp)

```
Impresiones          = (Gasto ÷ CPM) × 1000
Alcance              = Impresiones ÷ Frecuencia
Clics únicos enlace  = Impresiones × CTR único
Conversaciones       = Clics únicos × Tasa de conversión a mensajes
Costo/conversación   = Gasto ÷ Conversaciones
```
*Valores de referencia del simulador:* CPM $3 · CTR único 3% · Tasa a mensajes 20% ·
Frecuencia 2.

### Modelo: Compras (sitio web)

```
Impresiones       = (Gasto ÷ CPM) × 1000
Alcance           = Impresiones ÷ Frecuencia
Clics salientes   = Impresiones × % clics salientes
Visitas a la LP   = Clics salientes × % de visitas
Compras           = Visitas × % de compras
Costo por compra  = Gasto ÷ Compras
Valor de compras  = Ticket × Compras
ROAS              = Valor de compras ÷ Gasto
```
*Valores de referencia:* CPM $10 · clics salientes 2% · % visitas 70% · % compras 4% ·
frecuencia 2 · ticket $100.

> **% de visitas** = cuánta gente que hizo clic realmente carga la landing. Si está
> por debajo de ~70%, tienes un problema de velocidad de sitio, no de anuncios.

### Modelo: Clientes Potenciales de Meta (formulario nativo)

```
Impresiones          = (Gasto ÷ CPM) × 1000
Clics únicos enlace  = Impresiones × CTR único
Clientes potenciales = Clics únicos × Tasa de conversión
Costo por lead       = Gasto ÷ Clientes potenciales
```
*Valores de referencia:* CPM $7 · CTR único 2,5% · tasa 10% · frecuencia 2.

### Modelo: Clientes Potenciales en el sitio web

```
Impresiones          = (Gasto ÷ CPM) × 1000
Clics salientes      = Impresiones × % clics salientes
Visitas a la LP      = Clics salientes × % de visitas
Clientes potenciales = Visitas × Tasa de conversión
Costo por lead       = Gasto ÷ Clientes potenciales
```
*Valores de referencia:* CPM $10 · clics salientes 1,5% · % visitas 80% · tasa 20% ·
frecuencia 1,5.

> Nota: la hoja original del curso calcula los leads sobre los **clics salientes** en
> lugar de sobre las **visitas a la landing**. `scripts/simulador.py` usa las visitas
> (que es lo consistente con el modelo de compras) y permite reproducir el
> comportamiento original con `--legacy-leads-web`.

### Modelo: Alcance / Thruplays

```
Alcance      = (Gasto ÷ Costo por mil personas alcanzadas) × 1000
Impresiones  = Alcance × Frecuencia
Thruplays    = Gasto ÷ Costo por Thruplay
```
*Valores de referencia:* costo por mil alcanzadas $0,70 · costo por thruplay $0,01 ·
frecuencia 1,2.

---

## 5. Cómo usar el simulador en la práctica

1. **Antes de lanzar:** mete los valores de referencia y mira si el costo por
   conversación/compra que sale es **menor que tu objetivo** del punto 1. Si no lo es,
   no lances: arregla la oferta o el ticket.
2. **Para fijar metas:** despeja al revés. "Necesito 400 ventas a $8 → ¿qué CTR y qué
   tasa de conversión necesito con CPM $10?"
3. **Para diagnosticar:** reemplaza los valores de referencia por **tus métricas
   reales** y compara. La variable que más se desvía es la que hay que arreglar.
4. **Para negociar expectativas:** muestra el escenario. "Con este presupuesto y estas
   tasas, el máximo posible son X ventas." Evita prometer lo imposible.

**El apalancamiento no está donde crees:** bajar el CPM un 20% mejora poco. Subir la
tasa de conversión a mensajes de 20% a 30% mejora el resultado un 50%. Casi siempre la
palanca más grande está **después del clic**, no antes.
