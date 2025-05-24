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
let project2 = new Project("Krish");
createAndUpdateProjects(project1.name);
createAndUpdateProjects(project2.name);

export const allProjects = () => projects;

//! For Projects

export function getCurrentProject(projectId) {
  return projects.find((project) => project.id === projectId);
}

export function createAndUpdateProjects(projectName) {
  let project = new Project(projectName);
  projects.push(project);
}
export function deleteAndUpdateProjects(projectId) {
  const projectIndex = projects.findIndex((elem) => elem.id === projectId);
  projects.splice(projectIndex, 1);
}
export function editProjectName(projectId, value) {
  let project = getCurrentProject(projectId);
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

//! For Todos

export function createAndUpdateTodoToProject(
  projectId,
  [title, description, dueDate, priority, isCompleted]
) {
  let todo = new Todo(title, description, dueDate, priority, isCompleted);
  let currentProject = getCurrentProject(projectId);
  currentProject.todos.push(todo);
}

// Hard Coded
let id=projects[0].id
createAndUpdateTodoToProject(id, ["Hiii", "laghlajfl", "05-22-2024"]);
