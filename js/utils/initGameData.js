export function initGameDataStrict(gameData) {
  if (!gameData) throw new Error("gameData is undefined");

  if (!Array.isArray(gameData.trenches))
    throw new Error("gameData.trenches is missing or invalid");

  if (!Array.isArray(gameData.obstacles))
    throw new Error("gameData.obstacles is missing or invalid");

  if (!Array.isArray(gameData.bigObstacles))
    throw new Error("gameData.bigObstacles is missing or invalid");

  if (!Array.isArray(gameData.bombObstacles))
    throw new Error("gameData.bombObstacles is missing or invalid");

  if (!Array.isArray(gameData.covers))
    throw new Error("gameData.covers is missing or invalid");

  // Можеш додати ще інші обов'язкові поля:
  if (typeof gameData.winScore !== "number")
    throw new Error("gameData.winScore is missing or invalid");

  if (typeof gameData.looseScore !== "number")
    throw new Error("gameData.looseScore is missing or invalid");

  return gameData;
}
