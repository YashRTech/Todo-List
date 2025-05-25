import * as Logic from "./logic.js";

let editMode = true;
let editProjectId = null;
let currentProjectId = null;
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

const projectsContainer = document.querySelector(".projects-container");
const todoContainer = document.querySelector(".todo-container");

//! For edit and delete projects
projectsContainer.addEventListener("click", (e) => {
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
    displayProjectModal();
    return;
  }

  const currentProject = Logic.getCurrentProject(projectId);
  currentProjectId = projectId;
  currentTab = currentProject.name;
  displayTodos(currentProject.todos);
});

todoContainer.addEventListener("click", (e) => {
  const todo = e.target.closest("div[data-todo-id]");
  if (!todo) return;
  const todoId = todo.dataset.todoId;
  const projectId = todo.dataset.projectId;
  
  if (e.target.classList.contains("todo-delete")) {
    deleteTodo(todoId,projectId);
  }
})

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
};
const displayAllProjects = () => {
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
};
export const addAndEditProjectToDom = () => {
  if (checkEmptyValue(projectName.value)) return;

  if (editMode && editProjectId) {
    Logic.editProjectName(editProjectId, projectName.value);
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
};

window.addEventListener("DOMContentLoaded", displayAllProjects);

//! For Todos
function displayTodos(todos) {
  todoContainer.textContent = "";
  todos.forEach((todo) => {
    let div = document.createElement("div");
    div.dataset.todoId = todo.todoId;
    div.dataset.projectId = todo.projectId;
    div.classList.add("todo");
    div.innerHTML = `<div>
        <p class="tick">${todo.title}</p>
      </div>
      <div class="todo-right">
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

  Logic.createAndUpdateTodoToProject(currentProjectId, [
    todoTitle.value,
    todoDescription.value,
    todoDate.value,
  ]);
  const currentProject = Logic.getCurrentProject(currentProjectId);

  displayTodos(currentProject.todos);
  closeModals();
}

export function displayCurrentProjectTodos(projectId) {
  let currentProject = Logic.getCurrentProject(projectId);
  displayTodos(currentProject.todos);
}
export function deleteTodo(todoId,projectId) {
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
  let allTodos = Logic.getAllTodos();
  displayTodos(allTodos);
}





