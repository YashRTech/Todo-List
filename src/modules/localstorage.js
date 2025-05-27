import { allProjects } from "./logic.js";

export function updateDataInLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(allProjects()));
}
