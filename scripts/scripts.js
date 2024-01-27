let formElement = document.querySelector(".popup__form");
let popupClose = document.querySelectorAll(".popup__btn-close");
let btnEdit = document.querySelector(".profile__btn-edit");
let btnNewPlace = document.querySelector(".profile__btn-add");

let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about");

let nameText = document.querySelector(".profile__name");
let jobText = document.querySelector(".profile__about");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function closePopup(evt) {
  const popup = evt.target.closest(".popup");
  togglePopup(popup);
}

function popupEditProfile() {
  const popup = document.querySelector(".popup_edit-profile");
  togglePopup(popup);
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

function popupAddNewPlace() {
  const popup = document.querySelector(".popup_add-place");
  togglePopup(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  const popup = evt.target.closest(".popup");
  togglePopup(popup);
}

popupClose.forEach((btn) => {
  btn.addEventListener("click", closePopup);
});
formElement.addEventListener("submit", handleProfileFormSubmit);
btnEdit.addEventListener("click", popupEditProfile);
btnNewPlace.addEventListener("click", popupAddNewPlace);
