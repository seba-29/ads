# Defectos detectados — cruce panel ↔ GHL · 31-ago-2026

> ⚠️ **Este documento describe bugs de `HEAT-IA/heat-ads`, no de este repo.** Se guarda acá porque
> el push a `heat-ads` fue rechazado por permisos (Claude no tiene acceso de escritura a esa org).
> Al equipo TI hay que pasárselo por el artefacto o moviendo este archivo a mano.

Levantado sobre `CLINICA PALAVAS` (`QTkbQECvnZAu530F7gk8`), embudo `Oportunidades Palavas`,
3.819 oportunidades bajadas completas por API, y la cuenta Meta `65286325` por el conector.

**5 son de código de este repo y afectan a TODA la cartera. 4 son de configuración de Palavas.**

Documento navegable: https://claude.ai/code/artifact/a198ce91-af06-40cb-90d3-47bced8dcb3a
Detalle reproducible: `seba-29/ads` → `clientes/clinica-palavas/analisis-crm-y-disparo-2026-08-31.md`

---

## P1 · Rompen los números que ve el cliente

### D-01 · Las columnas de etapa suman el cajón de espera como ventas
`lib/stages.ts:108` · `components/Dashboard.tsx:90` · `components/FunnelTable.tsx:287`

`stageColumnCount(cumulative=true)` suma toda etapa con `position >= objetivo`, saltando solo las
perdedoras. Asume que el orden físico del embudo en GHL es el orden lógico del proceso.

En Palavas: `Pago Realizado`(5) · `Perdido`(6) · **`Seguimiento`(7)** · **`Link de pago`(8)**.

| Fila del panel | Pagos | + Seguim. | + Link | = Panel |
|---|---|---|---|---|
| Chillán | 1 | 2 | 1 | 4 |
| Estética Stgo Oriente | 0 | 11 | 0 | 11 |
| Las Condes | 0 | 1 | 0 | 1 |
| **TOTAL** | **1** | **14** | **1** | **16** |

Reproducido exacto: 16/16, 17/17, 1/1, y Chillán calza en las cuatro columnas.
**Cosmetología no tiene ningún pago**: sus «11» son 11 personas en Seguimiento.

| Etapa | Actual | Acumulada correcta | Panel hoy |
|---|---|---|---|
| Calificado | 26 | **32** | 48 |
| Agendado | 1 | **3** | 17 |
| Pago Realizado | 1 | **1** | 16 |

- **Fix ahora (GHL, 30 s):** mover `Seguimiento`, `Link de pago enviado` y `Perdido` antes de
  `Pago Realizado`.
- **Fix de raíz (código):** no inferir progresión del `position` de GHL, que es orden de tablero.
  Añadir `isParkingStage()` junto a `isLostStage()` (seguimiento / en espera / sin respuesta /
  pausa) y saltarlas en el acumulado; o guardar el orden lógico por tenant.
- **Verificar:** tras reordenar, «Pago realizado» total debe dar **1** y Cosmetología **0**.

### D-02 · «Pago Realizado» cae en el bucket `asistio`, no en venta
`lib/stages.ts:59`

`bucketForStageName` evalúa en orden y el test de asistió va antes que el de venta:
`/asisti|atendid|realizad|propuesta|proceso.*cierre/` matchea «Pago **Realiz**ado» por `realizad`.
Y el test de venta `/ganad|won/` **no matchea ninguna etapa de Palavas**.

→ «Ganado CRM» es 0 estructural para este cliente y para cualquiera cuya etapa de cierre diga
«realizado», «pagado» o «cobrado».

- **Fix:** mover el test de venta antes del de asistió y ampliarlo a
  `/pago|pagad|cobrad|ganad|won|cerrado.?ganad/`. El orden de evaluación es la mitad del arreglo.

### D-03 · `isWonOpp` exige un estado que este cliente nunca usa
`lib/funnel.ts:34`

Pide `status === "won"`. Las 3.819 oportunidades de Palavas están en `"open"`. El fallback por
bucket tampoco salva: hay `status`, y aunque no lo hubiera el bucket es `asistio` (D-02).
Los dos caminos fallan a la vez → `vendidos`, `revenue` y `totalWon` = 0.

