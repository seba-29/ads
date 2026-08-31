# 03 — Del número al veredicto

Extraer datos es fácil. Lo difícil es decir "esto está bien" o "esto está mal" sin
mentir. Este documento es el puente.

---

## 1. El orden de las preguntas

Nunca las saltes. Cada una decide si la siguiente tiene sentido.

```
¿La cuenta puede gastar?          ─NO→  ⛔ Bloqueo, no rendimiento. Fin.
        │ SÍ
        ▼
¿Hay muestra suficiente?          ─NO→  ⚪ Sin lectura. Esperar. Fin.
   (≥15 resultados, ≥7 días
    desde la última edición)
        │ SÍ
        ▼
¿La atribución es confiable?      ─NO→  ⚠️ Se lee, pero el titular del reporte
                                          es la medición rota, no el CPA.
        │ SÍ
        ▼
¿Existe CPA objetivo?             ─NO→  📋 Lectura PROVISIONAL. Se describe lo que
   (ticket + margen en la ficha)          pasó, no se dictamina si está bien.
        │ SÍ
        ▼
Comparar contra el objetivo  →  🟢 / 🟡 / 🔴
```

---

## 2. La banda de ruido

Antes de declarar que un costo por resultado "subió" o "está sobre el objetivo",
calcula cuánto de esa diferencia puede ser azar.

Con **n** resultados, el ruido relativo aproximado es **1/√n**:

| Resultados | Banda de ruido |
|---|---|
| 5 | ±45% — cualquier lectura es humo |
| 10 | ±32% |
| 15 | ±26% — mínimo operable |
| 30 | ±18% |
| 50 | ±14% |
| 100 | ±10% |

**La regla:** si la desviación contra el objetivo cae **dentro** de la banda, el
veredicto es *"dentro de rango, sin evidencia de cambio"*, no *"empeoró"*. Solo se
declara rojo cuando la desviación supera la banda.

Esto es lo que impide el error más caro del oficio: reaccionar a la varianza. Cambiar
una campaña porque el CPA "subió 20%" con 12 conversiones es tirar el aprendizaje a la
basura por leer ruido. `scripts/semaforo.py` aplica esta regla sin que tengas que
hacer la cuenta.

---

## 3. Contra qué se compara (en este orden de preferencia)

1. **El CPA/CPL objetivo del cliente** — de ticket, margen y meta de ventas
   (`meta-ads/05-presupuesto.md`). Es el único veredicto real: dice si el negocio
   gana plata.
2. **El histórico de la propia cuenta** — sirve para detectar deterioro, pero **no**
   para decir si está bien. Una cuenta puede llevar seis meses perdiendo plata de
   forma muy estable.
3. **Los benchmarks de mercado** (`meta-ads/06-optimizacion.md` §Benchmarks) — solo
   para saber si el problema es estructural o si la cuenta está simplemente al día con
   un mercado que subió. **Nunca como objetivo.**

Si solo tienes el 2 y el 3, el veredicto es provisional. Escríbelo así, literalmente,
en el reporte. La tentación de completar el hueco con un benchmark y presentarlo como
meta es fuerte y es exactamente lo que convierte un informe en una opinión disfrazada.

---

## 4. Los cuatro veredictos y cómo se redactan

| Veredicto | Condición | Cómo se escribe |
|---|---|---|
| 🟢 **Dentro de objetivo** | Costo ≤ objetivo, o por encima pero dentro de la banda | "CPL $2.800 contra objetivo $3.000. Dentro de rango. No se interviene." |
| 🟡 **En riesgo** | Resultado OK pero una métrica secundaria cruzó umbral | "CPL en objetivo, pero frecuencia 4,2 y CTR cayendo. Se prepara tanda nueva de creativos para la próxima ventana." |
| 🔴 **Fuera de objetivo** | Desviación > 30% y > banda de ruido | "CPL $5.400 contra objetivo $3.000 (+80%, banda ±18%). Primera métrica que falla: retención 3 seg en 14%. Acción: renovar ganchos." |
| ⚪ **Sin lectura** | Muestra insuficiente o edición reciente | "7 resultados en la ventana; se necesitan 15. Se revisa el 7 de septiembre." |

Fíjate en la forma del 🔴: **desviación + banda + primera métrica que falla + acción**.
Un rojo sin causa identificada no es un diagnóstico, es una queja. La causa sale de
correr el árbol de las 3 Q's (`meta-ads/scripts/diagnostico.py`), que se detiene en la
primera métrica que falla **de arriba hacia abajo** — arreglar lo de abajo sin arreglar
lo de arriba no sirve.

---

## 5. El caso incómodo: todo sano y aun así no vende

Q2 entera en verde —buen CTR, buena retención, buena tasa de conversión— y aun así el
negocio no factura.

Cuando eso pasa, **el problema no está en Meta** y ninguna optimización lo va a
arreglar. Está en el cierre, el precio, la oferta o la velocidad de respuesta.

Es la conclusión más difícil de comunicar y la más valiosa. Verifícala antes de
decirla, en este orden:

1. **¿Cuánto tarda el cliente en responder un lead?** Es la causa número uno y la más
   barata de arreglar. Un lead contestado a las 4 horas ya se fue con otro.
2. **¿Quién responde y qué dice?** Pide ver conversaciones reales.
3. **¿El precio se menciona en el anuncio?** Si no, estás pagando por descubrirlo en
   la conversación.
4. **¿La oferta es competitiva?** (`meta-ads/04-creativos.md` §oferta.)

Llevar esto al reporte con datos —"entregamos 47 leads, se contestaron 12"— convierte
una conversación defensiva en una colaborativa.
