fetch('/tasks')
.then(response => response.json())
.then(tasks => {
    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} : ${task.status}`;

        taskList.appendChild(li);
    });
})
.catch(error => {
    console.error('Ошибка при загрузке задач:', error);
});

//!AUE
document.getElementById('addTask').addEventListener('click', async () => {
    const title = prompt("Введите заголовок задачи:");
    const description = prompt("Введите описание задачи:");
    const status = prompt("Введите статус задачи (todo/done):");
    

    if (!title || !status ) {
        document.getElementById('error-message').innerText = 'Пожалуйста, заполните все поля!';
        return;
    }

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('error-message').innerText = 'Задача добавлена успешно!';
            loadTasks();  // Обновляем список задач
        } else {
            document.getElementById('error-message').innerText = `Ошибка: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('error-message').innerText = 'Произошла ошибка при добавлении задачи';
    }
});

document.getElementById('editTask').addEventListener('click', async () => {
    const taskId = prompt("Введите ID задачи для изменения:");
    const title = prompt("Введите новый заголовок задачи:");
    const description = prompt("Введите новое описание задачи:");
    const status = prompt("Введите новый статус задачи (todo/done):");

    if (!taskId || !title || !description || !status) {
        document.getElementById('error-message').innerText = 'Пожалуйста, заполните все поля!';
        return;
    }

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('error-message').innerText = 'Задача обновлена успешно!';
            loadTasks();  // Обновляем список задач
        } else {
            document.getElementById('error-message').innerText = `Ошибка: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('error-message').innerText = 'Произошла ошибка при обновлении задачи';
    }
});

function deleteTask() {
    const taskId = prompt("Введите ID задачи для удаления:");

    if (!taskId) {
        document.getElementById('error-message').innerText = 'Пожалуйста, введите ID задачи!';
        return;
    }

    fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Задача удалена') {
            document.getElementById('error-message').innerText = 'Задача удалена успешно!';
            loadTasks();  // Обновляем список задач
        } else {
            document.getElementById('error-message').innerText = `Ошибка: ${data.message}`;
        }
    })
    .catch(error => {
        document.getElementById('error-message').innerText = 'Произошла ошибка при удалении задачи';
    });
}

async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.status} (ID: ${task._id})`;
        taskList.appendChild(li);
    });
}

window.onload = loadTasks; // Загружаем задачи при загрузке страницы
