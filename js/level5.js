import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BMP2, BMP1, Guntruck, Tigr } from "./enemies/vehicle.js";

initGame({
  levelId: "level5",
  mapId: "level5",
  winScore: 3670,
  looseScore: 918,
  startLevel: startLevel,
  mapWidth: 2000,
  mapHeight: 3500,
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
    addVehicle(Tigr, 350, 1, 1, 0);
  }, 11000);

  setTimeout(() => {
    addVehicle(Guntruck, 1200, 1, 0, 0, 0);
  }, 29000);

  setTimeout(() => {
    addVehicle(Tigr, 1650, 1, 1, 0);
  }, 18500);

  addVehicle(BMP2, 500, 4, 1, 1, 2);

  setTimeout(() => {
    addVehicle(BMP1, 1000, 4, 1, 1, 2);
  }, 6000);

  setTimeout(() => {
    addVehicle(BMP2, 1500, 4, 1, 1, 2);
  }, 21000);

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
    addedFunction(vehicles, enemies) {},
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
