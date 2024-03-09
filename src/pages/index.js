import "./index.css";

// images
import imgPaoDeAcucar from "../images/pao-de-acucar-rj.jpg";
import imgDedoDeDeus from "../images/dedo-de-deus-rj.jpg";
import imgCristoRedentor from "../images/cristo-redentor-rj.jpg";
import imgBuzios from "../images/buzios-rj.jpg";
import imgSaoPaulo from "../images/sao-paulo-sp.jpg";
import imgArraialDoCabo from "../images/arraial-do-cabo-rj.jpg";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  setPopup,
  closePopup,
  validateOptions,
  resetValidationForm,
} from "../utils/utils.js";

const postsList = document.querySelector(".posts__list");
const forms = Array.from(document.querySelectorAll(".popup__form"));

// cards iniciais
const initialCards = [
  {
    name: "Pão de Açúcar, RJ",
    link: imgPaoDeAcucar,
  },
  {
    name: "Dedo de Deus, RJ",
    link: imgDedoDeDeus,
  },
  {
    name: "Cristo Redentor, RJ",
    link: imgCristoRedentor,
  },
  {
    name: "Búzios, RJ",
    link: imgBuzios,
  },
  {
    name: "São Paulo",
    link: imgSaoPaulo,
  },
  {
    name: "Arraial do Cabo, RJ",
    link: imgArraialDoCabo,
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
