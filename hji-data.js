/* ============================================================
 *  HJI — Supabase read layer  (hji-data.js, v1)
 * ============================================================
 *  Serves the site's data from Supabase instead of Google Sheets
 *  WITHOUT changing any page code.
 *
 *  HOW IT WORKS
 *    The pages make 49 different calls to the Google Sheets GViz
 *    endpoint, each parsed a little differently. Rewriting all of
 *    them would be 49 chances to introduce a bug. Instead this
 *    file intercepts window.fetch: when a page asks Google for a
 *    tab, the request is answered from Supabase, formatted to look
 *    exactly like the GViz reply the page already knows how to
 *    read. Every other fetch on the page is passed straight
 *    through untouched.
 *
 *  TO USE — one line per page, immediately before the page's own
 *  script, and nothing else changes:
 *      <script src="/hji-data.js"></script>
 *
 *  TO REVERT — delete that one line. The page goes straight back
 *  to reading Google Sheets. That is the whole rollback.
 *
 *  THE ANON KEY BELOW IS MEANT TO BE PUBLIC. It only permits the
 *  reads your security rules allow. The service_role key must
 *  never appear in a file like this.
 * ============================================================ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://qoqfrnnropxjpjjfuhhi.supabase.co';
  var ANON_KEY     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvcWZybm5yb3B4anBqamZ1aGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDAyMTYsImV4cCI6MjEwNTIxNjIxNn0.c4-i7IbCPAzGzIYA-8fWZSa-JNfGKgHvf9UM1HN5GI8';

  /* Sheet tab -> Supabase table, and each column as
     [sheet header, postgres column, type]. Generated from the schema. */
  var MAP = {
  "Hechsherim": { t: "hechsherim", c: [["Name","name","text"], ["Image","image","text"], ["Authority","authority","text"]] },
  "Resources": { t: "resources", c: [["Label","label","text"], ["Sub","sub","text"], ["Link","link","text"], ["Icon","icon","text"], ["Color","color","text"], ["Order","sort_order","integer"], ["Active","active","text"]] },
  "Comments": { t: "comments", c: [["CommentID","commentid","text"], ["Date","date","text"], ["PostID","postid","text"], ["Comment","comment","text"], ["PostType","posttype","text"], ["Name","name","text"], ["Approved","approved","text"]] },
  "Popups": { t: "popups", c: [["Target","target","text"], ["Title","title","text"], ["Message","message","text"], ["Image","image","text"], ["ButtonText","buttontext","text"], ["ButtonLink","buttonlink","text"], ["ShowFrom","showfrom","date"], ["ShowUntil","showuntil","date"], ["Repeat","repeat_mode","text"], ["Active","active","text"]] },
  "Stories": { t: "stories", c: [["Image","image","text"], ["VideoURL","videourl","text"], ["Label","label","text"], ["Date","date","date"], ["Headline","headline","text"], ["Excerpt","excerpt","text"], ["Byline","byline","text"], ["LinkURL","linkurl","text"], ["LinkText","linktext","text"], ["AllowComments","allowcomments","text"], ["Status","status","text"], ["PageID","pageid","text"]] },
  "Passings": { t: "passings", c: [["Name","name","text"], ["Date","date","date"], ["City","city","text"], ["Image","image","text"], ["Levaya","levaya","text"], ["Shiva","shiva","text"], ["Message","message","text"], ["LinkText","linktext","text"], ["LinkURL","linkurl","text"], ["AllowComments","allowcomments","text"], ["Status","status","text"]] },
  "Events": { t: "events", c: [["Title","title","text"], ["Date","date","date"], ["Time","time","text"], ["Location","location","text"], ["Description","description","text"], ["Category","category","text"], ["VideoURL","videourl","text"], ["ImageURL","imageurl","text"], ["TicketURL","ticketurl","text"], ["ButtonText","buttontext","text"], ["Presenter","presenter","text"], ["Women","women","text"], ["AllowComments","allowcomments","text"], ["Status","status","text"], ["PageID","pageid","text"]] },
  "RealEstate": { t: "realestate", c: [["Title","title","text"], ["Type","type","text"], ["Price","price","numeric"], ["Address","address","text"], ["Bedrooms","bedrooms","numeric"], ["Bathrooms","bathrooms","numeric"], ["SqFt","sqft","integer"], ["Amenities","amenities","text"], ["Description","description","text"], ["Phone","phone","text"], ["Email","email","text"], ["Images","images","text"], ["Status","status","text"]] },
  "Ads": { t: "ads", c: [["Placement","placement","text"], ["Advertiser","advertiser","text"], ["ImageURL","imageurl","text"], ["LinkURL","linkurl","text"], ["Status","status","text"]] },
  "Jobs": { t: "jobs", c: [["Title","title","text"], ["Organization","organization","text"], ["Type","type","text"], ["Category","category","text"], ["Status","status","text"], ["Phone","phone","text"], ["Email","email","text"], ["Pay","pay","text"], ["Description","description","text"], ["ApplyURL","applyurl","text"], ["Approved","approved","text"]] },
  "shuls": { t: "shuls", c: [["Name","name","text"], ["Denomination","denomination","text"], ["Image","image","text"], ["Address","address","text"], ["Phone","phone","text"], ["Rabbi","rabbi","text"], ["Website","website","text"], ["ServiceTimes","servicetimes","text"], ["Nusach","nusach","text"], ["Status","status","text"]] },
  "Charities": { t: "charities", c: [["Name","name","text"], ["Category","category","text"], ["Logo","logo","text"], ["Description","description","text"], ["Website","website","text"], ["Phone","phone","text"], ["DonateURL","donateurl","text"], ["CardImage","cardimage","text"], ["Status","status","text"]] },
  "Education": { t: "education", c: [["Name","name","text"], ["Category","category","text"], ["Type","type","text"], ["Image","image","text"], ["Address","address","text"], ["Phone","phone","text"], ["Email","email","text"], ["Head","head","text"], ["Description","description","text"], ["Website","website","text"], ["Tuition","tuition","text"], ["Status","status","text"]] },
  "KosherRestaurants": { t: "kosherrestaurants", c: [["Name","name","text"], ["Description","description","text"], ["Address","address","text"], ["Phone","phone","text"], ["Email","email","text"], ["Website","website","text"], ["Hours","hours","text"], ["Badge","badge","text"], ["Category","category","text"], ["Kashrut","kashrut","text"], ["Hechsher","hechsher","text"], ["CardImage","cardimage","text"], ["hide_reviews","hide_reviews","text"], ["place_id","place_id","text"], ["google_rating","google_rating","numeric"], ["google_reviews_count","google_reviews_count","integer"], ["google_reviews_updated","google_reviews_updated","timestamptz"], ["Status","status","text"], ["lat","lat","numeric"], ["lng","lng","numeric"]] },
  "Services": { t: "services", c: [["Name","name","text"], ["Category","category","text"], ["Description","description","text"], ["Address","address","text"], ["Phone","phone","text"], ["Email","email","text"], ["Website","website","text"], ["LinkText","linktext","text"], ["LinkURL","linkurl","text"], ["Hours","hours","text"], ["Badge","badge","text"], ["CardImage","cardimage","text"], ["Hechsher","hechsher","text"], ["hide_reviews","hide_reviews","text"], ["place_id","place_id","text"], ["google_rating","google_rating","numeric"], ["google_reviews_count","google_reviews_count","integer"], ["google_reviews_updated","google_reviews_updated","timestamptz"], ["Status","status","text"]] },
  "MazalTov": { t: "mazaltov", c: [["Name","name","text"], ["Type","type","text"], ["Date","date","text"], ["City","city","text"], ["Message","message","text"], ["LinkText","linktext","text"], ["LinkURL","linkurl","text"], ["AllowComments","allowcomments","text"], ["Status","status","text"]] },
  "mikvahs": { t: "mikvahs", c: [["Name","name","text"], ["Address","address","text"], ["Phone","phone","text"], ["Email","email","text"], ["Website","website","text"], ["Notes","notes","text"], ["Status","status","text"]] },
  "Settings": { t: "settings", c: [["Key","key","text"], ["Value","value","text"]] },
  "Activities": { t: "activities", c: [["Name","name","text"], ["Category","category","text"], ["IndoorOutdoor","indooroutdoor","text"], ["URL","url","text"], ["Address","address","text"], ["Free","is_free","text"], ["Hechsher","hechsher","text"], ["Status","status","text"], ["lat","lat","numeric"], ["lng","lng","numeric"]] },
  "Eruv": { t: "eruv", c: [["area","area","text"], ["lat","lat","numeric"], ["lng","lng","numeric"], ["zoom","zoom","numeric"]] },
  "Gemachim": { t: "gemachim", c: [["Name","name","text"], ["Category","category","text"], ["Lends","lends","text"], ["ContactName","contactname","text"], ["Phone","phone","text"], ["Email","email","text"], ["Website","website","text"], ["Area","area","text"], ["Hours","hours","text"], ["Notes","notes","text"], ["CardImage","cardimage","text"], ["Status","status","text"]] },
  "SelfHelp": { t: "selfhelp", c: [["Title","title","text"], ["Category","category","text"], ["Summary","summary","text"], ["Steps","steps","text"], ["Safety","safety","text"], ["VideoID","videoid","text"], ["LinkURL","linkurl","text"], ["LinkText","linktext","text"], ["Image","image","text"], ["Status","status","text"]] }
  };

  /* --------------------------------------------------------
     Format helpers. The date handling is the important part:
     new Date("2026-05-31") is read as UTC midnight, which in
     Houston is the evening of May 30 — every date on the site
     would move back a day. Dates are built locally instead.
     -------------------------------------------------------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function localDate(s) {
    var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3]);
  }
  function isoDay(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /* Build one GViz cell. GViz hands dates over as the string
     "Date(2026,4,31)" with the month zero-based, and the site's
     parseDate() already knows that shape, so reproduce it. */
  function cell(value, type) {
    if (value === null || value === undefined || value === '') return null;

    if (type === 'date') {
      var d = localDate(value);
      if (!d) return { v: String(value), f: String(value) };
      return { v: 'Date(' + d.getFullYear() + ',' + d.getMonth() + ',' + d.getDate() + ')',
               f: isoDay(d) };
    }
    if (type === 'timestamptz') {
      var ts = new Date(value);
      if (isNaN(ts.getTime())) return { v: String(value), f: String(value) };
      return { v: 'Date(' + ts.getFullYear() + ',' + ts.getMonth() + ',' + ts.getDate() + ',' +
                    ts.getHours() + ',' + ts.getMinutes() + ',' + ts.getSeconds() + ')',
               f: isoDay(ts) + ' ' + pad(ts.getHours()) + ':' + pad(ts.getMinutes()) + ':' + pad(ts.getSeconds()) };
    }
    if (type === 'numeric' || type === 'integer') {
      var n = Number(value);
      if (isNaN(n)) return { v: String(value), f: String(value) };
      return { v: n, f: String(n) };
    }
    if (type === 'boolean') {
      return { v: !!value, f: value ? 'TRUE' : 'FALSE' };
    }
    return { v: String(value), f: String(value) };
  }

  function gvizType(t) {
    if (t === 'date') return 'date';
    if (t === 'timestamptz') return 'datetime';
    if (t === 'numeric' || t === 'integer') return 'number';
    if (t === 'boolean') return 'boolean';
    return 'string';
  }

  /* The site parses the reply with text.substring(47, len - 2), so the
     wrapper has to be byte-for-byte what Google sends. */
  var PREFIX = '/*O_o*/\ngoogle.visualization.Query.setResponse(';
  var SUFFIX = ');';

  function buildGviz(spec, rows) {
    var cols = spec.c.map(function (c) {
      return { id: c[1], label: c[0], type: gvizType(c[2]) };
    });
    var out = rows.map(function (rec) {
      return { c: spec.c.map(function (c) { return cell(rec[c[1]], c[2]); }) };
    });
    return PREFIX + JSON.stringify({
      version: '0.6', reqId: '0', status: 'ok',
      table: { cols: cols, rows: out }
    }) + SUFFIX;
  }

  /* Which tab is this Google URL asking for? */
  function tabOf(url) {
    if (url.indexOf('docs.google.com/spreadsheets') < 0) return null;
    if (url.indexOf('gviz/tq') < 0) return null;
    var m = url.match(/[?&]sheet=([^&]+)/);
    if (!m) return null;
    var want = decodeURIComponent(m[1]);
    /* Tab names are matched case-insensitively — the pages spell
       "shuls" and "Shuls" inconsistently. */
    var keys = Object.keys(MAP);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === want.toLowerCase()) return keys[i];
    }
    return null;
  }

  var realFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    var url = (typeof input === 'string') ? input : (input && input.url) || '';
    var tab = null;
    try { tab = tabOf(url); } catch (e) { tab = null; }
    if (!tab) return realFetch(input, init);

    var spec = MAP[tab];
    var api = SUPABASE_URL + '/rest/v1/' + spec.t +
              '?select=*&order=row_index.asc.nullslast';

    return realFetch(api, {
      headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY }
    }).then(function (res) {
      if (!res.ok) throw new Error('supabase ' + res.status);
      return res.json();
    }).then(function (rows) {
      var text = buildGviz(spec, rows);
      return new Response(text, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }).catch(function (err) {
      /* If Supabase is unreachable, fall back to Google rather than
         leaving the page blank. During the changeover both sources
         hold the same data, so a failure costs nothing visible. */
      try { console.warn('[hji-data] Supabase read failed for "' + tab + '", using Sheets:', err); } catch (e) {}
      return realFetch(input, init);
    });
  };

  /* Quick check from the browser console: hjiDataSelfTest() */
  window.hjiDataSelfTest = function () {
    var names = Object.keys(MAP), i = 0, bad = 0;
    (function next() {
      if (i >= names.length) {
        console.log(bad ? bad + ' table(s) failed' : 'All ' + names.length + ' tables read from Supabase.');
        return;
      }
      var tab = names[i++];
      fetch('https://docs.google.com/spreadsheets/d/x/gviz/tq?tqx=out:json&headers=1&sheet=' +
            encodeURIComponent(tab))
        .then(function (r) { return r.text(); })
        .then(function (t) {
          var j = JSON.parse(t.substring(47, t.length - 2));
          console.log(tab, '->', j.table.rows.length, 'rows,', j.table.cols.length, 'cols');
        })
        .catch(function (e) { bad++; console.error(tab, e); })
        .then(next);
    })();
  };
})();
