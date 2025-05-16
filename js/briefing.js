import { briefingText } from "./briefing/briefingText.js";
import { BriefingDrones } from "./gameElements/briefingDroneIcons.js";
import { gameState } from "./logic/gamestate.js";
import { SmallDrone, MediumDrone, BigDrone } from "./drones/drones.js";

// витягування даних з пам'яті
const gameData = JSON.parse(localStorage.getItem("gameData"));
const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};

gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
gameState.updateData(gameData);
gameState.drones.forEach((drone) => {
  if (drone?.resetAmmo) {
    drone.resetAmmo();
  }
});
console.log(volumeSettings);
const shouldPlayMusic = localStorage.getItem("playBriefingMusic") === "true";
const missionKey = gameData.currentMission; // Сюди підставляється поточна місія
// брифінг перед місією
document.getElementById("briefing-text").innerHTML = briefingText[missionKey];

// обробка кнопок внизу
document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("upgrade-button").addEventListener("click", () => {
  localStorage.setItem("playUpgradeMusic", "true");
  window.location.href = "upgrades.html";
});
document.getElementById("start-button").addEventListener("click", () => {
  let href = "";
  switch (missionKey) {
    case 1:
      href = "level1.html";
      break;
    case 2:
      href = "level2.html";
      break;
    case 3:
      href = "level3.html";
      break;
    case 4:
      href = "level4.html";
      break;
    case 5:
      href = "level5.html";
      break;
    case 6:
      href = "level6.html";
      break;
  }
  localStorage.setItem("playDroneMusic", "true");
  window.location.href = href;
});
// обробка музики
if (shouldPlayMusic) {
  const music = new Audio("./assets/audio/music/briefing-music.mp3");
  music.loop = true;
  music.volume = volumeSettings.musicVolume * 0.15;

  // Спроба відтворити
  music.play().catch((e) => {
    console.warn("Автовідтворення музики заблоковано:", e);
  });

  // Видаляємо прапорець, щоб не повторювалося
  localStorage.removeItem("playBriefingMusic");
}
// Малюємо дронів та боєзапас
const canvas = document.getElementById("droneCanvas");
const ctx = canvas.getContext("2d");
canvas.height = canvas.width / 3.8;
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
