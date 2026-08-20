# Análisis de precios — Categoría "Joyas y Bisutería" (BEFASHION)

**Fuente:** https://befashion.cl/collections/joyas-y-bisuteria (catálogo público de Shopify, `products.json`)
**Fecha de extracción:** 20 de agosto de 2026
**Universo:** 104 productos / 154 variantes
**Moneda:** peso chileno (CLP)

---

## 1. Nota metodológica (leer antes de usar estos datos)

Este documento mide el **precio promedio del catálogo publicado**, que NO es lo mismo que el
**ticket promedio real de venta**. La diferencia importa:

| Concepto | Qué mide | Se puede calcular con estos datos |
|---|---|---|
| Precio promedio de catálogo | Cuánto cuesta, en promedio, un producto listado | Sí — es lo que contiene este informe |
| Ticket promedio (AOV) | Cuánto gasta en promedio un cliente por orden | No — requiere datos de órdenes de Shopify |
| Precio promedio de venta (ASP) | Precio medio ponderado por unidades vendidas | No — requiere datos de ventas |

Para obtener el AOV real se necesita el export de órdenes del admin de Shopify o el reporte
de Analytics. Este informe sirve como base de posicionamiento y estructura de surtido.

**Criterios aplicados:**

- Se usa el **precio mínimo de las variantes** de cada producto (los precios por talla son idénticos en todos los casos revisados).
- Se **excluye** de los cálculos el producto "Cinturon Carolina Herrera Negro", que figura con precio $0 y sin stock (registro incompleto). Universo de cálculo: **103 productos**.
- "Disponible" = al menos una variante con stock.
- Los precios comparativos (`compare_at_price`) se reportan solo cuando son mayores al precio de venta.

---

## 2. Resumen ejecutivo

| Métrica | Catálogo completo (103) | Solo disponibles (97) |
|---|---:|---:|
| **Precio promedio** | **$191.854** | **$188.335** |
| Mediana | $199.990 | $199.990 |
| Mínimo | $19.990 | $19.990 |
| Máximo | $599.990 | $599.990 |
| Percentil 25 | $154.990 | $149.990 |
| Percentil 75 | $229.990 | $229.990 |
| Percentil 90 | $257.990 | $249.990 |
| Desviación estándar | $75.108 | $72.874 |
| Valor total del surtido | $19.760.983 | $18.268.540 |

**Solo joyería pura** (aros, anillos, pulseras, collares — se excluyen cartera, sandalias y cinturón,
que están mal categorizados): 101 productos, promedio **$192.386**, mediana $199.990.

### Las tres cifras que importan

1. **Precio promedio de catálogo: $188.335** (productos disponibles).
2. **Mediana: $199.990** — el precio "típico" de la categoría es prácticamente $200.000 exactos.
3. **Rango intercuartil: $149.990 – $229.990** — la mitad central del surtido vive en una franja de solo $80.000.

---

## 3. Distribución de precios

| Rango | N° productos | % del catálogo |
|---|---:|---:|
| Menos de $100.000 | 13 | 12.6% |
| $100.000 – $149.999 | 13 | 12.6% |
| $150.000 – $199.999 | 43 | 41.7% |
| $200.000 – $249.999 | 23 | 22.3% |
| $250.000 – $299.999 | 7 | 6.8% |
| $300.000 o más | 4 | 3.9% |

La categoría está fuertemente concentrada: **66 de 103 productos (64%)**
se ubican entre $150.000 y $250.000. La desviación estándar de $75.108 está inflada por
un puñado de collares UNOde50 sobre $300.000; sin ellos la dispersión real es mucho menor.

---

## 4. Análisis por tipo de producto

| Tipo | N° | % | Promedio | Mediana | Mín | Máx |
|---|---:|---:|---:|---:|---:|---:|
| Aros | 34 | 33% | $164.872 | $169.990 | $69.990 | $329.990 |
| Anillo | 25 | 24% | $200.390 | $199.990 | $19.990 | $299.990 |
| Pulsera | 24 | 23% | $193.574 | $194.990 | $79.990 | $249.990 |
| Collar | 18 | 17% | $231.657 | $199.990 | $89.990 | $599.990 |
| Cartera | 1 | 1% | $249.990 | $249.990 | $249.990 | $249.990 |
| Sandalias | 1 | 1% | $79.990 | $79.990 | $79.990 | $79.990 |

**Lecturas:**

- **Collares** son el tipo más caro (promedio $231.657) y el de mayor dispersión: concentra las piezas de $380.000–$600.000.
- **Aros** son la puerta de entrada de la categoría (promedio $164.872) y el tipo con más SKUs.
- **Anillos y pulseras** se comportan casi idénticos, ambos con mediana en torno a $190.000–$200.000.
- Tres productos no son joyería (cartera Pinko, sandalias Melissa, cinturón Carolina Herrera) y ensucian los promedios de la categoría.

