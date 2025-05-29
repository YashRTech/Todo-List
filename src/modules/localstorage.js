import { allProjects ,getExtraTodos} from "./logic.js";

export function updateDataInLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(allProjects()));
}
export function updateExtrasInLocalStorage() {
  localStorage.setItem("extraTodos", JSON.stringify(getExtraTodos()));
}
