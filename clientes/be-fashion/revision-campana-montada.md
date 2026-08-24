# Revisión — Campaña Google Ads montada por Claude in Chrome

**Cuenta:** 880-586-9901 · **Campaña ID:** 24157716915 · **Montada:** 20-ago-2026
**Estado al momento de la revisión:** Detenida · 0 impresiones · 0 clics · $0 gastado
**Contra qué se revisa:** `prompt-claude-chrome.md` + `google-ads-joyeria.md` + `presupuesto-real-200k.md`

---

## 1. Veredicto

**La campaña está bien montada.** Se ejecutó fiel al brief y, más importante, se
respetó lo que en una cuenta nueva se rompe siempre: quedó **pausada, sin datos de
pago y sin un peso gastado**. Nada que revertir.

Hay **dos bloqueadores** que deben resolverse **antes** de activar. Ninguno es un error
del armado — los dos son problemas heredados de la cuenta.

---

## 2. Configuración verificada punto por punto

| Ítem | Estado | Por qué importa |
|---|---|---|
| Tipo Búsqueda · objetivo Ventas | ✅ | El objetivo aquí es cosmético (solo cambia el asistente). No hace nada por sí solo. |
| Red de Búsqueda **sin socios**, **sin Display** | ✅ | Es la fuga #1 de presupuesto en cuentas nuevas. |
| **Maximizar clics + tope CPC $800** | ✅ | Correcto. Con 0 conversiones reales, Maximizar conversiones puja errático. |
| Presupuesto **$6.667/día** | ✅ | = $200.000/mes exacto. Google lo redondeó a $6.700 y se corrigió. |
| **Chile · Presencia** (no "interés") | ✅ | Sin esto se paga tráfico de gente que solo *menciona* Chile. |
| Idioma Español | ✅ | |
| **IA Max desactivado** | ✅ | |
| **Recursos automáticos desactivados** | ✅ | Evita que Google escriba títulos que la marca no aprobó. |
| **Concordancia amplia automática desactivada** | ✅ | Crítico con $6.667/día. |
| **Recomendaciones automáticas: 0 de 7 · 0 de 14** | ✅ | Es lo que impide que la cuenta se auto-modifique sola. |
| Rotación de anuncios: "Optimizar" | ✅ | |
| Keywords **100% en concordancia exacta** (10 UNOde50 + 6 marca) | ✅ | Correcto para este presupuesto. |
| **41 de 41 negativas cargadas antes de lanzar** | ✅ | El orden importa: el algoritmo se ancla a la señal mala si entra después. |
| 15 títulos + 4 descripciones por grupo, dentro de límites | ✅ | |
| 4 sitelinks a colecciones reales + 4 textos destacados verificables | ✅ | |
| Claims descartados por no verificables | ✅ | "Paga en Cuotas", "Marcas Exclusivas", "Directo desde USA y EUR". Buen criterio: política de Google **y** credibilidad. |
| Nombre del anunciante: BEFASHION SPA · sin datos de pago | ✅ | |

**Decisión de armado bien resuelta:** el RSA admite 15 títulos, no 17. Se sacó
"Nuevos Diseños" y se conservó "Envío a Todo Chile". Es la elección correcta —
el envío es un diferenciador verificable, "nuevos diseños" no dice nada.

---

## 3. Los dos bloqueadores — no activar hasta resolverlos

### 🔴 A. La conversión de compra está rota

Estado actual de la cuenta:
- Única acción principal: **"Google Shopping App Purchase"** — "Esperando conversiones"
- **3 conversiones registradas desde abril de 2021**
- La acción **"Compra"** figura en **"Configuración incorrecta"**

**Qué pasa si se activa así:** la campaña *va a funcionar* — Maximizar clics no
necesita conversiones para pujar. El problema es que se gastan $200.000 **a ciegas**:
no hay forma de saber el ROAS, ni qué keyword vendió, ni si conviene subir o bajar.
Y sin historial de conversión la cuenta nunca va a poder migrar a puja automática.

**Qué hay que hacer, en orden:**
1. Instalar la etiqueta nativa de Google Ads en Shopify (canal de Google, o el
   script en el checkout).
