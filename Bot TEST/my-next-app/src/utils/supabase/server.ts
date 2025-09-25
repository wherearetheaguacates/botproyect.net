import { cookies as nextCookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Solo lectura (Server Components)
export function createClientRSC() {
  const cookieStore = nextCookies();
  return createServerClient(url, key, {
    cookies: { get(name: string) { return cookieStore.get(name)?.value; } },
  });
}

// Mutable (Server Actions / Route Handlers)
export function createClientAction() {
  const cookieStore = nextCookies();
  return createServerClient(url, key, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
      set(name: string, value: string, options: any) { cookieStore.set(name, value, options); },
      remove(name: string, options: any) { cookieStore.set(name, "", { ...options, maxAge: 0 }); },
    },
  });
}
