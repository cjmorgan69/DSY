/* MDT simulator job library: one job per converted walk-through scenario (/modules/<name>/).
   Time, place, caller and MDT text come from each scenario's "Dispatch and en route" section.
   Live remarks (lines starting +M, arriving M minutes after dispatch) are DSY-written to fit each scenario's
   arrival scene and need the owner's review.
   Surnames, caller numbers, street details and towns the scenario leaves unnamed are DSY-invented.
   Type codes are left blank because the real SACAD codes are not known. */
window.MDT_JOBS = [
  { id:'asthma', label:'Asthma: Karen, 45 (rural homestead, 0215)', scenario:'/modules/asthma-ao/',
    priority:'2', startTime:'02:15', typeName:'Breathing problems', town:'Lock', street:'HOMESTEAD 14 KM NORTH',
    note:'45F DIFFICULTY BREATHING', patient:'MERCER, KAREN', age:'45Y', weight:'', caller:'HUSBAND (ON SCENE)',
    remarks:'DIFFICULTY BREATHING - "CANT GET HER BREATH"\nKNOWN ASTHMATIC - USING VENTOLIN WITHOUT RELIEF\nPATIENT AWAKE AND SITTING UP\nRURAL HOMESTEAD - SEALED ROAD ACCESS\n+3 HUSBAND: SHE IS USING HER PUFFER AGAIN - NO BETTER\n+8 HUSBAND WILL MEET CREW AT THE DOOR - PORCH LIGHT ON',
    expected:'Country hospital ED, about 30 minutes (scenario)' },
  { id:'chest-pain', label:'Chest pain: Graham, 62 (rural property, 2115)', scenario:'/modules/chest-pain/',
    priority:'2', startTime:'21:15', typeName:'Chest pain', town:'Arno Bay', street:'FARM 9 KM WEST',
    note:'62M CHEST PAIN - CARDIAC HX', patient:'HOLLOWAY, GRAHAM', age:'62Y', weight:'', caller:'WIFE (ON SCENE)',
    remarks:'CHEST PAIN FOR 30 MINUTES\nKNOWN ANGINA - HAS OWN GTN - PAIN NOT RESOLVING WITH OWN GTN\nWIFE ON SCENE\nSEALED ROAD THEN 2 KM DIRT - GATE OPEN - LIGHTS ON\nNEAREST ICP 55 MINUTES - MEDSTAR TBC\n+4 WIFE ADVISES PAIN UNCHANGED - PT PALE AND SWEATY\n+10 GATE OPEN - LIGHTS ON - WIFE WILL WAIT AT FRONT DOOR',
    expected:'Regional hospital, about 35 minutes (scenario)',
    // Link from the scenario customiser (Supabase public.scenarios, slug chest-pain-ao).
    // Town-house wording and the remark timing below are DSY-written.
    customSlug:'chest-pain-ao',
    customDefaults:{ patient:'Graham', age:'62', partner:'wife', setting:'farm', town:'', station:'', hospital:'',
      transport:'35', backup_name:'ICP', backup_mins:'55', dispatch:'21:15', response:'17' },
    custom(v){
      const U = x => String(x||'').trim().toUpperCase(), P = U(v.partner) || 'WIFE', farm = v.setting !== 'town';
      const town = String(v.town||'').trim() || 'Arno Bay', drive = Math.max(5, +v.response || 17);
      const early = Math.max(1, Math.round(drive*0.25)), late = Math.max(early+1, Math.round(drive*0.6));
      return {
        patient:'HOLLOWAY, ' + (U(v.patient) || 'GRAHAM'), age:(+v.age || 62) + 'Y', caller:P + ' (ON SCENE)',
        town, street: farm ? 'FARM 9 KM WEST' : 'HOUSE IN TOWN', station:String(v.station||'').trim(),
        unitLoc: U(v.station || town) + ' AMBULANCE STATION', startTime:v.dispatch || '21:15',
        note:(+v.age || 62) + 'M CHEST PAIN - CARDIAC HX',
        remarks:['CHEST PAIN FOR 30 MINUTES','KNOWN ANGINA - HAS OWN GTN - PAIN NOT RESOLVING WITH OWN GTN', P + ' ON SCENE',
          farm ? 'SEALED ROAD THEN 2 KM DIRT - GATE OPEN - LIGHTS ON' : 'HOUSE IN TOWN - LIGHTS ON',
          'NEAREST ' + (U(v.backup_name) || 'ICP') + ' ' + (+v.backup_mins || 55) + ' MINUTES - MEDSTAR TBC',
          '+' + early + ' ' + P + ' ADVISES PAIN UNCHANGED - PT PALE AND SWEATY',
          '+' + late + ' ' + (farm ? 'GATE OPEN - ' : '') + 'LIGHTS ON - ' + P + ' WILL WAIT AT FRONT DOOR'].join('\n'),
        expected:(String(v.hospital||'').trim() || 'Regional hospital') + ', about ' + (+v.transport || 35) + ' minutes (customised scenario)'
      };
    } },
  { id:'envenomation', label:'Snake bite: Greg, 52 (Wangary, 1432)', scenario:'/modules/envenomation/',
    priority:'2', startTime:'14:32', typeName:'Snake bite', town:'Wangary', street:'RURAL PROPERTY',
    note:'52M SNAKE BITE', patient:'TREMAYNE, GREG', age:'52Y', weight:'', caller:'WIFE (DENISE)',
    unitLoc:'PORT LINCOLN AMBULANCE STATION',
    remarks:'BITTEN RIGHT LOWER LEG ABOUT 15 MIN AGO - BROWN SNAKE ABOUT 1.5 M\nCONSCIOUS - BREATHING - AMBULANT\nNOW SITTING ON BACK VERANDAH\nGRAVEL DRIVEWAY 200 M TO HOMESTEAD\nDOGS WILL BE SECURED\n+6 PT REMAINS CONSCIOUS - SITTING ON BACK VERANDAH\n+15 DOG NOW PENNED - SNAKE NOT SIGHTED SINCE',
    expected:'PORT LINCOLN HOSPITAL (scenario)',
    // Link from the scenario customiser (Supabase public.scenarios, slug envenomation-ao). Remark timing is DSY-written.
    customSlug:'envenomation-ao',
    customDefaults:{ patient:'Greg', age:'52', partner:'wife', partner_name:'Denise', town:'Wangary', station:'Port Lincoln',
      hospital_town:'Port Lincoln', transport:'30', dispatch:'14:32', response:'25' },
    custom(v){
      const U = x => String(x||'').trim().toUpperCase(), P = U(v.partner) || 'WIFE', drive = Math.max(5, +v.response || 25);
      const early = Math.max(1, Math.round(drive*0.25)), late = Math.max(early+1, Math.round(drive*0.6));
      const town = String(v.town||'').trim(), station = String(v.station||'').trim() || 'Port Lincoln';
      return {
        patient:'TREMAYNE, ' + (U(v.patient) || 'GREG'), age:(+v.age || 52) + 'Y', caller:P + ' (' + (U(v.partner_name) || 'DENISE') + ')',
        town: town || 'Wangary', street:'RURAL PROPERTY', station, unitLoc:U(station) + ' AMBULANCE STATION', startTime:v.dispatch || '14:32',
        note:(+v.age || 52) + 'M SNAKE BITE',
        remarks:['BITTEN RIGHT LOWER LEG ABOUT 15 MIN AGO - BROWN SNAKE ABOUT 1.5 M','CONSCIOUS - BREATHING - AMBULANT','NOW SITTING ON BACK VERANDAH',
          'GRAVEL DRIVEWAY 200 M TO HOMESTEAD','DOGS WILL BE SECURED','+' + early + ' PT REMAINS CONSCIOUS - SITTING ON BACK VERANDAH',
          '+' + late + ' DOG NOW PENNED - SNAKE NOT SIGHTED SINCE'].join('\n'),
        expected:U(v.hospital_town || 'Port Lincoln') + ' HOSPITAL, about ' + (+v.transport || 30) + ' minutes (customised scenario)'
      };
    } },
  { id:'anaphylaxis', label:'Anaphylaxis: David, 54 (bee sting, 1430)', scenario:'/modules/anaphylaxis/',
    priority:'1', startTime:'14:30', typeName:'Allergic reaction', town:'Cowell', street:'RURAL PROPERTY 10 KM SOUTH',
    note:'54M ALLERGIC REACTION - DIFF BREATHING', patient:'ROWLEY, DAVID', age:'54Y', weight:'', caller:'WIFE (ON SCENE)',
    remarks:'STUNG BY A BEE - KNOWN BEE ALLERGY\nINCREASING DIFFICULTY BREATHING\nHAS AN EPIPEN - NOT USED\n+2 WIFE: SWELLING TO LIPS AND AROUND EYES\n+5 EPIPEN EXPIRED LAST YEAR - HAS TAKEN AN ANTIHISTAMINE TABLET\n+8 WIFE REPORTS BREATHING WORSE - AUDIBLE WHEEZE',
    expected:'Nearest hospital, about 25 minutes (scenario)',
    // Link from the scenario customiser (Supabase public.scenarios, slug anaphylaxis-ao). Remark timing is DSY-written.
    customSlug:'anaphylaxis-ao',
    customDefaults:{ patient:'David', age:'54', partner:'wife', town:'', station:'', hospital:'', transport:'25', dispatch:'14:30', response:'12' },
    custom(v){
      const U = x => String(x||'').trim().toUpperCase(), P = U(v.partner) || 'WIFE', drive = Math.max(5, +v.response || 12);
      const a = Math.max(1, Math.round(drive*0.17)), b = Math.max(a+1, Math.round(drive*0.42)), c = Math.max(b+1, Math.round(drive*0.67));
      const station = String(v.station||'').trim(), out = {
        patient:'ROWLEY, ' + (U(v.patient) || 'DAVID'), age:(+v.age || 54) + 'Y', caller:P + ' (ON SCENE)',
        town:String(v.town||'').trim() || 'Cowell', station, startTime:v.dispatch || '14:30',
        note:(+v.age || 54) + 'M ALLERGIC REACTION - DIFF BREATHING',
        remarks:['STUNG BY A BEE - KNOWN BEE ALLERGY','INCREASING DIFFICULTY BREATHING','HAS AN EPIPEN - NOT USED',
          '+' + a + ' ' + P + ': SWELLING TO LIPS AND AROUND EYES','+' + b + ' EPIPEN EXPIRED LAST YEAR - HAS TAKEN AN ANTIHISTAMINE TABLET',
          '+' + c + ' ' + P + ' REPORTS BREATHING WORSE - AUDIBLE WHEEZE'].join('\n'),
        expected:(String(v.hospital||'').trim() || 'Nearest hospital') + ', about ' + (+v.transport || 25) + ' minutes (customised scenario)'
      };
      if (station) out.unitLoc = U(station) + ' AMBULANCE STATION';
      return out;
    } },
  { id:'stroke', label:'Stroke: Frank, 78 (Coffin Bay, mid-morning)', scenario:'/modules/stroke-AO/',
    priority:'2', startTime:'10:20', typeName:'Possible stroke', town:'Coffin Bay', street:'HOUSE, ESPLANADE',
    note:'78M POSSIBLE STROKE', patient:'ABERNETHY, FRANK', age:'78Y', weight:'', caller:'WIFE (MARGARET, DISTRESSED)',
    remarks:'DROPPED HIS CUP - FACE DROOPY ON ONE SIDE - CANT SPEAK PROPERLY\nSTARTED ABOUT 45 MIN AGO AT MORNING TEA\nCONSCIOUS AND BREATHING - NO FALL - NO SEIZURE\nHX PER CALLER: HIGH BP, HEART TABLETS, DIABETES\nSINGLE STOREY HOUSE - FRONT DOOR UNLOCKED - NO DOGS\n+3 WIFE: RIGHT ARM WEAK - SPEECH STILL SLURRED\n+6 PT REMAINS CONSCIOUS - SITTING AT KITCHEN TABLE',
    expected:'PORT LINCOLN HOSPITAL (STS), about 35 minutes (scenario)' },
  { id:'hypo', label:'Hypoglycaemia: Ron, 67 (farm near Cummins, 1715)', scenario:'/modules/hypoglycaemia-ao/',
    priority:'2', startTime:'17:15', typeName:'Altered conscious state', town:'Cummins', street:'FARM 5 KM OUT',
    note:'67M ALTERED CONSCIOUS STATE', patient:'KILPATRICK, RON', age:'67Y', weight:'', caller:'WIFE (LYN)',
    remarks:'FOUND IN MACHINERY SHED - SWEATY AND "NOT MAKING SENSE"\nDIABETIC ON INSULIN\nBREATHING - NO FALL REPORTED\nGRAVEL DRIVEWAY - SHED BEHIND THE HOUSE\n+2 WIFE (LYN): SEEDING ALL DAY - MISSED LUNCH\n+5 PT STILL CONFUSED AND SWEATY - BREATHING NORMALLY - SITTING ON SHED FLOOR',
    expected:'CUMMINS HOSPITAL, about 10 minutes (scenario)' },
  { id:'sepsis', label:'Sepsis: Robert, 71 (near Tumby Bay, 2115)', scenario:'/modules/sepsis/',
    priority:'1', startTime:'21:15', typeName:'Fever, altered conscious state', town:'Tumby Bay', street:'FARM 12 KM NE',
    note:'71M FEVER - CONFUSION', patient:'DALGLEISH, ROBERT', age:'71Y', weight:'', caller:'WIFE (JEAN)',
    remarks:'FEVER - CONFUSION - DIFFICULT TO ROUSE\nUNWELL 2 DAYS: FEVER, RIGORS, REDUCED URINE OUTPUT\nWIFE: "BURNING HOT AND NOT MAKING SENSE"\nHX: T2DM, CKD, ENLARGED PROSTATE, 3 UTIS IN 12 MONTHS - NKA\n8 KM SEALED THEN 4 KM DIRT - GATE OPEN\n+3 WIFE (JEAN): NOW HARDER TO ROUSE - GROANS ONLY\n+6 PORCH LIGHT ON - GATE OPEN',
    expected:'TUMBY BAY HOSPITAL, about 15 minutes (scenario)' },
  { id:'pain', label:'Pain: Gary, 58 (fall from shed roof, 1845)', scenario:'/modules/pain-management/',
    priority:'2', startTime:'18:45', typeName:'Fall from height', town:'Cummins', street:'FARM, BOUNDARY RD',
    note:'58M FALL FROM HEIGHT - LEG INJURY', patient:'FINNEGAN, GARY', age:'58Y', weight:'', caller:'WIFE (MARGARET)',
    remarks:'FELL ABOUT 2 M FROM SHED ROOF ONTO CONCRETE\nLEFT LEG INJURED - IN A LOT OF PAIN\nCONSCIOUS AND BREATHING\nSHED 80 M FROM HOUSE DOWN A GRAVEL TRACK\n+3 WIFE (MARGARET): STILL LYING ON CONCRETE - BLANKET OVER HIM\n+6 PT CALLING OUT IN PAIN - CONSCIOUS - WIFE WILL MEET CREW AT GATE',
    expected:'Nearest country hospital, about 30 minutes (scenario)' },
  { id:'acpo', label:'ACPO: Kevin, 72 (township, 0247)', scenario:'/modules/APO/',
    priority:'2', startTime:'02:47', typeName:'Breathing problems', town:'Port Neill', street:'HOUSE IN TOWNSHIP',
    note:'72M BREATHING PROBLEMS', patient:'OSBORNE, KEVIN', age:'72Y', weight:'', caller:'WIFE (JOAN)',
    remarks:'SUDDEN SHORTNESS OF BREATH - CANT LIE DOWN\nWIFE: "HES GONE GREY"\nCARDIAC HISTORY - DETAILS UNKNOWN\nWIFE WILL MEET CREW AT FRONT DOOR\n+3 WIFE: BREATHING NOISY - SAYS HE CANT GET HIS BREATH\n+8 LIGHTS ON - WIFE WILL MEET CREW AT FRONT DOOR',
    expected:'Nearest hospital, about 30 minutes (scenario)' },
  { id:'headache', label:'Headache: Ian, 62 (Coffin Bay caravan park, 1423)', scenario:'/modules/headache%20-ao/',
    priority:'2', startTime:'14:23', typeName:'Headache', town:'Coffin Bay', street:'CARAVAN PARK, SITE 47',
    note:'62M SEVERE HEADACHE', patient:'MCALLISTER, IAN', age:'62Y', weight:'', caller:'WIFE (SANDRA)',
    remarks:'SUDDEN ONSET ABOUT 45 MIN AGO\nWIFE: "WORST HEADACHE EVER"\nCONSCIOUS AND BREATHING - NO TRAUMA REPORTED\nSITE 47 NEAR THE WATERFRONT LOOP\n+2 PT HOLDING HIS HEAD - SAYS LIGHT HURTS HIS EYES\n+5 WIFE (SANDRA) WILL MEET CREW AT PARK ENTRANCE',
    expected:'PORT LINCOLN HOSPITAL, about 35 to 40 minutes (scenario)' },
  { id:'nausea', label:'Nausea and vomiting: Helen, 62 (farm near Cummins, 2035)', scenario:'/modules/nausea-vomiting/',
    priority:'2', startTime:'20:35', typeName:'Nausea and vomiting', town:'Cummins', street:'FARM 5 KM WEST',
    note:'62F PERSISTENT N&V', patient:'BRADSHAW, HELEN', age:'62Y', weight:'', caller:'HUSBAND (DAVID)',
    remarks:'VOMITING FOR 8 HOURS - CANT KEEP FLUIDS DOWN\nNEARLY FAINTED WALKING FROM THE BATHROOM\nSEALED ROAD THEN 200 M GRAVEL DRIVEWAY\nGATE OPEN - LIGHTS ON\n+2 HUSBAND: STILL VOMITING - NOW ON BATHROOM FLOOR\n+5 SYMPTOMS STARTED AROUND LUNCHTIME AFTER LEFTOVER CHICKEN',
    expected:'CUMMINS HOSPITAL, about 7 minutes (scenario)' }
];

