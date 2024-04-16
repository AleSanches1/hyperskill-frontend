window.addEventListener("DOMContentLoaded", function (evt) {

    const content = document.querySelector("#content");
    const randomButton = document.querySelector("#button-random-dog");
    const showButton = document.querySelector("#button-show-breed");


    document.addEventListener("click", async function (evt) {
        if (evt.target === randomButton) {
            const imageURL = await getRandomImage();
            content.innerHTML = `<img src = "${imageURL}" alt = "random dog" />`;
        }
        if (evt.target === showButton) {
            const response = await showBreed();
            if(response){
                content.innerHTML = `<img src = "${response}" alt = "dog" />`
            }else{
                content.innerHTML = `<p>Breed not found!</p>`
            }

        }
    })

    async function getRandomImage() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        return data.message;
    }

    async function showBreed() {
        const breed = document.querySelector("#input-breed").value.toLowerCase();
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        if(!response.ok){
            return false;
        }
        const data = await response.json();
        return data.message;
    }




})

