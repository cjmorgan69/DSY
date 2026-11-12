/* Treatment simulator case: David, 54, bee sting anaphylaxis (AO). PROTOTYPE, 12 Nov 2026.
   The job is the walk-through /modules/anaphylaxis/ (same patient, obs, times and EOC Clinician replies).
   Sources: SAAS CPP-003-AO Anaphylaxis - AO v3.0, CPPRO-011 Intramuscular Injection v1.0 (review date June 2020 passed),
   CPPRO-008 Medication Checks v1.0, CPPRO-001, Clinical Skills Study Guide v3.2 (oxygen), and the DSY lead instructor's
   points (expired EpiPen used straight away if he looks really sick; SpO2 above 94%; Red Kit adrenaline 1000 microg in
   1 mL; non-rebreather always 15 L/min; a sitting patient shuffles across to the carry chair without standing).
   DSY-WRITTEN, FOR THE LEAD INSTRUCTOR TO REVIEW: every spoken line except the wife's arrival line and the EOC
   Clinician's two replies (those are the walk-through's), how fast the obs change (`model`), the time each action
   costs, and the debrief wording. The obs the model aims for are the walk-through's three sets.
   Voices (ElevenLabs, eleven_v4, one take each): see ../README.md. */
window.SIM_CASE = {
  id: "david",
  title: "David, 54: bee sting",
  protocol: "CPP-003-AO Anaphylaxis - AO v3.0",
  walk: "/modules/anaphylaxis/", pcr: "/tools/pcr/#job=david", module: "/microlearning/anaphylaxis/",
  audio: "audio/david/",
  start: "14:42",
  people: { d: "David", w: "David's wife", p: "Sam (your driver)", e: "EOC Clinician" },
  brief: {
    mdt: ["Priority 1, allergic reaction, difficulty breathing", "54 year old male, stung by a bee. Known bee allergy",
      "Increasing difficulty breathing. Has an EpiPen but has not used it", "Caller: wife, on scene"],
    role: "You are the clinician (AO1) on a two-person volunteer AO crew. Sam is your driver: Sam makes the calls, runs the monitor and oxygen, and checks every medicine with you. Paramedic backup is about 40 minutes away. The nearest hospital is about 25 minutes.",
    scene: "1442. His wife leads you to the back garden. David is on a garden chair, leaning forward: red blotchy skin on his arms and neck, a swollen face around the eyes and lips, working hard to breathe, with an audible wheeze. Conscious but anxious."
  },

  /* Spoken lines. `say` is the text sent to the voice (with delivery tags); `text` is the subtitle. */
  lines: {
    w_arrive:  { who: "w", text: "He was stung about 15 minutes ago. He took an antihistamine tablet but it's getting worse. His EpiPen expired last year and he never replaced it." },
    w_meds:    { who: "w", text: "No regular tablets. Just the antihistamine, after the sting." },
    w_history: { who: "w", text: "No, he's healthy. It's just the bee allergy. No asthma." },
    w_epipen:  { who: "w", text: "It expired last year. It's the only one we've got." },
    w_stinger: { who: "w", text: "I scraped the stinger out straight away." },
    w_plan:    { who: "w", text: "His action plan says use the EpiPen and call an ambulance." },
    d_what:    { who: "d", text: "Bee... got me on the arm. Can't... get my breath." },
    d_name:    { who: "d", text: "David." },
    d_feel_0:  { who: "d", text: "Throat's tight... Hard to breathe." },
    d_feel_w:  { who: "d", text: "Getting worse... I feel dizzy." },
    d_feel_1:  { who: "d", text: "Slightly better. Still tight." },
    d_feel_2:  { who: "d", text: "Much better. I can breathe again." },
    d_allergy: { who: "d", text: "Bees. Just bees." },
    d_weight:  { who: "d", text: "About... eighty-five kilos." },
    d_pain:    { who: "d", text: "No pain. Just... can't breathe." },
    d_flat:    { who: "d", text: "No... can't breathe... lying down!" },
    d_walk:    { who: "d", text: "I feel heaps better. I can walk to the ambulance." },
    p_epi_ask: { who: "p", text: "That's David's own EpiPen, and it's expired. Do you want to use it now?" },
    p_epi_done:{ who: "p", text: "EpiPen's in. Time noted." },
    p_epi_used:{ who: "p", text: "That EpiPen's already been used." },
    p_need_eoc:{ who: "p", text: "We need the EOC Clinician's advice before IM adrenaline from the Red Kit." },
    p_epi_1st: { who: "p", text: "His own auto-injector comes first." },
    p_wait5:   { who: "p", text: "The Clinician said reassess at five minutes first." },
    p_chk_ok:  { who: "p", text: "Adrenaline, 1000 micrograms in 1 mL, in date. 500 micrograms is 0.5 of a mL. Agreed." },
    p_chk_no:  { who: "p", text: "Stop. Check that again. It's 1000 micrograms in 1 mL, and the advice was 500." },
    p_im_done: { who: "p", text: "Adrenaline's in, other thigh. Time noted." },
    p_further: { who: "p", text: "Any more adrenaline has to come from the EOC Clinician." },
    p_calling: { who: "p", text: "Calling the EOC Clinician now. You're on speaker." },
    p_support: { who: "p", text: "Clinical support requested. Paramedics are about forty minutes away." },
    p_hospital:{ who: "p", text: "Hospital's notified." },
    p_o2:      { who: "p", text: "Oxygen's on. Non-rebreather, fifteen litres." },
    p_monitor: { who: "p", text: "Monitor's on." },
    p_no_walk: { who: "p", text: "No. He doesn't stand or walk." },
    p_nudge:   { who: "p", text: "He's getting worse. What about his EpiPen?" },
    p_chair:   { who: "p", text: "Carry chair's alongside. David, shuffle across. Don't stand up." },
    p_ready:   { who: "p", text: "He's on the stretcher. Ready to go when you are." },
    p_collapse:{ who: "p", text: "He's not responding!" },
    e_epi_1st: { who: "e", text: "Use his own EpiPen now, even though it's expired." },
    e_advice:  { who: "e", text: "Reassess at 5 minutes. If he isn't clearly improving, give IM adrenaline 500 micrograms from the Red Kit." },
    e_update:  { who: "e", text: "Good. Prompt transport to the nearest hospital. Notify them, and call me back if he deteriorates." }
  },

  /* How the obs move (DSY-written). Each value follows its target; `tau` is how many minutes it takes to get about
     two thirds of the way. Targets after each dose are the walk-through's obs sets. */
  model: {
    start:  { hr: 118, sbp: 92, dbp: 58, spo2: 93, rr: 28 },
    drift:  { hr: 1.5, sbp: -1.5, dbp: -1, spo2: -0.5, rr: 0.5 },      // per minute with no adrenaline
    dose1:  { hr: 108, sbp: 96, dbp: 62, spo2: 93, rr: 24 },           // walk-through 1449 (SpO2 96 on oxygen)
    dose2:  { hr: 96, sbp: 104, dbp: 68, spo2: 94, rr: 20 },           // walk-through 1455 (SpO2 97 on oxygen)
    tau: 2, oxygen: 3, flat: { rr: 4, spo2: -2 }, collapseSbp: 74, nudgeMin: 4
  },
  fixed: { temp: "36.8", bgl: "7.2", gcs: "15 (E4 V5 M6)", pupils: "Equal and reactive", ecg: "Sinus tachycardia", crt: "3 seconds" },

  /* What you see and hear at each stage: 0 no adrenaline, w = 0 and worsening, 1 after the EpiPen, 2 after the second dose. */
  findings: {
    look: { 0: "Leaning forward, working hard to breathe, audible wheeze. Red blotchy skin on his arms and neck, face swollen around the eyes and lips. Anxious, short sentences.",
            w: "Breathing harder and noisier. He is paler and struggling to answer. The swelling is no better.",
            1: "Breathing a little easier, still wheezy. Swelling and hives unchanged. Speaking in short sentences.",
            2: "Breathing much easier, full sentences. Swelling and hives unchanged." },
    airway: { 0: "Airway patent. His voice is becoming hoarse.", w: "Airway patent for now. His voice is hoarser.", 1: "Airway patent. Still hoarse, not worse.", 2: "Airway patent. Voice slightly husky, improving." },
    chest: { 0: "Wheeze on both sides, loud. Using his accessory muscles.", w: "Loud wheeze on both sides, tighter than before.", 1: "Wheeze improving, still present.", 2: "Wheeze resolving." },
    skin: { 0: "Warm and flushed. Hives on his arms and neck. Swelling around the eyes and lips.", w: "Flushed, now clammy. Hives and facial swelling.", 1: "Warm and flushed. Hives and swelling unchanged.", 2: "Warm. Hives and swelling unchanged." },
    pulse: { 0: "Radial pulse thready. Capillary refill 3 seconds.", w: "Radial pulse weak and thready.", 1: "Radial pulse a little stronger.", 2: "Radial pulse stronger." }
  },

  /* Debrief: what the protocol and the walk-through expect. `src` is shown as a tag. */
  sources: { cpp: "CPP-003-AO", c011: "CPPRO-011", c008: "CPPRO-008", lead: "Lead instructor", walk: "Walk-through", dsy: "DSY" },
  isbar: [
    ["I", "I'm [name], Ambulance Officer from [station]. This is David, 54."],
    ["S", "Anaphylaxis after a bee sting at about 1427: hypotension, bronchospasm, facial swelling and a hoarse voice."],
    ["B", "Known bee allergy. Took an oral antihistamine. His EpiPen was expired. No other history or regular medications. No known drug allergies."],
    ["A", "The obs on arrival and now, every adrenaline dose with its time, route and site, and who advised it."],
    ["R", "What still worries you (swelling, voice). The expired EpiPen has been recorded and will be reported. EOC Clinician consulted."]
  ]
};

