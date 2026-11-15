// ============================================================================
// mission.js — Earth <-> Moon/Mars Real-Time Mission Controller
// Real-time speed of light communications delay, solar power, radiation shielding,
// life support telemetry, and Deep Space Network uplink.
// ============================================================================

const C_KM_S = 299792.458;      // speed of light in km/s
const AU_KM = 149597870.7;
const MARS_SYNODIC_DAYS = 779.94;

export const PHASES = ['PRELAUNCH', 'TRANSIT', 'ORBIT', 'DESCENT', 'LANDED'];

export const DESTINATIONS = {
  moon: {
    name: 'Moon',
    transitDays: 3,
    descentSec: 12 * 60,
    distanceKm: () => 384400,
    surfaceTimeScale: 60,              // 1 real sec = 1 sim minute on surface
    radiationBase: 1.4,                // mSv/day (rough)
    resources: { power: 100, oxygen: 100, water: 100, food: 100, shielding: 40 },
  },
  mars: {
    name: 'Mars',
    transitDays: 210,
    descentSec: 7 * 60,
    // Circular-orbit approximation of Earth–Mars distance
    distanceKm: (simDays, phase0 = 0.8) => {
      const r1 = AU_KM, r2 = 1.524 * AU_KM;
      const th = phase0 + (2 * Math.PI * (simDays || 0)) / MARS_SYNODIC_DAYS;
      return Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(th));
    },
    surfaceTimeScale: 30,
    radiationBase: 0.7,
    resources: { power: 100, oxygen: 100, water: 100, food: 100, shielding: 30 },
  },
};

export class Mission extends EventTarget {
  /**
   * @param {'moon'|'mars'} target
   * @param {{crew?:number, transitTimeScale?:number}} opts
   */
  constructor(target = 'moon', opts = {}) {
    super();
    this.targetId = target;
    this.dest = DESTINATIONS[target] || DESTINATIONS.moon;
    this.crew = opts.crew ?? 4;
    this.transitTimeScale = opts.transitTimeScale ?? 86400 / 4; // 1 real sec = 6 sim hours
    this.simSeconds = 0;
    this.timeScale = 1;
    this.phase = 'PRELAUNCH';
    this.phaseElapsed = 0;           // sim seconds in current phase
    this.res = { ...this.dest.resources };
    this.controls = { solarPanels: 1, rationing: 1, shielding: 0, heaters: 1 };
    this.toOutpost = [];             // Earth -> outpost (delayed commands)
    this.toEarth = [];               // outpost -> Earth (delayed telemetry)
    this.earthView = { ...this.res, t: 0 };  // what Earth sees (stale by light-time)
    this.events = [];
    this.alive = true;
    this._last = null;
    this._raf = null;
    this._flare = false;
    this._flareEnd = 0;
    this._dust = false;
    this._dustEnd = 0;
    this.radiation = this.dest.radiationBase;
  }

  // ---- geometry / comms ----
  get distanceKm() { return this.dest.distanceKm(this.simSeconds / 86400); }
  get lightDelaySec() { return this.distanceKm / C_KM_S; }

  // ---- lifecycle ----
  launch() {
    if (this.phase !== 'PRELAUNCH') return;
    this._setPhase('TRANSIT');
    this.timeScale = this.transitTimeScale;
    this._log('Launch! Crew en route to ' + this.dest.name);
  }

