import { gameState } from "../logic/gamestate.js";
import { BriefingDrones } from "../gameElements/briefingDroneIcons.js";
import { setupEquipButtons } from "./equipButtonHandlers.js";
import { SmallDrone, MediumDrone, BigDrone } from "../drones/drones.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
gameState.updateData(gameData);
// ініціалізація canvas
const canvas = document.getElementById("equipDroneCanvas");
canvas.width = 120;
canvas.height = 160;
const ctx = canvas.getContext("2d");

// витягуємо індекс дрона з localStorage
const droneIndex = parseInt(localStorage.getItem("droneToEquip") ?? 0);
let oldDrone = gameState.drones[droneIndex];
let newDrone;

switch (oldDrone.type) {
  case "small":
    newDrone = new SmallDrone(gameData);
    break;
  case "medium":
    newDrone = new MediumDrone(gameData);
    break;
  case "big":
    newDrone = new BigDrone(gameData);
    break;
}

newDrone.bombStorage = oldDrone.cloneBombStorage(oldDrone.bombStorage);
newDrone.initialBombStorage = oldDrone.cloneBombStorage(
  oldDrone.initialBombStorage
);
newDrone.hangers = newDrone.initialHangers - newDrone.countBombs();
newDrone.remainingCapacity = newDrone.capacity - newDrone.getCurrentLoad();

gameState.drones[droneIndex] = newDrone;
document.getElementById("drone_number").textContent = parseInt(droneIndex) + 1;
let drone = null;
if (droneIndex !== null) {
  drone = gameState.drones[parseInt(droneIndex)];
} else {
  drone = gameState.drones[0];
}
setupEquipButtons(drone, gameData, gameState, droneIndex);

const droneicon = new BriefingDrones(canvas, ctx, drone, 100, 10, 10, true);

// Кнопка "Повернутись"
document.getElementById("back-button").addEventListener("click", () => {
  returnRoutine();
  localStorage.setItem("playBriefingMusic", "true");
  window.location.href = "briefing.html";
});
document.getElementById("upgrade-button").addEventListener("click", () => {
  returnRoutine();
  window.location.href = "upgrades.html";
});

function returnRoutine() {
  drone.initialBombStorage = drone.cloneBombStorage(drone.bombStorage);
  gameState.rememberDrone(gameData, droneIndex);
  localStorage.removeItem("droneToEquip");
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
// анімація дронів
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
