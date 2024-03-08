import Task from "./task.js";
import Project from "./project.js";
import TodoList from "./todoList.js";

let todoList = new TodoList();

export default class UI {
  loadBase() {
    // let container = document.createElement("div");
    // let sideBar = document.createElement("div");
    // let projectContainer = document.createElement("div");
    // container.appendChild(sideBar);
    // container.appendChild(projectContainer);
    // sideBar.textContent = "Side bar";
    // projectContainer.textContent = "projects go here";
  }

  loadProjects() {}

  loadTasks(project) {}
}
