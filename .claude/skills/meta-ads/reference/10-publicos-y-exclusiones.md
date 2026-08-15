# 10 — Públicos y exclusiones: la arquitectura real

Este es el documento donde la estrategia se convierte en configuración. Si
`01-ciclo-de-ventas.md` es el *qué*, este es el *cómo* — con la plataforma tal como
está hoy, no como estaba cuando se grabó el curso.

**Lee primero la Ley 1 de `09-plataforma-2026.md`.** Todo lo que sigue depende de ella.

---

## 1. La inversión que hay que entender

El curso construye las 4 etapas por **inclusión**:

> Presentación = intereses · Evaluación = interacción · Conversión = intención ·
> Ascensión = compradores

Con Advantage+ Audience activado (el default), **eso ya no separa nada**. Las
inclusiones son sugerencias. Meta puede mostrar tu anuncio de Presentación a un
comprador y tu anuncio de Ascensión a alguien que jamás te vio.

Lo único que Meta obedece siempre es la **exclusión de públicos personalizados**.

> ### La regla
> **Incluir es sugerir. Excluir es mandar.**
>
> El Ciclo de Ventas ya no se define por a quién le hablas.
> **Se define por a quién bloqueas.**

La columna "Exclusiones" de la matriz maestra dejó de ser una buena práctica para
evitar canibalización. Hoy **es el mecanismo entero**. El curso ya la tenía bien: solo
cambió de ser un detalle a ser el eje.

---

## 2. Inventario de públicos personalizados

Antes de armar nada, hay que **crear los públicos**. Sin ellos no hay exclusiones, y
sin exclusiones no hay ciclo.

| Fuente | Ventana máxima | Para qué sirve |
|---|---|---|
| **Lista de clientes** (CSV, CRM) | Permanente | La más valiosa. Tu verdad, no la de Meta. |
| **Interacción con página de Facebook** | 365 días | Público de Evaluación |
| **Interacción con cuenta de Instagram** | 365 días* | Público de Evaluación |
| **Reproducciones de video** | 365 días | Evaluación. Segmentable por 3s / 25% / 50% / 75% / 95% |
| **Sitio web (píxel)** | 180 días | Evaluación y Conversión, según el evento |
| **Sitio web — evento de compra** | **730 días** ⚠️ | Ascensión. Ver §7. |
| **Formulario de clientes potenciales** | 90 días | Conversión (abrió y no envió) |
| **Interacción de compras / catálogo** | 180 días | Conversión |
| **Actividad en la app** | 180 días | — |

<sub>\* Algunas fuentes reportan hasta 730 días para Instagram. Verifica en tu cuenta:
Meta ajusta estas ventanas y no siempre lo anuncia.</sub>

### Los 6 públicos que hay que crear sí o sí

Aunque no vayas a separar campañas, **créalos igual** — los necesitas para excluir.

| # | Público | Cómo se arma | Uso |
|---|---|---|---|
| 1 | `EXCL · Compradores 180d` | Lista de clientes + evento Compra 180d | Exclusión maestra en prospección |
| 2 | `EXCL · Compradores 30d` | Evento Compra 30d | Exclusión en retargeting caliente |
| 3 | `AUD · Interacción FB+IG 365d` | Interacción página + cuenta IG | Evaluación |
| 4 | `AUD · Video 25%+ 365d` | Reproducciones ≥ 25% | Evaluación (mejor señal que 3s) |
| 5 | `AUD · Intención 30d` | Ver contenido / Agregar al carrito / Escribió / Abrió form | Conversión |
| 6 | `AUD · Clientes` | Lista de clientes (CRM) | Ascensión |

> **Nota sobre el nº 4:** el curso dice "Reproducciones de video" a secas. Usa **25% o
> más**, no 3 segundos. Un usuario que ve 3 segundos muchas veces solo no alcanzó a
> deslizar; no es una señal de interés.

---

## 3. La cascada de exclusiones

El principio: **cada etapa excluye a todas las que vienen después.** Así, una persona
solo puede estar en una etapa a la vez, y el reparto 60/20/10/10 significa algo.

