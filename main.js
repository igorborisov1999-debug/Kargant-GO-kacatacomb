
function GeneratePerson() {

  Kargant = generatePerson();
  document.querySelector(".person").innerHTML = updateCharacterInfo();

  document.getElementsByClassName('button')[0].style.border = 'none';
  document.getElementsByClassName('button')[1].style.display = 'flex'

};

function getAllItems(){

  return [
    ...(Kargant.inventory.weapons || []),
    ...(Kargant.inventory.tools || []),
    ...(Kargant.inventory.scrolls || [])
  ]

}

function updateCharacterInfo() {
  
  const allItems = getAllItems();

  // Начинаем с имени персонажа
  let html = `<div class="block">
      Ваше имя - <div class="hover">${Kargant.name}</div>
      <span class="hidden">
        <p>Класс: <span class="CoolRed">${Kargant.specialization}</span></p>
        <p>Здоровье: <span class="CoolRed">${Kargant.health}/${Kargant.maxHealth}</span></p>
      </span>
    </div>`;

  // Обрабатываем предметы
  if (allItems.length > 0) {
    // Первый предмет - "У вас есть"
    html += `<div class="block">
        У вас есть -
        <div class="hover">${allItems[0].Name}</div>
        <span class="hidden">
          <p>Тип: <span class="CoolRed">${allItems[0].type || 'предмет'}</span></p>
          <p>Ценность: <span class="CoolRed">${allItems[0].Value || '?'}</span></p>
          ${allItems[0].Mod ? `<p>Модификатор: <span class="CoolRed">${allItems[0].Mod}</span></p>` : ''}
        </span>
      </div>`;

    // Последующие предметы - "И"
    for (let i = 1; i < allItems.length; i++) {
      html += `<div class="block">
          И -
          <div class="hover">${allItems[i].Name}</div>
          <span class="hidden">
            <p>Тип: <span class="CoolRed">${allItems[i].type || 'предмет'}</span></p>
            <p>Ценность: <span class="CoolRed">${allItems[i].Value || '?'}</span></p>
            ${allItems[i].Mod ? `<p>Модификатор: <span class="CoolRed">${allItems[i].Mod}</span></p>` : ''}
          </span>
        </div>`;
    }

    html += `<p>А также <span class="CoolRed">${Kargant.gold}</span> монет</p>`;

  } else {
    html += `<p>У вас ничего нет, кроме <span class="CoolRed">${Kargant.gold}</span> монет</p>`;
  }

  return html;
}

function GetMap() {
  map = '';
  for (x = 0; x < 27; x++) {
    map += `<div class='DungeonMap__Column'>`;
    if (x % 2 != 0) {
      s1 = '|'; s2 = '▢';
    } else {
      s1 = '◌'; s2 = '-';
    }
    for (y = 0; y < 27; y++) {
      if (y % 2 == 0) {
        s = s1;
      } else {
        s = s2;
      }
      cellClass = "DungeonMap__cell_mist";
      if (y == 13 & x == 13) {
        s = '▣';
        cellClass = '';
      }

      map += ` <div class= "DungeonMap__cell ${cellClass}" id = '${'' + x + y}'> ${s} </div>`; //▣
    }
    map += `</div>`;
  }
  return map;
}

function openMap() {
  document.getElementById("MainMenu").style.display = "none";
  document.getElementById("GamepPlay").style.display = "flex";
  document.getElementById("DungeonMap").innerHTML = GetMap();
  updateGameUI();
  gameLogger.addLog("Вы вошли в КРИПТУ", 'player', { important: true });
}


function PathChoice() {

  lines = [];
  lines.push(document.getElementById(`${Kargant.coordinates.x}${Kargant.coordinates.y + 1}`));
  lines.push(document.getElementById(`${Kargant.coordinates.x}${Kargant.coordinates.y - 1}`));
  lines.push(document.getElementById(`${Kargant.coordinates.x + 1}${Kargant.coordinates.y}`));
  lines.push(document.getElementById(`${Kargant.coordinates.x - 1}${Kargant.coordinates.y}`));

  for (let i = 0; i < 4; i++) {
    console.log(lines[i]);
    lines[i].classList.add("DungeonMap__cell_choice");
    lines[i].addEventListener('click',
      (e) => {
        e.target.classList.toggle("DungeonMap__cell_choice");
        e.target.classList.toggle("DungeonMap__cell_mist");
      });
  }

}

function updateGameUI() {
  if (!Kargant) return;

  const GameMenuRight = document.getElementById("GameMenuRight");
  GameMenuRight.innerHTML = updateCharacterInfo();
  updateBottomMenu();
}

function showRoomActions(room) {
  currentRoom = room;
  document.getElementById('roomActions').style.display = 'block';

  if (room.cleared && !room.searched) {
    document.getElementById('searchDoorsBtn').style.display = 'block';
  } else {
    document.getElementById('searchDoorsBtn').style.display = 'none';
  }
}

function updateBottomMenu() {
  if (!Kargant) return;

  // Колонка 1: Статус
  const statusCol = document.querySelector('#GameMenuBottom .menu-column:nth-child(1)');
  statusCol.innerHTML = `
        <div>Имя - <span class="highlight">${Kargant.name}</span></div>
        <div>Класс - <span class="highlight">${Kargant.specialization}</span></div>
        <div>Здоровье - <span class="highlight">${Kargant.health}/${Kargant.maxHealth}</span></div>
        <div>Опыт - <span class="xp-progress">${Kargant.XP}/10</span></div>
    `;

  // Колонка 2: Инвентарь
  const inventoryCol = document.querySelector('#GameMenuBottom .menu-column:nth-child(2)');
  let inventoryHTML = `<div>У тебя есть <span class="highlight">${Kargant.gold}</span> монет</div>`;

  // Группируем предметы по 2 в строку
  const allItems = getAllItems();
  for (let i = 0; i < 6; i += 2) {
        inventoryHTML += `
        <div class="inventory-row">
            <div class="${allItems[i] ? 'inventory-slot' : 'empty-slot'}">
                ${allItems[i] ? `${formatItemName(allItems[i].Name)}` : 'Тут пусто'}
            </div>
            <div class="${allItems[i+1] ? 'inventory-slot' : 'empty-slot'}">
                ${allItems[i+1] ? `${formatItemName(allItems[i+1].Name)}` : 'Тут пусто'}
            </div>
        </div>`;
    }
  inventoryCol.innerHTML = inventoryHTML;

  // Колонка 3: Травы
  const herbsCol = document.querySelector('#GameMenuBottom .menu-column:nth-child(3)');
  let herbsHTML = '<div class="herbs-list">Сумка с травами:</div>';
  const herbs = Kargant.inventory.herbs || [];

  for (let i = 0; i < 3; i++) {
    herbsHTML += herbs[i]
      ? `<div>${herbs[i].Name}</div>`
      : `<div class="empty-slot">Тут пусто</div>`;
  }
  herbsCol.innerHTML = herbsHTML;

  // Обработчики событий
  setupBottomMenuInteractions();
}

function setupBottomMenuInteractions() {
  // Клик по опыту
  document.querySelector('.xp-progress')?.addEventListener('click', function () {
    // if (Kargant.XP >= 10) levelUp();
  });

  // Клик по сумке с травами
  document.querySelector('.herbs-list')?.addEventListener('click', function () {
    // openAlchemyMenu();
  })
}

function formatItemName(name) {
    return name.length > 15 
        ? `<span class="highlight long-name">${name}</span>`
        : `<span class="highlight">${name}</span>`;
}
