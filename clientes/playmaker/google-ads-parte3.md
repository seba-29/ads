# Prompt para Claude in Chrome — Playmaker Google Ads · Parte 3

> Pégale esto completo a Claude in Chrome con la pestaña de Google Ads abierta.
> **Antes de empezar**, Seba tiene que completar el diálogo "Confirme su
> identidad" que bloqueó la Parte 2. Sin eso no se guarda nada.

---

## Contexto

Estás retomando una campaña de Google Ads a medio construir.

| | |
|---|---|
| **Cuenta** | Playmaker Spa — `130-061-3823` (sub-cuenta de la administradora Heat, `150-194-2107`) |
| **Campaña** | `PM \| Búsqueda \| Fútbol \| Chile` · ID `24221465441` · tipo Búsqueda |
| **Estado actual** | **PAUSADA (Detenido)** — así tiene que seguir hasta el final |
| **Presupuesto** | CLP 5.000/día |
| **Grupo existente** | `Camisetas Fútbol` · ID `198653351943` — ya tiene RSA nuevo y 5 keywords, **no lo toques** |
| **Landing de todos los grupos** | `https://playmaker.cl/16-futbol` |

**Qué vende Playmaker:** camisetas de fútbol **sublimadas y personalizadas**,
marca chilena. El sitio **no vende online** — es un flujo de **cotización**
(módulo PrestaShop `roja45quotationspro`). Cero botones de "comprar" o
"añadir al carrito". Precio de referencia visible en cada producto: **$19.900**.

**Por lo tanto:** ningún texto de anuncio puede decir "compra", "comprar",
"stock" ni "tienda online". Todo el lenguaje es de cotizar / equipar / personalizar.

## Reglas de operación — no negociables

1. **No toques facturación**, ni el objetivo de conversión de la cuenta, ni
   nada a nivel de la cuenta administradora.
2. **No ingreses contraseñas ni códigos 2FA.** Si aparece "Confirme su
   identidad", detente y avisa.
3. **La campaña termina PAUSADA.** Verifícalo al final.
4. **Cero keywords en concordancia amplia.** Google precompleta el campo de
   keywords con ~14 términos en amplia cada vez que abres el asistente de un
   grupo nuevo: **bórralos todos** antes de escribir los tuyos.
5. Si algo no se puede hacer, **anótalo y sigue**. No inventes un camino
   alternativo sin avisar.

---

## Paso 0 — Informe de términos de búsqueda (hazlo PRIMERO)

La campaña ya gastó CLP 5.443 en 39 clics entre el 8-ago y el 6-sep, con un
anuncio desalineado. **Esos 39 clics son data real y gratis.**

1. Ve a la campaña → **Estadísticas e informes → Términos de búsqueda**
2. Rango de fechas: **8 ago 2026 – 6 sep 2026**
3. **Cópiame la tabla completa**: término de búsqueda, keyword que lo activó,
   clics, costo, CTR.

**No borres ni agregues nada acá.** Solo léelo y repórtalo. Esos términos
reales valen más que cualquier lista de negativas armada a priori — con eso
decidimos qué negativas faltan de verdad.

---

## Paso 1 — Guardar el Grupo 2 "Equipos y Personalización"

Quedó todo escrito en la Parte 2 pero no se guardó.

| Campo | Valor |
|---|---|
| **Nombre** | `Equipos y Personalización` |
| **Tipo** | Estándar |
| **URL final** | `https://playmaker.cl/16-futbol` |
| **Rutas visibles** | `/futbol` · `/cotiza` |
| **Concordancia con términos de búsqueda** | "Utiliza solo tus palabras clave y tipos de concordancia" (la opción más restrictiva) |

**Keywords — las 6, todas en concordancia de frase:**
```
"camisetas personalizadas de futbol"
"camisetas de futbol para equipos"
"uniformes de futbol"
"uniformes deportivos personalizados"
"cotizar camisetas de futbol"
"camisetas para club de futbol"
```

