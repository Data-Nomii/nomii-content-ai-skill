# NOMII Content AI system protocols

Fecha de consolidacion: 2026-08-14

Este documento deja el repo listo para que otro colaborador entienda el sistema NOMII Content AI sin depender de memoria verbal. El centro del sistema es Notion; el repo contiene la skill, scripts, protocolos, design system, salidas generadas y trazabilidad tecnica.

## 1. Principios operativos

- Usar siempre el project root: `<project-root>`.
- Usar Notion NOMII solo mediante `scripts/with-nomii-notion-env.sh`.
- No usar credenciales PUC, Campus Digital, ToK ni conectores globales.
- No commitear secretos reales. El token NOMII vive en `<secure-local-secret-store>`.
- Antes de operar Notion, correr `scripts/nomii-notion-preflight.sh --online`.
- Cada carrusel debe cerrar con salida final y salida editable cuando aplique: PNG/HTML/deck mas `carousel.figma.json` o link Figma editable.

## 2. Sistema que optimiza la BBDD de diseno

La BBDD de diseno vive en Notion y actua como repositorio operativo de imagenes, assets, piezas y aprendizaje.

Fuente validada:

```text
BBDD Imagen Design
data source: 3ad4f31a-dda3-80ca-84c7-000b2c5115c1
```

El objetivo de optimizacion es convertir un banco visual desordenado en una base consultable por criterio editorial, visual y de performance.

Campos operativos esperados:

- `elementos_visibles`: objetos, personas, contexto medico, documentos, ciudad, aula, hospital.
- `composicion`: primer plano, plano medio, espacio negativo, foco central, foco lateral.
- `tono_visual`: formal, humano, editorial, aspiracional, tecnico, corporativo.
- `clima_visual`: soleado, exterior neutro, interior frio, interior calido.
- `luminosidad`: alta, media, baja.
- `espacio_para_texto`: alto, medio, bajo.
- `personas_presentes`: ninguna, una persona, profesional de salud, grupo, estudiante, paciente.
- `pais` y `tipo_lugar`: ayudan a filtrar Alemania, hospitales, universidad, oficinas o gobierno.
- `uso_recomendado_en_carousel`: portada, contexto, prueba, comparacion, cierre, fondo.
- `tema_comunicacional`: homologacion, Alemania, financiamiento, estudio, proceso, confianza profesional.
- `emocion_transmitida`: calma, confianza, urgencia, progreso, autoridad, cercania.
- `embedding_visual` y `embedding_comunicacional`: texto semantico para busqueda y ranking.
- `veces_usada`: contador para evitar repetir imagenes y distribuir el banco.
- `confidence_score`: confianza de clasificacion.

La optimizacion no borra la fuente. Agrega metadata, trazabilidad y criterios de seleccion para que el agente pueda elegir imagenes con mejor alineamiento.

Script principal:

```bash
scripts/classify-image-bank-to-notion.js
```

Trazabilidad local:

```text
imports/drive-banco-imagenes/gdown-inventory.json
imports/drive-banco-imagenes/classification/classification-log.jsonl
imports/drive-banco-imagenes/classification/classification-errors.jsonl
```

Los JPG/HEIC brutos del Drive no se versionan en Git normal. Permanecen en Drive/Notion para no convertir el repo en un binario de varios GB.

## 3. Sistema que clasifica imagenes y elige las mas alineadas

La clasificacion tiene dos capas:

1. Metadata visual objetiva: que aparece en la imagen, composicion, orientacion, resolucion, espacio para texto, luminosidad.
2. Metadata comunicacional: que mensaje ayuda a comunicar, emocion, tema, rol recomendado dentro del carrusel.

Para seleccionar imagenes en un carrusel, el agente debe rankear por:

- alineamiento con objetivo del contenido y etapa funnel;
- compatibilidad con el rol de la lamina;
- espacio para texto y safe area;
- coherencia con tono NOMII: profesional, humano, claro, sin dramatismo;
- calidad tecnica suficiente para 1080x1440;
- diversidad frente a imagenes usadas recientemente;
- `veces_usada` bajo cuando existan opciones equivalentes;
- ausencia de elementos que compitan con el copy o tapen rostros/logos.

Reglas por tipo de lamina:

