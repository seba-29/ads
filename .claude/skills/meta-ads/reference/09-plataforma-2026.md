# 09 — La plataforma en 2026: qué cambió y qué significa

El curso enseña la **estrategia**, y la estrategia sigue siendo correcta. Pero la
**plataforma** cambió mucho desde que se grabó el material, y algunas configuraciones
que el curso da por sentadas hoy no funcionan como antes — o directamente ya no
existen.

Este documento es el puente. Léelo antes de tocar el Administrador de Anuncios.

> **Investigado en agosto de 2026.** Meta cambia rápido: verifica siempre en la
> interfaz antes de dar por buena una configuración. Fuentes al final.

---

## LEY 1 — Controles vs. sugerencias

**El cambio más importante de todos, y el que casi nadie interiorizó.**

Con Advantage+ Audience activado (que es el default desde 2026), tus entradas de
segmentación se dividen en dos categorías que se comportan de forma **completamente
distinta**:

### 🔒 CONTROLES — Meta los obedece siempre

| Control | Nota |
|---|---|
| **Ubicación** | Países, regiones. Se respeta al pie de la letra. |
| **Exclusiones de públicos personalizados** | **Se respetan siempre.** Es tu única palanca dura sobre quién NO ve el anuncio. |
| **Edad mínima** | Solo hasta 25 años como tope duro. |
| **Idiomas** | |
| **Categoría especial de anuncios** | Vivienda, empleo, crédito, política, temas sociales. Restringe segmentación por ley. |

### 💡 SUGERENCIAS — Meta las ignora si le conviene

| Sugerencia | Qué pasa realmente |
|---|---|
| **Intereses / segmentación detallada** | Punto de partida, no un filtro. Meta sale de ahí si encuentra conversiones fuera. |
| **Públicos similares (lookalikes)** | Ya no acotan la entrega. Son una semilla. |
| **Públicos personalizados como INCLUSIÓN** | ⚠️ Sugerencia. Incluir "visitantes del sitio" **no garantiza** que solo ellos vean el anuncio. |
| **Edad (por encima de 25) y género** | Sugerencias. |

> **La frase que hay que grabarse:** *incluir es sugerir, excluir es mandar.*

**Qué implica esto para el Ciclo de Ventas:** el curso separa las 4 etapas por
**inclusión** (intereses → interacción → intención → compradores). Hoy eso, por sí
solo, **no separa nada**. Meta puede mostrar tu anuncio de Presentación a un comprador
y tu anuncio de Ascensión a alguien que nunca te vio.

La separación real solo se sostiene con **exclusiones**. Ver
`10-publicos-y-exclusiones.md` — ahí está la arquitectura completa.

---

## Los 6 objetivos actuales (ODAX)

Los objetivos que nombra el curso (Conversiones, Tráfico o Mensajes, Generación de
Clientes Potenciales, Visitas al Negocio, Alcance, Ventas del Catálogo) son de la
nomenclatura vieja. Hoy son **6**:

| Objetivo actual | Equivale en el curso a | Etapa típica |
|---|---|---|
| **Reconocimiento** | Alcance / Reconocimiento de marca | Presentación |
| **Tráfico** | Tráfico | Presentación / Evaluación |
| **Interacción** | Interacción · **Mensajes** · Reproducciones de video | Todas (Mensajes vive aquí) |
| **Clientes potenciales** | Generación de Clientes Potenciales | Presentación → Conversión |
| **Promoción de la app** | App Installs | — |
| **Ventas** | Conversiones · **Ventas del Catálogo** | Conversión / Ascensión |

**Nota para LATAM:** las campañas de **Mensajes / Click-to-WhatsApp** viven dentro del
objetivo **Interacción**, optimizando por *Conversaciones*. No busques un objetivo
"Mensajes" separado: ya no existe como tal.

**Ventas del Catálogo** tampoco es un objetivo aparte: es el objetivo **Ventas** con un
catálogo conectado (retargeting dinámico). La fila de Conversión de la matriz maestra
sigue siendo válida, solo cambió dónde se configura.

