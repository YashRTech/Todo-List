import "./styles/style.css";
import "./modules/factories.js"
import "./modules/logic.js"
import "./modules/dom.js"
import * as functions from "./modules/functions.js"

const addNewProject = document.querySelector(".add-new-project");
addNewProject.addEventListener("click", functions.addNewProject);

const addNewTodo = document.querySelector(".add-new-todo");
addNewTodo.addEventListener("click", functions.addNewTodo);

const closeBtn = document.querySelectorAll(".close-btn");
closeBtn.forEach(btn => {
  btn.addEventListener("click",functions.closeModals)
})