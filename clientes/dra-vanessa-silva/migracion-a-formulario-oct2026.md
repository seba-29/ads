# DRA. VANESSA SILVA — de WhatsApp a formulario

> Decisión de Seba, 14-oct-2026: el upgrade de ahora es pasar la pauta de
> conversación directa a WhatsApp → **formulario de clientes potenciales**.
> **Sin CAPI todavía**: el formulario optimiza nativo y no lo necesita. El CAPI
> entra después, cuando haya volumen de clientes potenciales acumulado.
> Cuenta `1321852590109746`.

## Por qué esto es un upgrade de verdad

La campaña de WhatsApp corre con objetivo **Interacción**, optimizando por
`onsite_conversion.messaging_conversation_started`. Meta busca gente que abre
conversación — y lo hace muy bien, por eso sale a $297. Es el evento más barato y
el más lejos de una venta.

El formulario optimiza por `leadgen.other`: Meta busca gente que **completa un
formulario con sus datos**. Es más caro por unidad a propósito, y es el evento que
sí se parece a un cliente. Además no necesita CAPI: el evento es de Meta.

## El movimiento de plata

| Conjunto | Hoy | Queda en |
|---|---:|---|
| `Meta form \| Santiago \| Promociones` | $8.363/día | **$9.500/día** |
| `Meta form \| Santiago \| Lipovaser` *(nuevo)* | — | **$5.000/día** |
| `Mujeres \| 22-55 \| Zona centro CL` *(form)* | $2.261/día | ⛔ **apagar** |
| `PROMOCIONES - Mujeres \| Zona centro` *(WhatsApp)* | $2.039/día | ⛔ **apagar** |
| `Mujeres \| Zona centro CL (1-3-5)` *(WhatsApp)* | $2.000/día | ⛔ **apagar** |
| | **$14.663/día** | **$14.500/día** |

**$435.000 al mes**, bajo el techo de $500.000. No es plata nueva: es la misma,
movida.

### Los dos conjuntos pasan el umbral de aprendizaje

Meta necesita ~50 resultados por semana por conjunto. A los costos de hoy:

| Conjunto | $/día | CPL de referencia | Leads/semana |
|---|---:|---:|---:|
| Promociones | $9.500 | $470 | **~141** ✅ |
| Lipovaser | $5.000 | $668 | **~52** ✅ |

Por eso Lipovaser va a $5.000 y no a $4.000: a $4.000 quedaba en 42/semana y nacía
en aprendizaje limitado.

> ⚠️ Subir Promociones de $8.363 a $9.500 es **+13,6%**. Es a propósito: pasar del
> 25% de una vez reinicia la fase de aprendizaje del único conjunto que hoy
> funciona bien. Si hay que subirlo más, se hace en tramos cada 3-4 días.

## Por qué un conjunto propio para Lipovaser

Medido en el CRM, semana del 07 al 14-oct:

| Etiqueta que pone Lorena | Contactos |
|---|---:|
| **`promo-lipovaser`** | **69** |
| `promo-lipoescultura` | 36 |

**Casi el doble de consultas por Lipovaser.** Y en la pauta de WhatsApp el anuncio
`PROMOCION LIPOVASER` llevaba **$24 y 4 impresiones en 14 días**: Meta no le dio
nada porque Lipoescultura le resultaba más barata. Dentro de un mismo conjunto el
algoritmo siempre va a elegir la oferta barata; la única forma de servir la premium
es darle su propio presupuesto.

No es optimización, es una decisión de negocio: la promo de $3.200.000 tiene demanda
y hoy no se está sirviendo.

## Configuración

**Campaña:** `Clientes potenciales | FORM | ABO` *(la que ya existe)*
**Objetivo:** Clientes potenciales · destino **Formulario instantáneo**
**Presupuesto:** por conjunto (ABO), no por campaña

### Conjunto A — `Meta form | Santiago | Promociones` *(ya existe, solo sube)*
- $9.500/día
- Se deja TAL CUAL lo demás: público, ubicación, formulario. Lo único que cambia es
  el presupuesto.
- Anuncios actuales: `Lipoescultura` ($324/lead) y `Vaser 360 - $3.200.000`
  ($668/lead). **Sacar el de Vaser de acá** — se va al conjunto B. Así este queda
  entero para Lipoescultura, que es lo que ya rinde.

### Conjunto B — `Meta form | Santiago | Lipovaser` *(nuevo)*
- $5.000/día
- **Geo:** Santiago
- **Edad:** 18-65 *(el mínimo 18 no es opcional: Meta lo exige para contenido de
  procedimientos estéticos)*
- **Género:** mujeres *(con Advantage+ es una sugerencia, no una orden — ponerlo
  igual, orienta el arranque)*