---

## 5. Análisis por marca

| Marca | N° | % | Promedio | Mediana | Mín | Máx |
|---|---:|---:|---:|---:|---:|---:|
| UNOde50 | 69 | 67% | $206.454 | $199.990 | $19.990 | $599.990 |
| Tous | 17 | 17% | $203.726 | $219.990 | $99.990 | $329.990 |
| Lola Casademunt | 8 | 8% | $72.490 | $69.990 | $69.990 | $89.990 |
| Pandora | 2 | 2% | $201.242 | $201.242 | $172.493 | $229.990 |
| Tory Burch | 2 | 2% | $179.990 | $179.990 | $179.990 | $179.990 |
| Kate Spade | 2 | 2% | $89.990 | $89.990 | $79.990 | $99.990 |
| Swarovski | 1 | 1% | $199.990 | $199.990 | $199.990 | $199.990 |
| Pinko | 1 | 1% | $249.990 | $249.990 | $249.990 | $249.990 |
| Melissa | 1 | 1% | $79.990 | $79.990 | $79.990 | $79.990 |

**Lecturas:**

- **UNOde50 define la categoría**: dos tercios del surtido y el promedio más alto entre las marcas con volumen relevante.
- **Tous** es el segundo pilar, con un ticket casi idéntico al de UNOde50 pero surtido más acotado.
- **Lola Casademunt** es la única marca de entrada real: 8 productos entre $69.990 y $89.990, todos muy por debajo del promedio de la categoría.
- El resto (Pandora, Tory Burch, Kate Spade, Swarovski, Pinko, Melissa) suma solo 9 productos: presencia testimonial, sin masa crítica para sostener una propuesta de marca.

---

## 6. Promociones y disponibilidad

| Indicador | Valor |
|---|---:|
| Productos con precio rebajado | 22 de 103 (21%) |
| Descuento promedio (sobre los rebajados) | 24% |
| Productos agotados | 7 de 104 (7%) |
| Total de variantes | 154 |
| Promedio de variantes por producto | 1.5 |

---

## 7. Extremos del catálogo

### Top 10 más caros

| # | Producto | Marca | Precio |
|---:|---|---|---:|
| 1 | Collar Uno de 50 Unstoppable Doble baño de oro 18k con Topacios blancos | UNOde50 | $599.990 |
| 2 | Collar Uno de 50 Impressive Doble baño oro 18k con topacios | UNOde50 | $399.990 |
| 3 | Collar Uno de 50 Ovni doble baño en oro de 18k con eslabones ovalados grandes y Perla en el centro | UNOde50 | $379.990 |
| 4 | Aros Tous motivo oso de plata y zafiro azul creado en laboratorio 13 mm | Tous | $329.990 |
| 5 | Anillo Uno de 50 Cosmos Solitario Doble baño de oro 18k con piedra circonita | UNOde50 | $299.990 |
| 6 | Anillo Tous mediano de plata y espinela azul creada en laboratorlo Icon Color LGG | Tous | $259.990 |
| 7 | Anillo Tous mediano de plata y motivo oso en nácar Icon | Tous | $259.990 |
| 8 | Anillo Tous mediano de plata y motivo oso en ónix | Tous | $259.990 |
| 9 | Aros Tous de plata y espinela azul | Tous | $259.990 |
| 10 | Aros Uno de 50 Solitario Doble baño de oro 18k con piedra circonita | UNOde50 | $259.990 |

### Top 10 más económicos

| # | Producto | Marca | Precio |
|---:|---|---|---:|
| 1 | Anillo Uno de 50 de plata abierto con topacios | UNOde50 | $19.990 |
| 2 | Aros Lola Casademunt boton cara tigre joya | Lola Casademunt | $69.990 |
| 3 | Aros Lola Casademunt combinado con medallón acrílico | Lola Casademunt | $69.990 |
| 4 | Aros Lola Casademunt de con charms de coral y perla | Lola Casademunt | $69.990 |
| 5 | Aros Lola Casademunt grandes efecto piel pieza metálica burdeo | Lola Casademunt | $69.990 |
| 6 | Aros Lola Casademunt metálico y lacado | Lola Casademunt | $69.990 |
| 7 | Aros Lola Casademunt corazon dorado | Lola Casademunt | $69.990 |
| 8 | Aros Lola Casademunt con corazon infinito | Lola Casademunt | $69.990 |
| 9 | Pulsera Kate Spade Minnie circon negro cadena dorada | Kate Spade | $79.990 |
| 10 | Sandalias Melissa Charol Negro | Melissa | $79.990 |

