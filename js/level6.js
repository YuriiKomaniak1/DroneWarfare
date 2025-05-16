import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";

const gameData = JSON.parse(localStorage.getItem("gameData"));
let enemies = [];
let vehicles = [];
gameData.looseScore = 50;
gameData.initialLooseScore = 800;
gameData.winScore = 2000;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 60000);

async function loadObstacles() {
  const response = await fetch("js/levels/level6/obstacles.json");
  const response2 = await fetch("js/levels/level6/obstacles.json");
  const response3 = await fetch("js/levels/level6/bombObstacles.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = await response2.json();
  gameData.bombObstacles = await response3.json();
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
await loadObstacles();

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 1500);
canvas.height = Math.min(window.innerHeight, 2000);

initUIControls({
  canvas,
  gameData,
  training: false, // НЕ тренування
});

const layerBottom = new Image();
layerBottom.src = "assets/img/grounds/level6bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level6top.png";
const layer1 = new Layer(layerBottom, canvas, 2500, 2500, ctx);
const layer2 = new Layer(layerTop, canvas, 2500, 2500, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

const wa1 = [
  { x: 2466, y: 821 },
  { x: 1899, y: 1367 },
  { x: 0, y: 0 },
];
enemy(1, 0, 0, wa1);

// функція створення юнітів
function enemy(riflemans, mashinegunners, grenadiers, waypoints) {
  const squad = createRifleSquad(
    0,
    0,
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
console.log(enemies);
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
  addedFunction(vehicles, enemies) {
    enemies.forEach((enemy) => {
      if (enemy.currentWaypointIndex === 2) enemy.static = true;
    });
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
