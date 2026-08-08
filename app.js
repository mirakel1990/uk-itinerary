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

  // Full Google Maps directions, for opening in a new tab / the Maps app.
  function mapsDirectionsUrl(fromLoc, toLoc, travelmode) {
    var a = mapsPoint(fromLoc), b = mapsPoint(toLoc);
    if (!a || !b || a === b) return null;
    var url = "https://www.google.com/maps/dir/?api=1" +
      "&origin=" + encodeURIComponent(a) +
      "&destination=" + encodeURIComponent(b);
    if (travelmode) url += "&travelmode=" + travelmode;
    return url;
  }

  // Keyless embeddable directions (classic Maps URL with output=embed —
  // the modern /maps/dir/ URLs refuse to load in an iframe).
  function mapsEmbedDirectionsUrl(fromLoc, toLoc, travelmode) {
    var a = mapsPoint(fromLoc), b = mapsPoint(toLoc);
    if (!a || !b) return null;
    if (a === b) return null; // no route from a place to itself
    var flg = { walking: "w", transit: "r", driving: "d", bicycling: "b" }[travelmode];
    var url = "https://maps.google.com/maps?saddr=" + encodeURIComponent(a) +
      "&daddr=" + encodeURIComponent(b) + "&output=embed";
    if (flg) url += "&dirflg=" + flg;
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

  /* ---------- accommodation ---------- */

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

  function workCard(work) {
    var card = el("aside", "work-card");
    card.appendChild(el("p", "work-kicker", "💻 " + (work.label || "Work hours")));
    if (work.localHours) card.appendChild(el("h3", "work-hours", work.localHours));
    if (work.homeHours) card.appendChild(el("p", "work-meta", work.homeHours));
    if (work.backBy) {
      card.appendChild(el("p", "work-deadline", "⏰ Be back at the hotel by " + fmtTime(work.backBy)));
    }
    if (work.notes) card.appendChild(el("p", "work-notes", work.notes));
    return card;
  }

  function stayCard(stay, iso) {
    var DAY_MS = 24 * 60 * 60 * 1000;
    var nights = Math.round((parseISO(stay.lastNight) - parseISO(stay.firstNight)) / DAY_MS) + 1;
    var tonight = Math.round((parseISO(iso) - parseISO(stay.firstNight)) / DAY_MS) + 1;

    var card = el("aside", "stay-card");
    card.appendChild(el("p", "stay-kicker",
      "🛏️ Accommodation" + (nights > 1 ? " · night " + tonight + " of " + nights : "")));
    card.appendChild(el("h3", "stay-name", stay.name || "Somewhere to sleep"));

    var meta = [];
    if (stay.address) meta.push(stay.address);
    if (stay.phone) meta.push("tel " + stay.phone);
    if (meta.length) card.appendChild(el("p", "stay-meta", meta.join(" · ")));
    if (stay.notes) card.appendChild(el("p", "stay-notes", stay.notes));

    var url = mapsSearchUrl(stay.location);
    if (url) {
      var links = el("div", "stop-links");
      links.appendChild(link(url, "maps-link", "Open in Google Maps"));
      card.appendChild(links);
    }
    return card;
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

  // Button that expands an embedded directions map inside the card.
  // The iframe is only created on first open, so hidden maps cost nothing.
  function routeToggle(card, embedUrl, label) {
    var closedLabel = label || "Route from previous stop";
    var btn = el("button", "map-toggle", closedLabel);
    btn.type = "button";
    var wrap = null;
    btn.addEventListener("click", function () {
      if (!wrap) {
        wrap = el("div", "map-embed");
        var frame = document.createElement("iframe");
        frame.src = embedUrl;
        frame.loading = "lazy";
        frame.title = closedLabel;
        frame.allowFullscreen = true;
        wrap.appendChild(frame);
        card.appendChild(wrap);
      } else {
        wrap.classList.toggle("collapsed");
      }
      var open = !wrap.classList.contains("collapsed");
      btn.classList.toggle("open", open);
      btn.textContent = open ? "Hide route map" : closedLabel;
    });
    return btn;
  }

  var BOOKING_LEVELS = {
    required:    { emoji: "🎟️", label: "Book ahead" },
    recommended: { emoji: "📋", label: "Worth booking" },
  };

  function bookingBadge(booking) {
    var level = BOOKING_LEVELS[booking.level] || BOOKING_LEVELS.recommended;
    var box = el("p", "booking booking-" + (booking.level || "recommended"));
    box.appendChild(el("span", "booking-label", level.emoji + " " + level.label));
    if (booking.notes) box.appendChild(el("span", "booking-notes", booking.notes));
    if (booking.via) box.appendChild(el("span", "booking-via", "Where to book: " + booking.via));
    return box;
  }

  // Collapsible list of extras (optional to-dos / must-try food), collapsed by default.
  function detailsList(className, summaryLabel, entries) {
    var box = el("details", className);
    var sum = el("summary", null, summaryLabel + " (" + entries.length + ")");
    box.appendChild(sum);
    var ul = el("ul", "extra-list");
    entries.forEach(function (e) {
      var item = (typeof e === "string") ? { title: e } : e;
      var li = el("li");
      li.appendChild(el("span", "extra-title", item.title));
      if (item.where) li.appendChild(el("span", "extra-where", item.where));
      if (item.notes) li.appendChild(el("span", "extra-notes", item.notes));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    return box;
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
      ? (entry && entry.countLabel) || items.length + (items.length === 1 ? " stop" : " stops")
      : "Nothing planned yet"));
    if (entry && entry.note) headText.appendChild(el("p", "day-note", entry.note));

    // Roll up anything on this day that has to be booked in advance.
    var needBooking = items.filter(function (it) {
      return it.booking && it.booking.level === "required";
    });
    if (needBooking.length) {
      var names = needBooking.map(function (it) {
        return (it.booking.shortName || it.title).replace(/ —.*$/, "");
      });
      headText.appendChild(el("p", "day-booking",
        "🎟️ Book ahead: " + names.join(", ")));
    }
    header.appendChild(headText);

    // The day starts wherever we woke up — the previous night's stay.
    var wake = stayForNight(toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)));
    var wakeLoc = (wake && wake.location) || null;

    // Plot the whole day as one Google Maps route, starting from the accommodation.
    var points = items.map(function (it) { return mapsPoint(it.location); })
      .filter(function (p) { return p; });
    if (wakeLoc) points.unshift(mapsPoint(wakeLoc));
    points = points.filter(function (p, i) { return i === 0 || p !== points[i - 1]; });
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

    var work = workForDay(iso);
    if (work) dayView.appendChild(workCard(work));

    var stay = stayForNight(iso);
    if (stay) dayView.appendChild(stayCard(stay, iso));

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
    var prev = wakeLoc ? { location: wakeLoc, fromStay: true } : null;
    items.forEach(function (it) {
      var li = el("li", "stop");
      li.appendChild(el("div", "stop-time", it.time ? fmtTime(it.time) : "—"));

      var card = el("div", "stop-card");
      card.appendChild(el("h3", "stop-title", it.title || "Untitled stop"));
      if (it.location && it.location.name) {
        card.appendChild(el("p", "stop-place", "📍 " + it.location.name));
      }
      if (it.notes) card.appendChild(el("p", "stop-notes", it.notes));
      if (it.booking) card.appendChild(bookingBadge(it.booking));

      if (it.photos && it.photos.length) {
        var photos = el("div", "photos");
        it.photos.forEach(function (ph) {
          var p = (typeof ph === "string") ? { src: ph } : ph;
          var a = link(p.href || p.src, "photo", null);
          var img = document.createElement("img");
          img.src = p.src;
          img.loading = "lazy";
          img.alt = p.caption || "Reference photo";
          a.appendChild(img);
          if (p.caption) a.appendChild(el("span", "photo-caption", p.caption));
          photos.appendChild(a);
        });
        card.appendChild(photos);
      }

      if (it.transport && it.transport.length) {
        var chips = el("div", "transport");
        it.transport.forEach(function (opt) { chips.appendChild(transportChip(opt)); });
        card.appendChild(chips);
      }

      if ((it.optional && it.optional.length) || (it.food && it.food.length)) {
        var extras = el("div", "extras");
        if (it.optional && it.optional.length) {
          extras.appendChild(detailsList("extra optional", "✨ Optional to-dos", it.optional));
        }
        if (it.food && it.food.length) {
          extras.appendChild(detailsList("extra food", "🍽️ Must-try food", it.food));
        }
        card.appendChild(extras);
      }

      var links = el("div", "stop-links");
      var searchUrl = mapsSearchUrl(it.location);
      if (searchUrl) links.appendChild(link(searchUrl, "maps-link", "Open in Google Maps"));
      if (prev) {
        var mode = travelmodeFor(it.transport);
        var dirUrl = mapsDirectionsUrl(prev.location, it.location, mode);
        if (dirUrl) links.appendChild(link(dirUrl, "maps-link", "Route in Google Maps"));
        var embedUrl = mapsEmbedDirectionsUrl(prev.location, it.location, mode);
        if (embedUrl) links.appendChild(routeToggle(card, embedUrl, prev.fromStay ? "Route from accommodation" : null));
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

  /* ---------- search ---------- */

  // Flatten every stop on every day into one searchable index, built once.
  function buildSearchIndex() {
    var index = [];
    tripDates().forEach(function (d) {
      var iso = toISO(d);
      var entry = dayEntry(iso);
      if (!entry) return;
      var dayLabel = fmt(d, { weekday: "short", day: "numeric", month: "short" });

      sortedItems(entry).forEach(function (it) {
        var parts = [it.title, it.notes, entry.label];
        if (it.location) parts.push(it.location.name, it.location.query);
        (it.optional || []).forEach(function (x) { parts.push(x.title, x.where, x.notes); });
        (it.food || []).forEach(function (x) { parts.push(x.title, x.where, x.notes); });
        (it.transport || []).forEach(function (t) { parts.push(t.detail, t.mode); });
        if (it.booking) parts.push(it.booking.notes, it.booking.via, "booking");

        index.push({
          iso: iso,
          dayLabel: dayLabel,
          title: it.title || "Untitled stop",
          time: it.time,
          place: it.location && it.location.name,
          haystack: parts.filter(Boolean).join(" ").toLowerCase(),
        });
      });
    });
    return index;
  }

  var searchIndex = null;
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  var searchClear = document.getElementById("searchClear");

  function runSearch(q) {
    if (!searchIndex) searchIndex = buildSearchIndex();
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchIndex.filter(function (row) {
      return terms.every(function (t) { return row.haystack.indexOf(t) !== -1; });
    });
  }

  function renderSearchResults(q) {
    searchResults.textContent = "";
    var hits = runSearch(q);

    if (!q.trim()) {
      searchResults.hidden = true;
      searchInput.setAttribute("aria-expanded", "false");
      return;
    }

    if (!hits.length) {
      searchResults.appendChild(el("p", "search-empty", "Nothing matches “" + q + "”."));
    } else {
      searchResults.appendChild(el("p", "search-count",
        hits.length + (hits.length === 1 ? " match" : " matches")));

      hits.slice(0, 40).forEach(function (hit) {
        var row = el("button", "search-hit");
        row.type = "button";
        row.setAttribute("role", "option");
        row.appendChild(el("span", "search-hit-title", hit.title));
        var meta = hit.dayLabel + (hit.time ? " · " + fmtTime(hit.time) : "");
        if (hit.place) meta += " · " + hit.place;
        row.appendChild(el("span", "search-hit-meta", meta));
        row.addEventListener("click", function () {
          closeSearch();
          selectDay(hit.iso);
          highlightStop(hit.title);
        });
        searchResults.appendChild(row);
      });

      if (hits.length > 40) {
        searchResults.appendChild(el("p", "search-count",
          "…and " + (hits.length - 40) + " more. Try a more specific word."));
      }
    }

    searchResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  }

  // Scroll to the matched stop on the newly-rendered day and flash it.
  function highlightStop(title) {
    var cards = dayView.querySelectorAll(".stop-card");
    for (var i = 0; i < cards.length; i++) {
      var h = cards[i].querySelector(".stop-title");
      if (h && h.textContent === title) {
        cards[i].scrollIntoView({ block: "center", behavior: "smooth" });
        cards[i].classList.add("flash");
        (function (card) {
          setTimeout(function () { card.classList.remove("flash"); }, 1600);
        })(cards[i]);
        return;
      }
    }
  }

  function closeSearch() {
    searchInput.value = "";
    searchResults.hidden = true;
    searchResults.textContent = "";
    searchClear.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
  }

  searchInput.addEventListener("input", function () {
    searchClear.hidden = !searchInput.value;
    renderSearchResults(searchInput.value);
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSearch();
    if (e.key === "Enter") {
      var first = searchResults.querySelector(".search-hit");
      if (first) first.click();
    }
  });

  searchClear.addEventListener("click", function () {
    closeSearch();
    searchInput.focus();
  });

  // Click outside closes the dropdown.
  document.addEventListener("click", function (e) {
    if (!searchResults.hidden && !e.target.closest(".search")) {
      searchResults.hidden = true;
      searchInput.setAttribute("aria-expanded", "false");
    }
  });

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
