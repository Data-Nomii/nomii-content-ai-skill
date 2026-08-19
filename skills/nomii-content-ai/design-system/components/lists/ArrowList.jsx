import React from "react";

/**
 * ArrowList — the "expectativa vs. realidad" list. Each item is prefixed by a
 * circle-outline arrow glyph. Typically 3 points. Optional highlighted word
 * per item is rendered Medium Italic via the `emphasis` field.
 */
export function ArrowList({ items = [], tone = "celeste", style, ...rest }) {
  const color = tone === "azul" ? "var(--nomii-azul)" : "var(--nomii-celeste)";
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        fontFamily: "var(--font-brand)",
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => {
        const label = typeof it === "string" ? it : it.label;
        const emphasis = typeof it === "string" ? null : it.emphasis;
        return (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ flex: "none" }} aria-hidden="true">
              <circle cx="17" cy="17" r="15.5" stroke={color} strokeWidth="1.5" />
              <path d="M12 17h10M18 13l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontWeight: "var(--fw-light)", fontSize: "var(--fs-body)", color: "var(--text-primary)", lineHeight: "var(--lh-snug)" }}>
              {label}
              {emphasis ? <em style={{ fontWeight: "var(--fw-medium)", fontStyle: "italic" }}> {emphasis}</em> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
