// Weekly sign-in reminder to cluster Team Leaders (owner, 28 Nov 2026). SQL: supabase/signin-nudge.sql.
// mode "weekly" (pg_cron, Monday morning): for each cluster below, emails its Team Leader (roster_contacts.area_manager_email)
// the people in their teams who have never set up their sign-in, with sign up versus switch off and the risk explained.
// Skips a cluster with nobody left, and never sends a second weekly email to a cluster within 6 days.
// mode "preview": sends every cluster's email to the lead instructor only (the Lower Eyre trial address), at most once
// every 10 minutes. From "DSY Training" <EProsters@dsytraining.com> through Resend (secret RESEND_API_KEY).
import { createClient } from "npm:@supabase/supabase-js@2";

const CLUSTERS = ["Central Eyre", "West Coast"];
const FROM = "DSY Training <EProsters@dsytraining.com>";
const RESEND = Deno.env.get("RESEND_API_KEY") || "";
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });
const DAY = 86400000;

type Row = { team: string; name: string; staff_id: string; role: string; vtl: boolean; roster_mgr: boolean; shifts: number };

async function send(msg: { to: string[]; reply_to?: string[]; subject: string; text: string }) {
  if (!RESEND) throw new Error("RESEND_API_KEY is not set");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, ...msg }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${(await r.text()).slice(0, 300)}`);
}

function flags(p: Row) {
  const f: string[] = [];
  if (p.vtl) f.push("VTL");
  if (p.roster_mgr) f.push("roster manager");
  if (p.role === "facilitator") f.push("facilitator");
  return f;
}

function line(p: Row) {
  const f = flags(p);
  let s = `- ${p.name} (${p.staff_id})`;
  if (f.length) s += ` - ${f.join(", ")}`;
  if (p.shifts > 0) s += ` - ${p.shifts} upcoming shift${p.shifts === 1 ? "" : "s"} booked, so likely still active`;
  return s;
}

function compose(cluster: string, first: string, rows: Row[]) {
  const n = rows.length;
  const teams = new Map<string, Row[]>();
  for (const r of rows) { if (!teams.has(r.team)) teams.set(r.team, []); teams.get(r.team)!.push(r); }
  const priority = rows.filter((r) => flags(r).length);
  const list = [...teams].map(([t, ps]) => `${t} (${ps.length})\n${ps.map(line).join("\n")}`).join("\n\n");
  const subject = `Weekly sign-in check: ${n} ${cluster} ${n === 1 ? "person" : "people"} not set up yet`;
  const text =
`Hi ${first},

This is your weekly sign-in check for the ${cluster} teams on dsytraining.com.

${n} ${n === 1 ? "person" : "people"} in your teams ${n === 1 ? "has" : "have"} never set up their sign-in. For each one, please do one of two things:

1. SIGN UP, if they are still active on the team.
   Ask them to go to dsytraining.com/signin, tap "First time here? Set up your sign-in", enter their ambulance ID and choose their own password. It takes about a minute. No starter password is needed.

2. SWITCH OFF, if they have left or will not be using DSY.
   On the People page (dsytraining.com/access/), find them and tap Remove. They can no longer sign in. Nothing is deleted, and Add back switches them on again later. If they have left the team, also tap the x on their team chip.

WHY IT MATTERS
Until a person sets up their own sign-in, their account is open. Anyone who knows or guesses their ambulance ID can set the password first and get into that account. They could then see the team's roster and members, and book or cancel shifts in that person's name.
Accounts marked VTL, roster manager or facilitator can also manage the team's roster or open the facilitator material, so please sort those first.
${priority.length ? `\nDO THESE FIRST\n${priority.map((p) => line(p) + ` (${p.team})`).join("\n")}\n` : ""}
NOT SET UP YET
${list}

You will get this email each Monday until everyone is signed up or switched off.

Thanks,
Chris
DSY Training

This email was sent automatically by dsytraining.com.`;
  return { subject, text };
}

async function leaderFirstName(cluster: string) {
  const { data } = await sb.from("profiles").select("full_name,preferred_name").eq("role", "leader").eq("cluster", cluster).limit(1).maybeSingle();
  const n = (data?.preferred_name || "").trim() || (data?.full_name || "").trim().split(/\s+/)[0];
  return n || "there";
}

async function contact(cluster: string) {
  const { data } = await sb.from("roster_contacts").select("area_manager_email,trial_email").eq("cluster", cluster).maybeSingle();
  return data;
}

async function log(cluster: string, mode: string, sent_to: string | null, open_count: number, error: string | null) {
  await sb.from("signin_nudge_log").insert({ cluster, mode, sent_to, open_count, error });
}

Deno.serve(async (req) => {
  const body = await req.json().catch(() => ({}));
  const mode = body.mode === "weekly" ? "weekly" : body.mode === "preview" ? "preview" : "";
  if (!mode) return json({ error: "mode must be weekly or preview" }, 400);

  // The lead instructor's address (also the Lower Eyre trial address): preview recipient and reply-to.
  const owner = ((await contact("Lower Eyre"))?.trial_email || "").trim();

  if (mode === "preview") {
    const { data: recent } = await sb.from("signin_nudge_log").select("id").eq("mode", "preview")
      .gte("sent_at", new Date(Date.now() - 10 * 60000).toISOString()).limit(1);
    if (recent?.length) return json({ skipped: "a preview was sent in the last 10 minutes" });
    if (!owner) return json({ error: "no preview address" }, 500);
  }

  const results: unknown[] = [];
  for (const cluster of CLUSTERS) {
    try {
      if (mode === "weekly") {
        const { data: done } = await sb.from("signin_nudge_log").select("id").eq("mode", "weekly").eq("cluster", cluster)
          .is("error", null).gte("sent_at", new Date(Date.now() - 6 * DAY).toISOString()).limit(1);
        if (done?.length) { results.push({ cluster, skipped: "already sent this week" }); continue; }
      }
      const { data, error } = await sb.rpc("signin_nudge_list", { p_cluster: cluster });
      if (error) throw new Error(error.message);
      const rows = (data || []) as Row[];
      if (!rows.length) { await log(cluster, mode, null, 0, null); results.push({ cluster, open: 0, sent: false }); continue; }

      const to = mode === "preview" ? owner : ((await contact(cluster))?.area_manager_email || "").trim();
      if (!to) throw new Error(`no Team Leader address for ${cluster}`);
      const { subject, text } = compose(cluster, await leaderFirstName(cluster), rows);
      await send({
        to: [to], reply_to: owner ? [owner] : undefined,
        subject: mode === "preview" ? `PREVIEW (would go to ${(await contact(cluster))?.area_manager_email || "?"}) - ${subject}` : subject,
        text,
      });
      await log(cluster, mode, to, rows.length, null);
      results.push({ cluster, open: rows.length, sent: true });
    } catch (e) {
      const msg = String((e as Error).message || e).slice(0, 500);
      await log(cluster, mode, null, 0, msg);
      results.push({ cluster, error: msg });
    }
  }
  return json({ mode, results });
});
