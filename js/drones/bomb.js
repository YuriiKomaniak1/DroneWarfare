import { basePath } from "../utils/basePath.js";
export let fragBombImage = new Image();
fragBombImage.src = `${basePath}assets/img/bombs/fragBomb.png`;
export let heBombImage = new Image();
heBombImage.src = `${basePath}assets/img/bombs/heBomb.png`;
export let shapedBombImage = new Image();
shapedBombImage.src = `${basePath}assets/img/bombs/shapedBomb.png`;
let imageExplosion = new Image();
imageExplosion.src = `${basePath}assets/img/bombs/smallExplosion.png`;
import { switchToNextAvailableBomb } from "../logic/controls.js";
export class Bomb {
  static weight = 0.1; // За замовчуванням
  static type = "default"; // Тип за замовчуванням
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
    this.spread = 1.8;
    this.exploded = false;
    this.friction = 0.997;
    this.shrinkRate = 1.009;
    this.velocityX = layer.speedX;
    this.velocityY = layer.speedY;
    this.armorPenetration = 0;
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

  distanceToVehicle(explosionRadius, vehicle) {
    const nearestX = Math.max(
      vehicle.x - (vehicle.width * vehicle.scale) / 2,
      Math.min(this.x, vehicle.x + (vehicle.width * vehicle.scale) / 2)
    );
    const nearestY = Math.max(
      vehicle.y - (vehicle.height * vehicle.scale) / 2,
      Math.min(this.y, vehicle.y + (vehicle.height * vehicle.scale) / 2)
    );

    const dx = this.x - nearestX;
    const dy = this.y - nearestY;

    return dx * dx + dy * dy <= explosionRadius * explosionRadius;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    return distance < 50; // базова перевірка
  }
  checkVehicleCollision(vehicle) {
    if (distanceToVehicle(10, vehicle)) {
      vehicle.isStopped = true;
      vehicle.bailOut();
      vehicle.isMoving = false;
      console.log(vehicle.isStopped);
      return vehicle;
    }
  }
}
export class FragBomb extends Bomb {
  static weight = 0.13;
  static type = "frag";
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = fragBombImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 64;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    let hitStatus = false;
    if (!enemy.vehicle) {
      if (distance < 20) {
        hitStatus = true;
      } else if (distance < 40 && !enemy.crawl) {
        if (Math.random() > 0.2) hitStatus = true;
      } else if (distance < 50 && !enemy.crawl) {
        if (Math.random() > 0.3) hitStatus = true;
      } else if (distance < 90 && !enemy.crawl) {
        if (Math.random() > 0.4) hitStatus = true;
      } else if (distance < 140 && !enemy.crawl) {
        if (Math.random() > 0.9) hitStatus = true;
      }
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 40) {
        if (Math.random() > 0.85) hitStatus = true;
      } else if (distance < 50) {
        if (Math.random() > 0.9) hitStatus = true;
      } else if (distance < 90) {
        if (Math.random() > 0.95) hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle) {
    if (vehicle.armor === 0) {
      if (this.distanceToVehicle(0, vehicle) && Math.random() > 0.9) {
        vehicle.isBurning = true;
      } else if (this.distanceToVehicle(30, vehicle) && Math.random() > 0.8) {
        vehicle.isStopped = true;
      }
      if (vehicle.isBurning || vehicle.isStopped) {
        vehicle.bailOut();
        vehicle.isMoving = false;
      }

      return vehicle;
    }
  }
}

// фУГАСНА БОМБА
export class HeBomb extends Bomb {
  static weight = 0.16;
  static type = "he";
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = heBombImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 100;
  }

  checkCollision(enemy) {
    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 50;
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 50) {
        if (Math.random() > 0.6) hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle) {
    if (vehicle.armor === 0) {
      if (this.distanceToVehicle(0, vehicle)) {
        vehicle.isBurning = true;
      } else if (this.distanceToVehicle(40, vehicle) && Math.random() > 0.2) {
        vehicle.isStopped = true;
      }
    } else if (
      this.distanceToVehicle(15, vehicle) &&
      Math.random() > 0.5 + vehicle.armor / 10
    ) {
      vehicle.isStopped = true;
    }

    if (vehicle.isBurning || vehicle.isStopped) {
      vehicle.bailOut();
      vehicle.isMoving = false;
    }
    return vehicle;
  }
}

// Кумулятивна бомба
export class ShapedBomb extends Bomb {
  static weight = 0.14;
  static type = "shaped";
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = shapedBombImage;
    this.imageExplosion = imageExplosion;
    this.type = "shaped";
    this.explosionScale = 30;
    this.armorPenetration = 0.9;
  }

  checkCollision(enemy) {
    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 15;
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle) {
    if (this.distanceToVehicle(0, vehicle)) {
      let success = true;
      for (let i = 0; i < vehicle.armor; i++) {
        if (Math.random() > this.armorPenetration) {
          success = false;
          break;
        }
      }
      if (success) {
        vehicle.isBurning = true;
        vehicle.bailOut();
        vehicle.isMoving = false;
      }
      return vehicle;
    }
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
      bombArray = currentDrone.bombStorage.frag;
      newBomb = new FragBomb(x, y, layer1, ctx);
      break;
    case "he":
      bombArray = currentDrone.bombStorage.he;
      newBomb = new HeBomb(x, y, layer1, ctx);
      break;
    case "shaped":
      bombArray = currentDrone.bombStorage.shaped;
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
