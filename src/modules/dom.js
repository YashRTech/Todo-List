import * as Logic from "./logic.js";
import { updateDataInLocalStorage } from "./localstorage.js";

let editMode = true;
let editProjectId = null;
let currentProjectId = null;
let editTodoId = null;
let currentTab = "All";

const overlay = document.querySelector(".overlay");
const projectInputContainer = document.querySelector(
  ".project-input-container"
);
const todoInputContainer = document.querySelector(".todo-input-container");
const projectName = document.querySelector("#project-name");
const todoTitle = document.querySelector("#todo-title");
const todoDescription = document.querySelector("#todo-description");
const todoDate = document.querySelector("#todo-date");
const btnAddTodo = document.querySelector(".todo-add-btn");

const projectsContainer = document.querySelector(".projects-container");
const todoContainer = document.querySelector(".todo-container");
const addNewTodo = document.querySelector(".add-new-todo");
const projectAddBtn = document.querySelector(".project-add-btn");
const todoHeaderTitle = document.querySelector(".todo-header-title");
const projectHeaderTitle = document.querySelector(".project-header-title");
const priorities = document.querySelectorAll("input[name='Priority']");

function disable(...elems) {
  elems.forEach((elem) => {
    elem.disabled = true;
  });
}
function enable(...elems) {
  elems.forEach((elem) => {
    elem.disabled = false;
  });
}
function changeTodoAddBtnText(text) {
  btnAddTodo.textContent = text;
  todoHeaderTitle.textContent = text;
}
function changeProjectAddBtnText(text) {
  projectAddBtn.textContent = text;
  projectHeaderTitle.textContent = text;
}
function unCheckAllPriortiy() {
  const priority = document.querySelectorAll("input[name='Priority']");
  priority.forEach((prio) => (prio.checked = false));
}
function getCurrentPriority() {
  const priority = document.querySelector('input[name="Priority"]:checked');
  return priority;
}
function selectPriority(priorityId) {
  const priority = document.querySelector(`#${priorityId}`);
  if (priority) {
    priority.checked = true;
  }
}

const checkEmptyValue = (value) => {
  //! Matches empty string and all white spaces.
  if (/^\s*$/.test(value)) return true;
};
const addHiddenClass = (elem) => {
  elem.classList.add("hidden");
};
const removeHiddenClass = (elem) => {
  elem.classList.remove("hidden");
};
const clearInputs = () => {
  projectName.value = "";
  todoTitle.value = "";
  todoDescription.value = "";
  todoDate.value = "";
  unCheckAllPriortiy();
};
export const displayAllProjects = () => {
  let allProjects = Logic.allProjects();
  // Clear before updating
  projectsContainer.textContent = "";
  allProjects.forEach((project) => {
    let newProject = document.createElement("div");
    newProject.setAttribute("id", project.id);
    newProject.innerHTML = `<a href="#" class="project-link">
    <p class="project-text">${project.name}</p>
    <div class="project-right">
        <i class="fa-solid fa-pen-to-square edit-project"></i>
        <i class="fa-solid fa-trash delete-project"></i>
    </div>
  </a>`;
    projectsContainer.appendChild(newProject);
  });
};

export const displayProjectModal = () => {
  addHiddenClass(todoInputContainer);
  removeHiddenClass(overlay);
  removeHiddenClass(projectInputContainer);
};
export const displayTodoModal = () => {
  addHiddenClass(projectInputContainer);
  removeHiddenClass(overlay);
  removeHiddenClass(todoInputContainer);
};
export const closeModals = () => {
  clearInputs();
  addHiddenClass(todoInputContainer);
  addHiddenClass(projectInputContainer);
  addHiddenClass(overlay);
  removeHiddenClass(btnAddTodo);
  enable(todoTitle, todoDescription, todoDate, ...priorities);
  changeTodoAddBtnText("Add");
  changeProjectAddBtnText("Add");
};
export const addAndEditProjectToDom = () => {
  if (checkEmptyValue(projectName.value)) return;

  if (editMode && editProjectId) {
    Logic.editProjectName(editProjectId, projectName.value);
    displayMainHeading(projectName.value);
  } else {
    Logic.createAndUpdateProjects(projectName.value);
  }

  displayAllProjects();
  closeModals();

  // Reset
  editMode = false;
  editProjectId = null;
};
export const deleteProject = (projectId) => {
  Logic.deleteAndUpdateProjects(projectId);
  displayAllProjects();
  displayAllTodos();
};

