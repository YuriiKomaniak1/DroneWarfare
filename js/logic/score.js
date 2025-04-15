export function drawScore(ctx, score, canvas) {
  const fontSize = 22;
  const text = `SCORE: ${score}`;

  ctx.save();
  ctx.font = `${fontSize}px "Press Start 2P", "Pixelify Sans", monospace`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const centerX = canvas.width / 2;
  const paddingTop = 20;

  ctx.strokeText(text, centerX, paddingTop);
  ctx.fillText(text, centerX, paddingTop);

  ctx.restore();
}
