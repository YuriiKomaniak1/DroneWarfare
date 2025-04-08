export class Layer {
  constructor(image,canvas,mapWidth,mapheight,keys,ctx) {
    this.canvas=canvas;
    this.x = canvas.width / 2 - mapWidth/2;
    this.y = canvas.height - mapheight;
    this.width = mapWidth;
    this.height = mapheight;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
    this.acceleration = 0.01;
    this.deceleration = 0.007;
    this.maxSpeed = 1.3;
    this.keys=keys;
    this.ctx=ctx;
  }

  update() {
    if (this.keys.up && this.y < this.canvas.height / 2) {
      this.speedY += this.acceleration;
    } else if (this.keys.down && this.y > this.canvas.height / 2 - this.height) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY *= 1 - this.deceleration;
      if (Math.abs(this.speedY) < 0.001) this.speedY = 0;
    }

    if (this.keys.left && this.x < this.canvas.width / 2) {
      this.speedX += this.acceleration;
    } else if (this.keys.right && this.x > this.canvas.width / 2 - this.width) {
      this.speedX -= this.acceleration;
    } else {
      this.speedX *= 1 - this.deceleration;
      if (Math.abs(this.speedX) < 0.001) this.speedX = 0;
    }

    this.speedX = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.speedX)
    );
    this.speedY = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.speedY)
    );

    if (this.x > this.canvas.width / 2) {
      this.speedX = 0;
      this.x--;
    }
    if (this.x < this.canvas.width / 2 - this.width) {
      this.speedX = 0;
      this.x++;
    }
    if (this.y > this.canvas.height / 2) {
      this.speedY = 0;
      this.y--;
    }

    if (this.y < this.canvas.height / 2 - this.height) {
      this.speedY = 0;
      this.y++;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }


  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}