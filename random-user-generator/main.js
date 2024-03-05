// const api = "https://randomuser.me/api/";
// const body = document.querySelector("body");
//
// async function getUserInfo() {
//     const response = await fetch(api);
//     const data = await response.json();
//     return data;
// }
//
// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const userInfo = await getUserInfo();
//         // body.innerHTML = JSON.stringify(userInfo);
//        // console.log(JSON.stringify(userInfo));
//         const info = userInfo.results[0];
//         console.log(info)
//         const randomName = info.name.first;
//         const randomSurname = info.name.last;
//         console.log(randomSurname);
//         // const photo = document.createElement("img");
//         const name = document.createElement("h2");
//         document.querySelector(".heading").after(name);
//         name.innerHTML = randomName + " " + randomSurname;
//         name.className = "name";
//     } catch (error) {
//         console.error("Error fetching user info:", error);
//     }
// });


const apiUrl = "https://randomuser.me/api/";
const body = document.querySelector("body");

async function fetchUserInfo(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results[0]);
        return data.results[0];
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

function displayUserInfo(userInfo) {
    //name
    const {name} = userInfo;
    const fullName = `${name.first} ${name.last}`;
    const nameElement = document.createElement("h2");
    nameElement.textContent = fullName;
    nameElement.className = "name";
    const divElement = document.createElement("div");
    divElement.className = "user";
    document.querySelector(".heading").after(divElement);
   divElement.prepend(nameElement);

    //  email
    const {email} = userInfo;
    const emailElement = document.createElement("p");
    emailElement.textContent = "Email:" + email;
    emailElement.className = "email";
    nameElement.after(emailElement);

    //password
    const {login} = userInfo;
    const password = login.password;
    const passwordElement = document.createElement("p");
    passwordElement.textContent = "Password:" + password;
    passwordElement.className = "password";
    emailElement.after(passwordElement);
//gender
    const {gender} = userInfo;
    const genderElement = document.createElement("p");
    genderElement.textContent = "Gender:" + gender;
    genderElement.className = "gender";
    passwordElement.after(genderElement);
    //phone
    const {phone} = userInfo;
    const phoneElement = document.createElement("p");
    phoneElement.textContent = "Phone:" + phone;
    phoneElement.className = "phone";
    genderElement.after(phoneElement);
    //location
    const {location} = userInfo;
    const city = `${location.city}, ${location.country}`;
    const locationElement = document.createElement("p");
    locationElement.textContent = "Location:" + city;
    locationElement.className = "location";
    phoneElement.after(locationElement);
    //birthday
    const {registered} = userInfo;
    const birthday = registered.date;
    const shortBirthday = birthday.slice(0,9).replace(/-/g,"/");
    console.log(shortBirthday);
    const birthdayElement = document.createElement("p");
    birthdayElement.textContent = "Birthday:" + shortBirthday;
    birthdayElement.className = "birthday";
    locationElement.after(birthdayElement);
    //photo
    const {picture} = userInfo;
    const largePictureUrl = picture.large;
    const photoElement = document.createElement("img");
    photoElement.src = largePictureUrl;
    photoElement.alt = "photo";
    photoElement.className = "photo";
    birthdayElement.after(photoElement);
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const userInfo = await fetchUserInfo(apiUrl);
        displayUserInfo(userInfo);
    } catch (error) {
        // Error handling is already done in fetchUserInfo function
    }
});

