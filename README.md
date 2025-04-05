# Simple Todo App

This project is a simple to do app that allows the user to add specific tasks to check off when completed. This app aids in organization during daily life.

## Functionality

Importing Modules: The code imports necessary modules and constants, such as uuid for generating unique IDs, initialTodos for pre-populated to-do items, and configuration for form validation.

DOM Elements Selection: It selects various DOM elements needed for the application, including the form, buttons, and the to-do list container.

Opening and Closing Modal: Functions to open and close the to-do form modal are defined, allowing users to add new to-do items.

Generating To-Do Items: The generateTodo function creates new to-do items by instantiating the Todo class, which handles how to display individual to-do items in the list.

Form Submission Handling: An event listener is set up for the form submission, which:

Prevents the default form submission behavior.
Collects input values (name and date) from the form.
Creates a new to-do item with a unique ID.
Appends the newly created to-do item to the list and closes the modal.
Calls resetValidation to clear the form after successful submission.
Initial To-Do Population: It loops through an array of initial to-do items (initialTodos) and displays them on the page when the application loads.

Form Validation: A FormValidator instance is created to manage input validation, ensuring that the form behaves correctly before submission.

## Technology

This combination of technologies enables the creation of a robust, interactive, and user-friendly to-do list application, emphasizing modularity, real-time updates, and good user experience practices. The use of JavaScript, along with modern web development practices, allows for a responsive and efficient application.

## Deployment

This project is deployed on GitHub Pages:

- ADD LINK HERE
