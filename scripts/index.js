import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  setPopup,
  closePopup,
  validateOptions,
  resetValidationForm,
} from "./utils.js";

const postsList = document.querySelector(".posts__list");
const forms = Array.from(document.querySelectorAll(".popup__form"));

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

function createPost(post) {
  const cardSelector = "#posts__item";
  const newPost = new Card({
    data: post,
    cardSelector,
  }).getCard();

  return newPost;
}

// inicia posts
function setInitialPosts() {
  initialCards.map((post) => {
    postsList.append(createPost(post));
  });
}

// submits
function submitPost(form) {
  const post = {
    name: form.title.value,
    link: form.image.value,
  };

  postsList.prepend(createPost(post));

  resetValidationForm(form);
  const popup = form.closest(".popup");
  closePopup(popup);
}

function submitProfile(form) {
  const nameText = document.querySelector(".profile__name");
  const jobText = document.querySelector(".profile__about");
  nameText.textContent = form.name.value;
  jobText.textContent = form.about.value;
  const popup = form.closest(".popup");
  closePopup(popup);
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

function enableValidationForm(form) {
  new FormValidator({
    formElement: form,
    options: validateOptions,
  }).enableValidation();
}

function enableSubmitForms(formsList) {
  formsList.forEach((form) => {
    enableValidationForm(form);
    form.addEventListener("submit", handleSubmitForms);
  });
}

setInitialPosts();
setPopup();
enableSubmitForms(forms);
