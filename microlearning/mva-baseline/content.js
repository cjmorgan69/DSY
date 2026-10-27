/* Baseline obs at a high-speed MVA - AO microlearning. Content only: the layout lives in ../shared/module.js.
   Replaces the theme of the classic page /modules/rural-mva/ (kept as it is, as the owner asked), without the Shock
   Index or paramedic items (owner, 26 Oct 2026). Sources, all exported 31.08.2026:
   CPP-063-AO Prolonged Care - AO v1.0 (15 Jan 2026): obs at least every 15 min, more often when in a trigger zone or as
     clinically indicated, RDR escalation triggers. The owner chose (27 Oct 2026) not to quote the protocol's "at least two
     complete sets in the first hour": too few for trauma. The intro video sentence saying it was cut. CPP-004-AO Basic Care and Life Support - AO v4.0 (8 Dec 2016, no review date shown).
   CTL-070 Adult RDR Chart and CTL-042 Major Trauma Tool v1.2 (4 June 2025): read from the chart images.
   CPP-042-AO Amputation and Haemorrhage - AO v4.0 (8 Dec 2016). CPP-018-AO Spinal Injury - AO v5.0 (31 Jul 2020).
   CPP-158-AO Chest Trauma - AO v1.0 (30 May 2023). CPPRO-045 SAM Pelvic Sling II v1.0 (Jan 2025, review Jan 2028).
   CPPRO-004 Arterial Tourniquet Application v1.1 (review date Aug 2018 has passed). CTL-054 ISBAR.
   The compensated-shock wording (pulse and breathing climb, BP holds then falls) is DSY's, from the Khan Academy
   video; the owner approved it for the intro video. The checker's zone limits are CTL-070's adult chart. */

/* RDR chart zones (CTL-070, adult). 0 white, 1 yellow, 2 red, 3 purple. */
var MB_ZONE = ["white", "yellow", "red", "purple"];
function mbZones(v) {
  var z = {};
  var rr = v.rr; z.rr = rr >= 31 ? 3 : rr >= 26 ? 2 : rr >= 21 ? 1 : rr >= 11 ? 0 : rr >= 8 ? 2 : 3;
  var s = v.spo2; z.spo2 = s >= 95 ? 0 : s >= 90 ? 1 : 2;
  var b = v.sbp; z.sbp = b >= 200 ? 3 : b >= 180 ? 2 : b >= 170 ? 1 : b >= 100 ? 0 : b >= 90 ? 2 : 3;
  var p = v.hr; z.hr = p >= 140 ? 3 : p >= 120 ? 2 : p >= 100 ? 1 : p >= 60 ? 0 : p >= 50 ? 1 : p >= 40 ? 2 : 3;
  var g = v.gcs; z.gcs = g >= 15 ? 0 : g >= 13 ? 1 : g >= 9 ? 2 : 3;
  if (v.temp !== null && v.temp !== undefined) { var t = v.temp; z.temp = t >= 38.6 ? 2 : t > 38.0 ? 1 : t >= 35.6 ? 0 : t > 35.0 ? 1 : 2; }
  return z;
}
var MB_NAMES = { rr: "Resp rate", spo2: "SpO2", sbp: "Systolic BP", hr: "Pulse rate", gcs: "GCS", temp: "Temperature" };
var MB_UNITS = { rr: "/min", spo2: "%", sbp: " mmHg", hr: "/min", gcs: "", temp: " °C" };
/* Major Trauma Tool (CTL-042, adult 16 and over) Level 1 physiological criteria */
function mbLevel1(v) {
  var r = [];
  if (v.gcs <= 13) r.push("GCS " + v.gcs + " (13 or less)");
  if (v.sbp <= 100) r.push("Systolic BP " + v.sbp + " (100 or less)");
  if (v.hr < 50 || v.hr > 120) r.push("Heart rate " + v.hr + " (under 50 or over 120)");
  if (v.rr < 10 || v.rr > 30) r.push("Resp rate " + v.rr + " (under 10 or over 30)");
  return r;
}
function mbSet(v, p) { return { rr: v[p + "rr"], spo2: v[p + "spo2"], sbp: v[p + "sbp"], hr: v[p + "hr"], temp: v[p + "temp"], gcs: v[p + "gcs"] }; }
function mbValues(a, b) {
  var v = {};
  ["rr", "spo2", "sbp", "hr", "temp", "gcs"].forEach(function (k, i) { v["a" + k] = a[i]; v["b" + k] = b[i]; });
  return v;
}
function mbFields(p, head) {
  return [
    { id: p + "rr", type: "number", label: head + ": resp rate (/min)", min: 0 },
    { id: p + "spo2", type: "number", label: head + ": SpO2 (%)", min: 0 },
    { id: p + "sbp", type: "number", label: head + ": systolic BP (mmHg)", min: 0 },
    { id: p + "hr", type: "number", label: head + ": pulse rate (/min)", hint: p === "a" ? "Feel the pulse. The RDR chart says record the pulse rate, not the ECG heart rate." : null, min: 0 },
    { id: p + "temp", type: "number", label: head + ": temperature (°C)", optional: true, placeholder: "blank if not taken", min: 0 },
    { id: p + "gcs", type: "number", label: head + ": GCS", min: 3 }
  ];
}

