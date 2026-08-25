/* ChatSlide — celeste flat lamina with a lead line + internal-thought bubbles. */
const { ChatBubble } = window.NOMIIDesignSystem_49862b;

function ChatSlide({ lead, bubbles = [], bg = "var(--nomii-celeste)" }) {
  return (
    <Lamina bg={bg} logo="blanco">
      <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 26, alignItems: "center", textAlign: "center" }}>
        {lead && <p style={{ margin: "0 0 8px", fontWeight: "var(--fw-light)", fontSize: 36, color: "#fff" }}>{lead}</p>}
        {bubbles.map((b, i) => <ChatBubble key={i}>{b}</ChatBubble>)}
      </div>
    </Lamina>
  );
}
Object.assign(window, { ChatSlide });