> **Alerta de dato:** el "Anillo Uno de 50 de plata abierto con topacios" figura a $19.990 con precio
> comparativo de $249.990 (92% de descuento). Es un outlier de casi 10x respecto al resto de anillos
> UNOde50 y muy probablemente un error de carga. Conviene verificarlo antes de tomar decisiones sobre él.

---

## 8. Conclusiones y oportunidades

1. **Posicionamiento claro de gama alta.** Con mediana en $199.990 y el 63% del surtido entre
   $150.000 y $250.000, la categoría está definida como joyería de marca premium, no como bisutería
   de impulso. El precio no es una variable de diferenciación dentro del catálogo.

2. **Hueco en el precio de entrada.** Bajo $100.000 solo hay 13 productos, y 8 de ellos son de
   una sola marca (Lola Casademunt). Si el objetivo es aumentar volumen, conversión o captar
   compradores primerizos, esta franja está prácticamente vacía.

3. **Dependencia de una marca.** UNOde50 concentra el 66% del surtido. Cualquier problema de
   abastecimiento, cambio de condiciones comerciales o pérdida de la representación golpearía
   directamente a toda la categoría.

4. **Higiene de catálogo pendiente.** Tres productos no son joyas, uno tiene precio $0 y otro
   presenta un descuento del 92% que parece erróneo. Son cinco registros sobre 104 (casi 5%) que
   distorsionan cualquier análisis automatizado.

5. **Presión promocional moderada.** El 21% del surtido está rebajado, con descuento promedio del
   24%. Es un nivel razonable, pero conviene revisar si las rebajas se concentran en el
   inventario antiguo o si están erosionando el margen de los productos de mayor rotación.

6. **Próximo paso recomendado.** Cruzar este catálogo con el export de órdenes de Shopify para
   obtener el ticket promedio real, la tasa de conversión por rango de precio y el mix de venta.
   Solo entonces se puede saber si el consumidor efectivamente compra en la franja de $200.000 o si
   se concentra en la cola baja del surtido.

---

## 9. Datos completos (104 productos)

