import * as Logic from "./logic.js";

let editMode = true;
let editProjectId = null;
let currentProjectId = null;

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
  if(!project) return
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
    return
  }

  const currentProject = Logic.getCurrentProject(projectId);
  displayTodosOfProject(currentProject);
});


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
function displayTodosOfProject(project) {
  todoContainer.textContent = "";
  project.todos.forEach((todo) => {
    let div = document.createElement("div");
    div.classList.add("todo");
    div.innerHTML = `<div>
        <p class="tick">${todo.title}</p>
      </div>
      <div class="todo-right">
        <p class="date">${todo.dueDate}</p>
        <p class="edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </p>
        <p class="delete">
          <i class="fa-solid fa-trash"></i>
        </p>
        <p class="details">
          <i class="fa-solid fa-info-circle fa-lg"></i>
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

  displayTodosOfProject(currentProject);
  closeModals();
}

export function displayCurrentProjectTodos(projectId) {
  let currentProject = Logic.getCurrentProject(projectId);
  displayTodosOfProject(currentProject);
}
