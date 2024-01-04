// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

// Независимые от текущей игры
let listOfWords = ["python", "java", "swift", "javascript"];
let getRandomIndex = () => Math.floor(Math.random() * listOfWords.length);
const prompt = "\nInput a letter:"

// Текущая игра:
let currentWordLetters;
let guessedWordLetters;
let userGuessing;
let userAttempts = 8;
let guessedIndices;


function prepareLetterArray() {
    let word = listOfWords[getRandomIndex()];
    currentWordLetters = word.split("");
}

function makeGuessingLettersArray() {
    guessedWordLetters = new Array(currentWordLetters.length);
}

function collectGuessedLetters() {
    guessedIndices = [];

    for (let i = 0; i < currentWordLetters.length; i++) {
        if (currentWordLetters[i] === userGuessing) {
            guessedIndices.push(i);
        }
    }

    guessedIndices.forEach(index => {
        guessedWordLetters.splice(index, 1, userGuessing);
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

function reduceAttempts(attempt) {
    --userAttempts;
}

function showMessage() {
    let messagingCondition = currentWordLetters.includes(userGuessing);
    if (!messagingCondition) {
        console.log("That letter doesn't appear in the word.");
    }
}

//Run
function runGame() {
    console.log("H A N G M A N\n");
    prepareLetterArray();
    makeGuessingLettersArray();
    do {
        let s = collectString();
        userGuessing = input(s + prompt);
        collectGuessedLetters();
        showMessage();
        reduceAttempts(userAttempts);
    }
    while (userAttempts > 0);
    if (userAttempts === 0) {
        console.log('Thanks for playing!');
    }
}

runGame();

