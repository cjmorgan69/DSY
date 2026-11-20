"use strict";

/*
 * Supabase backend for the crew roster (stage 4 of the roster move,
 * 17 Nov 2026). Loaded before roster.js on teams whose teams.js entry
 * has backend: "supabase" (the test roster, Summer Bay, first).
 *
 * It answers the same requests the Apps Script does, in the same
 * shape, so roster.js is unchanged apart from a few "signed-in
 * instead of a password" switches:
 *   getBookings, addBooking, editBooking, cancelBooking,
 *   getRosterSubmission, markRosterSent, editRosterSubmission,
 *   resetRosterSent, getMessages, addMessage, deleteMessage,
 *   verifyManagerPassword
 *
 * Who you are comes from the site sign-in (/shared/gate.js), not a
 * typed name. Crew book for themselves. A roster manager or Team
 * Leader also gets "Booking for": any team member, or "Not on the
 * list" for a placeholder such as LEP40 (no ID, not counted in
 * volunteer hours). The database enforces all of this
 * (supabase/roster-stage1.sql, -stage3.sql, -stage4a.sql).
 *
 * Every shift is linked to the person's account. The roster shows
 * the name they choose ("Change the name shown"); if two people on a
 * roster show the same name, the later one gets "(2)".
 */
(function () {
    const config =
        (window.DSY_ROSTER_TEAMS || {})[window.DSY_ROSTER_TEAM_ID];

    if (!config || config.backend !== "supabase") return;

    const SUPABASE_URL = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
    const HOUR_MS = 3600000;
    const DAY_MS = 86400000;
    const COUNTRY_ROSTERING_EMAIL_MIN_HOURS = 24;
    const NOT_LISTED = "__not_listed__";
    const PRETEND_LIVE_KEY = "dsy-roster-pretend-live";

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let me = null;
    let hooks = null;
    let token = "";
    let acting = { kind: "me" };
    let lastSnapshot = null;
    const labelById = {};
    const idByLabel = {};
    const myMessageIds = new Set();
    // Booking id -> "Full Name (ambulance ID)", for the Country Rostering
    // document. Only managers and leaders are sent these by the database.
    const officialNames = {};

    client.auth.onAuthStateChange((event, session) => {
        token = session ? session.access_token : "";
    });

    function withTimeout(promise, timeoutMs) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error(
                "The roster request timed out. " +
                "Please refresh and check the roster before retrying."
            )), timeoutMs || 60000);

            promise.then(
                value => { clearTimeout(timer); resolve(value); },
                error => { clearTimeout(timer); reject(error); }
            );
        });
    }

    async function rpc(name, args, timeoutMs) {
        const result = await withTimeout(client.rpc(name, args || {}), timeoutMs);

        if (result.error) {
            const failure = new Error(
                result.error.code
                    ? result.error.message
                    : "Could not reach the roster. Check the connection."
            );

            // A coded error is the database refusing the request,
            // not a lost or timed-out one.
            failure.serverRejected = Boolean(result.error.code);
            throw failure;
        }

        return result.data;
    }

    /* A name for each person that is unique on this page. */
    function labelFor(id, name) {
        const base = String(name || "").trim() || "No name";
        const current = labelById[id];

        if (current && (current === base || current.startsWith(base + " ("))) {
            return current;
        }

        if (current) delete idByLabel[current.toLowerCase()];

        let label = base;
        let count = 2;

        while (idByLabel[label.toLowerCase()] && idByLabel[label.toLowerCase()] !== id) {
            label = base + " (" + count + ")";
            count += 1;
        }

        labelById[id] = label;
        idByLabel[label.toLowerCase()] = id;

        return label;
    }

    function placeholderLabel(name) {
        const base = String(name || "").trim();

        return idByLabel[base.toLowerCase()] ? base + " (guest)" : base;
    }

    const ready = (window.DSY_GATE ? window.DSY_GATE.ready : Promise.resolve())
        .then(() => client.auth.getSession())
        .then(result => {
            token = result?.data?.session?.access_token || "";

            return rpc("roster_me", { p_team: config.name });
        })
        .then(data => {
            me = data;
            labelFor(me.id, me.name);
            (me.members || []).forEach(member => labelFor(member.id, member.name));
            buildHeader();

            return me;
        });

    ready.catch(error => {
        showHeaderNote(error.message || "Could not sign you in to the roster.");
    });

    async function snapshot(timeoutMs) {
        await ready;

        const now = Date.now();
        const data = await rpc("roster_snapshot", {
            p_group: me.group_id,
            // Far enough back for the rolling 4-week hours.
            p_from: new Date(now - 36 * DAY_MS).toISOString(),
            p_to: new Date(now + 120 * DAY_MS).toISOString()
        }, timeoutMs);

        lastSnapshot = data;

        return {
            success: true,
            team: config.name,
            bookings: (data.bookings || []).map(row => {
                if (!row.placeholder && row.full_name) {
                    officialNames[row.id] = row.full_name +
                        (row.staff_id ? " (" + row.staff_id + ")" : "");
                }

                return {
                id: row.id,
                team: config.name,
                user: row.placeholder
                    ? placeholderLabel(row.name)
                    : labelFor(row.member_id, row.name),
                restriction: row.flexibility,
                clinicalLevel: row.clinical_level,
                start: new Date(row.starts_at).toISOString(),
                end: new Date(row.ends_at).toISOString(),
                createdAt: ""
                };
            }),
            rosterSubmission: submission(data)
        };
    }

    function submission(data) {
        if (!data || !data.sent_until) return null;

        return {
            team: config.name,
            sentUntil: new Date(data.sent_until).toISOString(),
            markedSentAt: data.marked_at || "",
            updatedAt: data.updated_at || ""
        };
    }

    /*
     * What the person is told after a change. While the cluster is on
     * trial nobody is asked to phone Country Rostering (owner).
     */
    function outcome(result, noticeIso) {
        const pretend = pretendLive();
        const trial = !pretend && (!lastSnapshot || lastSnapshot.trial);
        const requires = !trial && Boolean(result && result.requires_notification);
        const hoursAway = (Date.parse(noticeIso) - Date.now()) / HOUR_MS;

        return {
            requiresCentralNotification: requires,
            countryRosteringEmailed:
                requires &&
                (pretend || Boolean(lastSnapshot.cr_set)) &&
                hoursAway > COUNTRY_ROSTERING_EMAIL_MIN_HOURS
        };
    }

    /*
     * Test roster only (testTeam in teams.js), managers only: show the
     * messages a live cluster would show. It changes nothing in the
     * database: every email still goes to the trial address.
     */
    function pretendLive() {
        if (!config.testTeam || !me || !me.can_manage) return false;

        try {
            return localStorage.getItem(PRETEND_LIVE_KEY) === "1";
        } catch (error) {
            return false;
        }
    }

    async function messages(timeoutMs) {
        await ready;

        const rows = await rpc(
            "roster_messages_list", { p_group: me.group_id }, timeoutMs
        );

        myMessageIds.clear();

        return {
            success: true,
            team: config.name,
            messages: (rows || []).map(row => {
                if (row.mine) myMessageIds.add(String(row.id));

                return {
                    id: row.id,
                    team: config.name,
                    author: row.author,
                    text: row.body,
                    timestamp: new Date(row.created_at).toISOString(),
                    createdAt: new Date(row.created_at).toISOString()
                };
            })
        };
    }

    function requireManager() {
        if (!me.can_manage) {
            const refused = new Error(
                "Only this team's roster manager or Team Leader can do that."
            );
            refused.serverRejected = true;
            throw refused;
        }
    }

    async function call(action, payload, timeoutMs) {
        await ready;

        payload = payload || {};

        switch (action) {
            case "getBookings":
                return snapshot(timeoutMs);

            case "getRosterSubmission": {
                const data = await snapshot(timeoutMs);

                return {
                    success: true,
                    team: config.name,
                    rosterSubmission: data.rosterSubmission
                };
            }

            case "addBooking": {
                const result = await rpc("roster_book", {
                    p_request_id: payload.id,
                    p_group: me.group_id,
                    p_start: payload.start,
                    p_end: payload.end,
                    p_flexibility: payload.restriction || "N",
                    p_member: acting.kind === "member" ? acting.id : null,
                    p_placeholder: acting.kind === "placeholder" ? acting.name : null,
                    p_level: payload.clinicalLevel || null,
                    p_no_email: acting.kind === "placeholder" && quietPlaceholder()
                }, timeoutMs);

                return {
                    ...(await snapshot(timeoutMs)),
                    message: "Booking added.",
                    ...outcome(result, payload.start)
                };
            }

            case "editBooking": {
                const result = await rpc("roster_edit", {
                    p_id: payload.bookingId,
                    p_start: payload.start,
                    p_end: payload.end,
                    p_flexibility: payload.restriction || "N",
                    p_prev_start: payload.previousStart || null,
                    p_prev_end: payload.previousEnd || null
                }, timeoutMs);
                const earliest = [payload.previousStart, payload.start]
                    .filter(Boolean).sort()[0];

                return {
                    ...(await snapshot(timeoutMs)),
                    message: "Booking changed.",
                    ...outcome(result, earliest)
                };
            }

            case "cancelBooking": {
                const result = await rpc(
                    "roster_cancel", { p_id: payload.bookingId }, timeoutMs
                );

                return {
                    ...(await snapshot(timeoutMs)),
                    message: "Booking cancelled.",
                    ...outcome(result, result.shift.starts_at)
                };
            }

            case "markRosterSent":
            case "editRosterSubmission": {
                const editing = action === "editRosterSubmission";
                const saved = await rpc("roster_set_sent", {
                    p_group: me.group_id,
                    p_until: payload.sentUntil,
                    p_editing: editing
                }, timeoutMs);

                return {
                    success: true,
                    team: config.name,
                    message: editing
                        ? "Hard-copy sent cut-off updated."
                        : "Hard copy marked as sent up until the selected time.",
                    rosterSubmission: submission(saved)
                };
            }

            case "resetRosterSent":
                await rpc("roster_reset_sent", { p_group: me.group_id }, timeoutMs);

                return {
                    success: true,
                    team: config.name,
                    message: "Hard-copy sent status reset.",
                    rosterSubmission: null
                };

            case "getMessages":
                return messages(timeoutMs);

            case "addMessage":
                await rpc("roster_post_message", {
                    p_group: me.group_id,
                    p_body: payload.text,
                    p_request_id: payload.id || null
                }, timeoutMs);

                return messages(timeoutMs);

            case "deleteMessage":
                await rpc(
                    "roster_delete_message", { p_id: payload.messageId }, timeoutMs
                );

                return messages(timeoutMs);

            case "verifyManagerPassword":
                requireManager();

                return { success: true, team: config.name };

            default:
                throw new Error("Unknown roster request: " + action);
        }
    }

    /* ---------------------------------------------------------
     * Header: who is signed in, and (managers) who the booking is for
     * --------------------------------------------------------- */

    function showHeaderNote(text) {
        const status = document.getElementById("connectionStatus");

        if (status) {
            status.textContent = text;
            status.className = "connection-status error";
        }
    }

    function link(text, onClick) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = text;
        button.style.cssText =
            "background:none;border:0;padding:0;font:inherit;font-size:.82rem;" +
            "color:inherit;text-decoration:underline;cursor:pointer;opacity:.85";
        button.addEventListener("click", onClick);

        return button;
    }

    function quietPlaceholder() {
        const box = document.getElementById("placeholderNoEmail");

        return Boolean(box && box.checked);
    }

    function applyActing() {
        if (!hooks) return;

        if (acting.kind === "member") {
            const member = (me.members || []).find(item => item.id === acting.id);

            hooks.setIdentity(labelFor(acting.id, member?.name), member?.level || "");
        } else if (acting.kind === "placeholder") {
            hooks.setIdentity(placeholderLabel(acting.name));
        } else {
            hooks.setIdentity(labelFor(me.id, me.name), me.level || "");
        }
    }

    function buildHeader() {
        if (!hooks || !me || document.getElementById("rosterSignedIn")) return;

        const nameInput = hooks.nameInput;
        const section = nameInput.closest(".user-section");
        const label = section.querySelector("label");
        const box = document.createElement("div");

        box.id = "rosterSignedIn";
        box.style.cssText = "display:flex;flex-direction:column;gap:.3rem;min-width:0;flex:1 1 0";
        nameInput.style.display = "none";

        if (me.can_manage) {
            const select = document.createElement("select");
            const guest = document.createElement("input");

            label.textContent = "Booking for:";
            label.htmlFor = "actingSelect";
            select.id = "actingSelect";
            select.add(new Option("Me (" + labelFor(me.id, me.name) + ")", me.id));

            (me.members || [])
                .filter(member => member.id !== me.id)
                .forEach(member => {
                    select.add(new Option(
                        labelFor(member.id, member.name) +
                        (member.full_name && member.full_name !== member.name
                            ? " · " + member.full_name
                            : ""),
                        member.id
                    ));
                });

            select.add(new Option("Not on the list…", NOT_LISTED));

            guest.type = "text";
            guest.maxLength = 80;
            guest.placeholder = "Name or unit, e.g. LEP40";
            guest.hidden = true;
            guest.setAttribute("aria-label", "Name or unit not on the list");

            // Placeholder shifts Country Rostering already know about
            // (LEP40 etc.): book them without a change email.
            const quiet = document.createElement("label");
            quiet.id = "placeholderNoEmailRow";
            quiet.hidden = true;
            quiet.style.cssText =
                "display:flex;gap:.45rem;align-items:flex-start;font-size:.85rem;font-weight:normal";
            const quietBox = document.createElement("input");
            quietBox.type = "checkbox";
            quietBox.id = "placeholderNoEmail";
            quietBox.style.cssText = "width:auto;margin-top:.15rem";
            quiet.append(
                quietBox,
                document.createTextNode(
                    "Don't email Country Rostering (they already know about this shift)"
                )
            );

            select.addEventListener("change", () => {
                guest.hidden = select.value !== NOT_LISTED;
                quiet.hidden = select.value !== NOT_LISTED;

                if (select.value === NOT_LISTED) {
                    acting = { kind: "placeholder", name: guest.value.trim() };
                    guest.focus();
                } else if (select.value === me.id) {
                    acting = { kind: "me" };
                } else {
                    acting = { kind: "member", id: select.value };
                }

                applyActing();
            });

            guest.addEventListener("input", () => {
                acting = { kind: "placeholder", name: guest.value.trim() };
                applyActing();
            });

            box.append(select, guest, quiet);
        } else {
            const shown = document.createElement("strong");

            shown.textContent = labelFor(me.id, me.name);
            box.append(shown);
        }

        const links = document.createElement("div");

        links.style.cssText = "display:flex;flex-wrap:wrap;gap:.2rem .8rem";
        links.append(
            link("Change the name shown", changeName),
            link("Not you? Switch person", () => {
                location.href = "/signin/?out=1&next=" +
                    encodeURIComponent(location.pathname);
            })
        );
        box.append(links);
        box.append(buildReminderControls());
        section.append(box);

        const subtitle = document.getElementById("teamSubtitle");

        if (subtitle) {
            subtitle.textContent =
                config.name + " volunteer roster" + (config.testTeam ? " · test roster" : "");
        }

        if (!me.can_manage) {
            const panel = document.getElementById("managerControlsPanel");

            if (panel) panel.style.display = "none";
        } else {
            buildSendPanel();
            buildSchedulePanel();
            tidyManagerControls();

            if (config.testTeam) buildPretendLiveSwitch(box);
        }

        applyActing();
    }

    function buildPretendLiveSwitch(box) {
        const label = document.createElement("label");
        const tick = document.createElement("input");

        tick.type = "checkbox";
        tick.checked = pretendLive();
        tick.style.cssText = "flex:0 0 auto;width:1rem;height:1rem;margin:.1rem .4rem 0 0;padding:0";
        tick.addEventListener("change", () => {
            try {
                localStorage.setItem(PRETEND_LIVE_KEY, tick.checked ? "1" : "0");
            } catch (error) {
                // The switch just won't be remembered.
            }
        });
        label.style.cssText = "display:flex;align-items:flex-start;font-size:.82rem;font-weight:400;white-space:normal;text-align:left";
        label.title =
            "Shows the phone / emailed messages a live cluster would show. " +
            "Emails still go only to the trial address.";
        label.append(tick, "Pretend this roster is live (test only)");
        box.append(label);
    }

    /* ---------------------------------------------------------
     * Manager controls: Send roster to Country Rostering
     * (edge function roster-send: PDF with full names and IDs,
     * emailed, and the sent cut-off moved in one step)
     * --------------------------------------------------------- */

    function dateKey(date) {
        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");
    }

    function defaultFirstDay() {
        // The roster day starts at 08:00. Start where the last roster
        // sent finished, if that is still ahead; otherwise today.
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (now.getHours() < 8) today.setDate(today.getDate() - 1);

        const sent = lastSnapshot && lastSnapshot.sent_until
            ? new Date(lastSnapshot.sent_until)
            : null;

        if (sent && sent > now) {
            const day = new Date(sent.getFullYear(), sent.getMonth(), sent.getDate());

            if (sent.getHours() < 8) day.setDate(day.getDate() - 1);

            return dateKey(day);
        }

        return dateKey(today);
    }

    async function sendRequest(mode, first, days) {
        const result = await withTimeout(client.functions.invoke("roster-send", {
            body: { group_id: me.group_id, first, days, mode }
        }), 90000);

        if (result.error) {
            let message = result.error.message || "The request failed.";

            try {
                const body = await result.error.context.json();

                if (body && body.error) message = body.error;
            } catch (error) {
                // Keep the general message.
            }

            throw new Error(message);
        }

        return result.data;
    }

    function buildSendPanel() {
        const viewButton = document.getElementById("countryRosterViewButton");

        if (!viewButton || document.getElementById("rosterSendPanel")) return;

        const panel = document.createElement("section");

        panel.id = "rosterSendPanel";
        panel.className = "notice";
        panel.style.marginTop = ".8rem";
        panel.innerHTML =
            '<h3 style="margin-top:0">Send roster to Country Rostering</h3>' +
            '<p class="field-help" style="margin-top:0">Emails the roster as a PDF (full names and ' +
            'ambulance IDs) and moves the sent cut-off to the end of the period, in one step.</p>' +
            '<div class="form-grid">' +
            '<div class="field"><label for="rosterSendFirst">First roster day (from 08:00)</label>' +
            '<input id="rosterSendFirst" type="date" required></div>' +
            '<div class="field"><label for="rosterSendDays">Number of days</label>' +
            '<input id="rosterSendDays" type="number" min="1" max="28" value="7" inputmode="numeric" required></div>' +
            '</div>' +
            '<div class="action-bar">' +
            '<button id="rosterSendPreview" class="btn-secondary" type="button">Preview</button>' +
            '<button id="rosterSendGo" class="btn-primary" type="button" disabled>Send now</button>' +
            '</div>' +
            '<div id="rosterSendStatus" aria-live="polite" style="font-size:.9rem"></div>';

        viewButton.closest(".action-bar").after(panel);

        const first = panel.querySelector("#rosterSendFirst");
        const days = panel.querySelector("#rosterSendDays");
        const preview = panel.querySelector("#rosterSendPreview");
        const go = panel.querySelector("#rosterSendGo");
        const status = panel.querySelector("#rosterSendStatus");
        let previewed = "";
        let pdfUrl = "";

        const key = () => first.value + "|" + days.value;
        const busy = on => { preview.disabled = on; go.disabled = on || previewed !== key(); };
        const line = (text, strong) => {
            const p = document.createElement("p");

            p.style.margin = ".3rem 0";
            if (strong) p.style.fontWeight = "600";
            p.textContent = text;
            status.append(p);

            return p;
        };

        first.addEventListener("focus", () => {
            if (!first.value) first.value = defaultFirstDay();
        });
        [first, days].forEach(input => input.addEventListener("input", () => {
            go.disabled = previewed !== key();
        }));

        preview.addEventListener("click", async () => {
            if (!first.value) first.value = defaultFirstDay();

            status.textContent = "Building the PDF…";
            busy(true);

            try {
                const data = await sendRequest("preview", first.value, Number(days.value) || 7);
                const bytes = Uint8Array.from(atob(data.pdf_base64), c => c.charCodeAt(0));

                if (pdfUrl) URL.revokeObjectURL(pdfUrl);
                pdfUrl = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
                previewed = data.missing ? "" : key();
                status.textContent = "";
                line(data.period, true);

                if (data.trial) {
                    line("TRIAL: this goes only to the trial address, not to Country Rostering.");
                }

                line("To: " + (data.to.join(", ") || "nobody yet") +
                    (data.cc.length ? " · Copy: " + data.cc.join(", ") : ""));

                if (data.missing) line(data.missing + " It can't be sent yet.");

                const open = document.createElement("a");

                open.href = pdfUrl;
                open.target = "_blank";
                open.rel = "noopener";
                open.download = data.filename;
                open.textContent = "Open the PDF";
                line("").append(open);
            } catch (error) {
                previewed = "";
                status.textContent = "Could not build the roster: " + error.message;
            } finally {
                busy(false);
            }
        });

        go.addEventListener("click", async () => {
            if (previewed !== key()) return;

            if (!window.confirm(
                "Send this roster now?\n\nIt will be emailed and the sent cut-off " +
                "moved to the end of the period. Later changes to those shifts " +
                "will then be notified."
            )) return;

            status.textContent = "Sending…";
            busy(true);

            try {
                const data = await sendRequest("send", first.value, Number(days.value) || 7);

                previewed = "";
                status.textContent = "";
                line("Sent to " + data.to.join(", ") + ".", true);
                line(data.period);
                (data.warnings || []).forEach(text => line("Please check: " + text));

                if (hooks && hooks.refresh) hooks.refresh();
            } catch (error) {
                status.textContent =
                    "Not sent: " + error.message +
                    " Check your inbox before trying again.";
            } finally {
                busy(false);
            }
        });
    }

    /* ---------------------------------------------------------
     * Manager controls: Schedule set-up (the roster is sent by
     * itself each week; pause, or skip the next send)
     * --------------------------------------------------------- */

    const WEEKDAYS = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    function longDate(value) {
        return new Intl.DateTimeFormat("en-AU", {
            weekday: "short", day: "numeric", month: "short"
        }).format(new Date(value));
    }

    function buildSchedulePanel() {
        const sendPanel = document.getElementById("rosterSendPanel");

        if (!sendPanel || document.getElementById("rosterSchedulePanel")) return;

        const options = (list, offset) => list
            .map((text, index) => '<option value="' + (index + (offset || 0)) + '">' + text + "</option>")
            .join("");
        const hours = Array.from({ length: 24 }, (unused, hour) =>
            String(hour).padStart(2, "0") + ":00");
        const panel = document.createElement("section");

        panel.id = "rosterSchedulePanel";
        panel.className = "notice";
        panel.style.marginTop = ".8rem";
        panel.innerHTML =
            '<h3 style="margin-top:0">Schedule set-up</h3>' +
            '<p class="field-help" style="margin-top:0">Sends the roster to Country Rostering by itself ' +
            'each week, the same as <strong>Send now</strong>. It continues from where the last roster ' +
            'sent finished.</p>' +
            '<div class="form-grid">' +
            '<div class="field"><label for="scheduleSendDay">Send every</label>' +
            '<select id="scheduleSendDay">' + options(WEEKDAYS) + '</select></div>' +
            '<div class="field"><label for="scheduleSendHour">At</label>' +
            '<select id="scheduleSendHour">' + options(hours) + '</select></div>' +
            '<div class="field"><label for="scheduleFirstDay">Roster starts on the next</label>' +
            '<select id="scheduleFirstDay">' + options(WEEKDAYS) + '</select></div>' +
            '<div class="field"><label for="scheduleDays">Number of days</label>' +
            '<input id="scheduleDays" type="number" min="1" max="28" inputmode="numeric"></div>' +
            '</div>' +
            '<label style="display:flex;align-items:flex-start;gap:.5rem;font-weight:400;margin:.2rem 0 .8rem">' +
            '<input id="scheduleRemind" type="checkbox" style="flex:0 0 auto;width:1.1rem;height:1.1rem;margin-top:.15rem">' +
            '<span>Remind the team 24 hours before, with the hours that have no crew ' +
            '<span id="scheduleRemindCount"></span></span></label>' +
            '<div class="action-bar">' +
            '<button id="scheduleSave" class="btn-primary" type="button">Save and switch on</button>' +
            '<button id="schedulePause" class="btn-secondary" type="button" hidden>Pause</button>' +
            '<button id="scheduleSkip" class="btn-secondary" type="button" hidden>Skip the next send</button>' +
            '</div>' +
            '<div id="scheduleStatus" aria-live="polite" style="font-size:.9rem"></div>';

        sendPanel.after(panel);

        const field = id => panel.querySelector("#" + id);
        const status = field("scheduleStatus");
        let current = null;

        const show = data => {
            current = data;
            field("scheduleSendDay").value = data.send_dow;
            field("scheduleSendHour").value = data.send_hour;
            field("scheduleFirstDay").value = data.first_dow;
            field("scheduleDays").value = data.days;
            field("scheduleRemind").checked = data.remind !== false;
            field("scheduleRemindCount").textContent =
                "(" + (data.people || 0) + (data.people === 1 ? " person has" : " people have") +
                " reminders turned on).";
            field("scheduleSave").textContent = data.enabled ? "Save changes" : "Save and switch on";
            field("schedulePause").hidden = !data.enabled;
            field("scheduleSkip").hidden = !data.enabled;
            field("scheduleSkip").textContent = data.skipped ? "Don't skip the next send" : "Skip the next send";
            status.textContent = "";

            const line = (text, strong) => {
                const p = document.createElement("p");

                p.style.margin = ".3rem 0";
                if (strong) p.style.fontWeight = "600";
                p.textContent = text;
                status.append(p);
            };

            if (!data.enabled) {
                line(data.exists ? "Paused: nothing is sent by itself." : "Not switched on yet.", true);
            } else if (data.skipped) {
                line("The send on " + longDate(data.next_send_at) + " at " +
                    hours[data.send_hour] + " will be skipped.", true);
            } else {
                line("Next send: " + longDate(data.next_send_at) + " at " + hours[data.send_hour] +
                    ", for the roster " + longDate(data.next_first + "T12:00:00") + " to " +
                    longDate(data.next_last + "T12:00:00") + ".", true);
            }

            if (data.last_result) {
                line("Last time (" + longDate(data.last_run_at) + "): " + data.last_result);
            }
        };

        const run = async (name, args) => {
            panel.querySelectorAll("button").forEach(button => { button.disabled = true; });

            try {
                show(await rpc(name, { p_group: me.group_id, ...args }));
            } catch (error) {
                status.textContent = "That didn't save: " + error.message;
            } finally {
                panel.querySelectorAll("button").forEach(button => { button.disabled = false; });
            }
        };

        const settings = enabled => ({
            p_enabled: enabled,
            p_send_dow: Number(field("scheduleSendDay").value),
            p_send_hour: Number(field("scheduleSendHour").value),
            p_first_dow: Number(field("scheduleFirstDay").value),
            p_days: Number(field("scheduleDays").value) || 7,
            p_remind: field("scheduleRemind").checked
        });

        field("scheduleSave").addEventListener("click", () =>
            run("roster_schedule_save", settings(true)));
        field("schedulePause").addEventListener("click", () =>
            run("roster_schedule_save", settings(false)));
        field("scheduleSkip").addEventListener("click", () =>
            run("roster_schedule_skip", { p_skip: !(current && current.skipped) }));

        rpc("roster_schedule_get", { p_group: me.group_id }).then(show, error => {
            status.textContent = "Could not load the schedule: " + error.message;
        });
    }

    /*
     * Owner, 17 Nov 2026: on the new roster the manager no longer prints
     * the roster and emails it themselves, so the PDF view button and its
     * instructions go, and "Send roster" and "Schedule set-up" fold away
     * under Manager controls until opened.
     */
    function tidyManagerControls() {
        const viewButton = document.getElementById("countryRosterViewButton");

        if (viewButton) {
            const bar = viewButton.closest(".action-bar");
            const help = bar.parentElement.querySelector(":scope > p.field-help");

            bar.style.display = "none";
            if (help) help.style.display = "none";
        }

        ["rosterSendPanel", "rosterSchedulePanel"].forEach(id => {
            const panel = document.getElementById(id);

            if (!panel || panel.closest("details.roster-fold")) return;

            const fold = document.createElement("details");
            const summary = document.createElement("summary");
            const heading = panel.querySelector("h3");

            fold.className = "roster-fold";
            fold.style.cssText = "margin-top:.8rem";
            summary.textContent = heading ? heading.textContent : "";
            summary.style.cssText = "cursor:pointer;font-weight:700;padding:.5rem 0";
            if (heading) heading.remove();
            panel.style.marginTop = ".4rem";
            panel.before(fold);
            fold.append(summary, panel);
        });
    }

    /* ---------------------------------------------------------
     * Reminders: an app notification 24 hours before the team's
     * roster is sent (edge function roster-remind, service worker
     * /modules/rosters/sw.js). Each person turns it on per device.
     * On iPhone the roster must first be added to the Home Screen.
     * --------------------------------------------------------- */

    const SW_URL = "/modules/rosters/sw.js";
    const SW_SCOPE = "/modules/rosters/";

    function pushSupported() {
        return "serviceWorker" in navigator &&
            "PushManager" in window &&
            "Notification" in window;
    }

    async function currentSubscription() {
        if (!pushSupported()) return null;

        const registration = await navigator.serviceWorker.getRegistration(SW_SCOPE);

        return registration ? registration.pushManager.getSubscription() : null;
    }

    function keyBytes(base64url) {
        const padded = (base64url + "===".slice((base64url.length + 3) % 4))
            .replace(/-/g, "+").replace(/_/g, "/");

        return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
    }

    async function turnOnReminders() {
        if (!pushSupported()) {
            const iPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);

            window.alert(iPhone
                ? "On an iPhone, add the roster to your Home Screen first:\n\n" +
                  "1. Tap the Share button in Safari.\n" +
                  "2. Tap \"Add to Home Screen\".\n" +
                  "3. Open the roster from the new icon, sign in, and tap " +
                  "\"Turn on reminders\" again.\n\n(Needs iOS 16.4 or later.)"
                : "This browser can't show notifications. Try Chrome or Safari.");
            return false;
        }

        if ((await Notification.requestPermission()) !== "granted") {
            window.alert(
                "Notifications are blocked for the roster. " +
                "Allow them in your phone's settings, then try again."
            );
            return false;
        }

        const registration = await navigator.serviceWorker.register(
            SW_URL, { scope: SW_SCOPE }
        );

        await navigator.serviceWorker.ready;

        let key = await rpc("roster_push_public_key");

        if (!key) {
            const made = await client.functions.invoke("roster-remind", { body: { mode: "key" } });

            key = made.data && made.data.public_key;
        }

        if (!key) throw new Error("Reminders are not set up yet.");

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: keyBytes(key)
        });
        const details = subscription.toJSON();

        await rpc("roster_push_subscribe", {
            p_endpoint: details.endpoint,
            p_p256dh: details.keys.p256dh,
            p_auth: details.keys.auth,
            p_page: location.pathname
        });

        return true;
    }

    async function turnOffReminders() {
        const subscription = await currentSubscription();

        if (!subscription) return;

        await rpc("roster_push_unsubscribe", { p_endpoint: subscription.endpoint });
        await subscription.unsubscribe();
    }

    async function sendTestReminder() {
        const result = await client.functions.invoke("roster-remind", { body: { mode: "test" } });

        if (result.error || !result.data || !result.data.sent) {
            throw new Error("The test could not be sent to this device.");
        }
    }

    function buildReminderControls() {
        const row = document.createElement("div");

        row.id = "rosterReminders";
        row.style.cssText = "display:flex;flex-wrap:wrap;gap:.2rem .8rem;font-size:.82rem";

        const draw = async note => {
            let on = false;

            try {
                on = Boolean(await currentSubscription());
            } catch (error) {
                on = false;
            }

            row.textContent = "";

            const guard = action => async () => {
                try {
                    const message = await action();

                    await draw(message || "");
                } catch (error) {
                    await draw(error.message || "That didn't work.");
                }
            };

            if (on) {
                const label = document.createElement("span");

                label.textContent = "🔔 Reminders are on";
                row.append(
                    label,
                    link("Send a test", guard(async () => {
                        await sendTestReminder();

                        return "Test sent. If no banner appears, look in Notification " +
                            "Centre: a Focus (Sleep, Do Not Disturb) hides banners.";
                    })),
                    link("Turn off", guard(turnOffReminders))
                );
            } else {
                row.append(link("🔔 Turn on reminders", guard(async () => {
                    if (!(await turnOnReminders())) return "";

                    await sendTestReminder().catch(() => {});

                    return "Reminders are on. A test is on its way. If no banner " +
                        "appears, look in Notification Centre: a Focus hides banners.";
                })));
            }

            if (note) {
                const text = document.createElement("span");

                text.style.cssText = "flex-basis:100%;font-weight:400";
                text.textContent = note;
                row.append(text);
            }
        };

        void draw("");

        return row;
    }

    async function changeName() {
        const typed = window.prompt(
            "Name to show on the roster.\n" +
            "Leave it blank to use your full name (" + (me.full_name || "") + ").",
            me.preferred_name || ""
        );

        if (typed === null) return;

        const value = typed.trim().slice(0, 40);
        const result = await client
            .from("profiles")
            .update({ preferred_name: value || null })
            .eq("id", me.id);

        if (result.error) {
            window.alert("That didn't save: " + result.error.message);
            return;
        }

        location.reload();
    }

    window.DSY_ROSTER_BACKEND = {
        ready,
        call,

        attach(pageHooks) {
            hooks = pageHooks;
            // Always after roster.js has finished setting itself up,
            // even when the sign-in answered before it loaded.
            ready.then(() => setTimeout(buildHeader, 0), () => {});
        },

        officialName(bookingId) {
            return officialNames[String(bookingId)] || "";
        },

        isMyMessage(id) {
            return myMessageIds.has(String(id));
        },

        // For the roster PDF window, which marks the roster as sent itself.
        restInfo() {
            return {
                url: SUPABASE_URL,
                key: SUPABASE_KEY,
                token,
                groupId: me ? me.group_id : ""
            };
        }
    };
})();
