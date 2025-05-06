import { togglePause } from "./gameloop.js";
let winCondition = false;
let gameStopped = false;

export const soundState = {
  droneMusicStarted: false,
  droneMusic: null,
  allowDroneMusic: false,
};
export function enableDroneSound() {
  soundState.allowDroneMusic = true;
  console.log("✅ Дозвіл на запуск звуку дрона надано");
}
export function tryStartDroneSound(currentDrone) {
  if (
    soundState.allowDroneMusic &&
    currentDrone &&
    currentDrone.isAlive &&
    currentDrone.isActive &&
    currentDrone.countBombs() > 0 &&
    !soundState.droneMusicStarted
  ) {
    console.log("🎵 Активний дрон — запускаємо музику...");
    soundState.droneMusic = new Audio("assets/audio/drone/drone-sound.mp3");
    soundState.droneMusic.loop = true;
    soundState.droneMusic.volume = 0.8;

    soundState.droneMusic
      .play()
      .then(() => {
        soundState.droneMusicStarted = true;
        console.log("✅ Музику дрона запущено");
      })
      .catch((e) => console.warn("❌ Не вдалося відтворити звук дрона:", e));
  }
  if (
    soundState.droneMusic &&
    (!currentDrone.isAlive || currentDrone.countBombs() <= 0)
  ) {
    soundState.droneMusic.pause();
    soundState.droneMusic.currentTime = 0;
    soundState.droneMusicStarted = false;
    soundState.droneMusic = null;
    console.log("🛑 Дрон знищено або неактивний — музику зупинено");
  }
}

export function buttons(gameData, gameState) {
  document.getElementById("backToMenu").addEventListener("click", () => {
    location.href = "briefing.html";
  });
  document.getElementById("backToGame").addEventListener("click", () => {
    const winModal = document.getElementById("winModal");
    if (winModal) winModal.style.visibility = "hidden";
    togglePause();
  });
  document.querySelectorAll(".nextMission").forEach((button) => {
    button.addEventListener("click", () => {
      gameData.currentMission++;
      localStorage.setItem("gameData", JSON.stringify(gameData));
      location.href = "briefing.html";
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      togglePause();
    }
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
      gameData.looseScore = 0;
      const loseModal = document.getElementById("loseModal");
      if (loseModal) loseModal.style.visibility = "visible";
      togglePause();
    } else {
      if (totalWinModal) totalWinModal.style.visibility = "visible";
    }
  } else if (
    winLoseConditions.win(gameState, gameData, enemies, vehicles) &&
    !gameStopped
  ) {
    winCondition = true;
    togglePause();
    gameStopped = true;
    const winModal = document.getElementById("winModal");
    if (winModal) winModal.style.visibility = "visible";
  }
  if (totalWin()) {
    togglePause();

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
