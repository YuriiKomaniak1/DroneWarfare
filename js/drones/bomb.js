import { basePath } from "../utils/basePath.js";
import {
  footMineIcon,
  tankMineIcon,
  magnetMineIcon,
} from "../gameElements/droneIcons.js";
export const fragBombImage = new Image();
fragBombImage.src = `${basePath}assets/img/bombs/fragBomb.png`;
export const heBombImage = new Image();
heBombImage.src = `${basePath}assets/img/bombs/heBomb.png`;
export const shapedBombImage = new Image();
shapedBombImage.src = `${basePath}assets/img/bombs/shapedBomb.png`;
export const footMineImage = new Image();
footMineImage.src = `${basePath}assets/img/bombs/footMine.png`;
export const tankMineImage = new Image();
tankMineImage.src = `${basePath}assets/img/bombs/tankMine.png`;
export const magnetMineImage = new Image();
magnetMineImage.src = `${basePath}assets/img/bombs/magnetMine.png`;
export const shrapnelBombImage = new Image();
shrapnelBombImage.src = `${basePath}assets/img/bombs/shrapnelBomb.png`;
export const clusterBombImage = new Image();
clusterBombImage.src = `${basePath}assets/img/bombs/clusterBomb.png`;
export const shapedClusterBombImage = new Image();
shapedClusterBombImage.src = `${basePath}assets/img/bombs/shapedClusterBomb.png`;
export const clusterSubmunitionImage = new Image();
clusterSubmunitionImage.src = `${basePath}assets/img/bombs/clusterSubmunition.png`;
let imageExplosion = new Image();
imageExplosion.src = `${basePath}assets/img/effects/smallExplosion.png`;
let shrapnelExplosion = new Image();
shrapnelExplosion.src = `${basePath}assets/img/effects/shrapnelExplosion.png`;
let clusterExplosion = new Image();
clusterExplosion.src = `${basePath}assets/img/effects/vehicleExplosion.png`;

import { switchToNextAvailableBomb } from "../logic/controls.js";
const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};
console.log(JSON.parse(localStorage.getItem("Volume")));
const difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {
  level: "medium",
  accuracy: 1,
  weight: 1,
};
export class Bomb {
  static weight = 0.1; // За замовчуванням
  static type = "default"; // Тип за замовчуванням
  constructor(x, y, layer, ctx, gameData) {
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
    this.wheelWidth = 0.5;
    this.randomRotation = Math.random() * Math.PI * 2;
    this.clusterDropped = false;
    this.gameData = gameData;
    this.explosionSoundStarted = false;
    this.explosionSound = new Audio("assets/audio/drone/frag.mp3");
    this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
  }

