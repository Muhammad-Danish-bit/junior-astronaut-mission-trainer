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

export const sound = new SoundEngine();
