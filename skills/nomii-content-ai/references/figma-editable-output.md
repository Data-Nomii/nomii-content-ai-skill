# Figma Editable Output

Figma is the preferred editable handoff surface for NOMII carousels. The agent should not treat PNG as the only final artifact when an editable workflow is required.

## Desired Flow

```text
Notion content row
-> NOMII skill
-> editorial/visual matrix
-> carousel JSON
-> NOMII Figma plugin/importer
-> editable Figma file
-> PNG export
-> Notion link/update
```

## Recommended Figma File

```text
NOMII Carousel System
```

Recommended pages:

```text
01 Components
02 Generated Carousels
```

## Component Families

The Figma system should contain master components equivalent to:

- `Portada tipo A - cover soft azul`;
- `Portada tipo B - cover soft blanco`;
- `Interior - card text`;
- `Interior - chat bubbles`;
- `Interior - 50/50`;
- `Intermedio - flat pause`;
- `Interior - pop-up card`;
- `Cierre - CTA`.

Each component must preserve:

- frame `1080x1440`;
- safe area top/bottom `85px`;
- safe area side `63px`;
- NOMII palette;
- Rubik typography;
- stable editable layer names.

## Stable Layer Names

Use predictable layer names so a plugin or importer can fill content:

```text
title
subtitle
caption
pill
body
bullet_1
bullet_2
bullet_3
chat_1
chat_2
chat_3
cta
image
logo
isotipo
background
```

For generated frames:

```text
slide_01
slide_02
slide_03
slide_04
slide_05
slide_06
```

## JSON Handoff

The agent should generate a `carousel.figma.json` file when editable output is required. Use `templates/carousel/figma-carousel.schema.json` as the working shape.

The JSON should include:

- carousel id;
- title;
- campaign objective;
- buyer persona;
- KPI;
- target Figma file;
- slide number;
- template;
- role;
- text zone;
- image requirements;
- field values;
- selected image path or ID;
- optional `image_focus`;
- optional `face_safe_required`.

## Plugin Operation

Expected plugin/importer flow:

1. Designer opens `NOMII Carousel System`.
2. Designer runs `NOMII Carousel Builder`.
3. Designer pastes or loads `carousel.figma.json`.
4. Plugin validates required components.
5. Plugin duplicates the component for each slide.
6. Plugin fills text layers.
7. Plugin replaces image layers.
8. Plugin applies focus/safe-area adjustments.
9. Plugin arranges slides horizontally.
10. Designer reviews and exports PNG.

## Notion Fields For Figma

Recommended fields:

- `Link Figma editable`;
- `Estado Figma`;
- `Fecha generacion Figma`;
- `Version Figma`;
- `Export PNG final`.

Recommended statuses:

- `Pendiente Figma`;
- `Generado en Figma`;
- `En ajuste diseno`;
- `Aprobado diseno`;
- `Exportado final`.

## Rule

If the user asks for editable output, do not stop at image files. Produce or request the Figma JSON handoff and describe what needs to be imported.
