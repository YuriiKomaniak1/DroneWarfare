import { togglePause } from "./gameloop.js";
import { activeSounds } from "../gameElements/sounds.js";
import {
  setupCustomControlPlacement,
  loadControlPositionsFromStorage,
} from "../logic/controls.js";

export const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};
let winCondition = false;
let gameStopped = false;

const pauseModal = document.getElementById("pauseModal");
const gametype = localStorage.getItem("gametype");

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
      if (gametype === "missions") {
        gameData.score += 1000 + gameData.currentMission * 100;
      }
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
        gametype: gametype,
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

  document.getElementById("buttons").addEventListener("click", () => {
    if (pauseModal) pauseModal.style.visibility = "hidden";
    document.getElementById("buttonsModal").style.visibility = "visible";
  });

  document.getElementById("restart").addEventListener("click", () => {
    window.location.href =
      gametype === "missions"
        ? `level${gameData.currentMission}.html?refresh=` + Date.now()
        : `survival.html?refresh=` + Date.now();
  });

  document.getElementById("back").addEventListener("click", () => {
    if (pauseModal) pauseModal.style.visibility = "hidden";
    togglePause();
  });

  document.getElementById("putButtons").addEventListener("click", () => {
    const canvas = document.getElementById("canvas1");
    document.getElementById("buttonsModal").style.visibility = "hidden";
    setupCustomControlPlacement(canvas);
    togglePause();
  });

  document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("customControlsPositions");
    loadControlPositionsFromStorage();
    document.getElementById("buttonsModal").style.visibility = "hidden";
    togglePause();
  });

  document.getElementById("back1").addEventListener("click", () => {
    document.getElementById("buttonsModal").style.visibility = "hidden";
    togglePause();
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
