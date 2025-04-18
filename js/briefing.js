import { briefingText } from "./levels/briefingText";
import { drones } from "./logic/gamestate";

const missionKey = "mission1"; // Сюди підставляється поточна місія
document.getElementById("briefing-text").innerHTML = briefingText[missionKey];

// Малюємо дронів та боєзапас
const canvas = document.getElementById("droneCanvas");
const ctx = canvas.getContext("2d");

const drones = [
  { image: "assets/img/drones/smallDrone.png", bombs: 3 },
  { image: "assets/img/drones/heavyDrone.png", bombs: 2 },
  // ...
];

drones.forEach((drone, i) => {
  const img = new Image();
  img.src = drone.image;
  img.onload = () => {
    const x = 40 + i * 170;
    ctx.drawImage(img, x, 40, 100, 100);
    ctx.fillStyle = "white";
    ctx.fillText(`💣 ${drone.bombs}`, x + 25, 160);
    ctx.fillStyle = "#444";
    ctx.fillRect(x + 10, 170, 80, 30);
    ctx.fillStyle = "white";
    ctx.fillText("Спорядити", x + 18, 190);
  };
});
