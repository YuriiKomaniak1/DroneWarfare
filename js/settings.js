export const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.8,
  musicVolume: 0.6,
};

document.getElementById("title").textContent = t("title");
document.getElementById("languageLabel").textContent = t("languageLabel");
document.getElementById("musicVolumeLabel").textContent = t("musicVolumeLabel");
document.getElementById("soundVolumeLabel").textContent = t("soundVolumeLabel");
document.getElementById("back-button").textContent = t("backButton");
document.getElementById("save-button").textContent = t("saveButton");

const shouldPlayMusic = localStorage.getItem("playSettingsMusic") === "true";
let currentLang = localStorage.getItem("lang") || "en";
document.getElementById("languageSelect").value = currentLang;
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

document.getElementById("languageSelect").addEventListener("change", (e) => {
  localStorage.setItem("lang", e.target.value);
  location.reload(); // або оновити лише текст без перезавантаження
});
