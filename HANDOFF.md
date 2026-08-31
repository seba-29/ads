# Traspaso · 31 de agosto de 2026

> **Para qué sirve este archivo.** Se escribió al cerrar la sesión en que se montó el
> ciclo de reportes y se hizo el primer análisis con datos reales. Está pensado para
> leerse al abrir una **sesión nueva con los dos repos conectados** —`seba-29/ads` y
> `HEAT-IA/heat-ads`— porque ahí es donde sigue el trabajo.
>
> Lo que está acá es contexto que ya se verificó. Lo que falta está marcado como falta.

> **Nota de ramas.** El trabajo vivía en `claude/hola-como-estas-1gc1yt`, un nombre que
> generó el sistema al crear la sesión. El 31-ago se creó **`main`** con toda la historia
> (49 commits, desde la primera versión de la skill `meta-ads`). **`main` es la rama de
> trabajo de ahora en adelante.**

---

## 1. Por qué hacen falta los dos repos

| Repo | Qué aporta |
|---|---|
| **`seba-29/ads`** | La metodología: skills, fichas de clientes, reportes. Este repo. |
| **`HEAT-IA/heat-ads`** | El panel `ads.heat.cl`, que cruza Meta con las etapas del CRM. **Es la fuente de verdad del análisis.** |

**El trabajo pendiente en `heat-ads`:** exponer un endpoint de solo lectura para que el
análisis deje de depender de pantallazos. Ver §6.

> ⚠️ `add_repo` **no** puede sumar un repo de otro dueño a una sesión ya iniciada
> (`cross-tier adds are not supported in v1`). Los dos se seleccionan **al crear la
> sesión**, desde la interfaz. No es un problema de permisos de GitHub.

---

## 2. Estado de la cartera al 31-ago (verificado en vivo)

Las fichas de `clientes/` traían estado del 20-ago y **estaban desactualizadas**. Esto se
verificó contra el conector de Meta:

| Cliente | Cuenta | Estado real |
|---|---|---|
| CLÍNICA PALAVAS | `65286325` | ✅ Activa — **la única con análisis completo hecho** |
| PLAYMAKER | `231866284693734` | ✅ **ACTIVE con método de pago** — el saldo impago del 20-ago está resuelto. Falta ver qué corre |
| ESPACIO FUSIÓN | `366677430643171` | ✅ **Identificada**: es la cuenta «Soypatinaza». Antes no aparecía |
| RAÍCES FUTURAS | `26933616669645555` | 🔴 UNSETTLED, no consultable |
| ASISTENCIA LEGAL | `755647789856028` | ✅ Activa — sin leer |
| CASA ZEN | `2252556455581103` | ✅ Activa — sin leer |
| BE FASHION | `27527316` | ✅ Activa — sin leer |
| DRA. VANESSA SILVA | `1321852590109746` | ✅ Activa — sin leer |
| CLÍNICA ONDEX | `1034674525430396` | ✅ Activa — sin leer |

Archivo de trabajo: **`clientes/_cartera-ventana.json`**. Se corre con:

```bash
python3 .claude/skills/reportes-y-optimizacion/scripts/semaforo.py clientes/_cartera-ventana.json
```

### El bloqueo estructural
**Ningún cliente tiene ticket promedio ni margen cargado.** Sin eso no hay CPA objetivo y
toda lectura sale marcada como *provisional*: se describe lo que pasó, no se dictamina si
está bien. Es el dato que más desbloquea y el más barato de conseguir.

---

## 3. Clínica Palavas — el caso completo

Cuenta `65286325` · campaña `ANIV26 - Clientes Potenciales` · creada 25-ago.

**Correcciones a la ficha que salieron de la lectura en vivo:**
- Palavas **no corre WhatsApp**. Las ~50 campañas de mensajes/ventas están todas en $0.
- El CPA de referencia de **$839 no aplica**: era por *conversación de WhatsApp*. Hoy es
  formulario nativo. **No son comparables** — confundirlos daría «el costo se duplicó».

### Los números al 31-ago (panel `ads.heat.cl`, cruzado con CRM)

