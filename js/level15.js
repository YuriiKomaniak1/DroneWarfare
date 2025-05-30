import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { T62, T55, Tigr, MTLBKPVT, BTR82, BMP2 } from "./enemies/vehicle.js";
initGame({
  levelId: "level4",
  mapId: "level4",
  winScore: 7000,
  looseScore: 1300,
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
    { x: 80 + Math.ceil(Math.random() * 10), y: 450 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 451 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 650 },
    { x: 407, y: 1775 },
    { x: 1549, y: 1791 },
    { x: 1565, y: 2973 },
  ];

  const waypoints2 = [
    { x: 80 + Math.ceil(Math.random() * 10), y: 300 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 301 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 650 },
    { x: 407, y: 1775 },
    { x: 1549, y: 1791 },
    { x: 1565, y: 2973 },
  ];

  const waypoints3 = [
    { x: 80 + Math.ceil(Math.random() * 10), y: 150 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 151 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 650 },
    { x: 407, y: 1775 },
    { x: 1549, y: 1791 },
    { x: 1565, y: 2973 },
  ];

  const waypoints4 = [
    { x: 80 + Math.ceil(Math.random() * 10), y: 0 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 1 },
    { x: 80 + Math.ceil(Math.random() * 10), y: 650 },
    { x: 407, y: 1775 },
    { x: 1549, y: 1791 },
    { x: 1565, y: 2973 },
  ];
  addVehicle(T62, waypoints1, 0, 0, 0, 3);
  addVehicle(MTLBKPVT, waypoints2, 3, 1, 0, 0);
  addVehicle(T55, waypoints3, 0, 0, 0, 3);
  addVehicle(Tigr, waypoints4, 3, 1, 0, 0);
  setTimeout(() => {
    addVehicle(BMP2, waypoints4, 4, 1, 1, 2);
  }, 9000);
  setTimeout(() => {
    addVehicle(BTR82, waypoints4, 5, 1, 1, 1);
  }, 18000);
  setTimeout(() => {
    addVehicle(MTLBKPVT, waypoints4, 3, 1, 0, 0);
  }, 27000);
  setTimeout(() => {
    addVehicle(BMP2, waypoints4, 4, 1, 1, 2);
  }, 35000);
  setTimeout(() => {
    addVehicle(T55, waypoints4, 0, 0, 0, 3);
  }, 42000);

  function addVehicle(
    Class,
    waypoints,
    riflemans,
    mashinegunners,
    grenadiers,
    crew
  ) {
    vehicleNavGrid = new NavigationGrid(layer1, 36, gameData.bigObstacles);
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
    vehicle.speed = 0.3;
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
