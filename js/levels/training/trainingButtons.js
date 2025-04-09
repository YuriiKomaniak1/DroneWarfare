export function drawMenuButtons(ctx, canvas, minimap) {
  const labels = ["Навчання", "Вороги", "Меню"];
  const buttonWidth = minimap.width; // Ширина як у мінікарти
  console.log("minimap.width", minimap.width);
  const buttonHeight = 36;
  const gap = 20; // Відстань між кнопками
  const startX = minimap.mapX; // Центр по ширині
  const startY = minimap.mapY + gap + minimap.height; // Від низу трохи підняти

  ctx.save();
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(177, 232, 59, 0.25)";

  labels.forEach((label, index) => {
    const x = startX;
    const y = startY + index * (buttonHeight + gap);

    // Малюємо прямокутник із закругленими кутами
    drawRoundedRect(ctx, x, y, buttonWidth, buttonHeight, 10);

    // Малюємо текст в середині
    ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Чорний текст
    ctx.fillText(label, x + buttonWidth / 2, y + buttonHeight / 2);

    ctx.fillStyle = "rgba(177, 232, 59, 0.25)"; // Відновлюємо білий колір для наступного прямокутника
  });

  ctx.restore();
}

// Функція малювання закругленого прямокутника
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