**RSA — 15 títulos:**
```
1.  Camisetas de Fútbol Chile
2.  Cotiza tu Camiseta de Fútbol
3.  Camisetas Sublimadas
4.  Cotiza Online Ahora
5.  Camisetas para tu Equipo
6.  Indumentaria de Fútbol
7.  Equipa a tu Club
8.  Pide tu Cotización Hoy
9.  Diseños Personalizados
10. Desde $19.900 por Camiseta
11. Playmaker | Fútbol
12. Marca Chilena de Fútbol
13. Envíos a Todo Chile
14. Camisetas Livianas
15. Cotización Rápida y Clara
```

**RSA — 4 descripciones:**
```
1. Camisetas de fútbol sublimadas para tu equipo. Cotiza en línea y recibe en todo Chile.
2. Camisetas desde $19.900. Diseño personalizado para clubes y equipos. Pide tu cotización.
3. Equipa a tu club con indumentaria Playmaker. Marca chilena, despacho a todo el país.
4. Camisetas, shorts y medias de fútbol. Cotiza en línea y arma el uniforme de tu equipo.
```

Sin fijaciones — deja que Google combine libremente.

---

## Paso 2 — Crear el Grupo 3 "Marca Playmaker"

| Campo | Valor |
|---|---|
| **Nombre** | `Marca Playmaker` |
| **Tipo** | Estándar |
| **URL final** | `https://playmaker.cl/16-futbol` |
| **Rutas visibles** | `/futbol` · `/playmaker` |
| **Concordancia con términos de búsqueda** | la opción más restrictiva |

**Keywords:**
```
[playmaker]                → exacta
"playmaker chile"          → frase
"playmaker futbol"         → frase
"playmaker camisetas"      → frase
"camisetas playmaker"      → frase
```

**RSA:** el mismo del Paso 1, cambiando los tres primeros títulos por:
```
1. Playmaker Fútbol Oficial
2. Tienda Oficial Playmaker
3. Playmaker Camisetas
```
Los títulos 4 al 15 y las 4 descripciones quedan idénticos.

---

## Paso 3 — Negativas a nivel campaña: 40 términos

> **Cambio respecto de la Parte 2:** la lista traía 41 e incluía `juego`.
> **`juego` sale.** En Chile "juego de camisetas" es como se pide un set
> completo para un equipo — es el cliente que queremos, no uno que sobra.
> Quedan 40.

**Cómo cargarlas:** Campaña → Palabras clave → Palabras clave negativas →
agregar a nivel **campaña**.

**Palabra sola → concordancia amplia** (26):
```
gratis · usado · usada · replica · replicas · copia · molde · patron · png ·
dibujo · plantilla · diy · fifa · pes · roblox · videojuego · trabajo ·
empleo · curso · seleccion · barcelona · boca · river · psg · manchester ·
liverpool
```

**Palabra sola → concordancia amplia, marcas** (5):
```
nike · adidas · puma · umbro
under armour   ← esta va en FRASE: "under armour"
```

**Multi-palabra → concordancia de FRASE** (9):
```
"segunda mano"
"como hacer"
"ea fc"
"seleccion chilena"
"colo colo"
"universidad de chile"
"universidad catolica"
"la u"
"real madrid"
```

**Por qué frase y no amplia en las multi-palabra:** una negativa amplia bloquea
cualquier búsqueda que contenga *todas* esas palabras sueltas, en cualquier
orden. `la u` en amplia es la más peligrosa — bloquearía búsquedas que traigan
"la" y "u" por separado. En frase solo bloquea la expresión tal cual.

**Términos que NO van como negativa** (confirmado contra el catálogo):

| Término | Por qué se queda |
|---|---|
| `retro` / `vintage` | Playmaker tiene "Camiseta Sublimada Retro" en catálogo |
| `niño` / `infantil` | El filtro "Calce: Infantil" cubre 39 de 44 productos de Fútbol |
| `arquero` / `portero` | Línea completa de arquero con precio propio |
| `juego` | "Juego de camisetas" = set de equipo. Es el cliente objetivo |

