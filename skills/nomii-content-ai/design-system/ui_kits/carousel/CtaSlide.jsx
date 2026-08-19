/* CtaSlide — closing lamina. Isotipo in a circle (centered), CTA line, link pill. */
const { Brandmark, OutlinePill } = window.NOMIIDesignSystem_49862b;

function CtaSlide({ text, cta, bg = "var(--nomii-celeste)" }) {
  return (
    <Lamina bg={bg} showLogo={false}>
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 46, alignItems: "center", textAlign: "center" }}>
        <Brandmark variant="isotipo" color="blanco" basePath={ASSETS} width={288} />
        {text && <p style={{ margin: 0, fontWeight: "var(--fw-medium)", fontStyle: "italic", fontSize: 38, lineHeight: 1.3, color: "#fff", maxWidth: 760 }}>{text}</p>}
        {cta && <OutlinePill size="lg" style={{ borderColor: "#fff", color: "#fff" }}>{cta}</OutlinePill>}
      </div>
    </Lamina>
  );
}
Object.assign(window, { CtaSlide });
