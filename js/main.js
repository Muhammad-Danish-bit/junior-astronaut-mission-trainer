// ============================================================================
// JUNIOR ASTRONAUT MISSION TRAINER - MAIN APPLICATION CONTROLLER
// Complete 9-Stage Expedition Simulation Engine & Screen Router
// ============================================================================

import { gameState } from "./state.js";
import { sound } from "./audio.js";
import { phaserEngine } from "./phaserEngine.js";

// Components for All 9 Stages
import { DashboardComponent } from "./components/dashboard.js";
import { RocketSelectComponent } from "./components/rocketSelect.js";
import { ChecklistComponent } from "./components/checklist.js";
import { LaunchFlightComponent } from "./components/launchFlight.js";
import { TransitMissionComponent } from "./components/transitMission.js";
import { LanderComponent } from "./components/lander.js";
import { SurfaceCampComponent } from "./components/surfaceCamp.js";
import { DebriefComponent } from "./components/debrief.js";
import { CinematicPlayer } from "./components/cinematic.js";

// Modals
import { RocketSelectModal } from "./components/rocketSelectModal.js";
import { AstronautPrepModal } from "./components/astronautPrepModal.js";
import { MissionBriefingModal } from "./components/missionBriefingModal.js";
import { AchievementsModal } from "./components/achievementsModal.js";
import { StartMissionModal } from "./components/startMissionModal.js";
import { NasaModal } from "./components/nasaModal.js";
import { GuideModal } from "./components/guideModal.js";
import { GreenhouseModal } from "./components/greenhouseModal.js";
import { ExtractionModal } from "./components/extractionModal.js";

class AppController {
  constructor() {
    this.modalContainer = null;
    this.screenTitle = null;
    this.screenDashboard = null;
    this.screenRocketSelect = null;
    this.screenBoarding = null;
    this.screenLaunch = null;
    this.screenTransit = null;
    this.screenLander = null;
    this.screenSurface = null;
    this.screenDebrief = null;
    this.screenFailed = null;

    // Component instances
    this.dashboardComp = null;
    this.rocketSelectComp = null;
    this.checklistComp = null;
    this.launchFlightComp = null;
    this.transitComp = null;
    this.landerComp = null;
    this.surfaceCampComp = null;
    this.debriefComp = null;

    // Story cinematics (intro + mission-complete outro)
    this.cinematic = null;

    // Modals
    this.rocketModal = null;
    this.astronautModal = null;
    this.briefingModal = null;
    this.achievementsModal = null;
    this.startMissionModal = null;
    this.nasaModal = null;
    this.liveNasaData = { iss: null, solar: null, asteroids: [], mars: [], apod: null };

    this.currentScreen = "title";

    // Trivia ticker
    this.triviaTimer = null;
    this.triviaIndex = 0;
    this.triviaFacts = [
      "Artemis program is humanity's plan to land the first woman and next person of color on the Moon!",
      "NASA's Space Launch System (SLS) generates 39.1 million Newtons (8.8 million lbs) of thrust at liftoff.",
      "The ISS Environmental Control and Life Support System (ECLSS) recycles over 93% of all astronaut water.",
      "Mars has only 38% of Earth's gravity, allowing astronauts to leap nearly 3 times higher!",
      "Europa's subsurface liquid ocean contains more water than all of Earth's oceans combined.",
      "Apollo Quindar beeps were used to trigger ground station audio transmitters between Earth and Moon."
    ];
  }

