import * as Logic from "./logic.js";

let editMode = true;
let editProjectId = null;

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


//! For edit and delete projects
projectsContainer.addEventListener("click", (e) => {
  const project = e.target.closest("div[id]");
  const projectId = project.id;

  if (e.target.classList.contains("delete-project")) {
    deleteProject(projectId);
    return;
  }

  if (e.target.classList.contains("edit-project")) {
    const allProjects = Logic.allProjects();
    const projectToEdit = allProjects.find(prj => prj.id === projectId);
    projectName.value = projectToEdit.name;
    editMode = true;
    editProjectId = projectId;
    displayProjectModal();
  }
});
projectsContainer.addEventListener("click", (e) => {});

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
export const addProjectToDom = () => {
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

export const addTodoToDom = () => {};

window.addEventListener("DOMContentLoaded", displayAllProjects);
