"use strict";

/*
 * Roster reading for the dashboards (stage 6 of the Supabase roster move,
 * 18 Nov 2026). Load after teams.js.
 *
 * Pages that READ rosters (leader dashboards, car dash, operations, the
 * manager dashboards, Team Leader crewing gaps) ask this file instead of
 * calling the Apps Scripts themselves. For each team it reads the right
 * place: the cluster's Apps Script, or Supabase once the team has moved
 * (backend: "supabase" in teams.js; the test roster is never counted).
 * Until a real team moves, every answer is exactly the Apps Script's.
 *
 *   DSY_ROSTER_DATA.coverage(appsScriptUrl, "YYYY-MM-DD", { signal })
 *       the cluster's "coverage" answer: people booked per team per hour
 *   DSY_ROSTER_DATA.bookings(teamName, appsScriptUrl, { signal })
 *       one team's "getBookings" answer ({ bookings: [...] })
 *   DSY_ROSTER_DATA.movedTeams()
 *       names of the real teams that read from Supabase
 *
 * Supabase side: roster_coverage (counts only, anyone may call it, like the
 * Apps Script) and roster_team_bookings (names, signed-in people who may see
 * that roster); see supabase/roster-stage6-readers.sql.
 */
(function () {
    const SUPABASE_URL = "https://ekaodnbnpsuayvmxvxbm.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYW9kbmJucHN1YXl2bXh2eGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxMzQsImV4cCI6MjEwNzM0ODEzNH0.q3lTeCQAQjYeMUNl6lwsrxUAsTijJikABW4Ua2N4bmI";
    const SESSION_KEY = "sb-ekaodnbnpsuayvmxvxbm-auth-token";

    function teamList() {
        const T = window.DSY_ROSTER_TEAMS || {};

        return Object.keys(T).map(id => T[id]).filter(t => !t.testTeam);
    }

    function movedTeams() {
        return teamList().filter(t => t.backend === "supabase").map(t => t.name);
    }

    function isMoved(name) {
        const key = String(name || "").trim().toLowerCase();

        return movedTeams().some(n => n.toLowerCase() === key);
    }

    function accessToken() {
        try {
            const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

            return session && session.access_token ? session.access_token : "";
        } catch (error) {
            return "";
        }
    }

    async function rpc(name, args, options, signedIn) {
        const token = accessToken();

        if (signedIn && !token) {
            throw new Error("sign in to see this team's new roster");
        }

        const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + name, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_KEY,
                Authorization: "Bearer " + (token || SUPABASE_KEY)
            },
            body: JSON.stringify(args),
            signal: options && options.signal
        });
        const body = await response.json().catch(() => null);

        if (!response.ok) {
            // An expired sign-in can still read the counts as a visitor.
            if (!signedIn && token && response.status === 401) {
                return rpcAsVisitor(name, args, options);
            }

            throw new Error((body && body.message) || "HTTP " + response.status);
        }

        return body;
    }

    async function rpcAsVisitor(name, args, options) {
        const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + name, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_KEY,
                Authorization: "Bearer " + SUPABASE_KEY
            },
            body: JSON.stringify(args),
            signal: options && options.signal
        });
        const body = await response.json().catch(() => null);

        if (!response.ok) throw new Error((body && body.message) || "HTTP " + response.status);

        return body;
    }

    // Exactly the request the pages made before.
    async function appsScriptCoverage(url, date, options) {
        const address = new URL(url);

        address.searchParams.set("action", "coverage");
        address.searchParams.set("date", date);
        address.searchParams.set("_", String(Date.now()));

        const response = await fetch(address.toString(), {
            method: "GET",
            redirect: "follow",
            credentials: "omit",
            signal: options && options.signal
        });

        if (!response.ok) throw new Error("Server returned HTTP " + response.status + ".");

        return response.json();
    }

    async function coverage(url, date, options) {
        const cluster = teamList().filter(t => t.apiUrl === url).map(t => t.name);
        const moved = cluster.filter(isMoved);

        if (!moved.length) return appsScriptCoverage(url, date, options);

        // The whole cluster has moved: the Apps Script is not asked at all.
        if (moved.length === cluster.length) {
            return rpc("roster_coverage", { p_teams: cluster, p_date: date }, options, false);
        }

        const [sheet, supa] = await Promise.all([
            appsScriptCoverage(url, date, options),
            rpc("roster_coverage", { p_teams: moved, p_date: date }, options, false)
        ]);

        if (!sheet || !sheet.ok || !Array.isArray(sheet.teams) || !Array.isArray(sheet.hours)) return sheet;

        const byHour = {};

        supa.hours.forEach(hour => { byHour[hour.start] = hour.counts; });
        sheet.teams.forEach((team, column) => {
            const index = supa.teams.findIndex(t => t.name.toLowerCase() === String(team.name).toLowerCase());

            if (index < 0) return;

            sheet.hours.forEach(hour => {
                const counts = byHour[new Date(hour.start).toISOString()];

                if (counts) hour.counts[column] = counts[index];
            });
        });

        return sheet;
    }

    async function bookings(team, url, options) {
        if (isMoved(team)) {
            return rpc("roster_team_bookings", { p_team: team }, options, true);
        }

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ action: "getBookings", team }),
            redirect: "follow",
            credentials: "omit",
            signal: options && options.signal
        });

        if (!response.ok) throw new Error("HTTP " + response.status);

        return response.json();
    }

    window.DSY_ROSTER_DATA = { coverage, bookings, movedTeams, isMoved };
})();
