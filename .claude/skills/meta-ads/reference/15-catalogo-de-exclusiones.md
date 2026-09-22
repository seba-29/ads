# 15 — Catálogo de exclusiones: el listado operativo

`10-publicos-y-exclusiones.md` explica **por qué** la exclusión es el mecanismo entero
del ciclo en 2026. Este documento es el **listado**: cada fuente, cada segmento que hay
adentro, cada ventana, y qué exclusiones van en cada campaña.

Se usa como checklist al armar una cuenta y como auditoría al recibir una heredada.

> Regla de la que cuelga todo (Ley 1 de `09-plataforma-2026.md`):
> **incluir es sugerir, excluir es mandar.**
> Con Advantage+ Audience activado, las exclusiones de públicos personalizados son de
> las poquísimas entradas que Meta obedece siempre — y solo si están puestas en
> **controles**, no en sugerencias.

---

## 1. Deconstrucción de una cuenta profesional

Tres capturas de la planilla de una cuenta real de financiamiento vehicular
(Lima y Colombia). Sirven de caso canónico porque muestran el ciclo caliente completo
—evaluación, conversión y permanencia— con sus públicos y exclusiones a la vista.

### Captura A — campaña de EVALUACIÓN (retargeting tibio)

Dos conjuntos de anuncios, misma ubicación (Lima), mismo rango demográfico
(H+M, 18-65+), ubicaciones Advantage+:

| | Conjunto 1 | Conjunto 2 |
|---|---|---|
| **Público** | Interactuaron con página de Facebook · 30d<br>Interactuaron con Instagram · 30d<br>Reproducciones de video +10s · 30d<br>Visitantes web · 30d | Seguidores Facebook · 90d<br>Seguidores Instagram · 90d<br>Reproducciones de video +10s · 90d<br>Visitantes web · 90d |
| **Exclusiones** | Abrieron formularios · 90d<br>Lista de Clientes Potenciales<br>Clientes Potenciales web · 180d | *(las mismas)* |

### Captura B — campaña de CONVERSIÓN (formularios instantáneos)

| Campo | Valor |
|---|---|
| Ubicación de la conversión | Formularios Instantáneos |
| Objetivo de rendimiento | Maximizar el número de clientes potenciales |
| Calendario | Indefinido |
| **Público** | Abrieron el formulario **pero no lo enviaron** · 90d |
| **Exclusiones** | Abrieron y **completaron** el formulario · 90d<br>Lista de Clientes Potenciales<br>Clientes Potenciales web · 180d |
| Ubicaciones | Advantage+ |

### Captura C — campaña de ASCENSIÓN / permanencia (objetivo Reconocimiento)

| Campo | Valor |
|---|---|
| Objetivo de campaña | **Reconocimiento** *(ya no Clientes potenciales)* |
| Presupuesto Advantage+ | On |
| Presupuesto diario | **$10** |
| Objetivo de rendimiento | Maximizar el alcance de los anuncios |
| **Límite de frecuencia** | **1 impresión cada 3 días** |
| Calendario | Indefinido |
| **Público** | Colombia · H+M · 18-65+<br>Abrieron y **completaron** el formulario · 90d<br>Lista de Clientes Potenciales<br>Clientes Potenciales web · 180d |

### Lo que hay que copiar de ahí

**1. El bloque de exclusión es el mismo en las dos campañas de adquisición.** Cambia el
público, no la exclusión. Eso no es descuido: *"ya es un cliente potencial"* es un estado de la
persona, no una característica de la campaña. Una vez que alguien es lead, sale de
**toda** la máquina de adquisición — sin importar si se registró en Meta, en la web o
por teléfono.

Esto es lo que convierte una lista de exclusiones en un **bloque reutilizable**. Ver §5.

**2. Las ventanas de inclusión y de exclusión son distintas a propósito.**
Incluye a 30 y 90 días. Excluye a 90 días, 180 días y permanente. Nadie se equivocó:
es la Ley A de §2.

**3. La exclusión aparentemente redundante de la Captura B es la más importante.**
"Abrieron pero no enviaron" y "abrieron y completaron" son conjuntos complementarios:
por lógica, incluir uno ya excluye al otro. Aun así el operador excluye a los que
completaron, **explícitamente**.

