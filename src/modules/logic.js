import { Todo, Project } from "./factories.js"

// let todo1 = new Todo("Hello", "jlal", "work", "high", true, new Date().toLocaleDateString());

export function createAndAddTodo(title, description, projectName, priority, isCompleted, dueDate) {
    let todo = new Todo(title, description, projectName, priority, isCompleted, dueDate);
    
}

export function addTodo(todo) {
    
}