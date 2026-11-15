// ============================================================================
// SURFACE EXPEDITION & BASE CAMP SETUP COMPONENT
// 8 Vitals HUD, Objective Timer, Shelter Mechanics, Visual Hazards & Trade-Offs
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { HazardEventManager } from "./events.js";
import { SurfaceMissionsManager } from "./surfaceMissions.js";

export class SurfaceCampComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.unsubscribe = null;
    this.hazardManager = null;
    this.missionsManager = null;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Interactive surface astronaut
    this.astronaut = {
      x: 320,
      y: 405,
      vx: 0,
      facing: 1,
      isWalking: false,
      stepCycle: 0
    };

    this.keys = { left: false, right: false };

    // Build sites on surface (coordinates on canvas)
    this.buildSites = [
      { id: "site_1", x: 140, y: 360, width: 90, height: 70, module: null },
      { id: "site_2", x: 260, y: 350, width: 90, height: 70, module: null },
      { id: "site_3", x: 380, y: 355, width: 90, height: 70, module: null },
      { id: "site_4", x: 500, y: 345, width: 90, height: 70, module: null }
    ];

    this.resourceNodes = [];
    this.selectedToolboxModule = null;
    this.tradeOffPromptShown = false;

    this.init();
  }

  init() {
    this.hazardManager = new HazardEventManager(document.getElementById("modal-container"));
    this.missionsManager = new SurfaceMissionsManager(document.getElementById("modal-container"));

    this.render();
    this.setupCanvas();
    this.attachEvents();
    this.setupResourceNodes();
    this.loop();

    this.hazardManager.startMonitoring();
    this.showStageWelcomeFact();

    this.unsubscribe = gameState.subscribe((state, event, payload) => {
      if (state.screen === "surface") {
        if (event === "telemetry_tick" || event === "timer_tick" || event === "objective_progress" || event === "objective_completed") {
          this.updateTelemetryHud();
          this.updateObjectivesHud();
          this.checkDecisionPressurePrompts();
        }
      }
    });
  }

  showStageWelcomeFact() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(14, 23, 42, 0.96);
      border: 2px solid var(--border-cyan);
      box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);
      color: #fff;
      padding: 14px 22px;
      border-radius: 12px;
      z-index: 1000;
      max-width: 550px;
      text-align: center;
      animation: fadeIn 0.4s ease;
    `;
    toast.innerHTML = `
      <div style="font-size: 0.75rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800; text-transform: uppercase;">
        📡 NASA FLIGHT DIRECTOR TRANSMISSION
      </div>
      <div style="font-size: 0.95rem; font-weight: 800; margin: 4px 0;">
        Touchdown Confirmed: ${dest.name} Surface Operations!
      </div>
      <div style="font-size: 0.82rem; color: #cfd8dc; line-height: 1.45;">
        ${dest.nasaFact}
      </div>
      <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-highlight);">
        Gravity: ${dest.gravityMps2} m/s² • Temp: ${dest.surfaceTemp} • Radiation: ${dest.radiationLevel} mSv/hr
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 6000);
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const placed = s.campPlacedModules;
    const t = s.telemetry;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Surface Header: 8 Life Support Vitals Bar -->
        <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.15rem; font-weight: 800; color: ${dest.themeColor};">
                ${dest.name} Base Camp Alpha
              </span>
              <span id="shelter-status-tag" style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1); color: #fff;">
                EVA Spacewalk (Unsheltered)
              </span>
            </div>

            <!-- Objective Countdown Timer -->
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; font-weight: 800; color: var(--accent-gold); background: rgba(0,0,0,0.5); padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(255,214,0,0.3);">
                ⏱️ TIME REMAINING: <span id="objective-countdown-text">${this.formatTime(s.missionTimeLeftSec)}</span>
              </div>
              <button class="btn-primary" id="btn-complete-mission" style="padding: 8px 16px; font-size: 0.85rem;" ${!gameState.areAllObjectivesComplete() ? 'disabled' : ''}>
                <span>Depart & Debrief 📋</span>
              </button>
            </div>
          </div>

          <!-- All 8 Vitals in Compact Grid -->
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px;" id="surface-vitals-strip">
            ${this.renderMiniMeter("🫁 O₂", Math.round(t.oxygen), "var(--meter-oxygen)", "%")}
            ${this.renderMiniMeter("💧 H₂O", Math.round(t.water), "var(--meter-water)", "%")}
            ${this.renderMiniMeter("🍞 Food", Math.round(t.food), "var(--meter-food)", "%")}
            ${this.renderMiniMeter("⚡ Power", Math.round(t.power), "var(--meter-power)", "%")}
            ${this.renderMiniMeter("🌡️ Temp", Math.round(t.temperature), "#29b6f6", "°C")}
            ${this.renderMiniMeter("☢️ Rad", t.radiation.toFixed(1), "#ffd600", "mSv")}
            ${this.renderMiniMeter("🛡️ Suit", Math.round(t.suitIntegrity), "#ab47bc", "%")}
            ${this.renderMiniMeter("❤️ Health", Math.round(t.crewHealth), "#00e676", "%")}
          </div>
        </div>

        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 8 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Explore the surface with <strong>[A / D]</strong>! Place modules from your toolbox, drill core samples, or click <strong style="color: #b08968;">[🧹 Mission: Debris Cleanup (+100 Pts)]</strong> to investigate the crashed wreckage!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-surface-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Surface Layout Grid -->
        <div class="surface-layout">
          <!-- Left: Toolbox & Mission Objectives Checklist -->
          <aside class="surface-toolbox">
            <!-- Mandatory Mission Objectives Card -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,214,0,0.3); border-radius: var(--radius-md); padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--accent-gold); font-size: 0.85rem;">🎯 MANDATORY OBJECTIVES</strong>
                <span style="font-size: 0.72rem; color: var(--text-muted);" id="objectives-ratio-text">
                  ${s.levelObjectives.filter(o => o.completed).length} / ${s.levelObjectives.length} Done
                </span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;" id="surface-objectives-checklist">
                ${this.renderObjectivesChecklist()}
              </div>
            </div>

            <!-- Base Camp Module Builder -->
            <div class="panel-title" style="margin-top: 6px;">
              <span>🏗️ Base Camp Toolbox</span>
              <span style="font-size: 0.78rem; color: var(--accent-gold);">${placed.length} / 4 Placed</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;" id="toolbox-modules-list">
              ${this.renderToolboxModules()}
            </div>

            <!-- Net Life Support Generation Ticker -->
            <div style="background: rgba(0, 229, 255, 0.08); border-left: 3px solid var(--border-cyan); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem;" id="net-production-ticker">
              ${this.renderNetProductionHtml()}
            </div>

            <!-- Science Operations -->
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; display: flex; flex-direction: column; gap: 6px;">
              <button class="btn-primary" id="btn-run-debris-cleanup" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #b08968, #7f5539); border: 1px solid #b08968; color: #fff; font-weight: 700; box-shadow: 0 0 12px rgba(176,137,104,0.4);">
                <span>🧹 Mission 2: Debris Cleanup (+100 Pts)</span>
              </button>
              <button class="btn-primary" id="btn-run-greenhouse-survival" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #27ae60, #1b5e20); border: 1px solid #2ecc71; color: #fff; font-weight: 700; box-shadow: 0 0 12px rgba(46, 204, 113, 0.4);">
                <span>🌱 Mission 3: Combined Greenhouse Survival (60 Days)</span>
              </button>
              <button class="btn-primary" id="btn-run-extraction" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #00e5ff, #0288d1); border: 1px solid #00e5ff; color: #000; font-weight: 800; box-shadow: 0 0 14px rgba(0,229,255,0.4);">
                <span>🚀 Final Mission: Resupply & Extraction (+1000 Pts)</span>
              </button>
              <button class="btn-secondary" id="btn-run-spectrometer" style="font-size: 0.8rem; justify-content: flex-start; padding: 8px 12px;">
                <span>🔬 Laser Spectrometer Rock Analysis</span>
              </button>
            </div>
          </aside>

          <!-- Right: Surface Interactive Canvas -->
          <div class="surface-canvas-wrapper">
            <canvas id="surface-canvas" class="game-canvas"></canvas>

            <div style="position: absolute; top: 12px; left: 16px; background: rgba(0,0,0,0.7); padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; pointer-events: none; border: 1px solid rgba(255,255,255,0.15);">
              <div>🎮 Walk with <strong>[A / D]</strong> or touch buttons. Walk into the <strong>Habitat Dome</strong> to shelter from storms!</div>
            </div>

            <!-- On-screen walking & rover buttons for mobile/tablet -->
            <div style="position: absolute; bottom: 16px; left: 16px; display: flex; gap: 8px; z-index: 10; align-items: center;">
              <button class="btn-icon" id="btn-walk-left" style="width: 48px; height: 48px; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan); font-size: 1.4rem;">◀</button>
              <button class="btn-icon" id="btn-walk-right" style="width: 48px; height: 48px; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan); font-size: 1.4rem;">▶</button>
              <button class="btn-secondary" id="btn-toggle-rover" style="font-size: 0.8rem; padding: 10px 14px; background: rgba(0,0,0,0.7); border: 2px solid var(--border-cyan); color: #fff;">
                🏎️ Mount Rover [R]
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  formatTime(totalSec) {
    const mins = Math.floor(Math.max(0, totalSec) / 60);
    const secs = Math.max(0, totalSec) % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  renderMiniMeter(label, val, color, unit) {
    const isWarn = (typeof val === 'number') && (val < 20);
    return `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 6px 8px; text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted);">${label}</div>
        <div style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 0.88rem; color: ${isWarn ? 'var(--accent-red)' : color}; margin-top: 2px;">
          ${val}${unit}
        </div>
      </div>
    `;
  }

  renderObjectivesChecklist() {
    const s = gameState.state;
    return s.levelObjectives.map((obj) => {
      return `
        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid ${obj.completed ? 'var(--text-highlight)' : 'rgba(255,255,255,0.2)'}; padding: 6px 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 700; color: ${obj.completed ? 'var(--text-highlight)' : '#fff'};">
              ${obj.icon} ${obj.title}
            </div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">
              Progress: <strong>${obj.currentCount} / ${obj.targetCount}</strong>
            </div>
          </div>
          <div style="font-size: 0.9rem; font-weight: 800; color: ${obj.completed ? 'var(--text-highlight)' : 'rgba(255,255,255,0.3)'};">
            ${obj.completed ? '✓ DONE' : '○'}
          </div>
        </div>
      `;
    }).join("");
  }

  renderToolboxModules() {
    const s = gameState.state;
    return Object.values(GAME_CONFIG.BASE_MODULES).map((mod) => {
      const isAlreadyPlaced = s.campPlacedModules.includes(mod.id);
      const isSelected = this.selectedToolboxModule === mod.id;

      return `
        <div class="module-card-draggable ${isSelected ? 'selected' : ''}" 
             data-mod-id="${mod.id}"
             style="border-color: ${isSelected ? 'var(--accent-gold)' : (isAlreadyPlaced ? 'rgba(0, 230, 118, 0.4)' : 'rgba(255,255,255,0.1)')}; background: ${isSelected ? 'rgba(255, 214, 0, 0.15)' : ''}; padding: 8px 10px;">
          <span style="font-size: 1.6rem;">${mod.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.8rem; color: #fff;">${mod.name}</div>
            <div style="font-size: 0.68rem; color: var(--text-highlight);">
              ${mod.powerDraw < 0 ? `⚡ +${Math.abs(mod.powerDraw)} kW` : `⚡ -${mod.powerDraw} kW`}
              ${mod.o2Gen > 0 ? ` • 🫁 +${mod.o2Gen} O₂/s` : ''}
              ${mod.foodGen > 0 ? ` • 🍞 +${mod.foodGen}/s` : ''}
              ${mod.waterGen > 0 ? ` • 💧 +${mod.waterGen}/s` : ''}
            </div>
          </div>
          <div>
            ${isAlreadyPlaced ? `<span style="color: var(--text-highlight); font-size: 0.72rem; font-weight: 800;">✓ DEPLOYED</span>` : `<button class="btn-step" style="width: auto; padding: 2px 8px; font-size: 0.7rem;">Deploy</button>`}
          </div>
        </div>
      `;
    }).join("");
  }

  renderNetProductionHtml() {
    const s = gameState.state;
    let netPower = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.power;
    let netO2 = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.oxygen;
    let netFood = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.food;
    let netWater = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.water;

    s.campPlacedModules.forEach((modId) => {
      const m = GAME_CONFIG.BASE_MODULES[modId];
      if (m) {
        netPower -= m.powerDraw;
        netO2 += m.o2Gen || 0;
        netFood += m.foodGen || 0;
        netWater += m.waterGen || 0;
      }
    });

    const formatRate = (rate) => (rate >= 0 ? `+${rate.toFixed(1)}/s` : `${rate.toFixed(1)}/s`);

    return `
      <div style="font-weight: 800; color: #fff; margin-bottom: 2px;">Net Life Support Generation:</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; font-size: 0.7rem;">
        <div>⚡ Power: <strong style="color: ${netPower >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netPower)}</strong></div>
        <div>🫁 O₂ Air: <strong style="color: ${netO2 >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netO2)}</strong></div>
        <div>🍞 Food: <strong style="color: ${netFood >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netFood)}</strong></div>
        <div>💧 Water: <strong style="color: ${netWater >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netWater)}</strong></div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#surface-canvas");
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : {};
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 800);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    const placed = gameState.state.campPlacedModules;
    this.buildSites.forEach((site, idx) => {
      site.module = placed[idx] || null;
    });
  }

  setupResourceNodes() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const gatherables = dest.gatherables || [];
    this.resourceNodes = [];

    const positions = [
      { x: 90, y: 440 },
      { x: 670, y: 430 },
      { x: 740, y: 380 }
    ];

    gatherables.forEach((g, idx) => {
      const pos = positions[idx] || { x: 200 + idx * 150, y: 420 };
      this.resourceNodes.push({
        ...g,
        x: pos.x,
        y: pos.y,
        radius: 24,
        pulse: 0
      });
    });

    // Crashed probe debris recovery site on lunar/planetary terrain
    this.resourceNodes.push({
      id: "debris_crash_site",
      name: "Crash Site Alpha (Debris Cleanup)",
      icon: "🧹",
      type: "debris",
      x: 640,
      y: 410,
      radius: 28,
      pulse: 0
    });
  }

  attachEvents() {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const btnLeft = this.container.querySelector("#btn-walk-left");
    const btnRight = this.container.querySelector("#btn-walk-right");
    if (btnLeft && btnRight) {
      btnLeft.addEventListener("pointerdown", () => { this.keys.left = true; });
      btnLeft.addEventListener("pointerup", () => { this.keys.left = false; });
      btnLeft.addEventListener("pointercancel", () => { this.keys.left = false; });

      btnRight.addEventListener("pointerdown", () => { this.keys.right = true; });
      btnRight.addEventListener("pointerup", () => { this.keys.right = false; });
      btnRight.addEventListener("pointercancel", () => { this.keys.right = false; });
    }

    // Select module in toolbox
    this.container.querySelectorAll(".module-card-draggable").forEach((card) => {
      card.addEventListener("click", () => {
        const modId = card.getAttribute("data-mod-id");
        if (gameState.state.campPlacedModules.includes(modId)) {
          sound.playClick();
          return;
        }

        sound.playClick();
        this.selectedToolboxModule = (this.selectedToolboxModule === modId) ? null : modId;
        this.updateToolboxView();
      });
    });

    // Canvas click interaction
    if (this.canvas) {
      this.canvas.addEventListener("click", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        this.astronaut.targetX = clickX;

        // Check if clicked a Resource Deposit or Debris Site
        for (let node of this.resourceNodes) {
          const dist = Math.hypot(clickX - node.x, clickY - node.y);
          if (dist <= node.radius + 14) {
            if (node.type === "debris" || node.id === "debris_crash_site") {
              gameState.activeActivity = "debris_cleanup";
              this.missionsManager.startDebrisCleanupMission(() => {
                gameState.activeActivity = null;
              });
              return;
            }
            gameState.activeActivity = "digging";
            this.missionsManager.startDrillMission(node, () => {
              gameState.activeActivity = null;
            });
            return;
          }
        }

        // Check if clicked a Build Site
        for (let site of this.buildSites) {
          if (
            clickX >= site.x &&
            clickX <= site.x + site.width &&
            clickY >= site.y &&
            clickY <= site.y + site.height
          ) {
            if (this.selectedToolboxModule && !site.module) {
              sound.playSuccessChime();
              site.module = this.selectedToolboxModule;
              gameState.state.campPlacedModules.push(this.selectedToolboxModule);
              gameState.addScore(45);

              // Progress corresponding level objective if applicable
              if (this.selectedToolboxModule === "solar") gameState.progressObjective("moon_solar", 1);
              if (this.selectedToolboxModule === "habitat") gameState.progressObjective("mars_habitat", 1);
              if (this.selectedToolboxModule === "oxygen_gen") gameState.progressObjective("mars_moxie", 1);
              if (this.selectedToolboxModule === "greenhouse") gameState.progressObjective("mars_greenhouse", 1);

              this.selectedToolboxModule = null;
              this.updateToolboxView();
              return;
            } else if (site.module) {
              sound.playQuindar();
              const mod = GAME_CONFIG.BASE_MODULES[site.module];
              if (site.module === "greenhouse" && window.greenhouseModal) {
                window.greenhouseModal.open();
              } else {
                alert(`Active Facility: ${mod.name}\n${mod.description}`);
              }
              return;
            }
          }
        }
      });
    }

    // Greenhouse Survival Mission
    const ghBtn = this.container.querySelector("#btn-run-greenhouse-survival");
    if (ghBtn) {
      ghBtn.addEventListener("click", () => {
        gameState.activeActivity = "greenhouse_survival";
        if (window.greenhouseModal) {
          window.greenhouseModal.open(() => {
            gameState.activeActivity = null;
          });
        }
      });
    }

    // Final Mission: Resupply & Extraction
    const extBtn = this.container.querySelector("#btn-run-extraction");
    if (extBtn) {
      extBtn.addEventListener("click", () => {
        gameState.activeActivity = "lunar_extraction";
        if (window.extractionModal) {
          window.extractionModal.open(() => {
            gameState.activeActivity = null;
          });
        }
      });
    }

    // Debris Cleanup Mission
    const debrisBtn = this.container.querySelector("#btn-run-debris-cleanup");
    if (debrisBtn) {
      debrisBtn.addEventListener("click", () => {
        gameState.activeActivity = "debris_cleanup";
        this.missionsManager.startDebrisCleanupMission(() => {
          gameState.activeActivity = null;
        });
      });
    }

    // Laser Spectrometer
    const specBtn = this.container.querySelector("#btn-run-spectrometer");
    if (specBtn) {
      specBtn.addEventListener("click", () => {
        gameState.activeActivity = "spectrometry";
        this.missionsManager.startSpectrometerMission(() => {
          gameState.activeActivity = null;
        });
      });
    }

    // Depart & Debrief
    const debriefBtn = this.container.querySelector("#btn-complete-mission");
    if (debriefBtn) {
      debriefBtn.addEventListener("click", () => {
        if (gameState.areAllObjectivesComplete()) {
          sound.playSuccessChime();
          this.cleanup();
          gameState.setScreen("debrief");
        }
      });
    }

    const btnGuide = this.container.querySelector("#btn-surface-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("debris_mission");
        }
      });
    }
  }

  // Strategic Decision Pressure Trade-Off Prompts
  checkDecisionPressurePrompts() {
    const t = gameState.state.telemetry;
    if (t.oxygen < 25 && !this.tradeOffPromptShown) {
      this.tradeOffPromptShown = true;
      this.showTradeOffModal("CRITICAL OXYGEN DILEMMA (24% REMAINING)", "Your spacesuit oxygen reserves are low! Do you push through to finish the surface objective with heightened risk of asphyxiation, or immediately retreat to the Habitat Dome?", () => {
        // Option 1: push through
        sound.playAlarm();
        gameState.addScore(20);
      }, () => {
        // Option 2: retreat
        sound.playSuccessChime();
        this.astronaut.x = 220; // walk into habitat
        gameState.isAstronautInsideHabitat = true;
      });
    }
  }

  showTradeOffModal(title, text, onBrave, onRetreat) {
    sound.playWarningChime();
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">⚖️</div>
        <h3 style="color: var(--accent-gold); font-size: 1.25rem;">${title}</h3>
        <p style="font-size: 0.85rem; color: #cfd8dc; margin: 8px 0 16px 0; line-height: 1.45;">
          ${text}
        </p>

        <div style="display: flex; gap: 12px;">
          <button class="btn-primary" id="btn-decision-retreat" style="flex: 1; justify-content: center; background: #00e676; color: #000;">
            🏠 Retreat to Habitat Dome
          </button>
          <button class="btn-secondary" id="btn-decision-brave" style="flex: 1; justify-content: center; color: #ff80ab;">
            ⚡ Push Through (+Risk)
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-decision-retreat").addEventListener("click", () => {
      overlay.remove();
      if (onRetreat) onRetreat();
    });

    overlay.querySelector("#btn-decision-brave").addEventListener("click", () => {
      overlay.remove();
      if (onBrave) onBrave();
    });
  }

  updateToolboxView() {
    const list = this.container.querySelector("#toolbox-modules-list");
    if (list) list.innerHTML = this.renderToolboxModules();

    const ticker = this.container.querySelector("#net-production-ticker");
    if (ticker) ticker.innerHTML = this.renderNetProductionHtml();

    this.attachEvents();
  }

  updateTelemetryHud() {
    const s = gameState.state;
    const t = s.telemetry;
    const strip = this.container.querySelector("#surface-vitals-strip");
    if (strip) {
      strip.innerHTML = `
        ${this.renderMiniMeter("🫁 O₂", Math.round(t.oxygen), "var(--meter-oxygen)", "%")}
        ${this.renderMiniMeter("💧 H₂O", Math.round(t.water), "var(--meter-water)", "%")}
        ${this.renderMiniMeter("🍞 Food", Math.round(t.food), "var(--meter-food)", "%")}
        ${this.renderMiniMeter("⚡ Power", Math.round(t.power), "var(--meter-power)", "%")}
        ${this.renderMiniMeter("🌡️ Temp", Math.round(t.temperature), "#29b6f6", "°C")}
        ${this.renderMiniMeter("☢️ Rad", t.radiation.toFixed(1), "#ffd600", "mSv")}
        ${this.renderMiniMeter("🛡️ Suit", Math.round(t.suitIntegrity), "#ab47bc", "%")}
        ${this.renderMiniMeter("❤️ Health", Math.round(t.crewHealth), "#00e676", "%")}
      `;
    }

    const shelterTag = this.container.querySelector("#shelter-status-tag");
    if (shelterTag) {
      if (gameState.isAstronautInsideHabitat) {
        shelterTag.textContent = "🛡️ Sheltered in Habitat (Rad Shielded 95%)";
        shelterTag.style.background = "rgba(0, 230, 118, 0.2)";
        shelterTag.style.color = "var(--text-highlight)";
      } else {
        shelterTag.textContent = "EVA Spacewalk (Unsheltered)";
        shelterTag.style.background = "rgba(255,255,255,0.1)";
        shelterTag.style.color = "#fff";
      }
    }
  }

  updateObjectivesHud() {
    const s = gameState.state;
    const countEl = this.container.querySelector("#objective-countdown-text");
    if (countEl) countEl.textContent = this.formatTime(s.missionTimeLeftSec);

    const checklistEl = this.container.querySelector("#surface-objectives-checklist");
    if (checklistEl) checklistEl.innerHTML = this.renderObjectivesChecklist();

    const ratioEl = this.container.querySelector("#objectives-ratio-text");
    if (ratioEl) ratioEl.textContent = `${s.levelObjectives.filter(o => o.completed).length} / ${s.levelObjectives.length} Done`;

    const debriefBtn = this.container.querySelector("#btn-complete-mission");
    if (debriefBtn) {
      debriefBtn.disabled = !gameState.areAllObjectivesComplete();
    }
  }

  loop() {
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  update() {
    let moving = false;
    if (this.keys.left) {
      this.astronaut.vx = -2.8;
      this.astronaut.facing = -1;
      moving = true;
    } else if (this.keys.right) {
      this.astronaut.vx = 2.8;
      this.astronaut.facing = 1;
      moving = true;
    } else if (this.astronaut.targetX !== undefined) {
      const diff = this.astronaut.targetX - this.astronaut.x;
      if (Math.abs(diff) > 4) {
        this.astronaut.vx = Math.sign(diff) * 2.8;
        this.astronaut.facing = Math.sign(diff);
        moving = true;
      } else {
        this.astronaut.vx = 0;
        this.astronaut.targetX = undefined;
      }
    } else {
      this.astronaut.vx *= 0.8;
    }

    this.astronaut.x += this.astronaut.vx;
    this.astronaut.isWalking = moving;

    if (moving) {
      this.astronaut.stepCycle = (this.astronaut.stepCycle + 0.2) % (Math.PI * 2);
      gameState.activeActivity = "walking";
    } else if (gameState.activeActivity === "walking") {
      gameState.activeActivity = null;
    }

    if (this.astronaut.x < 40) this.astronaut.x = 40;
    if (this.astronaut.x > this.canvas.width - 40) this.astronaut.x = this.canvas.width - 40;

    // Check if astronaut walked close to a Habitat Dome to trigger shelter
    let nearHabitat = false;
    this.buildSites.forEach((site) => {
      if (site.module === "habitat") {
        const dist = Math.abs(this.astronaut.x - (site.x + site.width / 2));
        if (dist < 45) nearHabitat = true;
      }
    });
    gameState.isAstronautInsideHabitat = nearHabitat;
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const t = gameState.state.telemetry;

    // Background sky
    ctx.fillStyle = dest.skyColor;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 35; i++) {
      ctx.fillRect((i * 49) % w, (i * 29) % (h * 0.5), 1.5, 1.5);
    }

    // Celestial background (Earth from Moon, Jupiter from Europa)
    if (dest.id === "moon") {
      ctx.beginPath();
      ctx.arc(w - 140, 80, 42, 0, Math.PI * 2);
      ctx.fillStyle = "#1976d2";
      ctx.fill();
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (dest.id === "europa") {
      ctx.beginPath();
      ctx.arc(w - 180, -120, 260, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb74d";
      ctx.fill();
    }

    // Planetary Ground Terrain
    ctx.fillStyle = dest.groundColor;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, 320);
    ctx.bezierCurveTo(w * 0.3, 310, w * 0.7, 340, w, 320);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    // Draw Lander
    ctx.save();
    ctx.translate(60, 290);
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(-20, 0, 40, 20);
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.arc(0, -6, 16, Math.PI, 0);
    ctx.fill();
    ctx.restore();

    // Draw Build Sites & Modules
    this.buildSites.forEach((site) => {
      if (site.module) {
        const mod = GAME_CONFIG.BASE_MODULES[site.module];
        ctx.save();
        ctx.translate(site.x + site.width / 2, site.y + site.height / 2);

        // Ground anchor pad
        ctx.fillStyle = "#263238";
        ctx.beginPath();
        ctx.roundRect(-40, 10, 80, 16, 6);
        ctx.fill();

        // Dome / module graphic
        ctx.fillStyle = mod.color;
        ctx.beginPath();
        ctx.arc(0, 8, 30, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(mod.icon, 0, 2);

        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(mod.name.split(' ')[0], 0, 22);

        ctx.restore();
      } else {
        ctx.save();
        ctx.strokeStyle = this.selectedToolboxModule ? "var(--text-highlight)" : "rgba(255,255,255,0.25)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(site.x, site.y, site.width, site.height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(site.x, site.y, site.width, site.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("BUILD SITE", site.x + site.width / 2, site.y + site.height / 2 + 4);
        ctx.restore();
      }
    });

    // Draw Resource Deposits
    this.resourceNodes.forEach((node) => {
      node.pulse = (node.pulse || 0) + 0.05;
      const glow = Math.sin(node.pulse) * 4;

      ctx.save();
      ctx.translate(node.x, node.y);

      ctx.fillStyle = "rgba(0, 229, 255, 0.25)";
      ctx.beginPath();
      ctx.arc(0, 0, node.radius + glow, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, 0, 0);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(node.name, 0, node.radius + 12);
      ctx.restore();
    });

    // Draw Walking Astronaut
    ctx.save();
    const bob = Math.sin(this.astronaut.stepCycle) * 3;
    ctx.translate(this.astronaut.x, this.astronaut.y + bob);
    ctx.scale(this.astronaut.facing, 1);

    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("👨‍🚀", 0, 0);

    // If sheltered, draw protective bubble aura around astronaut
    if (gameState.isAstronautInsideHabitat) {
      ctx.strokeStyle = "#00e676";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // --- VISUAL ENVIRONMENTAL OVERLAYS ---
    // 1. Dust storm overlay
    if (gameState.activeHazard && gameState.activeHazard.id === "dust_storm") {
      ctx.fillStyle = "rgba(191, 54, 12, 0.35)";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Solar Storm radiation haze
    if (gameState.activeHazard && gameState.activeHazard.id === "solar_storm") {
      ctx.fillStyle = "rgba(255, 214, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);
    }

    // 3. Frost Vignette when temperature drops below 5°C
    if (t.temperature < 5) {
      const frostIntensity = Math.min(0.6, (5 - t.temperature) * 0.02);
      ctx.fillStyle = `rgba(179, 229, 252, ${frostIntensity})`;
      ctx.fillRect(0, 0, w, 24);
      ctx.fillRect(0, h - 24, w, 24);
      ctx.fillRect(0, 0, 24, h);
      ctx.fillRect(w - 24, 0, 24, h);
    }

    // 4. Low Health heartbeat vignette
    if (t.crewHealth < 25) {
      const redPulse = Math.abs(Math.sin(Date.now() / 300)) * 0.35;
      ctx.fillStyle = `rgba(255, 51, 102, ${redPulse})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.hazardManager) this.hazardManager.stopMonitoring();
    if (this.unsubscribe) this.unsubscribe();
  }

  destroy() {
    this.cleanup();
  }
}
