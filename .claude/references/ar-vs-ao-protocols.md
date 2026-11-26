# Ambulance Responder (AR) vs Ambulance Officer (AO) protocols: gap analysis

Read from the SAAS clinical site on 26 Nov 2026 (`main.10d22172e56532ee.js`, PDFs exported 31 Aug 2026) and the app's
dose table (`scope.ar` vs `scope.ao`). 24 AR protocols, 34 AO protocols. Each AR PDF was compared word by word with
its AO twin. The "Training impact" lines are Claude's suggestions, not protocol: owner to review.

## 1. The two differences that run through every AR protocol

1. **Clinical support is requested, not just considered.** Almost every AR protocol says "Request clinical support"
   where the AO version says "Consider clinical support" (or nothing).
2. **EOC consult before any transport.** CPP-025-AR Basic Care: "Clinical consultation with the EOC Clinician is
   required prior to transport of any patient excluding inter-hospital transfers." Every AR protocol ends with the same
   three options the EOC Clinician may advise: transport and cancel clinical support; transport and RV with clinical
   support en route; or monitor the patient until clinical support arrives. The AO versions say "Provide transport and
   notify receiving facility".

Also in CPP-025-AR: airway adjuncts are **suction and OPA only** (AO: OPA, NPA or supraglottic, i.e. i-gel).
Oxygen devices are the same in both (face mask, NRB, BVM).

## 2. Protocols with no AR version (10)

AR crews have no protocol for these; the work goes to EOC consult and clinical support.

| AO protocol | What the AO can do that the AR cannot |
|---|---|
| CPP-001-AO Acute Cardiogenic Pulmonary Oedema | GTN on consult |
| CPP-158-AO Chest Trauma | Vented chest seal on consult |
| CPP-011-AO Narcotic Overdose | IM naloxone on consult |
| CPP-047-AO Nausea and Vomiting | Oral ondansetron |
| CPP-062-AO Sepsis | Sepsis screen, IM ceftriaxone on consult |
| CPP-061-AO Headache | Whole protocol |
| CPP-053-AO Primary Postpartum Haemorrhage | Fundal massage etc. (CPP-060-AR says "consult EOC Clinician" instead) |
| CPP-055-AO Treat and Refer | Not an AR option |
| CPP-021-AO Extended Practice, CPP-046-AO Metro ED Triage | Not relevant to ARs |

## 3. Medicines (app dose table)

| Medicine | AR | AO |
|---|---|---|
| Aspirin, oral glucose gel, methoxyflurane, oral paracetamol | Yes | Yes |
| Adrenaline IM, anaphylaxis (when no own auto-injector) | Consult | Consult |
| GTN, chest pain | Consult | Consult (owner's rule: AO first dose without consult if own GTN prescribed and SBP/HR in limits) |
| Salbutamol MDI / neb, ipratropium neb | Listed Consult, but both protocols give salbutamol (and nebs for more severe) without consult | Same |
| Adrenaline IM, life-threatening asthma | **No** (removed from CPP-048-AR v3.2, June 2022) | Consult |
| Glucagon IM | **No** | Consult |
| Ibuprofen oral | **No** | Yes (with eLearning + face to face) |
| Fentanyl IN, ketamine SL | **No** | Consult, only if authorised to carry |
| Midazolam IM (seizures) | **No** | Consult |
| Lorazepam / olanzapine oral (ABD) | **No** | Consult |
| Naloxone IM, ceftriaxone IM, ondansetron oral, GTN for ACPO | **No** | Consult / Yes |

## 4. Protocol by protocol

**Big differences**

- **Asthma (CPP-048-AR / CPP-050-AO).** Same salbutamol MDI doses (12 puffs ≥ 6 yrs, 6 puffs 1 to 6 yrs) and the
  same nebs for more severe asthma. AR: no IM adrenaline for life-threatening asthma; no ipratropium MDI with nasal
  cannula oxygen option; repeat doses only as EOC advises. AR asks for early clinical support at "more severe".
- **Hypoglycaemia (CPP-031-AR / CPP-009-AO).** Oral glucose the same. AR: no glucagon; if oral glucose can't be given or
  fails, consult EOC. Under 2 yrs: AR consult for oral gel only (AO: gel or IM glucagon 0.5 mg).
- **Chest pain (CPP-029-AR / CPP-007-AO).** Aspirin 300 mg the same. AR: every GTN dose only on EOC advice, even with
  the patient's own prescribed GTN (no "previously prescribed" branch). Limits the same (SBP > 100, HR 60 to 120,
  PDE-5 rules, max 3 doses).