```
┌─ PRESENTACIÓN (60%) ─────────────────────────────────────┐
│  Incluye: nada (abierto) · país · edad mín.              │
│  EXCLUYE: Interacción 365d + Intención 30d + Compradores │
└──────────────────────────────────────────────────────────┘
        ↓ el que interactúa cae a…
┌─ EVALUACIÓN (20%) ───────────────────────────────────────┐
│  Sugiere: Interacción FB+IG 365d · Video 25%+            │
│  EXCLUYE: Intención 30d + Compradores 180d               │
└──────────────────────────────────────────────────────────┘
        ↓ el que muestra intención cae a…
┌─ CONVERSIÓN (10%) ───────────────────────────────────────┐
│  Sugiere: Intención 30d (carrito, mensaje, form abierto) │
│  EXCLUYE: Compradores 180d                               │
└──────────────────────────────────────────────────────────┘
        ↓ el que compra cae a…
┌─ ASCENSIÓN (10%) ────────────────────────────────────────┐
│  Sugiere: Clientes · Compradores                         │
│  EXCLUYE: Compradores 30d (los que acaban de comprar)    │
└──────────────────────────────────────────────────────────┘
```

**Lee la cascada de abajo hacia arriba para entenderla:** Ascensión solo bloquea a
quien compró hace nada. Conversión bloquea a los compradores. Evaluación bloquea
compradores e intención. Presentación los bloquea a todos. Así, la gente "cae" a la
etapa que le corresponde y nunca compites contigo mismo en la subasta.

**Dónde va cada cosa en la interfaz:** las exclusiones van en **Audience Controls**
(controles), nunca en sugerencias. Si pones tu lista de compradores en el lugar
equivocado, Meta **igual les va a mostrar el anuncio** y te quemas el presupuesto de
adquisición en gente que ya compró. Es el error más caro y más silencioso de 2026.

---

## 4. La decisión que define tu cuenta: ¿separar o consolidar?

Aquí es donde la mayoría se equivoca. **La cascada de arriba es correcta pero cara.**

Cada conjunto de anuncios necesita ~50 eventos de optimización en 7 días para salir de
la fase de aprendizaje:

```
Presupuesto diario mínimo por conjunto = (CPA objetivo × 50) ÷ 7
```

| CPA objetivo | Mínimo por conjunto/día | Las 4 etapas separadas |
|---|---|---|
| $3 | $21 | **$86/día** (~$2.570/mes) |
| $8 | $57 | **$228/día** (~$6.860/mes) |
| $25 | $179 | **$714/día** (~$21.400/mes) |
| $75 | $536 | **$2.143/día** (~$64.300/mes) |

> Si tu presupuesto no llega a la última columna, **separar las 4 etapas te perjudica**.
> Cuatro conjuntos famélicos en aprendizaje permanente rinden peor que uno solo bien
> alimentado.

### El árbol de decisión

```
¿Tu inversión mensual ÷ 30 ≥ (CPA × 50 ÷ 7) × 4 ?
│
├── SÍ  → ARQUITECTURA SEPARADA. Cascada completa de §3.
│         Cada etapa su campaña, su exclusión, sus creativos.
│
└── NO  → ¿Alcanza para 2 conjuntos ((CPA × 50 ÷ 7) × 2)?
          │
          ├── SÍ  → ARQUITECTURA MIXTA (la más común).
          │         Campaña 1: Prospección (excluye TODO el warm+compradores)
          │         Campaña 2: Retargeting (fusiona Evaluación+Conversión,
          │                    excluye compradores 180d)
          │         Ascensión: por email/WhatsApp orgánico, no por ads.
          │
          └── NO  → ARQUITECTURA CONSOLIDADA.
                    UNA campaña, UN conjunto, abierto.
                    Única exclusión: Compradores 180d.
                    Los 5 niveles viven como ANUNCIOS distintos adentro.
```

`scripts/presupuesto.py --cpa-objetivo` hace este cálculo y te dice cuál te toca.

### La estructura que Felipe usa hoy (de $2/día a $25.000/mes)

No son 4 campañas. **Son 2**, separadas por temperatura. Esto es lo que aplica en todas
las cuentas, y coincide con la "arquitectura mixta" de arriba:

