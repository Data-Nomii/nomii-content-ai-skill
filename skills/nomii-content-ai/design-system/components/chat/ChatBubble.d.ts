/**
 * White rounded bubble for an internal thought or question.
 * @startingPoint section="Chat" subtitle="Rounded thought/question bubble" viewport="700x150"
 */
export interface ChatBubbleProps {
  children: React.ReactNode;
  /** Show a speech tail on the lower-left. @default false */
  tail?: boolean;
  /** @default "center" */
  align?: "left" | "center";
  style?: React.CSSProperties;
}
/**
 * White rounded bubble for an internal thought or question.
 */
export function ChatBubble(props: ChatBubbleProps): JSX.Element;