  init() {
    console.log("Initializing Junior Astronaut Mission Trainer...");

    this.modalContainer = document.getElementById("modal-container");
    this.screenTitle = document.getElementById("screen-title");
    this.screenDashboard = document.getElementById("screen-dashboard");
    this.screenRocketSelect = document.getElementById("screen-rocket-select");
    this.screenBoarding = document.getElementById("screen-boarding");
    this.screenLaunch = document.getElementById("screen-launch");
    this.screenTransit = document.getElementById("screen-transit");
    this.screenLander = document.getElementById("screen-lander");
    this.screenSurface = document.getElementById("screen-surface");
    this.screenDebrief = document.getElementById("screen-debrief");
    this.screenFailed = document.getElementById("screen-failed");

    // 1. Setup Main Menu & Header Events immediately so all buttons respond
    try { this.setupHeaderEvents(); } catch (e) { console.error("Header events error:", e); }
    try { this.setupMainMenuEvents(); } catch (e) { console.error("Menu events error:", e); }

    // 1b. Story cinematics
    try {
      this.cinematic = new CinematicPlayer();
      this.cinematic.preload("intro");
      setTimeout(() => this.cinematic && this.cinematic.preload("outro"), 4000);
    } catch (e) { console.error("Cinematic init error:", e); }

    // 2. Initialize Modals
    try { this.initModals(); } catch (e) { console.error("Modals init error:", e); }

    // 3. Mount Dashboard Component
    try { this.mountDashboard(); } catch (e) { console.error("Dashboard mount error:", e); }

    // 4. Mount Debrief Component (handles both debrief & failed screens)
    if (this.screenDebrief && this.screenFailed) {
      try { this.debriefComp = new DebriefComponent(this.screenDebrief, this.screenFailed); } catch (e) { console.error("Debrief mount error:", e); }
    }

    // 5. Subscribe to Game State changes
    try { this.subscribeState(); } catch (e) { console.error("Subscribe state error:", e); }

    // 6. Start Educational Ticker & Initial HUD
    try { this.startTriviaTicker(); } catch (e) {}
    try { this.updateHud(); } catch (e) {}

    // 7. Initialize Phaser 3 Background Engine (non-blocking)
    try { this.initPhaser(); } catch (e) { console.warn("Phaser engine warning:", e); }

    // 8. Simulate NASA Pre-Flight Loading Screen
    this.runLoadingSequence();

    // 9. Connect Real-Time NASA Live Feeds (ISS, Space Weather, Asteroids, Mars)
    try { this.initNasaLive(); } catch (e) { console.warn("NASA live feeds init error:", e); }

    // Unlock Web Audio on first user interaction anywhere
    document.addEventListener("pointerdown", () => {
      sound.ensureContext();
    }, { once: true });
  }

  initPhaser() {
    try {
      phaserEngine.init("phaser-bg-container");
    } catch (e) {
      console.warn("Phaser initialization error:", e);
    }
  }

  initModals() {
    if (!this.modalContainer) return;

    this.rocketModal = new RocketSelectModal(this.modalContainer);
    this.astronautModal = new AstronautPrepModal(this.modalContainer);
    this.briefingModal = new MissionBriefingModal(this.modalContainer);
    this.achievementsModal = new AchievementsModal(this.modalContainer);
    this.startMissionModal = new StartMissionModal(this.modalContainer);
    this.nasaModal = new NasaModal(this.modalContainer);
    this.guideModal = new GuideModal(this.modalContainer);
    this.greenhouseModal = new GreenhouseModal(this.modalContainer);
    this.extractionModal = new ExtractionModal(this.modalContainer);
    if (typeof window !== "undefined") {
      window.greenhouseModal = this.greenhouseModal;
      window.extractionModal = this.extractionModal;
    }
  }

  mountDashboard() {
    if (!this.screenDashboard) return;

    const modalHandlers = {
      onStartMission: () => {
        this.startMissionModal.open();
      },
      onRocketSelect: () => {
        this.setScreen("rocket_select");
      },
      onAstronautPrep: () => this.astronautModal.open(),
      onMissionBriefing: () => this.briefingModal.open(),
      onAchievements: () => this.achievementsModal.open()
    };

    this.dashboardComp = new DashboardComponent(this.screenDashboard, modalHandlers);
  }

  subscribeState() {
    gameState.subscribe((state, event, payload) => {
      if (event === "screen_changed") {
        if (payload !== this.currentScreen) {
          this.setScreen(payload);
        }
      }
      this.updateHud();
    });
  }

