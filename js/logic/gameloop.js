import {
  checkEffect,
  checkVisibility,
  checkDistance,
  checkVehicleVisibility,
} from "./enemyLogic.js";
import { drawScore } from "./score.js";
import {
  selectionState,
  setupControls,
  setupDroneSelectionByClick,
  drawJoystickAndButtons,
  setupTouchControls,
} from "./controls.js";
import { dropBomb } from "../drones/bomb.js";
import { drawNavigationGrid } from "./navigation.js";
import { drawMenuButtons } from "../levels/training/trainingButtons.js";
import { DroneScope } from "../gameElements/droneScope.js";
export function createAnimationLoop(
  drones,
  canvas,
  layer1,
  layer2,
  ctx,
  bombs,
  enemies,
  vehicles,
  minimap,
  droneIcons,
  score
) {
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  let lastTime = 0;
  let gameFrame = 0;
  let currentDrone = drones[selectionState.selectedDroneIndex];
  const droneScope = new DroneScope(canvas, ctx);

  setupControls(() => {
    dropBomb(currentDrone, selectionState, layer1, ctx, droneScope, bombs);
  });
  setupDroneSelectionByClick(canvas, droneIcons);
  setupTouchControls(() => {
    dropBomb(currentDrone, selectionState, layer1, ctx, droneScope, bombs);
  }, canvas);

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= FRAME_TIME) {
      lastTime = timestamp - (deltaTime % FRAME_TIME);
      drones.forEach((drone) => {
        if (
          (drone.isReloading && drone.baseX === 0 && drone.baseY === 0) ||
          (!drone.isAlive && drone.baseX === 0 && drone.baseY === 0)
        ) {
          drone.baseX = canvas.width / 2;
          drone.baseY = canvas.height / 2;
        }
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо канвас
      layer1.update();
      layer1.draw();
      bombs.forEach((bomb) => {
        if (bomb.initialScale / bomb.scale >= 13.5) bomb.draw();
        bomb.drop();

        if (bomb.exploded && bomb.explosionFrame < 1) {
          currentDrone.cahngeVisibility();
          enemies.forEach((enemy) => {
            if (bomb.checkCollision(enemy) && !enemy.dead) {
              enemy.dead = true;
              enemy.deathFrameIndex = 0;
            }
            if (checkEffect(bomb, enemy) && !enemy.dead) {
              enemy.crawl = true;
              enemy.frameX = 0;
              enemy.isFiring = false;
            }
          });
          vehicles.forEach((vehicle) => {
            bomb.checkVehicleCollision(vehicle);
          });
        }
      });
      enemies.forEach((enemy, index) => {
        if (checkVisibility(currentDrone, enemy, canvas, gameFrame)) {
          enemy.isFiring = true;
          enemy.frameX = 0;
        }
        if (
          enemy.isFiring &&
          checkDistance(enemy, canvas) > enemy.fireDistance
        ) {
          enemy.isFiring = false;
        }
        enemy.update(enemies, canvas, score);
        enemy.draw();
        enemy.fire(currentDrone, layer1);
      });
      vehicles.forEach((vehicle, index) => {
        if (vehicle.hasGunner) {
          if (
            checkVehicleVisibility(currentDrone, vehicle, canvas, gameFrame)
          ) {
            vehicle.isFiring = true;
          }
          if (
            vehicle.isFiring &&
            checkDistance(vehicle, canvas) > vehicle.fireDistance
          ) {
            vehicle.isFiring = false;
          }
        }
        vehicle.update(vehicles, canvas, score);
        vehicle.draw();
        vehicle.fire(currentDrone, layer1);
      });

      layer2.update();
      layer2.draw();
      enemies.forEach((enemy) => {
        enemy.skullDraw();
      });
      bombs.forEach((bomb) => {
        if (bomb.initialScale / bomb.scale < 13.5) bomb.draw();
      });
      const selectedDrone = drones[selectionState.selectedDroneIndex];
      if (currentDrone && currentDrone !== selectedDrone) {
        selectedDrone.visibility = currentDrone.visibility;
        currentDrone.reloading(true);
        if (currentDrone.baseX === 0 && currentDrone.baseY === 0) {
          currentDrone.baseX = canvas.width / 2;
          currentDrone.baseY = canvas.height / 2;
        } // Старий дрон летить на зарядку
      }
      currentDrone = selectedDrone;
      drones.forEach((drone, index) => {
        drone.destruction();
        drone.isActive =
          (index === selectionState.selectedDroneIndex && drone.isAlive) ||
          drone.isReloading;
        drone.flyToreload();
        drone.draw(ctx);
      });
      // drawNavigationGrid(navGrid, ctx, layer1);
      droneScope.draw(currentDrone);
      minimap.draw();
      droneIcons.forEach((object) => {
        object.draw();
      });
      drawJoystickAndButtons(ctx);
      drawMenuButtons(ctx, canvas, minimap);
      drawScore(ctx, score.count, canvas);
      gameFrame++;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate); // Запускаємо цикл
}
