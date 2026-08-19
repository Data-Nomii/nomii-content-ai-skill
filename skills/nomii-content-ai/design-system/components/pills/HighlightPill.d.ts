/**
 * The signature NOMII accent capsule: filled celeste, white Rubik Medium Italic.
 * @startingPoint section="Pills" subtitle="Filled accent capsule for stats & hooks" viewport="700x150"
 */
export interface HighlightPillProps {
  /** Pill label. Keep short — a stat, hook or empathetic gain. */
  children: React.ReactNode;
  /** Fill color. @default "celeste" */
  tone?: "celeste" | "azul";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}
/**
 * The signature NOMII accent capsule.
 */
export function HighlightPill(props: HighlightPillProps): JSX.Element;
