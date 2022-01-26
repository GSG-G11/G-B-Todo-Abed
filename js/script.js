const allTasks = document.querySelector('.tasks');
const taskInput = document.querySelector('.add-task-input');
const submitBtn = document.querySelector('.add-task-btn');
const body = document.querySelector('body');

body.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    deleteTask(e);
  }

  if (e.target.classList.contains('edit')) {
    editTask(e);
  }

  if (e.target.classList.contains('btn')) {
    e.target.classList.toggle('complete-btn');
    const completeTask = e.target.parentElement.querySelector('h3');
    completeTask.classList.toggle('complete-task');
  }
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault;
  createTask(e);
});

//Delete Task
function deleteTask(e) {
  e.target.parentElement.parentElement.remove();
}

//Edit Task

function editTask(e) {
  const takRow = e.target.parentElement.parentElement;
  const taskEdited = takRow.querySelector('h3');
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
