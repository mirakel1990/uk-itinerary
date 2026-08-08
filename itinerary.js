/* =====================================================================
   LONDON 2026 — ITINERARY DATA
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
     photos: [                        // optional reference pics, shown as a thumbnail row
       // src: image URL or local file (drop it in img/ and use "img/name.jpg")
       // href: where clicking leads (defaults to src); caption: optional
       { src: "img/example.jpg", caption: "The shot we're after" },
     ],
     optional: [                      // max 3 — only the genuinely worth-it extras
       { title: "Churchill War Rooms", where: "Clive Steps", notes: "Book ahead." },
     ],
     food: [                          // max 3 — mains or desserts worth the detour
       { title: "Sticky toffee pudding", where: "The Ivy", notes: "The classic." },
     ],
   }

   Keep `optional` and `food` to three entries each — they're a shortlist,
   not a directory. Both render as collapsed sections on the stop card.

   STAYS (ACCOMMODATION)
   ---------------------
   `stays` lists where we sleep. Each entry covers the nights from
   firstNight through lastNight (inclusive) and renders as its own
   section on those days:
   {
     firstNight: "2026-09-23",
     lastNight:  "2026-10-02",
     name:    "Hotel name",
     address: "1 Street, Postcode",   // optional
     phone:   "01234 567890",         // optional
     notes:   "Free text.",           // optional
     location: { name, query },       // optional; adds a Google Maps link
   }

   Times are planning estimates — nudge them as bookings firm up.
   Base for London days: Travelodge London Docklands Central,
   1 Oregano Drive, E14 2AE (East India DLR on the doorstep,
   one stop from Canning Town's Jubilee line).
   ===================================================================== */

