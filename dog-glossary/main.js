window.addEventListener("DOMContentLoaded", function () {

        const content = document.querySelector("#content");
        const randomButton = document.querySelector("#button-random-dog");
        const showButton = document.querySelector("#button-show-breed");
        const showSubBreedBtn = document.querySelector("#button-show-sub-breed");
        const showAllBreedsBtn = document.querySelector("#button-show-all");

        document.addEventListener("click", async function (evt) {
            if (evt.target === randomButton) {
                const imageURL = await getRandomImage();
                content.innerHTML = `<img src = "${imageURL}" alt = "random dog" />`;
            }
            if (evt.target === showButton) {
                const response = await getInfoFromApi("images/random");
                if(!response){
                    displayErrorMessage("Breed not found!")
                    return;
                }else{
                    content.innerHTML = `<img src = "${response}" alt = "dog" />`
                }

            }
            if (evt.target === showSubBreedBtn) {
                const response = await getInfoFromApi("images/random");
                if (!response) {
                    displayErrorMessage("Breed not found!")
                    return;
                }
                const breeds = await showSubBreedList();
                if (!breeds || breeds.length === 0) {
                    displayErrorMessage("No sub-breeds found!")
                }

            }
            if (evt.target === showAllBreedsBtn) {
                await showAllBreeds();
            }
        })

        async function getRandomImage() {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            return data.message;
        }

        async function showSubBreedList() {
            let result = await getInfoFromApi("list");
            createList(result);
            return result;
        }

        async function showAllBreeds() {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();
            const breeds = data.message;
            const ol = document.createElement("ol");
            for (const breed in breeds) {
                const li = document.createElement("li");
                li.textContent = breed;
                if (breeds[breed].length > 0) {
                    const subUl = document.createElement("ul");
                    const subLi = document.createElement("li");
                    subLi.innerText = breeds[breed].join(", ");
                    subUl.appendChild(subLi);
                    li.appendChild(subUl);
                }
                ol.appendChild(li);
            }
            content.innerHTML = "";
            content.appendChild(ol);
            return breeds;
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

        function displayErrorMessage(message) {
            content.innerHTML = `<p>${message}</p>`;
        }

        function createList(infoFormAPI) {
            if (infoFormAPI) {
                const ol = document.createElement("ol");
                for (let value of infoFormAPI) {
                    const li = document.createElement("li");
                    li.innerHTML = value;
                    ol.appendChild(li);
                }
                content.innerHTML = "";
                content.appendChild(ol);
            }
        }
    }
)