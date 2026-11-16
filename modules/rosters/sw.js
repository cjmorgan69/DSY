/* Service worker for the crew roster pages (scope /modules/rosters/). It only shows the roster reminder
   notifications sent by the Supabase edge function roster-remind and opens the roster when one is tapped.
   It keeps no copy of any page, so pages always load fresh. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (error) { data = { body: event.data ? event.data.text() : "" }; }
  event.waitUntil(self.registration.showNotification(data.title || "Crew Shift Roster", {
    body: data.body || "",
    icon: "/modules/rosters/shared/roster-icon-192.png",
    // No "tag": on iPhone a notification that replaces an earlier one with the same tag arrives silently.
    data: { url: data.url || "/modules/rosters/" }
  }));
});

self.addEventListener("notificationclick", event => {
  const url = (event.notification.data && event.notification.data.url) || "/modules/rosters/";
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if (new URL(client.url).pathname === url && "focus" in client) return client.focus();
    }
    return self.clients.openWindow(url);
  }));
});
