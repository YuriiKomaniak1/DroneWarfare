import { FragBomb, HeBomb, ShapedBomb } from "../drones/bomb.js";

export function setupEquipButtons(drone, gameData) {
  const fragPlus = document.getElementById("fragPlus");
  const fragMinus = document.getElementById("fragMinus");
  const hePlus = document.getElementById("hePlus");
  const heMinus = document.getElementById("heMinus");
  const shapedPlus = document.getElementById("shapedPlus");
  const shapedMinus = document.getElementById("shapedMinus");
  const mediumDroneImage = document.getElementById("medium_drone_image");
  const bigDroneImage = document.getElementById("big_drone_image");

  if (!gameData.mediumDroneAvailable)
    mediumDroneImage.style.backgroundImage =
      "url('assets/img/drones/empty.png')";

  if (!gameData.bigDroneAvailable)
    bigDroneImage.style.backgroundImage = "url('assets/img/drones/empty.png')";

  addClickAndTouch(fragPlus, () => {
    if (drone.remainingCapacity >= FragBomb.weight) {
      drone.addBomb(FragBomb);
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
    }
  });

  addClickAndTouch(shapedMinus, () => {
    if (drone.bombStorage.shaped.length > 0) {
      drone.bombStorage.shaped.pop();
      drone.remainingCapacity = calculateRemainingCapacity(drone);
    }
  });

  function calculateRemainingCapacity(drone) {
    const bombWeight =
      drone.bombStorage.frag.length * FragBomb.weight +
      drone.bombStorage.he.length * HeBomb.weight +
      drone.bombStorage.shaped.length * ShapedBomb.weight;

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
}
