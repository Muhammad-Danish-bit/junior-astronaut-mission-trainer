// ============================================================================
// GAME STATE MANAGER FOR JUNIOR ASTRONAUT MISSION TRAINER
// Central Reactive State: 8 Vitals, Screen Router, Objectives, Camp & Unlocks
// ============================================================================

import { GAME_CONFIG } from "./config.js";

class GameStateManager {
  constructor() {
    this.listeners = new Set();
    this.survivalInterval = null;
    this.clockInterval = null;
    this.isPaused = false;
    this.activeActivity = null; // 'walking', 'digging', 'repairing', 'driving'
    this.activeHazard = null;
    this.isAstronautInsideHabitat = false;

    // Full Game State
    this.state = {
      // Screen Router ('title', 'dashboard', 'rocket_select', 'boarding', 'launch', 'lander', 'surface', 'debrief', 'failed')
      screen: "title",

      // Progression & Scoring
      score: 0,
      levelScore: 0,
      unlockedDestinations: ["moon"],
      unlockedRockets: ["small", "sls"],
      difficulty: "cadet",

      // Selections
      selectedRocket: "small",
      selectedAstronaut: "alex",
      selectedDestination: "moon",
      selectedCargo: ["extra_o2", "repair_kit"],

      // 8 Primary Telemetry Metrics (0 - 100)
      telemetry: {
        oxygen: 95,
        food: 90,
        water: 88,
        power: 92,
        rocketFuel: 85,
        cargoCapacity: 74,
        astronautHealth: 98,
        missionDuration: 14,
        temperature: 21,    // °C
        radiation: 0.1,     // mSv/hr
        suitIntegrity: 100, // %
        crewStress: 10,     // %
        altitudeKm: 0,
        fuel: 85
      },

      // Loaded supply reserves configured in hangar
      loadedSupplies: {
        fuel: 85,
        oxygen: 95,
        food: 90,
        water: 88,
        power: 92
      },

      // Mission Readiness (0 - 100%)
      missionReadiness: 0,
      readinessStatus: "GO FOR LAUNCH",

      // Pre-Launch Pad 39B Checklist
      checklist: {
        astronautBoarded: false,
        nav_gyro: false,
        comms: false,
        life_support: false,
        engine_seal: false
      },

      // Level Mission Objectives & Surface Camp
      levelObjectives: [],
      missionTimeLeftSec: 240,
      campPlacedModules: [],
      collectedSamples: [],
      roverMounted: false,

      // Alerts & Logs
      activeCrisis: null,
      warningLogs: [],
      activeModal: null,

      // Achievements
      achievements: JSON.parse(JSON.stringify(GAME_CONFIG.ACHIEVEMENTS)),

      // MET Mission Elapsed Time & DSN Signal
      metSeconds: 0,
      dsnSignalStrength: 98
    };

    this.loadFromStorage();
    this.loadObjectivesForDestination(this.state.selectedDestination);
    this.calculateReadiness();
    this.startClock();
  }

