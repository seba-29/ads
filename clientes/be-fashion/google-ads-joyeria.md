# Be Fashion — Google Ads · Test de joyería

> Plan de la campaña de prueba en Google Ads. **Canal fuera de la skill `meta-ads`**
> (esa es específica de Meta). Investigado en agosto de 2026 — Google cambió bastante
> este año, verifica en la interfaz antes de dar algo por sentado.

---

## 1. La tesis — corregida con datos del catálogo real

**Dato que cambia el plan:** Be Fashion **no vende joyería genérica. Es un retailer
multimarca de joyería premium.**

| Marca | SKU | % catálogo | Precio promedio |
|---|---:|---:|---:|
| **UNOde50** | 69 | **67%** | $206.454 |
| **Tous** | 17 | 17% | $203.726 |
| Lola Casademunt | 8 | 8% | $72.490 |
| Pandora · Swarovski · Tory Burch · Kate Spade | 5 | 5% | — |

Y el ticket es alto: **precio promedio de catálogo $191.854 · mediana $199.990**, con el
64% del surtido entre $150.000 y $250.000.

### Por qué esto mejora mucho la apuesta

La estrategia original apuntaba a genéricos ("aros de plata", "collar personalizado").
**Con este catálogo, el activo real son las búsquedas de marca.**

Alguien que busca **"uno de 50 chile"** o **"aros tous oso"** ya sabe qué quiere, cuánto
cuesta y por qué lo quiere. Esa es la intención más alta que existe en Search, y el
término es mucho más barato que un genérico disputado por todo el retail.

**Se sostiene la tesis de Seba de no ir por carteras**, pero por una razón más precisa:
no es que joyería sea "menos competido" en abstracto — es que **este catálogo tiene
marcas con demanda de búsqueda propia**, y ahí un retailer chico puede competir de igual
a igual porque compite por *disponibilidad y despacho*, no por autoridad de marca.

> ⚠️ **UNOde50 concentra el 67% del surtido.** Es la apuesta principal de la campaña y
> también el riesgo: cualquier problema de abastecimiento golpea toda la estrategia.

### La corrección de margen que hay que hacer

El plan anterior citaba márgenes de joyería de **55-70%**. **Ese benchmark no aplica
acá:** corresponde a marcas propias. Be Fashion **revende** UNOde50, Tous y Pandora, y
los márgenes de reventa en retail de moda son bastante menores.

**Es el dato que falta y el único que bloquea el cálculo final.**

---

## 1b. Escenarios de rentabilidad

Sobre ticket de catálogo **$190.000 CLP** y tasa de conversión **2%** (referencia de la
categoría apparel/joyería):

| Margen real | ROAS equilibrio | CPA máximo | **CPC máximo** |
|---:|---:|---:|---:|
| 25% | 4,00× | $47.500 | **$950** |
| 30% | 3,33× | $57.000 | **$1.140** |
| 35% | 2,86× | $66.500 | **$1.330** |
| 40% | 2,50× | $76.000 | **$1.520** |
| 50% | 2,00× | $95.000 | **$1.900** |

**Lectura:** incluso en el escenario pesimista (25%), el techo de CPC es **$950 CLP** —
holgado para Chile. **El ticket alto es lo que hace viable este canal.** Con un ticket
de $30.000 no habría conversación posible.

> **La disciplina del % a invertir (igual que en Meta):** el margen bruto **no** es lo
> que se invierte. Si el margen es 40% pero la clienta quiere conservar 15% de utilidad,
> el % a invertir es **25%**, no 40%. Usar el margen completo hace que "el ROAS dé" y que
> igual no se gane nada.

> ⚠️ **Esto es precio de catálogo, no AOV real.** El AOV verdadero sale del export de
> órdenes de Shopify y puede ser distinto: más bajo si la gente compra Lola Casademunt
> ($69.990), más alto si compran varias piezas. **Pedirlo antes de fijar la puja.**

---

## 2. La decisión de tipo de campaña

Seba propuso **campaña de Ventas enfocada en Búsqueda**. Correcto **para este test**, y
conviene entender por qué, porque hay un matiz importante.

| Tipo | CPC promedio e-commerce | Qué aporta |
|---|---|---|
| **Búsqueda (texto)** | **~US$5,26** | **Te enseña los términos reales que busca la gente** |
| **Shopping** | **~US$0,66** | Tráfico mucho más barato, pero requiere Merchant Center + feed |
| **Performance Max** | — | Caja negra. Si el test sale mal, no sabes por qué |

