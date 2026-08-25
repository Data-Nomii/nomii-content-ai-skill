---
name: nomii-content-ai
description: Use this skill whenever working on NOMII Content AI, NOMII carousels, NOMII brand/design assets, Notion content grids, classified image banks, design-system image selection, Figma-editable carousel handoff, or any workflow that turns a Notion row or content brief into NOMII social content. This skill should trigger even if the user only mentions NOMII, a carousel, the Notion grid, the image/design database, Figma output, or keeping the NOMII brand identity consistent.
---

# NOMII Content AI

This skill lets an agent operate NOMII content production without receiving the full project repo, private agent memory, or secrets. It captures the minimum useful system: brand identity, design rules, Notion grid workflow, image design database, carousel production, and editable Figma handoff.

## Core Rule

Treat NOMII as a system, not as a one-off prompt. A good output starts from the Notion row or approved brief, uses the design-system/image database to choose visual direction, creates a structured carousel plan, renders or specifies assets with NOMII brand rules, and prepares a Notion/Figma update.

## When Starting

If the task touches Notion, first read `references/notion-workflow.md`.

If the task touches design, brand, carousel layouts, or visual output, read `references/brand-and-design.md` and `references/carousel-system.md`.

If the task touches image selection, image generation, image classification, or the design-system/image database, read `references/image-design-database.md`.

If the task asks for a Figma-editable deliverable, read `references/figma-editable-output.md`.

If the task asks for what is allowed to be shared or operated, read `references/boundaries.md`.

## Required Production Flow

1. Read the Notion row or the provided content-grid export.
2. Confirm the row has topic/title, objective, source/context, CTA, brand, and format.
3. Enrich or infer the strategy fields only when the user or workflow allows it.
4. Build the editorial spine: hook, tension, proof, objection, CTA.
5. Choose the narrative role and visual template for each slide.
6. Use the image design database or provided classified image table to select images by role, fit, safe area, tone, and usage history.
7. Write Spanish copy in NOMII voice: empathetic first, strategic second, direct second person `tu`.
8. Build the carousel or handoff spec using the NOMII design rules.
9. Validate brand, safe areas, legibility, logo usage, image fit, and CTA.
10. Prepare the update back to Notion and the Figma-editable output when required.

## Brand Invariants

- Format: vertical carousel `1080x1440`.
- Safe area: `85px` top/bottom and `63px` sides.
- Main colors: celeste `#77BFD0`, azul `#104574`, dark text `#3C3C3B`, soft background `#F8F8F8`.
- Type: Rubik only. Use Light for body, Medium for titles/keywords, Medium Italic for emphasis. Do not use bold.
- Logo: use official assets only. Do not redraw, recolor, trace, or approximate the logo/isotype.
- Voice: Spanish, empathetic, strategic, clear, second person `tu`.
- Do not use emoji in NOMII production copy.

## Expected Deliverables

For a produced carousel, create or request these artifacts:

```text
outputs/<slug>/brief.md
outputs/<slug>/copy.md
outputs/<slug>/index.html or artifact.html
outputs/<slug>/exports/slide-*.png
outputs/<slug>/carousel.figma.json
outputs/<slug>/notion-update.md
```

If working outside the original repo, keep the same logical structure even if the physical paths differ.

## Never Do

- Do not rely on private agent memory as a source of truth.
- Do not ask the user to paste tokens, OAuth codes, callback URLs, or secrets into chat.
- Do not use unrelated project credentials or global Notion connectors by assumption.
- Do not invent Notion rows, database IDs, image usage counts, or live state when only a static export was provided.
- Do not generate pretty images disconnected from the objective, buyer persona, insight, and slide role.
- Do not ship only PNGs when the task requires editable Figma handoff.

## Useful Files In This Skill

- `references/overview.md`: system map and purpose.
- `references/notion-workflow.md`: Notion grid, fields, states, and update process.
- `references/image-design-database.md`: image DB schema, classification, ranking, and usage rules.
- `references/brand-and-design.md`: identity, voice, color, type, assets.
- `references/carousel-system.md`: slide families, narrative roles, validation.
- `references/figma-editable-output.md`: Figma JSON contract and plugin handoff.
- `references/boundaries.md`: security and sharing limits.
- `references/source-docs/`: copied source documents from the NOMII project, including the system protocol, design matrix, image matrix, Notion workflow, and Figma decision docs. Read these when the summarized references are not enough.
- `design-system/`: copied NOMII tokens, components, carousel UI kit, templates, and guideline cards from the working design system. Use this for visual production details.
- `assets/`: official marks, key visuals, and Rubik font files needed to keep brand identity consistent.
- `templates/carousel/figma-carousel.schema.json`: suggested editable carousel JSON shape.
