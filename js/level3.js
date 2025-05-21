import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { BMP1, Guntruck, Tigr, MTLB } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 758;
gameData.initialLooseScore = 758;
gameData.winScore = 3032;
gameData.initialWinScore = 3032;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level3/obstacles.json");
  const response2 = await fetch("js/levels/level3/obstacles.json");
  const response3 = await fetch("js/levels/level3/bombObstacles.json");
  const response4 = await fetch("js/levels/level3/covers.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = await response2.json();
  gameData.bombObstacles = await response3.json();
  gameData.covers = await response4.json();
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
layerBottom.src = "assets/img/grounds/level3bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level3top.png";
const layer1 = new Layer(layerBottom, canvas, 1800, 3000, ctx);
const layer2 = new Layer(layerTop, canvas, 1800, 3000, ctx);
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
    300,
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
createEnemySquad(4, 1, 1, 450);
createEnemySquad(4, 1, 1, 900);
createEnemySquad(4, 1, 1, 1350);
setTimeout(() => {
  addVehicle(Tigr, 750, 1, 0, 0);
}, 8500);
setTimeout(() => {
  addVehicle(BMP1, 400, 0, 0, 0, 2);
}, 6500);
setTimeout(() => {
  addVehicle(BMP1, 1400, 0, 0, 0, 2);
}, 7000);
setTimeout(() => {
  addVehicle(Guntruck, 1150, 1, 0, 0, 0);
}, 9000);
setTimeout(() => {
  addVehicle(MTLB, 900, 0, 0, 0, 2);
}, 6000);

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
