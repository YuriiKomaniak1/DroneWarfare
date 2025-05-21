const riflemanImage = new Image();
riflemanImage.src = "./assets/img/enemies/rifleman.png";
const machinegunnerImage = new Image();
machinegunnerImage.src = "./assets/img/enemies/machinegunner.png";
const grenadierImage = new Image();
grenadierImage.src = "./assets/img/enemies/grenadier.png";
const crewImage = new Image();
crewImage.src = "./assets/img/enemies/crew.png";
const skullImage = new Image();
skullImage.src = "./assets/img/enemies/skull.png";
import { findPath } from "../logic/navigation.js";
import { pauseState } from "../logic/gameloop.js";
const difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {
  level: "medium",
  accuracy: 1,
  weight: 1,
};
const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};

export class Enemy {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid, vehicle = null) {
    this.image = riflemanImage;
    this.skullImage = skullImage;
    this.type = "rifleman";
    this.fireDistance = 260;
    this.fireRate = 5;
    this.droneSpottingChanse = 1;
    this.baseX = x;
    this.baseY = y;
    this.layer = layer;
    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
    this.ctx = ctx;
    this.speed = Math.random() * 0.07 + 0.18;
    this.width = 64;
    this.height = 64;
    this.runframeY = 3;
    this.frameSpeed = 20;
    this.runFrames = 8;
    this.crawlFrames = 5;
    this.fireFrames = 6;
    this.deathFrames = 3;
    this.deathFrameIndex = 0;
    this.deathAnimationSpeed = 10;
    this.deathTimer = 0;
    this.deathAngle = Math.random() * 2 * Math.PI; // Випадковий кут
    this.frameX = Math.floor(Math.random() * this.runFrames);
    this.frameTimer = 0;
    this.deadframe = Math.ceil(Math.random() * 4 + 2);
    this.dead = false;
    this.crawl = false;
    this.isFiring = false;
    this.fireDistance = 1;
    this.fireRate = 1;
    this.fireTimer = 0;
    this.rotationAngle = 0;
    this.oldPositions = []; // Масив з історією положення
    this.positionMemory = 15;
    this.droneSpottingChanse = 1;
    this.path = []; // Маршрут
    this.currentPathIndex = 0;
    this.shakeIntensity = 0.3;
    this.vehicle = vehicle;
    this.showSkull = true;
    this.skullOffset = Math.random() * 60 - 30;
    this.skullTimer = 0;
    this.score = 51;
    this.scored = false;
    this.hasBailedOut = false;
    this.distance = 0.5 + Math.random() * 0.5;
    this.navigationsGrid = null; // Сітка навігації
    this.fireSound = new Audio("assets/audio/fire/rifleman-sound.mp3");
    this.fireSound.loop = true;
    this.fireSound.volume = 0.5;
    this.fireSoundPlaying = false;
    this.fireSoundRateMin = 0.5;
    this.fireSoundRateMax = 2;
    this.static = false;
    this.rotateTimer = 0;
    this.currentWaypointIndex = 0;
    this.looseScore = this.score;
    this.winScore = this.score;
    this.ended = false;
    this.navigationsGrid = navigaionsGrid;
    this.waypoints = waypoints;
  }

  update(allEnemies, canvas, gameState, gameData, training) {
    //  нарахування очок
    if (!this.scored && this.dead && !training) {
      gameData.score += this.score;
      gameData.winScore -= this.winScore;
      this.scored = true;
    }
    //видалення юніта, який успішно дійшов
    if (this.vehicle === null) {
      if (
        (this.path.length === 0 || this.currentPathIndex >= this.path.length) &&
        !this.scored
      ) {
        this.currentWaypointIndex++;
        this.setPathToWaypoint(); //
        if (this.ended && !this.dead) {
          const index = allEnemies.indexOf(this);
          if (index > -1) {
            gameData.looseScore -= this.looseScore;
            this.scored = true;
            console.log("юніта видалено", this.baseX, this.baseY);
            allEnemies.splice(index, 1);
          }
          return;
        }
      }

      // модифікація швидкості повзання\
      let speedModifier = 1;
      if (this.crawl) {
        speedModifier = 0.4;
        if (Math.random() < 0.002) this.crawl = false;
      }
      if (!this.static) {
        // рух по навігації
        if (
          !this.dead &&
          !this.isFiring &&
          this.path.length > 0 &&
          this.currentPathIndex < this.path.length
        ) {
          const target = this.path[this.currentPathIndex];
          if (!target) return;
          const dx = target.x - this.baseX;
          const dy = target.y - this.baseY;
          const distance = Math.hypot(dx, dy);

          if (distance < 5) {
            this.currentPathIndex++;
          } else {
            const angle = Math.atan2(dy, dx);
            this.rotationAngle = angle - Math.PI / 2;
            const randomShakeX = (Math.random() - 0.5) * this.shakeIntensity;
            const randomShakeY = (Math.random() - 0.5) * this.shakeIntensity;
            this.baseX +=
              Math.cos(angle) * this.speed * speedModifier + randomShakeX;
            this.baseY +=
              Math.sin(angle) * this.speed * speedModifier + randomShakeY;
          }
        }
      }
      this.x = this.baseX + this.layer.x;
      this.y = this.baseY + this.layer.y;
      // --- Анімація руху ---
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        if (this.crawl) {
          this.frameX = (this.frameX + 1) % this.crawlFrames;
        } else if (this.isFiring) {
          this.frameX = (this.frameX + 1) % this.fireFrames;
        } else {
          this.frameX = (this.frameX + 1) % this.runFrames;
        }
        this.frameTimer = 0;
      }
      if (this.dead) {
        // --- Анімація смерті ---
        this.deathTimer++;
        if (this.deathTimer >= this.deathAnimationSpeed) {
          this.deathFrameIndex++;
          this.deathTimer = 0;
        }
        if (this.deathFrameIndex >= this.deathFrames) {
          this.deathFrameIndex = this.deadframe;
        }
      }

      // --- Взаємодія з іншими ворогами (штовхання) ---
      let pushX = 0;
      let pushY = 0;
      for (let other of allEnemies) {
        if (
          this.static ||
          other.static ||
          this.dead ||
          other === this ||
          other.dead ||
          other.crawl ||
          other.isFiring ||
          this.isFiring ||
          this.crawl
        )
          continue;

        const dx = this.baseX - other.baseX;
        const dy = this.baseY - other.baseY;
        const distance = Math.hypot(dx, dy);
        const minDist = this.width * this.distance;

        // Відштовхуємо лише того, у кого менше Y (нижче на екрані)
        if (distance < minDist && this.baseY < other.baseY) {
          const angle = Math.atan2(dy, dx);
          const push = minDist - distance;

          this.baseX += Math.cos(angle) * push * 0.025; // коефіцієнт приглушення
          this.baseY += Math.sin(angle) * push * 0.025; // коефіцієнт приглушення
        }
      }

      // Замість прямого зсуву — додаємо до основного руху:
      this.baseX += pushX * 0.5; // коефіцієнт приглушення
      this.baseY += pushY * 0.5;
      // обертання під час трільби

      if (this.isFiring) {
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
          this.frameX = (this.frameX + 1) % this.fireFrames;
          this.frameTimer = 0;
        }
        if (this.dead) this.ifFiring = false;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const dx = centerX - (this.baseX + this.layer.x + this.width / 2);
        const dy = centerY - (this.baseY + this.layer.y + this.height / 2);

        const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;
        this.rotationAngle += (targetAngle - this.rotationAngle) * 0.1; // Плавна зміна кута
      } else {
        // Звичайне обертання за рухом
        if (this.oldPositions.length > 0) {
          const oldest = this.oldPositions[0];
          const deltaX = this.baseX - oldest.x;
          const deltaY = this.baseY - oldest.y;

          if (Math.abs(deltaX) > 0.01 || Math.abs(deltaY) > 0.01) {
            const targetAngle = Math.atan2(deltaY, deltaX) - Math.PI / 2;
            this.rotationAngle += (targetAngle - this.rotationAngle) * 0.05; // Плавніше при русі
          }
        }
        if (
          this.dead &&
          this.vehicle &&
          this.showSkull &&
          !this.skullTimerStarted
        ) {
          this.skullTimerStarted = true;
          setTimeout(() => {
            this.showSkull = false;
          }, 5000); // 3 секунди і зникне повністю
        }
      }
    } else {
      this.baseX = this.vehicle.baseX;
      this.baseY = this.vehicle.baseY;
    }
    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;

    if (!this.dead && this.static && !this.isFiring) {
      this.rotateTimer++;
      if (this.rotateTimer >= 110) {
        // кожні 2 секунди
        const angleOffset = (Math.random() * 40 * 2 - 40) * (Math.PI / 180);
        this.rotationAngle = this.rotationAngle + angleOffset;
        this.rotateTimer = 0;
      }
    }
  }

  draw() {
    if (this.vehicle === null) {
      if (!this.dead && !this.crawl && !this.isFiring) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotationAngle);
        this.ctx.drawImage(
          this.image,
          (this.static ? 2 : this.frameX) * this.width,
          this.runframeY * this.height,
          this.width,
          this.height,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        this.ctx.restore();
      } else if (!this.dead && this.crawl && !this.isFiring) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotationAngle);
        this.ctx.drawImage(
          this.image,
          (this.static ? 2 : this.frameX) * this.width,
          0 * this.height,
          this.width,
          this.height,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        this.ctx.restore();
      } else if (!this.dead && this.isFiring && !this.crawl) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotationAngle);
        this.ctx.drawImage(
          this.image,
          this.frameX * this.width,
          2 * this.height,
          this.width,
          this.height,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        this.ctx.restore();
      } else if (this.dead) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.deathAngle);
        this.ctx.drawImage(
          this.image,
          this.deathFrameIndex * this.width,
          1 * this.height,
          this.width,
          this.height,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        this.ctx.restore();
      }
    }
  }
  skullDraw(gameData) {
    if (
      this.dead &&
      (this.vehicle || this.isCovered(gameData)) &&
      this.showSkull
    ) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      const alpha = Math.max(0, (300 - this.skullTimer) / 300);
      this.ctx.globalAlpha = alpha;
      this.ctx.drawImage(
        this.skullImage,
        -156 / 10 + this.skullOffset,
        -242 / 10 + this.skullOffset,
        156 / 5,
        242 / 5
      );
      this.skullTimer++;
      this.ctx.globalAlpha = 1;
      this.ctx.restore();
    }
  }

  fire(drone, layer, canvas) {
    if (!this.vehicle) {
      if (
        this.dead ||
        !drone.isAlive ||
        drone.isReloading ||
        pauseState.isPaused
      ) {
        if (this.isFiring) {
          this.isFiring = false;
          this.stopFiringSoundLoop();
        }
        return;
      }

      if (this.isFiring) {
        this.startFiringSoundLoop(canvas);
      } else {
        this.stopFiringSoundLoop();
      }

      if (this.isFiring) this.fireTimer++;
      if (this.fireTimer >= 60 / this.fireRate) {
        const chance =
          (5 - 2.2 * Math.sqrt(layer.speedX ** 2 + layer.speedY ** 2)) *
          drone.size *
          difficulty.accuracy;

        if (Math.random() * 150 < chance && drone.hp >= 1) {
          --drone.hp;
        }
        this.fireTimer = 0;
      }
    }
  }

  startFiringSoundLoop(canvas) {
    if (this._firingSoundTimeout || pauseState.isPaused) return;

    const playNext = () => {
      if (!this.isFiring || pauseState.isPaused) return;

      const fireSoundInstance = new Audio(this.fireSound.src);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = this.x - centerX;
      const dy = this.y - centerY;
      const distance = Math.hypot(dx, dy);
      const maxDistance = 450;
      const volumeFactor = Math.max(0, 1 - distance / maxDistance);
      fireSoundInstance.volume =
        (this.fireSound.volume || 0.5) *
        volumeFactor *
        volumeSettings.soundVolume;

      fireSoundInstance.play().catch((e) => {
        console.warn("🔇 Не вдалося відтворити звук пострілу:", e);
      });

      const delay =
        this.fireSoundRateMin * 1000 +
        Math.random() * (this.fireSoundRateMax - this.fireSoundRateMin) * 1000;

      this._firingSoundTimeout = setTimeout(() => {
        this._firingSoundTimeout = null;
        if (this.isFiring && !pauseState.isPaused) playNext();
      }, delay);
    };

    playNext();
  }

  stopFiringSoundLoop() {
    // ⛔ Зупиняємо майбутній виклик playNext, якщо є активний таймер
    if (this._firingSoundTimeout) {
      clearTimeout(this._firingSoundTimeout); // ❌ Очистити таймер
      this._firingSoundTimeout = null; // 💾 Обнулити стан
    }
  }
  setPathToWaypoint() {
    if (this.currentWaypointIndex < this.waypoints.length) {
      const nextWaypoint = this.waypoints[this.currentWaypointIndex];
      this.path = findPath(
        this.navigationsGrid,
        { x: this.baseX, y: this.baseY },
        nextWaypoint
      );
      this.currentPathIndex = 0;
    } else {
      this.ended = true; // Всі вейпоінти пройдено
    }
  }
  isCovered(gameData) {
    for (const cover of gameData.covers) {
      if (
        this.baseX >= cover.x &&
        this.baseX <= cover.x + cover.width &&
        this.baseY >= cover.y &&
        this.baseY <= cover.y + cover.height
      ) {
        return true;
      }
    }
    return false;
  }
}
export class Rifleman extends Enemy {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = riflemanImage;
    this.type = "rifleman";
    this.fireDistance = 260;
    this.fireRate = 1;
    this.droneSpottingChanse = 1;
    this.score = 50;
    this.winScore = this.score;
    this.looseScore = this.score;
  }
}
export class Grenadier extends Enemy {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = grenadierImage;
    this.type = "grenadier";
    this.fireDistance = 260;
    this.fireRate = 1;
    this.droneSpottingChanse = 1;
    this.score = 100;
    this.winScore = this.score;
    this.looseScore = this.score;
  }
}
export class Machinegunner extends Enemy {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = machinegunnerImage;
    this.type = "machinegunner";
    this.fireDistance = 350;
    this.fireRate = 3;
    this.droneSpottingChanse = 2;
    this.score = 100;
    this.winScore = this.score;
    this.looseScore = this.score;
    this.fireSound = new Audio("assets/audio/fire/machinegun.mp3");
    this.fireSoundRateMin = 2;
    this.fireSoundRateMax = 3.2;
  }
}

