// ============================================================================
// CINEMATIC PLAYER - Mission Intro & Mission-Complete Outro
// Fullscreen letterboxed video overlay with timed story captions, skip button,
// sound toggle, progress bar, graceful fallbacks and ambient-music ducking.
// ============================================================================

import { sound } from "../audio.js";

const CINEMATICS = {
  intro: {
    src: "assets/video/intro.mp4",
    poster: "assets/video/intro-poster.jpg",
    kicker: "MISSION CONTROL • HOUSTON",
    title: "Mission Briefing",
    titleShow: 0.4, titleHide: 3.8,
    captions: [
      { t: 0.5,  text: "Houston, Mission Control. Our next stop: the Moon." },
      { t: 5.5,  text: "Flight Director Stella: \"Lunar landing zone locked in. Stay sharp, crew!\"" },
      { t: 10,   text: "⚠️ ASCENT PHASE 1 — warning lights everywhere!" },
      { t: 15,   text: "Steady hands, Commander. Earth is fading behind you." },
      { t: 25,   text: "Hard landing! The crew is stranded on the lunar surface." },
      { t: 31,   text: "Your mission: survive, repair, and bring everyone home." }
    ]
  },
  outro: {
    src: "assets/video/outro.mp4",
    poster: "assets/video/outro-poster.jpg",
    kicker: "MISSION COMPLETE",
    title: "Welcome Home, Astronaut!",
    titleShow: 30.5, titleHide: 99,
    captions: [
      { t: 0.5, text: "Emergency repairs on the lander — every wire counts." },
      { t: 5,   text: "Systems restored. The lander is flight-ready!" },
      { t: 9.5, text: "Liftoff from the lunar surface!" },
      { t: 15,  text: "All systems... GO! GO! GO!" },
      { t: 25,  text: "Earth ahead. Almost home." },
      { t: 30,  text: "Touchdown! Welcome home, Commander. Mission accomplished! 🎉" }
    ]
  }
};

export class CinematicPlayer {
  constructor() {
    this.root = null;
    this.video = null;
    this.activeKey = null;
    this.onDone = null;
    this.finished = true;
    this.captionIndex = -1;
    this.muted = false;
    this.keyHandler = this.handleKey.bind(this);
    this.seen = { intro: false, outro: false };
    this.build();
  }

  // Warm the browser cache so playback starts instantly
  preload(key) {
    const c = CINEMATICS[key];
    if (!c || this["_pre_" + key]) return;
    this["_pre_" + key] = true;
    try {
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      v.src = c.src;
      v.load();
    } catch (e) { /* non-fatal */ }
  }

  build() {
    const el = document.createElement("div");
    el.className = "cinematic-overlay";
    el.id = "cinematic-overlay";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Mission cinematic");
    el.innerHTML = `
      <div class="cine-stage">
        <video class="cine-video" playsinline preload="auto"></video>
        <div class="cine-vignette"></div>
        <div class="cine-top">
          <div class="cine-badge">
            <span class="cine-rec"></span>
            <span class="cine-kicker"></span>
          </div>
          <div class="cine-controls">
            <button class="cine-btn" id="cine-mute" aria-label="Toggle cinematic sound" title="Sound on/off">🔊</button>
            <button class="cine-btn cine-skip" id="cine-skip" aria-label="Skip cinematic" title="Skip (Esc / Space)">SKIP ⏭</button>
          </div>
        </div>
        <div class="cine-title" id="cine-title"></div>
        <div class="cine-caption" id="cine-caption" aria-live="polite"></div>
        <div class="cine-tap" id="cine-tap">
          <button class="btn-start-mission" id="cine-play"><span>TAP TO PLAY</span><span>▶</span></button>
        </div>
        <div class="cine-progress"><div class="cine-progress-fill" id="cine-progress-fill"></div></div>
      </div>
    `;
    document.body.appendChild(el);
    this.root = el;
    this.video = el.querySelector(".cine-video");
    this.captionEl = el.querySelector("#cine-caption");
    this.titleEl = el.querySelector("#cine-title");
    this.kickerEl = el.querySelector(".cine-kicker");
    this.fillEl = el.querySelector("#cine-progress-fill");
    this.tapEl = el.querySelector("#cine-tap");
    this.muteBtn = el.querySelector("#cine-mute");
    this.skipBtn = el.querySelector("#cine-skip");

    this.skipBtn.addEventListener("click", () => { sound.playClick(); this.finish(true); });
    this.muteBtn.addEventListener("click", () => {
      this.muted = !this.muted;
      this.video.muted = this.muted;
      this.muteBtn.textContent = this.muted ? "🔇" : "🔊";
    });
    el.querySelector("#cine-play").addEventListener("click", () => {
      this.tapEl.classList.remove("show");
      this.safePlay(false);
    });

    this.video.addEventListener("timeupdate", () => this.onTime());
    this.video.addEventListener("ended", () => this.finish(false));
    this.video.addEventListener("error", () => this.finish(true));
  }

