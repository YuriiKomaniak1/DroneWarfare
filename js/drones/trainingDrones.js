import { createSmallDrone } from "./drones.js";
let smallDroneImage = new Image();
smallDroneImage.src = "../assets/img/drones/smallDroneAnimation.png";

let drone1 = createSmallDrone();
let drone2 = createSmallDrone();
let drone3 = createSmallDrone();
let drone4 = createSmallDrone();
let drone5 = createSmallDrone();
export let drones = [drone1, drone2, drone3, drone4, drone5];

drones.forEach((drone) => {
  while (drone.remainingCapacity >= drone.fragBombWeight) {
    Math.random() > 0.4
      ? drone.addFragBomb()
      : Math.random() > 0.15
      ? drone.addHEBomb()
      : drone.addShapedBomb();
  }
});
