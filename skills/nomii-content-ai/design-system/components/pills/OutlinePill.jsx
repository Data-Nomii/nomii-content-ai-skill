import React from "react";

/**
 * OutlinePill — thin-border capsule used to break a feature into scannable
 * chips (e.g. "Top 3 en innovación", "Alta demanda de médicos").
 * Transparent fill, colored 1.5px border, medium (non-italic) label.
 */
export function OutlinePill({ children, tone = "celeste", size = "md", style, ...rest }) {
  const tones = {
    celeste: { borderColor: "var(--nomii-celeste)", color: "var(--nomii-celeste)" },
    azul: { borderColor: "var(--nomii-azul)", color: "var(--nomii-azul)" },
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
        lineHeight: "var(--lh-snug)",
        borderRadius: "var(--radius-pill)",
        border: "1.5px solid",
        background: "transparent",
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
