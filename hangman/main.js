// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

// Независимые от текущей игры
let listOfWords = ["python", "java", "swift", "javascript"];

// Текущая игра:
let currentWordLetters;
let guessedWordLetters;
let userAttempts = 8;

function prepareLetterArray() {
    let randomize = () => Math.floor(Math.random() * listOfWords.length);
    let randomWord = listOfWords[randomize()];
    currentWordLetters = randomWord.split("");
}

function makeGuessingLettersArray() {
    guessedWordLetters = new Array(currentWordLetters.length);
}

function collectGuessedLetters(userInput) {
    let guessedIndices = [];

    for (let i = 0; i < currentWordLetters.length; i++) {
        if (currentWordLetters[i] === userInput) {
            guessedIndices.push(i);
        }
    }
    guessedIndices.forEach(index => {
        guessedWordLetters.splice(index, 1, userInput);
    });

    return guessedWordLetters;
}


function collectString() {
    let result = '';
    for (let i = 0; i < guessedWordLetters.length; i++) {
        if (guessedWordLetters[i] === undefined) {
            result += "-";
        } else {
            result += guessedWordLetters[i];
        }
    }
    return result;
}

function isAlreadyExist(userInput) {
    if (guessedWordLetters.indexOf(userInput) !== -1) {
        console.log("No improvements.");
        reduceAttempts();
    }
}

function reduceAttempts() {
    --userAttempts;
}

function showMessage(userInput) {
    let messagingCondition = currentWordLetters.includes(userInput);
    if (!messagingCondition) {
        console.log("That letter doesn't appear in the word.");
        reduceAttempts();
    }
}

function isWordGuessed() {
    return collectString() === currentWordLetters.join("");
}

//Run
function startGameSession() {
    console.log("H A N G M A N");

    const prompt = "\nInput a letter:"
    prepareLetterArray();
    makeGuessingLettersArray();
    do {
        console.log("");
        let userInput = input(collectString() + prompt);
        isAlreadyExist(userInput);
        collectGuessedLetters(userInput);
        showMessage(userInput);
    }
    while (userAttempts > 0 && !isWordGuessed());

    if (userAttempts === 0) {
        console.log("You lost!");
    }
    if (isWordGuessed()) {
        console.log("\n" + collectString());
        console.log("You guessed the word!");
        console.log("You survived!")
    }
}

startGameSession();
