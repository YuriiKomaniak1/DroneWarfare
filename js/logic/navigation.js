export class NavigationGrid {
  constructor(mapWidth, mapHeight, cellSize, obstacles) {
    this.cellSize = cellSize;
    this.cols = Math.ceil((mapWidth * 1.2) / cellSize); // +20%
    this.rows = Math.ceil((mapHeight * 1.2) / cellSize); // +20%
    this.offsetX = Math.floor((this.cols * cellSize - mapWidth) / 2); // Зсув карти
    this.offsetY = Math.floor((this.rows * cellSize - mapHeight) / 2);

    // Ініціалізуємо пусту сітку
    this.grid = Array.from({ length: this.rows }, (_, y) =>
      Array.from({ length: this.cols }, (_, x) => ({
        x,
        y,
        blocked: false,
      }))
    );
    // Помічаємо перешкоди
    obstacles.forEach((ob) => {
      const startX = Math.floor(ob.x / cellSize);
      const startY = Math.floor(ob.y / cellSize);
      const endX = Math.ceil((ob.x + ob.width) / cellSize);
      const endY = Math.ceil((ob.y + ob.height) / cellSize);

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          if (this.isInside(x, y)) {
            this.grid[y][x].blocked = true;
          }
        }
      }
    });
  }

  isInside(x, y) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
  }

  isBlocked(x, y) {
    if (!this.isInside(x, y)) return true;
    return this.grid[y][x].blocked;
  }
}

// --- 2. Функція A* пошуку шляху ---
export function findPath(grid, startPos, endPos) {
  const openSet = [];
  const closedSet = new Set();

  let start = {
    x: Math.floor((startPos.x + grid.offsetX) / grid.cellSize),
    y: Math.floor((startPos.y + grid.offsetY) / grid.cellSize),
    g: 0,
    h: 0,
    f: 0,
    parent: null,
    ignoreBlocked: true, // Старт ігноруємо навіть якщо заблокований
  };

  let end = {
    x: Math.floor((endPos.x + grid.offsetX) / grid.cellSize),
    y: Math.floor((endPos.y + grid.offsetY) / grid.cellSize),
  };

  // Перевірка чи ціль заблокована
  if (grid.isBlocked(end.x, end.y)) {
    console.warn("🎯 Ціль заблокована, шукаємо найближчу вільну...");
    const newEnd = findNearestFreeCell(end, grid);
    if (newEnd) {
      end = newEnd;
    } else {
      console.error("🚫 Немає вільної цілі поблизу.");
      return [];
    }
  }

  start.h = heuristic(start, end);
  start.f = start.g + start.h;

  openSet.push(start);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    if (current.x === end.x && current.y === end.y) {
      return reconstructPath(current, grid.cellSize);
    }

    closedSet.add(current.y + "," + current.x);

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = neighbor.y + "," + neighbor.x;
      if (closedSet.has(neighborKey)) continue;

      const tentativeG = current.g + 1;

      const openNode = openSet.find(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      );

      if (!openNode) {
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
        openSet.push(neighbor);
      } else if (tentativeG < openNode.g) {
        openNode.g = tentativeG;
        openNode.f = openNode.g + openNode.h;
        openNode.parent = current;
      }
    }
  }

  return [];
}

// Знаходження найближчої вільної клітинки
function findNearestFreeCell(target, grid) {
  const queue = [{ x: target.x, y: target.y }];
  const visited = new Set();
  visited.add(`${target.x},${target.y}`);

  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    if (!grid.isBlocked(x, y)) {
      return { x, y };
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const key = `${newX},${newY}`;
      if (grid.isInside(newX, newY) && !visited.has(key)) {
        visited.add(key);
        queue.push({ x: newX, y: newY });
      }
    }
  }
  return null; // Якщо не знайшли нічого
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Манхеттен
}

function getNeighbors(node, grid) {
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const neighbors = [];
  for (const [dx, dy] of dirs) {
    const x = node.x + dx;
    const y = node.y + dy;

    const isBlocked = grid.isBlocked(x, y);

    if (!isBlocked || (node.ignoreBlocked && x === node.x && y === node.y)) {
      neighbors.push({
        x,
        y,
        ignoreBlocked: false,
      });
    }
  }
  return neighbors;
}

function reconstructPath(node, cellSize, offsetX = 0, offsetY = 0) {
  const path = [];
  while (node) {
    path.unshift({
      x: node.x * cellSize + cellSize / 2 - offsetX,
      y: node.y * cellSize + cellSize / 2 - offsetY,
    });
    node = node.parent;
  }
  return path;
}

export function drawNavigationGrid(grid, ctx, layer) {
  ctx.save();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; // Світлі лінії сітки

  for (let y = 0; y < grid.rows; y++) {
    for (let x = 0; x < grid.cols; x++) {
      const cell = grid.grid[y][x];
      const posX = cell.x * grid.cellSize + layer.x;
      const posY = cell.y * grid.cellSize + layer.y;

      // Малюємо рамку клітинки
      ctx.strokeRect(posX, posY, grid.cellSize, grid.cellSize);

      // Якщо заблокована — зафарбовуємо напівпрозорим кольором
      if (cell.blocked) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
        ctx.fillRect(posX, posY, grid.cellSize, grid.cellSize);
      }
    }
  }

  ctx.restore();
}
