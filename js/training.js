import { Minimap } from "./gameElements/minimap.js";
import { Layer } from "./layers/layer.js";
import { createRifleSquad, Rifleman } from "./enemies/enemy.js";
import { Gaz66, Ural, BMP2 } from "./enemies/vehicle.js";
import { dropBomb } from "./drones/bomb.js";
import { DroneScope, droneScopeImage } from "./gameElements/droneScope.js";
import {
  initControls,
  setupControls,
  setupDroneSelectionByClick,
  drawJoystickAndButtons,
  setupTouchControls,
  keys,
  selectionState,
} from "./logic/controls.js";
import {
  checkEffect,
  checkVisibility,
  checkDistance,
} from "./logic/enemyLogic.js";
import { drawScore } from "./logic/score.js";
import { DroneIcons } from "./gameElements/droneIcons.js";
import { drones } from "./drones/trainingDrones.js";
import { initDrones } from "./drones/drones.js";
import {
  drawMenuButtons,
  handleMenuClick,
  handleMenuHover,
} from "./levels/training/trainingButtons.js";
import {
  trainingSections,
  updateTrainingText,
} from "./levels/training/trainingInfo.js";
import {
  NavigationGrid,
  findPath,
  drawNavigationGrid,
} from "./logic/navigation.js";

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
export const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);
let currentSection = 0;
let gameFrame = 0;
drones[0].isActive = true;
let currentDrone = drones[selectionState.selectedDroneIndex];
const gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";
const trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";
const layer1 = new Layer(gameField, canvas, 1800, 2600, keys, ctx);
const layer2 = new Layer(trees, canvas, 1800, 2600, keys, ctx);
const droneScope = new DroneScope(droneScopeImage, canvas, ctx);
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
squadTruck.addEventListener("click", () => {
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
    let TruckClass = Math.random() > 0.45 ? Ural : Gaz66;
    let truck = new TruckClass(
      startX,
      startY,
      layer1,
      ctx,
      waypoints,
      vehicleNavGrid
    );

    // === Шукаємо шлях один раз при створенні ===
    truck.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    truck.currentPathIndex = 0;
    truck.embark(enemies, navGrid);

    vehicles.push(truck);
  }
});

squadBMP.addEventListener("click", () => {
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

    let bmp = new BMP2(startX, startY, layer1, ctx, waypoints, vehicleNavGrid);

    // === Шукаємо шлях один раз при створенні ===
    bmp.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    bmp.currentPathIndex = 0;
    bmp.embark(enemies, navGrid);

    vehicles.push(bmp);
  }
});
squad.addEventListener("click", () => {
  let coordX = Math.random() * 1200 + 200;
  let coordY = Math.random() * 100 + 100;
  const squad = createRifleSquad(
    coordX,
    coordY,
    400,
    100,
    layer1,
    ctx,
    navGrid,
    coordX,
    2600
  );

  enemies.push(...squad);
  console.log(enemies);
});

const minimap = new Minimap(
  1800,
  2600,
  canvas.width,
  canvas.height,
  droneScope,
  enemies,
  vehicles,
  ctx,
  layer1
);

setupControls(() => {
  dropBomb(currentDrone, selectionState, layer1, ctx, droneScope, bombs);
});
setupDroneSelectionByClick(canvas, droneIcons);
setupTouchControls(dropBomb, canvas);

const FPS = 60;
const FRAME_TIME = 1000 / FPS;
let lastTime = 0;

function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  if (deltaTime >= FRAME_TIME) {
    lastTime = timestamp - (deltaTime % FRAME_TIME);
    drones.forEach((drone) => {
      if (
        (drone.isReloading && drone.baseX === 0 && drone.baseY === 0) ||
        (!drone.isAlive && drone.baseX === 0 && drone.baseY === 0)
      ) {
        drone.baseX = canvas.width / 2;
        drone.baseY = canvas.height / 2;
      }
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо канвас
    layer1.update();
    layer1.draw();
    bombs.forEach((bomb) => {
      if (bomb.initialScale / bomb.scale >= 13.5) bomb.draw();
      bomb.drop();

      if (bomb.exploded && bomb.explosionFrame < 1) {
        currentDrone.cahngeVisibility();
        enemies.forEach((enemy) => {
          if (bomb.checkCollision(enemy) && !enemy.dead) {
            enemy.dead = true;
            enemy.deathFrameIndex = 0;
          }
          if (checkEffect(bomb, enemy) && !enemy.dead) {
            enemy.crawl = true;
            enemy.frameX = 0;
            enemy.isFiring = false;
          }
        });
        vehicles.forEach((vehicle) => {
          bomb.checkVehicleCollision(vehicle);
        });
      }
    });
    enemies.forEach((enemy, index) => {
      if (checkVisibility(currentDrone, enemy, canvas, gameFrame)) {
        enemy.isFiring = true;
        enemy.frameX = 0;
      }
      if (enemy.isFiring && checkDistance(enemy, canvas) > enemy.fireDistance) {
        enemy.isFiring = false;
      }
      enemy.update(enemies, canvas, score);
      enemy.draw();
      enemy.fire(currentDrone, layer1);
    });
    vehicles.forEach((vehicle, index) => {
      vehicle.update(vehicles, score);
      vehicle.draw();
    });

    layer2.update();
    layer2.draw();
    enemies.forEach((enemy) => {
      enemy.skullDraw();
    });
    bombs.forEach((bomb) => {
      if (bomb.initialScale / bomb.scale < 13.5) bomb.draw();
    });
    const selectedDrone = drones[selectionState.selectedDroneIndex];
    if (currentDrone && currentDrone !== selectedDrone) {
      selectedDrone.visibility = currentDrone.visibility;
      currentDrone.reloading(true);
      if (currentDrone.baseX === 0 && currentDrone.baseY === 0) {
        currentDrone.baseX = canvas.width / 2;
        currentDrone.baseY = canvas.height / 2;
      } // Старий дрон летить на зарядку
    }
    currentDrone = selectedDrone;
    drones.forEach((drone, index) => {
      drone.destruction();
      drone.isActive =
        (index === selectionState.selectedDroneIndex && drone.isAlive) ||
        drone.isReloading;
      drone.flyToreload();
      drone.draw(ctx);
    });
    // drawNavigationGrid(navGrid, ctx, layer1);
    droneScope.draw(currentDrone);
    minimap.draw();
    droneIcons.forEach((object) => {
      object.draw();
    });
    drawJoystickAndButtons(ctx);
    drawMenuButtons(ctx, canvas, minimap);
    drawScore(ctx, score.count, canvas);
    gameFrame++;
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
