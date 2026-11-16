// Sends the roster emails queued in public.roster_email_queue (stage 3 of the Supabase roster, 16 Nov 2026).
// Woken by a trigger when an email is queued, and every 15 minutes while anything is unsent (3 tries each).
// From "<Team> Team Roster" <EProsters@dsytraining.com> through Resend (secret RESEND_API_KEY).
// Wording follows sendHardCopyChangeNotifications in modules/rosters/backend/Code.gs.
// While a cluster is on trial (no "live from" date, or before it) everything goes ONLY to its trial address, marked TRIAL.
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const RESEND = Deno.env.get("RESEND_API_KEY") || "";
const FROM = "EProsters@dsytraining.com";
const TZ = "Australia/Adelaide";
const HOUR = 3600000;
const CR_MIN_HOURS = 24;
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json" } });

function parts(d: Date) {
  const o: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d)) o[p.type] = p.value;
  return o;
}
const fmt = (d: Date) => { const p = parts(d); return `${p.weekday} ${p.day} ${p.month} ${p.year} ${p.hour}:${p.minute}`; };
const hhmm = (d: Date) => { const p = parts(d); return `${p.hour}:${p.minute}`; };
const dayKey = (d: Date) => { const p = parts(d); return `${p.year}${p.month}${p.day}`; };
const adelaideToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date()); // YYYY-MM-DD

function codeLabel(c: string) {
  if (c === "NC") return "NC (no crew)";
  if (c === "Review") return "REVIEW (crew details need checking: please contact the team manager)";
  return c;
}

function restrictionLines(p: any) {
  const from = Date.parse(p.from), to = Date.parse(p.to), before: string[] = p.before || [], after: string[] = p.after || [];
  const blocks: { s: number; e: number; b: string; a: string }[] = [];
  for (let i = 0; i < after.length; i++) {
    const s = from + i * HOUR, last = blocks[blocks.length - 1];
    if (last && last.e === s && last.b === before[i] && last.a === after[i]) last.e = s + HOUR;
    else blocks.push({ s, e: s + HOUR, b: before[i], a: after[i] });
  }
  if (!blocks.length) return "";
  const whole = blocks.length === 1 && blocks[0].s === from && blocks[0].e === to;
  return blocks.map((k) => {
    const range = dayKey(new Date(k.s)) === dayKey(new Date(k.e - 1)) ? `${fmt(new Date(k.s))} to ${hhmm(new Date(k.e))}` : `${fmt(new Date(k.s))} to ${fmt(new Date(k.e))}`;
    return "The restriction for " + (whole ? "this shift" : range) + (k.a === k.b ? " remains unchanged." : ` will be ${codeLabel(k.a)}.`);
  }).join("\n") + "\n";
}

async function send(msg: { from: string; to: string[]; cc?: string[]; reply_to?: string[]; subject: string; text: string }) {
  if (!RESEND) throw new Error("RESEND_API_KEY is not set");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" }, body: JSON.stringify(msg),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${(await r.text()).slice(0, 300)}`);
}

const uniq = (a: (string | null | undefined)[]) => {
  const seen = new Set<string>(), out: string[] = [];
  for (const x of a) { const v = (x || "").trim(); if (v && !seen.has(v.toLowerCase())) { seen.add(v.toLowerCase()); out.push(v); } }
  return out;
};

