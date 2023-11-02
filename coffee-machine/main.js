const input = require('sync-input');

const waterInOneCup = 200;
const milkInOneCup = 50;
const beansInOneCup = 15;

const availableWater = Number(input('Write how many ml of water the coffee machine has:'));
const availableMilk = Number(input('Write how many ml of milk the coffee machine has:'));
const availableBeans = Number(input('Write how many grams of coffee beans the coffee machine has:'));
const numberOfCups = Number(input('Write how many cups of coffee you will need:'));

// Функция для вычисления необходимого количества ингредиентов для заданного количества чашек
function calcIngredients(water, milk, beans, cups) {
    const amountOfWater = cups * waterInOneCup;
    const amountOfMilk = cups * milkInOneCup;
    const amountOfBeans = cups * beansInOneCup;

    return [amountOfWater, amountOfMilk, amountOfBeans];
}

const [neededWater, neededMilk, neededBeans] = calcIngredients(availableWater, availableMilk, availableBeans, numberOfCups);

const maxCups = Math.floor(Math.min(availableWater / waterInOneCup, availableMilk / milkInOneCup, availableBeans / beansInOneCup));
if (maxCups >= numberOfCups) {
    if (maxCups > numberOfCups) {
        console.log(`Yes, I can make that amount of coffee (and even ${maxCups - numberOfCups} more than that)`);
    } else {
        console.log("Yes, I can make that amount of coffee");
    }
} else {
    console.log(`No, I can make only ${maxCups} cups of coffee`);
}
