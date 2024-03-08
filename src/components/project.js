//import task
//name, array of tasks, completed?,
//constructor, addTask, removeTask,

import Task from "./task.js";
import { format } from "date-fns";

let dueDate = format(new Date(2024, 3, 12), "MM-dd-yyyy");
let task1 = new Task("do homework", "homework for math class", dueDate, 0);
console.log(task1);
let taskName = task1.description;
console.log(taskName);
task1.title = "New description";
console.log(task1.title);
task1.description = "new description";
console.log(task1.description);
let c = task1.completed;
task1.completed = false;
console.log(task1.completed);
console.log(task1);
