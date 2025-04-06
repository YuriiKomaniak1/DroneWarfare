import { selectionState } from "./logic/selection.js";
import { Minimap } from "./gameElements/minimap.js";
import { Layer } from "./layers/layer.js";
import { Enemy } from "./enemies/enemy.js";
import { Bomb } from "./drones/bomb.js";
import { DroneScope, droneScopeImage } from "./drones/droneScope.js";
import { checkCollision } from "./logic/bombCollisions.js";
import { keys, setupControls } from "./logic/controls.js";
import { checkEffect } from "./logic/enemyLogic.js";
import { DroneIcons } from "./gameElements/droneIcons.js";
import { drones } from "./drones/trainingDrones.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = Math.min(window.innerWidth, 900);
canvas.height = Math.min(window.innerHeight, 900);
let CANVAS_WIDTH = canvas.width;
let CANVAS_HEIGHT = canvas.height;
let gameFrame = 0;
drones[0].isActive = true;
let currentDrone = {};

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

const layer1 = new Layer(gameField, canvas, 1400, 1400, keys, ctx);
const layer2 = new Layer(trees, canvas, 1400, 1400, keys, ctx);
const droneScope = new DroneScope(droneScopeImage, canvas, ctx);
const droneIcon1 = new DroneIcons(canvas, ctx, 1, drones[0]);
const droneIcon2 = new DroneIcons(canvas, ctx, 2, drones[1]);
const droneIcon3 = new DroneIcons(canvas, ctx, 3, drones[2]);
const droneIcon4 = new DroneIcons(canvas, ctx, 4, drones[3]);
const droneIcon5 = new DroneIcons(canvas, ctx, 5, drones[4]);
console.log(droneIcon1);
const droneIcons = [droneIcon1, droneIcon2, droneIcon3, droneIcon4, droneIcon5];
let enemies = [];
while (enemies.length < 18) {
  const enemy = new Enemy(
    enemyRifle,
    Math.random() * 1350,
    Math.random() * 400 - 200,
    64,
    64,
    8,
    layer1,
    ctx
  );
  enemies.push(enemy);
}
const minimap = new Minimap(
  1400,
  1400,
  canvas.width,
  canvas.height,
  droneScope,
  enemies,
  ctx,
  layer1
);
let bombs = []; // Масив для бомб
function dropBomb() {
  if (!currentDrone) {
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
    selectionState.selectedBombIndex =
      (selectionState.selectedBombIndex + 1) % selectionState.bombTypes.length;
    selectionState.selectedBombType =
      selectionState.bombTypes[selectionState.selectedBombIndex];
    console.log(`🔄 Вибрано бомбу: ${selectionState.selectedBombType}`);
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
}
setupControls(dropBomb);

const FPS = 60;
const FRAME_TIME = 1000 / FPS;
let lastTime = 0;

function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  if (deltaTime >= FRAME_TIME) {
    drones.forEach((drone, index) => {
      drone.isActive = index === selectionState.selectedDroneIndex;
      if (drone.isActive) currentDrone = drone;
    });
    lastTime = timestamp - (deltaTime % FRAME_TIME);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Очищаємо канвас
    layer1.update();
    layer1.draw();

    enemies.forEach((object) => {
      object.update(enemies);
      object.draw();
    });

    bombs.forEach((bomb) => {
      bomb.drop();
      if (bomb.exploded && bomb.explosionFrame < 1) {
        enemies.forEach((enemy) => {
          if (checkCollision(bomb, enemy) && !enemy.dead) {
            enemy.dead = true;
            enemy.deathFrameIndex = 0;
          }
          if (checkEffect(bomb, enemy) && !enemy.dead) {
            enemy.crawl = true;
          }
        });
      }
    });

    layer2.update();
    layer2.draw();

    droneScope.draw();
    minimap.draw();
    droneIcons.forEach((object) => {
      object.draw();
    });
    gameFrame++;
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
