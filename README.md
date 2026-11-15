# 🚀 Junior Astronaut Mission Trainer
**NASA Space Apps Challenge Entry | Target Audience: Kids Aged 8–14**

A realistic, educational space survival mission trainer built with HTML5, CSS3, modern JavaScript, Canvas 2D, and the Web Audio API.

---

## 🌟 Game Overview

**Junior Astronaut Mission Trainer** places players in the commander's seat of humanity's most daring space expeditions. Unlike simple arcade games, this is a **deep space survival simulator**: every decision has an immediate cost, and failure to balance power and thermal systems triggers cascading life-support chain reactions.

Guided by NASA Flight Director Stella, players command missions to **The Moon (Level 1)**, **Mars (Level 2)**, and **Europa / Jupiter's Moons (Level 3)**.

---

## 🫁 1. Life Support Vitals & Chain Reactions
Always visible on the Mission Control HUD, players must actively monitor 8 interdependent life support telemetry streams:

| Vital | Nominal Range | Failure Impact & Cascading Chain Reaction |
| :--- | :--- | :--- |
| **🫁 Oxygen ($O_2$)** | $80 - 100\%$ | Asphyxiation sets in rapidly if depleted ($0\%$). Physical tasks (drilling, walking) accelerate consumption. |
| **💧 Water ($H_2O$)** | $70 - 100\%$ | Essential for drinking and heat loops. Dehydration causes steady health decline. Freezes if cabin temperature falls below $0^\circ\text{C}$. |
| **🍞 Food Rations** | $70 - 100\%$ | Astronaut stamina and nutrition. Depletion induces severe exhaustion and stress spikes. |
| **⚡ Power** | $70 - 100\%$ | **The heart of the base.** Runs heaters, Sabatier $O_2$ reactors, and tools. Depletion stops heating, causing immediate cabin freeze! |
| **🌡️ Temperature** | $18 - 24^\circ\text{C}$ | Maintained by electric heating. If power dies, temperatures plunge toward planetary ambient ($-60^\circ\text{C}$ to $-170^\circ\text{C}$). Hypothermia damages crew health below $10^\circ\text{C}$. |
| **☢️ Radiation** | $0.1 - 0.5\text{ mSv}$ | Surges during solar storms and in Jupiter's radiation belts. Causes radiation sickness unless crew is sheltered inside the **Pressurized Habitat Dome**. |
| **🛡️ Suit Integrity** | $80 - 100\%$ | Protects against decompression. Sharp rocks and micro-meteoroids tear suits, causing rapid $O_2$ venting and cooling. |
| **❤️ Crew Health** | $70 - 100\%$ | Overall crew vitality. Reaching $0\%$ triggers immediate emergency abort. |

---

## 🎯 2. Mandatory Mission Objectives Per Level
Each level features mandatory objectives that must be completed before the mission timer expires and supplies run dry:

### Level 1: The Moon (Artemis Base Camp)
- 🌑 **Collect Regolith Soil Samples (0/2)**: Drill core samples containing trapped volatiles.
- ☀️ **Deploy Surface Solar Array (0/1)**: Construct photovoltaic panels on Shackleton Crater rim.
- 📡 **Deploy ALSEP Passive Seismometer (0/1)**: Install lunar seismic instruments to record moonquakes.

### Level 2: Mars (Jezero Station)
- 🏠 **Erect Pressurized Living Habitat (0/1)**: Deploy the geodesic radiation bunker dome.
- 🫧 **Repair MOXIE Oxygen Reactor (0/1)**: Split Martian $CO_2$ into breathable $O_2$.
- 💧 **Mine Subsurface Glacial Ice (0/1)**: Drill through permafrost to supply base water.
- 🌱 **Cultivate Hydroponic Microgreens (0/1)**: Grow aeroponic crops in the greenhouse module.

### Level 3: Jupiter's Moons / Europa (Cryo Base)
- 🛡️ **Survive & Shield Heavy Radiation Belts (0/1)**: Erect radiation baffles beneath Jupiter's magnetic belts.
- 🧊 **Extract Cryogenic Deep Ice Core (0/2)**: Drill into the sub-crustal ocean ice matrix.
- 📡 **Transmit Interplanetary Deep Space Log (0/1)**: Beam science telemetry 628 million km back to Earth.

---

## ⚠️ 3. Random Space Hazards & Interactive Repair Mini-Games
Failures occur dynamically during planetary operations. Players must immediately engage repairs before cascading damage occurs:

1. **⚡ Coronal Mass Ejection (Solar Storm)**:
   - *Threat*: Radiation spikes above $4.5\text{ mSv/hr}$.
   - *Solution*: Walk into the **Pressurized Habitat Dome** ($95\%$ radiation shielding) or deploy lead cargo blankets.
2. **🌪️ Martian Global Dust Squall**:
   - *Threat*: Obscures solar arrays, reducing power to $0\text{ kW}$.
   - *Mini-Game*: Drag the wiper across 4 solar cells to sweep off dust before batteries drain.
3. **⚠️ Oxygen Manifold Rupture**:
   - *Threat*: Air venting at $3.0\text{ L/s}$.
   - *Mini-Game*: Tap and apply emergency cryogenic sealant patches over 3 puncture holes.
4. **🫀 EMU Spacesuit Micro-Tear**:
   - *Threat*: Rapid depressurization and suit integrity drop.
   - *Mini-Game*: Seal the puncture patch before suit pressure drops.
