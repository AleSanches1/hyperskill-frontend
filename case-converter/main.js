const textArea = document.querySelector(".main__textarea");

function getEnteredData() {
    return textArea.value;
}

function makeSentence(separator) {
    const wordArray = getEnteredData().toLowerCase().split(separator);
    const arr = [];
    wordArray.forEach(function (value) {
        const words = value.charAt(0).toUpperCase() + value.slice(1);
        arr.push(words);
    })
    textArea.value = arr.join(separator);
}

const upperBtn = document.querySelector('#upper-case');
upperBtn.addEventListener("click", function () {
    textArea.value = getEnteredData().toUpperCase();
});

const lowerBtn = document.querySelector("#lower-case");
lowerBtn.addEventListener("click", function () {
    textArea.value = getEnteredData().toLowerCase();
})


const properBtn = document.querySelector("#proper-case");
properBtn.addEventListener("click", function () {
    makeSentence(" ");
})
const sentenceBtn = document.querySelector("#sentence-case");
sentenceBtn.addEventListener("click", function () {
    makeSentence(". ")
})

