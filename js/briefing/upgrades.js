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
const shapedClusterBombOpenCost = 7000 + gameData.upgradeGap;
const smallDroneSpeedUpgradeCost = 1000 + gameData.upgradeGap;
const mediumDroneSpeedUpgradeCost = 1000 + gameData.upgradeGap;
const bigDroneSpeedUpgradeCost = 1000 + gameData.upgradeGap;
const smallDroneCapacityUpgradeCost = 1000 + gameData.upgradeGap;
const mediumDroneCapacityUpgradeCost = 1000 + gameData.upgradeGap;
const bigDroneCapacityUpgradeCost = 1000 + gameData.upgradeGap;
const smallDroneHPUpgradeCost = 3000 + gameData.upgradeGap;
const mediumDroneHPUpgradeCost = 3000 + gameData.upgradeGap;
const bigDroneHPUpgradeCost = 3000 + gameData.upgradeGap;

//лічильники для апгрейдів
let smallDroneSpeedUpgradeCounter = 0;
let mediumDroneSpeedUpgradeCounter = 0;
let bigDroneSpeedUpgradeCounter = 0;
let smallDroneCapacityUpgradeCounter = 0;
let mediumDroneCapacityUpgradeCounter = 0;
let bigDroneCapacityUpgradeCounter = 0;
let smallDroneHPUpgradeCounter = 0;
let mediumDroneHPUpgradeCounter = 0;
let bigDroneHPUpgradeCounter = 0;

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
document.querySelectorAll(".shapedClusterBombOpenCost").forEach((el) => {
  el.textContent = shapedClusterBombOpenCost;
});
document.querySelectorAll(".smallDroneSpeedUpgradeCost").forEach((el) => {
  el.textContent = smallDroneSpeedUpgradeCost;
});
document.querySelectorAll(".mediumDroneSpeedUpgradeCost").forEach((el) => {
  el.textContent = mediumDroneSpeedUpgradeCost;
});
document.querySelectorAll(".bigDroneSpeedUpgradeCost").forEach((el) => {
  el.textContent = bigDroneSpeedUpgradeCost;
});
document.querySelectorAll(".smallDroneCapacityUpgradeCost").forEach((el) => {
  el.textContent = smallDroneCapacityUpgradeCost;
});
document.querySelectorAll(".mediumDroneCapacityUpgradeCost").forEach((el) => {
  el.textContent = mediumDroneCapacityUpgradeCost;
});
document.querySelectorAll(".bigDroneCapacityUpgradeCost").forEach((el) => {
  el.textContent = bigDroneCapacityUpgradeCost;
});
document.querySelectorAll(".smallDroneHPUpgradeCost").forEach((el) => {
  el.textContent = smallDroneHPUpgradeCost;
});
document.querySelectorAll(".mediumDroneHPUpgradeCost").forEach((el) => {
  el.textContent = mediumDroneHPUpgradeCost;
});
document.querySelectorAll(".bigDroneHPUpgradeCost").forEach((el) => {
  el.textContent = bigDroneHPUpgradeCost;
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

// Модалка відкриття протитанкової касетної бомби
document
  .getElementById("shapedClusterBomb_image")
  .addEventListener("click", () => {
    document.getElementById("shapedClusterBombOpenModal").style.visibility =
      "visible";
  });
document
  .getElementById("shapedClusterBombOpen")
  .addEventListener("click", () => {
    if (
      !gameData.shapedClusterBombAvailable &&
      gameData.score >= shapedClusterBombOpenCost
    ) {
      gameData.shapedClusterBombAvailable = true;
      upgradeRoutine(shapedClusterBombOpenCost, ".shapedClusterBombOpenCost");
    }
  });
if (gameData.shapedClusterBombAvailable)
  document.getElementById("shapedClusterBombUB").style.display = "none";
//-----------------------------------------------------------------------
// Модалка апгрейду швидкості маленького дрону
document
  .getElementById("smallDroneSpeed_image")
  .addEventListener("click", () => {
    document.getElementById("smallDroneSpeedUpgradeModal").style.visibility =
      "visible";
  });
document
  .getElementById("smallDroneSpeedUpgrade")
  .addEventListener("click", () => {
    if (
      gameData.score >= smallDroneSpeedUpgradeCost &&
      gameData.smallDroneSpeedUpgrade < 6
    ) {
      gameData.smallDroneSpeedUpgrade++;
      upgradeRoutine(smallDroneSpeedUpgradeCost, ".smallDroneSpeedUpgradeCost");
    }
  });
document.getElementById("smallDroneCurrentSpeed").textContent =
  13 + gameData.smallDroneSpeedUpgrade;
document.getElementById("smallDroneNextSpeed").textContent =
  13 + gameData.smallDroneSpeedUpgrade + 1;
document.getElementById("smallDroneSpeedUpgradeCount").textContent =
  gameData.smallDroneSpeedUpgrade;

if (gameData.smallDroneSpeedUpgrade >= 6)
  document.getElementById("smallDroneSpeedUB").style.display = "none";

// Модалка апгрейду вантажопідйомності малого дрону
document
  .getElementById("smallDroneCapacity_image")
  .addEventListener("click", () => {
    document.getElementById("smallDroneCapacityUpgradeModal").style.visibility =
      "visible";
  });
document
  .getElementById("smallDroneCapacityUpgrade")
  .addEventListener("click", () => {
    if (
      gameData.score >= smallDroneCapacityUpgradeCost &&
      gameData.smallDroneCapacityUpgrade < 10
    ) {
      gameData.smallDroneCapacityUpgrade++;
      upgradeRoutine(
        smallDroneCapacityUpgradeCost,
        ".smallDroneCapacityUpgradeCost"
      );
    }
  });
document.getElementById("smallDroneCurrentCapacity").textContent =
  800 + gameData.smallDroneCapacityUpgrade * 40;
document.getElementById("smallDroneNextCapacity").textContent =
  800 + (gameData.smallDroneCapacityUpgrade + 1) * 40;
document.getElementById("smallDroneCapacityUpgradeCount").textContent =
  gameData.smallDroneCapacityUpgrade;

if (gameData.smallDroneCapacityUpgrade >= 10)
  document.getElementById("smallDroneCapacityUB").style.display = "none";
// Модалка апгрейду міцності малого дрону
document.getElementById("smallDroneHP_image").addEventListener("click", () => {
  document.getElementById("smallDroneHPUpgradeModal").style.visibility =
    "visible";
});
document.getElementById("smallDroneHPUpgrade").addEventListener("click", () => {
  if (
    gameData.score >= smallDroneHPUpgradeCost &&
    gameData.smallDroneHPUpgrade < 3
  ) {
    gameData.smallDroneHPUpgrade++;
    upgradeRoutine(smallDroneHPUpgradeCost, ".smallDroneHPUpgradeCost");
  }
});
document.getElementById("smallDroneCurrentHP").textContent =
  3 + gameData.smallDroneHPUpgrade;
document.getElementById("smallDroneNextHP").textContent =
  3 + (gameData.smallDroneHPUpgrade + 1);
document.getElementById("smallDroneHPUpgradeCount").textContent =
  gameData.smallDroneHPUpgrade;

if (gameData.smallDroneHPUpgrade >= 10)
  document.getElementById("smallDroneHPUB").style.display = "none";
// Модалка апгрейду швидкості середнього дрону
document
  .getElementById("mediumDroneSpeed_image")
  .addEventListener("click", () => {
    document.getElementById("mediumDroneSpeedUpgradeModal").style.visibility =
      "visible";
  });
document
  .getElementById("mediumDroneSpeedUpgrade")
  .addEventListener("click", () => {
    if (
      gameData.score >= mediumDroneSpeedUpgradeCost &&
      gameData.mediumDroneSpeedUpgrade < 6
    ) {
      gameData.mediumDroneSpeedUpgrade++;
      upgradeRoutine(
        mediumDroneSpeedUpgradeCost,
        ".mediumDroneSpeedUpgradeCost"
      );
    }
  });
document.getElementById("mediumDroneCurrentSpeed").textContent =
  10 + gameData.mediumDroneSpeedUpgrade * 0.7;
document.getElementById("mediumDroneNextSpeed").textContent =
  10 + (gameData.mediumDroneSpeedUpgrade + 1) * 0.7;
document.getElementById("mediumDroneSpeedUpgradeCount").textContent =
  gameData.mediumDroneSpeedUpgrade;

if (gameData.mediumDroneSpeedUpgrade >= 6)
  document.getElementById("mediumDroneSpeedUB").style.display = "none";

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
  localStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "upgrades.html?refresh=" + Date.now();
}
