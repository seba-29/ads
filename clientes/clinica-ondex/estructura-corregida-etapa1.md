# Estructura corregida — Etapa 1

> Reescritura del board de Matías con los 12 hallazgos aplicados.
> 25-ago-2026 · Cuenta `1034674525430396` (ojo: el nombre trae espacio inicial)

---

## El hallazgo que ordena todo lo demás

El board elige el **evento de conversión más caro que existe** (formulario completado en
landing propia) sin decir con qué presupuesto se va a alimentar.

Meta necesita **~50 eventos de optimización en 7 días** por conjunto para salir de
aprendizaje. Debajo de eso el conjunto entra en **"Aprendizaje limitado"**: sigue
entregando, pero la optimización es poco confiable, los costos son más volátiles y
los números no se pueden leer para tomar decisiones.

```
(CPL objetivo × 50) ÷ 7 = presupuesto diario mínimo por conjunto
```

### Lo que cuesta mantener UN conjunto frío fuera de aprendizaje limitado

| CPL | Diario | Mensual |
|---|---|---|
| $4.000 | $28.571 | $857.000 |
| $6.000 | $42.857 | $1.286.000 |
| $8.000 | $57.143 | $1.714.000 |
| $10.000 | $71.429 | $2.143.000 |
| $12.000 | $85.714 | $2.571.000 |
| $15.000 | $107.143 | $3.214.000 |

**Un conjunto. Solo Meta. Sin Google, sin retargeting.**

### La escalera de eventos: el mismo funnel, tres precios distintos

| Destino | CPL estimado | Diario/conjunto | Mensual/conjunto |
|---|---|---|---|
| **CTWA → Heat directo** | ~$1.000–2.000 | $7.000–14.000 | **$210.000–430.000** |
| **Formulario nativo de Meta** | ~$2.500–4.000 | $18.000–29.000 | **$540.000–860.000** |
| **Landing con form 2 pasos** *(lo del board)* | ~$6.000–12.000 | $43.000–86.000 | **$1.290.000–2.570.000** |

> El piso de la escalera es dato real: Palavas consigue conversaciones CTWA a **$839 CLP**.
> Los otros dos son estimaciones para el rubro, no datos de Ondex. Sirven para el orden
> de magnitud, no para presupuestar al peso.

**Entre el evento más barato y el que eligió el board hay entre 6× y 12× de diferencia
en lo que cuesta mantener un solo conjunto sano.**

La conclusión no es "la landing está mal". La landing califica mejor y ese valor es real.
La conclusión es: **si el presupuesto no llega a $1,3M/mes solo para Meta, no se cambia
el presupuesto — se cambia el evento.**

Y hay un argumento adicional que ya validamos: con **Heat contestando al instante**, la
brecha de calidad entre un formulario y una landing se cierra bastante. El lead no se
enfría esperando respuesta, que es de dónde viene la mala fama de los formularios.

---

## Estructura propuesta — escalera en 3 fases

### FASE 0 — Infraestructura y señal *(semanas 1–2)*

Nada de esto es opcional y nada de esto se salta.

**Medición**
- Píxel instalado y verificado en las 3 landings + Home
- **API de Conversiones** conectada (GHL puede dispararla — ahí vive Heat)
- Dominio verificado en Business Manager
- Los 5 eventos definidos (tabla abajo)

**Meta — 1 campaña, 1 conjunto**
- Objetivo: **Clientes potenciales · formulario nativo**
- Un solo conjunto, sin dividir por línea de servicio todavía
- Advantage+ Audience **apagado**, geo por radio sobre las comunas objetivo
- 3–4 anuncios con hooks distintos
- El formulario cierra con **"Iniciar conversación en WhatsApp"** → Heat contesta al instante

**Google — 2 campañas**
- **Marca** (presupuesto chico, casi todo el impression share)
- **Kinesiología alta intención** en Maximizar clics con tope de CPC

**Por qué formulario nativo y no la landing en la Fase 0:** genera eventos baratos y
rápido, y eso es lo que el píxel necesita para tener con qué aprender. Sin ~50 eventos
acumulados no hay públicos similares, no hay retargeting decente y no hay optimización
confiable. La landing entra cuando hay señal que la sostenga.

### FASE 1 — Landings y segunda línea *(semanas 3–6)*

Se abre **solo si** el píxel ya acumuló ~50 eventos y el presupuesto aguanta el piso.

- Se abre la landing como **segundo destino en un conjunto paralelo**, con el mismo
  presupuesto que el de formulario, y se comparan a 14 días: CPL, tasa de agenda y
  tasa de asistencia — no solo CPL
