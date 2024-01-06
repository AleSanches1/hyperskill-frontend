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

function reduceAttempts() {
    --userAttempts;
}

function isWordGuessed() {
    return collectString() === currentWordLetters.join("");
}

// проверки и вывод сообщений

function checkAmountOfLetters(userInput) {
    let amount = userInput.length === 1;
    if (!amount) {
        console.log("Please, input a single letter.");
    }
    return amount;
}

function checkInputRegister(userInput) {
    let regex = /[a-z]/;
    let checkingRegister = regex.test(userInput);
    if (!checkingRegister) {
        console.log("Please, enter a lowercase letter from the English alphabet.")
    }
    return checkingRegister;
}

function isAlreadyExist(userInput) {
    if (guessedWordLetters.indexOf(userInput) !== -1) {
        console.log("You've already guessed this letter.");
    }
}

function showMessageNotAppear(userInput) {
    let messageCondition = currentWordLetters.includes(userInput);
    if (!messageCondition) {
        console.log("That letter doesn't appear in the word.");
        reduceAttempts();
    }
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
        const isSingleLetter = checkAmountOfLetters(userInput);
        const isLowerCaseLetter = checkInputRegister(userInput);

        if (isSingleLetter && isLowerCaseLetter) {
            showMessageNotAppear(userInput);
        }

        isAlreadyExist(userInput);
        collectGuessedLetters(userInput);
    }
    while (userAttempts > 0 && !isWordGuessed());

    if (userAttempts === 0) {
        console.log("You lost!");
    }
    if (isWordGuessed()) {
        console.log("You guessed the word " + collectString() + "!");
        console.log("You survived!")
    }
}

startGameSession();