| Servicio y zona | Leads | Inversión | **Ventas** | **$/venta** | Cierre |
|---|---|---|---|---|---|
| **Cosmetología** · Stgo Oriente | 70 | $81.081 | **11** | **$7.371** | 15,7% |
| Depilación Láser · Chillán | 74 | $157.575 | 4 | $39.394 | 5,4% |
| Depilación Láser · Las Condes | 80 | $136.146 | **1** | **$136.146** | 1,2% |
| Inyectables | 6 | $35.411 | 0 | — | 0% |
| Harmony | 5 | $3.337 | 0 | — | 0% |
| **TOTAL** | **235** | **$413.550** | **16** | **$25.847** | 6,8% |

**Embudo:** 16 pago realizado · 17 agendado · 1 link enviado · 48 calificado
= **82 de 235 (35%) en etapas positivas**.

### Los tres hallazgos
1. **Cosmetología: 20% del gasto → 69% de las ventas.** Con **un solo anuncio**, sin
   variantes probadas. Es la oportunidad más clara de la cuenta.
2. **Depilación láser: 71% del gasto → 31% de las ventas.**
3. **El costo por lead engañaba.** Las Condes tenía *mejor* CPL que Chillán ($1.702 vs
   $2.129) y es **3,5× peor por venta**. Contra cosmetología la diferencia real es de
   **18×**, invisible en el panel de Meta. De sus 80 leads solo 6 llegan a etapa positiva:
   el problema **no es la publicidad, es lo que pasa después** (precio, oferta u horas).

### Configuración (verificada al 30-ago)
- **ABO**, $75.000/día total: Chillán $30.000 · Santiago $25.000 · Estética $20.000.
  El presupuesto está **al revés del rendimiento**.
- Mínimo de aprendizaje por conjunto $12.352/día — los tres por encima.
- Los tres conjuntos: **mujeres 18-65, Advantage+ Audience desactivado**.
- **66% de los leads son mujeres de 45+**, y son las más baratas.
- **Instagram convierte el formulario al 28%, Facebook al 13,1%**, con CPL casi idéntico.
- **11,3% del gasto se fue en hombres** por expansión automática, con rendimiento normal.
  *(Vale preguntar si la clínica atiende hombres: 13 de esos leads son hombres de 65+.)*

### Entregables
- Reporte interno: `clientes/clinica-palavas/reporte-2026-08-31.md`
- Artefacto para el cliente: https://claude.ai/code/artifact/75fc3bf2-f1a5-4975-b858-fb8c8a05a6f7

---

## 4. La skill nueva: `reportes-y-optimizacion`

Vive en `.claude/skills/reportes-y-optimizacion/`. Complementa a `meta-ads`: aquella da el
criterio para diagnosticar **una** campaña, esta da el ciclo sobre **toda la cartera**.

Las tres ideas que la sostienen:

1. **Un número sin objetivo es trivia.** Sin ticket ni margen, la lectura es provisional y
   se dice; no se sustituye el objetivo por un benchmark disfrazado de meta.
2. **Un número sin muestra suficiente es ruido con decimales.** El error relativo escala
   como `1/√n`: con 15 resultados ronda ±26%. `scripts/semaforo.py` calcula la banda y
   **se niega a dar veredicto dentro de ella**.
3. **Si la atribución está rota, es el titular del reporte, no una nota al pie.**

Y la regla que salió del cruce con el CRM (`reference/02` §3b):

> Con el cruce publicidad↔CRM disponible, **el costo por lead deja de ser el veredicto y
> pasa a ser métrica de proceso. El veredicto es el costo por venta.**

`reference/05` §4b tiene qué sale del reporte interno al pasarlo al cliente y la tabla de
traducción de unidades. Se escribió después de que Seba revisara la primera versión.

---

## 5. WhatsApp masivo — **pendiente, y es lo primero**

Se hicieron **disparos masivos por WhatsApp API a depilación láser Las Condes** — el mismo
segmento del que el reporte dice «80 interesados, 1 venta». **Esta semana van 1.000 envíos
más**, sobre aniversario y el mismo segmento.

