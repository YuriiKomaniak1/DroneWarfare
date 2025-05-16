export class Minimap {
  constructor(canvas, enemies, vehicles, ctx, layer, bombs) {
    this.layer = layer;
    this.height = Math.max(canvas.height / 6, 100);
    this.width = (this.height / this.layer.height) * this.layer.width;
    this.scaleX = this.width / this.layer.width;
    this.scaleY = this.height / this.layer.height;
    this.enemies = enemies;
    this.ctx = ctx;
    this.mapX = 10;
    this.mapY = 10;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.vehicles = vehicles;
    this.bombs = bombs;
  }
  draw(gameData) {
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
    // полоса провалу місії
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this.ctx.fillRect(this.mapX + this.width + 2, this.mapY, 6, this.height);
    this.ctx.fillStyle = "rgba(160, 243, 6, 0.6)";
    this.ctx.fillRect(
      this.mapX + this.width + 2,
      this.mapY + this.height,
      6,
      Math.min(
        -(this.height * gameData.looseScore) / gameData.initialLooseScore,
        0
      )
    );

    //фон видимої зони
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
          if (
            enemy.type === "rifleman" ||
            enemy.type === "grenadier" ||
            enemy.type === "crew"
          ) {
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
    // ворожа техніка
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
          if (
            vehicle.type === "ural" ||
            vehicle.type === "gaz66" ||
            vehicle.type === "uralSupply" ||
            vehicle.type === "bm30" ||
            vehicle.type === "grad" ||
            vehicle.type === "uaz452" ||
            vehicle.type === "jeep"
          ) {
            this.ctx.fillStyle = "rgb(238, 117, 117)";
            this.ctx.fillRect(tempX, tempY, 3, 6);
          }
          if (
            vehicle.type === "bmp2" ||
            vehicle.type === "bmp1" ||
            vehicle.type === "mtlb" ||
            vehicle.type === "bukM2" ||
            vehicle.type === "bmp3" ||
            vehicle.type === "msta" ||
            vehicle.type === "t55" ||
            vehicle.type === "t62" ||
            vehicle.type === "t72" ||
            vehicle.type === "t72B3" ||
            vehicle.type === "t90"
          ) {
            this.ctx.fillStyle = "hsl(0, 86.40%, 51.00%)";
            this.ctx.fillRect(tempX, tempY, 4, 6);
          }
          if (
            vehicle.type === "guntruck" ||
            vehicle.type === "tigr" ||
            vehicle.type === "btr82" ||
            vehicle.type === "mtlbKPVT" ||
            vehicle.type === "kpvt" ||
            vehicle.type === "mtlbZU23" ||
            vehicle.type === "zu23" ||
            vehicle.type === "shilka"
          ) {
            this.ctx.fillStyle = "rgb(123, 2, 2)";
            this.ctx.fillRect(tempX, tempY, 4, 6);
          }
        }
      }
    });
    // міни
    this.bombs.forEach((bomb) => {
      if (bomb.deployed) {
        let tempX = this.mapX + (bomb.x - this.layer.x) * this.scaleX;
        let tempY = this.mapY + (bomb.y - this.layer.y) * this.scaleY;
        if (
          tempX > this.mapX &&
          tempX < this.mapX + this.width &&
          tempY > this.mapY &&
          tempY < this.mapY + this.height
        ) {
          if (bomb.type === "footMine") {
            this.ctx.fillStyle = "rgb(233, 230, 230)";
            this.ctx.fillRect(tempX, tempY, 2, 2);
          }
          if (bomb.type === "tankMine") {
            this.ctx.fillStyle = "rgb(233, 230, 230)";
            this.ctx.fillRect(tempX, tempY, 2, 3);
          }
          if (bomb.type === "tankMine") {
            this.ctx.fillStyle = "rgb(233, 230, 230)";
            this.ctx.fillRect(tempX, tempY, 3, 3);
          }
        }
      }
    });
    // рамка
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(this.mapX, this.mapY, this.width, this.height);
  }
}
