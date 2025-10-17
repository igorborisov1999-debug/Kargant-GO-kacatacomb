<!DOCTYPE html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RPG Adventure</title>
  <link rel="stylesheet" href="style.css">
  <script src="Tabl.js"></script>
  <script src="main.js"></script>
</head>

<body>

  <div id="MainMenu">
    <div id="Menu">
      <h1 id="welcomeMessage">РАСХИТИТЕЛЬ КАТАКОМБ ВЫХОДИТ НА СЦЕНУ </h1>
      <button class="button" onclick="GeneratePerson()">
        сгенерировать персонажа</button>
      <div class="person"></div>
      <div class="loading"></div>
      <button class="button" onclick="openMap()">
        ВОЙТИ В КРИПТУ </button>
    </div>
  </div>


  <div id="GamepPlay">
    <div id="GamepPlayUP">
      <div id="GameMenuLeft" class="scrollable-panel">
        <div class="log-container"></div>
        <!-- Логи будут здесь -->
      </div>

      <div id="MainScreen">

          <div id="event-image" class="ascii-art">
               <!-- Картинка -->
          </div>
          <div id="event-description">
            <div id="dungeon-event">
                  <!-- Окно с описание и действиями -->
              <p id="description-text"></p>
              <div id="event-actions"></div>
            </div>
          </div>

      </div>

      <div id="GameMenuRight" class="scrollable-panel">
        <!-- Описание комнаты -->
      </div>
    </div>
    <div id="GameMenuBottom">
      <!-- Колонка 1: Статус -->
      <div class="menu-column">

      </div>

      <!-- Колонка 2: Инвентарь -->
      <div class="menu-column menu-divider">

      </div>

      <!-- Колонка 3: Травы -->
      <div class="menu-column">

      </div>
    </div>
  </div>

  <script>

    let Kargant;
    const gameLogger = new GameLogger();
    const dungeonEvents = new DungeonEvent();

    setTimeout(
      () => {
        document.getElementsByClassName('button')[0].style.display = 'flex';
      }, 2500);

    // GeneratePerson();
    // openGame();

  </script>
</body>

</html>
