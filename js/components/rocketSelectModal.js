// ============================================================================
// ROCKET SELECTION MODAL COMPONENT
// Select between 4 heavy exploration rockets, affecting Fuel, Cargo & Readiness
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { phaserEngine } from "../phaserEngine.js";

export class RocketSelectModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    phaserEngine.zoomOrbit();
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    phaserEngine.resetZoom();
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const currentRocketId = s.selectedRocket;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🚀</span>
              <div>
                <h2>Spacecraft Hangar & Propulsion Bay</h2>
                <div class="modal-subtitle">NASA Exploration Ground Systems • Vehicle Assembly Building</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-rocket-modal" aria-label="Close Hangar">✕</button>
          </div>

          <div class="modal-body">
            <p class="modal-intro">
              Select your primary exploration launch vehicle. Rocket mass, tank capacity, and cargo bay specs directly calibrate your <strong>Rocket Fuel</strong>, <strong>Cargo Capacity</strong>, and overall <strong>Mission Readiness</strong>.
            </p>

            <div class="rocket-grid">
              ${Object.values(GAME_CONFIG.ROCKETS).map(r => this.renderRocketCard(r, r.id === currentRocketId)).join("")}
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Current Spacecraft: <strong>${GAME_CONFIG.ROCKETS[currentRocketId]?.name || "SLS"}</strong></span>
              <span>Propellant Reserve: <strong>${s.telemetry.rocketFuel}%</strong></span>
              <span>Cargo Allocation: <strong>${s.telemetry.cargoCapacity}%</strong></span>
            </div>
            <button class="btn-primary" id="btn-confirm-rocket">
              <span>Lock Spacecraft Selection</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderRocketCard(rocket, isSelected) {
    return `
      <div class="rocket-card ${isSelected ? 'selected' : ''}" data-rocket-id="${rocket.id}">
        <div class="rocket-card-header">
          <span class="rocket-badge">${rocket.badge}</span>
          <div>
            <h3>${rocket.name}</h3>
            <span class="rocket-category">${rocket.category}</span>
          </div>
          ${isSelected ? '<span class="chip-active">ACTIVE VEHICLE</span>' : ''}
        </div>

        <div class="rocket-svg-preview">
          ${this.getRocketSvg(rocket.id)}
        </div>

        <div class="rocket-stats-grid">
          <div class="rocket-stat-item">
            <span class="stat-label">Propellant Cap</span>
            <span class="stat-val" style="color: var(--meter-fuel);">${rocket.fuelCapacity}%</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Cargo Bay</span>
            <span class="stat-val" style="color: var(--meter-oxygen);">${rocket.cargoCapacity}%</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Sea-Level Thrust</span>
            <span class="stat-val">${rocket.thrustKn}</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Max Payload</span>
            <span class="stat-val">${rocket.payloadTons}</span>
          </div>
        </div>

        <p class="rocket-desc">${rocket.description}</p>

        <button class="btn-select-rocket ${isSelected ? 'btn-selected' : 'btn-secondary'}" data-rocket-id="${rocket.id}">
          ${isSelected ? '✓ Selected Vehicle' : 'Select This Rocket'}
        </button>
      </div>
    `;
  }

  getRocketSvg(id) {
    if (id === "sls") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <rect x="42" y="15" width="16" height="95" fill="#f57c00" rx="3" stroke="#e65100" stroke-width="1.5"/>
          <polygon points="50,5 42,20 58,20" fill="#ffffff" stroke="#b0bec5"/>
          <rect x="44" y="22" width="12" height="10" fill="#0b3d91"/>
          <!-- Boosters -->
          <rect x="30" y="35" width="10" height="75" fill="#ffffff" rx="2" stroke="#cfd8dc"/>
          <polygon points="35,28 30,36 40,36" fill="#ffffff"/>
          <rect x="60" y="35" width="10" height="75" fill="#ffffff" rx="2" stroke="#cfd8dc"/>
          <polygon points="65,28 60,36 70,36" fill="#ffffff"/>
          <!-- Engines -->
          <polygon points="44,110 40,122 60,122 56,110" fill="#37474f"/>
          <!-- Flame -->
          <polygon points="46,122 50,140 54,122" fill="#00e5ff" opacity="0.8"/>
        </svg>
      `;
    } else if (id === "falcon_heavy") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Triple Core -->
          <rect x="44" y="20" width="12" height="90" fill="#ffffff" rx="2" stroke="#90a4ae"/>
          <rect x="30" y="35" width="12" height="75" fill="#f5f5f5" rx="2" stroke="#90a4ae"/>
          <rect x="58" y="35" width="12" height="75" fill="#f5f5f5" rx="2" stroke="#90a4ae"/>
          <polygon points="50,8 44,22 56,22" fill="#ffffff" stroke="#90a4ae"/>
          <!-- Grid Fins -->
          <rect x="28" y="40" width="4" height="6" fill="#37474f"/>
          <rect x="68" y="40" width="4" height="6" fill="#37474f"/>
          <!-- Engines -->
          <polygon points="32,110 30,120 42,120 40,110" fill="#37474f"/>
          <polygon points="46,110 44,120 56,120 54,110" fill="#37474f"/>
          <polygon points="60,110 58,120 70,120 68,110" fill="#37474f"/>
        </svg>
      `;
    } else if (id === "saturn_v") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Saturn V Classic Apollo -->
          <rect x="40" y="25" width="20" height="85" fill="#ffffff" stroke="#37474f" stroke-width="1.5"/>
          <!-- Black and White roll pattern -->
          <rect x="40" y="45" width="10" height="25" fill="#212121"/>
          <rect x="50" y="70" width="10" height="20" fill="#212121"/>
          <!-- Escape Tower -->
          <line x1="50" y1="2" x2="50" y2="15" stroke="#ff3d00" stroke-width="2"/>
          <polygon points="50,15 42,26 58,26" fill="#ffffff" stroke="#37474f"/>
          <!-- Fins -->
          <polygon points="40,95 28,112 40,110" fill="#ffffff" stroke="#37474f"/>
          <polygon points="60,95 72,112 60,110" fill="#ffffff" stroke="#37474f"/>
          <!-- F-1 Engines -->
          <polygon points="42,110 38,124 62,124 58,110" fill="#263238"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Starship Stainless Steel -->
          <path d="M50 8 C40 25 38 105 38 115 L62 115 C62 105 60 25 50 8 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5"/>
          <circle cx="50" cy="35" r="5" fill="#00e5ff" opacity="0.8"/>
          <!-- Heat Shield Half -->
          <path d="M50 8 C40 25 38 105 38 115 L50 115 Z" fill="#263238" opacity="0.35"/>
          <!-- Forward Flaps -->
          <polygon points="38,25 24,35 38,40" fill="#90a4ae"/>
          <polygon points="62,25 76,35 62,40" fill="#90a4ae"/>
          <!-- Aft Flaps -->
          <polygon points="38,95 20,115 38,115" fill="#90a4ae"/>
          <polygon points="62,95 80,115 62,115" fill="#90a4ae"/>
          <!-- Raptor Engines -->
          <polygon points="43,115 40,125 60,125 57,115" fill="#37474f"/>
        </svg>
      `;
    }
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-rocket-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-rocket");

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => this.close());
    }

    // Rocket Cards & Select Buttons
    this.container.querySelectorAll(".rocket-card, .btn-select-rocket").forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const rocketId = el.getAttribute("data-rocket-id");
        if (!rocketId) return;

        sound.playAdjustTone(true);
        gameState.selectRocket(rocketId);
        this.render(); // Re-render to show new active vehicle
      });
    });
  }
}

