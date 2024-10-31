document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('toggleTheme').addEventListener('click', toggleTheme);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskText = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const dueDate = taskDueDate.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskId = Date.now();
    const taskItem = createTaskElement(taskText, taskDescription, dueDate, taskId);

    document.getElementById('pendingTasks').appendChild(taskItem);
    taskInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDate.value = "";
    motivationalMessage();
}

function createTaskElement(taskText, taskDescription, dueDate, taskId) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.id = taskId;

    li.innerHTML = `
        <div>
            <strong>${taskText}</strong> <small>${new Date().toLocaleString()}</small>
            <p class="task-description">${taskDescription}</p>
            <small>Due: ${dueDate || 'No due date'}</small>
        </div>
        <div>
            <button onclick="markComplete(${taskId})">✔️</button>
            <button onclick="deleteTask(${taskId})">❌</button>
            <button onclick="markImportant(${taskId})">🔥</button>
            <button onclick="markFavorite(${taskId})">⭐</button>
        </div>
    `;
    return li;
}

function markComplete(taskId) {
    const task = document.getElementById(taskId);
    if (task) {
        task.classList.add('completed');
        document.getElementById('completedTasks').appendChild(task);
        task.querySelector('button:first-child').style.display = 'none';
        task.querySelector('button:last-child').innerText = '✏️';
        task.querySelector('button:last-child').setAttribute('onclick', `editTask(${taskId})`);
    }
}

function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        const task = document.getElementById(taskId);
        if (task) {
            task.remove();
        }
    }
}

function editTask(taskId) {
    const task = document.getElementById(taskId);
    const taskTitle = task.querySelector('strong').textContent;
    const taskDescription = task.querySelector('.task-description').textContent;

    const newTaskText = prompt("Edit your task:", taskTitle);
    const newTaskDescription = prompt("Edit your description:", taskDescription);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.querySelector('strong').textContent = newTaskText;
    }
    if (newTaskDescription !== null && newTaskDescription.trim() !== "") {
        task.querySelector('.task-description').textContent = newTaskDescription;
    }
}

function markImportant(taskId) {
    const task = document.getElementById(taskId);
    const importantTasks = document.getElementById('importantTasks');
    importantTasks.appendChild(task);
}

function markFavorite(taskId) {
    const task = document.getElementById(taskId);
    const favoriteTasks = document.getElementById('favoriteTasks');
    favoriteTasks.appendChild(task);
}

function motivationalMessage() {
    const messages = [
        "Keep pushing forward!",
        "Believe in yourself!",
        "You can do it!",
        "Stay focused!",
        "Make today amazing!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('motivationalText').innerText = randomMessage;

    // document.getElementById('motivationalImage').src = `https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-psd%2F3d-success-with-business-man-character-gold-cup-as-well-as-dartboard_380580-811.jpg&tbnid=BmsptYcHelbTjM&vet=10CAIQxiAoAGoXChMI8PmElpaliQMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-psd%2F3d-success-with-business-man-character-gold-cup-as-well-as-dartboard_17932117.htm&docid=wCrUqe6QQ6a4tM&w=626&h=521&itg=1&q=success%20images%203D&ved=0CAIQxiAoAGoXChMI8PmElpaliQMVAAAAAB0AAAAAEAc${Math.random()}`;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');
    const button = document.getElementById('toggleTheme');
    button.innerText = button.innerText.includes("Dark") ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";
}
