const gameData = JSON.parse(localStorage.getItem("gameData"));

document.querySelectorAll(".score").forEach((el) => {
  el.textContent = gameData.score;
});

// присвоєння цін
const middleDroneOpenCost = 5000 + gameData.upgradeGap;
const bigDroneOpenCost = 8000 + gameData.upgradeGap;
const slot4OpenCost = 5000 + gameData.upgradeGap;
const slot5OpenCost = 9000 + gameData.upgradeGap;
const footMineOpenCost = 1000 + gameData.upgradeGap;
const tankMineOpenCost = 3000 + gameData.upgradeGap;
const magnetMineOpenCost = 5000 + gameData.upgradeGap;
const shrapnelBombOpenCost = 3000 + gameData.upgradeGap;
const clusterBombOpenCost = 5000 + gameData.upgradeGap;

// присвоєння цін в HTML
document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
  el.textContent = middleDroneOpenCost;
});
document.querySelectorAll(".bigDroneOpenCost").forEach((el) => {
  el.textContent = bigDroneOpenCost;
});
document.querySelectorAll(".slot4OpenCost").forEach((el) => {
  el.textContent = slot4OpenCost;
});
document.querySelectorAll(".slot5OpenCost").forEach((el) => {
  el.textContent = slot5OpenCost;
});
document.querySelectorAll(".footMineOpenCost").forEach((el) => {
  el.textContent = footMineOpenCost;
});
document.querySelectorAll(".tankMineOpenCost").forEach((el) => {
  el.textContent = tankMineOpenCost;
});
document.querySelectorAll(".magnetMineOpenCost").forEach((el) => {
  el.textContent = magnetMineOpenCost;
});
document.querySelectorAll(".shrapnelBombOpenCost").forEach((el) => {
  el.textContent = shrapnelBombOpenCost;
});
document.querySelectorAll(".clusterBombOpenCost").forEach((el) => {
  el.textContent = clusterBombOpenCost;
});
// Модалка відкриття середнього дрону
document.getElementById("medium_drone_image").addEventListener("click", () => {
  document.getElementById("middleDroneOpenModal").style.visibility = "visible";
});
document.getElementById("middleDroneOpen").addEventListener("click", () => {
  if (!gameData.mediumDroneAvailable && gameData.score >= middleDroneOpenCost) {
    gameData.mediumDroneAvailable = true;
    upgradeRoutine(middleDroneOpenCost, ".middleDroneOpenCost");
  }
});
if (gameData.mediumDroneAvailable)
  document.getElementById("mediumDroneUB").style.display = "none";
// Модалка відкриття великого дрону
document.getElementById("big_drone_image").addEventListener("click", () => {
  document.getElementById("bigDroneOpenModal").style.visibility = "visible";
});
document.getElementById("bigDroneOpen").addEventListener("click", () => {
  if (!gameData.bigDroneAvailable && gameData.score >= bigDroneOpenCost) {
    gameData.bigDroneAvailable = true;
    upgradeRoutine(bigDroneOpenCost, ".bigDroneOpenCost");
  }
});
if (gameData.bigDroneAvailable)
  document.getElementById("bigDroneUB").style.display = "none";
// Модалка відкриття 4 слоту
document.getElementById("slot4_image").addEventListener("click", () => {
  document.getElementById("slot4OpenModal").style.visibility = "visible";
});
document.getElementById("slot4Open").addEventListener("click", () => {
  if (!gameData.slot4Available && gameData.score >= slot4OpenCost) {
    gameData.slot4Available = true;
    gameData.drones[3] = structuredClone(gameData.drones[0]);
    upgradeRoutine(slot4OpenCost, ".slot4OpenCost");
  }
});
if (gameData.slot4Available)
  document.getElementById("slot4UB").style.display = "none";
