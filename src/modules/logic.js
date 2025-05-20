import { Todo, Project } from "./factories.js"

// let todo1 = new Todo("Hello", "jlal", "work", "high", true, new Date().toLocaleDateString());
let projects = [];

export function addTodoToProject(todo) {
    
}

export function addProjectToProjects(project) {
    
}

export function allTodos() {
    let allTodo = [];
    projects.forEach(project => {
        allTodo.push(...project.todos)
    })

    return allTodo;
}