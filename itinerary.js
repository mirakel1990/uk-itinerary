/* =====================================================================
   LONDON & EDINBURGH 2026 — ITINERARY DATA
   =====================================================================
   This file holds the live trip plan. Every day of the trip
   (start → end) renders automatically; edit a day by finding its
   ISO date ("YYYY-MM-DD") under `days`.

   STOP (ITEM) SHAPE
   -----------------
   {
     time:  "14:00",                  // 24h in the data, shown as AM/PM; optional (untimed stops sort last)
     title: "Westminster Abbey",      // what you're doing
     notes: "Book tickets ahead.",    // optional free text
     location: {                      // where it is (used for all Google Maps links)
       name:  "Westminster Abbey",            // shown on the page
       query: "Westminster Abbey, London",    // what's searched in Google Maps
       // lat: 51.4994, lng: -0.1273          // optional; overrides query if set
     },
     transport: [                     // options for getting here FROM THE PREVIOUS STOP
       // mode: walk | tube | bus | train | taxi | car | boat | plane | bike
       { mode: "walk", minutes: 9, steps: 1000 },        // steps auto-estimated if omitted
       { mode: "tube", detail: "Jubilee line", minutes: 12 },
     ],
   }

   Times are planning estimates — nudge them as bookings firm up.
   Base for London days: Canning Town (Jubilee line + DLR on the doorstep).
   ===================================================================== */

