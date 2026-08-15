# 13 — WhatsApp y mensajes: el playbook LATAM

El caso de uso dominante en Latinoamérica y el que más rápido produce resultados con
poco presupuesto. Este documento es la configuración exacta, los umbrales reales y los
errores que cuestan plata.

**Referencia de escala alcanzable:** una agencia reporta **228.000 conversaciones a
US$0,10-0,12** cada una.

---

## 1. Antes de tocar el Administrador: optimiza el WhatsApp Business

El error más caro es lanzar campañas sobre un WhatsApp mal montado. **Cinco arreglos
previos** que subieron la tasa de conversión de 8% a 10% en un caso real:

- Foto de perfil, nombre y descripción del negocio completos
- **Mensaje de bienvenida automático** configurado
- Catálogo cargado dentro de WhatsApp
- Respuestas rápidas para las preguntas frecuentes
- Horario de atención declarado

**Si hay varias personas respondiendo**, resuélvelo antes: o WhatsApp Business
multidispositivo, o una plataforma tipo CRM. Escalar una campaña de mensajes por encima
de lo que el equipo puede responder destruye la tasa de cierre y arruina la economía de
la cuenta entera.

---

## 2. Configuración exacta de la campaña (2026)

Requisito previo: **número de WhatsApp conectado** (botón "Conectar número" → Meta
manda un SMS de confirmación).

```
1. Crear → objetivo INTERACCIÓN → "Campaña manual de interacción"

2. Las dos funcionalidades adicionales que aparecen:
   → en la PRIMERA campaña, déjalas APAGADAS

3. Nivel conjunto de anuncios:
   Destino: "Enviar a las personas a una aplicación de mensajes"
   Selecciona tu página de Facebook
   Si quieres SOLO WhatsApp → deselecciona Messenger e Instagram Direct

4. Objetivo de rendimiento: "Maximizar el número de conversaciones"

5. Presupuesto: DIARIO, a nivel conjunto

6. Fecha de finalización: EN BLANCO

7. Público: si la cuenta es nueva →
   "No gracias, usar público original"  (en vez de Advantage)

8. Ubicaciones: Advantage ACTIVADA
   (inicio de FB, inicio de IG, historias, reels, Audience Network)
```

> **Nota de plataforma:** las campañas de Mensajes ya no son un objetivo propio — viven
> dentro de **Interacción**. Ver `09-plataforma-2026.md`.

---

## 3. Estructura de cuenta: 75 / 25

| Campaña | % | Conjuntos |
|---|---|---|
| **Tráfico frío** | **75%** | 3 conjuntos: intereses · lookalike · segmentación abierta (solo edad, sexo, ubicación) |
| **Retargeting** | **25%** | 1 conjunto con los 3 públicos de 180 días |

**4 anuncios por conjunto**, variando **formato** (imagen, video, secuencia) y **ángulo**
(testimonio, marca, oferta, publicación existente). Meta reparte el presupuesto entre
los 4 y con el tiempo apaga solo los peores por costo por resultado.

⛔ **Nunca la estructura "1-1-1"** (1 campaña, 1 conjunto, 1 anuncio): si ese anuncio no
funciona, no tienes con qué compararlo.

### Presupuesto de arranque
**~10.000 COP/día por conjunto (≈US$2,5).** Meta va a sugerir 60.000 COP — seis veces
más. **Ignora la sugerencia.**

---

## 4. Los umbrales que deciden

De una auditoría real de 30 días (marca de cuidado del cabello):

| Métrica | Valor |
|---|---|
| Inversión | US$1.076 |
| Conversaciones | 2.977 |
| **Costo por conversación** | **US$0,36** |
| Ventas | US$7.782 |
| Tasa de conversión conversación → venta | **8,36%** |
| ROI | **>7** |

Desglose: *prospecting* US$926 → 2.265 conv. a US$0,41 · *retargeting* US$149 → 665
conv. a **US$0,23**.

### Reglas de poda

| Regla | Acción |
|---|---|
| Costo por conversación **> US$0,40** | **Pausar** ese conjunto/público |
| Objetivo a alcanzar | **US$0,25 – 0,30** |
| Concentración | Quedarse con los **5 públicos** más rentables |
| Presupuesto en ganadores | Subir de US$3 a **US$6/día** |

> **Por qué consolidar en vez de repartir:** *"los costos suelen incrementarse con los
> presupuestos demasiado pequeños"*, porque al algoritmo le toma más tiempo encontrar a
> quienes responden mejor. Muchos anuncios con presupuesto minúsculo rinden peor que
> pocos bien alimentados. Es el mismo principio de `05-presupuesto.md`.

---

## 5. Las 5 columnas que hay que dejar en el Administrador

Configura las columnas para ver solo lo que decide:

1. **Importe gastado**
2. **Conversaciones iniciadas**
3. **Costo por conversación**
4. **Frecuencia**
5. **CTR único (enlace)**

Ejemplo de decisión real: 4 anuncios, presupuesto 6.000 COP/día (~US$1,5). Uno costaba
1.136 COP por conversación (US$0,30) y otros dos entre 320 y 346 COP (US$0,07) — **3×
de diferencia**. Se apaga el caro, y el promedio del conjunto baja a 348 COP.

---

## 6. Anatomía del anuncio a WhatsApp