```
CAMPAÑA 1 — TRÁFICO FRÍO (presentación)        ~75% del presupuesto
  Presupuesto: a nivel CONJUNTO (ABO)
  Segmentación: COMPLETAMENTE ABIERTA — solo país o ciudad
  Ubicaciones: Advantage ACTIVADO
  Varios conjuntos, uno por:
     · producto/servicio
     · idea creativa (ángulo, creador, enfoque)
     · promoción temporal (se pausa al terminar sin afectar al resto)
  3 a 6 anuncios por conjunto (mínimo 3)

CAMPAÑA 2 — RETARGETING (tráfico caliente)     ~25% del presupuesto
  Presupuesto: CBO (o indiferente: solo hay una variable)
  UN SOLO conjunto que agrupa TODOS los públicos personalizados
  Público personalizado Advantage: DESACTIVADO   ← clave
  Edad y sexo: bastante amplios
  3 a 4 anuncios con formatos variados
```

**Por qué separarlas:** controlar con precisión cuánto se invierte en cada una, medir
por separado y evitar que compitan entre sí. La misma estructura sirve para los tres
objetivos (Interacción/mensajes, Clientes Potenciales, Ventas).

**Los 3 públicos del conjunto de retargeting**, a 180 días:
1. Interactuaron con tu perfil de **Instagram**
2. Interactuaron con tu página de **Facebook**
3. Vieron al menos **10 segundos** de tus videos (en FB e IG)

> ⚠️ **Desactiva "público personalizado Advantage" SOLO en retargeting.** El objetivo
> ahí es enfocarse en quienes ya te conocen, no ampliar a desconocidos. En tráfico frío
> se deja activado.

### CBO vs. ABO: la regla

| Público | Presupuesto | Por qué |
|---|---|---|
| **Frío** | **ABO** (por conjunto) | Requiere exploración. Con ABO controlas cuánto va a cada forma de segmentar y comparas. |
| **Retargeting** | **CBO** (por campaña) | Públicos muy pequeños. Con presupuesto alto sobre público chico, la frecuencia se dispara y se quema. Con CBO, Meta reparte sin quemar. |

> El principio que gobierna la decisión: *"cuanta menos información le enviemos al
> algoritmo, mayor control manual necesitaremos"*.

Metáfora útil: el presupuesto a nivel campaña es un auto **automático**; el de conjunto
es **manual**. Hay que saber manejar los dos.

**Cuándo cambiar:** pasa a CBO cuando ya tienes ganadores claros; vuelve a ABO si
necesitas testear o recuperar control granular.

### ⛔ La estructura "1-1-1" está prohibida

1 campaña + 1 conjunto + 1 anuncio. Si ese único anuncio no funciona, **no tienes con
qué compararlo**. Mínimo 3 anuncios por conjunto, variando **formato** (imagen, video,
secuencia) y **ángulo** (testimonio, marca, oferta, publicación existente).

### Exclusión de compradores: la ventana depende del producto

| Tipo de producto | Ventana de exclusión |
|---|---|
| **La mayoría** | **30-90 días** |
| **Uso prolongado** | hasta **180 días** |
| **Consumo frecuente** | **no excluir** |

Caso real documentado (e-commerce, $1.200 USD/mes): exclusión de compradores de **60
días**, aplicada tanto en los conjuntos de tráfico frío como en la campaña de
retargeting. Cruza esto con la escalera de recencia de §7.

---

## 5. La arquitectura consolidada — el ciclo dentro de un solo conjunto

**Esta es la que aplica a la mayoría** (WhatsApp, LATAM, presupuestos de $300-$3.000
al mes). Y es la parte que más se malinterpreta: consolidar **no** es abandonar el
ciclo de ventas.

> **El Ciclo de Ventas sobrevive como arquitectura de MENSAJE aunque muera como
> arquitectura de ENTREGA.**

Meta decide *a quién* le muestra cada anuncio. Tú decides *qué anuncios existen*. Y
como Meta elige el anuncio que mejor le calza a cada persona, **cargar los 5 niveles de
consciencia dentro del mismo conjunto le da al algoritmo con qué trabajar**.

