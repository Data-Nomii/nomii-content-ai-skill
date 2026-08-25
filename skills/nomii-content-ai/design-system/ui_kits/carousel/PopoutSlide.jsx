/* PopoutSlide — pop-out image card, title, and an OutlinePill cluster below. */
const { PopoutCard, OutlinePill } = window.NOMIIDesignSystem_49862b;

function PopoutSlide({ image, title, chips = [] }) {
  return (
    <Lamina bg="var(--nomii-gris-claro)" logo="azul">
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 44, alignItems: "center" }}>
        <div style={{ width: 620 }}>
          <PopoutCard src={image} ratio="4 / 3" />
        </div>
        {title && <h2 style={{ margin: 0, fontWeight: "var(--fw-medium)", fontSize: 38, lineHeight: 1.2, textAlign: "center", maxWidth: 760 }}>{title}</h2>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", maxWidth: 820 }}>
          {chips.map((c, i) => <OutlinePill key={i}>{c}</OutlinePill>)}
        </div>
      </div>
    </Lamina>
  );
}
Object.assign(window, { PopoutSlide });
