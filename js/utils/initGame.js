import { initGameDataStrict } from "./initGameData.js";
import { Layer } from "../layers/layer.js";
import { NavigationGrid } from "../logic/navigation.js";

export async function initGame({
  levelId,
  mapId,
  winScore,
  looseScore,
  startLevel,
  mapWidth,
  mapHeight,
  rotationDegrees = 0,
}) {
  let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");

  try {
    const basePath = `js/levels/${levelId}`;
    const [trenches, obstacles, bigObstacles, bombObstacles, covers] =
      await Promise.all([
        fetch(`${basePath}/trenches.json`).then((r) => {
          if (!r.ok) throw new Error("Не вдалося завантажити trenches.json");
          return r.json();
        }),
        fetch(`${basePath}/obstacles.json`).then((r) => {
          if (!r.ok) throw new Error("Не вдалося завантажити obstacles.json");
          return r.json();
        }),
        fetch(`${basePath}/bigObstacles.json`).then((r) => {
          if (!r.ok)
            throw new Error("Не вдалося завантажити bigObstacles.json");
          return r.json();
        }),
        fetch(`${basePath}/bombObstacles.json`).then((r) => {
          if (!r.ok)
            throw new Error("Не вдалося завантажити bombObstacles.json");
          return r.json();
        }),
        fetch(`${basePath}/covers.json`).then((r) => {
          if (!r.ok) throw new Error("Не вдалося завантажити covers.json");
          return r.json();
        }),
      ]);

    // Заповнення
    gameData.trenches = trenches;
    gameData.obstacles = obstacles;
    gameData.bigObstacles = bigObstacles;
    gameData.bombObstacles = bombObstacles;
    gameData.covers = covers;

    gameData.winScore = winScore;
    gameData.looseScore = looseScore;
    gameData.initialWinScore = winScore;
    gameData.initialLooseScore = looseScore;

    initGameDataStrict(gameData);

    localStorage.setItem("gameData", JSON.stringify(gameData));

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = Math.min(window.innerWidth, 1500);
    canvas.height = Math.min(window.innerHeight, 2000);

    const layerBottom = new Image();
    layerBottom.src = `assets/img/grounds/${mapId}bottom.png`;
    const layerTop = new Image();
    layerTop.src = `assets/img/grounds/${mapId}top.png`;
    const layer1 = new Layer(
      layerBottom,
      canvas,
      mapWidth,
      mapHeight,
      ctx,
      rotationDegrees
    );
    const layer2 = new Layer(
      layerTop,
      canvas,
      mapWidth,
      mapHeight,
      ctx,
      rotationDegrees
    );
    const navGrid = new NavigationGrid(layer1, 15, gameData.obstacles);
    const vehicleNavGrid = new NavigationGrid(
      layer1,
      36,
      gameData.bigObstacles
    );

    // ✅ Старт рівня
    startLevel(gameData, layer1, layer2, canvas, ctx, navGrid, vehicleNavGrid);
  } catch (error) {
    console.error("❌ Ініціалізація гри не вдалася:", error);
    alert("Помилка запуску рівня: " + error.message);
  }
}
