// ============================================================================
// FINAL MISSION: LUNAR RESUPPLY & EXTRACTION FINALE MODULE
// Grand Finale: Gateway Link, Pad Clearance, Beacon Transmission & Safe Extraction
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class ExtractionModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.state = null;
    this.animId = null;
    this.canvas = null;
    this.ctx = null;
    this.onCompleteCallback = null;
  }

  open(onComplete = null) {
    this.isOpen = true;
    this.onCompleteCallback = onComplete;
    sound.playQuindar();

    this.state = {
      dishAligned: false,
      padCleared: false,
      windowTime: 100,
      lockProgress: 0,
      missionEnded: false,
      landerY: 20,
      landerLanded: false,
      dishAngle: -0.4,
      targetDishAngle: -0.4,
      particles: []
    };

    this.render();
    this.initCanvas();
  }

  close() {
    this.isOpen = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    sound.playClick();
    this.container.innerHTML = "";
    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog" style="max-width: 620px; background: transparent; border: none; padding: 0; position: relative;">
          <button class="btn-icon btn-modal-close" id="btn-close-ext-modal" title="Close Extraction Module" style="position: absolute; top: 18px; right: 20px; font-size: 1.3rem; background: transparent; border: none; color: #bdc3c7; cursor: pointer; z-index: 30;">✕</button>

          <!-- LUNAR EXTRACTION FINALE MODULE (HTML + CSS + JS) -->
          <div id="ext-finale-module">
            <style>
              #ext-finale-module {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 540px;
                border: 2px solid #2ecc71;
                border-radius: 10px;
                padding: 22px;
                background: linear-gradient(145deg, #161b22, #0d1117);
                color: #ecf0f1;
                margin: 20px auto;
                box-shadow: 0 12px 35px rgba(46, 204, 113, 0.25);
                position: relative;
                box-sizing: border-box;
              }
              #ext-finale-module h2 {
                margin-top: 0;
                color: #2ecc71;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 1.45rem;
              }
              #ext-finale-module .ext-subtitle {
                font-size: 0.9em;
                color: #bdc3c7;
                margin-bottom: 14px;
                line-height: 1.45;
              }
              #ext-finale-module .ext-dashboard {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                background: #21262d;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 14px;
                border: 1px solid #30363d;
              }
              #ext-finale-module .ext-bar-wrap {
                margin-bottom: 14px;
              }
              #ext-finale-module .ext-bar-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
                font-size: 0.92em;
              }
              #ext-finale-module .ext-bar-bg {
                width: 100%;
                background: #30363d;
                height: 22px;
                border-radius: 6px;
                overflow: hidden;
              }
              #ext-finale-module .ext-bar-fill {
                width: 0%;
                background: #3498db;
                height: 100%;
                transition: width 0.35s ease, background 0.35s ease;
              }
              #ext-finale-module .ext-controls {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 12px;
              }
              #ext-finale-module button {
                flex: 1;
                padding: 12px;
                color: #ffffff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 0.9em;
                transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
              }
              #ext-finale-module button:hover:not(:disabled) {
                opacity: 0.9;
                box-shadow: 0 0 12px rgba(255,255,255,0.2);
              }
              #ext-finale-module button:active:not(:disabled) {
                transform: scale(0.98);
              }
              #ext-finale-module button:disabled {
                opacity: 0.4;
                cursor: not-allowed;
              }
              #ext-btn-dish { background: #3498db; }
              #ext-btn-pad { background: #e67e22; }
              #ext-btn-beacon {
                width: 100%;
                padding: 14px !important;
                background: #2ecc71;
                font-size: 1.05em !important;
                margin-bottom: 14px;
                box-shadow: 0 0 15px rgba(46,204,113,0.3);
              }
              #ext-log {
                padding: 12px;
                background: #0d1117;
                border-left: 4px solid #f1c40f;
                border-radius: 4px;
                font-size: 0.88em;
                min-height: 48px;
                color: #f1c40f;
                line-height: 1.45;
                font-family: monospace;
              }
              #ext-victory-card {
                display: none;
                margin-top: 16px;
                padding: 18px;
                background: rgba(46, 204, 113, 0.14);
                border: 2px solid #2ecc71;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 0 25px rgba(46,204,113,0.3);
              }
              #ext-victory-card h3 {
                margin: 0 0 10px 0;
                color: #2ecc71;
                font-size: 1.3rem;
              }
              #ext-victory-card p {
                margin: 4px 0;
                font-size: 0.88em;
                color: #ecf0f1;
                text-align: left;
              }
            </style>

            <h2>🚀 Final Mission: Resupply & Extraction</h2>
            <p class="ext-subtitle">
              The Artemis Resupply & Crew Return Lander is approaching lunar orbit! Align the comms dish and clear the landing pad before the orbital window closes.
            </p>

            <!-- Visual Terminal Descent Radar Canvas -->
            <div style="position: relative; width: 100%; height: 160px; background: #050b14; border-radius: 6px; overflow: hidden; margin-bottom: 14px; border: 1px solid #30363d;">
              <canvas id="ext-radar-canvas" width="500" height="160" style="width: 100%; height: 100%; display: block;"></canvas>
              <div style="position: absolute; top: 6px; left: 8px; font-size: 0.7rem; color: #a9dfbf; font-family: monospace;">
                🛰️ TERMINAL APPROACH • DESCENT RADAR
              </div>
            </div>

            <!-- Status Dashboard -->
            <div class="ext-dashboard">
              <div>🛰️ <strong>Gateway Link:</strong> <span id="ext-link">Offline</span></div>
              <div>🛬 <strong>Landing Zone:</strong> <span id="ext-pad">Obstructed</span></div>
              <div>⏱️ <strong>Orbital Window:</strong> <span id="ext-window">100</span>%</div>
              <div>🔋 <strong>Transmitter:</strong> <span id="ext-power">Ready</span></div>
            </div>

            <!-- Signal Lock Progress Bar -->
            <div class="ext-bar-wrap">
              <div class="ext-bar-header">
                <span>📡 <strong>Guidance Beacon Lock:</strong></span>
                <span id="ext-lock-text">0%</span>
              </div>
              <div class="ext-bar-bg">
                <div id="ext-lock-bar" class="ext-bar-fill"></div>
              </div>
            </div>

            <!-- Controls -->
            <div class="ext-controls">
              <button id="ext-btn-dish">📡 Align High-Gain Dish</button>
              <button id="ext-btn-pad">🧹 Clear Regolith Pad</button>
            </div>

            <button id="ext-btn-beacon" disabled>🚀 Transmit Landing Beacon</button>

            <!-- Event Log -->
            <div id="ext-log">
              INCOMING TRANSMISSION: "Artemis Base, orbital window is open. Lock onto our frequency and clear Pad Alpha for touchdown!"
            </div>

            <!-- Final Series Summary Card (Revealed on Victory) -->
            <div id="ext-victory-card">
              <h3>🏆 ARTEMIS SURVIVAL CHALLENGE COMPLETE!</h3>
              <p>✅ <strong>Stage 1:</strong> Lunar Power Grid Restored</p>
              <p>✅ <strong>Stage 2:</strong> Legacy Debris Salvaged & Analyzed</p>
              <p>✅ <strong>Stage 3:</strong> Radiation-Shielded Habitat Built</p>
              <p>✅ <strong>Stage 4:</strong> 60-Day Lunar Greenhouse Harvested</p>
              <p>✅ <strong>Stage 5:</strong> Resupply Lander Safely Guided Home</p>
              <p style="margin-top: 12px; color: #2ecc71; font-weight: bold; text-align: center; font-size: 1rem;">
                Humanity has established a permanent foothold on the Moon! 🌕
              </p>
              
              <button id="ext-btn-debrief" style="margin-top: 14px; width: 100%; padding: 14px; background: linear-gradient(135deg, #00e5ff, #0091ea); font-size: 1.05rem; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; color: #000; box-shadow: 0 0 20px rgba(0,229,255,0.4);">
                🏆 View Final Artemis Expedition Flight Debrief ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#ext-radar-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.startRadarLoop();
  }

  startRadarLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const loop = () => {
      this.updatePhysics();
      this.drawRadar();
      if (this.isOpen) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    this.animId = requestAnimationFrame(loop);
  }

  updatePhysics() {
    const s = this.state;
    // Dish animation
    if (s.dishAligned) {
      s.targetDishAngle = 0.55;
    }
    s.dishAngle += (s.targetDishAngle - s.dishAngle) * 0.05;

    // Lander descent animation after beacon transmission
    if (s.missionEnded && !s.landerLanded) {
      if (s.landerY < 105) {
        s.landerY += 0.8;
        // Thruster sparks
        if (Math.random() > 0.3) {
          s.particles.push({
            x: 250 + (Math.random() * 8 - 4),
            y: s.landerY + 18,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 2 + 1,
            radius: Math.random() * 2.5 + 1,
            alpha: 1.0
          });
        }
      } else {
        s.landerLanded = true;
        sound.playSuccessChime();
      }
    }

    // Update particles
    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.04;
      p.radius *= 0.95;
      if (p.alpha <= 0 || p.radius <= 0.3) {
        s.particles.splice(i, 1);
      }
    }
  }

  drawRadar() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.state;

    // Sky / Stars
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 25; i++) {
      ctx.fillRect((i * 47) % w, (i * 29) % (h * 0.7), 1.2, 1.2);
    }

    // Distant Lunar Gateway in orbit (top left)
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(60, 25, 20, 8);
    // Solar wings
    ctx.fillStyle = "#ffd600";
    ctx.fillRect(45, 27, 15, 4);
    ctx.fillRect(80, 27, 15, 4);
    ctx.fillStyle = "#cfd8dc";
    ctx.font = "8px monospace";
    ctx.fillText("LUNAR GATEWAY", 40, 18);

    // Lunar Ground
    ctx.fillStyle = "#263238";
    ctx.fillRect(0, 130, w, h - 130);
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.lineTo(w, 130);
    ctx.stroke();

    // Landing Pad Alpha (Center: x = 200 to 300)
    ctx.fillStyle = s.padCleared ? "#2e7d32" : "#b71c1c";
    ctx.fillRect(205, 126, 90, 6);
    ctx.strokeStyle = s.padCleared ? "#4caf50" : "#ef5350";
    ctx.lineWidth = 1;
    ctx.strokeRect(205, 126, 90, 6);
    ctx.fillStyle = "#ffffff";
    ctx.font = "8px monospace";
    ctx.fillText(s.padCleared ? "PAD ALPHA [CLEARED]" : "PAD ALPHA [BOULDERS]", 206, 122);

    // If not cleared, draw regolith boulders on pad
    if (!s.padCleared) {
      ctx.fillStyle = "#78909c";
      ctx.beginPath();
      ctx.arc(230, 125, 4, 0, Math.PI * 2);
      ctx.arc(260, 124, 5, 0, Math.PI * 2);
      ctx.arc(280, 125, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // High-Gain Antenna Dish (Right: x = 420)
    ctx.fillStyle = "#37474f";
    ctx.fillRect(415, 100, 6, 30); // Mast
    ctx.save();
    ctx.translate(418, 100);
    ctx.rotate(s.dishAngle);
    // Parabolic dish curve
    ctx.strokeStyle = s.dishAligned ? "#00e5ff" : "#78909c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -10, 14, Math.PI * 0.7, Math.PI * 1.3);
    ctx.stroke();
    // Feed horn
    ctx.strokeStyle = "#cfd8dc";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-2, -10);
    ctx.stroke();
    ctx.restore();

    // Guidance Laser / Radio Link Beam
    if (s.dishAligned) {
      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(410, 90);
      ctx.lineTo(70, 28);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Particles
    s.particles.forEach(p => {
      ctx.fillStyle = `rgba(255, 145, 0, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Artemis Crew Return / Resupply Lander
    const lx = 250;
    const ly = s.landerY;
    ctx.save();
    ctx.translate(lx, ly);

    // Lander Body
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.lineTo(-8, -12);
    ctx.lineTo(8, -12);
    ctx.lineTo(12, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -4, 4, 0, Math.PI * 2);
    ctx.fill();

    // Landing Legs
    ctx.strokeStyle = "#90a4ae";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 8);
    ctx.lineTo(-16, 16);
    ctx.moveTo(10, 8);
    ctx.lineTo(16, 16);
    ctx.stroke();

    ctx.restore();
  }

  attachEvents() {
    const elLink = this.container.querySelector("#ext-link");
    const elPad = this.container.querySelector("#ext-pad");
    const elWindow = this.container.querySelector("#ext-window");
    const elPower = this.container.querySelector("#ext-power");
    const elLockBar = this.container.querySelector("#ext-lock-bar");
    const elLockText = this.container.querySelector("#ext-lock-text");
    const elLog = this.container.querySelector("#ext-log");
    const elVictory = this.container.querySelector("#ext-victory-card");

    const btnDish = this.container.querySelector("#ext-btn-dish");
    const btnPad = this.container.querySelector("#ext-btn-pad");
    const btnBeacon = this.container.querySelector("#ext-btn-beacon");
    const btnClose = this.container.querySelector("#btn-close-ext-modal");
    const btnDebrief = this.container.querySelector("#ext-btn-debrief");

    if (btnClose) {
      btnClose.addEventListener("click", () => this.close());
    }

    const updateUI = (message) => {
      if (elLink) {
        elLink.textContent = this.state.dishAligned ? "Locked" : "Offline";
        elLink.style.color = this.state.dishAligned ? "#2ecc71" : "#e74c3c";
      }

      if (elPad) {
        elPad.textContent = this.state.padCleared ? "Clear" : "Obstructed";
        elPad.style.color = this.state.padCleared ? "#2ecc71" : "#e74c3c";
      }

      if (elWindow) elWindow.textContent = this.state.windowTime;
      if (elLockBar) elLockBar.style.width = `${this.state.lockProgress}%`;
      if (elLockText) elLockText.textContent = `${this.state.lockProgress}%`;

      if (message && elLog) {
        elLog.textContent = message;
      }

      if (btnDish) btnDish.disabled = this.state.dishAligned || this.state.missionEnded;
      if (btnPad) btnPad.disabled = this.state.padCleared || this.state.missionEnded;
      if (btnBeacon) btnBeacon.disabled = !(this.state.dishAligned && this.state.padCleared) || this.state.missionEnded;
    };

    if (btnDish) {
      btnDish.addEventListener("click", () => {
        if (this.state.missionEnded || this.state.dishAligned) return;
        sound.playClick();
        sound.playQuindar();
        this.state.dishAligned = true;
        this.state.windowTime -= 25;
        this.state.lockProgress += 50;
        updateUI("📡 High-gain dish locked onto Lunar Gateway! Guidance telemetry at 50%.");
      });
    }

    if (btnPad) {
      btnPad.addEventListener("click", () => {
        if (this.state.missionEnded || this.state.padCleared) return;
        sound.playClick();
        sound.playCollect();
        this.state.padCleared = true;
        this.state.windowTime -= 25;
        this.state.lockProgress += 50;
        updateUI("🧹 Landing Pad Alpha cleared of boulders and regolith dust! Guidance telemetry at 100%.");
      });
    }

    if (btnBeacon) {
      btnBeacon.addEventListener("click", () => {
        if (this.state.missionEnded || !this.state.dishAligned || !this.state.padCleared) return;
        sound.playSuccessChime();
        sound.playThrusterPulse();
        this.state.missionEnded = true;

        if (elPower) {
          elPower.textContent = "Transmitting";
          elPower.style.color = "#2ecc71";
        }
        if (elLockBar) elLockBar.style.background = "#2ecc71";
        if (elLog) {
          elLog.style.borderLeftColor = "#2ecc71";
          elLog.style.color = "#2ecc71";
        }
        if (elVictory) elVictory.style.display = "block";

        gameState.addScore(1000);
        gameState.unlockAchievement("artemis_mastery");
        gameState.progressObjective("moon_extraction", 1);

        updateUI("🚀 TOUCHDOWN CONFIRMED: The Artemis Resupply Lander has safely landed! Your crew is saved.");
      });
    }

    if (btnDebrief) {
      btnDebrief.addEventListener("click", () => {
        sound.playClick();
        this.close();
        gameState.setScreen("debrief");
      });
    }

    updateUI();
  }
}

if (typeof window !== "undefined") {
  window.ExtractionModal = ExtractionModal;
}

