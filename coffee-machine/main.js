const input = require('sync-input')

let number_of_cups = Number(input('Write how many cups of coffee you will need:'));
const water_in_one_cup = 200;
const milk_in_one_cup = 50;
const beans_in_one_cup = 15;


function calcIngredients(amount){
    let amount_of_water = amount * water_in_one_cup;
    let amount_of_milk = amount* milk_in_one_cup;
    let amount_of_beans = amount * beans_in_one_cup;
    console.log(`For ${number_of_cups} of coffee you will need:
    ${amount_of_water} ml of water
    ${amount_of_milk} ml of milk
    ${amount_of_beans} g of coffee beans`);
}

calcIngredients(Number(number_of_cups));


