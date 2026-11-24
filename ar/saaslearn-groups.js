/* saaslearn (Moodle) station groups, for the skill sign-off navigator (/ar/signoff/) and the induction checklist
   (/ar/course/). saaslearn numbers its groups separately in every course, so each course has its own numbers.
   Collected by the owner with the group finder (/ar/signoff/groups/) on 24 Nov 2026, from each course's grader report.
   Stations: the 15 volunteer stations in the FNWC Recruit to AR course, plus Wudinna (an Eyre Peninsula team that is
   not a group in the FNWC course). To add a region later: run the finder on each course, add the station to STATIONS
   and its number to every course below. A station with no number in a course opens that course unfiltered. */
(function () {
  "use strict";
  var STATIONS = ["Cleve", "Coffin Bay", "Cowell", "Cummins", "Elliston", "Hawker", "Kimba", "Leigh Creek", "Lock",
    "Port Kenny", "Port Neill", "Quorn", "Roxby Downs", "Streaky Bay", "Tumby Bay", "Wudinna"];

  // Group numbers per course, in STATIONS order (null = no group for that station in the course).
  var COURSES = {
    fnwc:   { id: 743, name: "FNWC Recruit to Ambulance Responder Course",
              g: [44931, 44926, 44936, 44935, 44928, 44937, 44934, 44940, 44939, 44929, 44932, 44938, 44933, 44927, 44930, null] },
    fa:     { id: 642, name: "First Aid and AA Protocols",
              g: [29746, 29747, 29749, 29750, 29711, 29712, 29717, 29768, 29718, 29738, 29759, 29766, 29725, 29765, 29693, 29762] },
    manual: { id: 39, name: "Manual Tasks - Volunteer",
              g: [24811, 1749, 2030, 2568, 4342, 3229, 3637, 27008, 4466, 619, 3759, 3725, 1596, 17283, 1196, 3629] },
    opprep: { id: 59, name: "Operational Preparedness",
              g: [24812, 1750, 2031, 2569, 1591, 3230, 3638, 27009, 4467, 620, 3760, 3726, 1262, 17284, 1203, 3630] },
    opsafe: { id: 63, name: "Operational Safety",
              g: [24816, 1755, 2036, 2574, 1594, 3235, 3643, 27013, 4472, 624, 3765, 3731, 1266, 17288, 1207, 3635] },
    found:  { id: 550, name: "Foundations of Care (AR)",
              g: [15972, 15924, 15928, 15927, 15969, 15931, 26602, 30539, 15941, 15963, 15965, 15815, 15976, 15954, 15829, 15987] },
    cardiac: { id: 88, name: "Cardiac Arrest Management (AR)",
              g: [33553, 33549, 33575, 33592, 33538, 33585, 33567, 33594, 33588, 33547, 33555, 33582, 33531, 33571, 33548, 33591] },
    resus:  { id: 61, name: "SAAS Resuscitation and AA Protocols",
              g: [24815, 1754, 2035, 2573, 1593, 3234, 3642, 27012, 4471, 623, 3764, 3730, 1265, 17287, 1206, 3634] },
    medical: { id: 89, name: "Medical Conditions (AR)",
              g: [11160, 4996, 10929, 4995, 4968, 4992, 26597, 30540, 2017, 4975, 4969, 8738, 2020, 4971, 2002, 4993] },
    stress: { id: 62, name: "Stress Management",
              g: [24813, 1751, 2032, 2570, 1595, 3231, 3639, 27010, 4468, 621, 3761, 3727, 1263, 17285, 1204, 3631] }
  };

  // Which course each checklist module's skills live in. DRiVE and Traumatic Injuries were not in the owner's lists:
  // they use the FNWC course until confirmed.
  var MODULES = {
    "Infection Prevention and Control": "fnwc",
    "First Aid and AA Protocols": "fa",
    "Manual Tasks": "manual",
    "Operational Preparedness": "opprep",
    "DRiVE Volunteer Practical Assessments": "fnwc",
    "Foundations of Care": "found",
    "Cardiac Arrest Management": "cardiac",
    "SAAS Resuscitation and AA Protocols": "resus",
    "Medical Conditions": "medical",
    "Traumatic Injuries": "fnwc"
  };

  function group(courseKey, station) {
    var c = COURSES[courseKey], i = STATIONS.indexOf(station);
    return c && i > -1 ? c.g[i] || null : null;
  }
  window.SAASLEARN = {
    stations: STATIONS,
    courses: COURSES,
    modules: MODULES,
    group: group,
    groupForModule: function (module, station) { return group(MODULES[module] || "fnwc", station); }
  };
})();
