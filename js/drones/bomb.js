export class Bomb {
  constructor(
    image,
    imageExplosion,
    x,
    y,
    spriteWidth,
    spriteHeight,
    scale,
    explosionscale,
    frames,
    layer,
    ctx
  ) {
    this.image = image;
    this.imageExplosion = imageExplosion;
    this.baseX = x;
    this.baseY = y;
    this.frameX = 0;
    this.frames = frames;
    this.width = spriteWidth;
    this.height = spriteHeight;
    this.scale = scale;
    this.initialScale = scale;
    this.spread = 1.8    ;
    this.exploded = false;
    this.explosionscale = explosionscale;
    this.friction = 0.997;
    this.shrinkRate = 1.009;
    this.velocityX = layer.speedX * 1; // Початкова швидкість
    this.velocityY = layer.speedY * 1;
    this.explosionFrame = 0;
    this.initialX = x;
    this.initialY = y;
    this.layer = layer;
    this.ctx = ctx;
  }

  drop() {
    if (!this.exploded) {
      this.velocityX *= this.friction ** 2;
      this.velocityY *= this.friction ** 2;

      this.baseX +=
        this.layer.speedX -
        this.velocityX +
        (Math.random() * this.spread - this.spread / 2);
      this.baseY +=
        this.layer.speedY -
        this.velocityY +
        (Math.random() * this.spread - this.spread / 2);

      this.scale /= this.shrinkRate;

      if (this.scale <= this.initialScale * 0.05) {
        this.exploded = true;
      }

      this.ctx.drawImage(
        this.image,
        this.baseX - (150 * this.scale) / this.initialScale,
        this.baseY - (150 * this.scale) / this.initialScale,
        (this.width * this.scale) / this.initialScale,
        (this.height * this.scale) / this.initialScale
      );
    } else {
      if (this.explosionFrame % 10 === 0) {
        this.frameX++;
        if (this.frameX >= this.frames) {
          this.frameX = this.frames;
        }
      }

      this.ctx.drawImage(
        this.imageExplosion,
        this.frameX * this.explosionscale,
        0,
        this.explosionscale,
        this.explosionscale,
        this.baseX - 32,
        this.baseY - 32,
        this.explosionscale,
        this.explosionscale
      );
      this.baseX += this.layer.speedX;
      this.baseY += this.layer.speedY;

      this.explosionFrame++;
    }
  }
}


