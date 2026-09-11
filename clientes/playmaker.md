# PLAYMAKER

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

> Última revisión: **11-sep-2026**. El aviso de UNSETTLED de agosto quedó
> resuelto — la cuenta de Meta volvió a publicar (**$105.629 en los últimos
> 7 días**). Ahora el cliente corre en **dos canales**: Meta y Google Ads.

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `231866284693734` |
| **Business Manager** | Negocio de Antonio Espinoza Nehgme |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE — publicando |
| **Cuenta Google Ads** | `130-061-3823` (sub-cuenta de la administradora Heat `150-194-2107`) |
| **Rubro** | Indumentaria deportiva sublimada y personalizada. Marca chilena |
| **Web** | https://playmaker.cl · línea fútbol en `/16-futbol` |
| **WhatsApp** | +56 9 2243 5283 (botón flotante "COTIZA AQUÍ" en el sitio) |

## Los números (obligatorios — sin esto no hay recomendación de presupuesto)
| | |
|---|---|
| **Ticket promedio** | |
| **Margen** | |
| **% dispuesto a invertir por cliente nuevo** | |
| **Meta de ventas mensual** | |
| **Inversión actual/mes** | |
| **CPA objetivo** *(calculado)* | |
| **ROAS objetivo** *(calculado)* | |
| **NÚMERO MÁGICO** *(ROAS mínimo o CPA/CPL máximo)* | |

## Conversión y medición
| | |
|---|---|
| **Destino** | **Web → cotización** (y WhatsApp como vía paralela) |
| **Objetivo de campaña** | Meta: Clientes Potenciales (formulario nativo) · Google: Búsqueda |
| **Píxel** | ✅ / ❌ |
| **API de Conversiones** | ✅ / ❌ |
| **`ctwa_clid`** *(solo si es WhatsApp)* | ✅ / ❌ |
| **% de cierre lead → venta** | *(si no se sabe, 5% como estándar)* |
| **Quién responde y en cuánto** | |

## Las 7 Maletas
1. **Público** —
2. **Problema principal** —
3. **Solución** —
4. **Diferencial menos mencionado en el mercado** —
5. **Testimonios disponibles** —
6. **Objeción #1** —
7. **Garantía** —

## ADN
| | |
|---|---|
| **Nivel de consciencia dominante del copy** | |
| **¿Tiene material para hablarle a gente fría?** | |
| **Tipo de oferta** | info / servicio / producto físico / e-commerce / alto ticket / SaaS |
| **3 deseos de Reiss** *(con evidencia)* | |
| **2 perfiles de comprador** | |

## Estado actual de la cuenta — Meta, al 11-sep-2026

El bloque de "cuenta impaga" de agosto quedó **obsoleto**: la cuenta publica con
normalidad desde el 18-ago.

| Campaña `Clientes Potenciales \| Meta form` · `120247918878030157` | Últimos 30 días |
|---|---|
| Inversión | **$349.369** |
| Leads | **999** (Ads Manager muestra **759** en Resultados — ventana de atribución) |
| Costo por lead | **$350** |
| Impresiones · clics · CTR | 396.201 · 9.440 · 2,38% |
| CPM · frecuencia | $882 · 2,21 |
| Aprendizaje | ✅ salió (`SUCCESS`) |

**Un solo conjunto:** `Amplio | Meta Form` (`120247918878040157`), $15.000/día.
Chile, hombres 19-55 configurado, **Advantage+ activo con permiso para salirse de
edad y género** — y se sale: 17% de los leads son mujeres, a $322 (mejor CPL que
los hombres, $357).

| Edad | Leads | % |
|---|---:|---:|
| 18-24 | 323 | 32% |
| 25-34 | 298 | 30% |
| 35-44 | 167 | 17% |
| 45-54 | 146 | 15% |
| 55+ | 65 | 7% |

### Los 5 anuncios, y el problema de estructura
| Anuncio | Gasto | Impresiones | Leads | CPL |
|---|---:|---:|---:|---:|
| **Prueba: basquet** | $229.359 | 299.109 | 671 | $342 |
| **Prueba: diamante** | $112.765 | 92.125 | 319 | $353 |
| No somos la marca para ti | $3.906 | 2.294 | 5 | $781 |
| **Prueba: Fut 01** | $2.446 | 1.919 | 3 | $815 |
| La Clásica | $893 | 754 | 1 | $893 |

**Los 5 están en el mismo conjunto, así que compiten entre ellos.** Meta concentró
98% del gasto en dos y los otros tres nunca tuvieron muestra suficiente para ser
juzgados — el umbral son 500 impresiones y `Fut 01` llegó a 1.919 con $2.446.

