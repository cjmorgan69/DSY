---
name: saaslearn-id-list
description: List the students of a saaslearn.com.au (Moodle) course with their station (Moodle group) and user number (the id= in the link on their name). Use when the owner asks for an ID list, user numbers or student stations for a course, for example the FNWC Recruit to Ambulance Responder course. Read-only.
---

# saaslearn ID list

Reads the Participants page of a Moodle course through Claude in Chrome (the owner's real Chrome, already signed in).
Needs the PC on, Chrome open and the Claude in Chrome extension connected. If the tools say the extension is not
connected, say so and stop. Read pages only: change nothing, click nothing that saves.

## Steps

1. Load the Chrome tools in one ToolSearch call (see the chrome-browser skill), then `tabs_context_mcp`, and work in a new tab.
2. The site lives under `/moodle/`. `https://saaslearn.com.au/my/` and `/my/courses.php` give 404.
3. Find the course id: open `https://saaslearn.com.au/moodle/course/search.php?search=<words from the course name>`
   and read the `course/view.php?id=` link. The FNWC Recruit to Ambulance Responder Course is `id=743`.
4. Open the Participants page with everything shown and students only (URL parameters do the "show all" and
   "filter to students"):
   `https://saaslearn.com.au/moodle/user/index.php?id=<course id>&perpage=5000&roleid=5`
   Check the page says how many participants were found (37 for course 743 on 21 Nov 2026).
5. Run JavaScript on the page. For every row of `table#participants tbody tr`, take the link
   `a[href*="user/view.php"]`: name = link text, user number = `new URL(a.href).searchParams.get('id')`.
   Station = the text before "Volunteer Station" in the row (the Groups column). Filter to the stations asked for.
   - The tool blocks output that looks like a URL or query string. Return only name, station and the number
     (read from `searchParams`), never the whole href.
   - Keep the output short (long output is truncated): filter in the script rather than printing all rows.
   - Do not use the "ID number" column (values like 18443): that is not the user number.
   - The link also has `course=<id>`. That is the course, not the person.
   - Check digit lengths: a user number may have 3 digits (Denisha Thorne is 656). Print the characters of an
     odd-looking number to confirm it was not cut off.
5. Close the tab you opened.

## Output

A table, one line per student: name, station, number. Say how many students the course has in total and how many
are in the requested stations. The groups are called "<Town> Volunteer Station". The owner's usual four are Tumby Bay,
Cummins, Coffin Bay and Port Neill; if a station has nobody in it (Cummins had nobody on 21 Nov 2026), say so. Offer
all stations if the owner wants them.

The owner reads the numbers from the table, because the iPhone address bar does not show `id=`. Example link
for reference: `.../moodle/user/view.php?id=6491&course=743` (user 6491).
