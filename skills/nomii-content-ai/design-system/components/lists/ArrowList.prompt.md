One-line: Circle-outline arrow list for 3-point breakdowns (expectation vs. reality, "estudiaste / pero cuando entras al sistema").

```jsx
<ArrowList items={[
  { label: "No tienes el", emphasis: "tiempo suficiente" },
  { label: "No tienes los", emphasis: "recursos" },
  { label: "No tienes las", emphasis: "condiciones" },
]} />
```

Items are strings or `{label, emphasis}` — emphasis renders Medium Italic. `tone` celeste|azul tints the arrow glyph.