En **febrero de 2026** Meta fusionó los flujos "Manual" y "Advantage+" en una sola
creación de campaña. Las optimizaciones de IA (público, ubicaciones, presupuesto,
creativo) vienen **activadas por defecto** y se pueden desactivar una por una.

---

## Advantage+

| Función | Qué hace | Recomendación |
|---|---|---|
| **Advantage+ Audience** | Convierte tu segmentación en sugerencias | Déjalo. Pelear contra él rara vez gana. |
| **Ubicaciones Advantage+** | Reparte entre todas las ubicaciones | Déjalo — coincide con "Automáticas" del curso. |
| **Presupuesto Advantage+ (CBO)** | Reparte entre conjuntos de la campaña | Útil con varios conjuntos; con uno solo da igual. |
| **Creativo Advantage+** | Retoca automáticamente el creativo | **Cuidado**: puede recortar texto o alterar el arte. Revisa las vistas previas. |
| **Advantage+ Sales** | Antes "Advantage+ Shopping" | Reportado: +32% ROAS y −17% CPA vs. manual. |
| **Advantage+ Leads** | Advantage+ para clientes potenciales | Nuevo. Reportado ~−10% costo por lead. |

---

## Lo que se eliminó o quedó obsoleto

| Cambio | Cuándo | Impacto en el curso |
|---|---|---|
| **Exclusiones de segmentación detallada** (excluir intereses) | Jul 2024, aplicado 2025 | Ya no puedes excluir por interés. Solo por público personalizado. |
| **Tope de presupuesto para clientes existentes** | Feb 2025 | Se controla con exclusiones, no con topes. |
| Objetivos legacy (11 → 6) | Progresivo | Ver tabla de arriba. |
| Recomendación de "máximo 6 anuncios" | Retirada de la documentación | Hoy se testean **15-50 anuncios por conjunto**. Tu matriz de 30 hooks encaja perfecto. |
| Públicos de compra: 180 → **730 días** | **18 mayo 2026** | ⚠️ Ver la "trampa de exclusión" en `10-publicos-y-exclusiones.md`. |

**El cambio de los 30 anuncios merece atención.** El curso sugiere 3-5 anuncios por
conjunto. Hoy la plataforma tolera y premia mucho más volumen creativo: la matriz de
diversificación (30 hooks) deja de ser "un banco de ideas para ir rotando" y pasa a ser
**munición para cargar de una sola vez**.

---

## Fase de aprendizaje — el número que manda

**Un conjunto de anuncios necesita ~50 eventos de optimización en 7 días** para salir
de la fase de aprendizaje. Por debajo de eso queda en "aprendizaje limitado" y el costo
por resultado nunca se estabiliza.

De ahí sale la fórmula más útil de toda la operación:

```
Presupuesto diario mínimo por conjunto = (CPA objetivo × 50) ÷ 7
```

Con CPA objetivo de $8 → **$57/día por conjunto**. Si quieres correr las 4 etapas
separadas, necesitas ~$228/día. Ese número decide toda tu arquitectura de cuenta
(ver `10-publicos-y-exclusiones.md` §4).

`scripts/presupuesto.py` lo calcula solo.

**Qué reinicia el aprendizaje:**
- Cambios de presupuesto **> 20%**
- Cambios de segmentación
- Cambios de estrategia de puja u optimización

El costo del reinicio es real: se ha medido un **+35-60% de CPA durante 48-72 horas**.
Esto refuerza la Ley 0 del curso — la impaciencia es cara, y ahora sabemos cuánto.

---

## Atribución y medición

- **Ventanas de atribución** se acortaron. El default habitual hoy es **7 días clic /
  1 día visualización**.
- **Atribución por visualización con interacción** es estándar, con el umbral bajado
  de 10 a **5 segundos**.
- **API de Conversiones (CAPI)** dejó de ser opcional. Sin señal de servidor, pierdes
  eventos y el algoritmo optimiza a ciegas.
