// ============================================================================
// RANDOM HAZARD & EMERGENCY EVENTS SYSTEM
// Solar Storms, Dust Storms, Oxygen Leaks, Suit Punctures, Circuit Rewiring
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";
import { SurfaceMissionsManager } from "./surfaceMissions.js";

export class HazardEventManager {
  constructor(overlayContainer) {
    this.container = overlayContainer;
    this.timer = null;
    this.activeHazard = null;
    this.hazardInterval = null;
    this.missionsManager = new SurfaceMissionsManager(overlayContainer);
  }

  startMonitoring() {
    this.stopMonitoring();
    const diff = GAME_CONFIG.DIFFICULTY[gameState.state.difficulty] || GAME_CONFIG.DIFFICULTY.cadet;
    const intervalMs = (diff.hazardFrequencySec || 28) * 1000;

    this.hazardInterval = setInterval(() => {
      if (gameState.state.screen === "surface" && !this.activeHazard) {
        if (Math.random() < 0.6) {
          this.triggerRandomHazard();
        }
      }
    }, intervalMs);
  }

  stopMonitoring() {
    if (this.hazardInterval) {
      clearInterval(this.hazardInterval);
      this.hazardInterval = null;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  triggerRandomHazard() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const hazardKeys = dest.surfaceHazards || ["equipment_fault"];
    const chosenKey = hazardKeys[Math.floor(Math.random() * hazardKeys.length)];
    const hazard = GAME_CONFIG.HAZARDS[chosenKey];
    if (!hazard) return;

    this.activeHazard = hazard;
    gameState.activeHazard = hazard;
    sound.playAlarm();

    this.renderHazardBanner(hazard);
  }

  renderHazardBanner(hazard) {
    let timeLeft = hazard.durationSec;
    const banner = document.createElement("div");
    banner.className = "hazard-banner";
    banner.id = "active-hazard-banner";
    banner.innerHTML = `
      <div style="font-size: 2.4rem;">${hazard.icon}</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="text-transform: uppercase; font-size: 0.95rem; letter-spacing: 0.5px;">${hazard.name}</strong>
          <span id="hazard-time-countdown" style="font-family: 'Courier New', monospace; font-weight: 800; background: #000; padding: 2px 8px; border-radius: 4px;">
            ${timeLeft}s
          </span>
        </div>
        <div style="font-size: 0.8rem; margin: 3px 0; color: #ffebee;">${hazard.alertMessage}</div>
        <div style="font-size: 0.74rem; color: #ffeb3b;">
          <strong>CAUSE CHAIN THREAT:</strong> ${hazard.chainEffect}
        </div>
      </div>
      <button class="btn-primary" id="btn-resolve-hazard" style="background: #fff; color: #d50000; font-weight: 800; padding: 10px 18px; border-radius: 8px;">
        Engage Repair! 🛠️
      </button>
    `;

    document.getElementById("modal-container").appendChild(banner);

    // Hazard resolution button launches corresponding repair mini-game
    banner.querySelector("#btn-resolve-hazard").addEventListener("click", () => {
      this.launchHazardMiniGame(hazard);
    });

    this.timer = setInterval(() => {
      timeLeft--;
      const timeEl = banner.querySelector("#hazard-time-countdown");
      if (timeEl) timeEl.textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        this.resolveHazard(false); // Time expired, penalty applied
      }
    }, 1000);
  }

  launchHazardMiniGame(hazard) {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const banner = document.getElementById("active-hazard-banner");
    if (banner) banner.remove();

    if (hazard.miniGame === "circuit_rewire") {
      this.missionsManager.startCircuitRewireGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "leak_patch") {
      this.missionsManager.startLeakPatchGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "clear_panels") {
      this.missionsManager.startClearPanelsGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "thaw_pipes") {
      this.missionsManager.startThawPipesGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else {
      // Solar storm shelter prompt
      this.showSolarStormPrompt();
    }
  }

  showSolarStormPrompt() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">⚡</div>
        <h3 style="color: #ffd600; font-size: 1.3rem;">SOLAR PARTICLE STORM ACTIVE!</h3>
        <p style="font-size: 0.85rem; color: #cfd8dc; margin: 8px 0 16px 0; line-height: 1.45;">
          Intense radiation is scouring the surface! Astronaut Alex must enter the <strong>Pressurized Habitat</strong> or use Lead Rad-Shielding to block lethal radiation dose!
        </p>

        <div style="display: flex; gap: 12px;">
          <button class="btn-primary" id="btn-storm-shelter" style="flex: 1; justify-content: center; background: #00e676; color: #000;">
            🏠 Retreat to Habitat Shelter
          </button>
          <button class="btn-secondary" id="btn-storm-brave" style="flex: 1; justify-content: center;">
            ⚠️ Stay Outside (Risk Damage)
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-storm-shelter").addEventListener("click", () => {
      sound.playSuccessChime();
      gameState.isAstronautInsideHabitat = true;
      overlay.remove();
      this.resolveHazard(true);
    });

    overlay.querySelector("#btn-storm-brave").addEventListener("click", () => {
      sound.playFail();
      gameState.isAstronautInsideHabitat = false;
      overlay.remove();
      this.resolveHazard(false);
    });
  }

  resolveHazard(success) {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const banner = document.getElementById("active-hazard-banner");
    if (banner) banner.remove();

    if (success) {
      sound.playSuccessChime();
      gameState.addScore(50);
      this.showNotification("HAZARD MITIGATED!", "Systems stabilized! Prevented cascading equipment failure (+50 pts).", "success");
    } else {
      sound.playFail();
      const hazard = this.activeHazard;
      if (hazard) {
        gameState.addCausality(hazard.chainEffect);
        const pen = hazard.penalty;
        if (pen.power) gameState.state.telemetry.power = Math.max(0, gameState.state.telemetry.power - pen.power);
        if (pen.oxygen) gameState.state.telemetry.oxygen = Math.max(0, gameState.state.telemetry.oxygen - pen.oxygen);
        if (pen.water) gameState.state.telemetry.water = Math.max(0, gameState.state.telemetry.water - pen.water);
        if (pen.suitIntegrity) gameState.state.telemetry.suitIntegrity = Math.max(0, gameState.state.telemetry.suitIntegrity + pen.suitIntegrity);
        if (pen.crewHealth) gameState.state.telemetry.crewHealth = Math.max(0, gameState.state.telemetry.crewHealth - pen.crewHealth);
        if (pen.crewStress) gameState.state.telemetry.crewStress = Math.min(100, gameState.state.telemetry.crewStress + pen.crewStress);
        if (pen.temperatureDrop) gameState.state.telemetry.temperature -= pen.temperatureDrop;
      }
      this.showNotification("HAZARD DAMAGE SUSTAINED", "Equipment failure unresolved! Resource reserves damaged.", "error");
    }

    this.activeHazard = null;
    gameState.activeHazard = null;
  }

  showNotification(title, message, type) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      bottom: 60px;
      right: 24px;
      background: ${type === 'success' ? 'rgba(0, 230, 118, 0.95)' : 'rgba(255, 51, 102, 0.95)'};
      color: #000;
      font-weight: 700;
      padding: 14px 20px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
      max-width: 380px;
    `;
    toast.innerHTML = `<div style="font-size: 0.9rem; font-weight: 800;">${title}</div><div style="font-size: 0.78rem; margin-top: 3px;">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
  }
}