```
CAMPAÑA ÚNICA · objetivo Interacción/Ventas · presupuesto Advantage+
└── CONJUNTO ÚNICO
      Ubicación: país          (control)
      Excluir: Compradores 180d (control)
      Todo lo demás: abierto
      └── ANUNCIOS (10-20, cargados de una vez)
            ├── 4 de nivel INCONSCIENTE   ← arte Educativo / Humano
            ├── 4 de nivel PROBLEMA       ← arte Humano / Pantalla dividida
            ├── 4 de nivel SOLUCIÓN       ← arte Beneficios / Demostración
            ├── 3 de nivel PRODUCTO       ← arte Testimonio / Prensa
            └── 3 de nivel DECISIÓN       ← arte Promoción / Producto
```

**Por qué funciona:** Meta ya sabe quién es frío y quién es caliente — tiene muchísima
más señal que tu píxel. Al darle un anuncio para cada temperatura, deja de elegir "el
anuncio que mejor rinde en promedio" y empieza a elegir **el anuncio correcto por
persona**. Es el mismo ciclo de ventas, ejecutado por el algoritmo en vez de por tu
estructura de conjuntos.

Y encaja con el cambio de plataforma: la recomendación de "máximo 6 anuncios" se
retiró; hoy se testean **15-50 anuncios por conjunto**. Tu matriz de 30 hooks
(`04-creativos.md`) deja de ser un banco de ideas para rotar y pasa a ser **la carga
inicial**.

**Lo que sí pierdes al consolidar:** control de presupuesto por etapa. Ya no puedes
garantizar el 60/20/10/10. En la práctica Meta destina por su cuenta un **20-25%** a
públicos calientes cuando corres abierto — no es el 40% del curso, pero se le parece
más de lo que uno esperaría.

**La única exclusión que no puedes saltarte, ni consolidando:** compradores. Si no
excluyes a quien ya compró, pagas por venderle otra vez lo mismo a alguien que lo tiene
en la mano.

---

## 6. Niveles de consciencia → configuración, nivel por nivel

La tabla que pediste. Cómo cada nivel se traduce en configuración real, en las dos
arquitecturas.

| Nivel | Etapa | Público (sugerencia) | Exclusión (control) | Objetivo | Arte |
|---|---|---|---|---|---|
| **Inconsciente** | Presentación | Abierto | Interacción 365d · Intención 30d · Compradores 180d | Interacción / Ventas | Educativo · Humano |
| **Problema** | Presentación | Abierto o intereses amplios | idem | Interacción / Ventas | Humano · Pantalla dividida |
| **Solución** | Presentación → Evaluación | Abierto · Interacción 365d · Video 25%+ | Intención 30d · Compradores 180d | Ventas / Clientes potenciales | Beneficios · Demostración |
| **Producto** | Evaluación → Conversión | Intención 30d · Visitantes 30d | Compradores 180d | Ventas (+ catálogo) | Testimonio · Prensa · Producto |
| **Decisión** | Ascensión | Clientes · Compradores 180d | Compradores 30d | Ventas / Interacción | Promoción · Producto |

**Cómo leerla en cada arquitectura:**

- **Separada** → cada fila es un conjunto de anuncios. La columna "Exclusión" es lo que
  configuras; la columna "Público" es orientativa.
- **Consolidada** → las columnas Público y Exclusión colapsan (abierto + excluir
  compradores). Las columnas Nivel y Arte siguen mandando: definen **qué anuncios
  cargas**.

En ambos casos **la columna Exclusión es la que hace el trabajo**. La columna Público
es una sugerencia, y en cuentas maduras se puede dejar en blanco sin perder nada.

---

## 7. La trampa de exclusión de 730 días ⚠️

**El cambio más peligroso de 2026.** Desde el **18 de mayo de 2026**, los públicos
basados en el evento de compra se pueden retener hasta **730 días** (antes 180).

Suena bien — más gente para retargeting. El problema está del otro lado: **una
exclusión de compradores que antes bloqueaba 6 meses ahora puede bloquear 2 años.**

Si tu ciclo de recompra es de 6-12 meses y excluyes compradores a 730 días de tus
campañas de prospección, estás bloqueando a **tus mejores clientes justo cuando están
listos para volver a comprar**. Y no lo vas a ver en ninguna métrica: las exclusiones
no aparecen como pérdida, simplemente el alcance no llega.

### La escalera de recencia

