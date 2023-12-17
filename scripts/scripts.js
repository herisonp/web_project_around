let formElement = document.querySelector(".popup__form");
let popupClose = document.querySelector(".popup__btn-close");
let btnEdit = document.querySelector(".profile__btn-edit");

let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about");

let nameText = document.querySelector(".profile__name");
let jobText = document.querySelector(".profile__about");

function togglePopup() {
	let popup = document.querySelector(".popup");
	popup.classList.toggle("popup_opened");
	nameInput.value = nameText.textContent;
	jobInput.value = jobText.textContent;
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	nameText.textContent = nameInput.value;
	jobText.textContent = jobInput.value;
	togglePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
popupClose.addEventListener("click", togglePopup);
btnEdit.addEventListener("click", togglePopup);
