"use server";
import { createClientAction } from "@/utils/supabase/server";

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClientAction();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function signOut() {
  const supabase = createClientAction();
  await supabase.auth.signOut();
  return { ok: true };
}

export async function signInWithGoogle() {
  const supabase = createClientAction();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        : "http://localhost:3000/auth/callback",
    },
  });
  if (error) return { error: error.message };
  return { url: data?.url };
}
