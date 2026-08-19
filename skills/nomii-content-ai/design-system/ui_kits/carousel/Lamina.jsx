/* Lamina — the 1080×1440 carousel canvas wrapper.
   Handles safe area (85/63 px) and the top-right logo (200px) on interior laminas. */
const { Brandmark } = window.NOMIIDesignSystem_49862b;
const ASSETS = "../../assets";

function Lamina({ children, bg = "var(--nomii-gris-claro)", logo = "azul", showLogo = true, pad = true, style }) {
  return (
    <div style={{
      position: "relative", width: 1080, height: 1440, background: bg,
      fontFamily: "var(--font-brand)", color: "var(--text-primary)", overflow: "hidden", flex: "none", ...style,
    }}>
      {showLogo && (
        <div style={{ position: "absolute", top: 85, right: 63, zIndex: 5 }}>
          <Brandmark variant="logo" color={logo} basePath={ASSETS} width={200} />
        </div>
      )}
      <div style={{
        position: "absolute",
        inset: pad ? "85px 63px" : 0,
        display: "flex", flexDirection: "column",
      }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { Lamina, ASSETS });
