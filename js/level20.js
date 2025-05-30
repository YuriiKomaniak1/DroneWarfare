import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Buk, Guntruck, MTLBZU23, ZU23 } from "./enemies/vehicle.js";
initGame({
  levelId: "level2",
  mapId: "level2",
  winScore: 4700,
  looseScore: 1180,
  startLevel: startLevel,
  mapWidth: 1800,
  mapHeight: 3400,
  startY: 1700,
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

  const gunWaypoints1 = [
    { x: 248, y: 628 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints1, 0, 0, 0);
  const gunWaypoints2 = [
    { x: 465, y: 555 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints2, 0, 0, 0);
  const gunWaypoints3 = [
    { x: 1247, y: 1206 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints3, 0, 0, 0);
  const gunWaypoints4 = [
    { x: 1469, y: 1213 },
    { x: 0, y: 0 },
  ];
  addVehicle(ZU23, gunWaypoints4, 0, 0, 0);

  // addVehicle(Guntruck, waypoints1, 1, 0, 0);

  // // головна ціль
  // const waypoints2 = [
  //   { x: 1631, y: 0 },
  //   { x: 1631, y: 1 },
  //   { x: 1633, y: 1089 },
  //   { x: 1631, y: 0 },
  // ];

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

      return allDronesDead || scoreTooLow;
    },

    addedFunction(vehicles, enemies) {
      if (vehicles[0].looseScore !== 22) {
        vehicles.forEach((vehicle) => {
          if (vehicle.isFiring) vehicles[0].looseScore = 22;
        });
      }
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
