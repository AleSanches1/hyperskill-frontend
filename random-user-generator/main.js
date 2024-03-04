const api = "https://randomuser.me/api/";
const body = document.querySelector("body");

async function getUserInfo() {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const userInfo = await getUserInfo();
        body.innerHTML = JSON.stringify(userInfo);
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
});
