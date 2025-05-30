import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";

initGame({
  levelId: "level1",
  mapId: "level1",
  winScore: 1500,
  looseScore: 500,
  startLevel: startLevel,
  mapWidth: 2000,
  mapHeight: 3000,
  startY: 2300,
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
    riflemans,
    mashinegunners,
    grenadiers,
    main = true
  ) {
    let waypoints = [];
    if (main) {
      waypoints = [
        { x: 1000 + Math.random() * 1300 - 650, y: 60 },
        { x: 450 + (Math.random() * 400 - 200), y: 800 },
        {
          x: 450 + (Math.random() * 400 - 200),
          y: 1500 + (Math.random() * 100 - 50),
        },
        {
          x: 450 + (Math.random() * 400 - 200),
          y: 2200 + (Math.random() * 100 - 50),
        },
        {
          x: 450 + (Math.random() * 400 - 200),
          y: 2600 + (Math.random() * 100 - 50),
        },
        { x: 450 + (Math.random() * 400 - 200), y: 3000 },
      ];
    } else {
      const startX = Math.random() * 1300 + 400;
      waypoints = [
        { x: startX, y: 60 },
        { x: startX, y: 3000 },
      ];
    }
    const squad = createRifleSquad(
      Math.random() * 350 + 50,
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
  createEnemySquad(3, 1, 1);
  setTimeout(() => {
    createEnemySquad(3, 1, 1);
  }, 6000);
  setTimeout(() => {
    createEnemySquad(3, 1, 0);
  }, 12000);

  setTimeout(() => {
    createEnemySquad(3, 1, 1);
  }, 18000);
  setTimeout(() => {
    createEnemySquad(3, 1, 0);
  }, 25000);
  setTimeout(() => {
    createEnemySquad(1, 1, 0, false);
  }, Math.random() * 10000);
  setTimeout(() => {
    createEnemySquad(2, 0, 0, false);
  }, Math.random() * 10000);
  setTimeout(() => {
    createEnemySquad(2, 1, 0, false);
  }, Math.random() * 10000);

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
