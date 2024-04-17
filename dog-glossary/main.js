window.addEventListener("DOMContentLoaded", function (evt) {

    const content = document.querySelector("#content");
    const randomButton = document.querySelector("#button-random-dog");
    const showButton = document.querySelector("#button-show-breed");
    const showSubBreedBtn = document.querySelector("#button-show-sub-breed");

    document.addEventListener("click", async function (evt) {
        if (evt.target === randomButton) {
            const imageURL = await getRandomImage();
            content.innerHTML = `<img src = "${imageURL}" alt = "random dog" />`;
        }
        if (evt.target === showButton) {
            const response = await getInfoFromApi("images/random");
            if (response) {
                content.innerHTML = `<img src = "${response}" alt = "dog" />`
            } else {
                content.innerHTML = `<p>Breed not found!</p>`
            }

        }
        if (evt.target === showSubBreedBtn) {
            // const response = await getInfoFromApi("images/random");
            // if (!response) {
            //     content.innerHTML = `<p>Breed not found!</p>`
            // }
            const breeds = await showSubBreedList();
            console.log(breeds);
            if (!breeds) {
                content.innerHTML = `<p>No sub-breeds found!</p>`
            }
        }
    })

    async function getRandomImage() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        return data.message;
    }

    // async function showBreed() {
    //     const breed = document.querySelector("#input-breed").value.toLowerCase();
    //     const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    //     if (!response.ok) {
    //         return false;
    //     }
    //     const data = await response.json();
    //     return data.message;
    // }

    async function showSubBreedList() {

        let result = await getInfoFromApi("list");
        if (result) {
            const ol = document.createElement("ol");
            for (let value of result) {
                const li = document.createElement("li");
                li.innerHTML = value;
                ol.appendChild(li);
            }
            content.innerHTML = "";
            content.appendChild(ol);
            return result;
        }
        return false;

    }

    async function getInfoFromApi(param) {
        const breed = document.querySelector("#input-breed").value.toLowerCase();
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/${param}`);
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        return data.message;
    }
})

