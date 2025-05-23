export function setupDebugConsole() {
  if (!window.debugLog) {
    // HTML-блок для виводу
    const el = document.createElement("div");
    el.id = "log";
    el.style.position = "fixed";
    el.style.bottom = "0";
    el.style.left = "0";
    el.style.right = "0";
    el.style.maxHeight = "35vh";
    el.style.overflow = "auto";
    el.style.background = "rgba(0,0,0,0.9)";
    el.style.color = "#0f0";
    el.style.fontSize = "12px";
    el.style.padding = "4px";
    el.style.zIndex = "99999";
    el.style.pointerEvents = "none";
    document.body.appendChild(el);

    // Глобальна функція для виводу повідомлень
    window.debugLog = function (msg) {
      el.innerHTML += `<div>${msg}</div>`;
      el.scrollTop = el.scrollHeight;
    };

    // Глобальний перехоплювач помилок
    window.onerror = function (message, source, lineno, colno, error) {
      debugLog(`❌ JS помилка: ${message} (${source}:${lineno}:${colno})`);
    };
  }
}
