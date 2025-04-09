import { basePath } from "../utils/basePath.js";
let fragBombIcon = new Image();
fragBombIcon.src = `${basePath}assets/img/bombs/fragBombIcon.png`;
let heBombIcon = new Image();
heBombIcon.src = `${basePath}assets/img/bombs/heBombIcon.png`;
let shapedBombIcon = new Image();
shapedBombIcon.src = `${basePath}assets/img/bombs/shapedBombIcon.png`;
export class DroneIcons {
  constructor(canvas, ctx, dronePosition, drone) {
    // this.image = image;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 50;
    this.height = 80;
    this.x = canvas.width - this.width;
    this.y = 10 + dronePosition * 90 - 90;
    this.dronePosition = dronePosition;
    this.drone = drone;
    this.bombHeight = 22;
    this.bombWidth = Math.min(8, (this.width - 4) / this.drone.countBombs());
    this.statusBarWidth = 10;
  }

  draw() {
    this.ctx.globalAlpha = this.drone.isActive ? 1 : 0.5;
    this.ctx.fillStyle = "rgba(234, 234, 234, 0.3)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.drone.isAlive) {
      this.ctx.drawImage(
        this.drone.image,
        this.drone.frameWidth,
        0,
        this.drone.frameWidth,
        this.drone.frameHeight,
        this.x,
        this.y,
        this.width,
        this.width
      );
    }
    if (!this.drone.isReloading && this.drone.isAlive) {
      this.drone.fragBombs.forEach((bomb, index) => {
        this.ctx.drawImage(
          fragBombIcon,
          this.x + 2 + this.bombWidth * index,
          this.y + this.width + 5,
          this.bombWidth,
          this.bombHeight
        );
      });
      this.drone.heBombs.forEach((bomb, index) => {
        this.ctx.drawImage(
          heBombIcon,
          this.x + 2 + this.bombWidth * (index + this.drone.fragBombs.length),
          this.y + this.width + 5,
          this.bombWidth,
          this.bombHeight
        );
      });

      this.drone.shapedBombs.forEach((bomb, index) => {
        this.ctx.drawImage(
          shapedBombIcon,
          this.x +
            2 +
            this.bombWidth *
              (index + this.drone.fragBombs.length + this.drone.heBombs.length),
          this.y + this.width + 5,
          this.bombWidth,
          this.bombHeight
        );
      });
    }
    if (this.drone.isReloading) {
      const now = Date.now();
      const elapsed = now - this.drone.reloadStartTime;
      const progress = Math.min(elapsed / this.drone.reloadingTime, 1);
      const barWidth = (this.width - 4) * progress;
      // Малюємо фон полоски (темний)
      this.ctx.fillStyle = "rgba(100, 100, 100, 1)";
      this.ctx.fillRect(
        this.x + 2,
        this.y + this.width + 5,
        this.width - 4,
        this.bombHeight
      );
      // Малюємо саму полоску (яскравіша зелена)
      this.ctx.fillStyle = "rgba(55, 230, 24, 0.8)";
      this.ctx.fillRect(
        this.x + 2,
        this.y + this.width + 5,
        barWidth,
        this.bombHeight
      );
    }
    this.ctx.globalAlpha = 1;
    if (this.drone.isActive && !this.drone.isReloading) {
      const hpBarHeight = (this.drone.hp / this.drone.initialHP) * this.height;
      const visibilityBarHeight = (this.drone.visibility / 100) * this.height;
      this.ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
      this.ctx.fillRect(
        this.x - this.statusBarWidth,
        this.y + this.height,
        this.statusBarWidth,
        -this.height
      );
      this.ctx.fillStyle = "rgba(93, 252, 0, 0.5)";
      this.ctx.fillRect(
        this.x - this.statusBarWidth,
        this.y + this.height,
        this.statusBarWidth,
        -hpBarHeight
      );

      this.ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
      this.ctx.fillRect(
        this.x - this.statusBarWidth * 2,
        this.y + this.height,
        this.statusBarWidth,
        -this.height
      );
      this.ctx.fillStyle = "rgba(252, 4, 4, 0.5)";
      this.ctx.fillRect(
        this.x - this.statusBarWidth * 2,
        this.y + this.height,
        this.statusBarWidth,
        -visibilityBarHeight
      );
    }
  }
}
