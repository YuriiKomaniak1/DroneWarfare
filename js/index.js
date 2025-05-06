import "./index/backgroundanimation.js";
const startButton = document.getElementById("start");
const continueGameButton = document.getElementById("continue");
const trainingButton = document.getElementById("training");

startButton.addEventListener("click", () => {
  localStorage.clear();
  goToBriefing(true);
});

trainingButton.addEventListener("click", () => {
  localStorage.clear();
  goToTraining(true);
});

continueGameButton.addEventListener("click", () => {
  goToBriefing(true);
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
