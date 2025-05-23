const overlay = document.querySelector(".overlay");
const projectInputContainer = document.querySelector(".project-input-container");
const todoInputContainer = document.querySelector(".todo-input-container");


const addHiddenClass = (elem) => {
    elem.classList.add("hidden");
}
const removeHiddenClass = (elem) => {
    elem.classList.remove("hidden");
}


export const addNewProject = () => {
    addHiddenClass(todoInputContainer);
    removeHiddenClass(overlay);
    removeHiddenClass(projectInputContainer);
}
export const addNewTodo = () => {
    addHiddenClass(projectInputContainer);
    removeHiddenClass(overlay);
    removeHiddenClass(todoInputContainer);
}
export const closeModals = () => {
    addHiddenClass(todoInputContainer);
    addHiddenClass(projectInputContainer);
    addHiddenClass(overlay);
}