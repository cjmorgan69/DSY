// Snake bite case night: builds the slide sections from the envenomation microlearning module (EN_ML) and Greg's
// walk-through (EN_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT
// screenshot captions, the "Tonight" and "Next week" slides and the short presenter cues below are DSY-written (owner
// to review). Same layout as /classroom/acpo/data/build.js. Both files have an Ambulance Responder version; the deck
// shows the AO version (items marked scope "ar" are left out), with one AR slide at the end of the protocol part.
(function () {
  var ML = window.EN_ML, WT = window.EN_WT;
  if (!ML || !WT) return;
  // Keep the AO version: drop scope "ar" items, unwrap { scope: "ao", text } strings, drop the ar keys.
  function ao(o) {
    if (Array.isArray(o)) return o.filter(function (x) { return !(x && typeof x === 'object' && x.scope === 'ar'); }).map(function (x) {
      if (x && typeof x === 'object' && !Array.isArray(x) && x.scope && Object.keys(x).every(function (k) { return k === 'text' || k === 'scope'; })) return x.text;
      return ao(x);
    });
    if (o && typeof o === 'object') { var r = {}; Object.keys(o).forEach(function (k) { if (k !== 'ar') r[k] = ao(o[k]); }); return r; }
    return o;
  }
  var AR = { ml: ML.ar, wt: WT.ar };
  ML = ao(ML); WT = ao(WT);
  var DSY = 'Slide order and presenter cues are DSY-written for review. The clinical content comes from the module and the walk-through.';

  function panelIn(M, title) {
    for (var i = 0; i < M.panels.length; i++) if (M.panels[i].title === title) return M.panels[i];
    return { blocks: [] };
  }
  function panel(title) { return panelIn(WT, title); }
  function boxIn(p, title) {
    var b = p.blocks.filter(function (x) { return x.box && x.box.title === title; })[0];
    return b ? b.box : null;
  }
  function step(t) { return t.text ? { h: t.t, t: t.text } : t.t; }
  function split(x) { var k = x.indexOf(': '); return k > 0 ? { h: x.slice(0, k), t: x.slice(k + 2) } : { h: x }; }
  function yt(src) { var m = /embed\/([\w-]+)/.exec(src || ''); return m ? m[1] : ''; }
  function tableSlide(tb, extra) {
    var t = tb.table, s = { type: 'table', title: tb.title, noStep: true, fs: 50 };
    if (t.rows.length === 1 && t.head.length > 4) { s.head = ['Observation', 'Value']; s.rows = t.head.map(function (h, i) { return [h, t.rows[0][i]]; }); s.fs = 46; }
    else { s.head = t.head; s.rows = t.rows; }
    for (var k in extra) s[k] = extra[k];
    return s;
  }
  function boxSlide(bx, kicker) {
    var notes = { time: 1 };
    if (bx.check) { notes.ask = [bx.check.q]; notes.say = ['Answer: ' + bx.check.a]; }
    if (bx.tiles) return { type: 'cards', kicker: kicker, title: bx.title, cols: 3, items: bx.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2 } };
    if (bx.steps) return { type: 'numbered', kicker: kicker, title: bx.title, items: bx.steps.map(step), notes: notes };
    if (bx.text) return { type: 'statement', kicker: kicker, text: bx.text, sub: bx.title, notes: notes };
    return { type: 'bullets', kicker: kicker, title: bx.title, points: bx.items, notes: notes };
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the AO envenomation protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'Snake bite', subtitle: 'Case night: Greg, 52', lines: ['The protocol and the pressure bandage, the walk-through with the MDT screens, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: a brown snake bite on a hot afternoon near Wangary.'],
          tip: DSY + ' Before the night: check the projector shows the QR codes clearly and the YouTube videos play, and everyone has signed in to dsytraining.com on their phone (the PCR page asks for a sign-in). CPPRO-022 is past its review date (30 Nov 2024).' } },
      { type: 'numbered', title: 'Tonight', items: [
          'The protocol: the bite and sting types, the pressure bandage, keeping the patient still',
          'The job: Greg, 52, bitten on the calf clearing scrub. Eight break points, with the MDT screens',
          'Write the patient report card (PCR) and compare it with the model card',
          'Next week: the snake bite skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session, as for the other case nights.' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through.' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (from the module) ---------- */
  var kick = 'The protocol (' + ML.protocol.code + ')', protoSlides = [];
  ML.panels.forEach(function (p) {
    if (p.title === 'Knowledge check') return;
    p.blocks.forEach(function (b) {
      if (b.video && yt(b.video.src)) protoSlides.push({ type: 'video', title: b.video.title, youtube: { id: yt(b.video.src) },
        notes: { time: 4, say: [p.blocks[0] === b ? 'Watch the whole video, then we go through the protocol together.' : 'Watch the technique, then we look at the steps.'], tip: 'From the envenomation microlearning module (YouTube).' } });
      else if (b.text) protoSlides.push({ type: 'statement', kicker: 'In short', text: b.text, notes: { time: 1 } });
      else if (b.box) protoSlides.push(boxSlide(b.box, p.title === 'Pressure bandaging' || p.title === 'Immobilisation and equipment' ? 'CPPRO-022' : kick));
      else if (b.checklist) protoSlides.push({ type: 'numbered', kicker: 'CPPRO-022', title: 'The pressure bandage, step by step', items: b.checklist.items.map(step), notes: { time: 3, activity: 'Ask one person to talk the room through the steps while another mimes them on their own arm.' } });
      else if (b.note) protoSlides.push({ type: 'statement', kicker: 'CPPRO-022', text: b.note, notes: { time: 1 } });
      else if (b.chooser) b.chooser.options.forEach(function (o) {
        var secs = b.chooser.data[o.value].sections;
        protoSlides.push({ type: 'bullets', kicker: kick, title: o.label, points: [].concat.apply([], secs.map(function (s) { return [s.title.replace(/^.*: /, '').replace(/^./, function (c) { return c.toUpperCase(); }) + ':'].concat(s.items); })), notes: { time: 2, ask: ['Before the slide fills: what do you do for this one?'] } });
      });
    });
  });
  var general = boxIn(prebrief, 'General teaching (not in the protocol)');
  if (general) protoSlides.push({ type: 'bullets', kicker: 'Background', title: general.title, points: general.items, notes: { time: 2 } });
  if (AR.ml) protoSlides.push({ type: 'bullets', kicker: 'Ambulance Responders (' + AR.ml.protocol.code + ')', title: 'If you are an AR', points: [
      'The first aid is the same, including the pressure bandage (CPPRO-022 applies to ARs)',
      'Before transport: consult the EOC Clinician, who may advise transport and cancel clinical support, transport and RV with clinical support en route, or monitor until clinical support arrives',
      'Redback: also request clinical support. Redback and bee, wasp or ant: transport if the EOC Clinician directs'],
    notes: { time: 1, tip: 'From CPP-030-AR. The module and the walk-through both have an AR version (AO / AR switch at the top).' } });
  DRIVE_SECTIONS.push({ id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers', slides: protoSlides });

  /* ---------- Part 3: The job (walk-through break points, MDT screenshots) ---------- */
  var order = WT.panels.map(function (p) { return p.title; });
  var jobPanels = order.slice(order.indexOf('Dispatch and en route'), order.indexOf('Handover') + 1);
  // MDT screenshots (img/mdt-*.png, taken by /classroom/case-night/tools/mdt-shots.js envenomation with the walk-through's times).
  function shot(n, title, points, say) {
    return { type: 'image', kicker: 'The MDT', title: title, img: 'img/mdt-' + n + '.png', alt: 'MDT screen: ' + title, points: points, fs: 48, wide: true,
      notes: { time: 1, say: say ? [say] : [], tip: 'Screenshot of the DSY MDT simulator (fictional data). Students can drill the same job later from Learn on your own.' } };
  }
  var mdtAt = {
    dispatch: [
      shot('1-dispatch', '1432: the job arrives', ['Priority 2, snake bite, Wangary', 'Tap Ack'], 'What does the MDT tell you before you even leave the station?'),
      shot('2-enroute', '1433: Enroute', ['F6 sends ENROUTE (no confirm)', 'The status bar shows what the EOC sees', 'The F6 button now offers Time Scene'], ''),
      shot('3-remarks', 'The remarks keep coming', ['1438: still conscious, sitting on the back verandah', '1447: dog now penned, snake not sighted since', 'Newest at the top: check the REMARKS tab on the way'], '"Ambulant" on the MDT: does he keep walking?')
    ],
    arrival: [shot('4-confirm-scene', '1457: Time Scene', ['F6, then Confirm', 'Press it when you arrive, not when you reach the patient'], '')],
    mobile: [
      shot('6-destination', '1530: Mobile, pick the hospital', ['F6 opens the destination list', 'Closest puts Port Lincoln Hospital first', 'About 30 minutes to Port Lincoln'], ''),
      shot('7-confirm-mobile', 'Confirm the destination', ['Check it is the hospital the EOC Clinician agreed', 'Then Confirm'], '')
    ],
    arrive: [shot('8-arrive-dest', '1605: Arrive Dest', ['F6 sends ARRIVE DEST. (no confirm)', 'Status bar: arrived at Port Lincoln Hospital'], '')],
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
        job.push({ type: 'cards', kicker: title, title: b.box.title, cols: 3, items: b.box.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2, activity: 'Pairs bandage each other\'s leg now, toes to groin, while the slide is up.' } });
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
        job.push({ type: 'prompts', kicker: 'Break point ' + nBP + ' of ' + totalBP + ' · ' + bp.type, title: bp.title, prompts: bp.prompts,
          notes: { time: 4, listen: bp.expected, teach: bp.teaching, real: bp.realJob, tip: tip } });
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
    notes: { time: 1, tip: 'DSY-written (the walk-through has no safety brief box). Have training bandages out for the treatment break point.' } });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: Greg, 52', audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Greg\'s patient report card', url: '/tools/pcr/#job=greg',
        text: 'Scan the code and write the card for the job you just ran.',
        points: ['Tap any underlined heading to see what goes there', 'The bite time, how far he walked and the first aid given', 'The washed bite and the bandage still on'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in. ARs can use the AR version of the job (gregAR).' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=greg', button: 'Open Greg\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['Is the timeline there: bite, walking, bandage, consults?', 'The obs trend: HR 92, 104, 108', 'Did the Recommendation box say the bite was washed?'],
        notes: { time: 5, tip: 'The model card is DSY-written (owner to review).' } },
      { type: 'bullets', kicker: 'Debrief', title: reflect.title, points: reflect.items, notes: { time: 6, say: ['Pick three or four of these. Let the crew answer first.'] } },
      { type: 'bullets', kicker: 'Debrief', title: take.title, points: take.items, notes: { time: 2 } },
      { type: 'cards', kicker: 'If you have time', title: 'Scenario variations', cols: vars.blocks.length > 4 ? 3 : 2,
        items: vars.blocks.map(function (b) { return { h: b.box.title }; }),
        notes: { time: 1, say: vars.blocks.map(function (b) { return b.box.title + ': ' + b.box.text; }), tip: 'Run one variation as a quick talk-through if time allows.' } }
    ]
  });

  /* ---------- Part 5: Next week ---------- */
  DRIVE_SECTIONS.push({
    id: 'next', name: 'Part 5', title: 'Next week', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'Next week', title: 'Snake bite skills stations', url: '/stations/envenomation/',
        text: 'Hands-on practice of tonight\'s job. The team can run the stations without the instructor.',
        points: ['1 Which bite, which pathway?', '2 The pressure bandage', '3 Keep them still: splint, mattress and the move', '4 Watch, call and hand over'],
        notes: { time: 1, tip: 'Facilitators: the instructor setup sheet and print pack are on the stations page (#setup, #print).' } },
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/envenomation/',
        text: 'The envenomation module: the bite and sting types, the pressure bandage and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Greg\'s walk-through and the MDT drill'],
        notes: { time: 1 } },
      { type: 'qr', kicker: 'Before you go', title: 'Tell us what you thought', url: '/feedback/?t=envenomation&from=slides',
        text: 'Two minutes on your phone. Your name is optional.',
        points: ['Rate the night overall', 'Tick the parts you want to comment on: slides, walk-through, MDT, PCR trainer, microlearning', 'What worked, and what should we change'],
        notes: { time: 2, tip: 'Leave this up while people pack up. Facilitators can read the replies on Run a session (Feedback).' } }
    ]
  });
})();
