
let Weapons = [
    {
        Name: "Боевой молот",
        Value: 6,
        Mod: 0,
        Aim: 0,
        Who: 1
    },
    {
        Name: "Кинжал",
        Value: 4,
        Mod: 0,
        Aim: 1,
        Who: 1
    },
    {
        Name: "Меч",
        Value: 6,
        Mod: 0,
        Aim: 1,
        Who: 1
    },
    {
        Name: "Цеп",
        Value: 6,
        Mod: 1,
        Aim: 0,
        Who: 1
    }
];

let Tools = [
    {
        Name: "Броня",
        Value: 4,
        Mod: 0,
        Aim: 0,
        Who: 0
    },
    {
        Name: "Зелье",
        Value: 6,
        Mod: 0,
        Aim: 0,
        Who: 0
    },
    {
        Name: "Свиток призыва малого Демона",
        Value: 4,
        Mod: 0,
        Aim: 0,
        Who: 2
    },
    {
        Name: "Плащ-невидимка",
        Value: 4,
        Mod: 0,
        Aim: 0,
        Who: 0
    }
];

class Coordinates {
    constructor(X, Y, x, y) {

        this.X = X,
            this.Y = Y,
            this.x = x,
            this.y = y

    }

    get cellId() {
        return `${this.x}${this.y}`
    }

    set cellId(value) {
        [this.x, this.y] = value.split(",");
    }
}

class Room {
    constructor(event, description, X, Y, x, y) {
        this.event = event;
        this.description = description;
        this.coordinates = new Coordinates(X, Y, x, y)
    }

}

class Specialization{
    constructor(name, maxHealth, startGold, plusGold,startInventory) {
        
        this.name           = name,
        this.maxHealth      = maxHealth,
        this.startGold      = startGold,
        this.plusGold       = plusGold,
        this.startInventory = startInventory


    }  
}

class Person {
    constructor(specialization) {
        
        this.name           = "Каргант",
        this.health         = specialization.maxHealth,
        this.maxHealth      = specialization.maxHealth,
        this.specialization = specialization.name,
        this.gold           = specialization.startGold + getRandomInRange(0, specialization.plusGold),
        this.XP             = 0,
        this.rooms          = 0,
        this.inventory      = specialization.startInventory,
        this.coordinates    = new Coordinates(0, 0, 13, 13)
    }
}

class Tool{
    constructor(name,description,type,cost,property) {
        
        this.name           = name,
        this.type           = type,
        this.description    = description,
        this.cost           = cost,
        this.property       = property

    }
}

function generatePerson() {

  return new Person(Specializations[getRandomInRange(0, 2)])   

};

function getRandomWeapon() {
    return Weapons[getRandomInRange(0, 3)];
};

function getRandomTool() {
    return Tools[getRandomInRange(0, 3)];
};

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Specializations = [
        new Specialization(
            'Воин',
            15,
            15,
            6,
            {
                weapons:    [getRandomWeapon()],
                tools:      [getRandomTool()],
                scrolls:    [],
                herbs:      []
            }
        ),
        new Specialization(
            'Волшебница',
            10,
            20,
            10,
            {
                weapons:    [],
                tools:      [],
                scrolls:    [getRandomTool(),getRandomTool()],
                herbs:      []
            }
        ),
        new Specialization(
            'Странность',
            20,
            0,
            0,
            {
                weapons:    [getRandomWeapon()],
                tools:      [getRandomTool()],
                scrolls:    [],
                herbs:      []
            }
        ),

]


