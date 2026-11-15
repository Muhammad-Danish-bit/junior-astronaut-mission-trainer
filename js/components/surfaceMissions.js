// ============================================================================
// SURFACE SCIENCE MISSIONS & EQUIPMENT REPAIR MINI-GAMES
// Interactive Drills, Spectrometer, Wire Circuit Repair, Leak Patching, Pipe Thawing
// ============================================================================

import { sound } from "../audio.js";
import { gameState } from "../state.js";
import { GAME_CONFIG } from "../config.js";

export class SurfaceMissionsManager {
  constructor(modalContainer) {
    this.container = modalContainer;
  }

  // --- 1. Raw Material Core Sample Drilling ---
  startDrillMission(resource, onComplete) {
    sound.playClick();
    let currentDepth = 0;
    const targetDepth = 100;
    let drillSweetSpot = false;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">${resource.icon}</div>
        <h3 style="color: var(--border-cyan); font-size: 1.25rem;">
          Drilling Core Sample: ${resource.name}
        </h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 6px 0 16px 0;">
          Hold the drill button to penetrate the planetary permafrost. Keep the pressure gauge inside the GREEN sweet spot to extract sample cleanly!
        </p>

        <!-- Depth Progress Bar -->
        <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 6px;">
            <span>CORE DRILL DEPTH</span>
            <span id="drill-depth-text">0%</span>
          </div>
          <div style="height: 12px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
            <div id="drill-depth-fill" style="height: 100%; width: 0%; background: var(--text-highlight); transition: width 0.1s;"></div>
          </div>
        </div>

        <!-- Pressure Needle Meter -->
        <div style="margin-bottom: 20px; background: rgba(0,0,0,0.4); border-radius: 8px; padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">DRILL PRESSURE NEEDLE</div>
          <div style="display: flex; height: 16px; border-radius: 8px; overflow: hidden; position: relative;">
            <div style="width: 30%; background: #ff9100;"></div>
            <div style="width: 40%; background: var(--text-highlight);"></div>
            <div style="width: 30%; background: #ff3366;"></div>
            <div id="pressure-indicator" style="position: absolute; top: -3px; left: 10%; width: 8px; height: 22px; background: #fff; border-radius: 3px; box-shadow: 0 0 8px #fff; transition: left 0.08s;"></div>
          </div>
        </div>

        <button class="btn-primary" id="btn-drill-press" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px;">
          ⚡ ENGAGE CORE DRILL
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let isPressing = false;
    let needlePos = 20;
    let needleDir = 1;

    const interval = setInterval(() => {
      needlePos += needleDir * 3.8;
      if (needlePos >= 90) needleDir = -1;
      if (needlePos <= 10) needleDir = 1;

      const needleEl = overlay.querySelector("#pressure-indicator");
      if (needleEl) needleEl.style.left = `${needlePos}%`;

      drillSweetSpot = needlePos >= 30 && needlePos <= 70;

      if (isPressing) {
        currentDepth += drillSweetSpot ? 2.6 : 0.8;
        const depthFill = overlay.querySelector("#drill-depth-fill");
        const depthText = overlay.querySelector("#drill-depth-text");

        if (depthFill) depthFill.style.width = `${Math.min(100, currentDepth)}%`;
        if (depthText) depthText.textContent = `${Math.min(100, Math.round(currentDepth))}%`;

        if (currentDepth >= targetDepth) {
          clearInterval(interval);
          sound.playSuccessChime();
          gameState.addScore(resource.value);
          gameState.refillResources(resource.refill);

          // Progress level objectives if relevant
          if (resource.id === "regolith") gameState.progressObjective("moon_regolith", 1);
          if (resource.id === "polar_ice" || resource.id === "subsurface_brine") gameState.progressObjective("mars_water_ice", 1);
          if (resource.id === "cryo_ice") gameState.progressObjective("europa_ice_core", 1);

          overlay.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
              <div style="font-size: 3.5rem; margin-bottom: 8px;">💎</div>
              <h3 style="color: var(--text-highlight); font-size: 1.4rem;">SAMPLE SECURED!</h3>
              <p style="font-size: 0.88rem; color: #cfd8dc; margin: 10px 0;">
                Successfully extracted <strong>${resource.name}</strong>! Resource stores refilled and +${resource.value} Science Points awarded.
              </p>
              <button class="btn-primary" id="btn-close-drill" style="width: 100%; justify-content: center;">
                Stow Sample & Continue 🎒
              </button>
            </div>
          `;

          overlay.querySelector("#btn-close-drill").addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (onComplete) onComplete();
          });
        }
      }
    }, 50);

    const drillBtn = overlay.querySelector("#btn-drill-press");
    drillBtn.addEventListener("pointerdown", () => { isPressing = true; sound.playCollect(); });
    window.addEventListener("pointerup", () => { isPressing = false; });
  }

  // --- 2. Rewire a Circuit Mini-Game ---
  startCircuitRewireGame(onSuccess, onFail) {
    sound.playAlarm();
    let timeLeft = 12;
    const wires = [
      { id: "red", color: "#ff3366", connected: false },
      { id: "blue", color: "#00e5ff", connected: false },
      { id: "gold", color: "#ffd600", connected: false }
    ];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🔌</div>
        <h3 style="color: #ff3366; font-size: 1.3rem;">ELECTRICAL BUS CIRCUIT BREAKER FAILURE</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Main bus shorted! Tap matching color terminals to reconnect emergency power bypass before batteries freeze!
        </p>

        <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: 800; color: #ff3366; margin-bottom: 12px;" id="wire-timer">
          TIME TO BLACKOUT: 12s
        </div>

        <!-- Wire terminals grid -->
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px 30px; margin-bottom: 16px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${wires.map((w) => `
              <button class="btn-step btn-wire-src" data-color="${w.id}" style="background: ${w.color}; width: 44px; height: 44px; border-radius: 50%; font-size: 1rem; color: #000; font-weight: 800;">⚡</button>
            `).join("")}
          </div>
          <div style="display: flex; align-items: center; color: var(--text-muted); font-size: 0.8rem;">
            <span>➔ RECONNECT LEADS ➔</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${[wires[1], wires[2], wires[0]].map((w) => `
              <button class="btn-step btn-wire-dst" data-color="${w.id}" style="background: rgba(255,255,255,0.1); border: 2px solid ${w.color}; width: 44px; height: 44px; border-radius: 50%; font-size: 1rem; color: #fff;">○</button>
            `).join("")}
          </div>
        </div>

        <div style="font-size: 0.78rem; color: var(--accent-gold);" id="wire-instruction-msg">
          Click a colored terminal on the LEFT, then click its matching color terminal on the RIGHT!
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let selectedColor = null;
    let connectedCount = 0;

    const timer = setInterval(() => {
      timeLeft--;
      const timeEl = overlay.querySelector("#wire-timer");
      if (timeEl) timeEl.textContent = `TIME TO BLACKOUT: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        sound.playFail();
        overlay.remove();
        if (onFail) onFail();
      }
    }, 1000);

    overlay.querySelectorAll(".btn-wire-src").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        selectedColor = btn.getAttribute("data-color");
        overlay.querySelectorAll(".btn-wire-src").forEach((b) => b.style.outline = "");
        btn.style.outline = "3px solid #fff";
      });
    });

    overlay.querySelectorAll(".btn-wire-dst").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!selectedColor) return;
        const targetColor = btn.getAttribute("data-color");
        if (selectedColor === targetColor) {
          sound.playSuccessChime();
          btn.style.background = btn.style.borderColor;
          btn.textContent = "✓";
          btn.disabled = true;
          connectedCount++;
          selectedColor = null;

          if (connectedCount >= 3) {
            clearInterval(timer);
            sound.playSuccessChime();
            overlay.remove();
            if (onSuccess) onSuccess();
          }
        } else {
          sound.playFail();
        }
      });
    });
  }

  // --- 3. Patch a Leak Mini-Game (O2 Manifold or Suit Tear) ---
  startLeakPatchGame(onSuccess, onFail) {
    sound.playAlarm();
    let timeLeft = 10;
    let patchedCount = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">⚠️</div>
        <h3 style="color: #ff3366; font-size: 1.3rem;">CRITICAL OXYGEN / SUIT LEAK BREACH</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Micro-puncture venting breathable air! Rapidly click/tap all 3 hissing rupture holes to apply emergency sealant patches!
        </p>

        <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: 800; color: #ff3366; margin-bottom: 12px;" id="leak-timer">
          DEPRESSURIZATION: 10s
        </div>

        <!-- Pipe simulation area with 3 rupture holes -->
        <div id="leak-puncture-area" style="position: relative; height: 160px; background: #1a2332; border: 2px dashed rgba(255,255,255,0.2); border-radius: 12px; margin-bottom: 16px; overflow: hidden;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 32px; transform: translateY(-50%); background: #37474f; border-top: 2px solid #546e7a; border-bottom: 2px solid #263238;"></div>
          
          <button class="btn-step btn-leak-point" style="position: absolute; top: 40px; left: 80px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
          <button class="btn-step btn-leak-point" style="position: absolute; top: 70px; left: 220px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
          <button class="btn-step btn-leak-point" style="position: absolute; top: 45px; left: 350px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--accent-gold);">
          Hurry! Each second of breach drains oxygen and drops suit integrity!
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    const timer = setInterval(() => {
      timeLeft--;
      const timeEl = overlay.querySelector("#leak-timer");
      if (timeEl) timeEl.textContent = `DEPRESSURIZATION: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        sound.playFail();
        overlay.remove();
        if (onFail) onFail();
      }
    }, 1000);

    overlay.querySelectorAll(".btn-leak-point").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playSuccessChime();
        btn.textContent = "🩹";
        btn.style.background = "var(--text-highlight)";
        btn.style.boxShadow = "0 0 10px var(--text-highlight)";
        btn.style.animation = "none";
        btn.disabled = true;
        patchedCount++;

        if (patchedCount >= 3) {
          clearInterval(timer);
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      });
    });
  }

  // --- 4. Thaw Frozen Water Pipes Mini-Game ---
  startThawPipesGame(onSuccess, onFail) {
    sound.playAlarm();
    let thawProgress = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🧊</div>
        <h3 style="color: #29b6f6; font-size: 1.3rem;">WATER COOLANT PIPES FROZEN SOLID</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Cabin freeze caused water blockages! Hold the thermal heating wand over the frozen pipe section to melt the ice!
        </p>

        <div style="background: rgba(0,0,0,0.5); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 6px;">
            <span>PIPE DE-ICING PROGRESS</span>
            <span id="thaw-progress-text">0%</span>
          </div>
          <div style="height: 12px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
            <div id="thaw-progress-fill" style="height: 100%; width: 0%; background: #29b6f6; transition: width 0.1s;"></div>
          </div>
        </div>

        <button class="btn-primary" id="btn-hold-thaw" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px; background: linear-gradient(135deg, #ff9100, #ff3d00);">
          🔥 HOLD THERMAL DE-ICER
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let isHolding = false;
    const interval = setInterval(() => {
      if (isHolding) {
        thawProgress += 4;
        const fill = overlay.querySelector("#thaw-progress-fill");
        const text = overlay.querySelector("#thaw-progress-text");
        if (fill) fill.style.width = `${Math.min(100, thawProgress)}%`;
        if (text) text.textContent = `${Math.min(100, thawProgress)}%`;

        if (thawProgress >= 100) {
          clearInterval(interval);
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      }
    }, 100);

    const btn = overlay.querySelector("#btn-hold-thaw");
    btn.addEventListener("pointerdown", () => { isHolding = true; sound.playThrusterPulse(); });
    window.addEventListener("pointerup", () => { isHolding = false; });
  }

  // --- 5. Sweep Dust Off Solar Panels Mini-Game ---
  startClearPanelsGame(onSuccess, onFail) {
    sound.playAlarm();
    let dustCleaned = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🌪️</div>
        <h3 style="color: #ff9100; font-size: 1.3rem;">MARTIAN DUST SQUALL OBSCURING ARRAYS</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Iron-oxide dust dropped solar power to 0 kW! Drag your wiper across the 4 solar cells to clear the dust!
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
          ${[1, 2, 3, 4].map((i) => `
            <button class="btn-step btn-solar-cell" style="height: 70px; background: #5d4037; border: 2px dashed #ff9100; border-radius: 8px; font-size: 0.85rem; color: #ffe0b2; font-weight: 700;">
              🧹 Clear Cell #${i}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelectorAll(".btn-solar-cell").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playSuccessChime();
        btn.style.background = "#ffd54f";
        btn.style.color = "#000";
        btn.style.borderStyle = "solid";
        btn.textContent = "☀️ Cleaned (100%)";
        btn.disabled = true;
        dustCleaned++;

        if (dustCleaned >= 4) {
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      });
    });
  }

  // --- 6. Laser Spectrometer Mineral Analyzer ---
  startSpectrometerMission(onComplete) {
    sound.playQuindar();
    const elements = [
      { name: "Titanium Oxide (Lunar Ilmenite)", bandColor: "#00e5ff", symbol: "Ti", points: 70 },
      { name: "Water Ice / Hydrated Permafrost", bandColor: "#4fc3f7", symbol: "H2O", points: 80 },
      { name: "Iron Oxide (Martian Hematite)", bandColor: "#ff7043", symbol: "Fe2O3", points: 75 },
      { name: "Sulfate Salts (Europa Deep Core)", bandColor: "#ffd54f", symbol: "SO4", points: 95 }
    ];
    const target = elements[Math.floor(Math.random() * elements.length)];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>🔬</span>
            <span>Laser Spectrometer Analysis</span>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #cfd8dc; margin-bottom: 16px; line-height: 1.5;">
          NASA rovers like <em>Curiosity</em> and <em>Perseverance</em> zap rocks with a laser to measure their light emission spectrum. Match the sensor emission band to identify this planetary specimen:
        </p>

        <div style="background: rgba(0,0,0,0.5); border: 2px solid var(--border-cyan); border-radius: var(--radius-md); padding: 16px; text-align: center; margin-bottom: 18px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Emission Absorption Wavelength</div>
          <div style="height: 36px; border-radius: 6px; background: ${target.bandColor}; margin: 8px 0; box-shadow: 0 0 15px ${target.bandColor}; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #000;">
            ${target.symbol} ABSORPTION SPECTRUM
          </div>
        </div>

        <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 10px;">Select Matching Mineral Compound:</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${elements.map((el) => `
            <button class="btn-secondary btn-spectral-choice" data-target="${el.symbol === target.symbol}" style="justify-content: flex-start; padding: 12px; border-left: 4px solid ${el.bandColor};">
              <span style="font-size: 1.1rem; margin-right: 6px;">🧪</span>
              <span style="font-size: 0.8rem; text-align: left;">${el.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelectorAll(".btn-spectral-choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isMatch = btn.getAttribute("data-target") === "true";
        if (isMatch) {
          sound.playSuccessChime();
          gameState.addScore(target.points);
          gameState.refillResources({ power: 25 });

          // Check if objective can be progressed
          gameState.progressObjective("moon_seismometer", 1);
          gameState.progressObjective("europa_data_relay", 1);

          overlay.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
              <div style="font-size: 3.5rem; margin-bottom: 8px;">🎉</div>
              <h3 style="color: var(--text-highlight); font-size: 1.4rem;">SPECTRAL MATCH VERIFIED!</h3>
              <p style="font-size: 0.9rem; color: #cfd8dc; margin: 10px 0;">
                Compound identified as <strong>${target.name}</strong>! +${target.points} Science Points recorded in NASA database.
              </p>
              <button class="btn-primary" id="btn-close-spec" style="width: 100%; justify-content: center;">
                Log Findings & Return 🔬
              </button>
            </div>
          `;
          overlay.querySelector("#btn-close-spec").addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (onComplete) onComplete();
          });
        } else {
          sound.playFail();
          alert("Spectral wavelength mismatch! Review the absorption color band and try again.");
        }
      });
    });
  }

  // --- 6. Debris Cleanup & Crash Site Forensic Investigation ---
  startDebrisCleanupMission(onComplete) {
    sound.playQuindar();
    const missionData = (GAME_CONFIG.SPECIAL_MISSIONS && GAME_CONFIG.SPECIAL_MISSIONS.debris) || {
      id: "debris",
      name: "Debris Cleanup",
      emoji: "🧹",
      color: "#b08968",
      crew: 2,
      days: 4,
      budget: 90,
      size: 16,
      blurb: "A previous mission crashed on the surface. Collect the wreckage and find out what went wrong.",
      needs: { fuel: 16, life: 20, shield: 14, thermal: 14, science: 12 },
      events: [
        { icon: "🔪", name: "Sharp metal fragments", cat: "shield", text: "Jagged debris threatens to tear your suit and damage the rover." },
        { icon: "☣️", name: "Leaked fuel residue", cat: "life", text: "Toxic leftover fuel contaminates the area and your air filters." },
        { icon: "🔥", name: "Hot wreckage in sunlight", cat: "thermal", text: "Metal pieces heat up under the Sun and strain your cooling system." },
        { icon: "🚜", name: "Rover stuck in debris", cat: "fuel", text: "The rover gets stuck between wreckage pieces and needs extra power to escape." }
      ],
      quiz: [
        {
          q: "Why do engineers collect wreckage from a failed mission?",
          a: ["To learn what went wrong and prevent it next time", "To decorate the base", "Because it is free fuel"],
          c: 0,
          why: "Studying failures is one of the best ways engineers improve future missions."
        },
        {
          q: "Why is sharp debris dangerous on the Moon?",
          a: ["It can puncture suits and damage rovers", "It makes the Moon heavier", "It blocks the Sun"],
          c: 0,
          why: "With no air and no easy rescue, even a small suit puncture is serious."
        }
      ]
    };

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";

    // Track state inside mission
    let currentPhase = "briefing"; // 'briefing', 'collecting', 'quiz', 'done'
    let fragmentsCollected = [];
    let currentEvent = null;
    let quizIndex = 0;
    let quizAnswered = false;

    const fragments = [
      { id: "solar", name: "Solar Array Spar", icon: "☀️", eventIdx: 2 },
      { id: "blackbox", name: "Flight Telemetry Black Box", icon: "📟", eventIdx: 0 },
      { id: "tank", name: "Cryogenic Fuel Manifold", icon: "☣️", eventIdx: 1 },
      { id: "chassis", name: "Impacted Rover Carriage", icon: "🚜", eventIdx: 3 }
    ];

    const render = () => {
      if (currentPhase === "briefing") {
        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 620px; border-top: 4px solid ${missionData.color};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2.8rem; background: rgba(176,137,104,0.15); padding: 8px 12px; border-radius: 12px; border: 1px solid ${missionData.color};">${missionData.emoji}</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${missionData.color}; font-weight: 800; letter-spacing: 1.5px;">NASA LUNAR SURFACE EXPEDITION</div>
                  <h3 style="font-size: 1.4rem; color: #fff; margin: 2px 0;">${missionData.name}</h3>
                </div>
              </div>
              <button class="btn-icon" id="btn-close-debris-modal" style="width: 32px; height: 32px;">✕</button>
            </div>

            <div style="background: rgba(0,0,0,0.4); border-left: 3px solid ${missionData.color}; padding: 12px 16px; border-radius: 6px; font-size: 0.88rem; color: #cfd8dc; line-height: 1.5; margin-bottom: 16px;">
              "${missionData.blurb}"
            </div>

            <!-- Mission Parameters Badge Row -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">CREW</div>
                <strong style="color: #fff; font-size: 0.95rem;">👨‍🚀 ${missionData.crew} Astronauts</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">DURATION</div>
                <strong style="color: #fff; font-size: 0.95rem;">⏱️ ${missionData.days} Days</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">EXPEDITION BUDGET</div>
                <strong style="color: var(--accent-gold); font-size: 0.95rem;">💰 $${missionData.budget}M</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">CRASH SECTOR</div>
                <strong style="color: var(--border-cyan); font-size: 0.95rem;">🗺️ ${missionData.size} km²</strong>
              </div>
            </div>

            <!-- Required Supplies Need Allocation -->
            <div style="background: rgba(14,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: #ffe082; margin-bottom: 8px; text-transform: uppercase;">
                ⚖️ Operational Resource Requirements:
              </div>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 0.76rem;">
                <div style="text-align: center;"><span style="color: var(--meter-fuel);">⛽ Fuel:</span> <strong>${missionData.needs.fuel}%</strong></div>
                <div style="text-align: center;"><span style="color: var(--meter-oxygen);">🫁 Life:</span> <strong>${missionData.needs.life}%</strong></div>
                <div style="text-align: center;"><span style="color: #b388ff;">🛡️ Shield:</span> <strong>${missionData.needs.shield}%</strong></div>
                <div style="text-align: center;"><span style="color: #ff9100;">🌡️ Thermal:</span> <strong>${missionData.needs.thermal}%</strong></div>
                <div style="text-align: center;"><span style="color: #26c6da;">🔬 Science:</span> <strong>${missionData.needs.science}%</strong></div>
              </div>
            </div>

            <button class="btn-primary" id="btn-start-debris-field" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #b08968, #7f5539);">
              <span>Deploy Debris Recovery Team & Investigate Crash Site 🚜</span>
            </button>
          </div>
        `;

        overlay.querySelector("#btn-close-debris-modal").addEventListener("click", () => {
          overlay.remove();
        });

        overlay.querySelector("#btn-start-debris-field").addEventListener("click", () => {
          sound.playClick();
          currentPhase = "collecting";
          render();
        });

      } else if (currentPhase === "collecting") {
        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 640px; border-top: 4px solid ${missionData.color};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <span style="font-size: 0.72rem; color: ${missionData.color}; font-weight: 800;">PHASE 2: WRECKAGE RECOVERY</span>
                <h3 style="font-size: 1.25rem; color: #fff; margin: 2px 0;">Surveying Lunar Crash Site Alpha (16 km²)</h3>
              </div>
              <span style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 800;">
                Fragments: ${fragmentsCollected.length} / 4
              </span>
            </div>

            <p style="font-size: 0.82rem; color: #cfd8dc; margin-bottom: 14px;">
              Click each piece of wreckage to salvage components and download diagnostic telemetry. Watch for environmental hazards!
            </p>

            <!-- Debris Field Recovery Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
              ${fragments.map((frag) => {
                const isCollected = fragmentsCollected.includes(frag.id);
                return `
                  <div class="debris-item-card ${isCollected ? 'collected' : ''}" data-frag-id="${frag.id}" style="background: ${isCollected ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${isCollected ? 'var(--text-highlight)' : 'rgba(255,255,255,0.1)'}; border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px; cursor: ${isCollected ? 'default' : 'pointer'}; transition: all 0.2s;">
                    <span style="font-size: 2.2rem;">${frag.icon}</span>
                    <div style="flex: 1;">
                      <div style="font-weight: 800; font-size: 0.88rem; color: ${isCollected ? 'var(--text-highlight)' : '#fff'};">${frag.name}</div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">${isCollected ? '✓ Salvaged & Stowed' : 'Click to inspect & retrieve'}</div>
                    </div>
                    <span style="font-size: 1.1rem; color: ${isCollected ? 'var(--text-highlight)' : 'rgba(255,255,255,0.3)'};">${isCollected ? '✓' : '○'}</span>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Active Hazard Card (if triggered) -->
            ${currentEvent ? `
              <div style="background: rgba(255, 51, 102, 0.12); border: 2px solid #ff3366; border-radius: 8px; padding: 14px; margin-bottom: 16px; animation: pulseDot 1s infinite alternate;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                  <span style="font-size: 1.8rem;">${currentEvent.icon}</span>
                  <div>
                    <span style="font-size: 0.7rem; color: #ff80ab; font-weight: 800; text-transform: uppercase;">EMERGENCY HAZARD TRIGGERED • CAT: ${currentEvent.cat.toUpperCase()}</span>
                    <h4 style="color: #fff; font-size: 1.05rem; margin: 0;">${currentEvent.name}</h4>
                  </div>
                </div>
                <p style="font-size: 0.82rem; color: #ffebee; margin: 6px 0 12px 0; line-height: 1.4;">
                  ${currentEvent.text}
                </p>
                <button class="btn-primary" id="btn-resolve-hazard" style="width: 100%; justify-content: center; background: #ff3366; color: #fff; font-weight: 800;">
                  <span>Execute Hazard Countermeasure 🛡️</span>
                </button>
              </div>
            ` : `
              <div style="background: rgba(0,0,0,0.3); border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; text-align: center; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 16px;">
                ${fragmentsCollected.length === 4 ? '🎉 All wreckage secured! Ready for forensic failure analysis.' : 'Retrieve remaining fragments above to proceed to root-cause engineering debrief.'}
              </div>
            `}

            ${fragmentsCollected.length === 4 && !currentEvent ? `
              <button class="btn-primary" id="btn-proceed-to-quiz" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #00e5ff, #0091ea);">
                <span>Proceed to Engineering Failure Analysis Quiz 🔬</span>
              </button>
            ` : ''}
          </div>
        `;

        // Click fragments
        overlay.querySelectorAll(".debris-item-card").forEach((card) => {
          card.addEventListener("click", () => {
            const fragId = card.getAttribute("data-frag-id");
            if (fragmentsCollected.includes(fragId) || currentEvent) return;

            sound.playCollect();
            fragmentsCollected.push(fragId);

            // Trigger corresponding hazard event
            const fragObj = fragments.find(f => f.id === fragId);
            if (fragObj && missionData.events[fragObj.eventIdx]) {
              currentEvent = missionData.events[fragObj.eventIdx];
              sound.playWarningAlarm();
            }

            render();
          });
        });

        // Resolve hazard
        const btnResolve = overlay.querySelector("#btn-resolve-hazard");
        if (btnResolve) {
          btnResolve.addEventListener("click", () => {
            sound.playSuccessChime();
            gameState.addScore(25);
            currentEvent = null;
            render();
          });
        }

        // Proceed to Quiz
        const btnQuiz = overlay.querySelector("#btn-proceed-to-quiz");
        if (btnQuiz) {
          btnQuiz.addEventListener("click", () => {
            sound.playClick();
            currentPhase = "quiz";
            quizIndex = 0;
            quizAnswered = false;
            render();
          });
        }

      } else if (currentPhase === "quiz") {
        const qObj = missionData.quiz[quizIndex];
        const isLastQuiz = quizIndex === missionData.quiz.length - 1;

        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 600px; border-top: 4px solid var(--border-cyan);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <span style="font-size: 0.72rem; color: var(--border-cyan); font-weight: 800;">PHASE 3: NASA FORENSIC ANALYSIS QUIZ</span>
                <h3 style="font-size: 1.25rem; color: #fff; margin: 2px 0;">Failure Investigation Debrief</h3>
              </div>
              <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 800;">
                Question ${quizIndex + 1} of ${missionData.quiz.length}
              </span>
            </div>

            <!-- Question Card -->
            <div style="background: rgba(14,23,42,0.85); border: 1px solid rgba(0,229,255,0.3); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <h4 style="color: #fff; font-size: 1.05rem; line-height: 1.45; margin: 0 0 14px 0;">
                ${qObj.q}
              </h4>

              <div style="display: flex; flex-direction: column; gap: 8px;" id="quiz-options-container">
                ${qObj.a.map((opt, i) => `
                  <button class="btn-secondary btn-quiz-opt" data-opt-idx="${i}" style="justify-content: flex-start; text-align: left; padding: 12px 16px; font-size: 0.88rem; border-radius: 8px;">
                    <span style="font-weight: 800; margin-right: 8px; color: var(--border-cyan);">${String.fromCharCode(65 + i)}:</span>
                    <span>${opt}</span>
                  </button>
                `).join("")}
              </div>

              <!-- Explanation Callout -->
              <div id="quiz-explanation-box" style="display: none; margin-top: 14px; background: rgba(0, 230, 118, 0.1); border-left: 3px solid var(--text-highlight); padding: 10px 14px; border-radius: 4px; font-size: 0.82rem; color: #cfd8dc;">
                <strong style="color: var(--text-highlight);">NASA Engineering Principle:</strong> ${qObj.why}
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn-primary" id="btn-next-quiz" style="display: none; padding: 10px 22px;">
                ${isLastQuiz ? 'Complete Investigation & Claim +250 Pts 🏆' : 'Next Question →'}
              </button>
            </div>
          </div>
        `;

        overlay.querySelectorAll(".btn-quiz-opt").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (quizAnswered) return;
            quizAnswered = true;

            const selectedIdx = parseInt(btn.getAttribute("data-opt-idx"));
            const explBox = overlay.querySelector("#quiz-explanation-box");
            const nextBtn = overlay.querySelector("#btn-next-quiz");

            if (selectedIdx === qObj.c) {
              sound.playSuccessChime();
              btn.style.background = "rgba(0, 230, 118, 0.25)";
              btn.style.borderColor = "var(--text-highlight)";
              btn.style.color = "var(--text-highlight)";
              gameState.addScore(50);
            } else {
              sound.playFail();
              btn.style.background = "rgba(255, 51, 102, 0.25)";
              btn.style.borderColor = "#ff3366";
              // Highlight correct option
              const correctBtn = overlay.querySelector(`.btn-quiz-opt[data-opt-idx="${qObj.c}"]`);
              if (correctBtn) {
                correctBtn.style.background = "rgba(0, 230, 118, 0.25)";
                correctBtn.style.borderColor = "var(--text-highlight)";
              }
            }

            if (explBox) explBox.style.display = "block";
            if (nextBtn) nextBtn.style.display = "inline-flex";
          });
        });

        const nextBtn = overlay.querySelector("#btn-next-quiz");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            sound.playClick();
            if (isLastQuiz) {
              currentPhase = "done";
              render();
            } else {
              quizIndex++;
              quizAnswered = false;
              render();
            }
          });
        }

      } else if (currentPhase === "done") {
        sound.playSuccessChime();
        gameState.addScore(100);
        gameState.progressObjective("moon_debris", 1);
        gameState.refillResources({ oxygen: 20, power: 20, water: 15 });

        const diffKey = gameState.state.difficulty || "cadet";
        const diff = GAME_CONFIG.DIFFICULTY[diffKey] || GAME_CONFIG.DIFFICULTY.cadet;

        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 540px; text-align: center; border-top: 4px solid var(--text-highlight);">
            <div style="font-size: 3.5rem; margin-bottom: 6px;">🧹🏆</div>
            <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 800; letter-spacing: 2px;">MISSION CERTIFIED • NASA FLIGHT OPS</div>
            <h3 style="color: #fff; font-size: 1.45rem; margin: 4px 0 8px 0;">DEBRIS CLEANUP COMPLETE!</h3>
            
            <p style="font-size: 0.85rem; color: #cfd8dc; line-height: 1.5; margin-bottom: 14px;">
              Crash site wreckage successfully cleared and analyzed! Root-cause flight telemetry has been transmitted back to Houston Mission Control to safeguard all future Artemis missions.
            </p>

            <!-- 4-Sol Consumables Burn & Survival Breakdown -->
            <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 14px; text-align: left; font-size: 0.78rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <strong style="color: #fff;">4-Sol EVA Consumables Burn Report:</strong>
                <span style="color: var(--accent-gold); font-weight: 700;">Difficulty: ${diff.name} (${diff.drainMultiplier}x)</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center; margin-bottom: 6px;">
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">🫁 O2: -${Math.round(14 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">💧 H2O: -${Math.round(16 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">🍱 Food: -${Math.round(12 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">⚡ Pwr: -${Math.round(18 * diff.drainMultiplier)}%</div>
              </div>
              <div style="color: var(--text-highlight); font-size: 0.72rem;">
                ✓ Reserves Replenished: +20% O2, +20% Power & +15% Water recycled from salvaged lander modules!
              </div>
            </div>

            <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--text-highlight); border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <strong style="color: var(--text-highlight); font-size: 1rem;">+250 SCIENCE POINTS AWARDED ⭐</strong>
              <div style="font-size: 0.78rem; color: #cfd8dc; margin-top: 2px;">
                Objective "Debris Cleanup & Crash Analysis" Certified • Base Operations Nominal
              </div>
            </div>

            <!-- Direct Mission Sequence: Mission 3 Attached After Debris Cleanup -->
            <div style="background: rgba(46, 204, 113, 0.14); border: 2px solid #2ecc71; border-radius: 8px; padding: 14px; margin-bottom: 12px; text-align: center; box-shadow: 0 0 20px rgba(46, 204, 113, 0.25);">
              <div style="font-size: 0.72rem; color: #a9dfbf; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Next Mission Attached & Ready</div>
              <h4 style="margin: 4px 0 6px 0; color: #2ecc71; font-size: 1.25rem; font-weight: 800;">
                🌱 Mission 3: Combined Greenhouse Survival
              </h4>
              <p style="font-size: 0.8rem; color: #cfd8dc; margin: 0 0 12px 0; line-height: 1.45;">
                Houston Mission Control has cleared the crash site. Your next directive is long-duration life support: manage hydroponics and survive 120 days until the resupply ship docks.
              </p>
              <button class="btn-primary" id="btn-proceed-greenhouse-mission" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #27ae60, #1b5e20); border: 2px solid #2ecc71; box-shadow: 0 0 20px rgba(46,204,113,0.5); font-weight: 800; cursor: pointer;">
                <span>🚀 Launch Mission 3: Combined Greenhouse Survival ➔</span>
              </button>
            </div>

            <button class="btn-secondary" id="btn-done-debris-mission" style="width: 100%; justify-content: center; font-size: 0.92rem; padding: 10px; color: #b0bec5;">
              <span>Return to Base Camp Alpha 🌕</span>
            </button>
          </div>
        `;

        const btnGreenhouse = overlay.querySelector("#btn-proceed-greenhouse-mission");
        if (btnGreenhouse) {
          btnGreenhouse.addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (window.greenhouseModal) {
              window.greenhouseModal.open(onComplete);
            } else if (onComplete) {
              onComplete();
            }
          });
        }

        overlay.querySelector("#btn-done-debris-mission").addEventListener("click", () => {
          sound.playClick();
          overlay.remove();
          if (onComplete) onComplete();
        });
      }
    };

    document.getElementById("modal-container").appendChild(overlay);
    render();
  }

  // Mission 3: Combined Greenhouse Survival launcher
  startGreenhouseMission(onComplete = null) {
    if (window.greenhouseModal) {
      window.greenhouseModal.open(onComplete);
    } else if (onComplete) {
      onComplete();
    }
  }
}