/* ---- Actions and rules for this case. The engine (../sim.js) supplies `api`:
   S (state), vit(), stage(), say(id), info(text), note(text), flag(text, src), good(key), measure([keys]),
   confirm({title, body, yes, no}), choose({title, body, options}), end(outcome).
   `say` on an action is a list of patterns matched against what the student says out loud. ---- */
window.SIM_CASE.actions = function (api) {
  var S = api.S, C = window.SIM_CASE;
  function f(key) { return C.findings[key][api.stage()]; }
  function mins(a, b) { return Math.round((b - a) / 60); }
  function eocAsk(fn) { return fn; }

  return [
    /* ---------- Ask ---------- */
    { id: "ask_name", tab: "ask", label: "What's your name?", secs: 5, say: ["your name", "who are you", "\\bname\\b"],
      run: function () { S.done.name = 1; return api.say("d_name"); } },
    { id: "ask_what", tab: "ask", label: "What happened?", secs: 10, say: ["what happened", "what.?s (happened|going on|wrong)", "tell me what", "when (was|were|did) (he|you).*(stung|sting)", "how long ago"],
      run: function () { S.done.what = 1; return api.say("d_what"); } },
    { id: "ask_feel", tab: "ask", label: "How are you feeling now?", secs: 10, say: ["how (are|do) you feel", "how.?s (the|your) breathing", "feeling (now|any)", "any better", "how are you (going|now)"],
      run: function () { var st = api.stage(); return api.say(st === "w" ? "d_feel_w" : "d_feel_" + st); } },
    { id: "ask_allergy", tab: "ask", label: "Any allergies?", secs: 10, say: ["allerg"],
      run: function () { S.done.allergy = 1; return api.say("d_allergy"); } },
    { id: "ask_meds", tab: "ask", label: "Any medications?", secs: 10, say: ["medication", "medicine", "tablets", "\\bmeds\\b", "antihistamine", "taken anything", "take anything"],
      run: function () { S.done.meds = 1; return api.say("w_meds"); } },
    { id: "ask_history", tab: "ask", label: "Any medical history? Asthma?", secs: 10, say: ["medical (history|problems|conditions)", "past history", "asthma", "health problems", "heart (problems|trouble)"],
      run: function () { S.done.history = 1; return api.say("w_history"); } },
    { id: "ask_epipen", tab: "ask", label: "Does he have an EpiPen?", secs: 10, say: ["(have|got|has|where).*(epipen|epi pen|auto.?injector)", "(epipen|epi pen).*(expire|date|another|other|spare)"],
      run: function () { S.done.askEpi = 1; return api.say("w_epipen"); } },
    { id: "ask_plan", tab: "ask", label: "Does he have an anaphylaxis action plan?", secs: 10, say: ["action plan", "anaphylaxis plan", "\\bplan\\b"],
      run: function () { S.done.plan = 1; return api.say("w_plan"); } },
    { id: "ask_weight", tab: "ask", label: "How much do you weigh?", secs: 10, say: ["weigh", "weight", "how heavy", "kilos"],
      run: function () { S.done.weight = 1; return api.say("d_weight"); } },
    { id: "ask_stinger", tab: "ask", label: "Is the stinger still in?", secs: 10, say: ["sting(er)? (still|out|in)", "stinger", "remove the sting", "where.*(stung|sting)"],
      run: function () { S.done.stinger = 1; return api.say("w_stinger"); } },
    { id: "ask_pain", tab: "ask", label: "Any pain?", secs: 10, say: ["\\bpain\\b", "hurt", "chest pain"],
      run: function () { S.done.pain = 1; return api.say("d_pain"); } },

    /* ---------- Assess ---------- */
    { id: "look", tab: "assess", label: "Look at him: first impression", secs: 10, say: ["look at (him|david)", "first impression", "general impression", "how does he look", "sick or not"],
      run: function () { S.done.look = 1; return api.info(f("look")); } },
    { id: "airway", tab: "assess", label: "Check his airway and voice", secs: 15, say: ["airway", "\\bvoice\\b", "throat", "tongue", "mouth"],
      run: function () { S.done.airway = 1; return api.info(f("airway")); } },
    { id: "chest", tab: "assess", label: "Listen to his chest", secs: 30, say: ["listen to (his|the|your) (chest|lungs|breathing)", "auscultat", "stethoscope", "breath sounds", "wheez"],
      run: function () { S.done.chest = 1; return api.info(f("chest")); } },
    { id: "skin", tab: "assess", label: "Look at his skin", secs: 10, say: ["\\bskin\\b", "rash", "hives", "swelling"],
      run: function () { S.done.skin = 1; return api.info(f("skin")); } },
    { id: "rr", tab: "assess", label: "Count his breathing rate", secs: 30, say: ["(resp|respiratory|breathing) rate", "count (his|the|your) (breathing|resp)", "\\bresps\\b"],
      run: function () { api.measure(["rr"]); return api.info("Respiratory rate " + api.vit().rr + "."); } },
    { id: "pulse", tab: "assess", label: "Feel his pulse", secs: 20, say: ["pulse", "heart rate", "cap(illary)? refill"],
      run: function () { api.measure(["hr"]); return api.info("Pulse " + api.vit().hr + ". " + f("pulse")); } },
    { id: "bp", tab: "assess", label: "Take a blood pressure", secs: 60, say: ["blood pressure", "\\bb ?p\\b", "pressure"],
      run: function () { api.measure(["bp"]); var v = api.vit(); return api.info("Blood pressure " + v.sbp + "/" + v.dbp + "."); } },
    { id: "spo2", tab: "assess", label: "SpO2 (finger probe)", secs: 15, say: ["sp ?o ?2", "\\bsats?\\b", "saturation", "oxygen level", "pulse ox", "oximet", "finger probe"],
      run: function () { api.measure(["spo2"]); return api.info("SpO2 " + api.vit().spo2 + "% " + (S.o2 ? "on oxygen." : "on air.")); } },
    { id: "monitor", tab: "assess", label: "Sam: put the Corpuls on", secs: 60, say: ["monitor", "corpuls", "corpus", "\\becg\\b", "e c g", "leads on", "dots on"],
      when: function () { return !S.monitor; },
      run: function () { S.monitor = S.t; api.measure(["hr", "spo2", "bp"]); api.note("Corpuls on: " + C.fixed.ecg.toLowerCase());
        return api.say("p_monitor").then(function () { var v = api.vit(); return api.info("HR " + v.hr + ", BP " + v.sbp + "/" + v.dbp + ", SpO2 " + v.spo2 + "% " + (S.o2 ? "on oxygen" : "on air") + ". ECG: " + C.fixed.ecg.toLowerCase() + "."); }); } },
    { id: "obs", tab: "assess", label: "Full set of obs (HR, BP, SpO2, RR)", secs: 90, say: ["(set of|full|repeat|another|more|redo|recheck|check) (the |his |set of )?(obs|observations|vitals|vital signs)", "\\bobs\\b", "observations", "vital signs", "reassess"],
      run: function () { api.measure(["hr", "bp", "spo2", "rr"]); var v = api.vit();
        return api.info("HR " + v.hr + ", BP " + v.sbp + "/" + v.dbp + ", SpO2 " + v.spo2 + "% " + (S.o2 ? "on oxygen" : "on air") + ", RR " + v.rr + ". " + f("chest") + " " + f("airway")); } },
    { id: "gcs", tab: "assess", label: "GCS and pupils", secs: 30, say: ["\\bg ?c ?s\\b", "glasgow", "pupils", "conscious (state|level)", "avpu"],
      run: function () { S.done.gcs = 1; api.note("GCS " + C.fixed.gcs + ", pupils equal and reactive"); return api.info("GCS " + C.fixed.gcs + ". Pupils equal and reactive."); } },
    { id: "bgl", tab: "assess", label: "Blood glucose", secs: 45, say: ["\\bb ?g ?l\\b", "blood (sugar|glucose)", "sugar", "glucose"],
      run: function () { S.done.bgl = 1; api.note("BGL " + C.fixed.bgl); return api.info("BGL " + C.fixed.bgl + " mmol/L."); } },
    { id: "temp", tab: "assess", label: "Temperature", secs: 20, say: ["temp"],
      run: function () { S.done.temp = 1; api.note("Temp " + C.fixed.temp); return api.info("Temperature " + C.fixed.temp + "."); } },

    /* ---------- Treat ---------- */
    { id: "epipen", tab: "treat", label: "Use David's EpiPen (expired)", secs: 30, medicine: true,
      say: ["(use|give|grab|get|administer).*(epipen|epi pen|auto.?injector|his pen)", "^(the )?(epipen|epi pen|auto.?injector)( now)?$"],
      run: function () {
        if (S.epipen) return api.say("p_epi_used");
        return api.say("p_epi_ask").then(function () {
          return api.confirm({ title: "EpiPen, David's own, EXPIRED last year", body: "Adult EpiPen into the mid outer thigh, through clothing if needed. Use it now?", yes: "Confirm: use it now", no: "Cancel" });
        }).then(function (ok) {
          if (!ok) { api.note("EpiPen not used (cancelled)"); return; }
          S.epipen = S.t; S.doses.push({ kind: "epipen", t: S.t });
          api.note("EpiPen (David's own, EXPIRED), mid outer thigh, left");
          return api.info("Blue cap off. Orange end firmly against the thigh until it clicks. Hold 10 seconds or more, then massage the site for 10 seconds (CPPRO-011).").then(function () { return api.say("p_epi_done"); });
        });
      } },
    { id: "im", tab: "treat", label: "IM adrenaline from the Red Kit", secs: 0, medicine: true,
      say: ["adrenaline", "adrenalin", "red kit", "draw up", "ampoule", "\\bi ?m\\b", "intramuscular"],
      run: function () {
        if (!S.advice) { api.flag("Went for IM adrenaline from the Red Kit before the EOC Clinician had advised it. With no working auto-injector the protocol says consult the EOC Clinician, who may advise IM adrenaline.", "cpp"); return api.say("p_need_eoc"); }
        if (!S.epipen) return api.say("p_epi_1st");
        if (S.im) return api.say("p_further");
        if (S.t - S.epipen < 300) { api.note("IM adrenaline held: under 5 minutes since the EpiPen"); return api.say("p_wait5"); }
        return api.choose({ title: "Red Kit adrenaline: 1000 microg in 1 mL", body: "The EOC Clinician advised 500 microg IM. What volume do you draw up? Say it or tap it.",
          options: [{ label: "0.05 mL", say: ["0\\.05", "point ?(zero|oh|o) ?five"] }, { label: "0.25 mL", say: ["0?\\.25", "point ?two ?five", "quarter"] },
                    { label: "0.5 mL", say: ["0?\\.5\\b", "point ?five", "half", "500", "five hundred"] }, { label: "1 mL", say: ["\\b1 ?(ml|mil)", "one (ml|mil)", "whole", "1000", "thousand"] }] })
        .then(function (i) {
          api.advance(120);
          if (i !== 2) { S.wrongVol = (S.wrongVol || 0) + 1; api.flag("Wrong volume chosen for 500 microg (" + ["0.05", "0.25", "0.5", "1"][i] + " mL). Sam caught it at the medication check: nothing was given. 1000 microg in 1 mL, so 500 microg is 0.5 mL.", "c008"); return api.say("p_chk_no"); }
          return api.say("p_chk_ok").then(function () {
            return api.confirm({ title: "Adrenaline 500 microg (0.5 mL) IM", body: "Mid outer thigh, the other leg. On the EOC Clinician's advice. Give it?", yes: "Confirm: give it", no: "Cancel" });
          }).then(function (ok) {
            if (!ok) { api.note("IM adrenaline drawn up, not given (cancelled)"); return; }
            S.im = S.t; S.doses.push({ kind: "im", t: S.t });
            api.note("Adrenaline 500 microg (0.5 mL) IM, right thigh, EOC Clinician's advice");
            return api.info("Alcohol swab, let it dry. Like a dart at 90 degrees, inject slowly, no need to draw back. Needle straight into the sharps container (CPPRO-011).").then(function () { return api.say("p_im_done"); });
          });
        });
      } },
    { id: "o2", tab: "treat", label: "Oxygen: non-rebreather, 15 L/min", secs: 45, say: ["oxygen", "\\bo ?2\\b", "non.?rebreather", "\\bmask\\b"],
      when: function () { return !S.o2; },
      run: function () { S.o2 = S.t; api.note("Oxygen, non-rebreather mask 15 L/min"); return api.say("p_o2"); } },
    { id: "pos_back", tab: "treat", label: "Position: as flat as his breathing allows", secs: 30, say: ["as flat as", "sit (him|you) back", "lean (him|you)? ?back", "recline", "semi", "comfortable position", "position (him|of comfort)"],
      when: function () { return !S.onStretcher; },
      run: function () { S.pos = "back"; S.posOk = S.t; api.note("Positioned as flat as his breathing allows. Not stood or walked");
        return api.info("You ease him back from leaning forward, as far as his breathing allows. He stays off his feet."); } },
    { id: "pos_flat", tab: "treat", label: "Position: lay him fully flat", secs: 30, say: ["(lay|lie) (him|you|down)? ?(fully |right |down )?flat", "lie (him |you )?down", "legs up", "flat on (his|your) back"],
      when: function () { return !S.onStretcher; },
      run: function () { S.triedFlat = (S.triedFlat || 0) + 1;
        api.flag("Tried to lay him fully flat while his breathing was difficult. The protocol: lay flat UNLESS breathing is difficult.", "cpp");
        return api.say("d_flat").then(function () { S.pos = "back"; S.posOk = S.posOk || S.t; api.note("Could not tolerate lying flat: back to as flat as his breathing allows");
          return api.info("He can't tolerate it. You bring him back up to as flat as his breathing allows."); }); } },

    /* ---------- Call ---------- */
    { id: "eoc", tab: "call", label: "Sam: call the EOC Clinician", secs: 60, say: ["e ?o ?c", "clinician", "call (it in|for advice)", "consult", "phone advice"],
      run: function () {
        var first = !S.eoc; if (first) S.eoc = S.t;
        return api.say("p_calling").then(function () {
          if (S.im) { S.eocUpdate = S.t; api.note("EOC Clinician updated: prompt transport, notify the hospital, call back with any deterioration"); return api.say("e_update"); }
          var p = S.epipen ? Promise.resolve() : api.say("e_epi_1st");
          return p.then(function () { return api.say("e_advice"); }).then(function () {
            S.advice = S.advice || S.t;
            api.note("EOC Clinician consulted: " + (S.epipen ? "" : "use the expired EpiPen now; ") + "reassess at 5 min, IM adrenaline 500 microg if not clearly improving");
            if (S.repeated) return;
            return api.choose({ title: "Repeat the advice back", body: "Say it back to the EOC Clinician, or tap what you heard.",
              options: [{ label: "Reassess at 5 minutes. IM adrenaline 500 microg if he isn't clearly improving", say: ["(five|5) minutes.*(five hundred|500)", "(five hundred|500)"] },
                        { label: "Give IM adrenaline 500 microg now, then reassess at 5 minutes", say: ["now"] },
                        { label: "Reassess at 5 minutes. IM adrenaline 850 microg if he isn't clearly improving", say: ["850", "eight hundred"] }] })
            .then(function (i) { S.repeated = 1;
              if (i === 0) { S.repeatOk = 1; api.note("Advice repeated back correctly"); return api.info("EOC Clinician: \"That's right.\""); }
              api.flag("The advice was repeated back wrongly. The EOC Clinician corrected it: reassess at 5 minutes, then IM adrenaline 500 microg if he isn't clearly improving.", "c008");
              return api.info("EOC Clinician: \"No. Reassess at 5 minutes. If he isn't clearly improving, IM adrenaline 500 micrograms.\""); });
          });
        });
      } },
    { id: "support", tab: "call", label: "Sam: request clinical support", secs: 30, say: ["clinical support", "back ?up", "paramedic", "intensive care", "\\bi ?c ?p\\b", "more help", "medstar"],
      run: function () { if (!S.support) { S.support = S.t; api.note("Clinical support requested: paramedics about 40 min"); } return api.say("p_support"); } },
    { id: "hospital", tab: "call", label: "Sam: notify the hospital", secs: 30, say: ["notify", "hospital", "pre.?notif", "let them know"],
      run: function () { if (!S.hospital) { S.hospital = S.t; api.note("Receiving hospital notified"); } return api.say("p_hospital"); } },

    /* ---------- Move ---------- */
    { id: "chair", tab: "move", label: "Carry chair to the stretcher", secs: 240, say: ["carry chair", "stair chair", "stretcher", "load (him|you)", "get (him|you) (on|to|into)", "move (him|you)"],
      when: function () { return !S.onStretcher; },
      run: function () {
        var p = Promise.resolve(true);
        if (S.im && api.stage() === 2 && !S.walkAsked) {
          S.walkAsked = 1;
          p = api.say("d_walk").then(function () { return api.choose({ title: "David wants to walk to the ambulance", body: "What do you say?", options: [
            { label: "No: you don't stand or walk. We'll bring the chair to you", say: ["\\bno\\b", "don.?t", "stay", "chair", "can.?t"] },
            { label: "OK, if Sam holds your arm", say: ["ok", "yes", "fine", "sure", "all right", "alright"] }] }); })
          .then(function (i) { if (i === 1) { S.letWalk = 1; api.flag("Agreed to let him walk to the ambulance. Do not allow them to stand or walk, however well they seem.", "cpp"); return api.say("p_no_walk"); } S.refusedWalk = 1; });
        }
        return p.then(function () { return api.say("p_chair"); }).then(function () {
          S.onStretcher = S.t; S.pos = "stretcher"; S.posOk = S.posOk || S.t;
          api.note("Carry chair to the stretcher (shuffled across, did not stand). Head up as far as his breathing needs");
          return api.say("p_ready"); });
      } },
    { id: "walk", tab: "move", label: "Walk him to the ambulance", secs: 10, say: ["walk", "stand (him|up|you)", "on (his|your) feet", "get up"],
      when: function () { return !S.onStretcher; },
      run: function () { S.triedWalk = (S.triedWalk || 0) + 1; api.flag("Tried to walk him to the ambulance. Do not allow them to stand or walk.", "cpp"); return api.say("p_no_walk"); } },
    { id: "go", tab: "move", label: "Transport to hospital", secs: 60, say: ["transport", "let.?s go", "go to hospital", "head off", "depart", "get going", "time mobile"],
      run: function () {
        if (!S.onStretcher) return api.info("He isn't on the stretcher yet.");
        S.left = S.t; api.note("Departed for the nearest hospital, about 25 min"); return api.end("transport");
      } }
  ];
};

