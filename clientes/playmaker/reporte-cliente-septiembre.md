# Playmaker — Reporte del 18 de agosto al 10 de septiembre

> **Borrador. No enviar todavía.** Falta el bloque de Google Ads y falta cerrar
> la cifra de personas (ver nota al final).

---

## En una frase

Las campañas trajeron cerca de **1.000 personas interesadas a $350 cada una**, y
el problema nunca estuvo en la publicidad: **9 de cada 10 de esas personas nunca
recibieron un mensaje de vuelta.** Eso quedó corregido hoy y hay un rescate en
marcha sobre los que quedaron sin contactar la última semana.

---

## Los números

| | 18 ago – 10 sep |
|---|---|
| Inversión en Meta | **$349.369** |
| Personas que dejaron sus datos | **999** |
| Costo por persona interesada | **$350** |
| Personas que recibieron un mensaje nuestro | **~9%** |
| Personas que llegaron a cotización | **prácticamente ninguna** |

Es el primer período completo de esta campaña, así que no hay mes anterior contra
el cual compararlo.

**Cómo leer estas cifras.** El costo por persona interesada es real y es bajo. El
costo por conversación, en cambio, era infinito — porque no había conversaciones.
Esa es exactamente la distancia entre lo que estaba funcionando y lo que no.

---

## Lo que encontramos

Cuando nos dijiste que llegaban pocos leads, revisamos el CRM esperando encontrar
un problema de calidad. No era eso.

- **921 fichas** estaban abiertas en la etapa de entrada, esperando.
- De las **120 más recientes, 109 nunca recibieron un solo mensaje.**
- Y el dato que lo cierra: **cero fichas con un mensaje nuestro sin respuesta.**

Ese último punto es el que convierte la sospecha en certeza. Si el primer contacto
hubiera salido alguna vez, existirían personas contactadas que no contestaron.
No había ninguna. El primer mensaje no fallaba a veces: **no existía.**

**Por qué pasaba.** Todos los avisos automáticos de la cuenta arrancaban en una
etapa posterior, después de que alguien ya hubiera calificado al lead. La etapa
donde caen las personas nuevas no la miraba nadie.

Sin contactar, día por día: 13, 14, 15, 18, 24, 19. Todos los días, sin excepción.

---

## Qué corregimos

**Hoy, viernes 11 de septiembre, 11:56.** Ya está en producción.

Toda persona nueva que llega del formulario recibe un primer mensaje **dentro de
5 minutos**, escrito usando el deporte que ella misma declaró al completar el
formulario. Ejemplo real del formato:

> "Hola León! Soy Jimmy de Playmaker. Vi que consultaste por indumentaria de
> fútbol. Cuéntame qué prenda necesitas, para cuántas personas y para cuándo, y
> te armo la cotización"

**Y estamos rescatando lo que quedó atrás.** Las 119 personas de los últimos 7
días que nunca fueron contactadas están recibiendo ese mensaje ahora, a goteo —
uno cada 5 minutos, entre 9 y 20 h, para no arriesgar el número de WhatsApp.

Las anteriores a 7 días quedan fuera a propósito: a esa altura ya compraron en
otro lado, y escribirles hoy gasta reputación del número sin devolver nada.

---

## Google Ads — la campaña de fútbol

Está activa desde el 7 de septiembre, con $5.000 diarios. Lleva 4 días, así que
todo lo de abajo es una primera lectura, no un veredicto.

| 7 al 10 de septiembre | |
|---|---|
| Inversión | **$20.620** |
| Personas que entraron a la página de fútbol | **194** |
| Costo por visita | **$106** |
| Cotizaciones medidas | **no medibles todavía** (falta la etiqueta) |

**El cambio de mensaje funcionó, y se puede demostrar.** Antes de corregirlo, los
anuncios hablaban de "comprar" apuntando a una página donde se cotiza. Con el
mensaje alineado:

| | Antes (6 sep) | Ahora (7-10 sep) |
|---|---|---|
| De cada 100 que ven el anuncio, cuántos entran | 7,2 | **12,1** |
| Costo por visita | $140 | **$106** |

Más gente entra y cada visita cuesta menos.

