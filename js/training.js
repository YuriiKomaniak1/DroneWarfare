import { Layer } from "./layers/layer.js";
import { createRifleSquad } from "./enemies/enemy.js";
import {
  Gaz66,
  Ural,
  BMP2,
  BMP1,
  Guntruck,
  Tigr,
  MTLB,
} from "./enemies/vehicle.js";

import {
  trainingSections,
  updateTrainingText,
} from "./levels/training/trainingInfo.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import {
  handleMenuClick,
  handleMenuHover,
} from "./levels/training/trainingButtons.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
gameData.looseScore = 500000;
gameData.initialLooseScore = 500000;
gameData.winScore = 1500000;
let enemies = [];
let vehicles = [];

const condition = { start: false };
setTimeout(() => {
  condition.start = true;
}, 10000);

async function loadObstacles() {
  const response = await fetch("js/levels/training/obstacles.json");
  const response2 = await fetch("js/levels/training/bombObstacles.json");
  gameData.obstacles = await response.json();
  gameData.bigObstacles = [...gameData.obstacles];
  gameData.bombObstacles = await response2.json();
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
await loadObstacles();

const modal = document.getElementById("modal__greeting");
const startButton = document.getElementById("trainingStartButton");
const trainingModal = document.getElementById("trainingModal");
const trainingText = document.getElementById("trainingText");
const prevSection = document.getElementById("prevSection");
const nextSection = document.getElementById("nextSection");
const resumeGame = document.getElementById("resumeGame");
const hideEnemiesModal = document.getElementById("hideEnemiesModal");
const enemiesModal = document.getElementById("enemiesModal");
const squad = document.getElementById("squad");
const squadTruck = document.getElementById("squadTruck");
const squadBMP = document.getElementById("squadBMP");
const guntruck = document.getElementById("guntruck");
const tigr = document.getElementById("tigr");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);
let currentSection = 0;

const gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";
const trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";
const layer1 = new Layer(gameField, canvas, 1800, 2600, ctx);
const layer2 = new Layer(trees, canvas, 1800, 2600, ctx);
const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
const vehicleNavGrid = new NavigationGrid(layer1, 40, gameData.bigObstacles);
prevSection.addEventListener("click", () => {
  currentSection--;
  if (currentSection < 0) currentSection = 0;
  updateTrainingText(trainingText, currentSection);
});

nextSection.addEventListener("click", () => {
  currentSection++;
  if (currentSection >= trainingSections.length) currentSection = 0;
  updateTrainingText(trainingText, currentSection);
});

hideEnemiesModal.addEventListener("click", () => {
  enemiesModal.style.visibility = "hidden";
});
resumeGame.addEventListener("click", () => {
  trainingModal.style.visibility = "hidden";
});

// Функція відкриття модалки
canvas.addEventListener("mousemove", (e) => handleMenuHover(e, canvas));
canvas.addEventListener("touchmove", (e) => handleMenuHover(e, canvas));
canvas.addEventListener("click", (e) =>
  handleMenuClick(e, canvas, gameData, openTrainingModal)
);
canvas.addEventListener("touchstart", (e) =>
  handleMenuClick(e, canvas, gameData, openTrainingModal)
);
function openTrainingModal() {
  trainingModal.style.visibility = "visible";
  updateTrainingText(trainingText, currentSection);
}
window.addEventListener("load", () => {
  modal.style.visibility = "visible";
});

startButton.addEventListener("click", () => {
  modal.style.visibility = "hidden";
});

let coords = [
  60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140, 1260, 1380, 1500, 1620,
  1740,
];
tigr.addEventListener("click", () => {
  addVehicle(Tigr, 2, 1, 0, 0);
});
guntruck.addEventListener("click", () => {
  addVehicle(Guntruck, 1, 0, 0, 0);
});
squadTruck.addEventListener("click", () => {
  if (Math.random() > 0.45) {
    addVehicle(Ural, 6, 1, 1, 0);
  } else {
    addVehicle(Gaz66, 6, 1, 1, 0);
  }
});

squadBMP.addEventListener("click", () => {
  if (Math.random() > 0.5) {
    addVehicle(BMP2, 4, 1, 1, 2);
  } else {
    addVehicle(MTLB, 6, 1, 1, 2);
  }
  console.log(vehicles);
});

function addVehicle(Class, riflemans, mashinegunners, grenadiers, crew) {
  if (coords.length > 0) {
    let index = Math.floor(Math.random() * coords.length);
    const startX = coords[index];
    const startY = Math.random() * 300 + 100;
    const targetX = coords[index];
    const targetY = 2600;
    coords.splice(index, 1);
    let waypoints = [
      { x: startX, y: startY },
      { x: startX + 1, y: startY + 1 },

      { x: targetX, y: targetY },
    ];
    let bmp = new Class(startX, startY, layer1, ctx, waypoints, vehicleNavGrid);
    // === Шукаємо шлях один раз при створенні ===
    bmp.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    bmp.currentPathIndex = 0;
    bmp.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, crew);
    vehicles.push(bmp);
  }
}

squad.addEventListener("click", () => {
  const startX = Math.random() * 1200 + 200;
  const waypoints = [{ x: startX, y: 2600 }];
  const squad = createRifleSquad(
    startX,
    Math.random() * 100 + 100,
    400,
    100,
    layer1,
    ctx,
    navGrid,
    waypoints,
    6,
    1,
    1,
    0
  );
  enemies.push(...squad);
});

const winLoseConditions = {
  win: (gameState, gameData, enemies, vehicles) => {
    return false;
  },
  lose: (gameState, gameData, enemies, vehicles) => {
    return false;
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
  true
);
