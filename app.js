const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createElement = function (tagName, options = {}) {
  const element = document.createElement(tagName);
  if (options.type) element.type = options.type;
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;
  if (options.src) element.src = options.src;
  return element;
};

const createNewTaskElement = function (taskText) {
  const taskElement = document.createElement('li');

  const checkbox = createElement('input', {
    type: 'checkbox',
  });

  const label = createElement('label', {
    className: 'task-text',
    text: taskText,
  });

  const editInput = createElement('input', {
    type: 'text',
    className: 'task-text',
  });

  const editButton = createElement('button', {
    className: 'edit-button',
    text: 'Edit',
  });

  const deleteButton = createElement('button', {
    className: 'delete-button',
  });

  const deleteButtonImage = createElement('img', {
    src: './remove.svg',
  });

  deleteButton.appendChild(deleteButtonImage);
  taskElement.append(checkbox, label, editInput, editButton, deleteButton);
  return taskElement;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  incompleteTasksList.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit-button');
  const isEditMode = taskElement.classList.contains('edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskElement.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  const parentList = taskElement.parentNode;
  parentList.removeChild(taskElement);
};

// Move a task to the specified list and update its event handlers.
const moveTask = function (taskElement, destinationList, checkboxChangeHandler) {
  destinationList.appendChild(taskElement);
  bindTaskEvents(taskElement, checkboxChangeHandler);
};

const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskElement, checkboxChangeHandler) {
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit-button');
  const deleteButton = taskElement.querySelector('button.delete-button');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxChangeHandler;
};

// Bind events to all existing tasks in a list.
const bindTasksInList = function (taskList, checkboxChangeHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkboxChangeHandler);
  }
};

bindTasksInList(incompleteTasksList, taskCompleted);
bindTasksInList(completedTasksList, taskIncomplete);
