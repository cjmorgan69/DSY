/* Show / hide password (owner, 22 Nov 2026): an eye button at the right of every password box.
   Works on boxes drawn later too (Training sessions, Teams and Region draw their sign-in form after loading).
   The box goes back to hidden when its form is sent, so password managers still see a password field. */
(function () {
  var EYE = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var SHUT = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.9 3.8M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.8 0 3.4-.5 4.8-1.3"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M2 2l20 20"/></svg>';

  var css = document.createElement("style");
  css.textContent = ".pw-wrap{position:relative;display:block}.pw-wrap input{padding-right:3.2rem}" +
    ".pw-eye{position:absolute;top:0;right:0;bottom:0;width:3rem;display:flex;align-items:center;justify-content:center;" +
    "border:0;background:none;color:inherit;opacity:.65;cursor:pointer;border-radius:12px;padding:0;min-height:0}" +
    ".pw-eye:hover,.pw-eye:focus-visible{opacity:1}";
  document.head.appendChild(css);

  function add(input) {
    if (input.dataset.pwEye) return;
    input.dataset.pwEye = "1";
    var wrap = document.createElement("span"); wrap.className = "pw-wrap";
    input.parentNode.insertBefore(wrap, input); wrap.appendChild(input);
    var b = document.createElement("button");
    b.type = "button"; b.className = "pw-eye";
    function show(on) {
      input.type = on ? "text" : "password";
      b.innerHTML = on ? SHUT : EYE;
      b.setAttribute("aria-label", on ? "Hide password" : "Show password");
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
    b.addEventListener("click", function (e) { e.preventDefault(); show(input.type === "password"); input.focus(); });
    if (input.form) input.form.addEventListener("submit", function () { show(false); }, true);
    show(false);
    wrap.appendChild(b);
  }
  function scan(root) { (root.querySelectorAll ? root.querySelectorAll('input[type="password"]') : []).forEach(add); }

  function start() {
    scan(document);
    new MutationObserver(function (list) {
      list.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { if (n.matches && n.matches('input[type="password"]')) add(n); else scan(n); } }); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
