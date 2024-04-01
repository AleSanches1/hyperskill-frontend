document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector("#submit-button");
    const form = document.querySelector("#form");

    form.addEventListener("input", function (evt) {
        evt.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        localStorage.setItem('formData', JSON.stringify(formData));

    })
    let savedData = localStorage.getItem('formData');
    let data = JSON.parse(savedData);
    console.log(data)

    function fillInputs() {
        let name = document.querySelector("#first-name");
        name.value = data["first-name"];

        let surname = document.querySelector("#last-name");
        surname.value = data["last-name"];

        let email = document.querySelector("#email");
        email.value = data.email;

        let phone = document.querySelector("#phone");
        phone.value = data.phone;

        let company = document.querySelector("#company");
        company.value = data.company;

        let address = document.querySelector("#address");
        address.value = data.address;
    }
    fillInputs();
   

})