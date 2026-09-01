# Playmaker — Google Ads · Fútbol

> Build de las campañas de Google Search, derivado de la **estrategia de Basti**
> (`playmaker-strategy-heat.netlify.app`, agosto 2026) y cruzado con el **historial real
> de la cuenta de Meta** `231866284693734`, leído por el conector el 1-sep-2026.
>
> Canal fuera de la skill `meta-ads`. Los archivos importables están en `build/`.
>
> **Versión para Basti y el cliente:** https://claude.ai/code/artifact/bb9f10cc-9769-4672-bb01-9a5c34d10953

---

## 0. Lo que hay que saber antes de leer el resto

Tres cosas cambian la conversación:

1. **En Meta, fútbol no tuvo espacio.** De los $208.953 CLP de la campaña activa, el
   anuncio de fútbol recibió **$1.535 — el 0,7%**. Meta concentró el 72% en básquetbol.
   Eso no dice que fútbol funcione mal; dice que **Meta nunca lo va a probar en serio**.
   Google Search es el único canal donde fútbol compite sin pelear contra el algoritmo.
   La decisión de Basti de separar los canales por deporte queda validada con datos.

2. **El problema de Playmaker no es volumen de leads.** La campaña de formulario de Meta
   lleva **501 leads en 14 días a $417 CLP**. La estrategia reporta 250 leads y 10
   cierres (**5%**). El cuello de botella es calificación y SLA, no captación.
   **Google no debe traer más leads. Debe traer leads de 12+ unidades.**

3. **Con 5% de cierre, Google Search no es rentable a ningún CPL alcanzable.** Está
   calculado en la sección 3. Esto no se arregla con pujas: se arregla con el SLA de
   1 h / 24 h y la calificación que la estrategia ya define. **La estrategia de Basti es
   requisito del canal, no complemento.**

---

## 1. Lo que dice la cuenta de Meta (verificado, 1-sep-2026)

Estado de la cuenta: **ACTIVE** con método de pago. La ficha `clientes/playmaker.md`
la daba por `UNSETTLED` — eso quedó atrás, el saldo se regularizó y la campaña corre.

### Campaña activa · "Clientes Potenciales | Meta form" (desde 18-ago)

| Métrica | Valor |
|---|---:|
| Gasto | $208.953 CLP |
| Impresiones | 255.306 |
| Alcance | 130.653 |
| Frecuencia | 1,95 |
| Clics | 6.093 |
| CTR | 2,39% |
| CPC | $34 CLP |
| CPM | $818 CLP |
| **Leads (formulario)** | **501** |
| **Costo por lead** | **$417 CLP** |

Un solo conjunto (`Amplio | Meta Form`, público abierto) y cinco anuncios. El reparto:

| Anuncio | Gasto | % del gasto | Leads | CPL |
|---|---:|---:|---:|---:|
| Prueba: basquet | $151.428 | **72,5%** | 409 | $370 |
| Prueba: diamante | $51.951 | 24,9% | 86 | $604 |
| Prueba: No somos la marca para ti | $3.280 | 1,6% | 3 | $1.093 |
| **Prueba: Fut 01** | **$1.535** | **0,7%** | 2 | $768 |
| La Clásica | $759 | 0,4% | 1 | $759 |

> **Fútbol acumuló 1.120 impresiones.** Con esa muestra no hay veredicto sobre fútbol —
> hay veredicto sobre el reparto. Meta apagó la prueba antes de que existiera.

### Historial anterior (para no repetir lo ya probado)

| Campaña | Gasto | Resultado | Lectura |
|---|---:|---|---|
| Play_WP_RM (2023) | $214.028 | 346 conversaciones a $619 | WhatsApp funciona como destino |
| 16/08/23 Reconocimiento | $126.062 | 726.253 de alcance, CPM $108 | Alcance baratísimo, CTR 0,10% |
| Nueva campaña de Ventas (2024) | $46.020 | CTR 4,56%, CPC $23 | El mejor CTR histórico |

**Inversión histórica total en Meta: $610.768 CLP.**

### Qué se lleva Google de esto

- **El creativo ganador es foto de estudio de producto sobre fondo limpio**, no video.
  Verificado en la vista previa del anuncio de básquetbol. Sirve para los recursos de
  imagen de Google.
