// ============================================================================
// PLANETARY DESCENT & LANDER SIMULATOR
// Accurate celestial gravity physics (Moon, Mars, Europa), retro-thrusters,
// landing zone targeting, and velocity limits
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class LanderComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Lander physics
    this.lander = {
      x: 0,
      y: 40,
      vx: 0,
      vy: 0,
      angle: 0,
      width: 44,
      height: 38,
      thrusting: false,
      fuel: 100
    };

    this.landingPad = { x: 0, y: 0, width: 140, height: 16 };
    this.terrain = [];
    this.particles = [];
    this.isLanded = false;
    this.isCrashed = false;
    this.keys = { up: false, left: false, right: false };

    this.init();
  }

  init() {
    this.render();
    this.setupCanvas();
    this.attachEvents();
    this.loop();
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Telemetry bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 20px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">DESCENT TARGET</span>
            <div style="font-weight: 800; color: ${dest.themeColor}; font-size: 1.1rem;">
              ${dest.name} (Gravity: ${dest.gravityMps2} m/s²)
            </div>
          </div>

          <div style="display: flex; gap: 20px; align-items: center;">
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">DESCENT SPEED</span>
              <div id="lander-vspeed" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: var(--text-highlight);">
                0.0 m/s
              </div>
            </div>

            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">RADAR ALTITUDE</span>
              <div id="lander-alt" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: #fff;">
                450 m
              </div>
            </div>

            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">LANDER FUEL</span>
              <div id="lander-fuel" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: var(--meter-fuel);">
                100%
              </div>
            </div>
          </div>
        </div>

        <!-- Lander Canvas Game -->
        <div class="flight-canvas-container" style="position: relative;">
          <canvas id="lander-canvas" class="game-canvas"></canvas>

          <!-- On-screen Tablet Touch Controls -->
          <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px; z-index: 10;">
            <button class="btn-icon" id="btn-lander-left" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">◀</button>
            <button class="btn-icon" id="btn-lander-right" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">▶</button>
          </div>

          <div style="position: absolute; bottom: 20px; right: 20px; z-index: 10;">
            <button class="btn-primary" id="btn-lander-thrust" style="padding: 14px 28px; font-size: 1.1rem; box-shadow: 0 0 20px rgba(255,145,0,0.6); background: linear-gradient(135deg, #ff9100, #ff3d00);">
              🔥 RETRO-THRUST
            </button>
          </div>

          <div style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-sm); padding: 6px 14px; font-size: 0.8rem; pointer-events: none;">
            Safe Touchdown Limit: <strong>&lt; 3.0 m/s</strong> vertical speed on the designated pad!
          </div>
        </div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#lander-canvas");
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : {};
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    this.lander.x = this.canvas.width / 2;
    this.lander.y = 50;
    this.lander.vx = (Math.random() * 2 - 1) * 0.8;
    this.lander.vy = 0.5;
    this.lander.fuel = gameState.state.telemetry.fuel;
    this.isLanded = false;
    this.isCrashed = false;

    // Generate terrain & landing pad
    const padW = 150;
    const padX = Math.random() * (this.canvas.width - padW - 160) + 80;
    const groundY = this.canvas.height - 60;
    this.landingPad = { x: padX, y: groundY, width: padW, height: 14 };

    // Procedural terrain points
    this.terrain = [];
    const step = 40;
    for (let x = 0; x <= this.canvas.width; x += step) {
      if (x >= padX - 20 && x <= padX + padW + 20) {
        this.terrain.push({ x, y: groundY + 10 });
      } else {
        const roughness = 25;
        this.terrain.push({ x, y: groundY + 10 + (Math.sin(x * 0.05) * roughness) });
      }
    }
  }

  attachEvents() {
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        this.keys.up = true;
        sound.playThrusterPulse();
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
    };

    const onKeyUp = (e) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") this.keys.up = false;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Touch controls
    const thrustBtn = this.container.querySelector("#btn-lander-thrust");
    if (thrustBtn) {
      thrustBtn.addEventListener("pointerdown", () => { this.keys.up = true; sound.playThrusterPulse(); });
      thrustBtn.addEventListener("pointerup", () => { this.keys.up = false; });
      thrustBtn.addEventListener("pointercancel", () => { this.keys.up = false; });
    }

    const leftBtn = this.container.querySelector("#btn-lander-left");
    const rightBtn = this.container.querySelector("#btn-lander-right");
    if (leftBtn && rightBtn) {
      leftBtn.addEventListener("pointerdown", () => { this.keys.left = true; sound.playThrusterPulse(); });
      leftBtn.addEventListener("pointerup", () => { this.keys.left = false; });
      leftBtn.addEventListener("pointercancel", () => { this.keys.left = false; });

      rightBtn.addEventListener("pointerdown", () => { this.keys.right = true; sound.playThrusterPulse(); });
      rightBtn.addEventListener("pointerup", () => { this.keys.right = false; });
      rightBtn.addEventListener("pointercancel", () => { this.keys.right = false; });
    }
  }

  loop() {
    this.update();
    this.draw();
    if (!this.isLanded && !this.isCrashed) {
      this.animId = requestAnimationFrame(() => this.loop());
    }
  }

  update() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    // Scale real planetary gravity to game acceleration
    const gravityAccel = (dest.gravityMps2 / 9.81) * 0.05 + 0.02;

    this.lander.vy += gravityAccel;

    // Apply thrust
    if (this.keys.up && this.lander.fuel > 0) {
      this.lander.vy -= 0.11;
      this.lander.fuel = Math.max(0, this.lander.fuel - 0.25);
      gameState.state.telemetry.fuel = Math.round(this.lander.fuel);

      // Thruster exhaust particles
      this.particles.push({
        x: this.lander.x + (Math.random() * 8 - 4),
        y: this.lander.y + 18,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 4 + 4,
        radius: Math.random() * 6 + 3,
        life: 1.0,
        color: Math.random() > 0.5 ? "#ff9100" : "#ffd600"
      });
    }

    // RCS horizontal steering
    if (this.keys.left) {
      this.lander.vx -= 0.04;
      this.lander.angle = Math.max(-0.25, this.lander.angle - 0.02);
    } else if (this.keys.right) {
      this.lander.vx += 0.04;
      this.lander.angle = Math.min(0.25, this.lander.angle + 0.02);
    } else {
      this.lander.angle *= 0.94; // auto-level
    }

    this.lander.vx *= 0.99;
    this.lander.x += this.lander.vx;
    this.lander.y += this.lander.vy;

    // Bounds
    if (this.lander.x < 30) { this.lander.x = 30; this.lander.vx = 0; }
    if (this.lander.x > this.canvas.width - 30) { this.lander.x = this.canvas.width - 30; this.lander.vx = 0; }

    // Particles update
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius *= 0.92;
      p.life -= 0.05;
      if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
    });

    // Touchdown collision detection
    const pad = this.landingPad;
    const landerBottom = this.lander.y + 18;

    if (landerBottom >= pad.y) {
      const isOverPad = this.lander.x >= pad.x && this.lander.x <= (pad.x + pad.width);
      const isSoftTouch = this.lander.vy <= 2.8;

      if (isOverPad && isSoftTouch) {
        this.onSafeTouchdown();
      } else {
        this.onCrash(isOverPad ? "Touchdown velocity exceeded safety limit!" : "Missed designated landing pad and struck hazardous terrain!");
      }
    }

    // Update HUD
    const vSpeedEl = this.container.querySelector("#lander-vspeed");
    const altEl = this.container.querySelector("#lander-alt");
    const fuelEl = this.container.querySelector("#lander-fuel");

    const vSpeedDisplay = (this.lander.vy * 2.2).toFixed(1);
    const altitudeDisplay = Math.max(0, Math.round((pad.y - landerBottom) * 2.5));

    if (vSpeedEl) {
      vSpeedEl.textContent = `${vSpeedDisplay} m/s`;
      vSpeedEl.style.color = (this.lander.vy <= 2.8) ? 'var(--text-highlight)' : 'var(--accent-red)';
    }
    if (altEl) altEl.textContent = `${altitudeDisplay} m`;
    if (fuelEl) fuelEl.textContent = `${Math.round(this.lander.fuel)}%`;
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    // Sky / Exosphere
    ctx.fillStyle = dest.skyColor;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 40; i++) {
      ctx.fillRect((i * 67) % w, (i * 43) % (h * 0.7), 1.5, 1.5);
    }

    // Draw Destination Celestial Body in Background (e.g. Earth from Moon, or Jupiter from Europa!)
    if (dest.id === "moon") {
      // Blue marble Earth hanging in black lunar sky
      ctx.beginPath();
      ctx.arc(w - 120, 90, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#1976d2";
      ctx.fill();
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (dest.id === "europa") {
      // Colossal striped Jupiter looming above Europa's ice plain
      ctx.beginPath();
      ctx.arc(w / 2, -180, 280, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb74d";
      ctx.fill();
      // Great Red Spot
      ctx.beginPath();
      ctx.ellipse(w / 2 + 50, 70, 24, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#d84315";
      ctx.fill();
    }

    // Draw Terrain
    ctx.beginPath();
    ctx.moveTo(0, h);
    this.terrain.forEach((pt, i) => {
      if (i === 0) ctx.lineTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = dest.groundColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Landing Pad
    const pad = this.landingPad;
    ctx.fillStyle = "#263238";
    ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
    // Glowing neon pad markers
    ctx.fillStyle = "var(--text-highlight)";
    ctx.fillRect(pad.x, pad.y, 10, pad.height);
    ctx.fillRect(pad.x + pad.width - 10, pad.y, 10, pad.height);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("TOUCHDOWN PAD ALPHA", pad.x + pad.width / 2, pad.y + 11);

    // Draw particles
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Lander Spacecraft
    ctx.save();
    ctx.translate(this.lander.x, this.lander.y);
    ctx.rotate(this.lander.angle);

    // Lander gold foil base (Apollo / Artemis style)
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(-18, -6, 36, 16);
    ctx.strokeStyle = "#ffb300";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-18, -6, 36, 16);

    // Lander Crew Ascent Stage
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.arc(0, -10, 14, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.stroke();

    // Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -10, 4, 0, Math.PI * 2);
    ctx.fill();

    // Landing gear struts
    ctx.strokeStyle = "#b0bec5";
    ctx.lineWidth = 2.5;
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-16, 10);
    ctx.lineTo(-24, 18);
    ctx.moveTo(-28, 18);
    ctx.lineTo(-20, 18);
    ctx.stroke();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(16, 10);
    ctx.lineTo(24, 18);
    ctx.moveTo(20, 18);
    ctx.lineTo(28, 18);
    ctx.stroke();

    ctx.restore();
  }

  onSafeTouchdown() {
    this.isLanded = true;
    sound.playSuccessChime();
    gameState.addScore(100);

    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">🚩</div>
        <h2 style="color: var(--text-highlight); font-size: 1.5rem; margin-bottom: 6px;">
          TOUCHDOWN CONFIRMED! WELCOME TO ${dest.name.toUpperCase()}!
        </h2>
        <p style="color: #cfd8dc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">
          "That's one small step for a Junior Astronaut, one giant leap for science!" The lander has touched down safely on Target Pad Alpha (+100 Science Points awarded).
        </p>

        <div style="background: rgba(0, 230, 118, 0.08); border: 1px solid var(--text-highlight); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.85rem; text-align: left;">
          <div>✅ Touchdown Velocity: Nominal (${(this.lander.vy * 2.2).toFixed(1)} m/s)</div>
          <div>✅ Structural Integrity: 100%</div>
          <div>📦 Next Objective: Deploy Surface Base Camp (Habitat, Solar Array, O2 Sabatier, Greenhouse).</div>
        </div>

        <button class="btn-primary" id="btn-begin-camp" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px;">
          Proceed to Surface Camp Setup 🏗️
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-begin-camp").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("surface");
    });
  }

  onCrash(reason) {
    this.isCrashed = true;
    sound.playFail();
    this.cleanup();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center; border-top: 4px solid var(--accent-red);">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">💥💀</div>
        <div style="font-size: 0.78rem; color: #ff80ab; font-weight: 800; letter-spacing: 2px;">PERMADEATH CASUALTY • MISSION CONTROL</div>
        <h2 style="color: var(--accent-red); font-size: 1.4rem; margin: 6px 0 12px 0;">
          CRITICAL IMPACT: LANDER DESTROYED
        </h2>
        <p style="color: #ffccbc; font-size: 0.9rem; line-height: 1.45; margin-bottom: 16px;">
          ${reason}
        </p>
        <div style="background: rgba(255, 51, 102, 0.12); border: 1px solid var(--accent-red); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.82rem; text-align: left;">
          <strong>Zero-Reset Protocol:</strong> Planetary descent carries zero tolerance for excess velocity. Under strict astronaut flight regulations, this loss ends your training expedition and zeroes all score.
        </div>

        <button class="btn-primary" id="btn-lander-casualty-proceed" style="width: 100%; justify-content: center; font-size: 1rem; padding: 12px; background: linear-gradient(135deg, #ff3366, #d50000);">
          Review Casualty Report & Reset to Zero 💀 ➔
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-lander-casualty-proceed").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      gameState.failMission({
        cause: "High-Velocity Planetary Surface Impact",
        tip: "Fire retro-thrusters in rhythmic pulses to maintain vertical descent speed under 2.8 m/s upon pad contact.",
        causalityList: [
          reason,
          "Lander structural landing gear buckled under excessive g-force",
          "Propellant tanks ruptured upon touchdown. Complete hull casualty."
        ]
      });
    });
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  destroy() {
    this.cleanup();
  }
}

