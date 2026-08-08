/* London trip itinerary — renderer.
   Reads window.TRIP_DATA (see itinerary.js) and draws the day strip + day view.
   No build step, no dependencies. */

(function () {
  "use strict";

  var DATA = window.TRIP_DATA || { title: "Trip", start: null, end: null, days: {} };

  var MODES = {
    walk:  { emoji: "🚶", label: "Walk" },
    tube:  { emoji: "🚇", label: "Tube" },
    bus:   { emoji: "🚌", label: "Bus" },
    train: { emoji: "🚆", label: "Train" },
    taxi:  { emoji: "🚕", label: "Taxi" },
    car:   { emoji: "🚗", label: "Car" },
    boat:  { emoji: "⛴️", label: "Boat" },
    plane: { emoji: "✈️", label: "Plane" },
    bike:  { emoji: "🚲", label: "Bike" },
  };

  // Casual sightseeing pace, used when a walk has minutes but no step count.
  var STEPS_PER_MINUTE = 110;

  // Google Maps directions URLs allow origin + destination + 9 waypoints.
  var MAX_STOPS_PER_ROUTE = 11;

  /* ---------- dates ---------- */

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
    var d = parseISO(DATA.start);
    var end = parseISO(DATA.end);
    while (d <= end) {
      out.push(d);
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    return out;
  }

  function fmt(d, opts) {
    return d.toLocaleDateString("en-GB", opts);
  }

  /* ---------- Google Maps links ---------- */

  function mapsPoint(loc) {
    if (!loc) return null;
    if (loc.lat != null && loc.lng != null) return loc.lat + "," + loc.lng;
    return loc.query || loc.name || null;
  }

  function mapsSearchUrl(loc) {
    var q = mapsPoint(loc);
    if (!q) return null;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  // walking / transit / driving / bicycling — from a list of transport options.
  function travelmodeFor(options) {
    if (!options || !options.length) return null;
    var modes = options.map(function (o) { return o.mode; });
    if (modes.every(function (m) { return m === "walk"; })) return "walking";
    if (modes.some(function (m) { return m === "tube" || m === "bus" || m === "train" || m === "boat"; })) return "transit";
    if (modes.some(function (m) { return m === "taxi" || m === "car"; })) return "driving";
    if (modes.some(function (m) { return m === "bike"; })) return "bicycling";
    return null;
  }

  function mapsDirectionsUrl(fromLoc, toLoc, travelmode) {
    var a = mapsPoint(fromLoc), b = mapsPoint(toLoc);
    if (!a || !b) return null;
    var url = "https://www.google.com/maps/dir/?api=1" +
      "&origin=" + encodeURIComponent(a) +
      "&destination=" + encodeURIComponent(b);
    if (travelmode) url += "&travelmode=" + travelmode;
    return url;
  }

  // One or more URLs plotting the given points in order (chunked at the
  // Google Maps waypoint limit; chunks overlap so routes connect).
  function mapsRouteUrls(points, travelmode) {
    var urls = [];
    var start = 0;
    while (start < points.length - 1) {
      var chunk = points.slice(start, start + MAX_STOPS_PER_ROUTE);
      var url = "https://www.google.com/maps/dir/?api=1" +
        "&origin=" + encodeURIComponent(chunk[0]) +
        "&destination=" + encodeURIComponent(chunk[chunk.length - 1]);
      var mid = chunk.slice(1, -1);
      if (mid.length) url += "&waypoints=" + encodeURIComponent(mid.join("|"));
      if (travelmode) url += "&travelmode=" + travelmode;
      urls.push(url);
      start += MAX_STOPS_PER_ROUTE - 1;
    }
    return urls;
  }

  /* ---------- tiny DOM helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function link(href, className, text) {
    var a = el("a", className, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  /* ---------- rendering ---------- */

  var dayStrip = document.getElementById("dayStrip");
  var dayView = document.getElementById("dayView");
  var selectedISO = null;

  function dayEntry(iso) {
    return (DATA.days && DATA.days[iso]) || null;
  }

  function sortedItems(entry) {
    if (!entry || !entry.items) return [];
    return entry.items.slice().sort(function (a, b) {
      return (a.time || "99:99").localeCompare(b.time || "99:99");
    });
  }

  // "14:00" → "2:00 PM" for display; the data stays 24-hour so sorting works.
  function fmtTime(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
    if (!m) return hhmm;
    var h = parseInt(m[1], 10);
    return (h % 12 || 12) + ":" + m[2] + " " + (h < 12 ? "AM" : "PM");
  }

  function renderHeader() {
    document.getElementById("tripTitle").textContent = DATA.title || "Trip";
    document.title = (DATA.title || "Trip") + " — Itinerary";
    var dates = tripDates();
    if (dates.length) {
      var span = fmt(dates[0], { day: "numeric", month: "long" }) +
        " – " + fmt(dates[dates.length - 1], { day: "numeric", month: "long", year: "numeric" });
      document.getElementById("tripDates").textContent = span + " · " + dates.length + " days";
    }
  }

  function renderStrip() {
    dayStrip.textContent = "";
    tripDates().forEach(function (d) {
      var iso = toISO(d);
      var entry = dayEntry(iso);
      var count = entry ? sortedItems(entry).length : 0;

      var btn = el("button", "day-chip");
      btn.type = "button";
      btn.dataset.iso = iso;
      btn.setAttribute("aria-label", fmt(d, { weekday: "long", day: "numeric", month: "long" }) +
        (count ? ", " + count + " stops" : ", nothing planned"));
      btn.appendChild(el("span", "dow", fmt(d, { weekday: "short" })));
      btn.appendChild(el("span", "dom", String(d.getDate())));
      btn.appendChild(el("span", "mon", fmt(d, { month: "short" })));
      btn.appendChild(el("span", "dot" + (count ? " has-items" : "")));
      btn.addEventListener("click", function () { selectDay(iso); });
      dayStrip.appendChild(btn);
    });
  }

  function transportChip(opt) {
    var mode = MODES[opt.mode] || { emoji: "➡️", label: opt.mode || "Go" };
    var parts = [mode.label];
    if (opt.detail) parts.push(opt.detail);
    if (opt.minutes != null) parts.push(opt.minutes + " min");

    if (opt.mode === "walk") {
      if (opt.steps != null) {
        parts.push(opt.steps.toLocaleString("en-GB") + " steps");
      } else if (opt.minutes != null) {
        parts.push("~" + (opt.minutes * STEPS_PER_MINUTE).toLocaleString("en-GB") + " steps");
      }
    }

    var chip = el("span", "chip");
    chip.appendChild(el("span", "chip-emoji", mode.emoji));
    chip.appendChild(el("span", null, parts.join(" · ")));
    return chip;
  }

  function renderDay(iso) {
    dayView.textContent = "";
    var d = parseISO(iso);
    var entry = dayEntry(iso);
    var items = sortedItems(entry);

    var header = el("div", "day-header");
    var headText = el("div", "day-header-text");
    headText.appendChild(el("h2", null, fmt(d, { weekday: "long", day: "numeric", month: "long" })));
    if (entry && entry.label) headText.appendChild(el("p", "day-label", entry.label));
    headText.appendChild(el("p", "day-count", items.length
      ? items.length + (items.length === 1 ? " stop" : " stops")
      : "Nothing planned yet"));
    header.appendChild(headText);

    // Plot the whole day as one Google Maps route.
    var points = items.map(function (it) { return mapsPoint(it.location); })
      .filter(function (p) { return p; });
    if (points.length >= 2) {
      var allOptions = [];
      items.forEach(function (it) { (it.transport || []).forEach(function (o) { allOptions.push(o); }); });
      var urls = mapsRouteUrls(points, travelmodeFor(allOptions));
      var actions = el("div", "day-actions");
      urls.forEach(function (url, i) {
        var label = urls.length === 1
          ? "🗺️ Plot day in Google Maps"
          : "🗺️ Plot day — part " + (i + 1) + " of " + urls.length;
        actions.appendChild(link(url, "btn", label));
      });
      header.appendChild(actions);
    }
    dayView.appendChild(header);

    if (!items.length) {
      var empty = el("div", "empty");
      empty.appendChild(el("p", null, "A free day, for now."));
      var hint = el("p", "hint");
      hint.append("Add stops for ", el("code", null, iso), " in ", el("code", null, "itinerary.js"), ".");
      empty.appendChild(hint);
      dayView.appendChild(empty);
      return;
    }

    var list = el("ol", "timeline");
    var prev = null;
    items.forEach(function (it) {
      var li = el("li", "stop");
      li.appendChild(el("div", "stop-time", it.time ? fmtTime(it.time) : "—"));

      var card = el("div", "stop-card");
      card.appendChild(el("h3", "stop-title", it.title || "Untitled stop"));
      if (it.location && it.location.name) {
        card.appendChild(el("p", "stop-place", "📍 " + it.location.name));
      }
      if (it.notes) card.appendChild(el("p", "stop-notes", it.notes));

      if (it.transport && it.transport.length) {
        var chips = el("div", "transport");
        it.transport.forEach(function (opt) { chips.appendChild(transportChip(opt)); });
        card.appendChild(chips);
      }

      var links = el("div", "stop-links");
      var searchUrl = mapsSearchUrl(it.location);
      if (searchUrl) links.appendChild(link(searchUrl, "maps-link", "Open in Google Maps"));
      if (prev) {
        var dirUrl = mapsDirectionsUrl(prev.location, it.location, travelmodeFor(it.transport));
        if (dirUrl) links.appendChild(link(dirUrl, "maps-link", "Directions from previous stop"));
      }
      if (links.childNodes.length) card.appendChild(links);

      li.appendChild(card);
      list.appendChild(li);
      prev = it;
    });
    dayView.appendChild(list);
  }

  function selectDay(iso) {
    selectedISO = iso;
    if (history.replaceState) history.replaceState(null, "", "#" + iso);
    var chips = dayStrip.querySelectorAll(".day-chip");
    chips.forEach(function (c) {
      var on = c.dataset.iso === iso;
      c.classList.toggle("selected", on);
      if (on) {
        c.setAttribute("aria-current", "date");
        c.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      } else {
        c.removeAttribute("aria-current");
      }
    });
    renderDay(iso);
  }

  function initialDay() {
    var dates = tripDates().map(toISO);
    if (!dates.length) return null;
    var hash = (location.hash || "").replace("#", "");
    if (dates.indexOf(hash) !== -1) return hash;
    var today = toISO(new Date());
    if (dates.indexOf(today) !== -1) return today;
    return dates[0];
  }

  renderHeader();
  renderStrip();
  var first = initialDay();
  if (first) selectDay(first);

  window.addEventListener("hashchange", function () {
    var iso = (location.hash || "").replace("#", "");
    if (iso && iso !== selectedISO && dayEntry(iso) !== undefined) {
      var dates = tripDates().map(toISO);
      if (dates.indexOf(iso) !== -1) selectDay(iso);
    }
  });
})();
