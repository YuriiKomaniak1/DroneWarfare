export const menuButtons = []; // Масив для збереження кнопок
let hoveredButtonIndex = null;
let pressedButtonIndex = null;

export function drawMenuButtons(ctx, canvas, minimap) {
  const labels = ["Навчання", "Вороги", "Меню"];
  const buttonWidth = minimap.width;
  const buttonHeight = 36;
  const gap = 20;
  const startX = minimap.mapX;
  const startY = minimap.mapY + gap + minimap.height;

  menuButtons.length = 0; // Очищаємо перед кожним малюванням

  ctx.save();
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  labels.forEach((label, index) => {
    const x = startX;
    const y = startY + index * (buttonHeight + gap);

    menuButtons.push({ x, y, width: buttonWidth, height: buttonHeight, label });

    // 🎯 ВИБІР КОЛЬОРУ КНОПКИ:
    let bgColor = "rgba(177, 232, 59, 0.25)";
    if (hoveredButtonIndex === index) {
      bgColor = "rgba(177, 232, 59, 0.5)";
    }
    if (pressedButtonIndex === index) {
      bgColor = "rgba(177, 232, 59, 0.7)";
    }

    // Малюємо прямокутник із закругленими кутами
    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, x, y, buttonWidth, buttonHeight, 10);

    // Текст всередині
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillText(label, x + buttonWidth / 2, y + buttonHeight / 2);
  });

  ctx.restore();
}

// Функція для закругленого прямокутника
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

export function handleMenuClick(e, canvas, openTrainingModal) {
  e.preventDefault();
  const { mouseX, mouseY } = getMousePosition(e, canvas);

  menuButtons.forEach((button, index) => {
    if (isInsideButton(mouseX, mouseY, button)) {
      pressedButtonIndex = index;
      setTimeout(() => {
        if (button.label === "Навчання") {
          openTrainingModal();
        } else if (button.label === "Вороги") {
          openEnemiesModal();
        } else if (button.label === "Меню") {
          window.location.href = "index.html";
        }
        pressedButtonIndex = null;
      }, 100); // Невелика затримка для візуального ефекту
    }
  });
}

export function handleMenuHover(e, canvas) {
  const { mouseX, mouseY } = getMousePosition(e, canvas);

  hoveredButtonIndex = null; // Спочатку прибираємо
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

function openEnemiesModal() {
  const modal = document.getElementById("enemiesModal");
  if (modal) {
    modal.style.visibility = "visible";
  }
}
