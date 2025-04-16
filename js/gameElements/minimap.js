export class Minimap {
  constructor(mapWidth, mapHeight, canvas, enemies, vehicles, ctx, layer) {
    this.width = Math.max(canvas.width / 5, 100);
    this.height = (this.width / mapWidth) * mapHeight;
    this.scaleX = this.width / mapWidth;
    this.scaleY = this.height / mapHeight;
    this.enemies = enemies;
    this.ctx = ctx;
    this.mapX = 10;
    this.mapY = 10;
    this.layer = layer;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.vehicles = vehicles;
  }
  draw() {
    // Фон мінікарти
    this.ctx.fillStyle = "rgba(34, 34, 34, 0.5)";
    this.ctx.fillRect(this.mapX, this.mapY, this.width, this.height);
    // дрон
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      this.mapX + (this.canvasWidth / 2 - this.layer.x) * this.scaleX,
      this.mapY + (this.canvasHeight / 2 - this.layer.y) * this.scaleY,
      6,
      6
    );

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this.ctx.fillRect(
      this.mapX + -this.layer.x * this.scaleX,
      this.mapY + -this.layer.y * this.scaleY,
      this.canvasWidth * this.scaleX,
      this.canvasHeight * this.scaleY
    );

    // вороги
    this.enemies.forEach((enemy) => {
      let tempX = this.mapX + (enemy.x - this.layer.x) * this.scaleX;
      let tempY = this.mapY + (enemy.y - this.layer.y) * this.scaleY;
      if (
        tempX > this.mapX &&
        tempX < this.mapX + this.width &&
        tempY > this.mapY &&
        tempY < this.mapY + this.height
      ) {
        if (!enemy.dead) {
          if (enemy.type === "rifleman" || enemy.type === "grenadier") {
            this.ctx.fillStyle = "rgb(255, 0, 0)";
            this.ctx.fillRect(tempX, tempY, 3, 3);
          }
          if (enemy.type === "machinegunner") {
            this.ctx.fillStyle = "rgb(123, 2, 2)";
            this.ctx.fillRect(tempX, tempY, 4, 4);
          }
        }
      }
    });
    this.vehicles.forEach((vehicle) => {
      let tempX = this.mapX + (vehicle.x - this.layer.x) * this.scaleX;
      let tempY = this.mapY + (vehicle.y - this.layer.y) * this.scaleY;
      if (
        tempX > this.mapX &&
        tempX < this.mapX + this.width &&
        tempY > this.mapY &&
        tempY < this.mapY + this.height
      ) {
        if (!vehicle.isDestroyed) {
          if (vehicle.type === "ural" || vehicle.type === "gaz66") {
            this.ctx.fillStyle = "rgb(238, 117, 117)";
            this.ctx.fillRect(tempX, tempY, 3, 6);
          }
          if (vehicle.type === "bmp2" || vehicle.type === "bmp1") {
            this.ctx.fillStyle = "hsl(0, 86.40%, 51.00%)";
            this.ctx.fillRect(tempX, tempY, 4, 6);
          }
          if (vehicle.type === "guntruck") {
            this.ctx.fillStyle = "rgb(123, 2, 2)";
            this.ctx.fillRect(tempX, tempY, 4, 7);
          }
        }
      }
    });

    // рамка
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(this.mapX, this.mapY, this.width, this.height);
  }
}
