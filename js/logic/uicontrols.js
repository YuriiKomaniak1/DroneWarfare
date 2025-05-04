// uiControls.js
import {
  handleMenuClick,
  handleMenuHover,
} from "../levels/training/trainingButtons.js";
import {
  updateTrainingText,
  trainingSections,
} from "../levels/training/trainingInfo.js";

export function initUIControls({
  canvas,
  gameData,
  training,
  currentSectionRef,
  openModalCallback,
}) {
  canvas.addEventListener("mousemove", (e) => handleMenuHover(e, canvas));
  canvas.addEventListener("touchmove", (e) => handleMenuHover(e, canvas));
  canvas.addEventListener("click", (e) =>
    handleMenuClick(e, canvas, gameData, () => {
      if (training && openModalCallback) {
        openModalCallback("open");
      } else {
        // Для звичайної місії: повернення на головне меню
        window.location.href = "index.html";
      }
    })
  );
  canvas.addEventListener("touchstart", (e) =>
    handleMenuClick(e, canvas, () => {
      if (training && openModalCallback) {
        openModalCallback("open");
      } else {
        window.location.href = "index.html";
      }
    })
  );

  // Якщо тренування — обробка кнопок "далі", "назад", "відновити"
  if (training && currentSectionRef && openModalCallback) {
    const prevSection = document.getElementById("prevSection");
    const nextSection = document.getElementById("nextSection");
    const resumeGame = document.getElementById("resumeGame");

    if (prevSection && nextSection && resumeGame) {
      prevSection.addEventListener("click", () => {
        currentSectionRef.value = Math.max(currentSectionRef.value - 1, 0);
        updateTrainingText(trainingText, currentSectionRef.value);
      });

      nextSection.addEventListener("click", () => {
        currentSectionRef.value++;
        if (currentSectionRef.value >= trainingSections.length) {
          currentSectionRef.value = 0;
        }
        updateTrainingText(trainingText, currentSectionRef.value);
      });

      resumeGame.addEventListener("click", () => {
        const trainingModal = document.getElementById("trainingModal");
        if (trainingModal) trainingModal.style.visibility = "hidden";
      });
    }

    const hideEnemiesModal = document.getElementById("hideEnemiesModal");
    if (hideEnemiesModal) {
      hideEnemiesModal.addEventListener("click", () => {
        const enemiesModal = document.getElementById("enemiesModal");
        if (enemiesModal) enemiesModal.style.visibility = "hidden";
      });
    }
  }
}
