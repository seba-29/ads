# Montaje Aniversario Palavas — registro de lo creado

**Cuenta:** `65286325` (Palavas Depilacion Laser ltda · CLP)
**Página:** Palavas Clínica Estética · `229013960595107`
**Fecha de montaje:** 24-ago-2026 · **Todo en PAUSA, sin anuncios**
**Vigencia configurada:** hasta **6-sep-2026 23:59**

---

## Lo creado

### CAMPAÑA 1 · `ANIV26 · FRÍO · Mensajes` — `52574873997115`
Objetivo **Interacción** · destino **WhatsApp** · optimización **CONVERSATIONS** · **ABO**

| Conjunto | ID | $/día | Geografía |
|---|---|---|---|
| `ANIV26 · DEPILACIÓN · Chillán · WhatsApp` | `52574874064715` | **$8.000** | Chillán +30 km |
| `ANIV26 · DEPILACIÓN · Santiago · WhatsApp` | `52574874140915` | **$14.000** | Sector oriente +6 km · Lo Barnechea +5 km |
| `ANIV26 · INYECTABLES+HARMONY · Santiago · WhatsApp` | `52574874159115` | **$10.000** | ídem + Chicureo/Colina +6 km |
| `ANIV26 · COSMETOLOGÍA · Chillán+Santiago · WhatsApp` | `52574874198315` | **$6.000** | Chillán + sector oriente |
| | | **$38.000** | |

### CAMPAÑA 2 · `ANIV26 · FRÍO · Formulario` — `52574874313915`
Objetivo **Clientes Potenciales** · optimización **LEAD_GENERATION** · **ABO**

| Conjunto | ID | $/día | Geografía |
|---|---|---|---|
| `ANIV26 · DEPILACIÓN · Chillán · Formulario` | `52574874333115` | **$8.000** | Chillán +30 km |

### CAMPAÑA 3 · `ANIV26 · RETARGETING · Mensajes` — `52574874232515`
Objetivo **Interacción** · **CBO $11.143/día** · público personalizado Advantage **OFF**

| Conjunto | ID | Públicos incluidos |
|---|---|---|
| `ANIV26 · RETARGETING · Todos · WhatsApp` | `52574874296115` | video 75% 90d · video 50% 90d · interacción IG 90d · interacción FB 90d · mensajes FB 30d · mensajes IG 30d |

**Total: $57.143/día × 14 días = $800.000** ✓

---

## Configuración aplicada en los 5 conjuntos de frío

```
Edad:                            18 – 65+ (como sugerencia; Advantage+ Audience activo)
Sexo:                            Todos
Tipo de ubicación:               Personas que viven en el lugar
Ubicaciones:                     Advantage automáticas
Público personalizado Advantage: ACTIVADO
Puja:                            Automática (LOWEST_COST_WITHOUT_CAP)
Exclusión aplicada:              Mensajes iniciados FB 30d + Mensajes iniciados IG 30d
```

En retargeting: **público personalizado Advantage = 0 (desactivado)**, confirmado en la
respuesta de la API.

---

## Diferencias con lo especificado

**1. La exclusión de clientes NO se pudo aplicar.** 🔴
La cuenta no tiene aceptados los términos de públicos personalizados. Error de la API:

> *Custom audience terms not accepted. To create or edit an ad with an uploaded customer
> list, agree to the custom audience terms.*

Se aceptan en: `https://business.facebook.com/ads/manage/customaudiences/tos/?act=65286325`

Mientras tanto se aplicó una exclusión que sí funciona (mensajes iniciados 30 días), que
evita que el frío y el retargeting compitan por la misma persona. **Pero el frío hoy le
está comprando impresiones a clientes actuales.** Al aceptar los términos hay que agregar
`meta_audience_clientes 2025 tiendas` (`52505255798715`, 10.300-12.200 personas) como
exclusión en los 5 conjuntos de frío.

**2. La página no tiene aceptados los términos de Lead Ads.** 🟡
`leadgen_tos_accepted: false` en Palavas Clínica Estética. El conjunto de formulario se
creó igual, pero **al crear el anuncio con el formulario va a fallar**.
Se aceptan en: `https://www.facebook.com/legal/leadgen/tos`

**3. Geografía por coordenadas, no por comuna.** 🟢
Se usaron radios desde coordenadas en vez de nombres de comuna. Chillán resolvió correcto
(`primary_city_id 325435`, región Ñuble). El radio de 6 km desde `-33.415, -70.575` cubre
Las Condes, Vitacura, Providencia, Ñuñoa y La Reina, y **deja fuera Santiago Centro** —
verificado por distancia. Lo Barnechea va aparte a 5 km.

**4. Meta amplió el tipo de ubicación en el primer conjunto.** 🟢
En Chillán quedó `["frequently_in", "home"]` en vez de solo `home`. Suma a quien está
frecuentemente en Chillán sin vivir ahí — para una clínica es razonable. Los demás
quedaron solo en `home`.

**5. Sin fecha de inicio.** 🟢
Se omitió a propósito: arrancan cuando se activen. La fecha de fin sí está fijada.

---

## Pendientes para poder encender

| # | Tarea | Quién | Bloquea |
|---|---|---|---|
| 1 | Aceptar términos de **públicos personalizados** | Cliente/BM | La exclusión de clientes |
| 2 | Aceptar términos de **Lead Ads** | Cliente/BM | Toda la Campaña 2 |
| 3 | Crear el formulario `ANIV26 · Chillán · Depilación` | Seba | Campaña 2 |
| 4 | Subir 3 anuncios por conjunto (18 espacios, 6 videos) | Valentina | Todo |
| 5 | Mensaje predeterminado por anuncio | Trafficker | Calidad del lead |
| 6 | Confirmar agente GHL con 4 categorías × 3 sucursales | Heat IA | Campaña 2 |
| 7 | Definir quién responde y en cuánto | Cliente | Encender |

**Nada de esto gasta un peso hasta que se active.** Además, un conjunto sin anuncios no
entrega aunque se active por error — hay doble red.
