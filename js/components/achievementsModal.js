// ============================================================================
// ACHIEVEMENTS MODAL COMPONENT
// NASA Astronaut Flight Log & Mission Badges
// Real-time tracking of milestones achieved in Phase 1
// ============================================================================

import { gameState } from "../state.js";
import { sound } from "../audio.js";

export class AchievementsModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const achievements = s.achievements;
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const progressPct = Math.round((unlockedCount / totalCount) * 100);

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🏆</span>
              <div>
                <h2>NASA Astronaut Flight Badges & Achievements</h2>
                <div class="modal-subtitle">Flight Director Honor Roll • Operational Certifications</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-achievements-modal" aria-label="Close Achievements">✕</button>
          </div>

          <div class="modal-body">
            <!-- Progress Summary Card -->
            <div class="achievements-summary-card">
              <div class="summary-left">
                <div class="trophy-icon">🎖️</div>
                <div>
                  <h3>Flight Certification Progress</h3>
                  <p>Earn badges by maintaining nominal life support vitals, optimizing rocket payloads, and completing mission readiness tests.</p>
                </div>
              </div>
              <div class="summary-right">
                <div class="ach-count-text">
                  <strong>${unlockedCount}</strong> / ${totalCount} Badges
                </div>
                <div class="meter-track" style="width: 140px;">
                  <div class="meter-fill" style="width: ${progressPct}%; background: var(--accent-gold);"></div>
                </div>
              </div>
            </div>

            <!-- Badges Grid -->
            <div class="achievements-grid">
              ${achievements.map(a => this.renderBadgeCard(a)).join("")}
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Earned Badges: <strong>${unlockedCount} of ${totalCount}</strong></span>
              <span>Honor Rating: <strong>${progressPct}% Certified</strong></span>
            </div>
            <button class="btn-primary" id="btn-confirm-achievements">
              <span>Return to Mission Control</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderBadgeCard(a) {
    return `
      <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
        <div class="ach-badge-icon">${a.badge}</div>
        <div class="ach-content">
          <div class="ach-title-row">
            <h4>${a.title}</h4>
            <span class="ach-status-chip ${a.unlocked ? 'chip-unlocked' : 'chip-locked'}">
              ${a.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
            </span>
          </div>
          <p class="ach-desc">${a.description}</p>
          ${a.unlocked && a.unlockedAt ? `<div class="ach-timestamp">Earned at ${a.unlockedAt}</div>` : ''}
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-achievements-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-achievements");

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => this.close());
    }
  }
}

