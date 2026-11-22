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

## Item cross-reference and item info (22 Nov 2026, live, PR #314 merged)

Owner's plan: a lesson where the crew do a complete real check of the vehicle (that comes first), then, if time
allows, each person talks about one item: what it is for and which protocol it belongs to.

- `vehicle-check/item-info.js`: rules (first match on "item | description") giving what the item is for (DSY
  wording), the AO protocols and CPPROs whose text names it (with PDF links and CPPRO review dates), and AO scope.
  Medicine scope from the SAAS app dose table (main.10d22172e56532ee.js). The Cardiac Arrest PDFs (CPP-002-AO v4.2,
  CPP-043-AO v2.1) export blank: their text was pasted by the owner on 22 Nov 2026; they have no PDF link.
- App: an "i" button on each item in a section opens the info; `#guide` Kit guide lists every item with its info and
  a search box (for preparing the talk).
- Owner's answers to the first draft (22 Nov 2026): salbutamol MDI without consult (app says Consult); GTN without
  consult only if the patient's own GTN is prescribed; benzylpenicillin: follow the Sepsis protocol, to be changed
  over for ceftriaxone; carbetocin not AO; TNT envelopes = Treat and Refer; overdue CPPRO review dates noted only.
- Also (22 Nov 2026): Co-Phenylcaine is AO for NPA insertion; ipratropium MDI is AO on EOC consult, doses as per the
  paramedic guideline; nasal cannula up to 4 L/min whenever a protocol says oxygen may be needed (app: ipratropium MDI 8 puffs if 6 or older, 4 puffs under 6, CPG-114-P).
  Only open point left on the table: water for injection is not named in an AO protocol.
- PPE, hand hygiene, cleaning, sharps and waste items link to CTL-014 Infection Control Precautions and Cleaning
  (chart V3, 17 May 2018; on the SAAS site as a clinical tool since 4 Jun 2025), sent by the owner on 22 Nov 2026.
- The Locker 4 top drawer tourniquet is the venous tourniquet for IV access (owner, 22 Nov 2026), not the arterial one.

## Grab & Go kits (22 Nov 2026, live, PR #314 merged)

New area "Grab & Go kits" (id `kits`, placed after the Grab & Go lockers) with four sections, from the owner's forms:
- `red-trauma-kit`: FRM-397 Red Trauma Kit - Volunteer v4.1 (2025), written contents list.
- `yellow-drug-kit`: the yellow drug kit inside it (FRM-397 contents list). The FRM-397 photos also show IV cannulas
  (14G to 24G) and an Atrovent (ipratropium) inhaler that the written list leaves out: owner (22 Nov 2026) added both: cannulas 14G to 24G, 2 of each, and the inhaler.
- `blue-airway-kit`: FRM-365 Blue Airway Kit - Volunteer (Aug 2025), written list (6 resus masks incl. red adult; the
  photo page shows 5 masks and an Aquim gel 60 mL that the list leaves out; owner: keep all 6 masks and add the gel).
- `oxygen-sock`: owner's contents (22 Nov 2026): Halo C cylinder; adult and paediatric each of nasal specs, 8 L/min
  mask, 15 L/min NRM, nebuliser mask.

## Lesson: Know your vehicle (22 Nov 2026, PR #315, not merged)

Owner chose the earlier idea: a complete check of the real vehicle first (pairs take one area each), then if time a
2 to 3 minute talk per person on one item they checked. `#lesson` (button "Lesson plan" for facilitators on the
vehicle screen; the address works for anyone): DSY-written plan with timings, the areas with section and item counts
and live progress (who is checking now), talk prompts, links to the Kit guide, Stock to order and the general
feedback form. Areas are uneven: Grab & Go kits has 120 items. To add as a lesson in `public.lessons` once live.
