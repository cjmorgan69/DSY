// The roster document for Country Rostering, as a PDF (A4 landscape). Same layout as the roster page's
// "Country Rostering PDF view": 7 roster days a sheet, two pages per sheet (08:00-19:59 and 20:00-07:59),
// three crew lines an hour ("Full Name (ambulance ID) (level)") and the operational restriction in its colour.
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

const TZ = "Australia/Adelaide";
const HOUR = 3600000;
const OP: Record<string, [string, string]> = {   // background, text (as on the roster page)
  NC: ["#ff0000", "#ffffff"], A: ["#0080ff", "#ffffff"], B: ["#00ffff", "#000000"], C: ["#ffff00", "#000000"],
  D: ["#ff00ff", "#ffffff"], E: ["#ff8080", "#000000"], Z: ["#808080", "#000000"], N: ["#00ff00", "#000000"],
  REVIEW: ["#fef3c7", "#000000"],
};
const hex = (h: string) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
// The built-in PDF fonts only hold Latin-1 characters.
const latin = (s: string) => String(s || "").replace(/[‘’]/g, "'").replace(/[–—]/g, "-").replace(/[^\x20-\x7e\xa0-\xff]/g, "?");

export function when(iso: string | Date) {
  const o: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat("en-AU", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso))) o[p.type] = p.value;
  return `${o.weekday}, ${o.day} ${o.month} ${o.year} ${o.hour}:${o.minute}`;
}
function dayLabel(day: string) {   // "2026-11-16" -> "Mon, 16 Nov"
  const d = new Date(day + "T12:00:00Z");
  return new Intl.DateTimeFormat("en-AU", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" }).format(d);
}

export async function buildRosterPdf(data: any, opts: { trial: boolean; generatedAt: Date }) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  pdf.setTitle(latin(`${data.team} roster ${data.first}`));

  // cell lookup: day -> clock hour -> { crew lines, code }
  const cells: Record<string, Record<number, { crew: { name: string; tail: string }[]; code: string }>> = {};
  const days: string[] = [];
  (data.hours as any[]).forEach((h, i) => {
    if (!cells[h.day]) { cells[h.day] = {}; days.push(h.day); }
    const t = Date.parse(h.t);
    const crew = (data.shifts as any[]).filter((s) => Date.parse(s.start) < t + HOUR && Date.parse(s.end) > t)
      .map((s) => ({ name: latin(s.name), tail: latin(`${s.staff_id ? ` (${s.staff_id})` : ""} (${s.level})`) }));
    cells[h.day][h.hour] = { crew, code: String(data.codes[i] || "") };
  });

  const W = 841.89, H = 595.28, M = 22, TIME_W = 34, OP_W = 22, HEAD = 58, COL_HEAD = 26, ROWS = 12;
  const line = hex("#9ca3af"), faint = hex("#e5e7eb"), ink = hex("#111827"), green = hex("#1f5b43");
  const halves = [{ label: "08:00 to 19:59", hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
                  { label: "20:00 to 07:59", hours: [20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7] }];
  const sheets: string[][] = [];
  for (let i = 0; i < days.length; i += 7) sheets.push(days.slice(i, i + 7));
  const totalPages = sheets.length * 2;
  const period = `Roster from ${when(data.from)} to ${when(data.to)}`;
  let pageNo = 0;

  // Shrink to fit, then shorten the name only: the ambulance ID and level are always kept.
  const fit = (name: string, tail: string, f: any, size: number, max: number, min = 5) => {
    let s = size;
    while (s > min && f.widthOfTextAtSize(name + tail, s) > max) s -= 0.2;
    if (f.widthOfTextAtSize(name + tail, s) <= max) return { text: name + tail, size: s };
    let n = name;
    while (n.length > 3 && f.widthOfTextAtSize(n + ".." + tail, s) > max) n = n.slice(0, -1);
    return { text: n === name ? name + tail : n.trimEnd() + ".." + tail, size: s };
  };

  for (const sheet of sheets) {
    for (const half of halves) {
      pageNo++;
      const page = pdf.addPage([W, H]);
      const dayW = (W - 2 * M - TIME_W) / 7, crewW = dayW - OP_W;
      const top = H - M;
      page.drawText(latin(`${data.team} - Country Rostering Roster`), { x: M, y: top - 14, size: 15, font: bold, color: green });
      page.drawText(latin(`${period}.`), { x: M, y: top - 28, size: 8.5, font, color: ink });
      page.drawText(latin(`Page ${pageNo} of ${totalPages} - ${half.label} - sent ${when(opts.generatedAt)} by ${data.sender || "the roster manager"}` +
        ` from the ${data.team} Team Roster, dsytraining.com`), { x: M, y: top - 40, size: 7, font, color: hex("#4b5563") });
      if (opts.trial) {
        const t = "TRIAL - NOT AN OFFICIAL ROSTER";
        page.drawText(t, { x: W - M - bold.widthOfTextAtSize(t, 11), y: top - 14, size: 11, font: bold, color: hex("#b91c1c") });
      }
      const tableTop = top - HEAD, rowH = (tableTop - COL_HEAD - M) / ROWS, lineH = rowH / 3;
      // column headings
      page.drawRectangle({ x: M, y: tableTop - COL_HEAD, width: W - 2 * M, height: COL_HEAD, color: hex("#e8f1fb") });
      page.drawText("Time", { x: M + 7, y: tableTop - 16, size: 7.5, font: bold, color: ink });
      sheet.forEach((day, d) => {
        const x = M + TIME_W + d * dayW;
        const lab = dayLabel(day);
        page.drawText(lab, { x: x + (dayW - bold.widthOfTextAtSize(lab, 8)) / 2, y: tableTop - 10, size: 8, font: bold, color: hex("#1d4ed8") });
        page.drawText("Crew / level", { x: x + 4, y: tableTop - 22, size: 6, font, color: hex("#1d4ed8") });
        page.drawRectangle({ x: x + crewW, y: tableTop - COL_HEAD, width: OP_W, height: COL_HEAD / 2, color: hex("#fde68a") });
        page.drawText("Op", { x: x + crewW + (OP_W - font.widthOfTextAtSize("Op", 6)) / 2, y: tableTop - 22, size: 6, font, color: ink });
      });
      // rows: shading first, so no row covers the line above it
      half.hours.forEach((hour, r) => {
        const y = tableTop - COL_HEAD - (r + 1) * rowH;
        page.drawRectangle({ x: M, y, width: W - 2 * M, height: rowH, color: hex(hour >= 8 && hour < 18 ? "#fef9c3" : "#eef2f7") });
      });
      half.hours.forEach((hour, r) => {
        const y = tableTop - COL_HEAD - (r + 1) * rowH;
        page.drawText(String(hour).padStart(2, "0") + ":00", { x: M + 5, y: y + rowH - 10, size: 7.5, font: bold, color: ink });
        sheet.forEach((day, d) => {
          const x = M + TIME_W + d * dayW, cell = (cells[day] || {})[hour];
          for (let k = 1; k < 3; k++) page.drawLine({ start: { x, y: y + k * lineH }, end: { x: x + crewW, y: y + k * lineH }, thickness: 0.3, color: faint });
          if (!cell) return;   // an hour that doesn't exist (daylight saving)
          cell.crew.slice(0, 3).forEach((who, k) => {
            const f = fit(who.name, who.tail, font, 6.4, crewW - 5);
            page.drawText(f.text, { x: x + 2.5, y: y + rowH - (k + 1) * lineH + (lineH - f.size) / 2 + 0.8, size: f.size, font, color: ink });
          });
          const code = cell.code === "Review" ? "REVIEW" : cell.code, c = OP[code] || ["#ffffff", "#000000"];
          page.drawRectangle({ x: x + crewW, y, width: OP_W, height: rowH, color: hex(c[0]) });
          const lab = code === "REVIEW" ? "REV" : code;
          page.drawText(lab, { x: x + crewW + (OP_W - bold.widthOfTextAtSize(lab, 7.5)) / 2, y: y + rowH / 2 - 2.7, size: 7.5, font: bold, color: hex(c[1]) });
        });
        page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.7, color: line });
      });
      // grid lines
      const bottom = tableTop - COL_HEAD - ROWS * rowH;
      for (let d = 0; d <= 7; d++) {
        const x = M + TIME_W + d * dayW;
        page.drawLine({ start: { x, y: tableTop }, end: { x, y: bottom }, thickness: 0.7, color: line });
        if (d < 7) page.drawLine({ start: { x: x + crewW, y: tableTop - COL_HEAD / 2 }, end: { x: x + crewW, y: bottom }, thickness: 0.3, color: line });
      }
      page.drawRectangle({ x: M, y: bottom, width: W - 2 * M, height: tableTop - bottom, borderColor: line, borderWidth: 0.8 });
      page.drawLine({ start: { x: M, y: tableTop - COL_HEAD }, end: { x: W - M, y: tableTop - COL_HEAD }, thickness: 0.8, color: line });
    }
  }
  return await pdf.save();
}