  drop(bombs, layer1) {
    if (!this.exploded && !this.deployed) {
      this.velocityX *= this.friction ** 1.6;
      this.velocityY *= this.friction ** 1.6;

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
        if (this.class == "bomb") {
          this.exploded = true;
          if (!this.explosionSoundStarted) {
            this.explosionSound.volume = 1 * volumeSettings.soundVolume;
            console.log();
            this.explosionSound.play().catch((e) => {
              console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
            });
            this.explosionSoundStarted = true;
          }
        }
        if (this.class == "mine") this.deployed = true;
      }
      if (
        (this.type === "cluster" || this.type === "shapedCluster") &&
        this.scale <= this.initialScale * 0.3 &&
        !this.clusterDropped
      ) {
        this.exploded = true;
        if (!this.explosionSoundStarted) {
          this.explosionSound.play().catch((e) => {
            console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
          });
          this.explosionSoundStarted = true;
        }
        this.dropClusterBombs(bombs, layer1);
        this.clusterDropped = true;
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
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.randomRotation);
      this.ctx.drawImage(this.mineImage, -3, -6, 6, 12); // малюємо з центру
      this.ctx.restore();
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
  isOnRoof() {
    const globalX = this.x - this.layer.x;
    const globalY = this.y - this.layer.y;

    const onRoof = this.gameData.bombObstacles.some(
      (ob) =>
        globalX >= ob.x &&
        globalX <= ob.x + ob.width &&
        globalY >= ob.y &&
        globalY <= ob.y + ob.height
    );

    if (onRoof) console.log("🧱 Бомба на даху");
    return onRoof;
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
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
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
  checkArmorPenetration(vehicle, vehicles, gameData, NavigationGrid) {
    let success = true;
    for (let i = 0; i < vehicle.armor; i++) {
      if (Math.random() > this.armorPenetration) {
        success = false;
        break;
      }
    }
    if (success) vehicle.isBurningF(vehicles, gameData, NavigationGrid);
    return vehicle;
  }
  checkHEArmorPenetration(AP, vehicle) {
    let success = true;
    for (let i = 0; i < vehicle.armor; i++) {
      if (Math.random() > AP) {
        success = false;
        break;
      }
    }

    return success;
  }
  isInTrench(x, y) {
    for (const trench of this.gameData.trenches) {
      if (
        x >= trench.x &&
        x <= trench.x + trench.width &&
        y >= trench.y &&
        y <= trench.y + trench.height
      ) {
        return true;
      }
    }
    return false;
  }
}

// осколкова бомба
export class FragBomb extends Bomb {
  static weight = 0.13 * difficulty.weight;
  static type = "frag";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = fragBombImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 64;
    this.explosionSound = new Audio("assets/audio/drone/frag.mp3");
  }

  checkCollision(enemy) {
    if (this.isOnRoof()) return false;

    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(enemy.baseX, enemy.baseY);
      if (bombInTrench !== enemyInTrench) return false;
    }

    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    let hitStatus = false;
    if (!enemy.vehicle) {
      if (distance < 20 + this.gameData.fragBombUpgrade) {
        hitStatus = true;
      } else if (
        distance < 40 + this.gameData.fragBombUpgrade * 2 &&
        !enemy.crawl
      ) {
        if (Math.random() > 0.2 - this.gameData.fragBombUpgrade * 0.01)
          hitStatus = true;
      } else if (
        distance < 50 + this.gameData.fragBombUpgrade * 2 &&
        !enemy.crawl
      ) {
        if (Math.random() > 0.3 - this.gameData.fragBombUpgrade * 0.015)
          hitStatus = true;
      } else if (
        distance < 90 + this.gameData.fragBombUpgrade * 2 &&
        !enemy.crawl
      ) {
        if (Math.random() > 0.5 - this.gameData.fragBombUpgrade * 0.015)
          hitStatus = true;
      } else if (
        distance < 140 + this.gameData.fragBombUpgrade * 3 &&
        !enemy.crawl
      ) {
        if (Math.random() > 0.85 - this.gameData.fragBombUpgrade * 0.02)
          hitStatus = true;
      }
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 40 + this.gameData.fragBombUpgrade) {
        if (Math.random() > 0.85 - this.gameData.fragBombUpgrade * 0.015)
          hitStatus = true;
      } else if (distance < 50 + this.gameData.fragBombUpgrade * 2) {
        if (Math.random() > 0.9 - this.gameData.fragBombUpgrade * 0.015)
          hitStatus = true;
      } else if (distance < 90 + this.gameData.fragBombUpgrade * 2) {
        if (Math.random() > 0.92 - this.gameData.fragBombUpgrade * 0.015)
          hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(vehicle.baseX, vehicle.baseY);
      if (bombInTrench !== enemyInTrench) return vehicle;
    }
    if (vehicle.armor === 0) {
      if (
        this.distanceToVehicle(0 + this.gameData.fragBombUpgrade, vehicle) &&
        Math.random() > 0.9 - this.gameData.fragBombUpgrade * 0.015
      ) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (
        this.distanceToVehicle(
          30 + this.gameData.fragBombUpgrade * 2,
          vehicle
        ) &&
        Math.random() > 0.8 - this.gameData.fragBombUpgrade * 0.015
      ) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
      return vehicle;
    }
  }
}

// фУГАСНА БОМБА
export class HeBomb extends Bomb {
  static weight = 0.16 * difficulty.weight;
  static type = "he";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = heBombImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 100;
    this.armorPenetration = 0.55;
    this.explosionSound = new Audio("assets/audio/drone/he.mp3");
  }

  checkCollision(enemy) {
    if (this.isOnRoof()) return false;

    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(enemy.baseX, enemy.baseY);
      if (bombInTrench !== enemyInTrench) return false;
    }

    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 50 + this.gameData.heBombUpgrade * 2;
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 50 + this.gameData.heBombUpgrade * 2) {
        if (Math.random() > 0.6) hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(vehicle.baseX, vehicle.baseY);
      if (bombInTrench !== enemyInTrench) return vehicle;
    }
    if (vehicle.armor === 0) {
      if (this.distanceToVehicle(this.gameData.heBombUpgrade, vehicle)) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (
        this.distanceToVehicle(40 + this.gameData.heBombUpgrade, vehicle) &&
        Math.random() > 0.3 - this.gameData.heBombUpgrade * 0.01
      ) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
    } else {
      if (
        this.distanceToVehicle(0, vehicle) &&
        this.checkHEArmorPenetration(this.armorPenetration, vehicle)
      ) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (
        this.distanceToVehicle(20, vehicle) &&
        this.checkHEArmorPenetration(this.armorPenetration + 0.1, vehicle)
      ) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
    }
    return vehicle;
  }
}