  setScreen(screenName) {
    console.log(`[App] Transitioning screen from "${this.currentScreen}" to "${screenName}"`);

    // 1. Clean up outgoing animated screens
    if (this.currentScreen === "launch" && this.launchFlightComp) {
      this.launchFlightComp.cleanup();
      this.launchFlightComp = null;
    }
    if (this.currentScreen === "transit" && this.transitComp) {
      this.transitComp.cleanup();
      this.transitComp = null;
    }
    if (this.currentScreen === "lander" && this.landerComp) {
      this.landerComp.cleanup();
      this.landerComp = null;
    }
    if (this.currentScreen === "surface" && this.surfaceCampComp) {
      this.surfaceCampComp.cleanup();
      this.surfaceCampComp = null;
    }

    this.currentScreen = screenName;

    // 2. Sync state router and DOM visibility
    if (gameState.state.screen !== screenName) {
      gameState.setScreen(screenName);
    } else {
      const screens = document.querySelectorAll(".screen-container");
      screens.forEach(s => s.classList.remove("active"));
      const targetScreen = document.getElementById(`screen-${screenName}`) ||
                           document.getElementById(`screen-${screenName.replace(/_/g, "-")}`);
      if (targetScreen) targetScreen.classList.add("active");
    }

    // 3. Mount or refresh target screen component
    switch (screenName) {
      case "title":
        phaserEngine.resetZoom();
        break;

      case "dashboard":
        phaserEngine.resetZoom();
        if (!this.dashboardComp) {
          this.mountDashboard();
        } else {
          this.dashboardComp.updateView();
        }
        break;

      case "rocket_select":
        phaserEngine.resetZoom();
        if (!this.rocketSelectComp && this.screenRocketSelect) {
          this.rocketSelectComp = new RocketSelectComponent(this.screenRocketSelect);
        } else if (this.rocketSelectComp) {
          this.rocketSelectComp.updateView();
        }
        break;

      case "boarding":
        phaserEngine.resetZoom();
        if (!this.checklistComp && this.screenBoarding) {
          this.checklistComp = new ChecklistComponent(this.screenBoarding);
        } else if (this.checklistComp) {
          this.checklistComp.updateView();
        }
        break;

      case "launch":
        // Instantiate fresh LaunchFlightComponent for clean countdown and proper canvas dimensions
        if (this.screenLaunch) {
          this.launchFlightComp = new LaunchFlightComponent(this.screenLaunch);
        }
        break;

      case "transit":
        phaserEngine.resetZoom();
        if (this.screenTransit) {
          this.transitComp = new TransitMissionComponent(this.screenTransit);
        }
        break;

      case "lander":
        // Instantiate fresh LanderComponent for destination gravity and proper canvas dimensions
        if (this.screenLander) {
          this.landerComp = new LanderComponent(this.screenLander);
        }
        break;

      case "surface":
        // Instantiate fresh SurfaceCampComponent for walking astronaut and base modules
        if (this.screenSurface) {
          this.surfaceCampComp = new SurfaceCampComponent(this.screenSurface);
        }
        break;

      case "debrief":
        // Mission-complete cinematic plays over the report card, then fades away to reveal it
        if (this.cinematic) this.cinematic.play("outro");
        if (!this.debriefComp && this.screenDebrief && this.screenFailed) {
          this.debriefComp = new DebriefComponent(this.screenDebrief, this.screenFailed);
        } else if (this.debriefComp) {
          this.debriefComp.renderDebrief();
        }
        break;

      case "failed":
        if (!this.debriefComp && this.screenDebrief && this.screenFailed) {
          this.debriefComp = new DebriefComponent(this.screenDebrief, this.screenFailed);
        } else if (this.debriefComp) {
          this.debriefComp.renderFailed();
        }
        break;
    }

    this.updateHud();
  }

  updateHud() {
    const rankEl = document.getElementById("hud-rank");
    const scoreEl = document.querySelector("#hud-score .score-val");
    if (rankEl) {
      const r = gameState.getRank();
      const a = gameState.getSelectedAstronaut();
      rankEl.innerHTML = `
        <span class="badge-icon">${r.icon}</span>
        <span class="badge-name">${r.name} ${a ? a.name : 'Cadet'}</span>
      `;
    }
    if (scoreEl) {
      scoreEl.textContent = gameState.state.score;
    }
  }