### Por qué bloquea el reporte
Si contactos del disparo entraron al mismo pipeline, el $136.146 por venta puede estar
**subestimado** (ventas del anuncio atribuidas al disparo) o **contaminado** (etapas de
contactos que nunca vinieron de Meta).

**La pregunta que lo resuelve:** ¿el panel atribuye las etapas solo a contactos cuyo origen
es ese anuncio, o a cualquier contacto que coincida? **Se responde leyendo `heat-ads`.**
Hasta saberlo, ese número no debería ir al cliente.

### Qué analizar con el PIT de la subcuenta
Seba ofreció el token. Con él:
- **La superposición:** cuántos de los 16 pagos y las 48 calificadas traen etiqueta del
  disparo vs. etiqueta de Meta. **Esto decide si el reporte está bien.**
- El embudo del disparo por separado: enviados → entregados → respondidos → calificados →
  agendados → pagados.
- Tasa de respuesta del disparo vs. la del lead pagado.
- Bajas y bloqueos, si se registran.

### Dos advertencias ya dadas, sin respuesta todavía
1. Las Condes láser es **el peor convertidor de la campaña**. Si la causa es precio, oferta
   o disponibilidad de horas, **1.000 mensajes más al mismo público no lo arreglan.**
2. Los envíos masivos de plantillas a listas sin opt-in reciente generan bloqueos y
   reportes, y eso **baja la calificación de calidad del número**. Si cae, WhatsApp limita
   el volumen y en el peor caso restringe la línea — la misma por la que entra toda la
   atención de la clínica. Conviene revisar en qué calificación está antes de disparar, y
   partir el envío en tandas.

---

## 6. El endpoint que hay que construir en `heat-ads`

El panel ya hace la parte difícil: el cruce Meta↔CRM por campaña, conjunto y anuncio. Falta
exponerlo para que el análisis no dependa de pantallazos.

```
GET https://ads.heat.cl/api/reporte?cuenta=65286325&desde=2026-08-25&hasta=2026-08-31
Authorization: Bearer <token de solo lectura>
```

Debe devolver, por fila (campaña → conjunto → anuncio):
`gasto · resultados · costo_por_resultado · impresiones · ctr` **y** los conteos por etapa
del pipeline (`calificado`, `agendado`, `link_enviado`, `pago_realizado`).

**Criterios:**
- Token de **solo lectura**, acotado al reporte.
- **Sin datos personales**: bastan los conteos por etapa, no los nombres.
- Documentar si las etapas son **actuales o acumuladas** — cambia si se suman o no.
  *(El análisis actual asume actuales, según cómo lo describió Seba.)*

---

## 7. Pendientes, en orden

1. **WhatsApp masivo** — el análisis del PIT y las dos advertencias, antes de los 1.000 envíos.
2. **Resolver la atribución** del panel leyendo `heat-ads`, antes de que el reporte salga.
3. **Ticket promedio y margen** de Palavas. Con 16 ventas a $25.847 la pregunta ya es concreta.
4. **Las 5 acciones de Palavas** están definidas y **no ejecutadas** (ver el reporte interno).
5. **Playmaker** — se destrabó, nadie ha mirado qué corre.
6. **Espacio Fusión** — cuenta identificada, nunca leída.
7. **El endpoint** de §6.
8. **Los otros 5 clientes** activos, sin leer.

### Ondex, de sesiones anteriores
- Falta conectar el apex `clinicaondex.cl` a Netlify (registro A) y probar el correo.
- **`gclid` no se guarda en GHL** → bloquea la atribución de Google, no la de Meta.
- Faltan ticket, margen, presupuesto mensual y capacidad semanal de agenda.

---

## 8. Credenciales

**Nunca se escriben en archivos del repo.** Los tokens (PIT de GoHighLevel, tokens del
panel) se usan solo como variable de entorno dentro de la sesión.

En los `.env.example` de las landings de Ondex está la advertencia que aplica igual acá:
todo lo que empieza con `VITE_` queda visible en el navegador; una API key privada nunca va
ahí.