// Кумулятивна бомба
export class ShapedBomb extends Bomb {
  static weight = 0.14 * difficulty.weight;
  static type = "shaped";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = shapedBombImage;
    this.imageExplosion = imageExplosion;
    this.type = "shaped";
    this.explosionScale = 30;
    this.armorPenetration = 0.9 + this.gameData.shapedBombUpgrade * 0.01;
    this.explosionSound = new Audio("assets/audio/drone/shaped.mp3");
  }

  checkCollision(enemy) {
    if (this.isOnRoof()) return false;
    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 15;
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.distanceToVehicle(0, vehicle)) {
      this.checkArmorPenetration(vehicle, vehicles, gameData, NavigationGrid);
    }
    return vehicle;
  }
}

// Протипіхотна міна
export class FootMine extends Bomb {
  static weight = 0.075 * difficulty.weight;
  static type = "footMine";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = footMineImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 20;
    this.mineImage = footMineIcon;
    this.class = "mine";
    this.spread = 3.5;
    this.type = this.constructor.type;
    this.explosionSound = new Audio("assets/audio/drone/footMine.mp3");
  }
  checkMineCollision(enemy) {
    if (this.isOnRoof()) return false;
    if (
      Math.hypot(this.x - enemy.x, this.y - enemy.y) < 9 &&
      !enemy.dead &&
      !enemy.vehicle
    ) {
      if (!this.explosionSoundStarted) {
        this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
        this.explosionSound.play();
        this.explosionSoundStarted = true;
      }
      enemy.dead = true;
      enemy.deathFrameIndex = 0;
      this.exploded = true;
      this.deployed = false;
    }
    return enemy;
  }
  checkMineEffect(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.checkMineUnderWheels(vehicle)) {
      if (!this.explosionSoundStarted) {
        this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
        console.log("🔊 Гучність міни:", this.explosionSound.volume);
        this.explosionSound.play().catch((e) => {
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
        });
        this.explosionSoundStarted = true;
      }
      this.exploded = true;
      this.deployed = false;
      if (vehicle.armor === 0 && Math.random() > 0.75)
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      return vehicle;
    }
  }
}

