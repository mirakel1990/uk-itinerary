# London & Edinburgh 2026 — Itinerary

A small, no-build website for planning our London + Edinburgh trip, **23 September – 15 October 2026**.

Live site: **https://mirakel1990.github.io/uk-itinerary/** (auto-redeploys on every push).

Every day of the trip gets its own page: stops in time order, the transport options
for reaching each stop (with minutes, and steps when walking), a Google Maps link per
stop, and a one-click **"Plot day in Google Maps"** route for the whole day.

## Viewing it

- Quick look: open `index.html` in a browser.
- Proper local server: `python3 -m http.server` in this folder, then visit <http://localhost:8000>.
- To put it online: enable **GitHub Pages** for this repo (Settings → Pages → deploy from the main branch, root folder). No build step needed.

## Editing the itinerary

Everything lives in **`itinerary.js`** — the only file to touch day-to-day.
It holds the live plan: the London photo-spot clusters, the wedding block
(25–27 Sept), and the 4-day Edinburgh leg (3–6 Oct). Times are planning
estimates — nudge them as bookings firm up.

Add a day by keying it with its ISO date:

```js
"2026-09-25": {
  label: "Museums day",            // optional headline shown under the date
  items: [
    {
      time: "10:00",               // 24h in the data, shown as "10:00 AM" (optional — untimed stops sort last)
      title: "Natural History Museum",
      notes: "Free entry; book a slot anyway.",
      location: {
        name: "Natural History Museum",           // shown on the page
        query: "Natural History Museum, London",  // what Google Maps searches for
        // lat: 51.4967, lng: -0.1764             // optional, overrides query
      },
      transport: [                 // options for getting here FROM THE PREVIOUS stop
        { mode: "tube", detail: "Piccadilly line to South Kensington", minutes: 20 },
        { mode: "walk", minutes: 35, steps: 4100 },
      ],
    },
  ],
},
```

### Field reference

| Field | Required | Notes |
| --- | --- | --- |
| `time` | no | `"HH:MM"`, 24-hour in the data; displayed as AM/PM. Items are sorted by it. |
| `title` | yes | What you're doing. |
| `notes` | no | Free text. |
| `location.name` | no | Display name. |
| `location.query` | no | Search text for Google Maps (falls back to `name`). |
| `location.lat` / `lng` | no | Exact pin; overrides `query` when both are set. |
| `transport` | no | Array of options for the leg from the previous stop. |
| `transport[].mode` | yes | `walk`, `tube`, `bus`, `train`, `taxi`, `car`, `boat`, `plane`, `bike`. |
| `transport[].detail` | no | Line, route, or any note ("Piccadilly line"). |
| `transport[].minutes` | no | Journey time. |
| `transport[].steps` | no | Walking only. If omitted, estimated as ~110 steps/min. |

Days with no entry in `itinerary.js` automatically show as free days — no need to
list them.

## How the Google Maps links work

- **Open in Google Maps** — drops a pin from the stop's `location`.
- **Directions from previous stop** — origin is the previous stop; the travel mode is
  inferred from the stop's transport options (all walking → walking; any tube/bus/train/boat
  → transit; taxi/car → driving).
- **Plot day in Google Maps** — one multi-stop route through every located stop of the
  day, in time order. Google Maps allows 11 stops per route, so busier days automatically
  split into "part 1 / part 2" links that share a connecting stop.

## Files

| File | Purpose |
| --- | --- |
| `itinerary.js` | **The data — edit this one.** |
| `index.html` | Page shell. |
| `app.js` | Renders the day strip and day views from the data. |
| `styles.css` | Look and feel (light + dark mode). |

## Later

Planned but not built yet: sections within a day (morning / afternoon / evening),
bookings & tickets, budgets. The data format was kept flexible so these can be added
without reshuffling existing entries.
