export class ScaleSlider {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.x = canvas.width - 40;
    this.y = canvas.height / 2 - 100;
    this.width = 10;
    this.height = 200;
    this.handleRadius = 12;

    this.min = 0.5;
    this.max = 2.0;
    this.value = 1.0;

    this.dragging = false;

    this._setupListeners();
  }

  _valueToY(value) {
    const percent = (value - this.min) / (this.max - this.min);
    return this.y + this.height - percent * this.height;
  }

  _yToValue(y) {
    const clamped = Math.max(this.y, Math.min(this.y + this.height, y));
    const percent = (this.y + this.height - clamped) / this.height;
    return this.min + percent * (this.max - this.min);
  }

  draw() {
    const ctx = this.ctx;

    // Лінія
    ctx.fillStyle = "#aaa";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Ручка
    const handleY = this._valueToY(this.value);
    const handleX = this.x + this.width / 2;
    ctx.beginPath();
    ctx.arc(handleX, handleY, this.handleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    // Текст
    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("Scale: " + this.value.toFixed(2), this.x - 10, this.y - 10);
  }

  _setupListeners() {
    this.canvas.addEventListener("pointerdown", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - (this.x + this.width / 2);
      const dy = y - this._valueToY(this.value);
      if (dx * dx + dy * dy <= this.handleRadius * this.handleRadius) {
        this.dragging = true;
      }
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (this.dragging) {
        const rect = this.canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        this.value = this._yToValue(y);
      }
    });

    this.canvas.addEventListener("pointerup", () => (this.dragging = false));
    this.canvas.addEventListener(
      "pointercancel",
      () => (this.dragging = false)
    );
  }
}
