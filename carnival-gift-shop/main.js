
const greeting = "WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!"

function Item(name, price, id) {
    this.name = name;
    this.price = price;
    this.id = id;
}

const giftList = [new Item("Teddy Bear", 10, 1),
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


function printGreetingMessage() {
    console.log(greeting);
    console.log("Here's the list of gifts:\n");
}

function printGiftList() {
    giftList.forEach(function (value) {
        console.log(`${value.id}- ${value.name}, Cost: ${value.price} tickets`);
    })
}

printGreetingMessage();
printGiftList();



