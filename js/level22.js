import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { T90, Tigr, MTLBZU23, ZU23, Shilka, BTR82 } from "./enemies/vehicle.js";

initGame({
  levelId: "level18",
  mapId: "level18",
  winScore: 10000,
  looseScore: 1000,
  startLevel: startLevel,
  mapWidth: 2500,
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
    { x: 1516, y: 0 },
    { x: 1516, y: 1 },
    { x: 1515, y: 2313 },
    { x: 361, y: 2319 },
    { x: 0, y: 2711 },
  ];

  addVehicle(Tigr, waypoints1, 2, 0, 0);
  setTimeout(() => {
    addVehicle(BTR82, waypoints1, 3, 1, 0, 1);
  }, 10000);
  setTimeout(() => {
    addVehicle(T90, waypoints1, 0, 0, 0, 2);
  }, 20000);
  setTimeout(() => {
    addVehicle(Shilka, waypoints1, 0, 0, 0, 4);
  }, 30000);
  setTimeout(() => {
    addVehicle(T90, waypoints1, 0, 0, 0, 2);
  }, 40000);
  setTimeout(() => {
    addVehicle(T90, waypoints1, 0, 0, 0, 2);
  }, 50000);
  setTimeout(() => {
    addVehicle(Shilka, waypoints1, 0, 0, 0, 4);
  }, 60000);
  setTimeout(() => {
    addVehicle(T90, waypoints1, 0, 0, 0, 2);
  }, 70000);
  setTimeout(() => {
    addVehicle(T90, waypoints1, 0, 0, 0, 2);
  }, 80000);
  setTimeout(() => {
    addVehicle(Tigr, waypoints1, 2, 0, 0, 0);
    enemies.forEach((enemy) => {
      enemy.winScore = 0;
      enemy.looseScore = 0;
    });
  }, 90000);

  const gunWaypoints1 = [
    { x: 345, y: 2047 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints2 = [
    { x: 1200, y: 2050 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints3 = [
    { x: 367, y: 2558 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints4 = [
    { x: 1191, y: 2573 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints5 = [
    { x: 1417, y: 1377 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints6 = [
    { x: 1400, y: 717 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints7 = [
    { x: 1600, y: 2023 },
    { x: 0, y: 0 },
  ];

  addVehicle(ZU23, gunWaypoints1, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints2, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints3, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints4, 0, 0, 0);
  addVehicle(MTLBZU23, gunWaypoints5, 2, 0, 0);
  addVehicle(MTLBZU23, gunWaypoints6, 2, 0, 0);
  addVehicle(MTLBZU23, gunWaypoints7, 2, 0, 0);
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
    if (vehicle.type !== "t90" && vehicle.type !== "shilka") {
      vehicle.winScore = 0;
      vehicle.looseScore = 0;
    }
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    if (vehicle.static) vehicle.protected = true;

    if (vehicle.type === "mtlbZU23") {
      vehicle.static = true;
    }

    vehicle.embark(enemies, navGrid, riflemans, mashinegunners, grenadiers, 0);
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

    addedFunction(vehicles, enemies, bombs) {
      vehicles.forEach((vehicle) => {
        if (vehicle.currentWaypointIndex === 5 && vehicle.type !== "guntruck") {
          vehicle.static = true;
          setTimeout(() => {
            vehicle.static = false;
          }, 30000);
        }
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
