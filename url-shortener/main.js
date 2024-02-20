// const input = require('sync-input');

const enteredUrl = document.querySelector("input");
const button = document.querySelector("button")
const orderedList = document.querySelector('ol');

function isURLValid(url) {
    let regex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/;
    return regex.test(url);
}

function generateRandomString(length) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

function shortUrl() {
    return "localhost/" + generateRandomString(5);
}


button.addEventListener('click', function () {
    const message = document.querySelector(".message");
    if (isURLValid(enteredUrl.value)) {
        if (!message.classList.contains("hidden")) {
            message.classList.add("hidden");
        }
        const ol = document.querySelector('ol');
        let li = document.createElement("li");
        ol.append(li);
        let link = document.createElement("a");
        link.href = enteredUrl.value;
        link.textContent = shortUrl();
        link.target = "_blank";
        li.append(link);
        li.innerHTML += " - " + enteredUrl.value;

    } else if (!isURLValid(enteredUrl.value)) {
        // let message = document.createElement("p");
        //     message.innerHTML = "Please enter a valid url";
        //     button.after(message);
        message.classList.remove("hidden");
    }
})
