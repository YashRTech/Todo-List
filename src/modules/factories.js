export class Todo {
  constructor(title, description, projectName, priority, isCompleted, dueDate) {
    this.title = title;
    this.description = description;
    this.projectName = projectName;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.id = crypto.randomUUID();
  }
}

export class Project {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.todos = [];
  }
}
