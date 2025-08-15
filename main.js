
function GeneratePerson() {

    Kargant = generatePerson();
    document.querySelector(".person").innerHTML = updateCharacterInfo(Kargant);

    document.getElementsByClassName('button')[0].style.border = 'none';
    document.getElementsByClassName('button')[1].style.display = 'flex'

};

function updateCharacterInfo(character) {
    // Собираем все элементы инвентаря в один массив
    const allItems = [
        ...(character.inventory.weapons || []),
        ...(character.inventory.tools || []),
        ...(character.inventory.scrolls || []),
        ...(character.inventory.herbs || [])
    ];

    // Начинаем с имени персонажа
    let html = `<p>Ваше имя <span class="CoolRed">${character.name}</span></p>`;

    // Обрабатываем предметы
    if (allItems.length > 0) {
        // Первый предмет - "У вас есть"
        html += `<p>У вас есть <span class="CoolRed">${allItems[0].Name}</span></p>`;

        // Последующие предметы - "И"
        for (let i = 1; i < allItems.length; i++) {
            html += `<p>И <span class="CoolRed">${allItems[i].Name}</span></p>`;
        }
    }

    // Всегда добавляем золото
    html += `<p>А также <span class="CoolRed">${character.gold}</span> монет</p>`;

    return html;
}