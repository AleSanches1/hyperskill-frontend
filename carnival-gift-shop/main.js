
//preparing the shop and gifts

const input = require('sync-input');
const greeting = "WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!"

let menuChoice;
let chosenGift;
let availableTickets = 0;

function Item(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
}

let giftList = [
    new Item("Teddy Bear", 10, 1),
    new Item("Big Red Ball", 5, 2),
    new Item("Huge Bear", 50, 3),
    new Item("Candy", 8, 4),
    new Item("Stuffed Tiger", 15, 5),
    new Item("Stuffed Dragon", 30, 6),
    new Item("Skateboard", 100, 7),
    new Item("Toy Car", 25, 8),
    new Item("Basketball", 20, 9),
    new Item("Scary Mask", 75, 10),
];

let giftListInner = giftList;

let availableGifts = giftList.length;

//greeting
function printGreetingMessage() {
    console.log(greeting);
    printGiftList();
}
//gifts preparing and printing

function areGiftsAvailable() {
    return availableGifts === 0;

}
function isNumberOfGiftValid(userInput) {
    let regex = /[a-zA-z]/;
    return regex.test(userInput);
}
function isEnoughTickets(tickets, price) {
    return tickets < price;
}

function removingFromInner() {
    let indexInInner = giftListInner.findIndex(item => item.id === chosenGift);
    if (indexInInner !== -1) {
        giftListInner.splice(indexInInner, 1);
    }
}

//menu actions
function chooseMenuAction() {
    menuChoice = Number(input("\nWhat do you want to do?\n1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n "));
}
function buyingAGift() {
    let gift = giftList.find(item => item.id === chosenGift);

    if (!gift) {
        console.log("There is no gift with that number!");
        return;
    }

    let giftName = gift.name;
    let giftPrice = gift.price;

    if (!isEnoughTickets(availableTickets, giftPrice)) {
        removingFromInner();
        availableGifts--;

        console.log(`Here you go, one ${giftName}!`);
        availableTickets -= giftPrice;
        console.log("Total tickets: " + availableTickets);

        let indexInList = giftList.findIndex(item => item.id === chosenGift);
        if (indexInList !== -1) {
            giftList.splice(indexInList, 1);
        }
    } else {
        console.log("You don't have enough tickets to buy this gift.");
    }
}
function buyAGiftMenuItem() {
    chosenGift = Number(input("Enter the number of the gift you want to get:"));
    if (!isNumberOfGiftValid(chosenGift)) {
        buyingAGift();
    } else {
        console.log("Please enter a valid number!");
    }

}

function addTicketsMenuItem() {
    let ticketAmount = input("Enter the ticket amount:")
    if (ticketAmount >= 0 && ticketAmount <= 1000) {
        let newTicketAmount = availableTickets += Number(ticketAmount);
        console.log("Total tickets: " + newTicketAmount);
    } else {
        console.log("Please enter a valid number between 0 and 1000.")
    }

}

function showTicketsMenuItem() {
    console.log("Total tickets: " + availableTickets);
}

function printGiftList() {
    console.log("Here's the list of gifts:\n");
    if (areGiftsAvailable()) {
        console.log("Wow! There are no gifts to buy.");
    } else {
        giftListInner.forEach(function (value) {
            console.log(`${value.id}- ${value.name}, Cost: ${value.price} tickets`);
        });
    }
}

function doMenuAction() {
    if (menuChoice === 1 || menuChoice === 2 || menuChoice === 3 || menuChoice === 4 || menuChoice === 5) {
        switch (menuChoice) {
            case 1:
                if (areGiftsAvailable()) {
                    console.log("Wow! There are no gifts to buy.");
                } else {
                    buyAGiftMenuItem();
                }
                break;
            case 2:
                addTicketsMenuItem();
                break
            case 3:
                showTicketsMenuItem();
                break
            case 4:
                printGiftList();
                break
            case 5:
                console.log("Have a nice day!");
                return
        }
    } else {
        console.log("Please enter a valid number!");
    }
}





//using the shop

function openTheShop() {
    printGreetingMessage();
    do {
        chooseMenuAction();
        doMenuAction();
    } while (menuChoice !== 5);
}

openTheShop();
