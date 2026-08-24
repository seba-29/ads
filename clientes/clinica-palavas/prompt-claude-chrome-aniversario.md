# Prompt maestro · Claude in Chrome — Aniversario Palavas

> Copiar todo lo que sigue y pegarlo en Claude in Chrome con la sesión de Meta
> Business Manager ya abierta.

---

Eres un trafficker senior. Vas a montar la estructura de campañas del Aniversario de
Clínica Palavas en el Administrador de Anuncios de Meta.

## Contexto de la cuenta

- **Cuenta publicitaria:** `65286325` (CLP)
- **Business Manager:** Palavasdepilacionlaser
- **Negocio:** clínica de depilación láser y estética. 3 sucursales: Chillán,
  Las Condes, Chicureo.
- **Destino de las campañas:** WhatsApp. El número ya está conectado.
- **Dato de referencia:** el costo por conversación histórico de esta cuenta es
  **$839 CLP**. Sirve para que sepas si algo se ve raro, no para configurar nada.

## REGLAS DURAS — no las rompas

1. **TODO queda PAUSADO.** No actives ninguna campaña, conjunto ni anuncio.
2. **NO crees anuncios.** Los conjuntos quedan vacíos a propósito: el equipo sube
   los videos después.
3. **NO ingreses ni modifiques datos de pago.**
4. **NO aceptes ninguna recomendación automática de Meta.** Si aparece un panel de
   sugerencias, ciérralo sin aplicar.
5. **NO toques las ~50 campañas que ya existen en la cuenta.** Están pausadas y así
   se quedan. Solo creas lo nuevo.
6. Si algo no se puede configurar como se pide, **NO improvises**: déjalo como esté,
   anótalo y sigue. Al final reportas todo lo que quedó distinto.
7. Después de guardar cada conjunto, **vuelve a abrirlo y verifica** que el
   presupuesto y la geografía quedaron como se pidió. Meta a veces redondea o
   descarta valores al publicar.

## Convención de nombres

Respétala exactamente. La cuenta está desordenada y esto es lo que va a permitir
distinguir lo nuevo.

```
Campañas:  ANIV26 · [TIPO]
Conjuntos: ANIV26 · [CATEGORÍA] · [SUCURSAL] · [DESTINO]
```

---

# CAMPAÑA 1 de 3

**Nombre:** `ANIV26 · FRÍO · Mensajes`

| Configuración | Valor |
|---|---|
| Objetivo | **Interacción** |
| Tipo | Campaña manual de interacción |
| Presupuesto | **A nivel de conjunto (ABO)** — NO CBO |
| Funcionalidades adicionales que ofrezca Meta | **APAGADAS** |
| Prueba A/B | NO |
| Estado | **PAUSADA** |

### Configuración que se repite en los 4 conjuntos de esta campaña

```
Destino:                        Aplicación de mensajes → WhatsApp
Página de Facebook:             la de Clínica Palavas
Objetivo de rendimiento:        Maximizar el número de conversaciones
Presupuesto:                    DIARIO
Fecha de inicio:                24 de agosto 2026
Fecha de finalización:          6 de septiembre 2026, 23:59
Edad:                           18 — sin límite superior (65+)
Sexo:                           Todos
Ubicaciones:                    Advantage ACTIVADO (automáticas)
Público personalizado Advantage: ACTIVADO
Exclusión:                      público "EXCL · Clientes activos"
```

> **Sobre la exclusión:** el equipo va a crear ese público. Si al momento de montar
> no existe todavía, deja el conjunto sin exclusión y **anótalo en el reporte final**.
> No inventes otro público en su lugar.

> **Sexo en "Todos" es intencional.** Los hombres son 20-25% de la venta. No lo
> cambies a mujeres aunque Meta lo sugiera.

### Conjunto 1 — `ANIV26 · DEPILACIÓN · Chillán · WhatsApp`
- **Presupuesto diario: $8.000 CLP**
- **Ubicación:** Chillán, Chile — **radio de +30 km**
- Tipo de ubicación: **Personas que viven en este lugar** (no "que estuvieron aquí")

### Conjunto 2 — `ANIV26 · DEPILACIÓN · Santiago · WhatsApp`
- **Presupuesto diario: $14.000 CLP**
- **Ubicación:** agregar estas comunas de Santiago, Chile, una por una:
  `Las Condes` · `Vitacura` · `Lo Barnechea` · `Providencia` · `Ñuñoa` · `La Reina`
- Sin radio adicional — comunas exactas
- Tipo de ubicación: **Personas que viven en este lugar**

### Conjunto 3 — `ANIV26 · INYECTABLES+HARMONY · Santiago · WhatsApp`
- **Presupuesto diario: $10.000 CLP**
- **Ubicación:** las 6 comunas del Conjunto 2, **más** `Colina` (por Chicureo)
- Tipo de ubicación: **Personas que viven en este lugar**

### Conjunto 4 — `ANIV26 · COSMETOLOGÍA · Chillán+Santiago · WhatsApp`
- **Presupuesto diario: $6.000 CLP**
- **Ubicación:** Chillán +30 km **y** las 6 comunas del Conjunto 2, todo en el mismo
  conjunto
