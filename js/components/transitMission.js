// ============================================================================
// DEEP SPACE REAL-TIME MISSION CONTROLLER COMPONENT
// Earth <-> Moon/Mars Speed-of-Light Comms Delay, Outpost Telemetry & +5 Pts
// ============================================================================

import { Mission, fmtDelay } from "../mission.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { GAME_CONFIG } from "../config.js";

export class TransitMissionComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.mission = null;
    this.updateHandler = null;
    this.logHandler = null;
    this.alertHandler = null;
    this.pointsAwarded = false;

    // Guidance objectives
    this.objectives = {
      solarDeployed: false,
      shieldingRaised: false,
      rationingConfigured: false
    };

    this.init();
  }

  init() {
    // Choose mission target based on player's selected destination
    const targetDest = gameState.state.selectedDestination === "mars" ? "mars" : "moon";
    this.mission = new Mission(targetDest, { crew: 4 });

    this.render();
    this.attachEvents();

    // Start simulation loop
    this.mission.launch();
    this.mission.start();

    // Subscribe to mission events
    this.updateHandler = (e) => this.onMissionUpdate(e.detail);
    this.logHandler = (e) => this.onMissionLog(e.detail);
    this.alertHandler = (e) => this.onMissionAlert(e.detail);

    this.mission.addEventListener("update", this.updateHandler);
    this.mission.addEventListener("log", this.logHandler);
    this.mission.addEventListener("alert", this.alertHandler);

    sound.playQuindarBeep();
  }

  render() {
    const s = this.mission.snapshot();
    const dest = this.mission.dest;
    const isMars = this.mission.targetId === "mars";
    const completedCount = Object.values(this.objectives).filter(Boolean).length;
    const allCompleted = completedCount >= 3;

    this.container.innerHTML = `
      <div class="transit-mission-layout">
        <!-- Top Telemetry Header -->
        <header class="transit-header">
          <div class="transit-brand">
            <span class="transit-badge-icon">${isMars ? '🔴' : '🌕'}</span>
            <div>
              <h2>Deep Space Flight Controller • Earth ⇄ ${dest.name.toUpperCase()}</h2>
              <div class="transit-subtitle">
                NASA Deep Space Network (DSN) • Real-Time Light-Speed Telemetry Link
              </div>
            </div>
          </div>

          <!-- Live Mission Metrics Bar -->
          <div class="transit-hud-stats">
            <div class="transit-stat-box">
              <span class="t-label">FLIGHT PHASE</span>
              <strong class="t-val highlight-val" id="hud-phase">${s.phase}</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">DISTANCE FROM EARTH</span>
              <strong class="t-val" id="hud-dist">${Math.round(s.distanceKm).toLocaleString()} km</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">SPEED OF LIGHT DELAY (1-WAY)</span>
              <strong class="t-val warning-val" id="hud-delay">${fmtDelay(s.lightDelaySec)}</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">CREW COMPLEMENT</span>
              <strong class="t-val">${this.mission.crew} Astronauts</strong>
            </div>
          </div>
        </header>

        <!-- Main 2-Column Flight Deck -->
        <div class="transit-grid">
          <!-- Left: Player Directives & Command Uplink Terminal -->
          <section class="transit-controls-col">
            <!-- Step-by-Step Guidance Box -->
            <div class="transit-guidance-card ${allCompleted ? 'guidance-done' : ''}">
              <div class="guidance-header">
                <div>
                  <span class="guidance-tag">FLIGHT DIRECTOR DIRECTIVE</span>
                  <h3>Deep Space Transit Operations</h3>
                </div>
                <div class="guidance-pts-badge">
                  ${this.pointsAwarded ? '⭐ +5 PTS AWARDED' : '⭐ +5 PTS MISSION'}
                </div>
              </div>

              <p class="guidance-desc">
                Your spacecraft is cruising through deep space toward <strong>${dest.name}</strong>. Because radio signals travel at the speed of light (<strong>299,792 km/s</strong>), your commands to the spacecraft experience a real-time comm delay! Complete the 3 flight directives below to earn <strong>+5 Science Points</strong> and unlock planetary landing:
              </p>

              <!-- Interactive Directives Checklist -->
              <div class="directives-list">
                <div class="directive-item ${this.objectives.solarDeployed ? 'done' : ''}" id="dir-solar">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.solarDeployed ? '✓' : '1'}</span>
                    <div>
                      <strong>Deploy Solar Arrays (100% Orientation)</strong>
                      <div class="dir-hint">Align solar panels toward the Sun to recharge auxiliary batteries.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-solar" ${this.objectives.solarDeployed ? 'disabled' : ''}>
                    ${this.objectives.solarDeployed ? 'Aligned ✓' : 'Deploy Panels ☀️'}
                  </button>
                </div>

                <div class="directive-item ${this.objectives.shieldingRaised ? 'done' : ''}" id="dir-shield">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.shieldingRaised ? '✓' : '2'}</span>
                    <div>
                      <strong>Raise Radiation Shielding Deflection</strong>
                      <div class="dir-hint">Power electromagnetic shields to reduce cosmic ray exposure.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-shield" ${this.objectives.shieldingRaised ? 'disabled' : ''}>
                    ${this.objectives.shieldingRaised ? 'Shielded ✓' : 'Raise Shield 🛡️'}
                  </button>
                </div>

                <div class="directive-item ${this.objectives.rationingConfigured ? 'done' : ''}" id="dir-ration">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.rationingConfigured ? '✓' : '3'}</span>
                    <div>
                      <strong>Optimize Life Support ECLSS Loop</strong>
                      <div class="dir-hint">Calibrate rationing to conserve oxygen and water during deep space cruise.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-ration" ${this.objectives.rationingConfigured ? 'disabled' : ''}>
                    ${this.objectives.rationingConfigured ? 'Calibrated ✓' : 'Optimize ECLSS 🫁'}
                  </button>
                </div>
              </div>

              <!-- Completion Banner & Move Forward Action -->
              <div class="transit-reward-box ${allCompleted ? 'reward-unlocked' : ''}">
                <div class="reward-status-row">
                  <span class="reward-check">${allCompleted ? '🎉' : '⏳'}</span>
                  <div>
                    <strong style="color: ${allCompleted ? 'var(--text-highlight)' : '#fff'}; font-size: 0.95rem;">
                      ${allCompleted ? 'DEEP SPACE FLIGHT DIRECTIVES CERTIFIED!' : `Directives Completed: ${completedCount} / 3`}
                    </strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                      ${allCompleted ? 'Houston confirms telemetry lock across the speed of light delay (+5 Science Points added).' : 'Complete all 3 directives above to certify spacecraft cruise and earn +5 points.'}
                    </div>
                  </div>
                </div>

                <button class="btn-primary btn-proceed-lander" id="btn-transit-to-lander" ${!allCompleted ? 'disabled' : ''}>
                  <span>Proceed to Planetary Landing Descent 🛬</span>
                </button>
              </div>
            </div>

            <!-- Manual Sliders for Advanced Exploration -->
            <div class="transit-sliders-panel">
              <div class="panel-heading">Interactive Flight Controls (Earth Command Uplink)</div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>☀️ Solar Array Alignment</span>
                  <strong id="val-solar">${Math.round(s.controls.solarPanels * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-solar" min="0" max="1" step="0.1" value="${s.controls.solarPanels}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🛡️ Radiation Shielding Deflection</span>
                  <strong id="val-shield">${Math.round(s.controls.shielding * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-shield" min="0" max="1" step="0.1" value="${s.controls.shielding}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🍞 Life Support Rationing Rate</span>
                  <strong id="val-ration">${s.controls.rationing.toFixed(1)}x</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-ration" min="0.5" max="1.5" step="0.1" value="${s.controls.rationing}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🌡️ Cabin Thermal Heaters</span>
                  <strong id="val-heaters">${Math.round(s.controls.heaters * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-heaters" min="0" max="1" step="0.1" value="${s.controls.heaters}">
              </div>
            </div>
          </section>

          <!-- Right: Speed of Light Visualizer & Delayed Telemetry -->
          <section class="transit-telemetry-col">
            <!-- Animated Speed-of-Light Comm Wave Box -->
            <div class="comm-beam-box">
              <div class="beam-endpoints">
                <div class="node-earth">
                  <span>🌍 Earth (Houston DSN)</span>
                  <small id="comm-tx-status">Tx: Online</small>
                </div>
                <div class="beam-line-wrapper">
                  <div class="comm-signal-pulse" id="comm-pulse"></div>
                  <span class="beam-delay-label" id="beam-delay-tag">Signal Delay: ${fmtDelay(s.lightDelaySec)}</span>
                </div>
                <div class="node-craft">
                  <span>🛸 ${s.target} Outpost</span>
                  <small id="comm-rx-status">Rx: Locked</small>
                </div>
              </div>
            </div>

            <!-- Delayed Telemetry Display (What Earth Sees) -->
            <div class="delayed-vitals-card">
              <div class="vitals-header">
                <div>
                  <span class="vitals-sub">DOWNLINK TELEMETRY (EARTH VIEW)</span>
                  <h4>Spacecraft Life Support Vitals</h4>
                </div>
                <div class="delay-chip">
                  Packet Delay: <strong>${fmtDelay(s.lightDelaySec)}</strong>
                </div>
              </div>

              <div class="vitals-meters-grid">
                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>⚡ Electrical Power</span>
                    <strong id="meter-val-power">${Math.round(s.earthView.power)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-power" id="meter-fill-power" style="width: ${s.earthView.power}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🫁 Oxygen Reserves</span>
                    <strong id="meter-val-oxygen">${Math.round(s.earthView.oxygen)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-oxygen" id="meter-fill-oxygen" style="width: ${s.earthView.oxygen}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>💧 Water Loop</span>
                    <strong id="meter-val-water">${Math.round(s.earthView.water)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-water" id="meter-fill-water" style="width: ${s.earthView.water}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🍞 Food Rations</span>
                    <strong id="meter-val-food">${Math.round(s.earthView.food)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-food" id="meter-fill-food" style="width: ${s.earthView.food}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🛡️ Magnetic Shielding</span>
                    <strong id="meter-val-shield">${Math.round(s.earthView.shielding)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-shield" id="meter-fill-shield" style="width: ${s.earthView.shielding}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>☢️ Radiation Level</span>
                    <strong id="meter-val-rad">${(s.earthView.radiation || dest.radiationBase).toFixed(2)} mSv/day</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-rad" id="meter-fill-rad" style="width: ${Math.min(100, (s.earthView.radiation || dest.radiationBase) * 25)}%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Uplink/Downlink Transmission Event Log -->
            <div class="transit-log-card">
              <div class="log-header-title">
                <span>📡 Deep Space Network Event Log:</span>
                <span style="font-size: 0.72rem; color: var(--border-cyan);">Uplink Active</span>
              </div>
              <div class="transit-log-list" id="transit-log-list">
                <div class="t-log-entry">[00:00] Deep Space Network link locked onto ${dest.name} trajectory.</div>
                <div class="t-log-entry">[00:01] Speed of light delay calibrated to ${fmtDelay(s.lightDelaySec)}.</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Quick guidance action buttons
    const btnSolar = this.container.querySelector("#btn-quick-solar");
    const btnShield = this.container.querySelector("#btn-quick-shield");
    const btnRation = this.container.querySelector("#btn-quick-ration");
    const btnProceed = this.container.querySelector("#btn-transit-to-lander");

    if (btnSolar) {
      btnSolar.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("solarPanels", 1.0);
        this.objectives.solarDeployed = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnShield) {
      btnShield.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("shielding", 1.0);
        this.objectives.shieldingRaised = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnRation) {
      btnRation.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("rationing", 0.8);
        this.objectives.rationingConfigured = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnProceed) {
      btnProceed.addEventListener("click", () => {
        sound.playSuccessChime();
        this.cleanup();
        gameState.setScreen("lander");
      });
    }

    // Sliders
    const sSolar = this.container.querySelector("#slider-solar");
    if (sSolar) {
      sSolar.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("solarPanels", val);
        const text = this.container.querySelector("#val-solar");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
        if (val >= 0.9) this.objectives.solarDeployed = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sShield = this.container.querySelector("#slider-shield");
    if (sShield) {
      sShield.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("shielding", val);
        const text = this.container.querySelector("#val-shield");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
        if (val >= 0.8) this.objectives.shieldingRaised = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sRation = this.container.querySelector("#slider-ration");
    if (sRation) {
      sRation.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("rationing", val);
        const text = this.container.querySelector("#val-ration");
        if (text) text.textContent = `${val.toFixed(1)}x`;
        this.objectives.rationingConfigured = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sHeaters = this.container.querySelector("#slider-heaters");
    if (sHeaters) {
      sHeaters.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("heaters", val);
        const text = this.container.querySelector("#val-heaters");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
      });
    }
  }

  checkDirectivesCompletion() {
    const isAll = this.objectives.solarDeployed && this.objectives.shieldingRaised && this.objectives.rationingConfigured;
    if (isAll && !this.pointsAwarded) {
      this.pointsAwarded = true;
      sound.playSuccessChime();
      gameState.addScore(5);
      this.appendLog("🎉 DIRECTIVES CERTIFIED: +5 Science Points awarded by Houston Flight Director!");
    }
  }

  updateDirectivesUI() {
    const completedCount = Object.values(this.objectives).filter(Boolean).length;
    const allCompleted = completedCount >= 3;

    // Update items
    const dirSolar = this.container.querySelector("#dir-solar");
    const btnSolar = this.container.querySelector("#btn-quick-solar");
    if (dirSolar && this.objectives.solarDeployed) {
      dirSolar.classList.add("done");
      if (btnSolar) { btnSolar.disabled = true; btnSolar.textContent = "Aligned ✓"; }
    }

    const dirShield = this.container.querySelector("#dir-shield");
    const btnShield = this.container.querySelector("#btn-quick-shield");
    if (dirShield && this.objectives.shieldingRaised) {
      dirShield.classList.add("done");
      if (btnShield) { btnShield.disabled = true; btnShield.textContent = "Shielded ✓"; }
    }

    const dirRation = this.container.querySelector("#dir-ration");
    const btnRation = this.container.querySelector("#btn-quick-ration");
    if (dirRation && this.objectives.rationingConfigured) {
      dirRation.classList.add("done");
      if (btnRation) { btnRation.disabled = true; btnRation.textContent = "Calibrated ✓"; }
    }

    // Update reward box & proceed button
    const rewardBox = this.container.querySelector(".transit-reward-box");
    const btnProceed = this.container.querySelector("#btn-transit-to-lander");
    if (rewardBox && allCompleted) {
      rewardBox.classList.add("reward-unlocked");
      rewardBox.querySelector("strong").textContent = "DEEP SPACE FLIGHT DIRECTIVES CERTIFIED!";
      rewardBox.querySelector(".reward-check").textContent = "🎉";
      if (btnProceed) btnProceed.disabled = false;
    }
  }

  onMissionUpdate(s) {
    // Update live HUD
    const hudPhase = this.container.querySelector("#hud-phase");
    const hudDist = this.container.querySelector("#hud-dist");
    const hudDelay = this.container.querySelector("#hud-delay");
    const beamTag = this.container.querySelector("#beam-delay-tag");

    if (hudPhase) hudPhase.textContent = s.phase;
    if (hudDist) hudDist.textContent = `${Math.round(s.distanceKm).toLocaleString()} km`;
    if (hudDelay) hudDelay.textContent = fmtDelay(s.lightDelaySec);
    if (beamTag) beamTag.textContent = `Signal Delay: ${fmtDelay(s.lightDelaySec)}`;

    // Update meters
    const v = s.earthView;
    const pVal = this.container.querySelector("#meter-val-power");
    const pFill = this.container.querySelector("#meter-fill-power");
    if (pVal) pVal.textContent = `${Math.round(v.power)}%`;
    if (pFill) pFill.style.width = `${v.power}%`;

    const oVal = this.container.querySelector("#meter-val-oxygen");
    const oFill = this.container.querySelector("#meter-fill-oxygen");
    if (oVal) oVal.textContent = `${Math.round(v.oxygen)}%`;
    if (oFill) oFill.style.width = `${v.oxygen}%`;

    const wVal = this.container.querySelector("#meter-val-water");
    const wFill = this.container.querySelector("#meter-fill-water");
    if (wVal) wVal.textContent = `${Math.round(v.water)}%`;
    if (wFill) wFill.style.width = `${v.water}%`;

    const fVal = this.container.querySelector("#meter-val-food");
    const fFill = this.container.querySelector("#meter-fill-food");
    if (fVal) fVal.textContent = `${Math.round(v.food)}%`;
    if (fFill) fFill.style.width = `${v.food}%`;

    const sVal = this.container.querySelector("#meter-val-shield");
    const sFill = this.container.querySelector("#meter-fill-shield");
    if (sVal) sVal.textContent = `${Math.round(v.shielding)}%`;
    if (sFill) sFill.style.width = `${v.shielding}%`;

    const rVal = this.container.querySelector("#meter-val-rad");
    const rFill = this.container.querySelector("#meter-fill-rad");
    if (rVal) rVal.textContent = `${(v.radiation || 1.2).toFixed(2)} mSv/day`;
    if (rFill) rFill.style.width = `${Math.min(100, (v.radiation || 1.2) * 25)}%`;
  }

  onMissionLog(entry) {
    this.appendLog(entry.msg);
  }

  onMissionAlert(type) {
    sound.playWarningAlarm();
    this.appendLog(`🚨 DSN PRIORITY ALERT: Deep space ${type.replace(/_/g, " ").toUpperCase()} detected!`);
  }

  appendLog(msg) {
    const list = this.container.querySelector("#transit-log-list");
    if (!list) return;

    const row = document.createElement("div");
    row.className = "t-log-entry";
    const ts = new Date().toTimeString().slice(0, 8);
    row.textContent = `[${ts}] ${msg}`;
    list.prepend(row);

    // Keep log concise
    if (list.children.length > 8) {
      list.lastElementChild.remove();
    }
  }

  cleanup() {
    if (this.mission) {
      this.mission.stop();
      if (this.updateHandler) this.mission.removeEventListener("update", this.updateHandler);
      if (this.logHandler) this.mission.removeEventListener("log", this.logHandler);
      if (this.alertHandler) this.mission.removeEventListener("alert", this.alertHandler);
    }
  }

  destroy() {
    this.cleanup();
  }
}

