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

let dueDate = format(new Date(2024, 3, 12), "MM-dd-yyyy");
// let task1 = new Task("do homework", "homework for math class", dueDate, 0);
// console.log(task1);
// let taskName = task1.description;
// console.log(taskName);
// task1.title = "New description";
// console.log(task1.title);
// task1.description = "new description";
// console.log(task1.description);
// let c = task1.completed;
// task1.completed = false;
// console.log(task1.completed);
// console.log(task1);
