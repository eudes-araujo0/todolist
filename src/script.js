document.addEventListener("DOMContentLoaded", function () {
    const btnAddTask = document.getElementById("addTaskBtn");
    const formTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    btnAddTask.addEventListener("click", function () {
        const taskArmazenada = formTask.value.trim();
        if (taskArmazenada !== "") {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center mt-2 border p-1 rounded ";

            const taskText = document.createElement("span");
            taskText.textContent = taskArmazenada;
            taskText.style.marginLeft = "1rem";

            const btnCheck = document.createElement("button");
            btnCheck.className = "btn btn-success";
            btnCheck.innerHTML = '<i class="bi bi-check2-circle"></i>';
            btnCheck.addEventListener("click", function () {
                listItem.classList.toggle("completed");
                taskCompleted.classList.add("show");
                    setTimeout(() => taskCompleted.classList.remove("show"), 3000); // Ocultar o alerta após 3 segundos
            });

            const btnEdit = document.createElement("button");
            btnEdit.className = "btn btn-warning";
            btnEdit.innerHTML = '<i class="bi bi-pencil-fill"></i>'
            btnEdit.addEventListener("click", function () {
                // aplicando form para substituir.

                const InputEdit = document.createElement("input");
                InputEdit.type = "text";
                InputEdit.className = "form-control m-1";
                btnDelete.style.marginLeft = "0.5rem"
                InputEdit.value = taskText.textContent;

                // criando btn para salvar edit

                const btnSave = document.createElement("button");
                btnSave.className = "btn btn-success";
                btnSave.innerHTML = '<i class="bi bi-save"></i>';

                btnCheck.style.display = "none";

                btnSave.addEventListener("click", function () {
                    taskText.textContent = InputEdit.value;
                    listItem.replaceChild(taskText, InputEdit);
                    btnCheck.style.display = "inline-block";
                    listItem.replaceChild(btnEdit, btnSave);
                    taskEdit.classList.add("show");
                    setTimeout(() => taskEdit.classList.remove("show"), 3000); // Ocultar o alerta após 3 segundos
                });


                listItem.replaceChild(InputEdit, taskText);
                listItem.replaceChild(btnSave, btnEdit)
            });


            const btnDelete = document.createElement("button");
            btnDelete.className = "btn btn-danger";
            btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
            btnDelete.addEventListener("click", function () {
                listItem.remove();
                // Mostrar o alerta
                taskAlert.classList.add("show");
                setTimeout(() => taskAlert.classList.remove("show"), 3000); // Ocultar o alerta após 3 segundos
            });


            listItem.appendChild(taskText);
            listItem.appendChild(btnCheck);
            listItem.appendChild(btnEdit);
            listItem.appendChild(btnDelete);
            taskList.appendChild(listItem);
            formTask.value = "";
        }
    })    
})