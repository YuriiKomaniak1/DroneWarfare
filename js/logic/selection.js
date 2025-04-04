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