/* Links from the scenario customiser (Supabase public.scenarios) for the jobs that have no custom() of their own.
   The job's own text is reused: the patient's first name and age, the person with them (WIFE, HUSBAND or PARTNER and
   their name), the town, the station, the page time and the hospital are swapped in, and the live remark times are
   scaled to the customised drive time. This mapping is DSY-written. */
(function () {
  const U = x => String(x || '').trim().toUpperCase();
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const link = (id, slug, defaults, hospital) => {
    const j = window.MDT_JOBS.find(x => x.id === id); if (!j || j.custom) return;
    j.customSlug = slug; j.customDefaults = defaults;
    j.custom = v => {
      const d = defaults, swap = (s, from, to) => from && to && from !== to ? s.replace(new RegExp('\\b' + esc(from) + '\\b', 'g'), to) : s;
      let text = [j.caller, j.remarks];
      if (d.partner) text = text.map(s => swap(s, U(d.partner), U(v.partner)));
      if (d.partner_name) text = text.map(s => swap(s, U(d.partner_name), U(v.partner_name)));
      const drive = +v.response || +d.response, base = +d.response;
      let last = 0;
      const remarks = text[1].split('\n').map(line => line.replace(/^\+(\d+)/, (_, m) => {
        last = Math.max(last + 1, Math.round(+m * (base ? drive / base : 1))); return '+' + last;
      })).join('\n');
      const first = U(v.patient) || U(d.patient), age = +v.age || +d.age, station = String(v.station || '').trim();
      const out = { patient: j.patient.split(',')[0] + ', ' + first, age: age + 'Y', caller: text[0], remarks,
        note: j.note.replace(/^\d+/, age), town: String(v.town || '').trim() || j.town,
        expected: hospital(v) + ', about ' + (+v.transport || +d.transport) + ' minutes (customised scenario)' };
      if (v.dispatch) out.startTime = v.dispatch;
      if (station) { out.station = station; out.unitLoc = U(station) + ' AMBULANCE STATION'; }
      return out;
    };
  };
  const town = (key, d) => v => U(v[key] || d) + ' HOSPITAL';
  link('asthma', 'asthma-ao', { patient:'Karen', age:'45', partner:'husband', response:'12', transport:'30', dispatch:'02:15' },
    v => String(v.hospital || '').trim() || 'Country hospital ED');
  link('stroke', 'stroke-ao', { patient:'Frank', age:'78', partner:'wife', partner_name:'Margaret', town:'Coffin Bay', station:'Coffin Bay', sts:'Port Lincoln', transport:'35' },
    v => U(v.sts || 'Port Lincoln') + ' HOSPITAL (STS)');
  link('hypo', 'hypoglycaemia-ao', { patient:'Ron', age:'67', partner:'wife', partner_name:'Lyn', town:'Cummins', station:'Cummins', hospital_town:'Cummins', response:'10', transport:'10', dispatch:'17:15' },
    town('hospital_town', 'Cummins'));
  link('sepsis', 'sepsis-ao', { patient:'Robert', age:'71', partner:'wife', partner_name:'Jean', town:'Tumby Bay', station:'Tumby Bay', hospital_town:'Tumby Bay', response:'10', transport:'15', dispatch:'21:15' },
    town('hospital_town', 'Tumby Bay'));
  link('pain', 'pain-ao', { patient:'Gary', age:'58', partner:'wife', partner_name:'Margaret', town:'Cummins', station:'Cummins', response:'10', transport:'30', dispatch:'18:45' },
    v => String(v.hospital || '').trim() || 'Nearest country hospital');
  link('acpo', 'acpo-ao', { patient:'Kevin', age:'72', partner:'wife', partner_name:'Joan', response:'13', transport:'30', dispatch:'02:47' },
    v => String(v.hospital || '').trim() || 'Nearest hospital');
  link('headache', 'headache-ao', { patient:'Ian', age:'62', partner:'wife', partner_name:'Sandra', town:'Coffin Bay', station:'Coffin Bay', hospital_town:'Port Lincoln', response:'8', transport:'35', dispatch:'14:23' },
    town('hospital_town', 'Port Lincoln'));
  link('nausea', 'nausea-ao', { patient:'Helen', age:'62', partner:'husband', partner_name:'David', town:'Cummins', station:'Cummins', response:'8', transport:'7', dispatch:'20:35' },
    v => U(v.hospital || 'Cummins District Hospital'));
})();
