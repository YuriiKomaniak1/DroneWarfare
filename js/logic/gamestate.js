import { SmallDrone } from "../drones/drones.js";
import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";

class GameState {
  constructor() {
    this.drones = [];
  }
  drawScore(ctx, canvas, gameData) {
    const fontSize = 14;
    const text = `SCORE: ${gameData.score}`;
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

    if (gameData.timer && gameData.timer.startTime) {
      // 🕒 Зворотній таймер
      const totalTime = gameData.timer.totalTime * 60 * 1000; // 10 хв у мс
      const elapsed = Date.now() - gameData.timer.startTime;
      const remaining = Math.max(0, totalTime - elapsed);

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      const timeText = `TIME: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      ctx.strokeText(timeText, centerX, paddingTop + 22);
      ctx.fillText(timeText, centerX, paddingTop + 22);
    }
    ctx.restore();
  }

  updateDrones(gameData, SmallDrone, MediumDrone, BigDrone) {
    gameData.drones.forEach((drone, index) => {
      if (drone) {
        switch (drone.type) {
          case "small":
            this.drones[index] = new SmallDrone(gameData);
            break;
          case "medium":
            this.drones[index] = new MediumDrone(gameData);
            break;
          case "big":
            this.drones[index] = new BigDrone(gameData);
            break;
        }
      }
    });
  }
  updateData(gameData) {
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
    this.score = 60000;
    this.looseScore = 1000;
    this.winScore = 1000;
    this.initialLooseScore = 0;
    this.initialWinScore = 0;
    this.currentMission = 13;
    this.drones = [];
    this.obstacles = [];
    this.bigObstacles = [];
    this.bombObstacles = [];
    this.mediumDroneAvailable = false;
    this.bigDroneAvailable = false;
    this.slot4Available = false;
    this.slot5Available = false;
    this.footMineAvailable = false;
    this.tankMineAvailable = false;
    this.magnetMineAvailable = false;
    this.shrapnelMineAvailable = false;
    this.clusterBombAvailable = false;
    this.shapedClusterBombAvailable = false;
    this.smallDroneSpeedUpgrade = 0;
    this.mediumDroneSpeedUpgrade = 0;
    this.bigDroneSpeedUpgrade = 0;
    this.smallDroneCapacityUpgrade = 0;
    this.mediumDroneCapacityUpgrade = 0;
    this.bigDroneCapacityUpgrade = 0;
    this.smallDroneHPUpgrade = 0;
    this.mediumDroneHPUpgrade = 0;
    this.bigDroneHPUpgrade = 0;
    this.fragBombUpgrade = 0;
    this.heBombUpgrade = 0;
    this.shapedBombUpgrade = 0;
    this.footMinebUpgrade = 0;
    this.tankMineUpgrade = 0;
    this.magnetMineUpgrade = 0;
    this.shrapnelBombUpgrade = 0;
    this.clusterBombUpgrade = 0;
    this.shapedClusterBombUpgrade = 0;
    this.upgradeGap = 0;
    this.gapScale = 250;
    this.trenches = null;
    this.covers = null;
    this.timer = { startTime: null, totalTime: null };
  }
}
export const gameData = new GameData();
const drones = [
  new SmallDrone(gameData),
  new SmallDrone(gameData),
  new SmallDrone(gameData),
  null,
  null,
];
export const gameState = new GameState();

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

function cloneDataDrone(sourceDrone) {
  return {
    type: sourceDrone.type,
    capacity: sourceDrone.capacity,
    remainingCapacity: sourceDrone.remainingCapacity,
    hangers: sourceDrone.hangers,
    bombStorage: sourceDrone.cloneBombStorage(sourceDrone.bombStorage),
    initialBombStorage: sourceDrone.cloneBombStorage(sourceDrone.bombStorage),
    hp: sourceDrone.hp,
    initialHP: sourceDrone.initialHP,
  };
}
