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
$${machineState.money} of money`)
}
function makeCoffee(waterNeeded, milkNeeded, beansNeeded, moneyEarned) {
    machineState.water -= waterNeeded;
    machineState.milk -= milkNeeded;
    machineState.beans -= beansNeeded;
    machineState.money += moneyEarned;
    machineState.cups -= 1;

}

function makeEspresso() {
    makeCoffee(250, 0, 16, 4);
}

function makeLatte() {
    makeCoffee(350, 75, 20, 7);
}

function makeCapuccino() {
    makeCoffee(200, 100, 12, 6);
}

function fillTheMachine() {
    machineState.water += Number(input('Write how many ml of water you want to add: '));
    machineState.milk += Number(input('Write how many ml of milk you want to add: '));
    machineState.beans += Number(input('Write how many grams of coffee beans you want to add: '));
    machineState.cups += Number(input('Write how many disposable cups you want to add: '));
}

while (true) {
    showMachineState();

    const choice = input('Write action (buy, fill, take):');
    if (choice === 'buy') {
        const typeOfCoffee = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:');
        switch (typeOfCoffee) {
            case '1':
                makeEspresso();
                break;
            case '2':
                makeLatte();
                break;
            case '3':
                makeCapuccino();
                break;
        }
    } else if (choice === 'fill') {
        fillTheMachine();
    } else if (choice === 'take') {
        console.log(`I gave you $${machineState.money}`);
        machineState.money = 0;
    }
}