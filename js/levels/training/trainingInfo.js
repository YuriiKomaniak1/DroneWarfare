// Дані про розділи навчання
export const trainingSections = [
  `
      <h2>Вітаю</h2>
      <p>Ціллю гри є виконання завдань місій, які в основному полягають у
       знищенні живої сили та техніки ворога за допомогою скидів з дрона.
       За знищення ворогів нараховуються ігрові бали, за які в перервах між місіями 
       можна відкривати нові дрони та боєприпаси або покращувати існуючі.</p>
      
      <p>Для виконання завдань у гравця може бути до п'яти дронів на кожну місію.</p>
      `,
  `
      <h2>Керування з клавіатури</h2>
      <div style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 8px;
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 500px;
        border-radius: 8px;
      ">
        <div class="innerContent"><strong>Рух дрона</strong></div>
        <div class="innerContent"><img width="100px" src="./assets/img/trainingInfo/arrows.png" /></div>
        
        <div class="innerContent"><strong>Скид боєприпасу</strong></div>
        <div class="innerContent"><img width="200px" src="./assets/img/trainingInfo/space.png" /></div>
        
        <div class="innerContent"><strong>Зміна типу боєприпасу</strong></div>
        <div class="innerContent"><img width="60px" src="./assets/img/trainingInfo/ctrl.png" /></div>
  
        <div class="innerContent"><strong>Вибір дрона</strong></div>
        <div class="innerContent"><img width="180px" src="./assets/img/trainingInfo/numbers.png" /></div>
      </div>
      `,
  `
      <h2>Керування з мобільного пристрою</h2>
      <div class="innerContent"><img width="250px" src="./assets/img/trainingInfo/phoneScreen.png" /></div>
      `,
  `
      <h2>Дрон</h2>
      <div class="innerContent"><img width="120px" src="./assets/img/trainingInfo/drone.png" /></div>
      <p>Дрон — основний елемент, яким керує гравець. Під час гри, якщо дрон не збитий
      або не летить на перезарядку, гравець не бачить самого дрона, лише його приціл.</p>
      <p>Дрон має такі характеристики:</p>
      <p><strong>Помітність</strong> — імовірність того, що вороги побачать дрон і почнуть в нього стріляти.
      Залежить від розміру дрона та кількості боєприпасів, скинутих нещодавно на ворогів.</p>
      <p><strong>Запас міцності</strong> — у базового дрона становить 2. Це кількість влучань у дрон, після яких дрон буде знищено.</p>
      <p><strong>Вантажопідйомність</strong> — у базового дрона становить 900 г. Це сумарна вага боєприпасів, які дрон може взяти.</p>
      
      `,
  `
      <h2>Інтерфейс дрона</h2>
      
      <div style="
        display: grid;
        grid-template-columns: 3fr 1fr;
        
        gap: 8px;
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 500px;
        border-radius: 8px;
      ">
        <div class="innerContent">
          <p>          Праворуч на екрані відображаються іконки всіх наявних у гравця дронів.
          На іконках зображено тип дрона та боєприпаси, які він має зараз.
          Коли дрон на перезарядці, замість боєприпасів відображається зелена смуга, яка показує час до повернення дрона у стрій.
          Якщо дрон знищено, його іконка зникає. 
          У активного дрона також зліва відображаються дві додаткові смуги: зелена — запас міцності, червона — рівень помітності.</p>
        </div>
        <div class="innerContent"><img width="100px" src="./assets/img/trainingInfo/droneIcon.png" /></div>
      </div>
      `,
  `
      <h2>Типи боєприпасів</h2>
      <div style="
        display: grid;
        grid-template-columns: 5fr 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 8px;
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 500px;
        border-radius: 8px;
      ">
        <div class="innerContent">
        <div>
  <strong>Осколковий</strong></p>
  <p><strong>Дія проти піхоти</strong></p>
  <p>Призначений в основному для знищення живої сили ворога. При вибуху базовий боєприпас має зону гарантованого знищення 
  вибухом радіусом 1 м, а також зону осколків радіусом 7 м. У зоні осколків ймовірність знищення ворога є
  випадковою і залежить від відстані до вибуху. Чим ближче до вибуху, тим більша ймовірність знищення.
  Осколки не зачіпають ворогів, які повзуть.</p>

  <p><strong>Дія проти техніки</strong></p>
  <p>Може зупинити неброньовану техніку та знищити піхоту всередині.
  З малою ймовірністю може знищити неброньовану техніку. Проти броньованої техніки безсилий.</p>
</div>
  </div>
       
        <div class="innerContent"><img width="25px" src="./assets/img/bombs/fragBombIcon.png" /></div>
              
      </div>
      `,
  `
      <h2>Типи боєприпасів</h2>
      <div style="
        display: grid;
        grid-template-columns: 5fr 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 8px;
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 500px;
        border-radius: 8px;
      ">
               
         <div class="innerContent"> <div> <p> <strong>Фугасний</strong></p>
         <p><strong>Дія проти піхоти</strong></p>
          <p>При вибуху базовий боєприпас має зону гарантованого знищення 
  вибухом радіусом 2,5 м, осколків не має.</p>
         
         <p><strong>Дія проти техніки</strong></p>
         <p>гарантовано знищує неброньовану техніку та більшість екіпажу. Базовий боєприпас має бронепробиття 0.3 та маленький шанс знищити 
         легкоброньовану техніку.</p>
         </p></div></div>
        <div class="innerContent"><img width="25px" src="./assets/img/bombs/heBombIcon.png" /></div>
         </div>
      `,
  `
      <h2>Типи боєприпасів</h2>
      <div style="
        display: grid;
        grid-template-columns: 5fr 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 8px;
        padding: 10px;
        border: 1px solid #ccc;
        max-width: 500px;
        border-radius: 8px;
      ">
                
         
         <div class="innerContent"> <div> <p> <strong>Кумулятивний</strong></p>
         <p><strong>Дія проти піхоти</strong></p>
          <p>Не має ні оскодків ні зони знищення вибухом. Піхоту може знищити лише прямим попаданням</p>
         
         <p><strong>Дія проти техніки</strong></p>
         <p>Основне призначення - знищення бронетехніки. Базовий боєприпас має бронепробиття 0.9.
          Це означає що його шанс пробити одиницю броні складає 90%. Якщо наприклад техніка має рівень
           броні 3 одиниці, боєприпас має пройти перевірку на пробиття кожної одиниці. Якщо хоча б одна не 
           проб'ється, техніка не знищена.
           Неброньовану техніку гарантовано знищує</p>
         </p></div></div>
        <div class="innerContent"><img width="25px" src="./assets/img/bombs/shapedBombIcon.png" /></div>
        
  
        
      </div>
      `,
];

// Функція оновлення тексту
export function updateTrainingText(trainingText, currentSection) {
  trainingText.innerHTML = trainingSections[currentSection];
}
