const input = require("sync-input");
const currencies = {
    USD: 1,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75,
};
const currenciesNames = Object.keys(currencies);

let convertTo;
let convertFrom;
let amount;

function printGreetingMessage(){
    console.log("Welcome to Currency Converter!");
    for (const currency in currencies) {
        console.log(`1 USD equals ${currencies[currency]} ${currency}`);
    }
}

function checkCurrencyFrom() {
    if (!currenciesNames.includes(convertFrom)) {
        console.log("Unknown currency");
        return false;
    }
    return true;
}
function checkCurrencyTo(){
    if (!currenciesNames.includes(convertTo)){
        console.log("Unknown currency");
        return false;
    }
    return true;
}

function checkConvertedAmount(){
    if (amount < 1){
        console.log("The amount cannot be less than 1");
        return false;
    }
    if (isNaN(amount)){
        console.log("The amount has to be a number");
        return false;
    }
    return true;
}

function collectCurrencyFrom(){
    console.log("What do you want to convert?");
    convertFrom = input("From: ").toUpperCase();

}
function collectCurrencyTo() {
    convertTo = input("To:").toUpperCase();
}
function collectAmount(){
    amount = Number(input("Amount:"));
}



function countAndPrintResult() {
    let fromCurrencyIndex = currenciesNames.indexOf(convertFrom);
    let fromCurrency = currenciesNames[fromCurrencyIndex];
    let neededCurrencyIndex = currenciesNames.indexOf(convertTo);
    let neededCurrency = currenciesNames[neededCurrencyIndex];
    let result = (amount / currencies[fromCurrency]) * currencies[neededCurrency];
    console.log("Result: " + amount + " " + fromCurrency + " equals " + result.toFixed(4) + " " + neededCurrency)
}
// function checkingInput(menuChoice){
//     if (menuChoice < 1 || menuChoice > 2 || menuChoice == NaN){
//         console.log()
//     }
// }

function main() {
    printGreetingMessage();
    let menuChoice;
    do{
        menuChoice = Number(input("What do you want to do?\n1-Convert currencies 2-Exit program\n"));
        switch (menuChoice) {
            case 1:
                collectCurrencyFrom();
                if(checkCurrencyFrom()){
                    collectCurrencyTo();
                    if(checkCurrencyTo()){
                        collectAmount();
                        if(checkConvertedAmount()){
                            countAndPrintResult();
                        }
                    }
                }
                break
            case 2:
                console.log("Have a nice day!\n")
                return
            default:
                console.log("Unknown input");
        }

    }while (menuChoice !== 2);

}

main();
