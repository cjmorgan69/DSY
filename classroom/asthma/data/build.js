// Asthma case night: builds the slide sections from the asthma microlearning module (AS_ML) and Karen's walk-through
// (AS_WT). Clinical wording all comes from those two files. The slide order, section titles, MDT screenshot captions,
// the "Tonight" and "Next week" slides and the short presenter cues below are DSY-written (owner to review).
// Same layout as /classroom/chest-pain/ and /classroom/acpo/ (see /classroom/case-night/README.md).
(function () {
  var ML = window.AS_ML, WT = window.AS_WT;
  if (!ML || !WT) return;
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
    var t = tb.table, s = { type: 'table', title: tb.title, noStep: true, fs: 44 };
    if (t.rows.length === 1 && t.head.length > 4) { s.head = ['Observation', 'Value']; s.rows = t.head.map(function (h, i) { return [h, t.rows[0][i]]; }); s.fs = 46; }
    else { s.head = t.head; s.rows = t.rows; }
    for (var k in extra) s[k] = extra[k];
    return s;
  }

  /* ---------- Part 1: Welcome ---------- */
  var overview = panel('Overview'), prebrief = panel('Pre-brief: the AO asthma protocol');
  var objectives = boxIn(overview, 'Learning objectives'), roles = boxIn(overview, 'Crew roles');
  DRIVE_SECTIONS.push({
    id: 'welcome', name: 'Part 1', title: 'Welcome', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'title', title: 'Asthma', subtitle: 'Case night: Karen, 45', lines: ['The intro video, the walk-through with the MDT screens, then the PCR', WT.protocol.code + ' ' + WT.protocol.name + ' ' + WT.protocol.version],
        notes: { time: 2, say: ['Welcome. Tonight is one job from start to finish: the video, the walk-through with the MDT screens, then the patient report card.'],
          tip: DSY + ' Before the night: check the video plays with sound, the projector shows the QR codes clearly, and everyone has signed in to dsytraining.com on their phone (the PCR page asks for a sign-in).' } },
      { type: 'numbered', title: 'Tonight', items: [
          'Intro video and the protocol key points',
          'The job: Karen, 45, more severe asthma at 2 am. Eight break points, with the MDT screens along the way',
          'Write the patient report card (PCR) and compare it with the model card',
          'Next week: the asthma skills stations'],
        notes: { time: 1, tip: 'DSY-written overview. The skills stations are a separate session, as for the chest pain night.' } },
      { type: 'bullets', title: objectives.title, points: objectives.items, notes: { time: 2, tip: 'Learning objectives from the walk-through.' } },
      { type: 'cards', title: roles.title, cols: 2, items: roles.items.map(split), notes: { time: 1, say: ['Pick a Clinician and a Driver for the night, or swap at each break point.'] } }
    ]
  });

  /* ---------- Part 2: The protocol (video and key points) ---------- */
  var kp = ML.keyPoints.map(function (k) {
    var s, notes = { time: 1 }, kick = 'Key points (' + ML.protocol.code + ')';
    if (k.check) { notes.ask = [k.check.q]; notes.say = ['Answer: ' + k.check.a]; }
    if (k.tiles) s = { type: 'cards', title: k.title, cols: 4, items: k.steps.map(function (x) { return { h: x.t, t: x.text }; }) };
    else if (k.steps) s = { type: 'numbered', title: k.title, items: k.steps.map(step) };
    else if (k.items) s = { type: 'bullets', title: k.title, points: k.items };
    else s = { type: 'statement', text: k.text };
    if (k.note) { if (s.type === 'bullets') s.callout = { head: 'Note', text: k.note }; else notes.tip = 'Note: ' + k.note; }
    s.kicker = kick; s.notes = notes;
    return s;
  });
  var ctl = prebrief.blocks.filter(function (b) { return b.table; })[0];
  var reminders = boxIn(prebrief, 'Key reminders from the protocol'), general = boxIn(prebrief, 'General teaching (not in the protocol)');
  DRIVE_SECTIONS.push({
    id: 'protocol', name: 'Part 2', title: 'The protocol', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'mp4', title: ML.video.title, length: '3 min', src: '/microlearning/asthma/' + ML.video.src, poster: '/microlearning/asthma/' + ML.video.poster,
        notes: { time: 4, say: ['Watch the whole video, then we go through the key points together.'], tip: 'The narrated intro video from the asthma microlearning module.' } }
    ].concat(kp).concat([
      tableSlide(ctl.table, { kicker: 'Pre-brief', fs: 28, notes: { time: 2, say: [ctl.table.text || ''].filter(Boolean), ask: ['Which row is Karen likely to be in, from the MDT alone?'] } }),
      { type: 'bullets', kicker: 'Pre-brief (' + WT.protocol.code + ')', title: reminders.title, points: reminders.items, notes: { time: 1 } },
      { type: 'bullets', kicker: 'Background', title: general.title, points: general.items, notes: { time: 1 } }
    ])
  });

  /* ---------- Part 3: The job (walk-through break points, MDT screenshots) ---------- */
  var order = WT.panels.map(function (p) { return p.title; });
  var jobPanels = order.slice(order.indexOf('Dispatch and en route'), order.indexOf('Handover') + 1);
  // MDT screenshots (img/mdt-*.png, taken by /classroom/case-night/tools/mdt-shots.js asthma with the walk-through's times).
  function shot(n, title, points, say) {
    return { type: 'image', kicker: 'The MDT', title: title, img: 'img/mdt-' + n + '.png', alt: 'MDT screen: ' + title, points: points, fs: 38, wide: true,
      notes: { time: 1, say: say ? [say] : [], tip: 'Screenshot of the DSY MDT simulator (fictional data). Students can drill the same job later from Learn on your own.' } };
  }
  var mdtAt = {
    dispatch: [
      shot('1-dispatch', '0215: the job arrives', ['Priority 2, breathing problems, homestead north of Cummins', 'Tap Ack'], 'What does the MDT tell you before you even leave home?'),
      shot('2-enroute', '0216: Enroute', ['F6 sends ENROUTE (no confirm)', 'The status bar shows what the EOC sees', 'The F6 button now offers Time Scene'], ''),
      shot('3-remarks', 'The remarks keep coming', ['0218: husband says she is using her puffer again, no better', '0223: husband will meet you at the door, porch light on', 'Newest at the top: check the REMARKS tab on the way'], 'Her puffer still isn\'t working. What does that add to your plan?')
    ],
    arrival: [shot('4-confirm-scene', '0227: Time Scene', ['F6, then Confirm', 'Press it when you arrive, not when you reach the patient'], '')],
    mobile: [
      shot('6-destination', '0255: Mobile, pick the hospital', ['F6 opens the destination list', 'Closest puts Cummins Hospital first', 'About 30 minutes to Cummins'], ''),
      shot('7-confirm-mobile', 'Confirm the destination', ['Check it is the hospital the EOC Clinician agreed', 'Then Confirm'], '')
    ],
    arrive: [shot('8-arrive-dest', '0325: Arrive Dest', ['F6 sends ARRIVE DEST. (no confirm)', 'Status bar: arrived at Cummins Hospital'], '')],
    clear: [shot('9-clear', 'After handover: Clear', ['F6, then Confirm', 'Tick Direct Admission to Ward only if that is where she went'], '')]
  };
  var nBP = 0, totalBP = 0;
  jobPanels.forEach(function (t) { panel(t).blocks.forEach(function (b) { if (b.breakpoint) totalBP++; }); });

  var job = [{ type: 'bullets', title: 'Before we start', points: ['This is a walk-through: we pause at each break point to talk it through', 'Vote on each decision before the answer shows', 'Anyone can call "real world" to stop for a genuine safety concern'],
    notes: { time: 1, tip: 'DSY-written (the asthma walk-through has no safety brief box).' } }];
  jobPanels.forEach(function (title, pi) {
    var p = panel(title), first = job.length;
    p.blocks.forEach(function (b) {
      if (b.text) {
        job.push({ type: 'statement', kicker: b.muted ? 'In the scenario' : title, text: b.text, notes: { time: 1 } });
      } else if (b.box && b.box.tiles) {
        job.push({ type: 'cards', kicker: title, title: b.box.title, cols: 3, items: b.box.steps.map(function (x) { return { h: x.t, t: x.text }; }), notes: { time: 2 } });
      } else if (b.box && b.box.text) {
        job.push({ type: 'statement', kicker: b.box.title, text: b.box.text, notes: { time: 2 } });
      } else if (b.box && b.box.steps) {
        job.push({ type: 'numbered', kicker: title, title: b.box.title, items: b.box.steps.map(step), notes: { time: 1 } });
      } else if (b.box) {
        var call = /EOC Clinician/.test(b.box.title);
        job.push({ type: 'bullets', kicker: title, title: b.box.title, points: b.box.items,
          notes: call ? { time: 3, activity: 'In pairs: one makes the call, the other plays the EOC Clinician and repeats the advice back. Swap.', tip: 'The EOC Clinician replies are written by DSY for the scenario.' } : { time: 1 } });
        if (b.box.title === 'MDT display') job = job.concat(mdtAt.dispatch);
      } else if (b.steps) {
        job.push({ type: 'numbered', kicker: title, title: 'What the crew does', items: b.steps.map(step), notes: { time: 1 } });
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
    if (pi === 1) job.splice(first, 0, mdtAt.arrival[0]);
    if (/^Extrication/.test(title)) job = job.concat(mdtAt.mobile);
    if (title === 'Handover') { job.splice(first, 0, mdtAt.arrive[0]); job = job.concat(mdtAt.clear); }
  });
  DRIVE_SECTIONS.push({ id: 'job', name: 'Part 3', title: 'The job: ' + WT.headline.split(':')[0], audience: 'Volunteer Ambulance Officers', slides: job });

  /* ---------- Part 4: The PCR and the debrief ---------- */
  var debrief = panel('Debrief'), vars = panel('Scenario variations');
  var reflect = boxIn(debrief, 'Reflective questions'), take = boxIn(debrief, 'Take-home messages');
  DRIVE_SECTIONS.push({
    id: 'pcr', name: 'Part 4', title: 'The PCR and the debrief', audience: 'Volunteer Ambulance Officers',
    slides: [
      { type: 'qr', kicker: 'PCR trainer', title: 'Write Karen\'s patient report card', url: '/tools/pcr/#job=karen',
        text: 'Scan the code and write the card for the job you just ran.',
        points: ['Tap any underlined heading to see what goes there', 'Write the normal findings too', 'Every neb and puff with its dose and time, and the severity you judged'],
        notes: { time: 10, say: ['On your own or in your crew pairs. About 10 minutes.'], tip: 'The work saves on each phone. Students need to be signed in.' } },
      { type: 'qr', kicker: 'PCR trainer', title: 'Compare with the model card', url: '/tools/pcr/#job=karen', button: 'Open Karen\'s card on the big screen',
        text: 'On the big screen, tap "Show model card" and go through it together.',
        points: ['What did you leave out?', 'Are her own Ventolin doses there too?', 'Did you show the trend: speech, RR and SpO2?'],
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
      { type: 'qr', kicker: 'Next week', title: 'Asthma skills stations', url: '/stations/asthma/',
        text: 'Hands-on practice of what came up tonight. The team can run the stations without the instructor.',
        points: ['1 Anaphylaxis first, then how bad is it?', '2 Salbutamol by puffer and spacer', '3 The nebuliser', '4 Life threatening: oxygen and the bag-valve-mask'],
        notes: { time: 1, tip: 'Facilitators: the instructor setup sheet and print pack are on the stations page (#setup, #print).' } },
      { type: 'qr', kicker: 'Before next week', title: 'Revise on your own', url: '/microlearning/asthma/',
        text: 'The asthma module: the video again, the asthma checker and the knowledge check.',
        points: ['Learn on your own on dsytraining.com also has Karen\'s walk-through and the MDT drill'],
        notes: { time: 1 } },
      { type: 'qr', kicker: 'Before you go', title: 'Tell us what you thought', url: '/feedback/?t=asthma&from=slides',
        text: 'Two minutes on your phone. Your name is optional.',
        points: ['Rate the night overall', 'Tick the parts you want to comment on: slides, walk-through, MDT, PCR trainer, microlearning', 'What worked, and what should we change'],
        notes: { time: 2, tip: 'Leave this up while people pack up. Facilitators can read the replies on Run a session (Feedback).' } }
    ]
  });
})();
