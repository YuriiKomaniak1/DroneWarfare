import { basePath } from "../utils/basePath.js";
import { bombTypes } from "../gameElements/droneIcons.js";
const empty = new Image();
empty.src = `${basePath}assets/img/drones/empty.png`;
export class BriefingDrones {
  constructor(canvas, ctx, dronePosition, drone, width, x, y) {
    // this.image = image;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = this.width * 1.3;
    this.x = x;
    this.y = y;
    this.dronePosition = dronePosition;
    this.drone = drone;
    this.bombHeight = 32;
  }

  draw() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "rgba(126, 103, 85, 0.5)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.drone) {
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
      let currentOffset = 0;
      bombTypes.forEach(({ type, icon }) => {
        this.bombWidth = Math.min(
          12,
          (this.width - 4) / this.drone.countBombs()
        );
        const bombs = this.drone.bombStorage[type];
        bombs.forEach((bomb, index) => {
          this.ctx.drawImage(
            icon,
            this.x + 2 + this.bombWidth * (currentOffset + index),
            this.y + this.width + 5,
            this.bombWidth,
            this.bombHeight
          );
        });
        currentOffset += bombs.length;
      });
    } else {
      this.ctx.globalAlpha = 0.3;
      this.ctx.drawImage(
        empty,
        352,
        0,
        352,
        301,
        this.x,
        this.y,
        this.width,
        this.width
      );
      this.ctx.globalAlpha = 1;
    }
  }
}