- **El gancho "Personalizador" sostuvo ~$190.000 CLP y ~300 conversaciones en 2023.**
  Va como sitelink.
- **El formulario nativo trae volumen barato y sin filtro.** Por eso en Google **no se
  usa recurso de formulario para clientes potenciales** (sección 5).

---

## 2. La decisión de canal, en una línea

| | Meta | Google Search |
|---|---|---|
| Qué compra | Atención de quien no estaba buscando | Intención de quien ya está buscando |
| Deportes | Vóleibol, rugby, básquetbol | **Fútbol** |
| Presupuesto | USD 450 | **USD 500** |
| CPL esperado | $300-600 CLP | **$4.000-16.000 CLP** |
| Qué mide el éxito | Volumen a costo bajo | **Cotizaciones de 12+ unidades** |

El CPL de Google va a ser **10 a 40 veces más caro que el de Meta**. Eso no es un
problema: es el precio de la intención. Si se compara Google contra Meta por CPL, Google
siempre pierde y la lectura es falsa. **Se comparan por cotización viable, no por lead.**

---

## 3. ⛔ La aritmética que decide si esto se enciende

Supuesto de trabajo: se invierte **un tercio del margen bruto** en adquisición (el resto
queda como utilidad y colchón operacional — misma disciplina que en Meta).

**CPL máximo tolerable, según AOV, margen y tasa de cierre:**

| AOV pedido 12+ | Margen | Margen $ | Invertible/venta | Cierre **5%** (hoy) | Cierre **15%** | Cierre **25%** |
|---:|---:|---:|---:|---:|---:|---:|
| $200.000 | 30% | $60.000 | $20.000 | $1.000 | $3.000 | $5.000 |
| $200.000 | 40% | $80.000 | $26.667 | $1.333 | $4.000 | $6.667 |
| $350.000 | 30% | $105.000 | $35.000 | $1.750 | $5.250 | $8.750 |
| $350.000 | 40% | $140.000 | $46.667 | $2.333 | $7.000 | $11.667 |
| $500.000 | 30% | $150.000 | $50.000 | $2.500 | $7.500 | $12.500 |
| $500.000 | 40% | $200.000 | $66.667 | $3.333 | $10.000 | $16.667 |

**Y lo que USD 500 efectivamente compra** *(1 USD = $940 CLP supuesto — verificar;
USD 500 = $470.000 CLP/mes = $15.667 CLP/día)*:

| CPC | Clics/mes | CR 2,5% (sitio actual) | CPL | CR 7% (landing dedicada) | CPL |
|---:|---:|---:|---:|---:|---:|
| $300 | 1.567 | 39 leads | $12.000 | 110 leads | **$4.286** |
| $400 | 1.175 | 29 leads | $16.000 | 82 leads | **$5.714** |
| $500 | 940 | 24 leads | $20.000 | 66 leads | **$7.143** |
| $600 | 783 | 20 leads | $24.000 | 55 leads | **$8.571** |

### Cruzando las dos tablas

- **Con cierre del 5%**, el CPL máximo es $1.000–$3.333. Google entrega, en el mejor
  escenario, $4.286. **No cierra en ninguna combinación.**
- **Con cierre del 15% y landing dedicada**, el CPL máximo ($3.000–$10.000) alcanza al
  CPL real ($4.286–$8.571) en casi toda la tabla. **Cierra.**
- **Con cierre del 25%**, cierra con holgura y recién ahí tiene sentido escalar.

> **Conclusión operativa:** Google Search es viable si —y solo si— se cumplen dos cosas
> que ya están en el roadmap 30/60/90 de Basti: **la landing propia** y **el SLA de 1 h
> que sube el cierre del 5% al 15%**. Encender Google sin eso es pagar intención cara
> para meterla al mismo embudo que hoy cierra 1 de 20.

### Los dos datos que faltan

**Ticket promedio del pedido 12+** y **margen real**. Ninguna ficha de la cartera los
tiene cargados, y sin ellos la tabla de arriba es un marco, no un veredicto. Coincide
exactamente con la **DECISIÓN 01 de la estrategia ("Margen y precios")**, que Basti dejó
marcada como validación crítica pendiente.

---

## 4. Estructura: dos campañas, cuatro grupos

