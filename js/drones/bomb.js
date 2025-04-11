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
  constructor(x, y, layer, ctx) {
    this.x = x;
    this.y = y;
    this.layer = layer;
    this.ctx = ctx;
    this.image = null;
    this.imageExplosion = null;
    this.width = 300;
    this.height = 300;
    this.scale = 3;
    this.initialScale = 3;
    this.explosionScale = 64;
    this.frames = 10;
    this.frameX = 0;
    this.explosionFrame = 0;
    this.imageWidth = 64;
    this.imageHeight = 64;
    this.type = "default";
    this.spread = 1.8;
    this.exploded = false;
    this.friction = 0.997;
    this.shrinkRate = 1.009;
    this.velocityX = layer.speedX;
    this.velocityY = layer.speedY;
  }

  drop() {
    if (!this.exploded) {
      this.velocityX *= this.friction ** 2;
      this.velocityY *= this.friction ** 2;

      this.x +=
        this.layer.speedX -
        this.velocityX +
        (Math.random() * this.spread - this.spread / 2);
      this.y +=
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
        this.x - (150 * this.scale) / this.initialScale,
        this.y - (150 * this.scale) / this.initialScale,
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
        this.x - this.explosionScale / 2,
        this.y - this.explosionScale / 2,
        this.explosionScale,
        this.explosionScale
      );
      this.x += this.layer.speedX;
      this.y += this.layer.speedY;

      this.explosionFrame++;
    }
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    return distance < 50; // базова перевірка
  }
}
export class FragBomb extends Bomb {
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = fragBombImage;
    this.imageExplosion = imageExplosion;
    this.type = "frag";
    this.explosionScale = 64;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    let hitStatus = false;
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
    return hitStatus;
  }
}

// Осколково-фугасна бомба
export class HeBomb extends Bomb {
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = heBombImage;
    this.imageExplosion = imageExplosion;
    this.type = "he";
    this.explosionScale = 100;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    return distance < 50;
  }
}

// Кумулятивна бомба
export class ShapedBomb extends Bomb {
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = shapedBombImage;
    this.imageExplosion = imageExplosion;
    this.type = "shaped";
    this.explosionScale = 30;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    return distance < 15;
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

  let bombArray = null;
  let newBomb = null;
  const x = droneScope.x + droneScope.width / 2;
  const y = droneScope.y + droneScope.height / 2;

  switch (selectionState.selectedBombType) {
    case "frag":
      bombArray = currentDrone.fragBombs;
      newBomb = new FragBomb(x, y, layer1, ctx);
      break;
    case "he":
      bombArray = currentDrone.heBombs;
      newBomb = new HeBomb(x, y, layer1, ctx);
      break;
    case "shaped":
      bombArray = currentDrone.shapedBombs;
      newBomb = new ShapedBomb(x, y, layer1, ctx);
      break;
  }

  if (!bombArray || bombArray.length === 0) {
    console.warn("🚨 Немає бомб для скидання!");
    return;
  }

  bombArray.pop();
  bombs.push(newBomb);

  if (bombArray.length === 0) {
    switchToNextAvailableBomb();
    currentDrone.reloading();
  }
}
