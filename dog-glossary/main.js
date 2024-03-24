document.addEventListener("DOMContentLoaded", function () {
    const showDogBtn = document.getElementById("button-random-dog");

    async function fetchFunction() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        return data.message;
    }

    async function checkImage() {
        const container = document.getElementById("content");
        if (document.querySelector("img") !== null) {
            container.removeChild(container.firstChild);
        }
    }

    showDogBtn.addEventListener("click", async function (evt) {
        evt.preventDefault();
        const randomPicUrl = await fetchFunction();
        const contentDiv = document.getElementById("content");
        const randomPic = document.createElement("img");
        randomPic.src = randomPicUrl;
        await checkImage();
        contentDiv.prepend(randomPic);
    });
});
