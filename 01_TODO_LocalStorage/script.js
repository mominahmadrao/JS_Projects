document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('input-box');
  const listContainer = document.getElementById('list-container');
  const addButton = document.querySelector('.row button');

  // Load tasks from localStorage or start with empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTasks();

  // Add task on button click
  addButton.addEventListener('click', () => {
    const text = inputBox.value.trim();
    if (!text) {
      alert('You must write something');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    inputBox.value = ''; // clear input
  });

  listContainer.addEventListener('click', (e) => {
    const li = e.target.closest('li'); // move up and finds the nearest parent 'li'
    if (!li) return; // clicked outside a task
    const taskId = Number(li.dataset.id);

    if (e.target.classList.contains('delete')) {
      // Delete task
      tasks = tasks.filter((task) => task.id !== taskId);
      saveTasks();
      renderTasks();
      return;
    }

    // Toggle completed
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  });

  // Save tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Render tasks dynamically
  function renderTasks() {
    listContainer.innerHTML = ''; // clear existing tasks
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.setAttribute('data-id', task.id);
      li.classList.toggle('checked', task.completed); // element.classList.toggle(className, force) , force is boolean
      li.innerHTML = `
      <span>${task.text}</span>
      <span class="delete">\u00D7</span>
     `;

      listContainer.appendChild(li);
    });
  }
});