// фугасна міна
export class TankMine extends Bomb {
  static weight = 0.35 * difficulty.weight;
  static type = "tankMine";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = tankMineImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 100;
    this.mineImage = tankMineIcon;
    this.class = "mine";
    this.spread = 3.5;
    this.type = this.constructor.type;
    this.explosionSound = new Audio("assets/audio/drone/tankMine.mp3");
  }
  checkMineCollision(enemy) {
    if (this.isOnRoof()) return false;
    return false;
  }
  checkMineEffect(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.checkMineUnderWheels(vehicle)) {
      if (!this.explosionSoundStarted) {
        this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
        this.explosionSound.play().catch((e) => {
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
        });
        this.explosionSoundStarted = true;
      }
      this.exploded = true;
      this.deployed = false;
      if (vehicle.armor === 0 || Math.random() > 0.5 + vehicle.armor / 10) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (Math.random() > vehicle.armor / 12) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
      return vehicle;
    }
  }
}
// магнітна міна
export class MagnetMine extends Bomb {
  static weight = 0.8 * difficulty.weight;
  static type = "magnetMine";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = magnetMineImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 50;
    this.mineImage = magnetMineIcon;
    this.class = "mine";
    this.spread = 3.5;
    this.type = this.constructor.type;
    this.armorPenetration = 0.95 + this.gameData.magnetMineUpgrade * 0.01;
    this.explosionSound = new Audio("assets/audio/drone/shaped.mp3");
  }
  checkMineCollision(enemy) {
    if (this.isOnRoof()) return false;
    return false;
  }
  checkMineUnderWheels(vehicle) {
    if (this.isOnRoof()) return false;
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

    // 4. Перевірка:
    const isInsideLength = Math.abs(localY) <= halfHeight;
    const isInsideWidth = Math.abs(localX) <= halfWidth;

    return isInsideLength && isInsideWidth;
  }
  checkMineEffect(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.checkMineUnderWheels(vehicle)) {
      if (!this.explosionSoundStarted) {
        this.explosionSound.play().catch((e) => {
          this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
        });
        this.explosionSoundStarted = true;
      }
      this.exploded = true;
      this.deployed = false;
      this.checkArmorPenetration(vehicle, vehicles, gameData, NavigationGrid);
    }
    return vehicle;
  }
}
// шрапнельна бомба
export class ShrapnelBomb extends Bomb {
  static weight = 0.22 * difficulty.weight;
  static type = "shrapnel";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = shrapnelBombImage;
    this.imageExplosion = shrapnelExplosion;
    this.explosionScale = 260;
    this.type = this.constructor.type;
    this.imageWidth = 750;
    this.imageHeight = 750;
    this.frames = 9;
    this.explosionSound = new Audio("assets/audio/drone/shrapnel.mp3");
  }

  checkCollision(enemy) {
    if (
      this.isInTrench(enemy.baseX, enemy.baseY) &&
      this.gameData.currentMission === 12
    )
      return false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    let hitStatus = false;
    if (!enemy.vehicle) {
      if (distance < 40 + this.gameData.shrapnelBombUpgrade) {
        if (Math.random() > 0.1 - this.gameData.shrapnelBombUpgrade * 0.01)
          hitStatus = true;
      } else if (distance < 50 + this.gameData.shrapnelBombUpgrade * 2) {
        if (Math.random() > 0.25 - this.gameData.shrapnelBombUpgrade * 0.015)
          hitStatus = true;
      } else if (distance < 80 + this.gameData.shrapnelBombUpgrade * 2) {
        if (Math.random() > 0.45 - this.gameData.shrapnelBombUpgrade * 0.015)
          hitStatus = true;
      } else if (distance < 120 + this.gameData.shrapnelBombUpgrade * 2) {
        if (Math.random() > 0.6 - this.gameData.shrapnelBombUpgrade * 0.015)
          hitStatus = true;
      } else if (distance < 160 + this.gameData.shrapnelBombUpgrade * 3) {
        if (Math.random() > 0.75 - this.gameData.shrapnelBombUpgrade * 0.015)
          hitStatus = true;
      }
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 40 + this.gameData.shrapnelBombUpgrade) {
        if (Math.random() > 0.65 - this.gameData.shrapnelBombUpgrade * 0.02)
          hitStatus = true;
      } else if (distance < 70 + this.gameData.shrapnelBombUpgrade) {
        if (Math.random() > 0.75 - this.gameData.shrapnelBombUpgrade * 0.02)
          hitStatus = true;
      } else if (distance < 110 + this.gameData.shrapnelBombUpgrade) {
        if (Math.random() > 0.9 - this.gameData.shrapnelBombUpgrade * 0.02)
          hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (vehicle.armor === 0) {
      if (
        this.distanceToVehicle(
          10 + this.gameData.shrapnelBombUpgrade * 2,
          vehicle
        ) &&
        Math.random() > 0.75 - this.gameData.shrapnelBombUpgrade * 0.02
      ) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (
        this.distanceToVehicle(
          50 + this.gameData.shrapnelBombUpgrade * 2,
          vehicle
        ) &&
        Math.random() > 0.65 - this.gameData.shrapnelBombUpgrade * 0.02
      ) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
      return vehicle;
    }
  }
}
// кластерна амуніція фугас
export class HeClusterMunition extends Bomb {
  static weight = 0.07 * difficulty.weight;
  static type = "clusterMunition";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = clusterSubmunitionImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 60;
    this.scale = 0.3;
    this.shrinkRate = 1.003;
    this.armorPenetration = 0.5;
    this.explosionSound = new Audio("assets/audio/drone/frag.mp3");
    this.explosionSound.volume = 0.45 * volumeSettings.soundVolume;
  }
  drop() {
    if (!this.exploded && !this.deployed) {
      // додатково рухаємо по заданій швидкості

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
        this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
        this.explosionSound.play().catch((e) => {
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
        });
        this.explosionSoundStarted = true;
      }
    }
  }
  checkCollision(enemy) {
    if (this.isOnRoof()) return false;

    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(enemy.baseX, enemy.baseY);
      if (bombInTrench !== enemyInTrench) return false;
    }

    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 48;
    } else if (enemy.vehicle.armor === 0) {
      if (distance < 46) {
        if (Math.random() > 0.7) hitStatus = true;
      }
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.gameData.trenches) {
      const bombInTrench = this.isInTrench(
        this.x - this.layer.x,
        this.y - this.layer.y
      );
      const enemyInTrench = this.isInTrench(vehicle.baseX, vehicle.baseY);
      if (bombInTrench !== enemyInTrench) return vehicle;
    }
    if (vehicle.armor === 0) {
      if (this.distanceToVehicle(0, vehicle)) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (this.distanceToVehicle(32, vehicle) && Math.random() > 0.3) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
    } else {
      if (
        this.distanceToVehicle(0, vehicle) &&
        this.checkHEArmorPenetration(this.armorPenetration, vehicle)
      ) {
        vehicle.isBurningF(vehicles, gameData, NavigationGrid);
      } else if (
        this.distanceToVehicle(10, vehicle) &&
        this.checkHEArmorPenetration(this.armorPenetration + 0.05, vehicle)
      ) {
        vehicle.isStoppedF(vehicles, gameData, NavigationGrid);
      }
    }
    return vehicle;
  }
}
// кластерна амуніція кумулятивна
export class ShapedClusterMunition extends Bomb {
  static weight = 0.07 * difficulty.weight;
  static type = "clusterMunition";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = shapedBombImage;
    this.imageExplosion = imageExplosion;
    this.explosionScale = 30;
    this.scale = 0.3;
    this.shrinkRate = 1.003;
    this.armorPenetration = 0.87 + this.gameData.shapedBombUpgrade * 0.01;
    this.explosionSound.volume = 0.65 * volumeSettings.soundVolume;
    this.explosionSound = new Audio("assets/audio/drone/shaped.mp3");
    this.explosionSound.volume = 0.45 * volumeSettings.soundVolume;
  }
  drop() {
    if (!this.exploded && !this.deployed) {
      // додатково рухаємо по заданій швидкості

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
        this.explosionSound.play().catch((e) => {
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
        });
        this.explosionSoundStarted = true;
      }
    }
  }
  checkCollision(enemy) {
    if (this.isOnRoof()) return false;
    let hitStatus = false;
    const distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
    if (!enemy.vehicle) {
      hitStatus = distance < 12;
    }
    return hitStatus;
  }
  checkVehicleCollision(vehicle, vehicles, gameData, NavigationGrid) {
    if (this.isOnRoof()) return vehicle;
    if (this.distanceToVehicle(0, vehicle)) {
      this.checkArmorPenetration(vehicle, vehicles, gameData, NavigationGrid);
    }
    return vehicle;
  }
}
//  фугасна кластерна бомба
export class ClusterBomb extends Bomb {
  static weight = 1.6 * difficulty.weight;
  static type = "cluster";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = clusterBombImage;
    this.imageExplosion = clusterExplosion;
    this.explosionScale = 120;
    this.type = this.constructor.type;
    this.imageWidth = 250;
    this.imageHeight = 250;
    this.frames = 10;
    this.explosionSound = new Audio("assets/audio/drone/cluster.mp3");
  }
  dropClusterBombs(bombs, layer1) {
    for (let i = 0; i < 26 + this.gameData.clusterBombUpgrade; i++) {
      const delay = Math.random() * 1800; // випадкова затримка до 0.5 секунди

      setTimeout(() => {
        const theta = Math.random() * 2 * Math.PI; // випадковий напрямок
        const speed = 0.15 + Math.random() * 0.9;

        const bomb = new HeClusterMunition(
          this.x,
          this.y,
          layer1,
          this.ctx,
          this.gameData
        );

        // додаємо швидкість у випадковому напрямку
        bomb.velocityX = Math.cos(theta) * speed;
        bomb.velocityY = Math.sin(theta) * speed;

        bombs.push(bomb);
      }, delay);
    }
  }

  checkCollision(enemy) {
    return false;
  }
  checkVehicleCollision(vehicle) {
    return vehicle;
  }
}
//  протитанкова кластерна бомба
export class ShapedClusterBomb extends Bomb {
  static weight = 1.8 * difficulty.weight;
  static type = "shapedCluster";
  constructor(x, y, layer, ctx, gameData) {
    super(x, y, layer, ctx, gameData);
    this.image = shapedClusterBombImage;
    this.imageExplosion = clusterExplosion;
    this.explosionScale = 120;
    this.type = this.constructor.type;
    this.imageWidth = 250;
    this.imageHeight = 250;
    this.frames = 10;
    this.explosionSound = new Audio("assets/audio/drone/cluster.mp3");
  }
  dropClusterBombs(bombs, layer1) {
    for (let i = 0; i < 16; i++) {
      const delay = Math.random() * 1800; // випадкова затримка до 0.5 секунди

      setTimeout(() => {
        const theta = Math.random() * 2 * Math.PI; // випадковий напрямок
        const speed = 0.15 + Math.random() * 0.9;

        const bomb = new HeClusterMunition(
          this.x,
          this.y,
          layer1,
          this.ctx,
          this.gameData
        );

        // додаємо швидкість у випадковому напрямку
        bomb.velocityX = Math.cos(theta) * speed;
        bomb.velocityY = Math.sin(theta) * speed;

        bombs.push(bomb);
      }, delay);
    }
    for (let i = 0; i < 14 + this.gameData.shapedClusterBombUpgrade; i++) {
      const delay = Math.random() * 1500; // випадкова затримка до 0.5 секунди

      setTimeout(() => {
        const theta = Math.random() * 2 * Math.PI; // випадковий напрямок
        const speed = 0.15 + Math.random() * 0.9;

        const bomb = new ShapedClusterMunition(
          this.x,
          this.y,
          this.layer,
          this.ctx,
          this.gameData
        );

        // додаємо швидкість у випадковому напрямку
        bomb.velocityX = Math.cos(theta) * speed;
        bomb.velocityY = Math.sin(theta) * speed;

        bombs.push(bomb);
      }, delay);
    }
  }

