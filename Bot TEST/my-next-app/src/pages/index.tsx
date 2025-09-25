import Link from "next/link";

export default function Home() {
  return (
    <main style={{minHeight:"100vh", background:"#0b0f16", color:"#fff"}}>
      <div style={{maxWidth:960, margin:"0 auto", padding:"40px 20px"}}>
        <h1 style={{fontSize:28, fontWeight:700}}>Bienvenido a MP7</h1>
        <p style={{opacity:.8}}>Tu asistente con UI tipo ChatGPT.</p>
        <div style={{display:"flex", gap:12, marginTop:16}}>
          <Link href="/chat" className="rounded-xl px-4 py-2" style={{background:"#059669"}}>Ir al Chat</Link>
          <Link href="/todos" className="rounded-xl px-4 py-2" style={{background:"#111827", border:"1px solid #1f2937"}}>Ver TODOs</Link>
        </div>
      </div>
    </main>
  );
}
