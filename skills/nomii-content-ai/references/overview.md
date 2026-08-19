# NOMII Content AI Overview

NOMII Content AI is a content production system for NOMII, a medical recruitment and professional migration brand focused on Germany. The system turns structured content rows into branded carousels, visual assets, and editable design handoff.

The center of the system is Notion. Notion holds the content grid, strategic fields, image/design database, status, and delivery trace. The skill governs how an agent reads that grid, enriches the row, selects images, applies the design system, and prepares the output back to Notion.

## Operating Idea

The agent should not begin from a loose prompt. It should begin from a row, brief, or exported table that contains the content objective and context. From there, it makes structured decisions:

- campaign objective;
- buyer persona;
- insight or pain;
- KPI;
- narrative role by slide;
- visual template;
- image type and safe area;
- copy limits;
- CTA;
- Figma/editable output.

## Canonical Workflow

```text
Notion content grid
-> NOMII Content AI skill
-> strategy/editorial matrix
-> image design database ranking
-> NOMII carousel system
-> HTML/PNG and/or Figma JSON
-> Notion update
```

## Important Source Decisions Captured

- Notion remains the control center.
- The design-system/image database should be enriched rather than overwritten.
- The image database is used to evaluate and select images, not merely to store files.
- Each visual output must relate to the campaign objective, buyer persona, slide role, image constraints, and performance learning.
- Figma is the preferred editable handoff surface.

## Minimum Context Needed To Work

For a content task, the agent needs one of:

- a Notion row;
- a CSV/JSON export of the grid row;
- a manually pasted brief containing the same fields.

For image selection, the agent needs one of:

- a classified image/design database export;
- a subset of candidate image rows with metadata;
- explicit user-provided image choices with enough visual notes.

For final upload, the agent needs:

- a safe Notion integration in the execution environment, or
- a `notion-update.md` summary for a human/operator to paste or apply.
