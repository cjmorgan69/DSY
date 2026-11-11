# SAAS Ambulance Officer protocols: DSY coverage

Taken from the SAAS clinical site (`main.10d22172e56532ee.js` menu and the protocol PDFs) on 11 Nov 2026.
34 AO protocols. Codes read from each PDF; versions and review dates NOT checked here: check them when a topic is built.
The category tiles on Run a session come from `group` in `hub/topics.js`; planned topics are `DSY_PLANNED` there.

## Covered (DSY topic exists)

| Code | Protocol | DSY topic | Group |
|---|---|---|---|
| CPP-001-AO | Acute Cardiogenic Pulmonary Oedema | ACPO | Heart and breathing |
| CPP-003-AO | Anaphylaxis | Anaphylaxis | Heart and breathing |
| CPP-007-AO | Chest Pain | Chest pain | Heart and breathing |
| CPP-050-AO | Asthma | Asthma | Heart and breathing |
| CPP-006-AO | Burns | Burns | Trauma and injury |
| CPP-013-AO | Pain Management | Pain management | Trauma and injury |
| CPP-018-AO | Spinal Injury | Spinal precautions | Trauma and injury |
| CPP-045-AO | Falls | Falls | Trauma and injury |
| CPP-063-AO | Prolonged Care | used by the MVA topic (also planned as its own Decisions topic) | Trauma and injury |
| CPP-016-AO | Stroke | Stroke | Brain and behaviour |
| CPP-017-AO | Acute Behavioural Disturbance | Dementia and changed behaviours | Brain and behaviour |
| CPP-061-AO | Headache | Headache | Brain and behaviour |
| CPP-008-AO | Envenomation | Snake bite | Medical |
| CPP-009-AO | Hypoglycaemia | Hypoglycaemia | Medical |
| CPP-047-AO | Nausea and Vomiting | Nausea and vomiting | Medical |
| CPP-062-AO | Sepsis | Sepsis | Medical |

Partly used: CPP-004-AO Basic Care and Life Support (every scenario), CPP-042-AO and CPP-158-AO (MVA topic).

## Not covered yet (suggested order, "Coming soon" on Run a session)

1. Cardiac arrest: CPP-002-AO Adult, CPP-043-AO Paediatric, CPP-020-AO Non-Initiation of CPR (old page `/modules/cardiac-arrest/` to convert; owner said no CPR detail in scenarios, so ask) - Heart and breathing
2. Birth and babies: CPP-059-AO Pregnancy and Birth, CPP-053-AO Primary Postpartum Haemorrhage, CPP-012-AO Newborn Care and Resuscitation (old page `/modules/childbirth/`; pairs with `/tools/obstetric/`)
3. CPP-014-AO Seizures - Brain and behaviour
4. CPP-042-AO Amputation and Haemorrhage (tourniquet and pelvic sling already in the MVA stations) - Trauma and injury
5. CPP-011-AO Narcotic Overdose (old page `/modules/narcotic_od/`) - Medical
6. CPP-158-AO Chest Trauma (vented chest seal CPPRO-037, AO on EOC consult) - Trauma and injury
7. CPP-055-AO Treat and Refer, CPP-056-AO Refusal Against Advice - Decisions
8. CPP-019-AO Hypothermia (Severe and Unresponsive) - Medical
9. CPP-065-AO Button Battery Ingestion (short, children) - Medical
10. CPP-015-AO Transfer of Patients Exceeding AO ATP - Decisions

Not planned as topics: CPP-004-AO Basic Care and Life Support (in every scenario), CPP-021-AO Extended Practice for
Credentialed Health Professionals (few people), CPP-046-AO Metropolitan ED Destination Triage (Adelaide only).

## Procedures (CPPRO) that apply to AOs

From each PDF's "Application" box. The site menu lists every procedure for every level, so it does not show scope.

- All clinical levels: 001 mobility, 002 FROP, 003 pressure injury, 004 tourniquet, 008 medication checks, 009 oral,
  010 drawing up, 011 IM, 012 inhaled, 017 pathology specimens, 021 c-spine, 022 pressure bandaging (AA/CR, AR, AO, P, ICP)
- AO listed: 020 i-gel, 023 fundus, 025 NPA, 028 CT-6 traction splint, 035 patient restraint, 045 SAM pelvic sling,
  046 newborn temperature, 037 vented chest seal (AO under EOC Clinician consult)
- AO with a qualifier: 007 IV (AO with Extended Practice), 013 intranasal (AO with Advanced Skills, pain)
- Not AO: 006, 014, 015, 016, 018, 019, 024, 026, 027, 029 to 034, 036, 040 to 044, 047 to 052

Unused so far, with a natural home: i-gel + NPA (cardiac arrest airway night), fundus (PPH), newborn temperature (birth),
vented chest seal (chest trauma). Restraint left out on purpose (owner chose no restraint practice for dementia).
