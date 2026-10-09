# Course App

A phone-friendly page where students book workshops and see their progress, and the
facilitator marks the roll. All data lives in one Google Sheet.

- `index.html` – the app (hosted free on GitHub Pages)
- `config.js` – where you paste the link to your sheet's web app
- `apps-script/Code.gs` – the code you paste into the Google Sheet

Until `config.js` has a link in it, the app runs in demo mode with example data.

## Set up (about 15 minutes)

### 1. The Google Sheet
1. Create a new Google Sheet. Check **File > Settings > Time zone** is your own.
2. **Extensions > Apps Script**. Delete what is there, paste in all of `apps-script/Code.gs`, and save.
3. Reload the sheet. A **Course App** menu appears after a few seconds.
4. **Course App > 1. Set up sheet**. Google asks you to authorise the script the first time
   (you may need to choose *Advanced > Go to project*; that warning is normal for your own script).
   Say yes to example rows if you want something to try straight away.
5. **Course App > 2. Set facilitator passcode** (8 or more characters).

### 2. Publish the sheet's web app
1. In the Apps Script editor: **Deploy > New deployment**, type **Web app**.
2. *Execute as*: **Me**. *Who has access*: **Anyone**. Deploy.
3. Copy the **Web app URL** (it ends in `/exec`).

"Anyone" only means anyone can reach the sign-in. Nothing is returned without a valid
access code or the facilitator passcode. The sheet itself stays private to you.

### 3. The GitHub repo
1. Put `index.html` and `config.js` in the repo.
2. Paste the web app URL into `config.js` between the quotes after `apiUrl:`.
3. Repo **Settings > Pages > Deploy from a branch**, choose your branch and folder. Your app link
   appears there after a minute.

## Running the course

**Students** – add a row per student in the Students tab (cohort, first name, last name; email is
optional). Then **Course App > Fill in IDs and access codes for new rows**. Give each student their
six-character access code and the app link. To remove someone's access, set their status to
`inactive` or change their code.

**Workshops** – add a row per session in the Workshops tab: cohort, day_number, name, date,
start time, location and capacity (leave capacity blank for no limit). Then run the same menu item
to give it an ID. If a day is offered on more than one date, add a row for each date with the same
day_number; a student books one of them.

**Cohort** is just a label such as `2026`. Students see the workshops that have their cohort label.

**Progress** counts the course days a student has been marked present for.

Bookings and Attendance fill themselves in. You can read, sort and correct them in the sheet.

**Can't make a day** – if a student can't make any date offered for a day, they tap *Can't make any of
these dates?* under that day and can add a short note. It shows at the top of the facilitator's
Workshops screen and is marked *Can't attend* on that day's roll. Add another date for that day in the
Workshops tab; when the student books it, they drop off the list. **Clear** removes someone by hand.
These notes are kept in the Unavailable tab, which the sheet adds the first time a student sends one.

## Changing the code later
After pasting a new `Code.gs`: **Deploy > Manage deployments > edit (pencil) > Version: New version
> Deploy**. The web app URL stays the same.

## Limits
- Built for one facilitator and a handful of cohorts of 5–30 students.
- Students stay signed in on their phone for 90 days; the facilitator for 12 hours.
- Ten wrong sign-in attempts in ten minutes pauses all sign-ins for ten minutes.
