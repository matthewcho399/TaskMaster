import Task from "./task.js";
import { format } from "date-fns";

export default class Project {
  constructor(title) {
    this._title = title;
    this._tasks = [];
  }

  get title() {
    return this._title;
  }
  get tasks() {
    return this._tasks;
  }

  set title(title) {
    if (title.length <= 0) {
      //alert("Please enter a name for the task");
      console.log("no task name");
      return;
    }
    this._title = title;
  }
  set tasks(tasks) {
    this._tasks = tasks;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  removeTask(task) {
    if (!this._tasks.includes(task)) {
      console.log("Task does not exist in this project");
      return;
    }
    const index = this._tasks.indexOf(task);
    this._tasks.splice(index, 1);
  }

  clearProject() {
    this._tasks = [];
  }
}
