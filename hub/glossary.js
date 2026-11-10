/* Topic glossaries for Run a session (/hub/run/): common medical terms a facilitator may need to explain on the night.
   Key = topic id in hub/topics.js. Each term: [term, plain meaning, source]. Source "CPP-xxx-AO" = the meaning or rule is
   taken from that protocol's wording; "Lead instructor" = the owner's local guidance; "" = plain-English meaning written
   by DSY (general teaching, for the lead instructor to review). Add a topic when the owner asks. */
window.DSY_GLOSSARY = {
  'chest-pain': {
    note: 'Terms from CPP-007-AO Chest Pain - AO (v4.2, exported 31 Aug 2026), the Graham walk-through and the chest pain stations.',
    groups: [
      { title: 'The condition', terms: [
        ['Cardiac ischaemia', 'Heart muscle not getting enough blood and oxygen. Suspect it as the cause of chest pain unless there is an obvious alternative.', 'CPP-007-AO'],
        ['Angina', 'Chest pain from cardiac ischaemia that usually settles with rest or GTN. People diagnosed with angina are trained to recognise their symptoms and may have used their own medications before the crew arrives.', 'CPP-007-AO'],
        ['Myocardial infarction (MI, AMI)', 'A heart attack: part of the heart muscle dies because its blood supply is blocked. Untreated cardiac chest pain risks sudden death from MI.', 'CPP-007-AO'],
        ['Acute coronary syndrome (ACS)', 'The umbrella name hospitals use for unstable angina and heart attack: a sudden drop in blood supply to the heart muscle.', ''],
        ['"Time is muscle"', 'The longer the blood supply is blocked, the more heart muscle dies. Urgent medical care is needed.', 'CPP-007-AO'],
        ['STEMI', 'A heart attack with ST elevation on a 12-lead ECG. It needs urgent treatment in hospital to reopen the artery. An AO 4-lead ECG cannot show it.', ''],
        ['Reperfusion (PCI, thrombolysis)', 'Hospital treatments that reopen a blocked heart artery: PCI uses a balloon and stent; thrombolysis uses a clot-dissolving drug.', '']
      ] },
      { title: 'Signs and symptoms', terms: [
        ['Pain, pressure, heaviness or tightness', 'How cardiac chest pain is often described, in the chest, neck, jaw, arms, back or shoulder.', 'CPP-007-AO'],
        ['Radiation', 'Pain that spreads from where it starts, for example from the chest into the left arm or jaw.', ''],
        ['Diaphoresis', 'Sweating. A sign that may come with cardiac ischaemia.', 'CPP-007-AO'],
        ['Dyspnoea (SOB)', 'Shortness of breath.', 'CPP-007-AO'],
        ['Nausea, dizziness', 'Feeling sick, light-headed. Both may come with cardiac ischaemia.', 'CPP-007-AO'],
        ['Arrhythmia (dysrhythmia)', 'An abnormal heart rhythm. Cardiac ischaemia puts the patient at risk of life-threatening rhythm changes.', 'CPP-007-AO'],
        ['Tachycardia, bradycardia', 'A fast heart rate (over 100) or a slow one (under 60). GTN needs a pulse of 60 to 120.', 'CPP-007-AO']
      ] },
      { title: 'Treatment', terms: [
        ['Aspirin', 'Oral aspirin 300 mg, unless allergic. It makes platelets less sticky, so a clot is less likely to grow. Chewed, then swallowed.', 'CPP-007-AO'],
        ['Glyceryl trinitrate (GTN)', 'A vasodilator given under the tongue. Tablet 300 microg (protocol) or spray 400 microg. Needs SBP 100 or more, pulse 60 to 120 and no PDE-5 inhibitor. Every 5 minutes as needed, total max 3 doses.', 'CPP-007-AO'],
        ['GTN first dose', 'GTN previously prescribed and within limits: the AO crew may give the first dose without a consult, then consult the EOC Clinician for further doses (even though the SAAS app lists it as consult). Not previously prescribed: consult first.', 'Lead instructor'],
        ['Vasodilator', 'A drug that widens blood vessels. GTN may have a profound effect on blood pressure: watch the patient closely.', 'CPP-007-AO'],
        ['PDE-5 inhibitor', 'Medicines for erectile dysfunction or pulmonary hypertension: sildenafil, vardenafil or avanafil (within 24 hours) and tadalafil (within 48 hours). With GTN they can cause life-threatening hypotension, so no GTN.', 'CPP-007-AO'],
        ['Adequate oxygenation', 'SpO2 above 94% on air. If not, nasal cannula oxygen to bring it above 94%.', 'Lead instructor'],
        ['Clinical support', 'Calling in a higher-skilled crew (paramedic or ICP). Consider it for chest pain.', 'CPP-007-AO']
      ] },
      { title: 'Observations and monitoring', terms: [
        ['Systolic BP (SBP)', 'The top number of the blood pressure. GTN needs 100 or more.', 'CPP-007-AO'],
        ['Hypotension', 'Low blood pressure. For GTN, a systolic below 100 is outside the limit: no more GTN and consult the EOC Clinician.', 'CPP-007-AO'],
        ['ECG monitoring', 'Watching the heart rhythm on the monitor. Basic care for chest pain includes it; vital signs every 5 minutes, then every 3 to 5 minutes once GTN is given.', 'CPP-007-AO'],
        ['4-lead and 12-lead ECG', 'The AO 4-lead ECG shows the rhythm only. A 12-lead looks at the heart from 12 views and can show a STEMI: request clinical support for one.', 'Lead instructor'],
        ['Sinus rhythm', 'The normal heart rhythm, started by the heart\'s own pacemaker.', '']
      ] },
      { title: 'Medications and history you will hear', terms: [
        ['Hypertension (HTN)', 'High blood pressure.', ''],
        ['Hypercholesterolaemia', 'High cholesterol.', ''],
        ['Metoprolol', 'A beta blocker: slows the heart rate and lowers blood pressure.', ''],
        ['Perindopril', 'An ACE inhibitor: lowers blood pressure.', ''],
        ['Atorvastatin', 'A statin: lowers cholesterol.', ''],
        ['Antiplatelet', 'A medicine that stops platelets clumping into clots, such as aspirin.', '']
      ] },
      { title: 'Abbreviations', terms: [
        ['SL, PO, IM', 'Sublingual (under the tongue), oral (by mouth), intramuscular (into the muscle).', ''],
        ['prn', 'As needed.', ''],
        ['microg', 'Micrograms: 1000 microg = 1 mg. SAAS writes microg, not mcg or µg.', ''],
        ['c/o, NAD', 'Complaining of; no abnormality detected.', ''],
        ['EOC Clinician', 'The clinician in the Emergency Operations Centre that AO crews consult for advice and authorisation.', '']
      ] }
    ]
  }
};
