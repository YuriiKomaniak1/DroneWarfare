let controlCanvas = null;
let controlDrones = null;
let joystickVisible = false;
export function initControls(canvas, drones) {
  controlCanvas = canvas;
  controlDrones = drones;
}
import { basePath } from "../utils/basePath.js";

export const bombIcons = {
  frag: new Image(),
  he: new Image(),
  shaped: new Image(),
};

bombIcons.frag.src = `${basePath}assets/img/bombs/fragBombIcon.png`;
bombIcons.he.src = `${basePath}assets/img/bombs/heBombIcon.png`;
bombIcons.shaped.src = `${basePath}assets/img/bombs/shapedBombIcon.png`;
export const changeArrowImage = new Image();
changeArrowImage.src = `${basePath}assets/img/bombs/changeArrow.png`;
// СТАН КЛАВІШ (клавіатура)
export const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};
// СТАН ВИБОРУ ДРОНІВ І БОМБ
export const selectionState = {
  bombTypes: ["frag", "he", "shaped"],
  selectedBombIndex: 0,
  selectedBombType: "frag",
  selectedDroneIndex: 0,
};
// Функція для ініціалізації клавіатури
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
    // Додатково обробка Ctrl для перемикання бомб
    if (e.ctrlKey) {
      switchToNextAvailableBomb(true);
    }

    // Додатково обробка клавіш 1-5 для вибору дрона
    if (e.key >= "1" && e.key <= "5") {
      const index = parseInt(e.key) - 1;
      if (!controlDrones[index].isReloading) {
        selectionState.selectedDroneIndex = index;
        switchToNextAvailableBomb(false);
        console.log(`🚁 Вибрано дрона #${index + 1}`);
      }
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
// Функція вибору дрона кліком або тапом
export function setupDroneSelectionByClick(canvas, droneIcons) {
  canvas.addEventListener("click", handleSelection);
  canvas.addEventListener("touchstart", handleSelection);

  function handleSelection(e) {
    e.preventDefault();
    let clientX, clientY;
    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    2;

    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    droneIcons.forEach((icon, index) => {
      if (
        mouseX >= icon.x &&
        mouseX <= icon.x + icon.width &&
        mouseY >= icon.y &&
        mouseY <= icon.y + icon.height
      ) {
        if (!controlDrones[index].isReloading) {
          selectionState.selectedDroneIndex = index;
          console.log(`🚁 Вибрано дрона #${index + 1}`);
        }
      }
    });
  }
}
// СТАН ДЖОЙСТИКА І КНОПОК
export const joystick = {
  baseX: 90,
  baseY: 0,
  baseRadius: 60,
  stickX: 90,
  stickY: 0,
  stickRadius: 24,
  active: false,
  touchId: null,
};

export const buttonDrop = {
  x: 0,
  y: 0,
  radius: 45,
  pressed: false,
};

export const buttonSwitch = {
  x: 0,
  y: 0,
  radius: 45,
  pressed: false,
};
// МАЛЮВАННЯ ДЖОЙСТИКА І КНОПОК
export function drawJoystickAndButtons(ctx) {
  joystick.baseY = controlCanvas.height - 150;
  if (!joystick.active) {
    joystick.stickY = joystick.baseY;
  }

  buttonDrop.x = controlCanvas.width - 160;
  buttonDrop.y = controlCanvas.height - 100;

  buttonSwitch.x = controlCanvas.width - 60;
  buttonSwitch.y = controlCanvas.height - 100;

  ctx.globalAlpha = 0.6;
  if (joystickVisible) {
    // Джойстик база
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(
      joystick.baseX,
      joystick.baseY,
      joystick.baseRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Стiк
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      joystick.stickX,
      joystick.stickY,
      joystick.stickRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  if (controlDrones[selectionState.selectedDroneIndex].countBombs() > 0) {
    // Кнопка Drop
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = buttonDrop.pressed
      ? "rgba(139,0,0,0.7)"
      : "rgba(247, 198, 0, 0.2)";
    ctx.beginPath();
    ctx.arc(
      buttonDrop.x,
      buttonDrop.y,
      buttonDrop.pressed ? buttonDrop.radius * 1.2 : buttonDrop.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
    const activeBombType = selectionState.selectedBombType;
    const icon = bombIcons[activeBombType];

    if (icon.complete) {
      // Якщо картинка вже завантажена
      const sizeX = 25;
      const sizeY = 50;

      ctx.drawImage(
        icon,
        buttonDrop.x - sizeX / 2,
        buttonDrop.y - sizeY / 2,
        sizeX,
        sizeY
      );
    } else {
      // Якщо ще не завантажена — резервне відображення тексту
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💣", buttonDrop.x, buttonDrop.y);
    }
    // Кнопка Switch

    ctx.fillStyle = buttonSwitch.pressed
      ? "rgba(0,0,139,0.7)" // натиснута
      : "rgba(0, 255, 0, 0.2)"; // звичайна
    ctx.beginPath();
    ctx.arc(
      buttonSwitch.x,
      buttonSwitch.y,
      buttonSwitch.pressed ? buttonSwitch.radius * 1.2 : buttonSwitch.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Малюємо стрілочку заміни
    if (changeArrowImage.complete) {
      const sizeX = 20;
      const sizeY = 40;
      ctx.drawImage(
        changeArrowImage,
        buttonSwitch.x + sizeX * 0.1, // трохи правіше від центру
        buttonSwitch.y - sizeY / 2 + 10,
        sizeX,
        sizeY
      );
    }

    // Малюємо іконку наступної бомби
    ctx.globalAlpha = 0.55;
    const nextBombType = switchToNextAvailableBomb(true, true);
    if (nextBombType) {
      const nextIcon = bombIcons[nextBombType];
      if (nextIcon && nextIcon.complete) {
        const sizeX = 18;
        const sizeY = 36;
        ctx.drawImage(
          nextIcon,
          buttonSwitch.x - sizeX * 1.1, // трохи лівіше від центру
          buttonSwitch.y - sizeY / 2 + 10,
          sizeX,
          sizeY
        );
      }
    }
  }
  ctx.globalAlpha = 1;
}

// НАЛАШТУВАННЯ сенсорного керування
export function setupTouchControls(dropBomb, canvas) {
  const TOUCH_EXTRA_RADIUS = 10;
  canvas.addEventListener("touchstart", (e) => {
    joystickVisible = true;
    for (let touch of e.touches) {
      const x = touch.clientX;
      const y = touch.clientY;

      if (
        Math.hypot(x - joystick.baseX, y - joystick.baseY) < joystick.baseRadius
      ) {
        joystick.active = true;
        joystick.touchId = touch.identifier;
      }

      if (
        Math.hypot(x - buttonDrop.x, y - buttonDrop.y) <
        buttonDrop.radius + TOUCH_EXTRA_RADIUS
      ) {
        buttonDrop.pressed = true;
      }

      if (
        Math.hypot(x - buttonSwitch.x, y - buttonSwitch.y) <
        buttonSwitch.radius + TOUCH_EXTRA_RADIUS
      ) {
        buttonSwitch.pressed = true;
      }
    }
  });

  canvas.addEventListener("touchmove", (e) => {
    for (let touch of e.touches) {
      if (touch.identifier === joystick.touchId) {
        const x = touch.clientX;
        const y = touch.clientY;
        const dx = x - joystick.baseX;
        const dy = y - joystick.baseY;
        const dist = Math.hypot(dx, dy);

        if (dist < joystick.baseRadius) {
          joystick.stickX = x;
          joystick.stickY = y;
        } else {
          joystick.stickX = joystick.baseX + (dx / dist) * joystick.baseRadius;
          joystick.stickY = joystick.baseY + (dy / dist) * joystick.baseRadius;
        }

        keys.up = dy < -20;
        keys.down = dy > 20;
        keys.left = dx < -20;
        keys.right = dx > 20;
      }
    }
  });

  canvas.addEventListener("touchend", (e) => {
    for (let touch of e.changedTouches) {
      const x = touch.clientX;
      const y = touch.clientY;

      if (
        buttonDrop.pressed &&
        Math.hypot(x - buttonDrop.x, y - buttonDrop.y) <
          buttonDrop.radius + TOUCH_EXTRA_RADIUS
      ) {
        if (dropBomb) dropBomb();
      }

      if (
        buttonSwitch.pressed &&
        Math.hypot(x - buttonSwitch.x, y - buttonSwitch.y) <
          buttonSwitch.radius + TOUCH_EXTRA_RADIUS
      ) {
        switchToNextAvailableBomb(true);
      }

      if (touch.identifier === joystick.touchId) {
        joystick.active = false;
        joystick.touchId = null;
        joystick.stickX = joystick.baseX;
        joystick.stickY = joystick.baseY;
        keys.up = keys.down = keys.left = keys.right = false;
      }
    }

    buttonDrop.pressed = false;
    buttonSwitch.pressed = false;
  });
}

export function switchToNextAvailableBomb(
  startFromNext = false,
  onlyFind = false
) {
  if (!controlDrones || !controlDrones[selectionState.selectedDroneIndex]) {
    console.warn("🚨 controlDrones або активний дрон не готовий!");
    return null;
  }
  const types = selectionState.bombTypes;
  let startIndex = selectionState.selectedBombIndex;
  const activeDrone = controlDrones[selectionState.selectedDroneIndex];

  if (!activeDrone) {
    console.warn("🚨 Немає активного дрона!");
    return null;
  }

  if (startFromNext) {
    startIndex = (startIndex + 1) % types.length; // стартуємо з наступного
  }

  for (let i = 0; i < types.length; i++) {
    const index = (startIndex + i) % types.length;
    const type = types[index];
    const bombList = activeDrone[`${type}Bombs`];
    if (bombList && bombList.length > 0) {
      if (!onlyFind) {
        selectionState.selectedBombType = type;
        selectionState.selectedBombIndex = index;
        console.log(`🔄 Перемкнуто на доступну бомбу: ${type}`);
      }
      return type; // ← Повертаємо тип бомби!
    }
  }

  console.warn("🚨 Усі типи бомб закінчилися!");
  return null;
}
