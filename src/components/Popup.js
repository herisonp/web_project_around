export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._isOpen = false;
  }

  isOpen() {
    return this._isOpen;
  }

  open() {
    this._isOpen = true;
    this._popupElement.classList.remove("popup_closed");
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._isOpen = false;
    this._popupElement.classList.add("popup_closed");
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    // armazena a lógica para fechar o pop-up pressionando a tecla Esc
    if (evt.key == "Escape" && this.isOpen) {
      this.close();
    }
  }

  _handleClickClose(target) {
    if (
      target.classList.contains("popup__close-icon") ||
      target.classList.contains("popup")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    // adiciona um ouvinte de evento click ao ícone de fechamento do popup. A janela modal também deve fechar quando os usuários clicarem na área sombreada
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickClose(evt.target);
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
