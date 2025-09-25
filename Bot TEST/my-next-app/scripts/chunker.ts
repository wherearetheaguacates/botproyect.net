export function splitIntoChunks(text: string, chunkSize = 900, overlap = 150) {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    chunks.push(text.slice(i, end));
    if (end === text.length) break;
    i = end - overlap;
  }
  return chunks.map((c) => c.trim()).filter(Boolean);
}
