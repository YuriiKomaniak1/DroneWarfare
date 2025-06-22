import { createRifleSquad, createEqualRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { Guntruck } from "./enemies/vehicle.js";

const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.1,
  musicVolume: 0.6,
};

initGame({
  levelId: "level24",
  mapId: "level12",
  winScore: 6000,
  looseScore: 500,
  startLevel: startLevel,
  mapWidth: 2200,
  mapHeight: 2500,
  startY: 2800,
  rotationDegrees: 180,
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
    const squad = createEqualRifleSquad(
      36,
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
      enemy.distance = 0.4 + Math.random() * 0.2;
    });
    enemies.push(...squad);
  }
  const waypoints1 = [
    { x: 1171, y: 746 },
    { x: 1050, y: 0 },
  ];
  createEnemySquad(3, 1, 1, waypoints1);
  const waypoints2 = [
    { x: 1401, y: 746 },
    { x: 1350, y: 0 },
  ];
  createEnemySquad(3, 1, 1, waypoints2);
  const waypoints3 = [
    { x: 1102, y: 808 },
    { x: 500, y: 0 },
  ];
  createEnemySquad(5, 1, 1, waypoints3);
  const waypoints4 = [
    { x: 1380, y: 808 },
    { x: 1670, y: 0 },
  ];
  createEnemySquad(5, 1, 1, waypoints4);
  const waypoints5 = [
    { x: 1102, y: 850 },
    { x: 0, y: 500 },
  ];
  createEnemySquad(5, 1, 1, waypoints5);
  const waypoints6 = [
    { x: 1380, y: 850 },
    { x: 2200, y: 500 },
  ];
  createEnemySquad(5, 1, 1, waypoints6);
  const waypoints7 = [
    { x: 1102, y: 900 },
    { x: 0, y: 966 },
  ];
  createEnemySquad(5, 1, 1, waypoints7);
  const waypoints8 = [
    { x: 1380, y: 900 },
    { x: 2200, y: 966 },
  ];
  createEnemySquad(5, 1, 1, waypoints8);

  const waypoints9 = [
    { x: 1171, y: 950 },
    { x: 0, y: 1270 },
  ];
  createEnemySquad(3, 0, 0, waypoints9);
  const waypoints10 = [
    { x: 1470, y: 950 },
    { x: 2200, y: 1270 },
  ];
  createEnemySquad(3, 0, 0, waypoints10);
  const waypoints11 = [
    { x: 1171, y: 1000 },
    { x: 0, y: 1270 },
  ];
  createEnemySquad(3, 0, 0, waypoints11);
  const waypoints12 = [
    { x: 1470, y: 1000 },
    { x: 2200, y: 1270 },
  ];
  createEnemySquad(3, 0, 0, waypoints12);

  const waypoints13 = [
    { x: 1102, y: 1050 },
    { x: 0, y: 1650 },
  ];
  createEnemySquad(5, 1, 1, waypoints13);
  const waypoints14 = [
    { x: 1380, y: 1050 },
    { x: 2200, y: 1650 },
  ];
  createEnemySquad(5, 1, 1, waypoints14);

  const waypoints15 = [
    { x: 1102, y: 1100 },
    { x: 0, y: 1966 },
  ];
  createEnemySquad(5, 1, 1, waypoints15);
  const waypoints16 = [
    { x: 1380, y: 1100 },
    { x: 2200, y: 1966 },
  ];
  createEnemySquad(5, 1, 1, waypoints16);

  const waypoints17 = [
    { x: 1102, y: 1150 },
    { x: 500, y: 2500 },
  ];
  createEnemySquad(5, 1, 1, waypoints17);
  const waypoints18 = [
    { x: 1380, y: 1150 },
    { x: 1667, y: 2500 },
  ];
  createEnemySquad(5, 1, 1, waypoints18);

  const waypoints19 = [
    { x: 491, y: 2216 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 491, y: 2215 },
    { x: 497, y: 1289 },
    { x: 1047, y: 1291 },
    { x: 1052, y: 2227 },
    { x: 0, y: 0 },
  ];
  addVehicle(Guntruck, waypoints19, 1, 0, 0);

  const waypoints20 = [
    { x: 1600, y: 1962 },
    { x: 1600, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 1671, y: 1966 },
    { x: 499, y: 1966 },
    { x: 492, y: 1285 },
    { x: 1669, y: 1292 },
    { x: 2200, y: 0 },
  ];
  addVehicle(Guntruck, waypoints20, 1, 0, 0);

  const waypoints21 = [
    { x: 1664, y: 1276 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 1668, y: 1292 },
    { x: 1666, y: 1963 },
    { x: 493, y: 1961 },
    { x: 494, y: 1289 },
    { x: 2200, y: 0 },
  ];
  addVehicle(Guntruck, waypoints21, 1, 0, 0);

  const waypoints22 = [
    { x: 1663, y: 676 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 1288 },
    { x: 1657, y: 682 },
    { x: 1051, y: 673 },
    { x: 1048, y: 1284 },
    { x: 1667, y: 2500 },
  ];
  addVehicle(Guntruck, waypoints22, 1, 0, 0);

  enemies[1].looseScore = 22;

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
    vehicle.droneSpottingChanse = 10;
    vehicle.embark(
      enemies,
      navGrid,
      riflemans,
      mashinegunners,
      grenadiers,
      crew
    );
    vehicle.looseScore = 0;
    vehicle.winScore = 0;
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
        alarmSound.volume = 0.3 * volumeSettings.soundVolume;
        alarmSound.play();

        enemies.forEach((enemy) => {
          enemy.static = false;
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
