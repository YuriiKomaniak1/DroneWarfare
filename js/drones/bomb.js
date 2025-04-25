import { basePath } from "../utils/basePath.js";
import { footMineIcon } from "../gameElements/droneIcons.js";
export const fragBombImage = new Image();
fragBombImage.src = `${basePath}assets/img/bombs/fragBomb.png`;
export const heBombImage = new Image();
heBombImage.src = `${basePath}assets/img/bombs/heBomb.png`;
export const shapedBombImage = new Image();
shapedBombImage.src = `${basePath}assets/img/bombs/shapedBomb.png`;
export const footMineImage = new Image();
footMineImage.src = `${basePath}assets/img/bombs/footMine.png`;
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
    this.mineImage = null;
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
    this.deployed = false;
    this.class = "bomb";
    this.wheelWidth = 0.4;
  }

  drop() {
    if (!this.exploded && !this.deployed) {
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
        if (this.class == "bomb") this.exploded = true;
        if (this.class == "mine") this.deployed = true;
      }
    }
  }
  draw() {
    if (!this.exploded && !this.deployed) {
      this.ctx.drawImage(
        this.image,
        this.x - (150 * this.scale) / this.initialScale,
        this.y - (150 * this.scale) / this.initialScale,
        (this.width * this.scale) / this.initialScale,
        (this.height * this.scale) / this.initialScale
      );
    } else if (this.exploded) {
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
    } else if (this.deployed) {
      this.ctx.drawImage(this.mineImage, this.x - 2, this.y - 4, 8, 8);
      this.x += this.layer.speedX;
      this.y += this.layer.speedY;
    }
  }
  checkMineUnderWheels(vehicle) {
    // 1. Обчислюємо зсув міни відносно центра машини
    const dx = this.x - vehicle.x;
    const dy = this.y - vehicle.y;

    // 2. Обертаємо назад (вирівнюємо машину)
    const cos = Math.cos(-vehicle.rotation);
    const sin = Math.sin(-vehicle.rotation);

    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // 3. Параметри машини
    const halfWidth = ((vehicle.width * vehicle.scale) / 2) * 0.95;
    const halfHeight = ((vehicle.height * vehicle.scale) / 2) * 0.95;

    const wheelZoneWidth = halfWidth * this.wheelWidth;

    // 4. Перевірка:
    const isInsideLength = Math.abs(localY) <= halfHeight;
    const isInLeftWheelZone =
      localX >= -halfWidth && localX <= -halfWidth + wheelZoneWidth;
    const isInRightWheelZone =
      localX <= halfWidth && localX >= halfWidth - wheelZoneWidth;

    return isInsideLength && (isInLeftWheelZone || isInRightWheelZone);
  }
  checkMineEffect(vehicle) {}

  drawDebugWheels(ctx, vehicle) {
    const cos = Math.cos(-vehicle.rotation);
    const sin = Math.sin(-vehicle.rotation);

    const halfWidth = ((vehicle.width * vehicle.scale) / 2) * 0.95;
    const halfHeight = ((vehicle.height * vehicle.scale) / 2) * 0.95;
    const wheelZoneWidth = halfWidth * this.wheelWidth;

    // Координати вершин прямокутників для лівого і правого колесного сектору
    const corners = [
      // Ліва колесна зона
      [
        { x: -halfWidth, y: -halfHeight },
        { x: -halfWidth + wheelZoneWidth, y: -halfHeight },
        { x: -halfWidth + wheelZoneWidth, y: halfHeight },
        { x: -halfWidth, y: halfHeight },
      ],
      // Права колесна зона
      [
        { x: halfWidth - wheelZoneWidth, y: -halfHeight },
        { x: halfWidth, y: -halfHeight },
        { x: halfWidth, y: halfHeight },
        { x: halfWidth - wheelZoneWidth, y: halfHeight },
      ],
    ];

    ctx.save();
    ctx.translate(vehicle.x, vehicle.y);
    ctx.rotate(vehicle.rotation);

    ctx.strokeStyle = "lime"; // Яскравий зелений для дебагу
    ctx.lineWidth = 2;

    corners.forEach((zone) => {
      ctx.beginPath();
      ctx.moveTo(zone[0].x, zone[0].y);
      for (let i = 1; i < zone.length; i++) {
        ctx.lineTo(zone[i].x, zone[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    });

    ctx.restore();
  }

  distanceToVehicle(explosionRadius, vehicle) {
    // Різниця координат міни відносно центру машини
    const dx = this.x - vehicle.x;
    const dy = this.y - vehicle.y;

    // Обертаємо назад (щоб машина була "прямою")
    const cos = Math.cos(-vehicle.rotation);
    const sin = Math.sin(-vehicle.rotation);

    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Після повороту — перевіряємо в локальній системі координат
    const halfWidth = (vehicle.width * vehicle.scale) / 2;
    const halfHeight = (vehicle.height * vehicle.scale) / 2;

    const nearestX = Math.max(-halfWidth, Math.min(localX, halfWidth));
    const nearestY = Math.max(-halfHeight, Math.min(localY, halfHeight));

    const distX = localX - nearestX;
    const distY = localY - nearestY;

    return distX * distX + distY * distY <= explosionRadius * explosionRadius;
  }

  checkCollision(enemy) {
    const distance = Math.hypot(
      this.x - (enemy.x + 32),
      this.y - (enemy.y + 32)
    );
    return distance < 50; // базова перевірка
  }
  checkMineCollision(enemy) {
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    return distance < 1;
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

// осколкова бомба
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

// Протипіхотна міна
export class FootMine extends Bomb {
  static weight = 0.08;
  static type = "footMine";
  constructor(x, y, layer, ctx) {
    super(x, y, layer, ctx);
    this.image = footMineImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 20;
    this.mineImage = footMineIcon;
    this.class = "mine";
    this.spread = 3;
    this.type = this.constructor.type;
  }
  checkMineCollision(enemy) {
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    return distance < 4;
  }
  checkMineEffect(vehicle) {
    if (this.checkMineUnderWheels(vehicle)) {
      this.exploded = true;
      this.deployed = false;
      if (vehicle.armor === 0 && Math.random() > 0.75) {
        vehicle.isStopped = true;
        vehicle.bailOut();
        vehicle.isMoving = false;
        console.log(vehicle.isStopped);
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
    case "footMine":
      bombArray = currentDrone.bombStorage.footMine;
      newBomb = new FootMine(x, y, layer1, ctx);
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