- **Fix:** arreglar D-02 hace funcionar el fallback. Y definir si los clientes usan won/lost o si
  el panel se apoya solo en etapas.

---

## P2 · Se pierde la atribución

### D-04 · El panel ignora el campo de origen que sobrevive al cobro
`lib/ghl.ts:20`

GHL guarda atribución en dos lugares y `normalizeAttribution` solo lee uno:

| Campo | Trae | ¿Lo lee? |
|---|---|---|
| `attributions[]` (oportunidad) | `utmCampaignId`, `utmAdId` | ✅ el único |
| `attributionSource` (contacto) | `formId`, **`adId`**, `ctwaClid`, `url` | ❌ |

Medido: de los 26 compradores de Palavas, **3 traen `sessionSource: "Paid Social"` con `adId`**
en `attributionSource`; el array viene vacío en los 26. Dos son ventas de CTWA que hoy no se le
acreditan a nada.

- **Fix:** leer `attributionSource.adId` de respaldo cuando el array viene vacío, y mapearlo al
  árbol de Meta igual que `utmAdId`.

### D-05 · `getCampaignByContact` es código muerto
`lib/ghl.ts:571`

Exportada y documentada, **ninguna línea la invoca** (verificado en todo el repo). Es justo la que
resolvería parte de D-04. Da falsa sensación de cobertura al leer el código.

- **Fix:** conectarla al resolver D-04, o borrarla.

### D-06 · Cada cobro abre una ficha nueva y huérfana
*(GHL + integración de Mercado Pago — no es código de este repo)*

21 de los 26 pagos entran como oportunidad nueva con fuente `COMPRA WEB`, sin enlace al contacto de
origen. **23 de 26 contactos nacen en el mismo minuto que su pago.** Cruzados los 26 pagos contra
los 206 leads de Meta por teléfono, correo y nombre: **coincide 1**.

→ El CRM no puede atribuir ninguna venta a su origen.

- **Fix:** que la integración de cobro busque el contacto existente por teléfono/correo y le agregue
  el pago, en vez de crear uno nuevo.

### D-07 · Se pierde el 15% de los leads entre Meta y el CRM
Meta reporta **239** formularios (25–31 ago); GHL tiene **204** oportunidades atribuidas.
**35 no llegaron.** El faltante es parejo por conjunto (82% / 86% / 91%) → pérdida sistemática.

- **Fix:** revisar la integración del formulario nativo → GHL: reintentos, campos obligatorios que
  rechacen el alta, logs de descarte.

---

## P3 · Operación del CRM

### D-08 · El asistente no se activa para una parte de los leads
La etiqueta `ia-prendida` es lo que mueve un lead de «Lead Nuevo» a «Conversando con IA».
Corte perfecto en la campaña de aniversario:

| Grupo | Personas | Con `ia-prendida` |
|---|---|---|
| Se trabajaron | 92 | **92 · 100%** |
| Sin contactar | 112 | **0 · 0%** |

68 de esas 112 llevaban 2 días o más. El patrón se repite en todo el embudo: «Conversando IA»
701 de 1.189; «Lead Nuevo» 38 de 1.185.

- **Fix:** revisar el workflow que asigna `ia-prendida` al crearse un lead — qué lo dispara,
  condiciones de origen o etiqueta previa, tope de ejecuciones.
- **Verificar:** contar oportunidades en «Lead Nuevo» con más de 24 h y sin `ia-prendida`.
  Debe tender a cero.

### D-09 · Ganado y perdido no se usan
Las 3.819 oportunidades están en `status: "open"`, ni siquiera las 26 con pago registrado.
Bloquea el fallback de D-03 y cualquier medición de tasa de descarte.

---

## Nota · el conector de Meta no entrega las calificaciones de calidad

`quality_ranking`, `engagement_rate_ranking` y `conversion_rate_ranking` no están disponibles ni a
nivel de campaña ni de anuncio — el conector responde con la lista de campos soportados y esos tres
no figuran. Son la calificación que Meta le pone a los anuncios contra la competencia, el mejor
respaldo externo del trabajo de la agencia. Alternativa: extraerlas del Ads Manager a mano.
