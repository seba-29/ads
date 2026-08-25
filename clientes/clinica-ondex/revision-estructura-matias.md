# Revisión — Estructura Etapa 1 (Meta, Google y Orgánico)

> Board de Figma armado por Matías (contraparte). Revisado el 25-ago-2026.
> `hkw4j4Sn3ny2AkG9pGLdLt` — *Etapa 1 · Meta, Google y Orgánico | Comentarios*

## Qué modela el board

Clínica de kinesiología y ondas de choque en Santiago, con **dos líneas de servicio**
que se mantienen separadas desde el anuncio hasta la landing:

- **Kinesiología** — recuperación, post operatorios, movilidad
- **Método** — ondas de choque + kinesiología combinadas (tendinitis crónica, fascitis plantar)

**Captación (3 canales)** → **Landings v1 con form en 2 pasos** → **Heat (agente IA por WhatsApp)**
→ **Insistencia por texto** → **Llamada humana** → tres estados terminales:
`Agendado` · `Lead calificado, no convertido` · `Lead perdido`.

---

## Lo que está bien armado

1. **Ningún camino queda colgando.** Cada rama termina en uno de los tres estados
   nombrados. Es raro ver un funnel diagramado sin fugas silenciosas.
2. **Las dos líneas no se mezclan hasta Heat.** Anuncio, keyword y landing distintos
   por línea. Correcto: son niveles de consciencia y búsquedas distintas.
3. **La búsqueda de marca va al Home, no a una landing de servicio.** Correcto.
4. **El retargeting es una sola campaña, no una por línea.** Con un pool tibio chico,
   partirlo en dos sería condenar a las dos a no salir de aprendizaje.
5. **El form en 2 pasos con captura parcial.** Quien completa el Paso 1 y abandona igual
   entra a Heat. Eso recupera volumen que normalmente se pierde.
6. **La automatización de comentarios alimenta las mismas landings.** Consistente.

---

## Lo que falta o está mal, por orden de costo

### 1. No hay un solo número en todo el board — CRÍTICO

No hay presupuesto, ni CPA objetivo, ni reparto Meta/Google, ni estimación de volumen.
Es un diagrama de flujo, no un plan de medios. Y sin ticket promedio + margen no hay
CPA objetivo, y sin CPA objetivo no se puede decidir **cuántos conjuntos aguanta la plata**.

La fórmula que decide todo:

```
(CPA objetivo × 50) ÷ 7 = presupuesto diario mínimo por conjunto
```

(50 eventos de optimización en 7 días = salir de fase de aprendizaje.)

### 2. Los 2 conjuntos de Meta casi seguro no caben en el presupuesto real

Con CPL de $8.000 → `(8.000 × 50) ÷ 7` = **$57.143/día por conjunto**
Dos conjuntos = $114.286/día ≈ **$3,4M CLP/mes**, solo Meta, antes de Google.

Con CPL de $12.000 → $85.714/día por conjunto → dos = ≈ **$5,1M CLP/mes**.

Y la campaña de retargeting de la Fase 4 es una **tercera** campaña pagada de Meta.

A cualquier presupuesto de arranque razonable para una clínica, esto no cierra.
**Se parte con UN conjunto frío**, se deja madurar, y recién ahí se abre el segundo.

### 3. El objetivo de Meta no calza con el destino

El board dice *"Campaña Clientes Potenciales"* pero el destino es una **landing con
formulario**, no un formulario nativo de Meta. Si va a landing, la campaña optimiza
contra un evento `Lead` del píxel, y todo depende de:

- Píxel instalado — **la ficha dice que no se sabe**
- **API de Conversiones** — sin esto, con iOS y bloqueadores, se pierde señal
- Que el evento dispare en el paso correcto

**El form en 2 pasos crea una ambigüedad de atribución que hay que resolver antes de encender:**

- Si el `Lead` dispara en el **Paso 1**, Meta optimiza hacia gente que llena el paso 1 y se va.
- Si dispara solo al **completar**, se pierde la señal parcial.

**Solución: dos eventos.** `Lead` en la completación — eso es lo que optimiza la campaña —
y un evento personalizado en el Paso 1, que se usa **solo** para públicos de retargeting
y reportería, nunca para optimizar.

### 4. El retargeting apunta al pool más frío y deja el más caliente sin tocar

Siguiendo los conectores, lo **único** que alimenta la campaña de retargeting es:
*"no completa ni el Paso 1"* → *"no completa el pop-up"*. O sea, gente que entró,
no dejó nada y cerró el pop-up. El segmento más difícil de todos, y es el único que
recibe plata de retargeting.