| Producto | Marca | Tipo | Precio | Precio anterior | Stock |
|---|---|---|---:|---:|:---:|
| Collar Uno de 50 Unstoppable Doble baño de oro 18k con Topacios blancos | UNOde50 | Collar | $599.990 | $699.990 | Sí |
| Collar Uno de 50 Impressive Doble baño oro 18k con topacios | UNOde50 | Collar | $399.990 | — | No |
| Collar Uno de 50 Ovni doble baño en oro de 18k con eslabones ovalados grandes y Perla en el centro | UNOde50 | Collar | $379.990 | — | Sí |
| Aros Tous motivo oso de plata y zafiro azul creado en laboratorio 13 mm | Tous | Aros | $329.990 | — | No |
| Anillo Uno de 50 Cosmos Solitario Doble baño de oro 18k con piedra circonita | UNOde50 | Anillo | $299.990 | — | Sí |
| Anillo Tous mediano de plata y espinela azul creada en laboratorlo Icon Color LGG | Tous | Anillo | $259.990 | — | Sí |
| Anillo Tous mediano de plata y motivo oso en nácar Icon | Tous | Anillo | $259.990 | — | Sí |
| Anillo Tous mediano de plata y motivo oso en ónix | Tous | Anillo | $259.990 | — | Sí |
| Aros Tous de plata y espinela azul | Tous | Aros | $259.990 | — | Sí |
| Aros Uno de 50 Solitario Doble baño de oro 18k con piedra circonita | UNOde50 | Aros | $259.990 | — | Sí |
| Anillo Uno de 50 Ladies doble baño de oro con 3 piedras cuadradas gris | UNOde50 | Anillo | $259.990 | — | Sí |
| Pulsera Uno de 50 Kingdom Esclava Doble baño Oro 18k con Ónix Negro | UNOde50 | Pulsera | $249.990 | — | Sí |
| Pulsera Uno de 50 Victory Topaz doble baño de oro con topacios | UNOde50 | Pulsera | $249.990 | — | Sí |
| Collar Uno de 50 Titanic Cadena plateada gruesa con cristal azul grande | UNOde50 | Collar | $249.990 | $349.990 | Sí |
| Collar Uno de 50 de cuero con doble baño de oro 18k y piedras grises | UNOde50 | Collar | $249.990 | — | Sí |
| Anillo Uno de 50 Cosmos solitario de plata con brillante transparente | UNOde50 | Anillo | $249.990 | — | Sí |
| Aros Uno de 50 de plata tipo argollas con 4 cristales | UNOde50 | Aros | $249.990 | — | Sí |
| Cartera Pinko Shoulderbag Classic Grande Charol Plateado corazon dorado | Pinko | Cartera | $249.990 | — | Sí |
| Aros Uno de 50 Stand out Doble baño de oro 18k con Topacios blancos | UNOde50 | Aros | $249.990 | — | Sí |
| Pulsera Tous cadena motivo oso de plata y zafiro lila creado en laboratorio | Tous | Pulsera | $233.500 | — | Sí |
| Anillo Uno de 50 TITANIC Cristal Azul grande | UNOde50 | Anillo | $229.990 | — | Sí |
| Pulsera Uno de 50 Esclava delgada Doble baño de oro 18k con Ónix | UNOde50 | Pulsera | $229.990 | — | Sí |
| Pulsera Pandora De Cadena Nudo Infinito Grueso | Pandora | Pulsera | $229.990 | — | Sí |
| Pulsera Uno de 50 Madame doble baño de oro de 18k mitad cuero con piedra tipo onix negro | UNOde50 | Pulsera | $229.990 | — | No |
| Collar Tous de plata y espinela azul creada en laboratorio | Tous | Collar | $229.990 | — | Sí |
| Pulsera Tous cadena de plata y espinela azul | Tous | Pulsera | $229.990 | — | Sí |
| Pulsera Uno de 50 Kingdom 2 cristales Azul | UNOde50 | Pulsera | $229.990 | — | Sí |
| Pulsera Uno de 50 piedra grande azul redonda | UNOde50 | Pulsera | $229.990 | — | Sí |
| Aros Uno de 50 Ser Deslumbrantes colgantes plata Cristal grafito | UNOde50 | Aros | $219.990 | $249.990 | Sí |
| Pulsera Uno de 50 Little moon Doble baño de oro delgada con una perla en el centro | UNOde50 | Pulsera | $219.990 | — | Sí |
| Aros Tous celeste de plata y espinela azul creada en laboratorio Icon | Tous | Aros | $219.990 | — | Sí |
| Anillo Uno de 50 Aura Pink doble baño de oro dos cristales rosa | UNOde50 | Anillo | $219.990 | — | Sí |
| Collar uno de 50 De Cuero con Eslabones con topacios de plata | UNOde50 | Collar | $219.990 | — | Sí |
| Collar Uno de 50 Details con ovalos redondos y cristal celeste | UNOde50 | Collar | $209.990 | $299.990 | Sí |
| Pulsera Uno de 50 The Queen Doble baño de oro 18k con Cristal Rosa | UNOde50 | Pulsera | $199.990 | $269.990 | Sí |
| Pulsera Uno de 50 Splendid Doble baño de oro 18k Eslabones | UNOde50 | Pulsera | $199.990 | $249.990 | Sí |
| Collar Uno de 50 Anima Baño de Oro con Zirconia Blanca | UNOde50 | Collar | $199.990 | — | Sí |
| Collar Tous Corto Motivo oso de plata y zafiro azul creado en laboratorio | Tous | Collar | $199.990 | — | Sí |
| Collar Uno de 50 Darling cuero con doble baño de oro 18k y una perla al centro | UNOde50 | Collar | $199.990 | $279.990 | Sí |
| Anillo Uno de 50 tipo sello en plata de ley y forma de ojo con cristal facetado azul | UNOde50 | Anillo | $199.990 | — | Sí |
| Aros Uno de 50 Divine Cristal Azul | UNOde50 | Aros | $199.990 | — | Sí |
| Anillo Uno de 50 Kingdom 3 cristales azules | UNOde50 | Anillo | $199.990 | — | Sí |
| Aros Uno de 50 Electric Cadena Larga Cristal Azul | UNOde50 | Aros | $199.990 | — | Sí |
| Anillo Uno de 50 topacios con doble baño de oro 18k abierto con topacios | UNOde50 | Anillo | $199.990 | $299.990 | Sí |
| Anillo Uno de 50 rectangular piedra grande verde plata | UNOde50 | Anillo | $199.990 | — | Sí |
| Anillo Uno de 50 Piedra rosa amatista Ojo de la protección | UNOde50 | Anillo | $199.990 | — | Sí |
| Anillo Uno de 50 plateado dos rombos piedra transparente | UNOde50 | Anillo | $199.990 | — | Sí |
| Anillo Swarovski Luna | Swarovski | Anillo | $199.990 | — | Sí |
| Anillo Tous Sello con baño de oro 18 kt sobre plata y oso con iolitas Iris Motif talla 14 | Tous | Anillo | $199.990 | $279.990 | Sí |
| Collar Uno de 50 de cuero con una perla al centro | UNOde50 | Collar | $199.990 | — | Sí |
| Collar Uno de 50 cuero con perla y detalles en plata | UNOde50 | Collar | $199.990 | — | Sí |
| Aros Uno de 50 Superstition con doble baño de oro 18k largos con piedra transparente | UNOde50 | Aros | $199.990 | — | Sí |
| Aros Uno de 50 Doble baño oro 18k largos dorados con una piedra rectangular morada | UNOde50 | Aros | $199.990 | — | Sí |
| Anillo Uno de 50 Tesoro 3 piedras colores | UNOde50 | Anillo | $199.990 | — | Sí |
| Anillo Uno de 50 Ladies de Plata con 3 piedras cuadradas grises | UNOde50 | Anillo | $199.990 | — | Sí |
| Pulsera Uno de 50 de cuero con detalles en plata y piedra verde | UNOde50 | Pulsera | $189.990 | — | Sí |
| Pulsera Uno de 50 Darling Doble baño de oro terminaciones en cuero con perla | UNOde50 | Pulsera | $189.990 | — | Sí |
| Pulsera Uno de 50 Ser Deslumbrante doble baño oro 18k de cuero cafe cristal negro | UNOde50 | Pulsera | $189.990 | — | No |
| Aros uno de 50 corazon piedra rosa | UNOde50 | Aros | $179.990 | — | Sí |
| Anillo Tory Burch Bañado en Oro 18k con Perlas | Tory Burch | Anillo | $179.990 | — | Sí |
| Aros Tory Burch Baño de Oro 18k con circones | Tory Burch | Aros | $179.990 | — | Sí |
| Aros Uno de 50 To you Redondos cristal Verde | UNOde50 | Aros | $179.990 | — | Sí |
| Aros Uno de 50 Ser Magnetica Doble baño de oro 18k y piedra cuadrada verde | UNOde50 | Aros | $179.990 | — | Sí |
| Pulsera Pandora De Cadena Nudo Infinito Grueso | Pandora | Pulsera | $172.493 | $229.990 | No |
| Collar Uno de 50 Ser Indomable Plateado Choker | UNOde50 | Collar | $169.990 | — | Sí |
| Aros Uno de 50 Destellos colgantes gota piedra ovalada celeste | UNOde50 | Aros | $169.990 | — | Sí |
| Pulsera Uno de 50 doble de cuero verde con ojo bañado en plata de ley | UNOde50 | Pulsera | $169.990 | — | No |
| Pulsera Uno de 50 doble de cuero azul con ojo bañado en plata de ley | UNOde50 | Pulsera | $169.990 | — | Sí |
| Anillo Uno de 50 Furtune Topaz Libelula | UNOde50 | Anillo | $169.990 | — | Sí |
| Anillo Uno de 50 doble baño de oro Panal de abeja 3 cristales verdes | UNOde50 | Anillo | $169.990 | $199.990 | Sí |
| Aros Uno de 50 perla colgante de plata | UNOde50 | Aros | $169.990 | — | Sí |
| Pulsera uno de 50 Tres tiras Cristal gris | UNOde50 | Pulsera | $169.990 | $199.990 | Sí |
| Pulsera Uno de 50 de plata con piedra verde | UNOde50 | Pulsera | $169.990 | — | Sí |
| Aros uno de 50 Cristal fascetado gris | UNOde50 | Aros | $169.990 | $199.990 | Sí |
| Aros Uno de 50 Destellos colgantes gota piedra ovalada azul | UNOde50 | Aros | $169.990 | $199.990 | Sí |
| Pulsera Uno de 50 de cuero con piedra verde | UNOde50 | Pulsera | $159.990 | — | Sí |
| Aros Uno de 50 coleccion mall redondo con 4 puntas sosteniendo una perla al centro grande | UNOde50 | Aros | $159.990 | $199.990 | Sí |
| Pulsera Tous cadena oso bicolor | Tous | Pulsera | $149.990 | — | Sí |
| Aros Uno de 50 de botón bañados en plata con cristal facetado azul | UNOde50 | Aros | $149.990 | — | Sí |
| Anillo Uno de 50 Straight to the Heart forma de corazon plata con topacios blancos | UNOde50 | Anillo | $149.990 | $199.990 | Sí |
| Aros Uno de 50 Together con forma de óvalo y cristal color gris claro | UNOde50 | Aros | $149.990 | $199.990 | Sí |
| Aros Uno de 50 Superstition rombos plateados | UNOde50 | Aros | $149.990 | $169.990 | Sí |
| Anillo Uno de 50 Abeja y panal de cristales verdes | UNOde50 | Anillo | $149.990 | — | Sí |
| Collar Tous de plata y motivo oso en onix | Tous | Collar | $139.990 | — | Sí |
| Aros Tous de Plata de Primera Ley para Mujer con Oso en Onix de 10mm | Tous | Aros | $139.990 | — | Sí |
| Collar Tous con perla cultivada Camee | Tous | Collar | $129.990 | — | Sí |
| Aros Uno de 50 Ser Magnetica Doble baño de oro 18k y cristal cuadrada azul | UNOde50 | Aros | $129.990 | — | Sí |
| Anillo Uno de 50 Abejas abierto plata | UNOde50 | Anillo | $129.990 | — | Sí |
| Aros Uno de 50 Doble baño de oro 18k Eslabones | UNOde50 | Aros | $125.990 | $149.990 | Sí |
| Aros Tous con oso de plata, ónix y nácar | Tous | Aros | $119.990 | — | Sí |
| Pulsera Tous de plata Galaxy negro | Tous | Pulsera | $99.990 | — | Sí |
| Collar Kate Spade Full Circle Mini Pendent Dorado | Kate Spade | Collar | $99.990 | — | Sí |
| Collar Lola Casademunt ovalos combinados acrilico y metal | Lola Casademunt | Collar | $89.990 | $99.990 | Sí |
| Pulsera Kate Spade Minnie circon negro cadena dorada | Kate Spade | Pulsera | $79.990 | $99.990 | Sí |
| Sandalias Melissa Charol Negro | Melissa | Sandalias | $79.990 | — | Sí |
| Aros Lola Casademunt boton cara tigre joya | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt combinado con medallón acrílico | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt de con charms de coral y perla | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt grandes efecto piel pieza metálica burdeo | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt metálico y lacado | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt corazon dorado | Lola Casademunt | Aros | $69.990 | — | Sí |
| Aros Lola Casademunt con corazon infinito | Lola Casademunt | Aros | $69.990 | — | Sí |
| Anillo Uno de 50 de plata abierto con topacios | UNOde50 | Anillo | $19.990 | $249.990 | Sí |
| Cinturon Carolina Herrera Negro | CAROLINA HERRERA | Cinturón | $0 | — | No |

