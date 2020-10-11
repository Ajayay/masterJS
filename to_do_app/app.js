// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todos-filter");
//event listeners
document.addEventListener("DOMContentLoaded", updateTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterSelect);

//functions

function addToDo(event) {
  //will prevent from reloading of page when submit button is pressed.
  event.preventDefault();
  // create div tag
  const todoDiv = document.createElement("div");
  // add class to div tag
  todoDiv.classList.add("todo");
  // create LI
  const newToDo = document.createElement("li");
  //add class to the list tag
  newToDo.classList.add("todo-item");
  //add empty text to the field
  newToDo.innerText = todoInput.value;
  //add list to div
  todoDiv.appendChild(newToDo);
  // add todo to local storage
  saveLocalStorage(todoInput.value);
  // create check button
  const todoBtn = document.createElement("button");
  //add flat font
  todoBtn.innerHTML = '<i class = "fas fa-check" ></i>';
  // add class to check button
  todoBtn.classList.add("check-btn");
  // append class button to div
  todoDiv.appendChild(todoBtn);
  // append to todo-list class
  todoList.appendChild(todoDiv);
  // create delete button
  const todoDelete = document.createElement("button");
  //add flat font
  todoDelete.innerHTML = '<i class = "fas fa-trash" ></i>';
  // add class to delete button
  todoDelete.classList.add("del-btn");
  // append delete button to div
  todoDiv.appendChild(todoDelete);
  //clear input value
  todoInput.value = " ";
}

function deleteCheck(e) {
  const eventTriggered = e.target;
  if (eventTriggered.classList[0] === "del-btn") {
    const item = eventTriggered.parentElement;
    item.classList.add("fall");
    removeTaskFromLocalStorage(item);
    item.addEventListener("trasitioned", function() {
      item.remove();
    });
  }

  if (eventTriggered.classList[0] === "check-btn") {
    const item = eventTriggered.parentElement;
    item.classList.toggle("completed");
  }
}

function filterSelect(e) {
  // will return list of child nodes in todolist
  const selectedList = todoList.childNodes;
  // for each childnode get value and display accordingly
  selectedList.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newToDo = document.createElement("li");
    newToDo.classList.add("todo-item");
    newToDo.innerText = todo;
    todoDiv.appendChild(newToDo);
    const todoBtn = document.createElement("button");
    todoBtn.innerHTML = '<i class = "fas fa-check" ></i>';
    todoBtn.classList.add("check-btn");
    todoDiv.appendChild(todoBtn);
    todoList.appendChild(todoDiv);
    const todoDelete = document.createElement("button");
    todoDelete.innerHTML = '<i class = "fas fa-trash" ></i>';
    todoDelete.classList.add("del-btn");
    todoDiv.appendChild(todoDelete);
  });
}

function removeTaskFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const taskName = todo.children[0].innerText;
  todos.splice(todos.indexOf(taskName), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
