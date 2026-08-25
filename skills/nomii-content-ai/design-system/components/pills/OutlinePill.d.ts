export interface OutlinePillProps {
  /** Chip label. */
  children: React.ReactNode;
  /** Border/text color. @default "celeste" */
  tone?: "celeste" | "azul";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}
/**
 * Thin-border capsule for breaking a feature into scannable chips.
 */
export function OutlinePill(props: OutlinePillProps): JSX.Element;
