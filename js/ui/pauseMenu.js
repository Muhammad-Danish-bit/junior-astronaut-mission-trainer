// ============================================================================
// SETTINGS & PAUSE MENU MODAL
// Audio controls, NASA Codex Encyclopedia, and save reset
// ============================================================================

import { sound } from "../audio.js";
import { gameState } from "../state.js";
import { GAME_CONFIG } from "../config.js";

export class PauseMenuModal {
  constructor(modalContainer) {
    this.container = modalContainer;
  }

  show() {
    sound.playClick();
    this.container.innerHTML = `
      <div class="modal-overlay active" id="pause-modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title">
              <span>⚙️</span>
              <span>Mission Control Settings</span>
            </div>
            <button class="btn-icon" id="btn-close-pause" style="width: 32px; height: 32px;">✕</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- Audio Toggles -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: var(--radius-sm);">
              <div>
                <strong>Sound Effects & Radio Beeps</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Web Audio procedural synthesizer</div>
              </div>
              <button class="btn-secondary" id="btn-modal-audio-toggle">
                ${sound.isMuted ? '🔇 Unmute SFX' : '🔊 Mute SFX'}
              </button>
            </div>

            <!-- NASA Science Codex Quick View -->
            <div style="background: rgba(255,255,255,0.05); padding: 14px 16px; border-radius: var(--radius-sm);">
              <strong style="color: var(--accent-gold);">📖 NASA Astronaut Codex</strong>
              <div style="font-size: 0.82rem; color: #cfd8dc; margin-top: 6px; line-height: 1.45;">
                "${GAME_CONFIG.TRIVIA_ARCHIVE[Math.floor(Math.random() * GAME_CONFIG.TRIVIA_ARCHIVE.length)].fact}"
              </div>
            </div>

            <!-- Astronaut Profile -->
            <div style="background: rgba(0, 229, 255, 0.08); padding: 12px 16px; border-radius: var(--radius-sm); border-left: 3px solid var(--border-cyan);">
              <div style="display: flex; justify-content: space-between;">
                <span>Astronaut Rank:</span>
                <strong style="color: var(--text-highlight);">${gameState.getRank().title} ${gameState.getRank().badge}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                <span>Total Science Points:</span>
                <strong style="color: var(--accent-gold);">${gameState.state.score} Pts</strong>
              </div>
            </div>

            <!-- Reset Save Button -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
              <button class="btn-secondary" id="btn-reset-save" style="color: #ff80ab; border-color: rgba(255, 51, 102, 0.4);">
                ⚠️ Reset All Progress
              </button>
              <button class="btn-primary" id="btn-resume-mission">
                Resume Training ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const overlay = this.container.querySelector("#pause-modal-overlay");
    const closeBtn = this.container.querySelector("#btn-close-pause");
    const resumeBtn = this.container.querySelector("#btn-resume-mission");
    const audioBtn = this.container.querySelector("#btn-modal-audio-toggle");
    const resetBtn = this.container.querySelector("#btn-reset-save");

    const close = () => {
      sound.playClick();
      overlay.classList.remove("active");
      setTimeout(() => { this.container.innerHTML = ""; }, 250);
    };

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (resumeBtn) resumeBtn.addEventListener("click", close);

    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        const isMuted = sound.toggleMute();
        audioBtn.textContent = isMuted ? '🔇 Unmute SFX' : '🔊 Mute SFX';
        const topAudioBtn = document.querySelector("#btn-toggle-sound");
        if (topAudioBtn) topAudioBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your score, unlocked rockets, and missions? This cannot be undone.")) {
          gameState.resetProgress();
          close();
        }
      });
    }
  }
}

