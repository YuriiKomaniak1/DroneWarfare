import { Layer } from "./layers/layer.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initUIControls } from "./logic/uicontrols.js";

const gameData = JSON.parse(localStorage.getItem("gameData"));
let enemies = [];
let vehicles = [];
gameData.looseScore = 50;
gameData.initialLooseScore = 50;
gameData.winScore = 2900;
gameData.initialWinScore = 2900;

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 20000);

async function loadObstacles() {
  const response = await fetch("js/levels/level6/obstacles.json");
  const response2 = await fetch("js/levels/level6/obstacles.json");
  const response3 = await fetch("js/levels/level6/bombObstacles.json");
  const response4 = await fetch("js/levels/level6/trenches.json");
  const response5 = await fetch("js/levels/level6/covers.json");
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
const layer1 = new Layer(layerBottom, canvas, 2500, 2500, ctx);
const layer2 = new Layer(layerTop, canvas, 2500, 2500, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);

gameData.timer.startTime = Date.now();
gameData.timer.totalTime = 6;
// -------- зправа---------
const wa1 = [
  { x: 2466, y: 821 },
  { x: 1880, y: 1367 },
  { x: 0, y: 0 },
];
enemy(1, 0, 0, wa1);

const wa2 = [
  { x: 2466, y: 750 },
  { x: 1880, y: 1340 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa2);
}, 3500);

const wa3 = [
  { x: 2466, y: 700 },
  { x: 1840, y: 1325 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa3);
}, 7000);

const wa4 = [
  { x: 2466, y: 750 },
  { x: 1535, y: 1320 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa4);
}, 10500);

const wa5 = [
  { x: 2466, y: 700 },
  { x: 1650, y: 1320 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa5);
}, 14000);

const wa6 = [
  { x: 2466, y: 700 },
  { x: 1806, y: 1325 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa6);
}, 17500);

const wa7 = [
  { x: 2466, y: 650 },
  { x: 1480, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa7);
}, 21000);

const wa8 = [
  { x: 2466, y: 600 },
  { x: 1525, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa8);
}, 24500);

const wa9 = [
  { x: 2466, y: 550 },
  { x: 1570, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa9);
}, 28000);

const wa10 = [
  { x: 2466, y: 650 },
  { x: 1650, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa10);
}, 31500);

const wa11 = [
  { x: 2466, y: 600 },
  { x: 1700, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa11);
}, 35000);

const wa12 = [
  { x: 2466, y: 550 },
  { x: 1750, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa12);
}, 38500);

const wa13 = [
  { x: 2466, y: 821 },
  { x: 1848, y: 1118 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa13);
}, 42000);

const wa14 = [
  { x: 2466, y: 750 },
  { x: 1881, y: 1137 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa14);
}, 45500);

const wa15 = [
  { x: 2466, y: 700 },
  { x: 1923, y: 1160 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa15);
}, 49000);

const wa37 = [
  { x: 2466, y: 650 },
  { x: 1330, y: 1400 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa37);
}, 52500);

const wa38 = [
  { x: 2466, y: 600 },
  { x: 1335, y: 1330 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa38);
}, 56000);

const wa39 = [
  { x: 2466, y: 550 },
  { x: 1404, y: 1323 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa39);
}, 59500);

const wa40 = [
  { x: 2466, y: 821 },
  { x: 1387, y: 1085 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa40);
}, 63000);

const wa41 = [
  { x: 2466, y: 750 },
  { x: 1344, y: 1088 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa41);
}, 66500);

const wa42 = [
  { x: 2466, y: 700 },
  { x: 1342, y: 1127 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa42);
}, 70000);

// ----- зліва---------
const wa16 = [
  { x: 50, y: 821 },
  { x: 985, y: 1500 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa16);
}, 13500);

const wa17 = [
  { x: 50, y: 750 },
  { x: 870, y: 1500 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa17);
}, 17000);

const wa18 = [
  { x: 50, y: 700 },
  { x: 729, y: 1548 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa18);
}, 20500);

const wa19 = [
  { x: 50, y: 750 },
  { x: 667, y: 1575 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa19);
}, 24000);

const wa20 = [
  { x: 50, y: 700 },
  { x: 667, y: 1616 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa20);
}, 27500);

const wa21 = [
  { x: 50, y: 700 },
  { x: 1018, y: 1214 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa21);
}, 31000);

const wa22 = [
  { x: 50, y: 650 },
  { x: 988, y: 1232 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa22);
}, 34500);

const wa23 = [
  { x: 50, y: 600 },
  { x: 950, y: 1244 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa23);
}, 38000);

const wa24 = [
  { x: 50, y: 550 },
  { x: 913, y: 1250 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa24);
}, 41500);

const wa25 = [
  { x: 50, y: 650 },
  { x: 840, y: 1284 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa25);
}, 45000);

const wa26 = [
  { x: 50, y: 600 },
  { x: 793, y: 1283 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa26);
}, 48500);

const wa27 = [
  { x: 50, y: 550 },
  { x: 742, y: 1284 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa27);
}, 52000);

const wa28 = [
  { x: 50, y: 821 },
  { x: 652, y: 1341 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa28);
}, 55500);

const wa29 = [
  { x: 50, y: 750 },
  { x: 620, y: 1374 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa29);
}, 59000);

const wa30 = [
  { x: 50, y: 700 },
  { x: 573, y: 1415 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa30);
}, 62500);

const wa31 = [
  { x: 50, y: 650 },
  { x: 1162, y: 1475 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa31);
}, 66000);

const wa32 = [
  { x: 50, y: 600 },
  { x: 1162, y: 1412 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa32);
}, 69500);

const wa33 = [
  { x: 50, y: 550 },
  { x: 1095, y: 1412 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 0, 1, wa33);
}, 73000);

const wa34 = [
  { x: 50, y: 821 },
  { x: 1146, y: 1251 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa34);
}, 76500);

const wa35 = [
  { x: 50, y: 750 },
  { x: 1143, y: 1217 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(0, 1, 0, wa35);
}, 70000);

const wa36 = [
  { x: 50, y: 700 },
  { x: 1096, y: 1211 },
  { x: 0, y: 0 },
];
setTimeout(() => {
  enemy(1, 0, 0, wa36);
}, 83500);

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
