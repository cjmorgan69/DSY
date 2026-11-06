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
  }
};
