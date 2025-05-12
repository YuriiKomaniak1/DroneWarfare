const uralZImage = new Image();
uralZImage.src = "./assets/img/vehicles/uralZ.png";
const uralVImage = new Image();
uralVImage.src = "./assets/img/vehicles/uralV.png";
const gaz66ZImage = new Image();
gaz66ZImage.src = "./assets/img/vehicles/gaz66Z.png";
const gaz66VImage = new Image();
gaz66VImage.src = "./assets/img/vehicles/gaz66V.png";
const bmp2ZImage = new Image();
bmp2ZImage.src = "./assets/img/vehicles/bmp2Z.png";
const bmp2VImage = new Image();
bmp2VImage.src = "./assets/img/vehicles/bmp2V.png";
const bmp2turret = new Image();
bmp2turret.src = "./assets/img/vehicles/bmp2turret.png";
const bmp1ZImage = new Image();
bmp1ZImage.src = "./assets/img/vehicles/bmp1Z.png";
const bmp1VImage = new Image();
bmp1VImage.src = "./assets/img/vehicles/bmp1V.png";
const bmp1turret = new Image();
bmp1turret.src = "./assets/img/vehicles/bmp1turret.png";
const mtlbZImage = new Image();
mtlbZImage.src = "./assets/img/vehicles/mtlbZ.png";
const mtlbVImage = new Image();
mtlbVImage.src = "./assets/img/vehicles/mtlbV.png";
const guntruckZImage = new Image();
guntruckZImage.src = "./assets/img/vehicles/guntruckZ.png";
const guntruckVImage = new Image();
guntruckVImage.src = "./assets/img/vehicles/guntruckV.png";
const guntruckturret = new Image();
guntruckturret.src = "./assets/img/vehicles/guntruckturret.png";
const tigrZImage = new Image();
tigrZImage.src = "./assets/img/vehicles/tigrZ.png";
const tigrVImage = new Image();
tigrVImage.src = "./assets/img/vehicles/tigrV.png";
const tigrturret = new Image();
tigrturret.src = "./assets/img/vehicles/tigrturret.png";
import { Vehicle } from "./vehicleClass.js";
import { VehicleSoundPlayer } from "../gameElements/sounds.js";

export class Ural extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? uralZImage : uralVImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 224;
    this.type = "ural";
    this.scale = 0.7;
    this.speed = 0.4;
    this.score = 220;
  }
}
export class Gaz66 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? gaz66ZImage : gaz66VImage;
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 170;
    this.type = "gaz66";
    this.scale = 0.7;
    this.speed = 0.4;
    this.gassmokeoffsetY = -0.7;
    this.smokeScale = 0.45;
    this.score = 180;
  }
}

export class BMP2 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? bmp2ZImage : bmp2VImage;
    this.turretImage = bmp2turret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "bmp2";
    this.scale = 0.68;
    this.turretScale = 0.73;
    this.speed = 0.3;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.6;
    this.armor = 5;
    this.turretOffsetX = 0;
    this.turretOffsetY = -0.07;
    this.hasTurret = true;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 400;
    this.hasCrew = true;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/tank.mp3",
      0.4
    );
  }
}

export class BMP1 extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? bmp1ZImage : bmp1VImage;
    this.turretImage = bmp1turret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "bmp1";
    this.scale = 0.68;
    this.turretScale = 0.68;
    this.speed = 0.3;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.6;
    this.armor = 4;
    this.turretOffsetX = -0.05;
    this.turretOffsetY = -0.08;
    this.hasTurret = true;
    this.vehiclefireOffsetX = -0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 350;
    this.hasCrew = true;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/tank.mp3",
      0.4
    );
  }
}
export class Guntruck extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? guntruckZImage : guntruckVImage;
    this.turretImage = guntruckturret;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 97;
    this.type = "guntruck";
    this.scale = 0.88;
    this.turretScale = 0.88;
    this.speed = 0.5;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.3;
    this.armor = 0;
    this.turretOffsetX = -0.05;
    this.turretOffsetY = -0.18;
    this.hasGunner = true;
    this.hasTurret = true;
    this.vehiclefireOffsetX = -0;
    this.vehiclefireOffsetY = -0.1;
    this.score = 400;
    this.droneSpottingChanse = 4;
    this.fireDistance = 400;
    this.fireRate = 40;
    this.fireSound = new Audio("assets/audio/fire/heavyMachinegun.mp3");
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/jeep.mp3",
      0.4
    );
  }
}

export class Tigr extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? tigrZImage : tigrVImage;
    this.turretImage = tigrturret;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "tigr";
    this.scale = 0.56;
    this.turretScale = 0.9;
    this.speed = 0.44;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.3;
    this.armor = 1;
    this.turretOffsetX = 0;
    this.turretOffsetY = -0.05;
    this.hasGunner = true;
    this.hasTurret = true;
    this.vehiclefireOffsetX = 0;
    this.vehiclefireOffsetY = 0;
    this.score = 350;
    this.droneSpottingChanse = 2;
    this.fireDistance = 320;
    this.fireRate = 15;
  }
}

export class MTLB extends Vehicle {
  constructor(x, y, layer, ctx, waypoints, navigaionsGrid) {
    super(x, y, layer, ctx, waypoints, navigaionsGrid);
    this.image = Math.random() > 0.4 ? mtlbZImage : mtlbVImage;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 200;
    this.type = "mtlb";
    this.scale = 0.68;
    this.speed = 0.3;
    this.gassmokeoffsetY = -0.7;
    this.gassmokeoffsetX = 0.7;
    this.smokeScale = 0.6;
    this.armor = 2;
    this.score = 350;
    this.hasCrew = true;
    this.driveSound = new VehicleSoundPlayer(
      "assets/audio/vehicle/tank.mp3",
      0.4
    );
  }
}
