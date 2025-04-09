// Дані про розділи навчання
export const trainingSections = [
  `
    <h2>🎯 Ласкаво просимо!</h2>
    <p>Ваше завдання — знищити ворогів, уникаючи перешкод.</p>
    `,
  `
    <h3>🚁 Типи бомб:</h3>
    <ul>
      <li>Фрагментаційна — площинне ураження</li>
      <li>Фугасна — вибух великої сили</li>
      <li>Кумулятивна — пробиття броні</li>
    </ul>
    `,
  `
    <h3>🛡️ Поради:</h3>
    <p>Слідкуйте за <strong>видимістю</strong> і <strong>здоров'ям</strong> дрона!</p>
    `,
];

// Функція оновлення тексту
export function updateTrainingText(trainingText, currentSection) {
  trainingText.innerHTML = trainingSections[currentSection];
}
