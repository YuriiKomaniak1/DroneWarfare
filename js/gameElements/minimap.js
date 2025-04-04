export class Minimap {
  constructor(
    mapWidth,
    mapHeight,
    canvasWidth,
    canvasHeight,
    droneScope,
    enemies,
    ctx,
    layer

  ) {
    this.width = 200;
    this.height =this.width / mapWidth * mapHeight;
    this.scaleX = this.width / mapWidth;
    this.scaleY = this.height / mapHeight;
    this.droneScope = droneScope;
    this.enemies = enemies;
    this.ctx=ctx;
    this.mapX=10;
    this.mapY=canvasHeight-this.height-10;
    this.layer=layer;
    this.canvasWidth=canvasWidth;
    this.canvasHeight=canvasHeight;
  }
  draw() {
    // Фон мінікарти
    this.ctx.fillStyle = "rgba(34, 34, 34, 0.5)";
    this.ctx.fillRect(this.mapX, this.mapY, this.width, this.height);
    // дрон
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
        this.mapX+(this.canvasWidth/2-this.layer.x )* this.scaleX,
        this.mapY+(this.canvasHeight/2-this.layer.y) * this.scaleY,
      6,
      6
    );

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this.ctx.fillRect(
        this.mapX + (-this.layer.x * this.scaleX), 
        this.mapY + (-this.layer.y * this.scaleY),
        this.canvasWidth * this.scaleX, 
        this.canvasHeight * this.scaleY
      
    );

    // вороги
    this.ctx.fillStyle = "red";
    this.enemies.forEach((enemy) => {
        let tempX=this.mapX+(enemy.x-this.layer.x) * this.scaleX;
        let tempY=this.mapY+(enemy.y-this.layer.y )* this.scaleY
        if (
            tempX > this.mapX &&
            tempX < this.mapX + this.width &&
            tempY > this.mapY &&
            tempY < this.mapY + this.height
          ) {
            if (!enemy.dead) {
              this.ctx.fillRect(tempX, tempY, 4, 4);
            }
          }
        });
    // рамка
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(this.mapX, this.mapY, this.width, this.height);
  }
}
