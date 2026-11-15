// ============================================================================
// FLIGHT DIRECTOR STELLA - INTERACTIVE TUTORIAL
// ============================================================================

import { sound } from "../audio.js";
import { gameState } from "../state.js";

export class TutorialModal {
  constructor(modalContainer) {
    this.container = modalContainer;
    this.stepIndex = 0;
    this.steps = [
      {
        title: "Welcome to NASA Mission Control!",
        icon: "👩‍🚀",
        content: "Greetings, Cadet! I'm Flight Director Stella. Today you will command humanity's most ambitious space expedition. Your training starts on Earth and will take you to the Moon, Mars, and the ocean world Europa!"
      },
      {
        title: "Manage Life Support Resources",
        icon: "🫁",
        content: "Space is an unforgiving vacuum. You must track 5 vital resources: Oxygen (O2), Food Rations, Auxiliary Power, Purified Water, and Rocket Fuel. If Oxygen, Food, or Power hits zero, your mission fails!"
      },
      {
        title: "Select & Load Your Spacecraft",
        icon: "🚀",
        content: "Choose between 3 rockets: Scout, Pioneer, and Titan. Each rocket has cargo limits. Make sure you pack enough supplies for your destination distance — watch the Payload Warning Indicator!"
      },
      {
        title: "Crew Boarding & Pre-Flight Checks",
        icon: "📋",
        content: "Drag your astronaut into the command cockpit and execute all 4 pre-flight checks: communications telemetry, life-support seal, navigation gyroscopes, and engine baffles."
      },
      {
        title: "Build Extraterrestrial Base Camps",
        icon: "🏠",
        content: "Upon touching down, place living Habitats, Solar Arrays, Sabatier O2 Reactors, and Hydroponic Greenhouses to generate sustainable life support. Face down solar storms and survive!"
      }
    ];
  }

  show() {
    sound.playQuindar();
    this.stepIndex = 0;
    this.renderStep();
  }

  renderStep() {
    const s = this.steps[this.stepIndex];
    const isLast = this.stepIndex === this.steps.length - 1;

    this.container.innerHTML = `
      <div class="modal-overlay active" id="tutorial-modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title">
              <span>${s.icon}</span>
              <span>${s.title}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--accent-gold);">
              Step ${this.stepIndex + 1} of ${this.steps.length}
            </div>
          </div>

          <p style="font-size: 0.95rem; line-height: 1.6; color: #e0e0e0; min-height: 80px;">
            ${s.content}
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1);">
            <button class="btn-secondary" id="btn-tutorial-skip">
              Skip Briefing
            </button>
            <button class="btn-primary" id="btn-tutorial-next">
              ${isLast ? "Begin Mission! 🚀" : "Next Step →"}
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const overlay = this.container.querySelector("#tutorial-modal-overlay");
    const nextBtn = this.container.querySelector("#btn-tutorial-next");
    const skipBtn = this.container.querySelector("#btn-tutorial-skip");

    const close = () => {
      sound.playClick();
      overlay.classList.remove("active");
      gameState.state.hasSeenTutorial = true;
      gameState.saveToStorage();
      setTimeout(() => { this.container.innerHTML = ""; }, 250);
    };

    if (skipBtn) skipBtn.addEventListener("click", close);

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        if (this.stepIndex < this.steps.length - 1) {
          this.stepIndex++;
          this.renderStep();
        } else {
          close();
        }
      });
    }
  }
}

