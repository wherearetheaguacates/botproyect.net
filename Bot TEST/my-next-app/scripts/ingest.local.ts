import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { splitIntoChunks } from "./chunker";
import OpenAI from "openai";

const prisma = new PrismaClient();
const ROOT = process.cwd();
const KNOW = path.join(ROOT, "knowledge"); // crea esta carpeta con tus .md/.txt/.json
const MODEL = process.env.EMBEDDING_MODEL || "text-embedding-3-small";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embed(texts: string[]) {
  const resp = await openai.embeddings.create({ model: MODEL, input: texts });
  return resp.data.map((d) => d.embedding as number[]);
}

async function ingestFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const title = path.basename(filePath);
  const doc = await prisma.document.create({ data: { title, source: filePath } });

  const chunks = splitIntoChunks(raw);
  const vecs = await embed(chunks);
  for (let i = 0; i < chunks.length; i++) {
    await prisma.chunk.create({
      data: { documentId: doc.id, idx: i, content: chunks[i], embedding: vecs[i] as any },
    });
  }
  console.log(`✓ Ingerido: ${title} (${chunks.length} chunks)`);
}

async function main() {
  if (!fs.existsSync(KNOW)) fs.mkdirSync(KNOW, { recursive: true });
  const files = fs.readdirSync(KNOW).filter((f) => /\.(md|txt|json)$/i.test(f));
  for (const f of files) await ingestFile(path.join(KNOW, f));
  console.log("Listo.");
}
main().catch((e) => { console.error(e); process.exit(1); });