Y hace bien, por dos razones:
- Con Advantage+ Audience, el público incluido es una **sugerencia**. Meta puede salirse
  de él. La exclusión es lo único que ata.
- El estado de una persona **cambia con el tiempo**. Alguien abre el formulario el día 1
  sin enviarlo, entra al público de abandono, y lo completa el día 20 por otro anuncio.
  Sin la exclusión explícita seguirías pagando por perseguir a un lead que ya tienes.

**4. "Calendario: Indefinido".** El retargeting no tiene fecha de término. Se apaga
cuando se apaga el frío que lo alimenta, no antes.

**5. El bloque de exclusión de las otras campañas es el PÚBLICO de esta.**
Los mismos tres públicos, palabra por palabra. Eso es lo que cierra el ciclo: nadie
queda huérfano. La máquina de adquisición los expulsa y esta campaña los recoge, con
otro objetivo y a otro precio. Es la Ley D de §2.

**6. Cambió el objetivo porque cambió el trabajo.** Optimizar por clientes potenciales
sobre gente que **ya es cliente potencial** es pagar por algo que ya tienes. Aquí el
trabajo es *estar presente* mientras el equipo comercial cierra, y la moneda más barata
para presencia es el CPM bajo objetivo Reconocimiento.

**7. El límite de frecuencia es la razón real del cambio de objetivo.**
El control de frecuencia **solo existe bajo Reconocimiento** — en Clientes potenciales o
Ventas no lo tienes. Sobre un público chico (los leads de 90-180 días son unos pocos
miles de personas) cualquier otro objetivo dispara la frecuencia y quema la base.
1 impresión cada 3 días son ~10 al mes: presente, no encima.

**8. $10/día alcanza aquí y no alcanzaría en conversión.**
La fórmula `(CPA × 50) ÷ 7` aplica a eventos de conversión, que son escasos.
Reconocimiento optimiza por alcance e impresiones, que son abundantes: no hay fase de
aprendizaje famélica que temer. Por eso la capa de permanencia es la más barata del
ciclo y la que casi nadie arma.

### Precisiones y correcciones sobre esas capturas

- **"Seguidores Facebook / Instagram" no es un segmento nativo.** Meta no ofrece un
  público personalizado de seguidores. Lo más cercano es *"Todos los que interactuaron
  con la cuenta"* o *"Personas que visitaron el perfil"*. Al traducir una planilla así
  a la interfaz hay que elegir el segmento real (§3).

- **Los dos conjuntos de la Captura A se pisan.** Quien interactuó hace 10 días está en
  el público de 30d **y** en el de 90d. Son dos conjuntos compitiendo por la misma
  persona en la subasta. El arreglo es de una línea: **el conjunto de 90d excluye al
  público de 30d**. Así la escalera de recencia queda limpia y cada conjunto tiene una
  población propia.

- **Separar por ventana cuesta una fase de aprendizaje.** Dos conjuntos en vez de uno
  son dos veces `(CPA × 50) ÷ 7`. Vale la pena solo por encima de ese umbral
  (`10-publicos-y-exclusiones.md` §4). Por debajo, un solo conjunto de retargeting a
  90 días rinde más que dos famélicos.

- **En la Captura C hay que apagar Advantage+ Audience.** Es la campaña cuyo valor
  entero es que aterrice **solo** sobre la base de leads. Con Advantage+ el público
  incluido es una sugerencia y terminas comprando alcance fuera de la base — que es
  justo lo que no quieres pagar. Se cambia a **públicos originales**. Mismo criterio
  que `10-publicos-y-exclusiones.md` aplica al retargeting.

- **A la Captura C le falta excluir a los clientes que ya cerraron.** El público son
  leads, y algunos ya compraron. Agregar `EXCL · Clientes CRM`.

- **Ojo con el nombre "Ascensión".** En el canon del ciclo, Ascensión son **clientes
  que ya compraron**. El público de la Captura C son **leads que todavía no compran**.
  Es una **capa de permanencia / acompañamiento comercial**, no una campaña de recompra.
  En un negocio de ciclo largo que cierra por teléfono o WhatsApp —financiamiento,
  inmobiliaria, salud, educación— es exactamente lo correcto: la marca sigue presente
  mientras el vendedor trabaja el lead. Pero llámala por su nombre, o alguien va a
  cargarle creativos de recompra a gente que nunca compró.

