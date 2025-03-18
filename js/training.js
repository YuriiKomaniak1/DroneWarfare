/** @type {HTMLCanvasElement}  */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = 800);
let CANVAS_HEIGHT = (canvas.height = 900);
let gameFrame = 0;

let gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";

let trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";

let droneScope = new Image();
droneScope.src = "./assets/img/drones/droneScope.png";

let fragBomb = new Image();
fragBomb.src = "./assets/img/bombs/fragBomb.png";

let enemyRifle = new Image();
enemyRifle.src = "./assets/img/enemies/spritesheetSoldierAk.png";
let imageExplosion = new Image();
imageExplosion.src = "./assets/img/bombs/smallExplosion.png";

class Layer {
  constructor(image) {
    this.x = canvas.width / 2 - 700;
    this.y = canvas.height - 1400;
    this.width = 1400;
    this.height = 1400;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
    this.acceleration = 0.01;
    this.deceleration = 0.0025;
    this.maxSpeed = 0.28;
  }

  update() {
    if (keys.up && this.y < canvas.height / 2) {
      this.speedY += this.acceleration;
    } else if (keys.down && this.y > canvas.height / 2 - this.height) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY *= 1 - this.deceleration;
      if (Math.abs(this.speedY) < 0.001) this.speedY = 0;
    }

    if (keys.left && this.x < canvas.width / 2) {
      this.speedX += this.acceleration;
    } else if (keys.right && this.x > canvas.width / 2 - this.width) {
      this.speedX -= this.acceleration;
    } else {
      this.speedX *= 1 - this.deceleration;
      if (Math.abs(this.speedX) < 0.001) this.speedX = 0;
    }

