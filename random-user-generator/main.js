const apiUrl = "https://randomuser.me/api/";
const fetchedArray = [];
const btnSaveUsers = document.getElementById("save-users-button");

async function fetchUserInfo(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const [result] = data.results;
        return result;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}


const createAndAppendElement = (parent, tagName, text, className) => {
    const element = document.createElement(tagName);
    if (text) element.textContent = text;
    if (className) element.className = className;
    parent.appendChild(element);
    return element;
};

function createDiv(constName, className, parent) {
    constName = document.createElement("div");
    constName.classList.add(className);
    parent.after(constName);
}

createDiv('usersDiv', "users", btnSaveUsers);
const savedUsersDiv = document.querySelector('.save-users');

function displayUserInfo(userInfo, isSaved = false) {

    const {name, email, login, gender, phone, location, registered, picture} = userInfo;
    console.log(userInfo)
    const usersDiv = document.querySelector('.users');
    const divElement = createAndAppendElement(isSaved ? savedUsersDiv : usersDiv, "div", "", isSaved ? "saved" : "user");
    //photo
    const photoElement = createAndAppendElement(divElement, "img", "", "photo");
    photoElement.src = picture.large;
    photoElement.alt = "photo";
    // name
    createAndAppendElement(divElement, "h2", `${name.first} ${name.last}`, "name");

    // info
    createAndAppendElement(divElement, "p", `Email: ${email}`, "email");
    createAndAppendElement(divElement, "p", `Password: ${login.password}`, "password");
    createAndAppendElement(divElement, "p", `Gender: ${gender}`, "gender");
    createAndAppendElement(divElement, "p", `Phone: ${phone}`, "phone");
    createAndAppendElement(divElement, "p", `Location: ${location.city}, ${location.country}`, "location");
    createAndAppendElement(divElement, "p", `Birthday: ${registered.date.slice(0, 10).replace(/-/g, "/")}`, "birthday");
}

async function handleUserInfo() {
    try {
        const userInfo = await fetchUserInfo(apiUrl);
        fetchedArray.push(userInfo);
        displayUserInfo(userInfo);
        return userInfo; // Возвращаем userInfo, чтобы его можно было использовать при сохранении
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}
function showHeading() {
    const heading = document.querySelector("h3");
    savedUsersDiv.before(heading);
    if (sessionStorage.getItem('fetchedArray')) {
        heading.classList.remove("hidden");
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    await getUsersFromLocalStorage();
    showHeading();
});

async function getUsersFromLocalStorage() {
    try {
        const savedUsers = JSON.parse(sessionStorage.getItem('fetchedArray')) || [];
        savedUsers.forEach(user => {
            displayUserInfo(user, true); // Display each saved user
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

const btnGetUsers = document.getElementById("get-user-button");
btnGetUsers.addEventListener("click", handleUserInfo);


btnSaveUsers.addEventListener("click", async function () {
    showHeading();
    savedUsersDiv.innerHTML = '';
    sessionStorage.setItem('fetchedArray', JSON.stringify(fetchedArray));
    await getUsersFromLocalStorage();

})