window.TRIP_DATA = {
  title: "London 2026",
  start: "2026-09-23",
  end:   "2026-10-15",

  // Remote-work stretches. Each block covers firstDay→lastDay inclusive and
  // renders as its own section at the top of those days.
  workBlocks: [
    {
      firstDay: "2026-09-28",
      lastDay:  "2026-10-02",
      label: "Remote work — US Eastern hours",
      localHours: "1:00 PM – 10:00 PM London",
      homeHours: "8:00 AM – 5:00 PM US Eastern · London is 5 hours ahead while both are on summer time",
      backBy: "12:45",
      notes: "Mornings are yours, afternoons and evenings are not. Everything planned on these days is timed to finish by lunch and get you back before the first call.",
    },
  ],

  stays: [
    {
      firstNight: "2026-09-23",
      lastNight:  "2026-10-13",
      name: "Travelodge London Docklands Central",
      address: "1 Oregano Drive, London E14 2AE",
      phone: "08719 846593",
      notes: "Right by East India DLR, one stop from Canning Town's Jubilee line. Now one continuous 21-night stay — check the booking actually covers 3–5 October, which used to be the Edinburgh nights.",
      location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
    },
    {
      firstNight: "2026-10-14",
      lastNight:  "2026-10-14",
      name: "Overnight on SQ317 ✈️",
      notes: "No hotel tonight — sleeping on the plane. Lands Changi 7:30 AM tomorrow.",
    },
    {
      firstNight: "2026-10-15",
      lastNight:  "2026-10-15",
      name: "Home — Manila 🏠",
      notes: "Back in your own bed.",
    },
  ],

  days: {

    /* ---------------- LONDON, WEEK 1 ---------------- */

    "2026-09-23": {
      label: "Travel day — Manila → Singapore → London",
      items: [
        {
          time: "07:20",
          title: "SQ915 — Manila → Singapore",
          notes: "Departs NAIA Terminal 3 at 7:20 AM, lands Changi at 11:00 AM (no time-zone change). Aim to be at T3 by about 4:30 AM for bag drop. Times here are each airport's local clock.",
          transport: [
            { mode: "plane", detail: "SQ915, 3 h 40 m nonstop" },
          ],
        },
        {
          time: "12:35",
          title: "SQ318 — Singapore → London",
          notes: "About 1 h 35 m to connect at Changi. Lands Heathrow at 7:30 PM UK time — 7 hours behind Manila/Singapore.",
          transport: [
            { mode: "plane", detail: "SQ318, 13 h 55 m nonstop" },
          ],
        },
        {
          time: "19:30",
          title: "Land at Heathrow Terminal 2",
          notes: "Border queue and bags will take a while at this hour — the Elizabeth line runs from directly below the terminal. Kalvin (Sigried's brother) will fetch us at arrivals.",
          location: { name: "Heathrow Terminal 2", query: "Heathrow Terminal 2, London" },
        },
        {
          time: "21:45",
          title: "Check in — Travelodge London Docklands Central",
          notes: "1 Oregano Drive, London E14 2AE · tel 08719 846593. Right by East India DLR, one stop from Canning Town's Jubilee line. Drop bags and get contactless/Oyster sorted.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
          transport: [
            { mode: "train", detail: "Elizabeth line to Custom House (direct or change at Paddington), then DLR three stops to East India", minutes: 75 },
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
          notes: "The classic phone-box-with-Big-Ben shot. The box is on Great George Street near the corner of Parliament Street (SW1P 3AD).",
          location: { name: "Great George Street, corner of Parliament Street", query: "Great George Street & Parliament Street, Westminster, London SW1P 3AD" },
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/London_Big_Ben_Phone_box.jpg/960px-London_Big_Ben_Phone_box.jpg",
              href: "https://commons.wikimedia.org/wiki/File:London_Big_Ben_Phone_box.jpg",
              caption: "The classic angle — box front-left, tower behind",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Red_telephone_booth%2C_Big_Ben%2C_Parliament%2C_Westminster%2C_London%2C_UK%2C_KW_%2815105737453%29.jpg/960px-Red_telephone_booth%2C_Big_Ben%2C_Parliament%2C_Westminster%2C_London%2C_UK%2C_KW_%2815105737453%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Red_telephone_booth,_Big_Ben,_Parliament,_Westminster,_London,_UK,_KW_(15105737453).jpg",
              caption: "Alternative angle from the square",
            },
          ],
          optional: [
            { title: "Churchill War Rooms", where: "Clive Steps, King Charles St — 5 min walk", notes: "The underground WWII bunker, left exactly as it was in 1945. Book a timed slot online; allow 90 min if you go." },
            { title: "Westminster Bridge & the South Bank view", where: "Cross the bridge, 3 min", notes: "The full-tower shot needs distance — the far end of the bridge is where you get Big Ben and Parliament in one frame." },
            { title: "St James's Park pelicans", where: "10 min north", notes: "Feeding is around 2:30 PM daily; the Blue Bridge has the best London skyline view in the park." },
          ],
          food: [
            { title: "Full English breakfast", where: "Regency Café, Regency St — 10 min", notes: "1940s tiled caff, cash-friendly, properly cheap. Order at the counter and wait for them to bellow your name. Go before 11 AM." },
            { title: "Scotch egg", where: "Any Westminster pub", notes: "Runny-yolk version if they do one — the pub snack that actually deserves its reputation." },
          ],
          transport: [
            { mode: "tube", detail: "Jubilee line from Canning Town", minutes: 18 },
          ],
        },
        {
          time: "10:15",
          title: "Westminster Abbey",
          notes: "Three minutes across Parliament Square from the phone box. Book timed tickets online ahead if you want to go inside; the exterior and Dean's Yard are free. Best couple shots: centered on the path facing the west front, and under the cloister arches if you go in.",
          location: { name: "Westminster Abbey", query: "Westminster Abbey, London" },
          booking: {
            level: "recommended",
            notes: "Only if you're going inside — timed tickets online are cheaper than the door and skip the queue. The exterior, the steps and Dean's Yard need nothing.",
            via: "Klook usually carries Westminster Abbey. Compare against westminster-abbey.org before buying — the Abbey's own advance price is often the same or lower, and its ticket includes the audio guide.",
          },
          transport: [
            { mode: "walk", minutes: 3, steps: 350 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Westminster_Abbey_front%2C_2017.jpg/960px-Westminster_Abbey_front%2C_2017.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Westminster_Abbey_front,_2017.jpg",
              caption: "West front — the big two-of-you shot, centered on the path",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/View_of_the_courtyard_of_Westminster_Abbey_through_the_arches_of_the_cloister_-_geograph.org.uk_-_6879781.jpg/960px-View_of_the_courtyard_of_Westminster_Abbey_through_the_arches_of_the_cloister_-_geograph.org.uk_-_6879781.jpg",
              href: "https://commons.wikimedia.org/wiki/File:View_of_the_courtyard_of_Westminster_Abbey_through_the_arches_of_the_cloister_-_geograph.org.uk_-_6879781.jpg",
              caption: "Cloister arches — soft light, the best couple backdrop inside",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/The_Great_Cloisters_of_Westminster_Abbey.JPG/960px-The_Great_Cloisters_of_Westminster_Abbey.JPG",
              href: "https://commons.wikimedia.org/wiki/File:The_Great_Cloisters_of_Westminster_Abbey.JPG",
              caption: "Cloister walkway — frame each other in the arcade",
            },
          ],
          optional: [
            { title: "Go inside — Poets' Corner & the Coronation Chair", where: "Timed ticket, ~£30", notes: "Worth it once: Newton, Darwin and Dickens are underfoot, and the fan vaulting in the Lady Chapel is the best in England. Allow 90 min." },
            { title: "Evensong instead", where: "Weekdays 5:00 PM, free", notes: "The choir in that building, no ticket, no crowds — but it's a service, not a tour, and you can't wander." },
            { title: "Dean's Yard", where: "Through the arch, free", notes: "Quiet green lawn with the Abbey behind — the calm couple shot without the Parliament Square crowds." },
          ],
          food: [
            { title: "Cream tea — scones, jam, clotted cream", where: "Cellarium Café, inside the Abbey precinct", notes: "In the monks' 14th-century vaulted storeroom, and you don't need an Abbey ticket to eat there. The most atmospheric tea near Westminster." },
            { title: "Victoria sponge", where: "Cellarium or any café nearby", notes: "Named for the queen buried up the road — jam, cream, and a dusting of sugar. Simple and correct." },
          ],
        },
        {
          time: "10:45",
          title: "Whitehall walk — Horse Guards & Downing Street",
          notes: "Outside only, on the way north: the Cenotaph, the Downing Street gates, then the mounted sentries at Horse Guards — time it for 11:00 and you catch the changing of the King's Life Guard. Couple ops: beside the mounted guard in his box, and the Big Ben vista looking back down the street.",
          location: { name: "Horse Guards, Whitehall", query: "Horse Guards, Whitehall, London" },
          transport: [
            { mode: "walk", minutes: 6, steps: 700 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Royal_Horse_Artillery_sentry%2C_Horse_Guards%2C_Whitehall_-_DSC08087.jpg/960px-Royal_Horse_Artillery_sentry%2C_Horse_Guards%2C_Whitehall_-_DSC08087.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Royal_Horse_Artillery_sentry,_Horse_Guards,_Whitehall_-_DSC08087.jpg",
              caption: "The mounted sentry — the classic stand-beside photo op",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Whitehall_looking_towards_Big_Ben_-_geograph.org.uk_-_2082308.jpg/960px-Whitehall_looking_towards_Big_Ben_-_geograph.org.uk_-_2082308.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Whitehall_looking_towards_Big_Ben_-_geograph.org.uk_-_2082308.jpg",
              caption: "Look back south for the Big Ben vista down Whitehall",
            },
          ],
          optional: [
            { title: "Changing of the King's Life Guard", where: "Horse Guards Parade, 11:00 AM weekdays", notes: "Free, far less crowded than the Buckingham Palace version, and you stand much closer. Arrive by 10:50." },
            { title: "Banqueting House ceiling", where: "Whitehall, ~£10", notes: "One room, but it's the Rubens ceiling Charles I walked under on his way to the scaffold outside. Twenty minutes, worth it if you like art." },
            { title: "Trafalgar Square & the National Gallery", where: "North end of Whitehall", notes: "You'll pass through anyway on the way to Leicester Square; the gallery is free if you want an hour with Van Gogh's Sunflowers." },
          ],
          food: [
            { title: "Pie and mash with liquor", where: "Traditional pie shops off Whitehall", notes: "The green parsley 'liquor' sauce is the whole point — proper old London food, and it's nearly extinct. Try it once." },
            { title: "Sticky toffee pudding", where: "Any decent pub on Whitehall", notes: "Date sponge drowned in toffee sauce with custard. The single best British dessert, no argument." },
          ],
        },
        {
          time: "11:30",
          title: "Leicester Square — Bunsik corn dogs",
          notes: "The viral Bunsik korean corn dogs are on Charing Cross Road, right by the square.",
          location: { name: "Leicester Square", query: "Leicester Square, London" },
          transport: [
            { mode: "walk", detail: "via Trafalgar Square", minutes: 12 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Leicester_Square_%28August_2023%29_07.jpg/960px-Leicester_Square_%28August_2023%29_07.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Leicester_Square_(August_2023)_07.jpg",
              caption: "The square — cinema frontages and the garden",
            },
          ],
          optional: [
            { title: "Scoop up same-day West End tickets", where: "TKTS booth, south side of the square", notes: "The official discount booth — up to half price on that evening's shows. Worth a look even if you don't buy." },
            { title: "M&M's World / Lego Store", where: "Two minutes off the square", notes: "Only if you want the spectacle — four floors of noise and colour. Skip unless it amuses you." },
            { title: "Chinatown gate photo", where: "Wardour Street entrance", notes: "You're heading there next anyway — the ornamental gate is the proper entrance shot." },
          ],
          food: [
            { title: "Bunsik Korean corn dogs", where: "Charing Cross Road, by the square", notes: "The viral one you came for — the half-potato, half-mozzarella version is the pick. Expect a queue." },
            { title: "Salted caramel cookie", where: "Ben's Cookies, Covent Garden side", notes: "Served warm and deliberately underbaked. Small, rich, dangerously easy to repeat." },
            { title: "Beigel from Brick Lane's West End cousin", where: "Various late-night spots off the square", notes: "Salt beef with hot mustard — the classic London late-night sandwich if you're back here after a show." },
          ],
        },
        {
          time: "13:00",
          title: "Chinatown lanterns",
          notes: "Gerrard Street under a canopy of red lanterns. Shoot looking straight down the street so the lanterns recede into the frame.",
          location: { name: "Chinatown", query: "Chinatown, Gerrard Street, London" },
          transport: [
            { mode: "walk", minutes: 3 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg/960px-Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg",
              caption: "Lantern canopy over Gerrard Street — shoot down the middle",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Chinatown%2C_London_%284042462755%29.jpg/960px-Chinatown%2C_London_%284042462755%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Chinatown,_London_(4042462755).jpg",
              caption: "Street level — shopfronts and lanterns together",
            },
          ],
          optional: [
            { title: "The ornamental gates", where: "Wardour Street & Gerrard Street ends", notes: "Proper paifang arches at both ends — the cleanest framing device for a couple shot in the whole area." },
            { title: "Chinese bakery crawl", where: "Along Gerrard Street", notes: "Duck into two or three and compare — cheap, fast, and more fun than committing to one sit-down lunch." },
          ],
          food: [
            { title: "Roast duck rice", where: "Four Seasons, Gerrard St", notes: "The dish Chinatown is known for — crisp-skinned Cantonese roast duck. Go at 1 PM before the queue builds." },
            { title: "Egg tarts", where: "Wong Kei / any bakery window", notes: "Portuguese-style with the caramelised top, best straight from the tray while still warm." },
            { title: "Bubble waffle with ice cream", where: "Bake Street stalls", notes: "The eggette cone — pure dessert theatre and it photographs well against the lanterns." },
          ],
        },
        {
          time: "15:00",
          title: "Neal's Yard, Covent Garden",
          notes: "Tiny, colourful courtyard — best light mid-afternoon. Stand against the painted facades; the yard is small enough that a wide shot gets all the colours at once.",
          location: { name: "Neal's Yard", query: "Neal's Yard, Covent Garden, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Neal%27s_Yard%2C_Covent_Garden_-_geograph.org.uk_-_7395246.jpg/960px-Neal%27s_Yard%2C_Covent_Garden_-_geograph.org.uk_-_7395246.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Neal%27s_Yard,_Covent_Garden_-_geograph.org.uk_-_7395246.jpg",
              caption: "The courtyard — painted facades, the couple shot",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Covent_Garden_Neal%27s_Yard_in_December_2011.JPG/960px-Covent_Garden_Neal%27s_Yard_in_December_2011.JPG",
              href: "https://commons.wikimedia.org/wiki/File:Covent_Garden_Neal%27s_Yard_in_December_2011.JPG",
              caption: "Wider angle showing the full colour spread",
            },
          ],
          optional: [
            { title: "Seven Dials", where: "Two minutes west", notes: "The sundial pillar where seven streets meet — good independent shops radiating off it, and far quieter than Covent Garden market." },
            { title: "Covent Garden Piazza street performers", where: "5 min east", notes: "Licensed performers on rotation all afternoon in the covered market — genuinely good, and free." },
            { title: "Neal's Yard Remedies", where: "In the courtyard itself", notes: "The original 1981 apothecary in the blue bottles. Small, nice-smelling, easy ten minutes." },
          ],
          food: [
            { title: "Raclette-scraped toastie", where: "Kappacasein / Neal's Yard Dairy nearby", notes: "Molten Ogleshield cheese scraped onto sourdough — the best cheese sandwich in London, and it's not close." },
            { title: "Salted caramel & banana crêpe", where: "Covent Garden stalls, 5 min", notes: "Made to order on the piazza; the best mid-afternoon sugar hit while watching the performers." },
            { title: "Homeslice pizza by the slice", where: "Neal's Yard corner", notes: "Twenty-inch pizzas sold by the enormous slice — split one and you've still overeaten." },
          ],
        },
      ],
    },

    "2026-09-25": {
      label: "Free day — nothing booked (wedding eve)",
      countLabel: "2 ideas near the hotel — pick none, one, or both",
      note: "No fixed plans today. The wedding is tomorrow, so keep it easy — both ideas below are a short DLR hop from the hotel and can be cut short whenever you want. Greenwich was removed from this day so it doesn't duplicate the 29 September morning.",
      items: [
        {
          title: "Canary Wharf & the Crossrail Place Roof Garden",
          notes: "The closest proper outing — a free public garden of tree ferns and Mediterranean planting under a timber lattice roof, sitting on top of the Elizabeth line station. Ten quiet minutes or an afternoon of shops and waterfront, your call.",
          location: { name: "Crossrail Place Roof Garden", query: "Crossrail Place Roof Garden, Canary Wharf, London" },
          transport: [
            { mode: "train", detail: "DLR via Poplar", minutes: 12 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Crossrail_Park_Crossrail_Place_Roof_Garden_roof_Canary_Wharf_London_England.jpg/960px-Crossrail_Park_Crossrail_Place_Roof_Garden_roof_Canary_Wharf_London_England.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Crossrail_Park_Crossrail_Place_Roof_Garden_roof_Canary_Wharf_London_England.jpg",
              caption: "The timber lattice roof — shoot upward through it",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Crossrail_Park_Crossrail_Place_Roof_Garden_path_Canary_Wharf_London_England_01.jpg/960px-Crossrail_Park_Crossrail_Place_Roof_Garden_path_Canary_Wharf_London_England_01.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Crossrail_Park_Crossrail_Place_Roof_Garden_path_Canary_Wharf_London_England_01.jpg",
              caption: "The planted walkway — good soft-light couple shot",
            },
          ],
          optional: [
            { title: "Wander the dock-side terraces", where: "Around West India Quay", notes: "Water on both sides and towers overhead — the skyline shot people don't expect from London." },
            { title: "Browse the malls if it rains", where: "Cabot Place & Jubilee Place", notes: "Everything underground and interconnected, so you never surface in the weather." },
          ],
          food: [
            { title: "Something from the food halls", where: "Cabot Place / Jubilee Place / Crossrail Place", notes: "Three connected clusters of restaurants and counters — the densest, easiest choice anywhere near the hotel." },
            { title: "Waterfront lunch on the dock", where: "Terraces along West India Quay", notes: "A row of restaurants with tables right on the water. Worth it for the setting more than the cooking." },
          ],
        },
        {
          title: "Museum of London Docklands",
          notes: "Free, and a ten-minute hop away. A Georgian sugar warehouse telling the story of the docks the hotel is standing in — including a genuinely unflinching gallery on London's role in slavery. Easy 90 minutes.",
          location: { name: "Museum of London Docklands", query: "Museum of London Docklands, West India Quay, London" },
          transport: [
            { mode: "train", detail: "DLR to West India Quay", minutes: 10 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Museum_of_London_Docklands_-_West_India_Quay_-_Canary_Wharf_%286455258993%29.jpg/960px-Museum_of_London_Docklands_-_West_India_Quay_-_Canary_Wharf_%286455258993%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Museum_of_London_Docklands_-_West_India_Quay_-_Canary_Wharf_(6455258993).jpg",
              caption: "The Georgian warehouse — brick and towers in one frame",
            },
          ],
          optional: [
            { title: "Sailortown", where: "Inside, lower floor", notes: "A reconstructed dark alley of 19th-century dockside London you walk through. The one bit everyone remembers." },
            { title: "Trinity Buoy Wharf", where: "15 min walk from the hotel", notes: "London's only lighthouse, a container-stack arts village, and almost no tourists. The most offbeat thing within walking distance of your bed." },
          ],
          food: [
            { title: "Coffee and cake in the warehouse café", where: "Ground floor, free to enter", notes: "Beams, brick, and a dock view without paying for anything." },
          ],
        },
      ],
    },
    "2026-09-26": {
      label: "Wedding day 💒 — Marylebone",
      note: "Ceremony at noon in the Mayfair Room, reception from 1:30 PM at The Greenhouses — the two venues are both on Marylebone Road, about a mile apart.",
      items: [
        {
          time: "10:30",
          title: "Leave the hotel — dressed and ready",
          notes: "Allow a full hour for the trip even though it's about 50 minutes: Saturday engineering works on the Jubilee line are the thing most likely to bite. Check TfL status before you walk out.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
        },
        {
          time: "11:30",
          title: "Arrive — The Old Marylebone Town Hall",
          notes: "97–113 Marylebone Rd, NW1 5PT. Arrive a good half hour early: the portico steps are the famous shot, and there's usually a queue of wedding parties taking turns on them between ceremonies.",
          location: { name: "The Old Marylebone Town Hall", query: "The Old Marylebone Town Hall, 97-113 Marylebone Road, London NW1 5PT" },
          transport: [
            { mode: "train", detail: "DLR one stop to Canning Town, Jubilee line direct to Baker Street, then 10 min walk west", minutes: 50 },
            { mode: "taxi", detail: "Door to door — worth it in wedding clothes", minutes: 45 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Westminster_Council_House.jpg/960px-Westminster_Council_House.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Westminster_Council_House.jpg",
              caption: "The building — the portico steps are the classic wedding shot",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Stone_lion_in_front_of_Marylebone_Town_Hall_-_geograph.org.uk_-_7231357.jpg/960px-Stone_lion_in_front_of_Marylebone_Town_Hall_-_geograph.org.uk_-_7231357.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Stone_lion_in_front_of_Marylebone_Town_Hall_-_geograph.org.uk_-_7231357.jpg",
              caption: "The stone lion out front — good framing for group photos",
            },
          ],
        },
        {
          time: "12:00",
          title: "Ceremony — Mayfair Room",
          notes: "The Old Marylebone Town Hall, Mayfair Room. Phones off. Ceremonies here run to a tight schedule, so the room turns over promptly afterwards — group photos happen outside on the steps.",
          location: { name: "Mayfair Room, Old Marylebone Town Hall", query: "The Old Marylebone Town Hall, 97-113 Marylebone Road, London NW1 5PT" },
        },
        {
          time: "13:30",
          title: "Reception — The Greenhouses",
          notes: "1 Marylebone Rd, NW1 4AQ, through to 5:00 PM. It's at the far east end of Marylebone Road near the Euston Road junction — about a mile from the town hall, so roughly 20 minutes on foot or a few minutes by cab or bus along the same road.",
          location: { name: "The Greenhouses", query: "The Greenhouses, 1 Marylebone Road, London NW1 4AQ" },
          transport: [
            { mode: "walk", detail: "Straight east along Marylebone Road", minutes: 20, steps: 2200 },
            { mode: "bus", detail: "18, 27, 30 or 205 — all run the length of Marylebone Road", minutes: 8 },
            { mode: "taxi", detail: "Quickest in heels", minutes: 6 },
          ],
        },
        {
          time: "17:00",
          title: "Reception ends — evening free",
          notes: "You're two minutes from Regent's Park and ten from Marylebone High Street, so there's a gentle evening here if you want one rather than heading straight back east.",
          location: { name: "Marylebone", query: "Marylebone High Street, London" },
          optional: [
            { title: "Regent's Park at golden hour", where: "Across Marylebone Road", notes: "The rose garden in Queen Mary's Gardens is the prettiest corner, and September evenings still have light until around seven." },
            { title: "Daunt Books", where: "Marylebone High Street", notes: "Edwardian galleried bookshop with oak balconies and a stained-glass window — one of the most beautiful shops in London, and it's free to wander." },
            { title: "221B Baker Street", where: "10 min walk", notes: "The Sherlock Holmes Museum is a tourist trap, but the street sign and the frontage make a fun photo on the way past." },
          ],
          food: [
            { title: "Fish and chips at The Golden Hind", where: "Marylebone Lane", notes: "Frying since 1914, family-run, no frills. The best version of the dish anywhere near here." },
            { title: "Dinner on Marylebone High Street", where: "10 min north-west", notes: "A genuinely good restaurant strip that Londoners actually use — far better eating than anywhere along Marylebone Road itself." },
            { title: "Something sweet in the park", where: "Kiosks in Regent's Park", notes: "If you're still full from the reception, this is the right size of pudding." },
          ],
        },
      ],
    },
    "2026-09-27": {
      label: "Day trip — Bath 🛁",
      note: "Sunday day trip, the day after the wedding — so the whole thing starts late on purpose. Bath is the easiest of the three by rail: 1 h 25 direct from Paddington, the centre is walkable from the station, and it's compact enough to do properly on a 9:30 train. Book the train advance — walk-up fares on GWR are brutal.",
      items: [
        {
          time: "09:30",
          title: "Paddington → Bath Spa",
          notes: "Direct GWR service, about 1 h 25. A 9:30 departure is a deliberate lie-in after the wedding — Bath is small enough that arriving at 11 still leaves a full day.",
          location: { name: "London Paddington", query: "London Paddington Station" },
          booking: {
            level: "required",
            shortName: "Bath train (advance)",
            notes: "Advance singles are a fraction of the walk-up price on this route, and Saturday trains fill. Book both legs as soon as the date is fixed, and pick a return you can actually make.",
            via: "Direct with GWR (gwr.com) — not Klook. UK advance rail fares are cheapest at source and resellers add fees on an already yield-priced ticket.",
          },
          transport: [
            { mode: "tube", detail: "DLR to Canning Town, Jubilee to Bond Street, Elizabeth line to Paddington", minutes: 55 },
          ],
        },
        {
          time: "11:15",
          title: "Roman Baths",
          notes: "A complete Roman bathhouse fed by Britain's only hot spring, still steaming after two thousand years. The audio guide is included and genuinely good. Allow 90 minutes — this is the one thing you can't skip in Bath.",
          location: { name: "Roman Baths", query: "Roman Baths, Abbey Church Yard, Bath BA1 1LZ" },
          booking: {
            level: "required",
            shortName: "Roman Baths",
            notes: "Timed entry and it does sell out on autumn weekends. Take the earliest slot so the Great Bath is quiet — by midday it's shoulder to shoulder.",
            via: "Klook usually carries the Roman Baths. Compare against romanbaths.co.uk, whose own advance ticket is often cheaper than the door price and includes the audio guide.",
          },
          transport: [
            { mode: "walk", detail: "From Bath Spa station", minutes: 8, steps: 900 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Great_Bath_Roman_Baths_Bath_England_dllu.jpg/960px-Great_Bath_Roman_Baths_Bath_England_dllu.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Great_Bath_Roman_Baths_Bath_England_dllu.jpg",
              caption: "The Great Bath with the Abbey behind — shoot from the terrace",
            },
          ],
          optional: [
            { title: "Bath Abbey next door", where: "Same courtyard, donation", notes: "Fan vaulting to rival Westminster, and the angels climbing ladders on the west front are unique. Two minutes away and usually quiet." },
            { title: "Drink the spa water", where: "Pump Room, end of the tour", notes: "A glass of the warm mineral water is included with the ticket. It tastes genuinely awful, which is the fun of it." },
            { title: "Thermae Bath Spa rooftop pool", where: "5 min walk, ticketed", notes: "The modern spa where you can actually bathe in the same water, in an open rooftop pool over the city. Book ahead if you want it — it's the best two hours in Bath." },
          ],
          food: [
            { title: "A Bath bun", where: "Bakeries around the Abbey", notes: "Sweet, sugared, and local to the city. The Sally Lunn version is a different, larger bread bun — both are worth trying." },
            { title: "Sunday-style roast or a pub lunch", where: "Pubs off Abbey Green", notes: "The lanes south of the Abbey have the better pubs; the ones fronting the Baths are priced for the queue." },
          ],
        },
        {
          time: "13:15",
          title: "Pulteney Bridge & the weir",
          notes: "One of only a handful of bridges in the world with shops built across its full span. The horseshoe weir below it is the photo everyone comes for — shoot from the riverside path on the south bank.",
          location: { name: "Pulteney Bridge", query: "Pulteney Bridge, Bath BA2 4AT" },
          transport: [
            { mode: "walk", minutes: 6, steps: 650 },
          ],
          optional: [
            { title: "Go down to the riverside path", where: "Below the bridge, free", notes: "The bridge looks like an ordinary street from on top — you have to get down to the water to see what it actually is." },
            { title: "Parade Gardens", where: "Beside the weir, small fee", notes: "Riverside lawn with the best seated view of the bridge. Worth the couple of pounds if the weather holds." },
          ],
          food: [
            { title: "Sally Lunn's bun", where: "North Parade Passage", notes: "Served in one of the oldest houses in Bath since the 1680s. Enormous, semi-sweet, and served either savoury or with jam." },
          ],
        },
        {
          time: "14:45",
          title: "The Circus & Royal Crescent",
          notes: "Georgian Bath at full volume — a perfect circle of townhouses, then a sweeping crescent of thirty houses facing open parkland. All free, all outdoors, and the lawn in front of the Crescent is where the photo happens.",
          location: { name: "Royal Crescent", query: "Royal Crescent, Bath BA1 2LR" },
          transport: [
            { mode: "walk", detail: "Uphill via Milsom Street and Brock Street", minutes: 15, steps: 1700 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Royal_Crescent%2C_Bath_2014_10.jpg/960px-Royal_Crescent%2C_Bath_2014_10.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Royal_Crescent,_Bath_2014_10.jpg",
              caption: "The Royal Crescent sweep — stand well back on the lawn",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Royal_Crescent%2C_Bath_Somerset_-_geograph.org.uk_-_1991868.jpg/960px-Royal_Crescent%2C_Bath_Somerset_-_geograph.org.uk_-_1991868.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Royal_Crescent,_Bath_Somerset_-_geograph.org.uk_-_1991868.jpg",
              caption: "Closer on the Georgian stonework",
            },
          ],
          optional: [
            { title: "Stand in the middle of The Circus", where: "On the way up", notes: "Three curved terraces forming a full circle around a stand of plane trees. Look up at the carved frieze — no two motifs repeat." },
            { title: "The Gravel Walk", where: "Behind the Crescent", notes: "The wooded path Austen's characters use in Persuasion, running from the Crescent down towards the town. Free and almost empty." },
            { title: "No. 1 Royal Crescent", where: "End of the terrace, ticketed", notes: "One house restored to how it looked in the 1770s. Small, and the only way to see inside the Crescent." },
          ],
          food: [
            { title: "Afternoon tea at the Pump Room", where: "Back down by the Abbey", notes: "Georgian room, live pianist, and the classic Bath experience. Not cheap; book if you want it." },
            { title: "Cheese and cider", where: "Bath farmers' market / delis", notes: "You're in the West Country — the local cheddar and a proper cider are the regional thing to take home." },
          ],
        },
        {
          time: "17:45",
          title: "Bath Spa → Paddington",
          notes: "Aim for a late-afternoon or early-evening return so you're not rushing the Crescent. Journey is the same 1 h 25 back, then about 55 minutes across London to the hotel.",
          location: { name: "Bath Spa station", query: "Bath Spa Railway Station" },
          transport: [
            { mode: "walk", minutes: 12, steps: 1300 },
          ],
        },
      ],
    },

    "2026-09-28": {
      label: "Cluster 2 — City heights & Harry Potter history",
      note: "Re-ordered for the work day: the free outdoor stops come first so you're moving before anything opens. Borough Market moved off this day — it needs an afternoon.",
      items: [
        {
          time: "08:15",
          title: "St Dunstan in the East — ruined church garden",
          notes: "Bombed-out church shell with a garden grown through it. Open from early, free, and almost empty at this hour — the best possible use of a pre-work morning.",
          location: { name: "St Dunstan in the East", query: "St Dunstan in the East Church Garden, London" },
          transport: [
            { mode: "train", detail: "DLR to Tower Gateway, then 5 min walk", minutes: 25 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/St._Dunstan_in_the_East_Church_Garden_-_geograph.org.uk_-_5213257.jpg/960px-St._Dunstan_in_the_East_Church_Garden_-_geograph.org.uk_-_5213257.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St._Dunstan_in_the_East_Church_Garden_-_geograph.org.uk_-_5213257.jpg",
              caption: "Greenery through the gothic windows — the couple shot",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/St_Dunstan-in-the-East_Church_Garden%2C_London_%281%29_-_geograph.org.uk_-_5183989.jpg/960px-St_Dunstan-in-the-East_Church_Garden%2C_London_%281%29_-_geograph.org.uk_-_5183989.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St_Dunstan-in-the-East_Church_Garden,_London_(1)_-_geograph.org.uk_-_5183989.jpg",
              caption: "The tower and nave from inside the ruin",
            },
          ],
          optional: [
            { title: "Walk down to the river", where: "3 min south", notes: "You're a block from the Thames path with Tower Bridge to your left — a free two-minute detour for the postcard shot." },
            { title: "All Hallows by the Tower", where: "5 min east", notes: "London's oldest church, with a Roman pavement in the crypt. Free, almost always empty, and open early." },
          ],
          food: [
            { title: "Coffee before the garden", where: "Any City café on Great Tower Street", notes: "Nothing is open inside the garden itself, and at 8:15 AM the City cafés are running for commuters — grab something to carry in." },
          ],
        },
        {
          time: "09:00",
          title: "Leadenhall Market — the film Diagon Alley",
          notes: "Filming location for Diagon Alley / the Leaky Cauldron in Philosopher's Stone. It's a public covered street, so the architecture is there whatever time you arrive — before 10 you get it without the lunch crowd.",
          location: { name: "Leadenhall Market", query: "Leadenhall Market, London" },
          transport: [
            { mode: "walk", minutes: 6, steps: 650 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Leadenhall_Market%2C_City_of_London_%28Interior_-_01%29.jpg/960px-Leadenhall_Market%2C_City_of_London_%28Interior_-_01%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Leadenhall_Market,_City_of_London_(Interior_-_01).jpg",
              caption: "Down the painted arcade — stand centre for the symmetry",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leadenhall_Market_ceiling_octagonal_skylight_London_dllu.jpg/960px-Leadenhall_Market_ceiling_octagonal_skylight_London_dllu.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Leadenhall_Market_ceiling_octagonal_skylight_London_dllu.jpg",
              caption: "The octagonal skylight — shoot straight up",
            },
          ],
          optional: [
            { title: "Find the Leaky Cauldron door", where: "Bull's Head Passage", notes: "The blue-painted shopfront used as the entrance in Philosopher's Stone is down the side alley, not on the main arcade. Most people miss it." },
            { title: "The Lloyd's building opposite", where: "Directly across Lime Street", notes: "Richard Rogers' inside-out tower with all the pipes and lifts on the outside — a jarring, brilliant contrast with the Victorian market." },
          ],
          food: [
            { title: "Breakfast in the arcade", where: "Cafés under the painted roof", notes: "A handful open from around 7 AM for City workers, so this is the one genuinely good sit-down breakfast of the morning." },
          ],
        },
        {
          time: "10:00",
          title: "Horizon 22 — highest free view in London",
          notes: "The highest free viewing gallery in Europe, on the 58th floor of 22 Bishopsgate — higher than the Shard's paid platform and it costs nothing. Take the earliest slot going, since it opens at 10 and that's already half your morning gone.",
          location: { name: "Horizon 22", query: "Horizon 22, 22 Bishopsgate, London" },
          booking: {
            level: "required",
            shortName: "Horizon 22",
            notes: "Free but strictly timed-entry, and the only thing on this day that needs booking. Slots are released in batches a few weeks ahead and go quickly — book the moment your dates are firm, and take a 10:00 or 10:30 slot so you're not squeezed against the work start. Bring photo ID; it's an office building and security check it.",
            via: "Official site only — horizon22.co.uk. It's free, so there's nothing for Klook to sell; anyone charging for a Horizon 22 slot is reselling something that costs nothing.",
          },
          transport: [
            { mode: "walk", minutes: 5, steps: 550 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/City_of_London_%2C_view_from_120_Fenchurch_Street_roof_garden_-_geograph.org.uk_-_7608359.jpg/960px-City_of_London_%2C_view_from_120_Fenchurch_Street_roof_garden_-_geograph.org.uk_-_7608359.jpg",
              href: "https://commons.wikimedia.org/wiki/File:City_of_London_,_view_from_120_Fenchurch_Street_roof_garden_-_geograph.org.uk_-_7608359.jpg",
              caption: "The City cluster you'll be looking down on from 58 floors up",
            },
          ],
          optional: [
            { title: "Sky Garden as a backup", where: "20 Fenchurch St, 5 min", notes: "Also free and also pre-booked. Worth holding a slot here too in case Horizon 22 sells out before you book — the view is lower but the glass atrium is prettier." },
            { title: "Look down on the Gherkin", where: "North side of the gallery", notes: "You're high enough that 30 St Mary Axe reads as a small object below you, which is the shot nobody expects." },
          ],
          food: [
            { title: "Coffee at the top", where: "Counter on the viewing floor", notes: "There's a small bar up there. Overpriced, but a flat white at 58 floors with the whole City underneath is a fair trade." },
          ],
        },
        {
          time: "11:00",
          title: "The Garden at 120 — free rooftop",
          notes: "Free rooftop garden with a Gherkin-and-Walkie-Talkie view, and the useful one: no booking, no ticket, no queue. Just take the lift to 15 and walk out. Quick in and out before you head home.",
          location: { name: "The Garden at 120", query: "The Garden at 120, Fenchurch Street, London" },
          booking: {
            level: "recommended",
            notes: "No booking needed — walk-up only, which is exactly why it's the safety net if a Horizon 22 slot never materialises.",
          },
          transport: [
            { mode: "walk", minutes: 4, steps: 450 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/The_Garden_120_Fenchurch_Street_%282%29.jpg/960px-The_Garden_120_Fenchurch_Street_%282%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:The_Garden_120_Fenchurch_Street_(2).jpg",
              caption: "The roof garden — planting with the towers behind",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/The_Garden_120_Fenchurch_Street_%281%29.jpg/960px-The_Garden_120_Fenchurch_Street_%281%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:The_Garden_120_Fenchurch_Street_(1).jpg",
              caption: "Open-air terrace — no glass in the way, unlike Sky Garden",
            },
          ],
          optional: [
            { title: "The water-jet fountain", where: "Centre of the garden", notes: "Jets fire straight up between the planters with the Gherkin behind — the best framing on the roof." },
          ],
          food: [
            { title: "Grab lunch before the DLR", where: "Fenchurch Street / Leadenhall", notes: "Eat here rather than at the hotel — you'll be logging on at 1 PM and the City has far better lunch options than Docklands." },
          ],
        },
        {
          time: "11:45",
          title: "Head back — work starts at 1:00 PM",
          notes: "Leave the City by about 11:45 to be at the hotel with fifteen minutes to spare.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
          transport: [
            { mode: "train", detail: "DLR from Bank or Tower Gateway to East India", minutes: 30 },
          ],
        },
      ],
    },

    "2026-09-29": {
      label: "Cluster 3 — Greenwich morning",
      note: "The easiest work-day morning of the week: Greenwich is 20 minutes away, so you get the most time on the ground and the shortest run home. Brick Lane and Beigel Bake moved off — they're the wrong side of town for a lunchtime deadline.",
      items: [
        {
          time: "08:45",
          title: "Royal Observatory hike — the skyline photo",
          notes: "Park first: it opens at dawn, the climb is free, and the view over Canary Wharf is the shot. Doing this before the Painted Hall opens is what makes the morning work. Worth knowing the hill and the viewpoint cost nothing — only going inside the Observatory (Flamsteed House, the meridian courtyard, the camera obscura) is ticketed.",
          location: { name: "Royal Observatory", query: "Royal Observatory Greenwich, London" },
          booking: {
            level: "recommended",
            notes: "Only needed if you want to stand on the meridian line inside the courtyard — the viewpoint, the park and the photo are all free. It opens at 10:00, which is the same moment the Painted Hall does, so realistically you pick one. My suggestion: skip the inside here, take the free view, and spend the ticket on the Painted Hall.",
            via: "Klook first — Royal Observatory is a mainstream London attraction and usually listed. Royal Museums Greenwich direct is the fallback.",
          },
          transport: [
            { mode: "train", detail: "DLR to Cutty Sark, change at Poplar, then uphill through Greenwich Park", minutes: 25 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Greenwich_Park_-_Royal_Observatory_-_View_NNW_towards_Queen%27s_House%2C_Old_Royal_Naval_College_%26_Canary_Wharf_Docklands_I.jpg/960px-Greenwich_Park_-_Royal_Observatory_-_View_NNW_towards_Queen%27s_House%2C_Old_Royal_Naval_College_%26_Canary_Wharf_Docklands_I.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Greenwich_Park_-_Royal_Observatory_-_View_NNW_towards_Queen%27s_House,_Old_Royal_Naval_College_%26_Canary_Wharf_Docklands_I.jpg",
              caption: "The view down over the Naval College to Canary Wharf — the shot",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/View_of_Canary_Wharf_from_the_hill_by_the_Royal_Observatory_-_geograph.org.uk_-_2479435.jpg/960px-View_of_Canary_Wharf_from_the_hill_by_the_Royal_Observatory_-_geograph.org.uk_-_2479435.jpg",
              href: "https://commons.wikimedia.org/wiki/File:View_of_Canary_Wharf_from_the_hill_by_the_Royal_Observatory_-_geograph.org.uk_-_2479435.jpg",
              caption: "From the hilltop railing — stand here for the couple shot",
            },
          ],
          optional: [
            { title: "The General Wolfe statue viewpoint", where: "Top of the hill, free", notes: "This is the actual spot the postcard is taken from, right by the Observatory gates. No ticket, no queue, and at 9 AM you'll have the railing to yourselves." },
            { title: "Stand on the meridian outside the wall", where: "Just below the courtyard", notes: "The line continues down the hillside outside the paid courtyard, marked in the path. Same photo, same hemispheres, no ticket." },
            { title: "The Queen's House", where: "Bottom of the park, free", notes: "Free art gallery with the Tulip Stairs — a perfect spiral you shoot from directly underneath. On your way to the Painted Hall anyway." },
          ],
          food: [
            { title: "Coffee at the top of the hill", where: "Pavilion café, by the Observatory", notes: "Right at the viewpoint and open early — the civilised way to wait out the hour before the Painted Hall opens." },
          ],
        },
        {
          time: "10:00",
          title: "Painted Hall, Old Royal Naval College",
          notes: "Opens at 10 — be at the door. Thornhill's ceiling took nineteen years to paint and they hand you a mirror so you can look up without breaking your neck. Often called Britain's Sistine Chapel, and unlike the real one you can photograph it.",
          location: { name: "Painted Hall, Greenwich", query: "Painted Hall, Old Royal Naval College, Greenwich, London" },
          booking: {
            level: "required",
            shortName: "Painted Hall",
            notes: "Ticketed, around £15, and worth booking rather than queueing — you only have from 10:00 to about 11:45 here. Tickets are usually valid for a year on re-entry, so a morning visit doesn't waste it. Take the 10:00 opening slot.",
            via: "Klook first. If it isn't listed, book direct at ornc.org — the Old Royal Naval College is a smaller charity site, so it's less likely to be on the big resale platforms than the headline attractions.",
          },
          transport: [
            { mode: "walk", detail: "Downhill through the park", minutes: 18, steps: 2000 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/The_Painted_Hall._the_Old_Royal_Naval_College%2C_Greenwich_-_geograph.org.uk_-_2430482.jpg/960px-The_Painted_Hall._the_Old_Royal_Naval_College%2C_Greenwich_-_geograph.org.uk_-_2430482.jpg",
              href: "https://commons.wikimedia.org/wiki/File:The_Painted_Hall._the_Old_Royal_Naval_College,_Greenwich_-_geograph.org.uk_-_2430482.jpg",
              caption: "The hall down its full length — the wide shot",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/The_Painted_Hall%2C_Old_Royal_Naval_College_Greenwich_%282880572526%29.jpg/960px-The_Painted_Hall%2C_Old_Royal_Naval_College_Greenwich_%282880572526%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:The_Painted_Hall,_Old_Royal_Naval_College_Greenwich_(2880572526).jpg",
              caption: "Thornhill's ceiling — lie back on a beanbag and shoot straight up",
            },
          ],
          optional: [
            { title: "The Nelson Room", where: "Off the lower hall, included", notes: "Where Nelson's body lay in state after Trafalgar. Small, sombre, and skipped by most of the room." },
            { title: "Chapel of St Peter and St Paul", where: "Opposite courtyard, free", notes: "No ticket needed and almost nobody crosses the lawn for it — a pastel Georgian interior that's the complete tonal opposite of the Painted Hall." },
            { title: "The riverside frontage", where: "Behind the college, free", notes: "Wren's twin domes framing the Queen's House and the Observatory on the hill behind — the composition the whole site was designed around." },
          ],
          food: [
            { title: "Lunch at Greenwich Market", where: "5 min walk, on the way to the DLR", notes: "Grab it on the way home so you're eating at your desk rather than losing morning time to a sit-down. Dozens of stalls under one roof." },
            { title: "Pie and mash at Goddards", where: "Greenwich Church Street", notes: "Serving Greenwich since 1890 — the proper old London plate, and quick enough to fit before the 11:45 departure." },
          ],
        },
        {
          time: "11:45",
          title: "Head back — work starts at 1:00 PM",
          notes: "Only 25 minutes home from here, so this is the one morning with a comfortable margin. Grab lunch at Greenwich Market on the way to the DLR.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
          transport: [
            { mode: "train", detail: "DLR from Cutty Sark, change at Poplar", minutes: 25 },
          ],
        },
      ],
    },

    "2026-09-30": {
      label: "Cluster 4 — South Kensington museums",
      note: "The tightest morning of the week: both museums open at 10:00 and South Kensington is 40 minutes from the hotel, so you realistically get two hours. If that feels rushed, drop the V&A and give the Natural History Museum the whole slot. Kyoto Garden moved off this day.",
      items: [
        {
          time: "10:00",
          title: "Natural History Museum — Hintze Hall",
          notes: "Free entry — book a timeslot to skip the queue, and take the 10:00 opening. Hintze Hall with the blue whale skeleton is immediately inside; if you only see one room, that's the one.",
          location: { name: "Natural History Museum", query: "Natural History Museum, London" },
          booking: {
            level: "required",
            shortName: "Natural History Museum slot",
            notes: "Free, but reserve a timed slot online — with only a two-hour morning you cannot afford the walk-up queue. Take the 10:00 opening.",
            via: "Official site only — nhm.ac.uk. General entry is free, so skip any Klook listing that charges for it; those are paid special exhibitions, not the museum.",
          },
          transport: [
            { mode: "tube", detail: "Jubilee → Piccadilly via Green Park to South Kensington", minutes: 40 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hope%2C_Hintze_Hall%2C_Natural_History_Museum%2C_London_-_1.jpg/960px-Hope%2C_Hintze_Hall%2C_Natural_History_Museum%2C_London_-_1.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Hope,_Hintze_Hall,_Natural_History_Museum,_London_-_1.jpg",
              caption: "Hope the blue whale over Hintze Hall — shoot from the stairs",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Natural_History_Museum_Hintze_Hall.jpg/960px-Natural_History_Museum_Hintze_Hall.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Natural_History_Museum_Hintze_Hall.jpg",
              caption: "The full hall — Romanesque arches and terracotta",
            },
          ],
          optional: [
            { title: "Go up to the first-floor balcony", where: "Stairs at the back of Hintze Hall", notes: "The whale shot everyone wants is from halfway up the staircase, level with the skeleton rather than under it. Two minutes' detour, completely different photo." },
            { title: "The Earth Hall escalator", where: "Exhibition Road entrance", notes: "You ride an escalator up through a giant metal globe. Quick, strange, and right by the door you'll leave from." },
            { title: "Darwin Centre cocoon", where: "Orange zone", notes: "Only if the museum is quiet — a spiral walk down the inside of a giant concrete cocoon of specimens. Skip it if you're tight on time." },
          ],
          food: [
            { title: "Coffee before opening", where: "Cafés on Exhibition Road", notes: "You want to be at the door at 10:00, not queueing for breakfast inside. Caffeinate on the walk up from the station." },
          ],
        },
        {
          time: "11:15",
          title: "V&A Museum — tiled courtyard",
          notes: "Also free, and four minutes' walk. Go straight to the John Madejski Garden courtyard and the tiled café rooms rather than trying to see the collection — that's a return trip, not a half hour.",
          location: { name: "V&A Museum", query: "Victoria and Albert Museum, London" },
          booking: {
            level: "recommended",
            notes: "Nothing to book — the permanent collection is free and walk-up, which is why it's the flexible half of this morning. If the Natural History Museum overruns, this is the stop to shorten or drop without losing money.",
            via: "No ticket needed. Skip any Klook listing for the V&A — those are the paid temporary exhibitions, not the galleries you're going for.",
          },
          transport: [
            { mode: "walk", minutes: 4, steps: 450 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/At_Victoria_and_Albert_Museum_2024_017.jpg/960px-At_Victoria_and_Albert_Museum_2024_017.jpg",
              href: "https://commons.wikimedia.org/wiki/File:At_Victoria_and_Albert_Museum_2024_017.jpg",
              caption: "John Madejski Garden — the oval pool and facade",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/London_-_Cromwell_Gardens_-_Victoria_%26_Albert_Museum_-_Caf%C3%A9_-_The_Gamble_Room_III.jpg/960px-London_-_Cromwell_Gardens_-_Victoria_%26_Albert_Museum_-_Caf%C3%A9_-_The_Gamble_Room_III.jpg",
              href: "https://commons.wikimedia.org/wiki/File:London_-_Cromwell_Gardens_-_Victoria_%26_Albert_Museum_-_Caf%C3%A9_-_The_Gamble_Room_III.jpg",
              caption: "The Gamble Room — tiled and gilded, and it's just the café",
            },
          ],
          optional: [
            { title: "The Victorian refreshment rooms", where: "Ground floor, through the café", notes: "The Gamble, Poynter and Morris rooms — the world's first museum restaurant, and still the most beautiful. You can sit down with a coffee inside a Grade I interior for the price of a flat white." },
            { title: "The Cast Courts", where: "Room 46, ground floor", notes: "A full-size plaster copy of Trajan's Column in two halves because it wouldn't fit, next to a replica Michelangelo David. Absurd, enormous, and thirty seconds from the garden." },
            { title: "The garden courtyard itself", where: "Centre of the museum", notes: "Free to sit in, and in September the shallow pool is usually open for paddling. The best quiet ten minutes in South Kensington." },
          ],
          food: [
            { title: "Coffee in the Gamble Room", where: "V&A café, ground floor", notes: "The single best-value thing on this day: a museum café that happens to be a masterpiece of Victorian decorative art. Sit under the gilded ceiling rather than taking it away." },
            { title: "Lunch on Exhibition Road", where: "Between the museums and the station", notes: "Grab something on the walk back to South Kensington — you're logging on at 1 PM and the run home is the longest of the week." },
          ],
        },
        {
          time: "11:50",
          title: "Head back — work starts at 1:00 PM",
          notes: "Leave South Kensington by 11:50 at the latest. This is the longest run home of the week, so don't let the V&A overrun.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
          transport: [
            { mode: "tube", detail: "Piccadilly to Green Park, Jubilee to Canning Town, DLR one stop", minutes: 45 },
          ],
        },
      ],
    },

    "2026-10-01": {
      label: "Cluster 5 — Notting Hill & Little Venice",
      note: "Best day to start early — it's all streets and towpath, nothing that needs to be open. An 8 AM start in Notting Hill also means empty pastel houses, which is exactly what you want for photos. Absorbed 11 October: the duplicate Little Venice stop collapsed into the one below, and Chinatown Bakery came across as an evening item — see the warning on it, since 7 PM is inside the work block.",
      items: [
        {
          time: "08:00",
          title: "Notting Hill pastel houses — Lancaster Road",
          notes: "Go early for empty streets; be considerate — people live here. At 8 AM you'll have the whole row to yourselves, which is worth the alarm.",
          location: { name: "Lancaster Road", query: "Lancaster Road, Notting Hill, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → Central to Notting Hill Gate + 10-min walk", minutes: 50 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Colourful_houses_in_Lancaster_Road%2C_Notting_Hill_-_2020-07-05.jpg/960px-Colourful_houses_in_Lancaster_Road%2C_Notting_Hill_-_2020-07-05.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Colourful_houses_in_Lancaster_Road,_Notting_Hill_-_2020-07-05.jpg",
              caption: "The pastel row — stand across the street for the full sweep",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Colourful_houses_in_Lancaster_Road%2C_Notting_Hill_2020-07-05.jpg/960px-Colourful_houses_in_Lancaster_Road%2C_Notting_Hill_2020-07-05.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Colourful_houses_in_Lancaster_Road,_Notting_Hill_2020-07-05.jpg",
              caption: "Closer in — pick one door as the backdrop",
            },
          ],
          optional: [
            { title: "Portobello Road", where: "5 min south", notes: "Thursday is a quieter general-goods day rather than the big Saturday antiques market — which suits you, because the colourful shopfronts photograph far better without the crowd in front of them." },
            { title: "Kyoto Garden, Holland Park", where: "15 min south", notes: "The stop that got cut from the museums day, and this is its natural home — Holland Park opens at 7:30 AM, it's free, and the peacocks are out early. Only if you can face leaving the hotel by 7." },
            { title: "The blue door from the film", where: "280 Westbourne Park Road", notes: "Hugh Grant's front door. It's a private house on a residential street, so photograph it from across the road and move on." },
          ],
          food: [
            { title: "Pastries at a Notting Hill bakery", where: "Along Portobello Road", notes: "Several open from 7–8 AM for locals. At this hour it's the only thing running, and eating one on a doorstep in the empty street is the whole point of the early start." },
          ],
        },
        {
          time: "09:00",
          title: "St Luke's Mews",
          notes: "The pink 'Love Actually' mews house — number 22, where the cue cards scene was filmed. A cobbled lane of pastel-painted former stables, and genuinely lovely even if you don't care about the film. Quiet residential street, so keep voices down at this hour.",
          location: { name: "St Luke's Mews", query: "St Luke's Mews, Notting Hill, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/St_Lukes_Mews%2C_Notting_Hill%2C_London_%28geograph_6086918%29.jpg/960px-St_Lukes_Mews%2C_Notting_Hill%2C_London_%28geograph_6086918%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St_Lukes_Mews,_Notting_Hill,_London_(geograph_6086918).jpg",
              caption: "The pink house at number 22 — the Love Actually door",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/St_Lukes_Mews%2C_Notting_Hill%2C_London_%28geograph_6089429%29.jpg/960px-St_Lukes_Mews%2C_Notting_Hill%2C_London_%28geograph_6089429%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St_Lukes_Mews,_Notting_Hill,_London_(geograph_6089429).jpg",
              caption: "The cobbled lane — the whole run is worth walking",
            },
          ],
          optional: [
            { title: "Walk the length of the mews", where: "The lane itself", notes: "Most people photograph the pink door and leave. The whole cobbled run is painted in different colours and is prettier than the one famous house." },
            { title: "Powis Square gardens", where: "5 min back east", notes: "A quiet communal square on the way to Little Venice — the kind of railinged London garden the area is actually made of." },
          ],
          food: [
            { title: "Second coffee before the canal", where: "Westbourne Park Road", notes: "Last easy stop before a long towpath stretch with nothing on it. Take a cup to go." },
          ],
        },
        {
          time: "09:45",
          title: "Regent's Canal towpath from Little Venice",
          notes: "Scenic waterside walk — moored narrowboats, painted bridges, and the pool where the Grand Union meets the Regent's Canal. Walk as far as you feel like and turn back; you don't have to reach Camden, and today you shouldn't try.",
          location: { name: "Little Venice", query: "Little Venice, London" },
          booking: {
            level: "recommended",
            notes: "Nothing on today needs booking — it's all public streets and towpath, which is what makes this the most work-day-proof morning of the week. The one bookable option is the canal waterbus below, and I'd skip it today.",
            via: "No tickets required anywhere on this day.",
          },
          transport: [
            { mode: "walk", minutes: 26, steps: 2900 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Narrowboats_in_Little_Venice%2C_London_%282%29.jpg/960px-Narrowboats_in_Little_Venice%2C_London_%282%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Narrowboats_in_Little_Venice,_London_(2).jpg",
              caption: "Moored narrowboats — the classic Little Venice frame",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Grand_Union_Canal%2C_Little_Venice_-_geograph.org.uk_-_6384914.jpg/960px-Grand_Union_Canal%2C_Little_Venice_-_geograph.org.uk_-_6384914.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Grand_Union_Canal,_Little_Venice_-_geograph.org.uk_-_6384914.jpg",
              caption: "The canal pool — water, boats and trees in one shot",
            },
          ],
          optional: [
            { title: "Browning's Island", where: "Centre of the pool", notes: "The willow-covered island the whole basin curves around. Best seen from the bridge at Warwick Avenue — thirty seconds' detour for the postcard angle." },
            { title: "The waterbus to Camden", where: "Little Venice pier", notes: "A 50-minute narrowboat through Regent's Park and the zoo. Lovely — but it lands you in Camden with an hour's journey home, so save it for a non-work day rather than risking the 1 PM start." },
            { title: "Maida Hill tunnel portal", where: "10 min along the towpath", notes: "The towpath stops dead where the canal disappears under Edgware Road — a strange, abrupt bit of Victorian engineering. Good natural turnaround point." },
          ],
          food: [
            { title: "Canal-side breakfast at Warwick Avenue", where: "By the bridge", notes: "A couple of cafés overlook the water right where you'll turn back — the civilised end to the morning before the commute home." },
            { title: "Grab lunch near a Jubilee line stop", where: "On the way home", notes: "It's a 55-minute run back today, the longest of the week. Buy lunch before you get on rather than arriving hungry at 12:45." },
          ],
        },
        {
          time: "11:30",
          title: "Head back — work starts at 1:00 PM",
          notes: "Turn around wherever you've got to on the towpath. Warwick Avenue is the nearest tube if you stayed near Little Venice.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
          transport: [
            { mode: "tube", detail: "Bakerloo from Warwick Avenue, change for the Jubilee, then DLR", minutes: 55 },
          ],
        },
        {
          time: "19:00",
          title: "Chinatown Bakery — £1.50 fluffy BBQ pork buns",
          notes: "Late-night cheap eats; the taiyaki machine in the window is hypnotic. Newport Court, just off Gerrard Street — cash-cheap and open late. ⚠️ Moved here from 11 Oct, but 7 PM sits inside today's 1–10 PM work block — this only works if you can step away, otherwise it belongs on 5 October with the Soho evening.",
          location: { name: "Chinatown Bakery", query: "Chinatown Bakery, Newport Court, London" },
          transport: [
            { mode: "tube", detail: "Bakerloo to Piccadilly Circus + walk", minutes: 25 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg/960px-Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Lantern_heaven_on_Gerrard_Street_-_geograph.org.uk_-_1721601.jpg",
              caption: "Gerrard Street lanterns — best after dark",
            },
          ],
          optional: [
            { title: "The lanterns after dark", where: "Gerrard Street", notes: "Red lanterns strung the length of the street, lit from dusk. Coming at 7 PM rather than daytime is the right call for photos." },
            { title: "The paifang gates", where: "Both ends of Gerrard Street", notes: "The ornamental arches make a natural frame — stand back and shoot down the street through one." },
            { title: "Chinatown to Soho in five minutes", where: "North across Shaftesbury Ave", notes: "If you want a drink after, Soho starts immediately on the other side of the road." },
          ],
          food: [
            { title: "BBQ pork buns", where: "Chinatown Bakery", notes: "The £1.50 headline item — soft, sweet-glazed, and worth the trip on their own." },
            { title: "Taiyaki from the window machine", where: "Same shop", notes: "Fish-shaped custard cakes made in front of you. Watching the machine is half the appeal." },
            { title: "Egg tarts", where: "Any Chinatown bakery", notes: "Portuguese-style with the caramelised top, or the paler Cantonese version — both are about a pound." },
          ],
        },
      ],
    },

    "2026-10-02": {
      label: "Tentative — Warner Bros. Studio Tour ⚡ (optional full day)",
      countLabel: "5 steps — not booked yet",
      note: "MOVED HERE from 27 Sept. Heads-up: 2 October is still inside the remote-work block (1:00 PM – 10:00 PM London), and this is a full day out — 7:45 AM departure, back around 4:30 PM. It cannot coexist with a 1 PM login, so you need the day off, or the day moves again. Booking is still the first job: timed tickets, never sold at the door.",
      items: [
        {
          time: "07:45",
          title: "Leave the hotel for Euston",
          notes: "Long day, early start. Nothing on site is cheap, so eat something first — Euston has plenty if you'd rather grab breakfast there.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
        },
        {
          time: "09:00",
          title: "Euston → Watford Junction",
          notes: "Fast trains take about 20 minutes; the slow ones nearly double that, so check the board for a fast service. Aim to be at Watford Junction by 09:45 for a 10:30 tour slot.",
          location: { name: "London Euston", query: "London Euston Station" },
          transport: [
            { mode: "train", detail: "DLR to Bank, then Northern line to Euston", minutes: 45 },
            { mode: "taxi", detail: "Door to door if you're running late", minutes: 40 },
          ],
        },
        {
          time: "10:30",
          title: "Studio Tour — The Making of Harry Potter",
          notes: "Studio Tour Drive, Leavesden WD25 7LR. The entry time on your ticket is when you go in, not a time limit — most people take three and a half to four hours. It's the actual sets, props and costumes from the films, not a theme park.",
          location: { name: "Warner Bros. Studio Tour London", query: "Warner Bros. Studio Tour London - The Making of Harry Potter, Studio Tour Drive, Leavesden WD25 7LR" },
          booking: {
            level: "required",
            shortName: "Studio Tour tickets",
            notes: "The most urgent booking of the whole trip. Timed entry, never sold at the door, and Sundays go first — if this day is happening at all, book it before anything else on this page.",
            via: "Klook usually lists this one, often bundled with the Watford Junction shuttle — compare that bundle against booking direct at wbstudiotour.co.uk, because the official site releases inventory first and this is the tour most likely to sell out before resellers get stock.",
          },
          transport: [
            { mode: "bus", detail: "Branded double-decker shuttle from Watford Junction — runs every 20 min, small fee, cash or card", minutes: 15 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hogwart%E2%80%98s_Great_Hall%2C_Warner_Bros_Harry_Potter_Studio%2C_London_01.jpg/960px-Hogwart%E2%80%98s_Great_Hall%2C_Warner_Bros_Harry_Potter_Studio%2C_London_01.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Hogwart%E2%80%98s_Great_Hall,_Warner_Bros_Harry_Potter_Studio,_London_01.jpg",
              caption: "The Great Hall — the first room you enter, and the best one",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Hogwarts_Express_%282025%29.jpg/960px-Hogwarts_Express_%282025%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Hogwarts_Express_(2025).jpg",
              caption: "The Hogwarts Express — trolley photo op on Platform 9¾",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Gringotts_Wizarding_Bank.jpg/960px-Gringotts_Wizarding_Bank.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Gringotts_Wizarding_Bank.jpg",
              caption: "Diagon Alley — shoot down the street from the Gringotts end",
            },
          ],
          optional: [
            { title: "The Hogwarts castle model", where: "Near the end of the tour", notes: "A 1:24 scale castle filling a darkened room, lit through a slow sunrise-to-night cycle. Wait for a full lighting cycle — it's the emotional finish and people rush it." },
            { title: "Ride the broomstick green screen", where: "Backlot, extra charge", notes: "Cheesy, and you'll buy the photo anyway. Skip it if the queue is long; the footage is the same for everyone." },
            { title: "Platform 9¾ trolley shot", where: "Hogwarts Express section", notes: "Free, staffed, and the single best couple photo of the day — one of you pushing the trolley into the wall." },
          ],
          food: [
            { title: "Butterbeer", where: "Backlot Café, halfway round", notes: "The one thing you genuinely have to try — butterscotch cream soda with a thick foam top. Sweet enough to share one between two. The frozen version is better than the regular." },
            { title: "Butterbeer ice cream", where: "Backlot Café / Food Hall", notes: "Same flavour, less sugar shock than the drink. Get this if you can only face one of the two." },
            { title: "Proper lunch in the Food Hall", where: "Between the two soundstages", notes: "Standard cafeteria food at captive-audience prices, but the tour is long and there's nowhere else. Budget for it or bring snacks." },
          ],
        },
        {
          time: "15:00",
          title: "Gift shop, then the shuttle back",
          notes: "The shop at the exit is the largest Harry Potter shop anywhere and hard to escape quickly — leave 30 minutes for it if you plan to buy wands or house scarves.",
          location: { name: "Watford Junction", query: "Watford Junction Station" },
          transport: [
            { mode: "bus", detail: "Shuttle back to Watford Junction", minutes: 15 },
          ],
        },
        {
          time: "16:30",
          title: "Back in London — evening free",
          notes: "You'll be back at Euston around 4:30 PM with the evening open. King's Cross is a five-minute walk from Euston if you want to close the loop on the real Platform 9¾ trolley.",
          location: { name: "London Euston", query: "London Euston Station" },
          transport: [
            { mode: "train", detail: "Watford Junction → Euston", minutes: 25 },
          ],
          optional: [
            { title: "The real Platform 9¾ at King's Cross", where: "5 min walk from Euston", notes: "The trolley in the wall, with a staffed photo queue and a shop. Free to look, and it rhymes nicely with the set you saw this morning." },
            { title: "St Pancras station", where: "Next door to King's Cross", notes: "The gothic red-brick frontage everyone mistakes for King's Cross in the films. Genuinely one of the most beautiful buildings in London — and there's a champagne bar on the platform level." },
          ],
          food: [
            { title: "Dinner around Coal Drops Yard", where: "Behind King's Cross, 10 min", notes: "Converted Victorian coal warehouses turned into a good, non-touristy eating strip. The best food option near either station." },
          ],
        },
      ],
    },

    /* ---------------- OCT 3–6: OPEN ---------------- */
    /* The Scotland/Edinburgh leg was removed — these four days are
       deliberately empty and render the "free day" state. Add stops
       under each ISO date when you decide what replaces it. */

    "2026-10-03": { items: [] },
    "2026-10-04": {
      label: "Day trip — the Cotswolds 🐑",
      note: "Sunday day trip. Be warned: the Cotswolds are genuinely hard without a car — the villages are miles apart with almost no Sunday buses. A guided coach tour from London is the practical way, and it's the one day trip here where I'd not attempt it independently.",
      items: [
        {
          time: "07:30",
          title: "Coach tour departure — central London",
          notes: "Most Cotswolds tours leave from Victoria, Gloucester Road or Russell Square between 7:30 and 8:30 AM. Confirm your exact pick-up point when you book — they differ by operator and it's a long way to chase a departed coach.",
          location: { name: "Victoria Coach Station", query: "Victoria Coach Station, London" },
          booking: {
            level: "required",
            shortName: "Cotswolds coach tour",
            notes: "Essential, and the single decision that makes or breaks this day. Check which villages the itinerary actually stops at — Bibury and Bourton-on-the-Water are the ones you want, and cheaper tours often substitute lesser villages or spend the day mostly on the motorway.",
            via: "Klook lists Cotswolds day tours from London. Read the stop list on the listing carefully and check the operator name; Klook resells several companies with very different routes under similar titles.",
          },
          transport: [
            { mode: "tube", detail: "DLR + Jubilee to Green Park, then Victoria line", minutes: 50 },
          ],
        },
        {
          time: "10:30",
          title: "Bibury — Arlington Row",
          notes: "A row of 14th-century weavers' cottages in honey-coloured stone along a stream — William Morris called it the most beautiful village in England, and it's on the inside cover of the old UK passport. Small, and mobbed by 11 AM, so photograph it the moment you arrive.",
          location: { name: "Arlington Row, Bibury", query: "Arlington Row, Bibury, Cirencester GL7 5NJ" },
          transport: [
            { mode: "bus", detail: "Tour coach from London", minutes: 150 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Arlington_Row_Bibury.jpg/960px-Arlington_Row_Bibury.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Arlington_Row_Bibury.jpg",
              caption: "Arlington Row — the honey-stone cottages",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bibury_Cottages_in_the_Cotswolds_-_June_2007.jpg/960px-Bibury_Cottages_in_the_Cotswolds_-_June_2007.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Bibury_Cottages_in_the_Cotswolds_-_June_2007.jpg",
              caption: "The village along the water — the wider frame",
            },
          ],
          optional: [
            { title: "Shoot from the footbridge", where: "Over the River Coln", notes: "The angle every photo you've seen uses. Get there before the coach behind yours unloads." },
            { title: "Rack Isle water meadow", where: "In front of the cottages", notes: "The marshy island where cloth was once hung to dry. It's why there's an open foreground rather than houses opposite." },
            { title: "Be quiet and don't trespass", where: "Practical", notes: "People live in these cottages and are visibly tired of tourists on their doorsteps. Photograph from the path." },
          ],
          food: [
            { title: "Tea and cake at the trout farm", where: "Bibury Trout Farm café", notes: "The village's one reliable stop, and a working farm since 1902." },
          ],
        },
        {
          time: "13:00",
          title: "Bourton-on-the-Water",
          notes: "The 'Venice of the Cotswolds' — a shallow river running straight through the village green under a row of low stone footbridges. The biggest and most touristy of the villages, which is why tours use it for the lunch stop.",
          location: { name: "Bourton-on-the-Water", query: "Bourton-on-the-Water, Gloucestershire" },
          transport: [
            { mode: "bus", detail: "Tour coach", minutes: 30 },
          ],
          optional: [
            { title: "Walk the length of the river", where: "Through the village green", notes: "Five low bridges in a few hundred metres. Cross them all — it's the whole character of the place." },
            { title: "The Model Village", where: "Behind the Old New Inn, small fee", notes: "A one-ninth scale replica of Bourton, built in the 1930s — including a model of the model village inside itself." },
            { title: "Escape up the side lanes", where: "Off the green", notes: "Two streets back from the river it empties completely and looks like the postcard everyone is queueing for." },
          ],
          food: [
            { title: "A proper Sunday roast", where: "Village pubs", notes: "It's Sunday in an English village — this is the single best day of the week to eat in one. Beef, Yorkshire pudding, gravy." },
            { title: "Cotswold ice cream by the river", where: "On the green", notes: "Eat it sitting on the wall with your feet near the water. Uncomplicated and the right thing to do here." },
            { title: "Cream tea", where: "Any tearoom", notes: "Scones, clotted cream, jam. You're in the part of England that argues about the order — jam first here, cream first in Devon." },
          ],
        },
        {
          time: "19:30",
          title: "Back in London",
          notes: "Tours typically return to their London pick-up point between 7 and 8:30 PM. It's a long day on a coach — around twelve hours door to door — but it's the only realistic way to see these villages without driving.",
          location: { name: "Victoria Coach Station", query: "Victoria Coach Station, London" },
          transport: [
            { mode: "bus", detail: "Tour coach back to London", minutes: 180 },
          ],
        },
      ],
    },
    "2026-10-05": {
      label: "Cluster 6 — Southbank & Death Eater bridges",
      note: "MOVED HERE from 2 Oct. No longer a work day, so the early-start compression is gone — times are relaxed and the afternoon is yours. An outdoor river walk, west to east with the current.",
      items: [
        {
          time: "09:30",
          title: "Battersea Power Station",
          notes: "Start at the western end and let the whole day run downstream with the river. The turbine halls are open early and the building is worth it from outside regardless.",
          location: { name: "Battersea Power Station", query: "Battersea Power Station, London" },
          booking: {
            level: "recommended",
            notes: "The building itself is free to walk into — only Lift 109, the glass lift that rises up inside the north-west chimney, is ticketed. Book that ahead if you want it, and take the earliest slot; it's a ten-minute experience but the queue for walk-ups is not.",
            via: "Klook often lists Lift 109. Compare against batterseapowerstation.co.uk — the official site sometimes has early-bird slots the resellers don't carry.",
          },
          transport: [
            { mode: "tube", detail: "Jubilee → Northern line via Waterloo", minutes: 40 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Battersea_Power_Station_Chimneys_2024-09-19.jpg/960px-Battersea_Power_Station_Chimneys_2024-09-19.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Battersea_Power_Station_Chimneys_2024-09-19.jpg",
              caption: "The four chimneys — the Pink Floyd album cover in person",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Battersea_Power_Station_chimneys_-_2026-03-09.jpg/960px-Battersea_Power_Station_chimneys_-_2026-03-09.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Battersea_Power_Station_chimneys_-_2026-03-09.jpg",
              caption: "Closer on the brick and chimneys",
            },
          ],
          optional: [
            { title: "Lift 109 up the chimney", where: "Inside, ticketed", notes: "A glass lift rising through one of the actual chimneys to a 360° view over the river. Short and not cheap, but it's the only way to be inside the thing you came to photograph." },
            { title: "Turbine Hall A", where: "Ground floor, free", notes: "The restored Art Deco control room with its original dials and switchgear — now a bar, but free to walk through and look at. The best free thing on site." },
            { title: "Cross to the north bank for the wide shot", where: "Riverside, free", notes: "You need distance to fit all four chimneys in one frame. The far bank near Grosvenor Road is where the classic composition comes from." },
          ],
          food: [
            { title: "Breakfast in the power station", where: "Ground-floor food hall", notes: "Opens early for commuters using the new tube station. Convenient rather than remarkable, but it gets the day started without a detour." },
          ],
        },
        {
          time: "11:00",
          title: "Riverside walk to the London Eye",
          notes: "Flat riverside stroll past Vauxhall and Lambeth — shortcut on the Northern line if feet complain. Everything today is outdoors and free. You're walking past the Eye rather than riding it; the view from the bridge behind it is free and nearly as good — though with a free afternoon you could now ride it if you want.",
          location: { name: "London Eye", query: "London Eye, London" },
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/London_Eye_and_the_River_Thames_%28geograph_3086560%29.jpg/960px-London_Eye_and_the_River_Thames_%28geograph_3086560%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:London_Eye_and_the_River_Thames_(geograph_3086560).jpg",
              caption: "The Eye from the riverside path — where the walk ends up",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/London_MMB_%C2%ABI6_River_Thames_and_London_Eye.jpg/960px-London_MMB_%C2%ABI6_River_Thames_and_London_Eye.jpg",
              href: "https://commons.wikimedia.org/wiki/File:London_MMB_%C2%ABI6_River_Thames_and_London_Eye.jpg",
              caption: "Across the water — the wide South Bank view",
            },
          ],
          optional: [
            { title: "Westminster Bridge from the south end", where: "2 min past the Eye", notes: "Parliament and Big Ben across the water, with the Eye behind you. The best free view on the whole walk, and you've already paid for it with your feet." },
            { title: "Ride the Eye", where: "Ticketed, ~30 min", notes: "Now actually feasible — this is a free day, so the 45 minutes with the queue no longer costs you anything. Cheapest booked ahead, and Klook carries it." },
            { title: "The Southbank skate space", where: "Under Queen Elizabeth Hall", notes: "Decades of graffiti and skaters in the undercroft — the most un-touristy thing on this stretch, and free to watch." },
          ],
          food: [
            { title: "Coffee on the South Bank", where: "Riverside kiosks", notes: "The stretch between Lambeth and the Eye has carts open from early. Halfway point of the walk and a good place to sit for five minutes." },
          ],
          transport: [
            { mode: "walk", minutes: 50, steps: 5500 },
            { mode: "tube", detail: "Northern line back to Waterloo", minutes: 20 },
          ],
        },
        {
          time: "13:00",
          title: "Tate Modern — free viewing level",
          notes: "Opens at 10, free, and the Blavatnik viewing terrace gives you St Paul's across the river without paying for a view. Walk through the Turbine Hall on the way in — the old power station's main space, kept deliberately vast and empty.",
          location: { name: "Tate Modern", query: "Tate Modern, London" },
          booking: {
            level: "recommended",
            notes: "Nothing to book — the collection, the Turbine Hall and the viewing terrace are all free walk-up. Only the temporary headline exhibitions are ticketed, and with a free afternoon you now have time for one if something appeals.",
            via: "No ticket needed. Any paid Tate Modern listing is a temporary exhibition, not the galleries.",
          },
          transport: [
            { mode: "walk", minutes: 20, steps: 2200 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tate_Modern_%28Blavatnik_Building%29%2C_Bankside_2025-07-31.jpg/960px-Tate_Modern_%28Blavatnik_Building%29%2C_Bankside_2025-07-31.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Tate_Modern_(Blavatnik_Building),_Bankside_2025-07-31.jpg",
              caption: "The Blavatnik Building — the terrace is at the top",
            },
          ],
          optional: [
            { title: "Level 10 viewing terrace", where: "Blavatnik Building, free", notes: "A full circuit of the City skyline with St Paul's directly opposite. Free, rarely busy at 11 AM, and better than several views people pay for." },
            { title: "The Turbine Hall installation", where: "Ground floor, free", notes: "Whatever is in there when you visit — the commissions are usually enormous and worth ten minutes even if modern art isn't your thing." },
          ],
          food: [
            { title: "Bakery run on Bankside", where: "Between the Tate and the bridge", notes: "The riverside parade has good independent bakeries. Grab something to eat on the bridge." },
          ],
        },
        {
          time: "15:00",
          title: "Millennium Bridge → St Paul's Cathedral",
          notes: "The bridge the Death Eaters destroy in Half-Blood Prince — line up the St Paul's shot from mid-bridge, where the dome sits exactly at the end of the walkway. Two minutes from the Tate's front door, and the whole crossing takes five.",
          location: { name: "St Paul's Cathedral", query: "St Paul's Cathedral, London" },
          booking: {
            level: "recommended",
            notes: "The bridge and the exterior are free. Going inside is around £26 and needs two hours for the dome climb — and this is now a free day, so it finally fits if you want it. Last entry is usually mid-afternoon, so book a slot rather than turning up at 3 PM and being turned away.",
            via: "Klook carries St Paul's. Compare with stpauls.co.uk, whose own advance ticket usually includes the multimedia guide and the galleries.",
          },
          transport: [
            { mode: "walk", minutes: 10, steps: 1100 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/St_Paul%27s_Cathedral_from_the_Millennium_Bridge%2C_London%2C_SE1_-_geograph.org.uk_-_3820966.jpg/960px-St_Paul%27s_Cathedral_from_the_Millennium_Bridge%2C_London%2C_SE1_-_geograph.org.uk_-_3820966.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St_Paul%27s_Cathedral_from_the_Millennium_Bridge,_London,_SE1_-_geograph.org.uk_-_3820966.jpg",
              caption: "The dome framed by the bridge cables — stand centre",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/London_-_Millennium_Bridge_-_St._Paul%27s_Cathedral.jpg/960px-London_-_Millennium_Bridge_-_St._Paul%27s_Cathedral.jpg",
              href: "https://commons.wikimedia.org/wiki/File:London_-_Millennium_Bridge_-_St._Paul%27s_Cathedral.jpg",
              caption: "Wider angle with the full span leading to the cathedral",
            },
          ],
          optional: [
            { title: "St Paul's churchyard garden", where: "North side, free", notes: "A quiet green space right against the cathedral wall — the calmest place to sit and decide what to do with the evening." },
            { title: "One New Change roof terrace", where: "Behind the cathedral, free", notes: "A shopping centre with a free open roof terrace that puts you level with the dome from a few metres away. The best free St Paul's view in London, and almost nobody goes up." },
          ],
          food: [
            { title: "Dinner around Cheapside", where: "One New Change / Bow Lane", notes: "The City empties after work, so early evening here is calm. Bow Lane's narrow pedestrian run has the better independents." },
          ],
        },
        {
          time: "15:45",
          title: "One New Change — glass lift & St Paul's reflections",
          notes: "Free rooftop + the glass elevator; the reflection shot of St Paul's is from the east terrace. The lift is glass on the outside of the building, so the ride up is part of it. No ticket, no booking — just walk in and go to the top.",
          location: { name: "One New Change", query: "One New Change, London" },
          transport: [
            { mode: "tube", detail: "DLR to Bank + short walk", minutes: 25 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/St_Paul%27s_Cathedral_reflections_at_One_New_Change_01.jpg/960px-St_Paul%27s_Cathedral_reflections_at_One_New_Change_01.jpg",
              href: "https://commons.wikimedia.org/wiki/File:St_Paul%27s_Cathedral_reflections_at_One_New_Change_01.jpg",
              caption: "The dome reflected in the glass — the shot to get",
            },
          ],
          optional: [
            { title: "The reflection from ground level", where: "Outside, east side", notes: "Before you go up, shoot the cathedral mirrored in the building's glass wall. It's the cleverer photo and it's free." },
            { title: "Ride the glass lift facing out", where: "Interior lift", notes: "Stand at the back facing the glass as it climbs the outside — the dome rises into view. Better than the terrace itself." },
            { title: "St Mary-le-Bow", where: "3 min down Cheapside", notes: "The Bow Bells church — true Cockneys are those born within earshot. Free, and the crypt café is underneath." },
          ],
          food: [
            { title: "Coffee on the terrace", where: "Rooftop level", notes: "There's a bar up there with the dome directly opposite. The view is free either way, but this is a nice place to sit." },
          ],
        },
        {
          time: "16:45",
          title: "SpudBros Express — jacket potatoes",
          notes: "The TikTok jacket-potato people. Cheap, enormous, and exactly the right lunch on a cold October day — pick a filling and expect it to be far more than you asked for.",
          location: { name: "SpudBros Express", query: "SpudBros Express, Shaftesbury Avenue, London" },
          transport: [
            { mode: "tube", detail: "Central to Tottenham Court Road + walk", minutes: 15 },
            { mode: "walk", minutes: 25, steps: 2800 },
          ],
          optional: [
            { title: "Go off-peak", where: "Before 12 or after 2", notes: "It's a small unit with a viral following. The queue is the only real obstacle and it thins either side of lunch." },
            { title: "Seven Dials nearby", where: "8 min east", notes: "The sundial pillar where seven streets meet, ringed by small shops. A good wander while you eat." },
          ],
          food: [
            { title: "Cheese and beans", where: "The default", notes: "The classic British jacket potato. Unglamorous, correct, and about a fiver." },
            { title: "Whatever the special is", where: "Board out front", notes: "They rotate loaded versions — usually the reason a given queue is that long." },
          ],
        },
        {
          time: "17:30",
          title: "Italian Bear Chocolate — the viral hot chocolate",
          notes: "Thick sipping chocolate; expect a queue on weekends. This is drinking chocolate closer to melted ganache than to cocoa — a small is genuinely enough.",
          location: { name: "Italian Bear Chocolate", query: "Italian Bear Chocolate, Soho, London" },
          transport: [
            { mode: "walk", minutes: 7 },
          ],
          optional: [
            { title: "Share one between two", where: "Practical", notes: "It's extremely rich. One cup and two spoons is the sensible order, whatever the queue suggests." },
            { title: "Walk it off in Soho Square", where: "5 min north", notes: "A small green square with a mock-Tudor hut in the middle — the nearest place to sit down afterwards." },
            { title: "Neal's Yard again", where: "10 min east", notes: "You saw it on 24 September. Late afternoon light in the courtyard is different and it's on the way to Covent Garden." },
          ],
          food: [
            { title: "The thick hot chocolate", where: "The reason you're here", notes: "Order the classic dark before trying a flavoured one — the plain version is the benchmark." },
            { title: "Chocolate-dipped croissant", where: "Counter", notes: "If you want something to eat alongside. Or skip it — the drink is basically a dessert already." },
          ],
        },
        {
          time: "12:15",
          title: "Bakery catch-up — revisit anything we missed",
          notes: "Slot in whatever got skipped — Fortitude seconds, another Humble Crumble. This is also the natural home for the stops that came off the work-week mornings.",
          optional: [
            { title: "Borough Market", where: "London Bridge", notes: "Cut from 28 September for the work day. The Humble Crumble stall is the one you were after, and a Tuesday is far calmer than a weekend." },
            { title: "Brick Lane & Beigel Bake", where: "Shoreditch", notes: "Cut from 29 September. Vintage markets plus the 24-hour salt beef bagel — about £6 for the best cheap sandwich in London." },
            { title: "Kyoto Garden, Holland Park", where: "Holland Park", notes: "Cut from 30 September. Free Japanese garden with a waterfall and peacocks, and October colour makes it the right month for it." },
          ],
          food: [
            { title: "Salt beef bagel at Beigel Bake", where: "Brick Lane", notes: "Open 24 hours since forever, cash-friendly, and the queue moves fast. Ask for mustard and pickle." },
            { title: "Humble Crumble", where: "Borough Market", notes: "The viral crumble in a cup with custard poured over. The thing that was on the original plan and never happened." },
            { title: "One last flat white", where: "Anywhere good", notes: "London does coffee properly. Have a decent one before you're back on airline coffee for a day." },
          ],
        },
        {
          time: "18:30",
          title: "Golden-hour Thames path walk",
          notes: "Sunset is around 6:10 PM by mid-October, so this lands you on the river exactly as the light goes. Queen's Walk runs past the Eye, the Southbank Centre and the Tate with Parliament across the water — the best free last night in London.",
          location: { name: "Queen's Walk, South Bank", query: "Queen's Walk, South Bank, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Waterloo", minutes: 16 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Westminster_and_London_Eye_at_dusk.JPG/960px-Westminster_and_London_Eye_at_dusk.JPG",
              href: "https://commons.wikimedia.org/wiki/File:Westminster_and_London_Eye_at_dusk.JPG",
              caption: "Westminster and the Eye at dusk — the last-night shot",
            },
          ],
          optional: [
            { title: "Start at Westminster Bridge and walk east", where: "The whole path", notes: "Walking east keeps the sunset behind you and lights the buildings across the water. The other direction puts you into the glare." },
            { title: "The secondhand book market", where: "Under Waterloo Bridge", notes: "Open-air stalls under the arches every day. A paperback for the flight is a good last purchase." },
            { title: "Gabriel's Wharf and the beach", where: "Near the OXO Tower", notes: "At low tide there's actual Thames foreshore you can step down onto. Check the tide, and don't pick anything up." },
          ],
          food: [
            { title: "Dinner at Gabriel's Wharf", where: "On the walk", notes: "A small cluster of restaurants with river tables — casual, and the right scale for a last evening." },
            { title: "Something from the Southbank food stalls", where: "By the Festival Hall", notes: "Usually a small street-food market along the path. Eat it on the wall watching the river." },
          ],
        },
        {
          time: "19:45",
          title: "Too Good To Go — £3 pastry bags for the flight",
          notes: "Check the app around closing time for high-end bakery surprise bags. Genuinely the cheapest good food in London, and perfect timing — tomorrow is a 7 AM checkout with airport food as the only alternative.",
          optional: [
            { title: "Set the app up tonight, not tomorrow", where: "Too Good To Go", notes: "Bags are reserved in advance and collected in a set window. Browse in the afternoon so you're not scrambling at closing time." },
            { title: "Pick a collection near the hotel", where: "Canary Wharf / Docklands", notes: "Filter to your area rather than central London — you don't want a cross-city trip at 9 PM before an early flight." },
            { title: "Pack them in hand luggage", where: "Practical", notes: "Baked goods are fine through security and vastly better than anything at Heathrow at 8 AM." },
          ],
          food: [
            { title: "Whatever the bakery bag holds", where: "Surprise by design", notes: "Usually two or three times the value in pastries. Breakfast tomorrow, sorted, for about £3." },
          ],
        },
      ],
    },
    "2026-10-06": { items: [] },

    /* ---------------- LONDON, FINAL WEEK ---------------- */

    "2026-10-07": {
      label: "Bloomsbury pastries → West End → Mayfair",
      note: "Merged 7 and 8 October — Oxford Street and Regent Street meet at Oxford Circus and Liberty is three minutes off it, so they were never two days' worth of walking. One continuous westward drift from Bloomsbury to Mayfair.",
      items: [
        {
          time: "11:00",
          title: "Fortitude Bakehouse — viral pistachio beignets",
          notes: "Tiny Bloomsbury bakery — go before the lunchtime queue. It's on a quiet colonnade near Russell Square, and it genuinely is small, so a queue of ten people is a long wait.",
          location: { name: "Fortitude Bakehouse", query: "Fortitude Bakehouse, Colonnade, London" },
          optional: [
            { title: "The British Museum", where: "8 min walk, free", notes: "You're around the corner from one of the world's great museums and it costs nothing. Even an hour in the Great Court and the Egyptian gallery is worth the detour." },
            { title: "Russell Square gardens", where: "2 min", notes: "Big plane trees and a fountain — the classic Bloomsbury square to eat your pastry in." },
            { title: "Sicilian Avenue", where: "6 min south", notes: "A short colonnaded parade of shops that looks transplanted from Italy. Almost nobody photographs it." },
          ],
          food: [
            { title: "Pistachio beignet", where: "Fortitude Bakehouse", notes: "The thing you came for — fried, filled, and best within about a minute of being handed over." },
            { title: "Cardamom bun", where: "Same counter", notes: "If the beignets have gone, this is the other one people queue for. Get both if they haven't." },
          ],
        },
        {
          time: "13:00",
          title: "Oxford Street — budget window shopping",
          notes: "Europe's busiest shopping street. Honestly more interesting for the side streets it connects to than for itself — treat it as a corridor rather than a destination.",
          location: { name: "Oxford Street", query: "Oxford Street, London" },
          transport: [
            { mode: "walk", minutes: 20, steps: 2200 },
            { mode: "tube", detail: "Central line from Holborn", minutes: 10 },
          ],
          optional: [
            { title: "Duck into St Christopher's Place", where: "Off Oxford St, north side", notes: "A hidden pedestrian courtyard of cafés a few metres from the crowds. The instant antidote to Oxford Street." },
            { title: "Selfridges food hall", where: "Free to wander", notes: "Go for the spectacle rather than the shopping — it's the best-looking food hall in London and browsing costs nothing." },
            { title: "Soho instead", where: "10 min south", notes: "If Oxford Street grates within twenty minutes — which is normal — cut south into Soho's record shops and old pubs." },
          ],
          food: [
            { title: "Salt beef bagel or a bao", where: "Soho, 10 min south", notes: "Far better eating than anything on Oxford Street itself, which is chains all the way down." },
          ],
        },
        {
          time: "12:15",
          title: "Regent Street — the sweeping curve",
          notes: "Nash's great curve, built to separate the grand streets from the slums behind. The Quadrant bend near Piccadilly Circus is the bit worth photographing — a continuous arc of Portland stone.",
          location: { name: "Regent Street", query: "Regent Street, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Bond Street + short walk", minutes: 30 },
          ],
          optional: [
            { title: "Shoot the curve from the bend", where: "The Quadrant, near Piccadilly Circus", notes: "Stand on the inside of the arc so the buildings sweep away from you. Straight-on shots lose the whole point of the street." },
            { title: "Carnaby Street", where: "5 min east", notes: "The 1960s pedestrian strip behind Liberty, usually with something strung overhead. Small, quick, and more fun than Regent Street." },
            { title: "The Photographers' Gallery", where: "Ramillies Street, 5 min", notes: "Free galleries on the lower floors and an excellent bookshop. A calm hour in the middle of the West End." },
          ],
          food: [
            { title: "Coffee on Kingly Court", where: "Off Carnaby Street", notes: "A three-storey courtyard of small restaurants — a much better lunch decision than anything fronting Regent Street." },
          ],
        },
        {
          time: "12:45",
          title: "Liberty London — Tudor facade photos",
          notes: "A 1920s mock-Tudor department store built from the timbers of two Royal Navy warships. Free to walk into, and the galleried atrium around the central light well is the real photo, not the outside.",
          location: { name: "Liberty London", query: "Liberty London, Great Marlborough Street" },
          transport: [
            { mode: "walk", minutes: 4 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Liberty%27s%2C_Great_Marlborough_Street%2C_August_2021.jpg/960px-Liberty%27s%2C_Great_Marlborough_Street%2C_August_2021.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Liberty%27s,_Great_Marlborough_Street,_August_2021.jpg",
              caption: "The mock-Tudor frontage on Great Marlborough Street",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Liberty%2C_London_-_geograph.org.uk_-_3786720.jpg/960px-Liberty%2C_London_-_geograph.org.uk_-_3786720.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Liberty,_London_-_geograph.org.uk_-_3786720.jpg",
              caption: "Timber and leaded glass up close",
            },
          ],
          optional: [
            { title: "Look up the central atrium", where: "Inside, free", notes: "Three galleried floors of dark oak around an open well. Shoot straight up from the ground floor — it's the best interior in any London shop." },
            { title: "The haberdashery floor", where: "Upstairs, free", notes: "Walls of Liberty print fabric by the metre. A small offcut or a print scarf is the good souvenir here." },
            { title: "The clock on the corner", where: "Outside, on the hour", notes: "St George and the dragon go round when it strikes. Thirty seconds of fun if your timing lands." },
          ],
          food: [
            { title: "Cake in the Liberty café", where: "Upper floor", notes: "Not cheap, but you're sitting inside the building — which is the whole reason to be here." },
          ],
        },
        {
          time: "13:45",
          title: "Mercato Mayfair — street food in a restored church",
          notes: "Affordable food hall under a stunning painted ceiling. A deconsecrated Victorian church turned into three floors of independent food stalls — the cheapest way to eat in Mayfair by a wide margin.",
          location: { name: "Mercato Mayfair", query: "Mercato Mayfair, North Audley Street, London" },
          transport: [
            { mode: "walk", minutes: 15, steps: 1700 },
          ],
          optional: [
            { title: "Go up to the gallery level", where: "Inside, free", notes: "Eat upstairs so you're level with the arches and the painted ceiling rather than under them." },
            { title: "The crypt bar", where: "Downstairs", notes: "Vaulted brick cellars beneath the nave. Worth walking down to see even if you don't drink." },
            { title: "Mount Street afterwards", where: "8 min south", notes: "Red-brick Mayfair at its prettiest, and free to walk. The contrast with the food hall is the fun of it." },
          ],
          food: [
            { title: "Whatever the queue is longest for", where: "Ground floor stalls", notes: "Stalls rotate, so trust the crowd rather than a fixed recommendation. Most mains land well under Mayfair prices." },
            { title: "Gelato or cannoli", where: "Upper level", notes: "There's usually an Italian dessert counter — the right way to finish, eaten looking at the ceiling." },
          ],
        },
      ],
    },

    "2026-10-08": { items: [] },

    "2026-10-09": {
      label: "King's Cross magic ⚡",
      items: [
        {
          time: "10:00",
          title: "Platform 9¾ — trolley photo",
          notes: "Inside King's Cross station; queue is shortest before ~11 AM. The shop is next to it. Staff provide the scarf and will throw it mid-air for you, and they take the photo — free, though they'll offer to sell you their version.",
          location: { name: "Platform 9¾", query: "Platform 9 3/4, King's Cross Station, London" },
          transport: [
            { mode: "tube", detail: "Jubilee → H&C/District from West Ham", minutes: 35 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Platform_9_3-4_%28King%27s_Cross_station%2C_London%2C_2014%29.jpg/960px-Platform_9_3-4_%28King%27s_Cross_station%2C_London%2C_2014%29.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Platform_9_3-4_(King%27s_Cross_station,_London,_2014).jpg",
              caption: "The trolley in the wall — house scarf supplied",
            },
          ],
          optional: [
            { title: "Bring your own house scarf", where: "If you have one", notes: "They lend scarves, but the queue moves faster and the photo looks better if you arrive with your own. Your own phone shots are free either way." },
            { title: "The King's Cross roof", where: "Western concourse", notes: "The white lattice canopy fanning out overhead is a genuinely great piece of architecture — shoot up from the middle of the concourse." },
            { title: "St Pancras next door", where: "2 min", notes: "The red-gothic building everyone mistakes for King's Cross in the films. Go and see the actual one used on screen." },
          ],
          food: [
            { title: "Breakfast before the queue", where: "St Pancras arcade", notes: "Get there before 10, eat next door, then join the trolley queue while it's still short." },
          ],
        },
        {
          time: "12:00",
          title: "Granary Square — illuminated steps",
          notes: "A canal-side square with 1,000 choreographed fountains and wide stone steps down to the water. Redeveloped goods yards that are now genuinely one of the nicest public spaces in London.",
          location: { name: "Granary Square", query: "Granary Square, King's Cross, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
          optional: [
            { title: "Coal Drops Yard", where: "2 min", notes: "Victorian coal warehouses with a swooping new roof joining them. The architecture is free and better than the shopping." },
            { title: "Gasholder Park", where: "5 min along the canal", notes: "A circular lawn inside a restored Victorian gasholder frame. Strange, beautiful, and almost always quiet." },
            { title: "Word on the Water", where: "Regent's Canal towpath", notes: "A secondhand bookshop on a 1920s Dutch barge, often with live jazz on the roof. The most charming thing in the area." },
          ],
          food: [
            { title: "Sit on the steps with something", where: "Granary Square", notes: "The steps are made for it — grab food from Coal Drops Yard and eat facing the water." },
          ],
        },
        {
          time: "13:00",
          title: "Dishoom King's Cross — the viral black daal",
          notes: "Walk-ins fine at lunch; the daal is the order. Bombay-café styling in an old railway building, and the black daal is cooked for twenty-four hours — it's the dish the whole chain is built on.",
          location: { name: "Dishoom King's Cross", query: "Dishoom King's Cross, Stable Street, London" },
          transport: [
            { mode: "walk", minutes: 3 },
          ],
          booking: {
            level: "recommended",
            notes: "They don't take bookings for small groups at peak times — but lunch on a weekday is usually a short wait. Go before 12:30 or after 2 to walk straight in.",
            via: "No booking needed at lunch. Not a Klook item — just turn up.",
          },
          optional: [
            { title: "Ask for the Permit Room downstairs", where: "Lower floor", notes: "The basement bar is styled as a 1970s Bombay permit room and is where they'll seat you if there's a wait upstairs. Nicer room, honestly." },
            { title: "Look at the building itself", where: "Stable Street", notes: "It's a converted Victorian transit shed — the ironwork and brick are original, and the restoration is worth a minute before you go in." },
          ],
          food: [
            { title: "The black daal", where: "Non-negotiable", notes: "Twenty-four hours over a low flame, dark and buttery. If you order one thing here, this is it." },
            { title: "Bacon naan roll", where: "Served till mid-afternoon", notes: "Their most famous breakfast item, and often still available at lunch. Bacon, chilli jam and cream cheese in fresh naan." },
            { title: "Chai and kulfi", where: "To finish", notes: "The house chai is properly spiced, and the pistachio kulfi is the right size after the daal." },
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
          notes: "Free from outside, and the gates and the Victoria Memorial are the whole visit unless you've booked the State Rooms. Changing of the Guard is usually late morning on set days — check the schedule the night before rather than assuming.",
          location: { name: "Buckingham Palace", query: "Buckingham Palace, London" },
          transport: [
            { mode: "tube", detail: "Jubilee to Green Park + walk through the park", minutes: 30 },
          ],
          booking: {
            level: "recommended",
            notes: "Only if you want the State Rooms inside — they open to visitors in summer and selected dates, so check whether October is even possible before planning around it. The exterior needs nothing.",
            via: "Royal Collection Trust direct (rct.uk). Klook listings for palace tickets are usually resales at a markup for something with fixed official pricing.",
          },
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Victoria_Memorial_and_Buckingham_Palace.jpg/960px-Victoria_Memorial_and_Buckingham_Palace.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Victoria_Memorial_and_Buckingham_Palace.jpg",
              caption: "The frontage from the memorial — the standard shot",
            },
          ],
          optional: [
            { title: "Climb the Victoria Memorial steps", where: "In front of the palace, free", notes: "A few metres of height puts the whole facade in frame without other people's heads. Everyone stands at the railings instead." },
            { title: "Walk down the Mall", where: "East from the palace", notes: "The processional avenue under the plane trees, red tarmac and all, ending at Admiralty Arch. Better than the palace itself." },
            { title: "Green Park at the side", where: "North of the palace", notes: "Deckchairs and old trees, and the quiet way to arrive rather than fighting the coach crowd at the gates." },
          ],
          food: [
            { title: "Coffee cart in Green Park", where: "On the walk in", notes: "Nothing near the palace itself is good value. The park carts are fine and you drink it under the trees." },
          ],
        },
        {
          time: "11:30",
          title: "St James's Park — find the pelicans",
          notes: "They're usually near Duck Island at the east end of the lake. There have been pelicans here since a Russian ambassador gave some to Charles II in 1664, and they're fed around 2:30 PM daily.",
          location: { name: "St James's Park", query: "St James's Park, London" },
          transport: [
            { mode: "walk", minutes: 9, steps: 1000 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pelicans_in_St_James%27s_Park%2C_London.jpg/960px-Pelicans_in_St_James%27s_Park%2C_London.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Pelicans_in_St_James%27s_Park,_London.jpg",
              caption: "The pelicans — near Duck Island at the east end",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pelican_-_St._James%27s_Park_-_London%2C_UK_-_DSC06757.jpg/960px-Pelican_-_St._James%27s_Park_-_London%2C_UK_-_DSC06757.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Pelican_-_St._James%27s_Park_-_London,_UK_-_DSC06757.jpg",
              caption: "Close up — they're entirely unbothered by people",
            },
          ],
          optional: [
            { title: "The Blue Bridge view", where: "Middle of the lake", notes: "Looking east you get Horse Guards and the London Eye stacked behind the water; west gives you the palace. The single best free view in central London." },
            { title: "Stay for the 2:30 feeding", where: "Duck Island, east end", notes: "If your timing allows. It's the one moment the pelicans actually do something, and a keeper usually talks about them." },
            { title: "Horse Guards Parade", where: "East exit", notes: "The huge gravel parade ground where Trooping the Colour happens. Empty most days, and it connects you straight to Whitehall." },
          ],
          food: [
            { title: "Inn the Park café", where: "Middle of the park", notes: "A turf-roofed lakeside café — pricier than a sandwich shop but the terrace over the water earns it." },
          ],
        },
        {
          time: "13:00",
          title: "Fortnum & Mason — £30 biscuit-tin souvenirs",
          notes: "The ultimate budget-friendly high-end souvenir run. Three hundred years old, eau-de-nil green everywhere, and free to wander — the tins and tea caddies are the affordable way to take the place home.",
          location: { name: "Fortnum & Mason", query: "Fortnum and Mason, Piccadilly, London" },
          transport: [
            { mode: "walk", minutes: 11, steps: 1200 },
          ],
          optional: [
            { title: "The spiral staircase", where: "Centre of the store", notes: "A sweeping stair around an open well with a glass dome above. Shoot up or down it — the best photo in the building and nobody minds." },
            { title: "The clock on the hour", where: "Outside, Piccadilly", notes: "Mr Fortnum and Mr Mason emerge and bow to each other. Four minutes past the hour is too late — be there on the hour." },
            { title: "Burlington Arcade", where: "5 min west", notes: "An 1819 covered shopping arcade patrolled by beadles in top hats. Free, gorgeous, and takes ten minutes." },
          ],
          food: [
            { title: "Biscuit tins as gifts", where: "Ground floor", notes: "The reliable souvenir — good-looking tins at sane prices, and they survive a long-haul flight better than anything fragile." },
            { title: "Tea from the caddy wall", where: "Ground floor", notes: "Loose-leaf in a decorative caddy is the classic. Royal Blend is the house one people actually buy." },
            { title: "Ice cream at the parlour", where: "Lower ground", notes: "If you want to sit down here without the full afternoon-tea price, this is the way to do it." },
          ],
        },
      ],
    },

    "2026-10-11": {
      label: "Day trip — Brighton 🎡",
      note: "Sunday day trip, and the easiest of the three: an hour from Victoria and everything is within walking distance of the station. Deliberately placed on the last free weekend — it's a low-effort seaside day rather than another early coach start.",
      items: [
        {
          time: "09:30",
          title: "Victoria → Brighton",
          notes: "Roughly an hour, with fast trains several times an hour. Sunday engineering works are the one thing that bites on this line, so check before you leave.",
          location: { name: "London Victoria", query: "London Victoria Station" },
          booking: {
            level: "recommended",
            notes: "Advance fares are cheaper, but this route runs often enough that a walk-up off-peak return is fine if you'd rather keep the day flexible. An off-peak day return is usually the simplest ticket.",
            via: "Direct with Southern or Thameslink, not Klook — UK rail is cheapest at source.",
          },
          transport: [
            { mode: "tube", detail: "DLR to Canning Town, Jubilee to Green Park, Victoria line one stop", minutes: 50 },
          ],
        },
        {
          time: "11:00",
          title: "Royal Pavilion",
          notes: "A seaside palace built for a prince who wanted an Indian-looking exterior and a Chinese-looking interior, and got both. Utterly mad and completely unlike anything else in Britain. Five minutes' walk from the station end of town.",
          location: { name: "Royal Pavilion, Brighton", query: "Royal Pavilion, 4/5 Pavilion Buildings, Brighton BN1 1EE" },
          booking: {
            level: "recommended",
            notes: "Ticketed inside, but rarely sells out — walk-up is usually fine on a Sunday. The gardens around it are free and open, so you can see the exterior without paying.",
            via: "Klook sometimes carries Brighton attractions; brightonmuseums.org.uk is the reliable source and often cheaper.",
          },
          transport: [
            { mode: "walk", detail: "From Brighton station, downhill", minutes: 12, steps: 1300 },
          ],
          optional: [
            { title: "The Banqueting Room ceiling", where: "Inside", notes: "A one-tonne chandelier hanging from the claws of a silvered dragon in a painted palm tree. The single most absurd room in the country." },
            { title: "Circle the exterior for free", where: "Pavilion Gardens", notes: "If you skip the inside, the domes and minarets from the lawn are most of the value and cost nothing." },
            { title: "Brighton Museum next door", where: "Same gardens", notes: "In the Pavilion's old stables, and included with some Pavilion tickets. Good on Brighton's own social history." },
          ],
          food: [
            { title: "Brunch in the North Laine", where: "5 min north", notes: "Brighton does independent cafés better than almost anywhere — the North Laine streets are wall-to-wall with them." },
          ],
        },
        {
          time: "13:00",
          title: "The Lanes & North Laine",
          notes: "Two different places despite the names: The Lanes are the narrow medieval alleys of jewellers and pubs; North Laine is the wider, scruffier grid of record shops and vintage. Do both — they're adjacent and both free.",
          location: { name: "The Lanes, Brighton", query: "The Lanes, Brighton BN1 1HB" },
          transport: [
            { mode: "walk", minutes: 5, steps: 550 },
          ],
          optional: [
            { title: "Get deliberately lost in The Lanes", where: "Between the Pavilion and the sea", notes: "The alleys are barely shoulder-width in places and loop back on themselves. No map needed — you cannot get far wrong." },
            { title: "Record and vintage shops", where: "North Laine", notes: "Kensington Gardens and Gardner Street are the concentration. The best souvenir hunting of the whole trip." },
            { title: "Upside-Down House or the street art", where: "Around North Laine", notes: "Brighton is covered in murals, including a famous Banksy nearby. Free, and the walls change constantly." },
          ],
          food: [
            { title: "Fish and chips on the seafront", where: "Between the Lanes and the pier", notes: "The proper seaside version, eaten outside. Brighton's is genuinely good — get it near the beach rather than on the pier itself." },
            { title: "Doughnuts on the pier", where: "Palace Pier", notes: "Hot sugared ring doughnuts made on the pier. A total cliché and completely worth it." },
            { title: "Vegetarian anything", where: "North Laine", notes: "Brighton is Britain's most vegetarian city by some distance, and even the ordinary cafés do it properly." },
          ],
        },
        {
          time: "15:00",
          title: "Brighton Palace Pier & the beach",
          notes: "A Victorian pleasure pier with an arcade and fairground rides at the far end, running out over a pebble beach. Free to walk on. Bring something to sit on — the beach is stones, not sand, and October wind off the Channel is real.",
          location: { name: "Brighton Palace Pier", query: "Brighton Palace Pier, Madeira Drive, Brighton BN2 1TW" },
          transport: [
            { mode: "walk", minutes: 8, steps: 900 },
          ],
          photos: [
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Brighton_seafront_and_Palace_Pier_-_geograph.org.uk_-_5847064.jpg/960px-Brighton_seafront_and_Palace_Pier_-_geograph.org.uk_-_5847064.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Brighton_seafront_and_Palace_Pier_-_geograph.org.uk_-_5847064.jpg",
              caption: "The pier from the seafront — the classic frame",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Brighton_Seafront_%5E_Pier_-_geograph.org.uk_-_3599895.jpg/960px-Brighton_Seafront_%5E_Pier_-_geograph.org.uk_-_3599895.jpg",
              href: "https://commons.wikimedia.org/wiki/File:Brighton_Seafront_%5E_Pier_-_geograph.org.uk_-_3599895.jpg",
              caption: "Along the beach — pebbles, not sand",
            },
          ],
          optional: [
            { title: "Walk to the very end of the pier", where: "Free", notes: "Past the arcade to the rides at the far end, where you're properly out over the water and the whole city is behind you." },
            { title: "The West Pier ruins", where: "10 min west along the beach", notes: "The blackened skeleton of the burnt-out Victorian pier standing in the sea. Far more photogenic than the working one, especially at sunset." },
            { title: "Sunset from the beach", where: "Facing south-west", notes: "Sunset is around 6:20 PM in mid-October, and Brighton faces the right way for it. Worth staying for before the train back." },
          ],
          food: [
            { title: "A 99 Flake or candyfloss", where: "Seafront kiosks", notes: "The full English seaside ritual. Eat it walking along the front." },
            { title: "Seafood from a beach shack", where: "Under the arches", notes: "Cockles, whelks and jellied eels if you're brave; crab sandwiches if you're not." },
          ],
        },
        {
          time: "18:45",
          title: "Brighton → Victoria",
          notes: "Trains run late into the evening, so there's no rush — stay for the sunset if the sky is doing anything. About an hour back, then 50 minutes across London.",
          location: { name: "Brighton station", query: "Brighton Railway Station" },
          transport: [
            { mode: "walk", detail: "Uphill from the seafront", minutes: 15, steps: 1700 },
          ],
        },
      ],
    },

    "2026-10-12": { items: [] },

    "2026-10-13": { items: [] },

    "2026-10-14": {
      label: "Departure day — SQ317 to Singapore ✈️",
      items: [
        {
          time: "07:00",
          title: "Check out — Travelodge London Docklands Central",
          notes: "Early start — pack the night before. Breakfast at the airport once bags are dropped.",
          location: { name: "Travelodge London Docklands Central", query: "Travelodge London Docklands Central, 1 Oregano Drive, London E14 2AE" },
        },
        {
          time: "08:20",
          title: "Heathrow Terminal 2 — bag drop",
          notes: "Aim for T2 about 3 hours before departure. Long-haul on a weekday morning means the bag-drop queue is real — earlier is better than clever.",
          location: { name: "Heathrow Terminal 2", query: "Heathrow Terminal 2, London" },
          optional: [
            { title: "Claim VAT back before security", where: "T2 landside", notes: "If you bought anything substantial — Fortnum's, Liberty — check whether you're eligible for a refund. It has to be done before you go through, not after." },
            { title: "Fill water bottles after security", where: "Airside", notes: "Free fountains throughout, and you're about to be on a plane for thirteen hours." },
            { title: "Last-minute souvenirs are cheaper landside", where: "Before security", notes: "Airside prices are airside prices. If something's still on the list, buy it in town or in the main terminal." },
          ],
          food: [
            { title: "Eat the Too Good To Go pastries", where: "Whatever you collected last night", notes: "The reason you set that up on 13 October — a far better breakfast than anything in the terminal, for about £3." },
            { title: "Proper breakfast airside", where: "T2 restaurants", notes: "If you'd rather sit down. Do it after bag drop and security, once the stressful part is behind you." },
          ],
          transport: [
            { mode: "train", detail: "DLR three stops from East India to Custom House, then Elizabeth line (direct or change at Paddington)", minutes: 75 },
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
