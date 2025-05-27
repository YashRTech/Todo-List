


export function updateDataInLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(allProjects()));
}