---

## Paso 4 — Recargar los recursos que se perdieron

Los recursos cargados en la Parte 1 no sobrevivieron al rehacer el borrador.
Verifica que sigan vacíos y cárgalos de nuevo a **nivel campaña**.

**Enlaces de sitio (4)** — URLs verificadas:

| Texto | URL |
|---|---|
| Ver camisetas | `https://playmaker.cl/16-futbol` |
| Cotiza tu equipo | `https://playmaker.cl/16-futbol` |
| Equipos e instituciones | `https://playmaker.cl/54-instituciones` |
| Otros deportes | `https://playmaker.cl/10-deportes` |

**Textos destacados (5):**
```
Envíos a todo Chile · Cotización sin compromiso · Diseños exclusivos ·
Marca chilena · Despacho rápido
```

**Fragmento estructurado (1):** Encabezado **"Tipos"** → `Camisetas`, `Shorts`,
`Medias`, `Fútbol`

---

## Paso 5 — Verificar el tope de CPC

Configuración de la campaña → **Ofertas**. Confirma a ojo:

- Estrategia: **Maximizar clics**
- **Límite de oferta de CPC máximo: CLP 250**

Si el campo está vacío, ponlo en 250. Si tiene otro valor, **no lo cambies** —
repórtalo y ya.

---

## Paso 6 — Verificación final

Recorre esta lista y responde cada línea con ✅ / ❌ / ⚠️ y lo que viste:

```
☐ Campaña en estado DETENIDO (pausada)
☐ Presupuesto CLP 5.000/día
☐ Tope de CPC CLP 250
☐ Red de Display DESMARCADA
☐ Socios de búsqueda DESMARCADOS
☐ Ubicación Chile con opción "Presencia" (no "interés")
☐ Existen los 3 grupos: Camisetas Fútbol · Equipos y Personalización · Marca Playmaker
☐ Los 3 apuntan a playmaker.cl/16-futbol
☐ CERO keywords en concordancia amplia en los 3 grupos
☐ 40 negativas cargadas a nivel campaña
☐ 4 enlaces de sitio · 5 textos destacados · 1 fragmento estructurado
☐ Ningún anuncio contiene "compra", "comprar", "stock" o "tienda online"
```

---

## Formato del informe de vuelta

Devuélveme un archivo `.md` con:

1. **La tabla completa de términos de búsqueda** del Paso 0 (esto es lo más
   importante de toda la sesión).
2. Qué quedó ✅ hecho, ⚠️ parcial, ⛔ bloqueado — con el motivo exacto de cada
   bloqueo.
3. Cualquier decisión que hayas tomado por tu cuenta, y por qué.
4. Cualquier cosa que Google haya precompletado y que hayas borrado.
5. Capturas o citas textuales de los avisos de Google que aparezcan.

**No enciendas la campaña.** Queda pausada esperando la etiqueta de conversión.

---

## Lo que queda fuera de esta sesión (para Seba, no para el navegador)

1. **Instalar la etiqueta de conversión "Cotización enviada".** Sigue en
   "Configuración incorrecta". Con $5.000/día y CPC de hasta $250 son 20-35
   clics diarios: sin medir cotizaciones, encender es tirar la plata sin saber.
   El evento a medir es el envío del formulario del módulo
   `roja45quotationspro` (botón "Solicitar cotización").
2. **Decidir si se mide también el WhatsApp.** El sitio tiene un botón flotante
   "COTIZA AQUÍ" al **+56 9 2243 5283**. Si una parte de las cotizaciones entra
   por ahí, un clic en ese botón debería contar como conversión secundaria — si
   no, el reporte va a subestimar la campaña.
3. **Revisar el pago pendiente** que avisa la cuenta administradora.
4. **El crédito promocional de $328.000** vence el 31-oct. Evaluar antes.