Mientras tanto, **`Lead calificado, no convertido` es un estado terminal sin nada después.**
Esa es la gente que habló con Heat, mostró interés y no agendó. Es el pool más valioso
del diagrama entero y tiene **cero retargeting**. Es el hueco estratégico más grande del board.

Lo mismo con **`Agendado`**: no hay flujo post-agenda. Sin confirmación ni recordatorio,
el no-show se come una parte de lo que costó conseguir la hora.

### 5. Cero exclusiones en todo el board

*Incluir es sugerir, excluir es mandar.* Las campañas frías tienen que excluir:
gente ya en conversación con Heat, agendados, pacientes actuales y el propio pool de
retargeting. Si no, se paga precio de frío por alcanzar gente que ya está adentro del funnel.

### 6. Google con "Conversiones" desde el día uno no va a funcionar

Las pujas inteligentes necesitan historial. Una cuenta nueva con cero conversiones no
puede alimentar una estrategia de conversiones: o subentrega o quema.

**Partir en Maximizar clics con tope de CPC**, acumular ~15-30 conversiones en 30 días,
y recién ahí cambiar.

### 7. Los grupos de keywords mezclan intenciones que no se deben mezclar

- **`kinesiología comuna`** — dice literalmente "comuna". Es un placeholder, no una keyword.
  Hay que enumerar las comunas reales (Providencia, Las Condes, Ñuñoa, etc.).
- **`kinesiólogo cerca de mí`** — mucho volumen, intención sin calificar, y depende
  totalmente del radio geográfico. Necesita segmentación por radio bien apretada.
- **`tendinitis crónica` y `fascitis plantar` son búsquedas de síntoma, no de tratamiento.**
  Quien busca eso mayormente busca información. **`ondas de choque Santiago` sí es alta
  intención.** Están en el mismo grupo y no deberían: distinta intención, distinto mensaje
  de landing, distinto CPC aceptable. Se separan en dos grupos.

### 8. La automatización de comentarios pide el follow antes del link

*"agradece, pide seguir la cuenta, envía el link"*. Pedir el follow antes agrega fricción
justo en el momento de máxima intención. El follow vale, pero no más que el clic.
**Primero el link, después el follow.**

### 9. "Recuperá el control" — voseo argentino

En Chile es *"Recupera"*. Detalle chico, pero es la landing de retargeting: la ve gente
que ya vio la marca una vez.

### 10. No se mide lo que importa

El funnel entero optimiza hacia **`Agendado`**, y agendado no es plata. Falta el tramo
`Agendado → asistió → compró plan`. Sin eso no hay forma de saber si los leads baratos
de un canal valen menos que los caros de otro.

### 11. Bug de etiquetado

En Fase 3 y Fase 5 hay tres salidas, y dos dicen **"Opción 2"**. La tercera debería ser
"Opción 3".

### 12. El board pide mucho más contenido del que existe

La ficha de Ondex documenta que **no hay material de video suficiente**. Este board
necesita: creativos fríos para 2 líneas + creativos de retargeting + contenido orgánico
de IG/FB que genere los comentarios que alimentan la automatización.
Es el mismo choque que obligó a bajar Palavas de 6 conjuntos fríos a 3.

---

## Qué haría antes de encender

**Bloqueantes (sin esto no se enciende):**
1. Ticket promedio y margen por línea → CPA objetivo → cuántos conjuntos caben
2. Píxel + API de Conversiones instalados y verificados
3. Definir los dos eventos del form de 2 pasos (`Lead` en completación, custom en Paso 1)
4. Presupuesto total y reparto Meta/Google

**Cambios de estructura:**
5. Arrancar con **un** conjunto frío en Meta, no dos
6. Google en Maximizar clics con tope de CPC, no en Conversiones
7. Separar keywords de síntoma de keywords de tratamiento
8. Agregar retargeting sobre `Lead calificado, no convertido`
9. Agregar exclusiones a todas las campañas frías
10. Agregar flujo post-agenda (confirmación + recordatorio + rescate de no-show)

**Correcciones menores:**
11. Link antes del follow en la automatización de comentarios
12. "Recupera" en vez de "Recuperá"
13. Renombrar la tercera "Opción 2"

---

## Datos que faltan en la ficha y bloquean todo

| Dato | Estado |
|---|---|
| Ticket promedio (evaluación vs plan completo) | ❌ |
| Margen por línea | ❌ |
| % dispuesto a invertir por paciente nuevo | ❌ |
| Presupuesto mensual | ❌ |
| Píxel instalado | ❓ |
| API de Conversiones | ❓ |
| % de cierre lead → paciente | ❌ |
| Capacidad de atención (horas/semana disponibles) | ❌ |

La última no es menor: si la clínica no tiene agenda para absorber el volumen,
el cuello de botella no es publicitario.
