import Task from "./task.js";
import Project from "./project.js";
import TodoList from "./todoList.js";
import { format } from "date-fns";

let todoList = new TodoList();

export default class UI {
  loadBase() {
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
    laundry.completed = true;

    const reminders = new Project("Reminders");
    reminders.addTask(laundry);
    reminders.addTask(hw);
    reminders.addTask(groceries);
    todoList.addProject(reminders);

    this.loadProjects(todoList);
    //this.loadTasks(project)
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
    this.loadTasks(projects[0]);
  }

  loadTasks(project) {
    const taskContainer = document.getElementById("task-container");
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
    if (task.completed) {
      checkbox.checked = "checked";
    }
    checkbox.onclick = () => this.handleCheckbox(task, checkbox);

    const taskName = document.createElement("div");
    taskName.textContent = `${task.title}`;
    if (task.priority === 1) {
      taskName.style.color = "orange";
    } else if (task.priority === 2) {
      taskName.style.color = "red";
    }

    const dueDateDiv = document.createElement("div");
    const dateLabel = document.createElement("label");
    dateLabel.textContent = `${task.dueDate}`;
    dueDateDiv.appendChild(dateLabel);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => this.deleteTask(project, task);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(dueDateDiv);
    taskDiv.appendChild(deleteBtn);
    taskContainer.appendChild(taskDiv);
  }

  handleCheckbox(task, checkbox) {
    checkbox.checked ? (task.completed = true) : (task.completed = false);
  }

  loadProjectHeader(project) {
    const taskContainer = document.getElementById("task-container");
    const projectHeader = document.createElement("div");
    const projectName = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    projectName.textContent = `${project.title}`;
    addTaskBtn.textContent = "+";

    addTaskBtn.onclick = () => this.openTaskModal(project);
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(addTaskBtn);
    taskContainer.appendChild(projectHeader);
  }

  openTaskModal(project) {
    const modal = document.getElementById("modal");
    // Reset modal div
    modal.textContent = "";

    const titleInput = document.createElement("input");
    const dueDateInput = document.createElement("input");
    const priorityContainer = document.createElement("select");
    const buttonContainer = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");

    titleInput.placeholder = "Title";
    titleInput.required = true;
    titleInput.maxLength = 30;

    dueDateInput.type = "date";

    priorityContainer.placeholder = "Priority";
    for (let i = 0; i < 3; i++) {
      const priorityOption = document.createElement("option");
      priorityOption.value = i;
      if (i === 0) {
        priorityOption.textContent = "Low";
      } else if (i === 1) {
        priorityOption.textContent = "Medium";
      } else if (i === 2) {
        priorityOption.textContent = "High";
      }
      priorityContainer.appendChild(priorityOption);
    }

    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
      modal.close();
    };

    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => {
      this.createTask(
        project,
        titleInput.value,
        dueDateInput.value,
        priorityContainer.value
      );
      modal.close();
      this.loadTasks(project);
    };

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);

    modal.appendChild(titleInput);
    modal.appendChild(dueDateInput);
    modal.appendChild(priorityContainer);
    modal.appendChild(buttonContainer);
    modal.showModal();
  }

  createTask(project, title, dueDate, priority) {
    const formattedDate = format(dueDate, "M/dd/yy");
    const task = new Task(title, "", formattedDate, priority);
    project.addTask(task);
    console.log("task created");
  }

  deleteTask(project, task) {
    project.removeTask(task);
    this.loadTasks(project);
  }
}
