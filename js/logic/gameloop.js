import {
  checkEffect,
  checkVisibility,
  checkDistance,
  checkVehicleVisibility,
} from "./enemyLogic.js";
import { gameState } from "./gamestate.js";
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
import { Minimap } from "../gameElements/minimap.js";
import { createDroneIcons } from "../gameElements/droneIcons.js";
import { keys } from "../logic/controls.js";
import { SmallDrone, MediumDrone, BigDrone } from "../drones/drones.js";
const gameData = JSON.parse(localStorage.getItem("gameData"));
gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
gameState.updateData(gameData);

export function createAnimationLoop(
  canvas,
  layer1,
  layer2,
  ctx,
  enemies,
  vehicles,
  training = false
) {
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  let lastTime = 0;
  let gameFrame = 0;
  let bombs = [];
  let currentDrone = gameState.drones[selectionState.selectedDroneIndex];
  gameState.drones[0].isActive = true;
  const droneScope = new DroneScope(canvas, ctx);
  const minimap = new Minimap(canvas, enemies, vehicles, ctx, layer1, bombs);
  const droneIcons = createDroneIcons(gameState.drones, canvas, ctx);
  setupControls(() => {
    dropBomb(currentDrone, selectionState, layer1, ctx, droneScope, bombs);
  }, gameState.drones);
  setupDroneSelectionByClick(canvas, droneIcons);
  setupTouchControls(() => {
    dropBomb(currentDrone, selectionState, layer1, ctx, droneScope, bombs);
  }, canvas);

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= FRAME_TIME) {
      lastTime = timestamp - (deltaTime % FRAME_TIME);
      gameState.drones.forEach((drone) => {
        if (drone) {
          if (
            (drone.isReloading && drone.baseX === 0 && drone.baseY === 0) ||
            (!drone.isAlive && drone.baseX === 0 && drone.baseY === 0)
          ) {
            drone.baseX = canvas.width / 2;
            drone.baseY = canvas.height / 2;
          }
        }
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо канвас
      layer1.update(keys, currentDrone);
      layer1.draw();
      bombs.forEach((bomb) => {
        if (bomb.frameX === bomb.frames) bomb.draw();
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
        enemy.update(enemies, canvas, gameState, training);
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
        vehicle.update(vehicles, canvas, gameState, training);
        vehicle.draw();
        vehicle.fire(currentDrone, layer1);
      });
      bombs.forEach((bomb) => {
        if (
          bomb.initialScale / bomb.scale >= 13.5 &&
          bomb.frameX !== bomb.frames
        )
          bomb.draw();
        bomb.drop();
        if (bomb.deployed) {
          enemies.forEach((enemy) => {
            if (
              bomb.checkMineCollision(enemy) &&
              !enemy.dead &&
              !enemy.vehicle
            ) {
              enemy.dead = true;
              enemy.deathFrameIndex = 0;
              bomb.exploded = true;
              bomb.deployed = false;
            }
          });
          vehicles.forEach((vehicle) => {
            bomb.checkMineEffect(vehicle);
            // bomb.drawDebugWheels(ctx, vehicle);
          });
        }
        if (bomb.exploded && bomb.explosionFrame < 1 && bomb.class === "bomb") {
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
      layer2.update(keys, currentDrone);
      layer2.draw();
      enemies.forEach((enemy) => {
        enemy.skullDraw();
      });
      bombs.forEach((bomb) => {
        if (bomb.initialScale / bomb.scale < 13.5) bomb.draw();
      });
      const selectedDrone = gameState.drones[selectionState.selectedDroneIndex];
      if (currentDrone && currentDrone !== selectedDrone) {
        selectedDrone.visibility = currentDrone.visibility;
        currentDrone.reloading(true);
        if (currentDrone.baseX === 0 && currentDrone.baseY === 0) {
          currentDrone.baseX = canvas.width / 2;
          currentDrone.baseY = canvas.height / 2;
        } // Старий дрон летить на зарядку
      }
      currentDrone = selectedDrone;
      gameState.drones.forEach((drone, index) => {
        if (drone) {
          drone.destruction(layer1);
          drone.isActive =
            (index === selectionState.selectedDroneIndex && drone.isAlive) ||
            drone.isReloading;
          drone.flyToreload(layer1);
          drone.draw(ctx);
        }
      });
      // drawNavigationGrid(navGrid, ctx, layer1);
      droneScope.draw(currentDrone);
      minimap.draw();
      droneIcons.forEach((object) => {
        object.draw();
      });
      drawJoystickAndButtons(ctx, canvas, gameState.drones);
      drawMenuButtons(ctx, canvas, minimap, training);
      if (!training) gameState.drawScore(ctx, canvas);
      gameFrame++;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate); // Запускаємо цикл
}
