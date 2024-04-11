    const container = document.querySelector(".info");

    // Получаем данные из локального хранилища
    let users = JSON.parse(localStorage.getItem('users'));

    function updateUI() {
        // Проверяем, есть ли данные в локальном хранилище
        if (users && users.length > 0) {
            // Создаем блок для каждого пользователя
            users.forEach(function(user, index) {
                const info = document.createElement("div");
                info.classList.add("submit-history-card");

                // Проходимся по всем ключам объекта user
                for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                        // Создаем заголовок для ключа
                        const header = document.createElement("h5");
                        // Преобразуем ключ перед отображением
                        const displayKey = key === "first-name" ? "First Name" : key === "last-name" ? "Last Name" : key;
                        header.innerText = displayKey[0].toUpperCase() + displayKey.slice(1) + ":";
                        info.appendChild(header);

                        // Создаем элемент для значения
                        const element = document.createElement("p");
                        element.classList.add("card-" + key);
                        element.innerText = user[key];
                        info.appendChild(element);
                    }
                }
                container.appendChild(info);


                // Создаем кнопку удаления
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                // deleteButton.addEventListener("click", function() {
                //     // Удаляем пользователя из массива по индексу
                //     users.splice(index, 1);
                //     // Обновляем локальное хранилище
                //     localStorage.setItem('users', JSON.stringify(users));
                //     // Обновляем интерфейс
                //     updateUI();
                // });
                info.appendChild(deleteButton);
            });
        } else {
            console.log("Нет сохраненных данных");
        }
    }
    updateUI();

