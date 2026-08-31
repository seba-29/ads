# 02 — Extracción de datos

El objetivo de este documento es que **nunca vuelvas a pedir "las métricas" en genérico**.
Una consulta vaga devuelve un resumen bonito e inservible: alcance, impresiones,
"buen desempeño". Con los campos exactos, la respuesta ya viene lista para diagnosticar.

---

## 1. Las tres ventanas, siempre juntas

Pide siempre las tres. Una sola miente.

| Ventana | Para qué |
|---|---|
| **Últimos 7 días** | La ventana de decisión. Es sobre esta que se optimiza |
| **Los 7 días anteriores** (día 8 al 14) | La comparación. Sin ella no sabes si mejoró o empeoró |
| **Últimos 30 días** | Contexto y tendencia. Amortigua el ruido de la semana |

Si la campaña arrancó hace menos de 14 días, la comparación no existe todavía —
**dilo**, no la fabriques contra una ventana parcial.

⚠️ **Antes de comparar dos ventanas, mira la bitácora.** Si hubo una edición en medio,
no estás comparando dos semanas de la misma campaña: estás comparando dos campañas
distintas. Eso no invalida el dato, pero cambia por completo lo que significa.

---

## 2. Meta Ads — qué pedir exactamente

### Niveles
Pide **campaña**, **conjunto** y **anuncio**. El nivel importa porque cada uno responde
una pregunta distinta:

- **Campaña** → ¿cuánto costó el resultado? *(el veredicto)*
- **Conjunto** → ¿qué público/segmento funciona? *(dónde mover presupuesto)*
- **Anuncio** → ¿qué creativo funciona? *(qué renovar)*

Un diagnóstico hecho solo a nivel campaña no puede distinguir "el público está mal" de
"el creativo está gastado", que son las dos causas más comunes y llevan a acciones
opuestas.

### Campos base (todos los objetivos)

```
spend, impressions, reach, frequency,
clicks, unique_clicks, inline_link_clicks, unique_inline_link_clicks,
ctr, unique_link_clicks_ctr, cpm, cpc,
actions, cost_per_action_type,
date_start, date_stop
```

### Campos de video (si hay video, y casi siempre hay)

```
video_play_actions,
video_p25_watched_actions, video_p50_watched_actions,
video_thruplay_watched_actions,
video_avg_time_watched_actions
```

De acá salen las dos métricas que dicen si el gancho funciona:
**captura** = reproducciones de 3 seg ÷ impresiones (umbral 20-25%) y
**tiempo promedio** (umbral 5-7 seg). Ver `meta-ads/06-optimizacion.md`.

### El `action_type` correcto según el destino

Este es el error silencioso más común: leer el `action_type` equivocado y reportar un
CPA que no corresponde al resultado que el cliente valora.

| Destino | `action_type` a leer |
|---|---|
| WhatsApp / Messenger / DM | `onsite_conversion.messaging_conversation_started_7d` |
| Formulario nativo de Meta | `lead` *(o `onsite_conversion.lead_grouped`)* |
| Formulario en la web (píxel) | `offsite_conversion.fb_pixel_lead` |
| Compra en la web | `offsite_conversion.fb_pixel_purchase` + `purchase_roas` |
| Paso intermedio de la landing | `landing_page_view` |

**`link_click` no es un resultado.** Es tráfico. Si el objetivo es tráfico, díselo al
cliente con todas sus letras: una campaña de tráfico optimiza por clics, no por ventas
ni por seguidores.

### Desgloses que vale la pena pedir

Solo cuando ya sabes que hay un problema — no de entrada, porque multiplican el ruido:

| Desglose | Responde |
|---|---|
| `publisher_platform`, `platform_position` | ¿El costo malo viene de una ubicación específica? |
| `age`, `gender` | ¿El público que convierte es el que creíamos? |
| `region` | ¿Vale la pena esa zona? *(clave si se amplía geografía)* |
| `device_platform` | Móvil vs. escritorio, típico en problemas de landing |

---

## 3. Si el conector de Meta no está disponible

El conector puede estar **conectado pero apagado en el chat**, o la cuenta puede no
tener habilitado el MCP todavía (`is_ads_mcp_enabled: false`). Ver
`meta-ads/11-ia-y-mcp.md`.

En ese caso, la ruta manual: **Administrador de Anuncios → Columnas → Personalizar →
Exportar CSV**, con las columnas de arriba, y subir el archivo al chat. Es más lento
pero produce exactamente el mismo diagnóstico.

Cuando exportes a mano, deja fijas estas cinco columnas, que son las que el panel
esconde por defecto y sin las cuales no se puede diagnosticar:
**clics únicos en el enlace**, **frecuencia**, **reproducciones de 3 seg**,
**tiempo promedio de reproducción** y **costo por resultado**.

---

## 4. El dato que no está en ninguna plataforma

Meta sabe cuántos leads entregó. **No sabe cuántos se convirtieron en pacientes,
clientes o ventas.** Ese número lo tiene el cliente — en su CRM, su agenda o su cabeza.

Sin él puedes optimizar el **costo por lead**, pero no el **costo por venta**, que es lo
único que le importa al negocio. Y son métricas que se mueven en direcciones opuestas
con frecuencia: bajar el costo por lead suele traer leads peores.

Por eso pedirlo es parte del ciclo, no un extra. Si el cliente usa un CRM (GoHighLevel,
por ejemplo), la conciliación se hace ahí: leads que entraron vs. oportunidades ganadas
en el mismo periodo. Si no lo mide, el método usa **5% de cierre como supuesto
declarado** — declarado, es decir, escrito en el reporte como supuesto y no como dato.
