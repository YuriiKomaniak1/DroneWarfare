export class Enemy {
  constructor(
    image,
    x,
    y,
    spriteWidth,
    spriteHeight,
    frames,
    layer,
    ctx,
    obstacle
  ) {
    this.image = image;
    this.baseX = x;
    this.baseY = y;
    this.speed = Math.random() * 0.04 + 0.32;
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.frameX = Math.floor(Math.random() * frames);
    this.frameY = 3;
    this.frameSpeed = 20;
    this.frames = frames;
    this.frameTimer = 0;
    this.dead = false;
    this.crawl = false;
    this.deathFrames = 4;
    this.crawlFrames = 3;
    this.deathFrameIndex = 0;
    this.deathAnimationSpeed = 10;
    this.deathTimer = 0;
    this.layer = layer;
    this.ctx = ctx;
    this.deathAngle = Math.random() * 2 * Math.PI; // Випадковий кут
    this.obstacles = obstacle;
    this.rotationAngle = 0;
  }

  update(allEnemies) {
    if (this.crawl) if (Math.random() > 0.9993) this.crawl = false;
    if (!this.dead && !this.crawl) {
      this.baseY += this.speed;
      if (Math.round(this.baseX) % 1 === 0)
        this.baseX += this.speed * (Math.random() * 6 - 3);
      // Анімація ворога
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frameX = (this.frameX + 1) % this.frames;
        this.frameTimer = 0;
      }
    } else if (!this.dead && this.crawl) {
      this.baseY += this.speed / 2;
      if (Math.round(this.baseX) % 1 === 0)
        this.baseX += (this.speed * (Math.random() * 6 - 3)) / 2;
      this.frameTimer++;
      if (this.frameTimer >= this.frameSpeed) {
        this.frameX = (this.frameX + 1) % this.crawlFrames;
        this.frameTimer = 0;
      }
    } else {
      this.deathTimer++;
      if (this.deathTimer >= this.deathAnimationSpeed) {
        this.deathFrameIndex++;
        this.deathTimer = 0;
      }
      if (this.deathFrameIndex >= this.deathFrames) {
        this.deathFrameIndex = this.deathFrames;
      }
    }

    // Перевірка на зіткнення з іншими ворогами
    for (let other of allEnemies) {
      if (this.dead || other === this || other.dead) continue;

      const dx = this.baseX - other.baseX;
      const dy = this.baseY - other.baseY;
      const distance = Math.hypot(dx, dy);
      const minDist = this.width * 0.8;

      if (distance < minDist) {
        // Відштовхуємо об'єкти
        const angle = Math.atan2(dy, dx);
        const push = (minDist - distance) / 2;

        this.baseX += Math.cos(angle) * push;
        this.baseY += Math.sin(angle) * push;
      }
    }

    this.x = this.baseX + this.layer.x;
    this.y = this.baseY + this.layer.y;
  }
  checkObstaclesCollision(index) {
    let pushX = 0;
    let pushY = 0;
    const warningZone = 10; // Зона попередження навколо перешкоди

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
        const  direction = index % 2 === 0 ? 1 : -1;
        this.baseY -= this.speed;
        this.baseX += this.speed * direction;
        this.rotationAngle += direction * 0.5
      } else {
       
        this.rotationAngle *= 0.9;
      }
    }
  }

  draw() {
    if (!this.dead && !this.crawl) {
      this.ctx.save();
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      this.ctx.rotate(this.rotationAngle);
      this.ctx.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      this.ctx.restore();
  
    } else if (!this.dead && this.crawl) {
      this.ctx.drawImage(
        this.image,
        this.frameX * this.width,
        0 * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
  
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
  }}