export class Crew extends Enemy {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = crewImage;
    this.type = "crew";
    this.fireDistance = 260;
    this.fireRate = 1;
    this.droneSpottingChanse = 1;
    this.score = 60;
    this.winScore = this.score;
    this.looseScore = this.score;
  }
}

export function createRifleSquad(
  spreadX,
  spreadY,
  layer,
  ctx,
  navGrid,
  waypoints,
  riflemans,
  mashinegunners,
  grenadiers,
  crew
) {
  const squad = [];

  function pushSquadMember(Class) {
    const localSpreadX = Math.floor(Math.random() * spreadX - spreadX / 2);
    const localSpreadY = Math.floor(Math.random() * spreadY - spreadY / 2);

    // Створити копії waypoints з унікальними зміщеннями
    const shiftedWaypoints = waypoints.map((wp, i) => ({
      x: wp.x + localSpreadX,
      y: i === 0 ? wp.y + localSpreadY : wp.y,
    }));
    const enemy = new Class(
      shiftedWaypoints[0].x,
      shiftedWaypoints[0].y,
      layer,
      ctx,
      shiftedWaypoints,
      navGrid
    );

    squad.push(enemy);
  }

  for (let i = 0; i < riflemans; i++) {
    pushSquadMember(Rifleman);
  }
  for (let i = 0; i < mashinegunners; i++) {
    pushSquadMember(Machinegunner);
  }
  for (let i = 0; i < grenadiers; i++) {
    pushSquadMember(Grenadier);
  }
  for (let i = 0; i < crew; i++) {
    pushSquadMember(Crew);
  }

  return squad;
}
