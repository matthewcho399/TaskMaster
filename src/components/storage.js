import Task from "./task.js";
import Project from "./project.js";
import TodoList from "./todoList.js";
import { format } from "date-fns";

export default class Storage {
  constructor() {}
  getList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem("todoList"))
    );

    todoList.projects = todoList.projects.map((project) =>
      Object.assign(new Project(), project)
    );

    todoList.projects.forEach(
      (project) =>
        (project.tasks = project.tasks.map((task) =>
          Object.assign(new Task(), task)
        ))
    );

    return todoList;
  }

  setList(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  addProject(todoList, project) {
    todoList.addProject(project);
    this.setList(todoList);
  }

  addTask(todoList, project, task) {
    project.addTask(task);
    this.setList(todoList);
  }

  removeTask(todoList, project, task) {
    project.removeTask(task);
    this.setList(todoList);
  }

  handleCheckbox(todoList, task, checkbox) {
    checkbox.checked ? (task.completed = true) : (task.completed = false);
    this.setList(todoList);
  }
}
