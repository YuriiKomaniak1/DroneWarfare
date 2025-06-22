// uiControls.js
import {
  handleMenuClick,
  handleMenuHover,
} from "../levels/training/trainingButtons.js";

export function initUIControls({ canvas, gameData }) {
  canvas.addEventListener("mousemove", (e) => handleMenuHover(e, canvas));
  canvas.addEventListener("touchmove", (e) => handleMenuHover(e, canvas));
  canvas.addEventListener("click", (e) =>
    handleMenuClick(e, canvas, gameData, () => {
      // Для звичайної місії: повернення на головне меню
      // window.location.href = "index.html";
    })
  );
  canvas.addEventListener("touchstart", (e) =>
    handleMenuClick(e, canvas, gameData, () => {
      // window.location.href = "index.html";
    })
  );
}