var M = window.MODULE = {
  flow: true,                         // open sections that fade in, one tile row and a few quick checks (see ../README.md)
  draft: false,
  title: "Baseline obs at a high-speed MVA",
  subtitle: "Ambulance Officer microlearning",
  headline: "One set can't tell you. The trend can",
  lead: "At a high-speed crash the first set of obs often looks fine. This module is about why that first set matters: it's the baseline every later set is compared with. It covers how often to repeat obs (CPP-063-AO), the RDR chart's zones and escalation triggers (CTL-070), the Major Trauma Tool (CTL-042), how shock and the cold show up in the trend, and the AO care around them.",
  minutes: 20,

  protocol: {
    code: "CPP-063-AO", name: "Prolonged Care - AO", version: "v1.0 (15 January 2026)", exported: "31 August 2026",
    also: [
      { code: "CTL-070", name: "Adult RDR Chart" },
      { code: "CTL-042", name: "Major Trauma Tool", version: "v1.2 (June 2025)" },
      { code: "CPP-004-AO", name: "Basic Care and Life Support - AO", version: "v4.0" },
      { code: "CPP-042-AO", name: "Amputation and Haemorrhage - AO", version: "v4.0" },
      { code: "CPP-018-AO", name: "Spinal Injury - AO", version: "v5.0" },
      { code: "CPP-158-AO", name: "Chest Trauma - AO", version: "v1.0" },
      { code: "CPPRO-045", name: "SAM Pelvic Sling II", version: "v1.0" }
    ]
  },
  relatedCodes: ["CPP-042-AO", "CPP-018-AO", "CPP-158-AO"],
  footerNotes: [
    "CPP-004-AO and CPP-042-AO date from December 2016 and show no review date. CPPRO-004 Arterial Tourniquet Application's review date (August 2018) has passed. Check the SAAS Clinical app for newer versions.",
    "The adult Major Trauma Tool is for patients 16 and over. Children have their own tool and normal ranges (CTL-042 page 2) and their own RDR charts (CTL-046).",
    "The worked obs, scenarios, practical and the notes marked \"DSY\" were written for training and should be checked by your lead instructor. The shock explanation follows the Khan Academy video; it is not SAAS protocol wording."
  ],

  session: {
    intro: "For a team-led session. Allow about 30 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the introduction", time: "3 min", text: "Then ask: what would you have missed if you only took one set?" },
      { t: "The RDR chart", time: "5 min", text: "Everyone names the three escalation triggers. Then plot the worked example's sets on a paper RDR chart if you have one." },
      { t: "Shock and the cold", time: "10 min", text: "Watch the two explainer videos. Ask: which obs moves first, and which one moves last?" },
      { t: "Major Trauma Tool", time: "4 min", text: "Read the Level 1 list aloud. Ask: why is \"high speed\" on its own not a Level 2 criterion for adults?" },
      { t: "Checker and quiz", time: "8 min", text: "Work the checker scenarios, deciding before you press the button. Then everyone does the quiz alone." }
    ]
  },

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4?v=2", poster: "intro-poster.jpg?v=2", title: "Baseline obs at a high-speed MVA" } },
      { text: "A car has left the highway at speed. Your patient is talking and the first set of obs looks okay. Are they okay? One set can't tell you. A seriously injured patient can look stable for a while, and the change shows up as a trend across several sets." },
      { text: "That's why the first complete set matters so much. It's your baseline. Every later set is compared with it, and the trend is what tells you when to escalate, where the patient should go, and what to hand over." }
    ] },

    { title: "Why a baseline?", blocks: [
      { box: { title: "What the protocols say", check: { q: "You've taken one set of obs at a crash and everything is in the white zone. When is the next set due?", a: "In 15 minutes at the most, and sooner if you're concerned or any obs moves into a yellow, red or purple zone (CPP-063-AO). One normal set is only your baseline: repeated sets show clinical risk, deterioration, or a response to treatment." }, items: [
        "Gain, measure and record as much information as possible to support treatment decisions (CPP-004-AO)",
        "In the secondary phase: continuous regular monitoring of observations and vital signs, and cardiac rhythm if possible (CPP-004-AO)",
        "Repeated sets establish clinical risk, potential or actual deterioration, or response to treatment (CPP-063-AO)",
        "Full sets at least every 15 minutes, and more often if you're concerned or as clinically indicated (CPP-063-AO)",
        "Obs in a yellow, red or purple zone: take them more often (CPP-063-AO)",
        "Keep monitoring until you hand the patient over (CPP-063-AO)"
      ] } },
      { box: { title: "What goes in a complete set", items: [
        "Respiratory rate",
        "SpO2, and whether they're on room air or oxygen (L/min)",
        "Blood pressure: systolic and diastolic",
        "Pulse rate: record the pulse rate, not the ECG heart rate (CTL-070)",
        "Temperature",
        "Level of consciousness: GCS (E, V, M), and new confusion or behaviour change",
        "Pupils, pain score and BGL are on the RDR chart too. CPP-004-AO asks for a blood glucose particularly in anyone who has, or had, an altered conscious state"
      ] } },
      { note: "CPP-063-AO's minimum list is respiratory rate, SpO2, heart rate, blood pressure, temperature and GCS (or a sedation score). The RDR chart adds pupils, pain score and BGL." }
    ] },

    { title: "The RDR chart: zones and escalation", blocks: [
      { text: "Plot every set on the Adult RDR Chart (CTL-070). Each obs falls in a white, yellow, red or purple zone." },
      { table: { title: "Adult RDR Chart zones (CTL-070)", table: { head: ["Obs", "Zone", "Range"], rows: [
        ["Resp rate (/min)", "White", "11 to 20"],
        ["", "Yellow", "21 to 25"],
        ["", "Red", "26 to 30, or 8 to 10"],
        ["", "Purple", "31 or more, or 7 or less"],
        ["SpO2 (%)", "White", "95 or more"],
        ["", "Yellow", "90 to 94"],
        ["", "Red", "89 or less"],
        ["Systolic BP (mmHg)", "White", "100 to 169"],
        ["", "Yellow", "170 to 179"],
        ["", "Red", "180 to 199, or 90 to 99"],
        ["", "Purple", "200 or more, or 89 or less"],
        ["Pulse rate (/min)", "White", "60 to 99"],
        ["", "Yellow", "100 to 119, or 50 to 59"],
        ["", "Red", "120 to 139, or 40 to 49"],
        ["", "Purple", "140 or more, or 39 or less"],
        ["Temperature (°C)", "White", "35.6 to 38.0"],
        ["", "Yellow", "38.1 to 38.5, or 35.1 to 35.5"],
        ["", "Red", "38.6 or more, or 35.0 or less"],
        ["GCS", "White", "15"],
        ["", "Yellow", "13 to 14"],
        ["", "Red", "9 to 12"],
        ["", "Purple", "8 or less"],
        ["Pain score (0 to 10)", "White", "0 to 4"],
        ["", "Yellow", "5 to 7"],
        ["", "Red", "8 to 10"]
      ] }, items: ["Colour zones for BP are for the systolic only. Write the actual values on the chart."] } },
      { box: { title: "Escalate care if (CPP-063-AO)", tone: "warn", check: { q: "Set 1: pulse 104 (yellow). Set 2: pulse 124 (red). Everything else is white. Does CPP-063-AO say escalate?", a: "Yes. The pulse has moved from the yellow zone to the red zone: a deterioration trend. Escalate care, and keep taking obs more often." }, items: [
        "Zones progress: yellow to red, or red to purple",
        "Any obs in a purple zone",
        "3 or more obs in red or yellow zones"
      ] } },
      { note: "On the road, escalating means requesting clinical support and consulting the EOC Clinician (CPP-004-AO). CPP-063-AO's hospital escalation pathway (HALO, ED triage) applies while you wait to hand over." }
    ] },

    { title: "Shock: why the trend matters", blocks: [
      { text: "A bleeding patient can look fine at first. The body compensates: the pulse climbs and the breathing gets faster, while the blood pressure holds for a while. Then it falls. If you didn't take a baseline, the climb is invisible: a pulse of 110 means something very different if it was 80 twenty minutes ago. (DSY, from the Khan Academy video below.)" },
      { video: { src: "https://www.youtube.com/embed/wbfDqHk-ryM", title: "Hypovolaemic shock (Khan Academy)" } },
      { box: { title: "A worked example (DSY)", items: [
        "Set 1 (baseline): RR 18, SpO2 97%, BP 128/80, pulse 92, temp 36.4, GCS 15. All white",
        "Set 2 (15 min): RR 22, SpO2 96%, BP 124/82, pulse 106, temp 36.0, GCS 15. RR and pulse now yellow",
        "Set 3 (30 min): RR 26, SpO2 95%, BP 118/84, pulse 124, temp 35.6, GCS 14. RR and pulse red, GCS yellow",
        "The BP is still in the white zone at set 3. But the RR and pulse have moved from yellow to red: escalate (CPP-063-AO). The pulse over 120 is also a Major Trauma Tool Level 1 criterion"
      ] } },
      { text: "The other half of the story is the cold. Hypothermia can happen in hot and cold weather (CPP-063-AO), and the RDR chart puts 35.1 to 35.5 °C in yellow and 35.0 °C or less in red. The lethal triad video explains why cold matters so much in a bleeding patient." },
      { video: { src: "https://www.youtube.com/embed/5vgrXiFibs4", title: "The lethal triad of trauma (tootRN)" } },
      { box: { title: "Temperature management", items: [
        "Body temperature management is part of basic care (CPP-004-AO)",
        "Keep the patient warm and dry (CPP-063-AO)",
        "Expose to find and manage life-threatening injuries such as haemorrhage, then protect from the environment (CPP-004-AO)",
        "Adjust the vehicle temperature and add blankets as needed (CPP-063-AO)"
      ] } },
      { note: "Both videos are from the USA and explain the physiology. They are not SAAS protocol. Where they mention treatments, follow your protocols." }
    ] },

    { title: "The Major Trauma Tool", blocks: [
      { text: "Check every set against the SAAS Adult Major Trauma Triage Tool (CTL-042, 16 and over). The physiological criteria apply at any time, so a patient who wasn't Level 1 at the baseline can be Level 1 by the third set." },
      { box: { title: "Level 1: any ONE physiological or injury criterion, at any time", tone: "no", check: { q: "Baseline: pulse 96, BP 130/80. Thirty minutes later: pulse 126, BP 104/70. Is this patient Level 1 on the Major Trauma Tool?", a: "Yes. A heart rate over 120 is a Level 1 physiological criterion, at any time. (The BP of 104 is not yet 100 or less.)" }, items: [
        "GCS 13 or less (or 2 points less than normal)",
        "Systolic BP 100 or less",
        "Heart rate under 50 or over 120",
        "Resp rate under 10 or over 30",
        "Flail chest or subcutaneous emphysema",
        "Ongoing uncontrolled significant haemorrhage",
        "Penetrating injury to the head, neck or torso (including upper arm, upper leg and perineum)",
        "Major pelvic fractures",
        "Spinal injury with neurological signs",
        "Femur fracture plus one other long bone fracture",
        "Amputation or severe crush, proximal to the wrist or ankle",
        "Burns over 20% BSA and/or inhalation burns",
        "High voltage electrical injury (over 1000 volts)"
      ] } },
      { box: { title: "Level 2: mechanism of injury (any ONE)", items: [
        "Ejection from a vehicle, or death of an occupant",
        "Pedestrian struck at 30 km/h or more",
        "Cyclist (pedal or motor) struck, or fall from, at 30 km/h or more",
        "Prolonged extrication time (30 minutes or more)",
        "Fall of 3 metres or more",
        "Trauma in a pregnant patient over 20 weeks",
        "Fall from or kicked by a horse (or other large animal)",
        "Hanging or traumatic asphyxiation, drowning, gunshot wound"
      ] } },
      { box: { title: "Note: speed on its own", tone: "warn", items: [
        "The adult tool has no speed criterion. \"MVC at 60 km/h or more, or vehicle severely damaged\" is only on the children's tool",
        "So a high-speed crash with a stable adult is not automatically Level 2. That's exactly why the trend across your sets matters"
      ] } },
      { box: { title: "High risk groups: higher index of suspicion", items: [
        "Age 65 or over", "Pregnant", "Anticoagulant therapy or a bleeding disorder", "Morbidly obese", "Significant co-morbidity"
      ] } },
      { box: { title: "Where to go", items: [
        "Unstable patient: transport or divert to the closest trauma service or nearest ED, with early notification (CTL-042)",
        "Level 1: the highest level of trauma service within an ETA under 45 minutes (RAH, FMC preferred). Level 2: RAH, FMC or LMH if the ETA is under 45 minutes. Otherwise transport according to destination triage (CTL-042)",
        "On the Eyre Peninsula the Adelaide trauma services are well beyond 45 minutes. Consult the EOC Clinician about the destination and retrieval (DSY)"
      ] } }
    ] },

    { title: "Obs trend checker", blocks: [
      { tool: {
        title: "Obs trend checker",
        intro: "Enter your baseline set and your latest set (adult). The checker places each obs in its RDR chart zone (CTL-070), applies CPP-063-AO's escalation triggers, and checks the Major Trauma Tool's Level 1 physiological criteria (CTL-042). It doesn't look at injuries or mechanism: you do.",
        fields: mbFields("a", "Baseline").concat(mbFields("b", "Latest")),
        evaluate: function (v) {
          var A = mbSet(v, "a"), B = mbSet(v, "b"), za = mbZones(A), zb = mbZones(B);
          var why = [], alerts = [], actions = [], esc = false, worse = [], better = [];
          Object.keys(zb).forEach(function (k) {
            var line = MB_NAMES[k] + ": " + (A[k] !== null && A[k] !== undefined ? A[k] : "-") + " → " + B[k] + MB_UNITS[k] + " (" + (za[k] !== undefined ? MB_ZONE[za[k]] + " → " : "") + MB_ZONE[zb[k]] + ")";
            why.push(line);
            if (za[k] !== undefined && zb[k] > za[k]) worse.push(MB_NAMES[k] + " moved from " + MB_ZONE[za[k]] + " to " + MB_ZONE[zb[k]]);
            if (za[k] !== undefined && zb[k] < za[k]) better.push(MB_NAMES[k]);
          });
          var purple = Object.keys(zb).filter(function (k) { return zb[k] === 3; });
          var colour = Object.keys(zb).filter(function (k) { return zb[k] === 1 || zb[k] === 2; });
          var prog = Object.keys(zb).filter(function (k) { return za[k] !== undefined && zb[k] > za[k] && zb[k] >= 2 && za[k] >= 1; });
          var jump = Object.keys(zb).filter(function (k) { return za[k] === 0 && zb[k] >= 2; });
          if (prog.length) { esc = true; alerts.push("Trend: " + prog.map(function (k) { return MB_NAMES[k] + " " + MB_ZONE[za[k]] + " → " + MB_ZONE[zb[k]]; }).join(", ") + ". CPP-063-AO: escalate"); }
          if (jump.length) { esc = true; alerts.push("Straight from white to red or purple: " + jump.map(function (k) { return MB_NAMES[k] + " (" + MB_ZONE[zb[k]] + ")"; }).join(", ") + ". Treat this as a deterioration trend (DSY reading of CPP-063-AO)"); }
          if (purple.length) { esc = true; alerts.push("Purple zone: " + purple.map(function (k) { return MB_NAMES[k]; }).join(", ") + ". CPP-063-AO: escalate"); }
          if (colour.length >= 3) { esc = true; alerts.push(colour.length + " obs in red or yellow zones. CPP-063-AO: escalate"); }
          var l1a = mbLevel1(A), l1b = mbLevel1(B);
          if (l1b.length) alerts.push("Major Trauma Tool Level 1 (latest set): " + l1b.join("; "));
          else if (l1a.length) alerts.push("Major Trauma Tool Level 1 at the baseline: " + l1a.join("; ") + ". The criteria apply at any time, so this patient stays Level 1");

          if (esc) actions.push("Escalate: request clinical support and consult the EOC Clinician (CPP-004-AO)");
          if (colour.length || purple.length) actions.push("Obs in yellow, red or purple: take them more often than every 15 minutes (CPP-063-AO)");
          else actions.push("Keep taking full sets at least every 15 minutes, and more often if you're concerned (CPP-063-AO)");
          if (l1a.length || l1b.length) actions.push("Level 1 (CTL-042): the highest level of trauma service within an ETA under 45 minutes. If the patient is unstable: the closest trauma service or nearest ED, with early notification. Consult the EOC Clinician about destination and retrieval (DSY)");
          if (B.temp !== null && B.temp !== undefined && zb.temp >= 1 && B.temp <= 35.5) actions.push("Temperature " + B.temp + " °C: keep them warm and dry, adjust the vehicle temperature, add blankets (CPP-063-AO)");
          actions.push("Hand over the trend, not just the last set, using ISBAR (CTL-054)");

          var note = "";
          if (zb.sbp === 0 && (zb.hr > za.hr || zb.rr > za.rr))
            note = "The BP is still in the white zone while the pulse or breathing is climbing. That's the pattern the shock video describes: don't be reassured by the BP alone (DSY).";
          if (better.length && !esc) note = (note ? note + " " : "") + "Improved since the baseline: " + better.join(", ") + ". That's a response to treatment you can only see because you took a baseline.";

          var tone = esc ? "no" : (colour.length || l1b.length) ? "warn" : "good";
          var headline = esc ? "Escalate care" : l1b.length ? "Major Trauma Tool Level 1" : colour.length ? "Watch closely: obs more often" : "All in the white zone";
          if (worse.length && !esc) why.push("Worse than the baseline: " + worse.join("; "));
          return { tone: tone, headline: headline, alerts: alerts, why: why, actions: actions, note: note };
        },
        scenariosNote: "The scenarios were written for training by DSY. Decide before pressing the button.",
        scenarios: [
          { title: "The quiet climb", text: "Driver, 34, after a rollover. Baseline: RR 18, SpO2 97, BP 128, pulse 92, temp 36.4, GCS 15. Thirty minutes later: RR 26, SpO2 95, BP 118, pulse 124, temp 35.6, GCS 14.", values: mbValues([18, 97, 128, 92, 36.4, 15], [26, 95, 118, 124, 35.6, 14]) },
          { title: "Fine and staying fine", text: "Passenger, 45, seatbelt bruise only. Baseline: RR 16, SpO2 98, BP 134, pulse 84, temp 36.6, GCS 15. Fifteen minutes later: RR 16, SpO2 98, BP 130, pulse 80, temp 36.5, GCS 15.", values: mbValues([16, 98, 134, 84, 36.6, 15], [16, 98, 130, 80, 36.5, 15]) },
          { title: "Pain, then relief", text: "Rider, 28, open lower leg wound, bleeding controlled with direct pressure. Baseline: RR 24, SpO2 97, BP 150, pulse 112, temp 36.5, GCS 15. After methoxyflurane and splinting: RR 18, SpO2 98, BP 136, pulse 94, temp 36.4, GCS 15.", values: mbValues([24, 97, 150, 112, 36.5, 15], [18, 98, 136, 94, 36.4, 15]) },
          { title: "Cold and bleeding", text: "Driver, 70, on an anticoagulant, trapped 40 minutes on a winter night. Baseline: RR 20, SpO2 95, BP 112, pulse 98, temp 35.4, GCS 15. Latest: RR 28, SpO2 92, BP 96, pulse 118, temp 34.8, GCS 13.", values: mbValues([20, 95, 112, 98, 35.4, 15], [28, 92, 96, 118, 34.8, 13]) }
        ]
      } }
    ] },

    { title: "At the crash: AO care", blocks: [
      { text: "The obs only help if the basics are done. These are the AO protocol points that most often apply at a high-speed MVA." },
      { box: { title: "Primary phase (CPP-004-AO)", tiles: true, steps: [
        { t: "Scene", text: "Make it safe: evacuate, remove dangers, or get help from other emergency services." },
        { t: "Airway", text: "Stabilise the C-spine if required. Open and keep the airway clear." },
        { t: "Breathing", text: "Supplemental oxygen, or BVM ventilation if needed. Major trauma: high-flow oxygen (CPP-158-AO)." },
        { t: "Circulation", text: "Posture and haemorrhage control." },
        { t: "Disability", text: "AVPU: alert, verbal, pain, unresponsive." },
        { t: "Exposure", text: "Expose to find life-threatening injuries such as bleeding. Then protect from the environment." }
      ] } },
      { box: { title: "Bleeding (CPP-042-AO)", items: [
        "Direct pressure and elevation control external bleeding in most cases",
        "Life-threatening bleeding not controlled with direct pressure: arterial tourniquet, proximal and as close as possible to the bleeding site, tight enough to control the bleeding. Record the time",
        "A tourniquet must not be applied over a joint or wound, covered by a bandage or clothing, or removed pre-hospital",
        "Advise the EOC Clinician"
      ] } },
      { box: { title: "Pelvis (CPPRO-045 SAM Pelvic Sling II)", items: [
        "Mechanism that could fracture the pelvis, plus a suspected or obvious pelvic fracture, an altered GCS or haemodynamic compromise",
        "Applied directly to the skin, with the patient supine. Don't rock or spring the pelvis",
        "Minimum movement for every patient with blunt force trauma",
        "Pelvic fractures are the third most common cause of death in motor vehicle collisions (CPPRO-045)"
      ] } },
      { box: { title: "Spine (CPP-018-AO)", items: [
        "A high-speed collision, rollover or ejection means you consider an alternative to self-extrication",
        "Time critical and at risk of deterioration: consider rapid extrication",
        "Don't transport on a long board. Where possible, replace a semi-rigid collar for transport with another technique",
        "Paralysis, tingling, weakness, numbness or hypotension: request clinical support, vacuum mattress if available"
      ] } },
      { box: { title: "Chest (CPP-158-AO)", items: [
        "Look, listen and feel. Reassess for evolving injuries",
        "Tension pneumothorax signs include severe respiratory distress, reduced or absent breath sounds on one side, asymmetrical chest movement, and signs of shock such as tachycardia and hypotension. Seek clinical support immediately",
        "Major trauma: haemorrhage control, temperature management, minimise movement, rapid transport, delaying only for meaningful interventions"
      ] } },
      { box: { title: "Pain (CPP-013-AO)", items: [
        "Pain management as per CPP-013-AO. The pain module has the detail",
        "Methoxyflurane may not work well in chest trauma, because it relies on the patient's breathing. Consider clinical support for pain relief (CPP-158-AO)",
        "Record obs and the sedation score before and after any opioid (CPP-063-AO)"
      ] } },
      { links: [{ label: "Pain management module", href: "/microlearning/pain/" }] }
    ] },

    { title: "Escalate and hand over", blocks: [
      { box: { title: "Escalate early", items: [
        "Consider clinical support for patients who may benefit from advanced assessment and treatment (CPP-004-AO)",
        "Consult the EOC Clinician when you need assessment or treatment advice (CPP-004-AO)",
        "The EOC arranges retrieval: you don't contact RFDS or MedSTAR directly (DSY)"
      ] } },
      { box: { title: "Hand over the trend (ISBAR, CTL-054)", items: [
        "Give the baseline, the latest set and how they changed, not just the last numbers",
        "Include what you did and how the obs responded",
        "Record every set and every escalation attempt on the PCR (CPP-063-AO)"
      ] } }
    ] },

    { title: "Reference", collapsed: true, blocks: [
      { links: [
        { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
        { label: "CPP-063-AO Prolonged Care (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Prolonged%20Care%20-%20AO.pdf" },
        { label: "CTL-070 Adult RDR Chart (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Adult%20RDR%20Chart.pdf" },
        { label: "CTL-042 Major Trauma Tool (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/checklists/Major%20Trauma%20Tool.pdf" },
        { label: "CPP-004-AO Basic Care and Life Support (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Basic%20Care%20and%20Life%20Support%20-%20AO.pdf" },
        { label: "CPP-042-AO Amputation and Haemorrhage (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Amputation%20and%20Haemorrhage%20-%20AO.pdf" },
        { label: "CPP-018-AO Spinal Injury (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Spinal%20Injury%20-%20AO.pdf" },
        { label: "CPP-158-AO Chest Trauma (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/pdf/home/Chest%20Trauma%20-%20AO.pdf" },
        { label: "CPPRO-045 SAM Pelvic Sling II (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-045%20SAM%20Pelvic%20Sling%20II.pdf" },
        { label: "Classic page: High-Speed MVA Management", href: "/modules/rural-mva/" }
      ] }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { questions: [
      { q: "Why does CPP-063-AO ask for repeated sets of obs?", options: ["To fill in the PCR", "To establish clinical risk, deterioration, or response to treatment", "Only for patients over 65"], answer: 1,
        why: "CPP-063-AO: repeated observations establish clinical risk, potential or actual deterioration, or response to treatment." },
      { q: "How often should a full set of obs be taken, at a minimum?", options: ["Every 15 minutes, and more often if you're concerned", "Every 30 minutes", "Only at the scene and on arrival"], answer: 0,
        why: "CPP-063-AO: at least every 15 minutes, more often if any obs is in a yellow, red or purple zone, or as clinically indicated." },
      { q: "Which of these is NOT one of CPP-063-AO's escalation triggers?", options: ["Any obs in a purple zone", "3 or more obs in red or yellow zones", "One obs in a yellow zone"], answer: 2,
        why: "Escalate if zones progress from yellow to red or red to purple, any purple zone, or 3 or more red or yellow zones. A single yellow means take obs more often." },
      { q: "On the Adult RDR Chart, which zone is a pulse rate of 124?", options: ["Yellow", "Red", "Purple"], answer: 1,
        why: "CTL-070: pulse 100 to 119 is yellow, 120 to 139 is red, 140 or more is purple." },
      { q: "What does the RDR chart say to record for the pulse?", options: ["The ECG heart rate", "The pulse rate, not the ECG heart rate", "Whichever is higher"], answer: 1,
        why: "CTL-070: record pulse rate, not ECG heart rate." },
      { q: "A systolic BP of 96 on the Adult RDR Chart is in which zone?", options: ["White", "Red", "Purple"], answer: 1,
        why: "CTL-070: systolic 90 to 99 is red, 89 or less is purple, 100 to 169 is white." },
      { q: "In a bleeding patient, which pattern does the shock video describe as coming first?", options: ["BP falls first, then the pulse rises", "The pulse and breathing climb while the BP holds", "Everything changes at once"], answer: 1,
        why: "The body compensates: pulse and breathing rise while the BP holds for a while, then it falls. Without a baseline you can't see the climb. (DSY, from the Khan Academy video.)" },
      { q: "Which of these makes an adult Level 1 on the Major Trauma Tool?", options: ["Heart rate 118", "Systolic BP 100", "Resp rate 28"], answer: 1,
        why: "CTL-042 Level 1: GCS 13 or less, systolic BP 100 or less, HR under 50 or over 120, RR under 10 or over 30." },
      { q: "When do the Major Trauma Tool's physiological criteria apply?", options: ["Only on the first set", "At any time", "Only on arrival at hospital"], answer: 1,
        why: "CTL-042: any ONE physiological or injury criterion at any time. A later set can make the patient Level 1." },
      { q: "Which is a Level 2 mechanism of injury criterion on the ADULT Major Trauma Tool?", options: ["Vehicle speed 60 km/h or more", "Prolonged extrication time (30 minutes or more)", "Airbag deployed"], answer: 1,
        why: "Adult Level 2 includes ejection or death of an occupant and prolonged extrication of 30 minutes or more. The 60 km/h criterion is only on the children's tool." },
      { q: "Direct pressure hasn't controlled a life-threatening limb bleed. Where does the tourniquet go?", options: ["Over the nearest joint for grip", "Proximal and as close as possible to the bleeding site, not over a joint or wound", "Over the wound itself"], answer: 1,
        why: "CPP-042-AO: proximal and as close as possible to the bleeding site; must not be applied over a joint or wound, covered, or removed pre-hospital. Record the time." },
      { q: "What temperature does the Adult RDR Chart put in the red zone at the low end?", options: ["36.0 °C or less", "35.5 °C or less", "35.0 °C or less"], answer: 2,
        why: "CTL-070: 35.1 to 35.5 is yellow, 35.0 or less is red." }
    ] } }] },

    { title: "Practical: three sets, one trend", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "Optional. Do this in pairs or threes, at the station, with paper RDR charts if you have them. The lead instructor can swap in a different activity." },
      { box: { title: "What you need", items: ["A partner as the patient", "BP cuff, oximeter, thermometer, a watch", "Adult RDR charts (CTL-070), or the table on this page", "A facilitator with the scenario numbers"] } },
      { steps: [
        { t: "Baseline", text: "Take a real complete set on your partner: RR, SpO2, BP, pulse (felt), temperature, GCS. Plot it." },
        { t: "Set 2", text: "The facilitator reads out set 2 from 'The quiet climb' scenario. Plot it. Say what changed." },
        { t: "Set 3", text: "Plot set 3. Name the escalation trigger and the Major Trauma Tool criterion." },
        { t: "Escalate", text: "Make the call to the EOC Clinician, out loud, giving the trend." },
        { t: "Hand over", text: "Give an ISBAR handover in under a minute that includes the baseline and the trend." }
      ] },
      { box: { title: "What good looks like", items: ["A full set every time, pulse felt not read from the monitor", "The change spotted before the BP falls", "Escalation named from CPP-063-AO", "Handover gives the trend, not just the last numbers"] } },
      { note: "Suggested activity written for training. Check it with your lead instructor." }
    ] },

    { title: "Further learning", optional: true, collapsed: true, chip: "Optional", blocks: [
      { text: "The Resus Room is a UK emergency medicine podcast. \"Shock in Trauma; Roadside to Resus\" (September 2019, about 1 hour 16 minutes) and \"Trauma Primary Survey; Roadside to Resus\" (July 2023, about 38 minutes) follow the trauma patient from the scene to the ED. Optional listening. They reflect UK practice, so where they differ from your protocols, follow the protocols." },
      { links: [
        { label: "Shock in Trauma; Roadside to Resus (2019)", href: "https://theresusroom.libsyn.com/shock-in-trauma-roadside-to-resus" },
        { label: "Trauma Primary Survey; Roadside to Resus (2023)", href: "https://theresusroom.libsyn.com/trauma-primary-survey-roadside-to-resus" }
      ] }
    ] }
  ]
};
