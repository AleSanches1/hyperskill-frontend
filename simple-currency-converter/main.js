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
let amount;

function printGreetingMessage(){
    console.log("Welcome to Currency Converter!");
    for (const currency in currencies) {
        console.log(`1 USD equals ${currencies[currency]} ${currency}`);
    }
    console.log("I can convert USD to these currencies: JPY, EUR, RUB, USD, GBP");
}

function checkCurrency() {
    if (!currenciesNames.includes(convertTo)) {
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

function collectCurrency(){
    console.log("Type the currency you wish to convert: USD");
    convertTo = (input("To:").toUpperCase());

}
function collectAmount(){
    amount = Number(input("Amount:"));
}



function countAndPrintResult() {
    let currentCurrencyIndex = currenciesNames.indexOf(convertTo);
    let currentCurrency = currenciesNames[currentCurrencyIndex];
    let result =  currencies.USD * amount * currencies[currentCurrency];
    console.log("Result: " + amount + " USD equals " + result.toFixed(4) + " " + currentCurrency)
}
function collectUserdata() {
    collectCurrency();
    if(checkCurrency()){
        collectAmount();
        if(checkConvertedAmount()){
            countAndPrintResult();
        }
    }
}

printGreetingMessage();
collectUserdata();
