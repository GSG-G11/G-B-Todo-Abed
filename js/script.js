const allTasks = document.querySelector('.tasks');
const taskInput = document.querySelector('.modal-task-input');
const submitBtn = document.querySelector('.add-task-btn');
const createTaskBtn = document.querySelector('.create-task');
const container = document.querySelector('.container');
// Get the modal
const modal = document.getElementsByClassName('modal')[0];
const editModal = document.getElementsByClassName('edit-modal')[0];

const body = document.querySelector('body');

//Get tasks from local storage
let tasks = localStorage.getItem('tasks');
if (tasks === null) {
  tasks = [];
} else {
  tasks = JSON.parse(tasks);
}

document.addEventListener('DOMContentLoaded', getTasks);
document.addEventListener('DOMContentLoaded', updateTaskNumber);

//Check Tasks
checkTasks();

//TasksNumber r
function updateTaskNumber() {
  const tasksNumber = document.querySelector('.task-num');
  tasksNumber.textContent = `${tasks.length} tasks left`;
}

//Get Tasks from Local Storage
function getTasks() {
  tasks.forEach(item => {
    const taskRow = document.createElement('div');
    taskRow.classList.add('task-row');
    allTasks.appendChild(taskRow);

    const task = document.createElement('div');
    task.classList.add('task');
    taskRow.appendChild(task);

    const taskId = item.id;
    const idContainer = document.createElement('input');
    idContainer.setAttribute('type', 'hidden');
    idContainer.setAttribute('value', taskId);
    task.appendChild(idContainer);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('btn');
    task.appendChild(completeBtn);

    const taskTitle = document.createElement('h3');

    taskTitle.textContent = item.task;

    if (item.task.trim() == '') {
      taskTitle.textContent = 'Empty Task';
    }

    const taskDate = document.querySelector('.task-date').value;
    const taskDetails = document.querySelector('.task-description').value;

    task.appendChild(taskTitle);

    const taskOptions = document.createElement('div');
    taskOptions.classList.add('task-options');
    taskRow.appendChild(taskOptions);

    const detailsBtn = document.createElement('i');
    detailsBtn.classList.add('fas');
    detailsBtn.classList.add('fa-book-open');
    detailsBtn.classList.add('details');
    taskOptions.appendChild(detailsBtn);

    const editBtn = document.createElement('i');
    editBtn.classList.add('fas');
    editBtn.classList.add('fa-edit');
    editBtn.classList.add('edit');
    taskOptions.appendChild(editBtn);

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas');
    deleteBtn.classList.add('fa-trash');
    deleteBtn.classList.add('delete');
    taskOptions.appendChild(deleteBtn);
  });
}

function clearNoTask() {
  const noTask = document.querySelector('.no-tasks');
  if (noTask) noTask.remove();
}

//Check clicking of Buttons for each task
body.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    deleteTask(e);
    deleteFromLocalStorage(e);
    checkTasks();
  }

  if (e.target.classList.contains('edit')) {
    editTaskModal(e);
  }

  if (e.target.classList.contains('details')) {
    showDetailsModal(e);
  }

  if (e.target.classList.contains('btn')) {
    e.target.classList.toggle('complete-btn');
    const completeTask = e.target.parentElement.querySelector('h3');
    completeTask.classList.toggle('complete-task');

    //Find the task in local storage by id
    const taskId = e.target.parentElement.querySelector('input').value;
    const taskIndex = tasks.findIndex(function (item) {
      return item.id == taskId;
    });

    //Update the task in local storage
    tasks[taskIndex].status = !tasks[taskIndex].status;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //Update in the array
    tasks[taskIndex].status = !tasks[taskIndex].status;
  }
});

//Delete Task

function deleteTask(e) {
  const taskRow = e.target.parentElement.parentElement;
  taskRow.remove();
}

//Edit Task Modal

