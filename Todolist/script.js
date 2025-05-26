const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.tabIndex = 0; // make focusable for accessibility
    taskText.style.cursor = 'pointer';
    taskText.setAttribute('aria-label', `Task: ${task.text}`);
    taskText.onclick = () => toggleComplete(index);
    taskText.onkeypress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') toggleComplete(index);
    };

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('aria-label', `Edit task: ${task.text}`);
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Task cannot be empty');
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
  taskInput.focus();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    const trimmed = newText.trim();
    if (trimmed) {
      tasks[index].text = trimmed;
      saveTasks();
      renderTasks();
    }
  }
}

addBtn.addEventListener('click', addTask);

// Allow adding task by pressing Enter key on input
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial render on page load
renderTasks();
