const inputField = document.querySelector("#input-task");
const addTaskBtn = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list")


addTaskBtn.addEventListener("click", function () {
    const newTask = inputField.value.trim();
    if (newTask !== "") {
        createLiItem(newTask);
        inputField.value = "";
    }
});

function createLiItem(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");

    listItem.innerHTML = `
        <div class="left-item">
            <input class="checkbox" type="checkbox">
            <span class="task">${task}</span>
        </div>
        <button class="delete-btn">&times;</button>
    `;

    listItem.querySelector('.delete-btn').addEventListener("click", function() {
        listItem.remove();
    });

    taskList.appendChild(listItem);
}

