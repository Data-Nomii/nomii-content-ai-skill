# NOMII — Notion update (3 carruseles BOFU financiamiento)

Fecha: 2026-08-19
Fuente: grid "Design Systema AI" (collection://3a64f31a-dda3-802b-9eab-000bfea7ec9c)
Banco: "BBDD Imagen Design" (collection://3ad4f31a-dda3-80ca-84c7-000b2c5115c1)

> El conector Notion tiene acceso de **lectura** (páginas públicas), pero **no de edición**,
> así que los incrementos de `veces_usada` NO se escribieron en vivo (403 restricted_resource).
> Aplicar manualmente, o dar permiso de edición al conector y reintento.

## Carruseles generados (subidos a Canva, editables)

| # | Fila del grid | Láminas | Canva (editar) |
|---|---|---|---|
| 1 | BOFU piloto financiamiento - Cuánto necesito para comenzar | 7 | https://www.canva.com/d/dHSzgfchN0R8NVv |
| 2 | BOFU piloto financiamiento - Por qué los cupos son limitados | 6 | https://www.canva.com/d/r4n0Kf8vGvFc6tt |
| 3 | BOFU piloto financiamiento - No esperes otro año | 7 | https://www.canva.com/d/NVVNRxJgHM6hbA5 |

Copy tomado textual del `Copy/ Guión` de cada fila. Templates mapeados: Cover soft (A),
Card text, Fifty-fifty, Flat pause, CTA — según `Tipo de láminas` y voz NOMII.

## Imágenes seleccionadas del banco (por rol de slide)

Criterio: `espacio_para_texto` alto/medio, `luminosidad` alta/media, tono NOMII (sin
dramatismo), coherencia con `Dirección fotográfica` de la fila, y **menor `veces_usada`**
(todas estaban en 0).

| Carrusel | Slide/rol | Imagen (ID) | Por qué | veces_usada |
|---|---|---|---|---|
| C1 | Portada | #243 Medical Backoffice — iStock-1041114810 | laptop+documentos, "planificación financiera", espacio texto Alto | 0 → **1** |
| C1 | Interior (card/50-50) | #93 Documentación — iStock-852404126 | documento/proceso, orden/autoridad | 0 → **1** |
| C2 | Portada | #533 Reunión online — iStock-522371050 | evaluación/videollamada, vertical, espacio Alto | 0 → **1** |
| C2 | Interior | #285 Médico en consulta — iStock-2208940892 | revisión individual, dos profesionales, confianza | 0 → **1** |
| C3 | Portada | #403 Médicos — iStock-2214960582 | aspiracional, avance/futuro profesional | 0 → **1** |
| C3 | Interior | #502 Proceso homologación — iStock-854190936 | proceso hacia Alemania, orden | 0 → **1** |

### Incrementos a aplicar (`veces_usada` = 1)

- #243 → https://app.notion.com/p/3ad4f31adda38105bb1dd23801c8ddaf
- #93  → https://app.notion.com/p/3ad4f31adda381058b7adbba3e679d22
- #533 → https://app.notion.com/p/3ad4f31adda3810e9130ee654d135660
- #285 → https://app.notion.com/p/3ad4f31adda3810383f3ede52c80373b
- #403 → https://app.notion.com/p/3ad4f31adda38110852ef132359e01f4
- #502 → https://app.notion.com/p/3ad4f31adda38108b53bc717ee3cd564

## Imágenes en los diseños

Los slots de foto en Canva son **placeholders NOMII que nombran la imagen seleccionada**.
Motivo: los archivos viven en Notion/Drive sin URL pública HTTPS fetcheable por Canva, y
descargar los bytes originales (iStock ~3863×2578) no es viable en este entorno.
Acción del diseñador: arrastrar cada imagen listada arriba (desde Notion "Archivos y
multimedia" o Drive) al slot correspondiente en Canva.

## Estado sugerido de las filas del grid

- Estado AI: `Diseño generado`
- Nota: "3 carruseles maquetados y subidos a Canva (editables). Pendiente: colocar fotos del banco (ver notion-update)."
