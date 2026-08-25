One-line: Rounded-corner image card; set overflow="pop" to let the subject break over the top edge (NOMII pop-out layout).

```jsx
<PopoutCard src="assets/banco/banco-3.jpg" ratio="4 / 3" />
<PopoutCard src="assets/banco/banco-1.jpg" overflow="pop" />
```

Props: `ratio` (CSS aspect-ratio), `radius` override, `overflow` contain|pop. Feed it images from the official banco/ set. Pair with a title + OutlinePill cluster below.
