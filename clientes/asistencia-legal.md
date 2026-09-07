# ASISTENCIA LEGAL

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.
>
> Última revisión completa de la cuenta: **7-sep-2026**.

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `755647789856028` (“Asistencial Legal”) |
| **Business Manager** | Estudio Jurídico Carabajal y asociados |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE |
| **Rubro** | Servicios legales — reprogramación / renegociación de deudas (Ley de insolvencia, DICOM) |
| **Contraparte** | Emma |
| **Web / IG** | ? |

## Los números (obligatorios — sin esto no hay recomendación de presupuesto)
| | |
|---|---|
| **Ticket promedio** | ? — **pedido a Emma, sin respuesta todavía** |
| **Margen** | ? |
| **% dispuesto a invertir por cliente nuevo** | ? |
| **Meta de ventas mensual** | ? |
| **Inversión actual/mes** | **$4.589.722** (últimos 30 días) · agosto cerró en **$4.602.916** |
| **Techo mensual acordado** | **$4.000.000 CLP** (fijado por Seba el 7-sep) |
| **CPA objetivo** *(calculado)* | ? — sin ticket ni margen no se puede calcular |
| **ROAS objetivo** *(calculado)* | ? |
| **NÚMERO MÁGICO** *(CPL máximo)* | ? |

> **Todo veredicto de esta cuenta es PROVISIONAL.** Hay dos precios de lead
> conviviendo — $1.022 y $6.326 — y **no sabemos cuál cierra mejor**. Sin el
> ticket y el % de cierre, no se puede decidir cuál de los dos conservar.
> Es el dato que decide la estrategia completa, no un detalle pendiente.

### Techo de inversión
| | |
|---|---|
| **Tope acordado** | $4.000.000/mes |
| **Traducción a diario** | **$129.000/día** — sirve para cualquier mes (31 × 129.000 = $3.999.000) |
| **Septiembre 1–7** | $946.887 gastados |
| **Disponible 8–30 sep** | $3.053.113 → hasta $132.744/día |
| **Presupuesto nominal hoy** | $143.085/día (suma de los 5 conjuntos activos) |
| **Gasto real hoy** | **≈ $102.500/día** — el nominal miente, ver hallazgo #2 |
| **Proyección de septiembre** | $3.30M (si el Test no arranca) a $3.88M (si gasta todo) → **bajo el tope** |

Agosto se pasó en $602.916. El tope no está en riesgo en septiembre porque
Seba apagó la campaña 11 y el conjunto `01-TEST` el 7-sep.

## Conversión y medición
| | |
|---|---|
| **Destino** | **Formulario nativo de Meta** (instantáneo) |
| **Objetivo de campaña** | Clientes Potenciales (`OUTCOME_LEADS`) |
| **Píxel** | ? — los conjuntos activos tienen `promoted_object.pixel_id = null` |
| **API de Conversiones** | ❌ |
| **`ctwa_clid`** | no aplica (no es WhatsApp) |
| **% de cierre lead → venta** | ? — se asume 5% como estándar mientras no lo entreguen |
| **Quién responde y en cuánto** | ? |

> ⚠️ **Trampa de métrica documentada en esta cuenta.** El campo `lead` a nivel
> de anuncio es más amplio que `results` (`actions:leadgen.other`) a nivel de
> campaña: 1.765 vs 1.071 leads en la misma ventana. **Nunca mezclar los dos en
> un mismo reporte.** Toda esta ficha usa `actions:leadgen.other`.

## Las 7 Maletas
1. **Público** — personas con deudas vencidas y/o publicadas en DICOM, 25–60, Chile
2. **Problema principal** — deuda impagable + puertas cerradas (crédito, arriendo, trabajo)
3. **Solución** — asesoría legal para reprogramar o extinguir la deuda
4. **Diferencial menos mencionado en el mercado** — ?
5. **Testimonios disponibles** — ?
6. **Objeción #1** — ?
7. **Garantía** — ?

## ADN
| | |
|---|---|
| **Nivel de consciencia dominante del copy** | Consciente del problema (los ganchos nombran el síntoma: “sigues apareciendo en DICOM”, “te cerraron las puertas”) |
| **¿Tiene material para hablarle a gente fría?** | Sí — 3 reels propios de HEAT + material heredado de la agencia anterior |
| **Tipo de oferta** | **servicio** |
| **3 deseos de Reiss** *(con evidencia)* | ? — falta validar |
| **2 perfiles de comprador** | ? |

---

## Estructura real de la cuenta (7-sep-2026)

Toda referencia a un anuncio va con su campaña y su conjunto. Sin excepción.

