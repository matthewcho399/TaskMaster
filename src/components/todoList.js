import Project from "./project.js";

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
