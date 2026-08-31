# 06 — Google Ads

El ciclo es el mismo: extraer → triage → veredicto → acción → bitácora. Cambian las
métricas, y sobre todo cambian las **trampas**. Este documento cubre solo las
diferencias; todo lo demás sale del SKILL.md.

**La diferencia de fondo:** en Meta el problema típico es *a quién le muestro el
anuncio*. En Google la demanda ya existe y la persona ya está buscando — el problema
típico es *qué búsquedas estoy comprando*. Por eso la herramienta más importante de
Google no es una métrica, es el **informe de términos de búsqueda**.

---

## 1. Q1 — las métricas del veredicto

| Métrica | Nota |
|---|---|
| **Costo** | |
| **Conversiones** | Ojo: cuenta las **Principales**, no las Secundarias |
| **Costo por conversión** | El veredicto, igual que en Meta |
| **Valor de conversión / ROAS** | Solo si hay e-commerce con valor real cargado |

Aplica la misma regla de muestra mínima: **≥ 15 conversiones** en la ventana antes de
comparar costos por conversión.

## 2. Q2 — las métricas del proceso

| Métrica | Umbral de referencia | Si falla |
|---|---|---|
| **CTR de búsqueda** | < 3-5% en marca es malo; en genéricas 2% es normal | Anuncios y extensiones flojos, o palabras poco relevantes |
| **Índice de calidad** | < 5 | Relevancia entre palabra → anuncio → landing rota |
| **% de impresiones perdidas (presupuesto)** | > 10% | Hay demanda que no estás comprando: subir presupuesto |
| **% de impresiones perdidas (ranking)** | alto | Puja o calidad insuficientes |
| **Tasa de conversión de la landing** | | Mismo criterio que Meta |
| **% de clics de términos irrelevantes** | | Negativas — ver abajo |

---

## 3. Las cinco trampas de Google

Cada una hace que el reporte diga algo falso, y todas son frecuentes.

### 1. El informe de términos de búsqueda es la revisión que más plata devuelve

Las palabras clave que compraste no son las búsquedas que pagaste. En concordancia
amplia o de frase, Google amplía por su cuenta. Revisar los términos reales y agregar
**negativas** es, semana a semana, la acción de mayor retorno de la cuenta.

Presta atención especial a las búsquedas de **intención informativa** ("qué es",
"cómo se hace", "gratis", "sueldo", "estudiar") — traen clics baratos que nunca
convierten y arruinan el promedio.

### 2. Doble conteo de conversiones

Si la misma acción está cargada dos veces —por ejemplo un evento de GA4 importado
**y** una etiqueta de Google Ads sobre la misma página de gracias— las conversiones se
cuentan doble y el costo por conversión aparece a la mitad. La cuenta parece excelente
y no lo es.

Verifica también que no haya **dos propiedades de GA4** midiendo en paralelo el mismo
sitio: pasa seguido después de migrar un sitio o instalar Tag Manager sobre etiquetas
que ya existían.

### 3. Principales vs. Secundarias

Solo las conversiones marcadas como **Principales** alimentan las pujas automáticas. Si
lo importante está marcado como secundaria, la campaña optimiza hacia otra cosa.
Revísalo antes de diagnosticar cualquier problema de rendimiento: es una casilla que
explica meses de resultados raros.

### 4. Las pujas automáticas necesitan historial

tCPA y tROAS sin historial de conversiones no tienen con qué aprender. El arranque
correcto es **Maximizar clics con tope de CPC**, y recién cuando hay volumen estable se
pasa a puja automática. Cambiar de estrategia de puja **reinicia el aprendizaje**,
igual que en Meta.

### 5. Sin `gclid` no hay atribución

Si la landing no captura y guarda el `gclid` en el CRM, puedes ver conversiones en el
panel pero no puedes conciliar qué campaña trajo qué venta. Es el equivalente exacto
del `fbclid`/`ctwa_clid` en Meta, y bloquea el mismo tipo de análisis.

`gclid` suele ser un campo **estándar** del CRM, no uno personalizado — revisa que esté
mapeado ahí antes de crear uno nuevo.

---

## 4. Búsqueda vs. Performance Max

**PMax es una caja negra**: mezcla búsqueda, display, YouTube, Gmail y Discover en una
sola campaña, y el informe no te deja separar el rendimiento por canal con detalle.

Consecuencias prácticas para el reporte:

- Un PMax con buen costo por conversión puede estar viviendo de **búsquedas de marca**
  —gente que ya te conocía— y no traer un solo cliente nuevo. Compara siempre PMax
  contra una campaña de búsqueda de marca separada para saber qué es incremental.
- Si conviven PMax y Búsqueda en la misma cuenta, **se canibalizan**. Igual que dos
  campañas de Meta sobre el mismo público: mismo síntoma, misma solución de medir por
  separado antes de apagar nada.
- Para una cuenta que arranca y necesita aprender qué funciona, Búsqueda con términos
  visibles enseña muchísimo más que PMax, aunque PMax rinda parecido.
