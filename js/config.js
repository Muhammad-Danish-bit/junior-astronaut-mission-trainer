// ============================================================================
// JUNIOR ASTRONAUT MISSION TRAINER - COMPLETE NASA CONFIGURATION & METRICS SPEC
// Full Game Journey: Hangar, Boarding, Launch, Flight, Landing, Base Camp & Missions
// ============================================================================
export const GAME_CONFIG = {
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
