import { resetValidation, validateOptions } from "./validate.js";
const popups = Array.from(document.querySelectorAll(".popup"));
const popupsTriggers = Array.from(document.querySelectorAll(".popup-trigger"));
const postsList = document.querySelector(".posts__list");
const forms = Array.from(document.querySelectorAll(".popup__form"));

const nameText = document.querySelector(".profile__name");
const jobText = document.querySelector(".profile__about");

// cards iniciais
const initialCards = [
  {
    name: "Rio de Janeiro",
    link: "./images/post-01.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-02.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-03.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-04.jpg",
  },
  {
    name: "São Paulo",
    link: "./images/post-05.jpg",
  },
  {
    name: "Rio de Janeiro",
    link: "./images/post-06.jpg",
  },
];

// criando posts
function createPost(post) {
  const postItemTemplate = document.querySelector("#posts__item").content;
  const postItemElement = postItemTemplate.querySelector(".posts__item");

  const newPost = postItemElement.cloneNode(true);
  const newPostImage = newPost.querySelector(".posts__image");
  const newPostTitle = newPost.querySelector(".posts__title");
  const newPostLikeBtn = newPost.querySelector(".posts__btn-like");
  const newPostTrashBtn = newPost.querySelector(".posts__trash-btn");

  newPostImage.setAttribute("src", post.link);
  newPostImage.setAttribute("alt", post.name);
  newPostTitle.textContent = post.name;

  newPostLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("posts__btn-like_actived");
  });
  newPostTrashBtn.addEventListener("click", () => {
    newPost.remove();
  });
  newPostImage.addEventListener("click", () => {
    const popup = document.querySelector(".popup_image");
    const imageTitle = popup.querySelector(".popup__image-title");
    const image = popup.querySelector(".popup__image");
    imageTitle.textContent = post.name;
    image.setAttribute("src", post.link);
    image.setAttribute("alt", post.name);
    togglePopup(popup);
  });

  return newPost;
}

function setInitialPosts() {
  initialCards.map((post) => {
    postsList.append(createPost(post));
  });
}

function resetForm(form) {
  if (form) {
    const buttonForm = form.querySelector(validateOptions.submitButtonSelector);
    resetValidation(form, validateOptions);
    buttonForm.setAttribute("disabled", true);
    buttonForm.classList.add(validateOptions.inactiveButtonClass);
    form.reset();
  }
  return;
}

// funções de popup
function togglePopup(popup) {
  popup.classList.toggle("popup_closed");
  popup.classList.toggle("popup_opened");
  const form = popup.querySelector(".popup__form");
  if (popup.classList.contains("popup_opened")) {
    document.addEventListener("keydown", closePopupWithKeyboard);
  } else {
    document.removeEventListener("keydown", closePopupWithKeyboard);
    resetForm(form);
  }
}

function closePopupWithKeyboard(evt) {
  if (evt.key == "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    togglePopup(popupOpen);
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
  setInputsProfile(popup);
  togglePopup(popup);
}

function handleClosePopup(evt) {
  if (
    evt.target.classList.contains("popup__close-icon") ||
    evt.target.classList.contains("popup")
  ) {
    const popup = evt.target.closest(".popup");
    togglePopup(popup);
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

// submits
function submitPost(form) {
  const post = {
    name: form.title.value,
    link: form.image.value,
  };

  postsList.prepend(createPost(post));

  form.reset();
  const popup = form.closest(".popup");
  togglePopup(popup);
}

function submitProfile(form) {
  nameText.textContent = form.name.value;
  jobText.textContent = form.about.value;
  const popup = form.closest(".popup");
  togglePopup(popup);
}

function handleSubmitForms(evt) {
  evt.preventDefault();
  const form = evt.target;
  if (evt.target.classList.contains("popup__form_edit-profile")) {
    submitProfile(form);
  } else if (evt.target.classList.contains("popup__form_add-place")) {
    submitPost(form);
  }
}

function enableSubmitForms(formsList) {
  forms.forEach((form) => {
    form.addEventListener("submit", handleSubmitForms);
  });
}

setPopup();
setInitialPosts();
enableSubmitForms(forms);