⚠️ **El único creativo de fútbol es uno de los que no se probó.** No sabemos si el
fútbol funciona en Meta; sabemos que no se midió.

Consecuencia directa para el plan de "hacer más videos": si entran al mismo
conjunto, les pasa lo mismo. Para aprender qué deporte y qué video funcionan hay
que **separarlos en conjuntos distintos**, o no compiten en igualdad.

### Retención de video (los creativos vienen reutilizados de Instagram)
| Anuncio | Reproducciones | Llegaron al 75% | |
|---|---:|---:|---:|
| Prueba: basquet | 293.230 | 11.603 | **4,0%** |
| Prueba: diamante | 89.567 | 2.595 | **2,9%** |

### Medición: el hueco de fondo
| | |
|---|---|
| **Objetivo de optimización** | `LEAD_GENERATION` — **volumen** de formularios, no calidad |
| **`promoted_object.pixel_id`** | `null` |
| **CAPI / dataset** | ❌ no conectado |
| **Destino** | `ON_AD` — formulario instantáneo nativo |

**Meta no tiene forma de saber cuál de los 999 leads valió algo**, así que persigue
el formulario más barato que encuentra. Está cumpliendo la orden que se le dio.
Es el mismo patrón que Asistencia Legal, y lo resuelve el mismo motor de CAPI.

### El formulario sí califica — pero por deporte, no por tamaño
Pregunta **"¿Para qué deporte estás buscando la prenda?"** más los datos básicos.

Eso es mejor de lo que parece: **los 999 leads ya traen el deporte declarado.** La
trazabilidad básica está recolectada, solo hay que contarla.

Lo que **no** pregunta es para cuántas personas. Esa es la variable que separa un
pedido de $19.900 de uno de club completo, y hoy no se captura ni en el formulario
ni en Meta.

### ⚠️ Meta y el CRM no cuadran — pendiente de zanjar
Del 4 al 10-sep Meta reporta **283 leads** (28·32·37·63·48·32·43). El CRM, con
119 sin contactar y 91% sin contactar, implica **~131 fichas**. Faltan ~150.

Tres explicaciones posibles, sin distinguir todavía:
1. **Duplicados** — frecuencia 2,21; GHL fusiona por teléfono y Meta cuenta dos.
   La más probable. Si es esto, el costo por *persona real* es mayor a $350.
2. **Leads que no llegan al CRM** — más caro que el problema recién corregido.
3. **La lista de 119 venía filtrada** y el 91% no aplica al total.

**La prueba:** contactos únicos creados en GHL del 4 al 10-sep contra 283. Si da
~131, revisar cuántos de los 283 comparten teléfono.

Ojo con las dos columnas de Meta: "Resultados" da 759 (≈30/día) y "Clientes
potenciales" da 999 (≈40/día). Parte de la discrepancia entre lecturas sale de ahí.

### Prioridad por canal (confirmado con Seba, 11-sep)
- **Meta → básquetbol.** El anuncio de básquet no es una fuga: es la estrategia.
- **Google → fútbol.** Por eso la campaña y la landing apuntan a `/16-futbol`.
- Pendiente de decidir con datos: cuál de los dos canales convierte mejor. Si gana
  Meta con claridad, el plan es concentrar ahí y producir más video.

---

## El sitio: es cotización, no venta online

Verificado sobre el HTML de `playmaker.cl/16-futbol` (4-sep y 7-sep). Este
bloque existe porque en la Parte 1 escribí anuncios que decían "Compra Online
Segura" apuntando a una página donde no se puede comprar.

| Qué | Hallazgo |
|---|---|
| **Motor** | PrestaShop + módulo `roja45quotationspro`, `catalog_mode = 0` |
| **Botones reales** | "Añadir a cotización" · "Solicitar cotización" · carrito de cotización en el header con contador |
| **Botones de compra** | **cero** — ni "comprar" ni "añadir al carrito" en toda la página |
| **Precio a la vista** | **sí** — `<span itemprop="price" class="price">$ 19.900</span>` en cada tarjeta. 24 productos en la página 1, los 24 a $19.900 |
| **Catálogo de la página** | 24 variantes "Camiseta Playmaker Fútbol [EF/AI/MA/FB/FT/GX/JC/JZ…]" — son plantillas de diseño sublimable, no productos distintos |
| **Segundo CTA** | botón flotante de WhatsApp, texto "COTIZA AQUÍ", al +56 9 2243 5283 |

