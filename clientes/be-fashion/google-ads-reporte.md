# Prompt para Claude in Chrome — be.fashion · métricas de Google Ads

> Pégale esto completo a Claude in Chrome con Google Ads abierto.
> **Es una sesión de solo lectura.** No cambia absolutamente nada.

---

## Para qué es

Estas cifras entran al reporte semanal que se le manda al cliente, al lado de
las de Meta. **Importa más la exactitud que la cantidad**: un número inventado
o estimado le llega tal cual al cliente.

Si algo no está disponible, escribe **"no disponible"** y sigue. No lo deduzcas,
no lo aproximes, no lo rellenes con algo parecido.

## Contexto

| | |
|---|---|
| **Cliente** | be.fashion — accesorios y joyería |
| **Administradora** | Heat · `150-194-2107` |
| **Cuenta del cliente** | **búscala** — debería colgar de la administradora. Si hay más de una candidata, dímelo y **no elijas**: prefiero no tener el dato a tener el del cliente equivocado |
| **Foco de la prueba** | **joyería**, no carteras — la tesis es no competir contra Falabella, Mercado Libre ni marcas reconocidas |

## Reglas — no negociables

1. **No cambies nada.** Ni pausas, ni presupuestos, ni pujas, ni palabras clave.
2. **No apliques ninguna recomendación de Google**, por más que insista con el
   botón grande. En el paso 5 solo las lees.
3. **No toques facturación** ni nada a nivel de la administradora.
4. **No ingreses contraseñas ni códigos.** Si aparece "Confirme su identidad" o
   "Verifica que eres tú", detente y avísame.
5. **Copia los números tal como aparecen en pantalla.** Sin redondear.

---

## La ventana

**4 al 10 de septiembre de 2026.**

**No incluyas el 11 (hoy).** El día en curso llega incompleto y ensucia los
promedios. Es la misma ventana con la que se está leyendo Meta: si las dos
mitades del reporte cubrieran períodos distintos, no se podrían sumar.

Si la campaña arrancó DESPUÉS del 4, dime desde qué día tiene datos reales.

---

## Paso 1 — El total de la cuenta ← lo más importante

Con la ventana puesta, dame estas cifras del total:

```
Impresiones · Clics · CTR · Costo · CPC promedio ·
Conversiones · Costo por conversión
```

Esas siete son las que van al reporte. Si el resto de la sesión falla, con esto
alcanza.

## Paso 2 — Por campaña

La misma tabla, una fila por campaña, con **nombre, tipo (Búsqueda / Shopping /
Performance Max / Display) y estado**.

Dime también **cuál está gastando de verdad y cuál figura pero no entrega.**

## Paso 3 — Términos de búsqueda

Si hay campaña de Búsqueda: **Estadísticas e informes → Términos de búsqueda**,
misma ventana. Cópiame la tabla completa sin filtrar — término, palabra clave
que lo activó, tipo de concordancia, impresiones, clics, costo, conversiones.

Es lo que dice si estamos comprando búsquedas de joyería o si nos estamos yendo
a carteras y marcas, que es justo lo que esta prueba quiere evitar.

Al final: **cuánto costo quedó en "Otros términos de búsqueda"**, la fila que
Google no desglosa.

## Paso 4 — La medición

**Herramientas → Medición → Conversiones.** Lista todas las acciones con:
nombre, origen, **estado exacto copiado textual**, Principal o Secundaria, y
ventana de conversión.

Si alguna está en error, entra y **pégame el mensaje completo de Google**, el
texto tal cual y no tu resumen.

## Paso 5 — Recomendaciones y ajustes automáticos ⚠️

**Solo leer.**

1. Nivel de optimización (el porcentaje) y las recomendaciones pendientes, por título.
2. Busca **"Aplicar automáticamente"** y dime **qué está activado**.

El punto 2 es el que más me importa. Si Google tiene permiso para agregar
palabras clave solo, puede meter términos de carteras y marcas en una cuenta
que existe para probar joyería.

## Paso 6 — Configuración

Por cada campaña que esté gastando:

```
☐ Presupuesto diario
☐ Estrategia de puja (y tope de CPC si lo tiene)
☐ Red de Display: marcada o no
☐ Socios de búsqueda: marcados o no
☐ Ubicación, y si es "Presencia" o "Presencia o interés"
☐ Idioma
☐ Fecha de inicio
```

Y en **Facturación → Promociones**: si hay crédito, cuánto, qué condición exacta
tiene y hasta cuándo. Cópialo textual — el de otro cliente decía "regalo" y en
realidad había que invertir la misma cifra para ganarlo.

---

## El informe de vuelta

Un `.md` con las tablas en el orden de los pasos, más:

1. **Qué no pudiste ver**, y por qué exactamente.
2. **Cualquier cosa que Google haya cambiado por su cuenta** — recomendaciones
   auto-aplicadas, keywords agregadas, cambios de puja. Mira el historial de cambios.
3. **Cualquier aviso o alerta de la cuenta**, copiado textual.

**Números crudos, sin interpretar.** El análisis lo hago yo; si me mandas
conclusiones en vez de tablas, tengo que volver a pedirte los datos.