Con USD 500 la fragmentación es el enemigo. Nada de PMax, nada de Display, nada de
Shopping por ahora — el presupuesto no alcanza para alimentar más de un canal.

### Campaña A · `PMK | Search | Futbol Clubes | CL`
**Presupuesto: $14.000 CLP/día** (≈ USD 447/mes)

| Grupo | ICP de la estrategia | URL final |
|---|---|---|
| `AG1 \| Camisetas futbol personalizadas` | P1 Club / Academia | `/16-futbol` |
| `AG2 \| Uniformes y equipamiento de club` | P1 AOV alto (club federado) | `/16-futbol` |
| `AG3 \| Sublimacion y confeccion deportiva` | B2B / proveedor | `/10-deportes` |
| `AG4 \| Colegios e instituciones` | P2 multicategoría | `/54-instituciones` |

### Campaña B · `PMK | Search | Marca | CL`
**Presupuesto: $1.500 CLP/día** (≈ USD 48/mes, no lo va a gastar entero)

Defensa de marca. Un competidor pujando sobre "playmaker" se lleva tráfico tibio a
$150 CLP que de otro modo cuesta $400+ en genéricos.

> **Regla de corte:** si en 30 días la campaña de marca no gasta ni $20.000 CLP, se
> apaga y su presupuesto pasa a la campaña A. No se deja plata reservada sin uso.

### El ICP que se dejó fuera a propósito

**"Empresas y eventos"** (P2 ciclo rápido) no tiene grupo de anuncios. Es el ICP de menor
LTV de la estrategia —compra funcional, una vez, sensible al cumplimiento— y con USD 500
diluye. Queda parqueado para fase 2, cuando haya cierre medido.

---

## 5. Configuración que no viene en los CSV

| Ajuste | Valor | Por qué |
|---|---|---|
| Tipo | Búsqueda, **sin** Display | Display con este presupuesto es fuga garantizada |
| Socios de búsqueda | **Desactivados** al inicio | Se evalúan al mes 2 con datos propios |
| Ubicación | **Chile** | Envíos a todo el país |
| Opción de ubicación | **Presencia**, no "presencia o interés" | Evita tráfico extranjero |
| Idioma | Español | |
| Rotación de anuncios | Optimizar | |
| Programación | L-V 08:00–21:00 · S-D 10:00–19:00 | Alineado al SLA de 1 h: un lead a las 3 AM se contacta 6 h tarde y se enfría |
| Recurso de formulario | **NO usar** | Recrea el problema de calidad del formulario de Meta |
| Ventana de conversión | **60-90 días** | El ciclo institucional pasa por aprobación de directiva; 30 días corta la mitad |

### Estrategia de puja — en tres fases, en este orden

| Fase | Cuándo | Estrategia | Por qué |
|---|---|---|---|
| **1** | Semanas 1-3 | **Maximizar clics, CPC máx. $600** | Cuenta nueva, cero historial. Descubrir términos reales y construir negativas con costo acotado |
| **2** | ≥15 conversiones/30 días | **Maximizar conversiones** | Ya hay señal que aprender |
| **3** | ≥30 conversiones/30 días | **CPA objetivo** | Partir en el CPA real de los 30 días previos y bajar de a 15% |

> **El error más caro sería arrancar en CPA objetivo.** Sin historial, Google no sabe a
> quién buscar: restringe entrega, sube el CPC y el presupuesto se va sin datos.
> Igual de caro: **concordancia amplia en fase 1**. Amplia + puja automática sin
> conversiones = el presupuesto de un mes en consultas irrelevantes. Solo exacta y frase.

---

## 6. Medición: la capa que decide si esto aprende o repite Meta

### Capa 1 · Conversiones en el sitio (bloqueante, día 0)

| Acción | Tipo | Cómo se dispara |
|---|---|---|
| **Cotización enviada** | **Principal** | Envío del módulo `roja45quotationspro` |
| **Clic a WhatsApp** | **Principal** | Clic a `api.whatsapp.com/send?phone=56922435283` |
| Clic a teléfono | Secundaria | Clic a `tel:+56988851907` |
| Personalizador iniciado | Secundaria | Vista de `/20-personalizador` |

> **Solo dos principales.** Si se marcan las cuatro como principales, la puja optimiza a
> la más barata (la vista del personalizador) y volvemos exactamente al problema de Meta:
> mucho evento, ninguna venta.

