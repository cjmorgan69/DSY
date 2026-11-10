/* Jobs for the PCR trainer (/tools/pcr/): one per DSY walk-through, written up as a crew might write it. The student
   works through the walk-through first, then writes the card. sections = the free-text parts (pc, phx, medn, hx, oa, cns,
   skin, cvs, resp, pain, survey, care); text = the other boxes; reveal = what the help sheet shows for boxes that are
   ticks or blank; tips = a note under a section's possible entry. The scenarios are DSY-written training material, not real patients.
   Free text layout (owner, 6 Nov 2026, from the PCR guide card): presenting complaint, then PHx, Med'n, Hx, O/A, each
   followed by a blank line; O/E with CNS, SKIN, CVS, RESP and PAIN each on its own line, normal findings written too
   (e.g. 'nil resp distress'); 2* SURVEY only when trauma is involved. */
window.PCR_JOBS = {
  mavis: {
    label: 'Mavis, 81: falls (AO)',
    short: 'Mavis',
    walk: '/modules/falls-ao/',
    note: 'Main path: she is transported to Cummins Hospital.',
    // From /modules/falls-ao/ (main path: transport to Cummins Hospital). Times 0640, 0710 and 0715 are filled in by DSY
    // between the times the walk-through gives (arrival 0638, obs 0646, Raizer 0702, sitting obs 0704, lying 0708, handover 0728).
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Fall with long lie (~3.5 hrs). ?Medical cause: dizzy with BP drop on sitting up, perindopril increased last week.',
      recommendation:
        'Transported to Cummins Hospital. Nil injury found. Became dizzy + pale sitting up (BP 132 lying, 104 sitting), ' +
        'same feeling as just before the fall. Temp 35.4 on the floor. Needs review of cause of fall, warming + pressure care ' +
        '(Braden 14, red skin sacrum + heels). Handed over to nurse in charge 0728 (ISBAR).',
      braden: '14',
      ground: '~3.5 hrs'
    },
    sections: {
      pc: 'Fall at home ~0300, long lie ~3.5 hrs, unable to get up.',
      phx: 'HTN, high cholesterol, OA knees. 2nd fall this year (garden, March, nil injury). Walking frame indoors. Lives alone.',
      medn: 'Perindopril (dose increased by GP last week), atorvastatin, paracetamol. Nil anticoagulants (med box checked).',
      hx: 'Got up to toilet ~0300, "my feet went from under me". Denies head strike. Unable to get up. Pressed pendant 0624.',
      oa: '81F lying on her back on bathroom floor between toilet and bath, nightie + towel over her, shivering. House cold. Incontinent of urine, nightie damp. Alert, talking, apologetic, wants to get up.',
      cns: 'A on AVPU, GCS 15, oriented, recalls events. PEARL. Moves all 4 limbs.',
      skin: 'Cool, normal colour, hands + feet cold. Red skin over sacrum + both heels.',
      cvs: 'Pulse 82 regular, strong. BP 132/78. Peripheral pulses present. Nil blood loss.',
      resp: 'RR 16, nil resp distress, normal effort, chest rise equal L + R. SpO2 95% RA.',
      pain: 'Nil pain, 0/10.',
      survey: 'Head/neck NAD, nil neck pain. Chest/back NAD, nil spinal pain. Abdo NAD. Hips/pelvis NAD, legs straight. Limbs NAD.',
      care: 'Mobility (CPPRO-001) lying: SLR yes, head lift yes, rolls with help, unable to bridge. Raizer lift to sitting 0702. ~1 min later pale, dizzy ("swimmy"), BP 104/66 P 98. States same feeling getting off the toilet just before the fall. Raizer lowered, sx settled. 0708 BP 126/76 P 86. Not stood. Transport.\n\nBraden 14 (medium risk). Wet nightie off, skin dried, dry clothes + fresh pad. Slide sheet to stretcher, kept warm. Med box, glasses + frame with pt. Daughter Sue (Port Lincoln) informed.'
    },
    tips: {
      oa: 'Subjective: any words that paint the same picture are right.',
      survey: 'A fall counts as trauma, so the head to toe goes in, even with nil found.',
      care: 'Times and wording will differ. The key facts: the mobility result, the BP drop and dizziness sitting up, her comment about the fall, and the skin care.',
      provisional: 'Other fair answers: "Fall, ?postural hypotension", "Fall with long lie, ?medication related". Keep the "?" when you can\'t confirm it.'
    },
    reveal: {
      pi: 'Braden score 14. PI risk: Medium (13 to 14 on CTL-010). Prevention in the clinical text: dry clothes, fresh pad, slide sheet, small position changes.',
      falls: 'Length of time on the ground: ~3.5 hrs. Mobility assessment completed: Y. Falls risk and referral: left blank: she is transported, so the FROP screen and referral are for the hospital (the stay-home variation does them).',
      body: 'PI on the back figure: sacrum and both heels (red skin).',
      ecg: 'Nothing: no ECG on this job.',
      info: 'Not ticked: she is transported.',
      consult: 'Not ticked: no EOC Clinician consult on the main path.'
    },
    ticks: ['medsHanded', 'piMed', 'mobY'],
    obs: [
      { time: '0646', rr: 16, o2: 'RA', spo2: 95, bp: '132/78', hr: 82, temp: 35.4, gcs: 15, evm: [4, 5, 6], pupils: ['+', '+'], pain: 0, bgl: 5.6 },
      { time: '0704', rr: 18, o2: 'RA', spo2: 95, bp: '104/66', hr: 98, temp: 35.5, gcs: 15, evm: [4, 5, 6] },
      { time: '0708', bp: '126/76', hr: 86 }
    ],
    drugs: [
      ['0640', 'Blankets, warming'],
      ['0646', 'Obs + BGL (on floor)'],
      ['0652', 'Mobility assessment (lying)'],
      ['0702', 'Raizer lift to sitting'],
      ['0704', 'Dizzy: Raizer lowered'],
      ['0710', 'Dry clothes, fresh pad'],
      ['0715', 'Slide sheet to stretcher'],
      ['0728', 'Handover Cummins Hosp']
    ],
    marks: [['back', 50, 112, 'PI', 7], ['back', 43, 242, 'PI', -6], ['back', 57, 242, 'PI', 7]]
  },

  graham: {
    label: 'Graham, 62: chest pain (AO)',
    short: 'Graham',
    walk: '/modules/chest-pain/',
    // From /modules/chest-pain/. Times 2137 (oxygen) and 2155 (depart) are DSY's; the rest are the walk-through's.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: '?Acute coronary syndrome (suspected cardiac ischaemia): chest pain not settling with own GTN.',
      recommendation: 'Transported to regional hospital ED. Aspirin 300 mg 2136, GTN 2138 (3 doses incl. 2 own sprays). Pain 8/10 to 5/10, not resolved. EOC Clinician consulted 2144: nil further GTN, transport. Headache since GTN. Needs ongoing cardiac monitoring + review. Handed over 2210 (ISBAR).',
      ecg: 'Sinus rhythm (4-lead), unchanged throughout. 12-lead not available.'
    },
    sections: {
      pc: 'Central chest pressure ~40 min, radiating to L arm + jaw, not settling with own GTN.',
      phx: 'Angina (4 yrs), HTN, high cholesterol.',
      medn: 'Aspirin 100 mg daily, atorvastatin, metoprolol, perindopril, own GTN spray. Nil PDE-5 inhibitors (pt + wife).',
      hx: 'Watching TV ~2050, onset of heavy, weight-like central chest pressure at rest. "Worse than my usual angina." Own GTN spray x2 over 30 min: little relief, then pain returned. Nausea (nil vomiting), sweating, mildly SOB. Wife called SAAS. Last meal 1830.',
      oa: '62M sitting upright in a recliner in a well-lit lounge, pale and still, one hand flat on his sternum. Own GTN spray on the armrest. Wife at the door, anxious.',
      cns: 'A on AVPU, GCS 15, oriented, recalls events. Speech normal.',
      skin: 'Pale, sweaty (diaphoretic).',
      cvs: 'Pulse 92 regular. BP 138/86. ECG sinus rhythm. Nil blood loss.',
      resp: 'RR 20, mildly SOB, speaking full sentences, nil resp distress. SpO2 94% RA, 96% on NC.',
      pain: 'Central heavy pressure, radiating to L arm + jaw, onset at rest ~2050, 8/10. After GTN 6/10, on arrival at hospital 5/10.',
      survey: '',
      care: 'Aspirin 300 mg chewed 2136. NC O2 for SpO2 94%. GTN limits checked aloud (SBP 138, HR 92, nil PDE-5): GTN 400 microg SL spray 2138. 2142 BP 118/74, HR 88, pain 6/10, mild headache.\nEOC Clinician 2144: counted 3 GTN doses, nil further GTN, transport now, call back if BP/HR outside limits or pain changes. Carry chair (stand + pivot), stretcher, monitor + O2 on, kept warm. Obs every 3-5 min en route, stable.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      care: 'GTN: a 300 microg tablet SL is also right (lead instructor: either while SAAS changes back to the spray). Your oxygen flow may differ: the walk-through only says "nasal cannula to bring SpO2 above 94%".',
      provisional: 'Also fair: "Chest pain, ?cardiac ischaemia". Keep the "?".'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'P on the front of the chest, centre (pain), with the radiation to the left arm and jaw described in the text.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 2144.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '2135', rr: 20, o2: 'RA', spo2: 94, bp: '138/86', hr: 92, temp: 36.4, gcs: 15, evm: [4, 5, 6], pain: 8, bgl: 7.2 },
      { time: '2142', rr: 18, o2: 'NC', spo2: 96, bp: '118/74', hr: 88, pain: 6 },
      { time: '2208', rr: 16, o2: 'NC', spo2: 97, bp: '122/76', hr: 84, pain: 5 }
    ],
    drugs: [
      ['2135', 'Monitor, 4-lead ECG: sinus'],
      ['2136', 'Aspirin (chewed)', '300', 'mg', 'Oral'],
      ['2137', 'Oxygen', '', '', 'Nasal cannula'],
      ['2138', 'GTN spray', '400', 'microg', 'Sublingual'],
      ['2144', 'EOC Clinician consult'],
      ['2155', 'Carry chair to stretcher'],
      ['2210', 'Handover regional ED']
    ],
    marks: [['front', 50, 50, 'P', 6]]
  },

  karen: {
    label: 'Karen, 45: asthma (AO)',
    short: 'Karen',
    walk: '/modules/asthma-ao/',
    // From /modules/asthma-ao/. Obs times 0227, 0248 and 0320 are DSY's (arrival about 0227; 20 min after the neb; pre-arrival).
    text: {
      allergies: 'Penicillin (rash)',
      communicable: 'Nil known',
      provisional: 'Acute asthma, more severe (CTL-071). Triggers: URTI, dust, preventer ran out.',
      recommendation: 'Transported to country hospital ED. Improved after neb + MDI/spacer but not at baseline: needs O2 + ongoing monitoring, and review of her preventer (Seretide ran out 2 wks ago). Handed over 0325 (ISBAR).',
      ecg: 'Sinus tachycardia (3-lead) on arrival.'
    },
    sections: {
      pc: 'Acute SOB + wheeze ~30 min, nil relief from own Ventolin. Known asthmatic.',
      phx: 'Asthma since age 12, 2 ED presentations this year, nil ICU admissions. Mild eczema. URTI 3 days.',
      medn: 'Seretide 250/25 preventer (ran out 2 wks ago), Ventolin 100 microg MDI.',
      hx: 'Woke ~0145 SOB, chest tightness + wheeze worsening over 30 min. Own Ventolin ~8 puffs (no spacer), nil relief. Cleaning a dusty shed yesterday. Nil chest pain, fever, productive cough. Nil new food, medicine, bite or sting. Husband called SAAS.',
      oa: '45F sitting bolt upright on the edge of the bed, leaning forward on her arms. Audible wheeze from the hallway. Working hard to breathe. Husband at the door, worried.',
      cns: 'A on AVPU, GCS 15, alert, oriented, anxious + distressed.',
      skin: 'Pale, mildly sweaty. Nil rash, nil swelling of lips, tongue or throat.',
      cvs: 'Pulse 118, fast, regular. BP 140/88. Nil oedema.',
      resp: 'RR 28, speaking in short phrases. Bilateral exp wheeze (some insp), reduced air entry both sides, accessory muscle use. Airway patent, nil stridor. SpO2 91% RA. Not cyanosed, not drowsy.',
      pain: 'Chest tightness. Nil chest pain.',
      survey: '',
      care: 'More severe asthma (phrases, distressed). Anaphylaxis considered: nil signs, nil new exposure. Clinical support requested 0225 (paramedic 50 min). Neb salbutamol 5 mg + ipratropium 500 microg, O2 6-8 L/min, sitting upright 0228. EOC Clinician consulted 0235.\n0248: speaking short sentences, RR 22, SpO2 95%, mild accessory muscle use, wheeze reduced. Mild tremor, dry mouth. EOC Clinician advice repeated back: salbutamol MDI + spacer, O2 4 L/min NC, given 0300 en route. Carry chair upright, stretcher fully upright.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      pain: 'No pain score recorded in the walk-through. Writing what she has and hasn\'t got is still evidence.',
      care: 'The walk-through doesn\'t give the MDI puff count: write the dose the EOC Clinician advised. 12 puffs (1200 microg) is the CPPRO-012 dose for 6 years and over.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Nothing to mark.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 0235.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '0227', rr: 28, o2: 'RA', spo2: 91, bp: '140/88', hr: 118, temp: 36.8, gcs: 15, evm: [4, 5, 6] },
      { time: '0248', rr: 22, o2: '8', spo2: 95, bp: '132/82', hr: 106 },
      { time: '0320', rr: 20, o2: '4', spo2: 96, bp: '128/80', hr: 98 }
    ],
    drugs: [
      ['0225', 'Clinical support requested'],
      ['0228', 'Salbutamol', '5', 'mg', 'Nebuliser'],
      ['0228', 'Ipratropium', '500', 'microg', 'Nebuliser'],
      ['0228', 'Oxygen (neb)', '6-8', 'L/min', 'Mask'],
      ['0235', 'EOC Clinician consult'],
      ['0300', 'Salbutamol (EOC advice)', '12', 'puffs', 'MDI + spacer'],
      ['0300', 'Oxygen', '4', 'L/min', 'Nasal cannula'],
      ['0325', 'Handover country ED']
    ],
    marks: []
  },

  frank: {
    label: 'Frank, 78: stroke (AO)',
    short: 'Frank',
    walk: '/modules/stroke-AO/',
    // From /modules/stroke-AO/. The walk-through gives no clock times: onset 1015 and every time on this card are DSY's.
    note: 'The walk-through has no clock times, so the times on this card are made up: use your own.',
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Suspected acute stroke (R face, arm, leg weakness + slurred speech). Code Stroke.',
      recommendation: 'Code Stroke: ROSIER +4, ACT negative, onset 1015 (witnessed, wife), independent before. EOC Clinician authorised direct transport to Port Lincoln Hospital STS 1110; clinical support requested; arrival confirmed by SAGRN. On warfarin. Wife Margaret following, phone ____. Handed over 1150 (ISBAR).',
      ecg: 'Irregular rhythm (known AF).'
    },
    sections: {
      pc: 'Sudden R facial droop, R arm weakness + slurred speech, onset 1015 (witnessed).',
      phx: 'HTN, AF, type 2 diabetes. Fully independent: drives, walks to the shops, manages own tablets.',
      medn: 'Warfarin, metoprolol, metformin, perindopril.',
      hx: 'Morning tea with wife 1015: went to pick up his cup and dropped it, face "looked funny", speech not understandable. Wife sure of the time. Nil change since. Nil seizure, LOC, fall or head injury. Nil seizure hx. Wife called SAAS.',
      oa: '78M sitting at the kitchen table, eyes open, looking at us. Broken teacup on the floor to his R. R side of mouth drooping, R arm sliding off the table. Tries to greet us, words slurred. Wife Margaret let us in.',
      cns: 'GCS 14 (E4 V4 M6). R facial droop, R arm drifts down within 10 s, mild R leg weakness. Speech slurred but understandable. Nil gaze deviation. Visual fields can\'t reliably assess. ROSIER +4. ACT negative. BGL 6.2.',
      skin: 'Warm, dry, normal colour.',
      cvs: 'Pulse 82 irregular (known AF). BP 172/94. Nil blood loss.',
      resp: 'RR 18, nil resp distress, normal effort. SpO2 96% RA, airway clear.',
      pain: 'Nil pain.',
      survey: '',
      care: 'BGL 6.2 (hypo excluded) then ROSIER +4, ACT negative. Code Stroke criteria met (onset 1015, independent, travel 35 min). EOC Clinician consulted 1110: authorised direct to Port Lincoln Hospital STS, EOC to notify hospital. Clinical support requested (transport over 20 min). Pt ID + wife\'s phone confirmed. Nil by mouth. Carry chair, R side supported, stretcher. Obs, GCS + deficits rechecked: unchanged. SAGRN arrival confirmed.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      cns: 'The stroke findings belong here: the ROSIER items, the ACT result and the BGL.',
      skin: 'The walk-through doesn\'t describe his skin: write what you saw.',
      pain: 'The walk-through doesn\'t give a pain score: ask him, and write what he says.',
      recommendation: 'The exact onset time and warfarin are the two facts the hospital needs most.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'W (weakness) on the right arm and right leg of the front figure, and a note of the right facial droop.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted for the Code Stroke authorisation.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1104', rr: 18, o2: 'RA', spo2: 96, bp: '172/94', hr: 82, temp: 36.4, gcs: 14, evm: [4, 4, 6], pain: 0, bgl: 6.2 },
      { time: '1109', rr: 16, o2: 'RA', spo2: 97, bp: '168/92', hr: 78, gcs: 14, evm: [4, 4, 6] }
    ],
    drugs: [
      ['1104', 'BGL 6.2, ROSIER +4, ACT neg'],
      ['1110', 'EOC Clinician: Code Stroke'],
      ['1111', 'Clinical support requested'],
      ['1115', 'Carry chair to stretcher'],
      ['1145', 'SAGRN arrival confirmation'],
      ['1150', 'Handover Port Lincoln ED']
    ],
    marks: [['front', 22, 90, 'W', -6], ['front', 44, 190, 'W', -6]]
  },

  jason: {
    label: 'Jason, 34: high-speed MVA (AO)',
    short: 'Jason',
    walk: '/modules/mva-ao/',
    // From /modules/mva-ao/. Times 1750 (towel roll) and 1752 (oxygen, warming) are DSY's; the rest are the walk-through's.
    // Oxygen flow 15 L/min NRM is DSY's reading of "high-flow oxygen" (CPP-158-AO).
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Major trauma, MTT Level 1: L rib injury, ?internal bleeding (L upper abdo), ?pulmonary contusion.',
      recommendation: 'Escalated 1818 (RDR triggers + HR over 120 = MTT Level 1). EOC Clinician 1820: Port Lincoln Hospital, notified, MedSTAR aware, paramedics to meet en route. Deteriorating: HR 92 to 132, BP 128 to 100, GCS 15 to 14, temp 35.5. Needs warming + close obs. Handed over to paramedic crew 1843 (ISBAR).',
      ecg: 'Sinus tachycardia (monitor).'
    },
    sections: {
      pc: 'Single-vehicle rollover ~100 km/h at ~1725, self-extricated. Pain L lower ribs.',
      phx: 'Nil.',
      medn: 'Nil regular. Nil taken today.',
      hx: 'Driving ~100 km/h on the Tod Hwy, swerved for a roo, ute rolled at ~1725. Seatbelt on, airbag deployed. Climbed out the driver\'s window and walked about. Pain L lower ribs, worse on inspiration. Nil neck or back pain, nil numbness, tingling or weakness. Nil alcohol. Last ate midday. Passing motorist called SAAS.',
      oa: '34M in work clothes walking up and down the road verge holding his L side. White ute on its roof in the table drain, windscreen shattered, roof crushed on passenger side. Nearly dark, 11 C, cold wind. Says "I\'m right, mate."',
      cns: 'A on AVPU, GCS 15, oriented, recalls events. PEARL. Moves all 4 limbs, normal sensation. 1818: GCS 14 (V4), repeating questions.',
      skin: 'Cold, shivering. 1818 pale + cool.',
      cvs: 'Pulse 92 regular, rising to 132 by 1833. BP 128/80 falling to 100/76. Nil external bleeding.',
      resp: 'RR 18, rising to 28. Air entry equal L + R. Nil paradoxical movement, nil crepitus. Pain on inspiration. SpO2 97% RA.',
      pain: 'L lower ribs, sharp, worse on inspiration, 4/10. 3/10 after paracetamol + methoxyflurane.',
      survey: 'Head/neck NAD, nil neck pain or tenderness. Chest: seatbelt bruise L chest, tender L lower ribs. Abdo: seatbelt bruise lower abdo, tender L upper abdo, nil distension. Pelvis NAD, not sprung. Limbs: grazes both forearms, otherwise NAD. Back: nil spinal pain or tenderness.',
      care: 'Stopped walking, head held, onto the stretcher. Towel roll (spinal precautions: high-speed rollover, self-extricated). High-flow O2 (CPP-158-AO). Warming: heater, blanket sandwich, thermal cap. 1803 RR + pulse yellow: obs more often, clinical support requested, paracetamol + methoxyflurane 1805.\n1818: RR + pulse red, GCS 14, HR 124 = escalation + MTT Level 1. EOC Clinician 1820: Port Lincoln, paramedics to meet, MedSTAR aware, obs every 5 min, call if SBP under 100. BP 100 at 1833: EOC Clinician updated.'
    },
    tips: {
      survey: 'Trauma: the secondary survey goes in.',
      care: 'The walk-through says oxygen and high-flow (CPP-158-AO) but no flow: 15 L/min by NRB is shown here. Spinal precautions: a vacuum mattress or a correctly fitted collar would also be right. Record the decision.',
      recommendation: 'Lead with the risk (Level 1, getting worse) and give the trend, not just the last set.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.',
      body: 'Front figure: C (contusion) across the left chest and the lower abdomen, P (pain) at the left lower ribs and left upper abdomen, A (abrasion) on both forearms.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 1820.'
    },
    ticks: ['consult'],
    obs: [
      { time: '1748', rr: 18, o2: 'RA', spo2: 97, bp: '128/80', hr: 92, temp: 36.4, gcs: 15, evm: [4, 5, 6], pupils: ['+', '+'], pain: 4, bgl: 5.8 },
      { time: '1803', rr: 22, o2: '15', spo2: 99, bp: '124/82', hr: 106, temp: '36.0', gcs: 15, evm: [4, 5, 6], pain: 4 },
      { time: '1818', rr: 26, o2: '15', spo2: 98, bp: '118/84', hr: 124, temp: 35.6, gcs: 14, evm: [4, 4, 6], pain: 3 },
      { time: '1826', rr: 28, o2: '15', spo2: 97, bp: '110/80', hr: 128, temp: 35.5, gcs: 14, evm: [4, 4, 6] },
      { time: '1833', rr: 28, o2: '15', spo2: 97, bp: '100/76', hr: 132, temp: 35.5, gcs: 14, evm: [4, 4, 6] }
    ],
    drugs: [
      ['1750', 'Towel roll, stretcher'],
      ['1752', 'Oxygen', '15', 'L/min', 'NRM'],
      ['1752', 'Warming: blankets, cap, heater'],
      ['1803', 'Clinical support requested'],
      ['1805', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1805', 'Methoxyflurane', '3', 'mL', 'Inhaler'],
      ['1818', 'Escalation: MTT Level 1'],
      ['1820', 'EOC Clinician consult'],
      ['1833', 'EOC updated: SBP 100'],
      ['1843', 'Handover paramedic crew']
    ],
    marks: [['front', 58, 50, 'C', 6], ['front', 60, 70, 'P', 6], ['front', 50, 98, 'C', 6], ['front', 22, 100, 'A', -6], ['front', 78, 100, 'A', 6]]
  },

  david: {
    label: 'David, 54: anaphylaxis (AO)',
    short: 'David',
    walk: '/modules/anaphylaxis/',
    // From /modules/anaphylaxis/. Times 1446 (oxygen) and 1447 (EOC Clinician call, clinical support) are DSY's. EpiPen dose:
    // an adult EpiPen is 300 microg (the walk-through doesn't state it).
    text: {
      allergies: 'Bee stings: ANAPHYLAXIS',
      communicable: 'Nil known',
      provisional: 'Severe anaphylaxis after a bee sting (hypotension, bronchospasm, facial swelling, hoarse voice).',
      recommendation: 'Transported to nearest hospital, notified. Expired EpiPen 1444, IM adrenaline 500 microg 1450 (EOC Clinician). Improving: BP 92 to 104, wheeze resolving, but facial swelling unchanged and voice still husky: symptoms can return. Expired EpiPen handed over and to be reported (CPPRO-011).',
      ecg: 'Sinus tachycardia.'
    },
    sections: {
      pc: 'Bee sting ~1427, known bee allergy: facial swelling, hives, wheeze, hoarse voice, worsening.',
      phx: 'Bee allergy. Nil other.',
      medn: 'Nil regular. Oral antihistamine taken after the sting. EpiPen (expired last year).',
      hx: 'Stung in the garden ~15 min before arrival. Took an antihistamine tablet: getting worse. EpiPen expired, never replaced. Stinger removed by wife. Wife called SAAS.',
      oa: '54M sitting on a garden chair, leaning forward, working hard to breathe with an audible wheeze. Red blotchy skin on arms + neck, face swollen around eyes + lips. Conscious, anxious. Wife holding his expired EpiPen.',
      cns: 'A on AVPU, GCS 15, anxious. PEARL. BGL 7.2.',
      skin: 'Warm, flushed, urticaria (hives) arms + neck. Swelling around eyes + lips.',
      cvs: 'Pulse 118, thready radial. BP 92/58. CRT 3 s. Nil blood loss.',
      resp: 'RR 28, short sentences, bilateral wheeze, accessory muscle use. Voice hoarse. Airway patent. SpO2 93% RA.',
      pain: 'Nil c/o pain.',
      survey: '',
      care: 'Expired EpiPen given immediately 1444 (looks really sick, no other auto-injector). Not stood or walked, positioned as flat as his breathing allows. Oxygen. Driver: EOC Clinician + clinical support requested.\n1449: HR 108, BP 96/62, wheeze improving, still hoarse. EOC Clinician directed IM adrenaline 500 microg (0.5 mL of 1000 microg in 1 mL), repeated back, other thigh 1450. 1455: HR 96, BP 104/68, wheeze resolving, voice husky. Carry chair to stretcher, Red Kit ready en route.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      care: 'The walk-through gives no oxygen flow: write what you used to bring SpO2 above 94%. An adult EpiPen is 300 microg.',
      allergies: 'Make the allergy loud: this is the box the hospital reads first.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Optional: the sting site, if you found it, and the injection sites (both thighs).',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted.'
    },
    ticks: ['consult'],
    obs: [
      { time: '1445', rr: 28, o2: 'RA', spo2: 93, bp: '92/58', crt: '>2', hr: 118, temp: 36.8, gcs: 15, evm: [4, 5, 6], pupils: ['+', '+'], bgl: 7.2 },
      { time: '1449', rr: 24, o2: 'O2', spo2: 96, bp: '96/62', hr: 108 },
      { time: '1455', rr: 20, o2: 'O2', spo2: 97, bp: '104/68', hr: 96 }
    ],
    drugs: [
      ['1444', 'EpiPen (pt\'s own, EXPIRED)', '300', 'microg', 'IM L thigh'],
      ['1445', 'Monitor: sinus tachy'],
      ['1446', 'Oxygen', '', '', ''],
      ['1447', 'EOC Clinician + clin support'],
      ['1450', 'Adrenaline (EOC advice)', '500', 'microg', 'IM R thigh'],
      ['1455', 'EOC Clinician updated'],
      ['1500', 'Carry chair to stretcher']
    ],
    marks: []
  },

  greg: {
    label: 'Greg, 52: snake bite (AO)',
    short: 'Greg',
    walk: '/modules/envenomation/',
    // From /modules/envenomation/. Times 1458 (clinical support), 1505 (EOC Clinician), 1530 (depart) are DSY's.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Suspected brown snake envenoming, R lower leg, symptomatic (headache, vomiting, rising HR).',
      recommendation: 'Transported to Port Lincoln Hospital, notified. Bite ~1415, walked ~100 m, bite WASHED (swabbing may be affected). Pressure bandage toes to groin, bite circled, NOT removed. Vacuum mattress. HR 92 to 108, vomited once, nil paralysis or bleeding signs. Handed over 1605 (ISBAR).',
      ecg: 'Sinus rhythm, then sinus tachycardia.'
    },
    sections: {
      pc: 'Snake bite R lower leg ~1415, brown snake ~1.5 m. Headache + nausea.',
      phx: 'HTN.',
      medn: 'Perindopril 5 mg daily.',
      hx: 'Clearing scrub near the water tank at Wangary, felt a sharp sting R calf, saw a brown snake ~1.5 m. Walked ~100 m back to the house. Wife washed the bite + applied a cold cloth. No bandage. Now headache + feels sick. Last ate ~1 hr ago. Wife called SAAS.',
      oa: '52M sitting in a deck chair on the back verandah, R leg on a footstool, damp cloth on R calf. Pale, mildly sweaty, talking. Wife beside him, anxious. Dog penned, no snake seen.',
      cns: 'A on AVPU, GCS 15, oriented. PEARL 3 mm. Nil ptosis, double vision, slurred speech or difficulty swallowing.',
      skin: 'Pale, mild sweating. Two puncture marks R outer calf, mild local swelling, nil bleeding.',
      cvs: 'Pulse 92 regular. BP 138/82. Nil bleeding from gums or elsewhere. R foot pulses + sensation normal.',
      resp: 'RR 18, nil resp distress, normal effort. SpO2 98% RA.',
      pain: 'Pain at the bite site. Headache developing. Nil generalised muscle pain.',
      survey: '',
      care: 'Kept still from arrival, no walking or standing. Clinical support requested, EOC Clinician consulted. Pressure bandage toes to groin 1512, bite circled, cuticle beds pink. Vacuum mattress, head up 20-30 deg, clothing on.\n1522: HR 104, worse headache, vomited once, more sweating. EOC Clinician updated 1524: Port Lincoln now. Longboard to stretcher. Suction, BVM, defib ready. Cuticle beds pink throughout.'
    },
    tips: {
      survey: 'A bite on its own isn\'t a trauma secondary survey: the systemic screen goes in CNS, SKIN and CVS.',
      care: 'Longboard or carry chair are both right (lead instructor): say which you used.',
      recommendation: 'The washed bite and the bandage still on are the two things the hospital must hear.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Mark the bite on the right outer calf (front or back figure), for example S for the local swelling, and say "bite" beside it.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted and updated at 1524.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1500', rr: 18, o2: 'RA', spo2: 98, bp: '138/82', hr: 92, temp: 36.8, gcs: 15, evm: [4, 5, 6], pupils: ['+', '+'], bgl: 6.2 },
      { time: '1522', rr: 20, o2: 'RA', spo2: 97, bp: '130/78', hr: 104, gcs: 15, evm: [4, 5, 6] },
      { time: '1600', rr: 20, o2: 'RA', spo2: 97, bp: '126/76', hr: 108, gcs: 15, evm: [4, 5, 6] }
    ],
    drugs: [
      ['1458', 'Clinical support requested'],
      ['1500', 'Monitor: sinus rhythm'],
      ['1505', 'EOC Clinician consult'],
      ['1512', 'Pressure bandage toes-groin'],
      ['1515', 'Vacuum mattress, head up'],
      ['1524', 'EOC Clinician updated'],
      ['1530', 'Longboard to stretcher'],
      ['1605', 'Handover Port Lincoln ED']
    ],
    marks: [['front', 39, 205, 'S bite', -6]]
  },

  ron: {
    label: 'Ron, 67: hypoglycaemia (AO)',
    short: 'Ron',
    walk: '/modules/hypoglycaemia-ao/',
    // From /modules/hypoglycaemia-ao/. Departure and handover times are not given in the walk-through, so none are shown.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Hypoglycaemia (BGL 2.2): insulin-treated T2DM, missed lunch, working all day.',
      recommendation: 'Transported to Cummins Hospital (EOC Clinician), notified. Oral glucose 1730 ineffective, IM glucagon 1 mg 1744 (EOC Clinician). BGL 2.2, 2.6, 5.1. GCS now 15, eaten a sandwich. On insulin: watch for the hypo coming back. Clinical support requested.',
      ecg: 'Sinus tachycardia, then sinus rhythm.'
    },
    sections: {
      pc: 'Found confused + sweaty in the shed. Insulin-treated diabetic. BGL 2.2.',
      phx: 'Type 2 diabetes on insulin (8 yrs).',
      medn: 'Insulin (usual morning dose today), metformin, atorvastatin.',
      hx: 'Seeding since 0600, missed lunch. Last seen well ~1300 (two-way). Wife found him ~1710 in the machinery shed, sweaty, "not making sense". Nil fall known, nil head injury seen. Wife called SAAS.',
      oa: '67M sitting on the concrete floor of the machinery shed against a tractor tyre, pale + drenched in sweat. Looks at us, words muddled, pushes hand away. Water bottle beside him. Diesel smell, tractor off.',
      cns: 'GCS 13 (E4 V3 M6), confused, muddled speech. Strong cough on request. 1740: GCS 11 (E3 V3 M5), drowsy, weak cough. 1758: GCS 15.',
      skin: 'Pale, diaphoretic.',
      cvs: 'Pulse 104. BP 146/84. Nil blood loss.',
      resp: 'RR 18, nil resp distress. SpO2 97% RA. Airway clear.',
      pain: 'Nil c/o pain.',
      survey: '',
      care: 'BGL 2.2. Strong cough on request: oral glucose paste in small amounts 1730, swallowed. Clinical support requested.\n1740: BGL 2.6, GCS 11, weak cough: nil more oral glucose. EOC Clinician 1741: glucagon 1 mg IM, repeated back. Glucagon 1 mg L thigh 1744. 1758: BGL 5.1, GCS 15, sitting up. Sandwich eaten. Reluctant to go: reasons explained with wife, agreed. Carry chair to stretcher.'
    },
    tips: {
      survey: 'No injury found and no fall known: no secondary survey. A quick check for injury is still worth a line.',
      cns: 'Write the GCS as E V M: a falling score is the reason for the glucagon.',
      care: 'The cough test is your evidence that it was safe to give oral glucose: record it.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Glucagon injection site: left thigh (optional).',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 1741.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1728', rr: 18, o2: 'RA', spo2: 97, bp: '146/84', hr: 104, temp: 36.2, gcs: 13, evm: [4, 3, 6], bgl: 2.2 },
      { time: '1740', o2: 'RA', spo2: 97, bp: '142/80', hr: 100, gcs: 11, evm: [3, 3, 5], bgl: 2.6 },
      { time: '1758', o2: 'RA', spo2: 98, bp: '138/80', hr: 88, gcs: 15, evm: [4, 5, 6], bgl: 5.1 }
    ],
    drugs: [
      ['1728', 'BGL 2.2'],
      ['1730', 'Oral glucose paste', '15', 'g', 'Oral'],
      ['1730', 'Clinical support requested'],
      ['1741', 'EOC Clinician consult'],
      ['1744', 'Glucagon (EOC advice)', '1', 'mg', 'IM L thigh'],
      ['1758', 'BGL 5.1. Sandwich eaten']
    ],
    marks: []
  },

  robert: {
    label: 'Robert, 71: sepsis (AO)',
    short: 'Robert',
    walk: '/modules/sepsis/',
    // From /modules/sepsis/. Times 2131 (oxygen) and 2135 (clinical support with the consult) are DSY's. Oxygen 15 L/min
    // NRM is DSY's reading of "high-flow oxygen".
    text: {
      allergies: 'Nil known (incl. antibiotics)',
      communicable: 'Nil known',
      provisional: 'Suspected septic shock, likely urinary source (SBP 100 or less).',
      recommendation: 'SUSPECTED SEPTIC SHOCK. Transported to Tumby Bay Hospital, notified by GRN. EOC Clinician 2135: ceftriaxone not advised, go direct. Deteriorating: GCS 9 to 8, BP 92 to 86, mottled. NEWS2 7 or more. Needs urgent hospital treatment.',
      ecg: 'Sinus tachycardia.'
    },
    sections: {
      pc: '2 days urinary symptoms, now febrile (39.4), confused + hard to rouse.',
      phx: 'Type 2 diabetes, CKD, enlarged prostate, 3 UTIs in 12 months.',
      medn: 'Metformin, gliclazide, tamsulosin, aspirin.',
      hx: '2 days burning + frequency passing urine, lower abdo discomfort. Fever + rigors since yesterday. Today confused, not eating or drinking, very little urine. Nil cough, chest pain, diarrhoea or rash noticed. Wife called SAAS.',
      oa: '71M lying on the bed in pyjamas, eyes closed, flushed + sweaty, in a warm bedroom with a fan heater running. Groans to his name, doesn\'t open his eyes. Wife at the door.',
      cns: 'Responds to voice, GCS 9 (E3 V2 M4), confused. 2140 GCS 8 (E2 V2 M4).',
      skin: 'Hot, flushed, sweaty. 2140 mottled peripheries, cool by 2155. Nil rash.',
      cvs: 'Pulse 118. BP 92/58 (manual 90/56). CRT 4 s. Nil blood loss.',
      resp: 'RR 26, nil cough. SpO2 91% RA, 96% on high-flow O2.',
      pain: 'Lower abdo discomfort (per wife). Unable to score.',
      survey: '',
      care: 'PPE. Heater off. High-flow O2. SBP 100 or less = suspected septic shock pathway. EOC Clinician 2135 (febrile + GCS 9): ceftriaxone not advised, priority transport to Tumby Bay, go direct (paramedic 45 min). Clinical support requested "suspected septic shock".\n2140: worse, NEWS2 7 or more. Carry chair to stretcher, flat, O2 + monitor on, suction + BVM ready. GRN notification. Obs every 5 min.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      care: 'Ceftriaxone wasn\'t given, but the consult and the answer still go on the card: it shows the decision was made.',
      recommendation: 'Say the words "suspected septic shock".'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Nothing to mark.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 2135.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '2130', rr: 26, o2: 'RA', spo2: 91, bp: '92/58', crt: '>2', hr: 118, temp: 39.4, gcs: 9, evm: [3, 2, 4], bgl: 14.2 },
      { time: '2140', rr: 28, o2: '15', spo2: 96, bp: '88/54', hr: 122, temp: 39.4, gcs: 8, evm: [2, 2, 4] },
      { time: '2155', rr: 28, o2: '15', spo2: 95, bp: '86/52', hr: 124, gcs: 8, evm: [2, 2, 4] }
    ],
    drugs: [
      ['2131', 'Oxygen', '15', 'L/min', 'NRM'],
      ['2135', 'EOC Clinician: nil ceftriax.'],
      ['2135', 'Clinical support requested'],
      ['2140', 'NEWS2 7 or more'],
      ['2145', 'Carry chair to stretcher'],
      ['2150', 'GRN: suspected septic shock']
    ],
    marks: []
  },

  gary: {
    label: 'Gary, 58: pain management (AO)',
    short: 'Gary',
    walk: '/modules/pain-management/',
    // From /modules/pain-management/. Times 1926 (consult) and 1945 (second Penthrox) are DSY's.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Suspected closed fracture L tibia + fibula (mid-shaft), isolated injury.',
      recommendation: 'Transported to nearest country hospital, notified. Pain 8/10 to 3/10. Paracetamol 1 g 1905, Penthrox 3 mL 1907 + 2nd 3 mL for the carry, ketamine 25 mg SL 1928 + 1943 (EOC Clinician). Ibuprofen WITHHELD: on perindopril. Splinted, foot CSM intact before + after. Needs imaging, analgesia review, orthopaedics.',
      ecg: ''
    },
    sections: {
      pc: 'Fall ~2 m from shed roof onto concrete ~1840. Painful, deformed L lower leg.',
      phx: 'HTN, mild osteoarthritis.',
      medn: 'Perindopril 4 mg daily. Paracetamol PRN for arthritis, none in last 24 hrs.',
      hx: 'Working on the shed roof, fell ~2 m onto concrete ~1840. Landed on his feet, then fell onto his L side. Nil head strike, nil LOC. Unable to get up. Last ate 1730. Wife called SAAS.',
      oa: '58M lying on the concrete apron beside the shed, blanket over his chest, calling out in pain. Ladder against the wall, loose roof iron overhead. Dark, one shed light.',
      cns: 'A on AVPU, GCS 15, oriented, recalls events. Nil head strike or LOC.',
      skin: 'Pale, cool.',
      cvs: 'Pulse 98, radial present. BP 148/92. Nil bleeding. L foot pulse present, warm.',
      resp: 'RR 20, nil resp distress, talking full sentences. SpO2 98% RA.',
      pain: 'L lower leg, 8/10 (NRS). 4/10 at rest after Penthrox, 8/10 on movement, 3/10 en route.',
      survey: 'Head/neck: nil head strike, nil neck pain. Chest/abdo: NAD. Hips/pelvis: NAD. Limbs: L lower leg swollen + angulated mid-shaft, closed, foot pulse, sensation + movement present. Graze L palm.',
      care: 'Ladder moved, lighting. Blankets under + over. Leg supported as found. Paracetamol 1 g 1905. Penthrox 3 mL 1907, pt holds it. Splinted 1915, foot CSM checked before + after. Ibuprofen withheld (perindopril).\n1925 rolled: pain 8/10. EOC Clinician: agreed ibuprofen withheld, ketamine 25 mg SL, repeat once after 15 min. Ketamine 1928 + 1943. 2nd Penthrox for the 80 m carry on a carry sheet. Foot CSM rechecked.'
    },
    tips: {
      survey: 'A 2 m fall is trauma: the secondary survey goes in, even when the leg is the only injury.',
      pain: 'Give the score with the time and the context (rest or movement): the hospital plans the next doses from it.',
      care: 'Write why ibuprofen was withheld: "any ambiguity = withhold" (CPP-013-AO).'
    },
    reveal: {
      pi: 'Nothing: not a long lie (down 15 to 20 minutes).', falls: 'Not a falls-risk job: a fall from height, not an older person\'s fall. Leave blank.',
      body: 'Front figure: F (fracture, suspected) and S (swelling) on the left lower leg, A (abrasion) on the left palm.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted for the ketamine.'
    },
    ticks: ['consult'],
    obs: [
      { time: '1900', rr: 20, o2: 'RA', spo2: 98, bp: '148/92', hr: 98, temp: 36.4, gcs: 15, evm: [4, 5, 6], pain: 8, bgl: 6.2 },
      { time: '1920', rr: 16, o2: 'RA', spo2: 98, bp: '140/88', hr: 88, temp: 36.2, gcs: 15, evm: [4, 5, 6], pain: 4 },
      { time: '1925', rr: 22, o2: 'RA', spo2: 98, bp: '152/94', hr: 104, temp: 36.2, gcs: 15, evm: [4, 5, 6], pain: 8 },
      { time: '1950', rr: 16, o2: 'RA', spo2: 98, bp: '142/88', hr: 90, temp: 36.2, gcs: 15, evm: [4, 5, 6], pain: 4 },
      { time: '2010', rr: 14, o2: 'RA', spo2: 98, bp: '138/86', hr: 86, temp: 36.3, gcs: 15, evm: [4, 5, 6], pain: 3 }
    ],
    drugs: [
      ['1905', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1907', 'Methoxyflurane', '3', 'mL', 'Inhaler'],
      ['1915', 'Splint L leg, CSM checked'],
      ['1926', 'EOC Clinician consult'],
      ['1928', 'Ketamine wafer (EOC)', '25', 'mg', 'Sublingual'],
      ['1943', 'Ketamine wafer (EOC)', '25', 'mg', 'Sublingual'],
      ['1945', 'Methoxyflurane (2nd)', '3', 'mL', 'Inhaler'],
      ['1950', 'Carry sheet, 80 m carry']
    ],
    marks: [['front', 60, 195, 'F S', 6], ['front', 86, 128, 'A', 6]]
  },

  kevin: {
    label: 'Kevin, 72: ACPO (AO)',
    short: 'Kevin',
    walk: '/modules/APO/',
    // From /modules/APO/. Times 0302 (oxygen), 0309 (EOC Clinician) and 0330 (last set, the handover numbers) are DSY's.
    // Oxygen 15 L/min NRM is DSY's reading of "high-flow oxygen by non-rebreather".
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Acute cardiogenic pulmonary oedema (ACPO).',
      recommendation: 'Transported to nearest hospital, notified. Sat up, high-flow O2 NRM, GTN 400 microg SL spray 0311 + 0317 (EOC Clinician). Nil PDE-5 inhibitors. Improving: SpO2 82 to 94%, RR 32 to 22, BP 156 to 128. Needs ongoing treatment + monitoring. Clinical support requested.',
      ecg: 'Irregular rhythm (known AF), tachycardic.'
    },
    sections: {
      pc: 'Sudden SOB from sleep, can\'t lie down, pink frothy sputum. Cardiac history.',
      phx: 'Heart failure, AF, MI 4 yrs ago, HTN.',
      medn: 'Metoprolol, perindopril, frusemide, aspirin, atorvastatin. Nil PDE-5 inhibitors (wife).',
      hx: 'Woke 0215 short of breath, couldn\'t lie down, coughing pink sputum. Worse than ever before. Fish and chips for dinner ~1900. Wife called SAAS. Hx from wife (pt too breathless).',
      oa: '72M sitting on the edge of the bed leaning forward on his arms, grey, sweaty, breathing fast + hard, audible from the hallway. Pink frothy sputum at his lips. Wife at the door, distressed.',
      cns: 'A on AVPU, GCS 15, anxious + distressed.',
      skin: 'Grey, pale, sweaty.',
      cvs: 'Pulse 118 irregular, fast radial. BP 156/92. Nil blood loss.',
      resp: 'RR 32, single words only, working hard, crackles both sides. Pink frothy sputum, airway open. SpO2 82% RA, 89% on O2.',
      pain: 'Nil c/o chest pain.',
      survey: '',
      care: 'Kept sitting up, legs down. High-flow O2 NRM. Clinical support requested. PDE-5 asked (pt + wife): nil. EOC Clinician: GTN 400 microg SL, obs every 3-5 min, repeat in 5 min if SBP over 100 + HR 60-120. Limits checked aloud.\nGTN 0311. 0316 SpO2 92%, BP 138/86, HR 108, "a bit better": GTN 0317 as directed. Carry chair (upright, nil walking), stretcher head up. O2 + obs every 3-5 min en route.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      care: 'Write that you asked about PDE-5 inhibitors, and the answer: it is part of the GTN check.',
      pain: 'No chest pain is still a finding: write it.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Nothing to mark.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted for the GTN.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '0303', rr: 32, o2: 'RA', spo2: 82, bp: '156/92', hr: 118, temp: 36.4, gcs: 15, evm: [4, 5, 6], bgl: 7.8 },
      { time: '0308', rr: 30, o2: '15', spo2: 89, bp: '152/94', hr: 114, gcs: 15, evm: [4, 5, 6] },
      { time: '0316', rr: 26, o2: '15', spo2: 92, bp: '138/86', hr: 108, gcs: 15, evm: [4, 5, 6] },
      { time: '0330', rr: 22, o2: '15', spo2: 94, bp: '128/82', hr: 102 }
    ],
    drugs: [
      ['0302', 'Oxygen', '15', 'L/min', 'NRM'],
      ['0303', 'Clinical support requested'],
      ['0309', 'EOC Clinician consult'],
      ['0311', 'GTN spray (EOC advice)', '400', 'microg', 'Sublingual'],
      ['0317', 'GTN spray (EOC advice)', '400', 'microg', 'Sublingual'],
      ['0320', 'Carry chair to stretcher']
    ],
    marks: []
  },

  ian: {
    label: 'Ian, 62: headache (AO)',
    short: 'Ian',
    walk: '/modules/headache%20-ao/',
    // From the headache walk-through. Time 1446 (EOC Clinician update) is DSY's; handover time is not given.
    text: {
      allergies: 'Penicillin (rash)',
      communicable: 'Nil known',
      provisional: 'Sudden severe (thunderclap) headache with red flags, ?serious secondary cause. Deteriorating GCS.',
      recommendation: 'Transported to Port Lincoln Hospital, paramedics met en route, hospital notified by EOC. Red flags: sudden worst-ever headache, first severe headache over 50, neck stiffness. GCS 15 to 14, BP 178 to 182. Paracetamol 1 g 1440, ondansetron 4 mg ODT 1442. Ibuprofen withheld. Needs urgent medical assessment.',
      ecg: 'Sinus rhythm.'
    },
    sections: {
      pc: 'Sudden severe "worst ever" headache ~1340, first ever. Nausea, photophobia, neck stiffness.',
      phx: 'HTN, mild osteoarthritis. Nil previous headaches like this.',
      medn: 'Perindopril 5 mg. Paracetamol PRN, none today.',
      hx: 'Sitting reading at the caravan park ~1340: sudden headache "like someone smashed me with a cricket bat". Back of the head spreading over whole head, constant. Nil exertion, nil head knock. Nausea, nil vomiting. Light hurts. Neck getting stiff over last 15 min. Nil weakness, droop, speech or vision change. Nil seizure, LOC or rash. Lunch 1 hr ago. Wife called SAAS.',
      oa: '62M in a deck chair under the caravan annex, leaning forward, head in his hands, eyes shut, avoiding the bright sun. Wife anxious.',
      cns: 'A on AVPU, GCS 15, oriented. PEARL. ROSIER 0: nil face, arm or leg weakness, speech or vision change. Photophobia, neck stiffness. 1445: GCS 14 (E4 V4 M6), confused.',
      skin: 'Warm, normal colour. Nil rash.',
      cvs: 'Pulse 88 regular. BP 178/102, rising to 182/106. Nil blood loss.',
      resp: 'RR 18, nil resp distress. SpO2 98% RA.',
      pain: 'Sudden onset, occipital spreading to whole head, "cricket bat", constant, 9/10. 8/10 after paracetamol.',
      survey: '',
      care: 'Moved to shade, lights low. BGL 6.8. ROSIER 0: not the stroke pathway, but red flags. Clinical support requested 1438 (Port Lincoln paramedics). Paracetamol 1 g 1440. Ondansetron 4 mg ODT 1442 (nil contraindications or precautions). Ibuprofen withheld (perindopril).\n1445: GCS 14, confused, BP up. EOC Clinician updated: go now, paramedics to meet on the Lincoln Hwy, hospital notified, GCS every 5 min. Stand + pivot to stretcher, head up ~30 deg.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      pain: 'For a headache, the description is the evidence: onset, site, character, severity.',
      care: 'Pain relief that works is not evidence of a benign cause (CPP-061-AO): the red flags still stand.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Nothing to mark.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician updated.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1435', rr: 18, o2: 'RA', spo2: 98, bp: '178/102', hr: 88, temp: 37.2, gcs: 15, evm: [4, 5, 6], pupils: ['+', '+'], pain: 9, bgl: 6.8 },
      { time: '1445', rr: 20, o2: 'RA', spo2: 97, bp: '182/106', hr: 92, gcs: 14, evm: [4, 4, 6], pupils: ['+', '+'], pain: 8 }
    ],
    drugs: [
      ['1435', 'BGL 6.8, ROSIER 0'],
      ['1438', 'Clinical support requested'],
      ['1440', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1442', 'Ondansetron ODT', '4', 'mg', 'Oral (ODT)'],
      ['1446', 'EOC Clinician updated'],
      ['1450', 'Stand + pivot to stretcher']
    ],
    marks: []
  },

  helen: {
    label: 'Helen, 62: nausea and vomiting (AO)',
    short: 'Helen',
    walk: '/modules/nausea-vomiting/',
    // From /modules/nausea-vomiting/. Time 2102 (EOC Clinician) is DSY's.
    text: {
      allergies: 'Penicillin (rash)',
      communicable: 'Nil known',
      provisional: '?Food poisoning / gastroenteritis with dehydration.',
      recommendation: 'Transported to Cummins District Hospital, notified. Ondansetron 4 mg ODT 2047 (AF precaution noted) + 4 mg 2105 (EOC Clinician). Vomiting stopped, nausea 8 to 2/10. BGL drifting 4.8 to 4.5, not eating, on metformin: needs fluids + BGL monitoring. On apixaban.',
      ecg: 'AF (known), rate 104 then 92. Nil acute changes on 4-lead.'
    },
    sections: {
      pc: 'Vomiting ~8 hrs, unable to keep fluids down, near faint walking from the bathroom.',
      phx: 'AF, type 2 diabetes.',
      medn: 'Metoprolol 50 mg BD, apixaban 5 mg BD, metformin 1000 mg BD.',
      hx: 'Reheated chicken at lunch, vomiting from ~1230, 8+ times, now clear. Husband ate the same, well. Dizzy on standing, weak, nearly fainted walking to bed. Nil diarrhoea, chest pain or headache. Water 4 hrs ago, vomited. Husband called SAAS.',
      oa: '62F on the bathroom floor with a bucket, pale + exhausted. Strong smell of cleaning products.',
      cns: 'A on AVPU, GCS 15, oriented. Dizzy on standing.',
      skin: 'Pale, dry mouth.',
      cvs: 'Pulse 104 irregular (known AF). BP 108/72. CRT 3 s. Nil blood loss.',
      resp: 'RR 18, nil resp distress. SpO2 97% RA.',
      pain: 'Mild generalised abdo tenderness. Nil chest pain or headache. Nausea 8/10.',
      survey: '',
      care: 'Window opened. Helped to a chair, nil walking. BGL 4.8. Ondansetron screen: no allergy, no apomorphine; AF = one precaution, confirmed with pt. Ondansetron 4 mg ODT 2047.\n2100: vomiting stopped, nausea 5/10, BGL 4.6. EOC Clinician: 2nd 4 mg ODT, BGL checks (under 3.5 = hypo protocol), Cummins Hospital. 2105 ondansetron 4 mg ODT. 2115: nausea 2/10, BGL 4.5. Carry chair, semi-reclined, emesis bags.'
    },
    tips: {
      survey: 'No trauma, so no secondary survey.',
      care: 'Name the precaution (AF) and that you counted it: one precaution = give and note it; more than one = consult first.',
      pain: 'Nausea has its own score: record it with the time, so the response to ondansetron shows.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'Nothing to mark.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted for the second dose.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '2045', rr: 18, o2: 'RA', spo2: 97, bp: '108/72', crt: '>2', hr: 104, temp: 37.4, gcs: 15, evm: [4, 5, 6], bgl: 4.8 },
      { time: '2100', rr: 16, o2: 'RA', spo2: 97, bp: '110/74', hr: 98, bgl: 4.6 },
      { time: '2115', bp: '114/76', hr: 92, bgl: 4.5 }
    ],
    drugs: [
      ['2045', 'BGL 4.8. Monitor: AF'],
      ['2047', 'Ondansetron ODT', '4', 'mg', 'Oral (ODT)'],
      ['2102', 'EOC Clinician consult'],
      ['2105', 'Ondansetron ODT (EOC)', '4', 'mg', 'Oral (ODT)'],
      ['2115', 'BGL 4.5, nausea 2/10'],
      ['2120', 'Carry chair to stretcher']
    ],
    marks: []
  },

  daniel: {
    label: 'Daniel, 42: burns (AO)',
    short: 'Daniel',
    walk: '/modules/burns/',
    // From /modules/burns/. Times 1902 (EOC call), 1903 (cover), 1904 (paracetamol) and 1905 (Penthrox) are DSY's.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Facial flash burn ~3% (red, early blistering), suspected airway burn.',
      recommendation: 'SUSPECTED AIRWAY BURN. Transported to Tumby Bay Hospital, paramedics met en route, EOC Clinician consulted. Burn forehead, cheeks, nose, upper lip ~3%, singed eyebrows + beard. ~15 min running water. Voice clear throughout. Paracetamol 1 g + Penthrox: pain 8 to 5/10. Temp 36.1: keep warm. Needs close airway monitoring. Handed over 1935.',
      ecg: 'Sinus tachycardia, then sinus rhythm.'
    },
    sections: {
      pc: 'Facial flash burn from igniting diesel ~1840. Singed eyebrows + beard.',
      phx: 'Nil.',
      medn: 'Nil regular. Nil paracetamol or anti-inflammatories today.',
      hx: 'Pouring diesel on a fire pit ~1840, it went "whoosh". Turned away, brief exposure to his face. Friends started cooling with a hose straight away (~15 min by our arrival). Last ate lunchtime. Friend called SAAS.',
      oa: '42M sitting upright in a plastic chair in a backyard, eyes closed, in pain, friend running a hose over his face. Face red with early blistering, eyebrows + front of beard singed. Talking. Fire pit smouldering 8 m away, open 20 L diesel drum beside it.',
      cns: 'A on AVPU, GCS 15, oriented, recalls events.',
      skin: 'Burn forehead, both cheeks, nose + upper lip: red, early blistering, painful. ~3% (CTL-050). Rest of skin cool after cooling.',
      cvs: 'Pulse 108 regular. BP 148/92. Nil blood loss.',
      resp: 'RR 20, nil resp distress. Voice clear, nil hoarseness, stridor or wheeze. Nil singed nasal hair, nil soot around nose or mouth. SpO2 97% RA.',
      pain: 'Facial burn, 8/10. 5/10 after paracetamol + Penthrox.',
      survey: 'Head/neck: burns as above, singed eyebrows + beard. Chest/back, abdo, hips/pelvis, limbs: nil burns, NAD.',
      care: 'Diesel moved away from the fire. Facial burns + singed eyebrows = suspected airway burn: airway + urgent transport before finishing the 20 min cooling. Clinical support requested, EOC Clinician consulted. Hose stopped (~15 min total), cling wrap over the burn, nose + mouth clear, never round the head. Blanket, out of the wind.\nParacetamol 1 g. Penthrox 3 mL, pt holds it. Walked to the ambulance with help, sitting upright. Voice checked often en route: clear. Paramedics met on the highway.'
    },
    tips: {
      survey: 'A flash burn is trauma: check the rest of the body for burns and write that you did.',
      resp: 'For a suspected airway burn, the airway signs you looked for and didn\'t find are as important as the ones you found.',
      care: 'Record the total cooling time: the hospital needs it.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Nothing: not a fall.', body: 'B (burn) over the face on the front figure: forehead, cheeks, nose and upper lip, ~3%.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted.'
    },
    ticks: ['consult'],
    obs: [
      { time: '1859', rr: 20, o2: 'RA', spo2: 97, bp: '148/92', hr: 108, temp: 36.3, gcs: 15, evm: [4, 5, 6], pain: 8, bgl: 6.4 },
      { time: '1920', rr: 18, o2: 'RA', spo2: 98, bp: '138/86', hr: 94, temp: 36.1, pain: 5 }
    ],
    drugs: [
      ['1857', 'Cooling (friends, hose) ~15 min'],
      ['1902', 'EOC Clinician + clin support'],
      ['1903', 'Cling wrap cover, blanket'],
      ['1904', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1905', 'Methoxyflurane', '3', 'mL', 'Inhaler'],
      ['1908', 'To ambulance, upright'],
      ['1935', 'Handover Tumby Bay Hosp']
    ],
    marks: [['front', 50, 12, 'B 3%', 10]]
  },

  neil: {
    label: 'Neil, 67: spinal precautions (AO)',
    short: 'Neil',
    walk: '/modules/spinal-ao/',
    // From /modules/spinal-ao/. Time 1500 (towel roll) is DSY's; the rest are the walk-through's.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Head injury with LOC (~2 min), amnesia, GCS 14. L hip injury, ?#NOF. C-spine NOT cleared.',
      recommendation: 'Transported to Tumby Bay Hospital for assessment (EOC Clinician), notified. Ladder fall ~1415 onto decking, head strike, LOC ~2 min, walked inside by family. GCS 14 (V4) throughout. Modified towel roll, nil collar (head injury), "C-spine NOT clear" sticker. Ibuprofen at 1230. Ondansetron, paracetamol, Penthrox 1452: pain 8 to 4/10. May need transfer to Port Lincoln. Handed over 1512.',
      ecg: 'Sinus rhythm.'
    },
    sections: {
      pc: 'Fall from ladder ~1415 onto decking, head strike, LOC ~2 min. L hip pain. Confused, amnesic.',
      phx: 'Reflux, high cholesterol. Nil previous neck or back problems.',
      medn: 'Pantoprazole, atorvastatin. Ibuprofen x2 at ~1230 (knees). Nil blood thinners.',
      hx: 'Cleaning gutters, chest at gutter height. Ladder slid sideways, fell onto timber decking, landed on L side, hit back of head. Didn\'t move or answer ~2 min (wife), then groggy. Wife + neighbour helped him up and walked him ~10 m inside. Can\'t remember the fall. Nil alcohol. Wife called SAAS.',
      oa: '67M sitting on a kitchen chair leaning on the table, holding his L hip. Ladder on the decking outside. Asks "What happened? Did I fall?" and asks again a minute later. Wife + neighbour present.',
      cns: 'GCS 14 (E4 V4 M6), confused, repeating questions, amnesic for the fall. PEARL. Moves + feels all 4 limbs, nil tingling or numbness.',
      skin: 'Warm, normal colour.',
      cvs: 'Pulse 88 regular. BP 148/86. Nil bleeding.',
      resp: 'RR 18, nil resp distress. SpO2 96% RA.',
      pain: 'L hip, 8/10, worse with any movement, won\'t move the leg. Denies neck + back pain (unreliable: GCS 14, distracting injury). 5/10 then 4/10 after meds.',
      survey: 'Head: swelling back of head R, nil bleeding. Neck: denies pain (not relied on). Chest/back, abdo: NAD. Hips/pelvis: very tender L hip, won\'t move leg. Limbs: CSM normal x4.',
      care: 'Asked to stay still, manual head stabilisation sitting at the table. Spinal precautions: fall over 1 m, head strike, distracting injury, GCS 14, over 65. No collar (head injury, ?raised ICP). Nil ibuprofen (taken 1230), nil ketamine (GCS 14, over 64). 1452 ondansetron 4 mg ODT, paracetamol 1 g, Penthrox.\nControlled move onto the stretcher, head in line, modified towel roll, tape over a combine, "C-spine NOT clear" sticker. Limbs rechecked: normal. EOC Clinician 1506: Tumby Bay Hospital.'
    },
    tips: {
      survey: 'Trauma: the secondary survey goes in.',
      care: 'CPP-018-AO asks you to record your spinal immobilisation decisions and the technique: write the risk factors and why no collar.',
      pain: 'Write that he denies neck pain AND why you didn\'t rely on it.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Not a falls-risk job: a fall from a ladder, not a ground-level fall. Leave blank.',
      body: 'Back figure: S (swelling) on the back of the head, right side. Front figure: P (pain) at the left hip.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 1506.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1438', rr: 18, o2: 'RA', spo2: 96, bp: '148/86', hr: 88, temp: 36.6, gcs: 14, evm: [4, 4, 6], pupils: ['+', '+'], pain: 8, bgl: 6.2 },
      { time: '1504', rr: 16, o2: 'RA', spo2: 97, bp: '142/84', hr: 80, gcs: 14, evm: [4, 4, 6], pain: 4 },
      { time: '1512', rr: 18, o2: 'RA', spo2: 96, bp: '146/88', hr: 84, gcs: 14, evm: [4, 4, 6], pain: 4 }
    ],
    drugs: [
      ['1430', 'Manual head stabilisation'],
      ['1452', 'Ondansetron ODT', '4', 'mg', 'Oral (ODT)'],
      ['1452', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1452', 'Methoxyflurane', '3', 'mL', 'Inhaler'],
      ['1500', 'Mod. towel roll, stretcher'],
      ['1506', 'EOC Clinician consult'],
      ['1512', 'Handover Tumby Bay Hosp']
    ],
    marks: [['back', 54, 10, 'S', 7], ['front', 60, 110, 'P', 6]]
  },

  joanne: {
    label: 'Jo-Anne, 84: dementia and changed behaviour (AO)',
    short: 'Jo-Anne',
    walk: '/modules/dementia-ao/',
    note: 'Main path: she settles and goes voluntarily to Cummins Hospital with Ray.',
    // From /modules/dementia-ao/. Times 1855 (TV off) and 1948 (left scene) are DSY's; the rest are the walk-through's.
    // Pain is scored with PAINAD (CTL-094, 0 to 10) because she can't rate her pain with a number.
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      provisional: 'Acute behavioural disturbance in a person living with Alzheimer\'s disease. ?Delirium, ?UTI. Lower abdo pain (PAINAD 7).',
      recommendation:
        'Transported voluntarily to Cummins Hospital with husband Ray (EOC Clinician, no medication). More confused than her usual since yesterday, ' +
        'urinary frequency + stinging, PAINAD 7 to 2, SAT +2 to 0. NEWS2 4 (new confusion). Paracetamol 1 g 1922. What helped: one voice, TV off, ' +
        'hearing aids in, Ray beside her, not correcting her. Handed over 2003 (ISBAR).'
    },
    sections: {
      pc: 'Agitated since this evening, not recognising husband, pushed his hand away. More confused than her usual since yesterday.',
      phx: 'Alzheimer\'s disease (dx 6 yrs). HTN. OA knees. Hearing aids. Usually knows husband + home, needs help with dressing + tablets.',
      medn: 'Donepezil, amlodipine, paracetamol 1 g mane (last 0800). Nil allergies.',
      hx: 'Per husband Ray: since yesterday more confused, up most of last night, urinary frequency, says it stings, urine smells strong. Hardly drinking, skipped tea. Tonight says "a strange man" is in the house, wants to go home to Mum. Pushed Ray\'s hand away when he helped with her cardigan. Nil falls, nil head strike. Ray has hardly slept for 2 nights.',
      oa: '84F walking between kitchen table + hallway door, cardigan half on. Staring, raised voice, repeating the same questions. TV loud. Husband at front door, tired, no injuries. Nil weapons, nil threats. SAT +2.',
      cns: 'GCS 14 (E4 V4 M6), confused, oriented to person only (usually knows Ray + home). PEARL. Moves all 4 limbs. BGL 7.2.\nMSE: Appearance: cardigan half on, unsteady. Behaviour: pacing, restless. Conversation: loud, fast, repetitive. Mood: anxious, frightened. Perception: believes a stranger is in the house (does not recognise husband). Cognition: as above. Insight: poor.',
      skin: 'Warm, dry, normal colour. Temp 37.6.',
      cvs: 'Pulse 96 regular. BP 128/74.',
      resp: 'RR 18, nil resp distress. SpO2 96% RA.',
      pain: 'Unable to rate with a number. Rubbing lower abdo, grimaces when she shifts. PAINAD 7 (breathing 0, vocalisation 1, face 2, body 2, consolability 2). PAINAD 3 at 1935, 2 at 2000.',
      care: 'Risk assessment (CTL-011): dementia a risk factor, nil high-risk behaviours. One crew member talking, TV off, husband to the lounge with AO2. LOWLINE, acknowledged + redirected (talked about her mum, the farm at Lock), not corrected. Hearing aids found on bench, she put them in herself. SAT +1.\nObs one step at a time with consent. Walked to the toilet with Ray 1918, calmer after. 1922 paracetamol 1 g oral, taken from Ray. NEWS2 4.\n1935 EOC Clinician: de-escalation worked, nil medication, transport to Cummins Hospital if she agrees. Agreed to go with Ray (voluntary). Walked to stretcher with her rug. Nil lights or sirens, cabin lights low, Ray beside her. SAT 0, PAINAD 2 en route.'
    },
    tips: {
      pc: 'Use person-first words: "a person living with dementia", "changed behaviour", not "demented" or "difficult".',
      cns: 'CPP-017-AO: an MSE must be completed and documented. Put it here or in the clinical text, under its headings.',
      pain: 'PAINAD goes on the obs chart\'s pain line as a 0 to 10 score: write "PAINAD" next to it so nobody reads it as her own rating.',
      care: 'Times and wording will differ. The key facts: the risk assessment, what you changed, what settled her, PAINAD and SAT before and after, the consult, and that care was voluntary.',
      provisional: 'Other fair answers: "Agitation, ?delirium secondary to UTI", "BPSD with ?UTI". Keep the "?" when you can\'t confirm it.'
    },
    reveal: {
      pi: 'Nothing: not a long lie.', falls: 'Not a falls job. Leave blank.',
      body: 'Front figure: P (pain) over the lower abdomen.',
      ecg: 'Nothing: no ECG on this job.',
      info: 'Not ticked: transported.', consult: 'Ticked: EOC Clinician consulted at 1935.'
    },
    ticks: ['medsHanded', 'consult'],
    obs: [
      { time: '1912', rr: 18, o2: 'RA', spo2: 96, bp: '128/74', hr: 96, temp: 37.6, gcs: 14, evm: [4, 4, 6], pupils: ['+', '+'], pain: 7, bgl: 7.2 },
      { time: '1935', pain: 3 },
      { time: '2000', rr: 16, o2: 'RA', spo2: 96, bp: '124/72', hr: 90, temp: 37.5, gcs: 14, evm: [4, 4, 6], pain: 2 }
    ],
    drugs: [
      ['1855', 'TV off, one voice, LOWLINE'],
      ['1912', 'Obs, BGL, PAINAD 7, SAT +2'],
      ['1918', 'Toilet (with husband)'],
      ['1922', 'Paracetamol', '1000', 'mg', 'Oral'],
      ['1935', 'EOC Clinician consult'],
      ['1948', 'Walked to stretcher'],
      ['2003', 'Handover Cummins Hosp']
    ],
    marks: [['front', 50, 98, 'P', 6]]
  }
};
