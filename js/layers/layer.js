export class Layer {
  constructor(image, canvas, mapWidth, mapHeight, ctx, rotationDegrees = 0) {
    this.canvas = canvas;
    this.x = canvas.width / 2 - mapWidth / 2;
    this.y = canvas.height - mapHeight;
    this.width = mapWidth;
    this.height = mapHeight;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
    this.acceleration = 0.01;
    this.deceleration = 0.007;
    this.ctx = ctx;
    this.rotation = (rotationDegrees * Math.PI) / 180; // з градусів у радіани
  }

  update(keys, drone) {
    this.acceleration = drone.speed / 100;
    this.deceleration = drone.speed / 100;

    if (keys.up && this.y < this.canvas.height / 2) {
      this.speedY += this.acceleration;
    } else if (keys.down && this.y > this.canvas.height / 2 - this.height) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY *= 1 - this.deceleration;
      if (Math.abs(this.speedY) < 0.001) this.speedY = 0;
    }

    if (keys.left && this.x < this.canvas.width / 2) {
      this.speedX += this.acceleration;
    } else if (keys.right && this.x > this.canvas.width / 2 - this.width) {
      this.speedX -= this.acceleration;
    } else {
      this.speedX *= 1 - this.deceleration;
      if (Math.abs(this.speedX) < 0.001) this.speedX = 0;
    }

    this.speedX = Math.max(-drone.speed, Math.min(drone.speed, this.speedX));
    this.speedY = Math.max(-drone.speed, Math.min(drone.speed, this.speedY));

    const currentSpeed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
    if (currentSpeed > drone.speed) {
      const scale = drone.speed / currentSpeed;
      this.speedX *= scale;
      this.speedY *= scale;
    }

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
    if (this.image.complete && this.image.naturalWidth > 0) {
      if (this.rotation === 0) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.ctx.save();

        // Центр шару
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.rotation);
        this.ctx.drawImage(
          this.image,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );

        this.ctx.restore();
      }
    }
  }
}
