// The 24-hour roster reminder, as an app notification (web push) (stage 4d of the Supabase roster, 17 Nov 2026).
// body { mode: "scheduled" }  from the hourly pg_cron job roster-remind: for each team whose roster goes to Country
//        Rostering within 24 hours (roster_reminder_claim, once per send), notify the team members who turned
//        reminders on, listing the hours that still have no crew. Takes no other input.
// body { mode: "test" }       from a signed-in person on the roster page: a test notification to their own devices.
// body { mode: "test", kind: "dsy" } the same from the shared DSY switch (/shared/reminders.js), to the person's
//        whole-site devices (scope "/"), which get every reminder: roster and training sessions (owner, 22 Nov 2026).
// body { mode: "sessions" }   from the pg_cron job session-remind (owner, 22 Nov 2026): for each training session that
//        starts within 12 hours (session_reminder_claim, once per session), notify its team's members who turned
//        reminders on (not those who said "Sorry, not this time"): session name, who leads it, time and place.
// body { mode: "key" }        makes sure the signing keys exist and returns the public one (the page subscribes with it).
// The signing (VAPID) keys are made here the first time and kept in public.roster_push_keys: only this function's
// service role can read the private key.
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const URL_ = Deno.env.get("SUPABASE_URL")!;
const TZ = "Australia/Adelaide";
const HOUR = 3600000;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const service = () => createClient(URL_, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const b64url = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function keys(sb: ReturnType<typeof service>) {
  let { data } = await sb.rpc("roster_push_keys_get");
  if (!data) {
    const pair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
    const pub = b64url(new Uint8Array(await crypto.subtle.exportKey("raw", pair.publicKey)));
    const jwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
    const made = await sb.rpc("roster_push_keys_init", { p_public: pub, p_private: jwk.d });
    if (made.error) throw new Error(made.error.message);
    data = made.data;
  }
  webpush.setVapidDetails("mailto:EProsters@dsytraining.com", data.public_key, data.private_key);
  return data.public_key as string;
}

function fmt(t: number, withDay = true) {
  const o: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(t))) o[p.type] = p.value;
  return (withDay ? o.weekday + " " : "") + o.hour + ":" + o.minute;
}
const dayOf = (t: number) => new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "short" }).format(new Date(t));

// Runs of hours with no crew (operational code NC), as "Mon 18:00 to Tue 08:00".
function gaps(data: any) {
  const out: string[] = [];
  let start = -1;
  const hours = data.hours as any[], codes = data.codes as string[];
  for (let i = 0; i <= hours.length; i++) {
    const open = i < hours.length && codes[i] === "NC";
    if (open && start < 0) start = i;
    if (!open && start >= 0) {
      const s = Date.parse(hours[start].t), e = Date.parse(hours[i - 1].t) + HOUR;
      out.push(`${fmt(s)} to ${dayOf(s) === dayOf(e - 1) ? fmt(e, false) : fmt(e)}`);
      start = -1;
    }
  }
  return out;
}

// "7:00 pm"
function clock(t: string | null) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}
// "today", "tomorrow" or "on Tuesday", for a session date (YYYY-MM-DD) seen from now in Adelaide.
function whenDay(date: string) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
  const diff = Math.round((Date.parse(date) - Date.parse(today)) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  return "on " + new Intl.DateTimeFormat("en-AU", { timeZone: "UTC", weekday: "long" }).format(new Date(date));
}

// Send one message to a list of devices; forget the devices the push service says are gone.
async function push(sb: ReturnType<typeof service>, subs: any[], make: (s: any) => unknown) {
  let sent = 0;
  const gone: string[] = [], errors: string[] = [];
  for (const s of subs || []) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(make(s)), { TTL: 12 * 3600 });
      sent++;
    } catch (e) {
      const code = (e as any).statusCode;
      if (code === 404 || code === 410) gone.push(s.endpoint);
      else errors.push(String(code || (e as Error).message).slice(0, 80));
    }
  }
  if (gone.length) await sb.rpc("roster_push_drop", { p_endpoints: gone });
  return { sent, gone: gone.length, errors };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const body = await req.json().catch(() => ({}));
    const sb = service();
    const publicKey = await keys(sb);

    if (body.mode === "key") return json({ public_key: publicKey });

    if (body.mode === "test") {
      const user = createClient(URL_, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } });
      const { data: all, error } = await user.rpc("roster_push_mine");
      if (error) return json({ error: error.message }, 400);
      const dsy = body.kind === "dsy";
      const mine = (all || []).filter((s: any) => !dsy || s.sw_scope === "/");
      if (!mine.length) return json({ error: "Reminders are not turned on for this device yet." }, 400);
      if (dsy) {
        return json(await push(sb, mine, () => ({ title: "DSY reminders are on", body: "This is a test. You'll get your team's roster reminder, and a reminder 12 hours before each training session.", url: "/" })));
      }
      const r = await push(sb, mine, (s) => ({ title: "Roster reminders are on", body: "This is a test. You'll get a reminder the day before your team's roster is sent.", url: s.page_url || "/modules/rosters/" }));
      return json(r);
    }

    if (body.mode === "sessions") {
      const { data: due, error } = await sb.rpc("session_reminder_claim");
      if (error) return json({ error: error.message }, 500);
      const results: unknown[] = [];
      for (const s of due || []) {
        try {
          const { data: subs } = await sb.rpc("session_push_targets", { p_session: s.session_id });
          const time = clock(s.start_time) + (s.end_time ? ` to ${clock(s.end_time)}` : "");
          const text = `${s.title}. ${s.led_by ? `Led by ${s.led_by}. ` : ""}${time}${s.location ? ` at ${s.location}` : ""}. Tap to say if you're coming.`;
          const r = await push(sb, subs || [], () => ({ title: `${s.team} training ${whenDay(s.session_date)}, ${clock(s.start_time)}`, body: text, url: "/training/" }));
          results.push({ team: s.team, session: s.session_id, ...r });
        } catch (e) {
          results.push({ team: s.team, session: s.session_id, error: String((e as Error).message || e).slice(0, 200) });
        }
      }
      return json({ processed: results.length, results });
    }

    if (body.mode !== "scheduled") return json({ error: "Unknown request." }, 400);
    const { data: due, error } = await sb.rpc("roster_reminder_claim");
    if (error) return json({ error: error.message }, 500);
    const results: unknown[] = [];
    for (const job of due || []) {
      try {
        const { data, error: e1 } = await sb.rpc("roster_send_data", { p_group: job.group_id, p_first: job.first, p_days: job.days, p_sender: "reminder" });
        if (e1) throw new Error(e1.message);
        const { data: subs } = await sb.rpc("roster_push_targets", { p_group: job.group_id });
        const open = gaps(data);
        const text = `The roster goes to Country Rostering ${fmt(Date.parse(job.send_at))}. ` +
          (open.length ? `No crew yet: ${open.slice(0, 3).join(", ")}${open.length > 3 ? ` and ${open.length - 3} more` : ""}. Can you help?`
                       : "Every hour has crew so far. Please check your shifts are right.");
        const r = await push(sb, subs || [], (s) => ({ title: `${job.team} Team Roster`, body: text, url: s.page_url || "/modules/rosters/" }));
        results.push({ team: job.team, ...r });
      } catch (e) {
        results.push({ team: job.team, error: String((e as Error).message || e).slice(0, 200) });
      }
    }
    return json({ processed: results.length, results });
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 500);
  }
});
