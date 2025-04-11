import { basePath } from "../utils/basePath.js";
let localLayer = null;
let smallDroneImage = new Image();
smallDroneImage.src = `${basePath}assets/img/drones/smallDroneAnimation.png`;
export function initDrones(layer) {
  localLayer = layer;
}
class Drone {
  constructor(image, capacity, hp, visibility, frameWidth, frameHeight) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.capacity = capacity; // Загальна місткість
    this.remainingCapacity = capacity; // Залишкова місткість
    this.hp = hp;
    this.initialHP = hp;
    this.destructionScale = 1;
    this.isAllowed = true;
    this.isActive = false;
    this.isReloading = false;
    this.isAlive = true;
    this.initialBombStorage = {
      frag: [],
      he: [],
      shaped: [],
    };
    this.bombStorage = {
      frag: [],
      he: [],
      shaped: [],
    };
    this.reloadingTime = 1000 * 60 * 3;
    this.reloadStartTime = null;
    this.scale = 1; // стартовий масштаб
    this.targetScale = 0.3; // цільовий масштаб при польоті
    this.rotation = 0; // поточний поворот
    this.rotationSpeed = Math.PI / 120; // швидкість повороту
    this.shrinkRate = 0.005; // швидкість зменшення
    this.flyBackSpeed = 1; // швидкість польоту назад
    this.baseX = 0;
    this.baseY = 0;
    this.frames = 4; // Кількість кадрів у спрайті
    this.frameX = 0; // Поточний кадр
    this.frameTimer = 0; // Лічильник часу між кадрами
    this.frameSpeed = 3; // Затримка між кадрами
    this.visibility = visibility;
    this.initialVisibility = visibility;
  }
  resetPosition() {
    this.scale = 1;
    this.rotation = 0;
    this.baseX = localCanvas.width / 2;
    this.baseY = localCanvas.height / 2;
  }
  flyToreload() {
    if (this.isReloading && this.isAlive) {
      if (this.scale > this.targetScale) {
        this.scale -= this.shrinkRate;
        if (this.scale < this.targetScale) this.scale = this.targetScale;
      } else {
      }
      if (this.rotation < Math.PI) {
        this.rotation += this.rotationSpeed;
        if (this.rotation > Math.PI) this.rotation = Math.PI;
      }
      this.baseY += this.flyBackSpeed + localLayer.speedY;
      this.baseX += localLayer.speedX;
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frameX = (this.frameX + 1) % this.frames;
        this.frameTimer = 0;
      }
    }
  }
  draw(ctx) {
    if (this.isReloading) {
      droneDraw(ctx, this, 0, this.scale);
    }
    if (!this.isAlive) {
      droneDraw(ctx, this, this.frameHeight, this.destructionScale);
    }
    function droneDraw(ctx, drone, frameY, scale) {
      ctx.save();

      if (!drone.isAlive && drone.fixedX !== null && drone.fixedY !== null) {
        // Якщо мертвий — малюємо зафіксоване положення
        ctx.translate(drone.fixedX, drone.fixedY);
      } else {
        // Якщо живий — стандартне положення
        ctx.translate(drone.baseX, drone.baseY);
      }

      ctx.rotate(drone.rotation);
      ctx.scale(scale, scale);
      ctx.drawImage(
        drone.image,
        drone.frameX * drone.frameWidth,
        frameY,
        drone.frameWidth,
        drone.frameHeight,
        -drone.frameWidth / 2,
        -drone.frameHeight / 2,
        drone.frameWidth,
        drone.frameHeight
      );
      ctx.restore();
    }
    function droneDraw(ctx, drone, frameY, scale) {
      ctx.save();
      ctx.translate(drone.baseX, drone.baseY);
      ctx.rotate(drone.rotation);
      ctx.scale(scale, scale);
      ctx.drawImage(
        drone.image,
        drone.frameX * drone.frameWidth,
        frameY,
        drone.frameWidth,
        drone.frameHeight,
        -drone.frameWidth / 2,
        -drone.frameHeight / 2,
        drone.frameWidth,
        drone.frameHeight
      );
      ctx.restore();
    }
  }

  countBombs() {
    return Object.values(this.bombStorage).reduce(
      (sum, bombs) => sum + bombs.length,
      0
    );
  }

  isEmpty() {
    return this.countBombs() === 0;
  }

  reloading(forseReload = false) {
    if ((this.isEmpty() && this.isAlive) || forseReload) {
      this.isReloading = true;
      this.reloadStartTime = Date.now();
      setTimeout(() => {
        this.isReloading = false;
        this.reloadStartTime = null;
        this.isActive = true;
        this.bombStorage = this.initialBombStorage;
        this.baseX = 0;
        this.baseY = 0;
        this.scale = 1.5;
        this.rotation = 0;
        this.hp = this.initialHP;
      }, this.reloadingTime);
    }
  }

  destruction() {
    if (this.hp <= 0) {
      this.isAlive = false;
      this.isReloading = false;
      this.isActive = false;
    }
    if (!this.isAlive) {
      if (this.destructionScale < 0.9) {
        this.baseX += localLayer.speedX;
        this.baseY += localLayer.speedY;
      }
      if (this.destructionScale > 0.082) {
        this.destructionScale *= 1 - this.shrinkRate;
        this.rotation += this.rotationSpeed;
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
          this.frameX = (this.frameX + 1) % this.frames;
          this.frameTimer = 0;
        }
      } else {
        // після зменшення - просто рухаємо по карті
        // this.baseX += localLayer.speedX;
        // this.baseY += localLayer.speedY;
      }
    }
  }

  cahngeVisibility() {
    this.visibility = Math.max(
      this.initialVisibility,
      Math.min(this.visibility + this.initialVisibility * 4, 100)
    );
    setTimeout(() => {
      this.visibility = Math.max(
        this.initialVisibility,
        Math.min(this.visibility / 2, 100)
      );
    }, 25000);
  }
  addBomb(BombClass) {
    const weight = BombClass.weight;
    const type = BombClass.type;

    if (this.remainingCapacity >= weight) {
      this.bombStorage[type].push("bomb");
      this.remainingCapacity -= weight;
    }
  }
}

export function createSmallDrone() {
  return new Drone(smallDroneImage, 0.9, 2, 4, 352, 301);
}
// export function createMediumDrone() {
//   return new Drone(mediumDroneImage, 2, 4, "mediumDrone");
// }
// export function createBigDrone() {
//   return new Drone(bigDroneImage, 8, 10, "bigDrone");
// }
