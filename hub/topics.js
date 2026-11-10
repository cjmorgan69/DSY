/* DSY topic list: one entry per topic, used by the hub pages (/hub/, /hub/learn/, /hub/run/).
   Add a topic here when a module, walk-through or MDT job is made, and it appears on every page.
   module: folder under /microlearning/   walk: walk-through page (add ?mode=student for students)
   mdt: job id in /mdt/jobs.js   stations: practical skills stations page, if any
   custom: slug in the scenario customiser (/scenarios/), if it can be customised
   pcr: job id in /tools/pcr/jobs.js (PCR trainer: write the patient care record after the walk-through) */
window.DSY_TOPICS = [
  { id:'chest-pain', title:'Chest pain', protocol:'CPP-007-AO', patient:'Graham, 62: chest pain not settling with his own GTN',
    module:'chest-pain', walk:'/modules/chest-pain/', mdt:'chest-pain', custom:'chest-pain-ao', stations:'/stations/chest-pain-acpo/', pcr:'graham' },
  { id:'asthma', title:'Asthma', protocol:'CPP-050-AO', patient:'Karen, 45: more severe asthma at 2 am',
    module:'asthma', walk:'/modules/asthma-ao/', mdt:'asthma', custom:'asthma-ao', stations:'/stations/asthma/', pcr:'karen' },
  { id:'anaphylaxis', title:'Anaphylaxis', protocol:'CPP-003-AO', patient:'David, 54: bee sting and an expired EpiPen',
    module:'anaphylaxis', walk:'/modules/anaphylaxis/', mdt:'anaphylaxis', custom:'anaphylaxis-ao', stations:'/stations/anaphylaxis/', pcr:'david' },
  { id:'stroke', title:'Stroke', protocol:'CPP-016-AO', patient:'Frank, 78: weakness and slurred speech at morning tea',
    module:'stroke', walk:'/modules/stroke-AO/', mdt:'stroke', custom:'stroke-ao', stations:'/stations/stroke/', pcr:'frank' },
  { id:'envenomation', title:'Snake bite', protocol:'CPP-008-AO', patient:'Greg, 52: brown snake bite to the leg',
    module:'envenomation', walk:'/modules/envenomation/', mdt:'envenomation', custom:'envenomation-ao', pcr:'greg' },
  { id:'hypoglycaemia', title:'Hypoglycaemia', protocol:'CPP-009-AO', patient:'Ron, 67: confused and sweaty in the shed',
    module:'hypoglycaemia', walk:'/modules/hypoglycaemia-ao/', mdt:'hypo', custom:'hypoglycaemia-ao', stations:'/stations/hypoglycaemia/', pcr:'ron' },
  { id:'sepsis', title:'Sepsis', protocol:'CPP-062-AO', patient:'Robert, 71: hot, confused and hard to rouse',
    module:'sepsis', walk:'/modules/sepsis/', mdt:'sepsis', custom:'sepsis-ao', pcr:'robert' },
  { id:'pain', title:'Pain management', protocol:'CPP-013-AO', patient:'Gary, 58: fall from a shed roof at dusk',
    module:'pain', walk:'/modules/pain-management/', mdt:'pain', custom:'pain-ao', pcr:'gary' },
  { id:'acpo', title:'ACPO', protocol:'CPP-001-AO', patient:'Kevin, 72: woke at 2 am gasping',
    module:'acpo', walk:'/modules/APO/', mdt:'acpo', custom:'acpo-ao', stations:'/stations/chest-pain-acpo/', pcr:'kevin' },
  { id:'headache', title:'Headache', protocol:'CPP-061-AO', patient:'Ian, 62: sudden severe headache at the caravan park',
    module:'headache', walk:'/modules/headache%20-ao/', mdt:'headache', custom:'headache-ao', stations:'/stations/headache-nausea/', pcr:'ian' },
  { id:'nausea', title:'Nausea and vomiting', protocol:'CPP-047-AO', patient:'Helen, 62: eight hours of vomiting',
    module:'nausea', walk:'/modules/nausea-vomiting/', mdt:'nausea', custom:'nausea-ao', stations:'/stations/headache-nausea/', pcr:'helen' },
  { id:'falls', title:'Falls', protocol:'CPP-045-AO', patient:'Mavis, 81: a long lie on the bathroom floor, Cummins',
    module:'falls', walk:'/modules/falls-ao/', mdt:'falls', custom:'falls-ao', stations:'/stations/falls/', pcr:'mavis' },
  { id:'burns', title:'Burns', protocol:'CPP-006-AO', patient:'Daniel, 42: diesel flash burn to the face',
    module:'burns', walk:'/modules/burns/', custom:'burns-ao', stations:'/stations/burns/', pcr:'daniel' },
  { id:'mva-baseline', title:'Baseline obs at a high-speed MVA', protocol:'CPP-063-AO', patient:'Jason, 34: rollover near Cummins, walking and "fine"',
    module:'mva-baseline', walk:'/modules/mva-ao/', mdt:'mva', custom:'mva-ao', stations:'/stations/mva/', pcr:'jason' },
  { id:'spinal', title:'Spinal precautions', protocol:'CPP-018-AO', patient:'Neil, 67: ladder fall, walked to the kitchen table',
    module:'spinal', walk:'/modules/spinal-ao/', stations:'/stations/spinal/', pcr:'neil' },
  { id:'dementia', title:'Dementia and changed behaviours', protocol:'CPP-017-AO', patient:'Jo-Anne, 84: doesn\'t recognise her husband tonight',
    module:'dementia', walk:'/modules/dementia-ao/', mdt:'dementia', custom:'dementia-ao', stations:'/stations/dementia/', pcr:'joanne' }
];