---

## 2. Las cuatro leyes de las exclusiones

### Ley A — Asimetría de ventanas

> La ventana de **inclusión** se elige por **intensidad de la señal**: corta = caliente.
> La ventana de **exclusión** se elige por **costo de volver a impactar**: larga = protectora.
> No tienen por qué coincidir, y casi nunca coinciden.

Incluir visitantes web a 30 días tiene sentido porque a los 60 días ya se enfriaron.
Excluir leads a 180 días tiene sentido porque un lead de hace 5 meses sigue siendo un
lead: volver a pagarle un formulario es pagar dos veces por el mismo nombre.

| | Ventana corta | Ventana larga |
|---|---|---|
| **Inclusión** | ✅ lo normal — señal fresca | ⚠️ solo para reactivación deliberada |
| **Exclusión** | ⚠️ deja escapar duplicados | ✅ lo normal — protege el presupuesto |

Contraexcepción obligatoria: la exclusión larga **no aplica a compradores en
prospección**. Ahí una ventana de 730 días bloquea la recompra
(`10-publicos-y-exclusiones.md` §7).

### Ley B — Cobertura multifuente

> Un mismo hecho —"esta persona ya es un cliente potencial"— deja rastro en fuentes
> distintas, y **ninguna fuente lo ve completo**. Se ponen las tres.

| Fuente | Qué ve | Qué NO ve |
|---|---|---|
| Formulario instantáneo · 90d | Solo lo que pasó dentro de Meta. Tope duro de 90 días. | Leads de la web, del teléfono, del local |
| Evento *Lead* del píxel · 180d | Solo lo que pasó en tu sitio web | Formularios instantáneos, WhatsApp, offline |
| Lista de Clientes Potenciales (CRM) | Todo, sin caducidad | Lo que nadie subió: vale lo que valga tu proceso de carga |

Por eso la cuenta del ejemplo pone las tres. Quitar cualquiera abre un hueco por donde
se filtra presupuesto, y ese hueco **no aparece en ninguna métrica**: no se ve como
pérdida, simplemente vuelves a pagar por un lead que ya tenías.

### Ley C — El complemento explícito

> Si el público incluido ya excluye lógicamente a un grupo, **exclúyelo igual**.

Con Advantage+ la inclusión no ata. La redundancia aparente es la única garantía. Es
gratis y evita el error más caro.

### Ley D — Inversión de bloques

> El bloque que **excluyes** en la máquina de adquisición es el **público** de la capa
> de permanencia. La misma lista, invertida.

Nadie queda huérfano: sale de una campaña y entra en la otra, con otro objetivo y a
otro precio. Es lo que convierte el embudo en **ciclo**.

El error simétrico es tan común como caro: excluir a los leads de todas las campañas y
**no armar la que los recoge**. Ahí no los estás protegiendo, los estás soltando —
dejan de ver tu marca justo mientras tu equipo comercial los trabaja.

Si tienes bloque de exclusión, te falta la campaña que lo usa como público (§5).

---

## 3. Catálogo de fuentes y segmentos

Doc 10 §2 lista las **fuentes**. Esta es la capa de abajo: los **segmentos** dentro de
cada fuente, que es lo que se necesita para excluir con precisión.

> ⚠️ Meta cambia ventanas y nombres sin avisar. Verifica en tu cuenta antes de dar por
> buena cualquier fila. Los nombres van como aparecen en la interfaz en español.

### Fuentes propias (tus datos)

| Fuente | Segmentos disponibles | Ventana máx. |
|---|---|---|
| **Lista de clientes** (CSV / CRM) | La lista *es* el segmento. Se puede subir una por estado: clientes, leads, no contactar, equipo interno. | **Sin caducidad** (vale lo que valga la última carga) |
| **Sitio web** (píxel / conjunto de datos) | Todos los visitantes · Visitantes de páginas específicas (por URL o palabra clave) · Por tiempo de permanencia (5% / 10% / 25% más activos) · **Por evento**: `ViewContent`, `AddToCart`, `InitiateCheckout`, `Lead`, `CompleteRegistration`, `Purchase`, eventos personalizados · Combinaciones (visitó A y no B) | **180 días**<br>**730 días** solo para el evento *Compra* (desde 18-may-2026) |
| **Actividad en la app** | Por evento de app | 180 días |
| **Actividad offline / eventos offline** | Por evento cargado | 180 días |
| **Catálogo / interacción con compras** | Vieron el producto · Lo agregaron al carrito · Lo compraron | 180 días |

