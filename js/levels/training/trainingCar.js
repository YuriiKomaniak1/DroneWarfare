import { ZU23 } from "../../enemies/vehicle.js";
import { NavigationGrid, findPath } from "../../logic/navigation.js";
export function addTestVehicle(
  layer1,
  ctx,
  vehicleNavGrid,
  vehicles,
  enemies,
  navGrid
) {
  let waypoints = [
    { x: 900, y: 1800 },
    { x: 900 + 1, y: 1800 + 1 },

    { x: 1000, y: 2600 },
  ];
  let bmp = new ZU23(
    waypoints[0].x,
    waypoints[0].y,
    layer1,
    ctx,
    waypoints,
    vehicleNavGrid
  );
  // === Шукаємо шлях один раз при створенні ===
  bmp.path = findPath(vehicleNavGrid, waypoints[0], waypoints[1]);
  bmp.currentPathIndex = 0;
  bmp.embark(enemies, navGrid, 0, 0, 0, 0);
  vehicles.push(bmp);
}