- **Pain management (CPP-036-AR / CPP-013-AO).** AR: paracetamol (adults 1000 mg; under 16 consult) and methoxyflurane
  3 mL repeated once only. No ibuprofen, IN fentanyl or SL ketamine; no sedation score monitoring section.
- **Seizures (CPP-037-AR / CPP-014-AO).** AR: protect, side position, airway, BGL, oxygen if SpO2 < 94%, seizure plan,
  request clinical support. No midazolam; no NPA for trismus.
- **Stroke (CPP-039-AR v2.0, Jan 2019 / CPP-016-AO v6.0, June 2026).** AR uses **FAST** only, BGL, urgent transport,
  EOC consult. No ROSIER, no Code Stroke eligibility (9 hrs, 60 min to CSU/STS), no direct-to-CSU/STS pathway.
- **Acute Behavioural Disturbance (CPP-052-AR / CPP-017-AO).** AR is one page: risk assessment (CTL-011), MSE (CTL-056),
  request clinical support, consult EOC, consider SAPOL. Nothing on SAT score, de-escalation tools (STAMP/LOWLINE),
  oral sedation, Mental Health Act care and control, restraint net or statement of rights.
- **Refusal against advice (CPP-058-AR / CPP-056-AO).** AR protocol: "If consent cannot be gained request clinical
  support or consult EOC Clinician". No VIRCA tool, no valid-refusal steps, no State Duty Manager / Team Leader fallback.
- **Newborn care (CPP-035-AR / CPP-012-AO).** AR: NeoHelp suit and TransWarmer only after EOC consult (AO: NeoHelp
  straight away; TransWarmer for at-risk newborns). AR MRSOPA is shorter: no locking the BVM blow-off valve, **no
  i-gel**, no SpO2 (right hand). BGL: AR text says consult if BGL "≥ 2.5 mmol/L" (looks like a typo for ≤; already
  flagged in `ar-course.md`).
- **Pregnancy and birth (CPP-060-AR / CPP-059-AO).** Birth steps the same. PPH: AR "consult EOC Clinician" (no PPH
  protocol). Transport destination: AR consult.

**Small differences (same clinical care, plus the AR consult / clinical support rule)**

- **Anaphylaxis:** same (own auto-injector first; IM adrenaline 10 microg/kg, max 500 microg, on EOC advice).
- **Cardiac arrest adult and paediatric:** AR is AED, CPR 30:2, BVM with OPA, consult EOC after 10 min (adult) and to
  stop. The AO PDFs (CPP-002-AO, CPP-043-AO) export blank, so they could not be compared: needs a look in the app.
  From Basic Care, the AO has NPA and i-gel that the AR does not.
- **Burns:** same cooling and dressings; AO has the Adelaide burns-unit line (not relevant on the EP).
- **Amputation and haemorrhage, spinal injury, falls, envenomation, hypothermia, non-initiation of CPR, prolonged
  care, button battery, transfer exceeding ATP:** same content. AR adds clinical support and EOC consult for
  treatment and transport. Hypothermia: AR may transport under CPR with RV. Non-initiation of CPR: AR must consult
  EOC if CPR is not started. Prolonged care: AR leaves out NEWS2 re-scoring, sedation score with opiates, pupils and
  cardiac monitoring.

## 5. What this means for DSY training (Claude's suggestions, owner to decide)

Existing DSY modules and walk-throughs that teach AO-only steps an AR could not do:

| DSY topic | AO-only step in the material | AR version would be |
|---|---|---|
| Asthma | Ipratropium MDI + nasal cannula on consult; IM adrenaline | Salbutamol, nebs, early clinical support, consult |
| Hypoglycaemia | IM glucagon | Oral glucose only, then consult |
| Chest pain | First GTN without consult (owner's rule) | Every GTN on consult |
| Pain, MVA, falls, burns | Ibuprofen, IN fentanyl, ketamine | Paracetamol + methoxyflurane only |
| Stroke | ROSIER, Code Stroke | FAST, consult |
| Dementia / ABD | SAT, oral sedation, MHA | Risk assessment, MSE, SAPOL, consult |
| Refusal (new) | VIRCA, valid refusal steps | Seek consent, clinical support, consult |
| Sepsis, nausea, ACPO, headache | Whole protocol | No AR protocol: recognise, request support, consult |
| Any scenario | "Provide transport and notify" | EOC consult before transport, three options |

Possible ways to handle mixed AO/AR groups: an "AR" toggle or AR box on each module/walk-through showing what
changes; AR break points in the facilitator version ("You are an AR: what now?"); or AR-only stations like the Day 6
set. Practising the EOC consult call (and the three transport options) would suit ARs in every scenario.
