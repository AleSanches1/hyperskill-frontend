const input = require('sync-input');
let menuChoice;

const greeting = "WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!"
let availableTickets = 0;

function Item(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
}

let giftList = [new Item("Teddy Bear", 10, 1),
    new Item("Big Red Ball", 5, 2),
    new Item("Huge Bear", 50,3 ),
    new Item("Candy", 8, 4),
    new Item("Stuffed Tiger", 15, 5),
    new Item("Stuffed Dragon", 30, 6),
    new Item("Skateboard", 100, 7),
    new Item("Toy Car", 25, 8),
    new Item("Basketball", 20, 9),
    new Item("Scary Mask", 75, 10),
];

function printGiftList() {
    console.log("Here's the list of gifts:\n");
    giftList.forEach(function (value) {
        console.log(`${value.id}- ${value.name}, Cost: ${value.price} tickets`);
    })
}


function printGreetingMessage() {
    console.log(greeting);
    printGiftList();
}

function buyAGift() {
    let choice = input("Enter the number of the gift you want to get:");
    let giftName = giftList[choice - 1].name;
    let gifPrice = giftList[choice - 1].price;
    console.log(`Here you go, one ${giftName}!`);
    availableTickets -= gifPrice;
    console.log("Total tickets: " + availableTickets);
    giftList.splice(choice - 1,1);
}

function addTickets (){
    let ticketAmount = input("Enter the ticket amount:")
    let newTicketAmount =  availableTickets += Number(ticketAmount);
    console.log("Total tickets: " + newTicketAmount);
}
function checkTickets() {
    console.log("Total tickets: " + availableTickets);
}


function chooseMenuItem(){
menuChoice = String(input("\nWhat do you want to do?\n1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n "));
if (menuChoice === "1" || menuChoice === "2" || menuChoice === "3" || menuChoice === "4" || menuChoice === "5"){
    switch (menuChoice) {
        case "1":
            buyAGift();
            break
        case "2":
            addTickets();
            break
        case "3":
            checkTickets();
            break
        case "4":
            printGiftList();
            break
        case "5":
            console.log("Have a nice day!");
            return
    }
}
else{
    console.log("Put correct number");
}
}


function openTheShop() {
    printGreetingMessage();
    do{
        chooseMenuItem();
    } while (menuChoice !== "5");
}

openTheShop();
