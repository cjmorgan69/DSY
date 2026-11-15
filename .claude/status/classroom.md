# Classroom case nights

`/classroom/<topic>/` decks built from the module and walk-through content. Engine and steps for the next topic:
`classroom/case-night/README.md`. The AR course decks are in `ar-course.md`.

History and owner decisions, moved here from CLAUDE.md on 15 Nov 2026. Add to the matching section as work is done,
and say plainly whether a thing is on main or still on a branch.

## Chest pain case night

Chest pain case night (`/classroom/chest-pain/`, 10 Nov 2026, owner's idea, instructor-led): one slide show for a
whole job: Lee's intro video and key points, Graham's eight break points (questions one per click, notes = expected
answers) and decision tiles (room votes, click shows the answer), MDT screenshots at each status (owner, 11 Nov
2026: pictures instead of the live MDT; `tools/mdt-shots.js` retakes them), PCR trainer QR and model card, debrief;
skills stations are next week's session (owner). Built live from the module and walk-through content files
(`data/build.js`), so no copied clinical text; slide order and cues DSY-written. Linked from Run a session
(`slides:` in `hub/topics.js`, tag 20261110d). About 110 min. Live 10 Nov 2026 (PR #199). 11 Nov 2026 (owner):
Graham's hospital is Cleve Hospital, 20 min (MDT farm is 9 km west of Arno Bay; was an unnamed 35-min regional
hospital that didn't fit the 2144 call / 2210 handover), pain onset about 45 min (was 40); changed in the
walk-through, MDT job, PCR job and customiser converter (sceneMinutes 18, transport default 20); MDT screenshots use
call sign CL181 (Cleve at night; was CL81). Live 11 Nov 2026 (PR #200); Supabase `chest-pain-ao` row updated in
place (md5 checked). 11 Nov 2026 (owner): Graham's backup is a paramedic crew 55 min (same time as the old ICP; no
ICP mentioned), MedSTAR "may be available once more information is known" (MDT remark keeps MEDSTAR TBC);
walk-through, MDT job (remark and custom defaults), customiser converter (backup_name default "paramedic crew",
backup_mins 55); MDT screenshots retaken. Live 11 Nov 2026 (PR #201); Supabase row updated in place (md5 checked).
Other walk-throughs: ACPO mentions ICPs only as CPAP scope (kept); asthma, stroke and pain mention MedSTAR
(unchanged).

## ACPO case night, and the shared engine

ACPO case night (`/classroom/acpo/`, 11 Nov 2026, owner asked; same order, Kevin's walk-through and the ACPO module;
MDT screenshots page 0247 to Tumby Bay Hospital 0352 (owner chose Tumby Bay), call sign PT181 (Port Neill at night);
PCR `kevin`; about 110 min). Engine moved to `/classroom/case-night/` (shared assets, `tools/mdt-shots.js <deck>`,
README with steps for the next topic). Live 11 Nov 2026 (PR #202).

## Asthma case night

Asthma case night (`/classroom/asthma/`, 11 Nov 2026, owner asked): Karen's walk-through and the asthma module;
owner moved Karen's MDT homestead from 14 km north of Lock to 20 km north of Cummins and named Cummins Hospital, 30
min (walk-through, MDT job and customiser link, PCR job, converter); MedSTAR line now "may be available once more
information is known" (was 90 min); MDT screenshots 0215 to Cummins Hospital 0325, call sign CU181 (Cummins); PCR
`karen`; about 115 min. Supabase `asthma-ao` row updated (it reads Cummins; checked 15 Nov 2026). On main. Next:
other topics' nights when the owner asks.