### Capa 2 · Conversiones mejoradas
El formulario ya pide correo y teléfono. Activarlas recupera atribución perdida por
consentimiento y navegadores que bloquean cookies.

### Capa 3 · Importación de conversiones offline — **el diferenciador**

1. El formulario captura el **`gclid`** en un campo oculto y lo guarda junto al lead.
2. Cuando HEAT/GHL califica el lead como **12+ unidades, con responsable y fecha**, se
   marca `Cotización viable`.
3. Cuando entra el **anticipo**, se marca `Venta` con su valor real.
4. Ambas se suben a Google Ads como conversiones offline.

**Qué cambia:** Google deja de optimizar hacia "alguien llenó el formulario" y empieza a
optimizar hacia "alguien pidió 12+ y pagó". Es la diferencia entre repetir el 5% de
cierre de Meta y construir una cuenta que aprende.

**Sin esta capa, Google va a converger al mismo resultado que Meta: leads baratos que no
cierran.** Es la recomendación de mayor impacto de todo este documento.

---

## 7. Palabras clave y negativas

**61 palabras clave**, solo **exacta y frase**. Sin amplia. Archivo:
`build/01-palabras-clave.csv`.

**137 negativas a nivel de campaña**, cargadas **antes** de encender. Archivo:
`build/02-negativas-campana.csv`. Ocho bloques:

| Bloque | Ejemplos | Por qué duele si falta |
|---|---|---|
| Clubes y selecciones | colo colo, la roja, real madrid | Volumen enorme en Chile, intención cero: buscan **esa** camiseta |
| Marcas deportivas | nike, adidas, joma | Buscan producto de marca, no fabricación |
| Producto que no vende | botines, balón, guantes de arquero | Clic pagado sin oferta detrás |
| Informativa / gaming | plantilla, png, dream league, fifa | Alto volumen, cero comercial |
| **Insumos y maquinaria** | sublimadora, papel sublimación, curso | **Crítico en AG3**: buscan *hacer*, no *comprar* |
| Reventa / segunda mano | réplica, usada, mercado libre | Otro mercado |
| Fuera del ICP | 1 camiseta, unitaria, al detalle | Pedido unitario es NO-ICP explícito |
| Mercado equivocado | perú, colombia, méxico | Consulta de otro país |

> La segmentación por presencia ya filtra geografía, pero las negativas de país atrapan
> la consulta escrita desde Chile con intención de otro mercado.

---

## 8. Anuncios

**5 anuncios adaptables (uno por grupo), 70 títulos y 20 descripciones**, todos
verificados contra los límites de 30 y 90 caracteres. Archivo: `build/03-anuncios-rsa.csv`.

**Una sola fijación por anuncio:** `Desde 12 Unidades` en **posición 2** de los grupos de
fútbol. Es el filtro más barato que existe — quien pide 1 camiseta no hace clic, y ese
clic no cuesta. En la campaña de marca se fija `Playmaker Chile` en posición 1.

Nada más se fija: cada título extra fijado le quita a Google combinaciones que probar.

**El eje del copy** sale directo de la estrategia: *certeza operacional*. No "camisetas
bonitas" sino **mockup antes de producir · tallaje ordenado · fecha cerrada · cotización
en 24 h**. El comprador institucional teme el caos más que la falta de creatividad —
P02 y P05 del sistema de contenido de Basti.

### Extensiones (`build/04-extensiones.csv`)
4 sitelinks · 8 textos destacados · 2 fragmentos estructurados · 1 recurso de llamada.

> ⚠️ **Confirmar qué número contesta ventas.** El sitio muestra `+56 9 8885 1907` como
> teléfono y `+56 9 2243 5283` como WhatsApp. El recurso de llamada va con el que atiende
> alguien en horario hábil.

---

## 9. Checklist de lanzamiento

### 9a. Lo que ya está en el sitio (auditado 1-sep-2026)

Se revisó el código fuente de `/`, `/16-futbol` y `/20-personalizador`. **No hay que
instalar GTM: ya está.** Lo que hace falta es acceso al contenedor.

