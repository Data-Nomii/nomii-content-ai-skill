/* FlatPauseSlide — solid celeste or azul lamina, short italic phrase. Dramatic pause. */
function FlatPauseSlide({ text, bg = "var(--nomii-celeste)" }) {
  return (
    <Lamina bg={bg} logo="blanco">
      <div style={{ margin: "auto 0", textAlign: "center" }}>
        <p style={{ margin: "0 auto", maxWidth: 640, fontWeight: "var(--fw-medium)", fontStyle: "italic", fontSize: 44, lineHeight: 1.35, color: "#fff" }}>{text}</p>
      </div>
    </Lamina>
  );
}
Object.assign(window, { FlatPauseSlide });
