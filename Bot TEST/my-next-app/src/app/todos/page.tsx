import { createClientRSC } from "@/utils/supabase/server";
import { addTodo } from "./actions";
import { signOut } from "../(auth)/actions";

type Todo = { id: string; title: string; is_completed: boolean | null };

export default async function TodosPage() {
  const supabase = createClientRSC();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6">
        <p className="mb-4">No has iniciado sesión.</p>
        <a className="underline" href="/(auth)/login">Ir al login</a>
      </div>
    );
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select("id,title,is_completed")
    .order("id", { ascending: true });

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tus Tareas</h1>
        <form action={async () => { await signOut(); }}>
          <button className="text-sm underline">Salir</button>
        </form>
      </div>

      {error && <p className="text-red-600">Error: {error.message}</p>}
      {!todos?.length && <p>No hay tareas.</p>}

      <ul className="space-y-2">
        {todos?.map((t: Todo) => (
          <li key={t.id} className="border rounded px-3 py-2">{t.title}</li>
        ))}
      </ul>

      <form action={addTodo} className="flex gap-2">
        <input name="title" placeholder="Nueva tarea..." className="flex-1 border rounded px-3 py-2" />
        <button className="px-4 rounded bg-black text-white">Agregar</button>
      </form>
    </div>
  );
}
