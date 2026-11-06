/* Worked examples for the patient report card (/tools/pcr/). Each one is a DSY walk-through scenario written up as a
   crew might write it. The scenarios are DSY-written training material, not real patients. */
window.PCR_EXAMPLES = {
  mavis: {
    label: 'Example: Mavis, 81 (falls walk-through)',
    // From /modules/falls-ao/ (main path: transport to Cummins Hospital). Times 0640, 0710 and 0715 are filled in by DSY
    // between the times the walk-through gives (arrival 0638, obs 0646, Raizer 0702, sitting obs 0704, lying 0708, handover 0728).
    text: {
      allergies: 'Nil known',
      communicable: 'Nil known',
      clinical:
        'Fall at home ~0300, long lie ~3.5 hrs, unable to get up.\n' +
        'PHx: HTN, high cholesterol, OA knees. 2nd fall this year (garden, March, nil injury). Walking frame indoors. Lives alone.\n' +
        'Medn: perindopril (dose increased by GP last week), atorvastatin, paracetamol. Nil anticoagulants (med box checked).\n' +
        'Hx: Got up to toilet ~0300, "my feet went from under me". Denies head strike. Unable to get up. Pressed pendant 0624.\n' +
        'O/A: 81F supine on bathroom floor between toilet and bath, nightie + towel, shivering. House cold. Incontinent of urine, ' +
        'nightie damp. Alert, talking, apologetic, wants to get up.\n' +
        'O/E: CNS - A on AVPU, GCS 15, oriented, PEARL, moves all 4 limbs. SKIN - cool, hands + feet cold, red skin sacrum + both heels.\n' +
        'CVS - pulse 82 regular, peripheral pulses present, nil blood loss. RESP - RR 16, normal effort, equal chest rise, SpO2 95% RA. ' +
        'PAIN - nil, 0/10.  2* survey: Head/neck NAD, nil neck pain. Chest/back NAD, nil spinal pain. Abdo NAD. ' +
        'Hips/pelvis NAD, legs straight. Limbs NAD, nil deformity.\n' +
        'Mobility (CPPRO-001) lying: SLR yes, head lift yes, rolls with help, unable to bridge. Raizer lift to sitting 0702. ' +
        '~1 min later pale, dizzy ("swimmy"), BP 104/66 P 98. States same feeling getting off the toilet just before the fall. ' +
        'Raizer lowered, sx settled. 0708 BP 126/76 P 86. Not stood. Transport.\n' +
        'Braden 14 (medium risk). Wet nightie off, skin dried, dry clothes + fresh pad. Slide sheet to stretcher, kept warm.\n' +
        'Med box, glasses + frame with pt. House locked, key returned to key safe. Daughter Sue (Port Lincoln) informed.',
      provisional: 'Fall with long lie (~3.5 hrs). ?Medical cause: dizzy with BP drop on sitting up, perindopril increased last week.',
      recommendation:
        'Transported to Cummins Hospital. Nil injury found. Became dizzy + pale sitting up (BP 132 lying, 104 sitting), ' +
        'same feeling as just before the fall. Temp 35.4 on the floor. Needs review of cause of fall, warming + pressure care ' +
        '(Braden 14, red skin sacrum + heels). Handed over to nurse in charge 0728 (ISBAR).',
      braden: '14',
      ground: '~3.5 hrs'
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
