export let droneScope = new Image();
droneScope.src = "./assets/img/drones/droneScope.png";
export class Drone {
  constructor(image,scopeWidth,scopeHeight,canvas,ctx) {
    this.x = canvas.width / 2 - scopeWidth/2;
    this.y = canvas.height / 2 - scopeHeight/2;
    this.width = scopeWidth;
    this.height = scopeHeight;
    this.image = image;
    this.ctx=ctx;

  }

  update() {}

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}