**Consecuencia para todo copy, en Meta y en Google:** nada de "compra",
"comprar", "stock" ni "tienda online". El lenguaje es cotizar / equipar /
personalizar. El negocio real no es la camiseta suelta: es el **set para un
equipo o club**.

## Google Ads — estado al 7-sep-2026

| | |
|---|---|
| **Campaña** | `PM \| Búsqueda \| Fútbol \| Chile` · ID `24221465441` |
| **Estado** | 🟢 **ENCENDIDA** el 7-sep-2026 por Seba |
| **Presupuesto** | CLP 5.000/día · Maximizar clics con tope de CPC CLP 250 |
| **Gasto histórico** | CLP 5.443 · 541 impresiones · 39 clics · CTR 7,21% · CPC CLP 140 · **0 conversiones** |
| **Grupos** | 1 de 3 creado: `Camisetas Fútbol` (ID `198653351943`, 5 keywords, RSA nuevo ✅) |
| **Grupos** | 3 de 3 ✅ `Camisetas Fútbol` · `Equipos y Personalización` · `Marca Playmaker` |
| **Keywords** | 16 · 13 frase + 3 exacta · **cero en amplia** |
| **Negativas** | 40 a nivel campaña (30 amplia + 10 frase) |
| **Recursos** | 4 vínculos a sitio · 5 textos destacados · 1 fragmento estructurado |
| **Falta** | ⚠️ **la etiqueta de conversión "Cotización enviada"** — sigue en "Configuración incorrecta" |
| **Prompts de la construcción** | `clientes/playmaker/google-ads-parte3.md` |

### El GTM del sitio NO es nuestro (verificado 11-sep)
El HTML de `playmaker.cl` trae el contenedor **`GTM-K44CLVC`**. No sirve: es de la
**cuenta vieja de Google Ads, a la que ya no hay acceso**. La cuenta nueva
(`130-061-3823`) no está incluida ahí.

O sea que la etiqueta no se resuelve desde el navegador: hace falta **acceso al
contenedor o al sitio**, y eso lo tiene que dar el cliente. La migración a Shopify
no cambia ese requisito — solo cambia dónde hay que instalarlo.

**No volver a proponer "usamos el GTM que ya está".** Ya se revisó.

### La etiqueta no bloquea la entrega, bloquea la lectura
La campaña usa **Maximizar clics**, y esa estrategia **no necesita conversiones
para funcionar**. Sin la etiqueta la campaña entrega igual; lo que se pierde es
saber cuántas cotizaciones salieron. Con $5.000/día son ~$150.000 al mes: un
mes a ciegas se aguanta, dos no.

### Lo que dejó el informe de términos de los 39 clics (8-ago a 6-sep)
- **Solo 1 término repitió clic** (`camisetas de futbol`, 3 clics). Los otros 22
  clics fueron 22 términos distintos. Cola larga pura, sin volumen que optimizar.
- **19 de 23 términos entraron por *variante cercana*.** Aunque las keywords son
  frase y exacta, Google amplía por su cuenta. Ahí está la fuga.
- **CLP 819 (22% del gasto visible) se fue en clubes ajenos**: huachipato,
  palestino, deportivo de la coruña, barcelona. Los tres primeros **no** están
  en las 40 negativas cargadas.
- **El cliente objetivo aparece y confirma la tesis**: `donde grabar camisetas
  de futbol`, `hacer poleras de futbol`, `proveedor de camisetas de futbol`,
  `camisetas de arquero personalizadas`, `mandar hacer camisetas de futbol
  chile`. Son búsquedas de *mandar a hacer*, no de comprar retail.
- **La geografía aparece sola**: Temuco, Viña del Mar, Concepción, Osorno,
  Punta Arenas, Estación Central. Hay demanda regional real sin trabajar.
- ⚠️ **El 32% del gasto (CLP 1.730, 14 clics) está en "Otros términos de
  búsqueda"**, que Google no desglosa por umbral de privacidad. No se puede
  negativizar lo que no se ve. Es un límite de la plataforma, no un pendiente.

### Criterio acordado con Seba (7-sep): no perseguir la campaña perfecta
El informe sugería ~60 negativas más. **No se cargan.** Casi todas salen de
términos con 1 impresión y 0 clics — ruido que nunca costó un peso. El objetivo
de esta campaña es **llevar tráfico calificado a `/16-futbol`**, no ser
impecable. Se revisa con volumen real, no a priori.

**Negativas que sí valen (ya costaron plata, pendientes de cargar):**
`huachipato` · `palestino` · `"deportivo de la coruña"` · `"camarin del abuelo"`

