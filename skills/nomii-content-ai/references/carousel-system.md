# Carousel System

NOMII carousels are structured sequences, not isolated slides. Each slide should have a narrative role and a visual template chosen from the design system.

## Slide Families

The source project identified these canonical slide families:

- `CoverSlide`;
- `CardTextSlide`;
- `ChatSlide`;
- `FiftyFiftySlide`;
- `FlatPauseSlide`;
- `PopoutSlide`;
- `CtaSlide`.

## Canonical Template Names

Use names that combine narrative type and visual variant.

- `Portada tipo A - cover soft azul`
- `Portada tipo B - cover soft blanco`
- `Interior - card text`
- `Interior - chat bubbles`
- `Interior - 50/50`
- `Intermedio - flat pause`
- `Interior - pop-up card`
- `Cierre - CTA`

## Template Rules

### Portada tipo A - cover soft azul

Use when:

- there is a human protagonist;
- the hook should feel emotional, human, or aspirational;
- the face is an important visual asset.

Rules:

- full-bleed image;
- blue lower gradient;
- white text below;
- optional pill;
- preserve face and upper torso;
- recommended focus: `center 35%`.

### Portada tipo B - cover soft blanco

Use when:

- the image is wide, contextual, institutional, or architectural;
- the text needs to live near the top;
- the image is not dependent on a dominant face.

Rules:

- full-bleed image;
- light/white upper gradient;
- dark text below logo zone;
- blue logo;
- avoid dominant close-up faces in the top text zone.

### Interior - card text

Use for explanation, definition, context, expectation vs reality, or a short list.

Rules:

- image in rounded card;
- short title;
- 1 to 3 body lines or bullets;
- no more than 65 to 75 words.

### Interior - chat bubbles

Use for doubts, objections, inner thoughts, or empathy.

Rules:

- no image needed;
- 2 to 4 bubbles;
- each bubble should carry one short idea;
- avoid paragraph-length bubbles.

### Interior - 50/50

Use for contrast, transition, before/after, or problem/path split.

Rules:

- image and text with balanced weight;
- avoid text over 45 to 55 words;
- check logo contrast if image occupies upper area.

### Intermedio - flat pause

Use for emotional pause, bridge, or memorable sentence.

Rules:

- background and text only;
- short phrase;
- strong hierarchy;
- do not overload with explanation.

### Interior - pop-up card

Use for emphasis, chips, short proof points, or a visual card with supporting bubbles.

Rules:

- keep hierarchy tight;
- avoid too many chips;
- image must remain secondary to the point.

### Cierre - CTA

Use for final action.

Rules:

- clear CTA;
- isotype centered when the template requires it;
- no new argument unless it directly supports the CTA.

## Editorial Spine

Typical sequence:

1. Hook.
2. Context/tension.
3. Explanation.
4. Proof or reframing.
5. Objection or bridge.
6. CTA.

Adapt slide count to the task, but preserve progression: stop scroll, deepen relevance, create trust, ask for action.

## Copy Rules

- Write in Spanish.
- Speak to `tu`.
- Keep each slide focused on one idea.
- Use short lines and clear hierarchy.
- Avoid generic filler.
- Tie the CTA to the campaign objective.

## QA Before Export

Block the output if:

- template does not match slide role;
- cover text covers a face;
- text is outside safe area;
- logo is illegible;
- copy is too dense;
- image is generic or unrelated to the insight;
- CTA is vague;
- output lacks a Notion update when the workflow started from Notion;
- output lacks Figma JSON when editable handoff was requested.
