// Copies the team rosters into public.roster_bookings (16 Nov 2026; Lower Eyre added 18 Nov 2026 for switch day, so
// the move to the Supabase roster can take a fresh copy of all three clusters). Run every 2 hours by pg_cron
// (job "roster-sync"). The owner's PC run may still copy Lower Eyre too: both write the same booking IDs.
// For each team it asks the cluster's Apps Script for its bookings (the same "getBookings" request the roster page
// makes), saves them as Active, and marks as Cancelled any Active booking that has disappeared from the roster,
// but only inside the date range the roster still holds, so older history is never touched.
import { createClient } from "npm:@supabase/supabase-js@2";

const CENTRAL = "https://script.google.com/macros/s/AKfycbwbeUGYW4VaBC8i0k228ASyRQt-B4_7pKKr5F3O5L-CrCmTH0hnx48pN7QTqkjXrfwRDA/exec";
const WEST = "https://script.google.com/macros/s/AKfycbxrcfdjF7kUZQBkHuw2mqrYXhqz54VrK9Agv-zzOyBG8BbAbC-lrDkY6zGK91VAwB_z/exec";
const LOWER = "https://script.google.com/macros/s/AKfycbxEboPS9reZI5OpUMdlriag0QeAJzIyXFZ2Jy0z_4qBJLEK054R5bDcJgyWAW2YSP6l/exec";
const TEAMS: [string, string][] = [
  ["Tumby Bay", LOWER], ["Cummins", LOWER], ["Coffin Bay", LOWER], ["Port Neill", LOWER],
  ["Cleve", CENTRAL], ["Cowell", CENTRAL], ["Elliston", CENTRAL], ["Lock", CENTRAL],
  ["Kimba", WEST], ["Port Kenny", WEST], ["Streaky Bay", WEST], ["Wudinna", WEST],
];
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });

async function syncTeam(team: string, url: string) {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "getBookings", team }), redirect: "follow" });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const d = await r.json();
  if (!Array.isArray(d.bookings)) throw new Error(d.error || "no bookings list");
  const rows = d.bookings
    .filter((b: any) => b && b.id && b.start && b.end && b.user)
    .map((b: any) => ({
      booking_id: String(b.id), team, member_name: String(b.user), start_time: b.start, finish_time: b.end,
      created_at: b.createdAt || null, status: "Active", restriction: b.restriction || null,
      clinical_level: b.clinicalLevel || null, synced_at: new Date().toISOString(),
    }));
  if (!rows.length) return { team, saved: 0, cancelled: 0, note: "roster returned no bookings; nothing changed" };
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await sb.from("roster_bookings").upsert(rows.slice(i, i + 500), { onConflict: "booking_id" });
    if (error) throw new Error(error.message);
  }
  const ids = new Set(rows.map((x: any) => x.booking_id));
  const minStart = rows.reduce((m: string, x: any) => (x.start_time < m ? x.start_time : m), rows[0].start_time);
  const { data: active, error: e2 } = await sb.from("roster_bookings").select("booking_id")
    .eq("team", team).eq("status", "Active").gte("start_time", minStart);
  if (e2) throw new Error(e2.message);
  const gone = (active || []).map((x: any) => x.booking_id).filter((id: string) => !ids.has(id));
  if (gone.length) {
    const { error: e3 } = await sb.from("roster_bookings").update({ status: "Cancelled", synced_at: new Date().toISOString() }).in("booking_id", gone);
    if (e3) throw new Error(e3.message);
  }
  return { team, saved: rows.length, cancelled: gone.length };
}

Deno.serve(async () => {
  const results = await Promise.all(TEAMS.map(([t, u]) => syncTeam(t, u).catch((e) => ({ team: t, error: String(e.message || e) }))));
  return json({ ok: results.every((x: any) => !x.error), at: new Date().toISOString(), results });
});
