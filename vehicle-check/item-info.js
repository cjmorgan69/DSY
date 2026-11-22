/* Item information for the vehicle check (FRM-384 Mercedes VS30): what each item is for, the AO protocols (CPP) and
   procedures (CPPRO) that name it, and AO scope for medicines.
   Sources, read 22 Nov 2026 from clinical.saambulance.sa.gov.au: the 34 AO protocol PDFs (exported 31.08.2026), the
   CPPRO PDFs, the Cardiac Arrest protocols (CPP-002-AO v4.2, CPP-043-AO v2.1) as pasted from the site by the lead
   instructor on 22 Nov 2026 (their PDFs export blank), and the SAAS app dose table in main.10d22172e56532ee.js (scope per level).
   A document is listed only where its text names the item (or the job the item does). "what" is DSY's plain-English
   summary of those documents, for the lead instructor to review. "flag" marks a disagreement or a doubt.
   Rules are tried in order against "item name | description"; the first match wins. sec limits a rule to sections. */
window.VEHICLE_ITEM_INFO = (function () {
  var DOCS = {
    "CPP-001-AO": "Acute Cardiogenic Pulmonary Oedema", "CPP-002-AO": "Cardiac Arrest (Adult)", "CPP-003-AO": "Anaphylaxis", "CPP-004-AO": "Basic Care and Life Support",
    "CPP-006-AO": "Burns", "CPP-007-AO": "Chest Pain", "CPP-008-AO": "Envenomation", "CPP-009-AO": "Hypoglycaemia",
    "CPP-011-AO": "Narcotic Overdose", "CPP-012-AO": "Newborn Care and Resuscitation", "CPP-013-AO": "Pain Management",
    "CPP-014-AO": "Seizures", "CPP-016-AO": "Stroke", "CPP-017-AO": "Acute Behavioural Disturbance", "CPP-018-AO": "Spinal Injury",
    "CPP-019-AO": "Hypothermia (Severe and Unresponsive)", "CPP-021-AO": "Extended Practice for Credentialed Health Professionals",
    "CPP-042-AO": "Amputation and Haemorrhage", "CPP-043-AO": "Cardiac Arrest (Paediatric)", "CPP-045-AO": "Falls", "CPP-047-AO": "Nausea and Vomiting", "CPP-050-AO": "Asthma",
    "CPP-053-AO": "Primary Postpartum Haemorrhage", "CPP-055-AO": "Treat and Refer", "CPP-056-AO": "Refusal Against Advice",
    "CPP-059-AO": "Pregnancy and Birth", "CPP-062-AO": "Sepsis", "CPP-063-AO": "Prolonged Care", "CPP-158-AO": "Chest Trauma",
    "CPPRO-001": "Patient Mobility Assessment", "CPPRO-003": "Pressure Injury Prevention", "CPPRO-004": "Arterial Tourniquet Application",
    "CPPRO-007": "Intravenous Access and Administration", "CPPRO-008": "Medication Checks", "CPPRO-009": "Oral Medication Administration",
    "CPPRO-010": "Drawing Up and Labelling Medications", "CPPRO-011": "Intramuscular Injection", "CPPRO-012": "Inhaled Medication Administration",
    "CPPRO-013": "Intranasal Medication Administration", "CPPRO-020": "i-gel Supraglottic Airway", "CPPRO-021": "Cervical Spine Immobilisation",
    "CPPRO-022": "Pressure Bandaging and Immobilisation", "CPPRO-025": "Nasopharyngeal Airway (NPA)", "CPPRO-028": "Femoral Traction Splint (CT-6)",
    "CPPRO-037": "Vented Chest Seal", "CPPRO-046": "Newborn Temperature Management"
  };
  /* review dates printed on the procedures; a past date is shown as overdue */
  var REVIEW = {
    "CPPRO-001": "Dec 2019", "CPPRO-003": "Dec 2019", "CPPRO-004": "Aug 2018", "CPPRO-007": "Sep 2021", "CPPRO-008": "Jun 2020",
    "CPPRO-009": "Jun 2020", "CPPRO-010": "Jun 2020", "CPPRO-011": "Jun 2020", "CPPRO-012": "Mar 2021", "CPPRO-013": "Mar 2021",
    "CPPRO-020": "Apr 2023", "CPPRO-021": "Mar 2023", "CPPRO-022": "Nov 2024", "CPPRO-025": "2022", "CPPRO-028": "Apr 2026",
    "CPPRO-037": "Apr 2026", "CPPRO-046": "Nov 2028"
  };
  /* PDF file names on clinical.saambulance.sa.gov.au/assets/files/ */
  var FILES = { "CPPRO-001": "CPPRO-001 Patient Mobility Assessment.pdf", "CPPRO-003": "CPPRO-003 Pressure Injury Prevention.pdf", "CPPRO-004": "CPPRO-004 Arterial Tourniquet Application.pdf", "CPPRO-007": "CPPRO-007 Intravenous Access and Administration.pdf", "CPPRO-008": "CPPRO-008 Medication Checks.pdf", "CPPRO-009": "CPPRO-009 Oral Medication Administration.pdf", "CPPRO-010": "CPPRO-010 Drawing Up and Labelling Medications.pdf", "CPPRO-011": "CPPRO-011 Intramuscular Injection.pdf", "CPPRO-012": "CPPRO-012 Inhaled Medication Administration.pdf", "CPPRO-013": "CPPRO-013 Intranasal Medication Administration.pdf", "CPPRO-020": "CPPRO-020 i-gel Supraglottic Airway.pdf", "CPPRO-021": "CPPRO-021 Cervical Spine Immobilisation.pdf", "CPPRO-022": "CPPRO-022 Pressure Bandaging and Immobilisation.pdf", "CPPRO-025": "CPPRO-025 Nasopharyngeal Airway (NPA).pdf", "CPPRO-028": "CPPRO-028 CT-6 Femoral Traction Splint.pdf", "CPPRO-037": "CPPRO-037 Vented Chest Seal.pdf", "CPPRO-046": "CPPRO-046 Newborn Temperature Management .pdf" };
  /* scope words used in the table and the app */
  var S = {
    ao: "AO", consult: "AO on EOC consult", ext: "AO with Extended Practice only", auth: "Authorised AO only",
    notao: "Not AO scope", kit: "Equipment", none: "Non-clinical"
  };
  var PPE = "Personal protective equipment. The procedures list PPE in their required equipment.";
  var O2 = ["CPP-004-AO", "CPP-001-AO", "CPP-050-AO", "CPP-062-AO", "CPP-158-AO"];
  var BGL = ["CPP-009-AO", "CPP-016-AO", "CPP-014-AO", "CPP-012-AO", "CPP-004-AO"];
  var BP = ["CPP-004-AO", "CPP-007-AO", "CPP-013-AO", "CPP-059-AO"];
  var IV = ["CPP-021-AO", "CPPRO-007"];
  var INJ = ["CPPRO-010", "CPPRO-011"];
  var R = [
    /* ---------- medicines (scope from the SAAS app dose table) ---------- */
    { m: /^Nitrostat/, what: "GTN (glyceryl trinitrate) sublingual tablets for chest pain, within the blood pressure and heart rate limits in the protocol. Also on consult for ACPO.", docs: ["CPP-007-AO", "CPP-001-AO", "CPPRO-009"], scope: "AO if prescribed, else consult",
      note: "If the patient has their own GTN prescribed: the crew may give the first dose within the limits, then consult. Not prescribed: consult the EOC Clinician first. ACPO: consult first. (Lead instructor, 8 and 22 Nov 2026; the app lists GTN as Consult.)" },
    { m: /^Aspirin/, what: "Oral aspirin 300 mg for chest pain, unless allergic.", docs: ["CPP-007-AO", "CPPRO-009"], scope: S.ao },
    { m: /^Water for Injection/, what: "Diluent for drawing up medicines (CPPRO-010: diluents are drawn up first).", docs: ["CPPRO-010"], scope: S.kit,
      flag: "No AO protocol names water for injection. Ceftriaxone in CPP-062-AO is diluted with sodium chloride 0.9%, not water." },
    { m: /^Adrenaline/, what: "IM adrenaline for anaphylaxis when the patient's own auto-injector is not available, and for life-threatening asthma.", docs: ["CPP-003-AO", "CPP-050-AO", "CPPRO-011"], scope: S.consult,
      note: "App: Consult for AO; Y (no consult) for authorised AO in anaphylaxis." },
    { m: /^Methoxyflurane/, what: "Inhaled analgesic (Penthrox) for pain: 3 mL, repeated once if needed, with weekly and daily limits.", docs: ["CPP-013-AO", "CPPRO-012"], scope: S.ao },
    { m: /^Naloxone/, what: "IM naloxone for opioid overdose, alongside basic care and ventilation.", docs: ["CPP-011-AO", "CPPRO-011"], scope: S.consult },
    { m: /^Glucagon/, what: "IM glucagon for hypoglycaemia when oral glucose cannot be given or does not work.", docs: ["CPP-009-AO", "CPPRO-011"], scope: S.consult, note: "App: Y (no consult) for authorised AO." },
    { m: /^Paracetamol Tablet/, what: "Oral paracetamol 1000 mg for adults' pain, if none in the past 4 hours.", docs: ["CPP-013-AO", "CPPRO-009"], scope: S.ao },
    { m: /^Liquid Paracetamol|^Syringe Purple/, what: "Paracetamol suspension for children's pain, measured with the purple oral syringe.", docs: ["CPP-013-AO", "CPPRO-009"], scope: S.consult, note: "Under 16: consult the EOC Clinician for the dose." },
    { m: /^Midazolam/, what: "IM midazolam for prolonged or harmful seizures (half dose if 65 or older).", docs: ["CPP-014-AO", "CPPRO-011"], scope: S.consult },
    { m: /^Benzylpenicillin/, what: "Older IM antibiotic for suspected meningococcal septicaemia. Follow the Sepsis protocol: ceftriaxone is the antibiotic now; benzylpenicillin is only for crews without ceftriaxone or its training.", docs: ["CPP-062-AO", "CPPRO-011"], scope: S.consult,
      note: "To be changed over for ceftriaxone (lead instructor, 22 Nov 2026)." },
    { m: /^Ceftriaxone/, what: "IM ceftriaxone for suspected meningococcal septicaemia (50 mg/kg, max 2 g; each 1 g vial diluted with 3.5 mL sodium chloride 0.9%).", docs: ["CPP-062-AO", "CPPRO-010", "CPPRO-011"], scope: S.consult, note: "Needs the ceftriaxone training (CPP-062-AO)." },
    { m: /^Salbutamol/, what: "Salbutamol nebules for more severe asthma, nebulised with ipratropium.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.consult },
    { m: /^Ipratropium MDI/, what: "Ipratropium inhaler with a spacer, given with salbutamol when the EOC Clinician advises paramedic-level treatment for asthma that has not improved after salbutamol. Paramedic dose (SAAS app, CPG-114-P): 8 puffs (168 microg) if 6 or older, 4 puffs (84 microg) if under 6, single dose.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.consult,
      note: "AO on EOC consult, doses as per the paramedic guideline (lead instructor, 22 Nov 2026)." },
    { m: /^Ipratropium/, what: "Ipratropium nebules, given with salbutamol for more severe asthma and anaphylaxis with bronchospasm.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.consult },
    { m: /^Ventolin MDI/, what: "Salbutamol inhaler (100 microg a puff) with a spacer for asthma: 12 puffs if 6 or older, 6 puffs if under 6.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.ao,
      note: "Give without a consult, as CPP-050-AO says (lead instructor, 22 Nov 2026; the app lists it as Consult)." },
    { m: /^Ondansetron/, what: "Ondansetron 4 mg wafer (ODT) placed on the tongue for nausea and vomiting. Consult for a further dose or if a precaution applies.", docs: ["CPP-047-AO", "CPPRO-009"], scope: S.ao },
    { m: /^Oral Glucose/, what: "Oral glucose (up to 15 g) for hypoglycaemia (BGL below 3.5) when the patient can swallow.", docs: ["CPP-009-AO", "CPPRO-009"], scope: S.ao },
    { m: /^Carbetocin/, what: "Medicine for postpartum haemorrhage, carried for paramedics.", docs: [], scope: S.notao, note: "App: paramedic and above. CPP-053-AO does not name it." },
    { m: /^Olanzapine/, what: "Oral olanzapine 5 to 10 mg for acute behavioural disturbance when de-escalation has not worked.", docs: ["CPP-017-AO", "CPPRO-009"], scope: S.consult },
    { m: /^Co-Phenylcaine/, what: "Nasal spray: 3 to 5 sprays before inserting a nasopharyngeal airway (CPPRO-025).", docs: ["CPPRO-025"], scope: S.ao,
      note: "AOs may use it to insert an NPA (lead instructor, 22 Nov 2026; the app lists paramedic and above)." },
    { m: /^S8 Drugs/, what: "Schedule 8 medicines, kept locked and recorded in the controlled substance register. For AOs, IN fentanyl is only for those authorised by SAAS, on EOC consult.", docs: ["CPPRO-008", "CPP-013-AO"], scope: S.auth, note: "Contents vary by station." },
    { m: /^Controlled Substance Register/, what: "Register for Schedule 8 medicines.", docs: ["CPPRO-008"], scope: S.none },
    /* ---------- airway and breathing ---------- */
    { m: /^Oropharyngeal/, what: "Oropharyngeal airway to keep the airway open in an unconscious patient; part of basic care in paediatric cardiac arrest.", docs: ["CPP-004-AO", "CPP-043-AO"], scope: S.kit },
    { m: /^Nasopharyngeal/, what: "Nasopharyngeal airway; the Seizures protocol suggests it if the jaw is clenched (trismus).", docs: ["CPPRO-025", "CPP-004-AO", "CPP-014-AO"], scope: S.kit },
    { m: /^i-gel/, what: "i-gel supraglottic airway (SGA): insert when possible in cardiac arrest; consider early in newborn resuscitation. Adults: no need to pause compressions once it is in; children: still pause to ventilate.", docs: ["CPPRO-020", "CPP-002-AO", "CPP-043-AO", "CPP-004-AO", "CPP-012-AO"], scope: S.kit },
    { m: /^Cotton Ties/, what: "Ties to secure an i-gel (the alternative to tape).", docs: ["CPPRO-020"], scope: S.kit },
    { m: /^Surgical Tape/, what: "Tape: CPPRO-020 secures the i-gel with 2.5 cm tape.", docs: ["CPPRO-020"], scope: S.kit },
    { m: /^Lubricant/, what: "Water-based lubricant for inserting an i-gel or NPA.", docs: ["CPPRO-020", "CPPRO-025"], scope: S.kit },
    { m: /^Filter/, what: "Filter fitted between the bag-valve-mask and the mask or i-gel.", docs: ["CPPRO-020"], scope: S.kit },
    { m: /^Bite Block/, what: "Bite block.", docs: [], scope: S.kit, note: "Not named in an AO document (the i-gel has its own bite block)." },
    { m: /Bag Valve Mask|^Adult Mask|^Paediatric Mask/, what: "Bag-valve-mask and masks for IPPV (assisted breathing): 30 compressions to 2 breaths in cardiac arrest, newborn resuscitation and opioid overdose.", docs: ["CPP-004-AO", "CPP-002-AO", "CPP-043-AO", "CPP-012-AO", "CPP-011-AO"], scope: S.kit },
    { m: /Masks - (Neonate|Resus Neonatal)/, what: "Newborn masks for IPPV in newborn resuscitation.", docs: ["CPP-012-AO"], scope: S.kit },
    { m: /suction|Suction/, what: "Suction to clear the airway. In newborns: mouth then nose, only if the airway is compromised.", docs: ["CPP-004-AO", "CPP-012-AO", "CPPRO-020"], scope: S.kit },
    { m: /Syringe Luer Lo[ck]k? 50ml/, what: "50 mL syringe.", docs: [], scope: S.kit, note: "Not named in an AO protocol." },
    { m: /Non.?rebreather/, what: "Non-rebreather mask for high-flow oxygen (for example ACPO).", docs: ["CPP-004-AO", "CPP-001-AO"], scope: S.kit },
    { m: /Nebuli[sz]er/, what: "Nebuliser mask for nebulised salbutamol and ipratropium.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.kit },
    { m: /Nasal Cannula/, what: "Nasal cannula for supplemental oxygen, up to 4 L/min, whenever the protocol says oxygen may be needed (for example basic care, or seizures with SpO2 below 94%). Where a protocol asks for high-flow oxygen (ACPO, chest trauma, sepsis with SpO2 below 94%), use the mask it names.", docs: ["CPP-004-AO", "CPP-014-AO", "CPP-050-AO"], scope: S.kit,
      note: "Lead instructor, 22 Nov 2026. CPP-004-AO itself lists face mask, non-rebreather mask or IPPV; CPP-050-AO names nasal cannula (4 L/min) with paramedic-level treatment on EOC consult." },
    { m: /(Standard|Therapy).{0,12}(Face )?Mask/, what: "Face mask for supplemental oxygen.", docs: ["CPP-004-AO"], scope: S.kit },
    { m: /Oxygen Cylinders|^Oxygen Sock/, what: "Oxygen: supplemental oxygen in basic care, high flow in ACPO, chest trauma and sepsis (if SpO2 below 94%).", docs: O2, scope: S.kit },
    { m: /^MDI Spacer/, what: "Spacer for giving salbutamol by inhaler; add a mask for small children.", docs: ["CPP-050-AO", "CPPRO-012"], scope: S.kit },
    /* ---------- circulation, monitoring ---------- */
    { m: /^Corpuls Monitor/, what: "Monitor and defibrillator: ECG, observations, and AED shocks in cardiac arrest.", docs: ["CPP-004-AO", "CPP-002-AO", "CPP-043-AO", "CPP-007-AO", "CPP-019-AO"], scope: S.kit },
    { m: /^Defib Pads/, what: "AED pads. Adult pads are fine for children over 8, and still reasonable under 8 if there are no paediatric pads; use front-and-back placement on small children. In severe hypothermia, a maximum of one shock.", docs: ["CPP-002-AO", "CPP-043-AO", "CPP-004-AO", "CPP-019-AO"], scope: S.kit },
    { m: /^Paper Rolls|^ECG Spare Dots/, what: "ECG paper and electrodes. The Chest Pain protocol includes an ECG in basic care.", docs: ["CPP-007-AO"], scope: S.kit },
    { m: /^Tympanic/, what: "Covers for the tympanic thermometer. Newborn temperature is taken under the armpit with a digital thermometer instead.", docs: ["CPP-004-AO", "CPP-062-AO", "CPP-063-AO", "CPP-012-AO"], scope: S.kit },
    { m: /Thermometer Digital/, what: "Digital thermometer for the newborn's armpit temperature, every 15 minutes.", docs: ["CPP-012-AO", "CPPRO-046"], scope: S.kit },
    { m: /Sphygmomanometer|BP Cuff|CorPuls BP Cuffs/, what: "Blood pressure: needed for the GTN limits, pain relief, the Pregnancy RDR chart and routine observations.", docs: BP, scope: S.kit },
    { m: /^Stethoscope/, what: "Listening to the chest (chest trauma) and the newborn's heart rate.", docs: ["CPP-158-AO", "CPP-012-AO"], scope: S.kit },
    { m: /^Glucometer|^Lancets/, what: "Blood glucose (BGL): hypoglycaemia is below 3.5; newborn 2.5 or less (heel sample). Check it in stroke and seizures too.", docs: BGL, scope: S.kit },
    { m: /^Penlight/, what: "Penlight for pupil size and reaction.", docs: ["CPP-063-AO", "CPP-020-AO"], scope: S.kit },
    /* ---------- bleeding, wounds, burns ---------- */
    { m: /^Tourniquet/, what: "Arterial tourniquet (SOF) for life-threatening limb bleeding that direct pressure cannot stop: close to the wound, not over a joint, write down the time. Never for snake bite.", docs: ["CPP-042-AO", "CPPRO-004", "CPP-008-AO"], scope: S.kit },
    { m: /^Hyfin/, what: "Vented chest seal for an open chest wound.", docs: ["CPP-158-AO", "CPPRO-037"], scope: S.consult },
    { m: /^Razors/, what: "Razor, used to clear hair before applying a vented chest seal.", docs: ["CPPRO-037"], scope: S.kit },
    { m: /^Burnaid/, what: "Hydrogel dressing for thermal burns ONLY when running water is not available (max 10 min in newborns, 20 min otherwise). Never on chemical burns.", docs: ["CPP-006-AO"], scope: S.kit },
    { m: /^Glad Wrap/, what: "Cling wrap to cover a burn after cooling, laid on, not wrapped round.", docs: ["CPP-006-AO"], scope: S.kit },
    { m: /^Snake Bite Kit/, what: "Snake bite bandage kit (four 15 cm elasticised rollers) for pressure bandaging and immobilisation.", docs: ["CPP-008-AO", "CPPRO-022"], scope: S.kit },
    { m: /^Roller Bandages|^Triangular Bandages/, what: "Bandages: the snake bite procedure uses them to hold a splint in place.", docs: ["CPPRO-022", "CPP-008-AO"], scope: S.kit },
    { m: /^Cardboard Splint/, what: "Padded cardboard splint to immobilise a bitten limb.", docs: ["CPPRO-022"], scope: S.kit },
    { m: /^Dressings|^Dressing/, what: "Dressings: direct pressure for bleeding, a simple dressing over a bite on the head or torso, or a moist dressing on a burn.", docs: ["CPP-042-AO", "CPP-008-AO", "CPP-006-AO"], scope: S.kit },
    { m: /^Tegaderm|^Protect IV Cannula|^IV Bungs|^Infusion Sets|^IV Burette|^Saline 500ml/, what: "IV cannulation and fluids.", docs: IV, scope: S.ext },
    { m: /^Drawing Up Needles|^Syringe Luer-Lok|^Giving Needles/, what: "Needles and syringes to draw up and give IM injections (adrenaline, glucagon, naloxone, midazolam, ceftriaxone).", docs: INJ, scope: S.kit },
    { m: /^Alcohol Swabs/, what: "Alcohol swabs for the skin before an IM injection.", docs: ["CPPRO-011"], scope: S.kit },
    { m: /^Saline 10ml/, what: "Saline: tops up nebulised salbutamol to 5 mL, and dilutes ceftriaxone (3.5 mL per 1 g vial).", docs: ["CPP-050-AO", "CPP-062-AO"], scope: S.kit },
    { m: /^MAD Nasal/, what: "Atomiser for intranasal medicine (IN fentanyl, for AOs authorised by SAAS, on EOC consult).", docs: ["CPPRO-013", "CPP-013-AO"], scope: S.auth },
    { m: /^Universal Shears/, what: "Shears for cutting clothing; listed in the snake bite and traction splint procedures.", docs: ["CPPRO-022", "CPPRO-028"], scope: S.kit },
    { m: /^Sharps Container/, what: "Sharps disposal after injections.", docs: ["CPPRO-011"], scope: S.kit },
    /* ---------- spinal, splinting, moving ---------- */
    { m: /^Spinal Board \| $/, what: "Long board for extrication. The Spinal Injury protocol says do not transport patients on it and do not secure the head to it.", docs: ["CPP-018-AO"], scope: S.kit },
    { m: /^Collar Bag/, what: "Semi-rigid collars. Remove them for transport where possible and use another technique (modified towel roll, vacuum mattress).", docs: ["CPP-018-AO", "CPPRO-021", "CPP-063-AO"], scope: S.kit },
    { m: /^CT-6/, what: "Traction splint for a mid-shaft femur fracture.", docs: ["CPPRO-028"], scope: S.kit },
    { m: /^Sam Splints/, what: "SAM splints. The Pain Management protocol counts splinting as a simple pain measure.", docs: ["CPP-013-AO"], scope: S.kit },
    { m: /^Blue Slide Sheet|^Sally Tubes|^PATSLIDE/, what: "Transfer aids: use sally tubes and pat slides for every lateral transfer to protect the patient's skin and the crew's backs.", docs: ["CPPRO-001", "CPPRO-003", "CPP-063-AO"], scope: S.kit },
    { m: /^Chair Stretcher/, what: "Compact carry chair: a manual-task aid for moving patients.", docs: ["CPPRO-001"], scope: S.kit },
    /* ---------- warmth, newborn, birth ---------- */
    { m: /^Rescue Blankets/, what: "Space blankets to insulate a hypothermic patient.", docs: ["CPP-019-AO"], scope: S.kit },
    { m: /^Blankets|Flannelette Blanket/, what: "Blankets to keep the patient warm, and to wrap the birth parent and newborn.", docs: ["CPP-019-AO", "CPP-012-AO", "CPP-063-AO"], scope: S.kit },
    { m: /^Thermal Heat Hat/, what: "Heat-retaining hat.", docs: [], scope: S.kit, note: "Not named in an AO protocol (newborns get a beanie: CPP-012-AO)." },
    { m: /Mattress Gel Warming/, what: "TransWarmer heat mattress for a cold newborn (36.4 °C or less); line it with a sheet, blanket or towel and remove it above 37.5 °C.", docs: ["CPP-012-AO", "CPPRO-046"], scope: S.kit },
    { m: /Neo-Help/, what: "NeoHelp suit for a newborn under 37 weeks or under 2500 g (under 28 weeks: do not dry first).", docs: ["CPP-012-AO", "CPPRO-046"], scope: S.kit },
    { m: /Obstetric aide memoire/, what: "Obstetric aide-memoire, used with the Pregnancy RDR chart.", docs: ["CPP-059-AO"], scope: S.kit },
    { m: /Cord Clamps|Blunt Scissors/, what: "Clamp the cord after at least 1 minute, in 3 places (10, 15 and 20 cm from the newborn), and cut between two clamps.", docs: ["CPP-059-AO"], scope: S.kit },
    { m: /Nappy|^Sterile Maternity Kit \| Towel/, what: "Newborn kit items for keeping the baby warm and dry.", docs: ["CPPRO-046"], scope: S.kit },
    { m: /^Maternity kit|^Resus Kit - Child|^New Maternity Pack|^Sterile Maternity Kit/, what: "Birth kit (pre-made and pre-checked).", docs: ["CPP-059-AO", "CPP-012-AO"], scope: S.kit },
    { m: /^Bath Towels|^Face Towels/, what: "Towels: a modified towel roll for the neck, and drying and warming a newborn.", docs: ["CPPRO-021", "CPP-012-AO"], scope: S.kit },
    { m: /^Sheets/, what: "Sheets for the stretcher (kept taut to protect skin) and to line a TransWarmer.", docs: ["CPPRO-003", "CPP-012-AO"], scope: S.kit },
    { m: /^Bedpan|^Urinal/, what: "Toileting for non-ambulant patients during prolonged care.", docs: ["CPP-063-AO"], scope: S.kit },
    { m: /^Water \|/, what: "Drinking water: encourage oral fluids in prolonged care.", docs: ["CPP-063-AO"], scope: S.kit },
    { m: /^Bio-Hazard/, what: "Clinical waste. After a birth, the placenta goes to hospital in a separate biohazard bag.", docs: ["CPP-053-AO"], scope: S.kit },
    { m: /^Spinal Board Straps/, what: "Straps for the long board. The Spinal Injury protocol says do not secure the head to it.", docs: ["CPP-018-AO"], scope: S.kit },
    { m: /^Trauma Kit|^Airway Kit/, what: "Grab-and-go kit. Its contents are not listed on FRM-384.", docs: [], scope: S.kit },
    { m: /^Eye Dressings|^Adhesive Band Aid|^Elastoplast|^30ml Saline|^Combi-Stoppers|^Emesis Bags|^Blue Incontinence|^Plastic Sheets|^Body Bag/, what: "", docs: [], scope: S.kit },
    { m: /^Pedi Mate/, what: "Child restraint for carrying a child safely on the stretcher.", docs: [], scope: S.kit },
    { m: /^Trauma Teddy/, what: "Comfort toy for a frightened child.", docs: [], scope: S.kit },
    { m: /^Mass Casualty|^Clinical Commander|^Commander\/Clinician/, what: "Major incident equipment for the first crew on scene.", docs: [], scope: S.kit, note: "Not covered by the AO clinical protocols." },
    /* ---------- forms ---------- */
    { m: /^Against Medical Advi[cs]e/, what: "Acknowledgement of Medical Advice (AMA) form, completed when a patient refuses against advice.", docs: ["CPP-056-AO"], scope: S.none },
    { m: /^MH Clients statement/, what: "Statement of rights under the Mental Health Act 2009, given to a patient in 'care and control'.", docs: ["CPP-017-AO"], scope: S.none },
    { m: /^TNT Envelopes/, what: "Envelopes for treat-not-transport paperwork.", docs: ["CPP-055-AO"], scope: S.none },
    /* ---------- PPE and hygiene ---------- */
    { m: /Gloves|N95|P2 Masks|3M Masks|Surgical Masks|Overspecs|Safety Glasses|^PPE/, what: PPE, docs: [], scope: S.kit },
    { m: /Hand Gel|^Aquium/, what: "Hand hygiene before and after patient contact.", docs: [], scope: S.kit },
    { m: /Clinell|ISO Wipes|Iso Wipes|^Actichlor|^Cleaning/, what: "Cleaning and disinfecting equipment after each patient.", docs: [], scope: S.kit },
    { m: /./, what: "", docs: [], scope: S.none }
  ];
  function key(it) { return it.name + " | " + (it.desc || ""); }
  function lookup(it, sectionId) {
    var k = key(it);
    for (var i = 0; i < R.length; i++) {
      var r = R[i];
      if (r.sec && r.sec.indexOf(sectionId) < 0) continue;
      if (r.m.test(k)) return r;
    }
    return R[R.length - 1];
  }
  /* link to the document's PDF; the two Cardiac Arrest PDFs export blank, so they have no link */
  function url(code) {
    var base = "https://clinical.saambulance.sa.gov.au/assets/";
    if (FILES[code]) return base + "files/" + encodeURIComponent(FILES[code]);
    if (code === "CPP-002-AO" || code === "CPP-043-AO" || !DOCS[code]) return null;
    return base + "pdf/home/" + encodeURIComponent(DOCS[code] + " - AO") + ".pdf";
  }
  return { docs: DOCS, review: REVIEW, scopes: S, lookup: lookup, rules: R, url: url };
})();
