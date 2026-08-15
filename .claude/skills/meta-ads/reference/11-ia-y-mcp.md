# 11 — Conectar la IA a Meta Ads (MCP oficial)

El **29 de abril de 2026** Meta lanzó en beta abierta los *Meta Ads AI Connectors*: la
primera conexión **oficial** entre una cuenta publicitaria y herramientas de IA
externas. Cambia cómo se opera una cuenta, y cambia para qué sirve este skill.

---

## 1. Qué es y por qué importa

**MCP** (Model Context Protocol) es el estándar que Anthropic publicó en 2024 para
conectar herramientas de IA con APIs externas. Meta expuso su plataforma publicitaria
como servidor MCP.

**Antes vs. ahora:**

| Antes | Ahora con el MCP oficial |
|---|---|
| Crear una app de desarrollador en Meta | Pegar la URL oficial del servidor |
| Manejar tokens de acceso manualmente | Autenticarse con tu cuenta normal de Meta |
| Esperar 3-7 días de revisión | Listo en menos de 15 minutos |
| **Riesgo real de cierre de cuenta** | Conexión oficial, sin riesgo de baneo |
| Herramientas de terceros: $25-99 USD/mes | Gratis durante la beta |

Durante 2025 varias agencias reportaron **cierres de cuenta** por usar conectores no
autorizados. Ese riesgo desaparece con el conector oficial: es Meta quien lo permite.

**URL oficial del servidor:** `https://mcp.facebook.com/ads`

---

## 2. Verificación técnica (fuente primaria)

Comprobado directamente contra el endpoint, no solo leído en un artículo:

```
POST https://mcp.facebook.com/ads   → 401 + www-authenticate: Bearer
```

Metadatos OAuth que publica el servidor:

| Campo | Valor |
|---|---|
| **Emisor** | `https://www.facebook.com` |
| **Autorización** | `https://www.facebook.com/v26.0/dialog/oauth` |
| **Token** | `https://graph.facebook.com/v26.0/oauth/access_token` |
| **PKCE** | S256 (obligatorio) |
| **Cliente** | Público (`token_endpoint_auth_methods: none`) |
| **Registro dinámico** | `https://mcp.facebook.com/.well-known/register/ads` |

**Permisos (scopes) que solicita — esto define el techo real de lo que puede hacer:**

```
ads_management      ads_read           catalog_management
business_management pages_show_list    instagram_basic
ads_mcp_management
```

> Fíjate en lo que **no** está: nada de `pages_manage_posts`, nada de acceso a
> analítica web. Por eso el conector no puede publicar en tu página ni leer datos de tu
> sitio. Las limitaciones no son un bug temporal: están en los permisos.

---

## 3. Instalación

### Claude (Pro / Max)
1. **Personalizar → Conectores**
2. Clic en **"+"**
3. **"Agregar conector personalizado"**
4. Nombre: `Meta` · URL: `https://mcp.facebook.com/ads`
5. Guardar y **autenticar con tu cuenta de Meta**

En **Team / Enterprise** cambia un detalle: el *Owner* debe crear primero el conector
para toda la organización desde **Organization Settings → Connectors**; después cada
usuario conecta su propia cuenta de Meta.

Una vez configurado, se activa desde el botón **"+"** dentro de cualquier conversación.
Funciona igual en web y en la app de escritorio.

### ChatGPT (Plus o superior)
1. **Settings → Apps → Advanced Settings**
2. Activar **Developer Mode**
3. **Connectors → Create App**
4. Pegar la URL MCP · completar OAuth · guardar

> OpenAI advierte que Developer Mode tiene riesgo real: habilita **acciones de
> escritura** sobre herramientas externas.

### Perplexity
1. **Account Settings → Connectors**
2. **"+ Custom connector" → Remote**
3. Nombre + URL MCP + **OAuth**
4. Guardar y autenticar

Acepta SSE y Streamable HTTP.

### Gemini
**No soporta MCP** al momento de escribir esto. Google confirmó que llegará; sin fecha.

### ⚠️ Rollout gradual
Meta está habilitando cuentas por etapas — primero EE.UU. y las de mayor gasto. Si ves:

```
is_ads_mcp_enabled: false
```

tu cuenta todavía no tiene acceso. **No hay forma pública de acelerarlo.**

