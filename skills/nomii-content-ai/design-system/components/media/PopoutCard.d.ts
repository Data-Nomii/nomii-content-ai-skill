/**
 * Rounded image card, optionally with the subject popping over the top edge.
 * @startingPoint section="Media" subtitle="Rounded image card with pop-out subject" viewport="700x360"
 */
export interface PopoutCardProps {
  /** Image URL. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio. @default "4 / 3" */
  ratio?: string;
  /** Corner radius override. Defaults to --radius-card. */
  radius?: string;
  /** "contain" clips to the card; "pop" lets the subject overflow the top edge. @default "contain" */
  overflow?: "contain" | "pop";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/**
 * Rounded image card, optionally with the subject popping over the top edge.
 */
export function PopoutCard(props: PopoutCardProps): JSX.Element;
