const riflemanImage = new Image();
riflemanImage.src = "./assets/img/enemies/rifleman.png";
const machinegunnerImage = new Image();
machinegunnerImage.src = "./assets/img/enemies/machinegunner.png";
export class Enemy {
  constructor(
    x,
    y,
    layer,
    ctx,
    obstacle,
    fireDistance,
    fireRate,
    type,
    droneSpottingChanse
  ) {
    this.image = riflemanImage;
    this.type = "rifleman";
    this.fireDistance = 260;
    this.fireRate = 5;
    this.droneSpottingChanse = 1;
    this.baseX = x;
    this.baseY = y;
    this.prevX = x;
    this.prevY = y;
    this.layer = layer;
    this.ctx = ctx;
    this.speed = Math.random() * 0.07 + 0.11;
    this.width = 64;
    this.height = 64;
    this.type = type;
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
    this.fireDistance = fireDistance;
    this.fireRate = fireRate;
    this.fireTimer = 0;
    this.obstacles = obstacle;
    this.rotationAngle = 0;
    this.oldPositions = []; // Масив з історією положення
    this.positionMemory = 15;
    this.droneSpottingChanse = droneSpottingChanse; // Кількість кадрів для затримки
  }

  update(allEnemies, canvas) {
    if (!this.oldPositions) this.oldPositions = []; // Якщо ще немає масиву
    const memoryFrames = 10; // Скільки кадрів пам'ятати для розрахунку кута

    // --- Збереження поточної позиції ---
    this.oldPositions.push({ x: this.baseX, y: this.baseY });
    if (this.oldPositions.length > memoryFrames) {
      this.oldPositions.shift(); // Видалити найстарішу позицію
    }

    // --- Логіка руху ---
    if (!this.dead) {
      if (this.crawl) {
        if (Math.random() < 0.001) {
          this.crawl = false;
        }
        this.baseY += this.speed / 2;
        this.baseX += (this.speed * (Math.random() * 2 - 1)) / 2;
      } else if (this.isFiring) {
      } else {
        this.baseY += this.speed;
        this.baseX += this.speed * (Math.random() * 2 - 1);
      }

      // --- Анімація ---
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

    // --- Взаємодія з іншими ворогами ---
    for (let other of allEnemies) {
      if (this.dead || other === this || other.dead) continue;

      const dx = this.baseX - other.baseX;
      const dy = this.baseY - other.baseY;
      const distance = Math.hypot(dx, dy);
      const minDist = this.width * 0.5;

      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const push = (minDist - distance) / 2;
        this.baseX += Math.cos(angle) * push;
        this.baseY += Math.sin(angle) * push;
      }
    }

    // --- Розрахунок кута повороту ---
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

    // --- Оновлення візуальної позиції ---
    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }

