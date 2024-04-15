const inputField = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");

addTaskBtn.addEventListener("click", createTask);

function createTask() {
    const newTask = inputField.value.trim();
    if (newTask !== "") {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");

        listItem.innerHTML = `
            <div class="left-item">
                <input class="checkbox" type="checkbox">
                <span class="task">${newTask}</span>
            </div>
            <button class="delete-btn">&times;</button>
        `;

        listItem.querySelector('.delete-btn').addEventListener("click", function () {
            listItem.remove();
        });

        listItem.querySelector('.checkbox').addEventListener("click", function () {
            listItem.querySelector(".task").classList.toggle("checked", this.checked);
        });

        taskList.appendChild(listItem);
        inputField.value = "";
    }
}
