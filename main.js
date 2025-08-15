
function GeneratePerson() {

    Kargant = generatePerson();
    document.querySelector(".person").innerHTML = updateCharacterInfo();

    document.getElementsByClassName('button')[0].style.border = 'none';
    document.getElementsByClassName('button')[1].style.display = 'flex'

};

function updateCharacterInfo() {
    // Собираем все элементы инвентаря в один массив
    const allItems = [
        ...(Kargant.inventory.weapons || []),
        ...(Kargant.inventory.tools || []),
        ...(Kargant.inventory.scrolls || []),
        ...(Kargant.inventory.herbs || [])
    ];

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

            map += ` <div class= "DungeonMap__cell ${cellClass}" id = '${'' + x + ',' + y}'> ${s} </div>`; //▣
        }
        map += `</div>`;
    }
    return map;
}

function openMap() {
    document.getElementById("MainMenu").style.display = "none";
    document.getElementById("GamepPlay").style.display = "flex";
    document.getElementById("DungeonMap").innerHTML = GetMap();
    document.getElementsByClassName('button')[2].style.display = 'flex';
    updateGameUI();
}


function PathChoice() {
    lines = [];
    lines.push(document.getElementById(`${Kargant.Coordinates.x}${Kargant.Coordinates.y + 1}`));
    lines.push(document.getElementById(`${Kargant.Coordinates.x}${Kargant.Coordinates.y - 1}`));
    lines.push(document.getElementById(`${Kargant.Coordinates.x + 1}${Kargant.Coordinates.y}`));
    lines.push(document.getElementById(`${Kargant.Coordinates.x - 1}${Kargant.Coordinates.y}`));

    for (let i = 0; i < 4; i++) {
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

    const GameMenuLeft = document.getElementById("GameMenuLeft");

    GameMenuLeft.innerHTML = `
        <p>Имя: <span class="CoolRed">${Kargant.name}</span></p>
        <p>Класс: <span class="CoolRed">${Kargant.specialization}</span></p> `;

    const GameMenuRight = document.getElementById("GameMenuRight");
    GameMenuRight.innerHTML = updateCharacterInfo();

}