2. Crear la conversión **"Compra"** con **valor dinámico** (el monto real del pedido,
   no un valor fijo) y ventana de 30 días.
3. Activar **conversiones optimizadas** (enhanced conversions) — recupera 5-15% de
   atribución perdida por bloqueo de cookies.
4. Dejar **una sola acción principal**. El resto, a "secundaria". Hoy hay ruido de
   2021 mezclado.
5. Probar con una compra real de prueba antes de activar.

### 🔴 B. Campaña duplicada de marca

Existe `[Search] Marca - Be fashion`, pausada, con estrategia **"Porcentaje de
impresiones objetivo"**. Se superpone con el Grupo 2 (Marca BeFashion) de la campaña
nueva.

Si alguien la activa por error, **las dos campañas compiten en la misma subasta por
las mismas keywords de marca**: Be Fashion se sube el CPC a sí misma pagando más caro
por tráfico que ya era suyo.

**Acción:** archivarla (no solo pausarla). Archivada no puede reactivarse por accidente.

---

## 4. Ajustes para dejarlo full

Ninguno bloquea el lanzamiento. Son mejoras.

**1. "Exacta" ya no es exacta.** Google incluye variantes cercanas (plurales,
sinónimos, orden invertido). Por eso el **informe de términos de búsqueda hay que
revisarlo igual, semanal**, y seguir sumando negativas. Las 41 iniciales son el piso,
no el techo.

**2. Agregar recursos de imagen (manuales, no automáticos).** 4-6 fotos de producto
en cuadrado y horizontal. En joyería es el recurso que más sube el CTR — el producto
es visual y hoy el anuncio es solo texto. No confundir con "recursos automáticos",
que siguen bien apagados.

**3. Agregar fragmentos estructurados.** Encabezado "Marcas" → UNOde50, Tous, y las
demás del catálogo. Gratis, verificable, ocupa más espacio en la SERP.

**4. Vigilar el reparto entre los dos grupos, no separarlos todavía.** El grupo de
marca tiene CPC mucho más bajo y CTR alto: Maximizar clics tiende a darle el
presupuesto. Como el volumen de búsqueda de "be fashion" en Chile es chico, es
probable que se limite solo. **Regla:** si a las 2 semanas el grupo de marca se lleva
más del 30% del gasto, separarlo a campaña propia con presupuesto acotado.

**5. Válvula de escape si no hay volumen.** Con exacta y $6.667/día, las impresiones
pueden salir casi en cero. Si a las 2-3 semanas el gasto real está muy por debajo del
presupuesto, pasar los 3-4 términos con mejor intención a **concordancia de frase**
(nunca amplia).

**6. Confirmar la URL final.** Cada grupo debe apuntar a la **colección de joyas**,
no al home. Y esa página tiene que mostrar precio y la condición de envío gratis
sobre $200.000 sin scroll.

**7. La llamada telefónica.** Google pidió recurso de llamada porque lo heredó de los
objetivos de conversión a nivel cuenta. Solo agregarlo si hay alguien contestando; si
no, se paga por clics que no atiende nadie.

---

## 5. El número con el que se cierra

| Dato | Valor |
|---|---|
| Presupuesto | $200.000/mes ($6.667/día) |
| Ticket promedio real (49 pedidos, ago-2026) | **$232.624** |
| Margen declarado por la clienta | 30-40% |
| Margen bruto por pedido (a 35%) | ~$81.400 |
| **Ventas necesarias para no perder plata** | **~2,5 al mes** |
| Clics comprables al tope de $800 | ~250/mes |
| **Tasa de conversión de equilibrio** | **≈ 1%** |

Ese 1% es todo el caso. Una tienda de joyas con tráfico de búsqueda —gente que ya
escribió "UNOde50 Chile"— normalmente convierte entre 1% y 2%. **La campaña es
viable, pero con poco margen de error.**

Y esa es exactamente la razón por la que el bloqueador A no es un detalle técnico:
sin la conversión midiendo bien, es imposible saber de qué lado de ese 1% se está
cayendo.