> **El CPC de Shopping es ~8× más barato que el de Búsqueda.** Ese dato importa mucho
> para el mediano plazo.

**Aun así, Búsqueda es lo correcto para el test**, porque el objetivo de esta primera
campaña **no es rentabilidad, es aprendizaje**: el informe de términos de búsqueda te
dice qué pide realmente el mercado chileno, con qué palabras y con qué intención. Eso
es lo que después alimenta todo — incluida la campaña de Shopping.

**PMax queda descartado para el test** por lo mismo: no te deja leer nada.

### Fase 2 natural: Shopping
Si Be Fashion tiene catálogo en la web, **Shopping es donde está la economía real** de
un e-commerce de joyería. Requiere Google Merchant Center con feed de productos
verificado (títulos, precios, disponibilidad, imágenes, GTIN si aplica). Vale la pena
empezar a montarlo en paralelo, porque la verificación toma días.

> ⚠️ Desde el **31 de agosto de 2026** los anuncios de inventario local se aplican
> obligatoriamente a todas las campañas de Shopping. Si Be Fashion no tiene tienda
> física, revisar la configuración para que no distorsione.

---

## 3. ⛔ Lo que hay que tener ANTES de lanzar

**Sin esto no se lanza.** Es el equivalente al píxel + CAPI de Meta: si el algoritmo no
ve conversiones, optimiza a ciegas y el test no mide nada.

| Requisito | Detalle |
|---|---|
| **Etiqueta nativa de Google Ads** | **Fuente primaria** para Smart Bidding. No delegar en GA4 para esto. |
| **GA4 vinculado** | Para analítica, audiencias y reporte cross-canal. Enhanced Measurement activado. |
| **Conversiones mejoradas** | Envía datos hasheados de primera parte (email, teléfono). Reporta **+5-15% de conversiones** que de otro modo se pierden. |
| **Una conversión primaria por objetivo** | *Compra*. No marcar cinco cosas como primarias. |
| **Valor de conversión poblado** | Sin valor no hay ROAS, y sin ROAS no se puede juzgar el test. |
| **Ventana de conversión** | Joyería = compra considerada → **30 días**. |

*Consent Mode V2 es obligatorio solo para EEE/Reino Unido. Chile no lo exige, pero
implementarlo no hace daño.*

---

## 4. Estrategia de puja: el error más caro

> **NO arrancar en "Maximizar conversiones".**

Con **cero conversiones históricas**, Smart Bidding no tiene señal con qué trabajar y
produce **pujas erráticas**. Es el error más común al abrir una cuenta nueva.

**La secuencia correcta:**

```
Semanas 1-4  →  Maximizar clics CON límite de CPC
                (herramienta de recolección de datos, NO de optimización)
                     ↓
        ¿Ya hay ~30 conversiones en 30 días?
                     ↓
Semana 5+    →  Maximizar conversiones  →  después tCPA o tROAS
```

**El límite de CPC no es opcional** — sin él, "maximizar clics" puede dispararse.
Ponerlo en función de lo que el negocio aguanta (ver §6).

> **Nunca dejes una campaña en Maximizar clics indefinidamente.** Es un instrumento de
> recolección, no una estrategia.

**Regla de lectura:** Google mismo pide **mínimo 30 días y ~30 conversiones** antes de
concluir algo sobre una estrategia de puja. Es el equivalente a la Ley 0 de Meta — la
impaciencia también es cara acá.

---

## 5. Concordancias y negativas

### Concordancias: frase y exacta. **Amplia NO.**

| Concordancia | Cuándo |
|---|---|
| **Frase** | ✅ El arranque. Volumen razonable, control razonable. |
| **Exacta** | ✅ Para los ganadores, una vez identificados. |
| **Amplia** | ⛔ **No en los primeros 60 días.** |

**Por qué amplia no:** funciona solo cuando ya hay **30-50 conversiones al mes por
campaña** para que Smart Bidding la controle, más una lista de negativas madura. Sin
eso, la concordancia amplia se come el presupuesto en queries irrelevantes.

Ruta correcta: frase y exacta → juntar datos → depurar negativas → **recién ahí**
probar amplia como experimento aparte, con presupuesto acotado.

### Negativas: **antes** de lanzar, no después

Esto es crítico y casi nadie lo hace:

