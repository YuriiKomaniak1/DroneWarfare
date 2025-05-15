import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { BMP2, BMP1, Guntruck, Tigr } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
let enemies = [];
let vehicles = [];
gameData.looseScore = 1000;
gameData.initialLooseScore = 800;
gameData.winScore = 2800;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 60000);

async function loadObstacles() {
  const response = await fetch("js/levels/level5/obstacles.json");
  const response2 = await fetch("js/levels/level5/obstacles.json");
  const response3 = await fetch("js/levels/level5/bombObstacles.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = await response2.json();
  gameData.bombObstacles = await response3.json();
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
layerBottom.src = "assets/img/grounds/level5bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level5top.png";
const layer1 = new Layer(layerBottom, canvas, 2000, 3500, ctx);
const layer2 = new Layer(layerTop, canvas, 2000, 3500, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

setTimeout(() => {
  addVehicle(Tigr, 350, 1, 1, 0);
}, 8500);

setTimeout(() => {
  addVehicle(Guntruck, 1200, 1, 0, 0, 0);
}, 19000);

setTimeout(() => {
  addVehicle(Tigr, 1650, 1, 1, 0);
}, 12500);

addVehicle(BMP2, 500, 4, 1, 1, 2);

setTimeout(() => {
  addVehicle(BMP1, 1000, 4, 1, 1, 2);
}, 6000);

setTimeout(() => {
  addVehicle(BMP2, 1500, 4, 1, 1, 2);
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
    { x: startX, y: 3500 },
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
  addedFunction(vehicles) {},
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
