// ============================================================================
// NASA FLIGHT MANUAL & STEP-BY-STEP MISSION GUIDELINES COMPONENT
// Comprehensive educational walkthrough for all 9 stages & Debris Cleanup
// ============================================================================

import { sound } from "../audio.js";
import { gameState } from "../state.js";

export class GuideModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.activeTab = "first_mission"; // 'first_mission', 'debris_mission', 'controls'
  }

  open(tab = "first_mission") {
    this.isOpen = true;
    this.activeTab = tab;
    sound.playQuindar();
    this.render();
  }

  close() {
    this.isOpen = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large guide-modal-dialog" style="max-width: 820px; max-height: 88vh; display: flex; flex-direction: column;">
          <!-- Header -->
          <div class="modal-header" style="border-bottom: 1px solid rgba(255, 214, 0, 0.3); padding-bottom: 14px;">
            <div class="modal-title-group" style="display: flex; align-items: center; gap: 12px;">
              <span class="modal-badge-icon" style="font-size: 2.2rem; background: rgba(255,214,0,0.12); padding: 8px 12px; border-radius: 12px; border: 1px solid var(--accent-gold);">📖</span>
              <div>
                <h2 style="font-size: 1.4rem; color: #fff; margin: 0;">NASA Astronaut Flight Manual</h2>
                <div class="modal-subtitle" style="font-size: 0.78rem; color: var(--accent-gold); letter-spacing: 1px;">
                  Official Step-by-Step Training Guidelines • Cadet to Commander
                </div>
              </div>
            </div>
            <button class="btn-icon btn-modal-close" id="btn-close-guide" title="Close Flight Manual">✕</button>
          </div>

          <!-- Navigation Tabs -->
          <div style="display: flex; gap: 8px; margin: 14px 0 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; flex-wrap: wrap;">
            <button class="btn-secondary guide-tab-btn ${this.activeTab === 'first_mission' ? 'active' : ''}" data-tab="first_mission" style="font-size: 0.82rem; padding: 8px 14px;">
              🌕 Mission 1: Artemis Walkthrough
            </button>
            <button class="btn-secondary guide-tab-btn ${this.activeTab === 'debris_mission' ? 'active' : ''}" data-tab="debris_mission" style="font-size: 0.82rem; padding: 8px 14px;">
              🧹 Mission 2: Debris Cleanup
            </button>
            <button class="btn-secondary guide-tab-btn ${this.activeTab === 'greenhouse_mission' ? 'active' : ''}" data-tab="greenhouse_mission" style="font-size: 0.82rem; padding: 8px 14px; border-color: #2ecc71; color: #a9dfbf;">
              🌱 Mission 3: Greenhouse Survival (60 Days)
            </button>
            <button class="btn-secondary guide-tab-btn ${this.activeTab === 'extraction_mission' ? 'active' : ''}" data-tab="extraction_mission" style="font-size: 0.82rem; padding: 8px 14px; border-color: #00e5ff; color: #80d8ff;">
              🚀 Mission 4: Resupply & Extraction
            </button>
            <button class="btn-secondary guide-tab-btn ${this.activeTab === 'controls' ? 'active' : ''}" data-tab="controls" style="font-size: 0.82rem; padding: 8px 14px;">
              🎮 Controls & Survival Rules
            </button>
          </div>

          <!-- Tab Content (Scrollable) -->
          <div style="flex: 1; overflow-y: auto; padding-right: 10px;" id="guide-tab-body">
            ${this.renderActiveTabContent()}
          </div>

          <!-- Footer -->
          <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 0.76rem; color: var(--text-muted);">
              NASA Space Apps Challenge • Interactive Educational Simulation
            </div>
            <button class="btn-primary" id="btn-dismiss-guide" style="padding: 10px 22px; font-size: 0.95rem;">
              <span>Understood, Return to Flight Deck ✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderActiveTabContent() {
    if (this.activeTab === "first_mission") {
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.86rem; color: #cfd8dc; line-height: 1.55;">
          
          <!-- Introduction Callout -->
          <div style="background: rgba(0, 229, 255, 0.08); border-left: 4px solid var(--border-cyan); padding: 12px 16px; border-radius: 6px;">
            <strong style="color: #fff; font-size: 0.95rem;">👨‍🚀 Welcome to Your First Mission: The Artemis Lunar Expedition!</strong>
            <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #b0bec5;">
              Follow these exact 9 steps from Earth to the Moon. Every button and control is real, interactive, and functional.
            </p>
          </div>

          <!-- Step 1 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">1</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 1: Main Menu & Mission Authorization</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              From the title screen, click <strong style="color: var(--border-cyan);">[START MISSION 🚀]</strong> or <strong style="color: var(--border-cyan);">[OPEN DASHBOARD 📊]</strong>. You can also preview destination levels using the <strong>Moon, Mars, and Europa</strong> pills at the bottom.
            </p>
            <div style="font-size: 0.78rem; color: var(--accent-gold);">💡 Tip: You can test the authentic Apollo/Artemis Quindar communication beep anytime via the 📡 icon in the top header.</div>
          </div>

          <!-- Step 2 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">2</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 2: Mission Preparation Dashboard & Supplies</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Review the <strong>8 Primary Life Support Systems</strong> (Oxygen, Food, Water, Power, Fuel, Cargo, Health, Duration). Use the <strong>[ + / - ]</strong> buttons to test warning states and balance reserves.
            </p>
            <p style="margin: 0 0 6px 0;">
              Keep reserves balanced to achieve <strong style="color: var(--text-highlight);">90%+ Mission Readiness</strong>. Once verified, click <strong style="color: var(--text-highlight);">[Select Rocket 🛸]</strong> at the top right of the dashboard.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">3</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 3: Rocket Selection & Cargo Equipment Bay</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Choose between the 3 distinct rocket classes:
              <br>• <strong>Scout-1 Light Explorer:</strong> Fast & responsive (2 cargo slots)
              <br>• <strong>Pioneer-X Heavy Lifter:</strong> High payload & balanced fuel (3 cargo slots)
              <br>• <strong>Titan-V Super Heavy:</strong> Maximum deep-space capacity (4 cargo slots)
            </p>
            <p style="margin: 0 0 6px 0;">
              In the Cargo Bay, equip equipment tools like the <strong style="color: #00e5ff;">Cryogenic O2 Tank</strong> and <strong style="color: #ff9100;">EVA Repair Multi-Tool</strong>. Then click <strong style="color: var(--border-cyan);">[Crew Boarding →]</strong>.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">4</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 4: Launchpad 39B & Crew Boarding Checklist</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              1. Click <strong style="color: var(--text-highlight);">[Board Astronaut Alex 👨‍🚀]</strong> (or drag the astronaut icon directly into the command hatch).
              <br>2. Complete all 4 pre-flight checks: <strong>Gyroscopes, Comms, Life Support, and Engine Valves</strong>.
              <br>3. When Houston confirms <em>STATUS: GO FOR LAUNCH!</em>, click <strong style="color: #ff9100;">[Initiate Countdown →]</strong>.
            </p>
          </div>

          <!-- Step 5 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">5</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 5: Atmospheric Launch Flight Simulator</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Watch the T-10 second terminal countdown with rocket sound effects. At T-0, the main engines ignite! Observe the rocket climbing through the troposphere, staging at <strong>45 km</strong>, and achieving transfer orbit at <strong>180 km</strong>.
            </p>
            <p style="margin: 0 0 6px 0;">
              Upon orbit confirmation, click <strong style="color: var(--border-cyan);">[Engage Deep Space Comm & Transit Mission (+5 Pts) 📡]</strong>.
            </p>
          </div>

          <!-- Step 6 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">6</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 6: Deep Space Transit & Speed-of-Light Link (+5 Pts)</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Radio signals travel at <strong>299,792 km/s</strong>, resulting in a real-time comm delay (1.3 seconds to the Moon). Execute the 3 Flight Director Directives:
              <br>• 1. Click <strong style="color: #ffd600;">[Deploy Panels ☀️]</strong> to align solar arrays to 100%.
              <br>• 2. Click <strong style="color: #b388ff;">[Raise Shield 🛡️]</strong> to engage magnetic radiation deflection.
              <br>• 3. Click <strong style="color: #00e5ff;">[Optimize ECLSS 🫁]</strong> to calibrate life support loop rationing.
            </p>
            <p style="margin: 0 0 6px 0;">
              Houston will award you <strong style="color: var(--text-highlight);">+5 Science Points</strong> and unlock the primary green button: <strong style="color: #00e676;">[Proceed to Planetary Landing Descent 🛬]</strong>!
            </p>
          </div>

          <!-- Step 7 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">7</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 7: Retro-Lander Descent Simulator</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Steer the lander toward the designated flat landing pad using <strong>[A / D]</strong> or the on-screen <strong>[◀ / ▶]</strong> buttons. Tap or hold <strong>[🔥 RETRO-THRUST]</strong> (or Spacebar) to slow down your descent against lunar gravity ($1.62\text{ m/s}^2$).
            </p>
            <div style="background: rgba(255, 51, 102, 0.1); border-left: 3px solid #ff3366; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem; color: #ff80ab;">
              ⚠️ Critical Rule: Touchdown vertical descent speed MUST be below <strong>3.0 m/s</strong> or the landing gear will collapse!
            </div>
          </div>

          <!-- Step 8 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">8</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 8: Surface Base Camp & Exploration Missions</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              • Walk across the lunar surface using <strong>[A / D]</strong>, Arrow Keys, or the on-screen directional buttons.
              <br>• Click a module in the <strong>Base Camp Toolbox</strong> (e.g. Solar Array or Habitat Dome) and click a build site to construct it.
              <br>• Walk up to mineral deposits on the surface to engage the <strong>Core Sample Drill</strong> mini-game.
              <br>• Click <strong style="color: #b08968;">[🧹 Mission: Debris Cleanup (+100 Pts)]</strong> to execute the crashed probe recovery operation!
            </p>
          </div>

          <!-- Step 9 -->
          <div class="guide-step-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span style="background: var(--border-cyan); color: #000; font-weight: 800; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem;">9</span>
              <strong style="color: #fff; font-size: 0.98rem;">Stage 9: Mission Debrief & Certification</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              Once objectives are fulfilled, click <strong style="color: var(--text-highlight);">[Depart & Debrief 📋]</strong> at the top right. Receive your NASA flight evaluation grade, unlock achievements, and gain promotion to <strong>Junior Astronaut / Mission Specialist</strong>!
            </p>
          </div>

        </div>
      `;
    } else if (this.activeTab === "debris_mission") {
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.86rem; color: #cfd8dc; line-height: 1.55;">
          
          <div style="background: rgba(176, 137, 104, 0.15); border-left: 4px solid #b08968; padding: 14px 16px; border-radius: 6px;">
            <div style="font-size: 0.72rem; color: #b08968; font-weight: 800; letter-spacing: 1px;">SURFACE FORENSIC OPERATION</div>
            <h3 style="color: #fff; font-size: 1.25rem; margin: 4px 0;">🧹 Mission Brief: Debris Cleanup</h3>
            <p style="margin: 4px 0 0 0; font-size: 0.84rem; color: #cfd8dc;">
              "A previous mission crashed on the surface. Collect the wreckage and find out what went wrong."
            </p>
          </div>

          <!-- Specifications -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">CREW</div>
              <strong style="color: #fff;">2 Astronauts</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">DURATION</div>
              <strong style="color: #fff;">4 Days</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">BUDGET</div>
              <strong style="color: var(--accent-gold);">$90 Million</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">FIELD SIZE</div>
              <strong style="color: var(--border-cyan);">16 km²</strong>
            </div>
          </div>

          <!-- How to Launch -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">How to Trigger the Debris Mission:</strong>
            <p style="margin: 6px 0 0 0;">
              During <strong>Stage 8 (Surface Base Camp)</strong>, click the brown button in the left toolbox: <strong style="color: #b08968;">[🧹 Mission: Debris Cleanup (+100 Pts)]</strong>, or walk your astronaut to the <strong>Crash Site Alpha</strong> icon on the surface canvas.
            </p>
          </div>

          <!-- 4 Hazardous Events -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">The 4 Dynamic Hazard Events & Countermeasures:</strong>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
                <span style="font-size: 1.4rem;">🔪</span>
                <div>
                  <strong style="color: #ff80ab;">Sharp metal fragments:</strong> Jagged debris threatens to tear your suit and damage the rover.
                  <div style="font-size: 0.74rem; color: var(--text-muted);">Countermeasure: Deploy reinforced Kevlar deflection shields.</div>
                </div>
              </div>
              <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
                <span style="font-size: 1.4rem;">☣️</span>
                <div>
                  <strong style="color: #ff80ab;">Leaked fuel residue:</strong> Toxic leftover fuel contaminates the area and air filters.
                  <div style="font-size: 0.74rem; color: var(--text-muted);">Countermeasure: Purge ECLSS air filters & engage catalytic scrubbers.</div>
                </div>
              </div>
              <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
                <span style="font-size: 1.4rem;">🔥</span>
                <div>
                  <strong style="color: #ff80ab;">Hot wreckage in sunlight:</strong> Metal pieces heat up under the Sun and strain cooling.
                  <div style="font-size: 0.74rem; color: var(--text-muted);">Countermeasure: Boost cooling loop circulation & deploy shade.</div>
                </div>
              </div>
              <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px;">
                <span style="font-size: 1.4rem;">🚜</span>
                <div>
                  <strong style="color: #ff80ab;">Rover stuck in debris:</strong> Rover gets stuck between wreckage pieces and needs extra power.
                  <div style="font-size: 0.74rem; color: var(--text-muted);">Countermeasure: Reroute auxiliary fuel to planetary drive thruster.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- NASA Forensic Quiz Answers -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">NASA Engineering Quiz Guide:</strong>
            <p style="margin: 6px 0 0 0;">
              • <strong>Q1: Why do engineers collect wreckage from a failed mission?</strong>
              <br>👉 <em style="color: var(--text-highlight);">"To learn what went wrong and prevent it next time."</em> Studying failures is one of the best ways aerospace engineers improve future missions.
              <br><br>• <strong>Q2: Why is sharp debris dangerous on the Moon?</strong>
              <br>👉 <em style="color: var(--text-highlight);">"It can puncture suits and damage rovers."</em> With no air and no immediate rescue, even a small micro-puncture can cause rapid depressurization.
            </p>
          </div>

        </div>
      `;
    } else if (this.activeTab === "greenhouse_mission") {
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.86rem; color: #cfd8dc; line-height: 1.55;">
          
          <!-- Introduction Callout -->
          <div style="background: rgba(46, 204, 113, 0.12); border-left: 4px solid #2ecc71; padding: 14px 18px; border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.8rem;">🌱</span>
              <div>
                <strong style="color: #2ecc71; font-size: 1.05rem;">Mission 3: Combined Greenhouse Survival • 60-Day Protocol</strong>
                <div style="font-size: 0.78rem; color: #cfd8dc; margin-top: 2px;">
                  Attached after Debris Cleanup. Supply ship arrives in 60 days. Keep food rations above zero to survive.
                </div>
              </div>
            </div>
          </div>

          <!-- Mission Setup & Initial Resources -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">Starting Flight Conditions (Day 1):</strong>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px; text-align: center;">
              <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">🍱 FOOD</div>
                <strong style="color: #ff9100; font-size: 1.1rem;">21 Days</strong>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">💧 WATER</div>
                <strong style="color: #00b0ff; font-size: 1.1rem;">100%</strong>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">⚡ POWER</div>
                <strong style="color: #ffd600; font-size: 1.1rem;">100%</strong>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">🎯 TARGET</div>
                <strong style="color: #2ecc71; font-size: 1.1rem;">60 Days</strong>
              </div>
            </div>
          </div>

          <!-- Step-by-Step Tactical Controls & Playable Process -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">Interactive Astronaut Gameplay & 4-Station Operations:</strong>
            <p style="margin: 4px 0 10px 0; font-size: 0.8rem; color: #b0bec5;">
              You directly control Astronaut Alex inside the 2D Greenhouse Dome! Click any station or control button to send Alex to perform physical life-support maintenance:
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
              <div style="background: rgba(52, 152, 219, 0.1); border: 1px solid #3498db; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #3498db;">Station 1: 💧 Condensation Pump & Irrigation</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Alex walks to the water desalinator, primes the pressure valve, and sprays nutrient mist across aeroponic root chambers (<strong>+25% Crop Growth</strong>, <strong>-15% Water Reserves</strong>).
                </p>
              </div>

              <div style="background: rgba(243, 156, 18, 0.1); border: 1px solid #f39c12; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #f39c12;">Station 2: ☀️ Solar UV Grow Lamps & Thermal Coils</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Alex climbs to the ceiling array, calibrating high-intensity full-spectrum LED grow lamps to accelerate photosynthesis and warm the bay (<strong>+25% Crop Growth</strong>, <strong>-15% Power Grid</strong>).
                </p>
              </div>

              <div style="background: rgba(46, 204, 113, 0.1); border: 1px solid #2ecc71; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #2ecc71;">Station 3: 🌱 Aeroponic Planter Matrix (Wheat, Soy & Potato)</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Click the planter beds to inspect root nozzles and prune dry leaves. Watch crops visually advance: <em>Tiny Green Sprouts ➔ Leafy Stalks ➔ Flowering Crops ➔ Radiant Golden Wheat!</em>
                </p>
              </div>

              <div style="background: rgba(241, 196, 15, 0.1); border: 1px solid #f1c40f; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #f1c40f;">Station 4: 🌾 Space Harvest & Vacuum Pack Dehydrator</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  When crops reach <strong>100% maturity</strong>, Alex shears the golden sheaves, feeds them into the NASA freeze-dry synthesizer, and vacuum-packs <strong>+18 Days of Emergency Food Rations</strong> into storage!
                </p>
              </div>

              <div style="background: rgba(231, 76, 60, 0.1); border: 1px solid #e74c3c; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #e74c3c;">⏭️ Advance to Next Day (60-Day Countdown)</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Advances time by 1 day. Crew eats rations. Crops get <strong>+5% natural growth</strong>, and closed-loop ECLSS recovery condenses <strong>+10% water and recharges +10% solar power</strong>.
                </p>
              </div>
            </div>
          </div>

          <!-- Difficulty Scaling & Survival Rates -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">Difficulty Scaling & Metabolic Burn:</strong>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px; font-size: 0.8rem;">
              <div>• <strong style="color: #64b5f6;">Cadet (1.0x):</strong> 1 ration burned per day. Standard recycling (+10% H2O, +10% Power).</div>
              <div>• <strong style="color: #ffd54f;">Commander (1.35x):</strong> 1.35 rations burned per day. Tighter margins; requires frequent harvesting.</div>
              <div>• <strong style="color: #ff5252;">Iron Astronaut (1.7x):</strong> 1.7 rations burned per day. Extreme metabolic strain; missing even one harvest cycle can lead to starvation.</div>
            </div>
          </div>

          <!-- Permadeath Directive -->
          <div style="background: rgba(255, 51, 102, 0.14); border-left: 4px solid var(--accent-red); border-radius: 6px; padding: 12px 16px;">
            <strong style="color: #ff80ab;">💀 Permadeath Rule: Zero Checkpoints</strong>
            <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #ffebee;">
              If Food Rations reach 0 before Day 60, the crew starves. The game does NOT give a retry on that level. In accordance with NASA permadeath protocol, your entire career score and rank reset to zero. Upon Day 60 victory, you unlock the <strong>Final Mission: Resupply & Extraction</strong>!
            </p>
          </div>

        </div>
      `;
    } else if (this.activeTab === "extraction_mission") {
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.86rem; color: #cfd8dc; line-height: 1.55;">
          
          <!-- Introduction Callout -->
          <div style="background: rgba(0, 229, 255, 0.12); border-left: 4px solid #00e5ff; padding: 14px 18px; border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.8rem;">🚀</span>
              <div>
                <strong style="color: #00e5ff; font-size: 1.05rem;">Mission 4: Final Resupply & Extraction • Grand Finale</strong>
                <div style="font-size: 0.78rem; color: #cfd8dc; margin-top: 2px;">
                  The Artemis Crew Return & Resupply Lander has arrived in lunar orbit. Lock guidance beacons and clear Pad Alpha before the orbital window closes!
                </div>
              </div>
            </div>
          </div>

          <!-- Mission Objectives -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">BEACON LOCK</div>
              <strong style="color: #2ecc71;">100% Req.</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">ORBIT WINDOW</div>
              <strong style="color: #f1c40f;">Decays -25%</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">REWARD</div>
              <strong style="color: var(--accent-gold);">+1000 Pts</strong>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 6px; text-align: center;">
              <div style="font-size: 0.7rem; color: var(--text-muted);">ACHIEVEMENT</div>
              <strong style="color: #00e5ff;">Artemis Legend</strong>
            </div>
          </div>

          <!-- Step by Step Guideline -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">Step-by-Step Extraction Guideline:</strong>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
              <div style="background: rgba(52, 152, 219, 0.1); border: 1px solid #3498db; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #3498db;">Step 1: 📡 Align High-Gain Dish (ext-btn-dish)</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Click to re-orient the parabolic communication dish toward the Lunar Gateway spacecraft in cis-lunar orbit. Shifts Gateway Link from <span style="color:#e74c3c;">Offline</span> to <span style="color:#2ecc71;">Locked</span>, adds <strong>+50% Beacon Lock</strong>, and consumes 25% of the orbital window.
                </p>
              </div>

              <div style="background: rgba(230, 126, 34, 0.1); border: 1px solid #e67e22; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #e67e22;">Step 2: 🧹 Clear Regolith Pad Alpha (ext-btn-pad)</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Click to clear dangerous regolith boulders and sharp fragments from Landing Zone Alpha. Shifts Landing Zone status from <span style="color:#e74c3c;">Obstructed</span> to <span style="color:#2ecc71;">Clear</span>, completes Beacon Lock to <strong>100%</strong>, and unlocks the beacon transmitter!
                </p>
              </div>

              <div style="background: rgba(46, 204, 113, 0.1); border: 1px solid #2ecc71; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #2ecc71;">Step 3: 🚀 Transmit Landing Beacon (ext-btn-beacon)</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Once both dish and pad are ready, click the glowing green beacon button! The transmitter switches to <strong>Transmitting</strong>, firing the guidance laser beam to the incoming lander. Watch the live 2D radar descent tracking canvas as the lander fires retro-thrusters and touches down smoothly on Pad Alpha.
                </p>
              </div>

              <div style="background: rgba(241, 196, 15, 0.1); border: 1px solid #f1c40f; border-radius: 6px; padding: 10px 12px;">
                <strong style="color: #f1c40f;">Step 4: 🏆 Flight Debrief & Permanent Base Certification</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #cfd8dc;">
                  Upon landing, the Artemis Survival Challenge Victory Card reveals all 5 completed operational stages. Click <strong>[🏆 View Final Artemis Expedition Flight Debrief ➔]</strong> to review your official NASA mission report card and final certification!
                </p>
              </div>
            </div>
          </div>

        </div>
      `;
    } else {
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.86rem; color: #cfd8dc; line-height: 1.55;">
          
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">⌨️ Keyboard Shortcuts:</strong>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; font-size: 0.8rem;">
              <div><kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">A</kbd> / <kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">◀</kbd>: Walk / Steer Left</div>
              <div><kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">D</kbd> / <kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">▶</kbd>: Walk / Steer Right</div>
              <div><kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">Space</kbd>: Fire Retro-Thruster Engine</div>
              <div><kbd style="background: #263238; padding: 2px 6px; border-radius: 4px; border: 1px solid #455a64; color: #fff;">R</kbd>: Mount / Dismount Exploration Rover</div>
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 14px;">
            <strong style="color: #fff; font-size: 0.95rem;">📱 Touch & Mobile Friendly:</strong>
            <p style="margin: 6px 0 0 0;">
              Every keyboard action has an on-screen visual button designed for tablet and mobile screens:
              <br>• Lander: Left/Right directional buttons and glowing <strong>🔥 RETRO-THRUST</strong> button.
              <br>• Surface Camp: <strong>◀</strong> and <strong>▶</strong> walk buttons, plus a <strong>🏎️ Mount Rover</strong> toggle.
            </p>
          </div>

          <div style="background: rgba(255, 214, 0, 0.08); border-left: 3px solid var(--accent-gold); padding: 12px 16px; border-radius: 4px;">
            <strong style="color: #ffe082;">NASA Flight Safety Tip:</strong>
            <div style="margin-top: 4px; font-size: 0.8rem; color: #cfd8dc;">
              When solar storms or micrometeoroid showers occur, seek shelter immediately inside the Pressurized Habitat Dome! Closed-loop shielding absorbs 95% of cosmic rays.
            </div>
          </div>

        </div>
      `;
    }
  }

  attachEvents() {
    const closeBtn = this.container.querySelector("#btn-close-guide");
    const dismissBtn = this.container.querySelector("#btn-dismiss-guide");
    const backdrop = this.container.querySelector("#modal-backdrop");

    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (dismissBtn) dismissBtn.addEventListener("click", () => this.close());
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    // Tab buttons
    this.container.querySelectorAll(".guide-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = btn.getAttribute("data-tab");
        this.render();
      });
    });
  }
}

