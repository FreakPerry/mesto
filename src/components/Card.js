export default class Card {
  constructor(data, selector, handleCardClick, like, dislike, deleteCard) {
    this._image = data.link;
    this._title = data.name;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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
    this._likeCounter.textContent = `${this._likes.length}`;

    this._setEventListeners();
    this._isLiked();
    this.isOwner();

    return this._card;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard(this._id);
    });

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('card__like-button_active')) {
        this._dislike();
      } else {
        this._like();
      }
    });

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._image, this._title);
    });
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _isLiked() {
    this._likes.forEach(user => {
      if (user._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
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

  setLikesCount(res) {
    this._likeCounter.textContent = `${res.likes.length}`;
  }
}
