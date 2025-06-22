document.getElementById("back").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.querySelectorAll(".backMain").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".load_container").forEach((container) => {
      container.style.visibility = "hidden";
    });
    document.getElementById("infoMenu").style.visibility = "visible";
  });
});
// Назад з механік
document.querySelectorAll(".backMechanics").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mech").forEach((container) => {
      container.style.visibility = "hidden";
    });
    document.getElementById("mechanicsModal").style.visibility = "visible";
  });
});

// Назад з боєприпасів
document.querySelectorAll(".backBombs").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".bombs").forEach((container) => {
      container.style.visibility = "hidden";
    });
    document.getElementById("ammoModal").style.visibility = "visible";
  });
});

function goto(target, source, name) {
  document.getElementById(name).addEventListener("click", () => {
    document.getElementById(source).style.visibility = "hidden";
    document.getElementById(target).style.visibility = "visible";
  });
}
goto("gameModal", "infoMenu", "game");
goto("mechanicsModal", "infoMenu", "mechanics");
goto("ammoModal", "infoMenu", "ammo");
goto("dronesModal", "infoMenu", "drones");
goto("enemiesModal", "infoMenu", "enemies");
goto("apModal", "mechanicsModal", "ap");
goto("visibilityModal", "mechanicsModal", "visibility");
goto("droneFireModal", "mechanicsModal", "droneFire");
goto("bombardingModal", "mechanicsModal", "bombarding");
goto("minesModal", "mechanicsModal", "mines");
goto("fragBombModal", "ammoModal", "fragBomb");
goto("heBombModal", "ammoModal", "heBomb");
goto("shapedBombModal", "ammoModal", "shapedBomb");
goto("apMineModal", "ammoModal", "apMine");
goto("tankMineModal", "ammoModal", "tankMine");
goto("magnetMineModal", "ammoModal", "magnetMine");
goto("clusterBombModal", "ammoModal", "clusterBomb");
goto("shapedClusterBombModal", "ammoModal", "shapedClusterBomb");