async function handle(job: any) {
  const cluster = job.cluster;
  const [{ data: contact }, { data: cl }] = await Promise.all([
    sb.from("roster_contacts").select("*").eq("cluster", cluster).maybeSingle(),
    sb.from("roster_clusters").select("live_from").eq("cluster", cluster).maybeSingle(),
  ]);
  let trial = !cl?.live_from || adelaideToday() < cl.live_from;
  const trialTo = uniq([contact?.trial_email]);

  if (job.kind === "test") {
    if (!trialTo.length) throw new Error(`No trial address set for ${cluster}`);
    await send({ from: `${cluster} Team Roster <${FROM}>`, to: trialTo, subject: `Test email from the ${cluster} roster`,
      text: `This is a test email from the new ${cluster} roster on dsytraining.com.\n\nIf you can read this, roster emails are working.\n` +
        `Sent ${fmt(new Date())} (Adelaide time).\n\nThe ${cluster} cluster is ${trial ? "on TRIAL: all roster emails come only to this address." : "live."}` });
    return;
  }

  const p = job.payload;
  const { data: team } = await sb.from("groups").select("name,type").eq("id", job.group_id).single();
  if (team!.type === "test") trial = true; // the test roster (Summer Bay) never emails anyone but the trial address
  const { data: mgrs } = await sb.from("roster_managers").select("notify_email").eq("group_id", job.group_id);
  const teamName = team!.name as string;
  const sender = `${teamName} Team Roster <${FROM}>`;
  const managerTo = uniq((mgrs || []).map((m: any) => m.notify_email));
  const notice = new Date(p.notice), start = new Date(p.start), end = new Date(p.end);
  const hoursUntil = (notice.getTime() - Date.now()) / HOUR;
  const outside = hoursUntil > CR_MIN_HOURS;
  const cr = (contact?.country_rostering_email || "").trim();

  const shiftDetails =
    `Change: ${p.action}\nTeam: ${teamName}\nCrew member: ${p.member}\nClinical level: ${p.level || "Unknown"}\n` +
    `Shift start: ${fmt(start)}\nShift finish: ${fmt(end)}\n` +
    (p.prev_start && p.prev_end ? `Previously: ${fmt(new Date(p.prev_start))} to ${fmt(new Date(p.prev_end))}\n` : "") +
    restrictionLines(p) + `Change made: ${fmt(new Date(p.made_at))} (Adelaide time)`;
  const crSubject = `Roster change: ${p.action} — ${teamName} — ${p.member} — ${fmt(start)}`;
  const crBody = `Hello Country Rostering,\n\nCould you please update the roster already submitted for ${teamName}.\n\n${shiftDetails}\n\n` +
    `Thanks heaps.\nKind regards,\n${teamName} Crew\n\nThis email was sent automatically by the ${teamName} Team Roster.`;
  const mgrSubject = `[Roster Alert] ${p.action} in hard-copy period — ${teamName} — ${p.member}`;
  const mgrBody = (status: string) => `A change has been made within the roster already submitted to Country Rostering.\n\n${shiftDetails}\n` +
    `Hours until shift start: ${hoursUntil.toFixed(1)}\n\nCountry Rostering notification:\n${status}\n\n` +
    `This email was sent automatically by the ${teamName} Team Roster.`;

  if (trial) {
    if (!trialTo.length) throw new Error(`No trial address set for ${cluster}`);
    const crPart = outside
      ? `Country Rostering would get this email${cr ? ` (to ${cr})` : " (no Country Rostering address is set yet)"}:\n\nSubject: ${crSubject}\n\n${crBody}`
      : `Country Rostering would NOT be emailed: the shift starts within ${CR_MIN_HOURS} hours, so the crew member would be asked to phone.`;
    await send({ from: sender, to: trialTo, subject: `TRIAL — ${mgrSubject}`,
      text: `TRIAL: ${cluster} is not live on the new roster yet, so this went only to the trial address. Nothing was sent to Country Rostering or the managers.\n\n` +
        `------------------------------\n${crPart}\n------------------------------\n\nThe team manager${managerTo.length ? ` (${managerTo.join(", ")})` : ""} and area manager would get:\n\n` +
        `Subject: ${mgrSubject}\n\n${mgrBody(outside ? "Country Rostering HAS been emailed automatically." : `The shift starts within ${CR_MIN_HOURS} hours, so Country Rostering was NOT emailed. The crew member was asked to phone Country Rostering.`)}` });
    return;
  }

  let crSent = false, crError = "";
  if (outside && cr) {
    try {
      await send({ from: sender, to: [cr], cc: uniq([contact?.country_rostering_cc]), reply_to: managerTo.length ? managerTo : undefined, subject: crSubject, text: crBody });
      crSent = true;
    } catch (e) { crError = String((e as Error).message || e); }
  }
  const status = crSent ? `Country Rostering HAS been emailed automatically (${cr}).`
    : !outside ? `The shift starts within ${CR_MIN_HOURS} hours, so Country Rostering was NOT emailed. The crew member was asked to phone Country Rostering.`
    : !cr ? "Country Rostering was NOT emailed because no Country Rostering address is set on the roster settings page. The crew member was asked to phone Country Rostering."
    : "The Country Rostering email FAILED to send. The crew member was asked to phone Country Rostering. Please confirm they have been notified.";
  const alertTo = uniq([...managerTo, contact?.area_manager_email]);
  // Not retried after this point, so Country Rostering is never emailed twice; the managers are told if it failed.
  if (crError) console.error("Country Rostering email failed: " + crError);
  if (alertTo.length) {
    try { await send({ from: sender, to: alertTo, subject: mgrSubject, text: mgrBody(status) }); }
    catch (e) { if (!crSent) throw e; console.error("Manager alert failed after Country Rostering was emailed: " + e); }
  }
}

Deno.serve(async () => {
  const { data: jobs, error } = await sb.rpc("roster_email_claim");
  if (error) return json({ error: error.message }, 500);
  const results: unknown[] = [];
  for (const job of jobs || []) {
    try { await handle(job); await sb.rpc("roster_email_done", { p_id: job.id, p_error: null }); results.push({ id: job.id, ok: true }); }
    catch (e) {
      const msg = String((e as Error).message || e).slice(0, 500);
      await sb.rpc("roster_email_done", { p_id: job.id, p_error: msg }); results.push({ id: job.id, error: msg });
    }
  }
  return json({ processed: results.length, results });
});
