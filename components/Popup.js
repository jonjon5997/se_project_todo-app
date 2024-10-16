class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      // Check if the clicked target is the close button or the background (popup itself)
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close(); // Close the modal
      }
    });
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close(); // Close the popup if "Escape" key is pressed
    }
  }
}

export default Popup;
