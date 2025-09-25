"use client";

import { useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Wand2 } from "lucide-react";

export type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hola Manny 👋 Soy MP7. ¿En qué te ayudo hoy?" },
  ]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function send(text: string) {
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: next }),
      signal: abortRef.current.signal,
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let assistant = "";
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      assistant += decoder.decode(value, { stream: true });
      setMessages((m) => {
        const updated = [...m];
        updated[updated.length - 1] = { role: "assistant", content: assistant };
        return updated;
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-12 h-[100svh] text-gray-100">
      <aside className="col-span-3 hidden md:flex border-r border-white/10 bg-[#0a0e14]">
        <Sidebar />
      </aside>

      <main className="col-span-12 md:col-span-9 flex flex-col">
        <div className="h-14 border-b border-white/10 flex items-center gap-2 px-4">
          <Wand2 className="size-5 text-emerald-400" />
          <span className="font-semibold">MP7 • Chat</span>
          <span className="ml-auto text-xs text-white/50">
            {process.env.NEXT_PUBLIC_APP_NAME || "Asistente MP7"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#0b0f16]">
          <div className="max-w-3xl mx-auto">
            <MessageList messages={messages} />
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#0b0f16] p-3">
          <div className="max-w-3xl mx-auto">
            <MessageInput onSend={send} disabled={loading} />
            {loading && (
              <p className="text-xs text-white/40 px-1 pt-1">MP7 está escribiendo…</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
