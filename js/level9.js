import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { BTR82, BMP2, MTLBKPVT } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 1180;
gameData.initialLooseScore = 1180;
gameData.winScore = 4700;
gameData.initialWinScore = 4700;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level2/obstacles.json");
  const response2 = await fetch("js/levels/level2/obstacles.json");
  const response3 = await fetch("js/levels/level2/bombObstacles.json");
  const response5 = await fetch("js/levels/level2/covers.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = await response2.json();
  gameData.bombObstacles = await response3.json();
  gameData.trenches = null;
  gameData.covers = await response5.json();
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
layerBottom.src = "assets/img/grounds/level2bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level2top.png";
const layer1 = new Layer(layerBottom, canvas, 1800, 3400, ctx);
const layer2 = new Layer(layerTop, canvas, 1800, 3400, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

setTimeout(() => {
  addVehicle(MTLBKPVT, 350, 0, 0, 2);
}, 8500);

setTimeout(() => {
  addVehicle(BTR82, 1200, 4, 1, 1, 1);
}, 19000);

setTimeout(() => {
  addVehicle(MTLBKPVT, 1550, 0, 0, 2);
}, 12500);

addVehicle(BMP2, 500, 4, 1, 1, 2);

setTimeout(() => {
  addVehicle(BTR82, 1000, 4, 1, 1, 2);
}, 6000);

setTimeout(() => {
  addVehicle(BMP2, 1400, 4, 1, 1, 2);
}, 14000);

function addVehicle(
  Class,
  startX,
  riflemans,
  mashinegunners,
  grenadiers,
  crew
) {
  let waypoints = [
    { x: startX, y: 50 },
    { x: startX, y: 101 },
    { x: startX, y: 1000 },
    { x: startX, y: 3400 },
  ];
  let vehicle = new Class(
    waypoints[0].x,
    waypoints[0].y,
    layer1,
    ctx,
    waypoints,
    vehicleNavGrid
  );
  // === Шукаємо шлях один раз при створенні ===
  vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
  vehicle.currentPathIndex = 0;
  vehicle.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, crew);
  vehicles.push(vehicle);
}

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
  addedFunction(vehicles, enemies) {},
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
