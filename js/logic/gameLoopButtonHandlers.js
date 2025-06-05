import { togglePause } from "./gameloop.js";
import { activeSounds } from "../gameElements/sounds.js";
export const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};
let winCondition = false;
let gameStopped = false;
const soundBoxModal = document.getElementById("soundBoxModal");
const pauseModal = document.getElementById("pauseModal");

const music = new Audio("./assets/audio/music/upgrade-music.mp3");
music.loop = true;
music.volume = volumeSettings.musicVolume * 0.15;

export function buttons(gameData, autoSave) {
  document.getElementById("backToMenu").addEventListener("click", () => {
    localStorage.setItem("playBriefingMusic", "true");
    location.href = "briefing.html?refresh=" + Date.now();
  });
  document.getElementById("backToGame").addEventListener("click", () => {
    const winModal = document.getElementById("winModal");
    if (winModal) winModal.style.visibility = "hidden";
    togglePause();
  });
  document.querySelectorAll(".nextMission").forEach((button) => {
    button.addEventListener("click", () => {
      // Оновлюємо основні дані
      gameData.currentMission++;
      gameData.score += 1000 + gameData.currentMission * 100;
      localStorage.setItem("gameData", JSON.stringify(gameData));

      // Завантажуємо сейви або створюємо нові
      let autoSave = JSON.parse(localStorage.getItem("autoSave")) || {
        saves: [],
      };
      let difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {};

      // Додаємо сейв з копією gameData
      autoSave.saves.unshift({
        data: JSON.parse(JSON.stringify(gameData)),
        date: Date.now(),
        mission: gameData.currentMission,
        difficulty: JSON.parse(JSON.stringify(difficulty)),
      });
      while (autoSave.saves.length > 10) {
        autoSave.saves.pop();
      }

      // Зберігаємо сейви
      localStorage.setItem("autoSave", JSON.stringify(autoSave));
      localStorage.setItem("playBriefingMusic", "true");
      location.href = "briefing.html";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      togglePause();
    }
  });
  document.getElementById("menu").addEventListener("click", () => {
    location.href = "index.html";
  });
  document.getElementById("leave").addEventListener("click", () => {
    location.href = "briefing.html";
  });
  document.getElementById("restart").addEventListener("click", () => {
    window.location.href =
      `level${gameData.currentMission}.html?refresh=` + Date.now();
  });
  document.getElementById("settings").addEventListener("click", () => {
    music.play().catch((e) => {
      console.warn("Автовідтворення музики заблоковано:", e);
    });
    if (pauseModal) pauseModal.style.visibility = "hidden";
    if (soundBoxModal) soundBoxModal.style.visibility = "visible";
  });
  document.getElementById("back").addEventListener("click", () => {
    if (pauseModal) pauseModal.style.visibility = "hidden";
    togglePause();
  });
  document.getElementById("settingsBack").addEventListener("click", () => {
    music.pause();
    if (soundBoxModal) soundBoxModal.style.visibility = "hidden";
    togglePause();
  });

  document.getElementById("musicVolume").value = volumeSettings.musicVolume;
  document.getElementById("soundVolume").value = volumeSettings.soundVolume;

  document.getElementById("musicVolume").addEventListener("input", (e) => {
    volumeSettings.musicVolume = parseFloat(e.target.value);
    if (music) {
      music.volume = volumeSettings.musicVolume * 0.3;
    }
  });

  document.getElementById("soundVolume").addEventListener("input", (e) => {
    volumeSettings.soundVolume = parseFloat(e.target.value);
    activeSounds.forEach((sound) => {
      sound.volume = volumeSettings.soundVolume;
    });

    localStorage.setItem("Volume", JSON.stringify(volumeSettings));
  });
}

export function getWinCondition() {
  return winCondition;
}

export function winLoseTest(
  winLoseConditions,
  gameState,
  gameData,
  enemies,
  vehicles
) {
  const totalWinModal = document.getElementById("totalWinModal");
  if (winLoseConditions.lose(gameState, gameData, enemies, vehicles)) {
    if (!winCondition) {
      gameData.timer = null;
      gameData.looseScore = 0;
      const loseModal = document.getElementById("loseModal");
      if (loseModal) loseModal.style.visibility = "visible";
      togglePause();
    } else {
      gameData.timer = null;
      if (totalWinModal) totalWinModal.style.visibility = "visible";
    }
  } else if (
    winLoseConditions.win(gameState, gameData, enemies, vehicles) &&
    !gameStopped
  ) {
    winCondition = true;
    gameData.timer = null;
    togglePause();
    gameStopped = true;
    const winModal = document.getElementById("winModal");
    if (winModal) winModal.style.visibility = "visible";
  }
  if (totalWin()) {
    togglePause();
    gameData.timer = null;
    if (totalWinModal) totalWinModal.style.visibility = "visible";
  }
  function totalWin() {
    const allEnemiesDead =
      enemies.length === 0 || enemies.every((enemy) => enemy.dead);
    const allVehiclesDestroyed =
      vehicles.length === 0 || vehicles.every((vehicle) => vehicle.isDestroyed);

    return allEnemiesDead && allVehiclesDestroyed;
  }
}
