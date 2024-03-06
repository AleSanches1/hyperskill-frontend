const apiUrl = "https://randomuser.me/api/";
const body = document.querySelector("body");

async function fetchUserInfo(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

function displayUserInfo(userInfo) {
    const createAndAppendElement = (parent, tagName, text, className) => {
        const element = document.createElement(tagName);
        if (text) element.textContent = text;
        if (className) element.className = className;
        parent.appendChild(element);
        return element;
    };

    const { name, email, login, gender, phone, location, registered, picture } = userInfo;

    const divElement = createAndAppendElement(document.body, "div", "", "user");

    // name
    const nameElement = createAndAppendElement(divElement, "h2", `${name.first} ${name.last}`, "name");

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
        displayUserInfo(userInfo);
    } catch (error) {
        // Error handling is already done in fetchUserInfo function
    }
}

document.addEventListener("DOMContentLoaded", handleUserInfo);

const button = document.getElementById("get-user-button");
button.addEventListener("click", handleUserInfo);
