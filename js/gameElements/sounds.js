import { pauseState } from "../logic/gameloop.js";

export const activeSounds = [];
export const soundState = {
  droneMusicStarted: false,
  droneMusic: null,
  allowDroneMusic: false,
};
const volumeSettings = JSON.parse(localStorage.getItem("Volume")) || {
  soundVolume: 0.1,
  musicVolume: 0.6,
};

export function pauseAllSounds() {
  activeSounds.forEach((sound) => {
    if (!sound.paused) {
      sound._wasPlayingBeforePause = true;
      sound.pause();
    } else {
      sound._wasPlayingBeforePause = false;
    }
  });
}

export function resumeAllSounds() {
  if (pauseState?.isPaused) return;
  activeSounds.forEach((sound) => {
    if (sound._wasPlayingBeforePause) {
      sound.play().catch((e) => {
        console.warn("🔇 Не вдалося відтворити звук після паузи:", e);
      });
    }
    delete sound._wasPlayingBeforePause;
  });
}

export class VehicleSoundPlayer {
  constructor(src, overlapTime = 0.2) {
    this.src = src;
    this.overlapTime = overlapTime; // секунди
    this.currentSounds = []; // ▶️ ВСІ активні інстанси
    this.nextTimeout = null;
    this.isPlaying = false;
  }

  playLoop() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playInstance = () => {
      if (!this.isPlaying || pauseState.isPaused) return; // 🔒 Не граємо під час паузи

      const sound = new Audio(this.src);
      sound.volume = 0.6 * volumeSettings.soundVolume;

      sound.play().catch((e) => {
        console.warn("🔇 Не вдалося відтворити звук авто:", e);
      });

      activeSounds.push(sound);
      this.currentSounds.push(sound);

      sound.addEventListener("loadedmetadata", () => {
        const duration = sound.duration;
        // 🔁 Продовжити тільки якщо не пауза
        this.nextTimeout = setTimeout(() => {
          this.nextTimeout = null;
          if (this.isPlaying && !pauseState.isPaused) {
            playInstance();
          }
        }, (duration - this.overlapTime) * 1000);
      });

      sound.addEventListener("ended", () => {
        const index = activeSounds.indexOf(sound);
        if (index !== -1) activeSounds.splice(index, 1);

        const localIndex = this.currentSounds.indexOf(sound);
        if (localIndex !== -1) this.currentSounds.splice(localIndex, 1);
      });
    };

    playInstance();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    clearTimeout(this.nextTimeout);
    this.nextTimeout = null;

    this.currentSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
      const index = activeSounds.indexOf(sound);
      if (index !== -1) activeSounds.splice(index, 1);
    });
    this.currentSounds = [];
  }

  setVolumeByDistance(distance, maxDistance = 600) {
    const clamped = Math.max(0, Math.min(1, 1 - distance / maxDistance));
    this.currentSounds.forEach((sound) => {
      sound.volume = clamped * 0.3 * volumeSettings.soundVolume;
    });
  }
}

export function enableDroneSound() {
  soundState.allowDroneMusic = true;
}
export function tryStartDroneSound(currentDrone) {
  // 🟢 Якщо дрон живий, активний і має бомби — запускаємо звук
  // if (
  //   soundState.allowDroneMusic &&
  //   currentDrone &&
  //   currentDrone.isAlive &&
  //   currentDrone.isActive &&
  //   currentDrone.countBombs() > 0 &&
  //   !soundState.droneMusicStarted
  // ) {
  //   const droneSound = new Audio("assets/audio/drone/drone-sound.mp3");
  //   droneSound.loop = true;
  //   droneSound.volume = 0.15 * volumeSettings.soundVolume;
  //   console.log(droneSound.volume);
  //   droneSound
  //     .play()
  //     .then(() => {
  //       soundState.droneMusic = droneSound;
  //       soundState.droneMusicStarted = true;
  //       activeSounds.push(droneSound);
  //     })
  //     .catch((e) => console.warn("❌ Не вдалося відтворити звук дрона:", e));
  // }
  // // 🔴 Якщо дрон знищено або немає бомб — зупиняємо звук
  // if (
  //   soundState.droneMusic &&
  //   (!currentDrone?.isAlive || currentDrone.countBombs() <= 0)
  // ) {
  //   soundState.droneMusic.pause();
  //   soundState.droneMusic.currentTime = 0;
  //   soundState.droneMusicStarted = false;
  //   const index = activeSounds.indexOf(soundState.droneMusic);
  //   if (index !== -1) activeSounds.splice(index, 1);
  //   soundState.droneMusic = null;
  // }
}
