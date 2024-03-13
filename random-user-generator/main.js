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
function createDiv(constName,className,parent){
    constName = document.createElement("div");
    constName.classList.add(className);
    parent.after(constName);
}
createDiv('usersDiv', "users", btnSaveUsers);
function displayUserInfo(userInfo, isSaved = false) {

    const {name, email, login, gender, phone, location, registered, picture} = userInfo;
    console.log(userInfo)
const usersDiv = document.querySelector('.users');
    const divElement = createAndAppendElement(usersDiv, "div", "", "user");

    // name
    createAndAppendElement(divElement, "h2", `${name.first} ${name.last}`, "name");

    // info
    createAndAppendElement(divElement, "p", `Email: ${email}`, "email");
    createAndAppendElement(divElement, "p", `Password: ${login.password}`, "password");
    createAndAppendElement(divElement, "p", `Gender: ${gender}`, "gender");
    createAndAppendElement(divElement, "p", `Phone: ${phone}`, "phone");
    createAndAppendElement(divElement, "p", `Location: ${location.city}, ${location.country}`, "location");
    createAndAppendElement(divElement, "p", `Birthday: ${registered.date.slice(0, 10).replace(/-/g, "/")}`, "birthday");

    const photoElement = createAndAppendElement(divElement, "img", "", "photo");
    photoElement.src = picture.large;
    photoElement.alt = "photo";

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




// document.addEventListener("DOMContentLoaded", handleUserInfo);
document.addEventListener("DOMContentLoaded", getUsersFromLocalStorage);

const savedUsersDiv = document.querySelector('.saved-users')

async function getUsersFromLocalStorage() {
    try {
        const savedUsers = JSON.parse(sessionStorage.getItem('fetchedArray'));
        // createAndAppendElement(document.body, "div", "", "saved");
        for (let i = 0; i < savedUsers.length; i++) {
            let user = savedUsers[i];
            console.log(user);
        }
        savedUsers.forEach(user => {
            // const savedUser = createAndAppendElement(savedUsersDiv, "div", "", "saved");
            displayUserInfo(user);
        });
        showHeading(".saved-users", ".saved"); // Показываем заголовок при наличии сохраненных пользователей
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}
const btnGetUsers = document.getElementById("get-user-button");
btnGetUsers.addEventListener("click", handleUserInfo);


function showHeading(heading,selector, parent) {
   heading = document.querySelector(selector);

    const savedUsersDiv = document.querySelector(parent);
    // if (localStorage.getItem('fetchedArray') !== null) {
    //     savedUsersHeading.classList.remove("hidden");
    //     savedUsersDiv.prepend(savedUsersHeading);
    // } else {
    //     savedUsersHeading.classList.add("hidden");
    // }
}

// btnSaveUsers.addEventListener("click", function () {
//
//     // showHeading(name, ".saved-users", ".saved");
//     // console.log(fetchedArray);
//     localStorage.setItem('fetchedArray', JSON.stringify(fetchedArray));
//     if (localStorage.getItem('fetchedArray') !== null) {
//         console.log("yes");
//         showHeading(name, ".saved-users", ".saved");
//
//     } else {
//         console.log("no");
//         document.querySelector(".saved-users").classList.add("hidden");
//     }
//     getUsersFromLocalStorage().then(r => displayUserInfo());
// })
btnSaveUsers.addEventListener("click", function () {
    sessionStorage.setItem('fetchedArray', JSON.stringify(fetchedArray));
    // showHeading(".saved-users", ".saved");
    getUsersFromLocalStorage().then(r => displayUserInfo());
})
// const btnClear = document.getElementById('clear');
// btnClear.addEventListener('click', function () {
//     document.querySelector(".saved-users").classList.add('hidden');
//     localStorage.clear();
// document.querySelector('div').remove();
// })

//1)получаем данные с апи, записываем в массив
//2) читаем массив и выводим в хтмл
//3) сохраняем - очищаем локальное хранилище, читаем массив и записываем в хранилище