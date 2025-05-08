import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { Gaz66, Ural, BMP1, Guntruck, Tigr, MTLB } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 800;
gameData.initialLooseScore = 800;
gameData.winScore = 2500;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 60000);

async function loadObstacles() {
  const response = await fetch("js/levels/level2/obstacles.json");
  const response2 = await fetch("js/levels/level2/bigObstacles.json");
  const response3 = await fetch("js/levels/level2/bombObstacles.json");
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
layerBottom.src = "assets/img/grounds/level2bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level2top.png";
const layer1 = new Layer(layerBottom, canvas, 1800, 3400, ctx);
const layer2 = new Layer(layerTop, canvas, 1800, 3400, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

let rightWaypoints = [
  { x: 0, y: 220 },
  { x: 1, y: 221 },
  { x: 1350, y: 1407 },
  { x: 1360, y: 3400 },
];

addVehicle(MTLB, rightWaypoints, 6, 1, 1, 2);

setTimeout(() => {
  addVehicle(Tigr, rightWaypoints, 3, 1, 0);
}, 6500);
setTimeout(() => {
  addVehicle(Ural, rightWaypoints, 7, 2, 1);
}, 13000);
setTimeout(() => {
  addVehicle(Guntruck, rightWaypoints, 1, 0, 0);
}, 19500);
setTimeout(() => {
  addVehicle(Gaz66, rightWaypoints, 6, 2, 2);
}, 25000);

function addVehicle(
  Class,
  waypoints,
  riflemans,
  mashinegunners,
  grenadiers,
  crew
) {
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
  vehicle.speed = 0.3;
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
