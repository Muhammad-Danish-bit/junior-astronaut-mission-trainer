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

export const phaserEngine = new PhaserSpaceEngine();

