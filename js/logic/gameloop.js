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
  switchToNextAvailableBomb,
} from "./controls.js";
import { dropBomb } from "../drones/bomb.js";
import { drawNavigationGrid } from "./navigation.js";
import { drawMenuButtons } from "../levels/training/trainingButtons.js";
import { DroneScope } from "../gameElements/droneScope.js";
import { Minimap } from "../gameElements/minimap.js";
import { createDroneIcons } from "../gameElements/droneIcons.js";
import { keys } from "../logic/controls.js";
import { SmallDrone, MediumDrone, BigDrone } from "../drones/drones.js";
import { buttons, winLoseTest } from "./gameLoopButtonHandlers.js";
import { NavigationGrid, findPath } from "./navigation.js";
import {
  tryStartDroneSound,
  enableDroneSound,
  pauseAllSounds,
  resumeAllSounds,
} from "../gameElements/sounds.js";
export const pauseState = { isPaused: false };
export function togglePause() {
  pauseState.isPaused = !pauseState.isPaused;
  if (pauseState.isPaused) {
    pauseAllSounds();
  } else {
    resumeAllSounds();
  }
}

export function createAnimationLoop(
  canvas,
  layer1,
  layer2,
  ctx,
  enemies,
  vehicles,
  winLoseConditions,
  gameData,
  condition,
  training = false
) {
  window.addEventListener("click", enableDroneSound, { once: true });
  window.addEventListener("keydown", enableDroneSound, { once: true });
  gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
  gameState.updateData(gameData);

  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  let lastTime = 0;
  let gameFrame = 0;
  let bombs = [];
  let currentDrone = gameState.drones[selectionState.selectedDroneIndex];
  console.log(gameData);
  gameState.drones[0].isActive = true;
  switchToNextAvailableBomb(true);
  const droneScope = new DroneScope(canvas, ctx);
  const minimap = new Minimap(canvas, enemies, vehicles, ctx, layer1, bombs);
  const droneIcons = createDroneIcons(gameState.drones, canvas, ctx);
  setupControls(() => {
    dropBomb(
      currentDrone,
      selectionState,
      layer1,
      ctx,
      droneScope,
      bombs,
      gameData
    );
  }, gameState.drones);
  setupDroneSelectionByClick(canvas, droneIcons);
  setupTouchControls(() => {
    dropBomb(
      currentDrone,
      selectionState,
      layer1,
      ctx,
      droneScope,
      bombs,
      gameData
    );
  }, canvas);
  buttons(gameData);

  //----------------початок анімації-------------------
  function animate(timestamp) {
    if (pauseState.isPaused) {
      // пауза
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("ПАУЗА", canvas.width / 2, canvas.height / 2);
      requestAnimationFrame(animate); // просто чекаємо без оновлення гри
      return;
    }
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= FRAME_TIME) {
      lastTime = timestamp - (deltaTime % FRAME_TIME);
      // ззвук дрона
      tryStartDroneSound(currentDrone);

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
      // очистка канвасу
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // малюємо перший шар
      layer1.update(keys, currentDrone);
      layer1.draw();
      //малюємо вибухи бомб
      bombs.forEach((bomb) => {
        if (bomb.frameX === bomb.frames || bomb.deployed) bomb.draw();
      });
      // мертва піхота
      enemies.forEach((enemy) => {
        if (enemy.dead) {
          enemy.draw();
        }
      });
      // піхота обчислення і малювання
      enemies.forEach((enemy) => {
        if (checkVisibility(currentDrone, enemy, canvas, gameFrame)) {
          enemy.isFiring = true;
          enemy.frameX = 0;
        }
        if (
          (enemy.isFiring &&
            checkDistance(enemy, canvas) > enemy.fireDistance) ||
          !currentDrone.isAlive ||
          currentDrone.isReloading
        ) {
          enemy.isFiring = false;
        }
        enemy.update(enemies, canvas, gameState, gameData, training);
        if (!enemy.dead) {
          enemy.draw();
          enemy.fire(currentDrone, layer1, canvas);
        }
      });
      // знищена техніка
      vehicles.forEach((vehicle) => {
        if (!vehicle.isMoving) {
          vehicle.draw();
        }
      });
      // техніка обчислення і малювання
      vehicles.forEach((vehicle) => {
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
        vehicle.update(
          vehicles,
          enemies,
          canvas,
          gameState,
          gameData,
          training
        );
        if (vehicle.isMoving) {
          vehicle.draw();
        }
        vehicle.fire(currentDrone, layer1, canvas);
      });
      // бомби обчислення і малювання в нижній частині польоту
      bombs.forEach((bomb) => {
        if (
          bomb.initialScale / bomb.scale >= 13.5 &&
          bomb.frameX !== bomb.frames &&
          !bomb.deployed
        )
          bomb.draw();
        bomb.drop(bombs, layer1);
        if (bomb.deployed) {
          enemies.forEach((enemy) => {
            bomb.checkMineCollision(enemy);
          });
          vehicles.forEach((vehicle) => {
            bomb.checkMineEffect(vehicle, vehicles, gameData, NavigationGrid);
            // bomb.drawDebugWheels(ctx, vehicle);
          });
        }
        if (bomb.exploded && bomb.explosionFrame < 1 && bomb.class === "bomb") {
          currentDrone.cahngeVisibility();
          enemies.forEach((enemy) => {
            if (bomb.checkCollision(enemy) && !enemy.dead) {
              enemy.dead = true;
              enemy.isFiring = false; // 💥 припиняє стріляти
              enemy.stopFiringSoundLoop(); //
              enemy.deathFrameIndex = 0;
            }
            if (checkEffect(bomb, enemy) && !enemy.dead) {
              enemy.crawl = true;
              enemy.frameX = 0;
              enemy.isFiring = false;
            }
          });
          vehicles.forEach((vehicle) => {
            bomb.checkVehicleCollision(
              vehicle,
              vehicles,
              gameData,
              NavigationGrid
            );
          });
        }
      });
      // малюємо другий шар
      layer2.update(keys, currentDrone);
      layer2.draw();
      // малюємо черепи
      enemies.forEach((enemy) => {
        enemy.skullDraw();
      });
      // малюємо бомби в верхньому польоті
      bombs.forEach((bomb) => {
        if (bomb.initialScale / bomb.scale < 13.5) bomb.draw();
      });
      // дрони обчислення і малювання
      const selectedDrone = gameState.drones[selectionState.selectedDroneIndex];
      if (currentDrone && currentDrone !== selectedDrone) {
        selectedDrone.visibility = currentDrone.visibility;
        currentDrone.reloading(true);
        if (currentDrone.baseX === 0 && currentDrone.baseY === 0) {
          currentDrone.baseX = canvas.width / 2;
          currentDrone.baseY = canvas.height / 2;
        }
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
      // - технічна функція відмальовки навігаційної сітки -
      // if (vehicles[0]) {
      //   drawNavigationGrid(vehicles[0].crewNawgrid, ctx, layer1);
      // }
      // відмалльовка інтерфейсу
      droneScope.draw(currentDrone);
      minimap.draw(gameData);
      droneIcons.forEach((object) => {
        object.draw();
      });
      drawJoystickAndButtons(ctx, canvas, gameState.drones);
      drawMenuButtons(ctx, minimap, training);

      if (!training) {
        gameState.drawScore(ctx, canvas, gameData);
        if (condition.start) {
          winLoseTest(
            winLoseConditions,
            gameState,
            gameData,
            enemies,
            vehicles
          );
        }
        winLoseConditions.addedFunction(vehicles);
      }
      gameFrame++;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate); // Запускаємо цикл
}
