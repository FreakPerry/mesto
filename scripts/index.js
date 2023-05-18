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

const editFormElement = popupEdit.querySelector('.popup__form');
const addFormElement = popupAdd.querySelector('.popup__form');

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

// cards

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#crad-template');

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
  resetErrorValidation(editFormElement, configFormSelector);
  enabledButton(popupSaveButton);
  openPopup(popupEdit);
}

editProfileButton.addEventListener('click', handleEditPopupOpen);

function handleAddCardPopupOpen() {
  titleInput.value = '';
  imageLinkInput.value = '';
  resetErrorValidation(addFormElement, configFormSelector);
  disabledButton(popupSaveButton);
  openPopup(popupAdd);
}

addCardButton.addEventListener('click', handleAddCardPopupOpen);

function handlePopupCloseButtonClick(popup, formElement) {
  resetErrorValidation(formElement, configFormSelector);
  closePopup(popup);
}

editPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupEdit, editFormElement);
});

addPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupAdd, addFormElement);
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
  addFormElement.reset();
};

addFormElement.addEventListener('submit', hendleAddFormSubmit);

imagePopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupImage);
});

const showError = (inputElement, errorElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const disabledButton = buttonElement => {
  buttonElement.disabled = 'disabled';
};

const enabledButton = buttonElement => {
  buttonElement.disabled = false;
};

const resetErrorValidation = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);

  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    hideError(inputElement, errorElement, config);
  });
};

const toggleButtonState = (buttonElement, isActive) => {
  if (!isActive) {
    disabledButton(buttonElement);
  } else {
    enabledButton(buttonElement);
  }
};

const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity());

  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });

  [...inputList].forEach(inputItem => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(inputItem, formElement, config);
      toggleButtonState(submitButtonElement, formElement.checkValidity());
    });
  });
};

const enableValidation = config => {
  const forms = document.querySelectorAll(config.formSelector);

  [...forms].forEach(formItem => {
    setEventListener(formItem, config);
  });
};

const configFormSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__form-input_type_error'
};

enableValidation(configFormSelector);
