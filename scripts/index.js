const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

// edit popup elements

const editPopupCloseButton = popupEdit.querySelector('.popup__close-button');
const popupSaveButton = popupEdit.querySelector('.popup__save-button');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = document.getElementById('name-input');
const aboutInput = document.getElementById('about-input');

// add popup elements

const addPopupCloseButton = popupAdd.querySelector('#add-popup-close-button');
const addPopupCreateButton = popupAdd.querySelector('.popup__save-button');
const addCardForm = popupAdd.querySelector('#add-card-form');
const titleInput = document.getElementById('title-input');
const imageLinkInput = document.getElementById('link-input');

// cards

// functions

const togglePopupVisability = function (popup) {
  popup.classList.toggle('popup_is-opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  togglePopupVisability(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  togglePopupVisability(popupEdit);
});

function handleAddCardButtonClick() {
  togglePopupVisability(popupAdd);
}

addCardButton.addEventListener('click', handleAddCardButtonClick);

function handlePopupCloseButtonClick(popup) {
  togglePopupVisability(popup);
}

editPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupEdit);
});

addPopupCloseButton.addEventListener('click', () => {
  handlePopupCloseButtonClick(popupAdd);
});

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#crad-template');

const createCard = ({ name, link }) => {
  const string = `<article class="card" id="card-template">
  <img
    class="card__image"
    src="${link}"
    alt="${name}"
  />
  <div class="card__info">
    <h2 class="card__description">${name}</h2>
    <button class="button card__like-button" type="button"></button>
  </div>
  <button class="card__delete-button button" type="button"></button>
</article>`;
  const tempContainer = document.createElement('div');
  tempContainer.insertAdjacentHTML('afterbegin', string);

  const article = tempContainer.firstElementChild;

  return article;
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
  togglePopupVisability(popupAdd);
};

addCardForm.addEventListener('submit', hendleAddFormSubmit);
