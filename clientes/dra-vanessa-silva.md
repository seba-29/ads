# DRA. VANESSA SILVA

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `1321852590109746` |
| **Business Manager** | Dra.vanessacsf |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE |
| **Rubro** | |
| **Web / IG** | |

## Los números (obligatorios — sin esto no hay recomendación de presupuesto)
| | |
|---|---|
| **Ticket promedio** | ? — pedido, todavía no lo entregan |
| **Margen** | ? |
| **% dispuesto a invertir por cliente nuevo** | ? |
| **Meta de ventas mensual** | ? |
| **Inversión actual/mes** | **$510.000 aprox.** ($17.000/día desde el 3-sep). NO confirmado con el cliente |
| **CPA objetivo** *(calculado)* | ? — sin ticket ni margen no se puede calcular |
| **ROAS objetivo** *(calculado)* | ? |
| **NÚMERO MÁGICO** *(ROAS mínimo o CPA/CPL máximo)* | ? |

> **Todo veredicto de esta cuenta es PROVISIONAL.** Hoy una conversación cuesta
> $514 y no sabemos si eso es barato o caro para la clínica. El ticket promedio
> es el dato que falta y es el que decide si se sube o se baja el presupuesto.

### Presupuesto: lo que dice el registro de Meta
| | |
|---|---|
| **Arranque (13-jul)** | $10.000/día · límite de gasto de la cuenta en $300.000 |
| **Desde el 24-jul** | $23.000/día (nace PROMOCIONES con $13.000) ≈ $690.000/mes |
| **Desde el 3-sep** | $17.000/día ≈ $510.000/mes |
| **Gasto real** | julio $282.635 (desde el 13) · agosto **$601.011** · sept 1-3 $107.789 |
| **Señal** | el 14-ago la cuenta topó los $300.000 y el cliente liberó el límite desde su teléfono |

Nunca se acordó por escrito un techo mensual. **Pendiente de confirmar.**

## Conversión y medición
| | |
|---|---|
| **Destino** | web / WhatsApp / form nativo / DM |
| **Objetivo de campaña** | **Interacción → WhatsApp** |
| **Píxel** | ✅ / ❌ |
| **API de Conversiones** | ✅ / ❌ |
| **`ctwa_clid`** *(solo si es WhatsApp)* | ✅ / ❌ |
| **% de cierre lead → venta** | ? — se asume 5% como estándar mientras no lo entreguen |
| **Quién responde y en cuánto** | El agente de IA atiende la conversación completa. **No agenda**: el agendamiento vive en otra plataforma, así que deriva a una persona del equipo que cierra la cita a mano |

> **El rastro se corta en el agendamiento.** Como la hora se toma fuera del CRM,
> no se puede medir cuántas conversaciones terminaron en cita. Por eso el
> reporte público de este cliente va SIN cruce con el CRM (`sinCrm` en
> `heat-ads/lib/reporte-gestion.ts`): un embudo que se corta a la mitad se lee
> como uno que no avanza.

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
| **Tipo de oferta** | **servicio** |
| **3 deseos de Reiss** *(con evidencia)* | |
| **2 perfiles de comprador** | |

## Estado actual de la cuenta
- **Qué corre hoy:** campañas de **Interacción → mensajes directos a WhatsApp**.
- **Lo que sostiene la cuenta:** un solo anuncio. «Promoción Lipoescultura»
  —una IMAGEN estática, no video— trae 758 de las 1.033 conversaciones del mes,
  a $422 cada una. El segundo es «Video 1 - Impacto», a $564. **Los dos son
  material que mandó el cliente.** Los demás videos rinden entre $578 y $1.016
  y se ven 4-6 segundos promedio: se grabaron para redes, no para anuncios.
- **Riesgo real:** no es fatiga (frecuencia semanal 1,6 y el costo bajando), es
  **dependencia de una sola pieza**. Hace falta material nuevo antes de que esa
  imagen se canse, no después.
