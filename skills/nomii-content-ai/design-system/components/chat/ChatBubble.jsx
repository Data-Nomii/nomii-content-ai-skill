import React from "react";

/**
 * ChatBubble — white rounded bubble with centered text, representing an
 * internal thought or question ("¿Qué hago entonces?", "¿Lo sigo intentando?").
 * Soft shadow, generous radius. Optional tail on the lower-left.
 */
export function ChatBubble({ children, tail = false, align = "center", style, ...rest }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        maxWidth: "80%",
        background: "var(--surface-card)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-brand)",
        fontWeight: "var(--fw-light)",
        fontSize: "var(--fs-body)",
        lineHeight: "var(--lh-snug)",
        textAlign: align,
        padding: "20px 32px",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-soft)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {tail && (
        <span
          style={{
            position: "absolute",
            left: "34px",
            bottom: "-10px",
            width: "22px",
            height: "22px",
            background: "var(--surface-card)",
            borderRadius: "0 0 0 6px",
            transform: "rotate(45deg)",
            boxShadow: "var(--shadow-soft)",
          }}
        />
      )}
    </div>
  );
}
