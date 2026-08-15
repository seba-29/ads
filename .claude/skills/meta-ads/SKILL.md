---
name: meta-ads
description: Sistema completo de estrategia, estructura, optimización y escalamiento de Meta Ads (Facebook e Instagram Ads) basado en la metodología del Ciclo de Ventas de Felipe Vergara. Úsala SIEMPRE que haya que diseñar la estrategia de una cuenta publicitaria, estructurar campañas/conjuntos/anuncios, definir públicos y exclusiones, calcular presupuestos y CPA/ROAS objetivo, simular escenarios de campaña, investigar al cliente ideal (7 maletas, avatar, ángulos), generar hooks y creativos por nivel de consciencia, diagnosticar por qué una campaña no funciona, o escalar lo que sí funciona. Se activa con - "estrategia de Meta Ads", "estructurar campañas", "cuánto presupuesto", "CPA objetivo", "ROAS", "mi campaña no vende", "optimizar campaña", "escalar campaña", "públicos y exclusiones", "ángulos de venta", "hooks", "niveles de consciencia", "ciclo de ventas", "trafficker", "Facebook Ads", "Instagram Ads", "campaña de mensajes/WhatsApp", "clientes potenciales", "retargeting", "Advantage+", "fase de aprendizaje", "públicos personalizados", "lookalike", "a quién excluyo", "cuántos conjuntos de anuncios", "CTWA", "click to WhatsApp", "Andrómeda", "MCP de Meta", "conectar Claude a Meta Ads", "diversidad creativa", "ganchos", "copywriting", "número mágico", "CBO o ABO", "efecto desglose". También cuando el usuario comparte métricas de una campaña (CPM, CTR, frecuencia, costo por conversación) y pide interpretarlas. Incluye la actualización de la plataforma a 2026 (objetivos ODAX, Advantage+ Audience, controles vs sugerencias, ventanas de retención, fase de aprendizaje), el algoritmo Andrómeda y la diversidad creativa, el conector MCP oficial de Meta para IA, el playbook de WhatsApp para LATAM, y cuándo conviene separar o consolidar la estructura de cuenta.
---

# Meta Ads — Sistema del Ciclo de Ventas

Metodología completa para operar Meta Ads como profesional. La fuente es el curso de
Felipe Vergara; este skill la convierte en un sistema ejecutable.

**La tesis central:** no vendes con anuncios sueltos, vendes con un **ciclo**. Cada
persona está en una etapa distinta de su relación con la marca, y a cada etapa le
corresponde un presupuesto, un público, un tipo de arte y un nivel de consciencia
distinto. Un anuncio que funciona en frío fracasa en retargeting — no porque sea malo,
sino porque está en la etapa equivocada.

---

> ⚠️ **Antes de configurar nada, lee `reference/09-plataforma-2026.md`.** El curso
> enseña la estrategia (vigente) sobre una plataforma que cambió mucho. La Ley 1 de ese
> documento — *incluir es sugerir, excluir es mandar* — reescribe cómo se implementa el
> ciclo en el Administrador de Anuncios actual.

---

## Ley 0 — La impaciencia es el enemigo #1

Antes de cualquier decisión técnica, este es el filtro. La mayoría de las cuentas no
fracasan por mala segmentación: fracasan porque el operador **no deja que el algoritmo
aprenda**.

| Trafficker PROFESIONAL | Trafficker PRINCIPIANTE |
|---|---|
| Entiende la parte psicológica **y** la técnica | Toma decisiones al azar esperando ventas |
| Tiene un sistema repetible con todo tipo de clientes | Edita sus campañas cada 1-2 días |
| **Deja que el algoritmo aprenda** | Busca invertir lo menos posible por miedo a perder |
| No busca invertir menos, busca **invertir más** | Espera que sus campañas rindan bien para siempre |
| **No deja de testear** | Cree que la clave es el último "hack" o truco |

**Regla operativa que se deriva de esto:**
- **Revisa** las campañas a diario (que estén corriendo sin problemas).
- **Optimiza** cada **5-7 días**. No antes. Tocar una campaña en fase de aprendizaje la
  reinicia y quema presupuesto.

Si el usuario pide "apagar un anuncio que lleva 1 día", esta ley aplica: dilo.

---

## Cómo usar este skill

Identifica en cuál de los 10 trabajos está el usuario y ve al archivo correspondiente.
**No cargues todas las referencias**: lee solo la que aplica.

| # | El usuario quiere… | Lee |
|---|---|---|
| 1 | Diseñar/estructurar la cuenta completa | `01-ciclo-de-ventas.md` → `10-publicos-y-exclusiones.md` |
| 2 | Entender a quién le vende y con qué ángulos | `02-investigacion.md` |
| 3 | Escribir copy / decidir el mensaje | `03-niveles-consciencia.md` |
| 4 | Producir creativos, hooks, variantes | `04-creativos.md` |
| 5 | Saber cuánto invertir / si el negocio da | `05-presupuesto.md` + `scripts/` |
| 6 | Arreglar o escalar lo que ya corre | `06-optimizacion.md`, `07-escalamiento.md` |
| 7 | **Configurar públicos, exclusiones, estructura real** | `09-plataforma-2026.md` → `10-publicos-y-exclusiones.md` |
| 8 | Conectar la IA a la cuenta (MCP oficial) | `11-ia-y-mcp.md` |
| 9 | Entender el algoritmo y producir variedad creativa | `12-andromeda-y-diversidad-creativa.md` |
| 10 | **Campañas a WhatsApp / mensajes (caso LATAM)** | `13-whatsapp-latam.md` |

