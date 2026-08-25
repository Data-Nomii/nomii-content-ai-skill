# Notion Workflow

NOMII uses Notion as the operational repository for the content grid, strategy, design-system/image database, and delivery trace.

This skill may operate from a live Notion database or from a provided export. When live Notion access is not explicitly available, produce a structured update file instead of pretending to write.

## Content Grid Input

Each production item should come from a Notion row or equivalent export.

Minimum expected fields:

- title or carousel topic;
- brand;
- format/channel, for example `Carrusel`;
- production status;
- objective of the content;
- source, context, or brief;
- CTA;
- campaign objective when available;
- buyer persona when available;
- insight/pain when available;
- references or image candidates when available.

## Strategy Fields

The original NOMII project defined a richer grid so the agent can make better creative and performance decisions.

Recommended fields:

- `01 Objetivo de campana`;
- `02 Subobjetivo`;
- `03 KPI principal`;
- `04 KPI secundario`;
- `05 Hipotesis`;
- `06 Insight / dolor`;
- `07 Buyer persona`;
- `08 Nivel de conciencia`;
- `09 Variable a testear`;
- `10 Resultado esperado`;
- `11 Rol narrativo`;
- `12 Tipo de imagen`;
- `13 Zona de texto`;
- `14 Face-safe required`;
- `15 Image focus`;
- `16 CTA tipo`;
- `17 Estado diseno`;
- `18 Estado performance`;
- `19 Learning`;
- `20 Variante A/B`.

The first ten fields connect content to strategy and performance. Fields 11 to 16 translate strategy into visual decisions. Fields 17 to 20 close the loop for review and learning.

## Production States

Use the states configured by the current Notion database when available. If states are not provided, use this operational logic:

- `Idea` or `Brief`: not ready to produce.
- `Lista para producir`: can be transformed into a carousel.
- `En produccion`: agent is working.
- `En revision`: output exists and needs human review.
- `Aprobado`: ready for final export or publishing.
- `Publicado`: live.
- `Learning registrado`: performance or qualitative learning was logged.

Do not update a live row unless the execution environment has explicit Notion credentials and the user has authorized the write.

## Reading A Row

When reading a row:

1. Confirm it belongs to NOMII.
2. Confirm the format is relevant to the task.
3. Extract objective, source, CTA, buyer persona, and available campaign fields.
4. Check whether an output already exists to avoid duplicate work.
5. Identify missing fields that can be inferred safely from the brief.
6. Identify fields that need human confirmation.

## Enriching The Grid

The agent may enrich missing strategic fields when the source/context supports it. It should mark inferred values as inferred when preparing the Notion update.

Enrichment should improve:

- campaign objective;
- KPI;
- buyer persona;
- insight/pain;
- narrative role;
- image type;
- text zone;
- CTA type;
- learning hypothesis.

## Updating Notion

When a carousel is ready, prepare these updates:

- production status;
- slide-by-slide copy;
- selected image IDs or image names;
- reason for image selection;
- generated output links/files;
- Figma editable link or Figma JSON status;
- notes for human review;
- image usage increments when applicable;
- learning fields when post-publication information exists.

If live Notion write is unavailable, create:

```text
notion-update.md
```

The update should contain:

- row identifier or title;
- status recommendation;
- fields to update;
- files generated;
- image usage changes;
- open questions;
- approvals needed.

## Database And Data Source Notes

The source project recorded an image/design data source:

```text
BBDD Imagen Design
data source: 3ad4f31a-dda3-80ca-84c7-000b2c5115c1
```

Treat IDs as environment-specific. If a new workspace or export is provided, verify the database/schema before writing.
