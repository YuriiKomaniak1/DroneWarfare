document.addEventListener("DOMContentLoaded", () => {
  window.onerror = function (message, source, lineno, colno, error) {
    alert(
      "❌ JS помилка: " + message + "\n" + source + ":" + lineno + ":" + colno
    );
  };
  const rawGameData = localStorage.getItem("gameData");
  if (!rawGameData) {
    throw new Error("❌ gameData не знайдено в localStorage");
  }

  const gameData = JSON.parse(rawGameData);
  const shouldPlayMusic = localStorage.getItem("playUpgradeMusic") === "true";
  const volumeSettings = JSON.parse(localStorage.getItem("Volume"));

  // const rawData = localStorage.getItem("gameData");

  // console.log("📦 raw gameData:", rawData);

  // document.body.insertAdjacentHTML(
  //   "beforeend",
  //   `<div style="position:fixed;top:0;left:0;z-index:99999;color:#fff;background:#000;padding:10px;max-width:100vw;word-break:break-word;">
  //      gameData:<br>${rawData}
  //    </div>`
  // );

  // програвання музики
  document.querySelectorAll(".score").forEach((el) => {
    el.textContent = gameData.score;
  });
  if (shouldPlayMusic && volumeSettings) {
    const music = new Audio("./assets/audio/music/upgrade-music.mp3");
    music.loop = true;
    music.volume = volumeSettings.musicVolume * 0.3;

    // Спроба відтворити
    music.play().catch((e) => {
      console.warn("Автовідтворення музики заблоковано:", e);
    });
    localStorage.removeItem("playBriefingMusic");
  }

  // присвоєння цін
  const mediumDroneOpenCost = 8000;
  const bigDroneOpenCost = 10000;
  const slot4OpenCost = 5000;
  const slot5OpenCost = 10000;
  const footMineOpenCost = 1000;
  const tankMineOpenCost = 3000;
  const magnetMineOpenCost = 5000;
  const shrapnelBombOpenCost = 3000;
  const clusterBombOpenCost = 10000;
  const shapedClusterBombOpenCost = 20000;
  const smallDroneSpeedUpgradeCost =
    1000 + gameData.smallDroneSpeedUpgradeGap * gameData.smallDroneSpeedUpgrade;
  const mediumDroneSpeedUpgradeCost =
    1000 +
    gameData.mediumDroneSpeedUpgradeGap * gameData.mediumDroneSpeedUpgrade;
  const bigDroneSpeedUpgradeCost =
    1000 + gameData.bigDroneSpeedUpgradeGap * gameData.bigDroneSpeedUpgrade;
  const smallDroneCapacityUpgradeCost =
    1000 +
    gameData.smallDroneCapacityUpgradeGap * gameData.smallDroneCapacityUpgrade;
  const mediumDroneCapacityUpgradeCost =
    1000 +
    gameData.mediumDroneCapacityUpgradeGap *
      gameData.mediumDroneCapacityUpgrade;
  const bigDroneCapacityUpgradeCost =
    1000 +
    gameData.bigDroneCapacityUpgradeGap * gameData.bigDroneCapacityUpgrade;
  const smallDroneHPUpgradeCost =
    3000 + gameData.smallDroneHPUpgradeGap * gameData.smallDroneHPUpgrade;
  const mediumDroneHPUpgradeCost =
    3000 + gameData.mediumDroneHPUpgradeGap * gameData.mediumDroneHPUpgrade;
  const bigDroneHPUpgradeCost =
    3000 + gameData.bigDroneHPUpgradeGap * gameData.bigDroneHPUpgrade;
  const fragBombUpgradeCost =
    1000 + gameData.fragBombUpgradeGap * gameData.fragBombUpgrade;
  const heBombUpgradeCost =
    1000 + gameData.heBombUpgradeGap * gameData.heBombUpgrade;
  const shapedBombUpgradeCost =
    1000 + gameData.shapedBombUpgradeGap * gameData.shapedBombUpgrade;
  const tankMineUpgradeCost = 1000;
  const magnetMineUpgradeCost =
    2000 + gameData.magnetMineUpgradeGap * gameData.magnetMineUpgrade;
  const shrapnelBombUpgradeCost =
    1000 + gameData.shrapnelBombUpgradeGap * gameData.shrapnelBombUpgrade;
  const clusterBombUpgradeCost =
    1000 + gameData.clusterBombUpgradeGap * gameData.clusterBombUpgrade;
  const shapedClusterBombUpgradeCost =
    1000 +
    gameData.shapedClusterBombUpgradeGap * gameData.shapedClusterBombUpgrade;

  // присвоєння цін в HTML
  document.querySelectorAll(".middleDroneOpenCost").forEach((el) => {
    el.textContent = mediumDroneOpenCost;
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
  document.querySelectorAll(".fragBombUpgradeCost").forEach((el) => {
    el.textContent = fragBombUpgradeCost;
  });
  document.querySelectorAll(".heBombUpgradeCost").forEach((el) => {
    el.textContent = heBombUpgradeCost;
  });
  document.querySelectorAll(".shapedBombUpgradeCost").forEach((el) => {
    el.textContent = shapedBombUpgradeCost;
  });
  document.querySelectorAll(".tankMineUpgradeCost").forEach((el) => {
    el.textContent = tankMineUpgradeCost;
  });
  document.querySelectorAll(".magnetMineUpgradeCost").forEach((el) => {
    el.textContent = magnetMineUpgradeCost;
  });
  document.querySelectorAll(".shrapnelBombUpgradeCost").forEach((el) => {
    el.textContent = shrapnelBombUpgradeCost;
  });
  document.querySelectorAll(".clusterBombUpgradeCost").forEach((el) => {
    el.textContent = clusterBombUpgradeCost;
  });
  document.querySelectorAll(".shapedClusterBombUpgradeCost").forEach((el) => {
    el.textContent = shapedClusterBombUpgradeCost;
  });

  // Модалка відкриття середнього дрону
  document
    .getElementById("medium_drone_image")
    .addEventListener("click", () => {
      document.getElementById("middleDroneOpenModal").style.visibility =
        "visible";
    });
  document.getElementById("middleDroneOpen").addEventListener("click", () => {
    if (
      !gameData.mediumDroneAvailable &&
      gameData.score >= mediumDroneOpenCost
    ) {
      gameData.mediumDroneAvailable = true;
      upgradeRoutine(mediumDroneOpenCost, ".middleDroneOpenCost");
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
  document
    .getElementById("shrapnelBomb_image")
    .addEventListener("click", () => {
      document.getElementById("shrapnelBombOpenModal").style.visibility =
        "visible";
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
    document.getElementById("clusterBombOpenModal").style.visibility =
      "visible";
  });
  document.getElementById("clusterBombOpen").addEventListener("click", () => {
    if (
      !gameData.clusterBombAvailable &&
      gameData.score >= clusterBombOpenCost
    ) {
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
        upgradeRoutine(
          smallDroneSpeedUpgradeCost,
          ".smallDroneSpeedUpgradeCost"
        );
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
      document.getElementById(
        "smallDroneCapacityUpgradeModal"
      ).style.visibility = "visible";
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
    900 + gameData.smallDroneCapacityUpgrade * 60;
  document.getElementById("smallDroneNextCapacity").textContent =
    900 + (gameData.smallDroneCapacityUpgrade + 1) * 60;
  document.getElementById("smallDroneCapacityUpgradeCount").textContent =
    gameData.smallDroneCapacityUpgrade;

  if (gameData.smallDroneCapacityUpgrade >= 10)
    document.getElementById("smallDroneCapacityUB").style.display = "none";
  // Модалка апгрейду міцності малого дрону
  document
    .getElementById("smallDroneHP_image")
    .addEventListener("click", () => {
      document.getElementById("smallDroneHPUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("smallDroneHPUpgrade")
    .addEventListener("click", () => {
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

  if (gameData.smallDroneHPUpgrade >= 3)
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

  if (gameData.mediumDroneSpeedUpgrade >= 6 || !gameData.mediumDroneAvailable)
    document.getElementById("mediumDroneSpeedUB").style.display = "none";

  // Модалка апгрейду вантажопідйомності середнього дрону
  document
    .getElementById("mediumDroneCapacity_image")
    .addEventListener("click", () => {
      document.getElementById(
        "mediumDroneCapacityUpgradeModal"
      ).style.visibility = "visible";
    });
  document
    .getElementById("mediumDroneCapacityUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= mediumDroneCapacityUpgradeCost &&
        gameData.mediumDroneCapacityUpgrade < 10
      ) {
        gameData.mediumDroneCapacityUpgrade++;
        upgradeRoutine(
          mediumDroneCapacityUpgradeCost,
          ".mediumDroneCapacityUpgradeCost"
        );
      }
    });
  document.getElementById("mediumDroneCurrentCapacity").textContent =
    1600 + gameData.mediumDroneCapacityUpgrade * 100;
  document.getElementById("mediumDroneNextCapacity").textContent =
    1600 + (gameData.mediumDroneCapacityUpgrade + 1) * 100;
  document.getElementById("mediumDroneCapacityUpgradeCount").textContent =
    gameData.mediumDroneCapacityUpgrade;

  if (
    gameData.mediumDroneCapacityUpgrade >= 10 ||
    !gameData.mediumDroneAvailable
  )
    document.getElementById("mediumDroneCapacityUB").style.display = "none";

  // Модалка апгрейду міцності середнього дрону
  document
    .getElementById("mediumDroneHP_image")
    .addEventListener("click", () => {
      document.getElementById("mediumDroneHPUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("mediumDroneHPUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= mediumDroneHPUpgradeCost &&
        gameData.mediumDroneHPUpgrade < 4
      ) {
        gameData.mediumDroneHPUpgrade++;
        upgradeRoutine(mediumDroneHPUpgradeCost, ".mediumDroneHPUpgradeCost");
      }
    });
  document.getElementById("mediumDroneCurrentHP").textContent =
    5 + gameData.mediumDroneHPUpgrade;
  document.getElementById("mediumDroneNextHP").textContent =
    5 + (gameData.mediumDroneHPUpgrade + 1);
  document.getElementById("mediumDroneHPUpgradeCount").textContent =
    gameData.mediumDroneHPUpgrade;

  if (gameData.mediumDroneHPUpgrade >= 4 || !gameData.mediumDroneAvailable)
    document.getElementById("mediumDroneHPUB").style.display = "none";

  // Модалка апгрейду швидкості великого дрону
  document
    .getElementById("bigDroneSpeed_image")
    .addEventListener("click", () => {
      document.getElementById("bigDroneSpeedUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("bigDroneSpeedUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= bigDroneSpeedUpgradeCost &&
        gameData.bigDroneSpeedUpgrade < 6
      ) {
        gameData.bigDroneSpeedUpgrade++;
        upgradeRoutine(bigDroneSpeedUpgradeCost, ".bigDroneSpeedUpgradeCost");
      }
    });
  document.getElementById("bigDroneCurrentSpeed").textContent =
    8 + gameData.bigDroneSpeedUpgrade * 0.4;
  document.getElementById("bigDroneNextSpeed").textContent =
    8 + (gameData.bigDroneSpeedUpgrade + 1) * 0.4;
  document.getElementById("bigDroneSpeedUpgradeCount").textContent =
    gameData.bigDroneSpeedUpgrade;

  if (gameData.bigDroneSpeedUpgrade >= 6 || !gameData.bigDroneAvailable)
    document.getElementById("bigDroneSpeedUB").style.display = "none";

  // Модалка апгрейду вантажопідйомності великого дрону
  document
    .getElementById("bigDroneCapacity_image")
    .addEventListener("click", () => {
      document.getElementById("bigDroneCapacityUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("bigDroneCapacityUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= bigDroneCapacityUpgradeCost &&
        gameData.bigDroneCapacityUpgrade < 10
      ) {
        gameData.bigDroneCapacityUpgrade++;
        upgradeRoutine(
          bigDroneCapacityUpgradeCost,
          ".bigDroneCapacityUpgradeCost"
        );
      }
    });
  document.getElementById("bigDroneCurrentCapacity").textContent =
    6400 + gameData.bigDroneCapacityUpgrade * 250;
  document.getElementById("bigDroneNextCapacity").textContent =
    6400 + (gameData.bigDroneCapacityUpgrade + 1) * 250;
  document.getElementById("bigDroneCapacityUpgradeCount").textContent =
    gameData.bigDroneCapacityUpgrade;

  if (gameData.bigDroneCapacityUpgrade >= 10 || !gameData.bigDroneAvailable)
    document.getElementById("bigDroneCapacityUB").style.display = "none";

  // Модалка апгрейду міцності великого дрону
  document.getElementById("bigDroneHP_image").addEventListener("click", () => {
    document.getElementById("bigDroneHPUpgradeModal").style.visibility =
      "visible";
  });
  document.getElementById("bigDroneHPUpgrade").addEventListener("click", () => {
    if (
      gameData.score >= bigDroneHPUpgradeCost &&
      gameData.bigDroneHPUpgrade < 5
    ) {
      gameData.bigDroneHPUpgrade++;
      upgradeRoutine(bigDroneHPUpgradeCost, ".bigDroneHPUpgradeCost");
    }
  });
  document.getElementById("bigDroneCurrentHP").textContent =
    9 + gameData.bigDroneHPUpgrade;
  document.getElementById("bigDroneNextHP").textContent =
    9 + (gameData.bigDroneHPUpgrade + 1);
  document.getElementById("bigDroneHPUpgradeCount").textContent =
    gameData.bigDroneHPUpgrade;

  if (gameData.bigDroneHPUpgrade >= 5 || !gameData.bigDroneAvailable)
    document.getElementById("bigDroneHPUB").style.display = "none";

  // Модалка апгрейду осколкової бомби
  document
    .getElementById("fragBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("fragBombUpgradeModal").style.visibility =
        "visible";
    });
  document.getElementById("fragBombUpgrade").addEventListener("click", () => {
    if (
      gameData.score >= fragBombUpgradeCost &&
      gameData.fragBombUpgrade < 10
    ) {
      gameData.fragBombUpgrade++;
      upgradeRoutine(fragBombUpgradeCost, ".fragBombUpgradeCost");
    }
  });
  document.getElementById("fragBombCurrentRadius").textContent = (
    7 +
    gameData.fragBombUpgrade * 0.3
  ).toFixed(1);
  document.getElementById("fragBombNextRadius").textContent = (
    7 +
    (gameData.fragBombUpgrade + 1) * 0.3
  ).toFixed(1);
  document.getElementById("fragBombUpgradeCount").textContent =
    gameData.fragBombUpgrade;

  if (gameData.fragBombUpgrade >= 10)
    document.getElementById("fragBombUpgradeUB").style.display = "none";

  // Модалка апгрейду фугасної бомби
  document
    .getElementById("heBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("heBombUpgradeModal").style.visibility =
        "visible";
    });
  document.getElementById("heBombUpgrade").addEventListener("click", () => {
    if (gameData.score >= heBombUpgradeCost && gameData.heBombUpgrade < 10) {
      gameData.heBombUpgrade++;
      upgradeRoutine(heBombUpgradeCost, ".heBombUpgradeCost");
    }
  });
  document.getElementById("heBombCurrentRadius").textContent = (
    2.5 +
    gameData.heBombUpgrade * 0.1
  ).toFixed(1);
  document.getElementById("heBombNextRadius").textContent = (
    2.5 +
    (gameData.heBombUpgrade + 1) * 0.1
  ).toFixed(1);
  document.getElementById("heBombUpgradeCount").textContent =
    gameData.heBombUpgrade;

  if (gameData.heBombUpgrade >= 10)
    document.getElementById("heBombUpgradeUB").style.display = "none";

  // Модалка апгрейду кумулятивної бомби
  document
    .getElementById("shapedBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("shapedBombUpgradeModal").style.visibility =
        "visible";
    });
  document.getElementById("shapedBombUpgrade").addEventListener("click", () => {
    if (
      gameData.score >= shapedBombUpgradeCost &&
      gameData.shapedBombUpgrade < 10
    ) {
      gameData.shapedBombUpgrade++;
      upgradeRoutine(shapedBombUpgradeCost, ".shapedBombUpgradeCost");
    }
  });
  document.getElementById("shapedBombCurrentState").textContent = (
    0.9 +
    gameData.shapedBombUpgrade * 0.01
  ).toFixed(2);
  document.getElementById("shapedBombNextState").textContent = (
    0.9 +
    (gameData.shapedBombUpgrade + 1) * 0.01
  ).toFixed(2);
  document.getElementById("shapedBombUpgradeCount").textContent =
    gameData.shapedBombUpgrade;

  if (gameData.shapedBombUpgrade >= 9)
    document.getElementById("shapedBombUpgradeUB").style.display = "none";

  // Модалка апгрейду мігнітної міни
  document
    .getElementById("magnetMineUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("magnetMineUpgradeModal").style.visibility =
        "visible";
    });
  document.getElementById("magnetMineUpgrade").addEventListener("click", () => {
    if (
      gameData.score >= magnetMineUpgradeCost &&
      gameData.magnetMineUpgrade < 4
    ) {
      gameData.magnetMineUpgrade++;
      upgradeRoutine(magnetMineUpgradeCost, ".magnetMineUpgradeCost");
    }
  });
  document.getElementById("magnetMineCurrentState").textContent = (
    0.95 +
    gameData.magnetMineUpgrade * 0.01
  ).toFixed(2);
  document.getElementById("magnetMineNextState").textContent = (
    0.95 +
    (gameData.magnetMineUpgrade + 1) * 0.01
  ).toFixed(2);
  document.getElementById("magnetMineUpgradeCount").textContent =
    gameData.magnetMineUpgrade;

  if (gameData.magnetMineUpgrade >= 4 || !gameData.magnetMineAvailable)
    document.getElementById("magnetMineUpgradeUB").style.display = "none";

  // Модалка апгрейду шрапнельної бомби
  document
    .getElementById("shrapnelBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("shrapnelBombUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("shrapnelBombUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= shrapnelBombUpgradeCost &&
        gameData.shrapnelBombUpgrade < 10
      ) {
        gameData.shrapnelBombUpgrade++;
        upgradeRoutine(shrapnelBombUpgradeCost, ".shrapnelBombUpgradeCost");
      }
    });
  document.getElementById("shrapnelBombCurrentRadius").textContent = (
    7 +
    gameData.shrapnelBombUpgrade * 0.3
  ).toFixed(1);
  document.getElementById("shrapnelBombNextRadius").textContent = (
    7 +
    (gameData.shrapnelBombUpgrade + 1) * 0.3
  ).toFixed(1);

  document.getElementById("shrapnelBombUpgradeCount").textContent =
    gameData.shrapnelBombUpgrade;

  if (gameData.shrapnelBombUpgrade >= 10 || !gameData.shrapnelBombAvailable)
    document.getElementById("shrapnelBombUpgradeUB").style.display = "none";

  // Модалка апгрейду касетної бомби
  document
    .getElementById("clusterBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById("clusterBombUpgradeModal").style.visibility =
        "visible";
    });
  document
    .getElementById("clusterBombUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= clusterBombUpgradeCost &&
        gameData.clusterBombUpgrade < 10
      ) {
        gameData.clusterBombUpgrade++;
        upgradeRoutine(clusterBombUpgradeCost, ".clusterBombUpgradeCost");
      }
    });
  document.getElementById("clusterBombCurrentState").textContent =
    26 + gameData.clusterBombUpgrade;
  document.getElementById("clusterBombNextState").textContent =
    26 + (gameData.clusterBombUpgrade + 1);
  document.getElementById("clusterBombUpgradeCount").textContent =
    gameData.clusterBombUpgrade;

  if (gameData.clusterBombUpgrade >= 10 || !gameData.clusterBombAvailable)
    document.getElementById("clusterBombUpgradeUB").style.display = "none";

  // Модалка апгрейду ПТ касетної бомби
  document
    .getElementById("shapedClusterBombUpgrade_image")
    .addEventListener("click", () => {
      document.getElementById(
        "shapedClusterBombUpgradeModal"
      ).style.visibility = "visible";
    });
  document
    .getElementById("shapedClusterBombUpgrade")
    .addEventListener("click", () => {
      if (
        gameData.score >= shapedClusterBombUpgradeCost &&
        gameData.shapedClusterBombUpgrade < 10
      ) {
        gameData.shapedClusterBombUpgrade++;
        upgradeRoutine(
          shapedClusterBombUpgradeCost,
          ".shapedClusterBombUpgradeCost"
        );
      }
    });
  document.getElementById("shapedClusterBombCurrentState").textContent =
    26 + gameData.shapedClusterBombUpgrade;
  document.getElementById("shapedClusterBombNextState").textContent =
    26 + (gameData.shapedClusterBombUpgrade + 1);
  document.getElementById("shapedClusterBombCurrentAPState").textContent = (
    0.86 +
    gameData.shapedClusterBombUpgrade * 0.01
  ).toFixed(2);
  document.getElementById("shapedClusterBombNextAPState").textContent = (
    0.86 +
    (gameData.shapedClusterBombUpgrade + 1) * 0.01
  ).toFixed(2);
  document.getElementById("shapedClusterBombUpgradeCount").textContent =
    gameData.shapedClusterBombUpgrade;

  if (
    gameData.shapedClusterBombUpgrade >= 10 ||
    !gameData.shapedClusterBombAvailable
  )
    document.getElementById("shapedClusterBombUpgradeUB").style.display =
      "none";

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
    localStorage.setItem("playBriefingMusic", "true");
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
});