---

## 10. Datos en bruto (CSV para procesamiento)

```csv
producto,marca,tipo,precio_clp,precio_comparativo_clp,disponible
"Pulsera Uno de 50 de cuero con detalles en plata y piedra verde",UNOde50,Pulsera,189990,0,true
"Pulsera Uno de 50 de cuero con piedra verde",UNOde50,Pulsera,159990,0,true
"Pulsera Tous de plata Galaxy negro",Tous,Pulsera,99990,0,true
"Pulsera Tous cadena oso bicolor",Tous,Pulsera,149990,0,true
"Aros Tous con oso de plata, ónix y nácar",Tous,Aros,119990,0,true
"Anillo Uno de 50 TITANIC Cristal Azul grande",UNOde50,Anillo,229990,0,true
"Pulsera Uno de 50 The Queen Doble baño de oro 18k con Cristal Rosa",UNOde50,Pulsera,199990,269990,true
"Pulsera Uno de 50 Esclava delgada Doble baño de oro 18k con Ónix",UNOde50,Pulsera,229990,0,true
"Pulsera Uno de 50 Splendid Doble baño de oro 18k Eslabones",UNOde50,Pulsera,199990,249990,true
"Collar Uno de 50 Ser Indomable Plateado Choker",UNOde50,Collar,169990,0,true
"Collar Uno de 50 Anima Baño de Oro con Zirconia Blanca",UNOde50,Collar,199990,0,true
"Pulsera Uno de 50 Kingdom Esclava Doble baño Oro 18k con Ónix Negro",UNOde50,Pulsera,249990,0,true
"Collar Tous Corto Motivo oso de plata y zafiro azul creado en laboratorio",Tous,Collar,199990,0,true
"Aros Uno de 50 Ser Deslumbrantes colgantes plata Cristal grafito",UNOde50,Aros,219990,249990,true
"Aros uno de 50 corazon piedra rosa",UNOde50,Aros,179990,0,true
"Aros Uno de 50 Destellos colgantes gota piedra ovalada celeste",UNOde50,Aros,169990,0,true
"Pulsera Pandora De Cadena Nudo Infinito Grueso",Pandora,Pulsera,229990,0,true
"Pulsera Uno de 50 Darling Doble baño de oro terminaciones en cuero con perla",UNOde50,Pulsera,189990,0,true
"Pulsera Uno de 50 Little moon Doble baño de oro delgada con una perla en el centro",UNOde50,Pulsera,219990,0,true
"Pulsera Uno de 50 Madame doble baño de oro de 18k mitad cuero con piedra tipo onix negro",UNOde50,Pulsera,229990,0,false
"Collar Uno de 50 Ovni doble baño en oro de 18k con eslabones ovalados grandes y Perla en el centro",UNOde50,Collar,379990,0,true
"Collar Uno de 50 Darling cuero con doble baño de oro 18k y una perla al centro",UNOde50,Collar,199990,279990,true
"Anillo Uno de 50 tipo sello en plata de ley y forma de ojo con cristal facetado azul",UNOde50,Anillo,199990,0,true
"Pulsera Uno de 50 doble de cuero verde con ojo bañado en plata de ley",UNOde50,Pulsera,169990,0,false
"Pulsera Uno de 50 doble de cuero azul con ojo bañado en plata de ley",UNOde50,Pulsera,169990,0,true
"Aros Uno de 50 de botón bañados en plata con cristal facetado azul",UNOde50,Aros,149990,0,true
"Collar Tous con perla cultivada Camee",Tous,Collar,129990,0,true
"Collar Tous de plata y motivo oso en onix",Tous,Collar,139990,139990,true
"Collar Tous de plata y espinela azul creada en laboratorio",Tous,Collar,229990,0,true
"Aros Tous celeste de plata y espinela azul creada en laboratorio Icon",Tous,Aros,219990,219990,true
"Aros Tous de Plata de Primera Ley para Mujer con Oso en Onix de 10mm",Tous,Aros,139990,139990,true
"Pulsera Tous cadena de plata y espinela azul",Tous,Pulsera,229990,0,true
"Pulsera Tous cadena motivo oso de plata y zafiro lila creado en laboratorio",Tous,Pulsera,233500,0,true
"Aros Tous motivo oso de plata y zafiro azul creado en laboratorio 13 mm",Tous,Aros,329990,0,false
"Anillo Tous mediano de plata y espinela azul creada en laboratorlo Icon Color LGG",Tous,Anillo,259990,0,true
"Anillo Tous mediano de plata y motivo oso en nácar Icon",Tous,Anillo,259990,0,true
"Pulsera Uno de 50 Ser Deslumbrante doble baño oro 18k de cuero cafe cristal negro",UNOde50,Pulsera,189990,0,false
"Anillo Tory Burch Bañado en Oro 18k con Perlas",Tory Burch,Anillo,179990,0,true
"Cinturon Carolina Herrera Negro",CAROLINA HERRERA,Cinturón,0,0,false
"Anillo Tous mediano de plata y motivo oso en ónix",Tous,Anillo,259990,0,true
"Aros Tory Burch Baño de Oro 18k con circones",Tory Burch,Aros,179990,0,true
"Aros Tous de plata y espinela azul",Tous,Aros,259990,0,true
"Aros Lola Casademunt boton cara tigre joya",Lola Casademunt,Aros,69990,0,true
"Aros Lola Casademunt combinado con medallón acrílico",Lola Casademunt,Aros,69990,0,true
"Aros Lola Casademunt de con charms de coral y perla",Lola Casademunt,Aros,69990,0,true
"Aros Lola Casademunt grandes efecto piel pieza metálica burdeo",Lola Casademunt,Aros,69990,0,true
"Aros Lola Casademunt metálico y lacado",Lola Casademunt,Aros,69990,0,true
"Anillo Uno de 50 Furtune Topaz Libelula",UNOde50,Anillo,169990,0,true
"Aros Uno de 50 To you Redondos cristal Verde",UNOde50,Aros,179990,0,true
"Aros Uno de 50 Divine Cristal Azul",UNOde50,Aros,199990,0,true
"Aros Uno de 50 Ser Magnetica Doble baño de oro 18k y cristal cuadrada azul",UNOde50,Aros,129990,0,true
"Anillo Uno de 50 Kingdom 3 cristales azules",UNOde50,Anillo,199990,0,true
"Pulsera Uno de 50 Victory Topaz doble baño de oro con topacios",UNOde50,Pulsera,249990,0,true
"Pulsera Uno de 50 Kingdom 2 cristales Azul",UNOde50,Pulsera,229990,0,true
"Anillo Uno de 50 doble baño de oro Panal de abeja 3 cristales verdes",UNOde50,Anillo,169990,199990,true
"Aros Uno de 50 Electric Cadena Larga Cristal Azul",UNOde50,Aros,199990,0,true
"Aros Uno de 50 perla colgante de plata",UNOde50,Aros,169990,0,true
"Anillo Uno de 50 Aura Pink doble baño de oro dos cristales rosa",UNOde50,Anillo,219990,0,true
"Collar Uno de 50 Impressive Doble baño oro 18k con topacios",UNOde50,Collar,399990,0,false
"Collar Uno de 50 Titanic Cadena plateada gruesa con cristal azul grande",UNOde50,Collar,249990,349990,true
"Aros Lola Casademunt corazon dorado",Lola Casademunt,Aros,69990,0,true
"Aros Lola Casademunt con corazon infinito",Lola Casademunt,Aros,69990,0,true
"Anillo Uno de 50 topacios con doble baño de oro 18k abierto con topacios",UNOde50,Anillo,199990,299990,true
"Anillo Uno de 50 de plata abierto con topacios",UNOde50,Anillo,19990,249990,true
"Anillo Uno de 50 rectangular piedra grande verde plata",UNOde50,Anillo,199990,179990,true
"Anillo Uno de 50 Straight to the Heart forma de corazon plata con topacios blancos",UNOde50,Anillo,149990,199990,true
"Anillo Uno de 50 Piedra rosa amatista Ojo de la protección",UNOde50,Anillo,199990,199990,true
"Anillo Uno de 50 plateado dos rombos piedra transparente",UNOde50,Anillo,199990,199990,true
"Anillo Swarovski Luna",Swarovski,Anillo,199990,0,true
"Anillo Tous Sello con baño de oro 18 kt sobre plata y oso con iolitas Iris Motif talla 14",Tous,Anillo,199990,279990,true
"Aros Uno de 50 Doble baño de oro 18k Eslabones",UNOde50,Aros,125990,149990,true
"Collar Uno de 50 de cuero con una perla al centro",UNOde50,Collar,199990,0,true
"Collar uno de 50 De Cuero con Eslabones con topacios de plata",UNOde50,Collar,219990,0,true
"Collar Uno de 50 Details con ovalos redondos y cristal celeste",UNOde50,Collar,209990,299990,true
"Collar Uno de 50 cuero con perla y detalles en plata",UNOde50,Collar,199990,0,true
"Collar Uno de 50 de cuero con doble baño de oro 18k y piedras grises",UNOde50,Collar,249990,0,true
"Pulsera uno de 50 Tres tiras Cristal gris",UNOde50,Pulsera,169990,199990,true
"Pulsera Uno de 50 piedra grande azul redonda",UNOde50,Pulsera,229990,0,true
"Pulsera Uno de 50 de plata con piedra verde",UNOde50,Pulsera,169990,0,true
"Anillo Uno de 50 Cosmos solitario de plata con brillante transparente",UNOde50,Anillo,249990,0,true
"Aros Uno de 50 de plata tipo argollas con 4 cristales",UNOde50,Aros,249990,0,true
"Aros Uno de 50 Ser Magnetica Doble baño de oro 18k y piedra cuadrada verde",UNOde50,Aros,179990,0,true
"Aros Uno de 50 Solitario Doble baño de oro 18k con piedra circonita",UNOde50,Aros,259990,0,true
"Aros uno de 50 Cristal fascetado gris",UNOde50,Aros,169990,199990,true
"Aros Uno de 50 Superstition con doble baño de oro 18k largos con piedra transparente",UNOde50,Aros,199990,0,true
"Aros Uno de 50 Doble baño oro 18k largos dorados con una piedra rectangular morada",UNOde50,Aros,199990,0,true
"Aros Uno de 50 Together con forma de óvalo y cristal color gris claro",UNOde50,Aros,149990,199990,true
"Collar Kate Spade Full Circle Mini Pendent Dorado",Kate Spade,Collar,99990,0,true
"Aros Uno de 50 Destellos colgantes gota piedra ovalada azul",UNOde50,Aros,169990,199990,true
"Cartera Pinko Shoulderbag Classic Grande Charol Plateado corazon dorado",Pinko,Cartera,249990,0,true
"Anillo Uno de 50 Cosmos Solitario Doble baño de oro 18k con piedra circonita",UNOde50,Anillo,299990,0,true
"Aros Uno de 50 Stand out Doble baño de oro 18k con Topacios blancos",UNOde50,Aros,249990,0,true
"Collar Uno de 50 Unstoppable Doble baño de oro 18k con Topacios blancos",UNOde50,Collar,599990,699990,true
"Aros Uno de 50 Superstition rombos plateados",UNOde50,Aros,149990,169990,true
"Anillo Uno de 50 Tesoro 3 piedras colores",UNOde50,Anillo,199990,0,true
"Anillo Uno de 50 Abeja y panal de cristales verdes",UNOde50,Anillo,149990,0,true
"Anillo Uno de 50 Abejas abierto plata",UNOde50,Anillo,129990,0,true
"Aros Uno de 50 coleccion mall redondo con 4 puntas sosteniendo una perla al centro grande",UNOde50,Aros,159990,199990,true
"Anillo Uno de 50 Ladies doble baño de oro con 3 piedras cuadradas gris",UNOde50,Anillo,259990,0,true
"Anillo Uno de 50 Ladies de Plata con 3 piedras cuadradas grises",UNOde50,Anillo,199990,0,true
"Pulsera Pandora De Cadena Nudo Infinito Grueso",Pandora,Pulsera,172493,229990,false
"Pulsera Kate Spade Minnie circon negro cadena dorada",Kate Spade,Pulsera,79990,99990,true
"Sandalias Melissa Charol Negro",Melissa,Sandalias,79990,0,true
"Collar Lola Casademunt ovalos combinados acrilico y metal",Lola Casademunt,Collar,89990,99990,true
```

---

*Documento generado a partir del endpoint público `products.json` de la tienda. Todos los cálculos
son reproducibles con el bloque CSV de la sección 10.*