- **Advantage+ Audience:** encendido (el default). Las exclusiones sí mandan.
- **Exclusiones:** `EXCL · Clientes` *(cuando exista la lista)*
- **Anuncio:** el de `Vaser 360 - $3.200.000` que ya tiene 106 leads a $668. Se
  mueve, no se recrea: conserva la prueba social del anuncio.
- **Formulario:** uno propio de Lipovaser (copy abajo)

### Públicos a crear hoy, aunque se usen después
- `AUD · Formulario abierto sin enviar · 90d` ← el más valioso en lead-gen, y solo
  acumula si se crea antes de necesitarlo
- `AUD · Interacción FB+IG · 365d`
- `EXCL · Clientes`

## El formulario de Lipovaser

**Tipo:** Más intención *(el de $3.200.000 no se vende con un formulario de un toque)*

**Título** *(máx. 60)*
```
✨ Lipo 360 con VASER — cuéntanos tu caso
```

**Descripción**
```
Liposucción 360 de hasta 5 zonas con tecnología VASER: extracción más precisa y
recuperación más rápida. Incluye lipotransferencia a glúteos con tu propia grasa. 🩺

✅ Pabellón de cirugía mayor y controles postoperatorios
✅ Clínica Alonso de Córdoba — Las Condes
✅ Evaluación presencial, por videollamada o por fotos
✅ Simulación 3D para ver tu resultado estimado

Déjanos tus datos y la Dra. Vanessa Silva revisa tu caso. 💬
```

**Preguntas** *(dos, ni una más)*
1. `¿Qué zonas te interesa trabajar?` — Abdomen y cintura · Espalda · Brazos ·
   Lipo 360 completa · Todavía no lo sé
2. `¿Para cuándo lo estás pensando?` — Lo antes posible · En los próximos 3 meses ·
   Estoy averiguando

**Prellenados:** nombre, **teléfono (obligatorio)**, correo, ciudad

**Pantalla final** — acción nativa **"Chatear en WhatsApp"**
```
Título:      ¡Listo! Escríbenos ahora y te atendemos al instante 💬
Descripción: Recibimos tus datos. Toca el botón y seguimos por WhatsApp:
             resolvemos tus dudas, te contamos qué incluye y coordinamos tu
             evaluación con la Dra. Vanessa Silva.
             Respondemos todos los días, a cualquier hora. 💬
```

**Sin precios en el formulario.** El valor de la lipo ya se corrigió una vez y un
formulario no se puede editar después de recibir leads. Lo dice Lorena, que lee la
KB al día.

## Qué mirar, y cuándo

**Los primeros 7 días no se toca nada.** Los dos conjuntos entran en aprendizaje y
los números de los primeros 3-4 días no significan nada.

A los 7 días, tres preguntas:

1. **¿Cada conjunto pasó los 50 leads?** Si Lipovaser quedó corto, sube a $6.000 en
   vez de bajarlo.
2. **¿El CPL de Promociones se mantuvo cerca de $470?** Si se fue sobre $700, el
   problema es el salto de presupuesto, no el canal.
3. **🔴 ¿Bajaron los agendamientos?** Esta es la que importa y la que hay que mirar
   con honestidad.

### Sobre la tercera

Se apagó el canal que, medido del 07 al 14-oct, pedía hora en **3,96%** (101
contactos de anuncios de WhatsApp, 4 pidieron hora). Los contactos sin rastro de
WhatsApp —que probablemente son los del formulario— pidieron hora en **1%** (101
contactos, 1 pidió).

Esa diferencia puede ser de dos cosas, y todavía no sabemos cuál:
- **El formulario califica peor** → entonces esta migración baja los agendamientos
  aunque suba los leads.
- **A los leads de formulario nadie les escribe** → entonces el problema no es el
  canal, y se arregla metiéndolos al flujo de Lorena.

**Si a los 7 días los leads suben y los agendamientos bajan, es la segunda**: hay
que hacer que esos leads entren a la conversación con Lorena antes de seguir
escalando. Es lo primero que hay que revisar, no la pauta.

## Lo que queda pendiente (no es de hoy)

- **Atribución del formulario:** los leads entran a GHL sin etiqueta de origen. Con
  todo el presupuesto ahí, esto pasa de ser una molestia a ser el agujero principal.
- **CAPI:** cuando el volumen de clientes potenciales esté acumulado. Hoy el CRM
  manda 38 `Lead`/semana y hacen falta 50.
- **Las tres reglas de CAPI que no disparan** (`Schedule`, `Contact`,
  `InitiateCheckout`): están prendidas y apuntan a etapas que nadie mueve a mano.
  Sin eso no hay forma de optimizar por agendamiento más adelante.
- **Ampliar geo** fuera de Santiago: el formulario trae el campo Ciudad prellenado,
  así que ahora se puede decidir con datos.