**Cómo verificar:** copia el número de tu cuenta publicitaria (en el Administrador de
Anuncios, en la URL busca `act=`) y pregunta en el chat:
*"¿Está habilitado el conector MCP para la cuenta 123456789?"*

---

## 4. Qué SÍ puede hacer

- Generar reportes en lenguaje natural
- Detectar campañas con menor CPL
- **Crear campañas nuevas desde un brief** (con conjuntos)
- **Duplicar anuncios existentes**
- Pausar conjuntos de anuncios
- Ajustar presupuestos
- Modificar copies
- Subir catálogos de productos
- Revisar si el píxel dispara correctamente
- Crear listas de clientes

> **Regla de Meta: toda campaña nueva nace PAUSADA.** Nada gasta hasta que un humano la
> active. Es el principio de *Human in the Loop*.

## 5. Qué NO puede hacer

| Limitación | Cómo se rodea |
|---|---|
| **No lee públicos personalizados existentes** | Los describes tú en el chat |
| **No crea públicos nuevos** (salvo listas de clientes) | Los creas a mano; deja los conjuntos en segmentación abierta y ajusta después |
| **No sube imágenes ni videos nuevos** | Duplicas un anuncio ya probado y editas |
| **No accede a datos de tu web** (visitas, carrito, checkout) | Exporta el CSV del Administrador con esas columnas y súbelo al chat |
| No instala píxeles desde cero ni debuggea implementaciones | Manual |
| No configura pruebas A/B | Manual |
| No accede al algoritmo interno de Advantage+ ni a la lógica de subasta | — |
| No funciona con Gemini | Usa Claude, ChatGPT o Perplexity |

**En números:** hace aproximadamente el **70%** del trabajo; el 30% sigue siendo tuyo.

---

## 6. ⚠️ La advertencia que no hay que saltarse

> **No existe modo borrador. No existe botón de deshacer.**
>
> El acceso de escritura impacta tu cuenta publicitaria **real e inmediatamente**. Si
> la IA interpreta mal un prompt y cambia un presupuesto de $100 a $10.000, el cambio
> queda aplicado.

**Protocolo obligatorio de los primeros días:**
1. Empezar **solo con consultas de lectura**.
2. Configurar **límites de gasto** en el Business Manager (la red de seguridad real).
3. Revisar **manualmente cada acción de escritura**.
4. Recién después, habilitar automatizaciones más agresivas.

Esta es la razón por la que la Ley 0 (la impaciencia) se vuelve más peligrosa, no
menos: ahora puedes destruir una cuenta mucho más rápido.

---

## 7. La fórmula: MCP + Skill

Esta es la idea central, y es la que da sentido a todo este repositorio:

> ### MCP (conexión segura) + Skill (metodología) = Recomendaciones accionables
>
> - 🛑 **Sin skill**, la IA da recomendaciones genéricas sacadas de documentación.
> - ✅ **Con skill**, cada respuesta sale de *tu* metodología.

El conector aporta los **datos**. El skill aporta el **criterio**. Sin criterio, tienes
un modelo con acceso de escritura a tu dinero y ninguna disciplina — que es exactamente
la peor combinación posible.

**Este repositorio es la mitad "skill" de esa fórmula.** Todo lo que hay en
`reference/` (el ciclo de ventas, los umbrales de las 3 Q's, la cascada de exclusiones,
el cálculo de arquitectura) es lo que convierte una consulta al MCP en una decisión.

Cómo se usan juntos:

| Paso | Quién lo hace |
|---|---|
| Traer las métricas reales de la cuenta | **MCP** |
| Decidir si el costo por resultado está bien | **Skill** (`05-presupuesto.md`) |
| Diagnosticar qué métrica falla y en qué orden | **Skill** (`06-optimizacion.md`) |
| Aplicar el cambio en la cuenta | **MCP** (previa aprobación humana) |
| Decidir si separar o consolidar la estructura | **Skill** (`10-publicos-y-exclusiones.md`) |
| Crear las campañas y conjuntos | **MCP** (nacen pausadas) |
| Crear los públicos y exclusiones | **Manual** — el MCP no puede |

---

## 8. Los 4 usos que más rinden

### 1 · Análisis de campañas con el método de las 3 Q's
Lo primero que debe preguntar es tu **ROAS objetivo** (un e-commerce típico necesita
~4×; si no lo sabes, se calcula desde el margen neto — `scripts/presupuesto.py`).
Después clasifica cada campaña en **verde** (sobre el objetivo), **amarilla** (cerca) y
**roja** (muy abajo), y aplica las 3 Q's de `06-optimizacion.md`.

