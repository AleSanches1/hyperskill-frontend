const input = require('sync-input');

let yourName;
let bot_name = "Aleks";
let birth_year = 2023;

console.log(`Hello! My name is ${bot_name}.
I was created in ${birth_year}.
Please, remind me your name.`);

yourName = input();

console.log(`What a great name you have, ${yourName}!`);
console.log("Let me guess your age.");
console.log("Enter remainders of dividing your age by 3, 5 and 7.");

let remainder3 =input();
let remainder5 = input();
let remainder7 = input();

let your_age = (remainder3 * 70 + remainder5 * 21 + remainder7 * 15) % 105;

console.log(`Your age is ${your_age}; that's a good time to start programming!`);
