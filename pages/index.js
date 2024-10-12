import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

//import
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
//instantiate
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(event.target.checked);
  // todoCounter.updateTotal(true);
}

// function handleDelete(completed) {
//   if (completed) {
//     todoCounter.updateCompleted(true);
//   }
// }
function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false); // Decrease completed count when deleting a completed to-do
  }
  todoCounter.updateTotal(false); // Always decrease total count when deleting
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  // below i am calling the name of the instance.themethodname
  const todoElement = todo.getView();

  return todoElement;
};
const section = new Section({
  items: initialTodos, // pass initial todos
  renderer: (item) => {
    const todo = generateTodo(item); // generate todo item
    section.addItem(todo); // use addItem method to append it to the container
  },
  containerSelector: ".todos__list", // Container selector for todo list
});

// Render all initial todos when the page loads
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues; // Destructure input values
    // Create a date object and adjust for timezone
    const dateObject = new Date(date);
    dateObject.setMinutes(
      dateObject.getMinutes() + dateObject.getTimezoneOffset()
    );

    const id = uuidv4(); // Generate a unique ID
    const values = { name, date: dateObject, id }; // Prepare the todo object
    const todo = generateTodo(values); // Generate the todo item
    section.addItem(todo); // Add the todo item to the section
    addTodoPopup.close(); // Close the popup
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation(); // Reset form validation
  },
});

addTodoPopup.setEventListeners();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//call method of class instance outside of the class
newTodoValidator.enableValidation();