- Se abre el **segundo conjunto** (la otra línea de servicio) solo si el presupuesto
  llega al piso de la tabla para ambos
- Google: se agrega **Método — tratamiento**

### FASE 2 — Retargeting *(cuando haya pool)*

No antes de que los públicos tengan volumen suficiente. Con pools chicos, la frecuencia
se dispara en días y se quema la audiencia.

---

## Los 5 eventos (resuelve la ambigüedad del form de 2 pasos)

| Evento | Cuándo dispara | Para qué se usa |
|---|---|---|
| `Lead_Parcial` *(custom)* | Completa **Paso 1** y abandona | Público de retargeting + reportería. **Nunca para optimizar.** |
| `Lead` *(estándar)* | Form completo, o pop-up completado | **Lo que optimiza la campaña** |
| `Schedule` *(estándar)* | Heat o el humano agenda la evaluación — desde GHL vía CAPI | Optimización en Fase 2, y el KPI real |
| `Purchase` *(estándar, con valor)* | Asiste y compra el plan — desde GHL vía CAPI | Cierra el loop: Meta aprende qué lead **vale** |
| `Contact` | Entra a conversación con Heat | Exclusiones y reportería |

**Si `Lead` disparara en el Paso 1, Meta optimizaría hacia gente que llena el paso 1 y
se va** — que es justamente el comportamiento más barato de conseguir y el menos valioso.

**`Schedule` y `Purchase` de vuelta por CAPI es lo que falta completo en el board.**
Sin eso, Meta nunca sabe la diferencia entre un lead que agenda y uno que no, y el
funnel entero termina optimizando hacia formularios en vez de hacia pacientes.

---

## Google — 4 campañas, no 1

### 1. Marca
`Ondex` · `clínica Ondex` · `Ondex opiniones` · `Ondex kinesiología`
- Concordancia: exacta + frase · Destino: **Home**
- Presupuesto chico, objetivo casi 100% de impression share
- Negativas: `trabajo`, `empleo`, `sueldo`, `postular`

### 2. Kinesiología — alta intención
`kinesiólogo [comuna]` · `kinesiología [comuna]` · `centro kinesiológico [comuna]` ·
`kinesiólogo cerca de mí` · `rehabilitación post operatoria [comuna]`
- **Hay que enumerar las comunas reales.** En el board dice literalmente
  "kinesiología comuna" — eso es un placeholder, no una keyword.
- Concordancia: frase + exacta · Destino: **Landing Kinesiología**

### 3. Método — tratamiento *(entra en Fase 1)*
`ondas de choque Santiago` · `terapia de ondas de choque` · `tratamiento ondas de choque [comuna]`
- Concordancia: frase + exacta · Destino: **Landing Método**
- Negativas propias: `comprar`, `equipo`, `máquina`, `precio equipo`, `veterinaria`

### 4. Síntoma — informacional → **NO correr en Etapa 1**

`tendinitis crónica`, `fascitis plantar` y similares son **búsquedas de síntoma, no de
tratamiento**. Quien busca eso mayormente busca información: qué es, por qué duele,
ejercicios en casa. Tienen volumen, no tienen intención de compra.

En el board están **en el mismo grupo** que `ondas de choque Santiago`, que sí es alta
intención. Mezclarlas significa que el grupo entero se calibra al CPC del peor tráfico.

Se guardan para cuando haya presupuesto y contenido educativo que las capture.
En Etapa 1 la plata va a intención de tratamiento.

### Negativas globales de la cuenta
`gratis` · `curso` · `carrera` · `estudiar` · `universidad` · `sueldo` · `trabajo` ·
`empleo` · `pdf` · `wikipedia` · `qué es` · `ejercicios en casa` · `casero` ·
`veterinari*` · `perro` · `gato` · `domicilio` *(si no van a domicilio)*

**Pujas:** ninguna campaña arranca en Conversiones. Maximizar clics con tope de CPC hasta
acumular ~15–30 conversiones en 30 días. Recién ahí se cambia. Una cuenta sin historial
no puede alimentar puja inteligente: o subentrega o quema.

---

## Públicos y exclusiones — lo que el board no tiene

### Públicos a crear
1. `Visitantes web 30d`
2. `Lead_Parcial 90d` — llenaron Paso 1 y se fueron
3. `Lead 180d` — form completo
4. `Contacto Heat 90d` — entró en conversación
5. `Agendado 365d` *(desde GHL)*
6. `Pacientes actuales` *(lista del CRM)*
7. **`Lead calificado no convertido 90d`** *(desde GHL)* ← **el que falta en el board**
8. `Interacción IG/FB 365d`
9. `Video 50% 30d` *(cuando haya video)*

