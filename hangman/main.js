// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

// Независимые от текущей игры
let listOfWords = ["python", "java", "swift", "javascript"];
const menuItems = {PLAY: "play", RESULTS: "results", EXIT: "exit"}

// Текущая игра:
let menuItem;
let currentWordLetters;
let guessedWordLetters;
let inputLetters;
let userAttempts = 8;
let winnings = 0;
let losses = 0;


function prepareLetterArray() {
    let randomize = () => Math.floor(Math.random() * listOfWords.length);
    let randomWord = listOfWords[randomize()];
    currentWordLetters = randomWord.split("");
}

function makeGuessingLettersArray() {
    guessedWordLetters = new Array(currentWordLetters.length);
}

function makeArrayWithInputLetters() {
    inputLetters = [];
}

function collectInputLetters(userInput) {
    inputLetters.push(userInput);
    return inputLetters;
}

function collectGuessedLetters(userInput) {
    let guessedIndices = [];

    for (let i = 0; i < currentWordLetters.length; i++) {
        if (currentWordLetters[i] === userInput) {
            guessedIndices.push(i);
        }
    }

    if (guessedIndices.length > 0) {
        for (let index of guessedIndices) {
            guessedWordLetters[index] = userInput;
        }
    }

    return guessedWordLetters;
}

function collectString() {
    let result = '';
    for (let i = 0; i < guessedWordLetters.length; i++) {
        if (guessedWordLetters[i] === undefined || guessedWordLetters[i] === null) {
            result += "-";
        } else {
            result += guessedWordLetters[i];
        }
    }
    return result;
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
    if (guessedWordLetters.indexOf(userInput) !== -1 || inputLetters.slice(0, -1).includes(userInput)) {
        console.log("You've already guessed this letter.");
        return true;
    }
    return false;
}


function showMessageNotAppear(userInput) {
    let messageCondition = currentWordLetters.includes(userInput);
    if (!messageCondition && !inputLetters.includes(userInput)) {
        console.log("That letter doesn't appear in the word.");
        userAttempts -= 1;
    }
}

function chooseAction() {
    return input('\nType "play" to play the game, "results" to show the scoreboard, and "exit" to quit:');
}

function showGameResult() {
    if (userAttempts === 0) {
        console.log("You lost!");
        losses += 1;
    }
    if (isWordGuessed()) {
        console.log("You guessed the word " + collectString() + "!");
        console.log("You survived!");
        winnings += 1;
    }
}


function playTheGame() {
    const prompt = "\nInput a letter:"
    prepareLetterArray();
    makeGuessingLettersArray();
    makeArrayWithInputLetters();

    do {
        console.log("");
        let userInput = input(collectString() + prompt);
        const isSingleLetter = checkAmountOfLetters(userInput);
        const isLowerCaseLetter = checkInputRegister(userInput);

        if (isSingleLetter && isLowerCaseLetter) {
            if (isAlreadyExist(userInput)) {
                continue;
            }
            showMessageNotAppear(userInput);
            collectInputLetters(userInput);
            isAlreadyExist(userInput);
            collectGuessedLetters(userInput);
        }
    } while (userAttempts > 0 && !isWordGuessed());

    showGameResult();
}

function showResults() {
    console.log("You won: " + winnings + " times.");
    console.log("You lost: " + losses + " times.")
}

function startGameSession() {
    console.log("H A N G M A N");
    do {
        const menuItem = chooseAction();
        switch (menuItem) {
            case menuItems.PLAY:
                playTheGame();
                break;
            case menuItems.RESULTS:
                showResults();
                break;
            case menuItems.EXIT:
                return;
        }

    } while (menuItem !== menuItems.EXIT);
}

startGameSession();