window.addEventListener("DOMContentLoaded", () => {
  // import("./index/backgroundanimation.js");
  // setupDebugConsole();
  const startButton = document.getElementById("start");
  const survivalButton = document.getElementById("survival");
  const continueGameButton = document.getElementById("continue");
  const settingsButton = document.getElementById("settings");
  const loadButton = document.getElementById("load");
  const backButton = document.getElementById("back");
  const startBackButton = document.getElementById("startBack");
  const easyButton = document.getElementById("easy");
  const mediumButton = document.getElementById("medium");
  const hardButton = document.getElementById("hard");
  const veryHardButton = document.getElementById("veryHard");
  const exitButton = document.getElementById("exit");
  const goTrainingButton = document.getElementById("goTraining");
  const avoidTrainingButton = document.getElementById("avoidTraining");
  const infoButton = document.getElementById("info");
  let startDescription = document.getElementById("startDescription");

  let difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {
    level: "medium",
    accuracy: 1,
    weight: 1,
  };
  let gametype;
  let userSettings = JSON.parse(localStorage.getItem("userSettings")) || {
    isPremium: false,
  };

  easyButton.addEventListener("click", () => {
    difficulty.accuracy = 0.3;
    difficulty.weight = 0.75;
    difficulty.level = "easy";
    localStorage.setItem("Difficulty", JSON.stringify(difficulty));
    localStorage.setItem("gametype", gametype);
    localStorage.removeItem("gameData");
    goToBriefing(true);
  });

  mediumButton.addEventListener("click", () => {
    difficulty.accuracy = 0.7;
    difficulty.weight = 0.85;
    difficulty.level = "medium";
    localStorage.setItem("Difficulty", JSON.stringify(difficulty));
    localStorage.setItem("gametype", gametype);
    localStorage.removeItem("gameData");
    goToBriefing(true);
  });

  hardButton.addEventListener("click", () => {
    difficulty.accuracy = 1;
    difficulty.weight = 1;
    difficulty.level = "hard";
    localStorage.setItem("Difficulty", JSON.stringify(difficulty));
    localStorage.setItem("gametype", gametype);
    localStorage.removeItem("gameData");
    goToBriefing(true);
  });

  veryHardButton.addEventListener("click", () => {
    difficulty.accuracy = 1.25;
    difficulty.weight = 1;
    difficulty.level = "veryHard";
    localStorage.setItem("Difficulty", JSON.stringify(difficulty));
    localStorage.setItem("gametype", gametype);
    localStorage.removeItem("gameData");
    goToBriefing(true);
  });

  continueGameButton.addEventListener("click", () => {
    goToBriefing(true, true);
  });

  settingsButton.addEventListener("click", () => {
    goToSettings(true);
  });
  infoButton.addEventListener("click", () => {
    goToInfo();
  });

  loadButton.addEventListener("click", () => {
    document.getElementById("loadModal").style.visibility = "visible";
  });

  startButton.addEventListener("click", () => {
    gametype = "missions";
    startDescription.innerHTML = t("startDescriptionM");
    document.getElementById("startModal").style.visibility = "visible";
  });

  survivalButton.addEventListener("click", () => {
    gametype = "survival";
    startDescription.innerHTML = t("startDescriptionS");
    document.getElementById("startModal").style.visibility = "visible";
  });

  backButton.addEventListener("click", () => {
    document.getElementById("loadModal").style.visibility = "hidden";
  });

  startBackButton.addEventListener("click", () => {
    document.getElementById("startModal").style.visibility = "hidden";
  });
  exitButton.addEventListener("click", () => {
    try {
      const appPlugin = window.Capacitor?.Plugins?.App;

      if (appPlugin && typeof appPlugin.exitApp === "function") {
        appPlugin.exitApp();
      } else {
        console.log("Capacitor.Plugins.App.exitApp не доступна");
      }
    } catch (e) {
      console.error("Помилка при виклику exitApp:", e);
    }
  });
  console.log(window.Capacitor?.Plugins?.App);
  // Автозбереження
  const autosavesContainer = document.getElementById("autoloadContent");
  const autoSave = JSON.parse(localStorage.getItem("autoSave")) || {
    saves: [],
  };
  if (autoSave.saves.length === 0) {
    const noSavesMessage = document.createElement("p");
    noSavesMessage.textContent = t("noSaves");
    autosavesContainer.appendChild(noSavesMessage);
  }
  autoSave.saves.forEach((save, index) => {
    const missionId = save.mission;
    const date = new Date(save.date).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const difficulty = save.difficulty?.level || "medium";

    const btn = document.createElement("button");
    btn.className = "loadButton";
    const name = save.gametype === "missions" ? t("mission") : t("wave");
    btn.textContent = `${name} ${missionId} — ${difficulty} — ${date}`;
    btn.addEventListener("click", () => {
      localStorage.setItem("gameData", JSON.stringify(save.data));
      localStorage.setItem("Difficulty", JSON.stringify(save.difficulty));
      localStorage.setItem("gametype", save.gametype);
      window.location.href = "briefing.html";
    });

    autosavesContainer.appendChild(btn);
  });

  // Ручні збереження
  const gameSave = JSON.parse(localStorage.getItem("gameSave")) || {
    saves: [],
  };
  const loadContent = document.getElementById("loadContent");
  loadContent.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    let load = gameSave.saves[i];
    const btn = document.createElement("button");
    btn.className = "loadButton";
    if (load) {
      const missionId = load.mission;
      const difficulty = load.difficulty?.level || "medium";
      const date = new Date(load.date).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      const name = load.gametype === "missions" ? t("mission") : t("wave");
      btn.textContent = `${name} ${missionId} — ${difficulty} — ${date}`;
    } else {
      btn.textContent = `${t("slot")} ${i + 1} — ${t("empty")}`;
    }

    btn.addEventListener("click", () => {
      if (load) {
        localStorage.setItem("gameData", JSON.stringify(load.data));
        localStorage.setItem("Difficulty", JSON.stringify(load.difficulty));
        localStorage.setItem("gametype", load.gametype);
        window.location.href = "briefing.html";
      }
    });

    loadContent.appendChild(btn);
  }

  // Перемикання вкладок "авто" і "гравець"
  document.getElementById("gameSave").addEventListener("click", () => {
    document.getElementById("autoText").style.display = "none";
    document.getElementById("gameText").style.display = "block";
    document.getElementById("autoloadContent").style.display = "none";
    document.getElementById("loadContent").style.display = "block";
  });

  document.getElementById("autoSave").addEventListener("click", () => {
    document.getElementById("gameText").style.display = "none";
    document.getElementById("autoText").style.display = "block";
    document.getElementById("loadContent").style.display = "none";
    document.getElementById("autoloadContent").style.display = "block";
  });

  function goToBriefing(withMusic, continueGame = false) {
    if (withMusic) {
      localStorage.setItem("playBriefingMusic", "true");
    }
    if (autoSave.saves.length === 0 || continueGame) {
      window.location.href = "briefing.html";
    } else {
      document.getElementById("startModal").style.visibility = "hidden";
      document.getElementById("trainingModal").style.visibility = "visible";
    }
  }

  goTrainingButton.addEventListener("click", () => {
    localStorage.setItem("avoidTraining", "false");
    window.location.href = "briefing.html";
  });

  avoidTrainingButton.addEventListener("click", () => {
    localStorage.setItem("avoidTraining", "true");
    window.location.href = "briefing.html";
  });

  function goToSettings(withMusic) {
    if (withMusic) {
      localStorage.setItem("playSettingsMusic", "true");
    }
    window.location.href = "settings.html";
  }

  function goToInfo() {
    window.location.href = "info.html";
  }

  const buyButton = document.getElementById("buyPremium");
  const premiumModal = document.getElementById("premiumModal");
  const cancelButton = document.getElementById("cancelPremium");
  const confirmButton = document.getElementById("confirmPremium");

  buyButton.addEventListener("click", () => {
    premiumModal.style.visibility = "visible";
  });

  cancelButton.addEventListener("click", () => {
    premiumModal.style.visibility = "hidden";
  });

  confirmButton.addEventListener("click", () => {
    // Тут можна додати виклик Google Play Billing API
    alert("Преміум придбано ");
    userSettings.isPremium = true;
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
    premiumModal.style.visibility = "hidden";
  });
});
