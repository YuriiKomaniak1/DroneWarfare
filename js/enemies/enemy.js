const riflemanImage = new Image();
riflemanImage.src = "./assets/img/enemies/rifleman.png";
const machinegunnerImage = new Image();
machinegunnerImage.src = "./assets/img/enemies/machinegunner.png";
import { findPath } from "../logic/navigation.js";
export class Enemy {
  constructor(x, y, layer, ctx, path) {
    this.image = riflemanImage;
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
    this.speed = Math.random() * 0.07 + 0.11;
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
  }

  update(allEnemies, canvas) {
    if (this.path.length === 0 || this.currentPathIndex >= this.path.length) {
      return;
    }
    let speedModifier = 1;
    if (this.crawl) {
      speedModifier = 0.4;
      if (Math.random() < 0.002) this.crawl = false;
    }
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
        this.baseX += Math.cos(angle) * this.speed * speedModifier;
        this.baseY += Math.sin(angle) * this.speed * speedModifier;
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
    for (let other of allEnemies) {
      if (this.dead || other === this || other.dead) continue;

      const dx = this.baseX - other.baseX;
      const dy = this.baseY - other.baseY;
      const distance = Math.hypot(dx, dy);
      const minDist = this.width * 0.4;

      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const push = (minDist - distance) / 2;
        this.baseX += Math.cos(angle) * push;
        this.baseY += Math.sin(angle) * push;
      }
    }
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
    }
  }

  draw() {
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
  fire(drone, layer) {
    if (this.dead || !drone.isAlive || drone.isReloading) this.isFiring = false;
    if (this.isFiring) this.fireTimer++;
    if (this.fireTimer >= 60 / this.fireRate) {
      if (
        Math.random() * 1000 <
          5 - (4 * (layer.speedX + layer.speedY)) / (2 * layer.maxSpeed) &&
        drone.hp >= 1
      ) {
        --drone.hp;
      }
      this.fireTimer = 0;
    }
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
  targetX,
  targetY
) {
  const squad = [];

  for (let i = 0; i < 5; i++) {
    let localSpreadX = Math.floor(Math.random() * spreadX - spreadX / 2);
    let localSpreadY = Math.floor(Math.random() * spreadY - spreadY / 2);
    const startX = x + localSpreadX;
    const startY = y + localSpreadY;

    const path = findPath(
      navGrid,
      { x: startX, y: startY },
      { x: targetX + localSpreadX, y: targetY + localSpreadY }
    );
    const rifleman = new Rifleman(startX, startY, layer, ctx, []);
    rifleman.path = path;
    rifleman.currentPathIndex = 0;
    squad.push(rifleman);
  }
  let localSpreadX = Math.floor(Math.random() * spreadX - spreadX / 2);
  let localSpreadY = Math.floor(Math.random() * spreadY - spreadY / 2);
  const startX = x + localSpreadX;
  const startY = y + localSpreadY;
  const path = findPath(
    navGrid,
    { x: startX, y: startY },
    { x: targetX + localSpreadX, y: targetY + localSpreadY }
  );

  const machinegunner = new Machinegunner(startX, startY, layer, ctx, []);

  machinegunner.path = path;
  machinegunner.currentPathIndex = 0;
  console.log(machinegunner);
  squad.push(machinegunner);

  return squad;
}
