// ============================================================================
// CREW BOARDING & PRE-LAUNCH CHECKLIST COMPONENT
// Astronaut drag-and-drop into cockpit and 4-step mission verification
// ============================================================================

import { GAME_CONFIG } from "../config.js";
import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class ChecklistComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.unsubscribe = null;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
    this.unsubscribe = gameState.subscribe((state, event) => {
      if (state.screen === "boarding") {
        this.updateView();
      }
    });
  }

  render() {
    const s = gameState.state;
    const rocket = GAME_CONFIG.ROCKETS[s.selectedRocket];
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const c = s.checklist;
    const isAllReady = gameState.isChecklistComplete();

    this.container.innerHTML = `
      <div class="boarding-layout">
        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner" style="grid-column: 1 / -1;">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 4 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Click <strong>[Board Astronaut Alex 👨‍🚀]</strong>, then toggle all 4 pre-flight checks (Gyros, Comms, Life Support, Engine Seals). When Houston clears flight, click <strong style="color: #ff9100;">[Initiate Countdown →]</strong>!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-boarding-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Left: Launch Pad & Crew Boarding Gantry -->
        <section class="boarding-panel">
          <div class="panel-title">
            <span>🚀 Pad 39B • Crew Boarding</span>
            <span style="font-size: 0.8rem; color: var(--accent-gold);">${rocket.name}</span>
          </div>

          <p style="font-size: 0.85rem; color: #cfd8dc; margin: 12px 0 16px 0; line-height: 1.45;">
            Astronaut Alex must board the command module before final countdown. Drag and drop the astronaut into the hatch, or press "Board Astronaut".
          </p>

          <div style="display: flex; justify-content: center; margin: 10px 0;">
            <!-- Draggable Astronaut -->
            <div class="astronaut-dragger" 
                 id="draggable-astronaut" 
                 draggable="false"
                 style="${c.astronautBoarded ? 'display: none;' : ''}">
              <div style="font-size: 2.8rem; pointer-events: none;">👨‍🚀</div>
              <span style="font-size: 0.72rem; font-weight: 800; color: #fff; margin-top: 4px; pointer-events: none;">Alex (EMU)</span>
            </div>
          </div>

          <!-- Rocket Cockpit Drop Zone -->
          <div class="cockpit-dropzone ${c.astronautBoarded ? 'boarded' : ''}" id="cockpit-dropzone">
            <div style="font-size: 3rem; margin-bottom: 6px;">
              ${c.astronautBoarded ? '🧑‍🚀' : '🚪'}
            </div>
            <strong style="color: ${c.astronautBoarded ? 'var(--text-highlight)' : '#fff'}; font-size: 0.95rem;">
              ${c.astronautBoarded ? 'ASTRONAUT SECURED IN COCKPIT' : 'Command Hatch Open (Drop Here)'}
            </strong>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; text-align: center;">
              ${c.astronautBoarded ? 'Seat harness locked • Visor down • Comms live' : 'Drag astronaut Alex into hatch'}
            </div>
          </div>

          <!-- Accessibility Quick-Board Button -->
          ${!c.astronautBoarded ? `
            <button class="btn-secondary" id="btn-quick-board" style="width: 100%; margin-top: 14px; justify-content: center;">
              <span>Board Astronaut Alex 👨‍🚀</span>
            </button>
          ` : ''}

          <!-- Back button -->
          <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
            <button class="btn-secondary" id="btn-back-rocket" style="width: 100%; justify-content: center;">
              <span>← Back to Rocket Hangar</span>
            </button>
          </div>
        </section>

        <!-- Right: Pre-Launch Checklist System -->
        <section class="checklist-panel">
          <div class="panel-title">
            <span>📋 Pre-Flight Systems Checklist</span>
            <span style="font-size: 0.8rem; color: var(--border-cyan);">Target: ${dest.name}</span>
          </div>

          <div style="margin: 12px 0; font-size: 0.85rem; color: #cfd8dc;">
            Verify all critical flight telemetry items with Houston Mission Control before ignition clearance.
          </div>

          <div class="checklist-list">
            ${this.renderChecklistItems()}
          </div>

          <!-- Launch Readiness Banner -->
          <div style="margin-top: 24px; padding: 16px; border-radius: var(--radius-md); background: ${isAllReady ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255, 255, 255, 0.04)'}; border: 1px solid ${isAllReady ? 'var(--text-highlight)' : 'rgba(255,255,255,0.1)'}; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <strong style="color: ${isAllReady ? 'var(--text-highlight)' : 'var(--text-muted)'}; font-size: 1rem;">
                ${isAllReady ? 'STATUS: GO FOR LAUNCH! 🚀' : 'STATUS: PRE-FLIGHT CHECKS INCOMPLETE'}
              </strong>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                ${isAllReady ? 'Flight computer primed. Range safety verified.' : 'Complete all 4 checks and board crew to proceed.'}
              </div>
            </div>

            <button class="btn-primary" id="btn-initiate-launch" ${!isAllReady ? 'disabled' : ''}>
              <span>Initiate Countdown →</span>
            </button>
          </div>
        </section>
      </div>
    `;
  }

  renderChecklistItems() {
    const s = gameState.state;
    return GAME_CONFIG.CHECKLIST_STEPS.map((step) => {
      const isDone = s.checklist[step.id];
      return `
        <div class="check-item ${isDone ? 'completed' : ''}" data-step-id="${step.id}">
          <div style="display: flex; align-items: center; gap: 14px;">
            <span style="font-size: 1.6rem;">${step.icon}</span>
            <div>
              <div style="font-weight: 700; font-size: 0.92rem; color: ${isDone ? 'var(--text-highlight)' : '#fff'};">
                ${step.label}
              </div>
              <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
                ${step.detail}
              </div>
            </div>
          </div>
          <div class="check-box-icon">
            ${isDone ? '✓' : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  attachEvents() {
    const astroDragger = this.container.querySelector("#draggable-astronaut");
    const dropzone = this.container.querySelector("#cockpit-dropzone");

    // Pointer Events Drag & Drop (supports both mouse and touch on tablets!)
    if (astroDragger && dropzone) {
      let isDragging = false;
      let startX, startY;
      let initialLeft, initialTop;

      const onPointerDown = (e) => {
        isDragging = true;
        astroDragger.setPointerCapture(e.pointerId);
        sound.playClick();
        
        const rect = astroDragger.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        astroDragger.style.position = "fixed";
        astroDragger.style.left = `${rect.left}px`;
        astroDragger.style.top = `${rect.top}px`;
        astroDragger.style.zIndex = "1000";
        astroDragger.style.pointerEvents = "none";
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        astroDragger.style.left = `${e.clientX - 45}px`;
        astroDragger.style.top = `${e.clientY - 55}px`;

        const dzRect = dropzone.getBoundingClientRect();
        const isOver = (
          e.clientX >= dzRect.left &&
          e.clientX <= dzRect.right &&
          e.clientY >= dzRect.top &&
          e.clientY <= dzRect.bottom
        );
        dropzone.classList.toggle("drag-over", isOver);
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        astroDragger.releasePointerCapture(e.pointerId);
        astroDragger.style.pointerEvents = "auto";

        const dzRect = dropzone.getBoundingClientRect();
        const isOver = (
          e.clientX >= dzRect.left &&
          e.clientX <= dzRect.right &&
          e.clientY >= dzRect.top &&
          e.clientY <= dzRect.bottom
        );
        dropzone.classList.remove("drag-over");

        if (isOver) {
          sound.playSuccessChime();
          gameState.setChecklistItem("astronautBoarded", true);
          this.render();
          this.attachEvents();
        } else {
          // Snap back
          astroDragger.style.position = "";
          astroDragger.style.left = "";
          astroDragger.style.top = "";
          astroDragger.style.zIndex = "";
        }
      };

      astroDragger.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }

    // Quick Board button
    const quickBoardBtn = this.container.querySelector("#btn-quick-board");
    if (quickBoardBtn) {
      quickBoardBtn.addEventListener("click", () => {
        sound.playSuccessChime();
        gameState.setChecklistItem("astronautBoarded", true);
        this.render();
        this.attachEvents();
      });
    }

    // Checklist item toggle clicks
    this.container.querySelectorAll(".check-item").forEach((item) => {
      item.addEventListener("click", () => {
        const stepId = item.getAttribute("data-step-id");
        const current = gameState.state.checklist[stepId];
        const next = !current;
        
        if (next) {
          sound.playQuindar();
        } else {
          sound.playClick();
        }

        gameState.setChecklistItem(stepId, next);
        this.render();
        this.attachEvents();
      });
    });

    // Back to rocket hangar
    const backBtn = this.container.querySelector("#btn-back-rocket");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        sound.playClick();
        gameState.setScreen("rocket_select");
      });
    }

    // Launch initiate button
    const launchBtn = this.container.querySelector("#btn-initiate-launch");
    if (launchBtn) {
      launchBtn.addEventListener("click", () => {
        if (gameState.isChecklistComplete()) {
          sound.playSuccessChime();
          gameState.setScreen("launch");
        }
      });
    }

    const btnGuide = this.container.querySelector("#btn-boarding-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("first_mission");
        }
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