  // key: "intro" | "outro". Resolves via callback when played or skipped.
  play(key, onDone) {
    const c = CINEMATICS[key];
    if (!c || !this.finished) { if (onDone) onDone(); return; }

    this.activeKey = key;
    this.onDone = onDone || null;
    this.finished = false;
    this.captionIndex = -1;
    this.captionEl.classList.remove("show");
    this.captionEl.textContent = "";
    this.fillEl.style.width = "0%";
    this.kickerEl.textContent = c.kicker;
    this.titleEl.textContent = c.title;
    this.titleEl.classList.remove("show");
    this.tapEl.classList.remove("show");
    this.skipBtn.classList.remove("ready");

    // Respect the game's global mute button
    this.muted = !!sound.isMuted;
    this.muteBtn.textContent = this.muted ? "🔇" : "🔊";

    this.video.poster = c.poster;
    this.video.src = c.src;
    this.video.muted = this.muted;
    this.video.currentTime = 0;

    // Duck procedural ambient music so it doesn't fight the cinematic audio
    this.duckMusic(true);

    this.root.classList.add("active");
    document.body.classList.add("cinematic-open");
    document.addEventListener("keydown", this.keyHandler, true);
    requestAnimationFrame(() => this.root.classList.add("visible"));

    setTimeout(() => { if (!this.finished) this.skipBtn.classList.add("ready"); }, 800);

    this.safePlay(false);
    this.seen[key] = true;
  }

  safePlay(triedMuted) {
    const p = this.video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        if (this.finished) return;
        if (!triedMuted && !this.video.muted) {
          // Autoplay with sound blocked -> try silent playback, user can unmute
          this.video.muted = true;
          this.muted = true;
          this.muteBtn.textContent = "🔇";
          this.safePlay(true);
        } else {
          // Still blocked: ask for a tap
          this.tapEl.classList.add("show");
        }
      });
    }
  }

  onTime() {
    const v = this.video;
    if (!v.duration) return;
    this.fillEl.style.width = `${(v.currentTime / v.duration) * 100}%`;
    const cfg = CINEMATICS[this.activeKey];
    this.titleEl.classList.toggle("show", v.currentTime >= cfg.titleShow && v.currentTime < cfg.titleHide);
    const caps = cfg.captions;
    let idx = -1;
    for (let i = 0; i < caps.length; i++) {
      if (v.currentTime >= caps[i].t) idx = i;
    }
    if (idx !== this.captionIndex) {
      this.captionIndex = idx;
      this.captionEl.classList.remove("show");
      if (idx >= 0) {
        setTimeout(() => {
          if (this.captionIndex !== idx || this.finished) return;
          this.captionEl.textContent = caps[idx].text;
          this.captionEl.classList.add("show");
        }, 180);
      }
    }
  }

  handleKey(e) {
    if (this.finished) return;
    if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      this.finish(true);
    } else if (e.key === "m" || e.key === "M") {
      this.muteBtn.click();
    }
  }

  duckMusic(on) {
    try {
      if (sound.musicGain && sound.ctx) {
        const g = sound.musicGain.gain;
        g.cancelScheduledValues(sound.ctx.currentTime);
        const restore = (sound.isMuted || sound.isMusicMuted) ? 0 : 0.2;
        g.setTargetAtTime(on ? 0 : restore, sound.ctx.currentTime, 0.25);
      }
    } catch (e) { /* non-fatal */ }
  }

  finish(skipped) {
    if (this.finished) return;
    this.finished = true;
    document.removeEventListener("keydown", this.keyHandler, true);
    try { this.video.pause(); } catch (e) {}
    this.duckMusic(false);
    this.root.classList.remove("visible");
    document.body.classList.remove("cinematic-open");
    const cb = this.onDone;
    this.onDone = null;
    setTimeout(() => {
      if (!this.finished) return; // a new cinematic already started
      this.root.classList.remove("active");
      this.video.removeAttribute("src");
      this.video.load();
    }, 600);
    if (cb) { try { cb(skipped); } catch (e) { console.error(e); } }
  }
}
