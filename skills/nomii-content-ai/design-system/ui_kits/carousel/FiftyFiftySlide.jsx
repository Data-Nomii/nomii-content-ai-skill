/* FiftyFiftySlide — 50% photo top, 50% text block bottom on soft bg.
   Body copy accepts a `parts` array of {text, style} where style is
   'light' | 'medium' | 'italic' so a sentence can mix weights. */
function RichLine({ parts }) {
  return (
    <p style={{ margin: 0, fontWeight: "var(--fw-light)", fontSize: 36, lineHeight: 1.35, color: "var(--text-primary)", textAlign: "center" }}>
      {parts.map((p, i) => {
        if (p.style === "medium") return <span key={i} style={{ fontWeight: "var(--fw-medium)" }}>{p.text}</span>;
        if (p.style === "italic") return <em key={i} style={{ fontWeight: "var(--fw-medium)", fontStyle: "italic", color: "var(--nomii-celeste)" }}>{p.text}</em>;
        return <span key={i}>{p.text}</span>;
      })}
    </p>
  );
}

function FiftyFiftySlide({ image, lines = [], imagePosition = "top" }) {
  const img = <img src={image} alt="" style={{ width: "100%", height: 700, objectFit: "cover", display: "block", flex: "none" }} />;
  const text = (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: "0 90px" }}>
      <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {lines.map((parts, i) => <RichLine key={i} parts={parts} />)}
      </div>
    </div>
  );
  return (
    <Lamina bg="var(--nomii-gris-claro)" logo="azul" pad={false}>
      {imagePosition === "bottom" ? <>{text}{img}</> : <>{img}{text}</>}
    </Lamina>
  );
}
Object.assign(window, { FiftyFiftySlide, RichLine });