  setupHeaderEvents() {
    const btnMenu = document.getElementById("btn-header-menu");
    const btnDash = document.getElementById("btn-header-dashboard");
    const btnHangar = document.getElementById("btn-header-hangar");
    const logoBtn = document.getElementById("header-logo");
    const soundBtn = document.getElementById("btn-toggle-sound");
    const musicBtn = document.getElementById("btn-toggle-music");
    const quindarBtn = document.getElementById("btn-quindar-test");

    if (btnMenu) {
      btnMenu.addEventListener("click", () => {
        sound.playClick();
        this.setScreen("title");
      });
    }

    if (btnDash) {
      btnDash.addEventListener("click", () => {
        sound.playClick();
        this.setScreen("dashboard");
      });
    }

    if (btnHangar) {
      btnHangar.addEventListener("click", () => {
        sound.playClick();
        this.setScreen("rocket_select");
      });
    }

    const btnNasa = document.getElementById("btn-header-nasa");
    if (btnNasa) {
      btnNasa.addEventListener("click", () => {
        sound.playClick();
        if (this.nasaModal) {
          this.nasaModal.open();
        }
      });
    }

    const btnGuide = document.getElementById("btn-header-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        if (this.guideModal) {
          this.guideModal.open();
        }
      });
    }

    if (logoBtn) {
      logoBtn.addEventListener("click", () => {
        sound.playClick();
        this.setScreen("title");
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        sound.ensureContext();
        const isMuted = sound.toggleMute();
        soundBtn.textContent = isMuted ? "🔇" : "🔊";
      });
    }

    if (musicBtn) {
      musicBtn.addEventListener("click", () => {
        sound.ensureContext();
        sound.isMusicMuted = !sound.isMusicMuted;
        if (sound.musicGain && sound.ctx) {
          sound.musicGain.gain.setValueAtTime(sound.isMusicMuted ? 0 : 0.2, sound.ctx.currentTime);
        }
        musicBtn.textContent = sound.isMusicMuted ? "🔈" : "🎵";
      });
    }

    if (quindarBtn) {
      quindarBtn.addEventListener("click", () => {
        sound.ensureContext();
        sound.playQuindarBeep();
      });
    }
  }

  setupMainMenuEvents() {
    const btnTitleStart = document.getElementById("btn-title-start-mission");
    const btnTitleDash = document.getElementById("btn-title-open-dashboard");

    const btnTitleRocket = document.getElementById("btn-title-rocket");
    const btnTitleAstronaut = document.getElementById("btn-title-astronaut");
    const btnTitleBriefing = document.getElementById("btn-title-briefing");
    const btnTitleAchievements = document.getElementById("btn-title-achievements");
    const btnTitleGuide = document.getElementById("btn-title-guide");

    const pillMoon = document.getElementById("pill-title-moon");
    const pillMars = document.getElementById("pill-title-mars");
    const pillEuropa = document.getElementById("pill-title-europa");

    // Stage 1: Start Mission -> intro cinematic (first time per session) -> mission briefing.
    if (btnTitleStart) {
      btnTitleStart.addEventListener("click", () => {
        sound.ensureContext();
        sound.playSuccessChime();
        this.playIntroThen(() => this.briefingModal.open());
      });
    }

    const btnTitleIntro = document.getElementById("btn-title-intro");
    if (btnTitleIntro) {
      btnTitleIntro.addEventListener("click", () => {
        sound.ensureContext();
        sound.playClick();
        if (this.cinematic) this.cinematic.play("intro");
      });
    }

    if (btnTitleDash) {
      btnTitleDash.addEventListener("click", () => {
        sound.ensureContext();
        sound.playClick();
        this.setScreen("dashboard");
      });
    }

    if (btnTitleRocket) {
      btnTitleRocket.addEventListener("click", () => {
        sound.ensureContext();
        sound.playClick();
        this.setScreen("rocket_select");
      });
    }

    if (btnTitleAstronaut) {
      btnTitleAstronaut.addEventListener("click", () => {
        sound.ensureContext();
        this.astronautModal.open();
      });
    }

    if (btnTitleBriefing) {
      btnTitleBriefing.addEventListener("click", () => {
        sound.ensureContext();
        this.briefingModal.open();
      });
    }

    if (btnTitleAchievements) {
      btnTitleAchievements.addEventListener("click", () => {
        sound.ensureContext();
        this.achievementsModal.open();
      });
    }

    if (btnTitleGuide) {
      btnTitleGuide.addEventListener("click", () => {
        sound.ensureContext();
        this.guideModal.open();
      });
    }

    if (pillMoon) {
      pillMoon.addEventListener("click", () => {
        sound.ensureContext();
        gameState.selectDestination("moon");
        this.briefingModal.open();
      });
    }

    if (pillMars) {
      pillMars.addEventListener("click", () => {
        sound.ensureContext();
        gameState.selectDestination("mars");
        this.briefingModal.open();
      });
    }

    if (pillEuropa) {
      pillEuropa.addEventListener("click", () => {
        sound.ensureContext();
        gameState.selectDestination("europa");
        this.briefingModal.open();
      });
    }
  }

  // Plays the intro once per session; afterwards (or on failure) goes straight to the callback.
  playIntroThen(next) {
    if (this.cinematic && !this.cinematic.seen.intro) {
      this.cinematic.play("intro", () => next());
    } else {
      next();
    }
  }

  runLoadingSequence() {
    const loader = document.getElementById("app-loader");
    const fill = document.getElementById("loader-progress-fill");
    const status = document.getElementById("loader-status-text");
    if (!loader || !fill) return;

    const steps = [
      { pct: 25, text: "Calibrating Life Support ECLSS Vitals..." },
      { pct: 55, text: "Aligning Inertial Star Trackers & Earth Orbit..." },
      { pct: 85, text: "Connecting Houston Deep Space Network..." },
      { pct: 100, text: "All Systems Nominal. Ready for Mission!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const s = steps[currentStep];
        fill.style.width = `${s.pct}%`;
        if (status) status.textContent = s.text;
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("hidden");
          setTimeout(() => { loader.style.display = "none"; }, 500);
        }, 200);
      }
    }, 120);

    // Click anywhere on loader to dismiss immediately
    loader.addEventListener("click", () => {
      clearInterval(interval);
      loader.classList.add("hidden");
      setTimeout(() => { loader.style.display = "none"; }, 500);
    });

    // Safety fallback auto-dismiss after 1.8 seconds max
    setTimeout(() => {
      if (loader && !loader.classList.contains("hidden")) {
        clearInterval(interval);
        loader.classList.add("hidden");
        setTimeout(() => { loader.style.display = "none"; }, 500);
      }
    }, 1800);
  }

  startTriviaTicker() {
    const tickerText = document.getElementById("live-ticker-text");
    if (!tickerText) return;

    this.triviaTimer = setInterval(() => {
      this.triviaIndex = (this.triviaIndex + 1) % this.triviaFacts.length;
      tickerText.style.opacity = "0";
      setTimeout(() => {
        tickerText.textContent = this.triviaFacts[this.triviaIndex];
        tickerText.style.opacity = "1";
      }, 300);
    }, 6000);
  }

  initNasaLive() {
    if (typeof NasaLive === "undefined") {
      console.warn("NasaLive library not available");
      return;
    }

    NasaLive.init({
      apiKey: "DEMO_KEY",
      onISS: (pos) => {
        if (!pos) return;
        this.liveNasaData.iss = pos;
        if (this.nasaModal) this.nasaModal.updateData("iss", pos);

        const latH = pos.lat >= 0 ? "N" : "S";
        const lonH = pos.lon >= 0 ? "E" : "W";
        this.triviaFacts[0] = `🛰️ ISS LIVE ORBIT: ${Math.abs(pos.lat).toFixed(1)}°${latH}, ${Math.abs(pos.lon).toFixed(1)}°${lonH} • Alt ${Math.round(pos.altitudeKm)} km • Speed ${Math.round(pos.speedKmh).toLocaleString()} km/h`;
      },

      onSolarStorm: (info) => {
        if (!info) return;
        this.liveNasaData.solar = info;
        if (this.nasaModal) this.nasaModal.updateData("solar", info);

        if (info.active) {
          gameState.addWarningLog(`⚠️ NASA DONKI ALERT: Class ${info.strongest} Solar Flare detected! Space weather warning active.`);
          this.triviaFacts.push(`☀️ NASA DONKI: Active Class ${info.strongest} Solar Storm in progress!`);
        }
      },

      onAsteroids: (list) => {
        if (!list || !list.length) return;
        this.liveNasaData.asteroids = list;
        if (this.nasaModal) this.nasaModal.updateData("asteroids", list);

        const closest = list[0];
        if (closest) {
          this.triviaFacts.push(`☄️ NASA NeoWs: Asteroid ${closest.name} passes Earth today at ${closest.missKm.toLocaleString()} km.`);
        }
      },

      onMarsPhotos: (photos) => {
        if (!photos || !photos.length) return;
        this.liveNasaData.mars = photos;
        if (this.nasaModal) this.nasaModal.updateData("mars", photos);
      },

      onAPOD: (apod) => {
        if (!apod) return;
        this.liveNasaData.apod = apod;
        if (this.nasaModal) this.nasaModal.updateData("apod", apod);
        if (apod.title) {
          this.triviaFacts.push(`🌌 NASA Picture of the Day: ${apod.title}`);
        }
      }
    });
  }
}

// Auto-boot on DOM ready or immediate if DOM has already parsed
function bootApp() {
  if (window.__trainerApp) return;
  console.log("Booting Junior Astronaut Mission Trainer...");
  const app = new AppController();
  app.init();
  window.__trainerApp = app;
  window.juniorTrainerApp = app;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}