### Fuentes de Meta (interacción dentro de la plataforma)

| Fuente | Segmentos disponibles | Ventana máx. |
|---|---|---|
| **Página de Facebook** | Todos los que interactuaron · Visitaron la página · Interactuaron con una publicación o anuncio · Hicieron clic en un botón de llamada a la acción · **Enviaron un mensaje a la página** · Guardaron la página o una publicación | 365 días |
| **Cuenta de Instagram** | Todos los que interactuaron · Visitaron el perfil · Interactuaron con una publicación o anuncio · **Enviaron un mensaje al perfil** · Guardaron una publicación o anuncio | 365 días |
| **Video** | 3 segundos · **10 segundos** · 25% · 50% · 75% · 95% | 365 días |
| **Formulario instantáneo** | **Abrieron el formulario** · **Abrieron pero no lo enviaron** · **Abrieron y lo enviaron** | **90 días — tope duro, no se puede extender** |
| **Experiencia instantánea** (Canvas) | Abrieron la experiencia · Hicieron clic en un enlace | 365 días |
| **Eventos de Facebook** | Respondieron · Compraron entradas · Vieron la página del evento | 365 días |

### Filtros de frecuencia y recencia (marzo 2026)

Sobre los públicos de interacción se pueden aplicar dos filtros nuevos:

- **"Al menos N veces"** — mínimo de interacciones. `Interactuó ≥ 3 veces` es una señal
  muchísimo más fuerte que `interactuó alguna vez`.
- **"En los últimos N días"** — ventana de recencia dentro del público.

Sirven para construir la escalera de recencia sin multiplicar públicos, y para armar un
público de retargeting caliente de verdad en cuentas con mucho alcance orgánico.

### Segmentos de video: segundos vs. porcentaje

Doc 10 recomienda **25% o más** por encima de 3 segundos, y eso sigue en pie. Pero
ojo con el detalle que la cuenta del ejemplo resuelve usando **10 segundos**:

- El **porcentaje es relativo**: 25% de un reel de 15 segundos son 3,75 segundos —
  prácticamente el mismo ruido que el segmento de 3s.
- Los **segundos son absolutos**: 10 segundos son 10 segundos en cualquier video.

**Regla:** si tu cuenta mezcla videos de duraciones muy distintas (reels cortos y videos
largos), usa **10 segundos**. Si todos tus videos pasan del minuto, usa **25%**.
Nunca uses 3 segundos: eso es "no alcanzó a deslizar", no es interés.

### Tamaños mínimos

| Uso | Mínimo |
|---|---|
| Público personalizado como **inclusión** | 100 personas (técnico). Por debajo de ~1.000 el conjunto se ahoga. |
| Semilla de público similar (lookalike) | 100 técnico · **1.000-5.000 recomendado** |
| Público personalizado como **exclusión** | Cualquier tamaño funciona. Un público chico simplemente excluye a poca gente. |

Como exclusión no hay riesgo de "muy chico". El riesgo es el opuesto: excluir de más
(§7).

---

## 4. El inventario mínimo, por tipo de negocio

Créalos **antes** de armar campañas. Sin públicos no hay exclusiones, y sin exclusiones
no hay ciclo. Nomenclatura según §9.

### Negocio de clientes potenciales (formularios, WhatsApp, agenda)

| # | Público | Cómo se arma |
|---|---|---|
| 1 | `EXCL · Form abrieron · 90d` | Formulario instantáneo → abrieron el formulario |
| 2 | `EXCL · Form completaron · 90d` | Formulario instantáneo → abrieron y lo enviaron |
| 3 | `EXCL · Lead web · 180d` | Sitio web → evento `Lead` |
| 4 | `EXCL · Lista CP · CRM` | Lista de clientes: todos los leads del CRM |
| 5 | `EXCL · Clientes · CRM` | Lista de clientes: los que ya compraron |
| 6 | `AUD · Form abandono · 90d` | Formulario instantáneo → abrieron pero no enviaron |
| 7 | `AUD · Interacción FB+IG · 90d` | Página de Facebook + cuenta de Instagram |
| 8 | `AUD · Video 10s+ · 90d` | Video → 10 segundos |
| 9 | `AUD · Visitantes web · 90d` | Sitio web → todos los visitantes |
| 10 | `SUPR · No contactar` | Lista de clientes: bajas, reclamos, competencia, equipo |

