export default class Card {
  constructor(data, selector, openImage, like, dislike, deleteCard) {
    this._image = data.link;
    this._title = data.name;
    this._selector = selector;
    this._openImage = openImage;
    this._id = data.id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
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

    this._likeButton = this._card.querySelector('.card__like-button');
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._deleteButton = this._card.querySelector('.card__delete-button');
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._setLikeState();
    this._checkDeleteButtonVisibility();

    return this._card;
  }

  _handleDeleteCard() {
    this._deleteCard(this._id);
  }

  _handleLikeCard() {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._dislike();
    } else {
      this._like();
    }
  }

  _handleCardClick() {
    this._openImage(this._image, this._title);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDeleteCard.bind(this));
    this._likeButton.addEventListener('click', this._handleLikeCard.bind(this));
    this._imageElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  _checkDeleteButtonVisibility() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _setLikeState() {
    const isLiked = this._likes.some(user => user._id === this._userId);

    if (isLiked) {
      this.like();
    } else {
      this.dislike();
    }
  }

  delete() {
    this._card.remove();
    this._card = null;
  }

  like() {
    this._likeButton.classList.add('card__like-button_active');
  }

  dislike() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  setLikesCount(count) {
    this._likeCounter.textContent = count;
  }
}
