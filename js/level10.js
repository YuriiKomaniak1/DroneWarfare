import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";
import { MTLBKPVT, KPVT, Crate } from "./enemies/vehicle.js";

const gameData = JSON.parse(localStorage.getItem("gameData"));
let enemies = [];
let vehicles = [];
gameData.looseScore = 1000;
gameData.initialLooseScore = 1000;
gameData.winScore = 4000;
gameData.initialWinScore = 4000;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level10/obstacles.json");
  const response2 = await fetch("js/levels/level10/obstacles.json");
  const response3 = await fetch("js/levels/level10/bombObstacles.json");
  const response4 = await fetch("js/levels/level10/trenches.json");
  const response5 = await fetch("js/levels/level10/covers.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = await response2.json();
  gameData.bombObstacles = await response3.json();
  gameData.trenches = await response4.json();
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
layerBottom.src = "assets/img/grounds/level6bottom.png";
const layerTop = new Image();
layerTop.src = "assets/img/grounds/level6top.png";
const layer1 = new Layer(layerBottom, canvas, 2500, 2500, ctx, 180);
const layer2 = new Layer(layerTop, canvas, 2500, 2500, ctx, 180);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

gameData.timer.startTime = Date.now();
gameData.timer.totalTime = 8;

enemy(1, 0, 0, 569, 1332);
enemy(0, 1, 0, 606, 1354);
enemy(1, 0, 0, 644, 1377);
enemy(1, 0, 0, 749, 1415);
enemy(0, 1, 0, 794, 1417);
enemy(1, 0, 0, 836, 1414);
enemy(1, 0, 0, 928, 1416);
enemy(0, 1, 0, 967, 1416);
enemy(1, 0, 0, 1011, 1417);
enemy(1, 0, 0, 1112, 1414);
enemy(0, 1, 0, 1155, 1413);
enemy(1, 0, 0, 1158, 1378);
enemy(1, 0, 0, 1357, 1250);
enemy(0, 1, 0, 1362, 1286);
enemy(1, 0, 0, 1402, 1289);
enemy(1, 0, 0, 1483, 1280);
enemy(0, 1, 0, 1531, 1267);
enemy(1, 0, 0, 1578, 1250);
enemy(1, 0, 0, 1662, 1218);
enemy(0, 1, 0, 1720, 1218);
enemy(1, 0, 0, 1756, 1218);
enemy(1, 0, 0, 1850, 1162);
enemy(0, 1, 0, 1875, 1135);
enemy(1, 0, 0, 1909, 1103);
enemy(1, 0, 0, 606, 1169);
enemy(0, 1, 0, 674, 1171);
enemy(1, 0, 0, 842, 1177);
enemy(1, 0, 0, 957, 1177);
enemy(0, 1, 0, 1095, 1173);
enemy(1, 0, 0, 1170, 1172);
enemy(1, 0, 0, 1170, 1105);
enemy(0, 1, 0, 1410, 1089);
enemy(1, 0, 0, 1338, 1087);
enemy(1, 0, 0, 1334, 1022);
enemy(0, 1, 0, 1514, 998);
enemy(1, 0, 0, 1625, 998);
enemy(1, 0, 0, 1769, 955);
enemy(0, 1, 0, 1827, 924);
enemy(1, 0, 0, 1832, 882);

const gunWaypoints1 = [
  { x: 835, y: 1030 },
  { x: 0, y: 0 },
];
addVehicle(Crate, gunWaypoints1, 0, 0, 0);
const gunWaypoints2 = [
  { x: 973, y: 1030 },
  { x: 0, y: 0 },
];
addVehicle(Crate, gunWaypoints2, 0, 0, 0);
const gunWaypoints3 = [
  { x: 1351, y: 900 },
  { x: 0, y: 0 },
];
addVehicle(Crate, gunWaypoints3, 0, 0, 0);
const gunWaypoints4 = [
  { x: 1472, y: 868 },
  { x: 0, y: 0 },
];
addVehicle(Crate, gunWaypoints4, 0, 0, 0);

const gunWaypoints5 = [
  { x: 754, y: 924 },
  { x: 0, y: 0 },
];
addVehicle(KPVT, gunWaypoints5, 0, 0, 0);
const gunWaypoints6 = [
  { x: 1154, y: 756 },
  { x: 0, y: 0 },
];
addVehicle(KPVT, gunWaypoints6, 0, 0, 0);
const gunWaypoints7 = [
  { x: 1641, y: 775 },
  { x: 0, y: 0 },
];
addVehicle(KPVT, gunWaypoints7, 0, 0, 0);

const waypoints = [
  { x: 18, y: 513 },
  { x: 19, y: 513 },
  { x: 2185, y: 571 },
  { x: 2157, y: 1527 },
  { x: 217, y: 1561 },
  { x: 556, y: 595 },
  { x: 1932, y: 561 },
  { x: 2133, y: 1363 },
  { x: 339, y: 1629 },
  { x: 473, y: 642 },
  { x: 2185, y: 571 },
  { x: 2157, y: 1527 },
  { x: 217, y: 1561 },
  { x: 556, y: 595 },
  { x: 1932, y: 561 },
  { x: 2133, y: 1363 },
  { x: 339, y: 1629 },
  { x: 473, y: 642 },
  { x: 2185, y: 571 },
  { x: 2157, y: 1527 },
  { x: 217, y: 1561 },
  { x: 556, y: 595 },
  { x: 1932, y: 561 },
  { x: 2133, y: 1363 },
  { x: 339, y: 1629 },
  { x: 473, y: 642 },
  { x: 0, y: 0 },
];

setTimeout(() => {
  addVehicle(MTLBKPVT, waypoints, 2, 0, 0);
}, 1000);
setTimeout(() => {
  addVehicle(MTLBKPVT, waypoints, 2, 0, 0);
}, 41000);
setTimeout(() => {
  addVehicle(MTLBKPVT, waypoints, 2, 0, 0);
  enemies.forEach((enemy) => {
    enemy.winScore = 0;
    enemy.looseScore = 0;
  });
}, 81000);
console.log(vehicles);
// функція створення юнітів
function enemy(riflemans, mashinegunners, grenadiers, StartX, StartY) {
  const waypoints = [
    { x: StartX, y: StartY },
    { x: 0, y: 0 },
  ];
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

  squad.forEach((enemy) => {
    enemy.static = true;
    enemy.winScore = 0;
  });

  enemies.push(...squad);
}

//функція створення техніки
function addVehicle(Class, waypoints, riflemans, mashinegunners, grenadiers) {
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
  if (vehicle.static) vehicle.protected = true;
  if (vehicle.type !== "crate") vehicle.winScore = 0;
  vehicle.speed = 0.4;
  vehicle.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, 0);
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
    let timeLimitExceeded = false;
    if (gameData.timer) {
      timeLimitExceeded =
        gameData.timer.totalTime &&
        Date.now() - gameData.timer.startTime >
          gameData.timer.totalTime * 60 * 1000;
    }

    return allDronesDead || scoreTooLow || timeLimitExceeded;
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
