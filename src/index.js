import "./styles/style.css";
import "./modules/factories.js"
import "./modules/logic.js"
import "./modules/domm.js"
import * as DOM from "./modules/dom.js"

const addNewProject = document.querySelector(".add-new-project");
const addNewTodo = document.querySelector(".add-new-todo");
const closeBtn = document.querySelectorAll(".close-btn");
const projectAddBtn = document.querySelector(".project-add-btn");
const todoAddBtn = document.querySelector(".todo-add-btn");
const allTab = document.querySelector(".all-tab");
const btnCancel = document.querySelectorAll(".btn-cancel");
const projectsContainer = document.querySelector(".projects-container");
const todoContainer = document.querySelector(".todo-container");
const selectPriority = document.querySelector("input[name='Priority']:checked");


addNewProject.addEventListener("click", DOM.displayProjectModal);

addNewTodo.addEventListener("click", DOM.displayTodoModal);

closeBtn.forEach(btn => {
  btn.addEventListener("click",DOM.closeModals)
})

projectAddBtn.addEventListener("click", DOM.addAndEditProjectToDom);

todoAddBtn.addEventListener("click", DOM.addTodoToDom);

allTab.addEventListener("click",DOM.displayAllTodos)

btnCancel.forEach(btn => {
  btn.addEventListener("click", DOM.closeModals);
})



//! For edit and delete projects
projectsContainer.addEventListener("click", (e) => {
  DOM.handleProjectContainer(e);
});

todoContainer.addEventListener("click", (e) => {
  DOM.handleTodoContainer(e);
});


window.addEventListener("DOMContentLoaded", () => {
  DOM.displayAllProjects();
  DOM.displayAllTodos();
});



