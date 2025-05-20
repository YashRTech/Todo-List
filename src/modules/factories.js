export class Todo {
  constructor(title, description, projectName, priority, isCompleted, dueDate) {
    this.title = title;
    this.description = description;
    this.projectName = projectName;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }
}

export class Project{
    constructor(name, todos) {
        this.name = name;
        this.todos = todos;
    }
}
