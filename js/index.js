import "./index/backgroundanimation.js";
const startButton = document.getElementById("start");
const continueGameButton = document.getElementById("continue");
const trainingButton = document.getElementById("training");
const settingsButton = document.getElementById("settings");

startButton.addEventListener("click", () => {
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
