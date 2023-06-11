import { initialCards, configFormSelector } from './constants.js';
import Card from './Card.js';
import FormValidation from './FormValidation.js';

// profile info

const profileElement = document.querySelector('.profile');
const profileInfoElement = profileElement.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

// profile buttons

const editProfileButton = profileInfoElement.querySelector('.profile__edit-button');
const addCardButton = profileElement.querySelector('.profile__add-button');

// popups

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#popup-edit-profile');
const popupAdd = document.querySelector('#popup-add-card');
const popupImage = document.querySelector('#popup-card-image');

// forms

const editFormElement = document.forms['editProfilePopup'];
const addFormElement = document.forms['addCardPopup'];
const formValidators = {};

// edit popup elements

const editPopupCloseButton = popupEdit.querySelector('.popup__close-button');
const popupSaveButton = popupEdit.querySelector('.popup__save-button');
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
const img = popupImage.querySelector('.popup__image');
const imgCaption = popupImage.querySelector('.popup__caption');

// cards

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');

// functions

const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = evt => {
  const key = evt.key;

  if (key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');

    closePopup(openedPopup);
  }
};

popups.forEach(item => {
  item.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(popupEdit);
}

editFormElement.addEventListener('submit', handleEditFormSubmit);

function handleEditPopupOpen() {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  openPopup(popupEdit);
}

editProfileButton.addEventListener('click', handleEditPopupOpen);

function handleAddCardPopupOpen() {
  formValidators['addCardPopup']._resetErrorValidation();
  openPopup(popupAdd);
}

addCardButton.addEventListener('click', handleAddCardPopupOpen);

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const validator = new FormValidation(config, formElement);

    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configFormSelector);

const handleCardClick = (link, name) => {
  img.src = link;
  img.alt = name;
  imgCaption.textContent = name;
  openPopup(popupImage);
};

const createCard = cardData => {
  const card = new Card(cardData, '#card-template', handleCardClick);

  return card.renderCard();
};

const cardList = initialCards.map(createCard);

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
  addFormElement.reset();
  formValidators['addCardPopup']._resetErrorValidation();
};

addFormElement.addEventListener('submit', hendleAddFormSubmit);

imagePopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupImage);
});
