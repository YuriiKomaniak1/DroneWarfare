export const selectionState = {
  bombTypes: ["frag", "he", "shaped"],
  selectedBombIndex: 0,
  selectedBombType: "frag",
  selectedDroneIndex: 0,
};

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey) {
    selectionState.selectedBombIndex =
      (selectionState.selectedBombIndex + 1) % selectionState.bombTypes.length;
    selectionState.selectedBombType =
      selectionState.bombTypes[selectionState.selectedBombIndex];
    console.log(`🔄 Вибрано бомбу: ${selectionState.selectedBombType}`);
  }

  // Вибір дрона клавішами 1–5
  if (event.key >= "1" && event.key <= "5") {
    const index = parseInt(event.key) - 1;
    selectionState.selectedDroneIndex = index;
    console.log(`🚁 Вибрано дрона #${index + 1}`);
  }
});

// Функція для вибору дрона по кліку
export function setupDroneSelectionByClick(canvas, droneIcons) {
  canvas.addEventListener("click", handleSelection);
  canvas.addEventListener("touchstart", handleSelection);

  function handleSelection(e) {
    e.preventDefault();
    let clientX, clientY;
    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    droneIcons.forEach((icon, index) => {
      if (
        mouseX >= icon.x &&
        mouseX <= icon.x + icon.width &&
        mouseY >= icon.y &&
        mouseY <= icon.y + icon.height
      ) {
        selectionState.selectedDroneIndex = index;
        console.log(`🚁 Вибрано дрона #${index + 1} через клік/тап`);
      }
    });
  }
}