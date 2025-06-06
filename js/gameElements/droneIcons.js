import { basePath } from "../utils/basePath.js";
export let fragBombIcon = new Image();
fragBombIcon.src = `${basePath}assets/img/bombs/fragBombIcon.png`;
export let heBombIcon = new Image();
heBombIcon.src = `${basePath}assets/img/bombs/heBombIcon.png`;
export let shapedBombIcon = new Image();
shapedBombIcon.src = `${basePath}assets/img/bombs/shapedBombIcon.png`;
export let footMineIcon = new Image();
footMineIcon.src = `${basePath}assets/img/bombs/footMineIcon.png`;
export let tankMineIcon = new Image();
tankMineIcon.src = `${basePath}assets/img/bombs/tankMineIcon.png`;
export let magnetMineIcon = new Image();
magnetMineIcon.src = `${basePath}assets/img/bombs/magnetMineIcon.png`;
export let shrapnelBombIcon = new Image();
shrapnelBombIcon.src = `${basePath}assets/img/bombs/shrapnelBombIcon.png`;
export let clusterBombIcon = new Image();
clusterBombIcon.src = `${basePath}assets/img/bombs/clusterBombIcon.png`;
export const shapedClusterBombIcon = new Image();
shapedClusterBombIcon.src = `${basePath}assets/img/bombs/shapedClusterBombIcon.png`;
export const changeArrowImage = new Image();
changeArrowImage.src = `${basePath}assets/img/bombs/changeArrow.png`;

export const bombTypes = [
  { type: "frag", icon: fragBombIcon },
  { type: "he", icon: heBombIcon },
  { type: "shaped", icon: shapedBombIcon },
  { type: "footMine", icon: footMineIcon },
  { type: "tankMine", icon: tankMineIcon },
  { type: "magnetMine", icon: magnetMineIcon },
  { type: "shrapnel", icon: shrapnelBombIcon },
  { type: "cluster", icon: clusterBombIcon },
  { type: "shapedCluster", icon: shapedClusterBombIcon },
];
class DroneIcons {
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
    // малюємо дрон
    this.ctx.globalAlpha = this.drone.isActive ? 1 : 0.5;
    this.ctx.fillStyle = "rgba(234, 234, 234, 0.3)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.drone.isAlive) {
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
    }
    // малюємо бомби
    if (!this.drone.isReloading && this.drone.isAlive) {
      let currentOffset = 0;
      bombTypes.forEach(({ type, icon }) => {
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
    }

    if (this.drone.isReloading) {
      const now = Date.now();
      const elapsed = now - this.drone.reloadStartTime;
      const progress = Math.min(
        this.drone.reloadFrameCount / this.drone.requiredReloadFrames,
        1
      );
      const barWidth = (this.width - 4) * progress;
      this.ctx.fillStyle = "rgba(100, 100, 100, 1)";
      this.ctx.fillRect(
        this.x + 2,
        this.y + this.width + 5,
        this.width - 4,
        this.bombHeight
      );
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
export function createDroneIcons(drones, canvas, ctx) {
  const droneIcons = [];
  for (let i = 0; i < 5; i++) {
    if (drones[i]) {
      droneIcons[i] = new DroneIcons(canvas, ctx, i + 1, drones[i]);
    }
  }
  return droneIcons;
}
