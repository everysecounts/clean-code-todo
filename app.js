//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct restaskListts.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incompleteTasks'); //taskList of #incompleteTasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskText) {
  const taskElement = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImage = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  //and appending.
  taskElement.appendChild(checkbox);
  taskElement.appendChild(label);
  taskElement.appendChild(editInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskElement = createNewTaskElement(taskInput.value);

  //Append taskElement to incompleteTasksList
  incompleteTasksList.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector('input[type=text]');
  const label = taskElement.querySelector('label');
  const editButton = taskElement.querySelector('.edit');
  const isEditMode = taskElement.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskElement.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskElement = this.parentNode;
  const parentList = taskElement.parentNode;
  //Remove the parent list item from the taskList.
  parentList.removeChild(taskElement);
};

// Move a task to the specified list and update its event handlers.
const moveTask = function (taskElement, destinationList, checkboxChangeHandler) {
  destinationList.appendChild(taskElement);
  bindTaskEvents(taskElement, checkboxChangeHandler);
};

// Move a checked task to the Completed list.
const taskCompleted = function () {
  moveTask(this.parentNode, completedTasksList, taskIncomplete);
};

// Move an unchecked task back to the Todo list.
const taskIncomplete = function () {
  moveTask(this.parentNode, incompleteTasksList, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskElement, checkboxChangeHandler) {
  //select taskElements children
  const checkbox = taskElement.querySelector('input[type=checkbox]');
  const editButton = taskElement.querySelector('button.edit');
  const deleteButton = taskElement.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkboxChangeHandler.
  checkbox.onchange = checkboxChangeHandler;
};

// Bind events to all existing tasks in a list.
const bindTasksInList = function (taskList, checkboxChangeHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkboxChangeHandler);
  }
};

// Bind events for initially incomplete tasks.
bindTasksInList(incompleteTasksList, taskCompleted);

// Bind events for initially completed tasks.
bindTasksInList(completedTasksList, taskIncomplete);
