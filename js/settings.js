export const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};
const shouldPlayMusic = localStorage.getItem("playSettingsMusic") === "true";

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
  localStorage.setItem("Volume", JSON.stringify(volumeSettings));

  window.location.href = "index.html";
});
