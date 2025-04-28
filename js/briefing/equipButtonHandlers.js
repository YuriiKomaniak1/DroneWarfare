import {
  FragBomb,
  HeBomb,
  ShapedBomb,
  FootMine,
  TankMine,
  MagnetMine,
  ShrapnelBomb,
  ClusterBomb,
  ShapedClusterBomb,
} from "../drones/bomb.js";
import { SmallDrone, MediumDrone, BigDrone } from "../drones/drones.js";

export function setupEquipButtons(drone, gameData, gameState, droneIndex) {
  // отримуємо елементи з HTML
  const smallDroneImage = document.getElementById("small_drone_image");
  const mediumDroneImage = document.getElementById("medium_drone_image");
  const bigDroneImage = document.getElementById("big_drone_image");
  const fragPlus = document.getElementById("fragPlus");
  const fragMinus = document.getElementById("fragMinus");
  const hePlus = document.getElementById("hePlus");
  const heMinus = document.getElementById("heMinus");
  const shapedPlus = document.getElementById("shapedPlus");
  const shapedMinus = document.getElementById("shapedMinus");
  const footMinePlus = document.getElementById("footMinePlus");
  const footMineMinus = document.getElementById("footMineMinus");
  const tankMinePlus = document.getElementById("tankMinePlus");
  const tankMineMinus = document.getElementById("tankMineMinus");
  const magnetMinePlus = document.getElementById("magnetMinePlus");
  const magnetMineMinus = document.getElementById("magnetMineMinus");
  const shrapnelBombPlus = document.getElementById("shrapnelBombPlus");
  const shrapnelBombMinus = document.getElementById("shrapnelBombMinus");
  const clusterBombPlus = document.getElementById("clusterBombPlus");
  const clusterBombMinus = document.getElementById("clusterBombMinus");
  const shapedClusterBombPlus = document.getElementById(
    "shapedClusterBombPlus"
  );
  const shapedClusterBombMinus = document.getElementById(
    "shapedClusterBombMinus"
  );

  // ховаємо невідкриті бомби
  if (!gameData.footMineAvailable) {
    document.getElementById("footMine").style.display = "none";
  }
  if (!gameData.tankMineAvailable) {
    document.getElementById("tankMine").style.display = "none";
  }
  if (!gameData.magnetMineAvailable) {
    document.getElementById("magnetMine").style.display = "none";
  }
  if (!gameData.shrapnelBombAvailable) {
    document.getElementById("shrapnelBomb").style.display = "none";
  }
  if (!gameData.clusterBombAvailable) {
    document.getElementById("clusterBomb").style.display = "none";
  }

  // перемикання між дронами
  if (!gameData.mediumDroneAvailable)
    mediumDroneImage.style.backgroundImage =
      "url('assets/img/drones/empty.png')";
  if (!gameData.bigDroneAvailable)
    bigDroneImage.style.backgroundImage = "url('assets/img/drones/empty.png')";
  addClickAndTouch(smallDroneImage, () => {
    if (drone.type !== "small") droneChange(SmallDrone);
  });
  addClickAndTouch(mediumDroneImage, () => {
    if (drone.type !== "medium" && gameData.mediumDroneAvailable)
      droneChange(MediumDrone);
  });
  addClickAndTouch(bigDroneImage, () => {
    if (drone.type !== "big" && gameData.bigDroneAvailable)
      droneChange(BigDrone);
  });

  function droneChange(DroneClass) {
    gameState.drones[droneIndex] = new DroneClass();
    gameState.rememberDrone(gameData, droneIndex);
    localStorage.setItem("gameData", JSON.stringify(gameData));
    window.location.reload();
  }

  // осколкова бомба
  addClickAndTouch(fragPlus, () => {
    if (drone.remainingCapacity >= FragBomb.weight) {
      drone.addBomb(FragBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(fragMinus, () => {
    if (drone.bombStorage.frag.length > 0) {
      drone.bombStorage.frag.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("fragBombWeight").textContent =
    Math.round(FragBomb.weight * 1000) + "г.";
  // фугасна бомба
  addClickAndTouch(hePlus, () => {
    if (drone.remainingCapacity >= HeBomb.weight) {
      drone.addBomb(HeBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(heMinus, () => {
    if (drone.bombStorage.he.length > 0) {
      drone.bombStorage.he.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("heBombWeight").textContent =
    Math.round(HeBomb.weight * 1000) + "г.";
  // кумулятивна бомба
  addClickAndTouch(shapedPlus, () => {
    if (drone.remainingCapacity >= ShapedBomb.weight) {
      drone.addBomb(ShapedBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(shapedMinus, () => {
    if (drone.bombStorage.shaped.length > 0) {
      drone.bombStorage.shaped.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("shapedBombWeight").textContent =
    Math.round(ShapedBomb.weight * 1000) + "г.";
  // протипіхотна міна
  addClickAndTouch(footMinePlus, () => {
    if (drone.remainingCapacity >= FootMine.weight) {
      drone.addBomb(FootMine);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(footMineMinus, () => {
    if (drone.bombStorage.footMine.length > 0) {
      drone.bombStorage.footMine.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("footMineWeight").textContent =
    Math.round(FootMine.weight * 1000) + "г.";
  // фугасна міна
  addClickAndTouch(tankMinePlus, () => {
    if (drone.remainingCapacity >= TankMine.weight) {
      drone.addBomb(TankMine);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(tankMineMinus, () => {
    if (drone.bombStorage.tankMine.length > 0) {
      drone.bombStorage.tankMine.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("tankMineWeight").textContent =
    Math.round(TankMine.weight * 1000) + "г.";
  // магнітна міна
  addClickAndTouch(magnetMinePlus, () => {
    if (drone.remainingCapacity >= MagnetMine.weight) {
      drone.addBomb(MagnetMine);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(magnetMineMinus, () => {
    if (drone.bombStorage.magnetMine.length > 0) {
      drone.bombStorage.magnetMine.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("magnetMineWeight").textContent =
    Math.round(MagnetMine.weight * 1000) + "г.";
  // шрапнельна бомба
  addClickAndTouch(shrapnelBombPlus, () => {
    if (drone.remainingCapacity >= ShrapnelBomb.weight) {
      drone.addBomb(ShrapnelBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(shrapnelBombMinus, () => {
    if (drone.bombStorage.shrapnel.length > 0) {
      drone.bombStorage.shrapnel.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("shrapnelBombWeight").textContent =
    Math.round(ShrapnelBomb.weight * 1000) + "г.";
  // касетна бомба
  addClickAndTouch(clusterBombPlus, () => {
    if (drone.remainingCapacity >= ClusterBomb.weight) {
      drone.addBomb(ClusterBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(clusterBombMinus, () => {
    if (drone.bombStorage.cluster.length > 0) {
      drone.bombStorage.cluster.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("clusterBombWeight").textContent =
    Math.round(ClusterBomb.weight * 1000) + "г.";

  // протитанкова касетна бомба
  addClickAndTouch(shapedClusterBombPlus, () => {
    if (drone.remainingCapacity >= ShapedClusterBomb.weight) {
      drone.addBomb(ShapedClusterBomb);
      calculateRemainingCapacity(drone);
    }
  });

  addClickAndTouch(shapedClusterBombMinus, () => {
    if (drone.bombStorage.shapedCluster.length > 0) {
      drone.bombStorage.shapedCluster.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });
  document.getElementById("shapedClusterBombWeight").textContent =
    Math.round(ShapedClusterBomb.weight * 1000) + "г.";

  // характеристики дронів
  document.getElementById("remainingDroneWeight").textContent = Math.round(
    drone.remainingCapacity * 1000
  );
  document.getElementById("droneWeight").textContent = Math.round(
    drone.capacity * 1000
  );
  document.getElementById("hangers").textContent = Math.round(drone.hangers);
  document.getElementById("initialHangers").textContent = Math.round(
    drone.initialHangers
  );
  document.getElementById("droneSpeed").textContent = drone.speed * 10;
  document.getElementById("droneHP").textContent = drone.hp;
  // допоміжні функції
  function calculateRemainingCapacity(drone) {
    const bombWeight =
      drone.bombStorage.frag.length * FragBomb.weight +
      drone.bombStorage.he.length * HeBomb.weight +
      drone.bombStorage.shaped.length * ShapedBomb.weight +
      drone.bombStorage.shrapnel.length * ShrapnelBomb.weight +
      drone.bombStorage.cluster.length * ClusterBomb.weight +
      drone.bombStorage.shapedCluster.length * ShapedClusterBomb.weight +
      drone.bombStorage.footMine.length * FootMine.weight +
      drone.bombStorage.tankMine.length * TankMine.weight +
      drone.bombStorage.magnetMine.length * MagnetMine.weight;
    drone.hangers = drone.initialHangers - drone.countBombs();
    document.getElementById("remainingDroneWeight").textContent = Math.round(
      (drone.capacity - bombWeight) * 1000
    );
    document.getElementById("hangers").textContent = Math.round(drone.hangers);
    return parseFloat((drone.capacity - bombWeight).toFixed(4));
  }

  function addClickAndTouch(element, handler) {
    element.addEventListener("click", handler);
    element.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault(); // щоб уникнути дублювання з click
        handler();
      },
      { passive: false }
    ); // потрібно для preventDefault на touchstart
  }
  console.log(drone);
}
