# NOMII — Carousel UI Kit

Instagram carousels (1080×1440, 3:4) are NOMII's primary organic surface. This kit
recreates a full carousel and the reusable lámina (slide) types that compose it.

## Files
- `index.html` — interactive carousel viewer (click through 7 laminas of the ENARM story).
- `Lamina.jsx` — the 1080×1440 canvas wrapper. Handles safe area (85/63 px) and the top-right 200px logo.
- `CoverSlide.jsx` — lámina 1: full-bleed photo + bottom scrim + hero `HighlightPill` + title.
- `ChatSlide.jsx` — celeste flat lámina with a lead line + `ChatBubble` internal thoughts.
- `FiftyFiftySlide.jsx` — 50% photo top / 50% mixed-weight text bottom. `RichLine` mixes Light/Medium/Italic.
- `PopoutSlide.jsx` — `PopoutCard` image + title + `OutlinePill` cluster.
- `FlatPauseSlide.jsx` — solid celeste/azul lámina, single italic pause phrase.
- `CtaSlide.jsx` — closing lámina: isotipo in a circle + CTA line + link pill.

## Notes
- Slide components read primitives from `window.NOMIIDesignSystem_49862b` (the compiled bundle) and export themselves to `window` for the babel-script load order in `index.html`.
- Laminas 1..N-1 carry the logo top-right; the final CTA lámina swaps it for the centered isotipo.
- Photography comes from `assets/banco/` and the `assets/key-visual-*.jpg` references.
