// import { buttons } from "../logic/gameLoopButtonHandlers";

setTimeout(() => {
  const languages = {
    ua: {
      winTitle: "Перемога",
      loseTitle: "Поразка",
      totalWinTitle: "Перемога",
      winMessage: "Місію виконано.",
      loseMessage:
        "Місію провалено. Щоб повернутися до брифінгу, натисніть кнопку «Назад».",
      totalWinMessage: "Переходимо до наступної місії.",
      backToMenu: "Назад",
      backToGame: "Добити ворогів",
      nextMission: "Наступна місія",
      menu: "Головне меню",
      leave: "Назад до брифінгу",
      restart: "Почати спочатку",
      back: "Повернутися до місії",
      buttons: "Налаштувати керування",
      buttonsTitle: "Налаштування керування",
      buttonsMessage: `
        <p>
          Натисніть на екрані 3 рази — на місці кожного натискання з’явиться наступний елемент управління:
        </p>
        <ul>
          <li>Джойстик</li>
          <li>Кнопка скидання бомби</li>
          <li>Кнопка перемикання</li>
        </ul>
      `,
      back1: "Назад",
      reset: "Стандартні",
      putButtons: "Налаштувати керування",
    },
    en: {
      winTitle: "Victory",
      loseTitle: "Defeat",
      totalWinTitle: "Victory",
      winMessage: "Mission accomplished.",
      loseMessage: "Mission failed. Tap 'Back' to return to the briefing.",
      totalWinMessage: "Proceeding to the next mission.",
      backToMenu: "Back",
      backToGame: "Eliminate remaining enemies",
      nextMission: "Next Mission",
      menu: "Main Menu",
      leave: "Back to Briefing",
      restart: "Restart Mission",
      back: "Return to Mission",
      buttons: "Customize Controls",
      buttonsTitle: "Control Settings",
      buttonsMessage: `
        <p>
          Tap the screen 3 times — a control element will appear at each tap:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Bomb Drop Button</li>
          <li>Bomb Switch Button</li>
        </ul>
      `,
      back1: "Back",
      reset: "Reset to Default",
      putButtons: "Customize Controls",
    },
    de: {
      winTitle: "Sieg",
      loseTitle: "Niederlage",
      totalWinTitle: "Sieg",
      winMessage: "Mission erfüllt.",
      loseMessage:
        "Mission fehlgeschlagen. Tippe auf „Zurück“, um zum Briefing zurückzukehren.",
      totalWinMessage: "Weiter zur nächsten Mission.",
      backToMenu: "Zurück",
      backToGame: "Feinde beseitigen",
      nextMission: "Nächste Mission",
      menu: "Hauptmenü",
      leave: "Zurück zum Briefing",
      restart: "Mission neu starten",
      back: "Zurück zur Mission",
      buttons: "Steuerung anpassen",
      buttonsTitle: "Steuerungseinstellungen",
      buttonsMessage: `
        <p>
          Tippe dreimal auf den Bildschirm – an jeder Stelle erscheint ein Steuerelement:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Bombenabwurf-Taste</li>
          <li>Wechseltaste für Bomben</li>
        </ul>
      `,
      back1: "Zurück",
      reset: "Standard",
      putButtons: "Steuerung anpassen",
    },
    es: {
      winTitle: "Victoria",
      loseTitle: "Derrota",
      totalWinTitle: "Victoria",
      winMessage: "Misión completada.",
      loseMessage: "Misión fallida. Pulsa «Atrás» para volver al briefing.",
      totalWinMessage: "Pasando a la siguiente misión.",
      backToMenu: "Atrás",
      backToGame: "Eliminar enemigos restantes",
      nextMission: "Siguiente misión",
      menu: "Menú principal",
      leave: "Volver al briefing",
      restart: "Reiniciar misión",
      back: "Volver a la misión",
      buttons: "Personalizar controles",
      buttonsTitle: "Configuración de controles",
      buttonsMessage: `
        <p>
          Toca la pantalla 3 veces: en cada toque aparecerá un elemento de control:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Botón de lanzamiento de bomba</li>
          <li>Botón de cambio de bomba</li>
        </ul>
      `,
      back1: "Atrás",
      reset: "Restablecer",
      putButtons: "Personalizar controles",
    },
    fr: {
      winTitle: "Victoire",
      loseTitle: "Défaite",
      totalWinTitle: "Victoire",
      winMessage: "Mission accomplie.",
      loseMessage:
        "Mission échouée. Appuie sur «Retour» pour revenir au briefing.",
      totalWinMessage: "Passage à la mission suivante.",
      backToMenu: "Retour",
      backToGame: "Éliminer les ennemis restants",
      nextMission: "Mission suivante",
      menu: "Menu principal",
      leave: "Retour au briefing",
      restart: "Recommencer la mission",
      back: "Retour à la mission",
      buttons: "Personnaliser les contrôles",
      buttonsTitle: "Paramètres des contrôles",
      buttonsMessage: `
        <p>
          Appuie 3 fois sur l’écran — un élément de contrôle apparaîtra à chaque appui :
        </p>
        <ul>
          <li>Joystick</li>
          <li>Bouton de largage de bombe</li>
          <li>Bouton de changement de bombe</li>
        </ul>
      `,
      back1: "Retour",
      reset: "Par défaut",
      putButtons: "Personnaliser les contrôles",
    },
    pt: {
      winTitle: "Vitória",
      loseTitle: "Derrota",
      totalWinTitle: "Vitória",
      winMessage: "Missão concluída.",
      loseMessage:
        'Missão falhou. Toque em "Voltar" para retornar ao briefing.',
      totalWinMessage: "Indo para a próxima missão.",
      backToMenu: "Voltar",
      backToGame: "Eliminar inimigos restantes",
      nextMission: "Próxima missão",
      menu: "Menu principal",
      leave: "Voltar ao briefing",
      restart: "Reiniciar missão",
      back: "Voltar à missão",
      buttons: "Personalizar controles",
      buttonsTitle: "Configurações de controle",
      buttonsMessage: `
        <p>
          Toque na tela 3 vezes — um elemento de controle aparecerá em cada toque:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Botão de lançar bomba</li>
          <li>Botão de trocar bomba</li>
        </ul>
      `,
      back1: "Voltar",
      reset: "Padrão",
      putButtons: "Personalizar controles",
    },
    tr: {
      winTitle: "Zafer",
      loseTitle: "Yenilgi",
      totalWinTitle: "Zafer",
      winMessage: "Görev başarıyla tamamlandı.",
      loseMessage:
        "Görev başarısız oldu. Briefinge dönmek için ‘Geri’ye dokun.",
      totalWinMessage: "Sonraki göreve geçiliyor.",
      backToMenu: "Geri",
      backToGame: "Kalan düşmanları yok et",
      nextMission: "Sonraki Görev",
      menu: "Ana Menü",
      leave: "Briefinge Dön",
      restart: "Görevi Yeniden Başlat",
      back: "Göreve Dön",
      buttons: "Kontrolleri Özelleştir",
      buttonsTitle: "Kontrol Ayarları",
      buttonsMessage: `
        <p>
          Ekrana 3 kez dokun — her dokunuşta bir kontrol öğesi belirecek:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Bomba bırakma butonu</li>
          <li>Bomba değiştirme butonu</li>
        </ul>
      `,
      back1: "Geri",
      reset: "Varsayılan",
      putButtons: "Kontrolleri Özelleştir",
    },
    it: {
      winTitle: "Vittoria",
      loseTitle: "Sconfitta",
      totalWinTitle: "Vittoria",
      winMessage: "Missione completata.",
      loseMessage:
        'Missione fallita. Tocca "Indietro" per tornare al briefing.',
      totalWinMessage: "Passaggio alla missione successiva.",
      backToMenu: "Indietro",
      backToGame: "Elimina i nemici rimasti",
      nextMission: "Missione successiva",
      menu: "Menu principale",
      leave: "Torna al briefing",
      restart: "Ricomincia la missione",
      back: "Torna alla missione",
      buttons: "Personalizza controlli",
      buttonsTitle: "Impostazioni controlli",
      buttonsMessage: `
        <p>
          Tocca lo schermo 3 volte — a ogni tocco apparirà un elemento di controllo:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Pulsante per sganciare bombe</li>
          <li>Pulsante per cambiare bomba</li>
        </ul>
      `,
      back1: "Indietro",
      reset: "Predefiniti",
      putButtons: "Personalizza controlli",
    },
    pl: {
      winTitle: "Zwycięstwo",
      loseTitle: "Porażka",
      totalWinTitle: "Zwycięstwo",
      winMessage: "Misja zakończona sukcesem.",
      loseMessage: "Misja nieudana. Naciśnij „Wstecz”, aby wrócić do odprawy.",
      totalWinMessage: "Przechodzenie do następnej misji.",
      backToMenu: "Wstecz",
      backToGame: "Zlikwiduj pozostałych wrogów",
      nextMission: "Następna misja",
      menu: "Menu główne",
      leave: "Powrót do odprawy",
      restart: "Rozpocznij misję od nowa",
      back: "Powrót do misji",
      buttons: "Dostosuj sterowanie",
      buttonsTitle: "Ustawienia sterowania",
      buttonsMessage: `
        <p>
          Dotknij ekranu 3 razy — za każdym razem pojawi się element sterowania:
        </p>
        <ul>
          <li>Joystick</li>
          <li>Przycisk zrzutu bomby</li>
          <li>Przycisk zmiany bomby</li>
        </ul>
      `,
      back1: "Wstecz",
      reset: "Domyślne",
      putButtons: "Dostosuj sterowanie",
    },
  };

  let currentLang = localStorage.getItem("lang") || "en";

  function t(key) {
    return (languages[currentLang] && languages[currentLang][key]) || key;
  }

  document.getElementById("winTitle").textContent = t("winTitle");
  document.getElementById("loseTitle").textContent = t("loseTitle");
  document.getElementById("totalWinTitle").textContent = t("totalWinTitle");
  document.getElementById("winMessage").textContent = t("winMessage");
  document.getElementById("loseMessage").textContent = t("loseMessage");
  document.getElementById("totalWinMessage").textContent = t("totalWinMessage");
  document.getElementById("backToMenu").textContent = t("backToMenu");
  document.getElementById("backToGame").textContent = t("backToGame");
  document.querySelectorAll(".nextMission").forEach((button) => {
    button.textContent = t("nextMission");
  });
  document.getElementById("menu").textContent = t("menu");
  document.getElementById("leave").textContent = t("leave");
  document.getElementById("restart").textContent = t("restart");
  document.getElementById("back").textContent = t("back");
  document.getElementById("buttons").textContent = t("buttons");
  document.getElementById("buttonsTitle").textContent = t("buttonsTitle");
  document.getElementById("buttonsMessage").innerHTML = t("buttonsMessage");
  document.getElementById("back1").textContent = t("back1");
  document.getElementById("reset").textContent = t("reset");
  document.getElementById("putButtons").textContent = t("putButtons");
}, 50);
