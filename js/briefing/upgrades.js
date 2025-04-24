const gameData = JSON.parse(localStorage.getItem("gameData"));

document.querySelectorAll(".score").forEach((el) => {
  el.textContent = gameData.score;
});

// присвоєння цін
const middleDroneOpenCost = 5000 + gameData.upgradeGap;
const bigDroneOpenCost = 8000 + gameData.upgradeGap;
// присвоєння цін в HTML
document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
  el.textContent = middleDroneOpenCost;
});
document.querySelectorAll(".bigDroneOpenCost").forEach((el) => {
  el.textContent = bigDroneOpenCost;
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
