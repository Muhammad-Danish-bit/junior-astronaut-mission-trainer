// ============================================================================
// LAUNCH & ORBITAL FLIGHT SIMULATION
// 10-0 Countdown, Canvas particle rocket ignition, atmospheric layers,
// fuel/altitude telemetry, and interactive flight controls
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class LaunchFlightComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.countdownTimer = null;
    this.countdownVal = 10;
    this.phase = "countdown"; // 'countdown', 'launching', 'orbit_reached'

    // Flight physics & entities
    this.rocket = {
      x: 0,
      y: 0,
      width: 48,
      height: 90,
      vx: 0,
      tilt: 0
    };
    this.particles = [];
    this.stars = [];
    this.collectibles = [];
    this.debris = [];
    this.clouds = [];
    
    this.altitude = 0;       // 0 to 100,000 km
    this.maxAltitude = 100000;
    this.speed = 0;          // km/s
    this.fuel = 100;
    this.keys = { left: false, right: false, up: false, down: false };
    this.touchSteer = 0;     // -1 for left, 1 for right
    this.vibration = 0;

    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
  }

  render() {
    const s = gameState.state;
    const rocket = GAME_CONFIG.ROCKETS[s.selectedRocket];
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Top HUD during flight -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Spacecraft</span>
              <div style="font-weight: 800; color: #fff;">${rocket.name}</div>
            </div>
            <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Destination</span>
              <div style="font-weight: 800; color: var(--accent-gold);">${dest.name}</div>
            </div>
          </div>

          <!-- Gauges -->
          <div style="display: flex; align-items: center; gap: 24px;">
            <!-- Altitude Bar -->
            <div style="display: flex; flex-direction: column; width: 180px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                <span>ALTITUDE</span>
                <span id="flight-alt-text">0 km</span>
              </div>
              <div style="height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="flight-alt-bar" style="height: 100%; width: 0%; background: var(--border-cyan); transition: width 0.1s;"></div>
              </div>
            </div>

            <!-- Fuel Bar -->
            <div style="display: flex; flex-direction: column; width: 180px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                <span>REMAINING FUEL</span>
                <span id="flight-fuel-text" style="color: var(--meter-fuel);">100%</span>
              </div>
              <div style="height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="flight-fuel-bar" style="height: 100%; width: 100%; background: var(--meter-fuel); transition: width 0.1s;"></div>
              </div>
            </div>

            <!-- Flight Telemetry Speed -->
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">VELOCITY</span>
              <div id="flight-speed-text" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1.1rem; color: var(--text-highlight);">
                0.0 km/s
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Game Screen -->
        <div class="flight-canvas-container" id="flight-canvas-container">
          <canvas id="flight-canvas" class="game-canvas"></canvas>

          <!-- 10s Countdown Overlay -->
          <div class="countdown-overlay" id="flight-countdown-box">
            <div style="font-size: 0.85rem; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 4px;">T-MINUS</div>
            <div id="countdown-number" style="font-size: 3.5rem; line-height: 1;">10</div>
            <div style="font-size: 0.8rem; color: #fff; margin-top: 6px;" id="countdown-status">TERMINAL COUNTDOWN RUNNING</div>
            <button class="btn-secondary" id="btn-abort-countdown" style="margin-top: 10px; font-size: 0.78rem; padding: 4px 12px;">
              Abort Countdown
            </button>
          </div>

          <!-- On-screen Tablet Steering Controls -->
          <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 12px; z-index: 10;">
            <button class="btn-icon" id="btn-steer-left" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">◀</button>
            <button class="btn-icon" id="btn-steer-right" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">▶</button>
          </div>

          <div style="position: absolute; bottom: 24px; right: 24px; color: rgba(255,255,255,0.7); font-size: 0.8rem; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: var(--radius-sm); pointer-events: none;">
            Steer with <strong>[A / D]</strong> or <strong>[◀ / ▶]</strong> to collect Data Beacons (+25 pts)!
          </div>
        </div>
      </div>
    `;

    this.setupCanvas();
    this.startCountdown();
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#flight-canvas");
    if (!this.canvas) return;

    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    this.rocket.x = this.canvas.width / 2;
    this.rocket.y = this.canvas.height - 110;
    this.fuel = gameState.state.loadedSupplies.fuel || 100;
    this.altitude = 0;
    this.speed = 0;

    // Generate starfield
    this.stars = [];
    for (let i = 0; i < 90; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.8,
        speed: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // Clouds for lower atmosphere
    this.clouds = [];
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * (this.canvas.height * 0.6),
        width: Math.random() * 120 + 80,
        height: Math.random() * 40 + 20,
        speed: Math.random() * 3 + 2
      });
    }
  }

  startCountdown() {
    this.countdownVal = 10;
    this.phase = "countdown";
    this.vibration = 0;
    const numEl = this.container.querySelector("#countdown-number");
    const boxEl = this.container.querySelector("#flight-countdown-box");
    const statusEl = this.container.querySelector("#countdown-status");

    sound.playQuindar();

    this.countdownTimer = setInterval(() => {
      this.countdownVal--;
      if (numEl) numEl.textContent = this.countdownVal;

      if (this.countdownVal <= 3 && this.countdownVal > 0) {
        sound.startRocketRumble(0.5);
        if (statusEl) statusEl.textContent = "🔥 MAIN ENGINE IGNITION SEQUENCE START!";
      }

      if (this.countdownVal > 0) {
        sound.playCountdown(false);
      } else if (this.countdownVal === 0) {
        sound.playCountdown(true);
        if (numEl) numEl.textContent = "LIFTOFF!";
        if (statusEl) statusEl.textContent = "🚀 IGNITION & LIFTOFF! WE HAVE A MISSION!";

        sound.startRocketRumble(1.0);
        this.phase = "launching";

        setTimeout(() => {
          if (boxEl) boxEl.style.display = "none";
        }, 1200);

        clearInterval(this.countdownTimer);
      }
    }, 1000);

    this.loop();
  }

  attachEvents() {
    // Keyboard controls (WASD & Arrow Keys)
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.keys.up = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") this.keys.down = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.keys.up = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") this.keys.down = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Touch on-screen buttons
    const btnLeft = this.container.querySelector("#btn-steer-left");
    const btnRight = this.container.querySelector("#btn-steer-right");
    if (btnLeft && btnRight) {
      btnLeft.addEventListener("pointerdown", () => { this.touchSteer = -1; sound.playThrusterPulse(); });
      btnLeft.addEventListener("pointerup", () => { this.touchSteer = 0; });
      btnLeft.addEventListener("pointercancel", () => { this.touchSteer = 0; });

      btnRight.addEventListener("pointerdown", () => { this.touchSteer = 1; sound.playThrusterPulse(); });
      btnRight.addEventListener("pointerup", () => { this.touchSteer = 0; });
      btnRight.addEventListener("pointercancel", () => { this.touchSteer = 0; });
    }

    // Abort button
    const abortBtn = this.container.querySelector("#btn-abort-countdown");
    if (abortBtn) {
      abortBtn.addEventListener("click", () => {
        sound.playFail();
        this.cleanup();
        gameState.setScreen("boarding");
      });
    }

    // Resize listener
    this.resizeHandler = () => {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
      this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    };
    window.addEventListener("resize", this.resizeHandler);
  }

  loop() {
    this.update();
    this.draw();
    if (this.phase !== "orbit_reached") {
      this.animId = requestAnimationFrame(() => this.loop());
    }
  }

  update() {
    if (this.phase === "countdown") {
      if (this.countdownVal <= 3) {
        this.vibration = (4 - this.countdownVal) * 2.5;
        // Billowing ignition flames & smoke under the pad
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            x: this.rocket.x + (Math.random() * 32 - 16),
            y: this.rocket.y + 42,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 4 + 2,
            radius: Math.random() * 12 + 6,
            life: 1.0,
            color: Math.random() > 0.4 ? "#ff5722" : (Math.random() > 0.5 ? "#ffb300" : "#90a4ae")
          });
        }
      } else {
        this.vibration = 0;
      }
      this.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.96;
        p.life -= 0.04;
        if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
      });
      return;
    }

    if (this.phase === "launching") {
      // Throttle speed control with Up/Down (W/S)
      if (this.keys.up) {
        this.speed = Math.min(14.0, this.speed + 0.1);
        this.fuel = Math.max(0, this.fuel - 0.05);
      } else if (this.keys.down) {
        this.speed = Math.max(2.0, this.speed - 0.08);
      } else {
        this.speed = Math.min(11.2, this.speed + 0.05); // Accelerates towards escape velocity 11.2 km/s
      }

      this.altitude += this.speed * 180;
      this.vibration = this.altitude < 15000 ? (1 - this.altitude / 15000) * 2 : 0;
      
      // Fuel consumption
      this.fuel = Math.max(0, this.fuel - 0.07);
      gameState.state.telemetry.fuel = Math.round(this.fuel);
      gameState.state.telemetry.rocketFuel = Math.round(this.fuel);

      // Check fuel out failure condition!
      if (this.fuel <= 0) {
        this.cleanup();
        gameState.failMission({
          cause: "Propellant Tanks Exhausted In Deep Space",
          tip: "Throttle conservatively and collect Energy pods (⚡) during transit.",
          causalityList: [
            "Rocket fuel depleted before achieving planetary transfer orbit",
            "Attitude thrusters and orbital insertion stage became unresponsive",
            "Spacecraft stuck in interplanetary drift"
          ]
        });
        return;
      }

      // Steer physics
      let steerInput = 0;
      if (this.keys.left || this.touchSteer === -1) steerInput -= 1;
      if (this.keys.right || this.touchSteer === 1) steerInput += 1;

      this.rocket.vx += steerInput * 0.8;
      this.rocket.vx *= 0.88; // Friction
      this.rocket.x += this.rocket.vx;
      this.rocket.tilt = this.rocket.vx * 3;

      // Keep rocket within bounds
      const margin = 50;
      if (this.rocket.x < margin) { this.rocket.x = margin; this.rocket.vx = 0; }
      if (this.rocket.x > this.canvas.width - margin) { this.rocket.x = this.canvas.width - margin; this.rocket.vx = 0; }

      // Spawn flame & smoke particles
      for (let i = 0; i < 4; i++) {
        this.particles.push({
          x: this.rocket.x + (Math.random() * 16 - 8),
          y: this.rocket.y + 40,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 6 + 8,
          radius: Math.random() * 8 + 4,
          life: 1.0,
          color: Math.random() > 0.4 ? "#ff9100" : "#ffd600"
        });
      }

      // Spawn collectibles (Science Beacons & Energy Units)
      if (Math.random() < 0.04 && this.collectibles.length < 5) {
        const isEnergy = Math.random() > 0.45;
        this.collectibles.push({
          x: Math.random() * (this.canvas.width - 100) + 50,
          y: -30,
          vy: Math.random() * 3 + 4,
          icon: isEnergy ? "⚡" : "📡",
          type: isEnergy ? "energy" : "beacon",
          size: 26
        });
      }

      // Spawn Debris (Micro-meteoroids / Asteroids)
      if (Math.random() < 0.025 && this.debris.length < 4) {
        this.debris.push({
          x: Math.random() * (this.canvas.width - 80) + 40,
          y: -40,
          vy: Math.random() * 4 + 6,
          vx: Math.random() * 2 - 1,
          radius: 12
        });
      }

      // Update collectibles
      this.collectibles.forEach((c, idx) => {
        c.y += c.vy + this.speed * 0.8;
        // Collision with rocket
        const dx = c.x - this.rocket.x;
        const dy = c.y - (this.rocket.y - 15);
        const dist = Math.hypot(dx, dy);
        if (dist < 40) {
          sound.playCollect();
          if (c.type === "energy") {
            this.fuel = Math.min(100, this.fuel + 8);
            gameState.addScore(15);
          } else {
            gameState.addScore(25);
          }
          this.collectibles.splice(idx, 1);
        } else if (c.y > this.canvas.height + 50) {
          this.collectibles.splice(idx, 1);
        }
      });

      // Update debris
      this.debris.forEach((d, idx) => {
        d.y += d.vy + this.speed * 0.8;
        d.x += d.vx;
        const dx = d.x - this.rocket.x;
        const dy = d.y - (this.rocket.y - 15);
        const dist = Math.hypot(dx, dy);
        if (dist < 35) {
          sound.playThrusterPulse();
          this.fuel = Math.max(0, this.fuel - 4);
          this.debris.splice(idx, 1);
        } else if (d.y > this.canvas.height + 50) {
          this.debris.splice(idx, 1);
        }
      });

      // Check orbit reached condition
      if (this.altitude >= this.maxAltitude) {
        this.onOrbitAchieved();
      }

      // Update HUD elements
      const altText = this.container.querySelector("#flight-alt-text");
      const altBar = this.container.querySelector("#flight-alt-bar");
      const fuelText = this.container.querySelector("#flight-fuel-text");
      const fuelBar = this.container.querySelector("#flight-fuel-bar");
      const speedText = this.container.querySelector("#flight-speed-text");

      const altPercent = Math.min(100, (this.altitude / this.maxAltitude) * 100);
      if (altText) altText.textContent = `${Math.round(this.altitude).toLocaleString()} km`;
      if (altBar) altBar.style.width = `${altPercent}%`;
      if (fuelText) fuelText.textContent = `${Math.round(this.fuel)}%`;
      if (fuelBar) fuelBar.style.width = `${Math.max(0, this.fuel)}%`;
      if (speedText) speedText.textContent = `${this.speed.toFixed(1)} km/s`;
    }

    // Update particles
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius *= 0.94;
      p.life -= 0.03;
      if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
    });

    // Update stars scrolling
    this.stars.forEach((s) => {
      s.y += s.speed * (this.phase === "launching" ? (this.speed * 0.8 + 1) : 0.5);
      if (s.y > this.canvas.height) {
        s.y = 0;
        s.x = Math.random() * this.canvas.width;
      }
    });
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Atmospheric gradient transition
    const progress = Math.min(1, this.altitude / 60000);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    
    if (progress < 0.25) {
      // Lower atmosphere
      grad.addColorStop(0, "#1976d2");
      grad.addColorStop(0.7, "#64b5f6");
      grad.addColorStop(1, "#b3e5fc");
    } else if (progress < 0.6) {
      // Stratosphere / Mesosphere
      grad.addColorStop(0, "#080c18");
      grad.addColorStop(0.6, "#152238");
      grad.addColorStop(1, "#283593");
    } else {
      // Space / Exosphere
      grad.addColorStop(0, "#02040a");
      grad.addColorStop(0.7, "#050a16");
      grad.addColorStop(1, "#0d1b2a");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Draw stars
    ctx.fillStyle = "#ffffff";
    this.stars.forEach((s) => {
      ctx.globalAlpha = s.alpha * Math.max(0.2, progress);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Curvature of Earth at high altitude
    if (progress > 0.45) {
      const curveY = h + 200 - (progress - 0.45) * 150;
      ctx.beginPath();
      ctx.arc(w / 2, curveY + 450, 600, Math.PI, 0);
      ctx.fillStyle = "#1565c0";
      ctx.fill();
      // Glowing atmosphere rim
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 6;
      ctx.stroke();
    }

    // Draw Launch Pad Tower if at ground level
    if (this.altitude < 1500) {
      const padY = this.rocket.y + 40;
      ctx.fillStyle = "#37474f";
      ctx.fillRect(this.canvas.width / 2 - 90, padY, 180, 70);
      // Service tower gantry
      ctx.fillStyle = "#c62828";
      ctx.fillRect(this.canvas.width / 2 - 80, padY - 90, 16, 90);
    }

    // Draw particles (exhaust flame & smoke)
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Collectible Data Beacons
    this.collectibles.forEach((c) => {
      ctx.font = `${c.size}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.icon, c.x, c.y);

      // Glowing aura
      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw Debris
    this.debris.forEach((d) => {
      ctx.fillStyle = "#78909c";
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#455a64";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw Rocket
    ctx.save();
    const vxOffset = this.vibration ? (Math.random() - 0.5) * this.vibration : 0;
    const vyOffset = this.vibration ? (Math.random() - 0.5) * this.vibration : 0;
    ctx.translate(this.rocket.x + vxOffset, this.rocket.y + vyOffset);
    ctx.rotate((this.rocket.tilt * Math.PI) / 180);

    // Rocket Body
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(16, 25);
    ctx.lineTo(-16, 25);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Red Nose Cone
    ctx.fillStyle = "#fc3d21";
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(8, -25);
    ctx.lineTo(-8, -25);
    ctx.closePath();
    ctx.fill();

    // Blue Cockpit Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -10, 6, 0, Math.PI * 2);
    ctx.fill();

    // Fins
    ctx.fillStyle = "#0b3d91";
    ctx.beginPath();
    ctx.moveTo(-16, 15);
    ctx.lineTo(-26, 32);
    ctx.lineTo(-16, 25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(16, 15);
    ctx.lineTo(26, 32);
    ctx.lineTo(16, 25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  onOrbitAchieved() {
    this.phase = "orbit_reached";
    sound.stopRocketRumble();
    sound.playSuccessChime();

    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    // Show Orbit Reached Modal & Proceed to Planetary Landing
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">🛰️</div>
        <h2 style="color: var(--text-highlight); font-size: 1.5rem; margin-bottom: 6px;">
          ESCAPE VELOCITY & TRANSFER ORBIT ACHIEVED!
        </h2>
        <p style="color: #cfd8dc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">
          The spacecraft has left Earth's atmosphere and entered deep space interplanetary cruise toward <strong>${dest.name}</strong>! Before descent, Houston Mission Control requires you to establish the Real-Time Deep Space Comm Link, align solar arrays, and calibrate life support telemetry to earn <strong>+5 Science Points</strong> and certify entry trajectory.
        </p>

        <div style="background: rgba(0, 229, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.85rem; text-align: left;">
          <div>🪐 Target Destination: <strong>${dest.name}</strong></div>
          <div>📡 Mission Objective: <strong>Deep Space Real-Time Comms Link (Earth ⇄ Spacecraft)</strong></div>
          <div>⭐ Mission Certification: <strong>+5 Science Points Awarded</strong></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-primary" id="btn-begin-transit" style="width: 100%; justify-content: center; font-size: 1.15rem; padding: 15px; box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);">
            Engage Deep Space Comm & Transit Mission (+5 Pts) 📡
          </button>
          <button class="btn-secondary" id="btn-skip-to-lander" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 8px;">
            Direct Descent to Landing Site 🛬
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-begin-transit").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("transit");
    });

    overlay.querySelector("#btn-skip-to-lander").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("lander");
    });
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    sound.stopRocketRumble();
    window.removeEventListener("resize", this.resizeHandler);
  }

  destroy() {
    this.cleanup();
  }
}

