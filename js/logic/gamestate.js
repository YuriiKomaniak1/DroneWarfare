import { SmallDrone } from "../drones/drones.js";
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
  updateDrones(gameData, SmallDrone, MediumDrone, BigDrone) {
    gameData.drones.forEach((drone, index) => {
      if (drone) {
        switch (drone.type) {
          case "small":
            this.drones[index] = new SmallDrone();
            break;
          case "medium":
            this.drones[index] = new MediumDrone();
            break;
          case "big":
            this.drones[index] = new BigDrone();
            break;
        }
      }
    });
  }
  updateData(gameData) {
    this.score = gameData.score;
    this.drones.forEach((drone, index) => {
      if (drone && gameData.drones[index]) {
        drone.bombStorage = gameData.drones[index].bombStorage;
        drone.initialBombStorage = gameData.drones[index].initialBombStorage;
        drone.capacity = gameData.drones[index].capacity;
        drone.remainingCapacity = gameData.drones[index].remainingCapacity;
        drone.hangers = gameData.drones[index].hangers;
        drone.initialHangers = gameData.drones[index].initialHangers;
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
      hangers: drone.hangers,
      initialHangers: drone.initialHangers,
      type: drone.type,
    };
  }
}

class GameData {
  constructor() {
    this.score = 59600;
    this.currentMission = "mission1";
    this.drones = [];
    this.mediumDroneAvailable = false;
    this.bigDroneAvailable = false;
    this.slot4Available = false;
    this.slot5Available = false;
    this.footMineAvailable = false;
    this.tankMineAvailable = false;
    this.magnetMineAvailable = false;
    this.shrapnelMineAvailable = false;
    this.clusterBombAvailable = false;
    this.upgradeGap = 0;
    this.gapScale = 500;
  }
}

const drones = [
  new SmallDrone(),
  new SmallDrone(),
  new SmallDrone(),
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
          Math.min(FragBomb.weight, HeBomb.weight, ShapedBomb.weight) &&
        drone.hangers >= 1
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
      gameData.drones[index].hangers = drone.hangers;
      gameData.drones[index].initialHangers = drone.initialHangers;
      gameData.drones[index].type = "small";
    }
  });

  localStorage.setItem("gameData", JSON.stringify(gameData));
}
