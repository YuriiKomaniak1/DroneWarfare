const uralZImage = new Image();
uralZImage.src = "./assets/img/vehicles/uralZ.png";
const gasSmokeImage = new Image();
gasSmokeImage.src = "./assets/img/effects/gasSmoke.png";
const vehicleExplosionImage = new Image();
vehicleExplosionImage.src = "./assets/img/effects/vehicleExplosion.png";
const vehicleFireImage = new Image();
vehicleFireImage.src = "./assets/img/effects/vehicleFire.png";

export class Vehicle {
  static type = "default"; // Тип за замовчуванням
  constructor(x, y, layer, ctx, waypoints) {
    this.image = uralZImage;
    this.baseX = x;
    this.baseY = y;
    this.x = 0;
    this.y = 0;
    this.scale = 0.65;
    this.width = 90;
    this.height = 224;
    this.layer = layer;
    this.ctx = ctx;
    this.imageExplosion = vehicleExplosionImage;
    this.imageFire = vehicleFireImage;
    this.imageGasSmoke = gasSmokeImage;
    this.frameTimer = 0;
    this.frameX = 0;
    this.gasSmokeFrames = 7;
    this.gassmokeframeSpeed = 8;
    this.gassmokeoffsetX = 0.5;
    this.gassmokeoffsetY = -0.1;
    this.vehiclefireFrames = 9;
    this.vehiclefireframeSpeed = 7;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = 0;
    this.vehiclefireImageWidth = 250;
    this.burningTime = Math.random() * 5000 + 5000;
    this.fireScale = 0.18;
    this.explosionScale = 0.8;
    this.explosionTimer = 0;
    this.explosionImageWidth = 250;
    this.explosionFrame = 0;
    this.expolosionFrames = 10;
    this.smokeScale = 0.6;
    this.isDestroyed = false;
    this.isStopped = false;
    this.isBurning = false;
    this.isMoving = true;
    this.speed = 0.5;
    this.originalSpeed = this.speed;
    this.rotation = 0;
    this.waypoints = waypoints;
    this.currentWaypointIndex = 0;
    this.shakeIntensity = 0.2;
    this.smokeTimer = 0;
    this.stoppedFrame = Math.ceil(Math.random() * 3);
    this.destroyedFrame = Math.ceil(Math.random() * 4) + 3;
    this.moveFrame = 0;
    this.path = [];
    this.currentPathIndex = 0;
  }

  update() {
    if (this.path.length === 0 || this.currentPathIndex >= this.path.length) {
      this.isMoving = false;
    }

    if (this.isMoving) {
      const target = this.path[this.currentPathIndex];
      const dx = target.x - this.baseX;
      const dy = target.y - this.baseY;
      const distance = Math.hypot(dx, dy);

      if (distance < 10) {
        this.currentPathIndex++;
        this.speed = 0;
        if (this.currentPathIndex >= this.path.length) {
          this.isMoving = false;
        }
      } else {
        const angle = Math.atan2(dy, dx);
        this.rotation = angle + Math.PI * 1.5;
        const randomShakeX = (Math.random() - 0.5) * this.shakeIntensity;
        const randomShakeY = (Math.random() - 0.5) * this.shakeIntensity;
        this.baseX += Math.cos(angle) * this.speed + randomShakeX;
        this.baseY += Math.sin(angle) * this.speed + randomShakeY;
      }
    }
    if (this.isBurning) {
      console.log("hit");
      setTimeout(() => {
        this.isDestroyed = true;
        this.isBurning = false;
        console.log("done");
      }, this.burningTime);
    }

    this.frameTimer++;
    const framespeed = this.isBurning
      ? this.vehiclefireframeSpeed
      : this.gassmokeframeSpeed;

    if (this.frameTimer >= framespeed) {
      this.frameX = (this.frameX + 1) % framespeed;
      this.frameTimer = 0;
    }
    if (this.isDestroyed) {
      this.explosionTimer++;
      if (this.explosionTimer % 8 === 0) {
        this.explosionFrame++;
        if (this.explosionFrame >= this.expolosionFrames) {
          this.explosionFrame = this.expolosionFrames + 1;
        }
      }
    }

    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }
  draw() {
    // малюємо техніку
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    const currentFrame = this.isDestroyed
      ? this.destroyedFrame
      : this.isStopped || this.isBurning
      ? this.stoppedFrame
      : this.moveFrame;
    this.ctx.drawImage(
      this.image,
      currentFrame * this.width,
      0,
      this.width,
      this.height,
      (-this.width * this.scale) / 2,
      (-this.height * this.scale) / 2,
      this.width * this.scale,
      this.height * this.scale
    );
    this.ctx.restore();

    // малюємо вихлоп
    if (this.isMoving) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);

      // Відстань від центру до вихлопної труби
      const exhaustOffsetX = this.width * this.scale * this.gassmokeoffsetX; // трохи вліво
      const exhaustOffsetY = this.height * this.scale * this.gassmokeoffsetY; // трохи вниз

      this.ctx.translate(exhaustOffsetX, exhaustOffsetY); // зміщуємо до труби
      this.ctx.drawImage(
        this.imageGasSmoke,
        this.frameX * 100,
        0,
        100,
        100,
        (-100 * this.smokeScale) / 2,
        (-100 * this.smokeScale) / 2,
        100 * this.smokeScale,
        100 * this.smokeScale
      );
      this.ctx.restore();
    }
    // малюємо горіння
    if (this.isBurning) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);

      // Відстань від центру місця горіння
      const exhaustOffsetX = this.width * this.scale * this.vehiclefireOffsetX;
      const exhaustOffsetY = this.height * this.scale * this.vehiclefireOffsetY;
      this.ctx.globalAlpha = 0.7;
      this.ctx.translate(exhaustOffsetX, exhaustOffsetY); // зміщуємо до труби
      this.ctx.drawImage(
        this.imageFire,
        this.frameX * this.vehiclefireImageWidth,
        0,
        this.vehiclefireImageWidth,
        this.vehiclefireImageWidth,
        (-this.vehiclefireImageWidth * this.fireScale) / 2 +
          Math.random() * this.shakeIntensity,
        (-this.vehiclefireImageWidth * this.fireScale) / 2 +
          Math.random() * this.shakeIntensity,
        this.vehiclefireImageWidth * this.fireScale,
        this.vehiclefireImageWidth * this.fireScale
      );
      this.ctx.globalAlpha = 1;
      this.ctx.restore();
    }
    // малюємо вибух
    if (this.isDestroyed) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      this.ctx.drawImage(
        this.imageExplosion,
        this.explosionFrame * this.explosionImageWidth,
        0,
        this.explosionImageWidth,
        this.explosionImageWidth,
        (-this.explosionImageWidth * this.explosionScale) / 2,
        (-this.explosionImageWidth * this.explosionScale) / 2,
        this.explosionImageWidth * this.explosionScale,
        this.explosionImageWidth * this.explosionScale
      );
      this.ctx.restore();
    }
  }
}

export class Ural extends Vehicle {
  constructor(x, y, layer, ctx, waypoints) {
    super(x, y, layer, ctx, waypoints);
    this.image = uralZImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 224;
    this.type = "ural";
    this.scale = 0.75;
    this.speed = 0.3;
  }
}
