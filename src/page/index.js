import '../page/index.css';

import { initialCards, configFormSelector } from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

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

const nameInput = popupEdit.querySelector('.popup__form-input[name="nameInput"]');
const aboutInput = popupEdit.querySelector('.popup__form-input[name="aboutInput"]');

// add popup elements

const titleInput = popupAdd.querySelector('.popup__form-input[name="titleInput"]');
const imageLinkInput = popupAdd.querySelector('.popup__form-input[name="linkInput"]');

// img popup

const img = popupImage.querySelector('.popup__image');
const imgCaption = popupImage.querySelector('.popup__caption');

// cards

const cardContainer = document.querySelector('.cards');

// functions

const createCard = function (cardData) {
  const card = new Card(cardData, '#card-template', handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: cardData => {
      const card = createCard(cardData);
      cardList.addItem(card);
    }
  },
  cardContainer
);

cardList.renderItems();

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

const userInfo = new UserInfo({
  profileName: profileNameElement,
  profileAbout: profileAboutElement
});

function submitProfileForm(userData) {
  userInfo.setUserInfo(userData);
}

editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editPopup.setProfileInputValues(userData);
  editPopup.open();
  editFormValidation.resetErrorValidation();
});

function submitPlaceForm(obj) {
  const card = createCard(obj);
  cardList.addItem(card);
  addPopup.close();
}

addCardButton.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.resetErrorValidation();
});

const editFormValidation = new FormValidation(configFormSelector, editFormElement);
editFormValidation.enableValidation();
const editPopup = new PopupWithForm(popupEdit, submitProfileForm);
editPopup.setEventListeners();
const addFormValidation = new FormValidation(configFormSelector, addFormElement);
addFormValidation.enableValidation();
const addPopup = new PopupWithForm(popupAdd, submitPlaceForm);
addPopup.setEventListeners();
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();
