import { createRifleSquad, createEqualRifleSquadM } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import {
  Guntruck,
  BMP3,
  Tigr,
  T72B3,
  T90,
  MTLBKPVT,
  MTLBZU23,
  Shilka,
  Grad,
  Buk,
  MSTA,
} from "./enemies/vehicle.js";

initGame({
  levelId: "level26",
  mapId: "level26",
  winScore: 20000,
  looseScore: 10000,
  startLevel: startLevel,
  mapWidth: 2200,
  mapHeight: 3400,
  startY: 2800,
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

  function createEnemySquad(
    x,
    y,
    riflemans,
    mashinegunners,
    grenadiers,
    waypoints
  ) {
    const squad = createEqualRifleSquadM(
      x,
      y,
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
      enemy.distance = 0.4;
      enemy.speed = 0.18;
      enemy.shakeIntensity = 0;
    });
    enemies.push(...squad);
  }
  const waypoints1 = [
    { x: 1750, y: 1889 },
    { x: 1900, y: 3400 },
  ];
  createEnemySquad(0, 36, 10, 1, 1, waypoints1);
  const waypoints2 = [
    { x: 1700, y: 1889 },
    { x: 1850, y: 3400 },
  ];
  createEnemySquad(0, 36, 10, 1, 1, waypoints2);

  const waypoints3 = [
    { x: 1750, y: 1100 },
    { x: 1900, y: 0 },
  ];
  createEnemySquad(0, 36, 10, 1, 1, waypoints3);
  const waypoints4 = [
    { x: 1700, y: 1100 },
    { x: 1850, y: 0 },
  ];
  createEnemySquad(0, 36, 10, 1, 1, waypoints4);

  enemies.forEach((enemy) => {
    enemy.static = true;
  });

  const waypoints5 = [
    { x: 1050, y: 550 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints5);
  const waypoints6 = [
    { x: 1050, y: 500 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints6);
  const waypoints7 = [
    { x: 1050, y: 450 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints7);
  const waypoints8 = [
    { x: 1050, y: 400 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints8);
  const waypoints9 = [
    { x: 1050, y: 350 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints9);
  const waypoints10 = [
    { x: 1050, y: 300 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints10);
  const waypoints11 = [
    { x: 1050, y: 250 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints11);
  const waypoints12 = [
    { x: 1050, y: 200 },
    { x: 1050, y: 3400 },
  ];
  createEnemySquad(36, 0, 12, 1, 1, waypoints12);

  const carwaypoints1 = [
    { x: 1111, y: 0 },
    { x: 1111, y: 1 },
    { x: 1111, y: 3400 },
  ];
  const carwaypoints2 = [
    { x: 1282, y: 0 },
    { x: 1282, y: 1 },
    { x: 1282, y: 3400 },
  ];
  const carwaypoints3 = [
    { x: 1452, y: 0 },
    { x: 1452, y: 1 },
    { x: 1452, y: 3400 },
  ];
  addVehicle(Guntruck, enemies, carwaypoints1, 1, 0, 0);
  addVehicle(Guntruck, enemies, carwaypoints2, 1, 0, 0);
  addVehicle(Guntruck, enemies, carwaypoints3, 1, 0, 0);

  setTimeout(() => {
    addVehicle(BMP3, enemies, carwaypoints1, 0, 0, 0, 2);
    addVehicle(BMP3, enemies, carwaypoints2, 0, 0, 0, 2);
    addVehicle(BMP3, enemies, carwaypoints3, 0, 0, 0, 2);
  }, 18000);

  setTimeout(() => {
    addVehicle(Tigr, enemies, carwaypoints1, 2, 0, 0, 0);
    addVehicle(Tigr, enemies, carwaypoints2, 2, 0, 0, 0);
    addVehicle(Tigr, enemies, carwaypoints3, 2, 0, 0, 0);
  }, 36000);

  setTimeout(() => {
    addVehicle(T72B3, enemies, carwaypoints1, 0, 0, 0, 2);
    addVehicle(T90, enemies, carwaypoints2, 0, 0, 0, 2);
    addVehicle(T72B3, enemies, carwaypoints3, 0, 0, 0, 2);
  }, 54000);

  setTimeout(() => {
    addVehicle(MTLBKPVT, enemies, carwaypoints1, 0, 0, 0, 2);
    addVehicle(MTLBZU23, enemies, carwaypoints2, 0, 0, 0, 2);
    addVehicle(MTLBKPVT, enemies, carwaypoints3, 0, 0, 0, 2);
  }, 72000);

  setTimeout(() => {
    addVehicle(MSTA, enemies, carwaypoints1, 0, 0, 0, 3);
    addVehicle(Grad, enemies, carwaypoints2, 1, 0, 0, 0);
    addVehicle(MSTA, enemies, carwaypoints3, 0, 0, 0, 3);
  }, 90000);

  setTimeout(() => {
    addVehicle(Buk, enemies, carwaypoints1, 0, 0, 0, 2);
    addVehicle(Shilka, enemies, carwaypoints2, 0, 0, 0, 2);
    addVehicle(Buk, enemies, carwaypoints3, 0, 0, 0, 2);
  }, 108000);

  enemies[1].looseScore = 22;

  function addVehicle(
    Class,
    enemies,
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
    if (enemies[0].looseScore === 22) {
      waypoints[2].x = 600 + Math.random() * 1100;
      waypoints[2].y = 3400;
    }
    // === Шукаємо шлях один раз при створенні ===
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);

    vehicle.currentPathIndex = 0;
    vehicle.droneSpottingChanse = 10;
    vehicle.embark(
      enemies,
      navGrid,
      riflemans,
      mashinegunners,
      grenadiers,
      crew
    );
    vehicle.speed = 0.18;
    if (enemies[0].looseScore === 22) {
      vehicle.speed = 0.28 + Math.random() * 0.12;
    }
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
      if (enemies[0].looseScore !== 22) {
        enemies.forEach((enemy) => {
          if (enemy.isFiring) enemies[0].looseScore = 22;
        });
        vehicles.forEach((vehicle) => {
          if (vehicle.isFiring) enemies[0].looseScore = 22;
        });
        bombs.forEach((bomb) => {
          if (bomb.exploded) enemies[0].looseScore = 22;
        });
      }

      if (enemies[0].looseScore === 22 && enemies[1].looseScore === 22) {
        enemies[1].looseScore = 50;

        const alarmSound = new Audio("assets/audio/vehicle/alarm.mp3");
        alarmSound.volume = 0.5;
        alarmSound.play();

        enemies.forEach((enemy, index) => {
          enemy.static = false;
          enemy.shakeIntensity = 0.3;
          enemy.speed = 0.18 + Math.random() * 0.1;
          enemy.waypoints = [{ x: 600 + Math.random() * 1200, y: 3400 }];
          enemy.currentWaypointIndex = 0;
          enemy.setPathToWaypoint(); // 🟢 важливо!
        });
        vehicles.forEach((vehicle) => {
          vehicle.speed = 0.28 + Math.random() * 0.12;
          vehicle.waypoints = [{ x: 600 + Math.random() * 1100, y: 3400 }];
          vehicle.currentWaypointIndex = 0;
          vehicle.setPathToWaypoint();
        });
      }
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
