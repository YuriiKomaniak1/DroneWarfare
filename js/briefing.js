import { briefingText } from "./briefing/briefingText.js";
import { BriefingDrones } from "./gameElements/briefingDroneIcons.js";
import { gameState } from "./logic/gamestate.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
console.log(gameData);
gameState.updateData(gameData);

const missionKey = "mission1"; // Сюди підставляється поточна місія
document.getElementById("briefing-text").innerHTML = briefingText[missionKey];

// Малюємо дронів та боєзапас
const canvas = document.getElementById("droneCanvas");
const ctx = canvas.getContext("2d");
canvas.height = canvas.width / 3.8;

document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});
const droneIcons = [];
for (let i = 0; i < 5; i++) {
  const spase = canvas.width / 21;
  const iconWidth = canvas.width / 7;
  let x = spase + i * (iconWidth + spase);
  droneIcons[i] = new BriefingDrones(
    canvas,
    ctx,
    gameState.drones[i],
    iconWidth,
    x,
    10
  );
}
console.log(droneIcons);
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  droneIcons.forEach((droneIcon, index) => {
    const { x, y, width, height } = droneIcon;
    const buttonHeight = height / 5;
    const buttonY = y + height + 5;
    console.log(droneIcon.drone);

    // Перевірка: чи клік всередині зони дрона + кнопки "спорядити"
    if (
      mouseX >= x &&
      mouseX <= x + width &&
      mouseY >= y &&
      mouseY <= buttonY + buttonHeight
    ) {
      if (droneIcon.drone) {
        // Зберігаємо індекс дрона в localStorage
        localStorage.setItem("droneToEquip", index);
        // Переходимо на сторінку спорядження
        window.location.href = "equip.html"; // заміни на свою назву
      }
    }
  });
});
let lastTime = 0;
function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  if (deltaTime >= FRAME_TIME) {
    lastTime = timestamp - (deltaTime % FRAME_TIME);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    droneIcons.forEach((object) => {
      object.draw();
    });
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate); // Запускаємо цикл
