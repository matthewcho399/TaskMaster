//array of projects,
//construct with default project, createProject, deleteProject,

import Task from "./task.js";
import Project from "./project.js";
import { format } from "date-fns";

export default class TodoList {
  constructor() {
    this._projects = [new Project("Tasks")];
  }

  get projects() {
    return this._projects;
  }

  set projects(projects) {
    this._projects = projects;
  }

  addProject(project) {
    this._projects.push(project);
  }

  removeProject(project) {
    if (!this._projects.includes(project)) {
      console.log("Project does not exist in this Todo List");
      return;
    }
    const index = this._projects.indexOf(project);
    this._projects.splice(index, 1);
  }
}

let project = new Project("Default");
let dueDate = format(new Date(2024, 3, 12), "MM-dd-yyyy");
project.addTask(new Task("homework", "math hw", dueDate, 0));
console.log(project.tasks);
let newTask = new Task("laundry", "laundry", dueDate, 0);
project.addTask(newTask);
console.log(project.tasks);
project.removeTask(newTask);
console.log("project after deletion: ");
console.log(project.tasks);

const list = new TodoList();
console.log(list);
