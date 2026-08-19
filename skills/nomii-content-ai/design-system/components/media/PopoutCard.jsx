import React from "react";

/**
 * PopoutCard — rounded-corner image card. The subject can be made to "pop out"
 * over the top edge (overflow="pop") as in the NOMII layouts, or sit fully
 * contained (overflow="contain"). Soft shadow, generous radius.
 */
export function PopoutCard({ src, alt = "", ratio = "4 / 3", radius, overflow = "contain", style, children, ...rest }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius || "var(--radius-card)",
        aspectRatio: ratio,
        background: "var(--celeste-100)",
        boxShadow: "var(--shadow-card)",
        overflow: overflow === "pop" ? "visible" : "hidden",
        ...style,
      }}
      {...rest}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: radius || "var(--radius-card)",
            position: overflow === "pop" ? "relative" : "static",
            marginTop: overflow === "pop" ? "-14%" : 0,
          }}
        />
      )}
      {children}
    </div>
  );
}
