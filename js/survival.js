import { createRifleSquad } from "./enemies/enemy.js";
import { NavigationGrid, findPath } from "./logic/navigation.js";
import { createAnimationLoop } from "./logic/gameloop.js";
import { initGame } from "./utils/initGame.js";
import {
  Guntruck,
  Tigr,
  MTLB,
  MTLBKPVT,
  MTLBZU23,
  BMP1,
  BMP2,
  BMP3,
  BTR82,
  T55,
  T62,
  T72,
  T72B3,
  T90,
  Shilka,
} from "./enemies/vehicle.js";
let gameData = JSON.parse(localStorage.getItem("gameData") || "{}");
let gs;
switch (gameData.currentMission) {
  case 1:
    gs = 560;
    break;
  case 2:
    gs = 840;
    break;
  case 3:
    gs = 1225;
    break;
  case 4:
    gs = 1190;
    break;
  case 5:
    gs = 1967;
    break;
  case 6:
    gs = 2338;
    break;
  case 7:
    gs = 2317;
    break;
  case 8:
    gs = 2723;
    break;
  case 9:
    gs = 3129;
    break;
  case 10:
    gs = 3129;
    break;
  case 11:
    gs = 3479;
    break;
  case 12:
    gs = 3689;
    break;
  case 13:
    gs = 4165;
    break;
  case 14:
    gs = 4326;
    break;
  case 15:
    gs = 4487;
    break;
  case 16:
    gs = 4186;
    break;
  case 17:
    gs = 5138;
    break;
  case 18:
    gs = 5019;
    break;
  case 19:
    gs = 5376;
    break;
  case 20:
    gs = 5922;
    break;
  case 21:
    gs = 6167;
    break;
  case 22:
    gs = 6545;
    break;
  case 23:
    gs = 6398;
    break;
  case 24:
    gs = 7301;
    break;
  case 25:
    gs = 7441;
    break;
  case 26:
    gs = 7091;
    break;
  case 27:
    gs = 8036;
    break;
  case 28:
    gs = 7994;
    break;
  case 29:
    gs = 8610;
    break;
  case 30:
    gs = 8897;
    break;
  case 31:
    gs = 9709;
    break;
  case 32:
    gs = 9667;
    break;
  case 33:
    gs = 9772;
    break;
  case 34:
    gs = 9947;
    break;
  case 35:
    gs = 9996;
    break;
  case 36:
    gs = 9877;
    break;
  case 37:
    gs = 10409;
    break;
  case 38:
    gs = 10437;
    break;
  case 39:
    gs = 11648;
    break;
  case 40:
    gs = 11935;
    break;
  case 41:
    gs = 12215;
    break;
  case 42:
    gs = 12222;
    break;
  case 43:
    gs = 12572;
    break;
  case 44:
    gs = 12852;
    break;
  case 45:
    gs = 12852;
    break;
  case 46:
    gs = 13965;
    break;
  case 47:
    gs = 15421;
    break;
  case 48:
    gs = 16107;
    break;
  case 49:
    gs = 16128;
    break;
  case 50:
    gs = 16828;
    break;

  default:
    gs = 0;
}