**Ojo: NO negativizar `chile` suelto.** Aparece en el ruido de selección, pero
también en `camisetas futbol chile` (clic legítimo) y en la propia keyword
`"camisetas de futbol chile"`. La forma segura son las frases
`"seleccion chilena"` y `"camiseta de chile"`.

### Falso positivo descartado
El informe de la Parte 3 advertía que el copy dice "Desde $19.900" pero que el
producto PRO OFICIAL FÚTBOL cuesta $12.000, con riesgo de desaprobación por
precio inexacto. **Verificado contra el HTML de `/16-futbol`: el único precio
en esa página es $19.900, en los 24 productos. Cero apariciones de $12.000.**
El copy está correcto y no hay nada que editar.

### Negativas: la lista manda sobre el número
El brief decía "37 términos" y la lista traía 41. El número era mío y estaba
mal; lo que vale es la lista. Quedan **40** tras sacar una:

> **`juego` NO va como negativa.** En Chile "juego de camisetas" es como se
> pide un set completo para un equipo. Bloquearlo mata exactamente la búsqueda
> del cliente que Playmaker quiere.

Tampoco van `retro`/`vintage` (hay "Camiseta Sublimada Retro" en catálogo),
`niño`/`infantil` (39 de 44 productos tienen calce infantil) ni
`arquero`/`portero` (línea propia con precio).

Las negativas de varias palabras van en **frase**, no en amplia. `la u` en
amplia bloquearía cualquier búsqueda que traiga "la" y "u" sueltas.

### Crédito promocional
**$328.000 CLP, vence el 31-oct-2026.** Evaluar antes de esa fecha.

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 4-sep | Google Ads: se crea la campaña de Búsqueda (Parte 1) | Abrir el canal de búsqueda para la línea fútbol | Clics con intención de cotizar | ⚠️ quedó a medias — verificación de identidad de Google |
| 6-sep | Se descubre la campaña **encendida** y gastando con copy de "compra" sobre una landing de cotización | El copy prometía algo que la página no hace | Detener el gasto desalineado | ✅ pausada. CLP 5.443 gastados en 39 clics |
| 6-sep | RSA del grupo `Camisetas Fútbol` reemplazado por completo (15 títulos + 4 descripciones, lenguaje de cotización) | Alinear anuncio y landing | Calidad del anuncio | ✅ Google la califica "Buena" |
| 6-sep | Se eliminan 3 keywords de compra y se agregan 2 de "sublimadas" | Mismo motivo | Términos de búsqueda más limpios | ✅ 5 keywords, cero en amplia |
| 7-sep | Se corrige la lista de negativas: 41 → 40, sale `juego` | "Juego de camisetas" es el cliente objetivo, no ruido | No perder tráfico calificado | ✅ confirmado por los datos: `juego camisetas de futbol`, `valor juego de camisetas de futbol` y `juegos de camiseta` aparecen en el informe. Con `juego` se habrían bloqueado |
| 7-sep | Parte 3: se guardan los grupos 2 y 3, las 40 negativas, los 10 recursos y se verifica el tope de CPC | Terminar la carga bloqueada por la verificación de identidad | Campaña completa y lista | ✅ 11 de 12 del checklist en verde |
| 7-sep | **Campaña ENCENDIDA** por Seba | El objetivo es llevar tráfico a `/16-futbol`; la etiqueta no bloquea la entrega con Maximizar clics | Clics con intención de cotizar | ⏳ primera lectura el **14-sep** |
| 11-sep | Se mide el CRM contra Meta y se encuentra la causa del reclamo del cliente | El cliente decía "pocos leads"; llegaban ~40/día | Tasa de contacto | ✅ **921 fichas en la etapa de entrada; de las 120 más recientes, 109 (91%) sin un solo mensaje. Cero fichas con mensaje nuestro sin respuesta** — el primer contacto no fallaba a veces, no existía |
| 11-sep 11:56 | Primer contacto automático en producción: mensaje dentro de 5 min usando el deporte declarado en el formulario | La etapa de entrada no la revisaba nadie; los avisos arrancaban en "Pendiente Cotización" | Contactados ÷ recibidos: de ~9% a ~100% | ⏳ primera lectura **15-sep** |
| 11-sep | Rescate a goteo de los 119 sin contactar de los últimos 7 días (1 cada 5 min, 9-20 h) | Recuperar lo salvable sin quemar el número de WhatsApp | Respuestas | ⏳ en curso. En Ondex, mismo defecto, **24% de los números falló** — descontarlo antes de calcular tasas |

