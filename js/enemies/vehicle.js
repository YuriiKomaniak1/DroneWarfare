const uralZImage = new Image();
uralZImage.src = "./assets/img/vehicles/uralZ.png";
const uralVImage = new Image();
uralVImage.src = "./assets/img/vehicles/uralV.png";
const gaz66ZImage = new Image();
gaz66ZImage.src = "./assets/img/vehicles/gaz66Z.png";
const gaz66VImage = new Image();
gaz66VImage.src = "./assets/img/vehicles/gaz66V.png";
const bmp2ZImage = new Image();
bmp2ZImage.src = "./assets/img/vehicles/bmp2Z.png";
const bmp2VImage = new Image();
bmp2VImage.src = "./assets/img/vehicles/bmp2V.png";
const bmp2turret = new Image();
bmp2turret.src = "./assets/img/vehicles/bmp2turret.png";
const bmp1ZImage = new Image();
bmp1ZImage.src = "./assets/img/vehicles/bmp1Z.png";
const bmp1VImage = new Image();
bmp1VImage.src = "./assets/img/vehicles/bmp1V.png";
const bmp1turret = new Image();
bmp1turret.src = "./assets/img/vehicles/bmp1turret.png";
const guntruckZImage = new Image();
guntruckZImage.src = "./assets/img/vehicles/guntruckZ.png";
const guntruckVImage = new Image();
guntruckVImage.src = "./assets/img/vehicles/guntruckV.png";
const guntruckturret = new Image();
guntruckturret.src = "./assets/img/vehicles/guntruckturret.png";
const tigrZImage = new Image();
tigrZImage.src = "./assets/img/vehicles/tigrZ.png";
const tigrVImage = new Image();
tigrVImage.src = "./assets/img/vehicles/tigrV.png";
const tigrturret = new Image();
tigrturret.src = "./assets/img/vehicles/tigrturret.png";
const gasSmokeImage = new Image();
gasSmokeImage.src = "./assets/img/effects/gasSmoke.png";
const vehicleExplosionImage = new Image();
vehicleExplosionImage.src = "./assets/img/effects/vehicleExplosion.png";
const vehicleFireImage = new Image();
vehicleFireImage.src = "./assets/img/effects/vehicleFire.png";
import { Rifleman, Crew, createRifleSquad } from "./enemy.js";
import { NavigationGrid, findPath } from "../logic/navigation.js";
import { VehicleSoundPlayer } from "../gameElements/sounds.js";
import { pauseState } from "../logic/gameloop.js";

