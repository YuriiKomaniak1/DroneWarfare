import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createRifleSquad } from "./enemies/enemy.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { BMP1, Guntruck, Tigr, MTLB } from "./enemies/vehicle.js";

initGame({
  levelId: "level3",
  mapId: "level3",
  winScore: 3032,
  looseScore: 758,
  startLevel: startLevel,
  mapWidth: 1800,
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

  function createEnemySquad(riflemans, mashinegunners, grenadiers, startX) {
    let waypoints = [];
    waypoints = [
      { x: startX, y: 60 },
      { x: startX + Math.random() * 200 - 100, y: 1500 },
      { x: startX + Math.random() * 200 - 100, y: 3000 },
    ];

    const squad = createRifleSquad(
      300,
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
  createEnemySquad(4, 1, 1, 450);
  createEnemySquad(4, 1, 1, 900);
  createEnemySquad(4, 1, 1, 1350);
  setTimeout(() => {
    addVehicle(Tigr, 750, 1, 0, 0);
  }, 8500);
  setTimeout(() => {
    addVehicle(BMP1, 400, 0, 0, 0, 2);
  }, 6500);
  setTimeout(() => {
    addVehicle(BMP1, 1400, 0, 0, 0, 2);
  }, 7000);
  setTimeout(() => {
    addVehicle(Guntruck, 1150, 1, 0, 0, 0);
  }, 9000);
  setTimeout(() => {
    addVehicle(MTLB, 900, 0, 0, 0, 2);
  }, 6000);

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
