const allTasks = document.querySelector('.tasks');
const taskInput = document.querySelector('.add-task-input');
const submitBtn = document.querySelector('.add-task-btn');

submitBtn.addEventListener('click', function (e) {
  e.preventDefault;
  createTask();
});

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
  taskOptions.appendChild(editBtn);

  const deleteBtn = document.createElement('i');
  deleteBtn.classList.add('fas');
  deleteBtn.classList.add('fa-trash');
  taskOptions.appendChild(deleteBtn);
}
