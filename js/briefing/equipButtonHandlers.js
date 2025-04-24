import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";
import { SmallDrone, MediumDrone } from "../drones/drones.js";

export function setupEquipButtons(drone, gameData, gameState, droneIndex) {
  const fragPlus = document.getElementById("fragPlus");
  const fragMinus = document.getElementById("fragMinus");
  const hePlus = document.getElementById("hePlus");
  const heMinus = document.getElementById("heMinus");
  const shapedPlus = document.getElementById("shapedPlus");
  const shapedMinus = document.getElementById("shapedMinus");
  const smallDroneImage = document.getElementById("small_drone_image");
  const mediumDroneImage = document.getElementById("medium_drone_image");
  const bigDroneImage = document.getElementById("big_drone_image");
  console.log(droneIndex);

  if (!gameData.mediumDroneAvailable)
    mediumDroneImage.style.backgroundImage =
      "url('assets/img/drones/empty.png')";

  if (!gameData.bigDroneAvailable)
    bigDroneImage.style.backgroundImage = "url('assets/img/drones/empty.png')";

  addClickAndTouch(smallDroneImage, () => {
    if (drone.type !== "small") gameState.drones[droneIndex] = new SmallDrone();
  });

  addClickAndTouch(mediumDroneImage, () => {
    console.log(drone);
    if (drone.type !== "medium") {
      gameState.drones[droneIndex] = new MediumDrone();
      gameState.rememberDrone(gameData, droneIndex);
      console.log(gameData);
      localStorage.setItem("gameData", JSON.stringify(gameData));
      window.location.reload();
    }
  });

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
  document.getElementById("fragBombWeight").textContent =
    Math.round(FragBomb.weight * 1000) + "г.";
  document.getElementById("heBombWeight").textContent =
    Math.round(HeBomb.weight * 1000) + "г.";
  document.getElementById("shapedBombWeight").textContent =
    Math.round(ShapedBomb.weight * 1000) + "г.";

  function calculateRemainingCapacity(drone) {
    const bombWeight =
      drone.bombStorage.frag.length * FragBomb.weight +
      drone.bombStorage.he.length * HeBomb.weight +
      drone.bombStorage.shaped.length * ShapedBomb.weight;
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
