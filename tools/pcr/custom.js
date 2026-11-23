/* Customised walk-throughs in the PCR trainer: the scenario customiser (/scenarios/, Supabase public.scenarios) opens
   /tools/pcr/#s=<slug>&field=value... and the matching walk-through job below is rewritten to fit: the patient's first
   name and age, the person with them (wife, husband or partner, and their name), the scene town, the road (MVA) and
   the hospital are swapped in, and the clock times move with the page time, the drive to the patient and the drive to
   hospital. The model card stays the approved one in every other way (same obs, treatment and doses).
   defaults = the template's defaults (the link only carries fields that were changed); hosp = the hospital as the
   PCR card writes it (blank when the card names none); hospKey = the customiser field for the hospital: 'hospital'
   is a full name ("Cleve Hospital"), 'hospital_town' and 'sts' are a town; hospText = phrases where the card names
   the hospital by its town alone. backup_from and backup_mins change "Port Lincoln paramedics" and "paramedic 45
   min". times = the few times the customised walk-through moves differently (with the page, or with arrival on
   scene), checked against every template on 22 Nov 2026. This mapping is DSY-written. */
(function () {
  var MAP = {
    'chest-pain-ao':    { job: 'graham', hosp: 'Cleve', hospKey: 'hospital', defaults: { backup_mins: '55', patient: 'Graham', age: '62', partner: 'wife', town: '', hospital: '', dispatch: '21:15', response: '17', transport: '20' } },
    'asthma-ao':        { job: 'karen', hosp: 'Cummins', times: { '0225': 'scene' }, hospKey: 'hospital', defaults: { backup_mins: '50', patient: 'Karen', age: '45', partner: 'husband', town: '', hospital: '', dispatch: '02:15', response: '12', transport: '30' } },
    'anaphylaxis-ao':   { job: 'david', hosp: '', times: { '1427': 'scene' }, hospKey: 'hospital', defaults: { backup_mins: '40', patient: 'David', age: '54', partner: 'wife', town: '', hospital: '', dispatch: '14:30', response: '12', transport: '25' } },
    'stroke-ao':        { job: 'frank', hosp: 'Port Lincoln', hospKey: 'sts', defaults: { backup_mins: '40', patient: 'Frank', age: '78', partner: 'wife', partner_name: 'Margaret', town: 'Coffin Bay', sts: 'Port Lincoln', transport: '35' } },
    'envenomation-ao':  { job: 'greg', hosp: 'Port Lincoln', hospText: [': Port Lincoln now'], hospKey: 'hospital_town', defaults: { backup_mins: '50', patient: 'Greg', age: '52', partner: 'wife', partner_name: 'Denise', town: 'Wangary', hospital_town: 'Port Lincoln', dispatch: '14:32', response: '25', transport: '30' } },
    'hypoglycaemia-ao': { job: 'ron', hosp: 'Cummins', hospKey: 'hospital_town', defaults: { backup_from: 'Port Lincoln', backup_mins: '45', patient: 'Ron', age: '67', partner: 'wife', partner_name: 'Lyn', town: 'Cummins', hospital_town: 'Cummins', dispatch: '17:15', response: '10', transport: '10' } },
    'sepsis-ao':        { job: 'robert', hosp: 'Tumby Bay', hospText: ['transport to Tumby Bay'], hospKey: 'hospital_town', defaults: { backup_from: 'Port Lincoln', backup_mins: '45', patient: 'Robert', age: '71', partner: 'wife', partner_name: 'Jean', town: 'Tumby Bay', hospital_town: 'Tumby Bay', dispatch: '21:15', response: '10', transport: '15' } },
    'pain-ao':          { job: 'gary', hosp: '', times: { '1730': 'page' }, hospKey: 'hospital', defaults: { backup_mins: '50', patient: 'Gary', age: '58', partner: 'wife', partner_name: 'Margaret', town: 'Cummins', hospital: '', dispatch: '18:45', response: '10', transport: '30' } },
    'acpo-ao':          { job: 'kevin', hosp: '', hospKey: 'hospital', defaults: { patient: 'Kevin', age: '72', partner: 'wife', partner_name: 'Joan', town: '', hospital: '', dispatch: '02:47', response: '13', transport: '30' } },
    'headache-ao':      { job: 'ian', hosp: 'Port Lincoln', hospKey: 'hospital_town', defaults: { backup_from: 'Port Lincoln', backup_mins: '45', patient: 'Ian', age: '62', partner: 'wife', partner_name: 'Sandra', town: 'Coffin Bay', hospital_town: 'Port Lincoln', dispatch: '14:23', response: '8', transport: '35' } },
    'nausea-ao':        { job: 'helen', hosp: 'Cummins', hospKey: 'hospital', defaults: { patient: 'Helen', age: '62', partner: 'husband', partner_name: 'David', town: 'Cummins', hospital: 'Cummins Hospital', dispatch: '20:35', response: '8', transport: '7' } },
    'falls-ao':         { job: 'mavis', hosp: 'Cummins', hospKey: 'hospital_town', defaults: { patient: 'Mavis', age: '81', town: 'Cummins', hospital_town: 'Cummins', dispatch: '06:30', response: '8', transport: '5' } },
    'burns-ao':         { job: 'daniel', hosp: 'Tumby Bay', times: { '1920': 'scene' }, hospKey: 'hospital', defaults: { patient: 'Daniel', age: '42', town: 'Port Neill', hospital: 'Tumby Bay Hospital', dispatch: '18:45', response: '12', transport: '25' } },
    'mva-ao':           { job: 'jason', hosp: 'Port Lincoln', hospText: [': Port Lincoln, paramedics'], hospKey: 'hospital_town', road: 'Tod Hwy', defaults: { patient: 'Jason', age: '34', road: 'Tod Highway', town: 'Cummins', hospital_town: 'Port Lincoln', dispatch: '17:30', response: '12', transport: '50' } },
    'dementia-ao':      { job: 'joanne', hosp: 'Cummins', hospKey: 'hospital_town', defaults: { patient: 'Jo-Anne', age: '84', partner_name: 'Ray', town: 'Cummins', hospital_town: 'Cummins', dispatch: '18:40', response: '12', transport: '15' } }
  };

  var str = function (x) { return String(x == null ? '' : x).trim(); };
  var reEsc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  var word = function (w) { return new RegExp('(^|[^\\w-])' + reEsc(w) + '(?![\\w-])', 'g'); };
  // Swap a word, keeping its case: Wife > Husband, wife > husband, WIFE > HUSBAND
  function swapWord(s, from, to) {
    if (!from || !to || from === to) return s;
    var low = from.toLowerCase(), cap = from.charAt(0).toUpperCase() + from.slice(1);
    var toCap = to.charAt(0).toUpperCase() + to.slice(1);
    return s.replace(word(from.toUpperCase()), '$1' + to.toUpperCase()).replace(word(cap), '$1' + toCap).replace(word(low), '$1' + to.toLowerCase());
  }
  var mins = function (t) { var m = String(t || '').match(/^(\d{1,2}):?(\d{2})$/); return m ? +m[1] * 60 + +m[2] : null; };
  var hhmm = function (n) { n = ((n % 1440) + 1440) % 1440; return ('0' + Math.floor(n / 60)).slice(-2) + ('0' + n % 60).slice(-2); };
  // A 24-hour time written as 4 digits, not part of a longer number and not a dose ("1000 mg", "1200 microg")
  var TIME = /(^|[^\d.:\/])([01]\d|2[0-3])([0-5]\d)(?!\d|\.\d)(?!\s?(?:microg|mcg|mg|mL|ml|g|kg|L|units|IU)\b)/g;

  function build(slug, given) {
    var M = MAP[slug], src = M && window.PCR_JOBS && window.PCR_JOBS[M.job]; if (!src) return null;
    var d = M.defaults, v = {};
    Object.keys(d).forEach(function (k) { v[k] = d[k]; });
    Object.keys(given).forEach(function (k) { if (str(given[k]) !== '') v[k] = str(given[k]); });

    // Time shift: an hour or more before the page stays put; up to arrival moves with the page time; on scene also with the drive out; after leaving for
    // hospital (handover time minus the drive to hospital) also with the drive to hospital.
    var n = function (k) { return +v[k] - +d[k] || 0; };
    var disp0 = mins(d.dispatch), dD = disp0 != null && mins(v.dispatch) != null ? mins(v.dispatch) - disp0 : 0;
    var dR = n('response'), dT = n('transport'), resp0 = +d.response || 0;
    var hand = (src.drugs || []).filter(function (r) { return /Handover .*(ED|Hosp)/.test(r[1] || ''); })[0];
    var depart0 = hand && +d.transport ? mins(hand[0]) - +d.transport : null;
    function shiftTime(t) {
      var how = M.times && M.times[hhmm(t)];
      if (how === 'page') return t + dD;
      if (how === 'scene') return t + dD + dR;
      if (disp0 == null) return t + dR + dT;
      var rel = ((t - disp0) % 1440 + 1440) % 1440; if (rel > 720) rel -= 1440;
      if (rel < -60) return t;   // the history ("seeding since 0600") stays as it is, as in the customised walk-through
      if (rel < resp0) return t + dD;
      if (depart0 != null && rel >= ((depart0 - disp0) % 1440 + 1440) % 1440) return t + dD + dR + dT;
      return t + dD + dR;
    }

    var hospNew = str(v[M.hospKey]), hospFull = '', hospShort = '';
    if (hospNew) {
      if (M.hospKey === 'hospital') { hospFull = hospNew; hospShort = hospNew.replace(/\s*(District\s+)?Hospital$/i, '') || hospNew; }
      else { hospShort = hospNew.replace(/\s*Hospital$/i, ''); hospFull = hospShort + ' Hospital'; }
    }
    var age0 = str(d.age), age1 = str(v.age);
    function text(s, noTimes) {
      // Hospital first, kept aside so a change of scene town doesn't touch it
      if (M.hosp && hospNew) {
        var h = reEsc(M.hosp);
        s = s.replace(new RegExp('\\b' + h + '(?: District)? Hospital\\b', 'g'), '\u0001')
             .replace(new RegExp('\\b' + h + ' (Hosp|ED)\\b', 'g'), '\u0002$1');
        (M.hospText || []).forEach(function (t) { s = s.split(t).join(t.replace(M.hosp, '\u0003')); });
      }
      if (d.backup_from && v.backup_from !== d.backup_from) s = s.replace(new RegExp('\\b' + reEsc(d.backup_from) + ' (paramedic)', 'g'), v.backup_from + ' $1');
      if (d.backup_mins && v.backup_mins !== d.backup_mins) s = s.replace(new RegExp('\\b(paramedics? )' + d.backup_mins + ' min', 'g'), '$1' + v.backup_mins + ' min');
      if (d.town && v.town !== d.town) s = s.replace(word(d.town), '$1' + v.town);
      if (M.road && v.road !== d.road) s = s.replace(word(M.road), '$1' + str(v.road).replace(/\bHighway\b/, 'Hwy'));
      s = s.replace(/\u0001/g, hospFull).replace(/\u0002(Hosp|ED)/g, hospShort + ' $1').replace(/\u0003/g, hospShort);
      s = swapWord(s, d.patient, v.patient);
      if (d.partner_name) s = swapWord(s, d.partner_name, v.partner_name);
      if (d.partner) s = swapWord(s, d.partner, v.partner);
      if (age1 && age1 !== age0) s = s.replace(new RegExp('\\b' + age0 + '(?=\\s?(?:[MF]\\b|y\\b|yo\\b|-?year))', 'g'), age1);
      if ((dD || dR || dT) && !noTimes) s = s.replace(TIME, function (_, pre, h, m) { return pre + hhmm(shiftTime(+h * 60 + +m)); });
      return s;
    }
    function walk(x) {
      if (typeof x === 'string') return text(x);
      if (Array.isArray(x)) return x.map(walk);
      if (x && typeof x === 'object') { var o = {}; Object.keys(x).forEach(function (k) { o[k] = walk(x[k]); }); return o; }
      return x;
    }
    var job = walk(src);
    // Drug table rows are [time, treatment, dose, route]: only the first cell is a time ("1000" in the dose cell is mg)
    job.drugs = (src.drugs || []).map(function (r) { return r.map(function (x, i) { return typeof x === 'string' ? text(x, i > 0) : x; }); });
    job.label = src.label.replace(d.patient, v.patient).replace(', ' + age0 + ':', ', ' + (age1 || age0) + ':') + ' (customised)';
    job.short = v.patient;
    job.customised = true;
    return job;
  }

  window.PCR_CUSTOM = { slugs: Object.keys(MAP), build: build, map: MAP };
})();
