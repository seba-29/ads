# Ondex · De qué conjunto están agendando — septiembre 2026

> Medido el 21-sep-2026 cruzando **todas** las oportunidades de GHL de la
> subcuenta `CHtgjFPx4hWkSAtKewIo` contra el gasto por conjunto de la cuenta
> `1034674525430396`. No es una muestra: son las 1.736 oportunidades que
> existen, filtradas a los contactos cuya PRIMERA oportunidad nació en
> septiembre.

## Cómo se contó (importa, porque cambia el número)

- **La unidad es el CONTACTO, no la oportunidad.** Un mismo paciente genera una
  oportunidad en cada embudo (Captación → Agendamiento → Tratamiento). Contando
  oportunidades, el mismo agendamiento se cuenta hasta tres veces. Contando
  contactos únicos, una vez.
- **«Agendado» = llegó a agendar o más allá**: la etapa `Agendado` del Embudo 1,
  o cualquier etapa de los Embudos 2 y 3 (entrar al Embudo 2 ya significa que
  tuvo hora). Incluye no-shows y reagendas: tuvo hora igual.
- **La campaña sale de dos lugares distintos.** El formulario nativo y WhatsApp
  la traen en `attributions[]` (integración oficial de GHL). La landing propia
  NO: entra por nuestro webhook y la deja en los campos personalizados del
  contacto (`UTM campaign`, `UTM term`, `UTM content`). Hay que leer los dos.
  ⚠️ El id del CONJUNTO viaja en `UTM term`; en `UTM medium` va el literal
  `"paid"`.

## La respuesta a la pregunta de Matías

| Conjunto | Campaña | Leads en CRM | Agendados | Tasa | Gasto | Costo por agendamiento |
|---|---|---:|---:|---:|---:|---:|
| **Ondas de Choque \| Santiago** | Formulario | 463 | **14** | 3,0% | $258.203 | **$18.443** |
| **Kinesiologia \| Santiago** | Formulario | 205 | **7** | 3,4% | $257.840 | $36.834 |
| **Ondas de Choque \| Santiago** | Landing | 17 | **3** | 17,6% | $167.222 | $55.740 |
| **Adventage +** | Creatiklab | 284 | **3** | 1,1% | $215.096 | $71.698 |
| **Kinesiologia \| Santiago** | Landing | 9 | **2** | 22,2% | $168.608 | $84.304 |
| **Hot Traffic** | Creatiklab | 177 | **1** | 0,6% | $164.271 | $164.271 |
| Landing \| publico Tbrein \| Las Condes | Landing | 3 | 0 | 0% | $81.640 | — |
| Landing \| publico Tbrein \| Las Condes - Copia | Landing | 0 | 0 | — | $38.137 | — |
| **Nuevo conjunto** (Whatsapp Las Condes) | Whatsapp | *invisible* | *invisible* | — | $122.122 | — |

**El conjunto que más agenda es `Ondas de Choque | Santiago` de la campaña de
FORMULARIO: 14 agendamientos a $18.443 cada uno.** Es el más barato por
agendamiento de toda la cuenta y el que más volumen produce.

En segundo lugar `Kinesiologia | Santiago` (formulario), con 7 a $36.834.

**Los dos conjuntos de Tbrein no agendan a nadie.** El original quemó $81.640
en 2.805 clics y 2.432 vistas de landing sin un solo lead; la copia gastó
$38.137 y sus 9 leads no aparecen en el CRM. Entre los dos, **$119.777 sin un
agendamiento**.

## ⚠️ Dos agujeros que hacen que esta tabla sea un piso, no la verdad

### 1. De cada 4 leads de la landing, 3 no llegan al CRM

| | Meta dice | GHL tiene |
|---|---:|---:|
| Ondas de Choque (landing) | 101 leads | 17 contactos |
| Kinesiologia (landing) | 42 leads | 12 contactos |
| Tbrein - Copia | 9 leads | 0 contactos |
| Tbrein original | 0 leads | 0 contactos |
| **Total** | **152** | **37** |

Meta cuenta 152 eventos `Lead` en los conjuntos de landing. En GHL hay 37
contactos con rastro de landing (29 con UTM completo + 8 con `Origen landing`
pero sin UTM). **Faltan 115.** Mientras esto no se cierre, el costo por
agendamiento de la landing ($55.740) está inflado por un factor desconocido:
si esos 115 existen y agendan a la misma tasa, la landing sería el mejor canal
de la cuenta por lejos.

**Lo que NO está verificado:** cuál de los dos números miente. Puede ser que el
webhook pierda envíos, que el píxel dispare `Lead` también en la captura
parcial del paso 1, o que Meta esté atribuyendo conversiones fuera de la
sesión. **Hay que medirlo antes de mover un peso por esto.**
Prueba concreta: llenar el formulario 5 veces desde dispositivos distintos y
contar cuántos contactos aparecen en GHL. Si aparecen los 5, el problema es el
píxel; si aparecen 2, el problema es el webhook.

### 2. El 41% de los agendamientos no tiene campaña

De los **51 agendamientos de septiembre**, 30 se pueden atribuir a un conjunto
y **21 no**. Esos 21 se reparten así:

- **11** entran con `source: IA` y `attributions[]` completamente vacío — son
  conversaciones de WhatsApp que el agente levanta sin rastro de origen.
- **8** entran como `Manual` desde workflows del CRM o carga a mano.
- **1** desde Instagram sin campaña, **1** desde web.

La campaña `Clientes potenciales / Whatsapp / Las Condes` gastó **$122.122** y
generó **44 conversaciones** según Meta, y no aparece ni una vez en el CRM. Es
la sospechosa principal de buena parte de esos 11.

**Traducción para Matías:** hoy podemos decir con certeza de dónde vienen 30 de
51 agendamientos. Los otros 21 entran por WhatsApp sin que el CRM registre qué
anuncio los trajo. Eso se arregla activando el parámetro de referencia de los
anuncios click-to-WhatsApp (`ctwa_clid`) y guardándolo en el contacto.

## Qué hacer con esto

1. **No tocar `Ondas de Choque | Santiago` (formulario).** Es el que funciona.
2. **Apagar los dos conjuntos de Tbrein** — $119.777 sin un agendamiento.
3. **Medir el agujero de la landing** con la prueba de los 5 envíos, antes de
   decidir si la landing es cara o si simplemente no la estamos contando.
4. **Capturar el origen de los leads de WhatsApp.** Mientras 41% de los
   agendamientos no tenga campaña, cualquier decisión de presupuesto se toma
   sobre la mitad de los datos.
