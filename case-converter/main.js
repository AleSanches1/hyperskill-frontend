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
function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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


const saveBtn = document.querySelector("#save-text-file");
saveBtn.addEventListener("click", function () {
    download("text.txt", textArea.value);

})