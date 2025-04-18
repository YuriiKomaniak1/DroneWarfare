# dronETerra

🎮 **dronETerra** — це гра, в якій гравець виступає в ролі оператора дрону та знищує ворогів і ворожу техніку, скидаючи на них різні види боєприпасів.

---

## 🛠️ Стан гри

Обсяг гри доволі великий, що не дозволяє завершити її повністю за декілька тижнів.  
Наразі доступний навчальний режим, де гравець сам запускає ворогів кнопками зліва під мінікартою.

🔜 **У майбутньому планується:**

- Повноцінна кампанія з дослідженням нових дронів і боєприпасів.
- Апгрейд наявного спорядження.

---

## 🎮 Геймплей

### Керування здійснюється:

#### З клавіатури:

- **Пробіл (Space)** — скидання бомби
- **Ctrl** — зміна типу боєприпасу
- **1-5** — вибір дрона

#### З мобільного пристрою:

- Елементи керування відображаються на екрані.
- При першому натисканні на екран з'являється джойстик.

📘 **Детальніше в розділі "Навчання" у головному меню гри.**

🎯 **Мета гри** — знищити ворогів і техніку, уникаючи знищення дрона.

---

## ⚙️ Основні механіки

### 🎯 Приціл

- Гравець спостерігає за полем бою через приціл.
- Дрон не видно — окрім випадків його знищення або польоту на перезарядку.

### 💣 Скидання бомби

- При натисканні **Space** дрон скидає бомбу вниз.
- Враховуються:
  - Випадковий розкид.
  - Інерція (при русі).
  - Шлях, який може пройти ворог за час польоту.

### 🧨 Типи боєприпасів (зараз доступно 3):

- Впливають по-різному в залежності від:
  - Відстані до цілі.
  - Типу цілі: піхота, бронетехніка (з рівнем броні), неброньована техніка.
- Мають різну вагу.
- Кількість боєприпасів обмежується вантажопідйомністю дрона.

### 🧭 Навігація ворогів

- Вороги рухаються за заданими вейпоінтами.
- Обхід перешкод здійснюється за допомогою навігаційної сітки.
- Вороги залягають і повзуть, якщо поряд вибухнула бомба

### 👁️ Помітність дрона

- Імовірність, що ворог помітить дрон і почне стріляти, залежить від:
  - Розміру дрона.
  - Кількості нещодавно скинутих бомб.

---

## 💀 Знищення

### Знищення ворогів

- Якщо вибух бомби зачіпає ворога — він знищується.
- Осколки не зачіпають ворогів які повзуть.

### 🚛 Знищення техніки

- Техніка, вражена вибухом, з певною імовірністю загоряється та згодом вибухає.
- Має екіпаж та десант, які:
  - Частково знищуються одразу(залежно від боєприпасу).
  - Частково вистрибують і діють як піхота.
- У неброньованої техніки екіпаж можна знищити осколковим вибухом, навіть якщо він всередині.

### 🚁 Знищення дрона

- Імовірність того що ворог поцілить дрон залежить:
  - Від його скоростільності.
  - Швидкості руху дрона.
- Дрон втрачає одиниці міцності при влучаннях.
- Коли міцність дорівнює 0 — дрон знищується.

---

## 🔁 Перезарядка

- Після скидання всіх боєприпасів дрон летить на перезарядку.
- У цей час його не можна вибрати.
- Якщо гравець переключається на іншого дрона, попередній автоматично відлітає на перезарядку.

## Мінікарта

- Усі вороги та дрон відображаються на мінікарті.

потестити гру можна тут
https://yuriikomaniak1.github.io/DroneWarfare/
