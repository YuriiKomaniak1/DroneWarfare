const languages = {
  ua: {
    hello: "Вітаю",
    next: "Далі",
    trainingInfo:
      "Це тренувальна місія. Тут ти можеш ознайомитися з основами керування дронами та їхніми можливостями.",
    trainingInfo2: `Гравець керує дроном, який може літати над полем бою. Самого дрона не видно — лише його приціл. Завдання гравця — знищити ворогів і ворожу техніку, використовуючи різні типи боєприпасів і дрони.`,
    controlsInfo: `Поглянь на нижню частину екрана, щоб побачити кнопки керування дроном.`,
    controlsList: `<strong>1 — Джойстик</strong> — керує рухом дрона (вгору, вниз, вліво, вправо)`,
    controlsList2: `<strong>2 — Скидання бомби</strong> — скидання активної бомби`,
    controlsList3: `<strong>3 — Зміна бомби</strong> — перемикання між типами бомб, які встановлені на дроні`,
    controlsInfo2: `Спробуй порухатися та поскидати бомби. Зверни увагу: якщо дрон стоїть, бомби падають прямо вниз. Якщо дрон рухається — бомби летять по траєкторії його руху.`,
    minimapTitle: "Мінікарта",
    minimapInfo: `Мінікарта знаходиться у верхньому лівому куті екрана:`,
    minimapPlayerMarker: `<strong>Синя мітка</strong> — дрон гравця`,
    minimapEnemyMarker: `<strong>Червоні мітки</strong> — вороги`,
    minimapVisibleArea: `<strong>Сірий прямокутник</strong> — видима частина поля бою`,
    minimapVictoryProgress: `<strong>Зелена смуга</strong> — прогрес до перемоги`,
    minimapDefeatProgress: `<strong>Червона смуга</strong> — прогрес до поразки`,
    scrollTitle: "Зміна висоти",
    scrollInfo: `Смуга прокрутки під мінікартою служить для збільшення або зменшення висоти дрона.`,
    scrollInfo2: `Спробуй змінити висоту і подивися, як це відображається на мінікарті. Коло прицілу дрона відображаються швидкість та висота дрона та час падіння бомби.`,
    dronesTitle: "Дрони",
    dronesInfo: `Іконки дронів розміщені у верхньому правому куті. Активний дрон підсвічується яскравіше і має дві смуги збоку:`,
    droneHealth: `<strong>Зелена смуга</strong> — запас міцності дрона`,
    droneVisibility: `<strong>Червона смуга</strong> — помітність: шанс того, що вороги його побачать і відкриють вогонь`,
    dronesInfo2: `Під іконкою дрона зображено кількість наявних бомб. Натисни на дрон — він стане активним, а попередній полетить на перезарядку.`,
    dronesInfo3: `Спробуй змінити дрони та скинути бомби.`,
    enemiesTitle: "Вороги",
    enemiesInfo: `Завдання ворогів — прорватися до визначеної точки. Завдання гравця — знищити їх до цього моменту.`,
    enemiesInfo2: `Якщо ворог помітить дрон, він почне стріляти.`,
    enemiesInfo3: `Кулеметники (з білими смугами) стріляють ефективніше і з більшої відстані.`,
    bombsTitle: "Бомби",
    bombsInfo: `У грі доступно багато типів бомб і мін. На початку доступні три:`,
    bombFragmentation: `<strong>Осколкова (червона)</strong> — радіус вибуху 1 м, радіус ураження уламками — 7 м. Не зачіпає ворогів, що повзають. Що ближче до епіцентру — то вища ймовірність ураження. Ефективна проти скупчення ворогів.`,
    bombHighExplosive: `<strong>Фугасна (синя)</strong> — радіус вибуху 2,5 м. Без ураження уламками. Ефективна проти повзаючих ворогів та легкої техніки.`,
    bombKumulation: `<strong>Кумулятивна (коричнева)</strong> — пробиває броню. Ефективна проти бронетехніки. Піхоту уражає лише при прямому влучанні.`,
    bombsInfo4: `Потренуйся скидати бомби по ворогах.`,
    fireTitle: "Вогонь по дрону",
    fireInfo: `Імовірність влучення по дрону залежить від його розміру, швидкості та кількості ворогів. Нерухомий дрон — легка мішень.`,
    fireInfo2: `Щоб знищити групу ворогів, краще скидати бомбу з розгону, не зависаючи над ними.`,
    techTitle: "Техніка",
    techInfo: `У грі є броньована та неброньована техніка. Вона має екіпаж і різне озброєння.`,
    techInfo2: `На мінікарті: неброньована — рожева, броньована — червона, та що може стріляти по дрону — темно-червона.`,
    techInfo3: `Проти неброньованої ефективна фугасна бомба, проти броньованої — кумулятивна. Результат залежить від рівня броні та бронепробивності.`,
    techInfo4: `Потренуйся знищувати техніку — навчальна місія завершиться автоматично.`,
    missionCompleteTitle: "Місія завершена",
    missionCompleteInfo: `Навчальну місію успішно завершено.`,
  },
  en: {
    hello: "Welcome",
    next: "Next",
    trainingInfo:
      "This is a training mission where you can learn the basics of drone control and capabilities.",
    trainingInfo2:
      "You control a drone flying over the battlefield. The drone itself is not visible — only its targeting reticle. Your goal is to eliminate enemies and vehicles using various types of bombs and drones.",
    controlsInfo: "Check the bottom of the screen for drone control buttons.",
    controlsList:
      "<strong>1 — Joystick</strong> — controls drone movement (up, down, left, right)",
    controlsList2: "<strong>2 — Drop Bomb</strong> — releases the active bomb",
    controlsList3:
      "<strong>3 — Switch Bomb</strong> — switches between bomb types equipped on the drone",
    controlsInfo2:
      "Try moving around and dropping bombs. Note: if the drone is stationary, bombs fall straight down. If it's moving, they follow its trajectory.",
    minimapTitle: "Minimap",
    minimapInfo: "The minimap is located in the top-left corner of the screen:",
    minimapPlayerMarker: "<strong>Blue marker</strong> — your drone",
    minimapEnemyMarker: "<strong>Red markers</strong> — enemies",
    minimapVisibleArea:
      "<strong>Gray rectangle</strong> — current visible area",
    minimapVictoryProgress:
      "<strong>Green bar</strong> — progress toward victory",
    minimapDefeatProgress: "<strong>Red bar</strong> — progress toward defeat",
    scrollTitle: "Altitude",
    scrollInfo: `The sli  der below the minimap lets you increase or decrease the drone's altitude.`,
    scrollInfo2: `Try changing the altitude and see how it is shown on the minimap. The drone's reticle displays speed, altitude, and bomb drop time.`,
    dronesTitle: "Drones",
    dronesInfo:
      "Drone icons are shown in the top-right corner. The active drone is highlighted and has two bars next to it:",
    droneHealth: "<strong>Green bar</strong> — drone durability",
    droneVisibility:
      "<strong>Red bar</strong> — visibility: chance of being detected and attacked by enemies",
    dronesInfo2:
      "Below each drone icon, you’ll see the number of bombs available. Tap a drone to switch to it — the previous one will go reload.",
    dronesInfo3: "Try switching drones and dropping bombs.",
    enemiesTitle: "Enemies",
    enemiesInfo:
      "Enemy units try to reach a target point. Your task is to destroy them before they do.",
    enemiesInfo2: "If an enemy spots your drone, it will start shooting.",
    enemiesInfo3:
      "Machine gunners (marked with white stripes) shoot more accurately and from longer range.",
    bombsTitle: "Bombs",
    bombsInfo:
      "There are many types of bombs and mines in the game. Initially, three are available:",
    bombFragmentation:
      "<strong>Fragmentation (red)</strong> — 1 m blast radius, 7 m shrapnel spread. Doesn't affect crawling enemies. Higher damage near the blast center. Great for clustered targets.",
    bombHighExplosive:
      "<strong>High-Explosive (blue)</strong> — 2.5 m blast radius, no shrapnel. Effective against crawling enemies and light vehicles.",
    bombKumulation:
      "<strong>Shaped Charge (brown)</strong> — penetrates armor. Effective against armored vehicles. Only damages infantry on direct hit.",
    bombsInfo4: "Practice dropping bombs on enemies.",
    fireTitle: "Incoming Fire",
    fireInfo:
      "Your drone’s chances of getting hit depend on its size, speed, and how many enemies are nearby. Stationary drones are easy targets.",
    fireInfo2:
      "To destroy a group of enemies, drop the bomb while moving at speed — don’t hover above them.",
    techTitle: "Vehicles",
    techInfo:
      "The game features armored and unarmored vehicles, each with crew and unique weaponry.",
    techInfo2:
      "On the minimap: unarmored vehicles are pink, armored ones are red, and those capable of firing at drones are dark red.",
    techInfo3:
      "Use high-explosive bombs against unarmored vehicles, and shaped charge bombs against armored ones. Effectiveness depends on armor and penetration level.",
    techInfo4:
      "Practice destroying vehicles — the mission will end automatically.",
    missionCompleteTitle: "Mission Complete",
    missionCompleteInfo:
      "You have successfully completed the training mission.",
  },
  de: {
    hello: "Willkommen",
    next: "Weiter",
    trainingInfo:
      "Dies ist eine Trainingsmission, in der du die Grundlagen der Drohnensteuerung und ihre Fähigkeiten erlernen kannst.",
    trainingInfo2:
      "Du steuerst eine Drohne, die über das Schlachtfeld fliegt. Die Drohne selbst ist nicht sichtbar — nur ihr Zielkreuz. Dein Ziel ist es, Feinde und Fahrzeuge mit verschiedenen Bomben und Drohnen zu eliminieren.",
    controlsInfo:
      "Unten auf dem Bildschirm findest du die Steuerungsschaltflächen der Drohne.",
    controlsList:
      "<strong>1 — Joystick</strong> — steuert die Bewegung der Drohne (hoch, runter, links, rechts)",
    controlsList2:
      "<strong>2 — Bombe abwerfen</strong> — wirft die aktive Bombe ab",
    controlsList3:
      "<strong>3 — Bombe wechseln</strong> — wechselt zwischen den Bombentypen, die auf der Drohne installiert sind",
    controlsInfo2:
      "Bewege dich und wirf Bomben ab. Hinweis: Wenn die Drohne steht, fallen Bomben senkrecht nach unten. Wenn sie sich bewegt, folgen sie ihrer Flugbahn.",
    minimapTitle: "Minikarte",
    minimapInfo: "Die Minikarte befindet sich oben links auf dem Bildschirm:",
    minimapPlayerMarker: "<strong>Blaue Markierung</strong> — deine Drohne",
    minimapEnemyMarker: "<strong>Rote Markierungen</strong> — Feinde",
    minimapVisibleArea:
      "<strong>Graues Rechteck</strong> — aktueller sichtbarer Bereich",
    minimapVictoryProgress:
      "<strong>Grüner Balken</strong> — Fortschritt zum Sieg",
    minimapDefeatProgress:
      "<strong>Roter Balken</strong> — Fortschritt zur Niederlage",
    scrollTitle: "Höhe ändern",
    scrollInfo:
      "Der Schieberegler unter der Minikarte dient dazu, die Flughöhe der Drohne zu erhöhen oder zu verringern.",
    scrollInfo2:
      "Probiere aus, die Höhe zu ändern, und beobachte, wie sich das auf die Minikarte auswirkt. Im Fadenkreuz der Drohne werden Geschwindigkeit, Höhe und Bombenfallzeit angezeigt.",
    dronesTitle: "Drohnen",
    dronesInfo:
      "Drohnen-Icons befinden sich oben rechts. Die aktive Drohne ist hervorgehoben und hat zwei Balken daneben:",
    droneHealth: "<strong>Grüner Balken</strong> — Haltbarkeit der Drohne",
    droneVisibility:
      "<strong>Roter Balken</strong> — Sichtbarkeit: Wahrscheinlichkeit, entdeckt und beschossen zu werden",
    dronesInfo2:
      "Unter jedem Icon siehst du die verfügbaren Bomben. Tippe auf eine Drohne, um sie zu aktivieren — die vorherige fliegt zum Nachladen.",
    dronesInfo3: "Probiere das Wechseln und Bombenabwerfen aus.",
    enemiesTitle: "Feinde",
    enemiesInfo:
      "Feinde versuchen, ein Ziel zu erreichen. Deine Aufgabe ist es, sie vorher zu zerstören.",
    enemiesInfo2:
      "Wenn ein Feind deine Drohne sieht, wird er das Feuer eröffnen.",
    enemiesInfo3:
      "Maschinengewehrschützen (mit weißen Streifen) schießen präziser und aus größerer Entfernung.",
    bombsTitle: "Bomben",
    bombsInfo:
      "Im Spiel gibt es viele Bomben- und Minentypen. Zu Beginn sind drei verfügbar:",
    bombFragmentation:
      "<strong>Splitterbombe (rot)</strong> — Explosionsradius 1 m, Splitterwirkung 7 m. Trifft keine kriechende Feinde. Je näher am Zentrum, desto höher der Schaden. Effektiv gegen Gruppen.",
    bombHighExplosive:
      "<strong>Sprengbombe (blau)</strong> — Explosionsradius 2,5 m. Keine Splitter. Effektiv gegen kriechende Feinde und leichte Fahrzeuge.",
    bombKumulation:
      "<strong>Hohlladung (braun)</strong> — durchschlägt Panzerung. Effektiv gegen gepanzerte Fahrzeuge. Verletzt Infanterie nur bei direktem Treffer.",
    bombsInfo4: "Trainiere das Bombenabwerfen auf Feinde.",
    fireTitle: "Feindbeschuss",
    fireInfo:
      "Die Trefferwahrscheinlichkeit hängt von Größe, Geschwindigkeit und Anzahl der Feinde ab. Eine stehende Drohne ist ein leichtes Ziel.",
    fireInfo2:
      "Um Gruppen zu zerstören, wirf Bomben in Bewegung ab, nicht im Schwebeflug.",
    techTitle: "Fahrzeuge",
    techInfo:
      "Es gibt gepanzerte und ungepanzerte Fahrzeuge mit Besatzung und unterschiedlichen Waffen.",
    techInfo2:
      "Auf der Minikarte: ungepanzerte = rosa, gepanzerte = rot, drohnenbedrohliche = dunkelrot.",
    techInfo3:
      "Sprengbomben gegen ungepanzerte, Hohlladung gegen gepanzerte Fahrzeuge. Effekt abhängig von Panzerung und Durchschlag.",
    techInfo4:
      "Trainiere das Zerstören von Fahrzeugen — die Mission endet automatisch.",
    missionCompleteTitle: "Mission abgeschlossen",
    missionCompleteInfo:
      "Die Trainingsmission wurde erfolgreich abgeschlossen.",
  },
  es: {
    hello: "Bienvenido",
    next: "Siguiente",
    trainingInfo:
      "Esta es una misión de entrenamiento donde puedes aprender lo básico sobre el control y capacidades de los drones.",
    trainingInfo2:
      "Controlas un dron que vuela sobre el campo de batalla. El dron no es visible, solo su mira. Tu objetivo es eliminar enemigos y vehículos usando diferentes tipos de bombas y drones.",
    controlsInfo:
      "Observa la parte inferior de la pantalla para ver los botones de control del dron.",
    controlsList:
      "<strong>1 — Joystick</strong> — controla el movimiento del dron (arriba, abajo, izquierda, derecha)",
    controlsList2: "<strong>2 — Soltar bomba</strong> — lanza la bomba activa",
    controlsList3:
      "<strong>3 — Cambiar bomba</strong> — cambia entre los tipos de bombas equipadas en el dron",
    controlsInfo2:
      "Intenta moverte y soltar bombas. Nota: si el dron está quieto, las bombas caen directamente. Si está en movimiento, siguen su trayectoria.",
    minimapTitle: "Minimapa",
    minimapInfo:
      "El minimapa está en la esquina superior izquierda de la pantalla:",
    minimapPlayerMarker: "<strong>Marcador azul</strong> — tu dron",
    minimapEnemyMarker: "<strong>Marcadores rojos</strong> — enemigos",
    minimapVisibleArea:
      "<strong>Rectángulo gris</strong> — área visible actual",
    minimapVictoryProgress:
      "<strong>Barra verde</strong> — progreso hacia la victoria",
    minimapDefeatProgress:
      "<strong>Barra roja</strong> — progreso hacia la derrota",
    scrollTitle: "Altura",
    scrollInfo: `La barra debajo del minimapa permite aumentar o reducir la altura del dron.`,
    scrollInfo2: `Prueba cambiar la altura y observa cómo se refleja en el minimapa. En la mira del dron se muestran la velocidad, la altura y el tiempo de caída de la bomba.`,
    dronesTitle: "Drones",
    dronesInfo:
      "Los íconos de los drones están en la esquina superior derecha. El dron activo está resaltado y tiene dos barras a su lado:",
    droneHealth: "<strong>Barra verde</strong> — durabilidad del dron",
    droneVisibility:
      "<strong>Barra roja</strong> — visibilidad: probabilidad de ser detectado y atacado",
    dronesInfo2:
      "Debajo del ícono verás cuántas bombas tiene el dron. Toca un dron para activarlo — el anterior irá a recargar.",
    dronesInfo3: "Prueba cambiar de dron y soltar bombas.",
    enemiesTitle: "Enemigos",
    enemiesInfo:
      "Los enemigos intentan llegar a un punto específico. Tu misión es detenerlos antes de que lo logren.",
    enemiesInfo2: "Si un enemigo ve tu dron, comenzará a disparar.",
    enemiesInfo3:
      "Los ametralladores (con franjas blancas) disparan más lejos y con mayor precisión.",
    bombsTitle: "Bombas",
    bombsInfo:
      "El juego tiene muchos tipos de bombas y minas. Al inicio hay tres disponibles:",
    bombFragmentation:
      "<strong>Fragmentación (roja)</strong> — radio de explosión de 1 m, metralla hasta 7 m. No afecta enemigos que se arrastran. Más daño cerca del epicentro. Útil contra grupos.",
    bombHighExplosive:
      "<strong>Alto explosivo (azul)</strong> — radio de explosión de 2,5 m. Sin metralla. Efectiva contra enemigos arrastrándose y vehículos ligeros.",
    bombKumulation:
      "<strong>Carga hueca (marrón)</strong> — perfora armadura. Efectiva contra vehículos blindados. Solo daña a la infantería con impacto directo.",
    bombsInfo4: "Practica lanzar bombas sobre los enemigos.",
    fireTitle: "Fuego enemigo",
    fireInfo:
      "La probabilidad de ser alcanzado depende del tamaño, velocidad del dron y número de enemigos cercanos. Un dron quieto es un blanco fácil.",
    fireInfo2:
      "Para destruir grupos de enemigos, lanza bombas en movimiento, no te detengas sobre ellos.",
    techTitle: "Vehículos",
    techInfo:
      "Hay vehículos blindados y no blindados con tripulación y armas distintas.",
    techInfo2:
      "En el minimapa: no blindados = rosa, blindados = rojo, peligrosos para drones = rojo oscuro.",
    techInfo3:
      "Usa alto explosivo contra no blindados, y carga hueca contra blindados. El resultado depende del blindaje y la penetración.",
    techInfo4:
      "Practica destruir vehículos — la misión terminará automáticamente.",
    missionCompleteTitle: "Misión completada",
    missionCompleteInfo:
      "Has completado exitosamente la misión de entrenamiento.",
  },
  fr: {
    hello: "Bienvenue",
    next: "Suivant",
    trainingInfo:
      "Ceci est une mission d'entraînement où vous apprendrez les bases du pilotage et des capacités des drones.",
    trainingInfo2:
      "Vous contrôlez un drone qui survole le champ de bataille. Le drone lui-même n'est pas visible — seule la mire s'affiche. Votre objectif est de détruire les ennemis et les véhicules en utilisant différents types de bombes et de drones.",
    controlsInfo:
      "Regardez en bas de l'écran pour voir les boutons de contrôle du drone.",
    controlsList:
      "<strong>1 — Joystick</strong> — contrôle les mouvements du drone (haut, bas, gauche, droite)",
    controlsList2:
      "<strong>2 — Larguer une bombe</strong> — largue la bombe active",
    controlsList3:
      "<strong>3 — Changer de bombe</strong> — alterne entre les types de bombes équipées sur le drone",
    controlsInfo2:
      "Essayez de bouger et de larguer des bombes. Remarque : si le drone est immobile, les bombes tombent à la verticale. En mouvement, elles suivent sa trajectoire.",
    minimapTitle: "Mini-carte",
    minimapInfo: "La mini-carte se trouve en haut à gauche de l'écran :",
    minimapPlayerMarker: "<strong>Marqueur bleu</strong> — votre drone",
    minimapEnemyMarker: "<strong>Marqueurs rouges</strong> — ennemis",
    minimapVisibleArea:
      "<strong>Rectangle gris</strong> — zone actuellement visible",
    minimapVictoryProgress:
      "<strong>Barre verte</strong> — progression vers la victoire",
    minimapDefeatProgress:
      "<strong>Barre rouge</strong> — progression vers la défaite",
    scrollTitle: "Altitude",
    scrollInfo: `La barre sous la mini-carte permet d’augmenter ou de diminuer l’altitude du drone.`,
    scrollInfo2: `Essayez de modifier l’altitude et observez l’effet sur la mini-carte. Le réticule du drone affiche la vitesse, l’altitude et le temps de chute de la bombe.`,
    dronesTitle: "Drones",
    dronesInfo:
      "Les icônes des drones se trouvent en haut à droite. Le drone actif est mis en surbrillance et a deux barres à côté :",
    droneHealth: "<strong>Barre verte</strong> — durabilité du drone",
    droneVisibility:
      "<strong>Barre rouge</strong> — visibilité : probabilité d’être repéré et attaqué",
    dronesInfo2:
      "Sous chaque icône, vous verrez le nombre de bombes disponibles. Touchez un drone pour le sélectionner — l’autre ira se recharger.",
    dronesInfo3: "Essayez de changer de drone et de larguer des bombes.",
    enemiesTitle: "Ennemis",
    enemiesInfo:
      "Les ennemis tentent d’atteindre une zone précise. Votre mission est de les en empêcher.",
    enemiesInfo2: "S’ils repèrent votre drone, ils commenceront à tirer.",
    enemiesInfo3:
      "Les mitrailleurs (avec des bandes blanches) tirent avec plus de précision et à plus longue portée.",
    bombsTitle: "Bombes",
    bombsInfo:
      "Le jeu comprend de nombreux types de bombes et mines. Au début, trois sont disponibles :",
    bombFragmentation:
      "<strong>Fragmentation (rouge)</strong> — rayon d'explosion de 1 m, éclats jusqu'à 7 m. N'affecte pas les ennemis rampants. Plus l’ennemi est proche de l’épicentre, plus il subit de dégâts. Efficace contre des groupes.",
    bombHighExplosive:
      "<strong>Explosif (bleu)</strong> — rayon de 2,5 m, pas d’éclats. Efficace contre les rampants et les véhicules légers.",
    bombKumulation:
      "<strong>Charge creuse (brun)</strong> — perce les blindages. Efficace contre les véhicules blindés. N'affecte l'infanterie que par impact direct.",
    bombsInfo4: "Entraînez-vous à bombarder les ennemis.",
    fireTitle: "Tirs ennemis",
    fireInfo:
      "Les chances d’être touché dépendent de la taille du drone, de sa vitesse et du nombre d’ennemis proches. Un drone immobile est une cible facile.",
    fireInfo2:
      "Pour détruire des groupes ennemis, larguez une bombe en vol, sans vous arrêter au-dessus.",
    techTitle: "Véhicules",
    techInfo:
      "Il y a des véhicules blindés et non-blindés avec des équipages et armements variés.",
    techInfo2:
      "Sur la mini-carte : rose = non-blindé, rouge = blindé, rouge foncé = armé contre les drones.",
    techInfo3:
      "Utilisez des bombes explosives contre les non-blindés, et des charges creuses contre les blindés. L'efficacité dépend du blindage et de la pénétration.",
    techInfo4:
      "Entraînez-vous à détruire les véhicules — la mission se terminera automatiquement.",
    missionCompleteTitle: "Mission terminée",
    missionCompleteInfo:
      "Vous avez terminé avec succès la mission d'entraînement.",
  },
  pt: {
    hello: "Bem-vindo",
    next: "Próximo",
    trainingInfo:
      "Esta é uma missão de treinamento onde você pode aprender o básico sobre controle e capacidades dos drones.",
    trainingInfo2:
      "Você controla um drone que voa sobre o campo de batalha. O drone em si não é visível — apenas a mira. Seu objetivo é destruir inimigos e veículos usando diferentes tipos de bombas e drones.",
    controlsInfo:
      "Veja a parte inferior da tela para os botões de controle do drone.",
    controlsList:
      "<strong>1 — Joystick</strong> — controla o movimento do drone (cima, baixo, esquerda, direita)",
    controlsList2: "<strong>2 — Soltar bomba</strong> — solta a bomba ativa",
    controlsList3:
      "<strong>3 — Trocar bomba</strong> — alterna entre os tipos de bombas equipados no drone",
    controlsInfo2:
      "Tente se mover e soltar bombas. Observação: se o drone estiver parado, as bombas caem reto. Em movimento, seguem sua trajetória.",
    minimapTitle: "Minimapa",
    minimapInfo: "O minimapa está no canto superior esquerdo da tela:",
    minimapPlayerMarker: "<strong>Marcador azul</strong> — seu drone",
    minimapEnemyMarker: "<strong>Marcadores vermelhos</strong> — inimigos",
    minimapVisibleArea: "<strong>Retângulo cinza</strong> — área visível atual",
    minimapVictoryProgress:
      "<strong>Barra verde</strong> — progresso em direção à vitória",
    minimapDefeatProgress:
      "<strong>Barra vermelha</strong> — progresso em direção à derrota",
    scrollTitle: "Altitude",
    scrollInfo: `A barra abaixo do minimapa serve para aumentar ou diminuir a altitude do drone.`,
    scrollInfo2: `Tente mudar a altitude e veja como isso aparece no minimapa. O círculo de mira do drone mostra velocidade, altitude e tempo de queda da bomba.`,
    dronesTitle: "Drones",
    dronesInfo:
      "Os ícones dos drones estão no canto superior direito. O drone ativo está destacado e tem duas barras ao lado:",
    droneHealth: "<strong>Barra verde</strong> — durabilidade do drone",
    droneVisibility:
      "<strong>Barra vermelha</strong> — visibilidade: chance de ser detectado e atacado pelos inimigos",
    dronesInfo2:
      "Abaixo de cada ícone há o número de bombas disponíveis. Toque em um drone para ativá-lo — o anterior recarregará.",
    dronesInfo3: "Tente trocar de drone e soltar bombas.",
    enemiesTitle: "Inimigos",
    enemiesInfo:
      "Os inimigos tentam alcançar um ponto específico. Sua tarefa é destruí-los antes disso.",
    enemiesInfo2: "Se um inimigo avistar seu drone, ele começará a atirar.",
    enemiesInfo3:
      "Metralhadores (com faixas brancas) atiram com mais precisão e de maiores distâncias.",
    bombsTitle: "Bombas",
    bombsInfo:
      "Há vários tipos de bombas e minas no jogo. Inicialmente, três estão disponíveis:",
    bombFragmentation:
      "<strong>Fragmentação (vermelha)</strong> — raio de explosão de 1 m, estilhaços até 7 m. Não afeta inimigos rastejando. Quanto mais perto do centro, maior o dano. Boa contra grupos.",
    bombHighExplosive:
      "<strong>Explosiva (azul)</strong> — raio de 2,5 m, sem estilhaços. Boa contra inimigos rastejando e veículos leves.",
    bombKumulation:
      "<strong>Carga Oca (marrom)</strong> — penetra blindagem. Eficaz contra veículos blindados. Atinge infantaria apenas com impacto direto.",
    bombsInfo4: "Pratique soltar bombas nos inimigos.",
    fireTitle: "Tiros inimigos",
    fireInfo:
      "A chance do drone ser atingido depende do seu tamanho, velocidade e quantidade de inimigos por perto. Drones parados são alvos fáceis.",
    fireInfo2:
      "Para eliminar grupos, solte bombas em movimento — não fique pairando sobre eles.",
    techTitle: "Veículos",
    techInfo:
      "O jogo inclui veículos blindados e não-blindados, com diferentes tripulações e armamentos.",
    techInfo2:
      "No minimapa: rosa = não-blindado, vermelho = blindado, vermelho escuro = pode atirar no drone.",
    techInfo3:
      "Use bombas explosivas contra veículos leves e carga oca contra blindados. A eficácia depende da blindagem e da penetração.",
    techInfo4:
      "Pratique destruir veículos — a missão terminará automaticamente.",
    missionCompleteTitle: "Missão Concluída",
    missionCompleteInfo: "Você concluiu com sucesso a missão de treinamento.",
  },
  tr: {
    hello: "Hoş geldin",
    next: "İleri",
    trainingInfo:
      "Bu bir eğitim görevdir. Drone kontrolü ve yetenekleri hakkında temel bilgileri burada öğrenebilirsin.",
    trainingInfo2:
      "Savaş alanı üzerinde uçan bir drone'u kontrol ediyorsun. Drone'un kendisi görünmez — yalnızca nişangah görünür. Amacın, çeşitli bomba türleri ve drone'larla düşmanları ve araçları yok etmektir.",
    controlsInfo: "Drone kontrol düğmeleri ekranın alt kısmında yer alır.",
    controlsList:
      "<strong>1 — Joystick</strong> — drone hareketini kontrol eder (yukarı, aşağı, sola, sağa)",
    controlsList2: "<strong>2 — Bomba Bırak</strong> — aktif bombayı bırakır",
    controlsList3:
      "<strong>3 — Bomba Değiştir</strong> — drone'a takılı bomba türleri arasında geçiş yapar",
    controlsInfo2:
      "Hareket etmeyi ve bomba bırakmayı dene. Not: Drone hareketsizse, bombalar dikey olarak düşer. Hareket halindeyken, hareket yönüne göre bir yörüngede düşer.",
    minimapTitle: "Mini Harita",
    minimapInfo: "Mini harita ekranın sol üst köşesindedir:",
    minimapPlayerMarker: "<strong>Mavi işaret</strong> — oyuncunun drone'u",
    minimapEnemyMarker: "<strong>Kırmızı işaretler</strong> — düşmanlar",
    minimapVisibleArea: "<strong>Gri dikdörtgen</strong> — görünür alan",
    minimapVictoryProgress: "<strong>Yeşil çubuk</strong> — zafer ilerlemesi",
    minimapDefeatProgress:
      "<strong>Kırmızı çubuk</strong> — yenilgi ilerlemesi",
    scrollTitle: "İrtifa",
    scrollInfo:
      "Mini haritanın altındaki kaydırıcı, drone'un irtifasını artırıp azaltmak için kullanılır.",
    scrollInfo2:
      "İrtifayı değiştir ve bunun mini haritaya nasıl yansıdığını gör. Drone nişangahında hız, irtifa ve bomba düşüş süresi gösterilir.",
    dronesTitle: "Dronlar",
    dronesInfo:
      "Drone simgeleri ekranın sağ üst köşesindedir. Aktif drone daha parlak görünür ve yanında iki çubuk bulunur:",
    droneHealth: "<strong>Yeşil çubuk</strong> — drone'un dayanıklılığı",
    droneVisibility:
      "<strong>Kırmızı çubuk</strong> — görünürlük: düşmanların fark etme ve ateş etme olasılığı",
    dronesInfo2:
      "Drone simgesinin altında mevcut bomba sayısı görünür. Drone'a dokunduğunda o aktif olur — önceki drone mühimmat yenilemeye gider.",
    dronesInfo3: "Drone değiştirmeyi ve bomba bırakmayı dene.",
    enemiesTitle: "Düşmanlar",
    enemiesInfo:
      "Düşman birimleri belirli bir noktaya ulaşmaya çalışır. Görevin, onları bu noktaya varmadan önce yok etmektir.",
    enemiesInfo2: "Eğer düşman drone'u fark ederse, ateş açar.",
    enemiesInfo3:
      "Makineli tüfekçiler (beyaz şeritli) daha isabetli ve uzun menzilden ateş eder.",
    bombsTitle: "Bombalar",
    bombsInfo:
      "Oyunda birçok bomba ve mayın türü mevcuttur. Başlangıçta üç tanesi kullanılabilir:",
    bombFragmentation:
      "<strong>Parçalanan (kırmızı)</strong> — 1 m patlama yarıçapı, 7 m şarapnel etkisi. Sürünerek ilerleyen düşmanları etkilemez. Patlama merkezine yakın olanlar daha çok zarar görür. Kalabalık gruplara karşı etkilidir.",
    bombHighExplosive:
      "<strong>Yüksek Patlayıcılı (mavi)</strong> — 2,5 m patlama yarıçapı, şarapnel yok. Hafif zırhlı araçlar ve sürünen düşmanlara karşı etkilidir.",
    bombKumulation:
      "<strong>Şekillendirilmiş (kahverengi)</strong> — zırh delici. Zırhlı araçlara karşı etkilidir. Piyadeye sadece doğrudan isabetle zarar verir.",
    bombsInfo4: "Düşmanlara bomba bırakmayı dene.",
    fireTitle: "Drone'a Ateş",
    fireInfo:
      "Drone'un vurulma ihtimali; boyutuna, hızına ve çevresindeki düşman sayısına bağlıdır. Hareketsiz drone'lar kolay hedef olur.",
    fireInfo2:
      "Bir grup düşmanı yok etmek için, durmadan hızla ilerlerken bomba bırakmak daha etkilidir.",
    techTitle: "Araçlar",
    techInfo:
      "Oyunda zırhlı ve zırhsız araçlar bulunur. Hepsinin mürettebatı ve silah sistemleri farklıdır.",
    techInfo2:
      "Mini haritada: zırhsız = pembe, zırhlı = kırmızı, drone'a ateş edebilen = koyu kırmızı.",
    techInfo3:
      "Zırhsız araçlara karşı yüksek patlayıcılı, zırhlılara karşı şekillendirilmiş bomba kullan. Etki, zırh seviyesi ve delme gücüne bağlıdır.",
    techInfo4:
      "Araçları yok etmeyi dene — görev otomatik olarak tamamlanacaktır.",
    missionCompleteTitle: "Görev Tamamlandı",
    missionCompleteInfo: "Eğitim görevini başarıyla tamamladın.",
  },
  it: {
    hello: "Benvenuto",
    next: "Avanti",
    trainingInfo:
      "Questa è una missione di addestramento. Qui puoi imparare le basi del controllo dei droni e le loro capacità.",
    trainingInfo2:
      "Controlli un drone che vola sopra il campo di battaglia. Il drone non è visibile — solo il suo mirino. Il tuo obiettivo è distruggere nemici e veicoli usando vari tipi di bombe e droni.",
    controlsInfo:
      "Guarda nella parte inferiore dello schermo per vedere i pulsanti di controllo del drone.",
    controlsList:
      "<strong>1 — Joystick</strong> — controlla il movimento del drone (su, giù, sinistra, destra)",
    controlsList2:
      "<strong>2 — Rilascia bomba</strong> — sgancia la bomba attiva",
    controlsList3:
      "<strong>3 — Cambia bomba</strong> — cambia tra i tipi di bombe equipaggiati sul drone",
    controlsInfo2:
      "Prova a muoverti e sganciare bombe. Nota: se il drone è fermo, le bombe cadono in verticale. Se è in movimento, seguono la sua traiettoria.",
    minimapTitle: "Minimappa",
    minimapInfo:
      "La minimappa si trova nell'angolo in alto a sinistra dello schermo:",
    minimapPlayerMarker: "<strong>Indicatore blu</strong> — il tuo drone",
    minimapEnemyMarker: "<strong>Indicatori rossi</strong> — nemici",
    minimapVisibleArea:
      "<strong>Rettangolo grigio</strong> — area visibile attuale",
    minimapVictoryProgress:
      "<strong>Barra verde</strong> — progresso verso la vittoria",
    minimapDefeatProgress:
      "<strong>Barra rossa</strong> — progresso verso la sconfitta",
    scrollTitle: "Altitudine",
    scrollInfo: `La barra sotto la minimappa serve per aumentare o diminuire l'altitudine del drone.`,
    scrollInfo2: `Prova a cambiare l'altitudine e osserva come viene mostrata sulla minimappa. Nel mirino del drone sono visualizzati velocità, altitudine e tempo di caduta della bomba.`,
    dronesTitle: "Droni",
    dronesInfo:
      "Le icone dei droni si trovano nell'angolo in alto a destra. Il drone attivo è evidenziato e ha due barre accanto:",
    droneHealth: "<strong>Barra verde</strong> — resistenza del drone",
    droneVisibility:
      "<strong>Barra rossa</strong> — visibilità: probabilità che i nemici lo individuino e aprano il fuoco",
    dronesInfo2:
      "Sotto l'icona del drone è mostrato il numero di bombe disponibili. Tocca un drone per attivarlo — quello precedente andrà a ricaricare.",
    dronesInfo3: "Prova a cambiare drone e sganciare bombe.",
    enemiesTitle: "Nemici",
    enemiesInfo:
      "Le unità nemiche cercano di raggiungere un punto obiettivo. Il tuo compito è distruggerle prima che ci arrivino.",
    enemiesInfo2: "Se un nemico avvista il tuo drone, aprirà il fuoco.",
    enemiesInfo3:
      "I mitraglieri (con strisce bianche) sparano in modo più preciso e da distanze maggiori.",
    bombsTitle: "Bombe",
    bombsInfo:
      "Nel gioco ci sono molti tipi di bombe e mine. Inizialmente sono disponibili tre:",
    bombFragmentation:
      "<strong>Frammentazione (rossa)</strong> — raggio esplosivo 1 m, frammenti fino a 7 m. Non colpisce i nemici che strisciano. Più vicino all'esplosione = più danno. Efficace contro gruppi di nemici.",
    bombHighExplosive:
      "<strong>Esplosivo ad alto potenziale (blu)</strong> — raggio 2,5 m, senza frammenti. Efficace contro nemici striscianti e veicoli leggeri.",
    bombKumulation:
      "<strong>Carica cava (marrone)</strong> — perfora le corazze. Efficace contro veicoli blindati. Colpisce la fanteria solo in caso di impatto diretto.",
    bombsInfo4: "Esercitati a sganciare bombe sui nemici.",
    fireTitle: "Fuoco contro il drone",
    fireInfo:
      "La probabilità che il drone venga colpito dipende da dimensione, velocità e numero di nemici vicini. I droni fermi sono bersagli facili.",
    fireInfo2:
      "Per eliminare gruppi di nemici, sgancia la bomba mentre sei in movimento — non restare sospeso sopra di loro.",
    techTitle: "Veicoli",
    techInfo:
      "Nel gioco ci sono veicoli blindati e non blindati. Ogni veicolo ha un equipaggio e un diverso armamento.",
    techInfo2:
      "Sulla minimappa: veicoli non blindati = rosa, blindati = rosso, in grado di sparare ai droni = rosso scuro.",
    techInfo3:
      "Usa bombe ad alto potenziale contro i veicoli non blindati e cariche cave contro quelli blindati. L'efficacia dipende dal livello di corazza e dalla potenza di penetrazione.",
    techInfo4:
      "Esercitati a distruggere i veicoli — la missione si concluderà automaticamente.",
    missionCompleteTitle: "Missione completata",
    missionCompleteInfo:
      "Hai completato con successo la missione di addestramento.",
  },
  pl: {
    hello: "Witaj",
    next: "Dalej",
    trainingInfo:
      "To misja treningowa, w której poznasz podstawy sterowania dronem i jego możliwości.",
    trainingInfo2:
      "Sterujesz dronem latającym nad polem bitwy. Dron nie jest widoczny — tylko jego celownik. Twoim celem jest zniszczenie wrogów i pojazdów za pomocą różnych typów bomb i dronów.",
    controlsInfo:
      "Spójrz na dolną część ekranu, aby zobaczyć przyciski sterowania dronem.",
    controlsList:
      "<strong>1 — Joystick</strong> — steruje ruchem drona (góra, dół, lewo, prawo)",
    controlsList2: "<strong>2 — Zrzuć bombę</strong> — zrzuca aktywną bombę",
    controlsList3:
      "<strong>3 — Zmień bombę</strong> — przełącza między typami bomb zamontowanych na dronie",
    controlsInfo2:
      "Spróbuj się poruszać i zrzucać bomby. Uwaga: gdy dron stoi w miejscu, bomby spadają pionowo. Gdy się porusza, lecą po jego trajektorii.",
    minimapTitle: "Minimapa",
    minimapInfo: "Minimapa znajduje się w lewym górnym rogu ekranu:",
    minimapPlayerMarker: "<strong>Niebieski znacznik</strong> — twój dron",
    minimapEnemyMarker: "<strong>Czerwone znaczniki</strong> — wrogowie",
    minimapVisibleArea:
      "<strong>Szary prostokąt</strong> — aktualny widoczny obszar",
    minimapVictoryProgress:
      "<strong>Zielony pasek</strong> — postęp do zwycięstwa",
    minimapDefeatProgress:
      "<strong>Czerwony pasek</strong> — postęp do porażki",
    scrollTitle: "Wysokość",
    scrollInfo:
      "Pasek pod minimapą służy do zwiększania lub zmniejszania wysokości drona.",
    scrollInfo2:
      "Spróbuj zmienić wysokość i zobacz, jak to wpływa na minimapę. W celowniku drona wyświetlane są prędkość, wysokość i czas spadania bomby.",
    dronesTitle: "Drony",
    dronesInfo:
      "Ikony dronów znajdują się w prawym górnym rogu. Aktywny dron jest podświetlony i ma obok dwa paski:",
    droneHealth: "<strong>Zielony pasek</strong> — wytrzymałość drona",
    droneVisibility:
      "<strong>Czerwony pasek</strong> — wykrywalność: szansa, że wróg go zauważy i otworzy ogień",
    dronesInfo2:
      "Pod ikoną drona pokazana jest liczba dostępnych bomb. Naciśnij drona, aby go aktywować — poprzedni poleci na przeładowanie.",
    dronesInfo3: "Spróbuj zmieniać drony i zrzucać bomby.",
    enemiesTitle: "Wrogowie",
    enemiesInfo:
      "Wrogowie próbują dotrzeć do wyznaczonego punktu. Twoim zadaniem jest ich zniszczyć, zanim to zrobią.",
    enemiesInfo2: "Jeśli wróg zauważy drona, zacznie strzelać.",
    enemiesInfo3:
      "Karabinierzy (z białymi paskami) strzelają celniej i z większej odległości.",
    bombsTitle: "Bomby",
    bombsInfo:
      "W grze dostępnych jest wiele typów bomb i min. Początkowo dostępne są trzy:",
    bombFragmentation:
      "<strong>Odłamkowa (czerwona)</strong> — promień wybuchu 1 m, rozrzut odłamków 7 m. Nie działa na pełzających wrogów. Im bliżej epicentrum — tym większe obrażenia. Skuteczna przeciwko grupom wrogów.",
    bombHighExplosive:
      "<strong>Wybuchowa (niebieska)</strong> — promień wybuchu 2,5 m. Bez odłamków. Skuteczna przeciwko pełzającym wrogom i lekkim pojazdom.",
    bombKumulation:
      "<strong>Kumulacyjna (brązowa)</strong> — przebija pancerz. Skuteczna przeciwko pojazdom opancerzonym. Piechotę rani tylko przy bezpośrednim trafieniu.",
    bombsInfo4: "Poćwicz zrzucanie bomb na wrogów.",
    fireTitle: "Ostrzał drona",
    fireInfo:
      "Szansa trafienia drona zależy od jego rozmiaru, prędkości i liczby wrogów w pobliżu. Nieruchomy dron to łatwy cel.",
    fireInfo2:
      "Aby zniszczyć grupę wrogów, zrzucaj bombę w locie — nie zawisaj nad nimi.",
    techTitle: "Pojazdy",
    techInfo:
      "W grze są pojazdy opancerzone i nieopancerzone. Każdy z nich ma załogę i inne uzbrojenie.",
    techInfo2:
      "Na minimapie: nieopancerzone = różowe, opancerzone = czerwone, mogące strzelać do dronów = ciemnoczerwone.",
    techInfo3:
      "Przeciwko nieopancerzonym używaj bomb wybuchowych, przeciwko opancerzonym — kumulacyjnych. Skuteczność zależy od pancerza i siły przebicia.",
    techInfo4:
      "Poćwicz niszczenie pojazdów — misja zakończy się automatycznie.",
    missionCompleteTitle: "Misja zakończona",
    missionCompleteInfo: "Ukończyłeś misję treningową z powodzeniem.",
  },
};

