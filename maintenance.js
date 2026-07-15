/* Houston Jewish Info — site-wide Maintenance mode.
   Reads the Settings tab. If maintenance_on is on, it covers the site with a
   dim, non-dismissable message (the site shows through, dimmed, but is blocked).

   Turn it on/off from the admin: Settings > Maintenance.

   Preview while it's on (bypass):  add  ?preview=hjistaff2026  to any page URL.
   Stop previewing:                add  ?preview=off
*/
(function () {
  var SHEET_ID   = '1in7Ac7zknqyR9neWKOCAjOAG4jXCIVTJQfU6jJ72CV8';
  var BYPASS_KEY = 'hjistaff2026';

  // Never block the admin portal.
  if (/\/admin(\/|$)/i.test(location.pathname)) return;

  // Bypass handling (persists across pages via localStorage).
  try {
    var qs = location.search || '';
    if (qs.indexOf('preview=off') >= 0) { localStorage.removeItem('hji_maint_ok'); }
    else if (qs.indexOf('preview=' + BYPASS_KEY) >= 0) { localStorage.setItem('hji_maint_ok', '1'); }
    if (localStorage.getItem('hji_maint_ok') === '1') return;
  } catch (e) {}

  var url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID +
            '/gviz/tq?tqx=out:json&headers=1&sheet=Settings&cb=' + Date.now();

  fetch(url).then(function (r) { return r.text(); }).then(function (t) {
    var json = JSON.parse(t.substring(t.indexOf('{'), t.lastIndexOf('}') + 1));
    var cols = (json.table.cols || []).map(function (c) { return (c.label || '').toLowerCase().trim(); });
    var map = {};
    (json.table.rows || []).forEach(function (row) {
      var o = {};
      cols.forEach(function (col, i) {
        var c = row.c ? row.c[i] : null;
        o[col] = c ? (c.f != null ? String(c.f) : (c.v == null ? '' : String(c.v))) : '';
      });
      var k = (o.key || '').trim().toLowerCase();
      if (k) map[k] = (o.value != null ? String(o.value) : '');
    });

    var on = (map['maintenance_on'] || '').trim().toLowerCase();
    if (!(on === 'yes' || on === 'on' || on === 'true' || on === '1')) return;

    var title = map['maintenance_title'] || 'Under Maintenance';
    var msg   = map['maintenance_message'] || "We'll be back shortly. Thank you for your patience.";
    showOverlay(title, msg);
  }).catch(function () {});

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  function showOverlay(title, msg) {
    if (document.getElementById('hji-maint')) return;

    var css =
      '#hji-maint{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;' +
      'padding:24px;background:rgba(20,30,50,.55);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}' +
      '#hji-maint .hji-mc{background:#fff;max-width:460px;width:100%;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);' +
      'padding:34px 30px;text-align:center;font-family:Georgia,"Times New Roman",serif}' +
      '#hji-maint .hji-badge{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;' +
      'background:#f4f2ec;color:#B94218;font-size:28px;margin-bottom:14px}' +
      '#hji-maint h2{color:#143D75;font-size:26px;line-height:1.2;margin:0 0 12px;font-family:"Playfair Display",Georgia,serif}' +
      '#hji-maint p{color:#444;font-size:16px;line-height:1.6;margin:0}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var d = document.createElement('div');
    d.id = 'hji-maint';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.innerHTML =
      '<div class="hji-mc">' +
        '<div class="hji-badge" aria-hidden="true">\u2692</div>' +
        '<h2>' + esc(title) + '</h2>' +
        '<p>' + esc(msg).replace(/\n/g, '<br>') + '</p>' +
      '</div>';
    (document.body || document.documentElement).appendChild(d);

    // Block scrolling / interaction with the page behind.
    try {
      document.documentElement.style.overflow = 'hidden';
      if (document.body) document.body.style.overflow = 'hidden';
    } catch (e) {}
  }
})();

/* Fix popup button links site-wide: if a popup button's link is a bare email or
   phone number, turn it into mailto:/tel: so it never 404s. Runs on every page,
   independent of maintenance mode, and works no matter which popup system rendered
   the button. */
(function () {
  function fixOne(a) {
    if (!a || a.__hjiLinkFixed) return;
    var raw = (a.getAttribute('href') || '').trim();
    if (!raw) return;
    if (/^(https?:|mailto:|tel:|\/|#)/i.test(raw)) { a.__hjiLinkFixed = 1; return; }
    var href = '';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
      href = 'mailto:' + raw;
    } else {
      var d = raw.replace(/[^0-9+]/g, '');
      if (/^[-()+.\s0-9]{7,}$/.test(raw) && d.replace(/\D/g, '').length >= 7) href = 'tel:' + d;
      else href = 'https://' + raw;   // bare domain
    }
    if (href) { a.setAttribute('href', href); if (/^(mailto:|tel:)/i.test(href)) { a.removeAttribute('target'); a.removeAttribute('rel'); } }
    a.__hjiLinkFixed = 1;
  }
  function scan() {
    var els = document.querySelectorAll('a.hjipop-btn');
    for (var i = 0; i < els.length; i++) fixOne(els[i]);
  }
  try { new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
  setInterval(scan, 800);
})();

/* Track popup / announcement performance site-wide.
   Fires the SAME ad_click event as regular ads (so popups show up in the same
   GA4 ad reports) with ad_placement = "popup", plus a popup_view event so you
   can work out a real click-through rate. Works on every page and with both
   popup systems. */
(function () {
  function ga(name, params) {
    try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {}
  }
  function titleOf(card) {
    var t = card && card.querySelector('.hjipop-title');
    var s = t ? (t.textContent || '') : '';
    s = s.replace(/\s+/g, ' ').trim();
    return s || 'Popup';
  }
  function scanPopups() {
    // View: fire once per popup card shown
    var cards = document.querySelectorAll('.hjipop-card');
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      if (c.__hjiPopSeen) continue;
      c.__hjiPopSeen = 1;
      ga('popup_view', { ad_name: titleOf(c), ad_placement: 'popup' });
    }
    // Click: track the popup's button as an ad click
    var btns = document.querySelectorAll('a.hjipop-btn');
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      if (b.__hjiPopTracked) continue;
      b.__hjiPopTracked = 1;
      b.addEventListener('click', function () {
        var card = this.closest ? this.closest('.hjipop-card') : null;
        ga('ad_click', {
          ad_name: titleOf(card),
          ad_placement: 'popup',
          link_url: this.getAttribute('href') || ''
        });
      });
    }
  }
  try { new MutationObserver(scanPopups).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scanPopups); else scanPopups();
  setInterval(scanPopups, 800);
})();
