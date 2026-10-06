# FORMULARIO GENERAL — Dra. Vanessa Silva

> Copy listo para pegar en el editor de formularios instantáneos de Meta, para la
> campaña nueva de octubre-2026. Ficha de la cuenta: `clientes/dra-vanessa-silva.md`.
> Todo dato clínico sale de la KB del agente (`heat-integrations/clientes/dra-vanessa-silva/kb.yaml`).
> Lo que no está verificado va marcado 🔸 — no se pega sin confirmarlo.

**Nombre del formulario (interno):** `FORM · General · Oct-2026`
**Campaña sugerida:** `Clientes potenciales | FORM GENERAL | ABO`
**Conjunto:** `Meta form | Santiago | General`

⚠️ Un formulario de Meta **no se puede editar una vez que recibió leads**: se duplica.
Por eso el nombre lleva la fecha — la versión siguiente es `Oct-2026 v2`, no un parche.

---

## 1. Tipo de formulario: **MÁS INTENCIÓN**

| Tipo | Qué hace | Para quién |
|---|---|---|
| Más volumen | Rellena y envía en un toque | Impulso, ticket bajo |
| **Más intención** ✅ | Agrega un paso de revisión antes de enviar | **Servicios de ticket alto** |

Acá el ticket va de $700.000 (lipopapada) a $3.600.000 (Programa Premium de
Abdominoplastia). Un lead que no confirmó su teléfono es un lead que no sabe que se
registró, y el equipo gasta el día llamando a nadie.

---

## 2. Intro — título y descripción

### Título (máx. ~60 caracteres)

**A ⭐ RECOMENDADO — campaña general / público frío**
```
✨ Cuéntanos qué quieres hacerte y te orientamos
```

**B — si el creativo abre con la promoción**
```
🔥 Promociones de octubre · Cirugía estética corporal
```

**C — si el creativo es de marca / autoridad**
```
💎 Agenda tu evaluación con la Dra. Vanessa Silva
```

Va **A** porque es la campaña general: repite la pregunta clave del formulario y
promete orientación, no compromiso. **B** y **C** piden que el anuncio ya haya hecho
ese trabajo.

### Descripción

```
Lipo 360, abdominoplastia, pechos o glúteos: cuéntanos qué te interesa y la Dra.
Vanessa Silva revisa tu caso para decirte qué procedimiento te conviene y qué
resultado es realista. 🩺

✅ Cirugía estética corporal y facial, atención personalizada
✅ Clínica Alonso de Córdoba — Av. Apoquindo 4800, Las Condes
✅ Evaluación presencial, por videollamada o online por fotos
✅ Simulación 3D para ver tu resultado estimado antes de decidir

Déjanos tus datos y te escribimos por WhatsApp. 💬
```

Los cuatro ✅ son datos verificados de la KB, no adornos: clínica y dirección reales,
las tres modalidades de evaluación reales, y la simulación 3D que sí está incluida en
todas las modalidades. Es lo que hace que la primera conversación no empiece con una
corrección.

---

## 3. Preguntas

### Campos prellenados (los pone Meta, un toque)
- Nombre completo
- **Teléfono** *(obligatorio)*
- Correo
- **Ciudad** ← prellenado, no pregunta propia: sirve para decidir la ampliación
  geográfica pendiente sin sumarle fricción al formulario

### Pregunta 1 — la clave · opción múltiple, una sola respuesta

```
¿Qué tratamiento quieres hacerte?
```

| Opción | Tag del CRM que le corresponde |
|---|---|
| Lipo 360 / Lipoescultura | `lipo-360-vaser` o `lipo-360-laser` *(Lorena define cuál)* |
| Abdominoplastia (abdomen completo) | `abdominoplastia` / `lipoabdominoplastia` |
| Cirugía de pechos (aumento, levantamiento o recambio) | `aumento-mamario` |
| Aumento de glúteos con tu propia grasa | `bbl` |
| Lipo de papada, brazos o rollo axilar | `lipopapada` / `lipo-brazos` / `minilipo-axilar` |
| Todavía no lo sé, quiero orientación | — *(el que hay que mirar en el CRM)* |

**Por qué agrupadas y no una por tratamiento:** los tags del CRM son 13 y bajan hasta
"láser vs. vaser". Una lista de 13 en un formulario de Meta mata la conversión, y un
lead frío no sabe la diferencia entre VASER y láser — esa la resuelve Lorena en la
conversación. Seis opciones es el techo usable.

**Medicina estética (bótox, labios, bioestimuladores) queda FUERA a propósito.** Su
ticket va de $100.000 a $300.000 contra $2.900.000 de la lipo: mezclados en la misma
campaña, el costo por lead se ve mejor y el valor por lead se cae, y nadie puede
leerlo. Si se quiere abrir esa línea, va en su propia campaña con su propio
formulario. Quien la busque igual entra por "Todavía no lo sé".

### Pregunta 2 — intención · opción múltiple, una sola respuesta

```
¿Para cuándo lo estás pensando?
```
- Lo antes posible
- En los próximos 3 meses
- Más adelante, estoy averiguando

### Y ahí se cierra: dos preguntas

Cada pregunta baja el volumen y sube la calidad. Dos es lo que aguanta un público frío.

**La modalidad de evaluación NO se pregunta acá**, aunque exista el tag. La evaluación
presencial cuesta $50.000 y la de videollamada $40.000: un formulario que te hace
elegir modalidad sin decirte que se paga arma una expectativa equivocada y la primera
conversación arranca peleando. Eso lo explica Lorena.

