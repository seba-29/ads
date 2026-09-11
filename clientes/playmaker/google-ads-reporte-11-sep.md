# Prompt para Claude in Chrome — Playmaker · Reporte de Google Ads

> Pégale esto completo a Claude in Chrome con Google Ads abierto.
> **Es una sesión de LECTURA.** Los pasos 1 al 8 no cambian absolutamente nada.
> El único paso que escribe es el 9, está marcado, y es opcional.

---

## Contexto

| | |
|---|---|
| **Cuenta** | Playmaker Spa — `130-061-3823` (sub-cuenta de la administradora Heat, `150-194-2107`) |
| **Campaña** | `PM \| Búsqueda \| Fútbol \| Chile` · ID `24221465441` |
| **Encendida** | 7-sep-2026 (antes estuvo pausada) |
| **Presupuesto** | CLP 5.000/día · Maximizar clics con tope de CPC CLP 250 |
| **Grupos** | `Camisetas Fútbol` · `Equipos y Personalización` · `Marca Playmaker` |
| **Landing** | `https://playmaker.cl/16-futbol` |

Esto alimenta el reporte mensual del cliente. **Importa más la exactitud que la
cantidad.** Si un dato no está disponible, escribe "no disponible" y sigue —
no lo estimes, no lo deduzcas, no lo rellenes con algo parecido.

## Reglas — no negociables

1. **No cambies nada** en los pasos 1 al 8. Ni pausas, ni presupuestos, ni pujas,
   ni palabras clave, ni anuncios.
2. **No apliques ninguna recomendación de Google.** Te las va a ofrecer en casi
   cada pantalla, a veces con un botón grande que dice "Aplicar". Ignóralas.
   En el paso 7 solo las **lees y me las copias**.
3. **No toques facturación** ni nada a nivel de la cuenta administradora.
4. **No ingreses contraseñas ni códigos 2FA.** Si aparece "Confirme su identidad",
   detente y avísame.
5. Si algo no se puede ver, **anótalo y sigue**. No inventes un camino alternativo.
6. **Copia los números tal como aparecen en pantalla.** No redondees ni conviertas.

---

## Las dos ventanas de fecha

Todo lo que sigue se pide en estas dos ventanas. El contraste entre ellas **es**
el reporte: son la misma campaña antes y después de arreglarle el mensaje.

| | Desde | Hasta | Qué es |
|---|---|---|---|
| **Ventana A** | 7 sep 2026 | 10 sep 2026 | Campaña alineada y encendida |
| **Ventana B** | 8 ago 2026 | 6 sep 2026 | Campaña vieja, con copy de "compra" sobre una landing de cotización |

**No incluyas el 11 de septiembre (hoy).** El día en curso llega incompleto y
ensucia los promedios.

---

## Paso 1 — Campaña, las dos ventanas

Campaña → **Estadísticas e informes**. Configura las columnas para que muestren
exactamente esto y dame **una tabla por ventana**:

```
Impresiones · Clics · CTR · Costo · CPC promedio · Conversiones ·
Costo por conversión · Porcentaje de impresiones de búsqueda ·
Porcentaje de impresiones perdidas en búsqueda (presupuesto) ·
Porcentaje de impresiones perdidas en búsqueda (clasificación)
```

Si alguna de las tres columnas de "porcentaje de impresiones" no aparece en el
selector, dilo — esas tres son las que dicen si estamos dejando demanda sin
comprar.

## Paso 2 — Desglose por día (solo Ventana A)

La campaña lleva pocos días encendida y necesito ver la forma de la curva, no
solo el total. Segmenta por día: fecha, impresiones, clics, costo, conversiones.

## Paso 3 — Por grupo de anuncios (Ventana A)

Los 3 grupos, con: impresiones, clics, CTR, costo, CPC promedio, conversiones.

Dime también **cuál de los 3 no está recibiendo impresiones**, si es el caso.

## Paso 4 — Palabras clave (Ventana A)

Las 16 palabras clave con: palabra, tipo de concordancia, estado, impresiones,
clics, CTR, costo, CPC promedio, conversiones.

Agrega, si están disponibles, las columnas de calidad:
`Índice de calidad` · `Exp. de la página de destino` · `Relevancia del anuncio` ·
`CTR esperado`. Si dicen "—" es que no tienen datos suficientes todavía:
escríbelo así, no lo dejes en blanco.

