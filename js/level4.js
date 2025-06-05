import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Guntruck, Tigr, Jeep, UAZ452 } from "./enemies/vehicle.js";
initGame({
  levelId: "level4",
  mapId: "level4",
  winScore: 2200,
  looseScore: 400,
  startLevel: startLevel,
  mapWidth: 3000,
  mapHeight: 3000,
  startY: 2000,
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

  const waypoints1 = [
    { x: 65, y: 60 },
    { x: 65, y: 61 },
    { x: 65, y: 1780 },
    { x: 990, y: 1780 },
    { x: 1275, y: 0 },
  ];
  const waypoints2 = [
    { x: 65, y: 60 },
    { x: 65, y: 61 },
    { x: 65, y: 1000 },
    { x: 950, y: 1360 },
    { x: 950, y: 0 },
  ];
  const waypoints3 = [
    { x: 2900, y: 60 },
    { x: 2900, y: 61 },
    { x: 2900, y: 1780 },
    { x: 1950, y: 1780 },
    { x: 1275, y: 0 },
  ];
  const waypoints4 = [
    { x: 2900, y: 60 },
    { x: 2900, y: 61 },
    { x: 2900, y: 1000 },
    { x: 1990, y: 1450 },
    { x: 1700, y: 0 },
  ];
  const waypoints5 = [
    { x: 1275, y: 60 },
    { x: 1275, y: 61 },
    { x: 1275, y: 1000 },
    { x: 1275, y: 1450 },
    { x: 1275, y: 0 },
  ];
  const waypoints6 = [
    { x: 65, y: 60 },
    { x: 65, y: 61 },
    { x: 65, y: 1359 },
    { x: 2500, y: 1359 },
    { x: 65, y: 1359 },
    { x: 2600, y: 1359 },
    { x: 65, y: 1359 },
    { x: 2600, y: 1359 },
    { x: 65, y: 1359 },
    { x: 2600, y: 1359 },
    { x: 65, y: 1359 },
    { x: 2600, y: 1359 },
    { x: 65, y: 1359 },
    { x: 2600, y: 1359 },
    { x: 1275, y: 0 },
  ];
  setTimeout(() => {
    addVehicle(Tigr, waypoints1, 2, 1, 1, 0);
  }, 15000);
  setTimeout(() => {
    addVehicle(Jeep, waypoints2, 2, 1, 0);
  }, 30000);
  setTimeout(() => {
    addVehicle(Guntruck, waypoints6, 0, 0, 0);
  }, 40000);

  addVehicle(UAZ452, waypoints5, 2, 1, 1, 0);

  setTimeout(() => {
    addVehicle(UAZ452, waypoints3, 2, 1, 1, 0);
  }, 45000);
  setTimeout(() => {
    addVehicle(Jeep, waypoints4, 2, 1, 0);
  }, 60000);

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
    vehicle.currentPathIndex = 0;
    vehicle.looseScore = 0;
    vehicle.bailOutX = 1450;
    vehicle.bailOutY = 1650;
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

    addedFunction(vehicles, enemies, bombs) {
      vehicles.forEach((vehicle) => {
        if (vehicle.currentWaypointIndex === 4 && vehicle.type !== "guntruck")
          vehicle.disembark(1450, 1650, navGrid);
      });
    },
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
