const gameData = JSON.parse(localStorage.getItem("gameData"));

document.querySelectorAll(".score").forEach((el) => {
  el.textContent = gameData.score;
});
console.log(gameData);

const middleDroneOpenCost = 5000 + gameData.upgradeGap;
const bigDroneOpenCost = 8000 + gameData.upgradeGap;
document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
  el.textContent = middleDroneOpenCost;
});
document.getElementById("bigDroneOpenCost").textContent = bigDroneOpenCost;
document.getElementById("medium_drone_image").addEventListener("click", () => {
  document.getElementById("middleDroneOpenModal").style.visibility = "visible";
});
if (gameData.mediumDroneAvailable)
  document.getElementById("mediumDroneUB").style.display = "none";

document.getElementById("middleDroneOpen").addEventListener("click", () => {
  if (!gameData.mediumDroneAvailable && gameData.score >= middleDroneOpenCost) {
    gameData.mediumDroneAvailable = true;
    gameData.score -= middleDroneOpenCost;
    gameData.upgradeGap += gameData.gapScale;
    document.querySelectorAll(".score").forEach((el) => {
      el.textContent = gameData.score;
    });
    document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
      el.textContent = "Досліджено";
    });
    localStorage.setItem("gameData", JSON.stringify(gameData));
    console.log("Збережено", gameData);
  }
});

document.querySelectorAll(".back-button").forEach((el) => {
  el.addEventListener("click", () => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
    console.log("Збережено", gameData);
    window.location.href = "upgrades.html?refresh=" + Date.now();
  });
});
document.getElementById("back-button").addEventListener("click", () => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "briefing.html";
});
