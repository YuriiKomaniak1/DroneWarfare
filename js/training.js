import { Minimap } from "./gameElements/minimap.js";
import { Layer } from "./layers/layer.js";
import { Enemy } from "./enemies/enemy.js";
import { Bomb } from "./drones/bomb.js";
import { Drone, droneScope } from "./drones/drone.js";
import { checkCollision } from "./logic/bombCollisions.js";
import { keys, setupControls } from "./logic/controls.js";
import { checkEffect } from "./logic/enemyLogic.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = 800);
let CANVAS_HEIGHT = (canvas.height = 900);
let gameFrame = 0;

let gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";
let trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";
let fragBombImage = new Image();
fragBombImage.src = "./assets/img/bombs/fragBomb.png";
let imageExplosion = new Image();
imageExplosion.src = "./assets/img/bombs/smallExplosion.png";
let enemyRifle = new Image();
enemyRifle.src = "./assets/img/enemies/spritesheetSoldierAk.png";

const layer1 = new Layer(gameField, canvas, 1400, 1400, keys, ctx);
const layer2 = new Layer(trees, canvas, 1400, 1400, keys, ctx);
const drone = new Drone(droneScope, 400, 350, canvas, ctx);

let enemies = [];
while (enemies.length < 18) {
  const enemy = new Enemy(
    enemyRifle,
    Math.random() * 1350,
    Math.random() * 400 - 200,
    Math.random() * 0.02 + 0.155,
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
  drone,
  enemies,
  ctx,
  layer1
);
let bombs = []; // Масив для бомб
function dropBomb() {
  const bomb = new Bomb(
    fragBombImage, // Зображення бомби
    imageExplosion, // Зображення вибуху
    drone.x + drone.width / 2,
    drone.y + drone.height / 2,
    300,
    300,
    3,
    64,
    10,
    layer1,
    ctx
  );
  bomb.velocityX = layer1.speedX * 1; // Множник для відчуття інерції
  bomb.velocityY = layer1.speedY * 1;

  bombs.push(bomb);
}
setupControls(dropBomb);
animate();

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Очищаємо канвас

  layer1.update();
  layer1.draw();

  enemies.forEach((object) => {
    object.update();
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
          enemy.crawl=true;
        }
      });
    }
  });

  layer2.update();
  layer2.draw();

  drone.draw();
  minimap.draw();
  gameFrame++;

  requestAnimationFrame(animate); // Викликаємо анімацію повторно
}
