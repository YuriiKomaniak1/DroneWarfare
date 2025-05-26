export function initGameDataStrict(gameData) {
  if (!gameData || typeof gameData !== "object") {
    console.warn("gameData was null or invalid, initializing new object");
    gameData = {};
  }

  // Гарантуємо масиви
  gameData.trenches ??= [];
  gameData.obstacles ??= [];
  gameData.bigObstacles ??= [];
  gameData.bombObstacles ??= [];
  gameData.covers ??= [];

  // Числові значення
  gameData.winScore = Number(gameData.winScore) || 0;
  gameData.looseScore = Number(gameData.looseScore) || 0;
  gameData.initialWinScore =
    Number(gameData.initialWinScore) || gameData.winScore;
  gameData.initialLooseScore =
    Number(gameData.initialLooseScore) || gameData.looseScore;
  gameData.score = Number(gameData.score) || 0;

  // Таймер
  gameData.timer ??= { startTime: null, totalTime: null };
  if (typeof gameData.timer.startTime !== "number")
    gameData.timer.startTime = null;
  if (typeof gameData.timer.totalTime !== "number")
    gameData.timer.totalTime = null;

  // Дрони
  gameData.drones ??= [];

  // Флаги доступності
  gameData.mediumDroneAvailable ??= false;
  gameData.bigDroneAvailable ??= false;
  gameData.slot4Available ??= false;
  gameData.slot5Available ??= false;

  gameData.footMineAvailable ??= false;
  gameData.tankMineAvailable ??= false;
  gameData.magnetMineAvailable ??= false;
  gameData.shrapnelMineAvailable ??= false;
  gameData.clusterBombAvailable ??= false;
  gameData.shapedClusterBombAvailable ??= false;

  // Апгрейди (швидкість, місткість, HP)
  const upgradeFields = [
    "smallDroneSpeedUpgrade",
    "mediumDroneSpeedUpgrade",
    "bigDroneSpeedUpgrade",
    "smallDroneCapacityUpgrade",
    "mediumDroneCapacityUpgrade",
    "bigDroneCapacityUpgrade",
    "smallDroneHPUpgrade",
    "mediumDroneHPUpgrade",
    "bigDroneHPUpgrade",
    "fragBombUpgrade",
    "heBombUpgrade",
    "shapedBombUpgrade",
    "footMineUpgrade",
    "tankMineUpgrade",
    "magnetMineUpgrade",
    "shrapnelBombUpgrade",
    "clusterBombUpgrade",
    "shapedClusterBombUpgrade",
    "upgradeGap",
    "gapScale",
  ];
  for (const field of upgradeFields) {
    gameData[field] = Number(gameData[field]) || 0;
  }

  // Поточна місія
  gameData.currentMission = Number(gameData.currentMission) || 1;

  // Типово — null або 0
  gameData.trenches ??= null;
  gameData.covers ??= null;

  // Повертаємо стабільний об'єкт
  return gameData;
}
