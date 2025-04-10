// Дані про розділи навчання
export const trainingSections = [
  `
    <h2>Вітаю</h2>
    <p>Ціллю гри є виконувати завдання місій, які в основному полягають в
     знищенні живої сили та техніки ворога за допомогою скидів з дрона.
     За знищення ворогів нараховуються ігрові бали, за які в переврах між місіями 
     можна відкривати нові дрони та боєприпаси, або покращувати існуючі</p>
    
    <p>Для виконання завданнь в гравця може бути до п'яти дронів на кожну місію</p>
    `,
  `
    <h2>Керування з клавіатури </h2>
    <div style="
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  gap: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  max-width: 400px;
   border-radius: 8px;
">
  <div class="innerContent"><strong>рух дрона</strong></div>
  <div class="innerContent"><img width="100px" src="./assets/img/trainingInfo/arrows.png"></div>
  
  <div class="innerContent"><strong>Скид боєприпасу</strong></div>
  <div class="innerContent"><img width="200px" src="./assets/img/trainingInfo/space.png"></div>
  

  <div class="innerContent"><strong>Зміна типу боєприпасу</strong></div>
  <div class="innerContent"><img width="60px" src="./assets/img/trainingInfo/ctrl.png"></div>

  <div class="innerContent"><strong>Вибір дрону</strong></div>
  <div class="innerContent"><img width="180px" src="./assets/img/trainingInfo/numbers.png"></div>
</div>
    
    `,
  `
    <h2>Керування з мобільного пристрою </h2>
   <div class="innerContent"><img width="250px" src="./assets/img/trainingInfo/phoneScreen.png"></div>
</div>
    `,
];

// Функція оновлення тексту
export function updateTrainingText(trainingText, currentSection) {
  trainingText.innerHTML = trainingSections[currentSection];
}
