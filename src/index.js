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


addNewProject.addEventListener("click", DOM.displayProjectModal);

addNewTodo.addEventListener("click", DOM.displayTodoModal);

closeBtn.forEach(btn => {
  btn.addEventListener("click",DOM.closeModals)
})

projectAddBtn.addEventListener("click", DOM.addAndEditProjectToDom);

todoAddBtn.addEventListener("click", DOM.addTodoToDom);

allTab.addEventListener("click",DOM.displayAllTodos)

