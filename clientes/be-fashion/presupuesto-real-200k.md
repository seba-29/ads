# Be Fashion — Google Ads con $200.000/mes

**Restricción del cliente:** $1.000.000 CLP/mes en total entre Meta y Google.
**Google: $200.000/mes máximo** = **$6.667/día**.

Esto invalida el plan anterior ($40.000/día) y obliga a cambiar el objetivo de la
campaña. No es un ajuste de presupuesto: es otro tipo de campaña.

---

## 1. La matemática honesta

Un test estadístico necesita **~30 conversiones**. Con $200.000/mes:

| CPC | Clics/mes | conv @2% | conv @3% | conv @5% |
|---:|---:|---:|---:|---:|
| $300 | 667 | 13,3 | 20,0 | 33,3 |
| $500 | 400 | 8,0 | 12,0 | 20,0 |
| $800 | 250 | 5,0 | 7,5 | 12,5 |
| $1.200 | 167 | 3,3 | 5,0 | 8,3 |

> **Ningún escenario realista llega a 30 conversiones.**
>
> Consecuencias que hay que aceptar de entrada:
> - **No se puede pasar a puja automática por conversiones.** Smart Bidding no tendrá
>   señal suficiente. Se opera con puja manual / maximizar clics con tope, indefinidamente.
> - **No habrá una respuesta estadística** a "¿funciona Google para Be Fashion?".
> - Los aprendizajes serán **cualitativos** (qué se busca) más que cuantitativos.

## 2. Pero sí puede ser rentable — y por bastante

El AOV de $232.624 rescata el presupuesto chico. Cada conversión vale tanto que no hacen
falta muchas:

| CPC | conv @3% | Ingreso estimado | **ROAS** | ¿Supera el objetivo de 4,17×? |
|---:|---:|---:|---:|:--|
| $300 | 20,0 | $4.652.480 | **23,3×** | ✅ |
| $500 | 12,0 | $2.791.488 | **14,0×** | ✅ |
| $800 | 7,5 | $1.744.680 | **8,7×** | ✅ |
| $1.200 | 5,0 | $1.163.120 | **5,8×** | ✅ |

**Todos los escenarios superan el ROAS objetivo.** El presupuesto chico limita el
*volumen*, no la *rentabilidad*.

---

## 3. El reframe

| ❌ Lo que NO se puede hacer | ✅ Lo que SÍ se puede hacer |
|---|---|
| Test estadístico de 30 días | **Captura de intención, always-on** |
| Descubrir qué funciona explorando | **Capturar la demanda que ya existe** |
| Puja automática por conversiones | Puja manual con tope estricto |
| Cubrir genéricos + marcas + carteras | **Solo lo más caliente que exista** |

> **La regla que gobierna todo con $200.000:** con 250-400 clics al mes, **cada clic
> tiene que contar**. No hay margen para explorar. Solo se compra intención máxima.

---

## 4. Estructura ultra-concentrada

```
UNA campaña · Búsqueda · Chile · $6.667/día
│  Puja: Maximizar clics + límite de CPC $800
│  Concordancia: EXACTA (frase gasta en variantes que no controlas)
│  Negativas: lista completa cargada antes de activar
│
├── GRUPO 1 · UNOde50                          ← el 80% del presupuesto
│     [uno de 50]  [unode50]  [uno de 50 chile]
│     [pulsera uno de 50]  [anillo uno de 50]  [collar uno de 50]
│     [aros uno de 50]
│     → landing: colección UNOde50
│
└── GRUPO 2 · Marca propia                     ← el 20%, clics baratísimos
      [be fashion]  [befashion]  [be fashion chile]
      → landing: home
```

**Eso es todo.** Nada de Tous al inicio, nada de genéricos, nada de carteras.

**Por qué UNOde50 y no Tous:** UNOde50 es el 26% del ingreso de toda la tienda, el 67%
del catálogo de joyas, y **es la marca que Falabella y Paris no suelen tener**. Tous sí
lo vende el retail grande — con este presupuesto no se pelea esa subasta.

**Por qué incluir la marca propia:** son los clics más baratos y de mayor conversión que
existen. Si alguien busca "be fashion" y la tienda no aparece, se lo lleva un
marketplace. *Caveat honesto: parte de ese tráfico llegaría igual por orgánico — es
canibalización parcial. Aun así, a este CPC, la protección vale la pena.*

---

## 5. Shopping: el multiplicador que hay que activar

A este nivel de presupuesto, **el CPC importa más que nunca**. Y el CPC de Shopping es
del orden de **3 a 8 veces más barato** que el de Búsqueda.

| Canal | CPC estimado | Clics con $200.000 |
|---|---:|---:|
| Búsqueda | $800 | **250** |
| Shopping | ~$300 | **667** |

**2,7× más clics por el mismo dinero.** Con un presupuesto holgado sería un detalle; con
$200.000 es la diferencia entre 7 y 20 conversiones al mes.

**Pero requiere resolver antes la higiene de catálogo** (ver el plan principal, §8b):
producto a $0, descuento del 92% sospechoso, 3 productos mal categorizados, 7% agotado.
Merchant Center rechaza feeds sucios y la verificación toma días.

**Secuencia recomendada:**
1. **Ahora:** lanzar Búsqueda con los 2 grupos de arriba. Se activa hoy.
2. **En paralelo:** limpiar el catálogo y verificar Merchant Center.
3. **Cuando esté listo:** mover parte del presupuesto a Shopping y comparar CPA real.

---

## 6. La conversación que vale la pena tener con la clienta

El split actual es **$800.000 Meta / $200.000 Google**.

Los términos de marca en Búsqueda suelen ser **el ROAS más alto de una cuenta de
e-commerce**, porque capturan demanda que ya existe en vez de crearla. La proyección de
arriba da **8× a 23×**.

**No estoy proponiendo mover presupuesto todavía** — habría que ver qué ROAS está dando
Meta hoy. Pero es el número a comparar: si Google entrega 8× y el peso marginal de Meta
entrega 3×, hay una conversación que tener sobre el reparto.

**Qué medir para poder tenerla:** ROAS de Google mes 1 vs. ROAS de Meta del mismo mes,
ambos con la misma ventana de atribución.

---

## 7. Qué decirle a la clienta

Tres cosas, para que no haya sorpresas:

1. **"Con $200.000 no vamos a poder concluir si Google funciona en general."** Vamos a
   capturar la demanda que ya existe por UNOde50. Es rentable, pero es un volumen chico.
2. **"El primer mes son ~250 clics."** No esperes decenas de ventas. Espera pocas ventas
   pero de ticket alto.
3. **"El techo de este canal se levanta con Shopping"**, y para eso hay que limpiar el
   catálogo de la tienda.
