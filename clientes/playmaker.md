# PLAYMAKER

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

> Última revisión: **7-sep-2026**. El aviso de UNSETTLED de agosto quedó
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

## Estado actual de la cuenta
- **Qué corre hoy:** nada — la cuenta quedó **impaga** y no es consultable.
- **Historial:** las campañas estaban apagadas; se creó una **campaña nueva de Clientes Potenciales con formulario** (hace ~2 días) y acto seguido saltó el estado de pago.
- **Estado de gestión:** ✅ ya se avisó al cliente.
- **Desbloquea:** que el cliente regularice el saldo. Hasta entonces no hay nada que optimizar.
- **Al reactivar:** la campaña nueva va a reiniciar aprendizaje. Tratarla como lanzamiento, no como continuación.

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
| **Estado** | ⏸️ **PAUSADA** a propósito, esperando la etiqueta de conversión |
| **Presupuesto** | CLP 5.000/día · Maximizar clics con tope de CPC CLP 250 |
| **Gasto histórico** | CLP 5.443 · 541 impresiones · 39 clics · CTR 7,21% · CPC CLP 140 · **0 conversiones** |
| **Grupos** | 1 de 3 creado: `Camisetas Fútbol` (ID `198653351943`, 5 keywords, RSA nuevo ✅) |
| **Faltan** | grupos `Equipos y Personalización` y `Marca Playmaker`, 40 negativas, recursos, etiqueta de conversión |
| **Bloqueo** | el diálogo "Confirme su identidad" de Google. Solo lo puede resolver Seba — no se ingresan contraseñas ni 2FA |
| **Prompt de continuación** | `clientes/playmaker/google-ads-parte3.md` |

**Los 39 clics ya pagados se compraron con el copy desalineado** ("Compra
Online Segura", "Stock Disponible"). Antes de encender hay que leer el informe
de términos de búsqueda de esos 39 clics: es data real y gratis, y dice qué
negativas faltan de verdad mejor que cualquier lista armada a priori.

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
| 7-sep | Se corrige la lista de negativas: 41 → 40, sale `juego` | "Juego de camisetas" es el cliente objetivo, no ruido | No perder tráfico calificado | ⏳ pendiente de cargar |
