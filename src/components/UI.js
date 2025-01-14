import Task from "./task.js";
import Project from "./project.js";
import TodoList from "./todoList.js";
import Storage from "./storage.js";
import { format } from "date-fns";
import "../style.css";

const storage = new Storage();

export default class UI {
  loadBase() {
    // check if storage is accessed already
    if (!localStorage.getItem("todoList")) {
      let todoList = new TodoList();
      storage.setList(todoList);
    }

    let todoList = storage.getList();
    console.log(todoList);
    this.loadProjects(todoList);
    //this.loadTasks(todoList[0]);
  }

  loadProjects(todoList) {
    const sidebar = document.getElementById("sidebar");
    sidebar.textContent = "";

    const projects = todoList._projects;
    const myProjectLabel = document.createElement("label");
    myProjectLabel.textContent = "My Projects";
    sidebar.appendChild(myProjectLabel);

    for (const project of projects) {
      const projectBtn = document.createElement("button");
      projectBtn.classList.add("project-btn");

      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-tasks");
      projectBtn.appendChild(icon);

      const label = document.createElement("label");
      label.textContent = project._title;
      projectBtn.appendChild(label);
      projectBtn.onclick = () => this.loadTasks(todoList, project);
      sidebar.appendChild(projectBtn);
    }

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("project-btn");
    addProjectBtn.textContent = "Add Project";
    addProjectBtn.onclick = () => this.openProjectModal(todoList);
    sidebar.appendChild(addProjectBtn);

    this.loadTasks(todoList, projects[0]);
  }

  openProjectModal(todoList) {
    const modal = document.getElementById("project-modal");
    modal.textContent = "";
    const titleInput = document.createElement("input");
    const buttonContainer = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");

    titleInput.placeholder = "Title";
    titleInput.required = true;
    titleInput.maxLength = 30;

    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
      modal.close();
    };

    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => {
      this.createProject(todoList, titleInput.value);
      this.loadProjects(todoList);
      modal.close();
    };

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);

    buttonContainer.classList.add("btn-container");

    modal.appendChild(titleInput);
    modal.appendChild(buttonContainer);
    modal.showModal();
  }

  createProject(todoList, title) {
    if (title.length === 0) {
      alert("Please enter a title");
    }

    const project = new Project(title);
    storage.addProject(todoList, project);
    console.log(todoList);
  }

  loadTasks(todoList, project) {
    const taskContainer = document.getElementById("task-container");
    taskContainer.textContent = "";

    console.log(project);

    this.loadProjectHeader(todoList, project);

    const tasks = project._tasks;
    for (const task of tasks) {
      console.log(task);
      this.createTaskDiv(todoList, project, task);
    }
  }

  createTaskDiv(todoList, project, task) {
    const taskContainer = document.getElementById("task-container");
    const taskDiv = document.createElement("div");
    const infoContainer = document.createElement("div");
    const leftContainer = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (task.completed) {
      checkbox.checked = "checked";
    }
    checkbox.onclick = () => this.handleCheckbox(todoList, task, checkbox);

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
    deleteBtn.onclick = () => this.deleteTask(todoList, project, task);

    infoContainer.appendChild(taskName);
    infoContainer.appendChild(dueDateDiv);
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(infoContainer);

    taskDiv.classList.add("task");
    leftContainer.classList.add("left-container");
    checkbox.classList.add("checkbox");
    taskName.classList.add("task-name");
    dueDateDiv.classList.add("due-date");
    infoContainer.classList.add("info-container");
    deleteBtn.classList.add("delete-btn");

    taskDiv.appendChild(leftContainer);
    taskDiv.appendChild(deleteBtn);
    taskContainer.appendChild(taskDiv);
  }

  handleCheckbox(todoList, task, checkbox) {
    storage.handleCheckbox(todoList, task, checkbox);
  }

  loadProjectHeader(todoList, project) {
    const taskContainer = document.getElementById("task-container");
    const projectHeader = document.createElement("div");
    const projectName = document.createElement("div");
    const addTaskBtn = document.createElement("button");

    projectName.textContent = `${project.title}`;
    addTaskBtn.textContent = "+";

    addTaskBtn.onclick = () => this.openTaskModal(todoList, project);

    projectHeader.classList.add("project-header");
    addTaskBtn.classList.add("add-task-btn");

    projectHeader.appendChild(projectName);
    projectHeader.appendChild(addTaskBtn);
    taskContainer.appendChild(projectHeader);
  }

  openTaskModal(todoList, project) {
    const modal = document.getElementById("task-modal");
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
      if (
        this.createTask(
          todoList,
          project,
          titleInput.value,
          dueDateInput.value,
          priorityContainer.value
        ) === true
      ) {
        modal.close();
        this.loadTasks(todoList, project);
      }
    };

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(submitBtn);

    modal.appendChild(titleInput);
    modal.appendChild(dueDateInput);
    modal.appendChild(priorityContainer);
    modal.appendChild(buttonContainer);
    modal.showModal();
  }

  createTask(todoList, project, title, dueDate, priority) {
    if (this.validateTask(title, dueDate, priority) === true) {
      const formattedDate = format(dueDate, "M/dd/yy");
      const task = new Task(title, "", formattedDate, Number(priority));
      storage.addTask(todoList, project, task);
      return true;
    } else {
      return false;
    }
  }

  deleteTask(todoList, project, task) {
    storage.removeTask(todoList, project, task);
    this.loadTasks(todoList, project);
  }

  validateTask(title, dueDate, priority) {
    if (title.length === 0) {
      alert("Please enter a title");
      return false;
    }
    if (dueDate.length === 0) {
      alert("Please enter a due date");
      return false;
    }
    return true;
  }
}
