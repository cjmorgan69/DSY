// Short address for the Siri Shortcut: POST {"key": "...", "title": "..."} (or ?key=...&title=...).
// No sign-in header is needed: the private key is checked by the database function public.quick_add_task.
// Deployed to Supabase (verify_jwt off) as the function "task" on 13 Nov 2026:
//   https://ekaodnbnpsuayvmxvxbm.supabase.co/functions/v1/task
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
const H = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type" };
const out = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: H });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: H });
  const q = new URL(req.url).searchParams;
  let b: Record<string, unknown> = {};
  if (req.method === "POST") {
    const raw = await req.text();
    try { b = JSON.parse(raw); } catch { b = Object.fromEntries(new URLSearchParams(raw)); }
  }
  const pick = (...names: string[]) => {
    for (const n of names) { const v = b[n] ?? q.get(n); if (v != null && String(v).trim() !== "") return String(v); }
    return "";
  };
  const { data, error } = await sb.rpc("quick_add_task", {
    p_key: pick("key", "p_key"),
    p_title: pick("title", "p_title", "task"),
    p_due: pick("due", "p_due") || null,
  });
  if (error) return out({ ok: false, message: "That did not save. Try again." }, 500);
  return out(data);
});