- **Campaña del cliente:** «Promoción Lipovaser», la creó su equipo el 11-ago.
  Presupuesto **de campaña, $150.000 totales, del 12-ago al 11-sep** — se apaga
  sola. Va al mismo WhatsApp y compite en la misma subasta que la nuestra.
  Ojo: le quedan $67.779 para los últimos 8 días, así que Meta la va a
  acelerar. Si el costo por conversación sube esta semana, esa es la causa más
  probable — no la baja de presupuesto del 3-sep.
- **Segmentación actual:** Santiago.
- **Material:** ✅ se crearon videos nuevos.
- **Estado general:** ✅ funcionando bien, sin problemas declarados.
- **🎯 Tarea pendiente:** **ampliar cobertura geográfica** a otras zonas del país (zona sur, etc.).
- **⚠️ Cómo hacerlo sin romper nada:** editar la geo de un conjunto activo **reinicia la fase de aprendizaje** (+35-60% de CPA por 48-72h). Lo correcto es **duplicar** el conjunto que ya funciona y ponerle la geo nueva, dejando Santiago intacto. Además permite comparar CPM y costo por conversación por zona.
- **Ojo con el CPM por zona:** regiones distintas tienen costos distintos. Separar geo también permite decidir dónde vale la pena invertir.
- **Verificar:** ¿se está capturando el `ctwa_clid` + API de Conversiones? Sin eso Meta optimiza hacia gente que escribe, no hacia gente que compra. Ver `13-whatsapp-latam.md` §11.

## Lo que salió de la reunión del 3-sep (y toca a la publicidad)
La reunión se fue entera a operación —precios, bot de Instagram, facturación—
y **la publicidad no se alcanzó a tratar**. Nada de lo preparado se propuso.
Aun así, dos decisiones de esa reunión afectan a los anuncios:

- **La promoción de septiembre se extiende a octubre.** Buena noticia: el
  creativo que sostiene la cuenta es justamente el de la promoción, así que
  sigue vigente un mes más y no hay que reemplazarlo con apuro.
- **Se corrige el valor de la liposucción.** ⚠️ **VERIFICAR si el anuncio
  ganador lleva el precio a la vista.** Si lo lleva y el precio cambió, hay un
  anuncio activo comunicando un valor equivocado a 160 mil impresiones — y la
  conversación arranca con una corrección. Es lo más urgente de la lista.
- **El bot de Instagram no se puede frenar** desde la migración a Claude. Se
  interviene a mano con un mensaje y el bot se reactiva a las 3 horas. El botón
  de freno se implementa este mes. No es de publicidad, pero afecta la calidad
  de la conversación que compran los anuncios.

**Pendiente de la reunión que no ocurrió:** proponer la campaña de formulario,
comparar contra WhatsApp, y pedir 2-3 videos nuevos grabados para anuncio.

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 2026-07-11 | Límite de gasto de la cuenta a $300.000 (Piero) | Techo del plan inicial | — | Se topó el 14-ago; el cliente lo liberó |
| 2026-07-13 | Primer conjunto al aire, $10.000/día | Arranque | — | — |
| 2026-07-15 | Conjunto (1-3-5) de $15.000 a $5.000/día | Corrección de la subida del 14-jul | — | — |
| 2026-07-24 | Nace PROMOCIONES con $13.000/día | Escalar el ángulo de promoción | Volumen de conversaciones | Es el conjunto más barato: $423 c/u |
| 2026-09-03 | PROMOCIONES $13.000→$10.000; (1-3-5) y (2-4) $5.000→$3.500 | El conjunto (2-4) va a $907 por conversación contra $423 de PROMOCIONES; diferencia declarable (n=137 y 759) | Costo por conversación de la campaña hacia $460-480 | *(en 7 días)* |

> ⚠️ **Los tres cambios del 3-sep se hicieron el mismo día.** Rompe la regla de
> un cambio a la vez: la próxima ventana no va a poder decir cuál de los tres
> hizo qué. Además hay 48-72 h de fase de aprendizaje, así que las lecturas
> hasta el 6-sep vienen infladas y no significan nada.

> **La reunión del 3-sep no confirmó presupuesto.** Sigue sin haber un techo
> mensual acordado por escrito. Es lo primero que hay que cerrar en el próximo
> contacto.