initGame({
  levelId: "survival",
  mapId: "survival",
  winScore: Math.floor(gs * 0.9),
  looseScore: Math.floor(gs * 0.1),
  startLevel: startLevel,
  mapWidth: 2000,
  mapHeight: 4200,
  startY: 1500,
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
  let vCoords = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900,
  ];
  let iCoords = [300, 500, 700, 900, 1100, 1300, 1500, 1700];

  function avh(Class, riflemans, crew) {
    let index = Math.floor(Math.random() * vCoords.length);
    const startX = vCoords[index];
    const startY = Math.random() * 400;
    const targetX = vCoords[index];
    const targetY = 4200;
    vCoords.splice(index, 1);
    let waypoints = [
      { x: startX, y: startY },
      { x: startX, y: startY + 1 },
      { x: targetX, y: targetY },
    ];
    let vehicle = new Class(
      startX,
      startY,
      layer1,
      ctx,
      waypoints,
      vehicleNavGrid
    );
    vehicle.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
    vehicle.currentPathIndex = 0;
    vehicle.embark(enemies, navGrid, riflemans, 0, 0, crew);
    vehicle.speed = 0.18 + Math.random() * 0.07;
    vehicles.push(vehicle);
  }

  function ces(riflemans, mashinegunners, grenadiers) {
    let index = Math.floor(Math.random() * iCoords.length);
    const startX = iCoords[index];
    const startY = Math.random() * 200 + 200;
    const targetX = iCoords[index];
    const targetY = 4200;
    vCoords.splice(index, 1);
    let waypoints = [
      { x: startX, y: startY },
      { x: startX, y: startY + 1 },
      { x: targetX, y: targetY },
    ];
    const squad = createRifleSquad(
      500,
      80,
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

  switch (gameData.currentMission) {
    case 1:
      ces(4, 1, 1);
      ces(4, 1, 1);
      break;
    case 2:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      break;
    case 3:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      break;
    case 4:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Tigr, 1, 0);
      break;
    case 5:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 0, 2);
      avh(BMP1, 0, 2);
      break;
    case 6:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 1, 0);
      avh(BMP1, 0, 2);
      avh(BMP1, 0, 2);
      break;
    case 7:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 0, 2);
      avh(BMP1, 0, 2);
      avh(Tigr, 1, 0);
      break;
    case 8:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 0, 2);
      avh(BMP1, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      break;
    case 9:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 0, 2);
      avh(BMP1, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      break;
    case 10:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(BMP1, 0, 2);
      avh(BMP1, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      break;
    case 11:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(BMP1, 0, 2);
      avh(BMP1, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      avh(Tigr, 1, 0);
      break;
    case 12:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(BMP3, 0, 2);
      avh(BMP1, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Guntruck, 1, 0);
      avh(Tigr, 1, 0);
      break;
    case 13:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      avh(Tigr, 1, 0);
      break;
    case 14:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Tigr, 1, 0);
      avh(BTR82, 0, 1);
      break;
    case 15:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      break;
    case 16:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP1, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(BTR82, 0, 1);
      avh(Guntruck, 1, 0);
      break;
    case 17:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP1, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(BTR82, 0, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 18:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(BMP1, 0, 2);
      avh(MTLB, 0, 2);
      avh(T55, 0, 3);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(Guntruck, 1, 0);
      avh(MTLBKPVT, 1, 1);
      break;
    case 19:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Tigr, 1, 0);
      avh(BTR82, 0, 1);
      avh(MTLB, 0, 2);
      avh(T55, 0, 3);
      avh(T55, 0, 3);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      break;
    case 20:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T55, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 21:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(Guntruck, 1, 0);
      avh(MTLB, 0, 2);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T55, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 22:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T55, 0, 3);
      avh(T62, 0, 3);
      avh(BMP1, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 23:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T62, 0, 3);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 24:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP1, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 25:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 26:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP1, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 27:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T72, 0, 2);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBZU23, 2, 1);
      break;
    case 28:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBZU23, 2, 1);
      break;
    case 29:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      break;
    case 30:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T55, 0, 3);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T62, 0, 3);
      avh(T62, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 31:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T62, 0, 3);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      break;
    case 32:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP1, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 33:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP1, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 34:
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      ces(4, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP1, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 35:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP1, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Tigr, 1, 0);
      break;
    case 36:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(BTR82, 0, 1);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 37:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T62, 0, 3);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 38:
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      ces(5, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP2, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      break;
    case 39:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      break;
    case 40:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      break;
    case 41:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      break;
    case 42:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 43:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP2, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 44:
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 45:
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBKPVT, 1, 1);
      avh(MTLBKPVT, 1, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 46:
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 47:
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      ces(7, 1, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 48:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(BMP3, 0, 2);
      avh(BMP3, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 49:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T72, 0, 2);
      avh(T72, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;
    case 50:
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      ces(6, 1, 1);
      avh(BTR82, 0, 1);
      avh(BTR82, 0, 1);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T72B3, 0, 2);
      avh(T72B3, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(T90, 0, 2);
      avh(MTLBZU23, 2, 1);
      avh(MTLBZU23, 2, 1);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      avh(Shilka, 0, 2);
      break;

    default:
      gs = 0;
  }

  enemies.forEach((enemy) => {
    enemy.score = Math.round(enemy.score * 0.7);
    enemy.winScore = enemy.score;
    enemy.looseScore = enemy.score;
  });
  vehicles.forEach((vehicle) => {
    vehicle.score = Math.round(vehicle.score * 0.7);
    vehicle.winScore = vehicle.score;
    vehicle.looseScore = vehicle.score;
  });
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
