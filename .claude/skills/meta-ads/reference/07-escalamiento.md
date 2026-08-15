# 07 — Escalando tus campañas

Escalar es lo que se hace **después** de que el ciclo funciona, no antes. Si el costo
por resultado todavía no llega al objetivo de `05-presupuesto.md`, escalar solo hace
perder plata más rápido.

Hay dos formas, y se usan **juntas**.

---

## 1 · Escalando VERTICALMENTE

Más presupuesto sobre lo que ya funciona.

### La regla

> **Aumenta el presupuesto máximo un 35% cada 3-7 días** (Campaña o Conjunto de
> Anuncios).

Subir más rápido reinicia la fase de aprendizaje y desestabiliza el rendimiento. El
algoritmo necesita re-aprender con cada salto grande.

> ### ⚠️ El 35% vs. el 20%: dos fuentes, y cómo resolverlo
>
> **Meta no publica un porcentaje oficial.** Hay dos posiciones:
>
> - **Felipe Vergara (+US$45M invertidos):** un cambio de hasta **35%** hacia arriba o
>   hacia abajo es el límite para evitar el reinicio. Es el rango más consistente que
>   observa en pruebas con múltiples cuentas.
> - **Consenso general de la industria:** **20-30% cada 3-5 días**; sobre 20% el
>   reinicio se vuelve probable, y cuesta **+35-60% de CPA durante 48-72 horas**.
>
> **Cómo operar con las dos:**
> - **+20%** → escalón conservador. Nadie discute que es seguro.
> - **+25-35%** → el rango de Felipe. Úsalo en conjuntos estables con margen holgado
>   sobre el Número Mágico, y **vigila el CPA los 2 días siguientes**.
> - **>35%** → nadie lo defiende. Ahí el reinicio es seguro.
>
> Con **CBO** el ritmo documentado es **15-30% cada 24-48 horas**.
>
> Lo importante no es el número exacto: es que **hay un techo por escalón** y que
> cruzarlo tiene un costo medible. Si dudas, sube menos y más seguido.

Ejemplo desde $20/día con escalones del 20%:
| Día | Presupuesto | Al 35% (agresivo) |
|---|---|---|
| 0 | $20 | $20 |
| 3-5 | $24 | $27 |
| 6-10 | $29 | $36 |
| 9-15 | $35 | $49 |
| 12-20 | $41 | $66 |

La curva del 35% llega más rápido, pero cada escalón arriesga 2-3 días de CPA
degradado. En 20 días la diferencia real suele ser menor de lo que sugiere la tabla.

### Piso: nunca bajes del mínimo de aprendizaje

Al escalar hacia arriba esto no aplica, pero al **repartir** presupuesto entre conjuntos
sí: ningún conjunto debería quedar por debajo de `(CPA objetivo × 50) ÷ 7` al día. Si
escalar horizontalmente te obliga a dividir el presupuesto por debajo de ese piso, no
estás escalando: estás fragmentando. Ver `10-publicos-y-exclusiones.md` §4.

### Las 2 alertas del escalamiento vertical

**a) Monitorea muy de cerca tu Número Mágico — Ley de Retornos Decrecientes.**

### Qué es exactamente el Número Mágico

> **El ROAS mínimo (o el costo por adquisición máximo) por debajo del cual la empresa
> empieza a perder dinero.**

Es la brújula de toda decisión: lo que está **por encima** se deja correr; lo que está
**por debajo** se apaga — sin importar cuánto presupuesto le esté dando Meta.

Se calcula distinto según el negocio:

| Tipo de negocio | Su Número Mágico es… |
|---|---|
| **Tienda online** | Un **ROAS mínimo**, según margen del producto y costos de operación |
| **Empresa de servicios** | El **costo de adquisición de cliente** máximo rentable |
| **WhatsApp / sin sitio web** | El **costo por lead** máximo asumible |

Números mágicos reales de cuentas documentadas: ROAS mínimo **3,5** (e-commerce),
**2,8** (empresa europea), **4** (vestidos de baño), costo por lead máximo **US$8-9**
(inmobiliaria).

> **Regla temporal:** calcúlalo **ANTES de escalar, no después.** Al escalar los costos
> van a subir sí o sí, y sin ese número no sabes si preocuparte.
> `scripts/presupuesto.py` te lo da.

### La Ley de Retornos Decrecientes

> *"A medida que subes tu presupuesto, tu retorno bajará — le llegarás a personas más
> frías. Por eso, si quieres escalar, debes tener márgenes muy buenos y trabajar
> también en la recompra."*

Los retornos **no son lineales**. Al escalar, Meta muestra los anuncios a personas
progresivamente menos propensas a comprar, porque el público más calificado se agota
primero. **El ROAS SIEMPRE cae al escalar.** Lo importante no es evitar la caída: es
que se mantenga por encima del Número Mágico.

*"No hay nada en la vida que crezca al infinito. Todo en la naturaleza tiende a
estabilizarse hasta alcanzar cierto punto de equilibrio."*

### Cómo encontrar tu punto de quiebre

Registra en cada escalón `presupuesto diario → costo por resultado`. Cuando dos
escalones seguidos empeoran el costo, el anterior era tu techo práctico.

