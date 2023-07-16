import '../page/index.css';

import {
  configFormSelector,
  profileNameElement,
  profileAboutElement,
  profileAvatarElement,
  editProfileButton,
  addCardButton,
  avatarButton,
  popupEdit,
  popupAdd,
  popupImage,
  popupAvatar,
  popupConfirm,
  editFormElement,
  addFormElement,
  avatarFormElement,
  cardContainer
} from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import PopupConfirm from '../components/PopupConfirm';
import { data } from 'browserslist';

let userId;

const cardList = new Section(
  {
    renderer: data => {
      const card = createCard(data);
      cardList.addItem(card);
    }
  },
  cardContainer
);

const createCard = function (data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId,
      ownerId: data.owner._id,
      id: data._id
    },
    '#card-template',
    handleCardClick,
    async () => {
      try {
        const res = await api.like(data._id);
        card.like();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    async () => {
      try {
        const res = await api.dislike(data._id);
        card.dislike();
        card.setLikesCount(res);
      } catch (e) {
        console.warn(e);
      }
    },
    () => {
      confirmPopup.open(card);
    }
  );

  const cardElement = card.renderCard();
  return cardElement;
};

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

const userInfo = new UserInfo({
  profileName: profileNameElement,
  profileAbout: profileAboutElement,
  profileAvatar: profileAvatarElement
});

const editPopup = new PopupWithForm(popupEdit, submitProfileForm);
editPopup.setEventListeners();

async function submitProfileForm(data) {
  editPopup.renderLoading(true, 'Сохранение...');
  try {
    const res = await api.editUserInfo(data);
    userInfo.setUserInfo(res);
    editPopup.close();
  } catch (e) {
    console.warn(e);
  } finally {
    editPopup.renderLoading(false);
  }
}

editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editPopup.setProfileInputValues(userData);
  editPopup.open();
  editFormValidation.resetErrorValidation();
});

const addPopup = new PopupWithForm(popupAdd, submitPlaceForm);
addPopup.setEventListeners();

async function submitPlaceForm(data) {
  addPopup.renderLoading(true, 'Сохранение...');
  try {
    const res = await api.addCards(data);
    const card = createCard(res);
    cardList.addItem(card);
    addPopup.close();
  } catch (e) {
    console.warn(e);
  } finally {
    addPopup.renderLoading(false);
  }
}

const confirmPopup = new PopupConfirm(popupConfirm, async card => {
  try {
    await api.deleteCard(card._id);
    card.delete();
    confirmPopup.close();
  } catch (e) {
    console.warn(e);
  }
});
confirmPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
  addPopup.open();
  addFormValidation.resetErrorValidation();
});

const avatarPopup = new PopupWithForm(popupAvatar, submitAvatarForm);
avatarPopup.setEventListeners();

async function submitAvatarForm(data) {
  avatarPopup.renderLoading(true, 'Сохранение...');
  try {
    const res = await api.editAvatar(data);
    userInfo.setAvatar(res);
    avatarPopup.close();
  } catch (e) {
    console.warn(e);
  } finally {
    avatarPopup.renderLoading(false);
  }
}

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  addFormValidation.resetErrorValidation();
});

const editFormValidation = new FormValidation(configFormSelector, editFormElement);
editFormValidation.enableValidation();
const addFormValidation = new FormValidation(configFormSelector, addFormElement);
addFormValidation.enableValidation();
const avatarFormValidation = new FormValidation(configFormSelector, avatarFormElement);
avatarFormValidation.enableValidation();
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: '78c77960-dd67-4e1c-9573-4429c29d1034',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch(e => console.log(e));
