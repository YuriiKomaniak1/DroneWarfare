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

const shouldPlayMusic = localStorage.getItem("playBriefingMusic") === "true";
const missionKey = gameData.currentMission; // Сюди підставляється поточна місія
// брифінг перед місією
document.getElementById("briefing-text").innerHTML = briefingText[missionKey];

// обробка кнопок внизу
document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});
document.getElementById("back").addEventListener("click", () => {
  document.getElementById("saveModal").style.visibility = "hidden";
});
document.getElementById("back1").addEventListener("click", () => {
  document.getElementById("saveOkModal").style.visibility = "hidden";
});
document.getElementById("save-button").addEventListener("click", () => {
  document.getElementById("saveModal").style.visibility = "visible";
  const gameSave = JSON.parse(localStorage.getItem("gameSave")) || {
    saves: [],
  };
  let difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {};
  const saveContent = document.getElementById("saveContent");
  saveContent.innerHTML = ""; // 🧹 очищення перед додаванням нових кнопок
  for (let i = 0; i < 10; i++) {
    let save = gameSave.saves[i];
    const btn = document.createElement("button");
    btn.className = "saveButton";
    if (save) {
      const missionId = save.mission;
      const difficulty = save.difficulty?.level || "medium";
      const date = new Date(save.date).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      btn.textContent = `Місія ${missionId} — ${difficulty} — ${date}`;

      saveContent.appendChild(btn);
    } else {
      btn.textContent = `Слот ${i + 1} — порожній`;
      saveContent.appendChild(btn);
    }
    btn.addEventListener("click", () => {
      save = {
        data: JSON.parse(JSON.stringify(gameData)),
        date: Date.now(),
        mission: gameData.currentMission,
        difficulty: JSON.parse(JSON.stringify(difficulty)),
      };
      gameSave.saves[i] = save;
      console.log("Збереження гри в слот", i + 1, save);
      localStorage.setItem("gameSave", JSON.stringify(gameSave));
      document.getElementById("saveModal").style.visibility = "hidden";
      document.getElementById("saveOkModal").style.visibility = "visible";
    });
  }
});

document.getElementById("upgrade-button").addEventListener("click", () => {
  localStorage.setItem("playUpgradeMusic", "true");
  window.location.href = "upgrades.html";
});
document.getElementById("start-button").addEventListener("click", () => {
  gameState.drones.forEach((drone, index) => {
    gameState.rememberDrone(gameData, index);
  });
  localStorage.setItem("gameData", JSON.stringify(gameData));
  localStorage.setItem("playDroneMusic", "true");
  window.location.href = `level${missionKey}.html`;
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
