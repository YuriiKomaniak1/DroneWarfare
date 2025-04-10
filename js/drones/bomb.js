let fragBombImage = new Image();
fragBombImage.src = "../assets/img/bombs/fragBomb.png";
let heBombImage = new Image();
heBombImage.src = "../assets/img/bombs/heBomb.png";
let shapedBombImage = new Image();
shapedBombImage.src = "../assets/img/bombs/shapedBomb.png";
let imageExplosion = new Image();
imageExplosion.src = "../assets/img/bombs/smallExplosion.png";
import { switchToNextAvailableBomb } from "../logic/controls.js";
export class Bomb {
  constructor(
    image,
    imageExplosion,
    x,
    y,
    spriteWidth,
    spriteHeight,
    scale,
    explosionScale,
    frames,
    layer,
    ctx,
    type
  ) {
    this.image = image;
    this.imageWidth = 64;
    this.imageHeight = 64;
    this.imageExplosion = imageExplosion;
    this.baseX = x;
    this.baseY = y;
    this.frameX = 0;
    this.frames = frames;
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.scale = scale;
    this.initialScale = scale;
    this.spread = 1.8;
    this.exploded = false;
    this.explosionScale = explosionScale;
    this.friction = 0.997;
    this.shrinkRate = 1.009;
    this.velocityX = layer.speedX * 1; // Початкова швидкість
    this.velocityY = layer.speedY * 1;
    this.explosionFrame = 0;
    this.initialX = x;
    this.initialY = y;
    this.layer = layer;
    this.ctx = ctx;
    this.type = type; // Тип бомби
  }

  drop() {
    if (!this.exploded) {
      this.velocityX *= this.friction ** 2;
      this.velocityY *= this.friction ** 2;

      this.baseX +=
        this.layer.speedX -
        this.velocityX +
        (Math.random() * this.spread - this.spread / 2);
      this.baseY +=
        this.layer.speedY -
        this.velocityY +
        (Math.random() * this.spread - this.spread / 2);

      this.scale /= this.shrinkRate;

      if (this.scale <= this.initialScale * 0.05) {
        this.exploded = true;
      }
    }
  }
  draw() {
    if (!this.exploded) {
      this.ctx.drawImage(
        this.image,
        this.baseX - (150 * this.scale) / this.initialScale,
        this.baseY - (150 * this.scale) / this.initialScale,
        (this.width * this.scale) / this.initialScale,
        (this.height * this.scale) / this.initialScale
      );
    } else {
      if (this.explosionFrame % 10 === 0) {
        this.frameX++;
        if (this.frameX >= this.frames) {
          this.frameX = this.frames;
        }
      }

      this.ctx.drawImage(
        this.imageExplosion,
        this.frameX * this.imageWidth,
        0,
        this.imageWidth,
        this.imageHeight,
        this.baseX - this.explosionScale / 2,
        this.baseY - this.explosionScale / 2,
        this.explosionScale,
        this.explosionScale
      );
      this.baseX += this.layer.speedX;
      this.baseY += this.layer.speedY;

      this.explosionFrame++;
    }
  }
  checkCollision(enemy) {
    const distance = Math.hypot(
      this.baseX - (enemy.x + 32),
      this.baseY - (enemy.y + 32)
    );
    let hitStatus = false;
    if (this.type === "frag") {
      if (distance < 20) {
        hitStatus = true;
      } else if (distance < 40 && !enemy.crawl) {
        if (Math.random() > 0.1) hitStatus = true;
      } else if (distance < 50 && !enemy.crawl) {
        if (Math.random() > 0.2) hitStatus = true;
      } else if (distance < 90 && !enemy.crawl) {
        if (Math.random() > 0.5) hitStatus = true;
      } else if (distance < 140 && !enemy.crawl) {
        if (Math.random() > 0.85) hitStatus = true;
      }
    } else if (this.type === "he") {
      if (distance < 50) {
        hitStatus = true;
      }
    } else if (this.type === "shaped") {
      if (distance < 15) {
        hitStatus = true;
      }
    }

    return hitStatus;
  }
}

export function dropBomb(
  currentDrone,
  selectionState,
  layer1,
  ctx,
  droneScope,
  bombs
) {
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
