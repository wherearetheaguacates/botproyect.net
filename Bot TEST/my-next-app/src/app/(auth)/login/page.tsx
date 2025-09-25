"use client";
import { useTransition } from "react";
import { signInWithPassword, signInWithGoogle } from "../actions";

export default function LoginPage() {
  const [pending, start] = useTransition();

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Iniciar sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          start(async () => {
            const res = await signInWithPassword(form);
            if ("error" in res) alert(res.error);
            else window.location.href = "/todos";
          });
        }}
        className="space-y-3"
      >
        <input name="email" type="email" placeholder="email" className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="password" className="w-full border rounded px-3 py-2" />
        <button disabled={pending} className="w-full bg-black text-white rounded py-2">
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <hr />

      <button
        onClick={async () => {
          const res = await signInWithGoogle();
          if ("url" in res) window.location.href = res.url!;
          else alert((res as any).error || "OAuth error");
        }}
        className="w-full border rounded py-2"
      >
        Entrar con Google
      </button>
    </div>
  );
}
