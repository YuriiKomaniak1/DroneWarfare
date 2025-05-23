export const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};
const shouldPlayMusic = localStorage.getItem("playSettingsMusic") === "true";
const difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {
  level: "medium",
  accuracy: 1,
  weight: 1,
  text: "влучність ворогів - 100% від базової <br /> вага боєприпасів - 100% від базової",
};
const initialDifficulty = JSON.stringify(difficulty);
let description = document.getElementById("description");
description.innerHTML =
  difficulty.text ||
  "влучність ворогів - 100% від базової <br /> вага боєприпасів - 100% від базової";
let music = null;
if (shouldPlayMusic) {
  music = new Audio("./assets/audio/music/upgrade-music.mp3");
  music.loop = true;
  music.volume = volumeSettings.musicVolume * 0.15;

  // Спроба відтворити
  music.play().catch((e) => {
    console.warn("Автовідтворення музики заблоковано:", e);
  });
  localStorage.removeItem("playBriefingMusic");
}

// console.log(volumeSettings);
// Встановити значення в селекті
document.getElementById("difficulty").value = difficulty.level;

// При зміні рівня складності — оновити значення і коефіцієнти
document.getElementById("difficulty").addEventListener("change", (e) => {
  const level = e.target.value;
  difficulty.level = level;

  switch (level) {
    case "easy":
      difficulty.accuracy = 0.6;
      difficulty.weight = 0.8;
      difficulty.text =
        "влучність ворогів - 60% від базової <br /> вага боєприпасів - 80% від базової";
      description.innerHTML = difficulty.text;
      break;
    case "medium":
      difficulty.accuracy = 1.0;
      difficulty.weight = 1.0;
      difficulty.text =
        "влучність ворогів - 100% від базової <br /> вага боєприпасів - 100% від базової";
      description.innerHTML = difficulty.text;
      break;
    case "hard":
      difficulty.accuracy = 1.25;
      difficulty.weight = 1.0;
      difficulty.text =
        "влучність ворогів - 125% від базової <br /> вага боєприпасів - 100% від базової";
      description.innerHTML = difficulty.text;

      break;
  }
});
// 🔁 Відновлюємо положення повзунків
document.getElementById("musicVolume").value = volumeSettings.musicVolume;
document.getElementById("soundVolume").value = volumeSettings.soundVolume;

document.getElementById("musicVolume").addEventListener("input", (e) => {
  volumeSettings.musicVolume = parseFloat(e.target.value);
  if (music) {
    music.volume = volumeSettings.musicVolume * 0.3;
  }
});

document.getElementById("soundVolume").addEventListener("input", (e) => {
  volumeSettings.soundVolume = parseFloat(e.target.value);
});

document.getElementById("back-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("save-button").addEventListener("click", () => {
  if (JSON.stringify(difficulty) !== initialDifficulty) {
    localStorage.removeItem("gameData");
    console.log("🗑️ Налаштування змінено — gameData видалено");
  }
  localStorage.setItem("Volume", JSON.stringify(volumeSettings));
  localStorage.setItem("Difficulty", JSON.stringify(difficulty));
  window.location.href = "index.html";
});
