import React from "react";

const FILES = {
  "logo-azul": "logo-azul.png",
  "logo-blanco": "logo-blanco.png",
  "isotipo-celeste": "isotipo-celeste.png",
  "isotipo-blanco": "isotipo-blanco.png",
};

/**
 * Brandmark — renders a NOMII logo or isotipo asset.
 * Full logo goes top-right at 200px on laminas 1..N-1; the isotipo (centered,
 * inside a circle) closes the carousel on the CTA lamina.
 * Pass an explicit `src`, or a `variant`+`color` pair resolved against `basePath`.
 */
export function Brandmark({
  variant = "logo",
  color = "azul",
  src,
  basePath = "assets",
  width = 200,
  circle = false,
  circleBg = "var(--nomii-celeste)",
  alt = "NOMII",
  style,
  ...rest
}) {
  const key = `${variant}-${color}`;
  const resolved = src || `${basePath}/${FILES[key] || FILES["logo-azul"]}`;
  const img = (
    <img src={resolved} alt={alt} style={{ width: typeof width === "number" ? `${width}px` : width, height: "auto", display: "block" }} />
  );
  if (!circle) return React.cloneElement(img, { style: { ...img.props.style, ...style }, ...rest });
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: circleBg,
        borderRadius: "var(--radius-pill)",
        padding: "18%",
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof width === "number" ? `${width}px` : width,
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      <img src={resolved} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}