**Marca cualquier palabra clave cuyo estado NO sea "Apta"** ("Bajo volumen de
búsquedas", "Rechazada", etc.).

## Paso 5 — Términos de búsqueda (Ventana A) ← lo más importante

Campaña → **Estadísticas e informes → Términos de búsqueda**, Ventana A.

**Cópiame la tabla completa, sin resumir y sin filtrar.** Todas las filas, aunque
sean de 1 impresión: término de búsqueda, palabra clave que lo activó, **tipo de
concordancia con la que entró**, impresiones, clics, costo, conversiones.

Esa columna de tipo de concordancia importa de verdad: la vez pasada 19 de 23
términos entraron por *variante cercana*, que es Google ampliando por su cuenta
por encima de nuestras concordancias de frase.

Al final dime **cuánto costo quedó en "Otros términos de búsqueda"**, la fila
que Google no desglosa por umbral de privacidad.

## Paso 6 — La etiqueta de conversión

**Herramientas → Medición → Conversiones.**

1. Lista **todas** las acciones de conversión que existan en la cuenta, con:
   nombre, origen, categoría, **estado exacto** (cópialo textual: "Configuración
   incorrecta", "Sin actividad reciente", "Registrando conversiones"…),
   **Principal o Secundaria**, y ventana de conversión.
2. Si alguna está en error, entra y **cópiame el mensaje completo** que muestra
   Google. El texto exacto, no tu resumen de él.
3. Dime si hay **alguna acción de conversión importada desde GA4**, y si sí,
   cuál es y si está marcada como Principal.

Este paso decide si el próximo mes se puede leer o no. No lo abrevies.

## Paso 7 — Recomendaciones y ajustes automáticos ⚠️

**Solo leer. No aplicar nada.**

1. Pestaña **Recomendaciones**: dime el "Nivel de optimización" (el porcentaje) y
   **lista las recomendaciones pendientes** por título.
2. Busca **"Aplicar automáticamente"** (suele estar arriba a la derecha en
   Recomendaciones, o en Configuración de la cuenta). **Dime qué está activado.**

El punto 2 es el que más me importa de todo este paso. Si Google tiene permiso
para agregar palabras clave solo, puede meter concordancia amplia en una campaña
que construimos entera sin amplia a propósito. Necesito saber si está prendido.

## Paso 8 — Verificación de configuración

Configuración de la campaña. Confirma cada línea con ✅ / ❌ y el valor que viste:

```
☐ Estado: Activa (habilitada)
☐ Presupuesto CLP 5.000/día
☐ Estrategia: Maximizar clics
☐ Tope de CPC máximo: CLP 250
☐ Red de Display: DESMARCADA
☐ Socios de búsqueda: DESMARCADOS
☐ Ubicación: Chile, con opción "Presencia" (no "Presencia o interés")
☐ Idioma: español
☐ Rotación de anuncios: cuál está puesta
```

Y en **Facturación → Promociones**: cuánto queda del crédito promocional y qué
fecha de vencimiento muestra. (Deberían ser CLP 328.000 al 31-oct-2026 —
confírmalo, no lo des por hecho.)

---

## Paso 9 — ⚠️ ESTE SÍ ESCRIBE · opcional

**Haz esto solo después de haber entregado todo lo anterior.** Si tienes
cualquier duda, no lo hagas y avísame.

Cargar 4 palabras clave negativas **a nivel campaña**. Ya costaron dinero real en
el período anterior y están aprobadas desde el 7-sep:

| Término | Concordancia |
|---|---|
| `huachipato` | amplia |
| `palestino` | amplia |
| `deportivo de la coruña` | **frase** — con comillas |
| `camarin del abuelo` | **frase** — con comillas |

Las de varias palabras van en **frase**. En amplia bloquearían cualquier búsqueda
que traiga esas palabras sueltas y en cualquier orden, que no es lo que queremos.

**No agregues ninguna otra negativa**, aunque el informe de términos te sugiera
candidatos obvios. Esas se deciden con volumen, no a ojo. Si ves algo que te
parece que sangra plata, escríbelo en el informe y yo decido.

---

## Formato del informe de vuelta

Devuélveme un `.md` con las tablas completas en el orden de los pasos, más:

1. **Lo que no pudiste ver**, y por qué exactamente.
2. **Cualquier cosa que Google haya cambiado por su cuenta** desde el 7-sep
   (recomendaciones auto-aplicadas, keywords agregadas, cambios de puja).
3. **Cualquier aviso o alerta** que muestre la cuenta — cópialo textual.
4. Si hiciste el paso 9: confirmación de las 4 cargadas y cómo quedaron.

**Números crudos, sin interpretar.** El análisis lo hago yo — si me mandas
conclusiones en vez de tablas, tengo que volver a pedirte los datos.