Referencias de apoyo: `reference/08-calendario-mkt.md` (fechas comerciales),
`prompts/` (prompts de investigación listos para usar).

**El eje 1↔7 es el que más importa.** `01` dice qué separar y por qué; `10` dice cómo
se sostiene esa separación hoy — y cuándo conviene no separar nada.

**Herramientas ejecutables** (`scripts/`, sin dependencias — solo Python 3):
- `presupuesto.py` — de meta de ventas a inversión, CPA objetivo y ROAS objetivo.
- `simulador.py` — simula resultados de campaña desde CPM/CTR/frecuencia/tasas.
- `diagnostico.py` — recibe métricas reales y dice qué está roto y qué hacer.

---

## El Ciclo de Ventas en 30 segundos

Cuatro etapas. No es un embudo que termina — es un **ciclo** que se realimenta.

| Etapa | Objetivo real | % del presupuesto |
|---|---|---|
| **Presentación** | Identificar la necesidad (problema) de mi prospecto | **60%** |
| **Evaluación** | Encontrar el producto/servicio perfecto para cada persona | **20%** |
| **Conversión** | Cerrar la venta | **10%** |
| **Ascensión** | Crear una relación con el cliente | **10%** |

El 60% va a frío **a propósito**. Sin gente entrando arriba, el retargeting se queda
sin combustible en 2-3 semanas y la cuenta se muere sola. Cuando alguien dice "voy a
poner todo en retargeting porque convierte mejor", esa es exactamente la trampa: el
retargeting tiene mejor ROAS *porque* alguien pagó la Presentación.

La matriz completa (campañas, públicos, exclusiones, ubicaciones, artes y textos por
etapa) está en `reference/01-ciclo-de-ventas.md`. **Es el documento central del skill.**

---

## Orden de trabajo canónico

Cuando el usuario llega con una cuenta nueva (o un cliente nuevo), este es el orden.
Saltarse pasos es la causa #1 de campañas que no venden.

1. **Investigación** → 7 Maletas + avatar + ángulos (`02-investigacion.md`,
   `prompts/`). Sin esto, todo lo demás es adivinanza.
2. **Números** → meta de ventas → inversión necesaria, CPA objetivo, ROAS objetivo
   (`scripts/presupuesto.py`). Si los números no dan, **el problema es la oferta, no
   los anuncios.**
3. **Oferta** → ¿se puede mejorar antes de gastar? (Gratis / Garantía / Pago fácil —
   `04-creativos.md`).
4. **Arquitectura** → calcular `(CPA × 50) ÷ 7` y decidir si se separan las 4 etapas o
   se consolidan (`10-publicos-y-exclusiones.md` §4). **Este paso decide todo lo que
   sigue** y no existía en el material original.
5. **Públicos y exclusiones** → crear los 6 públicos base y montar la cascada
   (`10-publicos-y-exclusiones.md`).
6. **Creativos** → matriz de diversificación: deseos × perfiles × niveles de
   consciencia, y el tipo de arte por etapa (`04-creativos.md`).
7. **Lanzar y esperar** → optimizar cada 5-7 días, nunca antes (Ley 0).
8. **Optimizar** → las 3 Q's (`06-optimizacion.md`).
9. **Escalar** → vertical y horizontal (`07-escalamiento.md`).

---

## Reglas de respuesta (aplican siempre)

1. **Responde en español.** Es el idioma del sistema y del usuario.
2. **Nunca inventes benchmarks.** Los umbrales de este skill (CTR < 2%, frecuencia
   > 3-5, retención 3s < 20-25%, etc.) vienen del curso y están en
   `reference/06-optimizacion.md`. Si te preguntan algo fuera de eso, di que no está
   en la metodología y ofrece el criterio, no un número inventado.
3. **Diagnostica antes de recetar.** Si el usuario dice "mi campaña no funciona", no
   listes 10 consejos: pide las métricas de las 3 Q's y usa el árbol de diagnóstico.
   `scripts/diagnostico.py` hace esto de forma determinista.
4. **Ubica siempre la etapa del ciclo.** Antes de opinar sobre un público, un arte o
   un texto, define en qué etapa está. La misma pregunta tiene respuestas opuestas en
   Presentación y en Conversión.
5. **Exclusiones no son opcionales — son el mecanismo.** Toda etapa excluye a las
   posteriores. Con Advantage+ Audience, las inclusiones son sugerencias y las
   exclusiones son la única palanca dura: sin ellas el ciclo no existe, solo lo
   parece. Ver `09` (Ley 1) y `10`.
6. **Nunca recomiendes separar 4 etapas sin verificar el presupuesto.** Si la inversión
   diaria no cubre `(CPA × 50) ÷ 7` por conjunto, separar empeora los resultados.
   Consolidar no es rendirse: es la forma correcta con presupuesto chico.
7. **Distingue lo que caducó de lo que no.** La estrategia del curso (ciclo, niveles,
   artes, 3 Q's) sigue vigente. La configuración (nombres de objetivos, separación por
   inclusión, exclusiones de intereses) cambió. Al citar el curso, aclara cuál de las
   dos estás usando.
8. **Si falta información del negocio, pregunta.** Ticket promedio, margen y meta de
   ventas son obligatorios para cualquier recomendación de presupuesto. No los asumas.

---

## Relación con otras skills

Este skill es el **cerebro estratégico y de compra de medios**. Si en el entorno existe
una skill de **producción de anuncios** (generación de imágenes/video), este skill
define *qué* producir (etapa, nivel de consciencia, tipo de arte, hook) y esa skill lo
*renderiza*. No dupliques: aquí se decide la estrategia, allá se ejecuta la pieza.
