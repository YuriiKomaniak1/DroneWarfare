import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { BMP3, BMP2, BTR82, MTLBKPVT } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 1338;
gameData.initialLooseScore = 1338;
gameData.winScore = 5352;
gameData.initialWinScore = 5352;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level1/obstacles.json");
  const response2 = await fetch("js/levels/level1/bombObstacles.json");
  const response5 = await fetch("js/levels/level1/covers.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = [...gameData.obstacles];
  gameData.bombObstacles = await response2.json();
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
layerBottom.src = "assets/img/grounds/level1bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level1top.png";
const layer1 = new Layer(layerBottom, canvas, 2000, 3000, ctx);
const layer2 = new Layer(layerTop, canvas, 2000, 3000, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

function createEnemySquad(riflemans, mashinegunners, grenadiers, startX) {
  let waypoints = [];
  waypoints = [
    { x: startX, y: 60 },
    { x: startX + Math.random() * 200 - 100, y: 1500 },
    { x: startX + Math.random() * 200 - 100, y: 3000 },
  ];

  const squad = createRifleSquad(
    400,
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
createEnemySquad(7, 2, 1, 500);
createEnemySquad(7, 2, 1, 1000);
createEnemySquad(7, 2, 1, 1500);

setTimeout(() => {
  addVehicle(MTLBKPVT, 750, 2, 0, 0);
}, 8500);
setTimeout(() => {
  addVehicle(BMP3, 400, 0, 0, 0, 2);
}, 6500);

setTimeout(() => {
  addVehicle(BTR82, 1000, 0, 0, 0, 1);
}, 6000);
setTimeout(() => {
  addVehicle(BMP2, 1150, 1, 0, 0, 0);
}, 9000);
setTimeout(() => {
  addVehicle(BTR82, 1000, 0, 0, 0, 1);
}, 6000);

setTimeout(() => {
  addVehicle(BMP3, 1600, 0, 0, 0, 2);
}, 7000);
setTimeout(() => {
  addVehicle(MTLBKPVT, 1750, 2, 0, 0);
}, 8500);

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
    { x: startX, y: 3000 },
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
  vehicle.speed = 0.18;
  vehicle.currentPathIndex = 0;
  vehicle.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, crew);
  vehicles.push(vehicle);
}
console.log(enemies, vehicles);
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
