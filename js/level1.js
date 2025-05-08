import { Layer } from "./layers/layer.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 500;
gameData.initialLooseScore = 500;
gameData.winScore = 1500;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 10000);

async function loadObstacles() {
  const response = await fetch("js/levels/level1/obstacles.json");
  const response2 = await fetch("js/levels/level1/bombObstacles.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = [...gameData.obstacles];
  gameData.bombObstacles = await response2.json();
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
await loadObstacles();

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);

initUIControls({
  canvas,
  gameData,
  training: false, // НЕ тренування
});

const layerBottom = new Image();
layerBottom.src = "assets/img/grounds/level1bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level1top.png";
const layer1 = new Layer(layerBottom, canvas, 2000, 3000, ctx);
const layer2 = new Layer(layerTop, canvas, 2000, 3000, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

function createEnemySquad(riflemans, mashinegunners, grenadiers, main = true) {
  const randomX = Math.random() * 1300 - 650;
  const startX = 1000 + randomX;
  let waypoints = [];

  if (main) {
    const startX = 1000 + randomX;
    waypoints = [
      { x: 450 + (Math.random() * 400 - 200), y: 800 },
      {
        x: 450 + (Math.random() * 400 - 200),
        y: 1500 + (Math.random() * 100 - 50),
      },
      {
        x: 450 + (Math.random() * 400 - 200),
        y: 2200 + (Math.random() * 100 - 50),
      },
      {
        x: 450 + (Math.random() * 400 - 200),
        y: 2600 + (Math.random() * 100 - 50),
      },
      { x: 450 + (Math.random() * 400 - 200), y: 3000 },
    ];
  } else {
    const startX = Math.random() * 1500 + 400;
    waypoints = [{ x: startX, y: 3000 }];
  }
  const squad = createRifleSquad(
    startX,
    60,
    Math.random() * 250 + 50,
    50,
    layer1,
    ctx,
    navGrid,
    waypoints,
    riflemans,
    mashinegunners,
    grenadiers,
    0
  );
  enemies.push(...squad);
}
createEnemySquad(3, 1, 1);
setTimeout(() => {
  createEnemySquad(3, 1, 1);
}, 6000);
setTimeout(() => {
  createEnemySquad(3, 1, 0);
}, 12000);

setTimeout(() => {
  createEnemySquad(3, 1, 1);
}, 18000);
setTimeout(() => {
  createEnemySquad(3, 1, 0);
}, 25000);
setTimeout(() => {
  createEnemySquad(1, 1, 0, false);
}, Math.random() * 10000);
setTimeout(() => {
  createEnemySquad(2, 0, 0, false);
}, Math.random() * 10000);
setTimeout(() => {
  createEnemySquad(2, 1, 0, false);
}, Math.random() * 10000);

const winLoseConditions = {
  win: (gameState, gameData, enemies, vehicles) => {
    return gameData.winScore <= 0;
  },
  lose: (gameState, gameData, enemies, vehicles) => {
    const allDronesDead = gameState.drones.every(
      (drone) => !drone || !drone.isAlive
    );
    const scoreTooLow = gameData.looseScore <= 0;

    return allDronesDead || scoreTooLow;
  },
};

createAnimationLoop(
  canvas,
  layer1,
  layer2,
  ctx,
  enemies,
  vehicles,
  winLoseConditions,
  gameData,
  condition,
  false
);
