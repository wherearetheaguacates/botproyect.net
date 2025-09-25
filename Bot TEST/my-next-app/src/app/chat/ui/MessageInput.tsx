"use client";
import { useState } from "react";

export function MessageInput({ onSend, disabled }: {
  onSend: (text: string) => void; disabled?: boolean;
}) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const t = text.trim();
        if (t) onSend(t);
        setText("");
      }}
      className="flex items-end gap-2"
    >
      <textarea
        className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        placeholder="Escribe tu mensaje..."
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const t = text.trim();
            if (t) onSend(t);
            setText("");
          }
        }}
        disabled={disabled}
      />
      <button className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-white transition disabled:opacity-50" disabled={disabled}>
        Enviar
      </button>
    </form>
  );
}
