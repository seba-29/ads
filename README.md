# Meta Ads — Sistema del Ciclo de Ventas

Skill de Claude Code que encapsula la metodología de Meta Ads del curso de **Felipe
Vergara**, convertida en un sistema ejecutable: estrategia, estructura de cuenta,
investigación, creativos, presupuesto, optimización y escalamiento.

## Qué hay aquí

```
.claude/skills/meta-ads/
├── SKILL.md                        Manual operativo y router
├── reference/
│   ├── 01-ciclo-de-ventas.md       ← documento central: la matriz maestra
│   ├── 02-investigacion.md         7 Maletas · 10 herramientas · golden nuggets
│   ├── 03-niveles-consciencia.md   Los 5 niveles y a qué etapa corresponde cada uno
│   ├── 04-creativos.md             10 tipos de artes · matriz 30 hooks · oferta · sesgos
│   ├── 05-presupuesto.md           CPA objetivo, ROAS objetivo, simulador
│   ├── 06-optimizacion.md          Las 3 Q's y el árbol de diagnóstico
│   ├── 07-escalamiento.md          Vertical/horizontal · Número Mágico · fatiga
│   └── 08-calendario-mkt.md        Fechas comerciales para campañas especiales
├── prompts/
│   ├── investigacion-basica.md     Perfil psicológico del cliente ideal
│   ├── investigacion-avanzada.md   Deep research: competencia + 5 ángulos + 25 hooks
│   ├── analisis-resenas.md         Golden nuggets de reseñas reales
│   └── diversificacion-creativa.md Matriz de 30 hooks (3 deseos × 2 perfiles × 5 niveles)
└── scripts/
    ├── presupuesto.py              Meta de ventas → inversión, CPA y ROAS objetivo
    ├── simulador.py                Simula resultados desde CPM/CTR/frecuencia/tasas
    └── diagnostico.py              Métricas reales → qué está roto y qué hacer

curso/
├── material-original/              Los 20 archivos del curso, tal cual
└── skill-produccion-anuncios/      Skill de generación de imágenes (sin node_modules)
```

## Cómo se usa

La skill se activa sola cuando la conversación toca Meta Ads. También se puede invocar
por nombre: `/meta-ads`.

Las herramientas corren directo, sin instalar nada (solo Python 3):

```bash
# ¿Cuánto tengo que invertir para vender $20.000 con ticket $50 y 16% de margen?
python3 .claude/skills/meta-ads/scripts/presupuesto.py --meta 20000 --ticket 50 --margen 16

# ¿Qué resultados salen con $1.000 en una campaña de mensajes?
python3 .claude/skills/meta-ads/scripts/simulador.py conversaciones --gasto 1000

# Mi campaña va mal, ¿qué arreglo primero?
python3 .claude/skills/meta-ads/scripts/diagnostico.py \
  --dias-desde-edicion 7 --retencion3s 18 --ctr 1.4 --frecuencia 2.1 \
  --tiempo-video 4 --tasa-conversion 55 --costo-resultado 12 --costo-objetivo 6.75
```

## Las tres ideas que sostienen todo

**1. El Ciclo de Ventas.** Cuatro etapas con presupuesto fijo: Presentación (60%),
Evaluación (20%), Conversión (10%), Ascensión (10%). Cada etapa tiene su público, su
exclusión, su tipo de arte y su nivel de consciencia. Es un ciclo, no un embudo.

**2. La impaciencia es el enemigo #1.** Revisa a diario, optimiza **cada 5-7 días**.
La diferencia entre un trafficker profesional y uno principiante no es el conocimiento
técnico: es dejar que el algoritmo aprenda.

**3. Diagnostica antes de recetar.** Las 3 Q's: ¿qué pasó? (métricas principales),
¿por qué pasó? (métricas secundarias), ¿qué haremos? (la acción que se deriva). Nunca
saltes de la 1 a la 3.

## Verificación

Los scripts reproducen exactamente los números de las hojas de cálculo del curso:

| Caso | Fuente | Script |
|---|---|---|
| Meta $20.000 · ticket $50 · 16% | 400 ventas · CPA $8 · inversión $3.200 · ROAS 6,25 | ✅ idéntico |
| Meta $400.000 · ticket $10.000 · 0,75% · conv. 9% | CPA $75 · CPL $6,75 · inversión $3.000 | ✅ idéntico |
| Simulador conversaciones (defaults) | 2.000 conversaciones · $0,50 c/u | ✅ idéntico |
| Simulador compras (defaults) | 56 compras · $17,86 · ROAS 5,6 | ✅ idéntico |

Única desviación deliberada: en el modelo *leads-web*, la hoja original calcula los
leads sobre los **clics salientes**; el script los calcula sobre las **visitas a la
landing** (consistente con el modelo de compras). El comportamiento original se
reproduce con `--legacy`.

---

Metodología: Felipe Vergara. Este repositorio es una sistematización del material del
curso para uso propio.
