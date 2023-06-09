export default class FormValidation {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
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

  _resetErrorValidation() {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    const submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });

    this._disabledButton(submitButtonElement);
  }

  _toggleButtonState() {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    const submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    const isFormValid = Array.from(inputList).every(inputElement => inputElement.validity.valid);
    if (isFormValid) {
      this._enabledButton(submitButtonElement);
    } else {
      this._disabledButton(submitButtonElement);
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
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
