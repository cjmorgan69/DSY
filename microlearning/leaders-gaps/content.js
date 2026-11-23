/* Crewing gaps - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), section 5 (Crewing gaps), as of 21 November 2026.
   Screenshots are of /dashboard/coverage/ with eight days of INVENTED rosters (see .claude/status/microlearning.md).
   Quiz, quick checks and the practical were written by Claude from the guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  next: { href: "../leaders-training-nights/", title: "Training nights", eyebrow: "Next: Team Leader module 4 of 6" },
  title: "Crewing gaps",
  subtitle: "Team Leader microlearning",
  headline: "Where your rosters fall below your own minimum",
  lead: "Crewing gaps checks the next 8 days of your teams' rosters against rules you set, and lists the hours that fall short. It only finds the gaps: you decide what to do about each one (paramedic cover or other support).",
  minutes: 10,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(section 5)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented rosters and people. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, section 5 (21 November 2026). If the page changes, the guide is updated first."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Crewing gaps" } },
      { text: "Crewing gaps is at dsytraining.com/dashboard/coverage (Crewing gaps at the bottom of the dashboard). It finds the hours in the next 8 days that don't meet your own rules." },
      { text: "Every picture on this page uses invented rosters and people." }
    ] },

    { title: "Setting your rules", blocks: [
      { image: { src: "img/rules.jpg", alt: "Your rules: a group named Tumby Bay and Port Neill with both teams ticked, minimum 2, gaps of 6 hours or more, and a list of levels with who counts", caption: "A group: teams checked together, a minimum, and who counts" } },
      { tiles: { title: "Five steps", numbered: true, items: [
        { title: "Add a group", text: "Tap + Add a group. A group is one or more teams checked together (for example two neighbouring towns), from your own cluster." },
        { title: "Minimum", text: "Set the minimum crew across the group (1 to 8)." },
        { title: "Who counts", text: "For each level (PARA, AO, AR, AA, REC): Counts, Only with a counted person in the same town, or Doesn't count." },
        { title: "Shortest gap", text: "Choose the shortest gap to list: any, or 1 to 12 hours." },
        { title: "Save rules", text: "Your rules are yours only. A relief Team Leader covering for you can read them." }
      ] } },
      { box: { title: "A new group starts with", items: [
        "Minimum 2",
        "PARA, AO and AR count",
        "AA only with one of those in the same town",
        "REC doesn't count",
        "Gaps of 6 hours or more"
      ], check: { q: "Cummins has an AA and a REC booked for the day shift, and nobody else. With the starting rules, how many count?", a: "None. The AA counts only with a PARA, AO or AR in the same town, and a REC doesn't count. That shift is a gap: 0 of 2." } } }
    ] },

    { title: "Reading the results", blocks: [
      { image: { src: "img/results.jpg", alt: "Results for Tumby Bay and Port Neill: 1 gap, 14 hours, a bar for each day with a red gap on Thursday night, the gap listed, a town with nobody counted, and Copy as text", caption: "One gap on Thursday night, and Port Neill with nobody counted on two nights" } },
      { box: { title: "For each group", items: [
        "The number of gaps and hours, a bar for each day, and each gap with who was booked.",
        "Gaps are counted by volunteer shift: Day 08:00–18:00 and Night 18:00–08:00. A gap that runs across several shifts is listed once for each shift it touches, marked \"Part of a longer gap\".",
        "Gaps that have already finished are left out."
      ] } },
      { image: { src: "img/who.jpg", alt: "A gap opened with Who's booked: Tumby Bay has one AO booked; Port Neill has nobody booked", caption: "Tap Who's booked to see who's on" } },
      { box: { title: "Towns and sharing", items: [
        "For groups of two or more teams, it also lists towns that have nobody counted in their own right.",
        "Today goes back to today.",
        "Copy as text copies the list to paste into a message or email."
      ], check: { q: "Your Tumby Bay and Port Neill group shows no gap on Wednesday night, but Port Neill is listed under \"nobody counted in their own right\". Why?", a: "Tumby Bay has 2 counted crew, so the group meets its minimum of 2. But Port Neill has nobody counted that night, so it's listed for the town." } } }
    ] },

    { title: "A single team", blocks: [
      { image: { src: "img/cummins.jpg", alt: "Results for Cummins on its own: 2 gaps, 24 hours, Friday day and Saturday night in red", caption: "A one-team group: Cummins" } },
      { text: "A group can be one team on its own. Then the minimum must be met inside that town." }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "How far ahead does Crewing gaps look?", options: ["Today only", "The next 8 days", "The next month"], answer: 1,
        why: "It finds the hours in the next 8 days that don't meet your own rules." },
      { q: "What does Crewing gaps do about a gap?", options: ["Books paramedic cover", "Messages the team", "Nothing: it only finds the gaps, and you decide"], answer: 2,
        why: "It only finds the gaps: you decide what to do about each one (paramedic cover or other support)." },
      { q: "What is a group?", options: ["One or more teams checked together", "A cluster", "A shift"], answer: 0,
        why: "A group is one or more teams checked together (for example two neighbouring towns)." },
      { q: "In a new group, how does an AA count?", options: ["Always counts", "Only with a PARA, AO or AR in the same town", "Never counts"], answer: 1,
        why: "A new group starts with PARA, AO and AR counting, AA only with one of those in the same town, REC not counting." },
      { q: "What's the starting minimum and shortest gap?", options: ["1 crew, any gap", "2 crew, gaps of 6 hours or more", "3 crew, gaps of 12 hours or more"], answer: 1,
        why: "A new group starts with minimum 2 and gaps of 6 hours or more." },
      { q: "When is the day shift?", options: ["06:00 to 18:00", "08:00 to 18:00", "07:00 to 19:00"], answer: 1,
        why: "Gaps are counted by volunteer shift: Day 08:00–18:00 and Night 18:00–08:00." },
      { q: "Who can see your rules?", options: ["Every Team Leader", "Only you, and a relief Team Leader covering for you can read them", "The crews"], answer: 1,
        why: "Your rules are yours only; a relief Team Leader covering for you can read them." },
      { q: "How do you share the list of gaps?", options: ["Screenshot only", "Copy as text, then paste into a message or email", "It emails itself"], answer: 1,
        why: "Copy as text copies the list to paste into a message or email." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "10 min", blocks: [
      { steps: [
        { t: "Your groups", text: "Set up a group for each set of towns that cover each other, and one for any town that stands alone." },
        { t: "Who counts", text: "Check the levels for each group. Is the starting rule right for those towns?" },
        { t: "This week", text: "Look at the gaps for the next 8 days. Open Who's booked on one of them." },
        { t: "Share", text: "Copy the list as text and paste it into a note to yourself." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: crewing gaps", href: "/userguides/leaders/#gaps" },
        { label: "Open Crewing gaps", href: "/dashboard/coverage/" },
        { label: "Your dashboard (module 1)", href: "../leaders-dashboard/" }
      ] }
    ] }
  ]
};
