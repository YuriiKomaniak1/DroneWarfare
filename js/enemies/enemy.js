export class Enemy {
    constructor(image, x, y, speed, spriteWidth, spriteHeight, frames,layer,ctx) {
      this.image = image;
      this.baseX = x;
      this.baseY = y;
      this.speed = speed;
      this.width = spriteWidth;
      this.height = spriteHeight;
      this.frameX = Math.floor(Math.random() * frames);
      this.frameY = 3;
      this.frameSpeed = 40;
      this.frames = frames;
      this.frameTimer = 0;
      this.dead = false;
      this.deathFrames = 4;
      this.deathFrameIndex = 0;
      this.deathAnimationSpeed = 50;
      this.deathTimer = 0;
      this.layer = layer;
      this.ctx=ctx;
    }
    update() {
      if (!this.dead) {
        this.baseY += this.speed;
        if (Math.round(this.baseX) % 1 === 0)
          this.baseX += this.speed * (Math.random() * 6 - 3);
        // Анімація ворога
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
          this.frameX = (this.frameX + 1) % this.frames;
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
      this.x = this.baseX + this.layer.x;
      this.y = this.baseY + this.layer.y;
    }
    draw() {
      if (!this.dead) {
        this.ctx.drawImage(
          this.image,
          this.frameX * this.width,
          this.frameY * this.height,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else {
        this.ctx.drawImage(
          this.image,
          this.deathFrameIndex * this.width,
          1 * this.height,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
    }
  }