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
  }
};
