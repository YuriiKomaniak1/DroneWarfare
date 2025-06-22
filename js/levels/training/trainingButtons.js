import { togglePause } from "../../logic/gameloop.js";
import { getWinCondition } from "../../logic/gameLoopButtonHandlers.js";

export const menuButtons = []; // Масив для збереження кнопок
let hoveredButtonIndex = null;
let pressedButtonIndex = null;

// Локалізовані назви
const labelsByLang = {
  ua: {
    menu: "Меню",
    win: "Перемога",
  },
  en: {
    menu: "Menu",
    win: "Victory",
  },
  pl: {
    menu: "Menu",
    win: "Wygrana",
  },
  it: {
    menu: "Menu",
    win: "Vittoria",
  },
  es: {
    menu: "Menú",
    win: "Victoria",
  },
  fr: {
    menu: "Menu",
    win: "Victoire",
  },
  pt: {
    menu: "Menu",
    win: "Vitória",
  },
  tr: {
    menu: "Menü",
    win: "Zafer",
  },
  de: {
    menu: "Menü",
    win: "Sieg",
  },
};

const currentLang = localStorage.getItem("lang") || "en";
const labels = labelsByLang[currentLang] || labelsByLang.en;

// Глобальний масив поточних міток кнопок
let buttonLabels = [];

export function drawMenuButtons(ctx, minimap) {
  buttonLabels = getWinCondition() ? [labels.menu, labels.win] : [labels.menu];

  const buttonWidth = minimap.width;
  const buttonHeight = 36;
  const gap = 20;
  const startX = minimap.mapX;
  const startY = minimap.mapY + gap + minimap.height;

  menuButtons.length = 0;

  ctx.save();
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  buttonLabels.forEach((label, index) => {
    const x = startX;
    const y = startY + index * (buttonHeight + gap);

    menuButtons.push({ x, y, width: buttonWidth, height: buttonHeight, label });

    let bgColor = "rgba(177, 232, 59, 0.25)";
    if (hoveredButtonIndex === index) {
      bgColor = "rgba(177, 232, 59, 0.5)";
    }
    if (pressedButtonIndex === index) {
      bgColor = "rgba(177, 232, 59, 0.7)";
    }

    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, x, y, buttonWidth, buttonHeight, 10);

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(label, x + buttonWidth / 2, y + buttonHeight / 2);
  });

  ctx.restore();
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

export function handleMenuClick(e, canvas, gameData, openTrainingModal) {
  e.preventDefault();
  const { mouseX, mouseY } = getMousePosition(e, canvas);

  menuButtons.forEach((button, index) => {
    if (isInsideButton(mouseX, mouseY, button)) {
      pressedButtonIndex = index;
      setTimeout(() => {
        if (button.label === labels.menu) {
          togglePause();
          const pauseModal = document.getElementById("pauseModal");
          if (pauseModal) pauseModal.style.visibility = "visible";
        } else if (button.label === labels.win) {
          gameData.currentMission++;
          localStorage.setItem("playBriefingMusic", "true");
          localStorage.setItem("gameData", JSON.stringify(gameData));
          location.href = "briefing.html";
        }

        pressedButtonIndex = null;
      }, 100);
    }
  });
}

export function handleMenuHover(e, canvas) {
  const { mouseX, mouseY } = getMousePosition(e, canvas);

  hoveredButtonIndex = null;
  menuButtons.forEach((button, index) => {
    if (isInsideButton(mouseX, mouseY, button)) {
      hoveredButtonIndex = index;
    }
  });
}

function getMousePosition(e, canvas) {
  let clientX, clientY;
  if (e.type.startsWith("touch")) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  const rect = canvas.getBoundingClientRect();
  const mouseX = clientX - rect.left;
  const mouseY = clientY - rect.top;
  return { mouseX, mouseY };
}

function isInsideButton(mouseX, mouseY, button) {
  return (
    mouseX >= button.x &&
    mouseX <= button.x + button.width &&
    mouseY >= button.y &&
    mouseY <= button.y + button.height
  );
}