### Campañas — últimos 30 días
| Campaña | ID | Estado | Objetivo | Gasto 30d | Leads | CPL |
|---|---|---|---|---|---|---|
| `01-🟦DEUDA-CLIENTES POTENCIALES FORM FB-ABO` | `120205650356490060` | ACTIVE | LEADS | $2.903.913 | 440 | $6.600 |
| `Clientes Potenciales \| Meta Form \| HEAT` | `120250454599080060` | ACTIVE | LEADS | $413.998 | 391 | **$1.059** |
| `08-🟢🔵--RECONOCIMIENTO-VIDEO VIEW--ASISTENCIA LEGAL--ABO` | `120214291879560060` | ACTIVE | AWARENESS | $150.010 | — | — |
| `11-✅CAMPAÑ UNIFICADA-LEADS DEUDAS-ABO` | `120227219834480060` | **PAUSED** (7-sep) | LEADS | $1.121.801 | 240 | $4.674 |
| **Total cuenta** | | | | **$4.589.722** | | |

El resto del historial (≈40 campañas) está en pausa y no gasta.

### Conjuntos de anuncios activos
Gasto real = promedio diario medido entre el 24-ago y el 6-sep (14 días).

| Campaña | Conjunto | ID | Presupuesto | Gasto real/día | % que usa | Leads/día | CPL | Optimización |
|---|---|---|---|---|---|---|---|---|
| 01 | `AUDIENCIA GANADORA - Copia` | `120250595017530060` | $65.085 | $65.067 | 100% | 10,3 | $6.326 | **QUALITY_LEAD** |
| 01 | `03- UBICACIONES REEL IG REGLA EDAD DE 30 A 55` | `120250406176740060` | $20.000 | $19.777 | 99% | 3,1 | $6.293 | LEAD_GENERATION |
| HEAT | `Meta Form \| HEAT` | `120250454599090060` | $30.000 | **$14.670** | **49%** | **14,4** | **$1.022** | LEAD_GENERATION |
| HEAT | `Meta Form \| HEAT - Test` | `120250911344120060` | $25.000 | **$0** | **0%** | 0 | — | LEAD_GENERATION |
| 08 | `RETARGTN SMART RECORDATORIO` | `120238352951680060` | $3.000 | ~$3.000 | 100% | (recall $18) | — | AWARENESS |
| | **Total** | | **$143.085** | **≈$102.500** | | **27,8** | | |

### Públicos — son distintos, no se solapan como parecía
| Conjunto | Geografía | Edad | Intereses | Advantage+ audiencia | Exclusiones |
|---|---|---|---|---|---|
| `AUDIENCIA GANADORA - Copia` | 2 radios de 16 km en Santiago + Puente Alto | 25–55 | 12 intereses financieros (banca, préstamos, Santander, Scotiabank) + empleados de Banco Itaú | **ON** | `FORM-FB -LLENO Y ENVIADO 90D` |
| `03- UBICACIONES REEL IG` | Chile, ciudades de +1M hab. | 30–54 | — | **ON** | ninguna |
| `Meta Form \| HEAT` | **Todo Chile** | 30–60 | — | **OFF** | **ninguna** |
| `Meta Form \| HEAT - Test` | **Todo Chile** | 30–60 | — | **OFF** | **ninguna** |

### Anuncios de la campaña HEAT — últimos 30 días
| Conjunto | Anuncio | ID | Gasto | Leads | CPL | Diagnóstico de Meta |
|---|---|---|---|---|---|---|
| `Meta Form \| HEAT` | `Reel 1 - Meta Form` | `120250454599070060` | $373.905 | **381** | **$981** | Calidad Media · Interacción Media · **Conversión Superior al promedio** → “estás bien” |
| `Meta Form \| HEAT` | `Reel 2 - Meta Form` | `120250455215540060` | $33.494 | 7 | $4.785 | **Calidad 35% inferior · Interacción 35% inferior** → “baja calidad, no despierta interés” |
| `Meta Form \| HEAT` | `Reel 3 - Meta Form` | `120250455267720060` | $6.598 | 3 | $2.199 | sin muestra suficiente |
| `Meta Form \| HEAT` | `Prueba: Reel 2` / `Prueba: Reel 3` | `...242840` / `...242830` | $0 | 0 | — | 0 impresiones |
| `Meta Form \| HEAT - Test` | 5 anuncios (Reel 1 copia, Reel 2/3 copia, 2 estáticos DICOM) | — | $0 | 0 | — | 0 impresiones desde el 7-sep 12:36 |

**El Reel 1 es el único anuncio sano de toda la cuenta.** 381 de los 391 leads
de la campaña HEAT salen de él.

---

## Hallazgos abiertos

### 1. Los dos CPL no son comparables — corrige la lectura anterior
`AUDIENCIA GANADORA - Copia` optimiza a **`QUALITY_LEAD`**; `Meta Form | HEAT`
optimiza a **`LEAD_GENERATION`**. Son dos objetivos de optimización distintos
que producen dos tipos de lead distintos: QUALITY_LEAD filtra más duro y cobra
más caro por diseño.

