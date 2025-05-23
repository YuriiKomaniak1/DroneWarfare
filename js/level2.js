import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Gaz66, Ural, BMP1, Guntruck, Tigr, MTLB } from "./enemies/vehicle.js";

initGame({
  levelId: "level2",
  mapId: "level2",
  winScore: 3304,
  looseScore: 826,
  startLevel: startLevel,
  mapWidth: 1800,
  mapHeight: 3400,
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
  let rightWaypoints = [
    { x: 0, y: 220 },
    { x: 1, y: 221 },
    { x: 1350, y: 1407 },
    { x: 1360, y: 3400 },
  ];

  addVehicle(MTLB, rightWaypoints, 6, 1, 1, 2);

  setTimeout(() => {
    addVehicle(Tigr, rightWaypoints, 3, 1, 0);
  }, 6500);
  setTimeout(() => {
    addVehicle(Ural, rightWaypoints, 7, 2, 1);
  }, 13000);
  setTimeout(() => {
    addVehicle(Guntruck, rightWaypoints, 1, 0, 0);
  }, 19500);
  setTimeout(() => {
    addVehicle(Gaz66, rightWaypoints, 6, 2, 2);
  }, 25000);

  function addVehicle(
    Class,
    waypoints,
    riflemans,
    mashinegunners,
    grenadiers,
    crew
  ) {
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
    vehicle.speed = 0.3;
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