- Tipo de ubicación: **Personas que viven en este lugar**

**Suma de la Campaña 1: $38.000/día.** Verifícalo al terminar.

---

# CAMPAÑA 2 de 3

**Nombre:** `ANIV26 · FRÍO · Formulario`

Esta campaña existe porque una campaña solo admite un objetivo. Es el brazo de
formulario de una prueba A/B contra el Conjunto 1 de la Campaña 1.

| Configuración | Valor |
|---|---|
| Objetivo | **Clientes potenciales** |
| Destino | **Formulario instantáneo** |
| Presupuesto | A nivel de conjunto (ABO) |
| Estado | **PAUSADA** |

### Conjunto único — `ANIV26 · DEPILACIÓN · Chillán · Formulario`

```
Presupuesto diario:             $8.000 CLP
Ubicación:                      Chillán, Chile — radio +30 km
Tipo de ubicación:              Personas que viven en este lugar
Fechas:                         24 ago 2026 → 6 sep 2026 23:59
Edad:                           18 — sin límite superior
Sexo:                           Todos
Ubicaciones:                    Advantage ACTIVADO
Objetivo de rendimiento:        Clientes potenciales
Formulario:                     "ANIV26 · Chillán · Depilación"
Exclusión:                      público "EXCL · Clientes activos"
```

> **El formulario lo crea el equipo, no tú.** Si ya existe en la biblioteca,
> selecciónalo. Si no existe, **deja el conjunto guardado sin formulario asignado** y
> anótalo. No crees un formulario nuevo ni elijas otro.

**⚠️ Crítico para que la prueba A/B sirva:** este conjunto y el Conjunto 1 de la
Campaña 1 deben tener **la misma geografía, el mismo presupuesto y la misma edad/sexo**.
Lo único que puede diferir es el destino. Verifícalo antes de cerrar.

---

# CAMPAÑA 3 de 3

**Nombre:** `ANIV26 · RETARGETING · Mensajes`

| Configuración | Valor |
|---|---|
| Objetivo | **Interacción** |
| Destino | Aplicación de mensajes → WhatsApp |
| Presupuesto | **A nivel de CAMPAÑA (CBO)** ← distinto de las otras dos |
| **Presupuesto diario de campaña** | **$11.143 CLP** |
| Estado | **PAUSADA** |

### Conjunto único — `ANIV26 · RETARGETING · Todos · WhatsApp`

```
Objetivo de rendimiento:        Maximizar el número de conversaciones
Fechas:                         24 ago 2026 → 6 sep 2026 23:59
Edad:                           18 — sin límite superior
Sexo:                           Todos
Ubicaciones:                    Advantage ACTIVADO
Público personalizado Advantage: ❌ DESACTIVADO   ← imprescindible

Públicos INCLUIDOS (los que existan en la cuenta):
  · Interacción con página de Facebook — 365 días
  · Interacción con cuenta de Instagram — 365 días
  · Reproducciones de video 25% o más — 365 días
  · Personas que escribieron y no compraron — 90 días

Público EXCLUIDO:
  · Compradores últimos 30 días
```

> **"Público personalizado Advantage" DESACTIVADO es el punto entero de este conjunto.**
> Si queda activado, Meta amplía a desconocidos y esta campaña deja de ser retargeting.
> Verifícalo dos veces.

> Si alguno de los públicos no existe todavía, incluye los que sí existan y anota
> cuáles faltaron.

---

# Verificación final antes de reportar

Recorre las 3 campañas y confirma una por una:

- [ ] Las 3 campañas y los 6 conjuntos están en **PAUSA**
- [ ] Ningún conjunto tiene anuncios (deben estar vacíos)
- [ ] Campaña 1: ABO · suma **$38.000/día**
- [ ] Campaña 2: ABO · **$8.000/día**
- [ ] Campaña 3: **CBO** · **$11.143/día**
- [ ] **Total de las tres: $57.143/día**
- [ ] Todos los conjuntos con fecha de fin **6 sep 2026**
- [ ] Todos con edad 18 sin techo y sexo Todos
- [ ] Campaña 3 con público personalizado Advantage **APAGADO**
- [ ] Campañas 1 y 2 con público personalizado Advantage **ENCENDIDO**
- [ ] Ninguna recomendación automática aceptada
- [ ] Ningún dato de pago ingresado
- [ ] Las campañas viejas siguen intactas

# Reporte final

Entrega una ficha con:

1. **Tabla de lo creado:** campaña · conjunto · objetivo · presupuesto/día ·
   geografía · estado. Con los IDs si los ves.
2. **Todo lo que quedó distinto de lo pedido** y por qué (públicos que no existían,
   formulario no encontrado, valores que Meta cambió al guardar, opciones que no
   aparecieron en la interfaz).
3. **Lo que falta para poder encender**, en orden.
4. Cualquier cosa que te haya parecido rara en la cuenta.

Sé literal en el reporte. Si algo no lo lograste, dilo — es más útil que un reporte
que dice que todo salió bien.
