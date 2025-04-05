class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items; // Array of initial data (e.g., todos)
    this._renderer = renderer; // Function to create and render a single item
    this._container = document.querySelector(containerSelector); // DOM element where items will be added
  }

  // Method to render all items on the page
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer for each item
    });
  }

  // Method to add an individual item (DOM element) to the container
  addItem(element) {
    this._container.append(element); // Add item to container
  }
}

export default Section;