> Si el gasto temprano se fuga a queries basura **durante la fase de aprendizaje**, el
> algoritmo **se ancla a mala señal**. Y eso después cuesta corregirlo.

**Lista pre-lanzamiento (mínima) para joyería en Chile:**

```
gratis · gratuito · barato · como hacer · diy · manualidades
curso · aprender · tutorial · empleo · trabajo · vacante
mayorista · al por mayor · fabricante · proveedor
reparacion · arreglar · limpiar · tasacion · avaluo
segunda mano · usado · replica · imitacion · falso
oro (si NO se vende oro) · empeño · compro oro
```

Y las que dependen del catálogo real: si no vende oro, "oro" va como negativa; si no
vende compromiso, "anillo de compromiso" también.

**Revisar el informe de términos de búsqueda semanalmente el primer mes**, después cada
dos semanas. Ahí es donde está el aprendizaje real del test.

---

## 6. Presupuesto: el marco (faltan datos)

Para cerrar los números hacen falta **dos datos de la línea de joyería
específicamente** — probablemente distintos a los de carteras:

- **Ticket promedio** de joyería
- **Margen** de joyería

Con eso sale todo:

```
ROAS de equilibrio  = 1 ÷ margen
CPA máximo          = Ticket × margen
CPC máximo aceptable = CPA máximo × tasa de conversión esperada
```

**Referencia de tasa de conversión:** apparel y joyería promedian **2-3%** en Google.
Es prudente modelar con **2%** para el test.

**Ejemplo con números inventados** (reemplazar por los reales):
> Ticket $40.000 CLP · margen 60% → ROAS equilibrio 1,67× · CPA máximo $24.000 CLP.
> Con conversión 2% → **CPC máximo ~$480 CLP**. Ese es el límite de puja.

**Duración mínima del test:** 30 días. Menos que eso no concluye nada — y con
presupuesto muy bajo, tampoco.

> ⚠️ **No hay benchmarks públicos confiables de Chile.** Los datos de CPC de arriba son
> de mercados US/EU, donde el e-commerce en búsqueda subió a ~US$2,61 (+33% interanual)
> y hasta US$5,26 según la fuente. **En Chile los CPC suelen ser bastante más bajos**,
> pero no voy a inventar la cifra: se calibra con datos reales de la primera semana.

---

## 7. Estructura de la campaña — por MARCA, no por tipo de producto

Este es el cambio grande respecto al plan inicial. Con marcas de demanda propia, agrupar
por *aros / collares / anillos* desperdicia lo mejor del catálogo.

```
CAMPAÑA A · Búsqueda · MARCAS · Chile          ← la apuesta principal (~70% del presupuesto)
│  Puja: Maximizar clics + límite de CPC (ver §1b)
│
├── GRUPO · UNOde50                             67% del surtido
│     frase: "uno de 50", "unode50 chile", "pulsera uno de 50",
│            "anillo uno de 50", "collar uno de 50"
│     → landing: colección UNOde50
│
├── GRUPO · Tous                                17% del surtido
│     frase: "tous chile", "aros tous", "oso tous", "anillo tous plata"
│     → landing: colección Tous
│
└── GRUPO · Otras marcas                        Pandora · Swarovski · Tory Burch · Kate Spade
      frase por marca · solo si hay stock real (son 5 SKU en total)

CAMPAÑA B · Búsqueda · GENÉRICOS · Chile       ← secundaria (~30%), CPC más caro
├── GRUPO · Aros          "aros de plata mujer", "aros colgantes"
├── GRUPO · Collares      "collar de plata mujer", "collar con perla"
├── GRUPO · Anillos       "anillo de plata mujer"
└── GRUPO · Pulseras      "pulsera de cuero mujer", "pulsera de plata"

CAMPAÑA C · Marca propia · "be fashion"        ← siempre separada
      exacta: "befashion", "be fashion chile", "be fashion joyas"
      Si no se separa, el CTR de marca infla el promedio y no ves la verdad
```

**Cada grupo con su landing de colección.** La tienda ya tiene la estructura de
categorías en Shopify — hay que usarla, no mandar todo a la home.

**Prioridad si el presupuesto es chico:** empezar **solo con la Campaña A**, y dentro de
ella solo **UNOde50 y Tous**. Son el 84% del surtido y la intención más alta. Los
genéricos pueden esperar.

### El ángulo competitivo del copy