---

## 4. Pantalla de agradecimiento

```
Título:       ¡Listo! Te escribimos por WhatsApp 💬

Descripción:  Revisamos tu caso y te contactamos para orientarte y coordinar tu
              evaluación. Si quieres adelantar, escríbenos ahora y te atendemos
              al instante.

Botón:        destino → https://wa.me/569XXXXXXXX?text=Hola,%20llen%C3%A9%20el%20formulario%20y%20quiero%20informaci%C3%B3n
```

🔸 **El número de WhatsApp no está en el repo** (el agente entra por el puente QR, no
hay número en `agente.yaml` ni en la KB). Hay que pedirlo y armar el enlace — no lo
inventé.

Si el editor solo deja elegir etiquetas predefinidas para el botón ("Ver sitio web",
"Más información"), da igual la etiqueta: lo que importa es que el destino sea el
`wa.me`.

**Este botón es la pieza más valiosa del formulario en esta cuenta.** La regla de
lead-gen es contactar en menos de 48 horas; acá Lorena contesta 24/7, así que el lead
que toca el botón entra a una conversación atendida en segundos en vez de esperar.
Al revés también: **si el agente está apagado para este cliente, el formulario pierde
justamente su ventaja** y hay que avisar que alguien conteste a mano.

El texto precargado no puede traer la respuesta de la pregunta 1 — el `wa.me` es fijo
para todo el formulario. Esa la lee Lorena del CRM.

---

## 5. Política de privacidad (bloqueante)

Meta **no publica** un formulario instantáneo sin enlace a una política de privacidad.

✅ **No hay que inventar nada: copiar el enlace del formulario que ya corre** en
`Clientes potenciales | FORM | ABO` (conjunto `Meta form | Santiago | Promociones`).
Si ese formulario está al aire, ese enlace ya pasó revisión.

🔸 La ficha no registra sitio web del cliente, así que este es el primer dato a
verificar antes de montar.

---

## 6. Lo que NO va en el formulario

| No va | Por qué |
|---|---|
| **Precios** | El valor de la liposucción se corrigió en la reunión del 3-sep. Un formulario con un precio viejo no se puede editar después y deja la corrección para la primera conversación. Los valores los da Lorena, que lee la KB actualizada. |
| **IMC, peso, enfermedades, embarazo o lactancia** | Meta prohíbe pedir información de salud en las preguntas de un formulario. El filtro real de esta clínica es IMC ≤ 29, y **tiene que preguntarlo Lorena en WhatsApp**, no el formulario. |
| **Antes/después, o hablarle al cuerpo de la persona** | Meta rechaza anuncios que impliquen atributos personales ("¿no te gusta tu abdomen?") y las imágenes de antes/después en procedimientos estéticos. El texto del formulario se revisa igual que el del anuncio. |
| **"Resultados garantizados"** | Promesa de resultado en salud: rechazo, y además contradice el "expectativas realistas" que es el discurso de la clínica. |

Y en el conjunto: **edad mínima 18+**.

---

## 7. Cómo se lee después

**a) Que la respuesta llegue al CRM.** La pregunta 1 no sirve de nada si el dato no
queda visible en el contacto de GHL. Antes de poner plata: mandar un lead de prueba y
**abrir el contacto en GHL a mirar si está la respuesta**. Que la integración diga
"conectada" es el intento; el dato en la ficha es el efecto.

**b) No comparar el costo por lead contra los $356 del conjunto de promociones.** Son
unidades distintas: ese conjunto va a público de promoción con el creativo que sostiene
la cuenta; este va general con dos preguntas de filtro. **El costo por lead de este
formulario va a ser más alto a propósito.** Avisarlo antes de que suba, no después.

**c) Presupuesto mínimo para que el conjunto aprenda.** Meta necesita ~50 eventos en 7
días: `(CPL × 50) ÷ 7 = presupuesto diario mínimo`.

| CPL que se asuma | Mínimo diario | Al mes |
|---|---|---|
| $356 *(el del conjunto de promociones, optimista acá)* | $2.550 | ~$77.000 |
| $500 | $3.570 | ~$107.000 |
| $700 *(público general, 2 preguntas)* | $5.000 | ~$150.000 |

⚠️ Esto **no es plata nueva**: el techo acordado es $500.000/mes y septiembre cerró en
$523.171. Si entra esta campaña, algo sale — y el techo mensual sigue sin estar
confirmado por escrito (pendiente desde la reunión del 3-sep).

**d) Público de retargeting, desde el día uno:** `AUD · Formulario abierto sin enviar ·
90d`. En lead-gen es el público más valioso que existe y solo acumula si se crea antes.

---

## 8. Checklist de lanzamiento

- [ ] Enlace de política de privacidad (copiado del formulario que ya corre)
- [ ] Número de WhatsApp para el botón de la pantalla final
- [ ] Tipo de formulario: **Más intención**
- [ ] Teléfono obligatorio · Ciudad prellenada
- [ ] Dos preguntas, ni una más
- [ ] Edad mínima 18+ en el conjunto
- [ ] Lead de prueba → verificar la respuesta en el contacto de GHL
- [ ] Público `AUD · Formulario abierto sin enviar · 90d` creado
- [ ] Confirmar que Lorena está encendida para esta cuenta
- [ ] Avisar al cliente que el costo por lead de esta campaña es más alto que el de la
      campaña de promociones, y por qué
