# Plantilla WhatsApp API — Aniversario Palavas Las Condes

> Categoría: **MARKETING** · Encabezado: **imagen** · Enfoque: **depilación láser Las Condes**
> Estado: redactada, pendiente de crear en el Business Manager.

## Encabezado (imagen)

La promo llegó como collage de 6 paneles. **Como encabezado de WhatsApp se va a ver diminuto.**
Recortar a los **dos paneles Soprano** (Pierna completa + Axilas $299.990 / Espalda + Hombros $259.990)
y subir solo esos. Si igual se sube el collage completo, hay que cambiar el copy que dice
"mira arriba 👆" por algo que no prometa que se lee.

---

## Cuerpo — Opción A *(recomendada)*

```
Hola {{1}} 💚

¡Estamos de aniversario! 🎉✨

En Las Condes dejamos la depilación láser a un precio que no se repite 👀

Mira arriba 👆 y dime cuál te tinca — te aparto la hora al toque 🙌
```

## Cuerpo — Opción B *(más corta)*

```
¡Aniversario Palavas! 🎉✨

{{1}}, la depilación láser en Las Condes quedó imperdible 💚

¿Cuál te tinca? 👀
```

## Cuerpo — Opción C *(con urgencia)*

```
Hola {{1}} 🎉

Aniversario Palavas Las Condes ✨ Depilación láser a precio de una vez al año 💚

Las horas vuelan 🏃‍♀️ ¿Te aparto una?
```

## Cuerpo — Variante para base dormida

```
Hola {{1}} 💚 ¡Tanto tiempo!

Estamos de aniversario 🎉 y la depilación láser en Las Condes quedó a precio de una vez al año ✨

Si dejaste tu tratamiento a medias, retomamos justo donde ibas 🙌

¿Te aparto una hora?
```

---

## Pie de página

```
Palavas Las Condes · Solo hasta el 6 de septiembre ✨
```

## Botones (respuesta rápida)

| `Quiero mi hora 💚` | `Ver más info` | `No enviar más` |
|---|---|---|

---

## Reglas de Meta que aplican aquí

- **El cuerpo no puede empezar ni terminar con una variable.** Por eso las cuatro versiones
  abren con "Hola" o con el saludo de aniversario antes del `{{1}}`.
- `{{1}}` necesita **valor de ejemplo** al crear la plantilla (ej. `Camila`) o la rechazan.
- Cuerpo ≤ 1024 caracteres · pie ≤ 60 · botón ≤ 25.
- El botón **`No enviar más`** no es opcional en la práctica: protege la calificación de
  calidad del número. Sin salida visible, los bloqueos suben y el número baja de tier.
- No usar mayúsculas sostenidas ni exceso de signos: dispara revisión manual.

## Por qué el cuerpo es tan corto

La imagen ya lleva los precios, el "2x1" y las 12 cuotas sin interés. Repetirlos en el texto
alarga el mensaje sin agregar información y hace que se lea como catálogo automático.
El texto solo tiene que hacer dos cosas: darle energía de aniversario y pedir la hora.