Decir “$6.326 contra $1.022, por lo tanto uno es seis veces peor” **es un error
de lectura**. Puede que el lead caro cierre mucho mejor y termine siendo el
negocio. **No se corta `AUDIENCIA GANADORA` hasta cruzar ambos con las ventas
reales de Emma.**

### 2. `Meta Form | HEAT` gasta la mitad de lo que tiene asignado
Catorce días seguidos: $30.000 asignados, entre $11.622 y $19.852 gastados.
Frecuencia 1,03–1,08 y alcance de 3.000–7.000/día, o sea **no es saturación de
público**. Subirle el presupuesto no aumenta el gasto ni un peso — está topado
por entrega, no por plata.

Hipótesis a probar, en orden: (a) tiene `advantage_audience: OFF` mientras los
otros dos lo tienen ON; (b) un solo anuncio sostiene el conjunto y Meta no
encuentra más impresiones rentables a ese ritmo de conversión.

### 3. El conjunto `Meta Form | HEAT - Test` es una copia exacta del público
Mismo país, misma edad 30–60, mismas ubicaciones, misma optimización,
Advantage+ igualmente apagado. Es el mismo público que `Meta Form | HEAT`
compitiendo consigo mismo, y el original tiene historial de aprendizaje.
**Como test no mide nada**: si no cambia ni el público ni la optimización, no
hay variable que aislar. Para que sirva hay que cambiarle una cosa y una sola
(por ejemplo, Advantage+ ON).

### 4. Duplicar un anuncio dentro del mismo conjunto no le da entrega
`Prueba: Reel 2` y `Prueba: Reel 3` viven en `Meta Form | HEAT` con 0
impresiones. El presupuesto del conjunto va al anuncio con mejor rendimiento
esperado, y ese es el Reel 1. Para que un creativo nuevo reciba entrega tiene
que estar en un conjunto donde el Reel 1 **no** esté.

---

## Estado del encargo
- **Permiso:** Emma autorizó modificar todas las campañas heredadas (reunión del 7-sep).
- **Arquitectura:** convivencia HEAT + legado del cliente, en transición.
- **Objetivo declarado:** llegar a gestionar todas las campañas de la empresa.
- **Bloqueo técnico conocido:** el conector de Meta **no puede crear anuncios de
  formulario instantáneo** — requiere el permiso `pages_manage_ads` sobre la
  página, que la conexión MCP no solicita. Se montan a mano en Ads Manager.

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 7-sep | Pausa de la campaña `11-✅CAMPAÑ UNIFICADA-LEADS DEUDAS-ABO` completa | CPL $4.674 y solapamiento con la 01 | Gasto mensual a la baja | ✅ liberó ~$37.500/día |
| 7-sep | Pausa del conjunto `01-TEST [MERCADO FINANCIERO+ EDAD]` (campaña 01) | $6.937/lead, el peor de los que gastaban | Gasto mensual a la baja | ✅ liberó $10.000/día |
| 7-sep | Pausa de un conjunto en la campaña `08` de reconocimiento; se deja solo `RETARGTN SMART` con $3.000 | Reconocimiento no es la prioridad con el tope encima | Gasto mensual a la baja | ✅ |
| 7-sep | Se crea el conjunto `Meta Form \| HEAT - Test` con 5 anuncios ($25.000/día) | Dar entrega a creativos que el Reel 1 ahogaba | Impresiones > 0 | ❌ **0 impresiones**. Público idéntico al original, ver hallazgo #3 |
| 7-sep | Se duplican `Reel 2` y `Reel 3` como “Prueba:” dentro de `Meta Form \| HEAT` | Intentar darles entrega | Impresiones > 0 | ❌ **0 impresiones**, ver hallazgo #4 |
| 7-sep | Se fija techo de **$4.000.000/mes** = $129.000/día | Agosto cerró en $4.602.916 | Gasto mensual ≤ $4M | ⏳ septiembre proyecta $3,3–3,9M |

## Lo siguiente, en orden
1. **Pedirle a Emma el ticket promedio y el % de cierre**, separando leads de
   `AUDIENCIA GANADORA` (QUALITY_LEAD) de los del `Reel 1` (LEAD_GENERATION).
   Sin ese cruce toda decisión de presupuesto es a ciegas.
2. **Arreglar el conjunto Test**: cambiarle una sola variable respecto al
   original — lo más directo es encender Advantage+ audiencia — o apagarlo.
3. **Sacar el `Reel 2` de circulación**: Meta lo ubica en el 35% inferior en
   calidad y en interacción. No es que le falte presupuesto, es que no funciona.
4. **Reasignar presupuesto solo después del punto 1**, con el límite de −20%
   por ajuste para no reiniciar la fase de aprendizaje de cada conjunto.
