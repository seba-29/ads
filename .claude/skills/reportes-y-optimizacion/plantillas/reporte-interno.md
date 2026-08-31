# [CLIENTE] — Ventana del [fecha inicio] al [fecha fin]

> Uso interno. El reporte del cliente es otro documento: `reporte-cliente.md`.

## Antes de mirar métricas
| | |
|---|---|
| **Última edición** | [fecha] — hace __ días *(si < 7, NO se optimiza)* |
| **Último cambio registrado** | [qué se cambió y qué métrica debía moverse] |
| **¿Se cumplió?** | ✅ / ❌ / sin datos |
| **Atribución** | ✅ confiable / ⚠️ [qué está roto] |
| **CPA objetivo** | $____ / ⛔ falta ticket y margen → lectura provisional |

## Q1 — ¿Qué pasó?
| | Últimos 7d | 7d anteriores | Últimos 30d |
|---|---|---|---|
| Gasto | | | |
| Resultados | | | |
| Costo por resultado | | | |
| Banda de ruido (1/√n) | ±__% | | |

**Veredicto:** 🟢 / 🟡 / 🔴 / ⚪ / 📋 — [desviación vs. objetivo, dentro o fuera de la banda]

## Q2 — ¿Por qué pasó?
*Se lee de arriba hacia abajo y se para en la primera que falla.*

| Métrica | Valor | Umbral | ¿Falla? |
|---|---|---|---|
| CPM | | contexto | |
| Captura 3 seg | __% | 20-25% | |
| Tiempo prom. video | __s | 5-7s | |
| CTR único enlace | __% | 2% frío · 3% retargeting | |
| Tasa de conversión | __% | 50-60% | |
| Frecuencia 7d | | 3-5 | |

**Primera métrica que falla:** ____

## Q3 — ¿Qué haremos?
- **Acción:** [una sola por conjunto]
- **Métrica que debe moverse:** ____
- **Se revisa el:** [fecha, mínimo 5-7 días]

## Para la bitácora de la ficha
```
| [fecha] | [qué se cambió] | [por qué] | [métrica esperada] | (pendiente) |
```
