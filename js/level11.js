import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BMP3, BMP2, BTR82, MTLBKPVT } from "./enemies/vehicle.js";

initGame({
  levelId: "level1",
  mapId: "level1",
  winScore: 5352,
  looseScore: 1338,
  startLevel: startLevel,
  mapWidth: 2000,
  mapHeight: 3000,
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

  function createEnemySquad(riflemans, mashinegunners, grenadiers, startX) {
    let waypoints = [];
    waypoints = [
      { x: startX, y: 60 },
      { x: startX + Math.random() * 200 - 100, y: 1500 },
      { x: startX + Math.random() * 200 - 100, y: 3000 },
    ];

    const squad = createRifleSquad(
      400,
      50,
      layer1,
      ctx,
      navGrid,
      waypoints,
      riflemans,
      mashinegunners,
      grenadiers,
      0
    );
    enemies.push(...squad);
  }
  createEnemySquad(7, 2, 1, 500);
  createEnemySquad(7, 2, 1, 1000);
  createEnemySquad(7, 2, 1, 1500);

  setTimeout(() => {
    addVehicle(MTLBKPVT, 450, 2, 0, 0);
  }, 8500);
  setTimeout(() => {
    addVehicle(BMP3, 250, 0, 0, 0, 2);
  }, 6500);

  setTimeout(() => {
    addVehicle(BTR82, 650, 0, 0, 0, 1);
  }, 6000);
  setTimeout(() => {
    addVehicle(BMP2, 1150, 1, 0, 0, 0);
  }, 9000);
  setTimeout(() => {
    addVehicle(BTR82, 1000, 0, 0, 0, 1);
  }, 6000);

  setTimeout(() => {
    addVehicle(BMP3, 1600, 0, 0, 0, 2);
  }, 7000);
  setTimeout(() => {
    addVehicle(MTLBKPVT, 1750, 2, 0, 0);
  }, 8500);

  function addVehicle(
    Class,
    startX,
    riflemans,
    mashinegunners,
    grenadiers,
    crew
  ) {
    let waypoints = [
      { x: startX, y: 50 },
      { x: startX, y: 101 },
      { x: startX, y: 1000 },
      { x: startX, y: 3000 },
    ];
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
    vehicle.speed = 0.18;
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
