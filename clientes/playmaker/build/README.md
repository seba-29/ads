# Playmaker · Google Ads — archivos de carga

Cuatro CSV listos para **Google Ads Editor**. El criterio y la aritmética están en
`../google-ads-futbol.md` — este archivo es solo el procedimiento de carga.

Todos los archivos van en UTF-8 con BOM (Editor lo pide para leer bien las tildes).

| Archivo | Qué trae |
|---|---|
| `01-palabras-clave.csv` | 61 palabras clave · exacta y frase · con CPC máx. y URL final |
| `02-negativas-campana.csv` | 137 negativas de campaña, en 8 bloques temáticos |
| `03-anuncios-rsa.csv` | 5 anuncios adaptables · 70 títulos · 20 descripciones |
| `04-extensiones.csv` | 4 sitelinks · 8 textos destacados · 2 fragmentos · 1 llamada |

---

## Orden de carga

**1. Crear las dos campañas a mano en la interfaz** (Editor maneja mal la configuración
de campaña; son 5 minutos de clics):

| | Campaña A | Campaña B |
|---|---|---|
| Nombre | `PMK \| Search \| Futbol Clubes \| CL` | `PMK \| Search \| Marca \| CL` |
| Tipo | Búsqueda, sin Display | Búsqueda, sin Display |
| Presupuesto diario | **$14.000 CLP** | **$1.500 CLP** |
| Puja | Maximizar clics · CPC máx. **$600** | Maximizar clics · CPC máx. **$250** |
| Socios de búsqueda | Desactivados | Desactivados |
| Ubicación | Chile · **Presencia** | Chile · **Presencia** |
| Idioma | Español | Español |
| Programación | L-V 08:00–21:00 · S-D 10:00–19:00 | Igual |
| Estado inicial | **Pausada** | **Pausada** |

**2. `02-negativas-campana.csv` primero.** Antes que nada. Borrar la última columna
(`Grupo`) antes de importar — es una nota, no un campo de Editor.

**3. `01-palabras-clave.csv`.** Editor crea los grupos de anuncios solos a partir de la
columna `Ad Group`.

**4. `03-anuncios-rsa.csv`.** Revisar que las fijaciones hayan quedado:
`Desde 12 Unidades` en posición 2 (grupos de fútbol) y `Playmaker Chile` en posición 1
(marca). Si Editor no las toma, se fijan a mano — son 5 clics y **no son opcionales**.

**5. `04-extensiones.csv` a mano en la interfaz.** El formato de recursos de Editor
cambia seguido; con este volumen no compensa pelearlo. La columna `Tipo` dice dónde va
cada fila.

**6. Publicar con las campañas PAUSADAS.** Encender solo después del checklist bloqueante
(sección 9 del documento principal).

---

## Antes de publicar

- [ ] Las conversiones ya están creadas y **probadas con un envío real**
- [ ] Las negativas están cargadas (paso 2, no al final)
- [ ] Las URLs finales responden 200 — `/45-stockclubes` está caída (404), no usarla
- [ ] El teléfono del recurso de llamada está confirmado con el cliente
- [ ] Las campañas quedan en pausa hasta que ventas confirme el SLA de 1 hora

## Verificar los CSV antes de importar

```bash
cd clientes/playmaker/build
python3 - <<'EOF'
import csv, glob
for f in sorted(glob.glob("0*.csv")):
    r = list(csv.reader(open(f, encoding="utf-8-sig")))
    print(f"{f}: {len(r)-1} filas, {len(r[0])} columnas")
EOF
```
