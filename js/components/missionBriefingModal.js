// ============================================================================
// MISSION BRIEFING MODAL COMPONENT
// Target destination selection, orbital flight plan & mission duration adjuster
// Direct impact on Mission Duration, Logistics Requirements & Mission Readiness
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class MissionBriefingModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const currentDest = GAME_CONFIG.DESTINATIONS[s.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;
    const duration = s.telemetry.missionDuration;

    // Logistics consumption projection based on planned days
    const dailyO2 = 0.5;
    const dailyWater = 0.6;
    const dailyFood = 0.45;

    const estO2Needed = Math.min(100, Math.round(duration * dailyO2));
    const estWaterNeeded = Math.min(100, Math.round(duration * dailyWater));
    const estFoodNeeded = Math.min(100, Math.round(duration * dailyFood));

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">📋</span>
              <div>
                <h2>NASA Flight Operations • Mission Briefing</h2>
                <div class="modal-subtitle">Flight Dynamics Office • Mission Trajectory & Logistics Matrix</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-briefing-modal" aria-label="Close Briefing">✕</button>
          </div>

          <div class="modal-body">
            <!-- Destination Selector Row -->
            <div class="dest-brief-selector">
              <h3 class="section-title">Select Planetary Destination</h3>
              <div class="dest-brief-cards">
                ${Object.values(GAME_CONFIG.DESTINATIONS).map(d => this.renderDestCard(d, d.id === s.selectedDestination)).join("")}
              </div>
            </div>

            <!-- Target Flight Specs & Orbit Grid -->
            <div class="briefing-specs-grid">
              <div class="spec-card">
                <span class="spec-icon">🌍 ➔ ${currentDest.icon}</span>
                <span class="spec-name">Distance to Target</span>
                <span class="spec-value">${currentDest.distance}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">⚖️</span>
                <span class="spec-name">Surface Gravity</span>
                <span class="spec-value">${currentDest.gravity}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">⚠️</span>
                <span class="spec-name">Primary Hazard</span>
                <span class="spec-value" style="font-size: 0.82rem;">${currentDest.hazard}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">🚀</span>
                <span class="spec-name">Launch Window</span>
                <span class="spec-value" style="color: var(--text-highlight);">${currentDest.launchWindow}</span>
              </div>
            </div>

            <!-- Flight Plan Text -->
            <div class="mission-narrative-box">
              <h4>Directives from Flight Director Stella:</h4>
              <p>${currentDest.briefing}</p>
            </div>

            <!-- Mission Duration Slider & Logistics Calculator -->
            <div class="duration-control-section">
              <div class="duration-header-row">
                <div>
                  <h4>Planned Mission Duration</h4>
                  <p>Calibrate target mission flight days to balance supply margins.</p>
                </div>
                <div class="duration-display-badge">
                  <span id="duration-val-text">${duration}</span> Days
                </div>
              </div>

              <div class="slider-container">
                <input type="range" min="7" max="180" step="1" value="${duration}" id="slider-mission-duration" class="nasa-range-slider">
                <div class="slider-ticks">
                  <span>7d (Lunar Orbit)</span>
                  <span>14d (Artemis Camp)</span>
                  <span>60d (Near Earth Orbit)</span>
                  <span>90d (Mars Transfer)</span>
                  <span>180d (Deep Space Voyager)</span>
                </div>
              </div>

              <!-- Projected Supply Sufficiency Bar -->
              <div class="logistics-preview-box">
                <h5>ECLSS Supply Sufficiency for ${duration} Days:</h5>
                <div class="logistics-bars-row">
                  <div class="log-item">
                    <span>Oxygen (Est: ${estO2Needed}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.oxygen / Math.max(1, estO2Needed)) * 100)}%; background: var(--meter-oxygen);"></div>
                    </div>
                  </div>
                  <div class="log-item">
                    <span>Water (Est: ${estWaterNeeded}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.water / Math.max(1, estWaterNeeded)) * 100)}%; background: var(--meter-water);"></div>
                    </div>
                  </div>
                  <div class="log-item">
                    <span>Food (Est: ${estFoodNeeded}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.food / Math.max(1, estFoodNeeded)) * 100)}%; background: var(--meter-food);"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Target: <strong>${currentDest.name}</strong></span>
              <span>Duration: <strong>${duration} Days</strong></span>
              <span>Mission Readiness: <strong>${s.missionReadiness}%</strong></span>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="btn-secondary" id="btn-confirm-briefing">
                <span>Save Directives</span>
              </button>
              <button class="btn-primary" id="btn-proceed-prep">
                <span>Proceed to Rocket Selection 🛸</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderDestCard(d, isSelected) {
    return `
      <div class="dest-brief-card ${isSelected ? 'selected' : ''}" data-dest-id="${d.id}">
        <div class="dest-brief-icon">${d.icon}</div>
        <div class="dest-brief-info">
          <h4>${d.name}</h4>
          <span class="dest-dist">${d.distance}</span>
          ${isSelected ? '<span class="chip-active">TARGET DESTINATION</span>' : ''}
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-briefing-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-briefing");
    const proceedBtn = this.container.querySelector("#btn-proceed-prep");
    const slider = this.container.querySelector("#slider-mission-duration");

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

    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        this.close();
        sound.playSuccessChime();
        gameState.setScreen("rocket_select");
      });
    }

    // Select Destination Card
    this.container.querySelectorAll(".dest-brief-card").forEach(card => {
      card.addEventListener("click", () => {
        const destId = card.getAttribute("data-dest-id");
        if (!destId) return;

        sound.playAdjustTone(true);
        gameState.selectDestination(destId);
        this.render();
      });
    });

    // Slider for Duration
    if (slider) {
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        gameState.setMissionDuration(val);
        const textVal = this.container.querySelector("#duration-val-text");
        if (textVal) textVal.textContent = val;
      });

      slider.addEventListener("change", () => {
        sound.playClick();
        this.render();
      });
    }
  }
}

