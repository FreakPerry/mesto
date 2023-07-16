import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__form-input');
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      return (this._inputValues[input.name] = input.value);
    });
    return this._inputValues;
  }

  setInputValues = data => {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  };

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
}