### E-commerce

| # | Público | Cómo se arma |
|---|---|---|
| 1 | `EXCL · Compradores · 90d` | Sitio web → `Purchase` (ajustar al ciclo de recompra) |
| 2 | `EXCL · Compradores · 30d` | Sitio web → `Purchase` |
| 3 | `EXCL · Clientes · CRM` | Lista de clientes / Shopify |
| 4 | `AUD · Carrito · 14d` | Sitio web → `AddToCart` |
| 5 | `AUD · Checkout iniciado · 14d` | Sitio web → `InitiateCheckout` |
| 6 | `AUD · Vieron producto · 30d` | Sitio web → `ViewContent` |
| 7 | `AUD · Interacción FB+IG · 365d` | Página + cuenta de Instagram |
| 8 | `SEED · Compradores · 730d` | Sitio web → `Purchase`, **solo semilla de lookalike** |

### WhatsApp / mensajes (caso LATAM, sin web)

| # | Público | Cómo se arma |
|---|---|---|
| 1 | `EXCL · Escribieron FB+IG · 90d` | Página → enviaron un mensaje · Instagram → enviaron un mensaje |
| 2 | `EXCL · Clientes · CRM` | Lista de clientes (teléfonos) |
| 3 | `AUD · Interacción FB+IG · 90d` | Página + cuenta de Instagram |
| 4 | `AUD · Video 10s+ · 90d` | Video → 10 segundos |
| 5 | `SUPR · No contactar` | Lista de clientes |

---

## 5. La matriz: qué excluir en cada campaña

Primero se definen **bloques** con nombre. Después cada campaña dice qué bloques usa.
Así la exclusión se piensa una vez y se aplica muchas — que es lo que hace la cuenta de
las capturas.

### Los bloques

| Bloque | Contiene | Significa |
|---|---|---|
| **`LEAD`** | `EXCL · Form abrieron 90d` + `EXCL · Lead web 180d` + `EXCL · Lista CP CRM` | "Ya llegó al formulario o ya es un lead" |
| **`CLIENTE`** | `EXCL · Clientes CRM` + `EXCL · Compradores Xd` | "Ya compró" (X = ciclo de recompra) |
| **`CALIENTE`** | `AUD · Interacción FB+IG` + `AUD · Video 10s+` + `AUD · Visitantes web` | "Ya te conoce" — solo se excluye si tienes campaña de retargeting corriendo |
| **`SUPR`** | `SUPR · No contactar` + equipo interno | Nunca deben ver un anuncio, en ninguna campaña |

### La matriz

| Campaña | Público (sugerencia) | Exclusiones | Notas |
|---|---|---|---|
| **Presentación / frío** — cualquier objetivo | Abierto · solo ubicación y edad mínima | `CLIENTE` + `LEAD` + `SUPR`<br>*(+ `CALIENTE` solo si hay retargeting corriendo con presupuesto propio)* | `LEAD` solo si el objetivo es generar leads. En e-commerce puro, `CLIENTE` basta. |
| **Evaluación / retargeting tibio** | `CALIENTE` a 30d y/o 90d | `LEAD` + `CLIENTE` + `SUPR` | ← **la Captura A**. Si separas por ventana, el conjunto de 90d excluye además al público de 30d. |
| **Conversión / formulario instantáneo** | `AUD · Form abandono 90d` | `EXCL · Form completaron 90d` + `EXCL · Lead web 180d` + `EXCL · Lista CP CRM` + `CLIENTE` + `SUPR` | ← **la Captura B**. La exclusión de "completaron" es obligatoria aunque parezca redundante (Ley C). |
| **Conversión / web (Ventas)** | `AUD · Carrito 14d` · `AUD · Checkout iniciado 14d` | `CLIENTE` + `SUPR`<br>*(+ `EXCL · Lead web` si el objetivo es registro, no venta)* | No excluyas `CALIENTE` aquí: es exactamente a quien vienes a convertir. |
| **Conversión / WhatsApp (CTWA)** | `CALIENTE` a 90d | `EXCL · Escribieron FB+IG 90d` + `CLIENTE` + `SUPR` | Excluir a quien ya te escribió es la exclusión que más presupuesto salva en LATAM: sin ella pagas por reabrir una conversación que ya tienes en el teléfono. |
| **Ascensión / clientes** | `EXCL · Clientes CRM` · compradores 180d *(usados como inclusión)* | `EXCL · Compradores 30d` + `SUPR` | Aquí no excluyes etapas siguientes: excluyes a quien **acaba** de comprar. |
| **Permanencia / acompañamiento de leads** — objetivo **Reconocimiento** | El bloque **`LEAD` completo, usado como inclusión** | `CLIENTE` + `SUPR` | ← **la Captura C**. Públicos originales (Advantage+ **off**) y límite de frecuencia. Detalle abajo. |
| **Reactivación** (campaña especial) | Compradores 366-730d · leads viejos del CRM | `EXCL · Compradores 180d` + `SUPR` | Único caso donde la ventana larga se usa como **inclusión**. Nunca como exclusión automática. |

