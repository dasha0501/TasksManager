const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const filterInput = document.getElementById('filter');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;
    const assignee = document.getElementById('taskAssignee').value;

    const task = {
        id: Date.now(),
        title,
        deadline,
        priority,
        assignee,
    };

    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <span>${task.title} (Приоритет: ${task.priority}, Исполнитель: ${task.assignee}, Срок: ${task.deadline})</span>
            <button onclick="deleteTask(${task.id})">Удалить</button>
            <button onclick="openEditModal(${task.id})">Редактировать</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}


function filterTasks() {
    const filterValue = filterInput.value.toLowerCase();
    
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filterValue));
    
    taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.title} (Срок: ${task.deadline}, Приоритет: ${task.priority}, Исполнитель: ${task.assignee})</span>
            <button onclick="openEditModal(${task.id})">Редактировать</button>
            <button onclick="deleteTask(${task.id})">Удалить</button>
        `;
        taskList.appendChild(li);
    });
}

function openEditModal(id) {
    currentEditTaskId = id;
    
    const taskToEdit = tasks.find(task => task.id === currentEditTaskId);
    
    document.getElementById('editTaskName').value = taskToEdit.title;
    document.getElementById('editDueDate').value = taskToEdit.deadline;
    document.getElementById('editPriority').value = taskToEdit.priority;
    document.getElementById('editAssignee').value = taskToEdit.assignee;

    editModal.style.display = "block";
}

function closeEditModal() {
    editModal.style.display = "none";
}

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const updatedTaskName = document.getElementById('editTaskName').value;
    const updatedDueDate = document.getElementById('editDueDate').value;
    const updatedPriority = document.getElementById('editPriority').value;
    const updatedAssignee = document.getElementById('editAssignee').value;

    tasks = tasks.map(task => {
        if (task.id === currentEditTaskId) {
            return { ...task, title: updatedTaskName, deadline: updatedDueDate, priority: updatedPriority, assignee: updatedAssignee };
        }
        return task;
    });

    closeEditModal();
    renderTasks();
});