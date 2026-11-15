(function() {
'use strict';

// --- File: js\config.js ---
// ============================================================================
// JUNIOR ASTRONAUT MISSION TRAINER - COMPLETE NASA CONFIGURATION & METRICS SPEC
// Full Game Journey: Hangar, Boarding, Launch, Flight, Landing, Base Camp & Missions
// ============================================================================
const GAME_CONFIG = {
  TITLE: "Junior Astronaut Mission Trainer",
  SUBTITLE: "NASA Space Apps Challenge • Planetary Exploration Division",
  SAVE_KEY: "junior_astronaut_mission_save_v3",
  VERSION: "3.0.0",

  // 8 Core Dashboard Telemetry Metrics
  METRICS: {
    oxygen: {
      id: "oxygen",
      name: "Oxygen Supply",
      icon: "🫁",
      unit: "%",
      detailUnit: "kPa",
      defaultValue: 95,
      max: 100,
      min: 0,
      nominalThreshold: 60,
      cautionThreshold: 35,
      criticalThreshold: 20,
      color: "#00e5ff",
      description: "Cabin atmosphere and EVA primary life support system (ECLSS)."
    },
    food: {
      id: "food",
      name: "Food Supply",
      icon: "🍞",
      unit: "%",
      detailUnit: "Rations",
      defaultValue: 90,
      max: 100,
      min: 0,
      nominalThreshold: 55,
      cautionThreshold: 30,
      criticalThreshold: 15,
      color: "#ff9100",
      description: "Freeze-dried nutrient meals and emergency metabolic reserves."
    },
    water: {
      id: "water",
      name: "Water Supply",
      icon: "💧",
      unit: "%",
      detailUnit: "Liters",
      defaultValue: 88,
      max: 100,
      min: 0,
      nominalThreshold: 60,
      cautionThreshold: 30,
      criticalThreshold: 15,
      color: "#00b0ff",
      description: "Recycled potable water and thermal cooling loop fluid."
    },
    power: {
      id: "power",
      name: "Electrical Power",
      icon: "⚡",
      unit: "%",
      detailUnit: "kW",
      defaultValue: 92,
      max: 100,
      min: 0,
      nominalThreshold: 50,
      cautionThreshold: 30,
      criticalThreshold: 15,
      color: "#ffd600",
      description: "Fuel cell generation and lithium-ion storage bank capacity."
    },
    rocketFuel: {
      id: "rocketFuel",
      name: "Rocket Fuel",
      icon: "⛽",
      unit: "%",
      detailUnit: "Tons",
      defaultValue: 85,
      max: 100,
      min: 0,
      nominalThreshold: 70,
      cautionThreshold: 45,
      criticalThreshold: 25,
      color: "#ff3d00",
      description: "Liquid methane / LOX propellant for orbital insertion and descent."
    },
    cargoCapacity: {
      id: "cargoCapacity",
      name: "Cargo Capacity",
      icon: "📦",
      unit: "%",
      detailUnit: "Tons Load",
      defaultValue: 74,
      max: 100,
      min: 0,
      nominalThreshold: 85,
      cautionThreshold: 90,
      criticalThreshold: 98,
      color: "#b388ff",
      description: "Mass fraction of science equipment, rovers, and spare modules."
    },
    astronautHealth: {
      id: "astronautHealth",
      name: "Astronaut Health",
      icon: "❤️",
      unit: "%",
      detailUnit: "BPM 68",
      defaultValue: 98,
      max: 100,
      min: 0,
      nominalThreshold: 75,
      cautionThreshold: 50,
      criticalThreshold: 25,
      color: "#00e676",
      description: "Crew biometric vitals, radiation exposure index, and stamina."
    },
    missionDuration: {
      id: "missionDuration",
      name: "Mission Duration",
      icon: "⏱️",
      unit: "Days",
      detailUnit: "Days Planned",
      defaultValue: 14,
      max: 180,
      min: 3,
      nominalThreshold: 60,
      cautionThreshold: 90,
      criticalThreshold: 150,
      color: "#38ef7d",
      description: "Estimated flight and orbital expedition window."
    }
  },

  // Spacecraft Hangar Presets (Supports both ID schemes cleanly)
  ROCKETS: {
    small: {
      id: "small",
      name: "Scout-1 Light Explorer",
      badge: "🚀",
      category: "Light Fast Lifter",
      fuelCapacity: 80,
      cargoCapacity: 65,
      powerOutput: 85,
      thrustKn: "12,500 kN",
      payloadTons: "25 Tons",
      maxCargoSlots: 2,
      maxCapacity: { fuel: 80, oxygen: 80, water: 70, food: 70, power: 80 },
      description: "Nimble, highly responsive spacecraft ideal for quick lunar reconnaissance.",
      specs: { height: "55 m", stages: 2, reliability: "99.1%", propellant: "LOX / RP-1" }
    },
    medium: {
      id: "medium",
      name: "Pioneer-X Heavy Lifter",
      badge: "🛸",
      category: "Standard Exploration Cruiser",
      fuelCapacity: 92,
      cargoCapacity: 85,
      powerOutput: 90,
      thrustKn: "28,400 kN",
      payloadTons: "55 Tons",
      maxCargoSlots: 3,
      maxCapacity: { fuel: 100, oxygen: 100, water: 90, food: 90, power: 100 },
      description: "Balanced deep space exploration rocket equipped with heavy cargo bays.",
      specs: { height: "82 m", stages: 2, reliability: "99.5%", propellant: "LOX / LH2" }
    },
    heavy: {
      id: "heavy",
      name: "Titan-V Super Heavy",
      badge: "🌌",
      category: "Super-Heavy Interplanetary Dreadnought",
      fuelCapacity: 100,
      cargoCapacity: 98,
      powerOutput: 100,
      thrustKn: "42,000 kN",
      payloadTons: "120 Tons",
      maxCargoSlots: 4,
      maxCapacity: { fuel: 120, oxygen: 120, water: 110, food: 110, power: 120 },
      description: "Massive multi-stage rocket capable of transporting complete planetary base stations.",
      specs: { height: "118 m", stages: 3, reliability: "98.7%", propellant: "LOX / LCH4" }
    },
    // Aliases for Phase 1 components
    sls: {
      id: "sls",
      name: "Space Launch System (SLS)",
      badge: "🚀",
      category: "Heavy Deep Space Lifter",
      fuelCapacity: 85,
      cargoCapacity: 75,
      powerOutput: 90,
      thrustKn: "39,100 kN",
      payloadTons: "45 Tons",
      maxCargoSlots: 3,
      maxCapacity: { fuel: 100, oxygen: 95, water: 88, food: 90, power: 92 },
      description: "NASA's primary Artemis lunar deep space exploration rocket.",
      specs: { height: "98 m", stages: 2, reliability: "99.4%", propellant: "LOX / LH2" }
    },
    falcon_heavy: {
      id: "falcon_heavy",
      name: "Falcon Heavy Explorer",
      badge: "🛸",
      category: "High-Payload Commercial Lifter",
      fuelCapacity: 92,
      cargoCapacity: 88,
      powerOutput: 85,
      thrustKn: "22,819 kN",
      payloadTons: "64 Tons",
      maxCargoSlots: 3,
      maxCapacity: { fuel: 95, oxygen: 90, water: 85, food: 85, power: 90 },
      description: "Reusable triple-core heavy booster optimized for cargo deployment.",
      specs: { height: "70 m", stages: 2, reliability: "98.9%", propellant: "LOX / RP-1" }
    },
    saturn_v: {
      id: "saturn_v",
      name: "Saturn V Legacy Titan",
      badge: "🏛️",
      category: "Apollo Heritage Super Heavy",
      fuelCapacity: 98,
      cargoCapacity: 70,
      powerOutput: 80,
      thrustKn: "35,100 kN",
      payloadTons: "48 Tons",
      maxCargoSlots: 3,
      maxCapacity: { fuel: 100, oxygen: 85, water: 80, food: 80, power: 85 },
      description: "The historic powerhouse that carried humankind to the Moon.",
      specs: { height: "110 m", stages: 3, reliability: "100%", propellant: "LOX / RP-1 / LH2" }
    },
    starship: {
      id: "starship",
      name: "Starship Deep Space",
      badge: "🌌",
      category: "Interplanetary Mars / Europa Cruiser",
      fuelCapacity: 95,
      cargoCapacity: 95,
      powerOutput: 95,
      thrustKn: "74,300 kN",
      payloadTons: "150 Tons",
      maxCargoSlots: 4,
      maxCapacity: { fuel: 120, oxygen: 110, water: 100, food: 100, power: 110 },
      description: "Next-generation fully reusable interplanetary exploration vehicle.",
      specs: { height: "121 m", stages: 2, reliability: "97.5%", propellant: "LOX / LCH4" }
    }
  },

  // Astronaut Candidates
  ASTRONAUTS: {
    alex: {
      id: "alex",
      name: "Commander Alex Mercer",
      role: "Mission Commander & Flight Aviator",
      avatar: "👨‍🚀",
      healthBonus: 5,
      oxygenBonus: 5,
      bio: "1,200 hours in T-38 jets and 4 ISS expedition deployments.",
      focus: "Navigation & Emergency Protocols"
    },
    maya: {
      id: "maya",
      name: "Dr. Maya Patel",
      role: "Chief Medical & Life Support Specialist",
      avatar: "👩‍🚀",
      healthBonus: 10,
      oxygenBonus: 10,
      bio: "Former Navy Flight Surgeon specializing in closed-loop ECLSS survival.",
      focus: "Biomedical Systems & Radiation Mitigation"
    },
    leo: {
      id: "leo",
      name: "Leo Zhang",
      role: "Lead Propulsion & Electrical Engineer",
      avatar: "🧑‍🚀",
      healthBonus: 3,
      oxygenBonus: 2,
      bio: "Lead avionics architect for deep space cryocooling and ion thrusters.",
      focus: "Power Generation & Fuel Efficiency"
    },
    elena: {
      id: "elena",
      name: "Elena Rostova",
      role: "EVA Specialist & Astrobiologist",
      avatar: "👩‍🔬",
      healthBonus: 6,
      oxygenBonus: 4,
      bio: "Veteran of 18 spacewalks and deep submersible trench exploration.",
      focus: "Extravehicular Activity & Sample Containment"
    }
  },

  // Planetary Destinations
  DESTINATIONS: {
    moon: {
      id: "moon",
      name: "The Moon (Artemis Base Camp)",
      level: 1,
      icon: "🌕",
      distance: "384,400 km",
      distanceKm: 384400,
      defaultDuration: 14,
      gravity: "1.62 m/s² (16.6% Earth)",
      gravityMps2: 1.62,
      gravityRelativeEarth: 0.166,
      atmosphere: "Vacuum (<0.0001 kPa)",
      themeColor: "#90a4ae",
      skyGradient: ["#02040a", "#080d1a", "#101a2e"],
      groundColor: "#455a64",
      surfaceTemp: "-130°C to +120°C",
      radiationLevel: 0.4,
      hazard: "Sharp lunar regolith & micrometeoroids",
      missionTimeLimitSec: 240,
      recommendedSupplies: { fuel: 75, oxygen: 70, water: 65, food: 65, power: 70 },
      briefing: "Establish a sustained presence at the Lunar South Pole near Shackleton Crater to prospect for water ice.",
      nasaFact: "Lunar regolith consists of jagged glass shards created by billions of years of meteorite impacts without weather erosion.",
      launchWindow: "OPTIMAL (T-04:22:18)",
      surfaceHazards: ["micrometeoroid", "circuit_fault", "pipe_freeze"],
      objectives: [
        {
          id: "moon_regolith",
          title: "Collect Regolith Soil Samples",
          icon: "🌑",
          desc: "Drill core regolith samples containing trapped volatiles near crater rim.",
          targetCount: 2,
          currentCount: 0,
          completed: false,
          points: 150,
          resourceCost: { power: 8, oxygen: 6, suitIntegrity: 5 }
        },
        {
          id: "moon_solar",
          title: "Deploy Surface Solar Array",
          icon: "☀️",
          desc: "Erect photovoltaic solar panels on Shackleton Crater rim in perpetual sunlight.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 200,
          resourceCost: { power: 10, oxygen: 8, water: 4 }
        },
        {
          id: "moon_seismometer",
          title: "Deploy ALSEP Passive Seismometer",
          icon: "📡",
          desc: "Install lunar seismic instruments to record deep interior moonquakes.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 180,
          resourceCost: { power: 6, oxygen: 5, suitIntegrity: 4 }
        },
        {
          id: "moon_debris",
          title: "🧹 Debris Cleanup & Crash Analysis",
          icon: "🧹",
          desc: "Investigate crashed probe wreckage, resolve 4 hazard events, and ace the engineering quiz.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 250,
          resourceCost: { power: 10, oxygen: 8, suitIntegrity: 6 }
        },
        {
          id: "moon_greenhouse",
          title: "🌱 Mission 3: Combined Greenhouse Survival",
          icon: "🌱",
          desc: "Manage closed-loop hydroponics, irrigation, and UV lighting to survive 60 days until resupply docks.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 500,
          resourceCost: { power: 15, water: 15, food: 21 }
        },
        {
          id: "moon_extraction",
          title: "🚀 Final Mission: Resupply & Extraction",
          icon: "🚀",
          desc: "Align the high-gain dish, clear Pad Alpha, and guide the Artemis Resupply Lander home.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 1000,
          resourceCost: { power: 10, oxygen: 5, suitIntegrity: 5 }
        }
      ]
    },
    mars: {
      id: "mars",
      name: "Mars (Jezero Crater Station)",
      level: 2,
      icon: "🔴",
      distance: "225,000,000 km",
      distanceKm: 225000000,
      defaultDuration: 90,
      gravity: "3.72 m/s² (38% Earth)",
      gravityMps2: 3.72,
      gravityRelativeEarth: 0.38,
      atmosphere: "Thin CO₂ (0.63 kPa)",
      themeColor: "#ff7043",
      skyGradient: ["#1a0c08", "#3e1c12", "#662818"],
      groundColor: "#bf360c",
      surfaceTemp: "-60°C (Average)",
      radiationLevel: 0.8,
      hazard: "Global dust storms & cosmic radiation",
      missionTimeLimitSec: 320,
      recommendedSupplies: { fuel: 85, oxygen: 85, water: 80, food: 80, power: 85 },
      briefing: "Land at the ancient river delta of Jezero Crater to deploy pressurized habitat domes and biosignature laboratories.",
      nasaFact: "NASA's MOXIE experiment on Perseverance proved that breathable oxygen can be extracted directly from the Martian CO2 atmosphere.",
      launchWindow: "OPEN (Hohmann Transfer Arc)",
      surfaceHazards: ["dust_storm", "solar_storm", "o2_leak", "pipe_freeze"],
      objectives: [
        {
          id: "mars_habitat",
          title: "Erect Pressurized Living Habitat",
          icon: "🏠",
          desc: "Deploy the geodesic radiation bunker dome to provide safe crew shelter.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 250,
          resourceCost: { power: 15, oxygen: 12, water: 10 }
        },
        {
          id: "mars_moxie",
          title: "Repair MOXIE Oxygen Reactor",
          icon: "🫧",
          desc: "Calibrate solid oxide electrolysis to extract breathable O2 from Martian CO2.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 220,
          resourceCost: { power: 12, oxygen: 10, suitIntegrity: 6 }
        },
        {
          id: "mars_ice",
          title: "Mine Subsurface Glacial Ice",
          icon: "💧",
          desc: "Drill through the regolith permafrost to supply the base water purifier.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 200,
          resourceCost: { power: 14, oxygen: 8, water: 5 }
        },
        {
          id: "mars_greenhouse",
          title: "Cultivate Hydroponic Microgreens",
          icon: "🌱",
          desc: "Seed nutrient-rich aeroponic crops inside the greenhouse biome.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 240,
          resourceCost: { power: 10, water: 12, oxygen: 6 }
        }
      ]
    },
    europa: {
      id: "europa",
      name: "Europa (Cryo Ocean Base)",
      level: 3,
      icon: "❄️",
      distance: "628,000,000 km",
      distanceKm: 628000000,
      defaultDuration: 180,
      gravity: "1.31 m/s² (13.4% Earth)",
      gravityMps2: 1.31,
      gravityRelativeEarth: 0.134,
      atmosphere: "Trace O₂ (<0.1 kPa)",
      themeColor: "#80d8ff",
      skyGradient: ["#020b18", "#071c38", "#0f3560"],
      groundColor: "#0288d1",
      surfaceTemp: "-160°C Cryogenic",
      radiationLevel: 1.5,
      hazard: "Intense Jovian magnetosphere radiation",
      missionTimeLimitSec: 380,
      recommendedSupplies: { fuel: 95, oxygen: 95, water: 90, food: 90, power: 95 },
      briefing: "Deploy robotic sub-surface thermal probes beneath the kilometers-thick ice shell to search for ocean biosignatures.",
      nasaFact: "Europa harbors a global subsurface liquid salt-water ocean containing twice as much water as Earth, kept warm by Jovian tidal flexing.",
      launchWindow: "WINDOW STANDBY",
      surfaceHazards: ["solar_storm", "micrometeoroid", "pipe_freeze", "circuit_fault"],
      objectives: [
        {
          id: "europa_shield",
          title: "Survive & Shield Heavy Radiation",
          icon: "🛡️",
          desc: "Erect magnetic deflection baffles beneath Jupiter's lethal radiation belts.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 300,
          resourceCost: { power: 18, oxygen: 14, suitIntegrity: 10 }
        },
        {
          id: "europa_ice_core",
          title: "Extract Cryogenic Deep Ice Core",
          icon: "🧊",
          desc: "Drill into the sub-crustal ocean ice matrix to collect pristine hydrothermal samples.",
          targetCount: 2,
          currentCount: 0,
          completed: false,
          points: 280,
          resourceCost: { power: 16, oxygen: 12, water: 8 }
        },
        {
          id: "europa_uplink",
          title: "Transmit Deep Space Science Log",
          icon: "📡",
          desc: "Beam science telemetry 628 million km back to Earth via high-gain transponder.",
          targetCount: 1,
          currentCount: 0,
          completed: false,
          points: 260,
          resourceCost: { power: 14, oxygen: 8 }
        }
      ]
    }
  },

  // Special Surface Science Expeditions & Tasks
  SPECIAL_MISSIONS: {
    debris: {
      id: "debris",
      name: "Debris Cleanup",
      emoji: "🧹",
      color: "#b08968",
      crew: 2,
      days: 4,
      budget: 90,
      size: 16,
      blurb: "A previous mission crashed on the surface. Collect the wreckage and find out what went wrong.",
      needs: { fuel: 16, life: 20, shield: 14, thermal: 14, science: 12 },
      events: [
        {
          icon: "🔪",
          name: "Sharp metal fragments",
          cat: "shield",
          text: "Jagged debris threatens to tear your suit and damage the rover.",
          fixText: "Engage reinforced Kevlar deflection shields"
        },
        {
          icon: "☣️",
          name: "Leaked fuel residue",
          cat: "life",
          text: "Toxic leftover fuel contaminates the area and your air filters.",
          fixText: "Purge ECLSS scrubbers & activate catalytic oxidizer"
        },
        {
          icon: "🔥",
          name: "Hot wreckage in sunlight",
          cat: "thermal",
          text: "Metal pieces heat up under the Sun and strain your cooling system.",
          fixText: "Boost liquid cooling loop & deploy thermal sunshade"
        },
        {
          icon: "🚜",
          name: "Rover stuck in debris",
          cat: "fuel",
          text: "The rover gets stuck between wreckage pieces and needs extra power to escape.",
          fixText: "Reroute auxiliary fuel to planetary drive thruster"
        }
      ],
      quiz: [
        {
          q: "Why do engineers collect wreckage from a failed mission?",
          a: [
            "To learn what went wrong and prevent it next time",
            "To decorate the base",
            "Because it is free fuel"
          ],
          c: 0,
          why: "Studying failures is one of the best ways engineers improve future missions."
        },
        {
          q: "Why is sharp debris dangerous on the Moon?",
          a: [
            "It can puncture suits and damage rovers",
            "It makes the Moon heavier",
            "It blocks the Sun"
          ],
          c: 0,
          why: "With no air and no easy rescue, even a small suit puncture is serious."
        }
      ]
    },
    greenhouse: {
      id: "greenhouse",
      name: "Combined Greenhouse Survival",
      emoji: "🌱",
      color: "#2ecc71",
      crew: 4,
      days: 120,
      budget: 120,
      size: 20,
      blurb: "Supply ship arrives in 120 days. Manage irrigation, UV grow lamps, and crop cycles to keep food rations above zero.",
      needs: { food: 21, water: 100, power: 100, growth: 0 },
      events: [
        {
          icon: "💧",
          name: "Irrigation Cycle",
          cat: "water",
          text: "Watering crop beds boosts growth by +25% (-15% water reserves).",
          fixText: "Open greywater filtration valve and inject nutrients"
        },
        {
          icon: "☀️",
          name: "UV Boost",
          cat: "power",
          text: "High-intensity grow lamps boost growth by +25% (-15% power grid).",
          fixText: "Switch auxiliary battery bus to full-spectrum LED arrays"
        },
        {
          icon: "🌾",
          name: "Harvest Crops",
          cat: "food",
          text: "Mature 100% crops yield +18 days of emergency nutrient rations.",
          fixText: "Harvest hydroponic wheat & pack vacuum ration pouches"
        },
        {
          icon: "⏭️",
          name: "Daily Recirculation",
          cat: "life",
          text: "Each day burns 1 ration while recycling +10% water and power.",
          fixText: "Maintain closed-loop condensing humidity coils"
        }
      ],
      quiz: [
        {
          q: "Why is growing fresh food critical for long-duration deep space missions?",
          a: [
            "Resupply from Earth takes months and canned rations lose vitamins over time",
            "Because astronauts dislike freeze-dried food",
            "To make the habitat smell like flowers"
          ],
          c: 0,
          why: "On Mars or deep space transits, cargo resupply ships take 6 to 9 months, so bioregenerative life-support is essential."
        },
        {
          q: "How do closed-loop space greenhouses conserve limited water?",
          a: [
            "By condensing transpired moisture from leaves and recycling it back into irrigation",
            "By dumping used water into the vacuum",
            "By boiling all water away"
          ],
          c: 0,
          why: "NASA's ECLSS and Veggie/APH chambers recapture up to 98% of all transpired moisture through condensation loops."
        }
      ]
    },
    extraction: {
      id: "extraction",
      name: "Resupply & Extraction Finale",
      emoji: "🚀",
      color: "#2ecc71",
      crew: 4,
      days: 1,
      budget: 150,
      size: 25,
      blurb: "The Artemis Resupply & Crew Return Lander is in terminal approach! Align the high-gain dish, clear Pad Alpha, and guide our astronauts home.",
      needs: { fuel: 20, life: 25, shield: 20, thermal: 20, science: 30 }
    }
  },

  // Pre-Launch Pad 39B Checklist Steps
  CHECKLIST_STEPS: [
    {
      id: "nav_gyro",
      icon: "🧭",
      label: "Inertial Star Trackers & Gyroscopes",
      detail: "Align star sensors to celestial coordinates and lock inertial navigation platform."
    },
    {
      id: "comms",
      icon: "📡",
      label: "Deep Space Network & Houston Comms",
      detail: "Verify S-band and Ka-band bidirectional radio transponder uplinks with Houston."
    },
    {
      id: "life_support",
      icon: "🫁",
      label: "ECLSS Life Support & Cabin Pressurization",
      detail: "Pressurize cabin to 101.3 kPa with 78% N2 / 22% O2 and calibrate CO2 scrubbers."
    },
    {
      id: "engine_seal",
      icon: "🔒",
      label: "Cryogenic Propellant Valves & Engine Seals",
      detail: "Verify LOX/Methane line chill-down, purge turbopumps, and lock main engine seals."
    }
  ],

  // 9 Functional Surface Base Camp Modules
  BASE_MODULES: {
    hab_dome: {
      id: "hab_dome",
      name: "Pressurized Habitat Dome",
      icon: "🏠",
      color: "#00e676",
      powerDraw: 2.5,
      o2Gen: 0.1,
      waterGen: 0,
      foodGen: 0,
      description: "Primary living quarters. Shields crew against deadly cosmic radiation and thermal extremes."
    },
    solar_array: {
      id: "solar_array",
      name: "Photovoltaic Solar Array",
      icon: "☀️",
      color: "#ffd600",
      powerDraw: -8.0, // Negative powerDraw = generates electricity!
      o2Gen: 0,
      waterGen: 0,
      foodGen: 0,
      description: "High-efficiency crystalline solar panels. Produces 8.0 kW clean electric power for base systems."
    },
    sabatier_o2: {
      id: "sabatier_o2",
      name: "Sabatier Oxygen Generator",
      icon: "🫧",
      color: "#00e5ff",
      powerDraw: 3.0,
      o2Gen: 1.2,
      waterGen: 0,
      foodGen: 0,
      description: "Closed-loop ECLSS reactor that extracts breathable O2 from atmospheric carbon dioxide."
    },
    ice_miner: {
      id: "ice_miner",
      name: "Subsurface Water Ice Melter",
      icon: "💧",
      color: "#00b0ff",
      powerDraw: 2.8,
      o2Gen: 0,
      waterGen: 1.0,
      foodGen: 0,
      description: "Thermal drill that melts planetary permafrost into purified drinking and cooling water."
    },
    greenhouse: {
      id: "greenhouse",
      name: "Hydroponic Greenhouse",
      icon: "🌱",
      color: "#388e3c",
      powerDraw: 2.2,
      o2Gen: 0.3,
      waterGen: -0.2,
      foodGen: 0.8,
      description: "Aeroponic vertical farm growing nutrient-rich microgreens to replenish astronaut rations."
    },
    comms_dish: {
      id: "comms_dish",
      name: "Deep Space Comms Antenna",
      icon: "📡",
      color: "#b388ff",
      powerDraw: 1.5,
      o2Gen: 0,
      waterGen: 0,
      foodGen: 0,
      description: "High-gain parabolic dish maintaining continuous telemetry uplink with NASA Mission Control."
    },
    science_lab: {
      id: "science_lab",
      name: "Analytical Science Lab",
      icon: "🔬",
      color: "#ab47bc",
      powerDraw: 2.0,
      o2Gen: 0,
      waterGen: 0,
      foodGen: 0,
      description: "Spectrometry and geological analysis station to process soil and rock core specimens."
    },
    battery_bank: {
      id: "battery_bank",
      name: "High-Capacity Battery Bank",
      icon: "🔋",
      color: "#ff9100",
      powerDraw: -2.0,
      o2Gen: 0,
      waterGen: 0,
      foodGen: 0,
      description: "Lithium-ion energy storage banks to keep heaters and oxygen flowing through dark planetary nights."
    },
    rover_bay: {
      id: "rover_bay",
      name: "Rover Garage & Charger",
      icon: "🏎️",
      color: "#78909c",
      powerDraw: 1.8,
      o2Gen: 0,
      waterGen: 0,
      foodGen: 0,
      description: "Maintenance bay and inductive fast-charging pad for the planetary exploration rover."
    }
  },

  // Cargo Equipment Bay Items
  CARGO_ITEMS: {
    extra_o2: {
      id: "extra_o2",
      name: "Cryogenic O2 Tank",
      icon: "🫁",
      type: "reserve",
      effect: "+30% Max Oxygen Reserve",
      description: "Pressurized liquid oxygen bottle to extend EVA spacewalk duration."
    },
    repair_kit: {
      id: "repair_kit",
      name: "EVA Repair Multi-Tool",
      icon: "🔧",
      type: "tool",
      effect: "Quick Equipment Fixes",
      description: "Inductive welding torch and sealant patches to repair suit tears and micrometeoroid hull breaches."
    },
    solar_kit: {
      id: "solar_kit",
      name: "Auxiliary Solar Panel",
      icon: "☀️",
      type: "energy",
      effect: "+20% Power Efficiency",
      description: "Lightweight fold-out photovoltaic blanket to boost battery recharge rates."
    },
    lead_shield: {
      id: "lead_shield",
      name: "Radiation Deflector Vest",
      icon: "🛡️",
      type: "defense",
      effect: "-60% Radiation Absorption",
      description: "Bismuth-polyethylene composite shielding that protects astronaut bone marrow during solar storms."
    },
    ice_drill: {
      id: "ice_drill",
      name: "Tungsten Ice Corer",
      icon: "🧊",
      type: "science",
      effect: "Deep Permafrost Mining",
      description: "Rotary percussive drill bit capable of penetrating hard cryo-ice matrixes."
    },
    extra_battery: {
      id: "extra_battery",
      name: "Solid-State Battery Pack",
      icon: "🔋",
      type: "energy",
      effect: "+25% Reserve Capacity",
      description: "High-density solid-state battery ensuring power during prolonged dust storms."
    }
  },

  // Survival Rates & Chain Reaction Physics
  SURVIVAL: {
    TICK_INTERVAL_MS: 1000,
    PASSIVE_DRAIN: {
      oxygen: 0.35, // % per second
      water: 0.25,  // % per second
      food: 0.20,   // % per second
      power: 0.40   // % per second
    },
    ACTIVITY_DRAIN: {
      walking: { oxygen: 0.3, food: 0.2 },
      digging: { oxygen: 0.7, food: 0.5, suitStress: 0.3 },
      repairing: { oxygen: 0.5, power: 0.4, stress: 0.4 }
    },
    THERMAL: {
      CABIN_IDEAL_C: 21,
      HEATER_POWER_DRAW: 1.2,
      CHILL_RATE_NO_POWER: 0.8,
      WARM_RATE_IN_HABITAT: 1.5,
      FREEZE_POINT_C: 0,
      HYPOTHERMIA_C: 10
    },
    RADIATION: {
      BASE_BACKGROUND: 0.1,
      SAFE_THRESHOLD: 0.5,
      HABITAT_SHIELDING: 0.95,
      LEAD_SHIELD_ITEM: 0.60
    },
    THRESHOLDS: {
      WARNING_YELLOW: 30,
      ALERT_RED: 15,
      CRITICAL_COUNTDOWN: 5
    }
  },

  // Random Emergency Hazards
  HAZARDS: {
    dust_storm: {
      id: "dust_storm",
      name: "Martian Atmospheric Dust Storm",
      icon: "🌪️",
      durationSec: 18,
      severity: "high",
      impact: "Blocks solar arrays by 85% and degrades suit joints.",
      fixAction: "Shelter inside Habitat Dome until wind shears subside."
    },
    solar_storm: {
      id: "solar_storm",
      name: "Coronal Mass Ejection (Solar Storm)",
      icon: "☀️",
      durationSec: 15,
      severity: "critical",
      impact: "Surges radiation dose to 2.5 mSv/hr and threatens crew health.",
      fixAction: "Seek immediate shelter inside the shielded Pressurized Habitat Dome!"
    },
    micrometeoroid: {
      id: "micrometeoroid",
      name: "Micrometeoroid Hull Breach",
      icon: "☄️",
      durationSec: 20,
      severity: "critical",
      impact: "Rapidly vents cabin oxygen (-1.5% O2/sec) and suit pressure.",
      fixAction: "Apply epoxy composite patch to the damaged hull segment!"
    },
    o2_leak: {
      id: "o2_leak",
      name: "ECLSS Primary Regulator Leak",
      icon: "🫁",
      durationSec: 22,
      severity: "high",
      impact: "Oxygen pressure dropping rapidly.",
      fixAction: "Manually cycle the Sabatier bypass valve to restore nominal flow."
    },
    circuit_fault: {
      id: "circuit_fault",
      name: "Auxiliary Power Relay Failure",
      icon: "⚡",
      durationSec: 20,
      severity: "medium",
      impact: "Power bus tripping, cutting off environmental heaters.",
      fixAction: "Reconnect damaged wiring circuits on the main electrical junction."
    },
    pipe_freeze: {
      id: "pipe_freeze",
      name: "Water Recycler Thermal Freeze",
      icon: "❄️",
      durationSec: 18,
      severity: "medium",
      impact: "Sub-zero cabin temperatures have frozen fluid loops.",
      fixAction: "Redirect electric heater power to the water circulation pipes."
    }
  },

  // Difficulty Presets
  DIFFICULTY: {
    cadet: {
      id: "cadet",
      name: "Cadet (Standard)",
      icon: "🌱",
      drainMultiplier: 1.0,
      suppliesMultiplier: 1.0,
      hazardFrequencySec: 32,
      scoreMultiplier: 1.0,
      description: "Balanced training for aspiring astronauts. Generous supplies and moderate hazards."
    },
    commander: {
      id: "commander",
      name: "Commander (Challenging)",
      icon: "🚀",
      drainMultiplier: 1.35,
      suppliesMultiplier: 0.85,
      hazardFrequencySec: 22,
      scoreMultiplier: 1.5,
      description: "For experienced spacefarers. Tight supply margins, faster drain, and frequent equipment failures."
    },
    simulation: {
      id: "simulation",
      name: "Iron Astronaut (Extreme)",
      icon: "🔥",
      drainMultiplier: 1.7,
      suppliesMultiplier: 0.7,
      hazardFrequencySec: 15,
      scoreMultiplier: 2.2,
      description: "True NASA flight simulator difficulty. Harsh radiation, freezing temperatures, and zero room for error."
    }
  },

  // Astronaut Progression Ranks
  RANKS: [
    { threshold: 0, title: "Space Cadet", badge: "🌱", color: "#64b5f6" },
    { threshold: 400, title: "Junior Astronaut", badge: "🚀", color: "#4fc3f7" },
    { threshold: 900, title: "Mission Specialist", badge: "⭐", color: "#81c784" },
    { threshold: 1800, title: "Flight Commander", badge: "🏆", color: "#ffd54f" },
    { threshold: 3000, title: "Deep Space Pioneer", badge: "🌌", color: "#ba68c8" }
  ],

  // Unlockable Achievements
  ACHIEVEMENTS: [
    {
      id: "systems_nominal",
      title: "Systems Nominal",
      badge: "⭐",
      description: "Achieve a Mission Readiness score of 95% or higher.",
      unlocked: false
    },
    {
      id: "heavy_lifter",
      title: "Heavy Lifter",
      badge: "🚀",
      description: "Select and configure a super-heavy class exploration rocket.",
      unlocked: false
    },
    {
      id: "peak_condition",
      title: "Peak Physical Condition",
      badge: "❤️",
      description: "Attain 100% Astronaut Health with optimal medical calibrations.",
      unlocked: false
    },
    {
      id: "optimal_logistics",
      title: "Master Quartermaster",
      badge: "📦",
      description: "Calibrate cargo capacity between 70% and 85% for optimal mass fraction.",
      unlocked: false
    },
    {
      id: "voyager_plan",
      title: "Deep Space Planner",
      badge: "🌌",
      description: "Formulate a mission briefing with a duration of 90 days or longer.",
      unlocked: false
    },
    {
      id: "crisis_commander",
      title: "Crisis Commander",
      badge: "🛡️",
      description: "Trigger a simulated telemetry emergency and successfully re-stabilize the ship.",
      unlocked: false
    },
    {
      id: "eclss_perfection",
      title: "Life Support Vanguard",
      badge: "🫁",
      description: "Maintain Oxygen, Water, Food, and Power all above 90% simultaneously.",
      unlocked: false
    },
    {
      id: "go_for_launch",
      title: "Flight Director Clearance",
      badge: "🏆",
      description: "Complete a full Pre-Flight Go/No-Go Poll and initiate final countdown.",
      unlocked: false
    },
    {
      id: "master_botanist",
      title: "Master Orbital Botanist",
      badge: "🌱",
      description: "Survive all 60 days in the Orbital Greenhouse until the resupply ship docks.",
      unlocked: false
    },
    {
      id: "artemis_mastery",
      title: "Artemis Program Legend",
      badge: "🌕",
      description: "Safely guide the Artemis Resupply Lander home and complete the 5-Stage Lunar Expedition.",
      unlocked: false
    }
  ]
};


// --- File: js\nasa.js ---
/* ============================================================================
   nasa.js - Live NASA Data Feeds for Junior Astronaut Mission Trainer
   ISS Tracking, DONKI Space Weather, NeoWs Asteroids, Mars Photos & APOD
   Plain JS (ES module-free). Include with: <script src="js/nasa.js"></script>
   Get a free key at https://api.nasa.gov (DEMO_KEY works with rate limits).
   ============================================================================ */

const NasaLive = (() => {
  let KEY = "DEMO_KEY";
  const NASA = "https://api.nasa.gov";
  const today = () => new Date().toISOString().slice(0, 10);
  const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

  async function getJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(url + " -> " + r.status);
    return r.json();
  }

  // 1) ISS live position (no key needed). Call every ~5s.
  async function getISS() {
    const d = await getJSON("https://api.wheretheiss.at/v1/satellites/25544");
    return {
      lat: d.latitude,
      lon: d.longitude,
      altitudeKm: d.altitude,
      speedKmh: d.velocity,
      timestamp: new Date().toLocaleTimeString()
    };
  }

  // 2) Space weather: solar flares in the last 3 days (DONKI).
  //    Returns { active: bool, strongest: "X1.2" | null, raw: Array }
  async function getSolarStorm() {
    const url = `${NASA}/DONKI/FLR?startDate=${daysAgo(3)}&endDate=${today()}&api_key=${KEY}`;
    const flares = await getJSON(url);
    if (!flares || !flares.length) return { active: false, strongest: null, count: 0 };
    const order = { A: 0, B: 1, C: 2, M: 3, X: 4 };
    flares.sort((a, b) => (order[(b.classType || "A")[0]] || 0) - (order[(a.classType || "A")[0]] || 0));
    const strongest = flares[0].classType;
    return {
      active: "MX".includes(strongest[0]),
      strongest,
      count: flares.length,
      peakTime: flares[0].peakTime || null
    };
  }

  // 3) Asteroids passing Earth today (NeoWs).
  async function getAsteroids() {
    const url = `${NASA}/neo/rest/v1/feed?start_date=${today()}&end_date=${today()}&api_key=${KEY}`;
    const d = await getJSON(url);
    const list = (d.near_earth_objects && d.near_earth_objects[today()]) || [];
    return list
      .map((a) => ({
        name: a.name,
        hazardous: a.is_potentially_hazardous_asteroid,
        missKm: Math.round(+a.close_approach_data[0].miss_distance.kilometers),
        diameterM: Math.round(a.estimated_diameter.meters.estimated_diameter_max),
        velocityKmh: Math.round(+a.close_approach_data[0].relative_velocity.kilometers_per_hour)
      }))
      .sort((a, b) => a.missKm - b.missKm);
  }

  // 4) Mars photos. Falls back to NASA Image Library if the rover API is down.
  async function getMarsPhotos(limit = 6) {
    try {
      const d = await getJSON(`${NASA}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${KEY}`);
      if (d.latest_photos && d.latest_photos.length) {
        return d.latest_photos.slice(0, limit).map((p) => ({
          url: p.img_src,
          caption: `${p.camera.full_name}, sol ${p.sol}`,
          date: p.earth_date
        }));
      }
      throw new Error("No rover photos in response");
    } catch (e) {
      const d = await getJSON("https://images-api.nasa.gov/search?q=mars%20rover&media_type=image");
      return (d.collection.items || []).slice(0, limit).map((i) => ({
        url: (i.links && i.links[0] ? i.links[0].href : ""),
        caption: (i.data && i.data[0] ? i.data[0].title : "Curiosity Mars Rover"),
        date: today()
      }));
    }
  }

  // 5) Astronomy Picture of the Day.
  async function getAPOD() {
    const d = await getJSON(`${NASA}/planetary/apod?api_key=${KEY}`);
    return {
      title: d.title,
      url: d.url,
      explanation: d.explanation,
      isImage: d.media_type === "image",
      date: d.date
    };
  }

  /* Wire everything to the game.
     hooks = {
       apiKey, onISS(pos), onSolarStorm(info), onAsteroids(list), onMarsPhotos(list), onAPOD(apod)
     }
  */
  function init(hooks = {}) {
    if (hooks.apiKey) KEY = hooks.apiKey;
    const safe = (fn, cb, ms) => {
      const run = () => fn().then((r) => cb && cb(r)).catch((e) => console.warn("NASA Live Feed:", e.message));
      run();
      if (ms) setInterval(run, ms);
    };
    safe(getISS, hooks.onISS, 5000);
    safe(getSolarStorm, hooks.onSolarStorm, 30 * 60 * 1000);
    safe(getAsteroids, hooks.onAsteroids, 6 * 60 * 60 * 1000);
    safe(() => getMarsPhotos(6), hooks.onMarsPhotos);
    safe(getAPOD, hooks.onAPOD);
  }

  return { init, getISS, getSolarStorm, getAsteroids, getMarsPhotos, getAPOD };
})();

if (typeof window !== "undefined") {
  window.NasaLive = NasaLive;
}



// --- File: js\audio.js ---
// ============================================================================
// PROCEDURAL WEB AUDIO SYNTHESIZER FOR JUNIOR ASTRONAUT MISSION TRAINER
// Real-time audio engine: Apollo Quindar beeps, telemetry clicks, alarm sirens,
// thruster rumble, countdown tones, collectible chimes, and ambient space drone
// Zero external audio dependencies - 100% synthesized in Web Audio API
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.initialized = false;
    this.ambientDroneOsc = null;
    this.rocketRumbleNode = null;
    this.rocketRumbleGain = null;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Gain for SFX
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Dedicated Music Gain
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      this.initialized = true;
      this.startAmbientMusic();
    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.musicGain.gain.setValueAtTime(this.isMuted || this.isMusicMuted ? 0 : 0.2, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // NASA Apollo Quindar Intro Beep (2524 Hz for 250ms)
  playQuindarBeep() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2524, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.01);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + 0.18);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.23);
    } catch (e) { }
  }

  playQuindar() {
    this.playQuindarBeep();
  }

  // UI Click / Button Tap
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) { }
  }

  // Telemetry Adjust Tone
  playAdjustTone(isUp = true) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const startFreq = isUp ? 600 : 900;
      const endFreq = isUp ? 900 : 500;

      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) { }
  }

  // Success / Achievement Chime
  playSuccessChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + (idx * 0.07);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 0.46);
      });
    } catch (e) { }
  }

  playSuccessFanfare() {
    this.playSuccessChime();
  }

  // Failure / Abort Tone
  playFail() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [440, 370, 311, 220];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + (idx * 0.1);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(start);
        osc.stop(start + 0.32);
      });
    } catch (e) { }
  }

  // Critical Warning Siren
  playWarningAlarm() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch (e) { }
  }

  playAlarm() {
    this.playWarningAlarm();
  }

  playWarningChime() {
    this.playWarningAlarm();
  }

  // T-Minus Countdown Tick
  playCountdownTick(isFinal = false) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isFinal ? 1760 : 880, this.ctx.currentTime);

      gain.gain.setValueAtTime(isFinal ? 0.25 : 0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (isFinal ? 0.35 : 0.12));

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + (isFinal ? 0.36 : 0.13));
    } catch (e) { }
  }

  playCountdown(val) {
    this.playCountdownTick(val === 0);
  }

  // Thruster Pulse / Burst
  playThrusterPulse() {
    if (this.isMuted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.15);
    } catch (e) { }
  }

  // Continuous Rocket Engine Rumble
  startRocketRumble() {
    if (this.isMuted || !this.ctx || this.rocketRumbleNode) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      this.rocketRumbleNode = this.ctx.createBufferSource();
      this.rocketRumbleNode.buffer = buffer;
      this.rocketRumbleNode.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.rocketRumbleGain = this.ctx.createGain();
      this.rocketRumbleGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.rocketRumbleGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.0);

      this.rocketRumbleNode.connect(filter);
      filter.connect(this.rocketRumbleGain);
      this.rocketRumbleGain.connect(this.masterGain);

      this.rocketRumbleNode.start();
    } catch (e) { }
  }

  stopRocketRumble() {
    if (this.rocketRumbleGain && this.ctx) {
      try {
        this.rocketRumbleGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        setTimeout(() => {
          if (this.rocketRumbleNode) {
            this.rocketRumbleNode.stop();
            this.rocketRumbleNode.disconnect();
            this.rocketRumbleNode = null;
          }
        }, 400);
      } catch (e) { }
    }
  }

  playThrusterRumble() {
    this.startRocketRumble();
    setTimeout(() => this.stopRocketRumble(), 1600);
  }

  // Collectible Energy Item Pickup
  playCollect() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch (e) { }
  }

  // Ambient Space Drone
  startAmbientMusic() {
    if (this.ambientDroneOsc || !this.ctx) return;
    try {
      this.ambientDroneOsc = this.ctx.createOscillator();
      this.ambientDroneOsc.type = "sine";
      this.ambientDroneOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      this.ambientDroneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.musicGain);

      this.ambientDroneOsc.start();
    } catch (e) { }
  }
}

const sound = new SoundEngine();


// --- File: js\phaserEngine.js ---
// ============================================================================
// PHASER 3 SPACE ENGINE FOR JUNIOR ASTRONAUT MISSION TRAINER
// Procedural Earth with atmospheric Rayleigh scattering, day/night terminator,
// multi-layered parallax starfield, orbiting space station, and interactive FX
// ============================================================================

class SpaceScene extends Phaser.Scene {
  constructor() {
    super({ key: "SpaceScene" });
    this.stars = [];
    this.earthContainer = null;
    this.earthBase = null;
    this.clouds = null;
    this.nightLights = null;
    this.orbitStation = null;
    this.orbitAngle = 0;
    this.targetCameraZoom = 1.0;
    this.targetCameraX = 0;
    this.targetCameraY = 0;
    this.alertGlow = null;
    this.thrustParticles = null;
    this.pointerX = 0;
    this.pointerY = 0;
  }

  preload() {
    // Generate programmatic textures so no external asset files are required
    this.createProceduralTextures();
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // 1. Multi-layered Parallax Starfield
    this.createStarfield(width, height);

    // 2. Cosmic Dust & Shooting Stars
    this.createMeteors();

    // 3. Central Earth & Atmosphere Container
    this.createEarth(width, height);

    // 4. Orbiting Space Station (ISS / Gateway)
    this.createOrbitingStation(width, height);

    // 5. Alert Strobe Overlay for Emergency Diagnostics
    this.createAlertOverlay(width, height);

    // 6. Interactive Telemetry Particles on Click
    this.input.on("pointerdown", (pointer) => {
      this.spawnPulseRipple(pointer.x, pointer.y);
    });

    this.input.on("pointermove", (pointer) => {
      this.pointerX = (pointer.x / width - 0.5) * 2;
      this.pointerY = (pointer.y / height - 0.5) * 2;
    });

    // Handle Resize
    this.scale.on("resize", (gameSize) => {
      this.handleResize(gameSize.width, gameSize.height);
    });
  }

  update(time, delta) {
    const dt = delta / 1000;

    // Rotate Earth & Clouds
    if (this.earthContainer) {
      if (this.continents) {
        this.continents.rotation += 0.0008;
      }
      if (this.clouds) {
        this.clouds.rotation += 0.0013;
      }
      if (this.nightLights) {
        this.nightLights.rotation += 0.0008;
      }

      // Parallax response to mouse
      const targetOffsetEarthX = this.pointerX * 25;
      const targetOffsetEarthY = this.pointerY * 15;
      this.earthContainer.x += (this.earthBaseX + targetOffsetEarthX - this.earthContainer.x) * 0.05;
      this.earthContainer.y += (this.earthBaseY + targetOffsetEarthY - this.earthContainer.y) * 0.05;
    }

    // Orbiting Space Station motion
    if (this.orbitStation) {
      this.orbitAngle += 0.006;
      const rx = this.earthRadius * 1.55;
      const ry = this.earthRadius * 0.65;
      const stationX = this.earthContainer.x + Math.cos(this.orbitAngle) * rx;
      const stationY = this.earthContainer.y + Math.sin(this.orbitAngle) * ry - 30;

      this.orbitStation.x = stationX;
      this.orbitStation.y = stationY;

      // Depth sorting: station goes behind earth when in back half of orbit
      const isBehind = Math.sin(this.orbitAngle) < -0.1;
      this.orbitStation.setDepth(isBehind ? 2 : 12);
      this.orbitStation.setAlpha(isBehind ? 0.35 : 1.0);
    }

    // Twinkle Stars
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.sprite.x -= s.speedX * dt * 20;
      if (s.sprite.x < 0) s.sprite.x = this.scale.width;
      
      // subtle drift with mouse
      s.sprite.y += (s.baseY + this.pointerY * s.layer * 10 - s.sprite.y) * 0.02;
    }
  }

  // Generate crisp procedural graphic textures
  createProceduralTextures() {
    // 1. Star Texture
    if (!this.textures.exists("star_dot")) {
      const gStar = this.make.graphics({ x: 0, y: 0, add: false });
      gStar.fillStyle(0xffffff, 1);
      gStar.fillCircle(8, 8, 4);
      gStar.fillStyle(0x00e5ff, 0.4);
      gStar.fillCircle(8, 8, 8);
      gStar.generateTexture("star_dot", 16, 16);
      gStar.destroy();
    }

    // 2. Pulse Particle Texture
    if (!this.textures.exists("pulse_spark")) {
      const gSpark = this.make.graphics({ x: 0, y: 0, add: false });
      gSpark.fillStyle(0x00e5ff, 1);
      gSpark.fillCircle(4, 4, 3);
      gSpark.generateTexture("pulse_spark", 8, 8);
      gSpark.destroy();
    }
  }

  // Create multi-layer parallax starfield
  createStarfield(width, height) {
    const starCount = 220;
    const colors = [0xffffff, 0x00e5ff, 0x80d8ff, 0xffd54f, 0xb388ff];

    for (let i = 0; i < starCount; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const layer = Phaser.Math.Between(1, 3);
      const size = layer === 1 ? 0.25 : (layer === 2 ? 0.5 : 0.85);
      const alpha = Phaser.Math.FloatBetween(0.3, 0.95);
      const tint = colors[Phaser.Math.Between(0, colors.length - 1)];

      const starSprite = this.add.image(x, y, "star_dot");
      starSprite.setScale(size);
      starSprite.setAlpha(alpha);
      starSprite.setTint(tint);
      starSprite.setDepth(1);

      // Twinkle animation
      this.tweens.add({
        targets: starSprite,
        alpha: alpha * 0.3,
        duration: Phaser.Math.Between(1200, 3200),
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        delay: Phaser.Math.Between(0, 2000)
      });

      this.stars.push({
        sprite: starSprite,
        baseY: y,
        speedX: layer * 0.4,
        layer: layer
      });
    }
  }

  // Create procedural shooting stars
  createMeteors() {
    this.time.addEvent({
      delay: 4500,
      loop: true,
      callback: () => {
        if (Math.random() > 0.4) return;
        const startX = Phaser.Math.Between(this.scale.width * 0.2, this.scale.width);
        const startY = Phaser.Math.Between(0, this.scale.height * 0.4);
        const meteor = this.add.graphics();
        meteor.setDepth(2);

        meteor.lineStyle(2, 0x00e5ff, 0.8);
        meteor.lineBetween(0, 0, -60, -35);

        meteor.x = startX;
        meteor.y = startY;

        this.tweens.add({
          targets: meteor,
          x: startX - 250,
          y: startY + 140,
          alpha: 0,
          duration: 450,
          ease: "Power2",
          onComplete: () => meteor.destroy()
        });
      }
    });
  }

  // Create procedural realistic Earth
  createEarth(width, height) {
    this.earthContainer = this.add.container(0, 0);
    this.earthContainer.setDepth(5);

    // Position Earth prominently in the center-right background
    this.earthBaseX = width > 1100 ? width * 0.72 : width * 0.5;
    this.earthBaseY = height > 700 ? height * 0.48 : height * 0.52;
    this.earthRadius = Math.min(width, height) * 0.32;
    this.earthRadius = Math.max(160, Math.min(320, this.earthRadius));

    this.earthContainer.x = this.earthBaseX;
    this.earthContainer.y = this.earthBaseY;

    // 1. Atmosphere Rayleigh Scattering Glow (Outer Cyan Halo)
    const halo = this.add.graphics();
    halo.fillStyle(0x00e5ff, 0.12);
    halo.fillCircle(0, 0, this.earthRadius * 1.22);
    halo.fillStyle(0x00b0ff, 0.22);
    halo.fillCircle(0, 0, this.earthRadius * 1.09);
    halo.fillStyle(0x0288d1, 0.35);
    halo.fillCircle(0, 0, this.earthRadius * 1.03);
    this.earthContainer.add(halo);

    // 2. Earth Ocean Base Sphere
    this.earthBase = this.add.graphics();
    this.earthBase.fillStyle(0x09254d, 1);
    this.earthBase.fillCircle(0, 0, this.earthRadius);
    this.earthContainer.add(this.earthBase);

    // 3. Procedural Continent Landmasses
    this.continents = this.add.graphics();
    this.continents.fillStyle(0x1b5e20, 0.85); // lush green / deep land
    // Landmass shapes within radius
    const r = this.earthRadius;
    this.continents.fillCircle(r * 0.2, -r * 0.25, r * 0.45);
    this.continents.fillCircle(-r * 0.35, -r * 0.1, r * 0.38);
    this.continents.fillCircle(r * 0.3, r * 0.35, r * 0.32);
    this.continents.fillCircle(-r * 0.2, r * 0.4, r * 0.4);
    this.continents.fillStyle(0x388e3c, 0.9);
    this.continents.fillCircle(r * 0.15, -r * 0.15, r * 0.25);
    this.continents.fillCircle(-r * 0.1, r * 0.1, r * 0.3);

    // Mask continents to circle
    const maskShape = this.make.graphics();
    maskShape.fillCircle(this.earthBaseX, this.earthBaseY, r);
    const mask = maskShape.createGeometryMask();
    this.continents.setMask(mask);
    this.earthContainer.add(this.continents);

    // 4. Night Lights (Golden city clusters on shadow hemisphere)
    this.nightLights = this.add.graphics();
    this.nightLights.fillStyle(0xffd54f, 0.7);
    for (let n = 0; n < 35; n++) {
      const nx = Phaser.Math.Between(-r * 0.9, -r * 0.1);
      const ny = Phaser.Math.Between(-r * 0.8, r * 0.8);
      if (nx * nx + ny * ny < r * r * 0.85) {
        this.nightLights.fillCircle(nx, ny, Phaser.Math.Between(1, 2.5));
      }
    }
    this.nightLights.setMask(mask);
    this.earthContainer.add(this.nightLights);

    // 5. Day/Night Terminator Shading (Realistic sphere shading)
    const terminator = this.add.graphics();
    terminator.fillStyle(0x020712, 0.72);
    terminator.beginPath();
    terminator.arc(0, 0, r, Math.PI * 0.5, Math.PI * 1.5, false);
    terminator.arc(0, 0, r * 0.35, Math.PI * 1.5, Math.PI * 0.5, true);
    terminator.closePath();
    terminator.fillPath();
    terminator.setMask(mask);
    this.earthContainer.add(terminator);

    // 6. Swirling Cloud Atmosphere
    this.clouds = this.add.graphics();
    this.clouds.fillStyle(0xffffff, 0.32);
    this.clouds.fillCircle(r * 0.1, -r * 0.4, r * 0.28);
    this.clouds.fillCircle(-r * 0.3, r * 0.2, r * 0.35);
    this.clouds.fillCircle(r * 0.4, r * 0.1, r * 0.22);
    this.clouds.fillCircle(-r * 0.1, -r * 0.2, r * 0.4);
    this.clouds.setMask(mask);
    this.earthContainer.add(this.clouds);

    // 7. Specular Rim Sun Glow
    const rimGlow = this.add.graphics();
    rimGlow.lineStyle(4, 0x80d8ff, 0.5);
    rimGlow.beginPath();
    rimGlow.arc(0, 0, r - 2, -Math.PI * 0.3, Math.PI * 0.4, false);
    rimGlow.strokePath();
    this.earthContainer.add(rimGlow);
  }

  // Create high-tech space station
  createOrbitingStation(width, height) {
    this.orbitStation = this.add.container(0, 0);

    // Orbit ellipse path guide
    const orbitTrack = this.add.graphics();
    orbitTrack.lineStyle(1, 0x00e5ff, 0.18);
    orbitTrack.strokeEllipse(this.earthBaseX, this.earthBaseY - 30, this.earthRadius * 3.1, this.earthRadius * 1.3);
    orbitTrack.setDepth(3);

    // Space station body (Modular cylinders + Blue solar panels)
    const bodyG = this.add.graphics();
    // Solar array wings
    bodyG.fillStyle(0x00b0ff, 0.9);
    bodyG.fillRect(-24, -5, 14, 10);
    bodyG.fillRect(10, -5, 14, 10);
    bodyG.lineStyle(1, 0xffffff, 0.5);
    bodyG.strokeRect(-24, -5, 14, 10);
    bodyG.strokeRect(10, -5, 14, 10);

    // Center Hab Truss
    bodyG.fillStyle(0xe0e0e0, 1);
    bodyG.fillRect(-8, -3, 16, 6);
    bodyG.fillStyle(0x00e5ff, 0.8);
    bodyG.fillCircle(0, 0, 2);

    // Blinking avionics strobe light
    const strobe = this.add.circle(0, -6, 2, 0xff1744, 1);
    this.tweens.add({
      targets: strobe,
      alpha: 0.1,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    this.orbitStation.add([bodyG, strobe]);
    this.orbitStation.setDepth(12);
  }

  // Strobe overlay for emergency red alert diagnostics
  createAlertOverlay(width, height) {
    this.alertGlow = this.add.graphics();
    this.alertGlow.fillStyle(0xff1744, 0.2);
    this.alertGlow.fillRect(0, 0, width, height);
    this.alertGlow.setDepth(30);
    this.alertGlow.setAlpha(0);
  }

  // Pulse ring on click
  spawnPulseRipple(x, y) {
    const ring = this.add.graphics();
    ring.setDepth(20);
    ring.lineStyle(2, 0x00e5ff, 0.9);
    ring.strokeCircle(0, 0, 8);
    ring.x = x;
    ring.y = y;

    this.tweens.add({
      targets: ring,
      scaleX: 5,
      scaleY: 5,
      alpha: 0,
      duration: 650,
      ease: "Quad.easeOut",
      onComplete: () => ring.destroy()
    });
  }

  // Public methods triggered by Dashboard / Modals
  zoomToOrbit() {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1.25,
      duration: 800,
      ease: "Power2"
    });
  }

  resetZoom() {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1.0,
      duration: 800,
      ease: "Power2"
    });
  }

  triggerAlertPulse() {
    this.tweens.add({
      targets: this.alertGlow,
      alpha: 0.35,
      duration: 250,
      yoyo: true,
      repeat: 3,
      ease: "Sine.easeInOut"
    });
  }

  handleResize(width, height) {
    this.cameras.main.setSize(width, height);
    if (this.alertGlow) {
      this.alertGlow.clear();
      this.alertGlow.fillStyle(0xff1744, 0.2);
      this.alertGlow.fillRect(0, 0, width, height);
    }
  }
}

class PhaserSpaceEngine {
  constructor() {
    this.game = null;
    this.scene = null;
    this.isInitialized = false;
  }

  init(containerId = "phaser-bg-container") {
    if (this.isInitialized) return;

    const config = {
      type: Phaser.AUTO,
      parent: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
      backgroundColor: "transparent",
      physics: { default: "arcade" },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [SpaceScene]
    };

    try {
      this.game = new Phaser.Game(config);
      this.isInitialized = true;

      // Grab reference to scene once booted
      this.game.events.once("step", () => {
        this.scene = this.game.scene.getScene("SpaceScene");
      });
    } catch (e) {
      console.warn("Failed to initialize Phaser 3:", e);
    }
  }

  zoomOrbit() {
    if (this.scene && this.scene.zoomToOrbit) {
      this.scene.zoomToOrbit();
    }
  }

  resetZoom() {
    if (this.scene && this.scene.resetZoom) {
      this.scene.resetZoom();
    }
  }

  triggerAlert() {
    if (this.scene && this.scene.triggerAlertPulse) {
      this.scene.triggerAlertPulse();
    }
  }
}

const phaserEngine = new PhaserSpaceEngine();



// --- File: js\state.js ---
// ============================================================================
// GAME STATE MANAGER FOR JUNIOR ASTRONAUT MISSION TRAINER
// Central Reactive State: 8 Vitals, Screen Router, Objectives, Camp & Unlocks
// ============================================================================


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

const gameState = new GameStateManager();

if (typeof window !== "undefined") {
  window.gameState = gameState;
}


// --- File: js\mission.js ---
// ============================================================================
// mission.js — Earth <-> Moon/Mars Real-Time Mission Controller
// Real-time speed of light communications delay, solar power, radiation shielding,
// life support telemetry, and Deep Space Network uplink.
// ============================================================================

const C_KM_S = 299792.458;      // speed of light in km/s
const AU_KM = 149597870.7;
const MARS_SYNODIC_DAYS = 779.94;

const PHASES = ['PRELAUNCH', 'TRANSIT', 'ORBIT', 'DESCENT', 'LANDED'];

const DESTINATIONS = {
  moon: {
    name: 'Moon',
    transitDays: 3,
    descentSec: 12 * 60,
    distanceKm: () => 384400,
    surfaceTimeScale: 60,              // 1 real sec = 1 sim minute on surface
    radiationBase: 1.4,                // mSv/day (rough)
    resources: { power: 100, oxygen: 100, water: 100, food: 100, shielding: 40 },
  },
  mars: {
    name: 'Mars',
    transitDays: 210,
    descentSec: 7 * 60,
    // Circular-orbit approximation of Earth–Mars distance
    distanceKm: (simDays, phase0 = 0.8) => {
      const r1 = AU_KM, r2 = 1.524 * AU_KM;
      const th = phase0 + (2 * Math.PI * (simDays || 0)) / MARS_SYNODIC_DAYS;
      return Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(th));
    },
    surfaceTimeScale: 30,
    radiationBase: 0.7,
    resources: { power: 100, oxygen: 100, water: 100, food: 100, shielding: 30 },
  },
};

class Mission extends EventTarget {
  /**
   * @param {'moon'|'mars'} target
   * @param {{crew?:number, transitTimeScale?:number}} opts
   */
  constructor(target = 'moon', opts = {}) {
    super();
    this.targetId = target;
    this.dest = DESTINATIONS[target] || DESTINATIONS.moon;
    this.crew = opts.crew ?? 4;
    this.transitTimeScale = opts.transitTimeScale ?? 86400 / 4; // 1 real sec = 6 sim hours
    this.simSeconds = 0;
    this.timeScale = 1;
    this.phase = 'PRELAUNCH';
    this.phaseElapsed = 0;           // sim seconds in current phase
    this.res = { ...this.dest.resources };
    this.controls = { solarPanels: 1, rationing: 1, shielding: 0, heaters: 1 };
    this.toOutpost = [];             // Earth -> outpost (delayed commands)
    this.toEarth = [];               // outpost -> Earth (delayed telemetry)
    this.earthView = { ...this.res, t: 0 };  // what Earth sees (stale by light-time)
    this.events = [];
    this.alive = true;
    this._last = null;
    this._raf = null;
    this._flare = false;
    this._flareEnd = 0;
    this._dust = false;
    this._dustEnd = 0;
    this.radiation = this.dest.radiationBase;
  }

  // ---- geometry / comms ----
  get distanceKm() { return this.dest.distanceKm(this.simSeconds / 86400); }
  get lightDelaySec() { return this.distanceKm / C_KM_S; }

  // ---- lifecycle ----
  launch() {
    if (this.phase !== 'PRELAUNCH') return;
    this._setPhase('TRANSIT');
    this.timeScale = this.transitTimeScale;
    this._log('Launch! Crew en route to ' + this.dest.name);
  }

  start() {
    this._last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - this._last) / 1000, 0.25);
      this._last = now;
      this.tick(dt);
      if (this.alive) this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }
  
  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  tick(realDt) {
    if (this.phase === 'PRELAUNCH') return this._emit();
    const dt = realDt * this.timeScale;     // sim seconds
    this.simSeconds += dt;
    this.phaseElapsed += dt;

    this._advancePhase();
    this._deliverMessages();
    if (this.phase === 'LANDED') this._simulateOutpost(dt);
    this._emit();
  }

  _advancePhase() {
    const d = this.dest;
    if (this.phase === 'TRANSIT' && this.phaseElapsed >= d.transitDays * 86400) {
      this._setPhase('ORBIT');
      this.timeScale = 60;
      this._log('Entered ' + d.name + ' orbit. Preparing descent.');
    } else if (this.phase === 'ORBIT' && this.phaseElapsed >= 600) {
      this._setPhase('DESCENT');
      this.timeScale = 1;
      this._log('Descent burn started.');
    } else if (this.phase === 'DESCENT' && this.phaseElapsed >= d.descentSec) {
      this._setPhase('LANDED');
      this.timeScale = d.surfaceTimeScale;
      this._log('TOUCHDOWN on ' + d.name + '! Outpost mission is LIVE.');
      this.dispatchEvent(new CustomEvent('landed', { detail: this.snapshot() }));
    }
  }

  // ---- Earth -> outpost commands (arrive after light delay) ----
  sendCommand(name, value) {
    const delay = this.lightDelaySec;
    const packet = { name, value, arriveAt: this.simSeconds + delay };
    this.toOutpost.push(packet);
    this._log(`Command "${name}=${value}" sent from Earth (arrives in ${fmtDelay(delay)})`);
    return packet;
  }

  _deliverMessages() {
    for (const m of this.toOutpost.filter(m => m.arriveAt <= this.simSeconds)) {
      if (m.name in this.controls) this.controls[m.name] = m.value;
      this._log(`Outpost received: ${m.name}=${m.value}`);
    }
    this.toOutpost = this.toOutpost.filter(m => m.arriveAt > this.simSeconds);

    for (const t of this.toEarth.filter(t => t.arriveAt <= this.simSeconds)) {
      this.earthView = t.data;       // Earth only sees the delayed packet
    }
    this.toEarth = this.toEarth.filter(t => t.arriveAt > this.simSeconds);
  }

  // ---- real-time outpost simulation ----
  _simulateOutpost(dt) {
    const days = dt / 86400, r = this.res, c = this.controls;
    const ration = c.rationing;

    // power: solar gen minus load (heaters, life support)
    const gen = 30 * c.solarPanels * this._sunFactor();
    const load = 8 + 6 * c.heaters + this.crew * 2.5;
    r.power = clamp(r.power + (gen - load) * days * 2, 0, 100);

    const lowPower = r.power < 10 ? 0.5 : 1;       // life support degrades
    r.oxygen = clamp(r.oxygen - (this.crew * 0.9 * days * 1.2) * ration + 1.0 * days * lowPower, 0, 100);
    r.water  = clamp(r.water  - (this.crew * 0.6 * days) * ration + 0.5 * days * lowPower, 0, 100);
    r.food   = clamp(r.food   - (this.crew * 0.8 * days) * ration, 0, 100);

    // radiation: higher with low shielding; flares add spikes
    r.shielding = clamp(r.shielding + c.shielding * 2 * days, 0, 100);
    this.radiation = this.dest.radiationBase * (1.6 - r.shielding / 100) * (this._flare ? 8 : 1);

    this._randomEvents(dt);

    // telemetry packet to Earth (delayed by light-time)
    this.toEarth.push({
      arriveAt: this.simSeconds + this.lightDelaySec,
      data: { ...r, radiation: this.radiation, t: this.simSeconds },
    });

    if (r.oxygen <= 0 || r.water <= 0 || r.food <= 0) this._fail('Life support depleted.');
  }

  _sunFactor() {
    const cycle = this.targetId === 'moon' ? 29.5 * 86400 : 88642;   // lunar day / sol
    const x = (this.simSeconds % cycle) / cycle;
    const base = Math.max(0, Math.sin(x * 2 * Math.PI));            // night = 0
    return this._dust ? base * 0.25 : base;
  }

  _randomEvents(dt) {
    const p = dt / 86400;
    if (!this._flare && Math.random() < 0.05 * p) {
      this._flare = true;
      this._flareEnd = this.simSeconds + 6 * 3600;
      this._log('ALERT: Solar flare! Raise shielding.');
      this._alert('solar_flare');
    }
    if (this._flare && this.simSeconds > this._flareEnd) {
      this._flare = false;
      this._log('Solar flare over.');
    }

    if (this.targetId === 'mars') {
      if (!this._dust && Math.random() < 0.08 * p) {
        this._dust = true;
        this._dustEnd = this.simSeconds + 5 * 86400;
        this._log('ALERT: Dust storm, solar output reduced.');
        this._alert('dust_storm');
      }
      if (this._dust && this.simSeconds > this._dustEnd) {
        this._dust = false;
        this._log('Dust storm cleared.');
      }
    }
  }

  // ---- helpers ----
  snapshot() {
    return {
      target: this.dest.name,
      phase: this.phase,
      simDays: this.simSeconds / 86400,
      distanceKm: this.distanceKm,
      lightDelaySec: this.lightDelaySec,
      outpost: { ...this.res, radiation: this.radiation ?? 0 },   // ground truth
      earthView: this.earthView,                                  // delayed view
      controls: { ...this.controls },
      pendingCommands: this.toOutpost.length,
      alive: this.alive,
    };
  }

  _emit() { this.dispatchEvent(new CustomEvent('update', { detail: this.snapshot() })); }
  _setPhase(p) { this.phase = p; this.phaseElapsed = 0; this.dispatchEvent(new CustomEvent('phase', { detail: p })); }
  _log(msg) { const e = { t: this.simSeconds, msg }; this.events.push(e); this.dispatchEvent(new CustomEvent('log', { detail: e })); }
  _alert(type) { this.dispatchEvent(new CustomEvent('alert', { detail: type })); }
  _fail(why) { this.alive = false; this._log('MISSION FAILED: ' + why); this.dispatchEvent(new CustomEvent('failed', { detail: why })); }
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const fmtDelay = (s) => s < 60 ? `${s.toFixed(1)} s` : `${(s / 60).toFixed(1)} min`;

if (typeof window !== "undefined") {
  window.Mission = Mission;
  window.fmtDelay = fmtDelay;
  window.DESTINATIONS = DESTINATIONS;
  window.PHASES = PHASES;
}



// --- File: js\components\nasaModal.js ---
// ============================================================================
// NASA LIVE FEEDS MODAL COMPONENT
// Real-Time Data from NASA APIs: ISS, DONKI Space Weather, NeoWs Asteroids,
// Curiosity Mars Rover Camera & Astronomy Picture of the Day (APOD)
// ============================================================================


class NasaModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.activeTab = "iss"; // 'iss', 'solar', 'asteroids', 'mars', 'apod'
    this.data = {
      iss: null,
      solar: null,
      asteroids: [],
      mars: [],
      apod: null
    };
  }

  updateData(type, payload) {
    this.data[type] = payload;
    if (this.isOpen) {
      this.render();
    }
  }

  open(tab = "iss") {
    this.isOpen = true;
    this.activeTab = tab;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const d = this.data;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large nasa-live-modal">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🛰️</span>
              <div>
                <h2>NASA Deep Space Network • Live Science Feeds</h2>
                <div class="modal-subtitle">Real-Time Telemetry from api.nasa.gov & wheretheiss.at</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-nasa-modal" aria-label="Close NASA Feeds">✕</button>
          </div>

          <!-- Tab Bar -->
          <div class="nasa-tabs-bar">
            <button class="nasa-tab-btn ${this.activeTab === 'iss' ? 'active' : ''}" data-tab="iss">
              <span>🛰️ ISS Live Tracker</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'solar' ? 'active' : ''}" data-tab="solar">
              <span>☀️ Space Weather</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'asteroids' ? 'active' : ''}" data-tab="asteroids">
              <span>☄️ Asteroid Radar</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'mars' ? 'active' : ''}" data-tab="mars">
              <span>🔴 Mars Rover Cam</span>
            </button>
            <button class="nasa-tab-btn ${this.activeTab === 'apod' ? 'active' : ''}" data-tab="apod">
              <span>🌌 Space Photo (APOD)</span>
            </button>
          </div>

          <div class="modal-body nasa-tab-body">
            ${this.renderActiveTabContent()}
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              Data Source: <strong style="color: var(--border-cyan);">NASA Open Data API</strong> • Free Student Access
            </div>
            <button class="btn-primary" id="btn-done-nasa">
              <span>Return to Flight Deck</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case "iss":
        return this.renderISSTab();
      case "solar":
        return this.renderSolarTab();
      case "asteroids":
        return this.renderAsteroidsTab();
      case "mars":
        return this.renderMarsTab();
      case "apod":
        return this.renderAPODTab();
      default:
        return this.renderISSTab();
    }
  }

  renderISSTab() {
    const iss = this.data.iss;
    if (!iss) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🛰️</div>
          <p>Connecting to International Space Station orbital beacon...</p>
        </div>
      `;
    }

    const latHemi = iss.lat >= 0 ? "N" : "S";
    const lonHemi = iss.lon >= 0 ? "E" : "W";

    return `
      <div class="nasa-card-grid">
        <div class="nasa-telemetry-hero">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 0.82rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800;">
              INTERNATIONAL SPACE STATION (NORAD #25544)
            </span>
            <span class="nasa-live-pill">● LIVE ORBIT</span>
          </div>

          <div class="nasa-iss-readouts">
            <div class="iss-stat-cell">
              <span class="iss-label">CURRENT LATITUDE</span>
              <strong class="iss-val">${Math.abs(iss.lat).toFixed(4)}° ${latHemi}</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">CURRENT LONGITUDE</span>
              <strong class="iss-val">${Math.abs(iss.lon).toFixed(4)}° ${lonHemi}</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">ORBITAL ALTITUDE</span>
              <strong class="iss-val" style="color: var(--border-cyan);">${Math.round(iss.altitudeKm).toLocaleString()} km</strong>
            </div>
            <div class="iss-stat-cell">
              <span class="iss-label">GROUND SPEED</span>
              <strong class="iss-val" style="color: var(--text-highlight);">${Math.round(iss.speedKmh).toLocaleString()} km/h</strong>
            </div>
          </div>

          <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.4); border-radius: 8px; font-size: 0.82rem; line-height: 1.45; color: #cfd8dc;">
            <strong>NASA Flight Dynamics Note:</strong> The ISS orbits Earth approximately once every 92 minutes at 7.66 km/s, allowing crew members to witness 16 sunrises and sunsets every 24 Earth hours!
          </div>
        </div>
      </div>
    `;
  }

  renderSolarTab() {
    const s = this.data.solar;
    if (!s) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">☀️</div>
          <p>Querying NASA DONKI Space Weather Database (FLR)...</p>
        </div>
      `;
    }

    return `
      <div class="nasa-telemetry-hero">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 0.82rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800;">
            NASA DONKI • SPACE WEATHER & SOLAR ACTIVITY
          </span>
          <span class="nasa-live-pill ${s.active ? 'pill-alert' : 'pill-nominal'}">
            ${s.active ? '⚠ SOLAR ALERT' : '● NOMINAL'}
          </span>
        </div>

        <div class="nasa-iss-readouts">
          <div class="iss-stat-cell">
            <span class="iss-label">SOLAR STORM STATUS</span>
            <strong class="iss-val" style="color: ${s.active ? 'var(--accent-red)' : 'var(--text-highlight)'};">
              ${s.active ? 'ACTIVE SOLAR FLARE' : 'CALM / NOMINAL'}
            </strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">STRONGEST RECENT FLARE</span>
            <strong class="iss-val">${s.strongest ? `Class ${s.strongest}` : 'Class B / C (Minor)'}</strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">FLARES DETECTED (72H)</span>
            <strong class="iss-val" style="color: var(--border-cyan);">${s.count || 0} Recorded</strong>
          </div>
          <div class="iss-stat-cell">
            <span class="iss-label">TELEMETRY IMPACT</span>
            <strong class="iss-val" style="color: ${s.active ? 'var(--accent-gold)' : 'var(--text-highlight)'};">
              ${s.active ? 'Power Regulation Alert' : 'Vitals Nominal'}
            </strong>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.4); border-radius: 8px; font-size: 0.82rem; line-height: 1.45; color: #cfd8dc;">
          <strong>Educational Context:</strong> Solar flares are classified by X-ray strength: A, B, and C are minor background emissions, while M and X flares can cause coronal mass ejections (CMEs) that interact with Earth's magnetosphere, producing auroras and impacting satellite electronics.
        </div>
      </div>
    `;
  }

  renderAsteroidsTab() {
    const list = this.data.asteroids || [];
    if (!list.length) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">☄️</div>
          <p>Querying NASA NeoWs Planetary Defense Asteroid Radar...</p>
        </div>
      `;
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #fff;">
            Near-Earth Objects Passing Earth Today (${list.length} Tracked by NASA)
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Source: NASA JPL SSD / NeoWs</span>
        </div>

        <div class="nasa-asteroid-grid">
          ${list.slice(0, 8).map(a => `
            <div class="asteroid-card ${a.hazardous ? 'hazardous' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #fff; font-size: 0.9rem;">☄️ ${a.name.replace(/[()]/g, '')}</strong>
                ${a.hazardous ? '<span class="badge-hazard">POTENTIALLY HAZARDOUS</span>' : '<span class="badge-safe">SAFE DISTANCE</span>'}
              </div>
              <div class="asteroid-metrics">
                <div>
                  <span class="ast-label">MISS DISTANCE</span>
                  <div class="ast-val">${a.missKm.toLocaleString()} km</div>
                </div>
                <div>
                  <span class="ast-label">MAX DIAMETER</span>
                  <div class="ast-val" style="color: var(--accent-gold);">${a.diameterM} meters</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderMarsTab() {
    const photos = this.data.mars || [];
    if (!photos.length) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🔴</div>
          <p>Downloading latest telemetry photos from Curiosity Rover on Mars...</p>
        </div>
      `;
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #fff;">
            NASA Curiosity Rover • Latest Extraterrestrial Surface Photos
          </span>
          <span style="font-size: 0.75rem; color: var(--accent-gold);">Transmitted via Mars Reconnaissance Orbiter</span>
        </div>

        <div class="nasa-mars-grid">
          ${photos.map(p => `
            <div class="mars-photo-card">
              <div class="mars-img-container">
                <img src="${p.url}" alt="${p.caption}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔴</text></svg>'">
              </div>
              <div class="mars-photo-caption">
                <strong>${p.caption}</strong>
                ${p.date ? `<span>Earth Date: ${p.date}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderAPODTab() {
    const apod = this.data.apod;
    if (!apod) {
      return `
        <div class="nasa-loading-box">
          <div class="nasa-spinner">🌌</div>
          <p>Fetching NASA Astronomy Picture of the Day...</p>
        </div>
      `;
    }

    return `
      <div class="apod-container">
        <div class="apod-image-side">
          ${apod.isImage 
            ? `<img src="${apod.url}" alt="${apod.title}" class="apod-img" onerror="this.style.display='none'">` 
            : `<iframe src="${apod.url}" class="apod-frame" frameborder="0"></iframe>`}
        </div>
        <div class="apod-info-side">
          <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 800; text-transform: uppercase;">
            Astronomy Picture of the Day ${apod.date ? `• ${apod.date}` : ''}
          </div>
          <h3 style="color: #fff; font-size: 1.15rem; margin: 4px 0 10px 0;">${apod.title}</h3>
          <p class="apod-desc">${apod.explanation}</p>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-nasa-modal");
    const doneBtn = this.container.querySelector("#btn-done-nasa");

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    if (doneBtn) {
      doneBtn.addEventListener("click", () => this.close());
    }

    // Tab buttons
    this.container.querySelectorAll(".nasa-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = btn.getAttribute("data-tab");
        this.render();
      });
    });
  }
}



// --- File: js\components\rocketSelectModal.js ---
// ============================================================================
// ROCKET SELECTION MODAL COMPONENT
// Select between 4 heavy exploration rockets, affecting Fuel, Cargo & Readiness
// ============================================================================





class RocketSelectModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
    phaserEngine.zoomOrbit();
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    this.isOpen = false;
    phaserEngine.resetZoom();
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const currentRocketId = s.selectedRocket;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🚀</span>
              <div>
                <h2>Spacecraft Hangar & Propulsion Bay</h2>
                <div class="modal-subtitle">NASA Exploration Ground Systems • Vehicle Assembly Building</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-rocket-modal" aria-label="Close Hangar">✕</button>
          </div>

          <div class="modal-body">
            <p class="modal-intro">
              Select your primary exploration launch vehicle. Rocket mass, tank capacity, and cargo bay specs directly calibrate your <strong>Rocket Fuel</strong>, <strong>Cargo Capacity</strong>, and overall <strong>Mission Readiness</strong>.
            </p>

            <div class="rocket-grid">
              ${Object.values(GAME_CONFIG.ROCKETS).map(r => this.renderRocketCard(r, r.id === currentRocketId)).join("")}
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Current Spacecraft: <strong>${GAME_CONFIG.ROCKETS[currentRocketId]?.name || "SLS"}</strong></span>
              <span>Propellant Reserve: <strong>${s.telemetry.rocketFuel}%</strong></span>
              <span>Cargo Allocation: <strong>${s.telemetry.cargoCapacity}%</strong></span>
            </div>
            <button class="btn-primary" id="btn-confirm-rocket">
              <span>Lock Spacecraft Selection</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderRocketCard(rocket, isSelected) {
    return `
      <div class="rocket-card ${isSelected ? 'selected' : ''}" data-rocket-id="${rocket.id}">
        <div class="rocket-card-header">
          <span class="rocket-badge">${rocket.badge}</span>
          <div>
            <h3>${rocket.name}</h3>
            <span class="rocket-category">${rocket.category}</span>
          </div>
          ${isSelected ? '<span class="chip-active">ACTIVE VEHICLE</span>' : ''}
        </div>

        <div class="rocket-svg-preview">
          ${this.getRocketSvg(rocket.id)}
        </div>

        <div class="rocket-stats-grid">
          <div class="rocket-stat-item">
            <span class="stat-label">Propellant Cap</span>
            <span class="stat-val" style="color: var(--meter-fuel);">${rocket.fuelCapacity}%</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Cargo Bay</span>
            <span class="stat-val" style="color: var(--meter-oxygen);">${rocket.cargoCapacity}%</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Sea-Level Thrust</span>
            <span class="stat-val">${rocket.thrustKn}</span>
          </div>
          <div class="rocket-stat-item">
            <span class="stat-label">Max Payload</span>
            <span class="stat-val">${rocket.payloadTons}</span>
          </div>
        </div>

        <p class="rocket-desc">${rocket.description}</p>

        <button class="btn-select-rocket ${isSelected ? 'btn-selected' : 'btn-secondary'}" data-rocket-id="${rocket.id}">
          ${isSelected ? '✓ Selected Vehicle' : 'Select This Rocket'}
        </button>
      </div>
    `;
  }

  getRocketSvg(id) {
    if (id === "sls") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <rect x="42" y="15" width="16" height="95" fill="#f57c00" rx="3" stroke="#e65100" stroke-width="1.5"/>
          <polygon points="50,5 42,20 58,20" fill="#ffffff" stroke="#b0bec5"/>
          <rect x="44" y="22" width="12" height="10" fill="#0b3d91"/>
          <!-- Boosters -->
          <rect x="30" y="35" width="10" height="75" fill="#ffffff" rx="2" stroke="#cfd8dc"/>
          <polygon points="35,28 30,36 40,36" fill="#ffffff"/>
          <rect x="60" y="35" width="10" height="75" fill="#ffffff" rx="2" stroke="#cfd8dc"/>
          <polygon points="65,28 60,36 70,36" fill="#ffffff"/>
          <!-- Engines -->
          <polygon points="44,110 40,122 60,122 56,110" fill="#37474f"/>
          <!-- Flame -->
          <polygon points="46,122 50,140 54,122" fill="#00e5ff" opacity="0.8"/>
        </svg>
      `;
    } else if (id === "falcon_heavy") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Triple Core -->
          <rect x="44" y="20" width="12" height="90" fill="#ffffff" rx="2" stroke="#90a4ae"/>
          <rect x="30" y="35" width="12" height="75" fill="#f5f5f5" rx="2" stroke="#90a4ae"/>
          <rect x="58" y="35" width="12" height="75" fill="#f5f5f5" rx="2" stroke="#90a4ae"/>
          <polygon points="50,8 44,22 56,22" fill="#ffffff" stroke="#90a4ae"/>
          <!-- Grid Fins -->
          <rect x="28" y="40" width="4" height="6" fill="#37474f"/>
          <rect x="68" y="40" width="4" height="6" fill="#37474f"/>
          <!-- Engines -->
          <polygon points="32,110 30,120 42,120 40,110" fill="#37474f"/>
          <polygon points="46,110 44,120 56,120 54,110" fill="#37474f"/>
          <polygon points="60,110 58,120 70,120 68,110" fill="#37474f"/>
        </svg>
      `;
    } else if (id === "saturn_v") {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Saturn V Classic Apollo -->
          <rect x="40" y="25" width="20" height="85" fill="#ffffff" stroke="#37474f" stroke-width="1.5"/>
          <!-- Black and White roll pattern -->
          <rect x="40" y="45" width="10" height="25" fill="#212121"/>
          <rect x="50" y="70" width="10" height="20" fill="#212121"/>
          <!-- Escape Tower -->
          <line x1="50" y1="2" x2="50" y2="15" stroke="#ff3d00" stroke-width="2"/>
          <polygon points="50,15 42,26 58,26" fill="#ffffff" stroke="#37474f"/>
          <!-- Fins -->
          <polygon points="40,95 28,112 40,110" fill="#ffffff" stroke="#37474f"/>
          <polygon points="60,95 72,112 60,110" fill="#ffffff" stroke="#37474f"/>
          <!-- F-1 Engines -->
          <polygon points="42,110 38,124 62,124 58,110" fill="#263238"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 100 150" class="rocket-svg">
          <!-- Starship Stainless Steel -->
          <path d="M50 8 C40 25 38 105 38 115 L62 115 C62 105 60 25 50 8 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1.5"/>
          <circle cx="50" cy="35" r="5" fill="#00e5ff" opacity="0.8"/>
          <!-- Heat Shield Half -->
          <path d="M50 8 C40 25 38 105 38 115 L50 115 Z" fill="#263238" opacity="0.35"/>
          <!-- Forward Flaps -->
          <polygon points="38,25 24,35 38,40" fill="#90a4ae"/>
          <polygon points="62,25 76,35 62,40" fill="#90a4ae"/>
          <!-- Aft Flaps -->
          <polygon points="38,95 20,115 38,115" fill="#90a4ae"/>
          <polygon points="62,95 80,115 62,115" fill="#90a4ae"/>
          <!-- Raptor Engines -->
          <polygon points="43,115 40,125 60,125 57,115" fill="#37474f"/>
        </svg>
      `;
    }
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-rocket-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-rocket");

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

    // Rocket Cards & Select Buttons
    this.container.querySelectorAll(".rocket-card, .btn-select-rocket").forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const rocketId = el.getAttribute("data-rocket-id");
        if (!rocketId) return;

        sound.playAdjustTone(true);
        gameState.selectRocket(rocketId);
        this.render(); // Re-render to show new active vehicle
      });
    });
  }
}



// --- File: js\components\astronautPrepModal.js ---
// ============================================================================
// ASTRONAUT PREPARATION MODAL COMPONENT
// Crew selection, biometric scans, spacesuit calibration & physical training
// Direct impact on Astronaut Health, Oxygen Reserve & Mission Readiness
// ============================================================================




class AstronautPrepModal {
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
    const currentAstronaut = GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut] || GAME_CONFIG.ASTRONAUTS.alex;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">👨‍🚀</span>
              <div>
                <h2>Crew Quarters & Biomedical Station</h2>
                <div class="modal-subtitle">NASA Johnson Space Center • Astronaut Medical Operations</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-astronaut-modal" aria-label="Close Station">✕</button>
          </div>

          <div class="modal-body">
            <div class="astronaut-layout">
              <!-- Left: Crew Candidate Cards -->
              <div class="crew-column">
                <h3 class="section-title">Select Mission Commander</h3>
                <div class="crew-cards-list">
                  ${Object.values(GAME_CONFIG.ASTRONAUTS).map(a => this.renderCrewCard(a, a.id === s.selectedAstronaut)).join("")}
                </div>
              </div>

              <!-- Right: Biometric Vitals & Pre-Flight Calibrations -->
              <div class="prep-column">
                <h3 class="section-title">Biomedical Status & Calibrations</h3>
                
                <div class="bio-status-card">
                  <div class="bio-header">
                    <div class="bio-avatar">${currentAstronaut.avatar}</div>
                    <div>
                      <h4>${currentAstronaut.name}</h4>
                      <div class="bio-role">${currentAstronaut.role}</div>
                      <div class="bio-vitals-row">
                        <span>Resting Pulse: <strong>68 BPM</strong></span>
                        <span>Blood Oxygen: <strong>99% SpO2</strong></span>
                        <span>Radiation Dose: <strong>0.08 mSv</strong></span>
                      </div>
                    </div>
                  </div>

                  <div class="vitals-progress-box">
                    <div class="vitals-label-row">
                      <span>Crew Physical Readiness</span>
                      <strong style="color: var(--meter-health);">${s.telemetry.astronautHealth}%</strong>
                    </div>
                    <div class="meter-track">
                      <div class="meter-fill" style="width: ${s.telemetry.astronautHealth}%; background: var(--meter-health);"></div>
                    </div>
                  </div>
                </div>

                <!-- Interactive Preparation Procedures -->
                <div class="calibration-procedures">
                  <h4>Pre-Flight Physiological Procedures</h4>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🫀 Full Biometric Scan</strong>
                      <p>Run diagnostic ultrasound, blood gas calibration, and ECG.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-run-bioscan">
                      <span>Scan (+3% Health)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🛡️ Spacesuit Sensor Zeroing</strong>
                      <p>Calibrate hermetic seals and internal biometric sensors.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-calibrate-suit">
                      <span>Calibrate (+5% Health)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🫁 Hyperbaric Pre-Breathe</strong>
                      <p>Denitrogenate bloodstream with pure oxygen to prevent decompression sickness.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-prebreathe-o2">
                      <span>Pre-Breathe (+5% O2)</span>
                    </button>
                  </div>

                  <div class="procedure-item">
                    <div class="proc-info">
                      <strong>🧪 Electrolyte & Nutrient Hydration</strong>
                      <p>Infuse balanced electrolyte solution to fortify cardiovascular stamina.</p>
                    </div>
                    <button class="btn-secondary btn-proc" id="btn-infuse-nutrients">
                      <span>Hydrate (+4% Water)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Active Commander: <strong>${currentAstronaut.name}</strong></span>
              <span>Astronaut Health: <strong>${s.telemetry.astronautHealth}%</strong></span>
              <span>Mission Readiness: <strong>${s.missionReadiness}%</strong></span>
            </div>
            <button class="btn-primary" id="btn-confirm-astronaut">
              <span>Certification Approved</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderCrewCard(a, isSelected) {
    return `
      <div class="crew-card ${isSelected ? 'selected' : ''}" data-crew-id="${a.id}">
        <div class="crew-card-avatar">${a.avatar}</div>
        <div class="crew-card-content">
          <div class="crew-name-row">
            <h4>${a.name}</h4>
            ${isSelected ? '<span class="chip-active">COMMANDER</span>' : ''}
          </div>
          <div class="crew-role">${a.role}</div>
          <div class="crew-bio">${a.bio}</div>
          <div class="crew-bonus-row">
            <span class="bonus-tag">❤️ +${a.healthBonus}% Health</span>
            <span class="bonus-tag">🫁 +${a.oxygenBonus}% O₂ Bonus</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-astronaut-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-astronaut");

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

    // Select Astronaut Cards
    this.container.querySelectorAll(".crew-card").forEach(card => {
      card.addEventListener("click", () => {
        const crewId = card.getAttribute("data-crew-id");
        if (!crewId) return;

        sound.playAdjustTone(true);
        gameState.selectAstronaut(crewId);
        this.render();
      });
    });

    // Procedures
    const bioScanBtn = this.container.querySelector("#btn-run-bioscan");
    if (bioScanBtn) {
      bioScanBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("astronautHealth", 3);
        this.showToast("Biometric Scan Complete: +3% Astronaut Health!");
        this.render();
      });
    }

    const suitBtn = this.container.querySelector("#btn-calibrate-suit");
    if (suitBtn) {
      suitBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("astronautHealth", 5);
        this.showToast("Suit Seals Pressurized: +5% Astronaut Health!");
        this.render();
      });
    }

    const o2Btn = this.container.querySelector("#btn-prebreathe-o2");
    if (o2Btn) {
      o2Btn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("oxygen", 5);
        this.showToast("Hyperbaric Pre-Breathe Complete: +5% Oxygen Reserve!");
        this.render();
      });
    }

    const nutrientBtn = this.container.querySelector("#btn-infuse-nutrients");
    if (nutrientBtn) {
      nutrientBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.adjustMetric("water", 4);
        gameState.adjustMetric("food", 3);
        this.showToast("Nutrient Hydration Absorbed: +4% Water, +3% Food!");
        this.render();
      });
    }
  }

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "prep-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2400);
  }
}



// --- File: js\components\missionBriefingModal.js ---
// ============================================================================
// MISSION BRIEFING MODAL COMPONENT
// Target destination selection, orbital flight plan & mission duration adjuster
// Direct impact on Mission Duration, Logistics Requirements & Mission Readiness
// ============================================================================




class MissionBriefingModal {
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
    const currentDest = GAME_CONFIG.DESTINATIONS[s.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;
    const duration = s.telemetry.missionDuration;

    // Logistics consumption projection based on planned days
    const dailyO2 = 0.5;
    const dailyWater = 0.6;
    const dailyFood = 0.45;

    const estO2Needed = Math.min(100, Math.round(duration * dailyO2));
    const estWaterNeeded = Math.min(100, Math.round(duration * dailyWater));
    const estFoodNeeded = Math.min(100, Math.round(duration * dailyFood));

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">📋</span>
              <div>
                <h2>NASA Flight Operations • Mission Briefing</h2>
                <div class="modal-subtitle">Flight Dynamics Office • Mission Trajectory & Logistics Matrix</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-briefing-modal" aria-label="Close Briefing">✕</button>
          </div>

          <div class="modal-body">
            <!-- Destination Selector Row -->
            <div class="dest-brief-selector">
              <h3 class="section-title">Select Planetary Destination</h3>
              <div class="dest-brief-cards">
                ${Object.values(GAME_CONFIG.DESTINATIONS).map(d => this.renderDestCard(d, d.id === s.selectedDestination)).join("")}
              </div>
            </div>

            <!-- Target Flight Specs & Orbit Grid -->
            <div class="briefing-specs-grid">
              <div class="spec-card">
                <span class="spec-icon">🌍 ➔ ${currentDest.icon}</span>
                <span class="spec-name">Distance to Target</span>
                <span class="spec-value">${currentDest.distance}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">⚖️</span>
                <span class="spec-name">Surface Gravity</span>
                <span class="spec-value">${currentDest.gravity}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">⚠️</span>
                <span class="spec-name">Primary Hazard</span>
                <span class="spec-value" style="font-size: 0.82rem;">${currentDest.hazard}</span>
              </div>
              <div class="spec-card">
                <span class="spec-icon">🚀</span>
                <span class="spec-name">Launch Window</span>
                <span class="spec-value" style="color: var(--text-highlight);">${currentDest.launchWindow}</span>
              </div>
            </div>

            <!-- Flight Plan Text -->
            <div class="mission-narrative-box">
              <h4>Directives from Flight Director Stella:</h4>
              <p>${currentDest.briefing}</p>
            </div>

            <!-- Mission Duration Slider & Logistics Calculator -->
            <div class="duration-control-section">
              <div class="duration-header-row">
                <div>
                  <h4>Planned Mission Duration</h4>
                  <p>Calibrate target mission flight days to balance supply margins.</p>
                </div>
                <div class="duration-display-badge">
                  <span id="duration-val-text">${duration}</span> Days
                </div>
              </div>

              <div class="slider-container">
                <input type="range" min="7" max="180" step="1" value="${duration}" id="slider-mission-duration" class="nasa-range-slider">
                <div class="slider-ticks">
                  <span>7d (Lunar Orbit)</span>
                  <span>14d (Artemis Camp)</span>
                  <span>60d (Near Earth Orbit)</span>
                  <span>90d (Mars Transfer)</span>
                  <span>180d (Deep Space Voyager)</span>
                </div>
              </div>

              <!-- Projected Supply Sufficiency Bar -->
              <div class="logistics-preview-box">
                <h5>ECLSS Supply Sufficiency for ${duration} Days:</h5>
                <div class="logistics-bars-row">
                  <div class="log-item">
                    <span>Oxygen (Est: ${estO2Needed}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.oxygen / Math.max(1, estO2Needed)) * 100)}%; background: var(--meter-oxygen);"></div>
                    </div>
                  </div>
                  <div class="log-item">
                    <span>Water (Est: ${estWaterNeeded}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.water / Math.max(1, estWaterNeeded)) * 100)}%; background: var(--meter-water);"></div>
                    </div>
                  </div>
                  <div class="log-item">
                    <span>Food (Est: ${estFoodNeeded}%)</span>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${Math.min(100, (s.telemetry.food / Math.max(1, estFoodNeeded)) * 100)}%; background: var(--meter-food);"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Target: <strong>${currentDest.name}</strong></span>
              <span>Duration: <strong>${duration} Days</strong></span>
              <span>Mission Readiness: <strong>${s.missionReadiness}%</strong></span>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="btn-secondary" id="btn-confirm-briefing">
                <span>Save Directives</span>
              </button>
              <button class="btn-primary" id="btn-proceed-prep">
                <span>Proceed to Rocket Selection 🛸</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderDestCard(d, isSelected) {
    return `
      <div class="dest-brief-card ${isSelected ? 'selected' : ''}" data-dest-id="${d.id}">
        <div class="dest-brief-icon">${d.icon}</div>
        <div class="dest-brief-info">
          <h4>${d.name}</h4>
          <span class="dest-dist">${d.distance}</span>
          ${isSelected ? '<span class="chip-active">TARGET DESTINATION</span>' : ''}
        </div>
      </div>
    `;
  }

  attachEvents() {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-briefing-modal");
    const confirmBtn = this.container.querySelector("#btn-confirm-briefing");
    const proceedBtn = this.container.querySelector("#btn-proceed-prep");
    const slider = this.container.querySelector("#slider-mission-duration");

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

    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        this.close();
        sound.playSuccessChime();
        gameState.setScreen("rocket_select");
      });
    }

    // Select Destination Card
    this.container.querySelectorAll(".dest-brief-card").forEach(card => {
      card.addEventListener("click", () => {
        const destId = card.getAttribute("data-dest-id");
        if (!destId) return;

        sound.playAdjustTone(true);
        gameState.selectDestination(destId);
        this.render();
      });
    });

    // Slider for Duration
    if (slider) {
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        gameState.setMissionDuration(val);
        const textVal = this.container.querySelector("#duration-val-text");
        if (textVal) textVal.textContent = val;
      });

      slider.addEventListener("change", () => {
        sound.playClick();
        this.render();
      });
    }
  }
}



// --- File: js\components\achievementsModal.js ---
// ============================================================================
// ACHIEVEMENTS MODAL COMPONENT
// NASA Astronaut Flight Log & Mission Badges
// Real-time tracking of milestones achieved in Phase 1
// ============================================================================



class AchievementsModal {
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



// --- File: js\components\startMissionModal.js ---
// ============================================================================
// START MISSION MODAL & PRE-FLIGHT LAUNCH SEQUENCE COMPONENT
// Conducts NASA Go/No-Go poll across all 8 telemetry metrics, T-minus countdown,
// and flight clearance certification
// ============================================================================





class StartMissionModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.countdownTimer = null;
    this.countdownSeconds = 10;
    this.isCountingDown = false;
    this.isCertified = false;
  }

  open() {
    this.isOpen = true;
    this.isCountingDown = false;
    this.isCertified = false;
    this.countdownSeconds = 10;
    sound.playQuindarBeep();
    this.render();
  }

  close() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.isOpen = false;
    this.isCountingDown = false;
    sound.playClick();
    this.container.innerHTML = "";
  }

  render() {
    const s = gameState.state;
    const t = s.telemetry;
    const readiness = s.missionReadiness;
    const isGo = readiness >= 80;

    // Check individual Go/No-Go status for all 8 metrics
    const pollResults = [
      { name: "Oxygen Supply (ECLSS)", val: `${t.oxygen}%`, go: t.oxygen >= 35, icon: "🫁" },
      { name: "Food Rations", val: `${t.food}%`, go: t.food >= 30, icon: "🍞" },
      { name: "Purified Water Loop", val: `${t.water}%`, go: t.water >= 30, icon: "💧" },
      { name: "Electrical Power", val: `${t.power}%`, go: t.power >= 30, icon: "⚡" },
      { name: "Propellant Tanks", val: `${t.rocketFuel}%`, go: t.rocketFuel >= 40, icon: "⛽" },
      { name: "Cargo Structural Mass", val: `${t.cargoCapacity}%`, go: t.cargoCapacity <= 95, icon: "📦" },
      { name: "Crew Biometrics", val: `${t.astronautHealth}%`, go: t.astronautHealth >= 50, icon: "❤️" },
      { name: "Trajectory & Duration", val: `${t.missionDuration} Days`, go: true, icon: "⏱️" }
    ];

    const allPollsGo = pollResults.every(p => p.go) && isGo;

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog modal-large">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-badge-icon">🚀</span>
              <div>
                <h2>NASA Launch Control Center • Firing Room 1</h2>
                <div class="modal-subtitle">Kennedy Space Center • Pre-Flight Readiness Review & Terminal Countdown</div>
              </div>
            </div>
            <button class="btn-close-modal" id="btn-close-start-modal" aria-label="Abort Sequence">✕</button>
          </div>

          <div class="modal-body">
            <!-- Readiness Status Hero -->
            <div class="launch-hero-card ${allPollsGo ? 'hero-go' : 'hero-nogo'}">
              <div class="launch-hero-status">
                <span class="status-indicator-lamp ${allPollsGo ? 'lamp-green' : 'lamp-red'}"></span>
                <span class="status-headline">
                  ${this.isCertified 
                    ? "🚀 LAUNCH VEHICLE INSERTION COMPLETE!" 
                    : (this.isCountingDown 
                        ? `TERMINAL COUNTDOWN IN PROGRESS: T-MINUS ${this.countdownSeconds}s` 
                        : (allPollsGo ? "ALL SYSTEMS NOMINAL: GO FOR LAUNCH" : "HOLD COUNTDOWN: NO-GO ON TELEMETRY"))}
                </span>
              </div>
              <div class="launch-readiness-chip">
                Mission Readiness: <strong>${readiness}%</strong>
              </div>
            </div>

            ${!this.isCertified ? `
              <!-- Pre-Flight Go / No-Go Poll Table -->
              <div class="poll-section">
                <h4>Consolidated Flight Director Telemetry Poll:</h4>
                <div class="poll-grid">
                  ${pollResults.map(p => `
                    <div class="poll-item ${p.go ? 'poll-go' : 'poll-nogo'}">
                      <div class="poll-left">
                        <span class="poll-icon">${p.icon}</span>
                        <div>
                          <div class="poll-name">${p.name}</div>
                          <div class="poll-val">${p.val}</div>
                        </div>
                      </div>
                      <div class="poll-badge ${p.go ? 'chip-go' : 'chip-nogo'}">
                        ${p.go ? 'GO' : 'NO-GO'}
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : `
              <!-- Launch Certification Card -->
              <div class="certified-box">
                <div class="cert-seal">🏅</div>
                <h3>Phase 1 Flight Readiness Certified!</h3>
                <p>
                  Flight Director Stella and Houston Mission Control have verified all 8 life support vitals, propellant capacities, crew biometrics, and orbital trajectories.
                </p>
                <div class="cert-specs-row">
                  <div>Spacecraft: <strong>${GAME_CONFIG.ROCKETS[s.selectedRocket]?.name || "SLS"}</strong></div>
                  <div>Commander: <strong>${GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut]?.name || "Alex"}</strong></div>
                  <div>Target: <strong>${GAME_CONFIG.DESTINATIONS[s.selectedDestination]?.name || "Moon"}</strong></div>
                  <div>Readiness: <strong>${readiness}%</strong></div>
                </div>
                <div class="cert-note">
                  ✨ <em>Phase 1 Dashboard and Telemetry is fully verified. Ready for next mission phases!</em>
                </div>
              </div>
            `}

            ${(!allPollsGo && !this.isCertified) ? `
              <div class="alert-box-nogo">
                <span style="font-size: 1.5rem;">⚠️</span>
                <div>
                  <strong>Mission Abort Warning:</strong>
                  One or more life support or propulsion streams are below NASA safe flight minimums. Restore nominal vitals before committing to countdown.
                </div>
                <button class="btn-secondary" id="btn-auto-fix-telemetry" style="margin-left: auto;">
                  ⚡ Auto-Stabilize Systems
                </button>
              </div>
            ` : ''}
          </div>

          <div class="modal-footer">
            <div class="modal-footer-telemetry">
              <span>Overall Status: <strong>${allPollsGo ? "GO" : "HOLD"}</strong></span>
              <span>Launch Window: <strong>OPEN</strong></span>
            </div>

            <div class="launch-actions-group">
              <button class="btn-secondary" id="btn-cancel-launch">
                ${this.isCertified ? 'Close Console' : 'Abort / Stand Down'}
              </button>

              ${this.isCertified ? `
                <button class="btn-primary" id="btn-commit-pad" style="background: linear-gradient(135deg, #00e5ff, #00b0ff); font-weight: 800;">
                  <span>Proceed to Pad 39B & Crew Boarding 👨‍🚀</span>
                </button>
              ` : ''}

              ${(!this.isCountingDown && !this.isCertified) ? `
                <button class="btn-primary btn-launch-commit ${!allPollsGo ? 'disabled' : ''}" id="btn-initiate-countdown" ${!allPollsGo ? 'disabled' : ''}>
                  <span>Initiate Terminal Countdown (T-10s)</span>
                  <span>🚀</span>
                </button>
              ` : ''}

              ${this.isCountingDown ? `
                <button class="btn-danger" id="btn-emergency-abort">
                  <span>EMERGENCY HOLD / ABORT</span>
                  <span>🛑</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(allPollsGo);
  }

  startCountdown() {
    this.isCountingDown = true;
    this.countdownSeconds = 10;
    sound.playQuindarBeep();
    this.render();

    this.countdownTimer = setInterval(() => {
      this.countdownSeconds--;
      sound.playCountdownTick(this.countdownSeconds === 0);

      if (this.countdownSeconds <= 0) {
        clearInterval(this.countdownTimer);
        this.isCountingDown = false;
        this.isCertified = true;
        sound.playThrusterRumble();
        sound.playSuccessChime();
        gameState.unlockAchievement("go_for_launch");
        this.render();
      } else {
        // Update countdown text live
        const heroHeadline = this.container.querySelector(".status-headline");
        if (heroHeadline) {
          heroHeadline.textContent = `TERMINAL COUNTDOWN IN PROGRESS: T-MINUS ${this.countdownSeconds}s`;
        }
      }
    }, 1000);
  }

  abortCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.isCountingDown = false;
    sound.playWarningAlarm();
    this.render();
  }

  attachEvents(allPollsGo) {
    const backdrop = this.container.querySelector("#modal-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-start-modal");
    const cancelBtn = this.container.querySelector("#btn-cancel-launch");
    const commitPadBtn = this.container.querySelector("#btn-commit-pad");
    const countdownBtn = this.container.querySelector("#btn-initiate-countdown");
    const abortBtn = this.container.querySelector("#btn-emergency-abort");
    const autoFixBtn = this.container.querySelector("#btn-auto-fix-telemetry");

    if (commitPadBtn) {
      commitPadBtn.addEventListener("click", () => {
        this.close();
        sound.playSuccessChime();
        gameState.setScreen("boarding");
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop && !this.isCountingDown) this.close();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (!this.isCountingDown) this.close();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.close());
    }

    if (countdownBtn && allPollsGo) {
      countdownBtn.addEventListener("click", () => {
        this.startCountdown();
      });
    }

    if (abortBtn) {
      abortBtn.addEventListener("click", () => {
        this.abortCountdown();
      });
    }

    if (autoFixBtn) {
      autoFixBtn.addEventListener("click", () => {
        sound.playAdjustTone(true);
        gameState.restoreNominal();
        this.render();
      });
    }
  }
}



// --- File: js\components\guideModal.js ---
// ============================================================================
// NASA FLIGHT MANUAL & STEP-BY-STEP MISSION GUIDELINES COMPONENT
// Comprehensive educational walkthrough for all 9 stages & Debris Cleanup
// ============================================================================



class GuideModal {
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



// --- File: js\components\greenhouseModal.js ---
// ============================================================================
// MISSION 3: COMBINED GREENHOUSE SURVIVAL (PLAYABLE SPACE MISSION SIMULATOR)
// Interactive 120-Day Hydroponic Simulation with Astronaut Survival & Harvesting
// ============================================================================




class GreenhouseModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.state = null;
    this.onCompleteCallback = null;
    this.animId = null;
    this.canvas = null;
    this.ctx = null;
    this.astronaut = {
      x: 340,
      targetX: 340,
      y: 215,
      direction: 1,
      isWalking: false,
      isWorking: false,
      workTimer: 0,
      action: "idle", // 'idle', 'irrigating', 'uv_boost', 'harvesting', 'fixing'
      frame: 0
    };
    this.crops = [
      { name: "Lunar Wheat", x: 260, y: 190, color: "#2ecc71" },
      { name: "Martian Soy", x: 340, y: 190, color: "#27ae60" },
      { name: "Space Potato", x: 420, y: 190, color: "#1abc9c" }
    ];
    this.activeCrisis = null;
    this.harvestParticles = [];
  }

  open(onComplete = null) {
    this.isOpen = true;
    this.onCompleteCallback = onComplete;
    sound.playQuindar();

    const diffKey = gameState.state.difficulty || "cadet";
    const diff = GAME_CONFIG.DIFFICULTY[diffKey] || GAME_CONFIG.DIFFICULTY.cadet;

    this.state = {
      day: 1,
      targetDay: 60,
      food: 21,
      water: 100,
      power: 100,
      growth: 0,
      gameOver: false,
      harvestCount: 0,
      difficulty: diff,
      drainMultiplier: diff.drainMultiplier || 1.0,
      bayTemp: 21,
      oxygen: 96,
      heartRate: 74,
      rationsPackedTotal: 0
    };

    this.activeCrisis = null;
    this.astronaut.x = 340;
    this.astronaut.targetX = 340;
    this.astronaut.action = "idle";
    this.astronaut.isWorking = false;

    this.render();
    this.initCanvas();
  }

  close() {
    this.isOpen = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    sound.playClick();
    this.container.innerHTML = "";
    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }

  render() {
    const s = this.state;
    const diffName = s.difficulty.name || "Cadet";

    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog" style="max-width: 840px; background: #0f171e; border: 2px solid #2ecc71; border-radius: 12px; padding: 22px; color: #ecf0f1; box-shadow: 0 15px 60px rgba(0,0,0,0.9); position: relative; max-height: 92vh; overflow-y: auto;">
          <button class="btn-icon btn-modal-close" id="btn-close-gh-modal" title="Close Greenhouse Module" style="position: absolute; top: 16px; right: 16px; font-size: 1.3rem; background: transparent; border: none; color: #bdc3c7; cursor: pointer; z-index: 20;">✕</button>

          <!-- COMBINED GREENHOUSE SURVIVAL MODULE (HTML + JS) -->
          <div id="gh-survival-module" style="font-family: sans-serif; width: 100%; border: 2px solid #2c3e50; border-radius: 8px; padding: 18px; background: #15222e; color: #ecf0f1; margin: 0 auto; box-sizing: border-box;">
            
            <!-- Header with Mission Badge -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid rgba(46,204,113,0.3); padding-bottom: 10px;">
              <div>
                <div style="font-size: 0.72rem; color: #2ecc71; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
                  NASA BIOREGENERATIVE LIFE SUPPORT • DEEP SPACE EXPEDITION
                </div>
                <h2 style="margin: 2px 0 0 0; color: #2ecc71; font-size: 1.4rem; display: flex; align-items: center; gap: 8px;">
                  <span>🌱 Mission 3: Combined Greenhouse Survival</span>
                </h2>
              </div>
              <span style="font-size: 0.75rem; background: rgba(46,204,113,0.15); border: 1px solid #2ecc71; padding: 4px 10px; border-radius: 4px; color: #2ecc71; font-weight: 700;">
                ${diffName} (${s.drainMultiplier}x Drain)
              </span>
            </div>

            <!-- Narrative Survival Callout: Astronaut Facing Real Difficulty -->
            <div id="gh-crisis-banner" style="background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.4rem;">⚠️</span>
              <div>
                <strong style="color: #ff80ab;">SURVIVAL ALERT:</strong>
                <span id="gh-crisis-text" style="color: #cfd8dc;">
                  Supply ship arrives in 60 days! Emergency freeze-dried food is dwindling. Tend the hydroponic beds and harvest ripe crops before rations hit zero!
                </span>
              </div>
            </div>

            <!-- Status Dashboard (User Spec Compliant) -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #1f2d3d; padding: 10px 14px; border-radius: 6px; margin-bottom: 12px; text-align: center;">
              <div>📅 <strong>Day:</strong> <span id="gh-day" style="color: #fff; font-weight: 800;">${s.day}</span> / 60</div>
              <div>🍱 <strong>Food Rations:</strong> <span id="gh-food" style="color: ${s.food < 10 ? '#ff3366' : '#f39c12'}; font-weight: 800;">${Math.round(s.food)}</span> days</div>
              <div>💧 <strong>Water Reserves:</strong> <span id="gh-water" style="color: #3498db; font-weight: 800;">${Math.round(s.water)}</span>%</div>
              <div>⚡ <strong>Power Grid:</strong> <span id="gh-power" style="color: #f1c40f; font-weight: 800;">${Math.round(s.power)}</span>%</div>
            </div>

            <!-- Astronaut Vitals & Environmental Gauges -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: rgba(0,0,0,0.3); border-radius: 6px; padding: 6px 12px; margin-bottom: 12px; font-size: 0.75rem; text-align: center;">
              <div>🫁 <strong>Cabin O₂:</strong> <span id="gh-o2" style="color: #00e5ff;">96%</span> (Nominal)</div>
              <div>🌡️ <strong>Bay Temp:</strong> <span id="gh-temp" style="color: #ffe082;">${s.bayTemp}°C</span> (Optimal)</div>
              <div>❤️ <strong>Astronaut Stress:</strong> <span id="gh-heart" style="color: #ff80ab;">${s.heartRate} BPM</span></div>
            </div>

            <!-- PLAYABLE INTERACTIVE GREENHOUSE CANVAS (Astronaut In Action) -->
            <div style="position: relative; width: 100%; border-radius: 8px; overflow: hidden; border: 2px solid #2c3e50; background: #000; margin-bottom: 12px;">
              <canvas id="gh-canvas" width="680" height="260" style="width: 100%; height: auto; display: block;"></canvas>
              
              <!-- Direct Click Station Badges over Canvas -->
              <div style="position: absolute; top: 8px; left: 10px; font-size: 0.7rem; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">
                🎮 Click stations or buttons below to direct astronaut!
              </div>

              <div id="gh-harvest-flash" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(46,204,113,0.9); color: #000; font-weight: 800; font-size: 1.1rem; padding: 10px 20px; border-radius: 30px; display: none; box-shadow: 0 0 25px #2ecc71; pointer-events: none; z-index: 15;">
                🌾 HARVEST COMPLETE! +18 RATIONS PACKED
              </div>
            </div>

            <!-- Crop Bay Visual Progress Bar (User Spec Compliant) -->
            <div style="margin-bottom: 12px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.84rem;">
                <span>🌿 <strong>Crop Growth Progress:</strong> <span style="font-size: 0.75rem; color: #bdc3c7;">(Stages: Seed ➔ Sprout ➔ Flowering ➔ Golden Harvest)</span></span>
                <span id="gh-growth-text" style="font-weight: 800; color: #2ecc71;">${s.growth}%</span>
              </div>
              <div style="width: 100%; background: #263238; height: 18px; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="gh-growth-bar" style="width: ${s.growth}%; background: linear-gradient(90deg, #27ae60, #2ecc71); height: 100%; transition: width 0.3s;"></div>
              </div>
            </div>

            <!-- Controls (User Spec Compliant + Interactive Astronaut Triggers) -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button id="gh-btn-water" style="flex: 1; min-width: 130px; padding: 12px; background: #2980b9; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s;">
                💧 Irrigate (+Growth)
              </button>
              <button id="gh-btn-power" style="flex: 1; min-width: 130px; padding: 12px; background: #d35400; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s;">
                ☀️ UV Boost (+Growth)
              </button>
              <button id="gh-btn-harvest" style="flex: 1; min-width: 130px; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.88rem; transition: background 0.2s; box-shadow: 0 0 12px rgba(46,204,113,0.3);" ${s.growth < 100 ? 'disabled' : ''}>
                🌾 Harvest Crops
              </button>
            </div>

            <button id="gh-btn-next-day" style="width: 100%; padding: 14px; background: #c0392b; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1.05rem; font-weight: 800; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(192, 57, 43, 0.4); margin-bottom: 12px;">
              ⏭️ Advance to Next Day
            </button>

            <!-- Event Log (User Spec Compliant) -->
            <div id="gh-log" style="padding: 10px 14px; background: #0c131a; border-radius: 6px; font-size: 0.85em; min-height: 48px; color: #f1c40f; line-height: 1.45; border: 1px solid rgba(255,255,255,0.08); font-family: monospace;">
              System initialized. Crew has 21 days of food left. Begin farming immediately!
            </div>

            <!-- Detailed Consumables Burn Log & Permadeath Warning -->
            <div style="margin-top: 10px; padding: 8px 12px; background: rgba(0,0,0,0.4); border-radius: 6px; font-size: 0.74rem; color: #bdc3c7; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
              <span>🔥 <strong>Daily Food Burn:</strong> ${(1 * s.drainMultiplier).toFixed(1)} Rations</span>
              <span>♻️ <strong>ECLSS Recovery:</strong> +10% H₂O, +10% Power</span>
              <span>📦 <strong>Total Harvested:</strong> <span id="gh-harvest-total">0</span> batches</span>
              <span style="color: #ff80ab;">💀 <strong>0 Food = Permadeath Reset</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#gh-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const loop = () => {
      this.updatePhysics();
      this.drawCanvas();
      if (this.isOpen) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    this.animId = requestAnimationFrame(loop);
  }

  updatePhysics() {
    const a = this.astronaut;
    // Move astronaut toward target station
    if (Math.abs(a.x - a.targetX) > 3) {
      a.isWalking = true;
      a.direction = a.targetX > a.x ? 1 : -1;
      a.x += a.direction * 3.5;
      a.frame += 0.2;
    } else {
      a.isWalking = false;
      a.x = a.targetX;
      if (a.isWorking) {
        a.workTimer--;
        if (a.workTimer <= 0) {
          a.isWorking = false;
          a.action = "idle";
        }
      }
    }

    // Update harvest particles
    for (let i = this.harvestParticles.length - 1; i >= 0; i--) {
      const p = this.harvestParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;
      p.radius *= 0.96;
      if (p.alpha <= 0 || p.radius <= 0.3) {
        this.harvestParticles.splice(i, 1);
      }
    }
  }

  drawCanvas() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.state;

    // 1. Background: Deep Space & Geodesic Glass Dome
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, w, h);

    // Starfield through greenhouse glass ceiling
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 35; i++) {
      const sx = (i * 73) % w;
      const sy = (i * 37) % 110;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // Distant Earth / Moon crescent outside dome
    ctx.beginPath();
    ctx.arc(w - 70, 45, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#1976d2";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w - 65, 43, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#050b14";
    ctx.fill();

    // Curved Geodesic Dome Frames
    ctx.strokeStyle = "rgba(46, 204, 113, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, 280, 260, Math.PI, 0);
    ctx.stroke();
    // Glass ribs
    for (let r = 0; r < 7; r++) {
      ctx.beginPath();
      ctx.moveTo(80 + r * 85, 0);
      ctx.lineTo(100 + r * 80, 220);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.1)";
      ctx.stroke();
    }

    // 2. High-Tech Metallic Bio-Floor
    ctx.fillStyle = "#111a24";
    ctx.fillRect(0, 215, w, h - 215);
    ctx.strokeStyle = "rgba(46, 204, 113, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 215);
    ctx.lineTo(w, 215);
    ctx.stroke();

    // Floor hazard tape
    for (let x = 0; x < w; x += 30) {
      ctx.fillStyle = "rgba(241, 196, 15, 0.15)";
      ctx.fillRect(x, 216, 14, 4);
    }

    // 3. Overhead UV Grow Lights (Station 2)
    const uvActive = (s.power > 15);
    ctx.fillStyle = uvActive ? "rgba(155, 89, 182, 0.25)" : "rgba(52, 73, 94, 0.2)";
    // Light cones shining onto crop beds
    ctx.beginPath();
    ctx.moveTo(220, 40);
    ctx.lineTo(160, 215);
    ctx.lineTo(520, 215);
    ctx.lineTo(460, 40);
    ctx.closePath();
    ctx.fill();

    // UV Lamp fixtures
    ctx.fillStyle = "#34495e";
    ctx.fillRect(210, 30, 260, 10);
    for (let lx = 230; lx <= 450; lx += 45) {
      ctx.fillStyle = uvActive ? "#e056fd" : "#7f8c8d";
      ctx.beginPath();
      ctx.arc(lx, 42, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Station 1: Water Desal & Reservoir (Left, x: 70)
    ctx.fillStyle = "#1e2b38";
    ctx.fillRect(30, 120, 80, 95);
    ctx.strokeStyle = "#3498db";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 120, 80, 95);

    // Water level inside transparent tube
    const waterHeight = (s.water / 100) * 65;
    ctx.fillStyle = "rgba(52, 152, 219, 0.6)";
    ctx.fillRect(40, 195 - waterHeight, 60, waterHeight);
    ctx.fillStyle = "#fff";
    ctx.font = "10px sans-serif";
    ctx.fillText("💧 WATER", 42, 136);
    ctx.fillText(`${Math.round(s.water)}%`, 50, 152);

    // Hydroponic fluid pipes running to crop beds
    ctx.strokeStyle = "rgba(52, 152, 219, 0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(110, 195);
    ctx.lineTo(240, 195);
    ctx.stroke();

    // 5. Station 3: 3 Hydroponic Crop Beds (Center: x = 200 to 480)
    for (let c = 0; c < this.crops.length; c++) {
      const crop = this.crops[c];
      // Planter container
      ctx.fillStyle = "#1a252f";
      ctx.fillRect(crop.x - 35, 195, 70, 20);
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(crop.x - 35, 195, 70, 20);

      // Label
      ctx.fillStyle = "#bdc3c7";
      ctx.font = "8px sans-serif";
      ctx.fillText(crop.name, crop.x - 30, 210);

      // Draw Growing Space Crops based on s.growth
      const g = s.growth;
      if (g < 25) {
        // Stage 1: Seedlings (tiny green nubs)
        ctx.fillStyle = "#2ecc71";
        for (let ox = -20; ox <= 20; ox += 10) {
          ctx.beginPath();
          ctx.arc(crop.x + ox, 193, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (g < 55) {
        // Stage 2: Sprouting Leaves
        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 2;
        for (let ox = -22; ox <= 22; ox += 11) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox + 2, 182);
          ctx.lineTo(crop.x + ox + 6, 178);
          ctx.stroke();
        }
      } else if (g < 99) {
        // Stage 3: Flowering Stalks
        ctx.strokeStyle = "#2ecc71";
        ctx.lineWidth = 2.5;
        for (let ox = -24; ox <= 24; ox += 12) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox, 170);
          ctx.stroke();
          // Produce / Leaves
          ctx.fillStyle = "#f39c12";
          ctx.beginPath();
          ctx.arc(crop.x + ox, 168, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Stage 4: Mature Golden Harvest (100%) - Radiating with particles!
        ctx.strokeStyle = "#f1c40f";
        ctx.lineWidth = 3;
        for (let ox = -24; ox <= 24; ox += 12) {
          ctx.beginPath();
          ctx.moveTo(crop.x + ox, 195);
          ctx.lineTo(crop.x + ox + Math.sin(Date.now() * 0.005 + ox) * 2, 160);
          ctx.stroke();
          // Golden grain sheaves
          ctx.fillStyle = "#f39c12";
          ctx.beginPath();
          ctx.arc(crop.x + ox, 156, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Shimmering golden glow effect around ripe crops
        ctx.fillStyle = "rgba(241, 196, 15, 0.25)";
        ctx.beginPath();
        ctx.arc(crop.x, 170, 32, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 6. Station 4: Vacuum Food Dehydrator & Packaging Unit (Right: x = 580)
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(560, 130, 90, 85);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 2;
    ctx.strokeRect(560, 130, 90, 85);

    // Digital readout on packaging unit
    ctx.fillStyle = "#000";
    ctx.fillRect(570, 140, 70, 24);
    ctx.fillStyle = s.growth >= 100 ? "#2ecc71" : "#e67e22";
    ctx.font = "9px monospace";
    ctx.fillText(s.growth >= 100 ? "READY" : "WAITING", 576, 155);

    ctx.fillStyle = "#ecf0f1";
    ctx.font = "9px sans-serif";
    ctx.fillText("🌾 PACKAGING", 570, 178);
    ctx.fillText(`+18 Rations`, 572, 196);

    // Draw Harvest particles
    this.harvestParticles.forEach(p => {
      ctx.fillStyle = `rgba(241, 196, 15, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. Draw Astronaut Avatar (NASA EVA Bio-Suit)
    this.drawAstronaut(ctx);

    // 8. Station Selection Highlight indicators
    ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
    ctx.font = "10px sans-serif";
    ctx.fillText("Station 1: Pump", 35, 112);
    ctx.fillText("Station 2: UV Solar", 290, 22);
    ctx.fillText("Station 3: Seed Pods", 310, 235);
    ctx.fillText("Station 4: Harvester", 565, 122);
  }

  drawAstronaut(ctx) {
    const a = this.astronaut;
    const ax = a.x;
    const ay = a.y;
    const dir = a.direction;
    const walkBob = a.isWalking ? Math.sin(a.frame * 2) * 2 : 0;

    ctx.save();
    ctx.translate(ax, ay + walkBob);

    // Life support ECLSS backpack
    ctx.fillStyle = "#7f8c8d";
    ctx.fillRect(dir === 1 ? -15 : 5, -28, 10, 22);
    ctx.fillStyle = "#3498db";
    ctx.fillRect(dir === 1 ? -13 : 7, -24, 6, 5); // O2 canister

    // Astronaut Body (White Suit)
    ctx.fillStyle = "#ecf0f1";
    ctx.beginPath();
    ctx.roundRect(-8, -26, 16, 22, 4);
    ctx.fill();
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth = 1;
    ctx.stroke();

    // NASA Blue Mission Patch on chest
    ctx.fillStyle = "#2980b9";
    ctx.beginPath();
    ctx.arc(dir === 1 ? 2 : -2, -18, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Astronaut Helmet / Visor
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, -32, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Gold / Purple reflective Visor
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.ellipse(dir * 3, -32, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d35400";
    ctx.stroke();

    // Legs with walking animation
    const legOffset = a.isWalking ? Math.sin(a.frame * 2.5) * 6 : 0;
    ctx.strokeStyle = "#ecf0f1";
    ctx.lineWidth = 3.5;
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-4, -4);
    ctx.lineTo(-4 + legOffset, 12);
    ctx.stroke();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(4, -4);
    ctx.lineTo(4 - legOffset, 12);
    ctx.stroke();

    // Boots
    ctx.fillStyle = "#34495e";
    ctx.fillRect(-6 + legOffset, 10, 6, 3);
    ctx.fillRect(2 - legOffset, 10, 6, 3);

    // Arms & Action animations
    if (a.isWorking) {
      // Reaching forward / working with tools
      ctx.strokeStyle = "#ecf0f1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(dir * 14, -18 + Math.sin(Date.now() * 0.02) * 4);
      ctx.stroke();

      // Tool in hand
      if (a.action === "harvesting") {
        ctx.fillStyle = "#f1c40f";
        ctx.fillRect(dir * 14, -22, 6, 8); // Harvest shears/sheaf
      } else if (a.action === "irrigating") {
        ctx.fillStyle = "#3498db";
        ctx.fillRect(dir * 14, -20, 6, 5); // Water nozzle
      } else if (a.action === "uv_boost") {
        ctx.fillStyle = "#e056fd";
        ctx.fillRect(dir * 14, -24, 5, 8); // UV sensor
      }
    } else {
      // Idle arm swing
      ctx.strokeStyle = "#ecf0f1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(dir * 6, -10 + (a.isWalking ? -legOffset * 0.5 : 0));
      ctx.stroke();
    }

    // Overhead Astronaut Label
    ctx.fillStyle = "#2ecc71";
    ctx.font = "8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Astronaut Alex", 0, -45);

    ctx.restore();
  }

  attachEvents() {
    const elDay = this.container.querySelector("#gh-day");
    const elFood = this.container.querySelector("#gh-food");
    const elWater = this.container.querySelector("#gh-water");
    const elPower = this.container.querySelector("#gh-power");
    const elGrowthBar = this.container.querySelector("#gh-growth-bar");
    const elGrowthText = this.container.querySelector("#gh-growth-text");
    const elLog = this.container.querySelector("#gh-log");
    const elTemp = this.container.querySelector("#gh-temp");
    const elHeart = this.container.querySelector("#gh-heart");
    const elHarvestTotal = this.container.querySelector("#gh-harvest-total");

    const btnWater = this.container.querySelector("#gh-btn-water");
    const btnPower = this.container.querySelector("#gh-btn-power");
    const btnHarvest = this.container.querySelector("#gh-btn-harvest");
    const btnNextDay = this.container.querySelector("#gh-btn-next-day");
    const btnClose = this.container.querySelector("#btn-close-gh-modal");
    const canvas = this.container.querySelector("#gh-canvas");

    if (btnClose) {
      btnClose.addEventListener("click", () => {
        if (!this.state.gameOver) {
          if (gameState && gameState.state && gameState.state.telemetry) {
            gameState.state.telemetry.food = Math.min(100, Math.round(this.state.food * 2));
          }
        }
        this.close();
      });
    }

    const updateUI = (message) => {
      if (elDay) elDay.textContent = this.state.day;
      if (elFood) {
        elFood.textContent = Math.round(this.state.food);
        elFood.style.color = this.state.food < 10 ? '#ff3366' : '#f39c12';
      }
      if (elWater) elWater.textContent = Math.round(this.state.water);
      if (elPower) elPower.textContent = Math.round(this.state.power);
      if (elGrowthBar) elGrowthBar.style.width = `${this.state.growth}%`;
      if (elGrowthText) elGrowthText.textContent = `${this.state.growth}%`;
      if (elHarvestTotal) elHarvestTotal.textContent = this.state.harvestCount;

      // Dynamic astronaut vitals
      if (elTemp) elTemp.textContent = `${this.state.bayTemp}°C`;
      if (elHeart) elHeart.textContent = `${this.state.heartRate} BPM`;

      if (message && elLog) {
        elLog.textContent = message;
      }

      if (btnHarvest) btnHarvest.disabled = this.state.growth < 100 || this.state.gameOver;
      if (btnWater) btnWater.disabled = this.state.water < 15 || this.state.gameOver;
      if (btnPower) btnPower.disabled = this.state.power < 15 || this.state.gameOver;
      if (btnNextDay) btnNextDay.disabled = this.state.gameOver;
    };

    // Canvas Click: Send astronaut to clicked station
    if (canvas) {
      canvas.addEventListener("click", (e) => {
        if (this.state.gameOver) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);

        if (clickX < 140) {
          // Clicked Station 1: Water pump
          this.astronaut.targetX = 120;
          btnWater.click();
        } else if (clickX > 520) {
          // Clicked Station 4: Harvester
          this.astronaut.targetX = 540;
          if (this.state.growth >= 100) {
            btnHarvest.click();
          } else {
            sound.playQuindar();
            updateUI("⚠️ Harvester waiting for crop maturity (Crops currently at " + this.state.growth + "%).");
          }
        } else if (clickX >= 220 && clickX <= 460) {
          // Clicked Crop bed: Tending
          this.astronaut.targetX = clickX;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 35;
          this.astronaut.action = "tending";
          sound.playClick();
          updateUI("🌱 Astronaut inspecting aeroponic root nozzles and pruning dry leaves.");
        }
      });
    }

    // 1. Water Action: Send Astronaut to Station 1 & irrigate
    if (btnWater) {
      btnWater.addEventListener("click", () => {
        if (this.state.water >= 15 && !this.state.gameOver) {
          sound.playClick();
          this.astronaut.targetX = 120;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 45;
          this.astronaut.action = "irrigating";

          this.state.water -= 15;
          this.state.growth = Math.min(100, this.state.growth + 25);
          updateUI("💧 Astronaut primed irrigation pump. Crop roots received nutrient mist (+25% Growth, -15% Water).");
        } else if (this.state.water < 15) {
          sound.playWarningAlarm();
          updateUI("⚠️ INSUFFICIENT WATER: Water reserves too low! Wait for tomorrow's condensation recycling (+10%).");
        }
      });
    }

    // 2. UV Boost Action: Send Astronaut to Station 2 & recalibrate lamps
    if (btnPower) {
      btnPower.addEventListener("click", () => {
        if (this.state.power >= 15 && !this.state.gameOver) {
          sound.playClick();
          this.astronaut.targetX = 260;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 45;
          this.astronaut.action = "uv_boost";

          this.state.power -= 15;
          this.state.growth = Math.min(100, this.state.growth + 25);
          this.state.bayTemp = Math.min(26, this.state.bayTemp + 1);
          updateUI("☀️ Astronaut boosted UV grow lamps. Photosynthetic photon flux increased (+25% Growth, -15% Power).");
        } else if (this.state.power < 15) {
          sound.playWarningAlarm();
          updateUI("⚠️ INSUFFICIENT POWER: Battery grid reserves too low! Conserve power for life-support.");
        }
      });
    }

    // 3. Hands-On Harvesting Action: Astronaut harvests crops and packs vacuum rations
    if (btnHarvest) {
      btnHarvest.addEventListener("click", () => {
        if (this.state.growth >= 100 && !this.state.gameOver) {
          sound.playSuccessChime();
          this.astronaut.targetX = 540;
          this.astronaut.isWorking = true;
          this.astronaut.workTimer = 65;
          this.astronaut.action = "harvesting";

          // Spawn golden harvest particles
          for (let i = 0; i < 25; i++) {
            this.harvestParticles.push({
              x: 340 + (Math.random() * 160 - 80),
              y: 175 + (Math.random() * 20 - 10),
              vx: (Math.random() - 0.5) * 4,
              vy: -Math.random() * 3 - 1,
              radius: Math.random() * 3 + 2,
              alpha: 1.0
            });
          }

          // Show flash badge
          const flash = this.container.querySelector("#gh-harvest-flash");
          if (flash) {
            flash.style.display = "block";
            setTimeout(() => { if (flash) flash.style.display = "none"; }, 1600);
          }

          this.state.growth = 0;
          this.state.food += 18;
          this.state.harvestCount++;
          this.state.rationsPackedTotal += 18;
          gameState.addScore(40);
          sound.playCollect();

          updateUI(`🌾 HARVEST PROCESS COMPLETE: Astronaut reaped golden wheat & soy, processed through vacuum dehydrator, and banked +18 days of food rations! (Total Harvests: ${this.state.harvestCount})`);
        }
      });
    }

    // 4. Advance to Next Day: Simulates harsh deep space survival day-by-day
    if (btnNextDay) {
      btnNextDay.addEventListener("click", () => {
        if (this.state.gameOver) return;

        sound.playClick();
        this.state.day += 1;

        // Daily food burn scaled by difficulty
        const foodBurn = 1 * this.state.drainMultiplier;
        this.state.food -= foodBurn;

        // Natural daily crop growth and closed-loop ECLSS recycling
        this.state.growth = Math.min(100, this.state.growth + 5);
        this.state.water = Math.min(100, this.state.water + 10);
        this.state.power = Math.min(100, this.state.power + 10);

        // Adjust astronaut stress & bay temp
        if (this.state.food < 10) {
          this.state.heartRate = 110;
          sound.playWarningAlarm();
        } else {
          this.state.heartRate = 74;
        }

        // Random survival crisis check (every ~18 days)
        if (this.state.day % 18 === 0 && !this.activeCrisis && this.state.day < 110) {
          this.triggerRandomSurvivalCrisis(updateUI);
        }

        // Check Victory or Casualty
        if (this.state.food <= 0) {
          this.state.food = 0;
          this.state.gameOver = true;
          this.astronaut.isWorking = false;
          this.astronaut.action = "idle";
          sound.playFail();

          updateUI(`💀 MISSION FAILED: The crew ran out of food on Day ${this.state.day} before the supply ship arrived.`);
          btnNextDay.textContent = "Simulation Over (Casualty)";
          btnNextDay.style.background = "#c0392b";

          // Trigger Permadeath Protocol
          setTimeout(() => {
            this.close();
            gameState.failMission({
              cause: "Orbital Greenhouse Starvation Casualty",
              tip: "Tend the crop beds rhythmically: irrigate and boost UV every time water/power recharge so you can harvest before rations hit zero.",
              causalityList: [
                `Emergency rations exhausted on Day ${this.state.day} of 60-day isolation`,
                `Metabolic consumption rate (${this.state.drainMultiplier}x) outpaced crop growth yield`,
                "Crew starvation casualty. Permadeath zero-reset engaged."
              ],
              daysSurvived: this.state.day
            });
          }, 2000);

        } else if (this.state.day >= this.state.targetDay) {
          this.state.gameOver = true;
          sound.playSuccessChime();
          gameState.addScore(500);
          gameState.unlockAchievement("master_botanist");
          gameState.progressObjective("moon_greenhouse", 1);
          gameState.progressObjective("mars_greenhouse", 1);

          if (gameState.state && gameState.state.telemetry) {
            gameState.state.telemetry.food = 100;
          }

          updateUI("🚀 MISSION 3 SUCCESS: The 60-day isolation is conquered! The Artemis Resupply Lander is descending into lunar orbit! Ready for Final Mission: Resupply & Extraction.");
          btnNextDay.textContent = "🚀 Launch Final Mission: Resupply & Extraction ➔";
          btnNextDay.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
          btnNextDay.style.boxShadow = "0 0 20px rgba(46,204,113,0.6)";
          btnNextDay.disabled = false;

          btnNextDay.onclick = () => {
            sound.playClick();
            this.close();
            if (window.extractionModal) {
              window.extractionModal.open(this.onCompleteCallback);
            }
          };

        } else {
          updateUI(`📅 Day ${this.state.day}: Astronaut consumed ${foodBurn.toFixed(1)} ration(s). Closed-loop life support recycled +10% water & power.`);
        }
      });
    }

    updateUI();
  }

  triggerRandomSurvivalCrisis(updateUI) {
    sound.playWarningAlarm();
    const crisisType = Math.random() > 0.5 ? "temp_drop" : "pipe_leak";

    if (crisisType === "temp_drop") {
      this.state.bayTemp = 11;
      this.state.heartRate = 118;
      updateUI("🚨 EMERGENCY: Thermal heater breaker tripped! Bay temperature plunged to 11°C! Click UV Boost to restore thermal coils!");
    } else {
      this.state.water = Math.max(10, this.state.water - 20);
      this.state.heartRate = 112;
      updateUI("🚨 EMERGENCY: Micro-puncture in hydroponic line! -20% Water vented. Click Irrigate to seal and repressurize!");
    }
  }
}

if (typeof window !== "undefined") {
  window.GreenhouseModal = GreenhouseModal;
}


// --- File: js\components\extractionModal.js ---
// ============================================================================
// FINAL MISSION: LUNAR RESUPPLY & EXTRACTION FINALE MODULE
// Grand Finale: Gateway Link, Pad Clearance, Beacon Transmission & Safe Extraction
// ============================================================================




class ExtractionModal {
  constructor(containerEl) {
    this.container = containerEl;
    this.isOpen = false;
    this.state = null;
    this.animId = null;
    this.canvas = null;
    this.ctx = null;
    this.onCompleteCallback = null;
  }

  open(onComplete = null) {
    this.isOpen = true;
    this.onCompleteCallback = onComplete;
    sound.playQuindar();

    this.state = {
      dishAligned: false,
      padCleared: false,
      windowTime: 100,
      lockProgress: 0,
      missionEnded: false,
      landerY: 20,
      landerLanded: false,
      dishAngle: -0.4,
      targetDishAngle: -0.4,
      particles: []
    };

    this.render();
    this.initCanvas();
  }

  close() {
    this.isOpen = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    sound.playClick();
    this.container.innerHTML = "";
    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-dialog" style="max-width: 620px; background: transparent; border: none; padding: 0; position: relative;">
          <button class="btn-icon btn-modal-close" id="btn-close-ext-modal" title="Close Extraction Module" style="position: absolute; top: 18px; right: 20px; font-size: 1.3rem; background: transparent; border: none; color: #bdc3c7; cursor: pointer; z-index: 30;">✕</button>

          <!-- LUNAR EXTRACTION FINALE MODULE (HTML + CSS + JS) -->
          <div id="ext-finale-module">
            <style>
              #ext-finale-module {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 540px;
                border: 2px solid #2ecc71;
                border-radius: 10px;
                padding: 22px;
                background: linear-gradient(145deg, #161b22, #0d1117);
                color: #ecf0f1;
                margin: 20px auto;
                box-shadow: 0 12px 35px rgba(46, 204, 113, 0.25);
                position: relative;
                box-sizing: border-box;
              }
              #ext-finale-module h2 {
                margin-top: 0;
                color: #2ecc71;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 1.45rem;
              }
              #ext-finale-module .ext-subtitle {
                font-size: 0.9em;
                color: #bdc3c7;
                margin-bottom: 14px;
                line-height: 1.45;
              }
              #ext-finale-module .ext-dashboard {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                background: #21262d;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 14px;
                border: 1px solid #30363d;
              }
              #ext-finale-module .ext-bar-wrap {
                margin-bottom: 14px;
              }
              #ext-finale-module .ext-bar-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
                font-size: 0.92em;
              }
              #ext-finale-module .ext-bar-bg {
                width: 100%;
                background: #30363d;
                height: 22px;
                border-radius: 6px;
                overflow: hidden;
              }
              #ext-finale-module .ext-bar-fill {
                width: 0%;
                background: #3498db;
                height: 100%;
                transition: width 0.35s ease, background 0.35s ease;
              }
              #ext-finale-module .ext-controls {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 12px;
              }
              #ext-finale-module button {
                flex: 1;
                padding: 12px;
                color: #ffffff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 0.9em;
                transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
              }
              #ext-finale-module button:hover:not(:disabled) {
                opacity: 0.9;
                box-shadow: 0 0 12px rgba(255,255,255,0.2);
              }
              #ext-finale-module button:active:not(:disabled) {
                transform: scale(0.98);
              }
              #ext-finale-module button:disabled {
                opacity: 0.4;
                cursor: not-allowed;
              }
              #ext-btn-dish { background: #3498db; }
              #ext-btn-pad { background: #e67e22; }
              #ext-btn-beacon {
                width: 100%;
                padding: 14px !important;
                background: #2ecc71;
                font-size: 1.05em !important;
                margin-bottom: 14px;
                box-shadow: 0 0 15px rgba(46,204,113,0.3);
              }
              #ext-log {
                padding: 12px;
                background: #0d1117;
                border-left: 4px solid #f1c40f;
                border-radius: 4px;
                font-size: 0.88em;
                min-height: 48px;
                color: #f1c40f;
                line-height: 1.45;
                font-family: monospace;
              }
              #ext-victory-card {
                display: none;
                margin-top: 16px;
                padding: 18px;
                background: rgba(46, 204, 113, 0.14);
                border: 2px solid #2ecc71;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 0 25px rgba(46,204,113,0.3);
              }
              #ext-victory-card h3 {
                margin: 0 0 10px 0;
                color: #2ecc71;
                font-size: 1.3rem;
              }
              #ext-victory-card p {
                margin: 4px 0;
                font-size: 0.88em;
                color: #ecf0f1;
                text-align: left;
              }
            </style>

            <h2>🚀 Final Mission: Resupply & Extraction</h2>
            <p class="ext-subtitle">
              The Artemis Resupply & Crew Return Lander is approaching lunar orbit! Align the comms dish and clear the landing pad before the orbital window closes.
            </p>

            <!-- Visual Terminal Descent Radar Canvas -->
            <div style="position: relative; width: 100%; height: 160px; background: #050b14; border-radius: 6px; overflow: hidden; margin-bottom: 14px; border: 1px solid #30363d;">
              <canvas id="ext-radar-canvas" width="500" height="160" style="width: 100%; height: 100%; display: block;"></canvas>
              <div style="position: absolute; top: 6px; left: 8px; font-size: 0.7rem; color: #a9dfbf; font-family: monospace;">
                🛰️ TERMINAL APPROACH • DESCENT RADAR
              </div>
            </div>

            <!-- Status Dashboard -->
            <div class="ext-dashboard">
              <div>🛰️ <strong>Gateway Link:</strong> <span id="ext-link">Offline</span></div>
              <div>🛬 <strong>Landing Zone:</strong> <span id="ext-pad">Obstructed</span></div>
              <div>⏱️ <strong>Orbital Window:</strong> <span id="ext-window">100</span>%</div>
              <div>🔋 <strong>Transmitter:</strong> <span id="ext-power">Ready</span></div>
            </div>

            <!-- Signal Lock Progress Bar -->
            <div class="ext-bar-wrap">
              <div class="ext-bar-header">
                <span>📡 <strong>Guidance Beacon Lock:</strong></span>
                <span id="ext-lock-text">0%</span>
              </div>
              <div class="ext-bar-bg">
                <div id="ext-lock-bar" class="ext-bar-fill"></div>
              </div>
            </div>

            <!-- Controls -->
            <div class="ext-controls">
              <button id="ext-btn-dish">📡 Align High-Gain Dish</button>
              <button id="ext-btn-pad">🧹 Clear Regolith Pad</button>
            </div>

            <button id="ext-btn-beacon" disabled>🚀 Transmit Landing Beacon</button>

            <!-- Event Log -->
            <div id="ext-log">
              INCOMING TRANSMISSION: "Artemis Base, orbital window is open. Lock onto our frequency and clear Pad Alpha for touchdown!"
            </div>

            <!-- Final Series Summary Card (Revealed on Victory) -->
            <div id="ext-victory-card">
              <h3>🏆 ARTEMIS SURVIVAL CHALLENGE COMPLETE!</h3>
              <p>✅ <strong>Stage 1:</strong> Lunar Power Grid Restored</p>
              <p>✅ <strong>Stage 2:</strong> Legacy Debris Salvaged & Analyzed</p>
              <p>✅ <strong>Stage 3:</strong> Radiation-Shielded Habitat Built</p>
              <p>✅ <strong>Stage 4:</strong> 60-Day Lunar Greenhouse Harvested</p>
              <p>✅ <strong>Stage 5:</strong> Resupply Lander Safely Guided Home</p>
              <p style="margin-top: 12px; color: #2ecc71; font-weight: bold; text-align: center; font-size: 1rem;">
                Humanity has established a permanent foothold on the Moon! 🌕
              </p>
              
              <button id="ext-btn-debrief" style="margin-top: 14px; width: 100%; padding: 14px; background: linear-gradient(135deg, #00e5ff, #0091ea); font-size: 1.05rem; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; color: #000; box-shadow: 0 0 20px rgba(0,229,255,0.4);">
                🏆 View Final Artemis Expedition Flight Debrief ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  initCanvas() {
    this.canvas = this.container.querySelector("#ext-radar-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.startRadarLoop();
  }

  startRadarLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const loop = () => {
      this.updatePhysics();
      this.drawRadar();
      if (this.isOpen) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    this.animId = requestAnimationFrame(loop);
  }

  updatePhysics() {
    const s = this.state;
    // Dish animation
    if (s.dishAligned) {
      s.targetDishAngle = 0.55;
    }
    s.dishAngle += (s.targetDishAngle - s.dishAngle) * 0.05;

    // Lander descent animation after beacon transmission
    if (s.missionEnded && !s.landerLanded) {
      if (s.landerY < 105) {
        s.landerY += 0.8;
        // Thruster sparks
        if (Math.random() > 0.3) {
          s.particles.push({
            x: 250 + (Math.random() * 8 - 4),
            y: s.landerY + 18,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 2 + 1,
            radius: Math.random() * 2.5 + 1,
            alpha: 1.0
          });
        }
      } else {
        s.landerLanded = true;
        sound.playSuccessChime();
      }
    }

    // Update particles
    for (let i = s.particles.length - 1; i >= 0; i--) {
      const p = s.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.04;
      p.radius *= 0.95;
      if (p.alpha <= 0 || p.radius <= 0.3) {
        s.particles.splice(i, 1);
      }
    }
  }

  drawRadar() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.state;

    // Sky / Stars
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 25; i++) {
      ctx.fillRect((i * 47) % w, (i * 29) % (h * 0.7), 1.2, 1.2);
    }

    // Distant Lunar Gateway in orbit (top left)
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(60, 25, 20, 8);
    // Solar wings
    ctx.fillStyle = "#ffd600";
    ctx.fillRect(45, 27, 15, 4);
    ctx.fillRect(80, 27, 15, 4);
    ctx.fillStyle = "#cfd8dc";
    ctx.font = "8px monospace";
    ctx.fillText("LUNAR GATEWAY", 40, 18);

    // Lunar Ground
    ctx.fillStyle = "#263238";
    ctx.fillRect(0, 130, w, h - 130);
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.lineTo(w, 130);
    ctx.stroke();

    // Landing Pad Alpha (Center: x = 200 to 300)
    ctx.fillStyle = s.padCleared ? "#2e7d32" : "#b71c1c";
    ctx.fillRect(205, 126, 90, 6);
    ctx.strokeStyle = s.padCleared ? "#4caf50" : "#ef5350";
    ctx.lineWidth = 1;
    ctx.strokeRect(205, 126, 90, 6);
    ctx.fillStyle = "#ffffff";
    ctx.font = "8px monospace";
    ctx.fillText(s.padCleared ? "PAD ALPHA [CLEARED]" : "PAD ALPHA [BOULDERS]", 206, 122);

    // If not cleared, draw regolith boulders on pad
    if (!s.padCleared) {
      ctx.fillStyle = "#78909c";
      ctx.beginPath();
      ctx.arc(230, 125, 4, 0, Math.PI * 2);
      ctx.arc(260, 124, 5, 0, Math.PI * 2);
      ctx.arc(280, 125, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // High-Gain Antenna Dish (Right: x = 420)
    ctx.fillStyle = "#37474f";
    ctx.fillRect(415, 100, 6, 30); // Mast
    ctx.save();
    ctx.translate(418, 100);
    ctx.rotate(s.dishAngle);
    // Parabolic dish curve
    ctx.strokeStyle = s.dishAligned ? "#00e5ff" : "#78909c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -10, 14, Math.PI * 0.7, Math.PI * 1.3);
    ctx.stroke();
    // Feed horn
    ctx.strokeStyle = "#cfd8dc";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-2, -10);
    ctx.stroke();
    ctx.restore();

    // Guidance Laser / Radio Link Beam
    if (s.dishAligned) {
      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(410, 90);
      ctx.lineTo(70, 28);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Particles
    s.particles.forEach(p => {
      ctx.fillStyle = `rgba(255, 145, 0, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Artemis Crew Return / Resupply Lander
    const lx = 250;
    const ly = s.landerY;
    ctx.save();
    ctx.translate(lx, ly);

    // Lander Body
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.lineTo(-8, -12);
    ctx.lineTo(8, -12);
    ctx.lineTo(12, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -4, 4, 0, Math.PI * 2);
    ctx.fill();

    // Landing Legs
    ctx.strokeStyle = "#90a4ae";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 8);
    ctx.lineTo(-16, 16);
    ctx.moveTo(10, 8);
    ctx.lineTo(16, 16);
    ctx.stroke();

    ctx.restore();
  }

  attachEvents() {
    const elLink = this.container.querySelector("#ext-link");
    const elPad = this.container.querySelector("#ext-pad");
    const elWindow = this.container.querySelector("#ext-window");
    const elPower = this.container.querySelector("#ext-power");
    const elLockBar = this.container.querySelector("#ext-lock-bar");
    const elLockText = this.container.querySelector("#ext-lock-text");
    const elLog = this.container.querySelector("#ext-log");
    const elVictory = this.container.querySelector("#ext-victory-card");

    const btnDish = this.container.querySelector("#ext-btn-dish");
    const btnPad = this.container.querySelector("#ext-btn-pad");
    const btnBeacon = this.container.querySelector("#ext-btn-beacon");
    const btnClose = this.container.querySelector("#btn-close-ext-modal");
    const btnDebrief = this.container.querySelector("#ext-btn-debrief");

    if (btnClose) {
      btnClose.addEventListener("click", () => this.close());
    }

    const updateUI = (message) => {
      if (elLink) {
        elLink.textContent = this.state.dishAligned ? "Locked" : "Offline";
        elLink.style.color = this.state.dishAligned ? "#2ecc71" : "#e74c3c";
      }

      if (elPad) {
        elPad.textContent = this.state.padCleared ? "Clear" : "Obstructed";
        elPad.style.color = this.state.padCleared ? "#2ecc71" : "#e74c3c";
      }

      if (elWindow) elWindow.textContent = this.state.windowTime;
      if (elLockBar) elLockBar.style.width = `${this.state.lockProgress}%`;
      if (elLockText) elLockText.textContent = `${this.state.lockProgress}%`;

      if (message && elLog) {
        elLog.textContent = message;
      }

      if (btnDish) btnDish.disabled = this.state.dishAligned || this.state.missionEnded;
      if (btnPad) btnPad.disabled = this.state.padCleared || this.state.missionEnded;
      if (btnBeacon) btnBeacon.disabled = !(this.state.dishAligned && this.state.padCleared) || this.state.missionEnded;
    };

    if (btnDish) {
      btnDish.addEventListener("click", () => {
        if (this.state.missionEnded || this.state.dishAligned) return;
        sound.playClick();
        sound.playQuindar();
        this.state.dishAligned = true;
        this.state.windowTime -= 25;
        this.state.lockProgress += 50;
        updateUI("📡 High-gain dish locked onto Lunar Gateway! Guidance telemetry at 50%.");
      });
    }

    if (btnPad) {
      btnPad.addEventListener("click", () => {
        if (this.state.missionEnded || this.state.padCleared) return;
        sound.playClick();
        sound.playCollect();
        this.state.padCleared = true;
        this.state.windowTime -= 25;
        this.state.lockProgress += 50;
        updateUI("🧹 Landing Pad Alpha cleared of boulders and regolith dust! Guidance telemetry at 100%.");
      });
    }

    if (btnBeacon) {
      btnBeacon.addEventListener("click", () => {
        if (this.state.missionEnded || !this.state.dishAligned || !this.state.padCleared) return;
        sound.playSuccessChime();
        sound.playThrusterPulse();
        this.state.missionEnded = true;

        if (elPower) {
          elPower.textContent = "Transmitting";
          elPower.style.color = "#2ecc71";
        }
        if (elLockBar) elLockBar.style.background = "#2ecc71";
        if (elLog) {
          elLog.style.borderLeftColor = "#2ecc71";
          elLog.style.color = "#2ecc71";
        }
        if (elVictory) elVictory.style.display = "block";

        gameState.addScore(1000);
        gameState.unlockAchievement("artemis_mastery");
        gameState.progressObjective("moon_extraction", 1);

        updateUI("🚀 TOUCHDOWN CONFIRMED: The Artemis Resupply Lander has safely landed! Your crew is saved.");
      });
    }

    if (btnDebrief) {
      btnDebrief.addEventListener("click", () => {
        sound.playClick();
        this.close();
        gameState.setScreen("debrief");
      });
    }

    updateUI();
  }
}

if (typeof window !== "undefined") {
  window.ExtractionModal = ExtractionModal;
}



// --- File: js\components\dashboard.js ---
// ============================================================================
// MISSION CONTROL DASHBOARD COMPONENT
// Displays 8 Core Telemetry Metrics, Animated Resource Bars, Warning Indicators,
// Dynamic Mission Readiness Percentage & 5 Functional Navigation Buttons
// ============================================================================





class DashboardComponent {
  constructor(containerEl, modalHandlers = {}) {
    this.container = containerEl;
    this.modalHandlers = modalHandlers;
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();

    this.unsubscribe = gameState.subscribe((state, event) => {
      if (state.activeModal === null) {
        this.updateView();
      }
    });
  }

  render() {
    const s = gameState.state;
    const t = s.telemetry;
    const readiness = s.missionReadiness;
    const rStatus = s.readinessStatus;
    const rocket = GAME_CONFIG.ROCKETS[s.selectedRocket] || GAME_CONFIG.ROCKETS.sls;
    const astronaut = GAME_CONFIG.ASTRONAUTS[s.selectedAstronaut] || GAME_CONFIG.ASTRONAUTS.alex;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination] || GAME_CONFIG.DESTINATIONS.moon;

    // Format Mission Elapsed Time (MET)
    const hours = String(Math.floor(s.metSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s.metSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(s.metSeconds % 60).padStart(2, "0");
    const metFormatted = `+${hours}:${mins}:${secs}`;

    this.container.innerHTML = `
      <div class="dashboard-wrapper">
        <!-- Top Telemetry & Status HUD Bar -->
        <header class="hud-top-bar">
          <div class="hud-brand">
            <div class="hud-patch" title="NASA Space Apps Challenge">🚀</div>
            <div>
              <h1 class="hud-title">MISSION CONTROL FLIGHT DASHBOARD</h1>
              <div class="hud-meta">
                <span>MET <strong>${metFormatted}</strong></span>
                <span>• DSN SIGNAL: <strong>${s.dsnSignalStrength}% NOMINAL</strong></span>
                <span>• HOUSTON COMM: <strong>ONLINE</strong></span>
              </div>
            </div>
          </div>

          <!-- Active Mission Configuration Badges -->
          <div class="hud-config-pills">
            <div class="hud-pill" id="pill-rocket" title="Click to open Rocket Selection">
              <span>🚀 Spacecraft:</span>
              <strong>${rocket.name.split('(')[0].trim()}</strong>
            </div>
            <div class="hud-pill" id="pill-astronaut" title="Click to open Astronaut Preparation">
              <span>👨‍🚀 Commander:</span>
              <strong>${astronaut.name.split(' ')[1]}</strong>
            </div>
            <div class="hud-pill" id="pill-destination" title="Click to open Mission Briefing">
              <span>🎯 Target:</span>
              <strong>${dest.name.split('(')[0].trim()}</strong>
            </div>
          </div>
        </header>

        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 2 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Balance your 8 primary life support supplies using the <strong>[ + / - ]</strong> buttons until Launch Readiness reaches <strong>90%+</strong>. Then click <strong style="color: var(--text-highlight);">[Select Rocket 🛸]</strong> on the right to configure your spacecraft!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-dashboard-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Main Dashboard 2-Column Layout -->
        <div class="dashboard-main-grid">
          <!-- Left / Center: The 8 Required Telemetry Metrics -->
          <section class="telemetry-section">
            <div class="section-header-row">
              <div class="section-title-box">
                <span class="live-dot"></span>
                <h2>PRIMARY FLIGHT TELEMETRY (8 SYSTEMS)</h2>
              </div>
              <div class="telemetry-hint">
                Interactive: Use <strong>+ / -</strong> buttons to test warning states
              </div>
            </div>

            <!-- The 8 Metrics Grid -->
            <div class="metrics-grid">
              ${this.renderMetricCard("oxygen", "1. Oxygen Supply", t.oxygen, "%", "950 kPa", "🫁")}
              ${this.renderMetricCard("food", "2. Food Supply", t.food, "%", "270 Rations", "🍞")}
              ${this.renderMetricCard("water", "3. Water Supply", t.water, "%", "440 Liters", "💧")}
              ${this.renderMetricCard("power", "4. Electrical Power", t.power, "%", "120 kW", "⚡")}
              ${this.renderMetricCard("rocketFuel", "5. Rocket Fuel", t.rocketFuel, "%", "2,850 Tons", "⛽")}
              ${this.renderMetricCard("cargoCapacity", "6. Cargo Capacity", t.cargoCapacity, "%", "37 / 50 Tons", "📦")}
              ${this.renderMetricCard("astronautHealth", "7. Astronaut Health", t.astronautHealth, "%", "BPM 68", "❤️")}
              ${this.renderMetricCard("missionDuration", "8. Mission Duration", t.missionDuration, " Days", "Flight Plan", "⏱️")}
            </div>

            <!-- Crisis & Telemetry Simulation Console -->
            <div class="simulation-console">
              <div class="sim-header">
                <span>⚡ Real-Time Diagnostic & Stress Simulation:</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Test warning indicators, animated bars & readiness calculation:</span>
              </div>
              <div class="sim-buttons-row">
                <button class="btn-sim" id="btn-sim-o2">⚠️ Simulate O₂ Leak</button>
                <button class="btn-sim" id="btn-sim-fuel">⛽ Simulate Fuel Leak</button>
                <button class="btn-sim" id="btn-sim-power">⚡ Simulate Solar Flare</button>
                <button class="btn-sim" id="btn-sim-cargo">📦 Simulate Overload</button>
                <button class="btn-sim btn-sim-restore" id="btn-sim-restore">🔄 Restore Nominal (100%)</button>
              </div>
            </div>
          </section>

          <!-- Right Column: Mission Readiness Arc Gauge & Diagnostics -->
          <aside class="readiness-panel">
            <div class="panel-header">
              <h3>MISSION READINESS</h3>
              <div class="readiness-beacon ${readiness >= 80 ? 'beacon-go' : (readiness >= 50 ? 'beacon-hold' : 'beacon-abort')}"></div>
            </div>

            <!-- Circular / Arc Readiness Meter -->
            <div class="readiness-gauge-box">
              <svg class="readiness-svg" viewBox="0 0 160 160">
                <circle class="gauge-bg" cx="80" cy="80" r="68"></circle>
                <circle 
                  class="gauge-fill ${readiness >= 80 ? 'fill-go' : (readiness >= 50 ? 'fill-hold' : 'fill-abort')}" 
                  cx="80" 
                  cy="80" 
                  r="68"
                  style="stroke-dasharray: 427; stroke-dashoffset: ${427 - (427 * readiness) / 100};"
                ></circle>
              </svg>
              <div class="readiness-center-text">
                <span class="readiness-pct">${readiness}%</span>
                <span class="readiness-sublabel">OVERALL</span>
              </div>
            </div>

            <!-- Readiness Status Tag -->
            <div class="readiness-status-banner ${readiness >= 80 ? 'status-go' : (readiness >= 50 ? 'status-hold' : 'status-abort')}">
              ${rStatus}
            </div>

            <!-- Flight Readiness Criteria Checklist -->
            <div class="readiness-criteria-list">
              <div class="criteria-row ${t.oxygen >= 35 && t.water >= 30 && t.food >= 30 ? 'crit-ok' : 'crit-fail'}">
                <span>🫁 ECLSS Life Support Systems</span>
                <strong>${t.oxygen >= 35 && t.water >= 30 && t.food >= 30 ? '✓ OK' : '⚠ WARNING'}</strong>
              </div>
              <div class="criteria-row ${t.power >= 30 ? 'crit-ok' : 'crit-fail'}">
                <span>⚡ Electrical Power Storage</span>
                <strong>${t.power >= 30 ? '✓ OK' : '⚠ LOW'}</strong>
              </div>
              <div class="criteria-row ${t.rocketFuel >= 40 ? 'crit-ok' : 'crit-fail'}">
                <span>⛽ Propulsion & Fuel Reserves</span>
                <strong>${t.rocketFuel >= 40 ? '✓ OK' : '⚠ DEFICIT'}</strong>
              </div>
              <div class="criteria-row ${t.cargoCapacity <= 90 ? 'crit-ok' : 'crit-fail'}">
                <span>📦 Payload Mass Distribution</span>
                <strong>${t.cargoCapacity <= 90 ? '✓ OPTIMAL' : '⚠ OVERWEIGHT'}</strong>
              </div>
              <div class="criteria-row ${t.astronautHealth >= 50 ? 'crit-ok' : 'crit-fail'}">
                <span>❤️ Commander Biometrics</span>
                <strong>${t.astronautHealth >= 50 ? '✓ FIT' : '⚠ STRESS'}</strong>
              </div>
            </div>

            <!-- Telemetry Warning Logs Feed -->
            <div class="telemetry-log-box">
              <div class="log-title">Live Telemetry Event Log:</div>
              <div class="log-entries">
                ${s.warningLogs.length > 0 
                  ? s.warningLogs.map(l => `<div class="log-entry"><span class="log-time">[${l.timestamp}]</span> ${l.message}</div>`).join('') 
                  : '<div class="log-nominal">All telemetry channels transmitting nominal data. No active faults.</div>'}
              </div>
            </div>
          </aside>
        </div>

        <!-- Functional Navigation Buttons Bar -->
        <nav class="navigation-dock">
          <button class="nav-btn btn-nav-start" id="nav-btn-start" title="Run Pre-Flight Go/No-Go Poll and Countdown">
            <span class="nav-icon">🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label">Start Mission</span>
              <span class="nav-sub">Launch Sequence</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-rocket" title="Configure Spacecraft in Vehicle Hangar">
            <span class="nav-icon">🛸</span>
            <div class="nav-btn-text">
              <span class="nav-label">Rocket Selection</span>
              <span class="nav-sub">Hangar & Payload</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-astronaut" title="Biometric Check and Crew Quarters">
            <span class="nav-icon">👨‍🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label">Astronaut Preparation</span>
              <span class="nav-sub">Crew & Biomedical</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-briefing" title="Flight Trajectory and Mission Duration">
            <span class="nav-icon">📋</span>
            <div class="nav-btn-text">
              <span class="nav-label">Mission Briefing</span>
              <span class="nav-sub">Flight Operations</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-achievements" title="NASA Flight Badges and Certifications">
            <span class="nav-icon">🏆</span>
            <div class="nav-btn-text">
              <span class="nav-label">Achievements</span>
              <span class="nav-sub">Flight Honors</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-greenhouse" title="60-Day Orbital Greenhouse Survival Control" style="border-color: #2ecc71;">
            <span class="nav-icon">🌱</span>
            <div class="nav-btn-text">
              <span class="nav-label" style="color: #a9dfbf;">Greenhouse</span>
              <span class="nav-sub">60-Day Survival</span>
            </div>
          </button>

          <button class="nav-btn" id="nav-btn-extraction" title="Final Mission: Lunar Resupply & Extraction" style="border-color: #00e5ff;">
            <span class="nav-icon">🚀</span>
            <div class="nav-btn-text">
              <span class="nav-label" style="color: #80d8ff;">Extraction</span>
              <span class="nav-sub">Final Resupply</span>
            </div>
          </button>
        </nav>
      </div>
    `;
  }

  renderMetricCard(key, label, value, unit, detail, icon) {
    const status = gameState.getMetricStatus(key);
    const spec = GAME_CONFIG.METRICS[key];
    const fillPercent = key === "missionDuration" ? Math.min(100, (value / 180) * 100) : Math.min(100, Math.max(0, value));

    let statusText = "NOMINAL";
    let badgeClass = "badge-nominal";

    if (status === "critical") {
      statusText = "CRITICAL";
      badgeClass = "badge-critical";
    } else if (status === "caution") {
      statusText = "CAUTION";
      badgeClass = "badge-caution";
    } else if (value >= 85 && key !== "cargoCapacity") {
      statusText = "OPTIMAL";
      badgeClass = "badge-optimal";
    }

    return `
      <div class="metric-card ${status === 'critical' ? 'card-critical' : (status === 'caution' ? 'card-caution' : '')}" data-metric-key="${key}">
        <div class="metric-card-top">
          <div class="metric-name-group">
            <span class="metric-icon">${icon}</span>
            <span class="metric-title">${label}</span>
          </div>
          <div class="metric-status-badge ${badgeClass}">
            ${statusText}
          </div>
        </div>

        <div class="metric-value-row">
          <div class="metric-numerical">
            <span class="number-main">${value}</span>
            <span class="unit-main">${unit}</span>
          </div>
          <div class="metric-detail-unit">${detail}</div>
        </div>

        <!-- Animated Glowing Resource Bar -->
        <div class="metric-bar-track">
          <div 
            class="metric-bar-fill fill-${key} ${status === 'critical' ? 'bar-critical' : (status === 'caution' ? 'bar-caution' : '')}" 
            style="width: ${fillPercent}%;"
          ></div>
        </div>

        <!-- Interactive Adjusters -->
        <div class="metric-card-controls">
          <button class="btn-step btn-step-down" data-metric="${key}" data-delta="-5" title="Decrease ${label}">-</button>
          <input 
            type="range" 
            class="metric-quick-slider" 
            min="${spec ? spec.min : 0}" 
            max="${spec ? spec.max : 100}" 
            value="${value}" 
            data-metric="${key}"
          >
          <button class="btn-step btn-step-up" data-metric="${key}" data-delta="+5" title="Increase ${label}">+</button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // 5 Navigation Buttons
    const btnStart = this.container.querySelector("#nav-btn-start");
    const btnRocket = this.container.querySelector("#nav-btn-rocket");
    const btnAstronaut = this.container.querySelector("#nav-btn-astronaut");
    const btnBriefing = this.container.querySelector("#nav-btn-briefing");
    const btnAchievements = this.container.querySelector("#nav-btn-achievements");

    if (btnStart && this.modalHandlers.onStartMission) {
      btnStart.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onStartMission();
      });
    }

    if (btnRocket && this.modalHandlers.onRocketSelect) {
      btnRocket.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onRocketSelect();
      });
    }

    if (btnAstronaut && this.modalHandlers.onAstronautPrep) {
      btnAstronaut.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAstronautPrep();
      });
    }

    if (btnBriefing && this.modalHandlers.onMissionBriefing) {
      btnBriefing.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onMissionBriefing();
      });
    }

    if (btnAchievements && this.modalHandlers.onAchievements) {
      btnAchievements.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAchievements();
      });
    }

    const btnGreenhouse = this.container.querySelector("#nav-btn-greenhouse");
    if (btnGreenhouse) {
      btnGreenhouse.addEventListener("click", () => {
        sound.playClick();
        if (window.greenhouseModal) {
          window.greenhouseModal.open();
        }
      });
    }

    const btnExtraction = this.container.querySelector("#nav-btn-extraction");
    if (btnExtraction) {
      btnExtraction.addEventListener("click", () => {
        sound.playClick();
        if (window.extractionModal) {
          window.extractionModal.open();
        }
      });
    }

    const btnGuide = this.container.querySelector("#btn-dashboard-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("first_mission");
        }
      });
    }

    // Top Header Pills as shortcuts
    const pillRocket = this.container.querySelector("#pill-rocket");
    const pillAstronaut = this.container.querySelector("#pill-astronaut");
    const pillDest = this.container.querySelector("#pill-destination");

    if (pillRocket && this.modalHandlers.onRocketSelect) {
      pillRocket.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onRocketSelect();
      });
    }
    if (pillAstronaut && this.modalHandlers.onAstronautPrep) {
      pillAstronaut.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onAstronautPrep();
      });
    }
    if (pillDest && this.modalHandlers.onMissionBriefing) {
      pillDest.addEventListener("click", () => {
        sound.playClick();
        this.modalHandlers.onMissionBriefing();
      });
    }

    // Interactive Telemetry Step Buttons (+ / -)
    this.container.querySelectorAll(".btn-step").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const metricKey = btn.getAttribute("data-metric");
        const delta = parseInt(btn.getAttribute("data-delta"), 10);
        sound.playAdjustTone(delta > 0);
        gameState.adjustMetric(metricKey, delta);
        this.render();
        this.attachEvents();
      });
    });

    // Quick Sliders for each metric
    this.container.querySelectorAll(".metric-quick-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const metricKey = slider.getAttribute("data-metric");
        const val = parseInt(e.target.value, 10);
        gameState.setMetric(metricKey, val);
      });

      slider.addEventListener("change", () => {
        sound.playClick();
        this.render();
        this.attachEvents();
      });
    });

    // Stress & Crisis Simulation Buttons
    const simO2 = this.container.querySelector("#btn-sim-o2");
    const simFuel = this.container.querySelector("#btn-sim-fuel");
    const simPower = this.container.querySelector("#btn-sim-power");
    const simCargo = this.container.querySelector("#btn-sim-cargo");
    const simRestore = this.container.querySelector("#btn-sim-restore");

    if (simO2) {
      simO2.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("o2_scrubber");
        this.render();
        this.attachEvents();
      });
    }

    if (simFuel) {
      simFuel.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("fuel_leak");
        this.render();
        this.attachEvents();
      });
    }

    if (simPower) {
      simPower.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("solar_flare");
        this.render();
        this.attachEvents();
      });
    }

    if (simCargo) {
      simCargo.addEventListener("click", () => {
        sound.playWarningAlarm();
        phaserEngine.triggerAlert();
        gameState.simulateCrisis("cargo_overload");
        this.render();
        this.attachEvents();
      });
    }

    if (simRestore) {
      simRestore.addEventListener("click", () => {
        sound.playSuccessChime();
        gameState.restoreNominal();
        this.render();
        this.attachEvents();
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


// --- File: js\components\rocketSelect.js ---
// ============================================================================
// ROCKET SELECTION, CARGO BAY & DIFFICULTY PRESET COMPONENT
// Limited Cargo Equipment Slots, Difficulty Modes, and Supply Loading
// ============================================================================




class RocketSelectComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.unsubscribe = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
    this.unsubscribe = gameState.subscribe((state, event) => {
      if (state.screen === "rocket_select") {
        this.updateView();
      }
    });
  }

  getRocketSvg(rocketId) {
    if (rocketId === "small") {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="scoutGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#cfd8dc"/>
              <stop offset="50%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#90a4ae"/>
            </linearGradient>
            <linearGradient id="scoutFin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#00e5ff"/>
              <stop offset="100%" stop-color="#0091ea"/>
            </linearGradient>
          </defs>
          <path d="M50 15 C38 45 35 110 35 130 L65 130 C65 110 62 45 50 15 Z" fill="url(#scoutGrad)" stroke="#455a64" stroke-width="2"/>
          <polygon points="50,15 42,40 58,40" fill="#00e5ff"/>
          <circle cx="50" cy="55" r="9" fill="#00bcd4" stroke="#ffffff" stroke-width="2.5"/>
          <circle cx="48" cy="53" r="3" fill="#ffffff" opacity="0.8"/>
          <rect x="35" y="80" width="30" height="4" fill="#fc3d21"/>
          <rect x="35" y="86" width="30" height="2" fill="#0b3d91"/>
          <polygon points="35,105 18,135 35,130" fill="url(#scoutFin)"/>
          <polygon points="65,105 82,135 65,130" fill="url(#scoutFin)"/>
          <polygon points="40,130 38,142 62,142 60,130" fill="#37474f"/>
          <polygon points="42,142 50,158 58,142" fill="#ff9100" opacity="0.85"/>
        </svg>
      `;
    } else if (rocketId === "medium") {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="pioneerGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b0bec5"/>
              <stop offset="50%" stop-color="#f5f5f5"/>
              <stop offset="100%" stop-color="#78909c"/>
            </linearGradient>
          </defs>
          <path d="M50 10 C32 40 30 115 30 135 L70 135 C70 115 68 40 50 10 Z" fill="url(#pioneerGrad)" stroke="#37474f" stroke-width="2"/>
          <polygon points="50,10 39,35 61,35" fill="#f4511e"/>
          <rect x="20" y="65" width="10" height="65" rx="4" fill="#cfd8dc" stroke="#455a64" stroke-width="1.5"/>
          <polygon points="20,65 25,55 30,65" fill="#f4511e"/>
          <rect x="70" y="65" width="10" height="65" rx="4" fill="#cfd8dc" stroke="#455a64" stroke-width="1.5"/>
          <polygon points="70,65 75,55 80,65" fill="#f4511e"/>
          <circle cx="44" cy="50" r="6" fill="#00e5ff" stroke="#fff" stroke-width="2"/>
          <circle cx="56" cy="50" r="6" fill="#00e5ff" stroke="#fff" stroke-width="2"/>
          <rect x="30" y="85" width="40" height="5" fill="#0b3d91"/>
          <rect x="30" y="92" width="40" height="3" fill="#fc3d21"/>
          <polygon points="34,135 32,145 44,145 42,135" fill="#263238"/>
          <polygon points="56,135 54,145 66,145 64,135" fill="#263238"/>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 100 160" class="rocket-svg-container">
          <defs>
            <linearGradient id="titanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#37474f"/>
              <stop offset="50%" stop-color="#eceff1"/>
              <stop offset="100%" stop-color="#263238"/>
            </linearGradient>
          </defs>
          <path d="M50 5 C25 35 24 120 24 135 L76 135 C76 120 75 35 50 5 Z" fill="url(#titanGrad)" stroke="#212121" stroke-width="2"/>
          <polygon points="50,5 34,30 66,30" fill="#ffd600"/>
          <rect x="12" y="60" width="12" height="75" rx="4" fill="#607d8b" stroke="#263238" stroke-width="1.5"/>
          <polygon points="12,60 18,48 24,60" fill="#ffd600"/>
          <rect x="76" y="60" width="12" height="75" rx="4" fill="#607d8b" stroke="#263238" stroke-width="1.5"/>
          <polygon points="76,60 82,48 88,60" fill="#ffd600"/>
          <rect x="36" y="45" width="28" height="12" rx="6" fill="#00e5ff" stroke="#ffffff" stroke-width="2"/>
          <polygon points="28,135 26,146 38,146 36,135" fill="#212121"/>
          <polygon points="44,135 42,148 58,148 56,135" fill="#212121"/>
          <polygon points="64,135 62,146 74,146 72,135" fill="#212121"/>
        </svg>
      `;
    }
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const currentRocket = GAME_CONFIG.ROCKETS[s.selectedRocket] || GAME_CONFIG.ROCKETS.small;
    const maxSlots = currentRocket.maxCargoSlots || 2;
    const equippedCount = s.selectedCargo.length;

    this.container.innerHTML = `
      <div class="hangar-layout">
        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner" style="grid-column: 1 / -1;">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 3 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Select your exploration vehicle and equip cargo items (Recommended: <strong>Cryogenic O2</strong> & <strong>Repair Multi-Tool</strong>). When ready, click <strong style="color: var(--text-highlight);">[Crew Boarding →]</strong>!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-hangar-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Left: Rocket Class Selection & Limited Cargo Equipment -->
        <section class="rocket-hangar">
          <div class="hangar-header">
            <h2><span>🚀</span> Rocket Hangar & Cargo Bay</h2>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Target: <strong style="color: var(--accent-gold);">${dest.name}</strong> (${dest.distanceKm.toLocaleString()} km)
            </div>
          </div>

          <div class="rocket-options">
            ${this.renderRocketCards()}
          </div>

          <!-- Limited Cargo Equipment Slots (Tough Trade-Offs!) -->
          <div class="cargo-selection-panel">
            <div class="cargo-slots-header">
              <div>
                <strong style="color: var(--border-cyan); font-size: 0.95rem;">📦 Cargo Equipment Bay</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Select equipment to bring into space (Max ${maxSlots} items for ${currentRocket.name}):</div>
              </div>
              <div class="cargo-slots-indicator">
                ${Array.from({ length: maxSlots }).map((_, i) => `
                  <div class="cargo-slot-dot ${i < equippedCount ? 'filled' : ''}" title="Cargo Slot ${i + 1}"></div>
                `).join("")}
              </div>
            </div>

            <div class="cargo-grid">
              ${this.renderCargoItems(maxSlots)}
            </div>
          </div>

          <!-- Difficulty Preset Selector -->
          <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px 20px;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 6px;">Select Simulation Difficulty:</div>
            <div class="difficulty-selector">
              ${Object.values(GAME_CONFIG.DIFFICULTY).map((diff) => `
                <button class="btn-diff ${s.difficulty === diff.id ? 'active' : ''}" data-diff-id="${diff.id}">
                  <span>${diff.icon} ${diff.name}</span>
                </button>
              `).join("")}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
              ${GAME_CONFIG.DIFFICULTY[s.difficulty].description}
            </div>
          </div>
        </section>

        <!-- Right: Supply Loadout & Payload Warnings -->
        <aside class="supply-station">
          <div class="station-title">
            <span>⚖️</span>
            <span>Life Support Supply Allocation</span>
          </div>

          <div class="destination-reminder">
            <span>Destination: <strong>${dest.name}</strong></span>
            <span>Gravity: <strong>${dest.gravityMps2} m/s²</strong></span>
          </div>

          <div class="supply-controls">
            ${this.renderSupplyControl("fuel", "⛽ Rocket Fuel (LOX)", s.loadedSupplies.fuel, currentRocket.maxCapacity.fuel, dest.recommendedSupplies.fuel, "Tons")}
            ${this.renderSupplyControl("oxygen", "🫁 Oxygen Reserves", s.loadedSupplies.oxygen, currentRocket.maxCapacity.oxygen, dest.recommendedSupplies.oxygen, "%")}
            ${this.renderSupplyControl("water", "💧 Purified Water", s.loadedSupplies.water, currentRocket.maxCapacity.water, dest.recommendedSupplies.water, "Liters")}
            ${this.renderSupplyControl("food", "🍞 Food Packs (MRE)", s.loadedSupplies.food, currentRocket.maxCapacity.food, dest.recommendedSupplies.food, "Rations")}
            ${this.renderSupplyControl("power", "⚡ Auxiliary Power", s.loadedSupplies.power, currentRocket.maxCapacity.power, dest.recommendedSupplies.power, "kWh")}
          </div>

          <div id="payload-warning-container">
            ${this.renderWarningBox()}
          </div>

          <div class="payload-actions">
            <button class="btn-secondary" id="btn-back-dashboard">
              <span>← Mission Control</span>
            </button>
            <button class="btn-primary" id="btn-proceed-boarding">
              <span>Crew Boarding →</span>
            </button>
          </div>
        </aside>
      </div>
    `;
  }

  renderRocketCards() {
    const s = gameState.state;
    // Render the 3 distinct rocket classes: Scout-1 (small), Pioneer-X (medium), Titan-V (heavy)
    const primaryRockets = [
      GAME_CONFIG.ROCKETS.small,
      GAME_CONFIG.ROCKETS.medium,
      GAME_CONFIG.ROCKETS.heavy
    ].filter(Boolean);

    return primaryRockets.map((r) => {
      const isSelected = s.selectedRocket === r.id;
      const isUnlocked = s.unlockedRockets ? (s.unlockedRockets.includes(r.id) || r.id === "small" || r.id === "medium") : true;
      const badgeText = (r.category || 'Lifter').split(' ')[0];

      return `
        <div class="rocket-card ${isSelected ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}" data-rocket-id="${r.id}">
          <div class="rocket-card-badge">${badgeText} • ${r.maxCargoSlots || 2} Slots</div>
          <div class="rocket-visual">
            ${this.getRocketSvg(r.id)}
          </div>
          <div class="rocket-info">
            <h3>${r.name}</h3>
            <div class="rocket-tier">${r.category || 'Exploration Vehicle'}</div>
            <div class="rocket-desc">${r.description || ''}</div>
          </div>

          <div class="rocket-stat-bars">
            <div class="stat-row">
              <span>Thrust:</span>
              <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${r.fuelCapacity || 80}%;"></div></div>
            </div>
            <div class="stat-row">
              <span>Cargo Slots:</span>
              <strong style="color: var(--accent-gold);">${r.maxCargoSlots || 2} Items</strong>
            </div>
          </div>

          ${!isUnlocked ? `
            <div class="rocket-lock-badge">
              🔒 Locked Vehicle (Cadet Rank)
            </div>
          ` : ''}
        </div>
      `;
    }).join("");
  }

  renderCargoItems(maxSlots) {
    const s = gameState.state;
    return Object.values(GAME_CONFIG.CARGO_ITEMS).map((item) => {
      const isEquipped = s.selectedCargo.includes(item.id);
      return `
        <div class="cargo-item-card ${isEquipped ? 'equipped' : ''}" data-cargo-id="${item.id}">
          <span style="font-size: 1.8rem;">${item.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.82rem; color: #fff;">${item.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-highlight);">${item.effect}</div>
          </div>
          <div style="font-size: 0.8rem; font-weight: 800; color: ${isEquipped ? 'var(--text-highlight)' : 'var(--text-muted)'};">
            ${isEquipped ? '✓ EQUIPPED' : '+ ADD'}
          </div>
        </div>
      `;
    }).join("");
  }

  renderSupplyControl(key, label, currentVal, maxVal, recommendedVal, unit) {
    return `
      <div class="supply-row" data-supply-key="${key}">
        <div class="supply-header">
          <div class="supply-name"><span>${label}</span></div>
          <div class="supply-meta"><span class="curr-val">${currentVal}</span> / ${maxVal} ${unit}</div>
        </div>
        <div class="supply-slider-wrapper">
          <button class="btn-step btn-minus" data-key="${key}">-</button>
          <input type="range" class="supply-slider" data-key="${key}" min="15" max="${maxVal}" value="${currentVal}">
          <button class="btn-step btn-plus" data-key="${key}">+</button>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-muted); display: flex; justify-content: space-between;">
          <span>Min Recommended: <strong>${recommendedVal} ${unit}</strong></span>
          <span style="color: ${currentVal >= recommendedVal ? 'var(--text-highlight)' : 'var(--meter-food)'};">
            ${currentVal >= recommendedVal ? '✓ Safe' : '⚠ Deficit'}
          </span>
        </div>
      </div>
    `;
  }

  renderWarningBox() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const loaded = s.loadedSupplies;
    const req = dest.recommendedSupplies;

    const warnings = [];
    if (loaded.fuel < req.fuel) warnings.push(`Fuel load (${loaded.fuel}) is below recommended ${req.fuel} for ${dest.name}.`);
    if (loaded.oxygen < req.oxygen) warnings.push(`Oxygen reserves (${loaded.oxygen}) may deplete before base camp setup.`);
    if (loaded.water < req.water) warnings.push(`Water supply (${loaded.water}) is under safe planetary margin.`);
    if (loaded.food < req.food) warnings.push(`Food rations (${loaded.food}) insufficient for full expedition.`);
    if (loaded.power < req.power) warnings.push(`Auxiliary batteries (${loaded.power}) low for base heating.`);

    if (warnings.length > 0) {
      return `
        <div class="payload-warning-box warning">
          <span style="font-size: 1.4rem;">⚠️</span>
          <div>
            <strong>SUPPLY DEFICIT WARNING FOR ${dest.name.toUpperCase()}:</strong>
            <ul style="margin: 3px 0 0 16px; padding: 0;">
              ${warnings.slice(0, 2).map((w) => `<li>${w}</li>`).join("")}
            </ul>
            <div style="margin-top: 3px; font-size: 0.72rem; color: #ffcc80;">
              Tip: Increase supplies or choose a larger spacecraft with extra cargo capacity!
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="payload-warning-box nominal">
          <span style="font-size: 1.4rem;">✅</span>
          <div>
            <strong>PAYLOAD NOMINAL FOR ${dest.name.toUpperCase()}</strong>
            <div>Supplies and cargo equipment meet NASA safety margins. All systems GO!</div>
          </div>
        </div>
      `;
    }
  }

  attachEvents() {
    // Select rocket
    this.container.querySelectorAll(".rocket-card").forEach((card) => {
      card.addEventListener("click", () => {
        const rocketId = card.getAttribute("data-rocket-id");
        const rocket = GAME_CONFIG.ROCKETS[rocketId];
        if (!rocket) return;

        if (!gameState.state.unlockedRockets.includes(rocketId)) {
          sound.playFail();
          alert(`Rocket Locked! Earn ${rocket.unlockedAtScore} total points to unlock.`);
          return;
        }

        sound.playClick();
        gameState.selectRocket(rocketId);
        this.render();
        this.attachEvents();
      });
    });

    // Toggle cargo items
    this.container.querySelectorAll(".cargo-item-card").forEach((card) => {
      card.addEventListener("click", () => {
        const cargoId = card.getAttribute("data-cargo-id");
        const success = gameState.toggleCargoItem(cargoId);
        if (success) {
          sound.playClick();
          this.render();
          this.attachEvents();
        } else {
          sound.playFail();
          const r = GAME_CONFIG.ROCKETS[gameState.state.selectedRocket];
          alert(`Cargo bay full! ${r.name} has only ${r.maxCargoSlots} cargo equipment slots.`);
        }
      });
    });

    // Difficulty buttons
    this.container.querySelectorAll(".btn-diff").forEach((btn) => {
      btn.addEventListener("click", () => {
        const diffId = btn.getAttribute("data-diff-id");
        gameState.state.difficulty = diffId;
        sound.playClick();
        this.render();
        this.attachEvents();
      });
    });

    // Sliders
    this.container.querySelectorAll(".supply-slider").forEach((slider) => {
      slider.addEventListener("input", (e) => {
        const key = e.target.getAttribute("data-key");
        const val = parseInt(e.target.value, 10);
        gameState.setSupplyValue(key, val);
        this.updateSupplyRow(key, val);
        this.updateWarning();
      });
    });

    // Plus / minus buttons
    this.container.querySelectorAll(".btn-step").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        const isPlus = btn.classList.contains("btn-plus");
        const delta = isPlus ? 10 : -10;
        const current = gameState.state.loadedSupplies[key] || 50;
        const newVal = current + delta;

        sound.playClick();
        gameState.setSupplyValue(key, newVal);
        this.updateSupplyRow(key, gameState.state.loadedSupplies[key]);
        this.updateWarning();
      });
    });

    // Navigation
    const backBtn = this.container.querySelector("#btn-back-dashboard");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        sound.playClick();
        gameState.setScreen("dashboard");
      });
    }

    const boardingBtn = this.container.querySelector("#btn-proceed-boarding");
    if (boardingBtn) {
      boardingBtn.addEventListener("click", () => {
        sound.playSuccessChime();
        gameState.initializeMissionTelemetry();
        gameState.setScreen("boarding");
      });
    }

    const btnGuide = this.container.querySelector("#btn-hangar-open-guide");
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

  updateSupplyRow(key, val) {
    const row = this.container.querySelector(`.supply-row[data-supply-key="${key}"]`);
    if (!row) return;
    const currValEl = row.querySelector(".curr-val");
    const slider = row.querySelector(".supply-slider");
    if (currValEl) currValEl.textContent = val;
    if (slider) slider.value = val;
  }

  updateWarning() {
    const warningContainer = this.container.querySelector("#payload-warning-container");
    if (warningContainer) {
      warningContainer.innerHTML = this.renderWarningBox();
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


// --- File: js\components\checklist.js ---
// ============================================================================
// CREW BOARDING & PRE-LAUNCH CHECKLIST COMPONENT
// Astronaut drag-and-drop into cockpit and 4-step mission verification
// ============================================================================




class ChecklistComponent {
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



// --- File: js\components\launchFlight.js ---
// ============================================================================
// LAUNCH & ORBITAL FLIGHT SIMULATION
// 10-0 Countdown, Canvas particle rocket ignition, atmospheric layers,
// fuel/altitude telemetry, and interactive flight controls
// ============================================================================




class LaunchFlightComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.countdownTimer = null;
    this.countdownVal = 10;
    this.phase = "countdown"; // 'countdown', 'launching', 'orbit_reached'

    // Flight physics & entities
    this.rocket = {
      x: 0,
      y: 0,
      width: 48,
      height: 90,
      vx: 0,
      tilt: 0
    };
    this.particles = [];
    this.stars = [];
    this.collectibles = [];
    this.debris = [];
    this.clouds = [];
    
    this.altitude = 0;       // 0 to 100,000 km
    this.maxAltitude = 100000;
    this.speed = 0;          // km/s
    this.fuel = 100;
    this.keys = { left: false, right: false, up: false, down: false };
    this.touchSteer = 0;     // -1 for left, 1 for right
    this.vibration = 0;

    this.init();
  }

  init() {
    this.render();
    this.attachEvents();
  }

  render() {
    const s = gameState.state;
    const rocket = GAME_CONFIG.ROCKETS[s.selectedRocket];
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Top HUD during flight -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Spacecraft</span>
              <div style="font-weight: 800; color: #fff;">${rocket.name}</div>
            </div>
            <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Destination</span>
              <div style="font-weight: 800; color: var(--accent-gold);">${dest.name}</div>
            </div>
          </div>

          <!-- Gauges -->
          <div style="display: flex; align-items: center; gap: 24px;">
            <!-- Altitude Bar -->
            <div style="display: flex; flex-direction: column; width: 180px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                <span>ALTITUDE</span>
                <span id="flight-alt-text">0 km</span>
              </div>
              <div style="height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="flight-alt-bar" style="height: 100%; width: 0%; background: var(--border-cyan); transition: width 0.1s;"></div>
              </div>
            </div>

            <!-- Fuel Bar -->
            <div style="display: flex; flex-direction: column; width: 180px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
                <span>REMAINING FUEL</span>
                <span id="flight-fuel-text" style="color: var(--meter-fuel);">100%</span>
              </div>
              <div style="height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="flight-fuel-bar" style="height: 100%; width: 100%; background: var(--meter-fuel); transition: width 0.1s;"></div>
              </div>
            </div>

            <!-- Flight Telemetry Speed -->
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">VELOCITY</span>
              <div id="flight-speed-text" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1.1rem; color: var(--text-highlight);">
                0.0 km/s
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Game Screen -->
        <div class="flight-canvas-container" id="flight-canvas-container">
          <canvas id="flight-canvas" class="game-canvas"></canvas>

          <!-- 10s Countdown Overlay -->
          <div class="countdown-overlay" id="flight-countdown-box">
            <div style="font-size: 0.85rem; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 4px;">T-MINUS</div>
            <div id="countdown-number" style="font-size: 3.5rem; line-height: 1;">10</div>
            <div style="font-size: 0.8rem; color: #fff; margin-top: 6px;" id="countdown-status">TERMINAL COUNTDOWN RUNNING</div>
            <button class="btn-secondary" id="btn-abort-countdown" style="margin-top: 10px; font-size: 0.78rem; padding: 4px 12px;">
              Abort Countdown
            </button>
          </div>

          <!-- On-screen Tablet Steering Controls -->
          <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 12px; z-index: 10;">
            <button class="btn-icon" id="btn-steer-left" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">◀</button>
            <button class="btn-icon" id="btn-steer-right" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">▶</button>
          </div>

          <div style="position: absolute; bottom: 24px; right: 24px; color: rgba(255,255,255,0.7); font-size: 0.8rem; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: var(--radius-sm); pointer-events: none;">
            Steer with <strong>[A / D]</strong> or <strong>[◀ / ▶]</strong> to collect Data Beacons (+25 pts)!
          </div>
        </div>
      </div>
    `;

    this.setupCanvas();
    this.startCountdown();
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#flight-canvas");
    if (!this.canvas) return;

    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    this.rocket.x = this.canvas.width / 2;
    this.rocket.y = this.canvas.height - 110;
    this.fuel = gameState.state.loadedSupplies.fuel || 100;
    this.altitude = 0;
    this.speed = 0;

    // Generate starfield
    this.stars = [];
    for (let i = 0; i < 90; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.8,
        speed: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // Clouds for lower atmosphere
    this.clouds = [];
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * (this.canvas.height * 0.6),
        width: Math.random() * 120 + 80,
        height: Math.random() * 40 + 20,
        speed: Math.random() * 3 + 2
      });
    }
  }

  startCountdown() {
    this.countdownVal = 10;
    this.phase = "countdown";
    this.vibration = 0;
    const numEl = this.container.querySelector("#countdown-number");
    const boxEl = this.container.querySelector("#flight-countdown-box");
    const statusEl = this.container.querySelector("#countdown-status");

    sound.playQuindar();

    this.countdownTimer = setInterval(() => {
      this.countdownVal--;
      if (numEl) numEl.textContent = this.countdownVal;

      if (this.countdownVal <= 3 && this.countdownVal > 0) {
        sound.startRocketRumble(0.5);
        if (statusEl) statusEl.textContent = "🔥 MAIN ENGINE IGNITION SEQUENCE START!";
      }

      if (this.countdownVal > 0) {
        sound.playCountdown(false);
      } else if (this.countdownVal === 0) {
        sound.playCountdown(true);
        if (numEl) numEl.textContent = "LIFTOFF!";
        if (statusEl) statusEl.textContent = "🚀 IGNITION & LIFTOFF! WE HAVE A MISSION!";

        sound.startRocketRumble(1.0);
        this.phase = "launching";

        setTimeout(() => {
          if (boxEl) boxEl.style.display = "none";
        }, 1200);

        clearInterval(this.countdownTimer);
      }
    }, 1000);

    this.loop();
  }

  attachEvents() {
    // Keyboard controls (WASD & Arrow Keys)
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.keys.up = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") this.keys.down = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") this.keys.up = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") this.keys.down = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Touch on-screen buttons
    const btnLeft = this.container.querySelector("#btn-steer-left");
    const btnRight = this.container.querySelector("#btn-steer-right");
    if (btnLeft && btnRight) {
      btnLeft.addEventListener("pointerdown", () => { this.touchSteer = -1; sound.playThrusterPulse(); });
      btnLeft.addEventListener("pointerup", () => { this.touchSteer = 0; });
      btnLeft.addEventListener("pointercancel", () => { this.touchSteer = 0; });

      btnRight.addEventListener("pointerdown", () => { this.touchSteer = 1; sound.playThrusterPulse(); });
      btnRight.addEventListener("pointerup", () => { this.touchSteer = 0; });
      btnRight.addEventListener("pointercancel", () => { this.touchSteer = 0; });
    }

    // Abort button
    const abortBtn = this.container.querySelector("#btn-abort-countdown");
    if (abortBtn) {
      abortBtn.addEventListener("click", () => {
        sound.playFail();
        this.cleanup();
        gameState.setScreen("boarding");
      });
    }

    // Resize listener
    this.resizeHandler = () => {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
      this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    };
    window.addEventListener("resize", this.resizeHandler);
  }

  loop() {
    this.update();
    this.draw();
    if (this.phase !== "orbit_reached") {
      this.animId = requestAnimationFrame(() => this.loop());
    }
  }

  update() {
    if (this.phase === "countdown") {
      if (this.countdownVal <= 3) {
        this.vibration = (4 - this.countdownVal) * 2.5;
        // Billowing ignition flames & smoke under the pad
        for (let i = 0; i < 4; i++) {
          this.particles.push({
            x: this.rocket.x + (Math.random() * 32 - 16),
            y: this.rocket.y + 42,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 4 + 2,
            radius: Math.random() * 12 + 6,
            life: 1.0,
            color: Math.random() > 0.4 ? "#ff5722" : (Math.random() > 0.5 ? "#ffb300" : "#90a4ae")
          });
        }
      } else {
        this.vibration = 0;
      }
      this.particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.96;
        p.life -= 0.04;
        if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
      });
      return;
    }

    if (this.phase === "launching") {
      // Throttle speed control with Up/Down (W/S)
      if (this.keys.up) {
        this.speed = Math.min(14.0, this.speed + 0.1);
        this.fuel = Math.max(0, this.fuel - 0.05);
      } else if (this.keys.down) {
        this.speed = Math.max(2.0, this.speed - 0.08);
      } else {
        this.speed = Math.min(11.2, this.speed + 0.05); // Accelerates towards escape velocity 11.2 km/s
      }

      this.altitude += this.speed * 180;
      this.vibration = this.altitude < 15000 ? (1 - this.altitude / 15000) * 2 : 0;
      
      // Fuel consumption
      this.fuel = Math.max(0, this.fuel - 0.07);
      gameState.state.telemetry.fuel = Math.round(this.fuel);
      gameState.state.telemetry.rocketFuel = Math.round(this.fuel);

      // Check fuel out failure condition!
      if (this.fuel <= 0) {
        this.cleanup();
        gameState.failMission({
          cause: "Propellant Tanks Exhausted In Deep Space",
          tip: "Throttle conservatively and collect Energy pods (⚡) during transit.",
          causalityList: [
            "Rocket fuel depleted before achieving planetary transfer orbit",
            "Attitude thrusters and orbital insertion stage became unresponsive",
            "Spacecraft stuck in interplanetary drift"
          ]
        });
        return;
      }

      // Steer physics
      let steerInput = 0;
      if (this.keys.left || this.touchSteer === -1) steerInput -= 1;
      if (this.keys.right || this.touchSteer === 1) steerInput += 1;

      this.rocket.vx += steerInput * 0.8;
      this.rocket.vx *= 0.88; // Friction
      this.rocket.x += this.rocket.vx;
      this.rocket.tilt = this.rocket.vx * 3;

      // Keep rocket within bounds
      const margin = 50;
      if (this.rocket.x < margin) { this.rocket.x = margin; this.rocket.vx = 0; }
      if (this.rocket.x > this.canvas.width - margin) { this.rocket.x = this.canvas.width - margin; this.rocket.vx = 0; }

      // Spawn flame & smoke particles
      for (let i = 0; i < 4; i++) {
        this.particles.push({
          x: this.rocket.x + (Math.random() * 16 - 8),
          y: this.rocket.y + 40,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 6 + 8,
          radius: Math.random() * 8 + 4,
          life: 1.0,
          color: Math.random() > 0.4 ? "#ff9100" : "#ffd600"
        });
      }

      // Spawn collectibles (Science Beacons & Energy Units)
      if (Math.random() < 0.04 && this.collectibles.length < 5) {
        const isEnergy = Math.random() > 0.45;
        this.collectibles.push({
          x: Math.random() * (this.canvas.width - 100) + 50,
          y: -30,
          vy: Math.random() * 3 + 4,
          icon: isEnergy ? "⚡" : "📡",
          type: isEnergy ? "energy" : "beacon",
          size: 26
        });
      }

      // Spawn Debris (Micro-meteoroids / Asteroids)
      if (Math.random() < 0.025 && this.debris.length < 4) {
        this.debris.push({
          x: Math.random() * (this.canvas.width - 80) + 40,
          y: -40,
          vy: Math.random() * 4 + 6,
          vx: Math.random() * 2 - 1,
          radius: 12
        });
      }

      // Update collectibles
      this.collectibles.forEach((c, idx) => {
        c.y += c.vy + this.speed * 0.8;
        // Collision with rocket
        const dx = c.x - this.rocket.x;
        const dy = c.y - (this.rocket.y - 15);
        const dist = Math.hypot(dx, dy);
        if (dist < 40) {
          sound.playCollect();
          if (c.type === "energy") {
            this.fuel = Math.min(100, this.fuel + 8);
            gameState.addScore(15);
          } else {
            gameState.addScore(25);
          }
          this.collectibles.splice(idx, 1);
        } else if (c.y > this.canvas.height + 50) {
          this.collectibles.splice(idx, 1);
        }
      });

      // Update debris
      this.debris.forEach((d, idx) => {
        d.y += d.vy + this.speed * 0.8;
        d.x += d.vx;
        const dx = d.x - this.rocket.x;
        const dy = d.y - (this.rocket.y - 15);
        const dist = Math.hypot(dx, dy);
        if (dist < 35) {
          sound.playThrusterPulse();
          this.fuel = Math.max(0, this.fuel - 4);
          this.debris.splice(idx, 1);
        } else if (d.y > this.canvas.height + 50) {
          this.debris.splice(idx, 1);
        }
      });

      // Check orbit reached condition
      if (this.altitude >= this.maxAltitude) {
        this.onOrbitAchieved();
      }

      // Update HUD elements
      const altText = this.container.querySelector("#flight-alt-text");
      const altBar = this.container.querySelector("#flight-alt-bar");
      const fuelText = this.container.querySelector("#flight-fuel-text");
      const fuelBar = this.container.querySelector("#flight-fuel-bar");
      const speedText = this.container.querySelector("#flight-speed-text");

      const altPercent = Math.min(100, (this.altitude / this.maxAltitude) * 100);
      if (altText) altText.textContent = `${Math.round(this.altitude).toLocaleString()} km`;
      if (altBar) altBar.style.width = `${altPercent}%`;
      if (fuelText) fuelText.textContent = `${Math.round(this.fuel)}%`;
      if (fuelBar) fuelBar.style.width = `${Math.max(0, this.fuel)}%`;
      if (speedText) speedText.textContent = `${this.speed.toFixed(1)} km/s`;
    }

    // Update particles
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius *= 0.94;
      p.life -= 0.03;
      if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
    });

    // Update stars scrolling
    this.stars.forEach((s) => {
      s.y += s.speed * (this.phase === "launching" ? (this.speed * 0.8 + 1) : 0.5);
      if (s.y > this.canvas.height) {
        s.y = 0;
        s.x = Math.random() * this.canvas.width;
      }
    });
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Atmospheric gradient transition
    const progress = Math.min(1, this.altitude / 60000);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    
    if (progress < 0.25) {
      // Lower atmosphere
      grad.addColorStop(0, "#1976d2");
      grad.addColorStop(0.7, "#64b5f6");
      grad.addColorStop(1, "#b3e5fc");
    } else if (progress < 0.6) {
      // Stratosphere / Mesosphere
      grad.addColorStop(0, "#080c18");
      grad.addColorStop(0.6, "#152238");
      grad.addColorStop(1, "#283593");
    } else {
      // Space / Exosphere
      grad.addColorStop(0, "#02040a");
      grad.addColorStop(0.7, "#050a16");
      grad.addColorStop(1, "#0d1b2a");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Draw stars
    ctx.fillStyle = "#ffffff";
    this.stars.forEach((s) => {
      ctx.globalAlpha = s.alpha * Math.max(0.2, progress);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Curvature of Earth at high altitude
    if (progress > 0.45) {
      const curveY = h + 200 - (progress - 0.45) * 150;
      ctx.beginPath();
      ctx.arc(w / 2, curveY + 450, 600, Math.PI, 0);
      ctx.fillStyle = "#1565c0";
      ctx.fill();
      // Glowing atmosphere rim
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 6;
      ctx.stroke();
    }

    // Draw Launch Pad Tower if at ground level
    if (this.altitude < 1500) {
      const padY = this.rocket.y + 40;
      ctx.fillStyle = "#37474f";
      ctx.fillRect(this.canvas.width / 2 - 90, padY, 180, 70);
      // Service tower gantry
      ctx.fillStyle = "#c62828";
      ctx.fillRect(this.canvas.width / 2 - 80, padY - 90, 16, 90);
    }

    // Draw particles (exhaust flame & smoke)
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Collectible Data Beacons
    this.collectibles.forEach((c) => {
      ctx.font = `${c.size}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(c.icon, c.x, c.y);

      // Glowing aura
      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw Debris
    this.debris.forEach((d) => {
      ctx.fillStyle = "#78909c";
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#455a64";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw Rocket
    ctx.save();
    const vxOffset = this.vibration ? (Math.random() - 0.5) * this.vibration : 0;
    const vyOffset = this.vibration ? (Math.random() - 0.5) * this.vibration : 0;
    ctx.translate(this.rocket.x + vxOffset, this.rocket.y + vyOffset);
    ctx.rotate((this.rocket.tilt * Math.PI) / 180);

    // Rocket Body
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(16, 25);
    ctx.lineTo(-16, 25);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Red Nose Cone
    ctx.fillStyle = "#fc3d21";
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(8, -25);
    ctx.lineTo(-8, -25);
    ctx.closePath();
    ctx.fill();

    // Blue Cockpit Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -10, 6, 0, Math.PI * 2);
    ctx.fill();

    // Fins
    ctx.fillStyle = "#0b3d91";
    ctx.beginPath();
    ctx.moveTo(-16, 15);
    ctx.lineTo(-26, 32);
    ctx.lineTo(-16, 25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(16, 15);
    ctx.lineTo(26, 32);
    ctx.lineTo(16, 25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  onOrbitAchieved() {
    this.phase = "orbit_reached";
    sound.stopRocketRumble();
    sound.playSuccessChime();

    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    // Show Orbit Reached Modal & Proceed to Planetary Landing
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">🛰️</div>
        <h2 style="color: var(--text-highlight); font-size: 1.5rem; margin-bottom: 6px;">
          ESCAPE VELOCITY & TRANSFER ORBIT ACHIEVED!
        </h2>
        <p style="color: #cfd8dc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">
          The spacecraft has left Earth's atmosphere and entered deep space interplanetary cruise toward <strong>${dest.name}</strong>! Before descent, Houston Mission Control requires you to establish the Real-Time Deep Space Comm Link, align solar arrays, and calibrate life support telemetry to earn <strong>+5 Science Points</strong> and certify entry trajectory.
        </p>

        <div style="background: rgba(0, 229, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.85rem; text-align: left;">
          <div>🪐 Target Destination: <strong>${dest.name}</strong></div>
          <div>📡 Mission Objective: <strong>Deep Space Real-Time Comms Link (Earth ⇄ Spacecraft)</strong></div>
          <div>⭐ Mission Certification: <strong>+5 Science Points Awarded</strong></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-primary" id="btn-begin-transit" style="width: 100%; justify-content: center; font-size: 1.15rem; padding: 15px; box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);">
            Engage Deep Space Comm & Transit Mission (+5 Pts) 📡
          </button>
          <button class="btn-secondary" id="btn-skip-to-lander" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 8px;">
            Direct Descent to Landing Site 🛬
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-begin-transit").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("transit");
    });

    overlay.querySelector("#btn-skip-to-lander").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("lander");
    });
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    sound.stopRocketRumble();
    window.removeEventListener("resize", this.resizeHandler);
  }

  destroy() {
    this.cleanup();
  }
}



// --- File: js\components\transitMission.js ---
// ============================================================================
// DEEP SPACE REAL-TIME MISSION CONTROLLER COMPONENT
// Earth <-> Moon/Mars Speed-of-Light Comms Delay, Outpost Telemetry & +5 Pts
// ============================================================================





class TransitMissionComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.mission = null;
    this.updateHandler = null;
    this.logHandler = null;
    this.alertHandler = null;
    this.pointsAwarded = false;

    // Guidance objectives
    this.objectives = {
      solarDeployed: false,
      shieldingRaised: false,
      rationingConfigured: false
    };

    this.init();
  }

  init() {
    // Choose mission target based on player's selected destination
    const targetDest = gameState.state.selectedDestination === "mars" ? "mars" : "moon";
    this.mission = new Mission(targetDest, { crew: 4 });

    this.render();
    this.attachEvents();

    // Start simulation loop
    this.mission.launch();
    this.mission.start();

    // Subscribe to mission events
    this.updateHandler = (e) => this.onMissionUpdate(e.detail);
    this.logHandler = (e) => this.onMissionLog(e.detail);
    this.alertHandler = (e) => this.onMissionAlert(e.detail);

    this.mission.addEventListener("update", this.updateHandler);
    this.mission.addEventListener("log", this.logHandler);
    this.mission.addEventListener("alert", this.alertHandler);

    sound.playQuindarBeep();
  }

  render() {
    const s = this.mission.snapshot();
    const dest = this.mission.dest;
    const isMars = this.mission.targetId === "mars";
    const completedCount = Object.values(this.objectives).filter(Boolean).length;
    const allCompleted = completedCount >= 3;

    this.container.innerHTML = `
      <div class="transit-mission-layout">
        <!-- Top Telemetry Header -->
        <header class="transit-header">
          <div class="transit-brand">
            <span class="transit-badge-icon">${isMars ? '🔴' : '🌕'}</span>
            <div>
              <h2>Deep Space Flight Controller • Earth ⇄ ${dest.name.toUpperCase()}</h2>
              <div class="transit-subtitle">
                NASA Deep Space Network (DSN) • Real-Time Light-Speed Telemetry Link
              </div>
            </div>
          </div>

          <!-- Live Mission Metrics Bar -->
          <div class="transit-hud-stats">
            <div class="transit-stat-box">
              <span class="t-label">FLIGHT PHASE</span>
              <strong class="t-val highlight-val" id="hud-phase">${s.phase}</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">DISTANCE FROM EARTH</span>
              <strong class="t-val" id="hud-dist">${Math.round(s.distanceKm).toLocaleString()} km</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">SPEED OF LIGHT DELAY (1-WAY)</span>
              <strong class="t-val warning-val" id="hud-delay">${fmtDelay(s.lightDelaySec)}</strong>
            </div>
            <div class="transit-stat-box">
              <span class="t-label">CREW COMPLEMENT</span>
              <strong class="t-val">${this.mission.crew} Astronauts</strong>
            </div>
          </div>
        </header>

        <!-- Main 2-Column Flight Deck -->
        <div class="transit-grid">
          <!-- Left: Player Directives & Command Uplink Terminal -->
          <section class="transit-controls-col">
            <!-- Step-by-Step Guidance Box -->
            <div class="transit-guidance-card ${allCompleted ? 'guidance-done' : ''}">
              <div class="guidance-header">
                <div>
                  <span class="guidance-tag">FLIGHT DIRECTOR DIRECTIVE</span>
                  <h3>Deep Space Transit Operations</h3>
                </div>
                <div class="guidance-pts-badge">
                  ${this.pointsAwarded ? '⭐ +5 PTS AWARDED' : '⭐ +5 PTS MISSION'}
                </div>
              </div>

              <p class="guidance-desc">
                Your spacecraft is cruising through deep space toward <strong>${dest.name}</strong>. Because radio signals travel at the speed of light (<strong>299,792 km/s</strong>), your commands to the spacecraft experience a real-time comm delay! Complete the 3 flight directives below to earn <strong>+5 Science Points</strong> and unlock planetary landing:
              </p>

              <!-- Interactive Directives Checklist -->
              <div class="directives-list">
                <div class="directive-item ${this.objectives.solarDeployed ? 'done' : ''}" id="dir-solar">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.solarDeployed ? '✓' : '1'}</span>
                    <div>
                      <strong>Deploy Solar Arrays (100% Orientation)</strong>
                      <div class="dir-hint">Align solar panels toward the Sun to recharge auxiliary batteries.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-solar" ${this.objectives.solarDeployed ? 'disabled' : ''}>
                    ${this.objectives.solarDeployed ? 'Aligned ✓' : 'Deploy Panels ☀️'}
                  </button>
                </div>

                <div class="directive-item ${this.objectives.shieldingRaised ? 'done' : ''}" id="dir-shield">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.shieldingRaised ? '✓' : '2'}</span>
                    <div>
                      <strong>Raise Radiation Shielding Deflection</strong>
                      <div class="dir-hint">Power electromagnetic shields to reduce cosmic ray exposure.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-shield" ${this.objectives.shieldingRaised ? 'disabled' : ''}>
                    ${this.objectives.shieldingRaised ? 'Shielded ✓' : 'Raise Shield 🛡️'}
                  </button>
                </div>

                <div class="directive-item ${this.objectives.rationingConfigured ? 'done' : ''}" id="dir-ration">
                  <div class="dir-left">
                    <span class="dir-icon">${this.objectives.rationingConfigured ? '✓' : '3'}</span>
                    <div>
                      <strong>Optimize Life Support ECLSS Loop</strong>
                      <div class="dir-hint">Calibrate rationing to conserve oxygen and water during deep space cruise.</div>
                    </div>
                  </div>
                  <button class="btn-secondary btn-quick-act" id="btn-quick-ration" ${this.objectives.rationingConfigured ? 'disabled' : ''}>
                    ${this.objectives.rationingConfigured ? 'Calibrated ✓' : 'Optimize ECLSS 🫁'}
                  </button>
                </div>
              </div>

              <!-- Completion Banner & Move Forward Action -->
              <div class="transit-reward-box ${allCompleted ? 'reward-unlocked' : ''}">
                <div class="reward-status-row">
                  <span class="reward-check">${allCompleted ? '🎉' : '⏳'}</span>
                  <div>
                    <strong style="color: ${allCompleted ? 'var(--text-highlight)' : '#fff'}; font-size: 0.95rem;">
                      ${allCompleted ? 'DEEP SPACE FLIGHT DIRECTIVES CERTIFIED!' : `Directives Completed: ${completedCount} / 3`}
                    </strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                      ${allCompleted ? 'Houston confirms telemetry lock across the speed of light delay (+5 Science Points added).' : 'Complete all 3 directives above to certify spacecraft cruise and earn +5 points.'}
                    </div>
                  </div>
                </div>

                <button class="btn-primary btn-proceed-lander" id="btn-transit-to-lander" ${!allCompleted ? 'disabled' : ''}>
                  <span>Proceed to Planetary Landing Descent 🛬</span>
                </button>
              </div>
            </div>

            <!-- Manual Sliders for Advanced Exploration -->
            <div class="transit-sliders-panel">
              <div class="panel-heading">Interactive Flight Controls (Earth Command Uplink)</div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>☀️ Solar Array Alignment</span>
                  <strong id="val-solar">${Math.round(s.controls.solarPanels * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-solar" min="0" max="1" step="0.1" value="${s.controls.solarPanels}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🛡️ Radiation Shielding Deflection</span>
                  <strong id="val-shield">${Math.round(s.controls.shielding * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-shield" min="0" max="1" step="0.1" value="${s.controls.shielding}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🍞 Life Support Rationing Rate</span>
                  <strong id="val-ration">${s.controls.rationing.toFixed(1)}x</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-ration" min="0.5" max="1.5" step="0.1" value="${s.controls.rationing}">
              </div>

              <div class="ctrl-slider-row">
                <div class="ctrl-label-col">
                  <span>🌡️ Cabin Thermal Heaters</span>
                  <strong id="val-heaters">${Math.round(s.controls.heaters * 100)}%</strong>
                </div>
                <input type="range" class="transit-slider" id="slider-heaters" min="0" max="1" step="0.1" value="${s.controls.heaters}">
              </div>
            </div>
          </section>

          <!-- Right: Speed of Light Visualizer & Delayed Telemetry -->
          <section class="transit-telemetry-col">
            <!-- Animated Speed-of-Light Comm Wave Box -->
            <div class="comm-beam-box">
              <div class="beam-endpoints">
                <div class="node-earth">
                  <span>🌍 Earth (Houston DSN)</span>
                  <small id="comm-tx-status">Tx: Online</small>
                </div>
                <div class="beam-line-wrapper">
                  <div class="comm-signal-pulse" id="comm-pulse"></div>
                  <span class="beam-delay-label" id="beam-delay-tag">Signal Delay: ${fmtDelay(s.lightDelaySec)}</span>
                </div>
                <div class="node-craft">
                  <span>🛸 ${s.target} Outpost</span>
                  <small id="comm-rx-status">Rx: Locked</small>
                </div>
              </div>
            </div>

            <!-- Delayed Telemetry Display (What Earth Sees) -->
            <div class="delayed-vitals-card">
              <div class="vitals-header">
                <div>
                  <span class="vitals-sub">DOWNLINK TELEMETRY (EARTH VIEW)</span>
                  <h4>Spacecraft Life Support Vitals</h4>
                </div>
                <div class="delay-chip">
                  Packet Delay: <strong>${fmtDelay(s.lightDelaySec)}</strong>
                </div>
              </div>

              <div class="vitals-meters-grid">
                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>⚡ Electrical Power</span>
                    <strong id="meter-val-power">${Math.round(s.earthView.power)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-power" id="meter-fill-power" style="width: ${s.earthView.power}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🫁 Oxygen Reserves</span>
                    <strong id="meter-val-oxygen">${Math.round(s.earthView.oxygen)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-oxygen" id="meter-fill-oxygen" style="width: ${s.earthView.oxygen}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>💧 Water Loop</span>
                    <strong id="meter-val-water">${Math.round(s.earthView.water)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-water" id="meter-fill-water" style="width: ${s.earthView.water}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🍞 Food Rations</span>
                    <strong id="meter-val-food">${Math.round(s.earthView.food)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-food" id="meter-fill-food" style="width: ${s.earthView.food}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>🛡️ Magnetic Shielding</span>
                    <strong id="meter-val-shield">${Math.round(s.earthView.shielding)}%</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-shield" id="meter-fill-shield" style="width: ${s.earthView.shielding}%;"></div>
                  </div>
                </div>

                <div class="v-meter-item">
                  <div class="v-meter-label">
                    <span>☢️ Radiation Level</span>
                    <strong id="meter-val-rad">${(s.earthView.radiation || dest.radiationBase).toFixed(2)} mSv/day</strong>
                  </div>
                  <div class="v-meter-track">
                    <div class="v-meter-fill fill-rad" id="meter-fill-rad" style="width: ${Math.min(100, (s.earthView.radiation || dest.radiationBase) * 25)}%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Uplink/Downlink Transmission Event Log -->
            <div class="transit-log-card">
              <div class="log-header-title">
                <span>📡 Deep Space Network Event Log:</span>
                <span style="font-size: 0.72rem; color: var(--border-cyan);">Uplink Active</span>
              </div>
              <div class="transit-log-list" id="transit-log-list">
                <div class="t-log-entry">[00:00] Deep Space Network link locked onto ${dest.name} trajectory.</div>
                <div class="t-log-entry">[00:01] Speed of light delay calibrated to ${fmtDelay(s.lightDelaySec)}.</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Quick guidance action buttons
    const btnSolar = this.container.querySelector("#btn-quick-solar");
    const btnShield = this.container.querySelector("#btn-quick-shield");
    const btnRation = this.container.querySelector("#btn-quick-ration");
    const btnProceed = this.container.querySelector("#btn-transit-to-lander");

    if (btnSolar) {
      btnSolar.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("solarPanels", 1.0);
        this.objectives.solarDeployed = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnShield) {
      btnShield.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("shielding", 1.0);
        this.objectives.shieldingRaised = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnRation) {
      btnRation.addEventListener("click", () => {
        sound.playClick();
        this.mission.sendCommand("rationing", 0.8);
        this.objectives.rationingConfigured = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    if (btnProceed) {
      btnProceed.addEventListener("click", () => {
        sound.playSuccessChime();
        this.cleanup();
        gameState.setScreen("lander");
      });
    }

    // Sliders
    const sSolar = this.container.querySelector("#slider-solar");
    if (sSolar) {
      sSolar.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("solarPanels", val);
        const text = this.container.querySelector("#val-solar");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
        if (val >= 0.9) this.objectives.solarDeployed = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sShield = this.container.querySelector("#slider-shield");
    if (sShield) {
      sShield.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("shielding", val);
        const text = this.container.querySelector("#val-shield");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
        if (val >= 0.8) this.objectives.shieldingRaised = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sRation = this.container.querySelector("#slider-ration");
    if (sRation) {
      sRation.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("rationing", val);
        const text = this.container.querySelector("#val-ration");
        if (text) text.textContent = `${val.toFixed(1)}x`;
        this.objectives.rationingConfigured = true;
        this.checkDirectivesCompletion();
        this.updateDirectivesUI();
      });
    }

    const sHeaters = this.container.querySelector("#slider-heaters");
    if (sHeaters) {
      sHeaters.addEventListener("change", (e) => {
        const val = +e.target.value;
        this.mission.sendCommand("heaters", val);
        const text = this.container.querySelector("#val-heaters");
        if (text) text.textContent = `${Math.round(val * 100)}%`;
      });
    }
  }

  checkDirectivesCompletion() {
    const isAll = this.objectives.solarDeployed && this.objectives.shieldingRaised && this.objectives.rationingConfigured;
    if (isAll && !this.pointsAwarded) {
      this.pointsAwarded = true;
      sound.playSuccessChime();
      gameState.addScore(5);
      this.appendLog("🎉 DIRECTIVES CERTIFIED: +5 Science Points awarded by Houston Flight Director!");
    }
  }

  updateDirectivesUI() {
    const completedCount = Object.values(this.objectives).filter(Boolean).length;
    const allCompleted = completedCount >= 3;

    // Update items
    const dirSolar = this.container.querySelector("#dir-solar");
    const btnSolar = this.container.querySelector("#btn-quick-solar");
    if (dirSolar && this.objectives.solarDeployed) {
      dirSolar.classList.add("done");
      if (btnSolar) { btnSolar.disabled = true; btnSolar.textContent = "Aligned ✓"; }
    }

    const dirShield = this.container.querySelector("#dir-shield");
    const btnShield = this.container.querySelector("#btn-quick-shield");
    if (dirShield && this.objectives.shieldingRaised) {
      dirShield.classList.add("done");
      if (btnShield) { btnShield.disabled = true; btnShield.textContent = "Shielded ✓"; }
    }

    const dirRation = this.container.querySelector("#dir-ration");
    const btnRation = this.container.querySelector("#btn-quick-ration");
    if (dirRation && this.objectives.rationingConfigured) {
      dirRation.classList.add("done");
      if (btnRation) { btnRation.disabled = true; btnRation.textContent = "Calibrated ✓"; }
    }

    // Update reward box & proceed button
    const rewardBox = this.container.querySelector(".transit-reward-box");
    const btnProceed = this.container.querySelector("#btn-transit-to-lander");
    if (rewardBox && allCompleted) {
      rewardBox.classList.add("reward-unlocked");
      rewardBox.querySelector("strong").textContent = "DEEP SPACE FLIGHT DIRECTIVES CERTIFIED!";
      rewardBox.querySelector(".reward-check").textContent = "🎉";
      if (btnProceed) btnProceed.disabled = false;
    }
  }

  onMissionUpdate(s) {
    // Update live HUD
    const hudPhase = this.container.querySelector("#hud-phase");
    const hudDist = this.container.querySelector("#hud-dist");
    const hudDelay = this.container.querySelector("#hud-delay");
    const beamTag = this.container.querySelector("#beam-delay-tag");

    if (hudPhase) hudPhase.textContent = s.phase;
    if (hudDist) hudDist.textContent = `${Math.round(s.distanceKm).toLocaleString()} km`;
    if (hudDelay) hudDelay.textContent = fmtDelay(s.lightDelaySec);
    if (beamTag) beamTag.textContent = `Signal Delay: ${fmtDelay(s.lightDelaySec)}`;

    // Update meters
    const v = s.earthView;
    const pVal = this.container.querySelector("#meter-val-power");
    const pFill = this.container.querySelector("#meter-fill-power");
    if (pVal) pVal.textContent = `${Math.round(v.power)}%`;
    if (pFill) pFill.style.width = `${v.power}%`;

    const oVal = this.container.querySelector("#meter-val-oxygen");
    const oFill = this.container.querySelector("#meter-fill-oxygen");
    if (oVal) oVal.textContent = `${Math.round(v.oxygen)}%`;
    if (oFill) oFill.style.width = `${v.oxygen}%`;

    const wVal = this.container.querySelector("#meter-val-water");
    const wFill = this.container.querySelector("#meter-fill-water");
    if (wVal) wVal.textContent = `${Math.round(v.water)}%`;
    if (wFill) wFill.style.width = `${v.water}%`;

    const fVal = this.container.querySelector("#meter-val-food");
    const fFill = this.container.querySelector("#meter-fill-food");
    if (fVal) fVal.textContent = `${Math.round(v.food)}%`;
    if (fFill) fFill.style.width = `${v.food}%`;

    const sVal = this.container.querySelector("#meter-val-shield");
    const sFill = this.container.querySelector("#meter-fill-shield");
    if (sVal) sVal.textContent = `${Math.round(v.shielding)}%`;
    if (sFill) sFill.style.width = `${v.shielding}%`;

    const rVal = this.container.querySelector("#meter-val-rad");
    const rFill = this.container.querySelector("#meter-fill-rad");
    if (rVal) rVal.textContent = `${(v.radiation || 1.2).toFixed(2)} mSv/day`;
    if (rFill) rFill.style.width = `${Math.min(100, (v.radiation || 1.2) * 25)}%`;
  }

  onMissionLog(entry) {
    this.appendLog(entry.msg);
  }

  onMissionAlert(type) {
    sound.playWarningAlarm();
    this.appendLog(`🚨 DSN PRIORITY ALERT: Deep space ${type.replace(/_/g, " ").toUpperCase()} detected!`);
  }

  appendLog(msg) {
    const list = this.container.querySelector("#transit-log-list");
    if (!list) return;

    const row = document.createElement("div");
    row.className = "t-log-entry";
    const ts = new Date().toTimeString().slice(0, 8);
    row.textContent = `[${ts}] ${msg}`;
    list.prepend(row);

    // Keep log concise
    if (list.children.length > 8) {
      list.lastElementChild.remove();
    }
  }

  cleanup() {
    if (this.mission) {
      this.mission.stop();
      if (this.updateHandler) this.mission.removeEventListener("update", this.updateHandler);
      if (this.logHandler) this.mission.removeEventListener("log", this.logHandler);
      if (this.alertHandler) this.mission.removeEventListener("alert", this.alertHandler);
    }
  }

  destroy() {
    this.cleanup();
  }
}



// --- File: js\components\lander.js ---
// ============================================================================
// PLANETARY DESCENT & LANDER SIMULATOR
// Accurate celestial gravity physics (Moon, Mars, Europa), retro-thrusters,
// landing zone targeting, and velocity limits
// ============================================================================




class LanderComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Lander physics
    this.lander = {
      x: 0,
      y: 40,
      vx: 0,
      vy: 0,
      angle: 0,
      width: 44,
      height: 38,
      thrusting: false,
      fuel: 100
    };

    this.landingPad = { x: 0, y: 0, width: 140, height: 16 };
    this.terrain = [];
    this.particles = [];
    this.isLanded = false;
    this.isCrashed = false;
    this.keys = { up: false, left: false, right: false };

    this.init();
  }

  init() {
    this.render();
    this.setupCanvas();
    this.attachEvents();
    this.loop();
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Telemetry bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 20px;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">DESCENT TARGET</span>
            <div style="font-weight: 800; color: ${dest.themeColor}; font-size: 1.1rem;">
              ${dest.name} (Gravity: ${dest.gravityMps2} m/s²)
            </div>
          </div>

          <div style="display: flex; gap: 20px; align-items: center;">
            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">DESCENT SPEED</span>
              <div id="lander-vspeed" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: var(--text-highlight);">
                0.0 m/s
              </div>
            </div>

            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">RADAR ALTITUDE</span>
              <div id="lander-alt" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: #fff;">
                450 m
              </div>
            </div>

            <div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">LANDER FUEL</span>
              <div id="lander-fuel" style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 1rem; color: var(--meter-fuel);">
                100%
              </div>
            </div>
          </div>
        </div>

        <!-- Lander Canvas Game -->
        <div class="flight-canvas-container" style="position: relative;">
          <canvas id="lander-canvas" class="game-canvas"></canvas>

          <!-- On-screen Tablet Touch Controls -->
          <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px; z-index: 10;">
            <button class="btn-icon" id="btn-lander-left" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">◀</button>
            <button class="btn-icon" id="btn-lander-right" style="width: 52px; height: 52px; font-size: 1.5rem; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan);">▶</button>
          </div>

          <div style="position: absolute; bottom: 20px; right: 20px; z-index: 10;">
            <button class="btn-primary" id="btn-lander-thrust" style="padding: 14px 28px; font-size: 1.1rem; box-shadow: 0 0 20px rgba(255,145,0,0.6); background: linear-gradient(135deg, #ff9100, #ff3d00);">
              🔥 RETRO-THRUST
            </button>
          </div>

          <div style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-sm); padding: 6px 14px; font-size: 0.8rem; pointer-events: none;">
            Safe Touchdown Limit: <strong>&lt; 3.0 m/s</strong> vertical speed on the designated pad!
          </div>
        </div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#lander-canvas");
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : {};
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 900);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    this.lander.x = this.canvas.width / 2;
    this.lander.y = 50;
    this.lander.vx = (Math.random() * 2 - 1) * 0.8;
    this.lander.vy = 0.5;
    this.lander.fuel = gameState.state.telemetry.fuel;
    this.isLanded = false;
    this.isCrashed = false;

    // Generate terrain & landing pad
    const padW = 150;
    const padX = Math.random() * (this.canvas.width - padW - 160) + 80;
    const groundY = this.canvas.height - 60;
    this.landingPad = { x: padX, y: groundY, width: padW, height: 14 };

    // Procedural terrain points
    this.terrain = [];
    const step = 40;
    for (let x = 0; x <= this.canvas.width; x += step) {
      if (x >= padX - 20 && x <= padX + padW + 20) {
        this.terrain.push({ x, y: groundY + 10 });
      } else {
        const roughness = 25;
        this.terrain.push({ x, y: groundY + 10 + (Math.sin(x * 0.05) * roughness) });
      }
    }
  }

  attachEvents() {
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        this.keys.up = true;
        sound.playThrusterPulse();
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
    };

    const onKeyUp = (e) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") this.keys.up = false;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Touch controls
    const thrustBtn = this.container.querySelector("#btn-lander-thrust");
    if (thrustBtn) {
      thrustBtn.addEventListener("pointerdown", () => { this.keys.up = true; sound.playThrusterPulse(); });
      thrustBtn.addEventListener("pointerup", () => { this.keys.up = false; });
      thrustBtn.addEventListener("pointercancel", () => { this.keys.up = false; });
    }

    const leftBtn = this.container.querySelector("#btn-lander-left");
    const rightBtn = this.container.querySelector("#btn-lander-right");
    if (leftBtn && rightBtn) {
      leftBtn.addEventListener("pointerdown", () => { this.keys.left = true; sound.playThrusterPulse(); });
      leftBtn.addEventListener("pointerup", () => { this.keys.left = false; });
      leftBtn.addEventListener("pointercancel", () => { this.keys.left = false; });

      rightBtn.addEventListener("pointerdown", () => { this.keys.right = true; sound.playThrusterPulse(); });
      rightBtn.addEventListener("pointerup", () => { this.keys.right = false; });
      rightBtn.addEventListener("pointercancel", () => { this.keys.right = false; });
    }
  }

  loop() {
    this.update();
    this.draw();
    if (!this.isLanded && !this.isCrashed) {
      this.animId = requestAnimationFrame(() => this.loop());
    }
  }

  update() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    // Scale real planetary gravity to game acceleration
    const gravityAccel = (dest.gravityMps2 / 9.81) * 0.05 + 0.02;

    this.lander.vy += gravityAccel;

    // Apply thrust
    if (this.keys.up && this.lander.fuel > 0) {
      this.lander.vy -= 0.11;
      this.lander.fuel = Math.max(0, this.lander.fuel - 0.25);
      gameState.state.telemetry.fuel = Math.round(this.lander.fuel);

      // Thruster exhaust particles
      this.particles.push({
        x: this.lander.x + (Math.random() * 8 - 4),
        y: this.lander.y + 18,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 4 + 4,
        radius: Math.random() * 6 + 3,
        life: 1.0,
        color: Math.random() > 0.5 ? "#ff9100" : "#ffd600"
      });
    }

    // RCS horizontal steering
    if (this.keys.left) {
      this.lander.vx -= 0.04;
      this.lander.angle = Math.max(-0.25, this.lander.angle - 0.02);
    } else if (this.keys.right) {
      this.lander.vx += 0.04;
      this.lander.angle = Math.min(0.25, this.lander.angle + 0.02);
    } else {
      this.lander.angle *= 0.94; // auto-level
    }

    this.lander.vx *= 0.99;
    this.lander.x += this.lander.vx;
    this.lander.y += this.lander.vy;

    // Bounds
    if (this.lander.x < 30) { this.lander.x = 30; this.lander.vx = 0; }
    if (this.lander.x > this.canvas.width - 30) { this.lander.x = this.canvas.width - 30; this.lander.vx = 0; }

    // Particles update
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.radius *= 0.92;
      p.life -= 0.05;
      if (p.life <= 0 || p.radius <= 0.5) this.particles.splice(idx, 1);
    });

    // Touchdown collision detection
    const pad = this.landingPad;
    const landerBottom = this.lander.y + 18;

    if (landerBottom >= pad.y) {
      const isOverPad = this.lander.x >= pad.x && this.lander.x <= (pad.x + pad.width);
      const isSoftTouch = this.lander.vy <= 2.8;

      if (isOverPad && isSoftTouch) {
        this.onSafeTouchdown();
      } else {
        this.onCrash(isOverPad ? "Touchdown velocity exceeded safety limit!" : "Missed designated landing pad and struck hazardous terrain!");
      }
    }

    // Update HUD
    const vSpeedEl = this.container.querySelector("#lander-vspeed");
    const altEl = this.container.querySelector("#lander-alt");
    const fuelEl = this.container.querySelector("#lander-fuel");

    const vSpeedDisplay = (this.lander.vy * 2.2).toFixed(1);
    const altitudeDisplay = Math.max(0, Math.round((pad.y - landerBottom) * 2.5));

    if (vSpeedEl) {
      vSpeedEl.textContent = `${vSpeedDisplay} m/s`;
      vSpeedEl.style.color = (this.lander.vy <= 2.8) ? 'var(--text-highlight)' : 'var(--accent-red)';
    }
    if (altEl) altEl.textContent = `${altitudeDisplay} m`;
    if (fuelEl) fuelEl.textContent = `${Math.round(this.lander.fuel)}%`;
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    // Sky / Exosphere
    ctx.fillStyle = dest.skyColor;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 40; i++) {
      ctx.fillRect((i * 67) % w, (i * 43) % (h * 0.7), 1.5, 1.5);
    }

    // Draw Destination Celestial Body in Background (e.g. Earth from Moon, or Jupiter from Europa!)
    if (dest.id === "moon") {
      // Blue marble Earth hanging in black lunar sky
      ctx.beginPath();
      ctx.arc(w - 120, 90, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#1976d2";
      ctx.fill();
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (dest.id === "europa") {
      // Colossal striped Jupiter looming above Europa's ice plain
      ctx.beginPath();
      ctx.arc(w / 2, -180, 280, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb74d";
      ctx.fill();
      // Great Red Spot
      ctx.beginPath();
      ctx.ellipse(w / 2 + 50, 70, 24, 14, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#d84315";
      ctx.fill();
    }

    // Draw Terrain
    ctx.beginPath();
    ctx.moveTo(0, h);
    this.terrain.forEach((pt, i) => {
      if (i === 0) ctx.lineTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = dest.groundColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Landing Pad
    const pad = this.landingPad;
    ctx.fillStyle = "#263238";
    ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
    // Glowing neon pad markers
    ctx.fillStyle = "var(--text-highlight)";
    ctx.fillRect(pad.x, pad.y, 10, pad.height);
    ctx.fillRect(pad.x + pad.width - 10, pad.y, 10, pad.height);

    ctx.fillStyle = "#00e5ff";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("TOUCHDOWN PAD ALPHA", pad.x + pad.width / 2, pad.y + 11);

    // Draw particles
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Draw Lander Spacecraft
    ctx.save();
    ctx.translate(this.lander.x, this.lander.y);
    ctx.rotate(this.lander.angle);

    // Lander gold foil base (Apollo / Artemis style)
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(-18, -6, 36, 16);
    ctx.strokeStyle = "#ffb300";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-18, -6, 36, 16);

    // Lander Crew Ascent Stage
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.arc(0, -10, 14, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#455a64";
    ctx.stroke();

    // Window
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(0, -10, 4, 0, Math.PI * 2);
    ctx.fill();

    // Landing gear struts
    ctx.strokeStyle = "#b0bec5";
    ctx.lineWidth = 2.5;
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-16, 10);
    ctx.lineTo(-24, 18);
    ctx.moveTo(-28, 18);
    ctx.lineTo(-20, 18);
    ctx.stroke();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(16, 10);
    ctx.lineTo(24, 18);
    ctx.moveTo(20, 18);
    ctx.lineTo(28, 18);
    ctx.stroke();

    ctx.restore();
  }

  onSafeTouchdown() {
    this.isLanded = true;
    sound.playSuccessChime();
    gameState.addScore(100);

    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center;">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">🚩</div>
        <h2 style="color: var(--text-highlight); font-size: 1.5rem; margin-bottom: 6px;">
          TOUCHDOWN CONFIRMED! WELCOME TO ${dest.name.toUpperCase()}!
        </h2>
        <p style="color: #cfd8dc; font-size: 0.95rem; line-height: 1.5; margin-bottom: 16px;">
          "That's one small step for a Junior Astronaut, one giant leap for science!" The lander has touched down safely on Target Pad Alpha (+100 Science Points awarded).
        </p>

        <div style="background: rgba(0, 230, 118, 0.08); border: 1px solid var(--text-highlight); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.85rem; text-align: left;">
          <div>✅ Touchdown Velocity: Nominal (${(this.lander.vy * 2.2).toFixed(1)} m/s)</div>
          <div>✅ Structural Integrity: 100%</div>
          <div>📦 Next Objective: Deploy Surface Base Camp (Habitat, Solar Array, O2 Sabatier, Greenhouse).</div>
        </div>

        <button class="btn-primary" id="btn-begin-camp" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px;">
          Proceed to Surface Camp Setup 🏗️
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-begin-camp").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      this.cleanup();
      gameState.setScreen("surface");
    });
  }

  onCrash(reason) {
    this.isCrashed = true;
    sound.playFail();
    this.cleanup();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="text-align: center; border-top: 4px solid var(--accent-red);">
        <div style="font-size: 3.5rem; margin-bottom: 8px;">💥💀</div>
        <div style="font-size: 0.78rem; color: #ff80ab; font-weight: 800; letter-spacing: 2px;">PERMADEATH CASUALTY • MISSION CONTROL</div>
        <h2 style="color: var(--accent-red); font-size: 1.4rem; margin: 6px 0 12px 0;">
          CRITICAL IMPACT: LANDER DESTROYED
        </h2>
        <p style="color: #ffccbc; font-size: 0.9rem; line-height: 1.45; margin-bottom: 16px;">
          ${reason}
        </p>
        <div style="background: rgba(255, 51, 102, 0.12); border: 1px solid var(--accent-red); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.82rem; text-align: left;">
          <strong>Zero-Reset Protocol:</strong> Planetary descent carries zero tolerance for excess velocity. Under strict astronaut flight regulations, this loss ends your training expedition and zeroes all score.
        </div>

        <button class="btn-primary" id="btn-lander-casualty-proceed" style="width: 100%; justify-content: center; font-size: 1rem; padding: 12px; background: linear-gradient(135deg, #ff3366, #d50000);">
          Review Casualty Report & Reset to Zero 💀 ➔
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-lander-casualty-proceed").addEventListener("click", () => {
      sound.playClick();
      overlay.remove();
      gameState.failMission({
        cause: "High-Velocity Planetary Surface Impact",
        tip: "Fire retro-thrusters in rhythmic pulses to maintain vertical descent speed under 2.8 m/s upon pad contact.",
        causalityList: [
          reason,
          "Lander structural landing gear buckled under excessive g-force",
          "Propellant tanks ruptured upon touchdown. Complete hull casualty."
        ]
      });
    });
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  destroy() {
    this.cleanup();
  }
}



// --- File: js\components\surfaceMissions.js ---
// ============================================================================
// SURFACE SCIENCE MISSIONS & EQUIPMENT REPAIR MINI-GAMES
// Interactive Drills, Spectrometer, Wire Circuit Repair, Leak Patching, Pipe Thawing
// ============================================================================




class SurfaceMissionsManager {
  constructor(modalContainer) {
    this.container = modalContainer;
  }

  // --- 1. Raw Material Core Sample Drilling ---
  startDrillMission(resource, onComplete) {
    sound.playClick();
    let currentDepth = 0;
    const targetDepth = 100;
    let drillSweetSpot = false;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">${resource.icon}</div>
        <h3 style="color: var(--border-cyan); font-size: 1.25rem;">
          Drilling Core Sample: ${resource.name}
        </h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 6px 0 16px 0;">
          Hold the drill button to penetrate the planetary permafrost. Keep the pressure gauge inside the GREEN sweet spot to extract sample cleanly!
        </p>

        <!-- Depth Progress Bar -->
        <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 6px;">
            <span>CORE DRILL DEPTH</span>
            <span id="drill-depth-text">0%</span>
          </div>
          <div style="height: 12px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
            <div id="drill-depth-fill" style="height: 100%; width: 0%; background: var(--text-highlight); transition: width 0.1s;"></div>
          </div>
        </div>

        <!-- Pressure Needle Meter -->
        <div style="margin-bottom: 20px; background: rgba(0,0,0,0.4); border-radius: 8px; padding: 10px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">DRILL PRESSURE NEEDLE</div>
          <div style="display: flex; height: 16px; border-radius: 8px; overflow: hidden; position: relative;">
            <div style="width: 30%; background: #ff9100;"></div>
            <div style="width: 40%; background: var(--text-highlight);"></div>
            <div style="width: 30%; background: #ff3366;"></div>
            <div id="pressure-indicator" style="position: absolute; top: -3px; left: 10%; width: 8px; height: 22px; background: #fff; border-radius: 3px; box-shadow: 0 0 8px #fff; transition: left 0.08s;"></div>
          </div>
        </div>

        <button class="btn-primary" id="btn-drill-press" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px;">
          ⚡ ENGAGE CORE DRILL
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let isPressing = false;
    let needlePos = 20;
    let needleDir = 1;

    const interval = setInterval(() => {
      needlePos += needleDir * 3.8;
      if (needlePos >= 90) needleDir = -1;
      if (needlePos <= 10) needleDir = 1;

      const needleEl = overlay.querySelector("#pressure-indicator");
      if (needleEl) needleEl.style.left = `${needlePos}%`;

      drillSweetSpot = needlePos >= 30 && needlePos <= 70;

      if (isPressing) {
        currentDepth += drillSweetSpot ? 2.6 : 0.8;
        const depthFill = overlay.querySelector("#drill-depth-fill");
        const depthText = overlay.querySelector("#drill-depth-text");

        if (depthFill) depthFill.style.width = `${Math.min(100, currentDepth)}%`;
        if (depthText) depthText.textContent = `${Math.min(100, Math.round(currentDepth))}%`;

        if (currentDepth >= targetDepth) {
          clearInterval(interval);
          sound.playSuccessChime();
          gameState.addScore(resource.value);
          gameState.refillResources(resource.refill);

          // Progress level objectives if relevant
          if (resource.id === "regolith") gameState.progressObjective("moon_regolith", 1);
          if (resource.id === "polar_ice" || resource.id === "subsurface_brine") gameState.progressObjective("mars_water_ice", 1);
          if (resource.id === "cryo_ice") gameState.progressObjective("europa_ice_core", 1);

          overlay.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
              <div style="font-size: 3.5rem; margin-bottom: 8px;">💎</div>
              <h3 style="color: var(--text-highlight); font-size: 1.4rem;">SAMPLE SECURED!</h3>
              <p style="font-size: 0.88rem; color: #cfd8dc; margin: 10px 0;">
                Successfully extracted <strong>${resource.name}</strong>! Resource stores refilled and +${resource.value} Science Points awarded.
              </p>
              <button class="btn-primary" id="btn-close-drill" style="width: 100%; justify-content: center;">
                Stow Sample & Continue 🎒
              </button>
            </div>
          `;

          overlay.querySelector("#btn-close-drill").addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (onComplete) onComplete();
          });
        }
      }
    }, 50);

    const drillBtn = overlay.querySelector("#btn-drill-press");
    drillBtn.addEventListener("pointerdown", () => { isPressing = true; sound.playCollect(); });
    window.addEventListener("pointerup", () => { isPressing = false; });
  }

  // --- 2. Rewire a Circuit Mini-Game ---
  startCircuitRewireGame(onSuccess, onFail) {
    sound.playAlarm();
    let timeLeft = 12;
    const wires = [
      { id: "red", color: "#ff3366", connected: false },
      { id: "blue", color: "#00e5ff", connected: false },
      { id: "gold", color: "#ffd600", connected: false }
    ];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🔌</div>
        <h3 style="color: #ff3366; font-size: 1.3rem;">ELECTRICAL BUS CIRCUIT BREAKER FAILURE</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Main bus shorted! Tap matching color terminals to reconnect emergency power bypass before batteries freeze!
        </p>

        <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: 800; color: #ff3366; margin-bottom: 12px;" id="wire-timer">
          TIME TO BLACKOUT: 12s
        </div>

        <!-- Wire terminals grid -->
        <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px 30px; margin-bottom: 16px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${wires.map((w) => `
              <button class="btn-step btn-wire-src" data-color="${w.id}" style="background: ${w.color}; width: 44px; height: 44px; border-radius: 50%; font-size: 1rem; color: #000; font-weight: 800;">⚡</button>
            `).join("")}
          </div>
          <div style="display: flex; align-items: center; color: var(--text-muted); font-size: 0.8rem;">
            <span>➔ RECONNECT LEADS ➔</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${[wires[1], wires[2], wires[0]].map((w) => `
              <button class="btn-step btn-wire-dst" data-color="${w.id}" style="background: rgba(255,255,255,0.1); border: 2px solid ${w.color}; width: 44px; height: 44px; border-radius: 50%; font-size: 1rem; color: #fff;">○</button>
            `).join("")}
          </div>
        </div>

        <div style="font-size: 0.78rem; color: var(--accent-gold);" id="wire-instruction-msg">
          Click a colored terminal on the LEFT, then click its matching color terminal on the RIGHT!
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let selectedColor = null;
    let connectedCount = 0;

    const timer = setInterval(() => {
      timeLeft--;
      const timeEl = overlay.querySelector("#wire-timer");
      if (timeEl) timeEl.textContent = `TIME TO BLACKOUT: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        sound.playFail();
        overlay.remove();
        if (onFail) onFail();
      }
    }, 1000);

    overlay.querySelectorAll(".btn-wire-src").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        selectedColor = btn.getAttribute("data-color");
        overlay.querySelectorAll(".btn-wire-src").forEach((b) => b.style.outline = "");
        btn.style.outline = "3px solid #fff";
      });
    });

    overlay.querySelectorAll(".btn-wire-dst").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!selectedColor) return;
        const targetColor = btn.getAttribute("data-color");
        if (selectedColor === targetColor) {
          sound.playSuccessChime();
          btn.style.background = btn.style.borderColor;
          btn.textContent = "✓";
          btn.disabled = true;
          connectedCount++;
          selectedColor = null;

          if (connectedCount >= 3) {
            clearInterval(timer);
            sound.playSuccessChime();
            overlay.remove();
            if (onSuccess) onSuccess();
          }
        } else {
          sound.playFail();
        }
      });
    });
  }

  // --- 3. Patch a Leak Mini-Game (O2 Manifold or Suit Tear) ---
  startLeakPatchGame(onSuccess, onFail) {
    sound.playAlarm();
    let timeLeft = 10;
    let patchedCount = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">⚠️</div>
        <h3 style="color: #ff3366; font-size: 1.3rem;">CRITICAL OXYGEN / SUIT LEAK BREACH</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Micro-puncture venting breathable air! Rapidly click/tap all 3 hissing rupture holes to apply emergency sealant patches!
        </p>

        <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: 800; color: #ff3366; margin-bottom: 12px;" id="leak-timer">
          DEPRESSURIZATION: 10s
        </div>

        <!-- Pipe simulation area with 3 rupture holes -->
        <div id="leak-puncture-area" style="position: relative; height: 160px; background: #1a2332; border: 2px dashed rgba(255,255,255,0.2); border-radius: 12px; margin-bottom: 16px; overflow: hidden;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 32px; transform: translateY(-50%); background: #37474f; border-top: 2px solid #546e7a; border-bottom: 2px solid #263238;"></div>
          
          <button class="btn-step btn-leak-point" style="position: absolute; top: 40px; left: 80px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
          <button class="btn-step btn-leak-point" style="position: absolute; top: 70px; left: 220px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
          <button class="btn-step btn-leak-point" style="position: absolute; top: 45px; left: 350px; width: 44px; height: 44px; border-radius: 50%; background: #ff3366; box-shadow: 0 0 14px #ff3366; font-size: 1.2rem; animation: pulseDot 0.6s infinite;">💨</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--accent-gold);">
          Hurry! Each second of breach drains oxygen and drops suit integrity!
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    const timer = setInterval(() => {
      timeLeft--;
      const timeEl = overlay.querySelector("#leak-timer");
      if (timeEl) timeEl.textContent = `DEPRESSURIZATION: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        sound.playFail();
        overlay.remove();
        if (onFail) onFail();
      }
    }, 1000);

    overlay.querySelectorAll(".btn-leak-point").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playSuccessChime();
        btn.textContent = "🩹";
        btn.style.background = "var(--text-highlight)";
        btn.style.boxShadow = "0 0 10px var(--text-highlight)";
        btn.style.animation = "none";
        btn.disabled = true;
        patchedCount++;

        if (patchedCount >= 3) {
          clearInterval(timer);
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      });
    });
  }

  // --- 4. Thaw Frozen Water Pipes Mini-Game ---
  startThawPipesGame(onSuccess, onFail) {
    sound.playAlarm();
    let thawProgress = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 500px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🧊</div>
        <h3 style="color: #29b6f6; font-size: 1.3rem;">WATER COOLANT PIPES FROZEN SOLID</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Cabin freeze caused water blockages! Hold the thermal heating wand over the frozen pipe section to melt the ice!
        </p>

        <div style="background: rgba(0,0,0,0.5); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 6px;">
            <span>PIPE DE-ICING PROGRESS</span>
            <span id="thaw-progress-text">0%</span>
          </div>
          <div style="height: 12px; background: rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
            <div id="thaw-progress-fill" style="height: 100%; width: 0%; background: #29b6f6; transition: width 0.1s;"></div>
          </div>
        </div>

        <button class="btn-primary" id="btn-hold-thaw" style="width: 100%; justify-content: center; font-size: 1.1rem; padding: 14px; background: linear-gradient(135deg, #ff9100, #ff3d00);">
          🔥 HOLD THERMAL DE-ICER
        </button>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    let isHolding = false;
    const interval = setInterval(() => {
      if (isHolding) {
        thawProgress += 4;
        const fill = overlay.querySelector("#thaw-progress-fill");
        const text = overlay.querySelector("#thaw-progress-text");
        if (fill) fill.style.width = `${Math.min(100, thawProgress)}%`;
        if (text) text.textContent = `${Math.min(100, thawProgress)}%`;

        if (thawProgress >= 100) {
          clearInterval(interval);
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      }
    }, 100);

    const btn = overlay.querySelector("#btn-hold-thaw");
    btn.addEventListener("pointerdown", () => { isHolding = true; sound.playThrusterPulse(); });
    window.addEventListener("pointerup", () => { isHolding = false; });
  }

  // --- 5. Sweep Dust Off Solar Panels Mini-Game ---
  startClearPanelsGame(onSuccess, onFail) {
    sound.playAlarm();
    let dustCleaned = 0;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 4px;">🌪️</div>
        <h3 style="color: #ff9100; font-size: 1.3rem;">MARTIAN DUST SQUALL OBSCURING ARRAYS</h3>
        <p style="font-size: 0.82rem; color: #cfd8dc; margin: 4px 0 14px 0;">
          Iron-oxide dust dropped solar power to 0 kW! Drag your wiper across the 4 solar cells to clear the dust!
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
          ${[1, 2, 3, 4].map((i) => `
            <button class="btn-step btn-solar-cell" style="height: 70px; background: #5d4037; border: 2px dashed #ff9100; border-radius: 8px; font-size: 0.85rem; color: #ffe0b2; font-weight: 700;">
              🧹 Clear Cell #${i}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelectorAll(".btn-solar-cell").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playSuccessChime();
        btn.style.background = "#ffd54f";
        btn.style.color = "#000";
        btn.style.borderStyle = "solid";
        btn.textContent = "☀️ Cleaned (100%)";
        btn.disabled = true;
        dustCleaned++;

        if (dustCleaned >= 4) {
          sound.playSuccessChime();
          overlay.remove();
          if (onSuccess) onSuccess();
        }
      });
    });
  }

  // --- 6. Laser Spectrometer Mineral Analyzer ---
  startSpectrometerMission(onComplete) {
    sound.playQuindar();
    const elements = [
      { name: "Titanium Oxide (Lunar Ilmenite)", bandColor: "#00e5ff", symbol: "Ti", points: 70 },
      { name: "Water Ice / Hydrated Permafrost", bandColor: "#4fc3f7", symbol: "H2O", points: 80 },
      { name: "Iron Oxide (Martian Hematite)", bandColor: "#ff7043", symbol: "Fe2O3", points: 75 },
      { name: "Sulfate Salts (Europa Deep Core)", bandColor: "#ffd54f", symbol: "SO4", points: 95 }
    ];
    const target = elements[Math.floor(Math.random() * elements.length)];

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 580px;">
        <div class="modal-header">
          <div class="modal-title">
            <span>🔬</span>
            <span>Laser Spectrometer Analysis</span>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #cfd8dc; margin-bottom: 16px; line-height: 1.5;">
          NASA rovers like <em>Curiosity</em> and <em>Perseverance</em> zap rocks with a laser to measure their light emission spectrum. Match the sensor emission band to identify this planetary specimen:
        </p>

        <div style="background: rgba(0,0,0,0.5); border: 2px solid var(--border-cyan); border-radius: var(--radius-md); padding: 16px; text-align: center; margin-bottom: 18px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Emission Absorption Wavelength</div>
          <div style="height: 36px; border-radius: 6px; background: ${target.bandColor}; margin: 8px 0; box-shadow: 0 0 15px ${target.bandColor}; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #000;">
            ${target.symbol} ABSORPTION SPECTRUM
          </div>
        </div>

        <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 10px;">Select Matching Mineral Compound:</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${elements.map((el) => `
            <button class="btn-secondary btn-spectral-choice" data-target="${el.symbol === target.symbol}" style="justify-content: flex-start; padding: 12px; border-left: 4px solid ${el.bandColor};">
              <span style="font-size: 1.1rem; margin-right: 6px;">🧪</span>
              <span style="font-size: 0.8rem; text-align: left;">${el.name}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelectorAll(".btn-spectral-choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isMatch = btn.getAttribute("data-target") === "true";
        if (isMatch) {
          sound.playSuccessChime();
          gameState.addScore(target.points);
          gameState.refillResources({ power: 25 });

          // Check if objective can be progressed
          gameState.progressObjective("moon_seismometer", 1);
          gameState.progressObjective("europa_data_relay", 1);

          overlay.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
              <div style="font-size: 3.5rem; margin-bottom: 8px;">🎉</div>
              <h3 style="color: var(--text-highlight); font-size: 1.4rem;">SPECTRAL MATCH VERIFIED!</h3>
              <p style="font-size: 0.9rem; color: #cfd8dc; margin: 10px 0;">
                Compound identified as <strong>${target.name}</strong>! +${target.points} Science Points recorded in NASA database.
              </p>
              <button class="btn-primary" id="btn-close-spec" style="width: 100%; justify-content: center;">
                Log Findings & Return 🔬
              </button>
            </div>
          `;
          overlay.querySelector("#btn-close-spec").addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (onComplete) onComplete();
          });
        } else {
          sound.playFail();
          alert("Spectral wavelength mismatch! Review the absorption color band and try again.");
        }
      });
    });
  }

  // --- 6. Debris Cleanup & Crash Site Forensic Investigation ---
  startDebrisCleanupMission(onComplete) {
    sound.playQuindar();
    const missionData = (GAME_CONFIG.SPECIAL_MISSIONS && GAME_CONFIG.SPECIAL_MISSIONS.debris) || {
      id: "debris",
      name: "Debris Cleanup",
      emoji: "🧹",
      color: "#b08968",
      crew: 2,
      days: 4,
      budget: 90,
      size: 16,
      blurb: "A previous mission crashed on the surface. Collect the wreckage and find out what went wrong.",
      needs: { fuel: 16, life: 20, shield: 14, thermal: 14, science: 12 },
      events: [
        { icon: "🔪", name: "Sharp metal fragments", cat: "shield", text: "Jagged debris threatens to tear your suit and damage the rover." },
        { icon: "☣️", name: "Leaked fuel residue", cat: "life", text: "Toxic leftover fuel contaminates the area and your air filters." },
        { icon: "🔥", name: "Hot wreckage in sunlight", cat: "thermal", text: "Metal pieces heat up under the Sun and strain your cooling system." },
        { icon: "🚜", name: "Rover stuck in debris", cat: "fuel", text: "The rover gets stuck between wreckage pieces and needs extra power to escape." }
      ],
      quiz: [
        {
          q: "Why do engineers collect wreckage from a failed mission?",
          a: ["To learn what went wrong and prevent it next time", "To decorate the base", "Because it is free fuel"],
          c: 0,
          why: "Studying failures is one of the best ways engineers improve future missions."
        },
        {
          q: "Why is sharp debris dangerous on the Moon?",
          a: ["It can puncture suits and damage rovers", "It makes the Moon heavier", "It blocks the Sun"],
          c: 0,
          why: "With no air and no easy rescue, even a small suit puncture is serious."
        }
      ]
    };

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";

    // Track state inside mission
    let currentPhase = "briefing"; // 'briefing', 'collecting', 'quiz', 'done'
    let fragmentsCollected = [];
    let currentEvent = null;
    let quizIndex = 0;
    let quizAnswered = false;

    const fragments = [
      { id: "solar", name: "Solar Array Spar", icon: "☀️", eventIdx: 2 },
      { id: "blackbox", name: "Flight Telemetry Black Box", icon: "📟", eventIdx: 0 },
      { id: "tank", name: "Cryogenic Fuel Manifold", icon: "☣️", eventIdx: 1 },
      { id: "chassis", name: "Impacted Rover Carriage", icon: "🚜", eventIdx: 3 }
    ];

    const render = () => {
      if (currentPhase === "briefing") {
        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 620px; border-top: 4px solid ${missionData.color};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 2.8rem; background: rgba(176,137,104,0.15); padding: 8px 12px; border-radius: 12px; border: 1px solid ${missionData.color};">${missionData.emoji}</span>
                <div>
                  <div style="font-size: 0.72rem; color: ${missionData.color}; font-weight: 800; letter-spacing: 1.5px;">NASA LUNAR SURFACE EXPEDITION</div>
                  <h3 style="font-size: 1.4rem; color: #fff; margin: 2px 0;">${missionData.name}</h3>
                </div>
              </div>
              <button class="btn-icon" id="btn-close-debris-modal" style="width: 32px; height: 32px;">✕</button>
            </div>

            <div style="background: rgba(0,0,0,0.4); border-left: 3px solid ${missionData.color}; padding: 12px 16px; border-radius: 6px; font-size: 0.88rem; color: #cfd8dc; line-height: 1.5; margin-bottom: 16px;">
              "${missionData.blurb}"
            </div>

            <!-- Mission Parameters Badge Row -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">CREW</div>
                <strong style="color: #fff; font-size: 0.95rem;">👨‍🚀 ${missionData.crew} Astronauts</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">DURATION</div>
                <strong style="color: #fff; font-size: 0.95rem;">⏱️ ${missionData.days} Days</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">EXPEDITION BUDGET</div>
                <strong style="color: var(--accent-gold); font-size: 0.95rem;">💰 $${missionData.budget}M</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 8px; border-radius: 6px; text-align: center;">
                <div style="font-size: 0.7rem; color: var(--text-muted);">CRASH SECTOR</div>
                <strong style="color: var(--border-cyan); font-size: 0.95rem;">🗺️ ${missionData.size} km²</strong>
              </div>
            </div>

            <!-- Required Supplies Need Allocation -->
            <div style="background: rgba(14,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: #ffe082; margin-bottom: 8px; text-transform: uppercase;">
                ⚖️ Operational Resource Requirements:
              </div>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 0.76rem;">
                <div style="text-align: center;"><span style="color: var(--meter-fuel);">⛽ Fuel:</span> <strong>${missionData.needs.fuel}%</strong></div>
                <div style="text-align: center;"><span style="color: var(--meter-oxygen);">🫁 Life:</span> <strong>${missionData.needs.life}%</strong></div>
                <div style="text-align: center;"><span style="color: #b388ff;">🛡️ Shield:</span> <strong>${missionData.needs.shield}%</strong></div>
                <div style="text-align: center;"><span style="color: #ff9100;">🌡️ Thermal:</span> <strong>${missionData.needs.thermal}%</strong></div>
                <div style="text-align: center;"><span style="color: #26c6da;">🔬 Science:</span> <strong>${missionData.needs.science}%</strong></div>
              </div>
            </div>

            <button class="btn-primary" id="btn-start-debris-field" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #b08968, #7f5539);">
              <span>Deploy Debris Recovery Team & Investigate Crash Site 🚜</span>
            </button>
          </div>
        `;

        overlay.querySelector("#btn-close-debris-modal").addEventListener("click", () => {
          overlay.remove();
        });

        overlay.querySelector("#btn-start-debris-field").addEventListener("click", () => {
          sound.playClick();
          currentPhase = "collecting";
          render();
        });

      } else if (currentPhase === "collecting") {
        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 640px; border-top: 4px solid ${missionData.color};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <span style="font-size: 0.72rem; color: ${missionData.color}; font-weight: 800;">PHASE 2: WRECKAGE RECOVERY</span>
                <h3 style="font-size: 1.25rem; color: #fff; margin: 2px 0;">Surveying Lunar Crash Site Alpha (16 km²)</h3>
              </div>
              <span style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 800;">
                Fragments: ${fragmentsCollected.length} / 4
              </span>
            </div>

            <p style="font-size: 0.82rem; color: #cfd8dc; margin-bottom: 14px;">
              Click each piece of wreckage to salvage components and download diagnostic telemetry. Watch for environmental hazards!
            </p>

            <!-- Debris Field Recovery Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
              ${fragments.map((frag) => {
                const isCollected = fragmentsCollected.includes(frag.id);
                return `
                  <div class="debris-item-card ${isCollected ? 'collected' : ''}" data-frag-id="${frag.id}" style="background: ${isCollected ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${isCollected ? 'var(--text-highlight)' : 'rgba(255,255,255,0.1)'}; border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px; cursor: ${isCollected ? 'default' : 'pointer'}; transition: all 0.2s;">
                    <span style="font-size: 2.2rem;">${frag.icon}</span>
                    <div style="flex: 1;">
                      <div style="font-weight: 800; font-size: 0.88rem; color: ${isCollected ? 'var(--text-highlight)' : '#fff'};">${frag.name}</div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">${isCollected ? '✓ Salvaged & Stowed' : 'Click to inspect & retrieve'}</div>
                    </div>
                    <span style="font-size: 1.1rem; color: ${isCollected ? 'var(--text-highlight)' : 'rgba(255,255,255,0.3)'};">${isCollected ? '✓' : '○'}</span>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Active Hazard Card (if triggered) -->
            ${currentEvent ? `
              <div style="background: rgba(255, 51, 102, 0.12); border: 2px solid #ff3366; border-radius: 8px; padding: 14px; margin-bottom: 16px; animation: pulseDot 1s infinite alternate;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                  <span style="font-size: 1.8rem;">${currentEvent.icon}</span>
                  <div>
                    <span style="font-size: 0.7rem; color: #ff80ab; font-weight: 800; text-transform: uppercase;">EMERGENCY HAZARD TRIGGERED • CAT: ${currentEvent.cat.toUpperCase()}</span>
                    <h4 style="color: #fff; font-size: 1.05rem; margin: 0;">${currentEvent.name}</h4>
                  </div>
                </div>
                <p style="font-size: 0.82rem; color: #ffebee; margin: 6px 0 12px 0; line-height: 1.4;">
                  ${currentEvent.text}
                </p>
                <button class="btn-primary" id="btn-resolve-hazard" style="width: 100%; justify-content: center; background: #ff3366; color: #fff; font-weight: 800;">
                  <span>Execute Hazard Countermeasure 🛡️</span>
                </button>
              </div>
            ` : `
              <div style="background: rgba(0,0,0,0.3); border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px; padding: 12px; text-align: center; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 16px;">
                ${fragmentsCollected.length === 4 ? '🎉 All wreckage secured! Ready for forensic failure analysis.' : 'Retrieve remaining fragments above to proceed to root-cause engineering debrief.'}
              </div>
            `}

            ${fragmentsCollected.length === 4 && !currentEvent ? `
              <button class="btn-primary" id="btn-proceed-to-quiz" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #00e5ff, #0091ea);">
                <span>Proceed to Engineering Failure Analysis Quiz 🔬</span>
              </button>
            ` : ''}
          </div>
        `;

        // Click fragments
        overlay.querySelectorAll(".debris-item-card").forEach((card) => {
          card.addEventListener("click", () => {
            const fragId = card.getAttribute("data-frag-id");
            if (fragmentsCollected.includes(fragId) || currentEvent) return;

            sound.playCollect();
            fragmentsCollected.push(fragId);

            // Trigger corresponding hazard event
            const fragObj = fragments.find(f => f.id === fragId);
            if (fragObj && missionData.events[fragObj.eventIdx]) {
              currentEvent = missionData.events[fragObj.eventIdx];
              sound.playWarningAlarm();
            }

            render();
          });
        });

        // Resolve hazard
        const btnResolve = overlay.querySelector("#btn-resolve-hazard");
        if (btnResolve) {
          btnResolve.addEventListener("click", () => {
            sound.playSuccessChime();
            gameState.addScore(25);
            currentEvent = null;
            render();
          });
        }

        // Proceed to Quiz
        const btnQuiz = overlay.querySelector("#btn-proceed-to-quiz");
        if (btnQuiz) {
          btnQuiz.addEventListener("click", () => {
            sound.playClick();
            currentPhase = "quiz";
            quizIndex = 0;
            quizAnswered = false;
            render();
          });
        }

      } else if (currentPhase === "quiz") {
        const qObj = missionData.quiz[quizIndex];
        const isLastQuiz = quizIndex === missionData.quiz.length - 1;

        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 600px; border-top: 4px solid var(--border-cyan);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <span style="font-size: 0.72rem; color: var(--border-cyan); font-weight: 800;">PHASE 3: NASA FORENSIC ANALYSIS QUIZ</span>
                <h3 style="font-size: 1.25rem; color: #fff; margin: 2px 0;">Failure Investigation Debrief</h3>
              </div>
              <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 800;">
                Question ${quizIndex + 1} of ${missionData.quiz.length}
              </span>
            </div>

            <!-- Question Card -->
            <div style="background: rgba(14,23,42,0.85); border: 1px solid rgba(0,229,255,0.3); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <h4 style="color: #fff; font-size: 1.05rem; line-height: 1.45; margin: 0 0 14px 0;">
                ${qObj.q}
              </h4>

              <div style="display: flex; flex-direction: column; gap: 8px;" id="quiz-options-container">
                ${qObj.a.map((opt, i) => `
                  <button class="btn-secondary btn-quiz-opt" data-opt-idx="${i}" style="justify-content: flex-start; text-align: left; padding: 12px 16px; font-size: 0.88rem; border-radius: 8px;">
                    <span style="font-weight: 800; margin-right: 8px; color: var(--border-cyan);">${String.fromCharCode(65 + i)}:</span>
                    <span>${opt}</span>
                  </button>
                `).join("")}
              </div>

              <!-- Explanation Callout -->
              <div id="quiz-explanation-box" style="display: none; margin-top: 14px; background: rgba(0, 230, 118, 0.1); border-left: 3px solid var(--text-highlight); padding: 10px 14px; border-radius: 4px; font-size: 0.82rem; color: #cfd8dc;">
                <strong style="color: var(--text-highlight);">NASA Engineering Principle:</strong> ${qObj.why}
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn-primary" id="btn-next-quiz" style="display: none; padding: 10px 22px;">
                ${isLastQuiz ? 'Complete Investigation & Claim +250 Pts 🏆' : 'Next Question →'}
              </button>
            </div>
          </div>
        `;

        overlay.querySelectorAll(".btn-quiz-opt").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (quizAnswered) return;
            quizAnswered = true;

            const selectedIdx = parseInt(btn.getAttribute("data-opt-idx"));
            const explBox = overlay.querySelector("#quiz-explanation-box");
            const nextBtn = overlay.querySelector("#btn-next-quiz");

            if (selectedIdx === qObj.c) {
              sound.playSuccessChime();
              btn.style.background = "rgba(0, 230, 118, 0.25)";
              btn.style.borderColor = "var(--text-highlight)";
              btn.style.color = "var(--text-highlight)";
              gameState.addScore(50);
            } else {
              sound.playFail();
              btn.style.background = "rgba(255, 51, 102, 0.25)";
              btn.style.borderColor = "#ff3366";
              // Highlight correct option
              const correctBtn = overlay.querySelector(`.btn-quiz-opt[data-opt-idx="${qObj.c}"]`);
              if (correctBtn) {
                correctBtn.style.background = "rgba(0, 230, 118, 0.25)";
                correctBtn.style.borderColor = "var(--text-highlight)";
              }
            }

            if (explBox) explBox.style.display = "block";
            if (nextBtn) nextBtn.style.display = "inline-flex";
          });
        });

        const nextBtn = overlay.querySelector("#btn-next-quiz");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            sound.playClick();
            if (isLastQuiz) {
              currentPhase = "done";
              render();
            } else {
              quizIndex++;
              quizAnswered = false;
              render();
            }
          });
        }

      } else if (currentPhase === "done") {
        sound.playSuccessChime();
        gameState.addScore(100);
        gameState.progressObjective("moon_debris", 1);
        gameState.refillResources({ oxygen: 20, power: 20, water: 15 });

        const diffKey = gameState.state.difficulty || "cadet";
        const diff = GAME_CONFIG.DIFFICULTY[diffKey] || GAME_CONFIG.DIFFICULTY.cadet;

        overlay.innerHTML = `
          <div class="modal-card" style="max-width: 540px; text-align: center; border-top: 4px solid var(--text-highlight);">
            <div style="font-size: 3.5rem; margin-bottom: 6px;">🧹🏆</div>
            <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 800; letter-spacing: 2px;">MISSION CERTIFIED • NASA FLIGHT OPS</div>
            <h3 style="color: #fff; font-size: 1.45rem; margin: 4px 0 8px 0;">DEBRIS CLEANUP COMPLETE!</h3>
            
            <p style="font-size: 0.85rem; color: #cfd8dc; line-height: 1.5; margin-bottom: 14px;">
              Crash site wreckage successfully cleared and analyzed! Root-cause flight telemetry has been transmitted back to Houston Mission Control to safeguard all future Artemis missions.
            </p>

            <!-- 4-Sol Consumables Burn & Survival Breakdown -->
            <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 14px; text-align: left; font-size: 0.78rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <strong style="color: #fff;">4-Sol EVA Consumables Burn Report:</strong>
                <span style="color: var(--accent-gold); font-weight: 700;">Difficulty: ${diff.name} (${diff.drainMultiplier}x)</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center; margin-bottom: 6px;">
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">🫁 O2: -${Math.round(14 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">💧 H2O: -${Math.round(16 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">🍱 Food: -${Math.round(12 * diff.drainMultiplier)}%</div>
                <div style="background: rgba(255,255,255,0.04); padding: 6px; border-radius: 4px;">⚡ Pwr: -${Math.round(18 * diff.drainMultiplier)}%</div>
              </div>
              <div style="color: var(--text-highlight); font-size: 0.72rem;">
                ✓ Reserves Replenished: +20% O2, +20% Power & +15% Water recycled from salvaged lander modules!
              </div>
            </div>

            <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--text-highlight); border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <strong style="color: var(--text-highlight); font-size: 1rem;">+250 SCIENCE POINTS AWARDED ⭐</strong>
              <div style="font-size: 0.78rem; color: #cfd8dc; margin-top: 2px;">
                Objective "Debris Cleanup & Crash Analysis" Certified • Base Operations Nominal
              </div>
            </div>

            <!-- Direct Mission Sequence: Mission 3 Attached After Debris Cleanup -->
            <div style="background: rgba(46, 204, 113, 0.14); border: 2px solid #2ecc71; border-radius: 8px; padding: 14px; margin-bottom: 12px; text-align: center; box-shadow: 0 0 20px rgba(46, 204, 113, 0.25);">
              <div style="font-size: 0.72rem; color: #a9dfbf; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Next Mission Attached & Ready</div>
              <h4 style="margin: 4px 0 6px 0; color: #2ecc71; font-size: 1.25rem; font-weight: 800;">
                🌱 Mission 3: Combined Greenhouse Survival
              </h4>
              <p style="font-size: 0.8rem; color: #cfd8dc; margin: 0 0 12px 0; line-height: 1.45;">
                Houston Mission Control has cleared the crash site. Your next directive is long-duration life support: manage hydroponics and survive 120 days until the resupply ship docks.
              </p>
              <button class="btn-primary" id="btn-proceed-greenhouse-mission" style="width: 100%; justify-content: center; font-size: 1.05rem; padding: 14px; background: linear-gradient(135deg, #27ae60, #1b5e20); border: 2px solid #2ecc71; box-shadow: 0 0 20px rgba(46,204,113,0.5); font-weight: 800; cursor: pointer;">
                <span>🚀 Launch Mission 3: Combined Greenhouse Survival ➔</span>
              </button>
            </div>

            <button class="btn-secondary" id="btn-done-debris-mission" style="width: 100%; justify-content: center; font-size: 0.92rem; padding: 10px; color: #b0bec5;">
              <span>Return to Base Camp Alpha 🌕</span>
            </button>
          </div>
        `;

        const btnGreenhouse = overlay.querySelector("#btn-proceed-greenhouse-mission");
        if (btnGreenhouse) {
          btnGreenhouse.addEventListener("click", () => {
            sound.playClick();
            overlay.remove();
            if (window.greenhouseModal) {
              window.greenhouseModal.open(onComplete);
            } else if (onComplete) {
              onComplete();
            }
          });
        }

        overlay.querySelector("#btn-done-debris-mission").addEventListener("click", () => {
          sound.playClick();
          overlay.remove();
          if (onComplete) onComplete();
        });
      }
    };

    document.getElementById("modal-container").appendChild(overlay);
    render();
  }

  // Mission 3: Combined Greenhouse Survival launcher
  startGreenhouseMission(onComplete = null) {
    if (window.greenhouseModal) {
      window.greenhouseModal.open(onComplete);
    } else if (onComplete) {
      onComplete();
    }
  }
}


// --- File: js\components\events.js ---
// ============================================================================
// RANDOM HAZARD & EMERGENCY EVENTS SYSTEM
// Solar Storms, Dust Storms, Oxygen Leaks, Suit Punctures, Circuit Rewiring
// ============================================================================





class HazardEventManager {
  constructor(overlayContainer) {
    this.container = overlayContainer;
    this.timer = null;
    this.activeHazard = null;
    this.hazardInterval = null;
    this.missionsManager = new SurfaceMissionsManager(overlayContainer);
  }

  startMonitoring() {
    this.stopMonitoring();
    const diff = GAME_CONFIG.DIFFICULTY[gameState.state.difficulty] || GAME_CONFIG.DIFFICULTY.cadet;
    const intervalMs = (diff.hazardFrequencySec || 28) * 1000;

    this.hazardInterval = setInterval(() => {
      if (gameState.state.screen === "surface" && !this.activeHazard) {
        if (Math.random() < 0.6) {
          this.triggerRandomHazard();
        }
      }
    }, intervalMs);
  }

  stopMonitoring() {
    if (this.hazardInterval) {
      clearInterval(this.hazardInterval);
      this.hazardInterval = null;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  triggerRandomHazard() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const hazardKeys = dest.surfaceHazards || ["equipment_fault"];
    const chosenKey = hazardKeys[Math.floor(Math.random() * hazardKeys.length)];
    const hazard = GAME_CONFIG.HAZARDS[chosenKey];
    if (!hazard) return;

    this.activeHazard = hazard;
    gameState.activeHazard = hazard;
    sound.playAlarm();

    this.renderHazardBanner(hazard);
  }

  renderHazardBanner(hazard) {
    let timeLeft = hazard.durationSec;
    const banner = document.createElement("div");
    banner.className = "hazard-banner";
    banner.id = "active-hazard-banner";
    banner.innerHTML = `
      <div style="font-size: 2.4rem;">${hazard.icon}</div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="text-transform: uppercase; font-size: 0.95rem; letter-spacing: 0.5px;">${hazard.name}</strong>
          <span id="hazard-time-countdown" style="font-family: 'Courier New', monospace; font-weight: 800; background: #000; padding: 2px 8px; border-radius: 4px;">
            ${timeLeft}s
          </span>
        </div>
        <div style="font-size: 0.8rem; margin: 3px 0; color: #ffebee;">${hazard.alertMessage}</div>
        <div style="font-size: 0.74rem; color: #ffeb3b;">
          <strong>CAUSE CHAIN THREAT:</strong> ${hazard.chainEffect}
        </div>
      </div>
      <button class="btn-primary" id="btn-resolve-hazard" style="background: #fff; color: #d50000; font-weight: 800; padding: 10px 18px; border-radius: 8px;">
        Engage Repair! 🛠️
      </button>
    `;

    document.getElementById("modal-container").appendChild(banner);

    // Hazard resolution button launches corresponding repair mini-game
    banner.querySelector("#btn-resolve-hazard").addEventListener("click", () => {
      this.launchHazardMiniGame(hazard);
    });

    this.timer = setInterval(() => {
      timeLeft--;
      const timeEl = banner.querySelector("#hazard-time-countdown");
      if (timeEl) timeEl.textContent = `${timeLeft}s`;

      if (timeLeft <= 0) {
        this.resolveHazard(false); // Time expired, penalty applied
      }
    }, 1000);
  }

  launchHazardMiniGame(hazard) {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const banner = document.getElementById("active-hazard-banner");
    if (banner) banner.remove();

    if (hazard.miniGame === "circuit_rewire") {
      this.missionsManager.startCircuitRewireGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "leak_patch") {
      this.missionsManager.startLeakPatchGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "clear_panels") {
      this.missionsManager.startClearPanelsGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else if (hazard.miniGame === "thaw_pipes") {
      this.missionsManager.startThawPipesGame(
        () => this.resolveHazard(true),
        () => this.resolveHazard(false)
      );
    } else {
      // Solar storm shelter prompt
      this.showSolarStormPrompt();
    }
  }

  showSolarStormPrompt() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">⚡</div>
        <h3 style="color: #ffd600; font-size: 1.3rem;">SOLAR PARTICLE STORM ACTIVE!</h3>
        <p style="font-size: 0.85rem; color: #cfd8dc; margin: 8px 0 16px 0; line-height: 1.45;">
          Intense radiation is scouring the surface! Astronaut Alex must enter the <strong>Pressurized Habitat</strong> or use Lead Rad-Shielding to block lethal radiation dose!
        </p>

        <div style="display: flex; gap: 12px;">
          <button class="btn-primary" id="btn-storm-shelter" style="flex: 1; justify-content: center; background: #00e676; color: #000;">
            🏠 Retreat to Habitat Shelter
          </button>
          <button class="btn-secondary" id="btn-storm-brave" style="flex: 1; justify-content: center;">
            ⚠️ Stay Outside (Risk Damage)
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-storm-shelter").addEventListener("click", () => {
      sound.playSuccessChime();
      gameState.isAstronautInsideHabitat = true;
      overlay.remove();
      this.resolveHazard(true);
    });

    overlay.querySelector("#btn-storm-brave").addEventListener("click", () => {
      sound.playFail();
      gameState.isAstronautInsideHabitat = false;
      overlay.remove();
      this.resolveHazard(false);
    });
  }

  resolveHazard(success) {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const banner = document.getElementById("active-hazard-banner");
    if (banner) banner.remove();

    if (success) {
      sound.playSuccessChime();
      gameState.addScore(50);
      this.showNotification("HAZARD MITIGATED!", "Systems stabilized! Prevented cascading equipment failure (+50 pts).", "success");
    } else {
      sound.playFail();
      const hazard = this.activeHazard;
      if (hazard) {
        gameState.addCausality(hazard.chainEffect);
        const pen = hazard.penalty;
        if (pen.power) gameState.state.telemetry.power = Math.max(0, gameState.state.telemetry.power - pen.power);
        if (pen.oxygen) gameState.state.telemetry.oxygen = Math.max(0, gameState.state.telemetry.oxygen - pen.oxygen);
        if (pen.water) gameState.state.telemetry.water = Math.max(0, gameState.state.telemetry.water - pen.water);
        if (pen.suitIntegrity) gameState.state.telemetry.suitIntegrity = Math.max(0, gameState.state.telemetry.suitIntegrity + pen.suitIntegrity);
        if (pen.crewHealth) gameState.state.telemetry.crewHealth = Math.max(0, gameState.state.telemetry.crewHealth - pen.crewHealth);
        if (pen.crewStress) gameState.state.telemetry.crewStress = Math.min(100, gameState.state.telemetry.crewStress + pen.crewStress);
        if (pen.temperatureDrop) gameState.state.telemetry.temperature -= pen.temperatureDrop;
      }
      this.showNotification("HAZARD DAMAGE SUSTAINED", "Equipment failure unresolved! Resource reserves damaged.", "error");
    }

    this.activeHazard = null;
    gameState.activeHazard = null;
  }

  showNotification(title, message, type) {
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      bottom: 60px;
      right: 24px;
      background: ${type === 'success' ? 'rgba(0, 230, 118, 0.95)' : 'rgba(255, 51, 102, 0.95)'};
      color: #000;
      font-weight: 700;
      padding: 14px 20px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
      max-width: 380px;
    `;
    toast.innerHTML = `<div style="font-size: 0.9rem; font-weight: 800;">${title}</div><div style="font-size: 0.78rem; margin-top: 3px;">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
  }
}


// --- File: js\components\surfaceCamp.js ---
// ============================================================================
// SURFACE EXPEDITION & BASE CAMP SETUP COMPONENT
// 8 Vitals HUD, Objective Timer, Shelter Mechanics, Visual Hazards & Trade-Offs
// ============================================================================






class SurfaceCampComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.unsubscribe = null;
    this.hazardManager = null;
    this.missionsManager = null;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Interactive surface astronaut
    this.astronaut = {
      x: 320,
      y: 405,
      vx: 0,
      facing: 1,
      isWalking: false,
      stepCycle: 0
    };

    this.keys = { left: false, right: false };

    // Build sites on surface (coordinates on canvas)
    this.buildSites = [
      { id: "site_1", x: 140, y: 360, width: 90, height: 70, module: null },
      { id: "site_2", x: 260, y: 350, width: 90, height: 70, module: null },
      { id: "site_3", x: 380, y: 355, width: 90, height: 70, module: null },
      { id: "site_4", x: 500, y: 345, width: 90, height: 70, module: null }
    ];

    this.resourceNodes = [];
    this.selectedToolboxModule = null;
    this.tradeOffPromptShown = false;

    this.init();
  }

  init() {
    this.hazardManager = new HazardEventManager(document.getElementById("modal-container"));
    this.missionsManager = new SurfaceMissionsManager(document.getElementById("modal-container"));

    this.render();
    this.setupCanvas();
    this.attachEvents();
    this.setupResourceNodes();
    this.loop();

    this.hazardManager.startMonitoring();
    this.showStageWelcomeFact();

    this.unsubscribe = gameState.subscribe((state, event, payload) => {
      if (state.screen === "surface") {
        if (event === "telemetry_tick" || event === "timer_tick" || event === "objective_progress" || event === "objective_completed") {
          this.updateTelemetryHud();
          this.updateObjectivesHud();
          this.checkDecisionPressurePrompts();
        }
      }
    });
  }

  showStageWelcomeFact() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(14, 23, 42, 0.96);
      border: 2px solid var(--border-cyan);
      box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);
      color: #fff;
      padding: 14px 22px;
      border-radius: 12px;
      z-index: 1000;
      max-width: 550px;
      text-align: center;
      animation: fadeIn 0.4s ease;
    `;
    toast.innerHTML = `
      <div style="font-size: 0.75rem; letter-spacing: 1.5px; color: var(--accent-gold); font-weight: 800; text-transform: uppercase;">
        📡 NASA FLIGHT DIRECTOR TRANSMISSION
      </div>
      <div style="font-size: 0.95rem; font-weight: 800; margin: 4px 0;">
        Touchdown Confirmed: ${dest.name} Surface Operations!
      </div>
      <div style="font-size: 0.82rem; color: #cfd8dc; line-height: 1.45;">
        ${dest.nasaFact}
      </div>
      <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-highlight);">
        Gravity: ${dest.gravityMps2} m/s² • Temp: ${dest.surfaceTemp} • Radiation: ${dest.radiationLevel} mSv/hr
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 6000);
  }

  render() {
    const s = gameState.state;
    const dest = GAME_CONFIG.DESTINATIONS[s.selectedDestination];
    const placed = s.campPlacedModules;
    const t = s.telemetry;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <!-- Surface Header: 8 Life Support Vitals Bar -->
        <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 1.15rem; font-weight: 800; color: ${dest.themeColor};">
                ${dest.name} Base Camp Alpha
              </span>
              <span id="shelter-status-tag" style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1); color: #fff;">
                EVA Spacewalk (Unsheltered)
              </span>
            </div>

            <!-- Objective Countdown Timer -->
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; font-weight: 800; color: var(--accent-gold); background: rgba(0,0,0,0.5); padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(255,214,0,0.3);">
                ⏱️ TIME REMAINING: <span id="objective-countdown-text">${this.formatTime(s.missionTimeLeftSec)}</span>
              </div>
              <button class="btn-primary" id="btn-complete-mission" style="padding: 8px 16px; font-size: 0.85rem;" ${!gameState.areAllObjectivesComplete() ? 'disabled' : ''}>
                <span>Depart & Debrief 📋</span>
              </button>
            </div>
          </div>

          <!-- All 8 Vitals in Compact Grid -->
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px;" id="surface-vitals-strip">
            ${this.renderMiniMeter("🫁 O₂", Math.round(t.oxygen), "var(--meter-oxygen)", "%")}
            ${this.renderMiniMeter("💧 H₂O", Math.round(t.water), "var(--meter-water)", "%")}
            ${this.renderMiniMeter("🍞 Food", Math.round(t.food), "var(--meter-food)", "%")}
            ${this.renderMiniMeter("⚡ Power", Math.round(t.power), "var(--meter-power)", "%")}
            ${this.renderMiniMeter("🌡️ Temp", Math.round(t.temperature), "#29b6f6", "°C")}
            ${this.renderMiniMeter("☢️ Rad", t.radiation.toFixed(1), "#ffd600", "mSv")}
            ${this.renderMiniMeter("🛡️ Suit", Math.round(t.suitIntegrity), "#ab47bc", "%")}
            ${this.renderMiniMeter("❤️ Health", Math.round(t.crewHealth), "#00e676", "%")}
          </div>
        </div>

        <!-- Flight Director Guidance Banner -->
        <div class="flight-directive-banner">
          <div class="f-banner-left">
            <span class="f-banner-badge">🚀 STEP 8 OF 9</span>
            <div class="f-banner-text">
              <strong>FLIGHT DIRECTOR DIRECTIVE:</strong> Explore the surface with <strong>[A / D]</strong>! Place modules from your toolbox, drill core samples, or click <strong style="color: #b08968;">[🧹 Mission: Debris Cleanup (+100 Pts)]</strong> to investigate the crashed wreckage!
            </div>
          </div>
          <button class="btn-secondary btn-banner-guide" id="btn-surface-open-guide">
            <span>📖 Full Walkthrough</span>
          </button>
        </div>

        <!-- Surface Layout Grid -->
        <div class="surface-layout">
          <!-- Left: Toolbox & Mission Objectives Checklist -->
          <aside class="surface-toolbox">
            <!-- Mandatory Mission Objectives Card -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,214,0,0.3); border-radius: var(--radius-md); padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: var(--accent-gold); font-size: 0.85rem;">🎯 MANDATORY OBJECTIVES</strong>
                <span style="font-size: 0.72rem; color: var(--text-muted);" id="objectives-ratio-text">
                  ${s.levelObjectives.filter(o => o.completed).length} / ${s.levelObjectives.length} Done
                </span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;" id="surface-objectives-checklist">
                ${this.renderObjectivesChecklist()}
              </div>
            </div>

            <!-- Base Camp Module Builder -->
            <div class="panel-title" style="margin-top: 6px;">
              <span>🏗️ Base Camp Toolbox</span>
              <span style="font-size: 0.78rem; color: var(--accent-gold);">${placed.length} / 4 Placed</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;" id="toolbox-modules-list">
              ${this.renderToolboxModules()}
            </div>

            <!-- Net Life Support Generation Ticker -->
            <div style="background: rgba(0, 229, 255, 0.08); border-left: 3px solid var(--border-cyan); padding: 8px 10px; border-radius: 6px; font-size: 0.75rem;" id="net-production-ticker">
              ${this.renderNetProductionHtml()}
            </div>

            <!-- Science Operations -->
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; display: flex; flex-direction: column; gap: 6px;">
              <button class="btn-primary" id="btn-run-debris-cleanup" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #b08968, #7f5539); border: 1px solid #b08968; color: #fff; font-weight: 700; box-shadow: 0 0 12px rgba(176,137,104,0.4);">
                <span>🧹 Mission 2: Debris Cleanup (+100 Pts)</span>
              </button>
              <button class="btn-primary" id="btn-run-greenhouse-survival" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #27ae60, #1b5e20); border: 1px solid #2ecc71; color: #fff; font-weight: 700; box-shadow: 0 0 12px rgba(46, 204, 113, 0.4);">
                <span>🌱 Mission 3: Combined Greenhouse Survival (60 Days)</span>
              </button>
              <button class="btn-primary" id="btn-run-extraction" style="font-size: 0.82rem; justify-content: flex-start; padding: 10px 12px; background: linear-gradient(135deg, #00e5ff, #0288d1); border: 1px solid #00e5ff; color: #000; font-weight: 800; box-shadow: 0 0 14px rgba(0,229,255,0.4);">
                <span>🚀 Final Mission: Resupply & Extraction (+1000 Pts)</span>
              </button>
              <button class="btn-secondary" id="btn-run-spectrometer" style="font-size: 0.8rem; justify-content: flex-start; padding: 8px 12px;">
                <span>🔬 Laser Spectrometer Rock Analysis</span>
              </button>
            </div>
          </aside>

          <!-- Right: Surface Interactive Canvas -->
          <div class="surface-canvas-wrapper">
            <canvas id="surface-canvas" class="game-canvas"></canvas>

            <div style="position: absolute; top: 12px; left: 16px; background: rgba(0,0,0,0.7); padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; pointer-events: none; border: 1px solid rgba(255,255,255,0.15);">
              <div>🎮 Walk with <strong>[A / D]</strong> or touch buttons. Walk into the <strong>Habitat Dome</strong> to shelter from storms!</div>
            </div>

            <!-- On-screen walking & rover buttons for mobile/tablet -->
            <div style="position: absolute; bottom: 16px; left: 16px; display: flex; gap: 8px; z-index: 10; align-items: center;">
              <button class="btn-icon" id="btn-walk-left" style="width: 48px; height: 48px; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan); font-size: 1.4rem;">◀</button>
              <button class="btn-icon" id="btn-walk-right" style="width: 48px; height: 48px; background: rgba(0,0,0,0.6); border: 2px solid var(--border-cyan); font-size: 1.4rem;">▶</button>
              <button class="btn-secondary" id="btn-toggle-rover" style="font-size: 0.8rem; padding: 10px 14px; background: rgba(0,0,0,0.7); border: 2px solid var(--border-cyan); color: #fff;">
                🏎️ Mount Rover [R]
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  formatTime(totalSec) {
    const mins = Math.floor(Math.max(0, totalSec) / 60);
    const secs = Math.max(0, totalSec) % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  renderMiniMeter(label, val, color, unit) {
    const isWarn = (typeof val === 'number') && (val < 20);
    return `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 6px 8px; text-align: center;">
        <div style="font-size: 0.7rem; color: var(--text-muted);">${label}</div>
        <div style="font-family: 'Courier New', monospace; font-weight: 800; font-size: 0.88rem; color: ${isWarn ? 'var(--accent-red)' : color}; margin-top: 2px;">
          ${val}${unit}
        </div>
      </div>
    `;
  }

  renderObjectivesChecklist() {
    const s = gameState.state;
    return s.levelObjectives.map((obj) => {
      return `
        <div style="background: rgba(255,255,255,0.04); border-left: 3px solid ${obj.completed ? 'var(--text-highlight)' : 'rgba(255,255,255,0.2)'}; padding: 6px 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 700; color: ${obj.completed ? 'var(--text-highlight)' : '#fff'};">
              ${obj.icon} ${obj.title}
            </div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">
              Progress: <strong>${obj.currentCount} / ${obj.targetCount}</strong>
            </div>
          </div>
          <div style="font-size: 0.9rem; font-weight: 800; color: ${obj.completed ? 'var(--text-highlight)' : 'rgba(255,255,255,0.3)'};">
            ${obj.completed ? '✓ DONE' : '○'}
          </div>
        </div>
      `;
    }).join("");
  }

  renderToolboxModules() {
    const s = gameState.state;
    return Object.values(GAME_CONFIG.BASE_MODULES).map((mod) => {
      const isAlreadyPlaced = s.campPlacedModules.includes(mod.id);
      const isSelected = this.selectedToolboxModule === mod.id;

      return `
        <div class="module-card-draggable ${isSelected ? 'selected' : ''}" 
             data-mod-id="${mod.id}"
             style="border-color: ${isSelected ? 'var(--accent-gold)' : (isAlreadyPlaced ? 'rgba(0, 230, 118, 0.4)' : 'rgba(255,255,255,0.1)')}; background: ${isSelected ? 'rgba(255, 214, 0, 0.15)' : ''}; padding: 8px 10px;">
          <span style="font-size: 1.6rem;">${mod.icon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.8rem; color: #fff;">${mod.name}</div>
            <div style="font-size: 0.68rem; color: var(--text-highlight);">
              ${mod.powerDraw < 0 ? `⚡ +${Math.abs(mod.powerDraw)} kW` : `⚡ -${mod.powerDraw} kW`}
              ${mod.o2Gen > 0 ? ` • 🫁 +${mod.o2Gen} O₂/s` : ''}
              ${mod.foodGen > 0 ? ` • 🍞 +${mod.foodGen}/s` : ''}
              ${mod.waterGen > 0 ? ` • 💧 +${mod.waterGen}/s` : ''}
            </div>
          </div>
          <div>
            ${isAlreadyPlaced ? `<span style="color: var(--text-highlight); font-size: 0.72rem; font-weight: 800;">✓ DEPLOYED</span>` : `<button class="btn-step" style="width: auto; padding: 2px 8px; font-size: 0.7rem;">Deploy</button>`}
          </div>
        </div>
      `;
    }).join("");
  }

  renderNetProductionHtml() {
    const s = gameState.state;
    let netPower = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.power;
    let netO2 = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.oxygen;
    let netFood = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.food;
    let netWater = -GAME_CONFIG.SURVIVAL.PASSIVE_DRAIN.water;

    s.campPlacedModules.forEach((modId) => {
      const m = GAME_CONFIG.BASE_MODULES[modId];
      if (m) {
        netPower -= m.powerDraw;
        netO2 += m.o2Gen || 0;
        netFood += m.foodGen || 0;
        netWater += m.waterGen || 0;
      }
    });

    const formatRate = (rate) => (rate >= 0 ? `+${rate.toFixed(1)}/s` : `${rate.toFixed(1)}/s`);

    return `
      <div style="font-weight: 800; color: #fff; margin-bottom: 2px;">Net Life Support Generation:</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; font-size: 0.7rem;">
        <div>⚡ Power: <strong style="color: ${netPower >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netPower)}</strong></div>
        <div>🫁 O₂ Air: <strong style="color: ${netO2 >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netO2)}</strong></div>
        <div>🍞 Food: <strong style="color: ${netFood >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netFood)}</strong></div>
        <div>💧 Water: <strong style="color: ${netWater >= 0 ? 'var(--text-highlight)' : 'var(--meter-food)'}">${formatRate(netWater)}</strong></div>
      </div>
    `;
  }

  setupCanvas() {
    this.canvas = this.container.querySelector("#surface-canvas");
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : {};
    this.canvas.width = rect.width && rect.width > 200 ? rect.width : (this.container.clientWidth || 800);
    this.canvas.height = rect.height && rect.height > 200 ? rect.height : 520;
    this.ctx = this.canvas.getContext("2d");

    const placed = gameState.state.campPlacedModules;
    this.buildSites.forEach((site, idx) => {
      site.module = placed[idx] || null;
    });
  }

  setupResourceNodes() {
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const gatherables = dest.gatherables || [];
    this.resourceNodes = [];

    const positions = [
      { x: 90, y: 440 },
      { x: 670, y: 430 },
      { x: 740, y: 380 }
    ];

    gatherables.forEach((g, idx) => {
      const pos = positions[idx] || { x: 200 + idx * 150, y: 420 };
      this.resourceNodes.push({
        ...g,
        x: pos.x,
        y: pos.y,
        radius: 24,
        pulse: 0
      });
    });

    // Crashed probe debris recovery site on lunar/planetary terrain
    this.resourceNodes.push({
      id: "debris_crash_site",
      name: "Crash Site Alpha (Debris Cleanup)",
      icon: "🧹",
      type: "debris",
      x: 640,
      y: 410,
      radius: 28,
      pulse: 0
    });
  }

  attachEvents() {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = true;
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") this.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") this.keys.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const btnLeft = this.container.querySelector("#btn-walk-left");
    const btnRight = this.container.querySelector("#btn-walk-right");
    if (btnLeft && btnRight) {
      btnLeft.addEventListener("pointerdown", () => { this.keys.left = true; });
      btnLeft.addEventListener("pointerup", () => { this.keys.left = false; });
      btnLeft.addEventListener("pointercancel", () => { this.keys.left = false; });

      btnRight.addEventListener("pointerdown", () => { this.keys.right = true; });
      btnRight.addEventListener("pointerup", () => { this.keys.right = false; });
      btnRight.addEventListener("pointercancel", () => { this.keys.right = false; });
    }

    // Select module in toolbox
    this.container.querySelectorAll(".module-card-draggable").forEach((card) => {
      card.addEventListener("click", () => {
        const modId = card.getAttribute("data-mod-id");
        if (gameState.state.campPlacedModules.includes(modId)) {
          sound.playClick();
          return;
        }

        sound.playClick();
        this.selectedToolboxModule = (this.selectedToolboxModule === modId) ? null : modId;
        this.updateToolboxView();
      });
    });

    // Canvas click interaction
    if (this.canvas) {
      this.canvas.addEventListener("click", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        this.astronaut.targetX = clickX;

        // Check if clicked a Resource Deposit or Debris Site
        for (let node of this.resourceNodes) {
          const dist = Math.hypot(clickX - node.x, clickY - node.y);
          if (dist <= node.radius + 14) {
            if (node.type === "debris" || node.id === "debris_crash_site") {
              gameState.activeActivity = "debris_cleanup";
              this.missionsManager.startDebrisCleanupMission(() => {
                gameState.activeActivity = null;
              });
              return;
            }
            gameState.activeActivity = "digging";
            this.missionsManager.startDrillMission(node, () => {
              gameState.activeActivity = null;
            });
            return;
          }
        }

        // Check if clicked a Build Site
        for (let site of this.buildSites) {
          if (
            clickX >= site.x &&
            clickX <= site.x + site.width &&
            clickY >= site.y &&
            clickY <= site.y + site.height
          ) {
            if (this.selectedToolboxModule && !site.module) {
              sound.playSuccessChime();
              site.module = this.selectedToolboxModule;
              gameState.state.campPlacedModules.push(this.selectedToolboxModule);
              gameState.addScore(45);

              // Progress corresponding level objective if applicable
              if (this.selectedToolboxModule === "solar") gameState.progressObjective("moon_solar", 1);
              if (this.selectedToolboxModule === "habitat") gameState.progressObjective("mars_habitat", 1);
              if (this.selectedToolboxModule === "oxygen_gen") gameState.progressObjective("mars_moxie", 1);
              if (this.selectedToolboxModule === "greenhouse") gameState.progressObjective("mars_greenhouse", 1);

              this.selectedToolboxModule = null;
              this.updateToolboxView();
              return;
            } else if (site.module) {
              sound.playQuindar();
              const mod = GAME_CONFIG.BASE_MODULES[site.module];
              if (site.module === "greenhouse" && window.greenhouseModal) {
                window.greenhouseModal.open();
              } else {
                alert(`Active Facility: ${mod.name}\n${mod.description}`);
              }
              return;
            }
          }
        }
      });
    }

    // Greenhouse Survival Mission
    const ghBtn = this.container.querySelector("#btn-run-greenhouse-survival");
    if (ghBtn) {
      ghBtn.addEventListener("click", () => {
        gameState.activeActivity = "greenhouse_survival";
        if (window.greenhouseModal) {
          window.greenhouseModal.open(() => {
            gameState.activeActivity = null;
          });
        }
      });
    }

    // Final Mission: Resupply & Extraction
    const extBtn = this.container.querySelector("#btn-run-extraction");
    if (extBtn) {
      extBtn.addEventListener("click", () => {
        gameState.activeActivity = "lunar_extraction";
        if (window.extractionModal) {
          window.extractionModal.open(() => {
            gameState.activeActivity = null;
          });
        }
      });
    }

    // Debris Cleanup Mission
    const debrisBtn = this.container.querySelector("#btn-run-debris-cleanup");
    if (debrisBtn) {
      debrisBtn.addEventListener("click", () => {
        gameState.activeActivity = "debris_cleanup";
        this.missionsManager.startDebrisCleanupMission(() => {
          gameState.activeActivity = null;
        });
      });
    }

    // Laser Spectrometer
    const specBtn = this.container.querySelector("#btn-run-spectrometer");
    if (specBtn) {
      specBtn.addEventListener("click", () => {
        gameState.activeActivity = "spectrometry";
        this.missionsManager.startSpectrometerMission(() => {
          gameState.activeActivity = null;
        });
      });
    }

    // Depart & Debrief
    const debriefBtn = this.container.querySelector("#btn-complete-mission");
    if (debriefBtn) {
      debriefBtn.addEventListener("click", () => {
        if (gameState.areAllObjectivesComplete()) {
          sound.playSuccessChime();
          this.cleanup();
          gameState.setScreen("debrief");
        }
      });
    }

    const btnGuide = this.container.querySelector("#btn-surface-open-guide");
    if (btnGuide) {
      btnGuide.addEventListener("click", () => {
        sound.playClick();
        const app = window.juniorTrainerApp || window.__trainerApp;
        if (app && app.guideModal) {
          app.guideModal.open("debris_mission");
        }
      });
    }
  }

  // Strategic Decision Pressure Trade-Off Prompts
  checkDecisionPressurePrompts() {
    const t = gameState.state.telemetry;
    if (t.oxygen < 25 && !this.tradeOffPromptShown) {
      this.tradeOffPromptShown = true;
      this.showTradeOffModal("CRITICAL OXYGEN DILEMMA (24% REMAINING)", "Your spacesuit oxygen reserves are low! Do you push through to finish the surface objective with heightened risk of asphyxiation, or immediately retreat to the Habitat Dome?", () => {
        // Option 1: push through
        sound.playAlarm();
        gameState.addScore(20);
      }, () => {
        // Option 2: retreat
        sound.playSuccessChime();
        this.astronaut.x = 220; // walk into habitat
        gameState.isAstronautInsideHabitat = true;
      });
    }
  }

  showTradeOffModal(title, text, onBrave, onRetreat) {
    sound.playWarningChime();
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-card" style="max-width: 520px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 6px;">⚖️</div>
        <h3 style="color: var(--accent-gold); font-size: 1.25rem;">${title}</h3>
        <p style="font-size: 0.85rem; color: #cfd8dc; margin: 8px 0 16px 0; line-height: 1.45;">
          ${text}
        </p>

        <div style="display: flex; gap: 12px;">
          <button class="btn-primary" id="btn-decision-retreat" style="flex: 1; justify-content: center; background: #00e676; color: #000;">
            🏠 Retreat to Habitat Dome
          </button>
          <button class="btn-secondary" id="btn-decision-brave" style="flex: 1; justify-content: center; color: #ff80ab;">
            ⚡ Push Through (+Risk)
          </button>
        </div>
      </div>
    `;

    document.getElementById("modal-container").appendChild(overlay);

    overlay.querySelector("#btn-decision-retreat").addEventListener("click", () => {
      overlay.remove();
      if (onRetreat) onRetreat();
    });

    overlay.querySelector("#btn-decision-brave").addEventListener("click", () => {
      overlay.remove();
      if (onBrave) onBrave();
    });
  }

  updateToolboxView() {
    const list = this.container.querySelector("#toolbox-modules-list");
    if (list) list.innerHTML = this.renderToolboxModules();

    const ticker = this.container.querySelector("#net-production-ticker");
    if (ticker) ticker.innerHTML = this.renderNetProductionHtml();

    this.attachEvents();
  }

  updateTelemetryHud() {
    const s = gameState.state;
    const t = s.telemetry;
    const strip = this.container.querySelector("#surface-vitals-strip");
    if (strip) {
      strip.innerHTML = `
        ${this.renderMiniMeter("🫁 O₂", Math.round(t.oxygen), "var(--meter-oxygen)", "%")}
        ${this.renderMiniMeter("💧 H₂O", Math.round(t.water), "var(--meter-water)", "%")}
        ${this.renderMiniMeter("🍞 Food", Math.round(t.food), "var(--meter-food)", "%")}
        ${this.renderMiniMeter("⚡ Power", Math.round(t.power), "var(--meter-power)", "%")}
        ${this.renderMiniMeter("🌡️ Temp", Math.round(t.temperature), "#29b6f6", "°C")}
        ${this.renderMiniMeter("☢️ Rad", t.radiation.toFixed(1), "#ffd600", "mSv")}
        ${this.renderMiniMeter("🛡️ Suit", Math.round(t.suitIntegrity), "#ab47bc", "%")}
        ${this.renderMiniMeter("❤️ Health", Math.round(t.crewHealth), "#00e676", "%")}
      `;
    }

    const shelterTag = this.container.querySelector("#shelter-status-tag");
    if (shelterTag) {
      if (gameState.isAstronautInsideHabitat) {
        shelterTag.textContent = "🛡️ Sheltered in Habitat (Rad Shielded 95%)";
        shelterTag.style.background = "rgba(0, 230, 118, 0.2)";
        shelterTag.style.color = "var(--text-highlight)";
      } else {
        shelterTag.textContent = "EVA Spacewalk (Unsheltered)";
        shelterTag.style.background = "rgba(255,255,255,0.1)";
        shelterTag.style.color = "#fff";
      }
    }
  }

  updateObjectivesHud() {
    const s = gameState.state;
    const countEl = this.container.querySelector("#objective-countdown-text");
    if (countEl) countEl.textContent = this.formatTime(s.missionTimeLeftSec);

    const checklistEl = this.container.querySelector("#surface-objectives-checklist");
    if (checklistEl) checklistEl.innerHTML = this.renderObjectivesChecklist();

    const ratioEl = this.container.querySelector("#objectives-ratio-text");
    if (ratioEl) ratioEl.textContent = `${s.levelObjectives.filter(o => o.completed).length} / ${s.levelObjectives.length} Done`;

    const debriefBtn = this.container.querySelector("#btn-complete-mission");
    if (debriefBtn) {
      debriefBtn.disabled = !gameState.areAllObjectivesComplete();
    }
  }

  loop() {
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  update() {
    let moving = false;
    if (this.keys.left) {
      this.astronaut.vx = -2.8;
      this.astronaut.facing = -1;
      moving = true;
    } else if (this.keys.right) {
      this.astronaut.vx = 2.8;
      this.astronaut.facing = 1;
      moving = true;
    } else if (this.astronaut.targetX !== undefined) {
      const diff = this.astronaut.targetX - this.astronaut.x;
      if (Math.abs(diff) > 4) {
        this.astronaut.vx = Math.sign(diff) * 2.8;
        this.astronaut.facing = Math.sign(diff);
        moving = true;
      } else {
        this.astronaut.vx = 0;
        this.astronaut.targetX = undefined;
      }
    } else {
      this.astronaut.vx *= 0.8;
    }

    this.astronaut.x += this.astronaut.vx;
    this.astronaut.isWalking = moving;

    if (moving) {
      this.astronaut.stepCycle = (this.astronaut.stepCycle + 0.2) % (Math.PI * 2);
      gameState.activeActivity = "walking";
    } else if (gameState.activeActivity === "walking") {
      gameState.activeActivity = null;
    }

    if (this.astronaut.x < 40) this.astronaut.x = 40;
    if (this.astronaut.x > this.canvas.width - 40) this.astronaut.x = this.canvas.width - 40;

    // Check if astronaut walked close to a Habitat Dome to trigger shelter
    let nearHabitat = false;
    this.buildSites.forEach((site) => {
      if (site.module === "habitat") {
        const dist = Math.abs(this.astronaut.x - (site.x + site.width / 2));
        if (dist < 45) nearHabitat = true;
      }
    });
    gameState.isAstronautInsideHabitat = nearHabitat;
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const dest = GAME_CONFIG.DESTINATIONS[gameState.state.selectedDestination];
    const t = gameState.state.telemetry;

    // Background sky
    ctx.fillStyle = dest.skyColor;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 35; i++) {
      ctx.fillRect((i * 49) % w, (i * 29) % (h * 0.5), 1.5, 1.5);
    }

    // Celestial background (Earth from Moon, Jupiter from Europa)
    if (dest.id === "moon") {
      ctx.beginPath();
      ctx.arc(w - 140, 80, 42, 0, Math.PI * 2);
      ctx.fillStyle = "#1976d2";
      ctx.fill();
      ctx.strokeStyle = "#4fc3f7";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (dest.id === "europa") {
      ctx.beginPath();
      ctx.arc(w - 180, -120, 260, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb74d";
      ctx.fill();
    }

    // Planetary Ground Terrain
    ctx.fillStyle = dest.groundColor;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, 320);
    ctx.bezierCurveTo(w * 0.3, 310, w * 0.7, 340, w, 320);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    // Draw Lander
    ctx.save();
    ctx.translate(60, 290);
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(-20, 0, 40, 20);
    ctx.fillStyle = "#eceff1";
    ctx.beginPath();
    ctx.arc(0, -6, 16, Math.PI, 0);
    ctx.fill();
    ctx.restore();

    // Draw Build Sites & Modules
    this.buildSites.forEach((site) => {
      if (site.module) {
        const mod = GAME_CONFIG.BASE_MODULES[site.module];
        ctx.save();
        ctx.translate(site.x + site.width / 2, site.y + site.height / 2);

        // Ground anchor pad
        ctx.fillStyle = "#263238";
        ctx.beginPath();
        ctx.roundRect(-40, 10, 80, 16, 6);
        ctx.fill();

        // Dome / module graphic
        ctx.fillStyle = mod.color;
        ctx.beginPath();
        ctx.arc(0, 8, 30, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(mod.icon, 0, 2);

        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(mod.name.split(' ')[0], 0, 22);

        ctx.restore();
      } else {
        ctx.save();
        ctx.strokeStyle = this.selectedToolboxModule ? "var(--text-highlight)" : "rgba(255,255,255,0.25)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(site.x, site.y, site.width, site.height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(site.x, site.y, site.width, site.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("BUILD SITE", site.x + site.width / 2, site.y + site.height / 2 + 4);
        ctx.restore();
      }
    });

    // Draw Resource Deposits
    this.resourceNodes.forEach((node) => {
      node.pulse = (node.pulse || 0) + 0.05;
      const glow = Math.sin(node.pulse) * 4;

      ctx.save();
      ctx.translate(node.x, node.y);

      ctx.fillStyle = "rgba(0, 229, 255, 0.25)";
      ctx.beginPath();
      ctx.arc(0, 0, node.radius + glow, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, 0, 0);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(node.name, 0, node.radius + 12);
      ctx.restore();
    });

    // Draw Walking Astronaut
    ctx.save();
    const bob = Math.sin(this.astronaut.stepCycle) * 3;
    ctx.translate(this.astronaut.x, this.astronaut.y + bob);
    ctx.scale(this.astronaut.facing, 1);

    ctx.font = "32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("👨‍🚀", 0, 0);

    // If sheltered, draw protective bubble aura around astronaut
    if (gameState.isAstronautInsideHabitat) {
      ctx.strokeStyle = "#00e676";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // --- VISUAL ENVIRONMENTAL OVERLAYS ---
    // 1. Dust storm overlay
    if (gameState.activeHazard && gameState.activeHazard.id === "dust_storm") {
      ctx.fillStyle = "rgba(191, 54, 12, 0.35)";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Solar Storm radiation haze
    if (gameState.activeHazard && gameState.activeHazard.id === "solar_storm") {
      ctx.fillStyle = "rgba(255, 214, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);
    }

    // 3. Frost Vignette when temperature drops below 5°C
    if (t.temperature < 5) {
      const frostIntensity = Math.min(0.6, (5 - t.temperature) * 0.02);
      ctx.fillStyle = `rgba(179, 229, 252, ${frostIntensity})`;
      ctx.fillRect(0, 0, w, 24);
      ctx.fillRect(0, h - 24, w, 24);
      ctx.fillRect(0, 0, 24, h);
      ctx.fillRect(w - 24, 0, 24, h);
    }

    // 4. Low Health heartbeat vignette
    if (t.crewHealth < 25) {
      const redPulse = Math.abs(Math.sin(Date.now() / 300)) * 0.35;
      ctx.fillStyle = `rgba(255, 51, 102, ${redPulse})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  cleanup() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.hazardManager) this.hazardManager.stopMonitoring();
    if (this.unsubscribe) this.unsubscribe();
  }

  destroy() {
    this.cleanup();
  }
}


// --- File: js\components\debrief.js ---
// ============================================================================
// MISSION DEBRIEF & MISSION FAILED SCREENS
// Comprehensive ECLSS Consumables Burn, Difficulty Survival Report & Permadeath Reset
// ============================================================================




class DebriefComponent {
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


// --- File: js\components\cinematic.js ---
// ============================================================================
// CINEMATIC PLAYER - Mission Intro & Mission-Complete Outro
// Fullscreen letterboxed video overlay with timed story captions, skip button,
// sound toggle, progress bar, graceful fallbacks and ambient-music ducking.
// ============================================================================


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

class CinematicPlayer {
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


// --- File: js\main.js ---
// ============================================================================
// JUNIOR ASTRONAUT MISSION TRAINER - MAIN APPLICATION CONTROLLER
// Complete 9-Stage Expedition Simulation Engine & Screen Router
// ============================================================================




// Components for All 9 Stages










// Modals










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


})();
