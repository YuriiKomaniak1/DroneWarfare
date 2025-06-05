import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Buk, Guntruck, MTLBKPVT, MTLBZU23, ZU23 } from "./enemies/vehicle.js";
import { bombTypes } from "./gameElements/droneIcons.js";
initGame({
  levelId: "level2",
  mapId: "level2",
  winScore: 4700,
  looseScore: 1180,
  startLevel: startLevel,
  mapWidth: 1800,
  mapHeight: 3400,
  startY: 3400,
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
  if (!gameData.timer) {
    gameData.timer = { startTime: null, totalTime: null };
  }
  let vehicles = [];
  let enemies = [];
  gameData.timer.startTime = Date.now();
  gameData.timer.totalTime = 6;

  const gunWaypoints1 = [
    { x: 248, y: 628 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints1, 0, 0, 0);
  const gunWaypoints2 = [
    { x: 435, y: 535 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints2, 0, 0, 0);
  const gunWaypoints3 = [
    { x: 1150, y: 1406 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints3, 0, 0, 0);
  const gunWaypoints4 = [
    { x: 1469, y: 1413 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints4, 0, 0, 0);

  const waypoints1 = [
    { x: 1370, y: 1343 },
    { x: 1370, y: 1342 },
    { x: 1370, y: 0 },
  ];
  addVehicle(MTLBKPVT, waypoints1, 2, 0, 0);
  const waypoints2 = [
    { x: 1370, y: 1153 },
    { x: 1370, y: 1152 },
    { x: 1370, y: 0 },
  ];
  addVehicle(Buk, waypoints2, 0, 0, 0, 3);
  const waypoints3 = [
    { x: 1370, y: 940 },
    { x: 1370, y: 939 },
    { x: 1370, y: 0 },
  ];
  addVehicle(MTLBKPVT, waypoints3, 2, 0, 0);

  const waypoints4 = [
    { x: 150, y: 400 },
    { x: 150, y: 379 },
    { x: 150, y: 0 },
  ];
  addVehicle(MTLBKPVT, waypoints4, 2, 0, 0);
  const waypoints5 = [
    { x: 300, y: 380 },
    { x: 300, y: 379 },
    { x: 300, y: 0 },
  ];
  addVehicle(Buk, waypoints5, 0, 0, 0, 3);
  const waypoints6 = [
    { x: 450, y: 400 },
    { x: 450, y: 379 },
    { x: 450, y: 0 },
  ];
  addVehicle(MTLBKPVT, waypoints6, 2, 0, 0);

  const patrolWaypoints1 = [
    { x: 0, y: 1739 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
    { x: 50, y: 1739 },
    { x: 1700, y: 1750 },
  ];
  addVehicle(Guntruck, patrolWaypoints1, 1, 0, 0);

  const patrolWaypoints2 = [
    { x: 1800, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
    { x: 50, y: 2139 },
    { x: 1700, y: 2139 },
  ];
  addVehicle(Guntruck, patrolWaypoints2, 1, 0, 0);

  const patrolWaypoints3 = [
    { x: 0, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
    { x: 50, y: 2559 },
    { x: 1700, y: 2559 },
  ];
  addVehicle(Guntruck, patrolWaypoints3, 1, 0, 0);

  console.log(vehicles);

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
    if (vehicle.type === "buk" || vehicle.type === "mtlbKPVT")
      vehicle.static = true;

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
      let timeLimitExceeded = false;
      if (gameData.timer) {
        timeLimitExceeded =
          gameData.timer.totalTime &&
          Date.now() - gameData.timer.startTime >
            gameData.timer.totalTime * 60 * 1000;
      }

      return allDronesDead || scoreTooLow || timeLimitExceeded;
    },

    addedFunction(vehicles, enemies, bombs) {
      setTimeout(() => {
        if (vehicles[0].looseScore !== 22) {
          vehicles.forEach((vehicle) => {
            if (vehicle.isFiring) vehicles[0].looseScore = 22;
          });
          bombs.forEach((bomb) => {
            if (bomb.exploded) vehicles[0].looseScore = 22;
          });
        }
      }, 1000);
      if (vehicles[0].looseScore === 22 && vehicles[1].looseScore !== 22) {
        vehicles[1].looseScore = 22;
        const alarmSound = new Audio("assets/audio/vehicle/alarm.mp3");
        alarmSound.volume = 0.6;
        alarmSound.play();
        vehicles.forEach((vehicle) => {
          if (vehicle.type === "buk" || vehicle.type === "mtlbKPVT") {
            vehicle.static = false;
          }
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
