import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import {
  MSTA,
  Tigr,
  MTLBKPVT,
  ZU23,
  Guntruck,
  UralSupply,
} from "./enemies/vehicle.js";

initGame({
  levelId: "level18",
  mapId: "level18",
  winScore: 6600,
  looseScore: 500,
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
    { x: 0, y: 820 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 0, y: 1481 },
  ];
  const waypoints2 = [
    { x: 2500, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 74, y: 1481 },
    { x: 50, y: 820 },
    { x: 2425, y: 820 },
    { x: 2430, y: 1479 },
    { x: 0, y: 1481 },
  ];
  addVehicle(Guntruck, waypoints1, 1, 0, 0);
  addVehicle(Guntruck, waypoints2, 1, 0, 0);

  const waypoints3 = [
    { x: 29, y: 0 },
    { x: 29, y: 1 },
    { x: 29, y: 2 },
    { x: 362, y: 524 },
    { x: 399, y: 2292 },
    { x: 390, y: 0 },
  ];
  const waypoints4 = [
    { x: 199, y: 0 },
    { x: 199, y: 1 },
    { x: 199, y: 2 },
    { x: 532, y: 524 },
    { x: 569, y: 2292 },
    { x: 560, y: 0 },
  ];
  const waypoints5 = [
    { x: 389, y: 0 },
    { x: 389, y: 1 },
    { x: 389, y: 2 },
    { x: 742, y: 524 },
    { x: 679, y: 2292 },
    { x: 770, y: 0 },
  ];
  const waypoints6 = [
    { x: 2043, y: 0 },
    { x: 2043, y: 1 },
    { x: 1637, y: 430 },
    { x: 937, y: 1126 },
    { x: 800, y: 2345 },
    { x: 1349, y: 0 },
  ];
  const waypoints7 = [
    { x: 2163, y: 0 },
    { x: 2163, y: 1 },
    { x: 1757, y: 430 },
    { x: 1057, y: 1126 },
    { x: 1037, y: 2345 },
    { x: 1469, y: 0 },
  ];
  const waypoints8 = [
    { x: 2283, y: 0 },
    { x: 2283, y: 1 },
    { x: 1877, y: 430 },
    { x: 1177, y: 1126 },
    { x: 1137, y: 2345 },
    { x: 1589, y: 0 },
  ];
  addVehicle(MTLBKPVT, waypoints3, 2, 0, 0);
  setTimeout(() => {
    addVehicle(MSTA, waypoints4, 0, 0, 0, 4);
  }, 3000);
  setTimeout(() => {
    addVehicle(MTLBKPVT, waypoints5, 2, 0, 0);
  }, 6000);

  addVehicle(MTLBKPVT, waypoints6, 2, 0, 0);
  setTimeout(() => {
    addVehicle(MSTA, waypoints7, 0, 0, 0, 4);
  }, 3000);
  setTimeout(() => {
    addVehicle(MTLBKPVT, waypoints8, 2, 0, 0);
    enemies.forEach((enemy) => {
      enemy.winScore = 0;
      enemy.looseScore = 0;
    });
  }, 6000);

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
  const suppWaypoints1 = [
    { x: 900, y: 2593 },
    { x: 0, y: 0 },
  ];
  const suppWaypoints2 = [
    { x: 800, y: 2593 },
    { x: 0, y: 0 },
  ];
  const suppWaypoints3 = [
    { x: 700, y: 2573 },
    { x: 0, y: 0 },
  ];

  const suppWaypoints4 = [
    { x: 1000, y: 2573 },
    { x: 0, y: 0 },
  ];

  addVehicle(ZU23, gunWaypoints1, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints2, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints3, 0, 0, 0);
  addVehicle(ZU23, gunWaypoints4, 0, 0, 0);
  addVehicle(UralSupply, suppWaypoints1, 1, 0, 0);
  addVehicle(UralSupply, suppWaypoints2, 1, 0, 0);
  addVehicle(UralSupply, suppWaypoints3, 1, 0, 0);
  addVehicle(Tigr, suppWaypoints4, 1, 0, 0);

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
    if (vehicle.type !== "msta" && vehicle.type !== "mtlbKPVT") {
      vehicle.winScore = 0;
      vehicle.looseScore = 0;
    }
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    if (vehicle.static) vehicle.protected = true;

    if (vehicle.type === "uralSupply" || vehicle.type === "tigr") {
      vehicle.static = true;
    }

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

    addedFunction(vehicles, enemies) {
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
