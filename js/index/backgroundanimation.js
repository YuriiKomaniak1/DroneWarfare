// Отримуємо canvas і контекст
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

const layer1 = new Layer(backgroundLayer1, 0.2);
const gameObjects = [layer1];

// Завантаження дрона
const smallDrone = new Image();
smallDrone.src = './assets/img/drones/smallDroneAnimation.png';

const spriteWidth = 250;
const spriteHeight = 250;
const numberOfFrames = 4;
let frameX = 0;
let frameY = 0;
let droneX = backWidth; // Початкова позиція X
let droneY = 200; // Початкова позиція Y
let droneSpeed = 1; // Швидкість дрона

function animate() {
    ctx.clearRect(0, 0, backWidth, backHeight);

    // Малюємо фон
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    // Оновлюємо положення дрона
    droneX -= droneSpeed;
    if (droneX < -250) {
        droneX = backWidth*2; // Перезапускаємо дрона зліва
    }

    // Анімація дрона
    let position = Math.floor(gameFrame / 5) % numberOfFrames;
    frameX = position * spriteWidth;
    frameY = 0;

    ctx.save();
    ctx.translate(droneX + spriteWidth / 2, droneY + spriteHeight / 2); // Переносимо центр
    ctx.rotate(Math.PI / 2); // Поворот на 90 градусів за годинниковою стрілкою
    ctx.drawImage(
        smallDrone,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        -spriteWidth / 2,
        -spriteHeight / 2,
        spriteWidth*0.5,
        spriteHeight*0.5
    );
    ctx.restore();

    gameFrame++;
    requestAnimationFrame(animate);
}

// Запускаємо анімацію після завантаження фону
backgroundLayer1.onload = function () {
    animate();
};