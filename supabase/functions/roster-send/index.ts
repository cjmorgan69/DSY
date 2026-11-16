// "Send roster to Country Rostering" (stage 4b of the Supabase roster, 17 Nov 2026).
// Called by a signed-in roster manager or Team Leader from the roster page (and, later, by the weekly schedule).
// body: { group_id, first: "YYYY-MM-DD" (first roster day, 08:00 Adelaide), days: 1-28, mode: "preview" | "send" }
// preview: returns the PDF and who it would go to. send: emails the PDF from "<Team> Team Roster"
// <EProsters@dsytraining.com>, keeps a copy in the private bucket roster-sent, moves the sent cut-off to the end of
// the period and writes the change log. While the cluster is on trial (and always for the test team) it goes ONLY
// to the trial address, marked TRIAL. The database decides who may do this (roster_send_prepare).
import { createClient } from "npm:@supabase/supabase-js@2";
import { buildRosterPdf, when } from "./pdf.ts";

const URL_ = Deno.env.get("SUPABASE_URL")!;
const RESEND = Deno.env.get("RESEND_API_KEY") || "";
const FROM = "EProsters@dsytraining.com";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const uniq = (a: (string | null | undefined)[]) => {
  const seen = new Set<string>(), out: string[] = [];
  for (const x of a) { const v = (x || "").trim(); if (v && !seen.has(v.toLowerCase())) { seen.add(v.toLowerCase()); out.push(v); } }
  return out;
};
function base64(bytes: Uint8Array) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const auth = req.headers.get("Authorization") || "";
    const body = await req.json().catch(() => ({}));
    const mode = body.mode === "send" ? "send" : "preview";
    // Everything is read as the signed-in person, so the database's manager check applies.
    const user = createClient(URL_, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: auth } } });
    const { data, error } = await user.rpc("roster_send_prepare", { p_group: body.group_id, p_first: body.first, p_days: Number(body.days) || 7 });
    if (error) return json({ error: error.message }, 400);

    const now = new Date();
    const pdf = await buildRosterPdf(data, { trial: data.trial, generatedAt: now });
    const managers = uniq(data.manager_emails || []);
    const to = data.trial ? uniq([data.trial_email]) : uniq([data.country_rostering_email]);
    const cc = data.trial ? [] : uniq([data.country_rostering_cc, ...managers]).filter((x) => !to.map((t) => t.toLowerCase()).includes(x.toLowerCase()));
    const last = new Date(Date.parse(data.first + "T00:00:00Z") + (data.days - 1) * 86400000).toISOString().slice(0, 10);
    const filename = `${data.team} roster ${data.first} to ${last}.pdf`.replace(/[^\w .-]/g, "");
    const period = `${when(data.from)} to ${when(data.to)}`;
    const missing = to.length ? "" : data.trial ? "No trial address is set for this cluster." : "No Country Rostering address is set for this cluster (Roster emails page).";
    const info = { team: data.team, trial: data.trial, to, cc, reply_to: managers, period, from: data.from, until: data.to, filename, sent_until: data.sent_until, missing };

    if (mode === "preview") return json({ ...info, pdf_base64: base64(pdf) });

    if (missing) return json({ error: missing }, 400);
    if (!RESEND) return json({ error: "The email service key is not set." }, 500);

    const text =
      (data.trial ? `TRIAL: ${data.cluster} is not live on the new roster yet, so this went only to the trial address. Country Rostering was not sent anything.\n\n------------------------------\n` : "") +
      `Hello Country Rostering,\n\nPlease find attached the ${data.team} roster from ${period}.\n\n` +
      `Any change to these shifts from now on will be emailed to you when the shift is more than 24 hours away. For a shift within 24 hours, the crew member will phone you.\n\n` +
      `Kind regards,\n${data.sender || "Roster manager"}\n${data.team} Team Roster\n\nThis email was sent by the ${data.team} Team Roster, dsytraining.com.`;
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${data.team} Team Roster <${FROM}>`, to, cc: cc.length ? cc : undefined, reply_to: managers.length ? managers : undefined,
        subject: `${data.trial ? "TRIAL — " : ""}${data.team} roster: ${period}`, text,
        attachments: [{ filename, content: base64(pdf) }],
      }),
    });
    if (!r.ok) return json({ error: `The email was not sent (${r.status}): ${(await r.text()).slice(0, 200)}` }, 502);

    // The email has gone. From here on, report problems but never ask the person to send again.
    const warnings: string[] = [];
    const path = `${body.group_id}/${data.first}_${now.toISOString().replace(/[:.]/g, "-")}.pdf`;
    const service = createClient(URL_, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const up = await service.storage.from("roster-sent").upload(path, pdf, { contentType: "application/pdf" });
    if (up.error) warnings.push("The copy of the PDF was not saved: " + up.error.message);

    let cutoff = data.sent_until;
    if (!data.sent_until || Date.parse(data.sent_until) < Date.parse(data.to)) {
      const set = await user.rpc("roster_set_sent", { p_group: body.group_id, p_until: data.to, p_editing: Boolean(data.sent_until) });
      if (set.error) warnings.push("The sent cut-off was NOT moved: " + set.error.message + " Set it in Manager controls.");
      else cutoff = data.to;
    }
    const log = await user.rpc("roster_log_sent", { p_group: body.group_id, p_details: { from: data.from, to: data.to, emailed_to: to, cc, trial: data.trial, copy: up.error ? null : path, cutoff } });
    if (log.error) warnings.push("The change log entry was not written.");
    return json({ ...info, sent: true, cutoff, warnings });
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 500);
  }
});
