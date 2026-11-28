// Amputation and haemorrhage case night: builds the slide sections from the amputation microlearning module (AM_ML) and
// Tom's walk-through (AM_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT screenshot captions,
// the "Tonight" and "Next week" slides and the short presenter cues below are DSY-written (owner to review). Same layout
// as /classroom/asthma/data/build.js. Both files have an Ambulance Responder version; the deck shows the AO version
// (items marked scope "ar" are left out), with one AR slide at the end of the protocol part.
(function () {
  var ML = window.AM_ML, WT = window.AM_WT;
  if (!ML || !WT) return;
  function ao(o) {
    if (Array.isArray(o)) return o.filter(function (x) { return !(x && typeof x === 'object' && x.scope === 'ar'); }).map(function (x) {
      if (x && typeof x === 'object' && !Array.isArray(x) && x.scope && Object.keys(x).every(function (k) { return k === 'text' || k === 'scope'; })) return x.text;
      return ao(x);
    });
    if (o && typeof o === 'object') { var r = {}; Object.keys(o).forEach(function (k) { if (k !== 'ar') r[k] = ao(o[k]); }); return r; }
    return o;
  }
  var AR = ML.ar;
  ML = ao(ML); WT = ao(WT);
  var DSY = 'Slide order and presenter cues are DSY-written for review. The clinical content comes from the module and the walk-through.';

  function panel(title) {
    for (var i = 0; i < WT.panels.length; i++) if (WT.panels[i].title === title) return WT.panels[i];
    return { blocks: [] };
  }
  function boxIn(p, title) {
    var b = p.blocks.filter(function (x) { return x.box && x.box.title === title; })[0];
    return b ? b.box : null;
  }
  function step(t) { return t.text ? { h: t.t, t: t.text } : t.t; }
  function split(x) { var k = x.indexOf(': '); return k > 0 ? { h: x.slice(0, k), t: x.slice(k + 2) } : { h: x }; }
  function tableSlide(tb, extra) {
    var t = tb.table, s = { type: 'table', title: tb.title, noStep: true, fs: 50 };
    if (t.rows.length === 1 && t.head.length > 4) { s.head = ['Observation', 'Value']; s.rows = t.head.map(function (h, i) { return [h, t.rows[0][i]]; }); s.fs = 46; }
    else { s.head = t.head; s.rows = t.rows; }
    for (var k in extra) s[k] = extra[k];
    return s;
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the amputation and haemorrhage protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'Amputation and haemorrhage', subtitle: 'Case night: Tom, 46', lines: ['The intro video, the walk-through with the MDT screens, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: a hand caught in a grain auger at harvest, bleeding that pressure does not stop, and two fingers to look after.'],
          tip: DSY + ' Before the night: check the video plays with sound, the projector shows the QR codes clearly, and everyone has signed in to dsytraining.com on their phone (the PCR page asks for a sign-in). Ambulance Responders can follow the AR version of the walk-through on their phones.' } },
      { type: 'numbered', title: 'Tonight', items: [
          'Intro video and the protocol key points',
          'The job: Tom, 46, a grain auger injury north of Kimba. Eight break points, with the MDT screens along the way',
          'Write the patient report card (PCR) and compare it with the model card',
          'Next week: the amputation and haemorrhage skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session, as for the other case nights.' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through (AO version).' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (video and key points) ---------- */
  var kp = ML.keyPoints.map(function (k) {
    var s, notes = { time: 1 }, kick = 'Key points (' + ML.protocol.code + ')';
    if (k.check) { notes.ask = [k.check.q]; notes.say = ['Answer: ' + k.check.a]; }
    if (k.tiles) s = { type: 'cards', title: k.title, cols: 3, items: k.steps.map(function (x) { return { h: x.t, t: x.text }; }) };
    else if (k.steps) s = { type: 'numbered', title: k.title, items: k.steps.map(step) };
    else if (k.items) s = { type: 'bullets', title: k.title, points: k.items };
    else s = { type: 'statement', text: k.text };
    if (k.note) { if (s.type === 'bullets') s.callout = { head: 'Note', text: k.note }; else notes.tip = 'Note: ' + k.note; }
    s.kicker = kick; s.notes = notes;
    return s;
  });
  var why = boxIn(prebrief, 'Why it matters (protocol principle)'), general = boxIn(prebrief, 'General teaching (not in the protocol)');
  var protoSlides = [
    { type: 'mp4', title: ML.video.title, length: '2 min', src: '/microlearning/amputation/' + ML.video.src, poster: '/microlearning/amputation/' + ML.video.poster,
      notes: { time: 3, say: ['Watch the whole video, then we go through the key points together.'], tip: 'The narrated intro video from the amputation and haemorrhage microlearning module.' } },
    { type: 'statement', kicker: 'In short', text: ML.intro[0], notes: { time: 1 } }
  ].concat(kp).concat([
    { type: 'bullets', kicker: 'Pre-brief (' + WT.protocol.code + ')', title: why.title, points: why.items, notes: { time: 1 } },
    { type: 'bullets', kicker: 'Background', title: general.title, points: general.items, notes: { time: 2 } }
  ]);
  if (AR) protoSlides.push({ type: 'bullets', kicker: 'Ambulance Responders (' + AR.protocol.code + ')', title: 'If you are an AR', points: [
      'The same bleeding care: direct pressure, the tourniquet as a last resort, and the amputated part in a bag in ice-cooled water',
      'Consider requesting clinical support, and pain management as per CPP-036-AR (no fentanyl at AR level)',
      'Consult the EOC Clinician regarding treatment and transport: transport and cancel clinical support, transport and RV en route, or monitoring until clinical support arrives',
      'After a tourniquet, advise the EOC Clinician, who may seek specialist advice'],
    notes: { time: 1, tip: 'From CPP-024-AR. The module and the walk-through both have an AR version (AO / AR switch at the top).' } });
  DRIVE_SECTIONS.push({ id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers', slides: protoSlides });

  /* ---------- Part 3: The job (walk-through break points, MDT screenshots) ---------- */
  var order = WT.panels.map(function (p) { return p.title; });
  var jobPanels = order.slice(order.indexOf('Dispatch and en route'), order.indexOf('Handover') + 1);
  // MDT screenshots (img/mdt-*.png, taken by /classroom/case-night/tools/mdt-shots.js amputation with the walk-through's times).
  function shot(n, title, points, say) {
    return { type: 'image', kicker: 'The MDT', title: title, img: 'img/mdt-' + n + '.png', alt: 'MDT screen: ' + title, points: points, fs: 48, wide: true,
      notes: { time: 1, say: say ? [say] : [], tip: 'Screenshot of the DSY MDT simulator (fictional data). Students can drill the same job later from Learn on your own.' } };
  }
  var mdtAt = {
    dispatch: [
      shot('1-dispatch', '1530: the job arrives', ['Priority 1, traumatic injury, near Kimba', 'Call sign KI81 (daytime)', 'Tap Ack'], 'What does the MDT tell you before you even leave the station?'),
      shot('2-enroute', '1531: Enroute', ['F6 sends ENROUTE (no confirm)', 'The status bar shows what the EOC sees', 'The F6 button now offers Time Scene'], ''),
      shot('3-remarks', 'The remarks keep coming', ['1538: patient feeling faint, wife pressing a towel on it', 'Newest at the top: check the REMARKS tab on the way'], 'Feeling faint with a towel on it. What does that tell you about the bleeding?')
    ],
    arrival: [shot('4-confirm-scene', '1545: Time Scene', ['F6, then Confirm', 'Press it when you arrive, not when you reach the patient'], '')],
    mobile: [
      shot('6-destination', '1602: Mobile, pick the hospital', ['F6 opens the destination list', 'Closest puts Kimba Hospital first', 'About 20 minutes to Kimba, as the EOC Clinician advised'], ''),
      shot('7-confirm-mobile', 'Confirm the destination', ['Check it is the hospital the EOC Clinician advised', 'Then Confirm'], '')
    ],
    arrive: [shot('8-arrive-dest', '1622: Arrive Dest', ['F6 sends ARRIVE DEST. (no confirm)', 'Status bar: arrived at Kimba Hospital'], '')],
    clear: [shot('9-clear', 'After handover: Clear', ['F6, then Confirm', 'Tick Direct Admission to Ward only if that is where he went'], '')]
  };
  var nBP = 0, totalBP = 0;
  jobPanels.forEach(function (t) { panel(t).blocks.forEach(function (b) { if (b.breakpoint) totalBP++; }); });

  var job = [];
  jobPanels.forEach(function (title, pi) {
    var p = panel(title), first = job.length;
    p.blocks.forEach(function (b) {
      if (b.text) {
        job.push({ type: 'statement', kicker: b.muted ? 'In the scenario' : title, text: b.text, notes: b.muted && /EOC Clinician/.test(b.text) ? { time: 1, tip: 'The EOC Clinician replies are written by DSY for the scenario.' } : { time: 1 } });
      } else if (b.box && b.box.tiles) {
        job.push({ type: 'cards', kicker: title, title: b.box.title, cols: 3, items: b.box.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2, activity: 'Pass a training SOF tourniquet round while the slide is up: buckle, strap, windlass, lock (training limb only, never on a person).' } });
      } else if (b.box && b.box.text) {
        job.push({ type: 'statement', kicker: b.box.title, text: b.box.text, notes: { time: 2 } });
      } else if (b.box) {
        job.push({ type: 'bullets', kicker: title, title: b.box.title, points: b.box.items, notes: { time: 1 } });
        if (b.box.title === 'MDT display') job = job.concat(mdtAt.dispatch);
      } else if (b.table) {
        job.push(tableSlide(b.table, { kicker: title, notes: { time: 1 } }));
      } else if (b.breakpoint) {
        var bp = b.breakpoint; nBP++;
        var tip = [bp.teachingNote, (bp.cards || []).map(function (c) { return 'Quick question: ' + c.q + ' (' + c.a + ')'; }).join(' ')].filter(Boolean).join(' ');
        var n = { time: 4, listen: bp.expected, teach: bp.teaching, real: bp.realJob, tip: tip };
        if (bp.title === 'Pain relief and the consult') n.activity = 'In pairs: one makes the call, the other plays the EOC Clinician and repeats the advice back. Swap.';
        job.push({ type: 'prompts', kicker: 'Break point ' + nBP + ' of ' + totalBP + ' · ' + bp.type, title: bp.title, prompts: bp.prompts, notes: n });
        (bp.decisions || []).forEach(function (d) {
          job.push({ type: 'decision', kicker: 'Decision · break point ' + nBP, q: d.q, options: d.options, answer: d.answer, why: d.why,
            notes: { time: 1, say: ['Everyone picks A, B or C (hands up or fingers). Then click to show the answer.'] } });
        });
      }
    });
    if (pi === 1) job.splice(first, 0, mdtAt.arrival[0]);                 // the panel after dispatch: arrival
    if (/^Extrication/.test(title)) job = job.concat(mdtAt.mobile);
    if (title === 'Handover') { job.splice(first, 0, mdtAt.arrive[0]); job = job.concat(mdtAt.clear); }
  });
  job.unshift({ type: 'bullets', title: 'Before we start', points: ['This is a walk-through: we pause at each break point to talk it through', 'Vote on each decision before the answer shows', 'Anyone can call "real world" to stop for a genuine safety concern'],
    notes: { time: 1, tip: 'DSY-written (the walk-through has no safety brief box). Have a training SOF tourniquet and a training limb out for the tourniquet break point, and a bag and container for the fingers.' } });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: Tom, 46', audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Tom\'s patient report card', url: '/tools/pcr/#job=tom',
        text: 'Scan the code and write the card for the job you just ran.',
        points: ['Tap any underlined heading to see what goes there', 'The tourniquet: device, site and time', 'The amputated fingers: how they were packaged and who took them'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in. ARs can use the AR version of the job (tomAR).' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=tom', button: 'Open Tom\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['The tourniquet time in the first line: 1551', 'The trend: HR 128, 116, 108; BP 96/64 to 108/70', 'The pain relief and the EOC Clinician call, with times'],
        notes: { time: 5, tip: 'The model card is DSY-written (owner to review).' } },
      { type: 'bullets', kicker: 'Debrief', title: reflect.title, points: reflect.items, notes: { time: 6, say: ['Pick three or four of these. Let the crew answer first.'] } },
      { type: 'bullets', kicker: 'Debrief', title: take.title, points: take.items, notes: { time: 2 } },
      { type: 'cards', kicker: 'If you have time', title: 'Scenario variations', cols: 2,
        items: vars.blocks.map(function (b) { return { h: b.box.title }; }),
        notes: { time: 1, say: vars.blocks.map(function (b) { return b.box.title + ': ' + b.box.text; }), tip: 'Run one variation as a quick talk-through if time allows.' } }
    ]
  });

  /* ---------- Part 5: Next week ---------- */
  DRIVE_SECTIONS.push({
    id: 'next', name: 'Part 5', title: 'Next week', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'Next week', title: 'Amputation and haemorrhage skills stations', url: '/stations/amputation/',
        text: 'Hands-on practice of tonight\'s job. The team can run the stations without the instructor.',
        points: ['1 Direct pressure and elevation', '2 The SOF tourniquet', '3 The amputated part', '4 Pain, the call and the handover'],
        notes: { time: 1, tip: 'Facilitators: the instructor setup sheet and print pack are on the stations page (#setup, #print).' } },
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/amputation/',
        text: 'The amputation and haemorrhage module: the tourniquet, the bleeding checker and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Tom\'s walk-through and the MDT drill'],
        notes: { time: 1 } },
      { type: 'qr', kicker: 'Before you go', title: 'Tell us what you thought', url: '/feedback/?t=amputation&from=slides',
        text: 'Two minutes on your phone. Your name is optional.',
        points: ['Rate the night overall', 'Tick the parts you want to comment on: slides, walk-through, MDT, PCR trainer, microlearning', 'What worked, and what should we change'],
        notes: { time: 2, tip: 'Leave this up while people pack up. Facilitators can read the replies on Run a session (Feedback).' } }
    ]
  });
})();
