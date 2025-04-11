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
  constructor(x, y, layer, ctx) {
    this.image = uralZImage;
    this.x = x;
    this.y = y;
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
    this.speed = 1.5; //
    this.originalSpeed = this.speed;
    this.rotation = 0;
    this.waypoints = waypoints;
    this.currentWaypointIndex = 0;
    this.shakeIntensity = 0.5;
    this.smokeTimer = 0;
    this.stoppedFrame = Math.ceil(Math.random() * 3);
    this.explodedFrame = Math.ceil(Math.random() * 4) + 3;
    this.moveFrame = 0;
  }

  update() {
    if (!this.isMoving) return;
    if (this.waypoints.length === 0) return;

    const target = this.waypoints[this.currentWaypointIndex];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 5) {
      // Зменшуємо швидкість перед зупинкою
      this.speed *= 0.95;
      if (this.speed < 0.2) {
        this.currentWaypointIndex++;
        this.speed = this.originalSpeed;
        if (this.currentWaypointIndex >= this.waypoints.length) {
          this.isStopped = true;
        }
      }
      return;
    }

    const angle = Math.atan2(dy, dx);
    this.rotation = angle + Math.PI / 2;
    const randomShakeX = (Math.random() - 0.5) * this.shakeIntensity;
    const randomShakeY = (Math.random() - 0.5) * this.shakeIntensity;
    this.x += Math.cos(angle) * this.speed + randomShakeX;
    this.y += Math.sin(angle) * this.speed + randomShakeY;
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
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}

export class Ural extends Enemy {
  constructor(x, y, layer, ctx, obstacles) {
    super(x, y, layer, ctx, obstacles);
    this.image = uralZImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 224;
  }
}
