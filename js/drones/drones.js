let smallDroneImage = new Image();
smallDroneImage.src = "../assets/img/drones/smallDroneAnimation.png";
class Drone {
  constructor(image, capacity, hp, type) {
    this.image = image;
    this.capacity = capacity; // Загальна місткість
    this.remainingCapacity = capacity; // Залишкова місткість
    this.hp = hp;
    this.type = type;
    this.isAllowed = true;
    this.isActive = false;
    this.isCharging = false;
    this.isAlive = true;
    this.fragBombs = [];
    this.heBombs = [];
    this.shapedBombs = [];
    this.fragBombWeight = 0.13;
    this.heBombWeight = 0.16;
    this.shapedBombWeight = 0.14;
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
  return new Drone(smallDroneImage, 1, 2, "smallDrone");
}
// export function createMediumDrone() {
//   return new Drone(mediumDroneImage, 2, 4, "mediumDrone");
// }
// export function createBigDrone() {
//   return new Drone(bigDroneImage, 8, 10, "bigDrone");
// }