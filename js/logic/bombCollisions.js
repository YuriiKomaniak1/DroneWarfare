export function checkCollision(bomb, enemy) {
  const distance = Math.hypot(
    bomb.baseX - (enemy.x + 32),
    bomb.baseY - (enemy.y + 32)
  );
  let hitStatus = false;

  if (distance < 30) {
    hitStatus = true;
  } else if (distance < 40 && !enemy.crawl) {
    if (Math.random() > 0.2) hitStatus = true;
  } else if (distance < 50 && !enemy.crawl) {
    if (Math.random() > 0.3) hitStatus = true;
  } else if (distance < 90 && !enemy.crawl) {
    if (Math.random() > 0.5) hitStatus = true;
  } else if (distance < 140 && !enemy.crawl) {
    if (Math.random() > 0.85) hitStatus = true;
  }

  return hitStatus;
}
