/* ============================================================================
   nasa.js - Live NASA Data Feeds for Junior Astronaut Mission Trainer
   ISS Tracking, DONKI Space Weather, NeoWs Asteroids, Mars Photos & APOD
   Plain JS (ES module-free). Include with: <script src="js/nasa.js"></script>
   Get a free key at https://api.nasa.gov (DEMO_KEY works with rate limits).
   ============================================================================ */

const NasaLive = (() => {
  let KEY = "DEMO_KEY";
  const NASA = "https://api.nasa.gov";
  const today = () => new Date().toISOString().slice(0, 10);
  const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

  async function getJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(url + " -> " + r.status);
    return r.json();
  }

  // 1) ISS live position (no key needed). Call every ~5s.
  async function getISS() {
    const d = await getJSON("https://api.wheretheiss.at/v1/satellites/25544");
    return {
      lat: d.latitude,
      lon: d.longitude,
      altitudeKm: d.altitude,
      speedKmh: d.velocity,
      timestamp: new Date().toLocaleTimeString()
    };
  }

  // 2) Space weather: solar flares in the last 3 days (DONKI).
  //    Returns { active: bool, strongest: "X1.2" | null, raw: Array }
  async function getSolarStorm() {
    const url = `${NASA}/DONKI/FLR?startDate=${daysAgo(3)}&endDate=${today()}&api_key=${KEY}`;
    const flares = await getJSON(url);
    if (!flares || !flares.length) return { active: false, strongest: null, count: 0 };
    const order = { A: 0, B: 1, C: 2, M: 3, X: 4 };
    flares.sort((a, b) => (order[(b.classType || "A")[0]] || 0) - (order[(a.classType || "A")[0]] || 0));
    const strongest = flares[0].classType;
    return {
      active: "MX".includes(strongest[0]),
      strongest,
      count: flares.length,
      peakTime: flares[0].peakTime || null
    };
  }

  // 3) Asteroids passing Earth today (NeoWs).
  async function getAsteroids() {
    const url = `${NASA}/neo/rest/v1/feed?start_date=${today()}&end_date=${today()}&api_key=${KEY}`;
    const d = await getJSON(url);
    const list = (d.near_earth_objects && d.near_earth_objects[today()]) || [];
    return list
      .map((a) => ({
        name: a.name,
        hazardous: a.is_potentially_hazardous_asteroid,
        missKm: Math.round(+a.close_approach_data[0].miss_distance.kilometers),
        diameterM: Math.round(a.estimated_diameter.meters.estimated_diameter_max),
        velocityKmh: Math.round(+a.close_approach_data[0].relative_velocity.kilometers_per_hour)
      }))
      .sort((a, b) => a.missKm - b.missKm);
  }

  // 4) Mars photos. Falls back to NASA Image Library if the rover API is down.
  async function getMarsPhotos(limit = 6) {
    try {
      const d = await getJSON(`${NASA}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${KEY}`);
      if (d.latest_photos && d.latest_photos.length) {
        return d.latest_photos.slice(0, limit).map((p) => ({
          url: p.img_src,
          caption: `${p.camera.full_name}, sol ${p.sol}`,
          date: p.earth_date
        }));
      }
      throw new Error("No rover photos in response");
    } catch (e) {
      const d = await getJSON("https://images-api.nasa.gov/search?q=mars%20rover&media_type=image");
      return (d.collection.items || []).slice(0, limit).map((i) => ({
        url: (i.links && i.links[0] ? i.links[0].href : ""),
        caption: (i.data && i.data[0] ? i.data[0].title : "Curiosity Mars Rover"),
        date: today()
      }));
    }
  }

  // 5) Astronomy Picture of the Day.
  async function getAPOD() {
    const d = await getJSON(`${NASA}/planetary/apod?api_key=${KEY}`);
    return {
      title: d.title,
      url: d.url,
      explanation: d.explanation,
      isImage: d.media_type === "image",
      date: d.date
    };
  }

  /* Wire everything to the game.
     hooks = {
       apiKey, onISS(pos), onSolarStorm(info), onAsteroids(list), onMarsPhotos(list), onAPOD(apod)
     }
  */
  function init(hooks = {}) {
    if (hooks.apiKey) KEY = hooks.apiKey;
    const safe = (fn, cb, ms) => {
      const run = () => fn().then((r) => cb && cb(r)).catch((e) => console.warn("NASA Live Feed:", e.message));
      run();
      if (ms) setInterval(run, ms);
    };
    safe(getISS, hooks.onISS, 5000);
    safe(getSolarStorm, hooks.onSolarStorm, 30 * 60 * 1000);
    safe(getAsteroids, hooks.onAsteroids, 6 * 60 * 60 * 1000);
    safe(() => getMarsPhotos(6), hooks.onMarsPhotos);
    safe(getAPOD, hooks.onAPOD);
  }

  return { init, getISS, getSolarStorm, getAsteroids, getMarsPhotos, getAPOD };
})();

if (typeof window !== "undefined") {
  window.NasaLive = NasaLive;
}