### La capa de permanencia, en detalle

La fila más barata de la matriz y la que casi nadie arma. Configuración exacta:

| Ajuste | Valor | Por qué |
|---|---|---|
| Objetivo de campaña | **Reconocimiento** | Es el único que da control de frecuencia |
| Objetivo de rendimiento | Maximizar el alcance | Pagas CPM, no CPA. La conversión ya ocurrió. |
| **Límite de frecuencia** | 1 impresión cada 2-3 días | Sobre público chico, sin tope la frecuencia se dispara y quemas la base |
| Tipo de público | **Públicos originales** (Advantage+ **off**) | Si la inclusión es sugerencia, compras alcance fuera de la base y pierdes el punto |
| Presupuesto | $5-15/día | No hay fase de aprendizaje que alimentar: el alcance es abundante |
| Calendario | Indefinido | Vive mientras exista base de leads |
| Público | El bloque `LEAD` completo | Ley D |
| Exclusiones | `CLIENTE` + `SUPR` | Quien ya cerró sale de aquí también |

**Qué anuncios van adentro:** no anuncios de captura. Prueba social, casos, respuestas a
objeciones, la cara del equipo, el detrás de escena. El objetivo es que cuando el
vendedor llame, la marca no sea una desconocida. Nivel de consciencia **Producto** y
**Decisión** (`03-niveles-consciencia.md`).

**Cuándo NO armarla:** si el ciclo de venta se cierra en 48 horas, no hay nada que
acompañar. Esta capa se justifica cuando entre el lead y la venta pasan semanas —
financiamiento, inmobiliaria, salud, educación, B2B.

**Cómo se mide:** no por CPA. Se mide por **cobertura de la base** (qué % de tus leads
alcanzaste) y frecuencia. Si le exiges conversiones a esta campaña, la vas a apagar
injustamente: su efecto aparece en la tasa de cierre del equipo comercial, no en el
Administrador de Anuncios.

### Cómo se usa esta matriz según la arquitectura

- **Arquitectura separada** → cada fila es una campaña. Se implementa tal cual.
- **Arquitectura mixta** (la más común) → dos campañas. Prospección usa la fila 1;
  retargeting fusiona las filas 2 y 3 en un conjunto con la unión de sus públicos y la
  unión de sus exclusiones.
- **Arquitectura consolidada** → una campaña. Solo sobreviven **`CLIENTE` + `SUPR`**
  (y `LEAD` si vendes por formulario). Todo lo demás se va: excluir de más en una cuenta
  chica la mata.

Cuál te toca: `10-publicos-y-exclusiones.md` §4, o `scripts/presupuesto.py`.

---

## 6. Las exclusiones transversales

Van en **todas** las campañas de la cuenta, siempre, sin importar arquitectura ni
presupuesto. Casi nadie las tiene y casi todos las necesitan.

