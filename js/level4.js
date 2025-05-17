import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { Guntruck, Tigr, Jeep, UAZ452 } from "./enemies/vehicle.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));

let enemies = [];
let vehicles = [];
gameData.looseScore = 600;
gameData.initialLooseScore = 600;
gameData.winScore = 2000;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level4/obstacles.json");
  const response2 = await fetch("js/levels/level4/bigObstacles.json");
  const response3 = await fetch("js/levels/level4/bombObstacles.json");
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
layerBottom.src = "assets/img/grounds/level4bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level4top.png";
const layer1 = new Layer(layerBottom, canvas, 3000, 3000, ctx);
const layer2 = new Layer(layerTop, canvas, 3000, 3000, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

const waypoints1 = [
  { x: 65, y: 60 },
  { x: 65, y: 61 },
  { x: 65, y: 1780 },
  { x: 990, y: 1780 },
  { x: 1275, y: 0 },
];
const waypoints2 = [
  { x: 65, y: 60 },
  { x: 65, y: 61 },
  { x: 65, y: 1000 },
  { x: 950, y: 1360 },
  { x: 950, y: 0 },
];
const waypoints3 = [
  { x: 2900, y: 60 },
  { x: 2900, y: 61 },
  { x: 2900, y: 1780 },
  { x: 1950, y: 1780 },
  { x: 1275, y: 0 },
];
const waypoints4 = [
  { x: 2900, y: 60 },
  { x: 2900, y: 61 },
  { x: 2900, y: 1000 },
  { x: 1990, y: 1450 },
  { x: 1700, y: 0 },
];
const waypoints5 = [
  { x: 1275, y: 60 },
  { x: 1275, y: 61 },
  { x: 1275, y: 1000 },
  { x: 1275, y: 1450 },
  { x: 1275, y: 0 },
];
const waypoints6 = [
  { x: 65, y: 60 },
  { x: 65, y: 61 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 65, y: 1359 },
  { x: 2600, y: 1359 },
  { x: 1275, y: 0 },
];
setTimeout(() => {
  addVehicle(Tigr, waypoints1, 2, 1, 1, 0);
}, 15000);
setTimeout(() => {
  addVehicle(Jeep, waypoints2, 2, 1, 0);
}, 30000);
setTimeout(() => {
  addVehicle(Guntruck, waypoints6, 0, 0, 0);
}, 40000);

addVehicle(UAZ452, waypoints5, 2, 1, 1, 0);

setTimeout(() => {
  addVehicle(UAZ452, waypoints3, 2, 1, 1, 0);
}, 45000);
setTimeout(() => {
  addVehicle(Jeep, waypoints4, 2, 1, 0);
}, 60000);

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
  vehicle.currentPathIndex = 0;
  vehicle.looseScore = 0;
  vehicle.bailOutX = 1450;
  vehicle.bailOutY = 1650;
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

  addedFunction(vehicles, enemies) {
    vehicles.forEach((vehicle) => {
      if (vehicle.currentWaypointIndex === 4)
        vehicle.disembark(1450, 1650, navGrid);
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
