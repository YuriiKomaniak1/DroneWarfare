import { briefingText } from "./levels/briefingText.js";
import { BriefingDrones } from "./gameElements/BriefingDroneIcons.js";
import { drones } from "./logic/gamestate.js";

const missionKey = "mission1"; // Сюди підставляється поточна місія
document.getElementById("briefing-text").innerHTML = briefingText[missionKey];

// Малюємо дронів та боєзапас
const canvas = document.getElementById("droneCanvas");
const ctx = canvas.getContext("2d");
canvas.height = canvas.width / 4;

const droneIcons = [];

for (let i = 0; i < 5; i++) {
  const spase = canvas.width / 21;
  const iconWidth = canvas.width / 7;
  let x = spase + i * (iconWidth + spase);
  droneIcons[i] = new BriefingDrones(
    canvas,
    ctx,
    i + 1,
    drones[i],
    iconWidth,
    x,
    10
  );
}
let lastTime = 0;
function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  if (deltaTime >= FRAME_TIME) {
    lastTime = timestamp - (deltaTime % FRAME_TIME);

    droneIcons.forEach((object) => {
      object.draw();
    });
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate); // Запускаємо цикл