export class Vehicle {
  static type = "default"; // Тип за замовчуванням
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    this.image = uralZImage;
    this.turretImage = bmp2turret;
    this.turretWidth = 200;
    this.hasTurret = false;
    this.hasGunner = false;
    this.turretOffsetX = 1;
    this.turretOffsetY = 1;
    this.turretScale = 1;
    this.baseX = x;
    this.baseY = y;
    this.x = 0;
    this.y = 0;
    this.scale = 0.65;
    this.width = 90;
    this.height = 224;
    this.layer = layer;
    this.ctx = ctx;
    this.imageExplosion = vehicleExplosionImage;
    this.imageFire = vehicleFireImage;
    this.imageGasSmoke = gasSmokeImage;
    this.frameTimer = 0;
    this.frameX = 0;
    this.gasSmokeFrames = 7;
    this.gassmokeframeSpeed = 8;
    this.gassmokeoffsetX = 0.5;
    this.gassmokeoffsetY = -0.1;
    this.vehiclefireFrames = 8;
    this.vehiclefireframeSpeed = 7;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = 0;
    this.vehiclefireImageWidth = 250;
    this.burningTime = Math.random() * 10000 + 10000;
    this.fireScale = 0.18;
    this.explosionScale = 0.8;
    this.explosionTimer = 0;
    this.explosionImageWidth = 250;
    this.explosionFrame = 0;
    this.expolosionFrames = 10;
    this.smokeScale = 0.6;
    this.isDestroyed = false;
    this.isStopped = false;
    this.isBurning = false;
    this.isMoving = true;
    this.speed = 0.5;
    this.originalSpeed = this.speed;
    this.rotation = 0;
    this.waypoints = waypoints;
    this.currentWaypointIndex = 0;
    this.shakeIntensity = 0.2;
    this.smokeTimer = 0;
    this.stoppedFrame = Math.ceil(Math.random() * 3);
    this.destroyedFrame = Math.ceil(Math.random() * 4) + 3;
    this.moveFrame = 0;
    this.path = [];
    this.currentPathIndex = 0;
    this.driver = null;
    this.gunner = null;
    this.cargo = [];
    this.navigaionsGrid = navigaionsGrid;
    this.armor = 0;
    this.score = 100;
    this.scored = false;
    this.fireDistance = 280;
    this.fireRate = 5;
    this.isFiring = false;
    this.fireTimer = 0;
    this.fireFrames = 6;
    this.fireFramespeed = 6;
    this.turretRotationAngle = 0;
    this.turretFrame = 0;
    this.turretFrameTimer = 0;
    this.droneSpottingChanse = 1;
    this.hasCrew = false; // Чи є екіпаж
    this.fireSound = new Audio("assets/audio/fire/machinegun.mp3");
    this.fireSound.loop = true;
    this.fireSound.volume = 0.3;
    this.fireSoundPlaying = false;
    this.fireSoundRateMin = 2;
    this.fireSoundRateMax = 3;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/truck.mp3",
      0.4
    );
  }

  update(vehicles, enemies, canvas, gameState, gameData, training) {
    // списування очок
    if (this.isBurning && !this.scored && !training) {
      gameData.score += this.score;
      gameData.winScore -= this.score;
      this.scored = true;
    }
    // Перехід до наступного вейпоінта
    if (
      (this.path.length === 0 || this.currentPathIndex >= this.path.length) &&
      !this.scored
    ) {
      this.currentWaypointIndex++;
      this.setPathToWaypoint(); //
      if (!this.isMoving && !this.isStopped && !this.isDestroyed) {
        const index = vehicles.indexOf(this);
        if (index > -1) {
          gameData.loosescore -= this.score;
          this.scored = true;
          if (this.driveSound && this.driveSound.stop) {
            this.driveSound.stop();
          }
          vehicles.splice(index, 1);
        }
        return;
      }
      return;
    }
    // звук руху
    if (this.isMoving) {
      this.driveSound.playLoop();
    } else {
      this.driveSound.stop();
    }
    if (this.driveSound && this.driveSound.isPlaying) {
      const dx = this.x - canvas.width / 2;
      const dy = this.y - canvas.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      this.driveSound.setVolumeByDistance(distance, 800); //
    }
    // рух
    if (this.isMoving) {
      const target = this.path[this.currentPathIndex];
      const dx = target.x - this.baseX;
      const dy = target.y - this.baseY;
      const distance = Math.hypot(dx, dy);

      if (distance < 10) {
        this.currentPathIndex++;
      } else {
        const angle = Math.atan2(dy, dx);
        this.rotation = angle + Math.PI * 1.5;
        const randomShakeX = (Math.random() - 0.5) * this.shakeIntensity;
        const randomShakeY = (Math.random() - 0.5) * this.shakeIntensity;
        this.baseX += Math.cos(angle) * this.speed + randomShakeX;
        this.baseY += Math.sin(angle) * this.speed + randomShakeY;
      }
      // --- Взаємодія з іншими ворогами (штовхання) ---
      let pushX = 0;
      let pushY = 0;
      for (let other of vehicles) {
        if (other === this || other.isStopped || other.isBurning) continue;

        const dx = this.baseX - other.baseX;
        const dy = this.baseY - other.baseY;
        const distance = Math.hypot(dx, dy);
        const minDist = this.height * this.scale;

        // Відштовхуємо лише того, у кого менше Y (нижче на екрані)
        if (distance < minDist && this.baseY < other.baseY) {
          const angle = Math.atan2(dy, dx);
          const push = minDist - distance;

          this.baseX += Math.cos(angle) * push * 0.5; // коефіцієнт приглушення
          this.baseY += Math.sin(angle) * push * 0.5; // коефіцієнт приглушення
        }
      }

      // Замість прямого зсуву — додаємо до основного руху:
      this.baseX += pushX * 0.5; // коефіцієнт приглушення
      this.baseY += pushY * 0.5;
    }
    if (this.isBurning) {
      setTimeout(() => {
        this.isDestroyed = true;
        this.isBurning = false;
      }, this.burningTime);
    }

    this.frameTimer++;
    const framespeed = this.isBurning
      ? this.vehiclefireframeSpeed
      : this.gassmokeframeSpeed;

    if (this.frameTimer >= framespeed) {
      if (this.isBurning) {
        this.frameX = (this.frameX + 1) % this.vehiclefireFrames;
      } else {
        this.frameX = (this.frameX + 1) % this.gasSmokeFrames;
      }
      this.frameTimer = 0;
    }
    if (this.isFiring) {
      this.turretFrameTimer++;

      if (this.turretFrameTimer >= this.fireFramespeed) {
        this.turretFrame = (this.turretFrame + 1) % this.fireFrames;
        this.turretFrameTimer = 0;
      }
    }

    if (this.isDestroyed) {
      this.explosionTimer++;
      if (this.explosionTimer % 8 === 0) {
        this.explosionFrame++;
        if (this.explosionFrame >= this.expolosionFrames) {
          this.explosionFrame = this.expolosionFrames + 1;
        }
      }
    }
    if (this.isFiring) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const dx = centerX - (this.baseX + this.layer.x);
      const dy = centerY - (this.baseY + this.layer.y);

      const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;
      this.turretRotationAngle +=
        (targetAngle - this.turretRotationAngle) * 0.1; // Плавна зміна кута
    }
    if (!this.isFiring) {
      this.turretFrame = 0;
    }
    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }
  draw() {
    // малюємо техніку
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    const currentFrame = this.isDestroyed
      ? this.destroyedFrame
      : this.isStopped || this.isBurning
      ? this.stoppedFrame
      : this.moveFrame;
    this.ctx.drawImage(
      this.image,
      currentFrame * this.width,
      0,
      this.width,
      this.height,
      (-this.width * this.scale) / 2,
      (-this.height * this.scale) / 2,
      this.width * this.scale,
      this.height * this.scale
    );
    this.ctx.restore();
    // малюємо башту
    if (this.hasTurret) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      // this.ctx.rotate(this.rotation);
      const turretFrame = this.isDestroyed
        ? 2
        : this.isStopped || this.isBurning
        ? 1
        : 0;

      // Відстань від центру башти
      // Відстань від центру до башти у локальних координатах
      const localOffsetX = this.width * this.scale * this.turretOffsetX;
      const localOffsetY = this.height * this.scale * this.turretOffsetY;

      // Обчислюємо глобальні координати зміщення з урахуванням обертання корпусу
      const globalOffsetX =
        localOffsetX * Math.cos(this.rotation) -
        localOffsetY * Math.sin(this.rotation);
      const globalOffsetY =
        localOffsetX * Math.sin(this.rotation) +
        localOffsetY * Math.cos(this.rotation);

      if (this.isFiring && this.isMoving) {
        this.ctx.translate(globalOffsetX, globalOffsetY);
        this.ctx.rotate(this.turretRotationAngle);
        this.ctx.drawImage(
          this.turretImage,
          this.turretFrame * this.turretWidth,
          1 * this.turretWidth,
          this.turretWidth,
          this.turretWidth,
          (-this.turretWidth * this.turretScale) / 2,
          (-this.turretWidth * this.turretScale) / 2,
          this.turretWidth * this.turretScale,
          this.turretWidth * this.turretScale
        );
      } else {
        this.ctx.translate(globalOffsetX, globalOffsetY);
        this.ctx.drawImage(
          this.turretImage,
          turretFrame * this.turretWidth,
          0,
          this.turretWidth,
          this.turretWidth,
          (-this.turretWidth * this.turretScale) / 2,
          (-this.turretWidth * this.turretScale) / 2,
          this.turretWidth * this.turretScale,
          this.turretWidth * this.turretScale
        );
      }
      this.ctx.restore();
    }

    // малюємо вихлоп
    if (this.isMoving) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);

      // Відстань від центру до вихлопної труби
      const exhaustOffsetX = this.width * this.scale * this.gassmokeoffsetX; // трохи вліво
      const exhaustOffsetY = this.height * this.scale * this.gassmokeoffsetY; // трохи вниз

      this.ctx.translate(exhaustOffsetX, exhaustOffsetY); // зміщуємо до труби
      this.ctx.drawImage(
        this.imageGasSmoke,
        this.frameX * 100,
        0,
        100,
        100,
        (-100 * this.smokeScale) / 2,
        (-100 * this.smokeScale) / 2,
        100 * this.smokeScale,
        100 * this.smokeScale
      );
      this.ctx.restore();
    }
    // малюємо горіння
    if (this.isBurning) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);

      // Відстань від центру місця горіння
      const exhaustOffsetX = this.width * this.scale * this.vehiclefireOffsetX;
      const exhaustOffsetY = this.height * this.scale * this.vehiclefireOffsetY;
      this.ctx.globalAlpha = 0.7;
      this.ctx.translate(exhaustOffsetX, exhaustOffsetY); // зміщуємо до труби
      this.ctx.drawImage(
        this.imageFire,
        this.frameX * this.vehiclefireImageWidth,
        0,
        this.vehiclefireImageWidth,
        this.vehiclefireImageWidth,
        (-this.vehiclefireImageWidth * this.fireScale) / 2 +
          Math.random() * this.shakeIntensity,
        (-this.vehiclefireImageWidth * this.fireScale) / 2 +
          Math.random() * this.shakeIntensity,
        this.vehiclefireImageWidth * this.fireScale,
        this.vehiclefireImageWidth * this.fireScale
      );
      this.ctx.globalAlpha = 1;
      this.ctx.restore();
    }
    // малюємо вибух
    if (this.isDestroyed) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
      this.ctx.drawImage(
        this.imageExplosion,
        this.explosionFrame * this.explosionImageWidth,
        0,
        this.explosionImageWidth,
        this.explosionImageWidth,
        (-this.explosionImageWidth * this.explosionScale) / 2,
        (-this.explosionImageWidth * this.explosionScale) / 2,
        this.explosionImageWidth * this.explosionScale,
        this.explosionImageWidth * this.explosionScale
      );
      this.ctx.restore();
    }
  }
  fire(drone, layer, canvas) {
    if (this.hasGunner) {
      if (
        !this.gunner.vehicle ||
        this.gunner.dead ||
        !this.isMoving ||
        !drone.isAlive ||
        drone.isReloading ||
        pauseState.isPaused
      ) {
        this.isFiring = false;
        this.turretFrame = 0;
      }
      // 🔊 Керуємо звуком стрільби
      if (this.isFiring) {
        this.startFiringSoundLoop(canvas);
      } else {
        this.stopFiringSoundLoop();
      }
      //  логіка стрільби
      if (this.isFiring) this.fireTimer++;
      if (this.fireTimer >= 60 / this.fireRate) {
        if (
          Math.random() * 500 <
            (5 - 2.2 * Math.sqrt(layer.speedX ** 2 + layer.speedY ** 2)) *
              drone.size &&
          drone.hp >= 1
        ) {
          --drone.hp;
        }
        this.fireTimer = 0;
      }
    }
  }
  embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, crew) {
    // Спочатку водія
    const DriverClass = this.hasCrew ? Crew : Rifleman;
    const driver = new DriverClass(
      this.baseX,
      this.baseY,
      this.layer,
      this.ctx,
      [] // без маршруту спочатку
    );

    driver.vehicle = this;
    driver.path = [];
    enemies.push(driver);
    this.driver = driver;
    if (this.hasGunner) {
      const gunner = new Rifleman(
        this.baseX,
        this.baseY,
        this.layer,
        this.ctx,
        [] // без маршруту спочатку
      );

      gunner.vehicle = this;
      gunner.path = [];
      enemies.push(gunner);
      this.gunner = gunner;
    }
    // Тепер піхота
    const squad = createRifleSquad(
      this.baseX,
      this.baseY,
      0, // без розкиду при посадці
      0,
      this.layer,
      this.ctx,
      navGrid,
      [
        {
          x: this.baseX,
          y: this.baseY,
        },
      ],
      riflemans,
      mashinegunners,
      grenadiers,
      crew
    );
    squad.forEach((enemy) => {
      enemy.vehicle = this;
      enemy.path = [];
      enemies.push(enemy);
    });

    this.cargo = [...squad];
  }
  bailOut() {
    if (this.driver) this.cargo.unshift(this.driver);
    if (this.gunner) this.cargo.unshift(this.gunner);

    this.cargo.forEach((enemy, index) => {
      if (!enemy.dead && !enemy.hasBailedOut) {
        enemy.hasBailedOut = true;
        const side = index % 2 === 0 ? -1 : 1;
        const distanceFromTruck = 40 + Math.random() * 70;
        const angleOffset = (Math.random() - 0.5) * (Math.PI / 4);
        const angleFromTruck =
          this.rotation - Math.PI / 2 + side * (Math.PI / 2) + angleOffset;

        const offsetX = distanceFromTruck * Math.cos(angleFromTruck);
        const offsetY = distanceFromTruck * Math.sin(angleFromTruck);

        const delay = Math.random() * (this.burningTime * 0.8);

        setTimeout(() => {
          if (enemy.dead) return;
          const rawX = this.baseX + offsetX;
          const rawY = this.baseY + offsetY;

          const safeSpot = this.getNearestWalkableTile(
            rawX,
            rawY,
            this.navigaionsGrid
          );
          if (!safeSpot) return; // якщо взагалі немає куди висадити

          enemy.baseX = safeSpot.x;
          enemy.baseY = safeSpot.y;
          enemy.x = enemy.baseX + this.layer.x;
          enemy.y = enemy.baseY + this.layer.y;

          enemy.vehicle = null;
          enemy.path = findPath(
            this.navigaionsGrid,
            { x: enemy.baseX, y: enemy.baseY },
            {
              x:
                this.waypoints[this.waypoints.length - 1].x +
                Math.random() * 100 -
                50,
              y: this.waypoints[this.waypoints.length - 1].y,
            }
          );
          enemy.currentPathIndex = 0;
        }, delay);
      }
    });
  }

  setPathToWaypoint() {
    if (this.currentWaypointIndex < this.waypoints.length) {
      const nextWaypoint = this.waypoints[this.currentWaypointIndex];
      this.path = findPath(
        this.navigaionsGrid,
        { x: this.baseX, y: this.baseY },
        nextWaypoint
      );
      this.currentPathIndex = 0;
      this.isMoving = true;
    } else {
      this.isMoving = false; // Всі вейпоінти пройдено
    }
  }
  getNearestWalkableTile(x, y, navGrid, maxRadius = 120) {
    const step = 10; // Крок у пікселях
    const directions = [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ];

    for (let r = 0; r <= maxRadius; r += step) {
      for (let [dx, dy] of directions) {
        const testX = x + dx * r;
        const testY = y + dy * r;

        const path = findPath(
          navGrid,
          { x: testX, y: testY },
          { x: testX + 1, y: testY + 1 }
        );
        if (path.length > 0) {
          return { x: testX, y: testY };
        }
      }
    }

    return null; // нічого не знайдено
  }
  startFiringSoundLoop(canvas) {
    // 🔁 Якщо вже є активний таймер — не запускаємо ще раз, щоб уникнути дублювання
    if (this._firingSoundTimeout || pauseState.isPaused) return;

    // 🔂 Функція, яка буде викликатись повторно з інтервалом
    const playNext = () => {
      // ⛔ Якщо юніт більше не стріляє — зупиняємо рекурсію (не запускаємо звук знову)
      if (!this.isFiring || pauseState.isPaused) return;

      // 🎧 Створюємо новий екземпляр звуку — це дозволяє уникнути переривання вже граючого звуку
      const fireSoundInstance = new Audio(this.fireSound.src);

      // 📏 Розрахунок відстані до центру екрану (дрона)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = this.x - centerX;
      const dy = this.y - centerY;
      const distance = Math.hypot(dx, dy);

      // 🎚️ Обчислення коефіцієнта гучності (чим ближче — тим гучніше)
      const maxDistance = 450; // при 1000+ пікселях звук ≈ 0
      const volumeFactor = Math.max(0, 1 - distance / maxDistance);

      // 🔉 Встановлення гучності з урахуванням базової
      fireSoundInstance.volume = (this.fireSound.volume || 0.5) * volumeFactor;

      // ▶️ Пробуємо відтворити звук
      fireSoundInstance
        .play()
        .catch((e) =>
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e)
        );

      // ⏱️ Обчислюємо випадкову затримку між звуками пострілів (наприклад 2–3 секунди)
      const delay =
        this.fireSoundRateMin * 1000 +
        Math.random() * (this.fireSoundRateMax - this.fireSoundRateMin) * 1000;

      // 🕒 Встановлюємо таймер для наступного виклику playNext
      this._firingSoundTimeout = setTimeout(() => {
        this._firingSoundTimeout = null; // 💾 Скидаємо таймер перед новим викликом
        if (this.isFiring && !pauseState.isPaused) playNext(); // 🔁 Якщо юніт ще стріляє — повторити
      }, delay);
    };

    // ▶️ Стартуємо цикл звуків стрільби
    playNext();
  }

  stopFiringSoundLoop() {
    // ⛔ Зупиняємо майбутній виклик playNext, якщо є активний таймер
    if (this._firingSoundTimeout) {
      clearTimeout(this._firingSoundTimeout); // ❌ Очистити таймер
      this._firingSoundTimeout = null; // 💾 Обнулити стан
    }
  }
  isStoppedF() {
    this.isStopped = true;
    this.bailOut();
    this.isMoving = false;
    this.isFiring = false;
    this.stopFiringSoundLoop();
  }
  isBurningF() {
    this.isStopped = true;
    this.isBurning = true;
    this.bailOut();
    this.isMoving = false;
    this.isFiring = false;
    this.stopFiringSoundLoop();
  }
}

