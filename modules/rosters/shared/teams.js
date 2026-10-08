"use strict";

/*
 * Every team roster page, keyed by its folder name.
 *
 * To add a team: create its folder with a copy of any team's
 * short index.html (changing DSY_ROSTER_TEAM_ID), then add a
 * line here. Teams in the same cluster share an Apps Script.
 */

const TEST_API =
    "https://script.google.com/macros/s/AKfycbzaCWo3gQx98GlPVAhDPlxF0f6rvWvTr9EYC1jr44OorKneClDHERHUTcPivV9ENlhDPA/exec";

const LOWEREYRE_API =
    "https://script.google.com/macros/s/AKfycbxEboPS9reZI5OpUMdlriag0QeAJzIyXFZ2Jy0z_4qBJLEK054R5bDcJgyWAW2YSP6l/exec";

const CENTRALEYRE_API =
    "https://script.google.com/macros/s/AKfycbwbeUGYW4VaBC8i0k228ASyRQt-B4_7pKKr5F3O5L-CrCmTH0hnx48pN7QTqkjXrfwRDA/exec";

const WESTCOAST_API =
    "https://script.google.com/macros/s/AKfycbxrcfdjF7kUZQBkHuw2mqrYXhqz54VrK9Agv-zzOyBG8BbAbC-lrDkY6zGK91VAwB_z/exec";

/*
 * Optional page features, on for every team (see roster.js):
 * - savedRoster:     show the last roster at once while updating
 * - loadingMessages: quote or tip while the roster loads
 * - reliableCancel:  cancel shows at once and retries until confirmed
 * - editBooking:     Edit button in My bookings (needs Apps Script v4)
 * To try a new feature on one team first, give that team its own
 * "features" list instead.
 */
const STANDARD_FEATURES = [
    "savedRoster",
    "loadingMessages",
    "reliableCancel",
    "editBooking"
];

const ROSTER_TEAM_LIST = {
    // Lower Eyre (plus the test roster)
    test: {
        name: "Summer Bay",
        cluster: "Lower Eyre",
        apiUrl: TEST_API
    },
    tumbybay: { name: "Tumby Bay", cluster: "Lower Eyre", apiUrl: LOWEREYRE_API },
    portneill: { name: "Port Neill", cluster: "Lower Eyre", apiUrl: LOWEREYRE_API },
    cummins: { name: "Cummins", cluster: "Lower Eyre", apiUrl: LOWEREYRE_API },
    coffinbay: { name: "Coffin Bay", cluster: "Lower Eyre", apiUrl: LOWEREYRE_API },

    // Central Eyre
    cleve: { name: "Cleve", cluster: "Central Eyre", apiUrl: CENTRALEYRE_API },
    cowell: { name: "Cowell", cluster: "Central Eyre", apiUrl: CENTRALEYRE_API },
    elliston: { name: "Elliston", cluster: "Central Eyre", apiUrl: CENTRALEYRE_API },
    lock: { name: "Lock", cluster: "Central Eyre", apiUrl: CENTRALEYRE_API },

    // West Coast
    kimba: { name: "Kimba", cluster: "West Coast", apiUrl: WESTCOAST_API },
    port_kenny: { name: "Port Kenny", cluster: "West Coast", apiUrl: WESTCOAST_API },
    streakybay: { name: "Streaky Bay", cluster: "West Coast", apiUrl: WESTCOAST_API },
    wudinna: { name: "Wudinna", cluster: "West Coast", apiUrl: WESTCOAST_API }
};

window.DSY_ROSTER_TEAMS = Object.freeze(
    Object.fromEntries(
        Object.entries(ROSTER_TEAM_LIST).map(([id, team]) => [
            id,
            Object.freeze({ features: STANDARD_FEATURES, ...team })
        ])
    )
);
