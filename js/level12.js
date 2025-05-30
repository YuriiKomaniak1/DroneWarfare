import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BTR82, Tigr } from "./enemies/vehicle.js";

initGame({
  levelId: "level12",
  mapId: "level12",
  winScore: 5352,
  looseScore: 1338,
  startLevel: startLevel,
  mapWidth: 2200,
  mapHeight: 2500,
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

  function createEnemySquad(riflemans, mashinegunners, grenadiers, waypoints) {
    const squad = createRifleSquad(
      50,
      300,
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
  const waypoints1 = [
    { x: 529, y: 150 },
    { x: 681, y: 566 },
    { x: 662, y: 1179 },
    { x: 149, y: 1296 },
    { x: 231, y: 2500 },
  ];
  createEnemySquad(3, 1, 1, waypoints1);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints1);
  }, 60000);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints1);
  }, 120000);

  const waypoints2 = [
    { x: 1136, y: 150 },
    { x: 917, y: 558 },
    { x: 877, y: 1396 },
    { x: 1018, y: 2500 },
  ];
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints2);
  }, 1000);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints2);
  }, 70000);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints2);
  }, 130000);
  const waypoints3 = [
    { x: 1694, y: 150 },
    { x: 1572, y: 534 },
    { x: 1382, y: 1172 },
    { x: 2042, y: 1548 },
    { x: 1976, y: 2294 },
    { x: 1714, y: 2500 },
  ];
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints3);
  }, 5000);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints3);
  }, 80000);
  setTimeout(() => {
    createEnemySquad(3, 1, 1, waypoints3);
  }, 140000);

  const waypoints4 = [
    { x: 11, y: 529 },
    { x: 12, y: 529 },
    { x: 1142, y: 531 },
    { x: 1144, y: 1191 },
    { x: 526, y: 1203 },
    { x: 524, y: 1793 },
    { x: 522, y: 2500 },
  ];

  setTimeout(() => {
    addVehicle(Tigr, waypoints4, 2, 0, 0);
  }, 10000);
  setTimeout(() => {
    addVehicle(BTR82, waypoints4, 0, 0, 0, 1);
  }, 90000);

  const waypoints5 = [
    { x: 2178, y: 528 },
    { x: 2177, y: 528 },
    { x: 1139, y: 528 },
    { x: 1147, y: 1192 },
    { x: 1698, y: 1207 },
    { x: 1697, y: 1812 },
    { x: 1697, y: 2457 },
  ];

  setTimeout(() => {
    addVehicle(Tigr, waypoints5, 2, 0, 0);
  }, 30000);
  setTimeout(() => {
    addVehicle(BTR82, waypoints5, 0, 0, 0, 1);
  }, 100000);

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
    vehicles.push(vehicle);
  }
  console.log(enemies, vehicles);
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
