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

const resetErrorValidation = (formElement, buttonElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);

  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    hideError(inputElement, errorElement, config);
  });
  disabledButton(buttonElement);
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

enableValidation(configFormSelector);
