# CLÍNICA ONDEX

> Ficha de contexto. La lee la skill `meta-ads` antes de cualquier recomendación.
> Lo que no se sepa va como `?` — nunca inventado. Un dato falso contamina las 4 etapas.

> ⚠️ El nombre de la cuenta trae un espacio inicial (` Clínica Ondex`).

## Identificación
| | |
|---|---|
| **Cuenta publicitaria** | `1034674525430396` |
| **Business Manager** | Ondex Ads |
| **Moneda** | CLP |
| **Estado de la cuenta** | ✅ ACTIVE |
| **Rubro** | Kinesiología y ondas de choque · Santiago |
| **Web / IG** | clinicaondex.cl · [@clinicaondex](https://www.instagram.com/clinicaondex) |
| **Subcuenta GHL** | `CHtgjFPx4hWkSAtKewIo` |
| **WhatsApp** | `+56952296611` |
| **Líneas de servicio** | Kinesiología · Método Ondex (ondas de choque) |

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
| **Destino** | ✅ **Landing propia con form de 2 pasos** → GHL → WhatsApp (Heat) |
| **Landings en producción** | [metodoondex](https://metodoondex.clinicaondex.cl) · [kinesiologia](https://kinesiologia.clinicaondex.cl) · [recupera-el-control](https://recupera-el-control.clinicaondex.cl) — las 3 con certificado ✅ |
| **Home nuevo** | ⛔ listo en `home-ondex.netlify.app` pero **el apex sigue en WordPress**. Falta el registro A |
| **Objetivo de campaña** | Clientes potenciales |
| **Píxel** | ⚠️ `736328569555463` (dataset «Landing») — **ver advertencia abajo** |
| **API de Conversiones** | Conectada en ese dataset por *otra* integración; falta la de GHL |
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
| **Tipo de oferta** | **servicio** |
| **3 deseos de Reiss** *(con evidencia)* | |
| **2 perfiles de comprador** | |

## Estado actual de la cuenta
- **Qué corre hoy:** nada todavía. Las dos landings están construidas y la integración con el CRM ya está escrita y probada.
- **✅ Corregido — sí hay material de video.** La landing de Método trae **11 testimonios reales de pacientes en 9:16**, ya montados. La nota anterior decía que no había contenido utilizable; era incorrecta. Kinesiología sigue sin video propio (usa reseñas de Google).
- **⚠️ Píxel compartido.** El dataset `736328569555463` («Landing») tiene **3 dominios** disparando y recibe eventos de tienda (`Comprar`, `Iniciar pago`). Existe además un dataset **«Clínica Ondex»** `1354537603365442`. Hay que decidir cuál se usa y dejarlo limpio antes de armar públicos — si no, el retargeting mezcla visitantes de otros proyectos. Calidad de coincidencias hoy: **6,1/10**.
- **✅ Infraestructura terminada (25-ago).** Las dos landings publicadas con dominio y certificado, el formulario entregando contactos y oportunidades en GHL, y el píxel disparando `PageView`, `Lead_Parcial` y `Lead`. Probado en producción por el cliente con datos reales.
- **Pendiente antes de encender:** ticket promedio y margen por línea (bloquean el CPA objetivo), presupuesto mensual y reparto Meta/Google, y capacidad de agenda semanal.
- **⚠️ Bloquea Google, no Meta:** el `gclid` no se está guardando en GHL. Sin él no se puede atribuir un paciente al clic de Google Ads. Meta sí quedó completo (`fbclid`, `fbp`, `fbc`).

## Documentos
| Archivo | Qué tiene |
|---|---|
| `clinica-ondex/revision-estructura-matias.md` | Revisión del board de Figma de la contraparte |
| `clinica-ondex/estructura-corregida-etapa1.md` | La estructura reescrita, con la escalera de eventos y presupuestos |
| `clinica-ondex/landing/GUIA.md` | La integración de las landings con GHL, y el deploy |
| `clinica-ondex/landing/MAPEO-GHL.md` | Mapeo webhook → campos, y las advertencias del píxel |

## Bitácora
| Fecha | Qué se cambió | Por qué | Métrica que debía moverse | Resultado |
|---|---|---|---|---|
| 25-ago-2026 | Formulario de las dos landings conectado a GHL, en 2 pasos con captura parcial | El formulario no enviaba los datos a ninguna parte: `handleSubmit` solo pintaba «¡Listo!» y borraba lo escrito | Leads que llegan al CRM: de 0 a todos | Probado en navegador; falta configurar y publicar |
| 25-ago-2026 | Creados 15 campos personalizados en GHL | Sin ellos GHL recibe el lead y bota los datos | Completitud de la ficha del contacto | ✅ Los 15 verificados |
| 25-ago-2026 | Workflow «Nuevo Lead - Form Landing» armado y publicado | Convertir el envío del formulario en contacto + oportunidad | Leads que llegan al CRM | ✅ Probado en producción por el cliente |
| 25-ago-2026 | Landings publicadas en Netlify con dominio propio | Estaban solo como código local | — | ✅ Las dos con certificado |
| 25-ago-2026 | Corregidas URLs de `localhost` en el nav de producción | Las pestañas de cruce entre landings daban error de conexión | Navegación entre las dos líneas | ✅ Cruzan y arrastran la atribución |
