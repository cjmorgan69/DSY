/* People and passwords - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), section 10 (Grant access and passwords) and section 9
   (People: putting someone in a team or course), as of 21 November 2026. Screenshots are of /access/ and the training
   app's People tab filled with INVENTED people and IDs (see .claude/status/microlearning.md).
   Quiz, quick checks and the practical were written by Claude from the guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  next: { href: "../leaders-gaps/", title: "Crewing gaps", eyebrow: "Next: Team Leader module 3 of 6" },
  title: "People and passwords",
  subtitle: "Team Leader microlearning",
  headline: "Who can sign in, and which team they're in",
  lead: "Add ambulance IDs to the approved list so people can make a DSY account, put them in the right team, and reset a password when someone is locked out.",
  minutes: 10,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(sections 9 and 10)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented people and IDs. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, sections 9 and 10 (21 November 2026). If the pages change, the guide is updated first."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Adding people, and resetting passwords" } },
      { text: "Only people whose ambulance ID is on the approved list can make a DSY account. Grant access, at dsytraining.com/access (on the home page and at the bottom of the dashboard), is where leaders manage that list." },
      { text: "Every picture on this page uses invented people and IDs." }
    ] },

    { title: "Adding IDs", blocks: [
      { image: { src: "img/add.jpg", alt: "Add IDs: two IDs with names typed in, Add as Student, Team Cummins, and the Add to the list button", caption: "Add IDs, with a name after each" } },
      { tiles: { title: "Four steps", numbered: true, items: [
        { title: "Paste the IDs", text: "Under Add IDs, one per line or separated by commas. Or choose a CSV file (ID in the first column, name in the second)." },
        { title: "Add the name", text: "After the ID: 12345, Sam Taylor. Sign-up asks only for the ID and a password, so the account takes the name you enter here." },
        { title: "Role and team", text: "Add as Student or Facilitator, and the Team they belong to (or No team)." },
        { title: "Add to the list", text: "They can now sign up on the sign-in page with that ID." }
      ] } },
      { box: { title: "Who joins the team, and when", items: [
        "Someone who has already signed up joins the team straight away.",
        "Someone who hasn't signed up yet shows under Not signed up yet, and joins the team automatically when they sign up.",
        "Anyone added without a name is asked for it once, straight after signing up."
      ], check: { q: "You add 42533 for Cummins with no name. What happens when that person signs up?", a: "They sign up with just the ID and a password, are asked for their name once straight after, and join Cummins automatically." } } }
    ] },

    { title: "The list", blocks: [
      { image: { src: "img/waiting.jpg", alt: "The list filtered to Not signed up yet, showing three people with their team and the status Not signed up yet", caption: "Filter: Not signed up yet" } },
      { box: { title: "Filters and buttons", items: [
        "Filter by Everyone, Not signed up yet, Facilitators or Switched off.",
        "The Team column shows each person's teams. For someone signed up, Add to a team puts them in another team.",
        "For someone not signed up yet, change the team in the box.",
        "You can only choose teams in your own cluster."
      ] } },
      { image: { src: "img/person.jpg", alt: "A person's page in the training app with a tick box for each team; the Central Eyre teams are greyed out", caption: "Training app, People tab: tick or untick each team" } },
      { text: "To take someone off a team, use the training app: People tab, tap the person, then untick the team under Teams and courses. Each tick saves straight away." }
    ] },

    { title: "Password resets", blocks: [
      { image: { src: "img/reset.jpg", alt: "Reset password open on a row, with a temporary password typed in and a Set password button", caption: "Reset password, then type a temporary one" } },
      { steps: [
        { t: "Reset password", text: "On /access/, or on the person's page in the training app (People tab)." },
        { t: "Temporary password", text: "Type one with 8 or more characters, and tell the person." },
        { t: "Their own", text: "They sign in with it and are asked to choose their own straight away." }
      ] },
      { image: { src: "img/reset-done.jpg", alt: "Message: Done. Tell Ben Okafor to sign in with ID 41207 and the password Tumby-2026. They will then choose their own.", caption: "The page tells you what to pass on" } },
      { box: { title: "Keep passwords private", tone: "no", items: [
        "Never post a password in a group chat or team messages.",
        "Volunteers can't reset their own password (there's no email on file), so a leader does it.",
        "Only the lead instructor can reset another leader's password."
      ], check: { q: "A crew member messages the team chat: \"Locked out, can someone reset me?\" What do you do?", a: "Reset it on Grant access (or their People page) with a temporary password of 8 or more characters, and tell them directly, never in the group chat. They choose their own when they sign in." } } }
    ] },

    { title: "Switching an account off", blocks: [
      { image: { src: "img/off.jpg", alt: "The list filtered to Switched off, showing one person with the status Switched off and an Add back button", caption: "Remove switches the account off" } },
      { text: "Remove switches the account off: they can no longer sign in. Add them back to switch it on again." }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "Who can make a DSY account?", options: ["Anyone with the link", "Only people whose ambulance ID is on the approved list", "Anyone with a SAAS email"], answer: 1,
        why: "Only people whose ambulance ID is on the approved list can make a DSY account." },
      { q: "Why add the name with the ID?", options: ["It isn't needed", "Sign-up asks only for the ID and a password, so the account takes the name you enter", "So the person gets an email"], answer: 1,
        why: "Sign-up asks only for the ID and a password: the account takes the name you entered here." },
      { q: "How do you add a batch of IDs from a spreadsheet?", options: ["Type them one at a time only", "Choose a CSV file: ID in the first column, name in the second", "Email them to the lead instructor"], answer: 1,
        why: "Or choose a CSV file (ID in the first column, name in the second)." },
      { q: "You add someone to Cummins who hasn't signed up yet. When do they join the team?", options: ["When you tick them in the training app", "Automatically, when they sign up", "Never: add them again later"], answer: 1,
        why: "Someone who hasn't signed up yet joins the team automatically when they sign up." },
      { q: "Where do you take someone off a team?", options: ["Grant access: Remove", "Training app: People tab, untick the team", "The dashboard"], answer: 1,
        why: "Take people off a team in the training app, People tab. Remove on Grant access switches the whole account off." },
      { q: "How long must a temporary password be?", options: ["4 or more characters", "6 or more characters", "8 or more characters"], answer: 2,
        why: "Type a temporary password (8 or more characters) and tell the person." },
      { q: "What happens when they sign in with the temporary password?", options: ["They keep it", "They are asked to choose their own straight away", "It expires in a week"], answer: 1,
        why: "They sign in with it and are asked to choose their own straight away." },
      { q: "Can volunteers reset their own password?", options: ["Yes, by email", "No: there's no email on file, so a leader does it", "Only on a computer"], answer: 1,
        why: "Volunteers can't reset their own password (there's no email on file), so a leader does it." },
      { q: "What does Remove do?", options: ["Deletes all their training records", "Switches the account off so they can't sign in", "Takes them off one team"], answer: 1,
        why: "Remove switches the account off (they can no longer sign in); add them back to switch it on again." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "5 min", blocks: [
      { steps: [
        { t: "Who's waiting?", text: "On Grant access, filter by Not signed up yet. Is anyone in your teams still to sign up? Remind them: dsytraining.com/signin." },
        { t: "Teams", text: "Check the Team column for your crew. Anyone missing a team?" },
        { t: "Practise a reset", text: "With a crew member beside you, reset their password and let them choose their own." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: Grant access, people and passwords", href: "/userguides/leaders/#access" },
        { label: "Open Grant access", href: "/access/" }
      ] }
    ] }
  ]
};
