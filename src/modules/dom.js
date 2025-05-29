import * as Logic from "./logic.js";
import { updateDataInLocalStorage } from "./localstorage.js";
import { format, isWithinInterval, parse, addDays, startOfDay } from "date-fns";
import {
  disable,
  enable,
  changeTodoAddBtnText,
  changeProjectAddBtnText,
  unCheckAllPriortiy,
  getCurrentPriority,
  selectPriority,
  displayTaskCount,
  checkEmptyValue,
  addHiddenClass,
  removeHiddenClass,
  transform,
  removeActiveClass,
  isMobile,
  addActiveTabClass,
  removeActiveTabClass,
} from "./utility.js";

let editMode = true;
let editProjectId = null;
let currentProjectId = null;
let editTodoId = null;
let currentTab = "All";
let task = null;

const overlay = document.querySelector(".overlay");

// input containers
const projectInputContainer = document.querySelector(
  ".project-input-container"
);
const todoInputContainer = document.querySelector(".todo-input-container");

// Project Inputs
const projectName = document.querySelector("#project-name");

/* Todo Inputs */
const todoTitle = document.querySelector("#todo-title");
const todoDescription = document.querySelector("#todo-description");
const todoDate = document.querySelector("#todo-date");
const btnAddTodo = document.querySelector(".todo-add-btn");

// Containers that display all todos and projects
const projectsContainer = document.querySelector(".projects-container");
const todoContainer = document.querySelector(".todo-container");

// Add new Todo Modal
const addNewTodo = document.querySelector(".add-new-todo");

const priorities = document.querySelectorAll("input[name='Priority']");

// Delete Modal
const deleteModal = document.querySelector(".delete-modal");

// Sidebar
const sidebar = document.querySelector("#sidebar-menu");
const hamMenu = document.querySelector("#menuToggle");

// Tabs
const allTab = document.querySelector(".all-tab");
const completedTab = document.querySelector(".completed-tab");
const importantTab = document.querySelector(".important-tab");
const weekTab = document.querySelector(".week-tab");
const todayTab = document.querySelector(".today-tab");

// Our Functions
function clearInputs() {
  projectName.value = "";
  todoTitle.value = "";
  todoDescription.value = "";
  todoDate.value = "";
  unCheckAllPriortiy();
}
export function displayMainHeading(heading) {
  const mainHeading = document.querySelector(".heading-main");
  mainHeading.textContent = heading;
}
function getNext7DaysTodos(todos) {
  const today = startOfDay(new Date()); // current date without time
  const sevenDaysLater = addDays(today, 7); // aaj se 7 din baad tak

  return todos.filter((todo) => {
    const todoDate = parse(todo.dueDate, "dd MMM yyyy", new Date()); // parses date String into date object
    return isWithinInterval(todoDate, {
      start: today,
      end: sevenDaysLater,
    });
  });
}

// Delete Modals
function displayDeleteModal() {
  removeHiddenClass(overlay);
  removeHiddenClass(deleteModal);
}
export function closeDeleteModal() {
  addHiddenClass(overlay);
  addHiddenClass(deleteModal);
}
function editDeleteModal(projectOrTask, projectNameOrTaskTitle) {
  const deleteModalTitle = document.querySelector(".delete-modal-title");
  const deleteModalProjectOrTodoName = document.querySelector(
    ".delete-project-or-todo-name"
  );
  deleteModalTitle.textContent = projectOrTask;
  deleteModalProjectOrTodoName.textContent = projectNameOrTaskTitle;
}
export function handleConfirmDelete() {
  if (task === "Project") {
    deleteProject(editProjectId);
  }
  if (task === "Todo") {
    deleteTodo(editTodoId, editProjectId);
  }
  closeDeleteModal();
}

