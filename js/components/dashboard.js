// ============================================================================
// MISSION CONTROL DASHBOARD COMPONENT
// Displays 8 Core Telemetry Metrics, Animated Resource Bars, Warning Indicators,
// Dynamic Mission Readiness Percentage & 5 Functional Navigation Buttons
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { phaserEngine } from "../phaserEngine.js";

export class DashboardComponent {
  constructor(containerEl, modalHandlers = {}) {
    this.container = containerEl;
    this.modalHandlers = modalHandlers;
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();

    this.unsubscribe = gameState.subscribe((state, event) => {
      if (state.activeModal === null) {
        this.updateView();
      }
    });
  }

  render() {
    const s = gameState.state;
    const t = s.telemetry;
    const readiness = s.missionReadiness;
    const rStatus = s.readinessStatus;
    const rocket = GAME_CONFIG.ROCKETS[s.selectedRocket] || GAME_CONFIG.ROCKETS.sls;
    const astronaut = GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut] || GAME_CONFIG.ASTRONAUTS.alex;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;

    // Format Mission Elapsed Time (MET)
    const hours = String(Math.floor(s.metSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s.metSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(s.metSeconds % 60).padStart(2, "0");
    const metFormatted = `+${hours}:${mins}:${secs}`;

    this.container.innerHTML = `
      <div class="dashboard-wrapper">
        <!-- Top Telemetry & Status HUD Bar -->
        <header class="hud-top-bar">
          <div class="hud-brand">
            <div class="hud-patch" title="NASA Space Apps Challenge">🚀</div>
            <div>
              <h1 class="hud-title">MISSION CONTROL FLIGHT DASHBOARD</h1>
              <div class="hud-meta">
                <span>MET <strong>${metFormatted}</strong></span>
                <span>• DSN SIGNAL: <strong>${s.dsnSignalStrength}% NOMINAL</strong></span>
                <span>• HOUSTON COMM: <strong>ONLINE</strong></span>
              </div>
            </div>
          </div>

          <!-- Active Mission Configuration Badges -->
          <div class="hud-config-pills">
            <div class="hud-pill" id="pill-rocket" title="Click to open Rocket Selection">
              <span>🚀 Spacecraft:</span>
              <strong>${rocket.name.split('(')[0].trim()}</strong>
            </div>
            <div class="hud-pill" id="pill-astronaut" title="Click to open Astronaut Preparation">
              <span>👨‍🚀 Commander:</span>
              <strong>${astronaut.name.split(' ')[1]}</strong>
            </div>
            <div class="hud-pill" id="pill-destination" title="Click to open Mission Briefing">
              <span>🎯 Target:</span>
              <strong>${dest.name.split('(')[0].trim()}</strong>
            </div>
          </div>
        </header>

        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 2 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Balance your 8 primary life support supplies using the <strong>[ + / - ]</strong> buttons until Launch Readiness reaches <strong>90%+</strong>. Then click <strong style="color: var(--text-highlight);">[Select Rocket 🛸]</strong> on the right to configure your spacecraft!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-dashboard-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Main Dashboard 2-Column Layout -->
        <div class="dashboard-main-grid">
          <!-- Left / Center: The 8 Required Telemetry Metrics -->
          <section class="telemetry-section">
            <div class="section-header-row">
              <div class="section-title-box">
                <span class="live-dot"></span>
                <h2>PRIMARY FLIGHT TELEMETRY (8 SYSTEMS)</h2>
              </div>
              <div class="telemetry-hint">
                Interactive: Use <strong>+ / -</strong> buttons to test warning states
              </div>
            </div>

            <!-- The 8 Metrics Grid -->
            <div class="metrics-grid">
              ${this.renderMetricCard("oxygen", "1. Oxygen Supply", t.oxygen, "%", "950 kPa", "🫁")}
              ${this.renderMetricCard("food", "2. Food Supply", t.food, "%", "270 Rations", "🍞")}
              ${this.renderMetricCard("water", "3. Water Supply", t.water, "%", "440 Liters", "💧")}
              ${this.renderMetricCard("power", "4. Electrical Power", t.power, "%", "120 kW", "⚡")}
              ${this.renderMetricCard("rocketFuel", "5. Rocket Fuel", t.rocketFuel, "%", "2,850 Tons", "⛽")}
              ${this.renderMetricCard("cargoCapacity", "6. Cargo Capacity", t.cargoCapacity, "%", "37 / 50 Tons", "📦")}
              ${this.renderMetricCard("astronautHealth", "7. Astronaut Health", t.astronautHealth, "%", "BPM 68", "❤️")}
              ${this.renderMetricCard("missionDuration", "8. Mission Duration", t.missionDuration, " Days", "Flight Plan", "⏱️")}
            </div>

            <!-- Crisis & Telemetry Simulation Console -->
            <div class="simulation-console">
              <div class="sim-header">
                <span>⚡ Real-Time Diagnostic & Stress Simulation:</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Test warning indicators, animated bars & readiness calculation:</span>
              </div>
              <div class="sim-buttons-row">
                <button class="btn-sim" id="btn-sim-o2">⚠️ Simulate O₂ Leak</button>
                <button class="btn-sim" id="btn-sim-fuel">⛽ Simulate Fuel Leak</button>
                <button class="btn-sim" id="btn-sim-power">⚡ Simulate Solar Flare</button>
                <button class="btn-sim" id="btn-sim-cargo">📦 Simulate Overload</button>
                <button class="btn-sim btn-sim-restore" id="btn-sim-restore">🔄 Restore Nominal (100%)</button>
              </div>
            </div>
          </section>

          <!-- Right Column: Mission Readiness Arc Gauge & Diagnostics -->
          <aside class="readiness-panel">
            <div class="panel-header">
              <h3>MISSION READINESS</h3>
              <div class="readiness-beacon ${readiness >= 80 ? 'beacon-go' : (readiness >= 50 ? 'beacon-hold' : 'beacon-abort')}"></div>
            </div>

            <!-- Circular / Arc Readiness Meter -->
            <div class="readiness-gauge-box">
              <svg class="readiness-svg" viewBox="0 0 160 160">
                <circle class="gauge-bg" cx="80" cy="80" r="68"></circle>
                <circle 
                  class="gauge-fill ${readiness >= 80 ? 'fill-go' : (readiness >= 50 ? 'fill-hold' : 'fill-abort')}" 
                  cx="80" 
                  cy="80" 
                  r="68"
                  style="stroke-dasharray: 427; stroke-dashoffset: ${427 - (427 * readiness) / 100};"
                ></circle>
              </svg>
              <div class="readiness-center-text">
                <span class="readiness-pct">${readiness}%</span>
                <span class="readiness-sublabel">OVERALL</span>
              </div>
            </div>

            <!-- Readiness Status Tag -->
            <div class="readiness-status-banner ${readiness >= 80 ? 'status-go' : (readiness >= 50 ? 'status-hold' : 'status-abort')}">
              ${rStatus}
            </div>

            <!-- Flight Readiness Criteria Checklist -->
            <div class="readiness-criteria-list">
              <div class="criteria-row ${t.oxygen >= 35 && t.water >= 30 && t.food >= 30 ? 'crit-ok' : 'crit-fail'}">
                <span>🫁 ECLSS Life Support Systems</span>
                <strong>${t.oxygen >= 35 && t.water >= 30 && t.food >= 30 ? '✓ OK' : '⚠ WARNING'}</strong>
              </div>
              <div class="criteria-row ${t.power >= 30 ? 'crit-ok' : 'crit-fail'}">
                <span>⚡ Electrical Power Storage</span>
                <strong>${t.power >= 30 ? '✓ OK' : '⚠ LOW'}</strong>
              </div>
              <div class="criteria-row ${t.rocketFuel >= 40 ? 'crit-ok' : 'crit-fail'}">
                <span>⛽ Propulsion & Fuel Reserves</span>
                <strong>${t.rocketFuel >= 40 ? '✓ OK' : '⚠ DEFICIT'}</strong>
              </div>
              <div class="criteria-row ${t.cargoCapacity <= 90 ? 'crit-ok' : 'crit-fail'}">
                <span>📦 Payload Mass Distribution</span>
                <strong>${t.cargoCapacity <= 90 ? '✓ OPTIMAL' : '⚠ OVERWEIGHT'}</strong>
              </div>
              <div class="criteria-row ${t.astronautHealth >= 50 ? 'crit-ok' : 'crit-fail'}">
                <span>❤️ Commander Biometrics</span>
                <strong>${t.astronautHealth >= 50 ? '✓ FIT' : '⚠ STRESS'}</strong>
              </div>
            </div>

            <!-- Telemetry Warning Logs Feed -->
            <div class="telemetry-log-box">
              <div class="log-title">Live Telemetry Event Log:</div>
              <div class="log-entries">
                ${s.warningLogs.length > 0 
                  ? s.warningLogs.map(l => `<div class="log-entry"><span class="log-time">[${l.timestamp}]</span> ${l.message}</div>`).join('') 
                  : '<div class="log-nominal">All telemetry channels transmitting nominal data. No active faults.</div>'}
              </div>
            </div>
          </aside>
        </div>

        <!-- Functional Navigation Buttons Bar -->
        <nav class="navigation-dock">
          <button class="nav-btn btn-nav-start" id="nav-btn-start" title="Run Pre-Flight Go/No-Go Poll and Countdown">
            <span class="nav-icon">🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label">Start Mission</span>
              <span class="nav-sub">Launch Sequence</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-rocket" title="Configure Spacecraft in Vehicle Hangar">
            <span class="nav-icon">🛸</span>
            <div class="nav-btn-text">
              <span class="nav-label">Rocket Selection</span>
              <span class="nav-sub">Hangar & Payload</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-astronaut" title="Biometric Check and Crew Quarters">
            <span class="nav-icon">👨‍🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label">Astronaut Preparation</span>
              <span class="nav-sub">Crew & Biomedical</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-briefing" title="Flight Trajectory and Mission Duration">
            <span class="nav-icon">📋</span>
            <div class="nav-btn-text">
              <span class="nav-label">Mission Briefing</span>
              <span class="nav-sub">Flight Operations</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-achievements" title="NASA Flight Badges and Certifications">
            <span class="nav-icon">🏆</span>
            <div class="nav-btn-text">
              <span class="nav-label">Achievements</span>
              <span class="nav-sub">Flight Honors</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-greenhouse" title="60-Day Orbital Greenhouse Survival Control" style="border-color: #2ecc71;">
            <span class="nav-icon">🌱</span>
            <div class="nav-btn-text">
              <span class="nav-label" style="color: #a9dfbf;">Greenhouse</span>
              <span class="nav-sub">60-Day Survival</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-extraction" title="Final Mission: Lunar Resupply & Extraction" style="border-color: #00e5ff;">
            <span class="nav-icon">🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label" style="color: #80d8ff;">Extraction</span>
              <span class="nav-sub">Final Resupply</span>
            </div>
          </button>
        </nav>
      </div>
    `;
  }

  renderMetricCard(key, label, value, unit, detail, icon) {
    const status = gameState.getMetricStatus(key);
    const spec = GAME_CONFIG.METRICS[key];
    const fillPercent = key === "missionDuration" ? Math.min(100, (value / 180) * 100) : Math.min(100, Math.max(0, value));

    let statusText = "NOMINAL";
    let badgeClass = "badge-nominal";

    if (status === "critical") {
      statusText = "CRITICAL";
      badgeClass = "badge-critical";
    } else if (status === "caution") {
      statusText = "CAUTION";
      badgeClass = "badge-caution";
    } else if (value >= 85 && key !== "cargoCapacity") {
      statusText = "OPTIMAL";
      badgeClass = "badge-optimal";
    }

    return `
      <div class="metric-card ${status === 'critical' ? 'card-critical' : (status === 'caution' ? 'card-caution' : '')}" data-metric-key="${key}">
        <div class="metric-card-top">
          <div class="metric-name-group">
            <span class="metric-icon">${icon}</span>
            <span class="metric-title">${label}</span>
          </div>
          <div class="metric-status-badge ${badgeClass}">
            ${statusText}
          </div>
        </div>

        <div class="metric-value-row">
          <div class="metric-numerical">
            <span class="number-main">${value}</span>
            <span class="unit-main">${unit}</span>
          </div>
          <div class="metric-detail-unit">${detail}</div>
        </div>

        <!-- Animated Glowing Resource Bar -->
        <div class="metric-bar-track">
          <div 
            class="metric-bar-fill fill-${key} ${status === 'critical' ? 'bar-critical' : (status === 'caution' ? 'bar-caution' : '')}" 
            style="width: ${fillPercent}%;"
          ></div>
        </div>

        <!-- Interactive Adjusters -->
        <div class="metric-card-controls">
          <button class="btn-step btn-step-down" data-metric="${key}" data-delta="-5" title="Decrease ${label}">-</button>
          <input 
            type="range" 
            class="metric-quick-slider" 
            min="${spec ? spec.min : 0}" 
            max="${spec ? spec.max : 100}" 
            value="${value}" 
            data-metric="${key}"
          >
          <button class="btn-step btn-step-up" data-metric="${key}" data-delta="+5" title="Increase ${label}">+</button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // 5 Navigation Buttons
    const btnStart = this.container.querySelector("#nav-btn-start");
    const btnRocket = this.container.querySelector("#nav-btn-rocket");
    const btnAstronaut = this.container.querySelector("#nav-btn-astronaut");
    const btnBriefing = this.container.querySelector("#nav-btn-briefing");
    const btnAchievements = this.container.querySelector("#nav-btn-achievements");

    if (btnStart && this.modalHandlers.onStartMission) {
      btnStart.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onStartMission();
      });
    }

    if (btnRocket && this.modalHandlers.onRocketSelect) {
      btnRocket.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onRocketSelect();
      });
    }

    if (btnAstronaut && this.modalHandlers.onAstronautPrep) {
      btnAstronaut.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAstronautPrep();
      });
    }

    if (btnBriefing && this.modalHandlers.onMissionBriefing) {
      btnBriefing.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onMissionBriefing();
      });
    }

    if (btnAchievements && this.modalHandlers.onAchievements) {
      btnAchievements.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAchievements();
      });
    }

    const btnGreenhouse = this.container.querySelector("#nav-btn-greenhouse");
    if (btnGreenhouse) {
      btnGreenhouse.addEventListener("click", () => {
        sound.playClick();
        if (window.greenhouseModal) {
          window.greenhouseModal.open();
        }
      });
    }

    const btnExtraction = this.container.querySelector("#nav-btn-extraction");
    if (btnExtraction) {
      btnExtraction.addEventListener("click", () => {
        sound.playClick();
        if (window.extractionModal) {
          window.extractionModal.open();
        }
      });
    }

    const btnGuide = this.container.querySelector("#btn-dashboard-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("first_mission");
        }
      });
    }

    // Top Header Pills as shortcuts
    const pillRocket = this.container.querySelector("#pill-rocket");
    const pillAstronaut = this.container.querySelector("#pill-astronaut");
    const pillDest = this.container.querySelector("#pill-destination");

    if (pillRocket && this.modalHandlers.onRocketSelect) {
      pillRocket.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onRocketSelect();
      });
    }
    if (pillAstronaut && this.modalHandlers.onAstronautPrep) {
      pillAstronaut.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAstronautPrep();
      });
    }
    if (pillDest && this.modalHandlers.onMissionBriefing) {
      pillDest.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onMissionBriefing();
      });
    }

    // Interactive Telemetry Step Buttons (+ / -)
    this.container.querySelectorAll(".btn-step").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const metricKey = btn.getAttribute("data-metric");
        const delta = parseInt(btn.getAttribute("data-delta"), 10);
        sound.playAdjustTone(delta > 0);
        gameState.adjustMetric(metricKey, delta);
        this.render();
        this.attachEvents();
      });
    });

    // Quick Sliders for each metric
    this.container.querySelectorAll(".metric-quick-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const metricKey = slider.getAttribute("data-metric");
        const val = parseInt(e.target.value, 10);
        gameState.setMetric(metricKey, val);
      });

      slider.addEventListener("change", () => {
        sound.playClick();
        this.render();
        this.attachEvents();
      });
    });

    // Stress & Crisis Simulation Buttons
    const simO2 = this.container.querySelector("#btn-sim-o2");
    const simFuel = this.container.querySelector("#btn-sim-fuel");
    const simPower = this.container.querySelector("#btn-sim-power");
    const simCargo = this.container.querySelector("#btn-sim-cargo");
    const simRestore = this.container.querySelector("#btn-sim-restore");

    if (simO2) {
      simO2.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("o2_scrubber");
        this.render();
        this.attachEvents();
      });
    }

    if (simFuel) {
      simFuel.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("fuel_leak");
        this.render();
        this.attachEvents();
      });
    }

    if (simPower) {
      simPower.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("solar_flare");
        this.render();
        this.attachEvents();
      });
    }

    if (simCargo) {
      simCargo.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("cargo_overload");
        this.render();
        this.attachEvents();
      });
    }

    if (simRestore) {
      simRestore.addEventListener("click", () => {
        sound.playSuccessChime();
        gameState.restoreNominal();
        this.render();
        this.attachEvents();
      });
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
