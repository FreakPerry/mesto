const profileElement = document.querySelector('.profile');
const profileInfoElement = profileElement.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

const popupOpenButtonEditProfileElement = profileInfoElement.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSaveButton = popupElement.querySelector('.popup__save-button');
const inputElements = popupElement.querySelectorAll('.popup__form-input');
const formElement = popupElement.querySelector('.popup__form');

const togglePopupVisability = function () {
  popupElement.classList.toggle('popup_is-opened');
};

popupOpenButtonEditProfileElement.addEventListener('click', togglePopupVisability);
popupCloseButtonElement.addEventListener('click', togglePopupVisability);

inputElements[0].value = profileNameElement.textContent;
inputElements[1].value = profileAboutElement.textContent;

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  let newName = inputElements[0].value;
  let newAbout = inputElements[1].value;
  profileNameElement.textContent = newName;
  profileAboutElement.textContent = newAbout;
};

popupSaveButton.addEventListener('click', handleFormSubmit);
popupSaveButton.addEventListener('click', togglePopupVisability);
