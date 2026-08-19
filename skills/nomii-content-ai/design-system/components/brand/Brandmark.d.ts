export interface BrandmarkProps {
  /** @default "logo" */
  variant?: "logo" | "isotipo";
  /** @default "azul" */
  color?: "azul" | "blanco" | "celeste";
  /** Explicit asset URL; overrides variant+color. */
  src?: string;
  /** Folder the variant/color file is resolved against. @default "assets" */
  basePath?: string;
  /** px number or CSS length. @default 200 */
  width?: number | string;
  /** Wrap the mark in a filled circle (CTA lamina). @default false */
  circle?: boolean;
  circleBg?: string;
  alt?: string;
  style?: React.CSSProperties;
}
/**
 * Renders a NOMII logo or isotipo asset (optionally inside a circle).
 */
export function Brandmark(props: BrandmarkProps): JSX.Element;
