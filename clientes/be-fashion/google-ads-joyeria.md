# Be Fashion — Google Ads · Test de joyería

> Plan de la campaña de prueba en Google Ads. **Canal fuera de la skill `meta-ads`**
> (esa es específica de Meta). Investigado en agosto de 2026 — Google cambió bastante
> este año, verifica en la interfaz antes de dar algo por sentado.

---

## 1. La tesis y por qué es correcta

**Foco en joyería, no en carteras.** El razonamiento de Seba es el bueno: en Search se
compite por **intención que ya existe**, y en "cartera Michael Kors" la subasta la
dominan Falabella y Mercado Libre — con presupuesto, autoridad de dominio y feed. Ahí
el CPC duele y se pierde.

Joyería es mejor apuesta por una razón estructural: las búsquedas tienden a ser **más
específicas y menos dominadas por marca** ("aros de plata 925", "collar personalizado
con nombre", "anillo acero quirúrgico mujer"). Ahí un player chico sí puede rankear
rentable.

**Dato que respalda la categoría:** joyería y accesorios promedia **ROAS 2,5×** en
Google. Con márgenes típicos de la categoría (55-70%), el **ROAS de equilibrio es
1,43-1,82×**. O sea: la categoría deja margen real entre el punto de equilibrio y el
promedio. No es una apuesta ciega.

---

## 2. La decisión de tipo de campaña

Seba propuso **campaña de Ventas enfocada en Búsqueda**. Correcto **para este test**, y
conviene entender por qué, porque hay un matiz importante.

| Tipo | CPC promedio e-commerce | Qué aporta |
|---|---|---|
| **Búsqueda (texto)** | **~US$5,26** | **Te enseña los términos reales que busca la gente** |
| **Shopping** | **~US$0,66** | Tráfico mucho más barato, pero requiere Merchant Center + feed |
| **Performance Max** | — | Caja negra. Si el test sale mal, no sabes por qué |

> **El CPC de Shopping es ~8× más barato que el de Búsqueda.** Ese dato importa mucho
> para el mediano plazo.

**Aun así, Búsqueda es lo correcto para el test**, porque el objetivo de esta primera
campaña **no es rentabilidad, es aprendizaje**: el informe de términos de búsqueda te
dice qué pide realmente el mercado chileno, con qué palabras y con qué intención. Eso
es lo que después alimenta todo — incluida la campaña de Shopping.

**PMax queda descartado para el test** por lo mismo: no te deja leer nada.

### Fase 2 natural: Shopping
Si Be Fashion tiene catálogo en la web, **Shopping es donde está la economía real** de
un e-commerce de joyería. Requiere Google Merchant Center con feed de productos
verificado (títulos, precios, disponibilidad, imágenes, GTIN si aplica). Vale la pena
empezar a montarlo en paralelo, porque la verificación toma días.

> ⚠️ Desde el **31 de agosto de 2026** los anuncios de inventario local se aplican
> obligatoriamente a todas las campañas de Shopping. Si Be Fashion no tiene tienda
> física, revisar la configuración para que no distorsione.

---

## 3. ⛔ Lo que hay que tener ANTES de lanzar

**Sin esto no se lanza.** Es el equivalente al píxel + CAPI de Meta: si el algoritmo no
ve conversiones, optimiza a ciegas y el test no mide nada.

| Requisito | Detalle |
|---|---|
| **Etiqueta nativa de Google Ads** | **Fuente primaria** para Smart Bidding. No delegar en GA4 para esto. |
| **GA4 vinculado** | Para analítica, audiencias y reporte cross-canal. Enhanced Measurement activado. |
| **Conversiones mejoradas** | Envía datos hasheados de primera parte (email, teléfono). Reporta **+5-15% de conversiones** que de otro modo se pierden. |
| **Una conversión primaria por objetivo** | *Compra*. No marcar cinco cosas como primarias. |
| **Valor de conversión poblado** | Sin valor no hay ROAS, y sin ROAS no se puede juzgar el test. |
| **Ventana de conversión** | Joyería = compra considerada → **30 días**. |

*Consent Mode V2 es obligatorio solo para EEE/Reino Unido. Chile no lo exige, pero
implementarlo no hace daño.*

---

## 4. Estrategia de puja: el error más caro

> **NO arrancar en "Maximizar conversiones".**

Con **cero conversiones históricas**, Smart Bidding no tiene señal con qué trabajar y
produce **pujas erráticas**. Es el error más común al abrir una cuenta nueva.

**La secuencia correcta:**

```
Semanas 1-4  →  Maximizar clics CON límite de CPC
                (herramienta de recolección de datos, NO de optimización)
                     ↓
        ¿Ya hay ~30 conversiones en 30 días?
                     ↓
Semana 5+    →  Maximizar conversiones  →  después tCPA o tROAS
```

**El límite de CPC no es opcional** — sin él, "maximizar clics" puede dispararse.
Ponerlo en función de lo que el negocio aguanta (ver §6).

> **Nunca dejes una campaña en Maximizar clics indefinidamente.** Es un instrumento de
> recolección, no una estrategia.

**Regla de lectura:** Google mismo pide **mínimo 30 días y ~30 conversiones** antes de
concluir algo sobre una estrategia de puja. Es el equivalente a la Ley 0 de Meta — la
impaciencia también es cara acá.

---

## 5. Concordancias y negativas

### Concordancias: frase y exacta. **Amplia NO.**

| Concordancia | Cuándo |
|---|---|
| **Frase** | ✅ El arranque. Volumen razonable, control razonable. |
| **Exacta** | ✅ Para los ganadores, una vez identificados. |
| **Amplia** | ⛔ **No en los primeros 60 días.** |

**Por qué amplia no:** funciona solo cuando ya hay **30-50 conversiones al mes por
campaña** para que Smart Bidding la controle, más una lista de negativas madura. Sin
eso, la concordancia amplia se come el presupuesto en queries irrelevantes.

Ruta correcta: frase y exacta → juntar datos → depurar negativas → **recién ahí**
probar amplia como experimento aparte, con presupuesto acotado.

### Negativas: **antes** de lanzar, no después

Esto es crítico y casi nadie lo hace:

> Si el gasto temprano se fuga a queries basura **durante la fase de aprendizaje**, el
> algoritmo **se ancla a mala señal**. Y eso después cuesta corregirlo.

**Lista pre-lanzamiento (mínima) para joyería en Chile:**

```
gratis · gratuito · barato · como hacer · diy · manualidades
curso · aprender · tutorial · empleo · trabajo · vacante
mayorista · al por mayor · fabricante · proveedor
reparacion · arreglar · limpiar · tasacion · avaluo
segunda mano · usado · replica · imitacion · falso
oro (si NO se vende oro) · empeño · compro oro
```

Y las que dependen del catálogo real: si no vende oro, "oro" va como negativa; si no
vende compromiso, "anillo de compromiso" también.

**Revisar el informe de términos de búsqueda semanalmente el primer mes**, después cada
dos semanas. Ahí es donde está el aprendizaje real del test.

---

## 6. Presupuesto: el marco (faltan datos)

Para cerrar los números hacen falta **dos datos de la línea de joyería
específicamente** — probablemente distintos a los de carteras:

- **Ticket promedio** de joyería
- **Margen** de joyería

Con eso sale todo:

```
ROAS de equilibrio  = 1 ÷ margen
CPA máximo          = Ticket × margen
CPC máximo aceptable = CPA máximo × tasa de conversión esperada
```

**Referencia de tasa de conversión:** apparel y joyería promedian **2-3%** en Google.
Es prudente modelar con **2%** para el test.

**Ejemplo con números inventados** (reemplazar por los reales):
> Ticket $40.000 CLP · margen 60% → ROAS equilibrio 1,67× · CPA máximo $24.000 CLP.
> Con conversión 2% → **CPC máximo ~$480 CLP**. Ese es el límite de puja.

**Duración mínima del test:** 30 días. Menos que eso no concluye nada — y con
presupuesto muy bajo, tampoco.

> ⚠️ **No hay benchmarks públicos confiables de Chile.** Los datos de CPC de arriba son
> de mercados US/EU, donde el e-commerce en búsqueda subió a ~US$2,61 (+33% interanual)
> y hasta US$5,26 según la fuente. **En Chile los CPC suelen ser bastante más bajos**,
> pero no voy a inventar la cifra: se calibra con datos reales de la primera semana.

---

## 7. Estructura de la campaña

**Un tema de intención por grupo de anuncios.** No un grupo gigante con todo adentro —
Smart Bidding necesita señales limpias para saber qué convierte.

```
CAMPAÑA · Búsqueda · Joyería · Chile
│  Puja: Maximizar clics + límite de CPC  (fase 1)
│  Ubicación: Chile (o solo RM si el envío lo justifica)
│  Idioma: español
│  Negativas: la lista de §5 a nivel campaña
│
├── GRUPO · Aros
│     frase: "aros de plata", "aros mujer", "aros minimalistas"
│     RSA propio + landing de la categoría aros
│
├── GRUPO · Collares
│     frase: "collar personalizado", "collar con nombre", "cadena de plata mujer"
│     RSA propio + landing de collares
│
├── GRUPO · Anillos
│     frase: "anillo de plata mujer", "anillo acero quirúrgico"
│
└── GRUPO · Marca (si la marca tiene búsquedas propias)
      exacta: "be fashion", variantes
      Separado siempre: si no, el CTR de marca infla el promedio y no ves la verdad
```

**Cada grupo con su propia landing** de esa categoría. Mandar todo a la home mata la
conversión y baja el nivel de calidad.

**RSA:** un anuncio adaptable por grupo, con titulares que incluyan el término del tema.
Google 2026 ofrece **AI Max para Búsqueda** como capa opcional que expande coincidencias
y genera copy — **déjalo apagado en el test**, por la misma razón que PMax: quita
legibilidad.

---

## 8. Cómo se lee el test

**No juzgues por ROAS la primera semana.** El orden de lectura:

| Semana | Qué mirar | Qué decidir |
|---|---|---|
| 1 | Términos de búsqueda | Depurar negativas. Nada más. |
| 2 | Términos + CTR por grupo | Ajustar copy de los RSA débiles |
| 3-4 | Clics, costo, primeras conversiones | ¿Alcanzan ~30 conversiones/mes? |
| 5+ | CPA y ROAS reales | Cambiar a Maximizar conversiones · pausar grupos bajo equilibrio |

**El entregable real del test no es la venta: son los términos.** Salir de este mes
sabiendo qué busca el mercado chileno de joyería, con qué palabras y a qué costo, vale
más que las ventas que genere.

---

## 9. Checklist de lanzamiento

- [ ] Ticket promedio y margen **de joyería** confirmados con la clienta
- [ ] CPA máximo y CPC límite calculados
- [ ] Etiqueta de conversión de Google Ads instalada y **probada**
- [ ] GA4 vinculado · conversiones mejoradas activadas
- [ ] Valor de conversión poblado (sin esto no hay ROAS)
- [ ] Ventana de conversión en 30 días
- [ ] Lista de negativas cargada **antes** de activar
- [ ] Grupos por tema de intención, cada uno con su landing
- [ ] Puja en **Maximizar clics con límite de CPC**
- [ ] **AI Max apagado**
- [ ] Campaña de marca separada
- [ ] Recordatorio: revisar términos de búsqueda **a los 7 días**
- [ ] Expectativa alineada con la clienta: **el test dura 30 días** y el primer
      entregable son aprendizajes, no ventas

---

## Fuentes

- [Google Ads Updates 2026 — cambios del año](https://groas.ai/post/google-ads-updates-2026-every-major-change-campaign-impact)
- [Performance Max vs Search en 2026](https://www.groas.com/post/performance-max-vs-search-campaigns-in-2026-what-changed-and-what-to-use)
- [Estrategias de puja 2026](https://www.groas.com/post/google-ads-bidding-strategies-2026-target-cpa-vs-target-roas-vs-max-conversions)
- [Concordancias de palabras clave 2026](https://www.stackmatix.com/blog/google-ads-keyword-match-types-guide)
- [Conversion tracking 2026: GA4 + Enhanced Conversions](https://www.groas.com/post/google-ads-conversion-tracking-setup-2026-the-complete-guide-ga4-enhanced-conversions-consent-mode)
- [Benchmarks Google Ads 2026 por industria](https://www.wordstream.com/blog/2026-google-ads-benchmarks)
- [Benchmarks de Google Shopping por categoría 2026](https://foundrycro.com/blog/google-shopping-benchmarks-by-category-2026/)