  checkCollision(enemy) {
    return false;
  }
  checkVehicleCollision(vehicle) {
    return vehicle;
  }
}

export function dropBomb(
  currentDrone,
  selectionState,
  layer1,
  ctx,
  droneScope,
  bombs,
  gameData
) {
  if (!currentDrone.isActive) {
    console.warn("🚨 Немає активного дрона!");
    return;
  }
  2;
  let bombArray = null;
  let newBomb = null;
  const x = droneScope.x + droneScope.width / 2;
  const y = droneScope.y + droneScope.height / 2;
  const dropSound = new Audio("assets/audio/drone/bomb-drop.wav");
  dropSound.volume = 0.5 * volumeSettings.soundVolume;
  dropSound.play().catch((e) => {
    console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
  });

  switch (selectionState.selectedBombType) {
    case "frag":
      bombArray = currentDrone.bombStorage.frag;
      newBomb = new FragBomb(x, y, layer1, ctx, gameData);
      break;
    case "he":
      bombArray = currentDrone.bombStorage.he;
      newBomb = new HeBomb(x, y, layer1, ctx, gameData);
      break;
    case "shaped":
      bombArray = currentDrone.bombStorage.shaped;
      newBomb = new ShapedBomb(x, y, layer1, ctx, gameData);
      break;
    case "footMine":
      bombArray = currentDrone.bombStorage.footMine;
      newBomb = new FootMine(x, y, layer1, ctx, gameData);
      break;
    case "tankMine":
      bombArray = currentDrone.bombStorage.tankMine;
      newBomb = new TankMine(x, y, layer1, ctx, gameData);
      break;
    case "magnetMine":
      bombArray = currentDrone.bombStorage.magnetMine;
      newBomb = new MagnetMine(x, y, layer1, ctx, gameData);
      break;
    case "shrapnel":
      bombArray = currentDrone.bombStorage.shrapnel;
      newBomb = new ShrapnelBomb(x, y, layer1, ctx, gameData);
      break;
    case "cluster":
      bombArray = currentDrone.bombStorage.cluster;
      newBomb = new ClusterBomb(x, y, layer1, ctx, gameData);
      break;
    case "shapedCluster":
      bombArray = currentDrone.bombStorage.shapedCluster;
      newBomb = new ShapedClusterBomb(x, y, layer1, ctx, gameData);
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
