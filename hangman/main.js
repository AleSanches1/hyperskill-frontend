// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

let listOfWords = ["python", "java", "swift", "javascript"];
let getRandomWord = () => Math.floor(Math.random() * listOfWords.length);
let selectedWord = listOfWords[getRandomWord()];

function hideAPartOfWord(word) {
    return word.slice(0, 3) + word.slice(3).replace(/./g, '-');
}


console.log(`H A N G M A N`);

let userInput = input(`Guess the word: ${hideAPartOfWord(selectedWord)}`);



if (userInput === selectedWord) {
    console.log("You survived!")
} else {
    console.log("You lost!")
}
