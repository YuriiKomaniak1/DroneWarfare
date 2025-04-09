import { Minimap } from "./gameElements/minimap.js";
import { Layer } from "./layers/layer.js";
import { Enemy } from "./enemies/enemy.js";
import { Bomb } from "./drones/bomb.js";
import { DroneScope, droneScopeImage } from "./gameElements/droneScope.js";
import { checkCollision } from "./logic/bombCollisions.js";
import {
  switchToNextAvailableBomb,
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
import { DroneIcons } from "./gameElements/droneIcons.js";
import { drones } from "./drones/trainingDrones.js";
import { initDrones } from "./drones/drones.js";
import { drawMenuButtons } from "./levels/training/trainingButtons.js";

let obstacles = [];
async function loadObstacles() {
  const response = await fetch("js/levels/training/obstacles.json");
  obstacles = await response.json();
}
await loadObstacles();
const modal = document.getElementById("modal__greeting");
const startButton = document.getElementById("trainingStartButton");

window.addEventListener("load", () => {
  modal.style.visibility = "visible";
});

startButton.addEventListener("click", () => {
  modal.style.visibility = "hidden";
});
export const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);
let CANVAS_WIDTH = canvas.width;
let CANVAS_HEIGHT = canvas.height;
initControls(canvas, drones);
let gameFrame = 0;
drones[0].isActive = true;
let currentDrone = drones[selectionState.selectedDroneIndex];

let gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";
let trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";
let fragBombImage = new Image();
fragBombImage.src = "./assets/img/bombs/fragBomb.png";
let heBombImage = new Image();
heBombImage.src = "./assets/img/bombs/heBomb.png";
let shapedBombImage = new Image();
shapedBombImage.src = "./assets/img/bombs/shapedBomb.png";
let imageExplosion = new Image();
imageExplosion.src = "./assets/img/bombs/smallExplosion.png";
let enemyRifle = new Image();
enemyRifle.src = "./assets/img/enemies/spritesheetSoldierAk.png";

const layer1 = new Layer(gameField, canvas, 1800, 2600, keys, ctx);
const layer2 = new Layer(trees, canvas, 1800, 2600, keys, ctx);
const droneScope = new DroneScope(droneScopeImage, canvas, ctx);
const droneIcon1 = new DroneIcons(canvas, ctx, 1, drones[0]);
const droneIcon2 = new DroneIcons(canvas, ctx, 2, drones[1]);
const droneIcon3 = new DroneIcons(canvas, ctx, 3, drones[2]);
const droneIcon4 = new DroneIcons(canvas, ctx, 4, drones[3]);
const droneIcon5 = new DroneIcons(canvas, ctx, 5, drones[4]);

console.log(droneIcon1);
initDrones(layer1);
const droneIcons = [droneIcon1, droneIcon2, droneIcon3, droneIcon4, droneIcon5];

let enemies = [];
while (enemies.length < 36) {
  const enemy = new Enemy(
    enemyRifle,
    Math.random() * 1750,
    Math.random() * 600 - 200,
    64,
    64,
    8,
    layer1,
    ctx,
    obstacles
  );
  enemies.push(enemy);
}
const minimap = new Minimap(
  1800,
  2600,
  canvas.width,
  canvas.height,
  droneScope,
  enemies,
  ctx,
  layer1
);
let bombs = []; // Масив для бомб
function dropBomb() {
  if (!currentDrone.isActive) {
    console.warn("🚨 Немає активного дрона!");
    return;
  }

  let bombType = selectionState.selectedBombType;
  let bombArray = null;
  let bombImage = null;
  let explosionScale = 64;

  switch (bombType) {
    case "frag":
      bombArray = currentDrone.fragBombs;
      bombImage = fragBombImage;
      explosionScale = 64;
      break;
    case "he":
      bombArray = currentDrone.heBombs;
      bombImage = heBombImage;
      explosionScale = 100;
      break;
    case "shaped":
      bombArray = currentDrone.shapedBombs;
      bombImage = shapedBombImage;
      explosionScale = 30;
      break;
  }

  if (!bombArray || bombArray.length === 0) {
    console.warn("🚨 Немає бомб для скидання!");
    return;
  }

  bombArray.pop();

  const bomb = new Bomb(
    bombImage,
    imageExplosion,
    droneScope.x + droneScope.width / 2,
    droneScope.y + droneScope.height / 2,
    300,
    300,
    3,
    explosionScale,
    10,
    layer1,
    ctx,
    bombType
  );

  bomb.velocityX = layer1.speedX * 1;
  bomb.velocityY = layer1.speedY * 1;

  bombs.push(bomb);
  if (bombArray.length === 0) {
    switchToNextAvailableBomb();
    currentDrone.reloading();
  }
}
setupControls(dropBomb);
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
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Очищаємо канвас
    layer1.update();
    layer1.draw();
    bombs.forEach((bomb) => {
      if (bomb.initialScale / bomb.scale >= 13.5) bomb.draw();
      bomb.drop();

      if (bomb.exploded && bomb.explosionFrame < 1) {
        currentDrone.cahngeVisibility();
        enemies.forEach((enemy) => {
          if (checkCollision(bomb, enemy) && !enemy.dead) {
            enemy.dead = true;
            enemy.deathFrameIndex = 0;
          }
          if (checkEffect(bomb, enemy) && !enemy.dead) {
            enemy.crawl = true;
            enemy.frameX = 0;
            enemy.isFiring = false;
          }
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
      enemy.update(enemies);
      enemy.checkObstaclesCollision(index);
      enemy.draw();
      enemy.fire(currentDrone, layer1);
    });

    layer2.update();
    layer2.draw();
    // obstacles.forEach((object) => {
    // ctx.fillStyle = "rgba(234, 234, 234, 0.8)";
    // ctx.fillRect(object.x+layer1.x, object.y+layer1.y, object.width, object.height);
    // });
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
    droneScope.draw(currentDrone);
    minimap.draw();
    droneIcons.forEach((object) => {
      object.draw();
    });
    drawJoystickAndButtons(ctx);
    drawMenuButtons(ctx, canvas, minimap);
    gameFrame++;
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
