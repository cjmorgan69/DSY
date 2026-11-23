/* Your team page - Team Leader microlearning. Content only: the layout lives in ../shared/module.js.
   Source: the DSY Team Leader guide (/userguides/leaders/), section 9, "Team pages: banner photo and photo slides", as
   of 21 November 2026. Screenshots are of /teams/ and /region/ with INVENTED data; the photos in them are Wikimedia
   Commons town photos (credited in footerNotes). Quiz, quick checks and the practical were written by Claude from the
   guide, for the owner to review. */
var M = window.MODULE = {
  flow: true,
  draft: false,
  next: { href: "/userguides/leaders/", title: "Team Leader guide", eyebrow: "All 6 modules done", text: "The full detail on every page, plus the ones used now and then: contribution, dispatch, AR course." },
  title: "Your team page",
  subtitle: "Team Leader microlearning",
  headline: "What your crew sees when they sign in",
  lead: "Each team has a Team Page that members see when they sign in. Give it a banner photo, a few photo slides, and the information and links your crew need.",
  minutes: 8,
  protocol: { code: "Team Leader guide", source: "the DSY", name: "(section 9, team pages)" },
  relatedCodes: [],
  disclaimer: "Training resource for DSY Team Leaders. The screenshots use invented information. The Team Leader guide has the full detail.",
  footerNotes: ["Taken from the DSY Team Leader guide, section 9 (21 November 2026). If the pages change, the guide is updated first.",
    "Photos in the screenshots, from Wikimedia Commons: Coffin Bay channel by Jack Stradling (CC BY 3.0); Lady Kinnaird anchor, Port Neill, by Takver (CC BY-SA 3.0); Streaky Bay jetty by Bahnfrend (CC BY-SA 4.0)."],

  panels: [
    { title: "Introduction", open: true, blocks: [
      { video: { src: "intro.mp4", poster: "intro-poster.jpg", title: "Your team page" } },
      { text: "The Team Page (dsytraining.com/teams) shows a banner photo behind the team name, the Training schedule and Learn on your own buttons, photo slides to swipe through, About the team, and links." },
      { image: { src: "img/team-after.jpg", alt: "A Coffin Bay team page with a banner photo, buttons, the next training, photo slides, About Coffin Bay and a links list", caption: "A finished team page (invented details)" } }
    ] },

    { title: "Open the editor", blocks: [
      { steps: [
        { t: "From the team page", text: "Open your team's page and tap Edit this page (leaders only)." },
        { t: "Or from the Region page", text: "Open the Region page (/region/) and tap Edit page on the team's tile." }
      ] },
      { image: { src: "img/region-tile.jpg", alt: "A team tile on the Region page with Team page, Roster, Training and Edit page buttons", caption: "Region page: Edit page on the team's tile" } }
    ] },

    { title: "Banner photo", blocks: [
      { image: { src: "img/form-banner.jpg", alt: "The banner photo part of the editor: Choose a banner photo, a preview with the team name, the Move the photo slider and Remove banner photo", caption: "Choose a banner photo, then move it if needed" } },
      { box: { title: "Banner photo", items: [
        "Choose a photo to put it behind the team name. It replaces the town photo DSY put there.",
        "Wrong part showing (a head cut off)? Drag the Move the photo slider until the preview looks right. It saves when you let go.",
        "Remove banner photo takes it off."
      ], check: { q: "Your new banner cuts off everyone's heads. What do you do?", a: "Drag the Move the photo slider until the preview looks right. It saves when you let go." } } }
    ] },

    { title: "Photo slides", blocks: [
      { image: { src: "img/form-slides.jpg", alt: "Photo slides in the editor: two photos, each with a caption box and Move up or Remove buttons, and Add slide photos", caption: "Photo slides: captions, Move up and Remove" } },
      { steps: [
        { t: "Add slide photos", text: "Choose one or more photos to add them." },
        { t: "Caption", text: "Each one can have a caption." },
        { t: "Order", text: "Move up changes the order; Remove takes one out." }
      ] }
    ] },

    { title: "Words and links", blocks: [
      { image: { src: "img/form-top.jpg", alt: "The top of the editor: About this team, Roster link, Policies, procedures and links, and the Save team page button", caption: "About this team, roster link and links" } },
      { box: { title: "What saves when", items: [
        "About this team, the roster link and the links list: tap Save team page.",
        "Photos save as soon as they upload."
      ], check: { q: "You've typed a new About this team, and uploaded a banner. What still needs saving?", a: "The words: tap Save team page. Photos save as soon as they upload." } } },
      { text: "Links go one per line, as name | address. For example: Roster guide | /userguides/rosters/" }
    ] },

    { title: "Photos to use", blocks: [
      { box: { title: "Before you upload", tone: "warn", items: [
        "JPG, PNG or WebP, up to 10 MB each.",
        "Only use photos you took or have permission to use.",
        "Check that crews and patients are happy to be in them."
      ] } }
    ] },

    { title: "Knowledge check", blocks: [{ quiz: { intro: "Questions from the Team Leader guide. Pick an answer for each, then check.", questions: [
      { q: "Who sees the Team Page?", options: ["Only leaders", "Members, when they sign in", "Anyone on the internet"], answer: 1,
        why: "Each team has a Team Page (/teams/) that members see when they sign in." },
      { q: "How do you open the editor?", options: ["Team page: Edit this page, or Region page: Edit page on the team's tile", "Dashboard: Tasks", "Grant access"], answer: 0,
        why: "Open your team's page and tap Edit this page. Or open the Region page and tap Edit page on the team's tile." },
      { q: "What happens to the town photo when you choose a banner photo?", options: ["Both show", "Your photo replaces it", "The town photo becomes a slide"], answer: 1,
        why: "Choose a photo to put it behind the team name. It replaces the town photo DSY put there." },
      { q: "When does a change on the Move the photo slider save?", options: ["When you tap Save team page", "When you let go", "Overnight"], answer: 1,
        why: "Drag the Move the photo slider until the preview looks right; it saves when you let go." },
      { q: "How do you change the order of the photo slides?", options: ["Move up", "Delete and re-upload them", "Rename the files"], answer: 0,
        why: "Move up changes the order and Remove takes one out." },
      { q: "Which needs Save team page?", options: ["A new banner photo", "New photo slides", "About this team, the roster link and the links"], answer: 2,
        why: "About this team, the roster link and the links list are in the same form: tap Save team page for those. Photos save as soon as they upload." },
      { q: "Which photo is OK to upload?", options: ["Any photo from the internet", "A photo you took, where the crew are happy to be in it", "A photo of a patient at a job"], answer: 1,
        why: "Only use photos you took or have permission to use, and check that crews and patients are happy to be in them." },
      { q: "What's the size limit for each photo?", options: ["2 MB", "10 MB", "No limit"], answer: 1,
        why: "Photos must be JPG, PNG or WebP, up to 10 MB each." }
    ] } }] },

    { title: "Try it", optional: true, collapsed: true, chip: "10 min", blocks: [
      { steps: [
        { t: "Look first", text: "Open your team's page as your crew sees it. What's missing?" },
        { t: "Banner", text: "Add a banner photo you took, and move it until the team name reads well." },
        { t: "Slides", text: "Add two or three slides from recent training, with captions. Check everyone in them is happy." },
        { t: "Words", text: "Write a short About this team: where you meet and who to ask. Tap Save team page." }
      ] },
      { note: "Suggested activities written for training. Check them with your lead instructor." }
    ] },

    { title: "Further reading", optional: true, collapsed: true, blocks: [
      { links: [
        { label: "Team Leader guide: your team page", href: "/userguides/leaders/#team-pages" },
        { label: "Open your team page", href: "/teams/" },
        { label: "Region page", href: "/region/" }
      ] }
    ] }
  ]
};
