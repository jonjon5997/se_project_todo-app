class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    ); // Store input list here
  }

  resetValidation() {
    // Reset all input fields
    // disableSubmitBtn
    // Reset form
    this._formEl.reset();
    this._disableSubmitBtn();
  }

  _disableSubmitBtn() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableSubmitBtn() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _checkInputValidity(inputElement) {
    // implement this method
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (errorElement) {
      errorElement.textContent = errorMessage; // Show error message
      errorElement.classList.add(this._errorClass); // Show error styling
      inputElement.classList.add(this._inputErrorClass); // Add error class to input
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (errorElement) {
      errorElement.textContent = ""; // Clear error message
      errorElement.classList.remove(this._errorClass); // Hide error styling
      inputElement.classList.remove(this._inputErrorClass); // Remove error class from input
    }
  }

  _setEventListeners() {
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      //iterates thorugh the inputElement and add an event listener
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); // Update button state based on input validity
      });
    });
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    if (isFormValid) {
      this._enableSubmitBtn();
    } else {
      this._disableSubmitBtn();
    }
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the form from submitting
    });
    this._setEventListeners();
    this._toggleButtonState(); // Ensure button is disabled initially if form is invalid
  }
}

//export
export default FormValidator;

//show error message on page
