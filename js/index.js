import "./index/backgroundanimation.js";
const startButton = document.getElementById("start");
const continueGameButton = document.getElementById("continue");
const trainingButton = document.getElementById("training");
const settingsButton = document.getElementById("settings");
const loadButton = document.getElementById("load");
const backButton = document.getElementById("back");
const startBackButton = document.getElementById("startBack");
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const veryHardButton = document.getElementById("veryHard");

const difficulty = {};
easyButton.addEventListener("click", () => {
  difficulty.accuracy = 0.5;
  difficulty.weight = 0.75;
  difficulty.level = "easy";
  localStorage.setItem("Difficulty", JSON.stringify(difficulty));
  localStorage.removeItem("gameData");
  goToBriefing(true);
});
mediumButton.addEventListener("click", () => {
  difficulty.accuracy = 0.75;
  difficulty.weight = 0.85;
  difficulty.level = "medium";
  localStorage.setItem("Difficulty", JSON.stringify(difficulty));
  localStorage.removeItem("gameData");
  goToBriefing(true);
});
hardButton.addEventListener("click", () => {
  difficulty.accuracy = 1;
  difficulty.weight = 1;
  difficulty.level = "hard";
  localStorage.setItem("Difficulty", JSON.stringify(difficulty));
  localStorage.removeItem("gameData");
  goToBriefing(true);
});
veryHardButton.addEventListener("click", () => {
  difficulty.accuracy = 1.25;
  difficulty.weight = 1;
  difficulty.level = "veryHard";
  localStorage.setItem("Difficulty", JSON.stringify(difficulty));
  localStorage.removeItem("gameData");
  goToBriefing(true);
});

continueGameButton.addEventListener("click", () => {
  goToBriefing(true);
});

trainingButton.addEventListener("click", () => {
  goToTraining(true);
});

settingsButton.addEventListener("click", () => {
  goToSettings(true);
});

loadButton.addEventListener("click", () => {
  document.getElementById("loadModal").style.visibility = "visible";
});
startButton.addEventListener("click", () => {
  document.getElementById("startModal").style.visibility = "visible";
});
backButton.addEventListener("click", () => {
  document.getElementById("loadModal").style.visibility = "hidden";
});
startBackButton.addEventListener("click", () => {
  document.getElementById("startModal").style.visibility = "hidden";
});

function goToBriefing(withMusic) {
  if (withMusic) {
    localStorage.setItem("playBriefingMusic", "true");
  }
  window.location.href = "briefing.html";
}

function goToTraining(withMusic) {
  if (withMusic) {
    localStorage.setItem("playDroneMusic", "true");
  }
  window.location.href = "training.html";
}

function goToSettings(withMusic) {
  if (withMusic) {
    localStorage.setItem("playSettingsMusic", "true");
  }
  window.location.href = "settings.html";
}

// Побудова збереженнь в автозбереженнях
const autosavesContainer = document.getElementById("autoloadContent");
const autoSave = JSON.parse(localStorage.getItem("autoSave")) || { saves: [] };
if (autoSave.saves.length === 0) {
  const noSavesMessage = document.createElement("p");
  noSavesMessage.textContent = "Немає збережень";
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
  btn.textContent = `Місія ${missionId}—${difficulty}—${date}`;
  btn.addEventListener("click", () => {
    localStorage.setItem("gameData", JSON.stringify(save.data));
    localStorage.setItem("Difficulty", JSON.stringify(save.difficulty));
    window.location.href = "briefing.html";
  });

  autosavesContainer.appendChild(btn);
});

// Побудова збереженнь в збереженнях
const gameSave = JSON.parse(localStorage.getItem("gameSave")) || {
  saves: [],
};

const loadContent = document.getElementById("loadContent");
loadContent.innerHTML = ""; // 🧹 очищення перед додаванням нових кнопок
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

    btn.textContent = `Місія ${missionId} — ${difficulty} — ${date}`;

    loadContent.appendChild(btn);
  } else {
    btn.textContent = `Слот ${i + 1} — порожній`;
    loadContent.appendChild(btn);
  }
  btn.addEventListener("click", () => {
    localStorage.setItem("gameData", JSON.stringify(load.data));
    localStorage.setItem("Difficulty", JSON.stringify(load.difficulty));
    window.location.href = "briefing.html";
  });
}

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
