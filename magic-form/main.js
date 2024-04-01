document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector("#submit-button");
    const form = document.querySelector("#form");

    form.addEventListener("input", function (evt) {
        evt.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        localStorage.setItem('formData', JSON.stringify(formData));

    })
    const savedData = JSON.parse(localStorage.getItem('formData'));

    function fillInputs() {
        const inputs = {
            "first-name": "#first-name",
            "last-name": "#last-name",
            "email": "#email",
            "phone": "#phone",
            "company": "#company",
            "address": "#address"
        };
        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                const element = inputs[key]; //извлекаем значение свойства объекта inputs и сохраняем его в переменную element. Значение element представляет собой селектор элемента формы (например, "#first-name").
                const input = document.querySelector(element); // используем document.querySelector с полученным селектором, чтобы найти соответствующий элемент формы. Найденный элемент сохраняется в переменной input.
                input.value = savedData[key] || ""; //устанавливаем значение поля формы (input.value) равным значению, сохраненному в объекте savedData под ключом key. Если такого ключа нет в savedData, или если его значение равно null или undefined, то устанавливаем пустую строку в качестве значения поля формы.
            }
        }
    }

    fillInputs();


})