/* Setting up training nights - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), section 9 (Training sessions and lessons: Your cluster,
   Setting up your training nights, Sessions and courses, Lessons), as of 21 November 2026 (course text updated 25 Nov
   2026: Team training no longer makes courses). Screenshots are of
   /training/ (leader view) filled with INVENTED teams, people and sessions (see .claude/status/microlearning.md).
   Quiz, quick checks and the practical were written by Claude from the guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  next: { href: "../leaders-relief/", title: "Relief cover", eyebrow: "Next: Team Leader module 5 of 6" },
  title: "Training nights",
  subtitle: "Team Leader microlearning",
  headline: "A whole year of nights, in one go",
  lead: "Set up a team's training nights for the year in Team training, with the school and public holidays left out. Then give each night a lesson, and add or remove single nights as plans change.",
  minutes: 10,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(section 9)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented people and sessions. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, section 9 (21 November 2026). If Team training changes, the guide is updated first."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Setting up your training nights" } },
      { text: "Training is run in Team training, at dsytraining.com/training (Team training on the dashboard). As a leader you see two tabs, Calendar and Lessons." },
      { text: "Every picture on this page uses invented people and sessions." }
    ] },

    { title: "Your cluster", blocks: [
      { image: { src: "img/calendar.jpg", alt: "Team training Calendar tab with cluster chips, the Set up training nights and Add one session buttons, and team filters", caption: "The Calendar tab opens on your own cluster" } },
      { text: "The app opens on your own cluster. The cluster chips show the others, but another cluster's sessions are view only (a notice says whose they are). Lessons are one shared library for everyone." }
    ] },

    { title: "Set up the nights", blocks: [
      { image: { src: "img/plan-form.jpg", alt: "The Set up training nights form: team, who the nights are for, first night, repeat, last date, start and finish times", caption: "Set up training nights" } },
      { tiles: { title: "Four choices", numbered: true, items: [
        { title: "Team", text: "On Calendar, tap Set up training nights, then choose the team." },
        { title: "Who it's for", text: "Team Leader visits (leader-led, with you as facilitator) or Team training (team-led; choose the facilitator later by opening each night)." },
        { title: "Dates", text: "The first night (the nights repeat on that weekday), how often (every week, fortnightly, every third or fourth week) and the last date (it starts at the end of that school year)." },
        { title: "Times", text: "Set the start and finish. Location is optional." }
      ] } },
      { box: { title: "Who are the nights for?", items: [
        "Team Leader visits: leader-led, with you as facilitator",
        "Team training: team-led. Choose the facilitator later by opening each night."
      ], check: { q: "You want the Cummins crew to run their own nights. Which do you choose, and who leads?", a: "Team training. The nights are team-led; you choose the facilitator later by opening each night." } } }
    ] },

    { title: "Check the dates", blocks: [
      { image: { src: "img/plan-dates.jpg", alt: "The list of dates: most marked New, some crossed through with Already has a session or a school holiday", caption: "Dates left out are crossed through, with the reason" } },
      { box: { title: "What the list does", items: [
        "SA school holidays and public holidays are left out, unless you untick them.",
        "Every date is listed. The ones left out are crossed through, with the reason.",
        "Nights the team already has are kept as they are.",
        "When it looks right, tap Create sessions."
      ], check: { q: "Tue 2 March shows \"Already has a session\". What happens to that night when you tap Create sessions?", a: "Nothing. Nights the team already has are kept as they are; only the dates marked New are created." } } }
    ] },

    { title: "Alternate weeks", blocks: [
      { text: "To do your visits and the team's training on alternate weeks, set up your visits first, then set up team training starting one week later." },
      { image: { src: "img/calendar-after.jpg", alt: "The Cummins calendar alternating Leader-led and Team-led nights each week, each marked Needs lesson or Needs topic", caption: "Visits and team training, week about" } }
    ] },

    { title: "Lessons for each night", blocks: [
      { image: { src: "img/session.jpg", alt: "An open session with two lessons chosen in order, an Add a lesson list, and Save session and Delete session buttons", caption: "Open a session to choose its lessons" } },
      { steps: [
        { t: "Open the night", text: "Tap it in the calendar." },
        { t: "Add lessons", text: "Choose from Add a lesson. A session can have several, in order; Remove takes one off." },
        { t: "Save session", text: "The night now shows Lesson set." }
      ] },
      { text: "The dashboard counts sessions in the next 4 weeks that have no lesson. Tap the count to go straight to them." },
      { box: { title: "Also on an open session", items: [
        "Bookings, and Attendance: tick each person who came",
        "Reflection: your notes on how it went. Members never see them.",
        "The Lessons tab is the library: New lesson adds one, and Use this lesson in adds it to a session."
      ] } }
    ] },

    { title: "Adding and removing nights", blocks: [
      { image: { src: "img/one.jpg", alt: "The Add one session form: team, date, who it's for, times and location", caption: "Add one session, for a single extra night" } },
      { image: { src: "img/delete.jpg", alt: "Delete this session? Its bookings and attendance are removed too. This cannot be undone.", caption: "Delete session asks first" } },
      { box: { title: "Delete session", tone: "no", items: [
        "Removes the night's bookings and attendance too",
        "Can't be undone"
      ] } },
      { text: "Team training is only for team training nights. The Ambulance Responder course has its own pages: AR course, at the bottom of the dashboard." }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "Where do you start setting up a team's nights for the year?", options: ["Dashboard, Crewing gaps", "Team training, Calendar, Set up training nights", "The People page"], answer: 1,
        why: "On Calendar, tap Set up training nights." },
      { q: "Team Leader visits are…", options: ["Team-led, facilitator chosen later", "Leader-led, with you as facilitator", "Open to every cluster"], answer: 1,
        why: "Team Leader visits are leader-led, with you as facilitator." },
      { q: "You pick Tuesday 2 February as the first night. Which day do the other nights fall on?", options: ["Tuesdays", "Whichever day you choose for each", "The team's usual night"], answer: 0,
        why: "The nights repeat on the first night's weekday." },
      { q: "Which repeat is NOT offered?", options: ["Every week", "Every third week", "Monthly on the 1st"], answer: 2,
        why: "Every week, fortnightly, every third or fourth week." },
      { q: "What does the last date start at?", options: ["31 December", "The end of that school year", "Six months after the first night"], answer: 1,
        why: "The last date starts at the end of that school year. You can change it." },
      { q: "Which dates are left out unless you untick them?", options: ["SA school holidays and public holidays", "Weekends", "Days with crewing gaps"], answer: 0,
        why: "SA school holidays and public holidays are left out unless you untick them." },
      { q: "You want visits and team training on alternate weeks. What do you do?", options: ["Set up team training first, then your visits", "Set up your visits first, then team training starting one week later", "Use Add one session for every night"], answer: 1,
        why: "Set up your visits first, then set up team training starting one week later." },
      { q: "How many lessons can one session have?", options: ["One only", "Several, in order", "None: lessons are for courses"], answer: 1,
        why: "Open a session to choose its lessons (a session can have several, in order)." },
      { q: "What else goes when you delete a session?", options: ["Nothing else", "Its bookings and attendance", "The whole team's sessions"], answer: 1,
        why: "Delete session removes its bookings and attendance too, and can't be undone." },
      { q: "Can you change another cluster's sessions?", options: ["Yes, any leader can", "No: they're view only", "Only lessons"], answer: 1,
        why: "Another cluster's sessions are view only. Only its own leader (or the lead instructor) can change them." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "10 min", blocks: [
      { steps: [
        { t: "Plan, don't create", text: "Open Set up training nights for one of your teams. Pick a first night and look at the list of dates. Tap Back to calendar if you're not ready to create them." },
        { t: "Holidays", text: "Find a date crossed through for a school holiday. Untick Leave out SA school holidays and watch it come back." },
        { t: "Lessons", text: "Open the next night with Needs lesson and add a lesson from the library. Save session." },
        { t: "Dashboard", text: "Check the dashboard's count of sessions with no lesson in the next 4 weeks." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: training sessions and lessons", href: "/userguides/leaders/#training" },
        { label: "Your dashboard (module 1)", href: "../leaders-dashboard/" },
        { label: "Open Team training", href: "/training/" }
      ] }
    ] }
  ]
};
