import { gameState } from "../logic/gamestate.js";
import { BriefingDrones } from "../gameElements/briefingDroneIcons.js";
import { setupEquipButtons } from "./equipButtonHandlers.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
gameState.updateData(gameData);

const canvas = document.getElementById("equipDroneCanvas");
canvas.width = 120;
canvas.height = 160;
const ctx = canvas.getContext("2d");

const droneIndex = localStorage.getItem("droneToEquip");
document.getElementById("drone_number").textContent = parseInt(droneIndex) + 1;
let drone = null;

if (droneIndex !== null) {
  drone = gameState.drones[parseInt(droneIndex)];
  localStorage.removeItem("droneToEquip");
} else {
  drone = gameState.drones[0];
}
setupEquipButtons(drone, gameData);

const droneicon = new BriefingDrones(canvas, ctx, drone, 100, 10, 10, true);

// Кнопки
document.getElementById("back-button").addEventListener("click", () => {
  gameState.rememberDrone(gameData, droneIndex);
  localStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "briefing.html";
});
let lastTime = 0;
function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  if (deltaTime >= FRAME_TIME) {
    lastTime = timestamp - (deltaTime % FRAME_TIME);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    droneicon.draw();
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