| Elemento | Recomendación |
|---|---|
| **Creativo** | Testimonio como primer ángulo a probar |
| **Título y descripción** | Claros, con el beneficio principal |
| **CTA** | "Enviar mensaje" |
| **Mensaje predeterminado** | El texto con el que arranca el chat — **es el que define la calidad del lead** |

> **El mensaje predeterminado es la palanca de la tasa de conversión a mensajes.** Si
> esa tasa está por debajo del 50-60% (`06-optimizacion.md`), la acción es hacerlo
> **más específico**: que quien escribe ya sepa exactamente qué va a pasar.

---

## 7. Retargeting cuando no hay sitio web

El problema clásico: sin píxel no hay públicos web. Se resuelve con públicos de
interacción, todos a **180 días**:

1. Interactuaron con tu perfil de **Instagram**
2. Interactuaron con tu página de **Facebook**
3. Vieron **≥10 segundos** de tus videos

**Configuración del conjunto de retargeting:**
- Edad y sexo **amplios** (alguien fuera del rango típico puede comprar igual)
- **Desactivar "público personalizado Advantage"** — aquí el objetivo es enfocarse en
  quienes ya te conocen, no ampliar

### Las 3 campañas de retargeting por etapa del ciclo

| Etapa | Ventana | Ángulo del anuncio |
|---|---|---|
| **Evaluación** | 90 días | Testimonios, beneficios |
| **Conversión** | 30 días | Producto, promoción |
| **Restock / recompra** | 30 días | Novedad, reposición |

---

## 8. Clientes potenciales: el filtrado de leads

Cuando el problema no es el volumen sino la **calidad**.

**Ruta:** en el formulario instantáneo, agregar preguntas de calificación. Cinco
preguntas típicas, siendo la más discriminante la de facturación o volumen (ej.
*"¿cuál es tu facturación mensual?"* con opciones 0-50 / 51-100 / 100-500 / 500+).

### El resultado esperado es contraintuitivo

**El costo por lead SUBE a propósito.** Caso real: 30 días, US$2.449, **86 leads a
US$28,48 cada uno** — muy por encima de lo que costaban antes. Pero son leads que
realmente compran.

> Si vas a filtrar, **avisa antes que el CPL va a subir** y define el número mágico en
> función del lead *calificado*, no del lead bruto. Ver `07-escalamiento.md`.

**Regla de seguimiento:** contactar los leads en menos de una semana, **idealmente
dentro de las 48 horas**.

---

## 9. Instagram Direct como destino alterno

Cuesta más pero convierte mejor. Caso: US$70 (203.423 COP) → **118 conversaciones → 14
pedidos (11,9% de cierre)**. Configuración: 2 ubicaciones de Instagram, edad 25-50.

---

## 10. Las 2 estrategias poco conocidas de campañas de Interacción

**a) Prueba social concentrada.** Una campaña de Interacción pequeña apuntando a
publicaciones concretas para acumular likes y comentarios reales. Presupuesto: **5-10%
de la campaña principal**. La prueba social dura **3-4 años** en esa publicación y
alimenta todos los anuncios que la usen después.

**b) Reutilizar la publicación con prueba social como anuncio.** En vez de crear un
anuncio nuevo, usa la publicación existente que ya acumuló interacción. El anuncio nace
con prueba social visible.

Referencia de proporción real: Conversiones US$22.600/día · Interacción US$4.000.

---

## 11. Atribución: el error que arruina la optimización

**9 de cada 10 anunciantes pierden la atribución de las campañas click-to-WhatsApp**
porque no capturan el `ctwa_clid` que Meta inyecta en el webhook ni disparan el evento
correcto de la API de Conversiones.

**La consecuencia es grave:** sin ese dato, Meta nunca sabe qué conversación terminó en
venta, y por lo tanto **no puede optimizar hacia compradores — solo hacia gente que
escribe.** Ese es el motivo #1 de campañas con mucho volumen de conversaciones basura.

Ver `09-plataforma-2026.md` y `11-ia-y-mcp.md`.

---

## 12. Rangos de alcance y calendario

**Alcance potencial objetivo:**
- Nacional: **100.000 – 2.000.000**
- Internacional: **1 – 10 millones**
- Edad por defecto: 18-65

**Ventanas de análisis:** conjunto de anuncios **14 días** · campaña **30 días**.

**Calendario de Black Friday para mensajes:**
- **1 semana antes** → prospecting
- **2-4 semanas antes** → prerregistro (para retargetear después)
- Extender hasta **Cyber Monday**

---

## 13. Checklist de campaña de WhatsApp

- [ ] WhatsApp Business optimizado (los 5 puntos de §1)
- [ ] Definido **quién responde** y en cuánto tiempo
- [ ] Número conectado y verificado por SMS
- [ ] Objetivo **Interacción** → maximizar conversaciones
- [ ] Fecha de finalización en blanco
- [ ] 75/25 entre frío y retargeting
- [ ] **4 anuncios por conjunto**, variando formato y ángulo
- [ ] Advantage de público **OFF en retargeting**, ON en frío
- [ ] Las 5 columnas configuradas
- [ ] Costo por conversación objetivo definido (**US$0,25-0,40** como referencia)
- [ ] `ctwa_clid` + API de Conversiones funcionando
- [ ] Próxima optimización agendada a **5-7 días**
