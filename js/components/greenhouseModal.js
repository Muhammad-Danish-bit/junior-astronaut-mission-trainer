// ============================================================================
// MISSION 3: COMBINED GREENHOUSE SURVIVAL (PLAYABLE SPACE MISSION SIMULATOR)
// Interactive 120-Day Hydroponic Simulation with Astronaut Survival & Harvesting
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class GreenhouseModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.state = null;
    this.onCompleteCallback = null;
    this.animId = null;
    this.canvas = null;
    this.ctx = null;
    this.astronaut = {
      x: 340,
      targetX: 340,
      y: 215,
      direction: 1,
      isWalking: false,
      isWorking: false,
      workTimer: 0,
      action: "idle", // 'idle', 'irrigating', 'uv_boost', 'harvesting', 'fixing'
      frame: 0
    };
    this.crops = [
      { name: "Lunar Wheat", x: 260, y: 190, color: "#2ecc71" },
      { name: "Martian Soy", x: 340, y: 190, color: "#27ae60" },
      { name: "Space Potato", x: 420, y: 190, color: "#1abc9c" }
    ];
    this.activeCrisis = null;
    this.harvestParticles = [];
  }

  open(onComplete = null) {
    this.isOpen = true;
    this.onCompleteCallback = onComplete;
    sound.playQuindar();

    const diffKey = gameState.state.difficulty || "cadet";
    const diff = GAME_CONFIG.DIFFICULTY[diffKey] || GAME_CONFIG.DIFFICULTY.cadet;

    this.state = {
      day: 1,
      targetDay: 60,
      food: 21,
      water: 100,
      power: 100,
      growth: 0,
      gameOver: false,
      harvestCount: 0,
      difficulty: diff,
      drainMultiplier: diff.drainMultiplier || 1.0,
      bayTemp: 21,
      oxygen: 96,
      heartRate: 74,
      rationsPackedTotal: 0
    };

    this.activeCrisis = null;
    this.astronaut.x = 340;
    this.astronaut.targetX = 340;
    this.astronaut.action = "idle";
    this.astronaut.isWorking = false;

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
    const s = this.state;
    const diffName = s.difficulty.name || "Cadet";

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog" style="max-width: 840px; background: #0f171e; border: 2px solid #2ecc71; border-radius: 12px; padding: 22px; color: #ecf0f1; box-shadow: 0 15px 60px rgba(0,0,0,0.9); position: relative; max-height: 92vh; overflow-y: auto;">
          <button class="btn-icon btn-modal-close" id="btn-close-gh-modal" title="Close Greenhouse Module" style="position: absolute; top: 16px; right: 16px; font-size: 1.3rem; background: transparent; border: none; color: #bdc3c7; cursor: pointer; z-index: 20;">✕</button>

          <!-- COMBINED GREENHOUSE SURVIVAL MODULE (HTML + JS) -->
          <div id="gh-survival-module" style="font-family: sans-serif; width: 100%; border: 2px solid #2c3e50; border-radius: 8px; padding: 18px; background: #15222e; color: #ecf0f1; margin: 0 auto; box-sizing: border-box;">
            
            <!-- Header with Mission Badge -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid rgba(46,204,113,0.3); padding-bottom: 10px;">
              <div>
                <div style="font-size: 0.72rem; color: #2ecc71; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
                  NASA BIOREGENERATIVE LIFE SUPPORT • DEEP SPACE EXPEDITION
                </div>
                <h2 style="margin: 2px 0 0 0; color: #2ecc71; font-size: 1.4rem; display: flex; align-items: center; gap: 8px;">
                  <span>🌱 Mission 3: Combined Greenhouse Survival</span>
                </h2>
              </div>
              <span style="font-size: 0.75rem; background: rgba(46,204,113,0.15); border: 1px solid #2ecc71; padding: 4px 10px; border-radius: 4px; color: #2ecc71; font-weight: 700;">
                ${diffName} (${s.drainMultiplier}x Drain)
              </span>
            </div>

            <!-- Narrative Survival Callout: Astronaut Facing Real Difficulty -->
            <div id="gh-crisis-banner" style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.4rem;">⚠️</span>
              <div>
                <strong style="color: #ff80ab;">SURVIVAL ALERT:</strong>
                <span id="gh-crisis-text" style="color: #cfd8dc;">
                  Supply ship arrives in 60 days! Emergency freeze-dried food is dwindling. Tend the hydroponic beds and harvest ripe crops before rations hit zero!
                </span>
              </div>
            </div>

            <!-- Status Dashboard (User Spec Compliant) -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #1f2d3d; padding: 10px 14px; border-radius: 6px; margin-bottom: 12px; text-align: center;">
              <div>📅 <strong>Day:</strong> <span id="gh-day" style="color: #fff; font-weight: 800;">${s.day}</span> / 60</div>
              <div>🍱 <strong>Food Rations:</strong> <span id="gh-food" style="color: ${s.food < 10 ? '#ff3366' : '#f39c12'}; font-weight: 800;">${Math.round(s.food)}</span> days</div>
              <div>💧 <strong>Water Reserves:</strong> <span id="gh-water" style="color: #3498db; font-weight: 800;">${Math.round(s.water)}</span>%</div>
              <div>⚡ <strong>Power Grid:</strong> <span id="gh-power" style="color: #f1c40f; font-weight: 800;">${Math.round(s.power)}</span>%</div>
            </div>

            <!-- Astronaut Vitals & Environmental Gauges -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 6px 12px; margin-bottom: 12px; font-size: 0.75rem; text-align: center;">
              <div>🫁 <strong>Cabin O₂:</strong> <span id="gh-o2" style="color: #00e5ff;">96%</span> (Nominal)</div>
              <div>🌡️ <strong>Bay Temp:</strong> <span id="gh-temp" style="color: #ffe082;">${s.bayTemp}°C</span> (Optimal)</div>
              <div>❤️ <strong>Astronaut Stress:</strong> <span id="gh-heart" style="color: #ff80ab;">${s.heartRate} BPM</span></div>
            </div>

            <!-- PLAYABLE INTERACTIVE GREENHOUSE CANVAS (Astronaut In Action) -->
            <div style="position: relative; width: 100%; border-radius: 8px; overflow: hidden; border: 2px solid #2c3e50; background: #000; margin-bottom: 12px;">
              <canvas id="gh-canvas" width="680" height="260" style="width: 100%; height: auto; display: block;"></canvas>
              
              <!-- Direct Click Station Badges over Canvas -->
              <div style="position: absolute; top: 8px; left: 10px; font-size: 0.7rem; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                🎮 Click stations or buttons below to direct astronaut!
              </div>

              <div id="gh-harvest-flash" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(46,204,113,0.9); color: #000; font-weight: 800; font-size: 1.1rem; padding: 10px 20px; border-radius: 30px; display: none; box-shadow: 0 0 25px #2ecc71; pointer-events: none; z-index: 15;">
                🌾 HARVEST COMPLETE! +18 RATIONS PACKED
              </div>
            </div>

            <!-- Crop Bay Visual Progress Bar (User Spec Compliant) -->
            <div style="margin-bottom: 12px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.84rem;">
                <span>🌿 <strong>Crop Growth Progress:</strong> <span style="font-size: 0.75rem; color: #bdc3c7;">(Stages: Seed ➔ Sprout ➔ Flowering ➔ Golden Harvest)</span></span>
                <span id="gh-growth-text" style="font-weight: 800; color: #2ecc71;">${s.growth}%</span>
              </div>
              <div style="width: 100%; background: #263238; height: 18px; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="gh-growth-bar" style="width: ${s.growth}%; background: linear-gradient(90deg, #27ae60, #2ecc71); height: 100%; transition: width 0.3s;"></div>
              </div>
            </div>

            <!-- Controls (User Spec Compliant + Interactive Astronaut Triggers) -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button id="gh-btn-water" style="flex: 1; min-width: 130px; padding: 12px; background: #2980b9; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s;">
                💧 Irrigate (+Growth)
              </button>
              <button id="gh-btn-power" style="flex: 1; min-width: 130px; padding: 12px; background: #d35400; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s;">
                ☀️ UV Boost (+Growth)
              </button>
              <button id="gh-btn-harvest" style="flex: 1; min-width: 130px; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s; box-shadow: 0 0 12px rgba(46,204,113,0.3);" ${s.growth < 100 ? 'disabled' : ''}>
                🌾 Harvest Crops
              </button>
            </div>

            <button id="gh-btn-next-day" style="width: 100%; padding: 14px; background: #c0392b; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1.05rem; font-weight: 800; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(192, 57, 43, 0.4); margin-bottom: 12px;">
              ⏭️ Advance to Next Day
            </button>

            <!-- Event Log (User Spec Compliant) -->
            <div id="gh-log" style="padding: 10px 14px; background: #0c131a; border-radius: 6px; font-size: 0.85em; min-height: 48px; color: #f1c40f; line-height: 1.45; border: 1px solid rgba(255,255,255,0.08); font-family: monospace;">
              System initialized. Crew has 21 days of food left. Begin farming immediately!
            </div>

            <!-- Detailed Consumables Burn Log & Permadeath Warning -->
            <div style="margin-top: 10px; padding: 8px 12px; background: rgba(0,0,0,0.4); border-radius: 6px; font-size: 0.74rem; color: #bdc3c7; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
              <span>🔥 <strong>Daily Food Burn:</strong> ${(1 * s.drainMultiplier).toFixed(1)} Rations</span>
              <span>♻️ <strong>ECLSS Recovery:</strong> +10% H₂O, +10% Power</span>
              <span>📦 <strong>Total Harvested:</strong> <span id="gh-harvest-total">0</span> batches</span>
              <span style="color: #ff80ab;">💀 <strong>0 Food = Permadeath Reset</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#gh-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const loop = () => {
      this.updatePhysics();
      this.drawCanvas();
      if (this.isOpen) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    this.animId = requestAnimationFrame(loop);
  }

  updatePhysics() {
    const a = this.astronaut;
    // Move astronaut toward target station
    if (Math.abs(a.x - a.targetX) > 3) {
      a.isWalking = true;
      a.direction = a.targetX > a.x ? 1 : -1;
      a.x += a.direction * 3.5;
      a.frame += 0.2;
    } else {
      a.isWalking = false;
      a.x = a.targetX;
      if (a.isWorking) {
        a.workTimer--;
        if (a.workTimer <= 0) {
          a.isWorking = false;
          a.action = "idle";
        }
      }
    }

    // Update harvest particles
    for (let i = this.harvestParticles.length - 1; i >= 0; i--) {
      const p = this.harvestParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;
      p.radius *= 0.96;
      if (p.alpha <= 0 || p.radius <= 0.3) {
        this.harvestParticles.splice(i, 1);
      }
    }
  }

  drawCanvas() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.state;

    // 1. Background: Deep Space & Geodesic Glass Dome
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, w, h);

    // Starfield through greenhouse glass ceiling
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 35; i++) {
      const sx = (i * 73) % w;
      const sy = (i * 37) % 110;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // Distant Earth / Moon crescent outside dome
    ctx.beginPath();
    ctx.arc(w - 70, 45, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#1976d2";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w - 65, 43, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#050b14";
    ctx.fill();

    // Curved Geodesic Dome Frames
    ctx.strokeStyle = "rgba(46, 204, 113, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, 280, 260, Math.PI, 0);
    ctx.stroke();
    // Glass ribs
    for (let r = 0; r < 7; r++) {
      ctx.beginPath();
      ctx.moveTo(80 + r * 85, 0);
      ctx.lineTo(100 + r * 80, 220);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.1)";
      ctx.stroke();
    }

    // 2. High-Tech Metallic Bio-Floor
    ctx.fillStyle = "#111a24";
    ctx.fillRect(0, 215, w, h - 215);
    ctx.strokeStyle = "rgba(46, 204, 113, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 215);
    ctx.lineTo(w, 215);
    ctx.stroke();

    // Floor hazard tape
    for (let x = 0; x < w; x += 30) {
      ctx.fillStyle = "rgba(241, 196, 15, 0.15)";
      ctx.fillRect(x, 216, 14, 4);
    }

    // 3. Overhead UV Grow Lights (Station 2)
    const uvActive = (s.power > 15);
    ctx.fillStyle = uvActive ? "rgba(155, 89, 182, 0.25)" : "rgba(52, 73, 94, 0.2)";
    // Light cones shining onto crop beds
    ctx.beginPath();
    ctx.moveTo(220, 40);
    ctx.lineTo(160, 215);
    ctx.lineTo(520, 215);
    ctx.lineTo(460, 40);
    ctx.closePath();
    ctx.fill();

    // UV Lamp fixtures
    ctx.fillStyle = "#34495e";
    ctx.fillRect(210, 30, 260, 10);
    for (let lx = 230; lx <= 450; lx += 45) {
      ctx.fillStyle = uvActive ? "#e056fd" : "#7f8c8d";
      ctx.beginPath();
      ctx.arc(lx, 42, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Station 1: Water Desal & Reservoir (Left, x: 70)
    ctx.fillStyle = "#1e2b38";
    ctx.fillRect(30, 120, 80, 95);
    ctx.strokeStyle = "#3498db";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 120, 80, 95);

    // Water level inside transparent tube
    const waterHeight = (s.water / 100) * 65;
    ctx.fillStyle = "rgba(52, 152, 219, 0.6)";
    ctx.fillRect(40, 195 - waterHeight, 60, waterHeight);
    ctx.fillStyle = "#fff";
    ctx.font = "10px sans-serif";
    ctx.fillText("💧 WATER", 42, 136);
    ctx.fillText(`${Math.round(s.water)}%`, 50, 152);

    // Hydroponic fluid pipes running to crop beds
    ctx.strokeStyle = "rgba(52, 152, 219, 0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(110, 195);
    ctx.lineTo(240, 195);
    ctx.stroke();

    // 5. Station 3: 3 Hydroponic Crop Beds (Center: x = 200 to 480)
    for (let c = 0; c < this.crops.length; c++) {
      const crop = this.crops[c];
      // Planter container
      ctx.fillStyle = "#1a252f";
      ctx.fillRect(crop.x - 35, 195, 70, 20);
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(crop.x - 35, 195, 70, 20);

      // Label
      ctx.fillStyle = "#bdc3c7";
      ctx.font = "8px sans-serif";
      ctx.fillText(crop.name, crop.x - 30, 210);

      // Draw Growing Space Crops based on s.growth
      const g = s.growth;
      if (g < 25) {
        // Stage 1: Seedlings (tiny green nubs)
        ctx.fillStyle = "#2ecc71";
        for (let ox = -20; ox <= 20; ox += 10) {
          ctx.beginPath();
          ctx.arc(crop.x + ox, 193, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (g < 55) {
        // Stage 2: Sprouting Leaves
        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 2;
        for (let ox = -22; ox <= 22; ox += 11) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox + 2, 182);
          ctx.lineTo(crop.x + ox + 6, 178);
          ctx.stroke();
        }
      } else if (g < 99) {
        // Stage 3: Flowering Stalks
        ctx.strokeStyle = "#2ecc71";
        ctx.lineWidth = 2.5;
        for (let ox = -24; ox <= 24; ox += 12) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox, 170);
          ctx.stroke();
          // Produce / Leaves
          ctx.fillStyle = "#f39c12";
          ctx.beginPath();
          ctx.arc(crop.x + ox, 168, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Stage 4: Mature Golden Harvest (100%) - Radiating with particles!
        ctx.strokeStyle = "#f1c40f";
        ctx.lineWidth = 3;
        for (let ox = -24; ox <= 24; ox += 12) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox + Math.sin(Date.now() * 0.005 + ox) * 2, 160);
          ctx.stroke();
          // Golden grain sheaves
          ctx.fillStyle = "#f39c12";
          ctx.beginPath();
          ctx.arc(crop.x + ox, 156, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Shimmering golden glow effect around ripe crops
        ctx.fillStyle = "rgba(241, 196, 15, 0.25)";
        ctx.beginPath();
        ctx.arc(crop.x, 170, 32, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 6. Station 4: Vacuum Food Dehydrator & Packaging Unit (Right: x = 580)
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(560, 130, 90, 85);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(560, 130, 90, 85);

    // Digital readout on packaging unit
    ctx.fillStyle = "#000";
    ctx.fillRect(570, 140, 70, 24);
    ctx.fillStyle = s.growth >= 100 ? "#2ecc71" : "#e67e22";
    ctx.font = "9px monospace";
    ctx.fillText(s.growth >= 100 ? "READY" : "WAITING", 576, 155);

    ctx.fillStyle = "#ecf0f1";
    ctx.font = "9px sans-serif";
    ctx.fillText("🌾 PACKAGING", 570, 178);
    ctx.fillText(`+18 Rations`, 572, 196);

    // Draw Harvest particles
    this.harvestParticles.forEach(p => {
      ctx.fillStyle = `rgba(241, 196, 15, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. Draw Astronaut Avatar (NASA EVA Bio-Suit)
    this.drawAstronaut(ctx);

    // 8. Station Selection Highlight indicators
    ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
    ctx.font = "10px sans-serif";
    ctx.fillText("Station 1: Pump", 35, 112);
    ctx.fillText("Station 2: UV Solar", 290, 22);
    ctx.fillText("Station 3: Seed Pods", 310, 235);
    ctx.fillText("Station 4: Harvester", 565, 122);
  }

  drawAstronaut(ctx) {
    const a = this.astronaut;
    const ax = a.x;
    const ay = a.y;
    const dir = a.direction;
    const walkBob = a.isWalking ? Math.sin(a.frame * 2) * 2 : 0;

    ctx.save();
    ctx.translate(ax, ay + walkBob);

    // Life support ECLSS backpack
    ctx.fillStyle = "#7f8c8d";
    ctx.fillRect(dir === 1 ? -15 : 5, -28, 10, 22);
    ctx.fillStyle = "#3498db";
    ctx.fillRect(dir === 1 ? -13 : 7, -24, 6, 5); // O2 canister

    // Astronaut Body (White Suit)
    ctx.fillStyle = "#ecf0f1";
    ctx.beginPath();
    ctx.roundRect(-8, -26, 16, 22, 4);
    ctx.fill();
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth = 1;
    ctx.stroke();

    // NASA Blue Mission Patch on chest
    ctx.fillStyle = "#2980b9";
    ctx.beginPath();
    ctx.arc(dir === 1 ? 2 : -2, -18, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Astronaut Helmet / Visor
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, -32, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Gold / Purple reflective Visor
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.ellipse(dir * 3, -32, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d35400";
    ctx.stroke();

    // Legs with walking animation
    const legOffset = a.isWalking ? Math.sin(a.frame * 2.5) * 6 : 0;
    ctx.strokeStyle = "#ecf0f1";
    ctx.lineWidth = 3.5;
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.lineTo(-4 + legOffset, 12);
    ctx.stroke();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(4, -4);
    ctx.lineTo(4 - legOffset, 12);
    ctx.stroke();

    // Boots
    ctx.fillStyle = "#34495e";
    ctx.fillRect(-6 + legOffset, 10, 6, 3);
    ctx.fillRect(2 - legOffset, 10, 6, 3);

    // Arms & Action animations
    if (a.isWorking) {
      // Reaching forward / working with tools
      ctx.strokeStyle = "#ecf0f1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(dir * 14, -18 + Math.sin(Date.now() * 0.02) * 4);
      ctx.stroke();

      // Tool in hand
      if (a.action === "harvesting") {
        ctx.fillStyle = "#f1c40f";
        ctx.fillRect(dir * 14, -22, 6, 8); // Harvest shears/sheaf
      } else if (a.action === "irrigating") {
        ctx.fillStyle = "#3498db";
        ctx.fillRect(dir * 14, -20, 6, 5); // Water nozzle
      } else if (a.action === "uv_boost") {
        ctx.fillStyle = "#e056fd";
        ctx.fillRect(dir * 14, -24, 5, 8); // UV sensor
      }
    } else {
      // Idle arm swing
      ctx.strokeStyle = "#ecf0f1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(dir * 6, -10 + (a.isWalking ? -legOffset * 0.5 : 0));
      ctx.stroke();
    }

    // Overhead Astronaut Label
    ctx.fillStyle = "#2ecc71";
    ctx.font = "8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Astronaut Alex", 0, -45);

    ctx.restore();
  }

  attachEvents() {
    const elDay = this.container.querySelector("#gh-day");
    const elFood = this.container.querySelector("#gh-food");
    const elWater = this.container.querySelector("#gh-water");
    const elPower = this.container.querySelector("#gh-power");
    const elGrowthBar = this.container.querySelector("#gh-growth-bar");
    const elGrowthText = this.container.querySelector("#gh-growth-text");
    const elLog = this.container.querySelector("#gh-log");
    const elTemp = this.container.querySelector("#gh-temp");
    const elHeart = this.container.querySelector("#gh-heart");
    const elHarvestTotal = this.container.querySelector("#gh-harvest-total");

    const btnWater = this.container.querySelector("#gh-btn-water");
    const btnPower = this.container.querySelector("#gh-btn-power");
    const btnHarvest = this.container.querySelector("#gh-btn-harvest");
    const btnNextDay = this.container.querySelector("#gh-btn-next-day");
    const btnClose = this.container.querySelector("#btn-close-gh-modal");
    const canvas = this.container.querySelector("#gh-canvas");

    if (btnClose) {
      btnClose.addEventListener("click", () => {
        if (!this.state.gameOver) {
          if (gameState && gameState.state && gameState.state.telemetry) {
            gameState.state.telemetry.food = Math.min(100, Math.round(this.state.food * 2));
          }
        }
        this.close();
      });
    }

    const updateUI = (message) => {
      if (elDay) elDay.textContent = this.state.day;
      if (elFood) {
        elFood.textContent = Math.round(this.state.food);
        elFood.style.color = this.state.food < 10 ? '#ff3366' : '#f39c12';
      }
      if (elWater) elWater.textContent = Math.round(this.state.water);
      if (elPower) elPower.textContent = Math.round(this.state.power);
      if (elGrowthBar) elGrowthBar.style.width = `${this.state.growth}%`;
      if (elGrowthText) elGrowthText.textContent = `${this.state.growth}%`;
      if (elHarvestTotal) elHarvestTotal.textContent = this.state.harvestCount;

      // Dynamic astronaut vitals
      if (elTemp) elTemp.textContent = `${this.state.bayTemp}°C`;
      if (elHeart) elHeart.textContent = `${this.state.heartRate} BPM`;

      if (message && elLog) {
        elLog.textContent = message;
      }

      if (btnHarvest) btnHarvest.disabled = this.state.growth < 100 || this.state.gameOver;
      if (btnWater) btnWater.disabled = this.state.water < 15 || this.state.gameOver;
      if (btnPower) btnPower.disabled = this.state.power < 15 || this.state.gameOver;
      if (btnNextDay) btnNextDay.disabled = this.state.gameOver;
    };

    // Canvas Click: Send astronaut to clicked station
    if (canvas) {
      canvas.addEventListener("click", (e) => {
        if (this.state.gameOver) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);

        if (clickX < 140) {
          // Clicked Station 1: Water pump
          this.astronaut.targetX = 120;
          btnWater.click();
        } else if (clickX > 520) {
          // Clicked Station 4: Harvester
          this.astronaut.targetX = 540;
          if (this.state.growth >= 100) {
            btnHarvest.click();
          } else {
            sound.playQuindar();
            updateUI("⚠️ Harvester waiting for crop maturity (Crops currently at " + this.state.growth + "%).");
          }
        } else if (clickX >= 220 && clickX <= 460) {
          // Clicked Crop bed: Tending
          this.astronaut.targetX = clickX;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 35;
          this.astronaut.action = "tending";
          sound.playClick();
          updateUI("🌱 Astronaut inspecting aeroponic root nozzles and pruning dry leaves.");
        }
      });
    }

    // 1. Water Action: Send Astronaut to Station 1 & irrigate
    if (btnWater) {
      btnWater.addEventListener("click", () => {
        if (this.state.water >= 15 && !this.state.gameOver) {
          sound.playClick();
          this.astronaut.targetX = 120;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 45;
          this.astronaut.action = "irrigating";

          this.state.water -= 15;
          this.state.growth = Math.min(100, this.state.growth + 25);
          updateUI("💧 Astronaut primed irrigation pump. Crop roots received nutrient mist (+25% Growth, -15% Water).");
        } else if (this.state.water < 15) {
          sound.playWarningAlarm();
          updateUI("⚠️ INSUFFICIENT WATER: Water reserves too low! Wait for tomorrow's condensation recycling (+10%).");
        }
      });
    }

    // 2. UV Boost Action: Send Astronaut to Station 2 & recalibrate lamps
    if (btnPower) {
      btnPower.addEventListener("click", () => {
        if (this.state.power >= 15 && !this.state.gameOver) {
          sound.playClick();
          this.astronaut.targetX = 260;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 45;
          this.astronaut.action = "uv_boost";

          this.state.power -= 15;
          this.state.growth = Math.min(100, this.state.growth + 25);
          this.state.bayTemp = Math.min(26, this.state.bayTemp + 1);
          updateUI("☀️ Astronaut boosted UV grow lamps. Photosynthetic photon flux increased (+25% Growth, -15% Power).");
        } else if (this.state.power < 15) {
          sound.playWarningAlarm();
          updateUI("⚠️ INSUFFICIENT POWER: Battery grid reserves too low! Conserve power for life-support.");
        }
      });
    }

    // 3. Hands-On Harvesting Action: Astronaut harvests crops and packs vacuum rations
    if (btnHarvest) {
      btnHarvest.addEventListener("click", () => {
        if (this.state.growth >= 100 && !this.state.gameOver) {
          sound.playSuccessChime();
          this.astronaut.targetX = 540;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 65;
          this.astronaut.action = "harvesting";

          // Spawn golden harvest particles
          for (let i = 0; i < 25; i++) {
            this.harvestParticles.push({
              x: 340 + (Math.random() * 160 - 80),
              y: 175 + (Math.random() * 20 - 10),
              vx: (Math.random() - 0.5) * 4,
              vy: -Math.random() * 3 - 1,
              radius: Math.random() * 3 + 2,
              alpha: 1.0
            });
          }

          // Show flash badge
          const flash = this.container.querySelector("#gh-harvest-flash");
          if (flash) {
            flash.style.display = "block";
            setTimeout(() => { if (flash) flash.style.display = "none"; }, 1600);
          }

          this.state.growth = 0;
          this.state.food += 18;
          this.state.harvestCount++;
          this.state.rationsPackedTotal += 18;
          gameState.addScore(40);
          sound.playCollect();

          updateUI(`🌾 HARVEST PROCESS COMPLETE: Astronaut reaped golden wheat & soy, processed through vacuum dehydrator, and banked +18 days of food rations! (Total Harvests: ${this.state.harvestCount})`);
        }
      });
    }

    // 4. Advance to Next Day: Simulates harsh deep space survival day-by-day
    if (btnNextDay) {
      btnNextDay.addEventListener("click", () => {
        if (this.state.gameOver) return;

        sound.playClick();
        this.state.day += 1;

        // Daily food burn scaled by difficulty
        const foodBurn = 1 * this.state.drainMultiplier;
        this.state.food -= foodBurn;

        // Natural daily crop growth and closed-loop ECLSS recycling
        this.state.growth = Math.min(100, this.state.growth + 5);
        this.state.water = Math.min(100, this.state.water + 10);
        this.state.power = Math.min(100, this.state.power + 10);

        // Adjust astronaut stress & bay temp
        if (this.state.food < 10) {
          this.state.heartRate = 110;
          sound.playWarningAlarm();
        } else {
          this.state.heartRate = 74;
        }

        // Random survival crisis check (every ~18 days)
        if (this.state.day % 18 === 0 && !this.activeCrisis && this.state.day < 110) {
          this.triggerRandomSurvivalCrisis(updateUI);
        }

        // Check Victory or Casualty
        if (this.state.food <= 0) {
          this.state.food = 0;
          this.state.gameOver = true;
          this.astronaut.isWorking = false;
          this.astronaut.action = "idle";
          sound.playFail();

          updateUI(`💀 MISSION FAILED: The crew ran out of food on Day ${this.state.day} before the supply ship arrived.`);
          btnNextDay.textContent = "Simulation Over (Casualty)";
          btnNextDay.style.background = "#c0392b";

          // Trigger Permadeath Protocol
          setTimeout(() => {
            this.close();
            gameState.failMission({
              cause: "Orbital Greenhouse Starvation Casualty",
              tip: "Tend the crop beds rhythmically: irrigate and boost UV every time water/power recharge so you can harvest before rations hit zero.",
              causalityList: [
                `Emergency rations exhausted on Day ${this.state.day} of 60-day isolation`,
                `Metabolic consumption rate (${this.state.drainMultiplier}x) outpaced crop growth yield`,
                "Crew starvation casualty. Permadeath zero-reset engaged."
              ],
              daysSurvived: this.state.day
            });
          }, 2000);

        } else if (this.state.day >= this.state.targetDay) {
          this.state.gameOver = true;
          sound.playSuccessChime();
          gameState.addScore(500);
          gameState.unlockAchievement("master_botanist");
          gameState.progressObjective("moon_greenhouse", 1);
          gameState.progressObjective("mars_greenhouse", 1);

          if (gameState.state && gameState.state.telemetry) {
            gameState.state.telemetry.food = 100;
          }

          updateUI("🚀 MISSION 3 SUCCESS: The 60-day isolation is conquered! The Artemis Resupply Lander is descending into lunar orbit! Ready for Final Mission: Resupply & Extraction.");
          btnNextDay.textContent = "🚀 Launch Final Mission: Resupply & Extraction ➔";
          btnNextDay.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
          btnNextDay.style.boxShadow = "0 0 20px rgba(46,204,113,0.6)";
          btnNextDay.disabled = false;

          btnNextDay.onclick = () => {
            sound.playClick();
            this.close();
            if (window.extractionModal) {
              window.extractionModal.open(this.onCompleteCallback);
            }
          };

        } else {
          updateUI(`📅 Day ${this.state.day}: Astronaut consumed ${foodBurn.toFixed(1)} ration(s). Closed-loop life support recycled +10% water & power.`);
        }
      });
    }

    updateUI();
  }

  triggerRandomSurvivalCrisis(updateUI) {
    sound.playWarningAlarm();
    const crisisType = Math.random() > 0.5 ? "temp_drop" : "pipe_leak";

    if (crisisType === "temp_drop") {
      this.state.bayTemp = 11;
      this.state.heartRate = 118;
      updateUI("🚨 EMERGENCY: Thermal heater breaker tripped! Bay temperature plunged to 11°C! Click UV Boost to restore thermal coils!");
    } else {
      this.state.water = Math.max(10, this.state.water - 20);
      this.state.heartRate = 112;
      updateUI("🚨 EMERGENCY: Micro-puncture in hydroponic line! -20% Water vented. Click Irrigate to seal and repressurize!");
    }
  }
}

if (typeof window !== "undefined") {
  window.GreenhouseModal = GreenhouseModal;
}
