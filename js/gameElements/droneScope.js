export let droneScopeImage = new Image();
droneScopeImage.src = "./assets/img/drones/droneScope.png";
export class DroneScope {
  constructor(canvas, ctx) {
    this.a = Math.min(canvas.width / 2, canvas.height / 2.5);
    this.width = this.a;
    this.height = this.a;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.image = droneScopeImage;
    this.ctx = ctx;
  }

  update() {}

  draw(currentDrone) {
    if (currentDrone.countBombs() > 0 && currentDrone.isActive) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}
