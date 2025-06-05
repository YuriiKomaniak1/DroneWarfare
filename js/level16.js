import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BTR82, Tigr, Grad, MTLBZU23, KPVT } from "./enemies/vehicle.js";

initGame({
  levelId: "level16",
  mapId: "level16",
  winScore: 5400,
  looseScore: 1000,
  startLevel: startLevel,
  mapWidth: 2300,
  mapHeight: 3600,
  startY: 3600,
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
    { x: 0, y: 352 },
    { x: 1, y: 352 },
    { x: 448, y: 359 },
    { x: 449, y: 1091 },
    { x: 1614, y: 2257 },
    { x: 2288, y: 2252 },
  ];

  const gunWaypoints1 = [
    { x: 593, y: 1374 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints2 = [
    { x: 918, y: 1387 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints3 = [
    { x: 1478, y: 2289 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints4 = [
    { x: 1682, y: 2128 },
    { x: 0, y: 0 },
  ];

  addVehicle(KPVT, gunWaypoints1, 0, 0, 0);
  addVehicle(KPVT, gunWaypoints2, 0, 0, 0);
  addVehicle(KPVT, gunWaypoints3, 0, 0, 0);
  addVehicle(KPVT, gunWaypoints4, 0, 0, 0);

  addVehicle(Tigr, waypoints1, 2, 1, 1);

  setTimeout(() => {
    addVehicle(MTLBZU23, waypoints1, 2, 0, 0);
  }, 9000);
  setTimeout(() => {
    addVehicle(Grad, waypoints1, 1, 0, 0);
  }, 18000);
  setTimeout(() => {
    addVehicle(BTR82, waypoints1, 3, 1, 0, 1);
  }, 27000);
  setTimeout(() => {
    addVehicle(MTLBZU23, waypoints1, 2, 1, 0);
  }, 36000);

  setTimeout(() => {
    addVehicle(Grad, waypoints1, 2, 1, 1);
  }, 45000);
  setTimeout(() => {
    addVehicle(MTLBZU23, waypoints1, 2, 0, 0);
  }, 54000);
  setTimeout(() => {
    addVehicle(Tigr, waypoints1, 2, 1, 0);
  }, 63000);
  enemies.forEach((enemy) => {
    enemy.winScore = 0;
    enemy.looseScore = 0;
  });
  //функція створення техніки
  function addVehicle(Class, waypoints, riflemans, mashinegunners, grenadiers) {
    let vehicle = new Class(
      waypoints[0].x,
      waypoints[0].y,
      layer1,
      ctx,
      waypoints,
      vehicleNavGrid
    );
    // === Шукаємо шлях один раз при створенні ===
    if (vehicle.type !== "grad" && vehicle.type !== "mtlbZU23") {
      vehicle.winScore = 0;
      vehicle.looseScore = 0;
    }
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    if (vehicle.static) vehicle.winScore = 0;
    if (vehicle.static) vehicle.protected = true;
    vehicle.speed = 0.4;
    vehicle.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, 0);
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
