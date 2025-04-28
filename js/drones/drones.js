import { basePath } from "../utils/basePath.js";

let smallDroneImage = new Image();
smallDroneImage.src = `${basePath}assets/img/drones/smallDroneAnimation.png`;
let mediumDroneImage = new Image();
mediumDroneImage.src = `${basePath}assets/img/drones/mediumDroneAnimation.png`;
let bigDroneImage = new Image();
bigDroneImage.src = `${basePath}assets/img/drones/bigDroneAnimation.png`;
class Drone {
  constructor() {
    this.image = smallDroneImage;
    this.frameWidth = 352;
    this.frameHeight = 301;
    this.capacity = 0.8; // Загальна місткість
    this.remainingCapacity = 0.8; // Залишкова місткість
    this.hp = 3;
    this.initialHP = 3;
    this.destructionScale = 1;
    this.isAllowed = true;
    this.isActive = false;
    this.isReloading = false;
    this.isAlive = true;
    this.initialBombStorage = {
      frag: [],
      he: [],
      shaped: [],
      footMine: [],
      tankMine: [],
      magnetMine: [],
      shrapnel: [],
      cluster: [],
      shapedCluster: [],
    };
    this.bombStorage = {
      frag: [],
      he: [],
      shaped: [],
      footMine: [],
      tankMine: [],
      magnetMine: [],
      shrapnel: [],
      cluster: [],
      shapedCluster: [],
    };
    this.reloadingTime = 1000 * 60 * 1;
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
    this.visibility = 4;
    this.initialVisibility = 4;
    this.speed = 1.3;
    this.hangers = 10;
    this.initialHangers = 10;
    this.type = "small";
    this.imageScale = 1;
    this.size = 1;
  }
  resetPosition() {
    this.scale = 1;
    this.rotation = 0;
    this.baseX = localCanvas.width / 2;
    this.baseY = localCanvas.height / 2;
  }
  flyToreload(layer) {
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
      this.baseY += this.flyBackSpeed + layer.speedY;
      this.baseX += layer.speedX;
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frameX = (this.frameX + 1) % this.frames;
        this.frameTimer = 0;
      }
    }
  }
  draw(ctx) {
    if (this.isReloading) {
      droneDraw(ctx, this, 0, this.scale, this.imageScale);
    }
    if (!this.isAlive) {
      droneDraw(
        ctx,
        this,
        this.frameHeight,
        this.destructionScale,
        this.imageScale
      );
    }
    function droneDraw(ctx, drone, frameY, scale, imageScale) {
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
        (-drone.frameWidth / 2) * imageScale,
        (-drone.frameHeight / 2) * imageScale,
        drone.frameWidth * imageScale,
        drone.frameHeight * imageScale
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
    if (this.isReloading || !this.isAlive) return; // якщо вже перезаряджається або мертвий — нічого не робимо

    if (this.isEmpty() || forseReload) {
      this.isReloading = true;
      this.reloadStartTime = Date.now();
      setTimeout(() => {
        this.isReloading = false;
        this.reloadStartTime = null;
        this.isActive = true;
        this.bombStorage = this.cloneBombStorage(this.initialBombStorage);
        this.baseX = 0;
        this.baseY = 0;
        this.scale = 1.5;
        this.rotation = 0;
        this.hp = this.initialHP;
      }, this.reloadingTime);
    }
  }

  destruction(layer) {
    if (this.hp <= 0) {
      this.isAlive = false;
      this.isReloading = false;
      this.isActive = false;
      this.fixedX = this.baseX;
      this.fixedY = this.baseY;
    }
    if (!this.isAlive) {
      if (this.destructionScale < 0.9) {
        this.baseX += layer.speedX;
        this.baseY += layer.speedY;
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

    if (this.remainingCapacity >= weight && this.hangers >= 1) {
      this.bombStorage[type].push("bomb");
      this.remainingCapacity -= weight;
      this.hangers--;
    }
  }
  cloneBombStorage(storage) {
    return {
      frag: [...(storage.frag || [])],
      he: [...(storage.he || [])],
      shaped: [...(storage.shaped || [])],
      footMine: [...(storage.footMine || [])],
      tankMine: [...(storage.tankMine || [])],
      magnetMine: [...(storage.magnetMine || [])],
      shrapnel: [...(storage.shrapnel || [])],
      cluster: [...(storage.cluster || [])],
      shapedCluster: [...(storage.shapedCluster || [])],
    };
  }
}
export class SmallDrone extends Drone {
  constructor(gameData) {
    super();
    this.image = smallDroneImage;
    this.capacity = 0.8 + gameData.smallDroneCapacityUpgrade * 0.04;
    this.remainingCapacity = 0.8 + gameData.smallDroneCapacityUpgrade * 0.04;
    this.hp = 3 + gameData.smallDroneHPUpgrade;
    this.initialHP = 3 + gameData.smallDroneHPUpgrade;
    this.visibility = 4;
    this.initialVisibility = 4;
    this.frameWidth = 352;
    this.frameHeight = 301;
    this.speed = 1.3 + gameData.smallDroneSpeedUpgrade * 0.1;
    this.hangers = 10;
    this.initialHangers = 10;
    this.type = "small";
  }
}

export class MediumDrone extends Drone {
  constructor(gameData) {
    super();
    this.image = mediumDroneImage;
    this.capacity = 1.6 + gameData.mediumDroneCapacityUpgrade * 0.08;
    this.remainingCapacity = 1.6 + gameData.mediumDroneCapacityUpgrade * 0.08;
    this.hp = 5 + gameData.mediumDroneHPUpgrade;
    this.initialHP = 5 + gameData.mediumDroneHPUpgrade;
    this.visibility = 6;
    this.initialVisibility = 6;
    this.frameWidth = 1024;
    this.frameHeight = 1024;
    this.speed = 1 + gameData.mediumDroneSpeedUpgrade * 0.06;
    this.hangers = 16;
    this.initialHangers = 16;
    this.type = "medium";
    this.imageScale = 0.5;
    this.size = 1.5;
  }
}

export class BigDrone extends Drone {
  constructor(gameData) {
    super();
    this.image = bigDroneImage;
    this.capacity = 6.4 + gameData.bigDroneCapacityUpgrade * 0.2;
    this.remainingCapacity = 6.4 + gameData.bigDroneCapacityUpgrade * 0.2;
    this.hp = 9 + gameData.bigDroneHPUpgrade;
    this.initialHP = 9 + gameData.bigDroneHPUpgrade;
    this.visibility = 10;
    this.initialVisibility = 10;
    this.frameWidth = 250;
    this.frameHeight = 250;
    this.speed = 0.8 + gameData.bigDroneSpeedUpgrade * 0.04;
    this.hangers = 30;
    this.initialHangers = 30;
    this.type = "big";
    this.imageScale = 3;
    this.size = 4;
  }
}
