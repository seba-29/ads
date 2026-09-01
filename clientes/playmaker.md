# PLAYMAKER

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

> ✅ **Actualizada el 1-sep-2026 contra el conector de Meta.** La versión anterior daba la
> cuenta por `UNSETTLED`: el saldo se regularizó y hay una campaña corriendo desde el
> 18-ago con 501 leads acumulados.

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `231866284693734` |
| **Business Manager** | Negocio de Antonio Espinoza Nehgme |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE · con método de pago (verificado 1-sep-2026) |
| **Rubro** | Indumentaria deportiva personalizada (sublimación) · B2B institucional |
| **Web / IG** | https://playmaker.cl · fundada 2014, Santiago |
| **Contacto** | WhatsApp +56 9 2243 5283 · tel +56 9 8885 1907 · contacto@playmaker.cl |

## Los números (obligatorios — sin esto no hay recomendación de presupuesto)
| | |
|---|---|
| **Ticket promedio** | ❓ **BLOQUEANTE** — es la DECISIÓN 01 de la estrategia de Basti |
| **Margen** | ❓ **BLOQUEANTE** |
| **% dispuesto a invertir por cliente nuevo** | ❓ (se está usando 1/3 del margen como supuesto de trabajo) |
| **Meta de ventas mensual** | ❓ |
| **Inversión actual/mes** | USD 950 total → Meta USD 450 · Google Search USD 500 |
| **CPA objetivo** *(calculado)* | ❓ — depende de ticket y margen |
| **ROAS objetivo** *(calculado)* | ❓ |
| **NÚMERO MÁGICO** *(ROAS mínimo o CPA/CPL máximo)* | ❓ — con cierre 5% el CPL máximo cae a $1.000-$3.333 CLP (ver `playmaker/google-ads-futbol.md` §3) |

## Conversión y medición
| | |
|---|---|
| **Destino** | Formulario nativo de Meta (hoy) · web + WhatsApp (Google) |
| **Objetivo de campaña** | **Clientes Potenciales (formulario nativo)** |
| **Píxel** | ❓ verificar |
| **API de Conversiones** | ❓ verificar |
| **`ctwa_clid`** | n/a — hoy no corre WhatsApp |
| **% de cierre lead → venta** | **5%** (250 leads → 10 cierres, dato de la estrategia de Basti) |
| **Quién responde y en cuánto** | SLA definido: contacto ≤1 h, cotización ≤24 h. Cumplimiento real ❓ |

## Las 7 Maletas
1. **Público** — Dirigentes de clubes, academias de fútbol, colegios y universidades. ICP: pedidos de **12+ unidades**.
2. **Problema principal** — Caos operativo del dirigente: tallas, sponsors, fechas, aprobaciones. Teme el desorden más que la falta de diseño.
3. **Solución** — Brief → concepto → diseño → tallaje → producción → QA → entrega. Un proveedor coordinado para toda la temporada.
4. **Diferencial menos mencionado** — **Certeza operacional**: mockup antes de producir, fecha cerrada, reposición planificada. La competencia vende tela; Playmaker vende que la entrega llega.
5. **Testimonios disponibles** — Club Manquehue, Stade Français Rugby, Santiago Morning, The English Institute, Boston College, CD Rex Vóley, British Royal School, Colegio Pioneros Chicureo, Atlético Colina. ⚠️ Falta confirmar cuáles son **publicables y pautables** (DECISIÓN 03 de la estrategia).
6. **Objeción #1** — "¿Va a llegar a tiempo y va a llegar como lo aprobé?"
7. **Garantía** — ❓ sin definir formalmente

## ADN
| | |
|---|---|
| **Nivel de consciencia dominante del copy** | Consciente del problema → consciente de la solución |
| **¿Tiene material para hablarle a gente fría?** | Sí. El creativo ganador es **foto de estudio de producto, fondo neutro**, sin video |
| **Tipo de oferta** | Producto físico a pedido · B2B institucional · ticket medio-alto |
| **3 deseos de Reiss** | Estatus (reconocimiento del club) · Orden (certeza operacional) · Aceptación social (pertenencia) |
| **2 perfiles de comprador** | Dirigente institucional (ordena el caos) · Club que quiere identidad propia |

## Estado actual de la cuenta

**Meta — campaña activa `Clientes Potenciales | Meta form`** (desde 18-ago-2026):

| Métrica | Valor |
|---|---:|
| Gasto | $208.953 CLP |
| Leads (formulario) | **501** |
| CPL | **$417 CLP** |
| CTR / CPC / CPM | 2,39% · $34 · $818 CLP |
| Frecuencia | 1,95 |

Un solo conjunto (`Amplio | Meta Form`, público abierto), cinco anuncios:

| Anuncio | Gasto | % gasto | Leads | CPL |
|---|---:|---:|---:|---:|
| Prueba: basquet | $151.428 | **72,5%** | 409 | $370 |
| Prueba: diamante | $51.951 | 24,9% | 86 | $604 |
| Prueba: No somos la marca para ti | $3.280 | 1,6% | 3 | $1.093 |
| **Prueba: Fut 01** | **$1.535** | **0,7%** | 2 | $768 |
| La Clásica | $759 | 0,4% | 1 | $759 |

> ⚠️ **Meta le dio el 0,7% del presupuesto a fútbol (1.120 impresiones).** No es un
> veredicto sobre fútbol: es un veredicto sobre el reparto. Por eso fútbol va a Google.

> ⚠️ **El problema no es volumen de leads: son 501 en 14 días a $417.** El cuello de
> botella es calificación y SLA — cierre del 5%. Traer más leads baratos empeora el
> problema. Ver `playmaker/google-ads-futbol.md` §3.

**Historial:** inversión total en Meta $610.768 CLP. Play_WP_RM (2023) hizo 346
conversaciones a $619. El gancho "Personalizador" sostuvo ~$190.000 CLP y ~300
conversaciones. La campaña de Ventas (2024) marcó el mejor CTR histórico: 4,56%.

**Google Ads:** acceso a la cuenta ya obtenido. Build completo listo en
[`playmaker/google-ads-futbol.md`](playmaker/google-ads-futbol.md) + CSV en
`playmaker/build/`. **Sin encender** — falta el checklist bloqueante.

**Material pendiente:** grabación de video para refrescar campañas. No bloquea Google.

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 2026-08-18 | Se lanzó `Clientes Potenciales \| Meta form` | Reactivar la cuenta tras el impago | Leads | 501 leads a $417 en 14 días. Volumen ✅, calidad ❓ |
| 2026-09-01 | Build de Google Ads (fútbol) documentado, sin encender | Estrategia de Basti: separar canales por deporte | Cotizaciones 12+ | Pendiente de lanzamiento |
