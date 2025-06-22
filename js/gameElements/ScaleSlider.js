export class ScaleSlider {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.x = 30;
    this.y = canvas.height / 2 - 100;
    this.width = 10;
    this.height = 200;
    this.handleRadius = 18;

    this.min = 0.6;
    this.max = 1.25;
    this.value = 1.0;
    this.altitude = 120; // висота в метрах

    this.opacity = 1; // <-- нова змінна

    this.dragging = false;

    this._setupListeners();

    this.targetValue = this.value; // цільове значення
    this.smoothStep = 0.05 / 60; // 0.1 за секунду при 60 fps
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

  fadeOutStep() {
    if (this.opacity > 0.15) {
      this.opacity -= 0.001;
      if (this.opacity < 0) this.opacity = 0;
    }
  }

  draw(layer, currentDrone) {
    const ctx = this.ctx;
    this.altitude = Math.round((1 / this.value) * 150); // висота в метрах
    this.targetAltitude = Math.round((1 / this.targetValue) * 150); // висота в метрах
    this.flightTime = Math.sqrt((2 * this.altitude) / 9.81); // час польоту в секундах
    ctx.save();
    // Виведення часу польоту трохи нижче правіше центра
    const screenCenterX = this.canvas.width / 2;
    const screenCenterY = this.canvas.height / 2;
    ctx.globalAlpha = this.opacity;

    // Лінія
    ctx.fillStyle = "#aaa";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.globalAlpha = this.opacity > 0.6 ? this.opacity : 0.6;
    // Ручка
    const handleY = this._valueToY(this.targetValue);
    const handleX = this.x + this.width / 2;
    ctx.beginPath();
    ctx.arc(handleX, handleY, this.handleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    // Висота
    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Alt: ", this.x + 10, this.y - 30);

    // Текст
    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(this.targetAltitude + " m", this.x + 10, this.y - 10);
    ctx.restore();
    if (currentDrone.countBombs() > 0 && currentDrone.isActive) {
      //час польоту
      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        `${this.flightTime.toFixed(2)} s`,
        screenCenterX + 10,
        screenCenterY + 16
      );
      //швидкість
      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        `${(layer.currentSpeed * 10).toFixed(2)} m/s`,
        screenCenterX + 10,
        screenCenterY + 30
      );
      //висота
      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        `${this.altitude} m`,
        screenCenterX + 10,
        screenCenterY + 46
      );
    }
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
        this.opacity = 1;
      }
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (this.dragging) {
        const rect = this.canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        this.targetValue = this._yToValue(y);
      }
    });

    this.canvas.addEventListener("pointerup", () => (this.dragging = false));
    this.canvas.addEventListener(
      "pointercancel",
      () => (this.dragging = false)
    );
  }
  update() {
    const diff = this.targetValue - this.value;
    const maxStep = this.smoothStep;

    if (Math.abs(diff) > maxStep) {
      this.value += Math.sign(diff) * maxStep;
    } else {
      this.value = this.targetValue;
    }
  }
}
