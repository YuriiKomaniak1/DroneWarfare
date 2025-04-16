import { Minimap } from "./gameElements/minimap.js";
import { Layer } from "./layers/layer.js";
import { createRifleSquad, Rifleman } from "./enemies/enemy.js";
import { Gaz66, Ural, BMP2, BMP1, Guntruck } from "./enemies/vehicle.js";
import { initControls, keys } from "./logic/controls.js";
import { DroneIcons } from "./gameElements/droneIcons.js";
import { drones } from "./drones/trainingDrones.js";
import { initDrones } from "./drones/drones.js";
import {
  handleMenuClick,
  handleMenuHover,
} from "./levels/training/trainingButtons.js";
import {
  trainingSections,
  updateTrainingText,
} from "./levels/training/trainingInfo.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";

let bombs = [];
let obstacles = [];
let enemies = [];
let vehicles = [];
async function loadObstacles() {
  const response = await fetch("js/levels/training/obstacles.json");
  obstacles = await response.json();
}
await loadObstacles();
const navGrid = new NavigationGrid(1800, 2600, 15, obstacles);
const vehicleNavGrid = new NavigationGrid(1800, 2600, 40, obstacles);
const score = {};
score.count = 0;
const modal = document.getElementById("modal__greeting");
const startButton = document.getElementById("trainingStartButton");
const trainingModal = document.getElementById("trainingModal");
const trainingText = document.getElementById("trainingText");
const prevSection = document.getElementById("prevSection");
const nextSection = document.getElementById("nextSection");
const resumeGame = document.getElementById("resumeGame");
const hideEnemiesModal = document.getElementById("hideEnemiesModal");
const squad = document.getElementById("squad");
const squadTruck = document.getElementById("squadTruck");
const squadBMP = document.getElementById("squadBMP");
const guntruck = document.getElementById("guntruck");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);
let currentSection = 0;
drones[0].isActive = true;

const gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";
const trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";
const layer1 = new Layer(gameField, canvas, 1800, 2600, keys, ctx);
const layer2 = new Layer(trees, canvas, 1800, 2600, keys, ctx);

const droneIcon1 = new DroneIcons(canvas, ctx, 1, drones[0]);
const droneIcon2 = new DroneIcons(canvas, ctx, 2, drones[1]);
const droneIcon3 = new DroneIcons(canvas, ctx, 3, drones[2]);
const droneIcon4 = new DroneIcons(canvas, ctx, 4, drones[3]);
const droneIcon5 = new DroneIcons(canvas, ctx, 5, drones[4]);
const droneIcons = [droneIcon1, droneIcon2, droneIcon3, droneIcon4, droneIcon5];
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
export function openTrainingModal() {
  trainingModal.style.visibility = "visible";
  updateTrainingText(trainingText, currentSection);
}
window.addEventListener("load", () => {
  modal.style.visibility = "visible";
});

startButton.addEventListener("click", () => {
  modal.style.visibility = "hidden";
});
initDrones(layer1);
initControls(canvas, drones);
canvas.addEventListener("mousemove", (e) => handleMenuHover(e, canvas));
canvas.addEventListener("touchmove", (e) => handleMenuHover(e, canvas));
canvas.addEventListener("click", (e) =>
  handleMenuClick(e, canvas, openTrainingModal)
);
canvas.addEventListener("touchstart", (e) =>
  handleMenuClick(e, canvas, openTrainingModal)
);
let coords = [
  60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140, 1260, 1380, 1500, 1620,
  1740,
];
guntruck.addEventListener("click", () => {
  addVehicle(Guntruck, 1, 0, 0);
});
squadTruck.addEventListener("click", () => {
  if (Math.random() > 0.45) {
    addVehicle(Ural, 6, 1, 1);
  } else {
    addVehicle(Gaz66, 6, 1, 1);
  }
});

squadBMP.addEventListener("click", () => {
  if (Math.random() > 0.5) {
    addVehicle(BMP2, 4, 1, 1);
  } else {
    addVehicle(BMP1, 4, 1, 1);
  }
});

function addVehicle(Class, riflemans, mashinegunners, grenadiers) {
  if (coords.length > 0) {
    let index = Math.floor(Math.random() * coords.length);
    const startX = coords[index];
    const startY = Math.random() * 300 + 100;
    const targetX = coords[index];
    const targetY = 2600;
    coords.splice(index, 1);
    let waypoints = [
      { x: startX, y: startY },

      { x: targetX, y: targetY },
    ];
    let bmp = new Class(startX, startY, layer1, ctx, waypoints, vehicleNavGrid);
    // === Шукаємо шлях один раз при створенні ===
    bmp.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    bmp.currentPathIndex = 0;
    bmp.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers);
    vehicles.push(bmp);
  }
}

squad.addEventListener("click", () => {
  const startX = Math.random() * 1200 + 200;
  const squad = createRifleSquad(
    startX,
    Math.random() * 100 + 100,
    400,
    100,
    layer1,
    ctx,
    navGrid,
    startX,
    2600,
    6,
    1,
    1
  );
  enemies.push(...squad);
  console.log(enemies);
});

const minimap = new Minimap(1800, 2600, canvas, enemies, vehicles, ctx, layer1);

createAnimationLoop(
  drones,
  canvas,
  layer1,
  layer2,
  ctx,
  bombs,
  enemies,
  vehicles,
  minimap,
  droneIcons,
  score
);
