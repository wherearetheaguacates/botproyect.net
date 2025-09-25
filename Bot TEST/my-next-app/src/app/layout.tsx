import "./../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "MP7 Assistant",
  description: "Chat estilo ChatGPT + Supabase + (opcional) RAG",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="text-gray-100">{children}</body>
    </html>
  );
}
