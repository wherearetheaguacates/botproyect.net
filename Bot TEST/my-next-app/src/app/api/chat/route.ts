import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();

  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant" | "system"; content: string }[];
    };

    const sys = {
      role: "system" as const,
      content:
        "Eres MP7, asistente claro y directo. Responde en español neutral, estilo ChatGPT. Si no hay contexto, sé honesto.",
    };

    // DEMO si no hay API key
    if (!process.env.OPENAI_API_KEY) {
      const lastUser = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
      const fake = `Modo demo sin OPENAI_API_KEY: entendí "${lastUser}". Configura tu clave para respuestas reales.`;

      const stream = new ReadableStream({
        start(controller) {
          let i = 0;
          const timer = setInterval(() => {
            if (i >= fake.length) {
              clearInterval(timer);
              controller.close();
              return;
            }
            controller.enqueue(encoder.encode(fake[i]));
            i++;
          }, 8);
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    // Real con OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const resp = await openai.chat.completions.create({
      model: MODEL,
      stream: true,
      temperature: 0.4,
      messages: [sys, ...messages],
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of resp) {
          const chunk = part.choices?.[0]?.delta?.content;
          if (chunk) controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (e: any) {
    console.error(e);
    return new Response("Error en /api/chat", { status: 500 });
  }
}
