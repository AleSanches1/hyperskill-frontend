const inputField = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");

addTaskBtn.addEventListener("click", () => {
    const task = inputField.value.trim();
    createTask(task);
    displayItems();
    inputField.value = "";
});


let tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
console.log(tasksArray);

function displayItems() {
    let tasks = "";
    for (let i = 0; i < tasksArray.length; i++) {
        tasks += `  <li class="list-item">
                    <div class="left-item"><input type="checkbox" class="checkbox"><span class="task">${tasksArray[i]}</span>
                    </div>
                    <button class="delete-btn">&times</button>
                </li> `
    }
    taskList.innerHTML = tasks;
    activateDeleteButton();
    activateCheckbox();
}

function activateDeleteButton() {
    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteTask(index);
        })
    })
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    location.reload();
}

function activateCheckbox() {
    const checkbox = document.querySelectorAll(".checkbox");
    checkbox.forEach((box, index) => {
        box.addEventListener("click", () => {
            checkTask(index);
        })
    })
}

function checkTask(index) {
    const taskElement = document.querySelectorAll(".task")[index];
    const checkbox = document.querySelectorAll(".checkbox")[index];
    taskElement.classList.toggle("checked", checkbox.checked);
}

function createTask(task) {
    tasksArray.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
}

window.onload = function () {
    displayItems();
}

