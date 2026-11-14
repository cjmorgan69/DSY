# DSY Team News (owner's newsletter, not part of the website)

A monthly PDF newsletter for the Coffin Bay, Cummins, Tumby Bay and Port Neill teams: rostered hours, pages and job
types, who was on the roster, training done and coming up, and the weather. Not served by GitHub Pages (folder starts
with a dot). First trial: 17 Oct to 14 Nov 2026 (14 Nov 2026).

When the owner asks for the newsletter ("do the newsletter for November"), the default period is the calendar month.

## Steps

1. **Data.** Copy `data.sql`, replace `{{FROM}}` and `{{TO}}` (inclusive dates), run it with Supabase `execute_sql` on
   project `ekaodnbnpsuayvmxvxbm`, and write the returned JSON object to `<scratchpad>/data.json` (the whole row
   `{"data": {...}}` or just the inner object; both work). It also returns training up to 35 days after `TO` for
   "Coming up".
2. **Weather.** `node .claude/newsletter/weather.js FROM TO > <scratchpad>/weather.json` (BOM Daily Weather
   Observations: Port Lincoln for Coffin Bay and Tumby Bay, Cummins, Cleve Aerodrome for Port Neill; BOM keeps about 13
   months). Open-Meteo is not used because its free daily limit is shared and often used up on this server.
3. **Words.** Write `<scratchpad>/words.json` in a chatty, friendly tone, first names only:
   `intro`, `shoutouts` (list, about 4 to 5; top hours per team, most pages, anyone covering two teams),
   `trainingNote`, `comingNote` (point to the modules for coming sessions), `weatherNote`, `signoff` (from Chris),
   optional `teams` (`{"Cummins": "one extra line"}`), `issue` (subtitle, e.g. "November 2026"), and `final: true` to
   drop the DRAFT label once the owner approves it.
4. **Build.** `node .claude/newsletter/make.js <scratchpad>/data.json <scratchpad>/weather.json <scratchpad>/words.json --out <scratchpad>/news`
   It prints the PDF path and a check line (pages, unique jobs, hours, volunteers, jobs attended by other crews,
   attendance names with no surname). Look at the pages (`pdftoppm -r 60 -png`) and keep it to 2 A4 pages, then send
   the PDF with the file tool. List anything odd for the owner (new name spellings, gaps, unknown names).

## Owner's rules (14 Nov 2026)

- Chatty tone, **first names only** (make.js adds a surname initial only if two people in a team share a first name).
- Monthly (probably), as a PDF.
- **Jobs with no local rostered crew**: say they were "attended by other crews" (counted per team).
- Thank the people **on the roster when the pager went off**; that means rostered, not proven to have attended.

## Privacy rules (patients must not be identifiable in small towns)

- Job types only as team totals in plain groups (Falls, Transfers, Heart, chest and breathing, Fainting or collapse,
  Road crashes, Helping other services, Retrievals, Other medical). Arrests, overdoses, seizures, strokes and the like
  go under "Other medical". Vehicle movements are left out.
- A team with 3 pages or fewer shows no job types.
- No dates, times, places or priorities next to any job type, and no names next to a job. Never tie the weather or a
  shout-out to a particular job ("the pager went off four times in one day" is fine; what the jobs were is not).

## Data notes

- Hours are rostered (on-call) hours from `roster_bookings` (Active), clipped to the period and to now. PARA bookings
  (paramedic cover placeholders such as LEP40, CO85) are shown only as "Paramedic cover added about N hours".
  "RTL Test Only" is skipped.
- Pages come from `paging_jobs`; team = `team` or `paging_team(unit)`. A job paging several teams has a different job
  number per team, so unique jobs are matched on dispatch time + type.
- Name spellings that differ between the roster and the training app are joined in `ALIAS` in make.js
  (Ann/Anne Auld, Cathy/Catherine Haarsma, Vicky DeVries/Devries/Victoria De Vries, Midge/Michelle Guidera,
  Dave/David Chapman). Add new pairs as they turn up.
- Training attendance is only as good as the ticks in `/training/`; the owner said attendees are not yet linked for
  most sessions. Training-app accounts with first names only (Geoff, Peter, Anike, Chris) appear as written.
