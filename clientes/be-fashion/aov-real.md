# Be Fashion — AOV real (export de órdenes)

**Fuente:** export de órdenes de Shopify · **Ventana: 13-20 de agosto de 2026 (8 días)**
**Universo:** 50 órdenes · 93 líneas de producto · 49 órdenes válidas (1 cancelada)

> ⚠️ **El archivo original contenía datos personales de clientas** (emails, direcciones,
> teléfonos). **No se versiona en el repo** — ver `.gitignore`. Este documento guarda
> solo los agregados.

> ⚠️ **Muestra chica y ventana corta.** 8 días no es un promedio anual, y agosto puede
> tener estacionalidad. Úsalo como orden de magnitud, no como verdad. Repetir el
> ejercicio con 90 días cuando se pueda.

---

## 1. AOV — el número que faltaba

| Métrica | Todas las órdenes | Solo joyería (10 órdenes) |
|---|---:|---:|
| **AOV (promedio)** | **$232.624** | **$227.987** |
| **Mediana** | **$179.990** | $179.990 |
| P25 / P75 | $129.990 / $299.980 | — |
| Mín / Máx | $45.480 / $769.960 | $99.990 / $489.970 |
| Ingreso del período | $11.398.581 | — |

**Unidades por orden: 1,86 en promedio · mediana 2 · el 55% compra más de una pieza.**

### Lecturas

**El AOV real ($232.624) es MAYOR que el precio de catálogo ($191.854).** No es
contradicción: la gente compra más de una pieza. Eso mejora la economía del canal — el
CPA que se puede pagar es más alto de lo que sugería el catálogo.

**El AOV de joyería pura ($227.987) es prácticamente igual al general.** Buena noticia
para el modelo: no hace falta separar la matemática por categoría. *Pero son solo 10
órdenes* — dato frágil.

**Promedio vs. mediana:** $232.624 contra $179.990. La diferencia dice que hay órdenes
grandes que estiran el promedio. **Para fijar la puja conviene usar la mediana** — es el
escenario conservador.

---

## 2. Mix de producto — el hallazgo incómodo

| Categoría | Unidades | Ingreso |
|---|---:|---:|
| **Otros (carteras, calzado, accesorios)** | 68 u (73%) | **71%** |
| **Joyería** | 25 u (27%) | **29%** |

| Marca | Unidades | % del ingreso |
|---|---:|---:|
| **UNOde50** | 21 | **26%** ← la #1 de toda la tienda |
| Coach | 15 | 16% |
| **Tous** | 14 | **16%** |
| Pinko | 7 | 14% |
| Michael Kors | 8 | 8% |
| Kate Spade | 4 | 3% |
| Lola Casademunt | 3 | 2% |

### Esto refina la tesis, no la invalida

La joyería es **menos de un tercio del negocio**. Las carteras son el grueso.

Pero la tesis de Seba era sobre **competitividad en Google**, no sobre qué vende más — y
ahí sigue en pie, con una precisión importante:

> **UNOde50 es la oportunidad real.** Es la marca #1 en ingresos de toda la tienda
> (26%), es el 67% del catálogo de joyas, tiene demanda de búsqueda propia, y **es una
> marca que Falabella y Paris no suelen tener**.

En cambio "Michael Kors" o "Coach" sí los tiene el retail grande — ahí la subasta es
cuesta arriba, tal como Seba anticipó. **Tous y Pandora quedan en zona intermedia**:
tienen demanda propia, pero el retail grande también los vende.

**Orden de prioridad que se desprende:**
1. **UNOde50** — defendible, alto ingreso, bajo solapamiento con el retail grande
2. **Tous** — buena demanda, competencia media
3. Genéricos de joyería — más caro, menor intención
4. Carteras de marca reconocida — **fuera del test**, como se decidió

---

## 3. Puja y presupuesto

**Margen declarado por el cliente: 30-40%.**

### La puja a usar (reservando ~1/3 del margen como utilidad)

| Margen | % a invertir | ROAS objetivo | CPA máximo | **CPC máx @2%** |
|---:|---:|---:|---:|---:|
| 30% | 20% | 5,00× | $46.525 | **$930** |
| 35% | 24% | 4,17× | $55.830 | **$1.117** |
| 40% | 27% | 3,70× | $62.808 | **$1.256** |

**Chequeo conservador con la mediana ($179.990):** CPC máximo entre **$720 y $972**.

> **Recomendación de arranque: límite de CPC en $800 CLP.** Está dentro del rango
> conservador en los tres escenarios de margen. Se sube después con datos reales.

### Presupuesto del test (30 días, ~30 conversiones)

| Conversión | CPC $600 | CPC $900 | CPC $1.200 |
|---|---:|---:|---:|
| 1,5% | $40.000/día | $60.000/día | $80.000/día |
| **2,0%** | **$30.000/día** | **$45.000/día** | $60.000/día |
| 3,0% | $20.000/día | $30.000/día | $40.000/día |

**Escenario base sugerido: ~$40.000 CLP/día durante 30 días (~$1.200.000 total).** Con
menos, el test no junta las ~30 conversiones que hacen falta para concluir algo y para
poder pasar a puja por conversiones.

---

## 4. Qué falta para cerrar

- [ ] **Confirmar el margen exacto** dentro del rango 30-40% (cambia el CPC en ~$300)
- [ ] **Repetir este análisis con 90 días** cuando haya datos — 8 días es una foto
- [ ] Validar que la tasa de conversión del sitio esté en el rango 1,5-3% asumido
      (sale de GA4 o de Shopify Analytics)
