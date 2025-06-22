import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import { UAZ452, Ural, BMP2, Tigr } from "./enemies/vehicle.js";

initGame({
  levelId: "level0",
  mapId: "level0",
  winScore: 5000,
  looseScore: 2000,
  startLevel: startLevel,
  mapWidth: 1200,
  mapHeight: 1200,
  startY: 1200,
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
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const modal3 = document.getElementById("modal3");
  const modal4 = document.getElementById("modal4");
  const modal5 = document.getElementById("modal5");
  const modal6 = document.getElementById("modal6");
  const modal7 = document.getElementById("modal7");
  const modal8 = document.getElementById("modal8");
  const modal9 = document.getElementById("modal9");
  const modal10 = document.getElementById("modal10");

  const modal1Button = document.getElementById("modal1Button");
  const modal2Button = document.getElementById("modal2Button");
  const modal3Button = document.getElementById("modal3Button");
  const modal4Button = document.getElementById("modal4Button");
  const modal5Button = document.getElementById("modal5Button");
  const modal6Button = document.getElementById("modal6Button");
  const modal7Button = document.getElementById("modal7Button");
  const modal8Button = document.getElementById("modal8Button");
  const modal9Button = document.getElementById("modal9Button");
  const modal10Button = document.getElementById("modal10Button");

  modal1Button.addEventListener("click", () => {
    modal1.style.visibility = "hidden";
    modal2.style.visibility = "visible";
  });

  modal2Button.addEventListener("click", () => {
    modal2.style.visibility = "hidden";
    setTimeout(() => {
      modal3.style.visibility = "visible";
    }, 15000);
  });

  modal3Button.addEventListener("click", () => {
    modal3.style.visibility = "hidden";
    modal4.style.visibility = "visible";
  });

  modal4Button.addEventListener("click", () => {
    modal4.style.visibility = "hidden";
    setTimeout(() => {
      modal5.style.visibility = "visible";
    }, 10000);
  });

  modal5Button.addEventListener("click", () => {
    modal5.style.visibility = "hidden";
    setTimeout(() => {
      modal6.style.visibility = "visible";
    }, 8000);
  });

  modal6Button.addEventListener("click", () => {
    modal6.style.visibility = "hidden";
    modal7.style.visibility = "visible";
  });

  modal7Button.addEventListener("click", () => {
    modal7.style.visibility = "hidden";
    createEnemySquad(1, 0, 0);
    setTimeout(() => {
      createEnemySquad(1, 0, 0);
    }, 15000);
    setTimeout(() => {
      createEnemySquad(1, 0, 0);
    }, 30000);
    setTimeout(() => {
      createEnemySquad(1, 0, 0);
    }, 45000);
    setTimeout(() => {
      enemies.length = 0;
      modal8.style.visibility = "visible";
    }, 60000);
  });

  modal8Button.addEventListener("click", () => {
    modal8.style.visibility = "hidden";
    createEnemySquad(5, 1, 1);
    setTimeout(() => {
      createEnemySquad(5, 1, 1);
    }, 10000);
    setTimeout(() => {
      enemies.length = 0;
      modal9.style.visibility = "visible";
    }, 80000);
  });

  modal9Button.addEventListener("click", () => {
    modal9.style.visibility = "hidden";
    addVehicle(Ural, 3, 1, 0, 0);
    setTimeout(() => {
      addVehicle(UAZ452, 1, 1, 0);
    }, 15000);
    setTimeout(() => {
      addVehicle(Tigr, 2, 0, 0);
    }, 30000);
    setTimeout(() => {
      addVehicle(BMP2, 2, 0, 0, 2);
    }, 45000);
    setTimeout(() => {
      vehicles.length = 0;
      modal10.style.visibility = "visible";
    }, 90000);
  });

  modal10Button.addEventListener("click", () => {
    modal10.style.visibility = "hidden";
    gameData.currentMission++;
    let autoSave = JSON.parse(localStorage.getItem("autoSave")) || {
      saves: [],
    };
    let difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {};

    // Додаємо сейв з копією gameData
    autoSave.saves.unshift({
      data: JSON.parse(JSON.stringify(gameData)),
      date: Date.now(),
      mission: gameData.currentMission,
      difficulty: JSON.parse(JSON.stringify(difficulty)),
    });
    while (autoSave.saves.length > 10) {
      autoSave.saves.pop();
    }
    let briefingModal = { briefing: true, equip: true };
    localStorage.setItem("briefingModal", JSON.stringify(briefingModal));
    localStorage.setItem("autoSave", JSON.stringify(autoSave));
    localStorage.setItem("playBriefingMusic", "true");
    location.href = "briefing.html";
  });

  function addVehicle(Class, riflemans, mashinegunners, grenadiers, crew) {
    let x = Math.random() * 600 + 300;
    let waypoints = [
      { x: x, y: 0 },
      { x: x, y: 1 },
      { x: x, y: 1200 },
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
    vehicle.speed = 0.3;
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

  function createEnemySquad(riflemans, mashinegunners, grenadiers) {
    let waypoints = [];
    waypoints = [
      { x: 600, y: 60 },
      { x: 600, y: 1200 },
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
    true
  );
}
