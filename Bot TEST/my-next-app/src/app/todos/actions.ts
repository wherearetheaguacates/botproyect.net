"use server";
import { createClientAction } from "@/utils/supabase/server";

export async function addTodo(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  if (!title) return { error: "Título requerido" };

  const supabase = createClientAction();
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) return { error: "No autenticado" };

  const { error } = await supabase.from("todos").insert({
    user_id: user.id,
    title,
    is_completed: false,
  });

  if (error) return { error: error.message };
  return { ok: true };
}
