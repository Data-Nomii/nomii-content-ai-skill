import React from "react";

/**
 * HighlightPill — the signature NOMII accent capsule.
 * Filled celeste (#77BFD0) or corporate azul, white Rubik Medium Italic text.
 * Used for stats, hooks and emphatic gains ("4 de cada 5 médicos").
 */
export function HighlightPill({ children, tone = "celeste", size = "md", style, ...rest }) {
  const tones = {
    celeste: { background: "var(--nomii-celeste)", color: "var(--text-on-accent)" },
    azul: { background: "var(--nomii-azul)", color: "var(--text-on-accent)" },
  };
  const sizes = {
    sm: { fontSize: "20px", padding: "8px 20px" },
    md: { fontSize: "var(--fs-pill)", padding: "12px 28px" },
    lg: { fontSize: "32px", padding: "16px 36px" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-brand)",
        fontWeight: "var(--fw-medium)",
        fontStyle: "italic",
        lineHeight: "var(--lh-snug)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-pill)",
        textAlign: "center",
        ...tones[tone],
        ...sizes[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
