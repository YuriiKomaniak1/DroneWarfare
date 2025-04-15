import { createSmallDrone } from "./drones.js";
import { FragBomb, HeBomb, ShapedBomb } from "./bomb.js";
import { basePath } from "../utils/basePath.js";
let smallDroneImage = new Image();
smallDroneImage.src = `${basePath}assets/img/drones/smallDroneAnimation.png`;

let drone1 = createSmallDrone();
let drone2 = createSmallDrone();
let drone3 = createSmallDrone();
let drone4 = createSmallDrone();
let drone5 = createSmallDrone();
export let drones = [drone1, drone2, drone3, drone4, drone5];

drones.forEach((drone) => {
  while (
    drone.remainingCapacity >=
    Math.min(FragBomb.weight, HeBomb.weight, ShapedBomb.weight)
  ) {
    Math.random() > 0.5
      ? drone.addBomb(FragBomb)
      : Math.random() > 0.4
      ? drone.addBomb(HeBomb)
      : drone.addBomb(ShapedBomb);
  }
  drone.initialBombStorage = {
    frag: [...drone.bombStorage.frag],
    he: [...drone.bombStorage.he],
    shaped: [...drone.bombStorage.shaped],
  };
});
