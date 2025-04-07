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
  }

  draw() {
    this.ctx.globalAlpha = this.drone.isActive ? 1 : 0.5;
    this.ctx.fillStyle = "rgba(234, 234, 234, 0.3)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(
      this.drone.image,
      0,
      0,
      250,
      250,
      this.x,
      this.y,
      this.width,
      this.width
    );

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
    this.ctx.globalAlpha = 1;
  }
}
