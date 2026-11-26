# MDT simulator

`/mdt/`, its job library `mdt/jobs.js`, saved jobs, queue, GPS, Navigate and the user guide.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## MDT simulator

MDT simulator (`/mdt/`, 17 Oct 2026): iPad practice of the vehicle data terminal status workflow (Ack, Enroute, Time
Scene + confirm, Mobile + destination list + confirm, P.H. logs only, Arrive Dest, Clear + direct-admission tick
box, Available), instructor setup screen, fictional data only, run log. Unit codes (owner): AK acknowledged, ER
responding, TS time scene, TM time mobile, TD time destination; DP (dispatched) is a placeholder. Live (menu: no
Map, Logoff or Team Leader tab, as the owner asked). Job library `mdt/jobs.js`: one job per converted walk-through,
taken from its MDT display; type codes blank (real SACAD codes unknown), surnames and unnamed towns DSY-invented, no
booking (student chooses), expected destination shown in the run log. Logon screen first (instructor can switch it
off): fields marked * must be filled before Submit, on-screen keyboard via the Keyboard button (draggable by its top
bar, kept short so the crew fields stay reachable), the *Crew ID 2 button fills NONE (owner), typed call sign used
for the run; Clin. Status offers only "N - No restrictions" (owner); the Equipment list is a placeholder. Event tab
shows Received and Dispatched (HH:MM:SS; P1/P2 within a minute, lower priorities 3 to 15 minutes apart). Remarks:
plain lines are timed between received and dispatch; lines starting +M arrive live M minutes after dispatch (newest
at the top; red flag on the REMARKS tab until read; run log notes it). Each library job has 2 or 3 DSY-written live
remarks fitting its scenario's arrival scene (owner to review). Sim clock runs 3 x faster by default (instructor can
choose real time, 2, 3 or 5 x) so live remarks arrive during a short en-route discussion; no drive-time lock
(owner). MDT simulator is a Supabase lesson. Saved jobs (localStorage `dsy-mdt-saved`; one Jobs list with Library
and My saved jobs groups; a saved job keeps call sign, crew type and fleet number (owner); loading one shows
"Editing saved job" with Save changes / Save as new / Rename / Delete, index in `dsy-mdt-editing`) and a job queue
(`dsy-mdt-queue`; the screen's job runs first, then each queued job is dispatched after Clear with a chosen gap;
same crew, clock and logon; unit starts at the last hospital; per-job run-log summaries; Restart = from job 1). User
guide `/userguides/mdt/` (same style as the roster guide; screenshots in `userguides/mdt/img/`, retake them if
screens change), linked from the MDT setup page. Full screen: Start goes full screen where the browser allows it
(Full screen / Exit button in the top bar); `mdt/manifest.json` (display fullscreen, landscape) and icons make an
Add to Home Screen icon open it full screen every time. GPS statuses (setup: Off (classroom, default) / On (real
drive), saved with a job): like the real MDT (owner), ENROUTE when 100 m from the Ack position, Time Scene within 50
m of the map location (coordinates, Maps link or an address looked up via OpenStreetMap Nominatim), Arrive Dest
within 100 m of the chosen hospital; Mobile and Clear manual; fixes worse than 75 m ignored; run log marks (GPS).
Hospital positions are the real hospitals from OpenStreetMap (Nov 2026) except Barmera and Yorketown (town centres,
no GPS arrival). Navigate button: Google Maps directions link plus a QR code (qrcodejs 1.0.0 from cdnjs) to the
scene before Mobile (setup field "Map location": address, lat,long or Maps link, public places only; blank = town
centre) and to the chosen hospital after Mobile. Customiser link: the chest pain customiser has "Open in MDT
simulator" (`/mdt/#s=chest-pain-ao&...`), which fills the library job from the customised fields
(`customSlug`/`custom()` in `mdt/jobs.js`; list of linked slugs in `scenarios/index.html`). Add a mapping when
making another scenario customisable. Town box is free text; Closest uses the town, else the station, else A to Z.

## Crew and location review (22 Nov 2026)

Each library job now sets its own call sign from its station and dispatch time (`MDT_CALLSIGN` in `mdt/jobs.js`:
team letters + 81 from 0800 to 1800, + 181 from 1800 to 0800); a station with no team letters keeps the setup
screen's call sign, and a saved job keeps its own. Customised jobs use the customised station and time. Owner's
decisions: chest pain is dispatched from Cleve (CL181; Arno Bay was a DSY-invented town with no station); the snake
bite crew is from Cummins, not Port Lincoln (response 25 min and Port Lincoln Hospital 30 min unchanged; walk-through
text and the `envenomation-ao` template's station default changed to match). Customiser fixes: asthma, anaphylaxis
and ACPO now dispatch from the customised town's station when the station is left blank; the MVA street keeps the
chosen direction (north/south/east/west).. Checked against the PCR trainer the same day: library
surnames now match the walk-throughs' handovers (Mitchell, Collins, Thompson, Patterson, Henley); stroke paged at 1100
to fit the PCR card's onset 1015 and "45 minutes ago"; "Cummins Hospital" used for Helen everywhere (walk-through,
PCR card, `nausea-ao` template default). Live (PR #317, merged 22 Nov 2026).


Refusal job `refusal` (26 Nov 2026): Sam, 38, Tumby Bay township, 0948, two live remarks (meter 2.3; doesn't want an
ambulance). Not transported, so the expected line says clear from scene. The simulator has no clear-from-scene
status: ask the owner how the real MDT does it before adding one. No customiser link. On a branch, not merged.
