import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }

  open(data) {
    super.open();
    // adicionar uma imagem ao pop-up e o atributo src da imagem correspondente junto com uma legenda para a imagem
    const imageTitle = this._popupElement.querySelector(".popup__image-title");
    const image = this._popupElement.querySelector(".popup__image");
    imageTitle.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
  }
}