| Presupuesto/día | Costo por resultado |
|---|---|
| $20 | $6,00 |
| $27 | $6,10 |
| $36 | $6,30 |
| $49 | **$7,80** ← empieza a romperse |
| $66 | **$9,40** ← confirmado |

→ Techo ≈ **$36/día**. Para crecer más allá, hay que escalar **horizontalmente**.

### ⚠️ Cuándo una campaña está lista para escalar

**Anuncios consistentemente por encima del Número Mágico durante al menos 2-3 SEMANAS
SEGUIDAS**, con suficientes conversiones para haber completado el aprendizaje.

Escalar antes de eso, o sin haber diagnosticado la cuenta, es *"uno de los errores más
costosos en Meta Ads"*.

> *"Un cambio brusco de presupuesto sin diagnóstico previo es como ir al médico y pedir
> cinco pastillas sin hacerse ningún examen."*

### ⚠️ El error #1 al escalar: concentrar el presupuesto en el mejor ROAS

Meta reparte el presupuesto de forma desigual **a propósito**, y suele darle más dinero
al anuncio de **peor** ROAS puntual porque es el **más escalable**. Concentrar el
presupuesto en el de mejor ROAS hace **caer** el retorno general (de 4,2 a 3 o 2,5 en
el caso documentado).

*"Si tienes conjuntos de anuncios con ROAS alto pero baja inversión, no los apagues ni
concentres todo ahí. Déjalos correr, van a darte buenos resultados de vez en cuando."*

Es el **efecto desglose** — ver `12-andromeda-y-diversidad-creativa.md` §3. Evalúa el
conjunto **globalmente**, no anuncio por anuncio.

**b) Ten cuidado con la Fatiga de Anuncios — Frecuencia.**

Al subir presupuesto sobre el mismo público, la frecuencia sube. Cuando cruza **3-5 en
los últimos 7 días** (ver `06-optimizacion.md`), el creativo está quemado. Escalar
vertical sin renovar creativos garantiza que el costo suba.

---

## 2 · Escalando HORIZONTALMENTE

Más superficie, no más presupuesto sobre lo mismo. En orden de menor a mayor esfuerzo:

```
Nuevos Anuncios → Nuevos Conjuntos de Anuncios → Nuevas Campañas → Nuevos Canales
```

### a) Nuevos Anuncios
Lo primero y más barato. Nuevos hooks, nuevos ángulos, nuevos tipos de arte dentro del
mismo conjunto. Es la respuesta directa a la fatiga. La matriz de diversificación
(`04-creativos.md`) existe justamente para tener siempre munición: 30 hooks listos.

### b) Nuevos Conjuntos de Anuncios
Nuevos públicos: otros intereses, otros lookalikes, segmentación abierta, otra
geografía, otro rango de edad. Amplía el pool de gente disponible y **baja la
frecuencia** del conjunto original.

### c) Nuevas Campañas
Otras etapas del ciclo, otros objetivos, otros productos, campañas especiales de
calendario (`08-calendario-mkt.md`). Si solo tienes Presentación, abrir Evaluación y
Conversión **es** escalamiento horizontal.

### d) Nuevos Canales
Fuera de Meta: Google, TikTok, YouTube, email, WhatsApp masivo. Es el último escalón
porque exige aprender un sistema nuevo — pero es el que rompe el techo definitivo de
una cuenta.

---

## 3 · Cómo se combinan

El patrón correcto es alternar:

1. Escala vertical hasta acercarte al Número Mágico.
2. Antes de cruzarlo, escala horizontal (primero **anuncios nuevos**, después
   **públicos nuevos**).
3. El nuevo pool de gente **corre el Número Mágico hacia arriba**.
4. Vuelve a escalar vertical.
5. Repite.

Escalar solo vertical → topas contra el Número Mágico y el costo se dispara.
Escalar solo horizontal → mucha estructura sin aprovechar lo que ya gana.

---

## 4 · Checklist antes de escalar

- [ ] ¿El costo por resultado está **por debajo del objetivo** de `05-presupuesto.md`?
- [ ] ¿Lleva **al menos 5-7 días estable**, no un día bueno suelto?
- [ ] ¿La **frecuencia** está bajo 3-5?
- [ ] ¿Tengo **creativos nuevos listos** para cuando llegue la fatiga?
- [ ] ¿El negocio **aguanta el volumen**? (stock, equipo que responde WhatsApp,
      capacidad de entrega)
- [ ] ¿Estoy registrando `presupuesto → costo por resultado` para detectar el Número
      Mágico?

El punto 5 se olvida siempre y es el que más daño hace: escalar una campaña de
mensajes por encima de lo que el equipo comercial puede responder destruye la tasa de
cierre y arruina la economía completa de la cuenta.

---

## 5 · La mentalidad

> El trafficker profesional **no busca invertir menos, busca invertir más** — y
> **no deja de testear**.

El objetivo del escalamiento no es "gastar menos". Es encontrar hasta dónde el sistema
sigue siendo rentable e ir hasta ahí. Una campaña con ROAS 8 gastando $10/día es peor
negocio que una con ROAS 3 gastando $500/día — si el margen aguanta.
