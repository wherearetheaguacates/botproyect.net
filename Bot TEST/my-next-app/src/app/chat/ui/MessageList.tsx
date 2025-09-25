import type { Msg } from "./ChatPanel";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }: { messages: Msg[] }) {
  return (
    <div className="space-y-3">
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}
    </div>
  );
}
