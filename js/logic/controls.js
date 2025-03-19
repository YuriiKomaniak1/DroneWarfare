

export const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};
export function setupControls(dropBomb) {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        keys.up = true;
        break;
      case "ArrowDown":
        keys.down = true;
        break;
      case "ArrowLeft":
        keys.left = true;
        break;
      case "ArrowRight":
        keys.right = true;
        break;
      case " ":
        if (dropBomb) dropBomb();

        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
        keys.up = false;
        break;
      case "ArrowDown":
        keys.down = false;
        break;
      case "ArrowLeft":
        keys.left = false;
        break;
      case "ArrowRight":
        keys.right = false;
        break;
    }
  });
}