**Lo que la gente busca confirma el negocio.** Aparecen `camisetas personalizadas`,
`uniformes de fútbol`, `camisetas para equipos de fútbol`, `hacer camisetas de
fútbol`, `equipo de fútbol para niños completo`. Son búsquedas de **mandar a
hacer**, no de comprar una camiseta suelta. Es exactamente el cliente que buscamos.

### Dos cosas con fecha, y las dos necesitan tu decisión

**1. Verificación de anunciante — antes del 10 de octubre.**
Google exige verificar la identidad del anunciante. El aviso dice textual que
"es posible que algunos de tus anuncios estén detenidos o limitados". Si no se
completa a tiempo, la campaña se detiene. Es un trámite de identidad de la
empresa y solo lo puedes hacer tú.

**2. El crédito de Google de $327.667 — antes del 31 de octubre.**
Acá hay que corregir algo que veníamos diciendo mal: el crédito **no es un regalo
directo**. La condición real es *invertir* $327.667 antes del 31 de octubre para
*recibir* $327.667 de vuelta.

| | |
|---|---|
| Invertido hasta el 10 de septiembre | $26.063 |
| Falta invertir | **$301.604** |
| Días hasta el 31 de octubre | 51 |
| A $5.000 diarios se llega a | $281.063 — **queda corto por ~$46.600** |
| Ritmo necesario | **~$5.914 diarios** |

Es decir: **al ritmo actual el crédito se pierde por poco.** Subir el presupuesto
a $6.500 diarios cuesta unos $76.500 extra en total y libera $327.667.

Y hay una segunda razón para subirlo: **hoy la campaña deja pasar demanda que no
alcanza a comprar.** De cada 100 búsquedas donde podríamos aparecer, aparecemos
en 11. Parte de eso es presupuesto.

> Antes de mover nada vamos a confirmar el contador exacto de Google, porque las
> promociones tienen letra chica y no queremos ajustar el presupuesto sobre un
> supuesto.

---

## Qué sigue

1. **Medir la tasa de contacto, no el número de leads.** A partir de hoy la
   métrica honesta es *personas contactadas ÷ personas que llegaron*, y cuántas
   avanzan a cotización. Debería pasar de ~9% a cerca de 100%.
2. **Primera lectura real de conversión: lunes 15.** Hoy el arreglo lleva horas
   en producción; cualquier número de ventas todavía no significa nada.
3. **Separar las campañas por deporte** para poder comparar en igualdad de
   condiciones cuál rinde mejor. Hoy los anuncios compiten entre ellos dentro de
   un mismo grupo y no todos alcanzan a medirse.

**Una advertencia honesta sobre el rescate.** En otra cuenta donde corregimos
esto mismo esta semana, **el 24% de los números falló** — gente sin WhatsApp o
que escribió mal el teléfono en el formulario. Es normal en contactos fríos.
Cuando veas la tasa de respuesta, ese 24% hay que descontarlo antes de sacar
conclusiones.

---

## Qué necesitamos de ti

**1. El ticket promedio de un pedido y el margen aproximado.**
Hoy sabemos que una persona interesada cuesta $350. No sabemos si eso es barato o
caro para tu negocio, porque no sabemos cuánto deja un pedido. Es el dato que
falta para decidir si en octubre subimos el presupuesto o lo mantenemos.

**2. Acceso al sitio para instalar la medición de Google.**
La etiqueta que hay instalada hoy es de la cuenta de Google Ads antigua, a la que
ya no se tiene acceso. Necesitamos poder instalar la nueva. Sin eso, la campaña
de Google entrega bien pero a ciegas: no podemos saber cuántas cotizaciones
generó. Son $150.000 al mes. Un mes a ciegas se aguanta; dos no.

**3. Que nos digas cuáles de estas personas sirven de verdad.**
Ahora que las conversaciones arrancan, lo más valioso que puedes darnos es marcar
cuáles terminan en cotización real. Con eso le enseñamos a Meta a buscar más
gente parecida, en vez de buscar simplemente al más barato.

**4. La fecha de la tienda nueva en Shopify.**
Cambia dónde se instala la medición y cambia lo que pueden decir los anuncios.
Preferimos planificarlo antes que reaccionar después.