| Exclusión | Por qué |
|---|---|
| **Lista de "no contactar"** | Bajas, reclamos, gente que pidió no ser contactada. Anunciarles es un problema de reputación y, según el país, legal. |
| **Equipo interno y agencia** | Tú, el cliente, sus vendedores, tu equipo. Inflan frecuencia, ensucian métricas y disparan clics sin valor. Súbelo como lista de clientes una vez y olvídate. |
| **Competencia conocida** | Si tienes sus correos, exclúyelos. No es paranoia: es no pagarle a alguien por estudiar tus anuncios. |

Se mantienen en **una sola lista** (`SUPR · No contactar`) que se re-sube cada mes.

---

## 7. Lo que **NO** hay que excluir

Excluir de más es un error tan caro como no excluir, y mucho menos comentado. Cada
exclusión encoge el público, sube el CPM y aleja al conjunto de los 50 eventos
semanales.

| No hagas esto | Por qué |
|---|---|
| Excluir `CALIENTE` de prospección **sin tener campaña de retargeting corriendo** | Regalas alcance a cambio de nada. La exclusión existe para repartir presupuesto entre campañas; si solo hay una, no hay nada que repartir. |
| Apilar 5-6 exclusiones en una cuenta de bajo presupuesto | Público diminuto, CPM alto, aprendizaje limitado permanente. En consolidada: dos bloques, máximo tres. |
| Excluir compradores en **consumo frecuente** | Si tu producto se recompra cada 30 días, tus compradores son tu mejor público. |
| Excluir compradores a **730 días** en prospección | Bloqueas la recompra justo cuando llega. Ver `10-publicos-y-exclusiones.md` §7. |
| Excluir "todos los que interactuaron 365d" de una campaña de **conversión** | Te quedas sin nadie a quien convertir: los calientes son el público, no el ruido. |
| Excluir por **intereses** | Ya no existe. Meta lo retiró en 2024-2025. Solo se excluye por público personalizado. |
| Excluir un público de **menos de 100 personas** y darlo por hecho | Funciona, pero no hace nada. Si tu lista de clientes tiene 40 nombres, la exclusión no es tu problema. |
| Excluir la **lista de leads completa** cuando el ciclo de venta es de 6+ meses | Un lead de hace 8 meses que nunca compró está frío, no quemado. Segmenta el CRM por fecha y excluye solo los recientes. |
| Excluir el bloque `LEAD` de todo y **no armar la capa de permanencia** | No los proteges, los sueltas: dejan de ver tu marca justo mientras tu equipo comercial los trabaja. Ley D (§2) y §5. |

> **El criterio para decidir:** una exclusión se justifica cuando existe **otra campaña**
> que sí va a atender a esa gente, o cuando volver a impactarla **cuesta y no aporta**.
> Si no se cumple ninguna de las dos, no excluyas.

---

## 8. Cómo elegir la ventana

| Qué excluyes | Ventana | Criterio |
|---|---|---|
| Compradores (producto de compra única) | 180-365d | Ciclo de recompra real |
| Compradores (producto de uso prolongado) | 90-180d | |
| Compradores (consumo frecuente) | **No excluir** | Son tu mejor público |
| Compradores (recién compraron, de todo) | 0-30d | Deja respirar la venta |
| Leads / clientes potenciales | 90-180d | Cuánto tarda tu proceso comercial en cerrar o descartar |
| Quien ya te escribió por WhatsApp | 30-90d | Cuánto dura una conversación abierta en tu operación |
| Quien abrió el formulario | 90d | Tope duro de la plataforma |
| Lista de supresión | Permanente | |

**La pregunta que resuelve todos los casos:** *si esta persona ve mi anuncio mañana,
¿me sirve de algo?* Si la respuesta es no durante N días, esa es tu ventana. No el
máximo que ofrece Meta.

---

## 9. Nomenclatura

Extiende la de `10-publicos-y-exclusiones.md` §8 con un cuarto prefijo:

```
[TIPO] · [Fuente] · [Ventana]

EXCL · Form completaron · 90d      → creado para excluir
AUD  · Form abandono · 90d         → creado para incluir
SEED · Compradores · 730d          → semilla de lookalike, NUNCA exclusión
SUPR · No contactar                → supresión transversal, va en todo
```

El prefijo dice **para qué se creó** el público. Es lo que impide que dentro de seis
meses alguien use como exclusión de prospección un público de 730 días que se armó para
sembrar lookalikes — el error silencioso más caro de la cuenta.

---