  // Subscribe to state updates
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event = "update", data = null) {
    this.listeners.forEach(cb => {
      try {
        cb(this.state, event, data);
      } catch (err) {
        console.error("State listener error:", err);
      }
    });
  }

  // Screen Routing Method
  setScreen(screenName) {
    this.state.screen = screenName;
    console.log(`[Router] Screen transitioned to: ${screenName}`);

    // Manage survival lifecycle
    if (screenName === "surface") {
      this.startSurvivalLoop();
    } else {
      this.stopSurvivalLoop();
    }

    // Switch visible screen container in DOM
    const screens = document.querySelectorAll(".screen-container");
    screens.forEach(s => s.classList.remove("active"));

    const targetScreen = document.getElementById(`screen-${screenName}`) ||
                         document.getElementById(`screen-${screenName.replace(/_/g, "-")}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
    }

    this.notify("screen_changed", screenName);
  }

  // Rank Progression
  getRank() {
    const s = this.state.score;
    let currentRank = GAME_CONFIG.RANKS[0];
    for (const r of GAME_CONFIG.RANKS) {
      if (s >= r.threshold) currentRank = r;
    }
    return {
      ...currentRank,
      name: currentRank.title || "Cadet",
      icon: currentRank.badge || "🌱"
    };
  }

  // Pre-Flight Checklist Logic
  isChecklistComplete() {
    const c = this.state.checklist;
    return !!(c.astronautBoarded && c.nav_gyro && c.comms && c.life_support && c.engine_seal);
  }

  setChecklistItem(key, val) {
    if (this.state.checklist[key] !== undefined) {
      this.state.checklist[key] = !!val;
      this.calculateReadiness();
      this.notify("checklist_updated", { key, value: val });
    }
  }

  resetChecklist() {
    this.state.checklist = {
      astronautBoarded: false,
      nav_gyro: false,
      comms: false,
      life_support: false,
      engine_seal: false
    };
    this.notify("checklist_reset");
  }

  // Calculate dynamic Mission Readiness Percentage
  calculateReadiness() {
    const t = this.state.telemetry;

    const o2Score = Math.min(100, Math.max(0, t.oxygen));
    const waterScore = Math.min(100, Math.max(0, t.water));
    const foodScore = Math.min(100, Math.max(0, t.food));
    const powerScore = Math.min(100, Math.max(0, t.power));
    const fuelScore = Math.min(100, Math.max(0, t.rocketFuel));
    const healthScore = Math.min(100, Math.max(0, t.astronautHealth));

    let cargoScore = 100;
    if (t.cargoCapacity > 95) cargoScore = 30;
    else if (t.cargoCapacity > 90) cargoScore = 65;
    else if (t.cargoCapacity < 40) cargoScore = 80;

    let durationMultiplier = 1.0;
    if (t.missionDuration > 100 && (t.food < 70 || t.water < 70)) {
      durationMultiplier = 0.85;
    }

    const rawReadiness = (
      (o2Score * 0.18) +
      (waterScore * 0.14) +
      (foodScore * 0.12) +
      (powerScore * 0.16) +
      (fuelScore * 0.18) +
      (healthScore * 0.14) +
      (cargoScore * 0.08)
    ) * durationMultiplier;

    const finalReadiness = Math.round(Math.min(100, Math.max(0, rawReadiness)));
    this.state.missionReadiness = finalReadiness;

    if (finalReadiness >= 80) {
      this.state.readinessStatus = "GO FOR LAUNCH";
    } else if (finalReadiness >= 50) {
      this.state.readinessStatus = "HOLD COUNTDOWN";
    } else {
      this.state.readinessStatus = "CRITICAL DEFICIT";
    }

    this.checkAchievements();
    return finalReadiness;
  }

  getMetricStatus(metricKey) {
    const val = this.state.telemetry[metricKey];
    const spec = GAME_CONFIG.METRICS[metricKey];
    if (!spec) return "nominal";

    if (metricKey === "cargoCapacity") {
      if (val >= spec.criticalThreshold) return "critical";
      if (val >= spec.cautionThreshold) return "caution";
      return "nominal";
    }

    if (metricKey === "missionDuration") {
      if (val >= spec.criticalThreshold) return "caution";
      return "nominal";
    }

    if (val <= spec.criticalThreshold) return "critical";
    if (val <= spec.cautionThreshold) return "caution";
    return "nominal";
  }

  setMetric(key, val) {
    if (this.state.telemetry[key] === undefined) return;
    const spec = GAME_CONFIG.METRICS[key];
    const maxVal = spec ? spec.max : 100;
    const minVal = spec ? spec.min : 0;

    this.state.telemetry[key] = Math.max(minVal, Math.min(maxVal, Math.round(val)));
    if (key === "rocketFuel") this.state.telemetry.fuel = this.state.telemetry[key];
    this.calculateReadiness();
    this.notify("telemetry_change", { key, value: this.state.telemetry[key] });
  }

  adjustMetric(key, delta) {
    if (this.state.telemetry[key] === undefined) return;
    this.setMetric(key, this.state.telemetry[key] + delta);
  }

  setSupplyValue(supplyKey, val) {
    if (this.state.loadedSupplies[supplyKey] !== undefined) {
      this.state.loadedSupplies[supplyKey] = Math.max(10, Math.min(150, Math.round(val)));
      if (this.state.telemetry[supplyKey] !== undefined) {
        this.state.telemetry[supplyKey] = Math.min(100, this.state.loadedSupplies[supplyKey]);
      }
      if (supplyKey === "fuel") {
        this.state.telemetry.rocketFuel = Math.min(100, this.state.loadedSupplies.fuel);
        this.state.telemetry.fuel = this.state.telemetry.rocketFuel;
      }
      this.calculateReadiness();
      this.notify("supplies_changed", { key: supplyKey, value: val });
    }
  }

  // Selections
  selectRocket(rocketId) {
    const r = GAME_CONFIG.ROCKETS[rocketId] || GAME_CONFIG.ROCKETS.small;
    this.state.selectedRocket = rocketId;
    this.state.telemetry.rocketFuel = r.fuelCapacity || 85;
    this.state.telemetry.fuel = this.state.telemetry.rocketFuel;
    this.state.telemetry.cargoCapacity = r.cargoCapacity || 75;
    this.state.telemetry.power = Math.min(100, Math.max(60, r.powerOutput || 90));

    this.calculateReadiness();
    this.unlockAchievement("heavy_lifter");
    this.notify("rocket_selected", r);
  }

  selectAstronaut(astronautId) {
    const a = GAME_CONFIG.ASTRONAUTS[astronautId] || GAME_CONFIG.ASTRONAUTS.alex;
    this.state.selectedAstronaut = astronautId;
    this.state.telemetry.astronautHealth = Math.min(100, 90 + (a.healthBonus || 5));
    this.state.telemetry.oxygen = Math.min(100, 90 + (a.oxygenBonus || 5));

    this.calculateReadiness();
    this.notify("astronaut_selected", a);
  }

  selectDestination(destId) {
    const d = GAME_CONFIG.DESTINATIONS[destId] || GAME_CONFIG.DESTINATIONS.moon;
    this.state.selectedDestination = destId;
    this.state.telemetry.missionDuration = d.defaultDuration || 14;
    this.state.missionTimeLeftSec = d.missionTimeLimitSec || 240;

    this.loadObjectivesForDestination(destId);
    this.calculateReadiness();
    this.notify("destination_selected", d);
  }

  getSelectedAstronaut() {
    return GAME_CONFIG.ASTRONAUTS[this.state.selectedAstronaut] || GAME_CONFIG.ASTRONAUTS.alex;
  }

  getSelectedRocket() {
    return GAME_CONFIG.ROCKETS[this.state.selectedRocket] || GAME_CONFIG.ROCKETS.small;
  }

  getSelectedDestination() {
    return GAME_CONFIG.DESTINATIONS[this.state.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;
  }

  loadObjectivesForDestination(destId) {
    const dest = GAME_CONFIG.DESTINATIONS[destId] || GAME_CONFIG.DESTINATIONS.moon;
    this.state.levelObjectives = JSON.parse(JSON.stringify(dest.objectives || []));
    this.state.campPlacedModules = [];
    this.state.collectedSamples = [];
  }

  toggleCargoItem(itemId) {
    const currentRocket = GAME_CONFIG.ROCKETS[this.state.selectedRocket] || GAME_CONFIG.ROCKETS.small;
    const maxSlots = currentRocket.maxCargoSlots || 2;
    const idx = this.state.selectedCargo.indexOf(itemId);

    if (idx !== -1) {
      this.state.selectedCargo.splice(idx, 1);
    } else {
      if (this.state.selectedCargo.length < maxSlots) {
        this.state.selectedCargo.push(itemId);
      }
    }
    this.notify("cargo_changed", this.state.selectedCargo);
  }

  setMissionDuration(days) {
    const parsed = Math.max(3, Math.min(180, parseInt(days, 10) || 14));
    this.state.telemetry.missionDuration = parsed;
    if (parsed >= 90) this.unlockAchievement("voyager_plan");
    this.calculateReadiness();
    this.notify("duration_changed", parsed);
  }

  // Flight Telemetry Init
  initializeMissionTelemetry() {
    const ls = this.state.loadedSupplies;
    this.state.telemetry.oxygen = Math.min(100, ls.oxygen);
    this.state.telemetry.water = Math.min(100, ls.water);
    this.state.telemetry.food = Math.min(100, ls.food);
    this.state.telemetry.power = Math.min(100, ls.power);
    this.state.telemetry.fuel = Math.min(100, ls.fuel);
    this.state.telemetry.rocketFuel = this.state.telemetry.fuel;
    this.state.telemetry.temperature = 21;
    this.state.telemetry.radiation = 0.1;
    this.state.telemetry.suitIntegrity = 100;
    this.state.telemetry.crewHealth = 100;
    this.state.telemetry.crewStress = 10;
    this.notify("telemetry_initialized");
  }

  // Objectives & Camp Management
  progressObjective(objectiveId, amount = 1) {
    const obj = this.state.levelObjectives.find(o => o.id === objectiveId);
    if (!obj) return false;

    obj.currentCount = Math.min(obj.targetCount, obj.currentCount + amount);
    if (obj.currentCount >= obj.targetCount && !obj.completed) {
      obj.completed = true;
      this.addScore(obj.points || 150);
      this.notify("objective_completed", obj);
    }
    this.notify("objective_progressed", obj);
    return obj.completed;
  }

  areAllObjectivesComplete() {
    if (!this.state.levelObjectives || this.state.levelObjectives.length === 0) return true;
    return this.state.levelObjectives.every(o => o.completed);
  }

  placeCampModule(siteId, moduleId) {
    const mod = GAME_CONFIG.BASE_MODULES[moduleId];
    if (!mod) return false;

    if (!this.state.campPlacedModules.includes(moduleId)) {
      this.state.campPlacedModules.push(moduleId);
      this.addScore(100);

      // Check objective completion
      if (moduleId === "hab_dome") this.progressObjective("mars_habitat");
      if (moduleId === "solar_array") this.progressObjective("moon_solar");
      if (moduleId === "sabatier_o2") this.progressObjective("mars_moxie");
      if (moduleId === "ice_miner") this.progressObjective("mars_ice");
      if (moduleId === "greenhouse") this.progressObjective("mars_greenhouse");
      if (moduleId === "comms_dish") this.progressObjective("europa_uplink");

      this.notify("camp_module_placed", { siteId, module: mod });
      return true;
    }
    return false;
  }

  spendSupplies(costs = {}) {
    const t = this.state.telemetry;
    if (costs.power) t.power = Math.max(0, t.power - costs.power);
    if (costs.oxygen) t.oxygen = Math.max(0, t.oxygen - costs.oxygen);
    if (costs.water) t.water = Math.max(0, t.water - costs.water);
    if (costs.suitIntegrity) t.suitIntegrity = Math.max(0, t.suitIntegrity - costs.suitIntegrity);
    this.notify("supplies_spent", costs);
  }

  refillResources(key, amount) {
    if (this.state.telemetry[key] !== undefined) {
      this.state.telemetry[key] = Math.min(100, this.state.telemetry[key] + amount);
      this.notify("resource_refilled", { key, amount });
    }
  }

  // Scoring, XP & Unlocks
  addScore(points) {
    const diff = GAME_CONFIG.DIFFICULTY[this.state.difficulty] || GAME_CONFIG.DIFFICULTY.cadet;
    const finalPoints = Math.round(points * (diff.scoreMultiplier || 1.0));
    this.state.score += finalPoints;
    this.state.levelScore += finalPoints;

    this.evaluateUnlocks();
    this.saveToStorage();
    this.notify("score_updated", { added: finalPoints, total: this.state.score });
  }

  evaluateUnlocks() {
    const s = this.state.score;
    let changed = false;

    if (s >= 400 && !this.state.unlockedDestinations.includes("mars")) {
      this.state.unlockedDestinations.push("mars");
      changed = true;
    }
    if (s >= 1200 && !this.state.unlockedDestinations.includes("europa")) {
      this.state.unlockedDestinations.push("europa");
      changed = true;
    }
    if (s >= 300 && !this.state.unlockedRockets.includes("medium")) {
      this.state.unlockedRockets.push("medium");
      this.state.unlockedRockets.push("falcon_heavy");
      changed = true;
    }
    if (s >= 900 && !this.state.unlockedRockets.includes("heavy")) {
      this.state.unlockedRockets.push("heavy");
      this.state.unlockedRockets.push("saturn_v");
      this.state.unlockedRockets.push("starship");
      changed = true;
    }

    if (changed) {
      this.notify("unlocks_changed", {
        destinations: this.state.unlockedDestinations,
        rockets: this.state.unlockedRockets
      });
    }
  }

  // Surface Survival Loop
  startSurvivalLoop() {
    this.stopSurvivalLoop();
    const intervalMs = GAME_CONFIG.SURVIVAL.TICK_INTERVAL_MS || 1000;

    this.survivalInterval = setInterval(() => {
      if (this.state.screen !== "surface" || this.isPaused) return;

      const t = this.state.telemetry;
      const drain = GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN;
      const isSheltered = this.isAstronautInsideHabitat;

      // Decrement objective countdown
      if (this.state.missionTimeLeftSec > 0) {
        this.state.missionTimeLeftSec--;
      }

      // Check shelter modules active production
      let netO2 = isSheltered ? 0.2 : -drain.oxygen;
      let netWater = -drain.water;
      let netFood = -drain.food;
      let netPower = -drain.power;

      this.state.campPlacedModules.forEach(modId => {
        const m = GAME_CONFIG.BASE_MODULES[modId];
        if (m) {
          netPower -= m.powerDraw; // negative powerDraw generates power!
          netO2 += m.o2Gen || 0;
          netWater += m.waterGen || 0;
          netFood += m.foodGen || 0;
        }
      });

      // Apply net changes
      t.oxygen = Math.max(0, Math.min(100, t.oxygen + netO2));
      t.water = Math.max(0, Math.min(100, t.water + netWater));
      t.food = Math.max(0, Math.min(100, t.food + netFood));
      t.power = Math.max(0, Math.min(100, t.power + netPower));

      // Thermal loops: If power < 15%, cabin heater dies and temp drops toward freezing
      if (t.power < 15 && !isSheltered) {
        t.temperature = Math.max(-120, t.temperature - GAME_CONFIG.SURVIVAL.THERMAL.CHILL_RATE_NO_POWER);
      } else if (isSheltered) {
        t.temperature = Math.min(22, t.temperature + GAME_CONFIG.SURVIVAL.THERMAL.WARM_RATE_IN_HABITAT);
      }

      // Radiation loops: Inside habitat shields 95%
      const dest = GAME_CONFIG.DESTINATIONS[this.state.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;
      t.radiation = isSheltered ? (dest.radiationLevel * 0.05) : dest.radiationLevel;

      // Health impact when vitals run dry
      if (t.oxygen <= 0 || t.water <= 0 || t.temperature <= 0 || t.suitIntegrity <= 0) {
        t.crewHealth = Math.max(0, t.crewHealth - 3.5);
      } else if (isSheltered && t.crewHealth < 100) {
        t.crewHealth = Math.min(100, t.crewHealth + 1.0); // heal inside habitat
      }

      // Mission Failure Condition: Crew health reaches 0%
      if (t.crewHealth <= 0) {
        this.setScreen("failed");
        this.notify("mission_failed", { reason: "Crew Vitals Depleted. Life support critical." });
      }

      this.notify("survival_tick", t);
    }, intervalMs);
  }

  stopSurvivalLoop() {
    if (this.survivalInterval) {
      clearInterval(this.survivalInterval);
      this.survivalInterval = null;
    }
  }

  failMission(payload = {}) {
    this.stopSurvivalLoop();

    // Calculate survival statistics
    const met = this.state.metSeconds || 0;
    const hours = Math.floor(met / 3600);
    const mins = Math.floor((met % 3600) / 60);
    const secs = met % 60;
    const simDaysSurvived = Math.max(1, Math.round(met / 30));

    const diffKey = this.state.difficulty || "cadet";
    const diff = GAME_CONFIG.DIFFICULTY[diffKey] || GAME_CONFIG.DIFFICULTY.cadet;

    const report = {
      cause: payload.cause || "Critical Life Support Depletion",
      tip: payload.tip || "Maintain power to keep heaters and oxygen scrubbers active.",
      causalityList: payload.causalityList || ["Critical resource exhaustion during mission operations"],
      daysSurvived: payload.daysSurvived || simDaysSurvived,
      metSeconds: met,
      metFormatted: `${hours}h ${mins}m ${secs}s`,
      difficulty: diff,
      scoreAtCasualty: this.state.score,
      telemetrySnapshot: { ...this.state.telemetry }
    };

    this.state.lastCasualtyReport = report;
    this.setScreen("failed");
    this.notify("mission_failed", report);
  }

  // Strict Permadeath: Zero reset wiping all score, rank, inventory, and progress
  resetGameToZero() {
    this.stopSurvivalLoop();
    try {
      localStorage.removeItem(GAME_CONFIG.SAVE_KEY);
    } catch (e) {}

    this.state.score = 0;
    this.state.rankIndex = 0;
    this.state.currentRank = GAME_CONFIG.RANKS[0];
    this.state.selectedDestination = "moon";
    this.state.unlockedDestinations = ["moon"];
    this.state.selectedRocket = "sls_artemis";
    this.state.unlockedRockets = ["sls_artemis"];
    this.state.campPlacedModules = [];
    this.state.collectedSamples = [];
    this.state.roverMounted = false;
    this.state.warningLogs = [];
    this.state.activeCrisis = null;
    this.state.metSeconds = 0;
    this.state.missionTimeLeftSec = 240;
    this.state.checklist = {
      astronautBoarded: false,
      nav_gyro: false,
      comms: false,
      life_support: false,
      engine_seal: false
    };
    this.state.achievements = JSON.parse(JSON.stringify(GAME_CONFIG.ACHIEVEMENTS));
    this.state.lastCasualtyReport = null;

    this.initializeMissionTelemetry();
    this.loadObjectivesForDestination("moon");
    this.calculateReadiness();
    this.saveToStorage();

    this.notify("score_updated", 0);
    this.notify("rank_promoted", this.state.currentRank);
    this.notify("telemetry_updated", this.state.telemetry);
    this.notify("supplies_updated", this.state.loadedSupplies);
    this.notify("objectives_updated", this.state.levelObjectives);

    this.setScreen("title");
  }

  // Crisis Simulators
  simulateCrisis(type) {
    this.state.activeCrisis = type;
    switch (type) {
      case "fuel_leak":
        this.state.telemetry.rocketFuel = 24;
        this.state.telemetry.fuel = 24;
        this.addWarningLog("CRITICAL: Micro-fracture detected in Stage-2 Propellant Manifold (-61% Fuel)!");
        break;
      case "o2_scrubber":
        this.state.telemetry.oxygen = 18;
        this.addWarningLog("ALERT: Sabatier CO2 Scrubber loop flow restricted (-77% Oxygen)!");
        break;
      case "solar_flare":
        this.state.telemetry.power = 22;
        this.state.telemetry.astronautHealth = 65;
        this.addWarningLog("WARNING: Class-M Solar Particle Event caused power breaker trip (-70% Power)!");
        break;
      case "cargo_overload":
        this.state.telemetry.cargoCapacity = 98;
        this.addWarningLog("CAUTION: Payload mass exceeds recommended max structural limit (98% Capacity)!");
        break;
    }
    this.calculateReadiness();
    this.notify("crisis_triggered", type);
  }

  restoreNominal() {
    this.state.telemetry.oxygen = 95;
    this.state.telemetry.food = 90;
    this.state.telemetry.water = 88;
    this.state.telemetry.power = 92;
    this.state.telemetry.rocketFuel = 85;
    this.state.telemetry.fuel = 85;
    this.state.telemetry.cargoCapacity = 74;
    this.state.telemetry.astronautHealth = 98;
    this.state.telemetry.missionDuration = 14;

    if (this.state.activeCrisis) {
      this.unlockAchievement("crisis_commander");
      this.state.activeCrisis = null;
    }

    this.addWarningLog("NOMINAL: All ECLSS life support loops and propellants re-stabilized to 100%.");
    this.calculateReadiness();
    this.notify("telemetry_restored");
  }

  addWarningLog(message) {
    const timestamp = new Date().toISOString().substring(11, 19);
    this.state.warningLogs.unshift({ timestamp, message });
    if (this.state.warningLogs.length > 5) {
      this.state.warningLogs.pop();
    }
  }

  checkAchievements() {
    const t = this.state.telemetry;
    if (this.state.missionReadiness >= 95) this.unlockAchievement("systems_nominal");
    if (t.astronautHealth >= 100) this.unlockAchievement("peak_condition");
    if (t.cargoCapacity >= 70 && t.cargoCapacity <= 85) this.unlockAchievement("optimal_logistics");
    if (t.oxygen >= 90 && t.water >= 90 && t.food >= 90 && t.power >= 90) this.unlockAchievement("eclss_perfection");
  }

  unlockAchievement(id) {
    const ach = this.state.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      ach.unlockedAt = new Date().toLocaleTimeString();
      this.notify("achievement_unlocked", ach);
    }
  }

  // Storage Persistence
  loadFromStorage() {
    try {
      const saved = localStorage.getItem(GAME_CONFIG.SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.score === "number") this.state.score = parsed.score;
        if (Array.isArray(parsed.unlockedDestinations)) this.state.unlockedDestinations = parsed.unlockedDestinations;
        if (Array.isArray(parsed.unlockedRockets)) this.state.unlockedRockets = parsed.unlockedRockets;
        if (parsed.difficulty) this.state.difficulty = parsed.difficulty;
      }
    } catch (e) {
      console.warn("Could not read localStorage:", e);
    }
  }

  saveToStorage() {
    try {
      const payload = {
        score: this.state.score,
        unlockedDestinations: this.state.unlockedDestinations,
        unlockedRockets: this.state.unlockedRockets,
        difficulty: this.state.difficulty
      };
      localStorage.setItem(GAME_CONFIG.SAVE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  startClock() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    this.clockInterval = setInterval(() => {
      this.state.metSeconds++;
      this.notify("clock_tick", this.state.metSeconds);
    }, 1000);
  }
}

export const gameState = new GameStateManager();

if (typeof window !== "undefined") {
  window.gameState = gameState;
}
