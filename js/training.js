/** @type {HTMLCanvasElement}  */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = 800);
let CANVAS_HEIGHT = (canvas.height = 900);

let gameField = new Image();
gameField.src = "./assets/img/grounds/train1bottom.png";

let trees = new Image();
trees.src = "./assets/img/grounds/train1trees.png";

let droneScope = new Image();
droneScope.src = "./assets/img/drones/droneScope.png";

class Layer {
  constructor(image) {
    this.x = canvas.width / 2 - 700;
    this.y = canvas.height - 1400;
    this.width = 1400;
    this.height = 1400;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
    this.acceleration = 0.01;
    this.deceleration = 0.001;
    this.maxSpeed = 0.15;
  }

  update() {
    if (keys.up && this.y < canvas.height / 2) {
      this.speedY += this.acceleration;
    } else if (keys.down && this.y > canvas.height / 2 - this.height) {
      this.speedY -= this.acceleration;
    } else {
      this.speedY *= 1 - this.deceleration;
      if (Math.abs(this.speedY) < 0.001) this.speedY = 0;
    }

    if (keys.left && this.x < canvas.width / 2) {
      this.speedX += this.acceleration;
    } else if (keys.right && this.x > canvas.width / 2 - this.width) {
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

    if (this.x > canvas.width / 2) {
      this.speedX = 0;this.x--;
    }
    if (this.x < canvas.width / 2 - this.width) {
      this.speedX = 0;this.x++;
    }
    if (this.y > canvas.height / 2 ){this.speedY = 0;this.y--;} 
        
            if(this.y < canvas.height / 2 - this.height) {
      this.speedY = 0;this.y++;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Drone {
  constructor(image) {
    this.x = canvas.width / 2 - 200;
    this.y = CANVAS_HEIGHT / 2 - 175;
    this.width = 400;
    this.height = 350;
    this.image = image;
  }

  update() {}

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(gameField);
const layer2 = new Layer(trees);
const drone = new Drone(droneScope);
const gameObjects = [layer1, layer2];

const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.up = true;
      break;
    case "ArrowDown":
      keys.down = true;
      break;
    case "ArrowLeft":
      keys.left = true;
      break;
    case "ArrowRight":
      keys.right = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.up = false;
      break;
    case "ArrowDown":
      keys.down = false;
      break;
    case "ArrowLeft":
      keys.left = false;
      break;
    case "ArrowRight":
      keys.right = false;
      break;
  }
});
gameField.onload =
  trees.onload =
  droneScope.onload =
    function () {
      animate(); // Запускаємо анімацію після завантаження обох зображень
    };

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Очищаємо канвас
  gameObjects.forEach((object) => {
    object.update();
    object.draw();
  });
  drone.draw();

  requestAnimationFrame(animate); // Викликаємо анімацію повторно
}
