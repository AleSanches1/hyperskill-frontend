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
    createAndAppendElement(divElement, "p", `Email:`, "email");
    createAndAppendElement(divElement, "p", `Password:`, "password");
    createAndAppendElement(divElement, "p", `Gender:`, "gender");
    createAndAppendElement(divElement, "p", `Phone: `, "phone");
    createAndAppendElement(divElement, "p", `Location:`, "location");
    createAndAppendElement(divElement, "p", `Birthday:`, "birthday");

    const photoElement = createAndAppendElement(divElement, "img", "", "photo");
    photoElement.src = picture.large;
    photoElement.alt = "photo";
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const userInfo = await fetchUserInfo(apiUrl);
        displayUserInfo(userInfo);
    } catch (error) {
        // Error handling is already done in fetchUserInfo function
    }
});

