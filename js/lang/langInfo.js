const languages = {
  ua: {
    infoTitle: "Інформація про гру",
    game: "Ігровий процес",
    mechanics: "Механіки",
    drones: "Дрони",
    ammo: "Боєприпаси",
    enemies: "Вороги",
    back: "Назад",
    gameTitle: "Опис гри",
    mechanicsTitle: "Механіки гри",
    ap: "Бронепробиття",
    visibility: "Помітність дрону",
    droneFire: "Вогонь по дрону",
    bombarding: "Скидання бомб",
    mines: "Мінування",
    dronesTitle: "Інформація про дрони",
    ammoTitle: "Інформація про боєприпаси",
    fragBomb: ` <div class="fragBomb_image_small"></div>
          Уламкова Бомба`,
    heBomb: ` <div class="heBomb_image_small"></div>
          Фугасна Бомба`,
    shapedBomb: ` <div class="shapedBomb_image_small"></div>
          Кумулятивна бомба`,
    apMine: ` <div class="footMine_image_small"></div>
          Протипіхотна міна`,
    tankMine: ` <div class="tankMine_image_small"></div>
          Протитанкова міна`,
    magnetMine: ` <div class="magnetMine_image_small"></div>
          Магнітна міна`,
    clusterBomb: ` <div class="clusterBomb_image_small"></div>
          Касетна бомба`,
    shapedClusterBomb: ` <div class="shapedClusterBomb_image_small"></div>
          ПТ касетна бомба`,
    enemiesTitle: "Інформація про ворогів",
    name: "Назва",
    armor: "Броня",
    speed: `постр.<br />в сек.`,
    campaignPoints: `бали<br />кампанія`,
    lastStandPoints: `бали<br />ост. руб.`,
    rifleman: "Піхотинець",
    machinegunner: "Кулеметник",
    grenadier: "Гранатометник",
    crew: "Екіпаж",
    ural: "Урал",
    uralSupply: `Урал<br />постачання`,
    gaz66: "ГАЗ-66",
    uaz452: "УАЗ-452",
    guntruck: `Пікап з <br />кулеметом`,
    jeep: `пікап `,
    grad: "Град",
    tigr: "Тигр",
    mtlb: "МТ-ЛБ",
    mtlbKPVT: `МТ-ЛБ з<br />зенітним<br />кулеметом`,
    mtlbzu23: `МТ-ЛБ з<br />зенітною<br />гарматою`,
    btr82: "БТР-82",
    bmp1: "БМП-1",
    bmp2: "БМП-2",
    bmp3: "БМП-3",
    bukM2: "Бук",
    shilka: "Шилка",
    msta: "САУ",
    t55: "Т-55",
    t62: "Т-62",
    t72: "Т-72",
    t72B3: "Т-72Б3",
    t90: "Т-90",
    gameText: `<p>
    <strong>dronETerra</strong> — тактична дрон-стратегія з видом згори, у якій гравець керує бойовими безпілотниками
    на сучасному полі бою. Кожна місія — це унікальна операція з різними умовами, ворогами та цілями:
    від знищення колон до прориву оборони. У грі доступні два режими:
    сюжетна кампанія зі строго побудованими рівнями та <em>«Останній рубіж»</em> — режим нескінченних хвиль,
    де потрібно вижити якомога довше.
  </p>

  <p>
    Гравець може споряджати до п’яти дронів перед місією, обираючи для кожного тип боєприпасів:
    фугасні, касетні, міни тощо. <strong>Ключовим є правильне використання озброєння</strong>
    залежно від ворожої техніки: протитанкові міни ефективні проти важкої броні,
    тоді як уламкові бомби знищують піхоту. Дрони не безсмертні:
    після втрати бойова одиниця стає недоступною, тож перемагати доводиться тими, хто залишився.
  </p>

  <p>
    У грі реалізовано систему прокачки: за очки, отримані в бою, відкриваються нові технології, дрони та боєприпаси.
    Крім того, можна покращувати характеристики дронів — швидкість, вантажопідйомність, броню тощо.
    Кожна успішна місія відкриває доступ до нових рівнів і складніших супротивників —
    від піхоти та пікапів до танків, ЗРК та артилерії.
  </p>

  <p>
    <strong>dronETerra</strong> — це гра, де вирішує не лише реакція, а й планування.
    Грамотно обране спорядження, правильна послідовність дій, влучне скидання бомб —
    усе це впливає на результат операції. Мінливе озброєння, адаптивний інтерфейс
    та постійний тиск з боку ворога створюють <em>унікальне відчуття сучасної війни з повітря</em>.
  </p>`,
    apText: `<p>
    У <strong>dronETerra</strong> використовується ймовірнісна система бронепробиття, яка моделює складність ураження бронетехніки.
    Кожна броньована ціль має числовий параметр <strong>броня</strong>, що визначає її стійкість до пробиття.
    Кожен боєприпас який може пробивати броню має характеристику <strong>бронебійність</strong> — шанс успішного пробиття одного шару броні.
  </p>
  <p>
    При ураженні цілі гра виконує <strong>кілька незалежних перевірок</strong> — одну для кожного пункту броні.
    Щоб пробиття відбулося, всі ці перевірки мають пройти успішно .
    Наприклад, для броні 1 і бронебійності = 0.9, шанс  пробиття буде  90%.
    Для броні 3 і бронебійності = 0.9, шанс  пробиття буде 0,9*0,9*0,9, близько 73%.
  </p>
  <p>
    У разі успішного пробиття ціль   підпалюється,
    і стає небоєздатною. Якщо хоча б одна перевірка не проходить — боєприпас не пробиває броню, і ефект не застосовується.
    Це стимулює гравця обирати правильне озброєння проти конкретного типу ворожої техніки.
  </p>`,
    visibilityText: ` <p>
    У <strong>dronETerra</strong> реалізовано динамічну систему виявлення дронів ворогом.
    Вірогідність того, що дрон буде помічений, залежить не лише від відстані до противника,
    але й від <strong>розміру дрона</strong> та його <strong>бойової активності</strong>.
  </p>
  <p>
    Кожен дрон має базовий рівень <strong>помітності</strong>, який визначається його габаритами:
    великі дрони виявляються швидше, малі — рідше. Але вирішальний вплив має нещодавня активність —
    кожне скидання бомби тимчасово підвищує рівень помітності дрона. Що більше боєприпасів було скинуто за короткий час —
    то вищим є ризик бути виявленим. Ефект накопичується, але з часом поступово зменшується.
  </p>`,
    apTitle: "Інформація про бронепробиття",
    visibilityTitle: "Інформація про помітність дрону",
    droneFireTitle: "Інформація про вогонь по дрону",
    bombardingTitle: "Інформація про скидання бомб",
    minesTitle: "Інформація про мінування",
    droneFireText: ` <p>
    У <strong>dronETerra</strong> реалізовано систему вогню по дронах, яка враховує
    <strong>розмір дрона</strong>, його <strong>швидкість</strong> та <strong>характеристики ворога</strong>.
    Кожна ворожа одиниця має показник <strong>скорострільності</strong> (пострілів на секунду)
    і виконує періодичні спроби влучити по дрону, якщо той в зоні ураження.
  </p>
  <p>
    Шанс влучання знижується зі зростанням швидкості дрона та зменшується для менших моделей —
    швидкий і малий дрон важче вразити. Нерухомий дрон — легка мішень. Водночас вороги з високою скорострільністю
    мають більше шансів нанести урон за одиницю часу.
  </p>
  <p>
    Успішне влучання зменшує <strong>очки міцності</strong> дрона.
    Коли ці очки досягають нуля — дрон знищується.
    Це стимулює гравця не зависати над скупченнями ворога
    та контролювати рівень ризику. Виживання залежить від обережності та темпу.
  </p>`,
    bombardingText: ` <p>
    У <strong>dronETerra</strong> скидання бомб — це ключова бойова дія, яка вимагає точності, планування та врахування руху дрона.
    Бомба падає вертикально вниз, якщо скинута з нерухомого дрона .
    Якщо бомба скинута в польоті, вона відхиляється в напрямку руху дрона, і гравцеві потрібно це враховувати перед скиданням.
  </p>
  <p>
    Кожен дрон має обмежений по вазі <strong>боєзапас</strong> — і може нести різну кількість бомб залежно від типу дрона та спорядження.
    Скидання однієї бомби зменшує поточний запас. Після скидання всіх боєприпасів потрібна <strong>перезарядка</strong>,
    яка відбувається автоматично з певною затримкою.
  </p>
  <p>
    Ця механіка змушує гравця цілити уважно, не витрачати бомби даремно та ретельно обирати момент для атаки.
    Успішна гра залежить не лише від кількості бомб, а й від уміння використати їх у потрібний момент.
  </p>`,
    minesText: ` <p>
    У <strong>dronETerra</strong> міни — це стратегічний тип боєприпасів, які не завдають миттєвого урону,
    але створюють пастки на полі бою. Гравець може скинути міну в будь-який момент під час польоту,
    і вона залишиться на місці падіння. Міни не вибухають одразу — вони активуються, щойно
    ворожа одиниця наблизиться до них.
  </p>
  <p>
    Існують різні типи мін: протипіхотні, протитанкові, магнітні тощо. Вони мають
    різну зону спрацювання, силу урону та ефективність проти певних цілей.
    Наприклад, протитанкова міна не спрацює від піхоти, але здатна знищити важку техніку.
  </p>
  <p>
    Після активації міна вибухає автоматично, завдаючи урон у зоні дії.
    Вороги, що потрапили в зону вибуху, отримують пошкодження або повністю знищуються.
    Це дозволяє гравцеві перекривати маршрути, зупиняти колони та створювати
    оборонні позиції на полі бою.
  </p>`,
    dronesText: `<p>
    У <strong>dronETerra</strong> гравцеві доступні три класи дронів: <strong>малий</strong>,
     <strong>середній</strong> і <strong>великий</strong>.
    Кожен тип має унікальні характеристики, що визначають його роль на полі бою — від швидких
    рейдів до масштабних бомбардувань.
  </p>

  <p>
    <strong>Малий дрон</strong> — легкий і маневрений, має найвищу швидкість і найменшу помітність.
    Його боєзапас обмежений, а міцність невелика, але саме він найкраще підходить для точкових ударів, знищення найсильніших засобів ППО.
     Завдяки низькому рівню виявлення, його важко підбити, якщо діяти швидко.
  </p>

  <p>
    <strong>Середній дрон</strong> — універсальний варіант із збалансованими показниками.
    Він може нести більше бомб, має вищу міцність і середню швидкість. Його легше виявити,
     але він здатен виконувати більшість
    завдань: атакувати техніку, скидати касетні боєприпаси або проводити мінування в тилу.
  </p>

  <p>
    <strong>Великий дрон</strong> — повітряна платформа з величезним запасом боєприпасів.
    Водночас це найповільніший , найпомітніший, і найвразливіший дрон.
    Він підходить для масового мінування або для масового бомбардування ворогів, які не можуть відстрілюватись.
      </p>

  <p>
    Характеристики дронів включають <strong>швидкість</strong>, <strong>міцність</strong> (HP),
    <strong>помітність</strong>,
    <strong>вантажопідйомність</strong> (кількість і вага бомб) та <strong>час перезарядки</strong>
     після вичерпання боєзапасу.
    Їх можна покращувати за допомогою апгрейдів у міжмісійних екранах.
  </p>`,
    fragBombText: `p>
  <strong>Уламкова бомба</strong> — це базовий тип боєприпасу в <strong>dronETerra</strong>,
  призначений для боротьби з піхотою.  При детонації створює велику кількість уламків, що розлітаються в радіусі
  7м. Що ближче до центру вибуху, то більше імовірність враження. Не зачіпає ворогів що повзають., крім прямого попадання.
</p>
<p>
  Уламкова бомба має малу вагу, займає небагато місця в дроні та не потребує високої точності —
  достатньо влучити поблизу, аби знищити групу піхоти або екіпаж поза технікою.
  Водночас вона малоефективна проти неброньованої техніки, а проти броньованої — взагалі неефективна.
</p>
<p>
  Це універсальна зброя на ранніх етапах гри, особливо ефективна проти скупчень ворога. Не рекомендується скидати
  їх швидко одну за одною, оскільки після першого вибуху вороги заляжуть, і наступні бомби не завдадуть значної шкоди.
</p>`,
    fragBombTitle: "Уламкова бомба",
    heBombTitle: "Фугасна бомба",
    shapedBombTitle: "Кумулятивна бомба",
    apMineTitle: "Протипіхотна міна",
    tankMineTitle: "Фугасна міна",
    magnetMineTitle: "Магнітна міна",
    clusterBombTitle: "Касетна бомба",
    shapedClusterBombTitle: "ПТ касетна бомба",
    heBombText: `<p>
  <strong>Фугасна бомба</strong> — споряджений вибухівкою боєприпас у <strong>dronETerra</strong>, призначений для ураження
  легкої техніки та піхоти. При підриві створює сильну ударну хвилю й вибухову дію, здатну знищити піхоту, неброньовану та легкоброньовану
  техніку навіть без прямого попадання. Знищує піхоту в радіусі 2,5 метра незалежно чи вона лежить чи стоїть.
</p>
<p>
  На відміну від уламкової, фугасна бомба має більшу масу, займає більше місця в дроні, але є багатофункціональною —
  може знищити як піхоту, так і легку техніку.
</p>
`,
    shapedBombText: `<p>
  <strong>Кумулятивна бомба</strong> — спеціалізований боєприпас у <strong>dronETerra</strong>, призначений для ураження
  бронетехніки. Після детонації створює вузький струмінь надвисокої температури, здатний пробити навіть товсту броню.
</p>
<p>
  У грі використовується ймовірнісна система пробиття: кожна броньована ціль має рівень <strong>броні</strong>, а кумулятивна бомба — параметр
  <strong>бронепробиття</strong>. Щоб пробити броню, гра виконує кілька перевірок — одна на кожен рівень захисту.
  Якщо всі проходять успішно — ціль підпалюється та знищується.
<p>
Наприклад, для броні 1 і бронебійності = 0.9, шанс  пробиття буде  90%.
    Для броні 3 і бронебійності = 0.9, шанс  пробиття буде 0,9*0,9*0,9, близько 73%.
</p>`,
    apMineText: `<p>
  <strong>Протипіхотна міна</strong> — малопомітний вибуховий пристрій у <strong>dronETerra</strong>, призначений для
  ураження ворожої піхоти. Встановлюється дронами на будь-якій ділянці карти, після чого стає невидимою
  для ворогів до моменту спрацювання.
</p>
<p>
  Міна активується, коли піхотинець заходить у її радіус дії, та завдає критичної шкоди — миттєво знищуючи ціль.
  Має невеликий шанс зупинити неброньовану техніку, пошкодивши її колеса. Інша техніка просто знищує міну коли наїжджає на неї без шкоди для себе.
</p>
<p>
  Через малу вагу займає мінімум місця у дроні, дозволяючи закладати багато мін за один виліт.
  Ідеальна для оборони, засідок і затримки ворожого просування.
</p>`,
    tankMineText: `<p>
  <strong>Фугасна міна</strong> — важкий вибуховий пристрій у <strong>dronETerra</strong>, спеціально призначений
  для ураження ворожої техніки. Встановлюється дронами і активується лише при наїзді машин — піхота може проходити
  повз без наслідків. Після удосконалення може активуватися і від піхоти, хоча це не є її основним призначенням.
</p>
<p>
  Міна завдає значної шкоди неброньованим і легкоброньованим машинам, знищуючи або підриваючи їх. Проти
  сучасних танків має малу ефективність.
</p>
<p>
  Через велику масу займає більше місця в дроні, тому потребує стратегічного використання.
  Ідеально підходить для знищення наступаючих засобів ППО, до яких небезпечно підлетіти.
</p>
`,
    magnetMineText: `<p>
<strong>Магнітна міна</strong> — важкий протитанковий боєприпас у <strong>dronETerra</strong>, призначений для
знищення найціннішої ворожої техніки. Вона автоматично реагує на наближення <strong>металевих цілей</strong> —
зокрема бронетехніки, і не потребує прямого контакту з гусеницею чи колесами.
</p>
<p>
Після активації вона генерує <strong>кумулятивний струмінь</strong>, який пробиває днище машини знизу —
це одна з найвразливіших зон для більшості бойових машин. Від удару техніка зазвичай миттєво знищується або спалахує.
</p>
<p>
Через велику вагу міна займає значний об’єм у дроні, тому її застосування варто обдумувати наперед.
Ідеально підходить для знищення особливо важливих або небезпечних цілей.
</p>`,
    clusterBombText: `<p>
  <strong>Касетна бомба</strong> — боєприпас у <strong>dronETerra</strong>, що розривається в повітрі та
  вивільняє <strong>від 7 до 13 менших суббоєприпасів</strong>, які охоплюють велику площу.
  Основне призначення — знищення скупчень ворожої піхоти або легкої техніки, розташованої на великій території.
</p>
<p>
  Завдяки розсіюванню уламків, касетна бомба ефективна навіть при неточному скиданні —
  Корисна для знищення скупчень ворога без можливості зупинитись і прицільно влучити.
</p>
<p>
  Має велику вагу та займає більше місця, ніж звичайна фугасна, але може завдати більше шкоди.
  Недоліком є менша ефективність проти середньої та важкої бронетехніки.
</p>`,
    shapedClusterBombText: `<p>
  <strong>ПТ касетна бомба</strong> — спеціалізований боєприпас у <strong>dronETerra</strong>,
  який розривається в повітрі та випускає <strong>7-13 кумулятивних суббоєприпасів</strong>.
  На відміну від звичайної касетної, цей тип призначений для боротьби з бронетехнікою.
</p>
<p>
  Кожен суббоєприпас має бронебійні властивості та може пробити легку або середню броню,
  викликаючи підпал і вивід техніки з ладу. Завдяки розсіюванню, бомба охоплює кілька цілей одночасно,
  що робить її ефективною проти скупчень бронетехніки.
</p>
<p>
  Висока вага обмежує кількість таких бомб, які можна взяти на один виліт.
  Це зброя для точкових ударів по групах техніки — дозволяє вразити кілька цілей одним скиданням.
</p>`,
  },
  en: {
    infoTitle: "Game Information",
    game: "Gameplay",
    mechanics: "Mechanics",
    drones: "Drones",
    ammo: "Ammunition",
    enemies: "Enemies",
    back: "Back",
    gameTitle: "Game Overview",
    mechanicsTitle: "Game Mechanics",
    ap: "Armor Penetration",
    visibility: "Drone Visibility",
    droneFire: "Fire at Drone",
    bombarding: "Bomb Dropping",
    mines: "Mining",
    dronesTitle: "Drone Information",
    ammoTitle: "Ammunition Information",
    enemiesTitle: "Enemy Information",

    fragBomb: `<div class="fragBomb_image_small"></div> Fragmentation Bomb`,
    heBomb: `<div class="heBomb_image_small"></div> High-Explosive Bomb`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Shaped Charge Bomb`,
    apMine: `<div class="footMine_image_small"></div> Anti-Personnel Mine`,
    tankMine: `<div class="tankMine_image_small"></div> Anti-Tank Mine`,
    magnetMine: `<div class="magnetMine_image_small"></div> Magnetic Mine`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Cluster Bomb`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> AT Cluster Bomb`,

    name: "Name",
    armor: "Armor",
    speed: `shots<br />per sec`,
    campaignPoints: `points<br />campaign`,
    lastStandPoints: `points<br />last stand`,

    rifleman: "Rifleman",
    machinegunner: "Machine Gunner",
    grenadier: "Grenadier",
    crew: "Crew",

    ural: "Ural",
    uralSupply: `Ural<br />Supply`,
    gaz66: "GAZ-66",
    uaz452: "UAZ-452",
    jeep: "Pickup",
    guntruck: `Pickup with<br />Machine Gun`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT-LB",
    mtlbKPVT: `MT-LB with<br />KPVT Gun`,
    mtlbzu23: `MT-LB with<br />ZU-23 Cannon`,
    btr82: "BTR-82",
    bmp1: "BMP-1",
    bmp2: "BMP-2",
    bmp3: "BMP-3",
    bukM2: "Buk-M2",
    shilka: "Shilka",
    msta: `Self-Propelled<br />Howitzer`,
    t55: "T-55",
    t62: "T-62",
    t72: "T-72",
    t72B3: "T-72B3",
    t90: "T-90",
    gameText: `<p>
    <strong>dronETerra</strong> is a tactical game where you control armed drones
    on a battlefield filled with enemy vehicles and infantry. Carefully choose your drones,
    equip them with various bombs, and plan your attack to maximize destruction
    while minimizing losses. <strong>Precision and timing are everything</strong> — one wrong move can cost you the mission.
  </p>

  <p>
    Each drone can carry several types of weapons: from high-explosive bombs and foot mines
    to advanced cluster munitions and armor-piercing charges. The battlefield is constantly evolving —
    enemy reinforcements, armored convoys, and supply trucks make every mission unique and challenging.
    You must quickly assess the situation and adapt your tactics in real time.
  </p>

  <p>
    Between missions, you can upgrade your drones, unlock new equipment, and optimize your loadout
    for the threats ahead. <strong>Every upgrade matters</strong>: more damage, better speed, or wider blast radius
    can tip the balance in your favor. Choose wisely — you can’t equip everything at once.
  </p>

  <p>
    The game features a campaign with handcrafted missions and an endless <em>“Last Stand”</em> mode
    where survival depends on skill and smart resource management. With every wave, enemies grow stronger —
    only the best-prepared will prevail. <strong>Are you ready to command the skies?</strong>
  </p>`,
    apText: `<p>
    <strong>dronETerra</strong> uses a probabilistic armor penetration system that simulates the difficulty of damaging armored vehicles.
    Each armored target has a numeric <strong>armor</strong> value, representing its resistance to penetration.
    Every armor-piercing munition has a <strong>penetration chance</strong> — the probability of successfully penetrating one unit of armor.
  </p>
  <p>
    When a target is hit, the game performs <strong>multiple independent checks</strong> — one for each point of armor.
    To achieve penetration, all of these checks must succeed.
    For example, with armor = 1 and penetration chance = 0.9, the probability of penetration is 90%.
    For armor = 3 and penetration chance = 0.9, the overall chance is 0.9 × 0.9 × 0.9, or about 73%.
  </p>
  <p>
    If penetration is successful, the target is set on fire and becomes disabled.
    If even one check fails, the munition does not penetrate, and no effect is applied.
    This encourages players to choose the appropriate weapon types for specific enemy vehicles.
  </p>`,
    visibilityText: ` <p>
    <strong>dronETerra</strong> features a dynamic enemy detection system for drones.
    The chance of a drone being spotted depends not only on its distance to the enemy,
    but also on its <strong>size</strong> and recent <strong>combat activity</strong>.
  </p>
  <p>
    Each drone has a base <strong>visibility</strong> level determined by its physical size:
    larger drones are detected more easily, while smaller ones are harder to notice.
    However, recent activity plays a crucial role — each time a bomb is dropped,
    the drone’s visibility temporarily increases. The more munitions dropped in a short time,
    the higher the risk of being detected. This effect accumulates, but gradually fades over time.
  </p>`,
    apTitle: "Armor Penetration Information",
    visibilityTitle: "Drone Visibility Information",
    droneFireTitle: "Drone Fire Information",
    bombardingTitle: "Bomb Dropping Information",
    minesTitle: "Mine Information",
    droneFireText: ` <p>
    <strong>dronETerra</strong> features a drone targeting system that takes into account the drone’s
    <strong>size</strong>, <strong>speed</strong>, and <strong>enemy characteristics</strong>.
    Each enemy unit has a defined <strong>rate of fire</strong> (shots per second)
    and periodically attempts to hit the drone when it enters its engagement zone.
  </p>
  <p>
    The chance to hit decreases as the drone’s speed increases and is lower for smaller models —
    fast and small drones are harder to hit, while stationary ones are easy targets.
    Enemies with a high rate of fire have more opportunities to deal damage over time.
  </p>
  <p>
    A successful hit reduces the drone’s <strong>health points</strong>.
    When health reaches zero, the drone is destroyed.
    This encourages the player to avoid hovering over enemy clusters
    and to carefully manage their exposure and risk. Survival depends on cautious movement and tempo.
  </p>`,
    bombardingText: `<p>
    In <strong>dronETerra</strong>, bomb dropping is a core combat mechanic that requires precision,
    planning, and awareness of the drone's movement.
    A bomb falls straight down if released from a stationary drone.
    However, if dropped in motion, it will shift in the direction of the drone’s travel,
    and the player must account for this when aiming.
  </p>
  <p>
    Each drone has a limited <strong>payload capacity</strong> and can carry a different number of bombs
    depending on its type and equipment. Dropping a bomb reduces the current ammo count.
    Once all bombs are used, the drone must undergo an <strong>automatic reload</strong>,
    which takes a few seconds before it can bomb again.
  </p>
  <p>
    This mechanic forces the player to aim carefully, avoid wasting bombs, and choose the right moment to strike.
    Success depends not only on how many bombs you carry but on how effectively you use them.
  </p> `,
    minesText: `<p>
    In <strong>dronETerra</strong>, mines are a strategic type of ammunition that don’t cause immediate damage,
    but instead create deadly traps on the battlefield. The player can drop a mine at any point during flight,
    and it will remain at the location where it landed. Mines do not explode on impact —
    they are triggered when an enemy unit comes close.
  </p>
  <p>
    There are several types of mines: anti-personnel, anti-tank, magnetic, and more.
    Each type has different trigger conditions, blast radius, and effectiveness against specific targets.
    For example, an anti-tank mine won’t trigger from infantry, but can destroy heavy vehicles in one blast.
  </p>
  <p>
    Once triggered, the mine detonates automatically, dealing damage within its blast area.
    Enemies caught in the explosion will be damaged or destroyed.
    This allows players to block routes, ambush convoys, and establish defensive zones
    with minimal risk to their drones.
  </p> `,
    dronesText: `<p>
    In <strong>dronETerra</strong>, players have access to three drone classes: <strong>small</strong>,
    <strong>medium</strong>, and <strong>large</strong>.
    Each type has unique characteristics that define its role on the battlefield — from fast raids
    to large-scale bombardments.
  </p>

  <p>
    The <strong>small drone</strong> is lightweight and agile, with the highest speed and lowest visibility.
    Its payload is limited and durability is low, but it is ideal for precision strikes and for taking out
    the most powerful air defense systems. Thanks to its low detection level, it's hard to hit if used quickly and smartly.
  </p>

  <p>
    The <strong>medium drone</strong> is a balanced option with solid all-around stats.
    It carries more bombs, has better durability, and moves at a moderate speed.
    It's easier to detect than the small drone but can handle most tasks — attacking vehicles,
    dropping cluster bombs, or laying mines behind enemy lines.
  </p>

  <p>
    The <strong>large drone</strong> is a flying platform with a massive bomb reserve.
    However, it is the slowest, most visible, and most vulnerable drone.
    It's best used for large-scale minelaying or bombing operations against enemies that cannot return fire.
  </p>

  <p>
    Drone characteristics include <strong>speed</strong>, <strong>durability</strong> (HP),
    <strong>visibility</strong>, <strong>payload capacity</strong> (number and weight of bombs),
    and <strong>reload time</strong> after exhausting its ammunition.
    These stats can be upgraded between missions using the upgrade system.
  </p>`,
    fragBombText: `<p>
  <strong>Fragmentation Bomb</strong> is a basic type of ammunition in <strong>dronETerra</strong>,
  designed for fighting infantry. Upon detonation, it releases a large number of fragments
  that spread within a 7-meter radius. The closer to the center of the explosion, the higher the chance of damage.
  It does not affect crawling enemies unless hit directly.
</p>
<p>
  The fragmentation bomb is lightweight, takes up little drone capacity, and does not require high accuracy —
  hitting near a target is enough to eliminate a group of infantry or dismounted crew.
  However, it is ineffective against unarmored vehicles and completely useless against armored ones.
</p>
<p>
  This is a versatile early-game weapon, especially effective against enemy clusters.
  It is not recommended to drop multiple bombs quickly in a row, as enemies will go prone after the first explosion,
  reducing the effectiveness of subsequent blasts.
</p>`,
    fragBombTitle: "Fragmentation Bomb",
    heBombTitle: "High-Explosive Bomb",
    shapedBombTitle: "Shaped Charge Bomb",
    apMineTitle: "Anti-Personnel Mine",
    tankMineTitle: "Anti-Tank Mine",
    magnetMineTitle: "Magnetic Mine",
    clusterBombTitle: "Cluster Bomb",
    shapedClusterBombTitle: "AT Cluster Bomb",
    heBombText: `<p>
  <strong>High-Explosive Bomb</strong> is an explosive-filled munition in <strong>dronETerra</strong>,
  designed to destroy infantry and light vehicles. Upon detonation, it generates a powerful shockwave and blast effect
  capable of eliminating infantry, unarmored, and lightly armored vehicles even without a direct hit.
  It kills infantry within a 2.5-meter radius regardless of whether they are standing or prone.
</p>
<p>
  Unlike the fragmentation bomb, the high-explosive bomb has greater weight and takes up more space in the drone,
  but it is highly versatile — capable of destroying both infantry and light vehicles.
</p>`,
    shapedBombText: `<p>
<strong>Shaped Charge Bomb</strong> is a specialized munition in <strong>dronETerra</strong>, designed to destroy
armored vehicles. Upon detonation, it generates a focused jet of extreme heat capable of penetrating even thick armor.
</p>
<p>
The game uses a probabilistic armor penetration system: each armored target has a <strong>armor level</strong>, and the shaped bomb has a
<strong>penetration chance</strong>. To penetrate the armor, the game performs several checks — one for each armor point.
If all checks are successful, the target is ignited and destroyed.
</p>
<p>
For example, with armor = 1 and penetration = 0.9, the chance of success is 90%. 
With armor = 3 and penetration = 0.9, the chance becomes 0.9 × 0.9 × 0.9 ≈ 73%.
</p>`,
    apMineText: `<p>
<strong>Anti-personnel mine</strong> is a low-visibility explosive device in <strong>dronETerra</strong>,
designed to eliminate enemy infantry. It is deployed by drones anywhere on the map and becomes invisible
to enemies until triggered.
</p>
<p>
The mine activates when an enemy soldier enters its trigger radius, dealing critical damage and instantly
killing the target. It has a small chance to stop unarmored vehicles by damaging their wheels.
Other vehicles simply destroy the mine when driving over it, without taking damage.
</p>
<p>
Due to its light weight, it takes up very little drone capacity, allowing multiple mines to be deployed
in a single flight. Ideal for defense, ambushes, and slowing down enemy advances.
</p>`,
    tankMineText: `<p>
<strong>HE Mine</strong> is a heavy explosive device in <strong>dronETerra</strong>, specifically designed
to damage enemy vehicles. It is deployed by drones and only activates when driven over by vehicles —
infantry can pass by safely. After upgrades, it can be triggered by infantry as well, but that is not its primary role.
</p>
<p>
The mine deals significant damage to unarmored and lightly armored vehicles, destroying or disabling them.
Against modern tanks, however, its effectiveness is limited.
</p>
<p>
Due to its high weight, it occupies more drone capacity, requiring strategic use.
It is ideal for destroying advancing air defense systems that are too dangerous to approach directly.
</p>`,
    magnetMineText: `<p>
  The <strong>Magnetic Mine</strong> is a heavy anti-tank munition in <strong>dronETerra</strong>, designed to eliminate
  the most valuable enemy vehicles. It automatically triggers when <strong>metallic targets</strong> — especially armored vehicles —
  come near, without requiring direct contact with treads or wheels.
</p>
<p>
  Upon activation, it emits a <strong>shaped-charge jet</strong> that pierces the underside of the vehicle —
  one of the weakest and most vulnerable areas. The resulting damage usually destroys or ignites the target instantly.
</p>
<p>
  Due to its high weight, the mine takes up a significant portion of a drone's payload, so its deployment must be carefully planned.
  It is ideal for eliminating high-value or heavily defended targets such as SAM systems or command vehicles.
</p>`,
    clusterBombText: `<p>
The <strong>Cluster Bomb</strong> in <strong>dronETerra</strong> is an aerial munition that bursts mid-air,
releasing <strong>7–13 smaller submunitions</strong> that cover a wide area.
Its primary purpose is to eliminate groups of enemy infantry or light vehicles spread across open terrain.
</p>
<p>
Due to the wide dispersal pattern, the cluster bomb is effective even with inaccurate drops —
it is especially useful for targeting enemy concentrations when the drone can’t afford to stop and aim precisely.
</p>
<p>
It has a high weight and takes up more drone capacity than a standard HE bomb, but it can deal significantly more total damage.
Its main drawback is low effectiveness against medium and heavy armored targets.
</p>`,
    shapedClusterBombText: `<p>
The <strong>Shaped-Charge Cluster Bomb</strong> is a specialized munition in <strong>dronETerra</strong>
that detonates mid-air, releasing <strong>7–13 armor-piercing submunitions</strong>.
Unlike standard cluster bombs, this variant is designed specifically to counter armored vehicles.
</p>
<p>
Each submunition has penetration capabilities and can pierce light to medium armor,
causing ignition and disabling the vehicle. Thanks to their dispersal pattern,
the bomb can hit multiple targets at once, making it highly effective against vehicle groups.
</p>
<p>
Its high weight limits the number of bombs a drone can carry per sortie.
It is a precision weapon meant for concentrated strikes against armored formations,
capable of neutralizing several threats with a single drop.
</p>`,
  },
  de: {
    infoTitle: "Spielinformationen",
    game: "Spielverlauf",
    mechanics: "Mechaniken",
    drones: "Drohnen",
    ammo: "Munition",
    enemies: "Gegner",
    back: "Zurück",
    gameTitle: "Spielüberblick",
    mechanicsTitle: "Spielmechaniken",
    ap: "Panzerungsdurchschlag",
    visibility: "Drohnen-Sichtbarkeit",
    droneFire: "Feuer auf Drohne",
    bombarding: "Bombenabwurf",
    mines: "Minensystem",
    dronesTitle: "Informationen zu Drohnen",
    ammoTitle: "Informationen zur Munition",
    enemiesTitle: "Informationen zu Gegnern",

    fragBomb: `<div class="fragBomb_image_small"></div> Splitterbombe`,
    heBomb: `<div class="heBomb_image_small"></div> Hochexplosive Bombe`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Hohlladung`,
    apMine: `<div class="footMine_image_small"></div> Antipersonenmine`,
    tankMine: `<div class="tankMine_image_small"></div> Panzerabwehrmine`,
    magnetMine: `<div class="magnetMine_image_small"></div> Magnetmine`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Streubombe`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> AT‑Streubombe`,

    name: "Name",
    armor: "Panzerung",
    speed: `Schüsse<br />pro Sek.`,
    campaignPoints: `Punkte<br />Kampagne`,
    lastStandPoints: `Punkte<br />Letzter Stand`,

    rifleman: "Infanterist",
    machinegunner: "Maschinengewehrschütze",
    grenadier: "Granatwerfer",
    crew: "Besatzung",

    ural: "Ural",
    uralSupply: `Ural<br />Versorgung`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Pick‑up mit<br />MG`,
    jeep: `Pick‑up`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB mit<br />KPVT MG`,
    mtlbzu23: `MT‑LB mit<br />ZU‑23 Flak`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Panzerhaubitze`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong> ist ein taktisches Spiel, in dem du bewaffnete Drohnen auf einem Schlachtfeld mit feindlichen Fahrzeugen und Infanterie steuerst. Wähle deine Drohnen sorgfältig, rüste sie mit verschiedenen Bomben aus und plane deinen Angriff, um maximale Zerstörung bei minimalen Verlusten zu erzielen. <strong>Präzision und Timing zählen</strong> – ein Fehler kann die Mission kosten.
    </p>
  
    <p>
      Jede Drohne kann mehrere Waffentypen tragen: von hochexplosiven Bomben und Antipersonenminen bis hin zu fortgeschrittenen Streubomben und Hohlladungen. Das Schlachtfeld entwickelt sich ständig weiter – feindliche Verstärkungen, gepanzerte Konvois und Versorgungstransporter machen jede Mission einzigartig und herausfordernd. Du musst dich schnell anpassen.
    </p>
  
    <p>
      Zwischen den Missionen kannst du deine Drohnen aufrüsten, neue Ausrüstung freischalten und die optimale Ausrüstung für die bevorstehenden Bedrohungen zusammenstellen. <strong>Jeder Fortschritt zählt</strong>: mehr Schaden, höhere Geschwindigkeit oder größere Explosionsradius können den Unterschied machen. Wähle weise – du kannst nicht alles gleichzeitig mitnehmen.
    </p>
  
    <p>
      Das Spiel bietet eine Kampagne mit sorgfältig gestalteten Missionen und einen endlosen „Last Stand“-Modus, in dem Überleben von Können und Ressourcenmanagement abhängt. Mit jeder Welle werden die Gegner stärker – nur die Besten bestehen. <strong>Bist du bereit, den Himmel zu beherrschen?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong> nutzt ein probabilistisches Panzerungsdurchschlagsystem, das die Schwierigkeit der Zerstörung gepanzerter Fahrzeuge nachahmt. Jede gepanzerte Einheit hat einen numerischen <strong>Panzerschutzwert</strong>, der ihre Widerstandsfähigkeit repräsentiert. Jede panzerbrechende Munition besitzt eine <strong>Durchschlagschance</strong> – die Wahrscheinlichkeit, eine Panzerungseinheit erfolgreich zu durchdringen.
    </p>
    <p>
      Wenn ein Ziel getroffen wird, führt das Spiel <strong>mehrere unabhängige Prüfungen</strong> durch – jeweils eine pro Panzerungsstufe. Um eine Durchdringung zu erzielen, müssen alle Tests erfolgreich sein.
    </p>
    <p>
      Beispiel: Bei einer Panzerstufe von 1 und einer Durchschlagschance von 0,9 beträgt die Durchdringung 90 %. Bei einer Panzerstufe von 3 beträgt die Gesamtchance etwa 0,9×0,9×0,9 ≈ 73 %.
    </p>
    <p>
      Gelingt der Durchschlag, wird das Ziel in Brand gesetzt und kampfunfähig. Scheitert auch nur eine Prüfung, dringt die Munition nicht durch – kein Effekt. Das System fordert den Spieler heraus, die richtige Waffe gegen passende Fahrzeugtypen zu wählen.
    </p>`,

    visibilityText: `<p>
      <strong>dronETerra</strong> verfügt über ein dynamisches Erkennungssystem für Drohnen durch Feinde. Die Wahrscheinlichkeit, entdeckt zu werden, hängt nicht nur von der Entfernung zum Feind ab, sondern auch von der <strong>Größe der Drohne</strong> und kürzlichen <strong>Gefechtsaktivitäten</strong>.
    </p>
    <p>
      Jede Drohne hat einen Basis‑<strong>Sichtbarkeitswert</strong>, der von ihrer Größe abhängt: Große Drohnen werden schneller entdeckt, Kleine seltener. Kampfhandlungen erhöhen die Sichtbarkeit kurzfristig – jeder Bombenabwurf erhöht das Risiko. Je mehr Munition in kurzer Zeit abgeworfen wird, desto höher das Risiko. Dieser Effekt baut sich auf, verliert aber allmählich an Wirkung.
    </p>`,

    droneFireText: `<p>
      <strong>dronETerra</strong> nutzt ein Zielsystem, das die Drohnengröße, -geschwindigkeit und gegnerische Eigenschaften berücksichtigt. Jede feindliche Einheit hat eine definierte <strong>Feuerrate</strong> (Schüsse pro Sekunde) und versucht periodisch, die Drohne in Reichweite zu treffen.
    </p>
    <p>
      Die Treffwahrscheinlichkeit sinkt bei höherer Drohnengeschwindigkeit und kleineren Modellen – schnelle, kleine Drohnen sind schwerer zu treffen. Stationäre Drohnen sind leichte Beute. Gegner mit hoher Feuerrate haben mehr Trefferchancen pro Zeiteinheit.
    </p>
    <p>
      Ein Treffer reduziert die <strong>Gesundheitspunkte</strong> der Drohne. Wenn diese auf null sinken, wird die Drohne zerstört. Das System fordert den Spieler, nicht über feindlichen Gruppen zu verharren, sondern Tempo und Risiken abzuwägen.
    </p>`,

    bombardingText: `<p>
      In <strong>dronETerra</strong> ist der Bombenabwurf ein zentraler Kampfmechanismus, der Präzision, Planung und Flugverhalten berücksichtigt. Wird die Bombe aus einer stationären Drohne abgeworfen, fällt sie senkrecht. In Bewegung wird die Flugbahn beeinflusst – der Spieler muss das beim Zielen berücksichtigen.
    </p>
    <p>
      Jede Drohne hat eine begrenzte <strong>Nutzlastkapazität</strong> und trägt je nach Typ und Ausstattung unterschiedlich viele Bomben. Der Abwurf reduziert den aktuellen Munitionsvorrat. Nach Verbrauch aller Bomben erfolgt ein <strong>automatischer Nachladevorgang</strong>, der einige Sekunden dauert.
    </p>
    <p>
      Dieses System zwingt den Spieler, genau zu zielen, Bomben nicht zu verschwenden und den richtigen Zeitpunkt für den Angriff zu wählen. Der Erfolg hängt nicht nur von der Bombenmenge, sondern auch von deren effektivem Einsatz ab.
    </p>`,
    minesText: `<p>
    In <strong>dronETerra</strong> sind Minen eine strategische Munitionsart, die keinen sofortigen Schaden verursacht,
    sondern Fallen auf dem Schlachtfeld platziert. Der Spieler kann jederzeit im Flug eine Mine abwerfen,
    die an der Stelle liegen bleibt, an der sie auftrifft. Minen explodieren nicht sofort, sondern werden ausgelöst, sobald
    sich eine feindliche Einheit nähert.
  </p>
  <p>
    Es gibt verschiedene Minentypen: Antipersonen-, Antipanzerminen, Magnetminen usw.
    Sie haben unterschiedliche Auslösebedingungen, Wirkungsradien und Effektivität gegen bestimmte Ziele.
    Zum Beispiel wird eine Antipanzer-Mine nicht durch Fußtruppen aktiviert, kann aber schwere Fahrzeuge in einem Schlag zerstören.
  </p>
  <p>
    Einmal ausgelöst, explodiert die Mine automatisch und verursacht Schaden im Wirkungsbereich.
    Feinde im Explosionsradius erleiden Schaden oder werden zerstört.
    Dadurch kann der Spieler Routen blockieren, Hinterhalte legen und Verteidigungspositionen
    mit minimalem Risiko für seine Drohnen errichten.
  </p>`,

    dronesText: `<p>
    In <strong>dronETerra</strong> stehen dem Spieler drei Drohnenklassen zur Verfügung: <strong>kleine</strong>,
     <strong>mittlere</strong> und <strong>große</strong>.
    Jeder Typ hat einzigartige Eigenschaften, die seine Rolle auf dem Schlachtfeld definieren – von schnellen
    Überfällen bis zu massiven Bombardements.
  </p>

  <p>
    Die <strong>kleine Drohne</strong> ist leicht und wendig, mit höchster Geschwindigkeit und geringster Sichtbarkeit.
    Ihre Nutzlast ist begrenzt, und sie verfügt über wenig Lebenspunkte, doch sie ist ideal für Präzisionsschläge
    und das Ausschalten leistungsfähiger Luftabwehrsysteme.
    Dank ihrer niedrigen Erkennung ist sie schwer zu treffen, wenn sie schnell und geschickt gesteuert wird.
  </p>

  <p>
    Die <strong>mittlere Drohne</strong> ist ein ausgewogener Kompromiss mit soliden Eckwerten.
    Sie trägt mehr Bomben, ist widerstandsfähiger und bewegt sich moderat schnell.
    Sie wird leichter entdeckt als die kleine Drohne, kann aber die meisten Aufgaben bewältigen:
    Fahrzeugangriffe, Abwurf von Streubomben oder Mineneinsatz hinter feindlichen Linien.
  </p>

  <p>
    Die <strong>große Drohne</strong> ist eine fliegende Plattform mit massivem Bombenvorrat.
    Sie ist jedoch die langsamste, sichtbarste und verwundbarste Drohne.
    Sie eignet sich am besten für großflächige Minenlegung oder Bombardements gegen Gegner, die nicht zurückschießen können.
  </p>

  <p>
    Eigenschaften der Drohnen umfassen <strong>Geschwindigkeit</strong>, <strong>Lebenspunkte</strong> (HP),
    <strong>Sichtbarkeit</strong>, <strong>Nutzlastkapazität</strong> (Anzahl und Gewicht der Bomben) und <strong>Nachladezeit</strong>
    nach Verbrauch der Munition.
    Diese Werte können zwischen den Missionen über das Upgrade-System verbessert werden.
  </p>`,

    fragBombText: `<p>
  <strong>Splitterschaden-Bombe</strong> ist ein Basistyp der Munition in <strong>dronETerra</strong>,
  der zur Bekämpfung von Infanterie dient. Bei Detonation werden zahlreiche Splitter freigesetzt,
  die sich innerhalb eines 7-Meter-Radius verteilen. Je näher am Explosionszentrum, desto höher die Schadenswahrscheinlichkeit.
  Kriechende Feinde werden nur bei direktem Treffer getroffen.
</p>
<p>
  Die Splitter-Bombe ist leicht, belegt wenig Drohnenkapazität und erfordert keine hohe Zielgenauigkeit:
  ein Treffer in die Nähe reicht aus, um eine Infanterieeinheit oder Besatzung zu eliminieren.
  Sie ist jedoch wirkungslos gegen ungeschützte Fahrzeuge und völlig ineffektiv gegen gepanzerte Einheiten.
</p>
<p>
  Dies ist eine vielseitige Waffe für frühe Spielphasen, besonders effektiv gegen feindliche Truppenkonzentrationen.
  Es wird nicht empfohlen, mehrere Bomben schnell hintereinander abzusetzen:
  Nach der ersten Explosion ducken sich Feinde, sodass Folgende weniger Wirkung zeigen.
</p>`,

    fragBombTitle: "Splitterschaden-Bombe",
    heBombTitle: "Sprengbombe",
    shapedBombTitle: "Hohlladungsbombe",
    apMineTitle: "Antipersonen-Mine",
    tankMineTitle: "Antipanzer-Mine",
    magnetMineTitle: "Magnetmine",
    clusterBombTitle: "Streubombe",
    shapedClusterBombTitle: "AT-Streubombe",

    heBombText: `<p>
  <strong>Sprengbombe</strong> ist ein explosives Projektil in <strong>dronETerra</strong>,
  das zur Zerstörung von Infanterie und leichten Fahrzeugen konzipiert ist. Bei Explosion erzeugt sie eine starke Druckwelle
  und Blastwirkung, die Infanterie, ungeschützte und leicht gepanzerte Fahrzeuge auch ohne direkten Treffer zerstören kann.
  Sie tötet Infanterie in einem Radius von 2,5 Metern, unabhängig von deren Stellung.
</p>
<p>
  Im Gegensatz zur Splitterbombe ist diese Bombe schwerer, nimmt mehr Kapazität ein, ist jedoch vielseitig einsetzbar –
  sie kann sowohl Infanterie als auch leichte Fahrzeuge vernichten.
</p>`,

    shapedBombText: `<p>
  <strong>Hohlladungsbombe</strong> ist eine spezialisierte Waffe in <strong>dronETerra</strong>,
  die zur Bekämpfung gepanzerter Fahrzeuge dient. Beim Abladen erzeugt sie einen fokussierten Strahl extremer Hitze,
  der selbst dicke Panzerung durchdringen kann.
</p>
<p>
  Das Spiel nutzt ein probabilistisches Durchschlagssystem: Jeder gepanzerte Gegner besitzt einen
  <strong>Panzerschutz-Wert</strong>, während die Hohlladungsbombe eine <strong>Durchschlagschance</strong> hat.
  Der Durchbruch erfolgt, wenn alle Prüfungen für die Panzerung erfolgreich sind.
  Beispiel: Schutz = 1, Durchschlagschance = 0,9 → 90 %.
  Schutz = 3, Durchschlagschance = 0,9 → 0,9 × 0,9 × 0,9 ≈ 73 %.
</p>`,

    apMineText: `<p>
  <strong>Antipersonen-Mine</strong> ist ein kaum sichtbarer Sprengkörper in <strong>dronETerra</strong>,
  der gegen feindliche Infanterie eingesetzt wird. Sie wird von Drohnen auf der Karte platziert und bleibt für Feinde unsichtbar,
  bis sie ausgelöst wird.
</p>
<p>
  Die Mine wird aktiviert, wenn ein Soldat in ihren Radius tritt, und verursacht kritischen Schaden – die Einheit wird sofort ausgeschaltet.
  Sie hat eine geringe Chance, ungeschützte Fahrzeuge durch Radschäden zu stoppen.
  Andere Fahrzeuge zerstören die Mine beim Überfahren, ohne selbst Schaden zu nehmen.
</p>
<p>
  Dank ihres geringen Gewichts benötigt sie wenig Drohnenkapazität, sodass mehrere Minen pro Flug abgeworfen werden können.
  Ideal für Verteidigung, Hinterhalte und Verzögerung feindlicher Angriffe.
</p>`,

    tankMineText: `<p>
  <strong>Antipanzer-Mine</strong> ist ein schwerer Sprengkörper in <strong>dronETerra</strong>, speziell entwickelt
  zur Bekämpfung feindlicher Fahrzeuge. Platziert von Drohnen und aktiviert bei Fahrzeugüberfahrt –
  Infanterie kann problemlos darüber laufen.
</p>
<p>
  Die Mine verursacht erheblichen Schaden an ungeschützten und leicht gepanzerten Fahrzeugen,
  zerstört oder deaktiviert diese.
  Gegen moderne Panzer ist ihre Effektivität jedoch begrenzt.
</p>
<p>
  Durch ihr hohes Gewicht benötigt sie viel Kapazität in der Drohne und sollte strategisch eingesetzt werden.
  Sie eignet sich besonders zum Ausschalten herannahender Luftabwehrsysteme, die zu gefährlich und direkt anzugreifen sind.
</p>`,

    magnetMineText: `<p>
  <strong>Magnetmine</strong> ist eine schwere Antipanzer-Mine in <strong>dronETerra</strong>,
  entwickelt zur Zerstörung besonders wertvoller feindlicher Fahrzeuge. Sie wird automatisch aktiviert,
  sobald sich <strong>metallische Ziele</strong> – vor allem gepanzerte Fahrzeuge – nähern, ohne direkten Kontakt mit Rädern oder Ketten.
</p>
<p>
  Nach Auslösung setzt sie einen <strong>Hohlladungsstrahl</strong> frei, der den Unterboden des Fahrzeugs durchdringt –
  einer der verletzlichsten Bereiche. In der Regel wird das Ziel sofort zerstört oder in Brand gesetzt.
</p>
<p>
  Aufgrund ihres Gewichts nimmt sie viel Drohnenkapazität ein, sodass ihr Einsatz gut geplant sein muss.
  Sie eignet sich hervorragend zum Ausschalten hochrangiger oder stark geschützter Ziele wie SAM-Systeme oder Kommandofahrzeuge.
</p>`,

    clusterBombText: `<p>
  Die <strong>Streubombe</strong> in <strong>dronETerra</strong> ist eine Luftwaffe-Munition, die in der Luft detoniert
  und <strong>7–13 kleinere Submunitionen</strong> freisetzt, die ein großes Gebiet abdecken.
  Ihr Hauptzweck ist die Zerstörung von Infanteriegruppen oder leichten Fahrzeugen in offenem Gelände.
</p>
<p>
  Dank ihrer weiten Verteilung ist sie auch bei ungenauen Abwürfen effektiv –
  besonders nützlich beim Abdecken von feindlichen Truppenansammlungen, wenn die Drohne nicht pausieren kann.
</p>
<p>
  Sie ist schwer und belegt mehr Kapazität als eine normale Sprengbombe, kann aber deutlich mehr Schaden verursachen.
  Ihr Hauptnachteil: geringe Wirkung gegen mittlere und schwere Panzerfahrzeuge.
</p>`,

    shapedClusterBombText: `<p>
  Die <strong>AT-Streubombe</strong> ist eine spezialisierte Munition in <strong>dronETerra</strong>, die in der Luft detoniert
  und <strong>7–13 panzerbrechende Submunitionen</strong> freisetzt.
  Im Gegensatz zur Standard–Streubombe ist diese Variante speziell gegen gepanzerte Fahrzeuge entwickelt.
</p>
<p>
  Jede Submunition besitzt Panzerungsdurchschlag-Eigenschaften und kann leichte bis mittlere Panzerung durchdringen,
  Brand verursachen und Fahrzeuge kampfunfähig machen. Aufgrund der Verteilung kann sie mehrere Ziele gleichzeitig treffen,
  was sie gegen gepanzerte Formationen effektiv macht.
</p>
<p>
  Ihr hohes Gewicht begrenzt die Anzahl, die eine Drohne pro Flug mitnehmen kann.
  Sie ist eine Präzisionswaffe für gezielte Angriffe auf Fahrzeuggruppen
  und ermöglicht die Neutralisierung mehrerer Ziele mit einem einzigen Abwurf.
</p>`,
  },
  es: {
    infoTitle: "Información del juego",
    game: "Jugabilidad",
    mechanics: "Mecánicas",
    drones: "Drones",
    ammo: "Munición",
    enemies: "Enemigos",
    back: "Volver",
    gameTitle: "Resumen del juego",
    mechanicsTitle: "Mecánicas del juego",
    ap: "Penetración de armadura",
    visibility: "Visibilidad del dron",
    droneFire: "Fuego al dron",
    bombarding: "Lanzamiento de bombas",
    mines: "Minado",
    dronesTitle: "Información sobre drones",
    ammoTitle: "Información sobre munición",
    enemiesTitle: "Información sobre enemigos",

    fragBomb: `<div class="fragBomb_image_small"></div> Bomba de fragmentación`,
    heBomb: `<div class="heBomb_image_small"></div> Bomba explosiva`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Carga hueca`,
    apMine: `<div class="footMine_image_small"></div> Mina antipersonal`,
    tankMine: `<div class="tankMine_image_small"></div> Mina antitanque`,
    magnetMine: `<div class="magnetMine_image_small"></div> Mina magnética`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Bomba de racimo`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> Bomba AT de racimo`,

    name: "Nombre",
    armor: "Armadura",
    speed: `disparos<br />por seg.`,
    campaignPoints: `puntos<br />campaña`,
    lastStandPoints: `puntos<br />último aliento`,

    rifleman: "Rifleman",
    machinegunner: "Ametrallador",
    grenadier: "Granadero",
    crew: "Tripulación",

    ural: "Ural",
    uralSupply: `Ural<br />Suministro`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Pick‑up con<br />ametralladora`,
    jeep: `Pick‑up`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB con<br />ametralladora KPVT`,
    mtlbzu23: `MT‑LB con<br />cañón ZU‑23`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Obús autopropulsado`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong> es un juego táctico en el que controlas drones armados sobre un campo de batalla con vehículos y tropas enemigas. Elige tus drones con sabiduría, equipa diferentes bombas y planifica tus ataques para maximizar el daño con pérdidas mínimas. <strong>La precisión y el momento lo son todo</strong>: un error puede costarte la misión.
    </p>
  
    <p>
      Cada dron puede transportar varios tipos de munición: desde bombas explosivas y minas antipersonal hasta racimos avanzados y cargas huecas. El campo de batalla evolucionará: refuerzos enemigos, convoyes blindados y camiones de suministro hacen que cada misión sea única y desafiante.
    </p>
  
    <p>
      Entre misiones puedes mejorar tus drones, desbloquear nuevo equipo y optimizar tu carga para las amenazas venideras. <strong>Cada mejora cuenta</strong>: más daño, mayor velocidad o mayor radio de explosión marcan la diferencia. Elige con inteligencia — no puedes llevarlo todo.
    </p>
  
    <p>
      El juego ofrece una campaña con misiones diseñadas cuidadosamente y un modo infinito "Último Aliento", donde la supervivencia depende solo de tu habilidad y gestión de recursos. Con cada oleada los enemigos se fortalecen — solo los mejor preparados prevalecerán. <strong>¿Estás listo para dominar los cielos?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong> utiliza un sistema probabilístico de penetración de armadura que simula la dificultad de dañar vehículos blindados. Cada objetivo blindado tiene un valor numérico de <strong>armadura</strong>, que refleja su resistencia.
      Cada munición perforante tiene una <strong>probabilidad de penetración</strong>, que indica la posibilidad de perforar una capa de blindaje.
    </p>
    <p>
      Al golpear un objetivo, el juego realiza <strong>varias comprobaciones independientes</strong>, una por cada nivel de armadura. Para que la penetración sea efectiva, todas deben tener éxito.
    </p>
    <p>
      Por ejemplo: con armadura 1 y probabilidad 0.9, la penetración es del 90 %. Con armadura 3, la probabilidad total es 0.9×0.9×0.9 ≈ 73 %.
    </p>
    <p>
      Si la penetración es exitosa, el vehículo se incendia y queda inutilizado. Si falla aunque sea una comprobación, no penetra y no ocurre efecto. Esto incita al jugador a elegir la munición adecuada para cada tipo de enemigo.
    </p>`,

    visibilityText: `<p>
      <strong>dronETerra</strong> cuenta con un sistema dinámico de detección de drones por parte del enemigo. La probabilidad de ser detectado depende de la distancia, el <strong>tamaño del dron</strong> y su reciente <strong>actividad de combate</strong>.
    </p>
    <p>
      Cada dron tiene un nivel base de <strong>visibilidad</strong>, según su tamaño: los grandes se detectan más rápido; los pequeños, menos. Pero tras lanzar bombas la visibilidad aumenta temporalmente. Cuantas más bombas sueltas en poco tiempo, mayor es el riesgo. El efecto se acumula y disminuye con el tiempo.
    </p>`,

    droneFireText: `<p>
      <strong>dronETerra</strong> implementa un sistema donde el tamaño, la velocidad del dron y los datos del enemigo determinan el fuego enemigo. Cada unidad enemiga tiene una cadencia de fuego en <strong>disparos por segundo</strong> y dispara si el dron está dentro del alcance.
    </p>
    <p>
      La probabilidad de impacto disminuye con más velocidad y menor tamaño del dron — los drones rápidos y pequeños son más difíciles de golpear. Si estática, es un blanco fácil. Los enemigos de alta cadencia hacen más daño en menos tiempo.
    </p>
    <p>
      Un impacto reduce los <strong>puntos de salud</strong> del dron. Si llegan a cero, es destruido. Esto anima al jugador a no quedarse sobre grupos enemigos, sino a moverse con cautela y ritmo.
    </p>`,

    bombardingText: `<p>
      En <strong>dronETerra</strong>, soltar bombas es una mecánica clave que exige precisión, planificación y tener en cuenta el movimiento del dron. Si se suelta desde un dron estático, la bomba cae verticalmente. Si se suelta en movimiento, su trayectoria se inclina en la dirección del dron.
    </p>
    <p>
      Cada dron tiene una <strong>capacidad de carga</strong> limitada y puede llevar distintas cantidades de bombas según su tipo y equipo. Cada bomba reduce el munición disponible. Al acabarse, el dron recarga <strong>automáticamente</strong> tras unos segundos.
    </p>
    <p>
      Esta mecánica obliga al jugador a apuntar con precisión, no desperdiciar bombas y elegir el momento adecuado para atacar. El éxito no depende solo de cuántas bombas llevas, sino de cuán bien las usas.
    </p>`,
    minesText: `<p>
    En <strong>dronETerra</strong>, las minas son un tipo estratégico de munición que no causa daño inmediato,
    sino que crea trampas en el campo de batalla. El jugador puede soltar una mina en cualquier momento durante el vuelo,
    y esta permanecerá en el lugar donde aterrizó. Las minas no explotan al impactar, sino que se activan cuando
    una unidad enemiga se aproxima.
  </p>
  <p>
    Existen varios tipos de minas: antipersonal, antitanque, magnéticas, etc.
    Cada tipo tiene diferentes condiciones de activación, radio de alcance y efectividad contra objetivos específicos.
    Por ejemplo, una mina antitanque no se activa por infantería, pero puede destruir vehículos pesados de un solo golpe.
  </p>
  <p>
    Una vez activada, la mina detona automáticamente y causa daño dentro de su radio de explosión.
    Los enemigos atrapados en la zona de daño sufren daño o son destruidos.
    Esto permite al jugador bloquear rutas, tender emboscadas y establecer posiciones defensivas
    con mínimo riesgo para sus drones.
  </p>`,

    dronesText: `<p>
    En <strong>dronETerra</strong>, el jugador dispone de tres clases de drones: <strong>pequeño</strong>,
     <strong>mediano</strong> y <strong>grande</strong>.
    Cada tipo tiene características únicas que definen su función en el campo de batalla: desde incursiones rápidas
    hasta bombardeos masivos.
  </p>

  <p>
    El <strong>drone pequeño</strong> es ligero y ágil, con la mayor velocidad y baja visibilidad.
    Su carga útil es limitada, y su resistencia es baja, pero es ideal para ataques de precisión
    y eliminación de sistemas antiaéreos potentes.
    Gracias a su bajo perfil, es difícil de derribar si se usa de manera rápida e inteligente.
  </p>

  <p>
    El <strong>drone mediano</strong> ofrece un buen equilibrio con estadísticas sólidas.
    Puede transportar más bombas, tiene mejor durabilidad y velocidad moderada.
    Es más fácil de detectar que el pequeño, pero puede cumplir la mayoría de las tareas:
    atacar vehículos, soltar bombas de racimo o colocar minas detrás de las líneas enemigas.
  </p>

  <p>
    El <strong>drone grande</strong> es una plataforma voladora con una gran reserva de bombas.
    Sin embargo, es el más lento, visible y vulnerable.
    Es ideal para colocar minas en grandes áreas o bombardeos masivos de enemigos que no pueden devolver el fuego.
  </p>

  <p>
    Las características de los drones incluyen <strong>velocidad</strong>, <strong>durabilidad</strong> (HP),
    <strong>visibilidad</strong>, <strong>capacidad de carga</strong> (cantidad y peso de bombas) y <strong>tiempo de recarga</strong>
    después de agotar la munición.
    Estos valores se pueden mejorar entre misiones mediante el sistema de mejoras.
  </p>`,

    fragBombText: `<p>
  La <strong>bomba de fragmentación</strong> es un tipo básico de munición en <strong>dronETerra</strong>,
  diseñada para combatir infantería. Al detonar, libera numerosos fragmentos
  que se dispersan en un radio de 7 metros. Cuanto más cerca del centro de la explosión,
  mayor es la probabilidad de daño. Los enemigos reptantes sólo son afectados si reciben un impacto directo.
</p>
<p>
  La bomba de fragmentación es ligera, ocupa poco espacio y no requiere alta precisión:
  un impacto cercano puede eliminar infantería o tripulación ligera.
  No es efectiva contra vehículos sin blindaje y es totalmente inútil contra unidades blindadas.
</p>
<p>
  Es un arma versátil en las primeras etapas del juego, especialmente eficaz contra grupos.
  No se recomienda soltar varias rápidamente, ya que los enemigos se agachan tras la primera explosión,
  reduciendo el efecto de las siguientes.
</p>`,

    fragBombTitle: "Bomba de fragmentación",
    heBombTitle: "Bomba explosiva",
    shapedBombTitle: "Carga hueca",
    apMineTitle: "Mina antipersonal",
    tankMineTitle: "Mina antitanque",
    magnetMineTitle: "Mina magnética",
    clusterBombTitle: "Bomba de racimo",
    shapedClusterBombTitle: "Bomba de racimo AT",

    heBombText: `<p>
  La <strong>bomba explosiva</strong> es un proyectil cargado de explosivos en <strong>dronETerra</strong>,
  diseñado para destruir infantería y vehículos ligeros. Al detonar, genera una fuerte onda expansiva
  que puede eliminar infantería y vehículos no blindados incluso sin un impacto directo.
  Mata infantería en un radio de 2,5 m, sin importar su postura.
</p>
<p>
  A diferencia de la de fragmentación, esta es más pesada y ocupa más espacio,
  pero es altamente versátil: puede destruir infantería y vehículos ligeros.
</p>`,

    shapedBombText: `<p>
  La <strong>carga hueca</strong> es una munición especializada en <strong>dronETerra</strong>,
  destinada a destruir vehículos blindados. Al detonar, genera un chorro focalizado de alta temperatura
  capaz de penetrar incluso blindajes gruesos.
</p>
<p>
  El juego usa un sistema probabilístico de penetración: cada objetivo blindado tiene un
  <strong>valor de blindaje</strong>, y esta bomba tiene una <strong>probabilidad de penetración</strong>.
  La penetración ocurre si todas las pruebas de blindaje son exitosas.
  Ejemplo: blindaje = 1, penetración = 0,9 → 90 %.
  Blindaje = 3, penetración = 0,9 → 0,9 × 0,9 × 0,9 ≈ 73 %.
</p>`,

    apMineText: `<p>
  La <strong>mina antipersonal</strong> es un explosivo casi invisible en <strong>dronETerra</strong>,
  diseñado para eliminar infantería enemiga. Se despliega con drones en el mapa y es invisible para los enemigos
  hasta que se activa.
</p>
<p>
  La mina se activa cuando un soldado entra en su radio, causando daño crítico y eliminándolo al instante.
  Tiene una pequeña posibilidad de detener vehículos sin blindaje al dañar sus ruedas.
  Otros vehículos destruyen la mina al pasar por encima sin sufrir daño.
</p>
<p>
  Su bajo peso permite desplegar múltiples minas en un solo vuelo.
  Es ideal para defensa, emboscadas y ralentizar el avance enemigo.
</p>`,

    tankMineText: `<p>
  La <strong>mina antitanque</strong> es un dispositivo explosivo pesado en <strong>dronETerra</strong>,
  diseñado específicamente para dañar vehículos. Se coloca con drones y solo se activa al pasar vehículos: 
  la infantería puede moverse sin activar la explosión.
</p>
<p>
  La mina causa un daño significativo a vehículos no blindados o ligeros,
  destruyéndolos o dejándolos fuera de combate.
  Su efectividad contra tanques modernos es limitada.
</p>
<p>
  Dado su alto peso, requiere planificación estratégica en su despliegue.
  Es ideal para eliminar sistemas de defensa aérea avanzados que no pueden ser atacados directamente.
</p>`,

    magnetMineText: `<p>
  La <strong>mina magnética</strong> es una mina antitanque pesada en <strong>dronETerra</strong>,
  diseñada para eliminar vehículos enemigos valiosos. Se activa automáticamente
  cuando un objetivo metálico – especialmente vehículos blindados – se aproxima, sin necesidad de contacto con ruedas o orugas.
</p>
<p>
  Al activarse, emite un <strong>chorro de carga hueca</strong> que perfora el subsuelo del vehículo, 
  su punto más vulnerable. El daño resultante suele destruir o incendiar el objetivo al instante.
</p>
<p>
  Debido a su peso, ocupa mucha capacidad en la drone, por lo que su uso debe planificarse cuidadosamente.
  Es perfecta para eliminar objetivos de alto valor o fuertemente defendidos, como sistemas SAM o vehículos de mando.
</p>`,

    clusterBombText: `<p>
  La <strong>bomba de racimo</strong> en <strong>dronETerra</strong> es una munición aérea que explota en el aire,
  liberando <strong>7–13 submuniciones</strong> que cubren un área extensa.
  Su propósito principal es eliminar grupos de infantería o vehículos ligeros en terreno abierto.
</p>
<p>
  Gracias a su patrón de dispersión, es efectiva incluso con lanzamientos imprecisos,
  especialmente útil cuando el dron no puede detenerse a apuntar.
</p>
<p>
  Es pesada y ocupa más espacio que una bomba explosiva normal,
  pero puede causar significativamente más daño.
  Su principal desventaja: baja efectividad contra objetivos medianos o pesados.
</p>`,

    shapedClusterBombText: `<p>
  La <strong>bomba de racimo AT</strong> es una munición especializada en <strong>dronETerra</strong> que explota en el aire,
  liberando <strong>7–13 submuniciones antitanque</strong>.
  A diferencia de las bombas normales, esta variante está diseñada específicamente para contrarrestar vehículos blindados.
</p>
<p>
  Cada submunición tiene capacidad de penetración y puede perforar blindajes ligeros o medianos,
  causando incendios y neutralizando vehículos. Gracias a su patrón de dispersión,
  puede impactar múltiples objetivos simultáneamente, siendo muy eficaz contra formaciones blindadas.
</p>
<p>
  Su gran peso limita la cantidad que un dron puede transportar por vuelo.
  Es un arma de precisión para ataques contra agrupaciones de vehículos,
  capaz de neutralizar varios objetivos con un solo lanzamiento.
</p>`,
  },
  fr: {
    infoTitle: "Informations sur le jeu",
    game: "Gameplay",
    mechanics: "Mécanismes",
    drones: "Drones",
    ammo: "Munitions",
    enemies: "Ennemis",
    back: "Retour",
    gameTitle: "Aperçu du jeu",
    mechanicsTitle: "Mécaniques de jeu",
    ap: "Pénétration d'armure",
    visibility: "Visibilité du drone",
    droneFire: "Tirs sur le drone",
    bombarding: "Largage de bombes",
    mines: "Mines",
    dronesTitle: "Infos sur les drones",
    ammoTitle: "Infos sur les munitions",
    enemiesTitle: "Infos sur les ennemis",

    fragBomb: `<div class="fragBomb_image_small"></div> Bombe à fragmentation`,
    heBomb: `<div class="heBomb_image_small"></div> Bombe hautement explosive`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Charge creuse`,
    apMine: `<div class="footMine_image_small"></div> Mine antipersonnel`,
    tankMine: `<div class="tankMine_image_small"></div> Mine antichar`,
    magnetMine: `<div class="magnetMine_image_small"></div> Mine magnétique`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Bombe à sous-munitions`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> Bombe AT à sous-munitions`,

    name: "Nom",
    armor: "Armure",
    speed: `tirs<br />par sec.`,
    campaignPoints: `points<br />campagne`,
    lastStandPoints: `points<br />dernier carré`,

    rifleman: "Fantassin",
    machinegunner: "Mitrailleur",
    grenadier: "Grenadier",
    crew: "Équipage",

    ural: "Ural",
    uralSupply: `Ural<br />Ravitaillement`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Pick‑up avec<br />mitrailleuse`,
    jeep: `Pick‑up`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB avec<br />mitrailleuse KPVT`,
    mtlbzu23: `MT‑LB avec<br />canon ZU‑23`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Obusier automoteur`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong> est un jeu tactique où vous dirigez des drones armés sur un champ de bataille rempli de véhicules et d'infanterie ennemis. Choisissez vos drones avec soin, équipez-les de différentes bombes et planifiez vos attaques pour maximiser les dégâts tout en minimisant les pertes. <strong>La précision et le bon timing font toute la différence</strong> : une seule erreur peut compromettre la mission.
    </p>
  
    <p>
      Chaque drone peut emporter plusieurs types d'armes : des bombes explosives et mines antipersonnel jusqu’aux munitions à sous-munitions et charges creuses. Le champ de bataille évolue constamment : renforts ennemis, convois blindés et camions de ravitaillement rendent chaque mission unique et exigeante.
    </p>
  
    <p>
      Entre les missions, vous pouvez améliorer vos drones, débloquer de nouveaux équipements et optimiser votre charge pour les menaces à venir. <strong>Chaque amélioration compte</strong> : plus de dégâts, plus de vitesse ou un rayon d'explosion plus important peuvent faire la différence. Choisissez judicieusement — vous ne pouvez pas tout emporter.
    </p>
  
    <p>
      Le jeu propose une campagne composée de missions sur mesure et un mode infini « Dernier carré », où la survie dépend uniquement de votre habileté et de la gestion des ressources. À chaque vague, les ennemis deviennent plus forts — seuls les mieux préparés survivront. <strong>Êtes-vous prêt à dominer les airs ?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong> utilise un système probabiliste de pénétration d’armure simulant la difficulté à endommager des véhicules blindés. Chaque cible blindée possède une valeur numérique d’<strong>armure</strong>, représentant sa résistance. Chaque munition perforante a une <strong>chance de pénétration</strong> — la probabilité de percer une unité de blindage.
    </p>
    <p>
      Lorsqu’une cible est touchée, le jeu effectue <strong>plusieurs vérifications indépendantes</strong> — une pour chaque niveau de blindage. Pour réussir la pénétration, toutes doivent être concluantes.
    </p>
    <p>
      Exemple : avec une armure de 1 et une chance de pénétration de 0,9, la probabilité est de 90 %. Avec une armure de 3, la probabilité totale est d’environ 0,9 × 0,9 × 0,9 ≈ 73 %.
    </p>
    <p>
      Si la pénétration est réussie, la cible prend feu et devient inutilisable. Si une vérification échoue, la munition ne perce pas — aucun effet. Ce système incite le joueur à choisir la bonne munition pour chaque type de véhicule ennemi.
    </p>`,

    visibilityText: `<p>
      <strong>dronETerra</strong> intègre un système dynamique de détection des drones par les ennemis. La probabilité d'être repéré dépend non seulement de la distance, mais aussi de la <strong>taille du drone</strong> et de son activité <strong>récent</strong> en combat.
    </p>
    <p>
      Chaque drone possède une valeur de <strong>visibilité de base</strong> déterminée par sa taille : les gros drones sont détectés plus vite, les petits moins. Chaque largage de bombe augmente temporairement cette visibilité. Plus de bombes larguées en peu de temps = plus de risque. Cet effet s'accumule et s'atténue avec le temps.
    </p>`,

    droneFireText: `<p>
      <strong>dronETerra</strong> calcule les tirs ennemis en fonction de la taille, de la vitesse du drone et des caractéristiques de l'ennemi. Chaque unité ennemie a un taux de feu en <strong>tirs par seconde</strong> et tire périodiquement si le drone est à portée.
    </p>
    <p>
      La probabilité de toucher diminue si le drone est rapide ou petit — un drone rapide et petit est plus difficile à toucher. Un drone immobile est une cible facile. Les ennemis à haute cadence infligent plus de dégâts sur une même période.
    </p>
    <p>
      Un tir réussi réduit les <strong>points de vie</strong> du drone. À zéro, le drone est détruit. Ce système incite le joueur à éviter de rester au-dessus de groupes ennemis prolongés et à équilibrer vitesse et prudence.
    </p>`,

    bombardingText: `<p>
      Dans <strong>dronETerra</strong>, le largage de bombes est un mécanisme clé qui exige précision, planification et attention au mouvement du drone. Si la bombe est larguée depuis un drone immobile, elle tombe verticalement. En mouvement, sa trajectoire est décalée selon le sens de vol.
    </p>
    <p>
      Chaque drone dispose d’une <strong>capacité de charge utile</strong> limitée et peut transporter un nombre variable de bombes selon son type et son équipement. Chaque largage diminue les munitions disponibles. Lorsque toutes les bombes sont utilisées, un <strong>rechargement automatique</strong> s'active après quelques secondes.
    </p>
    <p>
      Ce mécanisme oblige le joueur à viser avec précision, à ne pas gaspiller de bombes et à choisir le bon moment pour attaquer. Le succès dépend non seulement de la quantité de bombes transportées, mais surtout de la manière de les utiliser.
    </p>`,
    minesText: `<p>
    Dans <strong>dronETerra</strong>, les mines sont un type de munition stratégique qui n’inflige pas de dégâts immédiats,
    mais crée des pièges sur le champ de bataille. Le joueur peut larguer une mine à tout moment pendant le vol,
    et elle restera à l’endroit de son atterrissage. Les mines n’explosent pas à l’impact, elles s’activent lorsqu’une unité ennemie s’en approche.
  </p>
  <p>
    Il existe plusieurs types de mines : anti-personnel, antichar, magnétiques, etc.
    Chaque type a des conditions de déclenchement, un rayon d’effet et une efficacité différents selon les cibles.
    Par exemple, une mine antichar ne s’active pas sur l’infanterie, mais peut détruire un véhicule lourd en un seul coup.
  </p>
  <p>
    Une fois activée, la mine explose automatiquement et cause des dégâts dans sa zone d'effet.
    Les ennemis pris dans cette zone sont endommagés ou détruits.
    Cela permet au joueur de bloquer des routes, tendre des embuscades et établir des positions défensives
    avec un risque minimal pour ses drones.
  </p>`,

    dronesText: `<p>
    Dans <strong>dronETerra</strong>, le joueur dispose de trois classes de drones : <strong>petit</strong>,
    <strong>moyen</strong> et <strong>grand</strong>.
    Chaque type possède des caractéristiques uniques qui définissent son rôle sur le champ de bataille : allant des raids rapides
    aux bombardements massifs.
  </p>

  <p>
    Le <strong>petit drone</strong> est léger et agile, avec la plus grande vitesse et une faible visibilité.
    Sa capacité de charge est limitée et il a une faible durabilité, mais il excelle pour les attaques de précision
    et la destruction de systèmes antiaériens. Grâce à son faible profil, il est difficile à abattre s’il est utilisé rapidement et efficacement.
  </p>

  <p>
    Le <strong>drone moyen</strong> est un bon compromis avec des statistiques équilibrées.
    Il peut transporter davantage de bombes, possède une meilleure résistance et une vitesse modérée.
    Il est plus facilement détectable que le petit drone, mais peut remplir la plupart des tâches :
    attaquer des véhicules, larguer des bombes à sous‑munitions ou poser des mines derrière les lignes ennemies.
  </p>

  <p>
    Le <strong>grand drone</strong> est une plateforme volante avec une réserve massive de bombes.
    En revanche, c’est le plus lent, visible et vulnérable.
    Il est idéal pour des opérations de minage à grande échelle ou des bombardements massifs sur des ennemis incapables de riposter.
  </p>

  <p>
    Les caractéristiques des drones incluent la <strong>vitesse</strong>, la <strong>durabilité</strong> (PV),
    la <strong>visibilité</strong>, la <strong>capacité de charge</strong> (nombre et poids des bombes)
    et le <strong>temps de rechargement</strong> après consommation des munitions.
    Ces valeurs peuvent être améliorées entre les missions via le système de montée en puissance.
  </p>`,

    fragBombText: `<p>
    La <strong>bombe à fragmentation</strong> est un type de munition de base dans <strong>dronETerra</strong>,
    conçue pour combattre l’infanterie. Lors de la détonation, elle libère un grand nombre d’éclats
    qui se dispersent dans un rayon de 7 m. Plus on est proche du centre de l’explosion, plus le risque de dégâts est élevé.
    Les ennemis rampants ne sont affectés que s’ils sont touchés directement.
  </p>
  <p>
    La bombe à fragmentation est légère, prend peu de place et n’exige pas une grande précision :
    une explosion à proximité suffit à neutraliser des groupes d’infanterie ou des équipages hors blindés.
    Elle n’est pas efficace contre les véhicules non blindés et est totalement inefficace contre le blindage.
  </p>
  <p>
    C’est une arme polyvalente en début de partie, notamment redoutable contre les groupes d’ennemis.
    Il est déconseillé de lancer plusieurs bombes rapidement, car les ennemis se mettent à couvert après la première explosion,
    réduisant l’impact des suivantes.
  </p>`,

    fragBombTitle: "Bombe à fragmentation",
    heBombTitle: "Bombe HE",
    shapedBombTitle: "Charge creuse",
    apMineTitle: "Mine antipersonnel",
    tankMineTitle: "Mine antichar",
    magnetMineTitle: "Mine magnétique",
    clusterBombTitle: "Bombe à sous-munitions",
    shapedClusterBombTitle: "Bombe AT à sous-munitions",

    heBombText: `<p>
    La <strong>bombe HE</strong> est un engin explosif dans <strong>dronETerra</strong>,
    conçu pour détruire l’infanterie et les véhicules légers. Lors de l’explosion, elle génère une onde de choc puissante
    capable d’éliminer l’infanterie et les véhicules non blindés même sans impact direct.
    Elle tue l'infanterie dans un rayon de 2,5 m, quelle que soit leur posture.
  </p>
  <p>
    Contrairement à la fragmentation, cette bombe est plus lourde et encombrante,
    mais extrêmement polyvalente : elle peut neutraliser l’infanterie et les véhicules légers.
  </p>`,

    shapedBombText: `<p>
    La <strong>charge creuse</strong> est une munition spécialisée dans <strong>dronETerra</strong>,
    destinée à détruire des véhicules blindés. Lors de la détonation, elle génère un jet focalisé à haute température
    capable de pénétrer un blindage épais.
  </p>
  <p>
    Le jeu utilise un système probabiliste de pénétration : chaque cible blindée possède un
    <strong>niveau de blindage</strong>, et cette bombe possède un <strong>taux de pénétration</strong>.
    La pénétration réussit si toutes les vérifications sont validées.
    Par exemple : blindage = 1, pénétration = 0,9 → 90 %. Blindage = 3, pénétration = 0,9 → 0,9 × 0,9 × 0,9 ≈ 73 %.
  </p>`,

    apMineText: `<p>
    La <strong>mine antipersonnel</strong> est un dispositif explosif peu visible dans <strong>dronETerra</strong>,
    conçu pour neutraliser l’infanterie ennemie. Elle est déployée par les drones sur la carte et reste invisible jusqu’à activation.
  </p>
  <p>
    Elle s’active lorsqu’un soldat entre dans son rayon, infligeant des dégâts critiques et tuant la cible instantanément.
    Elle peut endommager les roues des véhicules non blindés. Les autres véhicules détruisent la mine sans subir de dégâts.
  </p>
  <p>
    Son faible poids permet de déployer plusieurs mines en un seul vol.
    Elle est idéale pour la défense, les embuscades et ralentir l’avancée ennemie.
  </p>`,

    tankMineText: `<p>
    La <strong>mine antichar</strong> est un engin explosif puissant dans <strong>dronETerra</strong>,
    spécialement conçu pour toucher des véhicules. Elle est posée par les drones et ne s’active que lorsqu’un véhicule passe au-dessus ;
    l’infanterie peut passer sans déclencher l’explosion.
  </p>
  <p>
    Elle inflige de lourds dégâts aux véhicules non blindés ou légers,
    les détruisant ou les neutralisant. Son efficacité contre les chars modernes est limitée.
  </p>
  <p>
    En raison de son poids élevé, elle nécessite une planification stratégique.
    Elle est idéale pour éliminer des systèmes antiaériens avancés trop dangereux à attaquer directement.
  </p>`,

    magnetMineText: `<p>
    La <strong>mine magnétique</strong> est une munition antichar lourde dans <strong>dronETerra</strong>,
    conçue pour neutraliser des cibles ennemies de grande valeur. Elle s’active automatiquement
    lorsqu’un véhicule métallique – en particulier blindé – s’en approche, sans contact direct requis.
  </p>
  <p>
    À l’activation, elle projette un <strong>jet creux</strong> qui perce le dessous du véhicule,
    l’un des points les plus vulnérables. Les dégâts résultants le détruisent ou le mettent à feu instantanément.
  </p>
  <p>
    En raison de son poids, elle occupe beaucoup de capacité dans le drone, donc son déploiement doit être soigneusement planifié.
    Elle est idéale pour éliminer des cibles de très haut niveau ou fortement défendues, comme des systèmes SAM ou des véhicules de commandement.
  </p>`,

    clusterBombText: `<p>
    La <strong>bombe à sous-munitions</strong> dans <strong>dronETerra</strong> est une munition aérienne qui explose en plein air,
    libérant <strong>7 à 13 sous‑munitions</strong> couvrant une vaste zone.
    Sa vocation principale est de détruire des groupes d’infanterie ou des véhicules légers étendus sur un terrain ouvert.
  </p>
  <p>
    Grâce à son schéma de dispersion, elle reste efficace même sans largages précis,
    particulièrement utile lorsque le drone ne peut pas s’arrêter pour viser.
  </p>
  <p>
    Elle est lourde et prend plus de place qu’une bombe HE classique,
    mais peut causer beaucoup plus de dégâts.
    Son principal inconvénient est sa faible efficacité contre des cibles blindées moyennes ou lourdes.
  </p>`,

    shapedClusterBombText: `<p>
    La <strong>bombe AT à sous-munitions</strong> est une munition spécialisée dans <strong>dronETerra</strong> qui explose en plein air,
    libérant <strong>7 à 13 sous‑munitions antichars</strong>.
    Contrairement aux bombes classiques, cette variante est conçue spécifiquement pour contrer des véhicules blindés.
  </p>
  <p>
    Chaque sous‑munition possède un pouvoir de pénétration et peut percer une armure légère à moyenne,
    provoquant des incendies et neutralisant des véhicules. Grâce à leur dispersion,
    la bombe peut atteindre plusieurs objectifs simultanément, ce qui la rend très efficace contre des formations blindées.
  </p>
  <p>
    Son poids élevé limite le nombre de bombes qu’un drone peut transporter par vol.
    C’est une arme de précision pour des frappes ciblées contre des groupes de véhicules,
    capable de neutraliser plusieurs menaces en un seul largage.
  </p>`,
  },
  pt: {
    infoTitle: "Informações do jogo",
    game: "Jogabilidade",
    mechanics: "Mecânicas",
    drones: "Drones",
    ammo: "Munição",
    enemies: "Inimigos",
    back: "Voltar",
    gameTitle: "Visão geral do jogo",
    mechanicsTitle: "Mecânicas do jogo",
    ap: "Penetração de armadura",
    visibility: "Visibilidade do drone",
    droneFire: "Fogo contra o drone",
    bombarding: "Lançamento de bombas",
    mines: "Minagem",
    dronesTitle: "Informações dos drones",
    ammoTitle: "Informações de munição",
    enemiesTitle: "Informações dos inimigos",

    fragBomb: `<div class="fragBomb_image_small"></div> Bomba de fragmentação`,
    heBomb: `<div class="heBomb_image_small"></div> Bomba explosiva (HE)`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Bomba de carga oca`,
    apMine: `<div class="footMine_image_small"></div> Mina antipessoal`,
    tankMine: `<div class="tankMine_image_small"></div> Mina antitanque`,
    magnetMine: `<div class="magnetMine_image_small"></div> Mina magnética`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Bomba cluster`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> Bomba AT cluster`,

    name: "Nome",
    armor: "Armadura",
    speed: `disparos<br />por seg.`,
    campaignPoints: `pontos<br />campanha`,
    lastStandPoints: `pontos<br />última resistência`,

    rifleman: "Fuzileiro",
    machinegunner: "Metralhador",
    grenadier: "Granadeiro",
    crew: "Tripulação",

    ural: "Ural",
    uralSupply: `Ural<br />Suprimento`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Pick-up com<br />metralhadora`,
    jeep: `Pick-up`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB com<br />metralhadora KPVT`,
    mtlbzu23: `MT‑LB com<br />canhão ZU‑23`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Obus autopropulsado`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong> é um jogo tático onde você comanda drones armados em um campo de batalha repleto de veículos e infantaria inimiga. Selecione seus drones cuidadosamente, equipe-os com diferentes tipos de bombas e planeje seus ataques para maximizar os danos e minimizar as perdas. <strong>Precisão e timing são cruciais</strong> — um erro pode comprometer toda a missão.
    </p>
  
    <p>
      Cada drone pode carregar vários tipos de armamentos: desde bombas HE e minas antipessoais até munições cluster e cargas ocas. O campo de batalha é dinâmico — reforços inimigos, comboios blindados e caminhões de suprimentos tornam cada missão única e desafiadora.
    </p>
  
    <p>
      Entre as missões, é possível melhorar seus drones, desbloquear novos equipamentos e otimizar sua carga para as ameaças à frente. <strong>Cada upgrade é importante</strong>: mais dano, melhor velocidade ou alcance explosivo podem virar o jogo. Escolha com sabedoria — você não pode levar tudo de uma vez.
    </p>
  
    <p>
      O jogo apresenta uma campanha com missões desenvolvidas e um modo infinito “Última Resistência”, onde sobreviver depende da habilidade e da gestão de recursos. A cada onda, os inimigos ficam mais fortes — apenas os mais preparados sobreviverão. <strong>Você está pronto para dominar os céus?</strong>
    </p>`,

    apText: `<p>
      O <strong>dronETerra</strong> usa um sistema probabilístico de penetração de armadura que simula a dificuldade de danificar veículos blindados. Cada alvo blindado possui um valor numérico de <strong>armadura</strong>, representando sua resistência. Cada munição perfurante tem uma <strong>chance de penetração</strong> — a probabilidade de perfurar uma unidade de armadura.
    </p>
    <p>
      Quando um alvo é atingido, o jogo realiza <strong>várias checagens independentes</strong> — uma para cada ponto de armadura. Para penetrar, todas devem ter sucesso.
    </p>
    <p>
      Por exemplo, com armadura 1 e chance de penetração 0,9, a probabilidade é 90 %. Com armadura 3, a chance total é cerca de 0,9 × 0,9 × 0,9 ≈ 73 %.
    </p>
    <p>
      Se a penetração for bem-sucedida, o alvo entra em combustão e fica incapacitado. Se alguma checagem falhar, a munição não penetra e não há efeito — o que obriga o jogador a escolher o armamento certo para cada tipo de veículo inimigo.
    </p>`,

    visibilityText: `<p>
      O <strong>dronETerra</strong> conta com um sistema dinâmico de detecção de drones por inimigos. A chance de ser detectado depende não só da distância, mas também do <strong>tamanho do drone</strong> e da sua atividade <strong>recente</strong>.
    </p>
    <p>
      Cada drone possui um nível base de <strong>visibilidade</strong> definido por seu porte: drones grandes são detectados mais facilmente, os pequenos menos. Porém, cada lançamento de bomba aumenta temporariamente essa visibilidade. Quanto mais bombas largadas em pouco tempo, maior o risco. Esse efeito se acumula e é reduzido com o tempo.
    </p>`,

    droneFireText: `<p>
      O <strong>dronETerra</strong> modela os disparos inimigos com base no tamanho, velocidade do drone e nas características dos inimigos. Cada unidade inimiga possui uma taxa de fogo em <strong>disparos por segundo</strong> e atira periodicamente se o drone estiver ao alcance.
    </p>
    <p>
      A probabilidade de acerto diminui se o drone for rápido ou pequeno — drones rápidos e pequenos são mais difíceis de acertar. Drones parados são alvos fáceis. Inimigos com alta cadência causam mais dano ao longo do tempo.
    </p>
    <p>
      Um disparo bem-sucedido reduz os <strong>pontos de vida</strong> do drone. Ao chegar a zero, o drone é destruído. Isso incentiva o jogador a não pairar sobre grupos inimigos por muito tempo e a equilibrar velocidade e cautela.
    </p>`,

    bombardingText: `<p>
      Em <strong>dronETerra</strong>, o lançamento de bombas é uma mecânica central que exige precisão, planejamento e atenção ao movimento do drone. Quando lançada de um drone parado, a bomba cai verticalmente. Em movimento, sua trajetória se desloca conforme o movimento — o jogador deve antecipar isso.
    </p>
    <p>
      Cada drone possui uma <strong>capacidade limitada de carga útil</strong> e pode levar diferentes quantidades de bombas conforme seu tipo e equipamento. Cada lançamento reduz o estoque disponível. Quando todas as bombas são usadas, ocorre um <strong>recarregamento automático</strong> após alguns segundos.
    </p>
    <p>
      Essa mecânica obriga o jogador a mirar com cuidado, evitar desperdício e escolher o momento exato para atacar. O sucesso depende não só da quantidade de bombas, mas também da forma como elas são usadas.
    </p>`,
    minesText: `<p>
    No <strong>dronETerra</strong>, as minas são um tipo estratégico de munição que não causam dano imediato,
    mas criam armadilhas no campo de batalha. O jogador pode lançar uma mina a qualquer momento durante o voo,
    e ela permanecerá no local em que caiu. Minas não explodem no impacto — são acionadas quando uma unidade inimiga se aproxima.
  </p>
  <p>
    Existem vários tipos de minas: antipessoal, antitanque, magnéticas, etc.
    Cada tipo tem condições de disparo, alcance e eficácia diferentes contra alvos específicos.
    Por exemplo, uma mina antitanque não é ativada por infantaria, mas pode destruir um veículo pesado com uma explosão.
  </p>
  <p>
    Uma vez acionada, a mina explode automaticamente, causando dano dentro de sua zona de efeito.
    Inimigos capturados nessa zona são danificados ou destruídos.
    Isso permite ao jogador bloquear rotas, emboscar comboios e estabelecer posições defensivas
    com risco mínimo para seus drones.
  </p>`,

    dronesText: `<p>
    Em <strong>dronETerra</strong>, o jogador tem acesso a três classes de drones: <strong>pequeno</strong>,
    <strong>médio</strong> e <strong>grande</strong>.
    Cada tipo possui características únicas que definem seu papel no campo de batalha — desde incursões rápidas
    até bombardeios em larga escala.
  </p>

  <p>
    O <strong>dron pequeno</strong> é leve e ágil, com a maior velocidade e a menor visibilidade.
    Sua capacidade de carga é limitada e sua durabilidade é baixa, mas é ideal para ataques de precisão
    e destruição de sistemas antiaéreos. Graças ao seu perfil discreto, é difícil de derrubar quando utilizado de forma rápida e inteligente.
  </p>

  <p>
    O <strong>dron médio</strong> é uma opção de equilíbrio, com estatísticas robustas.
    Transporta mais bombas, tem melhor resistência e velocidade moderada.
    É mais facilmente detectado que o pequeno, mas pode cumprir a maioria das tarefas:
    atacar veículos, lançar bombas cluster ou plantar minas atrás das linhas inimigas.
  </p>

  <p>
    O <strong>dron grande</strong> é uma plataforma voadora com uma reserva massiva de bombas.
    Contudo, é o mais lento, visível e vulnerável.
    É ideal para operações de plantio de minas em larga escala ou bombardeios massivos contra inimigos que não conseguem revidar.
  </p>

  <p>
    As características dos drones incluem <strong>velocidade</strong>, <strong>durabilidade</strong> (HP),
    <strong>visibilidade</strong>, <strong>capacidade de carga</strong> (quantidade e peso de bombas)
    e o <strong>tempo de recarga</strong> após esgotar sua munição.
    Esses atributos podem ser melhorados entre missões usando o sistema de aprimoramentos.
  </p>`,

    fragBombText: `<p>
    A <strong>bomba de fragmentação</strong> é um tipo básico de munição em <strong>dronETerra</strong>,
    projetada para combater infantaria. Ao detonar, libera grande quantidade de estilhaços
    que se espalham em um raio de 7 m. Quanto mais próximo do centro da explosão, maior a chance de dano.
    Inimigos rastejando só são atingidos se forem atingidos diretamente.
  </p>
  <p>
    A bomba de fragmentação é leve, ocupa pouco espaço e não exige precisão alta:
    uma explosão próxima já é suficiente para eliminar grupos de infantaria ou tripulações fora de blindados.
    No entanto, é ineficaz contra veículos não blindados e totalmente inútil contra blindagens pesadas.
  </p>
  <p>
    É uma arma versátil no início do jogo, especialmente eficaz contra grupos de inimigos.
    Não é recomendável lançar várias bombas rapidamente, pois os inimigos se abaixam após a primeira explosão,
    reduzindo o impacto das seguintes.
  </p>`,

    fragBombTitle: "Bomba de fragmentação",
    heBombTitle: "Bomba HE",
    shapedBombTitle: "Carga Oca",
    apMineTitle: "Mina Antipessoal",
    tankMineTitle: "Mina Antitanque",
    magnetMineTitle: "Mina Magnética",
    clusterBombTitle: "Bomba Cluster",
    shapedClusterBombTitle: "Bomba Cluster AT",

    heBombText: `<p>
    A <strong>bomba HE</strong> é uma munição explosiva em <strong>dronETerra</strong>,
    projetada para destruir infantaria e veículos leves. Ao explodir, gera uma poderosa onda de choque
    capaz de eliminar infantaria e veículos não blindados mesmo sem impacto direto.
    Elimina a infantaria em um raio de 2,5 m, independentemente da postura.
  </p>
  <p>
    Ao contrário da fragmentação, esta bomba é mais pesada e volumosa,
    mas extremamente versátil: pode neutralizar infantaria e veículos leves.
  </p>`,

    shapedBombText: `<p>
    O <strong>carga oca</strong> é uma munição especializada em <strong>dronETerra</strong>,
    destinada a destruir veículos blindados. Ao detonar, gera um jato focalizado de alta temperatura
    capaz de penetrar blindagem espessa.
  </p>
  <p>
    O jogo utiliza um sistema probabilístico de penetração: cada alvo blindado possui um
    <strong>nível de blindagem</strong> e essa bomba possui uma <strong>chance de penetração</strong>.
    A penetração ocorre se todas as verificações forem bem-sucedidas.
    Por exemplo: blindagem = 1, penetração = 0,9 → 90 %. Blindagem = 3, penetração = 0,9 → 0,9 × 0,9 × 0,9 ≈ 73 %.
  </p>`,

    apMineText: `<p>
    A <strong>mina antipessoal</strong> é um dispositivo explosivo discreto em <strong>dronETerra</strong>,
    projetado para eliminar infantaria inimiga. É implantada pelos drones no mapa e permanece invisível até ser ativada.
  </p>
  <p>
    Ela se ativa quando um soldado entra em seu raio de ação, causando dano crítico e matando o alvo instantaneamente.
    Pode danificar rodas de veículos não blindados. Outros veículos destroem a mina ao passar por cima, sem sofrer dano.
  </p>
  <p>
    Devido ao seu peso leve, permite implantar várias minas em um único voo.
    É ideal para defesa, emboscadas e desacelerar o avanço inimigo.
  </p>`,

    tankMineText: `<p>
    A <strong>mina antitanque</strong> é um dispositivo explosivo potente em <strong>dronETerra</strong>,
    projetada para atingir veículos. É colocada pelos drones e só é ativada quando um veículo passa por cima;
    a infantaria pode passar sem detonar.
  </p>
  <p>
    Causa grandes danos a veículos não blindados ou leves,
    destruindo-os ou incapacitando-os. Sua eficácia contra tanques modernos é limitada.
  </p>
  <p>
    Devido ao seu peso elevado, ocupa mais espaço no drone, exigindo uso estratégico.
    É ideal para eliminar sistemas antiaéreos avançados que são perigosos para atacar diretamente.
  </p>`,

    magnetMineText: `<p>
    A <strong>mina magnética</strong> é uma munição antitanque pesada em <strong>dronETerra</strong>,
    projetada para eliminar alvos inimigos de alto valor. É ativada automaticamente
    quando um veículo metálico – especialmente blindado – se aproxima, sem necessidade de contato direto.
  </p>
  <p>
    Ao ser acionada, ela projeta um <strong>jato oco</strong> que perfura a parte inferior do veículo,
    um dos pontos mais vulneráveis. O dano resultante destrói ou incendeia o alvo instantaneamente.
  </p>
  <p>
    Devido ao seu peso, ocupa grande parte da capacidade do drone, portanto seu uso deve ser planejado cuidadosamente.
    É ideal para eliminar alvos de alto valor ou fortemente protegidos, como sistemas SAM ou veículos de comando.
  </p>`,

    clusterBombText: `<p>
    A <strong>bomba cluster</strong> em <strong>dronETerra</strong> é uma munição aérea que explode no ar,
    liberando <strong>7–13 submunições</strong> que cobrem uma grande área.
    Seu objetivo principal é eliminar grupos de infantaria ou veículos leves espalhados por terreno aberto.
  </p>
  <p>
    Devido ao padrão de dispersão, permanece eficaz mesmo sem lançamentos precisos,
    sendo especialmente útil quando o drone não pode parar para mirar.
  </p>
  <p>
    Ela é pesada e ocupa mais espaço que uma bomba HE padrão,
    mas pode causar muito mais dano.
    Seu principal ponto negativo é a baixa eficácia contra alvos blindados médios ou pesados.
  </p>`,

    shapedClusterBombText: `<p>
    A <strong>bomba cluster AT</strong> é uma munição especializada em <strong>dronETerra</strong>
    que explode no ar, liberando <strong>7–13 submunições antitanque</strong>.
    Diferente das bombas cluster normais, essa variante é projetada especificamente para combater veículos blindados.
  </p>
  <p>
    Cada submunição possui poder de penetração e pode perfurar blindagens leves a médias,
    causando incêndios e desativando veículos. Graças à dispersão, a bomba pode atingir vários alvos simultaneamente,
    sendo altamente eficaz contra formações de blindados.
  </p>
  <p>
    Seu peso elevado limita o número de bombas que um drone pode transportar por voo.
    É uma arma de precisão para ataques concentrados contra grupos de veículos,
    capaz de neutralizar várias ameaças com um único lançamento.
  </p>`,
  },
  tr: {
    infoTitle: "Oyun Bilgisi",
    game: "Oynanış",
    mechanics: "Mekanikler",
    drones: "Drone'lar",
    ammo: "Cephane",
    enemies: "Düşmanlar",
    back: "Geri",
    gameTitle: "Oyun Genel Bakış",
    mechanicsTitle: "Oyun Mekanikleri",
    ap: "Zırh Delme",
    visibility: "Drone Görünürlüğü",
    droneFire: "Drone'a Ateş",
    bombarding: "Bomba Atışı",
    mines: "Mayınlar",
    dronesTitle: "Drone Bilgisi",
    ammoTitle: "Cephane Bilgisi",
    enemiesTitle: "Düşman Bilgisi",

    fragBomb: `<div class="fragBomb_image_small"></div> Parça Bombası`,
    heBomb: `<div class="heBomb_image_small"></div> Yüksek Patlayıcılı (HE) Bomba`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Şekillendirilmiş Yük Bombası`,
    apMine: `<div class="footMine_image_small"></div> Personel Mayını`,
    tankMine: `<div class="tankMine_image_small"></div> Tank Karşıtı Mayın`,
    magnetMine: `<div class="magnetMine_image_small"></div> Manyetik Mayın`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Küme Bombası`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> AT Küme Bombası`,

    name: "İsim",
    armor: "Zırh",
    speed: `saniyede<br />atar.`,
    campaignPoints: `puanlar<br />kampanya`,
    lastStandPoints: `puanlar<br />son savunma`,

    rifleman: "Tüfekçi",
    machinegunner: "Makineli Tüfekçi",
    grenadier: "Havancı",
    crew: "Mürettebat",

    ural: "Ural",
    uralSupply: `Ural<br />Tedarik`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Makineli<br />Kamyonet`,
    jeep: `Kamyonet`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB ile<br />KPVT Makineli`,
    mtlbzu23: `MT‑LB ile<br />ZU‑23 Topu`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Kendinden Yürür<br />Obüs`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong>, düşman araçlar ve piyade ile dolu bir savaş alanında silahlı drone'ları yönettiğiniz taktiksel bir oyundur. Drone'larınızı dikkatle seçin, çeşitli bomba tipleriyle donatın ve kayıpları en aza indirirken hasarı maksimize edecek şekilde saldırılarınızı planlayın. <strong>Hassasiyet ve zamanlama her şeydir</strong> — tek bir yanlış hareket tüm görevi riske atabilir.
    </p>
  
    <p>
      Her drone, HE bombalarından personel mayınlarına, küme mühimmatına ve şekillendirilmiş yük bombalarına kadar çeşitli silah tipleri taşıyabilir. Savaş alanı dinamik: düşman takviyeleri, zırhlı konvoylar ve ikmal kamyonları her görevi benzersiz ve zorlu kılar.
    </p>
  
    <p>
      Görevler arasında drone'larınızı geliştirebilir, yeni ekipmanlar açabilir ve tehditlere karşı yükünüzü optimize edebilirsiniz. <strong>Her yükseltme önemlidir</strong>: daha fazla hasar, daha iyi hız veya daha geniş patlama menzili oyunu lehinize çevirebilir. Hepsini aynı anda taşıyamazsınız, bu nedenle seçiminizi akıllıca yapın.
    </p>
  
    <p>
      Oyun, el yapımı görevlerle bir kampanya ve hayatta kalmanın yetenek ve kaynak yönetimi gerektirdiği sonsuz “Son Savunma” modunu içerir. Her dalgada düşmanlar güçlenir — sadece en iyi hazırlananlar ayakta kalır. <strong>Gökyüzünü yönetmeye hazır mısınız?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong>, zırhlı araçları tahrip etmenin zorluğunu simüle eden olasılıksal bir zırh delme sistemi kullanır. Her zırhlı hedefin dayanıklılığını temsil eden sayısal bir <strong>zırh</strong> değeri vardır. Zırh delici mühimmatların her birim zırhı delme ihtimali olan bir <strong>penetrasyon şansı</strong> bulunur.
    </p>
    <p>
      Hedefe vurulduğunda, oyun her bir zırh puanı için <strong>bağımsız kontroller</strong> yapar. Penetrasyon için tüm kontroller başarılı olmalıdır.
    </p>
    <p>
      Örneğin, zırh = 1 ve penetrasyon şansı = 0,9 ise başarı ihtimali 90%'dir. Zırh = 3 ve penetrasyon = 0,9 için toplam başarı yaklaşık 0,9 × 0,9 × 0,9 ≈ 73%'tür.
    </p>
    <p>
      Penetrasyon başarılı olursa, hedef tutuşur ve iş göremez hale gelir. Kontrollerden biri bile başarısız olursa, mühimmat zırhı delebilmez ve etkisi geçersiz olur — bu da oyuncunun her düşman aracına uygun silahı seçmesini teşvik eder.
    </p>`,

    visibilityText: `<p>
      <strong>dronETerra</strong>, düşmanların drone'ları algılama şansını dinamik olarak hesaplayan bir sistem içerir. Algılanma şansı sadece mesafeye değil, aynı zamanda drone'un <strong>boyutuna</strong> ve son <strong>eylemlerine</strong> de bağlıdır.
    </p>
    <p>
      Her drone, zırhı ne olursa olsun bir temel <strong>görünebilirlik</strong> seviyesine sahiptir: büyük drone'lar daha çabuk fark edilir, küçük drone'lar daha az. Ancak her bomba atışı bu görünürlüğü geçici olarak artırır. Kısa sürede atılan bomba sayısı arttıkça algılanma riski de yükselir. Bu etki birikir ve zamanla azalır.
    </p>`,

    droneFireText: `<p>
      <strong>dronETerra</strong>, düşman ateş sistemini drone'un boyutu, hızı ve düşman özelliklerine göre modelleyen bir sistem kullanır. Her düşman biriminin saniye başına düşen <strong>ateş hızı</strong> vardır ve drone menzindeyse periyodik olarak ateş etmeye çalışır.
    </p>
    <p>
      Hızlı ve küçük drone'lar vurulması zor hedeflerdir; yerde duranlar kolay hedef olur. Yüksek ateş hızına sahip düşmanlar zaman içinde daha fazla hasar verir.
    </p>
    <p>
      Başarılı bir isabet, drone'un <strong>can puanlarını</strong> azaltır. Can sıfıra ulaştığında drone imha olur. Bu sistem, oyuncunun düşman kümeleri üzerinde fazla durmaktan kaçınmasını ve hız ile dikkat arasında denge kurmasını teşvik eder.
    </p>`,

    bombardingText: `<p>
      <strong>dronETerra</strong>'da bomba atışı, planlama, hassasiyet ve hareketin dikkate alınmasını gerektiren temel bir savaş mekaniğidir. Drone hareket halindeyken atılan bomba hareket doğrultusunda kayar, durağanda ise dikey düşer; oyuncunun bunu hesaba katması gerekir.
    </p>
    <p>
      Her drone'nun sınırlı bir <strong>yük kapasitesi</strong> vardır ve tipi ile ekipmanına göre farklı sayıda bomba taşıyabilir. Tüm bombalar kullanıldığında, birkaç saniyelik otomatik bir <strong>yeniden yükleme</strong> süresi başlar.
    </p>
    <p>
      Bu mekanik, oyuncunun dikkatli nişan almasını, israfı önlemesini ve saldırı zamanını doğru seçmesini gerektirir. Başarı sadece bombaların sayısı ile değil, doğru kullanılma şekliyle gelir.
    </p>`,
    minesText: `<p>
    <strong>dronETerra</strong>'da mayınlar, anında hasar vermeyen ama savaş alanında pusular oluşturan stratejik mühimmat türleridir.
    Oyuncu, uçuş sırasında istediği zaman bir mayın bırakabilir ve bu mayın düştüğü yerde kalır. Mayınlar temasla patlamaz —
    düşman birimler yaklaştığında etkilenirler.
  </p>
  <p>
    Farklı türde mayınlar vardır: piyade karşıtı, antitank, manyetik ve benzeri.
    Her türün tetikleme koşulları, patlama yarıçapı ve belirli hedeflere karşı etkinliği farklıdır.
    Örneğin, antitank mayını piyade tarafından tetiklenmez ama ağır zırhlı aracı tek atışla yok edebilir.
  </p>
  <p>
    Bir kez tetiklendiğinde mayın otomatik olarak patlar ve etki alanı içinde hasar verir.
    Patlamaya yakalanan düşmanlar ya zarar görür ya da yok edilir.
    Bu, oyuncunun rotaları kapatmasına, konvoylara pusu kurmasına ve savunma hattı oluşturmasına olanak tanır
    — drone’larına minimum riskle.
  </p>`,

    dronesText: `<p>
    <strong>dronETerra</strong>'da oyuncu üç dron sınıfına erişebilir: <strong>küçük</strong>,
    <strong>orta</strong> ve <strong>büyük</strong>.
    Her tür, hızlı baskınlardan geniş çaplı bombardımanlara kadar savaş alanında farklı roller üstlenir.
  </p>

  <p>
    <strong>Küçük dron</strong> hafif ve çeviktir, en yüksek hız ve en düşük görünürlük değerine sahiptir.
    Yük kapasitesi sınırlıdır ve dayanıklılığı düşüktür fakat hassas saldırılar ve hava savunma sistemlerini etkisiz hale
    getirmek için idealdir. Düşük tespit seviyesi sayesinde, hızlı ve akıllıca kullanıldığında hedef almak zordur.
  </p>

  <p>
    <strong>Orta dron</strong> dengeli bir seçenektir: daha çok bomba taşıyabilir, iyi dayanıklılığa ve orta hızda ilerler.
    Tespiti daha kolaydır ama çoğu görevi yerine getirebilir — araçlara saldırı, kaset bombası atımı veya düşman hatlarının gerisine mayın yerleştirme gibi.
  </p>

  <p>
    <strong>Büyük dron</strong> devasa bomba stoğuna sahip bir hava platformudur.
    Ancak en yavaş, en görünür ve en savunmasız drondur.
    Geniş çaplı mayın döşeme veya geri tepme yapamayan düşmanlara karşı bombalama için idealdir.
  </p>

  <p>
    Dronların özellikleri arasında <strong>hız</strong>, <strong>dayanıklılık</strong> (HP),
    <strong>görünürlük</strong>, <strong>yük kapasitesi</strong> (bomba sayısı ve ağırlığı)
    ve mühimmat tükendikten sonra geçen <strong>yeniden yükleme süresi</strong> yer alır.
    Bu özellikler görevler arasında yükseltme sistemi ile geliştirilir.
  </p>`,

    fragBombText: `<p>
    <strong>Parçalanma bombası</strong>, <strong>dronETerra</strong>'da piyadeye karşı kullanılan temel mühimmat türüdür.
    Patladığında 7 m yarıçapta çok sayıda şarapnel parçaları yayılır.
    Patlama merkezine yakın olduğunda hasar ihtimali yüksektir. Sürünerek giden düşmanlar yalnızca doğrudan isabetle etkilenir.
  </p>
  <p>
    Parçalanma bombası hafiftir, az yer kaplar ve yüksek isabet gerektirmez:
    Patlamaya yakın isabet, bir grup piyade veya zırhlı dışı personel için yeterlidir.
    Ancak zırhlı olmayan araçlara karşı etkisi zayıftır ve zırhlılara karşı tamamen etkisizdir.
  </p>
  <p>
    Oyunun erken aşamalarında çok yönlü bir silahtır, özellikle düşman yığınları varsa etkilidir.
    Fakat bombaları hızlıca peş peşe bırakmak önerilmez: çünkü ilk patlama sonrası düşman yere yatar,
    sonraki patlamalar etkili olmaz.
  </p>`,

    fragBombTitle: "Parçalanma Bombası",
    heBombTitle: "Yüksek Patlayıcı Bomba (HE)",
    shapedBombTitle: "Şekillendirilmiş Yük Bombası",
    apMineTitle: "Piyade Karşıtı Mayın",
    tankMineTitle: "Antitank Mayını",
    magnetMineTitle: "Manyetik Mayın",
    clusterBombTitle: "Kaset Bombası",
    shapedClusterBombTitle: "AT Kaset Bombası",

    heBombText: `<p>
    <strong>HE bombası</strong>, <strong>dronETerra</strong>'da piyade ve hafif araçları yok etmek için kullanılan güçlü bir mühimmattır.
    Patladığında güçlü bir şok dalgası üretir ve doğrudan hedef almadan bile etkili olabilir.
    Ayakta veya çökük halde olan piyadeyi 2,5 m yarıçapta yok eder.
  </p>
  <p>
    Parçalanma bombasından daha ağırdır ve daha çok yer kaplar,
    fakat hem piyade hem de hafif araçlara karşı çok yönlüdür.
  </p>`,

    shapedBombText: `<p>
    <strong>Şekillendirilmiş yük bombası</strong>, <strong>dronETerra</strong>'da zırhlı araçları yok etmek için tasarlanmış özel bir mühimmattır.
    Patlamasında yüksek sıcaklıktaki odaklı bir jeti açığa çıkararak kalın zırhı delip geçebilir.
  </p>
  <p>
    Oyun, zırha nüfuz sistemine dayanan bir rastgelelik mekanizması kullanır:
    Her zırhlı hedefin bir <strong>zırh seviyesi</strong>,
    bombanın da bir <strong>nüfuz şansı</strong> vardır.
    Nüfuz, tüm kontroller başarılı olursa gerçekleşir.
    Örneğin: zırh = 1 ve şans = 0,9 → %90. Zırh = 3, şans = 0,9 → 0,9 × 0,9 × 0,9 ≈ %73.
  </p>`,

    apMineText: `<p>
    <strong>Piyade karşıtı mayın</strong>, <strong>dronETerra</strong>'da düşman piyadesini yok etmek için kullanılan gizli bir patlayıcı cihazdır.
    Drone'lar tarafından haritaya yerleştirilir ve tetiklenene kadar düşmanlar tarafından görünmeyebilir.
  </p>
  <p>
    Bir asker etkili alanına girdiğinde patlar, kritik hasar verir ve hedefi anında yok eder.
    Zırhlı olmayan araçların lastiklerine zarar verebilir.
    Diğer araçlar üzerine geçtiğinde mayını yok eder ama kendileri hasar almaz.
  </p>
  <p>
    Hafif yapısı sayesinde tek uçuşta birden fazla mayın yerleştirilebilir.
    Savunma, pusu kurma ve düşmanın ilerlemesini yavaşlatma için idealdir.
  </p>`,

    tankMineText: `<p>
    <strong>Antitank mayını</strong>, <strong>dronETerra</strong>'da araçlara karşı kullanılan güçlü bir patlayıcıdır.
    Drone'lar tarafından konur ve yalnızca araç üzerinden geçtiğinde aktifleşir;
    piyade geçişine tepki vermez.
  </p>
  <p>
    HE olmayan ve hafif araçlara büyük hasar verir,
    onları yok eder veya etkisiz hale getirir. Modern tanklara karşı etkinliği sınırlıdır.
  </p>
  <p>
    Ağır olması nedeniyle drone kapasitesinde çok yer kaplar,
    bu nedenle stratejik kullanım gerektirir.
    Doğrudan saldırmanın tehlikeli olduğu gelişmiş hava savunma sistemlerini yok etmek için idealdir.
  </p>`,

    magnetMineText: `<p>
    <strong>Manyetik mayın</strong>, <strong>dronETerra</strong>'da yüksek değerli düşman araçlarını yok etmek için tasarlanmış bir antitank mühimmatıdır.
    Bir araç – özellikle zırhlı bir araç – yaklaştığında otomatik olarak aktive olur, temas gerekmez.
  </p>
  <p>
    Tetiklendiğinde, aracın altındaki zırhı delip geçen odaklı bir jeti serbest bırakır,
    genellikle hedefi anında yok eder veya ateşe verir.
  </p>
  <p>
    Ağır yapısı nedeniyle drone kapasitesinin büyük bir kısmını kaplar,
    dolayısıyla uygulanması dikkatli planlanmalıdır.
    SAM sistemleri veya komuta araçları gibi yüksek değerli hedefler için idealdir.
  </p>`,

    clusterBombText: `<p>
    <strong>Kaset bombası</strong>, <strong>dronETerra</strong>'da havada patlayarak 7–13 küçük alt mühimmat serbest bırakan bir hava mühimmatıdır.
    Temel amacı, açık alandaki düşman piyadesi veya hafif araç grubunu etkisiz hale getirmektir.
  </p>
  <p>
    Yayılım deseni nedeniyle, hassas bir atış yapmadan bile etkili olabilir,
    özellikle drone durup hedefe kilitlenemezse faydalıdır.
  </p>
  <p>
    HE bombasından daha ağırdır ve daha fazla yer kaplar,
    ancak daha fazla toplam hasar verebilir.
    Orta veya ağır zırhlı hedeflere karşı etkisi düşüktür.
  </p>`,
    shapedClusterBombText: `<p>
  <strong>AT kaset bombası</strong>, <strong>dronETerra</strong>'da orta ve hafif zırhlı araçlara karşı kullanılan
  özel bir mühimmattır. Havada patlar ve <strong>7–13 zırh delici alt mühimmat</strong> serbest bırakır.
</p>
<p>
  Her alt mühimmat, zırhı delme yeteneğine sahiptir ve hafif veya orta zırhlı araçlara nüfuz edebilir,
  araçları ateşe verir veya etkisiz hale getirir. Yayılma deseni sayesinde, birden fazla hedefi aynı anda vurabilir
  ve zırhlı birliklere karşı son derece etkilidir.
</p>
<p>
  Yüksek ağırlığı nedeniyle, bir uçuşta taşınabilecek bomba sayısını sınırlar.
  Bu, zırhlı oluşumlara karşı hassas saldırılar için tasarlanmış bir silahtır —
  tek bir atışla birden fazla tehdidi etkisiz hale getirebilir.
</p>`,
  },
  it: {
    infoTitle: "Informazioni di gioco",
    game: "Gameplay",
    mechanics: "Meccaniche",
    drones: "Droni",
    ammo: "Munizioni",
    enemies: "Nemici",
    back: "Indietro",
    gameTitle: "Panoramica del Gioco",
    mechanicsTitle: "Meccaniche di Gioco",
    ap: "Penetrazione Corazzata",
    visibility: "Visibilità del Drone",
    droneFire: "Fuoco sul Drone",
    bombarding: "Bombardamento",
    mines: "Minamento",
    dronesTitle: "Informazioni sui Droni",
    ammoTitle: "Informazioni sulle Munizioni",
    enemiesTitle: "Informazioni sui Nemici",

    fragBomb: `<div class="fragBomb_image_small"></div> Bomba a Frammentazione`,
    heBomb: `<div class="heBomb_image_small"></div> Bomba ad Alto Esplosivo`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Bomba a Carica Cava`,
    apMine: `<div class="footMine_image_small"></div> Mina Antiuomo`,
    tankMine: `<div class="tankMine_image_small"></div> Mina Anticarro`,
    magnetMine: `<div class="magnetMine_image_small"></div> Mina Magnetica`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Bomba a Grappolo`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> Bomba AT a Grappolo`,

    name: "Nome",
    armor: "Corazza",
    speed: `colpi<br />al sec`,
    campaignPoints: `punti<br />campagna`,
    lastStandPoints: `punti<br />resistenza`,

    rifleman: "Fante",
    machinegunner: "Mitragliere",
    grenadier: "Lanciatore",
    crew: "Equipaggio",

    ural: "Ural",
    uralSupply: `Ural<br />Rifornimenti`,
    gaz66: "GAZ‑66",
    uaz452: "UAZ‑452",
    guntruck: `Pickup con<br />Mitragliatrice`,
    jeep: `Pickup`,
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT‑LB",
    mtlbKPVT: `MT‑LB con<br />Mitragliatrice KPVT`,
    mtlbzu23: `MT‑LB con<br />Cannone ZU‑23`,
    btr82: "BTR‑82",
    bmp1: "BMP‑1",
    bmp2: "BMP‑2",
    bmp3: "BMP‑3",
    bukM2: "Buk‑M2",
    shilka: "Shilka",
    msta: `Semovente<br />d'Artiglieria`,
    t55: "T‑55",
    t62: "T‑62",
    t72: "T‑72",
    t72B3: "T‑72B3",
    t90: "T‑90",

    gameText: `<p>
      <strong>dronETerra</strong> è un gioco tattico in cui controlli droni armati
      su un campo di battaglia pieno di veicoli e fanteria nemica. Scegli attentamente i tuoi droni,
      equipaggiali con diversi tipi di bombe e pianifica gli attacchi per massimizzare la distruzione
      minimizzando le perdite. <strong>Precisione e tempismo sono fondamentali</strong> — un solo errore può compromettere la missione.
    </p>
  
    <p>
      Ogni drone può trasportare vari tipi di armi: da bombe esplosive a mine a piedi,
      fino a munizioni a grappolo avanzate e cariche cave. Il campo di battaglia è dinamico —
      rinforzi nemici, convogli corazzati e camion di rifornimento rendono ogni missione unica e impegnativa.
    </p>
  
    <p>
      Tra le missioni puoi potenziare i tuoi droni, sbloccare nuove attrezzature e ottimizzare il carico
      per affrontare le minacce future. <strong>Ogni upgrade è importante</strong>: più danni, maggiore velocità o raggio d’esplosione
      possono cambiare l’esito di una battaglia. Scegli con attenzione: non puoi portare tutto.
    </p>
  
    <p>
      Il gioco include una campagna con missioni create a mano e una modalità <em>"Ultima Resistenza"</em>,
      in cui la sopravvivenza dipende da abilità e gestione delle risorse. Con ogni ondata i nemici diventano più forti —
      solo i migliori sopravvivranno. <strong>Sei pronto a dominare i cieli?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong> utilizza un sistema probabilistico di penetrazione corazzata che simula la difficoltà di danneggiare veicoli blindati.
      Ogni bersaglio corazzato ha un valore numerico di <strong>corazza</strong>, che rappresenta la sua resistenza.
      Ogni munizione anticarro ha una <strong>probabilità di penetrazione</strong> — la possibilità di penetrare un singolo punto di corazza.
    </p>
    <p>
      Quando il bersaglio viene colpito, il gioco esegue <strong>controlli indipendenti multipli</strong> — uno per ogni punto di corazza.
      Per penetrare, tutti i controlli devono andare a buon fine.
    </p>
    <p>
      Esempio: corazza = 1 e penetrazione = 0,9 → 90%. Con corazza = 3 e penetrazione = 0,9 → 0,9 × 0,9 × 0,9 ≈ 73%.
    </p>
    <p>
      Se la penetrazione ha successo, il bersaglio prende fuoco ed è distrutto.
      Se almeno uno dei controlli fallisce, l'effetto non si applica.
      Questo incoraggia il giocatore a scegliere l’arma giusta per ogni tipo di nemico.
    </p>`,

    visibilityText: `<p>
      In <strong>dronETerra</strong> la rilevazione dei droni da parte dei nemici è dinamica.
      La probabilità che un drone venga individuato dipende dalla distanza,
      ma anche dalla sua <strong>dimensione</strong> e dalla <strong>recente attività</strong>.
    </p>
    <p>
      Ogni drone ha un valore base di <strong>visibilità</strong> in base alla taglia:
      i droni grandi vengono scoperti prima, quelli piccoli più difficilmente.
      Tuttavia ogni bombardamento aumenta temporaneamente la visibilità.
      Più bombe vengono sganciate in poco tempo, maggiore è il rischio.
      Questo effetto si accumula, ma svanisce gradualmente.
    </p>`,

    droneFireText: `<p>
      In <strong>dronETerra</strong> il fuoco nemico sui droni dipende dalla <strong>taglia</strong>, <strong>velocità</strong>
      e dalle <strong>caratteristiche nemiche</strong>. Ogni unità nemica ha una <strong>frequenza di fuoco</strong>
      (colpi al secondo) e tenta di colpire il drone quando è a portata.
    </p>
    <p>
      La probabilità di colpire diminuisce all’aumentare della velocità e se il drone è piccolo.
      I droni fermi sono facili bersagli. Nemici con alta frequenza di fuoco possono causare molti danni.
    </p>
    <p>
      Un colpo riuscito riduce i <strong>punti vita</strong> del drone.
      Se arrivano a zero, il drone è distrutto.
      Questo sistema premia un uso cauto e attento del movimento.
    </p>`,

    bombardingText: `<p>
      In <strong>dronETerra</strong> il bombardamento è un’azione fondamentale che richiede
      precisione, pianificazione e attenzione al movimento del drone.
      Le bombe cadono verticalmente se il drone è fermo, altrimenti seguono la traiettoria.
    </p>
    <p>
      Ogni drone ha una <strong>capacità di carico</strong> limitata e può portare un certo numero di bombe.
      Dopo averle sganciate tutte, inizia un <strong>riarmo automatico</strong> con qualche secondo di attesa.
    </p>
    <p>
      Questa meccanica obbliga il giocatore a colpire con precisione e non sprecare munizioni.
      Il successo dipende non solo dal numero di bombe, ma da come vengono utilizzate.
    </p>`,
    minesText: `<p>
    In <strong>dronETerra</strong>, le mine sono un tipo strategico di munizioni che non infliggono danni immediati,
    ma creano trappole sul campo di battaglia. Il giocatore può piazzare una mina in qualsiasi momento durante il volo:
    essa resterà nel punto di impatto. Le mine non esplodono al contatto — si attivano quando
    un’unità nemica si avvicina.
  </p>
  <p>
    Esistono vari tipi di mine: anti‑persona, anti‑carro, magnetiche, ecc.
    Ciascuna ha condizioni di attivazione, raggio d’azione ed efficacia specifici.
    Ad esempio, una mina anti‑carro non si attiva con la fanteria, ma può distruggere mezzi pesanti in un colpo solo.
  </p>
  <p>
    Una volta attiva, la mina esplode automaticamente, infliggendo danni nell’area circostante.
    Le unità nemiche colpite verranno danneggiate o distrutte.
    Questo permette al giocatore di bloccare percorsi, tendere imboscate e creare
    posizioni difensive sul campo di battaglia.
  </p>`,

    dronesText: `<p>
    In <strong>dronETerra</strong>, il giocatore ha a disposizione tre classi di droni: <strong>piccolo</strong>,
    <strong>medio</strong> e <strong>grande</strong>.
    Ogni tipo ha caratteristiche uniche che ne definiscono il ruolo: da incursioni rapide
    a bombardamenti su larga scala.
  </p>

  <p>
    Il <strong>dronet piccolissimo</strong> è leggero e maneggevole, con la massima velocità e visibilità minima.
    Il suo carico è limitato e la durabilità bassa, ma è ideale per attacchi di precisione e neutralizzare
    i sistemi antiaerei più forti. Grazie alla sua bassa rilevabilità, è difficile da abbattere.
  </p>

  <p>
    Il <strong>dronet medio</strong> è un'opzione bilanciata con statistiche solide.
    Trasporta più bombe, ha maggiore durabilità e velocità moderata.
    È più facile da rilevare rispetto al piccolo, ma può svolgere la maggior parte dei compiti:
    attaccare mezzi, sganciare bombe a grappolo o piantare mine nelle retrovie.
  </p>

  <p>
    Il <strong>dronet grande</strong> è una piattaforma volante con riserve massive di bombe.
    Tuttavia, è il più lento, visibile e vulnerabile.
    È perfetto per ampie operazioni di minaggio o bombardamenti pesanti contro nemici che non possono rispondere.
  </p>

  <p>
    Le caratteristiche dei droni includono <strong>velocità</strong>, <strong>durabilità</strong> (HP),
    <strong>visibilità</strong>, <strong>capacità di carico</strong> (numero e peso delle bombe)
    e <strong>tempo di ricarica</strong> dopo aver esaurito le munizioni.
    Queste statistiche possono essere migliorate tra le missioni tramite il sistema di upgrade.
  </p>`,

    fragBombText: `<p>
    <strong>Bomba a frammentazione</strong> è un tipo base di munizione in <strong>dronETerra</strong>,
    pensata per contrastare la fanteria. Alla detonazione rilascia numerosi frammenti
    che si diffondono in un raggio di 7 m. Più ci si avvicina al centro dell’esplosione, maggiore è la probabilità di colpire.
    Non danneggia i nemici striscianti a meno che non vengano colpiti direttamente.
  </p>
  <p>
    La bomba a frammentazione è leggera, occupa poco spazio nel drone e non richiede una precisione elevata —
    è sufficiente avvicinarsi al bersaglio per eliminare gruppi di fanteria o equipaggio a piedi.
    Tuttavia, è inefficace contro mezzi non corazzati e totalmente inutile contro quelli corazzati.
  </p>
  <p>
    Si tratta di un'arma versatile nelle fasi iniziali del gioco, soprattutto contro gruppi nemici.
    Non è consigliabile sganciarne troppe rapidamente: dopo la prima esplosione, i nemici si ripiegheranno,
    diminuendo l’efficacia dei colpi successivi.
  </p>`,
    heBombText: `<p>
  <strong>Bomba ad Alto Esplosivo</strong> è una munizione caricata con esplosivo in <strong>dronETerra</strong>,
  progettata per distruggere fanteria e veicoli leggeri. All'esplosione, genera un'onda d'urto potente e un effetto deflagrante
  capace di eliminare la fanteria, veicoli non corazzati e leggermente corazzati anche senza colpo diretto.
  Uccide la fanteria entro un raggio di 2,5 metri, sia in piedi che a terra.
</p>
<p>
  A differenza della bomba a frammentazione, la bomba ad alto esplosivo è più pesante e occupa più spazio nel drone,
  ma è molto versatile — può eliminare sia la fanteria che i veicoli leggeri.
</p>`,

    shapedBombText: `<p>
  <strong>Bomba a Carica Cava</strong> è una munizione specializzata in <strong>dronETerra</strong>,
  progettata per distruggere veicoli corazzati. All'esplosione, genera un getto concentrato di calore estremo
  capace di perforare anche le corazze più spesse.
</p>
<p>
  Il gioco utilizza un sistema probabilistico per la penetrazione: ogni bersaglio corazzato ha un <strong>livello di corazza</strong>,
  mentre la bomba ha una <strong>capacità di penetrazione</strong>. Per perforare la corazza, vengono eseguiti controlli multipli —
  uno per ogni livello di protezione. Se tutti i controlli hanno successo, il bersaglio prende fuoco e viene distrutto.
</p>
<p>
  Ad esempio, con corazza 1 e penetrazione = 0,9, la probabilità di successo è del 90%.
  Con corazza 3 e penetrazione 0,9, la probabilità diventa 0,9 × 0,9 × 0,9 ≈ 73%.
</p>`,

    apMineText: `<p>
  <strong>Mina Antipersona</strong> è un ordigno esplosivo a bassa visibilità in <strong>dronETerra</strong>,
  progettato per eliminare la fanteria nemica. Può essere posizionata dai droni ovunque sulla mappa
  e diventa invisibile fino all'attivazione.
</p>
<p>
  Si attiva quando un soldato entra nel suo raggio di attivazione, causando danni critici e uccidendo istantaneamente.
  Ha una piccola possibilità di fermare veicoli non corazzati danneggiandone le ruote.
  Altri veicoli la distruggono passandoci sopra senza subire danni.
</p>
<p>
  Grazie al peso ridotto, occupa poco spazio nel drone, consentendo il rilascio di molte mine in un solo volo.
  Ideale per difesa, imboscate e rallentamento dell'avanzata nemica.
</p>`,

    tankMineText: `<p>
  <strong>Mina Anticarro</strong> è un pesante ordigno esplosivo in <strong>dronETerra</strong>,
  progettato per danneggiare veicoli nemici. Può essere posizionata dai droni e si attiva solo al passaggio dei veicoli —
  la fanteria può passarle accanto senza conseguenze. Dopo gli aggiornamenti, può essere attivata anche dalla fanteria,
  anche se questo non è il suo uso principale.
</p>
<p>
  Causa gravi danni a veicoli non corazzati e leggermente corazzati, distruggendoli o danneggiandoli gravemente.
  Contro i carri armati moderni è poco efficace.
</p>
<p>
  A causa del peso elevato, occupa molto spazio nel drone, richiedendo un uso strategico.
  Ideale per distruggere sistemi di difesa aerea troppo pericolosi da avvicinare direttamente.
</p>`,

    magnetMineText: `<p>
  <strong>Mina Magnetica</strong> è una munizione pesante anticarro in <strong>dronETerra</strong>,
  progettata per eliminare veicoli nemici di alto valore. Si attiva automaticamente quando un <strong>bersaglio metallico</strong> —
  come un veicolo corazzato — si avvicina, senza bisogno di contatto diretto.
</p>
<p>
  All’attivazione, emette un <strong>getto a carica cava</strong> che penetra la parte inferiore del veicolo —
  una delle zone più vulnerabili. L'impatto di solito provoca la distruzione o l'incendio immediato del bersaglio.
</p>
<p>
  A causa del peso elevato, occupa gran parte della capacità di carico del drone,
  quindi il suo utilizzo va pianificato attentamente.
  Ideale per distruggere bersagli importanti come sistemi missilistici o veicoli comando.
</p>`,

    clusterBombText: `<p>
  <strong>Bomba a Grappolo</strong> è una munizione aerea in <strong>dronETerra</strong> che esplode in volo,
  rilasciando <strong>7–13 submunizioni</strong> che coprono un'ampia area.
  Il suo scopo principale è eliminare gruppi di fanteria nemica o veicoli leggeri sparsi sul terreno.
</p>
<p>
  Grazie alla dispersione, è efficace anche con lanci imprecisi —
  utile quando il drone non può fermarsi per mirare con precisione.
</p>
<p>
  Ha un peso elevato e occupa più spazio rispetto a una bomba HE standard,
  ma può causare danni complessivi molto maggiori. Poco efficace contro bersagli corazzati medi o pesanti.
</p>`,

    shapedClusterBombText: `<p>
  <strong>Bomba a Grappolo Anticarro</strong> è una munizione specializzata in <strong>dronETerra</strong>
  che esplode in volo e rilascia <strong>7–13 submunizioni perforanti</strong>.
  A differenza delle bombe a grappolo standard, questa è progettata per affrontare veicoli corazzati.
</p>
<p>
  Ogni submunizione ha capacità perforanti e può penetrare corazze leggere e medie,
  causando incendi o danni critici. La dispersione consente di colpire più bersagli contemporaneamente,
  rendendola molto efficace contro gruppi di veicoli.
</p>
<p>
  Il peso elevato limita il numero di bombe trasportabili per volo.
  È un’arma di precisione per colpire formazioni corazzate con un solo lancio.
</p>`,
  },
  pl: {
    infoTitle: "Informacje o grze",
    game: "Rozgrywka",
    mechanics: "Mechaniki",
    drones: "Drony",
    ammo: "Amunicja",
    enemies: "Wrogowie",
    back: "Wstecz",
    gameTitle: "Opis gry",
    mechanicsTitle: "Mechaniki gry",
    ap: "Przebijalność pancerza",
    visibility: "Wykrywalność drona",
    droneFire: "Ostrzał drona",
    bombarding: "Zrzut bomb",
    mines: "Minowanie",
    dronesTitle: "Informacje o dronach",
    ammoTitle: "Informacje o amunicji",
    enemiesTitle: "Informacje o wrogach",

    fragBomb: `<div class="fragBomb_image_small"></div> Bomba odłamkowa`,
    heBomb: `<div class="heBomb_image_small"></div> Bomba burząca`,
    shapedBomb: `<div class="shapedBomb_image_small"></div> Bomba kumulacyjna`,
    apMine: `<div class="footMine_image_small"></div> Mina przeciwpiechotna`,
    tankMine: `<div class="tankMine_image_small"></div> Mina przeciwpancerna`,
    magnetMine: `<div class="magnetMine_image_small"></div> Mina magnetyczna`,
    clusterBomb: `<div class="clusterBomb_image_small"></div> Bomba kasetowa`,
    shapedClusterBomb: `<div class="shapedClusterBomb_image_small"></div> Ppanc. bomba kasetowa`,

    name: "Nazwa",
    armor: "Pancerz",
    speed: `strzały<br />na sek.`,
    campaignPoints: `punkty<br />kampania`,
    lastStandPoints: `punkty<br />ostatni bastion`,

    rifleman: "Strzelec",
    machinegunner: "Karabinier",
    grenadier: "Granatnik",
    crew: "Załoga",

    ural: "Ural",
    uralSupply: `Ural<br />Zaopatrzenie`,
    gaz66: "GAZ-66",
    uaz452: "UAZ-452",
    guntruck: `Pickup z<br />karabinem`,
    jeep: "Pickup",
    grad: "Grad",
    tigr: "Tigr",
    mtlb: "MT-LB",
    mtlbKPVT: `MT-LB z<br />karabinem KPWT`,
    mtlbzu23: `MT-LB z<br />działkiem ZU-23`,
    btr82: "BTR-82",
    bmp1: "BMP-1",
    bmp2: "BMP-2",
    bmp3: "BMP-3",
    bukM2: "Buk-M2",
    shilka: "Shilka",
    msta: `Samobieżna<br />haubica`,
    t55: "T-55",
    t62: "T-62",
    t72: "T-72",
    t72B3: "T-72B3",
    t90: "T-90",

    gameText: `<p>
      <strong>dronETerra</strong> to gra taktyczna, w której kontrolujesz uzbrojone drony
      na polu bitwy pełnym pojazdów i piechoty wroga. Ostrożnie wybierz swoje drony,
      uzbrój je w różne typy bomb i zaplanuj atak, aby zmaksymalizować zniszczenia
      i zminimalizować straty. <strong>Precyzja i timing to wszystko</strong> — jeden błąd może kosztować misję.
    </p>
  
    <p>
      Każdy dron może przenosić różne typy broni: od bomb burzących i min przeciwpiechotnych
      po zaawansowaną amunicję kasetową i ładunki kumulacyjne. Pole bitwy ciągle się zmienia —
      posiłki wroga, konwoje opancerzone i ciężarówki zaopatrzeniowe sprawiają, że każda misja jest unikalna i wymagająca.
    </p>
  
    <p>
      Między misjami możesz ulepszać swoje drony, odblokowywać nowe wyposażenie
      i optymalizować ładunek przed kolejnymi zagrożeniami. <strong>Każde ulepszenie ma znaczenie</strong>:
      większe obrażenia, lepsza prędkość lub większy promień rażenia mogą przeważyć szalę zwycięstwa.
    </p>
  
    <p>
      Gra zawiera kampanię z ręcznie zaprojektowanymi misjami oraz tryb <em>"Ostatni Bastion"</em>,
      w którym przetrwanie zależy od umiejętności i zarządzania zasobami. Z każdą falą wróg staje się silniejszy —
      przetrwają tylko najlepiej przygotowani. <strong>Gotów, by przejąć kontrolę nad niebem?</strong>
    </p>`,

    apText: `<p>
      <strong>dronETerra</strong> wykorzystuje probabilistyczny system przebijalności pancerza, który symuluje trudność zniszczenia opancerzonych celów.
      Każdy cel ma określoną wartość <strong>pancerza</strong>, która definiuje jego odporność.
      Amunicja przeciwpancerna ma parametr <strong>przebijalności</strong> — szansę na przebicie jednego punktu pancerza.
    </p>
    <p>
      Po trafieniu cel wykonywane są <strong>niezależne testy</strong> — jeden na każdy punkt pancerza.
      Wszystkie muszą zakończyć się sukcesem, by pancerz został przebity.
      Przykład: pancerz = 1, przebijalność = 0.9 → 90%.
      Pancerz = 3, przebijalność = 0.9 → 0.9 × 0.9 × 0.9 ≈ 73%.
    </p>
    <p>
      Jeśli przebicie się uda, cel zostaje podpalony i unieszkodliwiony.
      Jeśli choć jeden test się nie powiedzie — pancerz nie zostaje przebity i nie ma efektu.
      Zachęca to gracza do używania odpowiedniej amunicji wobec konkretnych celów.
    </p>`,

    visibilityText: `<p>
      W <strong>dronETerra</strong> wrogowie dynamicznie wykrywają drony.
      Szansa wykrycia zależy nie tylko od dystansu,
      ale też od <strong>rozmiaru drona</strong> i jego <strong>ostatnich działań bojowych</strong>.
    </p>
    <p>
      Każdy dron ma bazowy poziom <strong>widoczności</strong>, zależny od jego rozmiaru:
      duże są wykrywane szybciej, małe trudniej. Ale największy wpływ ma aktywność:
      każde zrzucenie bomby tymczasowo zwiększa widoczność.
      Im więcej bomb w krótkim czasie — tym większe ryzyko wykrycia.
      Efekt się kumuluje, ale z czasem maleje.
    </p>`,

    droneFireText: `<p>
      W <strong>dronETerra</strong> system ostrzału dronów uwzględnia <strong>rozmiar</strong>, <strong>prędkość</strong>
      oraz <strong>statystyki przeciwnika</strong>. Każda jednostka ma określoną <strong>szybkostrzelność</strong> (strzały na sekundę)
      i regularnie próbuje trafić drona, jeśli jest w zasięgu.
    </p>
    <p>
      Szansa trafienia spada przy większej prędkości drona i jest mniejsza dla małych modeli.
      Nieruchomy dron to łatwy cel. Wrogowie z wysoką szybkostrzelnością mają więcej okazji do zadania obrażeń.
    </p>
    <p>
      Trafienie zmniejsza <strong>punkty życia</strong> drona.
      Po ich utracie dron zostaje zniszczony.
      Gracz powinien unikać unoszenia się nad przeciwnikiem
      i rozsądnie oceniać ryzyko. Przetrwanie zależy od ostrożności i tempa.
    </p>`,

    bombardingText: `<p>
      W <strong>dronETerra</strong> zrzut bomb to kluczowy element walki,
      wymagający precyzji, planowania i kontroli ruchu.
      Bomba spada pionowo w dół, jeśli dron jest nieruchomy.
      W ruchu — odchylenie następuje w kierunku lotu drona.
    </p>
    <p>
      Każdy dron ma <strong>ograniczoną ładowność</strong> i może nieść różną liczbę bomb,
      zależnie od typu i wyposażenia. Po zrzuceniu wszystkich bomb
      następuje <strong>automatyczne przeładowanie</strong> po krótkim czasie.
    </p>
    <p>
      Mechanika ta zmusza gracza do celowania z rozwagą, oszczędzania bomb
      i wybierania właściwego momentu ataku.
      Sukces zależy nie tylko od liczby bomb, ale od ich efektywnego użycia.
    </p>`,
    minesText: `<p>
    W <strong>dronETerra</strong> miny są strategicznym rodzajem amunicji, która nie powoduje natychmiastowego obrażenia,
    lecz tworzy pułapki na polu bitwy. Gracz może zrzucić minę w dowolnym momencie lotu,
    a ona pozostanie w miejscu upadku. Miny nie wybuchają od razu — aktywują się, gdy
    jednostka wroga się do nich zbliży.
  </p>
  <p>
    Istnieją różne typy min: przeciwpiechotne, przeciwpancerne, magnetyczne itp. Mają
    różne zasięgi działania, siłę rażenia i skuteczność przeciw określonym celom.
    Na przykład mina przeciwpancerna nie aktywuje się od piechoty, ale potrafi zniszczyć ciężki sprzęt.
  </p>
  <p>
    Po aktywacji mina wybucha automatycznie, zadając obrażenia w swoim polu rażenia.
    Wrogowie w zasięgu eksplozji zostają ranni lub zniszczeni.
    Pozwala to graczowi blokować trasy, zatrzymywać konwoje i tworzyć
    pozycje obronne na polu walki.
  </p>`,
    dronesText: `<p>
    W <strong>dronETerra</strong> gracz ma dostęp do trzech klas dronów: <strong>małego</strong>,
    <strong>średniego</strong> i <strong>dużego</strong>.
    Każdy typ ma unikalne cechy, które definiują jego rolę na polu bitwy — od szybkich
    rajdów po masowe bombardowania.
  </p>

  <p>
    <strong>Mały dron</strong> – lekki i zwinny, z najwyższą prędkością i najmniejszą wykrywalnością.
    Jego zapas amunicji jest ograniczony, a trwałość niewielka, ale najlepiej nadaje się
    do precyzyjnych uderzeń i eliminowania silnych systemów przeciwlotniczych.
    Dzięki niskiej wykrywalności jest trudny do trafienia, jeśli stosujesz szybkie i zwinne manewry.
  </p>

  <p>
    <strong>Średni dron</strong> – uniwersalny, zrównoważony pod względem parametrów.
    Może przenosić więcej bomb, ma lepszą trwałość i umiarkowaną prędkość.
    Jest łatwiej wykrywalny niż mały, ale potrafi wykonać większość zadań:
    atakować pojazdy, zrzucać bomby kasetowe lub prowadzić minowanie za linią wroga.
  </p>

  <p>
    <strong>Duży dron</strong> – latająca platforma z ogromnym zapasem amunicji.
    Jednocześnie najwolniejszy, najbardziej widoczny i podatny na zniszczenie.
    Idealny do masowego minowania lub bombardowań dużych skupisk wrogów, które
    nie mogą się bronić.
  </p>

  <p>
    Parametry dronów obejmują <strong>prędkość</strong>, <strong>wytrzymałość</strong> (HP),
    <strong>widoczność</strong>, <strong>ładowność</strong> (ilość i wagę bomb)
    oraz <strong>czas przeładowania</strong> po wyczerpaniu amunicji.
    Można je ulepszać między misjami za pomocą systemu usprawnień.
  </p>`,
    fragBombText: `<p>
  <strong>Bomba odłamkowa</strong> to podstawowy typ amunicji w <strong>dronETerra</strong>,
  przeznaczony do zwalczania piechoty. Przy detonacji uwalnia dużą ilość odłamków
  w promieniu 7 m. Im bliżej środka eksplozji, tym większa szansa na trafienie.
  Nie oddziałuje na wrogów czołgających się, chyba że nastąpi bezpośredni traf.
</p>
<p>
  Bomba odłamkowa jest lekka, zajmuje niewiele miejsca w dronie i nie wymaga dużej
  celności — wystarczy rażenie w pobliżu, by wyeliminować grupy piechoty lub obsadę pojazdu.
  Jest jednak mało skuteczna przeciwko sprzętowi nieopancerzonemu, a przeciw opancerzonemu – zupełnie nieskuteczna.
</p>
<p>
  To uniwersalna broń w początkowej fazie gry, szczególnie skuteczna przeciw skupiskom wroga.
  Nie zaleca się zrzutu wielu bomb jedna po drugiej, gdyż po pierwszej eksplozji wrogowie się położą i dalsze bomby nie wyrządzą znaczących szkód.
</p>`,
    heBombText: `<p>
<strong>Bomba Odłamkowo-Burząca</strong> to ładunek wybuchowy w grze <strong>dronETerra</strong>,
przeznaczony do niszczenia piechoty i lekkich pojazdów. Po detonacji generuje silną falę uderzeniową i efekt wybuchu,
zdolny do eliminacji piechoty, nieopancerzonych i lekko opancerzonych pojazdów, nawet bez bezpośredniego trafienia.
Zabija piechotę w promieniu 2,5 metra – zarówno stojącą, jak i leżącą.
</p>
<p>
W porównaniu do bomby odłamkowej, bomba odłamkowo-burząca jest cięższa i zajmuje więcej miejsca w dronie,
ale jest bardzo uniwersalna — może niszczyć zarówno piechotę, jak i lekkie pojazdy.
</p>`,

    shapedBombText: `<p>
<strong>Bomba kumulacyjna</strong> to specjalistyczna amunicja w grze <strong>dronETerra</strong>,
przeznaczona do niszczenia pojazdów opancerzonych. Po detonacji wytwarza skoncentrowany strumień ekstremalnego ciepła,
zdolny do przebicia nawet najgrubszych pancerzy.
</p>
<p>
Gra wykorzystuje probabilistyczny system penetracji: każdy opancerzony cel ma <strong>poziom pancerza</strong>,
a bomba — parametr <strong>przebijalności</strong>. Aby przebić pancerz, wykonywanych jest kilka testów — po jednym na każdy poziom ochrony.
Jeśli wszystkie zakończą się powodzeniem, cel zostaje podpalony i zniszczony.
</p>
<p>
Na przykład: dla pancerza 1 i przebijalności = 0,9, szansa przebicia wynosi 90%.
Dla pancerza 3 i przebijalności = 0,9, szansa wynosi 0,9 × 0,9 × 0,9 ≈ 73%.
</p>`,

    apMineText: `<p>
<strong>Mina przeciwpiechotna</strong> to niewidoczny ładunek wybuchowy w grze <strong>dronETerra</strong>,
przeznaczony do eliminacji wrogiej piechoty. Może być rozmieszczona przez drony w dowolnym miejscu na mapie
i staje się niewidoczna dla wrogów aż do momentu aktywacji.
</p>
<p>
Mina aktywuje się, gdy żołnierz wejdzie w jej promień działania, zadając krytyczne obrażenia i natychmiast eliminując cel.
Ma niewielką szansę na zatrzymanie nieopancerzonych pojazdów przez uszkodzenie ich kół.
Inne pojazdy po prostu niszczą minę, najeżdżając na nią, nie odnosząc przy tym żadnych obrażeń.
</p>
<p>
Dzięki niewielkiej wadze zajmuje mało miejsca w dronie, co pozwala na zrzucenie wielu min podczas jednego lotu.
Idealna do obrony, zasadzek i spowalniania wrogiego natarcia.
</p>`,

    tankMineText: `<p>
<strong>Mina przeciwpancerna</strong> to ciężki ładunek wybuchowy w grze <strong>dronETerra</strong>,
zaprojektowany do niszczenia wrogich pojazdów. Może być rozmieszczona przez drony i aktywuje się tylko, gdy najedzie na nią pojazd —
piechota może przejść obok bez konsekwencji. Po ulepszeniach może być aktywowana także przez piechotę,
choć nie jest to jej główne przeznaczenie.
</p>
<p>
Mina zadaje znaczne obrażenia nieopancerzonym i lekko opancerzonym pojazdom, niszcząc je lub poważnie uszkadzając.
Przeciwko nowoczesnym czołgom jej skuteczność jest ograniczona.
</p>
<p>
Z uwagi na dużą wagę zajmuje sporo miejsca w dronie, co wymaga strategicznego planowania.
Idealna do niszczenia systemów obrony powietrznej, do których niebezpiecznie jest się zbliżać.
</p>`,

    magnetMineText: `<p>
<strong>Mina magnetyczna</strong> to ciężka amunicja przeciwpancerna w grze <strong>dronETerra</strong>,
zaprojektowana do eliminacji najcenniejszych pojazdów wroga. Aktywuje się automatycznie, gdy w pobliżu znajdzie się <strong>metalowy cel</strong> —
zwłaszcza pojazd opancerzony — bez potrzeby bezpośredniego kontaktu z gąsienicą lub kołami.
</p>
<p>
Po aktywacji emituje <strong>strumień kumulacyjny</strong>, który przebija spód pojazdu —
jedną z jego najbardziej wrażliwych stref. Zwykle skutkuje to natychmiastowym zniszczeniem lub zapłonem celu.
</p>
<p>
Ze względu na dużą wagę mina zajmuje znaczną część ładowności drona, więc jej użycie musi być dobrze zaplanowane.
Idealna do eliminowania szczególnie niebezpiecznych celów, takich jak systemy rakietowe czy pojazdy dowodzenia.
</p>`,

    clusterBombText: `<p>
<strong>Bomba kasetowa</strong> to lotnicza amunicja w grze <strong>dronETerra</strong>, która wybucha w powietrzu,
uwalniając <strong>7–13 subamunicji</strong> obejmujących rozległy obszar.
Jej głównym celem jest eliminacja grup piechoty wroga lub lekkich pojazdów rozproszonych na dużej powierzchni.
</p>
<p>
Dzięki szerokiemu rozrzutowi jest skuteczna nawet przy niedokładnych zrzutach —
szczególnie przydatna, gdy dron nie może się zatrzymać, aby precyzyjnie celować.
</p>
<p>
Ma dużą wagę i zajmuje więcej miejsca niż standardowa bomba odłamkowo-burząca,
ale może wyrządzić znacznie większe szkody ogólne. Jej główną wadą jest niska skuteczność wobec średnio i ciężko opancerzonych celów.
</p>`,

    shapedClusterBombText: `<p>
<strong>Przeciwpancerna bomba kasetowa</strong> to specjalistyczna amunicja w grze <strong>dronETerra</strong>,
która wybucha w powietrzu, uwalniając <strong>7–13 subamunicji przebijających pancerz</strong>.
W odróżnieniu od standardowej bomby kasetowej, ta wersja została zaprojektowana do zwalczania pojazdów opancerzonych.
</p>
<p>
Każda subamunicja ma właściwości penetracyjne i może przebić lekki lub średni pancerz,
powodując zapłon lub unieruchomienie celu. Dzięki rozrzutowi możliwe jest trafienie wielu celów jednocześnie,
co czyni tę broń bardzo skuteczną przeciwko grupom pojazdów.
</p>
<p>
Duża waga ogranicza liczbę bomb możliwych do zabrania na jeden lot.
To broń precyzyjna do ataku na formacje opancerzone — umożliwia zneutralizowanie wielu zagrożeń jednym zrzutem.
</p>`,
  },
};

