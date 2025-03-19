export function checkCollision(bomb, enemy) {
  const distance = Math.hypot(
    bomb.baseX - (enemy.x + 32),
    bomb.baseY - (enemy.y + 32)
  );
  let hitStatus = false;
  if (distance < 30) hitStatus = true;
  else if (distance < 80)
    if (Math.random() > 0.45) hitStatus = true;
    else if (distance < 130) if (Math.random() > 0.82) hitStatus = true;
  return hitStatus;
}
