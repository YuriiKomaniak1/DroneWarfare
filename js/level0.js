import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Gaz66, Ural, BMP1, Guntruck, Tigr, MTLB } from "./enemies/vehicle.js";

initGame({
  levelId: "level0",
  mapId: "level0",
  winScore: 5000,
  looseScore: 2000,
  startLevel: startLevel,
  mapWidth: 1200,
  mapHeight: 1200,
  startY: 1200,
});

function startLevel(
  gameData,
  layer1,
  layer2,
  canvas,
  ctx,
  navGrid,
  vehicleNavGrid
) {
  let vehicles = [];
  let enemies = [];
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");

  const modal1Button = document.getElementById("modal1Button");
  const modal2Button = document.getElementById("modal2Button");

  modal1Button.addEventListener("click", () => {
    modal1.style.visibility = "hidden";
    modal2.style.visibility = "visible";
  });

  const winLoseConditions = {
    win: (gameState, gameData, enemies, vehicles) => {
      return gameData.winScore <= 0;
    },
    lose: (gameState, gameData, enemies, vehicles) => {
      const allDronesDead = gameState.drones.every(
        (drone) => !drone || !drone.isAlive
      );
      const scoreTooLow = gameData.looseScore <= 0;

      return allDronesDead || scoreTooLow;
    },
    addedFunction(vehicles, enemies, bombs) {},
  };

  createAnimationLoop(
    canvas,
    layer1,
    layer2,
    ctx,
    enemies,
    vehicles,
    winLoseConditions,
    gameData,
    true
  );
}
