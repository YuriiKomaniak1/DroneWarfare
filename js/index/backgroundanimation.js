const back = document.querySelector('canvas');
const ctx = back.getContext('2d');
const backWidth = window.innerWidth;
const backHeight = window.innerHeight;
back.width = backWidth;
back.height = backHeight;

let gameSpeed = 1;
let gameFrame = 0;

// Завантаження фонового зображення
const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/img/index/mainBackgroundIndex.png';

// Клас для фону
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 3000;
        this.height = backHeight;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) this.x = 0;
        this.x -= this.speed;
    }

    draw() {
        ctx.globalAlpha = 0.6; // Прозорість фону
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        ctx.globalAlpha = 1; // Відновлюємо нормальну прозорість
    }
}

const layer1 = new Layer(backgroundLayer1, 0.8);
const gameObjects = [layer1];

// Завантаження зображення дрона
const smallDrone = new Image();
smallDrone.src = './assets/img/drones/smallDroneAnimation.png';
const mediumDrone = new Image();
mediumDrone.src = './assets/img/drones/mediumDroneAnimation.png';
const bigDrone = new Image();
bigDrone.src = './assets/img/drones/bigDroneAnimation.png';

// Масив дронів
let drones = [];

// Функція для створення дрона
function addDrone(startX, startY, speed,image,scale) {
    drones.push({
        x: startX,
        y: startY,
        speed: speed,
        frameX: 0,
        img:image,
        scale:scale
    });
}

// Додаємо дронів з різними параметрами
addDrone(backWidth, 100, 1,smallDrone,1);
addDrone(backWidth + 700, 200, 0.9,smallDrone,1.1);
addDrone(backWidth + 1800, 700, 1.1,smallDrone,0.9);
addDrone(backWidth + 1500, 500, 0.7,mediumDrone,1.4);
addDrone(backWidth + 900, 300, 0.65,mediumDrone,1.5);
addDrone(backWidth + 500, 400, 0.45,bigDrone,3);

function updateDrones() {
    drones.forEach(drone => {
        // Оновлення позиції дрона
        drone.x -= drone.speed*3.5;
        if (drone.x < -250) {
            drone.x = backWidth * 1.5; // Перезапуск дрона справа
            drone.y = Math.random() * (backHeight -250); // Нова випадкова висота
        }

        // Оновлення кадру анімації
        let position = Math.floor(gameFrame / 2.5) % 4;
        drone.frameX = position * 250;

        ctx.save();
        ctx.translate(drone.x + 125, drone.y + 125); // Центр дрона
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(
            drone.img,
            drone.frameX, 0,
            250, 250,
            -125, -125,
            125*drone.scale, 125*drone.scale
        );
        ctx.restore();
    });
}

const FPS = 60;
const FRAME_TIME = 1000 / FPS; 
let lastTime = 0;

function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  if (deltaTime >= FRAME_TIME) {
    lastTime = timestamp - (deltaTime % FRAME_TIME);
    ctx.clearRect(0, 0, backWidth, backHeight);

    // Малюємо фон
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    // Малюємо дронів
    updateDrones();

    gameFrame++;
}
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
