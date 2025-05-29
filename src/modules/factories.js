export class Todo {
  constructor(title, description, dueDate, priority, isCompleted=false) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.todoId = crypto.randomUUID();
    this.allId=crypto.randomUUID();
  }
}


export class Project {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.todos = [];
  }
}
