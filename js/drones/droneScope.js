export let droneScopeImage = new Image();
droneScopeImage.src = "./assets/img/drones/droneScope.png";
export class DroneScope {
  constructor(image, canvas, ctx) {
    this.width = canvas.width / 2.5;
    this.height = canvas.width / 2.5;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.image = image;
    this.ctx = ctx;
  }

  update() {}

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
