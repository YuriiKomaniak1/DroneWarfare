
import { basePath } from "../utils/basePath.js";
let smallDroneImage = new Image();
smallDroneImage.src = `${basePath}assets/img/drones/smallDroneAnimation.png`;

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