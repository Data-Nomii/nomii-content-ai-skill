# Image Design Database

The image design database is not just a media folder. It is an operational design-system database that lets the agent evaluate which image best supports each slide and campaign objective.

The source project called this database:

```text
BBDD Imagen Design
data source: 3ad4f31a-dda3-80ca-84c7-000b2c5115c1
```

When the exact Notion database is unavailable, operate from a CSV/JSON export with equivalent fields.

## Purpose

The database converts an unordered image bank into a searchable design asset system. It should support:

- objective visual metadata;
- editorial/commercial metadata;
- role recommendation by slide;
- image reuse control;
- ranking against the current content row;
- traceability back to Notion or source file.

## Expected Fields

Core classification fields:

- `elementos_visibles`: objects, people, medical context, documents, city, classroom, hospital.
- `composicion`: close-up, medium shot, negative space, central focus, lateral focus.
- `tono_visual`: formal, human, editorial, aspirational, technical, corporate.
- `clima_visual`: sunny, neutral exterior, cold interior, warm interior.
- `luminosidad`: high, medium, low.
- `espacio_para_texto`: high, medium, low.
- `personas_presentes`: none, one person, health professional, group, student, patient.
- `pais`: country or market context when identifiable.
- `tipo_lugar`: hospital, university, office, city, government, home, document, etc.
- `uso_recomendado_en_carousel`: cover, context, proof, comparison, closing, background.
- `tema_comunicacional`: homologation, Germany, financing, study, process, trust, professional growth.
- `emocion_transmitida`: calm, trust, urgency, progress, authority, closeness.
- `embedding_visual`: semantic description for visual search/ranking.
- `embedding_comunicacional`: semantic description for message alignment.
- `veces_usada`: usage counter.
- `confidence_score`: classification confidence.

## Classification Principle

Classification has two layers:

1. Objective visual metadata: what appears in the image, composition, orientation, resolution, negative space, brightness.
2. Communicational metadata: what the image helps communicate, emotion, theme, and best role in a carousel.

Do not erase the source record. Add metadata and traceability.

## Image Selection Ranking

For each slide, rank candidate images by:

- alignment with content objective and funnel stage;
- compatibility with the slide role;
- text-safe space and safe area;
- NOMII tone: professional, human, clear, without drama;
- technical quality for `1080x1440`;
- diversity against recently used images;
- lower `veces_usada` when options are equivalent;
- no important face, logo, or document under text zones.

## Rules By Slide Role

Cover:

- Prefer a clear focal point, human context, or aspirational symbol.
- Require high or medium text space.
- For a human cover, preserve face and upper torso.

Context/problem:

- Use recognizable scenes that explain professional tension, paperwork, study, medical work, or migration process.

Proof/authority:

- Prefer hospital, institution, document, Germany, professional action, or credible environment.

Comparison:

- Prefer clean compositions with lateral or divided space.

Closing/CTA:

- Use calm, aspirational, forward-looking images.
- Avoid excessive urgency.

## Using Classified Images

When a selected image comes from the database:

1. Record the selected image identifier or source path.
2. Explain why it matches the slide.
3. Record slide role and usage.
4. Increment `veces_usada` only when live write is authorized.
5. If live write is unavailable, include the usage increments in `notion-update.md`.

## Image Generation Prompt Pattern

If the task requires generating or editing an image, create a structured prompt from the row and slide role:

```text
Generate a vertical image for a NOMII carousel.

Campaign objective: {objective}.
Hypothesis/insight: {hypothesis_or_insight}.
Buyer persona: {buyer_persona}.
Slide: {slide_role} / {visual_template}.

Required image:
- Subject: {subject}.
- Scene: {scene}.
- Action/emotional state: {emotion}.
- Composition: {composition}.
- Free zone: leave {free_zone} clean for text and logo.
- Visual focus: {image_focus}.

Style:
clean clinical/editorial photography, aspirational, cool natural light, sober colors, professional medical environment.

Restrictions:
no embedded text, no invented logos, no decorative graphics, no dramatic filter, no black and white, do not cover face or upper torso when a person is the main subject.
```

The image model should not decide brand layout. The image supports the slide. The NOMII carousel system adds text, logo, CTA, and layout.