| Etiqueta | Estado |
|---|---|
| **Google Tag Manager `GTM-K44CLVC`** | ✅ Instalado — pero **en el `<body>`, no en el `<head>`**, y **sin el `<noscript>`** |
| **Universal Analytics `UA-75834089-1`** | ⚠️ Código muerto: UA dejó de procesar datos en julio de 2023. Cargando en todas las páginas sin medir nada |
| **Meta Pixel `254770085911338`** | ✅ Instalado |
| GA4 (`G-…`) | ❓ No aparece en el fuente. Puede estar dentro del contenedor — confirmar al entrar |

> **Con acceso de publicación al contenedor, la etiqueta de Google Ads se monta desde GTM
> sin tocar el sitio.** Solo tres cosas requieren al desarrollador: mover el snippet al
> `<head>`, el campo oculto `gclid` en el formulario, y el `dataLayer.push` al enviarlo.

### 9b. ⛔ Cuenta nueva de Google Ads — revisar antes que nada

La cuenta se creó desde cero. Dos de estos ajustes **no se pueden cambiar después**, y
solo son gratis de corregir ahora, mientras la cuenta está vacía y sin gasto.

| # | Ajuste | Qué tiene que decir | Si quedó mal |
|---|---|---|---|
| 1 | **Modo de la cuenta** | **Modo experto** | En Modo Inteligente no se puede cargar nada de este build. Se cambia en un clic, pero hay que darse cuenta |
| 2 | **Zona horaria** | `(GMT-04:00) Santiago` | 🔒 **Irreversible.** Con la zona corrida, el reporte diario y la programación de anuncios quedan desfasados para siempre |
| 3 | **Moneda** | **CLP** (recomendado) | 🔒 **Irreversible.** Ver abajo |
| 4 | **Verificación de anunciante** | Iniciada hoy | Tarda días y **los anuncios no se muestran hasta que pasa**. Empezarla antes que cualquier otra cosa |

**Por qué CLP y no USD:** el ticket, el margen, los costos del cliente y la cuenta de Meta
están todos en pesos. Con la cuenta en CLP, cada lectura se compara directo contra el
CPL máximo de la sección 3 sin pasar por un tipo de cambio, y desaparece el supuesto de
$940 que hoy arrastra todo el presupuesto. Con la cuenta en USD hay que reconvertir en
cada reporte y el CPL se mueve por razones que no tienen que ver con la campaña.

> Si la cuenta quedó en **USD**, los CPC máximos de `build/01-palabras-clave.csv`
> ($600 y $250 CLP) y los presupuestos diarios hay que reexpresarlos antes de importar.

**Otras dos cosas de cuenta nueva:**

- **Cero historial de conversión** — es exactamente el supuesto de la estrategia de puja
  en tres fases (sección 5). Nada que ajustar, pero confirma que arrancar en CPA objetivo
  sería un error.
- **Riesgo de suspensión al primer arranque** — las cuentas nuevas se revisan con más
  dureza. Que el nombre de la empresa, el dominio y los datos de facturación coincidan
  entre sí reduce el riesgo. También conviene revisar si hay crédito promocional de
  bienvenida antes de cargar el primer presupuesto.

### ⛔ Bloqueantes — sin esto no se enciende

- [ ] **Cuenta nueva verificada:** modo experto, zona horaria Santiago, moneda confirmada (§9b)
- [ ] **Verificación de anunciante iniciada** — tarda días, empezar primero
- [ ] Acceso de **publicación** al contenedor `GTM-K44CLVC`
- [ ] Snippet de GTM movido al `<head>` + `<noscript>` en el body
- [ ] Las 4 conversiones creadas y **probadas con un envío real** (no confiar en el estado "verificando")
- [ ] Campo oculto `gclid` en el formulario de cotización, guardado en el CRM
- [ ] `dataLayer.push({event:'cotizacion_enviada'})` al enviar el formulario
- [ ] Página de destino decidida (ver decisión abajo)
- [ ] Facturación con método de pago y límite de gasto
- [ ] **Negativas cargadas antes de encender**, no después
- [ ] Confirmar el teléfono del recurso de llamada
- [ ] Ventas avisada: los leads de Google entran con SLA de 1 hora

### ⚠️ Importantes, no bloqueantes
- [ ] Perfil de Empresa vinculado (recurso de ubicación)
- [ ] Google Analytics 4 y Search Console vinculados (confirmar si ya hay GA4 en el contenedor)
- [ ] Quitar el `UA-75834089-1` muerto del sitio
- [ ] Recursos de imagen (ver sección 11)
- [ ] Valores de conversión — necesita ticket y margen

