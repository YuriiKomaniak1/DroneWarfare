export function checkEffect(bomb, enemy) {
  const distance = Math.hypot(
    bomb.x - (enemy.x + enemy.width / 2),
    bomb.y - (enemy.y + enemy.height / 2)
  );
  let effectStatus = false;
  if (distance < 220) effectStatus = true;

  return effectStatus;
}

export function checkVisibility(drone, enemy, canvas, gameFrame, slider) {
  const distance = checkDistance(enemy, canvas);
  let effectStatus = false;
  if (gameFrame % 60 === 0) {
    if (
      distance < enemy.fireDistance &&
      !enemy.crawl &&
      Math.random() * 150 <
        drone.visibility * enemy.droneSpottingChanse * slider.value
    ) {
      effectStatus = true;
    }
  }
  return effectStatus;
}
export function checkVehicleVisibility(
  drone,
  vehicle,
  canvas,
  gameFrame,
  slider
) {
  const distance = checkDistance(vehicle, canvas);
  let effectStatus = false;
  if (gameFrame % 60 === 0) {
    if (
      distance < vehicle.fireDistance &&
      Math.random() * 150 <
        drone.visibility * vehicle.droneSpottingChanse * slider.value
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
