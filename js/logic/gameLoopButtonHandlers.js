import { togglePause } from "./gameloop.js";

let winCondition = false;
let gameStopped = false;

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
      gameData.score;
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
