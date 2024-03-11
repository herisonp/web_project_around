import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import {
  userInfo,
  validateOptions,
  cardSelector,
  postListSelector,
} from "./constants";

function enableValidationForm(form) {
  new FormValidator({
    formElement: form,
    options: validateOptions,
  }).enableValidation();
}

function createPosts(posts, insertMethod = "append") {
  const newPost = new Section(
    {
      items: posts,
      insertMethod,
      renderer: (item) => {
        const card = new Card({
          data: item,
          cardSelector,
          handleCardClick: (data) => {
            const popup = new PopupWithImage(".popup_image");
            popup.open(data);
            popup.setEventListeners();
          },
        });
        newPost.addItem(card.getCard());
      },
    },
    postListSelector
  );
  newPost.renderItems();
}

function setInputsProfile(popup) {
  const form = popup.querySelector(".popup__form");
  const { name, job } = userInfo.getUserInfo();
  form.name.value = name;
  form.about.value = job;
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

export {
  resetValidationForm,
  setInputsProfile,
  enableValidationForm,
  createPosts,
};