export class Ural extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? uralZImage : uralVImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 224;
    this.type = "ural";
    this.scale = 0.7;
    this.speed = 0.4;
    this.score = 200;
  }
}
export class Gaz66 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? gaz66ZImage : gaz66VImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 170;
    this.type = "gaz66";
    this.scale = 0.7;
    this.speed = 0.4;
    this.gassmokeoffsetY = -0.7;
    this.smokeScale = 0.45;
    this.score = 180;
  }
}

export class BMP2 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? bmp2ZImage : bmp2VImage;
    this.turretImage = bmp2turret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "bmp2";
    this.scale = 0.68;
    this.turretScale = 0.73;
    this.speed = 0.3;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.6;
    this.armor = 4;
    this.turretOffsetX = 0;
    this.turretOffsetY = -0.07;
    this.hasTurret = true;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 400;
    this.hasCrew = true;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/tank.mp3",
      0.4
    );
  }
}

export class BMP1 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? bmp1ZImage : bmp1VImage;
    this.turretImage = bmp1turret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "bmp1";
    this.scale = 0.68;
    this.turretScale = 0.68;
    this.speed = 0.3;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.6;
    this.armor = 3;
    this.turretOffsetX = -0.05;
    this.turretOffsetY = -0.08;
    this.hasTurret = true;
    this.vehiclefireOffsetX = -0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 350;
    this.hasCrew = true;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/tank.mp3",
      0.4
    );
  }
}
export class Guntruck extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? guntruckZImage : guntruckVImage;
    this.turretImage = guntruckturret;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 97;
    this.type = "guntruck";
    this.scale = 0.88;
    this.turretScale = 0.88;
    this.speed = 0.5;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.3;
    this.armor = 0;
    this.turretOffsetX = -0.05;
    this.turretOffsetY = -0.18;
    this.hasGunner = true;
    this.hasTurret = true;
    this.vehiclefireOffsetX = -0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 350;
    this.droneSpottingChanse = 4;
    this.fireDistance = 400;
    this.fireRate = 40;
    this.fireSound = new Audio("assets/audio/fire/heavyMachinegun.mp3");
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/jeep.mp3",
      0.4
    );
  }
}

export class Tigr extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? tigrZImage : tigrVImage;
    this.turretImage = tigrturret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "tigr";
    this.scale = 0.56;
    this.turretScale = 0.9;
    this.speed = 0.44;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.3;
    this.armor = 1;
    this.turretOffsetX = 0;
    this.turretOffsetY = -0.05;
    this.hasGunner = true;
    this.hasTurret = true;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = 0;
    this.score = 350;
    this.droneSpottingChanse = 2;
    this.fireDistance = 320;
    this.fireRate = 15;
  }
}
