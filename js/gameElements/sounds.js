export class VehicleSoundPlayer {
  constructor(src, overlapTime = 0.2) {
    this.src = src;
    this.overlapTime = overlapTime; // секунди
    this.currentSound = null;
    this.nextTimeout = null;
    this.isPlaying = false;
  }

  playLoop() {
    if (this.isPlaying) return;

    const playInstance = () => {
      const sound = new Audio(this.src);
      sound.volume = 0.6;
      sound.play();

      sound.addEventListener("loadedmetadata", () => {
        const duration = sound.duration;
        this.nextTimeout = setTimeout(
          playInstance,
          (duration - this.overlapTime) * 1000
        );
      });

      this.currentSound = sound;
    };

    this.isPlaying = true;
    playInstance();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    clearTimeout(this.nextTimeout);
    if (this.currentSound) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
      this.currentSound = null;
    }
  }
  setVolumeByDistance(distance, maxDistance = 600) {
    const clamped = Math.max(0, Math.min(1, 1 - distance / maxDistance));
    if (this.currentSound) {
      this.currentSound.volume = clamped * 0.15; // — базовий максимум
    }
  }
}