### La decisión de la landing

| Escenario | Qué hacer |
|---|---|
| **La landing está en ≤10 días** | **Esperar.** Diez días cuestan ~USD 165. Correr un mes a 2,5% de conversión en vez de 7% cuesta ~40 leads |
| **No hay fecha comprometida** | Lanzar al **50% (USD 250)**, solo con las exactas de AG1 y AG2 hacia `/16-futbol`, y congelar el resto |

`/16-futbol` es una página de catálogo de tienda, no una página de cotización. Convierte,
pero mal. Es la diferencia entre las dos columnas de la tabla de la sección 3.

---

## 10. Cómo se lee el test

| Momento | Qué se hace | Qué **no** se hace |
|---|---|---|
| Días 1-7 | Revisar el **informe de términos de búsqueda a diario** y sumar negativas | No tocar pujas. No pausar keywords |
| Día 7 | Primera limpieza a fondo. Confirmar que las conversiones registran | |
| Días 8-21 | Negativas cada 2-3 días. CTR por grupo (<3% en Search = keyword y copy desalineados) | No juzgar un grupo con menos de ~100 clics o ~$40.000 CLP |
| Día 21-30 | Con ≥15 conversiones, pasar a Maximizar conversiones | |
| Día 30 | Primer veredicto contra el CPL máximo de la sección 3 | |

**Umbral de muestra:** ningún grupo se dictamina bajo ~100 clics o ~$40.000 CLP gastados.
Debajo de eso la lectura es ruido, y es el error clásico de matar un grupo que nunca tuvo
la muestra para demostrar nada — exactamente lo que Meta le hizo a fútbol.

**Contra qué se compara:** no contra el CPL de Meta. Contra el **CPL máximo tolerable**
de la sección 3, que depende de la tasa de cierre real. Por eso la tasa de cierre hay que
medirla desde el día 1, no al final.

---

## 11. El material que falta (grabación pendiente)

El creativo que ganó en Meta es **foto de estudio, jugador con el uniforme completo,
fondo neutro** — sin video, sin efectos. Es el formato a repetir.

**Para Google hace falta la versión de fútbol de eso mismo:**

| Recurso | Formato | Para qué |
|---|---|---|
| Jugador con uniforme de fútbol completo, fondo neutro | 1:1, 1,91:1 y 4:5 | Recursos de imagen en Search |
| Detalle macro de sublimación (escudo, sponsor, costura) | 1:1 | Prueba de calidad — objeción P03 |
| Equipo completo formado con el uniforme | 1,91:1 | Prueba social institucional |
| Mockup en pantalla junto a la prenda real | 1:1 | Ángulo A08 de la estrategia |

**Para la segunda etapa (Demand Gen / YouTube, no ahora):** proceso completo brief →
mockup → producción → QA → entrega. Es el pilar P02 de Basti y el que responde el miedo
real del dirigente.

> Con USD 500 en Search no hay presupuesto para video. El material de video se graba para
> Meta y para cuando el canal justifique ampliar. **No es bloqueante para lanzar Google.**

---

## 12. Lo que queda pendiente de decidir

| # | Pendiente | Quién | Bloquea |
|---|---|---|---|
| 1 | **Ticket promedio del pedido 12+ y margen real** | Cliente (Antonio) | El veredicto de rentabilidad. Es la DECISIÓN 01 de la estrategia |
| 2 | Fecha de la landing propia | Basti / HEAT | Presupuesto de lanzamiento (100% o 50%) |
| 3 | Teléfono que contesta ventas | Cliente | Recurso de llamada |
| 4 | Quién y en qué plazo califica los leads de Google | Cliente / HEAT | La capa 3 de medición, que es lo que hace rentable el canal |
| 5 | Tipo de cambio real USD/CLP de la cuenta | HEAT | Precisión de todos los presupuestos |

---

## Fuentes

- Estrategia de Basti — `https://playmaker-strategy-heat.netlify.app/` (agosto 2026)
- Cuenta de Meta `231866284693734` — conector oficial de Meta, leída el 1-sep-2026
- Sitio del cliente — `https://playmaker.cl` (estructura, contactos, categorías)
- Ficha de cartera — `clientes/playmaker.md`
