/* Your dashboard - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), sections 1 (signing in), 2 (the dashboard), 3 (tasks),
   4 (Ask DSY) and 7 (dispatch), as of 21 November 2026. Screenshots are of /dashboard/ filled with invented data
   (no real people, jobs or rosters): made with a stand-in for the database, see video-src/ and .claude/status/microlearning.md.
   Quiz, quick checks and the practical were written by Claude from the guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  title: "Your dashboard",
  subtitle: "Team Leader microlearning",
  headline: "Your whole day, on one screen",
  lead: "The Team Leader dashboard brings the roster, your tasks, training, dispatch and the weather together. This module shows you what each part means and what to do about it.",
  minutes: 10,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(sections 1 to 4 and 7)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented people and jobs. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, sections 1 to 4 and 7 (21 November 2026). If the dashboard changes, the guide is updated first."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Your Team Leader dashboard" } },
      { text: "The dashboard is at dsytraining.com/dashboard. It refreshes itself every 10 minutes, or tap ↻ Refresh to refresh now." },
      { text: "Every picture on this page uses invented people and jobs." }
    ] },

    { title: "Getting there", blocks: [
      { image: { src: "img/hero.jpg", alt: "The top of the dashboard: greeting, clock and buttons for DSY home, My Google Calendar, Training app and Refresh", caption: "The top of the dashboard" } },
      { steps: [
        { t: "Sign in", text: "Use your ambulance ID and password. It's the same account as the training app." },
        { t: "Open the dashboard", text: "Signed in as a leader, the home page shows Dashboard and Grant access links." },
        { t: "Save it to your phone", text: "In Safari tap Share, then Add to Home Screen." }
      ] },
      { box: { title: "Buttons along the top", items: [
        "DSY home and Training app",
        "📅 My Google Calendar. Tap ⚙︎ beside it to paste your own calendar link. It's saved to your DSY account, so it works on any device, and only you see it.",
        "↻ Refresh"
      ] } },
      { text: "On a computer, the widescreen version is at /dashboard/wide/. Each version links to the other at the bottom. The leader pages (Crewing gaps, Relief cover, Roster emails, Grant access, AR course, Retro car dash) are linked along the bottom too." }
    ] },

    { title: "Roster today", blocks: [
      { text: "Every team's roster for today, one row per team and one square per hour. The number in a square is how many crew are booked. This hour is outlined." },
      { image: { src: "img/roster.jpg", alt: "Roster today: counts of teams crewed now, cluster chips, and a grid of coloured squares for each team and hour", caption: "Roster today. Lock has no crew this morning." } },
      { box: { title: "What the colours mean", items: [
        "Green: 2 or more crew",
        "Yellow: 1 crew",
        "Red: no crew"
      ], check: { q: "Port Neill's squares are yellow from 8am to 6pm. What does that tell you?", a: "Only one crew member is booked for each of those hours. Tap a square to see who it is." } } },
      { image: { src: "img/on-shift.jpg", alt: "On shift at 21:00: a card for each team listing who is on, their level and finish time", caption: "Tap a square to see who's on at that hour" } },
      { steps: [
        { t: "Tap a square", text: "You see who is on at that hour: name, level, flexibility and finish time." },
        { t: "Back to now", text: "Returns to the current hour." },
        { t: "Team names", text: "Open that team's roster. Operations overview → opens the full operations screen." }
      ] },
      { text: "Use the cluster chips to look at one cluster. To find gaps over the next 8 days against your own rules, use Crewing gaps (linked at the bottom of the dashboard)." }
    ] },

    { title: "Your tasks", blocks: [
      { image: { src: "img/tasks.jpg", alt: "Task list with an overdue task in red and a task due tomorrow in amber", caption: "Red: overdue. Amber: due soon." } },
      { steps: [
        { t: "Add", text: "Type the task in Add a task, pick a due date if you want one, and tap Add." },
        { t: "Done", text: "Tick the box." },
        { t: "Change or delete", text: "Tap the words to change them. Tap × to delete." }
      ] },
      { box: { title: "Who sees your tasks", items: [
        "Only you. Other leaders can't see your list.",
        "A relief Team Leader covering for you does see your tasks while the cover lasts.",
        "Show done lists the last 20 finished tasks."
      ] } },
      { text: "Siri quick add: \"Hey Siri, DSY task\", then say the task. It needs an iPhone Shortcut with your own private key: ask the lead instructor to set one up." }
    ] },

    { title: "Training sessions", blocks: [
      { image: { src: "img/training.jpg", alt: "Training sessions: the next session, a warning that 2 of 7 sessions have no lesson, and a four-week calendar", caption: "Yellow bars and the warning show sessions that still need a lesson" } },
      { box: { title: "What it shows", items: [
        "The next session",
        "A 4-week calendar for your cluster",
        "How many sessions in the next 4 weeks have no lesson yet"
      ], check: { q: "The panel says \"2 of 7 sessions in the next 4 weeks have no lesson\". What do you do?", a: "Tap the count. It opens the training app, where you choose a lesson for each of those sessions." } } },
      { text: "The Lessons tile at the bottom opens the lesson library in the training app." }
    ] },

    { title: "Dispatch and weather", blocks: [
      { image: { src: "img/dispatch.jpg", alt: "Dispatch for the last 7 days: job counts and a row of ambulance icons for each day", caption: "Dispatch · last 7 days" } },
      { box: { title: "Dispatch", items: [
        "Jobs paged across the Eyre Peninsula in the last 7 days. Full dispatch screen → has the detail.",
        "Port Lincoln (PL) and Ceduna (CD) crews are hidden when the page opens. The button in the panel shows them.",
        "Jobs on the team leader call sign (CO) show as \"Team leader\".",
        "The list is copied from the pager feed by a scheduled run. If the newest job looks old, tell the lead instructor."
      ] } },
      { image: { src: "img/weather.jpg", alt: "Seven-day weather for Tumby Bay with Friday flagged hot and windy", caption: "A hot and windy day is flagged" } },
      { box: { title: "Weather", tone: "warn", items: [
        "Tap a town chip to change the town.",
        "A hot and windy day is flagged: check the CFS for fire danger and the BOM for warnings."
      ] } }
    ] },

    { title: "Ask DSY", blocks: [
      { image: { src: "img/ask.jpg", alt: "Ask DSY answering how to hand over to a relief Team Leader, with steps and a link to the guide", caption: "Ask DSY answers from the guides and links to the part it used" } },
      { text: "Ask DSY answers \"how do I…?\" questions about the DSY site, from the Team Leader guide and the roster guide only. If the guides don't cover something, it says so: ask the lead instructor then." },
      { box: { title: "Not for", tone: "no", items: [
        "Clinical or protocol questions: use the SAAS clinical site and app",
        "Patient details or other private information: never type them in"
      ], check: { q: "A crew member asks you a GTN dose question. Can Ask DSY help?", a: "No. Ask DSY doesn't answer clinical or protocol questions. Use the SAAS clinical site and app, or the EOC Clinician." } } },
      { box: { title: "Good to know", items: [
        "Answers are written by AI (Claude). Check anything important on the page itself.",
        "It remembers the last few questions while the page is open, so you can ask a follow-up. Start again clears it.",
        "Up to 40 questions a day. Questions and answers are kept so the lead instructor can improve the guide."
      ] } }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "On Roster today, what does a yellow square mean?", options: ["No crew booked", "1 crew booked", "2 or more crew booked"], answer: 1,
        why: "Green = 2 or more crew, yellow = 1, red = none." },
      { q: "How do you see who is on at 9 tonight?", options: ["Open each team's roster", "Tap the square for that hour", "Ask DSY"], answer: 1,
        why: "Tap a square to see who is on at that hour (name, level, flexibility and finish time). Back to now returns to the current hour." },
      { q: "Who can see your task list?", options: ["Every Team Leader", "Only you, plus a relief Team Leader while they cover for you", "The whole team"], answer: 1,
        why: "Other leaders can't see your tasks. A relief Team Leader covering for you does, while the cover lasts." },
      { q: "A task has a red date. What does that mean?", options: ["It's overdue", "It's due soon", "It's urgent"], answer: 0,
        why: "Overdue tasks show a red date; tasks due soon show an amber date." },
      { q: "The training panel counts sessions with no lesson. How far ahead does it look?", options: ["1 week", "4 weeks", "6 months"], answer: 1,
        why: "It counts sessions in the next 4 weeks that have no lesson yet. Tap the count to fix them in the training app." },
      { q: "Which jobs are hidden when the dispatch panel opens?", options: ["Priority 1 jobs", "Port Lincoln and Ceduna crews' jobs", "Team leader jobs"], answer: 1,
        why: "Jobs run by Port Lincoln (PL) and Ceduna (CD) crews are hidden when the page opens. A button in the panel shows them." },
      { q: "The weather flags Friday as hot and windy. What should you check?", options: ["The CFS fire danger and BOM warnings", "Nothing, it's only a forecast", "The roster for Friday only"], answer: 0,
        why: "A hot and windy day is flagged: check the CFS for fire danger and the BOM for warnings." },
      { q: "Which question should NOT go to Ask DSY?", options: ["How do I reset a volunteer's password?", "What's the adrenaline dose for a 20 kg child?", "How do I set up relief cover?"], answer: 1,
        why: "Ask DSY doesn't answer clinical or protocol questions. Use the SAAS clinical site and app." },
      { q: "How often does the dashboard refresh itself?", options: ["Every minute", "Every 10 minutes", "Only when you tap Refresh"], answer: 1,
        why: "It refreshes itself every 10 minutes; tap ↻ Refresh to refresh now." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "5 min", blocks: [
      { steps: [
        { t: "Home Screen", text: "Add the dashboard to your phone's Home Screen." },
        { t: "Who's on tonight", text: "Tap tonight's 9pm square for one of your teams. Then tap Back to now." },
        { t: "One task", text: "Add a task with a due date of tomorrow. Tick it off when it's done." },
        { t: "Lessons", text: "Check the training panel. If any session has no lesson, tap the count and pick one." },
        { t: "Ask DSY", text: "Ask it one \"how do I…?\" question you've wondered about." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: the dashboard", href: "/userguides/leaders/#dashboard" },
        { label: "Team Leader guide: tasks", href: "/userguides/leaders/#tasks" },
        { label: "Team Leader guide: Ask DSY", href: "/userguides/leaders/#ask" },
        { label: "Open the dashboard", href: "/dashboard/" }
      ] }
    ] }
  ]
};
