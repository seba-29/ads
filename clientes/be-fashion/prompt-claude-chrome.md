# Prompt maestro para Claude in Chrome — Google Ads Be Fashion

Prompt de ejecución autónoma. **Crea la campaña PAUSADA.** La activación es humana.

Copia todo el bloque y pégalo en Claude in Chrome con la pestaña de Google Ads abierta.

---

```
Vas a construir una campaña de Google Ads completa en la interfaz web. Trabajas con
dinero real de un cliente, así que la precisión importa más que la velocidad.

╔═══════════════════════════════════════════════════════════════╗
║  REGLAS DE SEGURIDAD — LEER PRIMERO, NO NEGOCIABLES           ║
╚═══════════════════════════════════════════════════════════════╝

1. LA CAMPAÑA SE CREA PAUSADA. Al final, su estado debe ser "Pausada".
   NUNCA hagas clic en "Publicar", "Activar", "Habilitar" ni "Comenzar a publicar".

2. NUNCA ingreses, modifiques ni confirmes datos de pago, tarjetas o facturación.
   Si la interfaz te pide método de pago, DETENTE y avisa.

3. Si algo no calza con estas instrucciones — la interfaz cambió, falta una opción,
   aparece un flujo distinto — DETENTE y describe exactamente qué ves.
   NO improvises ni elijas la opción "que más se parezca".

4. NO aceptes recomendaciones automáticas de Google en ningún momento.
   Si aparece un banner de "aplicar recomendación", ciérralo o ignóralo.

5. Si en algún paso dudas entre dos opciones, DETENTE y pregunta.

╔═══════════════════════════════════════════════════════════════╗
║  CONTEXTO DEL NEGOCIO (datos reales, verificados)             ║
╚═══════════════════════════════════════════════════════════════╝

Cliente:            BeFashion — https://befashion.cl
Rubro:              Retailer multimarca de joyería premium en Chile
Marca principal:    UNOde50 (67% del catálogo de joyas)
Segunda marca:      Tous (17%)
Ticket promedio:    $232.624 CLP  (AOV real, 49 órdenes)
Margen:             30-40%
Presupuesto:        $200.000 CLP/mes = $6.667 CLP/día
Mercado:            Chile
Moneda:             CLP

Objetivo de esta campaña:
Capturar la demanda de búsqueda que YA existe por la marca UNOde50 y por la marca
propia. NO es un test de descubrimiento: con este presupuesto (250-400 clics al mes)
cada clic tiene que contar, así que se compra solo intención máxima.

╔═══════════════════════════════════════════════════════════════╗
║  PASO 0 — PRE-VUELO (verificar ANTES de crear nada)           ║
╚═══════════════════════════════════════════════════════════════╝

Revisa y reporta el estado de cada punto. Si alguno falla, DETENTE y avisa antes
de seguir:

A) ¿La cuenta de Google Ads existe y está activa?
B) Ve a Herramientas → Medición → Conversiones.
   ¿Existe una acción de conversión de COMPRA configurada y recibiendo datos?
   Si NO existe: DETENTE. Sin conversión medida la campaña es ciega.
   Reporta qué encontraste.
C) ¿Está vinculada una propiedad de Google Analytics 4?
D) Ve a Configuración de la cuenta → busca "Recomendaciones aplicadas
   automáticamente" (auto-apply). Si hay alguna ACTIVADA, DESACTÍVALAS TODAS
   y reporta cuáles estaban activas.
   Esto es crítico: Google puede cambiar concordancias, agregar keywords y subir
   presupuestos por su cuenta si queda activado.

╔═══════════════════════════════════════════════════════════════╗
║  PASO 1 — CREAR LA CAMPAÑA                                    ║
╚═══════════════════════════════════════════════════════════════╝

1. Campañas → botón "+" → Nueva campaña.
2. Objetivo: elige "Ventas".
3. Tipo de campaña: "Búsqueda".   ← IMPORTANTE: Búsqueda, NO Performance Max.
   Si la interfaz empuja hacia Performance Max o Máximo rendimiento, busca la
   opción de cambiar a Búsqueda. Si no la encuentras, DETENTE y avísame.
4. Formas de conversión: marca "Visitas al sitio web" únicamente.
   Desmarca llamadas, visitas a tienda, descargas de app.
5. Nombre de la campaña:
   BF · Search · Marcas · CL

╔═══════════════════════════════════════════════════════════════╗
║  PASO 2 — PUJA Y PRESUPUESTO                                  ║
╚═══════════════════════════════════════════════════════════════╝

PRESUPUESTO DIARIO:  6667   (pesos chilenos)

ESTRATEGIA DE PUJA — esto es donde más gente se equivoca:
  · NO uses "Maximizar conversiones" ni "CPA objetivo" ni "ROAS objetivo".
    Razón: la cuenta tiene CERO conversiones históricas. Smart Bidding sin datos
    produce pujas erráticas y quema el presupuesto.
  · Selecciona: "Maximizar clics".
  · Marca la casilla "Establecer un límite de CPC máximo" (o "Límite de oferta
    de CPC máximo").
  · Límite de CPC máximo:  800   (pesos chilenos)

Si la interfaz no ofrece "Maximizar clics" directamente, busca en el enlace
"O selecciona una estrategia de oferta directamente" / "Seleccionar estrategia
de puja manualmente".

╔═══════════════════════════════════════════════════════════════╗
║  PASO 3 — CONFIGURACIÓN DE LA CAMPAÑA                         ║
╚═══════════════════════════════════════════════════════════════╝

REDES — desactiva las dos:
  ☐ Red de Búsqueda (socios de búsqueda)  → DESMARCAR
  ☐ Red de Display                        → DESMARCAR
  Ambas vienen marcadas por defecto y diluyen el presupuesto fuera de Búsqueda.

UBICACIÓN:
  · Chile
  · Abre "Opciones de ubicación" y elige:
    "Presencia: personas que se encuentran habitualmente en las ubicaciones
    incluidas o que las visitan con regularidad"
    NO uses la opción que incluye "personas interesadas en" — trae tráfico
    de fuera de Chile.

IDIOMA:
  · Español

AI MAX PARA BÚSQUEDA:
  Si aparece una opción llamada "AI Max", "AI Max para Búsqueda" o similar,
  DESACTÍVALA. Expande las coincidencias y quita legibilidad al test.

PROGRAMACIÓN DE ANUNCIOS:
  Déjala sin restricción (todos los días, todo el día).

ROTACIÓN DE ANUNCIOS:
  Si está disponible, elige "Optimizar: preferir los anuncios con mejor
  rendimiento".

╔═══════════════════════════════════════════════════════════════╗
║  PASO 4 — GRUPO DE ANUNCIOS 1: UNOde50                        ║
╚═══════════════════════════════════════════════════════════════╝

Nombre del grupo:  UNOde50
URL final:         https://befashion.cl/collections/joyas-y-bisuteria
  (Si al revisar el sitio existe una colección específica de UNOde50, usa esa
   URL en su lugar y avísame cuál usaste.)

PALABRAS CLAVE — TODAS EN CONCORDANCIA EXACTA.
En la interfaz, la concordancia exacta se escribe entre corchetes. Pega
exactamente esto, una por línea:

[uno de 50]
[unode50]
[uno de 50 chile]
[unode50 chile]
[joyas uno de 50]
[aros uno de 50]
[anillo uno de 50]
[pulsera uno de 50]
[collar uno de 50]
[uno de 50 santiago]

NO agregues concordancia amplia ni de frase. Si la interfaz sugiere keywords
adicionales, IGNÓRALAS.

╔═══════════════════════════════════════════════════════════════╗
║  PASO 5 — ANUNCIO ADAPTABLE DEL GRUPO UNOde50                 ║
╚═══════════════════════════════════════════════════════════════╝

⚠️ ANTES DE ESCRIBIR: abre https://befashion.cl en otra pestaña y verifica si
la tienda realmente ofrece envío a todo Chile y qué medios de pago acepta.
Si NO puedes confirmar una afirmación, NO la uses. Reporta cuáles descartaste.

TÍTULOS (máximo 30 caracteres cada uno — cuéntalos antes de pegar):

UNOde50 Chile
Joyas UNOde50 Originales
UNOde50 en BeFashion
Aros UNOde50
Pulseras UNOde50
Anillos UNOde50
Collares UNOde50
Baño de Oro 18k
Plata de Ley
Joyería de Diseño
Compra Online Segura
Ver Catálogo Completo
Nuevos Diseños
Stock Disponible
BeFashion Joyas

[OPCIONAL — usar SOLO si lo confirmaste en el sitio:]
Envío a Todo Chile
Paga en Cuotas

DESCRIPCIONES (máximo 90 caracteres cada una):

Joyas UNOde50 originales en Chile. Aros, pulseras, anillos y collares.
Baño de oro 18k y plata de ley. Piezas originales con la calidad UNOde50.
Compra online segura. Revisa el stock disponible y recibe en tu casa.
Descubre la colección completa de UNOde50 en BeFashion. Compra ahora.

RECURSOS ADICIONALES (extensiones), si la interfaz los ofrece:
  · Enlaces del sitio: Aros · Anillos · Pulseras · Collares
    (usa las URLs reales de esas colecciones si existen en befashion.cl)
  · Texto destacado: agrega solo lo que hayas podido verificar en el sitio.

╔═══════════════════════════════════════════════════════════════╗
║  PASO 6 — GRUPO DE ANUNCIOS 2: MARCA PROPIA                   ║
╚═══════════════════════════════════════════════════════════════╝

Nombre del grupo:  Marca BeFashion
URL final:         https://befashion.cl

PALABRAS CLAVE — concordancia exacta:

[be fashion]
[befashion]
[be fashion chile]
[befashion chile]
[be fashion joyas]
[befashion cl]

TÍTULOS (máx. 30 caracteres):

BeFashion Chile
BeFashion Joyas
Sitio Oficial BeFashion
Joyas y Accesorios
UNOde50, Tous y Más
Marcas Originales
Compra Online
Ver Catálogo
Joyería de Marca
Nuevos Ingresos

DESCRIPCIONES (máx. 90 caracteres):

Joyas y accesorios de marca en Chile. UNOde50, Tous y más en un solo lugar.
Compra online segura en el sitio oficial de BeFashion.
Descubre la colección completa. Marcas originales, stock disponible.
Aros, anillos, pulseras y collares de las mejores marcas.

╔═══════════════════════════════════════════════════════════════╗
║  PASO 7 — PALABRAS CLAVE NEGATIVAS (NIVEL CAMPAÑA)            ║
╚═══════════════════════════════════════════════════════════════╝

CRÍTICO: cárgalas ANTES de que la campaña pueda gastar. Si el gasto temprano
se fuga a búsquedas irrelevantes, el algoritmo se ancla a mala señal.

Ve a: Palabras clave → Negativas → Agregar a nivel CAMPAÑA.
Cárgalas en concordancia amplia (sin corchetes ni comillas):

gratis
gratuito
barato
baratos
como hacer
diy
manualidades
curso
cursos
aprender
tutorial
empleo
trabajo
vacante
mayorista
al por mayor
fabricante
proveedor
reparacion
reparar
arreglar
limpiar
tasacion
avaluo
segunda mano
usado
usada
replica
replicas
imitacion
falso
falsa
copia
outlet
descuento cupon
compro oro
empeño
casa de empeño
significado
historia de
quien es

╔═══════════════════════════════════════════════════════════════╗
║  PASO 8 — VERIFICACIÓN FINAL (obligatoria)                    ║
╚═══════════════════════════════════════════════════════════════╝

Antes de reportar, revisa UNO POR UNO y corrige lo que falle:

□ Estado de la campaña = PAUSADA
□ Tipo = Búsqueda (NO Performance Max)
□ Presupuesto diario = $6.667 CLP
□ Estrategia = Maximizar clics CON límite de CPC de $800
□ Red de Display = DESACTIVADA
□ Socios de búsqueda = DESACTIVADOS
□ AI Max = desactivado (o no disponible)
□ Ubicación = Chile, con "presencia" (no "interés")
□ Recomendaciones automáticas = DESACTIVADAS
□ Los 2 grupos creados, con TODAS las keywords en concordancia EXACTA
□ Ningún título supera 30 caracteres — cuéntalos de nuevo
□ Ninguna descripción supera 90 caracteres
□ Las ~40 negativas cargadas a nivel campaña
□ Las URLs finales abren correctamente (pruébalas)
□ No se ingresó ningún dato de pago

╔═══════════════════════════════════════════════════════════════╗
║  PASO 9 — REPORTE                                             ║
╚═══════════════════════════════════════════════════════════════╝

Entrega un resumen con:

1. Estado final de la campaña y confirmación de que está PAUSADA.
2. Resultado del pre-vuelo: ¿existía conversión de compra? ¿GA4 vinculado?
   ¿Qué recomendaciones automáticas desactivaste?
3. Qué afirmaciones descartaste de los anuncios por no poder verificarlas.
4. Qué opciones de la interfaz NO encontraste o se comportaron distinto.
5. Captura de pantalla del resumen de la campaña.
6. Lo que queda pendiente para que un humano active.

NO actives nada. Termina y espera aprobación.
```

---

## Notas para Seba (no van en el prompt)

**Por qué el CPC tope en $800:** con AOV de $232.624 y margen 30-40%, el techo teórico
es ~$1.163 (invirtiendo 25% del ticket, conversión 2%). Pero con $6.667/día, un CPC de
$1.163 son solo 5,7 clics diarios. **$800 da 8,3 clics/día** y deja aire para subir si
el volumen de impresiones sale bajo. Los términos de marca suelen costar bastante menos
— si el CPC real llega en $300, son 22 clics/día y ahí sí hay campaña.

**Lo que más riesgo tiene de fallar:** el pre-vuelo de conversiones. Si BeFashion no
tiene la conversión de compra configurada en Google Ads, la campaña corre a ciegas y no
vas a poder medir ROAS. El prompt está escrito para que el agente **se detenga** ahí en
vez de seguir.

**Después de que corra:** revisa el informe de términos de búsqueda **a los 7 días**.
Ese es el entregable real de esta campaña.
