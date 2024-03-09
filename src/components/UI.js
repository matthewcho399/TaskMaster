import Task from "./task.js";
import Project from "./project.js";
import TodoList from "./todoList.js";
import { format } from "date-fns";

let todoList = new TodoList();

export default class UI {
  loadBase() {
    let container = document.getElementById("container");
    let sidebar = document.getElementById("sidebar");
    let taskContainer = document.getElementById("taskContainer");

    //pre storage implementation
    let todoList = new TodoList();
    const laundry = new Task(
      "Laundry",
      "Laundry",
      format(new Date(2024, 3, 12), "M/dd/yy"),
      0
    );
    const hw = new Task(
      "Hw",
      "homework",
      format(new Date(2024, 3, 10), "M/dd/yy"),
      1
    );
    const groceries = new Task(
      "Groceries",
      "get groceries",
      format(new Date(2024, 3, 8), "M/dd/yy"),
      2
    );

    const reminders = new Project("Reminders");
    reminders.addTask(laundry);
    reminders.addTask(hw);
    reminders.addTask(groceries);
    todoList.addProject(reminders);

    this.loadProjects(todoList);
  }

  loadProjects(todoList) {
    const sidebar = document.getElementById("sidebar");

    const projects = todoList.projects;

    for (const project of projects) {
      const projectBtn = document.createElement("button");
      projectBtn.textContent = project.title;
      projectBtn.onclick = () => this.loadTasks(project);
      sidebar.appendChild(projectBtn);
    }
  }

  loadTasks(project) {
    const taskContainer = document.getElementById("task-container");
    //taskContainer.textContent = `${project.title}`;
    taskContainer.textContent = "";

    this.loadProjectHeader(project);

    const tasks = project.tasks;

    for (const task of tasks) {
      this.createTaskDiv(project, task);
    }
    console.log(project);
    console.log(tasks);
  }

  createTaskDiv(project, task) {
    const taskContainer = document.getElementById("task-container");
    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskName = document.createElement("div");
    taskName.textContent = `${task.title}`;

    const dueDateDiv = document.createElement("div");
    const dateLabel = document.createElement("label");
    dateLabel.textContent = `${task.dueDate}`;
    dueDateDiv.appendChild(dateLabel);
    // const calendar = document.createElement("input");
    // calendar.type = "date";

    // dueDateDiv.appendChild(calendar);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => this.deleteTask(project, task);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(dueDateDiv);
    taskDiv.appendChild(deleteBtn);
    taskContainer.appendChild(taskDiv);
  }

  loadProjectHeader(project) {
    const taskContainer = document.getElementById("task-container");
    const projectHeader = document.createElement("div");
    const projectName = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    projectName.textContent = `${project.title}`;
    addTaskBtn.textContent = "+";
    addTaskBtn.onclick = () => this.addTaskModal(project);
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(addTaskBtn);
    taskContainer.appendChild(projectHeader);
  }

  addTaskModal(project) {}

  deleteTask(project, task) {
    project.removeTask(task);
    this.loadTasks(project);
  }
}
