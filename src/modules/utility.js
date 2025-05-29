function disable(...elems) {
  elems.forEach((elem) => {
    elem.disabled = true;
  });
}
function enable(...elems) {
  elems.forEach((elem) => {
    elem.disabled = false;
  });
}

function changeTodoAddBtnText(text) {
  const todoHeaderTitle = document.querySelector(".todo-header-title");
  const btnAddTodo = document.querySelector(".todo-add-btn");
  btnAddTodo.textContent = text;
  todoHeaderTitle.textContent = text;
}
function changeProjectAddBtnText(text) {
  const projectAddBtn = document.querySelector(".project-add-btn");
  const projectHeaderTitle = document.querySelector(".project-header-title");
  projectAddBtn.textContent = text;
  projectHeaderTitle.textContent = text;
}

function unCheckAllPriortiy() {
  const priority = document.querySelectorAll("input[name='Priority']");
  priority.forEach((prio) => (prio.checked = false));
}
function getCurrentPriority() {
  const priority = document.querySelector('input[name="Priority"]:checked');
  return priority;
}
function selectPriority(priorityId) {
  const priority = document.querySelector(`#${priorityId}`);
  if (priority) {
    priority.checked = true;
  }
}
function displayTaskCount(count) {
  const countContainer = document.querySelector(".task-count");
  countContainer.textContent = count;
}
const checkEmptyValue = (value) => {
  //! Matches empty string and all white spaces.
  if (/^\s*$/.test(value)) return true;
};
const addHiddenClass = (elem) => {
  elem.classList.add("hidden");
};
const removeHiddenClass = (elem) => {
  elem.classList.remove("hidden");
};
function transform(elem,value) {
  elem.style.transform=`translateX(${value}px)`
}
function removeActiveClass(elem) {
  elem.classList.remove("active");
}
function isMobile() {
  return window.innerWidth <= 1000;
}
function addActiveTabClass(elem) {
  elem.classList.add('active-tab')
}
function removeActiveTabClass() {
  const tabs=document.querySelectorAll("[data-tab]")
  tabs.forEach(tab => {
    tab.classList.remove("active-tab")
  })
}
function addOutline(elem) {
  elem.classList.add("outline")
}

export {
  disable, enable, changeTodoAddBtnText, changeProjectAddBtnText, unCheckAllPriortiy, getCurrentPriority, selectPriority, displayTaskCount, checkEmptyValue, addHiddenClass, removeHiddenClass, transform, removeActiveClass, isMobile,addActiveTabClass,removeActiveTabClass,addOutline
};
