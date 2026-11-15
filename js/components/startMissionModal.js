// ============================================================================
// START MISSION MODAL & PRE-FLIGHT LAUNCH SEQUENCE COMPONENT
// Conducts NASA Go/No-Go poll across all 8 telemetry metrics, T-minus countdown,
// and flight clearance certification
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { phaserEngine } from "../phaserEngine.js";

export class StartMissionModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.countdownTimer = null;
    this.countdownSeconds = 10;
    this.isCountingDown = false;
    this.isCertified = false;
  }

  open() {
    this.isOpen = true;
    this.isCountingDown = false;
    this.isCertified = false;
    this.countdownSeconds = 10;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.isOpen = false;
    this.isCountingDown = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const t = s.telemetry;
    const readiness = s.missionReadiness;
    const isGo = readiness >= 80;

    // Check individual Go/No-Go status for all 8 metrics
    const pollResults = [
      { name: "Oxygen Supply (ECLSS)", val: `${t.oxygen}%`, go: t.oxygen >= 35, icon: "🫁" },
      { name: "Food Rations", val: `${t.food}%`, go: t.food >= 30, icon: "🍞" },
      { name: "Purified Water Loop", val: `${t.water}%`, go: t.water >= 30, icon: "💧" },
      { name: "Electrical Power", val: `${t.power}%`, go: t.power >= 30, icon: "⚡" },
      { name: "Propellant Tanks", val: `${t.rocketFuel}%`, go: t.rocketFuel >= 40, icon: "⛽" },
      { name: "Cargo Structural Mass", val: `${t.cargoCapacity}%`, go: t.cargoCapacity <= 95, icon: "📦" },
      { name: "Crew Biometrics", val: `${t.astronautHealth}%`, go: t.astronautHealth >= 50, icon: "❤️" },
      { name: "Trajectory & Duration", val: `${t.missionDuration} Days`, go: true, icon: "⏱️" }
    ];

    const allPollsGo = pollResults.every(p => p.go) && isGo;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🚀</span>
              <div>
                <h2>NASA Launch Control Center • Firing Room 1</h2>
                <div class="modal-subtitle">Kennedy Space Center • Pre-Flight Readiness Review & Terminal Countdown</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-start-modal" aria-label="Abort Sequence">✕</button>
          </div>

          <div class="modal-body">
            <!-- Readiness Status Hero -->
            <div class="launch-hero-card ${allPollsGo ? 'hero-go' : 'hero-nogo'}">
              <div class="launch-hero-status">
                <span class="status-indicator-lamp ${allPollsGo ? 'lamp-green' : 'lamp-red'}"></span>
                <span class="status-headline">
                  ${this.isCertified 
                    ? "🚀 LAUNCH VEHICLE INSERTION COMPLETE!" 
                    : (this.isCountingDown 
                        ? `TERMINAL COUNTDOWN IN PROGRESS: T-MINUS ${this.countdownSeconds}s` 
                        : (allPollsGo ? "ALL SYSTEMS NOMINAL: GO FOR LAUNCH" : "HOLD COUNTDOWN: NO-GO ON TELEMETRY"))}
                </span>
              </div>
              <div class="launch-readiness-chip">
                Mission Readiness: <strong>${readiness}%</strong>
              </div>
            </div>

            ${!this.isCertified ? `
              <!-- Pre-Flight Go / No-Go Poll Table -->
              <div class="poll-section">
                <h4>Consolidated Flight Director Telemetry Poll:</h4>
                <div class="poll-grid">
                  ${pollResults.map(p => `
                    <div class="poll-item ${p.go ? 'poll-go' : 'poll-nogo'}">
                      <div class="poll-left">
                        <span class="poll-icon">${p.icon}</span>
                        <div>
                          <div class="poll-name">${p.name}</div>
                          <div class="poll-val">${p.val}</div>
                        </div>
                      </div>
                      <div class="poll-badge ${p.go ? 'chip-go' : 'chip-nogo'}">
                        ${p.go ? 'GO' : 'NO-GO'}
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : `
              <!-- Launch Certification Card -->
              <div class="certified-box">
                <div class="cert-seal">🏅</div>
                <h3>Phase 1 Flight Readiness Certified!</h3>
                <p>
                  Flight Director Stella and Houston Mission Control have verified all 8 life support vitals, propellant capacities, crew biometrics, and orbital trajectories.
                </p>
                <div class="cert-specs-row">
                  <div>Spacecraft: <strong>${GAME_CONFIG.ROCKETS[s.selectedRocket]?.name || "SLS"}</strong></div>
                  <div>Commander: <strong>${GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut]?.name || "Alex"}</strong></div>
                  <div>Target: <strong>${GAME_CONFIG.DESTINATIONS[s.selectedDestination]?.name || "Moon"}</strong></div>
                  <div>Readiness: <strong>${readiness}%</strong></div>
                </div>
                <div class="cert-note">
                  ✨ <em>Phase 1 Dashboard and Telemetry is fully verified. Ready for next mission phases!</em>
                </div>
              </div>
            `}

            ${(!allPollsGo && !this.isCertified) ? `
              <div class="alert-box-nogo">
                <span style="font-size: 1.5rem;">⚠️</span>
                <div>
                  <strong>Mission Abort Warning:</strong>
                  One or more life support or propulsion streams are below NASA safe flight minimums. Restore nominal vitals before committing to countdown.
                </div>
                <button class="btn-secondary" id="btn-auto-fix-telemetry" style="margin-left: auto;">
                  ⚡ Auto-Stabilize Systems
                </button>
              </div>
            ` : ''}
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Overall Status: <strong>${allPollsGo ? "GO" : "HOLD"}</strong></span>
              <span>Launch Window: <strong>OPEN</strong></span>
            </div>

            <div class="launch-actions-group">
              <button class="btn-secondary" id="btn-cancel-launch">
                ${this.isCertified ? 'Close Console' : 'Abort / Stand Down'}
              </button>

              ${this.isCertified ? `
                <button class="btn-primary" id="btn-commit-pad" style="background: linear-gradient(135deg, #00e5ff, #00b0ff); font-weight: 800;">
                  <span>Proceed to Pad 39B & Crew Boarding 👨‍🚀</span>
                </button>
              ` : ''}

              ${(!this.isCountingDown && !this.isCertified) ? `
                <button class="btn-primary btn-launch-commit ${!allPollsGo ? 'disabled' : ''}" id="btn-initiate-countdown" ${!allPollsGo ? 'disabled' : ''}>
                  <span>Initiate Terminal Countdown (T-10s)</span>
                  <span>🚀</span>
                </button>
              ` : ''}

              ${this.isCountingDown ? `
                <button class="btn-danger" id="btn-emergency-abort">
                  <span>EMERGENCY HOLD / ABORT</span>
                  <span>🛑</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(allPollsGo);
  }

  startCountdown() {
    this.isCountingDown = true;
    this.countdownSeconds = 10;
    sound.playQuindarBeep();
    this.render();

    this.countdownTimer = setInterval(() => {
      this.countdownSeconds--;
      sound.playCountdownTick(this.countdownSeconds === 0);

      if (this.countdownSeconds <= 0) {
        clearInterval(this.countdownTimer);
        this.isCountingDown = false;
        this.isCertified = true;
        sound.playThrusterRumble();
        sound.playSuccessChime();
        gameState.unlockAchievement("go_for_launch");
        this.render();
      } else {
        // Update countdown text live
        const heroHeadline = this.container.querySelector(".status-headline");
        if (heroHeadline) {
          heroHeadline.textContent = `TERMINAL COUNTDOWN IN PROGRESS: T-MINUS ${this.countdownSeconds}s`;
        }
      }
    }, 1000);
  }

  abortCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.isCountingDown = false;
    sound.playWarningAlarm();
    this.render();
  }

  attachEvents(allPollsGo) {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-start-modal");
    const cancelBtn = this.container.querySelector("#btn-cancel-launch");
    const commitPadBtn = this.container.querySelector("#btn-commit-pad");
    const countdownBtn = this.container.querySelector("#btn-initiate-countdown");
    const abortBtn = this.container.querySelector("#btn-emergency-abort");
    const autoFixBtn = this.container.querySelector("#btn-auto-fix-telemetry");

    if (commitPadBtn) {
      commitPadBtn.addEventListener("click", () => {
        this.close();
        sound.playSuccessChime();
        gameState.setScreen("boarding");
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop && !this.isCountingDown) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (!this.isCountingDown) this.close();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.close());
    }

    if (countdownBtn && allPollsGo) {
      countdownBtn.addEventListener("click", () => {
        this.startCountdown();
      });
    }

    if (abortBtn) {
      abortBtn.addEventListener("click", () => {
        this.abortCountdown();
      });
    }

    if (autoFixBtn) {
      autoFixBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.restoreNominal();
        this.render();
      });
    }
  }
}

