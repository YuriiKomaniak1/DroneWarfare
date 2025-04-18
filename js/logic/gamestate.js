import { createSmallDrone } from "../drones/drones.js";
import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";

class GameState {
  constructor() {
    this.score = 0;
    this.currentMission = "mission1";
  }
  drawScore(ctx, canvas) {
    const fontSize = 18;
    const text = `SCORE: ${this.score}`;
    ctx.save();
    ctx.font = `${fontSize}px "Press Start 2P", "Pixelify Sans", monospace`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const centerX = canvas.width / 2;
    const paddingTop = 20;
    ctx.strokeText(text, centerX, paddingTop);
    ctx.fillText(text, centerX, paddingTop);
    ctx.restore();
  }
}

export const gameState = new GameState();

const drone1 = createSmallDrone();
const drone2 = createSmallDrone();
const drone3 = createSmallDrone();
const drone4 = null;
const drone5 = null;
export const drones = [drone1, drone2, drone3, drone4, drone5];
drones.forEach((drone) => {
  if (drone) {
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
  }
});
