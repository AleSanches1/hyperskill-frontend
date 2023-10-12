const input = require('sync-input');

let yourName;
let bot_name = "Aleks";
let birth_year = 2023;

console.log(`Hello! My name is ${bot_name}.
I was created in ${birth_year}.
Please, remind me your name.`);

yourName = input();

console.log(`What a great name you have, ${yourName}!`);
