export type ArrowListItem = string | { label: string; emphasis?: string };
export interface ArrowListProps {
  /** Usually 3 points. A string, or {label, emphasis} where emphasis renders Medium Italic. */
  items: ArrowListItem[];
  /** Arrow glyph color. @default "celeste" */
  tone?: "celeste" | "azul";
  style?: React.CSSProperties;
}
/**
 * Circle-outline arrow list — the "expectativa vs. realidad" pattern.
 */
export function ArrowList(props: ArrowListProps): JSX.Element;
