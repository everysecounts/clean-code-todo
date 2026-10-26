const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const taskElement = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(editInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
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
  const editButton = taskElement.querySelector('.edit');
  const isEditMode = taskElement.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskElement.classList.toggle('editMode');
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
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

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
