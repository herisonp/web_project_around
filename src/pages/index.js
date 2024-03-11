import "./index.css";

import PopupWithForm from "../components/PopupWithForm.js";
import {
  createPosts,
  enableValidationForm,
  resetValidationForm,
  setInputsProfile,
} from "../utils/utils.js";
import { initialCards, userInfo } from "../utils/constants.js";

// submits
function submitPost(form) {
  const post = {
    name: form.title.value,
    link: form.image.value,
  };

  createPosts([post], "prepend");

  resetValidationForm(form);
}

function submitProfile(form) {
  const newUserInfo = {
    name: form.name.value,
    job: form.about.value,
  };

  userInfo.setUserInfo(newUserInfo);
}

const popupFormPost = new PopupWithForm(".popup_add-place", {
  triggerSelector: ".profile__btn-add",
  submitForm: submitPost,
  onClose: () => {
    resetValidationForm(popupFormPost.getForm());
  },
  onStart: () => {
    enableValidationForm(popupFormPost.getForm());
  },
});
popupFormPost.setPopup();

const popupFormProfile = new PopupWithForm(".popup_edit-profile", {
  triggerSelector: ".profile__btn-edit",
  submitForm: submitProfile,
  onOpen: () => {
    resetValidationForm(popupFormProfile.getForm());
    setInputsProfile(popupFormProfile.getPopup());
  },
  onStart: () => {
    enableValidationForm(popupFormProfile.getForm());
  },
});
popupFormProfile.setPopup();

createPosts(initialCards);
