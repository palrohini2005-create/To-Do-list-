const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';
    li.addEventListener('click', () => toggleTask(index));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  taskCount.textContent = `${tasks.filter(t => !t.completed).length} tasks left`;
}

// Add task
addBtn.addEventListener('click', () => {
  if (taskInput.value.trim() !== '') {
    tasks.push({ text: taskInput.value, completed: false });
    saveAndRender();
    taskInput.value = '';
  }
});

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Save to localStorage and render
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Initial render
renderTasks();

