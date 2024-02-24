const input = require('sync-input');
const COFFEE_TYPES = {
    1: {
        name: 'Espresso',
        water: 250,
        milk: 0,
        beans: 16,
        money: 4,
        cups: 1,
    },
    2: {
        name: 'Latte',
        water: 350,
        milk: 75,
        beans: 20,
        money: 7,
        cups: 1,
    },
    3: {
        name: 'Cappuccino',
        water: 200,
        milk: 100,
        beans: 12,
        money: 6,
        cups: 1,
    },
    4: {
        name: 'Americano',
        water: 150,
        milk: 0,
        beans: 18,
        money: 5,
        cups: 1,
    },
};

let machineState = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550,
}

function showMachineState() {
    console.log(`The coffee machine has:
${machineState.water} ml of water
${machineState.milk} ml of milk
${machineState.beans} g of coffee beans
${machineState.cups} disposable cups
$${machineState.money} of money`);
}

function checkAvailability(coffeeType) {
    if (machineState.water < coffeeType.water) {
        console.log('Sorry, not enough water!');
        return false;
    } else if (machineState.milk < coffeeType.milk) {
        console.log('Sorry, not enough milk!');
        return false;
    } else if (machineState.beans < coffeeType.beans) {
        console.log('Sorry, not enough coffee beans!');
        return false;
    } else if (machineState.cups < coffeeType.cups) {
        console.log('Sorry, not enough coffee cups!');
        return false;
    } else {
        console.log('I have enough resources, making you a coffee!');
        return true;
    }
}

function makeCoffee(coffeeType, typeOfCoffee) {
    if (checkAvailability(coffeeType)) {
        machineState.water -= coffeeType.water;
        machineState.milk -= coffeeType.milk;
        machineState.beans -= coffeeType.beans;
        machineState.money += coffeeType.money;
        machineState.cups -= coffeeType.cups;

        // Check if the coffee type is special before printing the special message
        if (typeOfCoffee === 'random') {
            console.log(`${coffeeType.name} is ready! Your special price is ${coffeeType.money}!`);
        } else {
            console.log(`${coffeeType.name} is ready!`);
        }
    }
}

function buyCoffee() {
    const typeOfCoffee = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - americano, random - try random coffee with special price, back - to main menu:');
    const coffeeType = COFFEE_TYPES[typeOfCoffee];

    if (typeOfCoffee === 'back') {
        return;
    }
    if (typeOfCoffee === 'random') {
        const specialOffer = getSpecialOffer();
        makeCoffee(specialOffer, typeOfCoffee);
    } else if (coffeeType) {
        makeCoffee(coffeeType, typeOfCoffee);
    } else {
        console.log('Invalid coffee type. Please choose 1, 2, 3, special, or back.');
    }
}



function getSpecialOffer() {
    const randomCoffeeIndex = Math.floor(Math.random() * Object.values(COFFEE_TYPES).length);
    const randomCoffee = Object.values(COFFEE_TYPES)[randomCoffeeIndex];

    const updatedCoffee = { ...randomCoffee, money: randomCoffee.money - 2 };
    return updatedCoffee;
}

function fillTheMachine() {
    machineState.water += Number(input('Write how many ml of water you want to add: '));
    machineState.milk += Number(input('Write how many ml of milk you want to add: '));
    machineState.beans += Number(input('Write how many grams of coffee beans you want to add: '));
    machineState.cups += Number(input('Write how many disposable cups you want to add: '));
}

function takeAction() {
    console.log(`I gave you $${machineState.money}`);
    machineState.money = 0;
}

while (true) {
    const choice = input('Write action (buy, fill, take, remaining, exit):');

    switch (choice) {
        case 'buy':
            buyCoffee();
            break;
        case 'fill':
            fillTheMachine();
            break;
        case 'take':
            takeAction();
            break;
        case 'remaining':
            showMachineState();
            break;
        case 'exit':
            process.exit();
        default:
            console.log('Invalid action. Please choose buy, fill, take, remaining, or exit.');
    }

}
