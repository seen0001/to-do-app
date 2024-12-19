let taskIdCounter = 0;
let tasks = [];

function addTask() {
  const taskDescription = document.getElementById("taskInput").value;
  const quantity = document.getElementById("quantityInput").value;

  if (taskDescription.trim() === "") {
    console.log("Missing a task");
    alert("Please enter a task");
    return;
  }

  const task = {
    id: taskIdCounter++,
    taskDescription: taskDescription,
    quantity: quantity || null,
    isCompleted: false,
  };

  tasks.push(task);
  console.log("task udfyldt", task);

  document.getElementById("taskInput").value = "";
  document.getElementById("quantityInput").value = "";

  saveTasks();
  renderTasks();
}

function renderTasks() {
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");

    const doneButton = document.createElement("button");
    doneButton.textContent = "";
    doneButton.classList.add(task.isCompleted ? "undo" : "done");

    doneButton.onclick = () => {
      if (task.isCompleted) {
        undoTask(task.id);
      } else {
        doneTask(task.id);
      }
    };
    listItem.appendChild(doneButton);

    const taskText = document.createElement("span");
    taskText.innerHTML = task.taskDescription;

    if (task.isCompleted) {
      taskText.classList.add("completed");
    }

    listItem.appendChild(taskText);

    if (task.quantity) {
      const quantityText = document.createElement("span");
      quantityText.innerHTML = `${task.quantity}x `;
      listItem.appendChild(quantityText);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => deleteTask(task.id);
    listItem.appendChild(deleteButton);

    if (task.isCompleted) {
      listItem.classList.add("done");
      doneList.appendChild(listItem);
    } else {
      todoList.appendChild(listItem);
    }
  });
}

function deleteTask(taskId) {
  const taskToDelete = tasks.find((task) => task.id === taskId);
  console.log("taskToDelete", taskToDelete);

  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

function doneTask(taskId) {
  const taskDone = tasks.find((task) => task.id === taskId);
  taskDone.isCompleted = true;

  console.log("taskDone", taskDone);

  saveTasks();
  renderTasks();
}

function undoTask(taskId) {
  const taskUndo = tasks.find((task) => task.id === taskId);
  taskUndo.isCompleted = false;
  console.log("taskUndo", taskUndo);

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    taskIdCounter = tasks.length;
    renderTasks();
  }
}

window.onload = loadTasks;