//! For Todos
function displayTodos(todos) {
  todoContainer.textContent = "";
  todos.forEach((todo) => {
    let div = document.createElement("div");
    div.dataset.todoId = todo.todoId;
    div.dataset.projectId = todo.projectId;
    let check = "";
    if (todo.isCompleted) {
      check = "checked";
    }
    div.classList.add("todo");
    div.innerHTML = `<div>
        <p class="tick"><input type="checkbox" class="checkbox" ${check}> <span class="todo-title">${
          todo.title
        }</span></p>
      </div>
      <div class="todo-right">
      <p class="priority priority-${
        todo.priority
      }">${todo.priority.toUpperCase()}</p>
        <p class="todo-date">${todo.dueDate}</p>
        <p>
          <i class="fa-solid fa-pen-to-square todo-edit"></i>
        </p>
        <p class="todo-delete">
          <i class="fa-solid fa-trash todo-delete"></i>
        </p>
        <p>
          <i class="fa-solid fa-info-circle fa-lg todo-details"></i>
        </p>
      </div>`;
    todoContainer.appendChild(div);
  });
}
export function addTodoToDom() {
  if (checkEmptyValue(todoTitle.value)) return;
  const todoPriority = getCurrentPriority();

  if (!todoPriority) {
    alert("You must have to choose any one of the priority");
    return;
  };

  if (editMode && editTodoId && editProjectId) {
    let currentTodo = Logic.getCurrentTodo(editTodoId, editProjectId);
    Logic.editTodo(editTodoId, editProjectId, [
      todoTitle.value,
      todoDescription.value,
      todoDate.value,
      todoPriority.id,
      currentTodo.isCompleted
    ]);
  } else {
    Logic.createAndUpdateTodoToProject(currentProjectId, [
      todoTitle.value,
      todoDescription.value,
      todoDate.value,
      todoPriority.id,
    ]);
  }

  closeModals();
  if (currentTab === "All") {
    displayAllTodos();
  } else {
    displayCurrentProjectTodos(currentProjectId);
  }
  // Reset
  editMode = false;
  editTodoId = null;
  editProjectId = null;
}

export function displayCurrentProjectTodos(projectId) {
  let currentProject = Logic.getCurrentProject(projectId);
  displayMainHeading(currentProject.name)
  displayTodos(currentProject.todos);
}
export function deleteTodo(todoId, projectId) {
  Logic.deleteAndUpdateTodo(todoId, projectId);
  if (currentTab === "All") {
    displayAllTodos();
    return;
  }
  const currentProjectTodos = Logic.getCurrentProject(projectId).todos;
  displayTodos(currentProjectTodos);
}

export function displayAllTodos() {
  currentTab = "All";
  addHiddenClass(addNewTodo);
  let allTodos = Logic.getAllTodos();
  displayMainHeading(currentTab);
  displayTodos(allTodos);
}

export function displayMainHeading(heading) {
  const mainHeading = document.querySelector(".heading-main");
  mainHeading.textContent = heading;
}

export function handleProjectContainer(e) {
  const project = e.target.closest("div[id]");
  if (!project) return;
  const projectId = project.id;

  if (e.target.classList.contains("delete-project")) {
    deleteProject(projectId);
    return;
  }

  if (e.target.classList.contains("edit-project")) {
    const projectToEdit = Logic.getCurrentProject(projectId);
    projectName.value = projectToEdit.name;
    editMode = true;
    editProjectId = projectId;
    changeProjectAddBtnText("Edit");
    displayProjectModal();
    return;
  }

  const currentProject = Logic.getCurrentProject(projectId);
  currentProjectId = projectId;
  currentTab = currentProject.name;
  displayMainHeading(currentTab);
  removeHiddenClass(addNewTodo);
  displayTodos(currentProject.todos);
}
export function handleTodoContainer(e) {
  const todo = e.target.closest("div[data-todo-id]");
  if (!todo) return;
  const todoId = todo.dataset.todoId;
  const projectId = todo.dataset.projectId;

  if (
    e.target.classList.contains("todo-date") ||
    e.target.classList.contains("priority")
  ) {
    return;
  }

  if (e.target.classList.contains("todo-delete")) {
    deleteTodo(todoId, projectId);
    return;
  }

  if (e.target.classList.contains("todo-edit")) {
    const todoToEdit = Logic.getCurrentTodo(todoId, projectId);
    todoTitle.value = todoToEdit.title;
    todoDescription.value = todoToEdit.description;
    todoDate.value = todoToEdit.dueDate;
    selectPriority(todoToEdit.priority);

    editMode = true;
    editTodoId = todoId;
    editProjectId = projectId;
    changeTodoAddBtnText("Edit");
    displayTodoModal();
    return;
  }

  if (e.target.classList.contains("todo-details")) {
    const todoToView = Logic.getCurrentTodo(todoId, projectId);
    todoTitle.value = todoToView.title;
    todoDescription.value = todoToView.description;
    todoDate.value = todoToView.dueDate;
    selectPriority(todoToView.priority);

    disable(todoTitle, todoDescription, todoDate, ...priorities);
    changeTodoAddBtnText("View");
    addHiddenClass(btnAddTodo);
    displayTodoModal();
    return;
  }

  let todoFromData = Logic.getCurrentTodo(todoId, projectId);
  let checkbox = todo.querySelector("input");
  if (e.target.classList.contains("checkbox")) {
    checkbox.checked = !checkbox.checked;
    todoFromData.isCompleted = !todoFromData.isCompleted;
    updateDataInLocalStorage();
    return
  }

  // Toggles checkbox
  checkbox.checked = !checkbox.checked;
  todoFromData.isCompleted = !todoFromData.isCompleted;
  updateDataInLocalStorage();
}
