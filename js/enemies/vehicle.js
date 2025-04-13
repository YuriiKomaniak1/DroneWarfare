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
    this.scale = 0.75;
    this.width = 90;
    this.height = 224;

    this.layer = layer;
    this.ctx = ctx;
    this.imageExplosion = vehicleExplosionImage;
    this.imageFire = vehicleFireImage;
    this.imageGasSmoke = gasSmokeImage;
    this.fireScale = 1;
    this.explosionScale = 1;
    this.smokeskale = 1;
    this.isDestroyed = false;
    this.isStopped = false;
    this.isBurning = false;
    this.isExploded = false;
    this.isMoving = true;
    this.burningFrame = Math.ceil(Math.random() * 3) + 3;
    this.speed = 0.5;
    this.originalSpeed = this.speed;
    this.rotation = 0;
    this.waypoints = waypoints;
    this.currentWaypointIndex = 0;
    this.shakeIntensity = 0.2;
    this.smokeTimer = 0;
    this.stoppedFrame = Math.ceil(Math.random() * 3);
    this.explodedFrame = Math.ceil(Math.random() * 4) + 3;
    this.moveFrame = 0;
    this.path = [];
    this.currentPathIndex = 0;
    this.cc = 0;
  }

  update() {
    if (!this.isMoving) return;
    if (this.path.length === 0 || this.currentPathIndex >= this.path.length) {
      this.isStopped = true;
      this.isMoving = false;
      return;
    }

    const target = this.path[this.currentPathIndex];
    const dx = target.x - this.baseX;
    const dy = target.y - this.baseY;
    const distance = Math.hypot(dx, dy);

    if (distance < 5) {
      // Досягли точки
      this.currentPathIndex++;
      this.speed = this.originalSpeed;
      if (this.currentPathIndex >= this.path.length) {
        this.isStopped = true;
        return;
      }
    } else {
      const angle = Math.atan2(dy, dx);
      //   this.cc++;
      //   if (this.cc % 60 === 0) console.log(distance, this.currentPathIndex);
      this.rotation = angle + Math.PI * 1.5;
      const randomShakeX = (Math.random() - 0.5) * this.shakeIntensity;
      const randomShakeY = (Math.random() - 0.5) * this.shakeIntensity;
      this.baseX += Math.cos(angle) * this.speed + randomShakeX;
      this.baseY += Math.sin(angle) * this.speed + randomShakeY;
    }

    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }
  draw() {
    //промальовка техніки
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    const currentFrame = this.isMoving
      ? this.moveFrame
      : this.isExploded
      ? this.explodedFrame
      : this.stoppedFrame;
    this.ctx.drawImage(
      this.image,
      0,
      currentFrame * this.height,
      this.width,
      this.height,
      (-this.width * this.scale) / 2,
      (-this.height * this.scale) / 2,
      this.width * this.scale,
      this.height * this.scale
    );
    this.ctx.restore();
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
