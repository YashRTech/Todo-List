import { Todo, Project } from "./factories.js";
const todoInputContainer = document.querySelector(".todo-input-container");
const projectName = document.querySelector("#project-name");
const todoTitle = document.querySelector("#todo-title");
const todoDescription = document.querySelector("#todo-description");
const todoDate = document.querySelector("#todo-date");
const projectsContainer = document.querySelector(".projects-container");
// let todo1 = new Todo("Hello", "jlal", "work", "high", true, new Date().toLocaleDateString());

let projects = [];
let project1 = new Project("Yash");
createAndUpdateProjects(project1.name);

export const allProjects = () => projects;

function createNewProject() {}

export function addTodoToProject(todo) {}

export function createAndUpdateProjects(projectName) {
  let project = new Project(projectName);
  projects.push(project);
}
export function deleteAndUpdateProjects(projectId) {
  const projectIndex = projects.findIndex((elem) => elem.id === projectId);
  projects.splice(projectIndex, 1);
}
export function editProjectName(id, value) {
  let project = projects.find((prj) => prj.id === id);
  if (project) {
    project.name = value;
  }
}

export function allTodos() {
  let allTodo = [];
  projects.forEach((project) => {
    allTodo.push(...project.todos);
  });

  return allTodo;
}
