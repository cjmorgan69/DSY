# Vehicle check

`/vehicle-check/` (`index.html`, `app.js`, `checklist.js`). SQL in `supabase/vehicle-check-setup.sql`.

Say plainly whether a thing is on main or still on a branch.

## What it is (15 Nov 2026, live, PR #238 merged)

The owner sent SAAS FRM-384 Volunteer Vehicle Checklist - Mercedes VS 30, version 2.2 (30.10.2025) and asked for a
web app the crew can use to check the ambulance: separate sections so several crew can check at once, every check
recorded, a stock-to-order list, and a prompt to check a section that has not been checked.

- `checklist.js`: every section, item, description and quantity of the form (43 sections). Spelling slips in the
  form were corrected (Advice, Manual, Glucagon, Burgundy, Paed, aide memoire). The form has no areas: the six areas
  (Cab; Grab & Go and Lockers 1 to 3; Locker 4 workstation and drug drawer; Lockers 5 to 12; Lockers 13 to 17 and
  maternity kit; Lockers 18 to 24) are Claude's grouping in the form's order, for the owner to review. Section ids
  must not be renamed: saved checks point at them. Another vehicle type = another key in `VEHICLE_CHECKLISTS` and
  `vehicles.checklist`.
- Screens: `#` (choose vehicle, progress, "Check this next", areas and sections), `#s=<section>` (OK / Short per
  item, how many to order, note), `#stock` (order list: change quantity, Ordered, Restocked, copy as text, add an
  item by hand), `#history` (last 100 checks).
- Student gate (any signed-in member). Facilitators and leaders can add or rename a vehicle and set how often every
  section should be checked (`check_every_days`, default 7).
- Prompt rule: a section is due if never checked or last checked more than `check_every_days` ago. Never-checked
  sections come first (form order), then the one checked longest ago. After saving, the next due section in the
  same area is offered.
- Several crew at once: opening a section inserts a `vehicle_checks` row with no `completed_at`; others see "X is
  checking this now" for 20 minutes. Leaving without saving deletes the row. The home screen refreshes every 20 s.
  Unsaved ticks are kept on the device.
- Stock list: an item saved as Short opens a line in `vehicle_stock_needs` (one open line per item); the line closes
  (restocked) when the item is next saved as OK, or by hand.
- Supabase (applied by Claude on 15 Nov 2026, migration `vehicle_check_setup`): `vehicles`, `vehicle_checks`,
  `vehicle_stock_needs`, view `vehicle_section_status` (security invoker). RLS: signed-in members read everything,
  insert their own checks, finish or cancel only their own unfinished check, and anyone signed in can change a
  stock line; vehicles are changed by facilitators only; anon has no grants. Seeded one vehicle per team
  ("Tumby Bay ambulance", "Cummins ambulance", "Port Neill ambulance", "Coffin Bay ambulance"): placeholders for the
  owner to rename.
- Tested in a phone-sized browser against a stand-in database (Claude cannot sign in as a member). Not yet tested
  with a real sign-in.

## Not done / to ask

- No expiry-date checks, no vehicle (fuel, lights, tyres) checks: the form has none.
- No leader view across all vehicles, no email of the order list (copy as text only).
