export function checkCollision(bomb, enemy) {
  const distance = Math.hypot(
    bomb.baseX - (enemy.x + 32),
    bomb.baseY - (enemy.y + 32)
  );
  let hitStatus = false;
  if (distance < 30) hitStatus = true;
  else if (distance < 45 && !enemy.crawl)
    if (Math.random() > 0.35) hitStatus = true;
  else if (distance < 90 && !enemy.crawl)
    if (Math.random() > 0.45) hitStatus = true;
    else if (distance < 140 && !enemy.crawl)
      if (Math.random() > 0.82) hitStatus = true;
  return hitStatus;
}
