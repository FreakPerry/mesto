// profile info

const profileElement = document.querySelector('.profile');
const profileInfoElement = profileElement.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

// profile buttons

const editProfileButton = profileInfoElement.querySelector('.profile__edit-button');
const addCardButton = profileElement.querySelector('.profile__add-button');

// popups

const popupEdit = document.querySelector('#popup-edit-profile');
const popupAdd = document.querySelector('#popup-add-card');
const popupImage = document.querySelector('#popup-card-image');

// edit popup elements

const editPopupCloseButton = popupEdit.querySelector('.popup__close-button');
const popupSaveButton = popupEdit.querySelector('.popup__save-button');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__form-input[name="nameInput"]');
const aboutInput = popupEdit.querySelector('.popup__form-input[name="aboutInput"]');

// add popup elements

const addPopupCloseButton = popupAdd.querySelector('#add-popup-close-button');
const addPopupCreateButton = popupAdd.querySelector('.popup__save-button');
const addCardForm = popupAdd.querySelector('.popup__form[name="addCardPopup"]');
const titleInput = popupAdd.querySelector('.popup__form-input[name="titleInput"]');
const imageLinkInput = popupAdd.querySelector('.popup__form-input[name="linkInput"]');

// img popup

const imagePopupCloseButton = popupImage.querySelector('#pup-img-cls-btn');

// cards

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#crad-template');

// functions

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(popupEdit);
}

formElement.addEventListener('submit', handleEditFormSubmit);

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  openPopup(popupEdit);
});

function handleAddCardButtonClick() {
  openPopup(popupAdd);
}

addCardButton.addEventListener('click', handleAddCardButtonClick);

function handlePopupCloseButtonClick(popup) {
  closePopup(popup);
}

editPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupEdit);
});

addPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupAdd);
});

const createCard = ({ name, link }) => {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__description').textContent = name;

  card.querySelector('.card__delete-button').addEventListener('click', () => {
    card.remove();
  });

  const like = card.querySelector('.card__like-button');
  like.addEventListener('click', () => {
    like.classList.toggle('card__like-button_active');
  });

  card.querySelector('.card__image').addEventListener('click', () => {
    popupImage.querySelector('.popup__caption').textContent = name;
    const img = popupImage.querySelector('.popup__image');
    img.src = link;
    img.alt = name;
    openPopup(popupImage);
  });

  return card;
};

const cardList = initialCards.map(cardData => {
  const cardElement = createCard(cardData);
  return cardElement;
});

const renderCard = cardData => {
  cardContainer.prepend(createCard(cardData));
};

cardContainer.prepend(...cardList);

const hendleAddFormSubmit = evt => {
  evt.preventDefault();
  const name = titleInput.value;
  const link = imageLinkInput.value;
  const cardData = { name, link };
  renderCard(cardData);
  closePopup(popupAdd);
  addCardForm.reset();
};

addCardForm.addEventListener('submit', hendleAddFormSubmit);

imagePopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupImage);
});