5. **🔌 Main Electrical Bus Short-Circuit**:
   - *Threat*: Power trips; heaters and life support go offline.
   - *Mini-Game*: Rewire matching colored terminal leads (Red, Blue, Gold) before electrical blackout.
6. **🧊 Hydraulic Water Lines Frozen**:
   - *Threat*: Water loop blocked by ice crystals.
   - *Mini-Game*: Hold the thermal heating wand over the frozen pipe section to melt the blockage.

---

## ⚖️ 4. Strategic Decision Pressure & Cargo Trade-Offs

- **Limited Cargo Slots**: Rockets feature limited equipment capacity (Scout: 2 slots, Pioneer: 3 slots, Titan: 4 slots). Players must choose:
  - 🫁 *Cryogenic $O_2$ Tank* ($+25\%$ Oxygen reserve)
  - 🧰 *NASA Multi-Tool Repair Kit* ($+50\%$ faster repair speeds)
  - 🛡️ *Polyethylene Rad-Shielding* ($-60\%$ radiation damage)
  - 🍱 *MRE Nutrient Crates* ($+25\%$ Food reserve & $-20\%$ stress)
  - 🔋 *Lithium-Sulfur Battery Pod* ($+25\%$ Power storage & cold resistance)
- **Trade-Off Dilemmas**: Low supply triggers tactical prompts:
  > *"Critical Decision: Complete drilling with 20% Oxygen remaining, or abandon task and retreat to habitat to recharge?"*
- **Tiered Warning System**:
  - **30% (Yellow)**: Visual warning banner.
  - **15% (Red Alert)**: Audible alarm siren and red flashing HUD strobe.
  - **Critical Countdown**: Immediate abort alert.

---

## 💥 5. Chain-of-Causality Failure Debrief

If Oxygen, Water, Food, Power, or Crew Health reaches $0$, a **Mission Failed** screen appears explaining the exact scientific sequence of events:

```text
Dust storm obscured solar arrays 
  ➔ Battery power drained to 0% (Power Blackout)
    ➔ Base heating coils ceased functioning
      ➔ Cabin temperature plunged to -45°C
        ➔ Water recirculation lines froze solid
          ➔ Crew succumbed to severe hypothermia
```

- **Resilience Principle**: Cumulative Science Points are preserved in NASA archives. Level progress resets, and the player returns to the rocket hangar to refine their cargo and strategy.

---

## 🏆 6. Scoring & Difficulty Modes

- **Scoring**: Points awarded for objectives completed, resource conservation, surviving hazards, and mission speed.
- **Difficulty Modes**:
  - **🌱 Cadet (Standard)**: $1.0\times$ drain, generous supplies, moderate hazards.
  - **🚀 Commander (Challenging)**: $1.35\times$ drain, $-15\%$ supplies, $1.5\times$ score.
  - **🔥 Iron Astronaut (Extreme Simulation)**: $1.7\times$ drain, $-30\%$ supplies, frequent equipment failures, $2.2\times$ score.

---

## 🎬 7. Story Cinematics (Intro & Mission-Complete Outro)

- **Intro** (`assets/video/intro.mp4`): plays when you press **START MISSION** (first time each session), then opens the Mission Briefing. Replay any time with **🎬 Watch Intro** on the title screen.
- **Outro** (`assets/video/outro.mp4`): plays automatically when a mission ends in success, then fades out to reveal the Debrief report card. It does not play on Mission Failed.
- Timed story captions, progress bar, sound toggle (`M`), and **Skip** (`Esc` / `Space` / `Enter`). Ambient music ducks during playback and the game's mute setting is respected.
- If the browser blocks autoplay with sound, it retries muted, then shows a **TAP TO PLAY** button. If a video fails to load, the game just continues.
- Edit captions or timings in `js/components/cinematic.js` (`CINEMATICS` at the top).
- After changing any JS file, rebuild the bundle: `node build_bundle.js` (or `build_bundle.ps1` on Windows).

---

## 🕹️ How to Run & Play

### Option 1: Direct Double-Click (Zero Setup!)
Simply double-click [`index.html`](file:///c:/Users/HP/Desktop/junior%20astronaut%20mission%20trainer/index.html) in your browser. The game is pre-compiled into a universal standalone engine that runs directly under `file://` with no CORS errors or dependencies!

### Option 2: One-Click Windows Launcher
Double-click [`play.bat`](file:///c:/Users/HP/Desktop/junior%20astronaut%20mission%20trainer/play.bat) to launch the lightweight local server and open your default browser.

### Option 3: PowerShell Server
```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```
Navigate to [http://localhost:8082/](http://localhost:8082/).

---

## ⌨️ Controls Guide

| Action | Desktop Keyboard / Mouse | Tablet / Touchscreen |
| :--- | :--- | :--- |
| **Walk Astronaut** | `A` / `D` or `◀` / `▶` | On-screen `◀` / `▶` buttons |
| **Deploy Base Modules** | Click module in toolbox, then click build site | Tap module, then tap build site |
| **Mine / Drill Deposits** | Click deposit node, hold drill button | Tap deposit node, hold touch button |
| **Rocket Flight Steering** | `A` / `D` or `◀` / `▶` | On-screen `◀` / `▶` buttons |
| **Lander Retro-Thrusters** | `Spacebar`, `W`, or `▲` | "RETRO-THRUST" button |
| **Emergency Repairs** | Click & drag wires / patches | Tap wires / patches |
| **Sound Toggle** | Audio icon top right | Audio icon top right |
| **Tutorial & Settings** | `❓` / `⚙️` icons top right | `❓` / `⚙️` icons top right |
