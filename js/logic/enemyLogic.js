export function checkEffect(bomb, enemy) {
  const distance = Math.hypot(
    bomb.baseX - (enemy.x + enemy.width / 2),
    bomb.baseY - (enemy.y + enemy.height / 2)
  );
  let effectStatus = false;
  if (distance < 220) effectStatus = true;

  return effectStatus;
}

export function checkVisibility(drone, enemy, canvas, gameFrame) {
  const distance = checkDistance(enemy, canvas);
  let effectStatus = false;
  if (gameFrame % 60 === 0) {
    if (
      distance < enemy.fireDistance &&
      !enemy.crawl &&
      Math.random() * 100 < drone.visibility
    ) {
      effectStatus = true;
    }
  }
  return effectStatus;
}

export function checkDistance(enemy, canvas) {
  return Math.hypot(
    canvas.width / 2 - (enemy.x + enemy.width / 2),
    canvas.height / 2 - (enemy.y + enemy.height / 2)
  );
}
