const popups = Array.from(document.querySelectorAll(".popup"));
const popupsTriggers = Array.from(document.querySelectorAll(".popup-trigger"));
const nameText = document.querySelector(".profile__name");
const jobText = document.querySelector(".profile__about");

// funções de popup
function openPopup(popup) {
  const form = popup.querySelector(".popup__form");
  resetValidationForm(form);
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
  document.addEventListener("keydown", closePopupWithKeyboard);
}

function closePopup(popup) {
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
  document.removeEventListener("keydown", closePopupWithKeyboard);
}

function closePopupWithKeyboard(evt) {
  if (evt.key == "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

function setInputsProfile(popup) {
  const form = popup.querySelector(".popup__form");
  if (form.classList.contains("popup__form_edit-profile")) {
    form.name.value = nameText.textContent;
    form.about.value = jobText.textContent;
  }
  return;
}

function handleOpenPopup(evt) {
  const popup = document.querySelector(`.popup_${evt.currentTarget.id}`);
  openPopup(popup);
  setInputsProfile(popup);
}

function handleClosePopup(evt) {
  if (
    evt.target.classList.contains("popup__close-icon") ||
    evt.target.classList.contains("popup")
  ) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  }
}

function setPopup() {
  popups.forEach((popup) => {
    popup.addEventListener("click", handleClosePopup);
  });

  popupsTriggers.forEach((popupTrigger) => {
    popupTrigger.addEventListener("click", handleOpenPopup);
  });
}

function resetValidationForm(form) {
  if (form) {
    // remover todas as mensagens de erro da tela
    const inputList = form.querySelectorAll(validateOptions.inputSelector);
    inputList.forEach((inputElement) => {
      const errorElement = form.querySelector(
        `#${inputElement.id} + .${validateOptions.errorClass}`
      );
      inputElement.classList.remove(validateOptions.inputErrorClass);
      errorElement.classList.remove(validateOptions.errorClassVisible);
      errorElement.textContent = "";
    });

    // desativar botão de submit
    const buttonForm = form.querySelector(validateOptions.submitButtonSelector);
    buttonForm.disabled = true;
    buttonForm.classList.add(validateOptions.inactiveButtonClass);

    form.reset();
  }
  return;
}

// opções de validação de formulário
const validateOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
  errorClassVisible: "popup__error_visible",
};

export {
  setPopup,
  openPopup,
  closePopup,
  resetValidationForm,
  validateOptions,
};
