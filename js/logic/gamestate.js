import { createSmallDrone } from "../drones/drones.js";
import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";

class GameState {
  constructor() {
    this.score = 0;
    this.drones = [];
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
  updateData(gameData) {
    this.score = gameData.score;
    this.drones.forEach((drone, index) => {
      if (drone && gameData.drones[index]) {
        drone.bombStorage = gameData.drones[index].bombStorage;
        drone.initialBombStorage = gameData.drones[index].initialBombStorage;
        drone.capacity = gameData.drones[index].capacity;
        drone.remainingCapacity = gameData.drones[index].remainingCapacity;
      }
    });
  }
  rememberDrone(gameData, index) {
    const drone = this.drones[index];
    if (!drone) return; // 💡 Якщо дрона немає, нічого не робимо

    gameData.drones[index] = {
      bombStorage: drone.bombStorage,
      initialBombStorage: drone.initialBombStorage,
      capacity: drone.capacity,
      remainingCapacity: drone.remainingCapacity,
    };
  }
}

class GameData {
  constructor() {
    this.score = 0;
    this.currentMission = "mission1";
    this.drones = [];
    this.mediumDroneAvailable = false;
    this.bigDroneAvailable = false;
  }
}
const drones = [
  createSmallDrone(),
  createSmallDrone(),
  createSmallDrone(),
  null,
  null,
];
export const gameState = new GameState();
export const gameData = new GameData();
const saved = localStorage.getItem("gameData");

if (saved) {
  const parsedData = JSON.parse(saved);
  drones.forEach((drone, index) => {
    gameState.drones[index] = drone;
  });

  // Тепер оновлюємо дані з локального сховища
  gameState.updateData(parsedData);
} else {
  drones.forEach((drone, index) => {
    if (drone && Object.values(drone.bombStorage).flat().length === 0) {
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
      gameState.drones[index] = drone;
      if (!gameData.drones[index]) {
        gameData.drones[index] = {};
      }
      gameData.drones[index].bombStorage = drone.bombStorage;
      gameData.drones[index].initialBombStorage = drone.initialBombStorage;
      gameData.drones[index].capacity = drone.capacity;
      gameData.drones[index].remainingCapacity = drone.remainingCapacity;
    }
  });

  localStorage.setItem("gameData", JSON.stringify(gameData));
}
