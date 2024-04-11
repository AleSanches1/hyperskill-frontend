document.addEventListener("DOMContentLoaded", function (evt) {
    evt.preventDefault();
    const btn = document.querySelector("#submit-button");
    const form = document.querySelector("#form");
    let users = JSON.parse(localStorage.getItem('users')) || [];

    form.addEventListener("input", function (evt) {
        evt.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        localStorage.setItem('formData', JSON.stringify(formData));

    })
    const savedData = JSON.parse(localStorage.getItem('formData'));

    function fillInputs() {
        const inputs = document.querySelectorAll('input[name]');
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            input.value = savedData[name] || "";
        });
    }

    fillInputs();


    function collectData() {
        const formData = Object.fromEntries(new FormData(form));
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(users)
        return users;
    }


    function clearInputs() {
        const inputs = document.querySelectorAll('input[name]');
        inputs.forEach(input => {
            input.value = "";
        });
    }

    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        collectData();
        clearInputs();
    })

})