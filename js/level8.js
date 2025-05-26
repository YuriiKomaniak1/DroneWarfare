import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import {
  Guntruck,
  Tigr,
  Jeep,
  UAZ452,
  Ural,
  Gaz66,
  UralSupply,
  KPVT,
} from "./enemies/vehicle.js";

initGame({
  levelId: "level8",
  mapId: "level8",
  winScore: 3920,
  looseScore: 1000,
  startLevel: startLevel,
  mapWidth: 3000,
  mapHeight: 3000,
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

  const wa1 = [
    { x: 1345, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa1);
  const wa2 = [
    { x: 1400, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa2);
  const wa3 = [
    { x: 1400, y: 1690 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa3);

  const wa4 = [
    { x: 1740, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa4);
  const wa5 = [
    { x: 1790, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa5);
  const wa6 = [
    { x: 1850, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa6);
  const wa7 = [
    { x: 1900, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa7);

  const wa8 = [
    { x: 2093, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa8);
  const wa9 = [
    { x: 2143, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa9);
  const wa10 = [
    { x: 2093, y: 1690 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa10);

  const waypoints1 = [
    { x: 2000, y: 18 },
    { x: 2000, y: 19 },
    { x: 2000, y: 1790 },
    { x: 0, y: 1790 },
  ];
  const waypoints2 = [
    { x: 7, y: 439 },
    { x: 8, y: 440 },
    { x: 935, y: 1207 },
    { x: 2020, y: 1207 },
    { x: 2020, y: 1790 },
    { x: 3000, y: 1790 },
  ];
  const gunWaypoints1 = [
    { x: 1297, y: 1346 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints2 = [
    { x: 1850, y: 1350 },
    { x: 0, y: 0 },
  ];

  addVehicle(KPVT, gunWaypoints1, 0, 0, 0);
  addVehicle(KPVT, gunWaypoints2, 0, 0, 0);

  setTimeout(() => {
    addVehicle(Tigr, waypoints1, 2, 1, 1);
  }, 1000);
  setTimeout(() => {
    addVehicle(Ural, waypoints1, 1, 0, 0);
  }, 8000);
  setTimeout(() => {
    addVehicle(UralSupply, waypoints1, 1, 0, 0);
  }, 15000);
  setTimeout(() => {
    addVehicle(Guntruck, waypoints1, 1, 0, 0);
  }, 22000);
  setTimeout(() => {
    addVehicle(UAZ452, waypoints1, 2, 1, 0);
  }, 29000);

  setTimeout(() => {
    addVehicle(Tigr, waypoints2, 2, 1, 1);
  }, 51000);
  setTimeout(() => {
    addVehicle(Gaz66, waypoints2, 1, 0, 0);
  }, 58000);
  setTimeout(() => {
    addVehicle(UralSupply, waypoints2, 1, 0, 0);
  }, 65000);
  setTimeout(() => {
    addVehicle(Guntruck, waypoints2, 1, 0, 0);
  }, 72000);
  setTimeout(() => {
    addVehicle(Jeep, waypoints2, 2, 1, 0);
  }, 79000);

  console.log(vehicles);
  // функція створення юнітів
  function enemy(riflemans, mashinegunners, grenadiers, waypoints) {
    const squad = createRifleSquad(
      0,
      0,
      layer1,
      ctx,
      navGrid,
      waypoints,
      riflemans,
      mashinegunners,
      grenadiers,
      0
    );
    squad.forEach((enemy) => {
      enemy.static = true;
      enemy.winScore = 0;
    });
    enemies.push(...squad);
  }

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
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    if (vehicle.static) vehicle.winScore;
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
