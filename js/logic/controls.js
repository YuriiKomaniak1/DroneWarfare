import { gameState } from "./gamestate.js";
import {
  fragBombIcon,
  heBombIcon,
  shapedBombIcon,
  footMineIcon,
  tankMineIcon,
  magnetMineIcon,
  shrapnelBombIcon,
  clusterBombIcon,
  shapedClusterBombIcon,
  changeArrowImage,
} from "../gameElements/droneIcons.js";

const bombIcons = {
  frag: fragBombIcon,
  he: heBombIcon,
  shaped: shapedBombIcon,
  footMine: footMineIcon,
  tankMine: tankMineIcon,
  magnetMine: magnetMineIcon,
  shrapnel: shrapnelBombIcon,
  cluster: clusterBombIcon,
  shapedCluster: shapedClusterBombIcon,
};

export let isControlSetupMode = false;

// СТАН КЛАВІШ (клавіатура)
export const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};
// СТАН ВИБОРУ ДРОНІВ І БОМБ
export const selectionState = {
  bombTypes: [
    "frag",
    "he",
    "shaped",
    "footMine",
    "tankMine",
    "magnetMine",
    "shrapnel",
    "cluster",
    "shapedCluster",
  ],
  selectedBombIndex: 0,
  selectedBombType: "frag",
  selectedDroneIndex: 0,
};
// Функція для ініціалізації клавіатури
export function setupControls(dropBomb) {
  window.addEventListener("keydown", (e) => {
    if (isControlSetupMode) return;
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
      if (gameState.drones[index] && !gameState.drones[index].isReloading) {
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
    if (isControlSetupMode) return;
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
        if (!gameState.drones[index].isReloading) {
          selectionState.selectedDroneIndex = index;
          switchToNextAvailableBomb(false);
          console.log(`🚁 Вибрано дрона #${index + 1}`);
        }
      }
    });
  }
}
// СТАН ДЖОЙСТИКА І КНОПОК
export const joystick = {
  baseX: 90,
  baseY: window.innerHeight - 150,
  baseRadius: 70,
  stickX: 90,
  stickY: window.innerHeight - 150,
  stickRadius: 26,
  active: false,
  touchId: null,
};

export const buttonDrop = {
  x: 0,
  y: 0,
  radius: 50,
  pressed: false,
};

export const buttonSwitch = {
  x: 0,
  y: 0,
  radius: 50,
  pressed: false,
};
// МАЛЮВАННЯ ДЖОЙСТИКА І КНОПОК
export function drawJoystickAndButtons(ctx) {
  ctx.globalAlpha = 0.6;

  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.arc(joystick.baseX, joystick.baseY, joystick.baseRadius, 0, Math.PI * 2);
  ctx.fill();

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

  const activeDrone = gameState.drones[selectionState.selectedDroneIndex];
  if (!activeDrone || activeDrone.countBombs() === 0) {
    ctx.globalAlpha = 1;
    return;
  }

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

  const icon = bombIcons[selectionState.selectedBombType];
  if (icon.complete) {
    ctx.drawImage(icon, buttonDrop.x - 12, buttonDrop.y - 25, 25, 50);
  } else {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("💣", buttonDrop.x, buttonDrop.y);
  }

  ctx.fillStyle = buttonSwitch.pressed
    ? "rgba(0,0,139,0.7)"
    : "rgba(0, 255, 0, 0.2)";
  ctx.beginPath();
  ctx.arc(
    buttonSwitch.x,
    buttonSwitch.y,
    buttonSwitch.pressed ? buttonSwitch.radius * 1.2 : buttonSwitch.radius,
    0,
    Math.PI * 2
  );
  ctx.fill();

  if (changeArrowImage.complete) {
    ctx.globalAlpha = 0.45;
    ctx.drawImage(
      changeArrowImage,
      buttonSwitch.x + 5,
      buttonSwitch.y - 20,
      20,
      40
    );
  }

  const nextBombType = switchToNextAvailableBomb(true, true);
  if (nextBombType) {
    const nextIcon = bombIcons[nextBombType];
    if (nextIcon?.complete) {
      ctx.globalAlpha = 0.55;
      ctx.drawImage(nextIcon, buttonSwitch.x - 20, buttonSwitch.y - 18, 18, 36);
    }
  }

  ctx.globalAlpha = 1;
}