window.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("lang") || "en";

  function t(key) {
    return (languages[currentLang] && languages[currentLang][key]) || key;
  }

  document.getElementById("infoTitle").innerHTML = t("infoTitle");
  document.getElementById("game").innerHTML = t("game");
  document.getElementById("mechanics").innerHTML = t("mechanics");
  document.getElementById("drones").innerHTML = t("drones");
  document.getElementById("ammo").innerHTML = t("ammo");
  document.getElementById("enemies").innerHTML = t("enemies");
  document.getElementById("back").innerHTML = t("back");
  document.getElementById("gameTitle").innerHTML = t("gameTitle");
  document.getElementById("mechanicsTitle").innerHTML = t("mechanicsTitle");
  document.getElementById("ap").innerHTML = t("ap");
  document.getElementById("visibility").innerHTML = t("visibility");
  document.getElementById("droneFire").innerHTML = t("droneFire");
  document.getElementById("bombarding").innerHTML = t("bombarding");
  document.getElementById("mines").innerHTML = t("mines");
  document.getElementById("dronesTitle").innerHTML = t("dronesTitle");
  document.getElementById("ammoTitle").innerHTML = t("ammoTitle");
  document.getElementById("enemiesTitle").innerHTML = t("enemiesTitle");
  document.getElementById("fragBomb").innerHTML = t("fragBomb");
  document.getElementById("heBomb").innerHTML = t("heBomb");
  document.getElementById("shapedBomb").innerHTML = t("shapedBomb");
  document.getElementById("apMine").innerHTML = t("apMine");
  document.getElementById("tankMine").innerHTML = t("tankMine");
  document.getElementById("magnetMine").innerHTML = t("magnetMine");
  document.getElementById("clusterBomb").innerHTML = t("clusterBomb");
  document.getElementById("shapedClusterBomb").innerHTML =
    t("shapedClusterBomb");
  document.getElementById("name").innerHTML = t("name");
  document.getElementById("armor").innerHTML = t("armor");
  document.getElementById("speed").innerHTML = t("speed");
  document.getElementById("campaignPoints").innerHTML = t("campaignPoints");
  document.getElementById("lastStandPoints").innerHTML = t("lastStandPoints");
  document.querySelectorAll(".backMain").forEach((button) => {
    button.innerHTML = t("back");
  });
  document.querySelectorAll(".backMechanics").forEach((button) => {
    button.innerHTML = t("back");
  });
  document.querySelectorAll(".backBombs").forEach((button) => {
    button.innerHTML = t("back");
  });
  document.getElementById("rifleman").innerHTML = t("rifleman");
  document.getElementById("machinegunner").innerHTML = t("machinegunner");
  document.getElementById("grenadier").innerHTML = t("grenadier");
  document.getElementById("crew").innerHTML = t("crew");
  document.getElementById("ural").innerHTML = t("ural");
  document.getElementById("uralSupply").innerHTML = t("uralSupply");
  document.getElementById("gaz66").innerHTML = t("gaz66");
  document.getElementById("uaz452").innerHTML = t("uaz452");
  document.getElementById("jeep").innerHTML = t("jeep");
  document.getElementById("guntruck").innerHTML = t("guntruck");
  document.getElementById("grad").innerHTML = t("grad");
  document.getElementById("tigr").innerHTML = t("tigr");
  document.getElementById("mtlb").innerHTML = t("mtlb");
  document.getElementById("mtlbKPVT").innerHTML = t("mtlbKPVT");
  document.getElementById("mtlbzu23").innerHTML = t("mtlbzu23");
  document.getElementById("btr82").innerHTML = t("btr82");
  document.getElementById("bmp1").innerHTML = t("bmp1");
  document.getElementById("bmp2").innerHTML = t("bmp2");
  document.getElementById("bmp3").innerHTML = t("bmp3");
  document.getElementById("bukM2").innerHTML = t("bukM2");
  document.getElementById("shilka").innerHTML = t("shilka");
  document.getElementById("msta").innerHTML = t("msta");
  document.getElementById("t55").innerHTML = t("t55");
  document.getElementById("t62").innerHTML = t("t62");
  document.getElementById("t72").innerHTML = t("t72");
  document.getElementById("t72B3").innerHTML = t("t72B3");
  document.getElementById("t90").innerHTML = t("t90");
  document.getElementById("gameText").innerHTML = t("gameText");
  document.getElementById("apText").innerHTML = t("apText");
  document.getElementById("visibilityText").innerHTML = t("visibilityText");
  document.getElementById("apTitle").innerHTML = t("apTitle");
  document.getElementById("visibilityTitle").innerHTML = t("visibilityTitle");
  document.getElementById("droneFireTitle").innerHTML = t("droneFireTitle");
  document.getElementById("bombardingTitle").innerHTML = t("bombardingTitle");
  document.getElementById("minesTitle").innerHTML = t("minesTitle");
  document.getElementById("dronesTitle").innerHTML = t("dronesTitle");
  document.getElementById("ammoTitle").innerHTML = t("ammoTitle");
  document.getElementById("enemiesTitle").innerHTML = t("enemiesTitle");
  document.getElementById("droneFireText").innerHTML = t("droneFireText");
  document.getElementById("bombardingText").innerHTML = t("bombardingText");
  document.getElementById("minesText").innerHTML = t("minesText");
  document.getElementById("dronesText").innerHTML = t("dronesText");
  document.getElementById("fragBombText").innerHTML = t("fragBombText");
  document.getElementById("fragBombTitle").innerHTML = t("fragBombTitle");
  document.getElementById("heBombTitle").innerHTML = t("heBombTitle");
  document.getElementById("shapedBombTitle").innerHTML = t("shapedBombTitle");
  document.getElementById("apMineTitle").innerHTML = t("apMineTitle");
  document.getElementById("tankMineTitle").innerHTML = t("tankMineTitle");
  document.getElementById("magnetMineTitle").innerHTML = t("magnetMineTitle");
  document.getElementById("clusterBombTitle").innerHTML = t("clusterBombTitle");
  document.getElementById("shapedClusterBombTitle").innerHTML = t(
    "shapedClusterBombTitle"
  );
  document.getElementById("heBombText").innerHTML = t("heBombText");
  document.getElementById("shapedBombText").innerHTML = t("shapedBombText");
  document.getElementById("apMineText").innerHTML = t("apMineText");
  document.getElementById("tankMineText").innerHTML = t("tankMineText");
  document.getElementById("magnetMineText").innerHTML = t("magnetMineText");
  document.getElementById("clusterBombText").innerHTML = t("clusterBombText");
  document.getElementById("shapedClusterBombText").innerHTML = t(
    "shapedClusterBombText"
  );
});
