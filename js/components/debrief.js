// ============================================================================
// MISSION DEBRIEF & MISSION FAILED SCREENS
// Comprehensive ECLSS Consumables Burn, Difficulty Survival Report & Permadeath Reset
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class DebriefComponent {
  constructor(debriefContainer, failedContainer) {
    this.debriefContainer = debriefContainer;
    this.failedContainer = failedContainer;
    this.failData = null;
    this.init();
  }

  init() {
    this.renderDebrief();
    this.renderFailed();

    gameState.subscribe((state, event, payload) => {
      if (event === "mission_failed") {
        this.failData = payload;
        this.renderFailed();
      } else if (state.screen === "debrief") {
        this.renderDebrief();
      }
    });
  }

  // --- Success Debrief Screen ---
  renderDebrief() {
    if (!this.debriefContainer) return;
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;
    const diff = GAME_CONFIG.DIFFICULTY[s.difficulty] || GAME_CONFIG.DIFFICULTY.cadet;
    const t = s.telemetry;
    const loaded = s.loadedSupplies || { oxygen: 95, water: 88, food: 90, power: 92, fuel: 85 };

    // Calculate score breakdown
    const objectivesBonus = s.levelObjectives.filter(o => o.completed).length * 150;
    const resourcesSavedBonus = Math.round((t.oxygen + t.water + t.food + t.power) * 0.8);
    const speedBonus = Math.max(0, s.missionTimeLeftSec * 2);
    const difficultyMultiplier = diff.scoreMultiplier;

    const totalCalculated = Math.round((objectivesBonus + resourcesSavedBonus + speedBonus) * difficultyMultiplier);

    // Consumables Burn Calculations
    const o2Burn = Math.max(4, Math.round(loaded.oxygen - t.oxygen));
    const h2oBurn = Math.max(6, Math.round(loaded.water - t.water));
    const foodBurn = Math.max(5, Math.round(loaded.food - t.food));
    const powerBurn = Math.max(8, Math.round(loaded.power - t.power));
    const fuelBurn = Math.max(15, Math.round(loaded.fuel - t.fuel));

    const minMargin = Math.min(t.oxygen, t.water, t.food, t.power);
    const survivalStatus = minMargin < 20
      ? { text: "CRITICAL MARGIN SURVIVAL", color: "#ff3366", badge: "⚠️" }
      : minMargin < 45
      ? { text: "CHALLENGING LOGISTICS MARGIN", color: "#ffd54f", badge: "⚡" }
      : { text: "OPTIMAL ECLSS EFFICIENCY", color: "#00e676", badge: "🌿" };

    this.debriefContainer.innerHTML = `
      <div style="max-width: 860px; margin: 0 auto; background: var(--bg-panel); border: 2px solid var(--border-cyan); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-panel), var(--shadow-glow);">
        <!-- Mission Header -->
        <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px;">
          <div style="font-size: 3.5rem; margin-bottom: 4px;">🏆</div>
          <span style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold);">
            NASA EXPEDITION DEBRIEF • MISSION FLIGHT REPORT
          </span>
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 4px;">
            ${dest.name} Mission Accomplished!
          </h2>
          <div style="font-size: 0.85rem; color: var(--text-highlight); margin-top: 4px;">
            Difficulty: ${diff.name} (${difficultyMultiplier}x Score Multiplier • ${diff.drainMultiplier}x Metabolic Drain)
          </div>
        </div>

        <!-- Score Breakdown Cards -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Objectives Done</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-highlight); margin-top: 4px;">+${objectivesBonus} Pts</div>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Resources Saved</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--border-cyan); margin-top: 4px;">+${resourcesSavedBonus} Pts</div>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Speed & Time Bonus</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-gold); margin-top: 4px;">+${speedBonus} Pts</div>
          </div>

          <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--text-highlight); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-highlight); text-transform: uppercase;">Total Run Score</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-top: 4px;">+${totalCalculated} Pts</div>
          </div>
        </div>

        <!-- Comprehensive ECLSS Life Support & Consumables Burn Report -->
        <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid var(--border-cyan); border-radius: var(--radius-md); padding: 18px; margin-bottom: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(0,229,255,0.2); padding-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">📊</span>
              <strong style="color: #fff; font-size: 0.95rem;">ECLSS Life Support & Consumables Burn Report</strong>
            </div>
            <span style="font-size: 0.75rem; color: ${survivalStatus.color}; background: rgba(0,0,0,0.5); padding: 4px 10px; border-radius: 4px; font-weight: 800; border: 1px solid ${survivalStatus.color};">
              ${survivalStatus.badge} ${survivalStatus.text}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 12px;">
            <!-- Oxygen -->
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">🫁 Oxygen (O2)</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #00e5ff; margin: 4px 0;">${Math.round(t.oxygen)}%</div>
              <div style="font-size: 0.68rem; color: #ff8a80;">Burn: -${o2Burn}%</div>
            </div>

            <!-- Water -->
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">💧 Water (H2O)</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #00b0ff; margin: 4px 0;">${Math.round(t.water)}%</div>
              <div style="font-size: 0.68rem; color: #ff8a80;">Burn: -${h2oBurn}%</div>
            </div>

            <!-- Food -->
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">🍱 Food Rations</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #ff9100; margin: 4px 0;">${Math.round(t.food)}%</div>
              <div style="font-size: 0.68rem; color: #ff8a80;">Burn: -${foodBurn}%</div>
            </div>

            <!-- Power -->
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">⚡ Electrical</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #ffd600; margin: 4px 0;">${Math.round(t.power)}%</div>
              <div style="font-size: 0.68rem; color: #ff8a80;">Burn: -${powerBurn}%</div>
            </div>

            <!-- Fuel -->
            <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; text-align: center; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-muted);">⛽ Propellant</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #ff5252; margin: 4px 0;">${Math.round(t.fuel)}%</div>
              <div style="font-size: 0.68rem; color: #ff8a80;">Burn: -${fuelBurn}%</div>
            </div>
          </div>

          <div style="font-size: 0.76rem; color: #b0bec5; line-height: 1.45; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 4px;">
            💡 <strong>Resource Survival Physics:</strong> Under <strong>${diff.name}</strong>, metabolic demand scaled by <strong>${diff.drainMultiplier}x</strong>. You maintained closed-loop life support without total depletion, ensuring the crew's safe return to Earth.
          </div>
        </div>

        <!-- Objectives Checklist Review -->
        <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px;">
          <strong style="color: #fff; font-size: 0.88rem;">Mission Objectives Review:</strong>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${s.levelObjectives.map((obj) => `
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: #cfd8dc;">
                <span>${obj.icon} ${obj.title}</span>
                <span style="color: ${obj.completed ? 'var(--text-highlight)' : 'var(--accent-red)'}; font-weight: 700;">
                  ${obj.completed ? '✓ Completed' : '✗ Missed'}
                </span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Flight Director Stella Feedback & NASA Trivia -->
        <div style="background: rgba(0, 229, 255, 0.08); border-left: 4px solid var(--border-cyan); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 24px;">
          <strong style="color: var(--border-cyan); font-size: 0.95rem;">Flight Director Stella's Debrief:</strong>
          <p style="font-size: 0.88rem; color: #cfd8dc; line-height: 1.5; margin-top: 4px;">
            "Outstanding planetary operations, Astronaut Alex! You successfully balanced the life support electrical bus and shielded the crew through solar hazards. The scientific samples you gathered will unlock the next era of human spaceflight!"
          </p>
          <div style="margin-top: 8px; font-size: 0.82rem; color: var(--accent-gold);">
            <strong>NASA Science Fact:</strong> ${dest.nasaFact}
          </div>
        </div>

        <!-- Return / Continue Actions -->
        <div style="display: flex; justify-content: space-between; gap: 16px;">
          <button class="btn-secondary" id="btn-return-home" style="flex: 1; justify-content: center; padding: 14px;">
            <span>🚀 Return to Earth (Mission Control)</span>
          </button>
          <button class="btn-primary" id="btn-next-planet" style="flex: 1; justify-content: center; padding: 14px;">
            <span>Plan Next Destination →</span>
          </button>
        </div>
      </div>
    `;

    this.attachDebriefEvents();
  }

  attachDebriefEvents() {
    const returnBtn = this.debriefContainer.querySelector("#btn-return-home");
    const nextBtn = this.debriefContainer.querySelector("#btn-next-planet");

    if (returnBtn) {
      returnBtn.addEventListener("click", () => {
        sound.playClick();
        gameState.setScreen("dashboard");
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        gameState.setScreen("dashboard");
      });
    }
  }

  // --- Strict Permadeath Failure Screen with Zero Reset ---
  renderFailed() {
    if (!this.failedContainer) return;
    const fail = this.failData || gameState.state.lastCasualtyReport || {
      cause: "Critical Life Support Depletion",
      tip: "Power loss stopped base heaters and oxygen scrubbers.",
      causalityList: ["Life support resource reserves exhausted during surface operations"],
      daysSurvived: 1,
      metFormatted: "00:01:30",
      scoreAtCasualty: 0
    };

    const s = gameState.state;
    const diff = fail.difficulty || GAME_CONFIG.DIFFICULTY[s.difficulty] || GAME_CONFIG.DIFFICULTY.cadet;
    const daysSurvived = fail.daysSurvived || Math.max(1, Math.round((s.metSeconds || 30) / 30));
    const metFormatted = fail.metFormatted || "00:02:15";
    const scoreLost = fail.scoreAtCasualty !== undefined ? fail.scoreAtCasualty : s.score;

    const causalityList = fail.causalityList && fail.causalityList.length > 0
      ? fail.causalityList
      : ["Critical resource exhaustion during mission operations"];

    this.failedContainer.innerHTML = `
      <div style="max-width: 780px; margin: 0 auto; background: #140508; border: 2px solid var(--accent-red); border-radius: var(--radius-lg); padding: 32px; box-shadow: 0 15px 50px rgba(255, 51, 102, 0.45); text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 6px;">💀⚠️</div>
        <span style="font-size: 0.8rem; letter-spacing: 2.5px; text-transform: uppercase; color: #ff80ab; font-weight: 800;">
          MISSION CASUALTY • PERMADEATH PROTOCOL ENGAGED
        </span>
        <h2 style="font-size: 1.85rem; font-weight: 800; color: #ff3366; margin: 6px 0 16px 0;">
          MISSION FAILED: ${fail.cause.toUpperCase()}
        </h2>

        <!-- Survival Performance & Casualty Record -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
          <div style="background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.3); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: #ffcdd2; text-transform: uppercase;">Survival Record</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #fff; margin-top: 4px;">${daysSurvived} Sol Days</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">MET: ${metFormatted}</div>
          </div>

          <div style="background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.3); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: #ffcdd2; text-transform: uppercase;">Difficulty Strain</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #ffd54f; margin-top: 4px;">${diff.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">${diff.drainMultiplier}x Metabolic Drain</div>
          </div>

          <div style="background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.3); border-radius: var(--radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 0.72rem; color: #ffcdd2; text-transform: uppercase;">Science Career Lost</div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #ff3366; margin-top: 4px;">${scoreLost} Pts ➔ 0</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">Rank Reset to Cadet</div>
          </div>
        </div>

        <!-- Step-by-Step Chain of Causality Breakdown -->
        <div style="background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.25); border-radius: var(--radius-md); padding: 16px; text-align: left; margin-bottom: 20px;">
          <strong style="color: #fff; font-size: 0.95rem;">Chain of Causality Breakdown:</strong>
          <div style="margin: 10px 0; display: flex; flex-direction: column; gap: 8px;">
            ${causalityList.map((entry, idx) => `
              <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: #ffcdd2;">
                <span style="background: #ff3366; color: #000; font-weight: 800; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0;">
                  ${idx + 1}
                </span>
                <span>${entry}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Permadeath Directive Notice -->
        <div style="background: rgba(255, 51, 102, 0.18); border-left: 4px solid #ff3366; border-radius: var(--radius-sm); padding: 12px 16px; text-align: left; margin-bottom: 20px; font-size: 0.82rem; color: #ffebee; line-height: 1.5;">
          <strong>NASA Permadeath Directive:</strong> In human spaceflight, fatal emergencies offer no second chances or level checkpoints. Under strict mission protocol, this casualty wipes all mission data, score points, and planetary unlocks. You must restart astronaut training from zero.
        </div>

        <!-- NASA Flight Director Tip -->
        <div style="background: rgba(255, 214, 0, 0.08); border-left: 3px solid var(--accent-gold); border-radius: var(--radius-sm); padding: 12px 16px; text-align: left; margin-bottom: 24px; font-size: 0.82rem; color: #ffe082;">
          <strong>Flight Safety Debrief:</strong> ${fail.tip || "Maintain power to keep heaters and oxygen scrubbers active."}
        </div>

        <!-- Permadeath Zero-Reset Action Button -->
        <button class="btn-primary" id="btn-permadeath-reset" style="background: linear-gradient(135deg, #ff3366, #b71c1c); width: 100%; justify-content: center; font-size: 1.15rem; padding: 16px; font-weight: 800; box-shadow: 0 0 25px rgba(255,51,102,0.6); border: 2px solid #ff80ab; cursor: pointer;">
          <span>💀 Permadeath: Reset Career From Zero ➔</span>
        </button>
      </div>
    `;

    const resetBtn = this.failedContainer.querySelector("#btn-permadeath-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sound.playFail();
        gameState.resetGameToZero();
      });
    }
  }
}