// НАЛАШТУВАННЯ сенсорного керування
export function setupTouchControls(dropBomb, canvas) {
  if (isControlSetupMode) return;
  const TOUCH_EXTRA_RADIUS = 10;
  canvas.addEventListener("touchstart", (e) => {
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
    if (isControlSetupMode) return;
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
  if (
    !gameState.drones ||
    !gameState.drones[selectionState.selectedDroneIndex]
  ) {
    // console.warn("🚨 drones або активний дрон не готовий!");
    return null;
  }
  const types = selectionState.bombTypes;
  let startIndex = selectionState.selectedBombIndex;
  const activeDrone = gameState.drones[selectionState.selectedDroneIndex];

  if (!activeDrone) {
    // console.warn("🚨 Немає активного дрона!");
    return null;
  }

  if (startFromNext) {
    startIndex = (startIndex + 1) % types.length; // стартуємо з наступного
  }

  for (let i = 0; i < types.length; i++) {
    const index = (startIndex + i) % types.length;
    const type = types[index];
    const bombList = activeDrone.bombStorage[type];
    if (bombList && bombList.length > 0) {
      if (!onlyFind) {
        selectionState.selectedBombType = type;
        selectionState.selectedBombIndex = index;
      }
      return type; // ← Повертаємо тип бомби!
    }
  }

  // console.warn("🚨 Усі типи бомб закінчилися!");
  return null;
}

const CONTROL_KEYS = ["joystick", "buttonDrop", "buttonSwitch"];
let controlSetupIndex = 0;

export function setupCustomControlPlacement(canvas) {
  console.log("🛠️ Налаштування користувацьких елементів керування...");
  isControlSetupMode = true;
  controlSetupIndex = 0; // ← правильно використовує глобальну змінну

  joystick.baseX = -9999;
  joystick.baseY = -9999;
  joystick.stickX = -9999; // динамічно встановлюємо baseY
  joystick.stickY = -9999; // динамічно встановлюємо baseY
  // динамічно встановлюємо baseY
  buttonDrop.x = -9999;
  buttonDrop.y = -9999;
  buttonSwitch.x = -9999;
  buttonSwitch.y = -9999;

  canvas.removeEventListener("pointerdown", onCustomControlClick); // запобігає дублю
  canvas.addEventListener("pointerdown", onCustomControlClick);

  function onCustomControlClick(e) {
    if (controlSetupIndex >= CONTROL_KEYS.length) {
      isControlSetupMode = false;
      canvas.removeEventListener("pointerdown", onCustomControlClick);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const controlKey = CONTROL_KEYS[controlSetupIndex];

    if (controlKey === "joystick") {
      joystick.baseX = x;
      joystick.baseY = y;
      joystick.stickX = x;
      joystick.stickY = y;
    } else if (controlKey === "buttonDrop") {
      buttonDrop.x = x;
      buttonDrop.y = y;
    } else if (controlKey === "buttonSwitch") {
      buttonSwitch.x = x;
      buttonSwitch.y = y;
    }

    saveControlPositions();
    controlSetupIndex++;
  }
}

export function loadControlPositionsFromStorage() {
  const saved = localStorage.getItem("customControlsPositions");

  // Стандартні значення (як у drawJoystickAndButtons)
  const defaultPositions = {
    joystick: { x: 90, y: window.innerHeight - 150 }, // baseY буде динамічно = canvas.height - 120
    buttonDrop: { x: window.innerWidth - 170, y: window.innerHeight - 70 },
    buttonSwitch: { x: window.innerWidth - 60, y: window.innerHeight - 120 },
  };

  try {
    const positions = saved ? JSON.parse(saved) : null;

    if (positions?.joystick) {
      joystick.baseX = positions.joystick.x;
      joystick.baseY = positions.joystick.y;
      joystick.stickX = positions.joystick.x;
      joystick.stickY = positions.joystick.y;
    } else {
      joystick.baseX = defaultPositions.joystick.x;
      joystick.baseY = defaultPositions.joystick.y;
      joystick.stickX = defaultPositions.joystick.x;
      joystick.stickY = defaultPositions.joystick.y;
    }

    if (positions?.buttonDrop) {
      buttonDrop.x = positions.buttonDrop.x;
      buttonDrop.y = positions.buttonDrop.y;
    } else {
      buttonDrop.x = defaultPositions.buttonDrop.x;
      buttonDrop.y = defaultPositions.buttonDrop.y;
    }

    if (positions?.buttonSwitch) {
      buttonSwitch.x = positions.buttonSwitch.x;
      buttonSwitch.y = positions.buttonSwitch.y;
    } else {
      buttonSwitch.x = defaultPositions.buttonSwitch.x;
      buttonSwitch.y = defaultPositions.buttonSwitch.y;
    }
  } catch (e) {
    console.warn(
      "❌ Помилка читання customControlsPositions. Встановлено значення за замовчуванням."
    );
    joystick.baseX = defaultPositions.joystick.x;
    joystick.baseY = defaultPositions.joystick.y;
    joystick.stickX = defaultPositions.joystick.x;
    joystick.stickY = defaultPositions.joystick.y;

    buttonDrop.x = defaultPositions.buttonDrop.x;
    buttonDrop.y = defaultPositions.buttonDrop.y;
    buttonSwitch.x = defaultPositions.buttonSwitch.x;
    buttonSwitch.y = defaultPositions.buttonSwitch.y;
  }
}

function saveControlPositions() {
  const positions = {
    joystick: { x: joystick.baseX, y: joystick.baseY },
    buttonDrop: { x: buttonDrop.x, y: buttonDrop.y },
    buttonSwitch: { x: buttonSwitch.x, y: buttonSwitch.y },
  };
  localStorage.setItem("customControlsPositions", JSON.stringify(positions));
}