**Lo más importante que debe hacer bien:** reconocer cuándo un test es **demasiado
nuevo**. Si una campaña lleva 3 días con 2 compras, el número no es concluyente —
esperar 5-7 días antes de pausar. Es la Ley 0 aplicada por la IA.

**Matiz de criterio humano:** CTR alto no significa ROAS alto. Hay anuncios con CTR bajo
y público muy calificado. La IA no debería pausar solo por CTR.

### 2 · Creación de campañas desde una estrategia
Le das el presupuesto mensual y arma la estrategia por las 4 etapas (Presentación,
Evaluación, Conversión, Ascensión) con el reparto y los creativos por etapa; luego la
ejecuta en Meta.

**Las 3 limitaciones que vas a chocar:** no crea públicos (déjalo en segmentación
abierta y configura después), no sube medios nuevos (duplica un anuncio probado tantas
veces como necesites y edita), y todo nace pausado.

### 3 · Monitoreo automático del píxel
Rutina semanal: compara los últimos 7 días contra los 7 previos y alerta si algún
evento cae **más del 20%**.

Eventos que vigilar: **Agregar al carrito · Iniciar pago · Compra · Visualizaciones de
producto · Búsquedas en el sitio**.

Una caída del 20% significa problema en las campañas, en el sitio o en el píxel mismo.
Sustituye ~30 minutos semanales de revisión manual.

### 4 · Revisión de catálogo
Analiza los productos de los últimos 90 días: cuánto gasto recibió cada uno y cuántas
compras generó. Identifica:
- **Productos subfinanciados** — buenos resultados, poco presupuesto. Merecen más.
- **Variantes ganadoras** — qué color, talla o versión vende.
- **Productos que pierden plata** — ROAS bajo, pausar.

Salida útil: 5 conjuntos de productos para testear — núcleo ganador, gemas
subfinanciadas, línea en reactivación, producto específico, y los que hay que pausar.

---

## 9. Cómo debe comportarse este skill cuando el MCP está conectado

Reglas para el asistente:

1. **Lee antes de escribir.** Consulta métricas y estructura antes de proponer cambios.
2. **Nunca ejecutes una acción de escritura sin confirmación explícita**, aunque el
   usuario haya aprobado una parecida antes. No hay deshacer.
3. **Antes de cualquier cambio de presupuesto, di el número actual y el nuevo**, y
   verifica que el salto no supere el 20% (o que el usuario acepte el reinicio de
   aprendizaje — ver `07-escalamiento.md`).
4. **No pauses nada que lleve menos de 5-7 días** ni que tenga volumen insuficiente para
   concluir. Di explícitamente "todavía no es concluyente".
5. **Usa los umbrales del skill, no los de la documentación de Meta.** Los cortes están
   en `06-optimizacion.md`.
6. **Cuando falte un dato que el MCP no puede ver** (públicos existentes, analítica web),
   pídelo en vez de asumirlo: CSV exportado o descripción del usuario.
7. **Recuerda que las campañas nacen pausadas** — al terminar, dile al usuario qué tiene
   que activar a mano.

---

## 10. Alternativas y complementos

| Vía | Cuándo conviene |
|---|---|
| **MCP + Claude** | El 95% de los casos. La ruta recomendada. |
| **MCP + ChatGPT** | Requiere Developer Mode. Créditos más económicos. |
| **MCP + Perplexity** | Mismo endpoint, configuración casi idéntica. |
| **CLI de Meta Ads** | Producto separado que Meta lanzó el mismo día, para desarrolladores avanzados. |
| **Claude Code** | Para flujos con archivos y scripts, no solo chat. |

---

## Fuentes

- Verificación directa del endpoint `https://mcp.facebook.com/ads` y sus metadatos
  OAuth (agosto 2026).
- [Cómo configurar el MCP oficial de Meta Ads — Felipe Vergara](https://felipevergara.co/blogs/meta-ads/mcp-meta-ads/)
- [Cómo conectar el MCP Meta Ads con Claude — Felipe Vergara](https://felipevergara.co/blogs/ia/mcp-meta-ads-claude/)
- Anuncio oficial de Meta: `facebook.com/business/news/meta-ads-ai-connectors`
- Centro de ayuda de Meta: `facebook.com/business/help/1456422242197840`
