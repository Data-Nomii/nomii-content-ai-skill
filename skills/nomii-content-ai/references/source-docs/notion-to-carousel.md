# Workflow: Notion to Carousel

## Entrada

Una fila de Notion marcada como lista para producir.

Campos minimos esperados:

- Titulo o tema del carrusel.
- Marca.
- Estado.
- Objetivo del contenido.
- Fuente o contexto.
- CTA.
- Canal/formato.

## Proceso

1. Leer la fila y sus fuentes.
2. Validar que tenga marca, objetivo, fuente y CTA.
3. Seleccionar la skill/design system de la marca.
4. Consultar la BBDD Imagen Design y seleccionar imagenes por alineamiento visual/comunicacional, rol de lamina, espacio para texto, calidad tecnica y `veces_usada`.
5. Convertir la fuente en content spine: hook, puntos clave, objeciones, ejemplos y CTA.
6. Redactar copy por lamina.
7. Construir artefacto visual.
8. Generar `carousel.figma.json` cuando la pieza deba quedar editable.
9. Revisar reglas de marca, safe area, legibilidad y coherencia de imagen.
10. Preparar salida para Notion y actualizar trazabilidad de imagenes usadas.

## Salida

Carpeta por carrusel en `outputs/` con:

- `brief.md`
- `copy.md`
- `artifact.html` cuando aplique
- `carousel.figma.json` cuando se genere salida editable Figma
- `exports/` con imagenes finales cuando aplique
- `notion-update.md` con el resumen a cargar

## Seleccion de imagenes

La seleccion visual debe usar el protocolo central de `docs/nomii-system-protocols.md`.

Criterios minimos:

- alineamiento con objetivo del contenido y etapa funnel;
- rol de lamina: portada, contexto, prueba, comparacion o CTA;
- espacio para texto y safe area;
- tono NOMII profesional, humano y claro;
- calidad tecnica apta para 1080x1440;
- diversidad y bajo `veces_usada` cuando existan opciones equivalentes.

## Salida editable Figma

Decision 2026-07-24: Figma queda como salida editable principal para el disenador.

Flujo:

1. El agente genera JSON estructurado desde Notion y la matriz NOMII.
2. El plugin/importador Figma duplica componentes maestros por tipo de lamina.
3. El disenador ajusta texto, imagenes, composicion o capas dentro de Figma.
4. Se exportan PNG finales.
5. Notion guarda link Figma editable + imagenes finales.

Columnas recomendadas en Notion:

- `Link Figma editable`
- `Estado Figma`
- `Fecha generacion Figma`
- `Version Figma`
- `Export PNG final`

## Decision pendiente

Falta definir si la carga a Notion sera automatica o semiautomatica con aprobacion previa, y si el primer importador Figma sera plugin local privado o integracion conectada por OAuth.
