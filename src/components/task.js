export default class Task {
  completed = false;

  constructor(title, description, dueDate, priority) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get dueDate() {
    return this._dueDate;
  }
  get priority() {
    return this._priority;
  }
  get completed() {
    return this._completed;
  }

  set title(title) {
    if (title.length <= 0) {
      //alert("Please enter a name for the task");
      console.log("no task name");
      return;
    }
    this._title = title;
  }
  set description(description) {
    this._description = description;
  }
  set dueDate(date) {
    this._dueDate = date;
  }
  set priority(priority) {
    if (priority < 0 || priority > 2) {
      //alert("Invalid priority");
      console.log("Invalid priority");
      return;
    }
    this._priority = priority;
  }
  set completed(value) {
    if (value === this._value) {
      return;
    }
    this._value = value;
  }
}