## 10. Auditoría de exclusiones

Para una cuenta heredada, o cada tres meses sobre la propia.

- [ ] Abrir cada conjunto y confirmar que las exclusiones están en **controles**, no en
      sugerencias. Es donde está el desperdicio recuperable.
- [ ] Listar todos los públicos personalizados y marcar cuáles se usan y cuáles no.
      Los huérfanos se archivan: confunden y se usan mal.
- [ ] Verificar que **ningún público de 730 días** esté usado como exclusión de
      prospección.
- [ ] Confirmar la cobertura multifuente (Ley B): ¿están las tres fuentes de "ya es
      lead", o solo la del formulario?
- [ ] Revisar la fecha de la última carga de la lista de clientes. A los 60 días una
      lista tiene huecos serios.
- [ ] Confirmar que existe la lista de supresión y que está en todas las campañas.
- [ ] Confirmar que cada bloque de exclusión tiene una campaña que lo usa como público
      (Ley D). Si excluyes leads en todos lados y no existe la capa de permanencia,
      falta una campaña.
- [ ] En la capa de permanencia: verificar que está en **públicos originales** y no en
      Advantage+, y que tiene límite de frecuencia.
- [ ] Contar exclusiones por conjunto. Más de 4 en una cuenta que invierte menos de
      $1.000/mes es exclusión de más (§7).
- [ ] Cruzar la ventana de exclusión de compradores contra el **ciclo de recompra real**
      del negocio, no contra el default.
- [ ] Usar la herramienta de **superposición de públicos** para detectar conjuntos que
      compiten por la misma gente.
- [ ] Señal de que falta una exclusión: **frecuencia alta con alcance estancado** en
      prospección, o leads duplicados llegando al CRM.

---

## Fuentes

Consultado en septiembre de 2026. Meta cambia estas reglas seguido: verifica en la
interfaz antes de dar cualquier fila por buena.

- [Jon Loomer — Facebook Lead Ad Engagement Custom Audiences](https://www.jonloomer.com/facebook-lead-ad-engagement-custom-audiences/)
- [Jon Loomer — A Guide to Meta Ads Targeting in 2026](https://www.jonloomer.com/meta-ads-targeting-2026/)
- [Jon Loomer — No More Existing Customer Budget Cap](https://www.jonloomer.com/qvt/no-more-existing-customer-budget-cap/)
- [Flighted — Best Meta Ads Exclusion Strategy For Prospecting Campaigns](https://www.flighted.co/blog/best-meta-ads-exclusion-strategy-for-prospecting-campaigns)
- [AdsUploader — Facebook Custom Audience Exclusions: What Still Works in 2026](https://adsuploader.com/blog/facebook-custom-audience-exclusions)
- [Digital Applied — Meta Custom Audience Filters: Engagement Retargeting Guide](https://www.digitalapplied.com/blog/meta-custom-audience-filters-retargeting-engagement-frequency)
- [LeadSync — Meta Custom Audiences for Lead Generation (2026)](https://leadsync.me/blog/custom-audiences-for-lead-gen/)
- [Social Media Examiner — How to Use Facebook Page Engagement Custom Audiences](https://www.socialmediaexaminer.com/how-to-use-facebook-page-engagement-custom-audiences/)
- [Jon Loomer — How to Create an Instagram Account Custom Audience](https://www.jonloomer.com/instagram-account-custom-audience-facebook/)
- [David Tamachi — Meta 730-Day Custom Audiences: The Retargeting Exclusion Trap](https://davidtamachi.ca/blog-meta-730-day-custom-audience-expansion)
- [AdLibrary — Meta Ads for Lead Generation: The 2026 Practitioner's Guide](https://adlibrary.com/posts/meta-ads-for-lead-generation)
- [Jon Loomer — Advantage+ Audience vs. Original Audiences](https://www.jonloomer.com/advantage-audience-vs-original-audiences/)
- [Digital Position — Meta Ads Adds Frequency Controls To Auction Based Campaigns](https://www.digitalposition.com/resources/blog/ppc/meta-ads-adds-frequency-controls-to-auction-based-campaigns/)
- [Benly — Brand Awareness Campaigns: Reach & Frequency Best Practices 2026](https://benly.ai/learn/meta-ads/brand-awareness-reach-campaigns)
