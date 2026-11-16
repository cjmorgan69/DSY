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

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let me = null;
    let hooks = null;
    let token = "";
    let acting = { kind: "me" };
    let lastSnapshot = null;
    const labelById = {};
    const idByLabel = {};
    const myMessageIds = new Set();

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
            bookings: (data.bookings || []).map(row => ({
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
            })),
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
        const trial = !lastSnapshot || lastSnapshot.trial;
        const requires = !trial && Boolean(result && result.requires_notification);
        const hoursAway = (Date.parse(noticeIso) - Date.now()) / HOUR_MS;

        return {
            requiresCentralNotification: requires,
            countryRosteringEmailed:
                requires &&
                Boolean(lastSnapshot.cr_set) &&
                hoursAway > COUNTRY_ROSTERING_EMAIL_MIN_HOURS
        };
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
                    p_level: payload.clinicalLevel || null
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
        box.style.cssText = "display:flex;flex-direction:column;gap:.3rem;min-width:0";
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

            select.addEventListener("change", () => {
                guest.hidden = select.value !== NOT_LISTED;

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

            box.append(select, guest);
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
        section.append(box);

        const subtitle = document.getElementById("teamSubtitle");

        if (subtitle) {
            subtitle.textContent =
                config.name + " volunteer roster · new roster (trial)";
        }

        if (!me.can_manage) {
            const panel = document.getElementById("managerControlsPanel");

            if (panel) panel.style.display = "none";
        }

        applyActing();
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
