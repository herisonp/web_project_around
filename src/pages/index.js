import "./index.css";

import PopupWithForm from "../components/PopupWithForm.js";
import {
  api,
  createPosts,
  enableValidationForm,
  resetValidationForm,
  setInputsProfile,
} from "../utils/utils.js";
import { userInfo } from "../utils/utils.js";

api
  .getInitialCards()
  .then((res) => createPosts(res))
  .catch((err) => console.log(err));

userInfo
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res.avatar);
  })
  .catch(console.log);

// submits
function submitPost(form) {
  const post = {
    name: form.title.value,
    link: form.image.value,
  };

  api
    .postCard(post)
    .then((res) => {
      createPosts([res], "prepend");
      resetValidationForm(form);
    })
    .catch((err) => console.log(err));
}

function submitProfile(form) {
  const newUserInfo = {
    name: form.name.value,
    about: form.about.value,
  };

  api
    .editUser(newUserInfo)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(console.log);
}

function submitAvatar(form) {
  api
    .editAvatar({ avatar: form.link.value })
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      resetValidationForm(form);
    })
    .catch(console.log);
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

const popupFormAvatar = new PopupWithForm(".popup_edit-avatar", {
  triggerSelector: ".profile__btn-avatar-edit",
  submitForm: submitAvatar,
  onOpen: () => {
    resetValidationForm(popupFormAvatar.getForm());
  },
  onStart: () => {
    enableValidationForm(popupFormAvatar.getForm());
  },
});
popupFormAvatar.setPopup();