// Input Modals
export function displayProjectModal() {
  addHiddenClass(todoInputContainer);
  removeHiddenClass(overlay);
  removeHiddenClass(projectInputContainer);
}
export function displayTodoModal() {
  const priority = document.querySelector("input[id='high']");
  priority.checked = true;
  addHiddenClass(projectInputContainer);
  removeHiddenClass(overlay);
  removeHiddenClass(todoInputContainer);
}
export function closeModals() {
  clearInputs();
  addHiddenClass(todoInputContainer);
  addHiddenClass(projectInputContainer);
  addHiddenClass(overlay);
  removeHiddenClass(btnAddTodo);
  enable(todoTitle, todoDescription, todoDate, ...priorities);
  changeTodoAddBtnText("Add");
  changeProjectAddBtnText("Add");
}

// For projects
export function displayAllProjects() {
  let allProjects = Logic.allProjects();
  // Clear before updating
  projectsContainer.textContent = "";
  allProjects.forEach((project) => {
    let newProject = document.createElement("div");
    newProject.setAttribute("id", project.id);
    let active = "";
    if (currentProjectId === project.id) {
      active = "active-tab";
    }
    newProject.innerHTML = `<a href="#" class="project-link ${active}" data-tab>
    <p class="project-text"><i class="fa-solid fa-screwdriver-wrench"></i> ${project.name}</p>
    <div class="project-right">
        <i class="fa-solid fa-pen-to-square edit-project"></i>
        <i class="fa-solid fa-trash delete-project"></i>
    </div>
  </a>`;
    projectsContainer.appendChild(newProject);
  });
}
export function addAndEditProjectToDom() {
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
}
export function deleteProject(projectId) {
  Logic.deleteAndUpdateProjects(projectId);
  displayAllProjects();
  displayAllTodos();
}