let currentLang = localStorage.getItem("lang") || "en";

function t(key) {
  return (languages[currentLang] && languages[currentLang][key]) || key;
}
document.querySelectorAll(".modal__button").forEach((button) => {
  button.textContent = t("next");
});
document.getElementById("hello").innerHTML = t("hello");
document.getElementById("trainingInfo").innerHTML = t("trainingInfo");
document.getElementById("trainingInfo2").innerHTML = t("trainingInfo2");
document.getElementById("controlsInfo").innerHTML = t("controlsInfo");
document.getElementById("controlsList").innerHTML = t("controlsList");
document.getElementById("controlsList2").innerHTML = t("controlsList2");
document.getElementById("controlsList3").innerHTML = t("controlsList3");
document.getElementById("controlsInfo2").innerHTML = t("controlsInfo2");
document.getElementById("minimapTitle").innerHTML = t("minimapTitle");
document.getElementById("minimapInfo").innerHTML = t("minimapInfo");
document.getElementById("minimapPlayerMarker").innerHTML = t(
  "minimapPlayerMarker"
);
document.getElementById("minimapEnemyMarker").innerHTML =
  t("minimapEnemyMarker");
document.getElementById("minimapVisibleArea").innerHTML =
  t("minimapVisibleArea");
document.getElementById("minimapVictoryProgress").innerHTML = t(
  "minimapVictoryProgress"
);
document.getElementById("minimapDefeatProgress").innerHTML = t(
  "minimapDefeatProgress"
);
document.getElementById("scrollTitle").innerHTML = t("scrollTitle");
document.getElementById("scrollInfo").innerHTML = t("scrollInfo");
document.getElementById("scrollInfo2").innerHTML = t("scrollInfo2");
document.getElementById("dronesTitle").innerHTML = t("dronesTitle");
document.getElementById("dronesInfo").innerHTML = t("dronesInfo");
document.getElementById("droneHealth").innerHTML = t("droneHealth");
document.getElementById("droneVisibility").innerHTML = t("droneVisibility");
document.getElementById("dronesInfo2").innerHTML = t("dronesInfo2");
document.getElementById("dronesInfo3").innerHTML = t("dronesInfo3");
document.getElementById("enemiesTitle").innerHTML = t("enemiesTitle");
document.getElementById("enemiesInfo").innerHTML = t("enemiesInfo");
document.getElementById("enemiesInfo2").innerHTML = t("enemiesInfo2");
document.getElementById("enemiesInfo3").innerHTML = t("enemiesInfo3");
document.getElementById("bombsTitle").innerHTML = t("bombsTitle");
document.getElementById("bombsInfo").innerHTML = t("bombsInfo");
document.getElementById("bombFragmentation").innerHTML = t("bombFragmentation");
document.getElementById("bombHighExplosive").innerHTML = t("bombHighExplosive");
document.getElementById("bombKumulation").innerHTML = t("bombKumulation");
document.getElementById("bombsInfo4").innerHTML = t("bombsInfo4");
document.getElementById("fireTitle").innerHTML = t("fireTitle");
document.getElementById("fireInfo").innerHTML = t("fireInfo");
document.getElementById("fireInfo2").innerHTML = t("fireInfo2");
document.getElementById("techTitle").innerHTML = t("techTitle");
document.getElementById("techInfo").innerHTML = t("techInfo");
document.getElementById("techInfo2").innerHTML = t("techInfo2");
document.getElementById("techInfo3").innerHTML = t("techInfo3");
document.getElementById("techInfo4").innerHTML = t("techInfo4");
document.getElementById("missionCompleteTitle").innerHTML = t(
  "missionCompleteTitle"
);
document.getElementById("missionCompleteInfo").innerHTML = t(
  "missionCompleteInfo"
);
