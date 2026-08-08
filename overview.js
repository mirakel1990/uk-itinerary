/* Overview page — every day of the trip summarised on one page.
   Reads the same window.TRIP_DATA as the day-by-day view. */

(function () {
  "use strict";

  var DATA = window.TRIP_DATA || { title: "Trip", start: null, end: null, days: {} };

  /* ---------- dates (same helpers as app.js) ---------- */

  function parseISO(iso) {
    var p = iso.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function toISO(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function tripDates() {
    var out = [];
    if (!DATA.start || !DATA.end) return out;
    var d = parseISO(DATA.start), end = parseISO(DATA.end);
    while (d <= end) {
      out.push(d);
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    return out;
  }

  function fmt(d, opts) { return d.toLocaleDateString("en-GB", opts); }

  function fmtTime(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
    if (!m) return hhmm;
    var h = parseInt(m[1], 10);
    return (h % 12 || 12) + ":" + m[2] + " " + (h < 12 ? "AM" : "PM");
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- lookups ---------- */

  function dayEntry(iso) { return (DATA.days && DATA.days[iso]) || null; }

  function sortedItems(entry) {
    if (!entry || !entry.items) return [];
    return entry.items.slice().sort(function (a, b) {
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });
  }

  function stayForNight(iso) {
    var stays = DATA.stays || [];
    for (var i = 0; i < stays.length; i++) {
      if (iso >= stays[i].firstNight && iso <= stays[i].lastNight) return stays[i];
    }
    return null;
  }

  function workForDay(iso) {
    var blocks = DATA.workBlocks || [];
    for (var i = 0; i < blocks.length; i++) {
      if (iso >= blocks[i].firstDay && iso <= blocks[i].lastDay) return blocks[i];
    }
    return null;
  }

  /* ---------- header ---------- */

  document.getElementById("tripTitle").textContent = DATA.title || "Trip";
  document.title = "Overview — " + (DATA.title || "Trip");

  var dates = tripDates();
  if (dates.length) {
    document.getElementById("tripDates").textContent =
      fmt(dates[0], { day: "numeric", month: "long" }) + " – " +
      fmt(dates[dates.length - 1], { day: "numeric", month: "long", year: "numeric" }) +
      " · " + dates.length + " days";
  }

  /* ---------- trip-wide totals ---------- */

  var totals = { planned: 0, open: 0, stops: 0, photos: 0, mustBook: [] };

  dates.forEach(function (d) {
    var iso = toISO(d);
    var items = sortedItems(dayEntry(iso));
    if (items.length) totals.planned++; else totals.open++;
    totals.stops += items.length;
    items.forEach(function (it) {
      totals.photos += (it.photos || []).length;
      if (it.booking && it.booking.level === "required") {
        totals.mustBook.push({
          iso: iso,
          label: fmt(d, { weekday: "short", day: "numeric", month: "short" }),
          name: it.booking.shortName || it.title,
        });
      }
    });
  });

  var stats = document.getElementById("overviewStats");
  [
    [totals.planned, "days planned"],
    [totals.open, "days open"],
    [totals.stops, "stops"],
    [totals.mustBook.length, "to book"],
  ].forEach(function (pair) {
    var box = el("div", "ov-stat");
    box.appendChild(el("span", "ov-stat-num", String(pair[0])));
    box.appendChild(el("span", "ov-stat-label", pair[1]));
    stats.appendChild(box);
  });

  /* ---------- what still needs booking ---------- */

  if (totals.mustBook.length) {
    var box = document.getElementById("overviewBookings");
    box.appendChild(el("h2", "ov-bookings-title", "🎟️ Book these in advance"));
    var ul = el("ul", "ov-booking-list");
    totals.mustBook.forEach(function (b) {
      var li = el("li");
      var a = el("a", "ov-booking-link", b.name);
      a.href = "index.html#" + b.iso;
      li.appendChild(a);
      li.appendChild(el("span", "ov-booking-day", b.label));
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  /* ---------- the day list ---------- */

  var list = document.getElementById("overview");

  dates.forEach(function (d) {
    var iso = toISO(d);
    var entry = dayEntry(iso);
    var items = sortedItems(entry);
    var work = workForDay(iso);
    var stay = stayForNight(iso);

    var card = el("article", "ov-day" + (items.length ? "" : " ov-day-open"));

    // header row: date + label
    var head = el("a", "ov-day-head");
    head.href = "index.html#" + iso;
    var dateBox = el("div", "ov-date");
    dateBox.appendChild(el("span", "ov-dow", fmt(d, { weekday: "short" })));
    dateBox.appendChild(el("span", "ov-dom", String(d.getDate())));
    dateBox.appendChild(el("span", "ov-mon", fmt(d, { month: "short" })));
    head.appendChild(dateBox);

    var headText = el("div", "ov-head-text");
    headText.appendChild(el("h2", "ov-title", (entry && entry.label) || "Open — nothing planned"));

    var badges = el("div", "ov-badges");
    if (items.length) {
      badges.appendChild(el("span", "ov-badge", items.length + (items.length === 1 ? " stop" : " stops")));
    }
    if (work) badges.appendChild(el("span", "ov-badge ov-badge-work", "💻 Work " + work.localHours));
    if (stay && stay.location) {
      badges.appendChild(el("span", "ov-badge ov-badge-stay", "🛏️ " + stay.name));
    } else if (stay) {
      badges.appendChild(el("span", "ov-badge ov-badge-stay", "🛏️ " + stay.name));
    }
    if (badges.childNodes.length) headText.appendChild(badges);
    head.appendChild(headText);
    card.appendChild(head);

    if (!items.length) {
      card.appendChild(el("p", "ov-empty", "Nothing booked — free to fill."));
      list.appendChild(card);
      return;
    }

    // compact stop list
    var ol = el("ol", "ov-stops");
    items.forEach(function (it) {
      var li = el("li", "ov-stop");
      li.appendChild(el("span", "ov-stop-time", it.time ? fmtTime(it.time) : "—"));

      var body = el("span", "ov-stop-body");
      body.appendChild(el("span", "ov-stop-title", it.title || "Untitled stop"));

      var marks = [];
      if (it.booking && it.booking.level === "required") marks.push("🎟️");
      if ((it.photos || []).length) marks.push("📷");
      if ((it.food || []).length) marks.push("🍽");
      if (marks.length) body.appendChild(el("span", "ov-stop-marks", marks.join(" ")));

      li.appendChild(body);
      ol.appendChild(li);
    });
    card.appendChild(ol);

    list.appendChild(card);
  });
})();
