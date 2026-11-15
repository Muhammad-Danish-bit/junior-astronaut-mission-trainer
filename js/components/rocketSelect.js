// ============================================================================
// ROCKET SELECTION, CARGO BAY & DIFFICULTY PRESET COMPONENT
// Limited Cargo Equipment Slots, Difficulty Modes, and Supply Loading
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class RocketSelectComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
    this.unsubscribe = gameState.subscribe((state, event) => {
      if (state.screen === "rocket_select") {
        this.updateView();
      }
    });
  }

  getRocketSvg(rocketId) {
    if (rocketId === "small") {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="scoutGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#cfd8dc"/>
              <stop offset="50%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#90a4ae"/>
            </linearGradient>
            <linearGradient id="scoutFin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#00e5ff"/>
              <stop offset="100%" stop-color="#0091ea"/>
            </linearGradient>
          </defs>
          <path d="M50 15 C38 45 35 110 35 130 L65 130 C65 110 62 45 50 15 Z" fill="url(#scoutGrad)" stroke="#455a64" stroke-width="2"/>
          <polygon points="50,15 42,40 58,40" fill="#00e5ff"/>
          <circle cx="50" cy="55" r="9" fill="#00bcd4" stroke="#ffffff" stroke-width="2.5"/>
          <circle cx="48" cy="53" r="3" fill="#ffffff" opacity="0.8"/>
          <rect x="35" y="80" width="30" height="4" fill="#fc3d21"/>
          <rect x="35" y="86" width="30" height="2" fill="#0b3d91"/>
          <polygon points="35,105 18,135 35,130" fill="url(#scoutFin)"/>
          <polygon points="65,105 82,135 65,130" fill="url(#scoutFin)"/>
          <polygon points="40,130 38,142 62,142 60,130" fill="#37474f"/>
          <polygon points="42,142 50,158 58,142" fill="#ff9100" opacity="0.85"/>
        </svg>
      `;
    } else if (rocketId === "medium") {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="pioneerGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b0bec5"/>
              <stop offset="50%" stop-color="#f5f5f5"/>
              <stop offset="100%" stop-color="#78909c"/>
            </linearGradient>
          </defs>
          <path d="M50 10 C32 40 30 115 30 135 L70 135 C70 115 68 40 50 10 Z" fill="url(#pioneerGrad)" stroke="#37474f" stroke-width="2"/>
          <polygon points="50,10 39,35 61,35" fill="#f4511e"/>
          <rect x="20" y="65" width="10" height="65" rx="4" fill="#cfd8dc" stroke="#455a64" stroke-width="1.5"/>
          <polygon points="20,65 25,55 30,65" fill="#f4511e"/>
          <rect x="70" y="65" width="10" height="65" rx="4" fill="#cfd8dc" stroke="#455a64" stroke-width="1.5"/>
          <polygon points="70,65 75,55 80,65" fill="#f4511e"/>
          <circle cx="44" cy="50" r="6" fill="#00e5ff" stroke="#fff" stroke-width="2"/>
          <circle cx="56" cy="50" r="6" fill="#00e5ff" stroke="#fff" stroke-width="2"/>
          <rect x="30" y="85" width="40" height="5" fill="#0b3d91"/>
          <rect x="30" y="92" width="40" height="3" fill="#fc3d21"/>
          <polygon points="34,135 32,145 44,145 42,135" fill="#263238"/>
          <polygon points="56,135 54,145 66,145 64,135" fill="#263238"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="titanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#37474f"/>
              <stop offset="50%" stop-color="#eceff1"/>
              <stop offset="100%" stop-color="#263238"/>
            </linearGradient>
          </defs>
          <path d="M50 5 C25 35 24 120 24 135 L76 135 C76 120 75 35 50 5 Z" fill="url(#titanGrad)" stroke="#212121" stroke-width="2"/>
          <polygon points="50,5 34,30 66,30" fill="#ffd600"/>
          <rect x="12" y="60" width="12" height="75" rx="4" fill="#607d8b" stroke="#263238" stroke-width="1.5"/>
          <polygon points="12,60 18,48 24,60" fill="#ffd600"/>
          <rect x="76" y="60" width="12" height="75" rx="4" fill="#607d8b" stroke="#263238" stroke-width="1.5"/>
          <polygon points="76,60 82,48 88,60" fill="#ffd600"/>
          <rect x="36" y="45" width="28" height="12" rx="6" fill="#00e5ff" stroke="#ffffff" stroke-width="2"/>
          <polygon points="28,135 26,146 38,146 36,135" fill="#212121"/>
          <polygon points="44,135 42,148 58,148 56,135" fill="#212121"/>
          <polygon points="64,135 62,146 74,146 72,135" fill="#212121"/>
        </svg>
      `;
    }
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const currentRocket = GAME_CONFIG.ROCKETS[s.selectedRocket] || GAME_CONFIG.ROCKETS.small;
    const maxSlots = currentRocket.maxCargoSlots || 2;
    const equippedCount = s.selectedCargo.length;

    this.container.innerHTML = `
      <div class="hangar-layout">
        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner" style="grid-column: 1 / -1;">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 3 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Select your exploration vehicle and equip cargo items (Recommended: <strong>Cryogenic O2</strong> & <strong>Repair Multi-Tool</strong>). When ready, click <strong style="color: var(--text-highlight);">[Crew Boarding →]</strong>!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-hangar-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Left: Rocket Class Selection & Limited Cargo Equipment -->
        <section class="rocket-hangar">
          <div class="hangar-header">
            <h2><span>🚀</span> Rocket Hangar & Cargo Bay</h2>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Target: <strong style="color: var(--accent-gold);">${dest.name}</strong> (${dest.distanceKm.toLocaleString()} km)
            </div>
          </div>

          <div class="rocket-options">
            ${this.renderRocketCards()}
          </div>

          <!-- Limited Cargo Equipment Slots (Tough Trade-Offs!) -->
          <div class="cargo-selection-panel">
            <div class="cargo-slots-header">
              <div>
                <strong style="color: var(--border-cyan); font-size: 0.95rem;">📦 Cargo Equipment Bay</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Select equipment to bring into space (Max ${maxSlots} items for ${currentRocket.name}):</div>
              </div>
              <div class="cargo-slots-indicator">
                ${Array.from({ length: maxSlots }).map((_, i) => `
                  <div class="cargo-slot-dot ${i < equippedCount ? 'filled' : ''}" title="Cargo Slot ${i + 1}"></div>
                `).join("")}
              </div>
            </div>

            <div class="cargo-grid">
              ${this.renderCargoItems(maxSlots)}
            </div>
          </div>

          <!-- Difficulty Preset Selector -->
          <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 20px;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 6px;">Select Simulation Difficulty:</div>
            <div class="difficulty-selector">
              ${Object.values(GAME_CONFIG.DIFFICULTY).map((diff) => `
                <button class="btn-diff ${s.difficulty === diff.id ? 'active' : ''}" data-diff-id="${diff.id}">
                  <span>${diff.icon} ${diff.name}</span>
                </button>
              `).join("")}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
              ${GAME_CONFIG.DIFFICULTY[s.difficulty].description}
            </div>
          </div>
        </section>

        <!-- Right: Supply Loadout & Payload Warnings -->
        <aside class="supply-station">
          <div class="station-title">
            <span>⚖️</span>
            <span>Life Support Supply Allocation</span>
          </div>

          <div class="destination-reminder">
            <span>Destination: <strong>${dest.name}</strong></span>
            <span>Gravity: <strong>${dest.gravityMps2} m/s²</strong></span>
          </div>

          <div class="supply-controls">
            ${this.renderSupplyControl("fuel", "⛽ Rocket Fuel (LOX)", s.loadedSupplies.fuel, currentRocket.maxCapacity.fuel, dest.recommendedSupplies.fuel, "Tons")}
            ${this.renderSupplyControl("oxygen", "🫁 Oxygen Reserves", s.loadedSupplies.oxygen, currentRocket.maxCapacity.oxygen, dest.recommendedSupplies.oxygen, "%")}
            ${this.renderSupplyControl("water", "💧 Purified Water", s.loadedSupplies.water, currentRocket.maxCapacity.water, dest.recommendedSupplies.water, "Liters")}
            ${this.renderSupplyControl("food", "🍞 Food Packs (MRE)", s.loadedSupplies.food, currentRocket.maxCapacity.food, dest.recommendedSupplies.food, "Rations")}
            ${this.renderSupplyControl("power", "⚡ Auxiliary Power", s.loadedSupplies.power, currentRocket.maxCapacity.power, dest.recommendedSupplies.power, "kWh")}
          </div>

          <div id="payload-warning-container">
            ${this.renderWarningBox()}
          </div>

          <div class="payload-actions">
            <button class="btn-secondary" id="btn-back-dashboard">
              <span>← Mission Control</span>
            </button>
            <button class="btn-primary" id="btn-proceed-boarding">
              <span>Crew Boarding →</span>
            </button>
          </div>
        </aside>
      </div>
    `;
  }

  renderRocketCards() {
    const s = gameState.state;
    // Render the 3 distinct rocket classes: Scout-1 (small), Pioneer-X (medium), Titan-V (heavy)
    const primaryRockets = [
      GAME_CONFIG.ROCKETS.small,
      GAME_CONFIG.ROCKETS.medium,
      GAME_CONFIG.ROCKETS.heavy
    ].filter(Boolean);

    return primaryRockets.map((r) => {
      const isSelected = s.selectedRocket === r.id;
      const isUnlocked = s.unlockedRockets ? (s.unlockedRockets.includes(r.id) || r.id === "small" || r.id === "medium") : true;
      const badgeText = (r.category || 'Lifter').split(' ')[0];

      return `
        <div class="rocket-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" data-rocket-id="${r.id}">
          <div class="rocket-card-badge">${badgeText} • ${r.maxCargoSlots || 2} Slots</div>
          <div class="rocket-visual">
            ${this.getRocketSvg(r.id)}
          </div>
          <div class="rocket-info">
            <h3>${r.name}</h3>
            <div class="rocket-tier">${r.category || 'Exploration Vehicle'}</div>
            <div class="rocket-desc">${r.description || ''}</div>
          </div>

          <div class="rocket-stat-bars">
            <div class="stat-row">
              <span>Thrust:</span>
              <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${r.fuelCapacity || 80}%;"></div></div>
            </div>
            <div class="stat-row">
              <span>Cargo Slots:</span>
              <strong style="color: var(--accent-gold);">${r.maxCargoSlots || 2} Items</strong>
            </div>
          </div>

          ${!isUnlocked ? `
            <div class="rocket-lock-badge">
              🔒 Locked Vehicle (Cadet Rank)
            </div>
          ` : ''}
        </div>
      `;
    }).join("");
  }

  renderCargoItems(maxSlots) {
    const s = gameState.state;
    return Object.values(GAME_CONFIG.CARGO_ITEMS).map((item) => {
      const isEquipped = s.selectedCargo.includes(item.id);
      return `
        <div class="cargo-item-card ${isEquipped ? 'equipped' : ''}" data-cargo-id="${item.id}">
          <span style="font-size: 1.8rem;">${item.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.82rem; color: #fff;">${item.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-highlight);">${item.effect}</div>
          </div>
          <div style="font-size: 0.8rem; font-weight: 800; color: ${isEquipped ? 'var(--text-highlight)' : 'var(--text-muted)'};">
            ${isEquipped ? '✓ EQUIPPED' : '+ ADD'}
          </div>
        </div>
      `;
    }).join("");
  }

  renderSupplyControl(key, label, currentVal, maxVal, recommendedVal, unit) {
    return `
      <div class="supply-row" data-supply-key="${key}">
        <div class="supply-header">
          <div class="supply-name"><span>${label}</span></div>
          <div class="supply-meta"><span class="curr-val">${currentVal}</span> / ${maxVal} ${unit}</div>
        </div>
        <div class="supply-slider-wrapper">
          <button class="btn-step btn-minus" data-key="${key}">-</button>
          <input type="range" class="supply-slider" data-key="${key}" min="15" max="${maxVal}" value="${currentVal}">
          <button class="btn-step btn-plus" data-key="${key}">+</button>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>Min Recommended: <strong>${recommendedVal} ${unit}</strong></span>
          <span style="color: ${currentVal >= recommendedVal ? 'var(--text-highlight)' : 'var(--meter-food)'};">
            ${currentVal >= recommendedVal ? '✓ Safe' : '⚠ Deficit'}
          </span>
        </div>
      </div>
    `;
  }

  renderWarningBox() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const loaded = s.loadedSupplies;
    const req = dest.recommendedSupplies;

    const warnings = [];
    if (loaded.fuel < req.fuel) warnings.push(`Fuel load (${loaded.fuel}) is below recommended ${req.fuel} for ${dest.name}.`);
    if (loaded.oxygen < req.oxygen) warnings.push(`Oxygen reserves (${loaded.oxygen}) may deplete before base camp setup.`);
    if (loaded.water < req.water) warnings.push(`Water supply (${loaded.water}) is under safe planetary margin.`);
    if (loaded.food < req.food) warnings.push(`Food rations (${loaded.food}) insufficient for full expedition.`);
    if (loaded.power < req.power) warnings.push(`Auxiliary batteries (${loaded.power}) low for base heating.`);

    if (warnings.length > 0) {
      return `
        <div class="payload-warning-box warning">
          <span style="font-size: 1.4rem;">⚠️</span>
          <div>
            <strong>SUPPLY DEFICIT WARNING FOR ${dest.name.toUpperCase()}:</strong>
            <ul style="margin: 3px 0 0 16px; padding: 0;">
              ${warnings.slice(0, 2).map((w) => `<li>${w}</li>`).join("")}
            </ul>
            <div style="margin-top: 3px; font-size: 0.72rem; color: #ffcc80;">
              Tip: Increase supplies or choose a larger spacecraft with extra cargo capacity!
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="payload-warning-box nominal">
          <span style="font-size: 1.4rem;">✅</span>
          <div>
            <strong>PAYLOAD NOMINAL FOR ${dest.name.toUpperCase()}</strong>
            <div>Supplies and cargo equipment meet NASA safety margins. All systems GO!</div>
          </div>
        </div>
      `;
    }
  }

  attachEvents() {
    // Select rocket
    this.container.querySelectorAll(".rocket-card").forEach((card) => {
      card.addEventListener("click", () => {
        const rocketId = card.getAttribute("data-rocket-id");
        const rocket = GAME_CONFIG.ROCKETS[rocketId];
        if (!rocket) return;

        if (!gameState.state.unlockedRockets.includes(rocketId)) {
          sound.playFail();
          alert(`Rocket Locked! Earn ${rocket.unlockedAtScore} total points to unlock.`);
          return;
        }

        sound.playClick();
        gameState.selectRocket(rocketId);
        this.render();
        this.attachEvents();
      });
    });

    // Toggle cargo items
    this.container.querySelectorAll(".cargo-item-card").forEach((card) => {
      card.addEventListener("click", () => {
        const cargoId = card.getAttribute("data-cargo-id");
        const success = gameState.toggleCargoItem(cargoId);
        if (success) {
          sound.playClick();
          this.render();
          this.attachEvents();
        } else {
          sound.playFail();
          const r = GAME_CONFIG.ROCKETS[gameState.state.selectedRocket];
          alert(`Cargo bay full! ${r.name} has only ${r.maxCargoSlots} cargo equipment slots.`);
        }
      });
    });

    // Difficulty buttons
    this.container.querySelectorAll(".btn-diff").forEach((btn) => {
      btn.addEventListener("click", () => {
        const diffId = btn.getAttribute("data-diff-id");
        gameState.state.difficulty = diffId;
        sound.playClick();
        this.render();
        this.attachEvents();
      });
    });

    // Sliders
    this.container.querySelectorAll(".supply-slider").forEach((slider) => {
      slider.addEventListener("input", (e) => {
        const key = e.target.getAttribute("data-key");
        const val = parseInt(e.target.value, 10);
        gameState.setSupplyValue(key, val);
        this.updateSupplyRow(key, val);
        this.updateWarning();
      });
    });

    // Plus / minus buttons
    this.container.querySelectorAll(".btn-step").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        const isPlus = btn.classList.contains("btn-plus");
        const delta = isPlus ? 10 : -10;
        const current = gameState.state.loadedSupplies[key] || 50;
        const newVal = current + delta;

        sound.playClick();
        gameState.setSupplyValue(key, newVal);
        this.updateSupplyRow(key, gameState.state.loadedSupplies[key]);
        this.updateWarning();
      });
    });

    // Navigation
    const backBtn = this.container.querySelector("#btn-back-dashboard");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        sound.playClick();
        gameState.setScreen("dashboard");
      });
    }

    const boardingBtn = this.container.querySelector("#btn-proceed-boarding");
    if (boardingBtn) {
      boardingBtn.addEventListener("click", () => {
        sound.playSuccessChime();
        gameState.initializeMissionTelemetry();
        gameState.setScreen("boarding");
      });
    }

    const btnGuide = this.container.querySelector("#btn-hangar-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("first_mission");
        }
      });
    }
  }

  updateSupplyRow(key, val) {
    const row = this.container.querySelector(`.supply-row[data-supply-key="${key}"]`);
    if (!row) return;
    const currValEl = row.querySelector(".curr-val");
    const slider = row.querySelector(".supply-slider");
    if (currValEl) currValEl.textContent = val;
    if (slider) slider.value = val;
  }

  updateWarning() {
    const warningContainer = this.container.querySelector("#payload-warning-container");
    if (warningContainer) {
      warningContainer.innerHTML = this.renderWarningBox();
    }
  }

  updateView() {
    this.render();
    this.attachEvents();
  }

  destroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
