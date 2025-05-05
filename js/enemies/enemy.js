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
export class Enemy {
  constructor(x, y, layer, ctx, path, vehicle = 0) {
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
    this.path = path; // Маршрут
    this.currentPathIndex = 0;
    this.shakeIntensity = 0.3;
    this.vehicle = vehicle;
    this.showSkull = true;
    this.skullOffset = Math.random() * 60 - 30;
    this.skullTimer = 0;
    this.score = 51;
    this.scored = false;
    this.hasBailedOut = false;
    this.distance = 0.4 + Math.random() * 0.5;
    this.navigationsGrid = null; // Сітка навігації
    this.fireSound = new Audio("assets/audio/fire/rifleman-sound.mp3");
    this.fireSound.loop = true;
    this.fireSound.volume = 0.3;
    this.fireSoundPlaying = false;
    this.fireSoundRateMin = 1;
    this.fireSoundRateMax = 2;
  }

  update(allEnemies, canvas, gameState, gameData, training) {
    //  нарахування очок
    if (!this.scored && this.dead && !training) {
      gameData.score += this.score;
      gameData.winScore -= this.score;
      this.scored = true;
    }
    //видалення юніта, який успішно дійшов
    if (this.vehicle === null) {
      if (
        (this.path.length === 0 || this.currentPathIndex >= this.path.length) &&
        !this.scored
      ) {
        const index = allEnemies.indexOf(this);
        if (index > -1) {
          gameData.looseScore -= this.score;
          this.scored = true;
          allEnemies.splice(index, 1);
        }
        return;
      }
      // модифікація швидкості повзання\
      let speedModifier = 1;
      if (this.crawl) {
        speedModifier = 0.4;
        if (Math.random() < 0.002) this.crawl = false;
      }
      // рух по навігації
      if (!this.dead && !this.isFiring) {
        const target = this.path[this.currentPathIndex];
        const dx = target.x - this.baseX;
        const dy = target.y - this.baseY;
        const distance = Math.hypot(dx, dy);

        if (distance < 5) {
          this.currentPathIndex++;
          if (this.currentPathIndex >= this.path.length) {
            return;
          }
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
      } else {
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
        if (this.dead || other === this || other.dead) continue;

        const dx = this.baseX - other.baseX;
        const dy = this.baseY - other.baseY;
        const distance = Math.hypot(dx, dy);
        const minDist = this.width * this.distance;

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
      // обертання під час трільби
      if (this.isFiring) {
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
  }

  draw() {
    if (this.vehicle === null) {
      if (!this.dead && !this.crawl && !this.isFiring) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotationAngle);
        this.ctx.drawImage(
          this.image,
          this.frameX * this.width,
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
          this.frameX * this.width,
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
  skullDraw() {
    if (this.dead && this.vehicle && this.showSkull) {
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

  fire(drone, layer) {
    if (!this.vehicle) {
      if (this.dead || !drone.isAlive || drone.isReloading)
        this.isFiring = false;

      // 🔊 Керуємо звуком стрільби
      if (this.isFiring) {
        this.startFiringSoundLoop();
      } else {
        this.stopFiringSoundLoop();
      }
      //  логіка стрільби
      if (this.isFiring) this.fireTimer++;
      if (this.fireTimer >= 60 / this.fireRate) {
        // console.log(
        //   drone.hp,
        //   (5 - 2.2 * Math.sqrt(layer.speedX ** 2 + layer.speedY ** 2)) *
        //     drone.size
        // );
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
  startFiringSoundLoop() {
    if (this._firingSoundTimeout) return;

    const playNext = () => {
      if (!this.isFiring) return;

      const fireSoundInstance = new Audio(this.fireSound.src); // новий екземпляр
      fireSoundInstance.volume = this.fireSound.volume || 0.5;
      fireSoundInstance
        .play()
        .catch((e) =>
          console.warn("🔇 Не вдалося відтворити звук пострілу:", e)
        );

      // Наступний запуск через випадковий інтервал, тільки якщо isFiring ще true
      const delay =
        this.fireSoundRateMin * 1000 +
        Math.random() * (this.fireSoundRateMax - this.fireSoundRateMin) * 1000;

      this._firingSoundTimeout = setTimeout(() => {
        this._firingSoundTimeout = null;
        if (this.isFiring) playNext();
      }, delay);
    };

    playNext();
  }

  stopFiringSoundLoop() {
    if (this._firingSoundTimeout) {
      clearTimeout(this._firingSoundTimeout);
      this._firingSoundTimeout = null;
    }
    // if (this.fireSound) {
    //   this.fireSound.pause();
    //   this.fireSound.currentTime = 0;
    // }
  }
}
export class Rifleman extends Enemy {
  constructor(x, y, layer, ctx, path) {
    super(x, y, layer, ctx, path);
    this.image = riflemanImage;
    this.type = "rifleman";
    this.fireDistance = 260;
    this.fireRate = 5;
    this.droneSpottingChanse = 1;
    this.score = 50;
  }
}
export class Grenadier extends Enemy {
  constructor(x, y, layer, ctx, path) {
    super(x, y, layer, ctx, path);
    this.image = grenadierImage;
    this.type = "grenadier";
    this.fireDistance = 260;
    this.fireRate = 4;
    this.droneSpottingChanse = 1;
    this.score = 100;
  }
}
export class Machinegunner extends Enemy {
  constructor(x, y, layer, ctx, path) {
    super(x, y, layer, ctx, path);
    this.image = machinegunnerImage;
    this.type = "machinegunner";
    this.fireDistance = 350;
    this.fireRate = 15;
    this.droneSpottingChanse = 2;
    this.score = 100;
  }
}

export class Crew extends Enemy {
  constructor(x, y, layer, ctx, path) {
    super(x, y, layer, ctx, path);
    this.image = crewImage;
    this.type = "crew";
    this.fireDistance = 260;
    this.fireRate = 4;
    this.droneSpottingChanse = 1;
    this.score = 60;
  }
}

export function createRifleSquad(
  x,
  y,
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

    const startX = x + localSpreadX;
    const startY = y + localSpreadY;

    const fullPath = [];
    let currentPos = { x: startX, y: startY };

    // Прокладаємо маршрут між кожними двома послідовними вейпоінтами з тим же кроком як старт
    for (let i = 0; i < waypoints.length; i++) {
      const x = waypoints[i].x + localSpreadX;
      let y = waypoints[i].y + localSpreadY;
      if (y > layer.height) y = layer.height;
      const adjustedWaypoint = {
        x: x,
        y: y,
      };
      const segment = findPath(navGrid, currentPos, adjustedWaypoint);
      if (segment.length > 0) {
        fullPath.push(...segment);
        currentPos = adjustedWaypoint;
      }
    }

    const enemy = new Class(startX, startY, layer, ctx, fullPath);
    enemy.baseX = startX;
    enemy.baseY = startY;
    enemy.x = startX + layer.x;
    enemy.y = startY + layer.y;
    enemy.path = fullPath;
    enemy.currentPathIndex = 0;
    enemy.vehicle = null;

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
