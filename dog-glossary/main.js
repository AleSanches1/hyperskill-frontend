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
            if (evt.target === showAllBreedsBtn) {
                const response = await showAllBreeds();
                // createList(response);
                console.log(response);
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
            let result = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await result.json();
            const infoFormAPI = data.message;
            console.log(infoFormAPI);
            const ul = document.createElement("ul");
            const ol = document.createElement("ol");
            for (let breed in infoFormAPI) {
                const li = document.createElement("li");
                li.textContent = breed;
                if (infoFormAPI[breed].length > 0) {
                    const subUl = document.createElement("ul");
                    const subLi = document.createElement("li");
                    let subBreedArr = [];
                    for (let i = 0; i < infoFormAPI[breed].length; i++) {
                        subBreedArr.push(infoFormAPI[breed][i]);
                    }
                    let subBreedList = subBreedArr.join(", ");
                    subLi.innerText = subBreedList;
                    subUl.appendChild(subLi);
                    li.appendChild(subUl);
                }
                ol.appendChild(li);
            }
            content.innerHTML = "";
            content.appendChild(ol);
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


