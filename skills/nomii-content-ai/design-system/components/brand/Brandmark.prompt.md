One-line: Renders the NOMII logo (top-right, 200px, interior laminas) or the isotipo (centered in a circle, CTA lamina).

```jsx
{/* interior lamina, top-right */}
<Brandmark variant="logo" color="azul" width={200} />
{/* on a celeste/photo slide */}
<Brandmark variant="logo" color="blanco" width={200} />
{/* CTA closing lamina */}
<Brandmark variant="isotipo" color="blanco" circle circleBg="var(--nomii-celeste)" width={220} />
```

Pass `basePath` if your assets live elsewhere, or an explicit `src`. Never recolor or redraw the mark — only the 4 provided files. Do not use Bold anywhere near it.