En vez de una exclusión monolítica, segmenta por ventana:

| Ventana | Qué hacer |
|---|---|
| **0-30 días** | Excluir de todo lo de adquisición. Recién compró. |
| **31-90 días** | Excluir o nutrir, según categoría. |
| **91-180 días** | Probar venta cruzada y recompra. |
| **181-365 días** | Campañas de recuperación y estacionales. |
| **366-730 días** | **Solo reactivación y semilla de lookalikes.** Nunca como exclusión automática de prospección. |

### Reglas prácticas

1. **Audita hoy** cualquier público de compra que esté en 730 días, sobre todo si lo
   usas como exclusión.
2. **Nombra explícitamente la ventana:** `EXCL · Compradores 180d`. Un público llamado
   solo "Compradores" tarde o temprano se usa mal.
3. **Ajusta la ventana a tu ciclo de recompra**, no al máximo que ofrece Meta.
   Consumible mensual → 30-60 días. Compra anual → 180-365 días. Compra única (un
   colchón, un curso) → ahí sí la ventana larga tiene sentido.
4. **Excluir e incluir usan ventanas distintas.** Nada obliga a que sean iguales:
   incluye a 730 días para reactivar, excluye a 180 para prospectar.

---

## 8. Nomenclatura

Sin convención, en tres meses no sabes qué hace cada público y empiezas a excluir mal.

```
Públicos:    [TIPO] · [Fuente] · [Ventana]
             EXCL · Compradores · 180d
             AUD · Interacción FB+IG · 365d
             AUD · Video 25%+ · 365d
             SEED · Compradores · 730d          (semilla de lookalike, NO exclusión)

Campañas:    [ETAPA] · [Objetivo] · [Producto]
             PRES · Interacción-Conv · Curso Ads

Conjuntos:   [Público] · excl[Exclusiones] · [País]
             Abierto · exclINT+COMP · CO

Anuncios:    [Nivel] · [Arte] · [Ángulo] · v[N]
             PROBLEMA · Humano · ya-probé-de-todo · v1
```

El prefijo `EXCL` / `AUD` / `SEED` es lo que más valor aporta: dice **para qué se creó
ese público**, y evita que alguien use como exclusión de prospección un público de 730
días creado para sembrar lookalikes.

---

## 9. Errores frecuentes

| Error | Consecuencia | Arreglo |
|---|---|---|
| Poner exclusiones en "sugerencias" en vez de "controles" | Meta ignora la exclusión y le anuncias a tus compradores | Muévelas a Audience Controls |
| Separar 4 etapas con presupuesto para 1 | Todo en aprendizaje limitado, CPA inestable | Consolida (§4) |
| Excluir compradores a 730d en prospección | Bloqueas la recompra sin darte cuenta | Escalera de recencia (§7) |
| Usar reproducciones de video de 3s como público | Público enorme y sin intención real | Usa 25% o más |
| No crear el público de compradores | Pagas dos veces por el mismo cliente | Créalo hoy, aunque consolides |
| Confiar solo en el píxel | Pierdes 30-50% de los eventos | Instala CAPI |
| CTWA sin `ctwa_clid` + CAPI | Meta optimiza hacia "gente que escribe", no hacia compradores | Ver `09-plataforma-2026.md` |
| Tocar la campaña cada 2 días | Reinicio de aprendizaje: +35-60% CPA por 48-72h | Ley 0: cada 5-7 días |
| Mover el 60% de Presentación al retargeting | Se seca el ciclo en 2-3 semanas | El ROAS del retargeting está inflado 60-80% |

---

## 10. Checklist de arranque

- [ ] Píxel instalado **y** API de Conversiones funcionando
- [ ] Los 6 públicos de §2 creados, con nomenclatura de §8
- [ ] Ventana de exclusión de compradores ajustada a **tu** ciclo de recompra
- [ ] Calculado `(CPA × 50) ÷ 7` y decidida la arquitectura (§4)
- [ ] Exclusiones puestas en **controles**, no en sugerencias
- [ ] Al menos 10-15 anuncios cargados, cubriendo los 5 niveles
- [ ] Ubicación y edad mínima definidas; el resto abierto
- [ ] Fecha de la próxima optimización en el calendario: **hoy + 7 días**
