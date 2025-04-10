let riflemanImage = new Image();
riflemanImage.src = "./assets/img/enemies/spritesheetSoldierAk.png";
export class Enemy {
  constructor(image, x, y, layer, ctx, obstacle, fireDistance, fireRate, type) {
    this.image = image;
    this.type = this.type;
    this.baseX = x;
    this.baseY = y;
    this.prevX = x;
    this.prevY = y;
    this.layer = layer;
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
    this.fireDistance = fireDistance;
    this.fireRate = fireRate;
    this.fireTimer = 0;
    this.obstacles = obstacle;
    this.rotationAngle = 0;
    this.oldPositions = []; // Масив з історією положення
    this.positionMemory = 15; // Кількість кадрів для затримки
  }

  update(allEnemies) {
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
    if (this.oldPositions.length > 0) {
      const oldest = this.oldPositions[0];
      const deltaX = this.baseX - oldest.x;
      const deltaY = this.baseY - oldest.y;

      if (Math.abs(deltaX) > 0.01 || Math.abs(deltaY) > 0.01) {
        const targetAngle = Math.atan2(deltaY, deltaX) - Math.PI / 2;
        this.rotationAngle += (targetAngle - this.rotationAngle) * 0.05; // Плавне наближення
      }
    }

    // --- Оновлення візуальної позиції ---
    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }

  checkObstaclesCollision(index) {
    const warningZone = 10; // Зона попередження навколо перешкоди
    const forwardDistance = 150; // Дальність прямої перевірки
    const sideDistance = 100; // Довжина відхилення під 45 градусів
    const angleOffset = Math.PI / 4; // 45 градусів в радіанах

    let forwardBlocked = false;
    let leftBlocked = false;
    let rightBlocked = false;

    // Перевірка попереду
    const forwardX = this.baseX;
    const forwardY = this.baseY + forwardDistance;

    // Перевірка під кутом вправо
    const rightX = this.baseX + Math.cos(angleOffset) * sideDistance;
    const rightY = this.baseY + Math.sin(angleOffset) * sideDistance;

    // Перевірка під кутом вліво
    const leftX = this.baseX + Math.cos(-angleOffset) * sideDistance;
    const leftY = this.baseY + Math.sin(-angleOffset) * sideDistance;

    for (let obstacle of this.obstacles) {
      const obstacleX = obstacle.x;
      const obstacleY = obstacle.y - warningZone;
      const obstacleWidth = obstacle.width;
      const obstacleHeight = obstacle.height;

      // Перевірка попереду
      if (
        forwardX + this.width - 20 > obstacleX &&
        forwardX + 20 < obstacleX + obstacleWidth &&
        forwardY - 20 + this.height > obstacleY &&
        forwardY + 20 < obstacleY + obstacleHeight
      ) {
        forwardBlocked = true;
      }

      // Перевірка вправо
      if (
        rightX + this.width - 20 > obstacleX &&
        rightX + 20 < obstacleX + obstacleWidth &&
        rightY - 20 + this.height > obstacleY &&
        rightY + 20 < obstacleY + obstacleHeight
      ) {
        rightBlocked = true;
      }

      // Перевірка вліво
      if (
        leftX + this.width - 20 > obstacleX &&
        leftX + 20 < obstacleX + obstacleWidth &&
        leftY - 20 + this.height > obstacleY &&
        leftY + 20 < obstacleY + obstacleHeight
      ) {
        leftBlocked = true;
      }
    }

    // Якщо попереду перешкода — обираємо напрямок
    if (forwardBlocked) {
      if (!leftBlocked && rightBlocked) {
        // Ліво вільне
        this.baseX += this.speed * -1 * (0.6 + Math.random() * 0.5);
        this.baseY += this.speed;
      } else if (!rightBlocked && leftBlocked) {
        // Право вільне
        this.baseX += this.speed * (0.6 + Math.random() * 0.5);
        this.baseY += this.speed;
      } else {
        // Обидва варіанти або заблоковані або вільні - випадково по індексу
        const direction = index % 2 === 0 ? -1 : 1;
        this.baseX += this.speed * direction;
        this.baseY += this.speed;
      }
    }

    for (let obstacle of this.obstacles) {
      const obstacleX = obstacle.x;
      const obstacleY = obstacle.y - warningZone;
      const obstacleWidth = obstacle.width;
      const obstacleHeight = obstacle.height;

      if (
        this.baseX + this.width - 20 > obstacleX &&
        this.baseX + 20 < obstacleX + obstacleWidth &&
        this.baseY - 20 + this.height > obstacleY &&
        this.baseY + 20 < obstacleY + obstacleHeight
      ) {
        const direction = index % 2 === 0 ? -1 : 1;
        this.baseY -= this.speed;
        this.baseX += this.speed * direction;
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

export function createRifleman(x, y, layer1, ctx, obstacles) {
  return new Enemy(
    riflemanImage,
    x,
    y,
    layer1,
    ctx,
    obstacles,
    260,
    5,
    "rifleman"
  );
}
