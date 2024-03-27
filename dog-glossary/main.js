window.addEventListener("DOMContentLoaded", function (evt) {

    const showRandomDog = document.querySelector("#content");
    const button = document.querySelector("#button-random-dog");

    button.addEventListener("click", async (evt)=>{
        const imageURL = await getRandomImage();
        showRandomDog.innerHTML = `<img src = "${imageURL}" alt = "random dog" />`;
    });

    const getRandomImage = async () => {
        const response =await fetch ("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        return data.message;
    }
})
