document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');
    const filterTask = document.getElementById('filter-task');
    const searchTask = document.getElementById('searchTask');

    const tasks = []; // array to hold tasks

    function renderTasks() {
        // clear the list
        taskList.innerHTML = '';

        // return the filter selected
        const filter = filterTask.value;

        // search text
        const searchText = searchTask.value.trim().toLowerCase();

        // filter tasks based on the selected filter and search text
        const filteredTasks = tasks.filter(task => {
            const matchesFilter = filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed);
            const matchesSearch = task.text.toLowerCase().startsWith(searchText);
            return matchesFilter && matchesSearch;
        });

        // render filtered tasks
        if (filteredTasks.length > 0) {
            filteredTasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center mt-2';
                li.innerHTML = `
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <input type="text" class="edit-input form-control" style="display: none;" value="${task.text}">
                    <div>
                        <button class="btn btn-sm ${task.completed ? 'btn-danger' : 'btn-success'} btn-complete">${task.completed ? '❌' : '✅'}</button>
                        <button class="btn btn-sm btn-warning btn-edit">✍</button>
                        <button class="btn btn-sm btn-danger btn-delete">🗑️</button>
                        <button class="btn btn-sm btn-success btn-confirm" style="display: none; margin-left: 10px">Salvar</button>
                    </div>
                `;
                taskList.appendChild(li);

                // Event listeners for the buttons
                li.querySelector('.btn-edit').addEventListener('click', function() {
                    li.querySelector('.task-text').style.display = 'none';
                    li.querySelector('.edit-input').style.display = 'block';
                    li.querySelector('.btn-edit').style.display = 'none';
                    li.querySelector('.btn-complete').style.display = 'none';
                    li.querySelector('.btn-delete').style.display = 'none';
                    li.querySelector('.btn-confirm').style.display = 'inline-block';
                });

                li.querySelector('.btn-confirm').addEventListener('click', function() {
                    const newText = li.querySelector('.edit-input').value.trim();
                    if (newText) {
                        tasks[index].text = newText;
                        renderTasks();
                    }
                });

                li.querySelector('.btn-complete').addEventListener('click', function() {
                    tasks[index].completed = !tasks[index].completed;
                    renderTasks();
                });

                li.querySelector('.btn-delete').addEventListener('click', function() {
                    tasks.splice(index, 1);
                    renderTasks();
                });
            });
            message.style.display = 'none';
        } else {
            message.style.display = 'block';
            message.textContent = filter === 'completed' ? 'Não há tarefas completas.' : filter === 'pending' ? 'Não há tarefas pendentes.' : 'Não há tarefas.';
        }
    }

    document.getElementById('btn-add-task').addEventListener('click', function() {
        const addTaskInput = document.getElementById('addTask');
        const taskText = addTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            addTaskInput.value = '';
            renderTasks();
        }
    });

    filterTask.addEventListener('change', renderTasks);
    searchTask.addEventListener('input', renderTasks);

    // initial render
    renderTasks();
});
