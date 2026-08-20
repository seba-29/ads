# Cartera de clientes — Heat

Fichas de contexto por cliente. La skill `meta-ads` las lee antes de recomendar nada.

**Regla:** lo que no se sepa va como `?`. Nunca un dato inventado — contamina las 4
etapas del ciclo y no se nota hasta que la campaña no vende.

| Cliente | Cuenta | Moneda | Estado | Ficha |
|---|---|---|---|---|
| ASISTENCIA LEGAL | `755647789856028` | CLP | ✅ Activa | [ver](asistencia-legal.md) |
| CASA ZEN | `2252556455581103` | CLP | ✅ Activa | [ver](casa-zen.md) |
| PLAYMAKER | `231866284693734` | CLP | 🔴 Unsettled | [ver](playmaker.md) |
| BE FASHION | `27527316` | CLP | ✅ Activa | [ver](be-fashion.md) |
| DRA. VANESSA SILVA | `1321852590109746` | CLP | ✅ Activa | [ver](dra-vanessa-silva.md) |
| CLÍNICA PALAVAS | `65286325` (+3) | CLP | ✅ Activa · 1 deshabilitada | [ver](clinica-palavas.md) |
| RAÍCES FUTURAS | `26933616669645555` | CLP | 🔴 Unsettled | [ver](raices-futuras.md) |
| ESPACIO FUSIÓN | `?` | ? | ❓ Sin cuenta identificada | [ver](espacio-fusion.md) |
| CLÍNICA ONDEX | `1034674525430396` | CLP | ✅ Activa | [ver](clinica-ondex.md) |

*Estado verificado vía el conector MCP oficial de Meta. Se degrada rápido — reverificar
antes de operar.*

## Bloqueos que impiden trabajar

| Cliente | Problema | Desbloquea |
|---|---|---|
| **PLAYMAKER** | Saldo impago (cambió de activa a unsettled durante la sesión) | Facturación |
| **RAÍCES FUTURAS** | Saldo impago | Facturación |
| **CLÍNICA PALAVAS** | Una de sus cuentas marcada por actividad inusual, anuncios pausados | Contactar a soporte de Meta |
| **ESPACIO FUSIÓN** | Sin acceso a su cuenta publicitaria | Compartir acceso al BM |

## Qué necesita cada ficha para ser operable

Sin los tres primeros no hay recomendación de presupuesto posible:

1. **Ticket promedio** · 2. **Margen** · 3. **Meta de ventas mensual**
4. Destino de conversión (web / WhatsApp / form)
5. Estado de la medición (píxel, CAPI, `ctwa_clid`)
6. Qué corre hoy en la cuenta
