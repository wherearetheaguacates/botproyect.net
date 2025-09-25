import { Plus, MessageSquare } from "lucide-react";

export function Sidebar() {
  const items = [{ id: "1", title: "Nueva conversación" }];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-white/10">
        <button className="w-full flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 px-3 py-2">
          <Plus className="size-4" />
          Nuevo chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-2">
          {items.map((it) => (
            <li key={it.id}>
              <a className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 cursor-default">
                <MessageSquare className="size-4 text-white/60" />
                <span className="truncate">{it.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-t border-white/10 text-xs text-white/40">
        MP7 • v1.0
      </div>
    </div>
  );
}
