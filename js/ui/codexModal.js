// ============================================================================
// NASA SCIENCE CODEX & EXPEDITION ENCYCLOPEDIA MODAL
// Educational science compendium for kids 8-14: ECLSS, Planetary Science, Spacesuits
// ============================================================================

import { sound } from "../audio.js";
import { GAME_CONFIG } from "../config.js";

export class CodexModal {
  constructor(modalContainer) {
    this.container = modalContainer;
    this.currentTab = "planets"; // 'planets', 'eclss', 'suits', 'missions'
  }

  show() {
    sound.playQuindar();
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-overlay active" id="codex-modal-overlay">
        <div class="modal-card" style="max-width: 780px; max-height: 85vh; display: flex; flex-direction: column;">
          <!-- Header -->
          <div class="modal-header" style="border-bottom: 1px solid rgba(0, 229, 255, 0.2); padding-bottom: 12px;">
            <div class="modal-title">
              <span>📖</span>
              <span>NASA Astronaut Science Codex</span>
            </div>
            <button class="btn-icon" id="btn-close-codex" style="width: 32px; height: 32px;">✕</button>
          </div>

          <!-- Codex Tabs -->
          <div style="display: flex; gap: 8px; margin: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
            <button class="btn-diff ${this.currentTab === 'planets' ? 'active' : ''}" data-tab="planets">
              🪐 Planetary Worlds
            </button>
            <button class="btn-diff ${this.currentTab === 'eclss' ? 'active' : ''}" data-tab="eclss">
              🫁 ECLSS Life Support
            </button>
            <button class="btn-diff ${this.currentTab === 'suits' ? 'active' : ''}" data-tab="suits">
              🛡️ Spacesuit Engineering
            </button>
            <button class="btn-diff ${this.currentTab === 'missions' ? 'active' : ''}" data-tab="missions">
              🚀 NASA Flight History
            </button>
          </div>

          <!-- Tab Content (Scrollable) -->
          <div style="flex: 1; overflow-y: auto; padding-right: 8px;" id="codex-tab-content">
            ${this.renderTabContent()}
          </div>

          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; color: var(--accent-gold);">NASA Space Apps Challenge Educational Edition</span>
            <button class="btn-primary" id="btn-dismiss-codex" style="padding: 8px 18px; font-size: 0.9rem;">
              Close Codex
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderTabContent() {
    if (this.currentTab === "planets") {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #90caf9; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #90caf9; font-size: 1rem;">🌕 The Moon (Luna)</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              Gravity is only 1.62 m/s² (1/6th of Earth). Because the Moon has no atmosphere, daylight temperatures soar to +120°C while shadows plunge to -130°C. Trapped water ice at the South Pole's Shackleton Crater will supply hydrogen and oxygen for NASA's Artemis base camp.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #ff7043; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #ff7043; font-size: 1rem;">🔴 Mars (The Red Planet)</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              Gravity is 3.72 m/s² (38% of Earth). The atmosphere is 95% carbon dioxide and less than 1% as dense as Earth's. Global dust storms can envelope the entire planet for months, cutting off solar power. NASA's MOXIE experiment has proven we can extract breathable O₂ directly from Martian air!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #80deea; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #80deea; font-size: 1rem;">❄️ Europa (Jupiter's Ocean Moon)</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              Beneath an ice crust 15 to 25 km thick lies a global liquid saltwater ocean containing twice the water of all Earth's oceans combined! However, Jupiter's colossal magnetosphere accelerates trapped particles into lethal radiation belts, requiring heavy shielding.
            </p>
          </div>
        </div>
      `;
    } else if (this.currentTab === "eclss") {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: rgba(0, 229, 255, 0.06); border-left: 4px solid var(--border-cyan); padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: var(--border-cyan); font-size: 1rem;">🫁 The Sabatier Reaction & MOXIE</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              On the International Space Station and future Martian habitats, we cannot transport years of oxygen from Earth. The Sabatier reactor combines exhaled carbon dioxide ($CO_2$) with hydrogen ($H_2$) at 400°C to produce water and methane. Then water electrolysis ($2H_2O \rightarrow 2H_2 + O_2$) splits water to regenerate pure breathable oxygen!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #ffd54f; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #ffd54f; font-size: 1rem;">⚡ The Thermal Equilibrium Challenge</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              In the vacuum of space, heat can only escape via thermal radiation. Without electricity to run resistive heaters, spacecraft cool rapidly toward deep space temperatures (3 Kelvin / -270°C). If power fails, water coolant lines freeze solid, fracturing base life-support loops.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #00b0ff; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #00b0ff; font-size: 1rem;">💧 98% Water Recycling Loop</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              NASA's Environmental Control and Life Support System (ECLSS) on the ISS recycles 98% of all onboard moisture—including astronaut sweat and exhaled breath! Advanced vacuum distillation and catalytic oxidizers purify water cleaner than most municipal tap water on Earth.
            </p>
          </div>
        </div>
      `;
    } else if (this.currentTab === "suits") {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #ab47bc; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #ab47bc; font-size: 1rem;">🛡️ Spacesuit EMU 14-Layer Shielding</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              A NASA Extravehicular Mobility Unit (EMU) is essentially a personalized one-person spacecraft. It features 14 distinct layers: an inner Liquid Cooling and Ventilation Garment (tubing circulating cold water), a urethane pressure bladder, a Dacron restraint layer, and an outer Thermal Micrometeoroid Garment (TMG) of Kevlar and aluminized Mylar to deflect space debris traveling at 28,000 km/h.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #ff3366; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #ff3366; font-size: 1rem;">⚠️ What Happens During a Suit Puncture?</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              In a vacuum, liquids boil at body temperature without pressure (the Armstrong Limit at ~19 km altitude). If a suit is punctured, emergency secondary oxygen tanks blast gas to maintain 30 kPa pressure while the astronaut must apply a sealant patch before hypoxia causes unconsciousness in 12 seconds.
            </p>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid var(--accent-gold); padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: var(--accent-gold); font-size: 1rem;">🌙 Apollo & Artemis Programs</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              Between 1969 and 1972, 12 American astronauts walked on the Moon during the Apollo missions. Today, NASA's Artemis program is building a sustainable, permanent human presence at the lunar South Pole, landing the first woman and first person of color on the lunar surface.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #ff7043; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #ff7043; font-size: 1rem;">🤖 Perseverance & Ingenuity (Mars 2020)</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              NASA's Perseverance rover landed in Jezero Crater in February 2021 equipped with 23 cameras, an automated drill to seal soil core samples for future Earth return, and the Ingenuity helicopter—the first powered aircraft to fly on another planet!
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.04); border-left: 4px solid #80deea; padding: 12px; border-radius: 6px;">
            <div style="font-weight: 800; color: #80deea; font-size: 1rem;">✨ Europa Clipper (Jovian Ocean Explorer)</div>
            <p style="font-size: 0.82rem; color: #cfd8dc; margin-top: 4px; line-height: 1.45;">
              Launched in October 2024, NASA's Europa Clipper is the largest spacecraft NASA has ever developed for a planetary mission. It carries ice-penetrating radar, spectrometers, and thermal cameras to determine whether Europa's subsurface ocean has the conditions suitable for life.
            </p>
          </div>
        </div>
      `;
    }
  }

  attachEvents() {
    const overlay = this.container.querySelector("#codex-modal-overlay");
    const closeBtn = this.container.querySelector("#btn-close-codex");
    const dismissBtn = this.container.querySelector("#btn-dismiss-codex");

    const close = () => {
      sound.playClick();
      overlay.classList.remove("active");
      setTimeout(() => { this.container.innerHTML = ""; }, 250);
    };

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (dismissBtn) dismissBtn.addEventListener("click", close);

    // Tab buttons
    this.container.querySelectorAll(".btn-diff").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.currentTab = btn.getAttribute("data-tab");
        this.render();
      });
    });
  }
}

