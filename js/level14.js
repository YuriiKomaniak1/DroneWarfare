import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import {
  Guntruck,
  Tigr,
  Jeep,
  UAZ452,
  UAV,
  UralSupply,
  KPVT,
  MTLBKPVT,
} from "./enemies/vehicle.js";

initGame({
  levelId: "level8",
  mapId: "level8",
  winScore: 3000,
  looseScore: 500,
  startLevel: startLevel,
  mapWidth: 3000,
  mapHeight: 3000,
  startY: 2900,
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
  // піхота в окопах
  const wa1 = [
    { x: 1345, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa1);
  const wa2 = [
    { x: 1400, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa2);

  const wa4 = [
    { x: 1740, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa4);
  const wa5 = [
    { x: 1790, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa5);
  const wa6 = [
    { x: 1850, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa6);
  const wa7 = [
    { x: 1900, y: 1883 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa7);

  const wa8 = [
    { x: 2093, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa8);
  const wa9 = [
    { x: 2143, y: 1725 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa9);
  // джипи охорони
  const waypoints1 = [
    { x: 0, y: 2134 },
    { x: 1, y: 2134 },
    { x: 924, y: 2134 },
    { x: 906, y: 2556 },
    { x: 2504, y: 2615 },
    { x: 2489, y: 1406 },
    { x: 1994, y: 881 },
    { x: 614, y: 890 },
    { x: 718, y: 1975 },
    { x: 2583, y: 1966 },
    { x: 1499, y: 913 },
    { x: 1499, y: 0 },
  ];
  addVehicle(Guntruck, waypoints1, 1, 0, 0);
  const waypoints10 = [
    { x: 3000, y: 2434 },
    { x: 2999, y: 2434 },
    { x: 600, y: 2434 },
    { x: 924, y: 2134 },
    { x: 906, y: 2556 },
    { x: 2504, y: 2615 },
    { x: 2489, y: 1406 },
    { x: 1994, y: 881 },
    { x: 614, y: 890 },
    { x: 718, y: 1975 },
    { x: 2583, y: 1966 },
    { x: 1499, y: 913 },
    { x: 1499, y: 0 },
  ];

  addVehicle(Guntruck, waypoints10, 1, 0, 0);

  // головна ціль
  const waypoints2 = [
    { x: 1631, y: 0 },
    { x: 1631, y: 1 },
    { x: 1633, y: 1089 },
    { x: 1631, y: 0 },
  ];
  const waypoints3 = [
    { x: 1800, y: 0 },
    { x: 1800, y: 1 },
    { x: 1800, y: 1089 },
    { x: 1800, y: 0 },
  ];
  const waypoints4 = [
    { x: 1461, y: 0 },
    { x: 1461, y: 1 },
    { x: 1461, y: 1089 },
    { x: 1461, y: 0 },
  ];
  setTimeout(() => {
    addVehicle(UAZ452, waypoints2, 5, 0, 0);
    enemies.forEach((enemy) => {
      enemy.winScore = 0;
      enemy.looseScore = 0;
      if (enemy.vehicle && enemy.vehicle.type === "uaz452") {
        enemy.winScore = 200;
        enemy.looseScore = 200;
        enemy.mark = "goal";
        enemy.static = true;
      }
    });
    vehicles.forEach((vehicle) => {
      if (vehicle.type !== "uaz452") {
        vehicle.winScore = 0;
        vehicle.looseScore = 0;
      } else {
        vehicle.winScore = 1000;
        vehicle.looseScore = 1000;
        vehicle.mark = "goal";
      }
    });
  }, 61000);
  setTimeout(() => {
    addVehicle(Guntruck, waypoints3, 1, 0, 0);
  }, 60000);
  setTimeout(() => {
    addVehicle(Guntruck, waypoints4, 1, 0, 0);
  }, 60000);

  const gunWaypoints1 = [
    { x: 1297, y: 1346 },
    { x: 0, y: 0 },
  ];
  const gunWaypoints2 = [
    { x: 1850, y: 1350 },
    { x: 0, y: 0 },
  ];
  // блокпост
  const tigrWaypoints = [
    { x: 620, y: 1082 },
    { x: 0, y: 0 },
  ];
  addVehicle(Tigr, tigrWaypoints, 0, 0, 0);

  const mtlbWaypoints = [
    { x: 1930, y: 796 },
    { x: 0, y: 0 },
  ];
  addVehicle(MTLBKPVT, mtlbWaypoints, 2, 0, 0);

  const wa3 = [
    { x: 670, y: 1150 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa3);
  const wa10 = [
    { x: 720, y: 1120 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa10);

  const uralWaypoints = [
    { x: 2500, y: 750 },
    { x: 0, y: 0 },
  ];
  addVehicle(UralSupply, uralWaypoints, 1, 0, 0);
  const jeepWaypoints = [
    { x: 2600, y: 770 },
    { x: 0, y: 0 },
  ];
  addVehicle(Jeep, jeepWaypoints, 1, 0, 0);

  const wa11 = [
    { x: 2500, y: 850 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa11);

  const wa12 = [
    { x: 2560, y: 850 },
    { x: 0, y: 0 },
  ];
  enemy(1, 0, 0, wa12);

  const wa13 = [
    { x: 2570, y: 885 },
    { x: 0, y: 0 },
  ];
  enemy(0, 1, 0, wa13);

  addVehicle(KPVT, gunWaypoints1, 0, 0, 0);
  addVehicle(KPVT, gunWaypoints2, 0, 0, 0);

  console.log(vehicles);
  // функція створення юнітів
  function enemy(riflemans, mashinegunners, grenadiers, waypoints) {
    const squad = createRifleSquad(
      0,
      0,
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
      enemy.winScore = 0;
    });
    enemies.push(...squad);
  }

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
    if (
      vehicle.type === "tigr" ||
      vehicle.type === "uralSupply" ||
      vehicle.type === "jeep" ||
      vehicle.type === "mtlbKPVT"
    )
      vehicle.static = true;
    if (vehicle.static) vehicle.winScore = 0;
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
      const Guntrucks = vehicles.filter(
        (vehicle) => vehicle.type === "guntruck"
      );

      vehicles.forEach((vehicle, index) => {
        // Десантуємо uaz452 при 3-му вейпоінті
        if (
          vehicle.type === "uaz452" &&
          vehicle.currentWaypointIndex === 3 &&
          enemies[2].looseScore !== 22
        ) {
          enemies[2].looseScore = 22;
          vehicle.disembark(1450, 0, navGrid);
          setTimeout(() => {
            vehicle.static = true;
          }, 5200);
          const wauav = [
            { x: 1633, y: 1189 },
            { x: 0, y: 0 },
          ];
          addVehicle(UAV, wauav, 0, 0, 0);
        }

        // Зупиняємо тільки 3-й і 4-й Guntruck
        const guntruckIndex = Guntrucks.indexOf(vehicle);
        if (
          vehicle.type === "guntruck" &&
          (guntruckIndex === 2 || guntruckIndex === 3) &&
          vehicle.currentWaypointIndex === 3
        ) {
          vehicle.static = true;
        }
      });
      if (enemies[0].looseScore === 22 && enemies[1].looseScore !== 22) {
        enemies[1].looseScore = 22;
        if (!vehicles.some((vehicle) => vehicle.type === "uaz452"))
          gameData.looseScore = 0;
        const alarmSound = new Audio("assets/audio/vehicle/alarm.mp3");
        alarmSound.volume = 0.6;
        alarmSound.play();
        vehicles.forEach((vehicle) => {
          if (vehicle.type === "uaz452") {
            vehicle.winScore = 2000;
          }
          if (
            (vehicle.mark &&
              vehicle.mark === "goal" &&
              vehicle.type !== "uav") ||
            vehicle.type === "guntruck"
          ) {
            vehicle.static = false;
            vehicle.waypoints = [{ x: 1500, y: 0 }];
            vehicle.currentWaypointIndex = 0;
            vehicle.setPathToWaypoint(); // 🟢 важливо!
          }
          enemies.forEach((enemy) => {
            if (enemy.mark && enemy.mark === "goal") {
              enemy.static = false;
              enemy.waypoints = [{ x: 1500, y: 0 }];
              enemy.currentWaypointIndex = 0;
              enemy.setPathToWaypoint(); // 🟢 важливо!
            }
          });
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