Contra la tienda oficial de la marca y contra el retail grande, un multimarca chico
compite con: **stock real, despacho rápido, atención directa**. Eso va en los RSA.
"Envío a todo Chile", "stock disponible", "despacho en 24h" — si es verdad.

---

## 8. Cómo se lee el test

**No juzgues por ROAS la primera semana.** El orden de lectura:

| Semana | Qué mirar | Qué decidir |
|---|---|---|
| 1 | Términos de búsqueda | Depurar negativas. Nada más. |
| 2 | Términos + CTR por grupo | Ajustar copy de los RSA débiles |
| 3-4 | Clics, costo, primeras conversiones | ¿Alcanzan ~30 conversiones/mes? |
| 5+ | CPA y ROAS reales | Cambiar a Maximizar conversiones · pausar grupos bajo equilibrio |

**El entregable real del test no es la venta: son los términos.** Salir de este mes
sabiendo qué busca el mercado chileno de joyería, con qué palabras y a qué costo, vale
más que las ventas que genere.

---

## 8b. ⚠️ Higiene de catálogo (bloquea Shopping)

El análisis detectó **5 registros defectuosos sobre 104 (~5%)** que hay que corregir
**antes** de conectar Merchant Center, porque el feed los arrastra y Shopping los rechaza:

| Problema | Registro | Acción |
|---|---|---|
| **Precio $0** | Cinturón Carolina Herrera | Merchant Center lo rechaza. Corregir o despublicar. |
| **Descuento 92% sospechoso** | Anillo UNOde50 $19.990 (antes $249.990) | Casi seguro error de carga. **Verificar antes de que alguien compre.** |
| **Mal categorizados** | Cartera Pinko · Sandalias Melissa · Cinturón | Sacar de "Joyas y Bisutería" — ensucian el feed y las señales |
| **7% agotado** | 7 de 104 | Shopping penaliza feeds con stock desactualizado |

**Además, el hueco de entrada:** solo 13 productos bajo $100.000, y 8 son de una sola
marca. Si en algún momento se busca volumen o captar compradoras primerizas, esa franja
está vacía. Hoy Lola Casademunt ($69.990) es el único gancho de entrada real.

---

## 9. Checklist de lanzamiento

- [ ] **Margen real de reventa** confirmado (el de catálogo no sirve: es multimarca)
- [ ] **AOV real** pedido del export de órdenes de Shopify
- [ ] Higiene de catálogo resuelta (§8b) — bloquea Shopping
- [ ] CPA máximo y CPC límite calculados
- [ ] Etiqueta de conversión de Google Ads instalada y **probada**
- [ ] GA4 vinculado · conversiones mejoradas activadas
- [ ] Valor de conversión poblado (sin esto no hay ROAS)
- [ ] Ventana de conversión en 30 días
- [ ] Lista de negativas cargada **antes** de activar
- [ ] Grupos **por marca** (UNOde50, Tous), cada uno con su landing de colección
- [ ] Puja en **Maximizar clics con límite de CPC**
- [ ] **AI Max apagado**
- [ ] Campaña de marca separada
- [ ] Recordatorio: revisar términos de búsqueda **a los 7 días**
- [ ] Expectativa alineada con la clienta: **el test dura 30 días** y el primer
      entregable son aprendizajes, no ventas

---

## Fuentes

- [Google Ads Updates 2026 — cambios del año](https://groas.ai/post/google-ads-updates-2026-every-major-change-campaign-impact)
- [Performance Max vs Search en 2026](https://www.groas.com/post/performance-max-vs-search-campaigns-in-2026-what-changed-and-what-to-use)
- [Estrategias de puja 2026](https://www.groas.com/post/google-ads-bidding-strategies-2026-target-cpa-vs-target-roas-vs-max-conversions)
- [Concordancias de palabras clave 2026](https://www.stackmatix.com/blog/google-ads-keyword-match-types-guide)
- [Conversion tracking 2026: GA4 + Enhanced Conversions](https://www.groas.com/post/google-ads-conversion-tracking-setup-2026-the-complete-guide-ga4-enhanced-conversions-consent-mode)
- [Benchmarks Google Ads 2026 por industria](https://www.wordstream.com/blog/2026-google-ads-benchmarks)
- [Benchmarks de Google Shopping por categoría 2026](https://foundrycro.com/blog/google-shopping-benchmarks-by-category-2026/)
