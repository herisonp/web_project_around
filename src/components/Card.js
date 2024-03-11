export default class Card {
  constructor({ data, cardSelector, handleCardClick }) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick ?? null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".posts__item")
      .cloneNode(true);

    return cardElement;
  }

  _setButtons() {
    this._likeButton = this._card.querySelector(".posts__btn-like");
    this._trashButton = this._card.querySelector(".posts__trash-btn");
    this._cardImage = this._card.querySelector(".posts__image");
  }

  getCard() {
    this._card = this._getTemplate();
    this._setButtons();
    this._setEventListeners();

    this._card.querySelector(".posts__image").src = this._data.link;
    this._card.querySelector(".posts__image").alt = this._data.name;
    this._card.querySelector(".posts__title").textContent = this._data.name;

    return this._card;
  }

  _handleLikeButton() {
    this._card
      .querySelector(".posts__btn-like")
      .classList.toggle("posts__btn-like_actived");
  }

  _handleTrashButton() {
    this._card.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleTrashButton();
    });
    if (this._handleCardClick) {
      this._cardImage.addEventListener("click", () => {
        this._handleCardClick(this._data);
      });
    }
  }
}
