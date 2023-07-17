import Popup from './Popup';

export default class PopupConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  setCallback(submitCb) {
    this._handleSubmit = submitCb;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', evt => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