function editTaskModal(e) {
  const taskRow = e.target.parentElement.parentElement;
  const taskId = taskRow.querySelector('input').value;
  const taskIndex = tasks.findIndex(function (item) {
    return item.id == taskId;
  });

  const closeModal = editModal.querySelector('.close');
  closeModal.onclick = function () {
    editModal.style.display = 'none';
  };

  const task = tasks[taskIndex];

  editModal.style.display = 'block';
  editModal.querySelector('.modal-task-input').value = task.task;
  editModal.querySelector('.task-date').value = task.date;
  editModal.querySelector('.task-description').value = task.details;

  const updateBtn = editModal.querySelector('.edit-task-btn');

  //Update the Task description on click
  updateBtn.onclick = function () {
    const task = tasks[taskIndex];
    const taskTitle = editModal.querySelector('.modal-task-input').value;
    const taskDate = editModal.querySelector('.task-date').value;
    const taskDetails = editModal.querySelector('.task-description').value;

    taskRow.querySelector('h3').textContent = taskTitle;
    task.task = taskTitle;
    task.date = taskDate;
    task.details = taskDetails;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    editModal.style.display = 'none';
  };
}
//Create Task
function createTask() {
  const taskEntered = taskInput.value;
  const taskRow = document.createElement('div');
  taskRow.classList.add('task-row');
  allTasks.appendChild(taskRow);

  const task = document.createElement('div');
  task.classList.add('task');
  taskRow.appendChild(task);

  const taskId = new Date().getTime();
  const idContainer = document.createElement('input');
  idContainer.setAttribute('type', 'hidden');
  idContainer.setAttribute('value', taskId);
  task.appendChild(idContainer);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('btn');
  task.appendChild(completeBtn);

  const taskTitle = document.createElement('h3');

  taskTitle.textContent = taskEntered;

  if (taskEntered.trim() == '') {
    taskTitle.textContent = 'Empty Task';
  }

  const taskDate = document.querySelector('.task-date').value;
  const taskDetails = document.querySelector('.task-description').value;

  task.appendChild(taskTitle);

  const taskOptions = document.createElement('div');
  taskOptions.classList.add('task-options');
  taskRow.appendChild(taskOptions);

  const detailsBtn = document.createElement('i');
  detailsBtn.classList.add('fas');
  detailsBtn.classList.add('fa-book-open');
  detailsBtn.classList.add('details');
  taskOptions.appendChild(detailsBtn);

  const editBtn = document.createElement('i');
  editBtn.classList.add('fas');
  editBtn.classList.add('fa-edit');
  editBtn.classList.add('edit');
  taskOptions.appendChild(editBtn);

  const deleteBtn = document.createElement('i');
  deleteBtn.classList.add('fas');
  deleteBtn.classList.add('fa-trash');
  deleteBtn.classList.add('delete');
  taskOptions.appendChild(deleteBtn);

  const item = {
    id: taskId,
    task: taskEntered,
    date: taskDate,
    details: taskDetails,
    status: false,
  };

  tasks.push(item);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  clearNoTask();

  //Clear Input
  taskInput.value = '';
}

//Delete from local Storage
function deleteFromLocalStorage(e) {
  const taskRow = e.target.parentElement.parentElement;
  const taskEdited = taskRow.querySelector('h3');
  const taskEditedText = taskEdited.textContent;
  const taskEditedIndex = tasks.findIndex(function (item) {
    return item.task === taskEditedText;
  });

  tasks.splice(taskEditedIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Modal

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal

function showDetailsModal(e) {
  const detailModal = document.createElement('div');
  detailModal.classList.add('modal');
  container.appendChild(detailModal);
  const detailModalContent = document.createElement('div');
  detailModalContent.classList.add('modal-content');
  detailModal.appendChild(detailModalContent);
  const closeModal = document.createElement('span');
  closeModal.classList.add('close');
  closeModal.innerHTML = '&times;';

  detailModalContent.appendChild(closeModal);

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Task Details';
  detailModalContent.appendChild(modalTitle);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  detailModalContent.appendChild(modalBody);

  const taskRow = e.target.parentElement.parentElement;
  const taskTitle = taskRow.querySelector('h3');

  const modalTask = document.createElement('p');
  modalTask.textContent = taskTitle.textContent;
  modalBody.appendChild(modalTask);

  const taskDate = document.createElement('p');
  taskDate.textContent = 'Date Created: ' + new Date().toDateString();
  modalBody.appendChild(taskDate);

  const taskDescription = document.createElement('p');
  taskDescription.textContent = 'Description: ' + taskTitle.textContent;
  modalBody.appendChild(taskDescription);

  const taskStatus = document.createElement('p');
  taskStatus.textContent = `Status: ${
    taskTitle.classList.contains('complete-task') ? 'Completed' : 'Incomplete'
  }`;
  modalBody.appendChild(taskStatus);

  detailModal.style.display = 'block';

  closeModal.addEventListener('click', function (e) {
    detailModal.remove();
  });

  //Close the modal when clicked outside the modal

  window.onclick = function (event) {
    if (event.target == detailModal) {
      detailModal.remove();
    }
  };
  console.log(taskRow);
}

submitBtn.onclick = function () {
  modal.style.display = 'block';
};

function closeModal() {
  modal.style.display = 'none';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }

  if (event.target == editModal) {
    editModal.style.display = 'none';
  }
};
function checkTasks() {
  if (tasks.length === 0) {
    const noTask = document.createElement('h1');
    noTask.textContent = 'You have no tasks to do';
    noTask.classList.add('no-tasks');
    allTasks.appendChild(noTask);
  }
}

createTaskBtn.addEventListener('click', function (e) {
  e.preventDefault;
  createTask(e);
  closeModal();
});
