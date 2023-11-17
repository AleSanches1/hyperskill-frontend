const input = require('sync-input');

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

function checkAvailability(waterNeeded, milkNeeded, beansNeeded, cupsNeeded) {
    if (machineState.water < waterNeeded) {
        console.log('Sorry, not enough water!');
        return false;
    } else if (machineState.milk < milkNeeded) {
        console.log('Sorry, not enough milk!');
        return false;
    } else if (machineState.beans < beansNeeded) {
        console.log('Sorry, not enough coffee beans!');
        return false;
    } else if (machineState.cups < cupsNeeded) {
        console.log('Sorry, not enough coffee cups!');
        return false;
    } else {
        console.log('I have enough resources, making you a coffee!');
        return true;
    }
}

function makeCoffee(waterNeeded, milkNeeded, beansNeeded, moneyEarned, cupsNeeded) {
    if (checkAvailability(waterNeeded, milkNeeded, beansNeeded, cupsNeeded)){
        machineState.water -= waterNeeded;
        machineState.milk -= milkNeeded;
        machineState.beans -= beansNeeded;
        machineState.money += moneyEarned;
        machineState.cups -= 1;
        console.log('Coffee is ready!');
    }
}

function makeEspresso() {
    makeCoffee(250, 0, 16, 4, 1);
}

function makeLatte() {
    makeCoffee(350, 75, 20, 7, 1);
}

function makeCappuccino() {
    makeCoffee(200, 100, 12, 6, 1);
}

function fillTheMachine() {
    machineState.water += Number(input('Write how many ml of water you want to add: '));
    machineState.milk += Number(input('Write how many ml of milk you want to add: '));
    machineState.beans += Number(input('Write how many grams of coffee beans you want to add: '));
    machineState.cups += Number(input('Write how many disposable cups you want to add: '));
}

while (true) {
    const choice = input('Write action (buy, fill, take, remaining, exit):');

    if (choice === 'buy') {
        const typeOfCoffee = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:');

        if (typeOfCoffee === 'back') {
            continue;
        }

        switch (typeOfCoffee) {
            case '1':
                makeEspresso();
                break;
            case '2':
                makeLatte();
                break;
            case '3':
                makeCappuccino();
                break;
            default:
                console.log('Invalid coffee type. Please choose 1, 2, 3, or back.');
                break;
        }

    } else if (choice === 'fill') {
        fillTheMachine();
    } else if (choice === 'take') {
        console.log(`I gave you $${machineState.money}`);
        machineState.money = 0;
    } else if (choice === 'remaining') {
        showMachineState();
    } else if (choice === 'exit') {
        break;
    }
}
