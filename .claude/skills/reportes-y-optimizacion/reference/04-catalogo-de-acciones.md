# 04 — Catálogo de acciones

El árbol de las 3 Q's (`meta-ads/06-optimizacion.md`) te dice **qué está roto**. Este
documento dice **qué hacer**, cómo hacerlo sin romper el aprendizaje, y qué no tocar.

---

## 1. Las tres reglas de ejecución

1. **Un cambio a la vez por conjunto.** Si cambias público y creativo el mismo día, la
   próxima ventana no te va a decir cuál funcionó. Habrás gastado una semana en un
   experimento que no se puede leer.
2. **Editar reinicia el aprendizaje.** Público, presupuesto grande, optimización,
   ubicaciones: todos reinician la fase y cuestan 48-72 h de CPA inflado (+35-60%).
   Por eso la acción "duplicar en vez de editar" aparece tanto acá.
3. **Anota antes de aplicar.** Escribe en la bitácora qué métrica esperas mover y para
   cuándo. Si no puedes nombrar la métrica, todavía no sabes por qué estás cambiando
   algo.

---

## 2. De hallazgo a acción

Ordenado como el árbol de diagnóstico: **la primera que falla de arriba hacia abajo es
la que se ataca**. Las de más abajo se arreglan solas sorprendentemente seguido cuando
se corrige la de arriba.

| Falla | Qué significa | Acción | Qué debería moverse |
|---|---|---|---|
| **CPM alto** | Público chico, fecha cara, o mala señal de calidad | Ampliar público; revisar el calendario comercial; mejorar el anuncio | CPM baja o se estabiliza |
| **Captura 3 seg < 20-25%** | El gancho no detiene el scroll | **Cambiar solo el principio del video**, no el video entero | Captura sube |
| **Tiempo promedio < 5-7 seg** | Arrancan pero no se quedan: guion y edición | Cortes más rápidos, promesa antes, menos relleno | Tiempo promedio sube |
| **CTR único < 2%** *(frío; en retargeting exige > 3%)* | El anuncio no genera ganas de dar el paso | Ángulos nuevos y tipos de arte distintos — no otro color | CTR sube |
| **Tasa de conversión baja** | La promesa del destino no coincide con el anuncio | Alinear el destino con el anuncio; revisar el formulario (¿pide demasiado?) | Tasa sube |
| **Frecuencia > 3-5 en 7 días** | El público ya vio todo. Fatiga | **Agregar anuncios nuevos.** No bajar el presupuesto | Frecuencia baja, CTR se recupera |
| **Q2 sana y aun así no vende** | El problema está fuera de Meta | Ver `03-veredicto.md` §5: respuesta, cierre, precio, oferta | *(no es una métrica de Meta)* |

### Fatiga: las 4 acciones en orden

Cuando la frecuencia es la que falla, la secuencia importa:

1. **Contenido nuevo** — textos, imágenes, videos. Escalar horizontalmente.
2. **Ampliar el público** — la fatiga golpea primero a los públicos chicos, o sea al
   retargeting. Si sigues visitantes de 7 días, extiende a 30.
3. **Redistribuir presupuesto** — sacar de los públicos chicos, mover a los grandes.
4. **Probar otro objetivo de campaña.**

Bajar el presupuesto no está en la lista, y es lo primero que hace todo el mundo. No
arregla la fatiga: solo hace que el mismo público quemado te cueste lo mismo, más lento.

---

## 3. Qué NO tocar

Estas cuestan dinero y se sienten productivas. Es la peor combinación.

| No hagas | Por qué |
|---|---|
| **Apagar un anuncio por gastar poco** | Meta reparte a propósito de forma desigual. Concentrar el presupuesto en el mejor ROAS puntual **baja** el ROAS general — es el efecto desglose (`meta-ads/12`) |
| **Apagar un anuncio con < 500 impresiones** | No tuvo oportunidad. No fracasó |
| **Editar la geografía de un conjunto que funciona** | Reinicia el aprendizaje. **Duplica** el conjunto y ponle la geo nueva; además te deja comparar CPM por zona |
| **Subir el presupuesto más de ~20-30% de golpe** | Reinicia aprendizaje. Escalada gradual (`meta-ads/07`) |
| **Optimizar dos días después de la última edición** | La campaña todavía está aprendiendo. Estás midiendo el reinicio, no el cambio |
| **Reaccionar a una diferencia dentro de la banda de ruido** | Es azar. Ver `03-veredicto.md` §2 |
| **Mover presupuesto de frío a retargeting porque "convierte mejor"** | El retargeting convierte mejor *porque* alguien pagó el frío. Sin frío se seca en 2-3 semanas |

---

## 4. Cuando el problema es de arquitectura, no de optimización

Hay síntomas que ninguna optimización arregla porque el problema es cómo está montada
la cuenta. Detectarlos ahorra semanas de ajustes inútiles:

- **"Aprendizaje limitado" permanente en varios conjuntos** → el presupuesto no alcanza
  para 50 eventos en 7 días por conjunto. La cuenta tiene demasiados conjuntos para lo
  que gasta. Se consolida (`meta-ads/10-publicos-y-exclusiones.md` §4). No es un
  fracaso: es aritmética, `(CPA × 50) ÷ 7`.
- **Dos campañas de la misma cuenta persiguiendo al mismo público** → compiten en la
  misma subasta, inflan el CPM y ensucian la atribución. Típico cuando conviven
  campañas nuevas con las que ya tenía el cliente. Hay que medirlas por separado antes
  de proponer apagar lo viejo.
- **CPA que sube mes a mes con frecuencia estable** → no es fatiga, es competencia o
  estacionalidad. Se compara contra los benchmarks del año, no contra el propio
  histórico.
- **Ninguna campaña sale nunca del aprendizaje** → alguien está editando demasiado
  seguido. La bitácora lo confirma en dos minutos, y la solución es de proceso, no de
  plataforma.
