export default class FormValidation {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }

  _disabledButton(buttonElement) {
    buttonElement.disabled = true;
  }

  _enabledButton(buttonElement) {
    buttonElement.disabled = false;
  }

  resetErrorValidation() {
    this._inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });

    this._disabledButton(this._submitButtonElement);
  }

  toggleButtonState() {
    const isFormValid = Array.from(this._inputList).every(
      inputElement => inputElement.validity.valid
    );
    if (isFormValid) {
      this._enabledButton(this._submitButtonElement);
    } else {
      this._disabledButton(this._submitButtonElement);
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._formElement.setAttribute('novalidate', true);
    this._setEventListeners();
  }
}
