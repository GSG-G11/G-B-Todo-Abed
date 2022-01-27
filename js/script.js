const allTasks = document.querySelector('.tasks');
const taskInput = document.querySelector('.modal-task-input');
const submitBtn = document.querySelector('.add-task-btn');
const createTaskBtn = document.querySelector('.create-task');
const container = document.querySelector('.container');
// Get the modal
const modal = document.getElementById('myModal');

const body = document.querySelector('body');

body.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    deleteTask(e);
  }

  if (e.target.classList.contains('edit')) {
    editTask(e);
  }

  if (e.target.classList.contains('details')) {
    showDetailsModal(e);
  }

  if (e.target.classList.contains('btn')) {
    e.target.classList.toggle('complete-btn');
    const completeTask = e.target.parentElement.querySelector('h3');
    completeTask.classList.toggle('complete-task');
  }
});

createTaskBtn.addEventListener('click', function (e) {
  e.preventDefault;
  createTask(e);
  closeModal();
});

//Delete Task
function deleteTask(e) {
  e.target.parentElement.parentElement.remove();
}

//Edit Task

function editTask(e) {
  const taskRow = e.target.parentElement.parentElement;
  const taskEdited = taskRow.querySelector('h3');
  taskEdited.setAttribute('contenteditable', 'true');
  taskEdited.focus();

  taskEdited.addEventListener('blur', function (e) {
    taskEdited.removeAttribute('contenteditable', 'true');
    taskEdited.textContent = taskEdited.textContent.trim().replace(/\n/g, ' ');

    if (taskEdited.textContent.trim() == '') {
      taskEdited.textContent = 'Empty Task';
    }
  });

  taskEdited.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      taskEdited.removeAttribute('contenteditable');
      if (taskEdited.textContent.trim() == '') {
        taskEdited.textContent = 'Empty Task';
      }
    }
  });
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

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('btn');
  task.appendChild(completeBtn);

  const taskTitle = document.createElement('h3');

  taskTitle.textContent = taskEntered;

  if (taskEntered.trim() == '') {
    taskTitle.textContent = 'Empty Task';
  }

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
};
