import "./index/backgroundanimation.js";
const startButton = document.getElementById("start");
const continueGameButton = document.getElementById("continue");

startButton.addEventListener("click", () => {
  localStorage.clear();
  goToBriefing(true);
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