- El **ROAS reportado del retargeting infla el impacto real**: se estima que el efecto
  incremental es solo el **20-40%** de lo que muestra el panel. Traducción: el
  retargeting no es tan mágico como parece — es en buena parte gente que ya iba a
  comprar. Otra razón más para no mover el 60% de Presentación al retargeting.

### Click-to-WhatsApp — la trampa de atribución de LATAM

**9 de cada 10 anunciantes pierden la atribución de CTWA** porque no capturan el
`ctwa_clid` que Meta inyecta en el webhook ni disparan el evento correcto de la API de
Conversiones.

Si operas WhatsApp: sin `ctwa_clid` + CAPI, Meta nunca sabe qué conversación terminó en
venta, y por lo tanto **no puede optimizar hacia compradores** — solo hacia gente que
escribe. Ese es el motivo #1 por el que una campaña de mensajes trae mucho volumen de
baja calidad.

---

## Qué del curso sigue intacto

No todo cambió. Esto sigue siendo cierto y es lo que más importa:

- ✅ **El Ciclo de Ventas como arquitectura de mensaje.** Las 4 etapas y los 5 niveles
  de consciencia son psicología del comprador, no configuración de plataforma. No
  caducan.
- ✅ **Los 5 niveles de consciencia.** Más vigentes que nunca: con 15-50 anuncios por
  conjunto, necesitas un sistema para generar variedad con criterio.
- ✅ **Las 3 Q's y los umbrales de diagnóstico.** CTR < 2%, retención 3s < 20-25%,
  frecuencia > 3-5. Siguen siendo los cortes correctos.
- ✅ **La investigación (7 maletas, golden nuggets, ángulos).** El algoritmo se comió la
  segmentación, no el mensaje. Hoy el creativo **es** la segmentación: el anuncio
  decide a quién le habla.
- ✅ **Optimizar cada 5-7 días.** Ahora con respaldo numérico: los 50 eventos se miden
  en ventana de 7 días.
- ✅ **Las exclusiones.** Pasaron de ser una buena práctica a ser **la única palanca
  dura que te queda**.

**El resumen honesto:** el curso te da la cabeza y hoy la plataforma te quitó las
manos. Meta decide la entrega; tú decides el mensaje, el dinero y a quién bloqueas.
Justo por eso la parte estratégica del curso vale *más* que antes, no menos.

---

## Fuentes

- [A Guide to Meta Ads Targeting in 2026 — Jon Loomer](https://www.jonloomer.com/meta-ads-targeting-2026/)
- [How I Actually Approach Targeting in 2026 — Jon Loomer](https://pubcast.jonloomer.com/how-i-actually-approach-targeting-in-2026/)
- [Every Meta Ads Change in 2025-2026: The Complete Changelog](https://www.dataslayer.ai/blog/meta-ads-changes-2025-83-updates-that-changed-facebook-advertising-forever)
- [Meta Campaign Objectives: All 6 ODAX Goals (2026)](https://influee.co/blog/meta-campaign-objectives)
- [Meta Advantage+ Audience vs Detailed Targeting: 2026 Guide](https://www.conversios.io/blog/meta-advantage-audience-vs-detailed-targeting-2026-guide/)
- [Meta Ads Learning Phase — Complete 2026 Guide](https://growwithsakib.com/meta-ads-learning-phase/)
- [Meta 730-Day Custom Audiences: The Retargeting Exclusion Trap](https://davidtamachi.ca/blog-meta-730-day-custom-audience-expansion)
- [Meta Ads Benchmarks by Funnel Stage (2026)](https://www.adamigo.ai/blog/meta-ads-benchmarks-2026-funnel-prospecting-retargeting-retention)
- [Click-to-WhatsApp Ads (CTWA): guía 2026](https://asisteclick.com/en/blog/click-to-whatsapp-ads-ctwa-conversion-2026/)
- [Meta Ads Account Structure 2026](https://adlibrary.com/posts/meta-campaign-structure)