window.TRIP_DATA = {
  title: "London & Edinburgh 2026",
  start: "2026-09-23",
  end:   "2026-10-15",

  days: {

    /* ---------------- LONDON, WEEK 1 ---------------- */

    "2026-09-23": {
      label: "Travel day — Manila → Singapore → London",
      items: [
        {
          time: "07:20",
          title: "SQ915 — Manila → Singapore",
          notes: "Departs NAIA Terminal 3 at 7:20 AM, lands Changi at 11:00 AM (no time-zone change). Aim to be at T3 by about 4:30 AM for bag drop. Times here are each airport's local clock.",
        },
        {
          time: "12:35",
          title: "SQ318 — Singapore → London",
          notes: "About 1 h 35 m to connect at Changi. Lands Heathrow at 7:30 PM UK time — 7 hours behind Manila/Singapore.",
        },
        {
          time: "19:30",
          title: "Land at Heathrow Terminal 2",
          notes: "Border queue and bags will take a while at this hour — the Elizabeth line runs from directly below the terminal.",
          location: { name: "Heathrow Terminal 2", query: "Heathrow Terminal 2, London" },
          transport: [
            { mode: "plane", detail: "SQ318, 13 h 55 m nonstop" },
          ],
        },
        {
          time: "21:45",
          title: "Check in — Canning Town base",
          notes: "Drop bags and get contactless/Oyster sorted. Update this entry with the actual hotel once booked.",
          location: { name: "Canning Town", query: "Canning Town Station, London" },
          transport: [
            { mode: "train", detail: "Elizabeth line to Custom House (direct or change at Paddington), then DLR one stop", minutes: 75 },
            { mode: "taxi", detail: "Cab from T2 arrivals", minutes: 55 },
          ],
        },
      ],
    },

    "2026-09-24": {
      label: "Cluster 1 — Westminster to West End walk",
      items: [
        {
          time: "09:30",
          title: "Big Ben & Parliament Square phone boxes",
          notes: "The red phone boxes on Parliament Square are the classic shot.",
          location: { name: "Big Ben", query: "Big Ben, London" },
          transport: [
            { mode: "tube", detail: "Jubilee line from Canning Town", minutes: 18 },
          ],
        },
        {
          time: "11:30",
          title: "Leicester Square — Bunsik corn dogs",
          notes: "The viral Bunsik korean corn dogs are on Charing Cross Road, right by the square.",
          location: { name: "Leicester Square", query: "Leicester Square, London" },
          transport: [
            { mode: "walk", minutes: 20, steps: 2200 },
          ],
        },
        {
          time: "13:00",
          title: "Chinatown lanterns",
          location: { name: "Chinatown", query: "Chinatown, Gerrard Street, London" },
          transport: [
            { mode: "walk", minutes: 3 },
          ],
        },
        {
          time: "15:00",
          title: "Neal's Yard, Covent Garden",
          notes: "Tiny, colourful courtyard — best light mid-afternoon.",
          location: { name: "Neal's Yard", query: "Neal's Yard, Covent Garden, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
        },
      ],
    },

    "2026-09-25": {
      label: "Reserved — wedding 💒",
      items: [ { title: "Reserved for the wedding" } ],
    },
    "2026-09-26": {
      label: "Reserved — wedding 💒",
      items: [ { title: "Reserved for the wedding" } ],
    },
    "2026-09-27": {
      label: "Reserved — wedding 💒",
      items: [ { title: "Reserved for the wedding" } ],
    },

    "2026-09-28": {
      label: "Cluster 2 — City heights & Harry Potter history",
      items: [
        {
          time: "10:00",
          title: "Horizon 22 — highest free view in London",
          notes: "Free, but book a slot online ahead.",
          location: { name: "Horizon 22", query: "Horizon 22, 22 Bishopsgate, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to London Bridge, walk over the bridge", minutes: 30 },
            { mode: "tube", detail: "DLR to Bank + short walk", minutes: 25 },
          ],
        },
        {
          time: "11:30",
          title: "Leadenhall Market — the film Diagon Alley",
          notes: "Filming location for Diagon Alley / the Leaky Cauldron in Philosopher's Stone.",
          location: { name: "Leadenhall Market", query: "Leadenhall Market, London" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
        },
        {
          time: "12:30",
          title: "St Dunstan in the East — ruined church garden",
          location: { name: "St Dunstan in the East", query: "St Dunstan in the East Church Garden, London" },
          transport: [
            { mode: "walk", minutes: 6 },
          ],
        },
        {
          time: "13:15",
          title: "The Garden at 120 — free rooftop",
          location: { name: "The Garden at 120", query: "The Garden at 120, Fenchurch Street, London" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
        },
        {
          time: "14:00",
          title: "Borough Market — the viral Humble Crumble",
          notes: "Cross London Bridge on foot for the skyline view on the way.",
          location: { name: "Borough Market", query: "Borough Market, London" },
          transport: [
            { mode: "walk", minutes: 16, steps: 1800 },
          ],
        },
      ],
    },

    "2026-09-29": {
      label: "Cluster 3 — Greenwich to East London",
      items: [
        {
          time: "09:30",
          title: "Painted Hall, Old Royal Naval College",
          location: { name: "Painted Hall, Greenwich", query: "Painted Hall, Old Royal Naval College, Greenwich, London" },
          transport: [
            { mode: "tube", detail: "DLR via Canary Wharf to Cutty Sark", minutes: 20 },
          ],
        },
        {
          time: "11:00",
          title: "Royal Observatory hike — the skyline photo",
          notes: "Uphill through Greenwich Park; the view over Canary Wharf is the shot.",
          location: { name: "Royal Observatory", query: "Royal Observatory Greenwich, London" },
          transport: [
            { mode: "walk", minutes: 18, steps: 2000 },
          ],
        },
        {
          time: "14:00",
          title: "Brick Lane — vintage markets",
          location: { name: "Brick Lane", query: "Brick Lane, London" },
          transport: [
            { mode: "train", detail: "DLR to Shadwell + Overground to Shoreditch High St", minutes: 30 },
          ],
        },
        {
          time: "15:30",
          title: "Beigel Bake — famous cheap salt beef bagel",
          notes: "Open 24h; cash-friendly, queue moves fast.",
          location: { name: "Beigel Bake", query: "Beigel Bake, Brick Lane, London" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
        },
      ],
    },

    "2026-09-30": {
      label: "Cluster 4 — Museums & gardens walk",
      items: [
        {
          time: "10:00",
          title: "Natural History Museum — Hintze Hall",
          notes: "Free entry — book a timeslot to skip the queue.",
          location: { name: "Natural History Museum", query: "Natural History Museum, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Piccadilly via Green Park to South Kensington", minutes: 35 },
          ],
        },
        {
          time: "12:30",
          title: "V&A Museum — tiled courtyard",
          notes: "Also free; the John Madejski Garden courtyard is the photo spot.",
          location: { name: "V&A Museum", query: "Victoria and Albert Museum, London" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
        },
        {
          time: "14:30",
          title: "Kyoto Garden, Holland Park",
          notes: "Free Japanese garden — look for the peacocks.",
          location: { name: "Kyoto Garden", query: "Kyoto Garden, Holland Park, London" },
          transport: [
            { mode: "walk", minutes: 30, steps: 3300 },
            { mode: "tube", detail: "Circle/District to High St Kensington + walk", minutes: 18 },
          ],
        },
      ],
    },

    "2026-10-01": {
      label: "Cluster 5 — Notting Hill to Camden canal",
      items: [
        {
          time: "09:30",
          title: "Notting Hill pastel houses — Lancaster Road",
          notes: "Go early for empty streets; be considerate — people live here.",
          location: { name: "Lancaster Road", query: "Lancaster Road, Notting Hill, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Central to Notting Hill Gate + 10-min walk", minutes: 45 },
          ],
        },
        {
          time: "10:45",
          title: "St Luke's Mews",
          notes: "The pink 'Love Actually' mews house.",
          location: { name: "St Luke's Mews", query: "St Luke's Mews, Notting Hill, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
        },
        {
          time: "12:00",
          title: "Regent's Canal towpath — start at Little Venice",
          notes: "Scenic waterside walk past Regent's Park and London Zoo, straight into Camden.",
          location: { name: "Little Venice", query: "Little Venice, London" },
          transport: [
            { mode: "walk", minutes: 26, steps: 2900 },
          ],
        },
        {
          time: "14:00",
          title: "Camden Market — budget street food",
          location: { name: "Camden Market", query: "Camden Market, London" },
          transport: [
            { mode: "walk", detail: "along the canal towpath", minutes: 50, steps: 5500 },
          ],
        },
      ],
    },

    "2026-10-02": {
      label: "Cluster 6 — Southbank & Death Eater bridges",
      items: [
        {
          time: "09:30",
          title: "Battersea Power Station",
          location: { name: "Battersea Power Station", query: "Battersea Power Station, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Northern line via Waterloo", minutes: 35 },
          ],
        },
        {
          time: "11:30",
          title: "Riverside walk to the London Eye",
          notes: "Long but flat riverside stroll — shortcut on the Northern line if feet complain.",
          location: { name: "London Eye", query: "London Eye, London" },
          transport: [
            { mode: "walk", minutes: 50, steps: 5500 },
            { mode: "tube", detail: "Northern line back to Waterloo", minutes: 20 },
          ],
        },
        {
          time: "13:30",
          title: "Tate Modern — free viewing level",
          location: { name: "Tate Modern", query: "Tate Modern, London" },
          transport: [
            { mode: "walk", minutes: 20, steps: 2200 },
          ],
        },
        {
          time: "15:00",
          title: "Millennium Bridge → St Paul's Cathedral",
          notes: "The bridge the Death Eaters destroy in Half-Blood Prince — line up the St Paul's shot from mid-bridge.",
          location: { name: "St Paul's Cathedral", query: "St Paul's Cathedral, London" },
          transport: [
            { mode: "walk", minutes: 10, steps: 1100 },
          ],
        },
      ],
    },

    /* ---------------- SCOTLAND: OCT 3–6 ---------------- */

    "2026-10-03": {
      label: "Scotland day 1 — arrival & Diagon Alley magic 🚂",
      items: [
        {
          time: "08:30",
          title: "Train to Edinburgh — depart King's Cross",
          notes: "Scotland budget ≈ £340pp: train £50 return (Lumo advance), 3 nights £120, food £100, Glenfinnan tour £60, tour tip £10.",
          location: { name: "London King's Cross", query: "London King's Cross Station" },
          transport: [
            { mode: "tube", detail: "Jubilee → H&C/District from West Ham", minutes: 35 },
          ],
        },
        {
          time: "13:00",
          title: "Arrive Edinburgh Waverley — drop bags",
          notes: "≈4.5h on Lumo or LNER, straight into the city centre. Walk to your accommodation first — update once booked.",
          location: { name: "Edinburgh Waverley", query: "Edinburgh Waverley Station" },
          transport: [
            { mode: "train", detail: "Lumo or LNER — book advance fares", minutes: 270 },
          ],
        },
        {
          time: "14:30",
          title: "Victoria Street — the real-life Diagon Alley",
          notes: "Curved, colourful, multi-level. Museum Context (big aesthetic Harry Potter shop) is at no. 40.",
          location: { name: "Victoria Street", query: "Victoria Street, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 10, steps: 1100 },
          ],
        },
        {
          time: "16:30",
          title: "Royal Mile & Cockburn Street stroll",
          notes: "Dark-academia architecture central — Cockburn Street's curve is the photo.",
          location: { name: "Cockburn Street", query: "Cockburn Street, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 6 },
          ],
        },
      ],
    },

    "2026-10-04": {
      label: "Scotland day 2 — free Potter tour & Tom Riddle's grave",
      items: [
        {
          time: "11:00",
          title: "The Potter Trail — free walking tour",
          notes: "Tip-based, book ahead; meets at the Greyfriars Bobby statue. Check your booked slot time.",
          location: { name: "Greyfriars Bobby", query: "Greyfriars Bobby Statue, Edinburgh" },
          transport: [
            { mode: "walk", detail: "from your accommodation", minutes: 12 },
          ],
        },
        {
          time: "12:15",
          title: "Greyfriars Kirkyard — Thomas Riddell & McGonagall graves",
          notes: "The tour brings you here — the actual gravestones of Thomas Riddell (Voldemort) and William McGonagall.",
          location: { name: "Greyfriars Kirkyard", query: "Greyfriars Kirkyard, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 2 },
          ],
        },
        {
          time: "13:00",
          title: "George Heriot's School — the Hogwarts inspiration",
          notes: "Best viewed from the kirkyard and Lauriston Place.",
          location: { name: "George Heriot's School", query: "George Heriot's School, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 5 },
          ],
        },
        {
          time: "17:45",
          title: "Calton Hill — free sweeping sunset view",
          notes: "Sunset around 6:40 PM in early October — go up 45 min early for a spot.",
          location: { name: "Calton Hill", query: "Calton Hill, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 25, steps: 2800 },
          ],
        },
      ],
    },

    "2026-10-05": {
      label: "Scotland day 3 — Highlands & the Hogwarts Express 🚂",
      items: [
        {
          time: "08:00",
          title: "Highlands minibus day tour — departure",
          notes: "Rabbie's or Timberbush, ~£60pp, ~12-hour day. Book ahead and make sure the route includes Glenfinnan Viaduct!",
          location: { name: "Rabbie's departure point", query: "6 Waterloo Place, Edinburgh" },
          transport: [
            { mode: "walk", detail: "from your accommodation", minutes: 15, steps: 1700 },
          ],
        },
        {
          time: "13:30",
          title: "Glenfinnan Viaduct — watch the Jacobite steam train cross",
          notes: "Stand on the hillside as the actual Hogwarts Express crosses the curved bridge — your guide times the crossing.",
          location: { name: "Glenfinnan Viaduct", query: "Glenfinnan Viaduct Viewpoint, Scotland" },
          transport: [
            { mode: "bus", detail: "tour minibus through the Highlands", minutes: 240 },
          ],
        },
      ],
    },

    "2026-10-06": {
      label: "Scotland day 4 — fairytale villages & back to London",
      items: [
        {
          time: "09:00",
          title: "Dean Village — hidden 19th-century village",
          notes: "Ridiculously photogenic; Well Court from the Water of Leith walkway is the classic angle.",
          location: { name: "Dean Village", query: "Dean Village, Edinburgh" },
          transport: [
            { mode: "walk", detail: "from your accommodation", minutes: 20, steps: 2200 },
          ],
        },
        {
          time: "11:00",
          title: "Princes Street Gardens — castle views & a pastry",
          location: { name: "Princes Street Gardens", query: "Princes Street Gardens, Edinburgh" },
          transport: [
            { mode: "walk", minutes: 15, steps: 1700 },
          ],
        },
        {
          time: "14:30",
          title: "Train back to London",
          notes: "≈4.5h to King's Cross, then Jubilee line home to Canning Town (~35 min).",
          location: { name: "Edinburgh Waverley", query: "Edinburgh Waverley Station" },
          transport: [
            { mode: "walk", minutes: 5 },
          ],
        },
      ],
    },

    /* ---------------- LONDON, FINAL WEEK ---------------- */

    "2026-10-07": {
      label: "Recovery & sugar day",
      items: [
        {
          time: "11:00",
          title: "Fortitude Bakehouse — viral pistachio beignets",
          notes: "Tiny Bloomsbury bakery — go before the lunchtime queue.",
          location: { name: "Fortitude Bakehouse", query: "Fortitude Bakehouse, Colonnade, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Piccadilly to Russell Square", minutes: 35 },
          ],
        },
        {
          time: "13:00",
          title: "Oxford Street — budget window shopping",
          location: { name: "Oxford Street", query: "Oxford Street, London" },
          transport: [
            { mode: "walk", minutes: 20, steps: 2200 },
            { mode: "tube", detail: "Central line from Holborn", minutes: 10 },
          ],
        },
      ],
    },

    "2026-10-08": {
      label: "Mayfair on a budget",
      items: [
        {
          time: "10:30",
          title: "Regent Street — the sweeping curve",
          location: { name: "Regent Street", query: "Regent Street, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Bond Street + short walk", minutes: 30 },
          ],
        },
        {
          time: "11:30",
          title: "Liberty London — Tudor facade photos",
          location: { name: "Liberty London", query: "Liberty London, Great Marlborough Street" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
        },
        {
          time: "13:00",
          title: "Mercato Mayfair — street food in a restored church",
          notes: "Affordable food hall under a stunning painted ceiling.",
          location: { name: "Mercato Mayfair", query: "Mercato Mayfair, North Audley Street, London" },
          transport: [
            { mode: "walk", minutes: 15, steps: 1700 },
          ],
        },
      ],
    },

    "2026-10-09": {
      label: "King's Cross magic ⚡",
      items: [
        {
          time: "10:00",
          title: "Platform 9¾ — trolley photo",
          notes: "Inside King's Cross station; queue is shortest before ~11 AM. The shop is next to it.",
          location: { name: "Platform 9¾", query: "Platform 9 3/4, King's Cross Station, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → H&C/District from West Ham", minutes: 35 },
          ],
        },
        {
          time: "12:00",
          title: "Granary Square — illuminated steps",
          location: { name: "Granary Square", query: "Granary Square, King's Cross, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
        },
        {
          time: "13:00",
          title: "Dishoom King's Cross — the viral black daal",
          notes: "Walk-ins fine at lunch; the daal is the order.",
          location: { name: "Dishoom King's Cross", query: "Dishoom King's Cross, Stable Street, London" },
          transport: [
            { mode: "walk", minutes: 3 },
          ],
        },
      ],
    },

    "2026-10-10": {
      label: "Royal parks & cheap luxuries",
      items: [
        {
          time: "10:00",
          title: "Buckingham Palace gates",
          location: { name: "Buckingham Palace", query: "Buckingham Palace, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Green Park + walk through the park", minutes: 30 },
          ],
        },
        {
          time: "11:30",
          title: "St James's Park — find the pelicans",
          notes: "They're usually near Duck Island at the east end of the lake.",
          location: { name: "St James's Park", query: "St James's Park, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
        },
        {
          time: "13:00",
          title: "Fortnum & Mason — £30 biscuit-tin souvenirs",
          notes: "The ultimate budget-friendly high-end souvenir run.",
          location: { name: "Fortnum & Mason", query: "Fortnum and Mason, Piccadilly, London" },
          transport: [
            { mode: "walk", minutes: 11, steps: 1200 },
          ],
        },
      ],
    },

    "2026-10-11": {
      label: "Little Venice strolls",
      items: [
        {
          time: "10:30",
          title: "Little Venice — colourful narrowboats",
          notes: "Wander the canal junction, then drift along the towpath.",
          location: { name: "Little Venice", query: "Little Venice, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Bakerloo to Warwick Avenue", minutes: 40 },
          ],
        },
        {
          time: "19:00",
          title: "Chinatown Bakery — £1.50 fluffy BBQ pork buns",
          notes: "Late-night cheap eats; the taiyaki machine in the window is hypnotic.",
          location: { name: "Chinatown Bakery", query: "Chinatown Bakery, Newport Court, London" },
          transport: [
            { mode: "tube", detail: "Bakerloo to Piccadilly Circus + walk", minutes: 25 },
          ],
        },
      ],
    },

    "2026-10-12": {
      label: "Soho lattes & skyline reflections",
      items: [
        {
          time: "10:30",
          title: "One New Change — glass lift & St Paul's reflections",
          notes: "Free rooftop + the glass elevator; the reflection shot of St Paul's is from the east terrace.",
          location: { name: "One New Change", query: "One New Change, London" },
          transport: [
            { mode: "tube", detail: "DLR to Bank + short walk", minutes: 25 },
          ],
        },
        {
          time: "12:30",
          title: "SpudBros Express — jacket potatoes",
          location: { name: "SpudBros Express", query: "SpudBros Express, Shaftesbury Avenue, London" },
          transport: [
            { mode: "tube", detail: "Central to Tottenham Court Road + walk", minutes: 15 },
            { mode: "walk", minutes: 25, steps: 2800 },
          ],
        },
        {
          time: "14:00",
          title: "Italian Bear Chocolate — the viral hot chocolate",
          notes: "Thick sipping chocolate; expect a queue on weekends.",
          location: { name: "Italian Bear Chocolate", query: "Italian Bear Chocolate, Soho, London" },
          transport: [
            { mode: "walk", minutes: 7 },
          ],
        },
      ],
    },

    "2026-10-13": {
      label: "The final farewell food tour",
      items: [
        {
          time: "11:00",
          title: "Bakery catch-up — revisit anything we missed",
          notes: "Slot in whatever got skipped — Fortitude seconds, another Humble Crumble…",
        },
        {
          time: "17:30",
          title: "Golden-hour Thames path walk",
          location: { name: "Queen's Walk, South Bank", query: "Queen's Walk, South Bank, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Waterloo", minutes: 16 },
          ],
        },
        {
          time: "19:30",
          title: "Too Good To Go — £3 pastry bags for the flight",
          notes: "Check the app around closing time for high-end bakery surprise bags.",
        },
      ],
    },

    "2026-10-14": {
      label: "Departure day — SQ317 to Singapore ✈️",
      items: [
        {
          time: "07:00",
          title: "Check out — Canning Town base",
          notes: "Early start — pack the night before. Breakfast at the airport once bags are dropped.",
          location: { name: "Canning Town", query: "Canning Town Station, London" },
        },
        {
          time: "08:20",
          title: "Heathrow Terminal 2 — bag drop",
          notes: "Aim for T2 about 3 hours before departure.",
          location: { name: "Heathrow Terminal 2", query: "Heathrow Terminal 2, London" },
          transport: [
            { mode: "train", detail: "DLR one stop to Custom House, then Elizabeth line (direct or change at Paddington)", minutes: 75 },
            { mode: "taxi", detail: "Pre-booked cab — easier with luggage in the morning peak", minutes: 70 },
          ],
        },
        {
          time: "11:20",
          title: "SQ317 — London → Singapore",
          notes: "Overnight leg: 13 h 10 m, lands Changi at 7:30 AM tomorrow (Singapore is 7 hours ahead).",
        },
      ],
    },

    "2026-10-15": {
      label: "Homeward — Changi transit, then Manila",
      items: [
        {
          time: "07:30",
          title: "Land at Changi — transit",
          notes: "4 h 25 m between flights — time for a proper breakfast airside. Times today are each airport's local clock.",
          transport: [
            { mode: "plane", detail: "SQ317, 13 h 10 m overnight" },
          ],
        },
        {
          time: "11:55",
          title: "SQ912 — Singapore → Manila",
          notes: "3 h 45 m home stretch; no time-zone change.",
        },
        {
          time: "15:40",
          title: "Land in Manila — NAIA Terminal 3",
          notes: "Welcome home! 🎉",
          location: { name: "NAIA Terminal 3", query: "Ninoy Aquino International Airport Terminal 3, Manila" },
          transport: [
            { mode: "plane", detail: "SQ912, 3 h 45 m" },
          ],
        },
      ],
    },

  },
};