    this.speedX = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.speedX)
    );
    this.speedY = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.speedY)
    );

    if (this.x > canvas.width / 2) {
      this.speedX = 0;
      this.x--;
    }
    if (this.x < canvas.width / 2 - this.width) {
      this.speedX = 0;
      this.x++;
    }
    if (this.y > canvas.height / 2) {
      this.speedY = 0;
      this.y--;
    }

    if (this.y < canvas.height / 2 - this.height) {
      this.speedY = 0;
      this.y++;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Enemy {
  constructor(image, x, y, speed, spriteWidth, spriteHeight, frames) {
    this.image = image;
    this.baseX = x;
    this.baseY = y;
    this.speed = speed;
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.frameX = Math.floor(Math.random() * frames);
    this.frameY = 3;
    this.frameSpeed = 40;
    this.frames = frames;
    this.frameTimer = 0;
  }
  update() {
    this.baseY += this.speed;
    if (Math.round(this.baseX) % 1 === 0)
      this.baseX += this.speed * (Math.random() * 6 - 3);
    // Анімація ворога
    this.frameTimer++;
    if (this.frameTimer >= this.frameSpeed) {
      this.frameX = (this.frameX + 1) % this.frames;
      this.frameTimer = 0;
    }
    this.x = this.baseX + layer1.x;
    this.y = this.baseY + layer1.y;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
class Bomb {
  constructor(image, imageExplosion, x, y, spriteWidth, spriteHeight, scale) {
    this.image = image;
    this.imageExplosion = imageExplosion;
    this.baseX = x;
    this.baseY = y;
    this.frameX = 0;
    this.frames=10;
    
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.scale = scale;
    this.initialScale = scale;
    this.spread = 2;
    this.exploded = false;
    this.explosionscale = 64;
    this.friction = 0.999;
    this.shrinkRate = 1.005;
    this.velocityX = layer1.speedX * 1; // Початкова швидкість
    this.velocityY = layer1.speedY * 1;
    this.explosionFrame = 0;
    this.explosionDuration = 10000; // Тривалість вибуху

  }

  drop() {
    if (!this.exploded) {
      console.log(this.velocityX);
      this.velocityX *= this.friction;
      this.velocityY *= this.friction;

      this.baseX +=
        layer1.speedX -
        this.velocityX +
        (Math.random() * this.spread - this.spread / 2);
      this.baseY +=
        layer1.speedY -
        this.velocityY +
        (Math.random() * this.spread - this.spread / 2);

      this.scale /= this.shrinkRate;

      if (this.scale <= this.initialScale * 0.05) {
        this.exploded = true;
      }

      ctx.drawImage(
        this.image,
        this.baseX - (150 * this.scale) / this.initialScale,
        this.baseY - (150 * this.scale) / this.initialScale,
        (this.width * this.scale) / this.initialScale,
        (this.height * this.scale) / this. initialScale
      );
    }else {
       if (this.explosionFrame < this.explosionDuration) {
        if (this.explosionFrame % 30 === 0) {
          this.frameX++;
          if(this.frameX >= this.frames){
            this.frameX = this.frames;
          }
            }

        //   ctx.drawImage(
        //     this.imageExplosion,
        //   this.frameX * this.explosionscale,
        //   0,
        //   this.explosionscale,
        //   this.explosionscale,
        //   this.baseX - this.explosionscale / 2- layer1.x-400,
        //    this.baseY - this.explosionscale / 2- layer1.y-450,
        //   this.explosionscale,
        //   this.explosionscale
        //   );
          this.explosionFrame++;
        }
      }
    }
  }
class Drone {
  constructor(image) {
    this.x = canvas.width / 2 - 200;
    this.y = CANVAS_HEIGHT / 2 - 175;
    this.width = 400;
    this.height = 350;
    this.image = image;
  }

  update() {}

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(gameField);
const layer2 = new Layer(trees);
const enemy1 = new Enemy(enemyRifle, 300, 100, 0.084, 64, 64, 8);
const enemy2 = new Enemy(enemyRifle, 500, 50, 0.078, 64, 64, 8);
const enemy3 = new Enemy(enemyRifle, 620, 0, 0.08, 64, 64, 8);
const enemy4 = new Enemy(enemyRifle, 270, 70, 0.082, 64, 64, 8);
const enemy5 = new Enemy(enemyRifle, 550, -50, 0.08, 64, 64, 8);
const enemy6 = new Enemy(enemyRifle, 730, 80, 0.081, 64, 64, 8);
const enemy7 = new Enemy(enemyRifle, 130, -110, 0.081, 64, 64, 8);
const enemy8 = new Enemy(enemyRifle, 830, 40, 0.075, 64, 64, 8);
const enemy9 = new Enemy(enemyRifle, 650, -10, 0.088, 64, 64, 8);
const drone = new Drone(droneScope);

const gameObjects = [layer1, layer2];
const enemies = [
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  enemy9,
];
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};
let bombs = []; // Масив для бомб

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.up = true;
      break;
    case "ArrowDown":
      keys.down = true;
      break;
    case "ArrowLeft":
      keys.left = true;
      break;
    case "ArrowRight":
      keys.right = true;
      break;
    case " ":
      dropBomb();
      break;
  }
});

function dropBomb() {
  const bomb = new Bomb(
    fragBomb, // Зображення бомби
    imageExplosion, // Зображення вибуху
    drone.x + drone.width / 2,
    drone.y + drone.height / 2,
    300,
    300,
    3 // Масштаб бомби
  );
  bomb.velocityX = layer1.speedX * 1; // Множник для відчуття інерції
  bomb.velocityY = layer1.speedY * 1;

  bombs.push(bomb);
}

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.up = false;
      break;
    case "ArrowDown":
      keys.down = false;
      break;
    case "ArrowLeft":
      keys.left = false;
      break;
    case "ArrowRight":
      keys.right = false;
      break;
  }
});
Promise.all([
  new Promise((resolve) => (gameField.onload = resolve)),
  new Promise((resolve) => (trees.onload = resolve)),
  new Promise((resolve) => (droneScope.onload = resolve)),
  new Promise((resolve) => (enemyRifle.onload = resolve)),
]).then(() => {
  animate();
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Очищаємо канвас

  layer1.update();
  layer1.draw();

  enemies.forEach((object) => {
    object.update();
    object.draw();
  });

  bombs.forEach((bomb) => bomb.drop());
  //   bombs = bombs.filter(bomb => !bomb.exploded);

  layer2.update();
  layer2.draw();

  drone.draw();

  gameFrame++;

  requestAnimationFrame(animate); // Викликаємо анімацію повторно
}