// For Todos
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
        <p class="todo-left"><input type="checkbox" class="checkbox" ${check}> <span class="todo-title">${
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
  }

  if (editMode && editTodoId && editProjectId) {
    let currentTodo = Logic.getCurrentTodo(editTodoId, editProjectId);
    Logic.editTodo(editTodoId, editProjectId, [
      todoTitle.value,
      todoDescription.value,
      todoDate.value,
      todoPriority.id,
      currentTodo.isCompleted,
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
  switch (currentTab) {
    case "All":
      displayAllTodos();
      break;
    case "Completed":
      displayCompletedTab();
      break;
    case "Important":
      displayImportantTab();
      break;
    case "Today":
      displayTodayTab();
      break;
    case "Week":
      displayWeekTab();
      break;
    default:
      displayCurrentProjectTodos(currentProjectId);
  }

  // Reset
  editMode = false;
  editTodoId = null;
  editProjectId = null;
}
export function displayCurrentProjectTodos(projectId) {
  let currentProject = Logic.getCurrentProject(projectId);
  displayMainHeading(currentProject.name);
  displayTaskCount(currentProject.todos.length);
  displayTodos(currentProject.todos);
}
export function deleteTodo(todoId, projectId) {
  Logic.deleteAndUpdateTodo(todoId, projectId);
  switch (currentTab) {
    case "All":
      displayAllTodos();
      return;
    case "Completed":
      displayCompletedTab();
      return;
    case "Important":
      displayImportantTab();
      return;
    case "Today":
      displayTodayTab();
      return;
    case "Week":
      displayWeekTab();
      return;
  }
  const currentProjectTodos = Logic.getCurrentProject(projectId).todos;
  displayTodos(currentProjectTodos);
}

// Handling Main containers
export function handleProjectContainer(e) {
  const project = e.target.closest("div[id]");
  if (!project) return;
  const projectId = project.id;

  if (e.target.classList.contains("delete-project")) {
    const projectToDelete = Logic.getCurrentProject(projectId);
    task = "Project";
    editDeleteModal(task, projectToDelete.name);
    displayDeleteModal();
    editProjectId = projectId;
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
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();

  if (e.target.classList.contains("project-text")) {
    addActiveTabClass(e.target.parentElement);
  } else {
    addActiveTabClass(e.target);
  }
  displayMainHeading(currentTab);
  displayTaskCount(currentProject.todos.length);
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
    task = "Todo";
    const todoToDelete = Logic.getCurrentTodo(todoId, projectId);
    editDeleteModal(task, todoToDelete.title);
    displayDeleteModal();
    editProjectId = projectId;
    editTodoId = todoId;
    return;
  }

  if (e.target.classList.contains("todo-edit")) {
    const todoToEdit = Logic.getCurrentTodo(todoId, projectId);
    todoTitle.value = todoToEdit.title;
    todoDescription.value = todoToEdit.description;
    if (todoToEdit.dueDate) {
      todoDate.value = format(new Date(todoToEdit.dueDate), "yyyy-MM-dd");
    }
    editMode = true;
    editTodoId = todoId;
    editProjectId = projectId;
    changeTodoAddBtnText("Edit");
    displayTodoModal();

    // We are selecting select priority here because we have add checked true for high automatically so we call it first then it will override on current todo priority
    selectPriority(todoToEdit.priority);
    return;
  }

  if (e.target.classList.contains("todo-details")) {
    const todoToView = Logic.getCurrentTodo(todoId, projectId);
    todoTitle.value = todoToView.title;
    todoDescription.value = todoToView.description;
    if (todoToView.dueDate) {
      todoDate.value = format(new Date(todoToView.dueDate), "yyyy-MM-dd");
    }
    
    disable(todoTitle, todoDescription, todoDate, ...priorities);
    changeTodoAddBtnText("View");
    addHiddenClass(btnAddTodo);
    displayTodoModal();
    selectPriority(todoToView.priority);
    return;
  }

  let todoFromData = Logic.getCurrentTodo(todoId, projectId);
  let checkbox = todo.querySelector("input[type='checkbox']");
  if (e.target.classList.contains("checkbox")) {
    todoFromData.isCompleted = !todoFromData.isCompleted;
    updateDataInLocalStorage();
    return;
  }

  // Toggles checkbox
  checkbox.checked = !checkbox.checked;
  todoFromData.isCompleted = !todoFromData.isCompleted;
  updateDataInLocalStorage();
}

// for Tabs
export function displayCompletedTab() {
  const allTodos = Logic.getAllTodos();
  addHiddenClass(addNewTodo);
  const completedTodos = allTodos.filter((todo) => todo.isCompleted);
  currentTab = "Completed";
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();
  addActiveTabClass(completedTab);
  displayMainHeading(currentTab);
  displayTaskCount(completedTodos.length);
  displayTodos(completedTodos);
}
export function displayImportantTab() {
  const allTodos = Logic.getAllTodos();
  addHiddenClass(addNewTodo);
  const importantTodos = allTodos.filter((todo) => todo.priority === "high");
  currentTab = "Important";
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();
  addActiveTabClass(importantTab);
  displayMainHeading(currentTab);
  displayTaskCount(importantTodos.length);
  displayTodos(importantTodos);
}
export function displayTodayTab() {
  const allTodos = Logic.getAllTodos();
  addHiddenClass(addNewTodo);
  const today = format(new Date(), "dd MMM yyyy");

  const todayTodos = allTodos.filter((todo) => todo.dueDate === today);
  currentTab = "Today";
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();
  addActiveTabClass(todayTab);
  displayMainHeading(currentTab);
  displayTaskCount(todayTodos.length);
  displayTodos(todayTodos);
}
export function displayWeekTab() {
  const allTodos = Logic.getAllTodos();
  addHiddenClass(addNewTodo);
  const weekTodos = getNext7DaysTodos(allTodos);

  currentTab = "Week";
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();
  addActiveTabClass(weekTab);
  displayMainHeading(currentTab);
  displayTaskCount(weekTodos.length);
  displayTodos(weekTodos);
}
export function displayAllTodos() {
  currentTab = "All";
  addHiddenClass(addNewTodo);
  let allTodos = Logic.getAllTodos();
  if (isMobile()) {
    removeActiveClass(hamMenu);
    transform(sidebar, -300);
  }
  removeActiveTabClass();
  addActiveTabClass(allTab);
  displayMainHeading(currentTab);
  displayTaskCount(allTodos.length);
  displayTodos(allTodos);
}

// Menu Toggle
export function handleMenuToggle() {
  hamMenu.classList.toggle("active");
  if (hamMenu.classList.contains("active")) {
    transform(sidebar, 0);
    return;
  }
  transform(sidebar, -300);
}