- Portada: priorizar imagen con foco claro, rostro/contexto humano o simbolo aspiracional, y espacio de texto alto o medio.
- Contexto/problema: usar escenas reconocibles que expliquen tension profesional, tramite, estudio o sistema medico.
- Prueba/autoridad: preferir hospital, institucion, documento, Alemania o profesionales en accion.
- Comparacion: priorizar composiciones limpias con espacio lateral.
- Cierre/CTA: usar imagen mas calma, aspiracional o de avance, no imagen de urgencia excesiva.

Cuando se usa una imagen desde Notion, se debe incrementar `veces_usada` y dejar registro en el output del carrusel.

## 4. Sistema de skill NOMII

La skill es la autoridad de marca para generar piezas NOMII.

Entradas principales:

```text
SKILL.md
design-system/SKILL.md
design-system/readme.md
design-system/tokens/
design-system/components/
design-system/guidelines/
design-system/ui_kits/carousel/
```

Reglas esenciales:

- Colores: celeste `#77BFD0`, azul `#104574`, texto `#3C3C3B`, fondo suave `#F8F8F8`.
- Tipografia: Rubik Light, Rubik Medium y Rubik Medium Italic. No usar bold.
- Voz: espanol, empatica y estrategica, segunda persona `tu`.
- Carrusel: 1080x1440, safe area superior/inferior 85px, laterales 63px.
- Logo: usar assets oficiales, no redibujar ni recolorear.
- CTA: cierre claro, con isotipo centrado cuando corresponde.

La skill no es solo un prompt. Es un contrato entre marca, layout, copy, banco de imagenes y salida editable.

## 5. Flujo Notion a carrusel

1. Leer fila de Notion marcada como lista para producir.
2. Validar objetivo, fuente, marca, CTA y formato.
3. Construir spine editorial: hook, tension, argumento, prueba, objeciones, cierre.
4. Seleccionar imagenes desde BBDD Imagen Design usando el ranking de alineamiento.
5. Redactar copy por lamina con voz NOMII.
6. Construir HTML/PNG/deck usando design system.
7. Generar `carousel.figma.json` cuando el carrusel deba quedar editable.
8. Revisar legibilidad, marca, safe area y coherencia visual.
9. Subir o preparar salida para Notion: links, archivos finales, estado y notas.
10. Actualizar contadores de imagenes usadas.

Salidas esperadas por carrusel:

```text
outputs/<slug>/copy.md
outputs/<slug>/index.html
outputs/<slug>/lamina-*.png
outputs/<slug>/carousel.figma.json
outputs/<slug>/notion-update.md
```

## 6. Figma editable

Decision operativa: todo carrusel final que se disene con protocolos NOMII debe poder terminar en Figma editable, no solo en PNG o HTML.

Contrato:

- El agente genera `carousel.figma.json`.
- El plugin/importador Figma lee ese JSON.
- El archivo maestro Figma duplica componentes por tipo de lamina.
- El disenador ajusta texto, imagen, jerarquia o composicion dentro de Figma.
- Notion guarda `Link Figma editable`, `Estado Figma`, `Version Figma` y export final.

Archivo maestro recomendado:

```text
NOMII Carousel System
```

Paginas recomendadas:

```text
01 Components
02 Generated Carousels
```

Plugin local:

```text
figma/nomii-carousel-builder/
```

MCP remoto Figma puede usarse para lectura/export cuando el cliente OAuth lo soporte. La creacion editable principal sigue siendo el plugin de Figma.

## 7. Estado validado

- Acceso NOMII Notion validado con wrapper del proyecto.
- BBDD Imagen Design importada desde Drive y clasificada.
- Clasificacion completa validada: 567 filas Drive clasificadas, 576 filas totales, 0 pendientes.
- Figma definido como salida editable principal.
- Plugin local MVP `NOMII Carousel Builder` creado.
- `carousel.figma.json` ya existe en salidas de ejemplo.

## 8. Como retomar

```bash
cd <project-root>
scripts/nomii-notion-preflight.sh --online
```

Para generar o revisar un carrusel, leer primero:

```text
README.md
PROJECT_ACCESS.md
SKILL.md
design-system/SKILL.md
workflows/notion-to-carousel.md
docs/nomii-system-protocols.md
docs/figma-editable-carousel-integration-2026-07-24.md
```
