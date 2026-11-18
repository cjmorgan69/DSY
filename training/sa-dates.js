/* South Australian school holidays (government schools) and public holidays, used by the training app's
   "Set up training nights" panel to leave those dates out. Added 18 Nov 2026.
   Sources: 2026 from weare.sa.gov.au; 2027 from several third-party calendars that agree (the Department for Education
   page could not be read); 2028 Terms 1-3 from the Department for Education listing. Term 4 2028 is not published
   here yet: dates after knownUntil are not checked for school holidays, and the panel says so.
   Add each new year here when the department publishes it, then run node .claude/tools/stamp.js. */
window.SA_DATES = {
  knownUntil: "2028-09-29",
  schoolHolidays: [
    ["2026-09-26", "2026-10-11", "Spring school holidays"],
    ["2026-12-12", "2027-01-26", "Summer school holidays"],
    ["2027-04-10", "2027-04-25", "Autumn school holidays"],
    ["2027-07-03", "2027-07-18", "Winter school holidays"],
    ["2027-09-25", "2027-10-10", "Spring school holidays"],
    ["2027-12-11", "2028-01-30", "Summer school holidays"],
    ["2028-04-14", "2028-04-30", "Autumn school holidays"],
    ["2028-07-08", "2028-07-23", "Winter school holidays"],
    ["2028-09-30", "2028-09-30", "Spring school holidays"]
  ],
  /* the last day of the school year, offered as the default last date */
  yearEnd: { "2026": "2026-12-11", "2027": "2027-12-10", "2028": "2028-09-29" },
  publicHolidays: {
    "2026-12-24": "Christmas Eve", "2026-12-25": "Christmas Day", "2026-12-28": "Proclamation Day", "2026-12-31": "New Year's Eve",
    "2027-01-01": "New Year's Day", "2027-01-26": "Australia Day", "2027-03-08": "Adelaide Cup Day",
    "2027-03-26": "Good Friday", "2027-03-27": "Easter Saturday", "2027-03-28": "Easter Sunday", "2027-03-29": "Easter Monday",
    "2027-04-25": "Anzac Day", "2027-06-14": "King's Birthday", "2027-10-04": "Labour Day",
    "2027-12-24": "Christmas Eve", "2027-12-25": "Christmas Day", "2027-12-27": "Christmas Day holiday", "2027-12-28": "Proclamation Day", "2027-12-31": "New Year's Eve",
    "2028-01-01": "New Year's Day", "2028-01-03": "New Year's Day holiday", "2028-01-26": "Australia Day", "2028-03-13": "Adelaide Cup Day",
    "2028-04-14": "Good Friday", "2028-04-15": "Easter Saturday", "2028-04-16": "Easter Sunday", "2028-04-17": "Easter Monday",
    "2028-04-25": "Anzac Day", "2028-06-12": "King's Birthday", "2028-10-02": "Labour Day"
  }
};
