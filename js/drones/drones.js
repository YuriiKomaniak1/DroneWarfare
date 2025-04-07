
import { canvas } from "../training.js";
import { basePath } from "../utils/basePath.js";
let smallDroneImage = new Image();
smallDroneImage.src = `${basePath}assets/img/drones/smallDroneAnimation.png`;
export function initDrones(canvas) {
  let localCanvas=canvas;
}
class Drone {
  constructor(image, capacity, hp, type) {
    this.image = image;
    this.capacity = capacity; // Загальна місткість
    this.remainingCapacity = capacity; // Залишкова місткість
    this.hp = hp;
    this.type = type;
    this.isAllowed = true;
    this.isActive = false;
    this.isReloading = false;
    this.isAlive = true;
    this.StartFragBombs = [];
    this.StartHEBombs = [];  
    this.StartShapedBombs = [];
    this.fragBombs = [];
    this.heBombs = [];
    this.shapedBombs = [];
    this.fragBombWeight = 0.13;
    this.heBombWeight = 0.16;
    this.shapedBombWeight = 0.14;
    this.reloadingTime=1000*60*2;
    this.reloadStartTime = null;
    this.scale = 1;  // стартовий масштаб
    this.targetScale = 0.3; // цільовий масштаб при польоті
    this.rotation = 0;  // поточний поворот
    this.rotationSpeed = Math.PI / 120; // швидкість повороту
    this.shrinkRate = 0.005; // швидкість зменшення
    this.flyBackSpeed = 1.5; // швидкість польоту назад
    this.baseX = 0;
    this.baseY = 0;
  }
  resetPosition() {
    this.scale = 1;
    this.rotation = 0;
    this.baseX = localCanvas.width / 2;
    this.baseY = localCanvas.height / 2;
  }
  flyToreload() {
    if (this.isReloading) {
      if (this.scale > this.targetScale) {
        this.scale -= this.shrinkRate;
        if (this.scale < this.targetScale) this.scale = this.targetScale;
      }
      if (this.rotation < Math.PI) {
        this.rotation += this.rotationSpeed;
        if (this.rotation > Math.PI) this.rotation = Math.PI;
      }
      this.baseY += this.flyBackSpeed;
    }
  }
  draw(ctx) {
    if (!this.isAlive) return;
    if (!this.isReloading) return;
  
    ctx.save();
    ctx.translate(this.baseX, this.baseY);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.image, 0, 0, 250, 250, -125, -125, 250, 250);
    ctx.restore();
  }

 countBombs() {
    return (this.fragBombs.length +
      this.heBombs.length +
      this.shapedBombs.length
    )
  }

  isEmpty() {
    return (
      this.fragBombs.length === 0 &&
      this.heBombs.length === 0 &&
      this.shapedBombs.length === 0
    );
  }

  reloading(){
    if (this.isEmpty()&& this.isAlive) {
      this.isReloading = true;
      this.reloadStartTime = Date.now();
      setTimeout(() => {
        this.isReloading = false;
        this.reloadStartTime = null;
        this.isActive = true;
        this.fragBombs = [...this.StartFragBombs];
        this.heBombs = [...this.StartHEBombs];
        this.shapedBombs = [...this.StartShapedBombs];

      }, this.reloadingTime);
    }    
  }

  addFragBomb() {
    if (this.remainingCapacity >= this.fragBombWeight) {
      this.fragBombs.push("bomb");
      this.remainingCapacity -= this.fragBombWeight;
    }
  }
  addHEBomb() {
    if (this.remainingCapacity >= this.heBombWeight) {
      this.heBombs.push("bomb");
      this.remainingCapacity -= this.heBombWeight;
    }
  }
  addShapedBomb() {
    if (this.remainingCapacity >= this.shapedBombWeight) {
      this.shapedBombs.push("bomb");
      this.remainingCapacity -= this.shapedBombWeight;
    }
  }
}

export function createSmallDrone() {
  return new Drone(smallDroneImage, 0.9, 1.8, "smallDrone");
}
// export function createMediumDrone() {
//   return new Drone(mediumDroneImage, 2, 4, "mediumDrone");
// }
// export function createBigDrone() {
//   return new Drone(bigDroneImage, 8, 10, "bigDrone");
// }