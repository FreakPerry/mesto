export default class Card {
  constructor(data, selector, handleCardClick) {
    this._image = data.link;
    this._title = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const card = document
      .querySelector(this._selector)
      .content.querySelector('.card')
      .cloneNode(true);
    return card;
  }

  renderCard() {
    this._card = this._getElement();

    this._imageElement = this._card.querySelector('.card__image');
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;

    this._titleElement = this._card.querySelector('.card__description');
    this._titleElement.textContent = this._title;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._likeButton = this._card.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => {
      this._like();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._imageElement.src, this._imageElement.alt);
    });
  }

  _deleteCard() {
    this._card.remove();
  }

  _like() {
    this._likeButton.classList.toggle('card__like-button_active');
  }
}
