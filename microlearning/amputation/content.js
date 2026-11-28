/* Amputation and haemorrhage - AO microlearning, with an Ambulance Responder version (?scope=ar). Content only: the
   layout lives in ../shared/module.js. Sources: SAAS CPP-042-AO Amputation and Haemorrhage - AO v4.0 (8 December 2016)
   and CPP-024-AR Amputation and Haemorrhage - AR v2.0 (4 January 2019), both exported 31.08.2026; CPPRO-004 Arterial
   Tourniquet Application v1.1 (review date 23 August 2018, now passed); pain relief points to CPP-013-AO and CPP-036-AR.
   Built 28 Nov 2026 to the new-topic recipe (.claude/references/new-topic-recipe.md). Nothing clinical here goes beyond
   those documents. */
window.MODULE = {
  flow: true,
  draft: false,
  title: "Amputation and haemorrhage",
  subtitle: "Ambulance Officer microlearning",
  headline: "Direct pressure first, the tourniquet as a last resort, and saving the amputated part",
  lead: "Most external bleeding stops with direct pressure and elevation. This module covers the AO protocol: basic care and haemorrhage control, when and how to apply an arterial tourniquet, what never to do with one, and how to look after an amputated body part.",
  minutes: 15,

  protocol: {
    code: "CPP-042-AO", name: "Amputation and Haemorrhage - AO", version: "v4.0 (8 December 2016)", exported: "31 August 2026",
    also: [{ code: "CPPRO-004", name: "Arterial Tourniquet Application", version: "v1.1 (review date 23 August 2018)" }]
  },
  footerNotes: ["CPP-042-AO is from December 2016 and CPPRO-004's review date (August 2018) has passed. Check the SAAS Clinical app for any newer version."],

  session: {
    intro: "For a team-led session. Allow about 20 minutes. Everyone works through the page on their own device, then discusses together.",
    steps: [
      { t: "Watch the intro video", time: "3 min", text: "Then read the key points together, taking turns to read one box each." },
      { t: "Work the scenarios", time: "5 min", text: "Open the bleeding checker. Decide the answer as a group before pressing the button, then compare." },
      { t: "The tourniquet", time: "4 min", text: "Read the tourniquet tiles. Who has applied a SOF tourniquet, even in training?" },
      { t: "Knowledge check", time: "5 min", text: "Everyone does it alone. Discuss any question people got wrong." },
      { t: "Optional practical", time: "5 min", text: "Pairs: a tourniquet on a training limb, and packaging a 'body part' for the hospital." }
    ]
  },

  video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Amputation and haemorrhage: what AOs need to know" },

  intro: [
    "Direct pressure and elevation will control external bleeding in most circumstances.",
    "Improvised or commercial arterial tourniquets must only be considered in extreme circumstances, where life-threatening bleeding can't be controlled despite direct pressure and elevation. CPPRO-004 calls the tourniquet an option of last resort.",
    "A complete amputation needs specific care aimed at saving the part for possible reattachment. A partial amputation may bleed heavily."
  ],

  keyPointsTitle: "Key points",
  keyPoints: [
    { title: "Every bleeding patient", check: { q: "A deep forearm wound is bleeding steadily. What comes first?", a: "Basic care, including haemorrhage control with direct pressure (and elevation). A tourniquet is only for life-threatening bleeding that direct pressure doesn't control." }, steps: [
      { t: "Basic care", text: "Including haemorrhage control using direct pressure. Elevation helps too (protocol principle)." },
      { t: "Consider requesting clinical support" },
      { t: "Consider consulting the EOC Clinician", scope: "ao" },
      { t: "Pain management", text: "As per CPP-013-AO.", scope: "ao" },
      { t: "Pain management", text: "As per CPP-036-AR.", scope: "ar" },
      { t: "Consult the EOC Clinician regarding treatment and transport", text: "They may advise: transport and cancel clinical support; transport and RV with clinical support en route; or monitoring until clinical support arrives.", scope: "ar" }
    ] },
    { title: "Life-threatening bleeding that direct pressure doesn't control", tone: "warn", check: { q: "Where does the tourniquet go?", a: "Proximal to the wound and as close as possible to the bleeding site, never over a joint or over the wound." }, steps: [
      { t: "Apply an arterial tourniquet", text: "Proximal, and as close as possible to the bleeding site." },
      { t: "Tighten it", text: "Enough to control the bleeding: CPPRO-004 says distal pulses should no longer be palpable." },
      { t: "Write the time", text: "On the strap label and the PCR, and hand it over." },
      { t: "Advise the EOC Clinician", text: "Who may seek specialist advice." }
    ] },
    { title: "An arterial tourniquet must never be", tone: "no", items: [
      "Applied over a joint or over the wound",
      "Covered with a bandage or clothing",
      "Removed before hospital"
    ], note: "Limbs only (CPPRO-004). Tourniquets can cause muscle, nerve, vessel and skin harm, pain, compartment syndrome, embolism and reperfusion injury: that's why they are a last resort, and why they stay on once they're on." },
    { title: "SOF tactical tourniquet (CPPRO-004)", tiles: true, steps: [
      { t: "Place", text: "Proximal to the injury, as close as possible to the bleeding while still controlling it. Not over a joint or the wound." },
      { t: "Buckle", text: "Click the buckle into place." },
      { t: "Strap", text: "Pull the strap down tight." },
      { t: "Windlass", text: "Rotate it until the bleeding is controlled and distal pulses can no longer be felt." },
      { t: "Lock", text: "Secure the windlass in the locking buckle." },
      { t: "Time", text: "Write the time on the strap label and the PCR. Leave it uncovered." }
    ] },
    { title: "A complete amputation", items: [
      "Seal the body part in a water-tight bag",
      "Place the bag in ice-cooled water if possible",
      "The body part must not be in direct contact with the ice"
    ], note: "The aim is to save the part for possible reattachment (protocol principle)." }
  ],

  tool: {
    check: { q: "Bleeding from a deep thigh wound soaks through firm direct pressure with elevation. What now?", a: "Life-threatening bleeding uncontrolled with direct pressure: an arterial tourniquet, proximal and as close as possible to the wound, tightened until it's controlled, time written down. Then advise the EOC Clinician." },
    title: "Bleeding checker",
    intro: "Answer the questions about your patient to see what CPP-042-AO says. It follows CPP-042-AO version 4.0.",
    fields: [
      { id: "where", type: "choice", label: "Where is the bleeding?", options: [
        { value: "limb", label: "A limb" }, { value: "other", label: "Not a limb (head, neck, torso)" } ] },
      { id: "life", type: "yesno", label: "Is it life-threatening bleeding?" },
      { id: "pressure", type: "choice", label: "Direct pressure (and elevation)", options: [
        { value: "works", label: "Controls the bleeding" }, { value: "fails", label: "Does not control it" } ] },
      { id: "amp", type: "yesno", label: "Is there a completely amputated body part?" }
    ],
    evaluate: function (v) {
      var AR = window.MODULE_SCOPE === "ar";
      var base = AR ? ["Basic care, including haemorrhage control with direct pressure", "Consider requesting clinical support, and pain management as per CPP-036-AR",
                       "Consult the EOC Clinician regarding treatment and transport: they may advise transport and cancel clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives"]
                    : ["Basic care, including haemorrhage control with direct pressure", "Consider requesting clinical support, consulting the EOC Clinician, and pain management as per CPP-013-AO"];
      var part = v.amp ? ["Complete amputation: seal the part in a water-tight bag, place the bag in ice-cooled water if possible, and never let the part touch the ice"] : [];
      if (v.pressure === "works") return { tone: "good", headline: "Direct pressure is working: keep it up", why: ["Direct pressure and elevation control external bleeding in most circumstances"],
        actions: base.concat(part, ["No tourniquet: it is only for life-threatening bleeding that direct pressure doesn't control"]) };
      if (!v.life) return { tone: "warn", headline: "Not life threatening: keep working on direct pressure", why: ["A tourniquet is only considered for life-threatening bleeding that can't be controlled despite direct pressure and elevation"],
        actions: base.concat(part, ["Firm direct pressure and elevation; reassess"]) };
      if (v.where !== "limb") return { tone: "warn", headline: "Not a limb: no tourniquet", why: ["CPPRO-004: tourniquets are placed on limbs only"],
        actions: ["Firm direct pressure, and elevation if you can", "Request clinical support and advise the EOC Clinician"].concat(AR ? [base[2]] : [], part) };
      return { tone: "warn", headline: "Life-threatening limb bleeding: apply an arterial tourniquet",
        why: ["Life-threatening bleeding that direct pressure doesn't control (CPP-042-AO)"],
        actions: ["Apply an arterial tourniquet proximal to the wound, as close as possible to the bleeding site, not over a joint or the wound",
          "Tighten until the bleeding is controlled (CPPRO-004: distal pulses no longer palpable), lock the windlass",
          "Write the time on the strap label and the PCR. Don't cover it, and don't remove it before hospital",
          "Advise the EOC Clinician, who may seek specialist advice"].concat(part, base.slice(1)) };
    },
    disclaimer: "Training aid only. Use the current protocol and the EOC Clinician for real patients.",
    scenariosNote: "Examples written for training from the protocol. Decide your answer before pressing the button.",
    scenarios: [
      { title: "Cut hand, pressure works", text: "Deep cut to the palm from a knife. Firm pressure with elevation has stopped it.", values: { where: "limb", life: false, pressure: "works", amp: false } },
      { title: "Chainsaw to the thigh", text: "Spurting bleeding from the thigh, soaking through firm direct pressure. Pale and sweaty.", values: { where: "limb", life: true, pressure: "fails", amp: false } },
      { title: "Fingers in an auger", text: "Two fingers completely off, forearm wound bleeding heavily through pressure.", values: { where: "limb", life: true, pressure: "fails", amp: true } },
      { title: "Scalp wound", text: "A large scalp wound bleeding heavily through a dressing.", values: { where: "other", life: true, pressure: "fails", amp: false } },
      { title: "Fingertip off, bleeding settled", text: "A fingertip cut off in a door. Pressure has controlled the bleeding.", values: { where: "limb", life: false, pressure: "works", amp: true } }
    ]
  },

  referenceTitle: "The tourniquet and related procedures",
  reference: [
    { title: "Arterial tourniquet: the rules (CPP-042-AO, CPPRO-004)", table: { head: ["", "What the documents say"], rows: [
      ["When", "Life-threatening limb bleeding that direct pressure (and elevation) can't control: an option of last resort"],
      ["Where", "Limbs only. Proximal, as close as possible to the bleeding site. Never over a joint or the wound"],
      ["How tight", "Enough to control the bleeding: distal pulses no longer palpable"],
      ["After", "Time on the strap label and the PCR, handed over. Never covered, never removed before hospital"],
      ["Tell", "Advise the EOC Clinician, who may seek specialist advice"]
    ] } },
    { title: "Complications of a tourniquet (CPPRO-004)", items: [
      "Muscle, nerve, vessel and skin damage; inappropriate use can cause significant harm, including limb loss",
      "Pain, compartment syndrome, embolism, reperfusion injury",
      "These are secondary when the bleeding is life threatening: that's why it's a last resort"
    ] }
  ],
  links: [
    { label: "SAAS Clinical app", href: "https://clinical.saambulance.sa.gov.au" },
    { label: "CPPRO-004 Arterial Tourniquet Application (PDF)", href: "https://clinical.saambulance.sa.gov.au/assets/files/CPPRO-004%20Arterial%20Tourniquet%20Application.pdf" },
    { label: "Pain management module", href: "../pain/" }
  ],

  quiz: [
    { q: "What controls most external bleeding?", options: ["A tourniquet", "Direct pressure and elevation", "Ice"], answer: 1,
      why: "Direct pressure and elevation will achieve external haemorrhage control in most circumstances." },
    { q: "When is an arterial tourniquet considered?", options: ["For any limb wound", "Only for life-threatening bleeding that direct pressure and elevation can't control", "Before direct pressure, to save time"], answer: 1,
      why: "Tourniquets must only be considered in extreme circumstances, where life-threatening haemorrhage can't be controlled despite direct pressure and elevation." },
    { q: "Where does the tourniquet go?", options: ["Over the wound", "Proximal, as close as possible to the bleeding site", "As high on the limb as possible, always"], answer: 1,
      why: "CPP-042-AO: proximal and as close as possible to the bleeding site." },
    { q: "Which of these is allowed?", options: ["Over a joint", "Covered with a bandage to keep it clean", "Neither"], answer: 2,
      why: "An arterial tourniquet must not be applied over a joint or wound, or covered with bandage or clothing." },
    { q: "How tight?", options: ["Snug, so it's comfortable", "Tight enough to control the bleeding: distal pulses no longer palpable", "As tight as possible, whatever the bleeding"], answer: 1,
      why: "Tighten sufficiently, aiming for haemorrhage control (CPP-042-AO); distal pulses should no longer be palpable (CPPRO-004)." },
    { q: "The bleeding has stopped with the tourniquet on. Can you loosen it on the way?", options: ["Yes, every 20 minutes", "No: it is not removed before hospital", "Yes, if the patient asks"], answer: 1,
      why: "An arterial tourniquet must not be removed pre-hospital." },
    { q: "What must you record?", options: ["The time it was applied", "The brand", "Nothing"], answer: 0,
      why: "Document the time of application: on the strap label and the PCR, and hand it over (CPPRO-004)." },
    { q: "Who do you tell once a tourniquet is on?", options: ["Nobody until hospital", "The EOC Clinician, who may seek specialist advice", "Only the patient's family"], answer: 1,
      why: "Advise the EOC Clinician, who may seek specialist advice." },
    { q: "How do you look after a completely amputated finger?", options: ["Straight onto ice", "Sealed in a water-tight bag, the bag in ice-cooled water, never touching the ice", "Wrapped in a dry towel at room temperature"], answer: 1,
      why: "Seal the body part in a water-tight bag; place the bag in ice-cooled water if possible; the body part must not be directly in contact with ice." },
    { q: "Can a tourniquet go on the neck or torso?", options: ["Yes", "No: limbs only", "Only the neck"], answer: 1,
      why: "CPPRO-004: tourniquets are placed on limbs only." },
    { scope: "ao", q: "Which pain protocol does CPP-042-AO point to?", options: ["CPP-013-AO Pain Management", "None", "CPP-047-AO"], answer: 0,
      why: "Consider pain management as per CPP-013-AO." },
    { scope: "ar", q: "What does CPP-024-AR add for an AR crew?", options: ["Nothing", "Consult the EOC Clinician regarding treatment and transport", "A second tourniquet"], answer: 1,
      why: "CPP-024-AR: consult the EOC Clinician regarding treatment and transport, who may advise transport and cancellation of clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives." },
    { scope: "ar", q: "Can an AR apply an arterial tourniquet?", options: ["Yes, for life-threatening limb bleeding direct pressure can't control", "No, only AOs", "Only on EOC Clinician advice"], answer: 0,
      why: "CPP-024-AR has the same tourniquet steps as the AO protocol, and CPPRO-004 applies to all clinical levels." }
  ],

  practical: {
    title: "Practical: the tourniquet and the amputated part",
    intro: "Optional. Do this in pairs, at the station, in your own time. The lead instructor can swap in a different activity.",
    equipment: ["A SOF tactical tourniquet from training stock and a training limb (never on a person, owner's rule for the MVA stations)", "A permanent marker", "A zip-lock bag, a second bag or container, water and ice, and a 'body part' (a sausage or a glove of rice)"],
    steps: [
      { t: "Direct pressure first", text: "Your partner describes a wound. Press firmly and elevate, and say when you would move to the tourniquet." },
      { t: "The tourniquet", text: "On the training limb: place it proximal to the 'wound', not over a joint, click, pull, wind, lock, and write the time on the strap." },
      { t: "The amputated part", text: "Seal the 'part' in a water-tight bag, and put that bag in ice-cooled water so it never touches the ice." },
      { t: "Make the call", text: "Role-play advising the EOC Clinician: the injury, the tourniquet time, the part, and the obs." }
    ],
    good: ["Direct pressure and elevation first", "Tourniquet proximal, close to the wound, not over a joint", "Time written on the strap", "The part never touching the ice"],
    note: "Suggested activities written for training. Never put a tourniquet on a person in practice. Check them with your lead instructor."
  },

  /* ---------- Ambulance Responder version (CPP-024-AR v2.0): these keys replace the AO ones ---------- */
  ar: {
    replace: [["CPP-042-AO", "CPP-024-AR"], ["version 4.0", "version 2.0"]],
    subtitle: "Ambulance Responder microlearning",
    lead: "Most external bleeding stops with direct pressure and elevation. This version covers the Ambulance Responder protocol: the same haemorrhage control, tourniquet and amputated-part care as AOs, and the EOC Clinician consult about treatment and transport.",
    protocol: { code: "CPP-024-AR", name: "Amputation and Haemorrhage - AR", version: "v2.0 (4 January 2019)", exported: "31 August 2026",
      also: [{ code: "CPPRO-004", name: "Arterial Tourniquet Application", version: "v1.1 (review date 23 August 2018)" }] },
    relatedCodes: ["CPP-042-AO"],
    footerNotes: ["CPPRO-004's review date (August 2018) has passed. Check the SAAS Clinical app for any newer version."],
    videoNote: { title: "Watching as an Ambulance Responder", tone: "warn",
      text: "The video follows the AO protocol (CPP-042-AO). The AR protocol (CPP-024-AR) is the same for direct pressure, the tourniquet and the amputated part. The differences: pain management is as per the AR pain protocol (CPP-036-AR), and an AR consults the EOC Clinician regarding treatment and transport, who may advise transport and cancel clinical support, transport and RV with clinical support en route, or monitoring until clinical support arrives." }
  }
};
