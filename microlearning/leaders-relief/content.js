/* Relief cover - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), section 8 (Relief cover), and section 3 (a relief Team
   Leader sees your tasks), as of 21 November 2026. Screenshots are of /dashboard/relief/ and /dashboard/ (as the relief
   Team Leader) with INVENTED leaders and tasks. Quiz, quick checks and the practical were written by Claude from the
   guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  title: "Relief cover",
  subtitle: "Team Leader microlearning",
  headline: "Going on leave? Hand over to a relief Team Leader",
  lead: "Relief cover hands your leader access to a relief Team Leader until an end date, so your teams keep a leader while you're away.",
  minutes: 6,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(section 8)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented leaders and tasks. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, section 8 (21 November 2026). If the page changes, the guide is updated first."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Relief cover" } },
      { text: "Relief cover is at dsytraining.com/dashboard/relief (Relief cover at the bottom of the dashboard)." },
      { text: "Every picture on this page uses invented leaders and tasks." }
    ] },

    { title: "Hand over", blocks: [
      { image: { src: "img/form.jpg", alt: "Hand over: a Relief Team Leader chosen, From and Until dates set, the lists of what they get and don't get, and Start cover", caption: "Choose the person, set the dates, Start cover" } },
      { steps: [
        { t: "Relief Team Leader", text: "Under Hand over, choose the Relief Team Leader." },
        { t: "Dates", text: "Set From and Until." },
        { t: "Start cover", text: "Tap Start cover and confirm." }
      ] }
    ] },

    { title: "What they get", blocks: [
      { box: { title: "They get, until the end date", items: [
        "Your dashboards and your task list",
        "Training for your cluster, with editing",
        "Volunteer contribution and dispatch",
        "Grant access and password resets"
      ] } },
      { box: { title: "They don't get", tone: "no", items: [
        "Your Google Calendar link",
        "Resetting a leader's password",
        "Making anyone a leader",
        "Handing the cover on to someone else"
      ], check: { q: "Your relief Team Leader is going away too, halfway through your cover. Can they hand it on to someone else?", a: "No. A relief Team Leader can't hand the cover on. You (or the lead instructor) set up cover for the next person." } } }
    ] },

    { title: "While they cover", blocks: [
      { image: { src: "img/banner.jpg", alt: "The relief Team Leader's dashboard banner: you're covering for Sam Taylor until Mon 28 Dec, 6:00 pm; their tasks are on your list", caption: "The relief Team Leader's dashboard shows a banner" } },
      { image: { src: "img/tasks.jpg", alt: "The relief Team Leader's task list, with the covered leader's tasks labelled Sam Taylor's", caption: "Your tasks are labelled with your name" } },
      { text: "A relief Team Leader covering for you also sees your tasks and can read your Crewing gaps rules while the cover lasts." }
    ] },

    { title: "Ending the cover", blocks: [
      { image: { src: "img/after.jpg", alt: "Your covers: an earlier cover that has ended, and a new one that starts Mon 14 Dec with an End now button", caption: "Your covers, with End now" } },
      { box: { title: "Ending", items: [
        "The cover ends by itself on the end date.",
        "You, the relief Team Leader or the lead instructor can end it early with End now (the relief Team Leader sees End my cover).",
        "The relief Team Leader may need to refresh an open page when it starts or ends."
      ], check: { q: "You're back from leave three days early. What do you do?", a: "Open Relief cover and tap End now on that cover. It would otherwise end by itself on the end date." } } }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "Where do you set up relief cover?", options: ["Grant access", "Relief cover, at the bottom of the dashboard", "The training app"], answer: 1,
        why: "/dashboard/relief/ (Relief cover at the bottom of the dashboard)." },
      { q: "Which of these does the relief Team Leader get?", options: ["Your Google Calendar link", "Training for your cluster, with editing", "Making someone a leader"], answer: 1,
        why: "They get your dashboards and task list, training for your cluster with editing, contribution and dispatch, and Grant access with password resets." },
      { q: "Can the relief Team Leader reset a volunteer's password?", options: ["Yes", "No", "Only with the lead instructor"], answer: 0,
        why: "They get Grant access and password resets. They don't get resetting a leader's password." },
      { q: "Can the relief Team Leader reset another leader's password?", options: ["Yes", "No"], answer: 1,
        why: "They don't get resetting a leader's password." },
      { q: "When does a cover end?", options: ["Only when you end it", "By itself on the end date, or earlier with End now", "After 7 days"], answer: 1,
        why: "The cover ends by itself on the end date. You, the relief Team Leader or the lead instructor can end it early." },
      { q: "How does the relief Team Leader know whose tasks are whose?", options: ["They can't tell", "Your tasks are labelled with your name", "Your tasks are hidden"], answer: 1,
        why: "While covering, the dashboard shows a banner and your tasks are labelled with your name." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "5 min", blocks: [
      { steps: [
        { t: "Before leave", text: "Agree with your relief Team Leader who covers and for which dates." },
        { t: "Hand over", text: "Set up the cover a few days early, so they can see it waiting under Your covers." },
        { t: "Tasks", text: "Tidy your task list: anything they'll need to do while you're away should have a clear title and a due date." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: relief cover", href: "/userguides/leaders/#relief" },
        { label: "Open Relief cover", href: "/dashboard/relief/" }
      ] }
    ] }
  ]
};
