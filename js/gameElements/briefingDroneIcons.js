import { basePath } from "../utils/basePath.js";
import { bombTypes } from "./droneIcons.js";
const empty = new Image();
empty.src = `${basePath}assets/img/drones/empty.png`;
export class BriefingDrones {
  constructor(canvas, ctx, drone, width, x, y, equip = false) {
    // this.image = image;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = this.width * 1.35;
    this.x = x;
    this.y = y;
    this.drone = drone;
    this.bombHeight = 32;
    this.equip = equip;
  }

  draw() {
    this.ctx.fillStyle = "rgba(126, 103, 85, 0.5)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.drone) {
      this.ctx.drawImage(
        this.drone.image,
        0,
        0,
        this.drone.frameWidth,
        this.drone.frameHeight,
        this.x,
        this.y,
        this.width,
        this.width
      );
      this.ctx.fillStyle = "rgba(80, 79, 79, 0.5)";
      this.ctx.fillRect(this.x, this.y + this.height, this.width, 8);
      this.ctx.fillStyle = "rgb(199, 223, 92)";
      this.ctx.fillRect(
        this.x,
        this.y + this.height,
        (this.width * (this.drone.capacity - this.drone.remainingCapacity)) /
          this.drone.capacity,
        8
      );
      if (!this.equip) {
        this.ctx.fillStyle = "rgba(56, 55, 50, 0.5)";
        this.ctx.fillRect(
          this.x,
          this.y + this.height + 8,
          this.width,
          this.height / 5
        );
        const fontSize = Math.floor(this.width * 0.17);
        this.ctx.fillStyle = "rgb(186, 186, 171)";
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        // Центр напису всередині прямокутника
        const textX = this.x + this.width / 2;
        const textY = this.y + this.height + 8 + this.height / 5 / 2;

        this.ctx.fillText(t("load"), textX, textY);
      }
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
            this.y + this.width + 2,
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