  checkObstaclesCollision(index) {
    if (this.dead || this.isFiring) return;
    const forwardDistance = 150;
    const checkStep = 10;
    const detectionRadius = 10;
    const pushPower = 1.5;
    const angle = this.rotation - Math.PI / 2;
    let forwardBlocked = false;

    // Перевірка по променю вперед
    for (let d = 0; d < forwardDistance; d += checkStep) {
      const checkX = this.baseX + Math.cos(angle) * d;
      const checkY = this.baseY + Math.sin(angle) * d;

      for (let obstacle of this.obstacles) {
        const obstacleX = obstacle.x;
        const obstacleY = obstacle.y;
        const obstacleWidth = obstacle.width;
        const obstacleHeight = obstacle.height;

        if (
          checkX + detectionRadius > obstacleX &&
          checkX - detectionRadius < obstacleX + obstacleWidth &&
          checkY + detectionRadius > obstacleY &&
          checkY - detectionRadius < obstacleY + obstacleHeight
        ) {
          forwardBlocked = true;
          break;
        }
      }
      if (forwardBlocked) break; // якщо вже заблоковано — далі не перевіряємо
    }

    if (forwardBlocked) {
      // Вибір куди ухилятися: вліво або вправо
      const leftAngle = angle - Math.PI / 2;
      const rightAngle = angle + Math.PI / 2;

      let leftFree = true;
      let rightFree = true;

      // Перевірити ліво
      for (let d = 0; d < forwardDistance / 2; d += checkStep) {
        const checkX = this.baseX + Math.cos(leftAngle) * d;
        const checkY = this.baseY + Math.sin(leftAngle) * d;

        for (let obstacle of this.obstacles) {
          if (
            checkX + detectionRadius > obstacle.x &&
            checkX - detectionRadius < obstacle.x + obstacle.width &&
            checkY + detectionRadius > obstacle.y &&
            checkY - detectionRadius < obstacle.y + obstacle.height
          ) {
            leftFree = false;
            break;
          }
        }
        if (!leftFree) break;
      }

      // Перевірити право
      for (let d = 0; d < forwardDistance / 2; d += checkStep) {
        const checkX = this.baseX + Math.cos(rightAngle) * d;
        const checkY = this.baseY + Math.sin(rightAngle) * d;

        for (let obstacle of this.obstacles) {
          if (
            checkX + detectionRadius > obstacle.x &&
            checkX - detectionRadius < obstacle.x + obstacle.width &&
            checkY + detectionRadius > obstacle.y &&
            checkY - detectionRadius < obstacle.y + obstacle.height
          ) {
            rightFree = false;
            break;
          }
        }
        if (!rightFree) break;
      }

      // Вибрати сторону ухилення
      if (leftFree && !rightFree) {
        this.baseX += Math.cos(leftAngle) * this.speed;
        this.baseY += Math.sin(leftAngle) * this.speed;
      } else if (rightFree && !leftFree) {
        this.baseX += Math.cos(rightAngle) * this.speed;
        this.baseY += Math.sin(rightAngle) * this.speed;
      } else {
        // Якщо обидві сторони зайняті — уповільнення
        this.speed *= 0.9;
      }
    }

    // --- Відштовхування, якщо заїхав у перешкоду
    for (let obstacle of this.obstacles) {
      const centerX = obstacle.x + obstacle.width / 2;
      const centerY = obstacle.y + obstacle.height / 2;

      const dx = this.baseX - centerX;
      const dy = this.baseY - centerY;
      const distance = Math.hypot(dx, dy);

      if (
        this.baseX + this.width / 2 > obstacle.x &&
        this.baseX - this.width / 2 < obstacle.x + obstacle.width &&
        this.baseY + this.height / 2 > obstacle.y &&
        this.baseY - this.height / 2 < obstacle.y + obstacle.height
      ) {
        const nx = dx / distance; // Нормалізуємо вектор
        const ny = dy / distance;
        this.baseX += nx * pushPower;
        this.baseY += ny * pushPower;
      }
    }
  }

  draw() {
    if (!this.dead && !this.crawl && !this.isFiring) {
      this.ctx.save();
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
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
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
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
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
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
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
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
  constructor(x, y, layer, ctx, obstacles) {
    super(x, y, layer, ctx, obstacles);
    this.image = riflemanImage;
    this.type = "rifleman";
    this.fireDistance = 260;
    this.fireRate = 5;
    this.droneSpottingChanse = 1;
  }
}
export class Machinegunner extends Enemy {
  constructor(x, y, layer, ctx, obstacles) {
    super(x, y, layer, ctx, obstacles);
    this.image = machinegunnerImage;
    this.type = "machinegunner";
    this.fireDistance = 380;
    this.fireRate = 15;
    this.droneSpottingChanse = 2;
  }
}

export function createRifleSquad(
  x,
  y,
  spreadX,
  spreadY,
  layer1,
  ctx,
  obstacles
) {
  const squad = [];

  for (let i = 0; i < 5; i++) {
    squad.push(
      new Rifleman(
        x + Math.random() * 120 - 60,
        y + Math.random() * 300 - 155,
        layer1,
        ctx,
        obstacles
      )
    );
  }

  squad.push(
    new Machinegunner(
      x + Math.random() * 120 - 60,
      y + Math.random() * 300 - 155,
      layer1,
      ctx,
      obstacles
    )
  );

  return squad;
}
