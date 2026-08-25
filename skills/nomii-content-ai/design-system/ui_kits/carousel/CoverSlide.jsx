/* CoverSlide — lámina 1. Two portada types:
   variant="photo" (default): full-bleed photo, WHITE text for max contrast,
       key info highlighted inside celeste recuadros (HighlightPill). Subtle dark
       bottom scrim keeps white text legible regardless of the image.
   variant="soft": soft #F8F8F8 background, dark title, a celeste highlight box
       carrying the supporting line, and an optional faded photo at the bottom. */
const { HighlightPill } = window.NOMIIDesignSystem_49862b;

function CoverSlide({ variant = "photo", image, pill, title, caption, box, logo, imageFocus = "center" }) {
  if (variant === "soft") {
    // Full-bleed image with a white top fade (image → white) covering ~1/3 of the
    // lámina; logo and text sit inside that white zone.
    return (
      <Lamina bg="var(--nomii-gris-claro)" logo={logo || "azul"} pad={false}>
        <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imageFocus }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,var(--nomii-gris-claro) 0%,var(--nomii-gris-claro) 40%,rgba(248,248,248,0) 60%)" }} />
        <div style={{ position: "absolute", left: 90, right: 90, top: 200, display: "flex", flexDirection: "column", gap: 30, alignItems: "center", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontWeight: "var(--fw-medium)", fontSize: 48, lineHeight: 1.2, color: "var(--nomii-gris-oscuro)" }}>{title}</h1>
          {box && (
            <div style={{ background: "var(--nomii-celeste)", color: "#fff", fontWeight: "var(--fw-light)", fontSize: 34, lineHeight: 1.4, padding: "28px 36px", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-pill)", maxWidth: 720 }}>{box}</div>
          )}
        </div>
      </Lamina>
    );
  }
  // variant === "photo"
  return (
    <Lamina bg="var(--nomii-gris-oscuro)" logo={logo || "blanco"} pad={false}>
      <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imageFocus }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(16,69,116,.72) 0%,rgba(16,69,116,.28) 34%,rgba(16,69,116,0) 62%)" }} />
      <div style={{ position: "absolute", left: 63, right: 63, bottom: 110, display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
        {pill && <HighlightPill size="lg" style={{ fontSize: 36 }}>{pill}</HighlightPill>}
        <h1 style={{ margin: 0, fontWeight: "var(--fw-medium)", fontSize: 52, lineHeight: 1.1, color: "#fff" }}>{title}</h1>
        {caption && <p style={{ margin: 0, fontWeight: "var(--fw-light)", fontSize: 28, color: "#fff", opacity: .9 }}>{caption}</p>}
      </div>
    </Lamina>
  );
}
Object.assign(window, { CoverSlide });
