class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    // Event listener for checkbox change to toggle completed status
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._toggleCompleted();
      this._handleCheck(this._completed);
    });

    // Event listener for delete button to remove the to-do item
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });
  }

  _toggleCompleted() {
    if (this._data.completed) {
      this._todoCheckboxEl.classList.add("todo__completed");
    }
  }

  _handleDueDate() {
    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        this._todoDate.textContent = ""; // Clear if invalid date
      }
    } else if (this._todoDate) {
      this._todoDate.textContent = ""; // Clear if no date provided
    }
  }

  _handleName() {
    if (this._data.name) {
      this._todoNameEl.textContent = this._data.name;
    } else {
      this._todoNameEl.textContent = "";
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoLabel.addEventListener("click", (event) => {
      event.stopPropagation(); // Stop the event from reaching the checkbox
    });
  }

  getView() {
    // Clone the template
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    // Initialize all DOM elements
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");

    // Set initial values
    this._handleName();
    this._todoCheckboxEl.checked = this._data.completed;
    this._generateCheckboxEl();
    this._setEventListeners();
    this._handleDueDate();

    return this._todoElement;
  }
}

export default Todo;
