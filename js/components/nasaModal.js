// ============================================================================
// NASA LIVE FEEDS MODAL COMPONENT
// Real-Time Data from NASA APIs: ISS, DONKI Space Weather, NeoWs Asteroids,
// Curiosity Mars Rover Camera & Astronomy Picture of the Day (APOD)
// ============================================================================

import { sound } from "../audio.js";

export class NasaModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.activeTab = "iss"; // 'iss', 'solar', 'asteroids', 'mars', 'apod'
    this.data = {
      iss: null,
      solar: null,
      asteroids: [],
      mars: [],
      apod: null
    };
  }

  updateData(type, payload) {
    this.data[type] = payload;
    if (this.isOpen) {
      this.render();
    }
  }

  open(tab = "iss") {
    this.isOpen = true;
    this.activeTab = tab;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const d = this.data;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large nasa-live-modal">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🛰️</span>
              <div>
                <h2>NASA Deep Space Network • Live Science Feeds</h2>
                <div class="modal-subtitle">Real-Time Telemetry from api.nasa.gov & wheretheiss.at</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-nasa-modal" aria-label="Close NASA Feeds">✕</button>
          </div>

          <!-- Tab Bar -->
          <div class="nasa-tabs-bar">
            <button class="nasa-tab-btn ${this.activeTab === 'iss' ? 'active' : ''}" data-tab="iss">
              <span>🛰️ ISS Live Tracker</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'solar' ? 'active' : ''}" data-tab="solar">
              <span>☀️ Space Weather</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'asteroids' ? 'active' : ''}" data-tab="asteroids">
              <span>☄️ Asteroid Radar</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'mars' ? 'active' : ''}" data-tab="mars">
              <span>🔴 Mars Rover Cam</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'apod' ? 'active' : ''}" data-tab="apod">
              <span>🌌 Space Photo (APOD)</span>
            </button>
          </div>

          <div class="modal-body nasa-tab-body">
            ${this.renderActiveTabContent()}
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              Data Source: <strong style="color: var(--border-cyan);">NASA Open Data API</strong> • Free Student Access
            </div>
            <button class="btn-primary" id="btn-done-nasa">
              <span>Return to Flight Deck</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case "iss":
        return this.renderISSTab();
      case "solar":
        return this.renderSolarTab();
      case "asteroids":
        return this.renderAsteroidsTab();
      case "mars":
        return this.renderMarsTab();
      case "apod":
        return this.renderAPODTab();
      default:
        return this.renderISSTab();
    }
  }

  renderISSTab() {
    const iss = this.data.iss;
    if (!iss) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🛰️</div>
          <p>Connecting to International Space Station orbital beacon...</p>
        </div>
      `;
    }

    const latHemi = iss.lat >= 0 ? "N" : "S";
    const lonHemi = iss.lon >= 0 ? "E" : "W";

    return `
      <div class="nasa-card-grid">
        <div class="nasa-telemetry-hero">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 0.82rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800;">
              INTERNATIONAL SPACE STATION (NORAD #25544)
            </span>
            <span class="nasa-live-pill">● LIVE ORBIT</span>
          </div>

          <div class="nasa-iss-readouts">
            <div class="iss-stat-cell">
              <span class="iss-label">CURRENT LATITUDE</span>
              <strong class="iss-val">${Math.abs(iss.lat).toFixed(4)}° ${latHemi}</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">CURRENT LONGITUDE</span>
              <strong class="iss-val">${Math.abs(iss.lon).toFixed(4)}° ${lonHemi}</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">ORBITAL ALTITUDE</span>
              <strong class="iss-val" style="color: var(--border-cyan);">${Math.round(iss.altitudeKm).toLocaleString()} km</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">GROUND SPEED</span>
              <strong class="iss-val" style="color: var(--text-highlight);">${Math.round(iss.speedKmh).toLocaleString()} km/h</strong>
            </div>
          </div>

          <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.4); border-radius: 8px; font-size: 0.82rem; line-height: 1.45; color: #cfd8dc;">
            <strong>NASA Flight Dynamics Note:</strong> The ISS orbits Earth approximately once every 92 minutes at 7.66 km/s, allowing crew members to witness 16 sunrises and sunsets every 24 Earth hours!
          </div>
        </div>
      </div>
    `;
  }

  renderSolarTab() {
    const s = this.data.solar;
    if (!s) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">☀️</div>
          <p>Querying NASA DONKI Space Weather Database (FLR)...</p>
        </div>
      `;
    }

    return `
      <div class="nasa-telemetry-hero">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 0.82rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800;">
            NASA DONKI • SPACE WEATHER & SOLAR ACTIVITY
          </span>
          <span class="nasa-live-pill ${s.active ? 'pill-alert' : 'pill-nominal'}">
            ${s.active ? '⚠ SOLAR ALERT' : '● NOMINAL'}
          </span>
        </div>

        <div class="nasa-iss-readouts">
          <div class="iss-stat-cell">
            <span class="iss-label">SOLAR STORM STATUS</span>
            <strong class="iss-val" style="color: ${s.active ? 'var(--accent-red)' : 'var(--text-highlight)'};">
              ${s.active ? 'ACTIVE SOLAR FLARE' : 'CALM / NOMINAL'}
            </strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">STRONGEST RECENT FLARE</span>
            <strong class="iss-val">${s.strongest ? `Class ${s.strongest}` : 'Class B / C (Minor)'}</strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">FLARES DETECTED (72H)</span>
            <strong class="iss-val" style="color: var(--border-cyan);">${s.count || 0} Recorded</strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">TELEMETRY IMPACT</span>
            <strong class="iss-val" style="color: ${s.active ? 'var(--accent-gold)' : 'var(--text-highlight)'};">
              ${s.active ? 'Power Regulation Alert' : 'Vitals Nominal'}
            </strong>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.4); border-radius: 8px; font-size: 0.82rem; line-height: 1.45; color: #cfd8dc;">
          <strong>Educational Context:</strong> Solar flares are classified by X-ray strength: A, B, and C are minor background emissions, while M and X flares can cause coronal mass ejections (CMEs) that interact with Earth's magnetosphere, producing auroras and impacting satellite electronics.
        </div>
      </div>
    `;
  }

  renderAsteroidsTab() {
    const list = this.data.asteroids || [];
    if (!list.length) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">☄️</div>
          <p>Querying NASA NeoWs Planetary Defense Asteroid Radar...</p>
        </div>
      `;
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #fff;">
            Near-Earth Objects Passing Earth Today (${list.length} Tracked by NASA)
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Source: NASA JPL SSD / NeoWs</span>
        </div>

        <div class="nasa-asteroid-grid">
          ${list.slice(0, 8).map(a => `
            <div class="asteroid-card ${a.hazardous ? 'hazardous' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #fff; font-size: 0.9rem;">☄️ ${a.name.replace(/[()]/g, '')}</strong>
                ${a.hazardous ? '<span class="badge-hazard">POTENTIALLY HAZARDOUS</span>' : '<span class="badge-safe">SAFE DISTANCE</span>'}
              </div>
              <div class="asteroid-metrics">
                <div>
                  <span class="ast-label">MISS DISTANCE</span>
                  <div class="ast-val">${a.missKm.toLocaleString()} km</div>
                </div>
                <div>
                  <span class="ast-label">MAX DIAMETER</span>
                  <div class="ast-val" style="color: var(--accent-gold);">${a.diameterM} meters</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderMarsTab() {
    const photos = this.data.mars || [];
    if (!photos.length) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🔴</div>
          <p>Downloading latest telemetry photos from Curiosity Rover on Mars...</p>
        </div>
      `;
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #fff;">
            NASA Curiosity Rover • Latest Extraterrestrial Surface Photos
          </span>
          <span style="font-size: 0.75rem; color: var(--accent-gold);">Transmitted via Mars Reconnaissance Orbiter</span>
        </div>

        <div class="nasa-mars-grid">
          ${photos.map(p => `
            <div class="mars-photo-card">
              <div class="mars-img-container">
                <img src="${p.url}" alt="${p.caption}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔴</text></svg>'">
              </div>
              <div class="mars-photo-caption">
                <strong>${p.caption}</strong>
                ${p.date ? `<span>Earth Date: ${p.date}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderAPODTab() {
    const apod = this.data.apod;
    if (!apod) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🌌</div>
          <p>Fetching NASA Astronomy Picture of the Day...</p>
        </div>
      `;
    }

    return `
      <div class="apod-container">
        <div class="apod-image-side">
          ${apod.isImage 
            ? `<img src="${apod.url}" alt="${apod.title}" class="apod-img" onerror="this.style.display='none'">` 
            : `<iframe src="${apod.url}" class="apod-frame" frameborder="0"></iframe>`}
        </div>
        <div class="apod-info-side">
          <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 800; text-transform: uppercase;">
            Astronomy Picture of the Day ${apod.date ? `• ${apod.date}` : ''}
          </div>
          <h3 style="color: #fff; font-size: 1.15rem; margin: 4px 0 10px 0;">${apod.title}</h3>
          <p class="apod-desc">${apod.explanation}</p>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-nasa-modal");
    const doneBtn = this.container.querySelector("#btn-done-nasa");

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    if (doneBtn) {
      doneBtn.addEventListener("click", () => this.close());
    }

    // Tab buttons
    this.container.querySelectorAll(".nasa-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = btn.getAttribute("data-tab");
        this.render();
      });
    });
  }
}