console.log(gameData);
// Модалка відкриття 5 слоту
document.getElementById("slot5_image").addEventListener("click", () => {
  document.getElementById("slot5OpenModal").style.visibility = "visible";
});
document.getElementById("slot5Open").addEventListener("click", () => {
  if (!gameData.slot5Available && gameData.score >= slot5OpenCost) {
    gameData.slot5Available = true;
    gameData.drones[4] = structuredClone(gameData.drones[0]);
    upgradeRoutine(slot5OpenCost, ".slot5OpenCost");
  }
});
if (gameData.slot5Available || !gameData.slot4Available)
  document.getElementById("slot5UB").style.display = "none";

// Модалка відкриття протипіхотної міни
document.getElementById("footMine_image").addEventListener("click", () => {
  document.getElementById("footMineOpenModal").style.visibility = "visible";
});
document.getElementById("footMineOpen").addEventListener("click", () => {
  if (!gameData.footMineAvailable && gameData.score >= footMineOpenCost) {
    gameData.footMineAvailable = true;
    upgradeRoutine(footMineOpenCost, ".footMineOpenCost");
  }
});
if (gameData.footMineAvailable)
  document.getElementById("footMineUB").style.display = "none";
// Модалка відкриття фугасної міни
document.getElementById("tankMine_image").addEventListener("click", () => {
  document.getElementById("tankMineOpenModal").style.visibility = "visible";
});
document.getElementById("tankMineOpen").addEventListener("click", () => {
  if (!gameData.tankMineAvailable && gameData.score >= tankMineOpenCost) {
    gameData.tankMineAvailable = true;
    upgradeRoutine(tankMineOpenCost, ".tankMineOpenCost");
  }
});
if (gameData.tankMineAvailable)
  document.getElementById("tankMineUB").style.display = "none";

// Модалка відкриття магнітної міни
document.getElementById("magnetMine_image").addEventListener("click", () => {
  document.getElementById("magnetMineOpenModal").style.visibility = "visible";
});
document.getElementById("magnetMineOpen").addEventListener("click", () => {
  if (!gameData.magnetMineAvailable && gameData.score >= magnetMineOpenCost) {
    gameData.magnetMineAvailable = true;
    upgradeRoutine(magnetMineOpenCost, ".magnetMineOpenCost");
  }
});
if (gameData.magnetMineAvailable)
  document.getElementById("magnetMineUB").style.display = "none";
// Модалка відкриття шрапнельної бомби
document.getElementById("shrapnelBomb_image").addEventListener("click", () => {
  document.getElementById("shrapnelBombOpenModal").style.visibility = "visible";
});
document.getElementById("shrapnelBombOpen").addEventListener("click", () => {
  if (
    !gameData.shrapnelBombAvailable &&
    gameData.score >= shrapnelBombOpenCost
  ) {
    gameData.shrapnelBombAvailable = true;
    upgradeRoutine(shrapnelBombOpenCost, ".shrapnelBombOpenCost");
  }
});
if (gameData.shrapnelBombAvailable)
  document.getElementById("shrapnelBombUB").style.display = "none";
// Модалка відкриття касетної бомби
document.getElementById("clusterBomb_image").addEventListener("click", () => {
  document.getElementById("clusterBombOpenModal").style.visibility = "visible";
});
document.getElementById("clusterBombOpen").addEventListener("click", () => {
  if (!gameData.clusterBombAvailable && gameData.score >= clusterBombOpenCost) {
    gameData.clusterBombAvailable = true;
    upgradeRoutine(clusterBombOpenCost, ".clusterBombOpenCost");
  }
});
if (gameData.clusterBombAvailable)
  document.getElementById("clusterBombUB").style.display = "none";

// вихід з модалки
document.querySelectorAll(".back-button").forEach((el) => {
  el.addEventListener("click", () => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
    window.location.href = "upgrades.html?refresh=" + Date.now();
  });
});
// вихід з прокачок
document.getElementById("back-button").addEventListener("click", () => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "briefing.html";
});
function upgradeRoutine(cost, name) {
  gameData.score -= cost;
  gameData.upgradeGap += gameData.gapScale;
  document.querySelectorAll(".score").forEach((el) => {
    el.textContent = gameData.score;
  });
  document.querySelectorAll(name).forEach((el) => {
    el.textContent = "Досліджено";
  });
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
