// write your code here
const greeting = "WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!"

let giftList = ["Teddy Bear", "Big Red Ball", "Huge Bear","Candy", "Stuffed Tiger", "Stuffed Dragon", "Skateboard", "Toy Car", "Basketball", "Scary Mask"];


function printGreetingMessage() {
    console.log(greeting);
    console.log("Here's the list of gifts:\n");
}

function printGiftList() {
    giftList.forEach(function (value) {
        console.log(value);
    })
}

printGreetingMessage();
printGiftList();


