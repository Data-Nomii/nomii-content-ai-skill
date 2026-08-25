/* CardTextSlide — interior lámina: masked (rounded) image card on top, then a
   heading and supporting text or an ArrowList below. Matches the KV3 interior
   laminas ("Estudiaste:" / "Pero cuando entras al sistema:"). */
const { PopoutCard, ArrowList } = window.NOMIIDesignSystem_49862b;

function CardTextSlide({ image, heading, body, items }) {
  return (
    <Lamina bg="var(--nomii-gris-claro)" logo="azul">
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 48, alignItems: "center" }}>
        <div style={{ width: 640 }}>
          <PopoutCard src={image} ratio="16 / 10" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "center", textAlign: "center" }}>
          {heading && <h2 style={{ margin: 0, fontWeight: "var(--fw-medium)", fontSize: 38, lineHeight: 1.2, color: "var(--text-accent)" }}>{heading}</h2>}
          {items ? (
            <ArrowList items={items} style={{ alignItems: "flex-start" }} />
          ) : (
            body && <p style={{ margin: 0, fontWeight: "var(--fw-light)", fontSize: 34, lineHeight: 1.4, color: "var(--text-primary)", maxWidth: 760 }}>{body}</p>
          )}
        </div>
      </div>
    </Lamina>
  );
}
Object.assign(window, { CardTextSlide });
