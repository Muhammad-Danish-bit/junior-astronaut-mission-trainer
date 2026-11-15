// ============================================================================
// ASTRONAUT PREPARATION MODAL COMPONENT
// Crew selection, biometric scans, spacesuit calibration & physical training
// Direct impact on Astronaut Health, Oxygen Reserve & Mission Readiness
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class AstronautPrepModal {
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
    const currentAstronaut = GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut] || GAME_CONFIG.ASTRONAUTS.alex;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">👨‍🚀</span>
              <div>
                <h2>Crew Quarters & Biomedical Station</h2>
                <div class="modal-subtitle">NASA Johnson Space Center • Astronaut Medical Operations</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-astronaut-modal" aria-label="Close Station">✕</button>
          </div>

          <div class="modal-body">
            <div class="astronaut-layout">
              <!-- Left: Crew Candidate Cards -->
              <div class="crew-column">
                <h3 class="section-title">Select Mission Commander</h3>
                <div class="crew-cards-list">
                  ${Object.values(GAME_CONFIG.ASTRONAUTS).map(a => this.renderCrewCard(a, a.id === s.selectedAstronaut)).join("")}
                </div>
              </div>

              <!-- Right: Biometric Vitals & Pre-Flight Calibrations -->
              <div class="prep-column">
                <h3 class="section-title">Biomedical Status & Calibrations</h3>
                
                <div class="bio-status-card">
                  <div class="bio-header">
                    <div class="bio-avatar">${currentAstronaut.avatar}</div>
                    <div>
                      <h4>${currentAstronaut.name}</h4>
                      <div class="bio-role">${currentAstronaut.role}</div>
                      <div class="bio-vitals-row">
                        <span>Resting Pulse: <strong>68 BPM</strong></span>
                        <span>Blood Oxygen: <strong>99% SpO2</strong></span>
                        <span>Radiation Dose: <strong>0.08 mSv</strong></span>
                      </div>
                    </div>
                  </div>

                  <div class="vitals-progress-box">
                    <div class="vitals-label-row">
                      <span>Crew Physical Readiness</span>
                      <strong style="color: var(--meter-health);">${s.telemetry.astronautHealth}%</strong>
                    </div>
                    <div class="meter-track">
                      <div class="meter-fill" style="width: ${s.telemetry.astronautHealth}%; background: var(--meter-health);"></div>
                    </div>
                  </div>
                </div>

                <!-- Interactive Preparation Procedures -->
                <div class="calibration-procedures">
                  <h4>Pre-Flight Physiological Procedures</h4>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🫀 Full Biometric Scan</strong>
                      <p>Run diagnostic ultrasound, blood gas calibration, and ECG.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-run-bioscan">
                      <span>Scan (+3% Health)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🛡️ Spacesuit Sensor Zeroing</strong>
                      <p>Calibrate hermetic seals and internal biometric sensors.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-calibrate-suit">
                      <span>Calibrate (+5% Health)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🫁 Hyperbaric Pre-Breathe</strong>
                      <p>Denitrogenate bloodstream with pure oxygen to prevent decompression sickness.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-prebreathe-o2">
                      <span>Pre-Breathe (+5% O2)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🧪 Electrolyte & Nutrient Hydration</strong>
                      <p>Infuse balanced electrolyte solution to fortify cardiovascular stamina.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-infuse-nutrients">
                      <span>Hydrate (+4% Water)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Active Commander: <strong>${currentAstronaut.name}</strong></span>
              <span>Astronaut Health: <strong>${s.telemetry.astronautHealth}%</strong></span>
              <span>Mission Readiness: <strong>${s.missionReadiness}%</strong></span>
            </div>
            <button class="btn-primary" id="btn-confirm-astronaut">
              <span>Certification Approved</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderCrewCard(a, isSelected) {
    return `
      <div class="crew-card ${isSelected ? 'selected' : ''}" data-crew-id="${a.id}">
        <div class="crew-card-avatar">${a.avatar}</div>
        <div class="crew-card-content">
          <div class="crew-name-row">
            <h4>${a.name}</h4>
            ${isSelected ? '<span class="chip-active">COMMANDER</span>' : ''}
          </div>
          <div class="crew-role">${a.role}</div>
          <div class="crew-bio">${a.bio}</div>
          <div class="crew-bonus-row">
            <span class="bonus-tag">❤️ +${a.healthBonus}% Health</span>
            <span class="bonus-tag">🫁 +${a.oxygenBonus}% O₂ Bonus</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-astronaut-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-astronaut");

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

    // Select Astronaut Cards
    this.container.querySelectorAll(".crew-card").forEach(card => {
      card.addEventListener("click", () => {
        const crewId = card.getAttribute("data-crew-id");
        if (!crewId) return;

        sound.playAdjustTone(true);
        gameState.selectAstronaut(crewId);
        this.render();
      });
    });

    // Procedures
    const bioScanBtn = this.container.querySelector("#btn-run-bioscan");
    if (bioScanBtn) {
      bioScanBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("astronautHealth", 3);
        this.showToast("Biometric Scan Complete: +3% Astronaut Health!");
        this.render();
      });
    }

    const suitBtn = this.container.querySelector("#btn-calibrate-suit");
    if (suitBtn) {
      suitBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("astronautHealth", 5);
        this.showToast("Suit Seals Pressurized: +5% Astronaut Health!");
        this.render();
      });
    }

    const o2Btn = this.container.querySelector("#btn-prebreathe-o2");
    if (o2Btn) {
      o2Btn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("oxygen", 5);
        this.showToast("Hyperbaric Pre-Breathe Complete: +5% Oxygen Reserve!");
        this.render();
      });
    }

    const nutrientBtn = this.container.querySelector("#btn-infuse-nutrients");
    if (nutrientBtn) {
      nutrientBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("water", 4);
        gameState.adjustMetric("food", 3);
        this.showToast("Nutrient Hydration Absorbed: +4% Water, +3% Food!");
        this.render();
      });
    }
  }

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "prep-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2400);
  }
}

