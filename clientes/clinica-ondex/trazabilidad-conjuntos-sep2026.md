# Ondex · De qué conjunto están agendando — septiembre 2026

> Medido el 21-sep-2026. Fuente: los **1.819 contactos** y las **1.736
> oportunidades** de la subcuenta `CHtgjFPx4hWkSAtKewIo`, cruzados contra el
> gasto por conjunto de la cuenta `1034674525430396`. No es una muestra.

## Cómo se contó (importa, porque dos veces cambió el resultado)

- **La unidad es el CONTACTO.** Un mismo paciente genera una oportunidad en cada
  embudo (Captación → Agendamiento → Tratamiento). Contando oportunidades, el
  mismo agendamiento se cuenta hasta tres veces.
- **Se parte del listado de contactos, no de las oportunidades.** Partir de las
  oportunidades deja afuera a los contactos que todavía no entraron al embudo.
- **«Agendado» = llegó a agendar o más allá**: la etapa `Agendado` del Embudo 1,
  o cualquier etapa de los Embudos 2 y 3. Incluye no-shows y reagendas: tuvo
  hora igual.
- **El origen se lee de dos lugares.** El formulario nativo y WhatsApp lo traen
  en `attributions[]`. La landing propia lo deja en los campos personalizados
  del contacto. ⚠️ El id del CONJUNTO viaja en `UTM term`; en `UTM medium` va el
  literal `"paid"`.

## La respuesta a la pregunta de Matías

| Conjunto | Campaña | Leads | Agendados | Tasa | Gasto | $/agendamiento |
|---|---|---:|---:|---:|---:|---:|
| **Ondas de Choque \| Santiago** | Formulario | 459 | **14** | 3,1% | $258.203 | **$18.443** |
| **Kinesiologia \| Santiago** | Formulario | 204 | **7** | 3,4% | $257.840 | $36.834 |
| **Kinesiologia \| Santiago** | Landing | 17 | **4** | 23,5% | $168.608 | $42.152 |
| **Ondas de Choque \| Santiago** | Landing | 48 | **3** | 6,2% | $167.222 | $55.740 |
| **Adventage +** | Creatiklab | 284 | **3** | 1,1% | $215.096 | $71.698 |
| **Hot Traffic** | Creatiklab | 177 | **1** | 0,6% | $164.271 | $164.271 |
| Landing \| Tbrein \| Las Condes | Landing | 3 | 0 | 0% | $81.640 | — |
| Landing \| Tbrein \| Copia | Landing | 3 | 0 | 0% | $38.137 | — |
| Nuevo conjunto (Whatsapp Las Condes) | Whatsapp | 0 | 0 | — | $122.122 | — |
| *Landing sin UTM — no se sabe el conjunto* | Landing | 28 | **6** | 21,4% | — | — |
| *Sin ningún rastro de campaña* | — | 545 | **13** | 2,4% | — | — |

**El conjunto que más agenda es `Ondas de Choque | Santiago` de la campaña de
FORMULARIO: 14 agendamientos a $18.443 cada uno.** Es el más barato por
agendamiento de toda la cuenta y el de más volumen.

Por canal completo:

| Canal | Leads | Agendados | Tasa | Gasto | $/agendamiento |
|---|---:|---:|---:|---:|---:|
| **Landing propia** | 102 | **13** | **12,7%** | $455.607 | $35.047 |
| **Formulario nativo** | 663 | **21** | 3,2% | $516.043 | **$24.573** |
| **Creatiklab** *(pausada)* | 461 | **4** | 0,9% | $379.367 | $94.842 |

La landing convierte **4× mejor por lead**, pero el lead le cuesta bastante más.
Por agendamiento las dos primeras quedan a $35.047 contra $24.573 — con 13 y 21
casos, esa diferencia **no alcanza para declarar un ganador**. Se dejan las dos
y se vuelve a medir en octubre.

Lo que sí está claro: **Creatiklab era 3,9× más cara por agendamiento.** Se
pausaron sus dos conjuntos el 21-sep.

Y **los dos conjuntos de Tbrein llevan $119.777 con 6 leads y cero
agendamientos.** Es lo primero que hay que apagar.

## ✅ Resuelto: no se están perdiendo leads de la landing

Se reportó antes que de 152 leads que Meta contaba en la landing solo llegaban
37 al CRM. **Eso era un error de medición, no un problema del sistema.**

La causa: se leyeron los contactos uno por uno con `GET /contacts/{id}` en
paralelo, y GHL **devuelve HTTP 200 con el contacto sin sus campos** cuando se
le pide muy seguido. No responde 429: recorta. Releídos de a uno y con pausa,
los 10 de la muestra volvieron completos. Como un contacto sin campos es
indistinguible de uno que no vino de la landing, faltaban 37 de 66 y el número
parecía razonable.

La cadena real, ya reconciliada con las **215 corridas** de la automatización
`Nuevo Lead - Form Landing`:

| | |
|---|---:|
| Corridas de la automatización | 215 |
| Contactos de landing en GHL | **102** |
| Corridas por contacto | **2,11** |
| De esos, con oportunidad en el embudo | 99 |
| De esos, agendados | 13 |

2,11 corridas por contacto es exactamente lo que produce un formulario de dos
pasos: una en la captura parcial y otra en el envío completo, las dos sobre el
mismo contacto. Coincide además con los campos: **98 `lead_completo` y 4
`lead_parcial`**. **El webhook no pierde nada.**

## Lo que sigue abierto

### 1. Meta cuenta 152 y la realidad son 102

Queda una diferencia de 50 leads (49%) **del lado de Meta**, no del CRM. Es
inflación de reporte, no leads perdidos: son ventanas de atribución de 7 días
por clic y 1 día por visualización, más posible falta de deduplicación entre el
píxel y CAPI (los contactos traen un campo `Event ID Meta`, que es justamente
lo que sirve para deduplicar).

**Consecuencia práctica:** el costo por lead que muestra el panel de Meta para
la landing está subestimado en ~a la mitad. El costo por lead real es
$455.607 / 102 = **$4.467**, no los ~$3.000 que aparecen en Meta.

### 2. Hay 28 leads de landing sin UTM — y 6 de ellos agendaron

Son contactos que traen `Origen landing` pero no `UTM campaign`. Llegaron a la
landing sin parámetros de campaña: tráfico directo, orgánico, o un clic que
perdió los UTM en el camino. **Tienen la mejor tasa de la tabla (21,4%)** y no
se les puede asignar conjunto.

Vale la pena arreglarlo en la landing: si no hay UTM en la URL, guardar al menos
`fbclid` y el `Referrer` para poder separar orgánico de pagado.

### 3. El 25% de los agendamientos sigue sin campaña

De los **51 agendamientos del mes**, 38 se atribuyen a un canal y **13 no**.
Entran por WhatsApp con `attributions[]` vacío (`source: IA`) o por carga
manual. La campaña `Clientes potenciales / Whatsapp / Las Condes` gastó
**$122.122**, generó 44 conversaciones según Meta, y no aparece ni una vez en el
CRM.

Se arregla capturando el `ctwa_clid` de los anuncios click-to-WhatsApp y
guardándolo en el contacto.

## Qué hacer

1. **No tocar `Ondas de Choque | Santiago` (formulario).** Es el que funciona.
2. **Apagar los dos conjuntos de Tbrein** — $119.777, 6 leads, cero agendamientos.
3. **Guardar `fbclid` y `Referrer` en la landing** cuando no vengan UTM.
4. **Capturar el `ctwa_clid`** de los anuncios de WhatsApp.
