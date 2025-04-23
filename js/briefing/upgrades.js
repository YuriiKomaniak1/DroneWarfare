import { gameState } from "../logic/gamestate.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
gameState.updateData(gameData);
document.getElementById("score").textContent = gameData.score;

const middleDroneOpenCost = 5000 + gameData.upgradeGap;
const bigDroneOpenCost = 8000 + gameData.upgradeGap;
document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
  el.textContent = middleDroneOpenCost;
});
document.getElementById("bigDroneOpenCost").textContent = bigDroneOpenCost;
document.getElementById("medium_drone_image").addEventListener("click", () => {
  document.getElementById("middleDroneOpenModal").style.visibility = "visible";
});
document.querySelectorAll(".back-button").forEach((el) => {
  el.addEventListener("click", () => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
    window.location.href = "upgrades.html";
  });
});
document.getElementById("back-button").addEventListener("click", () => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "briefing.html";
});
