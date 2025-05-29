import { Todo, Project } from "./factories.js";
import { updateDataInLocalStorage,updateExtrasInLocalStorage } from "./localstorage.js";
import { format } from "date-fns";

const defaultProjects = {
  name: "Todo App",
  id: "627872b6-f2cf-4cd7-b9ff-1ac6c3fb019a",
  todos: [
    {
      title: "Complete Todo List App",
      description: "Hello my friend how are you doing",
      priority: "high",
      isCompleted: true,
      dueDate: "29 May 2025",
      todoId: "bc859c75-7d77-4c9d-9d76-97c7f8c37ba9",
      projectId: "627872b6-f2cf-4cd7-b9ff-1ac6c3fb019a",
    },
    {
      title: "Talk to your GF",
      description:
        "Does it need any description\nOne thing to clarify is GF = Gamer Friend",
      priority: "low",
      isCompleted: false,
      dueDate: "25 May 2025",
      todoId: "568d9bac-43d4-4942-ad0e-c3a54a42228d",
      projectId: "627872b6-f2cf-4cd7-b9ff-1ac6c3fb019a",
    },
  ],
};
//! Taking data from localStorage and this is our main head and it handles our everything
let projects = JSON.parse(localStorage.getItem("todoList")) || [
  defaultProjects,
];
let extraTodos = JSON.parse(localStorage.getItem("extraTodos")) || [];

//! For Projects

export function allProjects() {
  return projects;
}
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

//! For Todos

export function getAllTodos() {
  let allTodo = [];
  allTodo.push(...extraTodos);
  projects.forEach((project) => {
    allTodo.push(...project.todos);
  });

  return allTodo;
}
export function getExtraTodos() {
  return extraTodos;
}
export function getCurrentTodo(todoId, projectId) {
  if (projectId) { 
    let project = getCurrentProject(projectId);
    let todo = project.todos.find((todo) => todo.todoId === todoId);
    return todo;
  }
  let todo = extraTodos.find(todo => todo.todoId === todoId);
  return todo;
}
export function createAndUpdateTodoToProject(
  projectId,
  [title, description, dueDate, priority, isCompleted]
) {
  if (dueDate) {
    dueDate = format(new Date(dueDate), "dd MMM yyyy");
  }
  let todo = new Todo(title, description, dueDate, priority, isCompleted);
  todo.projectId = projectId;
  let currentProject = getCurrentProject(projectId);
  currentProject.todos.push(todo);
  updateDataInLocalStorage();
}
export function createAndUpdateTodoToExtras(
  title,
  description,
  dueDate,
  priority,
  isCompleted
) {
  if (dueDate) {
    dueDate = format(new Date(dueDate), "dd MMM yyyy");
  }
  let todo = new Todo(title, description, dueDate, priority, isCompleted);
  extraTodos.push(todo);
  updateExtrasInLocalStorage();
}
export function deleteAndUpdateTodo(todoId, projectId) {
  if (projectId) {
    let project = getCurrentProject(projectId);
    const todoIndex = project.todos.findIndex((todo) => todo.todoId === todoId);
    project.todos.splice(todoIndex, 1);
    updateDataInLocalStorage();
    return
  }
  let todoIndex = extraTodos.findIndex(todo => todo.todoId === todoId);
  extraTodos.splice(todoIndex, 1);
  updateExtrasInLocalStorage();
}
export function editTodo(
  todoId,
  projectId,
  [title, description, dueDate, priority, isCompleted]
) {
  let todo = getCurrentTodo(todoId, projectId);

  if (!todo) return;

  if (dueDate) {
    dueDate = format(new Date(dueDate), "dd MMM yyyy");
  }
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
  todo.isCompleted = isCompleted;

  updateDataInLocalStorage();
  updateExtrasInLocalStorage();
}
