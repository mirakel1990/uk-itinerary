/* =====================================================================
   LONDON TRIP — ITINERARY DATA
   =====================================================================
   This is the only file you need to edit day-to-day.

   Every day of the trip (start → end) is shown automatically.
   To plan a day, add an entry under `days` keyed by its ISO date
   ("YYYY-MM-DD"). Days without an entry simply show "nothing planned".

   DAY SHAPE
   ---------
   "2026-09-23": {
     label: "Arrival day",            // optional short headline for the day
     items: [ ...stops in time order... ]
   }

   STOP (ITEM) SHAPE
   -----------------
   {
     time:  "14:00",                  // 24h clock; optional (untimed stops sort last)
     title: "Westminster Abbey",      // what you're doing
     notes: "Book tickets ahead.",    // optional free text
     location: {                      // where it is (used for all Google Maps links)
       name:  "Westminster Abbey",            // shown on the page
       query: "Westminster Abbey, London",    // what's searched in Google Maps
       // lat: 51.4994, lng: -0.1273          // optional; overrides query if set
     },
     transport: [                     // how to get here FROM THE PREVIOUS STOP.
       // One entry per option — list several to compare.
       // mode: walk | tube | bus | train | taxi | car | boat | plane | bike
       { mode: "walk", minutes: 9, steps: 1000 },        // steps optional — estimated from minutes if omitted
       { mode: "tube", detail: "Jubilee line", minutes: 12 },
     ],
   }

   MAPS
   ----
   • Each stop gets an "Open in Google Maps" link (from location).
   • Each stop after the first gets a "Directions from previous stop" link
     (travel mode picked from its transport options).
   • Each day with 2+ located stops gets a "Plot day in Google Maps"
     button that opens the whole day as one multi-stop route.

   The first two days below are EXAMPLES so you can see the format —
   replace them with the real plan.
   ===================================================================== */

window.TRIP_DATA = {
  title: "London Trip 2026",
  start: "2026-09-23",
  end:   "2026-10-15",

  days: {

    "2026-09-23": {
      label: "Example — Arrival day (replace me)",
      items: [
        {
          time: "09:35",
          title: "Land at Heathrow, Terminal 5",
          notes: "Collect bags, grab coffee, top up Oyster / set up contactless.",
          location: { name: "Heathrow Terminal 5", query: "Heathrow Terminal 5, London" },
        },
        {
          time: "11:30",
          title: "Check in & drop bags at the hotel",
          notes: "Two ways in from Heathrow — pick based on energy and luggage.",
          location: { name: "Park Plaza Westminster Bridge (example hotel)", query: "Park Plaza Westminster Bridge, London" },
          transport: [
            { mode: "train", detail: "Elizabeth line, then Jubilee from Bond St", minutes: 45 },
            { mode: "tube",  detail: "Piccadilly line — cheaper, slower", minutes: 60 },
            { mode: "taxi",  detail: "Black cab / Uber", minutes: 50 },
          ],
        },
        {
          time: "14:00",
          title: "Big Ben & Westminster Abbey",
          location: { name: "Westminster Abbey", query: "Westminster Abbey, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
        },
        {
          time: "17:30",
          title: "London Eye at golden hour",
          notes: "Steps get estimated automatically when only minutes are given.",
          location: { name: "London Eye", query: "London Eye, London" },
          transport: [
            { mode: "walk", minutes: 11 },
          ],
        },
      ],
    },

    "2026-09-24": {
      label: "Example — Tower & Borough (replace me)",
      items: [
        {
          time: "10:00",
          title: "Tower of London",
          location: { name: "Tower of London", query: "Tower of London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Circle/District via Westminster", minutes: 25 },
            { mode: "boat", detail: "Uber Boat from Westminster Pier", minutes: 35 },
          ],
        },
        {
          time: "13:30",
          title: "Lunch at Borough Market",
          location: { name: "Borough Market", query: "Borough Market, London" },
          transport: [
            { mode: "walk", minutes: 18, steps: 2100 },
            { mode: "bus",  detail: "Route 343 from Tower Gateway", minutes: 12 },
          ],
        },
      ],
    },

  },
};