  start() {
    this._last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - this._last) / 1000, 0.25);
      this._last = now;
      this.tick(dt);
      if (this.alive) this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }
  
  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  tick(realDt) {
    if (this.phase === 'PRELAUNCH') return this._emit();
    const dt = realDt * this.timeScale;     // sim seconds
    this.simSeconds += dt;
    this.phaseElapsed += dt;

    this._advancePhase();
    this._deliverMessages();
    if (this.phase === 'LANDED') this._simulateOutpost(dt);
    this._emit();
  }

  _advancePhase() {
    const d = this.dest;
    if (this.phase === 'TRANSIT' && this.phaseElapsed >= d.transitDays * 86400) {
      this._setPhase('ORBIT');
      this.timeScale = 60;
      this._log('Entered ' + d.name + ' orbit. Preparing descent.');
    } else if (this.phase === 'ORBIT' && this.phaseElapsed >= 600) {
      this._setPhase('DESCENT');
      this.timeScale = 1;
      this._log('Descent burn started.');
    } else if (this.phase === 'DESCENT' && this.phaseElapsed >= d.descentSec) {
      this._setPhase('LANDED');
      this.timeScale = d.surfaceTimeScale;
      this._log('TOUCHDOWN on ' + d.name + '! Outpost mission is LIVE.');
      this.dispatchEvent(new CustomEvent('landed', { detail: this.snapshot() }));
    }
  }

  // ---- Earth -> outpost commands (arrive after light delay) ----
  sendCommand(name, value) {
    const delay = this.lightDelaySec;
    const packet = { name, value, arriveAt: this.simSeconds + delay };
    this.toOutpost.push(packet);
    this._log(`Command "${name}=${value}" sent from Earth (arrives in ${fmtDelay(delay)})`);
    return packet;
  }

  _deliverMessages() {
    for (const m of this.toOutpost.filter(m => m.arriveAt <= this.simSeconds)) {
      if (m.name in this.controls) this.controls[m.name] = m.value;
      this._log(`Outpost received: ${m.name}=${m.value}`);
    }
    this.toOutpost = this.toOutpost.filter(m => m.arriveAt > this.simSeconds);

    for (const t of this.toEarth.filter(t => t.arriveAt <= this.simSeconds)) {
      this.earthView = t.data;       // Earth only sees the delayed packet
    }
    this.toEarth = this.toEarth.filter(t => t.arriveAt > this.simSeconds);
  }

  // ---- real-time outpost simulation ----
  _simulateOutpost(dt) {
    const days = dt / 86400, r = this.res, c = this.controls;
    const ration = c.rationing;

    // power: solar gen minus load (heaters, life support)
    const gen = 30 * c.solarPanels * this._sunFactor();
    const load = 8 + 6 * c.heaters + this.crew * 2.5;
    r.power = clamp(r.power + (gen - load) * days * 2, 0, 100);

    const lowPower = r.power < 10 ? 0.5 : 1;       // life support degrades
    r.oxygen = clamp(r.oxygen - (this.crew * 0.9 * days * 1.2) * ration + 1.0 * days * lowPower, 0, 100);
    r.water  = clamp(r.water  - (this.crew * 0.6 * days) * ration + 0.5 * days * lowPower, 0, 100);
    r.food   = clamp(r.food   - (this.crew * 0.8 * days) * ration, 0, 100);

    // radiation: higher with low shielding; flares add spikes
    r.shielding = clamp(r.shielding + c.shielding * 2 * days, 0, 100);
    this.radiation = this.dest.radiationBase * (1.6 - r.shielding / 100) * (this._flare ? 8 : 1);

    this._randomEvents(dt);

    // telemetry packet to Earth (delayed by light-time)
    this.toEarth.push({
      arriveAt: this.simSeconds + this.lightDelaySec,
      data: { ...r, radiation: this.radiation, t: this.simSeconds },
    });

    if (r.oxygen <= 0 || r.water <= 0 || r.food <= 0) this._fail('Life support depleted.');
  }

  _sunFactor() {
    const cycle = this.targetId === 'moon' ? 29.5 * 86400 : 88642;   // lunar day / sol
    const x = (this.simSeconds % cycle) / cycle;
    const base = Math.max(0, Math.sin(x * 2 * Math.PI));            // night = 0
    return this._dust ? base * 0.25 : base;
  }

  _randomEvents(dt) {
    const p = dt / 86400;
    if (!this._flare && Math.random() < 0.05 * p) {
      this._flare = true;
      this._flareEnd = this.simSeconds + 6 * 3600;
      this._log('ALERT: Solar flare! Raise shielding.');
      this._alert('solar_flare');
    }
    if (this._flare && this.simSeconds > this._flareEnd) {
      this._flare = false;
      this._log('Solar flare over.');
    }

    if (this.targetId === 'mars') {
      if (!this._dust && Math.random() < 0.08 * p) {
        this._dust = true;
        this._dustEnd = this.simSeconds + 5 * 86400;
        this._log('ALERT: Dust storm, solar output reduced.');
        this._alert('dust_storm');
      }
      if (this._dust && this.simSeconds > this._dustEnd) {
        this._dust = false;
        this._log('Dust storm cleared.');
      }
    }
  }

  // ---- helpers ----
  snapshot() {
    return {
      target: this.dest.name,
      phase: this.phase,
      simDays: this.simSeconds / 86400,
      distanceKm: this.distanceKm,
      lightDelaySec: this.lightDelaySec,
      outpost: { ...this.res, radiation: this.radiation ?? 0 },   // ground truth
      earthView: this.earthView,                                  // delayed view
      controls: { ...this.controls },
      pendingCommands: this.toOutpost.length,
      alive: this.alive,
    };
  }

  _emit() { this.dispatchEvent(new CustomEvent('update', { detail: this.snapshot() })); }
  _setPhase(p) { this.phase = p; this.phaseElapsed = 0; this.dispatchEvent(new CustomEvent('phase', { detail: p })); }
  _log(msg) { const e = { t: this.simSeconds, msg }; this.events.push(e); this.dispatchEvent(new CustomEvent('log', { detail: e })); }
  _alert(type) { this.dispatchEvent(new CustomEvent('alert', { detail: type })); }
  _fail(why) { this.alive = false; this._log('MISSION FAILED: ' + why); this.dispatchEvent(new CustomEvent('failed', { detail: why })); }
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const fmtDelay = (s) => s < 60 ? `${s.toFixed(1)} s` : `${(s / 60).toFixed(1)} min`;

if (typeof window !== "undefined") {
  window.Mission = Mission;
  window.fmtDelay = fmtDelay;
  window.DESTINATIONS = DESTINATIONS;
  window.PHASES = PHASES;
}

