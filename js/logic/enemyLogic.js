export function checkEffect(bomb, enemy) {
  const distance = Math.hypot(
    bomb.baseX - (enemy.x + 32),
    bomb.baseY - (enemy.y + 32)
  );
  let effectStatus = false;
  if (distance < 220) effectStatus = true;

  return effectStatus;
}
