/* DSY topic list: one entry per topic, used by the hub pages (/hub/, /hub/learn/, /hub/run/).
   Add a topic here when a module, walk-through or MDT job is made, and it appears on every page.
   module: folder under /microlearning/   walk: walk-through page (add ?mode=student for students)
   mdt: job id in /mdt/jobs.js   custom: slug in the scenario customiser (/scenarios/), if it can be customised */
window.DSY_TOPICS = [
  { id:'chest-pain', title:'Chest pain', protocol:'CPP-007-AO', patient:'Graham, 62: chest pain not settling with his own GTN',
    module:'chest-pain', walk:'/modules/chest-pain/', mdt:'chest-pain', custom:'chest-pain-ao' },
  { id:'asthma', title:'Asthma', protocol:'CPP-050-AO', patient:'Karen, 45: more severe asthma at 2 am',
    module:'asthma', walk:'/modules/asthma-ao/', mdt:'asthma' },
  { id:'anaphylaxis', title:'Anaphylaxis', protocol:'CPP-003-AO', patient:'David, 54: bee sting and an expired EpiPen',
    module:'anaphylaxis', walk:'/modules/anaphylaxis/', mdt:'anaphylaxis', custom:'anaphylaxis-ao' },
  { id:'stroke', title:'Stroke', protocol:'CPP-016-AO', patient:'Frank, 78: weakness and slurred speech at morning tea',
    module:'stroke', walk:'/modules/stroke-AO/', mdt:'stroke' },
  { id:'envenomation', title:'Snake bite', protocol:'CPP-008-AO', patient:'Greg, 52: brown snake bite to the leg',
    module:'envenomation', walk:'/modules/envenomation/', mdt:'envenomation', custom:'envenomation-ao' },
  { id:'hypoglycaemia', title:'Hypoglycaemia', protocol:'CPP-009-AO', patient:'Ron, 67: confused and sweaty in the shed',
    module:'hypoglycaemia', walk:'/modules/hypoglycaemia-ao/', mdt:'hypo' },
  { id:'sepsis', title:'Sepsis', protocol:'CPP-062-AO', patient:'Robert, 71: hot, confused and hard to rouse',
    module:'sepsis', walk:'/modules/sepsis/', mdt:'sepsis' },
  { id:'pain', title:'Pain management', protocol:'CPP-013-AO', patient:'Gary, 58: fall from a shed roof at dusk',
    module:'pain', walk:'/modules/pain-management/', mdt:'pain' },
  { id:'acpo', title:'ACPO', protocol:'CPP-001-AO', patient:'Kevin, 72: woke at 2 am gasping',
    module:'acpo', walk:'/modules/APO/', mdt:'acpo' },
  { id:'headache', title:'Headache', protocol:'CPP-061-AO', patient:'Ian, 62: sudden severe headache at the caravan park',
    module:'headache', walk:'/modules/headache%20-ao/', mdt:'headache' },
  { id:'nausea', title:'Nausea and vomiting', protocol:'CPP-047-AO', patient:'Helen, 62: eight hours of vomiting',
    module:'nausea', walk:'/modules/nausea-vomiting/', mdt:'nausea' },
  { id:'falls', title:'Falls', protocol:'CPP-045-AO', module:'falls' }
];
