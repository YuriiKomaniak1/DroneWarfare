import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BTR82, BMP1, MTLBKPVT, T55 } from "./enemies/vehicle.js";
initGame({
  levelId: "level13",
  mapId: "level5",
  winScore: 5864,
  looseScore: 1466,
  startLevel: startLevel,
  mapWidth: 2000,
  mapHeight: 3500,
  startY: 1700,
  rotationDegrees: 180,
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

  setTimeout(() => {
    addVehicle(MTLBKPVT, 350, 2, 1, 0, 1);
  }, 11000);

  setTimeout(() => {
    addVehicle(BTR82, 1200, 4, 1, 1, 1);
  }, 29000);

  setTimeout(() => {
    addVehicle(MTLBKPVT, 1650, 2, 1, 0, 1);
  }, 18500);

  addVehicle(BMP1, 500, 4, 1, 1, 2);

  setTimeout(() => {
    addVehicle(BTR82, 1000, 4, 1, 1, 2);
  }, 8000);

  setTimeout(() => {
    addVehicle(T55, 1400, 0, 0, 0, 2);
  }, 21000);

  setTimeout(() => {
    addVehicle(T55, 750, 0, 0, 0, 2);
  }, 34000);

  function addVehicle(
    Class,
    startX,
    riflemans,
    mashinegunners,
    grenadiers,
    crew
  ) {
    let waypoints = [
      { x: startX, y: 50 },
      { x: startX, y: 101 },
      { x: startX, y: 1000 },
      { x: startX, y: 3500 },
    ];
    let vehicle = new Class(
      waypoints[0].x,
      waypoints[0].y,
      layer1,
      ctx,
      waypoints,
      vehicleNavGrid
    );
    // === Шукаємо шлях один раз при створенні ===
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    vehicle.embark(
      enemies,
      navGrid,
      riflemans,
      mashinegunners,
      grenadiers,
      crew
    );
    vehicles.push(vehicle);
  }

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
    false
  );
}
