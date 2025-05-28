import { Todo, Project } from "./factories.js";
import { updateDataInLocalStorage } from "./localstorage.js";
import { format } from "date-fns";

let projects = JSON.parse(localStorage.getItem("todoList")) || [];




export function allProjects() {
  return projects;
}


export function getCurrentTodo(todoId, projectId) {
  let project = getCurrentProject(projectId);
  let todo = project.todos.find((todo) => todo.todoId === todoId);
  return todo;
}
//! For Projects

export function getCurrentProject(projectId) {
  return projects.find((project) => project.id === projectId);
}

export function createAndUpdateProjects(projectName) {
  let project = new Project(projectName);
  projects.push(project);
  updateDataInLocalStorage();
}
export function deleteAndUpdateProjects(projectId) {
  const projectIndex = projects.findIndex((elem) => elem.id === projectId);
  projects.splice(projectIndex, 1);
  updateDataInLocalStorage();
}
export function editProjectName(projectId, projectName) {
  let project = getCurrentProject(projectId);
  if (project) {
    project.name = projectName;
    updateDataInLocalStorage();
  }
}

export function getAllTodos() {
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
  if (dueDate) {
    dueDate = format(new Date(dueDate), 'dd MMM yyyy');
  }
  let todo = new Todo(title, description, dueDate, priority, isCompleted);
  todo.projectId = projectId;
  let currentProject = getCurrentProject(projectId);
  currentProject.todos.push(todo);
  updateDataInLocalStorage();
}

export function deleteAndUpdateTodo(todoId, projectId) {
  let project = getCurrentProject(projectId);
  const todoIndex = project.todos.findIndex((todo) => todo.todoId === todoId);
  project.todos.splice(todoIndex, 1);
  updateDataInLocalStorage();
}
export function editTodo(
  todoId,
  projectId,
  [title, description, dueDate, priority, isCompleted]
) {
  let todo = getCurrentTodo(todoId, projectId);

  if (!todo) return;

  if (dueDate) {
    dueDate = format(new Date(dueDate), 'dd MMM yyyy');
  }
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
  todo.isCompleted = isCompleted;

  updateDataInLocalStorage();
}

