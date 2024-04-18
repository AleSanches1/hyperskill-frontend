window.addEventListener("DOMContentLoaded", function () {

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
                    displayErrorMessage("Breed not found!")
                    return;
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