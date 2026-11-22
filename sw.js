/* Service worker for the whole DSY site (scope /), for the one reminder switch (/shared/reminders.js). It only
   shows the reminders sent by the Supabase edge function roster-remind (roster and training sessions) and opens
   the page named in the reminder when one is tapped.
   It keeps no copy of any page, so pages always load fresh. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (error) { data = { body: event.data ? event.data.text() : "" }; }
  event.waitUntil(self.registration.showNotification(data.title || "DSY Training", {
    body: data.body || "",
    icon: "/shared/dsy-favicon-192.png",
    // No "tag": on iPhone a notification that replaces an earlier one with the same tag arrives silently.
    data: { url: data.url || "/" }
  }));
});

self.addEventListener("notificationclick", event => {
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if (new URL(client.url).pathname === url && "focus" in client) return client.focus();
    }
    return self.clients.openWindow(url);
  }));
});