### Exclusiones en TODAS las campañas frías
`Lead 180d` · `Agendado 365d` · `Pacientes actuales` · `Contacto Heat 90d` ·
`Lead calificado no convertido 90d`

Sin esto se paga precio de tráfico frío para volver a alcanzar gente que ya está
adentro del funnel. *Incluir es sugerir, excluir es mandar.*

---

## El retargeting que falta

El board manda la única campaña de retargeting al pool **más frío** que existe
(visitó, no dejó nada, cerró el pop-up) y deja `Lead calificado, no convertido` como
estado terminal sin nada después.

Esa es gente que **habló con Heat, mostró interés y no agendó**. Es el pool más caliente
del diagrama entero y no recibe un peso.

**Campaña de retargeting — CBO con 2 conjuntos** *(CBO porque los públicos son chicos
y así el presupuesto va solo a donde hay gente)*

| Conjunto | Público | Nivel de consciencia | Mensaje |
|---|---|---|---|
| **A — Caliente** | `Lead calificado no convertido` + `Contacto Heat sin agendar` | Decisión | Ataca la objeción. Testimonio de alguien con el mismo caso. Garantía. Facilidad de agendar. |
| **B — Tibio** | `Lead_Parcial` + `Visitantes web` sin conversión | Problema / Solución | Por qué el dolor vuelve cuando solo se trata el síntoma. Sin pedir nada todavía. |

A es chico y caro por persona, pero convierte. B es grande y barato, y su trabajo es
traerlos de vuelta, no cerrar.

**Tope de frecuencia y piso de audiencia:** no encender un conjunto de retargeting
debajo de ~1.000 personas, y revisar frecuencia cada 3 días. Con pools chicos se quema
la audiencia en una semana.

---

## Post-agenda: el tramo que no existe en el board

`Agendado` es un estado terminal en el diagrama. Pero agendado **no es plata**, y el
no-show en clínicas se come una parte real de lo que costó conseguir la hora.

1. **Confirmación inmediata** por WhatsApp al agendar
2. **Recordatorio 24h antes** — con opción de reagendar en un toque
3. **Recordatorio 2h antes**
4. **No-show** → Heat retoma el mismo día, no al día siguiente
5. **Asistió** → seguimiento a las 48h para cerrar el plan de tratamiento
6. **Compró el plan** → evento `Purchase` con valor de vuelta a Meta por CAPI

El paso 6 es el que le enseña a Meta qué lead vale de verdad.

---

## Inventario creativo — el choque con la realidad

La ficha documenta que **Ondex no tiene material de video utilizable**. El board pide
creativos fríos para 2 líneas + creativos de retargeting + contenido orgánico que
genere los comentarios que alimentan la automatización.

**Mínimo para arrancar con 1 conjunto: 3–4 piezas con hooks distintos.** Menos que eso
y Meta no tiene con qué rotar; la frecuencia sube y el CTR cae en días.

Sin producción nueva, lo que rinde:
- **Testimonios grabados con celular** — el activo más valioso y el más barato. Un
  paciente contando que llevaba dos años con dolor vale más que cualquier producción.
- **Slideshow ads** — video armado desde fotos fijas
- **Antes/después** con consentimiento firmado
- **Carrusel educativo** — qué son las ondas de choque, en 5 tarjetas

---

## Correcciones menores del board

- **`Recuperá el control`** → voseo argentino. En Chile: **`Recupera`**. Es la landing
  de retargeting, la ve gente que ya vio la marca una vez.
- **La automatización de comentarios pide el follow antes del link.** Fricción en el
  momento de máxima intención. **Link primero, follow después.**
- **Fase 3 y Fase 5 tienen dos cajas que dicen "Opción 2".** La tercera es "Opción 3".
- **El Home como router** obliga a autoclasificarse a alguien que ya buscó la marca.
  Debería tener captura propia, no solo derivar.

---

## Lo que bloquea el encendido

| Dato | Por qué bloquea |
|---|---|
| **Ticket promedio** (evaluación vs plan completo) | Sin esto no hay CPA objetivo → no se sabe cuántos conjuntos caben |
| **Margen por línea** | Define cuánto se puede pagar por paciente |
| **Presupuesto mensual y reparto Meta/Google** | Define en qué escalón de la escalera de eventos se arranca |
| **¿Píxel instalado?** | Si no está, la Fase 0 empieza por ahí |
| **% de cierre lead → paciente** | Traduce CPL a costo por paciente |
| **Capacidad de agenda (horas/semana)** | Si la clínica no absorbe el volumen, el cuello de botella no es publicitario |

La última no es publicitaria y manda igual: no tiene sentido calibrar para 80 leads
al mes si la agenda da para 30 evaluaciones.