/* Events checked every time the clock moves. */
window.SIM_CASE.tick = function (api) {
  var S = api.S, M = window.SIM_CASE.model;
  if (!S.doses.length && !S.nudged && S.t >= M.nudgeMin * 60) {
    S.nudged = S.t; api.flag("No adrenaline " + M.nudgeMin + " minutes after reaching him: Sam had to prompt it.", "dsy"); return api.say("p_nudge");
  }
  if (!S.doses.length && api.raw().sbp <= M.collapseSbp) {
    S.collapsed = S.t; api.note("David became unresponsive");
    return api.say("p_collapse").then(function () { return api.end("collapse"); });
  }
};

/* Debrief checklist: status ok / late / no. */
window.SIM_CASE.debrief = function (api) {
  var S = api.S, out = [], T = api.clock;
  function add(status, text, detail, src) { out.push({ status: status, text: text, detail: detail, src: src }); }
  function m(t) { return Math.round(t / 60); }
  var epi = S.epipen, setsBetween = S.sets.filter(function (s) { return epi != null && s.t > epi + 120 && (!S.im || s.t <= S.im) && (s.bp || s.hr); }).length;
  var base = S.sets.length ? S.sets[0] : null;

  add(epi == null ? "no" : (epi <= 180 ? "ok" : "late"), "Adrenaline first: his own auto-injector as a priority",
    epi == null ? "The EpiPen was never used. He looked really sick and it was the only auto-injector: use it straight away, even though it is expired, then follow the EOC Clinician's directions."
      : "EpiPen at " + T(epi) + ", " + m(epi) + " min after you reached him" + (epi <= 180 ? "." : ". Aim to have it in within the first couple of minutes: the walk-through gives it at 1444.") + " Because it was expired it must be handed over, recorded and reported (CPPRO-011).", "cpp");
  add(S.eoc == null ? "no" : (S.eoc <= 300 ? "ok" : "late"), "EOC Clinician consulted as soon as possible",
    S.eoc == null ? "The driver never called. With no in-date auto-injector, further adrenaline can only come from the EOC Clinician." : "Called at " + T(S.eoc) + "." + (S.repeated ? (S.repeatOk ? " Advice repeated back correctly." : " The repeat-back was wrong and had to be corrected.") : ""), "lead");
  add(S.support == null ? "no" : "ok", "Clinical support requested", S.support == null ? "Not requested. The protocol lists it straight after basic care." : "Requested at " + T(S.support) + ".", "cpp");
  add((S.triedWalk || S.letWalk) ? "no" : (S.posOk != null ? (S.triedFlat ? "late" : "ok") : "no"), "As flat as his breathing allows; never standing or walking",
    (S.triedWalk || S.letWalk) ? "He was asked or allowed to walk. Do not allow them to stand or walk." : S.posOk == null ? "His position was never changed from leaning forward on the chair." : (S.triedFlat ? "You tried him fully flat first: he could not breathe. Flat UNLESS breathing is difficult." : "Positioned at " + T(S.posOk) + "."), "cpp");
  add(S.o2 == null ? "no" : "ok", "Oxygen to bring SpO2 above 94%", S.o2 == null ? "No oxygen given. His SpO2 was 93% on air." : "On at " + T(S.o2) + ".", "lead");
  add(base && base.t <= 420 ? "ok" : (base ? "late" : "no"), "A first set of obs, without delaying adrenaline",
    base ? "First measurement at " + T(base.t) + "." + (epi != null && base.t < epi && S.measuredBeforeEpi >= 3 ? " You measured several things before the EpiPen: the clinical picture is enough to act on." : "") : "No obs were measured.", "walk");
  if (epi != null) add(setsBetween ? "ok" : "no", "Reassessed about 5 minutes after the EpiPen", setsBetween ? "Obs repeated after the EpiPen." : "No obs were repeated between the EpiPen and the next decision. The EOC Clinician's advice depended on that reassessment.", "walk");
  add(S.im == null ? "no" : "ok", "IM adrenaline 500 microg on the EOC Clinician's advice, checked with your partner",
    S.im == null ? "Not given. He was only slightly better at 5 minutes: still hypotensive, wheezy and hoarse." : "Given at " + T(S.im) + ", " + m(S.im - epi) + " min after the EpiPen." + (S.wrongVol ? " The first volume you chose was wrong and was caught at the check." : ""), "cpp");
  if (S.im != null) add(S.eocUpdate == null ? "no" : "ok", "EOC Clinician updated after the second dose", S.eocUpdate == null ? "No update was given." : "Updated at " + T(S.eocUpdate) + ".", "walk");
  add(S.hospital == null ? "no" : "ok", "Receiving hospital notified", S.hospital == null ? "Not notified. The protocol: provide prompt transport and notify the receiving facility." : "Notified at " + T(S.hospital) + ".", "cpp");
  add(S.left == null ? "no" : "ok", "Prompt transport: everyone with anaphylaxis goes to hospital", S.left == null ? "He never left the scene." : "Left the scene at " + T(S.left) + ", " + m(S.left) + " min after you reached him. The walk-through moves him at about 1500.", "cpp");
  var hx = ["allergy", "meds", "history", "weight"].filter(function (k) { return S.done[k]; }).length;
  add(hx >= 3 ? "ok" : (hx ? "late" : "no"), "History: allergies, medications, medical history, weight", hx + " of 4 asked." + (S.done.weight ? "" : " His weight matters: 10 microg/kg, with a single maximum of 500 microg."), "dsy");
  return out;
};
