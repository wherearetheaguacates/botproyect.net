export function MessageBubble({
  role, content,
}: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={[
        "max-w-[85%] rounded-2xl px-4 py-2 leading-relaxed",
        isUser ? "bg-emerald-600 text-white" : "bg-white/5 border border-white/10 text-white",
      ].join(" ")}>
        <div className="text-xs opacity-70 mb-1">{isUser ? "Tú" : "MP7"}</div>
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}
