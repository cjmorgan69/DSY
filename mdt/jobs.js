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
    expected:'PORT LINCOLN HOSPITAL (scenario)' },
  { id:'anaphylaxis', label:'Anaphylaxis: David, 54 (bee sting, 1430)', scenario:'/modules/anaphylaxis/',
    priority:'1', startTime:'14:30', typeName:'Allergic reaction', town:'Cowell', street:'RURAL PROPERTY 10 KM SOUTH',
    note:'54M ALLERGIC REACTION - DIFF BREATHING', patient:'ROWLEY, DAVID', age:'54Y', weight:'', caller:'WIFE (ON SCENE)',
    remarks:'STUNG BY A BEE - KNOWN BEE ALLERGY\nINCREASING DIFFICULTY BREATHING\nHAS AN EPIPEN - NOT USED\n+2 WIFE: SWELLING TO LIPS AND AROUND EYES\n+5 EPIPEN EXPIRED LAST YEAR - HAS TAKEN AN ANTIHISTAMINE TABLET\n+8 WIFE REPORTS BREATHING WORSE - AUDIBLE WHEEZE',
    expected:'Nearest hospital, about 25 minutes (scenario)' },
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
