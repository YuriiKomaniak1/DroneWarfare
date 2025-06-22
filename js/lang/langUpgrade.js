const difficulty = JSON.parse(localStorage.getItem("Difficulty")) || {
  level: "medium",
  accuracy: 1,
  weight: 1,
};
import {
  FootMine,
  TankMine,
  MagnetMine,
  ShrapnelBomb,
  ClusterBomb,
  ShapedClusterBomb,
} from "../drones/bomb.js";

const languages = {
  ua: {
    gamePointsTitle: "Ігрові бали ",
    openTechnologiesTitle: "Відкрити технології",
    upgradeTechnologiesTitle: "Покращити технології",
    mediumDroneText: "Середній дрон",
    bigDroneText: "Великий дрон",
    slot4Text: "Слот 4",
    slot5Text: "Слот 5",
    footMineText: "Протипіхотна<br/> міна",
    tankMineText: "Фугасна<br/> міна",
    magnetMineText: "Магнітна<br/> міна",
    shrapnelBombText: "Шрапнельна<br/> бомба",
    clusterBombText: "Касетна<br/> бомба",
    shapedClusterBombText: "ПТ касетна<br/> бомба",
    smallDroneSpeedText: "малий <br />дрон<br />швидкість",
    smallDroneCapacityText: "малий <br />дрон<br />вага",
    smallDroneHPText: "малий <br />дрон<br />міцність",
    mediumDroneSpeedText: "середній <br />дрон<br />швидкість",
    mediumDroneCapacityText: "середній <br />дрон<br />вага",
    mediumDroneHPText: "середній <br />дрон<br />міцність",
    bigDroneSpeedText: "великий <br />дрон<br />швидкість",
    bigDroneCapacityText: "великий <br />дрон<br />вага",
    bigDroneHPText: "великий <br />дрон<br />міцність",
    fragBombText: "Осколкова<br/> бомба",
    heBombText: "Фугасна<br/> бомба",
    shapedBombText: "Кумулятивна<br/> бомба",
    back: "Назад",
    open: "Дослідити",
    middleDroneOpenTitle: "Дослідити середній дрон",
    openCostTitle: "Вартість дослідження ",
    middleDroneOpenDescription:
      "Після цього дослідження вам буде доступний середній дрон",
    middleDroneOpenAdditionalInfo:
      " Він може нести білбше бомб ніж малий, але повільніший і більш вразливий. Дрон має такі стартові характеристики:",
    middleDroneWeight: "<strong>Вага боєприпасів</strong> - 1600г.",
    middleDroneSuspensionCount: "<strong>Кількість підвісів</strong> - 16шт.",
    middleDroneMaxSpeed: "<strong>Макс. швидкість</strong> - 10 м.с.",
    middleDroneDurability: "<strong>Міцність</strong> - 5.",
    bigDroneOpenTitle: "Дослідити великий дрон",
    bigDroneOpenDescription:
      "Після цього дослідження вам буде доступний великий дрон",
    bigDroneOpenAdditionalInfo:
      " Він може нести найбільше бомб, але повільніший і більш вразливий. Дрон має такі стартові характеристики:",
    bigDroneWeight: "<strong>Вага боєприпасів</strong> - 6400г.",
    bigDroneSuspensionCount: "<strong>Кількість підвісів</strong> - 50шт.",
    bigDroneMaxSpeed: "<strong>Макс. швидкість</strong> - 8 м.с.",
    bigDroneDurability: "<strong>Міцність</strong> - 9.",
    slot4OpenTitle: "Відкрити слот 4",
    slot5OpenTitle: "Відкрити слот 5",
    slot4OpenDescription:
      "Після цього дослідження вам буде доступний до спорядження четвертий дрон",
    slot5OpenDescription:
      "Після цього дослідження вам буде доступний до спорядження п'ятий дрон.",
    footMineOpenTitle: "Протипіхотна міна",
    footMineOpenDescription: `Протипіхотна міна скидається з дрону на землю. Вона активується при наступі на неї.
     Також міна має шанс зупинити неброньовану техніку. Вага ${Math.round(
       FootMine.weight * 1000
     )}г.`,
    tankMineOpenTitle: "Фугасна міна",
    tankMineOpenDescription: `Активується при наїзді на неї техніки колесом або траком. Гарантовано знищує
       неброньовану технікую. Непогано знищує або зупиняє легкоброньовану техніку.
        З важкою бронетехнікою має дуже малі шанси впоратись. Вага ${Math.round(
          TankMine.weight * 1000
        )}г.`,
    magnetMineOpenTitle: "Магнітна міна",
    magnetMineOpenDescription: `Активується при проїзді техніки над нею або наїзді. Кумулятивним
       струменем пропалює днище техніки і знищує її. Непогано справляєтья з легко
        та середньоброньованою технікою, а після апгрейдів - і з важкоброньованою.
         Вага ${Math.round(MagnetMine.weight * 1000)}г.`,
    shrapnelBombOpenTitle: "Шрапнельна бомба",
    shrapnelBombOpenDescription: `Ефективна проти піхоти . Вибухає в повітрі на висоті 4м. над землею, розкидаючи
      уламки в радіусі 8м, тому вражає як бігаючу так і повзаючу піхоту. Має шанс
       зупинити або знищити неброньовану техніку. Проти бронетехніки безсилаю Вага ${Math.round(
         ShrapnelBomb.weight * 1000
       )}г.`,
    clusterBombOpenTitle: "Касетна бомба",
    clusterBombOpenDescription: `Розкривається на висоті 50м над землею та викидає 7
     фугасних снарядів.Суббоєприпаси вибухають при падінні на землю. Радіус
          вибуху суббоєприпасу 2.4м. В цьмоу радіусі він знищує піхоту та
          неброньовану техніку. Має шанс знищити або зупинити легкоброньовану
          техніку. Вага ${Math.round(ClusterBomb.weight * 1000)}г.`,
    shapedClusterBombOpenTitle: "ПТ касетна бомба",
    shapedClusterBombOpenDescription: `Розкривається на висоті 30м над землею та викидає 7 протитанкових
          кумулятивних снарядів. Кумулятивні боєприсаси мають
          хороші шанси знищити броньовану техніку. Вага ${Math.round(
            ShapedClusterBomb.weight * 1000
          )}г`,
    smallDroneSpeedUpgradeDescription: `Поточна швидкість малого дрону<strong>
            <span id="smallDroneCurrentSpeed">10</span>м/с.
          </strong>.`,
    smallDroneSpeedUpgradeNext: `Після апгрейду вона буде становити<strong>
            <span id="smallDroneNextSpeed">10</span>м/с.</strong
          >`,
    smallDroneSpeedUpgradeTitle: "Покращити швидкість малого дрона",
    smallDroneCapacityUpgradeTitle: "Покращити вантажопідйомність малого дрона",
    smallDroneHPUpgradeTitle: "Покращити міцність малого дрона",
    mediumDroneSpeedUpgradeTitle: "Покращити швидкість середнього дрона",
    mediumDroneCapacityUpgradeTitle:
      "Покращити вантажопідйомність середнього дрона",
    mediumDroneHPUpgradeTitle: "Покращити міцність середнього дрона",
    bigDroneSpeedUpgradeTitle: "Покращити швидкість великого дрона",
    bigDroneCapacityUpgradeTitle: "Покращити вантажопідйомність великого дрона",
    bigDroneHPUpgradeTitle: "Покращити міцність великого дрона",
    fragBombUpgradeTitle: "Покращити уламкову бомбу",
    heBombUpgradeTitle: "Покращити фугасну бомбу",
    shapedBombUpgradeTitle: "Покращити кумулятивну бомбу",
    magnetMineUpgradeTitle: "Покращити магнітну міну",
    shrapnelBombUpgradeTitle: "Покращити шрапнельну бомбу",
    clusterBombUpgradeTitle: "Покращити касетну бомбу",
    shapedClusterBombUpgradeTitle: "Покращити ПТ касетну бомбу",
    fragBombUpgradeDescription: `Поточний радіус розльоту уламків становить<strong>
            <span id="fragBombCurrentRadius">10.</span>м.
          </strong>`,
    fragBombUpgradeNext: `Після апгрейду він становитиме<strong>
            <span id="fragBombNextRadius">10.</span>м.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Кожен апгрейд збільшує імовірність враження уламком на 1,50%.
          Імовірність враження зменшується по мірі віддалення від центру вибуху.
          Осколки не вражають ворогів що повзають та броньовану техніку.`,
    heBombUpgradeDescription: `Поточний радіус вибуху становить<strong>
            <span id="heBombCurrentRadius">10.</span>м.
          </strong>`,
    heBombUpgradeNext: `Після апгрейду він становитиме<strong>
            <span id="heBombNextRadius">10.</span>м.</strong>`,
    shapedBombUpgradeDescription: `Бронепробиття це імовірність пробити одиницю броні. Для знищення
          техніки снаряд повинен пробити всі одиниці броні бронетехніки. Поточне
          бронепробиття кумулятивної бомби <strong>
            <span id="shapedBombCurrentState">10.</span>
          </strong>`,
    shapedBombUpgradeNext: `Після апгрейду бронепробиття становитиме<strong>
            <span id="shapedBombNextState">10.</span></strong>`,
    magnetMineUpgradeDescription: `Бронепробиття це імовірність пробити одиницю броні. Для знищення
          техніки снаряд повинен пробити всі одиниці броні бронетехніки. Поточне
          бронепробиття магнітної міни<strong>
            <span id="magnetMineCurrentState">4.</span>
          </strong>`,
    magnetMineUpgradeNext: `Після апгрейду бронепробиття становитиме<strong>
            <span id="magnetMineNextState">4.</span>м.</strong>`,
    shrapnelBombUpgradeDescription: `Поточний радіус розльоту уламків становить<strong>
            <span id="shrapnelBombCurrentRadius">10.</span>м.
          </strong>`,
    shrapnelBombUpgradeNext: `Після апгрейду він становитиме<strong>
            <span id="shrapnelBombNextRadius">10.</span>м.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Кожен апгрейд збільшує імовірність враження
     уламком на 1,50%.  Уламки вражають піхоту що бігає та повзає або ховається в окопах, а
          також неброньовану техніку. Проти бронетехніки безсила.`,
    clusterBombUpgradeDescription: `Кількість фугасних суббоєприпасів
          <strong> <span id="clusterBombCurrentState">10.</span>шт </strong>`,
    clusterBombUpgradeNext: `Після апгрейду він становитиме<strong>
            <span id="clusterBombNextState">10.</span>шт</strong >`,
    shapedClusterBombUpgradeDescription: `Кількість протитанкових суббоєприпасів
          <strong> <span id="shapedClusterBombCurrentState">10.</span>шт </strong>`,
    shapedClusterBombUpgradeDescription1: `Бронепробиття:
          <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Після апгрейду кількість становитиме :
          <strong><span id="shapedClusterBombNextState">11</span> шт</strong>`,
    shapedClusterBombUpgradeDescription2: `Бронепробиття:
          <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Поточна вантажопідйомність малого дрону<strong>
            <span id="smallDroneCurrentCapacity">10</span> кг</strong>`,
    smallDroneCapacityUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="smallDroneNextCapacity">12</span> кг</strong>`,
    smallDroneHPUpgradeDescription: `Поточна міцність малого дрону<strong>
            <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Поточна швидкість середнього дрону<strong>
            <span id="mediumDroneCurrentSpeed">10</span> м/с</strong>`,
    mediumDroneSpeedUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="mediumDroneNextSpeed">12</span> м/с</strong>`,
    mediumDroneCapacityUpgradeDescription: `Поточна вантажопідйомність середнього дрону<strong>
            <span id="mediumDroneCurrentCapacity">10</span> кг</strong>`,
    mediumDroneCapacityUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="mediumDroneNextCapacity">12</span> кг</strong>`,
    mediumDroneHPUpgradeDescription: `Поточна міцність середнього дрону<strong>
            <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Поточна швидкість великого дрону<strong>
            <span id="bigDroneCurrentSpeed">10</span> м/с</strong>`,
    bigDroneSpeedUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="bigDroneNextSpeed">12</span> м/с</strong>`,
    bigDroneCapacityUpgradeDescription: `Поточна вантажопідйомність великого дрону<strong>
            <span id="bigDroneCurrentCapacity">10</span> кг</strong>`,
    bigDroneCapacityUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="bigDroneNextCapacity">12</span> кг</strong>`,
    bigDroneHPUpgradeDescription: `Поточна міцність великого дрону<strong>
            <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Після апгрейду вона становитиме<strong>
            <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Піхотні детонатори",
    tankMineUpgradeDescription: `Піхотні детонатори для фугасної міни дозволяють міні вибухати при
          контакті з піхотою і технікою. При цьому вибух міни знищує піхоту в
          радіусі 3м.`,
  },
  en: {
    gamePointsTitle: "Score ",
    openTechnologiesTitle: "Unlock Technologies",
    upgradeTechnologiesTitle: "Upgrade Technologies",
    mediumDroneText: "Medium<br/> Drone",
    bigDroneText: "Big<br/> Drone",
    slot4Text: "Slot 4",
    slot5Text: "Slot 5",
    footMineText: "AP<br/> Mine",
    tankMineText: "HE<br/> Mine",
    magnetMineText: "Magnetic<br/> Mine",
    shrapnelBombText: "Shrapnel<br/> Bomb",
    clusterBombText: "Cluster<br/> Bomb",
    shapedClusterBombText: "AT  Cluster<br/> Bomb",
    smallDroneSpeedText: "small <br />drone<br />speed",
    smallDroneCapacityText: "small <br />drone<br />capacity",
    smallDroneHPText: "small <br />drone<br />HP",
    mediumDroneSpeedText: "medium <br />drone<br />speed",
    mediumDroneCapacityText: "medium <br />drone<br />capacity",
    mediumDroneHPText: "medium <br />drone<br />HP",
    bigDroneSpeedText: "big <br />drone<br />speed",
    bigDroneCapacityText: "big <br />drone<br />capacity",
    bigDroneHPText: "big <br />drone<br />HP",
    fragBombText: "Frag<br/> Bomb",
    heBombText: "HE<br/> Bomb",
    shapedBombText: "Shaped<br/> Charge",
    back: "Back",
    open: "Research",
    middleDroneOpenTitle: "Research Medium Drone",
    openCostTitle: "Research Cost ",
    middleDroneOpenDescription:
      "After this research, the medium drone will be available to you.",
    middleDroneOpenAdditionalInfo: ` It can carry more bombs than the small drone, but is slower and more vulnerable. The drone has the following starting characteristics:`,
    middleDroneWeight: "<strong>Ammo Weight</strong> - 1600g.",
    middleDroneSuspensionCount: "<strong>Number of Hangers</strong> - 16pcs.",
    middleDroneMaxSpeed: "<strong>Max Speed</strong> - 10 m/s.",
    middleDroneDurability: "<strong>HP</strong> - 5.",
    bigDroneOpenTitle: "Research Big Drone",
    bigDroneOpenDescription:
      "After this research, the big drone will be available to you.",
    bigDroneOpenAdditionalInfo: ` It can carry the most bombs, but is slower and more vulnerable. 
      The drone has the following starting characteristics:`,
    bigDroneWeight: "<strong>Ammo Weight</strong> - 6400g.",
    bigDroneSuspensionCount: "<strong>Number of Hangers</strong> - 50pcs.",
    bigDroneMaxSpeed: "<strong>Max Speed</strong> - 8 m/s.",
    bigDroneDurability: "<strong>HP</strong> - 9.",
    slot4OpenTitle: "Unlock Slot 4",
    slot5OpenTitle: "Unlock Slot 5",
    slot4OpenDescription:
      "After this research, the fourth drone will be available for equipping.",
    slot5OpenDescription:
      "After this research, the fifth drone will be available for equipping.",

    footMineOpenTitle: "AP Mine",
    footMineOpenDescription: `The AP mine is dropped from the drone onto the ground. It activates when
       stepped on. It also has a chance to stop unarmored vehicles. Weight ${
         FootMine.weight * 1000
       }g`,
    tankMineOpenTitle: "HE Mine",
    tankMineOpenDescription: `Activates when a vehicle wheel or track runs over it. It guarantees
       the destruction of unarmored vehicles. It effectively destroys or stops
       lightly armored vehicles. It has very low chances against heavy armored
        vehicles. Weight ${Math.round(TankMine.weight * 1000)}g.`,
    magnetMineOpenTitle: "Magnetic Mine",
    magnetMineOpenDescription: `Activates when a vehicle passes over it or runs into it. It burns through 
      the vehicle's bottom with a cumulative jet and destroys it. It effectively deals
       with lightly and medium armored vehicles, and after upgrades - with heavy armored
        vehicles. Weight ${Math.round(MagnetMine.weight * 1000)}g.`,
    shrapnelBombOpenTitle: "Shrapnel Bomb",
    shrapnelBombOpenDescription: `Effective against infantry. It explodes in the air at a height of 4m above the 
      ground, scattering shrapnel in a radius of 8m, thus hitting both running and
      crawling infantry. It has a chance to stop or destroy unarmored vehicles. It
       is ineffective against armored vehicles. Weight ${Math.round(
         ShrapnelBomb.weight * 1000
       )}g.`,
    clusterBombOpenTitle: "Cluster Bomb",
    clusterBombOpenDescription: `It opens at a height of 30m above the ground and releases 7
     HE shells. Submunitions explode upon hitting the ground. The explosion
     radius of a submunition is 2.4m. Within this radius, it destroys infantry and unarmored
      vehicles. It has a chance to destroy or stop lightly armored vehicles. Weight ${Math.round(
        ClusterBomb.weight * 1000
      )}g.`,
    shapedClusterBombOpenTitle: "AT Cluster Bomb",
    shapedClusterBombOpenDescription: `It opens at a height of 30m above the ground and releases
      7 anti-tank cumulative shells. Cumulative warheads have
      good chances of destroying armored vehicles. Weight ${Math.round(
        ShapedClusterBomb.weight * 1000
      )}g.`,
    smallDroneSpeedUpgradeDescription: `Current speed of the small drone<strong>
            <span id="smallDroneCurrentSpeed">10</span>m/s.
          </strong> .`,
    smallDroneSpeedUpgradeNext: `After the upgrade, it will be<strong>
            <span id="smallDroneNextSpeed">10</span>m/s.</strong
          >`,
    smallDroneSpeedUpgradeTitle: "Upgrade Small Drone Speed",
    smallDroneCapacityUpgradeTitle: "Upgrade Small Drone Capacity",
    smallDroneHPUpgradeTitle: "Upgrade Small Drone HP",
    mediumDroneSpeedUpgradeTitle: "Upgrade Medium Drone Speed",
    mediumDroneCapacityUpgradeTitle: "Upgrade Medium Drone Capacity",
    mediumDroneHPUpgradeTitle: "Upgrade Medium Drone HP",
    bigDroneSpeedUpgradeTitle: "Upgrade Big Drone Speed",
    bigDroneCapacityUpgradeTitle: "Upgrade Big Drone Capacity",
    bigDroneHPUpgradeTitle: "Upgrade Big Drone HP",
    fragBombUpgradeTitle: "Upgrade Frag Bomb",
    heBombUpgradeTitle: "Upgrade HE Bomb",
    shapedBombUpgradeTitle: "Upgrade Shaped Bomb",
    magnetMineUpgradeTitle: "Upgrade Magnetic Mine",
    shrapnelBombUpgradeTitle: "Upgrade Shrapnel Bomb",
    clusterBombUpgradeTitle: "Upgrade Cluster Bomb",
    shapedClusterBombUpgradeTitle: "Upgrade Shaped Cluster Bomb",
    fragBombUpgradeDescription: `Current shrapnel spread radius is<strong>
            <span id="fragBombCurrentRadius">10.</span>m.
          </strong>`,
    fragBombUpgradeNext: `After the upgrade, it will be<strong>
            <span id="fragBombNextRadius">10.</span>m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Each upgrade increases the probability of hitting a fragment by 1.50%.
          The probability of hitting decreases with distance from the explosion center.
            Fragments do not hit crawling enemies and armored vehicles.`,
    heBombUpgradeDescription: `Current explosion radius is<strong>
            <span id="heBombCurrentRadius">10.</span>m.
          </strong>`,
    heBombUpgradeNext: `After the upgrade, it will be<strong>
            <span id="heBombNextRadius">10.</span>m.</strong>`,
    shapedBombUpgradeDescription: `Armor penetration is the probability of penetrating one unit of armor. To destroy
          a vehicle, the shell must penetrate all units of armor of the armored vehicle. Current
          <strong><span id="shapedBombCurrentState">10</span></strong> .`,
    shapedBombUpgradeNext: `After the upgrade, armor penetration will be<strong>
            <span id="shapedBombNextState">10</span></strong> .`,
    magnetMineUpgradeDescription: `Armor penetration is the probability of penetrating one unit of armor. To destroy
          a vehicle, the shell must penetrate all units of armor of the armored vehicle. Current
          <strong><span id="magnetMineCurrentState">10</span></strong> .`,
    magnetMineUpgradeNext: `After the upgrade, armor penetration will be<strong>
            <span id="magnetMineNextState">10</span></strong> .`,
    shrapnelBombUpgradeDescription: `Current shrapnel spread radius is<strong>
            <span id="shrapnelBombCurrentRadius">10.</span>m.
          </strong>`,
    shrapnelBombUpgradeNext: `After the upgrade, it will be<strong>
            <span id="shrapnelBombNextRadius">10.</span>m.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Each upgrade increases the probability of hitting a fragment by 1.50%.
          Fragments hit running and crawling infantry or infantry hiding in trenches, as well as unarmored vehicles.
            It is ineffective against armored vehicles.`,
    clusterBombUpgradeDescription: `Current number of HE submunitions
          <strong> <span id="clusterBombCurrentState">10.</span> pcs </strong>`,
    clusterBombUpgradeNext: `After the upgrade, the number will be
          <strong> <span id="clusterBombNextState">11.</span> pcs </strong>`,
    shapedClusterBombUpgradeDescription: `Current number of anti-tank submunitions
          <strong> <span id="shapedClusterBombCurrentState">10.</span> pcs </strong>`,
    shapedClusterBombUpgradeDescription1: `Armor penetration:
          <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `After the upgrade, the number will be:
          <strong><span id="shapedClusterBombNextState">11</span></strong> pcs`,
    shapedClusterBombUpgradeDescription2: `Armor penetration:
          <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Current capacity of the small drone<strong>
            <span id="smallDroneCurrentCapacity">10</span> g</strong>`,
    smallDroneCapacityUpgradeNext: `After the upgrade, it will be<strong>
            <span id="smallDroneNextCapacity">12</span> g</strong>`,
    smallDroneHPUpgradeDescription: `Current HP of the small drone<strong>
            <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `After the upgrade, it will be<strong>
            <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Current speed of the medium drone<strong>
            <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `After the upgrade, it will be<strong>
            <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Current capacity of the medium drone<strong>
            <span id="mediumDroneCurrentCapacity">10</span> g</strong>`,
    mediumDroneCapacityUpgradeNext: `After the upgrade, it will be<strong>
            <span id="mediumDroneNextCapacity">12</span> g</strong>`,
    mediumDroneHPUpgradeDescription: `Current HP of the medium drone<strong>
            <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `After the upgrade, it will be<strong>
            <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Current speed of the big drone<strong>
            <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `After the upgrade, it will be<strong>
            <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Current capacity of the big drone<strong>
            <span id="bigDroneCurrentCapacity">10</span> g</strong>`,
    bigDroneCapacityUpgradeNext: `After the upgrade, it will be<strong>
            <span id="bigDroneNextCapacity">12</span> g</strong>`,
    bigDroneHPUpgradeDescription: `Current HP of the big drone<strong>
            <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `After the upgrade, it will be<strong>
            <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Infantry Detonators",
    tankMineUpgradeDescription: `Infantry detonators for the HE mine allow the mine to explode upon contact
          with infantry and vehicles. When it explodes, it destroys infantry within a
          radius of 3m.`,
  },
  de: {
    gamePointsTitle: "Spielpunkte ",
    openTechnologiesTitle: "Technologien freischalten",
    upgradeTechnologiesTitle: "Technologien aufrüsten",
    mediumDroneText: "Mittlere Drohne",
    bigDroneText: "Große Drohne",
    slot4Text: "Slot 4",
    slot5Text: "Slot 5",
    footMineText: "Antipersonen‑<br/>Mine",
    tankMineText: "HE‑<br/>Mine",
    magnetMineText: "Magnetische‑<br/>Mine",
    shrapnelBombText: "Splitter‑<br/>Bombe",
    clusterBombText: "Cluster‑<br/>Bombe",
    shapedClusterBombText: "AT‑Cluster‑<br/>Bombe",
    smallDroneSpeedText: "kleine <br />Drohne<br />Geschwindigkeit",
    smallDroneCapacityText: "kleine <br />Drohne<br />Nutzlast",
    smallDroneHPText: "kleine <br />Drohne<br />Haltbarkeit",
    mediumDroneSpeedText: "mittlere <br />Drohne<br />Geschwindigkeit",
    mediumDroneCapacityText: "mittlere <br />Drohne<br />Nutzlast",
    mediumDroneHPText: "mittlere <br />Drohne<br />Haltbarkeit",
    bigDroneSpeedText: "große <br />Drohne<br />Geschwindigkeit",
    bigDroneCapacityText: "große <br />Drohne<br />Nutzlast",
    bigDroneHPText: "große <br />Drohne<br />Haltbarkeit",
    fragBombText: "Splitter‑<br/>Bombe",
    heBombText: "HE‑<br/>Bombe",
    shapedBombText: "Hohlladungs‑<br/>Bombe",
    back: "Zurück",
    open: "Forschen",
    middleDroneOpenTitle: "Mittlere Drohne erforschen",
    openCostTitle: "Forschungskosten ",
    middleDroneOpenDescription:
      "Nach dieser Forschung ist die mittlere Drohne verfügbar",
    middleDroneOpenAdditionalInfo:
      " Sie kann mehr Bomben tragen als die kleine, ist aber langsamer und weniger widerstandsfähig. Die Drohne startet mit folgenden Werten:",
    middleDroneWeight: "<strong>Munitionsgewicht</strong> – 1600 g.",
    middleDroneSuspensionCount: "<strong>Aufhängungen</strong> – 16 Stk.",
    middleDroneMaxSpeed: "<strong>Max. Geschwindigkeit</strong> – 10 m/s.",
    middleDroneDurability: "<strong>Haltbarkeit</strong> – 5.",
    bigDroneOpenTitle: "Große Drohne erforschen",
    bigDroneOpenDescription:
      "Nach dieser Forschung ist die große Drohne verfügbar",
    bigDroneOpenAdditionalInfo:
      " Sie kann die meisten Bomben tragen, ist aber langsamer und weniger widerstandsfähig. Die Drohne startet mit:",
    bigDroneWeight: "<strong>Munitionsgewicht</strong> – 6400 g.",
    bigDroneSuspensionCount: "<strong>Aufhängungen</strong> – 50 Stk.",
    bigDroneMaxSpeed: "<strong>Max. Geschwindigkeit</strong> – 8 m/s.",
    bigDroneDurability: "<strong>Haltbarkeit</strong> – 9.",
    slot4OpenTitle: "Slot 4 freischalten",
    slot5OpenTitle: "Slot 5 freischalten",
    slot4OpenDescription:
      "Nach dieser Forschung ist der vierte Drohnen‑Slot verfügbar",
    slot5OpenDescription:
      "Nach dieser Forschung ist der fünfte Drohnen‑Slot verfügbar.",
    footMineOpenTitle: "Antipersonen‑Mine",
    footMineOpenDescription: `Eine Antipersonen‑Mine wird von der Drohne abgeworfen. Sie explodiert beim Betreten.
      Sie kann auch ungeschützte Fahrzeuge stoppen. Gewicht ${Math.round(
        FootMine.weight * 1000
      )} g.`,
    tankMineOpenTitle: "HE‑Mine",
    tankMineOpenDescription: `Aktiviert, wenn ein Fahrzeugrad oder Kette darüberfährt. Zerstört garantiert ungeschützte Fahrzeuge, schadet leicht gepanzerten Fahrzeugen gut. Gegen schwere Panzerung kaum wirksam. Gewicht ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Magnetische Mine",
    magnetMineOpenDescription: `Wird aktiviert, wenn ein Fahrzeug darüberfährt oder berührt. Mit kumulativem Fokusstrahl brennt sie den Fahrzeugboden durch und zerstört es. Effektiv gegen leicht/mittel gepanzerte Fahrzeuge, nach Upgrades auch gegen schwere Panzerung. Gewicht ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Splitter‑Bombe",
    shrapnelBombOpenDescription: `Wirksam gegen Infanterie. Explodiert 4 m über dem Boden und verteilt Splitter in einem Radius von 8 m – sowohl laufende als auch kriechende Gegner. Kann ungeschützte Fahrzeuge treffen. Gegen Panzerung wirkungslos. Gewicht ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Cluster‑Bombe",
    clusterBombOpenDescription: `Entfaltet sich in 50 m Höhe und wirft 7 HE‑Submunitionen aus. Diese explodieren beim Aufprall auf dem Boden. Radius einer Submunition: 2,4 m. Zerstört Infanterie und ungeschützte Fahrzeuge, kann leicht gepanzerte treffen. Gewicht ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "AT‑Cluster‑Bombe",
    shapedClusterBombOpenDescription: `Entfaltet sich in 30 m Höhe und sprengt 7 antipanzer‑kumulative Sprengköpfe aus. Diese haben gute Chancen, gepanzerte Fahrzeuge zu zerstören. Gewicht ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Aktuelle Geschwindigkeit der kleinen Drohne<strong>
            <span id="smallDroneCurrentSpeed">10</span> m/s.
          </strong>.`,
    smallDroneSpeedUpgradeNext: `Nach dem Upgrade wird sie<strong>
            <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Kleine Drohne Geschwindigkeit verbessern",
    smallDroneCapacityUpgradeTitle: "Kleine Drohne Nutzlast verbessern",
    smallDroneHPUpgradeTitle: "Kleine Drohne Haltbarkeit verbessern",
    mediumDroneSpeedUpgradeTitle: "Mittlere Drohne Geschwindigkeit verbessern",
    mediumDroneCapacityUpgradeTitle: "Mittlere Drohne Nutzlast verbessern",
    mediumDroneHPUpgradeTitle: "Mittlere Drohne Haltbarkeit verbessern",
    bigDroneSpeedUpgradeTitle: "Große Drohne Geschwindigkeit verbessern",
    bigDroneCapacityUpgradeTitle: "Große Drohne Nutzlast verbessern",
    bigDroneHPUpgradeTitle: "Große Drohne Haltbarkeit verbessern",
    fragBombUpgradeTitle: "Splitterbombe verbessern",
    heBombUpgradeTitle: "HE‑Bombe verbessern",
    shapedBombUpgradeTitle: "Hohlladungsbombe verbessern",
    magnetMineUpgradeTitle: "Magnetmine verbessern",
    shrapnelBombUpgradeTitle: "Splitterbombe verbessern",
    clusterBombUpgradeTitle: "Kassettenbombe verbessern",
    shapedClusterBombUpgradeTitle: "AT‑Kassettenbombe verbessern",
    fragBombUpgradeDescription: `Aktueller Splitter‑Streuwinkel ist<strong>
            <span id="fragBombCurrentRadius">10.</span> m.
          </strong>`,
    fragBombUpgradeNext: `Nach dem Upgrade beträgt er<strong>
            <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Jedes Upgrade erhöht die Wahrscheinlichkeit, dass ein Splitter trifft, um 1,50 %. Die Trefferchance sinkt mit der Entfernung vom Explosionszentrum. Splitter treffen keine kriechenden Gegner und keine gepanzerten Fahrzeuge.`,
    heBombUpgradeDescription: `Aktueller Explosionsradius ist<strong>
            <span id="heBombCurrentRadius">10.</span> m.
          </strong>`,
    heBombUpgradeNext: `Nach dem Upgrade beträgt er<strong>
            <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `Panzerdurchschlag ist die Wahrscheinlichkeit, eine Panzereinheit zu durchdringen. Um ein Fahrzeug zu zerstören, muss die Bombe alle Panzereinheiten durchdringen. Aktueller Panzerdurchschlag der Hohlladungsbombe <strong>
            <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Nach dem Upgrade beträgt der Panzerdurchschlag<strong>
            <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `Panzerdurchschlag ist die Wahrscheinlichkeit, eine Panzereinheit zu durchdringen. Um ein Fahrzeug zu zerstören, muss die Mine alle Panzereinheiten durchdringen. Aktueller Panzerdurchschlag der Magnetmine<strong>
            <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Nach dem Upgrade beträgt der Panzerdurchschlag<strong>
            <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Aktueller Splitter‑Streuwinkel ist<strong>
            <span id="shrapnelBombCurrentRadius">10.</span> m.
          </strong>`,
    shrapnelBombUpgradeNext: `Nach dem Upgrade beträgt er<strong>
            <span id="shrapnelBombNextRadius">10.</span> m.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Jedes Upgrade erhöht die Wahrscheinlichkeit, dass ein Splitter trifft, um 1,50 %. Splitter treffen rennende und kriechende Infanterie sowie Fahrzeuge ohne Panzerung. Gegen Panzerung unwirksam.`,
    clusterBombUpgradeDescription: `Anzahl der HE‑Submunitionen<strong>
            <span id="clusterBombCurrentState">10.</span> Stk.</strong>`,
    clusterBombUpgradeNext: `Nach dem Upgrade wird die Anzahl<strong>
            <span id="clusterBombNextState">11.</span> Stk.</strong>`,
    shapedClusterBombUpgradeDescription: `Anzahl der Panzer‑Submunitionen<strong>
            <span id="shapedClusterBombCurrentState">10.</span> Stk.</strong>`,
    shapedClusterBombUpgradeDescription1: `Panzerdurchschlag:
            <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Nach dem Upgrade wird die Anzahl sein:
            <strong><span id="shapedClusterBombNextState">11</span></strong> Stk.`,
    shapedClusterBombUpgradeDescription2: `Panzerdurchschlag:
            <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Aktuelle Nutzlast der kleinen Drohne<strong>
            <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `Aktuelle Haltbarkeit der kleinen Drohne<strong>
            <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Aktuelle Geschwindigkeit der mittleren Drohne<strong>
            <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Aktuelle Nutzlast der mittleren Drohne<strong>
            <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `Aktuelle Haltbarkeit der mittleren Drohne<strong>
            <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Aktuelle Geschwindigkeit der großen Drohne<strong>
            <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Aktuelle Nutzlast der großen Drohne<strong>
            <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `Aktuelle Haltbarkeit der großen Drohne<strong>
            <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Nach dem Upgrade beträgt sie<strong>
            <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Infanterie-Detonatoren",
    tankMineUpgradeDescription: `Infanterie-Detonatoren für die HE-Mine sorgen dafür, dass die Mine bei Kontakt mit Infanterie oder Fahrzeugen explodiert. Wenn sie explodiert, zerstört sie Infanterie in einem Radius von 3 m.`,
  },
  es: {
    gamePointsTitle: "Puntos de juego ",
    openTechnologiesTitle: "Desbloquear tecnologías",
    upgradeTechnologiesTitle: "Mejorar tecnologías",
    mediumDroneText: "Dron mediano",
    bigDroneText: "Dron grande",
    slot4Text: "Ranura 4",
    slot5Text: "Ranura 5",
    footMineText: "Mina antipersonal<br/>",
    tankMineText: "Mina HE<br/>",
    magnetMineText: "Mina magnética<br/>",
    shrapnelBombText: "Bomba de metralla<br/>",
    clusterBombText: "Bomba en racimo<br/>",
    shapedClusterBombText: "Bomba AT en racimo<br/>",
    smallDroneSpeedText: "dron pequeño <br />velocidad",
    smallDroneCapacityText: "dron pequeño <br />carga útil",
    smallDroneHPText: "dron pequeño <br />durabilidad",
    mediumDroneSpeedText: "dron mediano <br />velocidad",
    mediumDroneCapacityText: "dron mediano <br />carga útil",
    mediumDroneHPText: "dron mediano <br />durabilidad",
    bigDroneSpeedText: "dron grande <br />velocidad",
    bigDroneCapacityText: "dron grande <br />carga útil",
    bigDroneHPText: "dron grande <br />durabilidad",
    fragBombText: "Bomba de<br/> metralla",
    heBombText: "Bomba HE<br/>",
    shapedBombText: "Bomba de<br/> carga hueca",
    back: "Atrás",
    open: "Investigar",
    middleDroneOpenTitle: "Investigar dron mediano",
    openCostTitle: "Costo de investigación ",
    middleDroneOpenDescription:
      "Después de esta investigación, tendrás disponible el dron mediano",
    middleDroneOpenAdditionalInfo:
      " Puede llevar más bombas que el pequeño, pero es más lento y frágil. El dron tiene estas características iniciales:",
    middleDroneWeight: "<strong>Peso de munición</strong> - 1600 g.",
    middleDroneSuspensionCount:
      "<strong>Nº de puntos de sujeción</strong> - 16 uds.",
    middleDroneMaxSpeed: "<strong>Velocidad máxima</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Durabilidad</strong> - 5.",
    bigDroneOpenTitle: "Investigar dron grande",
    bigDroneOpenDescription:
      "Después de esta investigación, tendrás disponible el dron grande",
    bigDroneOpenAdditionalInfo:
      " Puede llevar más bombas, pero es más lento y frágil. El dron tiene estas características iniciales:",
    bigDroneWeight: "<strong>Peso de munición</strong> - 6400 g.",
    bigDroneSuspensionCount:
      "<strong>Nº de puntos de sujeción</strong> - 50 uds.",
    bigDroneMaxSpeed: "<strong>Velocidad máxima</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Durabilidad</strong> - 9.",
    slot4OpenTitle: "Desbloquear ranura 4",
    slot5OpenTitle: "Desbloquear ranura 5",
    slot4OpenDescription:
      "Después de esta investigación estará disponible la cuarta ranura de dron",
    slot5OpenDescription:
      "Después de esta investigación estará disponible la quinta ranura de dron.",
    footMineOpenTitle: "Mina antipersonal",
    footMineOpenDescription: `La mina antipersonal se lanza desde el dron al suelo. Se activa al pisarla.
      También puede detener vehículos sin blindaje. Peso ${Math.round(
        FootMine.weight * 1000
      )} g.`,
    tankMineOpenTitle: "Mina HE",
    tankMineOpenDescription: `Se activa al pasar una rueda o cadena de vehículo sobre ella. Asegura la destrucción de vehículos sin blindaje, daña o detiene vehículos ligeros. Muy poco eficaz contra blindaje pesado. Peso ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Mina magnética",
    magnetMineOpenDescription: `Se activa al pasar un vehículo o al entrar en contacto. Usa un chorro acumulativo para perforar y destruir la parte inferior del vehículo. Eficaz contra vehículos ligeros y medianos, y tras mejoras también contra blindados pesados. Peso ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Bomba de metralla",
    shrapnelBombOpenDescription: `Eficaz contra infantería. Explota a 4 m sobre el suelo, dispersando metralla en un radio de 8 m, impactando tanto a infantería avanzada como a rastras. Puede detener o destruir vehículos no blindados. Sin efecto contra vehículos blindados. Peso ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Bomba en racimo",
    clusterBombOpenDescription: `Se abre a 50 m de altura y libera 7 submuniciones HE. Cada una explota al impactar en el suelo con radio de 2,4 m. Destruye infantería y vehículos sin blindaje, y puede afectar a vehículos ligeramente blindados. Peso ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "Bomba AT en racimo",
    shapedClusterBombOpenDescription: `Se abre a 30 m de altura y suelta 7 cargas huecas antitanque. Estas tienen gran posibilidad de destruir vehículos blindados. Peso ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Velocidad actual del dron pequeño:<strong>
    <span id="smallDroneCurrentSpeed">10</span> m/s.
  </strong>.`,
    smallDroneSpeedUpgradeNext: `Tras la mejora será<strong>
    <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Mejorar velocidad del dron pequeño",
    smallDroneCapacityUpgradeTitle: "Mejorar carga del dron pequeño",
    smallDroneHPUpgradeTitle: "Mejorar durabilidad del dron pequeño",
    mediumDroneSpeedUpgradeTitle: "Mejorar velocidad del dron mediano",
    mediumDroneCapacityUpgradeTitle: "Mejorar carga del dron mediano",
    mediumDroneHPUpgradeTitle: "Mejorar durabilidad del dron mediano",
    bigDroneSpeedUpgradeTitle: "Mejorar velocidad del dron grande",
    bigDroneCapacityUpgradeTitle: "Mejorar carga del dron grande",
    bigDroneHPUpgradeTitle: "Mejorar durabilidad del dron grande",
    fragBombUpgradeTitle: "Mejorar bomba de metralla",
    heBombUpgradeTitle: "Mejorar bomba HE",
    shapedBombUpgradeTitle: "Mejorar bomba de carga hueca",
    magnetMineUpgradeTitle: "Mejorar mina magnética",
    shrapnelBombUpgradeTitle: "Mejorar bomba de metralla",
    clusterBombUpgradeTitle: "Mejorar bomba de racimo",
    shapedClusterBombUpgradeTitle: "Mejorar bomba AT de racimo",
    fragBombUpgradeDescription: `Radio actual de esparcimiento de metralla:<strong>
    <span id="fragBombCurrentRadius">10.</span> m.
  </strong>`,
    fragBombUpgradeNext: `Tras la mejora será<strong>
    <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Cada mejora aumenta en un 1,50 % la probabilidad de impacto de los fragmentos. Esta probabilidad disminuye con la distancia al centro de la explosión. Los fragmentos no afectan a enemigos reptantes ni a vehículos blindados.`,
    heBombUpgradeDescription: `Radio actual de explosión:<strong>
    <span id="heBombCurrentRadius">10.</span> m.
  </strong>`,
    heBombUpgradeNext: `Tras la mejora será<strong>
    <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `Penetración de blindaje es la probabilidad de perforar una unidad de blindaje. Para destruir un vehículo la bomba debe perforar todas las unidades. Penetración actual de la bomba de carga hueca <strong>
    <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Tras la mejora la penetración será<strong>
    <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `La penetración de blindaje es la probabilidad de perforar una unidad de blindaje. Para destruir un vehículo la mina debe perforar todas las unidades. Penetración actual de la mina magnética<strong>
    <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Tras la mejora la penetración será<strong>
    <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Radio actual de esparcimiento de metralla:<strong>
    <span id="shrapnelBombCurrentRadius">10.</span> m.
  </strong>`,
    shrapnelBombUpgradeNext: `Tras la mejora será<strong>
    <span id="shrapnelBombNextRadius">10.</span> m.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Cada mejora aumenta en un 1,50 % la probabilidad de impacto de los fragmentos. Afectan a infantería en movimiento y blindados ligeros, sin efecto en vehículos blindados pesados.`,
    clusterBombUpgradeDescription: `Número actual de submuniciones HE:<strong>
    <span id="clusterBombCurrentState">10.</span> uds.</strong>`,
    clusterBombUpgradeNext: `Tras la mejora será<strong>
    <span id="clusterBombNextState">11.</span> uds.</strong>`,
    shapedClusterBombUpgradeDescription: `Número actual de submuniciones antitanque:<strong>
    <span id="shapedClusterBombCurrentState">10.</span> uds.</strong>`,
    shapedClusterBombUpgradeDescription1: `Penetración de blindaje:
    <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Tras la mejora será:
    <strong><span id="shapedClusterBombNextState">11</span></strong> uds.`,
    shapedClusterBombUpgradeDescription2: `Penetración de blindaje:
    <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Carga actual del dron pequeño:<strong>
    <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Tras la mejora será<strong>
    <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `HP actual del dron pequeño:<strong>
    <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Tras la mejora será<strong>
    <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Velocidad actual del dron mediano:<strong>
    <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Tras la mejora será<strong>
    <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Carga actual del dron mediano:<strong>
    <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Tras la mejora será<strong>
    <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `HP actual del dron mediano:<strong>
    <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Tras la mejora será<strong>
    <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Velocidad actual del dron grande:<strong>
    <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Tras la mejora será<strong>
    <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Carga actual del dron grande:<strong>
    <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Tras la mejora será<strong>
    <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `HP actual del dron grande:<strong>
    <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Tras la mejora será<strong>
    <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Detonadores para infantería",
    tankMineUpgradeDescription: `Los detonadores para la mina HE permiten que explote al contacto con infantería o vehículos. Cuando explota, destruye infantería en un radio de 3 m.`,
  },
  fr: {
    gamePointsTitle: "Points de jeu ",
    openTechnologiesTitle: "Déverrouiller les technologies",
    upgradeTechnologiesTitle: "Améliorer les technologies",
    mediumDroneText: "Drone moyen",
    bigDroneText: "Gros drone",
    slot4Text: "Emplacement 4",
    slot5Text: "Emplacement 5",
    footMineText: "Mine anti-personnel<br/>",
    tankMineText: "Mine HE<br/>",
    magnetMineText: "Mine magnétique<br/>",
    shrapnelBombText: "Bombe à éclats<br/>",
    clusterBombText: "Bombe à grappes<br/>",
    shapedClusterBombText: "Bombe AT en grappes<br/>",
    smallDroneSpeedText: "petit <br />drone<br />vitesse",
    smallDroneCapacityText: "petit <br />drone<br />charge utile",
    smallDroneHPText: "petit <br />drone<br />durabilité",
    mediumDroneSpeedText: "drone moyen <br />vitesse",
    mediumDroneCapacityText: "drone moyen <br />charge utile",
    mediumDroneHPText: "drone moyen <br />durabilité",
    bigDroneSpeedText: "grand <br />drone<br />vitesse",
    bigDroneCapacityText: "grand <br />drone<br />charge utile",
    bigDroneHPText: "grand <br />drone<br />durabilité",
    fragBombText: "Bombe à<br/> éclats",
    heBombText: "Bombe HE<br/>",
    shapedBombText: "Bombe à<br/> charge creuse",
    back: "Retour",
    open: "Rechercher",
    middleDroneOpenTitle: "Rechercher drone moyen",
    openCostTitle: "Coût de recherche ",
    middleDroneOpenDescription:
      "Après cette recherche, le drone moyen sera disponible",
    middleDroneOpenAdditionalInfo:
      " Il peut transporter plus de bombes que le petit, mais est plus lent et plus fragile. Le drone a ces caractéristiques initiales :",
    middleDroneWeight: "<strong>Poids des munitions</strong> - 1600 g.",
    middleDroneSuspensionCount:
      "<strong>Nombre de points d'attache</strong> - 16 ud.",
    middleDroneMaxSpeed: "<strong>Vitesse max.</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Durabilité</strong> - 5.",
    bigDroneOpenTitle: "Rechercher grand drone",
    bigDroneOpenDescription:
      "Après cette recherche, le grand drone sera disponible",
    bigDroneOpenAdditionalInfo:
      " Il peut transporter le plus de bombes, mais est plus lent et plus fragile. Le drone a :",
    bigDroneWeight: "<strong>Poids des munitions</strong> - 6400 g.",
    bigDroneSuspensionCount: "<strong>Points d'attache</strong> - 50 ud.",
    bigDroneMaxSpeed: "<strong>Vitesse max.</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Durabilité</strong> - 9.",
    slot4OpenTitle: "Déverrouiller l'emplacement 4",
    slot5OpenTitle: "Déverrouiller l'emplacement 5",
    slot4OpenDescription:
      "Après cette recherche, le quatrième emplacement de drone sera disponible",
    slot5OpenDescription:
      "Après cette recherche, le cinquième emplacement de drone sera disponible.",
    footMineOpenTitle: "Mine antipersonnel",
    footMineOpenDescription: `La mine antipersonnel est larguée depuis le drone. Elle s'active à la pression.
      Elle peut aussi stopper les véhicules non-blindés. Poids ${Math.round(
        FootMine.weight * 1000
      )} g.`,
    tankMineOpenTitle: "Mine HE",
    tankMineOpenDescription: `Elle s'active lorsqu'une roue ou une chenille de véhicule passe dessus. Elle détruit assurément les véhicules non-blindés, endommage ou arrête les légers. Faiblement efficace contre les gros blindés. Poids ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Mine magnétique",
    magnetMineOpenDescription: `Elle s'active par passage ou contact. Un jet cumulatif perce et détruit le dessous du véhicule. Efficace contre les blindages légers et moyens, et après améliorations, contre les lourds. Poids ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Bombe à éclats",
    shrapnelBombOpenDescription: `Efficace contre l'infanterie. Elle explose à 4 m au-dessus du sol, disséminant des éclats sur 8 m, touchant infanterie en course ou rampante. Peut stopper ou détruire des véhicules non-blindés. Inefficace contre les blindages. Poids ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Bombe à grappes",
    clusterBombOpenDescription: `Elle s'ouvre à 50 m d'altitude et lâche 7 sous-munitions HE. Chaque ogive explose au sol (rayon 2,4 m), détruisant infanterie et véhicules non-blindés, pouvant toucher les légers. Poids ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "Bombe AT en grappes",
    shapedClusterBombOpenDescription: `Elle s'ouvre à 30 m et délivre 7 charges creuses antichars. Ces ogives ont de bonnes chances de détruire les véhicules blindés. Poids ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Vitesse actuelle du petit drone<strong>
            <span id="smallDroneCurrentSpeed">10</span> m/s.
          </strong>.`,
    smallDroneSpeedUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Améliorer la vitesse du petit drone",
    smallDroneCapacityUpgradeTitle: "Améliorer la capacité du petit drone",
    smallDroneHPUpgradeTitle: "Améliorer la durabilité du petit drone",
    mediumDroneSpeedUpgradeTitle: "Améliorer la vitesse du drone moyen",
    mediumDroneCapacityUpgradeTitle: "Améliorer la capacité du drone moyen",
    mediumDroneHPUpgradeTitle: "Améliorer la durabilité du drone moyen",
    bigDroneSpeedUpgradeTitle: "Améliorer la vitesse du gros drone",
    bigDroneCapacityUpgradeTitle: "Améliorer la capacité du gros drone",
    bigDroneHPUpgradeTitle: "Améliorer la durabilité du gros drone",
    fragBombUpgradeTitle: "Améliorer la bombe à fragmentation",
    heBombUpgradeTitle: "Améliorer la bombe HE",
    shapedBombUpgradeTitle: "Améliorer la bombe à charge creuse",
    magnetMineUpgradeTitle: "Améliorer la mine magnétique",
    shrapnelBombUpgradeTitle: "Améliorer la bombe à éclats",
    clusterBombUpgradeTitle: "Améliorer la bombe à grappes",
    shapedClusterBombUpgradeTitle: "Améliorer la bombe AT à grappes",
    fragBombUpgradeDescription: `Rayon actuel de projection des éclats :<strong>
            <span id="fragBombCurrentRadius">10.</span> m.
          </strong>`,
    fragBombUpgradeNext: `Après la mise à niveau, il sera de<strong>
            <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Chaque amélioration augmente de 1,50 % la probabilité qu’un éclat touche. Cette probabilité décroît avec la distance au centre de l’explosion. Les éclats n’endommagent pas les ennemis rampants ni les véhicules blindés.`,
    heBombUpgradeDescription: `Rayon actuel d’explosion :<strong>
            <span id="heBombCurrentRadius">10.</span> m.
          </strong>`,
    heBombUpgradeNext: `Après la mise à niveau, il sera de<strong>
            <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `La pénétration d’armure est la probabilité de percer une unité d’armure. Pour détruire un véhicule, la bombe doit percer toutes les unités d’armure. Pénétration actuelle de la bombe à charge creuse <strong>
            <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Après la mise à niveau, la pénétration sera<strong>
            <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `La pénétration d’armure est la probabilité de percer une unité d’armure. Pour détruire un véhicule, la mine doit percer toutes les unités d’armure. Pénétration actuelle de la mine magnétique<strong>
            <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Après la mise à niveau, la pénétration sera<strong>
            <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Rayon actuel de projection d’éclats :<strong>
            <span id="shrapnelBombCurrentRadius">10.</span> m.
          </strong>`,
    shrapnelBombUpgradeNext: `Après la mise à niveau, il sera de<strong>
            <span id="shrapnelBombNextRadius">10.</span> m.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Chaque amélioration augmente de 1,50 % la probabilité de toucher des infar ... pilotes au sol en mouvement ou rampants, ainsi que les véhicules non blindés. Sans effet sur les véhicules blindés.`,
    clusterBombUpgradeDescription: `Nombre actuel de sous-munitions HE :<strong>
            <span id="clusterBombCurrentState">10.</span> unités.</strong>`,
    clusterBombUpgradeNext: `Après la mise à niveau, il sera de<strong>
            <span id="clusterBombNextState">11.</span> unités.</strong>`,
    shapedClusterBombUpgradeDescription: `Nombre actuel de sous-munitions antichars :<strong>
            <span id="shapedClusterBombCurrentState">10.</span> unités.</strong>`,
    shapedClusterBombUpgradeDescription1: `Pénétration d’armure :
            <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Après la mise à niveau, le nombre sera :
            <strong><span id="shapedClusterBombNextState">11</span></strong> unités.`,
    shapedClusterBombUpgradeDescription2: `Pénétration d’armure :
            <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Capacité actuelle du petit drone :<strong>
            <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `Durabilité actuelle du petit drone :<strong>
            <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Vitesse actuelle du drone moyen :<strong>
            <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Capacité actuelle du drone moyen :<strong>
            <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `Durabilité actuelle du drone moyen :<strong>
            <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Vitesse actuelle du gros drone :<strong>
            <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Capacité actuelle du gros drone :<strong>
            <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `Durabilité actuelle du gros drone :<strong>
            <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Après la mise à niveau, elle sera de<strong>
            <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Détonateurs pour infanterie",
    tankMineUpgradeDescription: `Les détonateurs pour la mine HE permettent à la mine d’exploser au contact de l’infanterie ou des véhicules. Lors de l’explosion, elle détruit l’infanterie dans un rayon de 3 m.`,
  },
  pt: {
    gamePointsTitle: "Pontos de jogo ",
    openTechnologiesTitle: "Desbloquear tecnologias",
    upgradeTechnologiesTitle: "Melhorar tecnologias",
    mediumDroneText: "Drone médio",
    bigDroneText: "Drone grande",
    slot4Text: "Slot 4",
    slot5Text: "Slot 5",
    footMineText: "Mina antipessoal<br/>",
    tankMineText: "Mina HE<br/>",
    magnetMineText: "Mina magnética<br/>",
    shrapnelBombText: "Bomba de estilhaços<br/>",
    clusterBombText: "Bomba cluster<br/>",
    shapedClusterBombText: "Bomba AT cluster<br/>",
    smallDroneSpeedText: "drone pequeno <br />velocidade",
    smallDroneCapacityText: "drone pequeno <br />carga útil",
    smallDroneHPText: "drone pequeno <br />durabilidade",
    mediumDroneSpeedText: "drone médio <br />velocidade",
    mediumDroneCapacityText: "drone médio <br />carga útil",
    mediumDroneHPText: "drone médio <br />durabilidade",
    bigDroneSpeedText: "drone grande <br />velocidade",
    bigDroneCapacityText: "drone grande <br />carga útil",
    bigDroneHPText: "drone grande <br />durabilidade",
    fragBombText: "Bomba de<br/> estilhaços",
    heBombText: "Bomba HE<br/>",
    shapedBombText: "Bomba de<br/> carga oca",
    back: "Voltar",
    open: "Pesquisar",
    middleDroneOpenTitle: "Pesquisar drone médio",
    openCostTitle: "Custo de pesquisa ",
    middleDroneOpenDescription:
      "Após esta pesquisa, o drone médio ficará disponível",
    middleDroneOpenAdditionalInfo:
      " Ele pode carregar mais bombas que o pequeno, mas é mais lento e frágil. O drone tem estas características iniciais:",
    middleDroneWeight: "<strong>Peso da munição</strong> - 1600 g.",
    middleDroneSuspensionCount:
      "<strong>Pontos de suspensão</strong> - 16 unid.",
    middleDroneMaxSpeed: "<strong>Velocidade máx.</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Durabilidade</strong> - 5.",
    bigDroneOpenTitle: "Pesquisar drone grande",
    bigDroneOpenDescription:
      "Após esta pesquisa, o drone grande ficará disponível",
    bigDroneOpenAdditionalInfo:
      " Ele pode carregar o maior número de bombas, mas é mais lento e frágil. O drone começa com:",
    bigDroneWeight: "<strong>Peso da munição</strong> - 6400 g.",
    bigDroneSuspensionCount: "<strong>Pontos de suspensão</strong> - 50 unid.",
    bigDroneMaxSpeed: "<strong>Velocidade máx.</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Durabilidade</strong> - 9.",
    slot4OpenTitle: "Desbloquear slot 4",
    slot5OpenTitle: "Desbloquear slot 5",
    slot4OpenDescription:
      "Após esta pesquisa, o quarto slot de drone estará disponível",
    slot5OpenDescription:
      "Após esta pesquisa, o quinto slot de drone estará disponível.",
    footMineOpenTitle: "Mina antipessoal",
    footMineOpenDescription: `A mina antipessoal é lançada do drone e ativa ao ser pisada. Também pode parar veículos não blindados. Peso ${Math.round(
      FootMine.weight * 1000
    )} g.`,
    tankMineOpenTitle: "Mina HE",
    tankMineOpenDescription: `Ativa quando uma roda ou esteira passa por cima. Destroi garantidamente veículos não blindados e danifica/para veículos leves. Pouco eficaz contra blindagens pesadas. Peso ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Mina magnética",
    magnetMineOpenDescription: `Ativa ao passar um veículo por cima ou em contato. Use jato cumulativo para perfurar a base do veículo e destruí-lo. Eficaz contra veículos leves e médios, e após upgrades, contra os pesados. Peso ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Bomba de estilhaços",
    shrapnelBombOpenDescription: `Eficaz contra infantaria. Explode a 4 m do chão e espalha estilhaços em um raio de 8 m, atingindo tropas correndo ou rastejando. Pode parar ou destruir veículos não blindados. Ineficaz contra blindados. Peso ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Bomba cluster",
    clusterBombOpenDescription: `Abre-se a 50 m de altura e solta 7 submunições HE. Cada submunição explode ao atingir o chão (2,4 m de raio), destruindo infantaria e veículos não blindados, podendo atingir veículos ligeiramente blindados. Peso ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "Bomba AT cluster",
    shapedClusterBombOpenDescription: `Abre-se a 30 m de altura e libera 7 cargas ocas antitanque. Elas têm boa chance de destruir veículos blindados. Peso ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Velocidade atual do drone pequeno:<strong>
    <span id="smallDroneCurrentSpeed">10</span> m/s.
  </strong>.`,
    smallDroneSpeedUpgradeNext: `Após a melhoria, será<strong>
    <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Melhorar velocidade do drone pequeno",
    smallDroneCapacityUpgradeTitle: "Melhorar capacidade do drone pequeno",
    smallDroneHPUpgradeTitle: "Melhorar durabilidade do drone pequeno",
    mediumDroneSpeedUpgradeTitle: "Melhorar velocidade do drone médio",
    mediumDroneCapacityUpgradeTitle: "Melhorar capacidade do drone médio",
    mediumDroneHPUpgradeTitle: "Melhorar durabilidade do drone médio",
    bigDroneSpeedUpgradeTitle: "Melhorar velocidade do drone grande",
    bigDroneCapacityUpgradeTitle: "Melhorar capacidade do drone grande",
    bigDroneHPUpgradeTitle: "Melhorar durabilidade do drone grande",
    fragBombUpgradeTitle: "Melhorar bomba de fragmentação",
    heBombUpgradeTitle: "Melhorar bomba HE",
    shapedBombUpgradeTitle: "Melhorar bomba de carga oca",
    magnetMineUpgradeTitle: "Melhorar mina magnética",
    shrapnelBombUpgradeTitle: "Melhorar bomba de estilhaços",
    clusterBombUpgradeTitle: "Melhorar bomba cluster",
    shapedClusterBombUpgradeTitle: "Melhorar bomba AT cluster",
    fragBombUpgradeDescription: `Raio atual de dispersão de estilhaços:<strong>
    <span id="fragBombCurrentRadius">10.</span> m.
  </strong>`,
    fragBombUpgradeNext: `Após a melhoria será<strong>
    <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Cada melhoria aumenta em 1,50 % a chance dos estilhaços atingirem. Essa probabilidade diminui com a distância ao centro da explosão. Estilhaços não afetam inimigos rastejantes nem veículos blindados.`,
    heBombUpgradeDescription: `Raio atual da explosão:<strong>
    <span id="heBombCurrentRadius">10.</span> m.
  </strong>`,
    heBombUpgradeNext: `Após a melhoria será<strong>
    <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `Penetração de armadura é a probabilidade de perfurar uma unidade de armadura. Para destruir um veículo, a bomba deve perfurar todas as unidades. Penetração atual da bomba de carga oca <strong>
    <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Após a melhoria a penetração será<strong>
    <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `Penetração de armadura é a probabilidade de perfurar uma unidade de armadura. Para destruir um veículo, a mina deve perfurar todas as unidades. Penetração atual da mina magnética<strong>
    <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Após a melhoria a penetração será<strong>
    <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Raio atual de dispersão de estilhaços:<strong>
    <span id="shrapnelBombCurrentRadius">10.</span> m.
  </strong>`,
    shrapnelBombUpgradeNext: `Após a melhoria será<strong>
    <span id="shrapnelBombNextRadius">10.</span> m.</strong>`,
    shrapnelBombUpgradeAdditionalInfo: ` Cada melhoria aumenta em 1,50 % a chance dos estilhaços atingirem. Atinja infantaria correndo e rastejando, bem como veículos não blindados. Sem efeito em veículos blindados.`,
    clusterBombUpgradeDescription: `Número atual de submunições HE:<strong>
    <span id="clusterBombCurrentState">10.</span> un.</strong>`,
    clusterBombUpgradeNext: `Após a melhoria será<strong>
    <span id="clusterBombNextState">11.</span> un.</strong>`,
    shapedClusterBombUpgradeDescription: `Número atual de submunições antitanque:<strong>
    <span id="shapedClusterBombCurrentState">10.</span> un.</strong>`,
    shapedClusterBombUpgradeDescription1: `Penetração de armadura:
    <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Após a melhoria será:
    <strong><span id="shapedClusterBombNextState">11</span></strong> un.`,
    shapedClusterBombUpgradeDescription2: `Penetração de armadura:
    <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Capacidade atual do drone pequeno:<strong>
    <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Após a melhoria será<strong>
    <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `Durabilidade atual do drone pequeno:<strong>
    <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Após a melhoria será<strong>
    <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Velocidade atual do drone médio:<strong>
    <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Após a melhoria será<strong>
    <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Capacidade atual do drone médio:<strong>
    <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Após a melhoria será<strong>
    <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `Durabilidade atual do drone médio:<strong>
    <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Após a melhoria será<strong>
    <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Velocidade atual do drone grande:<strong>
    <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Após a melhoria será<strong>
    <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Capacidade atual do drone grande:<strong>
    <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Após a melhoria será<strong>
    <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `Durabilidade atual do drone grande:<strong>
    <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Após a melhoria será<strong>
    <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Detonadores de infantaria",
    tankMineUpgradeDescription: `Detonadores de infantaria para a mina HE permitem que ela exploda ao contato com infantaria ou veículos. Ao explodir, destrói infantaria num raio de 3 m.`,
  },
  tr: {
    gamePointsTitle: "Oyun Puanları ",
    openTechnologiesTitle: "Teknolojileri Aç",
    upgradeTechnologiesTitle: "Teknolojileri Yükselt",
    mediumDroneText: "Orta Drone",
    bigDroneText: "Büyük Drone",
    slot4Text: "Yuvaslot 4",
    slot5Text: "Yuvaslot 5",
    footMineText: "Personel Mayını<br/>",
    tankMineText: "HE Mayını<br/>",
    magnetMineText: "Manyetik Mayın<br/>",
    shrapnelBombText: "Parçacık Bombası<br/>",
    clusterBombText: "Küme Bombası<br/>",
    shapedClusterBombText: "AT Küme Bombası<br/>",
    smallDroneSpeedText: "küçük <br />drone<br />hız",
    smallDroneCapacityText: "küçük <br />drone<br />yük kapasitesi",
    smallDroneHPText: "küçük <br />drone<br />dayanıklılık",
    mediumDroneSpeedText: "orta <br />drone<br />hız",
    mediumDroneCapacityText: "orta <br />drone<br />yük kapasitesi",
    mediumDroneHPText: "orta <br />drone<br />dayanıklılık",
    bigDroneSpeedText: "büyük <br />drone<br />hız",
    bigDroneCapacityText: "büyük <br />drone<br />yük kapasitesi",
    bigDroneHPText: "büyük <br />drone<br />dayanıklılık",
    fragBombText: "Parçacıklı <br/>Bomba",
    heBombText: "HE <br/>Bomba",
    shapedBombText: "Şekillendirilmiş <br/>Bomba",
    back: "Geri",
    open: "Araştır",
    middleDroneOpenTitle: "Orta Dronu Araştır",
    openCostTitle: "Araştırma Maliyeti ",
    middleDroneOpenDescription:
      "Bu araştırmadan sonra orta dron kullanıma açılacak",
    middleDroneOpenAdditionalInfo:
      " Küçük drondan daha fazla bomba taşıyabilir ama daha yavaş ve daha kırılgan. Başlangıç özellikleri:",
    middleDroneWeight: "<strong>Mühimmat Ağırlığı</strong> - 1600 g.",
    middleDroneSuspensionCount:
      "<strong>Asılı Nokta Sayısı</strong> - 16 adet.",
    middleDroneMaxSpeed: "<strong>Maks. Hız</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Dayanıklılık</strong> - 5.",
    bigDroneOpenTitle: "Büyük Dronu Araştır",
    bigDroneOpenDescription:
      "Bu araştırmadan sonra büyük dron kullanıma açılacak",
    bigDroneOpenAdditionalInfo:
      " En fazla bomba taşıyabilir, ancak daha yavaş ve daha kırılgan. Başlangıç özellikleri:",
    bigDroneWeight: "<strong>Mühimmat Ağırlığı</strong> - 6400 g.",
    bigDroneSuspensionCount: "<strong>Asılı Nokta Sayısı</strong> - 50 adet.",
    bigDroneMaxSpeed: "<strong>Maks. Hız</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Dayanıklılık</strong> - 9.",
    slot4OpenTitle: "Yuvaslot 4’ü Aç",
    slot5OpenTitle: "Yuvaslot 5’i Aç",
    slot4OpenDescription: "Bu araştırmadan sonra dördüncü dron yuvası açılacak",
    slot5OpenDescription: "Bu araştırmadan sonra beşinci dron yuvası açılacak.",
    footMineOpenTitle: "Personel Mayını",
    footMineOpenDescription: `Personel mayını drondan yere bırakılır. Basıldığında aktive olur. Zırhsız araçları durdurabilir. Ağırlık ${Math.round(
      FootMine.weight * 1000
    )} g.`,
    tankMineOpenTitle: "HE Mayını",
    tankMineOpenDescription: `Araç tekerleği veya paleti üzerinden geçince aktive olur. Zırhsız araçları garanti tahrip eder, hafif zırhlılara zarar verebilir. Ağır zırhlarda etkisi düşüktür. Ağırlık ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Manyetik Mayın",
    magnetMineOpenDescription: `Araç üzerinden geçince veya temas edince aktive olur. Kumulatif jet ile aracın altını deler ve yok eder. Hafif/orta zırhlılara etkilidir, yükseltmelerle ağır zırhlılara karşı da etkilidir. Ağırlık ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Parçacık Bombası",
    shrapnelBombOpenDescription: `Piyade birimlerine karşı etkilidir. Yerden 4 m yüksekte patlar ve 8 m yarıçapta parçacık dağıtır; koşan veya sürünen düşmanlara zarar verir. Zırhsız araçları da etkileyebilir. Zırhlılara etkisi yoktur. Ağırlık ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Küme Bombası",
    clusterBombOpenDescription: `50 m yükseklikte açılır ve 7 adet HE alt mühimmat bırakır. Her biri yere çarpınca patlar (2,4 m yarıçap), piyade ve zırhsız araçları yok eder; hafif zırhlılara da etkili olabilir. Ağırlık ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "AT Küme Bombası",
    shapedClusterBombOpenDescription: `30 m yüksekte açılır ve 7 adet şekillendirilmiş antitanze yük bırakır. Zırhlı araçları etkili şekilde yok edebilir. Ağırlık ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Küçük dronenin mevcut hızı:<strong>
    <span id="smallDroneCurrentSpeed">10</span> m/s.
  </strong>.`,
    smallDroneSpeedUpgradeNext: `Yükseltmeden sonra hızı<strong>
    <span id="smallDroneNextSpeed">10</span> m/s.</strong> olacaktır.`,
    smallDroneSpeedUpgradeTitle: "Küçük Dron Hızını Yükselt",
    smallDroneCapacityUpgradeTitle: "Küçük Dron Yük Kapasitesini Yükselt",
    smallDroneHPUpgradeTitle: "Küçük Dron Dayanıklılığını Yükselt",
    mediumDroneSpeedUpgradeTitle: "Orta Dron Hızını Yükselt",
    mediumDroneCapacityUpgradeTitle: "Orta Dron Yük Kapasitesini Yükselt",
    mediumDroneHPUpgradeTitle: "Orta Dron Dayanıklılığını Yükselt",
    bigDroneSpeedUpgradeTitle: "Büyük Dron Hızını Yükselt",
    bigDroneCapacityUpgradeTitle: "Büyük Dron Yük Kapasitesini Yükselt",
    bigDroneHPUpgradeTitle: "Büyük Dron Dayanıklılığını Yükselt",
    fragBombUpgradeTitle: "Parçacık Bombasını Yükselt",
    heBombUpgradeTitle: "HE Bombasını Yükselt",
    shapedBombUpgradeTitle: "Şekillendirilmiş Bomba Yükselt",
    magnetMineUpgradeTitle: "Manyetik Miyanı Yükselt",
    shrapnelBombUpgradeTitle: "Şarapnel Bombasını Yükselt",
    clusterBombUpgradeTitle: "Cluster Bombasını Yükselt",
    shapedClusterBombUpgradeTitle: "AT Cluster Bombayı Yükselt",
    fragBombUpgradeDescription: `Parçacıların mevcut yayılım yarıçapı:<strong>
    <span id="fragBombCurrentRadius">10.</span> m.
  </strong>`,
    fragBombUpgradeNext: `Yükseltme sonrası yayılım<strong>
    <span id="fragBombNextRadius">10.</span> m.</strong> olacaktır.`,
    fragBombUpgradeAdditionalInfo: ` Her yükseltme parçacıların hedefe ulaşma olasılığını %1,50 artırır. Patlama merkezinden uzaklaştıkça bu olasılık azalır. Parçacıklar sürünen düşmanlara ve zırhlı araçlara zarar vermez.`,
    heBombUpgradeDescription: `Mevcut patlama yarıçapı:<strong>
    <span id="heBombCurrentRadius">10.</span> m.
  </strong>`,
    heBombUpgradeNext: `Yükseltme sonrası patlama yarıçapı<strong>
    <span id="heBombNextRadius">10.</span> m.</strong> olacaktır.`,
    shapedBombUpgradeDescription: `Zırh delinme, bir zırh ünitesini delme olasılığıdır. Bir aracı yok etmek için bomba tüm zırh katmanlarını delmelidir. Mevcut şekillendirilmiş bomba zırh delme değeri <strong>
    <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Yükseltme sonrası zırh delme değeri<strong>
    <span id="shapedBombNextState">10</span></strong> olacaktır.`,
    magnetMineUpgradeDescription: `Zırh delinme, bir zırh ünitesini delme olasılığıdır. Bir aracı yok etmek için mayın tüm zırh katmanlarını delmelidir. Mevcut manyetik mayın zırh delme değeri<strong>
    <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Yükseltme sonrası zırh delme değeri<strong>
    <span id="magnetMineNextState">10</span></strong> olacaktır.`,
    shrapnelBombUpgradeDescription: `Parçacıların mevcut yayılım yarıçapı:<strong>
    <span id="shrapnelBombCurrentRadius">10.</span> m.
  </strong>`,
    shrapnelBombUpgradeNext: `Yükseltme sonrası yayılım<strong>
    <span id="shrapnelBombNextRadius">10</span></strong> m.`,

    shrapnelBombUpgradeAdditionalInfo: ` Her yükseltme parçacıların etkisini %1,50 artırır. Hareket eden veya sürünen piyadelere ve zırhsız araçlara etki eder. Zırhlılara etkisi yoktur.`,
    clusterBombUpgradeDescription: `Mevcut HE alt mühimmat sayısı:<strong>
    <span id="clusterBombCurrentState">10.</span> adet</strong>`,
    clusterBombUpgradeNext: `Yükseltme sonrası sayı<strong>
    <span id="clusterBombNextState">11.</span> adet</strong>`,
    shapedClusterBombUpgradeDescription: `Mevcut AT alt mühimmat sayısı:<strong>
    <span id="shapedClusterBombCurrentState">10.</span> adet</strong>`,
    shapedClusterBombUpgradeDescription1: `Zırh delme:
    <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Yükseltme sonrası sayı:
    <strong><span id="shapedClusterBombNextState">11</span></strong> adet`,
    shapedClusterBombUpgradeDescription2: `Zırh delme:
    <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Küçük dronun mevcut yük kapasitesi:<strong>
    <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Yükseltme sonrası kapasite<strong>
    <span id="smallDroneNextCapacity">12</span></strong> kg olacaktır.`,
    smallDroneHPUpgradeDescription: `Küçük dronun mevcut dayanıklılığı:<strong>
    <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Yükseltme sonrası dayanıklılık<strong>
    <span id="smallDroneNextHP">12</span></strong> HP olacaktır.`,
    mediumDroneSpeedUpgradeDescription: `Orta dronun mevcut hızı:<strong>
    <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Yükseltme sonrası hız<strong>
    <span id="mediumDroneNextSpeed">12</span></strong> m/s olacaktır.`,
    mediumDroneCapacityUpgradeDescription: `Orta dronun mevcut yük kapasitesi:<strong>
    <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Yükseltme sonrası kapasite<strong>
    <span id="mediumDroneNextCapacity">12</span></strong> kg olacaktır.`,
    mediumDroneHPUpgradeDescription: `Orta dronun mevcut dayanıklılığı:<strong>
    <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Yükseltme sonrası dayanıklılık<strong>
    <span id="mediumDroneNextHP">12</span></strong> HP olacaktır.`,
    bigDroneSpeedUpgradeDescription: `Büyük dronun mevcut hızı:<strong>
    <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Yükseltme sonrası hız<strong>
    <span id="bigDroneNextSpeed">12</span></strong> m/s olacaktır.`,
    bigDroneCapacityUpgradeDescription: `Büyük dronun mevcut yük kapasitesi:<strong>
    <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Yükseltme sonrası kapasite<strong>
    <span id="bigDroneNextCapacity">12</span></strong> kg olacaktır.`,
    bigDroneHPUpgradeDescription: `Büyük dronun mevcut dayanıklılığı:<strong>
    <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Yükseltme sonrası dayanıklılık<strong>
    <span id="bigDroneNextHP">12</span></strong> HP olacaktır.`,
    tankMineUpgradeTitle: "Piyade Tetikleyicileri",
    tankMineUpgradeDescription: `HE mayını için piyade tetikleyicileri, mayının piyade veya araçlarla temas ettiğinde patlamasını sağlar. Patladığında, 3 m yarıçap içindeki piyadeyi yok eder.`,
  },
  it: {
    gamePointsTitle: "Punti gioco ",
    openTechnologiesTitle: "Sblocca tecnologie",
    upgradeTechnologiesTitle: "Migliora tecnologie",
    mediumDroneText: "Drone medio",
    bigDroneText: "Drone grande",
    slot4Text: "Slot 4",
    slot5Text: "Slot 5",
    footMineText: "Mina anti‑persona<br/>",
    tankMineText: "Mina HE<br/>",
    magnetMineText: "Mina magnetica<br/>",
    shrapnelBombText: "Bomba a frammentazione<br/>",
    clusterBombText: "Bomba a grappolo<br/>",
    shapedClusterBombText: "Bomba AT a grappolo<br/>",
    smallDroneSpeedText: "drone piccolo <br />velocità",
    smallDroneCapacityText: "drone piccolo <br />capacità",
    smallDroneHPText: "drone piccolo <br />durabilità",
    mediumDroneSpeedText: "drone medio <br />velocità",
    mediumDroneCapacityText: "drone medio <br />capacità",
    mediumDroneHPText: "drone medio <br />durabilità",
    bigDroneSpeedText: "drone grande <br />velocità",
    bigDroneCapacityText: "drone grande <br />capacità",
    bigDroneHPText: "drone grande <br />durabilità",
    fragBombText: "Bomba di<br/> frammentazione",
    heBombText: "Bomba HE<br/>",
    shapedBombText: "Bomba<br/> a carica cava",
    back: "Indietro",
    open: "Ricerca",
    middleDroneOpenTitle: "Ricerca drone medio",
    openCostTitle: "Costo ricerca ",
    middleDroneOpenDescription:
      "Dopo questa ricerca sarà disponibile il drone medio",
    middleDroneOpenAdditionalInfo:
      " Può trasportare più bombe del piccolo, ma è più lento e fragile. Caratteristiche iniziali:",
    middleDroneWeight: "<strong>Peso munizioni</strong> - 1600 g.",
    middleDroneSuspensionCount:
      "<strong>Punti di sospensione</strong> - 16 pz.",
    middleDroneMaxSpeed: "<strong>Velocità max.</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Durabilità</strong> - 5.",
    bigDroneOpenTitle: "Ricerca drone grande",
    bigDroneOpenDescription:
      "Dopo questa ricerca sarà disponibile il drone grande",
    bigDroneOpenAdditionalInfo:
      " Può trasportare più bombe, ma è più lento e fragile. Caratteristiche iniziali:",
    bigDroneWeight: "<strong>Peso munizioni</strong> - 6400 g.",
    bigDroneSuspensionCount: "<strong>Punti di sospensione</strong> - 50 pz.",
    bigDroneMaxSpeed: "<strong>Velocità max.</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Durabilità</strong> - 9.",
    slot4OpenTitle: "Sblocca slot 4",
    slot5OpenTitle: "Sblocca slot 5",
    slot4OpenDescription:
      "Dopo questa ricerca sarà disponibile il quarto slot drone",
    slot5OpenDescription:
      "Dopo questa ricerca sarà disponibile il quinto slot drone.",
    footMineOpenTitle: "Mina anti‑persona",
    footMineOpenDescription: `La mina anti‑persona viene rilasciata dal drone. Si attiva al calpestio. Può fermare veicoli non corazzati. Peso ${Math.round(
      FootMine.weight * 1000
    )} g.`,
    tankMineOpenTitle: "Mina HE",
    tankMineOpenDescription: `Si attiva quando una ruota o cingolo la passa sopra. Distrugge garantito i veicoli non corazzati, danneggia/frena quelli leggeri, poco efficace sui corazzati pesanti. Peso ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Mina magnetica",
    magnetMineOpenDescription: `Si attiva al passaggio o contatto con un veicolo. Un getto cumulativo perfora il fondo del veicolo e lo distrugge. Efficace contro veicoli leggeri/medi e, con upgrade, anche pesanti. Peso ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Bomba di frammentazione",
    shrapnelBombOpenDescription: `Efficace contro l'infanteria. Esplode a 4 m da terra distribuendo frammenti in un raggio di 8 m, colpendo nemici che corrono o strisciano. Può fermare o distruggere veicoli non corazzati. Inefficace contro corazzati. Peso ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Bomba a grappolo",
    clusterBombOpenDescription: `Si apre a 50 m di altezza e rilascia 7 submunizioni HE. Ogni submunizione esplode a terra (raggio 2,4 m), distruggendo fanteria e veicoli non corazzati, può colpire leggeri corazzati. Peso ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "Bomba AT a grappolo",
    shapedClusterBombOpenDescription: `Si apre a 30 m e rilascia 7 cariche cave anticarro. Buone probabilità di distruggere veicoli corazzati. Peso ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,
    smallDroneSpeedUpgradeDescription: `Velocità attuale del drone piccolo:<strong>
    <span id="smallDroneCurrentSpeed">10</span> m/s.
  </strong>.`,
    smallDroneSpeedUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Migliora velocità drone piccolo",
    smallDroneCapacityUpgradeTitle: "Migliora carico drone piccolo",
    smallDroneHPUpgradeTitle: "Migliora durabilità drone piccolo",
    mediumDroneSpeedUpgradeTitle: "Migliora velocità drone medio",
    mediumDroneCapacityUpgradeTitle: "Migliora carico drone medio",
    mediumDroneHPUpgradeTitle: "Migliora durabilità drone medio",
    bigDroneSpeedUpgradeTitle: "Migliora velocità drone grande",
    bigDroneCapacityUpgradeTitle: "Migliora carico drone grande",
    bigDroneHPUpgradeTitle: "Migliora durabilità drone grande",
    fragBombUpgradeTitle: "Migliora bomba a frammentazione",
    heBombUpgradeTitle: "Migliora bomba HE",
    shapedBombUpgradeTitle: "Migliora bomba a carica cava",
    magnetMineUpgradeTitle: "Migliora mina magnetica",
    shrapnelBombUpgradeTitle: "Migliora bomba a schegge",
    clusterBombUpgradeTitle: "Migliora bomba a grappolo",
    shapedClusterBombUpgradeTitle: "Migliora bomba AT a grappolo",
    fragBombUpgradeDescription: `Raggio attuale di dispersione dei frammenti:<strong>
    <span id="fragBombCurrentRadius">10.</span> m.
  </strong>`,
    fragBombUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Ogni miglioramento aumenta del 1,50 % la probabilità di impatto dei frammenti. La probabilità diminuisce con la distanza dal centro dell’esplosione. I frammenti non colpiscono nemici in posizione strisciante né veicoli corazzati.`,
    heBombUpgradeDescription: `Raggio attuale dell’esplosione:<strong>
    <span id="heBombCurrentRadius">10.</span> m.
  </strong>`,
    heBombUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `Penetrazione dell’armatura: probabilità di perforare un’unità corazzata. Per distruggere un veicolo, la bomba deve perforare tutte le unità. Penetrazione attuale della bomba a carica cava <strong>
    <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Dopo l’upgrade la penetrazione sarà<strong>
    <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `Penetrazione dell’armatura: probabilità di perforare un’unità corazzata. Per distruggere un veicolo, la mina deve perforare tutte le unità. Penetrazione attuale della mina magnetica<strong>
    <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Dopo l’upgrade la penetrazione sarà<strong>
    <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Raggio attuale di dispersione dei frammenti:<strong>
    <span id="shrapnelBombCurrentRadius">10.</span> m.
  </strong>`,
    shrapnelBombUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="shrapnelBombNextRadius">10</span></strong> m.`,
    shrapnelBombUpgradeAdditionalInfo: ` Ogni miglioramento aumenta del 1,50 % la probabilità di impatto dei frammenti. Colpiscono fanteria in movimento o strisciante, nonché veicoli non corazzati. Nessun effetto sui veicoli corazzati.`,
    clusterBombUpgradeDescription: `Numero attuale di submunizioni HE:<strong>
    <span id="clusterBombCurrentState">10.</span> pz.</strong>`,
    clusterBombUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="clusterBombNextState">11.</span> pz.</strong>`,
    shapedClusterBombUpgradeDescription: `Numero attuale di submunizioni anticarro:<strong>
    <span id="shapedClusterBombCurrentState">10.</span> pz.</strong>`,
    shapedClusterBombUpgradeDescription1: `Penetrazione armatura:
    <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Dopo l’upgrade sarà:
    <strong><span id="shapedClusterBombNextState">11</span></strong> pz.`,
    shapedClusterBombUpgradeDescription2: `Penetrazione armatura:
    <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Capacità attuale del drone piccolo:<strong>
    <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `Durabilità attuale del drone piccolo:<strong>
    <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Velocità attuale del drone medio:<strong>
    <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Capacità attuale del drone medio:<strong>
    <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `Durabilità attuale del drone medio:<strong>
    <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Velocità attuale del drone grande:<strong>
    <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Capacità attuale del drone grande:<strong>
    <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `Durabilità attuale del drone grande:<strong>
    <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Dopo l’upgrade sarà<strong>
    <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Detonatori per fanteria",
    tankMineUpgradeDescription: `I detonatori per la mina HE permettono l’esplosione al contatto con fanteria o veicoli. All’esplosione distruggono la fanteria in un raggio di 3 m.`,
  },
  pl: {
    gamePointsTitle: "Punkty gry ",
    openTechnologiesTitle: "Odblokuj technologie",
    upgradeTechnologiesTitle: "Ulepsz technologie",
    mediumDroneText: "Średni dron",
    bigDroneText: "Duży dron",
    slot4Text: "Slot 4",
    slot5Text: "Slot 5",
    footMineText: "Mina przeciwpiechotna<br/>",
    tankMineText: "Mina HE<br/>",
    magnetMineText: "Mina magnetyczna<br/>",
    shrapnelBombText: "Bomba odłamkowa<br/>",
    clusterBombText: "Bomba kasetowa<br/>",
    shapedClusterBombText: "Bomba AT kasetowa<br/>",
    smallDroneSpeedText: "mały <br />dron<br />prędkość",
    smallDroneCapacityText: "mały <br />dron<br />ładowność",
    smallDroneHPText: "mały <br />dron<br />wytrzymałość",
    mediumDroneSpeedText: "średni <br />dron<br />prędkość",
    mediumDroneCapacityText: "średni <br />dron<br />ładowność",
    mediumDroneHPText: "średni <br />dron<br />wytrzymałość",
    bigDroneSpeedText: "duży <br />dron<br />prędkość",
    bigDroneCapacityText: "duży <br />dron<br />ładowność",
    bigDroneHPText: "duży <br />dron<br />wytrzymałość",
    fragBombText: "Bomba odłamkowa<br/>",
    heBombText: "Bomba HE<br/>",
    shapedBombText: "Bomba kształtowa<br/>",
    back: "Powrót",
    open: "Badanie",
    middleDroneOpenTitle: "Zbadaj średniego drona",
    openCostTitle: "Koszt badania ",
    middleDroneOpenDescription: "Po tym badaniu średni dron będzie dostępny",
    middleDroneOpenAdditionalInfo:
      " Może przenosić więcej bomb niż mały, ale jest wolniejszy i mniej wytrzymały. Posiada następujące cechy początkowe:",
    middleDroneWeight: "<strong>Waga amunicji</strong> - 1600 g.",
    middleDroneSuspensionCount: "<strong>Liczba zaczepów</strong> - 16 szt.",
    middleDroneMaxSpeed: "<strong>Maks. prędkość</strong> - 10 m/s.",
    middleDroneDurability: "<strong>Wytrzymałość</strong> - 5.",
    bigDroneOpenTitle: "Zbadaj dużego drona",
    bigDroneOpenDescription: "Po tym badaniu duży dron będzie dostępny",
    bigDroneOpenAdditionalInfo:
      " Może przenosić najwięcej bomb, ale jest wolniejszy i mniej wytrzymały. Posiada:",
    bigDroneWeight: "<strong>Waga amunicji</strong> - 6400 g.",
    bigDroneSuspensionCount: "<strong>Liczba zaczepów</strong> - 50 szt.",
    bigDroneMaxSpeed: "<strong>Maks. prędkość</strong> - 8 m/s.",
    bigDroneDurability: "<strong>Wytrzymałość</strong> - 9.",
    slot4OpenTitle: "Odblokuj slot 4",
    slot5OpenTitle: "Odblokuj slot 5",
    slot4OpenDescription: "Po tym badaniu dostępny będzie czwarty slot drona",
    slot5OpenDescription: "Po tym badaniu dostępny będzie piąty slot drona.",
    footMineOpenTitle: "Mina przeciwpiechotna",
    footMineOpenDescription: `Mina przeciwpiechotna spada z drona na ziemię. Aktywuje się przy nadepnięciu. Może zatrzymać nieopancerzone pojazdy. Waga ${Math.round(
      FootMine.weight * 1000
    )} g.`,
    tankMineOpenTitle: "Mina HE",
    tankMineOpenDescription: `Aktywuje się, gdy przejedzie po niej koło lub gąsienica pojazdu. Niszczy nieopancerzone pojazdy, uszkadza/stopuje lekkie. Małą skuteczność w ciężkim opancerzeniu. Waga ${Math.round(
      TankMine.weight * 1000
    )} g.`,
    magnetMineOpenTitle: "Mina magnetyczna",
    magnetMineOpenDescription: `Aktywuje się, gdy pojazd przejedzie lub wejdzie w kontakt. Strumień kumulacyjny przecina spód pojazdu i niszczy go. Skuteczna przeciw lekkim/średnim opancerzeniom, po ulepszeniach również przeciw ciężkim. Waga ${Math.round(
      MagnetMine.weight * 1000
    )} g.`,
    shrapnelBombOpenTitle: "Bomba odłamkowa",
    shrapnelBombOpenDescription: `Skuteczna przeciw piechocie. Eksploduje na wysokości 4 m nad ziemią i rozrzuca odłamki w promieniu 8 m, trafiając zarówno biegnących, jak i czołgających się wrogów. Może zatrzymać lub zniszczyć nieopancerzone pojazdy. Bez efektu na opancerzenie. Waga ${Math.round(
      ShrapnelBomb.weight * 1000
    )} g.`,
    clusterBombOpenTitle: "Bomba kasetowa",
    clusterBombOpenDescription: `Rozkłada się na wysokości 50 m i zrzuca 7 HE sub-amunicji. Każda eksploduje po uderzeniu w ziemię (promień 2,4 m), niszcząc piechotę i pojazdy nieopancerzone, może trafić lekkie opancerzenia. Waga ${Math.round(
      ClusterBomb.weight * 1000
    )} g.`,
    shapedClusterBombOpenTitle: "Bomba AT kasetowa",
    shapedClusterBombOpenDescription: `Rozkłada się na wysokości 30 m i uwalnia 7 kumulacyjnych głowic przeciwpancernych. Mają duże szanse zniszczenia opancerzonych pojazdów. Waga ${Math.round(
      ShapedClusterBomb.weight * 1000
    )} g.`,

    smallDroneSpeedUpgradeDescription: `Aktualna prędkość małego drona:<strong>
  <span id="smallDroneCurrentSpeed">10</span> m/s.
</strong>.`,
    smallDroneSpeedUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="smallDroneNextSpeed">10</span> m/s.</strong>`,
    smallDroneSpeedUpgradeTitle: "Ulepsz prędkość małego drona",
    smallDroneCapacityUpgradeTitle: "Ulepsz ładowność małego drona",
    smallDroneHPUpgradeTitle: "Ulepsz wytrzymałość małego drona",
    mediumDroneSpeedUpgradeTitle: "Ulepsz prędkość drona średniego",
    mediumDroneCapacityUpgradeTitle: "Ulepsz ładowność drona średniego",
    mediumDroneHPUpgradeTitle: "Ulepsz wytrzymałość drona średniego",
    bigDroneSpeedUpgradeTitle: "Ulepsz prędkość dużego drona",
    bigDroneCapacityUpgradeTitle: "Ulepsz ładowność dużego drona",
    bigDroneHPUpgradeTitle: "Ulepsz wytrzymałość dużego drona",
    fragBombUpgradeTitle: "Ulepsz bombę odłamkową",
    heBombUpgradeTitle: "Ulepsz bombę HE",
    shapedBombUpgradeTitle: "Ulepsz ładunek kumulacyjny",
    magnetMineUpgradeTitle: "Ulepsz minę magnetyczną",
    shrapnelBombUpgradeTitle: "Ulepsz bombę szrapnelową",
    clusterBombUpgradeTitle: "Ulepsz bombę kasetową",
    shapedClusterBombUpgradeTitle: "Ulepsz kumulacyjno-kasetową bombę AT",
    fragBombUpgradeDescription: `Aktualny promień rozrzutu odłamków:<strong>
  <span id="fragBombCurrentRadius">10.</span> m.
</strong>`,
    fragBombUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="fragBombNextRadius">10.</span> m.</strong>`,
    fragBombUpgradeAdditionalInfo: ` Każde ulepszenie zwiększa szansę trafienia odłamkiem o 1,50 %. Szansa maleje wraz z odległością od środka eksplozji. Odłamki nie trafiają w wrogów pełzających ani w pojazdy opancerzone.`,
    heBombUpgradeDescription: `Aktualny promień wybuchu:<strong>
  <span id="heBombCurrentRadius">10.</span> m.
</strong>`,
    heBombUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="heBombNextRadius">10.</span> m.</strong>`,
    shapedBombUpgradeDescription: `Przebicie pancerza to prawdopodobieństwo przebicia jednej jednostki pancerza. Aby zniszczyć pojazd, bomba musi przebić wszystkie jednostki pancerza. Aktualne przebicie ładunku kumulacyjnego <strong>
  <span id="shapedBombCurrentState">10</span></strong>.`,
    shapedBombUpgradeNext: `Po ulepszeniu przebicie będzie <strong>
  <span id="shapedBombNextState">10</span></strong>.`,
    magnetMineUpgradeDescription: `Przebicie pancerza to prawdopodobieństwo przebicia jednej jednostki pancerza. Aby zniszczyć pojazd, mina musi przebić wszystkie jednostki pancerza. Aktualne przebicie miny magnetycznej <strong>
  <span id="magnetMineCurrentState">10</span></strong>.`,
    magnetMineUpgradeNext: `Po ulepszeniu przebicie będzie <strong>
  <span id="magnetMineNextState">10</span></strong>.`,
    shrapnelBombUpgradeDescription: `Aktualny promień rozrzutu odłamków:<strong>
  <span id="shrapnelBombCurrentRadius">10.</span> m.
</strong>`,
    shrapnelBombUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="shrapnelBombNextRadius">10</span></strong> m.`,
    shrapnelBombUpgradeAdditionalInfo: ` Każde ulepszenie zwiększa szansę trafienia odłamkiem o 1,50 %. Trafiają one piechotę w ruchu i pełzającą, a także pojazdy nieopancerzone. Brak efektu na pojazdy opancerzone.`,
    clusterBombUpgradeDescription: `Aktualna liczba subamunicji HE:<strong>
  <span id="clusterBombCurrentState">10.</span> szt.</strong>`,
    clusterBombUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="clusterBombNextState">11.</span> szt.</strong>`,
    shapedClusterBombUpgradeDescription: `Aktualna liczba subamunicji przeciwpancernej:<strong>
  <span id="shapedClusterBombCurrentState">10.</span> szt.</strong>`,
    shapedClusterBombUpgradeDescription1: `Przebicie pancerza:
  <strong><span id="shapedClusterBombCurrentAPState">10</span></strong>`,
    shapedClusterBombUpgradeNext: `Po ulepszeniu liczba będzie:
  <strong><span id="shapedClusterBombNextState">11</span></strong> szt.`,
    shapedClusterBombUpgradeDescription2: `Przebicie pancerza:
  <strong><span id="shapedClusterBombNextAPState">11</span></strong>`,
    smallDroneCapacityUpgradeDescription: `Aktualna ładowność małego drona:<strong>
  <span id="smallDroneCurrentCapacity">10</span> kg</strong>`,
    smallDroneCapacityUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="smallDroneNextCapacity">12</span> kg</strong>`,
    smallDroneHPUpgradeDescription: `Aktualna wytrzymałość małego drona:<strong>
  <span id="smallDroneCurrentHP">10</span> HP</strong>`,
    smallDroneHPUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="smallDroneNextHP">12</span> HP</strong>`,
    mediumDroneSpeedUpgradeDescription: `Aktualna prędkość drona średniego:<strong>
  <span id="mediumDroneCurrentSpeed">10</span> m/s</strong>`,
    mediumDroneSpeedUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="mediumDroneNextSpeed">12</span> m/s</strong>`,
    mediumDroneCapacityUpgradeDescription: `Aktualna ładowność drona średniego:<strong>
  <span id="mediumDroneCurrentCapacity">10</span> kg</strong>`,
    mediumDroneCapacityUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="mediumDroneNextCapacity">12</span> kg</strong>`,
    mediumDroneHPUpgradeDescription: `Aktualna wytrzymałość drona średniego:<strong>
  <span id="mediumDroneCurrentHP">10</span> HP</strong>`,
    mediumDroneHPUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="mediumDroneNextHP">12</span> HP</strong>`,
    bigDroneSpeedUpgradeDescription: `Aktualna prędkość dużego drona:<strong>
  <span id="bigDroneCurrentSpeed">10</span> m/s</strong>`,
    bigDroneSpeedUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="bigDroneNextSpeed">12</span> m/s</strong>`,
    bigDroneCapacityUpgradeDescription: `Aktualna ładowność dużego drona:<strong>
  <span id="bigDroneCurrentCapacity">10</span> kg</strong>`,
    bigDroneCapacityUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="bigDroneNextCapacity">12</span> kg</strong>`,
    bigDroneHPUpgradeDescription: `Aktualna wytrzymałość dużego drona:<strong>
  <span id="bigDroneCurrentHP">10</span> HP</strong>`,
    bigDroneHPUpgradeNext: `Po ulepszeniu będzie to <strong>
  <span id="bigDroneNextHP">12</span> HP</strong>`,
    tankMineUpgradeTitle: "Detonatory piechoty",
    tankMineUpgradeDescription: `Detonatory dla miny HE pozwalają na jej zdetonowanie przy kontakcie z piechotą lub pojazdem. Po wybuchu niszczą piechotę w promieniu 3 m.`,
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function t(key) {
  return (languages[currentLang] && languages[currentLang][key]) || key;
}

document.getElementById("gamePointsTitle").innerHTML = t("gamePointsTitle");
document.getElementById("openTechnologiesTitle").innerHTML = t(
  "openTechnologiesTitle"
);
document.getElementById("upgradeTechnologiesTitle").innerHTML = t(
  "upgradeTechnologiesTitle"
);
document.getElementById("mediumDroneText").innerHTML = t("mediumDroneText");
document.getElementById("bigDroneText").innerHTML = t("bigDroneText");
document.getElementById("slot4Text").innerHTML = t("slot4Text");
document.getElementById("slot5Text").innerHTML = t("slot5Text");
document.getElementById("footMineText").innerHTML = t("footMineText");
document.getElementById("tankMineText").innerHTML = t("tankMineText");
document.getElementById("magnetMineText").innerHTML = t("magnetMineText");
document.getElementById("shrapnelBombText").innerHTML = t("shrapnelBombText");
document.getElementById("clusterBombText").innerHTML = t("clusterBombText");
document.getElementById("shapedClusterBombText").innerHTML = t(
  "shapedClusterBombText"
);
document.getElementById("smallDroneSpeedText").innerHTML = t(
  "smallDroneSpeedText"
);
document.getElementById("smallDroneCapacityText").innerHTML = t(
  "smallDroneCapacityText"
);
document.getElementById("smallDroneHPText").innerHTML = t("smallDroneHPText");
document.getElementById("mediumDroneSpeedText").innerHTML = t(
  "mediumDroneSpeedText"
);
document.getElementById("mediumDroneCapacityText").innerHTML = t(
  "mediumDroneCapacityText"
);
document.getElementById("mediumDroneHPText").innerHTML = t("mediumDroneHPText");
document.getElementById("bigDroneSpeedText").innerHTML = t("bigDroneSpeedText");
document.getElementById("bigDroneCapacityText").innerHTML = t(
  "bigDroneCapacityText"
);
document.getElementById("bigDroneHPText").innerHTML = t("bigDroneHPText");
document.getElementById("fragBombText1").innerHTML = t("fragBombText");
document.getElementById("heBombText1").innerHTML = t("heBombText");
document.getElementById("shapedBombText1").innerHTML = t("shapedBombText");
document.getElementById("magnetMineText1").innerHTML = t("magnetMineText");
document.getElementById("shrapnelBombText1").innerHTML = t("shrapnelBombText");
document.getElementById("clusterBombText1").innerHTML = t("clusterBombText");
document.getElementById("shapedClusterBombText1").innerHTML = t(
  "shapedClusterBombText"
);
document.getElementById("back-button").textContent = t("back");
document.getElementById("middleDroneOpenTitle").innerHTML = t(
  "middleDroneOpenTitle"
);
document.querySelectorAll(".gamePointsTitle").forEach((element) => {
  element.innerHTML = t("gamePointsTitle");
});
document.querySelectorAll(".openCostTitle").forEach((element) => {
  element.innerHTML = t("openCostTitle");
});
document.getElementById("middleDroneOpenDescription").innerHTML = t(
  "middleDroneOpenDescription"
);
document.getElementById("middleDroneOpenAdditionalInfo").innerHTML = t(
  "middleDroneOpenAdditionalInfo"
);
document.getElementById("middleDroneWeight").innerHTML = t("middleDroneWeight");
document.getElementById("middleDroneSuspensionCount").innerHTML = t(
  "middleDroneSuspensionCount"
);
document.getElementById("middleDroneMaxSpeed").innerHTML = t(
  "middleDroneMaxSpeed"
);
document.getElementById("middleDroneDurability").innerHTML = t(
  "middleDroneDurability"
);
document.querySelectorAll(".openButton").forEach((element) => {
  element.innerHTML = t("open");
});
document.querySelectorAll(".back-button").forEach((element) => {
  element.innerHTML = t("back");
});
document.getElementById("bigDroneOpenTitle").innerHTML = t("bigDroneOpenTitle");
document.getElementById("bigDroneOpenDescription").innerHTML = t(
  "bigDroneOpenDescription"
);
document.getElementById("bigDroneOpenAdditionalInfo").innerHTML = t(
  "bigDroneOpenAdditionalInfo"
);
document.getElementById("bigDroneWeight").innerHTML = t("bigDroneWeight");
document.getElementById("bigDroneSuspensionCount").innerHTML = t(
  "bigDroneSuspensionCount"
);
document.getElementById("bigDroneMaxSpeed").innerHTML = t("bigDroneMaxSpeed");
document.getElementById("bigDroneDurability").innerHTML =
  t("bigDroneDurability");
document.getElementById("slot4OpenTitle").innerHTML = t("slot4OpenTitle");
document.getElementById("slot5OpenTitle").innerHTML = t("slot5OpenTitle");
document.getElementById("slot4OpenDescription").innerHTML = t(
  "slot4OpenDescription"
);
document.getElementById("slot5OpenDescription").innerHTML = t(
  "slot5OpenDescription"
);
document.getElementById("footMineOpenTitle").innerHTML = t("footMineOpenTitle");
document.getElementById("footMineOpenDescription").innerHTML = t(
  "footMineOpenDescription"
);
document.getElementById("tankMineOpenTitle").innerHTML = t("tankMineOpenTitle");
document.getElementById("tankMineOpenDescription").innerHTML = t(
  "tankMineOpenDescription"
);
document.getElementById("magnetMineOpenTitle").innerHTML = t(
  "magnetMineOpenTitle"
);
document.getElementById("magnetMineOpenDescription").innerHTML = t(
  "magnetMineOpenDescription"
);
document.getElementById("shrapnelBombOpenTitle").innerHTML = t(
  "shrapnelBombOpenTitle"
);
document.getElementById("shrapnelBombOpenDescription").innerHTML = t(
  "shrapnelBombOpenDescription"
);
document.getElementById("clusterBombOpenTitle").innerHTML = t(
  "clusterBombOpenTitle"
);
document.getElementById("clusterBombOpenDescription").innerHTML = t(
  "clusterBombOpenDescription"
);
document.getElementById("shapedClusterBombOpenTitle").innerHTML = t(
  "shapedClusterBombOpenTitle"
);
document.getElementById("shapedClusterBombOpenDescription").innerHTML = t(
  "shapedClusterBombOpenDescription"
);
document.getElementById("smallDroneSpeedUpgradeDescription").innerHTML = t(
  "smallDroneSpeedUpgradeDescription"
);
document.getElementById("smallDroneSpeedUpgradeNext").innerHTML = t(
  "smallDroneSpeedUpgradeNext"
);
document.getElementById("smallDroneSpeedUpgradeTitle").innerHTML = t(
  "smallDroneSpeedUpgradeTitle"
);
document.getElementById("smallDroneCapacityUpgradeTitle").innerHTML = t(
  "smallDroneCapacityUpgradeTitle"
);
document.getElementById("smallDroneHPUpgradeTitle").innerHTML = t(
  "smallDroneHPUpgradeTitle"
);
document.getElementById("mediumDroneSpeedUpgradeTitle").innerHTML = t(
  "mediumDroneSpeedUpgradeTitle"
);
document.getElementById("mediumDroneCapacityUpgradeTitle").innerHTML = t(
  "mediumDroneCapacityUpgradeTitle"
);
document.getElementById("mediumDroneHPUpgradeTitle").innerHTML = t(
  "mediumDroneHPUpgradeTitle"
);
document.getElementById("bigDroneSpeedUpgradeTitle").innerHTML = t(
  "bigDroneSpeedUpgradeTitle"
);
document.getElementById("bigDroneCapacityUpgradeTitle").innerHTML = t(
  "bigDroneCapacityUpgradeTitle"
);
document.getElementById("bigDroneHPUpgradeTitle").innerHTML = t(
  "bigDroneHPUpgradeTitle"
);
document.getElementById("fragBombUpgradeTitle").innerHTML = t(
  "fragBombUpgradeTitle"
);
document.getElementById("heBombUpgradeTitle").innerHTML =
  t("heBombUpgradeTitle");
document.getElementById("shapedBombUpgradeTitle").innerHTML = t(
  "shapedBombUpgradeTitle"
);
document.getElementById("magnetMineUpgradeTitle").innerHTML = t(
  "magnetMineUpgradeTitle"
);
document.getElementById("shrapnelBombUpgradeTitle").innerHTML = t(
  "shrapnelBombUpgradeTitle"
);
document.getElementById("clusterBombUpgradeTitle").innerHTML = t(
  "clusterBombUpgradeTitle"
);
document.getElementById("shapedClusterBombUpgradeTitle").innerHTML = t(
  "shapedClusterBombUpgradeTitle"
);
document.getElementById("fragBombUpgradeDescription").innerHTML = t(
  "fragBombUpgradeDescription"
);
document.getElementById("fragBombUpgradeNext").innerHTML = t(
  "fragBombUpgradeNext"
);
document.getElementById("fragBombUpgradeAdditionalInfo").innerHTML = t(
  "fragBombUpgradeAdditionalInfo"
);
document.getElementById("heBombUpgradeDescription").innerHTML = t(
  "heBombUpgradeDescription"
);
document.getElementById("heBombUpgradeNext").innerHTML = t("heBombUpgradeNext");
document.getElementById("shapedBombUpgradeDescription").innerHTML = t(
  "shapedBombUpgradeDescription"
);
document.getElementById("shapedBombUpgradeNext").innerHTML = t(
  "shapedBombUpgradeNext"
);
document.getElementById("magnetMineUpgradeDescription").innerHTML = t(
  "magnetMineUpgradeDescription"
);
document.getElementById("magnetMineUpgradeNext").innerHTML = t(
  "magnetMineUpgradeNext"
);
document.getElementById("shrapnelBombUpgradeDescription").innerHTML = t(
  "shrapnelBombUpgradeDescription"
);
document.getElementById("shrapnelBombUpgradeNext").innerHTML = t(
  "shrapnelBombUpgradeNext"
);
document.getElementById("shrapnelBombUpgradeAdditionalInfo").innerHTML = t(
  "shrapnelBombUpgradeAdditionalInfo"
);
document.getElementById("clusterBombUpgradeDescription").innerHTML = t(
  "clusterBombUpgradeDescription"
);
document.getElementById("clusterBombUpgradeNext").innerHTML = t(
  "clusterBombUpgradeNext"
);
document.getElementById("shapedClusterBombUpgradeDescription").innerHTML = t(
  "shapedClusterBombUpgradeDescription"
);
document.getElementById("shapedClusterBombUpgradeNext").innerHTML = t(
  "shapedClusterBombUpgradeNext"
);
document.getElementById("shapedClusterBombUpgradeDescription1").innerHTML = t(
  "shapedClusterBombUpgradeDescription1"
);
document.getElementById("shapedClusterBombUpgradeDescription2").innerHTML = t(
  "shapedClusterBombUpgradeDescription2"
);
document.getElementById("smallDroneCapacityUpgradeDescription").innerHTML = t(
  "smallDroneCapacityUpgradeDescription"
);
document.getElementById("smallDroneCapacityUpgradeNext").innerHTML = t(
  "smallDroneCapacityUpgradeNext"
);
document.getElementById("smallDroneHPUpgradeDescription").innerHTML = t(
  "smallDroneHPUpgradeDescription"
);
document.getElementById("smallDroneHPUpgradeNext").innerHTML = t(
  "smallDroneHPUpgradeNext"
);
document.getElementById("mediumDroneSpeedUpgradeDescription").innerHTML = t(
  "mediumDroneSpeedUpgradeDescription"
);
document.getElementById("mediumDroneSpeedUpgradeNext").innerHTML = t(
  "mediumDroneSpeedUpgradeNext"
);
document.getElementById("mediumDroneCapacityUpgradeDescription").innerHTML = t(
  "mediumDroneCapacityUpgradeDescription"
);
document.getElementById("mediumDroneCapacityUpgradeNext").innerHTML = t(
  "mediumDroneCapacityUpgradeNext"
);
document.getElementById("mediumDroneHPUpgradeDescription").innerHTML = t(
  "mediumDroneHPUpgradeDescription"
);
document.getElementById("mediumDroneHPUpgradeNext").innerHTML = t(
  "mediumDroneHPUpgradeNext"
);
document.getElementById("bigDroneSpeedUpgradeDescription").innerHTML = t(
  "bigDroneSpeedUpgradeDescription"
);
document.getElementById("bigDroneSpeedUpgradeNext").innerHTML = t(
  "bigDroneSpeedUpgradeNext"
);
document.getElementById("bigDroneCapacityUpgradeDescription").innerHTML = t(
  "bigDroneCapacityUpgradeDescription"
);
document.getElementById("bigDroneCapacityUpgradeNext").innerHTML = t(
  "bigDroneCapacityUpgradeNext"
);
document.getElementById("bigDroneHPUpgradeDescription").innerHTML = t(
  "bigDroneHPUpgradeDescription"
);
document.getElementById("bigDroneHPUpgradeNext").innerHTML = t(
  "bigDroneHPUpgradeNext"
);
document.getElementById("tankMineUpgradeTitle").innerHTML = t(
  "tankMineUpgradeTitle"
);
document.getElementById("tankMineUpgradeDescription").innerHTML = t(
  "tankMineUpgradeDescription"
);
document.getElementById("tankMineUpgradeText").innerHTML = t("tankMineText");
