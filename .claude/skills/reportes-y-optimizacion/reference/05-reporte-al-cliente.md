# 05 — El reporte al cliente

El reporte interno y el reporte al cliente son **documentos distintos**, con audiencias
distintas y decisiones distintas. Mezclarlos produce lo peor de ambos: un cliente que
no entiende y un operador que no puede actuar.

| | Interno | Al cliente |
|---|---|---|
| **Pregunta que responde** | ¿Qué toco esta semana? | ¿Mi plata hizo algo? |
| **Unidad** | CPL, CTR, frecuencia, CPM | Pacientes, ventas, conversaciones |
| **Cadencia** | Cada 5-7 días | Mensual (o quincenal al arrancar) |
| **Tono** | Telegráfico | Narrativo y honesto |
| **Métricas de proceso** | Todas | Solo si explican algo que el cliente debe decidir |

---

## 1. La regla que ordena todo lo demás

> **No reportes una métrica sobre la que el cliente no pueda hacer nada.**

El CPM no le sirve a un kinesiólogo. La frecuencia tampoco. Ponerlas es una forma
educada de esconderse detrás de la jerga, y el cliente lo nota: cuando un reporte trae
muchos números y ninguna conclusión, lo que comunica es inseguridad.

La excepción es cuando la métrica **explica algo que el cliente tiene que decidir**.
"La frecuencia llegó a 4,8: tu público ya vio estos videos demasiadas veces, por eso
subió el costo. Necesitamos material nuevo" — ahí la frecuencia sí va, porque termina
en una petición concreta.

---

## 2. Estructura

Usa esta estructura. El orden no es cosmético: responde las preguntas del cliente en el
orden en que se las hace.

```markdown
# [Cliente] — Reporte de [periodo]

## En una frase
[Qué pasó, en el idioma del negocio. Sin métricas de plataforma.]

## Los números
| | Este periodo | Periodo anterior |
|---|---|---|
| Inversión | | |
| [Resultado en unidades del cliente] | | |
| Costo por [resultado] | | |

[Si no hay periodo anterior porque recién arrancamos, dilo. No inventes comparación.]

## Qué hicimos
[Los cambios, con fecha y motivo. Máximo 4-5 líneas.]

## Qué encontramos
[Los hallazgos. Acá sí van métricas de proceso, pero solo las que llevan a una acción.]

## Qué sigue
[Acciones concretas con fecha. No "seguiremos optimizando".]

## Qué necesitamos de ti
[Lo que está bloqueado esperando al cliente. Con fecha y consecuencia.]
```

---

## 3. Las dos secciones que la mayoría omite

### "En una frase"

Es lo único que muchos clientes van a leer completo. Tiene que funcionar sola.

- ❌ "Se optimizaron las campañas mejorando el CTR y reduciendo el CPM."
- ✅ "Este mes entraron 34 personas pidiendo hora, a $8.900 cada una. Es un 20% más
  barato que el mes pasado, y el cuello de botella ahora es que se están contestando
  al día siguiente."

La segunda dice qué pasó, cuánto costó, cómo se compara, y dónde está el problema.

### "Qué necesitamos de ti"

Es la sección que hace avanzar la cuenta y la que más se omite por incomodidad. Es
donde pides el ticket promedio, el material creativo, el acceso a la cuenta, el pago
del saldo, la tasa de cierre.

La forma que funciona es **petición + fecha + consecuencia**, sin dramatizar:

> "Necesitamos el ticket promedio de una sesión y el margen aproximado. Con eso
> calculamos cuánto podemos pagar por paciente nuevo. Hoy sabemos que un lead cuesta
> $8.900, pero no si eso es barato o caro para tu negocio. Es el dato que falta para
> decidir si escalamos el presupuesto en octubre."

Se lee como colaboración, no como reclamo, y deja claro qué se pierde por no tenerlo.

---

## 4. Cómo se comunican las malas noticias

Tres situaciones que se repiten y en las que la tentación es maquillar. Maquillar es
siempre peor: el cliente se entera igual, un mes más tarde, y ahí sí pierde la confianza.

### La cuenta no está rindiendo

Estructura: **el número + la causa identificada + qué se hizo + qué falta**. Nunca el
número solo, nunca la causa sin la acción.

> "El costo por conversación subió a $2.400 contra los $839 de referencia. La causa
> está identificada: la frecuencia llegó a 5,8, es decir el mismo público vio los
> mismos anuncios demasiadas veces. Ya redistribuimos el presupuesto hacia los públicos
> más amplios, y necesitamos material nuevo para la segunda quincena."

### No hay datos suficientes todavía

No rellenes con métricas de vanidad —alcance, impresiones— para que el reporte "tenga
contenido". Un reporte corto y honesto construye más confianza que uno largo y vacío.

> "Llevamos 6 días con la campaña activa y 7 formularios. Para sacar conclusiones
> confiables necesitamos al menos 15. El 12 de septiembre te mando la primera lectura
> real. Mientras tanto la campaña está entregando con normalidad."

### La medición está rota

Se dice arriba y sin rodeos, porque afecta todo lo demás del reporte.

> "Importante antes de los números: hoy Meta no está recibiendo la señal de qué
> conversaciones terminan en hora agendada. Eso significa dos cosas: el algoritmo está
> optimizando hacia gente que escribe, no hacia gente que agenda; y los números de
> abajo hay que leerlos como referencia, no como verdad. Estamos trabajando en
> conectarlo esta semana."

---

## 5. Reporte de cartera (para uso interno de la agencia)

Cuando la pregunta es "¿cómo va todo?", el formato es distinto: una tabla y tres
listas. La tabla la genera `scripts/semaforo.py`.

Lo que hace legible un reporte de cartera es **separar rendimiento de bloqueos**. Una
cuenta impaga y una cuenta con CPA alto son problemas de naturaleza distinta y se
resuelven con personas distintas. Mezclarlas hace que ninguna de las dos se resuelva.

```markdown
# Cartera — semana del [fecha]

## Semáforo
[tabla de semaforo.py]

## Se interviene esta semana (🔴)
- [Cliente] — [causa] → [acción] → revisar el [fecha]

## Se prepara (🟡)
- [Cliente] — [señal] → [qué se deja listo]

## Bloqueadas (⛔) — no es problema de campañas
| Cliente | Bloqueo | Quién desbloquea | Desde |
|---|---|---|---|

## Patrón de la semana
[Si varias cuentas comparten el mismo bloqueo, ese es el problema real de la agencia
y merece una línea propia.]
```
