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
import {
  drawNavigationGrid,
  drawTrenches,
  drawCovers,
  drawRoofs,
} from "./navigation.js";
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
import { ScaleSlider } from "../gameElements/ScaleSlider.js";
import { initUIControls } from "../logic/uicontrols.js";
import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";
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
  training = false
) {
  let autoSave = JSON.parse(localStorage.getItem("autoSave") || "{}");

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Гравець згорнув або змінив вкладку
      pauseAllSounds();
      // Можеш також ставити гру на паузу
      if (typeof togglePause === "function") togglePause(true);
    } else {
      // Вкладка знову активна
      if (typeof togglePause === "function") togglePause(false);
    }
  });

  window.addEventListener("click", enableDroneSound, { once: true });
  window.addEventListener("keydown", enableDroneSound, { once: true });
  gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
  gameState.updateData(gameData);
  if (training) {
    gameState.drones.forEach((drone) => {
      if (drone) {
        drone.reloadingTime = 1000 * 60 * 0.4;
      }
    });
  }
  const FPS = 60;
  const FRAME_TIME = 1000 / FPS;
  const slider = new ScaleSlider(canvas);
  let lastTime = 0;
  let gameFrame = 0;
  let bombs = [];
  let currentDrone = gameState.drones[selectionState.selectedDroneIndex];
  gameState.drones[0].isActive = true;
  switchToNextAvailableBomb(true);
  console.log(gameState.drones);
  const droneScope = new DroneScope(canvas, ctx);
  const minimap = new Minimap(canvas, enemies, vehicles, ctx, layer1, bombs);
  let droneIcons = createDroneIcons(gameState.drones, canvas, ctx);
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
  buttons(gameData, autoSave);

  const condition = { start: false };
  setTimeout(() => {
    condition.start = true;
  }, 10000);

  initUIControls({
    canvas,
    gameData,
  });
  let previousDroneHP = currentDrone.hp;
  let damageFlashTimer = 0;
  //----------------початок анімації-------------------
  function animate(timestamp) {
    if (pauseState.isPaused) {
      // пауза
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
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
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(slider.value, slider.value);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
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
        if (
          checkVisibility(currentDrone, enemy, canvas, gameFrame, slider) &&
          !enemy.isCovered(gameData)
        ) {
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
          enemy.fire(currentDrone, layer1, canvas, slider);
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
            checkVehicleVisibility(
              currentDrone,
              vehicle,
              canvas,
              gameFrame,
              slider
            ) &&
            !vehicle.isCovered(gameData)
          ) {
            vehicle.isFiring = true;
            vehicle.frameX = 0;
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
        vehicle.fire(currentDrone, layer1, canvas, slider);
      });
      // бомби обчислення і малювання в нижній частині польоту
      bombs.forEach((bomb) => {
        if (
          bomb.initialScale / bomb.scale >= 13.5 &&
          bomb.frameX !== bomb.frames &&
          !bomb.deployed
        )
          bomb.draw();
        bomb.drop(bombs, layer1, slider);
        if (bomb.deployed) {
          enemies.forEach((enemy) => {
            bomb.checkMineCollision(enemy, enemies, gameData);
          });
          vehicles.forEach((vehicle) => {
            bomb.checkMineEffect(
              vehicle,
              vehicles,
              gameData,
              NavigationGrid,
              enemies
            );
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
        enemy.skullDraw(gameData);
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
          drone.flyToreload(layer1, pauseState.isPaused);
          drone.draw(ctx);
        }
      });
      // - технічна функція відмальовки навігаційної сітки -
      // if (vehicles[0]) {
      //   drawNavigationGrid(vehicles[0].crewNawgrid, ctx, layer1);
      // }
      // drawTrenches(ctx, layer1, gameData);
      // drawCovers(ctx, layer1, gameData);
      // drawRoofs(ctx, layer1, gameData);
      // відмалльовка інтерфейсу
      ctx.restore();
      // console.log(gameState.drones);
      if (training) {
        const allDronesDead = gameState.drones.every(
          (drone) => !drone || !drone.isAlive || drone.isReloading
        );
        if (allDronesDead) {
          setTimeout(() => {
            // 🔁 Повне перезавантаження дронів
            gameState.drones.length = 0;

            gameState.updateDrones(gameData, SmallDrone, MediumDrone, BigDrone);
            gameState.drones[0].isActive = true;
            console.log(gameState.drones);
            selectionState.selectedDroneIndex = 0;
            currentDrone = gameState.drones[0];
            gameState.drones.forEach((drone, index) => {
              if (
                drone &&
                Object.values(drone.bombStorage).flat().length === 0
              ) {
                drone.addBomb(FragBomb);
                drone.addBomb(FragBomb);
                drone.addBomb(FragBomb);
                drone.addBomb(HeBomb);
                drone.addBomb(HeBomb);
                drone.addBomb(ShapedBomb);

                drone.initialBombStorage = drone.cloneBombStorage(
                  drone.bombStorage
                );
                gameState.drones[index] = drone;
                if (!gameData.drones[index]) {
                  gameData.drones[index] = {};
                }
                gameData.drones[index].bombStorage = drone.cloneBombStorage(
                  drone.bombStorage
                );
                gameData.drones[index].initialBombStorage =
                  drone.cloneBombStorage(drone.bombStorage);
                gameData.drones[index].capacity = drone.capacity;
                gameData.drones[index].remainingCapacity =
                  drone.remainingCapacity;
                gameData.drones[index].hangers = drone.hangers;
                gameData.drones[index].initialHangers = drone.initialHangers;
                gameData.drones[index].type = "small";
              }
            });

            // // 🔁 Оновлення UI
            droneIcons = createDroneIcons(gameState.drones, canvas, ctx);
            // setupDroneSelectionByClick(canvas, droneIcons);
          }, 4000);
        }
      }
      droneScope.draw(currentDrone);
      minimap.draw(gameData, slider);
      droneIcons.forEach((object) => {
        object.draw();
      });
      drawJoystickAndButtons(ctx, canvas, gameState.drones);
      drawMenuButtons(ctx, minimap, training);
      slider.fadeOutStep();
      slider.update();
      slider.draw(layer1, currentDrone);

      gameState.drawScore(ctx, canvas, gameData);
      if (!training) {
        if (condition.start) {
          winLoseTest(
            winLoseConditions,
            gameState,
            gameData,
            enemies,
            vehicles
          );
        }
        winLoseConditions.addedFunction(vehicles, enemies, bombs);
      }
      gameFrame++;
    }
    // Перевірка зменшення HP
    if (currentDrone.hp < previousDroneHP) {
      damageFlashTimer = 10; // кількість кадрів для моргання
    }
    previousDroneHP = currentDrone.hp;

    // Якщо треба моргати — малюємо червоний фільтр
    if (damageFlashTimer > 0) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      damageFlashTimer--;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate); // Запускаємо цикл
}
