# 01 — Cadencia y triage

## 1. El chequeo diario (10 minutos, toda la cartera)

Diario **no** es optimizar. Es buscar las cosas que hacen perder dinero sin avisar y
que no aparecen en ninguna métrica de rendimiento.

Cuatro preguntas por cuenta, todas de sí/no:

| # | Pregunta | Si la respuesta es mala |
|---|---|---|
| 1 | ¿La cuenta está activa y al día? | Cuenta impaga = todo detenido. Avisar al cliente hoy, no el lunes |
| 2 | ¿Los anuncios están aprobados y entregando? | Un anuncio rechazado no gasta y no avisa. Revisar el motivo |
| 3 | ¿El gasto de ayer se parece al de anteayer? | Un gasto en $0 con campaña activa es una alerta, no una economía |
| 4 | ¿Entraron resultados? | Cero resultados con gasto normal **2-3 días seguidos** rompe la regla de esperar |

**La excepción a la Ley 0 vive acá.** La regla dice no tocar antes de 5-7 días, pero
está pensada para *rendimiento subóptimo*, no para *falla*. Si una campaña gasta tres
días seguidos y no produce **ni un solo** resultado, eso no es aprendizaje lento: es
algo roto — el destino, el formulario, el píxel, la promesa del anuncio. Ahí se
interviene el día 3.

Distinguir "va lento" de "está roto" es el juicio más rentable del chequeo diario.

---

## 2. El triage de la ventana (cada 5-7 días)

Con nueve cuentas no puedes correr las 3 Q's en todas. Reparte en cinco cajones. Se
resuelven **en este orden**, y los dos últimos ni siquiera son trabajo de optimización.

### ⛔ Bloqueada — no es un problema de campañas

Cuenta impaga, sin acceso, sin material creativo, esperando aprobación del cliente.

No tiene sentido diagnosticar el CPA de una cuenta que no puede gastar. **Sácala del
reporte de rendimiento y ponla en la lista de bloqueos**, con quién desbloquea y desde
cuándo está así. Mezclar las dos cosas es lo que hace que un reporte de cartera se
vuelva ilegible.

> Un patrón que aparece siempre: si la mayoría de la cartera está frenada por
> **material creativo**, el cuello de botella de la agencia no es la estrategia ni el
> presupuesto. Optimizar más fino no lo va a mover. Decirlo con nombre y apellido en
> el reporte mensual sí.

### ⚪ Sin datos suficientes — la acción correcta es esperar

Cae acá si **cualquiera** de estas es cierta:
- Menos de **15 resultados** en la ventana.
- Menos de **7 días desde la última edición** (el aprendizaje se reinició).
- Menos de **7 días desde el lanzamiento**.

No es una cuenta sana ni enferma: es una cuenta **sin leer**. Escribe "sin muestra
suficiente, se revisa el [fecha]" y pasa a la siguiente. Forzar un veredicto acá es
exactamente cómo se destruye una campaña que iba a funcionar.

### 🔴 Intervenir ya

Gasta con muestra suficiente **y** una de estas:
- Costo por resultado **≥ 30% sobre el objetivo** (fuera de la banda de ruido).
- Cero resultados con gasto normal por 3+ días *(viene del chequeo diario)*.
- Frecuencia **> 5** en 7 días — el público está quemado.

Estas se llevan el tiempo de la ventana. Diagnóstico completo con las 3 Q's.

### 🟡 Vigilar — preparar, no ejecutar

Dentro de objetivo en el resultado, pero alguna métrica secundaria cruzó umbral:
frecuencia entre 3 y 5, CTR bajo el umbral de su etapa, retención de 3 seg cayendo.

Son cuentas que **van a fallar en 1-3 semanas** si no pasa nada. La acción no es tocar
la campaña hoy: es **preparar el reemplazo** — pedir creativos, escribir los ángulos
nuevos, dejar el conjunto duplicado listo. Cuando llegue el rojo ya tienes la solución
hecha en vez de improvisarla.

Este cajón es el que separa a quien apaga incendios de quien opera una cartera.

### 🟢 Dentro de objetivo — no tocar

Registra "revisado, sin intervención" con la fecha y sigue. Si lleva **3 ventanas
seguidas** en verde con frecuencia sana, no es una cuenta aburrida: es **candidata a
escalar** (ver SKILL.md §Cuándo se puede escalar).

---

## 3. Cómo se prioriza dentro del rojo

Si hay más cuentas rojas que tiempo, ordénalas por **dinero en riesgo**, no por quién
reclamó más fuerte:

```
dinero en riesgo ≈ gasto diario × (costo por resultado ÷ objetivo − 1)
```

Una cuenta que gasta $50.000/día con el CPA 40% arriba quema mucho más que una de
$5.000/día al doble del objetivo. La segunda se siente peor y cuesta menos.

`scripts/semaforo.py` calcula esta columna y ordena por ella.

**Un matiz que vale plata:** un cliente chico y ruidoso puede justificar atención antes
que uno grande y tranquilo, pero esa es una decisión **comercial**, no técnica.
Tómala a conciencia y anótala como tal en la bitácora. Lo que no puede pasar es
confundir "el que más reclama" con "el que más pierde".

---

## 4. La ventana mensual

Además del reporte al cliente (`05-reporte-al-cliente.md`), la ventana mensual es
donde se miran las cosas que a 7 días no se ven:

- **Tendencia del CPA mes contra mes.** Si sube sostenido y la frecuencia también, es
  fatiga estructural: la cuenta necesita creativos nuevos, no ajustes.
- **Reparto real del presupuesto en el ciclo.** ¿Sigue el 60/20/10/10, o el
  retargeting se comió el frío porque "convierte mejor"? Es la trampa clásica y solo
  se ve a escala mensual (`meta-ads/01-ciclo-de-ventas.md`).
- **Cuentas en verde 3+ ventanas** → decisión de escalar.
- **Bloqueos que ya llevan un mes.** Un bloqueo de un mes dejó de ser un pendiente
  operativo y pasó a ser una conversación comercial.
