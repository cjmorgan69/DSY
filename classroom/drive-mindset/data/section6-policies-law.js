// DRiVE Section 6: Understanding Policies, Procedures and the Law. Slide content condensed to dot points from the eLearning lesson
// (Moodle lesson id 28318, 18 pages). The section number is a guess: change it if SAAS numbers it differently.
// Facilitator notes ("notes") are suggestions drafted from the lesson text: edit freely.
// The lesson gives only key points of each policy or procedure (it says to read them in full). Document cover images were not carried over.
// This content is a summary of SAAS policies and the law as the lesson gives it. Check the current documents before teaching it as fact.
(function () {
  function vid(id, hash) { return { id: id, hash: hash, length: '' }; }
  var readFull = 'The lesson gives key points only and says learners must read the full document, which is also needed for the Theory Assessment.';

  DRIVE_SECTIONS.push({
    id: 'section6-policies-law',
    number: 6,
    title: 'Policies, Procedures and the Law',
    audience: 'Volunteer, Career and External Clients',
    elearningMinutes: 30,
    slides: [
      {
        type: 'title',
        title: 'DRiVE Principles and Knowledge',
        subtitle: 'Section 6: Understanding Policies, Procedures and the Law',
        lines: ['Volunteer, Career and External Clients'],
        notes: {
          time: 1,
          say: ['This section covers the SAAS policies and procedures that matter to drivers, and the law on emergency driving.'],
          tip: 'The lesson gives no time, so 30 minutes is an estimate. ' + readFull
        }
      },
      {
        type: 'video',
        title: 'Introduction to policies, procedures and the law',
        vimeo: vid('863440908', 'fbeb97ac89'),
        notes: { time: 3, videoSummary: null }
      },
      {
        type: 'statement',
        kicker: 'Your responsibility',
        text: 'Know your responsibilities under SAAS policies and procedures.',
        sub: 'You are expected to read and understand the documents that follow. These slides are a short summary of the DRiVE-relevant points, not the full context.',
        notes: { time: 1, say: [readFull] }
      },

      /* ---------- Policies ---------- */
      {
        type: 'bullets',
        title: 'POL-022: Driver Responsibilities and Requirements',
        points: [
          'Be correctly licensed to drive SAAS vehicles',
          'Drive in a professional manner at all times',
          'Undertake training as required',
          'Show your driver’s licence to a manager on request, at any time, under the Drivers Licence Audit procedure (PRO-181)',
          'Use seatbelts at all times in the front of the vehicle',
          'Use all vehicle safety devices as required'
        ],
        notes: { time: 2, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'POL-035: Zero blood alcohol and zero illegal drug levels when driving',
        points: [
          'Applies when driving any SAAS vehicle, marked or unmarked, for any business or operational need',
          'Drive with a zero blood alcohol level',
          'Drive with a zero saliva level of any illegal drug',
          'Don’t drive under the adverse influence of any prescription drug'
        ],
        notes: {
          time: 2,
          ask: ['How would you know a prescription drug might affect your driving? Who would you ask?'],
          tip: readFull
        }
      },
      {
        type: 'bullets',
        title: 'PRO-181: Drivers Licence Audit',
        points: [
          'Keep a valid licence at all times',
          'If your licence is suspended or cancelled, or restrictions are placed on it, tell your team leader or manager immediately'
        ],
        notes: { time: 1, tip: readFull }
      },

      /* ---------- Emergency driving and reversing ---------- */
      {
        type: 'bullets',
        title: 'PRO-055: Emergency Driving',
        points: [
          'What you need to claim an exemption from an Australian Road Rule',
          'How to claim a defence to a charge under the Road Traffic Act',
          'Offences under the Criminal Law Consolidation Act',
          'The behaviour expected of a person driving an emergency vehicle',
          'Safety equipment that must be used in different emergency drives and driving activities',
          'Speed considerations for different driving events',
          'Guidance on on-road manoeuvres that may differ from normal driving',
          'What to do if you witness a crash caused by someone else (a “causal factor” crash)'
        ],
        notes: {
          time: 3,
          say: ['This is the key procedure for emergency driving. The lesson only lists what it covers.'],
          tip: 'The page title in the lesson does not show the number. PRO-055 is taken from the siren page of the Introduction to SAAS Vehicles lesson. ' + readFull
        }
      },
      {
        type: 'bullets',
        title: 'PRO-072: Reversing Vehicles',
        points: [
          'Do all you can to reduce reverse driving',
          'The driver must ask the attendant to help with the reverse if the attendant is not involved in patient care',
          'The attendant in the front has an obligation to help even if not asked',
          'Windows down; don’t turn off the reverse beeper unless being guided back in an enclosed space',
          'Always reverse slowly and use all aids, including extra lighting',
          'Don’t move the vehicle if you are uncertain'
        ],
        notes: { time: 3, ask: ['When has a reverse manoeuvre gone wrong, or nearly, for you?'], tip: readFull }
      },

      /* ---------- Fatigue ---------- */
      {
        type: 'bullets',
        title: 'PRO-104: Driving and Fatigue',
        points: [
          'All staff must comply',
          'Know the signs of fatigue and how to report it',
          'Long-distance driving = a single journey of more than two continuous hours',
          'Each two continuous hours of driving by the same driver is broken by a break of at least 15 minutes',
          'On operational ambulance work the driver and attendant should rotate so no one drives more than two hours consecutively. In almost all cases it is clinically appropriate for a crew to share primary patient care',
          'No one should drive more than eight total hours (excluding breaks) in any 24 hour period'
        ],
        notes: {
          time: 3,
          ask: ['What would you do on a long transfer when your partner is just as tired as you?'],
          tip: readFull
        }
      },

      /* ---------- Other procedures ---------- */
      {
        type: 'bullets',
        title: 'PRO-240: Processing of Expiation Notices and Alleged Driving Offences',
        points: [
          'Client Relations compares the SACAD record and the Patient Clinical Record (if needed) with the expiation notice',
          { t: 'They check it falls within these criteria:', sub: ['A confirmed emergency tasking in SACAD, as per PRO-055', 'Warning devices active in accordance with ARR 306', 'Speed within PRO-055 (no more than 30 km/h over the posted limit)', 'Red light camera activation at less than 20 km/h into the intersection', 'Not a rail crossing controlled by an activated red light'] },
          'All criteria met: Client Relations seeks an exemption from SAPOL under ARR 306, and records are stored',
          'One or more not met: the notice is referred to the driver to explain, or the driver can ask for it to be reissued to them personally using the Expiation Notice Declaration Form (ENDF)'
        ],
        notes: { time: 4, ask: ['Why do the records and the warning devices matter after the event?'], tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-105: Approved Rendezvous Points in Country',
        points: [
          'Know the agreed locations in your working area',
          { t: 'Criteria for a rendezvous point:', sub: ['Ground as flat as possible underfoot and for wheeling the stretcher', 'Adequate parking for two ambulance vehicles', 'A reasonably safe distance from the main road'] }
        ],
        notes: { time: 2, activity: 'Suggested: list the approved rendezvous points in your area and check them against the three criteria.', tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-053: Damage to private property',
        points: [
          'Tell property owners about any damage caused during duty, wherever possible',
          'Contact the SDM immediately after any property damage',
          'Complete an IRQA after any property damage',
          'Give documents to Building Services to complete insurance claim forms as required'
        ],
        notes: { time: 2, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-158: Incident Report and Quick Assessment (IRQA)',
        points: [
          'The IRQA form is used to report all incidents',
          'Contact the SDM for a report number',
          'Complete the form before the end of the shift',
          'Once sections 1 and 2 are filled in, save a copy and email it with any attachments or additional forms to WHS Health (SAASOHSIncidents@sa.gov.au), and to your Line Manager or Team Leader and, optionally, the Health and Safety Representative, as soon as possible'
        ],
        notes: { time: 2, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-357: Infection Prevention and Control',
        points: [
          'Clean the ambulance interior and equipment routinely between uses, and whenever soiled with dirt or debris',
          'It is an essential part of standard precautions in infection control',
          'Cleaning uses water, detergent or wipes, and friction to physically remove material from surfaces'
        ],
        notes: { time: 1, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-199: Assistance Dog Transport',
        points: [
          'Supported by the Disability Discrimination Act 1992 (DDA) section 23(a): unlawful to refuse a person with a disability access to or use of premises. SAAS includes patient-carrying ambulances',
          'Move the rear attendant seat as far forward as possible. Prompt the dog to jump up and sit behind the attendant seat',
          'Tether using the SAAS tether (rear door locker) to the dog’s harness (first choice) or collar, and to the Douglas tracking in the floor',
          'Accredited assistance dogs in South Australia have an identity card the handler can be asked to show'
        ],
        notes: { time: 3, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-202: Safe Storage of Patient Luggage and Equipment',
        points: [
          { t: 'Non-wheeled fold-up walker', sub: ['Secure it behind the front passenger’s seat, winding the seat back onto the frame without damaging the frame or the interior'] },
          { t: '4-wheeled walker', sub: ['Fold it and secure it on the vacant rear attendant airway seat, handles facing away from the driver', 'Put a sheet on the seat first and secure with the seat belt, plus an additional metal buckle belt to the seat back'] },
          { t: 'Other equipment and belongings', sub: ['At the rear of the vehicle, secure with the cargo net in the Douglas tracking'] }
        ],
        notes: { time: 3, tip: readFull }
      },
      {
        type: 'bullets',
        title: 'PRO-094 and PRO-060: Daily Operational Requirements (1)',
        points: [
          'Log in correctly via the MDT',
          'Complete vehicle checks as per local arrangements',
          'When dispatched, call on air via MDT or GRN as soon as practical: expected within 60 seconds for all priority 1 to 4 dispatches',
          'Clean the vehicle inside and outside; preferably do a “Routine” clean at end of shift handover'
        ],
        notes: {
          time: 2,
          tip: 'The lesson shows two overlapping blocks of points, which look like the Career (PRO-060) and Volunteer (PRO-094) versions run together. Confirm which applies to your group before teaching it. ' + readFull
        }
      },
      {
        type: 'bullets',
        title: 'PRO-094 and PRO-060: Daily Operational Requirements (2)',
        points: [
          'Fuel at handover: at least 1/2 tank for metro crews, 3/4 for country crews',
          'Log in correctly; do vehicle checks at the start of the shift',
          'Acknowledge a dispatch page immediately via MDT or GRN radio. Priority 1 and 2 must be acknowledged on both GRN radio and MDT',
          'Acknowledgement within 1 minute for priority 1 to 4, and 2 minutes for all other cases',
          'On-call crews may not reach mobile in 1 minute from the page but must respond within 5 minutes'
        ],
        notes: {
          time: 2,
          tip: 'This second block is from the same lesson page as the previous slide. Confirm which of these points apply to Volunteer crews and which to Career crews. ' + readFull
        }
      },
      {
        type: 'video',
        title: 'Work health and safety',
        vimeo: vid('853590016', '8fe076d620'),
        notes: { time: 3, tip: 'The lesson page has only this video and no text.', videoSummary: null }
      },

      /* ---------- Road Traffic Act ---------- */
      {
        type: 'bullets',
        title: 'Road Traffic Act sections 45 and 46: exemption versus defence',
        points: [
          'Many driving offences are not exempt for an emergency vehicle driver',
          { t: 'These offences cannot be dealt with by an exemption under ARR 306:', sub: ['Section 45: careless driving', 'Section 45A: excessive speed', 'Section 46: reckless and dangerous driving'] },
          'Instead, a defence may apply if you are charged under any of them'
        ],
        notes: { time: 3, ask: ['What is the difference between an exemption and a defence?'] }
      },
      {
        type: 'numbered',
        title: 'To claim a defence you have to prove three things',
        items: [
          '(a) You were carrying out your duties as an emergency worker, and',
          '(b) You were acting in accordance with the directions of your employing authority, and',
          '(c) You were acting reasonably in the circumstances as you believed them to be'
        ],
        callout: { text: 'If you drive outside SAAS policy and procedures, you are not following a direction of your employing authority, and you may not be able to claim a defence.' },
        notes: {
          time: 3,
          say: ['This is why the policies and procedures matter: they sit behind your legal defence.']
        }
      },

      /* ---------- Australian Road Rules ---------- */
      {
        type: 'bullets',
        title: 'ARR 306: emergency vehicle exemption',
        points: [
          'The law that lets emergency vehicle drivers use emergency provisions',
          { t: 'It has 3 key requirements:', sub: ['The driver is taking reasonable care, and', 'It is reasonable that the rule should not apply, and', 'If the vehicle is a moving motor vehicle, it is displaying a blue or red flashing light or sounding an alarm'] },
          'All of these must be considered for every emergency driving decision'
        ],
        notes: { time: 3, ask: ['Which of the three requirements is the hardest to judge in the moment?'] }
      },
      {
        type: 'bullets',
        title: 'What is “reasonable”?',
        points: [
          'It is no good causing stress, damage or injury to other people just to get to a patient. We owe a duty of care to everyone on the road',
          'Negligence is a tort: someone with a duty of care fails to act reasonably and another person suffers injury, loss or damage',
          { t: 'We should not affect the safety of:', sub: ['Our partners and work colleagues', 'Other people on the road', 'Other people or property in road related areas'] },
          'Forcing another road user to swerve off the road or brake hard could be seen as not reasonable'
        ],
        callout: { text: 'We can’t say what is reasonable for every situation. With a zero-harm mindset, your actions will most likely be seen as reasonable.' },
        notes: { time: 3, activity: 'Suggested: give two driving scenarios and ask the group to decide whether each would be seen as reasonable, and why.' }
      },
      {
        type: 'bullets',
        title: 'Right of way, ARR 78 and 79',
        points: [
          '“Right of way” is a common externalising excuse for unsafe driving',
          'Under the Australian Road Rules there is no right of way, only an obligation to give way',
          'Being in an emergency vehicle does NOT give you right of way, even with red and blue lights. Others should give way to you, but it does not give you the right of way',
          { t: 'Rule 78: keeping clear of police and emergency vehicles', sub: ['A driver must not move into the path of an approaching emergency vehicle', 'If already in its path, move out as soon as it is safe'] },
          { t: 'Rule 79: giving way to police and emergency vehicles', sub: ['Give way to an emergency vehicle displaying a flashing blue or red light or sounding an alarm: if stopped, stay stationary until it is safe to proceed; otherwise slow down and, if necessary, stop to avoid a collision'] }
        ],
        notes: {
          time: 4,
          say: ['These two rules apply to the other driver “despite any other rule” and can confuse other road users, as we see regularly during emergency driving.'],
          ask: ['A car is stopped at a red light with you behind it. Should it move or stay still? What would you do?'],
          tip: 'Never force others into risky manoeuvres or you may breach ARR 306 (reasonable).'
        }
      },
      {
        type: 'bullets',
        title: 'ARR 305 and 307',
        points: [
          { t: 'ARR 307: stopping and parking exemption', sub: ['Part 12 provisions do not apply to a police or emergency vehicle driver if the driver is taking reasonable care and it is reasonable that the provision should not apply', 'Only use it when parking at a dispatched case'] },
          { t: 'ARR 305', sub: ['An emergency driving exemption for the Police only. It is equivalent to ARR 306 and has some further exemptions only police can use'] }
        ],
        notes: { time: 2, ask: ['Is parking across a driveway at a dispatched job covered by ARR 307? What about at the shops after the job?'] }
      },
      {
        type: 'bullets',
        title: 'Lane choice, ARR 129 and 130',
        points: [
          'Un-laned road: drive as near as practical to the left side',
          'Multi-lane road with a speed limit over 80 km/h: keep to the left',
          'Multi-lane road with a “keep left unless overtaking” sign: keep to the left',
          'On a dual-lane carriageway, drive in lane 2 (right lane) as much as possible. On other multi-lane roads, use the lane giving the best vision to the left and right',
          'Take corners as wide as possible for a stable platform: use outside lanes if legal, or position wide in your lane',
          '“Smoother” is not a reasonable excuse if the law makes using an outside lane an offence. If you must, consider whether you can claim an exemption under ARR 306'
        ],
        notes: { time: 3 }
      },
      {
        type: 'bullets',
        title: 'Seat belts, ARR 264 to 267',
        points: [
          'Follow SAAS operational policy and procedures, the road laws in the RTA and ARR, and WHS legislation, for your own safety and your passengers’ and patients’',
          'Exemptions may exist, but SAAS staff do not go unrestrained unless carrying out a lifesaving intervention in the rear of the vehicle',
          { t: 'Fit it correctly:', sub: ['Low on the hips and low across the shoulder', 'Flat with no twists', 'Firm'] }
        ],
        notes: { time: 2, activity: 'Suggested: have each person check their partner’s seat belt fit in the vehicle.' }
      },
      {
        type: 'bullets',
        title: 'Mobile phones, ARR 300',
        points: [
          'It is an offence to use a handheld mobile phone while driving',
          'SAAS phones sit in a cradle fixed to the vehicle. The driver must not take the phone out of the cradle unless the vehicle is parked',
          'An emergency worker could claim an exemption in some circumstances, but SAAS policy is: the driver may only use a SAAS-issued mobile phone fitted into a hands-free vehicle kit when operationally essential or related to a patient’s clinical condition',
          'The driver must not use any function of a personal mobile phone while driving'
        ],
        notes: { time: 2, ask: ['What counts as “operationally essential”? Who decides?'] }
      },
      {
        type: 'statement',
        kicker: 'Section 6 complete',
        text: 'Congratulations on completing Understanding Policies, Procedures and the Law.',
        sub: 'Read the full policies and procedures: they are needed for the Theory Assessment.',
        notes: {
          time: 2,
          say: ['Recap: policies and procedures protect you and the public, and they back up your legal defence. ARR 306 needs reasonable care and reasonable use, and there is no right of way, only a duty to give way.'],
          tip: 'Add a link to the next section here when you add it.'
        }
      }
    ]
  });
})();
