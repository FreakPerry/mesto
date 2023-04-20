const profileElement = document.querySelector('.profile');
const profileInfoElement = profileElement.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

const editProfileButton = profileInfoElement.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSaveButton = popupElement.querySelector('.popup__save-button');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = document.getElementById('name-input');
const aboutInput = document.getElementById('about-input');

const togglePopupVisability = function () {
  nameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;

  popupElement.classList.toggle('popup_is-opened');
};

editProfileButton.addEventListener('click', togglePopupVisability);
popupCloseButtonElement.addEventListener('click', togglePopupVisability);

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  togglePopupVisability();
};

formElement.addEventListener('submit', handleFormSubmit);
